# Syllabus verification pipeline

Rebuilds `syllabus_templates` from the **official exam-board documents** instead
of hand-written approximations.

## Why

The templates in the database were written by hand and are not the real
syllabuses. Cambridge IGCSE Biology 0610 was the case that exposed it:

| | stored | official (2026–2028) |
|---|---|---|
| entries | 16, flat | 21 chapters / 61 sub-chapters |
| missing | — | Diseases and immunity · Drugs · Biotechnology and genetic modification |
| merged | "Biological molecules and enzymes" | two separate topics (4 and 5) |
| grouping | `Core / Physiology / Genetics / Ecology` — invented | the syllabus's own numbering |

For a revision app that is a trust problem, not a cosmetic one: a student
working through the stored list would never see three whole topics.

## How it works

`{section, name}` already maps onto the syllabus's own two levels, so no schema
change is needed — `section` becomes `"3. Movement into and out of cells"` and
`name` becomes `"3.1 Diffusion"`.

```bash
./fetch_cie.sh cambridge-igcse biology 0610 2027   # download official PDF
python3 parse_cie.py pdf/cambridge-igcse-biology-0610.pdf
```

`fetch_cie.sh` picks the syllabus version whose **exam-year range covers the
target sitting**, not simply the newest — Cambridge publishes future specs years
ahead (9700 currently offers both 2025–2027 and 2028–2030), and grabbing the
newest would hand students a spec they aren't sitting.

`parse_cie.py` reads the subject-content section with `pdftotext -layout`.
Two things make it harder than it looks:

* Numbered learning objectives (`1 understand that all physical quantities…`)
  have the same shape as chapter headings (`1   Physical quantities and units`).
  They're told apart by repetition — Cambridge repeats the chapter heading as a
  running header on every page of that chapter, so a real title occurs many
  times and an objective occurs once. Syllabuses that use no running header
  (0610) fall back to the contents-page list.
* Sub-chapter numbering varies: most use `1.1`, Maths 0580 splits Core and
  Extended into `C1.1` / `E1.1`.

`SOURCES.txt` records the exact official URL each subject resolved to.

## Status

Nothing has been written to the database yet — the parse is not accurate enough
across the board to overwrite existing content, and half-verified syllabus data
is worse than none.

* **42 official Cambridge PDFs** fetched, version-correct for the 2027 sitting
* **~25 parse cleanly**, verified by chapter count against the real spec
  (0610 → 21/61, 0620 → 12/49, 9702 → 25/76, 9701 → 33/80)
* **~8 parse partially** and need per-subject work: Maths D 4024, IGCSE Maths
  0580 (Core/Extended split), Geography 9696, Psychology 9990, Travel & Tourism
  0471, Computer Science 0478/2210, Law 9084
* **9 have no numbered subject content at all** — English Language 0500/1123/9093,
  English Literature 9695, IGCSE History 0470, IGCSE Sociology 0495, PE 0413,
  Art & Design 9479, Music 9483. These are structured by assessment component,
  not by numbered topics, so they need a different extraction shape.
* **Not yet started:** Edexcel (48 templates), IB (49), MBBS, OCR, AQA

## Before writing to the database

Each template should carry provenance so a wrong line can be traced and so
staleness is visible when a board publishes a new spec:

```sql
alter table syllabus_templates
  add column source_url text,
  add column syllabus_years text,   -- '2026-2028'
  add column verified_at timestamptz;
```
