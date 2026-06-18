-- ============================================================
-- MIGRATION 004: Exam codes, missing IB subjects, topic expansion
-- Run AFTER migration_002
-- ============================================================

-- ============================================================
-- FIX 1: UPDATE subject_code for all subjects with NULL code
-- ============================================================

-- A LEVEL · EDEXCEL
UPDATE syllabus_templates SET subject_code = '9MA0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'Mathematics';
UPDATE syllabus_templates SET subject_code = '9FM0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'Further Mathematics';
UPDATE syllabus_templates SET subject_code = '9PH0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'Physics';
UPDATE syllabus_templates SET subject_code = '9CH0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'Chemistry';
UPDATE syllabus_templates SET subject_code = '9BI0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'Biology';
UPDATE syllabus_templates SET subject_code = '9EC0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'Economics A';
UPDATE syllabus_templates SET subject_code = '9BS0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'Business';
UPDATE syllabus_templates SET subject_code = '9PS0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'Psychology';
UPDATE syllabus_templates SET subject_code = '9AC0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'Accounting';
UPDATE syllabus_templates SET subject_code = '9EN0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'English Language';
UPDATE syllabus_templates SET subject_code = '9ET0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'English Literature';
UPDATE syllabus_templates SET subject_code = '9HI0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'History';
UPDATE syllabus_templates SET subject_code = '9GE0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'Geography';
UPDATE syllabus_templates SET subject_code = '9SO0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'Sociology';
UPDATE syllabus_templates SET subject_code = '9LW0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'Law';
UPDATE syllabus_templates SET subject_code = '9PL0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'Politics';
UPDATE syllabus_templates SET subject_code = '9AD0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'Art & Design';
UPDATE syllabus_templates SET subject_code = '9CS0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'Computer Science';
UPDATE syllabus_templates SET subject_code = '9PE0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'Physical Education';
UPDATE syllabus_templates SET subject_code = '9MU0' WHERE qualification = 'A Level' AND board = 'edexcel_alevel' AND subject_name = 'Music';

-- A LEVEL · CAMBRIDGE
UPDATE syllabus_templates SET subject_code = '9709' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Mathematics';
UPDATE syllabus_templates SET subject_code = '9231' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Further Mathematics';
UPDATE syllabus_templates SET subject_code = '9702' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Physics';
UPDATE syllabus_templates SET subject_code = '9701' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Chemistry';
UPDATE syllabus_templates SET subject_code = '9700' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Biology';
UPDATE syllabus_templates SET subject_code = '9708' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Economics';
UPDATE syllabus_templates SET subject_code = '9609' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Business';
UPDATE syllabus_templates SET subject_code = '9706' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Accounting';
UPDATE syllabus_templates SET subject_code = '9699' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Sociology';
UPDATE syllabus_templates SET subject_code = '9489' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'History';
UPDATE syllabus_templates SET subject_code = '9696' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Geography';
UPDATE syllabus_templates SET subject_code = '9093' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'English Language';
UPDATE syllabus_templates SET subject_code = '9695' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'English Literature';
UPDATE syllabus_templates SET subject_code = '9084' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Law';
UPDATE syllabus_templates SET subject_code = '9618' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Computer Science';
UPDATE syllabus_templates SET subject_code = '9990' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Psychology';
UPDATE syllabus_templates SET subject_code = '9396' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Physical Education';
UPDATE syllabus_templates SET subject_code = '9483' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Music';
UPDATE syllabus_templates SET subject_code = '9479' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Art & Design';
UPDATE syllabus_templates SET subject_code = '9395' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Travel & Tourism';
UPDATE syllabus_templates SET subject_code = '9693' WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Marine Science';

-- AS LEVEL · EDEXCEL
UPDATE syllabus_templates SET subject_code = '8MA0' WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'Mathematics';
UPDATE syllabus_templates SET subject_code = '8PH0' WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'Physics';
UPDATE syllabus_templates SET subject_code = '8CH0' WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'Chemistry';
UPDATE syllabus_templates SET subject_code = '8BI0' WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'Biology';
UPDATE syllabus_templates SET subject_code = '8EC0' WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'Economics';
UPDATE syllabus_templates SET subject_code = '8BS0' WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'Business';
UPDATE syllabus_templates SET subject_code = '8PS0' WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'Psychology';
UPDATE syllabus_templates SET subject_code = '8AC0' WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'Accounting';
UPDATE syllabus_templates SET subject_code = '8EN0' WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'English Language';
UPDATE syllabus_templates SET subject_code = '8HI0' WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'History';
UPDATE syllabus_templates SET subject_code = '8GE0' WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'Geography';
UPDATE syllabus_templates SET subject_code = '8SO0' WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'Sociology';
UPDATE syllabus_templates SET subject_code = '8CS0' WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'Computer Science';

