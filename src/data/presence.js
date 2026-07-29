import { supabase } from '../lib/supabase.js';

// Upserted every ~45s while a timer is running. A row whose last_beat is older
// than 2 minutes is treated as offline by get_friends_studying_now(), so a
// closed tab or dead connection ages out on its own without needing cleanup.
export async function beatPresence({ userId, subjectId, startedAt, roomId = null }) {
  const { error } = await supabase
    .from('study_presence')
    .upsert({
      user_id: userId,
      subject_id: subjectId || null,
      started_at: startedAt,
      room_id: roomId,
      last_beat: new Date().toISOString(),
    }, { onConflict: 'user_id' });
  if (error) throw error;
}

export async function clearPresence(userId) {
  await supabase.from('study_presence').delete().eq('user_id', userId);
}

export async function getFriendsStudyingNow() {
  const { data, error } = await supabase.rpc('get_friends_studying_now');
  if (error) throw error;
  return data || [];
}

export async function getFriendsTodayRanking() {
  const { data, error } = await supabase.rpc('get_friends_today_ranking');
  if (error) throw error;
  return data || [];
}
