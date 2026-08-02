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


def hl_only_topics(pdf):
    """DISABLED — returns an empty set. Kept for the record of why.

    The roadmap table's [HL only] tags cannot be attributed reliably at line
    level. pdftotext merges adjacent columns into one line element, so
    "B2.2 Organelles" from one column and "and motility [HL only]" from the
    next arrive as a single line reading "B2.2 Organelles and motility
    [HL only]" — the tag belongs to B3.3 Muscle and motility, not B2.2.
    Coordinates do not help when two columns already share a line element;
    that needs word-level extraction (pdftotext -bbox), not line-level.

    Until then no HL/SL distinction is claimed: HL rows carry the full topic
    list, which is correct for HL by definition, and SL rows are left alone.

    The marker is a separate "[HL only]" line sitting under its topic in the
    same column. In flat text the columns interleave, so the tag appears
    against whichever topic happens to share its text line — "A1.2 Nucleic
    acids [HL only]" when the tag actually belongs to A2.1 in the next column.
    Attribution therefore has to be done on coordinates: same column, next tag
    below the topic.
    """
    return set()

    xml = subprocess.run(['pdftotext', '-bbox-layout', pdf, '-'],
                         capture_output=True, text=True, check=True).stdout
    hl = set()
    for pm in re.finditer(r'<page width="[\d.]+" height="[\d.]+">(.*?)</page>', xml, re.S):
        rows = []
        for lm in re.finditer(
                r'<line xMin="([\d.]+)" yMin="([\d.]+)"[^>]*>(.*?)</line>', pm.group(1), re.S):
            t = ' '.join(re.findall(r'>([^<]*)</word>', lm.group(3))).strip()
            if t:
                rows.append({'x': float(lm.group(1)), 'y': float(lm.group(2)), 't': t})
        # The tag itself wraps: "and cladistics [HL" on one line, "only]" on
        # the next. Matching only the complete string "HL only" missed those,
        # which is how A3.2 and C2.2 escaped detection.
        tags = [r for r in rows if re.search(r'\[HL\b|HL only', r['t'])]
        if not tags:
            continue
        labels = [(r, re.match(r'^([A-D])([1-4])\.(\d{1,2})\b', r['t'])) for r in rows]
        labels = [(r, m) for r, m in labels if m]
        for tag in tags:
            # nearest topic label above, in the same column
            cands = [(r, m) for r, m in labels
                     if abs(r['x'] - tag['x']) < 40 and 0 <= tag['y'] - r['y'] < 60]
            if cands:
                r, m = max(cands, key=lambda p: p[0]['y'])
                hl.add((m.group(1), int(m.group(2)), int(m.group(3))))
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


def parse(key, pdf, level=None):
    cfg = GUIDES[key]
    if cfg.get('style') == 'physics':
        return parse_simple(cfg, pdf, TOPIC_PHYSICS,
                            lambda m: (m.group(1), f'{m.group(1)}.{m.group(2)}', m.group(3).strip()))
    if cfg.get('style') == 'chemistry':
        return parse_simple(cfg, pdf, TOPIC_CHEM,
                            lambda m: (f'{m.group(1)} {m.group(2)}',
                                       f'{m.group(1)} {m.group(2)}.{m.group(3)}',
                                       m.group(4).strip()))
    hl = hl_only_topics(pdf)
    themes, levels = cfg['themes'], cfg['levels']
    found = {}

    for raw in lines(pdf):
        m = TOPIC.match(raw.strip())
        if not m:
            continue
        theme, lvl, num, title = m.group(1), int(m.group(2)), int(m.group(3)), m.group(4).strip()
        if PLACEHOLDER.match(title):
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
