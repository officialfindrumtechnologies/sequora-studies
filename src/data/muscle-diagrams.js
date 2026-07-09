// Inline SVG anatomical diagrams for muscles — every muscle gets a real,
// muscle-specific highlight overlay on a shared limb silhouette (same pattern
// as bone-diagrams.js), not a generic reused image. Schematic, not
// cadaver-precise — good enough to show a student roughly where a muscle
// sits and its shape, same fidelity bar as the existing bone diagrams.

function _svg(body, title = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 460" role="img" aria-label="${title}">
  <defs>
    <marker id="mha" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0 1.5 L7 4 L0 6.5 Z" fill="var(--accent,#7c3aed)"/>
    </marker>
  </defs>
  <rect width="240" height="460" fill="var(--surface,#111)"/>
  ${body}
</svg>`;
}

function _label(x1, y1, x2, y2, name, hint) {
  const anchor = x2 > 120 ? 'start' : 'end';
  const tx = x2 > 120 ? x2 + 6 : x2 - 6;
  return `
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--accent,#7c3aed)" stroke-width="1.5" marker-end="url(#mha)" opacity="0.88"/>
  <text x="${tx}" y="${y2 - 4}" font-family="monospace" font-size="10" font-weight="700" fill="var(--accent,#7c3aed)" text-anchor="${anchor}" letter-spacing="0.03em">${name}</text>
  ${hint ? `<text x="${tx}" y="${y2 + 9}" font-family="monospace" font-size="8" fill="rgba(255,255,255,0.5)" text-anchor="${anchor}">${hint}</text>` : ''}`;
}

function _hl(d) {
  return `<path d="${d}" fill="var(--accent,#7c3aed)" fill-opacity="0.52" stroke="var(--accent,#7c3aed)" stroke-width="1.6" stroke-opacity="0.85"/>`;
}

function _caption(text) {
  return `<text x="120" y="16" font-family="monospace" font-size="9" fill="rgba(255,255,255,0.4)" text-anchor="middle" letter-spacing="0.08em">${text}</text>`;
}

// ── shared limb outline (right upper limb, shoulder to wrist) ──────────────
// Same tapered silhouette reused for anterior and posterior views (mirrors
// how bone-diagrams.js reuses one skull outline across skull bones).
const LIMB_OUTLINE = `
  <path d="M100 22 C80 22 65 34 62 52 C58 66 60 80 65 94 L78 232
           C76 241 74 250 76 259 L85 415 C86 424 90 428 95 431
           L145 431 C150 428 154 424 155 415 L164 259
           C166 250 164 241 162 232 L175 94 C180 80 182 66 178 52
           C175 34 160 22 140 22 C160 18 120 18 100 22 Z"
        fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.22)" stroke-width="1.5"/>
  <!-- elbow crease line -->
  <line x1="72" y1="236" x2="168" y2="236" stroke="rgba(255,255,255,0.13)" stroke-width="1" stroke-dasharray="4 3"/>
  <!-- wrist line -->
  <line x1="83" y1="418" x2="157" y2="418" stroke="rgba(255,255,255,0.13)" stroke-width="1" stroke-dasharray="4 3"/>
`;

function _anteriorBase(caption) {
  return LIMB_OUTLINE + _caption(caption || 'ANTERIOR VIEW — right upper limb');
}
function _posteriorBase(caption) {
  return LIMB_OUTLINE + _caption(caption || 'POSTERIOR VIEW — right upper limb');
}

// ── shoulder / scapular region (posterior view of scapula on back) ─────────
const SCAPULA_OUTLINE = `
  <path d="M70 40 L170 40 L178 130 C178 180 165 220 140 250 L100 250
           C75 220 62 180 62 130 Z"
        fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.22)" stroke-width="1.5"/>
  <line x1="120" y1="40" x2="120" y2="250" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-dasharray="4 3"/>
