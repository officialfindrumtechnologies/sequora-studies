#!/usr/bin/env python3
"""Parse a Pearson Edexcel specification into {section, name} rows.

Edexcel is laid out far more simply than Cambridge or BM&DC: single column,
numbered sections ("1 The nature and variety of living organisms") each listing
lettered sub-topics ("(a) Characteristics of living organisms"), with numbered
assessment objectives (1.1, 1.2, ...) below those. Chapters are the numbered
sections and sub-chapters are the lettered sub-topics, which maps straight onto
the {section, name} shape the app already renders.

The sub-topic list appears twice per section — once under "The following
sub-topics are covered in this section" and again as the headings themselves —
so entries are de-duplicated per chapter.
"""
import re, sys, json, subprocess

CONTENT_HEAD = re.compile(r'^\s*\d+\s+[A-Z][A-Za-z /&-]*(content|Content)\s*$')
# "1 The nature and variety of living organisms" (body heading, no page number)
CHAP = re.compile(r'^(\d{1,2})\s{2,}([A-Z][^\d].{3,70}?)\s*$')
# contents-page form ends with a page number
CHAP_TOC = re.compile(r'^(\d{1,2})\s{2,}([A-Z][^\d].{3,70}?)\s+\d{1,3}\s*$')
SUB = re.compile(r'^\(([a-z])\)\s+(.{3,90}?)\s*$')
STOP = re.compile(r'^\s*\d+\s+(Assessment information|Administration and general|'
                  r'Appendi|Assessment objectives)', re.I)


def text(pdf):
    return subprocess.run(['pdftotext', '-layout', pdf, '-'],
                          capture_output=True, text=True, check=True).stdout.split('\n')


def parse(pdf):
    lines = text(pdf)

    # The subject chapters are listed inside the spec's own "<n> <Subject>
    # content" section, not on the front contents page — that one lists the
    # document's sections (About this specification, Assessment information,
    # Administration) and harvesting it produced those as chapters.
    starts = [i for i, l in enumerate(lines) if CONTENT_HEAD.match(l)]
    toc, seen = [], set()
    for st in starts:
        cand, s2 = [], set()
        for l in lines[st + 1: st + 40]:
            m = CHAP_TOC.match(l.strip())
            if m:
                n, t = int(m.group(1)), m.group(2).strip()
                if n not in s2 and n == len(cand) + 1:
                    s2.add(n)
                    cand.append((n, t))
            elif cand:
                break
        if len(cand) > len(toc):
            toc = cand
    if not toc:
        return [], [], ['no chapter list found']

    names = {n: t for n, t in toc}
    order = [t for _, t in toc]
    buckets = {t: [] for t in order}

    current, started = None, False
    for l in lines:
        s = l.strip()
        if not s:
            continue
        if started and STOP.match(s):
            break
        m = CHAP.match(s)
        if m and int(m.group(1)) in names:
            n = int(m.group(1))
            # the body heading repeats the contents-page wording
            if m.group(2).strip().lower().startswith(names[n][:12].lower()):
                current, started = names[n], True
                continue
        if current:
            m = SUB.match(s)
            if m:
                t = re.sub(r'\s{2,}', ' ', m.group(2)).strip().rstrip('.')
                if t and t not in buckets[current]:
                    buckets[current].append(t)

    rows = [{'section': f'{n}. {names[n]}', 'name': f'({chr(97+i)}) {sub}'}
            for n, _ in toc
            for i, sub in enumerate(buckets[names[n]])]
    empty = [t for t in order if not buckets[t]]
    problems = [f'chapters with no sub-topics: {empty}'] if empty else []
    return order, rows, problems


TOPIC = re.compile(r'^Topic\s+(\d{1,2})\s*[:.]\s*(.{3,70}?)\s*$')
OBJ   = re.compile(r'^(\d{1,2})\.(\d{1,2})\s+(.{6,}?)\s*$')


def parse_gce(pdf):
    """UK GCE specifications are laid out as "Topic N: Title" with numbered
    objective statements beneath, rather than the numbered-section / lettered
    sub-topic shape used by International GCSE. The statements are the actual
    syllabus detail, so they become the sub-chapters."""
    lines = text(pdf)
    order, buckets, current = [], {}, None
    for raw in lines:
        s = raw.rstrip()
        t = s.strip()
        m = TOPIC.match(t)
        if m and not t.endswith(('.', ',')):
            name = f'Topic {int(m.group(1))}: {m.group(2).strip()}'
            if name not in buckets:
                buckets[name] = []
                order.append(name)
            current = name
            continue
        if current:
            m = OBJ.match(t)
            if m and len(m.group(3)) > 10:
                label = f'{m.group(1)}.{m.group(2)}'
                body = re.sub(r'\s{2,}', ' ', m.group(3)).strip()
                entry = f'{label} {body}'
                if not any(e.startswith(label + ' ') for e in buckets[current]):
                    buckets[current].append(entry)
            elif buckets[current] and s.startswith((' ' * 5, '\t')) and len(t) > 3 \
                    and not re.match(r'^(Students should|Pearson|Specification)', t):
                buckets[current][-1] = (buckets[current][-1] + ' ' + t)[:300]
    rows = [{'section': c, 'name': re.sub(r'\s{2,}', ' ', n).strip()}
            for c in order for n in buckets[c]]
    empty = [c for c in order if not buckets[c]]
    probs = []
    # Zero chapters previously reported clean, because "no chapter has empty
    # content" is trivially true when there are no chapters at all.
    if not order:
        probs.append('no chapters found')
    if not rows:
        probs.append('no sub-chapters found')
    if empty:
        probs.append(f'topics with no content: {empty[:4]}')
    return order, rows, probs


def parse_any(pdf):
    ch, rows, probs = parse(pdf)
    if rows:
        return ch, rows, probs
    return parse_gce(pdf)


if __name__ == '__main__':
    chapters, rows, problems = parse_any(sys.argv[1])
    print(json.dumps({'chapters': len(chapters), 'topics': len(rows),
                      'ok': not problems, 'problems': problems,
                      'chapter_names': chapters, 'rows': rows},
                     indent=1, ensure_ascii=False))
