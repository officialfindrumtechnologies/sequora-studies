import re,subprocess,sys
pdf=sys.argv[1]
x=subprocess.run(['pdftotext','-bbox-layout',pdf,'-'],capture_output=True,text=True).stdout
started=False
for pi,pm in enumerate(re.finditer(r'<page width="([\d.]+)"[^>]*>(.*?)</page>',x,re.S)):
    w=float(pm.group(1)); rows=[]
    for lm in re.finditer(r'<line xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</line>',pm.group(2),re.S):
        t=' '.join(re.findall(r'>([^<]*)</word>',lm.group(5))).replace('&amp;','&').strip()
        t=re.sub(r'\s+',' ',t)
        if t: rows.append((float(lm.group(1)),float(lm.group(2)),float(lm.group(3)),float(lm.group(4))-float(lm.group(2)),t))
    if any('Course Contents' in t or 'Core contents' in t for *_,t in rows): started=True
    if not started: continue
    body=sorted(h for *_,h,_ in [(0,0,0,r[3],0) for r in rows]) if rows else [10]
    med=body[len(body)//2] if body else 10
    for a,b,c,h,t in rows:
        mid=(a+c)/2
        if abs(mid-w/2)<w*0.11 and 3<len(t)<75 and h>=med*1.05:
            alone=not any(abs(b2-b)<5 and t2!=t for _,b2,_,_,t2 in rows)
            if alone: print(f"p{pi:<3} h={h:4.1f} {t}")
