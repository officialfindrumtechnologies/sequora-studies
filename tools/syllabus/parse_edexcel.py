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


# International A Level numbers its divisions "Unit N:", UK GCE uses
# "Topic N:". Both carry numbered objective statements beneath.
TOPIC = re.compile(r'^(?:Topic|Unit)\s+(\d{1,2})\s*[:.]\s*(.{3,70}?)\s*$')
OBJ   = re.compile(r'^(\d{1,2})\.(\d{1,2})\s+(.{6,}?)\s*$')
# IAL Physics numbers its statements as plain integers within each unit
# ("7  understand how to make use of...") rather than 1.7, so the dotted form
# alone found 26 statements for the whole subject.
OBJ_FLAT = re.compile(r'^(\d{1,3})\s{2,}([a-z(].{10,}?)\s*$')
SPEC_SUBSECTION = re.compile(
    r'^(Unit description|Assessment information|Overview of|Content\b|'
    r'Assessment objectives|Qualification aims|Externally assessed)', re.I)


def parse_gce(pdf):
    """UK GCE and International A Level are laid out as "Topic N:" / "Unit N:"
    with numbered objective statements beneath, rather than the numbered
    section / lettered sub-topic shape used by International GCSE. The
    statements are the actual syllabus detail, so they become sub-chapters.

    Divisions are keyed by NUMBER, not by title text: the contents page and the
    body wrap long titles differently ("Unit 5: Respiration, Internal
    Environment, Coordination" against "Unit 5: Respiration, Internal
    Environment,"), which otherwise produced 13 units for a 6-unit subject.
    """
    lines = text(pdf)

    # The contents page is authoritative for which divisions exist. Without it
    # Chemistry promoted topic headings inside a unit to units of their own and
    # reported 19 chapters against its real 6.
    # Where a spec carries "Topic N:" headings, statements are numbered within
    # the topic (8.14 belongs to Topic 8) and topics are the true chapters -
    # the Unit headings above them only group topics for assessment. Assigning
    # by document position instead put IAL Chemistry's topic 6-10 statements
    # under "Unit 6: Practical Skills in Chemistry II".
    topic_titles = {}
    for l in lines:
        m = re.match(r'^Topic\s+(\d{1,2})\s*[:.]\s*(.{3,70}?)\s*$',
                     re.sub(r'\s{2,}\d{1,3}$', '', l.strip()))
        if m:
            n, t = int(m.group(1)), m.group(2).strip().rstrip('.,')
            if len(t) > len(topic_titles.get(n, '')):
                topic_titles[n] = t

    valid, toc_titles = set(), {}
    for l in lines[:200]:
        m = TOPIC.match(re.sub(r'\s{2,}\d{1,3}$', '', l.strip()))
        if m:
            n = int(m.group(1))
            valid.add(n)
            t = m.group(2).strip().rstrip('.,')
            if len(t) > len(toc_titles.get(n, '')):
                toc_titles[n] = t
    if valid:
        valid = {n for n in valid if n <= max(k for k in valid if k <= len(valid) + 2)}

    titles, buckets, order, current, kind = dict(toc_titles), {}, [], None, 'Topic'
    flat_units = {}   # unit -> True once a plain-integer statement is seen
    for raw in lines:
        s = raw.rstrip()
        t = re.sub(r'\s{2,}\d{1,3}$', '', s.strip())
        m = TOPIC.match(t)
        # A trailing comma is not disqualifying: IAL Biology's Unit 5 heading
        # wraps as "Unit 5: Respiration, Internal Environment," and rejecting
        # it meant Unit 4 absorbed all of Unit 5's content.
        if m and (not valid or int(m.group(1)) in valid):
            n = int(m.group(1))
            kind = 'Unit' if t.lower().startswith('unit') else 'Topic'
            title = m.group(2).strip().rstrip('.')
            # Unit headings also appear inside assessment tables, where the
            # "title" is really a marks cell - IAL Physics Unit 5 came out as
            # "IA2 Externally assessed 90 marks" instead of its real name.
            if re.search(r'\bmarks?\b|externally assessed|written exam|IA[12]\b', title, re.I):
                title = ''
            if n not in buckets:
                buckets[n] = []
                order.append(n)
            if len(title) > len(titles.get(n, '')):
                titles[n] = title
            current = n
            continue
        if current is not None:
            m = OBJ.match(t)
            mf = None if m else OBJ_FLAT.match(t)
            # Where a unit numbers its statements as plain integers, the dotted
            # "1.1"/"1.2" forms on the same pages are the specification's own
            # subsections, not syllabus content - they put "1.1 Unit
            # description" and "1.2 Assessment information" at the head of
            # every IAL Physics unit.
            if m and flat_units.get(current) and SPEC_SUBSECTION.match(m.group(3)):
                m = None
            if m and len(m.group(3)) > 10:
                label = f'{m.group(1)}.{m.group(2)}'
                body = re.sub(r'\s{2,}', ' ', m.group(3)).strip()
                if not any(e.startswith(label + ' ') for e in buckets[current]):
                    buckets[current].append(f'{label} {body}')
            elif mf:
                flat_units[current] = True
                label = f'{current}.{mf.group(1)}'
                body = re.sub(r'\s{2,}', ' ', mf.group(2)).strip()
                if not any(e.startswith(label + ' ') for e in buckets[current]):
                    buckets[current].append(f'{label} {body}')
            elif buckets[current] and s.startswith((' ' * 5, '\t')) and len(t) > 3 \
                    and not re.match(r'^(Students should|Pearson|Specification|Issue)', t):
                buckets[current][-1] = (buckets[current][-1] + ' ' + t)[:300]

    # Topic-numbered specs are re-keyed off the statement numbers themselves.
    if topic_titles and any(OBJ.match(re.sub(r'^', '', v)) for n in order for v in buckets[n]):
        regrouped = {}
        for n in order:
            for v in buckets[n]:
                m = re.match(r'^(\d{1,2})\.(\d{1,2})\s', v)
                if not m:
                    continue
                tn = int(m.group(1))
                if tn in topic_titles:
                    regrouped.setdefault(tn, []).append(v)
        if len(regrouped) >= max(2, len(order)):
            order = sorted(regrouped)
            buckets = regrouped
            titles = topic_titles
            kind = 'Topic'

    names = [f'{kind} {n}: {titles.get(n, "")}'.strip() for n in order]
    # Drop the specification's own subsections wherever they were captured.
    # They are the head of every IAL Physics unit ("1.1 Unit description",
    # "1.2 Assessment information") and appear before any real statement, so
    # they cannot be filtered while scanning.
    def is_spec_subsection(v):
        body = re.sub(r'^\d+(\.\d+)?\s+', '', v)
        return bool(SPEC_SUBSECTION.match(body))

    for n in order:
        buckets[n] = [v for v in buckets[n] if not is_spec_subsection(v)]

    rows = [{'section': f'{kind} {n}: {titles.get(n, "")}'.strip(),
             'name': re.sub(r'\s{2,}', ' ', v).strip()}
            for n in order for v in buckets[n]]
    # Practical-skills units carry no numbered statements in IAL - they are
    # assessed as practical competencies - so being empty is correct for them
    # and must not be reported as a missing chapter.
    empty = [f'{kind} {n}' for n in order
             if not buckets[n] and 'practical skills' not in titles.get(n, '').lower()]
    probs = []
    if not order:
        probs.append('no chapters found')
    if not rows:
        probs.append('no sub-chapters found')
    if empty:
        probs.append(f'units with no content: {empty[:4]}')
    return names, rows, probs


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
