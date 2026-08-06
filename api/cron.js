// One Serverless Function fronting all five scheduled jobs.
//
// The Hobby plan allows 12 Serverless Functions per deployment and every file
// in api/ becomes one. Five separate cron files took the project to 15, and
// every deployment from 24 July onwards failed the limit check before it built
// — production sat frozen on the 23 July bundle while 64 commits piled up
// behind it. Files and directories under api/ whose name starts with an
// underscore are not turned into functions, so the job handlers now live in
// api/_cron/ and this dispatcher is the only function among them: 11 total.
//
// The handlers themselves are untouched. Each still performs its own
// CRON_SECRET and method check, so it stays correct if it is ever called
// directly again; the check here simply refuses unauthorised callers before
// the job list can be probed.
//
// Vercel Cron invokes this as /api/cron?job=<name> — see vercel.json.

import { createClient } from '@supabase/supabase-js';
import dailyNudge     from './_cron/daily-nudge.js';
import expiryCheck    from './_cron/expiry-check.js';
import groupRecap     from './_cron/group-recap.js';
import leagueRollover from './_cron/league-rollover.js';
import weeklyReport   from './_cron/weekly-report.js';

const JOBS = {
  'daily-nudge':     dailyNudge,
  'expiry-check':    expiryCheck,
  'group-recap':     groupRecap,
  'league-rollover': leagueRollover,
  'weekly-report':   weeklyReport,
};

export default async function handler(req, res) {
  // Vercel Cron sends Authorization: Bearer <CRON_SECRET>. Matches the check
  // each handler already does, including the "no secret configured" behaviour,
  // so moving the jobs behind this dispatcher changes nothing about who can
  // run them.
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (token !== cronSecret) return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const job = req.query?.job;
  const run = Object.prototype.hasOwnProperty.call(JOBS, job) ? JOBS[job] : null;
  if (!run) {
    return res.status(404).json({ error: 'Unknown job', known: Object.keys(JOBS) });
  }

  // Record the invocation. Whether these jobs actually fire was unanswerable all
  // week: Vercel keeps runtime logs about an hour on Hobby, the Resend key is
  // send-only so delivery cannot be queried back, and expiry-check writes
  // nothing when nothing is expiring. By the time anyone asks, every window has
  // closed. One row per run in public.cron_runs settles it, and captures the
  // handler's own JSON — so daily-nudge records how many emails it really sent.
  //
  // The log must never be able to break a job: every write is best-effort and a
  // logging failure is swallowed.
  const started = Date.now();
  const dry = req.query?.dry === '1' || req.query?.dry === 'true';
  let logId = null;
  const sb = (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    : null;

  if (sb) {
    try {
      const { data } = await sb.from('cron_runs')
        .insert({ job, dry }).select('id').single();
      logId = data?.id ?? null;
    } catch { /* logging must not block the job */ }
  }

  const finish = async (fields) => {
    if (!sb || !logId) return;
    try {
      await sb.from('cron_runs').update({
        finished_at: new Date().toISOString(),
        duration_ms: Date.now() - started,
        ...fields,
      }).eq('id', logId);
    } catch { /* best effort */ }
  };

  // The handlers write the response themselves, so capture what they send
  // rather than changing every one of them to return it.
  let captured, statusCode = 200;
  const origStatus = res.status.bind(res);
  const origJson = res.json.bind(res);
  res.status = (code) => { statusCode = code; return origStatus(code); };
  res.json = (body) => { captured = body; return origJson(body); };

  try {
    const out = await run(req, res);
    await finish({ ok: statusCode < 400, status_code: statusCode, result: captured ?? null });
    return out;
  } catch (err) {
    await finish({ ok: false, status_code: 500, error: String(err?.message || err).slice(0, 500) });
    throw err;
  }
}
