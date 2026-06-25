// Past Papers database — URL generation helpers + subject configs
// Cambridge URL format is reliable. Edexcel URLs use approximate dates;
// some will 404 and trigger the "Open in new tab" fallback in the viewer.

const _y = (s, e) => Array.from({ length: e - s + 1 }, (_, i) => s + i);

// IB URL builder — URLs are UNCERTAIN and may 404; "Open in new tab" fallback handles misses
function _ibUrl(folder, code, level, sess, year, paper, type) {
  const t = type === 'QP' ? 'qp' : 'ms';
  return `https://papers.gceguide.cc/IB/${folder}/${year}/${code}_${level}_${sess}_${year}_${paper}_${t}.pdf`;
}

// Generate IB entries for one subject. papersByLevel: { HL: ['P1','P2','P3'], SL: ['P1','P2'] }
function _genIB(folder, code, years, sessions, papersByLevel) {
  const out = [];
  for (const yr of years) {
    for (const [sess, sessName] of sessions) {
      for (const [lvl, papers] of Object.entries(papersByLevel)) {
        for (const paper of papers) {
          out.push({ year: yr, session: sessName, paper, level: lvl, component: 'QP', url: _ibUrl(folder, code, lvl, sess, yr, paper, 'QP') });
          out.push({ year: yr, session: sessName, paper, level: lvl, component: 'MS', url: _ibUrl(folder, code, lvl, sess, yr, paper, 'MS') });
        }
      }
    }
  }
  return out;
}

const IB_SESS  = [['May', 'May'], ['Nov', 'November']];
const IB_YEARS = _y(2019, 2024); // Math AA/AI full range
const IB_YEARS_S = _y(2019, 2023); // Sciences/Humanities (2024 not yet widely available)

// PapaCambridge search URL builder
function _papaCamUrl(qualification, examBoard, subjectName, code, year, session) {
  const subjSlug = subjectName.toLowerCase().replace(/\s+/g, '-');
  const sessMap = {
    'May/June': 'may-june', 'Oct/Nov': 'october-november',
    'January': 'january', 'June': 'june', 'May': 'may', 'November': 'november',
  };
  const sessSlug = sessMap[session] ?? session.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  let prefix;
  if (examBoard === 'Cambridge') prefix = 'as-and-a-level';
  else if (examBoard === 'Cambridge IGCSE') prefix = 'cambridge-igcse';
  else if (examBoard === 'Edexcel') prefix = 'edexcel-international-a-level';
  else if (examBoard === 'Edexcel IGCSE') prefix = 'edexcel-igcse';
  else prefix = 'ib';
  return `https://pastpapers.papacambridge.com/papers/caie/${prefix}-${subjSlug}-${code.toLowerCase()}-${year}-${sessSlug}`;
}

// Cambridge URL builders
function _camUrl(base, folder, year, code, sess, type, pv) {
  const y2 = String(year).slice(2);
  return `https://papers.gceguide.cc/${base}/${folder}/${year}/${code}_${sess}${y2}_${type}_${pv}.pdf`;
}

// Generate Cambridge entries: papers = [[papNum, label], ...]
function _genCam(base, code, folder, years, sessions, papers) {
  const out = [];
  for (const yr of years) {
    for (const [sess, sessName] of sessions) {
      for (const [pNum, pLabel] of papers) {
        const pv = `${pNum}1`; // variant 1 — other variants exist on PapaCambridge
        out.push({ year: yr, session: sessName, paper: pLabel, component: 'QP', url: _camUrl(base, folder, yr, code, sess, 'qp', pv) });
        out.push({ year: yr, session: sessName, paper: pLabel, component: 'MS', url: _camUrl(base, folder, yr, code, sess, 'ms', pv) });
      }
    }
  }
  return out;
}

// Edexcel URL builder — approximate dates; may 404 → fallback button shown
function _edxUrl(base, folder, year, code, paper, type, date) {
  return `https://papers.gceguide.cc/${base}/${folder}/${year}/${code}_${paper}_${type}_${date}.pdf`;
}

// Approximate Edexcel IGCSE exam dates by year+session
const EDX_IGCSE_DATES = {
  2018: { Jan: '20180111', Jun: '20180613' },
  2019: { Jan: '20190124', Jun: '20190606' },
  2020: { Jan: '20200113', Jun: null },       // COVID — no June 2020
  2021: { Jan: '20210108', Jun: '20210608' },
  2022: { Jan: '20220112', Jun: '20220607' },
  2023: { Jan: '20230111', Jun: '20230608' },
  2024: { Jan: '20240111', Jun: '20240606' },
};

