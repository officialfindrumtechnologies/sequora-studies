// Theme engine: definitions, apply, persist.
// Vars: --ink/--ink2/--ink3 = bg/surface/surface-2, --line = border,
// --paper/--paper-dim/--muted = text/text-dim/muted,
// --amber/--amber-soft/--amber-deep = accent/accent-soft/accent-deep
// --glow-color = accent as RGB triple for rgba() usage

export const THEMES = {
  ascent: {
    label: 'Ascent',
    vars: {
      '--ink': '#0e0c08', '--ink2': '#18150f', '--ink3': '#221d16',
      '--line': '#2d2820',
      '--paper': '#f4ece0', '--paper-dim': '#cdc4b5', '--muted': '#9b9184',
      '--amber': '#d4922a', '--amber-soft': '#e8b050', '--amber-deep': '#b07010',
      '--glow-color': '212,146,42',
    },
  },
  midnight: {
    label: 'Midnight',
    vars: {
      '--ink': '#0a0d1a', '--ink2': '#0f1426', '--ink3': '#141b32',
      '--line': '#162040',
      '--paper': '#dce8ff', '--paper-dim': '#8aaad4', '--muted': '#507090',
      '--amber': '#4f8eff', '--amber-soft': '#78b0ff', '--amber-deep': '#2060d0',
      '--glow-color': '79,142,255',
    },
  },
  aurora: {
    label: 'Aurora',
    vars: {
      '--ink': '#040d0a', '--ink2': '#081410', '--ink3': '#0c1c16',
      '--line': '#10281e',
      '--paper': '#e0f5ee', '--paper-dim': '#8abcaa', '--muted': '#507060',
      '--amber': '#00f5a0', '--amber-soft': '#50ffb8', '--amber-deep': '#00c070',
      '--glow-color': '0,245,160',
    },
  },
  ember: {
    label: 'Ember',
    vars: {
      '--ink': '#0a0704', '--ink2': '#150d08', '--ink3': '#1e1208',
      '--line': '#302010',
      '--paper': '#f5ede8', '--paper-dim': '#c8b0a0', '--muted': '#8a6858',
      '--amber': '#ff4f1a', '--amber-soft': '#ff7a4a', '--amber-deep': '#c83000',
      '--glow-color': '255,79,26',
    },
  },
  forest: {
    label: 'Forest',
    vars: {
      '--ink': '#0a1a0d', '--ink2': '#0f2212', '--ink3': '#142c18',
      '--line': '#1e3a22',
      '--paper': '#e4f0e6', '--paper-dim': '#a0c0a8', '--muted': '#608068',
      '--amber': '#6aad7a', '--amber-soft': '#8ecf9e', '--amber-deep': '#3d8a4f',
      '--glow-color': '106,173,122',
    },
  },
  rosegold: {
    label: 'Rose Gold',
    vars: {
      '--ink': '#120d0d', '--ink2': '#1c1515', '--ink3': '#261c1c',
      '--line': '#302020',
      '--paper': '#f5ebe8', '--paper-dim': '#c8b0ac', '--muted': '#8a7270',
      '--amber': '#d4a5a5', '--amber-soft': '#e8c0be', '--amber-deep': '#b07878',
      '--glow-color': '212,165,165',
    },
  },
  glacier: {
    label: 'Glacier',
    // LIGHT THEME — --ink is the light bg, --paper is dark text
    vars: {
      '--ink': '#e8edf2', '--ink2': '#f0f4f8', '--ink3': '#f8fbff',
      '--line': '#c0cad4',
      '--paper': '#1a2030', '--paper-dim': '#4a5870', '--muted': '#7888a0',
      '--amber': '#2080d0', '--amber-soft': '#4090e0', '--amber-deep': '#1060b0',
      '--glow-color': '32,128,208',
    },
  },
  sakura: {
    label: 'Sakura',
    vars: {
      '--ink': '#0a080c', '--ink2': '#130f16', '--ink3': '#1a1420',
      '--line': '#281e2c',
      '--paper': '#f5e8f0', '--paper-dim': '#c8aabe', '--muted': '#8a6880',
      '--amber': '#ffb7c5', '--amber-soft': '#ffd0da', '--amber-deep': '#e0809a',
      '--glow-color': '255,183,197',
    },
  },
  neontokyo: {
    label: 'Neon Tokyo',
    vars: {
      '--ink': '#000000', '--ink2': '#080810', '--ink3': '#0d0d18',
      '--line': '#101030',
      '--paper': '#e0f0ff', '--paper-dim': '#8090c0', '--muted': '#5060a0',
      '--amber': '#00ffff', '--amber-soft': '#60ffff', '--amber-deep': '#00c0c0',
      '--glow-color': '0,255,255',
    },
  },
  sandstone: {
    label: 'Sandstone',
    // LIGHT THEME
    vars: {
      '--ink': '#f5efe6', '--ink2': '#fffaf4', '--ink3': '#fff5eb',
      '--line': '#d4c4b0',
      '--paper': '#2a1f14', '--paper-dim': '#6a5040', '--muted': '#9a8070',
      '--amber': '#c05a2a', '--amber-soft': '#d87848', '--amber-deep': '#a03818',
      '--glow-color': '192,90,42',
    },
  },
  lavender: {
    label: 'Lavender',
    vars: {
      '--ink': '#1a1525', '--ink2': '#221c32', '--ink3': '#2a2240',
      '--line': '#302850',
      '--paper': '#eae8f8', '--paper-dim': '#b4b0d8', '--muted': '#7870a8',
      '--amber': '#c4b5fd', '--amber-soft': '#ddd5ff', '--amber-deep': '#9985e0',
      '--glow-color': '196,181,253',
    },
  },
  crimson: {
    label: 'Crimson',
    vars: {
      '--ink': '#0d0608', '--ink2': '#160a0a', '--ink3': '#200e0e',
      '--line': '#301414',
      '--paper': '#f5e8e8', '--paper-dim': '#c8aaaa', '--muted': '#8a6868',
      '--amber': '#dc2626', '--amber-soft': '#f04040', '--amber-deep': '#b01010',
      '--glow-color': '220,38,38',
    },
  },
  monochrome: {
    label: 'Monochrome',
    vars: {
      '--ink': '#0a0a0a', '--ink2': '#141414', '--ink3': '#1e1e1e',
      '--line': '#2e2e2e',
      '--paper': '#ffffff', '--paper-dim': '#b0b0b0', '--muted': '#707070',
      '--amber': '#ffffff', '--amber-soft': '#e8e8e8', '--amber-deep': '#c0c0c0',
      '--glow-color': '255,255,255',
    },
  },
  hacker: {
    label: 'Hacker',
    vars: {
      '--ink': '#000000', '--ink2': '#080808', '--ink3': '#101010',
      '--line': '#002208',
      '--paper': '#00ff41', '--paper-dim': '#00aa28', '--muted': '#006618',
      '--amber': '#00ff41', '--amber-soft': '#60ff80', '--amber-deep': '#00cc30',
      '--glow-color': '0,255,65',
    },
  },
  sunset: {
    label: 'Sunset',
    vars: {
      '--ink': '#1a0d1a', '--ink2': '#221422', '--ink3': '#2c1c2c',
      '--line': '#381c38',
      '--paper': '#f8e8f0', '--paper-dim': '#c4a0c0', '--muted': '#886880',
      '--amber': '#ff6b35', '--amber-soft': '#ff8c60', '--amber-deep': '#e04820',
      '--glow-color': '255,107,53',
    },
  },
  ocean: {
    label: 'Ocean',
    vars: {
      '--ink': '#060f14', '--ink2': '#0a1820', '--ink3': '#0e2028',
      '--line': '#142830',
      '--paper': '#e0f5f5', '--paper-dim': '#88bcc0', '--muted': '#508090',
      '--amber': '#64ffda', '--amber-soft': '#90ffe8', '--amber-deep': '#30d0b0',
      '--glow-color': '100,255,218',
    },
  },
  caramel: {
    label: 'Caramel',
    vars: {
      '--ink': '#120a04', '--ink2': '#1c1008', '--ink3': '#261608',
      '--line': '#33200a',
      '--paper': '#f0e4d0', '--paper-dim': '#c8b48a', '--muted': '#8a7850',
      '--amber': '#d4922a', '--amber-soft': '#e8b050', '--amber-deep': '#b07010',
      '--glow-color': '212,146,42',
    },
  },
  parchment: {
    label: 'Parchment',
    // LIGHT THEME — aged paper, ink brown text
    vars: {
      '--ink': '#faf6f0', '--ink2': '#f5f0e8', '--ink3': '#ede8de',
      '--line': '#d4c8b8',
      '--paper': '#1e1208', '--paper-dim': '#5a4030', '--muted': '#8a7060',
      '--amber': '#5c3010', '--amber-soft': '#7a4420', '--amber-deep': '#3e1e08',
      '--glow-color': '92,48,16',
    },
  },
  obsidian: {
    label: 'Obsidian',
    vars: {
      '--ink': '#080808', '--ink2': '#0f0f12', '--ink3': '#161619',
      '--line': '#1c1c22',
      '--paper': '#ffffff', '--paper-dim': '#888888', '--muted': '#505050',
      '--amber': '#ffffff', '--amber-soft': '#eeeeee', '--amber-deep': '#cccccc',
      '--glow-color': '255,255,255',
    },
  },
  graphite: {
    label: 'Graphite',
    vars: {
      '--ink': '#111418', '--ink2': '#181c20', '--ink3': '#202428',
      '--line': '#2e3135',
      '--paper': '#e8eaec', '--paper-dim': '#9aa0a8', '--muted': '#60686e',
      '--amber': '#f97316', '--amber-soft': '#fb9a50', '--amber-deep': '#d05000',
      '--glow-color': '249,115,22',
    },
  },
  cobalt: {
    label: 'Cobalt',
    vars: {
      '--ink': '#060c1a', '--ink2': '#0c1428', '--ink3': '#121c36',
      '--line': '#142040',
      '--paper': '#dce8ff', '--paper-dim': '#8aaae0', '--muted': '#4a6090',
      '--amber': '#3b82f6', '--amber-soft': '#60a0ff', '--amber-deep': '#1a60d0',
      '--glow-color': '59,130,246',
    },
  },
  verdant: {
    label: 'Verdant',
    vars: {
      '--ink': '#060f08', '--ink2': '#0a1810', '--ink3': '#0f2016',
      '--line': '#142a1a',
      '--paper': '#e0f0e4', '--paper-dim': '#88b090', '--muted': '#507858',
      '--amber': '#86efac', '--amber-soft': '#a8ffca', '--amber-deep': '#50c878',
      '--glow-color': '134,239,172',
    },
  },
  bordeaux: {
    label: 'Bordeaux',
    vars: {
      '--ink': '#0d0608', '--ink2': '#160a10', '--ink3': '#200e18',
      '--line': '#280e18',
      '--paper': '#f0e8ec', '--paper-dim': '#c0a0b0', '--muted': '#806070',
      '--amber': '#d4af37', '--amber-soft': '#e8cc5a', '--amber-deep': '#b08c1a',
      '--glow-color': '212,175,55',
    },
  },
};

