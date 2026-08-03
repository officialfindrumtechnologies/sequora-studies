#!/usr/bin/env python3
"""Edexcel International GCSE specs laid out as "Key idea | Detailed content".

The syllabus sits in a two-column table: a numbered key idea on the left, its
lettered detail on the right. pdftotext at line level interleaves the two, so a
key idea arrives with detail welded onto it — "1.1 Location, climate and a)
Position of Bangladesh in South Asia and". Only the left column is syllabus
structure, so the gutter is measured from the "Detailed content" header and
everything right of it dropped.

Key ideas are the sub-topics and the numbered topics above them are the
sections. Going a level deeper would mean the lettered detail, which is prose
rather than named content.

Sections are pinned. These specs number their topics with a bare integer
("6 Bangladesh: establishing the new country"), which is also the shape of a
page number and of the mark allocations in the assessment tables, so detecting
them costs more than writing them down.

The paper matters as well as the number: Bangladesh Studies restarts key-idea
numbering in Paper 2, so 1.1 exists twice and means two different things.
"""
import re
import sys
import json
import subprocess

SUBJECTS = {
    'igcse-bdstudies-4BN1': {
        'subject': 'Bangladesh Studies', 'code': '4BN1',
        'years': 'first teaching 2017',
        # (paper, topic number) -> section title. Paper 1 offers a choice —
        # Section A is mandatory, one topic is taken from Section B and one
        # from Section C — so every option is listed and the student ticks the
        # ones they are entered for.
        'sections': {
            (1, 1): 'Paper 1 · 1 Towards Bengali independence (1947–1975) [mandatory]',
            (1, 2): 'Paper 1 · 2 Early Bengal (AD 600–c.1538) [Section B option]',
            (1, 3): 'Paper 1 · 3 The Mughal Empire (c.1550–1764) [Section B option]',
            (1, 4): 'Paper 1 · 4 Bengal under British rule (1764–1911) [Section B option]',
            (1, 5): 'Paper 1 · 5 The road to partition (1909–1947) [Section C option]',
            (1, 6): 'Paper 1 · 6 Bangladesh: establishing the new country [Section C option]',
            (2, 1): 'Paper 2 · Section A: The Physical Environment',
            (2, 2): 'Paper 2 · Section B: The Human Environment',
            (2, 3): 'Paper 2 · Section C: Challenges for Bangladesh',
        },
    },
    'igcse-history-4HI1': {
        'subject': 'History', 'code': '4HI1',
        'years': 'first teaching 2017',
        'mode': 'options',
        # Every optional study is listed. A candidate sits at least two depth
        # studies, one investigation and one breadth study; which ones is the
        # school's choice, so narrowing the list here would be a guess about
        # the student rather than a fact about the syllabus.
        'options': {
            '1': 'Paper 1 depth study · 1 The French Revolution, c1780-99',
            '2': 'Paper 1 depth study · 2 Development of a nation: unification of Italy, 1848-70',
            '3': 'Paper 1 depth study · 3 Germany: development of dictatorship, 1918-45',
            '4': 'Paper 1 depth study · 4 Colonial rule and the nationalist challenge in India, 1919-47',
            '5': 'Paper 1 depth study · 5 Dictatorship and conflict in the USSR, 1924-53',
            '6': 'Paper 1 depth study · 6 A world divided: superpower relations, 1943-72',
            '7': 'Paper 1 depth study · 7 A divided union: civil rights in the USA, 1945-74',
            '8': 'Paper 1 depth study · 8 South Africa: from union to the end of apartheid, 1948-94',
            'A1': 'Paper 2 investigation · A1 The origins and course of the First World War, 1905-18',
            'A2': 'Paper 2 investigation · A2 Russia and the Soviet Union, 1905-24',
            'A3': 'Paper 2 investigation · A3 The USA, 1918-41',
            'A4': 'Paper 2 investigation · A4 The Vietnam Conflict, 1945-75',
            'A5': 'Paper 2 investigation · A5 East Germany, 1958-90',
            'B1': 'Paper 2 breadth study · B1 America: from new nation to divided union, 1783-1877',
            'B2': 'Paper 2 breadth study · B2 Changes in medicine, c1848-c1948',
            'B3': 'Paper 2 breadth study · B3 Japan in transformation, 1853-1945',
            'B4': 'Paper 2 breadth study · B4 China: conflict, crisis and change, 1900-89',
            'B5': 'Paper 2 breadth study · B5 The changing role of international organisations: the league and the UN, 1919-c2011',
            'B6': 'Paper 2 breadth study · B6 The changing nature of warfare and international conflict, 1919-2011',
            'B7': 'Paper 2 breadth study · B7 The Middle East: conflict, crisis and change, 1917-2012',
            'B8': 'Paper 2 breadth study · B8 Diversity, rights and equality in Britain, 1914-2010',
        },
    },
}

