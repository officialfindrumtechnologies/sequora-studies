-- migration_012_profiles_guard_hardening
--
-- The first version of profiles_guard_privileged_columns() cast
-- request.jwt.claims straight to jsonb. current_setting returns an empty string
-- (not NULL) for a GUC that was set and then cleared, and ''::jsonb raises —
-- which would turn every profile UPDATE into a 500.
--
-- Treat empty or malformed claims as "not service_role": fail closed, never
-- fail loud. migration_011 in this repo already carries the corrected body, so
-- applying 011 alone is sufficient for a fresh database; this file exists to
-- match the migration history of the deployed project.

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
  if v_claims is null then
    return new;
  end if;

  begin
    v_role := v_claims::jsonb ->> 'role';
  exception when others then
    v_role := null;
  end;

  if v_role = 'service_role' then
    return new;
  end if;

  new.wallet_credit_taka := old.wallet_credit_taka;
  new.streak_freezes     := old.streak_freezes;
  new.league_tier        := old.league_tier;
  new.league_week        := old.league_week;
  return new;
end;
$$;
