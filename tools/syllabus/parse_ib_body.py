#!/usr/bin/env python3
"""IB guides whose syllabus content is a flat run of self-labelling sub-topics.

Environmental systems and societies numbers its sub-topics "4.2 Water quality"
and computer science "A2.1 Network fundamentals". Either way the label names
the unit it belongs to, so items are filed by their own number and the unit
headings never have to be located — which matters because those headings are
set in the same body font as the prose around them.

The syllabus outline is not used here. It lists the units with their teaching
hours but only spells out sub-topics for the first one, so parsing it would
yield a course of three topics where there are twenty-seven.

Units are pinned. Both guides state them in a summary table, and writing them
down is cheaper and safer than teaching a parser to read that table.
"""
import re
import sys
import json
import subprocess

# A title can begin with a one-letter word — Edexcel Geography 5.2 is "A
# drainage basin is an open system" — so requiring a non-space second character
# silently dropped those sub-topics. Only a minimum length is required now.
GUIDES = {
    'ess': {
        'subject': 'Environmental Systems & Societies',
        'years': 'first assessment 2026',
        'item': r'^(\d)\.(\d{1,2})\s+([A-Z].{2,})$',
        'units': {
            '1': 'Topic 1: Foundation',
            '2': 'Topic 2: Ecology',
            '3': 'Topic 3: Biodiversity and conservation',
            '4': 'Topic 4: Water',
            '5': 'Topic 5: Land',
            '6': 'Topic 6: Atmosphere and climate change',
            '7': 'Topic 7: Natural resources',
            '8': 'Topic 8: Human populations and urban systems',
        },
    },
    # Cambridge IGCSE Sociology has the same shape as the IB guides here — six
    # topics whose sub-topics label themselves "3.2 What are the..." — so it
    # uses this parser rather than parse_cie.py, which needs a chapter heading
    # it can find and this syllabus states its topics only in a prose list.
    'cie-sociology-0495': {
        'board': 'cambridge_igcse', 'qualification': 'IGCSE / O Level',
        'pdf': 'pdf/cambridge-igcse-sociology-0495.pdf',
        'subject': 'Sociology', 'level': None,
        'years': 'syllabus for 2025-2027',
        'item': r'^(\d)\.(\d{1,2})\s+([A-Z].{2,})$',
        'units': {
            '1': 'Paper 1 · 1 Research methods',
            '2': 'Paper 1 · 2 Identity: self and society',
            '3': 'Paper 1 · 3 Social stratification and inequality',
            '4': 'Paper 2 · 4 Family (teach two of topics 4-6)',
            '5': 'Paper 2 · 5 Education (teach two of topics 4-6)',
            '6': 'Paper 2 · 6 Crime, deviance and social control (teach two of topics 4-6)',
        },
    },
    # Edexcel GCE Geography numbers its content "2A.7", "8B.12" — the label
    # carries its own option letter, so the eleven units separate themselves.
    # AS is Areas of study 1 and 2, which is topics 1-4; the spec's own AS
    # document contains only those labels, which is how the split is known
    # rather than guessed.
    'edx-geography-9GE0': {
        'board': 'edexcel_alevel', 'qualification': 'A Level',
        'pdf': 'edx/alevel-geography-9GE0.pdf',
        'subject': 'Geography', 'level': None,
        'years': 'first teaching 2016',
        'item': r'^(\d[AB]?)\.(\d{1,2})\s+([A-Z(].{2,})$',
        'units': {
            '1':  'Area of study 1 · Topic 1: Tectonic Processes and Hazards',
            '2A': 'Area of study 1 · Topic 2A: Glaciated Landscapes and Change (or 2B)',
            '2B': 'Area of study 1 · Topic 2B: Coastal Landscapes and Change (or 2A)',
            '3':  'Area of study 2 · Topic 3: Globalisation',
            '4A': 'Area of study 2 · Topic 4A: Regenerating Places (or 4B)',
            '4B': 'Area of study 2 · Topic 4B: Diverse Places (or 4A)',
            '5':  'Area of study 3 · Topic 5: The Water Cycle and Water Insecurity',
            '6':  'Area of study 3 · Topic 6: The Carbon Cycle and Energy Security',
            '7':  'Area of study 4 · Topic 7: Superpowers',
            '8A': 'Area of study 4 · Topic 8A: Health, Human Rights and Intervention (or 8B)',
            '8B': 'Area of study 4 · Topic 8B: Migration, Identity and Sovereignty (or 8A)',
        },
    },
    'edx-geography-8GE0': {
        'board': 'edexcel_alevel', 'qualification': 'AS Level',
        'pdf': 'edx/as-geography-8GE0.pdf',
        'subject': 'Geography', 'level': None,
        'years': 'first teaching 2016',
        'item': r'^(\d[AB]?)\.(\d{1,2})\s+([A-Z(].{2,})$',
        'units': {
            '1':  'Area of study 1 · Topic 1: Tectonic Processes and Hazards',
            '2A': 'Area of study 1 · Topic 2A: Glaciated Landscapes and Change (or 2B)',
            '2B': 'Area of study 1 · Topic 2B: Coastal Landscapes and Change (or 2A)',
            '3':  'Area of study 2 · Topic 3: Globalisation',
            '4A': 'Area of study 2 · Topic 4A: Regenerating Places (or 4B)',
            '4B': 'Area of study 2 · Topic 4B: Diverse Places (or 4A)',
        },
    },
    'compsci': {
        'subject': 'Computer Science',
        'years': 'first assessment 2027',
        'item': r'^([AB]\d)\.(\d{1,2})\s+([A-Z].{2,})$',
        'units': {
            'A1': 'Theme A: Concepts of computer science — A1 Computer fundamentals',
            'A2': 'Theme A: Concepts of computer science — A2 Networks',
            'A3': 'Theme A: Concepts of computer science — A3 Databases',
            'A4': 'Theme A: Concepts of computer science — A4 Machine learning',
            'B1': 'Theme B: Computational thinking and problem-solving — B1 Computational thinking',
            'B2': 'Theme B: Computational thinking and problem-solving — B2 Programming',
            'B3': 'Theme B: Computational thinking and problem-solving — B3 Object-oriented programming',
            'B4': 'Theme B: Computational thinking and problem-solving — B4 Abstract data types [HL only]',
        },
        # Stated in the syllabus outline as "B4 Abstract data types—HL only",
        # with no SL teaching hours against it at all.
        'hl_only_units': ['B4'],
    },
}

