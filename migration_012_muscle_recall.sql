-- Spaced-repetition state for the MBBS muscle reference (2-4-7 method).
-- One row per (user, muscle). muscle_id is a static string id from the app's
-- MUSCLES dataset (e.g. 'deltoid'), not a DB foreign key.
create table if not exists muscle_recall (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  muscle_id text not null,
  reps int not null default 0,          -- successful recalls: 0 new, 3 = mastered
  next_due date,                        -- when it should resurface
  last_result text,                     -- 'pass' | 'fail'
  updated_at timestamptz not null default now(),
  unique (user_id, muscle_id)
);

alter table muscle_recall enable row level security;

create policy "own muscle_recall select" on muscle_recall
  for select using (auth.uid() = user_id);
create policy "own muscle_recall insert" on muscle_recall
  for insert with check (auth.uid() = user_id);
create policy "own muscle_recall update" on muscle_recall
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own muscle_recall delete" on muscle_recall
  for delete using (auth.uid() = user_id);

create index if not exists idx_muscle_recall_user_due on muscle_recall(user_id, next_due);
