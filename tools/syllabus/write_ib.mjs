// Write verified IB Diploma templates.
//
// Provenance: IB does not publish subject guides on ibo.org — they sit behind
// My IB. These are the official guides (IB copyright, IB publication imprint,
// stated first-assessment year) mirrored by schools. The content is authentic
// but the mirror is not authoritative for currency, so source_url records the
// exact file used and syllabus_years the guide's own stated version.
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const ROOT = '/Volumes/DevWorkspace/Sequora-studies/sequora';
const DIR  = '/private/tmp/claude-501/-Volumes-DevWorkspace-Sequora-studies-sequora/9f60502e-15a1-43b9-823d-c26e91e05cce/scratchpad/syllabi';

const env = Object.fromEntries(
  fs.readFileSync(`${ROOT}/.env`, 'utf8').split('\n')
    .map(l => l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)).filter(Boolean)
    .map(m => [m[1], m[2].replace(/^["']|["']$/g, '').trim()]));
const sb = createClient(env.VITE_SUPABASE_URL || env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// [parsed-file, subject_name, level, years, source]
// Only HL is written for Biology. The guide covers SL and HL in one document
// and marks HL-only topics in a roadmap table whose tags wrap across lines, so
// the SL subset cannot be derived reliably yet — and an SL list carrying
// HL-only topics would tell a student to study material off their syllabus.
const BATCH = [
  ['pib-biology-HL', 'Biology',   'HL', 'first assessment 2025',
   'https://anatolia.edu.gr/images/highschool/IBDP/Biology%20Guide%202025.pdf'],
  ['pib-physics',    'Physics',   'HL', 'first assessment 2025',
   'https://anatolia.edu.gr/images/highschool/IBDP/Physics%20Guide%202025.pdf'],
  ['pib-chemistry',  'Chemistry', 'HL', 'first assessment 2025',
   'https://anatolia.edu.gr/images/highschool/IBDP/Chemistry%20Guide%202025.pdf'],
  // Mathematics AA is the one guide whose SL/HL split is unambiguous: every
  // sub-topic is labelled "SL 1.1" or "AHL 1.10", so both levels can be written.
  ['pib-maths-aa-HL', 'Mathematics: Analysis & Approaches', 'HL', 'first assessment 2021',
   'https://resources.finalsite.net/images/v1701373021/d11org/afkyrocwzw9kr5xjo2xu/Mathematics-AnalysisandApproaches.pdf'],
  ['pib-maths-aa-SL', 'Mathematics: Analysis & Approaches', 'SL', 'first assessment 2021',
   'https://resources.finalsite.net/images/v1701373021/d11org/afkyrocwzw9kr5xjo2xu/Mathematics-AnalysisandApproaches.pdf'],
  ['pib-maths-ai-HL', 'Mathematics: Applications & Interpretation', 'HL', 'first assessment 2021',
   'https://dp.uwcea.org/docs/Mathematics%20-%20Applications%20and%20Interpretation%20Subject%20Guide.pdf'],
  ['pib-maths-ai-SL', 'Mathematics: Applications & Interpretation', 'SL', 'first assessment 2021',
   'https://dp.uwcea.org/docs/Mathematics%20-%20Applications%20and%20Interpretation%20Subject%20Guide.pdf'],
];

const dry = process.argv.includes('--dry');
let fails = 0;

for (const [stem, subject_name, level, years, url] of BATCH) {
  const d = JSON.parse(fs.readFileSync(`${DIR}/${stem}.json`, 'utf8'));
  if (!d.ok) { console.error(`REFUSED ${subject_name} ${level}: ${d.problems}`); fails++; continue; }

  const rows = d.rows.map(r => ({ section: r.section, name: r.name }));
  const { data: existing } = await sb.from('syllabus_templates')
    .select('id, topics').eq('qualification', 'IB Diploma')
    .eq('subject_name', subject_name).eq('level', level).maybeSingle();
  if (!existing) { console.error(`REFUSED: no ${subject_name} ${level} row`); fails++; continue; }

  const was = Array.isArray(existing.topics) ? existing.topics.length : 0;
  if (dry) { console.log(`DRY  ${subject_name} ${level}  ${was} -> ${rows.length}`); continue; }

  const { error } = await sb.from('syllabus_templates').update({
    topics: rows, source_url: url, syllabus_years: years,
    verified_at: new Date().toISOString(),
  }).eq('id', existing.id);

  if (error) { console.error(`FAIL ${subject_name} ${level}: ${error.message}`); fails++; }
  else console.log(`OK   ${subject_name} ${level}  ${was} -> ${rows.length}`);
}
console.log(fails ? `\n${fails} failed` : '\ndone');
process.exit(fails ? 1 : 0);
