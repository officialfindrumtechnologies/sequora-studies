// Attachment plates — the "atlas-quality" upgrade over the old silhouettes.
// Each muscle is drawn as ORIGIN (red) → INSERTION (blue) on a shared, labelled
// upper-limb bone schematic, with the muscle belly as a band between them.
//
// Honesty note: this is a SCHEMATIC. Accuracy is at the *bone level* — which
// bone the origin/insertion is on, roughly where along it (proximal→distal),
// and which joints the muscle crosses. It is NOT cadaver-precise pixel
// placement. The exact wording of every origin/insertion still lives in the
// muscle's fact rows (from the dataset); this plate makes the spatial
// relationship clickable at a glance.

const W = 240, H = 460;

// Bone segments as [proximal xy] → [distal xy]; pt(bone, t) walks 0→1 along it.
const BONES = {
  clavicle: { a: [46, 60],  b: [116, 52] },
  humerus:  { a: [112, 86], b: [124, 232] },
  ulna:     { a: [134, 244], b: [148, 396] },  // medial forearm
  radius:   { a: [104, 244], b: [94, 396] },   // lateral forearm
};

// Fixed anchor points for regions that aren't simple long bones.
const ANCHORS = {
  scapula:  [176, 104],
  coracoid: [146, 92],
  hand:     [122, 420],
  thumb:    [86, 414],
};

function pt(ref) {
  if (ref.anchor) return ANCHORS[ref.anchor];
  const b = BONES[ref.bone];
  const t = ref.t ?? 0.5;
  return [b.a[0] + (b.b[0] - b.a[0]) * t, b.a[1] + (b.b[1] - b.a[1]) * t];
}

// origin (red) / insertion (blue) per muscle. Multiple origin points allowed
// (e.g. two-headed muscles) — the muscle band runs from the first origin.
const ATTACH = {
  // ── shoulder ──
  deltoid:        { o: [{ bone: 'clavicle', t: 0.85 }, { anchor: 'scapula' }], i: [{ bone: 'humerus', t: 0.5 }] },
  supraspinatus:  { o: [{ anchor: 'scapula' }], i: [{ bone: 'humerus', t: 0.04 }] },
  infraspinatus:  { o: [{ anchor: 'scapula' }], i: [{ bone: 'humerus', t: 0.07 }] },
  teres_minor:    { o: [{ anchor: 'scapula' }], i: [{ bone: 'humerus', t: 0.1 }] },
  teres_major:    { o: [{ anchor: 'scapula' }], i: [{ bone: 'humerus', t: 0.16 }] },
  subscapularis:  { o: [{ anchor: 'scapula' }], i: [{ bone: 'humerus', t: 0.05 }] },
  coracobrachialis:{ o: [{ anchor: 'coracoid' }], i: [{ bone: 'humerus', t: 0.5 }] },
  // ── arm ──
  biceps_brachii: { o: [{ anchor: 'scapula' }, { anchor: 'coracoid' }], i: [{ bone: 'radius', t: 0.16 }] },
  brachialis:     { o: [{ bone: 'humerus', t: 0.55 }], i: [{ bone: 'ulna', t: 0.08 }] },
  triceps_brachii:{ o: [{ anchor: 'scapula' }, { bone: 'humerus', t: 0.35 }], i: [{ bone: 'ulna', t: 0.02 }] },
  anconeus:       { o: [{ bone: 'humerus', t: 0.96 }], i: [{ bone: 'ulna', t: 0.08 }] },
  // ── forearm flexors (medial epicondyle → hand) ──
  pronator_teres:      { o: [{ bone: 'humerus', t: 0.96 }], i: [{ bone: 'radius', t: 0.5 }] },
  flexor_carpi_radialis:{ o: [{ bone: 'humerus', t: 0.96 }], i: [{ anchor: 'hand' }] },
  palmaris_longus:     { o: [{ bone: 'humerus', t: 0.96 }], i: [{ anchor: 'hand' }] },
  flexor_carpi_ulnaris:{ o: [{ bone: 'humerus', t: 0.96 }, { bone: 'ulna', t: 0.1 }], i: [{ anchor: 'hand' }] },
  flexor_digitorum_superficialis:{ o: [{ bone: 'humerus', t: 0.96 }, { bone: 'radius', t: 0.3 }], i: [{ anchor: 'hand' }] },
  flexor_digitorum_profundus:{ o: [{ bone: 'ulna', t: 0.3 }], i: [{ anchor: 'hand' }] },
  flexor_pollicis_longus:{ o: [{ bone: 'radius', t: 0.4 }], i: [{ anchor: 'thumb' }] },
  pronator_quadratus:  { o: [{ bone: 'ulna', t: 0.86 }], i: [{ bone: 'radius', t: 0.86 }] },
  // ── forearm extensors (lateral epicondyle / posterior → hand) ──
  brachioradialis:     { o: [{ bone: 'humerus', t: 0.82 }], i: [{ bone: 'radius', t: 0.96 }] },
  extensor_carpi_radialis_longus:{ o: [{ bone: 'humerus', t: 0.84 }], i: [{ anchor: 'hand' }] },
  extensor_carpi_radialis_brevis:{ o: [{ bone: 'humerus', t: 0.96 }], i: [{ anchor: 'hand' }] },
  extensor_digitorum:  { o: [{ bone: 'humerus', t: 0.96 }], i: [{ anchor: 'hand' }] },
  extensor_digiti_minimi:{ o: [{ bone: 'humerus', t: 0.96 }], i: [{ anchor: 'hand' }] },
  extensor_carpi_ulnaris:{ o: [{ bone: 'humerus', t: 0.96 }, { bone: 'ulna', t: 0.15 }], i: [{ anchor: 'hand' }] },
  supinator:           { o: [{ bone: 'humerus', t: 0.96 }, { bone: 'ulna', t: 0.2 }], i: [{ bone: 'radius', t: 0.3 }] },
  abductor_pollicis_longus:{ o: [{ bone: 'ulna', t: 0.5 }, { bone: 'radius', t: 0.5 }], i: [{ anchor: 'thumb' }] },
  extensor_pollicis_brevis:{ o: [{ bone: 'radius', t: 0.55 }], i: [{ anchor: 'thumb' }] },
  extensor_pollicis_longus:{ o: [{ bone: 'ulna', t: 0.5 }], i: [{ anchor: 'thumb' }] },
  extensor_indicis:    { o: [{ bone: 'ulna', t: 0.7 }], i: [{ anchor: 'hand' }] },
};

