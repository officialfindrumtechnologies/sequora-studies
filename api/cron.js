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

  return run(req, res);
}
