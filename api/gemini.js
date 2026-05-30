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
    // Call Gemini 1.5 Flash API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: `Gemini API returned error: ${errText}` });
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      return res.status(500).json({ error: 'Invalid response structure from Gemini API' });
    }

    return res.status(200).json({ response: text });
  } catch (err) {
    return res.status(500).json({ error: `Failed to contact Gemini API: ${err.message}` });
  }
}
