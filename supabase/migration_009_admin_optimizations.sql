-- ============================================================
-- MIGRATION 009: Admin API Performance Optimizations
-- Run in Supabase SQL editor to optimize data grouping/aggregations
-- ============================================================

-- 1. Helper function to compute total study hours across all sessions
CREATE OR REPLACE FUNCTION get_total_study_seconds()
RETURNS bigint AS $$
  SELECT COALESCE(SUM(duration_sec), 0)::bigint FROM sessions;
$$ LANGUAGE sql SECURITY DEFINER;

-- 2. View to compute per-user study session aggregations
CREATE OR REPLACE VIEW user_study_aggregates AS
SELECT 
  p.id AS user_id,
  COALESCE(SUM(s.duration_sec), 0)::bigint AS total_study_seconds,
  MAX(s.study_date) AS last_active_date,
  (SELECT COUNT(*)::int FROM subjects sub WHERE sub.user_id = p.id) AS subjects_count,
  (SELECT COUNT(*)::int FROM topics top WHERE top.user_id = p.id) AS topics_count
FROM profiles p
LEFT JOIN sessions s ON s.user_id = p.id
GROUP BY p.id;

-- 3. View to compute topic counts per subject (popularity by topics)
CREATE OR REPLACE VIEW subject_topic_counts AS
SELECT 
  s.name AS subject_name,
  COUNT(t.id)::int AS topics_count
FROM subjects s
JOIN topics t ON t.subject_id = s.id
GROUP BY s.name;

-- 4. View to compute user counts per subject (popularity by users)
CREATE OR REPLACE VIEW subject_popularity_by_users AS
SELECT 
  name AS subject_name,
  COUNT(DISTINCT user_id)::int AS user_count
FROM subjects
GROUP BY name;

-- 5. View to compute topic popularity across all users
CREATE OR REPLACE VIEW topic_popularity AS
SELECT 
  name AS topic_name,
  COUNT(*)::int AS topic_count
FROM topics
WHERE name IS NOT NULL AND name <> ''
GROUP BY name;

-- 6. View to compute qualification distributions
CREATE OR REPLACE VIEW qualification_distribution AS
SELECT 
  COALESCE(qualification, 'unknown') AS qualification,
  COUNT(*)::int AS count
FROM profiles
GROUP BY COALESCE(qualification, 'unknown');