// Approximate Edexcel A Level exam dates (June only)
const EDX_AL_DATES = {
  2018: '20180608', 2019: '20190611', 2020: null,
  2021: '20210610', 2022: '20220609', 2023: '20230608', 2024: '20240606',
};

function _genEdxIgcse(code, folder, years, papers) {
  const base = 'edexcel-igcse';
  const out = [];
  for (const yr of years) {
    for (const [sessKey, sessName] of [['Jan', 'January'], ['Jun', 'June']]) {
      const date = EDX_IGCSE_DATES[yr]?.[sessKey];
      if (!date) continue; // skip missing sessions (e.g. Jun 2020)
      for (const pLabel of papers) {
        out.push({ year: yr, session: sessName, paper: pLabel, component: 'QP', url: _edxUrl(base, folder, yr, code, pLabel, 'que', date) });
        out.push({ year: yr, session: sessName, paper: pLabel, component: 'MS', url: _edxUrl(base, folder, yr, code, pLabel, 'ms', date) });
      }
    }
  }
  return out;
}

function _genEdxAl(code, folder, years, papers) {
  const base = 'edexcel-a-level';
  const out = [];
  for (const yr of years) {
    const date = EDX_AL_DATES[yr];
    if (!date) continue;
    for (const pLabel of papers) {
      out.push({ year: yr, session: 'June', paper: pLabel, component: 'QP', url: _edxUrl(base, folder, yr, code, pLabel, 'que', date) });
      out.push({ year: yr, session: 'June', paper: pLabel, component: 'MS', url: _edxUrl(base, folder, yr, code, pLabel, 'ms', date) });
    }
  }
  return out;
}

// ── Session configs ──────────────────────────────────────────────────────────
const CAM_SESS   = [['s', 'May/June'], ['w', 'Oct/Nov']];
const CAM_YEARS  = _y(2019, 2024);
const EDX_IG_YEARS = _y(2018, 2024);
const EDX_AL_YEARS = _y(2018, 2024);

