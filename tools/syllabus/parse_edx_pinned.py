#!/usr/bin/env python3
"""Edexcel extraction against PINNED section lists, read off each spec by hand.

Heading detection kept failing on these subjects for two compounding reasons:
their sections are headed by a bare number with the number and title as
separate line elements, and their bibliographies are numbered lines too, so
"Section 1: OECD (2012), Better Skills, Better Jobs" arrived as a chapter.

Pinning removes the guessing from the part that matters. Sub-topics are then
assigned by their OWN number — a sub-topic labelled 4.7 belongs to section 4
wherever it physically sits — so section headings never have to be found at all.
"""
import re, sys, json, subprocess

PINNED = {
    'igcse-physics-4PH1': {
        'subject': 'Physics',
        'tiers': None,
        'sections': {
            1: 'Forces and motion',
            2: 'Electricity',
            3: 'Waves',
            4: 'Energy resources and energy transfers',
            5: 'Solids, liquids and gases',
            6: 'Magnetism and electromagnetism',
            7: 'Radioactivity and particles',
            8: 'Astrophysics',
        },
    },
    'igcse-mathematics-a-4MA1': {
        'subject': 'Mathematics A',
        # Foundation and Higher repeat sections 1-6 with different content,
        # exactly as Cambridge 0580 splits Core and Extended.
        'tiers': ['Foundation Tier', 'Higher Tier'],
        'sections': {
            1: 'Numbers and the number system',
            2: 'Equations, formulae and identities',
            3: 'Sequences, functions and graphs',
            4: 'Geometry and trigonometry',
            5: 'Vectors and transformation geometry',
            6: 'Statistics and probability',
        },
    },
    'igcse-accounting-4AC1': {
        'subject': 'Accounting',
        'tiers': None,
        'mode': 'plain',      # sub-topics are plain integers within each topic
        'sections': {
            1: 'The accounting environment',
            2: 'Introduction to bookkeeping',
            3: 'Introduction to control processes',
            4: 'The preparation of financial statements',
            5: 'Accounting for end of period adjustments',
        },
    },
    'igcse-economics-4EC1': {
        'subject': 'Economics',
        'tiers': None,
        'mode': 'dotted',     # chapters are 1.1/1.2, sub-topics are 1.1.1 etc
        'sections': {
            1: 'The market system',
            2: 'Business economics',
            3: 'Government and the economy',
            4: 'The global economy',
        },
        'chapter_labels': {1: '1.1', 2: '1.2', 3: '2.1', 4: '2.2'},
    },
}

SUB_INLINE = re.compile(r'^(\d{1,2})\.(\d{1,2})\s+([A-Za-z(].{2,80}?)\s*$')
# Physics 4PH1 uses the same shape as IGCSE Biology: a numbered section heading
# on one line, then lettered sub-topics "(a) Units", "(b) Movement and position".
SEC_HEAD = re.compile(r'^(\d{1,2})\s+([A-Z].{3,60}?)\s*$')
LETTER_ALONE = re.compile(r'^\(([a-z])\)$')
LETTER_INLINE = re.compile(r'^\(([a-z])\)\s+([A-Za-z].{2,80}?)\s*$')
SUB_ALONE  = re.compile(r'^(\d{1,2})\.(\d{1,2})$')
# Economics nests one level deeper: chapters 1.1/1.2, sub-topics 1.1.1 etc.
SUB_DOTTED3 = re.compile(r'^(\d)\.(\d)\.(\d{1,2})\s+([A-Za-z].{2,80}?)\s*$')
SUB_DOTTED3_ALONE = re.compile(r'^(\d)\.(\d)\.(\d{1,2})$')
# Accounting numbers its sub-topics plainly within each topic ("4 Professional
# ethics"), with lettered detail in the right-hand column.
SUB_PLAIN = re.compile(r'^(\d{1,2})\s+([A-Z][a-z].{2,70}?)\s*$')
SUB_PLAIN_ALONE = re.compile(r'^(\d{1,2})$')
CONTENT_COL = re.compile(r'^(Students should be taught to|What students need to learn|'
                         r'What learners need to study)', re.I)
