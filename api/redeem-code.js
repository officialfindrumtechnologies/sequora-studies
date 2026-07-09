// Activation code redemption — student types in a code an admin generated
// (see api/admin.js `generate_code`) and sent them manually after payment.
// Self-service, instant — no admin approval step needed.

import { createClient } from '@supabase/supabase-js';
import { applyCors } from './_cors.js';
import { emailActivated } from './_email.js';

export default async function handler(req, res) {
  applyCors(req, res);
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Missing Authorization header' });

  const adminSb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: { user }, error: authErr } = await adminSb.auth.getUser(token);
  if (authErr || !user) return res.status(401).json({ error: 'Invalid session' });

  const rawCode = (req.body?.code || '').trim().toUpperCase();
  if (!rawCode) return res.status(400).json({ error: 'Code required' });

  // Atomic claim: only succeeds if the code exists and is still unredeemed —
  // WHERE redeemed_by IS NULL makes this safe against two simultaneous redemptions.
  const { data: claimed, error: claimErr } = await adminSb
    .from('activation_codes')
    .update({ redeemed_by: user.id, redeemed_at: new Date().toISOString() })
    .eq('code', rawCode)
    .is('redeemed_by', null)
    .select('tier, duration_days')
    .maybeSingle();

  if (claimErr) return res.status(500).json({ error: 'Redemption failed: ' + claimErr.message });
  if (!claimed) {
    const { data: existing } = await adminSb
      .from('activation_codes')
      .select('id')
      .eq('code', rawCode)
      .maybeSingle();
    return res.status(existing ? 409 : 404).json({
      error: existing ? 'This code has already been used.' : 'Invalid activation code.',
    });
  }

  const expiresAt = new Date(Date.now() + claimed.duration_days * 86_400_000).toISOString();
  const TIER_LABELS = { paid_1: 'Basic', paid_2: 'Plus', paid_3: 'Pro' };

  const { error: subErr } = await adminSb
    .from('subscriptions')
    .update({
      tier: claimed.tier,
      status: 'active',
      activated_at: new Date().toISOString(),
      activated_by: null,
      expires_at: expiresAt,
      bkash_trx_id: null,
      bkash_submitted_at: null,
      bkash_amount: null,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', user.id);

  if (subErr) return res.status(500).json({ error: 'Activation failed: ' + subErr.message });

  await adminSb.from('admin_log').insert({
    admin_id: user.id, action: 'redeem_code', target_user: user.id,
    details: { code: rawCode, tier: claimed.tier, days: claimed.duration_days },
  });

  emailActivated({ email: user.email, planLabel: TIER_LABELS[claimed.tier] || claimed.tier, expiresAt })
    .catch(e => console.error('[Redeem] Activation email failed:', e.message));

  return res.status(200).json({ ok: true, tier: claimed.tier, expires_at: expiresAt });
}
