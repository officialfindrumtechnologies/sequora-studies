# MBBS visualiser content audit — 2026-08-05

Subject agents fact-checked every topic's description, landmarks, examQA and
diagram labels against standard references (Gray/Snell, Katzung, Modi/Parikh,
Jawetz, Robbins, Park, Davidson, Bailey & Love, Dutta).

**9 of 11 subjects completed: 42 findings — 7 critical, 24 moderate, 11 minor**
across 162 topics. Physiology and Biochemistry failed on an internal error and
were re-run separately; their results are recorded below once available.

Every critical finding's quoted text was verified to exist verbatim in the data
before being recorded, and the self-contradictory ones were confirmed by reading
the conflicting fields directly.

## Critical — a doctor could act wrongly on these

1. **Pharmacology / Drug Interactions** — isoniazid listed as a CYP450 *inducer*
   in the PRICSS mnemonic. It is an *inhibitor* (CYP2C19/3A4); this underlies the
   classic isoniazid + phenytoin toxicity interaction. It induces only CYP2E1.
2. **Pharmacology / Drug Interactions** — ACE inhibitors/ARBs described as
   "Safe in 1st trimester". First-trimester exposure carries malformation risk;
   guidance is to stop or switch as soon as pregnancy is confirmed or planned.
3. **Forensic / Post-mortem Changes** — "Absent rigor: death from strychnine".
   Backwards: strychnine causes early, intense rigor because convulsions deplete
   ATP faster.
4. **Forensic / Sexual Offences** — statutory rape age given as under 16.
   Bangladesh Penal Code s.375 states under 14, while the Nari-o-Shishu Nirjatan
   Daman Ain 2000 defines a child as under 16. Both are cited rather than
   picking one, since the applicable threshold depends on the statute charged.
5. **Community Medicine / Immunisation** — Bangladesh EPI schedule omitted IPV-2
   at 14 weeks; only one IPV dose was listed, at 6 weeks.
6. **Medicine / Hypertension** — "Under 55 or Black: ACEi/ARB first-line; Over 55
   or Black: CCB first-line". "Black" appeared in both arms. The topic's own
   landmarks and diagram both correctly say Black -> CCB at any age.
7. **Obs & Gynae / Puerperal Complications** — postpartum DVT "treat for 6 weeks
   (or 3 months if PE)". Minimum is 3 months total anticoagulation for both.

## Dominant pattern

Most findings are the content contradicting *itself* — description disagreeing
with landmarks, diagram labels disagreeing with the prose. The hypertension entry
is the clearest case. This points to content assembled in passes that were never
reconciled, which means the correct value is usually already present elsewhere in
the same topic.

## Invented terminology

Three eponyms presented as established, none of which exist:
- "Schulman cycle" for Ascaris hepato-pulmonary migration (Microbiology)
- "Nicosia criterion" for the 85 dB noise limit (Community Medicine)
- a "Weil-Felix-like" analogy for gas-gangrene haemolysis (Microbiology)

Same failure mode as the fabricated past-paper attributions removed earlier.

## Per-subject counts

| subject | findings | critical |
|---|---|---|
| Anatomy | 5 | 0 |
| Pharmacology | 4 | 2 |
| Forensic Medicine | 7 | 2 |
| Microbiology | 4 | 0 |
| Pathology | 5 | 0 |
| Community Medicine | 7 | 1 |
| Medicine | 6 | 1 |
| Surgery | 1 | 0 |
| Obs & Gynae | 3 | 1 |
| Physiology | re-running | — |
| Biochemistry | re-running | — |

---

# Full-corpus audit — 20 of 33 subjects completed

Extended beyond MBBS to the science subjects. **116 findings, 11 critical**, of
which **41 have been fixed** so far (all criticals plus the moderates whose
correction was unambiguous).

## Completed (20 subjects)

All 11 MBBS subjects with a matching syllabus template, plus:
Cambridge IGCSE Biology / Chemistry / Physics, Edexcel IGCSE Biology / Physics,
Cambridge A Level Physics / Chemistry, Edexcel A Level Biology / Chemistry.

## Not yet audited (13 subjects)

Blocked by an API session limit part-way through:
- Cambridge A Level Biology, Edexcel IGCSE Chemistry (agents died mid-run)
- Edexcel A Level Physics
- All six IB subjects (HL/SL Biology, Chemistry, Physics)
- The four MBBS visualiser subjects with no matching template
  (Histology, ENT, Ophthalmology, Paediatrics)

## Additional criticals found and fixed beyond MBBS

- **Biochemistry / Krebs** — stated "= 20 ATP" over components summing to 25,
  then "≈25 total per glucose", contradicting the oxidative phosphorylation
  topic's 30–32. Arithmetic that does not add up.
- **Cambridge IGCSE Physics** — beta particle charge given as positive.
- **Cambridge A Level Physics** — Hall voltage written V_H = BId/nq; the
  thickness term belongs in the denominator and the expression as written is
  dimensionally wrong (V·m²). The topic's own diagram had it right.
- **Cambridge A Level Chemistry** — nucleophile labelled Nu⁺ in the SN2 diagram.

## Structural issue, not yet fixed

Several subjects carry `syllabusRef` values that follow retired syllabus
numbering, so a student cross-referencing the real specification lands on the
wrong chapter:
- Cambridge IGCSE Biology: Reproduction onward is off by one (verified against
  Cambridge's own 2026–2028 syllabus in our database — topic 15 is Drugs).
- Cambridge IGCSE Chemistry: numbering follows the retired 2016–2022 scheme, and
  two whole topics (Sulfur/Contact Process, Carbonates) were removed from 0620
  in 2023 and are no longer examinable.
- Cambridge A Level Chemistry: shifted by two from `nitrogen-sulfur` onward.
- Edexcel A Level Chemistry: does not match the 2018 IAL numbering at all.
- Cambridge A Level Physics, Edexcel A Level Biology: sequential invented numbers.

This is a renumbering job across several subjects and needs the real
specification for each; it is deliberately left rather than guessed at.
