-- ============================================================
-- MIGRATION 006: Rename stale IB topic names → new numbered format
-- Targets user topics table only (syllabus_templates already updated by migration_005)
-- Safe to run multiple times (exact-match WHERE clauses, idempotent)
-- Run AFTER migration_005
-- ============================================================

-- ============================================================
-- IB PHYSICS
-- Filters: subjects.name = 'Physics' AND subjects.level IN ('HL', 'SL')
-- ============================================================

-- Topic 1: Measurements and uncertainties
UPDATE topics SET name = '1.1 Measurements in physics'
WHERE name = 'Measurement and uncertainties'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

-- Topic 2: Mechanics (HL-style names)
UPDATE topics SET name = '2.1 Motion'
WHERE name = 'Mechanics — kinematics'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '2.2 Forces'
WHERE name = 'Forces and Newton''s laws'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '2.3 Work energy and power'
WHERE name = 'Work, energy and power'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '2.4 Momentum and impulse'
WHERE name = 'Momentum and impulse'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

-- Topic 2: Mechanics (SL-style broad name)
UPDATE topics SET name = '2.1 Motion'
WHERE name = 'Mechanics'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

-- Topic 3: Thermal physics
UPDATE topics SET name = '3.1 Thermal concepts'
WHERE name = 'Thermal physics — temperature and heat'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '3.2 Modelling a gas'
WHERE name = 'Ideal gas model'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '3.1 Thermal concepts'
WHERE name = 'Thermal physics'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

-- Topic 4: Waves
UPDATE topics SET name = '4.1 Oscillations'
WHERE name = 'Waves — oscillations and travelling waves'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '4.3 Wave characteristics'
WHERE name = 'Wave phenomena (reflection, refraction, interference)'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '4.5 Standing waves'
WHERE name = 'Standing waves'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '4.1 Oscillations'
WHERE name = 'Waves'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

-- Topic 5: Electricity and magnetism
UPDATE topics SET name = '5.1 Electric fields'
WHERE name = 'Electric fields'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '5.4 Magnetic effects of electric currents'
WHERE name = 'Magnetic fields'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '5.3 Electric cells'
WHERE name = 'D.C. circuits'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '5.1 Electric fields'
WHERE name = 'Electricity and magnetism'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

-- Topic 6: Circular motion and gravitation
UPDATE topics SET name = '6.1 Circular motion'
WHERE name = 'Circular motion and gravitation'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

-- Topic 7: Atomic, nuclear and particle physics
UPDATE topics SET name = '7.1 Discrete energy and radioactivity'
WHERE name = 'Atomic, nuclear and particle physics'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

-- Topic 8: Energy production
UPDATE topics SET name = '8.1 Energy sources'
WHERE name = 'Energy production'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

-- Topic 10 (HL only)
UPDATE topics SET name = '10.1 Describing fields'
WHERE name = 'Fields and forces — advanced (HL)'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

-- Topic 11 (HL only)
UPDATE topics SET name = '11.1 Electromagnetic induction'
WHERE name = 'Electromagnetic induction'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

-- Topic 12 (HL only)
UPDATE topics SET name = '12.1 The interaction of matter with radiation'
WHERE name = 'Wave-particle duality (HL)'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '12.2 Nuclear physics'
WHERE name = 'Further nuclear physics (HL)'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Physics' AND level IN ('HL', 'SL'));

-- ============================================================
-- IB CHEMISTRY
-- Filters: subjects.name = 'Chemistry' AND subjects.level IN ('HL', 'SL')
-- ============================================================

UPDATE topics SET name = '1.1 Introduction to the particulate nature of matter'
WHERE name = 'Stoichiometric relationships'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Chemistry' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '2.1 The nuclear atom'
WHERE name = 'Atomic structure'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Chemistry' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '3.1 Periodic table'
WHERE name = 'Periodicity'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Chemistry' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '4.1 Ionic bonding'
WHERE name = 'Chemical bonding and structure'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Chemistry' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '5.1 Measuring energy changes'
WHERE name = 'Energetics and thermochemistry'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Chemistry' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '6.1 Collision theory and rates of reaction'
WHERE name = 'Chemical kinetics'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Chemistry' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '7.1 Equilibrium'
WHERE name = 'Equilibrium'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Chemistry' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '8.1 Theories of acids and bases'
WHERE name = 'Acids and bases'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Chemistry' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '9.1 Oxidation and reduction'
WHERE name = 'Redox reactions'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Chemistry' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '10.1 Fundamentals of organic chemistry'
WHERE name = 'Organic chemistry'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Chemistry' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '11.1 Uncertainties and errors'
WHERE name = 'Measurement and data processing'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Chemistry' AND level IN ('HL', 'SL'));

