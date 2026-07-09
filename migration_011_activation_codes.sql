-- Activation codes: admin generates a single-use code for a tier + duration,
-- sends it to the student manually (WhatsApp/SMS) after receiving payment,
-- student redeems it in-app to self-activate instantly.
create table if not exists activation_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  tier text not null check (tier in ('paid_1','paid_2','paid_3')),
  duration_days int not null,
  note text,
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  redeemed_by uuid references auth.users(id),
  redeemed_at timestamptz
);

alter table activation_codes enable row level security;
-- No policies: only the service role (used by api/admin.js and api/redeem-code.js) can touch this table.

create index if not exists idx_activation_codes_code on activation_codes(code);
