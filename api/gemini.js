import { createClient } from '@supabase/supabase-js';

const rateLimitMap = new Map();

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';

const AI_LIMITS = { free: 0, paid_1: 20, paid_2: 80 };
const VALID_CALL_TYPES = new Set(['advisor', 'weekly_checkin']);

export default async function handler(req, res) {
  // CORS — locked to production domain
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // JWT verification
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const adminSb = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  const { data: { user }, error: authError } = await adminSb.auth.getUser(token);
  if (authError || !user) {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }

  // Subscription tier + status check
  const { data: sub, error: subErr } = await adminSb
    .from('subscriptions')
    .select('tier, status')
    .eq('user_id', user.id)
    .single();

  if (subErr || !sub) {
    return res.status(403).json({ error: 'No subscription record found.', code: 'INACTIVE' });
  }

  if (sub.status !== 'active') {
    return res.status(403).json({ error: 'Account not active.', code: 'INACTIVE' });
  }

  const limit = AI_LIMITS[sub.tier] ?? 0;
  if (limit === 0) {
    return res.status(403).json({
      error: 'AI Advisor requires a paid plan. Upgrade to Basic or Pro.',
      code: 'UPGRADE_REQUIRED',
    });
  }

  // Monthly quota via atomic RPC
  const callType = VALID_CALL_TYPES.has(req.body?.call_type) ? req.body.call_type : 'advisor';
  const monthYear = new Date().toISOString().slice(0, 7); // 'YYYY-MM'

  const { data: usage, error: rpcErr } = await adminSb.rpc('increment_ai_usage', {
    p_user_id:   user.id,
    p_call_type: callType,
    p_month_year: monthYear,
    p_limit:     limit,
  });

  if (rpcErr) {
    console.error('[Gemini] increment_ai_usage RPC error:', rpcErr);
    return res.status(500).json({ error: 'Usage tracking failed.' });
  }

  if (usage?.blocked) {
    return res.status(429).json({
      error: `Monthly AI limit of ${limit} calls reached. Resets 1st of next month.`,
      code: 'QUOTA_EXCEEDED',
      limit,
      count: usage.count,
    });
  }

  // Per-minute rate limit (burst protection)
  const now = Date.now();
  let requests = rateLimitMap.get(user.id) || [];
  requests = requests.filter(time => now - time < 60000);
  if (requests.length >= 10) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute.' });
  }
  requests.push(now);
  rateLimitMap.set(user.id, requests);

  // Validate prompt
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    return res.status(500).json({ error: 'Server configuration error (Gemini API Key missing)' });
  }

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
    console.log('[Gemini Proxy] POST →', geminiUrl.replace(/key=.*/, 'key=***'));
    console.log('[Gemini Proxy] Prompt length:', prompt.length);

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[Gemini Proxy] API error:', response.status, response.statusText);
      console.error('[Gemini Proxy] Response body:', errText.slice(0, 500));
      return res.status(502).json({ error: `Gemini API error (${response.status}): ${errText.slice(0, 200)}` });
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('[Gemini Proxy] Unexpected response:', JSON.stringify(data).slice(0, 500));
      return res.status(502).json({ error: 'Gemini returned no text — possible safety filter or empty response' });
    }

    console.log('[Gemini Proxy] Success, length:', text.length);
    return res.status(200).json({ response: text });
  } catch (err) {
    console.error('[Gemini Proxy] Exception:', err.message);
    return res.status(500).json({ error: `Failed to contact Gemini API: ${err.message}` });
  }
}