const LS_KEY = 'sq_theme';

// ── apply ─────────────────────────────────────────────────────────────────────

export function applyTheme(themeData) {
  let vars;
  if (themeData.preset === 'custom') {
    const c = themeData.custom || {};
    // New format: keys are CSS vars (--ink, --amber, etc.)
    vars = Object.keys(c).some(k => k.startsWith('--')) ? c : buildCustomVars(c);
  } else {
    vars = THEMES[themeData.preset]?.vars;
  }
  if (!vars) return;

  const root = document.documentElement;
  for (const [k, v] of Object.entries(vars)) {
    root.style.setProperty(k, v);
  }

  // Mirror legacy vars to the new CSS var names used by app.html
  const MIRROR = [
    ['--ink',        '--bg'],
    ['--ink2',       '--surface'],
    ['--ink3',       '--surface-2'],
    ['--line',       '--border'],
    ['--paper',      '--text'],
    ['--paper-dim',  '--text-dim'],
    ['--amber',      '--accent'],
    ['--amber-soft', '--accent-soft'],
    ['--amber-deep', '--accent-deep'],
  ];
  for (const [src, dst] of MIRROR) {
    if (vars[src]) root.style.setProperty(dst, vars[src]);
  }

  if (vars['--paper']) root.style.setProperty('--text-rgb', hexToRgb(vars['--paper']));

  localStorage.setItem(LS_KEY, JSON.stringify(themeData));
}

