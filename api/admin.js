import { createClient } from '@supabase/supabase-js';
import { emailActivated, emailSuspended } from './email.js';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';

const PLAN_DURATIONS = {
  basic_monthly: { tier: 'paid_1', days: 30,  label: 'Basic — Monthly'   },
  basic_6mo:     { tier: 'paid_1', days: 182, label: 'Basic — 6 Months'  },
  pro_monthly:   { tier: 'paid_2', days: 30,  label: 'Pro — Monthly'     },
  pro_6mo:       { tier: 'paid_2', days: 182, label: 'Pro — 6 Months'    },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // JWT verify
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Missing Authorization header' });

  const adminSb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: { user }, error: authErr } = await adminSb.auth.getUser(token);
  if (authErr || !user) return res.status(401).json({ error: 'Invalid session' });

  // Admin gate — server-side only, never expose ADMIN_EMAIL to client
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || user.email !== adminEmail) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const action = req.method === 'GET'
    ? req.query?.action
    : (req.body?.action || null);

  // ── GET: list users ────────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'list_users') {
    const { data, error } = await adminSb
      .from('subscriptions')
      .select(`
        id, user_id, tier, status,
        bkash_trx_id, bkash_amount, bkash_submitted_at,
        activated_at, expires_at, notes, updated_at,
        profiles!inner ( email, display_name, exam_board, created_at )
      `)
      .order('bkash_submitted_at', { ascending: false, nullsLast: true });

    if (error) {
      console.error('[Admin] list_users error:', error);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }

    return res.status(200).json({ users: data });
  }

  // ── POST actions ───────────────────────────────────────────────────────────
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { userId } = req.body || {};
  if (!userId) return res.status(400).json({ error: 'userId required' });

  // ── activate ───────────────────────────────────────────────────────────────
  if (action === 'activate') {
    const { plan } = req.body;
    const planMeta = PLAN_DURATIONS[plan];
    if (!planMeta) return res.status(400).json({ error: 'Invalid plan key' });

    const expiresAt = new Date(Date.now() + planMeta.days * 86_400_000).toISOString();

    const { error } = await adminSb
      .from('subscriptions')
      .update({
        tier:         planMeta.tier,
        status:       'active',
        activated_at: new Date().toISOString(),
        activated_by: user.id,
        expires_at:   expiresAt,
        updated_at:   new Date().toISOString(),
      })
      .eq('user_id', userId);

    if (error) return res.status(500).json({ error: 'Activation failed: ' + error.message });

    await adminSb.from('admin_log').insert({
      admin_id:    user.id,
      action:      'activate',
      target_user: userId,
      details:     { plan, tier: planMeta.tier, expires_at: expiresAt, days: planMeta.days },
    });

    // Fire-and-forget email — don't block response
    adminSb.from('profiles').select('email').eq('id', userId).single()
      .then(({ data }) => {
        if (data?.email) {
          emailActivated({ email: data.email, planLabel: planMeta.label, expiresAt })
            .catch(e => console.error('[Admin] Activation email failed:', e.message));
        }
      });

    console.log(`[Admin] Activated user=${userId} plan=${plan} expires=${expiresAt}`);
    return res.status(200).json({ ok: true, expires_at: expiresAt, tier: planMeta.tier });
  }

  // ── change_tier ────────────────────────────────────────────────────────────
  if (action === 'change_tier') {
    const { tier } = req.body;
    if (!['free', 'paid_1', 'paid_2'].includes(tier)) {
      return res.status(400).json({ error: 'Invalid tier' });
    }

    const updates = { tier, updated_at: new Date().toISOString() };
    if (tier === 'free') {
      updates.status = 'active';
      updates.expires_at = null;
    }

    const { error } = await adminSb.from('subscriptions').update(updates).eq('user_id', userId);
    if (error) return res.status(500).json({ error: 'Tier change failed: ' + error.message });

    await adminSb.from('admin_log').insert({
      admin_id: user.id, action: 'change_tier', target_user: userId, details: { tier },
    });

    return res.status(200).json({ ok: true });
  }

  // ── suspend ────────────────────────────────────────────────────────────────
  if (action === 'suspend') {
    const { error } = await adminSb
      .from('subscriptions')
      .update({ status: 'suspended', updated_at: new Date().toISOString() })
      .eq('user_id', userId);

    if (error) return res.status(500).json({ error: 'Suspend failed: ' + error.message });

    await adminSb.from('admin_log').insert({
      admin_id: user.id, action: 'suspend', target_user: userId, details: { reason: req.body.reason || '' },
    });

    // Fire-and-forget email
    adminSb.from('profiles').select('email').eq('id', userId).single()
      .then(({ data }) => {
        if (data?.email) {
          emailSuspended({ email: data.email, reason: req.body.reason || '' })
            .catch(e => console.error('[Admin] Suspension email failed:', e.message));
        }
      });

    return res.status(200).json({ ok: true });
  }

  // ── unsuspend ──────────────────────────────────────────────────────────────
  if (action === 'unsuspend') {
    const { error } = await adminSb
      .from('subscriptions')
      .update({ status: 'active', updated_at: new Date().toISOString() })
      .eq('user_id', userId);

    if (error) return res.status(500).json({ error: 'Unsuspend failed: ' + error.message });

    await adminSb.from('admin_log').insert({
      admin_id: user.id, action: 'unsuspend', target_user: userId, details: {},
    });

    return res.status(200).json({ ok: true });
  }

  // ── dismiss TrxID (mark reviewed without activating) ──────────────────────
  if (action === 'dismiss_trx') {
    const { error } = await adminSb
      .from('subscriptions')
      .update({ bkash_trx_id: null, bkash_submitted_at: null, bkash_amount: null, updated_at: new Date().toISOString() })
      .eq('user_id', userId);

    if (error) return res.status(500).json({ error: 'Dismiss failed: ' + error.message });

    await adminSb.from('admin_log').insert({
      admin_id: user.id, action: 'dismiss_trx', target_user: userId, details: { reason: req.body.reason || '' },
    });

    return res.status(200).json({ ok: true });
  }

  return res.status(400).json({ error: `Unknown action: ${action}` });
}
