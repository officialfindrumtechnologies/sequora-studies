import { supabase } from '../lib/supabase.js';
import { todayStr, daysBetween, parseD } from '../lib/date.js';

export async function getCloseout({ since = null } = {}) {
  let q = supabase.from('closeout').select('*').order('day', { ascending: false });
  if (since) q = q.gte('day', since);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

// Toggle a block: if exists flip yes↔no, if missing insert 'yes'
export async function toggleBlock({ userId, day, blockKey }) {
  const { data: existing } = await supabase
    .from('closeout')
    .select('id, value')
    .eq('day', day)
    .eq('block_key', blockKey)
    .maybeSingle();

  if (!existing) {
    const { error } = await supabase.from('closeout').insert({ user_id: userId, day, block_key: blockKey, value: 'yes' });
    if (error) throw error;
    return 'yes';
  }

  const next = existing.value === 'yes' ? 'no' : 'yes';
  const { error } = await supabase.from('closeout').update({ value: next }).eq('id', existing.id);
  if (error) throw error;
  return next;
}

// Current study streak: consecutive days with at least one 'yes' block
export async function getStreak() {
  const today = todayStr();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const since = thirtyDaysAgo.toISOString().slice(0, 10);

  const rows = await getCloseout({ since });

  const daySet = new Set(rows.filter(r => r.value === 'yes').map(r => r.day));
  let streak = 0;
  let cursor = parseD(today);

  while (true) {
    const ds = cursor.getFullYear() + '-'
      + String(cursor.getMonth() + 1).padStart(2, '0') + '-'
      + String(cursor.getDate()).padStart(2, '0');
    if (!daySet.has(ds)) break;
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}
