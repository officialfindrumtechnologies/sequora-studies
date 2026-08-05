// On-demand loader for the Topic Visualizer data.
//
// These modules are 4.2 MB of the app's 4.9 MB bundle — the visualisation data
// and the six board SVG packs. Every student downloaded all of it on first load,
// including the 1.2 MB of MBBS anatomy diagrams, and including free-tier users
// who cannot open the Visualizer at all because openTopicVisualModal() gates on
// requiresPro(). On a Bangladeshi mobile connection that is the difference
// between the app starting and the student giving up.
//
// Nothing here changes what the Visualizer shows. The data arrives when it is
// first needed instead of before the sign-in form paints.
//
// Two entry points on purpose:
//   loadVisuals()  awaits the data — for click handlers, which can afford it.
//   peekVisuals()  returns it only if already loaded — for synchronous render
//                  paths, which cannot await. Callers pair it with loadVisuals()
//                  and re-render when it resolves.

let cache = null;
let inflight = null;

export function peekVisuals() {
  return cache;
}

export function loadVisuals() {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;

  inflight = Promise.all([
    import('./topic-visuals.js'),
    import('./topic-svgs-igcse-cambridge.js'),
    import('./topic-svgs-igcse-edexcel.js'),
    import('./topic-svgs-alevel-cambridge.js'),
    import('./topic-svgs-alevel-edexcel.js'),
    import('./topic-svgs-ib.js'),
    import('./topic-svgs-mbbs.js'),
  ]).then(([tv, camIg, edxIg, camAl, edxAl, ib, mbbs]) => {
    cache = {
      TOPIC_VISUALS: tv.TOPIC_VISUALS,
      // Merged exactly as the two call sites used to merge them, and in the same
      // order, so a key colliding across packs still resolves to what it did before.
      TOPIC_SVGS: {
        ...camIg.TOPIC_SVGS,
        ...edxIg.EDEXCEL_TOPIC_SVGS,
        ...camAl.TOPIC_SVGS_ALEVEL_CAMBRIDGE,
        ...edxAl.TOPIC_SVGS_ALEVEL_EDEXCEL,
        ...ib.TOPIC_SVGS_IB,
        ...mbbs.TOPIC_SVGS_MBBS,
      },
    };
    inflight = null;
    return cache;
  }).catch((err) => {
    // Allow a later attempt rather than caching the failure — a student who
    // loses signal mid-load should get the Visualizer on the next click.
    inflight = null;
    throw err;
  });

  return inflight;
}
