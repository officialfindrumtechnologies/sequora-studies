#!/usr/bin/env python3
"""Apply verified Topic Visualizer audit corrections.

Every correction is applied by locating its VERBATIM quote inside the specific
subject's block, never file-wide: 31 of the 189 quotes appear in more than one
subject (shared boilerplate across boards), and a file-wide replace would edit
subjects the finding never examined.

Blocks are found by brace-matching from the tvKey, so a quote that occurs in
both IB Chemistry HL and IB Chemistry SL is only replaced in the one that was
audited.

Run with --dry to report without writing.
"""
import json, sys, re

ROOT = '/Volumes/DevWorkspace/Sequora-studies/sequora/'
PACK_FOR_PREFIX = [
    ('cambridge_igcse',  'igcse-cambridge'),
    ('edexcel_igcse',    'igcse-edexcel'),
    ('cambridge_alevel', 'alevel-cambridge'),
    ('edexcel_alevel',   'alevel-edexcel'),
    ('ib_',              'ib'),
    ('mbbs_',            'mbbs'),
]

def pack_file(tv_key):
    for prefix, board in PACK_FOR_PREFIX:
        if tv_key.startswith(prefix):
            return ROOT + 'src/data/topic-visuals-%s.js' % board
    raise SystemExit('no pack for ' + tv_key)

def block_span(text, tv_key):
    """Character span of one subject's object, by brace matching."""
    m = re.search(r'"%s"\s*:\s*\{' % re.escape(tv_key), text)
    if not m:
        return None
    start = m.end() - 1
    depth, i, n = 0, start, len(text)
    in_str, esc = False, False
    while i < n:
        c = text[i]
        if in_str:
            if esc:      esc = False
            elif c == '\\': esc = True
            elif c == '"': in_str = False
        else:
            if c == '"':   in_str = True
            elif c == '{': depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    return (start, i + 1)
        i += 1
    return None

def main():
    dry = '--dry' in sys.argv
    findings = json.load(open(sys.argv[1]))['result']['findings']

    by_file = {}
    for f in findings:
        by_file.setdefault(pack_file(f['tvKey']), []).append(f)

    applied = skipped = 0
    reasons = []

    for path, fs in by_file.items():
        text = open(path, encoding='utf-8').read()
        # Longest quotes first: a short quote can be a substring of a longer
        # one in the same block, and replacing the short one first would
        # corrupt the longer quote before it is applied.
        fs.sort(key=lambda f: len(f['quote']), reverse=True)

        for f in fs:
            span = block_span(text, f['tvKey'])
            if not span:
                skipped += 1; reasons.append((f['tvKey'], f['topicId'], 'block not found')); continue
            s, e = span
            block = text[s:e]
            q, corr = f['quote'], f['correction']

            if corr == 'NEEDS_SPEC':
                skipped += 1; reasons.append((f['tvKey'], f['topicId'], 'NEEDS_SPEC')); continue

            # Some corrections are not replacement text at all — they are
            # structural edits ('"name": "Electric Fields",\n "syllabusRef": "18"')
            # or prose instructions to the maintainer. Splicing those into a
            # string value produces garbage and breaks the module. They are
            # reported for manual handling instead.
            if f['field'] in ('name', 'syllabusRef') or '": "' in corr or '\n' in corr:
                skipped += 1; reasons.append((f['tvKey'], f['topicId'], 'structural edit — manual')); continue

            # The data files hold these strings in JSON form, so a correction
            # containing a double quote or a backslash must be escaped before it
            # is spliced in — otherwise it terminates the string literal early
            # and the whole module stops parsing. Match on the escaped form too,
            # for quotes that themselves contain such characters.
            q_esc    = json.dumps(q)[1:-1]
            corr_esc = json.dumps(corr)[1:-1]

            needle = q if block.count(q) else q_esc
            n = block.count(needle)
            if n == 0:
                skipped += 1; reasons.append((f['tvKey'], f['topicId'], 'quote absent from block')); continue
            if n > 1:
                skipped += 1; reasons.append((f['tvKey'], f['topicId'], 'quote %dx in block — ambiguous' % n)); continue

            text = text[:s] + block.replace(needle, corr_esc, 1) + text[e:]
            applied += 1

        if not dry:
            open(path, 'w', encoding='utf-8').write(text)

    print('applied: %d   skipped: %d%s' % (applied, skipped, '   (DRY RUN)' if dry else ''))
    for r in reasons:
        print('  skip %s/%s — %s' % r)

if __name__ == '__main__':
    main()
