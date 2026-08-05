-- Multiple PERMISSIVE policies for the same role and command all run on every
-- query. Two cases here were pure overhead; both folds are exactly equivalent
-- because permissive policies are OR'd together.
--
-- Not touched: `sessions`. It has "sessions: own rows" (FOR ALL) alongside
-- "Allow reading friends sessions for activity tracking" (FOR SELECT), and the
-- SELECT halves do overlap — but the first policy is also what grants INSERT,
-- UPDATE and DELETE on a student's own sessions. Removing it would take those
-- away, and splitting it into per-command policies trades one duplicate SELECT
-- for three new policies. Left alone deliberately.

-- ── 1. subscriptions: two byte-identical SELECT policies ────────────────────
-- Same command, same {public} roles, same expression, both permissive, both
-- with_check null. Dropping one cannot change access.
drop policy if exists "Users read own subscription" on public.subscriptions;

-- ── 2. questions: two SELECT policies for `authenticated` ───────────────────
--   questions_read_own    : created_by = auth.uid()
--   questions_read_shared : is_shared = true
--   merged                : created_by = auth.uid() OR is_shared = true
drop policy if exists "questions_read_own" on public.questions;
drop policy if exists "questions_read_shared" on public.questions;

create policy "questions_read_own_or_shared" on public.questions
  for select to authenticated
  using (created_by = (select auth.uid()) or is_shared = true);
