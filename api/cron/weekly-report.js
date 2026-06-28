// Weekly cron — runs every Monday at 02:00 UTC (08:00 BST).
// Sends each active user a personal study stats email for the past 7 days.

import { createClient } from '@supabase/supabase-js';
import { emailWeeklyReport } from '../email.js';

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

export default async function handler(req, res) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (token !== cronSecret) return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const adminSb = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const now = new Date();
  const nowIso = now.toISOString();
  const weekAgo = new Date(now.getTime() - 7 * 86_400_000).toISOString();
  const streakWindow = new Date(now.getTime() - 60 * 86_400_000).toISOString();

  // 1. All opted-in profiles
  const { data: profiles, error: profilesErr } = await adminSb
    .from('profiles')
    .select('id, email, display_name, exam_date, email_reports')
    .or('email_reports.is.null,email_reports.eq.true');

  if (profilesErr) {
    console.error('[WeeklyCron] profiles query failed:', profilesErr);
    return res.status(500).json({ error: profilesErr.message });
  }
  if (!profiles?.length) return res.status(200).json({ ok: true, sent: 0, skipped: 0, errors: [] });

  const userIds = profiles.map(p => p.id);

  // 2. Sessions last 7 days
  const { data: weeklySessions } = await adminSb
    .from('sessions')
    .select('user_id, subject_id, duration_sec, study_date')
    .in('user_id', userIds)
    .gte('study_date', weekAgo.slice(0, 10));

  // 3. Sessions last 60 days (for streak)
  const { data: streakSessions } = await adminSb
    .from('sessions')
    .select('user_id, study_date')
    .in('user_id', userIds)
    .gte('study_date', streakWindow.slice(0, 10));

  // 4. Overdue recalls
  const { data: overdueTopic } = await adminSb
    .from('topics')
    .select('user_id, ready_at')
    .in('user_id', userIds)
    .not('ready_at', 'is', null)
    .lte('ready_at', nowIso);

  // 5. Subjects (for name lookup)
  const { data: subjectsAll } = await adminSb
    .from('subjects')
    .select('id, user_id, name')
    .in('user_id', userIds);

  // Index by user
  const weeklyByUser = {};
  for (const s of weeklySessions || []) {
    (weeklyByUser[s.user_id] ||= []).push(s);
  }
  const streakByUser = {};
  for (const s of streakSessions || []) {
    (streakByUser[s.user_id] ||= []).push(s.study_date);
  }
  const overdueByUser = {};
  for (const t of overdueTopic || []) {
    overdueByUser[t.user_id] = (overdueByUser[t.user_id] || 0) + 1;
  }
  const subjectMap = {};
  for (const s of subjectsAll || []) {
    subjectMap[s.id] = s.name;
  }

  const results = { sent: 0, skipped: 0, errors: [] };

  for (const profile of profiles) {
    const uid = profile.id;
    const sessions = weeklyByUser[uid] || [];

    if (!profile.email) { results.skipped++; continue; }

    const studySec = sessions.reduce((sum, s) => sum + (s.duration_sec || 0), 0);
    const studyHours = studySec / 3600;
    const sessionsCount = sessions.length;

    // Subject with most time
    const subjectDuration = {};
    for (const s of sessions) {
      if (s.subject_id) {
        subjectDuration[s.subject_id] = (subjectDuration[s.subject_id] || 0) + (s.duration_sec || 0);
      }
    }
    const topSubjectId = Object.entries(subjectDuration).sort((a, b) => b[1] - a[1])[0]?.[0];
    const topSubject = topSubjectId ? (subjectMap[topSubjectId] || null) : null;
    const topicsStudied = Object.keys(subjectDuration).length;

    const streakDays = computeStreak(streakByUser[uid] || []);
    const recallsDue = overdueByUser[uid] || 0;

    const examDaysLeft = profile.exam_date
      ? Math.ceil((new Date(profile.exam_date) - now) / 86_400_000)
      : null;

    const weeklyGoalMet = studyHours >= 5;

    try {
      await emailWeeklyReport({
        email: profile.email,
        displayName: profile.display_name || profile.email.split('@')[0],
        stats: { studyHours, sessionsCount, topicsStudied, recallsDue, streakDays, topSubject, examDaysLeft, weeklyGoalMet },
      });
      results.sent++;
    } catch (e) {
      console.error('[WeeklyCron] email failed for', profile.email, e.message);
      results.errors.push(`${profile.email}: ${e.message}`);
    }
  }

  console.log('[WeeklyCron] done:', results);
  return res.status(200).json({ ok: true, ...results });
}
