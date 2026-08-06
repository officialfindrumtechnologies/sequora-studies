import { supabase } from '../lib/supabase.js';

export async function getSubjects() {
  const { data, error } = await supabase
    .from('subjects')
    .select('*')
    .order('position', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createSubject({ userId, name, shortName = null, examCode = null, color = '#e8a33d', level = null }) {
  const { data: existing } = await supabase
    .from('subjects')
    .select('position')
    .order('position', { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextPos = existing ? existing.position + 1 : 0;

  const { data, error } = await supabase
    .from('subjects')
    .insert({ user_id: userId, name, short_name: shortName, exam_code: examCode, color, position: nextPos, level })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateSubject(id, updates) {
  const { data, error } = await supabase
    .from('subjects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// orderedIds: array of subject IDs in desired order
export async function reorderSubjects(orderedIds) {
  const updates = orderedIds.map((id, i) =>
    supabase.from('subjects').update({ position: i }).eq('id', id)
  );
  await Promise.all(updates);
}

export async function deleteSubject(id) {
  const { error } = await supabase
    .from('subjects')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// How many templates exist per qualification + board. The add-subject picker
// used to offer a hardcoded board list, so boards we never seeded (OCR, AQA,
// BMDC Bangladesh) were selectable and then rendered an empty list. Drive the
// dropdowns off this instead so a board only appears when it has content.
// Unverified templates are excluded everywhere a student can reach one. A row
// without verified_at has not been read out of the board's own specification,
// so its chapter list is guesswork — and a student revising from a guessed
// syllabus is worse off than one who sees the subject missing and asks why.
export async function getTemplateCounts() {
  const { data, error } = await supabase
    .from('syllabus_templates')
    .select('qualification, exam_board')
    .not('verified_at', 'is', null);
  if (error) throw error;
  const counts = {};
  for (const r of data) {
    if (!r.qualification || !r.exam_board) continue;
    (counts[r.qualification] ??= {})[r.exam_board] =
      (counts[r.qualification][r.exam_board] || 0) + 1;
  }
  return counts;
}

// Fetch templates filtered by qualification + exam board (new schema)
export async function getTemplatesByQualBoard(qualification, examBoard) {
  const { data, error } = await supabase
    .from('syllabus_templates')
    .select('id, subject_name, subject_code, topics, level, verified_at, syllabus_years, source_url')
    .eq('qualification', qualification)
    .eq('exam_board', examBoard)
    .not('verified_at', 'is', null)
    .order('level', { ascending: true, nullsFirst: true })
    .order('subject_name');
  if (error) throw error;
  return data;
}

// Legacy: fetch by old flat board value (backward compat — kept for any callers not yet updated)
export async function getTemplatesByBoard(board) {
  const { data, error } = await supabase
    .from('syllabus_templates')
    .select('id, subject_name, subject_code, topics, level, verified_at, syllabus_years, source_url')
    .eq('board', board)
    .not('verified_at', 'is', null)
    .order('subject_name');
  if (error) throw error;
  return data;
}

// Create a subject from a syllabus template + bulk-insert its topics
// Pass overrideLevel to store a user-chosen IB level (HL/SL) that differs from template default
export async function createSubjectFromTemplate({ userId, templateId, overrideLevel = null }) {
  const { data: tmpl, error: tmplErr } = await supabase
    .from('syllabus_templates')
    .select('subject_name, subject_code, topics, level, verified_at')
    .eq('id', templateId)
    .single();
  if (tmplErr) throw tmplErr;
  // The pickers already filter these out; this catches a stale id held by an
  // open tab from before a template was withdrawn.
  if (!tmpl.verified_at) {
    throw new Error('That syllabus is being re-checked against the exam board and is unavailable right now.');
  }

  const subject = await createSubject({
    userId,
    name: tmpl.subject_name,
    examCode: tmpl.subject_code,
    level: overrideLevel || tmpl.level || null,
  });

  const topicRows = (tmpl.topics || []).map((t, i) => ({
    user_id: userId,
    subject_id: subject.id,
    section: t.section || null,
    name: t.name,
    status: 'notstarted',
    position: i,
  }));

  // The subject row already exists at this point, so a failure part-way through
  // the topics used to leave it behind empty: the student saw the toast, then
  // found a subject with nothing in it and no way to tell what went wrong.
  // Three real subjects were in that state before this was fixed — two students,
  // one of them stuck with an empty Anatomy since June.
  //
  // There is no transaction across these calls from the client, so the next best
  // thing is to undo the subject ourselves and re-raise. Adding a subject is
  // then all-or-nothing from the student's point of view, and retrying is safe.
  if (topicRows.length) {
    try {
      for (let i = 0; i < topicRows.length; i += 500) {
        const { error } = await supabase.from('topics').insert(topicRows.slice(i, i + 500));
        if (error) throw error;
      }
    } catch (err) {
      // Best-effort rollback. Topics first: a leftover topic row would keep the
      // subject alive through its foreign key.
      await supabase.from('topics').delete().eq('subject_id', subject.id);
      await supabase.from('subjects').delete().eq('id', subject.id);
      throw err;
    }
  }

  // Remember the source, so a corrected syllabus can reach this subject later.
  await supabase.from('subjects')
    .update({ template_id: templateId, syllabus_synced_at: new Date().toISOString() })
    .eq('id', subject.id);

  return subject;
}

// Subjects whose template has been updated since they last took content from it.
// Templates were rebuilt from official documents, and a subject created before
// that rebuild keeps the old, hand-written topic list forever without this.
export async function getStaleSubjects() {
  const { data, error } = await supabase
    .from('subjects')
    .select('id, name, syllabus_synced_at, template_id, '
          + 'syllabus_templates!inner(id, subject_name, topics, verified_at, syllabus_years, source_url)')
    .not('template_id', 'is', null);
  if (error) throw error;

  return (data || []).filter(s => {
    const t = s.syllabus_templates;
    if (!t?.verified_at) return false;              // only offer verified rebuilds
    if (!s.syllabus_synced_at) return true;         // predates the link entirely
    return new Date(t.verified_at) > new Date(s.syllabus_synced_at);
  }).map(s => ({
    id: s.id,
    name: s.name,
    templateTopics: Array.isArray(s.syllabus_templates.topics)
      ? s.syllabus_templates.topics.length : 0,
    years: s.syllabus_templates.syllabus_years,
    sourceUrl: s.syllabus_templates.source_url,
  }));
}

// Replace a subject's topics with its template's current content.
//
// This REPLACES rather than merges: progress on the old topics is discarded.
// That is the right trade while the corrected syllabuses are landing — the old
// lists are the invented ones that dropped whole topics — but it is destructive
// and the UI must say so before calling it.
export async function refreshSubjectFromTemplate(subjectId) {
  const { data: subject, error: sErr } = await supabase
    .from('subjects').select('id, user_id, template_id').eq('id', subjectId).single();
  if (sErr) throw sErr;
  if (!subject.template_id) throw new Error('This subject was not created from a syllabus');

  const { data: tmpl, error: tErr } = await supabase
    .from('syllabus_templates').select('topics').eq('id', subject.template_id).single();
  if (tErr) throw tErr;

  const rows = (tmpl.topics || []).map((t, i) => ({
    user_id: subject.user_id,
    subject_id: subject.id,
    section: t.section || null,
    name: t.name,
    status: 'notstarted',
    position: i,
  }));
  if (!rows.length) throw new Error('That syllabus has no topics to copy');

  const { error: delErr } = await supabase.from('topics').delete().eq('subject_id', subject.id);
  if (delErr) throw delErr;

  for (let i = 0; i < rows.length; i += 500) {
    const { error } = await supabase.from('topics').insert(rows.slice(i, i + 500));
    if (error) throw error;
  }

  await supabase.from('subjects')
    .update({ syllabus_synced_at: new Date().toISOString() })
    .eq('id', subject.id);

  return rows.length;
}
