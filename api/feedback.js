import { createClient } from '@supabase/supabase-js';
import { applyCors } from './_cors.js';

export default async function handler(req, res) {
  applyCors(req, res);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Missing Authorization header' });

  const adminSb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: { user }, error: authErr } = await adminSb.auth.getUser(token);
  if (authErr || !user) return res.status(401).json({ error: 'Invalid session' });

  if (req.method === 'GET') {
    const { data, error } = await adminSb
      .from('feedback_submissions')
      .select('id, type, message, status, reward_taka, created_at, reviewed_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: 'Failed to load submissions' });
    return res.status(200).json({ submissions: data || [] });
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { type, message } = req.body || {};
  if (!['bug', 'feature'].includes(type)) {
    return res.status(400).json({ error: 'type must be "bug" or "feature"' });
  }
  const trimmed = (message || '').trim();
  if (trimmed.length < 5 || trimmed.length > 2000) {
    return res.status(400).json({ error: 'Message must be between 5 and 2000 characters' });
  }

  // Light rate-limit: no more than 10 submissions per user per rolling 24h,
  // so a bad actor can't spam the review queue.
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count } = await adminSb
    .from('feedback_submissions')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .gte('created_at', since);
  if ((count || 0) >= 10) {
    return res.status(429).json({ error: 'Too many submissions today — try again tomorrow' });
  }

  const { data, error } = await adminSb
    .from('feedback_submissions')
    .insert({ user_id: user.id, type, message: trimmed })
    .select('id, type, message, status, created_at')
    .single();
  if (error) return res.status(500).json({ error: 'Failed to submit' });

  return res.status(200).json({ submission: data });
}
