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

## What the parser gets wrong if you let it

Every one of these produced plausible-looking but false content, and each is
now guarded. They are listed because the next board's documents will do
something similar:

| Trap | Symptom |
|---|---|
| Chapters ≥10 use one space (`12 Energy and respiration`), 1–9 use three | every subject silently lost all topics past 9 |
| The syllabus's own `3 Subject content` heading repeats on every page | topic 3 became "Subject content" in Biology, Chemistry *and* Physics |
| Objectives can start with a capital (`Recall and use the equation`) | Maths 0580/4024 topic 3 became "Calculate percentage increase or decrease." instead of Coordinate geometry; Physics 5054 topics 1–3 all became "Recall and use the equation" |
| Appendices are numbered too | 9701 topic 9 became "The Periodic Table of Elements" (the printed table) instead of "The Periodic Table: chemical periodicity" — a 2–2 tie broken by dict order |
| Contents pages are two-column | `10 Group 2   30 Hydrocarbons` on one line; right column invisible, left column polluted |
| 0580/4024 mark skipped Core sub-topics `Extended content only.` | 19 rows telling a Core student to revise "C1.17 Extended content only." |

`validate()` refuses any parse with a gap in its chapter numbering, since a gap
means a dropped topic — the exact defect this exists to fix. `write_batch.mjs`
refuses to write anything that fails it.

## Status

**Written and verified: 17 Cambridge sciences + maths templates.**

| Board | Subjects | was → now |
|---|---|---|
| Cambridge IGCSE | Biology 0610, Chemistry 0620, Physics 0625, Mathematics 0580 | 16→61, 16→49, 19→24, 19→124 |
| Cambridge O Level | Biology 5090, Chemistry 5070, Physics 5054, Mathematics D 4024 | 11→52, 11→49, 15→25, 15→67 |
| Cambridge A Level | Biology 9700, Chemistry 9701, Physics 9702, Maths 9709, Further Maths 9231 | 19→44, 23→87, 23→76, 29→38, 17→23 |
| Cambridge AS Level | Biology, Chemistry, Physics, Mathematics | 10→24, 14→50, 11→32, 16→38 |

AS Level rows are capped at the topics the document itself states AS candidates
study ("Candidates for Cambridge International AS Level should study topics
1–11"), so AS Biology carries 11 chapters and A Level Biology carries 19.
Maths 9709 is the exception: its units are chosen by route, so capping by topic
number would assert a route the student may not be on, and both rows keep the
full unit list.

## Remaining

* **~8 Cambridge subjects parse partially:** Geography 9696, Psychology 9990,
  Travel & Tourism 0471, Computer Science 0478/2210, Law 9084, Accounting 9706
* **9 have no numbered subject content at all** — English Language 0500/1123/9093,
  English Literature 9695, IGCSE History 0470, IGCSE Sociology 0495, PE 0413,
  Art & Design 9479, Music 9483. Structured by assessment component, not
  numbered topics, so they need a different extraction shape.
* **5 could not be fetched** (slug unresolved): PE 9396, IGCSE English
  Literature 0475, O Level Accounting 7110, Bangla 3204, History 2059
* **Not started:** Edexcel (48 templates), IB (49), MBBS, OCR, AQA

## Edexcel — status

International A Level is the target, not UK GCE: Bangladeshi students sit
IAL (YBI11 / XBI11), and the templates' stored UK GCE codes (9BI0, 8BI0)
should be migrated when IAL content is written.

**Written:** International GCSE Biology (5 chapters / 22) and Chemistry (4 / 28).

`parse_edexcel.py` carries three strategies because Pearson uses three shapes:

| shape | used by |
|---|---|
| numbered sections with lettered `(a)` sub-topics | International GCSE |
| `Topic N:` + `1.1` statements | UK GCE |
| `Unit N:` + plain `7` statements | International A Level |

IAL Physics found only 26 statements until the plain-integer form was added;
it now finds 178.

### Not written, and why

* **IAL Chemistry** — content is right but grouping is not: 19 chapters against
  the real 6 units, because topic headings inside a unit are being promoted to
  units ("Unit 7: Intermolecular Forces" is a topic within Unit 2).
* **IAL Physics** — units and counts look right, but the first statements of
  each unit are the unit preamble ("1.1 Unit description", "1.2 Assessment
  information") rather than syllabus content.
* **IAL Biology** — Unit 5 (Respiration, Internal Environment, Coordination)
  extracts empty. That is a real missing chapter, not an artefact.
* **IGCSE Geography** — sub-topic names truncate mid-phrase and the tail picks
  up copyright lines.

### Fetching

Landing-page scraping works for most subjects but returns nothing for Law,
Politics, Further Maths, Accounting, Computer Science, Sociology and IGCSE
Business: those pages carry no PDF links at all, because Pearson serves their
specifications from a JavaScript-loaded course-materials template. They need
either the course-materials endpoint or manual URLs.

### Validator note

Zero chapters used to report clean — "no chapter has empty content" is
trivially true with no chapters — so seven subjects passed while extracting
nothing. Fixed; the honest pass count fell from twelve to five.
