#!/usr/bin/env python3
"""Extract IB Diploma subject guides into {section, name} rows.

Provenance note: IB does not publish subject guides on ibo.org — they sit
behind My IB. The PDFs used here are the official guides (IB copyright, IB
publication imprint, stated first-assessment year) mirrored by schools, so the
content is authentic but the mirror is not authoritative for currency. Each
template records the exact URL used and the guide's own stated version.

The 2025 sciences are organised as four themes lettered A–D, each explored at
four levels of biological organization, giving chapters like "A1" with topics
numbered "A1.1 Water" beneath them. Content statements ("A1.1.1—Water as the
medium for life") sit a level below and are not used as sub-chapters: they are
sentences, not topic names.
"""
import re, sys, json, subprocess

GUIDES = {
    'physics': {
        'subject': 'Physics',
        'years': 'first assessment 2025',
        'style': 'physics',
        'chapters': {
            'A': 'Space, time and motion',
            'B': 'The particulate nature of matter',
            'C': 'Wave behaviour',
            'D': 'Fields',
            'E': 'Nuclear and quantum physics',
        },
    },
    'chemistry': {
        'subject': 'Chemistry',
        'years': 'first assessment 2025',
        'style': 'chemistry',
        'chapters': {
            'Structure 1': 'Models of the particulate nature of matter',
            'Structure 2': 'Models of bonding and structure',
            'Structure 3': 'Classification of matter',
            'Reactivity 1': 'What drives chemical reactions?',
            'Reactivity 2': 'How much, how fast and how far?',
            'Reactivity 3': 'What are the mechanisms of chemical change?',
        },
    },
    'maths-aa': {
        'subject': 'Mathematics: Analysis & Approaches',
        'years': 'first assessment 2021',
        'style': 'maths',
        'chapters': {
            1: 'Number and algebra',
            2: 'Functions',
            3: 'Geometry and trigonometry',
            4: 'Statistics and probability',
            5: 'Calculus',
        },
    },
    'maths-ai': {
        'subject': 'Mathematics: Applications & Interpretation',
        'years': 'first assessment 2021',
        'style': 'maths',
        'chapters': {
            1: 'Number and algebra',
            2: 'Functions',
            3: 'Geometry and trigonometry',
            4: 'Statistics and probability',
            5: 'Calculus',
        },
    },
    'biology': {
        'subject': 'Biology',
        'years': 'first assessment 2025',
        'themes': {'A': 'Unity and diversity', 'B': 'Form and function',
                   'C': 'Interaction and interdependence', 'D': 'Continuity and change'},
        'levels': {1: 'Molecules', 2: 'Cells', 3: 'Organisms', 4: 'Ecosystems'},
    },
}

# Each 2025 science guide numbers itself differently, so the pattern and the
# chapter names come from the guide's own config rather than being assumed.
TOPIC = re.compile(r'^([A-D])([1-4])\.(\d{1,2})\s+([A-Z].{3,60}?)\s*$')
TOPIC_PHYSICS = re.compile(r'^([A-E])\.(\d{1,2})\s+([A-Z].{3,60}?)\s*$')
TOPIC_CHEM = re.compile(r'^(Structure|Reactivity)\s+(\d)\.(\d{1,2})\s*[—–-]\s*([A-Za-z].{3,60}?)\s*$')
# The guide explains its own numbering with a worked example on an early page.
PLACEHOLDER = re.compile(r'^(Topic name|Content statement|Guiding question)', re.I)


def hl_only_topics(pdf, label_re):
    """Which topics are HL-only, read off the syllabus roadmap table.

    Line-level extraction cannot do this. pdftotext merges adjacent columns
    into one line element, so "B2.2 Organelles" and "and motility [HL only]"
    from the next column arrive as a single line and the tag lands on the wrong
    topic — B2.2 instead of B3.3.

    At word level the columns are separable: topic labels cluster at a handful
    of x positions, one per column, and a tag belongs to the last label above
    it in its own column.
    """
    hl = set()
    for _w, words in pages_words(pdf):
        labels = [(wd, label_re.match(wd['t'])) for wd in words]
        labels = [(wd, m) for wd, m in labels if m]
        tags = [wd for wd in words if wd['t'].startswith('[HL')]
        if not labels or not tags:
            continue

        # Column origins are the distinct x positions the labels start at.
        cols = sorted({round(wd['x']) for wd, _ in labels})
        merged = []
        for c in cols:
            if not merged or c - merged[-1] > 25:
                merged.append(c)

        def col_of(x):
            hit = [c for c in merged if x >= c - 12]
            return hit[-1] if hit else None

        for tag in tags:
            tc = col_of(tag['x'])
            if tc is None:
                continue
            above = [(wd, m) for wd, m in labels
                     if col_of(wd['x']) == tc and wd['y'] <= tag['y'] + 6]
            if above:
                wd, m = max(above, key=lambda p: p[0]['y'])
                hl.add(m.group(0))
    return hl


def lines(pdf):
    return subprocess.run(['pdftotext', '-layout', pdf, '-'],
                          capture_output=True, text=True, check=True).stdout.split('\n')


