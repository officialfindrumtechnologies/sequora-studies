-- Add onboarding tracking column to profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS onboarded_at timestamptz DEFAULT NULL;

-- Mark existing users who already have subjects as onboarded
-- so they never see the wizard
UPDATE profiles p
SET onboarded_at = now()
WHERE onboarded_at IS NULL
  AND EXISTS (
    SELECT 1 FROM subjects s WHERE s.user_id = p.id
  );
