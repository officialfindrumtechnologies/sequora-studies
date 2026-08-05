#!/usr/bin/env python3
"""IB Diploma guides whose syllabus is a set of options rather than a topic list.

Geography, History and Global Politics all work the same way: a candidate
studies a few options out of many, and the guide sets out every option with its
content beneath. Which options a school enters for is not something the guide
decides, so all of them are listed and the student ticks the ones they take.

Sub-topic numbering restarts inside every option — each of the seven Geography
options runs 1 to 4 — so a number means nothing without the heading above it.
Items are therefore attached to the most recent heading in document order, and
the headings are pinned rather than detected: they sit in the same body font as
the prose around them, and the numbered items look exactly like the assessment
objectives listed on an earlier page.

The SL/HL split is a count, not a subset. SL Geography takes two options and HL
three, from the same seven, so both levels get the same list; only the HL core
extension is genuinely HL-only content.
"""
import re
import sys
import json
import subprocess

GUIDES = {
    # Cambridge History (IGCSE 0470 and O Level 2147 share a syllabus) is core
    # content in two options plus five depth studies, each set out as numbered
    # key questions. The number is followed by a tab rather than a full stop,
    # which is why the default item pattern finds nothing here.
    'cie-history-0470': {
        'board': 'cambridge_igcse', 'qualification': 'IGCSE / O Level',
        'subject': 'History', 'level': None,
        'pdf': 'pdf/cambridge-igcse-history-0470.pdf',
        'years': 'syllabus for 2027-2028',
        'item': r'^(\d{1,2})[\.\t ]\s*([A-Z].{8,})$',
        'sections': [
            (r'^Core content: Option A', 'Core content Option A: The nineteenth century (or Option B)'),
            (r'^Core content: Option B', 'Core content Option B: The twentieth century (or Option A)'),
            (r'^Depth study A:', 'Depth study A: The First World War, 1914-18 (choose at least one)'),
            (r'^Depth study B:', 'Depth study B: Germany, 1918-45 (choose at least one)'),
            (r'^Depth study C:', 'Depth study C: Russia, 1905-41 (choose at least one)'),
            (r'^Depth study D:', 'Depth study D: The United States, 1919-41 (choose at least one)'),
            (r'^Depth study E:', 'Depth study E: The Second World War in Europe and the Asia-Pacific (choose at least one)'),
        ],
    },
    'cie-history-2147': {
        'board': 'o_level', 'qualification': 'IGCSE / O Level',
        'subject': 'History', 'level': None,
        'pdf': 'pdf/cambridge-o-level-history-2147.pdf',
        'years': 'syllabus for 2027-2028',
        'item': r'^(\d{1,2})[\.\t ]\s*([A-Z].{8,})$',
        'sections': [
            (r'^Core content: Option A', 'Core content Option A: The nineteenth century (or Option B)'),
            (r'^Core content: Option B', 'Core content Option B: The twentieth century (or Option A)'),
            (r'^Depth study A:', 'Depth study A: The First World War, 1914-18 (choose at least one)'),
            (r'^Depth study B:', 'Depth study B: Germany, 1918-45 (choose at least one)'),
            (r'^Depth study C:', 'Depth study C: Russia, 1905-41 (choose at least one)'),
            (r'^Depth study D:', 'Depth study D: The United States, 1919-41 (choose at least one)'),
            (r'^Depth study E:', 'Depth study E: The Second World War in Europe and the Asia-Pacific (choose at least one)'),
        ],
    },
    'geography': {
        'subject': 'Geography', 'years': 'first examinations 2019',
        'url': 'https://dp.uwcea.org/docs/Geography%20Subject%20Guide.pdf',
        # heading regex -> section label. Order here is document order.
        'sections': [
            (r'^Option A: Freshwater', 'Option A: Freshwater (choose 2 at SL, 3 at HL)'),
            (r'^Option B: Oceans and coastal margins', 'Option B: Oceans and coastal margins (choose 2 at SL, 3 at HL)'),
            (r'^Option C: Extreme environments', 'Option C: Extreme environments (choose 2 at SL, 3 at HL)'),
            (r'^Option D: Geophysical hazards', 'Option D: Geophysical hazards (choose 2 at SL, 3 at HL)'),
            (r'^Option E: Leisure, tourism and sport', 'Option E: Leisure, tourism and sport (choose 2 at SL, 3 at HL)'),
            (r'^Option F: Food and health', 'Option F: Food and health (choose 2 at SL, 3 at HL)'),
            (r'^Option G: Urban environments', 'Option G: Urban environments (choose 2 at SL, 3 at HL)'),
            (r'^Unit 1: Changing population', 'SL and HL core · Unit 1: Changing population'),
            (r'^Unit 2: Global climate', 'SL and HL core · Unit 2: Global climate—vulnerability and resilience'),
            (r'^Unit 3: Global resource consumption', 'SL and HL core · Unit 3: Global resource consumption and security'),
            (r'^Unit 4: Power, places and networks', 'HL core extension · Unit 4: Power, places and networks'),
            (r'^Unit 5: Human development and diversity', 'HL core extension · Unit 5: Human development and diversity'),
            (r'^Unit 6: Global risks and resilience', 'HL core extension · Unit 6: Global risks and resilience'),
        ],
        # Units 4-6 are the HL core extension and are not on the SL course.
        'hl_only': r'^HL core extension',
    },
}

