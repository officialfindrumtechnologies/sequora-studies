// Batched insert with a key-uniformity guard.
//
// PostgREST unions the keys across an inserted array and sends NULL for every
// key a row happens to omit. It does NOT fall back to the column default. So a
// batch where some rows carry `recall_reps` and others do not sends NULL for the
// ones that do not, which a NOT NULL column rejects — failing the whole insert.
//
// That is not theoretical. On 2026-08-07 the syllabus refresh built rows that
// carried progress fields only for topics the student had worked. The insert
// failed on `recall_reps`, and because the delete necessarily runs first, a
// subject lost all 61 of its topics.
//
// The rule is easy to hold and easy to forget: every row in one insert must have
// the same key set. This wraps it in a check that fails loudly, at the call
// site, naming the offending keys — instead of surfacing as a NOT NULL violation
// from the database with no clue which field or row caused it.
//
// It also owns the 500-row batching that every call site was repeating.

export const INSERT_BATCH = 500;

/**
 * Throws if `rows` do not all share one key set.
 * Exported separately so it can be tested, and used without a live Supabase.
 */
export function assertUniformKeys(rows, label = 'rows') {
  if (!Array.isArray(rows)) throw new TypeError(`${label}: expected an array`);
  if (rows.length < 2) return;

  const keysOf = (r) => Object.keys(r).sort();
  const first = keysOf(rows[0]);
  const firstSet = new Set(first);

  for (let i = 1; i < rows.length; i++) {
    const keys = keysOf(rows[i]);
    if (keys.length === first.length && keys.every((k, j) => k === first[j])) continue;

    const set = new Set(keys);
    const missing = first.filter(k => !set.has(k));
    const extra = keys.filter(k => !firstSet.has(k));
    throw new Error(
      `${label}: row ${i} has a different key set from row 0 — `
      + `PostgREST would send NULL for the missing ones instead of the column default. `
      + (missing.length ? `missing: ${missing.join(', ')}. ` : '')
      + (extra.length ? `extra: ${extra.join(', ')}. ` : '')
      + `Give every row the same keys, using null for absent values.`
    );
  }
}

/**
 * Insert `rows` into `table` in batches, after checking key uniformity.
 * `client` is the Supabase client; passing it in keeps this testable.
 */
export async function insertRows(client, table, rows, label = table) {
  assertUniformKeys(rows, label);
  if (!rows.length) return 0;

  for (let i = 0; i < rows.length; i += INSERT_BATCH) {
    const { error } = await client.from(table).insert(rows.slice(i, i + INSERT_BATCH));
    if (error) throw error;
  }
  return rows.length;
}

/**
 * Same guard and batching for upsert, which needs its onConflict option passed
 * through. Upsert has the identical hazard: the key union decides what each row
 * writes, so a row missing a key overwrites that column with NULL.
 */
export async function upsertRows(client, table, rows, options, label = table) {
  assertUniformKeys(rows, label);
  if (!rows.length) return 0;

  for (let i = 0; i < rows.length; i += INSERT_BATCH) {
    const { error } = await client.from(table).upsert(rows.slice(i, i + INSERT_BATCH), options);
    if (error) throw error;
  }
  return rows.length;
}
