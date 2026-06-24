const fs = require('fs');

const obgynTopics = [
  {
    id: 'antenatal',
    name: 'Normal Pregnancy & Antenatal Care',
    syllabusRef: 'Phase IV OB/GYN',
    section: 'Obstetrics',
    description: 'Antenatal care monitors maternal and fetal wellbeing. Physiological changes include increased plasma volume (dilutional anemia), increased cardiac output, and a hypercoagulable state. The booking visit occurs around 10-12 weeks for history, BMI, BP, and bloods (FBC, blood group/antibodies, syphilis, HIV, Hep B). Ultrasound dating scan at 11-14 weeks, anomaly scan at 18-20 weeks. Symphysis-fundal height (SFH) should equal gestational age in weeks (+/- 2cm) from 24 weeks.',
    svgKey: 'mbbs-obgyn-antenatal',
    threejs3dFn: 'none',
    landmarks: ['Hypercoagulable state in pregnancy to prevent PPH', 'Booking visit at 10-12 weeks includes blood group, Rh, and infectious disease screening', 'Dating scan (11-14 weeks) uses Crown-Rump Length (CRL) for most accurate EDD', 'Symphysis-fundal height matches gestational age after 24 weeks'],
    examQA: [
      { q: 'Why is there a dilutional anemia in normal pregnancy?', a: 'Plasma volume increases by 50%, whereas red cell mass increases by only 20-30%. This disproportionate increase leads to hemodilution, causing a physiological drop in hemoglobin concentration.' },
      { q: 'What is the purpose of the 18-20 week anomaly scan?', a: 'To perform a detailed structural assessment of the fetus to detect congenital anomalies (e.g., neural tube defects, cardiac anomalies, cleft lip), confirm viability, check placental location, and assess amniotic fluid volume.' }
    ]
  },
  {
    id: 'labor',
    name: 'Normal Labor & Partogram',
    syllabusRef: 'Phase IV OB/GYN',
    section: 'Obstetrics',
    description: 'Labor consists of 3 stages. First stage: onset of regular painful contractions to full cervical dilation (latent phase <5cm, active phase >5cm). Second stage: full dilation to delivery of fetus. Third stage: delivery of fetus to delivery of placenta. Mechanism of labor involves engagement, descent, flexion, internal rotation, extension, restitution, and external rotation. The WHO partogram graphically tracks labor progress, plotting cervical dilation against time, with an alert line (1cm/hr) and an action line (4 hours to right).',
    svgKey: 'mbbs-obgyn-labor',
    threejs3dFn: 'none',
    landmarks: ['First stage of labor ends at 10cm full cervical dilation', 'Active phase defined as cervical dilation > 5cm, progressing at roughly 1cm/hour', 'Alert line on partogram indicates expected 1cm/hr progress; action line suggests need for intervention', 'Third stage duration is normally <30 minutes with active management'],
    examQA: [
      { q: 'What are the stages of normal labor?', a: 'First stage: Regular painful contractions leading to full cervical dilation (10cm). Second stage: From full cervical dilation to the birth of the baby. Third stage: From the birth of the baby to the complete expulsion of the placenta and membranes.' },
      { q: 'What is the significance of the Alert and Action lines on a WHO partogram?', a: 'The Alert line represents a cervical dilation rate of 1 cm/hour during the active phase. If the dilation curve crosses the Alert line, it indicates slow progress. If it crosses the Action line (4 hours to the right of the Alert line), it mandates active medical intervention (e.g., oxytocin augmentation, amniotomy, or Caesarean section).' }
    ]
  },
  {
    id: 'hypertension',
    name: 'Hypertensive Disorders',
    syllabusRef: 'Phase IV OB/GYN',
    section: 'Obstetrics',
    description: 'Preeclampsia is new-onset hypertension (BP >= 140/90) and proteinuria (or organ dysfunction) after 20 weeks gestation. Pathophysiology involves failure of spiral artery remodeling by trophoblasts, leading to placental ischemia and systemic endothelial dysfunction. Severe features: BP >= 160/110, severe headache, visual changes, right upper quadrant pain. Eclampsia is the occurrence of seizures. HELLP syndrome (Hemolysis, Elevated Liver enzymes, Low Platelets) is a severe variant. Management: delivery is definitive. Magnesium sulfate (MgSO4) is given for seizure prophylaxis/treatment.',
    svgKey: 'mbbs-obgyn-hypertension',
    threejs3dFn: 'none',
    landmarks: ['Preeclampsia: HTN + Proteinuria presenting AFTER 20 weeks gestation', 'Failure of normal trophoblastic invasion and spiral artery remodeling', 'HELLP: Hemolysis, Elevated Liver enzymes, Low Platelets', 'Magnesium Sulfate (MgSO4) is the drug of choice for eclampsia seizure control and prophylaxis'],
    examQA: [
      { q: 'What is the definitive treatment for severe preeclampsia?', a: 'The only definitive cure is the delivery of the fetus and placenta. Timing depends on gestational age and maternal/fetal condition; if >37 weeks, deliver immediately. If preterm, temporize with antihypertensives, MgSO4, and steroids (if <34 weeks), but deliver if maternal/fetal condition deteriorates.' },
      { q: 'What are the signs of Magnesium Sulfate toxicity and what is its antidote?', a: 'Signs of toxicity include loss of deep tendon reflexes (first sign), respiratory depression, and eventually cardiac arrest. The antidote is intravenous Calcium Gluconate.' }
    ]
  },
  {
    id: 'aph',
    name: 'Antepartum Hemorrhage',
    syllabusRef: 'Phase IV OB/GYN',
    section: 'Obstetrics',
    description: 'Antepartum hemorrhage (APH) is bleeding from the genital tract after 24 weeks gestation prior to delivery. Major causes are placenta previa and placental abruption. Placenta previa: placenta inserted in the lower uterine segment, presents with PAINLESS, bright red vaginal bleeding. Never do a digital vaginal exam without ultrasound localization first! Placental abruption: premature separation of a normally sited placenta, presents with PAINFUL, dark red bleeding and a woody, hard (couvelaire) uterus. Bleeding can be revealed or concealed.',
    svgKey: 'mbbs-obgyn-aph',
    threejs3dFn: 'none',
    landmarks: ['Placenta previa: PAINLESS, bright red bleeding. Avoid digital vaginal examination', 'Placental abruption: PAINFUL, dark red bleeding, woody hard uterus', 'Concealed abruption: major bleeding trapped behind placenta, uterus enlarged and tense', 'Vasa previa: rare but lethal fetal bleeding following rupture of membranes'],
    examQA: [
      { q: 'How do the clinical presentations of placenta previa and placental abruption differ?', a: 'Placenta previa classically presents with sudden, painless, recurrent bright red vaginal bleeding; the uterus is soft and non-tender, and fetal parts are easily palpable. Placental abruption presents with sudden, severe, continuous abdominal pain, dark vaginal bleeding (which may be concealed), a tense, "woody hard," tender uterus, and fetal distress.' },
      { q: 'Why is a digital vaginal examination contraindicated in suspected placenta previa?', a: 'Inserting fingers into the cervical canal can provoke massive, uncontrollable, life-threatening maternal hemorrhage by detaching the overlying placenta.' }
    ]
  },
  {
    id: 'pph',
    name: 'Postpartum Hemorrhage',
    syllabusRef: 'Phase IV OB/GYN',
    section: 'Obstetrics',
    description: 'Postpartum hemorrhage (PPH) is blood loss >500ml (vaginal) or >1000ml (Caesarean). Causes remembered as the 4 Ts: Tone (uterine atony, most common), Tissue (retained placenta/clots), Trauma (genital tract lacerations, uterine rupture), Thrombin (coagulopathy). Active management of the 3rd stage reduces PPH risk (uterotonic administration, early cord clamping, controlled cord traction). Management of atony involves bimanual compression, uterotonics (oxytocin, ergometrine, misoprostol, carboprost), balloon tamponade, and surgical options (B-Lynch suture).',
    svgKey: 'mbbs-obgyn-pph',
    threejs3dFn: 'none',
    landmarks: ['The 4 Ts of PPH: Tone (atony), Tissue, Trauma, Thrombin', 'Uterine atony is the most common cause of primary PPH', 'Active management of the 3rd stage prevents PPH (Oxytocin 10 IU IM)', 'B-Lynch suture: surgical compression suture for refractory uterine atony'],
    examQA: [
      { q: 'What is the most common cause of primary postpartum hemorrhage and how is it initially managed?', a: 'Uterine atony (Tone). Initial management includes calling for help, uterine massage (rubbing up the fundus), bimanual uterine compression, and administering uterotonics (e.g., IV/IM Oxytocin, Ergometrine, or rectal Misoprostol).' },
      { q: 'What does active management of the third stage of labor involve?', a: '1. Administration of a prophylactic uterotonic (e.g., Oxytocin 10 IU IM) immediately after delivery of the anterior shoulder or the baby. 2. Early clamping and cutting of the umbilical cord. 3. Controlled cord traction to deliver the placenta while applying counter-traction to the uterus.' }
    ]
  },
  {
    id: 'ectopic',
    name: 'Ectopic Pregnancy & Miscarriage',
    syllabusRef: 'Phase IV OB/GYN',
    section: 'Obstetrics',
    description: 'Ectopic pregnancy implants outside the uterine cavity, most commonly in the Fallopian tube (ampulla). Risk factors: previous ectopic, PID, tubal surgery. Presents with pain, amenorrhea, and vaginal bleeding. A ruptured ectopic presents with acute abdomen and hypovolemic shock. Diagnosis: transvaginal ultrasound (empty uterus with adnexal mass) and serum beta-hCG. Management: expectant, medical (Methotrexate if unruptured, small, low hCG), or surgical (salpingectomy/salpingostomy). Miscarriage classifications: threatened, inevitable, incomplete, complete, missed.',
    svgKey: 'mbbs-obgyn-ectopic',
    threejs3dFn: 'createCellDivision',
    landmarks: ['Ampulla of the fallopian tube is the most common site of ectopic pregnancy', 'Triad: Amenorrhea, abdominal pain, vaginal bleeding', 'Methotrexate criteria: hemodynamically stable, unruptured, mass <35mm, no fetal heartbeat, hCG <5000', 'Threatened miscarriage: cervical os is closed, viable fetus on ultrasound'],
    examQA: [
      { q: 'What are the classic symptoms of a ruptured ectopic pregnancy?', a: 'Sudden, severe lower abdominal pain, often radiating to the shoulder tip (referred pain from diaphragmatic irritation due to hemoperitoneum), vaginal bleeding, syncope/dizziness, and signs of hypovolemic shock (tachycardia, hypotension, pallor).' },
      { q: 'What criteria must be met for an ectopic pregnancy to be managed medically with Methotrexate?', a: 'The patient must be hemodynamically stable, the ectopic must be unruptured, the adnexal mass must be <35mm in diameter, there must be no fetal cardiac activity, and serum beta-hCG levels should ideally be <1500-5000 IU/L. The patient must also be willing to attend follow-up.' }
    ]
  },
  {
    id: 'multiple',
    name: 'Multiple Pregnancy & Malpresentations',
    syllabusRef: 'Phase IV OB/GYN',
    section: 'Obstetrics',
    description: 'Twins can be dizygotic (two eggs, always DCDA) or monozygotic (one egg). Timing of splitting determines chorionicity and amnionicity: <3 days (DCDA), 4-8 days (MCDA), 8-13 days (MCMA), >13 days (conjoined). Monochorionic twins share a placenta and are at risk for Twin-to-Twin Transfusion Syndrome (TTTS), where unequal vascular anastomoses lead to a donor twin (oligohydramnios, growth restricted) and recipient twin (polyhydramnios, heart failure). Breech presentation (buttocks/feet first) can be frank, complete, or footling. External Cephalic Version (ECV) can be attempted at 37 weeks.',
    svgKey: 'mbbs-obgyn-multiple',
    threejs3dFn: 'createCellDivision',
    landmarks: ['DCDA (Lambda sign) vs MCDA (T-sign) on first-trimester ultrasound', 'Twin-to-Twin Transfusion Syndrome (TTTS) exclusively affects monochorionic twins', 'Donor twin in TTTS: anemic, oligohydramnios, growth restricted', 'Frank breech: hips flexed, knees extended. Footling breech: highest risk of cord prolapse'],
    examQA: [
      { q: 'What is the difference between DCDA and MCDA twins and how are they identified on ultrasound?', a: 'DCDA (Dichorionic Diamniotic) twins have two placentas and two amniotic sacs; identified by a thick inter-twin membrane and the "Lambda" or "Twin Peak" sign. MCDA (Monochorionic Diamniotic) twins share one placenta but have two amniotic sacs; identified by a thin membrane and the "T-sign".' },
      { q: 'Describe the pathophysiology and presentation of Twin-to-Twin Transfusion Syndrome (TTTS).', a: 'Occurs in Monochorionic pregnancies due to unbalanced deep arteriovenous anastomoses in the shared placenta. Blood flows from the "donor" twin (becomes hypovolemic, oliguric, leading to oligohydramnios and growth restriction) to the "recipient" twin (becomes hypervolemic, polyuric, leading to polyhydramnios and potential heart failure/hydrops).' }
    ]
  },
  {
    id: 'medical',
    name: 'Medical Disorders in Pregnancy',
    syllabusRef: 'Phase IV OB/GYN',
    section: 'Obstetrics',
    description: 'Gestational Diabetes Mellitus (GDM) is carbohydrate intolerance first recognized during pregnancy. Risk factors: high BMI, previous GDM, macrosomia, family history. Diagnosed via Oral Glucose Tolerance Test (OGTT). Maternal hyperglycemia causes fetal hyperinsulinemia, leading to fetal macrosomia, polyhydramnios, and neonatal hypoglycemia. Anemia in pregnancy is mostly iron deficiency; physiological hemodilution lowers the normal threshold (Hb <11.0 g/dL in 1st/3rd trimester). Folate deficiency can cause neural tube defects (start folic acid preconceptionally).',
    svgKey: 'mbbs-obgyn-medical',
    threejs3dFn: 'none',
    landmarks: ['GDM causes fetal macrosomia and postnatal neonatal hypoglycemia', 'Oral Glucose Tolerance Test (OGTT) performed at 24-28 weeks for high-risk women', 'Pregnancy Hb threshold for anemia: <11.0 g/dL (1st/3rd tri), <10.5 g/dL (2nd tri)', 'Folic acid 400mcg daily preconceptionally to prevent neural tube defects'],
    examQA: [
      { q: 'Why do infants born to mothers with poorly controlled GDM develop neonatal hypoglycemia?', a: 'Maternal hyperglycemia crosses the placenta, causing fetal hyperglycemia. This stimulates the fetal pancreas to undergo beta-cell hyperplasia and secrete excess insulin. After birth, the maternal glucose supply is abruptly cut off, but the neonate remains hyperinsulinemic, rapidly driving down its own blood glucose levels.' },
      { q: 'What are the cutoff values for diagnosing GDM using the 75g OGTT (WHO criteria)?', a: 'Fasting venous plasma glucose >= 5.1 mmol/L, OR 1-hour glucose >= 10.0 mmol/L, OR 2-hour glucose >= 8.5 mmol/L. Only one abnormal value is required for diagnosis.' }
    ]
  },
  {
    id: 'operative',
    name: 'Operative Obstetrics',
    syllabusRef: 'Phase IV OB/GYN',
    section: 'Obstetrics',
    description: 'Caesarean section involves delivering the fetus through abdominal and uterine incisions. Most common is the Lower Segment Caesarean Section (LSCS) using a Pfannenstiel skin incision. Classical (vertical) incisions are rare but used for extreme prematurity or transverse lie. Indications: fetal distress, failure to progress, placenta previa, malpresentations. Instrumental delivery uses forceps or vacuum (ventouse) to expedite second-stage labor. Prerequisites: full cervical dilation, ruptured membranes, engaged head, empty bladder, known position.',
    svgKey: 'mbbs-obgyn-operative',
    threejs3dFn: 'none',
    landmarks: ['Lower Segment Caesarean Section (LSCS) reduces risk of uterine rupture in future pregnancies', 'Absolute indication for C-section: Major placenta previa (grade 3 or 4)', 'Instrumental delivery requires full 10cm cervical dilation and engaged head', 'Vacuum extraction (ventouse) can cause a chignon (scalp edema) or cephalohematoma'],
    examQA: [
      { q: 'List the essential prerequisites for a safe instrumental (forceps or ventouse) vaginal delivery.', a: 'Remember "FORCEPS": Fully dilated cervix, Oa/Op position known (head engaged), Ruptured membranes, Contractions present, Empty bladder, Pain relief/Pelvis adequate, Station (+1 to +3), consent obtained.' },
      { q: 'What is the difference between a Pfannenstiel incision and a Classical Caesarean section?', a: 'A Pfannenstiel incision is a transverse suprapubic skin incision followed by a lower transverse uterine incision; it heals better, looks better, and has a lower risk of future uterine rupture. A Classical Caesarean involves a vertical midline skin incision and a vertical upper segment uterine incision; it carries a high risk of rupture in subsequent pregnancies.' }
    ]
  },
  {
    id: 'menstrual',
    name: 'Menstrual Disorders',
    syllabusRef: 'Phase IV OB/GYN',
    section: 'Gynecology',
    description: 'The menstrual cycle is regulated by the HPO axis: Hypothalamus (GnRH), Pituitary (FSH, LH), Ovaries (Estrogen, Progesterone). Normal cycle: follicular phase (estrogen builds endometrium), LH surge (ovulation), luteal phase (progesterone stabilizes endometrium). Abnormal Uterine Bleeding (AUB) categorized by PALM-COEIN: Structural (Polyp, Adenomyosis, Leiomyoma, Malignancy/hyperplasia) and Non-structural (Coagulopathy, Ovulatory dysfunction, Endometrial, Iatrogenic, Not classified). Amenorrhea is absence of menses (Primary = never menstruated by age 15; Secondary = absence for 6 months after regular cycles).',
    svgKey: 'mbbs-obgyn-menstrual',
    threejs3dFn: 'none',
    landmarks: ['PALM-COEIN classification separates structural (PALM) from non-structural (COEIN) causes of AUB', 'LH surge directly triggers ovulation (release of the oocyte)', 'Secondary amenorrhea most common cause: Pregnancy (always do a pregnancy test!)', 'Polycystic Ovary Syndrome (PCOS) is a common cause of ovulatory dysfunction (AUB-O)'],
    examQA: [
      { q: 'What does the acronym PALM-COEIN stand for in the context of Abnormal Uterine Bleeding?', a: 'PALM (Structural causes): Polyp, Adenomyosis, Leiomyoma, Malignancy & hyperplasia. COEIN (Non-structural causes): Coagulopathy, Ovulatory dysfunction, Endometrial causes, Iatrogenic, Not yet classified.' },
      { q: 'Explain the hormonal events that lead to ovulation.', a: 'FSH stimulates follicular growth. The dominant follicle produces increasing amounts of Estrogen. High estrogen levels eventually exert positive feedback on the pituitary, triggering a massive surge of Luteinizing Hormone (LH). The LH surge induces rupture of the follicle and release of the egg approximately 36 hours later.' }
    ]
  },
  {
    id: 'pid',
    name: 'Pelvic Inflammatory Disease',
    syllabusRef: 'Phase IV OB/GYN',
    section: 'Gynecology',
    description: 'Pelvic Inflammatory Disease (PID) is ascending infection from the cervix to the uterus, Fallopian tubes, and ovaries. Primary culprits: Chlamydia trachomatis and Neisseria gonorrhoeae. Presents with lower abdominal pain, deep dyspareunia, abnormal vaginal discharge, and fever. Exam shows cervical motion tenderness (chandelier sign) and adnexal tenderness. Complications: tubal infertility, ectopic pregnancy risk, chronic pelvic pain. Fitz-Hugh-Curtis syndrome: perihepatitis leading to "violin-string" adhesions to the liver capsule. Treatment: broad-spectrum antibiotics (Ceftriaxone + Doxycycline + Metronidazole).',
    svgKey: 'mbbs-obgyn-pid',
    landmarks: ['Chlamydia and Gonorrhea are the most common pathogens causing PID', 'Cervical motion tenderness (Chandelier sign) is highly suggestive of PID', 'Fitz-Hugh-Curtis syndrome: perihepatitis with violin-string adhesions to the liver', 'Complications include infertility (tubal scarring) and increased risk of ectopic pregnancy'],
    examQA: [
      { q: 'What are the long-term complications of poorly treated Pelvic Inflammatory Disease?', a: '1. Infertility (due to tubal occlusion and scarring). 2. Ectopic pregnancy (damaged tubal cilia trap the fertilized egg). 3. Chronic pelvic pain (due to pelvic adhesions). 4. Recurrent PID episodes. 5. Hydrosalpinx or tubo-ovarian abscess.' },
      { q: 'What is Fitz-Hugh-Curtis syndrome?', a: 'A complication of PID where the infection spreads along the paracolic gutters to cause inflammation of the liver capsule (perihepatitis). It presents with right upper quadrant pain and is characterized laparoscopically by "violin-string" adhesions between the liver capsule and the diaphragm or abdominal wall.' }
    ]
  },
  {
    id: 'fibroids',
    name: 'Uterine Fibroids & Adenomyosis',
    syllabusRef: 'Phase IV OB/GYN',
    section: 'Gynecology',
    description: 'Fibroids (Leiomyomas) are benign smooth muscle tumors of the myometrium. Types based on location: Intramural (within muscle, most common), Submucosal (protruding into cavity, causes heavy bleeding), Subserosal (bulging outwards, causes pressure/mass effects). Estrogen-dependent, regress after menopause. Adenomyosis is the presence of endometrial glands and stroma deep within the myometrium, causing a symmetrically enlarged, boggy, tender uterus, and severe dysmenorrhea. Treatment ranges from medical (tranexamic acid, GnRH agonists) to surgical (myomectomy, hysterectomy).',
    svgKey: 'mbbs-obgyn-fibroids',
    threejs3dFn: 'none',
    landmarks: ['Leiomyomas are the most common benign pelvic tumors; estrogen-dependent', 'Submucosal fibroids are most likely to cause heavy menstrual bleeding (menorrhagia)', 'Adenomyosis presents with severe dysmenorrhea and a uniformly enlarged, boggy uterus', 'GnRH agonists can shrink fibroids pre-operatively by inducing medical menopause'],
    examQA: [
      { q: 'Differentiate between the clinical presentations of submucosal versus subserosal fibroids.', a: 'Submucosal fibroids project into the uterine cavity and distort the endometrial surface, causing heavy, prolonged menstrual bleeding (menorrhagia) and possible infertility. Subserosal fibroids project outwards from the uterus; they typically do not cause bleeding but present with mass effects, such as pressure on the bladder (urinary frequency) or bowel (constipation).' },
      { q: 'What is the difference between endometriosis and adenomyosis?', a: 'Both involve ectopic endometrial tissue. In endometriosis, the tissue implants OUTSIDE the uterus (e.g., ovaries, peritoneum, bowel). In adenomyosis, the endometrial tissue invades WITHIN the uterine muscular wall (myometrium), making the uterus globally enlarged and tender.' }
    ]
  },
  {
    id: 'pcos',
    name: 'Endometriosis & PCOS',
    syllabusRef: 'Phase IV OB/GYN',
    section: 'Gynecology',
    description: 'Endometriosis is functional endometrial tissue outside the uterine cavity (e.g., ovaries, pouch of Douglas). It bleeds cyclically causing inflammation, adhesions, chronic pelvic pain, deep dyspareunia, and infertility. Ovarian endometriomas are called "chocolate cysts". PCOS (Polycystic Ovary Syndrome) is an endocrine disorder. Rotterdam criteria (need 2/3): 1. Oligo/anovulation, 2. Hyperandrogenism (clinical or biochemical), 3. Polycystic ovaries on ultrasound. Causes insulin resistance, obesity, hirsutism, and infertility. High LH:FSH ratio.',
    svgKey: 'mbbs-obgyn-pcos',
    threejs3dFn: 'none',
    landmarks: ['Endometriosis hallmark: deep dyspareunia, chronic pelvic pain, and infertility', 'Chocolate cysts are endometriomas within the ovary filled with old, dark blood', 'Rotterdam Criteria for PCOS: Anovulation, Hyperandrogenism, Polycystic ovaries (need 2/3)', 'PCOS is strongly associated with insulin resistance and increased risk of Type 2 Diabetes'],
    examQA: [
      { q: 'What are the classic symptoms of endometriosis?', a: 'The classic triad/tetrad includes: 1. Severe cyclical dysmenorrhea (painful periods). 2. Deep dyspareunia (pain during deep penetration). 3. Chronic pelvic pain. 4. Subfertility/Infertility. Pain often precedes menses and is relieved after menstruation ends.' },
      { q: 'What are the Rotterdam criteria for diagnosing PCOS?', a: 'Diagnosis requires at least 2 of the following 3 features (after excluding other etiologies): 1. Oligo-ovulation or anovulation (irregular or absent periods). 2. Clinical and/or biochemical signs of hyperandrogenism (hirsutism, acne, male-pattern balding, raised testosterone). 3. Polycystic ovaries on ultrasound (>=12 follicles per ovary or increased ovarian volume).' }
    ]
  },
  {
    id: 'prolapse',
    name: 'Pelvic Organ Prolapse & Urogynecology',
    syllabusRef: 'Phase IV OB/GYN',
    section: 'Gynecology',
    description: 'Pelvic Organ Prolapse is the descent of pelvic organs. Cystocele: anterior vaginal wall (bladder descent). Rectocele: posterior vaginal wall (rectal descent). Uterine prolapse: apical descent. Risk factors: parity, vaginal delivery, age, obesity, chronic cough. Symptoms: dragging sensation, feeling a lump. Incontinence types: Stress UI (leakage with coughing/sneezing due to weak pelvic floor/sphincter), Urge UI (leakage preceded by sudden uncontrollable urge due to detrusor overactivity/OAB), Overflow UI (retention). Management: pelvic floor exercises (Kegels), ring pessaries, surgery (colporrhaphy, TVT tape for SUI).',
    svgKey: 'mbbs-obgyn-prolapse',
    threejs3dFn: 'none',
    landmarks: ['Cystocele = bladder prolapse; Rectocele = rectal prolapse; Enterocele = small bowel', 'Stress Incontinence: leak with raised intra-abdominal pressure (coughing, laughing)', 'Urge Incontinence: sudden compelling desire to void (Detrusor Overactivity)', 'First-line treatment for prolapse/SUI: Pelvic floor muscle training (Kegel exercises)'],
    examQA: [
      { q: 'Differentiate Stress Urinary Incontinence (SUI) from Urge Urinary Incontinence (UUI).', a: 'SUI is involuntary leakage of urine on effort or exertion (coughing, sneezing, laughing) due to an incompetent urethral sphincter or weak pelvic floor. UUI is involuntary leakage accompanied by or immediately preceded by urgency (a sudden compelling desire to pass urine that is difficult to defer), caused by detrusor muscle overactivity.' },
      { q: 'What are the conservative and surgical options for managing pelvic organ prolapse?', a: 'Conservative: Lifestyle changes (weight loss, smoking cessation, treating chronic cough/constipation), Pelvic floor muscle training (Kegel exercises), and Vaginal pessaries (e.g., ring pessary). Surgical: depends on the compartment; anterior/posterior colporrhaphy (repair), vaginal hysterectomy, or sacrocolpopexy.' }
    ]
  },
  {
    id: 'cervical',
    name: 'Cervical Cancer & Screening',
    syllabusRef: 'Phase IV OB/GYN',
    section: 'Gynecology',
    description: 'Cervical cancer is almost entirely caused by persistent high-risk HPV infection (types 16, 18). It begins at the transformation zone (squamocolumnar junction). Progression: HPV infection -> Cervical Intraepithelial Neoplasia (CIN 1, 2, 3) -> invasive squamous cell carcinoma. Presentation: post-coital bleeding, intermenstrual bleeding, foul-smelling discharge. Screening identifies pre-cancerous lesions: Pap smear (cytology), VIA (Visual Inspection with Acetic acid - turns white if abnormal), and HPV DNA testing. Prevention via HPV vaccination (e.g., Gardasil) before sexual debut. Treatment of CIN: LLETZ/LEEP or cryotherapy.',
    svgKey: 'mbbs-obgyn-cervical',
    threejs3dFn: 'createCellDivision',
    landmarks: ['High-risk HPV types 16 and 18 cause >70% of cervical cancers', 'Transformation zone: the dynamic area where columnar epithelium undergoes squamous metaplasia', 'Classic presentation: Post-coital bleeding', 'VIA (Visual Inspection with Acetic Acid): abnormal cells turn acetowhite, used in low-resource settings'],
    examQA: [
      { q: 'What is the transformation zone and why is it clinically important?', a: 'The transformation zone is the area of the cervix where the glandular (columnar) epithelium is being replaced by squamous epithelium (squamous metaplasia). It is clinically critical because it is the most vulnerable area to HPV infection and almost all cervical cancers and their precursors (CIN) arise here.' },
      { q: 'What is the difference between CIN and invasive cervical cancer?', a: 'CIN (Cervical Intraepithelial Neoplasia) is a premalignant condition where dysplastic cells are confined within the epithelium and have NOT breached the basement membrane (graded 1 to 3 based on thickness of involvement). Invasive cervical cancer occurs when malignant cells break through the basement membrane and invade the underlying stroma.' }
    ]
  },
  {
    id: 'ovarian',
    name: 'Ovarian Tumors',
    syllabusRef: 'Phase IV OB/GYN',
    section: 'Gynecology',
    description: 'Ovarian tumors are classified by cell of origin: Epithelial (most common, e.g., serous, mucinous cystadenoma/carcinoma), Germ cell (e.g., dermoid cyst/teratoma, dysgerminoma), Sex-cord stromal (e.g., granulosa cell tumor - secretes estrogen). Malignant tumors present late with vague symptoms: bloating, early satiety, weight loss, ascites. Ultrasound features of malignancy: multi-loculated, solid areas, bilateral, ascites. Risk of Malignancy Index (RMI) = U (ultrasound score) x M (menopausal status) x CA125 level. Dermoid cysts contain hair, teeth, sebum and are prone to torsion.',
    svgKey: 'mbbs-obgyn-ovarian',
    threejs3dFn: 'none',
    landmarks: ['Epithelial tumors are the most common type of ovarian cancer (mostly Serous)', 'Dermoid cyst (Mature cystic teratoma) is a benign germ cell tumor containing all 3 germ layers', 'RMI = Ultrasound score × Menopausal status × CA125 level', 'Ovarian cancer presents late with vague abdominal symptoms like bloating and early satiety'],
    examQA: [
      { q: 'What components make up the Risk of Malignancy Index (RMI) for ovarian cysts?', a: 'RMI is calculated as U x M x CA125. U = Ultrasound features score (1 point each for multilocular cysts, solid areas, bilateral lesions, ascites, intra-abdominal metastases; score 0, 1, or 3). M = Menopausal status (1 if pre-menopausal, 3 if post-menopausal). CA125 = serum CA125 level in U/mL.' },
      { q: 'Describe the typical ultrasound features that suggest an ovarian cyst is malignant.', a: 'Complex appearance, solid components or nodules, thick septations (>3mm), bilateral involvement, irregular borders, increased vascularity on Doppler, and the presence of ascites.' }
    ]
  },
  {
    id: 'endometrial',
    name: 'Endometrial & Vulvar Cancer',
    syllabusRef: 'Phase IV OB/GYN',
    section: 'Gynecology',
    description: 'Endometrial cancer is mostly adenocarcinoma, driven by unopposed estrogen. Risk factors: obesity (peripheral estrogen conversion), nulliparity, late menopause, PCOS, Tamoxifen. Protective: COCP. Classic presentation: Postmenopausal bleeding (PMB). Any PMB must be investigated with Transvaginal Ultrasound (TVUS) to measure endometrial thickness (<4mm is normal postmenopausal) and endometrial biopsy (pipelle). Endometrial hyperplasia is a precursor. Vulvar cancer is usually squamous cell carcinoma, presenting as a pruritic, ulcerated lump in elderly women. Lichen sclerosus is a predisposing factor.',
    svgKey: 'mbbs-obgyn-endometrial',
    threejs3dFn: 'none',
    landmarks: ['Postmenopausal bleeding (PMB) is endometrial cancer until proven otherwise', 'Risk factor: Unopposed estrogen (obesity, PCOS, nulliparity, Tamoxifen)', 'TVUS endometrial thickness < 4mm makes endometrial cancer highly unlikely in PMB', 'Vulvar cancer commonly presents as a long-standing pruritic ulcer/lump in older women'],
    examQA: [
      { q: 'A 60-year-old woman presents with postmenopausal bleeding. Outline her initial investigation.', a: 'Postmenopausal bleeding must be fast-tracked to rule out endometrial cancer. Initial investigation involves a Transvaginal Ultrasound (TVUS) to measure endometrial thickness. If the thickness is >= 4mm (or if the scan is abnormal/inconclusive), an outpatient endometrial biopsy (e.g., Pipelle biopsy) or hysteroscopy with targeted biopsy is mandatory.' },
      { q: 'How does obesity increase the risk of endometrial cancer?', a: 'Adipose tissue contains the enzyme aromatase, which converts adrenal androgens (androstenedione) into estrone (an estrogen). In obese women, this leads to chronically high levels of endogenous estrogen that is "unopposed" by progesterone, causing continuous endometrial proliferation, hyperplasia, and eventually carcinoma.' }
    ]
  },
  {
    id: 'contraception',
    name: 'Contraception & Family Planning',
    syllabusRef: 'Phase IV OB/GYN',
    section: 'Gynecology',
    description: 'Contraceptives are categorized by mechanism and duration. Combined Oral Contraceptive Pill (COCP): contains estrogen & progestin; inhibits ovulation. Risks: VTE, stroke. Benefits: reduces endometrial/ovarian cancer risk, lighter periods. Progesterone Only Pill (POP): thickens cervical mucus. Long-Acting Reversible Contraceptives (LARC) are highly effective: Implant (Etonogestrel, lasts 3 years, inhibits ovulation), Hormonal Mirena IUS (Levonorgestrel, lasts 5 years, thins endometrium), Copper IUD (toxic to sperm/ova, lasts 10 years, can cause heavier bleeding). Emergency: Levonorgestrel pill, Ulipristal, or Copper IUD (most effective).',
    svgKey: 'mbbs-obgyn-contraception',
    threejs3dFn: 'none',
    landmarks: ['COCP primarily works by inhibiting ovulation via negative feedback on the HPO axis', 'COCP is contraindicated in women with a history of VTE, focal migraine, or smokers >35 yrs', 'Copper IUD can be used as the most effective form of emergency contraception (within 5 days)', 'LARC (Implants, IUDs) have the highest efficacy rates as they do not rely on user compliance'],
    examQA: [
      { q: 'What are the main mechanisms of action for the Copper IUD and the Hormonal IUS (Mirena)?', a: 'Copper IUD: Copper ions are highly toxic to sperm and ova, preventing fertilization, and also cause a sterile inflammatory response in the endometrium that inhibits implantation. Hormonal IUS (Mirena): Releases levonorgestrel, which thickens cervical mucus (blocking sperm penetration) and keeps the endometrium thin and atrophic (preventing implantation).' },
      { q: 'List three absolute contraindications (UKMEC 4) for the use of the Combined Oral Contraceptive Pill (COCP).', a: '1. History of or current Venous Thromboembolism (DVT/PE). 2. Migraine WITH aura (high stroke risk). 3. Smoking >= 15 cigarettes/day in a woman aged 35 years or older. 4. History of breast cancer. 5. Current severe liver disease.' }
    ]
  }
];

