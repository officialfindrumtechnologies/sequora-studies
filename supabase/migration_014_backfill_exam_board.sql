-- migration_014_backfill_exam_board
--
-- Seven verified templates carried exam_board IS NULL, which made them
-- unreachable: getTemplateCounts() skips rows without an exam_board and
-- getTemplatesByQualBoard() filters on it, so these subjects never appeared in
-- the add-subject picker despite having a checked syllabus behind them —
-- Cambridge O Level and Edexcel IGCSE Bangladesh Studies among them, which are
-- exactly the subjects this app exists to cover. The others were Cambridge AS
-- Marine Science 9693 and Travel & Tourism 9395, Edexcel AS Further Mathematics
-- XFM01, and IB Bangla A Literature and Environmental Systems & Societies.
--
-- Every board maps to one exam_board across the 164 rows that already had the
-- value set, so the backfill is a lookup, not a guess.

update public.syllabus_templates set exam_board = case board
    when 'cambridge_alevel' then 'Cambridge'
    when 'cambridge_igcse'  then 'Cambridge IGCSE'
    when 'edexcel_alevel'   then 'Edexcel'
    when 'edexcel_igcse'    then 'Edexcel IGCSE'
    when 'IB'               then 'IB'
    when 'mbbs'             then 'BMDC Bangladesh'
    when 'o_level'          then 'Cambridge O Level'
  end
where exam_board is null;

-- A template with no exam_board is invisible to students, which is a silent
-- failure — the row looks fine in the table and simply never renders. Make it
-- impossible to insert another one.
alter table public.syllabus_templates
  alter column exam_board set not null,
  alter column qualification set not null;
