const fs = require('fs');

const entTopics = [
  {
    id: 'ear-anatomy',
    name: 'Anatomy & Physiology of Ear',
    syllabusRef: 'Phase IV ENT',
    section: 'Ear (Otology)',
    description: 'The ear consists of three parts. Outer ear: pinna and external auditory canal. Middle ear: tympanic cavity (containing ossicles: malleus, incus, stapes), Eustachian tube, and mastoid air cells. Inner ear: bony and membranous labyrinth, cochlea (hearing), and vestibular system (balance). Sound waves vibrate the tympanic membrane, transferring mechanical energy via ossicles to the oval window, generating fluid waves in the cochlea that stimulate hair cells.',
    svgKey: 'mbbs-ent-ear-anatomy',
    threejs3dFn: 'createDiffusionAnimation',
    landmarks: ['Tympanic membrane separates the external ear from the middle ear.', 'The middle ear acts as an impedance matcher, amplifying sound via the ossicular lever and areal ratio mechanisms.', 'Eustachian tube connects the middle ear to the nasopharynx, equalizing pressure.', 'The organ of Corti within the cochlea is the sensory receptor for hearing.'],
    examQA: [
      { q: 'What is the primary physiological function of the middle ear?', a: 'Impedance matching. It overcomes the acoustic energy loss that occurs when sound passes from air (low impedance) to the inner ear fluids (high impedance) by amplifying pressure.' },
      { q: 'Which cranial nerve innervates the stapedius muscle?', a: 'The facial nerve (CN VII). Paralysis of the stapedius muscle leads to hyperacusis (increased sensitivity to loud sounds).' },
      { q: 'Why are children more prone to middle ear infections than adults?', a: 'Because their Eustachian tubes are shorter, wider, and more horizontal, allowing nasopharyngeal pathogens to easily ascend into the middle ear.' }
    ]
  },
  {
    id: 'otitis-media',
    name: 'Otitis Media',
    syllabusRef: 'Phase IV ENT',
    section: 'Ear (Otology)',
    description: 'Acute Otitis Media (AOM) is a rapid onset infection of the middle ear, presenting with earache, fever, and a bulging, red tympanic membrane. Chronic Suppurative Otitis Media (CSOM) is a persistent infection (>6-12 weeks) with a perforated TM and discharge. CSOM is divided into Tubotympanic (safe, central perforation, mucosal disease) and Atticoantral (unsafe, marginal/attic perforation, associated with cholesteatoma and bone destruction).',
    svgKey: 'mbbs-ent-otitis-media',
    threejs3dFn: 'none',
    landmarks: ['AOM classic triad: otalgia, fever, and a bulging, hyperemic tympanic membrane.', 'Tubotympanic CSOM is the "safe" type characterized by a central perforation and profuse, mucopurulent, odorless discharge.', 'Atticoantral CSOM is the "unsafe" type characterized by a marginal/attic perforation, scanty, foul-smelling discharge, and cholesteatoma.', 'Cholesteatoma is a skin-lined cyst in the middle ear cleft containing desquamated keratin; it is bone-destroying, not a true tumor.'],
    examQA: [
      { q: 'What is the typical clinical presentation of a cholesteatoma?', a: 'Painless, scanty, foul-smelling ear discharge, associated with progressive conductive hearing loss and an attic or marginal tympanic membrane perforation.' },
      { q: 'What is the first-line antibiotic choice for uncomplicated Acute Otitis Media?', a: 'High-dose oral Amoxicillin.' },
      { q: 'Why is Atticoantral CSOM considered "unsafe"?', a: 'Because it is associated with cholesteatoma, which has bone-eroding properties that can rapidly lead to severe intra-temporal and intracranial complications.' }
    ]
  },
  {
    id: 'csom-complications',
    name: 'Complications of CSOM',
    syllabusRef: 'Phase IV ENT',
    section: 'Ear (Otology)',
    description: 'CSOM (especially the unsafe cholesteatoma type) can erode surrounding bone causing dangerous complications. Intra-temporal: acute mastoiditis, facial nerve palsy, labyrinthitis, petrositis. Intracranial: meningitis, extradural abscess, subdural abscess, brain abscess (often temporal lobe or cerebellum), and lateral sinus thrombosis (presenting with "picket-fence" swinging fever).',
    svgKey: 'mbbs-ent-csom-complications',
    threejs3dFn: 'none',
    landmarks: ['Mastoiditis presents with post-auricular pain, swelling, and an outwardly pushed pinna.', 'Facial nerve palsy in CSOM requires urgent surgical exploration (mastoidectomy) to decompress the nerve.', 'Lateral sinus thrombosis classically presents with a swinging "picket-fence" fever and rigors due to septic emboli.', 'Temporal lobe and cerebellar abscesses are the most common brain abscesses secondary to CSOM.'],
    examQA: [
      { q: 'What is the most common intracranial complication of CSOM?', a: 'Meningitis.' },
      { q: 'Describe the clinical presentation of Acute Mastoiditis.', a: 'Earache, fever, severe mastoid tenderness, post-auricular swelling/erythema causing the pinna to be pushed forwards and downwards, and a sagging posterosuperior meatal wall.' },
      { q: 'What is Gradenigo\'s syndrome?', a: 'A triad of CSOM (ear discharge), retro-orbital pain (trigeminal nerve involvement), and ipsilateral lateral rectus palsy (abducens nerve palsy), indicating apical petrositis.' }
    ]
  },
  {
    id: 'deafness',
    name: 'Deafness & Audiometry',
    syllabusRef: 'Phase IV ENT',
    section: 'Ear (Otology)',
    description: 'Deafness is Conductive (CHL) or Sensorineural (SNHL). Tuning fork tests (512Hz): Rinne test compares air conduction (AC) to bone conduction (BC); Normal/SNHL: AC>BC (Rinne positive), CHL: BC>AC (Rinne negative). Weber test places fork on the vertex; lateralizes to the worse ear in CHL, and better ear in SNHL. Pure Tone Audiometry (PTA) graphs hearing thresholds (dB) across frequencies; an air-bone gap >15dB indicates CHL. SNHL shows both AC and BC dropping together.',
    svgKey: 'mbbs-ent-deafness',
    threejs3dFn: 'none',
    landmarks: ['Conductive hearing loss (CHL): Rinne is Negative (BC > AC); Weber lateralizes to the POORER ear.', 'Sensorineural hearing loss (SNHL): Rinne is Positive (AC > BC); Weber lateralizes to the BETTER ear.', 'Pure Tone Audiometry (PTA): An Air-Bone gap >= 15 dB is diagnostic of a conductive hearing defect.', 'Noise-induced hearing loss typically shows a classic sensorineural "notch" at 4000 Hz on the audiogram.'],
    examQA: [
      { q: 'A patient has a Negative Rinne test in the right ear and Weber lateralizes to the right ear. What is the diagnosis?', a: 'Right-sided Conductive Hearing Loss.' },
      { q: 'What are the common causes of conductive hearing loss?', a: 'Wax impaction, otitis media with effusion (glue ear), tympanic membrane perforation, otosclerosis, and ossicular discontinuity.' },
      { q: 'What is presbycusis?', a: 'Age-related, bilateral, symmetrical sensorineural hearing loss that predominantly affects high frequencies.' }
    ]
  },
  {
    id: 'vertigo',
    name: 'Vertigo & Inner Ear Disorders',
    syllabusRef: 'Phase IV ENT',
    section: 'Ear (Otology)',
    description: 'Vertigo is the illusion of movement. BPPV (Benign Paroxysmal Positional Vertigo) is the most common cause; brief (<1 min) intense vertigo triggered by head position changes (caused by loose otoconia in semicircular canals). Diagnosed via Dix-Hallpike maneuver, treated via Epley maneuver. Meniere\'s disease features the classic triad: episodic vertigo (hours), fluctuating low-frequency SNHL, and tinnitus/aural fullness (due to endolymphatic hydrops). Labyrinthitis presents with acute, severe, continuous vertigo and hearing loss.',
    svgKey: 'mbbs-ent-vertigo',
    threejs3dFn: 'none',
    landmarks: ['Meniere\'s Disease triad: Episodic vertigo, Tinnitus, and fluctuating Sensorineural Hearing Loss.', 'BPPV causes very brief (<1 minute) episodes of vertigo triggered purely by changes in head position.', 'The Dix-Hallpike maneuver is diagnostic for BPPV (provokes upbeat torsional nystagmus).', 'Vestibular Neuritis presents with severe continuous vertigo WITHOUT hearing loss, unlike Labyrinthitis.'],
    examQA: [
      { q: 'What is the pathophysiological basis of Meniere\'s disease?', a: 'Endolymphatic hydrops: overproduction or underabsorption of endolymph leading to increased pressure and distension within the membranous labyrinth.' },
      { q: 'How is BPPV treated?', a: 'Using particle repositioning maneuvers, primarily the Epley maneuver, which moves the displaced otoliths out of the posterior semicircular canal and back into the utricle.' },
      { q: 'How can you clinically differentiate Vestibular Neuritis from Labyrinthitis?', a: 'Both present with acute, severe, continuous vertigo, but Labyrinthitis also features sensorineural hearing loss, whereas hearing is completely preserved in Vestibular Neuritis.' }
    ]
  },
  {
    id: 'nose-anatomy',
    name: 'Anatomy of Nose & Sinuses',
    syllabusRef: 'Phase IV ENT',
    section: 'Nose (Rhinology)',
    description: 'The nasal cavity is divided by the septum (cartilage, ethmoid, vomer). The lateral wall contains three turbinates (superior, middle, inferior conchae) with corresponding meatuses. The Osteomeatal Complex (OMC) in the middle meatus is the critical drainage pathway for the frontal, maxillary, and anterior ethmoid sinuses. Blockage of the OMC is the primary cause of chronic sinusitis.',
    svgKey: 'mbbs-ent-nose-anatomy',
    threejs3dFn: 'none',
    landmarks: ['The lateral nasal wall features three turbinates; the inferior turbinate is the largest and most vascular.', 'The Osteomeatal Complex (OMC) is the key drainage area for the maxillary, frontal, and anterior ethmoid sinuses.', 'The nasolacrimal duct drains into the inferior meatus.', 'The sphenoid and posterior ethmoid sinuses drain into the superior meatus and sphenoethmoidal recess.'],
    examQA: [
      { q: 'Where do the frontal, maxillary, and anterior ethmoid sinuses drain?', a: 'Into the middle meatus via the osteomeatal complex.' },
      { q: 'What comprises the nasal septum?', a: 'The septal cartilage anteriorly, the perpendicular plate of the ethmoid bone posterosuperiorly, and the vomer posteroinferiorly.' },
      { q: 'Why is the osteomeatal complex (OMC) clinically important?', a: 'It is a narrow anatomical crossroads; even minor mucosal swelling here can obstruct the drainage of multiple sinuses, leading to recurrent or chronic sinusitis.' }
    ]
  },
  {
    id: 'epistaxis',
    name: 'Epistaxis',
    syllabusRef: 'Phase IV ENT',
    section: 'Nose (Rhinology)',
    description: 'Epistaxis (nosebleed) is common and usually anterior. Little\'s area on the anterior nasal septum contains Kiesselbach\'s plexus, an anastomosis of 5 arteries; it is the most common site (esp. in children/trauma). Posterior epistaxis is less common but more severe (usually from the sphenopalatine artery in hypertensive elderly patients). Management: Trotter\'s method (pinch nose, lean forward), cautery (silver nitrate), anterior nasal packing (Ribbon gauze/Merocel), or posterior packing (Foley catheter/BIPP) if anterior fails.',
    svgKey: 'mbbs-ent-epistaxis',
    threejs3dFn: 'none',
    landmarks: ['Little\'s Area (Kiesselbach\'s plexus) on the anterior septum is the site for >90% of epistaxis cases.', 'Trotter\'s method: lean strictly FORWARD and pinch the cartilaginous part of the nose for 10-15 minutes.', 'Posterior epistaxis is suspected if bleeding is profuse, bilateral, or runs down the throat despite an anterior pack.', 'Sphenopalatine artery (branch of maxillary artery) is the primary source of posterior epistaxis.'],
    examQA: [
      { q: 'Which arteries make up Kiesselbach\'s plexus in Little\'s area?', a: 'Anterior ethmoidal, Posterior ethmoidal, Sphenopalatine, Greater palatine, and Superior labial arteries.' },
      { q: 'What is the immediate first-aid management for an anterior epistaxis?', a: 'Pinch the soft, cartilaginous lower part of the nose continuously for 10-15 minutes while the patient sits upright and leans slightly forward to prevent blood from dripping down the throat.' },
      { q: 'If anterior nasal packing fails to stop severe epistaxis, what is the next non-surgical step?', a: 'Insertion of a posterior nasal pack (often using a Foley catheter balloon) in combination with an anterior pack.' }
    ]
  },
  {
    id: 'rhinitis',
    name: 'Rhinitis & Sinusitis',
    syllabusRef: 'Phase IV ENT',
    section: 'Nose (Rhinology)',
    description: 'Allergic Rhinitis is an IgE-mediated type 1 hypersensitivity reaction causing sneezing, clear rhinorrhea, itching, and pale/boggy turbinates. Acute rhinosinusitis is usually viral, becoming bacterial if >10 days (Strep pneumoniae, H. influenzae). Chronic Rhinosinusitis (CRS) lasts >12 weeks. Diagnosis is clinical; CT scan of paranasal sinuses is the gold standard for CRS. Functional Endoscopic Sinus Surgery (FESS) is indicated for CRS failing maximum medical therapy.',
    svgKey: 'mbbs-ent-rhinitis',
    threejs3dFn: 'none',
    landmarks: ['Allergic rhinitis classic symptoms: paroxysmal sneezing, watery rhinorrhea, nasal obstruction, and itching.', ' Pale, bluish, edematous (boggy) turbinates are highly suggestive of allergic rhinitis.', 'Acute bacterial sinusitis is suspected if viral upper respiratory symptoms persist without improvement for >10 days.', 'FESS (Functional Endoscopic Sinus Surgery) aims to widen the natural sinus ostia while preserving healthy mucosa.'],
    examQA: [
      { q: 'What is the pharmacological step-up therapy for Allergic Rhinitis?', a: 'Oral non-sedating antihistamines (e.g., cetirizine/loratadine) for mild intermittent symptoms, stepping up to Intranasal Corticosteroids (e.g., fluticasone) as the most effective therapy for persistent/moderate-to-severe symptoms.' },
      { q: 'What are the absolute indications for Functional Endoscopic Sinus Surgery (FESS)?', a: 'Complications of sinusitis (orbital cellulitis, intracranial extension), suspected sinonasal neoplasia, or chronic rhinosinusitis with/without polyps that is totally refractory to prolonged maximum medical therapy.' },
      { q: 'What are the major complications of acute frontal sinusitis?', a: 'Osteomyelitis of the frontal bone (Pott\'s puffy tumor), orbital cellulitis, and intracranial complications (meningitis, epidural/subdural abscess).' }
    ]
  },
  {
    id: 'nasal-polyps',
    name: 'Nasal Septum & Polyps',
    syllabusRef: 'Phase IV ENT',
    section: 'Nose (Rhinology)',
    description: 'Deviated Nasal Septum (DNS) is common; significant deviation causes nasal obstruction, recurrent sinusitis, and epistaxis. Treatment is septoplasty. Nasal polyps are non-neoplastic inflammatory mucosal edemas. Bilateral Ethmoidal Polyps are common in adults with allergies/asthma (Samter\'s triad: asthma, aspirin sensitivity, polyps). Antrochoanal Polyps arise from the maxillary sinus, grow back into the choana, are usually unilateral, and occur more often in children/young adults.',
    svgKey: 'mbbs-ent-nasal-polyps',
    threejs3dFn: 'none',
    landmarks: ['Bilateral ethmoidal polyps are usually multiple, grape-like, and associated with allergy or asthma.', 'Antrochoanal polyps are typically unilateral, arise from the maxillary antrum, and extend posteriorly into the nasopharynx.', 'Samter\'s triad consists of nasal polyposis, asthma, and aspirin intolerance.', 'Nasal polyps are insensitive to pain and do not bleed on touch, distinguishing them from neoplastic masses.'],
    examQA: [
      { q: 'How can you clinically differentiate a nasal polyp from an enlarged inferior turbinate?', a: 'A nasal polyp is pale, smooth, mobile, insensitive to pain, and does not shrink with topical decongestants. An inferior turbinate is pink/red, immobile, very sensitive to touch, and shrinks rapidly with decongestants.' },
      { q: 'What is the medical treatment of choice for bilateral ethmoidal polyps?', a: 'A prolonged course of Intranasal Corticosteroids (sometimes combined with a short tapering course of oral steroids) to reduce polyp size and inflammation.' },
      { q: 'Why is a unilateral nasal mass in an adult considered a red flag?', a: 'Because it carries a high index of suspicion for sinonasal malignancy or, in young males, a juvenile nasopharyngeal angiofibroma (JNA).' }
    ]
  },
  {
    id: 'pharynx-anatomy',
    name: 'Anatomy of Pharynx & Larynx',
    syllabusRef: 'Phase IV ENT',
    section: 'Throat & Neck (Laryngology)',
    description: 'The pharynx is divided into Nasopharynx, Oropharynx, and Hypopharynx. Waldeyer\'s ring is a circular ring of lymphoid tissue protecting the respiratory/GI tracts: pharyngeal tonsils (adenoids), tubal, palatine, and lingual tonsils. The larynx (voice box) consists of cartilages (thyroid, cricoid, arytenoid). The true vocal cords are lined by squamous epithelium. The recurrent laryngeal nerve supplies all intrinsic laryngeal muscles except the cricothyroid (supplied by superior laryngeal nerve).',
    svgKey: 'mbbs-ent-pharynx-anatomy',
    threejs3dFn: 'none',
    landmarks: ['Waldeyer\'s ring: Adenoids (superior), Tubal (lateral), Palatine (lateral), and Lingual tonsils (inferior).', 'The Recurrent Laryngeal Nerve (RLN) supplies all intrinsic muscles of the larynx EXCEPT the cricothyroid.', 'Damage to the RLN causes vocal cord paralysis and hoarseness.', 'The piriform fossa (in the hypopharynx) is a common site for swallowed foreign bodies like fish bones to lodge.'],
    examQA: [
      { q: 'Which nerve provides sensory innervation to the larynx above the vocal cords?', a: 'The Internal branch of the Superior Laryngeal Nerve (a branch of the Vagus nerve).' },
      { q: 'What components make up Waldeyer\'s ring?', a: 'The pharyngeal tonsil (adenoids) superiorly, the tubal tonsils laterally (near Eustachian tube opening), the palatine tonsils laterally (in the oropharynx), and the lingual tonsil inferiorly (base of tongue).' },
      { q: 'What is the function of the posterior cricoarytenoid muscle?', a: 'It is the ONLY muscle that abducts (opens) the vocal cords. All other intrinsic muscles act to adduct (close) or tense them.' }
    ]
  },
  {
    id: 'tonsillitis',
    name: 'Tonsillitis & Adenoidectomy',
    syllabusRef: 'Phase IV ENT',
    section: 'Throat & Neck (Laryngology)',
    description: 'Acute tonsillitis presents with sore throat, fever, dysphagia, and enlarged, exudate-covered tonsils (often Group A Strep). Chronic tonsillitis features recurrent acute attacks or halitosis due to tonsilloliths. Adenoid hypertrophy blocks the nasopharynx causing mouth breathing, snoring, OSA, and "adenoid facies". Tonsillectomy indications include recurrent acute tonsillitis (Paradise criteria: 7 episodes in 1 yr, or 5 per yr for 2 yrs), OSA, or suspected malignancy (asymmetric tonsil).',
    svgKey: 'mbbs-ent-tonsillitis',
    threejs3dFn: 'none',
    landmarks: ['Absolute indications for tonsillectomy: Obstructive Sleep Apnea (OSA), suspected malignancy, and recurrent severe bleeds.', 'Paradise criteria for recurrent tonsillitis: 7 episodes in the last year, OR 5 episodes/year for 2 years, OR 3 episodes/year for 3 years.', 'Adenoid facies: open mouth, high arched palate, elongated face, and pinched nose due to chronic mouth breathing.', 'Post-tonsillectomy hemorrhage is a surgical emergency; primary (<24h) is usually due to poor surgical hemostasis, secondary (5-10 days) is due to infection/sloughing.'],
    examQA: [
      { q: 'What is the difference between primary and secondary post-tonsillectomy hemorrhage?', a: 'Primary occurs within the first 24 hours (reactionary bleeding due to slipped ligatures or raised BP). Secondary occurs after 24 hours (usually days 5-10) and is almost always due to infection of the tonsillar fossa slough.' },
      { q: 'Why is an asymmetric, unilaterally enlarged tonsil in an adult highly suspicious?', a: 'It strongly suggests tonsillar malignancy, most commonly squamous cell carcinoma or lymphoma, requiring urgent biopsy/tonsillectomy.' },
      { q: 'What are the classic symptoms of adenoid hypertrophy in children?', a: 'Chronic mouth breathing, snoring, sleep apnea, nasal speech (hyponasal voice), and recurrent otitis media (due to Eustachian tube blockage).' }
    ]
  },
  {
    id: 'pharyngeal-abscesses',
    name: 'Pharyngeal Abscesses',
    syllabusRef: 'Phase IV ENT',
    section: 'Throat & Neck (Laryngology)',
    description: 'Quinsy (Peritonsillar Abscess) is a collection of pus between the tonsil capsule and superior constrictor muscle. Presents with severe unilateral throat pain, "hot potato" voice, trismus, and a medially displaced tonsil/uvula. Treatment is urgent needle aspiration or incision & drainage. Retropharyngeal abscess occurs behind the pharynx (common in kids under 5 due to retropharyngeal lymph nodes). Parapharyngeal abscess causes severe neck swelling and toxicity.',
    svgKey: 'mbbs-ent-pharyngeal-abscesses',
    threejs3dFn: 'none',
    landmarks: ['Quinsy (Peritonsillar Abscess) pushes the uvula to the contralateral side and is accompanied by severe trismus (inability to open mouth).', '"Hot potato voice" is the classic muffled voice quality seen in Quinsy and Epiglottitis.', 'Incision and drainage of Quinsy is performed at the point of maximum fluctuance (usually superior pole).', 'Retropharyngeal abscess in adults is typically secondary to spinal tuberculosis (Pott\'s disease), presenting as a chronic "cold abscess".'],
    examQA: [
      { q: 'How do you clinically differentiate acute severe tonsillitis from a peritonsillar abscess (Quinsy)?', a: 'Quinsy is typically unilateral, presents with marked trismus (spasm of pterygoid muscles), a muffled "hot potato" voice, and clinically visible swelling of the soft palate pushing the uvula away from the affected side.' },
      { q: 'What is the standard treatment for a Peritonsillar Abscess?', a: 'Urgent Needle aspiration or formal Incision & Drainage (I&D) under local anesthesia, accompanied by IV antibiotics and hydration.' },
      { q: 'On a lateral soft tissue neck X-ray, what finding suggests a retropharyngeal abscess?', a: 'Widening of the prevertebral soft tissue space (which should normally be thinner than the adjacent vertebral body in the cervical region).' }
    ]
  },
  {
    id: 'laryngeal-stridor',
    name: 'Laryngeal Disorders & Stridor',
    syllabusRef: 'Phase IV ENT',
    section: 'Throat & Neck (Laryngology)',
    description: 'Stridor is noisy breathing due to upper airway obstruction. Inspiratory stridor suggests supraglottic/glottic obstruction. Vocal nodules (Singer\'s nodes) are bilateral, benign, fibrous swellings at the junction of the anterior 1/3 and posterior 2/3 of the vocal cords due to voice abuse. Vocal cord palsy is often secondary to thyroid surgery or lung/mediastinal tumors compressing the recurrent laryngeal nerve. Unilateral palsy causes a weak, breathy voice; bilateral palsy causes severe stridor and airway compromise.',
    svgKey: 'mbbs-ent-laryngeal-stridor',
    threejs3dFn: 'none',
    landmarks: ['Stridor is a harsh, high-pitched respiratory sound indicating partial upper airway obstruction.', 'Vocal nodules are strictly bilateral and located at the junction of the anterior 1/3 and posterior 2/3 of the true vocal cords.', 'Left recurrent laryngeal nerve palsy is highly suspicious for a malignant mass in the left lung apex or mediastinum.', 'Unilateral vocal cord palsy causes a weak/breathy voice; Bilateral palsy presents as a life-threatening airway emergency with severe stridor.'],
    examQA: [
      { q: 'What is the primary treatment for vocal nodules?', a: 'Voice rest and speech/voice therapy. Surgery (microlaryngoscopy and excision) is reserved only for nodules that do not respond to prolonged conservative management.' },
      { q: 'What is Laryngomalacia?', a: 'The most common cause of stridor in infants. It is a congenital anomaly where immature, floppy supraglottic cartilages collapse inward during inspiration, causing stridor that worsens with feeding/crying and improves when prone.' },
      { q: 'A patient develops severe hoarseness immediately following a total thyroidectomy. What is the most likely cause?', a: 'Iatrogenic injury to the unilateral Recurrent Laryngeal Nerve.' }
    ]
  },
  {
    id: 'tracheostomy',
    name: 'Tracheostomy',
    syllabusRef: 'Phase IV ENT',
    section: 'Throat & Neck (Laryngology)',
    description: 'Tracheostomy is creating a stoma in the trachea to secure an airway. Indications: upper airway obstruction (tumors, severe trauma, bilateral VC palsy), protection from aspiration, or requiring prolonged mechanical ventilation. It is placed between the 2nd and 3rd tracheal rings. High tracheostomy (above 1st ring) risks subglottic stenosis. Complications include hemorrhage, tube blockage, dislodgement (fatal in first 48h), and surgical emphysema.',
    svgKey: 'mbbs-ent-tracheostomy',
    threejs3dFn: 'none',
    landmarks: ['Elective tracheostomy is typically performed through the 2nd and 3rd tracheal rings.', 'Damage to the 1st tracheal ring or cricoid cartilage leads to devastating subglottic stenosis.', 'Tube blockage with dried mucus is a common and lethal complication; requires constant humidification and suctioning.', 'Accidental decannulation (tube falling out) within the first 48-72 hours is an extreme emergency because the tract has not matured.'],
    examQA: [
      { q: 'What are the main absolute indications for a tracheostomy?', a: '1. Relief of severe upper airway obstruction. 2. Provision of prolonged mechanical ventilation (e.g., ICU patients). 3. Protection of the tracheobronchial tree from massive aspiration (e.g., bulbar palsy). 4. Tracheobronchial toilet (secretion clearance).' },
      { q: 'What is the critical anatomical landmark utilized to locate the trachea during surgery?', a: 'The cricoid cartilage. The incision into the trachea is made inferior to the cricoid, specifically through the 2nd and 3rd tracheal rings.' },
      { q: 'What is the immediate management if a tracheostomy tube gets completely blocked?', a: 'Remove the inner cannula, attempt rapid suctioning, and if the blockage persists, completely remove the entire blocked tracheostomy tube and replace it or bag-mask ventilate from above.' }
    ]
  },
  {
    id: 'head-neck-cancers',
    name: 'Head & Neck Cancers',
    syllabusRef: 'Phase IV ENT',
    section: 'Throat & Neck (Laryngology)',
    description: 'Majority are Squamous Cell Carcinomas (SCC) driven by tobacco and alcohol. Laryngeal carcinoma predominantly affects the glottis (true vocal cords); presents very early with hoarseness, ensuring good prognosis if caught. Supraglottic and subglottic cancers present later with stridor/dysphagia and have rich lymphatic drainage (early node metastasis). Nasopharyngeal carcinoma is associated with EBV, presents with unilateral middle ear effusion, neck mass, or epistaxis. Neck dissection classifies nodes into levels I-VI.',
    svgKey: 'mbbs-ent-head-neck-cancers',
    threejs3dFn: 'none',
    landmarks: ['Glottic (vocal cord) cancers present very early with persistent hoarseness and rarely metastasize to lymph nodes due to sparse lymphatic drainage.', 'Any persistent hoarseness > 3 weeks in a smoker mandates an urgent ENT referral for laryngoscopy.', 'Nasopharyngeal carcinoma is unique: it is strongly linked to the Epstein-Barr Virus (EBV) and frequently presents as a unilateral neck mass or unilateral glue ear in adults.', 'Radical Neck Dissection removes all lymphatic tissue from Levels I-V along with the SCM muscle, Internal Jugular Vein, and Spinal Accessory Nerve.'],
    examQA: [
      { q: 'Why does Glottic (true vocal cord) carcinoma have a relatively good prognosis compared to other head and neck cancers?', a: 'Because it presents very early with hoarseness, allowing early detection, and because the true vocal cords have practically zero lymphatic drainage, making regional lymph node metastasis extremely rare.' },
      { q: 'What is the classic presentation of a Nasopharyngeal Carcinoma (NPC)?', a: 'An adult presenting with a unilateral painless cervical lymph node mass, unilateral hearing loss (due to Eustachian tube blockage causing effusion), and occasionally epistaxis or cranial nerve palsies.' },
      { q: 'What are the primary risk factors for head and neck squamous cell carcinoma?', a: 'Heavy tobacco use (smoking or chewing) and high alcohol consumption. HPV (Human Papillomavirus type 16) is also a massive risk factor specifically for oropharyngeal (tonsil/base of tongue) cancers.' }
    ]
  }
];

