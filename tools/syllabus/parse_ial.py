#!/usr/bin/env python3
"""Extract Edexcel International Advanced Level specs into {section, name} rows.

IAL specs are built from units rather than a running topic list. Each unit gets
its own chapter of the document — "Unit 1: Markets in action" — subdivided into
"1.1 Unit description", "1.2 Assessment information" and "1.3 Unit content".
Only 1.3 is syllabus content; the numbered blocks beneath it ("1.3.1
Introductory concepts") are the topics a student actually works through.

So sections are the units and sub-topics are the N.3.M blocks. Going a level
deeper is possible — each block lists plainly-numbered items in a narrow left
column — but those restart at 1 inside every block, so they collide unless the
block is carried along with them, and the column wraps mid-word often enough
that the names come out mangled. The N.3.M level is the deepest level the
document numbers uniquely.

Units are pinned per subject rather than detected: the unit title appears in the
contents list, in a summary table, in a per-unit header and in the running
footer, in slightly different forms, and picking between those is exactly the
guessing that pinning removes.

The IAS/IAL split needs no inference — every one of these specs states it, in
the same words: "consists of two IAS units, Units 1 and 2".
"""
import re
import sys
import json
import subprocess

SUBJECTS = {
    'ial-economics': {
        # The AS row predates the A Level one and is named without the "A".
        # Renaming a row would orphan any subject already created from it, so
        # the name each level is filed under is recorded instead.
        'subject': 'Economics A', 'as_subject': 'Economics',
        'code': 'YEC11', 'as_code': 'XEC11',
        'years': 'first teaching 2018',
        'units': {
            1: 'Markets in action',
            2: 'Macroeconomic performance and policy',
            3: 'Business behaviour',
            4: 'Developments in the global economy',
        },
    },
    'ial-business': {
        'subject': 'Business', 'code': 'YBS11', 'as_code': 'XBS11',
        'years': 'first teaching 2018',
        'units': {
            1: 'Marketing and people',
            2: 'Managing business activities',
            3: 'Business decisions and strategy',
            4: 'Global business',
        },
    },
    # Information Technology is deliberately absent. It numbers unit content
    # "1.1 Hardware" with statements beneath at "1.1.1", which collides with
    # the "1.1 Unit description" heading every unit also carries, so its topics
    # cannot be told apart by number alone the way the others can.

    # One document defines both Mathematics and Further Mathematics. Which
    # units a candidate sits is a choice, not a fixed list — IAS Mathematics is
    # P1, P2 and one applied unit; IAL is P1-P4 and two applied — so every unit
    # is listed and the student ticks the ones they are entered for. Narrowing
    # it here would mean guessing their option.
    'ial-mathematics': {
        'subject': 'Mathematics', 'code': 'YMA01', 'as_code': 'XMA01',
        'years': 'first teaching 2018',
        'mode': 'maths',
        'units': {
            'P1': 'Pure Mathematics 1', 'P2': 'Pure Mathematics 2',
            'P3': 'Pure Mathematics 3', 'P4': 'Pure Mathematics 4',
            'M1': 'Mechanics 1', 'M2': 'Mechanics 2', 'M3': 'Mechanics 3',
            'S1': 'Statistics 1', 'S2': 'Statistics 2', 'S3': 'Statistics 3',
            'D1': 'Decision Mathematics 1',
        },
    },
    # Law is offered at International Advanced Level only — "this qualification
    # consists of two compulsory externally examined papers", and the spec
    # carries no X-prefixed IAS code the way every other subject here does. So
    # there is no AS row to write, and no as_code to write into one.
    'ial-law': {
        'subject': 'Law', 'code': 'YLA1',
        'years': 'first teaching 2018',
        'mode': 'law',
        'units': {
            1: 'Underlying Principles of Law and the English Legal System',
            2: 'The Law in Action',
        },
    },
    'ial-further-mathematics': {
        'subject': 'Further Mathematics', 'code': 'YFM01', 'as_code': 'XFM01',
        'years': 'first teaching 2018',
        'mode': 'maths',
        'pdf': 'ial-mathematics',   # same specification document
        'units': {
            'FP1': 'Further Pure Mathematics 1',
            'FP2': 'Further Pure Mathematics 2',
            'FP3': 'Further Pure Mathematics 3',
            'M1': 'Mechanics 1', 'M2': 'Mechanics 2', 'M3': 'Mechanics 3',
            'S1': 'Statistics 1', 'S2': 'Statistics 2', 'S3': 'Statistics 3',
            'D1': 'Decision Mathematics 1',
        },
    },
}

