// Inline SVG anatomical diagrams for shared-model skull bones.
// All use CSS variables (--accent, --surface) so they theme automatically.
// Front view for all bones except Occipital (rear view).

function _svg(body, title = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 350" role="img" aria-label="${title}">
  <defs>
    <marker id="bha" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0 1.5 L7 4 L0 6.5 Z" fill="var(--accent,#7c3aed)"/>
    </marker>
  </defs>
  <rect width="400" height="350" fill="var(--surface,#111)"/>
  ${body}
</svg>`;
}

// ── shared skull base (front view) ─────────────────────────────────────────
// All coordinates tuned for 400×350 canvas.
const BG_SKULL = `
  <path d="M200 24 C250 21 302 48 320 97 C334 132 330 165 314 182 C305 190 297 196 291 204 C286 212 287 222 291 232 C294 243 291 257 279 267 L270 283 C267 296 255 306 244 309 L240 344 L160 344 L156 309 C145 306 133 296 130 283 L121 267 C109 257 106 243 109 232 C113 222 114 212 109 204 C103 196 95 190 86 182 C70 165 66 132 80 97 C98 48 150 21 200 24 Z"
        fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.22)" stroke-width="1.5"/>
  <!-- left orbit -->
  <path d="M119 149 C117 143 126 138 150 137 L173 137 C183 140 184 149 184 163 C184 179 180 193 163 194 L140 194 C121 192 119 178 119 163 Z"
        fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.16)" stroke-width="1"/>
  <!-- right orbit -->
  <path d="M281 149 C283 143 274 138 250 137 L227 137 C217 140 216 149 216 163 C216 179 220 193 237 194 L260 194 C279 192 281 178 281 163 Z"
        fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.16)" stroke-width="1"/>
  <!-- nasal aperture -->
  <path d="M187 202 L213 202 L214 244 C214 256 208 262 200 262 C192 262 186 256 186 244 Z"
        fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.16)" stroke-width="1"/>
  <!-- coronal suture -->
  <path d="M86 167 C102 161 128 156 162 151 C178 149 200 148 200 148 C200 148 222 149 238 151 C272 156 298 161 314 167"
        fill="none" stroke="rgba(255,255,255,0.13)" stroke-width="1" stroke-dasharray="4 3"/>
  <!-- mid-face line (maxillo-mandibular junction) -->
  <path d="M138 275 C165 278 183 279 200 279 C217 279 235 278 262 275"
        fill="none" stroke="rgba(255,255,255,0.13)" stroke-width="1"/>
`;

// ── shared rear-view skull base (for occipital) ────────────────────────────
const BG_SKULL_REAR = `
  <path d="M200 26 C252 22 308 52 326 102 C342 140 338 176 320 193 C310 200 300 204 290 210 C282 216 278 226 282 238 C286 250 280 266 268 272 L256 285 C253 298 242 307 232 310 L226 344 L174 344 L168 310 C158 307 147 298 144 285 L132 272 C120 266 114 250 118 238 C122 226 118 216 110 210 C100 204 90 200 80 193 C62 176 58 140 74 102 C92 52 148 22 200 26 Z"
        fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.22)" stroke-width="1.5"/>
  <!-- lambdoid suture -->
  <path d="M88 178 C110 165 145 155 178 150 L200 149 L222 150 C255 155 290 165 312 178"
        fill="none" stroke="rgba(255,255,255,0.13)" stroke-width="1" stroke-dasharray="4 3"/>
  <!-- external occipital protuberance -->
  <ellipse cx="200" cy="205" rx="12" ry="7" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
  <!-- superior nuchal line -->
  <path d="M108 195 C140 200 170 202 200 202 C230 202 260 200 292 195"
        fill="none" stroke="rgba(255,255,255,0.13)" stroke-width="1"/>
  <!-- inferior nuchal line -->
  <path d="M128 225 C155 228 178 229 200 229 C222 229 245 228 272 225"
        fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
  <!-- foramen magnum outline -->
  <ellipse cx="200" cy="300" rx="42" ry="30" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.16)" stroke-width="1"/>
