#!/usr/bin/env python3
"""Per-subject cleanup for the MBBS extraction.

One global heuristic demonstrably cannot serve all eleven documents: widening
the chapter filter to drop "TIME SCHEDULE" also dropped Anatomy's real chapters,
because "Regional Anatomy : THORAX CARD" legitimately contains "CARD". So the
generic parser does the extraction and each subject declares what to drop and
how to tidy its own titles.

Only subjects listed here are considered ready to write.
"""
import json, re, sys

SUBJECTS = {
    # file stem: (subject name, drop these chapters, title fixups)
    '4.Physiology': dict(
        name='Physiology', drop=[], fix=[]),
    '5.Biochemistry': dict(
        name='Biochemistry', drop=[], fix=[]),
    '12.Microbiology': dict(
        name='Microbiology', drop=[],
        fix=[(r'^Practical$', 'Microbiology Practical')]),
    '10.CommunityMedicine': dict(
        name='Community Medicine',
        drop=[r'^Day Visit$', r'^Study Tour$'],
        fix=[]),
    '3.Anatomy': dict(
        name='Anatomy',
        # "Assessment in Anatomy" and "Time allocation in Anatomy" are the
        # document's admin sections, not syllabus chapters.
        drop=[r'^Assessment in Anatomy$', r'^Time allocation'],
        # Headings read "Regional Anatomy : THORAX CARD" — the CARD suffix is
        # the assessment-card label, not part of the region's name.
        fix=[(r'\s*CARD\s*$', ''), (r'\s*:\s*', ': ')]),
}


def load(stem, d):
    data = json.load(open(f'out-mbbs-{stem}.json'))
    cfg = SUBJECTS[stem]
    drop = [re.compile(p, re.I) for p in cfg['drop']]

    def keep(ch):
        return not any(p.search(ch) for p in drop)

    def fix(ch):
        for pat, rep in cfg['fix']:
            ch = re.sub(pat, rep, ch)
        return ch.strip()

    rows, chapters = [], []
    for r in data['rows']:
        if not keep(r['section']):
            continue
        sec = fix(r['section'])
        if sec not in chapters:
            chapters.append(sec)
        rows.append({'section': sec, 'name': r['name'].strip()})
    return cfg['name'], chapters, rows


if __name__ == '__main__':
    total = 0
    for stem in SUBJECTS:
        name, chapters, rows = load(stem, None)
        total += len(rows)
        print(f'{name:22} {len(chapters):>3} chapters {len(rows):>4} sub-chapters')
        for c in chapters:
            print(f'     - {c}')
    print(f'\n{len(SUBJECTS)} subjects, {total} sub-chapters')
