import { supabase } from '../lib/supabase.js';
import { todayStr } from '../lib/date.js';

export async function getTopics(subjectId) {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('subject_id', subjectId)
    .order('position', { ascending: true });
  if (error) throw error;
  return data;
}

// Returns all topics for the user (all subjects) — for recall queue, dashboard stats
export async function getAllTopics() {
  const { data, error } = await supabase
    .from('topics')
    .select('*, subjects(name, short_name)')
    .order('subject_id')
    .order('position');
  if (error) throw error;
  return data;
}

export async function createTopic({ userId, subjectId, section = null, name }) {
  const { data: last } = await supabase
    .from('topics')
    .select('position')
    .eq('subject_id', subjectId)
    .order('position', { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextPos = last ? last.position + 1 : 0;

  const { data, error } = await supabase
    .from('topics')
    .insert({ user_id: userId, subject_id: subjectId, section, name, status: 'notstarted', position: nextPos })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateTopic(id, updates) {
  const { data, error } = await supabase
    .from('topics')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTopic(id) {
  const { error } = await supabase.from('topics').delete().eq('id', id);
  if (error) throw error;
}

// notstarted → learning → ready cycle
export async function cycleTopicStatus(id, currentStatus) {
  const cycle = { notstarted: 'learning', learning: 'ready', ready: 'notstarted' };
  const next = cycle[currentStatus] ?? 'notstarted';

  const updates = { status: next };
  if (next === 'ready') {
    updates.ready_at = todayStr();
    updates.last_recall = todayStr();
  } else if (next === 'notstarted') {
    updates.ready_at = null;
    updates.last_recall = null;
    updates.recall_reps = 0;
  }

  return updateTopic(id, updates);
}

// Spaced recall: topics with status=ready not recalled in last 3 days
export async function getRecallDue() {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  const cutoff = threeDaysAgo.toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from('topics')
    .select('*, subjects(name, short_name)')
    .eq('status', 'ready')
    .or(`last_recall.is.null,last_recall.lte.${cutoff}`)
    .order('last_recall', { ascending: true, nullsFirst: true })
    .limit(10);
  if (error) throw error;
  return data;
}

// 2-4-7 method: 3 successful recalls (2d, 4d, 7d after ready) → mastered
const RECALL_STEPS_COUNT = 3;

export async function markRecallPass(id) {
  const { data: topic } = await supabase.from('topics').select('recall_reps').eq('id', id).single();
  const newReps = (topic?.recall_reps ?? 0) + 1;
  const updates = { last_recall: todayStr(), recall_reps: newReps };
  if (newReps >= RECALL_STEPS_COUNT) updates.status = 'mastered';
  return updateTopic(id, updates);
}

export async function markRecallFail(id) {
  return updateTopic(id, {
    status: 'learning',
    ready_at: null,
    last_recall: null,
    recall_reps: 0,
  });
}

// Bulk insert for template import, PDF extraction, or migration
// topics: [{ section, name, status? }]
// startPosition: offset for position column (use sv.topics.length when appending to existing)
export async function bulkInsertTopics({ userId, subjectId, topics, startPosition = 0 }) {
  const rows = topics.map((t, i) => ({
    user_id: userId,
    subject_id: subjectId,
    section: t.section || null,
    name: t.name,
    status: t.status || 'notstarted',
    position: startPosition + i,
  }));

  for (let i = 0; i < rows.length; i += 500) {
    const { error } = await supabase.from('topics').insert(rows.slice(i, i + 500));
    if (error) throw error;
  }
}

// Reorder topics within a subject
export async function reorderTopics(orderedIds) {
  const updates = orderedIds.map((id, i) =>
    supabase.from('topics').update({ position: i }).eq('id', id)
  );
  await Promise.all(updates);
}
