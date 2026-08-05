#!/usr/bin/env python3
"""Subjects defined by components and options rather than a topic list.

Some syllabuses genuinely have no decomposition below the level of "these are
the papers, and these are the options you may take". IB psychology sets out
approaches and contexts and then describes each in continuous prose; global
politics names three thematic studies and eight HL topic areas; philosophy has
a core theme and seven optional themes. Inventing sub-topics for these would be
making up a syllabus the board did not write.

So the components and options are the content, and every pinned string is
checked to appear verbatim in the source document before anything is written.
That check is the verification: these lists are transcribed by hand from the
specification, and without it a typo would be published as though it had been
read from the document.

Where a component is genuinely HL-only the SL row drops it, and the reason is
recorded beside it.
"""
import re
import sys
import json
import subprocess

# key -> config. `sections` is a list of (section label, [items], hl_only).
SUBJECTS = {
    'ib-globalpolitics': {
        'board': 'IB', 'qualification': 'IB Diploma', 'subject': 'Global Politics',
        'pdf': 'ib/gp.pdf', 'years': 'first assessment 2026', 'levelled': True,
        # The core topics are named down the left column of a three-column
        # table; verify against that column alone.
        'verify_column': 150,
        'sections': [
            ('Core topics: Understanding power and global politics', [
                'Framing global politics', 'Power in global politics',
                'Systems and interactions in global politics',
            ], False),
            ('Thematic studies (all three)', [
                'Rights and justice', 'Development and sustainability', 'Peace and conflict',
            ], False),
            ('HL extension: Global political challenges (topic areas)', [
                'Borders', 'Environment', 'Equality', 'Health',
                'Identity', 'Poverty', 'Security', 'Technology',
            ], True),
        ],
    },
    'ib-psychology': {
        'board': 'IB', 'qualification': 'IB Diploma', 'subject': 'Psychology',
        'pdf': 'ib/psychology.pdf', 'years': 'first assessment 2027', 'levelled': True,
        'sections': [
            ('Content: approaches to understanding behaviour', [
                'Biological approach', 'Cognitive approach',
                'Sociocultural approach', 'Research methodology',
            ], False),
            ('Contexts (all four)', [
                'Health and well-being', 'Human development',
                'Human relationships', 'Learning and cognition',
            ], False),
            ('HL extensions', [
                'The role of culture, motivation and technology in shaping human behaviour',
                'Data analysis and interpretation',
            ], True),
        ],
    },
    'ib-philosophy': {
        'board': 'IB', 'qualification': 'IB Diploma', 'subject': 'Philosophy',
        'pdf': 'ib/philosophy.pdf', 'years': 'first assessment 2025', 'levelled': True,
        'sections': [
            ('Core theme (compulsory)', ['Being human'], False),
            ('Optional themes (one at SL, two at HL)', [
                'Aesthetics', 'Epistemology', 'Ethics', 'Philosophy of religion',
                'Philosophy of science', 'Political philosophy', 'Social philosophy',
            ], False),
            ('Prescribed text (compulsory)', ['Prescribed text'], False),
        ],
    },
}


def text(pdf, column=None):
    """Normalised document text, optionally restricted to a left column.

    Global politics names its core topics down a narrow column of a
    three-column table — "Framing global" / "politics", "Systems and" /
    "interactions in" / "global politics" — so in the flat text the words are
    interleaved with the two columns beside them and no name appears
    contiguously. Restricting to the column puts each name back together.
    """
    if column is None:
        t = subprocess.run(['pdftotext', '-layout', pdf, '-'],
                           capture_output=True, text=True, check=True).stdout
        return re.sub(r'\s+', ' ', re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', ' ', t))

    xml = subprocess.run(['pdftotext', '-bbox-layout', pdf, '-'],
                         capture_output=True, text=True, check=True).stdout
    parts = []
    for pm in re.finditer(r'<page [^>]*>(.*?)</page>', xml, re.S):
        rows = []
        for lm in re.finditer(r'<line xMin="([\d.]+)" yMin="([\d.]+)"[^>]*>(.*?)</line>',
                              pm.group(1), re.S):
            if float(lm.group(1)) >= column:
                continue
            w = ' '.join(re.findall(r'>([^<]*)</word>', lm.group(3)))
            rows.append((float(lm.group(2)), w))
        parts += [w for _y, w in sorted(rows)]
    t = ' '.join(parts).replace('&amp;', '&').replace('&#39;', "'")
    # Bullets belonging to the facing column sit just inside the gutter, so a
    # name reads "Systems and * interactions in global politics" and never
    # matches. They carry no text of their own and are dropped.
    t = re.sub(r'\s*[\u2022\u2023\u25cf\u25aa]\s*', ' ', t)
    return re.sub(r'\s+', ' ', t)


def parse(key, level=None):
    cfg = SUBJECTS[key]
    body = text(cfg['pdf'], cfg.get('verify_column'))

    missing, order, rows = [], [], []
    for label, items, hl_only in cfg['sections']:
        if hl_only and level == 'SL':
            continue
        kept = []
        for it in items:
            if re.sub(r'\s+', ' ', it) not in body:
                missing.append(it)
            kept.append(it)
        if not kept:
            continue
        order.append(label)
        for it in kept:
            rows.append({'section': label, 'name': it})

    problems = []
    if missing:
        problems.append(f'not found verbatim in the source: {missing}')
    if not rows:
        problems.append('no components')
    return order, rows, problems


if __name__ == '__main__':
    key = sys.argv[1]
    lvl = sys.argv[2] if len(sys.argv) > 2 else None
    cfg = SUBJECTS[key]
    order, rows, problems = parse(key, lvl)
    src = cfg['pdf'].replace('.pdf', '.src')
    print(json.dumps({
        'board': cfg['board'], 'qualification': cfg['qualification'],
        'subject': cfg['subject'],
        'level': lvl if cfg.get('levelled') else None,
        'years': cfg['years'], 'url': open(src).read().strip(),
        'chapters': len(order), 'topics': len(rows),
        'ok': not problems, 'problems': problems,
        'chapter_names': order, 'rows': rows,
    }, indent=1, ensure_ascii=False))
