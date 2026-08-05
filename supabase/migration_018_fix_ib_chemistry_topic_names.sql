-- migration_018_fix_ib_chemistry_topic_names
--
-- Nine IB Chemistry topic names captured the guide's "guiding question" line
-- rather than the topic title, e.g. Structure 2.1 was stored as "How is it
-- possible for a radical to be" instead of "The ionic model", and Reactivity 3.1
-- as "Nitration of benzene uses a mixture" instead of "Proton transfer
-- reactions". These are the names a student sees in their subject list, so they
-- were wrong on screen, not merely in metadata — and they were in a template
-- previously marked verified.
--
-- Titles below are the published first-assessment-2025 IB Chemistry topics.
-- Reactivity 3.3 was already correct and is left alone.

update public.syllabus_templates
set topics = (
  select jsonb_agg(
    case
      when t->>'name' like 'Structure 1.5%'  then jsonb_set(t, '{name}', '"Structure 1.5 Ideal gases"')
      when t->>'name' like 'Structure 2.1%'  then jsonb_set(t, '{name}', '"Structure 2.1 The ionic model"')
      when t->>'name' like 'Structure 2.2%'  then jsonb_set(t, '{name}', '"Structure 2.2 The covalent model"')
      when t->>'name' like 'Structure 2.3%'  then jsonb_set(t, '{name}', '"Structure 2.3 The metallic model"')
      when t->>'name' like 'Structure 2.4%'  then jsonb_set(t, '{name}', '"Structure 2.4 From models to materials"')
      when t->>'name' like 'Reactivity 3.1%' then jsonb_set(t, '{name}', '"Reactivity 3.1 Proton transfer reactions"')
      when t->>'name' like 'Reactivity 3.2%' then jsonb_set(t, '{name}', '"Reactivity 3.2 Electron transfer reactions"')
      when t->>'name' like 'Reactivity 3.4%' then jsonb_set(t, '{name}', '"Reactivity 3.4 Electron-pair sharing reactions"')
      else t
    end
    order by ord
  )
  from jsonb_array_elements(topics) with ordinality a(t, ord)
)
where board = 'IB' and subject_name = 'Chemistry';