`;
function _scapulaBase(caption) {
  return SCAPULA_OUTLINE + _caption(caption || 'POSTERIOR VIEW — scapular region');
}

// ════════════════════════════════════════════════════════════════════════
// SHOULDER
// ════════════════════════════════════════════════════════════════════════

export const DELTOID_DIAGRAM = _svg(
  _anteriorBase() +
  _hl('M62 52 C58 66 60 80 65 94 L74 118 C90 108 110 102 130 102 C150 102 166 108 178 118 L178 94 C180 80 182 66 178 52 C175 34 160 22 140 22 C120 18 80 22 62 52 Z') +
  _label(120, 60, 195, 50, 'DELTOID', 'caps the shoulder'),
  'Deltoid Diagram'
);

export const SUPRASPINATUS_DIAGRAM = _svg(
  _scapulaBase() +
  _hl('M70 42 L170 42 L168 70 C140 66 100 66 72 70 Z') +
  _label(120, 55, 200, 40, 'SUPRASPINATUS', 'above the scapular spine'),
  'Supraspinatus Diagram'
);

export const INFRASPINATUS_DIAGRAM = _svg(
  _scapulaBase() +
  _hl('M72 78 C100 74 140 74 168 78 L172 160 C140 175 100 175 68 160 Z') +
  _label(120, 110, 200, 100, 'INFRASPINATUS', 'below the scapular spine'),
  'Infraspinatus Diagram'
);

export const TERES_MINOR_DIAGRAM = _svg(
  _scapulaBase() +
  _hl('M140 178 L172 165 L176 195 L146 205 Z') +
  _label(155, 190, 205, 210, 'TERES MINOR', 'upper lateral border'),
  'Teres Minor Diagram'
);

export const TERES_MAJOR_DIAGRAM = _svg(
  _scapulaBase() +
  _hl('M140 208 L178 198 L155 244 L120 250 Z') +
  _label(150, 225, 205, 240, 'TERES MAJOR', 'lower lateral border'),
  'Teres Major Diagram'
);

export const SUBSCAPULARIS_DIAGRAM = _svg(
  _scapulaBase('ANTERIOR SURFACE (shown on scapula outline — faces ribcage, not visible from behind)') +
  _hl('M70 55 C95 60 145 60 170 55 L172 155 C145 165 95 165 68 155 Z') +
  _label(120, 105, 205, 90, 'SUBSCAPULARIS', 'costal surface of scapula'),
  'Subscapularis Diagram'
);

export const CORACOBRACHIALIS_DIAGRAM = _svg(
  _anteriorBase() +
  _hl('M95 100 C110 96 122 98 128 108 C130 122 126 136 116 142 C104 140 96 130 94 118 Z') +
  _label(130, 115, 205, 100, 'CORACOBRACHIALIS', 'short, deep, upper medial arm'),
  'Coracobrachialis Diagram'
);

// ════════════════════════════════════════════════════════════════════════
// ARM
// ════════════════════════════════════════════════════════════════════════

export const BICEPS_BRACHII_DIAGRAM = _svg(
  _anteriorBase() +
  _hl('M84 108 C96 100 128 100 148 108 C154 140 156 175 150 210 C130 220 108 220 88 210 C82 175 80 140 84 108 Z') +
  _label(120, 155, 205, 145, 'BICEPS BRACHII', 'anterior compartment, arm'),
  'Biceps Brachii Diagram'
);

export const BRACHIALIS_DIAGRAM = _svg(
  _anteriorBase() +
  _hl('M78 175 C90 170 150 170 162 175 L166 228 C140 238 100 238 74 228 Z') +
  _label(120, 205, 205, 195, 'BRACHIALIS', 'deep to biceps, distal arm'),
  'Brachialis Diagram'
);

export const TRICEPS_BRACHII_DIAGRAM = _svg(
  _posteriorBase() +
  _hl('M65 96 C90 90 150 90 175 96 L166 228 C140 240 100 240 74 228 Z') +
  _label(120, 160, 205, 150, 'TRICEPS BRACHII', 'whole posterior arm'),
  'Triceps Brachii Diagram'
);

export const ANCONEUS_DIAGRAM = _svg(
  _posteriorBase() +
  _hl('M140 226 L168 232 L162 258 L136 250 Z') +
  _label(155, 240, 205, 250, 'ANCONEUS', 'small, just past elbow'),
  'Anconeus Diagram'
);

// ════════════════════════════════════════════════════════════════════════
// FOREARM — ANTERIOR (FLEXOR) COMPARTMENT
// ════════════════════════════════════════════════════════════════════════

export const PRONATOR_TERES_DIAGRAM = _svg(
  _anteriorBase() +
  _hl('M164 250 C168 258 168 268 160 274 C145 268 130 258 122 246 C135 244 152 246 164 250 Z') +
  _label(140, 258, 205, 270, 'PRONATOR TERES', 'crosses forearm, proximal-lateral'),
  'Pronator Teres Diagram'
);

export const FLEXOR_CARPI_RADIALIS_DIAGRAM = _svg(
  _anteriorBase() +
  _hl('M120 254 C130 260 134 300 128 340 C124 370 118 395 110 412 C104 400 100 370 102 340 C104 300 108 260 120 254 Z') +
  _label(112, 330, 205, 320, 'FLEXOR CARPI RADIALIS', 'radial side, superficial'),
  'Flexor Carpi Radialis Diagram'
);

export const PALMARIS_LONGUS_DIAGRAM = _svg(
  _anteriorBase() +
  _hl('M126 256 C132 262 134 300 130 340 C127 370 124 395 120 412 C116 400 114 370 116 340 C118 300 120 262 126 256 Z') +
  _label(125, 340, 200, 350, 'PALMARIS LONGUS', 'midline, absent in ~14% of people'),
  'Palmaris Longus Diagram'
);

export const FLEXOR_CARPI_ULNARIS_DIAGRAM = _svg(
  _anteriorBase() +
  _hl('M132 258 C138 264 140 300 136 336 C134 366 132 392 130 412 C136 400 142 370 144 336 C146 300 142 264 132 258 Z') +
  _label(140, 330, 200, 385, 'FLEXOR CARPI ULNARIS', 'ulnar side, superficial'),
  'Flexor Carpi Ulnaris Diagram'
);

export const FLEXOR_DIGITORUM_SUPERFICIALIS_DIAGRAM = _svg(
  _anteriorBase() +
  _hl('M100 260 C120 254 140 254 158 262 C160 290 158 320 150 348 C130 356 108 354 92 344 C88 316 90 286 100 260 Z') +
  _label(125, 300, 205, 285, 'FLEXOR DIGITORUM SUPERFICIALIS', 'middle layer, most of forearm width'),
  'Flexor Digitorum Superficialis Diagram'
);

export const FLEXOR_DIGITORUM_PROFUNDUS_DIAGRAM = _svg(
  _anteriorBase('ANTERIOR VIEW — deep layer, normally hidden beneath FDS') +
  _hl('M105 266 C122 262 138 262 152 268 C154 292 152 316 146 338 C128 344 110 342 98 334 C94 312 96 288 105 266 Z') +
  _label(125, 300, 60, 60, 'FLEXOR DIGITORUM PROFUNDUS', 'deepest flexor, ulna + interosseous membrane'),
  'Flexor Digitorum Profundus Diagram'
);

export const FLEXOR_POLLICIS_LONGUS_DIAGRAM = _svg(
  _anteriorBase('ANTERIOR VIEW — deep layer, radial side') +
  _hl('M108 270 C116 266 124 268 128 276 C130 300 126 322 118 340 C112 336 106 320 105 300 C104 288 105 276 108 270 Z') +
  _label(120, 310, 60, 320, 'FLEXOR POLLICIS LONGUS', 'thumb flexor, deep radial forearm'),
  'Flexor Pollicis Longus Diagram'
);

export const PRONATOR_QUADRATUS_DIAGRAM = _svg(
  _anteriorBase('ANTERIOR VIEW — deepest distal forearm') +
  _hl('M104 388 C120 382 140 382 156 388 L154 408 C138 414 122 414 106 408 Z') +
  _label(130, 398, 205, 405, 'PRONATOR QUADRATUS', 'deepest, just above wrist'),
  'Pronator Quadratus Diagram'
);

// ════════════════════════════════════════════════════════════════════════
// FOREARM — POSTERIOR (EXTENSOR) COMPARTMENT
// ════════════════════════════════════════════════════════════════════════

export const BRACHIORADIALIS_DIAGRAM = _svg(
  _posteriorBase() +
  _hl('M76 232 C86 226 96 228 100 238 C98 270 92 300 84 326 C78 316 72 288 72 258 C72 248 73 238 76 232 Z') +
  _label(85, 280, 20, 270, 'BRACHIORADIALIS', 'radial border, prominent'),
  'Brachioradialis Diagram'
);

export const EXTENSOR_CARPI_RADIALIS_LONGUS_DIAGRAM = _svg(
  _posteriorBase() +
  _hl('M98 240 C108 236 116 240 118 250 C116 280 110 308 100 330 C92 322 86 296 88 266 C89 256 92 246 98 240 Z') +
  _label(105, 280, 20, 310, 'EXT. CARPI RADIALIS LONGUS', 'radial side, deep to brachioradialis'),
  'Extensor Carpi Radialis Longus Diagram'
);

export const EXTENSOR_CARPI_RADIALIS_BREVIS_DIAGRAM = _svg(
  _posteriorBase() +
  _hl('M116 246 C124 242 132 246 134 256 C132 284 126 310 116 332 C108 326 102 300 104 272 C105 262 110 250 116 246 Z') +
  _label(122, 280, 205, 260, 'EXT. CARPI RADIALIS BREVIS', 'radial side, deep to ECRL'),
  'Extensor Carpi Radialis Brevis Diagram'
);

export const EXTENSOR_DIGITORUM_DIAGRAM = _svg(
  _posteriorBase() +
  _hl('M100 250 C116 244 134 244 150 252 C152 282 148 312 138 340 C122 346 106 344 96 334 C92 306 94 276 100 250 Z') +
  _label(122, 295, 205, 300, 'EXTENSOR DIGITORUM', 'middle of extensor compartment'),
  'Extensor Digitorum Diagram'
);

export const EXTENSOR_DIGITI_MINIMI_DIAGRAM = _svg(
  _posteriorBase() +
  _hl('M138 254 C146 250 152 254 154 264 C152 288 148 310 140 330 C134 322 130 300 132 276 C133 268 135 258 138 254 Z') +
  _label(145, 290, 205, 330, 'EXTENSOR DIGITI MINIMI', 'ulnar side, extends little finger'),
  'Extensor Digiti Minimi Diagram'
);

export const EXTENSOR_CARPI_ULNARIS_DIAGRAM = _svg(
  _posteriorBase() +
  _hl('M148 256 C156 252 162 258 162 270 C158 296 152 318 142 338 C136 330 134 306 138 280 C140 270 143 260 148 256 Z') +
  _label(150, 295, 205, 355, 'EXTENSOR CARPI ULNARIS', 'ulnar border, superficial'),
  'Extensor Carpi Ulnaris Diagram'
);

export const SUPINATOR_DIAGRAM = _svg(
  _posteriorBase('POSTERIOR VIEW — deep, wraps around proximal radius') +
  _hl('M100 240 C118 234 140 234 158 242 C160 254 158 264 152 270 C130 264 108 264 88 270 C86 258 90 246 100 240 Z') +
  _label(120, 250, 40, 235, 'SUPINATOR', 'wraps proximal radius'),
  'Supinator Diagram'
);

export const ABDUCTOR_POLLICIS_LONGUS_DIAGRAM = _svg(
  _posteriorBase() +
  _hl('M108 300 C120 296 132 300 136 312 C132 330 122 346 108 356 C100 348 96 330 98 314 C100 306 103 302 108 300 Z') +
  _label(120, 330, 40, 340, 'ABDUCTOR POLLICIS LONGUS', 'deep, radial, crosses to thumb'),
  'Abductor Pollicis Longus Diagram'
);

export const EXTENSOR_POLLICIS_BREVIS_DIAGRAM = _svg(
  _posteriorBase() +
  _hl('M116 316 C126 312 134 318 136 328 C132 344 124 358 114 366 C106 358 103 342 106 328 C108 320 111 318 116 316 Z') +
  _label(126, 340, 205, 345, 'EXTENSOR POLLICIS BREVIS', 'deep, radial, to thumb'),
  'Extensor Pollicis Brevis Diagram'
);

export const EXTENSOR_POLLICIS_LONGUS_DIAGRAM = _svg(
  _posteriorBase() +
  _hl('M130 306 C140 302 148 308 148 320 C144 338 134 354 122 364 C114 356 112 338 116 322 C118 312 123 308 130 306 Z') +
  _label(140, 330, 205, 300, 'EXTENSOR POLLICIS LONGUS', 'deep, crosses obliquely to thumb'),
  'Extensor Pollicis Longus Diagram'
);

export const EXTENSOR_INDICIS_DIAGRAM = _svg(
  _posteriorBase('POSTERIOR VIEW — deepest, distal forearm') +
  _hl('M118 340 C128 336 138 340 140 350 C137 366 130 380 120 388 C112 380 109 364 112 350 C113 344 115 342 118 340 Z') +
  _label(130, 360, 205, 375, 'EXTENSOR INDICIS', 'deep, distal, to index finger'),
  'Extensor Indicis Diagram'
);

export const MUSCLE_DIAGRAMS = {
  deltoid: DELTOID_DIAGRAM,
  supraspinatus: SUPRASPINATUS_DIAGRAM,
  infraspinatus: INFRASPINATUS_DIAGRAM,
  teres_minor: TERES_MINOR_DIAGRAM,
  teres_major: TERES_MAJOR_DIAGRAM,
  subscapularis: SUBSCAPULARIS_DIAGRAM,
  coracobrachialis: CORACOBRACHIALIS_DIAGRAM,
  biceps_brachii: BICEPS_BRACHII_DIAGRAM,
  brachialis: BRACHIALIS_DIAGRAM,
  triceps_brachii: TRICEPS_BRACHII_DIAGRAM,
  anconeus: ANCONEUS_DIAGRAM,
  pronator_teres: PRONATOR_TERES_DIAGRAM,
  flexor_carpi_radialis: FLEXOR_CARPI_RADIALIS_DIAGRAM,
  palmaris_longus: PALMARIS_LONGUS_DIAGRAM,
  flexor_carpi_ulnaris: FLEXOR_CARPI_ULNARIS_DIAGRAM,
  flexor_digitorum_superficialis: FLEXOR_DIGITORUM_SUPERFICIALIS_DIAGRAM,
  flexor_digitorum_profundus: FLEXOR_DIGITORUM_PROFUNDUS_DIAGRAM,
  flexor_pollicis_longus: FLEXOR_POLLICIS_LONGUS_DIAGRAM,
  pronator_quadratus: PRONATOR_QUADRATUS_DIAGRAM,
  brachioradialis: BRACHIORADIALIS_DIAGRAM,
  extensor_carpi_radialis_longus: EXTENSOR_CARPI_RADIALIS_LONGUS_DIAGRAM,
  extensor_carpi_radialis_brevis: EXTENSOR_CARPI_RADIALIS_BREVIS_DIAGRAM,
  extensor_digitorum: EXTENSOR_DIGITORUM_DIAGRAM,
  extensor_digiti_minimi: EXTENSOR_DIGITI_MINIMI_DIAGRAM,
  extensor_carpi_ulnaris: EXTENSOR_CARPI_ULNARIS_DIAGRAM,
  supinator: SUPINATOR_DIAGRAM,
  abductor_pollicis_longus: ABDUCTOR_POLLICIS_LONGUS_DIAGRAM,
  extensor_pollicis_brevis: EXTENSOR_POLLICIS_BREVIS_DIAGRAM,
  extensor_pollicis_longus: EXTENSOR_POLLICIS_LONGUS_DIAGRAM,
  extensor_indicis: EXTENSOR_INDICIS_DIAGRAM,
};
