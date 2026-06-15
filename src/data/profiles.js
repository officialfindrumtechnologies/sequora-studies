import { supabase } from '../lib/supabase.js';

export async function getProfile() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Completes onboarding wizard — sets onboarded_at to now
export async function completeOnboarding({ displayName, examBoard, examDate }) {
  return updateProfile({
    display_name: displayName,
    exam_board: examBoard,
    exam_date: examDate,
    onboarded_at: new Date().toISOString(),
  });
}

export async function isOnboarded() {
  const { data, error } = await supabase
    .from('profiles')
    .select('onboarded_at')
    .single();
  if (error) return false;
  return !!data?.onboarded_at;
}
