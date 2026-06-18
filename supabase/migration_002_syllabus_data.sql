-- ============================================================
-- MIGRATION 002: Full syllabus_templates data
-- Run AFTER migration_001 (or standalone — safe with IF NOT EXISTS guards)
-- Columns: qualification, exam_board, board, subject_name, subject_code, topics, level
-- ============================================================

-- Ensure new columns exist (idempotent — safe to re-run)
ALTER TABLE syllabus_templates ADD COLUMN IF NOT EXISTS qualification text;
ALTER TABLE syllabus_templates ADD COLUMN IF NOT EXISTS exam_board    text;
ALTER TABLE syllabus_templates ADD COLUMN IF NOT EXISTS level         text;

-- Ensure subjects level column exists
ALTER TABLE subjects ADD COLUMN IF NOT EXISTS level text;

-- Ensure profiles qualification column exists
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS qualification text;

-- Migrate existing profile rows (old flat exam_board → new split columns)
UPDATE profiles SET
  qualification = CASE exam_board
    WHEN 'edexcel_alevel'   THEN 'A Level'
    WHEN 'cambridge_alevel' THEN 'A Level'
    WHEN 'edexcel_igcse'    THEN 'IGCSE / O Level'
    WHEN 'cambridge_igcse'  THEN 'IGCSE / O Level'
    WHEN 'o_level'          THEN 'IGCSE / O Level'
    WHEN 'mbbs'             THEN 'MBBS'
    ELSE NULL
  END,
  exam_board = CASE exam_board
    WHEN 'edexcel_alevel'   THEN 'Edexcel'
    WHEN 'cambridge_alevel' THEN 'Cambridge'
    WHEN 'edexcel_igcse'    THEN 'Edexcel IGCSE'
    WHEN 'cambridge_igcse'  THEN 'Cambridge IGCSE'
    WHEN 'o_level'          THEN 'Cambridge O Level'
    WHEN 'mbbs'             THEN 'BMDC Bangladesh'
    ELSE exam_board
  END
WHERE qualification IS NULL;

-- Clear old templates then insert fresh
TRUNCATE syllabus_templates RESTART IDENTITY;

INSERT INTO syllabus_templates (qualification, exam_board, board, subject_name, subject_code, topics, level) VALUES

-- ============================================================
-- A LEVEL · EDEXCEL
-- ============================================================