NOISE = re.compile(r'(Pearson|Specification|Issue \d|©|International GCSE|Notes|'
                   r'Assessment|Appendi|Sample|Subject content|^\d{1,3}$)', re.I)


def pages(pdf):
    xml = subprocess.run(['pdftotext', '-bbox-layout', pdf, '-'],
                         capture_output=True, text=True, check=True).stdout
    for pm in re.finditer(r'<page width="([\d.]+)" height="[\d.]+">(.*?)</page>', xml, re.S):
        w = float(pm.group(1))
        rows = []
        for lm in re.finditer(
                r'<line xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="[\d.]+">(.*?)</line>',
                pm.group(2), re.S):
            t = ' '.join(re.findall(r'>([^<]*)</word>', lm.group(4)))
            t = re.sub(r'\s+', ' ', t.replace('&amp;', '&').replace('&#39;', "'")).strip()
            if t:
                rows.append({'x': float(lm.group(1)), 'y': float(lm.group(2)), 't': t})
        yield w, sorted(rows, key=lambda r: (r['y'], r['x']))


def parse_dotted3(cfg, pdf):
    """Economics nests a level deeper than the rest: chapters are 1.1/1.2 and
    sub-topics 1.1.1, so the chapter is taken from the first two components of
    each sub-topic's own label."""
    labels = cfg['chapter_labels']
    by_label = {v: k for k, v in labels.items()}
    # Appends are confined to the label's own column: Economics has no header
    # to calibrate a split from, and without this the right-hand detail column
    # ("a) The problem of scarcity...") was appended onto every topic name.
    # Economics does have a header pair, worded "Subject content" against
    # "What learners need to study:", so the column split can be calibrated
    # rather than approximated by proximity to the label - which failed because
    # a wrapped name is indented further than its own label ("1.1.1 The
    # economic" at x=68, "problem" at x=104).
    buckets, pending, split = {}, None, None
    for _w, rows in pages(pdf):
        cc = next((r for r in rows if CONTENT_COL.match(r['t'])), None)
        if cc:
            split = cc['x'] - 8
        for r in rows:
            if split is not None and r['x'] >= split:
                continue
            txt = r['t'].strip()
            m = SUB_DOTTED3.match(txt)
            if m:
                ch = f'{m.group(1)}.{m.group(2)}'
                if ch in by_label:
                    key = (by_label[ch], f'{ch}.{m.group(3)}')
                    buckets.setdefault(key, m.group(4).strip())
                    # Names wrap in the narrow label column, so the key stays
                    # open and following lines in that column append to it.
                    pending = key
                else:
                    pending = None
                continue
            m = SUB_DOTTED3_ALONE.match(txt)
            if m:
                ch = f'{m.group(1)}.{m.group(2)}'
                pending = (by_label[ch], f'{ch}.{m.group(3)}') if ch in by_label else None
                continue
            # A chapter heading closes the entry above it; without this
            # "1.1.6 Externalities" absorbed "1.2 - Business economics".
            # A chapter heading, or the start of the next paper's section,
            # closes the entry above it.
            if re.match(r'^\d\.\d\s*[–-]', txt) or re.match(r'^Paper\b', txt, re.I):
                pending = None
                continue
            if pending and re.match(r'^[A-Za-z0-9]', txt) and not NOISE.search(txt) \
                    and len(txt) > 1:
                buckets[pending] = (buckets.get(pending, '') + ' ' + txt).strip()
    order, out = [], []
    for n in sorted(cfg['sections']):
        keys = sorted((k for k in buckets if k[0] == n),
                      key=lambda k: [int(p) for p in k[1].split('.')])
        if not keys:
            continue
        label = f'{labels[n]} {cfg["sections"][n]}'
        order.append(label)
        for k in keys:
            nm = re.sub(r'\s+\d{1,3}\b', ' ', buckets[k])
            nm = re.sub(r'\s{2,}', ' ', nm).strip()
            out.append({'section': label, 'name': f'{k[1]} {nm}'[:300]})
    probs = [] if len(order) == len(cfg['sections']) else \
        [f'{len(order)} of {len(cfg["sections"])} pinned sections have content']
    return order, out, probs


