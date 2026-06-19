import { supabase } from '../lib/supabase.js';

export async function searchUsers(q) {
  const { data, error } = await supabase.rpc('search_profiles', { q: q.trim() });
  if (error) throw error;
  return data || [];
}

export async function sendFriendRequest(requesterId, addresseeId) {
  const { error } = await supabase
    .from('friendships')
    .insert({ requester_id: requesterId, addressee_id: addresseeId });
  if (error) throw error;
}

export async function getPendingRequests() {
  const { data, error } = await supabase.rpc('get_pending_requests');
  if (error) throw error;
  return data || [];
}

export async function acceptFriendRequest(friendshipId) {
  const { error } = await supabase
    .from('friendships')
    .update({ status: 'accepted' })
    .eq('id', friendshipId);
  if (error) throw error;
}

export async function declineFriendRequest(friendshipId) {
  const { error } = await supabase.from('friendships').delete().eq('id', friendshipId);
  if (error) throw error;
}

export async function removeFriend(friendshipId) {
  const { error } = await supabase.from('friendships').delete().eq('id', friendshipId);
  if (error) throw error;
}

export async function getFriendsLeaderboard(userId) {
  const { data, error } = await supabase.rpc('get_friends_leaderboard', { p_user_id: userId });
  if (error) throw error;
  return data || [];
}

export async function getExistingRelationship(myId, theirId) {
  const { data } = await supabase
    .from('friendships')
    .select('id, status, requester_id')
    .or(`and(requester_id.eq.${myId},addressee_id.eq.${theirId}),and(requester_id.eq.${theirId},addressee_id.eq.${myId})`)
    .maybeSingle();
  return data;
}

export async function getFriendsLastActivity(userIds) {
  if (!userIds.length) return new Set();
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const { data } = await supabase
    .from('sessions')
    .select('user_id')
    .in('user_id', userIds)
    .gte('study_date', yesterday);
  return new Set((data || []).map(s => s.user_id));
}
