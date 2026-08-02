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

**Also written:** IAL Biology (6 units / 171), Chemistry (20 topics / 319) and
Physics (6 units / 166), with `subject_code` migrated to the IAL codes
(YBI11, YCH11, YPH11).

The three defects that held those back, and what each turned out to be:

* **IAL Biology's empty Unit 5** was self-inflicted. Its heading wraps as
  "Unit 5: Respiration, Internal Environment," and headings ending in a comma
  were rejected, so Unit 4 silently absorbed the whole unit. Divisions are now
  validated against the contents page instead, which also fixed Chemistry.
* **IAL Chemistry's 19 units** were topics. Where a spec carries "Topic N:"
  headings the statements are numbered within the topic (8.14 belongs to
  Topic 8) and the Unit headings above them only group topics for assessment,
  so statements are keyed off their own number rather than document position.
  Assigning positionally had filed topics 6–10 under "Unit 6: Practical Skills".
* **IAL Physics's preamble rows** are the specification's own subsections
  ("1.1 Unit description", "1.2 Assessment information"), which collide with
  unit statements because Physics numbers those as plain integers. They appear
  before any real statement so they are filtered at output rather than while
  scanning.

Practical-skills units legitimately carry no numbered statements — they are
assessed as competencies — so an empty one is not reported as missing.

**IGCSE Geography** is now written too (9 topics / 27 key ideas), via
`parse_edx_cols.py`. It is a two-column table — numbered Key ideas beside
lettered Detailed content — so `-layout` welded the two together and produced
"1.1 The world's water a) The hydrological cycle: characteris". Reading word
coordinates and keeping only the Key ideas column fixes it. Three details
mattered: the spec explains "Key ideas" and "Detailed content" in prose earlier
at the same left margin, so calibration requires the two headers at clearly
different x; the idea number is its own line element with the title starting to
its right; and case-study blurbs following an idea must close it rather than be
appended to its title.

### Still unwritten

* **IGCSE Computer Science** parses but with the same two-column bleed
  Geography had ("1.1 Algorithms 1.1.1 Understand what an algorithm is") — it
  uses different column headers so `parse_edx_cols.py` cannot calibrate on it.
* **UK GCE Psychology** extracts cleanly but is the wrong qualification now
  that IAL is the target, and IAL Psychology is among the unfetchable set.
* **English, History, Economics, IGCSE Maths and IGCSE Physics** produce
  nothing from either parser — more layouts again.

### The subjects that produce nothing

IGCSE Maths A, IGCSE Physics, Economics, History and the English subjects were
attempted again and are **still not written**. What was learned:

* Their sections are headed by a bare number with the number and title as
  separate line elements ("1" at x=62, "Numbers and the number system" at
  x=105), so no heading pattern that expects them on one line will match.
* Maths A is a **three**-column table (labels | students-should-be-taught-to |
  notes). Inferring a single gutter from the data lands past the middle column
  and pulls its content in as sub-topics; the named "Students should be taught
  to" header is the only reliable split, and Physics has no equivalent.
* Pairing the number with its title, and trusting bare-number sections only in
  documents that never say "Topic N:", did get Maths to 7 sections / 39
  sub-topics and Physics to 10 / 146 with correct sub-topic text.

That was still not shippable: the section **titles** came from the
bibliography ("Section 1: OECD (2012), Better Skills, Better Jobs", "Section 2:
Koenig, J. A. (2011) Assessing 21st Century Skills") because reference-list
entries are also numbered lines, and Geography lost a topic in the same pass.
Correct sub-topics under wrong chapter names is worse than leaving the old data
in place, so the change was reverted rather than committed.

These need a per-subject section list, pinned by hand the way the MBBS subjects
are in `mbbs_pinned.py`. That approach is proven and is the right next step
here; a general rule has now traded one subject against another four times.

### Pinned subjects

`parse_edx_pinned.py` carries a hand-read section list per subject and three
sub-topic shapes, because Edexcel varies that too:

| mode | shape | subject |
|---|---|---|
| lettered | `1 Forces and motion` → `(a) Units` | IGCSE Physics |
| numbered | `1.1 Integers`, tiered Foundation/Higher | IGCSE Mathematics A |
| plain | `Topic 1:` → `4 Professional ethics` | IGCSE Accounting |
| dotted | `1.1` chapters → `1.1.1` sub-topics | IGCSE Economics |

Requiring a heading's title to match a pinned name is what stops bibliography
entries becoming chapters, which no general rule managed.

**IGCSE Economics is now written** (11 → 18). It does have a header pair to
calibrate from, worded "Subject content" against "What learners need to
study:", which the other subjects' wordings did not match. With a real column
split, wrapped names resolve — proximity to the label never could, because a
wrapped line is indented *further* than its own label ("1.1.1 The economic" at
x=68, "problem" at x=104).

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

## IB Diploma — status

**Correcting an earlier claim in this file's history:** IB guides are not
unobtainable. They are not on ibo.org — they sit behind My IB — but schools
mirror the official PDFs, and those carry IB copyright, the IB publication
imprint and a stated first-assessment year, so the content is authentic.

The mirror is not authoritative for *currency*, so every IB template records
the exact file used in `source_url` and the guide's own stated version in
`syllabus_years`.

**Written:** Biology HL — 16 chapters / 40 topics (was 51 hand-written entries).

The 2025 sciences are four themes lettered A–D, each explored at four levels of
biological organization, giving chapters "A1 Unity and diversity — Molecules"
with topics "A1.1 Water" beneath. Content statements ("A1.1.1—Water as the
medium for life") sit a level below and are deliberately not used as
sub-chapters: they are sentences, not topic names.

**Also written:** Physics HL (5 chapters / 24) and Chemistry HL (6 / 22). Both
shrank against their hand-written predecessors (37 and 48) because the 2025
syllabuses genuinely are smaller — options and Paper 3 were removed.

Each 2025 science numbers itself differently, so the topic pattern and chapter
names come from each guide's own config: Biology uses themes A–D across four
levels of organization, Physics uses themes A–E with `A.1 Kinematics`, and
Chemistry uses `Structure 1` / `Reactivity 1` with `Reactivity 1.1—Measuring
enthalpy changes`.

### HL and SL

All ten IB rows are written at both levels.

Biology genuinely differs: six topics are HL-only — A2.1 Origins of cells,
A2.3 Viruses, A3.2 Classification and cladistics, B3.3 Muscle and motility,
C2.1 Chemical signalling, D2.2 Gene expression — so SL carries 34 against HL's
40.

Getting that right needed **word-level** extraction. The roadmap table marks
HL-only topics with a `[HL only]` tag under its topic, but pdftotext merges
adjacent columns into one line element, so `B2.2 Organelles` and `and motility
[HL only]` from the next column arrive as a single line and the tag lands on
B2.2 instead of B3.3. At word level the columns separate cleanly: topic labels
cluster at one x per column, and a tag belongs to the last label above it in
its own column. An earlier line-level attempt also read C2.2 as HL-only; at
word level the tag sits under C2.1, and C2.2 has none.

Physics and Chemistry share their topic list across levels. They mark
"Additional higher level" *within* topics rather than reserving whole topics —
Physics's single "higher level only" note is about depth inside one content
statement — so both levels take the same list, which is correct rather than a
compromise.

Mathematics AA and AI label every sub-topic `SL 1.1` or `AHL 1.10`, so HL is
SL plus AHL and SL is the SL items alone.

### Remaining

48 IB templates. Each subject needs its guide located on a school mirror, and
the HL/SL split solved before any SL row can be written.