// ── Past Papers DB — keyed by exam code ─────────────────────────────────────
export const PAST_PAPERS_DB = {

  // ── Cambridge IGCSE ────────────────────────────────────────────────────────

  '0580': {
    subjectName: 'Mathematics',
    qualification: 'IGCSE / O Level',
    examBoard: 'Cambridge IGCSE',
    papers: _genCam('cambridge-IGCSE', '0580', 'mathematics-(0580)', CAM_YEARS, CAM_SESS, [
      [1, 'P1 (Core)'], [2, 'P2 (Extended)'], [3, 'P3 (Core)'], [4, 'P4 (Extended)'],
    ]),
  },

  '0625': {
    subjectName: 'Physics',
    qualification: 'IGCSE / O Level',
    examBoard: 'Cambridge IGCSE',
    papers: _genCam('cambridge-IGCSE', '0625', 'physics-(0625)', CAM_YEARS, CAM_SESS, [
      [1, 'P1'], [2, 'P2'], [3, 'P3'],
    ]),
  },

  '0620': {
    subjectName: 'Chemistry',
    qualification: 'IGCSE / O Level',
    examBoard: 'Cambridge IGCSE',
    papers: _genCam('cambridge-IGCSE', '0620', 'chemistry-(0620)', CAM_YEARS, CAM_SESS, [
      [1, 'P1'], [2, 'P2'], [3, 'P3'],
    ]),
  },

  '0610': {
    subjectName: 'Biology',
    qualification: 'IGCSE / O Level',
    examBoard: 'Cambridge IGCSE',
    papers: _genCam('cambridge-IGCSE', '0610', 'biology-(0610)', CAM_YEARS, CAM_SESS, [
      [1, 'P1'], [2, 'P2'], [3, 'P3'],
    ]),
  },

  '0455': {
    subjectName: 'Economics',
    qualification: 'IGCSE / O Level',
    examBoard: 'Cambridge IGCSE',
    papers: _genCam('cambridge-IGCSE', '0455', 'economics-(0455)', CAM_YEARS, CAM_SESS, [
      [1, 'P1'], [2, 'P2'],
    ]),
  },

  '0450': {
    subjectName: 'Business Studies',
    qualification: 'IGCSE / O Level',
    examBoard: 'Cambridge IGCSE',
    papers: _genCam('cambridge-IGCSE', '0450', 'business-studies-(0450)', CAM_YEARS, CAM_SESS, [
      [1, 'P1'], [2, 'P2'],
    ]),
  },

  // ── Edexcel IGCSE ──────────────────────────────────────────────────────────

  '4MA1': {
    subjectName: 'Mathematics A',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4MA1', 'mathematics-a-(4ma1)', EDX_IG_YEARS, ['1H', '2H', '1F', '2F']),
  },

  '4PH1': {
    subjectName: 'Physics',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4PH1', 'physics-(4ph1)', EDX_IG_YEARS, ['1P', '2P']),
  },

  '4CH1': {
    subjectName: 'Chemistry',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4CH1', 'chemistry-(4ch1)', EDX_IG_YEARS, ['1C', '2C']),
  },

  '4BI1': {
    subjectName: 'Biology',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4BI1', 'biology-(4bi1)', EDX_IG_YEARS, ['1B', '2B']),
  },

  '4AC1': {
    subjectName: 'Accounting',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4AC1', 'accounting-(4ac1)', EDX_IG_YEARS, ['01']),
  },

  '4EC1': {
    subjectName: 'Economics',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4EC1', 'economics-(4ec1)', EDX_IG_YEARS, ['01', '02']),
  },

  '4BS1': {
    subjectName: 'Business Studies',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4BS1', 'business-studies-(4bs1)', EDX_IG_YEARS, ['01', '02']),
  },

  // ── Cambridge A Level ──────────────────────────────────────────────────────

  '9709': {
    subjectName: 'Mathematics',
    qualification: 'A Level',
    examBoard: 'Cambridge',
    papers: _genCam('a-levels', '9709', 'mathematics-(9709)', CAM_YEARS, CAM_SESS, [
      [1, 'P1 (Pure 1)'], [2, 'P2 (Pure 2)'], [3, 'P3 (Pure 3)'],
      [4, 'P4 (Mechanics)'], [5, 'P5 (Stats 1)'], [6, 'P6 (Stats 2)'],
    ]),
  },

  '9702': {
    subjectName: 'Physics',
    qualification: 'A Level',
    examBoard: 'Cambridge',
    papers: _genCam('a-levels', '9702', 'physics-(9702)', CAM_YEARS, CAM_SESS, [
      [1, 'P1 (MCQ)'], [2, 'P2 (AS Structured)'], [3, 'P3 (Practical)'],
      [4, 'P4 (A2 Structured)'], [5, 'P5 (Planning)'],
    ]),
  },

  '9701': {
    subjectName: 'Chemistry',
    qualification: 'A Level',
    examBoard: 'Cambridge',
    papers: _genCam('a-levels', '9701', 'chemistry-(9701)', CAM_YEARS, CAM_SESS, [
      [1, 'P1 (MCQ)'], [2, 'P2 (AS Structured)'], [3, 'P3 (Practical)'],
      [4, 'P4 (A2 Structured)'], [5, 'P5 (Planning)'],
    ]),
  },

  '9700': {
    subjectName: 'Biology',
    qualification: 'A Level',
    examBoard: 'Cambridge',
    papers: _genCam('a-levels', '9700', 'biology-(9700)', CAM_YEARS, CAM_SESS, [
      [1, 'P1 (MCQ)'], [2, 'P2 (AS Structured)'], [3, 'P3 (Practical)'],
      [4, 'P4 (A2 Structured)'], [5, 'P5 (Planning)'],
    ]),
  },

  '9708': {
    subjectName: 'Economics',
    qualification: 'A Level',
    examBoard: 'Cambridge',
    papers: _genCam('a-levels', '9708', 'economics-(9708)', CAM_YEARS, CAM_SESS, [
      [1, 'P1 (MCQ)'], [2, 'P2 (Data Response)'],
      [3, 'P3 (MCQ)'],  [4, 'P4 (Essay)'],
    ]),
  },

  // ── Edexcel A Level ────────────────────────────────────────────────────────

  // ── IB Diploma ─────────────────────────────────────────────────────────────
  // URL format UNCERTAIN — mirrors vary. Open-in-new-tab fallback handles 404s.
  // Format: gceguide.cc/IB/[Folder]/[year]/[Code]_[Level]_[Session]_[Year]_[Paper]_[type].pdf

  'IB-MATH-AA': {
    subjectName: 'Mathematics: Analysis & Approaches',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('Mathematics%20AA', 'Mathematics_AA', IB_YEARS, IB_SESS, {
      HL: ['P1', 'P2', 'P3'],
      SL: ['P1', 'P2'],
    }),
  },

  'IB-MATH-AI': {
    subjectName: 'Mathematics: Applications & Interpretation',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('Mathematics%20AI', 'Mathematics_AI', IB_YEARS, IB_SESS, {
      HL: ['P1', 'P2', 'P3'],
      SL: ['P1', 'P2'],
    }),
  },

  'IB-PHYS': {
    subjectName: 'Physics',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('Physics', 'Physics', IB_YEARS_S, IB_SESS, {
      HL: ['P1', 'P2', 'P3'],
      SL: ['P1', 'P2', 'P3'],
    }),
  },

  'IB-CHEM': {
    subjectName: 'Chemistry',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('Chemistry', 'Chemistry', IB_YEARS_S, IB_SESS, {
      HL: ['P1', 'P2', 'P3'],
      SL: ['P1', 'P2', 'P3'],
    }),
  },

  'IB-BIO': {
    subjectName: 'Biology',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('Biology', 'Biology', IB_YEARS_S, IB_SESS, {
      HL: ['P1', 'P2', 'P3'],
      SL: ['P1', 'P2', 'P3'],
    }),
  },

  'IB-ECON': {
    subjectName: 'Economics',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('Economics', 'Economics', IB_YEARS_S, IB_SESS, {
      HL: ['P1', 'P2', 'P3'],
      SL: ['P1', 'P2', 'P3'],
    }),
  },

  'IB-HIST': {
    subjectName: 'History',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('History', 'History', IB_YEARS_S, IB_SESS, {
      HL: ['P1', 'P2', 'P3'],
      SL: ['P1', 'P2', 'P3'],
    }),
  },

  'IB-ENG-A-LIT': {
    subjectName: 'English A Literature',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('English%20A%20Lit', 'English_A_Lit', IB_YEARS_S, IB_SESS, {
      HL: ['P1', 'P2'],
      SL: ['P1', 'P2'],
    }),
  },

  'IB-BM': {
    subjectName: 'Business Management',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('Business%20Management', 'Business_Management', IB_YEARS_S, IB_SESS, {
      HL: ['P1', 'P2'],
      SL: ['P1', 'P2'],
    }),
  },

  'IB-PSYCH': {
    subjectName: 'Psychology',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('Psychology', 'Psychology', IB_YEARS_S, IB_SESS, {
      HL: ['P1', 'P2'],
      SL: ['P1', 'P2'],
    }),
  },

  '9MA0': {
    subjectName: 'Mathematics',
    qualification: 'A Level',
    examBoard: 'Edexcel',
    papers: _genEdxAl('9MA0', 'mathematics-(9ma0)', EDX_AL_YEARS, ['01', '02', '03']),
  },

  '9PH0': {
    subjectName: 'Physics',
    qualification: 'A Level',
    examBoard: 'Edexcel',
    papers: _genEdxAl('9PH0', 'physics-(9ph0)', EDX_AL_YEARS, ['01', '02', '03']),
  },

  '9CH0': {
    subjectName: 'Chemistry',
    qualification: 'A Level',
    examBoard: 'Edexcel',
    papers: _genEdxAl('9CH0', 'chemistry-(9ch0)', EDX_AL_YEARS, ['01', '02', '03']),
  },

  '9BI0': {
    subjectName: 'Biology',
    qualification: 'A Level',
    examBoard: 'Edexcel',
    papers: _genEdxAl('9BI0', 'biology-(9bi0)', EDX_AL_YEARS, ['01', '02', '03']),
  },
};

