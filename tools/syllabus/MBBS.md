# MBBS (BM&DC) — status

## Which curriculum, and does it cover army colleges

**BM&DC MBBS Curriculum 2021 is the current one.** BM&DC's own curriculum page
lists only the 2021 update; the lineage is 2002 → 2012 → 2021 and nothing newer
is published as of 2026-07-29. Source PDFs, one per subject:
`https://www.bmdc.org.bd/docs/curriculum/2021/`

**Army, public and private colleges share it.** Armed Forces Medical College
teaches "in accordance with the syllabus laid down by BMDC" — AFMC is
BUP-affiliated for degree-awarding, but the curriculum itself is the national
one. One set of templates therefore covers army, public and private alike;
there is no separate army syllabus to chase.

## Why these need their own parser

Nothing like a Cambridge syllabus. No numbering at all, and the content sits in
a three-column landscape table:

    Learning Objectives   |   Contents   |   Hours / days

The middle column is the syllabus; the left is assessment wording ("describe
the physiology of cardiac muscle") and the right is teaching hours.
`pdftotext -layout` interleaves all three onto shared lines, so `parse_mbbs.py`
works from word coordinates (`-bbox-layout`) instead.

Two details are load-bearing:

* **Column boundaries are measured per page, not assumed.** Contents bullets
  start at x=411 on the Cardiovascular page but x=386 on the Blood page. A
  fixed 0.46×width boundary dropped every bullet on Blood and kept only the
  wrapped continuation lines, so that chapter came out as the fragments
  "hemoglobin", "classification", "leucocytosis, leucopenia". The gutters are
  now found as the widest gaps between line start positions.
* **The bullet indent uses the modal x, not the minimum.** Sub-headings like
  "CORE :" sit slightly left of the bullets, so taking the minimum made every
  real bullet look like a continuation and shredded whole chapters.

## Status — NOT written to the database

### The finding that decides the design

**Chapter detection cannot be left to heuristics.** Every subject checked
against its PDF turned out to be silently missing chapters:

* Community Medicine lost Medical Entomology, Public Health Nutrition and
  Occupational Health — they start mid-page, and the parser only looked above
  the first table row.
* Biochemistry lost its opening chapter, Biophysics & Biomolecules.
* Physiology looked complete and correct, but only because its chapters all
  happen to start at the top of a page.

Silent omission is exactly the defect this whole exercise exists to remove: it
is what made the old hand-written IGCSE Biology template drop three topics. A
missing chapter is worse than a mangled one, because nothing on screen shows
that anything is absent.

Two detection signals were tried and both fail alone:

| signal | fails how |
|---|---|
| heading sits above the first table row | drops every chapter starting mid-page |
| heading is set in a larger face (12.6pt vs 10pt) | Physiology does not always use a larger face; lost half its chapters |
| heading is alone in its row band | sweeps up the last line of table cells ("vagina", "yolk sac etc") |

The parser now takes the union of the first two plus the third as a filter,
which recovers most chapters — but "most" is not a standard worth shipping
medical content against.

### The way to finish

Pin the chapter list per subject, read off each PDF by hand, and let the parser
only assign sub-chapters to those pinned chapters. That removes guessing from
the part that matters and leaves the machine doing the part it is good at —
lifting the Contents column verbatim. `mbbs_subjects.py` is the place for it;
it already holds per-subject drop and fixup rules because one global regex
provably cannot serve all eleven (widening it to drop "TIME SCHEDULE" also
dropped Anatomy's real chapters, since "Regional Anatomy : THORAX CARD"
legitimately contains "CARD").

### Where each subject stands

| Subject | chapters | sub-topics | state |
|---|---|---|---|
| Physiology | 10 (+1 junk) | 156 | correct and complete; junk row droppable |
| Microbiology | 7 | 186 | chapters correct; completeness unconfirmed |
| Anatomy | 9 (+2 admin) | 136 | regions correct; "CARD" suffix strippable |
| Biochemistry | 6 | 110 | **incomplete** — missing Biophysics & Biomolecules |
| Community Medicine | 8 (+4 junk) | 158 | **incomplete** — missing 3 chapters |
| Forensic Medicine | ~10 (+4 junk) | 297 | section numbering has gaps |
| Pathology, Pharmacology, Medicine, Surgery, Obs & Gynae | — | — | no topic table in the document; need manual curation |

The clinical subjects are structural, not a bug: Medicine, Surgery, Obs & Gynae
and Pathology are organised around clinical postings, teaching cards and lecture
lists, so their headings genuinely are "Clinical/Bedside & Ambulatory care
teaching (in hours)". There is no topic table to lift.

Nothing is in `syllabus_templates`.