# " 1. Drainage basin hydrology and geomorphology" — the leading space varies
# with the indent of the table the item sits in, so it is stripped first.
ITEM = re.compile(r'^(\d{1,2})\.\s+([A-Z]\S.*)$')
NOISE = re.compile(r'^(Geography guide|Suggested teaching time|Geographic inquiry|'
                   r'Syllabus content|Assessment|Approaches to|Glossary|Bibliography)', re.I)


def lines(pdf):
    txt = subprocess.run(['pdftotext', '-layout', pdf, '-'],
                         capture_output=True, text=True, check=True).stdout
    txt = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', ' ', txt)
    return txt.split('\n')


def parse(key, pdf, level='HL'):
    cfg = GUIDES[key]
    heads = [(re.compile(rx), label) for rx, label in cfg['sections']]
    item_re = re.compile(cfg['item']) if cfg.get('item') else ITEM
    hl_only = re.compile(cfg['hl_only']) if cfg.get('hl_only') else None

    buckets, order, section = {}, [], None
    for raw in lines(pdf):
        t = raw.strip()
        if not t:
            continue
        hit = next((lbl for rx, lbl in heads if rx.match(t)), None)
        if hit:
            section = hit
            if hit not in order:
                order.append(hit)
            buckets.setdefault(hit, {})
            continue
        # A contents-page entry has the same shape as a key question once its
        # dot leaders are ignored, so "4 Details of the assessment ......" was
        # filed as key question 4 of Core content Option B.
        if section is None or NOISE.match(t) or '....' in t:
            continue
        m = item_re.match(t)
        if not m:
            continue
        n, title = int(m.group(1)), m.group(2).strip()
        # The clearest wording wins: an item appears once in the body and
        # sometimes again, truncated, in a summary table.
        if len(title) > len(buckets[section].get(n, '')):
            buckets[section][n] = title

    if level == 'SL' and hl_only:
        order = [s for s in order if not hl_only.match(s)]

    rows = []
    for s in order:
        for n in sorted(buckets.get(s, {})):
            rows.append({'section': s, 'name': f'{n}. {buckets[s][n]}'[:300]})

    problems = []
    if not rows:
        problems.append('no items found')
    empty = [s for s in order if not buckets.get(s)]
    if empty:
        problems.append(f'sections with no items: {empty}')
    # Numbered from 1 with no gaps; a gap means an item was not read.
    for s in order:
        nums = sorted(buckets.get(s, {}))
        if nums and nums != list(range(1, len(nums) + 1)):
            problems.append(f'{s[:40]} numbering has a gap: {nums}')
    return [s for s in order if buckets.get(s)], rows, problems


if __name__ == '__main__':
    key = sys.argv[1]
    lvl = sys.argv[2] if len(sys.argv) > 2 else 'HL'
    cfg = GUIDES[key]
    order, rows, problems = parse(key, cfg.get('pdf', f'ib/{key}.pdf'), lvl)
    src = cfg.get('url') or open(cfg['pdf'].replace('.pdf', '.src')).read().strip()
    print(json.dumps({
        'board': cfg.get('board', 'IB'),
        'qualification': cfg.get('qualification', 'IB Diploma'),
        'subject': cfg['subject'],
        'level': cfg['level'] if 'level' in cfg else lvl,
        'years': cfg['years'], 'url': src,
        'chapters': len(order), 'topics': len(rows),
        'ok': not problems, 'problems': problems,
        'chapter_names': order, 'rows': rows,
    }, indent=1, ensure_ascii=False))


# The Language B guide sets its five prescribed themes out as a four-column
# table: theme, guiding principle, optional recommended topics, possible
# questions. Only the third column is content a student works through, and the
# columns sit at stable x positions, so the topics are taken from that band.
LANG_THEMES = ['Identities', 'Experiences', 'Human ingenuity',
               'Social organization', 'Sharing the planet']


def rows_xy(pdf):
    xml = subprocess.run(['pdftotext', '-bbox-layout', pdf, '-'],
                         capture_output=True, text=True, check=True).stdout
    for pm in re.finditer(r'<page width="([\d.]+)" height="[\d.]+">(.*?)</page>', xml, re.S):
        out = []
        for lm in re.finditer(r'<line xMin="([\d.]+)" yMin="([\d.]+)"[^>]*>(.*?)</line>',
                              pm.group(2), re.S):
            t = ' '.join(re.findall(r'>([^<]*)</word>', lm.group(3)))
            t = re.sub(r'\s+', ' ', t.replace('&amp;', '&').replace('&#39;', "'")).strip()
            if t:
                out.append({'x': float(lm.group(1)), 'y': float(lm.group(2)), 't': t})
        yield float(pm.group(1)), sorted(out, key=lambda r: (round(r['y'] / 6), r['x']))


