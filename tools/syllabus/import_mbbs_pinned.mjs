// Import MBBS chapter/sub-chapter trees from mbbs_pinned.py.
//
// mbbs_pinned.py is the authoritative extractor: its chapter list per subject is
// hand-read off the BM&DC PDF and pinned as ground truth, and it errors rather
// than silently dropping a chapter it cannot find. The geometric parse_mbbs.py
// guesses headings from type size and centring, which works only where the
// document typesets them that way.
//
// Anatomy is the clearest case for why the pinned list exists: its chapter names
// sit in the LEFT MARGIN at body height (mid/w 0.12-0.18, ratio 1.00), so no
// centring or size rule can find them. parse_mbbs.py collapses Anatomy to 3
// chapters with all 345 topics in "(unsectioned)"; pinned returns the real 9.
//
// Subjects listed here take pinned output. Medicine, Surgery and Obstetrics &
// Gynaecology are NOT listed: each bundles several disciplines, and their pinned
// chapter lists only name three, three and two of them, while the fixed
// geometric parser finds Ophthalmology, Otorhinolaryngology, SKIN & VD,
// Psychiatry and Paediatrics as well. Those three keep their geometric import
// until the pinned lists are extended by hand.
//
//   node tools/syllabus/import_mbbs_pinned.mjs --dry
//   node tools/syllabus/import_mbbs_pinned.mjs
import { createClient } from '@supabase/supabase-js';
import { execFileSync } from 'child_process';
import fs from 'fs';

const ROOT = '/Volumes/DevWorkspace/Sequora-studies/sequora';
const env = Object.fromEntries(
  fs.readFileSync(`${ROOT}/.env`, 'utf8').split('\n')
    .map(l => l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)).filter(Boolean)
    .map(m => [m[1], m[2].replace(/^["']|["']$/g, '').trim()]));
const sb = createClient(env.VITE_SUPABASE_URL || env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// [pinned stem, subject_name in syllabus_templates]
const PINNED = [
  ['3.Anatomy',            'Anatomy'],
  ['4.Physiology',         'Physiology'],
  ['5.Biochemistry',       'Biochemistry'],
  ['7.Pharmacology',       'Pharmacology & Therapeutics'],
  ['8.ForensicMedicine',   'Forensic Medicine & Toxicology'],
  ['10.CommunityMedicine', 'Community Medicine'],
  ['11.Pathology',         'Pathology'],
  ['12.Microbiology',      'Microbiology'],
];

const dry = process.argv.includes('--dry');

for (const [stem, subject] of PINNED) {
  let parsed;
  try {
    // mbbs_pinned.py resolves its PDF as mbbs/<stem>.pdf relative to cwd.
    const out = execFileSync('python3', ['mbbs_pinned.py', stem],
      { cwd: `${ROOT}/tools/syllabus`, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    parsed = JSON.parse(out);
  } catch (e) {
    console.log(`SKIP ${subject} — parser failed: ${String(e.message).slice(0, 90)}`);
    continue;
  }

  // The whole point of the pinned list is that a missing heading is an error.
  if (!parsed.ok || parsed.problems?.length) {
    console.log(`SKIP ${subject} — ${JSON.stringify(parsed.problems)}`);
    continue;
  }

  const topics = parsed.rows.map(r => ({ section: r.section, name: r.name }));
  if (topics.length < 50) { console.log(`SKIP ${subject} — only ${topics.length} topics`); continue; }

  const { data: before, error: readErr } = await sb
    .from('syllabus_templates').select('id, topics')
    .eq('exam_board', 'BMDC Bangladesh').eq('subject_name', subject).single();
  if (readErr) { console.log(`SKIP ${subject} — ${readErr.message}`); continue; }

  const wasT = before.topics.length;
  const wasC = new Set(before.topics.map(t => t.section)).size;
  const nowC = new Set(topics.map(t => t.section)).size;

  if (dry) {
    console.log(`DRY  ${subject.padEnd(32)} ${wasT}t/${wasC}ch -> ${topics.length}t/${nowC}ch`);
    continue;
  }
  const { error: upErr } = await sb.from('syllabus_templates').update({ topics }).eq('id', before.id);
  console.log(upErr ? `FAIL ${subject} — ${upErr.message}`
    : `OK   ${subject.padEnd(32)} ${wasT}t/${wasC}ch -> ${topics.length}t/${nowC}ch`);
}
