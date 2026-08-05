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
    # Cambridge language, arts and psychology syllabuses whose content is the
    # papers and the skills or components they assess. Each string below is
    # checked against the syllabus before it is written.
    'cie-englang-0500': {
        'board': 'cambridge_igcse', 'qualification': 'IGCSE / O Level',
        'subject': 'English Language', 'pdf': 'pdf/cambridge-igcse-english-first-language-0500.pdf',
        'years': 'syllabus for 2027-2029',
        'sections': [('Skills assessed', ['Reading', 'Writing', 'Speaking and Listening'], False),
                     ('Papers', ['Paper 1 – Reading', 'Paper 2 Directed Writing and Composition'], False)],
    },
    'cie-englang-1123': {
        'board': 'o_level', 'qualification': 'IGCSE / O Level',
        'subject': 'English Language', 'pdf': 'pdf/cambridge-o-level-english-language-1123.pdf',
        'years': 'syllabus for 2027-2028',
        'sections': [('Skills assessed', ['Reading', 'Writing'], False),
                     ('Papers', ['Paper 1 – Reading', 'Paper 2 – Writing'], False)],
    },
    'cie-bengali-3204': {
        'board': 'o_level', 'qualification': 'IGCSE / O Level',
        'subject': 'Bangla', 'pdf': 'pdf/cambridge-o-level-bengali-3204.pdf',
        'years': 'syllabus for 2027',
        'sections': [('Papers', ['Paper 1 – Composition',
                                 'Paper 2: Language Usage and Comprehension'], False)],
    },
    'cie-englang-9093': {
        'board': 'cambridge_alevel', 'qualification': 'A Level',
        'subject': 'English Language', 'pdf': 'pdf/cambridge-international-as-and-a-level-english-language-9093.pdf',
        'years': 'syllabus for 2027-2028',
        'sections': [('Papers', ['Paper 1 – Reading', 'Paper 2 – Writing',
                                 'Paper 3 – Language Analysis', 'Paper 4 – Language Topics'], False)],
    },
    # The syllabus heads its AS content "AS Level content (Paper 1 and Paper
    # 2)", so the AS row is those two papers and no more.
    'cie-englang-9093-as': {
        'board': 'cambridge_alevel', 'qualification': 'AS Level',
        'subject': 'English Language', 'pdf': 'pdf/cambridge-international-as-and-a-level-english-language-9093.pdf',
        'years': 'syllabus for 2027-2028',
        'sections': [('Papers', ['Paper 1 – Reading', 'Paper 2 – Writing'], False)],
    },
    'cie-englit-9695': {
        'board': 'cambridge_alevel', 'qualification': 'A Level',
        'subject': 'English Literature', 'pdf': 'pdf/cambridge-international-as-and-a-level-english-literature-9695.pdf',
        'years': 'syllabus for 2027-2028',
        'sections': [('Papers', ['Paper 1: Drama and Poetry', 'Paper 2: Prose and Unseen',
                                 'Paper 3: Shakespeare and Drama',
                                 'Paper 4: Pre-1900 and Post-1900 Poetry and Prose'], False)],
    },
    'cie-music-9483': {
        'board': 'cambridge_alevel', 'qualification': 'A Level',
        'subject': 'Music', 'pdf': 'pdf/cambridge-international-as-and-a-level-music-9483.pdf',
        'years': 'syllabus for 2027-2028',
        'sections': [('Components', ['Component 2 Practical Music', 'Component 3 Extended Performance',
                                     'Component 4 Extended Composition'], False)],
    },
    'cie-art-9479': {
        'board': 'cambridge_alevel', 'qualification': 'A Level',
        'subject': 'Art & Design', 'pdf': 'pdf/cambridge-international-as-and-a-level-art-and-design-9479.pdf',
        'years': 'syllabus for 2027',
        'sections': [('Components', ['Component 1 – Coursework',
                                     'Component 2 – Externally Set Assignment',
                                     'Component 3 – Personal Investigation'], False)],
    },
    'cie-psych-9990-as': {
        'board': 'cambridge_alevel', 'qualification': 'AS Level',
        'subject': 'Psychology', 'pdf': 'pdf/cambridge-international-as-and-a-level-psychology-9990.pdf',
        'years': 'syllabus for 2027',
        'sections': [('AS Level approaches', ['Biological approach', 'Cognitive approach',
                                              'Learning approach', 'Social approach'], False),
                     ('AS Level papers', ['Paper 1 – Approaches, Issues and Debates',
                                          'Paper 2 – Research Methods'], False)],
    },
    # Edexcel GCE subjects whose content is their components. Component 4 of
    # English Language and of Physical Education is coursework; both are named
    # in the specification and both count toward the qualification.
    'edx-art-9AD0': {
        'board': 'edexcel_alevel', 'qualification': 'A Level', 'subject': 'Art & Design',
        'pdf': 'edx/alevel-art-9AD0.pdf', 'years': 'first teaching 2015',
        'sections': [('Components', ['Component 1: Personal Investigation',
                                     'Component 2: Externally Set Assignment'], False)],
    },
    'edx-englang-9EN0': {
        'board': 'edexcel_alevel', 'qualification': 'A Level', 'subject': 'English Language',
        'pdf': 'edx/alevel-englang-9EN0.pdf', 'years': 'first teaching 2015',
        'sections': [('Components', ['Component 1: Language Variation', 'Component 2: Child Language',
                                     'Component 3: Investigating Language', 'Crafting Language'], False)],
    },
    'edx-englit-9ET0': {
        'board': 'edexcel_alevel', 'qualification': 'A Level', 'subject': 'English Literature',
        'pdf': 'edx/alevel-englit-9ET0.pdf', 'years': 'first teaching 2015',
        'sections': [('Components', ['Component 1: Drama', 'Component 2: Prose',
                                     'Component 3: Poetry'], False)],
    },
    'edx-music-9MU0': {
        'board': 'edexcel_alevel', 'qualification': 'A Level', 'subject': 'Music',
        'pdf': 'edx/alevel-music-9MU0.pdf', 'years': 'first teaching 2016',
        'sections': [('Components', ['Component 1: Performing', 'Component 2: Composing',
                                     'Component 3: Appraising'], False)],
    },
    'edx-pe-9PE0': {
        'board': 'edexcel_alevel', 'qualification': 'A Level', 'subject': 'Physical Education',
        'pdf': 'edx/alevel-pe-9PE0.pdf', 'years': 'first teaching 2016',
        'sections': [('Components', [
            'Component 1: Scientific Principles of Physical Education',
            'Component 2: Psychological and Social Principles of Physical Education',
            'Component 3: Practical performance',
            'Component 4: Performance Analysis and Performance Development'], False)],
    },
    'edx-politics-9PL0': {
        'board': 'edexcel_alevel', 'qualification': 'A Level', 'subject': 'Politics',
        'pdf': 'edx/alevel-politics-9PL0.pdf', 'years': 'first teaching 2017',
        'sections': [('Components', [
            'Component 1: UK Politics and Core Political Ideas',
            'Component 2: UK Government and Non-core Political Ideas',
            'Component 3: Comparative Politics'], False)],
    },
    'edx-englangb-4EB1': {
        'board': 'edexcel_igcse', 'qualification': 'IGCSE / O Level',
        'subject': 'English Language B', 'pdf': 'edx/igcse-englishlangb-4EB1.pdf',
        'years': 'first teaching 2016',
        'sections': [('Component', ['Reading and Writing'], False),
                     ('Sections of the examined paper',
                      ['Section A: Reading', 'Section B: Reading and Writing',
                       'Section C: Writing'], False)],
    },
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