-- AS LEVEL · CAMBRIDGE (same qualification codes as A Level Cambridge — AS is year 1)
UPDATE syllabus_templates SET subject_code = '9709' WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'Mathematics';
UPDATE syllabus_templates SET subject_code = '9702' WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'Physics';
UPDATE syllabus_templates SET subject_code = '9701' WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'Chemistry';
UPDATE syllabus_templates SET subject_code = '9700' WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'Biology';
UPDATE syllabus_templates SET subject_code = '9708' WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'Economics';
UPDATE syllabus_templates SET subject_code = '9609' WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'Business';
UPDATE syllabus_templates SET subject_code = '9706' WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'Accounting';
UPDATE syllabus_templates SET subject_code = '9489' WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'History';
UPDATE syllabus_templates SET subject_code = '9696' WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'Geography';
UPDATE syllabus_templates SET subject_code = '9093' WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'English Language';
UPDATE syllabus_templates SET subject_code = '9699' WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'Sociology';
UPDATE syllabus_templates SET subject_code = '9618' WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'Computer Science';
UPDATE syllabus_templates SET subject_code = '9084' WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'Law';
UPDATE syllabus_templates SET subject_code = '9990' WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'Psychology';

-- EDEXCEL IGCSE missing codes
UPDATE syllabus_templates SET subject_code = '4GE1' WHERE qualification = 'IGCSE / O Level' AND board = 'edexcel_igcse' AND subject_name = 'Geography';
UPDATE syllabus_templates SET subject_code = '4CP1' WHERE qualification = 'IGCSE / O Level' AND board = 'edexcel_igcse' AND subject_name = 'Computer Science';
UPDATE syllabus_templates SET subject_code = '4AD1' WHERE qualification = 'IGCSE / O Level' AND board = 'edexcel_igcse' AND subject_name = 'Art & Design';
UPDATE syllabus_templates SET subject_code = '4PE1' WHERE qualification = 'IGCSE / O Level' AND board = 'edexcel_igcse' AND subject_name = 'Physical Education';
UPDATE syllabus_templates SET subject_code = '4ET1' WHERE qualification = 'IGCSE / O Level' AND board = 'edexcel_igcse' AND subject_name = 'English Literature';
UPDATE syllabus_templates SET subject_code = '4HI1' WHERE qualification = 'IGCSE / O Level' AND board = 'edexcel_igcse' AND subject_name = 'History';

