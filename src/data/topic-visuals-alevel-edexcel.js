// Topic Visualizer content — Edexcel International A Level.
//
// Split out of the single 1.9 MB topic-visuals.js so the loader can fetch one
// board's topic text instead of every board's. Paired with
// topic-svgs-alevel-edexcel.js, which holds this board's diagrams.
//
// 3 subjects, 51 topics. Generated — edit the content here, but keep the
// shape: { <tvKey>: { subjectName, examCode, sections, topics: [...] } }.

export const TV_ALEVEL_EDEXCEL = {
 "edexcel_alevel_biology": {
  "subjectName": "Edexcel A Level Biology",
  "examCode": "9BI0",
  "sections": [
   "All",
   "Health & Disease",
   "Genetics",
   "Ecology",
   "Physiology",
   "Neuroscience",
   "Microbiology"
  ],
  "topics": [
   {
    "id": "lifestyle-health-risk",
    "name": "Lifestyle, Health and Risk",
    "syllabusRef": "Topic 1",
    "section": "Health & Disease",
    "description": "Cardiovascular disease risk factors include smoking, poor diet, inactivity, and stress. Atherosclerosis: plaque (cholesterol, foam cells, fibrous/collagen tissue, calcium salts) builds in artery walls → narrowing → thrombosis. Blood pressure measurement; BMI; plasma cholesterol. Correlation does not imply causation; epidemiological studies establish risk factors.",
    "svgKey": "alevel-edx-bio-lifestyle-health-risk",
    "landmarks": [
     "Atherosclerosis",
     "Thrombosis",
     "Blood pressure (systolic/diastolic)",
     "BMI calculation",
     "Plasma cholesterol",
     "Smoking risk",
     "Correlation vs causation"
    ],
    "examQA": [
     {
      "q": "Explain how a thrombus can cause a myocardial infarction.",
      "a": "Atherosclerosis narrows coronary arteries. A thrombus (blood clot) may form at the plaque site, blocking the artery. Blood flow to cardiac muscle is cut off. Cardiac muscle cells are deprived of oxygen and glucose, so aerobic respiration ceases. Cells die from ATP depletion — this is a myocardial infarction (heart attack). Extent of damage depends on which artery is blocked."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Myocardial_infarction"
   },
   {
    "id": "genes-health",
    "name": "Genes and Health",
    "syllabusRef": "Topic 2",
    "section": "Genetics",
    "description": "Cystic fibrosis is caused by a recessive allele in the CFTR gene (chromosome 7). Mutant CFTR protein → non-functional Cl⁻ channel → thick mucus in lungs, pancreatic ducts. Inheritance: monohybrid, codominance, sex linkage. Genetic screening; gene therapy (viral/non-viral vectors). Antenatal diagnosis; ethical issues.",
    "svgKey": "alevel-edx-bio-genes-health",
    "sketchfab3dId": "224d09f75a674f4a8107e79e3d3d5552",
    "landmarks": [
     "CFTR gene (chromosome 7)",
     "Recessive inheritance (ff)",
     "Cl⁻ channel dysfunction",
     "Thick mucus",
     "Hardy-Weinberg equilibrium",
     "Gene therapy vectors",
     "Genetic screening ethics"
    ],
    "examQA": [
     {
      "q": "Explain why cystic fibrosis causes problems with gas exchange.",
      "a": "The mutant CFTR channel fails to secrete Cl⁻ into the mucus, so the water-potential gradient that normally draws water out of the epithelial cells is not established — the mucus stays poorly hydrated, thick and sticky. Cilia cannot clear this mucus effectively. It accumulates in bronchi/bronchioles, blocking airways. Bacteria colonise the mucus, causing repeated infections and inflammation. This progressively damages the lung epithelium and reduces gas exchange surface area."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Cystic_fibrosis"
   },
   {
    "id": "voice-of-genome",
    "name": "Voice of the Genome",
    "syllabusRef": "Topic 3",
    "section": "Genetics",
    "description": "Gene expression: transcription (DNA → pre-mRNA → mRNA via splicing introns); translation (mRNA → polypeptide at ribosome). Epigenetics: methylation (silences genes), histone modification (acetylation activates, deacetylation silences). Stem cell differentiation — totipotent, pluripotent, multipotent. Proteome wider than genome due to post-translational modification.",
    "svgKey": "alevel-edx-bio-voice-of-genome",
    "landmarks": [
     "Transcription → mRNA",
     "Translation → polypeptide",
     "Intron splicing",
     "Codon/anticodon",
     "Epigenetic methylation",
     "Histone acetylation",
     "Stem cell types"
    ],
    "examQA": [
     {
      "q": "Explain how DNA methylation can alter gene expression without changing the base sequence.",
      "a": "Methyl groups (−CH₃) are added to cytosine bases (often CpG islands) in the promoter region. This prevents transcription factors from binding to the promoter. RNA polymerase cannot transcribe the gene. The gene is silenced even though the sequence is unchanged. This is a reversible epigenetic change that can be inherited through cell division (mitosis), influencing cell differentiation and development."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Epigenetics"
   },
   {
    "id": "biodiversity-resources",
    "name": "Biodiversity and Natural Resources",
    "syllabusRef": "Topic 4",
    "section": "Ecology",
    "description": "Biodiversity: species richness and evenness (Simpson's Index D = 1 − Σ(n/N)²). Sampling: random quadrats, transects. Conservation of biodiversity: in situ (reserves) vs ex situ (seed banks, zoos). Natural products: plant-based medicines (taxol, aspirin), rubber, timber. Kew Gardens as global resource. Sustainable harvesting.",
    "svgKey": "alevel-edx-bio-biodiversity-natural-resources",
    "landmarks": [
     "Simpson's Index D",
     "Quadrat sampling",
     "In situ vs ex situ",
     "Seed banks (Kew)",
     "Plant-derived medicines",
     "Sustainable use",
     "Species richness/evenness"
    ],
    "examQA": [
     {
      "q": "Explain how Simpson's Diversity Index is calculated and what a higher value indicates.",
      "a": "D = 1 − Σ(n/N)² where n = number of individuals of each species, N = total individuals. Σ(n/N)² is summed for all species. D ranges from 0 (low diversity) to approaching 1 (high diversity). A higher D value indicates greater biodiversity — both more species (richness) and more even distribution among species. Squaring means dominant species have a greater effect than rare ones."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Diversity_index"
   },
   {
    "id": "on-wild-side",
    "name": "On the Wild Side",
    "syllabusRef": "Topic 5",
    "section": "Ecology",
    "description": "Photosynthesis: light reactions (thylakoid) produce ATP, NADPH, O₂; Calvin cycle (stroma) fixes CO₂ into glucose. Gross/net primary productivity. Carbon cycle: photosynthesis, respiration, decomposition, combustion. Climate change: greenhouse effect, global warming, ecosystem impacts. Succession: pioneer species → climax community.",
    "svgKey": "alevel-edx-bio-on-the-wild-side",
    "threejs3dFn": "createPhotosynthesisAnimation",
    "landmarks": [
     "Light-dependent reactions",
     "Calvin cycle (GP→G3P→RuBP)",
     "GPP − R = NPP",
     "Carbon cycle fluxes",
     "Greenhouse effect",
     "Ecological succession",
     "Peat bogs as carbon stores"
    ],
    "examQA": [
     {
      "q": "Describe the light-independent reactions of photosynthesis (Calvin cycle).",
      "a": "CO₂ combines with RuBP (5C) via rubisco to form two molecules of GP (glycerate-3-phosphate, 3C). ATP and NADPH (from light reactions) reduce GP to G3P (glyceraldehyde-3-phosphate). G3P is either used to synthesise glucose/sucrose/fatty acids, or regenerated into RuBP using ATP. One CO₂ is fixed per turn; three turns fix 3 CO₂ and yield one net G3P (six turns per glucose). Occurs in the stroma."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Calvin_cycle"
   },
   {
    "id": "immunity-infection",
    "name": "Immunity, Infection and Forensics",
    "syllabusRef": "Topic 6",
    "section": "Physiology",
    "description": "Non-specific defence: skin, mucus, phagocytosis. Specific immune response: B cells → antibodies (humoral); T cells (cell-mediated). Primary and secondary responses; memory cells. Vaccination (active) vs antiserum (passive). Monoclonal antibodies (ELISA, cancer treatment). DNA profiling: PCR, gel electrophoresis, STR analysis. Blood typing (ABO, Rh).",
    "svgKey": "alevel-edx-bio-immunity-infection-forensics",
    "sketchfab3dId": "45fceb1599254642b05888369208a523",
    "landmarks": [
     "Phagocytosis",
     "Antigen-antibody specificity",
     "B cells/plasma cells",
     "T helper/T killer cells",
     "Memory cells",
     "Monoclonal antibodies",
     "DNA profiling (STR)"
    ],
    "examQA": [
     {
      "q": "Explain how monoclonal antibodies are used in ELISA to detect a specific antigen.",
      "a": "The antigen (if present) binds to capture antibodies fixed to the test plate well. A second enzyme-linked monoclonal antibody (specific to the same antigen) is added and binds to the antigen-antibody complex (sandwich ELISA). Substrate is added; the enzyme converts it to a coloured product. The intensity of colour is proportional to antigen concentration. Absence of colour = antigen absent. High specificity — each antibody recognises only one antigenic site."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/ELISA"
   },
   {
    "id": "run-for-life",
    "name": "Run for Your Life",
    "syllabusRef": "Topic 7",
    "section": "Physiology",
    "description": "Skeletal muscle: slow-twitch (type I: aerobic, fatigue-resistant) vs fast-twitch (type II: anaerobic, powerful). Sliding filament theory: actin + myosin, Ca²⁺ releases troponin inhibition, cross-bridges form. Aerobic respiration (glycolysis → Krebs → ETC) vs anaerobic (lactic acid). Oxygen debt. VO₂ max as fitness measure. Cardiac output = stroke volume × heart rate.",
    "svgKey": "alevel-edx-bio-run-for-your-life",
    "threejs3dFn": "createRespirationAnimation",
    "landmarks": [
     "Slow/fast twitch muscle",
     "Sliding filament (actin/myosin)",
     "Ca²⁺ → troponin",
     "Glycolysis → Krebs → ETC",
     "Lactic acid (anaerobic)",
     "Oxygen debt",
     "Cardiac output = SV × HR"
    ],
    "examQA": [
     {
      "q": "Describe the sliding filament theory of muscle contraction.",
      "a": "Ca²⁺ released from the SR binds to troponin on actin filaments. Troponin changes shape, moving tropomyosin to expose myosin-binding sites on actin. Myosin heads (with ATP hydrolysed to ADP+Pi) bind to actin, forming cross-bridges. Power stroke: myosin head pivots, pulling actin toward M-line. ATP binds to myosin, detaching the head. ATP hydrolysis re-cocks the head. Cycle repeats while Ca²⁺ and ATP present. Net result: sarcomere shortens, muscle contracts."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Sliding_filament_theory"
   },
   {
    "id": "grey-matter",
    "name": "Grey Matter",
    "syllabusRef": "Topic 8",
    "section": "Neuroscience",
    "description": "Nervous system: sensory/motor/relay neurones. Resting potential (−70 mV): Na⁺/K⁺ ATPase. Action potential: depolarisation (Na⁺ in), repolarisation (K⁺ out), refractory period, saltatory conduction (myelinated). Synapse: ACh release, cleft diffusion, receptor binding, cholinesterase breakdown. Drugs affecting synapses. Brain regions. Nervous vs hormonal control.",
    "svgKey": "alevel-edx-bio-grey-matter",
    "sketchfab3dId": "01d20ef702ee41478a8bc1da8082e504",
    "landmarks": [
     "Resting potential −70 mV",
     "Action potential +40 mV",
     "Na⁺/K⁺ ATPase",
     "Refractory period",
     "Myelinated: saltatory conduction",
     "Synapse: ACh vesicles",
     "Brain: cerebellum/cortex/medulla"
    ],
    "examQA": [
     {
      "q": "Explain how an action potential is propagated along a myelinated neurone.",
      "a": "Myelin sheath (formed by Schwann cells) insulates the axon, preventing ion movement along the sheathed sections. Action potentials can only occur at nodes of Ranvier (gaps in myelin). Depolarisation at one node creates local currents that depolarise the next node — impulse 'jumps' from node to node (saltatory conduction). This is much faster than continuous conduction and reduces the energy needed for re-polarisation."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Myelination"
   },
   {
    "id": "unifying-concepts",
    "name": "Unifying Concepts in Biology",
    "syllabusRef": "Topic 9",
    "section": "Physiology",
    "description": "Unifying themes: cell theory, evolution by natural selection, genetics, biochemistry, homeostasis, and ecosystem interactions link all biological study. Communicating science; experimental design; statistical analysis (t-test, chi-squared, correlation, standard deviation). Ethical considerations in biological research. Evaluating experimental data, sources of error, and validity.",
    "svgKey": "alevel-edx-bio-unifying-concepts",
    "landmarks": [
     "Cell theory",
     "Natural selection",
     "Homeostasis (negative feedback)",
     "DNA → protein → phenotype",
     "Chi-squared/t-test",
     "Ecosystem energy flow",
     "Scientific method"
    ],
    "examQA": [
     {
      "q": "State two features of negative feedback and explain their importance in homeostasis.",
      "a": "Negative feedback: (1) a change from the set point is detected by a receptor/monitor; (2) a corrective response is triggered in the opposite direction to the original change, returning the variable to normal. Importance: maintains a constant internal environment (body temperature, blood glucose) essential for enzyme function and metabolic reactions to proceed at optimal rates."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Homeostasis"
   },
   {
    "id": "cellular-respiration",
    "name": "Cellular Respiration",
    "syllabusRef": "Topic 10",
    "section": "Physiology",
    "description": "Glycolysis (cytoplasm): glucose → 2 pyruvate, net 2 ATP, 2 NADH. Link reaction (matrix): pyruvate → acetyl CoA + CO₂ + NADH. Krebs cycle (matrix): 2 ATP, 6 NADH, 2 FADH₂ per glucose. Oxidative phosphorylation (cristae): ETC transfers electrons to O₂; proton gradient drives ATP synthase; ~34 ATP. Anaerobic: lactic acid (animals) or ethanol+CO₂ (yeast). RQ = CO₂/O₂.",
    "svgKey": "alevel-edx-bio-cellular-respiration",
    "sketchfab3dId": "7445a425050e49daa881070ca6917a91",
    "landmarks": [
     "Glycolysis (cytoplasm)",
     "Link reaction",
     "Krebs cycle (matrix)",
     "ETC (cristae)",
     "Chemiosmosis",
     "ATP synthase",
     "RQ = CO₂/O₂"
    ],
    "examQA": [
     {
      "q": "Explain how chemiosmosis produces ATP during oxidative phosphorylation.",
      "a": "NADH and FADH₂ donate electrons to electron transport chain proteins in the inner mitochondrial membrane. As electrons pass along the chain, protons (H⁺) are actively pumped from the matrix to the intermembrane space, creating a proton gradient (high concentration intermembrane space, low in matrix). Protons flow back through ATP synthase (chemiosmosis) down the gradient. The flow of H⁺ through the stalked particle (F₀F₁-ATPase) drives phosphorylation of ADP + Pi → ATP. O₂ is the final electron acceptor, forming water."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Oxidative_phosphorylation"
   },
   {
    "id": "photosynthesis",
    "name": "Photosynthesis",
    "syllabusRef": "Topic 11",
    "section": "Physiology",
    "description": "Light reactions (thylakoid): photosystem II absorbs light → water splits (photolysis) → O₂ + H⁺ + e⁻; ATP made (photophosphorylation); NADPH made. Photosystem I: NADP reduced to NADPH. Calvin cycle (stroma): CO₂ + RuBP → 2×GP → G3P (glucose). Limiting factors: CO₂, light intensity, temperature. Chlorophyll absorption spectrum vs action spectrum.",
    "svgKey": "alevel-edx-bio-photosynthesis",
    "sketchfab3dId": "7fe3ac29756a45c6b678804a8da8a760",
    "landmarks": [
     "Photosystem I/II",
     "Photolysis of water",
     "Cyclic/non-cyclic photophosphorylation",
     "NADPH",
     "RuBP carboxylation",
     "GP → G3P",
     "Limiting factors"
    ],
    "examQA": [
     {
      "q": "Explain why the action spectrum differs from the absorption spectrum of chlorophyll.",
      "a": "The absorption spectrum shows which wavelengths of light chlorophyll (a and b) absorbs — peaks in red and blue, low in green. The action spectrum shows the rate of photosynthesis at each wavelength. The two largely correlate, confirming chlorophyll drives photosynthesis. However, the action spectrum also shows photosynthesis at wavelengths absorbed by accessory pigments (carotenoids), which transfer energy to chlorophyll. This explains why the action spectrum is broader than chlorophyll's absorption spectrum alone."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Photosynthesis"
   },
   {
    "id": "genetics-evolution",
    "name": "Genetics and Evolution",
    "syllabusRef": "Topic 12",
    "section": "Genetics",
    "description": "Mendelian inheritance: dominant/recessive alleles, Punnett squares, monohybrid and dihybrid crosses, codominance, sex linkage. Hardy-Weinberg: p² + 2pq + q² = 1 (no selection, mutation, migration; large population). Natural selection: variation, differential reproduction, allele frequency change. Speciation: allopatric (geographic isolation → reproductive isolation). Chi-squared test to assess genetic data.",
    "svgKey": "alevel-edx-bio-genetics-evolution",
    "landmarks": [
     "Dominant/recessive",
     "Codominance",
     "Sex linkage (X-linked)",
     "Hardy-Weinberg equation",
     "Allele frequency change",
     "Allopatric speciation",
     "χ² test"
    ],
    "examQA": [
     {
      "q": "Using Hardy-Weinberg, calculate the frequency of carriers if the frequency of cystic fibrosis (recessive) is 1 in 2500.",
      "a": "q² = 1/2500 = 0.0004. q = √0.0004 = 0.02. p = 1 − q = 0.98. Carrier frequency 2pq = 2 × 0.98 × 0.02 = 0.0392 ≈ 1 in 25. About 4% of the population are carriers. Assumes no selection against CF allele, no mutation, random mating, large population, no migration."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Hardy%E2%80%93Weinberg_principle"
   },
   {
    "id": "coordination-response",
    "name": "Coordination and Response",
    "syllabusRef": "Topic 13",
    "section": "Neuroscience",
    "description": "Nervous vs endocrine control: fast/local vs slow/widespread. Neurotransmitters: ACh, noradrenaline, dopamine, serotonin, GABA. Hormones: adrenaline (fight-or-flight), insulin/glucagon (blood glucose), ADH (water balance), oestrogen/testosterone. Plant responses: auxin (phototropism), gibberellins (stem elongation, seed germination), ABA (dormancy, stomatal closure).",
    "svgKey": "alevel-edx-bio-coordination-response",
    "threejs3dFn": "createNerveImpulse",
    "landmarks": [
     "Nervous (fast) vs hormonal (slow)",
     "ACh/noradrenaline/GABA",
     "Adrenaline fight-or-flight",
     "Insulin/glucagon loop",
     "ADH osmoreceptors",
     "Auxin (phototropism)",
     "Gibberellins/ABA"
    ],
    "examQA": [
     {
      "q": "Explain the role of adrenaline in the fight-or-flight response.",
      "a": "Adrenaline is released from the adrenal medulla in response to stress. It binds to receptors on liver cells, activating adenylate cyclase → cAMP → protein kinase A → glycogen phosphorylase → glycogenolysis (glycogen → glucose). Blood glucose rises, providing fuel for muscles. Heart rate and cardiac output increase. Vasodilation to muscles, vasoconstriction to gut, bronchodilation. Pupils dilate. Prepares body for rapid physical action."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Adrenaline"
   },
   {
    "id": "homeostasis",
    "name": "Homeostasis",
    "syllabusRef": "Topic 14",
    "section": "Physiology",
    "description": "Negative feedback: receptor detects deviation → control centre → effector corrects. Thermoregulation: hypothalamus; vasodilation/vasoconstriction, sweating/shivering. Osmoregulation: kidney nephron — ultrafiltration (glomerulus), reabsorption (tubules); ADH controls collecting duct permeability. Blood glucose: insulin (β cells, glycogenesis) vs glucagon (α cells, glycogenolysis). Diabetes I/II.",
    "svgKey": "alevel-edx-bio-homeostasis",
    "landmarks": [
     "Negative feedback loop",
     "Thermoregulation: hypothalamus",
     "Vasodilation/constriction",
     "Nephron: glomerulus→tubule→CD",
     "ADH → aquaporins",
     "Insulin/glucagon",
     "Type 1/2 diabetes"
    ],
    "examQA": [
     {
      "q": "Explain how the kidney produces concentrated urine when blood water potential is low.",
      "a": "Low blood water potential detected by osmoreceptors in hypothalamus. Posterior pituitary releases more ADH into blood. ADH binds receptors on collecting duct and distal convoluted tubule cells. Aquaporin water channels are inserted into cell membranes. Permeability to water increases. More water is reabsorbed by osmosis from the filtrate into the blood. Urine becomes more concentrated (smaller volume, lower water potential). Blood water potential rises, reducing ADH release (negative feedback)."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Nephron"
   },
   {
    "id": "ecosystems",
    "name": "Ecosystems",
    "syllabusRef": "Topic 15",
    "section": "Ecology",
    "description": "Ecosystems: producers → consumers → decomposers. Energy transfer: ~10% between trophic levels. Gross primary productivity (GPP); net primary productivity (NPP = GPP − R). Nitrogen cycle: fixation (Rhizobium), nitrification (Nitrosomonas, Nitrobacter), denitrification (anaerobic bacteria), ammonification. Ecological succession: pioneer → seral communities → climax. Conservation vs sustainability.",
    "svgKey": "alevel-edx-bio-ecosystems",
    "threejs3dFn": "createEnergyTransfer",
    "landmarks": [
     "GPP/NPP",
     "~10% energy transfer",
     "Nitrogen fixation",
     "Nitrification/denitrification",
     "Succession stages",
     "Climax community",
     "Decomposers (nutrient cycling)"
    ],
    "examQA": [
     {
      "q": "Explain the role of decomposers in the nitrogen cycle.",
      "a": "Decomposers (bacteria and fungi) secrete proteases and deaminases that break down proteins in dead organic matter and excretory products. Amino acids are deaminated — amino groups (−NH₂) are removed and converted to ammonium ions (NH₄⁺) by ammonification. Nitrifying bacteria (Nitrosomonas) then oxidise NH₄⁺ → NO₂⁻; Nitrobacter oxidises NO₂⁻ → NO₃⁻ (nitrate), which plants can absorb. Without decomposers, nitrogen would be locked in dead matter and unavailable to producers."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Nitrogen_cycle"
   },
   {
    "id": "microbiology-pathogens",
    "name": "Microbiology and Pathogens",
    "syllabusRef": "Topic 16",
    "section": "Microbiology",
    "description": "Bacteria: prokaryotic (no nucleus), binary fission, growth curve (lag/log/stationary/death phases). Viruses: lytic cycle (attachment, injection, replication, lysis). Pathogen spread: direct contact, droplets, vectors, contaminated water/food. Antibiotics: bacteriostatic vs bactericidal; mechanisms; antibiotic resistance (MRSA). Koch's postulates. Aseptic technique. TB, malaria, HIV pathogenesis.",
    "svgKey": "alevel-edx-bio-microbiology-pathogens",
    "sketchfab3dId": "45fceb1599254642b05888369208a523",
    "landmarks": [
     "Binary fission",
     "Growth curve: lag/log/stat/death",
     "Lytic cycle stages",
     "Antibiotics: bactericidal/static",
     "MRSA resistance mechanism",
     "Koch's postulates",
     "Aseptic technique"
    ],
    "examQA": [
     {
      "q": "Explain how MRSA develops antibiotic resistance by natural selection.",
      "a": "Random mutations in some Staphylococcus aureus bacteria confer resistance to methicillin (e.g. altered penicillin-binding protein). In the absence of antibiotics, resistant and sensitive bacteria coexist. When methicillin is used, it kills all non-resistant bacteria (selection pressure). Resistant bacteria survive and reproduce rapidly (no competition for resources). They pass resistance genes (on plasmids or chromosome) to offspring. Over time, the entire population becomes resistant — MRSA. Horizontal gene transfer (conjugation) also spreads resistance between bacteria."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/MRSA"
   },
   {
    "id": "biotechnology",
    "name": "Biotechnology",
    "syllabusRef": "Topic 17",
    "section": "Microbiology",
    "description": "Recombinant DNA: restriction enzymes cut at palindromic sequences → sticky ends; ligase joins gene into plasmid vector; transformation into bacteria. PCR: denaturation (95°C), annealing (55°C), extension (72°C, Taq polymerase). Gel electrophoresis: DNA separation by size. Gene therapy (viral/non-viral vectors). Applications: insulin, HGH, GM crops, CRISPR-Cas9, bioremediation.",
    "svgKey": "alevel-edx-bio-biotechnology",
    "sketchfab3dId": "a2a731e2d3cf49939612c6ba48daeeb1",
    "landmarks": [
     "Restriction enzymes",
     "Sticky ends + DNA ligase",
     "Plasmid vector",
     "PCR three steps",
     "Taq polymerase",
     "Gel electrophoresis",
     "CRISPR-Cas9"
    ],
    "examQA": [
     {
      "q": "Describe how recombinant DNA technology is used to produce human insulin in bacteria.",
      "a": "1. The human insulin gene is identified and cut out using restriction enzymes, creating sticky ends. 2. The same restriction enzyme cuts a bacterial plasmid (vector) at the same palindromic site. 3. The insulin gene and plasmid are mixed; complementary sticky ends anneal; DNA ligase seals the sugar-phosphate backbone — recombinant plasmid formed. 4. Plasmid is introduced into E. coli (transformation) using heat shock or electroporation. 5. Bacteria are grown in fermenters; transformed bacteria produce and secrete human insulin, which is harvested and purified."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Recombinant_DNA"
   },
   {
    "id": "meiosis-variation",
    "name": "Meiosis and Variation",
    "syllabusRef": "Topic 18",
    "section": "Genetics",
    "description": "Meiosis I: homologous pairs separate (2n → n). Meiosis II: chromatids separate (n → 4 haploid cells). Sources of variation: crossing over (chiasmata in prophase I), independent assortment (metaphase I), random fertilisation. Mutations: point (base substitution), frameshift (insertion/deletion). Continuous vs discontinuous variation. Non-disjunction (e.g. Down syndrome, trisomy 21).",
    "svgKey": "alevel-edx-bio-meiosis-variation",
    "threejs3dFn": "createCellDivision",
    "landmarks": [
     "Meiosis I: homologs separate",
     "Meiosis II: chromatids separate",
     "Crossing over (chiasmata)",
     "Independent assortment",
     "4 haploid gametes",
     "Point/frameshift mutation",
     "Non-disjunction"
    ],
    "examQA": [
     {
      "q": "Explain how crossing over during meiosis increases genetic variation.",
      "a": "During prophase I, homologous chromosomes pair up (synapsis) forming bivalents. Chromatids of homologous chromosomes cross over at chiasmata. Segments of DNA are exchanged between non-sister chromatids. This creates new combinations of alleles on each chromosome (recombination). The resulting chromatids contain allele combinations not present in either parent chromosome. Combined with independent assortment, this produces gametes with enormous genetic diversity, increasing variation in offspring."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Meiosis"
   }
  ]
 },
 "edexcel_alevel_chemistry": {
  "subjectName": "Edexcel A Level Chemistry",
  "examCode": "9CH0",
  "sections": [
   "All",
   "Physical Chemistry",
   "Inorganic Chemistry",
   "Organic Chemistry",
   "Analytical"
  ],
  "topics": [
   {
    "id": "atomic-structure",
    "name": "Atomic Structure",
    "syllabusRef": "Topic 1",
    "section": "Physical Chemistry",
    "description": "Atoms: protons/neutrons in nucleus, electrons in shells and sub-shells (s, p, d, f). Atomic number Z, mass number A. Isotopes: same Z, different A. Relative atomic mass from mass spectrometry. Electronic configuration: Aufbau principle, Hund's rule, Pauli exclusion. Ionisation energies as evidence for shell structure. First IE across Period 3 shows sub-shell effects.",
    "svgKey": "alevel-edx-chem-atomic-structure",
    "threejs3dFn": "createAtomModel",
    "landmarks": [
     "Proton number Z",
     "Mass number A",
     "Isotopes",
     "Sub-shells: s p d f",
     "Electronic configuration",
     "Ionisation energy trend",
     "Mass spectrometry"
    ],
    "examQA": [
     {
      "q": "Explain why there is a decrease in first ionisation energy from Mg to Al.",
      "a": "Mg has configuration [Ne]3s². Al has configuration [Ne]3s²3p¹. The 3p electron in Al is in a higher energy sub-shell than the 3s electrons in Mg, so it is further from the nucleus. The 3p electron also experiences more shielding from the 3s electrons. Therefore less energy is needed to remove the outer electron from Al than from Mg, despite Al having a higher nuclear charge."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Atomic_structure"
   },
   {
    "id": "bonding-structure",
    "name": "Bonding and Structure",
    "syllabusRef": "Topic 2",
    "section": "Physical Chemistry",
    "description": "Ionic bonding: electron transfer, lattice energy, electrostatic forces (high mp, conducts when molten). Covalent: shared pairs, dative bonds, VSEPR shapes, polarity, electronegativity. Metallic: delocalized e⁻, lattice of ions. Giant covalent (diamond/graphite/SiO₂): very high mp. Intermolecular forces: London, dipole-dipole, hydrogen bonding. Structures determine properties.",
    "svgKey": "alevel-edx-chem-bonding-structure",
    "threejs3dFn": "createMetalLattice",
    "landmarks": [
     "Ionic lattice",
     "VSEPR: tetrahedral/trigonal/linear",
     "Electronegativity → polarity",
     "H-bonding: F-H…F",
     "London dispersion forces",
     "Giant covalent lattice",
     "Metallic bonding"
    ],
    "examQA": [
     {
      "q": "Explain why graphite conducts electricity but diamond does not, even though both are forms of carbon.",
      "a": "In graphite, each carbon forms 3 covalent bonds in hexagonal layers. Each carbon contributes one electron to a delocalised π system above and below the layers — these electrons can move freely and carry charge. In diamond, each carbon forms 4 covalent bonds in a tetrahedral 3D lattice; all four outer electrons are used in bonding with no delocalised electrons. No free electrons means no conductivity in diamond."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Chemical_bond"
   },
   {
    "id": "redox",
    "name": "Redox",
    "syllabusRef": "Topic 3",
    "section": "Physical Chemistry",
    "description": "Oxidation: loss of electrons (ox. state increases). Reduction: gain of electrons (ox. state decreases). OIL RIG. Rules for oxidation states: elements = 0; O = −2; H = +1 (usually). Half equations; overall redox equations. Disproportionation (same element simultaneously oxidised and reduced). Displacement reactions; electrochemical series. Redox titrations (MnO₄⁻).",
    "svgKey": "alevel-edx-chem-redox",
    "threejs3dFn": "createReactionAnimation('collision')",
    "landmarks": [
     "OIL RIG mnemonic",
     "Oxidation state rules",
     "Half equations",
     "Disproportionation",
     "Displacement reactions",
     "MnO₄⁻ titrations",
     "Electrochemical series"
    ],
    "examQA": [
     {
      "q": "Construct the ionic equation for the reaction of chlorine water with iron(II) sulfate solution.",
      "a": "Fe²⁺ is oxidised to Fe³⁺; Cl₂ is reduced to Cl⁻. Half equations: Fe²⁺ → Fe³⁺ + e⁻ (×2); Cl₂ + 2e⁻ → 2Cl⁻. Overall: 2Fe²⁺ + Cl₂ → 2Fe³⁺ + 2Cl⁻. Cl₂ is the oxidising agent (reduced). Fe²⁺ is the reducing agent (oxidised). Check: charge balanced, atoms balanced."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Redox"
   },
   {
    "id": "inorganic-chemistry",
    "name": "Inorganic Chemistry",
    "syllabusRef": "Topic 4",
    "section": "Inorganic Chemistry",
    "description": "Group 2 (alkaline earth metals): reactivity increases down group; react with H₂O → M + 2H₂O → M(OH)₂ + H₂; oxides/hydroxides are basic; uses of Ca(OH)₂, CaO. Group 7 (halogens): electronegativity/reactivity decreases down group; displacement reactions; Cl₂ + H₂O → HCl + HClO (disproportionation). Period 3 oxides: basic (Na₂O) → acidic (P₄O₁₀); chlorides: ionic (NaCl) → covalent (PCl₅, acidic hydrolysis).",
    "svgKey": "alevel-edx-chem-inorganic-chemistry",
    "landmarks": [
     "Group 2 reactivity trend",
     "M + 2H₂O → M(OH)₂ + H₂",
     "Halogen displacement",
     "Cl₂ disproportionation",
     "Period 3 oxide types",
     "Flame tests",
     "Precipitate tests (OH⁻, CO₃²⁻)"
    ],
    "examQA": [
     {
      "q": "Explain why barium reacts more vigorously with water than magnesium.",
      "a": "Reactivity of Group 2 metals increases down the group. Ba has more electron shells than Mg, so the outer electrons are further from the nucleus and shielded by more inner shells. The ionisation energies of Ba are much lower than Mg. Ba loses electrons more easily to form Ba²⁺ ions. The reaction Ba + 2H₂O → Ba(OH)₂ + H₂ is more vigorous than the equivalent Mg reaction, which is very slow at room temperature (Mg oxide layer also provides a barrier)."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Alkaline_earth_metal"
   },
   {
    "id": "formulae-amounts",
    "name": "Formulae, Equations and Amounts of Substance",
    "syllabusRef": "Topic 5",
    "section": "Physical Chemistry",
    "description": "Mole: n = m/Mr; n = cV (dm³); n = pV/RT (ideal gas, R = 8.31 J mol⁻¹ K⁻¹). Avogadro constant: 6.02×10²³ mol⁻¹. Molar volume: 24 dm³ at RTP (22.4 dm³ at STP). Empirical and molecular formulae. Percentage yield; atom economy. Limiting reagent. Balancing equations; ionic equations. Titration calculations.",
    "svgKey": "alevel-edx-chem-formulae-amounts",
    "landmarks": [
     "n = m/Mr",
     "n = cV",
     "pV = nRT",
     "Avogadro 6.02×10²³",
     "24 dm³ molar volume (RTP)",
     "Empirical formula",
     "Atom economy"
    ],
    "examQA": [
     {
      "q": "A 2.40 g sample of magnesium reacts with excess oxygen to produce magnesium oxide. Calculate the mass of MgO formed. (Ar: Mg=24, O=16)",
      "a": "2Mg + O₂ → 2MgO. Moles Mg = 2.40/24 = 0.1 mol. Mole ratio Mg:MgO = 1:1, so moles MgO = 0.1 mol. Mr(MgO) = 24+16 = 40. Mass MgO = 0.1 × 40 = 4.0 g."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Stoichiometry"
   },
   {
    "id": "organic-intro",
    "name": "Introduction to Organic Chemistry",
    "syllabusRef": "Topic 6",
    "section": "Organic Chemistry",
    "description": "Homologous series (same general formula, functional group, differ by CH₂). IUPAC nomenclature. Structural isomers: chain, position, functional group. Stereoisomers: E/Z (cis/trans around C=C); optical (chiral carbon, 4 different groups). Reaction types: free radical substitution (alkanes), electrophilic addition (alkenes), nucleophilic substitution (halogenoalkanes). Displayed, structural, skeletal formulae.",
    "svgKey": "alevel-edx-chem-organic-intro",
    "threejs3dFn": "createMolecule('methane')",
    "landmarks": [
     "Homologous series",
     "IUPAC naming",
     "Structural isomers (chain/position/functional)",
     "E/Z isomers",
     "Optical isomers (chiral centre)",
     "Free radical mechanism",
     "Electrophilic/nucleophilic"
    ],
    "examQA": [
     {
      "q": "Explain what is meant by E/Z isomerism and state the condition required for it to occur.",
      "a": "E/Z isomerism is a type of stereoisomerism where groups are fixed in different spatial arrangements due to restricted rotation about a C=C double bond. The condition is that each carbon of the C=C must carry two different substituents. Z (from German 'zusammen' = together): higher priority groups on same side. E (from 'entgegen' = opposite): higher priority groups on opposite sides. Priority determined by atomic number (Cahn-Ingold-Prelog rules)."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/E%E2%80%93Z_isomerism"
   },
   {
    "id": "analytical-techniques",
    "name": "Modern Analytical Techniques",
    "syllabusRef": "Topic 7",
    "section": "Analytical",
    "description": "Mass spectrometry: M⁺ molecular ion gives Mr; fragmentation patterns identify structure. Infrared (IR): functional groups absorb at characteristic wavenumbers (O-H: 2500–3300 cm⁻¹; C=O: ~1700; N-H: 3300–3500; fingerprint region < 1500 cm⁻¹). ¹H NMR: δ (ppm) shift identifies H environment; integration = relative number of H; n+1 splitting; D₂O shake removes exchangeable H.",
    "svgKey": "alevel-edx-chem-analytical-techniques",
    "landmarks": [
     "M⁺ molecular ion",
     "Fragmentation pattern",
     "IR: O-H/C=O/N-H cm⁻¹",
     "Fingerprint region",
     "δ (ppm) chemical shift",
     "n+1 splitting rule",
     "D₂O shake"
    ],
    "examQA": [
     {
      "q": "An unknown compound shows IR absorptions at 2500–3300 cm⁻¹ and ~1710 cm⁻¹. Identify the functional groups present.",
      "a": "Broad absorption at 2500–3300 cm⁻¹ indicates an O-H stretch — consistent with a carboxylic acid (−COOH), which gives a very broad absorption in this range due to hydrogen bonding. The sharp absorption at ~1710 cm⁻¹ indicates a C=O (carbonyl) stretch. Together these confirm a carboxylic acid functional group (−COOH): both O-H and C=O are present. An alcohol alone would show O-H (~3200–3550 cm⁻¹) but no C=O."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Infrared_spectroscopy"
   },
   {
    "id": "energetics",
    "name": "Energetics",
    "syllabusRef": "Topic 8",
    "section": "Physical Chemistry",
    "description": "Enthalpy change ΔH: exothermic (ΔH < 0), endothermic (ΔH > 0). Calorimetry: q = mcΔT. Hess's law: ΔH independent of route. Bond enthalpies: ΔH = Σ(bonds broken) − Σ(bonds made). Standard enthalpies: ΔHf°, ΔHc°, ΔHneutr°. Born-Haber cycle for lattice enthalpy. Entropy ΔS. Gibbs: ΔG = ΔH − TΔS; spontaneous if ΔG < 0.",
    "svgKey": "alevel-edx-chem-energetics",
    "threejs3dFn": "createEnergyTransfer",
    "landmarks": [
     "ΔH exo (<0) / endo (>0)",
     "q = mcΔT",
     "Hess's law",
     "Bond enthalpies",
     "Born-Haber cycle",
     "ΔG = ΔH − TΔS",
     "Entropy disorder"
    ],
    "examQA": [
     {
      "q": "Use bond enthalpies to calculate ΔH for CH₄ + 2O₂ → CO₂ + 2H₂O. (C-H: 412; O=O: 496; C=O: 743; O-H: 463 kJ mol⁻¹)",
      "a": "Bonds broken: 4×C-H + 2×O=O = 4(412) + 2(496) = 1648 + 992 = 2640 kJ. Bonds made: 2×C=O (in CO₂) + 4×O-H (in 2H₂O) = 2(743) + 4(463) = 1486 + 1852 = 3338 kJ. ΔH = 2640 − 3338 = −698 kJ mol⁻¹. Exothermic (negative ΔH)."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Standard_enthalpy_of_combustion"
   },
   {
    "id": "kinetics",
    "name": "Kinetics",
    "syllabusRef": "Topic 9",
    "section": "Physical Chemistry",
    "description": "Collision theory: rate ∝ frequency × energy of successful collisions. Activation energy Ea. Maxwell-Boltzmann distribution: increasing T shifts curve right, more molecules exceed Ea. Rate equation: rate = k[A]ᵐ[B]ⁿ (orders determined experimentally, not from equation). Half-life t½. Arrhenius: k = Ae^{−Ea/RT}. Catalysts lower Ea; heterogeneous (active site adsorption) vs homogeneous.",
    "svgKey": "alevel-edx-chem-kinetics",
    "threejs3dFn": "createCollisionAnimation",
    "landmarks": [
     "Collision frequency × energy",
     "Maxwell-Boltzmann curve",
     "Activation energy Ea",
     "rate = k[A]ᵐ[B]ⁿ",
     "Order from initial rates",
     "Arrhenius equation",
     "Catalyst: lowers Ea"
    ],
    "examQA": [
     {
      "q": "Explain how increasing temperature increases reaction rate using the Maxwell-Boltzmann distribution.",
      "a": "The Maxwell-Boltzmann distribution shows the distribution of kinetic energies among molecules at a given temperature. At higher temperature: the curve shifts to the right and becomes flatter (broader). The peak moves to higher energy. The area under the curve beyond the activation energy Ea (representing molecules with enough energy to react) increases significantly — even a small rise in temperature causes a large increase in this fraction. More successful collisions per unit time → higher rate. (Rate approximately doubles per 10°C rise for many reactions.)"
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Reaction_rate"
   },
   {
    "id": "chemical-equilibrium",
    "name": "Chemical Equilibrium",
    "syllabusRef": "Topic 10",
    "section": "Physical Chemistry",
    "description": "Dynamic equilibrium: forward and reverse rates equal; concentrations constant. Le Chatelier's principle: system shifts to oppose any applied change. Kc = [products]/[reactants] (products over reactants, molar concentrations). Effect of T on Kc: only temperature changes K (not concentration, pressure, or catalyst). Kp uses partial pressures. Industrial examples: Haber process (N₂+3H₂⇌2NH₃), Contact process (SO₂+½O₂⇌SO₃).",
    "svgKey": "alevel-edx-chem-chemical-equilibrium",
    "threejs3dFn": "createReactionAnimation",
    "landmarks": [
     "Dynamic equilibrium",
     "Le Chatelier's principle",
     "Kc expression",
     "Effect of T on Kc",
     "Effect of concentration/pressure",
     "Catalyst: no shift",
     "Haber/Contact process"
    ],
    "examQA": [
     {
      "q": "For the Haber process, N₂ + 3H₂ ⇌ 2NH₃ (ΔH = −92 kJ mol⁻¹), explain the choice of temperature as a compromise.",
      "a": "Low temperature favours the forward (exothermic) reaction by Le Chatelier's principle — Kc increases as T decreases, giving higher equilibrium yield. However, at low temperature the rate is very slow (fewer molecules exceed Ea). A compromise temperature (~450°C) is used with an iron catalyst. The catalyst increases rate without affecting the equilibrium position, allowing a reasonable yield in an economically viable time. High pressure also favours products (4 mol gas → 2 mol gas)."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Haber_process"
   },
   {
    "id": "acid-base",
    "name": "Acid-Base Equilibria",
    "syllabusRef": "Topic 12",
    "section": "Physical Chemistry",
    "description": "Brønsted-Lowry: acid = H⁺ donor; base = H⁺ acceptor. Conjugate pairs. pH = −log[H⁺]; Kw = [H⁺][OH⁻] = 1×10⁻¹⁴ at 25°C. Weak acid Ka; pKa = −logKa; Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]). Buffer solutions. Strong/weak acids and bases. Titration curves; indicator selection (range must span equivalence point). Half-equivalence: pH = pKa.",
    "svgKey": "alevel-edx-chem-acid-base-equilibria",
    "landmarks": [
     "Brønsted-Lowry acid/base",
     "pH = −log[H⁺]",
     "Kw = 1×10⁻¹⁴",
     "Ka and pKa",
     "Henderson-Hasselbalch",
     "Buffer action",
     "Titration curve/indicator"
    ],
    "examQA": [
     {
      "q": "Explain how a buffer solution maintains a nearly constant pH when small amounts of acid or base are added.",
      "a": "A buffer contains a weak acid HA and its conjugate base A⁻ (from a salt). When H⁺ is added: H⁺ + A⁻ → HA; H⁺ is removed from solution, pH remains nearly constant. When OH⁻ is added: OH⁻ + HA → A⁻ + H₂O; OH⁻ is removed by reacting with HA, pH remains nearly constant. Effective only when [A⁻] and [HA] are both significant and the added acid/base is small compared to their concentrations."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Buffer_solution"
   },
   {
    "id": "further-organic",
    "name": "Further Organic Chemistry",
    "syllabusRef": "Topic 12",
    "section": "Organic Chemistry",
    "description": "Carbonyls: aldehydes (RCHO, Tollens'/Fehling's test) vs ketones (RCOR', no reducing test). NaBH₄ reduction → alcohol; HCN nucleophilic addition → hydroxynitrile. Carboxylic acids (RCOOH) and esters (esterification: H₂SO₄ catalyst). Acid chlorides (RCOCl): react with water/alcohols/amines. Benzene: aromatic stability; electrophilic substitution (nitration, Friedel-Crafts alkylation/acylation).",
    "svgKey": "alevel-edx-chem-further-organic",
    "threejs3dFn": "createMolecule('benzene')",
    "landmarks": [
     "Aldehyde vs ketone tests",
     "NaBH₄ reduction",
     "HCN nucleophilic addition",
     "Esterification",
     "Acid chloride reactions",
     "Benzene electrophilic sub.",
     "Nitration HNO₃/H₂SO₄"
    ],
    "examQA": [
     {
      "q": "Describe a chemical test to distinguish between propanal and propanone, and state the result for each.",
      "a": "Add Tollens' reagent (ammoniacal silver nitrate) to each compound in a warm water bath. Propanal (aldehyde, RCHO) is a reducing agent: it reduces Ag⁺ to Ag metal, depositing a silver mirror on the tube — positive result. Propanone (ketone, RCOR') cannot be oxidised under these conditions — no silver mirror, solution remains colourless. Fehling's solution (Cu²⁺ → brick red Cu₂O precipitate) also distinguishes: positive with aldehydes, negative with ketones."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Tollens%27_reagent"
   },
   {
    "id": "transition-metals",
    "name": "Transition Metals",
    "syllabusRef": "Topic 15",
    "section": "Inorganic Chemistry",
    "description": "Transition metals: d-block elements forming at least one stable ion with an incomplete d sub-shell (Ti–Cu; Sc and Zn are d-block but excluded, being d⁰ and d¹⁰ as ions). Properties: variable oxidation states, coloured ions (d-d electronic transition), complex ion formation, catalytic activity, paramagnetism. Complex ions: central metal ion + ligands (lone pair donors); coordination number 6 (octahedral) or 4 (tetrahedral/square planar). Ligand substitution; EDTA; stability constants. Precipitation reactions with NaOH.",
    "svgKey": "alevel-edx-chem-transition-metals",
    "landmarks": [
     "Variable oxidation states",
     "Coloured ions (d-d transition)",
     "Ligand (lone pair donor)",
     "Coordination number 6",
     "Octahedral complex",
     "Fe²⁺/Fe³⁺ colours",
     "Catalytic activity (V₂O₅, Fe)"
    ],
    "examQA": [
     {
      "q": "Explain why transition metal ions are coloured.",
      "a": "Transition metal ions have an incomplete d sub-shell. When ligands surround the metal ion, they split the 5 d orbitals into two groups of different energy (crystal field splitting). When light of the appropriate wavelength hits the complex, electrons are promoted from lower to higher d orbitals, absorbing that wavelength. The complementary colour to the absorbed wavelength is transmitted/reflected — hence the observed colour. Different ligands and different metals cause different splitting — different colours."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Crystal_field_theory"
   },
   {
    "id": "electrochemistry",
    "name": "Electrochemistry",
    "syllabusRef": "Topic 14",
    "section": "Physical Chemistry",
    "description": "Standard electrode potential E° (vs SHE, E°=0). Cell EMF: E°cell = E°cathode − E°anode. Spontaneous if E°cell > 0 (ΔG° = −nFE°cell). Nernst equation: non-standard conditions. Electrolysis: Q = It; moles discharged = Q/(F×charge). Electrode reactions: anode (oxidation), cathode (reduction). Electrolysis of NaCl(aq): Cl₂, H₂, NaOH. Fuel cells: H₂/O₂ → H₂O + electricity (no combustion).",
    "svgKey": "alevel-edx-chem-electrochemistry",
    "landmarks": [
     "Standard electrode potential E°",
     "SHE (H₂/H⁺, E°=0)",
     "E°cell = E°cathode − E°anode",
     "ΔG° = −nFE°cell",
     "Faraday Q = It",
     "Electrolysis: anode oxidation",
     "Fuel cell H₂/O₂"
    ],
    "examQA": [
     {
      "q": "Calculate the mass of copper deposited when a current of 2.0 A flows for 30 minutes during the electrolysis of CuSO₄(aq). (Ar Cu=63.5, F=96500 C mol⁻¹)",
      "a": "Q = It = 2.0 × (30 × 60) = 3600 C. Moles of electrons = Q/F = 3600/96500 = 0.0373 mol e⁻. Cu²⁺ + 2e⁻ → Cu: moles Cu = 0.0373/2 = 0.0187 mol. Mass Cu = 0.0187 × 63.5 = 1.19 g ≈ 1.2 g."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Electrolysis"
   },
   {
    "id": "organic-mechanisms",
    "name": "Organic Mechanisms",
    "syllabusRef": "Topic 15",
    "section": "Organic Chemistry",
    "description": "Curly arrows: double-headed (pair of electrons, heterolytic); fish-hook (one electron, homolytic). Free radical substitution: initiation (Cl₂ → 2Cl•), propagation (two steps), termination. Electrophilic addition (alkenes): carbocation intermediate. Nucleophilic substitution: SN1 (tertiary, carbocation) vs SN2 (primary, backside attack, inversion). Elimination. Electrophilic substitution (benzene): NO₂⁺/carbocation intermediate.",
    "svgKey": "alevel-edx-chem-organic-mechanisms",
    "landmarks": [
     "Double-headed curly arrow",
     "Fish-hook arrow (homolytic)",
     "Free radical: initiation/propagation/termination",
     "Electrophilic addition (carbocation)",
     "SN1 vs SN2",
     "Inversion (SN2 Walden)",
     "Electrophilic substitution"
    ],
    "examQA": [
     {
      "q": "Describe the SN2 mechanism for the reaction of 1-bromobutane with hydroxide ions, including a description of the transition state.",
      "a": "OH⁻ (nucleophile) approaches the carbon bearing Br from the back (180° to the C-Br bond). A transition state forms: the carbon has five partial bonds (OH and Br both partially bonded, three C-C or C-H bonds). The C-Br bond breaks heterolytically as Br⁻ leaves. The configuration at the carbon inverts (Walden inversion) — like an umbrella turning inside out. Product: butan-1-ol + Br⁻. SN2 is a one-step, concerted mechanism — no intermediate."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/SN2_reaction"
   },
   {
    "id": "polymers",
    "name": "Polymers",
    "syllabusRef": "Topic 16",
    "section": "Organic Chemistry",
    "description": "Addition polymerisation: alkene monomers (no by-product) → poly(ethene), PVC, PTFE. Condensation polymerisation: two functional groups react, eliminating H₂O or HCl. Polyesters (−OH + −COOH → ester link, e.g. Terylene): hydrolysed by acid or base. Polyamides (−NH₂ + −COOH → amide link, e.g. Nylon): hydrolysed to amine and acid. Proteins = natural polyamides. PLA: biodegradable.",
    "svgKey": "alevel-edx-chem-polymers",
    "threejs3dFn": "createPolymerChain",
    "landmarks": [
     "Addition: C=C opens",
     "Condensation: H₂O eliminated",
     "Ester link (polyester)",
     "Amide link (polyamide)",
     "Nylon-6,6 monomers",
     "Hydrolysis of polymers",
     "Biodegradable PLA"
    ],
    "examQA": [
     {
      "q": "Draw the repeat unit of Nylon-6,6 and describe the type of polymerisation used in its formation.",
      "a": "Nylon-6,6 is formed by condensation polymerisation between hexane-1,6-diamine [H₂N(CH₂)₆NH₂] and hexanedioic acid [HOOC(CH₂)₄COOH]. The −NH₂ of one monomer reacts with the −COOH of the other, eliminating water and forming an amide (peptide) bond: −CO−NH−. The repeat unit is [−OC−(CH₂)₄−CO−NH−(CH₂)₆−NH−]. It is a condensation (step-growth) polymer. Each polymerisation step eliminates one molecule of water."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Nylon"
   },
   {
    "id": "organic-nitrogen",
    "name": "Organic Nitrogen Compounds",
    "syllabusRef": "Topic 18",
    "section": "Organic Chemistry",
    "description": "Amines (RNH₂): basic (lone pair on N); react with acids; nucleophiles with halogenoalkanes/acid chlorides → amides. Amides (RCONH₂): hydrolysed by acid/alkali. Amino acids (H₂N-CHR-COOH): zwitterions at isoelectric point; condensation → peptide bonds → proteins. Diazotisation (ArNH₂ + HNO₂, 0–5°C) → ArN₂⁺; coupling with phenols/amines → azo dyes.",
    "svgKey": "alevel-edx-chem-organic-nitrogen",
    "landmarks": [
     "Amine basicity (lone pair)",
     "Amide bond formation",
     "Amino acid zwitterion",
     "Isoelectric point",
     "Peptide bond",
     "Diazotisation 0–5°C",
     "Azo dye coupling"
    ],
    "examQA": [
     {
      "q": "Explain why phenylamine (aniline) is a weaker base than cyclohexylamine.",
      "a": "In phenylamine (C₆H₅NH₂), the lone pair on nitrogen is delocalised into the benzene ring π system. This reduces the availability of the lone pair to accept a proton (H⁺), making phenylamine a weaker base. In cyclohexylamine (C₆H₁₁NH₂), there is no delocalisation — the lone pair is fully available to accept H⁺, making it a stronger base. The electron-withdrawing effect of the ring further reduces nitrogen's electron density in phenylamine."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Amine"
   },
   {
    "id": "chromatography-spectroscopy",
    "name": "Chromatography and Spectroscopy",
    "syllabusRef": "Topic 19",
    "section": "Analytical",
    "description": "Chromatography: Rf = distance spot / distance solvent front. TLC (thin layer), paper, GC (retention time), HPLC. Combined GC-MS for identification. NMR: ¹H chemical shifts (δ ppm): TMS = 0; R-CH₃ ~1; Ar-H ~7; CHO ~9-10; COOH ~11-12. ¹³C NMR: one peak per distinct C environment. D₂O removes exchangeable H peaks (OH, NH). UV-visible spectroscopy: Beer-Lambert law A = εcl.",
    "svgKey": "alevel-edx-chem-chromatography-spectroscopy",
    "landmarks": [
     "Rf = dist spot/solvent",
     "TLC/GC/HPLC",
     "GC-MS identification",
     "¹H NMR δ ppm shifts",
     "¹³C NMR environments",
     "D₂O shake (OH/NH)",
     "Beer-Lambert A = εcl"
    ],
    "examQA": [
     {
      "q": "A compound gives a ¹H NMR spectrum with three peaks in ratio 3:2:1 at \u03b4 1.2, 2.4, and 11.5 ppm. Identify the compound.",
      "a": "δ 1.2 (ratio 3): CH₃ group. \u03b4 2.4 (ratio 2): CH\u2082 adjacent to the C=O of a carboxylic acid. δ 11.5 (ratio 1): COOH proton (exchangeable, removed by D₂O shake). Pattern 3:2:1 → CH₃-CH₂-COOH = propanoic acid. The 3 equivalent CH₃ protons split the CH₂ signal into a quartet; CH₂ protons split the CH₃ signal into a triplet (n+1 rule). COOH proton appears as a singlet, broad."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Nuclear_magnetic_resonance_spectroscopy"
   }
  ]
 },
 "edexcel_alevel_physics": {
  "subjectName": "Edexcel A Level Physics",
  "examCode": "9PH0",
  "sections": [
   "All",
   "Mechanics",
   "Electricity",
   "Waves",
   "Nuclear & Particle",
   "Thermal & Space",
   "Advanced"
  ],
  "topics": [
   {
    "id": "mechanics",
    "name": "Mechanics",
    "syllabusRef": "1.3",
    "section": "Mechanics",
    "description": "Kinematics: SUVAT equations (v=u+at; s=ut+½at²; v²=u²+2as). Vectors: addition, resolution into components. Projectile motion: horizontal (constant v) and vertical (free fall) components independent. Newton's 3 laws. Momentum p=mv; impulse FΔt=Δp; conservation of momentum. Work W=Fd cosθ; KE=½mv²; GPE=mgh. Power P=W/t=Fv. Moments; equilibrium.",
    "svgKey": "alevel-edx-phys-mechanics",
    "threejs3dFn": "createForceVectors",
    "landmarks": [
     "SUVAT equations",
     "Projectile components",
     "Newton's laws",
     "p = mv",
     "Impulse = FΔt = Δp",
     "W = Fd cosθ",
     "Moments: equilibrium"
    ],
    "examQA": [
     {
      "q": "A ball is kicked horizontally at 15 m/s from a cliff 20 m high. Calculate the horizontal distance it travels before hitting the ground.",
      "a": "Vertical: 20 = ½(9.81)t² → t² = 4.077 → t = 2.02 s. Horizontal: x = 15 × 2.02 = 30.3 m. Horizontal velocity is constant (no air resistance); vertical falls freely under g = 9.81 m s⁻²."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Projectile_motion"
   },
   {
    "id": "electric-circuits",
    "name": "Electric Circuits",
    "syllabusRef": "2.4",
    "section": "Electricity",
    "description": "Charge Q=It. Current I=ΔQ/Δt. Potential difference V. Resistance R=V/I. Ohm's law (R constant). Power P=IV=I²R=V²/R. Kirchhoff's 1st (current) and 2nd (voltage) laws. Series: R_tot=ΣR; I constant. Parallel: 1/R_tot=Σ(1/R); V constant. EMF and internal resistance ε=I(R+r). Potential divider: V_out=V_in×R₂/(R₁+R₂). LDR, thermistor, diode. Conduction: current I=nqvA (drift velocity). Resistivity ρ=RA/L, which varies with temperature. Superconductivity gives zero resistance below the critical temperature Tc. Potential divider applications include LDR and thermistor sensing circuits, and the Wheatstone bridge.",
    "svgKey": "alevel-edx-phys-electric-circuits",
    "landmarks": [
     "Q = It",
     "R = V/I",
     "P = IV = I²R = V²/R",
     "Kirchhoff 1st/2nd law",
     "Series/parallel rules",
     "ε = I(R+r)",
     "Potential divider",
     "I = nqvA (drift velocity)",
     "ρ = RA/L",
     "Superconductivity below Tc",
     "LDR / thermistor divider",
     "Wheatstone bridge"
    ],
    "examQA": [
     {
      "q": "A battery of EMF 9.0 V and internal resistance 1.5 Ω drives a current of 2.0 A. Calculate the terminal voltage and the power dissipated internally.",
      "a": "Terminal voltage = ε − Ir = 9.0 − 2.0×1.5 = 9.0 − 3.0 = 6.0 V. Power dissipated internally = I²r = (2.0)² × 1.5 = 6.0 W. Or: P = Ir × I = 3.0 × 2.0 = 6.0 W. This energy is wasted as heat in the battery."
     },
     {
      "q": "Explain how a thermistor and fixed resistor connected as a potential divider can be used as a temperature sensor with increasing output voltage at higher temperature.",
      "a": "An NTC thermistor has resistance that decreases with increasing temperature. In a potential divider with the thermistor on top and fixed resistor R_f on the bottom: V_out (across R_f) = V_in × R_f/(R_therm + R_f). As T rises, R_therm decreases, so the denominator decreases and V_out increases. For increasing V_out at higher T, place the fixed resistor at the output side (bottom of the divider). The output connects to a voltmeter or ADC."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Kirchhoff%27s_circuit_laws"
   },
   {
    "id": "materials",
    "name": "Materials",
    "syllabusRef": "1.4",
    "section": "Mechanics",
    "description": "Hooke's law: F=kx (within elastic limit). Elastic strain energy = ½Fx = ½kx². Stress σ=F/A; strain ε=x/L₀; Young modulus E=σ/ε (Pa). Stress-strain graph: limit of proportionality, elastic limit, yield point, UTS, fracture. Brittle: fractures suddenly (no plastic deformation). Ductile: significant plastic deformation. Elastic: returns to original shape. Material properties compared.",
    "svgKey": "alevel-edx-phys-materials",
    "landmarks": [
     "F = kx (Hooke's law)",
     "E = σ/ε (Young's modulus)",
     "σ = F/A, ε = x/L₀",
     "Elastic/plastic deformation",
     "Limit of proportionality",
     "UTS and fracture point",
     "Brittle vs ductile"
    ],
    "examQA": [
     {
      "q": "A steel wire of length 2.0 m and diameter 1.0 mm extends by 1.2 mm under a load of 80 N. Calculate the Young modulus.",
      "a": "Cross-section area A = π(0.5×10⁻³)² = 7.85×10⁻⁷ m². Stress σ = F/A = 80 / 7.85×10⁻⁷ = 1.02×10⁸ Pa. Strain ε = x/L = 1.2×10⁻³ / 2.0 = 6×10⁻⁴. Young modulus E = σ/ε = 1.02×10⁸ / 6×10⁻⁴ = 1.7×10¹¹ Pa = 170 GPa."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Young%27s_modulus"
   },
   {
    "id": "waves",
    "name": "Waves and Particle Nature of Light",
    "syllabusRef": "2.3",
    "section": "Waves",
    "description": "Wave properties: amplitude, wavelength λ, frequency f, period T=1/f, speed v=fλ. Transverse vs longitudinal. Intensity ∝ amplitude². Phase difference. Superposition; constructive/destructive interference. Young's double-slit: w=λD/a. Diffraction grating: dsinθ=nλ. Standing waves: nodes/antinodes, harmonics. Polarisation. Photoelectric effect: E=hf, KEmax=hf−φ. de Broglie: λ=h/p.",
    "svgKey": "alevel-edx-phys-waves",
    "threejs3dFn": "createWave3D",
    "landmarks": [
     "v = fλ",
     "Superposition",
     "Young's slits: w=λD/a",
     "Diffraction grating dsinθ=nλ",
     "Standing waves nodes/antinodes",
     "E=hf photoelectric",
     "de Broglie λ=h/p"
    ],
    "examQA": [
     {
      "q": "In a Young's double-slit experiment: slit separation 0.5 mm, screen distance 1.8 m, fringe spacing 2.0 mm. Calculate the wavelength of light.",
      "a": "w = λD/a → λ = wa/D = (2.0×10⁻³ × 0.5×10⁻³) / 1.8 = 1.0×10⁻⁶ / 1.8 = 5.56×10⁻⁷ m ≈ 556 nm (green light). Units check: m × m / m = m. ✓"
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Young%27s_interference_experiment"
   },
   {
    "id": "further-mechanics",
    "name": "Further Mechanics",
    "syllabusRef": "4.3",
    "section": "Advanced",
    "description": "Circular motion: centripetal force F=mv²/r=mω²r; centripetal acceleration a=v²/r. Angular velocity ω=2πf=2π/T. SHM: acceleration a=−ω²x; x=Acosωt; v=−Aωsinωt; KEmax=½mω²A²; total E=½mω²A² (constant). Period of spring T=2π√(m/k); pendulum T=2π√(L/g). Resonance at f=f₀. Damping reduces amplitude.",
    "svgKey": "alevel-edx-phys-further-mechanics",
    "threejs3dFn": "createPendulum",
    "landmarks": [
     "F = mv²/r centripetal",
     "ω = 2πf",
     "SHM: a = −ω²x",
     "x = A cosωt",
     "T = 2π√(m/k)",
     "Resonance f=f₀",
     "Damping types"
    ],
    "examQA": [
     {
      "q": "A mass on a spring has k=25 N/m and m=0.50 kg. Calculate its period and maximum speed if amplitude=0.08 m.",
      "a": "T = 2π√(m/k) = 2π√(0.50/25) = 2π√(0.02) = 2π × 0.141 = 0.89 s. ω = 2π/T = 2π/0.89 = 7.07 rad s⁻¹. v_max = Aω = 0.08 × 7.07 = 0.57 m s⁻¹ (at x=0, all energy is KE)."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Simple_harmonic_motion"
   },
   {
    "id": "electric-magnetic-fields",
    "name": "Electric and Magnetic Fields",
    "syllabusRef": "4.4",
    "section": "Advanced",
    "description": "Magnetic force on wire: F=BILsinθ. Force on charged particle: F=Bqvsinθ. Fleming's left-hand rule. Magnetic flux density B (Tesla). Hall effect: V_H=BI/(ntq). Cyclotron radius r=mv/(Bq). Velocity selector: qE=qvB → v=E/B. Mass spectrometer. Comparison of gravitational, electric, and magnetic fields. Electric field: force, potential energy, potential. Electric fields: field strength E=F/Q (N C⁻¹ = V m⁻¹). Uniform field between parallel plates E=V/d. Radial field of a point charge E=kQ/r², from Coulomb’s law F=kQ₁Q₂/r². Electric potential V=kQ/r. Electric and gravitational fields are both inverse-square, but electric fields can attract or repel whereas gravity only attracts.",
    "svgKey": "alevel-edx-phys-electric-magnetic-fields",
    "threejs3dFn": "createFieldLines('magnetic')",
    "landmarks": [
     "F = BIL sinθ",
     "F = Bqv sinθ",
     "Fleming's left-hand rule",
     "Hall voltage V_H=BI/ntq",
     "Cyclotron r=mv/Bq",
     "Velocity selector E=vB",
     "Mass spectrometer",
     "E = F/Q",
     "E = V/d (uniform field)",
     "Coulomb’s law F = kQ₁Q₂/r²",
     "Point charge E = kQ/r²",
     "Electric potential V = kQ/r"
    ],
    "examQA": [
     {
      "q": "A proton (m=1.67×10⁻²⁷ kg, q=1.6×10⁻¹⁹ C) moves at 3×10⁶ m/s perpendicular to a field B=0.2 T. Calculate the radius of its circular path.",
      "a": "Centripetal force = magnetic force: mv²/r = Bqv → r = mv/(Bq). r = (1.67×10⁻²⁷ × 3×10⁶) / (0.2 × 1.6×10⁻¹⁹) = (5.01×10⁻²¹) / (3.2×10⁻²⁰) = 0.157 m ≈ 0.16 m."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Lorentz_force"
   },
   {
    "id": "nuclear-particle",
    "name": "Nuclear and Particle Physics",
    "syllabusRef": "4.5",
    "section": "Nuclear & Particle",
    "description": "Nuclear model: protons (Z), neutrons (N), strong nuclear force (range ~1–3 fm). Nuclear radius R=R₀A^(1/3). Binding energy per nucleon; fission (heavy nuclei, U-235) and fusion (light nuclei, D-T). E=mc². Quarks: up (+⅔), down (−⅓); proton=uud, neutron=udd. Leptons: e⁻, μ, τ and neutrinos. Four fundamental forces and exchange bosons.",
    "svgKey": "alevel-edx-phys-nuclear-particle",
    "threejs3dFn": "createNucleus",
    "landmarks": [
     "Strong nuclear force range",
     "R = R₀A^(1/3)",
     "Binding energy/nucleon",
     "E = mc²",
     "Fission vs fusion",
     "Quarks (u,d,s)",
     "Four fundamental forces"
    ],
    "examQA": [
     {
      "q": "Explain why iron-56 has the highest binding energy per nucleon and why this is significant.",
      "a": "Binding energy per nucleon (BEPN) peaks at Fe-56 (about 8.8 MeV). For lighter nuclei, fusion releases energy as BEPN increases to the peak. For heavier nuclei, fission releases energy as BEPN decreases from the peak (products closer to iron have higher BEPN). Fe-56 is therefore the most stable nucleus — no energy can be released by either fusion or fission of iron. Stars produce energy by fusion up to iron; beyond this requires energy input."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Nuclear_binding_energy"
   },
   {
    "id": "thermodynamics",
    "name": "Thermodynamics",
    "syllabusRef": "5.3",
    "section": "Thermal & Space",
    "description": "Kinetic theory: gas pressure from molecular collisions. Ideal gas law: pV=nRT=NkT. Internal energy U = total KE + PE of molecules; for an ideal gas the PE term is zero, so U = total KE. Mean KE per molecule = 3/2 kT. First law: ΔU=Q−W. Isothermal (ΔT=0): Q=W. Adiabatic (Q=0): ΔU=−W. Specific heat capacity q=mcΔT. Latent heat q=mL. Black body radiation: Stefan-Boltzmann P=σAT⁴; Wien's law λ_maxT=2.9×10⁻³ m K.",
    "svgKey": "alevel-edx-phys-thermodynamics",
    "threejs3dFn": "createPressureParticles",
    "landmarks": [
     "pV = nRT",
     "½m<c²> = 3/2 kT",
     "First law ΔU = Q − W",
     "q = mcΔT",
     "q = mL (latent heat)",
     "P = σAT⁴ (Stefan)",
     "Wien's law λ_max T = const"
    ],
    "examQA": [
     {
      "q": "Calculate the rms speed of nitrogen molecules (M=0.028 kg mol⁻¹) at 300 K. (R=8.31 J mol⁻¹K⁻¹)",
      "a": "For an ideal gas: ½m<c²> = 3/2 kT. For one mole: ½M<c²> = 3/2 RT → <c²> = 3RT/M = 3×8.31×300 / 0.028 = 7479/0.028 = 2.67×10⁵ m² s⁻². c_rms = √(2.67×10⁵) = 517 m s⁻¹ ≈ 520 m s⁻¹."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Kinetic_theory_of_gases"
   },
   {
    "id": "space",
    "name": "Space, Stars and Cosmology",
    "syllabusRef": "5.6",
    "section": "Thermal & Space",
    "description": "Stellar evolution: main sequence → red giant → white dwarf/neutron star/black hole (depends on mass). HR diagram: luminosity vs temperature. Luminosity L=4πr²σT⁴. Wien's law: peak λ→star temperature. Parallax: d=1/p (parsec). Distance modulus: m−M=5log(d/10). Hubble's law: v=H₀d; expanding universe. Redshift z=Δλ/λ. Cepheid variables as distance indicators. Spectral classes OBAFGKM run from hottest to coolest. Apparent magnitude m and absolute magnitude M are linked by the distance modulus. The age of the universe is approximately 1/H₀. Evidence for the Big Bang: galactic redshift following Hubble’s law, the cosmic microwave background at about 2.7 K, and the observed abundance of hydrogen and helium.",
    "svgKey": "alevel-edx-phys-space",
    "threejs3dFn": "createOrbitAnimation",
    "landmarks": [
     "Stellar evolution path",
     "HR diagram (L vs T)",
     "L = 4πr²σT⁴",
     "Parallax d = 1/p",
     "Distance modulus m−M=5log(d/10)",
     "Hubble v = H₀d",
     "Redshift z = Δλ/λ",
     "Spectral classes OBAFGKM",
     "Apparent m vs absolute M",
     "Age of universe ≈ 1/H₀",
     "CMB as Big Bang evidence"
    ],
    "examQA": [
     {
      "q": "Explain how Cepheid variable stars are used as standard candles to measure distances to galaxies.",
      "a": "Cepheid variables have a period-luminosity relationship: the longer the pulsation period, the greater the absolute luminosity. By measuring the period (observable), the absolute magnitude M is determined. The apparent magnitude m is also measured. Using the distance modulus m−M=5log(d/10), the distance d in parsecs is calculated. Cepheids are bright enough to be observed in nearby galaxies, allowing distances of several million light-years to be measured — far beyond parallax range."
     },
     {
      "q": "Explain two pieces of evidence that support the Big Bang theory.",
      "a": "1. Hubble’s law: distant galaxies show redshift proportional to distance (v=H₀d), indicating the universe is expanding in all directions, consistent with an origin from a single point. 2. Cosmic microwave background radiation: uniform microwave radiation arriving from all directions at about 2.7 K, the remnant thermal radiation of the hot dense early universe, redshifted as the universe expanded, and predicted by Big Bang theory. The observed abundance of hydrogen and helium also matches Big Bang nucleosynthesis predictions."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Cepheid_variable"
   },
   {
    "id": "nuclear-radiation",
    "name": "Nuclear Radiation",
    "syllabusRef": "5.4",
    "section": "Nuclear & Particle",
    "description": "α decay: A−4, Z−2, helium nucleus; stopped by paper/few cm air. β⁻ decay: antineutrino emitted, Z+1; stopped by 3mm Al. β⁺ decay: positron+neutrino, Z−1. γ radiation: EM wave, no charge/mass; reduced by thick Pb/concrete. Decay law: N=N₀e^{−λt}; A=λN; half-life t½=ln2/λ. Activity in Bq. Carbon-14 dating. Radiation hazards and safety.",
    "svgKey": "alevel-edx-phys-nuclear-radiation",
    "threejs3dFn": "createNucleus",
    "landmarks": [
     "α: He-4, +2 charge, paper",
     "β⁻: electron, 3mm Al",
     "γ: EM, thick Pb",
     "N = N₀e^{−λt}",
     "A = λN",
     "t½ = ln2/λ",
     "Carbon-14 dating"
    ],
    "examQA": [
     {
      "q": "A radioactive sample has initial activity 8.0×10⁴ Bq and half-life 6.0 hours. Calculate the activity after 18 hours.",
      "a": "18 hours = 3 half-lives. After each half-life, activity halves. A = A₀ × (½)^n = 8.0×10⁴ × (½)³ = 8.0×10⁴ × 1/8 = 1.0×10⁴ Bq. Or using decay law: λ = ln2/t½ = 0.693/(6×3600); then A = A₀e^{−λt}. Both give same answer: 1.0×10⁴ Bq."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Radioactive_decay"
   },
   {
    "id": "gravitational-fields",
    "name": "Gravitational Fields",
    "syllabusRef": "5.6",
    "section": "Advanced",
    "description": "Newton's law: F=GMm/r². Gravitational field strength g=GM/r². Gravitational potential V=−GM/r (negative; work done to escape). Escape velocity v=√(2GM/r). Orbital speed v=√(GM/r). Kepler's 3rd law: T²∝r³. Geostationary orbit: T=24h, r=42000km, above equator. Comparison with electric field (inverse square, but only attractive). Black holes: Schwarzschild radius.",
    "svgKey": "alevel-edx-phys-gravitational-fields",
    "threejs3dFn": "createOrbitAnimation",
    "landmarks": [
     "F = GMm/r²",
     "g = GM/r²",
     "V = −GM/r",
     "Escape velocity √(2GM/r)",
     "Orbital speed √(GM/r)",
     "Kepler T² ∝ r³",
     "Geostationary orbit"
    ],
    "examQA": [
     {
      "q": "Show that Kepler's 3rd law T²∝r³ follows from Newton's law of gravitation for circular orbits.",
      "a": "For circular orbit: gravitational force = centripetal force. GMm/r² = mv²/r → v² = GM/r. Speed v = 2πr/T → v² = 4π²r²/T². Setting equal: 4π²r²/T² = GM/r → T² = 4π²r³/(GM). So T² ∝ r³ (since 4π²/GM is constant for objects orbiting the same central mass M). This is Kepler's 3rd law, derived from Newton's law of gravitation."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Kepler%27s_laws_of_planetary_motion"
   },
   {
    "id": "oscillations",
    "name": "Oscillations",
    "syllabusRef": "5.5",
    "section": "Advanced",
    "description": "SHM condition: a=−ω²x. Equations: x=Acosωt; v=−Aωsinωt; a=−Aω²cosωt. Energy: KE=½mω²(A²−x²); PE=½mω²x²; total E=½mω²A²=constant. Free oscillations (constant amplitude). Damping: light (oscillates, decaying amplitude), critical (returns to equilibrium fastest without oscillation), heavy (slow exponential decay). Forced oscillations at driving frequency. Resonance: max amplitude at f₀. Damping reduces resonant amplitude and peak.",
    "svgKey": "alevel-edx-phys-oscillations",
    "threejs3dFn": "createPendulum",
    "landmarks": [
     "a = −ω²x",
     "x = A cosωt",
     "E = ½mω²A²",
     "Light/critical/heavy damping",
     "Free vs forced oscillations",
     "Resonance f_d = f₀",
     "Phase lag 90° at resonance"
    ],
    "examQA": [
     {
      "q": "Explain how damping affects the resonance curve for a forced oscillator.",
      "a": "Resonance occurs when driving frequency f_d equals natural frequency f₀; amplitude is maximum. Without damping: amplitude at resonance would be infinite (theoretical). Light damping: resonance peak is sharp and tall; peak occurs very close to f₀. Heavy damping: resonance peak is broad and low; peak shifts slightly below f₀. In all cases, increasing damping reduces the maximum amplitude at resonance. The bandwidth (width of resonance curve) increases with damping. Damping dissipates energy, limiting amplitude build-up."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Resonance"
   },
   {
    "id": "capacitance",
    "name": "Capacitance",
    "syllabusRef": "4.4",
    "section": "Electricity",
    "description": "Capacitance C=Q/V (farads). Parallel plate: C=ε₀εᵣA/d. Energy stored: E=½CV²=½QV=Q²/2C. Series: 1/C=1/C₁+1/C₂. Parallel: C=C₁+C₂. Charge/discharge through resistor: Q=Q₀e^{−t/RC}; V=V₀e^{−t/RC}; I=I₀e^{−t/RC}. Time constant τ=RC. At t=τ: charge falls to 37% of Q₀. Half-life: t½=0.69RC. Applications: defibrillators, camera flash, power supplies.",
    "svgKey": "alevel-edx-phys-capacitance",
    "landmarks": [
     "C = Q/V",
     "C = ε₀εᵣA/d",
     "E = ½CV²",
     "Series/parallel combinations",
     "Q = Q₀e^{−t/RC}",
     "τ = RC (time constant)",
     "t½ = 0.69RC"
    ],
    "examQA": [
     {
      "q": "A 100 μF capacitor is charged to 20 V and then discharged through a 10 kΩ resistor. Calculate (a) the initial charge, (b) the time constant, and (c) the charge after 2.0 s.",
      "a": "(a) Q₀ = CV = 100×10⁻⁶ × 20 = 2.0×10⁻³ C = 2.0 mC. (b) τ = RC = 10×10³ × 100×10⁻⁶ = 1.0 s. (c) Q = Q₀e^{−t/τ} = 2.0×10⁻³ × e^{−2.0/1.0} = 2.0×10⁻³ × e^{−2} = 2.0×10⁻³ × 0.135 = 2.7×10⁻⁴ C = 0.27 mC."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Capacitor"
   },
   {
    "id": "electromagnetic-induction",
    "name": "Electromagnetic Induction",
    "syllabusRef": "4.4",
    "section": "Advanced",
    "description": "Magnetic flux Φ=BAcosθ (Wb=T m²). Faraday's law: induced EMF ε=−NΔΦ/Δt. Lenz's law: induced current opposes change causing it. AC generator: ε=NBAω sinωt; ε₀=NBAω. RMS values: Vrms=V₀/√2; Irms=I₀/√2. Mean power P=VrmsIrms=½V₀I₀. Transformer: Vs/Vp=Ns/Np; ideal: VpIp=VsIs. National Grid uses high voltage to reduce I²R losses.",
    "svgKey": "alevel-edx-phys-electromagnetic-induction",
    "threejs3dFn": "createEMInduction",
    "landmarks": [
     "Φ = BAcosθ",
     "ε = −NΔΦ/Δt (Faraday)",
     "Lenz's law (opposes change)",
     "ε = NBAω sinωt",
     "Vrms = V₀/√2",
     "Transformer Vs/Vp = Ns/Np",
     "National Grid efficiency"
    ],
    "examQA": [
     {
      "q": "Explain why the National Grid transmits electricity at high voltage and low current.",
      "a": "Power loss in transmission lines = I²R, where R is the resistance of the cables. By using high voltage (step-up transformer), the current I is reduced for the same power (P=VI → I=P/V). Lower I means I²R losses are much smaller — the cable heats up less, wasting less energy as heat. At the destination, a step-down transformer reduces voltage for safe domestic use. Overall efficiency of the Grid is greatly improved compared to low-voltage transmission."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Electric_power_transmission"
   },
   {
    "id": "quantum-physics",
    "name": "Quantum Physics",
    "syllabusRef": "2.3",
    "section": "Advanced",
    "description": "Photoelectric effect: photons E=hf; work function φ=hf₀; KEmax=hf−φ; threshold frequency f₀=φ/h. Evidence for particle nature of light. Wave-particle duality: de Broglie λ=h/p=h/mv. Electron diffraction. Heisenberg uncertainty: ΔxΔp≥h/4π. Energy levels in atoms; electrons in discrete orbits; ΔE=hf for emission/absorption. Line spectra as evidence. Laser: stimulated emission, population inversion, coherent light.",
    "svgKey": "alevel-edx-phys-quantum-physics",
    "landmarks": [
     "E = hf photon energy",
     "KEmax = hf − φ",
     "Threshold frequency f₀",
     "de Broglie λ = h/p",
     "Heisenberg ΔxΔp ≥ h/4π",
     "Energy levels ΔE = hf",
     "Laser: stimulated emission"
    ],
    "examQA": [
     {
      "q": "Light of wavelength 350 nm strikes a metal surface with work function φ=3.2×10⁻¹⁹ J. Calculate the maximum kinetic energy of photoelectrons. (h=6.63×10⁻³⁴ J s, c=3×10⁸ m/s)",
      "a": "E_photon = hc/λ = (6.63×10⁻³⁴ × 3×10⁸) / (350×10⁻⁹) = 1.99×10⁻²⁵ / 3.5×10⁻⁷ = 5.69×10⁻¹⁹ J. KEmax = hf − φ = 5.69×10⁻¹⁹ − 3.2×10⁻¹⁹ = 2.49×10⁻¹⁹ J ≈ 2.5×10⁻¹⁹ J. Since KEmax > 0, photoelectric emission occurs."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Photoelectric_effect"
   }
  ]
 }
};
