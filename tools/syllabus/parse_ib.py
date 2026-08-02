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
    'biology': {
        'subject': 'Biology',
        'years': 'first assessment 2025',
        'themes': {'A': 'Unity and diversity', 'B': 'Form and function',
                   'C': 'Interaction and interdependence', 'D': 'Continuity and change'},
        'levels': {1: 'Molecules', 2: 'Cells', 3: 'Organisms', 4: 'Ecosystems'},
    },
}

TOPIC = re.compile(r'^([A-D])([1-4])\.(\d{1,2})\s+([A-Z].{3,60}?)\s*$')
# The guide explains its own numbering with a worked example on an early page.
PLACEHOLDER = re.compile(r'^(Topic name|Content statement|Guiding question)', re.I)


def hl_only_topics(pdf):
    """Which topics are HL-only, read off the syllabus roadmap table.

    The marker is a separate "[HL only]" line sitting under its topic in the
    same column. In flat text the columns interleave, so the tag appears
    against whichever topic happens to share its text line — "A1.2 Nucleic
    acids [HL only]" when the tag actually belongs to A2.1 in the next column.
    Attribution therefore has to be done on coordinates: same column, next tag
    below the topic.
    """
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
        tags = [r for r in rows if 'HL only' in r['t']]
        if not tags:
            continue
        labels = [(r, re.match(r'^([A-D])([1-4])\.(\d{1,2})\b', r['t'])) for r in rows]
        labels = [(r, m) for r, m in labels if m]
        for tag in tags:
            # nearest topic label above, in the same column
            cands = [(r, m) for r, m in labels
                     if abs(r['x'] - tag['x']) < 40 and 0 <= tag['y'] - r['y'] < 40]
            if cands:
                r, m = max(cands, key=lambda p: p[0]['y'])
                hl.add((m.group(1), int(m.group(2)), int(m.group(3))))
    return hl


def lines(pdf):
    return subprocess.run(['pdftotext', '-layout', pdf, '-'],
                          capture_output=True, text=True, check=True).stdout.split('\n')


def parse(key, pdf, level=None):
    cfg = GUIDES[key]
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
