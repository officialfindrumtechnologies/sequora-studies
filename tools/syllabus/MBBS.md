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

| Subject | chapters | sub-topics | assessment |
|---|---|---|---|
| Physiology | 10 | 166 | **good** — read in full; chapters are the real systems, sub-topics read correctly |
| Biochemistry | 6 | 110 | plausible, unverified |
| Microbiology | 8 | 217 | plausible, unverified |
| Anatomy | 10 | 117 | one chapter empty |
| Community Medicine | 10 | 113 | one chapter empty |
| Forensic Medicine | 10 | 160 | one chapter empty |
| Medicine | 7 | 482 | chapters empty; 482 sub-topics looks like over-capture |
| Pathology | 3 | 217 | **wrong** — a chapter is named "= 05 Hours" |
| Pharmacology | 2 | 101 | **wrong** — chapters are "Term II", "Pharmacology Practicals" |
| Surgery | 0 | 0 | produces nothing |
| Obs & Gynae | 0 | 0 | produces nothing |

Only Physiology has been read end-to-end against its PDF and confirmed.

`validate()` is currently too weak: it only checks that every chapter has some
content, which is why it passed Pathology and Pharmacology despite obviously
wrong chapter names. Before any of this is trusted it needs to reject
administrative headings ("Term I", "Practicals"), anything containing an hours
figure, and chapter counts that disagree with the document's own contents page.

Nothing here is in `syllabus_templates`. Wrong medical content is the worst
failure this app can have, so the bar stays what the Cambridge batch met: a
subject read in full against its source before it is written.
