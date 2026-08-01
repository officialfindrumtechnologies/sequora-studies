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
    '10.CommunityMedicine': [
        'Concept of Public Health, Community Medicine, Health and Disease',
        'Behavioural Science',
        'Health Communication & Health Education',
        'Research Methodology and Biostatistics',
        'Medical Entomology',
        'Environment & Health',
        'Immunity, Immunization',
        'Public Health Nutrition',
        'Principles of Epidemiology',
        'Epidemiology of Communicable & Non-Communicable Disease (NCDs)',
        'MCH-FP & Demography',
        'School Health Services',
        'Occupational Health',
        'Public Health Administration & Management',
    ],
    '8.ForensicMedicine': [
        'Section -01: Introduction to Forensic Medicine',
        'Section-02: Legal aspect (Legal structure; court procedure)',
        'Section 3: Medical Jurisprudence (Medical ethics)',
        'Section 4: Forensic Pathology (L-24hrs; T-16hrs)',
        'Section 5: Clinical Forensic Medicine (L-18hrs; T-12hrs)',
        'Section 6: Identification',
        'Section 7: Forensic aspect of reproduction',
        'Section -08: Forensic Psychiatry',
        'Section-09: Forensic Toxicology',
        'Section-10: PRACTICAL (40hrs)',
        'Section-11: Observation of ten Medico-legal Autopsies (10days)',
    ],
    # Pharmacology is divided by term rather than by system - that is the
    # document's own top-level structure - with numbered drug topics beneath.
    '7.Pharmacology': [
        'Term I',
        'Term II',
        'Pharmacology Practicals',
        'Pharmacology Tutorial',
    ],
    '3.Anatomy': [
        'General Anatomy',
        'Cell Biology',
        'Human Genetics',
        'General Histology',
        'Systemic Histology',
        'General Embryology',
        'Systemic Developmental Anatomy',
        'Neuroanatomy',
        'Clinical Anatomy',
    ],
    # Pathology is divided by term, the document's own structure.
    '11.Pathology': [
        'Term I A- General Pathology, Haematolymphoid System (Term-1A)',
        'Term-1B - General Pathology, Haematolymphoid System (Term-1B)',
        'Term-2A - Systemic Pathology (Term-2A)',
        'Term-2B - Systemic Pathology (Term-2B )',
    ],
    # Medicine, Surgery and Obs & Gynae each bundle several disciplines, and
    # the document declares them with its own "Learning Objectives and Course
    # Contents in X" headings. Those are the anchors; RENAME gives them names
    # a student would recognise.
    '14.Medicine': [
        'Learning Objectives and Course Contents in Medicine',
        'Learning Objectives and Course Contents in SKIN & VD (lectures)',
        'Learning Objectives and Course Contents in Psychiatry',
    ],
    '15.Surgery': [
        'Learning Objectives and Course Contents in Surgery',
        'Learning Objectives and Course Contents in ophthalmology',
        'Learning Objectives and Course Contents in Otorhinolaryngology & Head-Neck Surgery',
    ],
    '16.ObsGynae': [
        'Learning Objectives and Course Contents in Obstetrics',
        'Learning Objectives and Course Contents in Gynaecology',
    ],
}

RENAME = {
    '14.Medicine': {
        'Learning Objectives and Course Contents in Medicine': 'Medicine',
        'Learning Objectives and Course Contents in SKIN & VD (lectures)': 'Skin & Venereal Diseases',
        'Learning Objectives and Course Contents in Psychiatry': 'Psychiatry',
    },
    '15.Surgery': {
        'Learning Objectives and Course Contents in Surgery': 'Surgery',
        'Learning Objectives and Course Contents in ophthalmology': 'Ophthalmology',
        'Learning Objectives and Course Contents in Otorhinolaryngology & Head-Neck Surgery':
            'Otorhinolaryngology & Head-Neck Surgery',
    },
    '16.ObsGynae': {
        'Learning Objectives and Course Contents in Obstetrics': 'Obstetrics',
        'Learning Objectives and Course Contents in Gynaecology': 'Gynaecology',
    },
    '11.Pathology': {
        'Term I A- General Pathology, Haematolymphoid System (Term-1A)':
            'Term 1A - General Pathology & Haematolymphoid System',
        'Term-1B - General Pathology, Haematolymphoid System (Term-1B)':
            'Term 1B - General Pathology & Haematolymphoid System',
        'Term-2A - Systemic Pathology (Term-2A)': 'Term 2A - Systemic Pathology',
        'Term-2B - Systemic Pathology (Term-2B )': 'Term 2B - Systemic Pathology',
    },
}

SUBJECT_NAMES = {
    '11.Pathology': 'Pathology',
    '14.Medicine': 'Medicine',
    '15.Surgery': 'Surgery',
    '16.ObsGynae': 'Obstetrics & Gynaecology',
    '3.Anatomy': 'Anatomy',
    '7.Pharmacology': 'Pharmacology & Therapeutics',
    '8.ForensicMedicine': 'Forensic Medicine & Toxicology',
    '10.CommunityMedicine': 'Community Medicine',
    '4.Physiology': 'Physiology',
    '5.Biochemistry': 'Biochemistry',
    '12.Microbiology': 'Microbiology',
}

DROP = re.compile(
    r'^(CORE|Additional|Applied|Core Contents|Contents|Learning Objectives?|'
    r'Hours|Teaching|At the end of|Sl\.?|Name of item|Marks|Remarks|Full|'
    r'Learning\s+Strateg|Evaluations?|Lectures?:|Tutorials?:|Practicals?:)\b', re.I)
