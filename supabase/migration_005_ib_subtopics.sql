-- ============================================================
-- MIGRATION 005: IB Physics, Chemistry, Biology — numbered sub-topics
-- Replaces broad topic entries with official IB syllabus sub-topic numbering
-- Run AFTER migration_002
-- ============================================================

-- Delete existing IB Physics, Chemistry, Biology entries (HL + SL)
DELETE FROM syllabus_templates
WHERE qualification = 'IB Diploma'
  AND exam_board = 'IB'
  AND subject_name IN ('Physics', 'Chemistry', 'Biology');

-- ============================================================
-- IB PHYSICS HL (Topics 1–8 core + Topics 9–12 HL only)
-- ============================================================

INSERT INTO syllabus_templates (qualification, exam_board, board, subject_name, subject_code, topics, level) VALUES
('IB Diploma','IB','IB','Physics',NULL,'[
{"section":"Topic 1: Measurements and uncertainties","name":"1.1 Measurements in physics"},
{"section":"Topic 1: Measurements and uncertainties","name":"1.2 Uncertainties and errors"},
{"section":"Topic 1: Measurements and uncertainties","name":"1.3 Vectors and scalars"},
{"section":"Topic 2: Mechanics","name":"2.1 Motion"},
{"section":"Topic 2: Mechanics","name":"2.2 Forces"},
{"section":"Topic 2: Mechanics","name":"2.3 Work energy and power"},
{"section":"Topic 2: Mechanics","name":"2.4 Momentum and impulse"},
{"section":"Topic 3: Thermal physics","name":"3.1 Thermal concepts"},
{"section":"Topic 3: Thermal physics","name":"3.2 Modelling a gas"},
{"section":"Topic 4: Waves","name":"4.1 Oscillations"},
{"section":"Topic 4: Waves","name":"4.2 Travelling waves"},
{"section":"Topic 4: Waves","name":"4.3 Wave characteristics"},
{"section":"Topic 4: Waves","name":"4.4 Wave behaviour"},
{"section":"Topic 4: Waves","name":"4.5 Standing waves"},
{"section":"Topic 5: Electricity and magnetism","name":"5.1 Electric fields"},
{"section":"Topic 5: Electricity and magnetism","name":"5.2 Heating effect of electric currents"},
{"section":"Topic 5: Electricity and magnetism","name":"5.3 Electric cells"},
{"section":"Topic 5: Electricity and magnetism","name":"5.4 Magnetic effects of electric currents"},
{"section":"Topic 6: Circular motion and gravitation","name":"6.1 Circular motion"},
{"section":"Topic 6: Circular motion and gravitation","name":"6.2 Newton''s law of gravitation"},
{"section":"Topic 7: Atomic nuclear and particle physics","name":"7.1 Discrete energy and radioactivity"},
{"section":"Topic 7: Atomic nuclear and particle physics","name":"7.2 Nuclear reactions"},
{"section":"Topic 7: Atomic nuclear and particle physics","name":"7.3 The structure of matter"},
{"section":"Topic 8: Energy production","name":"8.1 Energy sources"},
{"section":"Topic 8: Energy production","name":"8.2 Thermal energy transfer"},
{"section":"Topic 9: Wave phenomena (HL)","name":"9.1 Simple harmonic motion"},
{"section":"Topic 9: Wave phenomena (HL)","name":"9.2 Single-slit diffraction"},
{"section":"Topic 9: Wave phenomena (HL)","name":"9.3 Interference"},
{"section":"Topic 9: Wave phenomena (HL)","name":"9.4 Resolution"},
{"section":"Topic 9: Wave phenomena (HL)","name":"9.5 Doppler effect"},
{"section":"Topic 10: Fields (HL)","name":"10.1 Describing fields"},
{"section":"Topic 10: Fields (HL)","name":"10.2 Fields at work"},
{"section":"Topic 11: Electromagnetic induction (HL)","name":"11.1 Electromagnetic induction"},
{"section":"Topic 11: Electromagnetic induction (HL)","name":"11.2 Power generation and transmission"},
{"section":"Topic 11: Electromagnetic induction (HL)","name":"11.3 Capacitance"},
{"section":"Topic 12: Quantum and nuclear physics (HL)","name":"12.1 The interaction of matter with radiation"},
{"section":"Topic 12: Quantum and nuclear physics (HL)","name":"12.2 Nuclear physics"}
]'::jsonb, 'HL'),

-- ============================================================
-- IB PHYSICS SL (Topics 1–8 only)
-- ============================================================

