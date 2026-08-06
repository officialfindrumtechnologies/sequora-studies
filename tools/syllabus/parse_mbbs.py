#!/usr/bin/env python3
"""Extract chapters and sub-chapters from a BM&DC MBBS Curriculum 2021 subject PDF.

These documents look nothing like a Cambridge syllabus. There is no numbering
to key off, and the syllabus proper is a three-column landscape table:

    Learning Objectives     |     Contents     |     Hours / days
    (x < 390)                     (390-700)          (x >= 700)

The middle column holds the actual syllabus content; the left column is
assessment wording ("describe the physiology of cardiac muscle") and the right
is teaching hours. `pdftotext -layout` interleaves all three onto shared lines,
so this works from word coordinates (`-bbox-layout`) instead.

Chapters are centred headings above each table ("Cardiovascular Physiology").
Within the Contents column a new sub-chapter starts at the bullet indent
(x ~ 411) and wrapped continuation lines are indented further (x ~ 429), so
they are stitched back onto the entry above.
"""
import re, sys, json, subprocess
from collections import defaultdict, Counter

# Column geometry, as a fraction of page width so it survives page-size changes.
OBJ_MAX   = 0.46   # left column ends
HOURS_MIN = 0.83   # right column begins
# Within Contents, a wrapped line is indented past this (fraction of page width)
CONT_INDENT = 0.502

DROP = re.compile(
    r'^(CORE|Additional|Applied|Core Contents|Contents|Learning Objectives?|Hours|Teaching|'
    r'At the end of|Sl\.?|Name of item|Marks|Remarks|Full)\b', re.I)
NUMERIC = re.compile(r'^[\d\s./=%-]*$')
# Opens a nested list item: "1. ", "2) ", "a. ", "iv) ". Roman numerals are
# matched before single letters so "i." and "v." are not read as plain letters;
# either way the line starts a new entry, so the distinction is cosmetic.
# Deliberately requires the trailing space: "1.5 mg" and "No.3" must not match.
LIST_MARKER = re.compile(r'^(?:\d{1,2}|[ivx]{1,4}|[a-z])\s*[.)]\s+', re.I)
# Pages that are administration rather than syllabus.
ADMIN = re.compile(
    r'(Continuous Assessment Card|Academic Calendar|Roll no|Name of item|'
    r'Distribution of (Teaching|Marks)|Summative Assessment|Mark distribution|'
    r'Formative Exam|Attendance)', re.I)
# Headings that are scheduling/assessment furniture rather than syllabus
# chapters. Without this the tail of each subject fills up with "TIME
# SCHEDULE", "= 05 Hours", "CLASS PERFORMANCE CARD-1A", "Study Tour".
CHAPTER_REJECT = re.compile(
    r'(\d+\s*hours?\b|=\s*\d|schedule|card\s*(no|-|\d)|questionnaire|'
    r'\btour\b|please specify|performance card|box contents|'
    r'^(topic|date|materials|oral|theoretical|consolidated.*)$|'
    r'^\W|^(term|year)\b|case histories|^note:)', re.I)


def pages(pdf):
    xml = subprocess.run(['pdftotext', '-bbox-layout', pdf, '-'],
                         capture_output=True, text=True, check=True).stdout
    for pm in re.finditer(r'<page width="([\d.]+)" height="([\d.]+)">(.*?)</page>', xml, re.S):
        w = float(pm.group(1))
        rows = []
        for lm in re.finditer(
                r'<line xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</line>',
                pm.group(3), re.S):
            words = re.findall(r'>([^<]*)</word>', lm.group(5))
            txt = ' '.join(words).replace('&amp;', '&').replace('&#39;', "'").strip()
            txt = re.sub(r'\s+', ' ', txt)
            if txt:
                rows.append({'x': float(lm.group(1)), 'y': float(lm.group(2)),
                             'x2': float(lm.group(3)), 't': txt,
                             'h': float(lm.group(4)) - float(lm.group(2))})
        yield w, sorted(rows, key=lambda r: (r['y'], r['x']))


# Teaching-hour codes (L=18, T=18, P=18, IT=03) sit in the right-hand column
# but do not always clear it, so strip them wherever they land.
HOURS_TOKEN = re.compile(r'\b(?:L|T|P|IT|C|CL)\s*=\s*\d+\b', re.I)


def clean(t):
    t = re.sub(r'^[\u2022\u25cf\-\u2013\u2014\s]+', '', t).strip()
    t = HOURS_TOKEN.sub('', t)
    t = re.sub(r'\s*\.\s*$', '', t)
    return re.sub(r'\s{2,}', ' ', t).strip()