# Some Cambridge syllabuses name their content in headings rather than
# numbering it. Cambridge IGCSE PE runs "1 Anatomy and physiology" then
# "Skeletal and muscular system", "Functions of the skeleton", "Joint types" —
# all set at the same indent as the prose around them, so what marks a heading
# is its shape: short, standalone, and not a sentence.
HEADING_SUBJECTS = {
    'cie-pe-0413': {
        'board': 'cambridge_igcse', 'qualification': 'IGCSE / O Level',
        'subject': 'Physical Education', 'pdf': 'pdf/cambridge-igcse-physical-education-0413.pdf',
        'years': 'syllabus for 2027-2028',
        'sections': [
            (r'^1 Anatomy and physiology$', '1 Anatomy and physiology'),
            (r'^2 Health, fitness and training$', '2 Health, fitness and training'),
            (r'^3 Skill acquisition and psychology$', '3 Skill acquisition and psychology'),
            (r'^4 Social, cultural and ethical influences$', '4 Social, cultural and ethical influences'),
        ],
        'stop': r'^4 Details of the assessment',
    },
}
H_NOISE = re.compile(r'^(Back to contents|Cambridge |Candidates should|The following|'
                     r'This syllabus|Where appropriate|Learners|Note:|For example)', re.I)


def parse_headings(key):
    cfg = HEADING_SUBJECTS[key]
    heads = [(re.compile(rx), lbl) for rx, lbl in cfg['sections']]
    stop = re.compile(cfg['stop'])
    section, buckets, order = None, {}, []

    txt = subprocess.run(['pdftotext', '-layout', cfg['pdf'], '-'],
                         capture_output=True, text=True, check=True).stdout
    txt = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', ' ', txt)
    for raw in txt.split('\n'):
        t = raw.strip()
        if not t:
            continue
        hit = next((l for rx, l in heads if rx.match(t)), None)
        if hit:
            section = hit
            buckets.setdefault(hit, [])
            if hit not in order:
                order.append(hit)
            continue
        if section is None:
            continue
        if stop.match(t):
            section = None
            continue
        # A heading is short, standalone, starts upper-case, and is not a
        # sentence or a list lead-in: those end in a full stop or a colon.
        if (len(t) <= 50 and re.match(r'^[A-Z]', t) and not H_NOISE.match(t)
                and not t.endswith(('.', ':', ',', ';')) and not t.startswith(('•', '-'))
                and not re.match(r'^\d', t)):
            if t not in buckets[section]:
                buckets[section].append(t)

    rows = []
    for s in order:
        for item in buckets[s]:
            rows.append({'section': s, 'name': item[:300]})
    problems = []
    if not rows:
        problems.append('no headings found')
    empty = [s for s in order if not buckets[s]]
    if empty:
        problems.append(f'sections with no headings: {empty}')
    if len(order) != len(cfg['sections']):
        problems.append(f'{len(order)} of {len(cfg["sections"])} sections found')
    return order, rows, problems


if __name__ == '__main__':
    key = sys.argv[1]
    lvl = sys.argv[2] if len(sys.argv) > 2 else None
    if key in HEADING_SUBJECTS:
        cfg = HEADING_SUBJECTS[key]
        order, rows, problems = parse_headings(key)
    else:
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