# "Unit P1: Pure Mathematics 1" heads each unit's content chapter.
UNIT_HEAD = re.compile(r'^Unit\s+((?:F?P|M|S|D)\d)\s*:\s*(.+?)\s*$')
# Sub-topics restart at 1.1 inside every unit, so they only mean anything
# scoped to the unit currently open.
MATHS_SUB = re.compile(r'^(\d{1,2})\.(\d{1,2})\s+(\S.*)$')
MATHS_SUB_ALONE = re.compile(r'^(\d{1,2})\.(\d{1,2})$')
# The running header and footer sit in the same column as the content and read
# as ordinary prose, so an open entry swallowed them: "3.4 Sum and product
# laws. Pearson Edexcel International Advanced Subsidiary/Advanced Level..."
MATHS_NOISE = re.compile(
    r'^(Pearson\b|©|Issue \d|Specification\b|Unit \w+:|Contents\b|'
    r'What students need to learn|Guidance\b|Topics?\b.*\bwhat students)', re.I)
# The appendices follow the last unit, and "Appendix 7: Notation" is a set of
# numbered tables — "1.1 ∈ is an element of", "2.1 = is equal to" — laid out
# exactly like unit content. With the last unit still open they were read as
# Decision Mathematics topics, overwriting the real 1.1 and 1.2.
#
# Matched as a heading only, never as a cross-reference: every unit's
# description ends "...see Appendix 6: Use of calculators.", and treating that
# as the end of the syllabus closed the unit on the first page of P1 and
# emptied the entire parse. A real heading sits at the left margin and carries
# no trailing full stop.
MATHS_END = re.compile(r'^Appendix\s+\d+\s*:\s*[A-Z][^.]*$', re.I)
# "6. The Normal distribution" heads a group of sub-topics. It has to be
# tracked because Edexcel does not always restart the sub-topic numbering with
# it: S1 numbers a topic 5.1 under group 6, colliding with the 5.1 under
# group 5, and the two merged into one entry.
MATHS_GROUP = re.compile(r'^(\d{1,2})\.\s+([A-Z].{3,60})$')

# Law is organised by paper rather than unit, and its content table puts the
# topic in a "Subject content" column against "What students need to learn:".
# The topic label is N.M and reads as a broad area of law — five of them across
# both papers, which is too coarse to revise against. The N.M.K items in the
# facing column are the actual content, 64 of them, so those become the
# sub-topics and the five areas become the sections.
LAW_PAPER = re.compile(r'^Paper\s+(\d)\s*:\s*(.+?)\s*$')
LAW_TOPIC = re.compile(r'^(\d)\.(\d{1,2})\s+(\S.*)$')
LAW_TOPIC_ALONE = re.compile(r'^(\d)\.(\d{1,2})$')
# "1.1.4 Rights, duties, privileges, liabilities and examples of legal
# personality". Assigned by its own number, so its position on the page and
# which topic label happens to be open never matter.
LAW_ITEM = re.compile(r'^(\d)\.(\d{1,2})\.(\d{1,2})\s+(\S.*)$')
LAW_ITEM_ALONE = re.compile(r'^(\d)\.(\d{1,2})\.(\d{1,2})$')
# Bullets sit a level below an item and are illustrative rather than named
# content ("• types/branches"); folding them into the name only lengthens it.
LAW_BULLET = re.compile(r'^[••\-–]\s')
#
# Anchored on the colon, because the page that introduces the table also
# explains it in prose at the left margin — "What students need to learn
# provides a more detailed breakdown of the specific areas of law..." — and
# taking that sentence as the column header put the gutter at x=56, to the left
# of every content row. The whole page of topics was then discarded as though
# it were the other column, which is how topic 1.1 went missing.
LAW_SPLIT = re.compile(r'^What students need to learn\s*:\s*$', re.I)
# "1.3 Paper content" and its siblings head the paper's front matter and have
# the same shape as a topic label.
LAW_FRONT = re.compile(r'^\d\.\d\s+(Paper description|Assessment information|Paper content)\s*$', re.I)

# "1.3.1 Introductory concepts". The middle component is always 3 because unit
# content is always section 3 of a unit; matching it loosely would also pick up
# "1.1.2" out of the unit description.
BLOCK = re.compile(r'^([1-9])\.3\.(\d{1,2})\s+(\S.*?)\s*$')
# Every block heading repeats at the top of each page it runs onto, suffixed
# "(continued)". The suffix is stripped and the longest wording kept, because a
# heading that wraps in the contents list is shorter than the same heading in
# the body.
CONTINUED = re.compile(r'\s*\(continued\)\s*$', re.I)


