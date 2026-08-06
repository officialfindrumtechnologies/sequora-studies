#!/usr/bin/env python3
"""Second pass: apply syllabusRef / name corrections as structured field edits.

The main applier treats a correction as replacement prose. These findings are
different — their 'correction' is a JSON fragment naming the fields to set, so
they are applied by locating the topic object and rewriting those two fields
rather than by splicing text.

Only findings whose correction reduces cleanly to a syllabusRef (and optionally
a name) are handled. Anything carrying prose commentary is left for a human.

Run with --dry to report without writing.
"""
import json, re, sys

ROOT = '/Volumes/DevWorkspace/Sequora-studies/sequora/'
PACK_FOR_PREFIX = [
    ('cambridge_igcse',  'igcse-cambridge'), ('edexcel_igcse',    'igcse-edexcel'),
    ('cambridge_alevel', 'alevel-cambridge'), ('edexcel_alevel',  'alevel-edexcel'),
    ('ib_', 'ib'), ('mbbs_', 'mbbs'),
]

def pack_file(k):
    for p, b in PACK_FOR_PREFIX:
        if k.startswith(p):
            return ROOT + 'src/data/topic-visuals-%s.js' % b

def block_span(text, tv_key):
    m = re.search(r'"%s"\s*:\s*\{' % re.escape(tv_key), text)
    if not m: return None
    start = m.end() - 1
    depth, i, in_str, esc = 0, start, False, False
    while i < len(text):
        c = text[i]
        if in_str:
            if esc: esc = False
            elif c == '\\': esc = True
            elif c == '"': in_str = False
        else:
            if c == '"': in_str = True
            elif c == '{': depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0: return (start, i + 1)
        i += 1
    return None

def topic_span(block, topic_id):
    """Span of one topic object inside a subject block, by brace matching."""
    m = re.search(r'\{\s*"id"\s*:\s*"%s"' % re.escape(topic_id), block)
    if not m: return None
    start = m.start()
    depth, i, in_str, esc = 0, start, False, False
    while i < len(block):
        c = block[i]
        if in_str:
            if esc: esc = False
            elif c == '\\': esc = True
            elif c == '"': in_str = False
        else:
            if c == '"': in_str = True
            elif c == '{': depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0: return (start, i + 1)
        i += 1
    return None

def main():
    dry = '--dry' in sys.argv
    findings = json.load(open(sys.argv[1]))['result']['findings']

    todo = []
    for f in findings:
        c = f['correction']
        if not ('": "' in c or f['field'] in ('name', 'syllabusRef')):
            continue
        ref = re.search(r'"syllabusRef"\s*:\s*"([^"]+)"', c)
        nm  = re.search(r'"name"\s*:\s*"([^"]+)"', c)
        extra = re.sub(r'"(name|syllabusRef)"\s*:\s*"[^"]*",?\s*', '', c).strip()
        if ref and len(extra) < 8:
            todo.append((f, ref.group(1), nm.group(1) if nm else None))

    by_file = {}
    for item in todo:
        by_file.setdefault(pack_file(item[0]['tvKey']), []).append(item)

    applied, skipped = 0, []
    for path, items in by_file.items():
        text = open(path, encoding='utf-8').read()
        for f, ref, nm in items:
            bs = block_span(text, f['tvKey'])
            if not bs: skipped.append((f['tvKey'], f['topicId'], 'no block')); continue
            b0, b1 = bs
            block = text[b0:b1]
            ts = topic_span(block, f['topicId'])
            if not ts: skipped.append((f['tvKey'], f['topicId'], 'no topic')); continue
            t0, t1 = ts
            topic = block[t0:t1]

            new = re.sub(r'("syllabusRef"\s*:\s*")[^"]*(")',
                         lambda m: m.group(1) + ref.replace('\\', '\\\\').replace('"', '\\"') + m.group(2),
                         topic, count=1)
            if nm:
                new = re.sub(r'("name"\s*:\s*")[^"]*(")',
                             lambda m: m.group(1) + nm.replace('\\', '\\\\').replace('"', '\\"') + m.group(2),
                             new, count=1)
            if new == topic:
                skipped.append((f['tvKey'], f['topicId'], 'no field changed')); continue
            block = block[:t0] + new + block[t1:]
            text = text[:b0] + block + text[b1:]
            applied += 1
        if not dry:
            open(path, 'w', encoding='utf-8').write(text)

    print('ref/name edits applied: %d   skipped: %d%s' % (applied, len(skipped), '   (DRY)' if dry else ''))
    for s in skipped: print('  skip %s/%s — %s' % s)

if __name__ == '__main__':
    main()
