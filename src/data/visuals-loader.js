// On-demand, board-scoped loader for the Topic Visualizer data.
//
// The visualisation content is 4.2 MB — the topic data plus six board SVG packs.
// It used to be in the entry bundle, so every student downloaded all of it before
// the sign-in form painted. It is now fetched on demand, and fetched narrowly:
// an IGCSE Biology student pulls the topic data and the Cambridge IGCSE pack, and
// never touches the 1.2 MB of MBBS anatomy or the IB and A Level packs.
//
// Measured on production before this change: opening one IGCSE Biology subject
// fetched all seven chunks. That is what this fixes.
//
// Every call site already knows the subject's TOPIC_VISUALS key, so the pack can
// always be derived. Packs are cached individually, so switching between two
// subjects on the same board costs nothing and switching boards costs one pack.
//
// This is only safe because no topic references an SVG from another board's pack
// — verified across all 687 topics. If you ever point a topic at a foreign
// svgKey, copy the SVG into that board's pack instead, or the diagram will come
// up blank for exactly the students who need it.
//
// Two entry points, as before:
//   loadVisuals(tvKey)  awaits the data — for click handlers.
//   peekVisuals(tvKey)  returns it only if already loaded — for synchronous
//                       render paths, paired with loadVisuals() and a re-render.

const PACK_LOADERS = {
  'igcse-cambridge':  () => import('./topic-svgs-igcse-cambridge.js'),
  'igcse-edexcel':    () => import('./topic-svgs-igcse-edexcel.js'),
  'alevel-cambridge': () => import('./topic-svgs-alevel-cambridge.js'),
  'alevel-edexcel':   () => import('./topic-svgs-alevel-edexcel.js'),
  'ib':               () => import('./topic-svgs-ib.js'),
  'mbbs':             () => import('./topic-svgs-mbbs.js'),
};

// Longest prefixes first: 'cambridge_igcse' must win over a bare 'cambridge'.
const PACK_FOR_PREFIX = [
  ['cambridge_igcse',  'igcse-cambridge'],
  ['edexcel_igcse',    'igcse-edexcel'],
  ['cambridge_alevel', 'alevel-cambridge'],
  ['edexcel_alevel',   'alevel-edexcel'],
  ['ib_',              'ib'],
  ['mbbs_',            'mbbs'],
];

export function packForKey(tvKey) {
  if (!tvKey) return null;
  const hit = PACK_FOR_PREFIX.find(([prefix]) => tvKey.startsWith(prefix));
  return hit ? hit[1] : null;
}

let topicVisuals = null;                 // TOPIC_VISUALS — one copy, shared by all boards
const packs = new Map();                 // pack name -> merged SVG object
const inflight = new Map();              // pack name -> in-progress promise

export function peekVisuals(tvKey) {
  const pack = packForKey(tvKey);
  if (!topicVisuals || !pack || !packs.has(pack)) return null;
  return { TOPIC_VISUALS: topicVisuals, TOPIC_SVGS: packs.get(pack) };
}

export function loadVisuals(tvKey) {
  const pack = packForKey(tvKey);
  if (!pack) return Promise.reject(new Error('No visuals pack for key: ' + tvKey));

  const ready = peekVisuals(tvKey);
  if (ready) return Promise.resolve(ready);
  if (inflight.has(pack)) return inflight.get(pack);

  const job = Promise.all([
    topicVisuals ? Promise.resolve(null) : import('./topic-visuals.js'),
    PACK_LOADERS[pack](),
  ]).then(([tvMod, packMod]) => {
    if (tvMod) topicVisuals = tvMod.TOPIC_VISUALS;
    // Each pack module has a single named export whose name differs per file.
    packs.set(pack, packMod[Object.keys(packMod)[0]]);
    inflight.delete(pack);
    return { TOPIC_VISUALS: topicVisuals, TOPIC_SVGS: packs.get(pack) };
  }).catch((err) => {
    // Do not cache the failure — a student who loses signal mid-load should get
    // the Visualizer on their next click.
    inflight.delete(pack);
    throw err;
  });

  inflight.set(pack, job);
  return job;
}
