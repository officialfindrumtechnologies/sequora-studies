import { supabase } from '../lib/supabase.js';

export async function getExamDates() {
  const { data, error } = await supabase
    .from('exam_dates')
    .select('id, label, subject_id, exam_date')
    .order('exam_date', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function addExamDate({ userId, label, subjectId = null, examDate }) {
  const { data, error } = await supabase
    .from('exam_dates')
    .insert({ user_id: userId, label, subject_id: subjectId, exam_date: examDate })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteExamDate(id) {
  const { error } = await supabase.from('exam_dates').delete().eq('id', id);
  if (error) throw error;
}

export async function useStreakFreeze(day) {
  const { data, error } = await supabase.rpc('use_streak_freeze', { p_day: day });
  if (error) throw error;
  return data;
}

export async function getMyLeague() {
  const { data, error } = await supabase.rpc('get_my_league');
  if (error) throw error;
  return data?.[0] || null;
}

export async function getLeagueBoard() {
  const { data, error } = await supabase.rpc('get_league_board');
  if (error) throw error;
  return data || [];
}

export async function createStudyRoom(name) {
  const { data, error } = await supabase.rpc('create_study_room', { p_name: name });
  if (error) throw error;
  return data?.[0];
}

export async function getOpenRooms() {
  const { data, error } = await supabase.rpc('get_open_rooms');
  if (error) throw error;
  return data || [];
}

export async function getRoomMembers(roomId) {
  const { data, error } = await supabase.rpc('get_room_members', { p_room_id: roomId });
  if (error) throw error;
  return data || [];
}
