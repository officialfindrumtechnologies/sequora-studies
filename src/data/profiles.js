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
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', user.id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Completes onboarding wizard — sets onboarded_at to now
// qualification: 'A Level' | 'AS Level' | 'IGCSE / O Level' | 'IB Diploma' | 'MBBS'
// examBoard:     'Edexcel' | 'Cambridge' | 'OCR' | 'AQA' | 'IB' | 'BMDC Bangladesh' | etc.
export async function completeOnboarding({ displayName, qualification, examBoard, examDate }) {
  return updateProfile({
    display_name:  displayName,
    qualification: qualification || null,
    exam_board:    examBoard    || null,
    exam_date:     examDate     || null,
    onboarded_at:  new Date().toISOString(),
  });
}

export async function saveTheme(themeData) {
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase
    .from('profiles')
    .update({ theme_data: themeData })
    .eq('id', user.id);
  if (error) throw error;
}

export async function loadThemeFromDB() {
  const { data } = await supabase
    .from('profiles')
    .select('theme_data')
    .single();
  return data?.theme_data ?? null;
}

export async function isOnboarded() {
  const { data, error } = await supabase
    .from('profiles')
    .select('onboarded_at')
    .single();
  if (error) return false;
  return !!data?.onboarded_at;
}
