// Dry-run support for the scheduled jobs.
//
// Four of the five crons email real students, and league-rollover mutates the
// live league standings. That made them untestable: the only way to find out
// whether a job worked was to let it run for real on its schedule, and the only
// way to find out it was broken was for students to stop receiving mail.
//
// With ?dry=1 a job does everything except the irreversible part — it still
// queries the database, computes eligibility, and builds the payload, then
// records who it *would* have contacted instead of contacting them. That
// exercises the part that actually breaks (the queries and the maths) and skips
// the part that cannot be undone.
//
// The recipient list is capped in the response so a dry run against a large
// user base stays readable; the counts are always exact.

export function isDry(req) {
  return req.query?.dry === '1' || req.query?.dry === 'true';
}

// Record a would-be send. Keeps `sent` meaning "actually delivered" so a dry
// run can never be mistaken for a real one in logs or monitoring.
export function noteDry(results, email) {
  results.wouldSend = (results.wouldSend || 0) + 1;
  results.wouldSendTo = results.wouldSendTo || [];
  if (results.wouldSendTo.length < 25) results.wouldSendTo.push(email);
}
