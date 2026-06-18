// Past Papers database — URL generation helpers + subject configs
// Cambridge URL format is reliable. Edexcel URLs use approximate dates;
// some will 404 and trigger the "Open in new tab" fallback in the viewer.

const _y = (s, e) => Array.from({ length: e - s + 1 }, (_, i) => s + i);

// Cambridge URL builders
function _camUrl(base, folder, year, code, sess, type, pv) {
  const y2 = String(year).slice(2);
  return `https://papers.gceguide.com/${base}/${folder}/${year}/${code}_${sess}${y2}_${type}_${pv}.pdf`;
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
  return `https://papers.gceguide.com/${base}/${folder}/${year}/${code}_${paper}_${type}_${date}.pdf`;
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
  const base = 'Edexcel%20IGCSE';
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
  const base = 'Edexcel%20A%20Level';
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
    papers: _genCam('IGCSE', '0580', 'Mathematics%20(0580)', CAM_YEARS, CAM_SESS, [
      [1, 'P1 (Core)'], [2, 'P2 (Extended)'], [3, 'P3 (Core)'], [4, 'P4 (Extended)'],
    ]),
  },

  '0625': {
    subjectName: 'Physics',
    qualification: 'IGCSE / O Level',
    examBoard: 'Cambridge IGCSE',
    papers: _genCam('IGCSE', '0625', 'Physics%20(0625)', CAM_YEARS, CAM_SESS, [
      [1, 'P1'], [2, 'P2'], [3, 'P3'],
    ]),
  },

  '0620': {
    subjectName: 'Chemistry',
    qualification: 'IGCSE / O Level',
    examBoard: 'Cambridge IGCSE',
    papers: _genCam('IGCSE', '0620', 'Chemistry%20(0620)', CAM_YEARS, CAM_SESS, [
      [1, 'P1'], [2, 'P2'], [3, 'P3'],
    ]),
  },

  '0610': {
    subjectName: 'Biology',
    qualification: 'IGCSE / O Level',
    examBoard: 'Cambridge IGCSE',
    papers: _genCam('IGCSE', '0610', 'Biology%20(0610)', CAM_YEARS, CAM_SESS, [
      [1, 'P1'], [2, 'P2'], [3, 'P3'],
    ]),
  },

  '0455': {
    subjectName: 'Economics',
    qualification: 'IGCSE / O Level',
    examBoard: 'Cambridge IGCSE',
    papers: _genCam('IGCSE', '0455', 'Economics%20(0455)', CAM_YEARS, CAM_SESS, [
      [1, 'P1'], [2, 'P2'],
    ]),
  },

  '0450': {
    subjectName: 'Business Studies',
    qualification: 'IGCSE / O Level',
    examBoard: 'Cambridge IGCSE',
    papers: _genCam('IGCSE', '0450', 'Business%20Studies%20(0450)', CAM_YEARS, CAM_SESS, [
      [1, 'P1'], [2, 'P2'],
    ]),
  },

  // ── Edexcel IGCSE ──────────────────────────────────────────────────────────

  '4MA1': {
    subjectName: 'Mathematics A',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4MA1', 'Mathematics%20A%20(4MA1)', EDX_IG_YEARS, ['1H', '2H', '1F', '2F']),
  },

  '4PH1': {
    subjectName: 'Physics',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4PH1', 'Physics%20(4PH1)', EDX_IG_YEARS, ['1P', '2P']),
  },

  '4CH1': {
    subjectName: 'Chemistry',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4CH1', 'Chemistry%20(4CH1)', EDX_IG_YEARS, ['1C', '2C']),
  },

  '4BI1': {
    subjectName: 'Biology',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4BI1', 'Biology%20(4BI1)', EDX_IG_YEARS, ['1B', '2B']),
  },

  '4AC1': {
    subjectName: 'Accounting',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4AC1', 'Accounting%20(4AC1)', EDX_IG_YEARS, ['01']),
  },

  '4EC1': {
    subjectName: 'Economics',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4EC1', 'Economics%20(4EC1)', EDX_IG_YEARS, ['01', '02']),
  },

  '4BS1': {
    subjectName: 'Business Studies',
    qualification: 'IGCSE / O Level',
    examBoard: 'Edexcel IGCSE',
    papers: _genEdxIgcse('4BS1', 'Business%20Studies%20(4BS1)', EDX_IG_YEARS, ['01', '02']),
  },

  // ── Cambridge A Level ──────────────────────────────────────────────────────

  '9709': {
    subjectName: 'Mathematics',
    qualification: 'A Level',
    examBoard: 'Cambridge',
    papers: _genCam('A%20Levels', '9709', 'Mathematics%20(9709)', CAM_YEARS, CAM_SESS, [
      [1, 'P1 (Pure 1)'], [2, 'P2 (Pure 2)'], [3, 'P3 (Pure 3)'],
      [4, 'P4 (Mechanics)'], [5, 'P5 (Stats 1)'], [6, 'P6 (Stats 2)'],
    ]),
  },

  '9702': {
    subjectName: 'Physics',
    qualification: 'A Level',
    examBoard: 'Cambridge',
    papers: _genCam('A%20Levels', '9702', 'Physics%20(9702)', CAM_YEARS, CAM_SESS, [
      [1, 'P1 (MCQ)'], [2, 'P2 (AS Structured)'], [3, 'P3 (Practical)'],
      [4, 'P4 (A2 Structured)'], [5, 'P5 (Planning)'],
    ]),
  },

  '9701': {
    subjectName: 'Chemistry',
    qualification: 'A Level',
    examBoard: 'Cambridge',
    papers: _genCam('A%20Levels', '9701', 'Chemistry%20(9701)', CAM_YEARS, CAM_SESS, [
      [1, 'P1 (MCQ)'], [2, 'P2 (AS Structured)'], [3, 'P3 (Practical)'],
      [4, 'P4 (A2 Structured)'], [5, 'P5 (Planning)'],
    ]),
  },

  '9700': {
    subjectName: 'Biology',
    qualification: 'A Level',
    examBoard: 'Cambridge',
    papers: _genCam('A%20Levels', '9700', 'Biology%20(9700)', CAM_YEARS, CAM_SESS, [
      [1, 'P1 (MCQ)'], [2, 'P2 (AS Structured)'], [3, 'P3 (Practical)'],
      [4, 'P4 (A2 Structured)'], [5, 'P5 (Planning)'],
    ]),
  },

  '9708': {
    subjectName: 'Economics',
    qualification: 'A Level',
    examBoard: 'Cambridge',
    papers: _genCam('A%20Levels', '9708', 'Economics%20(9708)', CAM_YEARS, CAM_SESS, [
      [1, 'P1 (MCQ)'], [2, 'P2 (Data Response)'],
      [3, 'P3 (MCQ)'],  [4, 'P4 (Essay)'],
    ]),
  },

  // ── Edexcel A Level ────────────────────────────────────────────────────────

  '9MA0': {
    subjectName: 'Mathematics',
    qualification: 'A Level',
    examBoard: 'Edexcel',
    papers: _genEdxAl('9MA0', 'Mathematics%20(9MA0)', EDX_AL_YEARS, ['01', '02', '03']),
  },

  '9PH0': {
    subjectName: 'Physics',
    qualification: 'A Level',
    examBoard: 'Edexcel',
    papers: _genEdxAl('9PH0', 'Physics%20(9PH0)', EDX_AL_YEARS, ['01', '02', '03']),
  },

  '9CH0': {
    subjectName: 'Chemistry',
    qualification: 'A Level',
    examBoard: 'Edexcel',
    papers: _genEdxAl('9CH0', 'Chemistry%20(9CH0)', EDX_AL_YEARS, ['01', '02', '03']),
  },

  '9BI0': {
    subjectName: 'Biology',
    qualification: 'A Level',
    examBoard: 'Edexcel',
    papers: _genEdxAl('9BI0', 'Biology%20(9BI0)', EDX_AL_YEARS, ['01', '02', '03']),
  },
};

/**
 * Get past paper entries for a given exam code.
 * Returns null if no data available for that code.
 */
export function getPastPapersForCode(examCode) {
  if (!examCode) return null;
  return PAST_PAPERS_DB[examCode.trim().toUpperCase()] ?? null;
}
