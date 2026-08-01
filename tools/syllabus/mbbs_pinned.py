#!/usr/bin/env python3
"""Extract MBBS sub-chapters against a PINNED, hand-read chapter list.

Heuristic chapter detection kept silently dropping chapters — the failure this
whole exercise exists to prevent. Physiology looked complete at 10 chapters but
was missing "Physiology of Special Senses"; Biochemistry was missing its
opening "Biophysics & Biomolecules". A missing chapter is worse than a mangled
one because nothing on screen shows anything is absent.

So the chapter list per subject is read off the PDF by hand and pinned here as
ground truth. The machine only does what it is reliable at: locating each
pinned heading in the document and lifting the Contents column verbatim between
one heading and the next. If a pinned heading cannot be found, that is an
error, not something to work around.
"""
import re, sys, json, subprocess
from collections import Counter

CHAPTERS = {
    '4.Physiology': [
        'Cellular Physiology',
        'Physiology of Blood',
        'Cardiovascular Physiology',
        'Respiratory Physiology',
        'Renal Physiology',
        'Gastrointestinal Physiology',
        'Endocrine Physiology and Physiology of Reproduction',
        'Neurophysiology',
        'Physiology of Body Temperature',
        'Physiology of Special Senses',
        'Physiology Practical',
    ],
    '5.Biochemistry': [
        'Biophysics & Biomolecules',
        'Food, Nutrition, Vitamins and Minerals',
        'Digestion, Absorption, Bioenergetics and Metabolism',
        'Renal biochemistry, body fluid, electrolytes and acid-base balance',
        'Clinical Biochemistry and clinical endocrinology',
        'Fundamentals of Molecular Biology and genetics',
        'Biochemistry practical',
    ],
    '12.Microbiology': [
        'General Bacteriology',
        'Systemic Bacteriology',
        'Immunology',
        'Parasitology',
        'Virology',
        'Mycology',
        'Clinical Microbiology',
        'Practical',
    ],
}

SUBJECT_NAMES = {
    '4.Physiology': 'Physiology',
    '5.Biochemistry': 'Biochemistry',
    '12.Microbiology': 'Microbiology',
}

DROP = re.compile(
    r'^(CORE|Additional|Applied|Core Contents|Contents|Learning Objectives?|'
    r'Hours|Teaching|At the end of|Sl\.?|Name of item|Marks|Remarks|Full)\b', re.I)
NUMERIC = re.compile(r'^[\d\s./=%•-]*$')
HOURS_TOKEN = re.compile(r'\b(?:L|T|P|IT|C|CL)\s*=\s*\d+\b', re.I)
# Anchored, and specific enough not to match page furniture. "Total teaching
# hours:" is a FOOTER on every content page of Biochemistry, so an unanchored
# "Total Teaching Hours" halted extraction on the first content page and the
# subject came out with one chapter populated out of seven.
STOP = re.compile(r'^(Evaluation of \w|Summative Assessment|Continuous Assessment Card|'
                  r'Academic Calendar|Total Teaching Hours for|Distribution of Teaching)', re.I)


def clean(t):
    t = re.sub(r'^[•●\-–—\s]+', '', t).strip()
    t = HOURS_TOKEN.sub('', t)
    return re.sub(r'\s{2,}', ' ', t).strip().rstrip('.').strip()


def doc(pdf):
    xml = subprocess.run(['pdftotext', '-bbox-layout', pdf, '-'],
                         capture_output=True, text=True, check=True).stdout
    out = []
    for pi, pm in enumerate(re.finditer(
            r'<page width="([\d.]+)" height="[\d.]+">(.*?)</page>', xml, re.S)):
        w = float(pm.group(1))
        rows = []
        for lm in re.finditer(
                r'<line xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</line>',
                pm.group(2), re.S):
            t = ' '.join(re.findall(r'>([^<]*)</word>', lm.group(5)))
            t = re.sub(r'\s+', ' ', t.replace('&amp;', '&').replace('&#39;', "'")).strip()
            if t:
                rows.append({'p': pi, 'x': float(lm.group(1)), 'y': float(lm.group(2)),
                             'x2': float(lm.group(3)), 't': t, 'w': w})
        out.append((w, sorted(rows, key=lambda r: (r['y'], r['x']))))
    return out


