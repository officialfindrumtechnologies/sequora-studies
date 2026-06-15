import { supabase } from '../lib/supabase.js';

export async function getSubscription() {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('tier, status, expires_at, bkash_submitted_at, bkash_trx_id, bkash_amount, activated_at, notes')
    .single();
  if (error) throw error;
  return data;
}

export async function isPaidUser() {
  const sub = await getSubscription();
  return sub.status === 'active' && sub.tier !== 'free';
}

// Submits bKash TrxID to /api/payment (service-role update via server)
export async function submitBkashPayment({ plan, trxId, phone }) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not logged in');

  const resp = await fetch('/api/payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({ plan, trxId, phone }),
  });

  const json = await resp.json();
  if (!resp.ok) throw new Error(json.error || 'Payment submission failed');
  return json;
}

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
