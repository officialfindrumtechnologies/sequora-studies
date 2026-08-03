// Derive an Edexcel IAS template from the verified International A Level one.
//
// The IAL sciences are built from six units and the specs say plainly which
// half is which — "consists of three IAS units, Units 1, 2 and 3" — so the AS
// course is a subset of content that has already been read out of the official
// PDF, unit by unit. Re-parsing the same document to get the same rows would
// add a chance to get it wrong, not a check on it.
//
// The AS rows being replaced described the UK GCE qualification (8BI0, 8CH0,
// 8PH0) while their A Level counterparts already described the International
// one. subject_code moves with the content so the pair stops disagreeing about
// which exam the student is sitting.
//
//   node derive_ias.mjs [--dry]
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const env = Object.fromEntries(
  fs.readFileSync(`${ROOT}/.env`, 'utf8').split('\n')
    .map(l => l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)).filter(Boolean)
    .map(m => [m[1], m[2].replace(/^["']|["']$/g, '').trim()]));
const sb = createClient(env.VITE_SUPABASE_URL || env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// subject -> IAS subject code, with the sentence in the spec that fixes the split
//
// Biology and Physics label their sections by unit, so the IAS half selects
// itself. Chemistry labels them by topic and states the unit boundaries
// separately: Topic 10 is the last thing before "Unit 3: Practical Skills in
// Chemistry I" and Topic 11 the first after "Unit 4", so Units 1-3 are
// Topics 1-10.
const SUBJECTS = {
  Biology:   { code: 'XBI11', by: 'Unit',  keep: [1, 2, 3],
               why: '"consists of three IAS units, units 1, 2 and 3"' },
  Physics:   { code: 'XPH11', by: 'Unit',  keep: [1, 2, 3],
               why: '"IAS units, Units 1, 2 and 3"' },
  Chemistry: { code: 'XCH11', by: 'Topic', keep: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
               why: '"consists of three IAS units – Units 1, 2 and 3"; '
                  + 'Topics 1-10 sit within Units 1-3 in the spec body' },
};

const dry = process.argv.includes('--dry');
let fails = 0, wrote = 0;

for (const [subject, { code, by, keep, why }] of Object.entries(SUBJECTS)) {
  const { data: al } = await sb.from('syllabus_templates')
    .select('id, topics, source_url, syllabus_years, verified_at')
    .eq('board', 'edexcel_alevel').eq('qualification', 'A Level')
    .eq('subject_name', subject).maybeSingle();

  if (!al?.verified_at) {
    console.error(`REFUSED ${subject}: A Level row is not verified, nothing to derive from`);
    fails++; continue;
  }

  const label = new RegExp(`^${by}\\s+(\\d+)`);
  const rows = (al.topics || []).filter(t => {
    const m = label.exec(t.section || '');
    return m && keep.includes(Number(m[1]));
  });

  // An empty slice means the A Level row is not laid out by unit after all,
  // and writing it would publish an empty syllabus as verified.
  if (!rows.length) {
    console.error(`REFUSED ${subject}: no ${by} sections in range in the A Level row`);
    fails++; continue;
  }

  const { data: as } = await sb.from('syllabus_templates').select('id, topics')
    .eq('board', 'edexcel_alevel').eq('qualification', 'AS Level')
    .eq('subject_name', subject).maybeSingle();
  if (!as) { console.error(`REFUSED ${subject}: no AS Level row`); fails++; continue; }

  const was = Array.isArray(as.topics) ? as.topics.length : 0;
  if (dry) { console.log(`DRY  ${subject}  ${was} -> ${rows.length}   ${why}`); continue; }

  const { error } = await sb.from('syllabus_templates').update({
    topics: rows, subject_code: code,
    source_url: al.source_url, syllabus_years: al.syllabus_years,
    verified_at: new Date().toISOString(),
  }).eq('id', as.id);

  if (error) { console.error(`FAIL ${subject}: ${error.message}`); fails++; }
  else { console.log(`OK   ${subject}  ${was} -> ${rows.length}   ${why}`); wrote++; }
}

console.log(`\n${wrote} written, ${fails} refused/failed`);
process.exit(fails ? 1 : 0);
