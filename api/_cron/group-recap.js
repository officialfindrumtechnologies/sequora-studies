// Weekly group recap — runs Monday 03:00 UTC (09:00 BST), just after the
// personal weekly report. One email per member of each group that actually
// studied last week; silent groups are skipped rather than sent an empty
// "0 hours" email nobody wants.

import { createClient } from '@supabase/supabase-js';
import { emailGroupRecap } from '../_email.js';
import { isDry, noteDry } from './_dry.js';

export default async function handler(req, res) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (token !== cronSecret) return res.status(401).json({ error: 'Unauthorized' });
  }
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const dry = isDry(req);

  const adminSb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  // last full Mon–Sun window
  const now = new Date();
  const day = (now.getUTCDay() + 6) % 7;            // 0 = Monday
  const thisMonday = new Date(now); thisMonday.setUTCDate(now.getUTCDate() - day); thisMonday.setUTCHours(0, 0, 0, 0);
  const lastMonday = new Date(thisMonday); lastMonday.setUTCDate(thisMonday.getUTCDate() - 7);
  const from = lastMonday.toISOString().slice(0, 10);
  const to = thisMonday.toISOString().slice(0, 10);

  const [{ data: groups }, { data: members }] = await Promise.all([
    adminSb.from('study_groups').select('id, name, daily_goal_sec'),
    adminSb.from('group_members').select('group_id, user_id'),
  ]);
  if (!groups?.length) return res.status(200).json({ ok: true, sent: 0, groups: 0 });

  const userIds = [...new Set((members || []).map(m => m.user_id))];
  const [{ data: profiles }, { data: sessions }] = await Promise.all([
    adminSb.from('profiles').select('id, email, display_name, email_reports').in('id', userIds),
    adminSb.from('sessions').select('user_id, duration_sec, study_date')
      .in('user_id', userIds).gte('study_date', from).lt('study_date', to),
  ]);

  const profById = {}; (profiles || []).forEach(p => { profById[p.id] = p; });
  const secByUser = {};
  (sessions || []).forEach(s => { secByUser[s.user_id] = (secByUser[s.user_id] || 0) + (s.duration_sec || 0); });

  const results = { sent: 0, skipped: 0, groups: 0, errors: [] };

  for (const g of groups) {
    const gm = (members || []).filter(m => m.group_id === g.id);
    if (gm.length < 2) { results.skipped++; continue; }   // solo group — nothing to compare

    const rows = gm.map(m => ({
      id: m.user_id,
      name: profById[m.user_id]?.display_name || 'Someone',
      hours: (secByUser[m.user_id] || 0) / 3600,
    })).sort((a, b) => b.hours - a.hours);

    const totalHours = rows.reduce((a, r) => a + r.hours, 0);
    if (totalHours <= 0) { results.skipped++; continue; }  // nobody studied — don't send

    results.groups++;
    for (const m of gm) {
      const prof = profById[m.user_id];
      if (!prof?.email || prof.email_reports === false) { results.skipped++; continue; }
      try {
        if (dry) { noteDry(results, prof.email); continue; }
        await emailGroupRecap({
          email: prof.email,
          displayName: prof.display_name,
          groupName: g.name,
          stats: {
            totalHours,
            topName: rows[0]?.name || null,
            topHours: rows[0]?.hours || 0,
            yourHours: (secByUser[m.user_id] || 0) / 3600,
            memberRows: rows.map(r => ({ ...r, isSelf: r.id === m.user_id })),
            goalStreak: 0,
          },
        });
        results.sent++;
      } catch (e) {
        console.error('[GroupRecap] failed for', prof.email, e.message);
        results.errors.push(`${prof.email}: ${e.message}`);
      }
    }
  }

  console.log('[GroupRecap] done:', results);
  return res.status(200).json({ ok: true, ...results });
}
