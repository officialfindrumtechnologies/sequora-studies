// Write the verified Cambridge sciences + maths batch into syllabus_templates.
// Reads the parsed JSON produced by parse_cie.py; refuses anything the parser
// flagged, and refuses to shrink a template without saying so.
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const ROOT = '/Volumes/DevWorkspace/Sequora-studies/sequora';
const env = Object.fromEntries(
  fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n')
    .map(l => l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)).filter(Boolean)
    .map(m => [m[1], m[2].replace(/^["']|["']$/g, '').trim()]));

const sb = createClient(env.VITE_SUPABASE_URL || env.SUPABASE_URL,
                        env.SUPABASE_SERVICE_ROLE_KEY);

const BATCH = [
  ['IGCSE / O Level', 'Cambridge IGCSE',   'Biology',             'cambridge-igcse-biology-0610', null],
  ['IGCSE / O Level', 'Cambridge IGCSE',   'Chemistry',           'cambridge-igcse-chemistry-0620', null],
  ['IGCSE / O Level', 'Cambridge IGCSE',   'Physics',             'cambridge-igcse-physics-0625', null],
  ['IGCSE / O Level', 'Cambridge IGCSE',   'Mathematics',         'cambridge-igcse-mathematics-0580', null],
  ['IGCSE / O Level', 'Cambridge O Level', 'Biology',             'cambridge-o-level-biology-5090', null],
  ['IGCSE / O Level', 'Cambridge O Level', 'Chemistry',           'cambridge-o-level-chemistry-5070', null],
  ['IGCSE / O Level', 'Cambridge O Level', 'Physics',             'cambridge-o-level-physics-5054', null],
  ['IGCSE / O Level', 'Cambridge O Level', 'Mathematics D',       'cambridge-o-level-mathematics-d-4024', null],
  ['A Level',  'Cambridge', 'Biology',             'cambridge-international-as-and-a-level-biology-9700', null],
  ['A Level',  'Cambridge', 'Chemistry',           'cambridge-international-as-and-a-level-chemistry-9701', null],
  ['A Level',  'Cambridge', 'Physics',             'cambridge-international-as-and-a-level-physics-9702', null],
  ['A Level',  'Cambridge', 'Mathematics',         'cambridge-international-as-and-a-level-mathematics-9709', null],
  ['A Level',  'Cambridge', 'Further Mathematics', 'cambridge-international-as-and-a-level-mathematics-further-9231', null],
  // AS caps come from the document's own sentence, e.g. "Candidates for
  // Cambridge International AS Level should study topics 1-11."
  ['AS Level', 'Cambridge', 'Biology',     'cambridge-international-as-and-a-level-biology-9700', 11],
  ['AS Level', 'Cambridge', 'Chemistry',   'cambridge-international-as-and-a-level-chemistry-9701', 22],
  ['AS Level', 'Cambridge', 'Physics',     'cambridge-international-as-and-a-level-physics-9702', 11],
  // 9709 units are route-dependent (AS: Pure 1 + Pure 2 + one applied;
  // A Level: Pure 1 + Pure 3 + two applied), so capping by topic number would
  // assert a route the student may not be on. Both keep the full unit list.
  ['AS Level', 'Cambridge', 'Mathematics', 'cambridge-international-as-and-a-level-mathematics-9709', null],
];

const dir = '/private/tmp/claude-501/-Volumes-DevWorkspace-Sequora-studies-sequora/9f60502e-15a1-43b9-823d-c26e91e05cce/scratchpad/syllabi';
const dry = process.argv.includes('--dry');
let failures = 0;

for (const [qualification, exam_board, subject_name, stem, asMax] of BATCH) {
  const d = JSON.parse(fs.readFileSync(`${dir}/out-${stem}.json`, 'utf8'));
  if (!d.ok) { console.error(`REFUSED ${stem}: ${d.problems}`); failures++; continue; }

  const url = fs.readFileSync(`${dir}/pdf/${stem}.src`, 'utf8').trim();
  const years = (url.match(/-(20\d{2}-20\d{2})-syllabus\.pdf/) || [])[1] || null;

  let rows = d.rows.filter(r => !/(extended|core) content only/i.test(r.name));
  if (asMax != null) rows = rows.filter(r => +r.section.match(/^(\d+)\./)[1] <= asMax);
  if (!rows.length) { console.error(`REFUSED ${stem}: no rows`); failures++; continue; }

  const { data: before } = await sb.from('syllabus_templates')
    .select('id, topics').eq('qualification', qualification)
    .eq('exam_board', exam_board).eq('subject_name', subject_name).maybeSingle();
  if (!before) { console.error(`REFUSED: no row for ${qualification}/${exam_board}/${subject_name}`); failures++; continue; }

  const was = Array.isArray(before.topics) ? before.topics.length : 0;
  if (dry) { console.log(`DRY  ${subject_name.padEnd(20)} ${exam_board.padEnd(18)} ${was} -> ${rows.length}  ${years}`); continue; }

  const { error } = await sb.from('syllabus_templates').update({
    topics: rows, source_url: url, syllabus_years: years,
    verified_at: new Date().toISOString(),
  }).eq('id', before.id);

  if (error) { console.error(`FAIL ${stem}: ${error.message}`); failures++; }
  else console.log(`OK   ${qualification.padEnd(16)} ${exam_board.padEnd(18)} ${subject_name.padEnd(20)} ${was} -> ${rows.length}  ${years}`);
}
console.log(failures ? `\n${failures} failed` : '\nall written');
process.exit(failures ? 1 : 0);