-- IB DIPLOMA — all subjects
UPDATE syllabus_templates SET subject_code = 'IB-BIO-HL'        WHERE board = 'IB' AND subject_name = 'Biology'                            AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-BIO-SL'        WHERE board = 'IB' AND subject_name = 'Biology'                            AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-PHYS-HL'       WHERE board = 'IB' AND subject_name = 'Physics'                            AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-PHYS-SL'       WHERE board = 'IB' AND subject_name = 'Physics'                            AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-CHEM-HL'       WHERE board = 'IB' AND subject_name = 'Chemistry'                          AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-CHEM-SL'       WHERE board = 'IB' AND subject_name = 'Chemistry'                          AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-MATH-AA-HL'    WHERE board = 'IB' AND subject_name = 'Mathematics: Analysis & Approaches'  AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-MATH-AA-SL'    WHERE board = 'IB' AND subject_name = 'Mathematics: Analysis & Approaches'  AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-MATH-AI-HL'    WHERE board = 'IB' AND subject_name = 'Mathematics: Applications & Interpretation' AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-MATH-AI-SL'    WHERE board = 'IB' AND subject_name = 'Mathematics: Applications & Interpretation' AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-ECON-HL'       WHERE board = 'IB' AND subject_name = 'Economics'                          AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-ECON-SL'       WHERE board = 'IB' AND subject_name = 'Economics'                          AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-HIST-HL'       WHERE board = 'IB' AND subject_name = 'History'                            AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-HIST-SL'       WHERE board = 'IB' AND subject_name = 'History'                            AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-GEO-HL'        WHERE board = 'IB' AND subject_name = 'Geography'                          AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-GEO-SL'        WHERE board = 'IB' AND subject_name = 'Geography'                          AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-PSYCH-HL'      WHERE board = 'IB' AND subject_name = 'Psychology'                         AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-PSYCH-SL'      WHERE board = 'IB' AND subject_name = 'Psychology'                         AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-BM-HL'         WHERE board = 'IB' AND subject_name = 'Business Management'                AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-BM-SL'         WHERE board = 'IB' AND subject_name = 'Business Management'                AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-CS-HL'         WHERE board = 'IB' AND subject_name = 'Computer Science'                   AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-CS-SL'         WHERE board = 'IB' AND subject_name = 'Computer Science'                   AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-ENG-A-LIT-HL'  WHERE board = 'IB' AND subject_name = 'English A Literature'               AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-ENG-A-LIT-SL'  WHERE board = 'IB' AND subject_name = 'English A Literature'               AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-ENG-A-LL-HL'   WHERE board = 'IB' AND subject_name = 'English A Language & Literature'    AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-ENG-A-LL-SL'   WHERE board = 'IB' AND subject_name = 'English A Language & Literature'    AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-ENG-B-HL'      WHERE board = 'IB' AND subject_name = 'English B'                          AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-ENG-B-SL'      WHERE board = 'IB' AND subject_name = 'English B'                          AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-FR-B-HL'       WHERE board = 'IB' AND subject_name = 'French B'                           AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-FR-B-SL'       WHERE board = 'IB' AND subject_name = 'French B'                           AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-ES-B-SL'       WHERE board = 'IB' AND subject_name = 'Spanish B'                          AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-BN-B-SL'       WHERE board = 'IB' AND subject_name = 'Bangla B'                           AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-BN-A-LIT-SL'   WHERE board = 'IB' AND subject_name = 'Bangla A Literature'                AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-PHIL-SL'       WHERE board = 'IB' AND subject_name = 'Philosophy'                         AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-GP-HL'         WHERE board = 'IB' AND subject_name = 'Global Politics'                    AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-GP-SL'         WHERE board = 'IB' AND subject_name = 'Global Politics'                    AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-VA-HL'         WHERE board = 'IB' AND subject_name = 'Visual Arts'                        AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-VA-SL'         WHERE board = 'IB' AND subject_name = 'Visual Arts'                        AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-MU-HL'         WHERE board = 'IB' AND subject_name = 'Music'                              AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-MU-SL'         WHERE board = 'IB' AND subject_name = 'Music'                              AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-TH-HL'         WHERE board = 'IB' AND subject_name = 'Theatre'                            AND level = 'HL';
UPDATE syllabus_templates SET subject_code = 'IB-TH-SL'         WHERE board = 'IB' AND subject_name = 'Theatre'                            AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-FILM-SL'       WHERE board = 'IB' AND subject_name = 'Film'                               AND level = 'SL';
UPDATE syllabus_templates SET subject_code = 'IB-TOK'           WHERE board = 'IB' AND subject_name = 'Theory of Knowledge (TOK)';
UPDATE syllabus_templates SET subject_code = 'IB-EE'            WHERE board = 'IB' AND subject_name = 'Extended Essay (EE)';
UPDATE syllabus_templates SET subject_code = 'IB-CAS'           WHERE board = 'IB' AND subject_name = 'Creativity Activity Service (CAS)';
UPDATE syllabus_templates SET subject_code = 'IB-ESS-SL'        WHERE board = 'IB' AND subject_name = 'Environmental Systems & Societies';

-- ============================================================
-- FIX 2: INSERT missing IB subjects — Spanish B HL and Film HL
-- ============================================================

INSERT INTO syllabus_templates (qualification, exam_board, board, subject_name, subject_code, topics, level) VALUES

('IB Diploma','IB','IB','Spanish B','IB-ES-B-HL','[
{"section":"Identities","name":"Identidad personal y cultural"},
{"section":"Experiences","name":"Vida cotidiana y ocio"},
{"section":"Human Ingenuity","name":"Ciencia y creatividad"},
{"section":"Social Organisation","name":"Organización social"},
{"section":"Sharing the Planet","name":"Medio ambiente y derechos"},
{"section":"Literature","name":"Textos literarios (HL: 2 obras)"},
{"section":"Assessment","name":"Paper 1 — comprensión"},
{"section":"Assessment","name":"Paper 2 — producción escrita"},
{"section":"Assessment","name":"Oral individual"},
{"section":"HL Extension","name":"Advanced oral skills"},
{"section":"HL Extension","name":"HL written tasks"},
{"section":"HL Extension","name":"Intertextuality and culture"}
]'::jsonb, 'HL'),

