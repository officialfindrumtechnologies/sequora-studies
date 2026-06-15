import { createClient } from '@supabase/supabase-js';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';
// free = 1 extraction/month, paid = effectively unlimited
const PDF_LIMITS = { free: 1, paid_1: 999, paid_2: 999 };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // JWT verify
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Missing Authorization header' });

  const adminSb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: { user }, error: authError } = await adminSb.auth.getUser(token);
  if (authError || !user) return res.status(401).json({ error: 'Invalid session' });

  // Subscription check
  const { data: sub } = await adminSb
    .from('subscriptions')
    .select('tier, status')
    .eq('user_id', user.id)
    .single();

  if (!sub || sub.status !== 'active') {
    return res.status(403).json({ error: 'Account not active', code: 'INACTIVE' });
  }

  // Quota check
  const month = new Date().toISOString().slice(0, 7);
  const limit = PDF_LIMITS[sub.tier] ?? 1;

  const { data: usage, error: usageErr } = await adminSb.rpc('increment_ai_usage', {
    p_user_id: user.id,
    p_call_type: 'pdf_extraction',
    p_month_year: month,
    p_limit: limit,
  });

  if (usageErr) {
    console.error('[ExtractSyllabus] Usage RPC error:', usageErr);
    return res.status(500).json({ error: 'Usage tracking failed' });
  }

  if (usage?.blocked) {
    const msg = sub.tier === 'free'
      ? 'PDF extraction limit reached (1 per month on free plan). Upgrade to Basic for unlimited extractions.'
      : 'Monthly PDF extraction limit reached.';
    return res.status(429).json({ error: msg, code: 'PDF_QUOTA_EXCEEDED' });
  }

  // Validate body
  const { pdfBase64 } = req.body || {};
  if (!pdfBase64 || typeof pdfBase64 !== 'string') {
    return res.status(400).json({ error: 'pdfBase64 required' });
  }

  // Basic size guard: base64 of 15MB PDF ≈ 20MB string
  if (pdfBase64.length > 20_000_000) {
    return res.status(413).json({ error: 'PDF too large (max ~15 MB)' });
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) return res.status(500).json({ error: 'Server configuration error' });

  const EXTRACT_PROMPT = `You are a curriculum extractor. The attached document is an academic syllabus, curriculum guide, or specification.

Extract ALL topics and sub-topics a student must study from this document. Return ONLY a valid JSON array — no markdown fences, no explanation, no extra text.

Required format:
[
  { "section": "Unit or Chapter Name", "name": "Specific Topic Name" },
  { "section": "Unit or Chapter Name", "name": "Another Topic" }
]

Rules:
- Each item represents exactly one studyable topic or sub-topic
- "section" = the chapter, unit, module, or theme it belongs to (use exact heading from document)
- "name" = concise topic name (study-card style, 3–10 words, not a full sentence)
- If the document has no clear sections, use "General" for all items
- Exclude: learning objectives, assessment criteria, overview text, bibliography
- Include: every specific concept, formula, case study, skill, or knowledge area tested
- Return between 10 and 500 items depending on document depth`;

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: EXTRACT_PROMPT },
            { inlineData: { mimeType: 'application/pdf', data: pdfBase64 } },
          ]
        }],
        generationConfig: {
          temperature: 0.1,   // low temp for deterministic extraction
          maxOutputTokens: 8192,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[ExtractSyllabus] Gemini error:', response.status, errText.slice(0, 300));
      return res.status(502).json({ error: `Gemini API error (${response.status})` });
    }

    const result = await response.json();
    const raw = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) return res.status(502).json({ error: 'Gemini returned no content' });

    // Strip markdown fences if Gemini adds them despite instructions
    const clean = raw
      .replace(/^```json\s*/im, '')
      .replace(/^```\s*/im, '')
      .replace(/```\s*$/im, '')
      .trim();

    let topics;
    try {
      topics = JSON.parse(clean);
    } catch {
      console.error('[ExtractSyllabus] JSON parse failed. Raw:', raw.slice(0, 500));
      return res.status(502).json({ error: 'Could not parse Gemini response as JSON', raw: raw.slice(0, 400) });
    }

    if (!Array.isArray(topics)) {
      return res.status(502).json({ error: 'Gemini returned unexpected shape (expected array)' });
    }

    // Sanitize: ensure each item has section and name strings
    const sanitized = topics
      .filter(t => t && typeof t.name === 'string' && t.name.trim())
      .map(t => ({
        section: typeof t.section === 'string' && t.section.trim() ? t.section.trim() : 'General',
        name: t.name.trim(),
      }));

    console.log(`[ExtractSyllabus] Extracted ${sanitized.length} topics for user ${user.id}`);
    return res.status(200).json({ topics: sanitized, count: sanitized.length });

  } catch (err) {
    console.error('[ExtractSyllabus] Exception:', err.message);
    return res.status(500).json({ error: `Extraction failed: ${err.message}` });
  }
}
