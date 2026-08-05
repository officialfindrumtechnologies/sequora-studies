// Past Papers database — URL generation helpers + subject configs
// Cambridge URL format is reliable. Edexcel URLs use approximate dates;
// some will 404 and trigger the "Open in new tab" fallback in the viewer.

const _y = (s, e) => Array.from({ length: e - s + 1 }, (_, i) => s + i);

// IB session page. The previous builder guessed direct PDF URLs on
// papers.gceguide.cc, which now returns HTTP 522 (dead origin) for every
// request — 21 subjects' worth of links were broken. These paths were each
// verified to return 200, with a bad year returning 404, so they are real pages
// rather than a soft-404 catch-all. The page lists every paper and variant for
// that session, which is more useful than a guessed direct link anyway.
function _ibUrl(catPath, sess, year) {
  const sessSlug = sess === 'May' ? 'may' : 'november';
  return `https://www.papersdaddy.com/ib/past-papers/${catPath}/${year}-${sessSlug}`;
}

// Generate IB entries for one subject. catPath is the papersdaddy category and
// subject, e.g. 'sciences/biology'. papersByLevel: { HL: [...], SL: [...] }
function _genIB(catPath, years, sessions, papersByLevel) {
  const out = [];
  for (const yr of years) {
    for (const [sess, sessName] of sessions) {
      for (const [lvl, papers] of Object.entries(papersByLevel)) {
        for (const paper of papers) {
          const u = _ibUrl(catPath, sess, yr);
          out.push({ year: yr, session: sessName, paper, level: lvl, component: 'QP', url: u });
          out.push({ year: yr, session: sessName, paper, level: lvl, component: 'MS', url: u });
        }
      }
    }
  }
  return out;
}

const IB_SESS  = [['May', 'May'], ['Nov', 'November']];
const IB_YEARS = _y(2021, 2024); // Maths AA/AI: first assessment 2021, so 2019-20 do not exist
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
  const levelMap = { 'cambridge-IGCSE': 'igcse', 'a-levels': 'a-level' };
  const sessMap  = { s: 'may-june', w: 'oct-nov', m: 'feb-march' };
  const level    = levelMap[base] ?? base;
  const sessFull = sessMap[sess] ?? sess;
  return `https://www.papersdaddy.com/cambridge/${level}/${folder}/${year}-${sessFull}/${code}_${sess}${y2}_${type}_${pv}.pdf`;
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

