#!/usr/bin/env python3
"""Edexcel International GCSE Art and Design.

There is no 4AD1. The qualification is five endorsed titles, each a separate
qualification with its own code — Fine Art 4FA1, Graphic Communication 4GC1,
Photography 4PY1, Textile Design 4TE1, Three-dimensional Design 4TD1 — sharing
one specification and the same two components. A student enters one or more
titles, so all five are listed and the student ticks theirs.

Each title names its areas of study ("Drawing", "Lens-/light-based media"...),
and those are the only named content beneath a title, so they are the
sub-topics. They are lifted from the spec, not transcribed: each title's block
runs from its "Areas of study" heading to the next title heading, and an area
name is a short standalone line between bullet groups.
"""
import re
import sys
import json
import subprocess

TITLES = [
    ('Fine Art', '4FA1'),
    ('Graphic Communication', '4GC1'),
    ('Photography', '4PY1'),
    ('Textile Design', '4TE1'),
    ('Three-dimensional Design', '4TD1'),
]
AREAS_OPEN = re.compile(r'^Areas of study\b')
BULLET = re.compile(r'^\s*[••]')
# An area name is short, starts upper-case, is not boilerplate and not a
# heading of the surrounding document.
NOISE = re.compile(r'^(Work must|Students|The use|Pearson|Specification|Issue \d|'
                   r'Component|Assessment|Knowledge, understanding|Areas of study|'
                   r'International GCSE|Appendi|[0-9])', re.I)


def parse(pdf):
    txt = subprocess.run(['pdftotext', '-layout', pdf, '-'],
                         capture_output=True, text=True, check=True).stdout
    txt = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', ' ', txt)
    lines = txt.split('\n')

    title_re = {t: re.compile(rf'^{re.escape(t)} \({c}\)\s*$') for t, c in TITLES}
    cur, collecting = None, False
    areas = {t: [] for t, _ in TITLES}

    for raw in lines:
        t = raw.strip()
        if not t:
            continue
        hit = next((name for name, rx in title_re.items() if rx.match(t)), None)
        if hit:
            cur, collecting = hit, False
            continue
        if cur is None:
            continue
        if AREAS_OPEN.match(t):
            collecting = True
            continue
        if not collecting:
            continue
        if BULLET.match(raw):
            continue
        # The area list ends where the next chapter of the document begins.
        if re.match(r'^(Component|Assessment Objectives|The table below)', t):
            collecting = False
            continue
        if NOISE.match(t) or len(t) > 48 or not re.match(r'^[A-Z]', t):
            continue
        if t not in areas[cur]:
            areas[cur].append(t)

    order, rows = [], []
    for name, code in TITLES:
        sec = f'{name} ({code}) — endorsed title, a qualification in its own right'
        order.append(sec)
        for a in areas[name]:
            rows.append({'section': sec, 'name': f'Area of study: {a}'[:300]})
    comp = 'Components (every title)'
    order.append(comp)
    rows.append({'section': comp, 'name': 'Component 1: Personal Portfolio (72 marks, 50%)'})
    rows.append({'section': comp, 'name': 'Component 2: Externally-set Assignment (72 marks, 50%)'})

    problems = []
    empty = [n for n, _ in TITLES if not areas[n]]
    if empty:
        problems.append(f'titles with no areas of study: {empty}')
    # The two component names are transcribed; they must appear in the spec.
    flat = re.sub(r'\s+', ' ', txt)
    for c in ('Component 1: Personal Portfolio', 'Component 2: Externally-set Assignment'):
        if c not in flat:
            problems.append(f'component name not found verbatim: {c!r}')
    return order, rows, problems


if __name__ == '__main__':
    order, rows, problems = parse('edx/igcse-artdesign-4AD1.pdf')
    print(json.dumps({
        'board': 'edexcel_igcse', 'qualification': 'IGCSE / O Level',
        'subject': 'Art & Design', 'level': None,
        'subject_code': '4FA1/4GC1/4PY1/4TE1/4TD1',
        'years': 'first teaching 2017',
        'url': open('edx/igcse-artdesign-4AD1.src').read().strip(),
        'chapters': len(order), 'topics': len(rows),
        'ok': not problems, 'problems': problems,
        'chapter_names': order, 'rows': rows,
    }, indent=1, ensure_ascii=False))
