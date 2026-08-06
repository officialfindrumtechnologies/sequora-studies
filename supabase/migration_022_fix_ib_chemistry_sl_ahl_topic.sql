-- IB Chemistry SL carried "Reactivity 1.4 Entropy and spontaneity (Additional
-- higher level)". In the 2023 IB Chemistry guide that topic is AHL-only: a
-- Standard Level student does not study it and is never examined on it. Leaving
-- it in meant an SL student would plan and revise a topic outside their
-- syllabus — real study time spent on something that cannot appear in their
-- exam.
--
-- Found by comparing every IB HL/SL pair: ten pairs have byte-identical topic
-- lists, and this was the only one where that parity was actually wrong.
--
-- The remaining identical pairs are NOT bugs, so do not "fix" them:
--   * Chemistry / Physics — the 2023+ guides give both levels the same
--     Structure/Reactivity top-level topics; the AHL extensions live inside
--     them as sub-points rather than as separate topics.
--   * Language B (English/French/Spanish B) — both levels share the same five
--     prescribed themes; HL differs in assessment and the literature
--     requirement, not in the themes.
--   * Language A (Literature, Language & Literature) — both levels share the
--     same three areas of exploration.
--
-- HL is deliberately untouched: it should keep the topic.

update syllabus_templates
set topics = (
      select jsonb_agg(t order by ord)
      from jsonb_array_elements(topics) with ordinality e(t, ord)
      where t->>'name' <> 'Reactivity 1.4 Entropy and spontaneity (Additional higher level)'
    )
where qualification = 'IB Diploma'
  and subject_code = 'IB-CHEM-SL';

-- Expected after: IB-CHEM-HL = 22 topics (1 AHL-labelled), IB-CHEM-SL = 21 (0).