def lines(pdf):
    txt = subprocess.run(['pdftotext', '-layout', pdf, '-'],
                         capture_output=True, text=True, check=True).stdout
    txt = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', ' ', txt)
    return txt.split('\n')


def rows_xy(pdf):
    """Line boxes with coordinates, page by page.

    The Mathematics units are laid out as "What students need to learn:"
    against a "Guidance" column, and pdftotext at line level welds the two
    together — "1.2 Use and manipulation of surds. Students should be able to
    rationalise denominators." The guidance is not syllabus content, so the
    column has to be cut away by x position.
    """
    xml = subprocess.run(['pdftotext', '-bbox-layout', pdf, '-'],
                         capture_output=True, text=True, check=True).stdout
    for pm in re.finditer(r'<page width="([\d.]+)" height="[\d.]+">(.*?)</page>', xml, re.S):
        out = []
        for lm in re.finditer(r'<line xMin="([\d.]+)" yMin="([\d.]+)"[^>]*>(.*?)</line>',
                              pm.group(2), re.S):
            t = ' '.join(re.findall(r'>([^<]*)</word>', lm.group(3)))
            t = re.sub(r'\s+', ' ', t.replace('&amp;', '&').replace('&#39;', "'")
                       .replace('&lt;', '<').replace('&gt;', '>')).strip()
            if t:
                out.append({'x': float(lm.group(1)), 'y': float(lm.group(2)), 't': t})
        yield float(pm.group(1)), sorted(out, key=lambda r: (r['y'], r['x']))


def parse_maths(cfg, pdf):
    """Mathematics: sections are units, sub-topics are the unit's own N.M items."""
    units = cfg['units']
    buckets, order_seen = {}, []
    unit, pending, split, group = None, None, None, None

    for w, rows in rows_xy(pdf):
        # The gutter is re-measured on every page: unit tables are not all set
        # to the same width, and a stale split truncates or admits guidance.
        g = next((r for r in rows if r['t'].startswith('Guidance')), None)
        if g:
            split = g['x'] - 6
        # An entry never continues across a page break — a wrapped title is
        # laid out inside one table cell. Leaving it open let the top of the
        # next page graft itself onto the last topic of the previous one.
        pending = None
        for r in rows:
            txt = r['t'].strip()
            if MATHS_END.match(txt) and r['x'] < 0.15 * w:
                unit, pending, group = None, None, None
                continue
            m = UNIT_HEAD.match(txt)
            if m:
                unit = m.group(1) if m.group(1) in units else None
                pending, group = None, None
                continue
            if unit is None:
                continue
            # Guidance column: not syllabus content.
            if split is not None and r['x'] >= split:
                continue
            if txt.startswith('What students need to learn'):
                pending = None
                continue
            gm = MATHS_GROUP.match(txt)
            if gm:
                group = int(gm.group(1))
                pending = None
                continue
            m = MATHS_SUB.match(txt)
            if m:
                key = (unit, group, int(m.group(1)), int(m.group(2)))
                if key not in buckets:
                    buckets[key] = m.group(3).strip()
                    order_seen.append(key)
                pending = key
                continue
            m = MATHS_SUB_ALONE.match(txt)
            if m:
                key = (unit, group, int(m.group(1)), int(m.group(2)))
                if key not in buckets:
                    buckets[key] = ''
                    order_seen.append(key)
                pending = key
                continue
            # Titles wrap in the narrow left column, so the open entry keeps
            # absorbing lines until the next label or column header.
            if MATHS_NOISE.match(txt):
                pending = None
                continue
            if pending and re.match(r'^[A-Za-z(]', txt) and len(txt) > 1:
                buckets[pending] = (buckets[pending] + ' ' + txt).strip()

    order, out = [], []
    for u in units:
        keys = sorted((k for k in buckets if k[0] == u),
                      key=lambda k: (k[1] if k[1] is not None else 0, k[2], k[3]))
        if not keys:
            continue
        label = f'Unit {u}: {units[u]}'
        order.append(label)
        for k in keys:
            nm = re.sub(r'\s{2,}', ' ', buckets[k]).strip()
            if not nm:
                continue
            out.append({'section': label, 'name': f'{k[2]}.{k[3]} {nm}'[:300]})

    problems = []
    if not out:
        problems.append('no unit content found')
    empty = [u for u in units if not any(k[0] == u for k in buckets)]
    if empty:
        problems.append(f'units with no content: {empty}')
    return order, out, problems