def parse_langb(pdf):
    """Language B: sections are the five prescribed themes, sub-topics the
    recommended topics listed against each.

    A theme's own topics wrap inside a narrow column ("Health and well-" /
    "being"), so a bullet opens an entry and every following line in the topic
    column extends it until the next bullet.
    """
    themes, cur, pending = {}, None, None
    for _w, rows in rows_xy(pdf):
        for r in rows:
            t = r['t'].strip()
            # A theme name wraps in its own narrow column — "Human" /
            # "ingenuity", "Social" / "organization" — so matching the whole
            # name found only two of the five and everything after the second
            # piled into "Experiences".
            if r['x'] < 120 and len(t) > 3:
                hit = next((n for n in LANG_THEMES if n == t or n.startswith(t + ' ')), None)
                if hit:
                    cur, pending = hit, None
                    themes.setdefault(hit, [])
                    continue
            if cur is None:
                continue
            if 270 <= r['x'] < 295 and t in ('•', '-', '–'):
                themes[cur].append('')          # a bullet opens the next topic
                pending = True
                continue
            if 295 <= r['x'] < 390 and pending and themes[cur]:
                if re.match(r'^[A-Za-z(]', t):
                    prev = themes[cur][-1]
                    # A word broken across lines keeps its hyphen: "well-" +
                    # "being" is one topic, not two words.
                    sep = '' if prev.endswith('-') else ' '
                    themes[cur][-1] = (prev + sep + t).strip()

    order, out = [], []
    for name in LANG_THEMES:
        items = [re.sub(r'\s{2,}', ' ', i).strip() for i in themes.get(name, [])]
        items = [i for i in items if len(i) > 2]
        if not items:
            continue
        order.append(name)
        for i in items:
            out.append({'section': name, 'name': i[:300]})

    problems = []
    if not out:
        problems.append('no themes found')
    empty = [n for n in LANG_THEMES if not any(r['section'] == n for r in out)]
    if empty:
        problems.append(f'themes with no topics: {empty}')
    return order, out, problems


# The Language A guides have no topic list. Their content is three areas of
# exploration, each introduced by a set of "guiding conceptual questions" —
# these are what a student actually works through, so they are the sub-topics.
# The block ends at "Possible links to TOK", which is commentary rather than
# syllabus.
LANG_A_AREAS = ['Readers, writers and texts', 'Time and space',
                'Intertextuality: Connecting texts', 'Intertextuality: connecting texts']
LANG_A_OPEN = re.compile(r'guiding conceptual questions', re.I)
LANG_A_CLOSE = re.compile(r'^(Possible links to TOK|Assessment|The study of|Works? in translation)', re.I)
# The literature guide bullets its guiding questions; the language and
# literature guide numbers them. Matching only bullets found none of the three
# blocks in the latter.
BULLET_TXT = re.compile(r'^(?:[••]|\d{1,2}\.)\s+(\S.*)$')


def parse_lang_a(pdf):
    """Language A: sections are the areas of exploration, sub-topics the
    guiding conceptual questions the guide sets against each.

    Blocks are assigned to areas by the order they appear, not by finding the
    heading above them. Language A: language and literature does not set its
    area headings as standalone lines the way the literature guide does, and
    matching on them found none of the three.
    """
    AREAS = ['Readers, writers and texts', 'Time and space',
             'Intertextuality: connecting texts']
    blocks, cur, collecting, pending = [], None, False, False
    for raw in lines(pdf):
        t = raw.strip()
        if not t:
            continue
        if LANG_A_OPEN.search(t):
            cur, collecting, pending = [], True, False
            blocks.append(cur)
            continue
        if not collecting:
            continue
        if LANG_A_CLOSE.match(t):
            collecting, pending = False, False
            continue
        m = BULLET_TXT.match(t)
        if m:
            cur.append(m.group(1).strip())
            pending = True
            continue
        # A question wraps onto the next line with no bullet of its own.
        if pending and cur and re.match(r'^[A-Za-z(]', t):
            cur[-1] = (cur[-1] + ' ' + t).strip()

    # Only blocks that actually yielded questions count; the phrase also occurs
    # in the assessment section, where it introduces no list.
    real = []
    for b in blocks:
        qs = [re.sub(r'\s{2,}', ' ', q).strip() for q in b]
        qs = [q for q in qs if q.endswith('?') and len(q) > 12]
        if len(qs) >= 3:
            real.append(qs)

    names, out = [], []
    for i, qs in enumerate(real[:len(AREAS)]):
        a = AREAS[i]
        names.append(a)
        for q in qs:
            out.append({'section': a, 'name': q[:300]})

    problems = []
    if not out:
        problems.append('no guiding questions found')
    if len(real) != len(AREAS):
        problems.append(f'found {len(real)} question blocks, expected {len(AREAS)}')
    return names, out, problems