-- AHL Chemistry (HL only)
UPDATE topics SET name = '14.1 Further aspects of covalent bonding'
WHERE name = 'Advanced bonding and molecular structure'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Chemistry' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '15.1 Energy cycles'
WHERE name = 'Further energetics (Hess, Born-Haber)'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Chemistry' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '16.1 Rate expression and reaction mechanism'
WHERE name = 'Rate equations and mechanisms'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Chemistry' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '17.1 The equilibrium law'
WHERE name = 'Further equilibrium (Kc, Kp)'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Chemistry' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '18.1 Lewis acids and bases'
WHERE name = 'Further acids and bases — pH, buffers'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Chemistry' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '19.1 Electrochemical cells'
WHERE name = 'Electrochemical cells'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Chemistry' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '20.1 Types of organic reactions'
WHERE name = 'Further organic — mechanisms and NMR'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Chemistry' AND level IN ('HL', 'SL'));

-- ============================================================
-- IB BIOLOGY
-- Filters: subjects.name = 'Biology' AND subjects.level IN ('HL', 'SL')
-- ============================================================

-- Topic 1: Cell biology
UPDATE topics SET name = '1.1 Introduction to cells'
WHERE name IN ('Cell theory and prokaryotic/eukaryotic cells', 'Cell theory and cell structure')
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '1.2 Ultrastructure of cells'
WHERE name = 'Ultrastructure of cells'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '1.3 Membrane structure'
WHERE name = 'Membrane structure and transport'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '1.6 Cell division'
WHERE name = 'Cell division — mitosis'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

-- Topic 2: Molecular biology
UPDATE topics SET name = '2.1 Molecules to metabolism'
WHERE name IN ('Molecules to metabolism', 'Biological molecules and metabolism')
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '2.2 Water'
WHERE name = 'Water and its properties'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '2.3 Carbohydrates and lipids'
WHERE name = 'Carbohydrates and lipids'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '2.4 Proteins'
WHERE name = 'Proteins and enzymes'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '2.6 Structure of DNA and RNA'
WHERE name IN ('DNA structure and replication', 'DNA structure, replication and gene expression')
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '2.7 DNA replication transcription and translation'
WHERE name = 'Transcription and translation'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '2.8 Cell respiration'
WHERE name = 'Cellular respiration'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '2.9 Photosynthesis'
WHERE name = 'Photosynthesis'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

-- Topic 3: Genetics
UPDATE topics SET name = '3.1 Genes'
WHERE name = 'Chromosomes, genes and alleles'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '3.3 Meiosis'
WHERE name = 'Meiosis'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '3.4 Inheritance'
WHERE name IN ('Inheritance (Mendelian and extensions)', 'Inheritance and meiosis')
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '3.5 Genetic modification and biotechnology'
WHERE name = 'Recombinant DNA and gene expression'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

-- Topic 4: Ecology
UPDATE topics SET name = '4.1 Species communities and ecosystems'
WHERE name IN ('Species, communities and ecosystems', 'Ecosystems and biodiversity')
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '4.2 Energy flow'
WHERE name = 'Energy flow and nutrient cycling'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '4.4 Climate change'
WHERE name = 'Climate change'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

-- Topic 5: Evolution and biodiversity
UPDATE topics SET name = '5.1 Evidence for evolution'
WHERE name = 'Evidence for evolution'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '5.2 Natural selection'
WHERE name IN ('Natural selection', 'Natural selection and evolution')
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '5.3 Classification of biodiversity'
WHERE name = 'Classification and biodiversity'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

-- Topic 6: Human physiology
UPDATE topics SET name = '6.1 Digestion and absorption'
WHERE name IN ('Digestion and absorption', 'Digestion, circulation and gas exchange')
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '6.2 The blood system'
WHERE name = 'Blood system'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '6.4 Gas exchange'
WHERE name = 'Gas exchange'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '6.5 Neurons and synapses'
WHERE name IN ('Neurons and synapses', 'Neurons and hormones')
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '6.6 Hormones homeostasis and reproduction'
WHERE name = 'Hormones and homeostasis'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

-- Topics 7–11 (HL only)
UPDATE topics SET name = '7.3 Translation'
WHERE name = 'Protein synthesis in detail'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '8.2 Cell respiration'
WHERE name = 'Cell respiration and electron transport chain'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '9.3 Growth in plants'
WHERE name = 'Plant structure and growth'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '11.1 Antibody production and vaccination'
WHERE name = 'Immune system'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));

UPDATE topics SET name = '11.2 Movement'
WHERE name = 'Muscle and movement'
  AND subject_id IN (SELECT id FROM subjects WHERE name = 'Biology' AND level IN ('HL', 'SL'));