// Call before DOM ready — reads localStorage, avoids FOUC
export function loadSavedTheme() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) applyTheme(JSON.parse(raw));
  } catch {}
}

export function resetTheme() {
  applyTheme({ preset: 'ascent' });
}

export function getCurrentThemeData() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { preset: 'ascent' };
}

// ── custom builder helpers ────────────────────────────────────────────────────

// custom: { bg, surface, accent, text, border }
export function buildCustomVars(custom) {
  const bg = custom.bg || '#12100e';
  return {
    '--ink':        bg,
    '--ink2':       custom.surface || lighten(bg, 0.06),
    '--ink3':       lighten(custom.surface || lighten(bg, 0.06), 0.06),
    '--line':       custom.border  || lighten(bg, 0.18),
    '--paper':      custom.text    || '#f4ece0',
    '--paper-dim':  blend(custom.text || '#f4ece0', bg, 0.28),
    '--muted':      blend(custom.text || '#f4ece0', bg, 0.55),
    '--amber':      custom.accent  || '#e8a33d',
    '--amber-soft': lighten(custom.accent || '#e8a33d', 0.18),
    '--amber-deep': darken(custom.accent  || '#e8a33d', 0.18),
    '--glow-color': hexToRgb(custom.accent || '#e8a33d'),
  };
}