# History numbers its Paper 1 options 1-8 and the sub-topics inside each option
# 1, 2, 3 as well, both as a bare integer in the same column. What separates
# them is that an option heading is always followed by "What students need to
# study:", so the heading is recognised by what comes after it rather than by
# how it looks. Paper 2 labels its options A1-A5 and B1-B8, which collide with
# nothing.
STUDY = re.compile(r'^What students need to study', re.I)
OPT_AB = re.compile(r'^([AB]\d)\s+(\S.*)$')
PLAIN = re.compile(r'^(\d{1,2})$')
# Usually the number and its title are separate line elements, but pdftotext
# merges them where the gap is narrow — depth study 8 arrives as "8 South
# Africa: from union to the end of apartheid, 1948-94" — so a single space has
# to be accepted too. The title must be capitalised and of some length, which
# keeps "60 marks" and other stray figures out.
PLAIN_INLINE = re.compile(r'^(\d{1,2})\s+([A-Z].{5,})$')

IDEA = re.compile(r'^(\d{1,2})\.(\d{1,2})\s+(\S.*)$')
IDEA_ALONE = re.compile(r'^(\d{1,2})\.(\d{1,2})$')
# The second paper's content chapter starts here, and with it a fresh 1.1.
PAPER = re.compile(r'^Paper\s+(\d)\s*:\s*\S', re.I)
SPLIT = re.compile(r'^Detailed content\s*$', re.I)
NOISE = re.compile(r'^(Pearson|Specification\b|Issue \d|©|International GCSE|'
                   r'Key idea|Detailed content|Section [A-C]\b|Paper \d)', re.I)


def rows_xy(pdf):
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
        # Rows are bucketed to a tolerance rather than sorted strictly by y. A
        # label and the title beside it sit on the same visual row but not at
        # the same baseline, and a strict sort put "China, 1976-89" ahead of
        # its own "5" — so the title arrived with no label open and was
        # dropped, losing the last sub-topic of that option.
        yield float(pm.group(1)), sorted(out, key=lambda r: (round(r['y'] / 6), r['x']))


def parse(stem, pdf):
    cfg = SUBJECTS[stem]
    sections = cfg['sections']
    buckets = {}
    paper, pending, split, label_x, text_x = 1, None, None, 0.0, None

    for _w, rows in rows_xy(pdf):
        hdr = [r for r in rows if SPLIT.match(r['t'])]
        if hdr:
            split = max(h['x'] for h in hdr) - 6
        # A key idea never continues across a page break; it is one table cell.
        pending, text_x = None, None
        for r in rows:
            txt = r['t'].strip()
            m = PAPER.match(txt)
            if m:
                paper = int(m.group(1))
                pending = None
                continue
            if split is None or r['x'] >= split:
                continue

            m = IDEA.match(txt) or IDEA_ALONE.match(txt)
            if m:
                key = (paper, int(m.group(1)), int(m.group(2)))
                if key not in sections and (paper, int(m.group(1))) not in sections:
                    pending = None
                    continue
                if key in buckets:
                    # A key idea repeats as a running header on the page it
                    # runs onto; re-opening it would append the repeat.
                    pending = None
                    continue
                buckets[key] = m.group(3).strip() if m.re is IDEA else ''
                pending, label_x, text_x = key, r['x'], None
                continue

            # A wrapped line can begin with a digit — key idea 4.3 is "Bengal
            # in the / 19th century" — so requiring a letter truncated it at
            # "Bengal in the". A bare number is a page number, not a wrap.
            if not pending or not re.match(r'^[A-Za-z(0-9]', txt) or NOISE.match(txt):
                continue
            if re.fullmatch(r'\d{1,3}', txt):
                continue
            # A key idea's name wraps within its own narrow column. Anything
            # back at the label's own indent is a new heading, not a wrap.
            if r['x'] <= label_x + 2:
                if text_x is not None:
                    pending = None
                    continue
            if text_x is None:
                text_x = r['x']
            elif abs(r['x'] - text_x) > 3:
                continue
            buckets[pending] = (buckets[pending] + ' ' + txt).strip()

    order, out = [], []
    for (p, t), title in sections.items():
        kids = sorted((k for k in buckets if k[0] == p and k[1] == t), key=lambda k: k[2])
        if not kids:
            continue
        order.append(title)
        for k in kids:
            nm = re.sub(r'\s{2,}', ' ', buckets[k]).strip().rstrip(',')
            if not nm:
                continue
            out.append({'section': title, 'name': f'{k[1]}.{k[2]} {nm}'[:300]})

    problems = []
    if not out:
        problems.append('no key ideas found')
    empty = [s for (p, t), s in sections.items()
             if not any(k[0] == p and k[1] == t for k in buckets)]
    if empty:
        problems.append(f'sections with no key ideas: {empty}')
    # Numbered from 1 with no gaps. Without this a nearly empty parse reports
    # success, because "no gaps" is trivially true of a list of one.
    for (p, t) in sections:
        nums = sorted(k[2] for k in buckets if k[0] == p and k[1] == t)
        if nums and nums != list(range(1, len(nums) + 1)):
            problems.append(f'{p}.{t} key idea numbering has a gap: {nums}')
    return order, out, problems