def parse_law(cfg, pdf):
    """Law: sections are the five broad areas, sub-topics are the detail items.

    Both live in the same table but different columns, so each is read on its
    own side of the gutter: the area label N.M in "Subject content" on the
    left, the N.M.K items in "What students need to learn" on the right.
    """
    papers = cfg['units']
    titles, items = {}, {}
    paper, pend_title, pend_item, split = None, None, None, None
    item_x, text_x = 0.0, None

    for w, rows in rows_xy(pdf):
        # The header is always the right-hand column, so where more than one
        # row matches, the rightmost is the real one.
        hdrs = [r for r in rows if LAW_SPLIT.match(r['t'])]
        if hdrs:
            split = max(h['x'] for h in hdrs) - 6
        pend_title = pend_item = None
        text_x = None
        for r in rows:
            txt = r['t'].strip()
            m = LAW_PAPER.match(txt)
            if m:
                paper = int(m.group(1)) if int(m.group(1)) in papers else None
                pend_title = pend_item = None
                continue
            if paper is None or LAW_FRONT.match(txt):
                pend_title = pend_item = None
                continue
            if split is None:
                continue
            right = r['x'] >= split

            if not right:
                m = LAW_TOPIC.match(txt) or LAW_TOPIC_ALONE.match(txt)
                if m:
                    key = (int(m.group(1)), int(m.group(2)))
                    # A topic label repeats at the top of every page it runs
                    # onto. Re-opening a finished entry let the repeat append
                    # itself: "2.1 The market The market (continued)".
                    if key in titles:
                        pend_title = None
                        continue
                    titles[key] = CONTINUED.sub('', (m.group(3) if m.re is LAW_TOPIC else '')).strip()
                    pend_title = key
                    continue
                if pend_title and re.match(r'^[A-Za-z(]', txt) and not MATHS_NOISE.match(txt):
                    titles[pend_title] = (titles[pend_title] + ' ' + txt).strip()
                continue

            if LAW_BULLET.match(txt):
                continue
            m = LAW_ITEM.match(txt)
            if m:
                key = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
                if key in items:
                    pend_item = None
                    continue
                items[key] = CONTINUED.sub('', m.group(4).strip()).strip()
                pend_item, item_x, text_x = key, r['x'], None
                continue
            m = LAW_ITEM_ALONE.match(txt)
            if m:
                key = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
                if key in items:
                    pend_item = None
                    continue
                items[key] = ''
                pend_item, item_x, text_x = key, r['x'], None
                continue
            # What may be appended to an open item is decided by indentation,
            # which the table sets out unambiguously: the item number sits at
            # the column edge, the item's own text one step in, and its bullets
            # one step further. An unnumbered sub-heading ("The role, function
            # and benefits of law in society") sits back at the column edge,
            # and appending it welded a heading onto the item above —
            # "1.1.3 Sanctioned by the state The role, function and benefits
            # of law in society".
            if not (pend_item and re.match(r'^[A-Za-z(]', txt)) or MATHS_NOISE.match(txt):
                continue
            if r['x'] <= item_x + 15:          # back at the number column: a heading
                pend_item = None
                continue
            if text_x is None:
                text_x = r['x']
            elif abs(r['x'] - text_x) > 3:     # deeper still: a bullet's text
                continue
            items[pend_item] = (items[pend_item] + ' ' + txt).strip()

    order, out = [], []
    for t in sorted(titles):
        kids = sorted(k for k in items if (k[0], k[1]) == t)
        if not kids:
            continue
        label = f'{t[0]}.{t[1]} ' + re.sub(r'\s{2,}', ' ', titles[t]).strip().rstrip(',')
        order.append(label)
        for k in kids:
            nm = re.sub(r'\s{2,}', ' ', items[k]).strip().rstrip(':')
            if not nm:
                continue
            out.append({'section': label, 'name': f'{k[0]}.{k[1]}.{k[2]} {nm}'[:300]})

    problems = []
    if not out:
        problems.append('no paper content found')
    empty = [f'{t[0]}.{t[1]}' for t in sorted(titles)
             if not any((k[0], k[1]) == t for k in items)]
    if empty:
        problems.append(f'areas with no items: {empty}')
    # Numbered from 1 with no gaps. Without this the parse reported success
    # while holding four topics of five, because "no gaps" is trivially true of
    # a list that is almost empty.
    for t in sorted(titles):
        nums = sorted(k[2] for k in items if (k[0], k[1]) == t)
        if nums and nums != list(range(1, len(nums) + 1)):
            problems.append(f'area {t[0]}.{t[1]} item numbering has a gap: {nums}')
    bad = [r['name'] for r in out if CONTINUED.search(r['name'])]
    if bad:
        problems.append(f'{len(bad)} names still carry a "(continued)" marker')
    return order, out, problems