// Build a 5-field custom object from the current CSS vars (for pre-filling pickers)
export function readCurrentCustomFields() {
  const s = getComputedStyle(document.documentElement);
  return {
    bg:      s.getPropertyValue('--ink').trim()   || '#12100e',
    surface: s.getPropertyValue('--ink2').trim()  || '#1a1815',
    accent:  s.getPropertyValue('--amber').trim() || '#e8a33d',
    text:    s.getPropertyValue('--paper').trim() || '#f4ece0',
    border:  s.getPropertyValue('--line').trim()  || '#332d26',
  };
}

// ── color math ────────────────────────────────────────────────────────────────

function parseHex(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3
    ? h.split('').map(c => c + c).join('')
    : h;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

function toHex(r, g, b) {
  return '#' + [r, g, b].map(n => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')).join('');
}

export function hexToRgb(hex) {
  const [r, g, b] = parseHex(hex);
  return `${r},${g},${b}`;
}

function lighten(hex, amount) {
  const [r, g, b] = parseHex(hex);
  return toHex(r + (255 - r) * amount, g + (255 - g) * amount, b + (255 - b) * amount);
}

function darken(hex, amount) {
  const [r, g, b] = parseHex(hex);
  return toHex(r * (1 - amount), g * (1 - amount), b * (1 - amount));
}

// Blend fg toward bg by ratio (0 = pure fg, 1 = pure bg)
function blend(fg, bg, ratio) {
  const [r1, g1, b1] = parseHex(fg);
  const [r2, g2, b2] = parseHex(bg);
  return toHex(r1 + (r2 - r1) * ratio, g1 + (g2 - g1) * ratio, b1 + (b2 - b1) * ratio);
}
