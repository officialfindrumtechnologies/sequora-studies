import { supabase } from '../lib/supabase.js';

export async function getSubjects() {
  const { data, error } = await supabase
    .from('subjects')
    .select('*')
    .order('position', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createSubject({ userId, name, shortName = null, examCode = null, color = '#e8a33d' }) {
  const { data: existing } = await supabase
    .from('subjects')
    .select('position')
    .order('position', { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextPos = existing ? existing.position + 1 : 0;

  const { data, error } = await supabase
    .from('subjects')
    .insert({ user_id: userId, name, short_name: shortName, exam_code: examCode, color, position: nextPos })
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

// Fetch available boards from syllabus_templates (no auth needed — public read)
export async function getAvailableBoards() {
  const { data, error } = await supabase
    .from('syllabus_templates')
    .select('board')
    .order('board');
  if (error) throw error;
  return [...new Set(data.map(r => r.board))];
}

// Fetch subjects for a given board
export async function getTemplatesByBoard(board) {
  const { data, error } = await supabase
    .from('syllabus_templates')
    .select('id, subject_name, subject_code, topics')
    .eq('board', board)
    .order('subject_name');
  if (error) throw error;
  return data;
}

// Create a subject from a syllabus template + bulk-insert its topics
export async function createSubjectFromTemplate({ userId, templateId }) {
  const { data: tmpl, error: tmplErr } = await supabase
    .from('syllabus_templates')
    .select('subject_name, subject_code, topics')
    .eq('id', templateId)
    .single();
  if (tmplErr) throw tmplErr;

  const subject = await createSubject({
    userId,
    name: tmpl.subject_name,
    examCode: tmpl.subject_code,
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
    // Batch in 500s to stay within Supabase payload limit
    for (let i = 0; i < topicRows.length; i += 500) {
      const { error } = await supabase.from('topics').insert(topicRows.slice(i, i + 500));
      if (error) throw error;
    }
  }

  return subject;
}
