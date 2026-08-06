#!/usr/bin/env node
// Guards against the bug that deleted 61 of a student's topics on 2026-08-07.
//
// PostgREST unions the keys across an inserted array and sends NULL for every
// key a row omits — it does NOT fall back to the column default. The syllabus
// refresh built rows carrying progress fields only for topics the student had
// worked, so the rest arrived with recall_reps = NULL, hit its NOT NULL
// constraint, and failed the whole insert. The delete had already run.
//
// Two halves, because either alone would let it back in:
//
//   1. assertUniformKeys actually rejects a mixed batch. A guard nobody has
//      tested is not a guard.
//   2. No source file batches an insert without going through the helper. The
//      guard is worthless if the next call site skips it.
//
//   node scripts/test_insert_uniformity.mjs

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { assertUniformKeys, insertRows, INSERT_BATCH } from '../src/lib/insert-rows.js';

let failed = 0;
const ok   = (m) => console.log(`  ok    ${m}`);
const fail = (m) => { console.log(`  FAIL  ${m}`); failed++; };

function throws(fn, mustMention) {
  try { fn(); return { threw: false }; }
  catch (e) { return { threw: true, msg: String(e.message), mentions: String(e.message).includes(mustMention) }; }
}

console.log('\nassertUniformKeys');

// The exact shape that broke production: progress fields on some rows only.
const mixed = [
  { user_id: 'u', subject_id: 's', name: 'A', status: 'notstarted', position: 0 },
  { user_id: 'u', subject_id: 's', name: 'B', status: 'ready', position: 1, recall_reps: 2 },
];
{
  const r = throws(() => assertUniformKeys(mixed, 'topics'), 'recall_reps');
  if (!r.threw) fail('mixed batch must throw');
  else if (!r.mentions) fail(`error should name the offending key, got: ${r.msg}`);
  else ok('rejects the real-world mixed batch and names recall_reps');
}

// Reversed: the extra key on row 0 instead, so the check cannot just compare lengths one way.
{
  const r = throws(() => assertUniformKeys([mixed[1], mixed[0]], 'topics'), 'recall_reps');
  if (!r.threw) fail('mixed batch must throw regardless of row order');
  else ok('rejects it with the rows reversed');
}

// Same count of keys, different names — a length check alone would pass this.
{
  const r = throws(() => assertUniformKeys(
    [{ a: 1, b: 2 }, { a: 1, c: 3 }], 'x'), 'b');
  if (!r.threw) fail('same-length but differently-named keys must throw');
  else ok('rejects same-length key sets that differ by name');
}

// Legitimate batches must pass, or the guard just blocks real work.
for (const [label, rows] of [
  ['uniform rows', [{ a: 1, b: null }, { a: 2, b: 3 }]],
  ['key order differs', [{ a: 1, b: 2 }, { b: 4, a: 3 }]],
  ['single row', [{ a: 1 }]],
  ['empty array', []],
]) {
  try { assertUniformKeys(rows, label); ok(`accepts ${label}`); }
  catch (e) { fail(`${label} should pass: ${e.message}`); }
}

console.log('\ninsertRows');

// Batching, and that the guard runs BEFORE anything reaches the database —
// the original failure was destructive precisely because it got that far.
{
  const seen = [];
  const client = { from: () => ({ insert: async (rows) => { seen.push(rows.length); return { error: null }; } }) };

  const n = await insertRows(client, 'topics',
    Array.from({ length: INSERT_BATCH * 2 + 7 }, (_, i) => ({ a: i, b: null })), 'batching');
  if (n !== INSERT_BATCH * 2 + 7) fail(`returned ${n}`);
  else if (seen.length !== 3 || seen[0] !== INSERT_BATCH || seen[2] !== 7) fail(`batches were ${seen}`);
  else ok(`splits ${INSERT_BATCH * 2 + 7} rows into ${seen.join(' + ')}`);

  let reached = false;
  const spy = { from: () => ({ insert: async () => { reached = true; return { error: null }; } }) };
  try { await insertRows(spy, 'topics', mixed, 'topics'); fail('mixed batch must not insert'); }
  catch { reached ? fail('guard ran too late — rows reached the client') : ok('rejects before touching the client'); }
}

console.log('\nno source file bypasses the helper');
{
  const files = [];
  (function walk(dir) {
    for (const e of readdirSync(dir)) {
      const p = join(dir, e);
      if (statSync(p).isDirectory()) walk(p);
      else if (p.endsWith('.js')) files.push(p);
    }
  })('src');

  // A batch insert is one whose argument is a slice or a plainly plural
  // variable. Single-object inserts (.insert({ ... })) are unaffected: one row
  // cannot disagree with itself.
  const offenders = [];
  for (const f of files) {
    if (f.endsWith('lib/insert-rows.js')) continue;   // the helper itself
    const src = readFileSync(f, 'utf8');
    for (const m of src.matchAll(/\.(insert|upsert)\(\s*([A-Za-z_$][\w$]*)(\.slice\()?/g)) {
      const [, verb, arg, sliced] = m;
      if (!sliced && !/rows$|Rows$/.test(arg)) continue;   // not a batch
      offenders.push(`${f}:${src.slice(0, m.index).split('\n').length} — ${verb}(${arg}${sliced ? '.slice(...)' : ''})`);
    }
  }
  if (offenders.length) {
    fail('these batch writes bypass insertRows/assertUniformKeys:');
    offenders.forEach(o => console.log(`          ${o}`));
  } else {
    ok(`all batch writes across ${files.length} source files go through the helper`);
  }
}

console.log(failed ? `\n${failed} check(s) failed\n` : '\nall checks passed\n');
process.exit(failed ? 1 : 0);