def parse_options(stem, pdf):
    """History: sections are the optional studies, sub-topics their content.

    Every option is listed rather than the two or three a given student sits,
    because which ones they are entered for is their school's choice and not
    something the specification decides.

    The detail column carries no header to measure a gutter from, so it is
    inferred: it is the leftmost thing starting beyond a third of the page
    width, which on every content page is the detail itself.
    """
    cfg = SUBJECTS[stem]
    labels = cfg['options']
    buckets = {}
    opt = None            # option currently open
    held = None           # (label, bucket_key) read but not yet classified
    pending = None        # bucket accepting wrapped lines
    text_x = None

    for w, rows in rows_xy(pdf):
        cand = [r['x'] for r in rows if r['x'] >= w * 0.3]
        split = min(cand) - 6 if cand else w
        pending, text_x = None, None

        for r in rows:
            txt = r['t'].strip()
            if r['x'] >= split or NOISE.match(txt) or not txt:
                continue

            if STUDY.match(txt):
                # The label last read heads an option, so it was never a
                # sub-topic; anything filed for it under the previous option is
                # removed rather than left behind as a phantom topic.
                if held:
                    lab, key = held
                    if key is not None:
                        buckets.pop(key, None)
                    if lab in labels:
                        opt = lab
                held, pending, text_x = None, None, None
                continue

            m = OPT_AB.match(txt)
            if m and m.group(1) in labels:
                # Held, not opened. The contents page lists every option by
                # label too, and opening B8 there filed the whole of the
                # following overview — including the Paper 1 depth-study list —
                # as B8's content. Only a label that "What students need to
                # study:" follows is heading a real content chapter.
                held, pending, text_x = (m.group(1), None), None, None
                continue

            m = PLAIN_INLINE.match(txt) or PLAIN.match(txt)
            if m:
                n = int(m.group(1))
                body = m.group(2).strip() if m.re is PLAIN_INLINE else ''
                key = None
                if opt is not None and (opt, n) not in buckets:
                    key = (opt, n)
                    buckets[key] = body
                    pending, text_x = key, None
                else:
                    pending = None
                held = (str(n), key)
                continue

            if not pending or not re.match(r'^[A-Za-z(0-9]', txt) \
                    or re.fullmatch(r'\d{1,3}', txt):
                continue
            if text_x is None:
                text_x = r['x']
            elif abs(r['x'] - text_x) > 4:
                continue
            buckets[pending] = (buckets[pending] + ' ' + txt).strip()

    order, out = [], []
    for lab in labels:
        kids = sorted((k for k in buckets if k[0] == lab), key=lambda k: k[1])
        if not kids:
            continue
        order.append(labels[lab])
        for k in kids:
            nm = re.sub(r'\s{2,}', ' ', buckets[k]).strip().rstrip(',')
            if not nm:
                continue
            out.append({'section': labels[lab], 'name': f'{k[1]}. {nm}'[:300]})

    problems = []
    if not out:
        problems.append('no option content found')
    empty = [labels[l] for l in labels if not any(k[0] == l for k in buckets)]
    if empty:
        problems.append(f'{len(empty)} options with no content: {empty[:3]}')
    # Only entries that gained a title count. A bare number in the left column
    # is usually a page number, and it opens an empty bucket that would
    # otherwise read as sub-topic 10 of an option with five.
    for lab in labels:
        nums = sorted(k[1] for k in buckets if k[0] == lab and buckets[k].strip())
        if nums and nums != list(range(1, len(nums) + 1)):
            problems.append(f'option {lab} numbering has a gap: {nums}')
    return order, out, problems


if __name__ == '__main__':
    stem = sys.argv[1]
    cfg = SUBJECTS[stem]
    fn = parse_options if cfg.get('mode') == 'options' else parse
    order, rows, problems = fn(stem, f'edx/{stem}.pdf')
    print(json.dumps({
        'board': 'edexcel_igcse', 'qualification': 'IGCSE / O Level',
        'subject': cfg['subject'], 'level': None, 'subject_code': cfg['code'],
        'years': cfg['years'], 'url': open(f'edx/{stem}.src').read().strip(),
        'chapters': len(order), 'topics': len(rows),
        'ok': not problems, 'problems': problems,
        'chapter_names': order, 'rows': rows,
    }, indent=1, ensure_ascii=False))
