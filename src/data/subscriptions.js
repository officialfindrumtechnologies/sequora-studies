import { supabase } from '../lib/supabase.js';

export async function getSubscription() {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('tier, status, expires_at, bkash_submitted_at, bkash_trx_id')
    .single();
  if (error) throw error;
  return data;
}

// Returns true if user has an active paid subscription
export async function isPaidUser() {
  const sub = await getSubscription();
  return sub.status === 'active' && sub.tier !== 'free';
}

export async function submitBkashPayment({ trxId, amount, phone }) {
  const { error } = await supabase.rpc('submit_bkash_payment', {
    p_trx_id: trxId,
    p_amount: amount,
    p_phone: phone,
  });
  if (error) throw error;
}

// Get AI usage for current month (user can read own rows via RLS)
export async function getAiUsage(callType, monthYear) {
  const { data, error } = await supabase
    .from('ai_usage')
    .select('call_count')
    .eq('call_type', callType)
    .eq('month_year', monthYear)
    .maybeSingle();
  if (error) throw error;
  return data?.call_count ?? 0;
}
