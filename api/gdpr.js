// Account deletion endpoint — requires service role to delete auth user.
// CASCADE on profiles → removes all child rows (subjects, topics, sessions,
// errors, papers, closeout, ai_usage, subscriptions).

import { createClient } from '@supabase/supabase-js';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';
const CONFIRM_STRING = 'DELETE MY ACCOUNT';

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
  const { data: { user }, error: authErr } = await adminSb.auth.getUser(token);
  if (authErr || !user) return res.status(401).json({ error: 'Invalid session' });

  // Require explicit confirmation string
  const { confirm } = req.body || {};
  if (confirm !== CONFIRM_STRING) {
    return res.status(400).json({ error: `Confirmation string must be exactly: "${CONFIRM_STRING}"` });
  }

  console.log(`[GDPR] Deleting account: user=${user.email} id=${user.id}`);

  // deleteUser cascades via FK: auth.users → profiles → all child tables
  const { error: deleteErr } = await adminSb.auth.admin.deleteUser(user.id);
  if (deleteErr) {
    console.error('[GDPR] deleteUser failed:', deleteErr);
    return res.status(500).json({ error: 'Account deletion failed: ' + deleteErr.message });
  }

  console.log(`[GDPR] Account deleted: ${user.email}`);
  return res.status(200).json({ ok: true });
}
