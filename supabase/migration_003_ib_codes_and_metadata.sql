-- ============================================================
-- MIGRATION 003: IB subject codes + subjects metadata column
-- Run in Supabase SQL editor
-- ============================================================

-- 1. Add metadata JSONB column to subjects (IB core tracking: TOK/EE/CAS)
ALTER TABLE subjects
  ADD COLUMN IF NOT EXISTS metadata JSONB;

-- 2. Assign exam codes to IB Diploma syllabus templates so they link to past-papers data.
--    Same code for HL + SL templates of the same subject (level is stored separately).
UPDATE syllabus_templates SET subject_code = 'IB-MATH-AA'
  WHERE qualification = 'IB Diploma' AND subject_name = 'Mathematics: Analysis & Approaches';

UPDATE syllabus_templates SET subject_code = 'IB-MATH-AI'
  WHERE qualification = 'IB Diploma' AND subject_name = 'Mathematics: Applications & Interpretation';

UPDATE syllabus_templates SET subject_code = 'IB-PHYS'
  WHERE qualification = 'IB Diploma' AND subject_name = 'Physics';

UPDATE syllabus_templates SET subject_code = 'IB-CHEM'
  WHERE qualification = 'IB Diploma' AND subject_name = 'Chemistry';

UPDATE syllabus_templates SET subject_code = 'IB-BIO'
  WHERE qualification = 'IB Diploma' AND subject_name = 'Biology';

UPDATE syllabus_templates SET subject_code = 'IB-ECON'
  WHERE qualification = 'IB Diploma' AND subject_name = 'Economics';

UPDATE syllabus_templates SET subject_code = 'IB-HIST'
  WHERE qualification = 'IB Diploma' AND subject_name = 'History';

UPDATE syllabus_templates SET subject_code = 'IB-ENG-A-LIT'
  WHERE qualification = 'IB Diploma' AND subject_name = 'English A Literature';

UPDATE syllabus_templates SET subject_code = 'IB-BM'
  WHERE qualification = 'IB Diploma' AND subject_name = 'Business Management';

UPDATE syllabus_templates SET subject_code = 'IB-PSYCH'
  WHERE qualification = 'IB Diploma' AND subject_name = 'Psychology';

UPDATE syllabus_templates SET subject_code = 'IB-TOK'
  WHERE qualification = 'IB Diploma' AND subject_name ILIKE '%Theory of Knowledge%';

UPDATE syllabus_templates SET subject_code = 'IB-EE'
  WHERE qualification = 'IB Diploma' AND subject_name ILIKE '%Extended Essay%';

UPDATE syllabus_templates SET subject_code = 'IB-CAS'
  WHERE qualification = 'IB Diploma' AND subject_name ILIKE '%Creativity%Activity%Service%';
