// Topic Visualizer content — Edexcel International GCSE.
//
// Split out of the single 1.9 MB topic-visuals.js so the loader can fetch one
// board's topic text instead of every board's. Paired with
// topic-svgs-igcse-edexcel.js, which holds this board's diagrams.
//
// 3 subjects, 29 topics. Generated — edit the content here, but keep the
// shape: { <tvKey>: { subjectName, examCode, sections, topics: [...] } }.

export const TV_IGCSE_EDEXCEL = {
 "edexcel_igcse_biology": {
  "subjectName": "Edexcel IGCSE Biology",
  "examCode": "4BI1",
  "sections": [
   "All",
   "Variety of Life",
   "Cell Biology",
   "Nutrition",
   "Physiology",
   "Coordination",
   "Genetics & Evolution",
   "Ecology"
  ],
  "topics": [
   {
    "id": "living-organisms",
    "name": "The Nature and Variety of Living Organisms",
    "syllabusRef": "B1",
    "section": "Variety of Life",
    "description": "All living organisms share seven characteristics (MRS GREN: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition). Organisms are classified into five kingdoms: animal, plant, fungus, prokaryote, and protoctist. Eukaryotic cells have a membrane-bound nucleus; prokaryotic cells do not. Viruses are non-cellular and can only reproduce inside host cells.",
    "svgKey": "ebi-living-organisms",
    "landmarks": [
     "MRS GREN (7 characteristics)",
     "Eukaryotes (nucleus present)",
     "Prokaryotes (no nucleus)",
     "Viruses (non-cellular)",
     "Animal kingdom",
     "Plant kingdom",
     "Fungi kingdom",
     "Protoctist kingdom",
     "Classification hierarchy"
    ],
    "examQA": [
     {
      "q": "State the seven characteristics of living organisms.",
      "a": "MRS GREN: Movement — organisms can move their bodies or parts; Respiration — release energy from food; Sensitivity — respond to changes in the environment; Growth — permanent increase in size/mass; Reproduction — produce offspring; Excretion — remove metabolic waste; Nutrition — obtain food/energy."
     },
     {
      "q": "State two differences between a prokaryotic and a eukaryotic cell.",
      "a": "Prokaryotic cells have no membrane-bound nucleus — DNA is circular and found free in the cytoplasm. Eukaryotic cells have a true nucleus enclosed by a nuclear membrane. Prokaryotic cells are generally smaller and lack membrane-bound organelles (e.g., mitochondria); eukaryotic cells have membrane-bound organelles."
     },
     {
      "q": "Explain why viruses are not classified as living organisms.",
      "a": "Viruses do not carry out most of the seven life processes independently. They cannot respire, grow, or reproduce without a host cell — they are entirely dependent on the host's cellular machinery for replication. They have no cellular structure (no cytoplasm, no membrane-bound organelles), so they are considered non-living infectious agents."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Life"
   },
   {
    "id": "cell-organisation",
    "name": "Structures and Functions in Living Organisms",
    "syllabusRef": "B2",
    "section": "Cell Biology",
    "description": "Cells are organised into tissues (groups of similar cells), organs (groups of tissues), and organ systems. Animal cells contain a nucleus, cell membrane, cytoplasm, mitochondria, and ribosomes. Plant cells additionally have a cellulose cell wall, chloroplasts, and a large permanent vacuole. Bacterial cells are prokaryotic — they have a cell wall, cell membrane, circular DNA, ribosomes, and sometimes flagella, but no nucleus.",
    "svgKey": "ebi-cell-organisation",
    "sketchfab3dId": "7fe3ac29756a45c6b678804a8da8a760",
    "landmarks": [
     "Cell → tissue → organ → system",
     "Animal cell organelles",
     "Plant cell extras (wall/chloroplast/vacuole)",
     "Bacterial cell (circular DNA)",
     "Mitochondria (aerobic respiration)",
     "Ribosomes (protein synthesis)",
     "Osmosis/diffusion/active transport",
     "Root hair cells (large SA)"
    ],
    "examQA": [
     {
      "q": "Describe the function of mitochondria in a cell.",
      "a": "Mitochondria are the site of aerobic respiration. They produce ATP (adenosine triphosphate) — the cell's energy currency — by oxidising glucose using oxygen. Cells with high energy demands (e.g., muscle cells, sperm cells) have many mitochondria."
     },
     {
      "q": "State three features of a bacterial cell that differ from a plant cell.",
      "a": "Bacterial cells: have no membrane-bound nucleus (DNA is a circular loop in the cytoplasm); have no mitochondria or chloroplasts; have a cell wall made of murein (not cellulose); are much smaller; may have a flagellum for movement. Any three differences accepted."
     },
     {
      "q": "Explain how root hair cells are adapted for the absorption of water and mineral ions.",
      "a": "Root hair cells have a large surface area (due to the long hair-like extension) to maximise absorption rate. They have a thin cell wall and membrane for short diffusion distance. They are in direct contact with soil water. Active transport proteins in the membrane absorb mineral ions against the concentration gradient using ATP."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Cell_(biology)"
   },
   {
    "id": "nutrition",
    "name": "Nutrition",
    "syllabusRef": "B2",
    "section": "Nutrition",
    "description": "Photosynthesis converts light energy into chemical energy stored as glucose: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (using light + chlorophyll). Rate is affected by light intensity, CO₂ concentration, and temperature. Human nutrition involves ingestion, digestion (physical and chemical), absorption, and assimilation. Enzymes break down carbohydrates (amylase), proteins (protease), and lipids (lipase) along the alimentary canal.",
    "svgKey": "ebi-nutrition",
    "landmarks": [
     "Photosynthesis equation",
     "Chlorophyll",
     "Limiting factors (light/CO₂/temperature)",
     "Alimentary canal",
     "Amylase (starch → maltose)",
     "Protease (proteins → amino acids)",
     "Lipase (fats → fatty acids + glycerol)",
     "Villi (absorption)",
     "Bile (emulsification)"
    ],
    "examQA": [
     {
      "q": "Write the word equation for photosynthesis.",
      "a": "Carbon dioxide + water → glucose + oxygen. This requires light energy, which is absorbed (trapped) by the green pigment chlorophyll in the chloroplasts. The balanced symbol equation is: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂."
     },
     {
      "q": "Explain how the small intestine is adapted for absorption.",
      "a": "The inner wall has millions of villi that greatly increase surface area for absorption. Each villus has a single layer of epithelial cells (short diffusion distance). A rich capillary network removes absorbed glucose and amino acids, maintaining a steep concentration gradient. Lacteals (lymph vessels) absorb fatty acids and glycerol."
     },
     {
      "q": "Explain why the rate of photosynthesis does not increase indefinitely as light intensity increases.",
      "a": "At low light intensity, light is the limiting factor — increasing it raises the rate. Beyond a certain light intensity, another factor becomes limiting: either CO₂ concentration (insufficient for the enzymes) or temperature (enzyme activity is limited at low temperatures). The rate levels off and cannot increase until the limiting factor is changed."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Photosynthesis"
   },
   {
    "id": "respiration",
    "name": "Respiration",
    "syllabusRef": "B2",
    "section": "Physiology",
    "description": "Respiration releases chemical energy from glucose as ATP. Aerobic respiration uses oxygen: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy. It occurs in mitochondria and produces maximum ATP. Anaerobic respiration occurs without oxygen — in animals produces lactic acid (causing oxygen debt and muscle fatigue); in yeast produces ethanol + CO₂ (fermentation). Anaerobic releases much less ATP.",
    "svgKey": "ebi-respiration",
    "sketchfab3dId": "7445a425050e49daa881070ca6917a91",
    "landmarks": [
     "Aerobic equation (glucose + O₂ → CO₂ + H₂O)",
     "ATP (energy currency)",
     "Mitochondria",
     "Anaerobic (lactic acid in animals)",
     "Anaerobic (ethanol + CO₂ in yeast)",
     "Oxygen debt",
     "Fermentation",
     "Glycolysis (cytoplasm)"
    ],
    "examQA": [
     {
      "q": "Write the word equation for aerobic respiration.",
      "a": "Glucose + oxygen → carbon dioxide + water (+ energy released as ATP). The balanced symbol equation is: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O. This process occurs in the mitochondria and releases much more ATP than anaerobic respiration."
     },
     {
      "q": "Describe what happens in the muscles during vigorous exercise when oxygen supply is insufficient.",
      "a": "The muscles respire anaerobically — glucose is broken down without oxygen. Lactic acid is produced as the end product. Less ATP is produced than aerobic respiration. Lactic acid accumulates, causing muscle fatigue and pain. After exercise, extra oxygen is used to oxidise lactic acid — this is the oxygen debt."
     },
     {
      "q": "Describe how yeast is used in bread-making and explain the role of anaerobic respiration.",
      "a": "Yeast is added to bread dough with sugar. Yeast respires anaerobically (fermentation): glucose → ethanol + carbon dioxide. The CO₂ gas bubbles cause the dough to rise — creating a light, airy texture. During baking, the ethanol evaporates and the yeast is killed. The reaction is: glucose → ethanol + carbon dioxide."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Cellular_respiration"
   },
   {
    "id": "gas-exchange",
    "name": "Gas Exchange",
    "syllabusRef": "B2",
    "section": "Physiology",
    "description": "Gas exchange occurs across thin, moist, permeable surfaces with a large surface area and a maintained concentration gradient. In plants, CO₂ and O₂ diffuse through stomata in leaves; spongy mesophyll provides large internal surface area. In humans, the lungs contain alveoli — tiny air sacs with a single-cell-thick wall, rich capillary network, moist surface, and large total surface area for efficient O₂/CO₂ exchange.",
    "svgKey": "ebi-gas-exchange",
    "threejs3dFn": "createDiffusionAnimation",
    "landmarks": [
     "Stomata (gas entry/exit in plants)",
     "Guard cells (open/close stomata)",
     "Spongy mesophyll",
     "Alveoli",
     "Capillary network",
     "Thin epithelium (1 cell thick)",
     "Moist surface",
     "Concentration gradient maintenance",
     "Ventilation (breathing in/out)"
    ],
    "examQA": [
     {
      "q": "Describe four features of alveoli that make them efficient for gas exchange.",
      "a": "1. Very large total surface area (millions of alveoli) — maximises diffusion rate. 2. Walls are one cell thick — short diffusion distance for gases. 3. Moist surface — gases dissolve before diffusing. 4. Rich capillary network — constantly removes O₂ and delivers CO₂, maintaining steep concentration gradient."
     },
     {
      "q": "Describe how breathing in (inspiration) is brought about.",
      "a": "The diaphragm contracts and flattens. The external intercostal muscles contract, pulling the ribcage up and outwards. The volume of the thorax increases. Pressure in the lungs falls below atmospheric pressure. Air rushes in down the pressure gradient, inflating the lungs."
     },
     {
      "q": "Explain how stomata help regulate water loss while allowing gas exchange in plants.",
      "a": "Stomata open during the day for gas exchange (CO₂ in for photosynthesis, O₂ out). Guard cells control stomatal opening — they become turgid (gain water by osmosis) when conditions are favourable, causing pores to open. In dry conditions or darkness, guard cells lose water, become flaccid, and stomata close to reduce transpiration and water loss."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Gas_exchange"
   },
   {
    "id": "transport",
    "name": "Transport in Organisms",
    "syllabusRef": "B2",
    "section": "Physiology",
    "description": "Plants have xylem (water + mineral ions, root → leaves, transpiration stream, dead cells, lignified walls) and phloem (dissolved sugars, translocation, living sieve tubes). Humans have a double circulatory system: pulmonary (heart → lungs → heart) and systemic (heart → body → heart). Blood contains red blood cells (haemoglobin for O₂), white blood cells (defence), platelets (clotting), and plasma (transport medium).",
    "svgKey": "ebi-transport",
    "landmarks": [
     "Xylem (water + minerals)",
     "Phloem (sugars, translocation)",
     "Transpiration stream",
     "Double circulation",
     "Heart chambers (4)",
     "Arteries (thick walls)",
     "Veins (valves)",
     "Capillaries (exchange)",
     "Haemoglobin → oxyhaemoglobin"
    ],
    "examQA": [
     {
      "q": "Describe the differences between xylem and phloem vessels.",
      "a": "Xylem: dead cells with no end walls, lignified walls, transport water and mineral ions upward only, driven by transpiration pull. Phloem: living cells (sieve tubes + companion cells), transport dissolved sugars up AND down, process called translocation, not lignified."
     },
     {
      "q": "Explain why the left ventricle wall is thicker than the right ventricle wall.",
      "a": "The left ventricle pumps blood to the whole body (systemic circulation) — a much longer, higher-resistance circuit requiring high pressure. The right ventricle only pumps blood to the lungs (pulmonary circulation) — a short, low-resistance circuit. Greater muscle mass in the left ventricle generates the higher pressure needed."
     },
     {
      "q": "Describe how red blood cells are adapted for carrying oxygen.",
      "a": "Biconcave disc shape provides large surface area:volume ratio for maximum diffusion of O₂. No nucleus — more space for haemoglobin molecules. Haemoglobin binds reversibly to O₂ to form oxyhaemoglobin at high O₂ concentrations (lungs), releasing it at low concentrations (respiring tissues). Small, flexible cells squeeze through narrow capillaries."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Circulatory_system"
   },
   {
    "id": "excretion",
    "name": "Excretion",
    "syllabusRef": "B2",
    "section": "Physiology",
    "description": "Excretion is the removal of metabolic waste products from the body. The kidneys filter blood to remove urea (from amino acid breakdown in the liver), excess water, and excess salts as urine. The lungs excrete CO₂ produced in respiration. The skin excretes small amounts of urea in sweat. Kidneys regulate blood composition by ultrafiltration (high pressure forces small molecules out) and selective reabsorption (glucose, most water, and salts are reabsorbed).",
    "svgKey": "ebi-excretion",
    "landmarks": [
     "Urea (from deamination of amino acids)",
     "Nephron (functional unit of kidney)",
     "Glomerulus (ultrafiltration)",
     "Bowman's capsule",
     "Selective reabsorption (glucose/water)",
     "Loop of Henle (concentration)",
     "ADH (water reabsorption)",
     "Ureter/bladder/urethra",
     "CO₂ excreted by lungs"
    ],
    "examQA": [
     {
      "q": "State what is meant by excretion and give two examples of excretory products.",
      "a": "Excretion is the removal of the waste products of metabolism from the body. Examples: urea — produced in the liver by deamination of excess amino acids, excreted in urine by the kidneys; carbon dioxide — produced in cellular respiration, excreted through the lungs during breathing out."
     },
     {
      "q": "Describe how the kidneys produce urine.",
      "a": "Blood enters the glomerulus at high pressure — small molecules (water, glucose, urea, salts) are forced through the capillary walls into the Bowman's capsule — this is ultrafiltration. As the filtrate passes through the nephron tubules, all glucose and most water and useful salts are selectively reabsorbed back into the blood. The remaining fluid (water, urea, excess salts) collects in the collecting duct and flows to the bladder as urine."
     },
     {
      "q": "Explain how ADH controls the water content of blood.",
      "a": "When blood water potential falls (blood too concentrated), the hypothalamus detects this and the pituitary gland releases ADH. ADH makes the collecting duct and distal tubule more permeable to water. More water is reabsorbed back into the blood by osmosis. Less, more concentrated urine is produced. Blood water potential rises — negative feedback reduces ADH secretion."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Excretion"
   },
   {
    "id": "reproduction",
    "name": "Reproduction",
    "syllabusRef": "B3",
    "section": "Physiology",
    "description": "Sexual reproduction involves the fusion of two gametes (egg + sperm), producing genetic variation. In plants, pollination transfers pollen; fertilisation forms seeds inside fruits. Asexual reproduction uses mitosis to produce genetically identical offspring (clones) from one parent — faster but no variation. Mitosis produces two genetically identical daughter cells for growth and repair; meiosis produces four genetically varied haploid gametes. Hormones (FSH, LH, oestrogen, progesterone) regulate the human menstrual cycle.",
    "svgKey": "ebi-reproduction",
    "threejs3dFn": "createCellDivision",
    "landmarks": [
     "Mitosis (2 identical cells, growth/repair)",
     "Meiosis (4 gametes, haploid)",
     "Fertilisation (zygote)",
     "Pollination (wind/insect)",
     "Seed dispersal",
     "Asexual (clones)",
     "FSH/LH/oestrogen/progesterone",
     "Menstrual cycle",
     "In vitro fertilisation (IVF)"
    ],
    "examQA": [
     {
      "q": "Compare sexual and asexual reproduction in terms of genetic variation and speed.",
      "a": "Sexual reproduction: involves two parents and fusion of gametes; produces genetically varied offspring (new combinations of alleles through meiosis and fertilisation); slower due to need to find a mate; produces fewer offspring. Asexual reproduction: one parent, mitosis only; all offspring genetically identical (clones); faster; can produce many offspring quickly."
     },
     {
      "q": "Explain why meiosis is important for sexual reproduction.",
      "a": "Meiosis halves the chromosome number to produce haploid gametes. This is essential because when two gametes fuse at fertilisation, the diploid chromosome number is restored. Without meiosis, chromosome number would double each generation. Meiosis also creates genetic variation through independent assortment and crossing over."
     },
     {
      "q": "Describe the role of FSH and LH in the menstrual cycle.",
      "a": "FSH (follicle-stimulating hormone) is secreted by the pituitary gland — it stimulates the development of a follicle in the ovary and causes the follicle to produce oestrogen. LH (luteinising hormone) surges at mid-cycle, triggering ovulation (release of the egg from the follicle). After ovulation, LH maintains the corpus luteum, which produces progesterone to maintain the uterus lining."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Reproduction"
   },
   {
    "id": "nervous-hormones",
    "name": "Nervous System and Hormones",
    "syllabusRef": "B2",
    "section": "Coordination",
    "description": "The nervous system coordinates rapid responses via electrical impulses. Receptors detect stimuli; sensory neurons carry impulses to the CNS; motor neurons carry impulses to effectors. Synapses transmit signals between neurons using neurotransmitters. Reflex arcs bypass the brain for fast, involuntary protective responses. The endocrine system uses hormones (chemical messengers in blood) for slower, longer-lasting responses. Key hormones: insulin (blood glucose), adrenaline (fight-or-flight), sex hormones.",
    "svgKey": "ebi-nervous-system",
    "threejs3dFn": "createNerveImpulse",
    "landmarks": [
     "Neuron (sensory/relay/motor)",
     "Reflex arc",
     "Synapse (neurotransmitter)",
     "CNS (brain + spinal cord)",
     "Receptor → effector",
     "Hormone (gland → blood → target)",
     "Insulin (β-cells, pancreas)",
     "Adrenaline (adrenal glands)",
     "Negative feedback"
    ],
    "examQA": [
     {
      "q": "Describe how a nerve impulse passes across a synapse.",
      "a": "The nerve impulse arrives at the pre-synaptic knob. Vesicles containing neurotransmitter molecules fuse with the pre-synaptic membrane and release neurotransmitters into the synaptic cleft. Neurotransmitters diffuse across the cleft and bind to receptor proteins on the post-synaptic membrane. This generates a new nerve impulse in the post-synaptic neuron. Neurotransmitters are then broken down by enzymes or reabsorbed."
     },
     {
      "q": "Explain the advantage of a reflex arc bypassing the brain.",
      "a": "In a reflex arc, the signal travels only to the spinal cord (relay neuron) and back — not to the brain. This makes the response extremely fast because the pathway is shorter and fewer synapses are involved. Speed is vital for protective reflexes (e.g., withdrawing from pain, blinking) — any delay could cause serious injury. The brain becomes aware of the reflex after it has occurred."
     },
     {
      "q": "Compare nervous and hormonal coordination.",
      "a": "Nervous: electrical impulses, very fast (milliseconds), short-lived response, precise target (specific effector). Hormonal: chemical messengers in blood, slower (seconds to minutes), longer-lasting response, affects all target cells with the receptor (widespread effect). Nervous for immediate responses (e.g., reflex); hormonal for sustained changes (e.g., puberty, blood glucose regulation)."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Nervous_system"
   },
   {
    "id": "homeostasis",
    "name": "Homeostasis",
    "syllabusRef": "B2",
    "section": "Coordination",
    "description": "Homeostasis maintains a constant internal environment despite external changes. Body temperature is regulated at 37°C: if too hot, blood vessels vasodilate and sweating increases to cool down; if too cold, shivering and vasoconstriction warm the body. Blood glucose is regulated by insulin (secreted by β-cells of the pancreas when glucose rises — promotes uptake and glycogen storage) and glucagon (when glucose falls — promotes glycogen breakdown). Both operate via negative feedback.",
    "svgKey": "ebi-homeostasis",
    "landmarks": [
     "Negative feedback",
     "Thermoregulation (37°C)",
     "Vasodilation (cooling)",
     "Vasoconstriction (warming)",
     "Sweating",
     "Shivering",
     "Insulin (lowers blood glucose)",
     "Glucagon (raises blood glucose)",
     "Glycogen (storage in liver/muscle)"
    ],
    "examQA": [
     {
      "q": "Explain how the body reduces its temperature when it gets too hot.",
      "a": "The hypothalamus detects a rise in blood temperature. It sends nerve impulses to the skin: sweat glands increase sweat production — evaporation of sweat removes latent heat from the skin. Arterioles in the skin vasodilate (widen) — more blood flows near the surface, increasing heat loss by radiation. Hairs lie flat (no trapped air insulation). This is negative feedback — the response reduces the initial change."
     },
     {
      "q": "Describe how blood glucose concentration is regulated after a meal.",
      "a": "A meal raises blood glucose. The pancreas (β-cells of the islets of Langerhans) detects this and secretes insulin into the blood. Insulin causes body cells (especially liver and muscle) to take up more glucose. In the liver, excess glucose is converted to glycogen for storage (glycogenesis). As blood glucose returns to normal, insulin secretion decreases — negative feedback. Blood glucose falls back to the set point."
     },
     {
      "q": "Explain what happens to a person with Type 1 diabetes if they do not receive insulin injections.",
      "a": "In Type 1 diabetes, the β-cells of the pancreas are destroyed (autoimmune) and no insulin is produced. Without insulin, cells cannot take up glucose efficiently. Blood glucose remains very high after meals. Excess glucose is excreted in urine. Cells are starved of glucose for energy and begin breaking down fats and proteins instead, which can be dangerous. Without insulin injections, blood glucose would reach fatally high levels."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Homeostasis"
   },
   {
    "id": "genetics-inheritance",
    "name": "Genetics and Inheritance",
    "syllabusRef": "B3",
    "section": "Genetics & Evolution",
    "description": "Chromosomes carry genes; genes are specific sequences of DNA bases that code for proteins. Alleles are alternative versions of a gene. Dominant alleles are expressed even when only one copy is present; recessive alleles are only expressed when homozygous. Punnett squares predict offspring ratios. Sex is determined by X and Y chromosomes: females XX, males XY. Some traits are sex-linked (e.g., colour blindness, haemophilia — carried on X chromosome).",
    "svgKey": "ebi-genetics",
    "sketchfab3dId": "224d09f75a674f4a8107e79e3d3d5552",
    "landmarks": [
     "Gene (section of DNA)",
     "Allele (dominant/recessive)",
     "Homozygous/heterozygous",
     "Genotype/phenotype",
     "Punnett square",
     "Monohybrid cross",
     "Co-dominance",
     "Sex chromosomes (XX/XY)",
     "Sex-linked traits (X-linked)"
    ],
    "examQA": [
     {
      "q": "Define the terms genotype, phenotype, and allele.",
      "a": "Allele: one of two or more alternative forms of a gene occupying the same locus on homologous chromosomes. Genotype: the genetic make-up of an organism — the specific alleles it carries (e.g., Tt). Phenotype: the observable characteristics of an organism resulting from the interaction of its genotype with the environment (e.g., tall)."
     },
     {
      "q": "Cystic fibrosis (CF) is caused by a recessive allele (f). A carrier mother (Ff) and a carrier father (Ff) have children. Predict the probability of a child having CF.",
      "a": "Cross: Ff × Ff. Gametes: F or f from each parent. Punnett square: FF, Ff, Ff, ff. 1 in 4 (25%) chance of ff (having CF). 2 in 4 (50%) chance of Ff (carrier). 1 in 4 (25%) chance of FF (unaffected, non-carrier). Ratio: 3 unaffected : 1 affected."
     },
     {
      "q": "Explain why colour blindness is more common in males than females.",
      "a": "Colour blindness is caused by a recessive allele on the X chromosome (X-linked). Males (XY) only have one X chromosome — if it carries the recessive allele (X^b Y), they are colour blind. Females (XX) need two copies of the recessive allele (X^b X^b) to be colour blind, which is much less likely. A female with one recessive allele (X^B X^b) is a carrier but has normal colour vision."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Genetics"
   },
   {
    "id": "variation-selection",
    "name": "Variation and Evolution",
    "syllabusRef": "B3",
    "section": "Genetics & Evolution",
    "description": "Variation can be continuous (measured on a scale, e.g., height — shows normal distribution) or discontinuous (distinct categories, e.g., blood group). Causes include genetic (mutations, sexual reproduction mixing alleles) and environmental factors. Natural selection: organisms produce more offspring than survive; those with beneficial variations are more likely to survive and reproduce, passing on advantageous alleles. Over generations, allele frequencies change — evolution. Mutations are the source of new alleles.",
    "svgKey": "ebi-variation",
    "landmarks": [
     "Continuous variation (bell curve)",
     "Discontinuous variation",
     "Mutation (new alleles)",
     "Natural selection",
     "Survival of the fittest",
     "Antibiotic resistance (example)",
     "Evolution",
     "Speciation",
     "Artificial selection"
    ],
    "examQA": [
     {
      "q": "Describe the process of natural selection using antibiotic resistance as an example.",
      "a": "In a bacterial population there is genetic variation. Random mutations cause some bacteria to be resistant to an antibiotic. When the antibiotic is used, non-resistant bacteria die. Resistant bacteria survive and reproduce rapidly (no competition, more resources). They pass resistance alleles to offspring. Over generations, resistant bacteria come to dominate the population — natural selection has increased the frequency of the resistance allele."
     },
     {
      "q": "State two differences between continuous and discontinuous variation. Give one example of each.",
      "a": "Continuous variation: shows a range of values with no distinct categories; controlled by multiple genes and the environment; forms a normal distribution. Example: height. Discontinuous variation: falls into distinct categories; usually controlled by one gene; not significantly affected by the environment. Example: ABO blood group (A, B, AB, or O only)."
     },
     {
      "q": "Explain how mutations provide the raw material for natural selection.",
      "a": "Mutations are random changes in the DNA base sequence. They can create new alleles — new versions of genes that may code for different proteins. Most mutations are neutral or harmful, but occasionally a mutation produces an advantage (e.g., better camouflage, antibiotic resistance in bacteria). Natural selection acts on this new heritable variation — beneficial alleles spread through the population over generations. Without mutation, there would be no new alleles for natural selection to act on."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Natural_selection"
   },
   {
    "id": "ecology",
    "name": "Ecology and the Environment",
    "syllabusRef": "B4",
    "section": "Ecology",
    "description": "An ecosystem includes all organisms in an area plus abiotic factors. Producers (plants) convert light energy into biomass; consumers eat other organisms. Energy is lost at each trophic level (respiration, heat, faeces) — only ~10% transfers to the next level. The carbon cycle involves photosynthesis, respiration, decomposition, and combustion. The nitrogen cycle involves nitrogen-fixing bacteria, nitrifying bacteria, and denitrifying bacteria. Human impacts: deforestation, pollution, eutrophication, global warming.",
    "svgKey": "ebi-ecology",
    "landmarks": [
     "Producer → primary consumer → secondary consumer",
     "Energy loss (respiration/heat)",
     "10% energy transfer rule",
     "Carbon cycle (photosynthesis/respiration/combustion)",
     "Nitrogen cycle (fixing/nitrifying/denitrifying bacteria)",
     "Eutrophication (fertiliser runoff)",
     "Deforestation effects",
     "Greenhouse effect",
     "Conservation"
    ],
    "examQA": [
     {
      "q": "Explain why food chains rarely have more than four trophic levels.",
      "a": "Energy is lost at every trophic level — only about 10% of energy at one level is transferred to biomass at the next. Energy is lost through heat from respiration, movement, maintaining body temperature (in endotherms), and through undigested material in faeces. After four trophic levels so little energy remains that supporting another level of organisms would be unsustainable."
     },
     {
      "q": "Describe how nitrates are made available to plants in the nitrogen cycle.",
      "a": "Nitrogen-fixing bacteria (e.g., Rhizobium in root nodules) convert atmospheric N₂ into ammonium compounds in the soil. Nitrifying bacteria convert ammonium compounds to nitrites (Nitrosomonas) and then nitrates (Nitrobacter). Plants absorb nitrates through root hair cells by active transport. Decomposers break down dead organisms and excretory products, releasing ammonium compounds back into the soil — completing the cycle."
     },
     {
      "q": "Describe how eutrophication leads to the death of fish in a lake.",
      "a": "Fertilisers (nitrates/phosphates) leach from farmland into the lake. Algae grow rapidly — forming a dense algal bloom that blocks sunlight. Aquatic plants below die as they cannot photosynthesise. Bacteria decompose the dead plants and algae, multiplying rapidly. Aerobic bacteria use up all dissolved oxygen in the water (biological oxygen demand increases). Fish and other aerobic organisms die due to lack of oxygen."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Ecosystem"
   },
   {
    "id": "biological-resources",
    "name": "Use of Biological Resources",
    "syllabusRef": "B5",
    "section": "Ecology",
    "description": "Selective breeding (artificial selection) improves crop yields and animal products by selecting individuals with desirable traits over many generations. Microorganisms are used in food production (bread/yogurt/cheese/beer via fermentation). Industrial fermenters maintain optimal conditions (temperature, pH, nutrient supply) for microorganism growth. Genetic engineering inserts specific genes into organisms to produce useful proteins (e.g., human insulin from bacteria). Gene therapy may one day treat genetic disorders.",
    "svgKey": "ebi-biological-resources",
    "landmarks": [
     "Selective breeding (generations)",
     "Crop improvement (yield/disease-resistance)",
     "Yeast (fermentation → bread/beer)",
     "Lactobacillus (yogurt)",
     "Industrial fermenter (conditions)",
     "Genetic engineering (restriction enzymes/ligase)",
     "Insulin production (E. coli)",
     "Gene therapy",
     "Cloning (plants/animals)"
    ],
    "examQA": [
     {
      "q": "Describe how selective breeding could be used to increase the milk yield of a dairy herd.",
      "a": "Identify cows with the highest milk yield and bulls from high-yield cows. Allow only these selected individuals to breed together. From their offspring, again select those with the highest milk yield. Repeat over many generations — each generation the average milk yield increases as the alleles for high milk production become more common in the population. This is artificial selection."
     },
     {
      "q": "Describe the conditions maintained in an industrial fermenter and explain why each is important.",
      "a": "Temperature: kept at optimum for enzymes (typically 25-37°C) — too high denatures enzymes reducing yield; too low slows enzyme reactions. pH: kept constant — extremes affect enzyme active site shape. Sterile conditions: prevent contaminating microorganism growth. Nutrient supply (glucose, minerals): ensures maximum growth rate. Stirring/agitation: ensures even distribution of nutrients and oxygen. Cooling jacket: removes excess heat from respiration."
     },
     {
      "q": "Outline how genetic engineering is used to produce human insulin.",
      "a": "1. The human insulin gene is identified and cut out of a chromosome using restriction enzymes. 2. The same restriction enzyme cuts open a bacterial plasmid — both have complementary sticky ends. 3. The insulin gene is inserted into the plasmid using DNA ligase — a recombinant plasmid is formed. 4. The plasmid is inserted into a bacterium (e.g., E. coli). 5. The bacterium is cultured on a large scale in fermenters — it produces human insulin. 6. Insulin is extracted, purified, and used to treat Type 1 diabetes."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Genetic_engineering"
   }
  ]
 },
 "edexcel_igcse_chemistry": {
  "subjectName": "Edexcel IGCSE Chemistry",
  "examCode": "4CH1",
  "sections": [
   "All",
   "Principles",
   "Inorganic",
   "Physical",
   "Organic",
   "Applied"
  ],
  "topics": [
   {
    "id": "principles",
    "name": "Principles of Chemistry",
    "syllabusRef": "C1",
    "section": "Principles",
    "description": "Matter exists in three states. Atoms contain protons, neutrons, and electrons. Atomic number = number of protons; mass number = protons + neutrons. Isotopes share atomic number but differ in mass number. Ionic bonding transfers electrons between metals and non-metals; covalent bonding shares electrons between non-metals; metallic bonding involves delocalised electrons. Relative atomic mass and the mole (6.02×10²³) are used for quantitative calculations. Balanced equations must conserve mass.",
    "svgKey": "ech-principles",
    "threejs3dFn": "createAtomModel",
    "landmarks": [
     "Atomic number (protons)",
     "Mass number (protons + neutrons)",
     "Isotopes (same element, different mass)",
     "Ionic bond (electron transfer)",
     "Covalent bond (shared electrons)",
     "Metallic bond (delocalised e⁻)",
     "Mole (6.02×10²³)",
     "Relative atomic mass Ar",
     "Empirical formula"
    ],
    "examQA": [
     {
      "q": "Define the term isotope and give an example.",
      "a": "Isotopes are atoms of the same element (same number of protons/atomic number) with different numbers of neutrons (different mass numbers). They have identical chemical properties but different physical properties. Example: carbon-12 (⁶¹²C, 6 protons + 6 neutrons) and carbon-14 (⁶¹⁴C, 6 protons + 8 neutrons)."
     },
     {
      "q": "Describe ionic bonding between magnesium and oxygen.",
      "a": "Magnesium (2,8,2) loses 2 outer electrons to form Mg²⁺ (2,8). Oxygen (2,6) gains 2 electrons to form O²⁻ (2,8). Both achieve stable noble gas electronic configurations. Strong electrostatic attraction between the oppositely charged Mg²⁺ and O²⁻ ions in a giant ionic lattice — this is the ionic bond. MgO forms."
     },
     {
      "q": "Calculate the number of moles in 32 g of sulfur. (Ar: S = 32)",
      "a": "Moles = mass ÷ molar mass = 32 ÷ 32 = 1 mol of sulfur atoms. The molar mass of sulfur = 32 g/mol (equal to its relative atomic mass in g). 1 mole contains 6.02 × 10²³ sulfur atoms."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Chemical_bond"
   },
   {
    "id": "inorganic",
    "name": "Inorganic Chemistry",
    "syllabusRef": "C2",
    "section": "Inorganic",
    "description": "The Periodic Table arranges elements by atomic number. Groups contain elements with similar properties (same outer electron configuration). Group 1 (alkali metals) react vigorously with water; reactivity increases down the group. Group 7 (halogens) gain electrons; reactivity decreases down the group. Transition metals are dense, hard, high melting point, form coloured compounds and can act as catalysts. The reactivity series orders metals by reactivity; more reactive metals displace less reactive ones.",
    "svgKey": "ech-inorganic",
    "landmarks": [
     "Periodic table (groups/periods)",
     "Group 1 (alkali metals, reactivity↑ down)",
     "Group 7 (halogens, reactivity↓ down)",
     "Group 0 (noble gases, full outer shell)",
     "Transition metals (catalysts/coloured compounds)",
     "Reactivity series",
     "Displacement reactions",
     "Rusting (O₂ + H₂O)",
     "Alloys"
    ],
    "examQA": [
     {
      "q": "Explain why reactivity increases down Group 1 (alkali metals).",
      "a": "Moving down Group 1, each element has more electron shells. The outer electron is further from the nucleus and is more shielded by inner electrons (increased shielding). The attractive force of the nucleus on the outer electron is weaker. The outer electron is more easily lost (lower ionisation energy). Since alkali metals react by losing one electron, they become more reactive going down the group."
     },
     {
      "q": "Describe what happens when chlorine water is added to potassium bromide solution.",
      "a": "Chlorine is more reactive than bromine (higher in Group 7). Chlorine displaces bromine from the solution: Cl₂ + 2KBr → 2KCl + Br₂. The solution turns orange/brown as bromine is produced. This is a halogen displacement reaction — a more reactive halogen displaces a less reactive one from its salt solution."
     },
     {
      "q": "State three typical properties of transition metals and give an example of each.",
      "a": "High melting points — iron melts at 1538°C; used in furnaces. High density — tungsten is very dense. Can act as catalysts — iron catalyst in Haber process; nickel in hydrogenation. Form coloured compounds — copper sulfate is blue; iron(III) chloride is orange/brown. Variable oxidation states — iron forms Fe²⁺ and Fe³⁺. Any three with examples."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Periodic_table"
   },
   {
    "id": "physical-chemistry",
    "name": "Physical Chemistry",
    "syllabusRef": "C3",
    "section": "Physical",
    "description": "Exothermic reactions release heat (ΔH < 0); endothermic reactions absorb heat (ΔH > 0). Bond breaking requires energy; bond making releases energy. The activation energy (Ea) is the minimum energy needed for a reaction. Reaction rate increases with temperature, concentration, surface area, and catalysts. Catalysts provide an alternative pathway with lower Ea. Reversible reactions reach dynamic equilibrium when forward and reverse rates are equal. Le Chatelier's principle predicts equilibrium shifts.",
    "svgKey": "ech-physical",
    "threejs3dFn": "createCollisionAnimation",
    "landmarks": [
     "Exothermic (ΔH < 0, temp rises)",
     "Endothermic (ΔH > 0, temp falls)",
     "Activation energy (Ea)",
     "Bond breaking (endothermic)",
     "Bond making (exothermic)",
     "Collision theory",
     "Catalyst (lowers Ea)",
     "Reversible reaction (⇌)",
     "Le Chatelier's principle"
    ],
    "examQA": [
     {
      "q": "Explain in terms of bonds why the reaction H₂ + Cl₂ → 2HCl is exothermic.",
      "a": "Energy is needed to break the H−H bond and the Cl−Cl bond (endothermic). Energy is released when two H−Cl bonds form (exothermic). The energy released in forming H−Cl bonds is greater than the energy required to break H−H and Cl−Cl bonds. Net result: more energy is released than absorbed → the reaction is exothermic (ΔH < 0)."
     },
     {
      "q": "Explain why increasing temperature increases reaction rate using collision theory.",
      "a": "At higher temperatures, reactant particles have more kinetic energy — they move faster. This increases the frequency of collisions between reactant particles. More importantly, a higher proportion of collisions have energy ≥ the activation energy. Both effects mean more successful collisions per second, so the reaction rate increases."
     },
     {
      "q": "State Le Chatelier's principle and use it to predict the effect of increasing pressure on the equilibrium: N₂ + 3H₂ ⇌ 2NH₃.",
      "a": "Le Chatelier's principle: when a system in equilibrium is subjected to a change, it shifts to oppose that change. Increasing pressure favours the side with fewer moles of gas. Left side: 1 + 3 = 4 moles. Right side: 2 moles. Increasing pressure shifts the equilibrium to the right → more NH₃ produced. This is why the Haber process uses high pressure."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Chemical_equilibrium"
   },
   {
    "id": "organic",
    "name": "Organic Chemistry",
    "syllabusRef": "C4",
    "section": "Organic",
    "description": "Organic compounds contain carbon. Homologous series share a general formula and have similar chemical properties. Alkanes (CₙH₂ₙ₊₂, saturated) undergo combustion and substitution. Alkenes (CₙH₂ₙ, unsaturated, C=C double bond) undergo addition reactions (with Br₂, H₂, H₂O). Alcohols (–OH) are produced by fermentation or hydration of alkenes. Carboxylic acids (–COOH) react with alcohols to form esters. Addition polymerisation links alkene monomers; condensation polymerisation (e.g., nylon, polyester) releases water.",
    "svgKey": "ech-organic",
    "threejs3dFn": "createMolecule('methane')",
    "landmarks": [
     "Alkanes (saturated, C-C single bonds)",
     "Alkenes (unsaturated, C=C)",
     "Bromine water test (alkene decolourises)",
     "Combustion (complete/incomplete)",
     "Addition reactions of alkenes",
     "Alcohols (fermentation/hydration)",
     "Carboxylic acids + alcohols → esters",
     "Addition polymerisation",
     "Condensation polymerisation (nylon/polyester)"
    ],
    "examQA": [
     {
      "q": "Describe a chemical test to distinguish hexane from hexene. State the result for each.",
      "a": "Add bromine water (orange) to each substance. Hexane (alkane, saturated): no reaction — bromine water stays orange. Hexene (alkene, unsaturated): immediate decolourisation — bromine adds across the C=C double bond (addition reaction), forming a colourless dibromoalkane. This confirms the presence of a C=C double bond."
     },
     {
      "q": "Describe the conditions for producing ethanol by the fermentation of glucose.",
      "a": "Glucose solution + yeast enzyme (zymase); temperature around 30-40°C (optimum for enzyme activity); anaerobic conditions (no oxygen — oxygen inhibits fermentation); slightly acidic pH. Reaction: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. The ethanol is then separated by fractional distillation."
     },
     {
      "q": "Explain what is meant by addition polymerisation and give one example.",
      "a": "Addition polymerisation joins together many small monomer molecules that contain a C=C double bond. The double bond opens and the monomers link together in a long chain — no atoms are lost (no by-product). Example: ethene monomers (CH₂=CH₂) polymerise to form poly(ethene): n(CH₂=CH₂) → −(CH₂−CH₂)ₙ−. Other examples: poly(propene) from propene, PVC from chloroethene."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Organic_chemistry"
   },
   {
    "id": "acids-bases-salts",
    "name": "Acids, Bases and Salts",
    "syllabusRef": "C2",
    "section": "Applied",
    "description": "Acids release H⁺ ions in solution (pH < 7); bases accept H⁺ ions. Alkalis are soluble bases (pH > 7). Neutralisation: acid + base → salt + water. Salts are prepared by reacting acids with metals, metal oxides, hydroxides, or carbonates. Strong acids (HCl, H₂SO₄, HNO₃) fully dissociate; weak acids (CH₃COOH) partially dissociate. Titration determines the exact volume of acid/alkali for neutralisation. The pH scale (0–14) measures H⁺ concentration.",
    "svgKey": "ech-acids-bases",
    "threejs3dFn": "createReactionAnimation",
    "landmarks": [
     "pH scale (0-14)",
     "Acid (H⁺, pH < 7)",
     "Alkali (OH⁻, pH > 7)",
     "Neutralisation (salt + water)",
     "Strong acid (fully dissociates)",
     "Weak acid (partially dissociates)",
     "Titration",
     "Universal indicator",
     "Salt preparation methods"
    ],
    "examQA": [
     {
      "q": "Describe how to prepare a pure dry sample of zinc sulfate crystals.",
      "a": "1. Add excess zinc carbonate (or zinc/zinc oxide) to warm dilute sulfuric acid in a beaker — stir until no more reacts (excess solid ensures all acid reacts). 2. Filter off excess solid. 3. Gently heat the filtrate to evaporate most of the water — concentrate the solution. 4. Leave to cool and allow crystals to form. 5. Filter and pat dry between filter paper. Reaction: ZnCO₃ + H₂SO₄ → ZnSO₄ + H₂O + CO₂."
     },
     {
      "q": "Explain the difference between a strong acid and a weak acid with the same concentration.",
      "a": "A strong acid (e.g., HCl) is fully (completely) dissociated into ions in solution: HCl → H⁺ + Cl⁻. A weak acid (e.g., ethanoic acid) is only partially dissociated — an equilibrium exists: CH₃COOH ⇌ CH₃COO⁻ + H⁺. At the same concentration, strong acid has a much higher [H⁺] (lower pH), reacts faster with metals, and fully neutralises a base. Weak acid has a higher pH and reacts more slowly."
     },
     {
      "q": "Describe how to carry out an acid-alkali titration to find the concentration of sodium hydroxide.",
      "a": "Fill a burette with the acid (known concentration). Using a pipette, transfer a fixed volume of NaOH into a conical flask. Add a few drops of indicator (e.g., phenolphthalein). Slowly add acid from the burette, swirling after each addition. Stop at the endpoint (phenolphthalein: pink → colourless). Record the volume of acid used (titre). Repeat to get concordant results (within 0.1 cm³). Use n = cV to calculate moles, then find NaOH concentration."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Acid–base_reaction"
   },
   {
    "id": "electrolysis",
    "name": "Electrolysis",
    "syllabusRef": "C1",
    "section": "Applied",
    "description": "Electrolysis uses electrical energy to decompose ionic compounds. Ions in molten or aqueous electrolytes are free to move. Cations (positive) move to the cathode (negative electrode) and are reduced. Anions (negative) move to the anode (positive electrode) and are oxidised. Electrolysis of brine (NaCl solution) produces chlorine at the anode, hydrogen at the cathode, and sodium hydroxide solution. Electroplating coats a metal object with a thin layer of another metal.",
    "svgKey": "ech-electrolysis",
    "landmarks": [
     "Electrolyte (molten/aqueous)",
     "Cathode (−): reduction, cations",
     "Anode (+): oxidation, anions",
     "Electrolysis of brine (Cl₂/H₂/NaOH)",
     "Electrolysis of water (H₂/O₂)",
     "Electroplating",
     "Purification of copper",
     "Aluminium extraction (electrolysis of Al₂O₃)"
    ],
    "examQA": [
     {
      "q": "State the products formed at each electrode when brine (sodium chloride solution) is electrolysed.",
      "a": "Cathode (−): H⁺ ions from water are discharged — hydrogen gas (H₂) is produced: 2H⁺ + 2e⁻ → H₂. (H⁺ preferred over Na⁺). Anode (+): Cl⁻ ions are discharged — chlorine gas (Cl₂) produced: 2Cl⁻ → Cl₂ + 2e⁻. (Cl⁻ preferred over OH⁻ at high NaCl concentrations). Remaining in solution: Na⁺ and OH⁻ ions → sodium hydroxide solution (NaOH)."
     },
     {
      "q": "Explain why aluminium is extracted by electrolysis rather than by reduction with carbon.",
      "a": "Aluminium is more reactive than carbon — it cannot be reduced by carbon from its ore (Al₂O₃/bauxite). Electrolysis must be used: Al₂O₃ is dissolved in molten cryolite (to lower melting point) and electrolysed. Al³⁺ ions are reduced at the cathode: Al³⁺ + 3e⁻ → Al. Electrolysis is more expensive than using carbon (high electrical energy needed) but it is the only feasible method for very reactive metals."
     },
     {
      "q": "Describe how electroplating is used to coat a steel spoon with silver.",
      "a": "The steel spoon is the cathode (−). A block of pure silver is the anode (+). The electrolyte is a silver nitrate or silver cyanide solution. When current flows: at the anode, silver dissolves (Ag → Ag⁺ + e⁻); at the cathode, Ag⁺ ions are reduced and deposit as silver metal on the spoon (Ag⁺ + e⁻ → Ag). The anode gradually dissolves, replenishing the electrolyte. A thin, even layer of silver coats the spoon."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Electrolysis"
   },
   {
    "id": "industrial",
    "name": "Industrial Processes",
    "syllabusRef": "C3",
    "section": "Applied",
    "description": "The Haber Process manufactures ammonia from nitrogen and hydrogen: N₂ + 3H₂ ⇌ 2NH₃ (iron catalyst, 450°C, 200 atm). The Contact Process manufactures sulfuric acid: S → SO₂ → SO₃ (V₂O₅ catalyst, 450°C) → H₂SO₄. The blast furnace extracts iron from iron ore using coke (carbon monoxide reduction). Electrolysis extracts aluminium from purified Al₂O₃. Conditions in industrial processes represent economic compromises between yield, rate, and cost.",
    "svgKey": "ech-industrial",
    "landmarks": [
     "Haber Process (N₂ + 3H₂ ⇌ 2NH₃)",
     "Iron catalyst (Haber)",
     "450°C, 200 atm (Haber compromise)",
     "Contact Process (H₂SO₄)",
     "V₂O₅ catalyst (Contact)",
     "Blast furnace (Fe from Fe₂O₃)",
     "Coke (C) → CO reduction",
     "Aluminium extraction (electrolysis)",
     "Nitrogen fixation"
    ],
    "examQA": [
     {
      "q": "Explain why the Haber process uses a temperature of about 450°C rather than a lower or higher temperature.",
      "a": "The forward reaction (N₂ + 3H₂ → 2NH₃) is exothermic. Lower temperature would give a higher equilibrium yield of NH₃ (equilibrium shifts right) but the rate would be too slow — economically unviable. Higher temperature gives a faster rate but poor yield (equilibrium shifts left — less NH₃). 450°C is a compromise: reasonable yield (~15%) at an acceptable rate. The iron catalyst also helps achieve a practical rate at this temperature."
     },
     {
      "q": "Describe how iron is extracted from iron ore in the blast furnace.",
      "a": "Iron ore (Fe₂O₃), coke (C), and limestone (CaCO₃) are fed into the blast furnace. Hot air is blasted in. Coke burns: C + O₂ → CO₂. CO₂ reacts with more coke: CO₂ + C → 2CO. Carbon monoxide reduces iron oxide: Fe₂O₃ + 3CO → 2Fe + 3CO₂. Molten iron (pig iron) sinks to the bottom and is tapped off. Limestone removes acidic impurities (silica) as slag: CaO + SiO₂ → CaSiO₃ (calcium silicate slag)."
     },
     {
      "q": "State the raw materials for the Contact Process and outline the three main stages.",
      "a": "Raw materials: sulfur (or sulfur dioxide from smelting), oxygen (from air), water. Stage 1: Burn sulfur in air: S + O₂ → SO₂. Stage 2: Catalytic oxidation of SO₂ to SO₃: 2SO₂ + O₂ ⇌ 2SO₃ (vanadium(V) oxide catalyst, 450°C, 1-2 atm). Stage 3: Absorb SO₃ in concentrated H₂SO₄ to form oleum, then dilute with water to form H₂SO₄: SO₃ + H₂O → H₂SO₄."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Haber_process"
   }
  ]
 },
 "edexcel_igcse_physics": {
  "subjectName": "Edexcel IGCSE Physics",
  "examCode": "4PH1",
  "sections": [
   "All",
   "Forces & Motion",
   "Electricity",
   "Waves",
   "Energy",
   "Matter",
   "Magnetism",
   "Nuclear & Space"
  ],
  "topics": [
   {
    "id": "forces-motion",
    "name": "Forces & Motion",
    "syllabusRef": "P1",
    "section": "Forces & Motion",
    "description": "Speed = distance/time; velocity = displacement/time (vector); acceleration = Δv/t. Distance-time graphs have gradient = speed; velocity-time graphs have gradient = acceleration and area under = distance. Newton's three laws: 1st (inertia), 2nd (F = ma), 3rd (equal and opposite forces). Resultant forces cause acceleration; balanced forces mean constant velocity or rest. Stopping distance = thinking distance + braking distance. Momentum = mv; conservation of momentum applies in all collisions.",
    "svgKey": "eph-forces-motion",
    "threejs3dFn": "createMotionAnimation",
    "landmarks": [
     "Speed v = d/t",
     "Acceleration a = Δv/t",
     "Newton's 1st law (inertia)",
     "Newton's 2nd law (F = ma)",
     "Newton's 3rd law (action-reaction)",
     "v-t graph (area = distance)",
     "Stopping distance",
     "Momentum p = mv",
     "Conservation of momentum"
    ],
    "examQA": [
     {
      "q": "A car of mass 800 kg accelerates from 0 to 24 m/s in 6 s. Calculate (a) the acceleration and (b) the resultant force.",
      "a": "(a) Acceleration = Δv/t = 24/6 = 4 m/s². (b) F = ma = 800 × 4 = 3200 N. This is the net/resultant force in the direction of motion — additional to any resistive forces that must also be overcome by the engine."
     },
     {
      "q": "State Newton's third law and give an example.",
      "a": "Newton's third law: when object A exerts a force on object B, object B exerts an equal and opposite force on object A. The forces are always equal in magnitude, opposite in direction, and act on different objects (Newton's 3rd law pairs). Example: a rocket engine ejects gas backward with force F — the gas exerts an equal force F forward on the rocket, propelling it forward."
     },
     {
      "q": "Explain why increasing speed significantly increases braking distance.",
      "a": "Braking distance depends on kinetic energy (KE = ½mv²). Kinetic energy increases with the square of speed. The brakes must do work equal to the KE to stop the car. At double the speed, KE is four times greater — so the braking distance is approximately four times longer (W = Fd, so d increases proportionally with KE). This is why speed limits are important for safety."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion"
   },
   {
    "id": "electricity",
    "name": "Electricity",
    "syllabusRef": "P2",
    "section": "Electricity",
    "description": "Current I = Q/t (rate of flow of charge). Potential difference V = W/Q (energy per unit charge). Resistance R = V/I. Ohm's law: V = IR (at constant temperature). Power P = IV = I²R = V²/R. In series circuits, current is the same throughout, voltages add, resistances add. In parallel circuits, voltage is the same across each branch, currents add, total resistance decreases. Mains electricity is AC (alternating current) at 230 V / 50 Hz. Fuses and circuit breakers protect against overload.",
    "svgKey": "eph-electricity",
    "landmarks": [
     "Current I = Q/t (amperes)",
     "PD V = W/Q (volts)",
     "R = V/I (ohms)",
     "Ohm's law (V = IR)",
     "Power P = IV",
     "Series circuit (same I)",
     "Parallel circuit (same V)",
     "AC vs DC",
     "Fuse / circuit breaker"
    ],
    "examQA": [
     {
      "q": "A 12 V battery drives a current of 3 A through a resistor. Calculate (a) the resistance and (b) the power dissipated.",
      "a": "(a) R = V/I = 12/3 = 4 Ω. (b) P = IV = 3 × 12 = 36 W. Alternatively, P = I²R = 3² × 4 = 9 × 4 = 36 W or P = V²/R = 144/4 = 36 W. All three forms give the same answer."
     },
     {
      "q": "Two resistors, 4 Ω and 12 Ω, are connected in parallel. A 24 V supply is connected across them. Find the total current from the supply.",
      "a": "In parallel, voltage across each resistor = 24 V. I₁ = V/R₁ = 24/4 = 6 A. I₂ = V/R₂ = 24/12 = 2 A. Total current = I₁ + I₂ = 6 + 2 = 8 A. (Check: 1/Rtotal = 1/4 + 1/12 = 3/12 + 1/12 = 4/12 → Rtotal = 3 Ω; I = V/R = 24/3 = 8 A ✓)"
     },
     {
      "q": "Explain why a fuse is always placed in the live wire rather than the neutral wire.",
      "a": "The live wire (brown, 230 V) carries the dangerous high voltage. If the fuse is in the live wire and blows due to excess current, it breaks the circuit — the appliance is isolated from the high voltage supply, making it safe to touch. If the fuse were in the neutral wire, the appliance would still be connected to the live (high voltage) side even when the fuse blew — dangerous shock hazard would remain."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Electric_circuit"
   },
   {
    "id": "waves",
    "name": "Waves",
    "syllabusRef": "P3",
    "section": "Waves",
    "description": "Waves transfer energy without transferring matter. Transverse waves (oscillations ⊥ to direction of travel): light, EM waves, water waves. Longitudinal waves (oscillations ∥ to travel): sound, seismic P-waves. Wave speed v = fλ. Reflection (angle of incidence = angle of reflection), refraction (bending at boundary due to speed change), diffraction (spreading around edges/through gaps). The electromagnetic spectrum from radio → gamma all travel at 3×10⁸ m/s in vacuum. Ultrasound (>20 kHz) is used in medicine and sonar.",
    "svgKey": "eph-waves",
    "threejs3dFn": "createWave3D",
    "landmarks": [
     "Transverse vs longitudinal",
     "Amplitude/wavelength/frequency/period",
     "Wave equation v = fλ",
     "Reflection (law of reflection)",
     "Refraction (Snell's law)",
     "Diffraction",
     "EM spectrum (radio → gamma)",
     "Speed of light (3×10⁸ m/s)",
     "Ultrasound applications"
    ],
    "examQA": [
     {
      "q": "A sound wave has a frequency of 440 Hz and travels at 330 m/s in air. Calculate its wavelength.",
      "a": "v = fλ → λ = v/f = 330/440 = 0.75 m. This is the wavelength of the musical note A₄. Sound waves are longitudinal — particles of air vibrate parallel to the direction of wave travel in alternating compressions and rarefactions."
     },
     {
      "q": "Describe what happens when a wave is refracted as it enters a denser medium.",
      "a": "The wave slows down (lower wave speed in the denser medium). If it hits the boundary at an angle, it bends toward the normal (angle of refraction < angle of incidence). The frequency remains the same (determined by the source), but the wavelength decreases (v = fλ, if v decreases and f is constant, λ must decrease). The wave bends back on exiting to its original direction if entering at a matching angle."
     },
     {
      "q": "State one use of each type of electromagnetic radiation: radio waves, microwaves, X-rays.",
      "a": "Radio waves: broadcasting (radio/TV), wireless communication, MRI scanning (radio frequency). Microwaves: cooking food (microwave ovens), satellite communications, mobile phone signals. X-rays: medical imaging (bones/organs), airport security scanning, detecting flaws in metal structures. Note: all EM waves travel at 3×10⁸ m/s in vacuum and are transverse waves."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Wave"
   },
   {
    "id": "energy",
    "name": "Energy Resources & Energy Transfer",
    "syllabusRef": "P4",
    "section": "Energy",
    "description": "Energy exists in multiple forms (kinetic, gravitational potential, elastic, thermal, chemical, nuclear, electrical, light/sound). Conservation of energy: energy cannot be created or destroyed. Efficiency = useful output ÷ total input. Work done = force × distance (W = Fd). Power = W/t (watts). Renewable energy sources (solar, wind, hydroelectric, tidal, geothermal) do not deplete; non-renewable sources (fossil fuels, nuclear) are finite. Sankey diagrams show energy transfers.",
    "svgKey": "eph-energy",
    "threejs3dFn": "createEnergyTransfer",
    "landmarks": [
     "Energy forms (KE/GPE/thermal/electrical)",
     "Conservation of energy",
     "Efficiency = useful output/total input",
     "Work W = Fd (joules)",
     "Power P = W/t (watts)",
     "KE = ½mv²",
     "GPE = mgh",
     "Renewable (solar/wind/hydro/tidal)",
     "Non-renewable (fossil fuels/nuclear)",
     "Sankey diagram"
    ],
    "examQA": [
     {
      "q": "A 60 kg student climbs stairs of height 4 m in 5 s. Calculate (a) the work done against gravity and (b) the power output. (g = 10 N/kg)",
      "a": "(a) Work = mgh = 60 × 10 × 4 = 2400 J. (b) Power = Work/time = 2400/5 = 480 W. This is the minimum power — the student's actual power output is higher due to inefficiency and accelerating their own body."
     },
     {
      "q": "A motor uses 500 J of electrical energy and does 350 J of useful mechanical work. Calculate its efficiency.",
      "a": "Efficiency = useful energy output / total energy input = 350/500 = 0.7 = 70%. The remaining 30% (150 J) is wasted, mainly as heat due to friction and electrical resistance in the motor coils."
     },
     {
      "q": "State two advantages and two disadvantages of using wind turbines for electricity generation.",
      "a": "Advantages: renewable source — never runs out; no greenhouse gas emissions during operation; low running costs once installed. Disadvantages: unreliable — wind is variable; output depends on wind speed; visual/noise impact on landscape; kills birds; require large land area; high initial installation cost. Any two advantages and two disadvantages."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Conservation_of_energy"
   },
   {
    "id": "solids-liquids-gases",
    "name": "Solids, Liquids & Gases",
    "syllabusRef": "P5",
    "section": "Matter",
    "description": "Kinetic theory explains properties of matter: solids (regular lattice, vibrate in fixed positions), liquids (close but mobile particles, no fixed arrangement), gases (far apart, rapid random motion, no significant forces). Pressure in gases results from molecular collisions with container walls. Gas laws: at constant temperature, pV = constant (Boyle's law); at constant volume, p/T = constant; at constant pressure, V/T = constant. Absolute zero (0 K = −273°C) is when particle motion ceases. Specific heat capacity Q = mcΔT.",
    "svgKey": "eph-solids-liquids",
    "threejs3dFn": "createParticleStates",
    "landmarks": [
     "Solid (lattice, vibrating)",
     "Liquid (mobile, close)",
     "Gas (random, far apart)",
     "Pressure = F/A",
     "Boyle's law (p ∝ 1/V)",
     "Charles's law (V ∝ T)",
     "Absolute zero (0 K)",
     "Specific heat capacity Q = mcΔT",
     "Specific latent heat (state changes)"
    ],
    "examQA": [
     {
      "q": "Explain in terms of particles why a gas exerts pressure on the walls of its container.",
      "a": "Gas particles are in continuous random motion. They constantly collide with the container walls. Each collision exerts a small force on the wall (impulse = change in momentum). The total force from billions of collisions per second per unit area of the wall is the gas pressure. Increasing temperature increases particle speed → harder, more frequent collisions → higher pressure."
     },
     {
      "q": "A gas occupies 2.0 dm³ at a pressure of 100 kPa. Calculate its volume if the pressure is increased to 250 kPa at constant temperature.",
      "a": "Boyle's law: p₁V₁ = p₂V₂ (constant temperature). 100 × 2.0 = 250 × V₂. V₂ = 200/250 = 0.8 dm³. When pressure increases, volume decreases proportionally (inverse relationship at constant temperature)."
     },
     {
      "q": "Calculate the energy needed to raise the temperature of 3 kg of water from 20°C to 100°C. (c = 4200 J/kg°C)",
      "a": "Q = mcΔT = 3 × 4200 × (100 − 20) = 3 × 4200 × 80 = 1,008,000 J = 1008 kJ ≈ 1.0 MJ. Note: this is only to reach boiling point — additional energy (specific latent heat of vaporisation ≈ 2.26 MJ/kg) would be needed to boil the water away completely."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Kinetic_theory_of_gases"
   },
   {
    "id": "magnetism-em",
    "name": "Magnetism & Electromagnetism",
    "syllabusRef": "P6",
    "section": "Magnetism",
    "description": "Magnetic fields are regions where magnetic materials experience a force. A current-carrying conductor produces a magnetic field (right-hand rule for solenoids). Electromagnets: field strength increases with current, number of turns, and iron core. The motor effect: a current-carrying conductor in a magnetic field experiences a force (F = BIL). Electromagnetic induction: a conductor moving through a magnetic field (or changing flux) induces an EMF. Transformers use mutual induction: Vp/Vs = Np/Ns. AC transmission uses transformers to reduce power loss.",
    "svgKey": "eph-magnetism",
    "threejs3dFn": "createFieldLines('magnetic')",
    "landmarks": [
     "Magnetic field lines (N→S)",
     "Right-hand rule (solenoid)",
     "Electromagnet strength (I, turns, core)",
     "Motor effect F = BIL",
     "Fleming's left-hand rule (motor)",
     "Electromagnetic induction (Faraday)",
     "Lenz's law (direction)",
     "Transformer equation Vp/Vs = Np/Ns",
     "National Grid (step-up/step-down)"
    ],
    "examQA": [
     {
      "q": "State three ways to increase the strength of an electromagnet.",
      "a": "Increase the current in the coil — more ampere-turns per length. Increase the number of turns in the coil — stronger concentrated field. Add a soft iron core inside the coil — iron is easily magnetised and greatly concentrates the magnetic field. (Also: decrease the length of the coil to increase turns per unit length.)"
     },
     {
      "q": "A transformer has a primary voltage of 240 V and 800 turns on the primary coil. It produces an output of 12 V. Calculate the number of turns on the secondary coil.",
      "a": "Vp/Vs = Np/Ns → 240/12 = 800/Ns → Ns = 800 × 12/240 = 40 turns. This is a step-down transformer — reduces voltage from 240 V to 12 V. For an ideal transformer: power in = power out, so Ip × 240 = Is × 12, meaning secondary current is 20× larger than primary current."
     },
     {
      "q": "Explain why electrical energy is transmitted at very high voltage across the National Grid.",
      "a": "Power transmitted = I × V. At high voltage (step-up transformer raises to 132 kV – 400 kV), current is much lower for the same power. Power wasted in cables = I²R — lower current dramatically reduces this heating loss (quadratic relationship). At the other end, step-down transformers reduce voltage to safe domestic levels (230 V). Overall: lower cable resistance losses, more efficient distribution."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Electromagnetism"
   },
   {
    "id": "radioactivity",
    "name": "Radioactivity & Particles",
    "syllabusRef": "P7",
    "section": "Nuclear & Space",
    "description": "The nucleus contains protons (atomic number Z) and neutrons (mass number A − Z). Unstable nuclei decay by emitting: alpha (⁴₂He, +2, paper-stopped, most ionising); beta (electron, −1, aluminium-stopped); or gamma (EM wave, lead-stopped, most penetrating). Half-life is the time for half the radioactive nuclei to decay. Nuclear fission splits heavy nuclei (e.g., ²³⁵U) releasing huge energy and 2-3 neutrons (chain reaction). Nuclear fusion combines light nuclei at extreme temperature, releasing even more energy.",
    "svgKey": "eph-radioactivity",
    "threejs3dFn": "createNucleus",
    "landmarks": [
     "Alpha (⁴₂He, +2, paper)",
     "Beta (e⁻, −1, aluminium)",
     "Gamma (EM, 0, lead)",
     "Half-life",
     "Ionising radiation hazards",
     "Background radiation",
     "Nuclear fission (chain reaction)",
     "Nuclear fusion (stellar energy)",
     "Geiger-Müller tube"
    ],
    "examQA": [
     {
      "q": "A radioactive source has an initial count rate of 640 counts/s and a half-life of 5 years. What is the count rate after 20 years?",
      "a": "20 years ÷ 5 years = 4 half-lives. After each half-life, count rate halves: 640 → 320 → 160 → 80 → 40 counts/s. After 20 years, the count rate is 40 counts/s (1/16 of the original)."
     },
     {
      "q": "Explain the difference between nuclear fission and nuclear fusion.",
      "a": "Fission: a large, unstable nucleus (e.g., uranium-235) absorbs a neutron and splits into two smaller daughter nuclei + 2-3 neutrons + large energy release. The released neutrons can trigger further fissions — chain reaction. Used in nuclear reactors and bombs. Fusion: two small nuclei (e.g., deuterium + tritium) combine at very high temperature/pressure to form a heavier nucleus + energy. Powers the Sun and stars. More energy per kg of fuel than fission. Not yet commercially viable on Earth."
     },
     {
      "q": "Describe how to distinguish between alpha, beta, and gamma radiation using absorbers and a Geiger-Müller tube.",
      "a": "Place GM tube near source; record count rate. Place sheet of paper between source and GM tube: if count rate drops to background → alpha radiation present. Replace paper with thin aluminium (few mm): if count rate drops significantly → beta radiation. Replace aluminium with thick lead block (several cm): if count rate drops significantly → gamma radiation. If count rate remains only just above background with lead — gamma confirmed."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Radioactive_decay"
   },
   {
    "id": "astrophysics",
    "name": "Astrophysics",
    "syllabusRef": "P8",
    "section": "Nuclear & Space",
    "description": "Our Solar System contains the Sun, 8 planets, dwarf planets, moons, asteroids, and comets. Stars form from nebulae (gas/dust clouds) collapsing under gravity; nuclear fusion begins when temperature is high enough. A star's life cycle depends on mass: small stars → main sequence → red giant → white dwarf; massive stars → red supergiant → supernova → neutron star or black hole. The universe began with the Big Bang ~13.8 billion years ago; evidence includes galactic redshift and cosmic microwave background radiation.",
    "svgKey": "eph-astrophysics",
    "threejs3dFn": "createOrbitAnimation",
    "landmarks": [
     "Solar System structure",
     "Nebula → protostar → main sequence",
     "Red giant/supergiant",
     "White dwarf (small stars)",
     "Neutron star/black hole (massive stars)",
     "Supernova",
     "Nuclear fusion (H → He) in stars",
     "Big Bang theory",
     "Redshift (galaxies receding)",
     "CMB radiation"
    ],
    "examQA": [
     {
      "q": "Describe the life cycle of a star much more massive than our Sun, from main sequence to its final state.",
      "a": "Massive star in main sequence: hydrogen fuses to helium in core. As hydrogen runs out, core contracts, outer layers expand → red supergiant. Core continues fusing heavier elements. Core collapses catastrophically → enormous supernova explosion (briefly outshines galaxy). Remnant core: if 1.4-3× solar mass → neutron star (extreme density); if >3× solar mass → black hole (gravity so strong nothing escapes, not even light)."
     },
     {
      "q": "Describe two pieces of evidence that support the Big Bang theory.",
      "a": "1. Galactic redshift: light from distant galaxies is redshifted — wavelengths are longer than expected. This means galaxies are moving away from us. More distant galaxies recede faster (Hubble's law). This suggests the universe is expanding — consistent with an initial explosive origin. 2. Cosmic Microwave Background (CMB) radiation: uniform microwave radiation coming from all directions in space. This is the \"thermal afterglow\" of the hot dense early universe, now cooled to about 2.7 K as the universe expanded."
     },
     {
      "q": "Explain the role of nuclear fusion in maintaining a star's stability during its main sequence phase.",
      "a": "In a main sequence star, nuclear fusion in the core (hydrogen fusing to helium) releases enormous energy as gamma radiation. This creates an outward radiation pressure. Gravity acts inward, tending to collapse the star. When outward radiation pressure exactly balances inward gravitational force, the star is in a stable equilibrium — hydrostatic equilibrium. This balance maintains the star's constant size during the main sequence phase, which for our Sun lasts about 10 billion years."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Stellar_evolution"
   }
  ]
 }
};
