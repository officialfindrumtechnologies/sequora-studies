import { createClient } from '@supabase/supabase-js';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';

const PLAN_META = {
  basic_monthly: { tier: 'paid_1', amount: 149,  label: 'Basic — Monthly'      },
  basic_6mo:     { tier: 'paid_1', amount: 699,  label: 'Basic — 6 Months'     },
  pro_monthly:   { tier: 'paid_2', amount: 299,  label: 'Pro — Monthly'         },
  pro_6mo:       { tier: 'paid_2', amount: 1399, label: 'Pro — 6 Months'        },
};

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

  const { plan, trxId, phone } = req.body || {};

  // Validate plan
  const planMeta = PLAN_META[plan];
  if (!planMeta) {
    return res.status(400).json({ error: `Invalid plan. Must be one of: ${Object.keys(PLAN_META).join(', ')}` });
  }

  // Validate TrxID: bKash TrxIDs are 10 characters, alphanumeric
  if (!trxId || typeof trxId !== 'string' || trxId.trim().length < 6) {
    return res.status(400).json({ error: 'Invalid bKash Transaction ID (min 6 characters)' });
  }

  // Phone optional but validate if provided
  if (phone && !/^[0-9+\-\s]{7,15}$/.test(phone.trim())) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }

  // Check subscription row exists (should always exist via trigger)
  const { data: existing, error: fetchErr } = await adminSb
    .from('subscriptions')
    .select('id, tier, bkash_trx_id, bkash_submitted_at')
    .eq('user_id', user.id)
    .single();

  if (fetchErr || !existing) {
    return res.status(500).json({ error: 'Subscription record not found. Contact support.' });
  }

  // Guard: don't allow resubmission of same TrxID
  if (existing.bkash_trx_id === trxId.trim()) {
    return res.status(409).json({ error: 'This Transaction ID was already submitted.' });
  }

  // Update subscription with payment details (tier stays unchanged until admin activates)
  const { error: updateErr } = await adminSb
    .from('subscriptions')
    .update({
      bkash_trx_id:       trxId.trim(),
      bkash_amount:       planMeta.amount,
      bkash_submitted_at: new Date().toISOString(),
      notes:              plan,   // plan key — admin uses this to know what to activate
      updated_at:         new Date().toISOString(),
    })
    .eq('user_id', user.id);

  if (updateErr) {
    console.error('[Payment] Update failed:', updateErr);
    return res.status(500).json({ error: 'Failed to record payment submission.' });
  }

  console.log(`[Payment] TrxID submitted: user=${user.email} plan=${plan} trxId=${trxId.trim()}`);
  return res.status(200).json({
    ok: true,
    message: 'Payment submitted. We will verify and activate your plan within 24 hours.',
    plan: planMeta.label,
    amount: planMeta.amount,
  });
}
