#!/usr/bin/env python3
"""Parse a Cambridge syllabus PDF's subject-content section into {section, name}
rows, taken verbatim from the official document so nothing is invented.

Two things make this harder than it looks:

  * Numbered learning objectives inside a topic ("1 understand that all
    physical quantities...") have the same shape as chapter headings
    ("1   Physical quantities and units"). They are told apart by repetition:
    Cambridge repeats the chapter heading as a running header on every page of
    that chapter ("1 Number (continued)"), so a real chapter title occurs many
    times while an objective occurs once.

  * Sub-chapter numbering varies. Most subjects use "1.1"; Maths 0580 splits
    Core and Extended and uses "C1.1" / "E1.1".
"""
import re, sys, json, subprocess
from collections import Counter, defaultdict

SUB_RE  = re.compile(r'^([CE]?)(\d{1,2})\.(\d{1,2})\s+([A-Za-z(].{2,120}?)\s*$')
# Numbers 1-9 are padded ("1   Cell structure") but 10+ are not
# ("12 Energy and respiration"), so this must accept a single space.
#
# Some syllabuses spell the word out — 9696 heads every chapter "Topic 1
# Hydrology, river processes and hazards" — and matching only the bare number
# found no chapters there at all.
CHAP_RE = re.compile(r'^(?:Topic\s+)?(\d{1,2})\s{1,}([A-Z].{2,90}?)\s*$')
NOISE   = re.compile(r'Candidates should be able|www\.|Back to contents', re.I)
# The syllabus's own numbered section headings ("3 Subject content") have the
# exact shape of a chapter heading and repeat on every page, so they outvote
# the real title. Left unfiltered, topic 3 came out as "Subject content" in
# Biology, Chemistry and Physics alike.
#
# The "routes through the syllabus" table in the overview numbers the ways a
# candidate can enter — "1 AS Level only", "2 A Level (staged over two years)",
# "3 A Level" — and those labels repeat, so they outvoted the real titles and
# became topic 1 in Accounting, Business, Economics, Geography and Sociology
# alike.
SECTION_HEADINGS = re.compile(
    r'^(Subject content|Details of the assessment|What else you need to know|'
    r'Syllabus overview|Why choose this syllabus\??|Introduction|Contents|'
    r'Appendix|Practical assessment|Mathematical requirements|'
    r'Additional information|Other information|'
    r'AS Level only|A Level( \(staged over two years\))?)$', re.I)
# Learning objectives are numbered like chapters and, contrary to the first
# guess, plenty of them start with a capital: "Calculate percentage increase or
# decrease.", "Recall and use the equation". Untreated these became topic
# titles in Maths 0580/4024 (topic 3, really Coordinate geometry) and in
# Physics 5054 (topics 1-3, really Motion/Thermal physics/Waves).
OBJECTIVE = re.compile(
    r'^(recall|calculate|describe|state|explain|understand|use|identify|'
    r'determine|investigate|draw|define|know|apply|solve|construct|convert|'
    r'estimate|interpret|sketch|show|find|represent|deduce|derive|list|'
    r'compare|discuss|outline|predict|measure|record|select|suggest)\b', re.I)


def is_objective(t):
    return bool(OBJECTIVE.match(t)) or t.endswith('.')


# Right-hand column headings that bleed onto the end of a heading line.
TAIL    = re.compile(r'\s{2,}(Learning outcomes|Notes and examples|Notes|Examples).*$', re.I)


def clean(t):
    # The contents pages are two-column, so pdftotext -layout yields
    # "1 Atomic structure        23 Chemical energetics" on one line. A run of
    # 3+ spaces is a column break; no real heading contains one.
    t = re.split(r'\s{3,}', t)[0]
    t = TAIL.sub('', t)
    t = re.sub(r'\s*\((continued|cont)\)\s*$', '', t, flags=re.I)
    t = re.sub(r'\s+continued\s*$', '', t, flags=re.I)
    return re.sub(r'\s{2,}', ' ', t).strip()


def pdf_lines(pdf):
    txt = subprocess.run(['pdftotext', '-layout', pdf, '-'],
                         capture_output=True, text=True, check=True).stdout
    return txt.split('\n')


def content_start(lines):
    """Last '<n> Subject content' heading that isn't a contents-page entry."""
    idx = [i for i, l in enumerate(lines)
           if re.match(r'^\s*\d+\s+Subject content\s*$', l) and '....' not in l]
    return idx[-1] if idx else 0


