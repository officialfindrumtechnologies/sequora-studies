// One-time migration from study_state JSONB blob → normalized tables.
// Safe to run if some subjects already exist: skips duplicate subjects,
// still imports sessions/errors/papers/closeout via the key→name→id map.

import { supabase } from '../lib/supabase.js';
import { createSubject, getSubjects } from './subjects.js';
import { bulkInsertTopics } from './topics.js';
import { updateProfile } from './profiles.js';

const LEGACY_NAMES = {
  maths: 'Maths A (4MA1)',
  acc:   'Accounting (4AC1)',
  eco:   'Economics (4EC1)',
  bus:   'Business (4BS1)',
  eng:   'English B (4EB1)',
  ban:   'Bangla (4BN1)',
};

// Returns true if the user has a study_state row with non-empty data.
// Note: loadStateFromSupabase() in main.js auto-creates an empty
// { user_id, data: {} } row for every first-time login — a mere row
// existence check would false-positive for virtually every user, so this
// checks that at least one legacy key actually has content.
const LEGACY_KEYS = ['ascent_topics', 'ascent_sessions', 'ascent_errors', 'ascent_papers', 'ascent_closeout', 'ascent_exam'];

export async function hasLegacyData() {
  const { data, error } = await supabase
    .from('study_state')
    .select('data')
    .limit(1)
    .maybeSingle();
  if (error) { console.error('[migration] hasLegacyData check failed:', error.message); return false; }
  const blob = data?.data;
  if (!blob || typeof blob !== 'object') return false;
  return LEGACY_KEYS.some(k => {
    const v = blob[k];
    if (Array.isArray(v)) return v.length > 0;
    if (v && typeof v === 'object') return Object.keys(v).length > 0;
    return !!v;
  });
}

// Runs full migration. onProgress(msg) called after each subject.
// Returns stats: { subjects, topics, sessions, errors, papers, closeout }
export async function migrateFromStudyState(onProgress) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not logged in');

  const { data: row, error: fetchErr } = await supabase
    .from('study_state')
    .select('data')
    .single();
  if (fetchErr || !row?.data) throw new Error('No legacy data found in study_state');

  const blob = row.data;
  const stats = { subjects: 0, topics: 0, sessions: 0, errors: 0, papers: 0, closeout: 0 };

  // ── 1. exam_date ──────────────────────────────────────────────────────────
  if (blob.ascent_exam) {
    await updateProfile({ exam_date: blob.ascent_exam }).catch(() => {});
  }

  // ── 2. Build subjectIdMap: legacyKey → uuid ───────────────────────────────
  // Reuse existing subjects (name match) — don't duplicate if already migrated.
  const existing = await getSubjects();
  const existingByName = {};
  for (const s of existing) existingByName[s.name] = s.id;

  const subjectIdMap = {};
  const legacyTopics = blob.ascent_topics || {};

  for (const [key, topicArr] of Object.entries(legacyTopics)) {
    if (!Array.isArray(topicArr) || !topicArr.length) continue;

    const name = LEGACY_NAMES[key] || key;

    if (existingByName[name]) {
      // Subject already in new system — just map the key, skip topic insert
      subjectIdMap[key] = existingByName[name];
      onProgress?.(`Skipped ${name} (already exists)`);
      continue;
    }

    const subject = await createSubject({
      userId:    user.id,
      name,
      shortName: key.toUpperCase().slice(0, 8),
    });
    subjectIdMap[key] = subject.id;
    stats.subjects++;

    const mapped = topicArr.map((t, i) => ({
      section:  t.section || null,
      name:     t.name || String(t),
      status:   t.status || 'notstarted',
      position: i,
    }));
    await bulkInsertTopics({ userId: user.id, subjectId: subject.id, topics: mapped });
    stats.topics += mapped.length;

    onProgress?.(`Imported ${name} — ${mapped.length} topics`);
  }

  // ── 3. Sessions ───────────────────────────────────────────────────────────
  const legacySessions = Array.isArray(blob.ascent_sessions) ? blob.ascent_sessions : [];
  const sessionRows = legacySessions
    .filter(s => s.subject && subjectIdMap[s.subject])
    .map(s => ({
      user_id:      user.id,
      subject_id:   subjectIdMap[s.subject],
      duration_sec: Math.round(Number(s.dur) || 0),
      study_date:   s.date || new Date(Number(s.ts) || Date.now()).toISOString().slice(0, 10),
      logged_at:    s.ts ? new Date(Number(s.ts)).toISOString() : new Date().toISOString(),
    }));

  for (let i = 0; i < sessionRows.length; i += 500) {
    const { error } = await supabase.from('sessions').insert(sessionRows.slice(i, i + 500));
    if (error) throw new Error('Sessions insert failed: ' + error.message);
  }
  stats.sessions = sessionRows.length;

  // ── 4. Errors ─────────────────────────────────────────────────────────────
  const legacyErrors = Array.isArray(blob.ascent_errors) ? blob.ascent_errors : [];
  const errorRows = legacyErrors
    .filter(e => e.subject && subjectIdMap[e.subject])
    .map(e => ({
      user_id:    user.id,
      subject_id: subjectIdMap[e.subject],
      mistake:    e.mistake || '',
      fix:        e.fix || null,
      logged_at:  e.date || new Date().toISOString().slice(0, 10),
    }));

  for (let i = 0; i < errorRows.length; i += 500) {
    const { error } = await supabase.from('errors').insert(errorRows.slice(i, i + 500));
    if (error) throw new Error('Errors insert failed: ' + error.message);
  }
  stats.errors = errorRows.length;

  // ── 5. Papers ─────────────────────────────────────────────────────────────
  const legacyPapers = Array.isArray(blob.ascent_papers) ? blob.ascent_papers : [];
  const paperRows = legacyPapers
    .filter(p => p.subject && subjectIdMap[p.subject])
    .map(p => ({
      user_id:    user.id,
      subject_id: subjectIdMap[p.subject],
      paper_ref:  p.paper || '',
      score:      parseFloat(p.score) || 0,
      max_score:  parseFloat(p.max)   || 100,
      logged_at:  p.date || new Date().toISOString().slice(0, 10),
    }));

  for (let i = 0; i < paperRows.length; i += 500) {
    const { error } = await supabase.from('papers').insert(paperRows.slice(i, i + 500));
    if (error) throw new Error('Papers insert failed: ' + error.message);
  }
  stats.papers = paperRows.length;

  // ── 6. Closeout ───────────────────────────────────────────────────────────
  const legacyCloseout = blob.ascent_closeout || {};
  const closeoutRows = [];
  for (const [day, blocks] of Object.entries(legacyCloseout)) {
    if (!blocks || typeof blocks !== 'object') continue;
    for (const [blockKey, value] of Object.entries(blocks)) {
      if (value !== 'yes' && value !== 'no') continue;
      closeoutRows.push({ user_id: user.id, day, block_key: blockKey, value });
    }
  }

  for (let i = 0; i < closeoutRows.length; i += 500) {
    const { error } = await supabase
      .from('closeout')
      .upsert(closeoutRows.slice(i, i + 500), { onConflict: 'user_id,day,block_key' });
    if (error) throw new Error('Closeout insert failed: ' + error.message);
  }
  stats.closeout = closeoutRows.length;

  // Mark as consumed so hasLegacyData() doesn't keep offering a re-import
  await supabase.from('study_state').delete().eq('user_id', user.id);

  return stats;
}