let target = fs.readFileSync('topic-visuals.js', 'utf8');

const obgynSection = `
  mbbs_obgyn: {
    subjectName: 'MBBS OB/GYN',
    examCode: 'BMDC',
    sections: ['Obstetrics', 'Gynecology'],
    topics: ${JSON.stringify(obgynTopics, null, 6).replace(/]$/, '    ]')}
  }
};`;

target = target.replace(/mbbs_surgery:\\s*\\{[\\s\\S]*?\\}\\s*\\]\\s*\\n\\s*\\}\\s*\\n\\};/, (match) => {
  return match.replace(/\\n\\};$/, ',\\n' + obgynSection);
});

fs.writeFileSync('topic-visuals.js', target);

let target2 = fs.readFileSync('topic-visuals.js', 'utf8');
if (!target2.includes('mbbs_obgyn')) {
  target2 = target2.replace(
    /if \\(name\\.includes\\('surgery'\\)\\)\\s*return 'mbbs_surgery';/,
    "if (name.includes('ob/gyn') || name.includes('obgyn')) return 'mbbs_obgyn';\\n  if (name.includes('surgery'))                                 return 'mbbs_surgery';"
  );
  fs.writeFileSync('topic-visuals.js', target2);
}

console.log('OB/GYN topics added successfully');
