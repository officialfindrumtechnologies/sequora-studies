-- Two scale fixes. Neither changes who can see what — both were verified against
-- a full before/after snapshot of pg_policies (47 policies in, 47 out, zero
-- semantic differences) and by re-testing anonymous access afterwards.
--
-- 1. RLS initplan (40 policies)
--
-- Every policy called auth.uid() bare, so Postgres re-evaluated it once per row
-- instead of once per query. Wrapping it in a scalar subquery turns it into an
-- InitPlan that runs a single time:
--
--     USING (auth.uid() = user_id)          -->  USING ((select auth.uid()) = user_id)
--
-- This is invisible at present size (673 topics, 11 profiles). It matters as
-- `topics` grows — it is roughly 61 rows per student, so a few thousand students
-- puts hundreds of thousands of rows behind these policies, and at that point
-- the per-row function call is the dominant cost of an ordinary read.
--
-- Postgres normalises the stored expression to `( SELECT auth.uid() AS uid)`.
-- Note the capital SELECT: a lowercase LIKE '%select auth.uid()%' will report
-- every policy as unfixed and send you round in circles.
--
-- 2. Foreign keys without a covering index (25)
--
-- An unindexed FK makes the referenced side's deletes and joins scan. These are
-- reported as "unused" by the linter immediately after creation, which is
-- expected — there is no traffic yet, and the point is to have them before there
-- is.

-- ── 1. Wrap auth.uid() in every policy that still calls it bare ──────────────
do $$
declare r record; n int := 0;
begin
  for r in
    select format('ALTER POLICY %I ON public.%I%s%s;',
      policyname, tablename,
      case when qual is not null
           then ' USING (' || replace(qual, 'auth.uid()', '(select auth.uid())') || ')' else '' end,
      case when with_check is not null
           then ' WITH CHECK (' || replace(with_check, 'auth.uid()', '(select auth.uid())') || ')' else '' end
    ) as stmt
    from pg_policies
    where schemaname = 'public'
      and coalesce(qual,'') || coalesce(with_check,'') like '%auth.uid()%'
      and coalesce(qual,'') || coalesce(with_check,'') not like '%SELECT auth.uid()%'
  loop
    execute r.stmt;
    n := n + 1;
  end loop;
  raise notice 'rewrote % policies', n;
end $$;

-- ── 2. Index every foreign key that lacked one ──────────────────────────────
CREATE INDEX IF NOT EXISTS idx_activation_codes_redeemed_by     ON public.activation_codes (redeemed_by);
CREATE INDEX IF NOT EXISTS idx_activation_codes_created_by      ON public.activation_codes (created_by);
CREATE INDEX IF NOT EXISTS idx_admin_log_admin_id               ON public.admin_log (admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_log_target_user            ON public.admin_log (target_user);
CREATE INDEX IF NOT EXISTS idx_client_errors_user_id            ON public.client_errors (user_id);
CREATE INDEX IF NOT EXISTS idx_errors_subject_id                ON public.errors (subject_id);
CREATE INDEX IF NOT EXISTS idx_errors_user_id                   ON public.errors (user_id);
CREATE INDEX IF NOT EXISTS idx_exam_dates_subject_id            ON public.exam_dates (subject_id);
CREATE INDEX IF NOT EXISTS idx_feedback_submissions_reviewed_by ON public.feedback_submissions (reviewed_by);
CREATE INDEX IF NOT EXISTS idx_feedback_submissions_duplicate_of ON public.feedback_submissions (duplicate_of);
CREATE INDEX IF NOT EXISTS idx_friendships_addressee_id         ON public.friendships (addressee_id);
CREATE INDEX IF NOT EXISTS idx_group_members_user_id            ON public.group_members (user_id);
CREATE INDEX IF NOT EXISTS idx_group_messages_user_id           ON public.group_messages (user_id);
CREATE INDEX IF NOT EXISTS idx_papers_user_id                   ON public.papers (user_id);
CREATE INDEX IF NOT EXISTS idx_papers_subject_id                ON public.papers (subject_id);
CREATE INDEX IF NOT EXISTS idx_questions_created_by             ON public.questions (created_by);
CREATE INDEX IF NOT EXISTS idx_sessions_subject_id              ON public.sessions (subject_id);
CREATE INDEX IF NOT EXISTS idx_study_groups_created_by          ON public.study_groups (created_by);
CREATE INDEX IF NOT EXISTS idx_study_presence_room_id           ON public.study_presence (room_id);
CREATE INDEX IF NOT EXISTS idx_study_presence_subject_id        ON public.study_presence (subject_id);
CREATE INDEX IF NOT EXISTS idx_study_rooms_created_by           ON public.study_rooms (created_by);
CREATE INDEX IF NOT EXISTS idx_subjects_user_id                 ON public.subjects (user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_activated_by       ON public.subscriptions (activated_by);
CREATE INDEX IF NOT EXISTS idx_todos_subject_id                 ON public.todos (subject_id);
CREATE INDEX IF NOT EXISTS idx_topics_subject_id                ON public.topics (subject_id);