def content_end(lines, start):
    """First top-level section after subject content. Without this bound the
    appendices leak in: 9701 ends with numbered reference tables ('1 Important
    values, constants and standards', '5 Pauling electronegativity values')
    that otherwise outvote the real chapter titles."""
    pat = re.compile(r'^\s*\d+\s+(Details of the assessment|What else you need to know|'
                     r'Appendix|Practical assessment|Mathematical requirements)\b', re.I)
    for i in range(start + 1, len(lines)):
        if pat.match(lines[i]) and '....' not in lines[i]:
            return i
    return len(lines)


def overview_chapters(head):
    """Chapter titles from the contents/overview list: the longest run of
    consecutive '1..N Title' lines appearing before the content pages. Some
    syllabuses (0610) never repeat a running header, so the body-repetition
    signal finds nothing and this is the only source."""
    best, run, expect = {}, {}, 1
    for l in head:
        s = l.strip()
        m = None if '....' in s else re.match(r'^(\d{1,2})\s{1,}([A-Z].{2,90}?)\s*$', s)
        if m and int(m.group(1)) == expect and not SECTION_HEADINGS.match(clean(m.group(2))) and not is_objective(clean(m.group(2))):
            run[expect] = clean(m.group(2)); expect += 1
        elif run:
            if len(run) > len(best): best = run
            run, expect = {}, 1
            if m and int(m.group(1)) == 1:
                run[1] = clean(m.group(2)); expect = 2
    return run if len(run) > len(best) else best


def parse(pdf):
    lines = pdf_lines(pdf)
    start = content_start(lines)
    body = lines[start:content_end(lines, start)]
    overview = overview_chapters(lines[:start])

    subs = defaultdict(list)          # (variant, chapter) -> [(sub, title)]
    seen = set()
    chap_hits = defaultdict(Counter)  # chapter -> Counter(title)

    for raw in lines[:content_end(lines, start)]:
        # Contents pages are two-column, so "10 Group 2      30 Hydrocarbons"
        # is one line and the right-hand topic would otherwise be invisible.
        # Stops before the appendices: 9701's printed periodic table is
        # appendix section 9 titled "The Periodic Table of Elements", which
        # tied with the real topic 9 "The Periodic Table: chemical periodicity"
        # and won on dict ordering.
        for frag in re.split(r'\s{3,}', raw.strip()):
            frag = frag.strip()
            if not frag or '....' in frag:
                continue
            m = CHAP_RE.match(frag)
            if m:
                t = clean(m.group(2))
                if t and not SECTION_HEADINGS.match(t) and not is_objective(t):
                    chap_hits[int(m.group(1))][t] += 1

    for raw in body:
        s = raw.strip()
        if not s or '....' in s or NOISE.search(s):
            continue

        m = SUB_RE.match(s)
        if m:
            var, ch, sub = m.group(1), int(m.group(2)), int(m.group(3))
            title = clean(m.group(4))
            key = (var, ch, sub)
            if title and key not in seen:
                seen.add(key)
                subs[(var, ch)].append((sub, title))
            continue

        m = CHAP_RE.match(s)
        if m:
            ch, title = int(m.group(1)), clean(m.group(2))
            if title and not SECTION_HEADINGS.match(title) and not is_objective(title):
                chap_hits[ch][title] += 1

    # A chapter title must belong to a chapter that actually has sub-chapters.
    # Prefer a title repeated as a running header (strongest signal); fall back
    # to the overview list for syllabuses that don't use running headers.
    valid = {ch for (_v, ch) in subs}
    chapters = {}
    for ch in valid:
        hits = chap_hits.get(ch)
        if hits and hits.most_common(1)[0][1] > 1:
            chapters[ch] = hits.most_common(1)[0][0]
        elif ch in overview:
            chapters[ch] = overview[ch]
        elif hits:
            chapters[ch] = hits.most_common(1)[0][0]
        # A title can be clipped where it is laid out in a narrow column: the
        # two-column contents page splits "19 Computational thinking and
        # Problem-solving" at the column gutter, leaving "19 Computational
        # thinking and" to tie with the full heading from the body. Repetition
        # still decides which wording is right; among candidates that merely
        # continue the winner, the fullest one wins.
        got = chapters.get(ch)
        if got:
            cands = list(hits or ()) + ([overview[ch]] if ch in overview else [])
            longer = [c for c in cands
                      if c.lower().startswith(got.lower()) and len(c) > len(got)]
            if longer:
                chapters[ch] = max(longer, key=len)

    # Some topics genuinely have no sub-chapters (9701 topic 10 "Group 2").
    # Dropping them would silently lose a whole topic, which is the failure
    # this whole exercise exists to fix, so they survive as a single row.
    if chapters:
        for ch in range(1, max(chapters) + 1):
            if ch in chapters:
                continue
            if ch in overview:
                chapters[ch] = overview[ch]
            elif chap_hits.get(ch):
                # Appears only in the two-column contents list, never as a
                # running header — 9701's "10 Group 2" and "12 Nitrogen and
                # sulfur". Safe because a learning objective starts lowercase
                # and so never matches CHAP_RE.
                chapters[ch] = chap_hits[ch].most_common(1)[0][0]

    variants = sorted({v for (v, _c) in subs}) or ['']
    rows = []
    for var in variants:
        prefix = {'C': 'Core — ', 'E': 'Extended — ', '': ''}.get(var, '')
        chs = {c for (v, c) in subs if v == var} | (set(chapters) if var == variants[0] else set())
        for ch in sorted(chs):
            title = chapters.get(ch)
            if not title:
                continue
            sec = f'{prefix}{ch}. {title}'
            kids = sorted(subs.get((var, ch), []))
            if kids:
                for sub, stitle in kids:
                    rows.append({'section': sec, 'name': f'{var}{ch}.{sub} {stitle}'})
            else:
                rows.append({'section': sec, 'name': title})

    # Chapters that have sub-chapters in the document are reported alongside the
    # ones that survived, so validate() can tell the two apart. A chapter whose
    # title is never found is dropped here with its sub-chapters, and counting
    # only what survived cannot see the loss.
    return chapters, rows, {ch for (_v, ch) in subs}


