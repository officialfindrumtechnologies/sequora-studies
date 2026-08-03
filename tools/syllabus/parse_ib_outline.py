#!/usr/bin/env python3
"""Extract IB Diploma syllabus outlines into {section, name} rows.

Why the outline table rather than the syllabus body: every IB guide summarises
its whole course in a "Syllabus outline" table — units in the left column,
recommended teaching hours for SL and HL in the columns beside it. That table is
the one surface with the same shape across guides, it is complete by
construction, and it carries the "(HL only)" markers that decide what belongs on
an SL plan. Parsing the body instead means a bespoke reader per guide.

The catch is that the table has columns. pdftotext at line level welds the hours
onto the end of the unit title ("2.4 Motivation and demotivation 20 35"), and on
guides whose outline wraps across two pages, the header row of the second page
lands mid-list. Word-level coordinates fix both: the hours live to the right of a
measurable gutter, so keeping only words left of it recovers the title exactly.

Chapters are pinned per subject rather than detected. Heuristic detection was
tried first and silently dropped units whose heading wrapped onto two lines,
which is the failure mode that matters least visibly and most.
"""
import re
import sys
import json
import subprocess

GUIDES = {
    'economics': {
        'subject': 'Economics',
        'code': 'IB-ECON',
        'years': 'first assessment 2022',
        'pages': (26, 27),
        'url': 'https://peda.net/kuopio/lukiot/lyseonlukio/ib/syllabukset/g3ias/eg2:file/'
               'download/7cbf6ca932f417ca8ca00f8a25b126342d8dfc43/'
               'PRC-economics-guide-en_f527c535-cbfb-4567-815d-f93fbbdea80b.pdf',
        'sections': [
            'Unit 1: Introduction to economics',
            'Unit 2: Microeconomics',
            'Unit 3: Macroeconomics',
            'Unit 4: The global economy',
        ],
    },
    'bm': {
        'subject': 'Business Management',
        'code': 'IB-BM',
        'years': 'first assessment 2024',
        'pages': (27, 28),
        'url': 'https://dp.uwcea.org/docs/Business%20Management%20Subject%20Guide.pdf',
        'sections': [
            'Unit 1: Introduction to business management',
            'Unit 2: Human resource management',
            'Unit 3: Finance and accounts',
            'Unit 4: Marketing',
            'Unit 5: Operations management',
        ],
    },
}

# "2.10 Market failure—asymmetric information (HL only)" — the number is what
# assigns a sub-topic to its unit, so a sub-topic that wraps or appears out of
# document order still lands in the right place.
ITEM = re.compile(r'^(\d+)\.(\d+)\s+(\S.*)$')
# Rows that are not course content. "Internal assessment" ends the unit list in
# every guide, so it doubles as the stop marker.
#
# SL and HL are matched as whole lines, not as prefixes. They appear both as
# column headers on their own and as the first word of a wrapped title
# ("...(includes / HL only sub-topics)"), and treating the second as noise
# silently truncated Economics 3.5.
NOISE = re.compile(
    r'^(Syllabus (outline|component)|Teaching hours|Recommended teaching|hours|'
    r'Total teaching hours|Internal assessment|Portfolio|Research time|'
    r'Business management toolkit|The recommended teaching time)\b|^(SL|HL)$', re.I)


def words(pdf, first, last):
    """Word boxes for a page range, bucketed into visual rows.

    Rows are bucketed to a tolerance rather than sorted strictly by y: an em
    dash or a superscript sits a point or two off its neighbours' baseline, and
    a strict sort interleaves it into the wrong line.
    """
    xml = subprocess.run(['pdftotext', '-bbox', '-f', str(first), '-l', str(last), pdf, '-'],
                         capture_output=True, text=True, check=True).stdout
    for pm in re.finditer(r'<page width="([\d.]+)" height="[\d.]+">(.*?)</page>', xml, re.S):
        ws = []
        for wm in re.finditer(
                r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="[\d.]+">([^<]*)</word>',
                pm.group(2)):
            t = (wm.group(4).replace('&amp;', '&').replace('&#39;', "'")
                 .replace('&lt;', '<').replace('&gt;', '>').strip())
            if t:
                ws.append({'x': float(wm.group(1)), 'x2': float(wm.group(3)),
                           'y': float(wm.group(2)), 't': t})
        ws.sort(key=lambda w: (round(w['y'] / 6), w['x']))
        rows, cur, buf = [], None, []
        for w in ws:
            b = round(w['y'] / 6)
            if cur is None or b == cur:
                buf.append(w)
            else:
                rows.append(buf)
                buf = [w]
            cur = b
        if buf:
            rows.append(buf)
        yield float(pm.group(1)), rows


