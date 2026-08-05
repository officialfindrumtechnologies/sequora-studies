// Every board's Topic Visualizer content, merged.
//
// The content itself now lives in six per-board files (topic-visuals-ib.js,
// topic-visuals-mbbs.js, and so on) so the browser can fetch one board instead
// of all of them — see visuals-loader.js, which imports those files directly and
// never imports this one.
//
// This aggregate exists for the callers that genuinely need every board at once
// and do not care about download size:
//
//   api/admin.js                       batch question generation, iterates all
//   scripts/audit_visual_coverage.mjs  cross-references content against the DB
//
// Importing this from client code would undo the split and pull all 1.9 MB back
// into the bundle. If you need visuals in the app, use visuals-loader.js.
//
// getTopicVisualsKey lives in topic-visuals-key.js — pure string matching with
// no dependency on this data, so it stays cheap to import on its own.

import { TV_IGCSE_CAMBRIDGE }  from './topic-visuals-igcse-cambridge.js';
import { TV_IGCSE_EDEXCEL }    from './topic-visuals-igcse-edexcel.js';
import { TV_ALEVEL_CAMBRIDGE } from './topic-visuals-alevel-cambridge.js';
import { TV_ALEVEL_EDEXCEL }   from './topic-visuals-alevel-edexcel.js';
import { TV_IB }               from './topic-visuals-ib.js';
import { TV_MBBS }             from './topic-visuals-mbbs.js';

export const TOPIC_VISUALS = {
  ...TV_IGCSE_CAMBRIDGE,
  ...TV_IGCSE_EDEXCEL,
  ...TV_ALEVEL_CAMBRIDGE,
  ...TV_ALEVEL_EDEXCEL,
  ...TV_IB,
  ...TV_MBBS,
};
