import { supabase } from '../lib/supabase.js';

async function authedFetch(path, opts = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not logged in');
  const resp = await fetch(path, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
      ...(opts.headers || {}),
    },
  });
  const json = await resp.json();
  if (!resp.ok) throw new Error(json.error || 'Request failed');
  return json;
}

export async function submitFeedback(type, message) {
  const { submission } = await authedFetch('/api/feedback', {
    method: 'POST',
    body: JSON.stringify({ type, message }),
  });
  return submission;
}

export async function getMyFeedback() {
  const { submissions } = await authedFetch('/api/feedback');
  return submissions;
}
