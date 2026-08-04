#!/usr/bin/env python3
"""IB arts guides, which decompose into syllabus areas and no further.

Film, music, theatre and visual arts do not have a topic list. Each guide sets
out three or four syllabus areas and then describes them through Inquiry,
Action and Reflection columns of continuous prose — there is nothing beneath
the areas that the guide names as a topic. So the areas are the content, and
the template says so rather than inventing a decomposition that the IB does
not make.

Each area is checked to appear verbatim in the guide before anything is
written. That is the whole verification: these strings are transcribed by hand
from the syllabus outline, and a typo would otherwise be published as though it
had been read from the document.

The HL-only area is genuinely HL-only — the outline gives it no SL teaching
hours at all — so the SL row drops it.
"""
import re
import sys
import json
import subprocess

GUIDES = {
    'film': {
        'subject': 'Film', 'years': 'first assessment 2024',
        'areas': [
            ('Exploring film production roles', False),
            ('Reading film', False),
            ('Contextualizing film', False),
            ('Collaboratively producing film', True),
        ],
    },
    'music': {
        'subject': 'Music', 'years': 'first assessment 2022',
        'areas': [
            ('Exploring music in context', False),
            ('Experimenting with music', False),
            ('Presenting music', False),
            ('The contemporary music maker', True),
        ],
    },
    'theatre': {
        'subject': 'Theatre', 'years': 'first assessment 2024',
        'areas': [
            ('Staging play texts', False),
            ('Exploring world theatre traditions', False),
            ('Collaboratively creating original theatre', False),
            ('Performing theatre theory', True),
        ],
    },
    'va': {
        'subject': 'Visual Arts', 'years': 'first assessment 2027',
        # The 2027 visual arts course has no HL-only area; SL and HL differ in
        # the quantity of resolved work rather than in what is studied.
        'areas': [
            ('Create', False),
            ('Connect', False),
            ('Communicate', False),
            ('Integration of create, connect, communicate', False),
        ],
    },
}


def text(pdf):
    t = subprocess.run(['pdftotext', '-layout', pdf, '-'],
                       capture_output=True, text=True, check=True).stdout
    return re.sub(r'\s+', ' ', re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', ' ', t))


def parse(key, pdf, level='HL'):
    cfg = GUIDES[key]
    body = text(pdf)

    missing = [a for a, _hl in cfg['areas'] if re.sub(r'\s+', ' ', a) not in body]
    rows, order = [], []
    sl_label = 'Syllabus areas (SL and HL)'
    hl_label = 'Syllabus area (HL only)'
    for area, hl in cfg['areas']:
        if hl and level == 'SL':
            continue
        sec = hl_label if hl else sl_label
        if sec not in order:
            order.append(sec)
        rows.append({'section': sec, 'name': area})

    problems = []
    if missing:
        problems.append(f'areas not found verbatim in the guide: {missing}')
    if not rows:
        problems.append('no areas')
    return order, rows, problems


if __name__ == '__main__':
    key = sys.argv[1]
    lvl = sys.argv[2] if len(sys.argv) > 2 else 'HL'
    cfg = GUIDES[key]
    order, rows, problems = parse(key, f'ib/{key}.pdf', lvl)
    print(json.dumps({
        'board': 'IB', 'qualification': 'IB Diploma',
        'subject': cfg['subject'], 'level': lvl,
        'years': cfg['years'], 'url': open(f'ib/{key}.src').read().strip(),
        'chapters': len(order), 'topics': len(rows),
        'ok': not problems, 'problems': problems,
        'chapter_names': order, 'rows': rows,
    }, indent=1, ensure_ascii=False))
