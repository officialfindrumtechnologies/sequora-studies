// Write verified Edexcel templates. Only subjects listed here have been read
// against their specification PDF and confirmed complete.
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const ROOT = '/Volumes/DevWorkspace/Sequora-studies/sequora';
const DIR  = '/private/tmp/claude-501/-Volumes-DevWorkspace-Sequora-studies-sequora/9f60502e-15a1-43b9-823d-c26e91e05cce/scratchpad/syllabi';

const env = Object.fromEntries(
  fs.readFileSync(`${ROOT}/.env`, 'utf8').split('\n')
    .map(l => l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)).filter(Boolean)
    .map(m => [m[1], m[2].replace(/^["']|["']$/g, '').trim()]));
const sb = createClient(env.VITE_SUPABASE_URL || env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// [parsed-file, qualification, exam_board, subject_name, syllabus years, subject_code]
// A Level rows move to International A Level codes (YBI11 etc). Bangladeshi
// students sit IAL, not UK GCE, so the stored 9BI0/8BI0 codes were wrong for
// the audience as well as pointing at a different specification.
const BATCH = [
  ['igcse-biology-4BI1',   'IGCSE / O Level', 'Edexcel IGCSE', 'Biology',   '2017', '4BI1'],
  ['igcse-chemistry-4CH1', 'IGCSE / O Level', 'Edexcel IGCSE', 'Chemistry', '2017', '4CH1'],
  ['ial-biology',   'A Level', 'Edexcel', 'Biology',   '2018', 'YBI11'],
  ['ial-chemistry', 'A Level', 'Edexcel', 'Chemistry', '2018', 'YCH11'],
  ['ial-physics',   'A Level', 'Edexcel', 'Physics',   '2018', 'YPH11'],
  // parsed by parse_edx_cols.py (two-column "Key ideas | Detailed content")
  ['igcse-geography-4GE1',       'IGCSE / O Level', 'Edexcel IGCSE', 'Geography',        '2017', '4GE1'],
  ['igcse-computerscience-4CP1', 'IGCSE / O Level', 'Edexcel IGCSE', 'Computer Science', '2017', '4CP1'],
  // UK GCE Psychology: IAL Psychology's specification is not reachable, so
  // this is the GCE one, kept deliberately and flagged by its 9PS0/8PS0 code.
  ['alevel-psychology-9PS0', 'A Level',  'Edexcel', 'Psychology', '2015', '9PS0'],
  ['as-psychology-8PS0',     'AS Level', 'Edexcel', 'Psychology', '2015', '8PS0'],
];

const dry = process.argv.includes('--dry');
let fails = 0;

for (const [stem, qualification, exam_board, subject_name, years, code] of BATCH) {
  // prefer the column-aware parse where one exists
  const jsonPath = fs.existsSync(`${DIR}/pc-${stem}.json`)
    ? `${DIR}/pc-${stem}.json` : `${DIR}/pe-${stem}.json`;
  const d = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  if (!d.ok) { console.error(`REFUSED ${subject_name}: ${d.problems}`); fails++; continue; }

  const rows = d.rows.map(r => ({ section: r.section, name: r.name }));
  const url = fs.readFileSync(`${DIR}/edx/${stem}.src`, 'utf8').trim();

  const { data: existing } = await sb.from('syllabus_templates')
    .select('id, topics').eq('qualification', qualification)
    .eq('exam_board', exam_board).eq('subject_name', subject_name).maybeSingle();
  if (!existing) { console.error(`REFUSED: no row for ${exam_board} ${subject_name}`); fails++; continue; }

  const was = Array.isArray(existing.topics) ? existing.topics.length : 0;
  if (dry) { console.log(`DRY  ${exam_board} ${subject_name.padEnd(12)} ${was} -> ${rows.length}`); continue; }

  const { error } = await sb.from('syllabus_templates').update({
    topics: rows, source_url: url, syllabus_years: years, subject_code: code,
    verified_at: new Date().toISOString(),
  }).eq('id', existing.id);

  if (error) { console.error(`FAIL ${subject_name}: ${error.message}`); fails++; }
  else console.log(`OK   ${exam_board} ${subject_name.padEnd(12)} ${was} -> ${rows.length}`);
}
console.log(fails ? `\n${fails} failed` : '\ndone');
process.exit(fails ? 1 : 0);
