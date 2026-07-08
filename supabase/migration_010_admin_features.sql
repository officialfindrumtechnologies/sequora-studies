-- Migration 010: Admin Console Features Schema additions

-- 1. Create administration roles table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text NOT NULL CHECK (role IN ('super_admin', 'editor', 'support')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Select policy: Allow logged-in administrators to view other administrators
CREATE POLICY "Admins can view admins" ON admin_users
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Seed default super admins dynamically from auth.users table
INSERT INTO admin_users (id, email, role)
SELECT id, email, 'super_admin'
FROM auth.users
WHERE email IN ('nakibmdeusuf10@gmail.com', 'officialfindrumtechnologies@gmail.com')
ON CONFLICT (id) DO UPDATE SET role = 'super_admin';

-- 2. Create simulated bKash transaction ledger logs table
CREATE TABLE IF NOT EXISTS bkash_trx_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trx_id text NOT NULL UNIQUE,
  amount numeric NOT NULL,
  sender_number text NOT NULL,
  received_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE bkash_trx_logs ENABLE ROW LEVEL SECURITY;

-- Select policy: Allow logged-in administrators to view ledger logs
CREATE POLICY "Admins can view ledger logs" ON bkash_trx_logs
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Insert some default mock bKash transaction logs for testing
INSERT INTO bkash_trx_logs (trx_id, amount, sender_number, received_at)
VALUES 
  ('BKASH991A3', 299, '01712345678', now() - interval '2 hours'),
  ('BKASH882B4', 1399, '01887654321', now() - interval '1 hour'),
  ('BKASH773C5', 149, '01911223344', now() - interval '30 minutes')
ON CONFLICT (trx_id) DO NOTHING;

-- 3. Add activity tracking column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_active_at timestamptz DEFAULT now();
