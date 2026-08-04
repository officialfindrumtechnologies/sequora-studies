#!/usr/bin/env python3
"""The three IB core requirements: theory of knowledge, extended essay, CAS.

None of these is a subject with a syllabus, so each is read for the thing a
student actually works through:

  * TOK by its themes and areas of knowledge — a core theme everyone takes,
    five optional themes of which two are chosen, and five areas of knowledge
    all of which are compulsory.
  * CAS by its three strands and seven learning outcomes, which are what a
    student has to evidence.
  * The extended essay by its five assessment criteria, which is what the
    essay is marked against and so what there is to work on.

Items are lifted from the guides rather than transcribed, and the pinned
headings are checked to appear verbatim first, so a mistyped heading fails
loudly instead of silently selecting nothing.
"""
import re
import sys
import json
import subprocess

# TOK names its optional themes and areas of knowledge in plain bulleted lists;
# both are taken from the guide, keyed on the sentence that introduces them.
TOK_THEMES = re.compile(r'^Knowledge and (technology|language|politics|religion|indigenous societies)$')
TOK_AOK_OPEN = re.compile(r'required to study all five of the following areas of knowledge', re.I)
CAS_LO = re.compile(r'^LO\s*(\d)\s{2,}(\S.*)$')
EE_CRIT = re.compile(r'^Criterion ([A-E]):\s*(\S.*?)\s*$')
BULLET = re.compile(r'^[••]\s+(\S.*)$')

GUIDES = {
    'tok': {'subject': 'Theory of Knowledge (TOK)', 'level': 'Core',
            'years': 'first assessment 2022'},
    'cas': {'subject': 'Creativity Activity Service (CAS)', 'level': 'Core',
            'years': 'for students graduating from 2017'},
    'ee':  {'subject': 'Extended Essay (EE)', 'level': 'Core',
            'years': 'first assessment 2027'},
}


def lines(pdf):
    t = subprocess.run(['pdftotext', '-layout', pdf, '-'],
                       capture_output=True, text=True, check=True).stdout
    return re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', ' ', t).split('\n')


def parse_tok(pdf):
    themes, aoks, collecting = [], [], False
    for raw in lines(pdf):
        t = raw.strip()
        if TOK_AOK_OPEN.search(t):
            collecting = True
            continue
        if collecting:
            m = BULLET.match(t)
            if m:
                v = m.group(1).strip()
                if v not in aoks:
                    aoks.append(v)
                continue
            if aoks:                      # the list ended
                collecting = False
        m = TOK_THEMES.match(t)
        if m and t not in themes:
            themes.append(t)

    rows = [{'section': 'Core theme (compulsory)', 'name': 'Knowledge and the knower'}]
    rows += [{'section': 'Optional themes (choose two of five)', 'name': t} for t in themes]
    rows += [{'section': 'Areas of knowledge (all five compulsory)', 'name': a} for a in aoks]
    problems = []
    if len(themes) != 5:
        problems.append(f'found {len(themes)} optional themes, expected 5')
    if len(aoks) != 5:
        problems.append(f'found {len(aoks)} areas of knowledge, expected 5')
    order = [r['section'] for r in rows]
    return list(dict.fromkeys(order)), rows, problems


def parse_cas(pdf):
    los, pending = {}, None
    for raw in lines(pdf):
        t = raw.strip()
        m = CAS_LO.match(t)
        if m:
            n = int(m.group(1))
            los.setdefault(n, m.group(2).strip())
            pending = n
            continue
        if t.startswith('Descriptor'):
            pending = None
            continue
        # A learning outcome wraps onto a second line before its descriptor.
        if pending and re.match(r'^[a-z]', t) and len(t) < 90:
            los[pending] = (los[pending] + ' ' + t).strip()

    rows = [{'section': 'Strands', 'name': s} for s in ('Creativity', 'Activity', 'Service')]
    rows += [{'section': 'Learning outcomes', 'name': f'LO {n}: {los[n]}'[:300]}
             for n in sorted(los)]
    problems = []
    if sorted(los) != list(range(1, 8)):
        problems.append(f'found learning outcomes {sorted(los)}, expected 1-7')
    return ['Strands', 'Learning outcomes'], rows, problems


def parse_ee(pdf):
    crits = {}
    for raw in lines(pdf):
        m = EE_CRIT.match(raw.strip())
        if m:
            crits.setdefault(m.group(1), m.group(2).strip())
    rows = [{'section': 'Assessment criteria', 'name': f'Criterion {k}: {crits[k]}'}
            for k in sorted(crits)]
    problems = []
    if sorted(crits) != list('ABCDE'):
        problems.append(f'found criteria {sorted(crits)}, expected A-E')
    return ['Assessment criteria'], rows, problems


PARSERS = {'tok': parse_tok, 'cas': parse_cas, 'ee': parse_ee}

if __name__ == '__main__':
    key = sys.argv[1]
    cfg = GUIDES[key]
    order, rows, problems = PARSERS[key](f'ib/{key}.pdf')
    print(json.dumps({
        'board': 'IB', 'qualification': 'IB Diploma',
        'subject': cfg['subject'], 'level': cfg['level'],
        'years': cfg['years'], 'url': open(f'ib/{key}.src').read().strip(),
        'chapters': len(order), 'topics': len(rows),
        'ok': not problems, 'problems': problems,
        'chapter_names': order, 'rows': rows,
    }, indent=1, ensure_ascii=False))
