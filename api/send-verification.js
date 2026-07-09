// Supabase Auth Hook — Send Email
// Configured in: Supabase dashboard > Authentication > Hooks > Send Email
// Set hook URL to: https://www.sequorastudies.com/api/send-verification
// Set hook secret in SUPABASE_HOOK_SECRET env var (format: v1,whsec_...)
//
// Supabase's HTTPS Auth Hooks use the Standard Webhooks signing spec —
// the payload is HMAC-signed, not sent as a simple Bearer token. Verification
// needs the exact raw request body bytes, so body parsing is disabled here.

import { Webhook } from 'standardwebhooks';
import { emailVerification } from './email.js';

export const config = { api: { bodyParser: false } };

const SUPPORTED_ACTIONS = new Set(['signup', 'recovery', 'magiclink', 'email_change']);

async function readRawBody(req) {
  if (typeof req.rawBody === 'string') return req.rawBody;
  let body = '';
  for await (const chunk of req) body += chunk;
  return body;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawBody = await readRawBody(req);

  const hookSecret = process.env.SUPABASE_HOOK_SECRET;
  if (!hookSecret) {
    console.error('[send-verification] SUPABASE_HOOK_SECRET is not configured');
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  let payload;
  try {
    const wh = new Webhook(hookSecret.replace(/^v1,/, ''));
    payload = wh.verify(rawBody, req.headers);
  } catch (err) {
    console.warn('[send-verification] Signature verification failed:', err.message);
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { user, email_data } = payload || {};
  if (!user?.email || !email_data) {
    return res.status(400).json({ error: 'Missing user or email_data in payload' });
  }

  const actionType = email_data.email_action_type || 'signup';
  if (!SUPPORTED_ACTIONS.has(actionType)) {
    // Not an action we send custom emails for — tell Supabase to use default
    return res.status(200).json({ message: 'skipped' });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
  const redirectTo  = email_data.redirect_to || `https://www.sequorastudies.com/app`;
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