def parse_simple(cfg, pdf, pattern, keyfn):
    """Physics and Chemistry: one flat chapter key per topic, taken from the
    topic's own label, so chapter order never has to be inferred."""
    found = {}
    for raw in lines(pdf):
        m = pattern.match(raw.strip())
        if not m:
            continue
        ch, label, title = keyfn(m)
        if PLACEHOLDER.match(title) or ch not in cfg['chapters']:
            continue
        if len(title) > len(found.get((ch, label), '')):
            found[(ch, label)] = title
    order, rows = [], []
    for ch in cfg['chapters']:
        subs = [k for k in found if k[0] == ch]
        subs.sort(key=lambda k: [int(p) for p in re.findall(r'\d+', k[1])])
        if not subs:
            continue
        name = f'{ch}. {cfg["chapters"][ch]}'
        order.append(name)
        for k in subs:
            rows.append({'section': name, 'name': f'{k[1]} {found[k]}'[:300]})
    missing = [c for c in cfg['chapters'] if not any(k[0] == c for k in found)]
    probs = []
    if not rows:
        probs.append('no topics found')
    if missing:
        probs.append(f'chapters with no topics: {missing}')
    return order, rows, probs


# "SL 1.1" / "AHL 1.10" — the level is in the label itself, which is why this
# guide can be split into SL and HL when the sciences cannot.
MATHS_LABEL = re.compile(r'^(SL|AHL)\s+(\d)\.(\d{1,2})$')
MATHS_STOP = re.compile(r'^(Connections|Other contexts|Links to other subjects|'
                        r'International-mindedness|TOK:|Enrichment|Use of technology|'
                        r'Aim|Syllabus content)', re.I)
# Column headers sit between the label and its statement; they must be skipped
# without closing the topic, or the statement itself is never reached.
MATHS_HEADER = re.compile(r'^(Content|Guidance)\b', re.I)


def parse_maths(cfg, pdf, want_level):
    """Mathematics guides label each sub-topic "SL 1.1" or "AHL 1.10" and put
    its statement in a Content column beside a Guidance column. There are no
    short topic names, so the statement itself becomes the name.

    HL studies SL plus AHL; SL studies only the SL items. Unlike the sciences,
    that split is unambiguous because it is written into every label.
    """
    found, order_seen = {}, []
    for _w, words in pages_words(pdf):
        # group words into visual rows
        rows, cur_b, buf = [], None, []
        for wd in words:
            b = round(wd['y'] / 7)
            if cur_b is None or b == cur_b:
                buf.append(wd); cur_b = b
            else:
                rows.append(buf); buf = [wd]; cur_b = b
        if buf:
            rows.append(buf)

        split = None
        for row in rows:
            for wd in row:
                if wd['t'].startswith('Guidance'):
                    split = wd['x'] - 8
        cur = None
        for row in rows:
            line = ' '.join(w['t'] for w in row).strip()
            m = MATHS_LABEL.match(line)
            if m:
                cur = (m.group(1), int(m.group(2)), int(m.group(3)))
                if cur not in found:
                    found[cur] = ''
                    order_seen.append(cur)
                continue
            if cur is None:
                continue
            if MATHS_HEADER.match(line):
                continue
            if MATHS_STOP.match(line):
                cur = None
                continue
            # keep only the words in the Content column
            kept = ' '.join(w['t'] for w in row if split is None or w['x'] < split).strip()
            if len(kept) > 1:
                found[cur] = (found[cur] + ' ' + kept).strip()

    levels = ['SL', 'AHL'] if want_level == 'HL' else ['SL']
    order, rows_out = [], []
    for n in sorted(cfg['chapters']):
        keys = [k for k in order_seen if k[1] == n and k[0] in levels]
        keys.sort(key=lambda k: (k[0] != 'SL', k[2]))
        if not keys:
            continue
        label = f'Topic {n}: {cfg["chapters"][n]}'
        order.append(label)
        for k in keys:
            body = re.sub(r'\s{2,}', ' ', found[k]).strip()
            if not body:
                continue
            rows_out.append({'section': label,
                             'name': f'{k[0]} {k[1]}.{k[2]} {body}'[:300]})
    missing = [n for n in cfg['chapters'] if not any(k[1] == n for k in found)]
    probs = []
    if not rows_out:
        probs.append('no topics found')
    if missing:
        probs.append(f'topics with no content: {missing}')
    return order, rows_out, probs