('IB Diploma','IB','IB','Film','IB-FILM-HL','[
{"section":"Core","name":"Film history and theory"},
{"section":"Core","name":"Film language and elements of style"},
{"section":"Core","name":"Textual analysis of films"},
{"section":"Core","name":"Comparative study of world cinema"},
{"section":"Production","name":"Film production portfolio"},
{"section":"Production","name":"Collaborative film production"},
{"section":"Assessment","name":"Textual analysis examination"},
{"section":"Assessment","name":"Production portfolio submission"},
{"section":"HL Extension","name":"Collaborative film project"},
{"section":"HL Extension","name":"Advanced film theory"},
{"section":"HL Extension","name":"Comparative world cinema study"}
]'::jsonb, 'HL');

-- ============================================================
-- FIX 4: Expand thin subjects (< 8 topics) to minimum 8
-- ============================================================

-- AS Level Edexcel Economics (5 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Microeconomics","name":"The economics of the firm — costs and revenues"},
{"section":"Microeconomics","name":"Market structures — monopoly to perfect competition"},
{"section":"Labour","name":"Labour market and wage determination"}
]'::jsonb
WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'Economics';

-- AS Level Edexcel Psychology (5 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Approaches","name":"Approaches in psychology — biological and behaviourist"},
{"section":"Development","name":"Attachment and early relationships"},
{"section":"Research","name":"Statistical testing and inferential analysis"}
]'::jsonb
WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'Psychology';

-- AS Level Edexcel History (4 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Period Study","name":"Elizabeth I — foreign policy and challenges"},
{"section":"Period Study","name":"The Reformation in England — Henry to Elizabeth"},
{"section":"Period Study","name":"The Civil War and Interregnum (1640–1660)"},
{"section":"Skills","name":"Historical interpretation and analytical skills"}
]'::jsonb
WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'History';

-- AS Level Edexcel Geography (5 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Physical","name":"Coastal landscape systems"},
{"section":"Physical","name":"Water cycle and water insecurity"},
{"section":"Physical","name":"Carbon cycle and energy security"}
]'::jsonb
WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'Geography';

-- AS Level Edexcel Sociology (4 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Crime","name":"Crime and deviance — theories and explanations"},
{"section":"Beliefs","name":"Religion and its role in society"},
{"section":"Inequality","name":"Social inequality and stratification"},
{"section":"Media","name":"Mass media and its influence"}
]'::jsonb
WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'Sociology';

-- AS Level Edexcel Computer Science (6 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Data","name":"Databases and SQL"},
{"section":"Theory","name":"Computational methods and problem decomposition"}
]'::jsonb
WHERE qualification = 'AS Level' AND board = 'edexcel_alevel' AND subject_name = 'Computer Science';

-- AS Level Cambridge Economics (5 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Microeconomics","name":"Theory of the firm — market structures"},
{"section":"Microeconomics","name":"Factor markets and labour"},
{"section":"International","name":"The open economy — trade and exchange rates"}
]'::jsonb
WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'Economics';

-- AS Level Cambridge Business (5 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Core","name":"Business organisation, structure and ownership"},
{"section":"Core","name":"Entrepreneurship and business planning"},
{"section":"Core","name":"Financial decision-making and investment appraisal"}
]'::jsonb
WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'Business';

-- AS Level Cambridge History (3 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Modern World","name":"Causes and consequences of the First World War"},
{"section":"Modern World","name":"The rise of authoritarian states in Europe"},
{"section":"Modern World","name":"Decolonisation and independence movements"},
{"section":"Modern World","name":"Cold War origins and early confrontations"},
{"section":"Skills","name":"Historical investigation skills — evidence and argument"}
]'::jsonb
WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'History';

-- AS Level Cambridge English Language (4 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Core","name":"Spoken and written language — differences and features"},
{"section":"Core","name":"Language and power"},
{"section":"Core","name":"Discourse and pragmatics"},
{"section":"Core","name":"Grammar in context"}
]'::jsonb
WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'English Language';

-- AS Level Cambridge Sociology (4 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Core","name":"Crime and deviance"},
{"section":"Core","name":"Social inequality — class, gender and ethnicity"},
{"section":"Core","name":"Religion and belief systems"},
{"section":"Core","name":"Theoretical perspectives in sociology"}
]'::jsonb
WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'Sociology';

-- AS Level Cambridge Computer Science (6 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Data","name":"Databases and data management"},
{"section":"Programming","name":"Object-oriented programming"}
]'::jsonb
WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'Computer Science';

