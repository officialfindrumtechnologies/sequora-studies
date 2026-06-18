// Qualification → available boards mapping
export const QUAL_BOARDS = {
  'A Level':         ['Edexcel', 'Cambridge', 'OCR', 'AQA'],
  'AS Level':        ['Edexcel', 'Cambridge'],
  'IGCSE / O Level': ['Edexcel IGCSE', 'Cambridge IGCSE', 'Cambridge O Level'],
  'IB Diploma':      ['IB'],
  'MBBS':            ['BMDC Bangladesh'],
};

// Map old flat exam_board DB values → new {qualification, examBoard}
export const LEGACY_BOARD_MAP = {
  edexcel_alevel:   { qualification: 'A Level',         examBoard: 'Edexcel' },
  cambridge_alevel: { qualification: 'A Level',         examBoard: 'Cambridge' },
  edexcel_igcse:    { qualification: 'IGCSE / O Level', examBoard: 'Edexcel IGCSE' },
  cambridge_igcse:  { qualification: 'IGCSE / O Level', examBoard: 'Cambridge IGCSE' },
  o_level:          { qualification: 'IGCSE / O Level', examBoard: 'Cambridge O Level' },
  mbbs:             { qualification: 'MBBS',            examBoard: 'BMDC Bangladesh' },
  acca:             { qualification: null,              examBoard: 'ACCA' },
};

// Resolve a profile row to {qualification, examBoard}, migrating legacy values in JS
export function resolveQualBoard(profile) {
  if (profile?.qualification) {
    return { qualification: profile.qualification, examBoard: profile.exam_board };
  }
  const legacy = LEGACY_BOARD_MAP[profile?.exam_board];
  if (legacy) return { ...legacy };
  return { qualification: null, examBoard: profile?.exam_board || null };
}

// Human-readable display string
export function formatQualBoard(qualification, examBoard) {
  if (!qualification && !examBoard) return '—';
  if (!qualification) return examBoard || '—';
  // Single-board quals: just show the qual name
  if (qualification === 'IB Diploma' || qualification === 'MBBS') return qualification;
  if (!examBoard) return qualification;
  return `${qualification} · ${examBoard}`;
}

export const isMbbs = q => q === 'MBBS';
export const isIB   = q => q === 'IB Diploma';

// Quals where there is no meaningful single exam date
export const NO_DATE_QUALS = new Set(['MBBS', 'IB Diploma']);
