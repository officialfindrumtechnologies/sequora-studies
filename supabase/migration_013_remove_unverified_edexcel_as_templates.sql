-- migration_013_remove_unverified_edexcel_as_templates
--
-- Removes the last two syllabus templates whose content was invented rather
-- than read out of a specification:
--
--   8EN0 AS English Language — listed a flat "Core" section; Pearson structures
--                              the qualification as Components.
--   8HI0 AS History          — listed "Period Study" / "Depth Study" / "Skills";
--                              Pearson structures it as numbered route options.
--
-- Pearson publishes no AS specification for either at any findable URL, and the
-- A Level documents do not state the AS composition, so the real content cannot
-- be derived without guessing. The rows are deleted rather than corrected: an
-- absent subject prompts a student to ask, a wrong one does not.
--
-- Both rows carried verified_at IS NULL and source_url IS NULL, and no subjects
-- row referenced either. The full content is kept in the repository at
-- tools/syllabus/removed/unverified-edexcel-as-2026-08-05.json should Pearson
-- ever publish the specifications.

delete from public.syllabus_templates
where verified_at is null
  and id in ('cd98a7f7-fdf6-4e50-8188-afcfe9a25ee9',
             '60f43562-a277-419b-91ba-6a42cb285a3c');
