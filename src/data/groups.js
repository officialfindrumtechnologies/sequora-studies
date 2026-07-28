import { supabase } from '../lib/supabase.js';

export async function createStudyGroup(name) {
  const { data, error } = await supabase.rpc('create_study_group', { p_name: name });
  if (error) throw error;
  return data?.[0];
}

export async function joinGroupByCode(code) {
  const { data, error } = await supabase.rpc('join_group_by_code', { p_code: code });
  if (error) throw error;
  return data?.[0];
}

export async function leaveGroup(groupId, userId) {
  const { error } = await supabase
    .from('group_members')
    .delete()
    .eq('group_id', groupId)
    .eq('user_id', userId);
  if (error) throw error;
}

export async function getMyGroups() {
  const { data, error } = await supabase.rpc('get_my_groups');
  if (error) throw error;
  return data || [];
}

export async function getGroupBoard(groupId) {
  const { data, error } = await supabase.rpc('get_group_board', { p_group_id: groupId });
  if (error) throw error;
  return data || [];
}

export async function getGlobalBoard() {
  const { data, error } = await supabase.rpc('get_global_board');
  if (error) throw error;
  return data || [];
}

export async function getGroupMessages(groupId, limit = 50) {
  const { data, error } = await supabase
    .from('group_messages')
    .select('id, user_id, kind, body, payload, created_at')
    .eq('group_id', groupId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data || []).reverse();
}

export async function sendGroupMessage({ groupId, userId, kind = 'text', body = null, payload = null }) {
  const { error } = await supabase
    .from('group_messages')
    .insert({ group_id: groupId, user_id: userId, kind, body, payload });
  if (error) throw error;
}

// Realtime: invoke cb on every new message in the group. Returns unsubscribe fn.
export function subscribeGroupMessages(groupId, cb) {
  const ch = supabase
    .channel('grp-' + groupId)
    .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'group_messages', filter: `group_id=eq.${groupId}` },
      (payload) => cb(payload.new))
    .subscribe();
  return () => supabase.removeChannel(ch);
}
