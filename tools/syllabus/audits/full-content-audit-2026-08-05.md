# Full Visualizer content audit — 2026-08-05

31 of 33 subjects fact-checked by subject-specialist agents against standard
references, every topic's description, landmarks, exam answers and diagram
labels. **~200 findings; 117 fixed.**

Two subjects (MBBS Histology/ENT, MBBS Ophthalmology/Paediatrics) were still
running when this was written.

## What was fixed

All factual errors with an unambiguous correction, including 13 rated critical:

- isoniazid classed as a CYP450 inducer (it is an inhibitor)
- ACE inhibitors "safe in 1st trimester"
- strychnine given as a cause of ABSENT rigor mortis
- Bangladesh statutory rape age given as one figure when two statutes differ
- EPI schedule missing IPV-2 at 14 weeks
- antihypertensive rule listing "Black" in both arms of one sentence
- postpartum DVT anticoagulation given as 6 weeks (minimum is 3 months)
- Krebs ATP components summing to 25 but stated as 20
- beta particle charge given as positive
- Hall voltage with thickness in the numerator (dimensionally wrong)
- a nucleophile labelled Nu+ in an SN2 diagram
- radioactivity given as A = -lambda*N (activity is positive)
- ethanol to ethanal by reflux (reflux gives the acid; distillation is required)

Plus ~104 moderates and minors: wrong enzyme names, reversed regulation,
mislabelled diagram structures, arithmetic that did not sum, and three invented
eponyms ("Schulman cycle", "Nicosia criterion", a bogus "Weil-Felix-like"
analogy).

## The dominant defect

Roughly two thirds of all findings are the content contradicting *itself* —
description disagreeing with landmarks, diagram labels disagreeing with the
prose. In most cases the correct value was already present in another field of
the same topic. That is why these were safe to fix.

## NOT fixed — needs a decision, deliberately not guessed at

### 1. Every IB subject is built on the retired curriculum

All six IB subjects (HL/SL Biology, Chemistry, Physics) carry syllabus
references from the pre-2025 guide. IB restructured for first assessment 2025:
Biology into Themes A-D, Chemistry into Structure/Reactivity (S1-S3, R1-R3),
Physics into Themes A-E. Our own syllabus_templates for IB are the NEW
curriculum, so the Visualizer and the syllabus tree disagree with each other.

Consequences beyond numbering: content now withdrawn is still taught (IB Physics
Standard Model, capacitance; IB Chemistry "Topic 11 Measurement"), and required
new content is entirely absent (Physics A.4 rigid body mechanics, A.5 relativity,
B.4 thermodynamics, E.5 fusion and stars; Biology B4.1, C3.1, D4).

### 2. Cambridge A Level Biology is missing two whole topics

Verified against Cambridge's own 9700 (2025-2027) syllabus as parsed into our
database. The Visualizer has no topic for **12 Energy and respiration** or
**13 Photosynthesis** — two of the largest A Level topics — while carrying an
off-syllabus "Ecology" topic and a "Smoking and Disease" topic that Cambridge
withdrew. Topic numbering from Homeostasis onward has been corrected (14-19),
but the two missing topics still need writing.

### 3. Cambridge IGCSE Chemistry teaches withdrawn topics

0620 dropped Sulfur/Contact Process and Carbonates in 2023. Both are still
present. Confirmed against Cambridge's 2026-2028 syllabus in our database.

### 4. Edexcel IAL Physics numbering is invented

The dataset uses "Topic 1-17"; IAL has 11 content topics under unit-prefixed
numbers (1.3 Mechanics, 2.4 Electric Circuits, 4.4 Fields, 5.6 Astrophysics...).
Several topics also duplicate each other under different invented numbers
(Astrophysics vs Space; Electricity and DC Circuits vs Electric Circuits).

### 5. SL courses carry HL-only content

IB SL Biology, Chemistry and Physics all list HL material without marking it —
Krebs and chemiosmosis, the Calvin cycle, enzyme inhibition, Ka/buffers,
electrolysis of aqueous solutions, the photoelectric equation, escape speed.
An SL student revising these is spending time on unexaminable material.

Each of these needs the real specification to fix properly. Guessing is what
produced the defects in the first place.
