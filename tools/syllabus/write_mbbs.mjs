// Insert the verified MBBS subjects as syllabus templates.
// Source: BM&DC MBBS Curriculum 2021, one official PDF per subject.
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const ROOT = '/Volumes/DevWorkspace/Sequora-studies/sequora';
const DIR  = '/private/tmp/claude-501/-Volumes-DevWorkspace-Sequora-studies-sequora/9f60502e-15a1-43b9-823d-c26e91e05cce/scratchpad/syllabi';

const env = Object.fromEntries(
  fs.readFileSync(`${ROOT}/.env`, 'utf8').split('\n')
    .map(l => l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)).filter(Boolean)
    .map(m => [m[1], m[2].replace(/^["']|["']$/g, '').trim()]));
const sb = createClient(env.VITE_SUPABASE_URL || env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const BASE = 'https://www.bmdc.org.bd/docs/curriculum/2021';
const BATCH = [
  ['4.Physiology',    'Physiology',   `${BASE}/4.Physiology.pdf`],
  ['5.Biochemistry',  'Biochemistry', `${BASE}/5.Biochemistry.pdf`],
  ['12.Microbiology', 'Microbiology', `${BASE}/12.Microbiology.pdf`],
  ['10.CommunityMedicine', 'Community Medicine', `${BASE}/10.CommunityMedicine.pdf`],
];

const dry = process.argv.includes('--dry');
let fails = 0;

for (const [stem, name, url] of BATCH) {
  const d = JSON.parse(fs.readFileSync(`${DIR}/pin-${stem}.json`, 'utf8'));
  if (!d.ok) { console.error(`REFUSED ${name}: ${d.problems}`); fails++; continue; }

  const rows = d.rows.map(r => ({ section: r.section, name: r.name }));
  const chapters = new Set(rows.map(r => r.section));
  if (chapters.size !== d.chapters) {
    console.error(`REFUSED ${name}: ${d.chapters} pinned chapters but ${chapters.size} present`);
    fails++; continue;
  }

  const { data: existing } = await sb.from('syllabus_templates')
    .select('id').eq('qualification', 'MBBS').eq('exam_board', 'BMDC Bangladesh')
    .eq('subject_name', name).maybeSingle();

  const payload = {
    qualification: 'MBBS', exam_board: 'BMDC Bangladesh', board: 'mbbs',
    subject_name: name, subject_code: null, level: null,
    topics: rows, source_url: url, syllabus_years: '2021',
    verified_at: new Date().toISOString(),
  };

  if (dry) { console.log(`DRY  ${name.padEnd(14)} ${d.chapters} ch / ${rows.length} sub  ${existing ? '(update)' : '(insert)'}`); continue; }

  const { error } = existing
    ? await sb.from('syllabus_templates').update(payload).eq('id', existing.id)
    : await sb.from('syllabus_templates').insert(payload);

  if (error) { console.error(`FAIL ${name}: ${error.message}`); fails++; }
  else console.log(`OK   ${name.padEnd(14)} ${d.chapters} chapters / ${rows.length} sub-chapters`);
}
console.log(fails ? `\n${fails} failed` : '\ndone');
process.exit(fails ? 1 : 0);
