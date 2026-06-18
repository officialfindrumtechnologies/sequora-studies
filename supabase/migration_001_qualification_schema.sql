-- ============================================================
-- MIGRATION 001: Qualification system schema additions
-- Run in Supabase SQL editor
-- ============================================================

-- 1. Add qualification column to profiles
--    Stores high-level qual type: 'A Level', 'AS Level', 'IGCSE / O Level', 'IB Diploma', 'MBBS'
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS qualification text;

-- 2. Add qualification, exam_board, level columns to syllabus_templates
--    qualification: same values as above
--    exam_board:    'Edexcel', 'Cambridge', 'OCR', 'AQA', 'IB', 'BMDC Bangladesh', etc.
--    level:         IB only — 'HL', 'SL', 'Core'
ALTER TABLE syllabus_templates
  ADD COLUMN IF NOT EXISTS qualification text,
  ADD COLUMN IF NOT EXISTS exam_board    text,
  ADD COLUMN IF NOT EXISTS level         text;

-- 3. Add level column to subjects (stores IB HL/SL per user-subject)
ALTER TABLE subjects
  ADD COLUMN IF NOT EXISTS level text;

-- 4. Migrate existing profile rows: map old flat exam_board → new qualification + exam_board
--    Safe to run multiple times (only updates rows where qualification IS NULL)
UPDATE profiles SET
  qualification = CASE exam_board
    WHEN 'edexcel_alevel'   THEN 'A Level'
    WHEN 'cambridge_alevel' THEN 'A Level'
    WHEN 'edexcel_igcse'    THEN 'IGCSE / O Level'
    WHEN 'cambridge_igcse'  THEN 'IGCSE / O Level'
    WHEN 'o_level'          THEN 'IGCSE / O Level'
    WHEN 'mbbs'             THEN 'MBBS'
    ELSE NULL
  END,
  exam_board = CASE exam_board
    WHEN 'edexcel_alevel'   THEN 'Edexcel'
    WHEN 'cambridge_alevel' THEN 'Cambridge'
    WHEN 'edexcel_igcse'    THEN 'Edexcel IGCSE'
    WHEN 'cambridge_igcse'  THEN 'Cambridge IGCSE'
    WHEN 'o_level'          THEN 'Cambridge O Level'
    WHEN 'mbbs'             THEN 'BMDC Bangladesh'
    ELSE exam_board
  END
WHERE qualification IS NULL;

-- 5. Clear old syllabus_templates (were sparse/incomplete) — fresh data from migration_002
TRUNCATE syllabus_templates RESTART IDENTITY;
