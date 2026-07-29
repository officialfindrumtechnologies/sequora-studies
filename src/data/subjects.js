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
export async function getTemplateCounts() {
  const { data, error } = await supabase
    .from('syllabus_templates')
    .select('qualification, exam_board');
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
    .select('id, subject_name, subject_code, topics, level')
    .eq('qualification', qualification)
    .eq('exam_board', examBoard)
    .order('level', { ascending: true, nullsFirst: true })
    .order('subject_name');
  if (error) throw error;
  return data;
}

// Legacy: fetch by old flat board value (backward compat — kept for any callers not yet updated)
export async function getTemplatesByBoard(board) {
  const { data, error } = await supabase
    .from('syllabus_templates')
    .select('id, subject_name, subject_code, topics, level')
    .eq('board', board)
    .order('subject_name');
  if (error) throw error;
  return data;
}

// Create a subject from a syllabus template + bulk-insert its topics
// Pass overrideLevel to store a user-chosen IB level (HL/SL) that differs from template default
export async function createSubjectFromTemplate({ userId, templateId, overrideLevel = null }) {
  const { data: tmpl, error: tmplErr } = await supabase
    .from('syllabus_templates')
    .select('subject_name, subject_code, topics, level')
    .eq('id', templateId)
    .single();
  if (tmplErr) throw tmplErr;

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

  if (topicRows.length) {
    for (let i = 0; i < topicRows.length; i += 500) {
      const { error } = await supabase.from('topics').insert(topicRows.slice(i, i + 500));
      if (error) throw error;
    }
  }

  return subject;
}
