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

Column-gutter detection and the geometry-driven page filter got most
pre-clinical subjects extracting cleanly. The clinical subjects did not follow.

| Subject | chapters | sub-topics | assessment |
|---|---|---|---|
| Physiology | 10 | 156 | **verified** — read in full against the PDF |
| Community Medicine | 9 | 159 | chapters correct, sub-topics unverified |
| Microbiology | 7 | 186 | chapters correct, sub-topics unverified |
| Biochemistry | 6 | 110 | chapters correct, sub-topics unverified |
| Forensic Medicine | 13 | 297 | section headings correct, unverified |
| Anatomy | 11 | 136 | regions correct but titles carry a stray "CARD" suffix |
| Pathology | 1 | 359 | **broken** — collapses to a single chapter |
| Pharmacology | 2 | 62 | **broken** — "Pharmacology Practicals", "COURSE ORGANIZATION" |
| Medicine | 8 | 889 | **broken** — chapters are teaching-hour headings |
| Surgery | 2 | 506 | **broken** — same |
| Obs & Gynae | 16 | 507 | **broken** — "Lectures in Obstetrics (4th Year)" etc. |

### Why the clinical subjects resist

Medicine, Surgery, Obs & Gynae and Pathology are not organised as topic tables.
They are organised around clinical postings, teaching cards and lecture lists,
so their centred headings are things like "Clinical/Bedside & Ambulatory care
teaching (in hours)" — genuinely how the document is structured, not a parsing
artefact. There is no topic table to extract because the curriculum does not
present one in the same form. These need either a different extraction shape or
manual curation against the PDF.

Tuning the chapter filter trades one subject against another: broadening it to
drop "TIME SCHEDULE" also dropped Anatomy's real chapters, because "Regional
Anatomy : THORAX CARD" legitimately contains "CARD". Per-subject rules will
almost certainly be needed rather than one global regex.

Nothing is in `syllabus_templates`. Wrong medical content is the worst failure
this app can have, so the bar stays what the Cambridge batch met: a subject read
in full against its source before it is written.