def parse_plain(cfg, pdf):
    """Accounting numbers sub-topics plainly within each pinned topic."""
    sections = cfg['sections']
    buckets, cur, pending, split = {}, None, None, None
    for w, rows in pages(pdf):
        for r in rows:
            txt = r['t'].strip()
            m = re.match(r'^Topic\s+(\d{1,2})\s*:\s*(.{3,60}?)\s*$', txt)
            if m and int(m.group(1)) in sections:
                cur, pending = int(m.group(1)), None
                split = None
                continue
            if cur is None:
                continue
            if split is None and r['x'] > 0.20 * w:
                split = r['x'] - 4      # first right-column text sets the gutter
            if split and r['x'] >= split:
                continue
            m = SUB_PLAIN.match(txt)
            if m:
                key = (cur, int(m.group(1)))
                buckets.setdefault(key, m.group(2).strip())
                pending = key
                continue
            m = SUB_PLAIN_ALONE.match(txt)
            if m:
                pending = (cur, int(m.group(1)))
                continue
            if pending and re.match(r'^[A-Za-z]', txt) and not NOISE.search(txt) \
                    and len(txt) > 1:
                buckets[pending] = (buckets.get(pending, '') + ' ' + txt).strip()
    order, out = [], []
    for n in sorted(sections):
        keys = sorted(k for k in buckets if k[0] == n)
        if not keys:
            continue
        label = f'Topic {n}: {sections[n]}'
        order.append(label)
        for k in keys:
            out.append({'section': label, 'name': f'{k[1]}. {buckets[k]}'[:300]})
    probs = [] if len(order) == len(sections) else \
        [f'{len(order)} of {len(sections)} pinned sections have content']
    return order, out, probs