def parse(stem, pdf, level='IAL'):
    cfg = SUBJECTS[stem]
    if cfg.get('mode') == 'maths':
        return parse_maths(cfg, pdf)
    if cfg.get('mode') == 'law':
        return parse_law(cfg, pdf)
    units = cfg['units']
    found = {}

    doc = lines(pdf)
    for i, raw in enumerate(doc):
        m = BLOCK.match(raw.strip())
        if not m:
            continue
        unit, num, title = int(m.group(1)), int(m.group(2)), m.group(3)
        if unit not in units:
            continue
        title = CONTINUED.sub('', title).strip()
        # A long heading wraps, and the remainder carries no number of its own:
        # "4.3.3 Balance of payments, exchange rates and international" /
        # "competitiveness". A continuation always begins lower-case, which no
        # heading, table row or column header in these specs does.
        nxt = doc[i + 1].strip() if i + 1 < len(doc) else ''
        if nxt and nxt[0].islower() and not BLOCK.match(nxt) and len(nxt) < 60:
            # Stripped again after joining: on a page where a wrapped heading
            # repeats, "(continued)" sits at the end of the second line, not
            # the first.
            title = CONTINUED.sub('', f'{title} {nxt}').strip()
        # A page-number column can trail the heading in the contents list
        # ("1.3.1 Introductory concepts     12").
        title = re.sub(r'\s{2,}\d{1,3}\s*$', '', title).strip()
        if not re.search(r'[A-Za-z]{3}', title):
            continue
        key = (unit, num)
        if len(title) > len(found.get(key, '')):
            found[key] = title

    # IAS is the first two units, stated in the spec itself. Anything else
    # would be a guess about which half of the course a student is sitting.
    wanted = [1, 2] if level == 'IAS' else sorted(units)

    order, rows = [], []
    for u in wanted:
        subs = sorted(k for k in found if k[0] == u)
        if not subs:
            continue
        label = f'Unit {u}: {units[u]}'
        order.append(label)
        for k in subs:
            rows.append({'section': label, 'name': f'{k[0]}.3.{k[1]} {found[k]}'[:300]})

    problems = []
    if not rows:
        problems.append('no unit content blocks found')
    empty = [u for u in wanted if not any(k[0] == u for k in found)]
    if empty:
        problems.append(f'units with no content blocks: {empty}')
    # A gap means a block was missed, which is the failure this exists to catch.
    for u in wanted:
        nums = sorted(k[1] for k in found if k[0] == u)
        if nums and nums != list(range(1, len(nums) + 1)):
            problems.append(f'unit {u} block numbering has a gap: {nums}')

    return order, rows, problems


if __name__ == '__main__':
    stem = sys.argv[1]
    level = sys.argv[2] if len(sys.argv) > 2 else 'IAL'
    cfg = SUBJECTS[stem]
    doc = cfg.get('pdf', stem)
    order, rows, problems = parse(stem, f'edx/{doc}.pdf', level)
    src = open(f'edx/{doc}.src').read().strip()
    ias = level == 'IAS'
    # A subject with no IAS code is not offered at that level, so asking for it
    # is an error rather than something to fill in with the A Level content.
    if ias and not cfg.get('as_code'):
        sys.exit(f'{cfg["subject"]} is not offered at IAS level')
    print(json.dumps({
        'board': 'edexcel_alevel',
        'qualification': 'AS Level' if ias else 'A Level',
        'subject': cfg.get('as_subject', cfg['subject']) if ias else cfg['subject'],
        'level': None,
        # The row is being re-pointed from the UK GCE spec it used to describe
        # to the International one these students actually sit, so the code
        # has to move with it or it names the wrong qualification.
        'subject_code': cfg.get('as_code') if ias else cfg['code'],
        'years': cfg['years'], 'url': src,
        'chapters': len(order), 'topics': len(rows),
        'ok': not problems, 'problems': problems,
        'chapter_names': order, 'rows': rows,
    }, indent=1, ensure_ascii=False))
