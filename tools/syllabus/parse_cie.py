#!/usr/bin/env python3
"""Parse a Cambridge syllabus PDF's subject-content section into {section, name}
rows, taken verbatim from the official document so nothing is invented.

Two things make this harder than it looks:

  * Numbered learning objectives inside a topic ("1 understand that all
    physical quantities...") have the same shape as chapter headings
    ("1   Physical quantities and units"). They are told apart by repetition:
    Cambridge repeats the chapter heading as a running header on every page of
    that chapter ("1 Number (continued)"), so a real chapter title occurs many
    times while an objective occurs once.

  * Sub-chapter numbering varies. Most subjects use "1.1"; Maths 0580 splits
    Core and Extended and uses "C1.1" / "E1.1".
"""
import re, sys, json, subprocess
from collections import Counter, defaultdict

SUB_RE  = re.compile(r'^([CE]?)(\d{1,2})\.(\d{1,2})\s+([A-Za-z(].{2,90}?)\s*$')
CHAP_RE = re.compile(r'^(\d{1,2})\s{2,}([A-Z].{2,90}?)\s*$')
NOISE   = re.compile(r'Notes and examples|Candidates should be able|www\.|Back to contents', re.I)


def pdf_lines(pdf):
    txt = subprocess.run(['pdftotext', '-layout', pdf, '-'],
                         capture_output=True, text=True, check=True).stdout
    return txt.split('\n')


def content_start(lines):
    """Last '<n> Subject content' heading that isn't a contents-page entry."""
    idx = [i for i, l in enumerate(lines)
           if re.match(r'^\s*\d+\s+Subject content\s*$', l) and '....' not in l]
    return idx[-1] if idx else 0


def overview_chapters(head):
    """Chapter titles from the contents/overview list: the longest run of
    consecutive '1..N Title' lines appearing before the content pages. Some
    syllabuses (0610) never repeat a running header, so the body-repetition
    signal finds nothing and this is the only source."""
    best, run, expect = {}, {}, 1
    for l in head:
        s = l.strip()
        m = None if '....' in s else re.match(r'^(\d{1,2})\s{1,}([A-Z].{2,90}?)\s*$', s)
        if m and int(m.group(1)) == expect:
            run[expect] = m.group(2).strip(); expect += 1
        elif run:
            if len(run) > len(best): best = run
            run, expect = {}, 1
            if m and int(m.group(1)) == 1:
                run[1] = m.group(2).strip(); expect = 2
    return run if len(run) > len(best) else best


def parse(pdf):
    lines = pdf_lines(pdf)
    start = content_start(lines)
    body = lines[start:]
    overview = overview_chapters(lines[:start])

    subs = defaultdict(list)          # (variant, chapter) -> [(sub, title)]
    seen = set()
    chap_hits = defaultdict(Counter)  # chapter -> Counter(title)

    for raw in body:
        s = raw.strip()
        if not s or '....' in s or NOISE.search(s):
            continue

        m = SUB_RE.match(s)
        if m:
            var, ch, sub, title = m.group(1), int(m.group(2)), int(m.group(3)), m.group(4).strip()
            title = re.sub(r'\s*\(continued\)\s*$', '', title, flags=re.I)
            key = (var, ch, sub)
            if key not in seen:
                seen.add(key)
                subs[(var, ch)].append((sub, title))
            continue

        m = CHAP_RE.match(s)
        if m:
            ch, title = int(m.group(1)), m.group(2).strip()
            title = re.sub(r'\s*\(continued\)\s*$', '', title, flags=re.I)
            chap_hits[ch][title] += 1

    # A chapter title must belong to a chapter that actually has sub-chapters.
    # Prefer a title repeated as a running header (strongest signal); fall back
    # to the overview list for syllabuses that don't use running headers.
    valid = {ch for (_v, ch) in subs}
    chapters = {}
    for ch in valid:
        hits = chap_hits.get(ch)
        if hits and hits.most_common(1)[0][1] > 1:
            chapters[ch] = hits.most_common(1)[0][0]
        elif ch in overview:
            chapters[ch] = overview[ch]
        elif hits:
            chapters[ch] = hits.most_common(1)[0][0]

    variants = sorted({v for (v, _c) in subs})
    rows = []
    for var in variants:
        prefix = {'C': 'Core — ', 'E': 'Extended — ', '': ''}.get(var, '')
        for ch in sorted({c for (v, c) in subs if v == var}):
            title = chapters.get(ch)
            if not title:
                continue
            sec = f'{prefix}{ch}. {title}'
            for sub, stitle in sorted(subs[(var, ch)]):
                rows.append({'section': sec, 'name': f'{var}{ch}.{sub} {stitle}'})

    return chapters, rows


if __name__ == '__main__':
    ch, rows = parse(sys.argv[1])
    print(json.dumps({'chapters': len(ch), 'topics': len(rows), 'rows': rows}, indent=1))