// Edexcel session/subject pages. The old builder composed direct PDF URLs from
// approximate exam dates — the file's own comment admitted "some will 404" —
// on a host that is now entirely down. IGCSE has real per-session pages;
// IAL has a subject page with per-year anchors. Both verified, with bad values
// returning 404.
function _edxIgcseUrl(slug, year, sessKey) {
  return `https://www.papersdaddy.com/edexcel/igcse/${slug}/${year}-${sessKey === 'Jan' ? 'january' : 'june'}`;
}
function _edxIalUrl(slug, year) {
  return `https://www.papersdaddy.com/edexcel/ial/${slug}#year-${year}`;
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

function _genEdxIgcse(code, slug, years, papers) {
  const out = [];
  for (const yr of years) {
    for (const [sessKey, sessName] of [['Jan', 'January'], ['Jun', 'June']]) {
      if (!EDX_IGCSE_DATES[yr]?.[sessKey]) continue; // skip sessions that did not run (e.g. Jun 2020)
      const u = _edxIgcseUrl(slug, yr, sessKey);
      for (const pLabel of papers) {
        out.push({ year: yr, session: sessName, paper: pLabel, component: 'QP', url: u });
        out.push({ year: yr, session: sessName, paper: pLabel, component: 'MS', url: u });
      }
    }
  }
  return out;
}

function _genEdxAl(code, slug, years, papers) {
  const out = [];
  for (const yr of years) {
    if (!EDX_AL_DATES[yr]) continue;
    const u = _edxIalUrl(slug, yr);
    for (const pLabel of papers) {
      out.push({ year: yr, session: 'June', paper: pLabel, component: 'QP', url: u });
      out.push({ year: yr, session: 'June', paper: pLabel, component: 'MS', url: u });
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
    papers: _genCam('cambridge-IGCSE', '0580', 'mathematics-0580', CAM_YEARS, CAM_SESS, [
      [1, 'P1 (Core)'], [2, 'P2 (Extended)'], [3, 'P3 (Core)'], [4, 'P4 (Extended)'],
    ]),
  },

  '0625': {
    subjectName: 'Physics',
    qualification: 'IGCSE / O Level',
    examBoard: 'Cambridge IGCSE',
    papers: _genCam('cambridge-IGCSE', '0625', 'physics-0625', CAM_YEARS, CAM_SESS, [
      [1, 'P1'], [2, 'P2'], [3, 'P3'],
    ]),
  },

  '0620': {
    subjectName: 'Chemistry',
    qualification: 'IGCSE / O Level',
    examBoard: 'Cambridge IGCSE',
    papers: _genCam('cambridge-IGCSE', '0620', 'chemistry-0620', CAM_YEARS, CAM_SESS, [
      [1, 'P1'], [2, 'P2'], [3, 'P3'],
    ]),
  },

  '0610': {
    subjectName: 'Biology',
    qualification: 'IGCSE / O Level',
    examBoard: 'Cambridge IGCSE',
    papers: _genCam('cambridge-IGCSE', '0610', 'biology-0610', CAM_YEARS, CAM_SESS, [
      [1, 'P1'], [2, 'P2'], [3, 'P3'],
    ]),
  },

  '0455': {
    subjectName: 'Economics',
    qualification: 'IGCSE / O Level',
    examBoard: 'Cambridge IGCSE',
    papers: _genCam('cambridge-IGCSE', '0455', 'economics-0455', CAM_YEARS, CAM_SESS, [
      [1, 'P1'], [2, 'P2'],
    ]),
  },

  '0450': {
    subjectName: 'Business Studies',
    qualification: 'IGCSE / O Level',
    examBoard: 'Cambridge IGCSE',
    papers: _genCam('cambridge-IGCSE', '0450', 'business-studies-0450', CAM_YEARS, CAM_SESS, [
      [1, 'P1'], [2, 'P2'],
    ]),
  },

  // ── Edexcel IGCSE ──────────────────────────────────────────────────────────

  '4MA1': {
    subjectName: 'Mathematics A',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4MA1', 'mathematics-a', EDX_IG_YEARS, ['1H', '2H', '1F', '2F']),
  },

  '4PH1': {
    subjectName: 'Physics',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4PH1', 'physics', EDX_IG_YEARS, ['1P', '2P']),
  },

  '4CH1': {
    subjectName: 'Chemistry',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4CH1', 'chemistry', EDX_IG_YEARS, ['1C', '2C']),
  },

  '4BI1': {
    subjectName: 'Biology',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4BI1', 'biology', EDX_IG_YEARS, ['1B', '2B']),
  },

  '4AC1': {
    subjectName: 'Accounting',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: [], // no source: papersdaddy has no Edexcel IGCSE Accounting
  },

  '4EC1': {
    subjectName: 'Economics',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4EC1', 'economics', EDX_IG_YEARS, ['01', '02']),
  },

  '4BS1': {
    subjectName: 'Business Studies',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: [], // no source: papersdaddy has no Edexcel IGCSE Business Studies
  },

  // ── Cambridge A Level ──────────────────────────────────────────────────────

  '9709': {
    subjectName: 'Mathematics',
    qualification: 'A Level',
    examBoard: 'Cambridge',
    papers: _genCam('a-levels', '9709', 'mathematics-9709', CAM_YEARS, CAM_SESS, [
      [1, 'P1 (Pure 1)'], [2, 'P2 (Pure 2)'], [3, 'P3 (Pure 3)'],
      [4, 'P4 (Mechanics)'], [5, 'P5 (Stats 1)'], [6, 'P6 (Stats 2)'],
    ]),
  },

  '9702': {
    subjectName: 'Physics',
    qualification: 'A Level',
    examBoard: 'Cambridge',
    papers: _genCam('a-levels', '9702', 'physics-9702', CAM_YEARS, CAM_SESS, [
      [1, 'P1 (MCQ)'], [2, 'P2 (AS Structured)'], [3, 'P3 (Practical)'],
      [4, 'P4 (A2 Structured)'], [5, 'P5 (Planning)'],
    ]),
  },

  '9701': {
    subjectName: 'Chemistry',
    qualification: 'A Level',
    examBoard: 'Cambridge',
    papers: _genCam('a-levels', '9701', 'chemistry-9701', CAM_YEARS, CAM_SESS, [
      [1, 'P1 (MCQ)'], [2, 'P2 (AS Structured)'], [3, 'P3 (Practical)'],
      [4, 'P4 (A2 Structured)'], [5, 'P5 (Planning)'],
    ]),
  },

  '9700': {
    subjectName: 'Biology',
    qualification: 'A Level',
    examBoard: 'Cambridge',
    papers: _genCam('a-levels', '9700', 'biology-9700', CAM_YEARS, CAM_SESS, [
      [1, 'P1 (MCQ)'], [2, 'P2 (AS Structured)'], [3, 'P3 (Practical)'],
      [4, 'P4 (A2 Structured)'], [5, 'P5 (Planning)'],
    ]),
  },

  '9708': {
    subjectName: 'Economics',
    qualification: 'A Level',
    examBoard: 'Cambridge',
    papers: _genCam('a-levels', '9708', 'economics-9708', CAM_YEARS, CAM_SESS, [
      [1, 'P1 (MCQ)'], [2, 'P2 (Data Response)'],
      [3, 'P3 (MCQ)'],  [4, 'P4 (Essay)'],
    ]),
  },

  // ── Edexcel A Level ────────────────────────────────────────────────────────

  // ── IB Diploma ─────────────────────────────────────────────────────────────
  // Each entry links to the papersdaddy session page for that subject and
  // session, which lists every paper and variant. Paths verified to return 200,
  // with a bad year returning 404.

  'IB-MATH-AA': {
    subjectName: 'Mathematics: Analysis & Approaches',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('mathematics/mathematics-analysis-and-approaches', IB_YEARS, IB_SESS, {
      HL: ['P1', 'P2', 'P3'],
      SL: ['P1', 'P2'],
    }),
  },

  'IB-MATH-AI': {
    subjectName: 'Mathematics: Applications & Interpretation',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('mathematics/mathematics-applications-and-interpretation', IB_YEARS, IB_SESS, {
      HL: ['P1', 'P2', 'P3'],
      SL: ['P1', 'P2'],
    }),
  },

  'IB-PHYS': {
    subjectName: 'Physics',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('sciences/physics', IB_YEARS_S, IB_SESS, {
      HL: ['P1', 'P2', 'P3'],
      SL: ['P1', 'P2', 'P3'],
    }),
  },

  'IB-CHEM': {
    subjectName: 'Chemistry',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('sciences/chemistry', IB_YEARS_S, IB_SESS, {
      HL: ['P1', 'P2', 'P3'],
      SL: ['P1', 'P2', 'P3'],
    }),
  },

  'IB-BIO': {
    subjectName: 'Biology',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('sciences/biology', IB_YEARS_S, IB_SESS, {
      HL: ['P1', 'P2', 'P3'],
      SL: ['P1', 'P2', 'P3'],
    }),
  },

  'IB-ECON': {
    subjectName: 'Economics',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('individuals-societies/economics', IB_YEARS_S, IB_SESS, {
      HL: ['P1', 'P2', 'P3'],
      SL: ['P1', 'P2', 'P3'],
    }),
  },

  'IB-HIST': {
    subjectName: 'History',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('individuals-societies/history', IB_YEARS_S, IB_SESS, {
      HL: ['P1', 'P2', 'P3'],
      SL: ['P1', 'P2', 'P3'],
    }),
  },

  'IB-ENG-A-LIT': {
    subjectName: 'English A Literature',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('language-literature/english-a-literature', IB_YEARS_S, IB_SESS, {
      HL: ['P1', 'P2'],
      SL: ['P1', 'P2'],
    }),
  },

  'IB-BM': {
    subjectName: 'Business Management',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('individuals-societies/business-management', IB_YEARS_S, IB_SESS, {
      HL: ['P1', 'P2'],
      SL: ['P1', 'P2'],
    }),
  },

  'IB-PSYCH': {
    subjectName: 'Psychology',
    qualification: 'IB Diploma',
    examBoard: 'IB',
    papers: _genIB('individuals-societies/psychology', IB_YEARS_S, IB_SESS, {
      HL: ['P1', 'P2'],
      SL: ['P1', 'P2'],
    }),
  },

  '9MA0': {
    subjectName: 'Mathematics',
    qualification: 'A Level',
    examBoard: 'Edexcel',
    papers: _genEdxAl('9MA0', 'mathematics', EDX_AL_YEARS, ['01', '02', '03']),
  },

  '9PH0': {
    subjectName: 'Physics',
    qualification: 'A Level',
    examBoard: 'Edexcel',
    papers: _genEdxAl('9PH0', 'physics', EDX_AL_YEARS, ['01', '02', '03']),
  },

  '9CH0': {
    subjectName: 'Chemistry',
    qualification: 'A Level',
    examBoard: 'Edexcel',
    papers: _genEdxAl('9CH0', 'chemistry', EDX_AL_YEARS, ['01', '02', '03']),
  },

  '9BI0': {
    subjectName: 'Biology',
    qualification: 'A Level',
    examBoard: 'Edexcel',
    papers: _genEdxAl('9BI0', 'biology', EDX_AL_YEARS, ['01', '02', '03']),
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