('IB Diploma','IB','IB','Physics',NULL,'[
{"section":"Topic 1: Measurements and uncertainties","name":"1.1 Measurements in physics"},
{"section":"Topic 1: Measurements and uncertainties","name":"1.2 Uncertainties and errors"},
{"section":"Topic 1: Measurements and uncertainties","name":"1.3 Vectors and scalars"},
{"section":"Topic 2: Mechanics","name":"2.1 Motion"},
{"section":"Topic 2: Mechanics","name":"2.2 Forces"},
{"section":"Topic 2: Mechanics","name":"2.3 Work energy and power"},
{"section":"Topic 2: Mechanics","name":"2.4 Momentum and impulse"},
{"section":"Topic 3: Thermal physics","name":"3.1 Thermal concepts"},
{"section":"Topic 3: Thermal physics","name":"3.2 Modelling a gas"},
{"section":"Topic 4: Waves","name":"4.1 Oscillations"},
{"section":"Topic 4: Waves","name":"4.2 Travelling waves"},
{"section":"Topic 4: Waves","name":"4.3 Wave characteristics"},
{"section":"Topic 4: Waves","name":"4.4 Wave behaviour"},
{"section":"Topic 4: Waves","name":"4.5 Standing waves"},
{"section":"Topic 5: Electricity and magnetism","name":"5.1 Electric fields"},
{"section":"Topic 5: Electricity and magnetism","name":"5.2 Heating effect of electric currents"},
{"section":"Topic 5: Electricity and magnetism","name":"5.3 Electric cells"},
{"section":"Topic 5: Electricity and magnetism","name":"5.4 Magnetic effects of electric currents"},
{"section":"Topic 6: Circular motion and gravitation","name":"6.1 Circular motion"},
{"section":"Topic 6: Circular motion and gravitation","name":"6.2 Newton''s law of gravitation"},
{"section":"Topic 7: Atomic nuclear and particle physics","name":"7.1 Discrete energy and radioactivity"},
{"section":"Topic 7: Atomic nuclear and particle physics","name":"7.2 Nuclear reactions"},
{"section":"Topic 7: Atomic nuclear and particle physics","name":"7.3 The structure of matter"},
{"section":"Topic 8: Energy production","name":"8.1 Energy sources"},
{"section":"Topic 8: Energy production","name":"8.2 Thermal energy transfer"}
]'::jsonb, 'SL'),

-- ============================================================
-- IB CHEMISTRY HL (Topics 1–11 core + Topics 12–21 HL only)
-- ============================================================

