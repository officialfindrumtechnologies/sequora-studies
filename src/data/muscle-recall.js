import { supabase } from '../lib/supabase.js';
import { todayStr } from '../lib/date.js';

// 2-4-7 spaced repetition for the MBBS muscle reference.
// After each successful recall the muscle resurfaces further out; 3 passes → mastered.
// A miss resets it to resurface tomorrow.
const INTERVALS = [2, 4, 7];   // days added when advancing from reps 0→1, 1→2, 2→3
const MASTERED_AT = 3;

function addDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.getFullYear() + '-'
    + String(d.getMonth() + 1).padStart(2, '0') + '-'
    + String(d.getDate()).padStart(2, '0');
}

// Returns a map of muscle_id → { reps, next_due, last_result } for the current user.
export async function getMuscleRecall() {
  const { data, error } = await supabase
    .from('muscle_recall')
    .select('muscle_id, reps, next_due, last_result');
  if (error) throw error;
  const map = {};
  (data || []).forEach(r => { map[r.muscle_id] = r; });
  return map;
}

async function upsert(userId, muscleId, reps, nextDue, result) {
  const { error } = await supabase
    .from('muscle_recall')
    .upsert(
      { user_id: userId, muscle_id: muscleId, reps, next_due: nextDue, last_result: result, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,muscle_id' }
    );
  if (error) throw error;
  return { muscle_id: muscleId, reps, next_due: nextDue, last_result: result };
}

// "Got it" — advance one step along 2-4-7. Returns the new row state.
export async function markMusclePass(userId, muscleId, currentReps = 0) {
  const reps = Math.min(currentReps + 1, MASTERED_AT);
  // mastered rows get no further due date
  const nextDue = reps >= MASTERED_AT ? null : addDays(INTERVALS[reps - 1]);
  return upsert(userId, muscleId, reps, nextDue, 'pass');
}

// "Missed it" — reset and keep it due *today* so it stays in the same-session
// review queue for immediate re-drilling (like Anki's "Again").
export async function markMuscleFail(userId, muscleId) {
  return upsert(userId, muscleId, 0, todayStr(), 'fail');
}

export function isMuscleDue(row) {
  if (!row) return false;                    // never studied → not in the due queue yet
  if (row.reps >= MASTERED_AT) return false; // mastered
  if (!row.next_due) return true;
  return row.next_due <= todayStr();
}

export { MASTERED_AT };
