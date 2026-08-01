#!/usr/bin/env python3
"""Column-aware Edexcel parser for the "Key ideas | Detailed content" layout.

Some Edexcel specifications (International GCSE Geography, Business) put the
syllabus in a two-column table: numbered Key ideas on the left, lettered
Detailed content on the right. `pdftotext -layout` interleaves the two onto
shared lines, so a text parse produced entries like

    1.1 The world's water a) The hydrological cycle: characteris

with the key idea truncated and the detailed content welded onto it. This reads
word coordinates instead and keeps only the Key ideas column, stitching each
idea's wrapped lines back together.
"""
import re, sys, json, subprocess

TOPIC = re.compile(r'^Topic\s+(\d{1,2})\s*[:.]\s*(.{3,70}?)\s*$')
IDEA  = re.compile(r'^(\d{1,2})\.(\d{1,2})\s+(.*)$')
NOISE = re.compile(r'(Pearson|Specification|Issue \d|©|International GCSE|'
                   r'What students need to learn|Key ideas|Detailed content|'
                   r'^Subject content$|^Content$)', re.I)
# Blocks that follow a key idea in the same column but are not part of it.
# Without this the case-study and integrated-skills blurbs were appended onto
# the previous idea's title, and fieldwork sections were filed as key ideas.
BOUNDARY = re.compile(r'^(Case stud|Integrated skills|Assessment of fieldwork|'
                      r'Fieldwork|Students (must|should)|Note:|In this paper)', re.I)


def pages(pdf):
    xml = subprocess.run(['pdftotext', '-bbox-layout', pdf, '-'],
                         capture_output=True, text=True, check=True).stdout
    for pm in re.finditer(r'<page width="([\d.]+)" height="[\d.]+">(.*?)</page>', xml, re.S):
        w = float(pm.group(1))
        rows = []
        for lm in re.finditer(
                r'<line xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="[\d.]+">(.*?)</line>',
                pm.group(2), re.S):
            t = ' '.join(re.findall(r'>([^<]*)</word>', lm.group(4)))
            t = re.sub(r'\s+', ' ', t.replace('&amp;', '&').replace('&#39;', "'")).strip()
            if t:
                rows.append({'x': float(lm.group(1)), 'y': float(lm.group(2)),
                             'x2': float(lm.group(3)), 't': t})
        yield w, sorted(rows, key=lambda r: (r['y'], r['x']))


def infer_split(rows, w):
    """Widest gap between line-start positions in the left half of the page.

    A two-column content table leaves a clear gutter there; a page of running
    prose does not, so a minimum gap width is required before a split is
    accepted and the page treated as tabular.
    """
    xs = sorted({round(r['x']) for r in rows if r['x'] < 0.75 * w})
    if len(xs) < 3:
        return None
    gaps = [(xs[i + 1] - xs[i], (xs[i] + xs[i + 1]) / 2) for i in range(len(xs) - 1)]
    gaps = [g for g in gaps if 0.18 * w < g[1] < 0.55 * w]
    if not gaps:
        return None
    width, mid = max(gaps)
    return mid if width > 0.10 * w else None


def parse(pdf):
    titles, buckets, order, current = {}, {}, [], None
    split = None      # x boundary between Key ideas and Detailed content

    for w, rows in pages(pdf):
        # Recalibrate the column split from the table header when present.
        # Calibrate only from a real table header row: "Key ideas" and
        # "Detailed content" must sit at clearly different x. The spec also
        # explains both terms in prose earlier, where they share the left
        # margin, and calibrating on that put the split at x=50 so the whole
        # table fell outside the Key ideas column.
        ki = next((r for r in rows if r['t'].strip().lower() == 'key ideas'), None)
        dc = next((r for r in rows if r['t'].strip().lower() == 'detailed content'), None)
        if ki and dc and dc['x'] - ki['x'] > 50:
            split = dc['x'] - 8
        else:
            # No named header: infer the gutter from the data. Most Edexcel
            # subjects use the same two-column shape as Geography but label the
            # columns differently (Psychology heads them "Content"/"Detailed
            # content", Computer Science uses neither), so keying on header
            # text only ever unlocked one subject.
            got = infer_split(rows, w)
            if got:
                split = got

        for r in rows:
            m = TOPIC.match(r['t'])
            if m:
                n, t = int(m.group(1)), m.group(2).strip().rstrip('.,')
                if n not in buckets:
                    buckets[n] = []
                    order.append(n)
                if len(t) > len(titles.get(n, '')):
                    titles[n] = t
                current = n
                continue
            if current is None or split is None or r['x'] >= split:
                continue
            if NOISE.search(r['t']):
                continue
            # The idea number is its own line element, with the title text
            # starting a little to its right and wrapping over further lines.
            m = IDEA.match(r['t'])
            if m:
                buckets[current].append([f'{m.group(1)}.{m.group(2)}', m.group(3).strip()])
            elif re.fullmatch(r'\d{1,2}\.\d{1,2}', r['t'].strip()):
                buckets[current].append([r['t'].strip(), ''])
            elif BOUNDARY.match(r['t']):
                current_open = False
                if buckets[current]:
                    buckets[current].append(['__closed__', ''])
            elif buckets[current] and buckets[current][-1][0] != '__closed__' \
                    and len(r['t']) > 2:
                buckets[current][-1][1] = (buckets[current][-1][1] + ' ' + r['t']).strip()

    # An idea label must name a topic that exists. Psychology's appendix of
    # statistical tables is full of decimals like "79.72" that otherwise match
    # the idea pattern and arrive as sub-chapters.
    maxtopic = max(order) if order else 0

    rows_out = []
    for n in order:
        seen = set()
        for label, body in buckets[n]:
            body = re.sub(r'\s{2,}', ' ', body).strip().rstrip('.')
            # The next section's heading can run onto the last idea of a topic
            # ("...and impact 3 Assessment information").
            body = re.sub(r'\s+\d+\s+(Assessment information|Subject content|'
                          r'Administration|Appendi\w*)\b.*$', '', body, flags=re.I).strip()
            # Paper description pages carry their own numbered subsections
            # ("2.1 Description", "2.2 Assessment information") in the same
            # column shape as key ideas.
            if re.match(r'^(Description|Assessment information|Subject content|'
                        r'Overview|Paper \d)', body, re.I):
                continue
            # Topic numbering starts at 1; a "0.x" label comes from a
            # statistical-tables appendix, not the syllabus.
            head = int(label.split('.')[0]) if label.split('.')[0].isdigit() else 0
            if head < 1 or head > maxtopic:
                continue
            if label == '__closed__' or not body or label in seen:
                continue
            seen.add(label)
            rows_out.append({'section': f'Topic {n}: {titles.get(n, "")}'.strip(),
                             'name': f'{label} {body}'[:300]})

    names = [f'Topic {n}: {titles.get(n, "")}'.strip() for n in order]
    empty = [n for n in order if not buckets[n]]
    problems = []
    if not order:
        problems.append('no topics found')
    if not rows_out:
        problems.append('no key ideas found')
    if empty:
        problems.append(f'topics with no content: {empty[:4]}')
    return names, rows_out, problems


if __name__ == '__main__':
    ch, rows, problems = parse(sys.argv[1])
    print(json.dumps({'chapters': len(ch), 'topics': len(rows),
                      'ok': not problems, 'problems': problems,
                      'chapter_names': ch, 'rows': rows}, indent=1, ensure_ascii=False))