def pages_words(pdf):
    """Word-level coordinates. Line-level is not enough here: pdftotext merges
    the Content and Guidance columns into a single line element, so a statement
    arrives with guidance text welded onto it ("...a x 10 k where Calculator or
    co"). Filtering words by x is the only way to separate them."""
    xml = subprocess.run(['pdftotext', '-bbox', pdf, '-'],
                         capture_output=True, text=True, check=True).stdout
    for pm in re.finditer(r'<page width="([\d.]+)" height="[\d.]+">(.*?)</page>', xml, re.S):
        words = []
        for wm in re.finditer(
                r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="[\d.]+" yMax="[\d.]+">([^<]*)</word>',
                pm.group(2)):
            t = wm.group(3).replace('&amp;', '&').replace('&#39;', "'") \
                           .replace('&lt;', '<').replace('&gt;', '>').strip()
            if t:
                words.append({'x': float(wm.group(1)), 'y': float(wm.group(2)), 't': t})
        # Maths notation puts superscripts and subscripts on their own y, so
        # sorting strictly by y then x interleaves "10 k" out of order. Rows are
        # bucketed to a tolerance that keeps a line together, then read left to
        # right within the bucket.
        yield float(pm.group(1)), sorted(words, key=lambda w: (round(w['y'] / 7), w['x']))


def pages_xy(pdf):
    xml = subprocess.run(['pdftotext', '-bbox-layout', pdf, '-'],
                         capture_output=True, text=True, check=True).stdout
    for pm in re.finditer(r'<page width="([\d.]+)" height="[\d.]+">(.*?)</page>', xml, re.S):
        rows = []
        for lm in re.finditer(
                r'<line xMin="([\d.]+)" yMin="([\d.]+)"[^>]*>(.*?)</line>', pm.group(2), re.S):
            t = ' '.join(re.findall(r'>([^<]*)</word>', lm.group(3)))
            t = re.sub(r'\s+', ' ', t.replace('&amp;', '&').replace('&#39;', "'")
                       .replace('&lt;', '<').replace('&gt;', '>')).strip()
            if t:
                rows.append({'x': float(lm.group(1)), 'y': float(lm.group(2)), 't': t})
        yield float(pm.group(1)), sorted(rows, key=lambda r: (r['y'], r['x']))


def parse(key, pdf, level=None):
    cfg = GUIDES[key]
    if cfg.get('style') == 'maths':
        return parse_maths(cfg, pdf, level or 'HL')
    if cfg.get('style') == 'physics':
        return parse_simple(cfg, pdf, TOPIC_PHYSICS,
                            lambda m: (m.group(1), f'{m.group(1)}.{m.group(2)}', m.group(3).strip()))
    if cfg.get('style') == 'chemistry':
        return parse_simple(cfg, pdf, TOPIC_CHEM,
                            lambda m: (f'{m.group(1)} {m.group(2)}',
                                       f'{m.group(1)} {m.group(2)}.{m.group(3)}',
                                       m.group(4).strip()))
    hl_labels = hl_only_topics(pdf, re.compile(r'^[A-D][1-4]\.\d{1,2}$'))
    hl = {(l[0], int(l[1]), int(l.split('.')[1])) for l in hl_labels}
    themes, levels = cfg['themes'], cfg['levels']
    found = {}

    for raw in lines(pdf):
        m = TOPIC.match(raw.strip())
        if not m:
            continue
        theme, lvl, num, title = m.group(1), int(m.group(2)), int(m.group(3)), m.group(4).strip()
        if PLACEHOLDER.match(title):
            continue
        # Titles must come from the body heading, not the roadmap table: the
        # table merges columns, so "A2.3 Viruses" arrives as "Viruses [HL and
        # cladistics [HL of biodiversity [HL only]".
        if '[HL' in title:
            continue
        title = re.sub(r'\s*\[HL only\]\s*$', '', title, flags=re.I).strip()
        # The clearest wording wins: the contents page truncates some titles
        # that the body gives in full.
        key3 = (theme, lvl, num)
        if len(title) > len(found.get(key3, '')):
            found[key3] = title

    order, rows = [], []
    for theme in sorted(themes):
        for lvl in sorted(levels):
            subs = sorted(k for k in found if k[0] == theme and k[1] == lvl)
            if level == 'SL':
                subs = [k for k in subs if k not in hl]
            if not subs:
                continue
            label = f'{theme}{lvl}. {themes[theme]} — {levels[lvl]}'
            order.append(label)
            for k in subs:
                # SL students do not study HL-only topics; listing them would
                # put content on an SL plan that is not on an SL syllabus.
                if level == 'SL' and k in hl:
                    continue
                suffix = ' [HL only]' if k in hl else ''
                rows.append({'section': label,
                             'name': f'{k[0]}{k[1]}.{k[2]} {found[k]}{suffix}'[:300]})

    problems = []
    if not rows:
        problems.append('no topics found')
    missing = [f'{t}{l}' for t in themes for l in levels
               if not any(k[0] == t and k[1] == l for k in found)]
    if missing:
        problems.append(f'theme/level groups with no topics: {missing}')
    return order, rows, problems


if __name__ == '__main__':
    key = sys.argv[1]
    lvl = sys.argv[2] if len(sys.argv) > 2 else None
    ch, rows, problems = parse(key, f'ib/{key}.pdf', lvl)
    print(json.dumps({'subject': GUIDES[key]['subject'], 'level': lvl, 'chapters': len(ch),
                      'topics': len(rows), 'ok': not problems, 'problems': problems,
                      'chapter_names': ch, 'rows': rows}, indent=1, ensure_ascii=False))