`;

// ── label helpers ──────────────────────────────────────────────────────────
function _label(x1, y1, x2, y2, name, hint) {
  const anchor = x2 > x1 ? 'start' : 'end';
  const tx = x2 > 200 ? x2 + 6 : x2 - 6;
  return `
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--accent,#7c3aed)" stroke-width="1.5" marker-end="url(#bha)" opacity="0.88"/>
  <text x="${tx}" y="${y2 - 4}" font-family="monospace" font-size="11" font-weight="700" fill="var(--accent,#7c3aed)" text-anchor="${anchor}" letter-spacing="0.04em">${name}</text>
  ${hint ? `<text x="${tx}" y="${y2 + 10}" font-family="monospace" font-size="9" fill="rgba(255,255,255,0.5)" text-anchor="${anchor}">${hint}</text>` : ''}`;
}

function _hlPath(d) {
  return `<path d="${d}" fill="var(--accent,#7c3aed)" fill-opacity="0.52" stroke="var(--accent,#7c3aed)" stroke-width="1.8" stroke-opacity="0.85"/>`;
}

// ── FRONTAL BONE ──────────────────────────────────────────────────────────
// Covers forehead + supraorbital region, from skull top to orbital rim level
const _frontalHl = _hlPath(
  'M200 24 C250 21 302 48 320 97 C330 122 326 146 310 155 C296 161 280 157 262 152 C248 147 234 143 213 138 L187 138 C166 143 152 147 138 152 C120 157 104 161 90 155 C74 146 70 122 80 97 C98 48 150 21 200 24 Z'
);

export const FRONTAL_DIAGRAM = _svg(
  BG_SKULL +
  _frontalHl +
  _label(200, 80, 330, 55, 'FRONTAL BONE', 'forehead region'),
  'Frontal Bone Diagram'
);

// ── PARIETAL BONE ─────────────────────────────────────────────────────────
// Upper-lateral portions visible from front (both sides)
const _parietalHlL = _hlPath(
  'M80 97 C70 122 74 146 90 155 C104 161 120 157 138 152 C126 166 108 178 86 182 C70 165 66 132 80 97 Z'
);
const _parietalHlR = _hlPath(
  'M320 97 C334 132 330 165 314 182 C292 178 274 166 262 152 C280 157 296 161 310 155 C326 146 330 122 320 97 Z'
);
const _parietalTop = _hlPath(
  'M200 24 C250 21 302 48 320 97 C310 92 280 78 255 65 C230 54 215 50 200 49 C185 50 170 54 145 65 C120 78 90 92 80 97 C98 48 150 21 200 24 Z'
);

export const PARIETAL_DIAGRAM = _svg(
  BG_SKULL +
  _parietalTop +
  _parietalHlL +
  _parietalHlR +
  _label(105, 118, 18, 78, 'PARIETAL BONE', 'top + sides of cranium') +
  `<text x="200" y="342" font-family="monospace" font-size="9" fill="rgba(255,255,255,0.35)" text-anchor="middle">Highlighted: visible portions from front — bone also covers skull top</text>`,
  'Parietal Bone Diagram'
);

// ── TEMPORAL BONE ─────────────────────────────────────────────────────────
// Lateral mid-skull, temple region (both sides)
const _temporalHlL = _hlPath(
  'M86 182 C108 178 126 166 138 152 C126 168 110 188 109 204 C103 196 95 190 86 182 Z'
);
const _temporalHlL2 = _hlPath(
  'M86 182 C95 190 103 196 109 204 C114 212 113 222 109 232 C106 243 109 257 121 267 L130 283 C112 270 98 254 92 238 C86 222 80 204 86 182 Z'
);
const _temporalHlR = _hlPath(
  'M314 182 C305 190 297 196 291 204 C287 222 288 218 286 232 C283 246 268 266 270 283 L279 267 C291 257 294 243 291 232 C287 222 286 212 291 204 C297 196 305 190 314 182 Z'
);
const _temporalHlR2 = _hlPath(
  'M314 182 C320 200 314 222 308 238 C302 254 290 270 270 283 L279 267 C291 257 294 243 291 232 C291 218 286 212 291 204 C297 196 305 190 314 182 Z'
);

export const TEMPORAL_DIAGRAM = _svg(
  BG_SKULL +
  _temporalHlL +
  _temporalHlL2 +
  _temporalHlR +
  _temporalHlR2 +
  _label(95, 210, 20, 175, 'TEMPORAL BONE', 'temple — bilaterally'),
  'Temporal Bone Diagram'
);

// ── OCCIPITAL BONE ────────────────────────────────────────────────────────
// Rear view — occipital is the central posterior cranium
const _occipHl = _hlPath(
  'M88 178 C110 165 145 155 178 150 L200 149 L222 150 C255 155 290 165 312 178 C300 184 288 192 278 202 C270 210 268 220 270 230 C274 244 268 262 256 270 L244 283 C242 296 232 305 226 308 L220 344 L180 344 L174 308 C168 305 158 296 156 283 L144 270 C132 262 126 244 130 230 C132 220 130 210 122 202 C112 192 100 184 88 178 Z'
);

export const OCCIPITAL_DIAGRAM = _svg(
  BG_SKULL_REAR +
  _occipHl +
  _label(200, 175, 310, 140, 'OCCIPITAL BONE', 'posterior cranium') +
  `<text x="200" y="20" font-family="monospace" font-size="9" fill="rgba(255,255,255,0.4)" text-anchor="middle" letter-spacing="0.08em">POSTERIOR VIEW</text>`,
  'Occipital Bone Diagram'
);

// ── MANDIBLE ──────────────────────────────────────────────────────────────
// Lower jaw — body + rami
const _mandHl = _hlPath(
  'M156 309 C145 306 133 296 130 283 L121 267 C116 260 112 255 113 250 C120 256 130 260 140 262 L140 290 C143 298 150 305 156 309 Z'
) + _hlPath(
  'M244 309 C255 306 267 296 270 283 L279 267 C284 260 288 255 287 250 C280 256 270 260 260 262 L260 290 C257 298 250 305 244 309 Z'
) + _hlPath(
  'M140 262 L130 279 L121 267 C118 262 114 255 113 250 C120 256 130 260 140 262 Z'
) + _hlPath(
  'M140 290 L140 344 L260 344 L260 290 C252 292 228 294 200 294 C172 294 148 292 140 290 Z'
) + _hlPath(
  'M160 344 L244 344 L244 309 L156 309 Z'
);

// Simpler mandible — just draw the full horseshoe shape
const _mandSimple = _hlPath(
  'M130 280 C132 270 121 267 121 267 C119 263 120 257 125 252 C130 248 136 248 140 252 L144 268 L150 278 C165 292 182 298 200 298 C218 298 235 292 250 278 L256 268 L260 252 C264 248 270 248 275 252 C280 257 281 263 279 267 C279 267 268 270 270 280 L270 310 C266 322 255 330 240 332 L200 334 L160 332 C145 330 134 322 130 310 Z'
);

export const MANDIBLE_DIAGRAM = _svg(
  BG_SKULL +
  _mandSimple +
  _label(200, 305, 320, 280, 'MANDIBLE', 'lower jaw'),
  'Mandible Diagram'
);

// ── MAXILLA ───────────────────────────────────────────────────────────────
// Upper jaw — between nasal aperture and teeth line
const _maxHl = _hlPath(
  'M139 263 C139 263 150 264 163 266 C175 268 188 270 200 270 C212 270 225 268 237 266 C250 264 261 263 261 263 C260 256 258 250 255 246 C250 240 242 238 235 238 L225 238 C220 240 216 245 214 248 L200 248 L186 248 C184 245 180 240 175 238 L165 238 C158 238 150 240 145 246 C142 250 140 256 139 263 Z'
) + _hlPath(
  'M139 263 L139 275 C160 278 180 280 200 280 C220 280 240 278 261 275 L261 263 C250 264 225 268 200 270 C175 268 150 264 139 263 Z'
);

// Simpler maxilla
const _maxSimple = _hlPath(
  'M143 263 C148 248 158 238 172 236 L200 235 L228 236 C242 238 252 248 257 263 L257 276 C237 280 218 282 200 282 C182 282 163 280 143 276 Z'
);

export const MAXILLA_DIAGRAM = _svg(
  BG_SKULL +
  _maxSimple +
  _label(200, 260, 330, 230, 'MAXILLA', 'upper jaw'),
  'Maxilla Diagram'
);

// ── ZYGOMATIC BONE ────────────────────────────────────────────────────────
// Cheekbones — lateral to orbits, bilateral
// Left zygomatic
const _zygoL = _hlPath(
  'M86 182 C95 190 103 196 109 204 C104 210 96 214 88 212 C78 208 72 198 75 190 C78 184 82 182 86 182 Z'
) + _hlPath(
  'M86 182 C90 178 92 172 92 165 C95 160 100 156 107 157 C115 159 118 165 116 173 C113 180 108 185 104 188 C96 192 89 188 86 182 Z'
);
// Right zygomatic
const _zygoR = _hlPath(
  'M314 182 C310 182 304 184 297 188 C292 185 287 180 284 173 C282 165 285 159 293 157 C300 156 305 160 308 165 C308 172 310 178 314 182 Z'
) + _hlPath(
  'M314 182 C318 182 322 184 325 190 C328 198 322 208 312 212 C304 214 296 210 291 204 C297 196 305 190 314 182 Z'
);

// Simpler — just the prominent lateral cheekbone bumps
const _zygoSimpleL = _hlPath(
  'M84 178 C90 170 98 163 108 160 C118 158 122 162 120 172 C118 180 112 188 104 194 C96 198 88 196 84 190 C80 186 80 182 84 178 Z'
);
const _zygoSimpleR = _hlPath(
  'M316 178 C320 182 320 186 316 190 C312 196 304 198 296 194 C288 188 282 180 280 172 C278 162 282 158 292 160 C302 163 310 170 316 178 Z'
);

export const ZYGOMATIC_DIAGRAM = _svg(
  BG_SKULL +
  _zygoSimpleL +
  _zygoSimpleR +
  _label(88, 182, 22, 155, 'ZYGOMATIC', 'cheekbone — bilateral'),
  'Zygomatic Bone Diagram'
);

// ── export map ────────────────────────────────────────────────────────────
export const BONE_DIAGRAMS = {
  frontal:   FRONTAL_DIAGRAM,
  parietal:  PARIETAL_DIAGRAM,
  temporal:  TEMPORAL_DIAGRAM,
  occipital: OCCIPITAL_DIAGRAM,
  mandible:  MANDIBLE_DIAGRAM,
  maxilla:   MAXILLA_DIAGRAM,
  zygomatic: ZYGOMATIC_DIAGRAM,
};
