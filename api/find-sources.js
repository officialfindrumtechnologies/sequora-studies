import { createClient } from '@supabase/supabase-js';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';
const DAILY_LIMIT = 1400;
const COUNTER_KEY = 'gemini_grounded_search';

const SYSTEM_PROMPT = `You are a citation assistant. Given a text excerpt, find 3-5 real, relevant academic or reputable sources related to the content. Return ONLY valid JSON in this exact shape:
{"sources":[{"title":"...","author":"...","year":"...","url":"...","formatted_citation":"..."}]}
The formatted_citation field must be formatted in the citation style requested by the user (APA, MLA, or Harvard). No prose, no markdown, no code fences — raw JSON only.`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Missing Authorization header' });

  const adminSb = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data: { user }, error: authError } = await adminSb.auth.getUser(token);
  if (authError || !user) return res.status(401).json({ error: 'Invalid or expired session' });

  const { data: sub, error: subErr } = await adminSb
    .from('subscriptions')
    .select('tier, status')
    .eq('user_id', user.id)
    .single();

  if (subErr || !sub || sub.status !== 'active') {
    return res.status(403).json({ error: 'Active subscription required.', code: 'INACTIVE' });
  }

  if (sub.tier !== 'pro') {
    return res.status(403).json({ error: 'Upgrade to Pro to use AI Web Grounding', code: 'UPGRADE_REQUIRED' });
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    console.error('[find-sources] GEMINI_API_KEY not configured');
    return res.status(500).json({ error: 'Source search is temporarily unavailable' });
  }

  // Soft daily cap — Gemini free tier is 1,500 grounded prompts/day app-wide
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const { data: ctrs } = await adminSb
    .from('api_usage_counters')
    .select('count, reset_date')
    .eq('counter_key', COUNTER_KEY);

  const ctr = ctrs?.[0] || null;
  const isNewDay = !ctr || ctr.reset_date !== today;
  const currentCount = isNewDay ? 0 : (ctr.count || 0);

  if (currentCount >= DAILY_LIMIT) {
    return res.status(200).json({
      error: 'busy',
      message: 'Source search is temporarily busy — please try again tomorrow.',
    });
  }

  // Increment counter before calling API (race condition acceptable for a soft daily buffer)
  await adminSb
    .from('api_usage_counters')
    .upsert(
      { counter_key: COUNTER_KEY, count: currentCount + 1, reset_date: today },
      { onConflict: 'counter_key' }
    );

  const { text, style = 'apa' } = req.body || {};
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'text is required' });
  }

  const styleLabel = style === 'mla' ? 'MLA 9th edition' : style === 'harvard' ? 'Harvard' : 'APA 7th edition';
  const userMsg = `Find 3-5 real, relevant academic or reputable sources for this text. Format all citations in ${styleLabel}. Return raw JSON only.\n\nText:\n${text.slice(0, 3000)}`;

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
    console.log('[find-sources] POST → Gemini 2.5 Flash (grounded search)');

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: 'user', parts: [{ text: userMsg }] }],
        tools: [{ google_search: {} }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[find-sources] Gemini API error:', response.status, errText.slice(0, 300));
      return res.status(500).json({ error: 'Source search is temporarily unavailable' });
    }

    const data = await response.json();
    const rawText = (data?.candidates?.[0]?.content?.parts || [])
      .filter(p => p.text)
      .map(p => p.text)
      .join('');

    let sources = [];
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        sources = Array.isArray(parsed.sources) ? parsed.sources : [];
      } catch (parseErr) {
        console.error('[find-sources] JSON parse failed:', parseErr.message, rawText.slice(0, 200));
      }
    }

    console.log('[find-sources] Success, sources found:', sources.length);
    return res.status(200).json({ sources });
  } catch (err) {
    console.error('[find-sources] Exception:', err.message);
    return res.status(500).json({ error: 'Source search is temporarily unavailable' });
  }
}
