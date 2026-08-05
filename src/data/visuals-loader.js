// On-demand, board-scoped loader for the Topic Visualizer.
//
// The visualisation content is ~4.2 MB in total. It used to sit in the entry
// bundle, so every student downloaded all of it before the sign-in form painted.
// It is now fetched on demand and fetched narrowly: a Cambridge IGCSE student
// pulls that board's topic text and that board's diagrams, and never touches the
// MBBS anatomy, IB, or A Level content at all.
//
// Both halves are split per board:
//   topic-visuals-<board>.js   the topic text, landmarks and exam questions
//   topic-svgs-<board>.js      the diagrams
//
// Every call site already knows the subject's TOPIC_VISUALS key, so the board is
// always derivable. Each board is cached independently, so switching subjects
// within a board costs nothing and switching boards costs one pair of chunks.
//
// This is only safe because no topic references an SVG from another board's pack
// — verified across all 685 topics. If you point a topic at a foreign svgKey the
// diagram will come up blank for exactly the students who need it; copy the SVG
// into that board's pack instead.
//
// Two entry points:
//   loadVisuals(tvKey)  awaits the data — for click handlers.
//   peekVisuals(tvKey)  returns it only if already loaded — for synchronous
//                       render paths, paired with loadVisuals() and a re-render.

const LOADERS = {
  'igcse-cambridge': {
    data: () => import('./topic-visuals-igcse-cambridge.js'),
    svgs: () => import('./topic-svgs-igcse-cambridge.js'),
  },
  'igcse-edexcel': {
    data: () => import('./topic-visuals-igcse-edexcel.js'),
    svgs: () => import('./topic-svgs-igcse-edexcel.js'),
  },
  'alevel-cambridge': {
    data: () => import('./topic-visuals-alevel-cambridge.js'),
    svgs: () => import('./topic-svgs-alevel-cambridge.js'),
  },
  'alevel-edexcel': {
    data: () => import('./topic-visuals-alevel-edexcel.js'),
    svgs: () => import('./topic-svgs-alevel-edexcel.js'),
  },
  'ib': {
    data: () => import('./topic-visuals-ib.js'),
    svgs: () => import('./topic-svgs-ib.js'),
  },
  'mbbs': {
    data: () => import('./topic-visuals-mbbs.js'),
    svgs: () => import('./topic-svgs-mbbs.js'),
  },
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

const boards = new Map();    // board -> { TOPIC_VISUALS, TOPIC_SVGS }
const inflight = new Map();  // board -> in-progress promise

export function peekVisuals(tvKey) {
  const board = packForKey(tvKey);
  return board ? (boards.get(board) || null) : null;
}

export function loadVisuals(tvKey) {
  const board = packForKey(tvKey);
  if (!board) return Promise.reject(new Error('No visuals board for key: ' + tvKey));

  const ready = boards.get(board);
  if (ready) return Promise.resolve(ready);
  if (inflight.has(board)) return inflight.get(board);

  const { data, svgs } = LOADERS[board];
  const job = Promise.all([data(), svgs()]).then(([dataMod, svgMod]) => {
    // Each generated module has exactly one named export, whose name differs
    // per file — take it positionally rather than hardcoding six names twice.
    const bundle = {
      TOPIC_VISUALS: dataMod[Object.keys(dataMod)[0]],
      TOPIC_SVGS: svgMod[Object.keys(svgMod)[0]],
    };
    boards.set(board, bundle);
    inflight.delete(board);
    return bundle;
  }).catch((err) => {
    // Do not cache the failure — a student who loses signal mid-load should get
    // the Visualizer on their next click.
    inflight.delete(board);
    throw err;
  });

  inflight.set(board, job);
  return job;
}
