-- search_profiles let any signed-in user probe which email addresses are registered.
--
-- The function never returned the email, so nothing leaked directly. The problem
-- was the predicate:
--
--     p.email ILIKE '%' || q || '%'
--
-- A substring match on email turns friend-search into an enumeration oracle. A
-- student could search "@gmail.com" and get 20 real classmates back, or type a
-- specific address and learn from a single row whether that person has an
-- account here. For a product whose users are mostly minors, "is this person
-- registered" is not a fact we should hand out.
--
-- Finding a friend by email is still a legitimate feature, so the fix keeps it
-- and only removes the fishing: email now has to match in full. You can look up
-- someone whose address you already know; you cannot discover addresses you
-- don't.
--
-- Also added:
--   * an explicit auth.uid() null check. The old body relied on `p.id != auth.uid()`
--     evaluating to NULL and filtering everything out for an anonymous caller —
--     correct by accident, and it would silently invert if that line ever moved.
--   * a minimum query length. `q = 'a'` matched almost every display_name and
--     returned an arbitrary 20 users; two characters makes that much less of a
--     directory dump.
--
-- Unchanged: the privacy_settings->>'discoverable' opt-out, the self-exclusion,
-- the LIMIT, and the returned columns.

create or replace function public.search_profiles(q text)
returns table(id uuid, display_name text, qualification text, exam_board text)
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
begin
  if auth.uid() is null then
    raise exception 'Not authorized';
  end if;

  -- Too short to be a real search; refuse rather than return a slice of the
  -- whole user table.
  if q is null or length(btrim(q)) < 2 then
    return;
  end if;

  return query
  select
    p.id,
    p.display_name,
    p.qualification,
    p.exam_board
  from profiles p
  where (
          p.display_name ilike '%' || btrim(q) || '%'
          -- Full address only: enough to find someone you already know,
          -- useless for discovering who is registered.
          or lower(p.email) = lower(btrim(q))
        )
    and p.id <> auth.uid()
    and coalesce((p.privacy_settings->>'discoverable')::boolean, true) = true
  limit 20;
end;
$function$;