('IB Diploma','IB','IB','Chemistry',NULL,'[
{"section":"Topic 1: Stoichiometric relationships","name":"1.1 Introduction to the particulate nature of matter"},
{"section":"Topic 1: Stoichiometric relationships","name":"1.2 The mole concept"},
{"section":"Topic 1: Stoichiometric relationships","name":"1.3 Reacting masses and volumes"},
{"section":"Topic 2: Atomic structure","name":"2.1 The nuclear atom"},
{"section":"Topic 2: Atomic structure","name":"2.2 Electron configuration"},
{"section":"Topic 3: Periodicity","name":"3.1 Periodic table"},
{"section":"Topic 3: Periodicity","name":"3.2 Periodic trends"},
{"section":"Topic 4: Chemical bonding and structure","name":"4.1 Ionic bonding"},
{"section":"Topic 4: Chemical bonding and structure","name":"4.2 Covalent bonding"},
{"section":"Topic 4: Chemical bonding and structure","name":"4.3 Covalent structures"},
{"section":"Topic 4: Chemical bonding and structure","name":"4.4 Intermolecular forces"},
{"section":"Topic 4: Chemical bonding and structure","name":"4.5 Metallic bonding"},
{"section":"Topic 5: Energetics and thermochemistry","name":"5.1 Measuring energy changes"},
{"section":"Topic 5: Energetics and thermochemistry","name":"5.2 Hess''s law"},
{"section":"Topic 5: Energetics and thermochemistry","name":"5.3 Bond enthalpies"},
{"section":"Topic 6: Chemical kinetics","name":"6.1 Collision theory and rates of reaction"},
{"section":"Topic 7: Equilibrium","name":"7.1 Equilibrium"},
{"section":"Topic 7: Equilibrium","name":"7.2 The equilibrium law"},
{"section":"Topic 8: Acids and bases","name":"8.1 Theories of acids and bases"},
{"section":"Topic 8: Acids and bases","name":"8.2 Properties of acids and bases"},
{"section":"Topic 8: Acids and bases","name":"8.3 The pH scale"},
{"section":"Topic 8: Acids and bases","name":"8.4 Strong and weak acids and bases"},
{"section":"Topic 8: Acids and bases","name":"8.5 Acid deposition"},
{"section":"Topic 9: Redox processes","name":"9.1 Oxidation and reduction"},
{"section":"Topic 9: Redox processes","name":"9.2 Electrochemical cells"},
{"section":"Topic 10: Organic chemistry","name":"10.1 Fundamentals of organic chemistry"},
{"section":"Topic 10: Organic chemistry","name":"10.2 Functional group chemistry"},
{"section":"Topic 11: Measurement and data processing","name":"11.1 Uncertainties and errors"},
{"section":"Topic 11: Measurement and data processing","name":"11.2 Graphical techniques"},
{"section":"Topic 11: Measurement and data processing","name":"11.3 Spectroscopic identification"},
{"section":"Topic 12: Atomic structure (HL)","name":"12.1 Electrons in atoms"},
{"section":"Topic 13: Periodicity (HL)","name":"13.1 First row d-block elements"},
{"section":"Topic 13: Periodicity (HL)","name":"13.2 Coloured complexes"},
{"section":"Topic 14: Chemical bonding (HL)","name":"14.1 Further aspects of covalent bonding"},
{"section":"Topic 14: Chemical bonding (HL)","name":"14.2 Hybridisation"},
{"section":"Topic 15: Energetics (HL)","name":"15.1 Energy cycles"},
{"section":"Topic 15: Energetics (HL)","name":"15.2 Entropy and spontaneity"},
{"section":"Topic 16: Chemical kinetics (HL)","name":"16.1 Rate expression and reaction mechanism"},
{"section":"Topic 16: Chemical kinetics (HL)","name":"16.2 Activation energy"},
{"section":"Topic 17: Equilibrium (HL)","name":"17.1 The equilibrium law"},
{"section":"Topic 18: Acids and bases (HL)","name":"18.1 Lewis acids and bases"},
{"section":"Topic 18: Acids and bases (HL)","name":"18.2 Calculations involving acids and bases"},
{"section":"Topic 18: Acids and bases (HL)","name":"18.3 pH curves"},
{"section":"Topic 19: Redox (HL)","name":"19.1 Electrochemical cells"},
{"section":"Topic 20: Organic chemistry (HL)","name":"20.1 Types of organic reactions"},
{"section":"Topic 20: Organic chemistry (HL)","name":"20.2 Synthetic routes"},
{"section":"Topic 20: Organic chemistry (HL)","name":"20.3 Stereoisomerism"},
{"section":"Topic 21: Measurement (HL)","name":"21.1 Spectroscopic identification of organic compounds"}
]'::jsonb, 'HL'),

-- ============================================================
-- IB CHEMISTRY SL (Topics 1–11 only)
-- ============================================================

('IB Diploma','IB','IB','Chemistry',NULL,'[
{"section":"Topic 1: Stoichiometric relationships","name":"1.1 Introduction to the particulate nature of matter"},
{"section":"Topic 1: Stoichiometric relationships","name":"1.2 The mole concept"},
{"section":"Topic 1: Stoichiometric relationships","name":"1.3 Reacting masses and volumes"},
{"section":"Topic 2: Atomic structure","name":"2.1 The nuclear atom"},
{"section":"Topic 2: Atomic structure","name":"2.2 Electron configuration"},
{"section":"Topic 3: Periodicity","name":"3.1 Periodic table"},
{"section":"Topic 3: Periodicity","name":"3.2 Periodic trends"},
{"section":"Topic 4: Chemical bonding and structure","name":"4.1 Ionic bonding"},
{"section":"Topic 4: Chemical bonding and structure","name":"4.2 Covalent bonding"},
{"section":"Topic 4: Chemical bonding and structure","name":"4.3 Covalent structures"},
{"section":"Topic 4: Chemical bonding and structure","name":"4.4 Intermolecular forces"},
{"section":"Topic 4: Chemical bonding and structure","name":"4.5 Metallic bonding"},
{"section":"Topic 5: Energetics and thermochemistry","name":"5.1 Measuring energy changes"},
{"section":"Topic 5: Energetics and thermochemistry","name":"5.2 Hess''s law"},
{"section":"Topic 5: Energetics and thermochemistry","name":"5.3 Bond enthalpies"},
{"section":"Topic 6: Chemical kinetics","name":"6.1 Collision theory and rates of reaction"},
{"section":"Topic 7: Equilibrium","name":"7.1 Equilibrium"},
{"section":"Topic 7: Equilibrium","name":"7.2 The equilibrium law"},
{"section":"Topic 8: Acids and bases","name":"8.1 Theories of acids and bases"},
{"section":"Topic 8: Acids and bases","name":"8.2 Properties of acids and bases"},
{"section":"Topic 8: Acids and bases","name":"8.3 The pH scale"},
{"section":"Topic 8: Acids and bases","name":"8.4 Strong and weak acids and bases"},
{"section":"Topic 8: Acids and bases","name":"8.5 Acid deposition"},
{"section":"Topic 9: Redox processes","name":"9.1 Oxidation and reduction"},
{"section":"Topic 9: Redox processes","name":"9.2 Electrochemical cells"},
{"section":"Topic 10: Organic chemistry","name":"10.1 Fundamentals of organic chemistry"},
{"section":"Topic 10: Organic chemistry","name":"10.2 Functional group chemistry"},
{"section":"Topic 11: Measurement and data processing","name":"11.1 Uncertainties and errors"},
{"section":"Topic 11: Measurement and data processing","name":"11.2 Graphical techniques"},
{"section":"Topic 11: Measurement and data processing","name":"11.3 Spectroscopic identification"}
]'::jsonb, 'SL'),

