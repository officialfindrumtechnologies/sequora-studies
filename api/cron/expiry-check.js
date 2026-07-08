// Daily cron — runs at 09:00 UTC.
// 1. Sends 7-day expiry warnings.
// 2. Expires subscriptions past their expires_at and sends expiry email.
// Secured by CRON_SECRET env var (set in Vercel, sent as Authorization header by Vercel Cron).

import { createClient } from '@supabase/supabase-js';
import { emailExpiryWarning, emailExpired } from '../email.js';

const TIER_LABEL = { paid_1: 'Basic', paid_2: 'Pro', free: 'Free' };

export default async function handler(req, res) {
  // Vercel Cron sends Authorization: Bearer <CRON_SECRET>
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (token !== cronSecret) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const adminSb = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const now      = new Date();
  const in7days  = new Date(now.getTime() + 7 * 86_400_000).toISOString();
  const nowIso   = now.toISOString();

  const results = { warnings: 0, expired: 0, errors: [] };

  // ── 1. Expiry warnings (expires within 7 days, still active) ─────────────
  // Fetch active subscriptions expiring within 7 days from now
  const { data: expiringSoon, error: warnErr } = await adminSb
    .from('subscriptions')
    .select('user_id, tier, expires_at, profiles!inner(email)')
    .eq('status', 'active')
    .neq('tier', 'free')
    .gt('expires_at', nowIso)
    .lte('expires_at', in7days);

  if (warnErr) {
    console.error('[Cron] Warning query failed:', warnErr);
    results.errors.push('warning_query: ' + warnErr.message);
  } else {
    for (const row of expiringSoon || []) {
      const email = row.profiles?.email;
      if (!email) continue;

      try {
        // Query if warning was already logged in the last 10 days to prevent duplicates
        const { data: alreadyWarned } = await adminSb
          .from('admin_log')
          .select('id')
          .eq('action', 'expiry_warning')
          .eq('target_user', row.user_id)
          .gte('created_at', new Date(now.getTime() - 10 * 86_400_000).toISOString())
          .limit(1);

        if (alreadyWarned && alreadyWarned.length > 0) {
          continue; // Warning already sent for this period
        }

        await emailExpiryWarning({
          email,
          planLabel: TIER_LABEL[row.tier] || row.tier,
          expiresAt: row.expires_at,
        });

        // Insert warning log to prevent duplicate notifications
        await adminSb.from('admin_log').insert({
          admin_id:    null,
          action:      'expiry_warning',
          target_user: row.user_id,
          details:     { tier: row.tier, expires_at: row.expires_at },
        });

        results.warnings++;
      } catch (e) {
        console.error('[Cron] Warning email failed for', email, e.message);
        results.errors.push(`warn_email:${email}: ${e.message}`);
      }
    }
  }

  // ── 2. Expire overdue subscriptions ───────────────────────────────────────
  const { data: overdue, error: overdueErr } = await adminSb
    .from('subscriptions')
    .select('user_id, tier, expires_at, profiles!inner(email)')
    .eq('status', 'active')
    .neq('tier', 'free')
    .lt('expires_at', nowIso);

  if (overdueErr) {
    console.error('[Cron] Overdue query failed:', overdueErr);
    results.errors.push('overdue_query: ' + overdueErr.message);
  } else {
    for (const row of overdue || []) {
      const email = row.profiles?.email;

      // Update status to expired
      const { error: updateErr } = await adminSb
        .from('subscriptions')
        .update({ status: 'expired', updated_at: nowIso })
        .eq('user_id', row.user_id);

      if (updateErr) {
        console.error('[Cron] Expire update failed for', row.user_id, updateErr.message);
        results.errors.push(`expire_update:${row.user_id}: ${updateErr.message}`);
        continue;
      }

      await adminSb.from('admin_log').insert({
        admin_id:    null,
        action:      'auto_expire',
        target_user: row.user_id,
        details:     { tier: row.tier, expires_at: row.expires_at },
      });

      if (email) {
        try {
          await emailExpired({
            email,
            planLabel: TIER_LABEL[row.tier] || row.tier,
          });
        } catch (e) {
          console.error('[Cron] Expiry email failed for', email, e.message);
          results.errors.push(`expire_email:${email}: ${e.message}`);
        }
      }

      results.expired++;
    }
  }

  console.log('[Cron] expiry-check done:', results);
  return res.status(200).json({ ok: true, ...results });
}
