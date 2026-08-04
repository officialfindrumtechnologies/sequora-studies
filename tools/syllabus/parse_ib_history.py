#!/usr/bin/env python3
"""IB History: five prescribed subjects, twelve world history topics, four HL
regional options.

A candidate takes one prescribed subject, two world history topics and — at HL
— one regional option, so every option is listed and the student ticks theirs.
The HL options are HL-only by definition, which is the whole SL/HL difference.

Three sub-structures share the document. Prescribed subjects are case studies
in a "Case studies | Material for detailed study" table; world history topics
are bulleted prescribed content in a "Topic | Prescribed content" table; HL
options are numbered sections. Each is read on its own terms.

Known imperfection: one case study of ten keeps a shortened name ("The final
stages of" for "The final stages of Muslim rule in the Iberian peninsula") —
its name runs down the left column across several rows of the facing table and
resumes after lines that carry only bullets. The content beneath it is
complete.
"""
import re, json, subprocess, sys

HEAD = re.compile(r'^(Prescribed subject [1-5]|World history topic (?:[1-9]|1[0-2])|HL option [1-4]): ?(.*)$')
# "Case study 1:" sits in the left column with the first "Material for
# detailed study" heading beside it, so capturing the rest of the line named
# the case study "Leadership" instead of "Genghis Khan c1200-1227". The name is
# on the following lines, in the left column.
CASE = re.compile(r'^(\s*)Case study ([12]):')
LEFTNAME = re.compile(r'^\s{0,14}([A-Z(\u2018\u201c][^\u2022]{2,40})\s*$')
HLSEC = re.compile(r'^\s{0,4}(\d{1,2}):\s+([A-Z]\S.*)$')
BULLET = re.compile(r'^\s{15,}[••]\s+(\S.*)$')
CONT = re.compile(r'^\s{25,}([a-z(\'"‘“].*)$')
STOP = re.compile(r'^(Assessment|Appendi|Glossary|Bibliography)', re.I)

def parse(pdf, level='HL'):
    txt = subprocess.run(['pdftotext','-layout',pdf,'-'],capture_output=True,text=True).stdout
    txt = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]',' ',txt)
    sec, buckets, order, pend = None, {}, [], None
    case_open = False
    for raw in txt.split('\n'):
        t = raw.rstrip()
        s = t.strip()
        if not s: continue
        m = HEAD.match(s)
        if m:
            # A heading also appears in the contents list and the outline; the
            # body occurrence is the one followed by content, so a repeat just
            # reopens the same bucket rather than creating a second.
            sec = f'{m.group(1)}: {m.group(2)}'.strip().rstrip(':')
            if sec not in buckets:
                buckets[sec] = []; order.append(sec)
            pend = None
            continue
        if sec is None or STOP.match(s): continue
        m = CASE.match(t)
        if m:
            # The name begins on this line, to the left of the gutter:
            # "Case study 1: The" / "final stages of" / "Muslim rule in".
            head = t[:23].strip()
            head = re.sub(r'^Case study [12]:\s*', '', head).strip()
            buckets[sec].append(f'Case study {m.group(2)}: {head}'.strip())
            pend = len(buckets[sec]) - 1
            case_open = True
            continue
        if case_open and pend is not None:
            # The case study's name continues in the left column while the
            # facing column already carries bullets, so the two share a line;
            # only the text left of the gutter belongs to the name.
            left = t[:23].strip()
            if left and re.match(r'^[A-Za-z(\u2018\u201c]', left):
                buckets[sec][pend] = (buckets[sec][pend] + ' ' + left).strip()
                if not BULLET.match(t):
                    continue
            elif left:
                # Text in the left column that does not read as part of the
                # name closes it; a line that is empty on the left is just a
                # bullet in the facing column and the name may resume below it.
                case_open = False
        if sec.startswith('HL option'):
            m = HLSEC.match(t)
            if m:
                buckets[sec].append(f'{m.group(1)}: {m.group(2).strip()}'); pend=len(buckets[sec])-1; continue
        m = BULLET.match(t)
        if m:
            buckets[sec].append(m.group(1).strip()); pend=len(buckets[sec])-1; continue
        if pend is not None and CONT.match(t):
            buckets[sec][pend] = (buckets[sec][pend] + ' ' + s).strip()
            continue
        pend = None

    names, rows = [], []
    for s in order:
        items = [re.sub(r'\s{2,}',' ',i).strip() for i in buckets[s]]
        items = [i for i in items if len(i) > 5]
        if not items: continue
        # HL options are HL-only by definition.
        if level == 'SL' and s.startswith('HL option'): continue
        names.append(s)
        for i in items: rows.append({'section': s, 'name': i[:300]})
    problems = []
    want = 21 if level=='HL' else 17
    if len(names) != want: problems.append(f'{len(names)} sections with content, expected {want}')
    return names, rows, problems

if __name__ == '__main__':
    lvl = sys.argv[1] if len(sys.argv)>1 else 'HL'
    n, r, p = parse('ib/history.pdf', lvl)
    print(json.dumps({'board':'IB','qualification':'IB Diploma','subject':'History','level':lvl,
        'years':'first examinations 2020','url':open('ib/history.src').read().strip() if __import__('os').path.exists('ib/history.src') else 'https://dp.uwcea.org/docs/History%20Subject%20Guide.pdf',
        'chapters':len(n),'topics':len(r),'ok':not p,'problems':p,'chapter_names':n,'rows':r}, indent=1, ensure_ascii=False))
