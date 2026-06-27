import { createClient } from '@supabase/supabase-js';
import { emailActivated, emailSuspended } from './email.js';

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

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || user.email !== adminEmail) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const action = req.method === 'GET'
    ? req.query?.action
    : (req.body?.action || null);

  // ── GET: list_users ────────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'list_users') {
    // Query profiles as primary so ALL registered users appear (including those without a subscription row)
    const { data: profilesData, error: profilesErr } = await adminSb
      .from('profiles')
      .select(`
        id, email, display_name, exam_board, qualification, created_at,
        subscriptions ( id, tier, status, bkash_trx_id, bkash_amount, bkash_submitted_at, activated_at, expires_at, notes, updated_at )
      `)
      .order('created_at', { ascending: false });

    if (profilesErr) {
      console.error('[Admin] list_users error:', profilesErr);
      return res.status(500).json({ error: 'Failed to fetch users: ' + profilesErr.message });
    }

    // Aggregate sessions, subjects, topics per user in parallel
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

    // Flatten to same shape the frontend expects
    const users = (profilesData || []).map(p => {
      const sub = (p.subscriptions || [])[0] || {};
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

  // ── GET: dashboard_stats ───────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'dashboard_stats') {
    const today = todayStr();
    const monthStart = monthStartISO(0);

    const [usersRes, paidRes, pendingRes, activeTodayRes, sessRes, geminiRes, revRes] = await Promise.all([
      // Total users = all profiles (not subscriptions — users without subscription rows are still users)
      adminSb.from('profiles').select('*', { count: 'exact', head: true }),
      adminSb.from('subscriptions').select('*', { count: 'exact', head: true }).neq('tier', 'free').eq('status', 'active'),
      adminSb.from('subscriptions').select('*', { count: 'exact', head: true }).not('bkash_trx_id', 'is', null).neq('status', 'active'),
      // Active today = distinct users with a session today (study_date is a date string 'YYYY-MM-DD')
      adminSb.from('sessions').select('user_id').eq('study_date', today),
      adminSb.from('sessions').select('duration_sec'),
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

    const totalStudyHours = Math.round((sessRes.data || []).reduce((a, s) => a + (s.duration_sec || 0), 0) / 360) / 10;
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

    const [todaySessRes, monthSessRes, allSessRes, subjectRes, topicRes, recentSessRes] = await Promise.all([
      adminSb.from('sessions').select('user_id').eq('study_date', today),
      adminSb.from('sessions').select('duration_sec').gte('study_date', monthStart),
      adminSb.from('sessions').select('study_date, duration_sec').gte('study_date', since14),
      adminSb.from('subjects').select('id, name, user_id'),
      adminSb.from('topics').select('subject_id'),
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

    // Subject popularity: group topics by subject name across all users
    const subjects = subjectRes.data || [];
    const subjectTopicMap = {};
    (topicRes.data || []).forEach(t => { subjectTopicMap[t.subject_id] = (subjectTopicMap[t.subject_id] || 0) + 1; });

    const subjectPop = {};
    subjects.forEach(sub => {
      const count = subjectTopicMap[sub.id] || 0;
      if (count > 0) subjectPop[sub.name] = (subjectPop[sub.name] || 0) + count;
    });
    const subjectPopularity = Object.entries(subjectPop)
      .map(([name, topics]) => ({ name, topics }))
      .sort((a, b) => b.topics - a.topics)
      .slice(0, 10);

    // Recent sessions with email + subject name
    const recentSess = recentSessRes.data || [];
    const subNameMap = {};
    subjects.forEach(s => { subNameMap[s.id] = s.name; });
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
    let data, fetchError;
    try {
      const res2 = await adminSb
        .from('errors')
        .select('id, user_id, subject_id, mistake, fix, logged_at, resolved')
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

    // Unresolved count — try resolved column; if missing, count all
    let unresolvedCount = errors.length;
    try {
      const uc = await adminSb.from('errors').select('*', { count: 'exact', head: true }).is('resolved', false);
      if (!uc.error) unresolvedCount = uc.count || 0;
    } catch (_) { /* */ }

    const hasResolvedCol = errors.some(e => 'resolved' in e);

    return res.status(200).json({ errors, tableExists: true, unresolvedCount, hasResolvedCol });
  }

  // ── GET: system_stats ──────────────────────────────────────────────────────
  if (req.method === 'GET' && action === 'system_stats') {
    const tables = ['profiles', 'subscriptions', 'subjects', 'topics', 'sessions', 'errors', 'admin_log'];
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

    return res.status(200).json({ counts, recentLog });
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

  return res.status(400).json({ error: `Unknown action: ${action}` });
}