// ── shared skeleton backdrop (labelled bones, drawn faint) ──
function boneLine(bone, label, lx, ly, anchor) {
  const b = BONES[bone];
  return `
    <line x1="${b.a[0]}" y1="${b.a[1]}" x2="${b.b[0]}" y2="${b.b[1]}"
      stroke="rgba(255,255,255,0.22)" stroke-width="7" stroke-linecap="round"/>
    <line x1="${b.a[0]}" y1="${b.a[1]}" x2="${b.b[0]}" y2="${b.b[1]}"
      stroke="rgba(255,255,255,0.10)" stroke-width="4" stroke-linecap="round"/>
    <text x="${lx}" y="${ly}" font-family="monospace" font-size="8"
      fill="rgba(255,255,255,0.4)" text-anchor="${anchor || 'start'}">${label}</text>`;
}

const SKELETON = `
  <rect width="${W}" height="${H}" fill="var(--surface,#111)"/>
  <!-- scapula -->
  <path d="M150 74 L198 78 L176 150 Z" fill="rgba(255,255,255,0.09)" stroke="rgba(255,255,255,0.2)" stroke-width="1.2"/>
  <text x="200" y="80" font-family="monospace" font-size="8" fill="rgba(255,255,255,0.4)" text-anchor="start">scapula</text>
  <!-- clavicle -->
  ${boneLine('clavicle', 'clavicle', 40, 50, 'end')}
  <!-- coracoid dot -->
  <circle cx="${ANCHORS.coracoid[0]}" cy="${ANCHORS.coracoid[1]}" r="3.5" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
  <!-- humerus / radius / ulna -->
  ${boneLine('humerus', 'humerus', 132, 160, 'start')}
  ${boneLine('ulna', 'ulna', 158, 330, 'start')}
  ${boneLine('radius', 'radius', 84, 330, 'end')}
  <!-- hand block -->
  <rect x="96" y="404" width="56" height="34" rx="5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="1.2"/>
  <text x="124" y="453" font-family="monospace" font-size="8" fill="rgba(255,255,255,0.4)" text-anchor="middle">carpals / hand</text>
`;

function marker(p, color, letter) {
  return `
    <circle cx="${p[0]}" cy="${p[1]}" r="6" fill="${color}" fill-opacity="0.9" stroke="#fff" stroke-opacity="0.5" stroke-width="1"/>
    <text x="${p[0]}" y="${p[1] + 3}" font-family="monospace" font-size="8" font-weight="700" fill="#fff" text-anchor="middle">${letter}</text>`;
}

const RED = '#cf6a55', BLUE = '#5b8fd6';

// Build the attachment plate SVG for a muscle id, or null if no spec exists.
export function buildMuscleAttachment(muscleId) {
  const spec = ATTACH[muscleId];
  if (!spec) return null;
  const oPts = spec.o.map(pt);
  const iPts = spec.i.map(pt);
  const o0 = oPts[0], i0 = iPts[0];

  // Muscle belly: a thick semi-transparent band from first origin to first
  // insertion, gently bowed so it reads as a muscle, not a wire.
  const mx = (o0[0] + i0[0]) / 2 + (o0[0] < i0[0] ? -14 : 14);
  const my = (o0[1] + i0[1]) / 2;
  const belly = `<path d="M${o0[0]} ${o0[1]} Q${mx} ${my} ${i0[0]} ${i0[1]}"
      fill="none" stroke="var(--accent,#c9885a)" stroke-opacity="0.5" stroke-width="12" stroke-linecap="round"/>`;

  const originMarks = oPts.map(p => marker(p, RED, 'O')).join('');
  const insertMarks = iPts.map(p => marker(p, BLUE, 'I')).join('');

  const legend = `
    <g transform="translate(12, ${H - 30})">
      <circle cx="6" cy="0" r="5" fill="${RED}"/><text x="16" y="3" font-family="monospace" font-size="9" fill="rgba(255,255,255,0.65)">Origin</text>
      <circle cx="74" cy="0" r="5" fill="${BLUE}"/><text x="84" y="3" font-family="monospace" font-size="9" fill="rgba(255,255,255,0.65)">Insertion</text>
    </g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${muscleId} attachment plate">
    ${SKELETON}
    ${belly}
    ${originMarks}
    ${insertMarks}
    ${legend}
  </svg>`;
}