def column_bounds(rows, w):
    """Find the two column gutters from the actual text positions.

    Fixed fractions do not survive these documents: the Blood page starts its
    Contents bullets at x=386 while Cardiovascular starts at x=411, and a
    boundary at 0.46*width silently dropped every bullet on the Blood page,
    leaving only wrapped continuation lines ("hemoglobin", "classification").
    The gutters are the widest horizontal gaps between line start positions.
    """
    xs = sorted({round(r['x']) for r in rows})
    if len(xs) < 3:
        return w * OBJ_MAX, w * HOURS_MIN
    gaps = sorted(((xs[i + 1] - xs[i], (xs[i] + xs[i + 1]) / 2)
                   for i in range(len(xs) - 1)), reverse=True)
    cuts = sorted(mid for _, mid in gaps[:2])
    lo = next((c for c in cuts if 0.15 * w < c < 0.60 * w), w * OBJ_MAX)
    hi = next((c for c in reversed(cuts) if c > max(lo, 0.60 * w)), w * HOURS_MIN)
    return lo, hi


def parse(pdf):
    chapters = []                 # ordered [(name, [subtopics])]
    by_name = {}
    current = None

    for w, rows in pages(pdf):
        obj_max, hours_min = column_bounds(rows, w)
        indent = w * CONT_INDENT

        # Only pages carrying the syllabus table count. These PDFs also hold
        # teaching-hour tables, mark sheets, continuous-assessment cards and
        # academic calendars, which are also centred headings over columns and
        # would otherwise be harvested as chapters and topics.
        #
        # This is geometry-driven rather than header-driven: Surgery prints its
        # column headers once and repeats nothing on continuation pages, so
        # requiring "Learning Objectives" and "Contents" on every page rejected
        # the entire subject. A syllabus page is instead one with real text in
        # both the objectives and the contents columns.
        left  = [r for r in rows if r['x'] < obj_max and len(r['t']) > 12]
        right = [r for r in rows if obj_max < r['x'] < hours_min and len(r['t']) > 8]
        if len(left) < 2 or len(right) < 2:
            continue
        if any(ADMIN.search(r['t']) for r in rows):
            continue

        # Bullets are the most frequent start position in the Contents column;
        # wrapped continuation lines sit further right. The modal x is used
        # rather than the minimum because sub-headings like "CORE :" sit a
        # little LEFT of the bullets, and taking the minimum made every real
        # bullet look like a continuation, shredding whole chapters into
        # fragments ("hemoglobin", "classification").
        col = Counter(round(r['x']) for r in rows
                      if obj_max < r['x'] < hours_min and not DROP.match(clean(r['t'])))
        indent = (col.most_common(1)[0][0] + 4) if col else (w * CONT_INDENT)

        # A chapter heading is a short centred line that occupies its own row
        # band. It is NOT restricted to the top of the page: several subjects
        # start a new chapter partway down, after the previous chapter's table
        # ends. Only scanning above the first table row silently dropped whole
        # chapters — Community Medicine lost Medical Entomology, Public Health
        # Nutrition and Occupational Health that way, which is precisely the
        # failure this extraction exists to prevent.
        # Headings are set in a larger face than the table body — about 12.6pt
        # against 10pt. Height is the discriminator because position alone is
        # not: restricting to the top of the page silently dropped chapters
        # that start mid-page, while accepting any line alone in its row band
        # swept up the last line of table cells ("vagina", "yolk sac etc").
        # Neither signal is sufficient alone. Physiology does not always set
        # its headings larger, so height alone lost half its chapters; and
        # position alone (above the first table row) lost every chapter that
        # starts mid-page. A heading is accepted on either signal, with the
        # reject list and the "must have >= 3 sub-chapters" rule catching what
        # slips through.
        body_h = sorted(q['h'] for q in rows)[len(rows) // 2] if rows else 10.0
        table_top = min([q['y'] for q in rows if q['x'] > obj_max], default=1e9)
        for r in rows:
            # 1.12x also admits the Contents-column headings, which are set at
            # 11.7pt against ~9pt body. Genuine chapter headings are 12.6-18pt,
            # so 1.30x separates them. This works WITH the centring tolerance
            # above, not instead of it: "Classification - Neuromuscular
            # blockers" is 13.3pt but sits at 0.566, and "Retina and vitreous:"
            # is centred at 0.524 but is only 11.7pt. Each gate catches what
            # the other misses.
            bigger = r['h'] >= body_h * 1.30
            above  = r['y'] <= table_top
            if not (bigger or above):
                continue
            alone = not any(q is not r and abs(q['y'] - r['y']) < 5 for q in rows)
            if not alone:
                continue
            mid = (r['x'] + r['x2']) / 2
            # Centred on the PAGE, not merely somewhere near the middle of it.
            # A tolerance of 0.09w also accepts anything centred within the
            # Contents column, because that column's own midpoint lands around
            # 0.55w on these landscape pages. That is how "Lacrimal Apparatus:"
            # (0.563), "Cornea and sclera:" (0.547), "Glaucoma:" (0.568) and
            # "and Low vision (Gross idea):" (0.551) were promoted to chapters,
            # while the real "Ophthalmology" heading was lost.
            #
            # Measured on the source: genuine chapter headings land on 0.500 to
            # three decimal places — they are typeset centred, so they are exact.
            # 0.035 keeps those (Psychiatry's heading measures 0.529 on one
            # page) while rejecting the column-centred ones, which start at
            # 0.547. Tolerance alone is not enough to separate them — pairing it
            # with the height gate below is what makes the split clean.
            centred = abs(mid - w / 2) < w * 0.035
            if centred and 3 < len(r['t']) < 70 and not NUMERIC.match(r['t']) \
                    and not DROP.match(r['t']) and not CHAPTER_REJECT.search(clean(r['t'])):
                name = clean(r['t'])
                if name and name not in by_name:
                    by_name[name] = []
                    chapters.append(name)
                current = name

        # Content reached before any heading has been accepted used to be
        # dropped on the floor. That made every tightening of the heading rules
        # cost real syllabus content — narrowing the centring tolerance alone
        # lost 531 sub-chapters across five subjects, because Surgery's and
        # Medicine's opening pages then had no accepted chapter to hang on.
        # Parking it under a placeholder keeps the content and makes the gap
        # obvious in the output instead of silent.
        if current is None:
            current = '(unsectioned)'
            if current not in by_name:
                by_name[current] = []
                chapters.append(current)

        # Contents column only.
        for r in rows:
            if not (obj_max < r['x'] < hours_min):
                continue
            t = clean(r['t'])
            if not t or NUMERIC.match(t) or DROP.match(t) or len(t) < 3:
                continue
            bucket = by_name[current]
            # Indentation alone does not mean "wrapped line". Several subjects
            # nest a numbered list inside one Contents cell:
            #
            #     Implant
            #       1. Definition
            #       2. Role of implant as contraceptive method
            #
            # Those items sit further right than the modal bullet, so treating
            # every indented line as a continuation glued the whole list onto
            # its parent — Obs & Gynae produced 940-character "topics" and
            # Surgery an 800-character one holding twenty separate items.
            #
            # A line that opens with its own list marker starts a new entry
            # whatever its indent; only unmarked indented lines are wrapped
            # text. clean() has already stripped bullet glyphs, so what remains
            # to detect is 1. / 1) / a. / a) / i. / iv) style markers.
            if r['x'] > indent and bucket and not LIST_MARKER.match(t):
                bucket[-1] = (bucket[-1] + ' ' + t).strip()   # wrapped line
            else:
                bucket.append(t)

    # A real chapter has several sub-chapters under it. Anything thinner is
    # almost always a stray centred line that slipped through.
    chapters = [c for c in chapters if len(by_name[c]) >= 3]

    rows_out = []
    for ch in chapters:
        for sub in by_name[ch]:
            sub = re.sub(r'\s{2,}', ' ', sub).strip()
            # The centred chapter heading falls inside the Contents column on
            # some pages, so it would otherwise repeat as its own sub-chapter.
            if len(sub) > 2 and sub.lower() != ch.lower():
                rows_out.append({'section': ch, 'name': sub[:300]})
    return chapters, rows_out


def validate(chapters, rows):
    p = []
    if not chapters:
        p.append('no chapters found')
    if not rows:
        p.append('no sub-chapters found')
    empty = [c for c in chapters if not any(r['section'] == c for r in rows)]
    if empty:
        p.append(f'chapters with no content: {empty[:4]}')
    return p


if __name__ == '__main__':
    ch, rows = parse(sys.argv[1])
    print(json.dumps({'chapters': len(ch), 'topics': len(rows),
                      'problems': validate(ch, rows),
                      'chapter_names': ch, 'rows': rows}, indent=1, ensure_ascii=False))