-- ============================================================
-- IB BIOLOGY HL (Topics 1–6 core + Topics 7–11 HL only)
-- ============================================================

('IB Diploma','IB','IB','Biology',NULL,'[
{"section":"Topic 1: Cell biology","name":"1.1 Introduction to cells"},
{"section":"Topic 1: Cell biology","name":"1.2 Ultrastructure of cells"},
{"section":"Topic 1: Cell biology","name":"1.3 Membrane structure"},
{"section":"Topic 1: Cell biology","name":"1.4 Membrane transport"},
{"section":"Topic 1: Cell biology","name":"1.5 The origin of cells"},
{"section":"Topic 1: Cell biology","name":"1.6 Cell division"},
{"section":"Topic 2: Molecular biology","name":"2.1 Molecules to metabolism"},
{"section":"Topic 2: Molecular biology","name":"2.2 Water"},
{"section":"Topic 2: Molecular biology","name":"2.3 Carbohydrates and lipids"},
{"section":"Topic 2: Molecular biology","name":"2.4 Proteins"},
{"section":"Topic 2: Molecular biology","name":"2.5 Enzymes"},
{"section":"Topic 2: Molecular biology","name":"2.6 Structure of DNA and RNA"},
{"section":"Topic 2: Molecular biology","name":"2.7 DNA replication transcription and translation"},
{"section":"Topic 2: Molecular biology","name":"2.8 Cell respiration"},
{"section":"Topic 2: Molecular biology","name":"2.9 Photosynthesis"},
{"section":"Topic 3: Genetics","name":"3.1 Genes"},
{"section":"Topic 3: Genetics","name":"3.2 Chromosomes"},
{"section":"Topic 3: Genetics","name":"3.3 Meiosis"},
{"section":"Topic 3: Genetics","name":"3.4 Inheritance"},
{"section":"Topic 3: Genetics","name":"3.5 Genetic modification and biotechnology"},
{"section":"Topic 4: Ecology","name":"4.1 Species communities and ecosystems"},
{"section":"Topic 4: Ecology","name":"4.2 Energy flow"},
{"section":"Topic 4: Ecology","name":"4.3 Carbon cycling"},
{"section":"Topic 4: Ecology","name":"4.4 Climate change"},
{"section":"Topic 5: Evolution and biodiversity","name":"5.1 Evidence for evolution"},
{"section":"Topic 5: Evolution and biodiversity","name":"5.2 Natural selection"},
{"section":"Topic 5: Evolution and biodiversity","name":"5.3 Classification of biodiversity"},
{"section":"Topic 5: Evolution and biodiversity","name":"5.4 Cladistics"},
{"section":"Topic 6: Human physiology","name":"6.1 Digestion and absorption"},
{"section":"Topic 6: Human physiology","name":"6.2 The blood system"},
{"section":"Topic 6: Human physiology","name":"6.3 Defence against infectious disease"},
{"section":"Topic 6: Human physiology","name":"6.4 Gas exchange"},
{"section":"Topic 6: Human physiology","name":"6.5 Neurons and synapses"},
{"section":"Topic 6: Human physiology","name":"6.6 Hormones homeostasis and reproduction"},
{"section":"Topic 7: Nucleic acids (HL)","name":"7.1 DNA structure and replication"},
{"section":"Topic 7: Nucleic acids (HL)","name":"7.2 Transcription and gene expression"},
{"section":"Topic 7: Nucleic acids (HL)","name":"7.3 Translation"},
{"section":"Topic 8: Metabolism cell respiration and photosynthesis (HL)","name":"8.1 Metabolism"},
{"section":"Topic 8: Metabolism cell respiration and photosynthesis (HL)","name":"8.2 Cell respiration"},
{"section":"Topic 8: Metabolism cell respiration and photosynthesis (HL)","name":"8.3 Photosynthesis"},
{"section":"Topic 9: Plant biology (HL)","name":"9.1 Transport in the xylem"},
{"section":"Topic 9: Plant biology (HL)","name":"9.2 Transport in the phloem"},
{"section":"Topic 9: Plant biology (HL)","name":"9.3 Growth in plants"},
{"section":"Topic 9: Plant biology (HL)","name":"9.4 Reproduction in plants"},
{"section":"Topic 10: Genetics and evolution (HL)","name":"10.1 Meiosis"},
{"section":"Topic 10: Genetics and evolution (HL)","name":"10.2 Inheritance"},
{"section":"Topic 10: Genetics and evolution (HL)","name":"10.3 Gene pools and speciation"},
{"section":"Topic 11: Animal physiology (HL)","name":"11.1 Antibody production and vaccination"},
{"section":"Topic 11: Animal physiology (HL)","name":"11.2 Movement"},
{"section":"Topic 11: Animal physiology (HL)","name":"11.3 The kidney and osmoregulation"},
{"section":"Topic 11: Animal physiology (HL)","name":"11.4 Sexual reproduction"}
]'::jsonb, 'HL'),

