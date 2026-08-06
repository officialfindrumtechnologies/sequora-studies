// Re-import MBBS chapter/sub-chapter trees from the fixed parse_mbbs.py.
//
// Deliberately selective. Re-parsing every subject is NOT an improvement: for
// five of the eleven the parser still produces a worse tree than the rows
// already in the database, and running it over them would destroy real
// structure. Measured 2026-08-07 against BM&DC Curriculum 2021:
//
//   Anatomy            9 real chapters -> 3, all 345 topics in "(unsectioned)"
//   Pathology          4 chapters -> 1
//   Physiology         loses "Physiology of Special Senses", 173 -> 156 topics
//   Community Medicine loses Medical Entomology, Occupational Health and
//                      Public Health Nutrition, 191 -> 155 topics
//   Microbiology       loses "Virology", 198 -> 189 topics
//
// Those five keep their existing rows. The six listed below are where the fixed
// parser genuinely wins, mostly because it now finds chapters on portrait
// section-divider pages and no longer glues nested numbered lists together.
//
// Only the `topics` column is written. source_url, verified_at, exam_board,
// qualification and syllabus_years are left exactly as they are.
//
//   node tools/syllabus/reimport_mbbs.mjs --dry     report without writing
//   node tools/syllabus/reimport_mbbs.mjs           apply
import { createClient } from '@supabase/supabase-js';
import { execFileSync } from 'child_process';
import fs from 'fs';

const ROOT = '/Volumes/DevWorkspace/Sequora-studies/sequora';
const env = Object.fromEntries(
  fs.readFileSync(`${ROOT}/.env`, 'utf8').split('\n')
    .map(l => l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)).filter(Boolean)
    .map(m => [m[1], m[2].replace(/^["']|["']$/g, '').trim()]));
const sb = createClient(env.VITE_SUPABASE_URL || env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// [pdf stem, subject_name as stored in syllabus_templates]
const IMPORT = [
  ['5.Biochemistry',      'Biochemistry'],
  ['8.ForensicMedicine',  'Forensic Medicine & Toxicology'],
  ['15.Surgery',          'Surgery'],
  ['16.ObsGynae',         'Obstetrics & Gynaecology'],
  ['14.Medicine',         'Medicine'],
  ['7.Pharmacology',      'Pharmacology & Therapeutics'],
];

const dry = process.argv.includes('--dry');

for (const [stem, subject] of IMPORT) {
  const pdf = `${ROOT}/tools/syllabus/bmdc/${stem}.pdf`;
  if (!fs.existsSync(pdf)) { console.log(`SKIP ${subject} — ${stem}.pdf not cached`); continue; }

  const out = execFileSync('python3', [`${ROOT}/tools/syllabus/parse_mbbs.py`, pdf],
                           { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const parsed = JSON.parse(out);
  if (parsed.problems?.length) { console.log(`SKIP ${subject} — parser problems: ${parsed.problems}`); continue; }

  const topics = parsed.rows.map(r => ({ section: r.section, name: r.name }));
  if (topics.length < 50) { console.log(`SKIP ${subject} — only ${topics.length} topics, refusing`); continue; }

  const { data: before, error: readErr } = await sb
    .from('syllabus_templates')
    .select('id, topics')
    .eq('exam_board', 'BMDC Bangladesh').eq('subject_name', subject).single();
  if (readErr) { console.log(`SKIP ${subject} — ${readErr.message}`); continue; }

  const wasCount = before.topics.length;
  const wasChapters = new Set(before.topics.map(t => t.section)).size;
  const nowChapters = new Set(topics.map(t => t.section)).size;

  if (dry) {
    console.log(`DRY  ${subject.padEnd(32)} ${wasCount}t/${wasChapters}ch -> ${topics.length}t/${nowChapters}ch`);
    continue;
  }

  const { error: upErr } = await sb
    .from('syllabus_templates').update({ topics }).eq('id', before.id);
  console.log(upErr
    ? `FAIL ${subject} — ${upErr.message}`
    : `OK   ${subject.padEnd(32)} ${wasCount}t/${wasChapters}ch -> ${topics.length}t/${nowChapters}ch`);
}
