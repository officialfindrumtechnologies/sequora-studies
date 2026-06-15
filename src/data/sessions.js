import { supabase } from '../lib/supabase.js';
import { todayStr, startOfWeek } from '../lib/date.js';

export async function getSessions({ subjectId = null, since = null } = {}) {
  let q = supabase.from('sessions').select('*, subjects(name, short_name)').order('study_date', { ascending: false });
  if (subjectId) q = q.eq('subject_id', subjectId);
  if (since) q = q.gte('study_date', since);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function createSession({ userId, subjectId, durationSec, studyDate = null }) {
  const { data, error } = await supabase
    .from('sessions')
    .insert({ user_id: userId, subject_id: subjectId, duration_sec: durationSec, study_date: studyDate ?? todayStr() })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteSession(id) {
  const { error } = await supabase.from('sessions').delete().eq('id', id);
  if (error) throw error;
}

// Total hours for a subject (or all subjects if subjectId null) since a date
export async function hoursFor({ subjectId = null, since = null } = {}) {
  const sessions = await getSessions({ subjectId, since });
  const totalSec = sessions.reduce((acc, s) => acc + s.duration_sec, 0);
  return totalSec / 3600;
}

export async function hoursToday(subjectId = null) {
  return hoursFor({ subjectId, since: todayStr() });
}

export async function hoursThisWeek(subjectId = null) {
  const mon = startOfWeek();
  const since = mon.toISOString().slice(0, 10);
  return hoursFor({ subjectId, since });
}
