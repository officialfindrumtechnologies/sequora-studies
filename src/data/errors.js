import { supabase } from '../lib/supabase.js';
import { todayStr } from '../lib/date.js';

export async function getErrors({ subjectId = null } = {}) {
  let q = supabase
    .from('errors')
    .select('*, subjects(name, short_name)')
    .order('created_at', { ascending: false });
  if (subjectId) q = q.eq('subject_id', subjectId);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function createError({ userId, subjectId, mistake, fix = null }) {
  const { data, error } = await supabase
    .from('errors')
    .insert({ user_id: userId, subject_id: subjectId, mistake, fix, logged_at: todayStr() })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteError(id) {
  const { error } = await supabase.from('errors').delete().eq('id', id);
  if (error) throw error;
}
