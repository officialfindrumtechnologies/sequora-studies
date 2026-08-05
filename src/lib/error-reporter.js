// Global client-side error reporting.
//
// Until this existed a crash in the dashboard was completely silent: the panel
// rendered blank, the student closed the tab, and nobody ever found out. Errors
// go to public.client_errors, which only accepts inserts for the signed-in user
// and is readable by the service role alone.
//
// Three things this deliberately does NOT do:
//   - report before sign-in, because the RLS policy requires a user and an
//     anonymous insert path would be an open write endpoint;
//   - send the full URL, because query strings carry auth tokens on the
//     verification and magic-link return trips;
//   - retry. A reporter that throws or floods on a failing connection makes a
//     bad situation worse, so every failure here is swallowed.

import { supabase } from './supabase.js';

const MAX_PER_SESSION = 20;   // a render loop can throw thousands; cap the noise
const seen = new Set();       // same message+source only reported once
let sent = 0;
let installed = false;

function truncate(v, n) {
  if (typeof v !== 'string') return null;
  return v.length > n ? v.slice(0, n) : v;
}

async function report(kind, message, stack, source) {
  if (!supabase || sent >= MAX_PER_SESSION) return;

  const key = `${message}|${source || ''}`;
  if (seen.has(key)) return;
  seen.add(key);
  sent++;

  try {
    const { data } = await supabase.auth.getUser();
    const uid = data?.user?.id;
    if (!uid) return;   // policy requires user_id = auth.uid()

    await supabase.from('client_errors').insert({
      user_id:    uid,
      kind,
      message:    truncate(String(message ?? 'unknown'), 2000),
      stack:      truncate(stack, 8000),
      source:     truncate(source, 500),
      // pathname only — never search/hash, which carry tokens
      path:       truncate(window.location.pathname, 500),
      user_agent: truncate(navigator.userAgent, 500),
    });
  } catch {
    // Reporting must never itself surface an error to the student.
  }
}

export function installErrorReporter() {
  if (installed) return;
  installed = true;

  window.addEventListener('error', (e) => {
    // Failed <img>/<script> loads also fire this, with no error object.
    if (!e.error && !e.message) return;
    report(
      'error',
      e.message || e.error?.message,
      e.error?.stack,
      e.filename ? `${e.filename}:${e.lineno}:${e.colno}` : null,
    );
  });

  window.addEventListener('unhandledrejection', (e) => {
    const r = e.reason;
    report(
      'unhandledrejection',
      r?.message || String(r),
      r?.stack,
      null,
    );
  });
}
