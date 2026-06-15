import { supabase } from '../lib/supabase.js';
import { todayStr } from '../lib/date.js';

export async function getPapers({ subjectId = null } = {}) {
  let q = supabase
    .from('papers')
    .select('*, subjects(name, short_name)')
    .order('logged_at', { ascending: false });
  if (subjectId) q = q.eq('subject_id', subjectId);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function createPaper({ userId, subjectId, paperRef, score, maxScore }) {
  const { data, error } = await supabase
    .from('papers')
    .insert({ user_id: userId, subject_id: subjectId, paper_ref: paperRef, score, max_score: maxScore, logged_at: todayStr() })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePaper(id) {
  const { error } = await supabase.from('papers').delete().eq('id', id);
  if (error) throw error;
}
