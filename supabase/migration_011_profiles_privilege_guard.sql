-- migration_011_profiles_privilege_guard
--
-- Users may edit their own profile, but three columns on that row are trusted
-- by server-side logic and must never be writable by the account they belong to:
--
--   wallet_credit_taka  read by apply_wallet_credit_to_payment(), which deducts
--                       the balance from a real charge in api/payment.js. A user
--                       who can set this can buy a subscription for free.
--   streak_freezes      read by use_streak_freeze().
--   league_tier         read by get_league_board() to decide which league to show.
--
-- The RPCs are already service_role-only, but that is not the hole: the RLS
-- policy on profiles is ALL USING (auth.uid() = id) with no column restriction,
-- and PostgREST exposes PATCH /rest/v1/profiles. One fetch from the browser
-- console sets any balance.
--
-- migration 20260723001440 (revoke_wallet_credit_column_write) already tried the
-- column-REVOKE approach; a later blanket GRANT on profiles silently undid it,
-- which is why this is a trigger. A trigger also avoids the confusing PostgREST
-- 403 that a revoked column produces when a client round-trips a whole row it
-- never meant to modify. The old value is restored silently instead: honest
-- clients are unaffected, dishonest ones achieve nothing.
--
-- SUPERSEDED: the function body below is kept only as the historical record of
-- what was applied. migration_016 replaces it entirely and is the authoritative
-- version — this one keyed off request.jwt.claims, which a SECURITY DEFINER
-- function does not change, so it silently reverted legitimate writes made by
-- use_streak_freeze() on the user's behalf. Read 016 before touching the guard.

create or replace function public.profiles_guard_privileged_columns()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_claims text := nullif(current_setting('request.jwt.claims', true), '');
  v_role   text;
begin
  -- No claims at all: a direct postgres connection (migrations, cron jobs).
  if v_claims is null then
    return new;
  end if;

  begin
    v_role := v_claims::jsonb ->> 'role';
  exception when others then
    v_role := null;          -- malformed claims are treated as untrusted
  end;

  if v_role = 'service_role' then
    return new;
  end if;

  -- Everyone else: these columns keep whatever the server last set.
  new.wallet_credit_taka := old.wallet_credit_taka;
  new.streak_freezes     := old.streak_freezes;
  new.league_tier        := old.league_tier;
  new.league_week        := old.league_week;
  return new;
end;
$$;

drop trigger if exists profiles_guard_privileged_columns on public.profiles;
create trigger profiles_guard_privileged_columns
  before update on public.profiles
  for each row
  execute function public.profiles_guard_privileged_columns();

-- anon holds table grants on profiles that RLS already makes useless
-- (auth.uid() is null for anon, so every policy predicate is false). Drop them
-- so the grant surface matches the intent.
revoke insert, update, delete on public.profiles from anon;