# A marker on the heading itself means the sub-topic is not on the SL course.
# All three bracketings occur: computer science writes "A1.4 Translation (HL
# only)" in parentheses, the sciences use "[HL only]", and the syllabus outline
# uses an em dash. Matching only the first two left two HL topics on the SL
# course — exactly the quiet wrongness this pipeline exists to prevent.
HL_ONLY = re.compile(r'(\[HL only\]|\(HL only\)|[—–-]\s*HL only)\s*$', re.I)
NOISE = re.compile(r'^(Environmental systems|Computer science guide|Syllabus|'
                   r'Assessment|Glossary|Bibliography|Appendi)', re.I)


def lines(pdf):
    txt = subprocess.run(['pdftotext', '-layout', pdf, '-'],
                         capture_output=True, text=True, check=True).stdout
    txt = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', ' ', txt)
    return txt.split('\n')


def parse(key, pdf, level='HL'):
    cfg = GUIDES[key]
    item_re = re.compile(cfg['item'])
    units = cfg['units']
    found, hl = {}, set()

    for raw in lines(pdf):
        t = raw.strip()
        m = item_re.match(t)
        if not m or NOISE.match(t):
            continue
        unit, num, title = m.group(1), int(m.group(2)), m.group(3).strip()
        if unit not in units:
            continue
        # A page-number column can trail the heading in the contents list.
        title = re.sub(r'\s{2,}\(?\d{1,3}\)?\s*$', '', title).strip()
        if HL_ONLY.search(title):
            hl.add((unit, num))
            title = HL_ONLY.sub('', title).strip()
        if not re.search(r'[A-Za-z]{3}', title):
            continue
        # The clearest wording wins: a heading appears in the body in full and
        # again, sometimes truncated, in the contents list.
        if len(title) > len(found.get((unit, num), '')):
            found[(unit, num)] = title

    hl_units = set(cfg.get('hl_only_units', []))
    order, rows = [], []
    for u, label in units.items():
        if level == 'SL' and u in hl_units:
            continue
        subs = sorted(k for k in found if k[0] == u)
        if level == 'SL':
            subs = [k for k in subs if k not in hl]
        if not subs:
            continue
        order.append(label)
        for k in subs:
            suffix = ' [HL only]' if k in hl else ''
            rows.append({'section': label, 'name': f'{k[0]}.{k[1]} {found[k]}{suffix}'[:300]})

    problems = []
    if not rows:
        problems.append('no sub-topics found')
    want = [u for u in units if not (level == 'SL' and u in hl_units)]
    empty = [u for u in want if not any(k[0] == u for k in found)]
    if empty:
        problems.append(f'units with no sub-topics: {empty}')
    # Numbered from 1 with no gaps; a gap means a sub-topic was not read.
    for u in want:
        nums = sorted(k[1] for k in found if k[0] == u)
        if nums and nums != list(range(1, len(nums) + 1)):
            problems.append(f'unit {u} numbering has a gap: {nums}')
    return order, rows, problems


if __name__ == '__main__':
    key = sys.argv[1]
    lvl = sys.argv[2] if len(sys.argv) > 2 else 'HL'
    cfg = GUIDES[key]
    order, rows, problems = parse(key, cfg.get('pdf', f'ib/{key}.pdf'), lvl)
    print(json.dumps({
        'board': cfg.get('board', 'IB'),
        'qualification': cfg.get('qualification', 'IB Diploma'),
        'subject': cfg['subject'],
        'level': cfg['level'] if 'level' in cfg else lvl,
        'years': cfg['years'],
        'url': open(cfg.get('pdf', f'ib/{key}.pdf').replace('.pdf', '.src')).read().strip(),
        'chapters': len(order), 'topics': len(rows),
        'ok': not problems, 'problems': problems,
        'chapter_names': order, 'rows': rows,
    }, indent=1, ensure_ascii=False))
