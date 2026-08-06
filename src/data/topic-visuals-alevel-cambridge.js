// Topic Visualizer content — Cambridge International AS & A Level.
//
// Split out of the single 1.9 MB topic-visuals.js so the loader can fetch one
// board's topic text instead of every board's. Paired with
// topic-svgs-alevel-cambridge.js, which holds this board's diagrams.
//
// 3 subjects, 63 topics. Generated — edit the content here, but keep the
// shape: { <tvKey>: { subjectName, examCode, sections, topics: [...] } }.

export const TV_ALEVEL_CAMBRIDGE = {
 "cambridge_alevel_biology": {
  "subjectName": "Cambridge A Level Biology",
  "examCode": "9700",
  "sections": [
   "All",
   "Cell Biology",
   "Biochemistry",
   "Physiology",
   "Genetics",
   "Ecology & Evolution"
  ],
  "topics": [
   {
    "id": "cell-structure",
    "name": "Cell Structure",
    "syllabusRef": "1",
    "section": "Cell Biology",
    "description": "Eukaryotic cells contain membrane-bound organelles: nucleus (DNA), rough and smooth ER, Golgi apparatus, mitochondria and lysosomes, together with structures that are not surrounded by a membrane, such as 80S ribosomes (and centrioles in animal cells). Prokaryotic cells lack a nucleus and membrane-bound organelles but have a cell wall, cell membrane, 70S ribosomes, plasmids, and sometimes a capsule or pili.",
    "sketchfab3dId": "7fe3ac29756a45c6b678804a8da8a760",
    "svgKey": "alevel-bio-cell-structure",
    "landmarks": [
     "Nucleus",
     "RER/SER",
     "Golgi apparatus",
     "Mitochondria",
     "Ribosomes (80S)",
     "Lysosomes",
     "Cell membrane",
     "Prokaryote: 70S ribosome, plasmid"
    ],
    "examQA": [
     {
      "q": "State two differences between eukaryotic and prokaryotic cells.",
      "a": "Eukaryotic cells have a membrane-bound nucleus; prokaryotic cells have a nucleoid region with no membrane. Eukaryotic cells have 80S ribosomes; prokaryotic cells have 70S ribosomes. Eukaryotic cells have membrane-bound organelles; prokaryotic cells do not."
     },
     {
      "q": "Describe the role of the Golgi apparatus.",
      "a": "The Golgi apparatus receives vesicles from the ER, modifies and sorts proteins and lipids (e.g. glycosylation), then packages them into vesicles for secretion (exocytosis) or transport to other organelles such as lysosomes."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Cell_(biology)"
   },
   {
    "id": "biological-molecules",
    "name": "Biological Molecules",
    "syllabusRef": "2",
    "section": "Biochemistry",
    "description": "Carbohydrates (monosaccharides → disaccharides → polysaccharides via condensation), proteins (amino acids → peptides via peptide bonds; primary→quaternary structure), lipids (triglycerides, phospholipids), and nucleic acids (DNA double helix, RNA). Water properties: high specific heat, cohesion, metabolite, solvent.",
    "svgKey": "alevel-bio-biological-molecules",
    "landmarks": [
     "Glycosidic bond",
     "Peptide bond",
     "Ester bond",
     "Hydrogen bonds",
     "Condensation/hydrolysis",
     "DNA base pairing A-T G-C",
     "Phospholipid bilayer"
    ],
    "examQA": [
     {
      "q": "Explain the significance of hydrogen bonds in protein structure.",
      "a": "Hydrogen bonds form between the carbonyl (C=O) and amino (N-H) groups of the polypeptide backbone, stabilising the α-helix and β-pleated sheet (secondary structure). They also stabilise tertiary and quaternary structure by forming between R groups. They are weak individually but numerous, giving stability yet allowing denaturation at high temperatures."
     },
     {
      "q": "Describe the test for a reducing sugar and state the result.",
      "a": "Add Benedict's reagent to the solution and heat in a water bath. A positive result (reducing sugar present) gives a colour change from blue to green, yellow, orange, or brick-red precipitate depending on the concentration of sugar."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Biomolecule"
   },
   {
    "id": "enzymes",
    "name": "Enzymes",
    "syllabusRef": "3",
    "section": "Biochemistry",
    "description": "Enzymes are biological catalysts (globular proteins) that lower activation energy. The induced-fit model describes how the active site changes shape on substrate binding. Factors affecting rate: temperature (optimum, denaturation above), pH (alters ionisation of R groups), substrate/enzyme concentration, inhibitors (competitive and non-competitive).",
    "svgKey": "alevel-bio-enzymes",
    "threejs3dFn": "createReactionAnimation",
    "landmarks": [
     "Active site",
     "Induced fit",
     "Activation energy",
     "Competitive inhibitor",
     "Non-competitive inhibitor",
     "Km (Michaelis constant)",
     "Vmax"
    ],
    "examQA": [
     {
      "q": "Explain how a non-competitive inhibitor reduces enzyme activity.",
      "a": "A non-competitive inhibitor binds to an allosteric site (not the active site) on the enzyme. This changes the shape of the active site (via conformational change), so the substrate can no longer fit correctly. The inhibitor does not compete with the substrate, so increasing substrate concentration does not overcome the inhibition. Vmax is reduced; Km is unchanged."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Enzyme"
   },
   {
    "id": "cell-membranes",
    "name": "Cell Membranes and Transport",
    "syllabusRef": "4",
    "section": "Cell Biology",
    "description": "The fluid-mosaic model describes the phospholipid bilayer with embedded proteins (integral and peripheral), cholesterol, and glycoproteins/glycolipids. Transport: diffusion (passive, down gradient), facilitated diffusion (via channels/carriers), osmosis (water via aquaporins), active transport (ATP, carrier proteins, against gradient), endocytosis/exocytosis.",
    "svgKey": "alevel-bio-cell-membranes",
    "threejs3dFn": "createDiffusionAnimation",
    "landmarks": [
     "Phospholipid bilayer",
     "Cholesterol",
     "Channel proteins",
     "Carrier proteins",
     "Glycoproteins",
     "Water potential ψ",
     "Active transport"
    ],
    "examQA": [
     {
      "q": "Describe the role of cholesterol in the cell membrane.",
      "a": "Cholesterol molecules are interspersed between phospholipids. They reduce membrane fluidity at high temperatures (preventing it becoming too fluid) and prevent it solidifying at low temperatures. Overall cholesterol regulates and stabilises membrane fluidity across temperature ranges."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Cell_membrane"
   },
   {
    "id": "cell-cycle",
    "name": "Mitotic Cell Cycle",
    "syllabusRef": "5",
    "section": "Cell Biology",
    "description": "The cell cycle: interphase (G1: growth/protein synthesis; S: DNA replication; G2: organelle division) followed by mitosis (prophase, metaphase, anaphase, telophase) and cytokinesis. Mitosis produces two genetically identical daughter cells with the same chromosome number as the parent cell. Checkpoints (G1, G2, spindle) regulate the cycle; failure causes cancer. Stem cells retain the ability to divide and differentiate.",
    "svgKey": "alevel-bio-cell-cycle",
    "threejs3dFn": "createCellDivision",
    "landmarks": [
     "G1 S G2 M phases",
     "DNA replication (S phase)",
     "Prophase: chromatin condenses",
     "Metaphase: equator alignment",
     "Anaphase: chromatids separate",
     "Telophase: nuclear envelope reforms",
     "Checkpoints",
     "Cancer: uncontrolled division"
    ],
    "examQA": [
     {
      "q": "Explain why mitosis is important in multicellular organisms.",
      "a": "Mitosis produces genetically identical cells for growth (increasing cell number), repair (replacing damaged cells), and asexual reproduction. Identical cells maintain the same DNA complement in every cell of the organism. Controlled mitosis ensures tissues grow correctly without tumour formation."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Mitosis"
   },
   {
    "id": "nucleic-acids",
    "name": "Nucleic Acids and Protein Synthesis",
    "syllabusRef": "6",
    "section": "Biochemistry",
    "description": "DNA: double helix, antiparallel strands, A-T (2 H-bonds) and G-C (3 H-bonds) base pairing. Semi-conservative replication: helicase unwinds, primase adds primer, DNA polymerase III adds nucleotides 5'→3'. Transcription: RNA polymerase makes pre-mRNA; splicing removes introns. Translation: ribosome reads codons; tRNA anticodons bring amino acids; peptide bonds form.",
    "sketchfab3dId": "224d09f75a674f4a8107e79e3d3d5552",
    "svgKey": "alevel-bio-nucleic-acids",
    "landmarks": [
     "Helicase",
     "DNA polymerase III",
     "Leading/lagging strand",
     "RNA polymerase",
     "Introns/exons",
     "Codon/anticodon",
     "tRNA",
     "Ribosome (A P E sites)"
    ],
    "examQA": [
     {
      "q": "Describe semi-conservative DNA replication.",
      "a": "Helicase unwinds the double helix and breaks H-bonds between bases, separating the two strands. Each strand acts as a template. DNA polymerase III adds free nucleotides complementary to each template strand (5'→3' only). The result is two identical DNA molecules, each containing one original strand and one new strand — hence semi-conservative."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/DNA_replication"
   },
   {
    "id": "transport-plants",
    "name": "Transport in Plants",
    "syllabusRef": "7",
    "section": "Physiology",
    "description": "Xylem transports water and mineral ions upward; phloem transports sucrose and amino acids (source to sink). Water moves via apoplast (cell walls), symplast (cytoplasm via plasmodesmata), or vacuolar pathway. Cohesion-tension theory explains xylem flow. Transpiration pull, root pressure, and capillarity act together. Translocation: sucrose loaded by active transport into companion cells → sieve tube elements.",
    "svgKey": "alevel-bio-transport-plants",
    "threejs3dFn": "createTranspirationAnimation",
    "landmarks": [
     "Xylem vessel",
     "Phloem sieve tube/companion cell",
     "Apoplast/symplast/vacuolar",
     "Cohesion-tension",
     "Transpiration pull",
     "Root pressure",
     "Translocation (source→sink)"
    ],
    "examQA": [
     {
      "q": "Explain the cohesion-tension theory of water transport in xylem.",
      "a": "Water evaporates from mesophyll cell walls into air spaces and out through stomata (transpiration). This creates a water potential gradient, pulling water from xylem in the leaf. Water molecules cohere (H-bonds between molecules) forming a continuous water column under tension through xylem vessels. Adhesion to vessel walls helps support the column. Water is drawn up from roots to replace what is lost."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Xylem"
   },
   {
    "id": "transport-mammals",
    "name": "Transport in Mammals",
    "syllabusRef": "8",
    "section": "Physiology",
    "description": "Double circulation: pulmonary (heart→lungs→heart) and systemic (heart→body→heart). The heart: SA node initiates impulse → AV node → bundle of His → Purkinje fibres → ventricular contraction. Cardiac cycle: systole and diastole. Haemoglobin: quaternary protein, sigmoidal O₂ dissociation curve; Bohr effect shifts curve right (more CO₂ → lower affinity). Blood: plasma, RBCs (biconcave, no nucleus), WBCs, platelets.",
    "svgKey": "alevel-bio-transport-mammals",
    "landmarks": [
     "SA node",
     "AV node",
     "Bundle of His",
     "Cardiac output = SV × HR",
     "Oxyhaemoglobin",
     "Bohr effect",
     "Partial pressure pO₂"
    ],
    "examQA": [
     {
      "q": "Explain the Bohr effect and its importance in tissues.",
      "a": "In actively respiring tissues, CO₂ concentration is high. CO₂ dissolves in plasma/RBCs lowering pH. The lower pH causes conformational change in haemoglobin, reducing its affinity for O₂ (Bohr effect). The O₂ dissociation curve shifts right, so haemoglobin releases more O₂ to tissues that need it most. This ensures O₂ delivery is matched to metabolic demand."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Bohr_effect"
   },
   {
    "id": "gas-exchange",
    "name": "Gas Exchange",
    "syllabusRef": "9",
    "section": "Physiology",
    "description": "Adaptations for gas exchange: large surface area, thin membrane, moist surface, good blood supply. Human lungs: alveoli lined with squamous epithelium, rich capillary network, surfactant (reduces surface tension). Ventilation: intercostal muscles and diaphragm alter thoracic volume/pressure. Fick's law: rate ∝ (SA × concentration difference) / thickness.",
    "svgKey": "alevel-bio-gas-exchange",
    "threejs3dFn": "createDiffusionAnimation",
    "landmarks": [
     "Alveolus structure",
     "Squamous epithelium",
     "Capillary network",
     "Surfactant",
     "Fick's law",
     "External/internal intercostals",
     "Diaphragm"
    ],
    "examQA": [
     {
      "q": "Using Fick's law, explain how alveoli are adapted for efficient gas exchange.",
      "a": "Fick's law: rate of diffusion ∝ (SA × concentration difference) / thickness. Alveoli have a very large total surface area (~70 m²), a short diffusion distance (squamous epithelium + capillary wall ≈ 0.5 μm), and the concentration gradient is maintained by continuous blood flow and ventilation. Moist surface dissolves gases, facilitating diffusion."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Pulmonary_alveolus"
   },
   {
    "id": "immunity",
    "name": "Infectious Diseases and Immunity",
    "syllabusRef": "10",
    "section": "Physiology",
    "description": "Pathogens (bacteria, viruses, fungi, protoctists) cause disease. Non-specific defence: skin, mucus, phagocytosis (neutrophils, macrophages). Specific immunity: B lymphocytes (humoral — antibodies); T lymphocytes (cell-mediated). Clonal selection and expansion; memory cells for secondary response. Vaccination: active artificial immunity. Monoclonal antibodies: ELISA, cancer therapy.",
    "sketchfab3dId": "45fceb1599254642b05888369208a523",
    "svgKey": "alevel-bio-immunity",
    "landmarks": [
     "Phagocytosis",
     "Antigen presentation",
     "B cell → plasma cell → antibody",
     "T helper/T killer cells",
     "Memory cells",
     "Primary/secondary immune response",
     "Vaccination",
     "Monoclonal antibodies"
    ],
    "examQA": [
     {
      "q": "Explain why the secondary immune response is faster and stronger.",
      "a": "After the primary infection, clonal expansion produces memory B and T cells with the specific receptor for that antigen. Memory cells persist long-term. On re-exposure, memory cells divide rapidly (faster than naïve lymphocytes) producing large numbers of plasma cells and antibodies quickly. The threshold pathogen number is never reached, so disease symptoms may not occur."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Immune_system"
   },
   {
    "id": "smoking",
    "name": "Smoking and Disease — withdrawn from 9700",
    "syllabusRef": "not on the 9700 syllabus",
    "section": "Physiology",
    "description": "Tobacco smoke contains: nicotine (addictive, increases heart rate/BP), tar (carcinogen, ciliostasis), carbon monoxide (binds haemoglobin, reduces O₂ transport), particulates. Diseases: lung cancer (carcinogens → mutations in proto-oncogenes/tumour suppressors), chronic bronchitis (mucus hypersecretion), emphysema (alveolar wall breakdown → reduced SA), coronary heart disease (atherosclerosis).",
    "svgKey": "alevel-bio-smoking",
    "landmarks": [
     "Nicotine",
     "Tar/carcinogens",
     "Carbon monoxide",
     "Ciliostasis",
     "Emphysema: destroyed alveoli",
     "Chronic bronchitis",
     "Atherosclerosis/CHD"
    ],
    "examQA": [
     {
      "q": "Explain how smoking causes emphysema.",
      "a": "Smoke particles stimulate macrophages in alveoli. Macrophages release elastase enzyme which breaks down elastin in alveolar walls. Walls break down and merge, reducing surface area for gas exchange. The alveoli lose elasticity (cannot recoil to expel air), so air is trapped. The patient experiences breathlessness and reduced exercise tolerance."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Emphysema"
   },
   {
    "id": "ecology",
    "name": "Ecology — not on the 9700 syllabus",
    "syllabusRef": "not on the 9700 syllabus",
    "section": "Ecology & Evolution",
    "description": "Ecosystem: all organisms in an area plus abiotic factors. Food chains/webs, trophic levels (producers → primary → secondary → tertiary consumers). Energy flow: GPP, NPP = GPP − R. Ecological pyramids (numbers, biomass, energy). Nitrogen cycle: fixation, nitrification, denitrification, ammonification. Population growth: logistic (S-curve), limiting factors.",
    "svgKey": "alevel-bio-ecology",
    "landmarks": [
     "Producer, consumer, decomposer",
     "GPP / NPP",
     "10% energy transfer efficiency",
     "Nitrogen fixation (Rhizobium)",
     "Nitrification (Nitrosomonas, Nitrobacter)",
     "Denitrification",
     "Carrying capacity (K)"
    ],
    "examQA": [
     {
      "q": "Explain why energy transfer between trophic levels is inefficient.",
      "a": "Only about 10% of energy is transferred between trophic levels. Losses occur through: heat from respiration (largest loss), energy in faeces/urine not absorbed, energy in body parts not consumed. Producers capture only ~1% of incident light. Each trophic level loses the majority of energy as metabolic heat, leaving little for the next level."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Ecosystem"
   },
   {
    "id": "energy-respiration",
    "name": "Energy and Respiration",
    "syllabusRef": "12",
    "section": "Biochemistry",
    "description": "ATP is the universal energy currency: hydrolysis of ATP to ADP + Pi releases about 30.5 kJ per mole for active transport, muscle contraction and synthesis. Aerobic respiration has four stages. Glycolysis (cytoplasm): glucose is phosphorylated using 2 ATP, split into two triose phosphate, then oxidised to 2 pyruvate for a net gain of 2 ATP by substrate-level phosphorylation plus 2 reduced NAD. Link reaction (mitochondrial matrix): pyruvate is decarboxylated and dehydrogenated to acetyl CoA, giving reduced NAD and CO2. Krebs cycle (matrix): acetyl CoA joins oxaloacetate to form citrate; each turn yields 3 reduced NAD, 1 reduced FAD, 1 ATP and 2 CO2. Oxidative phosphorylation (inner membrane): electrons from reduced NAD and FAD pass along the electron transport chain, pumping protons into the intermembrane space; the gradient drives ATP synthase by chemiosmosis, and oxygen is the final electron acceptor forming water. Anaerobic respiration regenerates NAD so glycolysis can continue - lactate in mammals, ethanol and CO2 in yeast. Respiratory quotient RQ = CO2 produced / O2 consumed: 1.0 carbohydrate, 0.9 protein, 0.7 lipid.",
    "svgKey": "alevel-cie-bio-respiration",
    "landmarks": [
     "ATP to ADP + Pi releases ~30.5 kJ per mole",
     "Glycolysis (cytoplasm): net 2 ATP + 2 reduced NAD per glucose",
     "Link reaction (matrix): pyruvate to acetyl CoA + CO2 + reduced NAD",
     "Krebs cycle: per turn 3 reduced NAD, 1 reduced FAD, 1 ATP, 2 CO2",
     "Oxidative phosphorylation on the cristae",
     "Chemiosmosis: proton gradient drives ATP synthase",
     "Oxygen is the final electron acceptor, forming water",
     "Anaerobic: lactate (mammals), ethanol + CO2 (yeast)",
     "RQ: 1.0 carbohydrate, 0.9 protein, 0.7 lipid"
    ],
    "examQA": [
     {
      "q": "Explain why more ATP is produced from one molecule of glucose in aerobic than in anaerobic respiration.",
      "a": "In anaerobic respiration only glycolysis occurs, giving a net yield of 2 ATP by substrate-level phosphorylation, and the reduced NAD produced must be reoxidised by converting pyruvate to lactate, or to ethanol and CO2, which releases no further energy. In aerobic respiration pyruvate continues into the link reaction and Krebs cycle, producing many more reduced NAD and reduced FAD. These are oxidised along the electron transport chain and the energy released pumps protons to create a gradient that drives ATP synthase. Because oxygen is available as the final electron acceptor the chain keeps operating, so a far larger total yield of ATP is obtained."
     },
     {
      "q": "Describe the role of the inner mitochondrial membrane in oxidative phosphorylation.",
      "a": "The inner membrane carries the electron carriers of the electron transport chain and the enzyme ATP synthase. Electrons from reduced NAD and reduced FAD pass along the carriers, releasing energy that pumps protons from the matrix into the intermembrane space, establishing a proton gradient and electrochemical potential difference. The membrane is impermeable to protons except through ATP synthase, so protons flow back into the matrix through the enzyme and this flow drives phosphorylation of ADP to ATP - chemiosmosis. The membrane is folded into cristae, giving a large surface area for many carriers and ATP synthase molecules."
     },
     {
      "q": "A germinating seed has a respiratory quotient of 0.7. Explain what this indicates about the respiratory substrate.",
      "a": "RQ is the ratio of carbon dioxide produced to oxygen consumed. A value of 0.7 indicates lipid is the main respiratory substrate. Lipids contain proportionally much less oxygen than carbohydrates, so relatively more atmospheric oxygen is needed to oxidise them fully, giving a lower ratio of CO2 released to O2 used. A value of 1.0 would indicate carbohydrate and about 0.9 protein."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Cellular_respiration"
   },
   {
    "id": "photosynthesis",
    "name": "Photosynthesis",
    "syllabusRef": "13",
    "section": "Biochemistry",
    "description": "Photosynthesis transfers light energy into chemical energy in carbohydrate. The light-dependent stage occurs on the thylakoid membranes of the grana. Light is absorbed by photosystems containing chlorophyll a, chlorophyll b and carotenoids, and excited electrons pass along a chain of carriers. Non-cyclic photophosphorylation uses photosystems II and I to produce ATP and reduced NADP, with photolysis of water supplying replacement electrons and releasing oxygen as a by-product. Cyclic photophosphorylation uses photosystem I alone and yields ATP only. The light-independent stage, the Calvin cycle, occurs in the stroma: CO2 combines with ribulose bisphosphate (RuBP) catalysed by rubisco to give two molecules of glycerate 3-phosphate (GP); GP is reduced to triose phosphate (TP) using ATP and reduced NADP; most TP regenerates RuBP while the remainder forms carbohydrates, lipids and amino acids. Limiting factors are light intensity, carbon dioxide concentration and temperature. Chloroplast pigments are separated by paper or thin-layer chromatography and identified by Rf value.",
    "svgKey": "alevel-cie-bio-photosynthesis",
    "landmarks": [
     "Light-dependent stage: thylakoid membranes of the grana",
     "Photolysis of water gives electrons, protons and O2",
     "Non-cyclic photophosphorylation (PSII and PSI): ATP + reduced NADP",
     "Cyclic photophosphorylation (PSI only): ATP alone",
     "Calvin cycle in the stroma",
     "Rubisco fixes CO2 onto RuBP, giving 2 GP",
     "GP reduced to TP using ATP and reduced NADP",
     "Most TP regenerates RuBP",
     "Limiting factors: light intensity, CO2 concentration, temperature",
     "Chromatography of pigments and Rf values"
    ],
    "examQA": [
     {
      "q": "Explain what happens to the concentrations of GP and RuBP when a plant is suddenly placed in darkness.",
      "a": "In darkness the light-dependent reactions stop, so no ATP or reduced NADP is produced. GP can no longer be reduced to triose phosphate because that step requires both, so GP accumulates and its concentration rises. RuBP concentration falls, because RuBP continues to be used to fix the carbon dioxide still present but cannot be regenerated, since regeneration from triose phosphate also requires ATP. So GP increases and RuBP decreases."
     },
     {
      "q": "Describe the role of rubisco in the Calvin cycle.",
      "a": "Rubisco, ribulose bisphosphate carboxylase, is the enzyme in the stroma that catalyses carbon dioxide fixation. It joins one molecule of CO2 to the five-carbon acceptor ribulose bisphosphate, forming an unstable six-carbon intermediate that immediately breaks down into two molecules of the three-carbon compound glycerate 3-phosphate. This is the carboxylation step and the point at which inorganic carbon enters the organic pool. Rubisco works slowly and is present in very large amounts, which is why it is the most abundant protein on Earth."
     },
     {
      "q": "Explain why increasing light intensity beyond a certain point does not increase the rate of photosynthesis.",
      "a": "At low light intensity light is the limiting factor, so the rate rises as intensity increases. Beyond a certain intensity the rate levels off because another factor has become limiting, usually carbon dioxide concentration or temperature. The light-dependent reactions can then supply ATP and reduced NADP faster than the Calvin cycle can use them, because the supply of CO2, or the activity of enzymes including rubisco, now limits the rate. Raising that limiting factor would raise the plateau."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Photosynthesis"
   },
   {
    "id": "homeostasis",
    "name": "Homeostasis",
    "syllabusRef": "14",
    "section": "Physiology",
    "description": "Negative feedback maintains steady state. Thermoregulation: hypothalamus detects core temperature; effectors: vasodilation/vasoconstriction, sweating, shivering, arrector pili, brown fat. Osmoregulation: kidneys filter blood; ADH (from posterior pituitary) controls water reabsorption in collecting duct (aquaporins). Glucoregulation: insulin (β cells) → glycogenesis; glucagon (α cells) → glycogenolysis.",
    "svgKey": "alevel-bio-homeostasis",
    "landmarks": [
     "Negative feedback loop",
     "Hypothalamus thermostat",
     "ADH → aquaporins",
     "Loop of Henle countercurrent multiplier",
     "Insulin/glucagon",
     "β/α cells of islets of Langerhans",
     "Glycogen ↔ glucose"
    ],
    "examQA": [
     {
      "q": "Explain the role of ADH in osmoregulation.",
      "a": "When blood water potential falls (e.g. dehydration), osmoreceptors in hypothalamus detect this and stimulate the posterior pituitary to release more ADH into blood. ADH binds to receptors on collecting duct cells, causing insertion of aquaporin channels into the cell membrane. This increases water permeability of the collecting duct, so more water is reabsorbed by osmosis. Urine becomes more concentrated and smaller in volume."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Homeostasis"
   },
   {
    "id": "coordination",
    "name": "Coordination",
    "syllabusRef": "15",
    "section": "Physiology",
    "description": "Nervous system: sensory, relay, motor neurones. Resting potential: −70 mV (Na⁺/K⁺ ATPase). Action potential: depolarisation (+40 mV, Na⁺ in), repolarisation (K⁺ out), hyperpolarisation, refractory period. Saltatory conduction (myelinated). Synapses: ACh released, diffuses across cleft, binds nicotinic receptors, depolarises postsynaptic membrane. Hormones: slower, longer-lasting, bloodborne.",
    "sketchfab3dId": "01d20ef702ee41478a8bc1da8082e504",
    "svgKey": "alevel-bio-coordination",
    "landmarks": [
     "Resting potential −70 mV",
     "Action potential +40 mV",
     "Refractory period",
     "Myelin sheath/nodes of Ranvier",
     "Synaptic vesicles",
     "Acetylcholine (ACh)",
     "Cholinesterase"
    ],
    "examQA": [
     {
      "q": "Explain how an action potential is transmitted across a synapse.",
      "a": "Action potential arrives at presynaptic knob; depolarisation opens voltage-gated Ca²⁺ channels; Ca²⁺ enters. Synaptic vesicles fuse with presynaptic membrane; ACh released by exocytosis into synaptic cleft. ACh diffuses across cleft and binds to nicotinic receptors on postsynaptic membrane. Na⁺ channels open; postsynaptic membrane depolarises. If threshold reached, action potential generated. ACh broken down by cholinesterase; choline recycled."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Synapse"
   },
   {
    "id": "inheritance",
    "name": "Inheritance",
    "syllabusRef": "16",
    "section": "Genetics",
    "description": "Mendel's laws: segregation and independent assortment. Genotype/phenotype, alleles, dominant/recessive/codominant. Dihybrid crosses, test crosses, Punnett squares. Chi-squared test to test for significant difference from expected ratios. Sex linkage: genes on X chromosome (e.g. haemophilia, colour blindness). Autosomal linkage: genes on same chromosome travel together unless crossing over occurs.",
    "svgKey": "alevel-bio-inheritance",
    "landmarks": [
     "Allele, locus, genotype",
     "Dominant/recessive",
     "Codominance (e.g. blood groups)",
     "Dihybrid 9:3:3:1 ratio",
     "Chi-squared χ²",
     "X-linked traits",
     "Crossing over (recombination)"
    ],
    "examQA": [
     {
      "q": "A gene has two alleles. State the expected phenotype ratio in the F2 generation when two heterozygotes are crossed, and explain how you used the Punnett square.",
      "a": "Cross Aa × Aa → F2 genotypes: 1 AA : 2 Aa : 1 aa. Phenotype ratio: 3 dominant : 1 recessive (if complete dominance). In the Punnett square, gametes A and a from each parent are placed on rows and columns; the four cells give AA, Aa, Aa, aa — ratio 1:2:1 genotype, 3:1 phenotype."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Mendelian_inheritance"
   },
   {
    "id": "evolution",
    "name": "Selection and Evolution",
    "syllabusRef": "17",
    "section": "Ecology & Evolution",
    "description": "Natural selection: variation (from mutation/meiosis), selection pressure, differential reproduction, allele frequency change over generations. Types: stabilising, directional, disruptive. Species: morphological/biological species concept. Speciation: allopatric (geographic isolation → divergence → reproductive isolation) and sympatric (polyploidy in plants). Hardy-Weinberg equilibrium: p² + 2pq + q² = 1.",
    "svgKey": "alevel-bio-evolution",
    "landmarks": [
     "Mutation → variation",
     "Selection pressure",
     "Hardy-Weinberg p² + 2pq + q² = 1",
     "Allopatric speciation",
     "Reproductive isolation",
     "Directional/stabilising/disruptive selection",
     "Polyploidy"
    ],
    "examQA": [
     {
      "q": "Explain how antibiotic resistance arises in bacteria by natural selection.",
      "a": "Random mutations in bacterial DNA occasionally produce alleles conferring resistance to an antibiotic. Without antibiotic, resistant and non-resistant bacteria coexist. When antibiotic is introduced (selection pressure), non-resistant bacteria are killed; resistant bacteria survive and reproduce, passing resistance alleles to offspring. Over many generations the frequency of resistance alleles increases until the population is predominantly resistant."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Natural_selection"
   },
   {
    "id": "biodiversity",
    "name": "Biodiversity and Conservation",
    "syllabusRef": "18",
    "section": "Ecology & Evolution",
    "description": "Biodiversity: genetic, species, ecosystem. Simpson's Diversity Index D = 1 − Σ(n/N)². Threats: habitat destruction, overexploitation, invasive species, climate change. Conservation: in situ (nature reserves, national parks) vs ex situ (seed banks, captive breeding, botanic gardens). CITES regulates international trade. Keystone species.",
    "svgKey": "alevel-bio-biodiversity",
    "landmarks": [
     "Simpson's Index D",
     "Species richness vs evenness",
     "Habitat fragmentation",
     "In situ vs ex situ conservation",
     "Seed banks",
     "CITES",
     "Keystone species"
    ],
    "examQA": [
     {
      "q": "Explain why in situ conservation is generally preferred to ex situ conservation.",
      "a": "In situ conservation maintains species in their natural habitat, preserving ecological interactions, evolutionary pressures, and natural behaviours. It conserves whole ecosystems, not just individual species. Species do not become adapted to captivity. However, when habitats are severely threatened or populations are critically small, ex situ methods (seed banks, captive breeding) may be essential as a backup, with the aim of eventual reintroduction."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Biodiversity"
   },
   {
    "id": "genetic-technology",
    "name": "Genetic Technology",
    "syllabusRef": "19",
    "section": "Genetics",
    "description": "Recombinant DNA technology: restriction enzymes cut at specific sequences; ligase joins fragments; vectors (plasmids, bacteriophages) carry gene into host. PCR: denaturation (95°C), annealing (55°C), extension (72°C) with Taq polymerase. Gel electrophoresis separates DNA by size. Gene expression: knock-out/knock-in mice; RNAi. CRISPR-Cas9 genome editing. Bioinformatics: genomics, proteomics.",
    "sketchfab3dId": "224d09f75a674f4a8107e79e3d3d5552",
    "svgKey": "alevel-bio-genetic-technology",
    "landmarks": [
     "Restriction enzyme",
     "Sticky ends",
     "DNA ligase",
     "Plasmid vector",
     "PCR (denaturation/annealing/extension)",
     "Gel electrophoresis",
     "CRISPR-Cas9"
    ],
    "examQA": [
     {
      "q": "Describe how PCR amplifies a specific DNA fragment.",
      "a": "1. Denaturation (~95°C): heat breaks H-bonds between DNA strands. 2. Annealing (~55°C): primers (short complementary DNA sequences) bind to either end of the target sequence on each strand. 3. Extension (~72°C): Taq DNA polymerase extends primers, adding complementary nucleotides 5'→3'. Each cycle doubles the number of copies. After 30 cycles, ~10⁹ copies are produced from a single original."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Polymerase_chain_reaction"
   }
  ]
 },
 "cambridge_alevel_chemistry": {
  "subjectName": "Cambridge A Level Chemistry",
  "examCode": "9701",
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
    "syllabusRef": "1",
    "section": "Physical Chemistry",
    "description": "Atoms: protons (nucleus), neutrons (nucleus), electrons (shells/subshells). Electronic configuration: s, p, d, f orbitals (max 2e⁻ per orbital). Ionisation energies: evidence for shells (large jumps). Isotopes: same Z, different mass number. Mass spectrometer: ionisation, acceleration, deflection, detection — gives relative isotopic masses and relative atomic mass.",
    "threejs3dFn": "createAtomModel",
    "svgKey": "alevel-chem-atomic-structure",
    "landmarks": [
     "Proton number Z",
     "Mass number A",
     "Isotope",
     "1s² 2s² 2p⁶ notation",
     "First ionisation energy",
     "Mass spectrometer"
    ],
    "examQA": [
     {
      "q": "Explain the trend in first ionisation energies across Period 3.",
      "a": "Generally increases Na→Ar as nuclear charge increases (more protons attract electrons more strongly) while shielding remains approximately constant and atomic radius decreases. Drops from Mg to Al (Al has one 3p electron shielded by 3s) and from P to S (S has a paired 3p electron; repulsion makes it easier to remove)."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Atomic_structure"
   },
   {
    "id": "stoichiometry",
    "name": "Atoms, Molecules and Stoichiometry",
    "syllabusRef": "2",
    "section": "Physical Chemistry",
    "description": "Mole concept: 1 mol = 6.02×10²³ particles (Avogadro constant). n = m/M; n = cV; n = pV/RT (ideal gas). Empirical and molecular formulae. Balancing equations; molar ratios from equations. Percentage yield; atom economy = (Mr desired product / Mr all products) × 100. Limiting reagent.",
    "svgKey": "alevel-chem-stoichiometry",
    "landmarks": [
     "Avogadro constant",
     "n = m/M",
     "n = cV",
     "n = pV/RT",
     "Empirical formula",
     "Atom economy",
     "Limiting reagent"
    ],
    "examQA": [
     {
      "q": "Calculate the atom economy for producing NH₃ in N₂ + 3H₂ → 2NH₃.",
      "a": "Atom economy = (Mr of desired product × moles) / (Mr of all reactants) × 100. All atoms end up in NH₃ (the only product), so atom economy = 100%. There are no by-products — all atoms from reactants appear in the desired product."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Stoichiometry"
   },
   {
    "id": "bonding",
    "name": "Chemical Bonding",
    "syllabusRef": "3",
    "section": "Physical Chemistry",
    "description": "Ionic bonding: electrostatic attraction between oppositely charged ions (high mp, conduct when molten/dissolved). Covalent bonding: shared electron pairs; lone pairs; dative bonds. VSEPR theory predicts shapes (linear, tetrahedral, trigonal planar, etc.). Electronegativity → polarity → dipole moments. Metallic bonding: delocalised electrons. Intermolecular forces: London dispersion, dipole-dipole, hydrogen bonding.",
    "threejs3dFn": "createMolecule('water')",
    "svgKey": "alevel-chem-bonding",
    "landmarks": [
     "Ionic/covalent/metallic",
     "VSEPR shapes",
     "Bond polarity/dipole",
     "Hydrogen bond (F-H…F)",
     "London dispersion forces",
     "Electronegativity"
    ],
    "examQA": [
     {
      "q": "Explain why HF has a higher boiling point than HCl despite having a lower Mr.",
      "a": "HF molecules form hydrogen bonds with each other (due to very electronegative F bonded to H). Hydrogen bonds are stronger than the dipole-dipole forces between HCl molecules. More energy is needed to overcome hydrogen bonding in HF, so it has a higher boiling point despite its lower relative molecular mass."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Chemical_bond"
   },
   {
    "id": "states-of-matter",
    "name": "States of Matter",
    "syllabusRef": "4",
    "section": "Physical Chemistry",
    "description": "Solid (fixed arrangement, vibration only), liquid (random, mobile), gas (widely spaced, random motion). Phase changes and enthalpy. Ideal gas law: pV = nRT. Real gases deviate at high pressure (volume of molecules) and low temperature (intermolecular forces). Simple molecular structures: low mp/bp. Giant covalent: very high mp (e.g. diamond, graphite, SiO₂). Ionic lattice: high mp, brittle.",
    "svgKey": "alevel-chem-states-of-matter",
    "threejs3dFn": "createParticleStates",
    "landmarks": [
     "pV = nRT",
     "Solid lattice vibration",
     "Liquid: no fixed arrangement",
     "Ideal vs real gas",
     "Giant covalent lattice",
     "Simple molecular structure"
    ],
    "examQA": [
     {
      "q": "Explain why graphite conducts electricity but diamond does not.",
      "a": "In graphite, each carbon forms 3 covalent bonds in hexagonal layers, leaving one delocalised electron per carbon free to move through the layer — hence conducts electricity. In diamond, each carbon forms 4 covalent bonds in a 3D tetrahedral lattice; all electrons are localised in bonds with none free to move, so diamond does not conduct."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/States_of_matter"
   },
   {
    "id": "energetics",
    "name": "Chemical Energetics",
    "syllabusRef": "5",
    "section": "Physical Chemistry",
    "description": "Enthalpy change ΔH: exothermic (negative), endothermic (positive). Hess's law: ΔH is path-independent. Standard enthalpies: combustion, formation, atomisation, bond enthalpy. Born-Haber cycles for lattice enthalpy. Entropy S: disorder. Gibbs free energy ΔG = ΔH − TΔS; spontaneous if ΔG < 0.",
    "svgKey": "alevel-chem-energetics",
    "threejs3dFn": "createEnergyTransfer",
    "landmarks": [
     "Enthalpy profile/Ea",
     "Hess's law",
     "Bond enthalpy",
     "Born-Haber cycle",
     "Lattice enthalpy",
     "Entropy S",
     "ΔG = ΔH − TΔS"
    ],
    "examQA": [
     {
      "q": "Explain why ΔG = ΔH − TΔS must be negative for a spontaneous process.",
      "a": "A spontaneous process releases free energy. ΔG < 0 means the products have lower free energy than reactants. If ΔH is negative (exothermic) and ΔS is positive (increased disorder), ΔG is always negative — spontaneous at all temperatures. If ΔH is positive and ΔS is positive, ΔG becomes negative only at high T (TΔS > ΔH). Systems naturally move to lower Gibbs free energy."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Gibbs_free_energy"
   },
   {
    "id": "electrochemistry",
    "name": "Electrochemistry",
    "syllabusRef": "6",
    "section": "Physical Chemistry",
    "description": "Redox: oxidation is electron loss; reduction is electron gain (OIL RIG). Electrode potentials: standard hydrogen electrode (E°=0). Electrochemical cells: E°cell = E°cathode − E°anode. Feasibility: ΔG° = −nFE°cell. Electrolysis: non-spontaneous redox driven by external current. Faraday's laws: Q = It; n(e\u207b) = Q/F, so mass deposited m = QM/(zF) \u2014 mass \u221d Q \u00d7 molar mass, and inversely \u221d charge on the ion.",
    "threejs3dFn": "createMolecule('nacl')",
    "svgKey": "alevel-chem-electrochemistry",
    "landmarks": [
     "OIL RIG",
     "Standard electrode potential",
     "SHE (E° = 0 V)",
     "E°cell = E°cathode − E°anode",
     "Faraday constant F",
     "Electrolysis: anode oxidation cathode reduction"
    ],
    "examQA": [
     {
      "q": "Explain how to use standard electrode potentials to predict the feasibility of a reaction.",
      "a": "Calculate E°cell = E°(more positive electrode, reduction) − E°(more negative electrode, reduction). If E°cell is positive, ΔG° = −nFE°cell is negative, and the reaction is thermodynamically feasible. Note: feasibility does not guarantee the reaction occurs at a measurable rate (kinetic factors may prevent it)."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Electrochemistry"
   },
   {
    "id": "equilibria",
    "name": "Equilibria",
    "syllabusRef": "7",
    "section": "Physical Chemistry",
    "description": "Dynamic equilibrium: forward and reverse rates equal. Kc = [products]/[reactants] (concentration terms). Kp uses partial pressures. Le Chatelier's principle: system shifts to oppose a change. Effect of T: increasing T shifts equilibrium in endothermic direction, changes K. Effect of pressure: shifts toward fewer moles of gas. Catalyst: no effect on K or position, only rate. Acid-base: Brønsted-Lowry, Ka, pH = −log[H⁺], buffer solutions.",
    "svgKey": "alevel-chem-equilibria",
    "threejs3dFn": "createReactionAnimation",
    "landmarks": [
     "Kc expression",
     "Kp expression",
     "Le Chatelier's principle",
     "Effect of T on K",
     "pH = −log[H⁺]",
     "Buffer action",
     "Ka, pKa"
    ],
    "examQA": [
     {
      "q": "Explain how a buffer solution resists changes in pH when a small amount of acid is added.",
      "a": "A buffer contains a weak acid (HA) and its conjugate base (A⁻, from a salt). When acid (H⁺) is added, it reacts with the conjugate base: A⁻ + H⁺ → HA. The H⁺ is removed, so pH change is minimal. The equilibrium HA ⇌ H⁺ + A⁻ shifts left. As long as significant amounts of both HA and A⁻ are present, the buffer resists pH change."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Chemical_equilibrium"
   },
   {
    "id": "kinetics",
    "name": "Reaction Kinetics",
    "syllabusRef": "8",
    "section": "Physical Chemistry",
    "description": "Collision theory: rate increases with collision frequency and energy. Activation energy Ea: minimum energy for reaction. Maxwell-Boltzmann distribution: temperature shifts curve, more molecules exceed Ea. Rate equation: rate = k[A]\u1d50[B]\u207f; orders m and n determined experimentally. Rate constant k increases with T (Arrhenius: k = Ae^{−Ea/RT}). Half-life t½. Catalysts lower Ea.",
    "svgKey": "alevel-chem-kinetics",
    "threejs3dFn": "createCollisionAnimation",
    "landmarks": [
     "Maxwell-Boltzmann distribution",
     "Activation energy Ea",
     "Rate = k[A]^m[B]^n (overall order = m + n)",
     "Order of reaction",
     "Half-life t½",
     "Arrhenius equation",
     "Catalyst mechanism"
    ],
    "examQA": [
     {
      "q": "Explain why a catalyst increases reaction rate without being consumed.",
      "a": "A catalyst provides an alternative reaction pathway with a lower activation energy. In the Maxwell-Boltzmann distribution, more molecules have energy ≥ the lower Ea, so more collisions are successful per unit time — rate increases. The catalyst participates in the reaction but is regenerated at the end, so it is not consumed overall and does not appear in the overall equation."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Reaction_rate"
   },
   {
    "id": "periodic-table",
    "name": "The Periodic Table",
    "syllabusRef": "9",
    "section": "Inorganic Chemistry",
    "description": "Periodicity: trends in atomic radius (decreases across period), ionisation energy (increases), electronegativity. Period 3 oxides: Na₂O (basic), MgO (basic), Al₂O₃ (amphoteric), SiO₂ (acidic), P₄O₁₀ (acidic), SO₃ (acidic). Transition metals (d-block): variable oxidation states, coloured compounds, complex formation, catalytic activity. Group trends (Group 1, 2, 7, 0).",
    "svgKey": "alevel-chem-periodic-table",
    "landmarks": [
     "Atomic radius trend",
     "Ionisation energy trend",
     "Period 3 oxides",
     "Transition metal: d-orbitals",
     "Variable oxidation state",
     "Coloured complexes",
     "Catalytic activity"
    ],
    "examQA": [
     {
      "q": "State and explain the trend in atomic radius across Period 3.",
      "a": "Atomic radius decreases from Na to Cl (Ar has no covalent radius). As proton number increases across the period, nuclear charge increases. Electrons are added to the same 3rd shell, so shielding remains approximately constant. The increased nuclear attraction pulls electrons closer to the nucleus, decreasing atomic radius."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Periodic_table"
   },
   {
    "id": "nitrogen-sulfur",
    "name": "Nitrogen and Sulfur",
    "syllabusRef": "10",
    "section": "Inorganic Chemistry",
    "description": "Nitrogen: Haber process (N₂+3H₂⇌2NH₃; Fe catalyst, 450°C, 200 atm); Ostwald process (4NH₃+5O₂→4NO+6H₂O, Pt catalyst) → HNO₃. Oxides of nitrogen: NO, NO₂ (from combustion, acid rain). Sulfur: Contact process (SO₂+½O₂⇌SO₃; V₂O₅, 450°C, 1–2 atm) → H₂SO₄. SO₂ from combustion → acid rain.",
    "svgKey": "alevel-chem-nitrogen-sulfur",
    "landmarks": [
     "Haber process conditions",
     "Ostwald process",
     "Contact process",
     "V₂O₅ catalyst",
     "Acid rain: H₂SO₄, HNO₃",
     "Le Chatelier in industrial context"
    ],
    "examQA": [
     {
      "q": "Explain the choice of conditions in the Haber process using Le Chatelier's principle.",
      "a": "N₂+3H₂⇌2NH₃ (ΔH = −92 kJ mol⁻¹). High pressure (200 atm) favours forward reaction (4 mol gas → 2 mol); higher pressure gives more NH₃. Low temperature gives higher yield (exothermic, equilibrium shifts right at low T) but rate is too slow — compromise of ~450°C with Fe catalyst gives acceptable rate and yield. Catalyst increases rate without shifting equilibrium."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Haber_process"
   },
   {
    "id": "organic-intro",
    "name": "Introduction to Organic Chemistry",
    "syllabusRef": "11",
    "section": "Organic Chemistry",
    "description": "Homologous series share the same general formula and functional group. IUPAC nomenclature: longest C chain, functional group suffix. Structural isomers (chain, position, functional group), stereoisomers (cis/trans, optical isomers). Reaction mechanisms: free radical substitution (alkanes + Cl₂/UV), electrophilic addition (alkenes), nucleophilic substitution, electrophilic substitution (benzene).",
    "svgKey": "alevel-chem-organic-intro",
    "threejs3dFn": "createMolecule('methane')",
    "landmarks": [
     "Homologous series",
     "IUPAC naming",
     "Structural isomers",
     "Optical isomers (chirality)",
     "Cis/trans isomers",
     "Free radical/electrophilic/nucleophilic mechanisms"
    ],
    "examQA": [
     {
      "q": "Explain what is meant by optical isomerism.",
      "a": "Optical isomers (enantiomers) are non-superimposable mirror images. They arise when a carbon atom is bonded to four different groups (chiral centre). The two isomers rotate plane-polarised light in opposite directions (+/−). They have identical physical properties (same mp, bp, solubility) but different biological activity (different enantiomers may interact differently with enzymes/receptors)."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Stereoisomerism"
   },
   {
    "id": "hydrocarbons",
    "name": "Hydrocarbons",
    "syllabusRef": "12",
    "section": "Organic Chemistry",
    "description": "Alkanes: free radical substitution with halogens (initiation/propagation/termination). Alkenes: electrophilic addition of HX, X₂ and H₂O/H₂SO₄ (Markovnikov); separately, addition of H₂ over a Ni catalyst at ~150 °C, which is not an electrophilic mechanism; test with bromine water. Benzene: delocalised π system; electrophilic substitution (nitration, Friedel-Crafts). Addition polymers from alkene monomers. Cracking: thermal/catalytic to produce smaller molecules and alkenes.",
    "threejs3dFn": "createMolecule('benzene')",
    "svgKey": "alevel-chem-hydrocarbons",
    "landmarks": [
     "Free radical substitution (UV)",
     "Electrophilic addition",
     "Markovnikov's rule",
     "Bromine water test",
     "Benzene electrophilic substitution",
     "Nitration: HNO₃/H₂SO₄",
     "Cracking"
    ],
    "examQA": [
     {
      "q": "Explain the mechanism of electrophilic addition of HBr to propene, stating Markovnikov's rule.",
      "a": "HBr approaches the C=C π bond. The π electrons attack H of HBr (electrophile), forming a carbocation intermediate. By Markovnikov's rule, H adds to the carbon with more H atoms (less substituted), giving the more stable secondary carbocation on the middle carbon. Br⁻ (nucleophile) attacks the carbocation, giving 2-bromopropane as the major product."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Alkene"
   },
   {
    "id": "halogen-compounds",
    "name": "Halogen Compounds",
    "syllabusRef": "13",
    "section": "Organic Chemistry",
    "description": "Haloalkanes undergo nucleophilic substitution (SN1 with tertiary; SN2 with primary) and elimination. Reactions: +NaOH(aq) → alcohol; +KOH(alc) → alkene; +NH₃ → amine; +KCN → nitrile; +AgNO₃ → silver halide precipitate (test). Reactivity: C-I weakest bond → most reactive; C-F strongest → least reactive.",
    "svgKey": "alevel-chem-halogen-compounds",
    "landmarks": [
     "SN1 vs SN2 mechanism",
     "Nucleophile Nu:",
     "AgNO₃ test for halide",
     "C-X bond strength: F>Cl>Br>I",
     "Reactivity order: I>Br>Cl"
    ],
    "examQA": [
     {
      "q": "Describe and explain the SN2 mechanism for the hydrolysis of 1-bromoethane with NaOH(aq).",
      "a": "OH⁻ (nucleophile) attacks the carbon bearing Br from the back (180° to the C-Br bond). A transition state forms with both OH and Br partially bonded to C. The C-Br bond breaks heterolytically; Br⁻ leaves as the leaving group. The configuration at carbon inverts (Walden inversion). Product: ethanol + Br⁻. SN2 is favoured with primary haloalkanes (little steric hindrance)."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Nucleophilic_substitution"
   },
   {
    "id": "hydroxy-compounds",
    "name": "Hydroxy Compounds",
    "syllabusRef": "14",
    "section": "Organic Chemistry",
    "description": "Alcohols (R-OH): primary/secondary/tertiary. Reactions: +Na → H₂; esterification (+RCOOH, conc H₂SO₄ catalyst); dehydration → alkene (conc H₂SO₄, heat); oxidation: 1° → aldehyde → carboxylic acid (K₂Cr₂O₇/H⁺); 2° → ketone. Phenols (Ar-OH): weakly acidic; +NaOH → salt; +FeCl₃ → violet colour test; electrophilic substitution.",
    "svgKey": "alevel-chem-hydroxy-compounds",
    "landmarks": [
     "1°/2°/3° alcohol",
     "Esterification",
     "Oxidation: 1° → aldehyde → acid",
     "Phenol: acidic Ar-OH",
     "FeCl₃ test for phenol",
     "Dehydration → alkene"
    ],
    "examQA": [
     {
      "q": "Explain why phenol is more acidic than cyclohexanol.",
      "a": "In phenol, the O-H bond is weakened because the lone pair on oxygen delocalises into the benzene ring, stabilising the phenoxide ion C₆H₅O⁻ by charge dispersal. This makes proton donation easier. In cyclohexanol, there is no delocalisation; the alkoxide ion C₆H₁₁O⁻ is less stable. Phenol is more acidic (pKa ~10) than cyclohexanol (pKa ~16), though both are weaker acids than HCl."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Alcohol"
   },
   {
    "id": "carbonyl-compounds",
    "name": "Carbonyl Compounds",
    "syllabusRef": "15",
    "section": "Organic Chemistry",
    "description": "Aldehydes (RCHO) vs ketones (RCOR'): both contain C=O. Test: Tollens' reagent (silver mirror) and Fehling's (brick red) positive for aldehydes only. Nucleophilic addition with HCN \u2192 hydroxynitrile (+NaCN; chiral centre formed only if the carbonyl carbon ends up bonded to four different groups \u2014 yes for ethanal/propanal, no for methanal/propanone). Reduction with NaBH₄ → alcohol. Reaction with 2,4-DNPH → orange precipitate (test for C=O). Carboxylic acids and acyl chlorides.",
    "svgKey": "alevel-chem-carbonyl-compounds",
    "landmarks": [
     "Aldehyde vs ketone",
     "Tollens' test (silver mirror)",
     "Fehling's test (brick red)",
     "NaBH₄ reduction",
     "HCN nucleophilic addition",
     "2,4-DNPH test for C=O"
    ],
    "examQA": [
     {
      "q": "Describe the mechanism for the reaction of propanal with HCN in the presence of NaCN.",
      "a": "CN⁻ (nucleophile, from NaCN) attacks the δ+ carbon of the C=O in propanal. Electrons from C=O move to O, forming an alkoxide intermediate. Protonation of O by HCN (or solvent) gives the hydroxynitrile product (2-hydroxybutanenitrile). A new chiral centre is created at C-2, producing a racemic mixture of enantiomers."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Carbonyl_group"
   },
   {
    "id": "nitrogen-compounds",
    "name": "Nitrogen Compounds",
    "syllabusRef": "16",
    "section": "Organic Chemistry",
    "description": "Amines: primary (RNH₂), secondary, tertiary. Basic (lone pair on N). Made from: haloalkane + NH₃; nitrile + LiAlH₄; nitrobenzene + Sn/HCl. Amides (RCONH₂): from acyl chloride + NH₃/amine (acid + amine gives an ammonium carboxylate salt, not an amide); hydrolysed by acid/alkali. Amino acids (H₂N-CHR-COOH): zwitterions; peptide bond formation (condensation); isoelectric point. Proteins: primary → quaternary structure.",
    "svgKey": "alevel-chem-nitrogen-compounds",
    "landmarks": [
     "Amine basicity (lone pair)",
     "Amide bond",
     "Zwitterion",
     "Isoelectric point",
     "Peptide bond",
     "Diazotisation → azo dye",
     "LiAlH₄ reduction"
    ],
    "examQA": [
     {
      "q": "Explain why primary aliphatic amines are more basic than ammonia.",
      "a": "Amines are basic because the N lone pair accepts a proton. In primary aliphatic amines (RNH₂), the alkyl group is electron-donating (inductive effect), increasing the electron density on N and making the lone pair more available to accept H⁺. The resulting alkylammonium ion R-NH₃⁺ is also stabilised by the alkyl group. Hence pKb is lower (stronger base) than NH₃."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Amine"
   },
   {
    "id": "polymerisation",
    "name": "Polymerisation",
    "syllabusRef": "17",
    "section": "Organic Chemistry",
    "description": "Addition polymerisation: alkene monomers join with no by-product (polyethene, polypropene, PVC, PTFE). Condensation polymerisation: two functional groups react, eliminating H₂O (or HCl): polyamides (nylon — diamine + dicarboxylic acid; amide linkage), polyesters (terylene — diol + dicarboxylic acid; ester bond). Biodegradability; recycling; environmental impact.",
    "threejs3dFn": "createPolymerChain",
    "svgKey": "alevel-chem-polymerisation",
    "landmarks": [
     "Addition: C=C + C=C → chain",
     "Condensation: -NH₂ + -COOH → amide + H₂O",
     "Nylon: polyamide",
     "Terylene: polyester",
     "Biodegradability",
     "Repeat unit notation"
    ],
    "examQA": [
     {
      "q": "Describe the formation of nylon-6,6 and identify the type of polymerisation.",
      "a": "Nylon-6,6 is formed by condensation polymerisation between hexane-1,6-diamine (H₂N(CH₂)₆NH₂) and hexanedioic acid (HOOC(CH₂)₄COOH). The amine group (−NH₂) of one monomer reacts with the carboxylic acid (−COOH) of another, forming a peptide (amide) bond (−CO−NH−) and eliminating water. The process repeats at both ends of each monomer, building a long-chain polyamide."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Nylon"
   },
   {
    "id": "organic-synthesis",
    "name": "Organic Synthesis",
    "syllabusRef": "18",
    "section": "Organic Chemistry",
    "description": "Multi-step synthesis: plan routes between functional groups using known reactions. Key interconversions: alkane ↔ haloalkane, alkene ↔ alcohol ↔ ester ↔ carboxylic acid ↔ acyl chloride ↔ amide/amine, nitrile → amine. Reagents, conditions, and mechanisms for each step. Purification: distillation, recrystallisation. TLC, melting point to assess purity.",
    "svgKey": "alevel-chem-organic-synthesis",
    "landmarks": [
     "Functional group interconversions",
     "Multi-step routes",
     "Reagents and conditions",
     "Purification: distillation/recrystallisation",
     "TLC/melting point"
    ],
    "examQA": [
     {
      "q": "Outline a two-step synthesis of ethylamine (C₂H₅NH₂) from bromoethane.",
      "a": "Step 1: bromoethane + excess concentrated NH₃ (in ethanol, sealed tube, heat) → ethylamine (via nucleophilic substitution; further alkylation to 2° and 3° amines/quaternary salt also possible — excess NH₃ minimises over-alkylation). Alternatively: Step 1: bromoethane + KCN(ethanol) → propanenitrile (CH₃CH₂CN); Step 2: propanenitrile + LiAlH₄ (dry ether), then H₂O → propylamine. (Second route gives primary amine with one extra C.)"
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Organic_synthesis"
   },
   {
    "id": "analytical",
    "name": "Analytical Techniques",
    "syllabusRef": "19",
    "section": "Analytical",
    "description": "Mass spectrometry: M⁺ peak gives Mr; fragmentation pattern; base peak = most abundant ion (tallest, 100% relative abundance) — often, but not always, the most stable fragment. Infrared (IR) spectroscopy: functional groups absorb characteristic wavenumbers (O-H broad 3200-3600 (alcohols/phenols), O-H broad 2500-3000 (carboxylic acids); C=O sharp ~1700; N-H 3300-3500; C-H ~3000; fingerprint region 600-1500 cm⁻¹). ¹H NMR: chemical shift δ (ppm) identifies H environment; integration; splitting (n+1 rule); TMS reference.",
    "svgKey": "alevel-chem-analytical",
    "landmarks": [
     "M⁺ ion (Mr)",
     "Fragmentation pattern",
     "IR: O-H, C=O, N-H wavenumbers",
     "Fingerprint region",
     "δ (ppm) chemical shift",
     "Spin-spin splitting (n+1)",
     "TMS reference"
    ],
    "examQA": [
     {
      "q": "How would you use IR spectroscopy to distinguish between pentan-1-ol and pentanal?",
      "a": "Both show C-H absorptions (~3000 cm⁻¹). Pentan-1-ol (alcohol) shows a broad O-H absorption at 3200-3600 cm⁻¹ (2500-3000 cm⁻¹ is the carboxylic acid O-H range) and a C=O absence. Pentanal (aldehyde) shows a sharp C=O peak at ~1720 cm⁻¹ and no broad O-H peak. The presence of O-H stretch confirms alcohol; presence of C=O without O-H confirms aldehyde."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Infrared_spectroscopy"
   }
  ]
 },
 "cambridge_alevel_physics": {
  "subjectName": "Cambridge A Level Physics",
  "examCode": "9702",
  "sections": [
   "All",
   "Mechanics",
   "Waves & Fields",
   "Electricity",
   "Nuclear & Thermal",
   "Modern Physics"
  ],
  "topics": [
   {
    "id": "physical-quantities",
    "name": "Physical Quantities and Units",
    "syllabusRef": "1",
    "section": "Mechanics",
    "description": "SI base units: kg, m, s, A, K, mol, cd. Derived units expressed in base units. Homogeneity of equations. Scalar vs vector quantities; vector addition (triangle/parallelogram). Significant figures; precision vs accuracy; systematic vs random error; absolute/fractional/percentage uncertainty. Combining uncertainties: add absolute for +/−; add fractional for ×/÷.",
    "svgKey": "alevel-phys-quantities",
    "landmarks": [
     "SI base units",
     "Scalar vs vector",
     "Vector triangle",
     "Significant figures",
     "Systematic/random error",
     "Percentage uncertainty",
     "Combining uncertainties"
    ],
    "examQA": [
     {
      "q": "Explain the difference between systematic error and random error.",
      "a": "Systematic errors shift all measurements in the same direction by the same amount — they affect accuracy (e.g. zero error on a meter rule, wrongly calibrated instrument). They cannot be reduced by repeating measurements. Random errors cause scatter about the true value — they affect precision (e.g. reaction time, parallax). Random errors can be reduced by repeating and averaging measurements."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Measurement_uncertainty"
   },
   {
    "id": "kinematics",
    "name": "Kinematics",
    "syllabusRef": "2",
    "section": "Mechanics",
    "description": "Displacement, velocity (v = Δs/Δt), acceleration (a = Δv/Δt). Equations of uniformly accelerated motion: v = u + at; s = ut + ½at²; v² = u² + 2as; s = ½(u+v)t. Displacement-time graphs (gradient = velocity) and velocity-time graphs (gradient = acceleration; area = displacement). Projectile motion: horizontal and vertical components independent.",
    "svgKey": "alevel-phys-kinematics",
    "threejs3dFn": "createMotionAnimation",
    "landmarks": [
     "v = u + at",
     "s = ut + ½at²",
     "v² = u² + 2as",
     "v-t graph area = displacement",
     "s-t graph gradient = velocity",
     "Projectile: independent components",
     "g = 9.81 m s⁻²"
    ],
    "examQA": [
     {
      "q": "A ball is thrown horizontally at 12 m/s from a cliff 45 m high. Calculate the time to reach the base and the horizontal distance travelled.",
      "a": "Vertical: s = ut + ½at² → 45 = 0 + ½(9.81)t² → t² = 9.17 → t = 3.03 s. Horizontal: x = 12 × 3.03 = 36.3 m. (Horizontal velocity constant; vertical: free fall under gravity.)"
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Kinematics"
   },
   {
    "id": "dynamics",
    "name": "Dynamics",
    "syllabusRef": "3",
    "section": "Mechanics",
    "description": "Newton's three laws. Linear momentum p = mv. Impulse = FΔt = Δp. Conservation of momentum (closed system). Elastic collision (KE conserved); inelastic (KE lost). Newton's 2nd law: F = Δp/Δt = ma (for constant mass). Weight = mg. Terminal velocity: drag = weight. Free body diagrams; resultant force determines acceleration.",
    "svgKey": "alevel-phys-dynamics",
    "threejs3dFn": "createForceVectors",
    "landmarks": [
     "p = mv",
     "F = Δp/Δt",
     "Impulse = FΔt = Δp",
     "Conservation of momentum",
     "Elastic vs inelastic collision",
     "Terminal velocity",
     "Free body diagram"
    ],
    "examQA": [
     {
      "q": "Explain what is meant by conservation of linear momentum and state the condition required.",
      "a": "Conservation of linear momentum states that the total momentum of a system remains constant provided no external resultant force acts on the system. Total momentum before = total momentum after. This applies to all collisions and explosions. The condition is that there is no net external force (isolated system). Internal forces (between objects) cancel in Newton's 3rd law pairs."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Momentum"
   },
   {
    "id": "forces",
    "name": "Forces, Density and Pressure",
    "syllabusRef": "4",
    "section": "Mechanics",
    "description": "Density ρ = m/V. Pressure P = F/A. Pressure in a fluid: P = ρgh. Upthrust = weight of fluid displaced (Archimedes). Moment of a force = Fd (perpendicular). Principle of moments: sum of CW moments = sum of ACW moments about any pivot (equilibrium). Centre of gravity. Torque of a couple = F × d.",
    "svgKey": "alevel-phys-forces",
    "threejs3dFn": "createForceVectors",
    "landmarks": [
     "ρ = m/V",
     "P = F/A",
     "P = ρgh",
     "Upthrust = ρVg",
     "Moment = Fd",
     "Principle of moments",
     "Centre of gravity"
    ],
    "examQA": [
     {
      "q": "State the principle of moments and explain how it applies to a uniform beam in equilibrium.",
      "a": "Principle of moments: for an object in equilibrium, the sum of clockwise moments about any point equals the sum of anticlockwise moments. For a uniform beam: the beam's weight acts at its midpoint (centre of gravity). Any applied forces create moments about the pivot. Equilibrium requires both: (i) sum of forces = 0 and (ii) sum of moments = 0 (two conditions of equilibrium)."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Moment_(physics)"
   },
   {
    "id": "energy",
    "name": "Work, Energy and Power",
    "syllabusRef": "5",
    "section": "Mechanics",
    "description": "Work W = Fd cosθ. Kinetic energy KE = ½mv². Gravitational PE = mgh. Elastic PE = ½Fx = ½kx². Conservation of energy. Power P = W/t = Fv. Efficiency η = useful Pout / total Pin. Energy sources: fossil fuels, nuclear, renewables. Sankey diagrams show energy transfers.",
    "svgKey": "alevel-phys-energy",
    "threejs3dFn": "createEnergyTransfer",
    "landmarks": [
     "W = Fd cosθ",
     "KE = ½mv²",
     "GPE = mgh",
     "P = W/t = Fv",
     "Efficiency η = Pout/Pin",
     "Conservation of energy",
     "Elastic PE = ½kx²"
    ],
    "examQA": [
     {
      "q": "A car of mass 1200 kg accelerates from 0 to 30 m/s. Calculate the KE gained and the minimum energy from fuel (assume 25% efficiency).",
      "a": "KE = ½mv² = ½ × 1200 × 30² = 540 000 J = 540 kJ. Efficiency 25%: useful output = 0.25 × input → input = 540/0.25 = 2160 kJ minimum fuel energy required."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Work_(physics)"
   },
   {
    "id": "deformation",
    "name": "Deformation of Solids",
    "syllabusRef": "6",
    "section": "Mechanics",
    "description": "Hooke's law: F = kx (within elastic limit). Elastic deformation (returns to original shape); plastic (permanent). Stress σ = F/A; strain ε = x/L; Young modulus E = σ/ε. Area under F-x graph = elastic strain energy = ½Fx = ½kx². Stress-strain curves: limit of proportionality, elastic limit, yield point, fracture. Brittle vs ductile materials.",
    "svgKey": "alevel-phys-deformation",
    "landmarks": [
     "F = kx",
     "E = σ/ε",
     "Stress = F/A",
     "Strain = x/L",
     "Elastic limit",
     "Yield point",
     "Brittle vs ductile"
    ],
    "examQA": [
     {
      "q": "Describe how to determine the Young modulus of a metal wire experimentally.",
      "a": "Clamp wire horizontally; measure original length L and diameter d (→ cross-sectional area A = πd²/4) with metre rule and micrometer. Hang known masses; measure extension x with vernier scale or travelling microscope. Plot F (= mg) vs extension x; gradient = k. E = (F/A)/(x/L) = FL/Ax. Plot stress vs strain; gradient = E. Use long thin wire to maximise measurable extension."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Young%27s_modulus"
   },
   {
    "id": "waves",
    "name": "Waves",
    "syllabusRef": "7",
    "section": "Waves & Fields",
    "description": "Wave properties: amplitude, wavelength λ, frequency f, period T, speed v = fλ. Transverse (oscillation ⊥ direction) vs longitudinal (oscillation ∥). Phase and phase difference. Intensity ∝ amplitude². Reflection, refraction (Snell's law: n₁sinθ₁ = n₂sinθ₂), diffraction (significant when λ ≈ gap size), polarisation (transverse waves only). Electromagnetic spectrum.",
    "threejs3dFn": "createWave3D",
    "svgKey": "alevel-phys-waves",
    "landmarks": [
     "v = fλ",
     "T = 1/f",
     "Transverse vs longitudinal",
     "Phase difference",
     "Snell's law n₁sinθ₁ = n₂sinθ₂",
     "Diffraction condition λ ≈ gap",
     "Polarisation"
    ],
    "examQA": [
     {
      "q": "State two differences between transverse and longitudinal waves.",
      "a": "In transverse waves, oscillations are perpendicular to the direction of wave propagation; in longitudinal waves, oscillations are parallel to the direction of propagation. Transverse waves can be polarised (restricting oscillation to one plane); longitudinal waves cannot be polarised. Examples: transverse — light, water waves; longitudinal — sound, P-waves."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Wave"
   },
   {
    "id": "superposition",
    "name": "Superposition",
    "syllabusRef": "8",
    "section": "Waves & Fields",
    "description": "Principle of superposition: resultant displacement = sum of individual displacements. Interference: constructive (path difference = nλ) and destructive (path difference = (n+½)λ). Two-source experiment (Young's double-slit): fringe spacing w = λD/a. Diffraction grating: d sinθ = nλ. Standing waves: nodes (zero amplitude) and antinodes; stationary pattern. String harmonics, air column resonance.",
    "threejs3dFn": "createWave3D",
    "svgKey": "alevel-phys-superposition",
    "landmarks": [
     "Superposition principle",
     "Constructive: path diff = nλ",
     "Destructive: path diff = (n+½)λ",
     "Young's slits: w = λD/a",
     "Diffraction grating d sinθ = nλ",
     "Standing wave nodes/antinodes"
    ],
    "examQA": [
     {
      "q": "In a double-slit experiment, D = 1.2 m, a = 0.4 mm, w = 1.5 mm. Calculate the wavelength.",
      "a": "w = λD/a → λ = wa/D = (1.5×10⁻³ × 0.4×10⁻³) / 1.2 = 6×10⁻⁷ / 1.2 = 5×10⁻⁷ m = 500 nm (green light)."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Superposition_principle"
   },
   {
    "id": "electric-fields",
    "name": "Electric Fields",
    "syllabusRef": "9",
    "section": "Waves & Fields",
    "description": "Electric field strength E = F/Q (N C⁻¹ = V m⁻¹). Coulomb's law: F = kQ₁Q₂/r². Field lines show direction on positive test charge. Uniform field between parallel plates: E = V/d. Point charge: E = kQ/r². Electric potential V = kQ/r; work W = QV; potential energy EP = QV. Capacitors: E = V/d between plates.",
    "threejs3dFn": "createFieldLines('electric')",
    "svgKey": "alevel-phys-electric-fields",
    "landmarks": [
     "E = F/Q",
     "Coulomb's law F = kQ₁Q₂/r²",
     "E = V/d (uniform field)",
     "E = kQ/r² (point charge)",
     "V = kQ/r",
     "W = QV",
     "Field lines"
    ],
    "examQA": [
     {
      "q": "Two charges of +2 μC and +3 μC are separated by 0.10 m. Calculate the force between them.",
      "a": "F = kQ₁Q₂/r² = (8.99×10⁹ × 2×10⁻⁶ × 3×10⁻⁶) / (0.10)² = (8.99×10⁹ × 6×10⁻¹²) / 0.01 = 0.054/0.01 = 5.4 N repulsion."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Electric_field"
   },
   {
    "id": "capacitance",
    "name": "Capacitance",
    "syllabusRef": "10",
    "section": "Electricity",
    "description": "Capacitance C = Q/V (farads). Parallel plate capacitor: C = ε₀εᵣA/d. Energy stored: E = ½QV = ½CV² = Q²/2C. Capacitors in series: 1/C = 1/C₁ + 1/C₂; in parallel: C = C₁ + C₂. Charging/discharging through resistor: Q = Q₀e^{−t/RC}; time constant τ = RC (time for charge to fall to 1/e ≈ 37%).",
    "svgKey": "alevel-phys-capacitance",
    "threejs3dFn": "createFieldLines('electric')",
    "landmarks": [
     "C = Q/V",
     "C = ε₀εᵣA/d",
     "E = ½CV²",
     "Series/parallel combinations",
     "Q = Q₀e^{−t/RC}",
     "τ = RC",
     "63% charged at t = τ"
    ],
    "examQA": [
     {
      "q": "A 470 μF capacitor is charged to 12 V. Calculate the energy stored, then describe how it discharges through a 10 kΩ resistor.",
      "a": "E = ½CV² = ½ × 470×10⁻⁶ × 12² = ½ × 470×10⁻⁶ × 144 = 0.0338 J ≈ 34 mJ. Discharge: Q = Q₀e^{−t/RC}; τ = RC = 10×10³ × 470×10⁻⁶ = 4.7 s. After time τ (4.7 s), charge falls to 37% of Q₀. Exponential decay — current and voltage also decay exponentially."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Capacitor"
   },
   {
    "id": "current",
    "name": "Current of Electricity",
    "syllabusRef": "11",
    "section": "Electricity",
    "description": "Current I = ΔQ/Δt. Charge carriers: electrons (metals); ions (electrolytes). Drift velocity: I = nAvq. Ohm's law: V = IR (if R constant with T). Resistance R = ρL/A. Resistivity ρ varies with material and temperature (metals: ρ increases; semiconductors: ρ decreases with T). Power P = IV = I²R = V²/R. EMF and internal resistance: V = ε − Ir.",
    "svgKey": "alevel-phys-current",
    "threejs3dFn": "createMetalLattice",
    "landmarks": [
     "I = ΔQ/Δt",
     "I = nAvq",
     "V = IR",
     "R = ρL/A",
     "P = IV = I²R",
     "EMF ε = V + Ir",
     "Resistivity ρ"
    ],
    "examQA": [
     {
      "q": "A battery has EMF 6.0 V and internal resistance 0.5 Ω. It drives a current of 2.0 A. Find the terminal voltage.",
      "a": "V = ε − Ir = 6.0 − (2.0 × 0.5) = 6.0 − 1.0 = 5.0 V. The terminal voltage is less than EMF because of the voltage drop across internal resistance."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Electric_current"
   },
   {
    "id": "dc-circuits",
    "name": "DC Circuits",
    "syllabusRef": "12",
    "section": "Electricity",
    "description": "Kirchhoff's 1st law (current): sum of currents entering a node = sum leaving. Kirchhoff's 2nd law (voltage): sum of EMFs = sum of potential drops around any closed loop. Resistors in series: R_T = R₁+R₂; voltage divides. Resistors in parallel: 1/R_T = 1/R₁+1/R₂; current divides. Potential divider. Wheatstone bridge. Sensors: LDR, thermistor.",
    "svgKey": "alevel-phys-dc-circuits",
    "landmarks": [
     "Kirchhoff's 1st law (I)",
     "Kirchhoff's 2nd law (V)",
     "Series: same I",
     "Parallel: same V",
     "Potential divider Vout = R₂/(R₁+R₂) × Vin",
     "LDR/thermistor behaviour"
    ],
    "examQA": [
     {
      "q": "Describe how a potential divider can be used to produce a varying output voltage with a thermistor.",
      "a": "Connect a thermistor (R_T) in series with a fixed resistor R. Apply a fixed supply voltage Vin across both. Take Vout across R. As temperature rises, thermistor resistance R_T decreases. By potential divider: Vout = R/(R+R_T) × Vin — as R_T decreases, Vout increases. This can trigger a switching circuit when temperature exceeds a set value."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Kirchhoff%27s_circuit_laws"
   },
   {
    "id": "nuclear",
    "name": "Particle and Nuclear Physics",
    "syllabusRef": "13",
    "section": "Nuclear & Thermal",
    "description": "Atom: nucleus (protons + neutrons) + electrons. Isotopes: same Z, different N. Nuclear equations (conserve A and Z). Radioactive decay: alpha (₂⁴He, short range, ionising), beta-minus (electron + antineutrino), gamma (photon, penetrating). Decay law: N = N₀e^{−λt}; A = λN; t½ = ln2/λ. Binding energy per nucleon; mass-energy E = mc². Fission; fusion; nuclear reactor.",
    "threejs3dFn": "createNucleus",
    "svgKey": "alevel-phys-nuclear",
    "landmarks": [
     "α, β, γ properties",
     "N = N₀e^{−λt}",
     "t½ = ln2/λ",
     "Activity A = λN",
     "Binding energy/nucleon",
     "E = mc²",
     "Fission/fusion"
    ],
    "examQA": [
     {
      "q": "A radioactive sample has half-life 6.0 hours. What fraction remains after 24 hours?",
      "a": "24 hours = 4 half-lives. After each half-life, ½ remains: (½)⁴ = 1/16. So 1/16 (6.25%) of the original activity remains after 24 hours."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Radioactive_decay"
   },
   {
    "id": "medical-imaging",
    "name": "Medical Imaging",
    "syllabusRef": "14",
    "section": "Nuclear & Thermal",
    "description": "X-rays: produced by deceleration of electrons (bremsstrahlung) and electron transitions; attenuation I = I₀e^{−μx}; CT scans build 3D images. Ultrasound: A-scan (depth), B-scan (image); reflection at boundaries; acoustic impedance Z = ρv; intensity reflection coefficient α = (Z₁−Z₂)²/(Z₁+Z₂)². PET: annihilation \u2192 two \u03b3-rays at 180\u00b0.",
    "svgKey": "alevel-phys-medical-imaging",
    "landmarks": [
     "X-ray attenuation I = I₀e^{−μx}",
     "CT scan",
     "Acoustic impedance Z = ρv",
     "Ultrasound A-scan/B-scan",
     "PET: γ-ray pairs at 180°",
     "MRI: Larmor frequency"
    ],
    "examQA": [
     {
      "q": "Explain why a coupling gel is used between an ultrasound probe and the skin.",
      "a": "The acoustic impedance of air (Z ≈ 400 Pa s m⁻¹) is very different from that of skin/tissue (Z ≈ 1.5×10⁶ Pa s m⁻¹). Using the reflection coefficient formula, nearly 100% of ultrasound would be reflected at an air-skin interface — none would penetrate. Coupling gel has similar impedance to skin, minimising reflection and allowing ultrasound to enter tissue efficiently."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Medical_imaging"
   },
   {
    "id": "thermal",
    "name": "Thermal Physics",
    "syllabusRef": "15",
    "section": "Nuclear & Thermal",
    "description": "Temperature scales: Kelvin T/K = θ/°C + 273. Internal energy U = sum of KE and PE of all molecules. Specific heat capacity c: Q = mcΔT. Specific latent heat L: Q = mL (no temperature change). First law of thermodynamics: ΔU = Q + W. Ideal gas: internal energy depends only on T (no intermolecular forces). Absolute zero: molecules have minimum KE (zero for ideal gas).",
    "svgKey": "alevel-phys-thermal",
    "threejs3dFn": "createHeatConduction",
    "landmarks": [
     "T/K = θ/°C + 273",
     "Q = mcΔT",
     "Q = mL",
     "ΔU = Q + W",
     "Internal energy = KE + PE",
     "Absolute zero (0 K)"
    ],
    "examQA": [
     {
      "q": "Explain, in terms of molecular motion, why temperature does not change during a change of state.",
      "a": "During a change of state (e.g. melting), energy supplied breaks the bonds/intermolecular forces between molecules rather than increasing their kinetic energy. Since temperature is a measure of the average random kinetic energy of molecules, and KE is not changing (only PE changes as molecules separate), the temperature remains constant until all bonds are broken and the change of state is complete."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Thermodynamics"
   },
   {
    "id": "ideal-gases",
    "name": "Ideal Gases",
    "syllabusRef": "16",
    "section": "Nuclear & Thermal",
    "description": "Ideal gas: molecules have negligible volume; no intermolecular forces; elastic collisions. pV = nRT (n = moles, R = 8.31 J mol⁻¹ K⁻¹) or pV = NkT (N = number of molecules, k = 1.38×10⁻²³ J K⁻¹). Pressure from molecular collisions with walls. Mean kinetic energy: ½m⟨c²⟩ = 3/2 kT. Root mean square speed. Boltzmann constant k = R/NA.",
    "svgKey": "alevel-phys-ideal-gases",
    "threejs3dFn": "createPressureParticles",
    "landmarks": [
     "pV = nRT",
     "pV = NkT",
     "½m⟨c²⟩ = 3/2 kT",
     "k = R/NA",
     "Pressure from wall collisions",
     "r.m.s. speed"
    ],
    "examQA": [
     {
      "q": "Calculate the r.m.s. speed of nitrogen molecules (M = 28 g/mol) at 300 K.",
      "a": "½m⟨c²⟩ = 3/2 kT → ⟨c²⟩ = 3kT/m = 3RT/M. M = 0.028 kg mol⁻¹. c_rms = √(3RT/M) = √(3 × 8.31 × 300 / 0.028) = √(267 107) ≈ 517 m s⁻¹."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Ideal_gas"
   },
   {
    "id": "circular-motion",
    "name": "Circular Motion",
    "syllabusRef": "17",
    "section": "Modern Physics",
    "description": "Angular velocity ω = Δθ/Δt = 2πf = 2π/T. Linear speed v = ωr. Centripetal acceleration a = v²/r = ω²r directed towards centre. Centripetal force F = mv²/r = mω²r. Not a separate force — provided by tension, gravity, friction, normal reaction. Examples: satellite orbits, banked tracks, conical pendulum.",
    "svgKey": "alevel-phys-circular-motion",
    "threejs3dFn": "createOrbitAnimation",
    "landmarks": [
     "ω = 2πf",
     "v = ωr",
     "a = v²/r (centripetal)",
     "F = mv²/r",
     "Centripetal = provided by existing force",
     "Satellite orbit",
     "Banked track"
    ],
    "examQA": [
     {
      "q": "A car rounds a circular bend of radius 50 m at 20 m/s. Calculate the centripetal acceleration and state what provides this force.",
      "a": "a = v²/r = 20²/50 = 400/50 = 8 m s⁻². The centripetal force F = ma = m × 8 N. This force is provided by friction between the car tyres and the road surface, directed towards the centre of the circular path."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Circular_motion"
   },
   {
    "id": "gravitational",
    "name": "Gravitational Fields",
    "syllabusRef": "18",
    "section": "Modern Physics",
    "description": "Gravitational field strength g = F/m (N kg⁻¹). Newton's law of gravitation: F = Gm₁m₂/r². Field strength around a point mass: g = GM/r². Gravitational potential φ = −GM/r (negative; zero at infinity). Potential energy EP = mφ = −GMm/r. Satellite orbits: GMm/r² = mv²/r → v = √(GM/r). Kepler's third law: T² ∝ r³. Escape velocity v_esc = √(2GM/r).",
    "svgKey": "alevel-phys-gravitational",
    "threejs3dFn": "createOrbitAnimation",
    "landmarks": [
     "g = GM/r²",
     "F = Gm₁m₂/r²",
     "φ = −GM/r",
     "T² ∝ r³ (Kepler)",
     "v = √(GM/r) (orbital)",
     "v_esc = √(2GM/r)",
     "Geostationary orbit"
    ],
    "examQA": [
     {
      "q": "Show that the orbital period of a satellite depends on its orbital radius (Kepler's third law).",
      "a": "Centripetal force = gravitational force: mv²/r = GMm/r² → v² = GM/r. Period T = 2πr/v → T² = 4π²r²/v² = 4π²r²/(GM/r) = 4π²r³/(GM). Therefore T² = (4π²/GM)r³, i.e. T² ∝ r³ (Kepler's third law). The constant 4π²/GM depends only on the central mass M."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Orbital_mechanics"
   },
   {
    "id": "oscillations",
    "name": "Oscillations",
    "syllabusRef": "19",
    "section": "Modern Physics",
    "description": "Simple harmonic motion (SHM): a = −ω²x. Displacement x = A cos(ωt). Velocity v = −Aω sin(ωt); vmax = Aω. Energy: total E = ½mω²A² (constant); KE and PE interchange. Period: T = 2π/ω = 2π√(m/k) for spring; T = 2π√(l/g) for pendulum. Free, damped (light/critical/heavy), forced oscillations. Resonance: driving frequency = natural frequency; amplitude maximum.",
    "threejs3dFn": "createPendulum",
    "svgKey": "alevel-phys-oscillations",
    "landmarks": [
     "a = −ω²x",
     "x = A cos(ωt)",
     "vmax = Aω",
     "T = 2π√(m/k)",
     "T = 2π√(l/g)",
     "Resonance",
     "Damping types"
    ],
    "examQA": [
     {
      "q": "A mass on a spring oscillates with amplitude 0.08 m and frequency 2.0 Hz. Calculate the maximum speed and maximum acceleration.",
      "a": "ω = 2πf = 2π × 2.0 = 4π rad s⁻¹. vmax = Aω = 0.08 × 4π = 1.005 ≈ 1.0 m s⁻¹. amax = Aω² = 0.08 × (4π)² = 0.08 × 158 = 12.6 m s⁻² ≈ 13 m s⁻²."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Simple_harmonic_motion"
   },
   {
    "id": "magnetic",
    "name": "Magnetic Fields",
    "syllabusRef": "20",
    "section": "Modern Physics",
    "description": "Magnetic flux density B (tesla). Force on a wire F = BIL sinθ. Force on a moving charge F = Bqv sinθ. Field around a long wire: B = μ₀I/2πr. Field in solenoid: B = μ₀nI. Fleming's left-hand rule (motor effect). Hall effect: V_H = BI/(ntq). Magnetic flux Φ = BA. Particles in magnetic fields: circular motion (radius r = mv/Bq).",
    "threejs3dFn": "createFieldLines('magnetic')",
    "svgKey": "alevel-phys-magnetic",
    "landmarks": [
     "F = BIL sinθ",
     "F = Bqv sinθ",
     "B = μ₀I/2πr",
     "B = μ₀nI (solenoid)",
     "Fleming's LHR",
     "Hall voltage V_H = BI/(ntq), t = thickness parallel to B",
     "r = mv/Bq (circular path)"
    ],
    "examQA": [
     {
      "q": "A proton (charge 1.6×10⁻¹⁹ C, mass 1.67×10⁻²⁷ kg) moves at 3.0×10⁶ m/s perpendicular to a magnetic field of 0.25 T. Calculate the radius of its circular path.",
      "a": "Magnetic force provides centripetal force: Bqv = mv²/r → r = mv/Bq = (1.67×10⁻²⁷ × 3.0×10⁶) / (0.25 × 1.6×10⁻¹⁹) = 5.01×10⁻²¹ / 4.0×10⁻²⁰ = 0.125 m."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Magnetic_field"
   },
   {
    "id": "em-induction",
    "name": "Electromagnetic Induction",
    "syllabusRef": "21",
    "section": "Modern Physics",
    "description": "Faraday's law: EMF = −dΦ/dt (rate of change of flux linkage NΦ). Lenz's law: induced current opposes the change causing it. Flux Φ = BA cosθ. Transformer: Vs/Vp = Ns/Np; VpIp = VsIs (ideal). Step-up and step-down transformers. Eddy currents; laminated cores reduce energy loss. Generator: rotating coil in field → sinusoidal AC output.",
    "svgKey": "alevel-phys-em-induction",
    "threejs3dFn": "createEMInduction",
    "landmarks": [
     "EMF = −dΦ/dt",
     "Lenz's law",
     "Φ = BA cosθ",
     "Transformer Vs/Vp = Ns/Np",
     "VpIp = VsIs (ideal)",
     "Eddy currents",
     "Generator principle"
    ],
    "examQA": [
     {
      "q": "State and explain Lenz's law.",
      "a": "Lenz's law states that the direction of an induced current is such as to oppose the change that caused it. When a magnet moves towards a coil, the induced current creates a magnetic field that repels the magnet (opposing the approach). This is consistent with conservation of energy: if the induced current aided the change, it would accelerate the magnet, gaining energy from nothing — violating energy conservation."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Faraday%27s_law_of_induction"
   },
   {
    "id": "ac",
    "name": "Alternating Currents",
    "syllabusRef": "22",
    "section": "Modern Physics",
    "description": "AC: sinusoidal variation. Peak values V₀, I₀. RMS values: Vrms = V₀/√2; Irms = I₀/√2. Mean power P = VrmsIrms = ½V₀I₀. Transformer efficiency. Rectification: half-wave (diode); full-wave (bridge rectifier). Smoothing with capacitor. Impedance of capacitor XC = 1/(ωC); inductor XL = ωL.",
    "svgKey": "alevel-phys-ac",
    "landmarks": [
     "Vrms = V₀/√2",
     "Irms = I₀/√2",
     "P = VrmsIrms",
     "Half-wave rectification",
     "Full-wave bridge rectifier",
     "Smoothing capacitor",
     "XC = 1/ωC"
    ],
    "examQA": [
     {
      "q": "Explain why RMS values are used for AC rather than peak values.",
      "a": "RMS (root mean square) values of AC voltage and current give the same power dissipation as equivalent DC values. For a sinusoidal AC: average power = ½I₀²R = (I₀/√2)²R = Irms²R. This means Irms is the DC current that would produce the same heating effect. Using RMS allows direct comparison between AC and DC circuits in terms of energy transfer."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Alternating_current"
   },
   {
    "id": "quantum",
    "name": "Quantum Physics",
    "syllabusRef": "23",
    "section": "Modern Physics",
    "description": "Photoelectric effect: light as photons; E = hf; work function φ; hf = φ + ½mv²max (Einstein); threshold frequency f₀ = φ/h. de Broglie wavelength: λ = h/p = h/mv. Energy levels in atoms: electrons occupy discrete levels; photon emitted/absorbed when ΔE = hf. Line spectra evidence for discrete energy levels. Wave-particle duality. Heisenberg uncertainty principle: ΔxΔp ≥ h/4π.",
    "threejs3dFn": "createOrbital('p')",
    "svgKey": "alevel-phys-quantum",
    "landmarks": [
     "E = hf",
     "Work function φ",
     "hf = φ + ½mv²max",
     "Threshold frequency f₀",
     "λ = h/p (de Broglie)",
     "Energy levels",
     "Line spectra"
    ],
    "examQA": [
     {
      "q": "Explain why increasing the intensity of light below the threshold frequency does not cause photoelectric emission.",
      "a": "The photoelectric effect requires individual photons to have enough energy to overcome the work function φ. Energy of a photon E = hf depends only on frequency, not intensity. Below the threshold frequency f₀ = φ/h, each photon has insufficient energy (hf < φ) regardless of how many photons arrive per second (intensity). Increasing intensity only increases the number of photons, not their individual energy."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Photoelectric_effect"
   },
   {
    "id": "communication",
    "name": "Communication Systems",
    "syllabusRef": "24",
    "section": "Modern Physics",
    "description": "Analogue vs digital signals. Advantages of digital: noise immunity, can be regenerated without accumulating noise, multiplexing. Sampling rate must be > 2 × highest signal frequency (Nyquist). Bit depth determines quality. AM and FM modulation. Bandwidth. Attenuation in cables: signal power loss (dB = 10 log(P₁/P₂)). Optical fibres: total internal reflection; monomode/multimode; modal and material dispersion.",
    "svgKey": "alevel-phys-communication",
    "landmarks": [
     "Analogue vs digital",
     "Nyquist sampling rate",
     "AM vs FM",
     "Attenuation dB = 10 log(P₁/P₂)",
     "Total internal reflection",
     "Optical fibre modes",
     "Signal regeneration"
    ],
    "examQA": [
     {
      "q": "State two advantages of digital signals over analogue signals in communication.",
      "a": "1. Digital signals can be regenerated: a regenerator reshapes the pulses back to clean 0s and 1s, so noise is removed — an analogue amplifier would boost the noise along with the signal, so noise does not build up over long distances. 2. Digital signals are more noise-immune: small fluctuations do not change the interpretation of 0 or 1, whereas any noise added to an analogue signal permanently corrupts the information. Digital also allows easier multiplexing and data compression."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Digital_signal"
   }
  ]
 }
};
