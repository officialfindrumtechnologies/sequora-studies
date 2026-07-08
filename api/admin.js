import { createClient } from '@supabase/supabase-js';
import { emailActivated, emailSuspended, emailWeeklyReport } from './email.js';
import { generateAndInsert, detectExamFormat } from './generate-questions.js';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';

const PLAN_DURATIONS = {
  basic_monthly: { tier: 'paid_1', days: 30,  label: 'Basic — Monthly'   },
  basic_6mo:     { tier: 'paid_1', days: 182, label: 'Basic — 6 Months'  },
  pro_monthly:   { tier: 'paid_2', days: 30,  label: 'Pro — Monthly'     },
  pro_6mo:       { tier: 'paid_2', days: 182, label: 'Pro — 6 Months'    },
};

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function monthStartISO(monthsAgo = 0) {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() - monthsAgo);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

// Build a userId → email map from profiles for a set of user IDs
async function emailMap(adminSb, userIds) {
  if (!userIds.length) return {};
  const { data } = await adminSb.from('profiles').select('id, email').in('id', userIds);
  const map = {};
  (data || []).forEach(p => { map[p.id] = p.email; });
  return map;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Missing Authorization header' });

  const adminSb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: { user }, error: authErr } = await adminSb.auth.getUser(token);
  if (authErr || !user) return res.status(401).json({ error: 'Invalid session' });

  // Get admin role from database
  let role = null;
  const { data: adminUser } = await adminSb
    .from('admin_users')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (adminUser) {
    role = adminUser.role;
  } else {
    // Fallback: check hardcoded super-admin emails
    const adminEmail = process.env.ADMIN_EMAIL;
    if (user.email === 'nakibmdeusuf10@gmail.com' || user.email === 'officialfindrumtechnologies@gmail.com' || (adminEmail && user.email === adminEmail)) {
      role = 'super_admin';
    }
  }

  if (!role) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Restrict write actions based on admin role (RBAC)
  if (req.method === 'POST') {
    if (role === 'editor') {
      const billingActions = new Set(['activate', 'change_tier', 'dismiss_trx', 'simulate_bkash_payment']);
      if (billingActions.has(action)) {
        return res.status(403).json({ error: 'Unauthorized: Editors cannot modify billing state' });
      }
    } else if (role === 'support') {
      const contentActions = new Set([
        'delete_question', 'update_question', 'delete_error', 'resolve_error',
        'create_announcement', 'toggle_announcement', 'delete_announcement', 'batch_generate_questions'
      ]);
      if (contentActions.has(action)) {
        return res.status(403).json({ error: 'Unauthorized: Support agents cannot modify content or announcements' });
      }
    }
  }

  const action = req.method === 'GET'
    ? req.query?.action
    : (req.body?.action || null);

  // ── GET: list_users ────────────────────────────────────────────────────────
  // ── GET: list_users ────────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'list_users') {
    // Query profiles and subscriptions in parallel
    const [profilesRes, subsRes] = await Promise.all([
      adminSb.from('profiles').select('id, email, display_name, exam_board, qualification, created_at').order('created_at', { ascending: false }),
      adminSb.from('subscriptions').select('user_id, id, tier, status, bkash_trx_id, bkash_amount, bkash_submitted_at, activated_at, expires_at, notes, updated_at'),
    ]);

    if (profilesRes.error) {
      console.error('[Admin] list_users error:', profilesRes.error);
      return res.status(500).json({ error: 'Failed to fetch users: ' + profilesRes.error.message });
    }

    const profilesData = profilesRes.data || [];
    const subMap = {};
    (subsRes.data || []).forEach(s => { subMap[s.user_id] = s; });

    // Attempt to query optimized database aggregates view
    const aggRes = await adminSb.from('user_study_aggregates').select('*');
    if (aggRes.error) {
      // Fallback: Aggregate sessions, subjects, topics in JS memory if view is not applied yet
      console.warn('[Admin API] Fallback to JS aggregations for list_users:', aggRes.error.message);
      const [sessRes, subjectRes, topicRes] = await Promise.all([
        adminSb.from('sessions').select('user_id, duration_sec, study_date'),
        adminSb.from('subjects').select('user_id'),
        adminSb.from('topics').select('user_id'),
      ]);

      const sessMap = {};
      (sessRes.data || []).forEach(s => {
        if (!sessMap[s.user_id]) sessMap[s.user_id] = { totalSec: 0, lastActive: null };
        sessMap[s.user_id].totalSec += s.duration_sec || 0;
        if (!sessMap[s.user_id].lastActive || s.study_date > sessMap[s.user_id].lastActive) {
          sessMap[s.user_id].lastActive = s.study_date;
        }
      });

      const subjMap = {};
      (subjectRes.data || []).forEach(s => { subjMap[s.user_id] = (subjMap[s.user_id] || 0) + 1; });

      const topMap = {};
      (topicRes.data || []).forEach(t => { topMap[t.user_id] = (topMap[t.user_id] || 0) + 1; });

      const users = profilesData.map(p => {
        const sub = subMap[p.id] || {};
        return {
          user_id: p.id,
          tier: sub.tier || 'free',
          status: sub.status || 'active',
          bkash_trx_id: sub.bkash_trx_id || null,
          bkash_amount: sub.bkash_amount || null,
          bkash_submitted_at: sub.bkash_submitted_at || null,
          activated_at: sub.activated_at || null,
          expires_at: sub.expires_at || null,
          notes: sub.notes || null,
          profiles: {
            email: p.email,
            display_name: p.display_name,
            exam_board: p.exam_board,
            qualification: p.qualification,
            created_at: p.created_at,
          },
          studyHours: Math.round((sessMap[p.id]?.totalSec || 0) / 360) / 10,
          lastActive: sessMap[p.id]?.lastActive || null,
          subjectsCount: subjMap[p.id] || 0,
          topicsCount: topMap[p.id] || 0,
        };
      });
      return res.status(200).json({ users });
    }

    const aggMap = {};
    (aggRes.data || []).forEach(a => { aggMap[a.user_id] = a; });

    // Flatten to same shape the frontend expects
    const users = profilesData.map(p => {
      const sub = subMap[p.id] || {};
      const agg = aggMap[p.id] || {};
      return {
        user_id: p.id,
        tier: sub.tier || 'free',
        status: sub.status || 'active',
        bkash_trx_id: sub.bkash_trx_id || null,
        bkash_amount: sub.bkash_amount || null,
        bkash_submitted_at: sub.bkash_submitted_at || null,
        activated_at: sub.activated_at || null,
        expires_at: sub.expires_at || null,
        notes: sub.notes || null,
        profiles: {
          email: p.email,
          display_name: p.display_name,
          exam_board: p.exam_board,
          qualification: p.qualification,
          created_at: p.created_at,
        },
        studyHours: Math.round((agg.total_study_seconds || 0) / 360) / 10,
        lastActive: agg.last_active_date || null,
        subjectsCount: agg.subjects_count || 0,
        topicsCount: agg.topics_count || 0,
      };
    });

    return res.status(200).json({ users });
  }

  // ── GET: dashboard_stats ───────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'dashboard_stats') {
    const today = todayStr();
    const monthStart = monthStartISO(0);

    const [usersRes, paidRes, pendingRes, activeTodayRes, geminiRes, revRes] = await Promise.all([
      // Total users = all profiles (not subscriptions — users without subscription rows are still users)
      adminSb.from('profiles').select('*', { count: 'exact', head: true }),
      adminSb.from('subscriptions').select('*', { count: 'exact', head: true }).neq('tier', 'free').eq('status', 'active'),
      adminSb.from('subscriptions').select('*', { count: 'exact', head: true }).not('bkash_trx_id', 'is', null).neq('status', 'active'),
      // Active today = distinct users with a session today (study_date is a date string 'YYYY-MM-DD')
      adminSb.from('sessions').select('user_id').eq('study_date', today),
      adminSb.from('api_usage_counters').select('count').eq('counter_key', 'gemini_grounded_search').eq('reset_date', today).maybeSingle(),
      adminSb.from('subscriptions').select('bkash_amount').gte('activated_at', monthStart).not('bkash_amount', 'is', null),
    ]);

    const activeToday = new Set((activeTodayRes.data || []).map(s => s.user_id)).size;

    // errors today — graceful if table missing or logged_at column absent
    let errorsToday = 0;
    try {
      const errRes = await adminSb
        .from('errors')
        .select('*', { count: 'exact', head: true })
        .eq('logged_at', today);
      if (!errRes.error) errorsToday = errRes.count || 0;
    } catch (_) { /* table may not exist */ }

    // Fetch total study seconds via RPC or fallback to raw load
    let totalStudyHours = 0;
    const totalSecRes = await adminSb.rpc('get_total_study_seconds');
    if (totalSecRes.error) {
      console.warn('[Admin API] Fallback to JS total calculation for dashboard_stats:', totalSecRes.error.message);
      const sessRes = await adminSb.from('sessions').select('duration_sec');
      totalStudyHours = Math.round((sessRes.data || []).reduce((a, s) => a + (s.duration_sec || 0), 0) / 360) / 10;
    } else {
      totalStudyHours = Math.round((totalSecRes.data || 0) / 360) / 10;
    }

    const revenueThisMonth = Math.round((revRes.data || []).reduce((a, s) => a + (parseFloat(s.bkash_amount) || 0), 0));

    return res.status(200).json({
      totalUsers: usersRes.count || 0,
      paidActive: paidRes.count || 0,
      pendingTrx: pendingRes.count || 0,
      activeToday,
      totalStudyHours,
      geminiToday: geminiRes.data?.count || 0,
      errorsToday,
      revenueThisMonth,
    });
  }

  // ── GET: user_detail ───────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'user_detail') {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ error: 'userId required' });

    const [recentSessRes, subjectRes, topicRes] = await Promise.all([
      adminSb.from('sessions').select('id, subject_id, duration_sec, study_date').eq('user_id', userId).order('study_date', { ascending: false }).limit(5),
      adminSb.from('subjects').select('id, name, short_name').eq('user_id', userId).order('position'),
      adminSb.from('topics').select('id, status, ready_at, subject_id').eq('user_id', userId),
    ]);

    // All sessions for hour-by-subject breakdown
    const { data: allSess } = await adminSb.from('sessions').select('subject_id, duration_sec').eq('user_id', userId);
    const subHours = {};
    (allSess || []).forEach(s => { subHours[s.subject_id] = (subHours[s.subject_id] || 0) + (s.duration_sec || 0); });

    const subjects = (subjectRes.data || []).map(sub => ({
      ...sub,
      studyHours: Math.round((subHours[sub.id] || 0) / 360) / 10,
    }));

    // Enrich recent sessions with subject name
    const subNameMap = {};
    (subjectRes.data || []).forEach(s => { subNameMap[s.id] = s.name; });
    const recentSessions = (recentSessRes.data || []).map(s => ({
      ...s,
      subjectName: subNameMap[s.subject_id] || '–',
      hours: Math.round((s.duration_sec || 0) / 360) / 10,
    }));

    const topics = topicRes.data || [];
    const topicsLearning = topics.filter(t => t.status === 'learning').length;
    const topicsReady = topics.filter(t => t.status === 'ready').length;

    // error count — graceful if table missing
    let errorCount = 0;
    try {
      const errRes = await adminSb.from('errors').select('*', { count: 'exact', head: true }).eq('user_id', userId);
      errorCount = errRes.count || 0;
    } catch (_) { /* */ }

    return res.status(200).json({
      recentSessions,
      subjects,
      topicsTotal: topics.length,
      topicsLearning,
      topicsReady,
      errorCount,
    });
  }

  // ── GET: revenue_stats ─────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'revenue_stats') {
    const now = new Date();

    const { data: allPaid } = await adminSb
      .from('subscriptions')
      .select('user_id, bkash_amount, bkash_trx_id, tier, activated_at, expires_at, status')
      .not('bkash_amount', 'is', null)
      .not('activated_at', 'is', null)
      .order('activated_at', { ascending: false });

    const paid = allPaid || [];

    // Get emails for paid users
    const paidUserIds = [...new Set(paid.map(p => p.user_id))];
    const em = await emailMap(adminSb, paidUserIds);

    const allTime = Math.round(paid.reduce((a, s) => a + (parseFloat(s.bkash_amount) || 0), 0));
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const thisMonth = Math.round(paid.filter(s => new Date(s.activated_at) >= monthStart)
      .reduce((a, s) => a + (parseFloat(s.bkash_amount) || 0), 0));
    const lastMonth = Math.round(paid.filter(s => {
      const d = new Date(s.activated_at);
      return d >= lastMonthStart && d < monthStart;
    }).reduce((a, s) => a + (parseFloat(s.bkash_amount) || 0), 0));

    // 6-month chart
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end   = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const total = Math.round(paid.filter(s => {
        const d = new Date(s.activated_at);
        return d >= start && d < end;
      }).reduce((a, s) => a + (parseFloat(s.bkash_amount) || 0), 0));
      monthlyData.push({
        label: start.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }),
        value: total,
      });
    }

    // Pending payments
    const { data: pendingData } = await adminSb
      .from('subscriptions')
      .select('user_id, bkash_trx_id, bkash_amount, bkash_submitted_at, notes')
      .not('bkash_trx_id', 'is', null)
      .neq('status', 'active')
      .order('bkash_submitted_at', { ascending: false });

    const pendingUserIds = [...new Set((pendingData || []).map(p => p.user_id))];
    const pendingEmails = await emailMap(adminSb, pendingUserIds);

    const transactions = paid.slice(0, 100).map(t => ({ ...t, email: em[t.user_id] || '–' }));
    const pending = (pendingData || []).map(p => ({ ...p, email: pendingEmails[p.user_id] || '–' }));

    return res.status(200).json({ allTime, thisMonth, lastMonth, monthlyData, transactions, pending });
  }

  // ── GET: activity_stats ────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'activity_stats') {
    const today = todayStr();
    const monthStart = monthStartISO(0).slice(0, 10);
    const d14 = new Date(); d14.setDate(d14.getDate() - 13);
    const since14 = d14.toISOString().slice(0, 10);

    // Fetch popularity from view and other stats in parallel
    const [todaySessRes, monthSessRes, allSessRes, popularityRes, recentSessRes] = await Promise.all([
      adminSb.from('sessions').select('user_id').eq('study_date', today),
      adminSb.from('sessions').select('duration_sec').gte('study_date', monthStart),
      adminSb.from('sessions').select('study_date, duration_sec').gte('study_date', since14),
      adminSb.from('subject_topic_counts').select('subject_name, topics_count').order('topics_count', { ascending: false }).limit(10),
      adminSb.from('sessions').select('user_id, subject_id, duration_sec, study_date').order('study_date', { ascending: false }).limit(50),
    ]);

    const activeToday = new Set((todaySessRes.data || []).map(s => s.user_id)).size;
    const hoursThisMonth = Math.round((monthSessRes.data || []).reduce((a, s) => a + (s.duration_sec || 0), 0) / 360) / 10;

    // Daily hours for last 14 days
    const dailyMap = {};
    (allSessRes.data || []).forEach(s => { dailyMap[s.study_date] = (dailyMap[s.study_date] || 0) + (s.duration_sec || 0); });
    const dailyData = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      dailyData.push({
        label: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        value: Math.round((dailyMap[key] || 0) / 360) / 10,
      });
    }

    let subjectPopularity = [];
    if (popularityRes.error) {
      // Fallback: group in JS memory if view is not created yet
      console.warn('[Admin API] Fallback to JS for subjectPopularity in activity_stats:', popularityRes.error.message);
      const [subjectRes, topicRes] = await Promise.all([
        adminSb.from('subjects').select('id, name, user_id'),
        adminSb.from('topics').select('subject_id'),
      ]);
      const subjects = subjectRes.data || [];
      const subjectTopicMap = {};
      (topicRes.data || []).forEach(t => { subjectTopicMap[t.subject_id] = (subjectTopicMap[t.subject_id] || 0) + 1; });
      const subjectPop = {};
      subjects.forEach(sub => {
        const count = subjectTopicMap[sub.id] || 0;
        if (count > 0) subjectPop[sub.name] = (subjectPop[sub.name] || 0) + count;
      });
      subjectPopularity = Object.entries(subjectPop)
        .map(([name, topics]) => ({ name, topics }))
        .sort((a, b) => b.topics - a.topics)
        .slice(0, 10);
    } else {
      subjectPopularity = (popularityRes.data || []).map(p => ({
        name: p.subject_name,
        topics: p.topics_count
      }));
    }

    // Recent sessions with email + subject name
    const recentSess = recentSessRes.data || [];
    const recentSubIds = [...new Set(recentSess.map(s => s.subject_id).filter(Boolean))];
    const { data: subjectsData } = await adminSb
      .from('subjects')
      .select('id, name')
      .in('id', recentSubIds);

    const subNameMap = {};
    (subjectsData || []).forEach(s => { subNameMap[s.id] = s.name; });

    const recentUserIds = [...new Set(recentSess.map(s => s.user_id))];
    const em = await emailMap(adminSb, recentUserIds);
    const recentSessions = recentSess.map(s => ({
      ...s,
      email: em[s.user_id] || s.user_id,
      subjectName: subNameMap[s.subject_id] || '–',
      hours: Math.round((s.duration_sec || 0) / 360) / 10,
    }));

    return res.status(200).json({ activeToday, hoursThisMonth, dailyData, subjectPopularity, recentSessions });
  }

  // ── GET: list_errors ───────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'list_errors') {
    // Select without `resolved` first — column may not exist yet
    let data, fetchError;
    try {
      const res2 = await adminSb
        .from('errors')
        .select('id, user_id, subject_id, mistake, fix, logged_at')
        .order('logged_at', { ascending: false })
        .limit(200);
      data = res2.data;
      fetchError = res2.error;
    } catch (e) {
      return res.status(200).json({ errors: [], tableExists: false });
    }

    if (fetchError) {
      if (fetchError.code === 'PGRST106' || fetchError.message?.includes('does not exist')) {
        return res.status(200).json({ errors: [], tableExists: false });
      }
      return res.status(500).json({ error: 'Failed to fetch errors: ' + fetchError.message });
    }

    // Enrich with emails and subject names
    const errUserIds = [...new Set((data || []).map(e => e.user_id).filter(Boolean))];
    const errSubjectIds = [...new Set((data || []).map(e => e.subject_id).filter(Boolean))];

    const [em, subRes] = await Promise.all([
      emailMap(adminSb, errUserIds),
      errSubjectIds.length
        ? adminSb.from('subjects').select('id, name').in('id', errSubjectIds)
        : Promise.resolve({ data: [] }),
    ]);

    const subNameMap = {};
    (subRes.data || []).forEach(s => { subNameMap[s.id] = s.name; });

    const errors = (data || []).map(e => ({
      ...e,
      email: em[e.user_id] || '–',
      subjectName: subNameMap[e.subject_id] || '–',
    }));

    // Check if `resolved` column exists, count unresolved if so
    let unresolvedCount = errors.length;
    let hasResolvedCol = false;
    try {
      const uc = await adminSb.from('errors').select('resolved', { count: 'exact', head: false }).limit(1);
      if (!uc.error) {
        hasResolvedCol = true;
        const ucAll = await adminSb.from('errors').select('*', { count: 'exact', head: true }).is('resolved', false);
        if (!ucAll.error) unresolvedCount = ucAll.count || 0;
      }
    } catch (_) { /* resolved column absent */ }

    return res.status(200).json({ errors, tableExists: true, unresolvedCount, hasResolvedCol });
  }

  // ── GET: system_stats ──────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'system_stats') {
    const tables = ['profiles', 'subscriptions', 'subjects', 'topics', 'sessions', 'errors', 'admin_log', 'announcements'];
    const countResults = await Promise.all(
      tables.map(t =>
        adminSb.from(t).select('*', { count: 'exact', head: true })
          .then(r => r.count)
          .catch(() => null)
      )
    );
    const counts = {};
    tables.forEach((t, i) => { counts[t] = countResults[i]; });

    // Recent admin log — manual email lookup
    const { data: logData } = await adminSb
      .from('admin_log')
      .select('id, action, target_user, admin_id, details, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    const logUserIds = [...new Set([
      ...(logData || []).map(l => l.target_user),
      ...(logData || []).map(l => l.admin_id),
    ].filter(Boolean))];
    const em = await emailMap(adminSb, logUserIds);

    const recentLog = (logData || []).map(l => ({
      ...l,
      targetEmail: em[l.target_user] || l.target_user || '–',
      adminEmail: em[l.admin_id] || l.admin_id || '–',
    }));

    const envVars = {
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'MISSING',
      RESEND_API_KEY:            process.env.RESEND_API_KEY            ? 'SET' : 'MISSING',
      GEMINI_API_KEY:            process.env.GEMINI_API_KEY            ? 'SET' : 'MISSING',
      ADMIN_EMAIL:               process.env.ADMIN_EMAIL               || 'NOT SET',
    };

    return res.status(200).json({ counts, recentLog, envVars });
  }

  // ── GET: question_bank_stats ───────────────────────────────────────────────
  if (req.method === 'GET' && action === 'question_bank_stats') {
    let data, qError;
    try {
      ({ data, error: qError } = await adminSb
        .from('questions')
        .select('exam_code, topic_key')
        .eq('is_shared', true));
    } catch (_) {
      return res.status(200).json({ stats: [], total: 0, tableExists: false });
    }
    if (qError) {
      if (qError.code === 'PGRST106' || qError.message?.includes('does not exist')) {
        return res.status(200).json({ stats: [], total: 0, tableExists: false });
      }
      return res.status(500).json({ error: qError.message });
    }

    const rows = data || [];
    const codeMap = {};
    const topicMap = {};
    rows.forEach(q => {
      const code = q.exam_code || 'other';
      codeMap[code] = (codeMap[code] || 0) + 1;
      if (!topicMap[code]) topicMap[code] = new Set();
      topicMap[code].add(q.topic_key);
    });

    const stats = Object.entries(codeMap).map(([exam_code, question_count]) => ({
      exam_code,
      question_count,
      topic_count: topicMap[exam_code].size,
    })).sort((a, b) => b.question_count - a.question_count);

    return res.status(200).json({ stats, total: rows.length, tableExists: true });
  }

  // ── GET: content_stats ─────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'content_stats') {
    let popularSubjects = [];
    let popularTopics = [];
    let qualDistribution = [];

    const [popSubjRes, popTopicRes, qualRes] = await Promise.all([
      adminSb.from('subject_popularity_by_users').select('subject_name, user_count').order('user_count', { ascending: false }).limit(10),
      adminSb.from('topic_popularity').select('topic_name, topic_count').order('topic_count', { ascending: false }).limit(10),
      adminSb.from('qualification_distribution').select('qualification, count').order('count', { ascending: false }),
    ]);

    if (popSubjRes.error || popTopicRes.error || qualRes.error) {
      console.warn('[Admin API] Fallback to JS content aggregation for content_stats:', {
        subjErr: popSubjRes.error?.message,
        topicErr: popTopicRes.error?.message,
        qualErr: qualRes.error?.message,
      });

      // Fallback: query all records and aggregate in JS memory if view is not applied yet
      const [subjRes, topicRes, profileRes] = await Promise.all([
        adminSb.from('subjects').select('user_id, name'),
        adminSb.from('topics').select('user_id, name, status'),
        adminSb.from('profiles').select('qualification'),
      ]);

      // Most popular subjects by unique user count
      const subjUserMap = {};
      (subjRes.data || []).forEach(s => {
        if (!subjUserMap[s.name]) subjUserMap[s.name] = new Set();
        subjUserMap[s.name].add(s.user_id);
      });
      popularSubjects = Object.entries(subjUserMap)
        .map(([name, users]) => ({ name, userCount: users.size }))
        .sort((a, b) => b.userCount - a.userCount)
        .slice(0, 10);

      // Most common topic names
      const topicNameMap = {};
      (topicRes.data || []).forEach(t => {
        const key = t.name?.trim();
        if (key) topicNameMap[key] = (topicNameMap[key] || 0) + 1;
      });
      popularTopics = Object.entries(topicNameMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Qualification distribution
      const qualMap = {};
      (profileRes.data || []).forEach(p => {
        const q = p.qualification || 'unknown';
        qualMap[q] = (qualMap[q] || 0) + 1;
      });
      qualDistribution = Object.entries(qualMap)
        .map(([qual, count]) => ({ qual, count }))
        .sort((a, b) => b.count - a.count);
    } else {
      popularSubjects = (popSubjRes.data || []).map(s => ({
        name: s.subject_name,
        userCount: s.user_count
      }));

      popularTopics = (popTopicRes.data || []).map(t => ({
        name: t.topic_name,
        count: t.topic_count
      }));

      qualDistribution = (qualRes.data || []).map(q => ({
        qual: q.qualification,
        count: q.count
      }));
    }

    // Coverage stats using PostgREST HEAD requests (extremely fast and RLS-compliant)
    const [readyCountRes, totalCountRes] = await Promise.all([
      adminSb.from('topics').select('*', { count: 'exact', head: true }).eq('status', 'ready'),
      adminSb.from('topics').select('*', { count: 'exact', head: true }),
    ]);

    const readyCount = readyCountRes.count || 0;
    const totalCount = totalCountRes.count || 0;
    const coveragePct = totalCount > 0 ? Math.round((readyCount / totalCount) * 100) : 0;

    return res.status(200).json({ popularSubjects, popularTopics, coveragePct, readyCount, totalCount, qualDistribution });
  }

  // ── GET: announcements ─────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'announcements') {
    let data, error;
    try {
      ({ data, error } = await adminSb
        .from('announcements')
        .select('id, message, created_at, active')
        .order('created_at', { ascending: false }));
    } catch (_) {
      return res.status(200).json({ announcements: [], tableExists: false });
    }
    if (error) {
      if (error.code === 'PGRST106' || error.message?.includes('does not exist')) {
        return res.status(200).json({ announcements: [], tableExists: false });
      }
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ announcements: data || [], tableExists: true });
  }

  // ── GET: export_users ──────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'export_users') {
    const [profilesRes, subsRes] = await Promise.all([
      adminSb.from('profiles').select('id, email, display_name, qualification, created_at').order('created_at', { ascending: false }),
      adminSb.from('subscriptions').select('user_id, tier, status, activated_at, expires_at'),
    ]);
    const profilesData = profilesRes.data || [];
    const exportSubMap = {};
    (subsRes.data || []).forEach(s => { exportSubMap[s.user_id] = s; });

    const header = ['email', 'display_name', 'tier', 'status', 'qualification', 'joined', 'expires'];
    const rows = profilesData.map(p => {
      const sub = exportSubMap[p.id] || {};
      return [
        p.email || '',
        p.display_name || '',
        sub.tier || 'free',
        sub.status || 'active',
        p.qualification || '',
        p.created_at ? p.created_at.slice(0, 10) : '',
        sub.expires_at ? sub.expires_at.slice(0, 10) : '',
      ];
    });

    const csvRows = [header, ...rows].map(r =>
      r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')
    );
    const csv = csvRows.join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="sequora-users.csv"');
    return res.status(200).send(csv);
  }

  // ── GET: audit_log ─────────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'audit_log') {
    const page = Math.max(0, parseInt(req.query.page || '0'));
    const pageSize = 20;
    const actionFilter = req.query.actionFilter || null;

    let q = adminSb
      .from('admin_log')
      .select('id, action, target_user, admin_id, details, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (actionFilter) q = q.eq('action', actionFilter);

    const { data: logData, count, error: logErr } = await q;
    if (logErr) return res.status(500).json({ error: 'Failed to fetch audit log: ' + logErr.message });

    const logUserIds = [...new Set([
      ...(logData || []).map(l => l.target_user),
      ...(logData || []).map(l => l.admin_id),
    ].filter(Boolean))];
    const em = await emailMap(adminSb, logUserIds);

    const log = (logData || []).map(l => ({
      ...l,
      targetEmail: em[l.target_user] || l.target_user || '–',
      adminEmail: em[l.admin_id] || l.admin_id || '–',
    }));

    return res.status(200).json({ log, total: count || 0, page, pageSize });
  }

  // ── check_role ─────────────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'check_role') {
    return res.status(200).json({ role, email: user.email });
  }

  // ── all_questions ──────────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'all_questions') {
    const search = req.query?.search || '';
    const limit = parseInt(req.query?.limit || '50');
    const offset = parseInt(req.query?.offset || '0');

    let query = adminSb.from('questions').select('*', { count: 'exact' });
    if (search) {
      query = query.ilike('stem', `%${search}%`);
    }
    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ questions: data, count });
  }

  // ── bkash_logs ─────────────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'bkash_logs') {
    const { data, error } = await adminSb
      .from('bkash_trx_logs')
      .select('*')
      .order('received_at', { ascending: false });

    if (error) {
      console.warn('[Admin API] Fallback empty logs for bkash_logs:', error.message);
      return res.status(200).json({ logs: [] });
    }
    return res.status(200).json({ logs: data });
  }

  // ── activity_feed ──────────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'activity_feed') {
    const [sessionsRes, errorsRes, profilesRes] = await Promise.all([
      adminSb.from('sessions').select('id, user_id, subject, duration_sec, study_date, created_at').order('created_at', { ascending: false }).limit(20),
      adminSb.from('errors').select('id, user_id, subject, mistake, fix, date, created_at').order('created_at', { ascending: false }).limit(20),
      adminSb.from('profiles').select('id, email, display_name')
    ]);

    const emailMap = {};
    (profilesRes.data || []).forEach(p => { emailMap[p.id] = p.display_name || p.email; });

    const feed = [];
    (sessionsRes.data || []).forEach(s => {
      feed.push({
        type: 'session',
        id: s.id,
        user: emailMap[s.user_id] || 'Unknown User',
        subject: s.subject,
        duration: s.duration_sec,
        timestamp: s.created_at || s.study_date,
      });
    });

    (errorsRes.data || []).forEach(e => {
      feed.push({
        type: 'error',
        id: e.id,
        user: emailMap[e.user_id] || 'Unknown User',
        subject: e.subject,
        detail: e.mistake,
        timestamp: e.created_at || e.date,
      });
    });

    feed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return res.status(200).json({ feed: feed.slice(0, 30) });
  }

  // ── online_users ───────────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'online_users') {
    const checkTime = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { data, error } = await adminSb
      .from('profiles')
      .select('id, email, display_name, last_active_at')
      .gt('last_active_at', checkTime)
      .order('last_active_at', { ascending: false });

    if (error) {
      // Fallback: list users sorted by creation
      const { data: fallbackProfiles } = await adminSb.from('profiles').select('id, email, display_name').limit(5);
      return res.status(200).json({ online: (fallbackProfiles || []).map(x => ({ ...x, last_active_at: new Date().toISOString() })) });
    }
    return res.status(200).json({ online: data });
  }

  // ── analytics ──────────────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'analytics') {
    const [qualRes, popularRes, historyRes] = await Promise.all([
      adminSb.from('qualification_distribution').select('*'),
      adminSb.from('subject_popularity_by_users').select('*'),
      adminSb.from('sessions').select('duration_sec, study_date').order('study_date', { ascending: false }).limit(200),
    ]);

    const historyData = historyRes.data || [];
    const dailyMap = {};
    historyData.forEach(s => {
      const d = s.study_date;
      dailyMap[d] = (dailyMap[d] || 0) + (s.duration_sec / 3600);
    });
    const timeline = Object.entries(dailyMap).map(([date, hours]) => ({ date, hours })).sort((a,b) => a.date.localeCompare(b.date)).slice(-7);

    return res.status(200).json({
      qualification: qualRes.data || [],
      subjects: popularRes.data || [],
      timeline
    });
  }

  // ── POST actions ───────────────────────────────────────────────────────────
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { userId } = req.body || {};

  // ── activate ───────────────────────────────────────────────────────────────
  if (action === 'activate') {
    if (!userId) return res.status(400).json({ error: 'userId required' });
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

    adminSb.from('profiles').select('email').eq('id', userId).single()
      .then(({ data }) => {
        if (data?.email) {
          emailActivated({ email: data.email, planLabel: planMeta.label, expiresAt })
            .catch(e => console.error('[Admin] Activation email failed:', e.message));
        }
      });

    return res.status(200).json({ ok: true, expires_at: expiresAt, tier: planMeta.tier });
  }

  // ── change_tier ────────────────────────────────────────────────────────────
  if (action === 'change_tier') {
    if (!userId) return res.status(400).json({ error: 'userId required' });
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
    if (!userId) return res.status(400).json({ error: 'userId required' });
    const { error } = await adminSb
      .from('subscriptions')
      .update({ status: 'suspended', updated_at: new Date().toISOString() })
      .eq('user_id', userId);

    if (error) return res.status(500).json({ error: 'Suspend failed: ' + error.message });

    await adminSb.from('admin_log').insert({
      admin_id: user.id, action: 'suspend', target_user: userId, details: { reason: req.body.reason || '' },
    });

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
    if (!userId) return res.status(400).json({ error: 'userId required' });
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

  // ── dismiss_trx ────────────────────────────────────────────────────────────
  if (action === 'dismiss_trx') {
    if (!userId) return res.status(400).json({ error: 'userId required' });
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

  // ── resolve_error ──────────────────────────────────────────────────────────
  if (action === 'resolve_error') {
    const { errorId } = req.body;
    if (!errorId) return res.status(400).json({ error: 'errorId required' });

    const { error } = await adminSb
      .from('errors')
      .update({ resolved: true })
      .eq('id', errorId);

    if (error) {
      if (error.message?.includes('column') || error.code === 'PGRST204') {
        return res.status(400).json({
          error: 'resolved column missing. Run: ALTER TABLE errors ADD COLUMN resolved boolean DEFAULT false;',
          needsMigration: true,
        });
      }
      return res.status(500).json({ error: 'Resolve failed: ' + error.message });
    }

    return res.status(200).json({ ok: true });
  }

  // ── delete_error ───────────────────────────────────────────────────────────
  if (action === 'delete_error') {
    const { errorId } = req.body;
    if (!errorId) return res.status(400).json({ error: 'errorId required' });

    const { error } = await adminSb.from('errors').delete().eq('id', errorId);
    if (error) return res.status(500).json({ error: 'Delete failed: ' + error.message });

    return res.status(200).json({ ok: true });
  }

  // ── create_announcement ────────────────────────────────────────────────────
  if (action === 'create_announcement') {
    const { message } = req.body;
    if (!message?.trim()) return res.status(400).json({ error: 'message required' });

    const { data: ann, error } = await adminSb
      .from('announcements')
      .insert({ message: message.trim(), created_by: user.id, active: true })
      .select()
      .single();

    if (error) return res.status(500).json({ error: 'Create failed: ' + error.message });

    await adminSb.from('admin_log').insert({
      admin_id: user.id, action: 'create_announcement', target_user: null,
      details: { message: message.trim().slice(0, 120) },
    });

    return res.status(200).json({ ok: true, announcement: ann });
  }

  // ── toggle_announcement ────────────────────────────────────────────────────
  if (action === 'toggle_announcement') {
    const { announcementId, active } = req.body;
    if (!announcementId) return res.status(400).json({ error: 'announcementId required' });

    const { error } = await adminSb
      .from('announcements')
      .update({ active: !!active })
      .eq('id', announcementId);

    if (error) return res.status(500).json({ error: 'Toggle failed: ' + error.message });

    return res.status(200).json({ ok: true });
  }

  // ── delete_announcement ────────────────────────────────────────────────────
  if (action === 'delete_announcement') {
    const { announcementId } = req.body;
    if (!announcementId) return res.status(400).json({ error: 'announcementId required' });

    const { error } = await adminSb.from('announcements').delete().eq('id', announcementId);
    if (error) return res.status(500).json({ error: 'Delete failed: ' + error.message });

    return res.status(200).json({ ok: true });
  }

  // ── send_test_report ───────────────────────────────────────────────────────
  if (action === 'send_test_report') {
    const targetUserId = req.body?.userId || user.id;

    const [profileRes, sessionsRes, topicsRes, subjectsRes] = await Promise.all([
      adminSb.from('profiles').select('id, email, display_name, exam_date').eq('id', targetUserId).single(),
      adminSb.from('sessions').select('user_id, subject_id, duration_sec, study_date').eq('user_id', targetUserId)
        .gte('study_date', new Date(Date.now() - 7 * 86_400_000).toISOString().slice(0, 10)),
      adminSb.from('topics').select('ready_at').eq('user_id', targetUserId)
        .not('ready_at', 'is', null).lte('ready_at', new Date().toISOString()),
      adminSb.from('subjects').select('id, name').eq('user_id', targetUserId),
    ]);

    const profile = profileRes.data;
    if (!profile?.email) return res.status(404).json({ error: 'User profile or email not found' });

    const sessions = sessionsRes.data || [];
    const studyHours = sessions.reduce((s, r) => s + (r.duration_sec || 0), 0) / 3600;
    const sessionsCount = sessions.length;
    const recallsDue = (topicsRes.data || []).length;

    const subjectMap = Object.fromEntries((subjectsRes.data || []).map(s => [s.id, s.name]));
    const durBySubject = {};
    for (const s of sessions) {
      if (s.subject_id) durBySubject[s.subject_id] = (durBySubject[s.subject_id] || 0) + (s.duration_sec || 0);
    }
    const topSubjectId = Object.entries(durBySubject).sort((a, b) => b[1] - a[1])[0]?.[0];
    const topSubject = topSubjectId ? (subjectMap[topSubjectId] || null) : null;
    const topicsStudied = Object.keys(durBySubject).length;

    const examDaysLeft = profile.exam_date
      ? Math.ceil((new Date(profile.exam_date) - Date.now()) / 86_400_000)
      : null;

    try {
      await emailWeeklyReport({
        email: process.env.RESEND_TEST_TO || profile.email,
        displayName: profile.display_name || profile.email.split('@')[0],
        stats: {
          studyHours,
          sessionsCount,
          topicsStudied,
          recallsDue,
          streakDays: 0,
          topSubject,
          examDaysLeft,
          weeklyGoalMet: studyHours >= 5,
        },
      });
      return res.status(200).json({ ok: true, sentTo: profile.email });
    } catch (e) {
      return res.status(500).json({ error: 'Email failed: ' + e.message });
    }
  }

  // ── batch_generate_questions ───────────────────────────────────────────────
  if (action === 'batch_generate_questions') {
    const { topic_keys, exam_code: filterExamCode } = req.body || {};

    // Dynamically import TOPIC_VISUALS (large file — load only when needed)
    const { TOPIC_VISUALS } = await import('../src/data/topic-visuals.js');

    // Collect matching topics
    const topicsToProcess = [];
    for (const [tvKey, tvData] of Object.entries(TOPIC_VISUALS)) {
      const tvExamCode = tvData.examCode || '';
      for (const topic of (tvData.topics || [])) {
        const topicKey = `${tvKey}:${topic.id}`;

        if (topic_keys && !topic_keys.includes(topicKey)) continue;
        if (filterExamCode) {
          const filter = filterExamCode.toUpperCase();
          const code = tvExamCode.toUpperCase();
          // IB prefix match; MBBS/BMDC are interchangeable; others exact
          const mbbsAliases = new Set(['MBBS', 'BMDC']);
          const filterIsMbbs = mbbsAliases.has(filter);
          const codeIsMbbs = mbbsAliases.has(code);
          if (filter.startsWith('IB') ? !code.startsWith('IB')
            : filterIsMbbs ? !codeIsMbbs
            : code !== filter) continue;
        }

        topicsToProcess.push({ topicKey, examCode: tvExamCode, topicName: topic.name });
      }
    }

    // Cap batch size to avoid timeout
    const batch = topicsToProcess.slice(0, 50);

    // Check existing question counts per topic_key
    const allKeys = batch.map(t => t.topicKey);
    const { data: existingRows } = await adminSb
      .from('questions')
      .select('topic_key')
      .in('topic_key', allKeys)
      .eq('is_shared', true);

    const countMap = {};
    (existingRows || []).forEach(q => {
      countMap[q.topic_key] = (countMap[q.topic_key] || 0) + 1;
    });

    let processed = 0, skipped = 0, generated = 0;
    const errors = [];

    for (let i = 0; i < batch.length; i++) {
      const { topicKey, examCode, topicName } = batch[i];

      if ((countMap[topicKey] || 0) >= 3) {
        skipped++;
        continue;
      }

      // 500ms delay between calls to avoid Gemini rate limiting
      if (i > 0) await new Promise(r => setTimeout(r, 500));

      // Cambridge/IB: 3 MCQ + 2 structured = 5 total; MBBS: 5 MCQ
      const format = detectExamFormat(examCode);
      const count = 5;

      const result = await generateAndInsert({ topicKey, examCode, topicName, count, difficulty: 'medium', adminSb });
      processed++;
      generated += result.generated;
      if (result.error) errors.push({ topicKey, error: result.error });
    }

    return res.status(200).json({ processed, skipped, generated, errors, total: batch.length });
  }

  // ── update_question ────────────────────────────────────────────────────────
  if (action === 'update_question') {
    const { id, stem, options, correct, explanation, model_answer } = req.body || {};
    if (!id) return res.status(400).json({ error: 'Missing question id' });

    const updates = { updated_at: new Date().toISOString() };
    if (stem !== undefined) updates.stem = stem;
    if (options !== undefined) updates.options = options;
    if (correct !== undefined) updates.correct = correct;
    if (explanation !== undefined) updates.explanation = explanation;
    if (model_answer !== undefined) updates.model_answer = model_answer;

    const { data, error } = await adminSb
      .from('questions')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true, question: data?.[0] });
  }

  // ── delete_question ────────────────────────────────────────────────────────
  if (action === 'delete_question') {
    const { id } = req.body || {};
    if (!id) return res.status(400).json({ error: 'Missing question id' });

    const { error } = await adminSb
      .from('questions')
      .delete()
      .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true });
  }

  // ── simulate_bkash_payment ─────────────────────────────────────────────────
  if (action === 'simulate_bkash_payment') {
    const { trx_id, amount, sender_number } = req.body || {};
    if (!trx_id || !amount || !sender_number) {
      return res.status(400).json({ error: 'Missing parameters (trx_id, amount, sender_number)' });
    }

    const { data, error } = await adminSb
      .from('bkash_trx_logs')
      .insert({
        trx_id: trx_id.trim().toUpperCase(),
        amount: parseFloat(amount),
        sender_number: sender_number.trim(),
      })
      .select();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true, log: data?.[0] });
  }

  return res.status(400).json({ error: `Unknown action: ${action}` });
}