def validate(chapters, rows, sub_chapters=frozenset()):
    """Refuse to trust a parse with holes in it. A gap means a topic was
    dropped, and a dropped topic is exactly the defect being fixed."""
    problems = []
    if not chapters:
        problems.append('no chapters found')
        return problems
    gaps = [n for n in range(1, max(chapters) + 1) if n not in chapters]
    if gaps:
        problems.append(f'missing chapters: {gaps}')

    # A chapter with sub-chapters but no title never reaches `chapters`, so it
    # cannot leave a gap there either. 0471 kept only topic 1 and read as clean
    # while topics 2-5 and their 20 sub-topics were gone.
    untitled = sorted(sub_chapters - set(chapters))
    if untitled:
        problems.append(f'chapters with sub-chapters but no title found: {untitled}')
    for ch, t in chapters.items():
        if len(t) < 3 or re.match(r'^\d', t) or SECTION_HEADINGS.match(t) or is_objective(t):
            problems.append(f'suspect title for {ch}: {t!r}')

    # Complete chapter numbering says nothing about what is under each chapter.
    # 0478 passed with chapters 1-8 while topics 5, 6 and 7 had no sub-chapters
    # at all and topic 8 began at "8.3" — four fifths of the syllabus missing
    # behind a clean-looking result. Sub-chapters are numbered from 1 with no
    # gaps in every Cambridge syllabus, so a gap or a missing run is a defect.
    found = defaultdict(set)
    for r in rows:
        m = re.match(r'^([CE]?)(\d{1,2})\.(\d{1,2})\s', r['name'])
        if m:
            found[(m.group(1), int(m.group(2)))].add(int(m.group(3)))
    if found:
        for ch in sorted(chapters):
            for var in sorted({v for (v, _c) in found}):
                nums = found.get((var, ch))
                if nums is None:
                    problems.append(f'chapter {var}{ch} has no sub-chapters')
                elif sorted(nums) != list(range(1, max(nums) + 1)):
                    problems.append(f'chapter {var}{ch} sub-numbering has a gap: {sorted(nums)}')
    return problems


if __name__ == '__main__':
    ch, rows, sub_ch = parse(sys.argv[1])
    problems = validate(ch, rows, sub_ch)
    print(json.dumps({'chapters': len(ch), 'topics': len(rows),
                      'ok': not problems, 'problems': problems,
                      'chapter_titles': {k: ch[k] for k in sorted(ch)},
                      'rows': rows}, indent=1))
