#!/usr/bin/env python3
"""Edexcel GCE History 9HI0.

The qualification is entirely a choice of options: one breadth study with
interpretations from Paper 1, one depth study from Paper 2, one theme from
Paper 3, plus coursework. Which combination a school teaches is its own
decision — the specification groups them into eight routes but does not
prescribe one — so every option is listed and the student ticks theirs.

The three papers label their options differently, which is why one pattern
cannot read all of them: Paper 1 is "Paper 1, Option 1A:", Paper 2 is
"Paper 2, Option 2A.1:", and Paper 3 numbers its themes "30:" through "39.2:"
with no paper prefix at all.
"""
import re
import json
import subprocess

PDF = 'edx/alevel-history-9HI0.pdf'
P12 = re.compile(r'^\s*Paper ([12]),? Option ([0-9][A-Z](?:\.[12])?):\s*(\S.*?)\s*$')
P3 = re.compile(r'^\s*(3[0-9](?:\.[12])?):\s*(\S.*?)\s*$')
SECTIONS = {
    '1': 'Paper 1: Breadth study with interpretations (choose one)',
    '2': 'Paper 2: Depth study (choose one)',
    '3': 'Paper 3: Themes in breadth with aspects in depth (choose one)',
}
COURSEWORK = 'Coursework: a historical enquiry of the centre’s own design'


def lines():
    txt = subprocess.run(['pdftotext', '-layout', PDF, '-'],
                         capture_output=True, text=True, check=True).stdout
    return re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', ' ', txt).split('\n')


def parse():
    found = {'1': {}, '2': {}, '3': {}}
    for l in lines():
        if '....' in l:            # a contents entry, not the option itself
            continue
        m = P12.match(l)
        if m:
            paper, code, title = m.group(1), m.group(2), m.group(3)
        else:
            m = P3.match(l)
            if not m:
                continue
            paper, code, title = '3', m.group(1), m.group(2)
        # An option title shares its line with the facing column; a run of
        # three spaces is the column break.
        title = re.split(r'\s{3,}', title)[0].strip()
        if len(title) < 6:
            continue
        if len(title) > len(found[paper].get(code, '')):
            found[paper][code] = title

    order, rows = [], []
    for p in ('1', '2', '3'):
        if not found[p]:
            continue
        order.append(SECTIONS[p])
        for code in sorted(found[p], key=lambda c: (c[0], c)):
            rows.append({'section': SECTIONS[p], 'name': f'Option {code}: {found[p][code]}'[:300]})
    order.append('Coursework')
    rows.append({'section': 'Coursework', 'name': COURSEWORK})

    problems = []
    for p, want in (('1', 8), ('2', 16), ('3', 16)):
        if len(found[p]) != want:
            problems.append(f'Paper {p}: {len(found[p])} options, expected {want}')
    return order, rows, problems


if __name__ == '__main__':
    order, rows, problems = parse()
    print(json.dumps({
        'board': 'edexcel_alevel', 'qualification': 'A Level',
        'subject': 'History', 'level': None,
        'years': 'first teaching 2015',
        'url': open(PDF.replace('.pdf', '.src')).read().strip(),
        'chapters': len(order), 'topics': len(rows),
        'ok': not problems, 'problems': problems,
        'chapter_names': order, 'rows': rows,
    }, indent=1, ensure_ascii=False))
