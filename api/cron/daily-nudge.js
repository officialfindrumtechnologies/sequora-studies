// Daily cron — runs at 12:00 UTC (18:00 / 6pm Bangladesh time).
// Sends at most one short nudge per user per day, only when there's a real
// reason to: streak at risk, topics due for spaced recall, or a re-engagement
// ping after a few quiet days. Never emails someone who already studied today.

import { createClient } from '@supabase/supabase-js';
import { emailDailyNudge } from '../_email.js';

// Same 2-4-7 spaced-recall staging as the app itself (main.js recallDueSb) —
// must match exactly, otherwise the email quotes a number the app disagrees with.
const RECALL_STEPS = [2, 4, 7];

function computeStreak(sessionDates) {
  if (!sessionDates.length) return 0;
  const days = [...new Set(sessionDates.map(d => d.slice(0, 10)))].sort().reverse();
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  if (days[0] !== today && days[0] !== yesterday) return 0;
  let streak = 1;
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1]);
    const curr = new Date(days[i]);
    const diff = Math.round((prev - curr) / 86_400_000);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

function countRecallsDue(topics) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  let count = 0;
  for (const tp of topics) {
    if (tp.status !== 'ready') continue;
    const reps = tp.recall_reps || 0;
    if (reps >= RECALL_STEPS.length) continue; // all 3 recalls done — mastered
    const base = new Date(tp.last_recall || tp.ready_at);
    if (isNaN(base.getTime())) continue;
    base.setHours(0, 0, 0, 0);
    const elapsed = Math.floor((today - base) / 86_400_000);
    if (elapsed >= RECALL_STEPS[reps]) count++;
  }
  return count;
}

export default async function handler(req, res) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (token !== cronSecret) return res.status(401).json({ error: 'Unauthorized' });
  }
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const adminSb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const streakWindow = new Date(now.getTime() - 60 * 86_400_000).toISOString().slice(0, 10);

  const { data: profiles, error: profilesErr } = await adminSb
    .from('profiles')
    .select('id, email, display_name, exam_date, preferences');
  if (profilesErr) {
    console.error('[DailyNudge] profiles query failed:', profilesErr);
    return res.status(500).json({ error: profilesErr.message });
  }
  if (!profiles?.length) return res.status(200).json({ ok: true, sent: 0, skipped: 0, errors: [] });

  // Opted out via preferences.daily_nudge === false (default on, same pattern
  // as suggest_chapters elsewhere in the app).
  const eligible = profiles.filter(p => p.email && p.preferences?.daily_nudge !== false);
  if (!eligible.length) return res.status(200).json({ ok: true, sent: 0, skipped: profiles.length, errors: [] });

  const userIds = eligible.map(p => p.id);

  const [{ data: subjectsAll }, { data: allTopics }, { data: streakSessions }, { data: todaySessions }] = await Promise.all([
    adminSb.from('subjects').select('id, user_id').in('user_id', userIds),
    adminSb.from('topics').select('user_id, status, recall_reps, last_recall, ready_at').in('user_id', userIds),
    adminSb.from('sessions').select('user_id, study_date').in('user_id', userIds).gte('study_date', streakWindow),
    adminSb.from('sessions').select('user_id').in('user_id', userIds).eq('study_date', todayStr),
  ]);

  const hasSubjects = new Set((subjectsAll || []).map(s => s.user_id));
  const studiedToday = new Set((todaySessions || []).map(s => s.user_id));

  const topicsByUser = {};
  for (const t of allTopics || []) (topicsByUser[t.user_id] ||= []).push(t);

  const streakDatesByUser = {};
  for (const s of streakSessions || []) (streakDatesByUser[s.user_id] ||= []).push(s.study_date);

  const results = { sent: 0, skipped: 0, errors: [] };

  for (const profile of eligible) {
    const uid = profile.id;

    // Not onboarded yet, or already studied today — nothing to nudge about.
    if (!hasSubjects.has(uid) || studiedToday.has(uid)) { results.skipped++; continue; }

    const streakDays = computeStreak(streakDatesByUser[uid] || []);
    const recallsDue = countRecallsDue(topicsByUser[uid] || []);
    const lastDate = (streakDatesByUser[uid] || []).sort().reverse()[0];
    const daysSinceLastSession = lastDate
      ? Math.floor((now - new Date(lastDate)) / 86_400_000)
      : null;

    // Priority: an at-risk streak is the strongest hook, then due recalls,
    // then a plain re-engagement ping after a few quiet days. If none apply
    // (e.g. brand-new user with no history yet), skip — nothing honest to say.
    let reason = null;
    if (streakDays > 0) reason = 'streak';
    else if (recallsDue > 0) reason = 'recall';
    else if (daysSinceLastSession !== null && daysSinceLastSession >= 2) reason = 'reengage';

    if (!reason) { results.skipped++; continue; }

    const examDaysLeft = profile.exam_date
      ? Math.ceil((new Date(profile.exam_date) - now) / 86_400_000)
      : null;

    try {
      await emailDailyNudge({
        email: profile.email,
        displayName: profile.display_name || profile.email.split('@')[0],
        reason, streakDays, recallsDue, daysSinceLastSession, examDaysLeft,
      });
      results.sent++;
    } catch (e) {
      console.error('[DailyNudge] email failed for', profile.email, e.message);
      results.errors.push(`${profile.email}: ${e.message}`);
    }
  }

  console.log('[DailyNudge] done:', results);
  return res.status(200).json({ ok: true, ...results });
}