def norm(s):
    return re.sub(r'[^a-z0-9]+', ' ', s.lower()).strip()


def parse(stem, pdf):
    pages = doc(pdf)
    pinned = CHAPTERS[stem]
    want = {norm(c): c for c in pinned}

    # Locate each pinned heading. Anchors are (page, y, chapter).
    # An anchor must look like a heading, not merely contain the same words.
    # Microbiology's chapter "Practical" also occurs as a cell in the
    # teaching-methods table on an earlier page; matching that pulled the start
    # of the subject back onto an administrative page, which then tripped the
    # stop rule and produced zero content for all eight chapters.
    anchors, seen = [], set()
    for pi, (w, rows) in enumerate(pages):
        for r in rows:
            key = norm(clean(r['t']))
            if key not in want or key in seen:
                continue
            centred = abs((r['x'] + r['x2']) / 2 - w / 2) < w * 0.14
            alone = not any(q is not r and abs(q['y'] - r['y']) < 5 for q in rows)
            if not (centred and alone):
                continue
            seen.add(key)
            anchors.append((pi, r['y'], want[key]))
    missing = [c for c in pinned if c not in {a[2] for a in anchors}]
    anchors.sort()

    # Column geometry: widest gaps between line starts, measured per page.
    def bounds(rows, w):
        xs = sorted({round(r['x']) for r in rows})
        if len(xs) < 3:
            return w * 0.46, w * 0.83
        gaps = sorted(((xs[i+1]-xs[i], (xs[i]+xs[i+1])/2) for i in range(len(xs)-1)), reverse=True)
        cuts = sorted(m for _, m in gaps[:2])
        lo = next((c for c in cuts if 0.15*w < c < 0.60*w), w*0.46)
        hi = next((c for c in reversed(cuts) if c > max(lo, 0.60*w)), w*0.83)
        return lo, hi

    def chapter_at(pi, y):
        cur = None
        for ap, ay, name in anchors:
            if (ap, ay) <= (pi, y):
                cur = name
            else:
                break
        return cur

    buckets = {c: [] for c in pinned}
    stopped = False
    for pi, (w, rows) in enumerate(pages):
        if stopped:
            break
        if pi < (anchors[0][0] if anchors else 0):
            continue
        lo, hi = bounds(rows, w)
        colx = Counter(round(r['x']) for r in rows
                       if lo < r['x'] < hi and not DROP.match(clean(r['t'])))
        indent = (colx.most_common(1)[0][0] + 4) if colx else lo + 20

        for r in rows:
            if STOP.search(r['t']):
                stopped = True
                break
            if not (lo < r['x'] < hi):
                continue
            t = clean(r['t'])
            if not t or len(t) < 3 or NUMERIC.match(t) or DROP.match(t):
                continue
            ch = chapter_at(pi, r['y'])
            if ch is None or norm(t) in want:
                continue
            b = buckets[ch]
            if r['x'] > indent and b:
                b[-1] = (b[-1] + ' ' + t).strip()
            else:
                b.append(t)

    rows_out = [{'section': c, 'name': re.sub(r'\s{2,}', ' ', s).strip()}
                for c in pinned for s in buckets[c] if len(s) > 2]
    empty = [c for c in pinned if not buckets[c]]
    problems = ([f'pinned headings not found: {missing}'] if missing else []) + \
               ([f'chapters with no content: {empty}'] if empty else [])
    return pinned, rows_out, problems


if __name__ == '__main__':
    stem = sys.argv[1]
    chapters, rows, problems = parse(stem, f'mbbs/{stem}.pdf')
    print(json.dumps({'subject': SUBJECT_NAMES[stem], 'chapters': len(chapters),
                      'topics': len(rows), 'ok': not problems, 'problems': problems,
                      'chapter_names': chapters, 'rows': rows},
                     indent=1, ensure_ascii=False))
