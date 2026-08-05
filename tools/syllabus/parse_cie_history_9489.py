#!/usr/bin/env python3
"""Cambridge A Level History 9489.

The A Level course is the AS options plus the Paper 4 depth study, and both
halves number their topics 1-9. They cannot be told apart by heading either:
the option names repeat verbatim between the two halves, and the AS American
option's heading survives only inside a summary table where it wraps mid-title.

So each half is read from its own region of the document. The AS options come
from parse_cie.py, which already extracts them correctly for the AS row; Paper
4 is read from its own heading onwards, and its option is decided by the topic
number, which runs 1-9 straight through the three options — three each, stated
as "Within each of the options there are three topics".
"""
import re
import json
import subprocess
import sys

PDF = 'pdf/cambridge-international-as-and-a-level-history-9489.pdf'
# Paper 4 topic -> option. The guide states three topics per option.
PAPER4 = [
    (range(1, 4), 'A Level Paper 4 depth study · European option: European history, 1919-41'),
    (range(4, 7), 'A Level Paper 4 depth study · American option: The USA, 1945-93'),
    (range(7, 10), 'A Level Paper 4 depth study · International option: International history, 1909-94'),
]
ITEM = re.compile(r'^([1-9])\s{2,}([A-Z].{8,70}?)\s*$')


def paper4_topics():
    txt = subprocess.run(['pdftotext', '-layout', PDF, '-'],
                         capture_output=True, text=True, check=True).stdout
    lines = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', ' ', txt).split('\n')
    start = next((i for i, l in enumerate(lines) if l.strip() == 'Paper 4'), None)
    if start is None:
        return {}
    found = {}
    for l in lines[start:]:
        m = ITEM.match(l.strip())
        # A contents entry has the same shape once its dot leaders are ignored.
        if m and '....' not in l:
            n, t = int(m.group(1)), m.group(2).strip()
            if len(t) > len(found.get(n, '')):
                found[n] = t
    return found


def parse():
    as_out = subprocess.run([sys.executable, 'parse_cie.py', PDF],
                            capture_output=True, text=True, check=True).stdout
    as_d = json.loads(as_out)

    rows = [{'section': f'AS Level · {r["section"]}', 'name': r['name']} for r in as_d['rows']]
    order = [f'AS Level · {s}' for s in
             dict.fromkeys(r['section'] for r in as_d['rows'])]

    p4 = paper4_topics()
    for rng, label in PAPER4:
        got = [n for n in rng if n in p4]
        if not got:
            continue
        order.append(label)
        for n in got:
            rows.append({'section': label, 'name': f'{n}. {p4[n]}'[:300]})

    problems = list(as_d['problems'])
    if sorted(p4) != list(range(1, 10)):
        problems.append(f'Paper 4 topics found {sorted(p4)}, expected 1-9')
    if not rows:
        problems.append('no content')
    return order, rows, problems


if __name__ == '__main__':
    order, rows, problems = parse()
    print(json.dumps({
        'board': 'cambridge_alevel', 'qualification': 'A Level',
        'subject': 'History', 'level': None,
        'years': 'syllabus for 2027-2029',
        'url': open(PDF.replace('.pdf', '.src')).read().strip(),
        'chapters': len(order), 'topics': len(rows),
        'ok': not problems, 'problems': problems,
        'chapter_names': order, 'rows': rows,
    }, indent=1, ensure_ascii=False))