def parse(stem, pdf):
    cfg = PINNED[stem]
    if cfg.get('mode') == 'dotted':
        return parse_dotted3(cfg, pdf)
    if cfg.get('mode') == 'plain':
        return parse_plain(cfg, pdf)
    sections, tiers = cfg['sections'], cfg['tiers']
    buckets, split, tier = {}, None, (tiers[0] if tiers else None)
    lettered, cur_sec, pending_letter = {}, None, None

    for w, rows in pages(pdf):
        cc = next((r for r in rows if CONTENT_COL.match(r['t'])), None)
        if cc:
            split = cc['x'] - 8

        # Lettered-sub-topic layout (Physics): the section heading is a single
        # line and must match a pinned title, so bibliography entries cannot
        # masquerade as sections.
        for r in rows:
            txt0 = r['t'].strip()
            m = SEC_HEAD.match(txt0)
            # The heading is only one line element on the first section's page;
            # elsewhere the number and title are separate ("2" at x=62,
            # "Electricity" at x=98), so the pair is matched too. Requiring the
            # title to match the pinned name keeps this safe.
            if not m and re.fullmatch(r'\d{1,2}', txt0) and int(txt0) in sections:
                nbr = next((q for q in rows if abs(q['y'] - r['y']) < 5 and q is not r
                            and q['x'] > r['x']), None)
                if nbr:
                    class _M:
                        def group(self, i): return txt0 if i == 1 else nbr['t'].strip()
                    m = _M()
            if m and int(m.group(1)) in sections:
                want = sections[int(m.group(1))].lower()[:14]
                if m.group(2).strip().lower().startswith(want):
                    cur_sec = int(m.group(1))
                    pending_letter = None
                    continue
            if cur_sec is None:
                continue
            txt = r['t'].strip()
            m = LETTER_INLINE.match(txt)
            if m:
                lettered.setdefault((cur_sec, m.group(1)), m.group(2).strip())
                pending_letter = None
                continue
            m = LETTER_ALONE.match(txt)
            if m:
                pending_letter = (cur_sec, m.group(1))
                continue
            if pending_letter and re.match(r'^[A-Z]', txt) and 2 < len(txt) < 80 \
                    and not NOISE.search(txt):
                lettered.setdefault(pending_letter, txt)
                pending_letter = None

        if split is None:
            continue

        pending = None
        for r in rows:
            if tiers:
                # Only a standalone tier heading switches tier; the words also
                # appear inside running text, which flipped Foundation to
                # Higher early and lost Foundation sections 3-6.
                for t in tiers:
                    if r['t'].strip().lower() == t.lower():
                        tier = t
            if r['x'] >= split:
                continue
            txt = r['t'].strip()

            m = SUB_INLINE.match(txt)
            if m and int(m.group(1)) in sections:
                key = (tier, int(m.group(1)), int(m.group(2)))
                buckets.setdefault(key, m.group(3).strip())
                pending = None
                continue

            m = SUB_ALONE.match(txt)
            if m and int(m.group(1)) in sections:
                # label on its own line, its name on the following line
                pending = (tier, int(m.group(1)), int(m.group(2)))
                continue

            # Sub-topic names wrap over several lines in the narrow label
            # column ("Angles, lines" / "and triangles"), so keep appending
            # until the next label rather than taking only the first line.
            # A continuation can begin with a digit ("3D shapes and volume"),
            # so digits are allowed here; real labels were already consumed by
            # the two patterns above.
            if pending and not NOISE.search(txt) and re.match(r'^[A-Za-z0-9(]', txt) \
                    and len(txt) > 1:
                buckets[pending] = (buckets.get(pending, '') + ' ' + txt).strip()

    # Lettered layout wins when the numbered one found nothing.
    if not buckets and lettered:
        order, rows_out = [], []
        for n in sorted(sections):
            subs = sorted(k for k in lettered if k[0] == n)
            if not subs:
                continue
            label = f'{n}. {sections[n]}'
            order.append(label)
            for key in subs:
                rows_out.append({'section': label,
                                 'name': f'({key[1]}) {lettered[key]}'[:300]})
        problems = [] if len(order) == len(sections) else \
            [f'{len(order)} of {len(sections)} pinned sections have content']
        return order, rows_out, problems

    order, rows_out = [], []
    for t in (tiers or [None]):
        for n in sorted(sections):
            label = f'{t} — {n}. {sections[n]}' if t else f'{n}. {sections[n]}'
            subs = sorted(k for k in buckets if k[0] == t and k[1] == n)
            if not subs:
                continue
            order.append(label)
            for key in subs:
                # Contents-page entries carry a trailing page number.
                nm = re.sub(r'\s+\d{1,3}$', '', buckets[key]).strip()
                rows_out.append({'section': label,
                                 'name': f'{key[1]}.{key[2]} {nm}'[:300]})

    expected = len(sections) * (len(tiers) if tiers else 1)
    problems = []
    if not rows_out:
        problems.append('no sub-topics found')
    if len(order) != expected:
        problems.append(f'{len(order)} of {expected} pinned sections have content')
    return order, rows_out, problems


if __name__ == '__main__':
    stem = sys.argv[1]
    ch, rows, problems = parse(stem, f'edx/{stem}.pdf')
    print(json.dumps({'subject': PINNED[stem]['subject'], 'chapters': len(ch),
                      'topics': len(rows), 'ok': not problems, 'problems': problems,
                      'chapter_names': ch, 'rows': rows}, indent=1, ensure_ascii=False))
