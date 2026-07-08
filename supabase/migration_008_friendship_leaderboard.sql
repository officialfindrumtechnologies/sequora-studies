-- ============================================================
-- MIGRATION 008: Friendship and Leaderboard System schema
-- Run in Supabase SQL editor or migration pipeline
-- ============================================================

-- 1. Create friendships table
CREATE TABLE IF NOT EXISTS friendships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  addressee_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT unique_friendship UNIQUE (requester_id, addressee_id),
  CONSTRAINT friendship_status_check CHECK (status IN ('pending', 'accepted', 'blocked'))
);

-- Enable RLS on friendships
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;

-- 2. Define RLS Policies for friendships
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own friendships') THEN
    CREATE POLICY "Users can view their own friendships" ON friendships
      FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = addressee_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert friendship requests') THEN
    CREATE POLICY "Users can insert friendship requests" ON friendships
      FOR INSERT WITH CHECK (auth.uid() = requester_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update their received friendship requests') THEN
    CREATE POLICY "Users can update their received friendship requests" ON friendships
      FOR UPDATE USING (auth.uid() = addressee_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can delete their own friendships') THEN
    CREATE POLICY "Users can delete their own friendships" ON friendships
      FOR DELETE USING (auth.uid() = requester_id OR auth.uid() = addressee_id);
  END IF;
END $$;

-- 3. Define helper function for computing streak
DROP FUNCTION IF EXISTS compute_user_streak(uuid);
CREATE OR REPLACE FUNCTION compute_user_streak(p_uid uuid)
RETURNS integer AS $$
DECLARE
  v_streak integer := 0;
  v_date date;
  v_expected date;
  r record;
BEGIN
  -- Find the latest study session date for the user
  SELECT MAX(study_date::date) INTO v_date 
  FROM sessions 
  WHERE user_id = p_uid;
  
  -- If there are no sessions or the last study session was not today and not yesterday, streak is 0
  IF v_date IS NULL OR (v_date != CURRENT_DATE AND v_date != CURRENT_DATE - 1) THEN
    RETURN 0;
  END IF;
  
  v_streak := 0;
  v_expected := v_date;
  
  -- Count consecutive study days going backward
  FOR r IN 
    SELECT DISTINCT study_date::date as sdate 
    FROM sessions 
    WHERE user_id = p_uid AND study_date::date <= v_date
    ORDER BY sdate DESC
  LOOP
    IF r.sdate = v_expected THEN
      v_streak := v_streak + 1;
      v_expected := v_expected - 1;
    ELSE
      EXIT;
    END IF;
  END LOOP;
  
  RETURN v_streak;
END;
$$ LANGUAGE plpgsql STABLE;

-- 4. Define search profiles RPC function
DROP FUNCTION IF EXISTS search_profiles(text);
CREATE OR REPLACE FUNCTION search_profiles(q text)
RETURNS TABLE (
  id uuid,
  display_name text,
  qualification text,
  exam_board text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id, 
    p.display_name, 
    p.qualification, 
    p.exam_board
  FROM profiles p
  WHERE (p.display_name ILIKE '%' || q || '%' OR p.email ILIKE '%' || q || '%')
    AND p.id != auth.uid()
    AND COALESCE((p.privacy_settings->>'discoverable')::boolean, true) = true
  LIMIT 20;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- 5. Define get pending requests RPC function
DROP FUNCTION IF EXISTS get_pending_requests();
CREATE OR REPLACE FUNCTION get_pending_requests()
RETURNS TABLE (
  id uuid,
  display_name text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id,
    p.display_name
  FROM friendships f
  JOIN profiles p ON f.requester_id = p.id
  WHERE f.addressee_id = auth.uid() AND f.status = 'pending';
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- 6. Define get friends leaderboard RPC function
DROP FUNCTION IF EXISTS get_friends_leaderboard(uuid);
CREATE OR REPLACE FUNCTION get_friends_leaderboard(p_user_id uuid)
RETURNS TABLE (
  uid uuid,
  display_name text,
  privacy_settings json,
  weekly_hours numeric,
  current_streak integer,
  subjects_count integer,
  qualification text,
  exam_board text
) AS $$
BEGIN
  RETURN QUERY
  WITH friend_ids AS (
    SELECT requester_id AS friend_id FROM friendships WHERE addressee_id = p_user_id AND status = 'accepted'
    UNION
    SELECT addressee_id AS friend_id FROM friendships WHERE requester_id = p_user_id AND status = 'accepted'
    UNION
    SELECT p_user_id AS friend_id
  )
  SELECT 
    p.id AS uid,
    p.display_name,
    p.privacy_settings::json,
    COALESCE(ROUND((SELECT SUM(s.duration_sec)::numeric FROM sessions s WHERE s.user_id = p.id AND s.study_date::date >= CURRENT_DATE - 7) / 3600, 1), 0.0) AS weekly_hours,
    compute_user_streak(p.id) AS current_streak,
    (SELECT COUNT(*)::integer FROM subjects sub WHERE sub.user_id = p.id) AS subjects_count,
    p.qualification,
    p.exam_board
  FROM profiles p
  WHERE p.id IN (SELECT friend_id FROM friend_ids);
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- 7. Add policy on sessions table to allow friends to query each other's study hours for the leaderboard
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow reading friends sessions for activity tracking') THEN
    CREATE POLICY "Allow reading friends sessions for activity tracking" ON sessions
      FOR SELECT USING (
        user_id = auth.uid() OR
        user_id IN (
          SELECT requester_id FROM friendships WHERE addressee_id = auth.uid() AND status = 'accepted'
          UNION
          SELECT addressee_id FROM friendships WHERE requester_id = auth.uid() AND status = 'accepted'
        )
      );
  END IF;
END $$;