('A Level','Edexcel','edexcel_alevel','Mathematics',NULL,'[
{"section":"Pure: Algebra","name":"Algebra and functions"},
{"section":"Pure: Algebra","name":"Indices and surds"},
{"section":"Pure: Algebra","name":"Quadratics and inequalities"},
{"section":"Pure: Coordinate Geometry","name":"Straight-line graphs"},
{"section":"Pure: Coordinate Geometry","name":"Circles"},
{"section":"Pure: Algebra","name":"Binomial expansion"},
{"section":"Pure: Algebra","name":"Further algebra and proof"},
{"section":"Pure: Trigonometry","name":"Trigonometric identities and equations"},
{"section":"Pure: Trigonometry","name":"Radians, arcs and sectors"},
{"section":"Pure: Trigonometry","name":"Further trigonometric functions (sec, cosec, cot)"},
{"section":"Pure: Trigonometry","name":"Trigonometry and modelling"},
{"section":"Pure: Calculus","name":"Exponentials and logarithms"},
{"section":"Pure: Calculus","name":"Differentiation"},
{"section":"Pure: Calculus","name":"Further differentiation (chain, product, quotient rules)"},
{"section":"Pure: Calculus","name":"Integration"},
{"section":"Pure: Calculus","name":"Further integration techniques"},
{"section":"Pure: Calculus","name":"Parametric equations"},
{"section":"Pure: Calculus","name":"Numerical methods"},
{"section":"Pure: Vectors","name":"Vectors in 2D and 3D"},
{"section":"Statistics","name":"Statistical sampling"},
{"section":"Statistics","name":"Data presentation and interpretation"},
{"section":"Statistics","name":"Probability"},
{"section":"Statistics","name":"Binomial distribution"},
{"section":"Statistics","name":"Normal distribution"},
{"section":"Statistics","name":"Statistical hypothesis testing"},
{"section":"Statistics","name":"Regression and correlation"},
{"section":"Statistics","name":"Conditional probability"},
{"section":"Mechanics","name":"Kinematics — constant acceleration"},
{"section":"Mechanics","name":"Kinematics — variable acceleration"},
{"section":"Mechanics","name":"Forces and Newton''s laws"},
{"section":"Mechanics","name":"Moments"},
{"section":"Mechanics","name":"Projectiles"},
{"section":"Mechanics","name":"Applications of forces and friction"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','Further Mathematics',NULL,'[
{"section":"Core Pure 1","name":"Complex numbers"},
{"section":"Core Pure 1","name":"Argand diagrams"},
{"section":"Core Pure 1","name":"Series and sigma notation"},
{"section":"Core Pure 1","name":"Roots of polynomials"},
{"section":"Core Pure 1","name":"Volumes of revolution"},
{"section":"Core Pure 1","name":"Matrices"},
{"section":"Core Pure 1","name":"Linear transformations"},
{"section":"Core Pure 1","name":"Proof by induction"},
{"section":"Core Pure 1","name":"Vectors"},
{"section":"Core Pure 2","name":"Complex numbers: modulus-argument form"},
{"section":"Core Pure 2","name":"Series: Maclaurin series"},
{"section":"Core Pure 2","name":"Methods in calculus (improper integrals, mean value)"},
{"section":"Core Pure 2","name":"Polar coordinates"},
{"section":"Core Pure 2","name":"Hyperbolic functions"},
{"section":"Core Pure 2","name":"Methods in differential equations"},
{"section":"Core Pure 2","name":"Modelling with differential equations"},
{"section":"Further Pure","name":"Further trigonometry"},
{"section":"Further Pure","name":"Further calculus techniques"},
{"section":"Further Statistics","name":"Discrete random variables"},
{"section":"Further Statistics","name":"Poisson distribution"},
{"section":"Further Statistics","name":"Continuous random variables"},
{"section":"Further Statistics","name":"Chi-squared tests"},
{"section":"Further Mechanics","name":"Elastic strings and springs"},
{"section":"Further Mechanics","name":"Elastic collisions"},
{"section":"Further Mechanics","name":"Simple harmonic motion"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','Physics',NULL,'[
{"section":"Year 1","name":"Measurements and their errors"},
{"section":"Year 1","name":"Particles and radiation"},
{"section":"Year 1","name":"Waves"},
{"section":"Year 1","name":"Mechanics: motion and forces"},
{"section":"Year 1","name":"Mechanics: work, energy and power"},
{"section":"Year 1","name":"Materials"},
{"section":"Year 1","name":"Electricity"},
{"section":"Year 2","name":"Thermal physics"},
{"section":"Year 2","name":"Further mechanics: circular motion"},
{"section":"Year 2","name":"Further mechanics: simple harmonic motion"},
{"section":"Year 2","name":"Electric fields"},
{"section":"Year 2","name":"Capacitors"},
{"section":"Year 2","name":"Magnetic fields"},
{"section":"Year 2","name":"Electromagnetic induction"},
{"section":"Year 2","name":"Radioactivity and nuclear physics"},
{"section":"Year 2","name":"Nuclear energy"},
{"section":"Option","name":"Astrophysics (or selected option)"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','Chemistry',NULL,'[
{"section":"Year 1","name":"Atomic structure"},
{"section":"Year 1","name":"Amount of substance"},
{"section":"Year 1","name":"Bonding"},
{"section":"Year 1","name":"Energetics"},
{"section":"Year 1","name":"Kinetics"},
{"section":"Year 1","name":"Equilibria"},
{"section":"Year 1","name":"Redox reactions"},
{"section":"Year 1","name":"Periodicity"},
{"section":"Year 1","name":"Group 2 elements"},
{"section":"Year 1","name":"Group 7 elements (halogens)"},
{"section":"Year 1","name":"Introduction to organic chemistry"},
{"section":"Year 1","name":"Alkanes"},
{"section":"Year 1","name":"Halogenoalkanes"},
{"section":"Year 1","name":"Alkenes"},
{"section":"Year 1","name":"Alcohols"},
{"section":"Year 1","name":"Organic analysis"},
{"section":"Year 2","name":"Thermodynamics (entropy and Gibbs energy)"},
{"section":"Year 2","name":"Rate equations and kinetics"},
{"section":"Year 2","name":"Equilibrium constant Kp"},
{"section":"Year 2","name":"Electrode potentials and electrochemical cells"},
{"section":"Year 2","name":"Acids, bases and buffers"},
{"section":"Year 2","name":"Period 3 elements and their oxides"},
{"section":"Year 2","name":"Transition metals"},
{"section":"Year 2","name":"Reactions of ions in aqueous solution"},
{"section":"Year 2","name":"Optical isomerism"},
{"section":"Year 2","name":"Aldehydes and ketones"},
{"section":"Year 2","name":"Carboxylic acids and derivatives"},
{"section":"Year 2","name":"Aromatic chemistry"},
{"section":"Year 2","name":"Amines"},
{"section":"Year 2","name":"Polymers"},
{"section":"Year 2","name":"Amino acids, proteins and DNA"},
{"section":"Year 2","name":"Organic synthesis and analysis"},
{"section":"Year 2","name":"NMR and chromatography"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','Biology',NULL,'[
{"section":"Year 1","name":"Biological molecules"},
{"section":"Year 1","name":"DNA, genes and chromosomes"},
{"section":"Year 1","name":"Cell structure"},
{"section":"Year 1","name":"Cell membranes and transport"},
{"section":"Year 1","name":"Cell division and growth"},
{"section":"Year 1","name":"Immunity"},
{"section":"Year 1","name":"Exchange surfaces and breathing"},
{"section":"Year 1","name":"Transport in animals"},
{"section":"Year 1","name":"Transport in plants"},
{"section":"Year 2","name":"Photosynthesis"},
{"section":"Year 2","name":"Respiration"},
{"section":"Year 2","name":"Neuronal communication"},
{"section":"Year 2","name":"Hormonal communication"},
{"section":"Year 2","name":"Homeostasis"},
{"section":"Year 2","name":"Inheritance, variation and evolution"},
{"section":"Year 2","name":"Recombinant DNA technology"},
{"section":"Year 2","name":"Ecosystems"},
{"section":"Year 2","name":"Populations and sustainability"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','Economics A',NULL,'[
{"section":"Microeconomics","name":"Introduction to markets and market failure"},
{"section":"Microeconomics","name":"How competitive markets work"},
{"section":"Microeconomics","name":"Business economics and the labour market"},
{"section":"Microeconomics","name":"Market failure and government intervention"},
{"section":"Macroeconomics","name":"The UK macroeconomy — measures and performance"},
{"section":"Macroeconomics","name":"Aggregate demand and aggregate supply"},
{"section":"Macroeconomics","name":"Economic policy — fiscal and monetary"},
{"section":"Macroeconomics","name":"Supply-side policies"},
{"section":"Global Economics","name":"International economics and trade"},
{"section":"Global Economics","name":"Balance of payments and exchange rates"},
{"section":"Global Economics","name":"Poverty, inequality and development"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','Business',NULL,'[
{"section":"Year 1","name":"Meeting customer needs"},
{"section":"Year 1","name":"The market"},
{"section":"Year 1","name":"Marketing mix and strategy"},
{"section":"Year 1","name":"Managing people"},
{"section":"Year 1","name":"Entrepreneurs and leaders"},
{"section":"Year 1","name":"Raising finance"},
{"section":"Year 1","name":"Financial planning"},
{"section":"Year 1","name":"Managing finance"},
{"section":"Year 1","name":"Business operations"},
{"section":"Year 1","name":"External influences on business"},
{"section":"Year 2","name":"Strategic direction and choices"},
{"section":"Year 2","name":"Marketing and competitive strategy"},
{"section":"Year 2","name":"Managing resources and operations"},
{"section":"Year 2","name":"Financial strategies"},
{"section":"Year 2","name":"Managing people and change"},
{"section":"Year 2","name":"Business ethics and corporate social responsibility"},
{"section":"Year 2","name":"Global business"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','Psychology',NULL,'[
{"section":"Social Psychology","name":"Social influence"},
{"section":"Social Psychology","name":"Conformity and obedience"},
{"section":"Cognitive Psychology","name":"Memory models and types"},
{"section":"Cognitive Psychology","name":"Forgetting and eyewitness testimony"},
{"section":"Psychopathology","name":"Definitions of abnormality"},
{"section":"Psychopathology","name":"Depression, phobias and OCD"},
{"section":"Biological Psychology","name":"Biopsychology and the brain"},
{"section":"Biological Psychology","name":"Sleep and biological rhythms"},
{"section":"Research Methods","name":"Scientific method and ethics"},
{"section":"Research Methods","name":"Research design and data analysis"},
{"section":"Issues and Debates","name":"Gender bias and cultural bias"},
{"section":"Issues and Debates","name":"Nature vs nurture, free will vs determinism"},
{"section":"Year 2 Topics","name":"Relationships (Bowlby, attachment)"},
{"section":"Year 2 Topics","name":"Schizophrenia — symptoms and treatments"},
{"section":"Year 2 Topics","name":"Addiction — models and interventions"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','Accounting',NULL,'[
{"section":"Financial Accounting","name":"The purpose and role of accounting"},
{"section":"Financial Accounting","name":"Double-entry bookkeeping"},
{"section":"Financial Accounting","name":"Accounting equation and trial balance"},
{"section":"Financial Accounting","name":"Preparing financial statements (sole trader)"},
{"section":"Financial Accounting","name":"Partnership accounts"},
{"section":"Financial Accounting","name":"Company accounts and limited liability"},
{"section":"Financial Accounting","name":"Interpretation of financial statements (ratios)"},
{"section":"Financial Accounting","name":"Accounting concepts and regulatory framework"},
{"section":"Cost and Management","name":"Cost classification and behaviour"},
{"section":"Cost and Management","name":"Budgeting and budgetary control"},
{"section":"Cost and Management","name":"Standard costing and variance analysis"},
{"section":"Cost and Management","name":"Investment appraisal techniques"},
{"section":"Cost and Management","name":"Marginal costing and break-even analysis"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','English Language',NULL,'[
{"section":"Language and Self","name":"Language acquisition (child language development)"},
{"section":"Language and Self","name":"Language and gender"},
{"section":"Language and Self","name":"Language and identity"},
{"section":"Language Variation","name":"Accent, dialect and sociolects"},
{"section":"Language Variation","name":"Language change over time"},
{"section":"Language Variation","name":"World Englishes and global spread"},
{"section":"Textual Analysis","name":"Analysing spoken language features"},
{"section":"Textual Analysis","name":"Analysing written language features"},
{"section":"Textual Analysis","name":"Multimodal texts"},
{"section":"Language in Use","name":"Language in the media"},
{"section":"Language in Use","name":"Language and power"},
{"section":"Original Writing","name":"Creative writing and commentary"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','English Literature',NULL,'[
{"section":"Poetry","name":"Poetry before 1900"},
{"section":"Poetry","name":"Poetry from 1945 to present"},
{"section":"Poetry","name":"Comparative poetry analysis"},
{"section":"Drama","name":"Shakespeare — set play"},
{"section":"Drama","name":"Modern drama set text"},
{"section":"Prose","name":"19th century prose set text"},
{"section":"Prose","name":"Modern prose set text"},
{"section":"Prose","name":"Contextual reading"},
{"section":"Prose","name":"Comparative essay skills"},
{"section":"Literary Theory","name":"Introduction to literary criticism"},
{"section":"Independent Study","name":"Coursework — independent critical study"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','History',NULL,'[
{"section":"Period Study","name":"Henry VIII and the government of England"},
{"section":"Period Study","name":"The mid-Tudor crisis (1547–1558)"},
{"section":"Period Study","name":"Elizabeth I and the Church"},
{"section":"Period Study","name":"The union of the crowns"},
{"section":"Depth Study","name":"Russia in revolution (1917–1924)"},
{"section":"Depth Study","name":"Stalinist Russia (1924–1953)"},
{"section":"Thematic Study","name":"Protest, agitation and parliamentary reform in Britain"},
{"section":"Thematic Study","name":"The extension of the franchise"},
{"section":"Historical Investigation","name":"Coursework: historical enquiry"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','Geography',NULL,'[
{"section":"Physical Geography","name":"Tectonic processes and hazards"},
{"section":"Physical Geography","name":"Landscape systems: coasts or rivers"},
{"section":"Physical Geography","name":"The water cycle and water insecurity"},
{"section":"Physical Geography","name":"The carbon cycle and energy security"},
{"section":"Physical Geography","name":"Climate change: past and present"},
{"section":"Human Geography","name":"Globalisation"},
{"section":"Human Geography","name":"Shaping places: regenerating places"},
{"section":"Human Geography","name":"Superpowers"},
{"section":"Human Geography","name":"Health, human rights and intervention"},
{"section":"Skills","name":"Geographical skills and fieldwork"},
{"section":"Skills","name":"Synoptic themes"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','Sociology',NULL,'[
{"section":"Beliefs","name":"Education — structure, policy and inequality"},
{"section":"Beliefs","name":"Education — sociological perspectives and debates"},
{"section":"Beliefs","name":"Religion and ideology"},
{"section":"Beliefs","name":"Secularisation and globalisation of religion"},
{"section":"Crime & Deviance","name":"Functionalist, strain and subcultural theories"},
{"section":"Crime & Deviance","name":"Interactionist and Marxist theories"},
{"section":"Crime & Deviance","name":"Gender, crime and justice"},
{"section":"Crime & Deviance","name":"Control, punishment and victims"},
{"section":"Theory and Methods","name":"Sociological theory (consensus and conflict)"},
{"section":"Theory and Methods","name":"Research methods — quantitative and qualitative"},
{"section":"Theory and Methods","name":"Research methods — application and evaluation"},
{"section":"Global Development","name":"Global development and underdevelopment"},
{"section":"Global Development","name":"Aid, trade and global institutions"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','Law',NULL,'[
{"section":"The English Legal System","name":"Sources of law: legislation and precedent"},
{"section":"The English Legal System","name":"The court hierarchy and appeals"},
{"section":"The English Legal System","name":"Personnel of the law"},
{"section":"The English Legal System","name":"Access to justice and ADR"},
{"section":"Criminal Law","name":"Actus reus and mens rea"},
{"section":"Criminal Law","name":"Fatal offences against the person"},
{"section":"Criminal Law","name":"Non-fatal offences against the person"},
{"section":"Criminal Law","name":"Defences"},
{"section":"Criminal Law","name":"Property offences"},
{"section":"Tort Law","name":"Negligence"},
{"section":"Tort Law","name":"Occupiers'' liability"},
{"section":"Tort Law","name":"Nuisance and Rylands v Fletcher"},
{"section":"Tort Law","name":"Remedies"},
{"section":"Legal Concepts","name":"Law and morality"},
{"section":"Legal Concepts","name":"Law and justice"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','Politics',NULL,'[
{"section":"UK Politics","name":"Democracy and participation"},
{"section":"UK Politics","name":"Political parties"},
{"section":"UK Politics","name":"Electoral systems and voting behaviour"},
{"section":"UK Government","name":"The constitution"},
{"section":"UK Government","name":"Parliament"},
{"section":"UK Government","name":"The executive (PM and cabinet)"},
{"section":"UK Government","name":"The judiciary"},
{"section":"UK Government","name":"Devolution"},
{"section":"Global Politics","name":"Theories of international relations"},
{"section":"Global Politics","name":"Global governance"},
{"section":"Global Politics","name":"Power and developments"},
{"section":"Political Ideas","name":"Liberalism"},
{"section":"Political Ideas","name":"Conservatism"},
{"section":"Political Ideas","name":"Socialism"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','Computer Science',NULL,'[
{"section":"Programming","name":"Data types, structures and algorithms"},
{"section":"Programming","name":"Programming paradigms (OOP, procedural, functional)"},
{"section":"Programming","name":"File handling and I/O"},
{"section":"Algorithms","name":"Searching and sorting algorithms"},
{"section":"Algorithms","name":"Big-O notation and algorithm analysis"},
{"section":"Algorithms","name":"Graph and tree algorithms"},
{"section":"Computer Systems","name":"Boolean algebra and logic gates"},
{"section":"Computer Systems","name":"Computer architecture (CPU, memory, fetch-execute)"},
{"section":"Computer Systems","name":"Operating systems and virtual machines"},
{"section":"Computer Systems","name":"Networks, protocols and security"},
{"section":"Data","name":"Databases and SQL"},
{"section":"Data","name":"Data representation (binary, hex, floating point)"},
{"section":"Theory","name":"Finite state machines and regular expressions"},
{"section":"Theory","name":"Turing machines and the halting problem"},
{"section":"Theory","name":"Context-free languages"},
{"section":"Theory","name":"Classifying algorithms (tractable/intractable)"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','Art & Design',NULL,'[
{"section":"Year 1","name":"Observational drawing and mark-making"},
{"section":"Year 1","name":"Contextual references and artist research"},
{"section":"Year 1","name":"Experimentation with media and materials"},
{"section":"Year 1","name":"Design development process"},
{"section":"Year 1","name":"Critical analysis and annotation"},
{"section":"Year 2","name":"Personal investigation — proposal and rationale"},
{"section":"Year 2","name":"Personal investigation — practical development"},
{"section":"Year 2","name":"Written component (critical and contextual study)"},
{"section":"Year 2","name":"Externally set assignment preparation"},
{"section":"Year 2","name":"Externally set assignment — final response"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','Physical Education',NULL,'[
{"section":"Physical Factors","name":"Applied anatomy and physiology"},
{"section":"Physical Factors","name":"Exercise physiology"},
{"section":"Physical Factors","name":"Biomechanical principles"},
{"section":"Physical Factors","name":"Sport psychology — skill acquisition"},
{"section":"Physical Factors","name":"Sport psychology — motivation and arousal"},
{"section":"Socio-Cultural","name":"Sport and society"},
{"section":"Socio-Cultural","name":"Contemporary issues in sport"},
{"section":"Socio-Cultural","name":"Sport and the media"},
{"section":"Socio-Cultural","name":"Ethics in sport"},
{"section":"Performance","name":"Practical performance (chosen activity)"},
{"section":"Performance","name":"Evaluating and improving performance (EIP)"}
]'::jsonb, NULL),

('A Level','Edexcel','edexcel_alevel','Music',NULL,'[
{"section":"Listening","name":"Instrumental music — Baroque, Classical, Romantic"},
{"section":"Listening","name":"Vocal music and choral works"},
{"section":"Listening","name":"Music for film"},
{"section":"Listening","name":"Popular music and jazz"},
{"section":"Harmony","name":"Tonal harmony — diatonic chords and cadences"},
{"section":"Harmony","name":"Chromatic harmony and modulation"},
{"section":"Harmony","name":"20th-century techniques"},
{"section":"Composition","name":"Composition brief 1 — free composition"},
{"section":"Composition","name":"Composition brief 2 — stylistic composition"},
{"section":"Performance","name":"Solo performance preparation"},
{"section":"Performance","name":"Ensemble performance"}
]'::jsonb, NULL),

-- ============================================================
-- A LEVEL · CAMBRIDGE (CIE)
-- ============================================================

('A Level','Cambridge','cambridge_alevel','Mathematics',NULL,'[
{"section":"Pure 1","name":"Quadratics"},
{"section":"Pure 1","name":"Functions and transformations"},
{"section":"Pure 1","name":"Coordinate geometry"},
{"section":"Pure 1","name":"Circular measure"},
{"section":"Pure 1","name":"Trigonometry"},
{"section":"Pure 1","name":"Vectors"},
{"section":"Pure 1","name":"Series (AP and GP, binomial)"},
{"section":"Pure 1","name":"Differentiation"},
{"section":"Pure 1","name":"Integration"},
{"section":"Pure 2","name":"Algebra (factor theorem, partial fractions)"},
{"section":"Pure 2","name":"Logarithmic and exponential functions"},
{"section":"Pure 2","name":"Trigonometry (addition formulae, R sin/cos)"},
{"section":"Pure 2","name":"Differentiation (implicit, parametric, chain rule)"},
{"section":"Pure 2","name":"Integration techniques (by parts, substitution)"},
{"section":"Pure 2","name":"Differential equations"},
{"section":"Pure 2","name":"Numerical methods"},
{"section":"Pure 3","name":"Polynomials and rational functions"},
{"section":"Pure 3","name":"Further differentiation and integration"},
{"section":"Pure 3","name":"Complex numbers"},
{"section":"Pure 3","name":"Vectors in 3D"},
{"section":"Probability & Statistics 1","name":"Representation of data"},
{"section":"Probability & Statistics 1","name":"Permutations and combinations"},
{"section":"Probability & Statistics 1","name":"Probability"},
{"section":"Probability & Statistics 1","name":"Discrete random variables"},
{"section":"Probability & Statistics 1","name":"Normal distribution"},
{"section":"Mechanics","name":"Forces and equilibrium"},
{"section":"Mechanics","name":"Kinematics of motion in a straight line"},
{"section":"Mechanics","name":"Newton''s laws of motion"},
{"section":"Mechanics","name":"Energy, work and power"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','Further Mathematics',NULL,'[
{"section":"Further Pure 1","name":"Matrices and transformations"},
{"section":"Further Pure 1","name":"Complex numbers"},
{"section":"Further Pure 1","name":"Roots of polynomial equations"},
{"section":"Further Pure 1","name":"Proof by induction"},
{"section":"Further Pure 1","name":"Series and summation"},
{"section":"Further Pure 2","name":"Hyperbolic functions"},
{"section":"Further Pure 2","name":"Polar coordinates"},
{"section":"Further Pure 2","name":"Further differential equations"},
{"section":"Further Pure 2","name":"Maclaurin series"},
{"section":"Further Probability & Statistics","name":"Continuous random variables"},
{"section":"Further Probability & Statistics","name":"Poisson distribution"},
{"section":"Further Probability & Statistics","name":"Chi-squared tests"},
{"section":"Further Probability & Statistics","name":"Hypothesis testing"},
{"section":"Further Mechanics","name":"Work, energy and power (advanced)"},
{"section":"Further Mechanics","name":"Circular motion"},
{"section":"Further Mechanics","name":"Elastic strings and Hooke''s law"},
{"section":"Further Mechanics","name":"Impulse and momentum"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','Physics',NULL,'[
{"section":"Year 1","name":"Physical quantities and units"},
{"section":"Year 1","name":"Kinematics"},
{"section":"Year 1","name":"Dynamics"},
{"section":"Year 1","name":"Forces, density and pressure"},
{"section":"Year 1","name":"Work, energy and power"},
{"section":"Year 1","name":"Deformation of solids"},
{"section":"Year 1","name":"Waves"},
{"section":"Year 1","name":"Superposition"},
{"section":"Year 1","name":"Electricity"},
{"section":"Year 1","name":"D.C. circuits"},
{"section":"Year 1","name":"Particle physics"},
{"section":"Year 2","name":"Thermal physics"},
{"section":"Year 2","name":"Circular motion"},
{"section":"Year 2","name":"Gravitational fields"},
{"section":"Year 2","name":"Temperature and ideal gases"},
{"section":"Year 2","name":"Oscillations"},
{"section":"Year 2","name":"Electric fields"},
{"section":"Year 2","name":"Capacitors"},
{"section":"Year 2","name":"Magnetic fields and electromagnetic induction"},
{"section":"Year 2","name":"Alternating currents"},
{"section":"Year 2","name":"Quantum physics"},
{"section":"Year 2","name":"Nuclear physics"},
{"section":"Year 2","name":"Medical imaging (or option)"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','Chemistry',NULL,'[
{"section":"Physical","name":"Atoms, molecules and stoichiometry"},
{"section":"Physical","name":"Atomic structure"},
{"section":"Physical","name":"Chemical bonding"},
{"section":"Physical","name":"States of matter"},
{"section":"Physical","name":"Chemical energetics (thermochemistry)"},
{"section":"Physical","name":"Electrochemistry"},
{"section":"Physical","name":"Equilibria (Kc, Kp, Kw)"},
{"section":"Physical","name":"Reaction kinetics"},
{"section":"Inorganic","name":"The Periodic Table (overview)"},
{"section":"Inorganic","name":"Group 2 — alkaline earth metals"},
{"section":"Inorganic","name":"Group 17 — halogens"},
{"section":"Inorganic","name":"Period 3 chemistry"},
{"section":"Inorganic","name":"Transition elements"},
{"section":"Organic","name":"Introduction to organic chemistry"},
{"section":"Organic","name":"Hydrocarbons"},
{"section":"Organic","name":"Halogen derivatives"},
{"section":"Organic","name":"Hydroxy compounds"},
{"section":"Organic","name":"Carbonyl compounds"},
{"section":"Organic","name":"Carboxylic acids and derivatives"},
{"section":"Organic","name":"Nitrogen compounds"},
{"section":"Organic","name":"Polymerisation"},
{"section":"Organic","name":"Organic synthesis"},
{"section":"Organic","name":"Spectroscopic techniques"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','Biology',NULL,'[
{"section":"Cell Biology","name":"Cell structure"},
{"section":"Cell Biology","name":"Biological molecules"},
{"section":"Cell Biology","name":"Enzymes"},
{"section":"Cell Biology","name":"Cell membranes and transport"},
{"section":"Cell Biology","name":"Mitosis and the cell cycle"},
{"section":"Cell Biology","name":"Nucleic acids and protein synthesis"},
{"section":"Physiology","name":"Transport in plants"},
{"section":"Physiology","name":"Transport in animals (circulatory system)"},
{"section":"Physiology","name":"Gas exchange"},
{"section":"Physiology","name":"Excretion"},
{"section":"Physiology","name":"Immunity"},
{"section":"Control","name":"Homeostasis"},
{"section":"Control","name":"Coordination — nervous system"},
{"section":"Control","name":"Coordination — hormones"},
{"section":"Genetics & Evolution","name":"Inheritance (Mendelian and extensions)"},
{"section":"Genetics & Evolution","name":"Selection and evolution"},
{"section":"Genetics & Evolution","name":"Biodiversity and conservation"},
{"section":"Ecology","name":"Ecology and ecosystems"},
{"section":"Biotechnology","name":"Gene technology and biotechnology"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','Economics',NULL,'[
{"section":"Microeconomics","name":"The price system and the theory of the firm"},
{"section":"Microeconomics","name":"Government microeconomic intervention"},
{"section":"Microeconomics","name":"Factor markets and income distribution"},
{"section":"Macroeconomics","name":"Macroeconomic performance indicators"},
{"section":"Macroeconomics","name":"Aggregate demand and supply"},
{"section":"Macroeconomics","name":"Economic policy objectives and conflicts"},
{"section":"Macroeconomics","name":"Fiscal and monetary policies"},
{"section":"International Economics","name":"International trade and trade policy"},
{"section":"International Economics","name":"Exchange rates and balance of payments"},
{"section":"Development Economics","name":"Measures of development"},
{"section":"Development Economics","name":"Factors influencing development"},
{"section":"Development Economics","name":"Development policies and strategies"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','Business',NULL,'[
{"section":"Year 1","name":"Business and its environment"},
{"section":"Year 1","name":"People in organisations"},
{"section":"Year 1","name":"Marketing"},
{"section":"Year 1","name":"Operations and project management"},
{"section":"Year 1","name":"Finance and accounting"},
{"section":"Year 2","name":"Business strategy"},
{"section":"Year 2","name":"Human resource management"},
{"section":"Year 2","name":"Marketing (A Level extension)"},
{"section":"Year 2","name":"Operations management (A Level extension)"},
{"section":"Year 2","name":"Finance (A Level extension)"},
{"section":"Year 2","name":"Organisational behaviour and leadership"},
{"section":"Year 2","name":"Strategic management in a global context"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','Accounting',NULL,'[
{"section":"Financial Accounting","name":"The accounting framework"},
{"section":"Financial Accounting","name":"Recording financial transactions"},
{"section":"Financial Accounting","name":"Sole trader financial statements"},
{"section":"Financial Accounting","name":"Partnership accounts"},
{"section":"Financial Accounting","name":"Company accounts (limited companies)"},
{"section":"Financial Accounting","name":"Published financial statements and analysis"},
{"section":"Financial Accounting","name":"Non-profit organisations accounts"},
{"section":"Cost Accounting","name":"Costing methods (marginal and absorption)"},
{"section":"Cost Accounting","name":"Budgeting and budget variance"},
{"section":"Cost Accounting","name":"Standard costing and variance analysis"},
{"section":"Cost Accounting","name":"Investment appraisal"},
{"section":"Regulation","name":"Internal audit and control"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','Sociology',NULL,'[
{"section":"Socialisation","name":"The individual and society"},
{"section":"Socialisation","name":"Identity, culture and socialisation"},
{"section":"Institutions","name":"Family and households"},
{"section":"Institutions","name":"Education"},
{"section":"Institutions","name":"Religion"},
{"section":"Institutions","name":"Mass media"},
{"section":"Inequality","name":"Social stratification and inequality"},
{"section":"Inequality","name":"Gender"},
{"section":"Inequality","name":"Race, ethnicity and nationality"},
{"section":"Crime","name":"Crime and deviance"},
{"section":"Theory","name":"Sociological theories and perspectives"},
{"section":"Theory","name":"Sociological research methods"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','History',NULL,'[
{"section":"Modern World","name":"The Cold War in Asia (1945–1993)"},
{"section":"Modern World","name":"Communism in Crisis (1976–1989)"},
{"section":"Modern World","name":"The move to global confrontation (1930–1941)"},
{"section":"Modern World","name":"Nationalism and independence in India (1919–1964)"},
{"section":"Depth Study","name":"The origins and development of the Civil Rights movement"},
{"section":"Depth Study","name":"Stalin''s USSR"},
{"section":"Historical Enquiry","name":"Coursework historical investigation"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','Geography',NULL,'[
{"section":"Physical","name":"Hydrology and fluvial geomorphology"},
{"section":"Physical","name":"Atmosphere and weather"},
{"section":"Physical","name":"Coastal environments"},
{"section":"Physical","name":"Hazardous environments"},
{"section":"Physical","name":"Hot arid and semi-arid environments"},
{"section":"Human","name":"Population and migration"},
{"section":"Human","name":"Settlement dynamics"},
{"section":"Human","name":"Economic transition"},
{"section":"Human","name":"Global interdependence"},
{"section":"Human","name":"Environmental management"},
{"section":"Skills","name":"Research, skills and fieldwork investigation"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','English Language',NULL,'[
{"section":"Description and Narrative","name":"Key concepts of language"},
{"section":"Description and Narrative","name":"Text analysis — written and spoken"},
{"section":"Description and Narrative","name":"Producing texts for different audiences"},
{"section":"Varieties","name":"Variation in language (social, regional)"},
{"section":"Varieties","name":"Language change over time"},
{"section":"Varieties","name":"World Englishes"},
{"section":"Coursework","name":"Language investigation"},
{"section":"Coursework","name":"Directed writing task"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','English Literature',NULL,'[
{"section":"Poetry","name":"Pre-20th century poetry anthology"},
{"section":"Poetry","name":"Post-2000 poetry"},
{"section":"Drama","name":"Shakespeare — set play"},
{"section":"Drama","name":"Modern drama or tragedy"},
{"section":"Prose","name":"19th century novel"},
{"section":"Prose","name":"Post-colonial or world literature"},
{"section":"Coursework","name":"Independent comparative study"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','Law',NULL,'[
{"section":"Legal System","name":"Sources of law"},
{"section":"Legal System","name":"Courts and the legal profession"},
{"section":"Legal System","name":"Statutory interpretation"},
{"section":"Legal System","name":"The doctrine of precedent"},
{"section":"Criminal Law","name":"Elements of a crime"},
{"section":"Criminal Law","name":"Homicide"},
{"section":"Criminal Law","name":"Defences"},
{"section":"Criminal Law","name":"Non-fatal offences"},
{"section":"Contract Law","name":"Formation of a contract"},
{"section":"Contract Law","name":"Terms of a contract"},
{"section":"Contract Law","name":"Breach and remedies"},
{"section":"Tort Law","name":"Negligence and duty of care"},
{"section":"Jurisprudence","name":"Natural law and positivism"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','Computer Science',NULL,'[
{"section":"Theory of Computation","name":"Data representation"},
{"section":"Theory of Computation","name":"Communication and networking"},
{"section":"Theory of Computation","name":"Hardware and software"},
{"section":"Theory of Computation","name":"Boolean algebra and logic"},
{"section":"Theory of Computation","name":"Processor architecture"},
{"section":"Theory of Computation","name":"Operating systems"},
{"section":"Theory of Computation","name":"Security and privacy"},
{"section":"Theory of Computation","name":"Databases and SQL"},
{"section":"Programming","name":"Programming concepts and syntax"},
{"section":"Programming","name":"Algorithms — searching and sorting"},
{"section":"Programming","name":"Recursion and stacks"},
{"section":"Programming","name":"Object-oriented programming"},
{"section":"Programming","name":"File handling"},
{"section":"Advanced Theory","name":"Computational thinking and problem-solving"},
{"section":"Advanced Theory","name":"Formal languages and automata"},
{"section":"Project","name":"Programming project (A Level only)"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','Psychology',NULL,'[
{"section":"Research Methods","name":"Research methods and data analysis"},
{"section":"Core Studies","name":"Biological approach"},
{"section":"Core Studies","name":"Cognitive approach"},
{"section":"Core Studies","name":"Developmental approach"},
{"section":"Core Studies","name":"Social approach"},
{"section":"Applications","name":"Criminological psychology"},
{"section":"Applications","name":"Sport and exercise psychology"},
{"section":"Applications","name":"Health psychology"},
{"section":"Applications","name":"Clinical psychology"},
{"section":"Issues & Debates","name":"Psychology and ethics"},
{"section":"Issues & Debates","name":"Cultural and gender issues"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','Physical Education',NULL,'[
{"section":"Sport Science","name":"Anatomy and physiology"},
{"section":"Sport Science","name":"Exercise physiology and training"},
{"section":"Sport Science","name":"Biomechanics"},
{"section":"Psychology","name":"Psychology of sport"},
{"section":"Psychology","name":"Skill acquisition and feedback"},
{"section":"Socio-Cultural","name":"Sport and society"},
{"section":"Socio-Cultural","name":"Globalisation and sport"},
{"section":"Performance","name":"Practical performance"},
{"section":"Performance","name":"Oral response and evaluation"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','Music',NULL,'[
{"section":"Listening","name":"Musical concepts and vocabulary"},
{"section":"Listening","name":"Western tonal harmony (1600–1900)"},
{"section":"Listening","name":"20th and 21st century music"},
{"section":"Listening","name":"Music of a contrasting world culture"},
{"section":"Harmony","name":"Bach chorales and four-part writing"},
{"section":"Harmony","name":"Melodic composition"},
{"section":"Composition","name":"Free composition"},
{"section":"Composition","name":"Compositional techniques (set brief)"},
{"section":"Performance","name":"Recital performance — two contrasting pieces"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','Art & Design',NULL,'[
{"section":"Component 1","name":"Portfolio — personal study in chosen area"},
{"section":"Component 1","name":"Research and contextual sources"},
{"section":"Component 1","name":"Idea development and experimentation"},
{"section":"Component 1","name":"Final outcome and personal response"},
{"section":"Component 2","name":"Externally set assignment"},
{"section":"Component 2","name":"Preparatory study period"},
{"section":"Component 2","name":"Final examination response (supervised)"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','Travel & Tourism',NULL,'[
{"section":"Core","name":"The travel and tourism environment"},
{"section":"Core","name":"Tourism development and impacts"},
{"section":"Core","name":"Tourism planning and management"},
{"section":"Core","name":"Marketing in travel and tourism"},
{"section":"Core","name":"Customer service in travel and tourism"},
{"section":"Advanced","name":"Managing the visitor experience"},
{"section":"Advanced","name":"Responsible tourism"},
{"section":"Advanced","name":"Adventure tourism"},
{"section":"Advanced","name":"Heritage and cultural tourism"},
{"section":"Investigation","name":"Research and investigation (coursework)"}
]'::jsonb, NULL),

('A Level','Cambridge','cambridge_alevel','Marine Science',NULL,'[
{"section":"Oceanography","name":"The oceans — physical features and properties"},
{"section":"Oceanography","name":"Ocean circulation and tides"},
{"section":"Oceanography","name":"Waves and coastal processes"},
{"section":"Marine Ecology","name":"Marine ecosystems and food webs"},
{"section":"Marine Ecology","name":"Coral reefs and their threats"},
{"section":"Marine Ecology","name":"Deep-sea environments"},
{"section":"Marine Ecology","name":"Mangroves and seagrass beds"},
{"section":"Resources","name":"Fisheries and aquaculture"},
{"section":"Resources","name":"Marine energy and mineral resources"},
{"section":"Pollution","name":"Marine pollution — types and impacts"},
{"section":"Pollution","name":"Climate change and ocean acidification"},
{"section":"Conservation","name":"Marine protected areas and conservation strategies"},
{"section":"Skills","name":"Fieldwork and data analysis"}
]'::jsonb, NULL),

-- ============================================================
-- AS LEVEL · EDEXCEL
-- ============================================================

('AS Level','Edexcel','edexcel_alevel','Mathematics',NULL,'[
{"section":"Pure","name":"Algebra and functions"},
{"section":"Pure","name":"Coordinate geometry"},
{"section":"Pure","name":"Further algebra"},
{"section":"Pure","name":"Trigonometry"},
{"section":"Pure","name":"Exponentials and logarithms"},
{"section":"Pure","name":"Differentiation"},
{"section":"Pure","name":"Integration"},
{"section":"Pure","name":"Vectors"},
{"section":"Statistics","name":"Statistical sampling"},
{"section":"Statistics","name":"Data presentation"},
{"section":"Statistics","name":"Probability and distributions"},
{"section":"Mechanics","name":"Kinematics"},
{"section":"Mechanics","name":"Forces and Newton''s laws"}
]'::jsonb, NULL),

('AS Level','Edexcel','edexcel_alevel','Physics',NULL,'[
{"section":"Year 1","name":"Measurements and their errors"},
{"section":"Year 1","name":"Particles and radiation"},
{"section":"Year 1","name":"Waves"},
{"section":"Year 1","name":"Mechanics — motion and forces"},
{"section":"Year 1","name":"Mechanics — work, energy and power"},
{"section":"Year 1","name":"Materials"},
{"section":"Year 1","name":"Electricity"}
]'::jsonb, NULL),

('AS Level','Edexcel','edexcel_alevel','Chemistry',NULL,'[
{"section":"Physical","name":"Atomic structure"},
{"section":"Physical","name":"Amount of substance"},
{"section":"Physical","name":"Bonding"},
{"section":"Physical","name":"Energetics"},
{"section":"Physical","name":"Kinetics"},
{"section":"Physical","name":"Equilibria"},
{"section":"Physical","name":"Redox reactions"},
{"section":"Inorganic","name":"Periodicity"},
{"section":"Inorganic","name":"Group 2"},
{"section":"Inorganic","name":"Group 7 (halogens)"},
{"section":"Organic","name":"Introduction to organic chemistry"},
{"section":"Organic","name":"Alkanes and halogenoalkanes"},
{"section":"Organic","name":"Alkenes and alcohols"}
]'::jsonb, NULL),

('AS Level','Edexcel','edexcel_alevel','Biology',NULL,'[
{"section":"Core","name":"Biological molecules"},
{"section":"Core","name":"DNA, genes and chromosomes"},
{"section":"Core","name":"Cell structure"},
{"section":"Core","name":"Cell membranes and transport"},
{"section":"Core","name":"Cell division (mitosis)"},
{"section":"Core","name":"Immunity"},
{"section":"Core","name":"Exchange surfaces and breathing"},
{"section":"Core","name":"Transport in animals"},
{"section":"Core","name":"Transport in plants"}
]'::jsonb, NULL),

('AS Level','Edexcel','edexcel_alevel','Economics',NULL,'[
{"section":"Microeconomics","name":"Introduction to markets"},
{"section":"Microeconomics","name":"Market failure"},
{"section":"Macroeconomics","name":"Macroeconomic performance"},
{"section":"Macroeconomics","name":"Aggregate demand and supply"},
{"section":"Macroeconomics","name":"Economic policy"}
]'::jsonb, NULL),

('AS Level','Edexcel','edexcel_alevel','Business',NULL,'[
{"section":"Core","name":"Meeting customer needs"},
{"section":"Core","name":"The market"},
{"section":"Core","name":"Marketing mix"},
{"section":"Core","name":"Managing people"},
{"section":"Core","name":"Raising finance"},
{"section":"Core","name":"Financial planning"},
{"section":"Core","name":"Managing finance"},
{"section":"Core","name":"Business operations"},
{"section":"Core","name":"External influences on business"}
]'::jsonb, NULL),

('AS Level','Edexcel','edexcel_alevel','Psychology',NULL,'[
{"section":"Social","name":"Social influence"},
{"section":"Cognitive","name":"Memory models and eyewitness testimony"},
{"section":"Psychopathology","name":"Definitions of abnormality and disorders"},
{"section":"Biological","name":"Biopsychology"},
{"section":"Research","name":"Research methods and statistics"}
]'::jsonb, NULL),

('AS Level','Edexcel','edexcel_alevel','Accounting',NULL,'[
{"section":"Financial","name":"The role of accounting"},
{"section":"Financial","name":"Double-entry bookkeeping"},
{"section":"Financial","name":"Trial balance and adjustments"},
{"section":"Financial","name":"Financial statements — sole trader"},
{"section":"Financial","name":"Financial statements — partnership"},
{"section":"Management","name":"Budgeting"},
{"section":"Management","name":"Marginal costing"}
]'::jsonb, NULL),

('AS Level','Edexcel','edexcel_alevel','English Language',NULL,'[
{"section":"Core","name":"Language acquisition"},
{"section":"Core","name":"Language and gender"},
{"section":"Core","name":"Variation in language"},
{"section":"Core","name":"Language change"},
{"section":"Core","name":"Textual analysis skills"},
{"section":"Core","name":"Production of texts"}
]'::jsonb, NULL),

('AS Level','Edexcel','edexcel_alevel','History',NULL,'[
{"section":"Period Study","name":"Henry VIII and the government of England"},
{"section":"Period Study","name":"Mid-Tudor crisis"},
{"section":"Period Study","name":"Elizabethan England"},
{"section":"Depth Study","name":"Russia in revolution (1917–1924)"}
]'::jsonb, NULL),

('AS Level','Edexcel','edexcel_alevel','Geography',NULL,'[
{"section":"Physical","name":"Tectonic processes and hazards"},
{"section":"Physical","name":"Landscape systems"},
{"section":"Human","name":"Globalisation"},
{"section":"Human","name":"Shaping places"},
{"section":"Skills","name":"Geographical skills and fieldwork"}
]'::jsonb, NULL),

('AS Level','Edexcel','edexcel_alevel','Sociology',NULL,'[
{"section":"Core","name":"Education"},
{"section":"Core","name":"Research methods"},
{"section":"Core","name":"Sociological theory"},
{"section":"Core","name":"Family"}
]'::jsonb, NULL),

('AS Level','Edexcel','edexcel_alevel','Computer Science',NULL,'[
{"section":"Theory","name":"Data representation"},
{"section":"Theory","name":"Computer architecture"},
{"section":"Theory","name":"Operating systems"},
{"section":"Theory","name":"Networks and protocols"},
{"section":"Programming","name":"Programming concepts"},
{"section":"Programming","name":"Algorithms"}
]'::jsonb, NULL),

-- ============================================================
-- AS LEVEL · CAMBRIDGE
-- ============================================================

('AS Level','Cambridge','cambridge_alevel','Mathematics',NULL,'[
{"section":"Pure 1","name":"Quadratics"},
{"section":"Pure 1","name":"Functions"},
{"section":"Pure 1","name":"Coordinate geometry"},
{"section":"Pure 1","name":"Circular measure"},
{"section":"Pure 1","name":"Trigonometry"},
{"section":"Pure 1","name":"Vectors"},
{"section":"Pure 1","name":"Series and binomial"},
{"section":"Pure 1","name":"Differentiation"},
{"section":"Pure 1","name":"Integration"},
{"section":"Statistics 1","name":"Representation of data"},
{"section":"Statistics 1","name":"Probability"},
{"section":"Statistics 1","name":"Discrete random variables"},
{"section":"Statistics 1","name":"Normal distribution"},
{"section":"Mechanics 1","name":"Forces and equilibrium"},
{"section":"Mechanics 1","name":"Kinematics in a straight line"},
{"section":"Mechanics 1","name":"Newton''s laws"}
]'::jsonb, NULL),

('AS Level','Cambridge','cambridge_alevel','Physics',NULL,'[
{"section":"Core","name":"Physical quantities and units"},
{"section":"Core","name":"Kinematics"},
{"section":"Core","name":"Dynamics"},
{"section":"Core","name":"Forces, density and pressure"},
{"section":"Core","name":"Work, energy and power"},
{"section":"Core","name":"Deformation of solids"},
{"section":"Core","name":"Waves"},
{"section":"Core","name":"Superposition"},
{"section":"Core","name":"Electricity"},
{"section":"Core","name":"D.C. circuits"},
{"section":"Core","name":"Particle physics"}
]'::jsonb, NULL),

('AS Level','Cambridge','cambridge_alevel','Chemistry',NULL,'[
{"section":"Physical","name":"Atoms, molecules and stoichiometry"},
{"section":"Physical","name":"Atomic structure"},
{"section":"Physical","name":"Bonding"},
{"section":"Physical","name":"States of matter"},
{"section":"Physical","name":"Chemical energetics"},
{"section":"Physical","name":"Electrochemistry"},
{"section":"Physical","name":"Equilibria (AS)"},
{"section":"Physical","name":"Reaction kinetics (AS)"},
{"section":"Inorganic","name":"Periodic Table trends"},
{"section":"Inorganic","name":"Group 2"},
{"section":"Inorganic","name":"Group 17 (halogens)"},
{"section":"Organic","name":"Introduction to organic chemistry"},
{"section":"Organic","name":"Hydrocarbons"},
{"section":"Organic","name":"Halogen derivatives and alcohols"}
]'::jsonb, NULL),

('AS Level','Cambridge','cambridge_alevel','Biology',NULL,'[
{"section":"Cell Biology","name":"Cell structure"},
{"section":"Cell Biology","name":"Biological molecules"},
{"section":"Cell Biology","name":"Enzymes"},
{"section":"Cell Biology","name":"Cell membranes and transport"},
{"section":"Cell Biology","name":"Mitosis"},
{"section":"Cell Biology","name":"Nucleic acids and protein synthesis"},
{"section":"Physiology","name":"Transport in plants"},
{"section":"Physiology","name":"Transport in animals"},
{"section":"Physiology","name":"Gas exchange"},
{"section":"Physiology","name":"Immunity"}
]'::jsonb, NULL),

('AS Level','Cambridge','cambridge_alevel','Economics',NULL,'[
{"section":"Microeconomics","name":"The price system"},
{"section":"Microeconomics","name":"Government intervention"},
{"section":"Macroeconomics","name":"Macroeconomic performance"},
{"section":"Macroeconomics","name":"Aggregate demand and supply"},
{"section":"Macroeconomics","name":"Economic policy"}
]'::jsonb, NULL),

('AS Level','Cambridge','cambridge_alevel','Business',NULL,'[
{"section":"Core","name":"Business environment"},
{"section":"Core","name":"People in organisations"},
{"section":"Core","name":"Marketing"},
{"section":"Core","name":"Operations and project management"},
{"section":"Core","name":"Finance and accounting"}
]'::jsonb, NULL),

('AS Level','Cambridge','cambridge_alevel','Accounting',NULL,'[
{"section":"Financial","name":"The accounting framework"},
{"section":"Financial","name":"Recording financial transactions"},
{"section":"Financial","name":"Sole trader accounts"},
{"section":"Financial","name":"Partnership accounts"},
{"section":"Cost","name":"Marginal and absorption costing"},
{"section":"Cost","name":"Budgeting"}
]'::jsonb, NULL),

('AS Level','Cambridge','cambridge_alevel','History',NULL,'[
{"section":"Modern History","name":"Paper 1: Depth study"},
{"section":"Modern History","name":"Paper 2: Thematic study"},
{"section":"Source Skills","name":"Evaluating and interpreting sources"}
]'::jsonb, NULL),

('AS Level','Cambridge','cambridge_alevel','Geography',NULL,'[
{"section":"Physical","name":"Hydrology and fluvial geomorphology"},
{"section":"Physical","name":"Atmosphere and weather"},
{"section":"Physical","name":"Coastal environments"},
{"section":"Human","name":"Population"},
{"section":"Human","name":"Settlement"},
{"section":"Human","name":"Economic development"},
{"section":"Skills","name":"Fieldwork and data collection"}
]'::jsonb, NULL),

('AS Level','Cambridge','cambridge_alevel','English Language',NULL,'[
{"section":"Core","name":"Key concepts and text analysis"},
{"section":"Core","name":"Language varieties and change"},
{"section":"Core","name":"Producing texts for purpose and audience"},
{"section":"Core","name":"Language investigation"}
]'::jsonb, NULL),

('AS Level','Cambridge','cambridge_alevel','Sociology',NULL,'[
{"section":"Core","name":"Socialisation, identity and culture"},
{"section":"Core","name":"Family"},
{"section":"Core","name":"Education"},
{"section":"Core","name":"Research methods"}
]'::jsonb, NULL),

('AS Level','Cambridge','cambridge_alevel','Computer Science',NULL,'[
{"section":"Theory","name":"Data representation"},
{"section":"Theory","name":"Communication and networking"},
{"section":"Theory","name":"Hardware and virtual machines"},
{"section":"Theory","name":"Logic and Boolean algebra"},
{"section":"Programming","name":"Programming concepts"},
{"section":"Programming","name":"Algorithms and problem-solving"}
]'::jsonb, NULL),

('AS Level','Cambridge','cambridge_alevel','Law',NULL,'[
{"section":"Legal System","name":"Sources of law"},
{"section":"Legal System","name":"Courts and personnel"},
{"section":"Criminal Law","name":"Elements of a crime"},
{"section":"Criminal Law","name":"Homicide and non-fatal offences"},
{"section":"Contract Law","name":"Formation and terms"},
{"section":"Contract Law","name":"Breach and remedies"}
]'::jsonb, NULL),

('AS Level','Cambridge','cambridge_alevel','Psychology',NULL,'[
{"section":"Core Studies","name":"Biological approach"},
{"section":"Core Studies","name":"Cognitive approach"},
{"section":"Core Studies","name":"Developmental approach"},
{"section":"Core Studies","name":"Social approach"},
{"section":"Research","name":"Research methods and data analysis"}
]'::jsonb, NULL),

-- ============================================================
-- IGCSE · EDEXCEL
-- ============================================================

('IGCSE / O Level','Edexcel IGCSE','edexcel_igcse','Mathematics A','4MA1','[
{"section":"Number","name":"Number, HCF, LCM and rounding"},
{"section":"Number","name":"Fractions, decimals and percentages"},
{"section":"Number","name":"Ratio, proportion and rates of change"},
{"section":"Algebra","name":"Algebra — simplifying, expanding and factorising"},
{"section":"Algebra","name":"Linear equations and inequalities"},
{"section":"Algebra","name":"Simultaneous equations"},
{"section":"Algebra","name":"Quadratics — factorising, formula, completing the square"},
{"section":"Algebra","name":"Sequences and nth term"},
{"section":"Algebra","name":"Indices and standard form"},
{"section":"Graphs","name":"Straight-line graphs and gradient"},
{"section":"Graphs","name":"Quadratic, cubic and reciprocal graphs"},
{"section":"Graphs","name":"Graph transformations"},
{"section":"Shape","name":"Angles, polygons and bearings"},
{"section":"Shape","name":"Circle theorems"},
{"section":"Shape","name":"Area and perimeter"},
{"section":"Shape","name":"Volume and surface area of 3D shapes"},
{"section":"Shape","name":"Trigonometry — SOHCAHTOA"},
{"section":"Shape","name":"Sine and cosine rules"},
{"section":"Shape","name":"Pythagoras'' theorem"},
{"section":"Vectors & Matrices","name":"Vectors"},
{"section":"Vectors & Matrices","name":"Transformation geometry"},
{"section":"Statistics","name":"Data collection and representation"},
{"section":"Statistics","name":"Averages and spread"},
{"section":"Statistics","name":"Probability — single and combined events"},
{"section":"Statistics","name":"Cumulative frequency and box plots"}
]'::jsonb, NULL),

('IGCSE / O Level','Edexcel IGCSE','edexcel_igcse','English Language B','4EB1','[
{"section":"Reading","name":"Reading for meaning — information and ideas"},
{"section":"Reading","name":"Language analysis — writer''s techniques"},
{"section":"Reading","name":"Comparing texts"},
{"section":"Writing","name":"Descriptive and narrative writing"},
{"section":"Writing","name":"Transactional writing (letters, articles, speeches)"},
{"section":"Writing","name":"Style, register and audience"},
{"section":"Spoken","name":"Spoken language endorsement"}
]'::jsonb, NULL),

('IGCSE / O Level','Edexcel IGCSE','edexcel_igcse','Economics','4EC1','[
{"section":"Microeconomics","name":"The basic economic problem"},
{"section":"Microeconomics","name":"Demand and supply"},
{"section":"Microeconomics","name":"Price elasticity of demand and supply"},
{"section":"Microeconomics","name":"Market failure and externalities"},
{"section":"Microeconomics","name":"The role of government in microeconomics"},
{"section":"Macroeconomics","name":"Macroeconomic objectives"},
{"section":"Macroeconomics","name":"Aggregate demand and aggregate supply"},
{"section":"Macroeconomics","name":"Fiscal, monetary and supply-side policies"},
{"section":"International","name":"International trade"},
{"section":"International","name":"Exchange rates"},
{"section":"International","name":"Globalisation"}
]'::jsonb, NULL),

('IGCSE / O Level','Edexcel IGCSE','edexcel_igcse','Business Studies','4BS1','[
{"section":"Core","name":"Enterprise and business objectives"},
{"section":"Core","name":"Business ownership and stakeholders"},
{"section":"Core","name":"External environment and business"},
{"section":"People","name":"Human resource management"},
{"section":"People","name":"Motivation and leadership"},
{"section":"Marketing","name":"Market research"},
{"section":"Marketing","name":"Marketing mix (4Ps)"},
{"section":"Finance","name":"Sources of finance"},
{"section":"Finance","name":"Financial statements and ratios"},
{"section":"Finance","name":"Break-even analysis and cash flow"},
{"section":"Operations","name":"Production methods and quality"},
{"section":"Operations","name":"Location and lean production"}
]'::jsonb, NULL),

('IGCSE / O Level','Edexcel IGCSE','edexcel_igcse','Accounting','4AC1','[
{"section":"Foundation","name":"The accounting equation and purpose"},
{"section":"Foundation","name":"Double-entry bookkeeping"},
{"section":"Foundation","name":"Ledger accounts and the trial balance"},
{"section":"Financial Statements","name":"Income statement (sole trader)"},
{"section":"Financial Statements","name":"Balance sheet (statement of financial position)"},
{"section":"Adjustments","name":"Accruals, prepayments and provisions"},
{"section":"Adjustments","name":"Depreciation methods"},
{"section":"Analysis","name":"Financial ratio analysis"},
{"section":"Special","name":"Control accounts and error correction"},
{"section":"Special","name":"Bank reconciliation"}
]'::jsonb, NULL),

('IGCSE / O Level','Edexcel IGCSE','edexcel_igcse','Physics','4PH1','[
{"section":"Forces and Motion","name":"Speed, velocity and acceleration"},
{"section":"Forces and Motion","name":"Newton''s laws of motion"},
{"section":"Forces and Motion","name":"Momentum and pressure"},
{"section":"Energy","name":"Energy stores and transfers"},
{"section":"Energy","name":"Work, power and efficiency"},
{"section":"Waves","name":"Properties of waves"},
{"section":"Waves","name":"Light and reflection and refraction"},
{"section":"Waves","name":"Sound and the electromagnetic spectrum"},
{"section":"Electricity","name":"Current, voltage and resistance"},
{"section":"Electricity","name":"Series and parallel circuits"},
{"section":"Electricity","name":"Electrical power and energy"},
{"section":"Magnetism","name":"Magnetism and the motor effect"},
{"section":"Magnetism","name":"Electromagnetic induction"},
{"section":"Radioactivity","name":"Atomic structure and radioactive decay"},
{"section":"Radioactivity","name":"Nuclear fission and fusion"},
{"section":"Space","name":"The Solar System and beyond"}
]'::jsonb, NULL),

('IGCSE / O Level','Edexcel IGCSE','edexcel_igcse','Chemistry','4CH1','[
{"section":"Principles","name":"Principles of chemistry — atoms and elements"},
{"section":"Principles","name":"States of matter and separation techniques"},
{"section":"Principles","name":"Relative formula mass and moles"},
{"section":"Inorganic","name":"Acids, bases and salts"},
{"section":"Inorganic","name":"Redox reactions and electrolysis"},
{"section":"Inorganic","name":"The Periodic Table and Group properties"},
{"section":"Inorganic","name":"Transition metals and catalysts"},
{"section":"Physical","name":"Energetics — exothermic and endothermic"},
{"section":"Physical","name":"Reaction rates and factors affecting them"},
{"section":"Physical","name":"Reversible reactions and equilibrium"},
{"section":"Organic","name":"Organic chemistry — hydrocarbons (alkanes, alkenes)"},
{"section":"Organic","name":"Alcohols and carboxylic acids"},
{"section":"Organic","name":"Polymers and industrial applications"}
]'::jsonb, NULL),

('IGCSE / O Level','Edexcel IGCSE','edexcel_igcse','Biology','4BI1','[
{"section":"Core","name":"Characteristics of living organisms"},
{"section":"Core","name":"Cells and organisation"},
{"section":"Core","name":"Biological molecules and enzymes"},
{"section":"Core","name":"Movement across membranes"},
{"section":"Physiology","name":"Nutrition (photosynthesis and human nutrition)"},
{"section":"Physiology","name":"Respiration — aerobic and anaerobic"},
{"section":"Physiology","name":"Gas exchange systems"},
{"section":"Physiology","name":"Transport systems (plants and humans)"},
{"section":"Physiology","name":"Excretion and osmoregulation"},
{"section":"Physiology","name":"Coordination and response (nervous and hormonal)"},
{"section":"Physiology","name":"Reproduction and growth"},
{"section":"Genetics","name":"Inheritance and variation"},
{"section":"Genetics","name":"DNA structure and gene expression"},
{"section":"Ecology","name":"Ecosystems and food webs"},
{"section":"Ecology","name":"Human impact on the environment"}
]'::jsonb, NULL),

('IGCSE / O Level','Edexcel IGCSE','edexcel_igcse','History',NULL,'[
{"section":"Paper 1","name":"Dictatorship and democracy in Germany 1933–1945"},
{"section":"Paper 1","name":"Causes and consequences of the First World War"},
{"section":"Paper 2","name":"The Cold War (1945–1991)"},
{"section":"Paper 3","name":"Coursework/CA — historical investigation"},
{"section":"Skills","name":"Source evaluation and historical analysis"}
]'::jsonb, NULL),

('IGCSE / O Level','Edexcel IGCSE','edexcel_igcse','Geography',NULL,'[
{"section":"Physical","name":"River processes and management"},
{"section":"Physical","name":"Coasts — processes and management"},
{"section":"Physical","name":"Weather and climate"},
{"section":"Human","name":"Population distribution and migration"},
{"section":"Human","name":"Urbanisation and urban issues"},
{"section":"Human","name":"Economic development and employment"},
{"section":"Human","name":"Tourism"},
{"section":"Environmental","name":"Natural hazards"},
{"section":"Environmental","name":"Ecosystems and biodiversity"},
{"section":"Skills","name":"Fieldwork and geographical enquiry"}
]'::jsonb, NULL),

('IGCSE / O Level','Edexcel IGCSE','edexcel_igcse','Computer Science',NULL,'[
{"section":"Theory","name":"Data representation — binary, hex, images, sound"},
{"section":"Theory","name":"Networking and the Internet"},
{"section":"Theory","name":"Hardware and software"},
{"section":"Theory","name":"Logic gates and Boolean expressions"},
{"section":"Theory","name":"Systems security and ethics"},
{"section":"Programming","name":"Algorithms — pseudocode and flowcharts"},
{"section":"Programming","name":"Programming constructs (sequence, selection, iteration)"},
{"section":"Programming","name":"Data structures — arrays and records"},
{"section":"Programming","name":"Subroutines and modularity"},
{"section":"Programming","name":"Debugging and testing"}
]'::jsonb, NULL),

('IGCSE / O Level','Edexcel IGCSE','edexcel_igcse','Art & Design',NULL,'[
{"section":"Core","name":"Observational drawing"},
{"section":"Core","name":"Contextual and cultural research"},
{"section":"Core","name":"Experimentation and material exploration"},
{"section":"Core","name":"Development of ideas"},
{"section":"Core","name":"Final personal response"},
{"section":"Core","name":"Externally set assignment"}
]'::jsonb, NULL),

('IGCSE / O Level','Edexcel IGCSE','edexcel_igcse','Physical Education',NULL,'[
{"section":"Theory","name":"Anatomy and physiology"},
{"section":"Theory","name":"Physical fitness and training"},
{"section":"Theory","name":"Sport psychology"},
{"section":"Theory","name":"Sport, society and culture"},
{"section":"Practical","name":"Practical performance — individual activity"},
{"section":"Practical","name":"Practical performance — team activity"},
{"section":"Analysis","name":"Analysis of performance"}
]'::jsonb, NULL),

('IGCSE / O Level','Edexcel IGCSE','edexcel_igcse','English Literature',NULL,'[
{"section":"Poetry","name":"Poetry anthology — unseen and studied poems"},
{"section":"Drama","name":"Shakespeare — set play"},
{"section":"Prose","name":"Prose text — modern or classic novel"},
{"section":"Skills","name":"Language analysis and comparative essay skills"}
]'::jsonb, NULL),

('IGCSE / O Level','Edexcel IGCSE','edexcel_igcse','Bangla','4BN1','[
{"section":"Reading","name":"Reading comprehension — prose texts"},
{"section":"Reading","name":"Reading — poetry and literary texts"},
{"section":"Writing","name":"Descriptive and narrative writing"},
{"section":"Writing","name":"Formal writing (letters, reports, articles)"},
{"section":"Language","name":"Grammar and sentence construction"},
{"section":"Language","name":"Vocabulary and idiomatic usage"}
]'::jsonb, NULL),

-- ============================================================
-- IGCSE · CAMBRIDGE
-- ============================================================

('IGCSE / O Level','Cambridge IGCSE','cambridge_igcse','Mathematics','0580','[
{"section":"Number","name":"Number — integers, fractions, decimals"},
{"section":"Number","name":"Percentages, ratio and proportion"},
{"section":"Number","name":"Indices and standard form"},
{"section":"Algebra","name":"Algebraic expressions and formulae"},
{"section":"Algebra","name":"Linear equations and inequalities"},
{"section":"Algebra","name":"Simultaneous equations"},
{"section":"Algebra","name":"Quadratic equations and functions"},
{"section":"Algebra","name":"Sequences and nth term"},
{"section":"Graphs","name":"Graphs of functions"},
{"section":"Graphs","name":"Gradient and straight-line graphs"},
{"section":"Coordinate Geometry","name":"Coordinates and transformations"},
{"section":"Shape","name":"Angles, bearings and Pythagoras"},
{"section":"Shape","name":"Circle theorems"},
{"section":"Shape","name":"Area, perimeter and volume"},
{"section":"Shape","name":"Trigonometry (2D and 3D)"},
{"section":"Shape","name":"Sine and cosine rules"},
{"section":"Vectors","name":"Vectors and matrices"},
{"section":"Statistics","name":"Statistical diagrams and averages"},
{"section":"Statistics","name":"Probability"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge IGCSE','cambridge_igcse','Physics','0625','[
{"section":"General Physics","name":"Measurements and units"},
{"section":"General Physics","name":"Motion"},
{"section":"General Physics","name":"Forces"},
{"section":"General Physics","name":"Energy, work and power"},
{"section":"General Physics","name":"Pressure"},
{"section":"Thermal","name":"Kinetic molecular model"},
{"section":"Thermal","name":"Thermal properties of matter"},
{"section":"Thermal","name":"Transfer of thermal energy"},
{"section":"Waves","name":"Wave properties"},
{"section":"Waves","name":"Light and the electromagnetic spectrum"},
{"section":"Waves","name":"Sound"},
{"section":"Electricity","name":"Electric charge and fields"},
{"section":"Electricity","name":"Current and resistance"},
{"section":"Electricity","name":"D.C. circuits"},
{"section":"Electricity","name":"Electrical energy and power"},
{"section":"Magnetism","name":"Magnets and magnetic fields"},
{"section":"Magnetism","name":"Electromagnetic effects"},
{"section":"Nuclear","name":"Atomic structure and radioactivity"},
{"section":"Nuclear","name":"Nuclear fission and fusion"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge IGCSE','cambridge_igcse','Chemistry','0620','[
{"section":"Core","name":"The particulate nature of matter"},
{"section":"Core","name":"Experimental techniques and measurements"},
{"section":"Core","name":"Atoms, elements and compounds"},
{"section":"Core","name":"Stoichiometry"},
{"section":"Core","name":"Electricity and chemistry"},
{"section":"Core","name":"Chemical energetics"},
{"section":"Core","name":"Rates of reaction"},
{"section":"Core","name":"Reversible reactions and equilibrium"},
{"section":"Core","name":"Redox reactions"},
{"section":"Core","name":"Acids, bases and salts"},
{"section":"Core","name":"The Periodic Table"},
{"section":"Core","name":"Metals"},
{"section":"Core","name":"Air and water"},
{"section":"Organic","name":"Organic chemistry — introduction"},
{"section":"Organic","name":"Hydrocarbons and alkenes"},
{"section":"Organic","name":"Alcohols, carboxylic acids and polymers"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge IGCSE','cambridge_igcse','Biology','0610','[
{"section":"Core","name":"Characteristics and classification of living organisms"},
{"section":"Core","name":"Cell structure and organisation"},
{"section":"Core","name":"Biological molecules and enzymes"},
{"section":"Core","name":"Membranes and movement"},
{"section":"Physiology","name":"Nutrition in plants (photosynthesis)"},
{"section":"Physiology","name":"Human nutrition and digestion"},
{"section":"Physiology","name":"Respiration"},
{"section":"Physiology","name":"Gas exchange"},
{"section":"Physiology","name":"Transport in plants"},
{"section":"Physiology","name":"Transport in humans (blood and circulation)"},
{"section":"Physiology","name":"Excretion"},
{"section":"Physiology","name":"Coordination and response"},
{"section":"Reproduction","name":"Reproduction in plants and humans"},
{"section":"Genetics","name":"Inheritance and variation"},
{"section":"Ecology","name":"Ecosystems and nutrient cycles"},
{"section":"Ecology","name":"Human impact and conservation"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge IGCSE','cambridge_igcse','Economics','0455','[
{"section":"Core","name":"The basic economic problem"},
{"section":"Core","name":"The allocation of resources"},
{"section":"Core","name":"Microeconomic decision-makers"},
{"section":"Core","name":"Government and the macroeconomy"},
{"section":"Core","name":"Economic development"},
{"section":"Core","name":"International trade and exchange rates"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge IGCSE','cambridge_igcse','Business Studies','0450','[
{"section":"Core","name":"Understanding business activity"},
{"section":"Core","name":"People in business"},
{"section":"Core","name":"Marketing"},
{"section":"Core","name":"Operations management"},
{"section":"Core","name":"Financial information and decisions"},
{"section":"Core","name":"External influences on business activity"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge IGCSE','cambridge_igcse','Accounting','0452','[
{"section":"Foundation","name":"The purpose and role of accounting"},
{"section":"Foundation","name":"The double-entry system"},
{"section":"Foundation","name":"Books of prime entry"},
{"section":"Foundation","name":"Trial balance"},
{"section":"Statements","name":"Income statement"},
{"section":"Statements","name":"Statement of financial position"},
{"section":"Adjustments","name":"Depreciation, accruals and prepayments"},
{"section":"Adjustments","name":"Irrecoverable and doubtful debts"},
{"section":"Analysis","name":"Ratio analysis and interpretation"},
{"section":"Special","name":"Clubs and partnership accounts"},
{"section":"Special","name":"Manufacturing accounts"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge IGCSE','cambridge_igcse','History','0470','[
{"section":"Core Content","name":"The First World War — causes and events"},
{"section":"Core Content","name":"Peacemaking 1918–19 and the League of Nations"},
{"section":"Core Content","name":"Hitler''s rise to power"},
{"section":"Core Content","name":"World War II — origins and events"},
{"section":"Core Content","name":"The Cold War 1945–62"},
{"section":"Core Content","name":"End of the Cold War 1979–91"},
{"section":"Depth Studies","name":"Germany 1918–45"},
{"section":"Depth Studies","name":"Russia 1905–41"},
{"section":"Depth Studies","name":"The USA 1945–75 (civil rights and Vietnam)"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge IGCSE','cambridge_igcse','Geography','0460','[
{"section":"Physical","name":"Population and settlement"},
{"section":"Physical","name":"The natural environment (coasts and rivers)"},
{"section":"Physical","name":"Weather and climate"},
{"section":"Physical","name":"Natural hazards"},
{"section":"Human","name":"Economic development and employment"},
{"section":"Human","name":"Food production"},
{"section":"Human","name":"Industry"},
{"section":"Human","name":"Tourism"},
{"section":"Human","name":"Energy"},
{"section":"Human","name":"Water"},
{"section":"Human","name":"Environmental management"},
{"section":"Skills","name":"Skills and fieldwork"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge IGCSE','cambridge_igcse','Computer Science','0478','[
{"section":"Theory","name":"Data representation"},
{"section":"Theory","name":"Data transmission and networking"},
{"section":"Theory","name":"Hardware and software"},
{"section":"Theory","name":"Security and privacy"},
{"section":"Theory","name":"Ethics and impacts of computing"},
{"section":"Problem Solving","name":"Algorithm design — pseudocode"},
{"section":"Problem Solving","name":"Algorithm design — flowcharts"},
{"section":"Problem Solving","name":"Programming constructs"},
{"section":"Problem Solving","name":"Arrays, records and file handling"},
{"section":"Problem Solving","name":"Testing and debugging"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge IGCSE','cambridge_igcse','English Language','0500','[
{"section":"Reading","name":"Reading for understanding and meaning"},
{"section":"Reading","name":"Language analysis — writer''s effects"},
{"section":"Reading","name":"Summary writing"},
{"section":"Reading","name":"Directed writing based on texts"},
{"section":"Writing","name":"Narrative and descriptive writing"},
{"section":"Writing","name":"Argument, persuasion and discursive writing"},
{"section":"Writing","name":"Writing for different purposes and audiences"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge IGCSE','cambridge_igcse','English Literature','0475','[
{"section":"Poetry","name":"Poetry — studied poems and anthology"},
{"section":"Poetry","name":"Unseen poetry analysis"},
{"section":"Drama","name":"Shakespeare — set play"},
{"section":"Prose","name":"Prose text — novel or short stories"},
{"section":"Skills","name":"Close reading and textual analysis"},
{"section":"Skills","name":"Comparative essay writing"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge IGCSE','cambridge_igcse','Sociology','0495','[
{"section":"Theory","name":"Sociological perspectives and methods"},
{"section":"Theory","name":"Research methods"},
{"section":"Institutions","name":"Family"},
{"section":"Institutions","name":"Education"},
{"section":"Institutions","name":"Religion"},
{"section":"Institutions","name":"Media"},
{"section":"Inequality","name":"Social stratification"},
{"section":"Inequality","name":"Gender and ethnicity"},
{"section":"Crime","name":"Crime and deviance"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge IGCSE','cambridge_igcse','Travel & Tourism','0471','[
{"section":"Core","name":"The nature and characteristics of travel and tourism"},
{"section":"Core","name":"Tourism motivations and factors influencing tourism"},
{"section":"Core","name":"The travel and tourism industry"},
{"section":"Core","name":"Customer service in travel and tourism"},
{"section":"Core","name":"Responsible tourism"},
{"section":"Core","name":"Development and management of destinations"},
{"section":"Skills","name":"Research and extended writing skills"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge IGCSE','cambridge_igcse','Physical Education','0413','[
{"section":"Theory","name":"Physical activity and health"},
{"section":"Theory","name":"Physical fitness and training methods"},
{"section":"Theory","name":"Nutrition for sport and exercise"},
{"section":"Theory","name":"Anatomy and physiology"},
{"section":"Practical","name":"Practical performance (individual sport)"},
{"section":"Practical","name":"Practical performance (team sport)"},
{"section":"Analysis","name":"Written examination — topics in sport and PE"}
]'::jsonb, NULL),

-- ============================================================
-- CAMBRIDGE O LEVEL
-- ============================================================

('IGCSE / O Level','Cambridge O Level','o_level','Mathematics D','4024','[
{"section":"Number","name":"Number — integers, fractions and decimals"},
{"section":"Number","name":"Percentages, ratio and proportion"},
{"section":"Number","name":"Indices, standard form and surds"},
{"section":"Algebra","name":"Algebraic expressions and manipulation"},
{"section":"Algebra","name":"Equations — linear, simultaneous, quadratic"},
{"section":"Algebra","name":"Sequences and inequalities"},
{"section":"Graphs","name":"Coordinate geometry and straight-line graphs"},
{"section":"Graphs","name":"Graphs of functions and transformations"},
{"section":"Shape","name":"Angle properties and Pythagoras"},
{"section":"Shape","name":"Circle properties and theorems"},
{"section":"Shape","name":"Trigonometry — right-angled and general triangles"},
{"section":"Shape","name":"Mensuration — area and volume"},
{"section":"Vectors","name":"Vectors and transformation geometry"},
{"section":"Statistics","name":"Statistics — diagrams and averages"},
{"section":"Statistics","name":"Probability"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge O Level','o_level','Physics','5054','[
{"section":"General","name":"Measurements and units"},
{"section":"General","name":"Motion"},
{"section":"General","name":"Forces and Newton''s laws"},
{"section":"General","name":"Energy, work and power"},
{"section":"General","name":"Pressure"},
{"section":"Thermal","name":"Thermal physics — kinetic model"},
{"section":"Thermal","name":"Thermal expansion and temperature"},
{"section":"Thermal","name":"Heat transfer"},
{"section":"Waves","name":"Waves — properties and behaviour"},
{"section":"Waves","name":"Light and optical devices"},
{"section":"Waves","name":"Electromagnetic spectrum and sound"},
{"section":"Electricity","name":"Charge and circuits"},
{"section":"Electricity","name":"Electrical quantities and power"},
{"section":"Magnetism","name":"Magnetism and electromagnetism"},
{"section":"Nuclear","name":"Radioactivity and the nucleus"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge O Level','o_level','Chemistry','5070','[
{"section":"Core","name":"States of matter and atomic structure"},
{"section":"Core","name":"Formulae, equations and stoichiometry"},
{"section":"Core","name":"Chemical energetics"},
{"section":"Core","name":"Electrochemistry"},
{"section":"Core","name":"Reaction rates and equilibrium"},
{"section":"Core","name":"Acids, bases and salts"},
{"section":"Core","name":"The Periodic Table"},
{"section":"Core","name":"Metals and non-metals"},
{"section":"Core","name":"Air, water and industry"},
{"section":"Organic","name":"Introduction to organic chemistry"},
{"section":"Organic","name":"Hydrocarbons and polymers"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge O Level','o_level','Biology','5090','[
{"section":"Core","name":"Characteristics and classification"},
{"section":"Core","name":"Cell biology"},
{"section":"Core","name":"Enzymes and biological molecules"},
{"section":"Physiology","name":"Nutrition and digestion"},
{"section":"Physiology","name":"Transport in organisms"},
{"section":"Physiology","name":"Respiration and gas exchange"},
{"section":"Physiology","name":"Excretion and homeostasis"},
{"section":"Physiology","name":"Coordination and response"},
{"section":"Reproduction","name":"Reproduction and growth"},
{"section":"Genetics","name":"Inheritance and variation"},
{"section":"Ecology","name":"Ecology and the environment"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge O Level','o_level','Economics','2281','[
{"section":"Core","name":"The basic economic problem"},
{"section":"Core","name":"Demand, supply and price"},
{"section":"Core","name":"Microeconomic decision-makers"},
{"section":"Core","name":"Government objectives and macroeconomy"},
{"section":"Core","name":"Economic development"},
{"section":"Core","name":"International trade and globalisation"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge O Level','o_level','Accounting','7110','[
{"section":"Foundation","name":"The accounting equation"},
{"section":"Foundation","name":"Double-entry bookkeeping"},
{"section":"Foundation","name":"Source documents and day books"},
{"section":"Foundation","name":"Trial balance"},
{"section":"Statements","name":"Final accounts — income statement"},
{"section":"Statements","name":"Final accounts — balance sheet"},
{"section":"Adjustments","name":"Depreciation methods"},
{"section":"Adjustments","name":"Accruals and prepayments"},
{"section":"Analysis","name":"Ratio analysis"},
{"section":"Special","name":"Club and partnership accounts"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge O Level','o_level','History','2059','[
{"section":"Paper 1","name":"International relations 1919–1939"},
{"section":"Paper 1","name":"The League of Nations"},
{"section":"Paper 1","name":"Origins of World War II"},
{"section":"Paper 2","name":"Depth study: chosen topic"},
{"section":"Skills","name":"Source analysis and historical assessment"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge O Level','o_level','Geography','2217','[
{"section":"Physical","name":"Population and settlement"},
{"section":"Physical","name":"Natural environments — coasts, rivers, weather"},
{"section":"Human","name":"Economic development"},
{"section":"Human","name":"Agriculture and food"},
{"section":"Human","name":"Industry and energy"},
{"section":"Human","name":"Environmental management"},
{"section":"Skills","name":"Geographical skills and fieldwork"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge O Level','o_level','English Language','1123','[
{"section":"Reading","name":"Reading for understanding"},
{"section":"Reading","name":"Language analysis — style and effect"},
{"section":"Reading","name":"Summary and directed writing"},
{"section":"Writing","name":"Narrative and descriptive writing"},
{"section":"Writing","name":"Argumentative and discursive writing"},
{"section":"Writing","name":"Register, tone and audience"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge O Level','o_level','Computer Science','2210','[
{"section":"Theory","name":"Data representation"},
{"section":"Theory","name":"Networking and communications"},
{"section":"Theory","name":"Hardware and software"},
{"section":"Theory","name":"Security and privacy"},
{"section":"Problem Solving","name":"Algorithms and pseudocode"},
{"section":"Problem Solving","name":"Programming constructs and data structures"},
{"section":"Problem Solving","name":"Testing and debugging"}
]'::jsonb, NULL),

('IGCSE / O Level','Cambridge O Level','o_level','Bangla','3204','[
{"section":"Reading","name":"Reading comprehension — prose"},
{"section":"Reading","name":"Reading — poetry and literary texts"},
{"section":"Writing","name":"Descriptive and narrative writing"},
{"section":"Writing","name":"Formal and transactional writing"},
{"section":"Language","name":"Grammar — sentence construction and verb forms"},
{"section":"Language","name":"Vocabulary and idiomatic expressions"}
]'::jsonb, NULL);

-- ============================================================
-- IB DIPLOMA (separate INSERT — subjects with HL/SL/Core level field)
-- ============================================================

INSERT INTO syllabus_templates (qualification, exam_board, board, subject_name, subject_code, topics, level) VALUES

-- ── IB Group 1 ────────────────────────────────────────────
('IB Diploma','IB','IB','English A Literature',NULL,'[
{"section":"Readers, Writers, Texts","name":"Reading and the creation of meaning"},
{"section":"Readers, Writers, Texts","name":"Forms and literary genres"},
{"section":"Time and Space","name":"Literature and historical context"},
{"section":"Time and Space","name":"Literature and place"},
{"section":"Intertextuality","name":"Connecting texts — comparison"},
{"section":"Intertextuality","name":"Transformation and adaptation"},
{"section":"Works","name":"Prose fiction — novel"},
{"section":"Works","name":"Poetry — collection"},
{"section":"Works","name":"Drama — play"},
{"section":"Assessment","name":"Paper 1 — guided literary analysis"},
{"section":"Assessment","name":"Paper 2 — comparative essay"},
{"section":"Assessment","name":"Individual oral"},
{"section":"Assessment","name":"HL essay (HL only)"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','English A Literature',NULL,'[
{"section":"Readers, Writers, Texts","name":"Reading and the creation of meaning"},
{"section":"Readers, Writers, Texts","name":"Forms and literary genres"},
{"section":"Time and Space","name":"Literature and historical context"},
{"section":"Time and Space","name":"Literature and place"},
{"section":"Intertextuality","name":"Connecting texts — comparison"},
{"section":"Works","name":"Prose fiction — novel"},
{"section":"Works","name":"Poetry — collection"},
{"section":"Works","name":"Drama — play"},
{"section":"Assessment","name":"Paper 1 — guided literary analysis"},
{"section":"Assessment","name":"Paper 2 — comparative essay"},
{"section":"Assessment","name":"Individual oral"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','English A Language & Literature',NULL,'[
{"section":"Readers, Writers, Texts","name":"Language and meaning"},
{"section":"Readers, Writers, Texts","name":"Literary and non-literary texts"},
{"section":"Readers, Writers, Texts","name":"Bias and power in language"},
{"section":"Time and Space","name":"Language in historical and cultural contexts"},
{"section":"Time and Space","name":"Media and communication"},
{"section":"Intertextuality","name":"Connections across texts"},
{"section":"Assessment","name":"Paper 1 — analysis of unseen texts"},
{"section":"Assessment","name":"Paper 2 — comparative essay"},
{"section":"Assessment","name":"Individual oral"},
{"section":"Assessment","name":"HL essay (HL only)"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','English A Language & Literature',NULL,'[
{"section":"Readers, Writers, Texts","name":"Language and meaning"},
{"section":"Readers, Writers, Texts","name":"Literary and non-literary texts"},
{"section":"Time and Space","name":"Language in historical and cultural contexts"},
{"section":"Time and Space","name":"Media and communication"},
{"section":"Assessment","name":"Paper 1 — analysis of unseen texts"},
{"section":"Assessment","name":"Paper 2 — comparative essay"},
{"section":"Assessment","name":"Individual oral"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','Bangla A Literature',NULL,'[
{"section":"Works","name":"Prose fiction in Bangla"},
{"section":"Works","name":"Poetry in Bangla"},
{"section":"Works","name":"Drama or additional literary text"},
{"section":"Assessment","name":"Paper 1 — guided literary analysis"},
{"section":"Assessment","name":"Paper 2 — comparative essay"},
{"section":"Assessment","name":"Individual oral"}
]'::jsonb, 'SL'),

-- ── IB Group 2: Language Acquisition ─────────────────────
('IB Diploma','IB','IB','English B',NULL,'[
{"section":"Identities","name":"Personal and cultural identity"},
{"section":"Experiences","name":"Leisure, work and human ingenuity"},
{"section":"Human Ingenuity","name":"Science and technology"},
{"section":"Social Organisation","name":"Social and political structures"},
{"section":"Sharing the Planet","name":"Rights and environmental challenges"},
{"section":"Literature","name":"Literary texts (HL: 2 works)"},
{"section":"Assessment","name":"Paper 1 — comprehension"},
{"section":"Assessment","name":"Paper 2 — written production"},
{"section":"Assessment","name":"Individual oral"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','English B',NULL,'[
{"section":"Identities","name":"Personal and cultural identity"},
{"section":"Experiences","name":"Leisure and work"},
{"section":"Human Ingenuity","name":"Science and creativity"},
{"section":"Social Organisation","name":"Community and society"},
{"section":"Sharing the Planet","name":"Environmental issues"},
{"section":"Assessment","name":"Paper 1 — comprehension"},
{"section":"Assessment","name":"Paper 2 — written production"},
{"section":"Assessment","name":"Individual oral"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','French B',NULL,'[
{"section":"Identities","name":"Identité personnelle et culturelle"},
{"section":"Experiences","name":"Vie quotidienne et loisirs"},
{"section":"Human Ingenuity","name":"Science, technologie et créativité"},
{"section":"Social Organisation","name":"Organisation sociale et politique"},
{"section":"Sharing the Planet","name":"Environnement et droits"},
{"section":"Literature","name":"Textes littéraires (HL)"},
{"section":"Assessment","name":"Paper 1 — compréhension"},
{"section":"Assessment","name":"Paper 2 — production écrite"},
{"section":"Assessment","name":"Oral individuel"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','French B',NULL,'[
{"section":"Identities","name":"Identité personnelle et culturelle"},
{"section":"Experiences","name":"Vie quotidienne et loisirs"},
{"section":"Human Ingenuity","name":"Science et créativité"},
{"section":"Social Organisation","name":"Organisation sociale"},
{"section":"Sharing the Planet","name":"Environnement et droits"},
{"section":"Assessment","name":"Paper 1 — compréhension"},
{"section":"Assessment","name":"Paper 2 — production écrite"},
{"section":"Assessment","name":"Oral individuel"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','Spanish B',NULL,'[
{"section":"Identities","name":"Identidad personal y cultural"},
{"section":"Experiences","name":"Vida cotidiana y ocio"},
{"section":"Human Ingenuity","name":"Ciencia y creatividad"},
{"section":"Social Organisation","name":"Organización social"},
{"section":"Sharing the Planet","name":"Medio ambiente y derechos"},
{"section":"Assessment","name":"Paper 1 — comprensión"},
{"section":"Assessment","name":"Paper 2 — producción escrita"},
{"section":"Assessment","name":"Oral individual"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','Bangla B',NULL,'[
{"section":"Identities","name":"ব্যক্তিগত ও সাংস্কৃতিক পরিচয়"},
{"section":"Experiences","name":"দৈনন্দিন জীবন ও অবসর"},
{"section":"Human Ingenuity","name":"বিজ্ঞান ও সৃজনশীলতা"},
{"section":"Social Organisation","name":"সামাজিক সংগঠন"},
{"section":"Sharing the Planet","name":"পরিবেশ ও অধিকার"},
{"section":"Assessment","name":"Paper 1 — comprehension"},
{"section":"Assessment","name":"Paper 2 — written production"},
{"section":"Assessment","name":"Individual oral"}
]'::jsonb, 'SL'),

-- ── IB Group 3: Individuals & Societies ───────────────────
('IB Diploma','IB','IB','History',NULL,'[
{"section":"Prescribed Subject","name":"Rights and protest (1945–1979)"},
{"section":"World History Topic","name":"The Cold War (1947–1991)"},
{"section":"World History Topic","name":"Authoritarian states (20th century)"},
{"section":"HL Option","name":"History of Europe (HL depth study)"},
{"section":"HL Option","name":"Internal assessment — historical investigation"},
{"section":"Assessment","name":"Paper 1 — source-based analysis"},
{"section":"Assessment","name":"Paper 2 — essay"},
{"section":"Assessment","name":"Paper 3 — HL extended essay"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','History',NULL,'[
{"section":"Prescribed Subject","name":"Rights and protest (1945–1979)"},
{"section":"World History Topic","name":"The Cold War (1947–1991)"},
{"section":"World History Topic","name":"Authoritarian states (20th century)"},
{"section":"Assessment","name":"Paper 1 — source-based analysis"},
{"section":"Assessment","name":"Paper 2 — essay"},
{"section":"Assessment","name":"Internal assessment — historical investigation"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','Economics',NULL,'[
{"section":"Microeconomics","name":"Introduction to economics — scarcity and choice"},
{"section":"Microeconomics","name":"Demand"},
{"section":"Microeconomics","name":"Supply"},
{"section":"Microeconomics","name":"Markets — equilibrium and disequilibrium"},
{"section":"Microeconomics","name":"Elasticities (PED, PES, YED, XED)"},
{"section":"Microeconomics","name":"Theory of the firm — costs and revenues"},
{"section":"Microeconomics","name":"Market structures (perfect competition to monopoly)"},
{"section":"Microeconomics","name":"Market failure"},
{"section":"Macroeconomics","name":"Measuring economic activity (GDP)"},
{"section":"Macroeconomics","name":"Aggregate demand and supply"},
{"section":"Macroeconomics","name":"Macroeconomic objectives"},
{"section":"Macroeconomics","name":"Demand-side and supply-side policies"},
{"section":"Global","name":"International trade"},
{"section":"Global","name":"Exchange rates"},
{"section":"Global","name":"Balance of payments"},
{"section":"Global","name":"Economic development"},
{"section":"Assessment","name":"HL extension — market failure and government"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','Economics',NULL,'[
{"section":"Microeconomics","name":"Introduction to economics"},
{"section":"Microeconomics","name":"Demand and supply"},
{"section":"Microeconomics","name":"Elasticities"},
{"section":"Microeconomics","name":"Market failure"},
{"section":"Macroeconomics","name":"Measuring economic activity"},
{"section":"Macroeconomics","name":"Aggregate demand and supply"},
{"section":"Macroeconomics","name":"Macroeconomic objectives and policies"},
{"section":"Global","name":"International trade and exchange rates"},
{"section":"Global","name":"Economic development"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','Geography',NULL,'[
{"section":"Core Theme","name":"Populations in transition"},
{"section":"Core Theme","name":"Disparities in wealth and development"},
{"section":"Core Theme","name":"Patterns in environmental quality and sustainability"},
{"section":"Core Theme","name":"Patterns in resource consumption"},
{"section":"Optional Theme","name":"Oceans and their coastal margins"},
{"section":"Optional Theme","name":"Extreme environments"},
{"section":"Optional Theme","name":"Hazards and disasters"},
{"section":"Optional Theme","name":"Leisure, sport and tourism"},
{"section":"HL Extension","name":"Global interactions (HL only)"},
{"section":"Assessment","name":"Fieldwork — geographic investigation"},
{"section":"Assessment","name":"Paper 1, 2, 3 examination"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','Geography',NULL,'[
{"section":"Core Theme","name":"Populations in transition"},
{"section":"Core Theme","name":"Disparities in wealth and development"},
{"section":"Core Theme","name":"Patterns in environmental quality and sustainability"},
{"section":"Core Theme","name":"Patterns in resource consumption"},
{"section":"Optional Theme","name":"Oceans and their coastal margins"},
{"section":"Optional Theme","name":"Extreme environments"},
{"section":"Assessment","name":"Fieldwork — geographic investigation"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','Psychology',NULL,'[
{"section":"Core","name":"The biological approach to behaviour"},
{"section":"Core","name":"The cognitive approach to behaviour"},
{"section":"Core","name":"The sociocultural approach to behaviour"},
{"section":"Options","name":"Abnormal psychology"},
{"section":"Options","name":"Human relationships"},
{"section":"Options","name":"Developmental psychology"},
{"section":"Options","name":"Health psychology"},
{"section":"HL Extension","name":"Qualitative research (HL only)"},
{"section":"Assessment","name":"Paper 1 — core topics essay"},
{"section":"Assessment","name":"Paper 2 — options essays"},
{"section":"Assessment","name":"Paper 3 — research methods (HL)"},
{"section":"Assessment","name":"Internal assessment — experimental study"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','Psychology',NULL,'[
{"section":"Core","name":"The biological approach to behaviour"},
{"section":"Core","name":"The cognitive approach to behaviour"},
{"section":"Core","name":"The sociocultural approach to behaviour"},
{"section":"Options","name":"Abnormal psychology"},
{"section":"Options","name":"Human relationships"},
{"section":"Options","name":"Health psychology"},
{"section":"Assessment","name":"Paper 1 — core topics essay"},
{"section":"Assessment","name":"Paper 2 — options essays"},
{"section":"Assessment","name":"Internal assessment — experimental study"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','Business Management',NULL,'[
{"section":"Unit 1","name":"Business organisation and environment"},
{"section":"Unit 2","name":"Human resource management"},
{"section":"Unit 3","name":"Finance and accounts"},
{"section":"Unit 4","name":"Marketing"},
{"section":"Unit 5","name":"Operations management"},
{"section":"Unit 6","name":"Toolkit for strategic analysis (HL only)"},
{"section":"Assessment","name":"Paper 1 — pre-seen case study"},
{"section":"Assessment","name":"Paper 2 — unseen stimuli"},
{"section":"Assessment","name":"Internal assessment — research project"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','Business Management',NULL,'[
{"section":"Unit 1","name":"Business organisation and environment"},
{"section":"Unit 2","name":"Human resource management"},
{"section":"Unit 3","name":"Finance and accounts"},
{"section":"Unit 4","name":"Marketing"},
{"section":"Unit 5","name":"Operations management"},
{"section":"Assessment","name":"Paper 1 — pre-seen case study"},
{"section":"Assessment","name":"Paper 2 — unseen stimuli"},
{"section":"Assessment","name":"Internal assessment — research project"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','Philosophy',NULL,'[
{"section":"Core Theme","name":"Being human — nature, identity and mind"},
{"section":"Optional Theme","name":"Ethics"},
{"section":"Optional Theme","name":"Philosophy of religion"},
{"section":"Optional Theme","name":"Philosophy of science"},
{"section":"Optional Theme","name":"Political philosophy"},
{"section":"Set Text","name":"Close reading of a philosophical text"},
{"section":"Assessment","name":"Paper 1 — core theme essay"},
{"section":"Assessment","name":"Paper 2 — optional theme essay"},
{"section":"Assessment","name":"Internal assessment — philosophical analysis"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','Global Politics',NULL,'[
{"section":"Core","name":"Power, sovereignty and international relations"},
{"section":"Core","name":"Human rights"},
{"section":"Core","name":"Development"},
{"section":"Core","name":"Peace and conflict"},
{"section":"HL Extension","name":"Engagement activity (HL only)"},
{"section":"Assessment","name":"Paper 1 — structured questions"},
{"section":"Assessment","name":"Paper 2 — essay"},
{"section":"Assessment","name":"Internal assessment — global political engagement"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','Global Politics',NULL,'[
{"section":"Core","name":"Power, sovereignty and international relations"},
{"section":"Core","name":"Human rights"},
{"section":"Core","name":"Development"},
{"section":"Core","name":"Peace and conflict"},
{"section":"Assessment","name":"Paper 1 — structured questions"},
{"section":"Assessment","name":"Paper 2 — essay"},
{"section":"Assessment","name":"Internal assessment — global political engagement"}
]'::jsonb, 'SL'),

-- ── IB Group 4: Sciences ──────────────────────────────────
('IB Diploma','IB','IB','Biology',NULL,'[
{"section":"Cell Biology","name":"Cell theory and prokaryotic/eukaryotic cells"},
{"section":"Cell Biology","name":"Ultrastructure of cells"},
{"section":"Cell Biology","name":"Membrane structure and transport"},
{"section":"Cell Biology","name":"Cell division — mitosis"},
{"section":"Molecular Biology","name":"Molecules to metabolism"},
{"section":"Molecular Biology","name":"Water and its properties"},
{"section":"Molecular Biology","name":"Carbohydrates and lipids"},
{"section":"Molecular Biology","name":"Proteins and enzymes"},
{"section":"Molecular Biology","name":"DNA structure and replication"},
{"section":"Molecular Biology","name":"Transcription and translation"},
{"section":"Molecular Biology","name":"Cellular respiration"},
{"section":"Molecular Biology","name":"Photosynthesis"},
{"section":"Genetics","name":"Chromosomes, genes and alleles"},
{"section":"Genetics","name":"Meiosis"},
{"section":"Genetics","name":"Inheritance (Mendelian and extensions)"},
{"section":"Ecology","name":"Species, communities and ecosystems"},
{"section":"Ecology","name":"Energy flow and nutrient cycling"},
{"section":"Ecology","name":"Climate change"},
{"section":"Evolution","name":"Evidence for evolution"},
{"section":"Evolution","name":"Natural selection"},
{"section":"Evolution","name":"Classification and biodiversity"},
{"section":"Human Physiology","name":"Digestion and absorption"},
{"section":"Human Physiology","name":"Blood system"},
{"section":"Human Physiology","name":"Gas exchange"},
{"section":"Human Physiology","name":"Neurons and synapses"},
{"section":"Human Physiology","name":"Hormones and homeostasis"},
{"section":"AHL — Cell","name":"Membrane proteins and signalling"},
{"section":"AHL — Cell","name":"Cell respiration and electron transport chain"},
{"section":"AHL — Molecular","name":"Protein synthesis in detail"},
{"section":"AHL — Genetics","name":"Recombinant DNA and gene expression"},
{"section":"AHL — Plant","name":"Plant structure and growth"},
{"section":"AHL — Animal","name":"Muscle and movement"},
{"section":"AHL — Immunology","name":"Immune system"},
{"section":"Option","name":"Option D — Human physiology (or chosen option)"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','Biology',NULL,'[
{"section":"Cell Biology","name":"Cell theory and cell structure"},
{"section":"Cell Biology","name":"Membrane structure and transport"},
{"section":"Cell Biology","name":"Cell division — mitosis"},
{"section":"Molecular Biology","name":"Biological molecules and metabolism"},
{"section":"Molecular Biology","name":"DNA structure, replication and gene expression"},
{"section":"Molecular Biology","name":"Cellular respiration"},
{"section":"Molecular Biology","name":"Photosynthesis"},
{"section":"Genetics","name":"Inheritance and meiosis"},
{"section":"Ecology","name":"Ecosystems and biodiversity"},
{"section":"Evolution","name":"Natural selection and evolution"},
{"section":"Human Physiology","name":"Digestion, circulation and gas exchange"},
{"section":"Human Physiology","name":"Neurons and hormones"},
{"section":"Option","name":"Option topic (chosen)"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','Chemistry',NULL,'[
{"section":"Stoichiometry","name":"Stoichiometric relationships"},
{"section":"Atomic Structure","name":"Atomic structure"},
{"section":"Periodicity","name":"Periodicity"},
{"section":"Bonding","name":"Chemical bonding and structure"},
{"section":"Energetics","name":"Energetics and thermochemistry"},
{"section":"Kinetics","name":"Chemical kinetics"},
{"section":"Equilibrium","name":"Equilibrium"},
{"section":"Acids & Bases","name":"Acids and bases"},
{"section":"Redox","name":"Redox reactions"},
{"section":"Organic","name":"Organic chemistry"},
{"section":"Measurement","name":"Measurement and data processing"},
{"section":"AHL — Structure","name":"Advanced bonding and molecular structure"},
{"section":"AHL — Energetics","name":"Further energetics (Hess, Born-Haber)"},
{"section":"AHL — Kinetics","name":"Rate equations and mechanisms"},
{"section":"AHL — Equilibrium","name":"Further equilibrium (Kc, Kp)"},
{"section":"AHL — Acids","name":"Further acids and bases — pH, buffers"},
{"section":"AHL — Redox","name":"Electrochemical cells"},
{"section":"AHL — Organic","name":"Further organic — mechanisms and NMR"},
{"section":"Option","name":"Option topic (chosen)"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','Chemistry',NULL,'[
{"section":"Core","name":"Stoichiometric relationships"},
{"section":"Core","name":"Atomic structure"},
{"section":"Core","name":"Periodicity"},
{"section":"Core","name":"Chemical bonding and structure"},
{"section":"Core","name":"Energetics and thermochemistry"},
{"section":"Core","name":"Chemical kinetics"},
{"section":"Core","name":"Equilibrium"},
{"section":"Core","name":"Acids and bases"},
{"section":"Core","name":"Redox reactions"},
{"section":"Core","name":"Organic chemistry"},
{"section":"Core","name":"Measurement and data processing"},
{"section":"Option","name":"Option topic (chosen)"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','Physics',NULL,'[
{"section":"Measurements","name":"Measurement and uncertainties"},
{"section":"Mechanics","name":"Mechanics — kinematics"},
{"section":"Mechanics","name":"Forces and Newton''s laws"},
{"section":"Mechanics","name":"Work, energy and power"},
{"section":"Mechanics","name":"Momentum and impulse"},
{"section":"Thermal","name":"Thermal physics — temperature and heat"},
{"section":"Thermal","name":"Ideal gas model"},
{"section":"Waves","name":"Waves — oscillations and travelling waves"},
{"section":"Waves","name":"Wave phenomena (reflection, refraction, interference)"},
{"section":"Waves","name":"Standing waves"},
{"section":"Electricity","name":"Electric fields"},
{"section":"Electricity","name":"Magnetic fields"},
{"section":"Electricity","name":"Electromagnetic induction"},
{"section":"Electricity","name":"D.C. circuits"},
{"section":"Circular Motion","name":"Circular motion and gravitation"},
{"section":"Atomic","name":"Atomic, nuclear and particle physics"},
{"section":"Atomic","name":"Energy production"},
{"section":"AHL — Mechanics","name":"Rotational mechanics (HL)"},
{"section":"AHL — Thermal","name":"Thermodynamics (HL)"},
{"section":"AHL — EM","name":"Fields and forces — advanced (HL)"},
{"section":"AHL — Quantum","name":"Wave-particle duality (HL)"},
{"section":"AHL — Nuclear","name":"Further nuclear physics (HL)"},
{"section":"Option","name":"Option topic (chosen)"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','Physics',NULL,'[
{"section":"Core","name":"Measurement and uncertainties"},
{"section":"Core","name":"Mechanics"},
{"section":"Core","name":"Thermal physics"},
{"section":"Core","name":"Waves"},
{"section":"Core","name":"Electricity and magnetism"},
{"section":"Core","name":"Circular motion and gravitation"},
{"section":"Core","name":"Atomic, nuclear and particle physics"},
{"section":"Core","name":"Energy production"},
{"section":"Option","name":"Option topic (chosen)"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','Computer Science',NULL,'[
{"section":"Systems","name":"System fundamentals"},
{"section":"Systems","name":"Computer organisation"},
{"section":"Systems","name":"Networks"},
{"section":"Systems","name":"Computational thinking and problem-solving"},
{"section":"Programming","name":"Abstract data structures"},
{"section":"Programming","name":"Resource management"},
{"section":"Programming","name":"Control"},
{"section":"Option","name":"Database systems (or chosen option)"},
{"section":"HL Extension","name":"Further OOP concepts"},
{"section":"HL Extension","name":"Advanced algorithms and data structures"},
{"section":"HL Extension","name":"Abstract data types — stacks, queues, graphs"},
{"section":"HL Extension","name":"Resource management — advanced"},
{"section":"Project","name":"Internal assessment — software project"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','Computer Science',NULL,'[
{"section":"Systems","name":"System fundamentals"},
{"section":"Systems","name":"Computer organisation"},
{"section":"Systems","name":"Networks"},
{"section":"Systems","name":"Computational thinking and problem-solving"},
{"section":"Option","name":"Option topic (chosen)"},
{"section":"Project","name":"Internal assessment — solution development"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','Environmental Systems & Societies',NULL,'[
{"section":"Core","name":"Foundations of ESS"},
{"section":"Core","name":"Ecosystems and ecology"},
{"section":"Core","name":"Biodiversity and conservation"},
{"section":"Core","name":"Water and aquatic food production systems"},
{"section":"Core","name":"Soil systems and terrestrial food production"},
{"section":"Core","name":"Atmospheric systems and societies"},
{"section":"Core","name":"Climate change and energy production"},
{"section":"Core","name":"Human systems and resource use"},
{"section":"Assessment","name":"Internal assessment — fieldwork investigation"}
]'::jsonb, 'SL'),

-- ── IB Group 5: Mathematics ───────────────────────────────
('IB Diploma','IB','IB','Mathematics: Analysis & Approaches',NULL,'[
{"section":"Topic 1","name":"Number and algebra — sequences, series and proofs"},
{"section":"Topic 1","name":"Number and algebra — complex numbers (HL)"},
{"section":"Topic 2","name":"Functions — properties, graphs and transformations"},
{"section":"Topic 2","name":"Functions — inverse and composite"},
{"section":"Topic 3","name":"Geometry and trigonometry — 3D shapes and vectors"},
{"section":"Topic 3","name":"Geometry and trigonometry — trigonometric functions"},
{"section":"Topic 3","name":"Geometry and trigonometry — complex numbers in polar form (HL)"},
{"section":"Topic 4","name":"Statistics and probability — distributions"},
{"section":"Topic 4","name":"Statistics and probability — hypothesis testing"},
{"section":"Topic 5","name":"Calculus — differentiation"},
{"section":"Topic 5","name":"Calculus — integration"},
{"section":"Topic 5","name":"Calculus — differential equations"},
{"section":"HL Extension","name":"HL: Proof by induction and contradiction"},
{"section":"HL Extension","name":"HL: Further complex numbers"},
{"section":"HL Extension","name":"HL: Riemann sums and further integration"},
{"section":"HL Extension","name":"HL: Series convergence and Maclaurin"},
{"section":"HL Extension","name":"HL: Further differential equations"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','Mathematics: Analysis & Approaches',NULL,'[
{"section":"Topic 1","name":"Number and algebra"},
{"section":"Topic 2","name":"Functions"},
{"section":"Topic 3","name":"Geometry and trigonometry"},
{"section":"Topic 4","name":"Statistics and probability"},
{"section":"Topic 5","name":"Calculus — differentiation and integration"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','Mathematics: Applications & Interpretation',NULL,'[
{"section":"Topic 1","name":"Number and algebra — financial mathematics"},
{"section":"Topic 1","name":"Number and algebra — sequences, series, matrices (HL)"},
{"section":"Topic 2","name":"Functions — modelling with functions"},
{"section":"Topic 2","name":"Functions — logarithmic models"},
{"section":"Topic 3","name":"Geometry and trigonometry — 3D measurement"},
{"section":"Topic 3","name":"Geometry and trigonometry — Voronoi diagrams (HL)"},
{"section":"Topic 4","name":"Statistics — descriptive statistics and regression"},
{"section":"Topic 4","name":"Statistics — probability distributions"},
{"section":"Topic 4","name":"Statistics — hypothesis testing and chi-squared"},
{"section":"Topic 5","name":"Calculus — differentiation for optimisation"},
{"section":"Topic 5","name":"Calculus — integration for area and volume"},
{"section":"Topic 5","name":"Calculus — differential equations (HL)"},
{"section":"HL Extension","name":"HL: Matrices and eigenvalues"},
{"section":"HL Extension","name":"HL: Markov chains"},
{"section":"HL Extension","name":"HL: Graph theory"},
{"section":"HL Extension","name":"HL: Further calculus"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','Mathematics: Applications & Interpretation',NULL,'[
{"section":"Topic 1","name":"Number and algebra — financial mathematics"},
{"section":"Topic 2","name":"Functions — modelling with functions"},
{"section":"Topic 3","name":"Geometry and trigonometry"},
{"section":"Topic 4","name":"Statistics — regression, probability and hypothesis testing"},
{"section":"Topic 5","name":"Calculus — differentiation and integration"}
]'::jsonb, 'SL'),

-- ── IB Group 6: The Arts ──────────────────────────────────
('IB Diploma','IB','IB','Visual Arts',NULL,'[
{"section":"Comparative Study","name":"Comparative study — formal qualities and meaning"},
{"section":"Comparative Study","name":"Comparative study — cultural contexts"},
{"section":"Process Portfolio","name":"Explorations and investigations"},
{"section":"Process Portfolio","name":"Technical experimentation"},
{"section":"Process Portfolio","name":"Development of a body of work"},
{"section":"Exhibition","name":"Curatorial rationale"},
{"section":"Exhibition","name":"Exhibition — resolved artworks (8–11 pieces HL, 4–7 SL)"},
{"section":"Exhibition","name":"Artworks justification texts"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','Visual Arts',NULL,'[
{"section":"Comparative Study","name":"Comparative study of artworks"},
{"section":"Process Portfolio","name":"Explorations and development"},
{"section":"Exhibition","name":"Exhibition — resolved artworks (4–7 pieces)"},
{"section":"Exhibition","name":"Curatorial rationale"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','Music',NULL,'[
{"section":"Exploring Music","name":"Listening and responding to music"},
{"section":"Exploring Music","name":"Music in context — historical and cultural"},
{"section":"Creating Music","name":"Composition — solo"},
{"section":"Creating Music","name":"Composition — collaboration (HL)"},
{"section":"Presenting Music","name":"Performance — solo"},
{"section":"Presenting Music","name":"Performance — group"},
{"section":"Assessment","name":"External — musical links investigation"},
{"section":"Assessment","name":"Internal — creating and performing portfolio"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','Music',NULL,'[
{"section":"Exploring Music","name":"Listening and responding to music"},
{"section":"Exploring Music","name":"Music in context"},
{"section":"Creating Music","name":"Composition"},
{"section":"Presenting Music","name":"Performance"},
{"section":"Assessment","name":"Musical links investigation"},
{"section":"Assessment","name":"Creating and performing portfolio"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','Theatre',NULL,'[
{"section":"Research","name":"Theatre in context — global theatre practices"},
{"section":"Research","name":"Collaborative project: world theatre"},
{"section":"Collaboration","name":"Collaborative project research workbook"},
{"section":"Collaboration","name":"Collaborative production role"},
{"section":"Solo","name":"Solo theatre piece based on a practitioner"},
{"section":"Direction","name":"Directing a scene (HL only)"},
{"section":"Assessment","name":"Presentation — direct theatre"},
{"section":"Assessment","name":"Practical performance examination"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','Theatre',NULL,'[
{"section":"Research","name":"Theatre in context — global theatre practices"},
{"section":"Collaboration","name":"Collaborative project research and production"},
{"section":"Solo","name":"Solo theatre piece based on a practitioner"},
{"section":"Assessment","name":"Presentation and practical performance"}
]'::jsonb, 'SL'),

('IB Diploma','IB','IB','Film',NULL,'[
{"section":"Core","name":"Film history and theory"},
{"section":"Core","name":"Film language and elements of style"},
{"section":"Core","name":"Textual analysis of films"},
{"section":"Core","name":"Comparative study of world cinema"},
{"section":"Production","name":"Film production portfolio"},
{"section":"Production","name":"Collaborative film production (HL only)"},
{"section":"Assessment","name":"Textual analysis examination"},
{"section":"Assessment","name":"Production portfolio submission"}
]'::jsonb, 'SL'),

-- ── IB Core ───────────────────────────────────────────────
('IB Diploma','IB','IB','Theory of Knowledge (TOK)',NULL,'[
{"section":"Knowledge and the Knower","name":"Personal knowledge vs shared knowledge"},
{"section":"Knowledge and the Knower","name":"Perspectives and biases"},
{"section":"Knowledge Framework","name":"Natural sciences — methods and scope"},
{"section":"Knowledge Framework","name":"Human sciences — methodology"},
{"section":"Knowledge Framework","name":"History — evidence and interpretation"},
{"section":"Knowledge Framework","name":"The arts — meaning and perception"},
{"section":"Knowledge Framework","name":"Mathematics — certainty and proof"},
{"section":"Knowledge Framework","name":"Ethics — moral knowledge"},
{"section":"Knowledge Questions","name":"Crafting knowledge questions"},
{"section":"Exhibition","name":"TOK exhibition — real-life objects and KQs"},
{"section":"Essay","name":"TOK essay — prescribed title"}
]'::jsonb, 'Core'),

('IB Diploma','IB','IB','Extended Essay (EE)',NULL,'[
{"section":"Process","name":"Choosing a subject and research question"},
{"section":"Process","name":"Background reading and literature review"},
{"section":"Process","name":"Research methodology"},
{"section":"Process","name":"Data collection and analysis"},
{"section":"Process","name":"Structuring the argument"},
{"section":"Process","name":"Writing the 4,000-word essay"},
{"section":"Process","name":"Reflection and supervisor meetings"},
{"section":"Assessment","name":"Evaluation by IB examiner (A–E grade)"},
{"section":"Assessment","name":"Viva voce (reflection interview)"}
]'::jsonb, 'Core'),

('IB Diploma','IB','IB','Creativity Activity Service (CAS)',NULL,'[
{"section":"Creativity","name":"Creative activities (arts, design, drama)"},
{"section":"Activity","name":"Physical activities and sport"},
{"section":"Service","name":"Community service and volunteering"},
{"section":"Reflection","name":"CAS experiences and reflections"},
{"section":"Project","name":"CAS project — sustained collaborative activity"},
{"section":"Learning Outcomes","name":"LO1: Strength and growth — self-awareness"},
{"section":"Learning Outcomes","name":"LO2: Challenge and new skills"},
{"section":"Learning Outcomes","name":"LO3: Initiative and planning"},
{"section":"Learning Outcomes","name":"LO4: Working collaboratively"},
{"section":"Learning Outcomes","name":"LO5: Showing perseverance"},
{"section":"Learning Outcomes","name":"LO6: Global engagement"},
{"section":"Learning Outcomes","name":"LO7: Recognising ethical implications"}
]'::jsonb, 'Core');
