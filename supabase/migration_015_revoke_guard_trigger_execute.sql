-- migration_015_revoke_guard_trigger_execute
--
-- profiles_guard_privileged_columns() is a trigger function. PostgREST still
-- exposes it at /rest/v1/rpc/, where Postgres rejects the call ("trigger
-- functions can only be called as triggers") — but an internal function has no
-- business being in the public API surface at all, and the advisor flags it.
-- Same treatment the other internal functions got in
-- revoke_public_execute_internal_fns.

revoke execute on function public.profiles_guard_privileged_columns() from public, anon, authenticated;