-- ============================================================
-- IB BIOLOGY SL (Topics 1–6 only)
-- ============================================================

('IB Diploma','IB','IB','Biology',NULL,'[
{"section":"Topic 1: Cell biology","name":"1.1 Introduction to cells"},
{"section":"Topic 1: Cell biology","name":"1.2 Ultrastructure of cells"},
{"section":"Topic 1: Cell biology","name":"1.3 Membrane structure"},
{"section":"Topic 1: Cell biology","name":"1.4 Membrane transport"},
{"section":"Topic 1: Cell biology","name":"1.5 The origin of cells"},
{"section":"Topic 1: Cell biology","name":"1.6 Cell division"},
{"section":"Topic 2: Molecular biology","name":"2.1 Molecules to metabolism"},
{"section":"Topic 2: Molecular biology","name":"2.2 Water"},
{"section":"Topic 2: Molecular biology","name":"2.3 Carbohydrates and lipids"},
{"section":"Topic 2: Molecular biology","name":"2.4 Proteins"},
{"section":"Topic 2: Molecular biology","name":"2.5 Enzymes"},
{"section":"Topic 2: Molecular biology","name":"2.6 Structure of DNA and RNA"},
{"section":"Topic 2: Molecular biology","name":"2.7 DNA replication transcription and translation"},
{"section":"Topic 2: Molecular biology","name":"2.8 Cell respiration"},
{"section":"Topic 2: Molecular biology","name":"2.9 Photosynthesis"},
{"section":"Topic 3: Genetics","name":"3.1 Genes"},
{"section":"Topic 3: Genetics","name":"3.2 Chromosomes"},
{"section":"Topic 3: Genetics","name":"3.3 Meiosis"},
{"section":"Topic 3: Genetics","name":"3.4 Inheritance"},
{"section":"Topic 3: Genetics","name":"3.5 Genetic modification and biotechnology"},
{"section":"Topic 4: Ecology","name":"4.1 Species communities and ecosystems"},
{"section":"Topic 4: Ecology","name":"4.2 Energy flow"},
{"section":"Topic 4: Ecology","name":"4.3 Carbon cycling"},
{"section":"Topic 4: Ecology","name":"4.4 Climate change"},
{"section":"Topic 5: Evolution and biodiversity","name":"5.1 Evidence for evolution"},
{"section":"Topic 5: Evolution and biodiversity","name":"5.2 Natural selection"},
{"section":"Topic 5: Evolution and biodiversity","name":"5.3 Classification of biodiversity"},
{"section":"Topic 5: Evolution and biodiversity","name":"5.4 Cladistics"},
{"section":"Topic 6: Human physiology","name":"6.1 Digestion and absorption"},
{"section":"Topic 6: Human physiology","name":"6.2 The blood system"},
{"section":"Topic 6: Human physiology","name":"6.3 Defence against infectious disease"},
{"section":"Topic 6: Human physiology","name":"6.4 Gas exchange"},
{"section":"Topic 6: Human physiology","name":"6.5 Neurons and synapses"},
{"section":"Topic 6: Human physiology","name":"6.6 Hormones homeostasis and reproduction"}
]'::jsonb, 'SL');