// Attach PapaCambridge search URLs to every entry
for (const [code, subj] of Object.entries(PAST_PAPERS_DB)) {
  for (const p of subj.papers) {
    p.pcUrl = _papaCamUrl(subj.qualification, subj.examBoard, subj.subjectName, code, p.year, p.session);
  }
}

/**
 * Get past paper entries for a given exam code.
 * Returns null if no data available for that code.
 */
export function getPastPapersForCode(examCode) {
  if (!examCode) return null;
  return PAST_PAPERS_DB[examCode.trim().toUpperCase()] ?? null;
}

/**
 * Filter IB papers by user's chosen level.
 * SL users see only SL papers. HL users see HL papers + SL papers (optional practice).
 * Non-IB or no level: returns all papers unchanged.
 * Returns { hlPapers, slPapers } for IB, or { allPapers } for others.
 */
export function filterIBPapers(papers, userLevel) {
  const isIBPaper = papers.some(p => p.level);
  if (!isIBPaper || !userLevel || userLevel === 'Core') {
    return { allPapers: papers };
  }
  const hl = papers.filter(p => p.level === 'HL');
  const sl = papers.filter(p => p.level === 'SL');
  if (userLevel === 'SL') return { allPapers: sl };
  // HL: show HL first, then SL as optional
  return { hlPapers: hl, slPapers: sl };
}