def hours_gutter(rows, page_w):
    """Where the teaching-hours columns begin.

    Measured from the data rather than assumed: the hours are bare integers
    sitting alone in the right-hand part of the row, so the leftmost such
    integer marks the boundary. Guides differ in where they place it — Economics
    at ~0.62 of the page width, Business management at ~0.55 — and a fixed
    fraction silently truncates titles on whichever guide it does not match.
    """
    xs = []
    for row in rows:
        for w in row:
            if re.fullmatch(r'\d{1,3}', w['t']) and w['x'] > page_w * 0.45:
                xs.append(w['x'])
    if not xs:
        return page_w
    return min(xs) - 10


def parse(key):
    cfg = GUIDES[key]
    pdf = f'ib/{key}.pdf'
    first, last = cfg['pages']
    # Every page carries the guide's name as a running footer. The page number
    # beside it sits right of the hours gutter and is cut away, leaving a bare
    # "Business management guide" that reads as a title continuation and welded
    # itself onto sub-topic 5.1.
    footer = re.compile(rf'^\d{{0,3}}\s*{re.escape(cfg["subject"])}\s+guide\s*\d{{0,3}}$', re.I)
    lines = []
    for page_w, rows in words(pdf, first, last):
        cut = hours_gutter(rows, page_w)
        for row in rows:
            t = ' '.join(w['t'] for w in row if w['x'] < cut).strip()
            t = re.sub(r'\s{2,}', ' ', t)
            if t and not footer.match(t):
                lines.append(t)

    # A sub-topic title can wrap onto the next line, and the continuation has no
    # number of its own. Joining a continuation onto the line above has to
    # happen before anything is classified, or the tail is lost.
    joined, buf = [], ''
    for t in lines:
        if NOISE.match(t) or t in cfg['sections']:
            if buf:
                joined.append(buf)
                buf = ''
            joined.append(t)
        elif ITEM.match(t):
            if buf:
                joined.append(buf)
            buf = t
        elif buf and not re.match(r'^\d', t):
            buf += ' ' + t
        else:
            if buf:
                joined.append(buf)
                buf = ''
            joined.append(t)
    if buf:
        joined.append(buf)

    found = {}
    for t in joined:
        m = ITEM.match(t)
        if not m:
            continue
        unit, num, title = int(m.group(1)), int(m.group(2)), m.group(3).strip()
        # Page numbers and figure captions also look like "2.4 something"; a
        # real sub-topic title starts with a letter and is not a bare number.
        if not re.match(r'^[A-Za-z]', title):
            continue
        key2 = (unit, num)
        if len(title) > len(found.get(key2, '')):
            found[key2] = title

    order, rows_out = [], []
    for i, sec in enumerate(cfg['sections'], 1):
        subs = sorted(k for k in found if k[0] == i)
        if not subs:
            continue
        order.append(sec)
        for k in subs:
            rows_out.append({'section': sec, 'name': f'{k[0]}.{k[1]} {found[k]}'[:300]})

    problems = []
    if not rows_out:
        problems.append('no sub-topics found')
    empty = [s for i, s in enumerate(cfg['sections'], 1) if not any(k[0] == i for k in found)]
    if empty:
        problems.append(f'units with no sub-topics: {empty}')
    # A gap in the numbering means a sub-topic was dropped, which is the failure
    # this whole file exists to avoid; refuse rather than write a short list.
    for i in range(1, len(cfg['sections']) + 1):
        nums = sorted(k[1] for k in found if k[0] == i)
        if nums and nums != list(range(1, len(nums) + 1)):
            problems.append(f'unit {i} numbering has a gap: {nums}')
    return order, rows_out, problems


def split_level(rows, level):
    """SL students do not study sub-topics the guide marks "(HL only)".

    Only a whole-topic marker counts. "(includes HL only sub-topics)" means the
    topic itself is on the SL course and merely contains HL-only parts, so
    dropping it would remove SL content from an SL plan.
    """
    out = []
    for r in rows:
        hl_only = re.search(r'\(HL only\)\s*$', r['name'], re.I)
        if level == 'SL' and hl_only:
            continue
        out.append(r)
    return out


if __name__ == '__main__':
    key = sys.argv[1]
    lvl = sys.argv[2] if len(sys.argv) > 2 else None
    ch, rows, problems = parse(key)
    if lvl:
        rows = split_level(rows, lvl)
        ch = [c for c in ch if any(r['section'] == c for r in rows)]
    print(json.dumps({'board': 'IB', 'qualification': 'IB Diploma',
                      'subject': GUIDES[key]['subject'], 'level': lvl,
                      'years': GUIDES[key]['years'], 'url': GUIDES[key]['url'],
                      'chapters': len(ch), 'topics': len(rows),
                      'ok': not problems, 'problems': problems,
                      'chapter_names': ch, 'rows': rows}, indent=1, ensure_ascii=False))
