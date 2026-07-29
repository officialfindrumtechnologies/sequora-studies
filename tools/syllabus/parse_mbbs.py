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
                             'x2': float(lm.group(3)), 't': txt})
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

        # Only pages carrying the syllabus table count. These PDFs also contain
        # teaching-hour tables, assessment mark sheets, continuous-assessment
        # cards and academic calendars, all of which are centred headings over
        # columns and would otherwise be harvested as chapters and topics.
        has_obj  = any(re.match(r'^Learning Objectives', r['t'], re.I) for r in rows)
        # Header wording varies by subject: Pharmacology writes "Core
        # Contents", Surgery and Obs & Gynae run "Contents" and "Teaching"
        # together on one line. Requiring an exact "Contents" match returned
        # nothing at all for those three.
        has_cont = any(re.match(r'^(Core\s+)?Contents\b', r['t'], re.I) and r['x'] > obj_max
                       for r in rows)
        if not (has_obj and has_cont):
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

        # A chapter heading is a short centred line sitting above the table.
        header_y = min([r['y'] for r in rows if r['x'] > obj_max], default=None)
        for r in rows:
            if header_y is not None and r['y'] > header_y:
                continue
            mid = (r['x'] + r['x2']) / 2
            centred = abs(mid - w / 2) < w * 0.09
            if centred and 3 < len(r['t']) < 70 and not NUMERIC.match(r['t']) \
                    and not DROP.match(r['t']):
                name = clean(r['t'])
                if name and name not in by_name:
                    by_name[name] = []
                    chapters.append(name)
                current = name

        if current is None:
            continue

        # Contents column only.
        for r in rows:
            if not (obj_max < r['x'] < hours_min):
                continue
            t = clean(r['t'])
            if not t or NUMERIC.match(t) or DROP.match(t) or len(t) < 3:
                continue
            bucket = by_name[current]
            if r['x'] > indent and bucket:
                bucket[-1] = (bucket[-1] + ' ' + t).strip()   # wrapped line
            else:
                bucket.append(t)

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