let target = fs.readFileSync('topic-visuals.js', 'utf8');

const entSection = `
  mbbs_ent: {
    subjectName: 'MBBS ENT (Otorhinolaryngology)',
    examCode: 'BMDC',
    sections: ['Ear (Otology)', 'Nose (Rhinology)', 'Throat & Neck (Laryngology)'],
    topics: ${JSON.stringify(entTopics, null, 6).replace(/]$/, '    ]')}
  }
};`;

target = target.replace(/mbbs_paeds:\\s*\\{[\\s\\S]*?\\}\\s*\\]\\s*\\n\\s*\\}\\s*\\n\\};/, (match) => {
  return match.replace(/\\n\\};$/, ',\\n' + entSection);
});

fs.writeFileSync('topic-visuals.js', target);

let target2 = fs.readFileSync('topic-visuals.js', 'utf8');
if (!target2.includes('mbbs_ent')) {
  target2 = target2.replace(
    "if (name.includes('paediatrics') || name.includes('pediatrics') || name.includes('peds')) return 'mbbs_paeds';",
    "if (name.includes('ent') || name.includes('otorhinolaryngology')) return 'mbbs_ent';\\n  if (name.includes('paediatrics') || name.includes('pediatrics') || name.includes('peds')) return 'mbbs_paeds';"
  );
  fs.writeFileSync('topic-visuals.js', target2);
}

console.log('ENT topics added successfully');