-- AS Level Cambridge Law (6 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Tort Law","name":"Negligence and occupiers'' liability"},
{"section":"Jurisprudence","name":"Law and society — justice and morality"}
]'::jsonb
WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'Law';

-- AS Level Cambridge Psychology (5 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Applications","name":"Criminological psychology"},
{"section":"Applications","name":"Health and clinical psychology"},
{"section":"Issues","name":"Psychology and ethics"}
]'::jsonb
WHERE qualification = 'AS Level' AND board = 'cambridge_alevel' AND subject_name = 'Psychology';

-- Cambridge IGCSE Economics (6 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Core","name":"Demand and supply — analysis and shifts"},
{"section":"Core","name":"Price elasticity of demand and supply"}
]'::jsonb
WHERE qualification = 'IGCSE / O Level' AND board = 'cambridge_igcse' AND subject_name = 'Economics';

-- Cambridge IGCSE Business Studies (6 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Core","name":"Business growth, size and ownership"},
{"section":"Core","name":"Stakeholders and business ethics"}
]'::jsonb
WHERE qualification = 'IGCSE / O Level' AND board = 'cambridge_igcse' AND subject_name = 'Business Studies';

-- Cambridge O Level History (5 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Paper 2","name":"World War II — key events and turning points"},
{"section":"Paper 2","name":"The Cold War — origins and development 1945–1962"},
{"section":"Skills","name":"Post-war world — decolonisation and independence"}
]'::jsonb
WHERE qualification = 'IGCSE / O Level' AND board = 'o_level' AND subject_name = 'History';

-- Edexcel IGCSE History (5 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Paper 1","name":"Weimar Republic — rise and fall (1919–1933)"},
{"section":"Paper 2","name":"Superpower rivalry and proxy conflicts"},
{"section":"Skills","name":"Historical enquiry skills — extended writing and argument"}
]'::jsonb
WHERE qualification = 'IGCSE / O Level' AND board = 'edexcel_igcse' AND subject_name = 'History';

-- Edexcel IGCSE English Literature (4 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Skills","name":"Close reading and textual evidence"},
{"section":"Skills","name":"Character, theme and structure analysis"},
{"section":"Context","name":"Historical and cultural context of set texts"},
{"section":"Skills","name":"Comparative analytical essay writing"}
]'::jsonb
WHERE qualification = 'IGCSE / O Level' AND board = 'edexcel_igcse' AND subject_name = 'English Literature';

-- Edexcel IGCSE Art & Design (6 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Core","name":"Critical and contextual studies — artists and movements"},
{"section":"Core","name":"Evaluation and reflection on creative process"}
]'::jsonb
WHERE qualification = 'IGCSE / O Level' AND board = 'edexcel_igcse' AND subject_name = 'Art & Design';

-- A Level Cambridge Art & Design (7 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Component 1","name":"Critical studies — analysing and evaluating art and design"}
]'::jsonb
WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'Art & Design';

-- A Level Cambridge History (7 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Skills","name":"Historical skills — using and evaluating source material"}
]'::jsonb
WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'History';

-- A Level Cambridge English Literature (7 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Coursework","name":"Literary theory and critical approaches"}
]'::jsonb
WHERE qualification = 'A Level' AND board = 'cambridge_alevel' AND subject_name = 'English Literature';

-- IB Visual Arts SL (4 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Comparative Study","name":"Artist research and cultural context"},
{"section":"Process Portfolio","name":"Technical skill development in chosen media"},
{"section":"Process Portfolio","name":"Personal visual inquiry — sustained investigation"},
{"section":"Exhibition","name":"Critical reflection and self-evaluation"}
]'::jsonb
WHERE board = 'IB' AND subject_name = 'Visual Arts' AND level = 'SL';

-- IB Theatre SL (4 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Research","name":"Theatre-making forms and conventions"},
{"section":"Collaboration","name":"Collaborative rehearsal and devising process"},
{"section":"Solo","name":"Solo practitioner research and application"},
{"section":"Direction","name":"Production design — space, light and sound"}
]'::jsonb
WHERE board = 'IB' AND subject_name = 'Theatre' AND level = 'SL';

-- IB Bangla A Literature SL (6 → 8)
UPDATE syllabus_templates SET topics = topics || '[
{"section":"Skills","name":"Stylistic analysis — language and literary form"},
{"section":"Context","name":"Contextual reading — social and historical background"}
]'::jsonb
WHERE board = 'IB' AND subject_name = 'Bangla A Literature' AND level = 'SL';
