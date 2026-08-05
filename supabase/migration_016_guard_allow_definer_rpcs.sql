-- migration_016_guard_allow_definer_rpcs
--
-- THIS IS THE AUTHORITATIVE VERSION OF THE GUARD. 011 and 012 are superseded.
--
-- 011/012 keyed the guard off request.jwt.claims. That was wrong in a way that
-- returned success while doing nothing: a SECURITY DEFINER function changes the
-- effective user but NOT the JWT claims GUC, so use_streak_freeze() — which
-- legitimately writes profiles.streak_freezes on behalf of the signed-in user —
-- had its write silently reverted by the guard. The RPC returned 200, the freeze
-- was never consumed, and nothing anywhere reported an error. Verified before
-- and after: available stayed at 2 under 011, drops to 1 under this version.
--
-- current_user is the correct discriminator, but only if this function is
-- SECURITY INVOKER: a DEFINER trigger reports its own owner no matter who
-- called it. As INVOKER it sees:
--
--   direct PATCH /rest/v1/profiles by a signed-in user  -> 'authenticated'
--   the same by a logged-out client                     -> 'anon'
--   inside any SECURITY DEFINER RPC owned by postgres   -> 'postgres'
--   an API route using the service-role key             -> 'service_role'
--   migrations and cron over a direct connection        -> 'postgres'
--
-- so the trusted paths pass and only the two roles PostgREST ever hands to a
-- browser are restrained. Those two are named explicitly rather than allow-
-- listing the trusted ones, because any role that is not anon/authenticated is
-- server-side by definition and a future internal role must not be locked out.
--
-- The trigger still fires despite migration_015 revoking EXECUTE: Postgres does
-- not check EXECUTE on a trigger function when the trigger fires.

create or replace function public.profiles_guard_privileged_columns()
returns trigger
language plpgsql
security invoker
set search_path to 'public'
as $$
begin
  if current_user not in ('anon', 'authenticated') then
    return new;
  end if;

  new.wallet_credit_taka := old.wallet_credit_taka;
  new.streak_freezes     := old.streak_freezes;
  new.league_tier        := old.league_tier;
  new.league_week        := old.league_week;
  return new;
end;
$$;
