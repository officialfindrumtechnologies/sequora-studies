// Cross-references syllabus_templates (real curriculum topics) against
// TOPIC_VISUALS (hand-curated visual/practice metadata) to find:
//   1. Topics with zero visual match (Visualizer/Practice buttons will never show)
//   2. Visual entries whose svgKey doesn't resolve to an actual SVG
//   3. Visual entries whose threejs3dFn doesn't resolve to an actual window.create* function
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

import { TOPIC_VISUALS, getTopicVisualsKey } from '../src/data/topic-visuals.js';
import { TOPIC_SVGS as CAM_SVGS } from '../src/data/topic-svgs-igcse-cambridge.js';
import { EDEXCEL_TOPIC_SVGS } from '../src/data/topic-svgs-igcse-edexcel.js';
import { TOPIC_SVGS_ALEVEL_CAMBRIDGE } from '../src/data/topic-svgs-alevel-cambridge.js';
import { TOPIC_SVGS_ALEVEL_EDEXCEL } from '../src/data/topic-svgs-alevel-edexcel.js';
import { TOPIC_SVGS_IB } from '../src/data/topic-svgs-ib.js';
import { TOPIC_SVGS_MBBS } from '../src/data/topic-svgs-mbbs.js';

const TOPIC_SVGS = { ...CAM_SVGS, ...EDEXCEL_TOPIC_SVGS, ...TOPIC_SVGS_ALEVEL_CAMBRIDGE, ...TOPIC_SVGS_ALEVEL_EDEXCEL, ...TOPIC_SVGS_IB, ...TOPIC_SVGS_MBBS };

// Parse public/topic-3d-functions.js for defined window.create* fn names (plain script, not ESM)
const threeSrc = fs.readFileSync(new URL('../public/topic-3d-functions.js', import.meta.url), 'utf8');
const defined3dFns = new Set([...threeSrc.matchAll(/window\.(create\w+)\s*=/g)].map(m => m[1]));

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const { data: templates, error } = await supabase
  .from('syllabus_templates')
  .select('board, subject_name, subject_code, qualification, exam_board, level, topics');

if (error) { console.error('DB error:', error.message); process.exit(1); }

// Same fuzzy match used in src/views/subjects-view.js
function findTvTopic(tvData, topicName) {
  return tvData.topics.find(tv =>
    tv.name.toLowerCase() === topicName.toLowerCase() ||
    topicName.toLowerCase().includes(tv.name.toLowerCase().replace(/^\d+(\.\d+)*\s+/, '').split(' ')[0])
  );
}

let totalSubjects = 0, subjectsWithAnyVisualKey = 0, subjectsFullyUnmatched = 0;
let totalTopics = 0, matchedTopics = 0;
const brokenSvgRefs = [];
const broken3dRefs = [];
const zeroCoverageSubjects = [];
const partialCoverageSubjects = [];

for (const tpl of templates) {
  totalSubjects++;
  const fakeSubj = { exam_code: tpl.subject_code, name: tpl.subject_name };
  const tvKey = getTopicVisualsKey(fakeSubj);
  const tvData = tvKey ? TOPIC_VISUALS[tvKey] : null;

  const topics = Array.isArray(tpl.topics) ? tpl.topics : [];
  totalTopics += topics.length;

  if (!tvData) {
    zeroCoverageSubjects.push(`${tpl.qualification} / ${tpl.board} / ${tpl.subject_name} (${tpl.subject_code || 'no code'}) — no TOPIC_VISUALS key at all (${topics.length} topics)`);
    continue;
  }
  subjectsWithAnyVisualKey++;

  let matchedInSubject = 0;
  for (const t of topics) {
    const name = t.name || String(t);
    const tvTopic = findTvTopic(tvData, name);
    if (tvTopic) {
      matchedInSubject++;
      matchedTopics++;
      if (tvTopic.svgKey && !TOPIC_SVGS[tvTopic.svgKey]) {
        brokenSvgRefs.push(`${tpl.subject_name} :: "${tvTopic.name}" → svgKey "${tvTopic.svgKey}" NOT FOUND in TOPIC_SVGS`);
      }
      const fn3dName = tvTopic.threejs3dFn ? tvTopic.threejs3dFn.split('(')[0] : null;
      if (fn3dName && !defined3dFns.has(fn3dName)) {
        broken3dRefs.push(`${tpl.subject_name} :: "${tvTopic.name}" → threejs3dFn "${tvTopic.threejs3dFn}" NOT FOUND in public/topic-3d-functions.js`);
      }
    }
  }

  if (matchedInSubject === 0) {
    subjectsFullyUnmatched++;
    zeroCoverageSubjects.push(`${tpl.qualification} / ${tpl.board} / ${tpl.subject_name} (${tpl.subject_code || 'no code'}) — has TOPIC_VISUALS key "${tvKey}" but ZERO of ${topics.length} topics matched by name`);
  } else if (matchedInSubject < topics.length) {
    partialCoverageSubjects.push(`${tpl.qualification} / ${tpl.board} / ${tpl.subject_name} (${tpl.subject_code || 'no code'}) — ${matchedInSubject}/${topics.length} topics matched`);
  }
}

console.log('='.repeat(80));
console.log(`SUMMARY: ${totalSubjects} subjects in syllabus_templates, ${totalTopics} total topics`);
console.log(`  Subjects with a TOPIC_VISUALS key at all: ${subjectsWithAnyVisualKey}/${totalSubjects}`);
console.log(`  Topics matched to a visual/practice entry: ${matchedTopics}/${totalTopics} (${(100*matchedTopics/totalTopics).toFixed(1)}%)`);
console.log(`  Subjects with a key but 0 topics matched: ${subjectsFullyUnmatched}`);
console.log(`  Broken svgKey references: ${brokenSvgRefs.length}`);
console.log(`  Broken threejs3dFn references: ${broken3dRefs.length}`);
console.log('='.repeat(80));

console.log('\n--- SUBJECTS WITH NO TOPIC_VISUALS KEY AT ALL (button can never show) ---');
zeroCoverageSubjects.forEach(s => console.log('  ' + s));

console.log('\n--- SUBJECTS WITH PARTIAL COVERAGE (some topics unmatched) ---');
partialCoverageSubjects.forEach(s => console.log('  ' + s));

console.log('\n--- BROKEN svgKey REFERENCES ---');
brokenSvgRefs.forEach(s => console.log('  ' + s));

console.log('\n--- BROKEN threejs3dFn REFERENCES ---');
broken3dRefs.forEach(s => console.log('  ' + s));
