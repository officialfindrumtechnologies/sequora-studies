-- use_streak_freeze rebuilt the streak_freezes object from scratch:
--
--   v := jsonb_build_object('available', v_avail - 1, 'used', v_used || ...);
--
-- which silently dropped 'granted_week'. That key is the idempotency marker
-- grant_streak_freezes keys on:
--
--   where coalesce(p.streak_freezes->>'granted_week','') <> v_week::text
--
-- So a student spending a freeze erased their own "already granted this week"
-- marker, and any re-run of the weekly job for that same week granted them
-- another freeze (bounded only by the cap of 3). grant_streak_freezes documents
-- that it is deliberately idempotent on its own marker "so the two weekly jobs
-- cannot interfere if either is retried or reordered" — this defeated exactly
-- that protection, and it was reachable by any student through normal use.
--
-- Found during the pre-launch verification by calling the RPC from a real
-- signed-in browser and diffing the stored JSON before and after: granted_week
-- was present before the call and gone after it.
--
-- Fixed by merging onto the existing object rather than replacing it, so any
-- key this function does not own survives untouched.

create or replace function public.use_streak_freeze(p_day date)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v jsonb; v_avail int; v_used jsonb;
begin
  if auth.uid() is null then raise exception 'Not authorized'; end if;
  if p_day > current_date or p_day < current_date - 7 then
    raise exception 'Can only freeze a day within the last week';
  end if;
  select streak_freezes into v from profiles where id = auth.uid() for update;
  v_avail := coalesce((v->>'available')::int, 0);
  v_used  := coalesce(v->'used', '[]'::jsonb);
  if v_used ? p_day::text then return v; end if;           -- already covered
  if v_avail <= 0 then raise exception 'No streak freezes left'; end if;

  -- Merge, do not rebuild: preserves granted_week and anything added later.
  v := coalesce(v, '{}'::jsonb) || jsonb_build_object(
         'available', v_avail - 1,
         'used',      v_used || to_jsonb(p_day::text)
       );
  update profiles set streak_freezes = v where id = auth.uid();
  return v;
end; $function$;

-- Verified after: calling the RPC returns
--   {"used": ["2026-08-02"], "available": 1, "granted_week": "2026-07-27"}
-- and the write persists through the profiles privilege guard, while a direct
-- client PATCH of streak_freezes/wallet_credit_taka/league_tier is still
-- reverted. Both halves must keep passing — see migration_016.
