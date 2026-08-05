-- migration_017_client_error_reporting
--
-- Nothing in the app has ever reported a client-side crash. A student whose
-- dashboard throws on load sees a blank panel, closes the tab, and no trace of
-- it reaches anyone. This is the smallest thing that fixes that.
--
-- Deliberately a table rather than a Serverless Function: the Hobby plan allows
-- 12 and the project is at 11, so an /api/log-error route would spend the last
-- slot on logging and break the next real endpoint someone adds.
--
-- Note the table is NOT called "errors" — that one already exists and holds the
-- student's own log of exam mistakes, which is study content, not telemetry.
--
-- Written by src/lib/error-reporter.js.

create table if not exists public.client_errors (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete set null,
  kind        text not null default 'error',
  message     text not null check (length(message) <= 2000),
  stack       text check (length(stack) <= 8000),
  source      text check (length(source) <= 500),
  path        text check (length(path) <= 500),
  user_agent  text check (length(user_agent) <= 500),
  created_at  timestamptz not null default now()
);

create index if not exists client_errors_created_idx on public.client_errors (created_at desc);
create index if not exists client_errors_message_idx on public.client_errors (message);

alter table public.client_errors enable row level security;

-- Signed-in users may file a report against themselves and nothing else. There
-- is deliberately no SELECT policy: reports are read by the service role in the
-- admin panel, never by other students, because a stack trace can carry
-- fragments of whatever the user was doing when it blew up.
create policy "client_errors: insert own"
  on public.client_errors for insert
  to authenticated
  with check (user_id = auth.uid());

revoke select, update, delete on public.client_errors from anon, authenticated;
