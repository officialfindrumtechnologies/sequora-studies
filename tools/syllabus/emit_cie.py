#!/usr/bin/env python3
"""Turn parse_cie.py output into per-template JSON for write_templates.mjs.

A Cambridge AS & A Level syllabus is one document describing two
qualifications, so one PDF produces two templates. A Level is the whole
document — an A Level candidate studies everything. AS is a prefix of the
topics, and which prefix is not guessable: the syllabus states it, differently
each time ("Candidates for Cambridge International AS Level study topics 1-5",
a heading reading "A Level content", or an "(AS Level)" suffix on the topic
titles themselves).

So `as_topics` is pinned per subject from the syllabus's own words, with the
sentence that establishes it quoted beside it. Guessing the boundary would put
A Level content on an AS student's plan, which is the kind of quiet wrongness
this pipeline exists to prevent.
"""
import json
import subprocess
import sys
import os

# code -> (board, qualification, db subject name, AS topic count, evidence)
SUBJECTS = {
    '9706': ('cambridge_alevel', 'A Level', 'Accounting', 2,
             'topic titles are suffixed "(AS Level)" / "(A Level)"'),
    '9609': ('cambridge_alevel', 'A Level', 'Business', 5,
             'topic titles are suffixed "(AS Level)" / "(A Level)"'),
    '9618': ('cambridge_alevel', 'A Level', 'Computer Science', 12,
             'subject content is split by headings "AS Level content" / "A Level content"'),
    '9708': ('cambridge_alevel', 'A Level', 'Economics', 6,
             'topic titles are suffixed "(AS Level)" / "(A Level)"'),
    '9696': ('cambridge_alevel', 'A Level', 'Geography', 6,
             '"For Cambridge International AS Level Geography, candidates study all the '
             'following topics" lists six'),
    '9084': ('cambridge_alevel', 'A Level', 'Law', 2,
             '"Cambridge International AS Level students study topics 1.1-2.3."'),
    '9693': ('cambridge_alevel', 'A Level', 'Marine Science', 5,
             '"Candidates for Cambridge International AS Level study topics 1-5."'),
    '9699': ('cambridge_alevel', 'A Level', 'Sociology', 4,
             'AS Level is Paper 1 (Socialisation, Identity and Methods of Research) '
             'and Paper 2 (The Family) — topics 1-4'),
    '9395': ('cambridge_alevel', 'A Level', 'Travel & Tourism', 5,
             '"Candidates for Cambridge International AS Level study topics 1-5."'),
    '0452': ('cambridge_igcse', 'IGCSE / O Level', 'Accounting', None, ''),
    '0455': ('cambridge_igcse', 'IGCSE / O Level', 'Economics', None, ''),
    '0460': ('cambridge_igcse', 'IGCSE / O Level', 'Geography', None, ''),
    '2281': ('o_level', 'IGCSE / O Level', 'Economics', None, ''),
}


def chapter_no(section):
    """Leading chapter number of a section label ("7. Ethics and Ownership")."""
    head = section.split('.', 1)[0].strip()
    return int(head) if head.isdigit() else None


def emit(pdf, outdir):
    code = os.path.basename(pdf).rsplit('-', 1)[-1].removesuffix('.pdf')
    if code not in SUBJECTS:
        print(f'skip {code}: not configured', file=sys.stderr)
        return []
    board, qual, subject, as_n, why = SUBJECTS[code]

    out = subprocess.run([sys.executable, 'parse_cie.py', pdf],
                         capture_output=True, text=True, check=True).stdout
    d = json.loads(out)
    src = open(pdf.replace('.pdf', '.src')).read().strip()
    years = src.rsplit('/', 1)[-1].removesuffix('-syllabus.pdf')
    years = 'syllabus for ' + years.split('-', 1)[-1]

    written = []
    variants = [(qual, None)]
    if as_n is not None:
        variants.append(('AS Level', as_n))

    for qualification, limit in variants:
        rows = d['rows']
        if limit is not None:
            rows = [r for r in rows
                    if (n := chapter_no(r['section'])) is not None and n <= limit]
        # An empty AS slice means the pinned boundary does not match the parse;
        # writing it would publish an empty syllabus as verified.
        problems = list(d['problems'])
        if limit is not None and not rows:
            problems.append(f'AS slice of {limit} topics selected nothing')
        payload = {
            'board': board, 'qualification': qualification, 'subject': subject,
            'level': None, 'years': years, 'url': src,
            'chapters': len({r['section'] for r in rows}), 'topics': len(rows),
            'ok': not problems, 'problems': problems,
            'as_boundary_evidence': why if limit is not None else None,
            'rows': rows,
        }
        name = f'{outdir}/cie-{code}-{qualification.replace(" ", "").replace("/", "")}.json'
        with open(name, 'w') as fh:
            json.dump(payload, fh, indent=1, ensure_ascii=False)
        written.append(name)
        print(f'{"ok " if payload["ok"] else "BAD"} {subject:<20} {qualification:<16} '
              f'{payload["chapters"]:>3}ch {payload["topics"]:>3}t  {name}')
    return written


if __name__ == '__main__':
    outdir = 'out'
    os.makedirs(outdir, exist_ok=True)
    for p in sys.argv[1:]:
        emit(p, outdir)
