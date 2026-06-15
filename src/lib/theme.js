// Theme engine: definitions, apply, persist.
// All themes dark-mode only. Variable names stay as --ink/--amber etc.
// to avoid touching any existing CSS.

export const THEMES = {
  ascent: {
    label: 'Ascent',
    vars: {
      '--ink': '#12100e', '--ink2': '#1a1815', '--ink3': '#231f1a',
      '--line': '#332d26',
      '--paper': '#f4ece0', '--paper-dim': '#cdc4b5', '--muted': '#9b9184',
      '--amber': '#e8a33d', '--amber-soft': '#f0c277', '--amber-deep': '#c47e1c',
      '--glow-color': '232,163,61',
    },
  },
  midnight: {
    label: 'Midnight',
    vars: {
      '--ink': '#080c14', '--ink2': '#0d1525', '--ink3': '#121e32',
      '--line': '#1a2d47',
      '--paper': '#dce8ff', '--paper-dim': '#9eb0d4', '--muted': '#607098',
      '--amber': '#4a9edd', '--amber-soft': '#78bef5', '--amber-deep': '#2a7bbf',
      '--glow-color': '74,158,221',
    },
  },
  aurora: {
    label: 'Aurora',
    vars: {
      '--ink': '#09090f', '--ink2': '#101018', '--ink3': '#161623',
      '--line': '#1e1e34',
      '--paper': '#e6f2f0', '--paper-dim': '#a0bcba', '--muted': '#608480',
      '--amber': '#2ecc8a', '--amber-soft': '#5ce0a8', '--amber-deep': '#18a86e',
      '--glow-color': '46,204,138',
    },
  },
  ember: {
    label: 'Ember',
    vars: {
      '--ink': '#0d0908', '--ink2': '#181210', '--ink3': '#22180e',
      '--line': '#332010',
      '--paper': '#f5ede5', '--paper-dim': '#c8b09e', '--muted': '#8a6e58',
      '--amber': '#e85d1a', '--amber-soft': '#f5834a', '--amber-deep': '#c43c00',
      '--glow-color': '232,93,26',
    },
  },
  forest: {
    label: 'Forest',
    vars: {
      '--ink': '#070d08', '--ink2': '#0d1610', '--ink3': '#121e14',
      '--line': '#182c1a',
      '--paper': '#e4ede6', '--paper-dim': '#a6beaa', '--muted': '#688a70',
      '--amber': '#5aad6a', '--amber-soft': '#7ecb8e', '--amber-deep': '#3d8a4f',
      '--glow-color': '90,173,106',
    },
  },
  rosegold: {
    label: 'Rose Gold',
    vars: {
      '--ink': '#100d0d', '--ink2': '#191515', '--ink3': '#231e1e',
      '--line': '#302828',
      '--paper': '#f5eae8', '--paper-dim': '#c8b0ac', '--muted': '#8a7270',
      '--amber': '#c97b8a', '--amber-soft': '#e8a0ae', '--amber-deep': '#a85060',
      '--glow-color': '201,123,138',
    },
  },
  glacier: {
    label: 'Glacier',
    vars: {
      '--ink': '#080c10', '--ink2': '#0d1318', '--ink3': '#121a22',
      '--line': '#1a2530',
      '--paper': '#ddeef5', '--paper-dim': '#9ab8c8', '--muted': '#607888',
      '--amber': '#5bc0e0', '--amber-soft': '#88d5f0', '--amber-deep': '#2ea0c4',
      '--glow-color': '91,192,224',
    },
  },
  sakura: {
    label: 'Sakura',
    vars: {
      '--ink': '#0d0c0c', '--ink2': '#171515', '--ink3': '#201e1e',
      '--line': '#2e2828',
      '--paper': '#f5e8ee', '--paper-dim': '#c8aabc', '--muted': '#8a6e80',
      '--amber': '#d4789a', '--amber-soft': '#e8a0b8', '--amber-deep': '#b05478',
      '--glow-color': '212,120,154',
    },
  },
  neontokyo: {
    label: 'Neon Tokyo',
    vars: {
      '--ink': '#050507', '--ink2': '#0a0a0e', '--ink3': '#0f0f16',
      '--line': '#18183a',
      '--paper': '#e8efff', '--paper-dim': '#a0b0e0', '--muted': '#6070c0',
      '--amber': '#00e5ff', '--amber-soft': '#60f0ff', '--amber-deep': '#00b8d4',
      '--glow-color': '0,229,255',
    },
  },
  sandstone: {
    label: 'Sandstone',
    vars: {
      '--ink': '#0e0b08', '--ink2': '#181410', '--ink3': '#221d18',
      '--line': '#332a22',
      '--paper': '#f0e8d8', '--paper-dim': '#c4b49a', '--muted': '#8a7860',
      '--amber': '#c8a878', '--amber-soft': '#e0c49a', '--amber-deep': '#a88050',
      '--glow-color': '200,168,120',
    },
  },
  lavender: {
    label: 'Lavender',
    vars: {
      '--ink': '#0c0c12', '--ink2': '#13131c', '--ink3': '#1a1a28',
      '--line': '#252535',
      '--paper': '#eae8f5', '--paper-dim': '#b4b0d4', '--muted': '#7870a0',
      '--amber': '#9b8fe0', '--amber-soft': '#bcb0f5', '--amber-deep': '#7868c0',
      '--glow-color': '155,143,224',
    },
  },
  crimson: {
    label: 'Crimson',
    vars: {
      '--ink': '#0e0808', '--ink2': '#180d0d', '--ink3': '#221212',
      '--line': '#331818',
      '--paper': '#f5e8e8', '--paper-dim': '#c8aaaa', '--muted': '#8a6868',
      '--amber': '#c82020', '--amber-soft': '#e84040', '--amber-deep': '#a00808',
      '--glow-color': '200,32,32',
    },
  },
  monochrome: {
    label: 'Monochrome',
    vars: {
      '--ink': '#0a0a0a', '--ink2': '#141414', '--ink3': '#1e1e1e',
      '--line': '#2e2e2e',
      '--paper': '#f0f0f0', '--paper-dim': '#b0b0b0', '--muted': '#707070',
      '--amber': '#d0d0d0', '--amber-soft': '#f0f0f0', '--amber-deep': '#a0a0a0',
      '--glow-color': '200,200,200',
    },
  },
  hacker: {
    label: 'Hacker',
    vars: {
      '--ink': '#000000', '--ink2': '#080808', '--ink3': '#101010',
      '--line': '#1a3018',
      '--paper': '#c0ffc0', '--paper-dim': '#80e080', '--muted': '#508050',
      '--amber': '#00ff41', '--amber-soft': '#60ff80', '--amber-deep': '#00cc30',
      '--glow-color': '0,255,65',
    },
  },
  sunset: {
    label: 'Sunset',
    vars: {
      '--ink': '#0e0810', '--ink2': '#170f1a', '--ink3': '#20151f',
      '--line': '#2e1e32',
      '--paper': '#f5e8ee', '--paper-dim': '#c8a8bc', '--muted': '#8a6880',
      '--amber': '#e8784a', '--amber-soft': '#f5a070', '--amber-deep': '#c45025',
      '--glow-color': '232,120,74',
    },
  },
  ocean: {
    label: 'Ocean',
    vars: {
      '--ink': '#060c0e', '--ink2': '#0a1416', '--ink3': '#0f1c1e',
      '--line': '#142830',
      '--paper': '#e0f0f0', '--paper-dim': '#9cc8c8', '--muted': '#609090',
      '--amber': '#3dbdaa', '--amber-soft': '#65d8c4', '--amber-deep': '#1f9a88',
      '--glow-color': '61,189,170',
    },
  },
  caramel: {
    label: 'Caramel',
    vars: {
      '--ink': '#0e0a06', '--ink2': '#18120a', '--ink3': '#221a10',
      '--line': '#33200a',
      '--paper': '#f0e4d0', '--paper-dim': '#c8b48a', '--muted': '#8a7850',
      '--amber': '#d4a035', '--amber-soft': '#ecc058', '--amber-deep': '#b07a10',
      '--glow-color': '212,160,53',
    },
  },
};

const LS_KEY = 'sq_theme';

// ── apply ─────────────────────────────────────────────────────────────────────

export function applyTheme(themeData) {
  const vars = themeData.preset === 'custom'
    ? buildCustomVars(themeData.custom)
    : THEMES[themeData.preset]?.vars;
  if (!vars) return;

  const root = document.documentElement;
  for (const [k, v] of Object.entries(vars)) {
    root.style.setProperty(k, v);
  }

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
