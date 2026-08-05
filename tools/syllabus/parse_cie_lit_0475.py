import re, json, subprocess
PDF='pdf/cambridge-igcse-literature-english-0475.pdf'
# Paper heading -> section label. The set texts are listed under the last
# occurrence of each heading; the first is its contents-page entry.
PAPERS = [
    ('Set texts for examination in 2027 – Paper 1', 'Paper 1: Poetry and Prose — set texts for 2027'),
    ('Set texts for examination in 2027 – Paper 2', 'Paper 2: Drama — set texts for 2027 (answer on two)'),
    ('Set texts for examination in 2027 – Paper 3', 'Paper 3: Drama (Open Text) — set texts for 2027 (answer on one)'),
]
# "Section A: Poetry" and "From Songs of Ourselves Volume 1" introduce the
# poem list rather than ending it, so they are skipped without closing the
# section — treating them as terminators lost all fifteen poems.
# The running footer and the page header appear between pages of the same
# list; treating them as terminators ended the scan at the first page break and
# lost every prose text.
SKIP = re.compile(r'^(From |Section [A-C]|Candidates (must|answer)|the following|'
                  r'Back to contents|Cambridge IGCSE|\d{1,3}$)')
STOP = re.compile(r'^(Set texts for examination|\d Details of the assessment|'
                  r'Important:|'
                  r'Requirements:|Resources:|Faculty feedback)')
NOISE = re.compile(r'^(Paper \d|Assessment|Command words|What else|Before you|Making entries|After the)')

def parse():
    txt = subprocess.run(['pdftotext','-layout',PDF,'-'],capture_output=True,text=True).stdout
    lines = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]',' ',txt).split('\n')
    order, rows = [], []
    for head, label in PAPERS:
        # Paper 1's set texts run over several pages, and the heading repeats
        # at the top of each with "continued". Taking the last occurrence
        # started at the final page and lost the fifteen poems entirely, so the
        # region runs from the first body occurrence to the next paper.
        idx = [i for i,l in enumerate(lines) if head in l and '....' not in l]
        if not idx:
            continue
        begin = idx[0] if len(idx) == 1 else idx[1]
        nxt = [i for i,l in enumerate(lines)
               if i > begin and re.match(r'^\s*(Set texts for examination in 2027 – Paper|\d Details of the assessment)', l)
               and 'continued' not in l and '....' not in l]
        end = nxt[0] if nxt else begin + 120
        items = []
        for l in lines[begin+1: end]:
            t = l.strip()
            if not t:
                continue
            if t.startswith(head) or 'continued' in t.lower()[:60] and 'Set texts' in t:
                continue
            if STOP.match(t):
                break
            if SKIP.match(t):
                continue
            if NOISE.match(t) or len(t) < 6 or len(t) > 90:
                continue
            if not re.match(r"^[A-Z‘'\"]", t):
                continue
            # One poem set is printed in two columns, so a line carries two
            # titles ("The Colour of James Brown's Scream    Fisherman's Song").
            # A run of three spaces is the column break; no title contains one.
            for part in re.split(r'\s{3,}', t):
                part = part.strip()
                if len(part) < 4 or not re.match(r"^[A-Z\u2018'\"]", part):
                    continue
                if part not in items:
                    items.append(part)
        if items:
            order.append(label)
            rows += [{'section': label, 'name': i[:300]} for i in items]
    problems = []
    if len(order) != len(PAPERS):
        problems.append(f'{len(order)} of {len(PAPERS)} papers have set texts')
    return order, rows, problems

if __name__=='__main__':
    o,r,p = parse()
    print(json.dumps({'board':'cambridge_igcse','qualification':'IGCSE / O Level',
        'subject':'English Literature','level':None,'years':'syllabus for 2027',
        'url':open(PDF.replace('.pdf','.src')).read().strip(),
        'chapters':len(o),'topics':len(r),'ok':not p,'problems':p,
        'chapter_names':o,'rows':r}, indent=1, ensure_ascii=False))