BULLET_LEAD = re.compile(r'^[\uf0b7\u2022\u25cf\uf0a7\uf0d8]')
BULLET = re.compile(r'[\uf0b7\u2022\u25cf\uf0a7\uf0d8\s]+')
NUMERIC = re.compile(r'^[\d\s./=%•-]*$')
HOURS_TOKEN = re.compile(r'\b(?:L|T|P|IT|C|CL)\s*=\s*\d+\b', re.I)
# Anchored, and specific enough not to match page furniture. "Total teaching
# hours:" is a FOOTER on every content page of Biochemistry, so an unanchored
# "Total Teaching Hours" halted extraction on the first content page and the
# subject came out with one chapter populated out of seven.
STOP = re.compile(r'^(Evaluation of \w|Summative Assessment|Continuous Assessment Card|'
                  r'Academic Calendar|Total Teaching Hours for|Distribution of Teaching|'
                  r'Teaching\s*-?\s*Learning\s*&?\s*Assessment|Assessment in \w|'
                  r'Time allocation in|Marks distribution)', re.I)


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
            line = norm(clean(r['t']))
            # Anatomy sets its chapter headings flush left in the objectives
            # column, not centred, and runs some of them into the objective
            # text on the same line ("Systemic Histology: Students will be able
            # to..."), so an exact, alone, centred match finds almost none of
            # them. A far-left heading matched by prefix is safe because the
            # pinned name still has to match from the start of the line.
            far_left = r['x'] < 0.12 * w
            key = None
            if line in want:
                key = line
            elif far_left:
                key = next((k for k in want if line.startswith(k + ' ')), None)
            if key is None or key in seen:
                continue
            centred = abs((r['x'] + r['x2']) / 2 - w / 2) < w * 0.14
            alone = not any(q is not r and abs(q['y'] - r['y']) < 5 for q in rows)
            # Forensic Medicine left-aligns some section headings, so centring
            # cannot be required; the length floor is what stops short generic
            # names like Microbiology's "Practical" matching a stray table cell.
            ok = (alone and (centred or len(want[key]) >= 15)) or far_left
            if not ok:
                continue
            seen.add(key)
            anchors.append((pi, r['y'], want[key]))

    missing = [c for c in pinned if c not in {a[2] for a in anchors}]
    anchors.sort()

    def bounds(rows, w):
        """Column gutters: the widest gap whose midpoint falls in the band each
        gutter must occupy. Taking the two widest gaps overall was wrong when
        two gaps tie — on one Community Medicine page that put the left gutter
        at x=485 with the Contents text at x=420, so two chapters extracted
        empty. Constraining each gutter to its own band picks the right pair.
        """
        xs = sorted({round(r['x']) for r in rows})
        if len(xs) < 3:
            return w * 0.46, w * 0.83
        gaps = [(xs[i+1] - xs[i], (xs[i] + xs[i+1]) / 2) for i in range(len(xs) - 1)]
        left  = [g for g in gaps if 0.18 * w < g[1] < 0.55 * w]
        right = [g for g in gaps if g[1] > 0.62 * w]
        lo = max(left)[1] if left else w * 0.46
        hi = max(right)[1] if right else w * 0.83
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
        colx = [round(r['x']) for r in rows
                if lo < r['x'] < hi and not DROP.match(clean(r['t']))
                and norm(clean(r['t'])) not in want]
        indent = (min(colx) + 5) if colx else lo + 20
        # Only bullets belonging to the Contents column count, and only when
        # there are enough of them to be the page's actual list marker. A
        # couple of stray bullets elsewhere on the page previously made every
        # unbulleted content line look like a continuation, merging a whole
        # chapter into one run-on entry.
        bullets = [r['y'] for r in rows
                   if BULLET.fullmatch(r['t'].strip()) and lo - 40 < r['x'] < hi]
        if len(bullets) < 2:
            bullets = []

        def starts_item(r):
            # Two bullet layouts occur in the same document: on some pages the
            # Wingdings bullet is its own line just above the text it marks, on
            # others it is the first character of the text line itself.
            if BULLET_LEAD.match(r['t']):
                return True
            if bullets and any(abs(b - r['y']) < 7 for b in bullets):
                return True
            if bullets:
                return False
            return r['x'] <= indent

        # An administrative page mid-document must not end extraction, only be
        # skipped. Medicine and Surgery carry assessment and teaching-hour
        # pages BETWEEN their disciplines, so halting on the first one left
        # Skin & VD, Psychiatry, Ophthalmology and ENT completely empty.
        # Extraction only ends once the last pinned chapter has been passed.
        if any(STOP.search(r['t']) for r in rows):
            if anchors and pi > anchors[-1][0]:
                stopped = True
            continue

        for r in rows:
            if not (lo < r['x'] < hi):
                continue
            t = clean(r['t'])
            if not t or len(t) < 3 or NUMERIC.match(t) or DROP.match(t):
                continue
            ch = chapter_at(pi, r['y'])
            if ch is None or norm(t) in want:
                continue
            b = buckets[ch]
            if b and not starts_item(r):
                b[-1] = (b[-1] + ' ' + t).strip()
            else:
                b.append(t)

    ren = RENAME.get(stem, {})
    rows_out = [{'section': ren.get(c, c), 'name': re.sub(r'\s{2,}', ' ', s).strip()}
                for c in pinned for s in buckets[c] if len(s) > 2]
    empty = [ren.get(c, c) for c in pinned if not buckets[c]]
    pinned = [ren.get(c, c) for c in pinned]
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
