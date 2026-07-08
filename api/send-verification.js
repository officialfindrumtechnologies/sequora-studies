// Supabase Auth Hook — Send Email
// Configured in: Supabase dashboard > Authentication > Hooks > Send Email
// Set hook URL to: https://sequora-studies.vercel.app/api/send-verification
// Set hook secret in SUPABASE_HOOK_SECRET env var

import { emailVerification } from './email.js';

const SUPPORTED_ACTIONS = new Set(['signup', 'recovery', 'magiclink', 'email_change']);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify webhook secret (Supabase sends it as Bearer token)
  const hookSecret = process.env.SUPABASE_HOOK_SECRET;
  if (hookSecret) {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace(/^Bearer\s+/i, '');
    if (token !== hookSecret) {
      console.warn('[send-verification] Unauthorized hook call — secret mismatch');
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } else if (process.env.NODE_ENV === 'production') {
    console.error('[send-verification] SUPABASE_HOOK_SECRET is not configured in production');
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  const { user, email_data } = req.body || {};
  if (!user?.email || !email_data) {
    return res.status(400).json({ error: 'Missing user or email_data in payload' });
  }

  const actionType = email_data.email_action_type || 'signup';
  if (!SUPPORTED_ACTIONS.has(actionType)) {
    // Not an action we send custom emails for — tell Supabase to use default
    return res.status(200).json({ message: 'skipped' });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
  const redirectTo  = email_data.redirect_to || `https://sequora-studies.vercel.app/app`;
  const tokenHash   = email_data.token_hash  || email_data.token || '';

  const confirmUrl = tokenHash
    ? `${supabaseUrl}/auth/v1/verify?token=${tokenHash}&type=${actionType}&redirect_to=${encodeURIComponent(redirectTo)}`
    : redirectTo;

  try {
    await emailVerification({
      email:      user.email,
      confirmUrl,
      actionType,
    });
    return res.status(200).json({ message: 'ok' });
  } catch (err) {
    console.error('[send-verification] Resend error:', err.message);
    // Return 500 — Supabase will fall back to its own email on hook failure
    return res.status(500).json({ error: err.message });
  }
}
