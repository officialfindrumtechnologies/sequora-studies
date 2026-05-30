import { createClient } from '@supabase/supabase-js';

// In-memory rate limiting map (reused per instance)
const rateLimitMap = new Map();

export default async function handler(req, res) {
  // Handle CORS / preflight requests
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get JWT from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }
  const token = authHeader.split(' ')[1];

  // Initialize Supabase Client server-side
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(500).json({ error: 'Server configuration error (Supabase credentials missing)' });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Verify User JWT
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return res.status(401).json({ error: 'Unauthorized JWT token validation failed' });
  }

  // Rate Limit: Max 10 requests per minute per user ID
  const userId = user.id;
  const now = Date.now();
  const windowMs = 60000;
  const maxLimit = 10;

  let requests = rateLimitMap.get(userId) || [];
  requests = requests.filter(time => now - time < windowMs);

  if (requests.length >= maxLimit) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute.' });
  }

  requests.push(now);
  rateLimitMap.set(userId, requests);

  // Verify Prompt
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    return res.status(500).json({ error: 'Server configuration error (Gemini API Key missing)' });
  }

  try {
    // Call Gemini 2.0 Flash API (current model as of 2025)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;
    console.log('[Gemini Proxy] Calling Gemini API for user:', userId);

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[Gemini Proxy] API error:', response.status, errText.slice(0, 500));
      return res.status(502).json({ error: `Gemini API error (${response.status}): ${errText.slice(0, 200)}` });
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('[Gemini Proxy] Unexpected response structure:', JSON.stringify(data).slice(0, 500));
      return res.status(502).json({ error: 'Gemini returned no text — possible safety filter or empty response' });
    }

    console.log('[Gemini Proxy] Success, response length:', text.length);
    return res.status(200).json({ response: text });
  } catch (err) {
    console.error('[Gemini Proxy] Exception:', err.message, err.stack);
    return res.status(500).json({ error: `Failed to contact Gemini API: ${err.message}` });
  }
}
