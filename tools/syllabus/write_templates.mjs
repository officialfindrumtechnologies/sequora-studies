// Write verified syllabus templates from parser output.
//
// Replaces the per-board writers, which each hardcoded a batch list and an
// absolute scratchpad path from whichever session created them. A parser now
// emits everything needed to place a row — board, qualification, subject,
// level, the guide's stated version and the exact URL used — so this reads
// files and needs no table of its own.
//
// Provenance: exam boards vary in whether they publish machine-fetchable specs.
// Cambridge and Pearson do. IB does not — subject guides sit behind My IB, so
// the IB files are the official guides (IB copyright, IB publication imprint,
// stated first-assessment year) mirrored by schools: authentic content, but the
// mirror is not authoritative for currency. source_url records the exact file.
//
//   node write_templates.mjs out/*.json [--dry]
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const env = Object.fromEntries(
  fs.readFileSync(`${ROOT}/.env`, 'utf8').split('\n')
    .map(l => l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)).filter(Boolean)
    .map(m => [m[1], m[2].replace(/^["']|["']$/g, '').trim()]));
const sb = createClient(env.VITE_SUPABASE_URL || env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const dry = process.argv.includes('--dry');
const files = process.argv.slice(2).filter(a => a.endsWith('.json'));
if (!files.length) { console.error('usage: write_templates.mjs <parsed.json>... [--dry]'); process.exit(2); }

let fails = 0, wrote = 0;

for (const file of files) {
  const label = path.basename(file, '.json');
  let d;
  try { d = JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (e) { console.error(`REFUSED ${label}: unreadable — ${e.message}`); fails++; continue; }

  // The parsers flag their own doubts. Anything flagged is not written: a
  // partially-extracted syllabus that looks complete is worse than none, since
  // the badge would then claim it was checked against the official document.
  if (!d.ok) { console.error(`REFUSED ${label}: ${d.problems}`); fails++; continue; }
  if (!d.rows?.length) { console.error(`REFUSED ${label}: no rows`); fails++; continue; }
  if (!d.url || !d.years) { console.error(`REFUSED ${label}: missing provenance`); fails++; continue; }

  // Match on level with `is` when it is null, because Cambridge and Pearson
  // rows carry no level and `.eq('level', null)` matches nothing.
  let q = sb.from('syllabus_templates').select('id, topics, subject_name, level')
    .eq('qualification', d.qualification).eq('subject_name', d.subject);
  q = d.level ? q.eq('level', d.level) : q.is('level', null);
  if (d.board) q = q.eq('board', d.board);

  const { data: existing, error: selErr } = await q.maybeSingle();
  if (selErr) { console.error(`FAIL ${label}: ${selErr.message}`); fails++; continue; }
  if (!existing) {
    console.error(`REFUSED ${label}: no row for ${d.board}/${d.qualification}/${d.subject}/${d.level ?? '-'}`);
    fails++; continue;
  }

  const was = Array.isArray(existing.topics) ? existing.topics.length : 0;
  const rows = d.rows.map(r => ({ section: r.section, name: r.name }));
  if (dry) { console.log(`DRY  ${d.subject} ${d.level ?? ''}  ${was} -> ${rows.length}`); continue; }

  const { error } = await sb.from('syllabus_templates').update({
    topics: rows, source_url: d.url, syllabus_years: d.years,
    verified_at: new Date().toISOString(),
  }).eq('id', existing.id);

  if (error) { console.error(`FAIL ${label}: ${error.message}`); fails++; }
  else { console.log(`OK   ${d.subject} ${d.level ?? ''}  ${was} -> ${rows.length}`); wrote++; }
}

console.log(`\n${wrote} written, ${fails} refused/failed`);
process.exit(fails ? 1 : 0);
