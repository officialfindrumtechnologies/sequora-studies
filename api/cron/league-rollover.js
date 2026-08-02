// Weekly league promotion/demotion — runs Monday 01:00 UTC, before the weekly
// report at 02:00 so the email a user receives reflects the tier they just
// landed in rather than the one they left.
//
// The Focus Timer has always said "Top 5 promote, bottom 5 demote each week".
// Until this existed nothing moved anyone: every profile sat at bronze with
// league_week never set.

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (token !== cronSecret) return res.status(401).json({ error: 'Unauthorized' });
  }
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const adminSb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  // The rollover closes the week that has just ended. Passing it explicitly
  // rather than letting the function default keeps a manual re-run honest.
  const now = new Date();
  const day = (now.getUTCDay() + 6) % 7;                 // 0 = Monday
  const thisMonday = new Date(now);
  thisMonday.setUTCDate(now.getUTCDate() - day);
  thisMonday.setUTCHours(0, 0, 0, 0);
  const lastMonday = new Date(thisMonday);
  lastMonday.setUTCDate(thisMonday.getUTCDate() - 7);
  const week = lastMonday.toISOString().slice(0, 10);

  const { data, error } = await adminSb.rpc('run_league_rollover', { p_week: week });
  if (error) {
    console.error('[LeagueRollover] failed:', error.message);
    return res.status(500).json({ error: error.message });
  }

  const result = Array.isArray(data) ? data[0] : data;
  console.log('[LeagueRollover] done:', result);
  return res.status(200).json({ ok: true, ...result });
}
