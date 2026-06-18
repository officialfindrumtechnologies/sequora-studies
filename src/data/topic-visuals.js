// Cambridge IGCSE topic visualisation data
// Key format: {board}_{qual}_{subject} e.g. 'cambridge_igcse_biology'

export const TOPIC_VISUALS = {

  /* ================================================================
     CAMBRIDGE IGCSE BIOLOGY  0610
  ================================================================ */
  cambridge_igcse_biology: {
    subjectName: 'Cambridge IGCSE Biology',
    examCode: '0610',
    sections: ['All', 'Cell Biology', 'Transport', 'Nutrition', 'Health & Disease', 'Physiology', 'Coordination', 'Reproduction & Genetics', 'Environment'],
    topics: [
      {
        id: 'cell-structure',
        name: 'Cell Structure & Organisation',
        syllabusRef: '1.1',
        section: 'Cell Biology',
        description: 'All living organisms are made of cells. Animal cells have a nucleus, cell membrane, cytoplasm and mitochondria. Plant cells additionally have a cellulose cell wall, large central vacuole, and chloroplasts containing chlorophyll for photosynthesis.',
        svgKey: 'bio-cell-structure',
        landmarks: ['Cell membrane', 'Nucleus', 'Cytoplasm', 'Mitochondria', 'Ribosome', 'Cell wall (plant)', 'Chloroplast (plant)', 'Vacuole (plant)', 'Endoplasmic reticulum'],
        examQA: [
          { q: 'State two differences between a plant cell and an animal cell.', a: 'Plant cells have a cellulose cell wall; animal cells do not. Plant cells have chloroplasts for photosynthesis; animal cells do not. Plant cells have a large permanent central vacuole; animal cells have only small temporary vacuoles.', year: 'May/June 2022 P2' },
          { q: 'Describe the function of the cell membrane.', a: 'The cell membrane controls what enters and leaves the cell — it is selectively permeable. It is made of a phospholipid bilayer with embedded protein channels and carriers that regulate transport of substances.', year: 'Oct/Nov 2021 P2' },
          { q: 'Explain why muscle cells contain many mitochondria.', a: 'Mitochondria are the site of aerobic respiration, producing ATP. Muscle cells need large amounts of ATP for contraction, so they have many mitochondria to meet this high energy demand.', year: 'May/June 2023 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Cell_(biology)'
      },
      {
        id: 'membrane-transport',
        name: 'Movement In and Out of Cells',
        syllabusRef: '2.1',
        section: 'Transport',
        description: 'Substances move across cell membranes by diffusion (passive, down a concentration gradient), osmosis (water movement across a semi-permeable membrane via water potential gradient), and active transport (against the gradient, requiring ATP and carrier proteins).',
        svgKey: 'bio-membrane-transport',
        landmarks: ['Concentration gradient', 'Semi-permeable membrane', 'Water potential', 'Carrier proteins', 'ATP requirement', 'Turgor pressure', 'Plasmolysis'],
        examQA: [
          { q: 'Define osmosis.', a: 'Osmosis is the movement of water molecules from a region of higher water potential to a region of lower water potential across a partially permeable membrane.', year: 'May/June 2022 P1' },
          { q: 'Explain how active transport differs from diffusion.', a: 'Active transport moves substances against the concentration gradient using carrier proteins and energy (ATP) from respiration. Diffusion is passive — it requires no energy and moves substances down the concentration gradient.', year: 'Oct/Nov 2022 P2' },
          { q: 'Describe what happens to a plant cell placed in a concentrated salt solution.', a: 'Water moves out of the cell vacuole by osmosis (down the water potential gradient). The vacuole and cytoplasm shrink. The cell membrane pulls away from the cell wall — this is called plasmolysis. The cell becomes plasmolysed and flaccid.', year: 'May/June 2021 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Osmosis'
      },
      {
        id: 'biological-molecules',
        name: 'Biological Molecules',
        syllabusRef: '3.1',
        section: 'Cell Biology',
        description: 'Living organisms contain four main groups of biological molecules: carbohydrates (energy and structure), proteins (structural and functional), lipids (energy storage and insulation), and nucleic acids (genetic information). Each is built from simpler monomers.',
        svgKey: 'bio-biological-molecules',
        landmarks: ['Carbohydrates (glucose → starch/glycogen)', 'Proteins (amino acids)', 'Lipids (fatty acids + glycerol)', 'DNA double helix', 'Hydrogen bonds', 'Condensation reaction', 'Hydrolysis'],
        examQA: [
          { q: 'Name the elements present in a protein molecule.', a: 'Carbon, hydrogen, oxygen, nitrogen, and sometimes sulfur (in some amino acids, e.g., cysteine).', year: 'May/June 2021 P1' },
          { q: 'Describe the structure of DNA.', a: 'DNA is a double helix made of two polynucleotide strands. Each nucleotide contains a deoxyribose sugar, a phosphate group, and one of four organic bases (A, T, C, G). The strands are joined by complementary base pairs (A-T, C-G) via hydrogen bonds.', year: 'Oct/Nov 2023 P4' },
          { q: 'Explain why starch is a suitable storage molecule.', a: 'Starch is insoluble so it does not affect the water potential of cells. It is compact and can store large amounts of glucose. It is not reactive and cannot diffuse out of cells. It can be quickly hydrolysed to glucose when energy is needed.', year: 'May/June 2022 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Biomolecule'
      },
      {
        id: 'enzymes',
        name: 'Enzymes',
        syllabusRef: '4.1',
        section: 'Cell Biology',
        description: 'Enzymes are biological catalysts made of protein. They have a specific active site that is complementary in shape to their substrate. Enzyme activity is affected by temperature, pH, and substrate concentration — changes can denature the enzyme by altering the shape of the active site.',
        svgKey: 'bio-enzymes',
        landmarks: ['Active site', 'Substrate', 'Enzyme-substrate complex', 'Product', 'Denaturation', 'Optimum temperature', 'Optimum pH', 'Lock and key model'],
        examQA: [
          { q: 'Explain why enzymes are specific.', a: 'Enzymes are specific because only a substrate with a complementary shape to the active site can bind. The active site has a precise 3D shape determined by its amino acid sequence. Only the specific substrate fits — like a lock and key.', year: 'May/June 2022 P2' },
          { q: 'Describe and explain the effect of increasing temperature beyond the optimum on enzyme activity.', a: 'Activity decreases sharply above the optimum. High temperatures break hydrogen bonds holding the protein in shape. The active site changes shape and the substrate can no longer fit — the enzyme is denatured. Denaturation is irreversible.', year: 'Oct/Nov 2022 P4' },
          { q: 'Define the term catalyst.', a: 'A catalyst is a substance that speeds up a chemical reaction without being used up or permanently changed in the reaction.', year: 'May/June 2023 P1' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Enzyme'
      },
      {
        id: 'photosynthesis',
        name: 'Plant Nutrition (Photosynthesis)',
        syllabusRef: '5.1',
        section: 'Nutrition',
        description: 'Photosynthesis converts light energy into chemical energy stored in glucose. Carbon dioxide and water are combined in chloroplasts using light energy to produce glucose and oxygen. Chlorophyll in chloroplasts absorbs light energy for this process.',
        svgKey: 'bio-photosynthesis',
        landmarks: ['Chlorophyll', 'Chloroplast', 'Light energy', 'Carbon dioxide (CO₂)', 'Water (H₂O)', 'Glucose (C₆H₁₂O₆)', 'Oxygen (O₂)', 'Stomata', 'Thylakoid membrane'],
        examQA: [
          { q: 'Write the word equation for photosynthesis.', a: 'Carbon dioxide + water → glucose + oxygen (requires light energy and chlorophyll).', year: 'May/June 2022 P1' },
          { q: 'Describe how you would investigate the effect of light intensity on the rate of photosynthesis.', a: 'Use pondweed (e.g., Elodea) in water with sodium hydrogen carbonate. Vary the distance of a lamp from the plant (different light intensities). Count bubbles of oxygen produced per minute at each distance. Control temperature and CO₂ concentration. Plot rate vs light intensity.', year: 'Oct/Nov 2022 P3' },
          { q: 'Explain why the rate of photosynthesis levels off at high light intensities.', a: 'At high light intensity another factor becomes limiting — either CO₂ concentration or temperature. Even with maximum light, the rate cannot increase further if CO₂ is in short supply or enzymes cannot work faster at the current temperature.', year: 'May/June 2023 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Photosynthesis'
      },
      {
        id: 'digestion',
        name: 'Animal Nutrition (Digestion)',
        syllabusRef: '6.1',
        section: 'Nutrition',
        description: 'Digestion breaks down large insoluble food molecules into small soluble ones that can be absorbed. Physical digestion increases surface area; chemical digestion uses enzymes. Absorption occurs mainly in the small intestine through villi that increase surface area.',
        svgKey: 'bio-digestion',
        landmarks: ['Mouth (amylase)', 'Oesophagus (peristalsis)', 'Stomach (protease, pepsin)', 'Small intestine (villi)', 'Pancreas (all enzymes)', 'Large intestine (water absorption)', 'Rectum', 'Bile (emulsification)'],
        examQA: [
          { q: 'Explain how the structure of a villus is adapted for absorption.', a: 'Villi have: a large surface area for maximum absorption; a single layer of epithelial cells for short diffusion distance; a rich blood supply (capillaries) to maintain concentration gradient; lacteals to absorb fatty acids and glycerol.', year: 'May/June 2022 P4' },
          { q: 'State the role of bile in digestion.', a: 'Bile emulsifies fats — it breaks large fat droplets into smaller ones, increasing the surface area for lipase enzymes to act on. Bile also neutralises the acidic chyme from the stomach, creating the alkaline pH needed for intestinal enzymes.', year: 'Oct/Nov 2021 P2' },
          { q: 'What enzyme digests starch and where is it produced?', a: 'Amylase digests starch into maltose. It is produced in the salivary glands (in the mouth) and the pancreas.', year: 'May/June 2023 P1' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Digestion'
      },
      {
        id: 'transport-plants',
        name: 'Transport in Plants',
        syllabusRef: '7.1',
        section: 'Transport',
        description: 'Plants have two transport systems: xylem carries water and dissolved minerals from roots to leaves (transpiration stream); phloem carries dissolved sugars from leaves to all parts of the plant (translocation). Water moves by cohesion-tension in xylem vessels.',
        svgKey: 'bio-transport-plants',
        landmarks: ['Xylem vessels', 'Phloem sieve tubes', 'Transpiration', 'Root hair cells', 'Stomata', 'Guard cells', 'Translocation', 'Cohesion-tension'],
        examQA: [
          { q: 'Explain how water moves from soil to xylem in the root.', a: 'Water enters root hair cells by osmosis (soil water potential higher than cell water potential). It passes from cell to cell by osmosis across the cortex, moving down the water potential gradient toward the xylem. It enters the xylem and is pulled up by the transpiration stream.', year: 'May/June 2022 P4' },
          { q: 'State two factors that increase the rate of transpiration.', a: 'Higher temperature (increases evaporation from mesophyll cells); lower humidity/higher wind speed (increases concentration gradient for water vapour); brighter light (stomata open wider). Any two factors accepted.', year: 'Oct/Nov 2022 P1' },
          { q: 'Describe the structure of xylem vessels and explain how this relates to their function.', a: 'Xylem vessels are dead cells with lignified (waterproofed) walls and no end walls, forming continuous hollow tubes. This allows uninterrupted flow of water. Lignin provides strength to withstand the tension created by the transpiration stream.', year: 'May/June 2021 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Plant_transport'
      },
      {
        id: 'circulatory-system',
        name: 'Transport in Animals (Circulatory System)',
        syllabusRef: '8.1',
        section: 'Transport',
        description: 'The mammalian double circulatory system pumps blood via the heart through two separate circuits: pulmonary (to lungs) and systemic (to body). Blood transports oxygen, glucose, hormones, and waste. Arteries carry blood away from the heart; veins carry blood toward it.',
        svgKey: 'bio-circulatory',
        landmarks: ['Heart (4 chambers)', 'Arteries (thick walls)', 'Veins (valves)', 'Capillaries (1-cell thick)', 'Aorta', 'Pulmonary artery/vein', 'Red blood cells (haemoglobin)', 'Plasma', 'Lymph'],
        examQA: [
          { q: 'Explain why the left ventricle wall is thicker than the right ventricle wall.', a: 'The left ventricle pumps blood around the entire body (systemic circulation), which requires high pressure over a long distance. The right ventricle only pumps blood to the lungs (pulmonary circulation), a shorter, lower-resistance circuit requiring less pressure.', year: 'May/June 2022 P4' },
          { q: 'Describe how red blood cells are adapted for carrying oxygen.', a: 'Biconcave disc shape provides maximum surface area for oxygen diffusion. No nucleus leaves more space for haemoglobin. Haemoglobin binds to oxygen to form oxyhaemoglobin. Thin, flexible membrane allows passage through capillaries.', year: 'Oct/Nov 2023 P4' },
          { q: 'State the difference between arteries and veins.', a: 'Arteries carry blood away from the heart at high pressure; they have thick, elastic, muscular walls and no valves. Veins carry blood toward the heart at low pressure; they have thin walls, a large lumen, and valves to prevent backflow.', year: 'May/June 2021 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Circulatory_system'
      },
      {
        id: 'immunity',
        name: 'Pathogens & Immunity',
        syllabusRef: '9.1',
        section: 'Health & Disease',
        description: 'Pathogens (bacteria, viruses, fungi, protists) cause infectious diseases. The immune system defends the body through non-specific defences (skin, mucus, phagocytosis) and specific immunity (lymphocytes producing antibodies specific to each antigen). Vaccination uses weakened/dead pathogens to stimulate immunity.',
        svgKey: 'bio-immunity',
        landmarks: ['Antigens', 'Antibodies (Y-shaped)', 'Lymphocytes (B-cells, T-cells)', 'Phagocytosis', 'Phagocytes', 'Memory cells', 'Vaccination', 'Active/passive immunity'],
        examQA: [
          { q: 'Explain how vaccination protects against a disease.', a: 'Vaccine introduces antigens (weakened/dead pathogen) into the body. B-lymphocytes recognise the antigens and produce complementary antibodies. Memory cells form. If the real pathogen later infects, memory cells divide rapidly and produce antibodies quickly — before the disease develops.', year: 'May/June 2022 P4' },
          { q: 'Describe the process of phagocytosis.', a: 'A phagocyte detects chemicals from the pathogen and moves toward it (chemotaxis). The phagocyte engulfs the pathogen, forming a vacuole (phagosome). Lysosomes fuse with the vacuole and release digestive enzymes that destroy the pathogen.', year: 'Oct/Nov 2022 P4' },
          { q: 'State the difference between active and passive immunity.', a: 'Active immunity: the body produces its own antibodies after exposure to antigens (natural infection or vaccination) — long-lasting. Passive immunity: ready-made antibodies are received (e.g., from mother via placenta or breast milk, or injection of antiserum) — immediate but short-lived.', year: 'May/June 2023 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Immune_system'
      },
      {
        id: 'gas-exchange',
        name: 'Gas Exchange',
        syllabusRef: '11.1',
        section: 'Physiology',
        description: 'Gas exchange in the lungs occurs across the alveolar surface. Oxygen diffuses from alveoli into blood capillaries; carbon dioxide diffuses in the opposite direction. Alveoli are adapted for efficient exchange: large surface area, thin walls, moist surface, and rich blood supply.',
        svgKey: 'bio-gas-exchange',
        landmarks: ['Alveoli', 'Capillary network', 'Thin epithelium (1 cell)', 'Moist surface', 'Large surface area', 'Diaphragm', 'Intercostal muscles', 'Trachea', 'Bronchi/bronchioles'],
        examQA: [
          { q: 'Describe how the alveoli are adapted for efficient gas exchange.', a: 'Millions of alveoli provide a very large surface area. Walls are only one cell thick for a short diffusion distance. Moist surface allows gases to dissolve. Dense capillary network maintains a steep concentration gradient. Good blood supply removes O₂ and delivers CO₂ continuously.', year: 'May/June 2022 P4' },
          { q: 'Describe the mechanism of breathing in (inspiration).', a: 'Diaphragm contracts and flattens. External intercostal muscles contract, pulling the ribcage up and out. Thoracic volume increases. Pressure inside lungs falls below atmospheric pressure. Air flows in down the pressure gradient.', year: 'Oct/Nov 2022 P4' },
          { q: 'Name the substance that makes the alveolar surface moist and state its importance.', a: 'Surfactant keeps the alveolar surface moist. This is important because gases must dissolve before they can diffuse across the membrane, and it reduces surface tension preventing alveolar collapse.', year: 'May/June 2023 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Pulmonary_alveolus'
      },
      {
        id: 'respiration',
        name: 'Respiration',
        syllabusRef: '12.1',
        section: 'Physiology',
        description: 'Respiration releases chemical energy from glucose as ATP. Aerobic respiration uses oxygen and produces carbon dioxide and water (maximum ATP yield). Anaerobic respiration occurs without oxygen, producing less ATP; in animals it produces lactic acid, in yeast it produces ethanol and carbon dioxide.',
        svgKey: 'bio-respiration',
        landmarks: ['Glucose', 'ATP (energy currency)', 'Mitochondria', 'Oxygen', 'Carbon dioxide', 'Lactic acid (anaerobic)', 'Ethanol (yeast anaerobic)', 'Glycolysis', 'Krebs cycle'],
        examQA: [
          { q: 'Write the word equation for aerobic respiration.', a: 'Glucose + oxygen → carbon dioxide + water (+ energy/ATP released)', year: 'May/June 2022 P1' },
          { q: 'Describe the difference between aerobic and anaerobic respiration.', a: 'Aerobic: uses oxygen, produces CO₂ and water, releases large amounts of ATP, occurs in mitochondria. Anaerobic: no oxygen, in animals produces lactic acid, in yeast produces ethanol + CO₂, releases much less ATP, occurs in cytoplasm.', year: 'Oct/Nov 2021 P2' },
          { q: 'Explain why athletes experience an oxygen debt after intense exercise.', a: 'During intense exercise, anaerobic respiration produces lactic acid (oxygen cannot be supplied fast enough). After exercise, extra oxygen is used to oxidise and remove this lactic acid. The excess oxygen consumed above resting level is the oxygen debt.', year: 'May/June 2023 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Cellular_respiration'
      },
      {
        id: 'excretion',
        name: 'Excretion',
        syllabusRef: '13.1',
        section: 'Physiology',
        description: 'Excretion is the removal of metabolic waste products from the body. The kidneys excrete urea (from protein breakdown), excess water, and salts as urine. The lungs excrete carbon dioxide. The skin excretes small amounts of urea in sweat. The kidney regulates blood composition by ultrafiltration and selective reabsorption.',
        svgKey: 'bio-excretion',
        landmarks: ['Nephron', 'Glomerulus (filtration)', 'Bowman\'s capsule', 'Proximal tubule', 'Loop of Henle', 'Collecting duct', 'Urea', 'ADH (water regulation)', 'Ureter', 'Bladder'],
        examQA: [
          { q: 'Describe how the kidneys produce urine.', a: 'High blood pressure in the glomerulus forces small molecules (water, glucose, urea, salts) into the Bowman\'s capsule — ultrafiltration. As filtrate passes through the tubules, all glucose and most water and salts are selectively reabsorbed back into blood. Remaining filtrate (water, urea, excess salts) forms urine.', year: 'May/June 2022 P4' },
          { q: 'Explain how ADH controls water reabsorption.', a: 'ADH (anti-diuretic hormone) is released by the pituitary gland when blood water potential is low. It increases permeability of the collecting duct to water. More water is reabsorbed into the blood. Less, more concentrated urine is produced. Blood water potential rises — negative feedback reduces ADH secretion.', year: 'Oct/Nov 2023 P4' },
          { q: 'State where urea is produced and from which molecule.', a: 'Urea is produced in the liver by the process of deamination. Excess amino acids are broken down: the amino group (NH₂) is removed and converted to urea, which is then transported in the blood to the kidneys for excretion.', year: 'May/June 2021 P1' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Excretion'
      },
      {
        id: 'coordination',
        name: 'Coordination & Response',
        syllabusRef: '14.1',
        section: 'Coordination',
        description: 'The nervous system detects stimuli and coordinates rapid responses via nerve impulses. Neurons transmit electrical signals; synapses transfer signals chemically between neurons. The endocrine system uses hormones for slower, longer-lasting responses. Reflex arcs bypass the brain for fast protective responses.',
        svgKey: 'bio-coordination',
        landmarks: ['Neuron (nerve cell)', 'Dendrites', 'Axon', 'Myelin sheath', 'Synapse', 'Neurotransmitter', 'Reflex arc', 'Receptor', 'Effector (muscle/gland)', 'Hormones'],
        examQA: [
          { q: 'Describe how a nerve impulse crosses a synapse.', a: 'Impulse arrives at pre-synaptic membrane. Vesicles release neurotransmitters into the synaptic cleft by exocytosis. Neurotransmitters diffuse across the cleft and bind to receptors on the post-synaptic membrane. This stimulates a new impulse in the next neuron. Neurotransmitters are then destroyed by enzymes or reabsorbed.', year: 'May/June 2022 P4' },
          { q: 'State the sequence of components in a reflex arc.', a: 'Receptor → sensory neuron → (relay neuron in spinal cord) → motor neuron → effector (muscle or gland). The CNS processes occur without conscious thought — this is why reflex responses are very fast.', year: 'Oct/Nov 2022 P2' },
          { q: 'Explain the advantage of a reflex action being involuntary.', a: 'Reflexes do not require conscious processing by the brain, so they are very fast (milliseconds). This is important for protective responses (e.g., withdrawing from pain, blinking) where a delay could cause serious injury.', year: 'May/June 2023 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Nervous_system'
      },
      {
        id: 'reproduction',
        name: 'Reproduction',
        syllabusRef: '15.1',
        section: 'Reproduction & Genetics',
        description: 'Sexual reproduction involves fusion of gametes (egg + sperm), producing genetic variation. Asexual reproduction produces genetically identical offspring (clones) from one parent. In plants, both methods occur. Mitosis produces identical daughter cells for growth; meiosis produces genetically diverse gametes.',
        svgKey: 'bio-reproduction',
        landmarks: ['Mitosis (2 identical cells)', 'Meiosis (4 gametes)', 'Fertilisation', 'Zygote', 'Gametes (haploid)', 'Chromosomes', 'Pollination (plants)', 'Asexual reproduction'],
        examQA: [
          { q: 'State two differences between sexual and asexual reproduction.', a: 'Sexual reproduction involves two parents and produces genetically varied offspring; asexual reproduction involves one parent and produces genetically identical offspring (clones). Sexual reproduction involves gametes and fertilisation; asexual reproduction does not.', year: 'May/June 2022 P2' },
          { q: 'Describe the process of fertilisation in flowering plants.', a: 'Pollen grain lands on the stigma (pollination). The pollen tube grows down the style into the ovary. The male gamete nucleus travels down the pollen tube to the ovule. The male gamete fuses with the female gamete (egg cell) in the ovule — this is fertilisation. A zygote forms, which develops into the seed.', year: 'Oct/Nov 2022 P4' },
          { q: 'State the advantages of asexual reproduction.', a: 'Only one parent needed — no need to find a mate. Faster reproduction. All offspring are identical — useful if parent is well-adapted. No variation in offspring — consistent traits. Used in horticulture (cloning plants with desirable traits).', year: 'May/June 2021 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Reproduction'
      },
      {
        id: 'genetics',
        name: 'Inheritance & Genetics',
        syllabusRef: '16.1',
        section: 'Reproduction & Genetics',
        description: 'Genes are units of heredity found on chromosomes. Alleles are alternative forms of a gene. Dominant alleles are expressed when present (even one copy); recessive alleles only expressed when homozygous. Punnett squares predict the probability of offspring genotypes and phenotypes.',
        svgKey: 'bio-genetics',
        landmarks: ['Gene', 'Allele (dominant/recessive)', 'Genotype', 'Phenotype', 'Homozygous/heterozygous', 'Punnett square', 'Monohybrid cross', 'Co-dominance', 'Sex linkage'],
        examQA: [
          { q: 'Define the term allele.', a: 'An allele is one of the alternative forms of a gene, occupying the same locus (position) on homologous chromosomes. Alleles may be dominant or recessive and determine different versions of the same characteristic.', year: 'May/June 2022 P1' },
          { q: 'In peas, tall (T) is dominant over dwarf (t). Predict the offspring from crossing Tt × Tt.', a: 'Parents: Tt × Tt. Gametes: T, t from each parent. Punnett square gives offspring: TT, Tt, Tt, tt. Ratio: 3 tall : 1 dwarf. Genotypes: 25% TT, 50% Tt, 25% tt.', year: 'Oct/Nov 2022 P2' },
          { q: 'Explain what is meant by co-dominance, with an example.', a: 'Co-dominance is when both alleles are expressed equally in the phenotype of a heterozygote. Example: ABO blood group — I^A and I^B are co-dominant; a person with genotype I^A I^B has blood type AB, expressing both antigens on red blood cells.', year: 'May/June 2023 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Genetics'
      },
      {
        id: 'variation-selection',
        name: 'Variation & Natural Selection',
        syllabusRef: '17.1',
        section: 'Reproduction & Genetics',
        description: 'Variation within a species can be continuous (e.g., height — a normal distribution) or discontinuous (e.g., blood group — distinct categories). Natural selection acts on heritable variation: individuals best adapted to their environment survive and reproduce, passing on advantageous alleles.',
        svgKey: 'bio-variation',
        landmarks: ['Continuous variation', 'Discontinuous variation', 'Mutation', 'Natural selection', 'Adaptation', 'Survival of the fittest', 'Selective advantage', 'Evolution'],
        examQA: [
          { q: 'Describe the process of natural selection.', a: 'Within a population there is genetic variation. Organisms produce many offspring but only some survive — there is competition for resources. Those with advantageous adaptations are more likely to survive and reproduce (survival of the fittest). They pass on beneficial alleles to offspring. Over many generations the frequency of advantageous alleles increases — evolution by natural selection.', year: 'May/June 2022 P4' },
          { q: 'Explain how antibiotic resistance in bacteria can develop by natural selection.', a: 'Random mutations produce some bacteria resistant to the antibiotic. When antibiotic is applied, non-resistant bacteria die. Resistant bacteria survive and reproduce rapidly (no competition). They pass resistance genes to offspring. Over time the whole population becomes resistant.', year: 'Oct/Nov 2023 P4' },
          { q: 'State two causes of genetic variation.', a: 'Mutation: random changes in DNA base sequence. Independent assortment and crossing over during meiosis producing new combinations of alleles in gametes. Also fertilisation produces unique combinations of parental alleles.', year: 'May/June 2021 P1' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Natural_selection'
      },
      {
        id: 'ecosystems',
        name: 'Ecosystems & Biodiversity',
        syllabusRef: '18.1',
        section: 'Environment',
        description: 'An ecosystem consists of all living organisms (biotic factors) and physical environment (abiotic factors) in an area. Energy flows through ecosystems via food chains and food webs. Only about 10% of energy is transferred between trophic levels — the rest is lost as heat through respiration.',
        svgKey: 'bio-ecosystems',
        landmarks: ['Producer (autotroph)', 'Primary consumer (herbivore)', 'Secondary consumer', 'Apex predator', 'Decomposer', 'Trophic level', 'Energy transfer (10%)', 'Biomass pyramid', 'Carbon cycle', 'Nitrogen cycle'],
        examQA: [
          { q: 'Explain why energy transfer between trophic levels is inefficient.', a: 'Most energy at each level is lost: used in respiration for life processes (major loss — as heat); lost in undigested material (faeces); not all organisms at one level are eaten. Only about 10% is transferred to biomass at the next trophic level, limiting food chain length.', year: 'May/June 2022 P4' },
          { q: 'State the role of decomposers in an ecosystem.', a: 'Decomposers (bacteria and fungi) break down dead organic material and excretory products. They release nutrients (e.g., nitrates, phosphates) back into the soil, making them available for plant uptake — completing nutrient cycles. They recycle carbon through CO₂ release.', year: 'Oct/Nov 2022 P4' },
          { q: 'Describe what is meant by biodiversity.', a: 'Biodiversity refers to the variety of living organisms in an area. It includes species diversity (number of different species and relative abundance), genetic diversity within species, and ecosystem diversity. High biodiversity indicates a healthy, stable ecosystem.', year: 'May/June 2023 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Ecosystem'
      },
      {
        id: 'human-impact',
        name: 'Human Impact on the Environment',
        syllabusRef: '19.1',
        section: 'Environment',
        description: 'Human activities have major impacts on ecosystems including deforestation, pollution of air/water/land, global warming from greenhouse gas emissions, and loss of biodiversity. Sustainable development seeks to meet present needs without compromising the ability of future generations to meet their own needs.',
        svgKey: 'bio-human-impact',
        landmarks: ['Deforestation', 'Greenhouse gases (CO₂, CH₄)', 'Global warming', 'Acid rain', 'Water pollution (fertilisers → eutrophication)', 'Habitat loss', 'Conservation', 'Sustainable development'],
        examQA: [
          { q: 'Describe how eutrophication leads to death of aquatic organisms.', a: 'Fertilisers (nitrates/phosphates) wash into water (leaching). Algae multiply rapidly — algal bloom. Algae block sunlight so aquatic plants die. Decomposers multiply and break down dead plants/algae. Decomposers use up all dissolved oxygen in aerobic respiration. Fish and other organisms die due to lack of oxygen.', year: 'May/June 2022 P4' },
          { q: 'Explain how deforestation contributes to global warming.', a: 'Trees absorb CO₂ during photosynthesis — removing them reduces CO₂ uptake. When trees are burned, large amounts of CO₂ are released. More CO₂ in atmosphere enhances the greenhouse effect — more infrared radiation is trapped. This increases global average temperature.', year: 'Oct/Nov 2023 P4' },
          { q: 'State two methods of water conservation.', a: 'Drip irrigation delivers water directly to plant roots reducing evaporation. Collecting rainwater (water butts). Repairing pipe leaks. Using drought-resistant crop varieties. Reducing industrial water use. Any two methods accepted.', year: 'May/June 2021 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Human_impact_on_the_environment'
      }
    ]
  },

  /* ================================================================
     CAMBRIDGE IGCSE CHEMISTRY  0620
  ================================================================ */
  cambridge_igcse_chemistry: {
    subjectName: 'Cambridge IGCSE Chemistry',
    examCode: '0620',
    sections: ['All', 'States & Structure', 'Reactions', 'Electrochemistry', 'Organic Chemistry', 'Environmental Chemistry', 'Lab Techniques'],
    topics: [
      {
        id: 'states-of-matter',
        name: 'States of Matter',
        syllabusRef: '1.1',
        section: 'States & Structure',
        description: 'Matter exists in three states: solid (fixed shape and volume, particles in regular lattice with vibration only), liquid (fixed volume, no fixed shape, particles close but mobile), and gas (no fixed shape or volume, particles far apart moving rapidly). Changes of state involve energy transfer without chemical change.',
        svgKey: 'chem-states-matter',
        landmarks: ['Solid (lattice)', 'Liquid (mobile particles)', 'Gas (rapid random motion)', 'Melting point', 'Boiling point', 'Sublimation', 'Condensation', 'Kinetic energy'],
        examQA: [
          { q: 'Describe the arrangement and movement of particles in a gas.', a: 'Gas particles are far apart with no regular arrangement. They move rapidly and randomly in all directions. There are no significant forces between particles. They collide frequently with each other and the container walls.', year: 'May/June 2022 P1' },
          { q: 'Explain why a liquid has a fixed volume but no fixed shape.', a: 'Liquid particles are close together (so volume is fixed — they cannot be compressed significantly). However, they can flow and move past each other (no fixed positions), so a liquid takes the shape of its container.', year: 'Oct/Nov 2022 P1' },
          { q: 'Define the term melting point.', a: 'The melting point is the temperature at which a solid changes state to a liquid. At this temperature, particles have enough energy to overcome the forces holding them in fixed positions in the lattice. The temperature remains constant during melting as energy is used to break bonds rather than increase temperature.', year: 'May/June 2021 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/State_of_matter'
      },
      {
        id: 'atomic-structure',
        name: 'Atomic Structure',
        syllabusRef: '2.1',
        section: 'States & Structure',
        description: 'An atom consists of a nucleus (protons and neutrons) surrounded by electrons in shells. Proton number (atomic number) defines the element; mass number = protons + neutrons. Isotopes are atoms of the same element with different numbers of neutrons. Electronic configuration determines chemical properties.',
        svgKey: 'chem-atomic-structure',
        landmarks: ['Proton (positive charge)', 'Neutron (no charge)', 'Electron (negative charge)', 'Nucleus', 'Electron shells (2, 8, 8...)', 'Atomic number', 'Mass number', 'Isotopes', 'Electronic configuration'],
        examQA: [
          { q: 'Define the term isotope.', a: 'Isotopes are atoms of the same element (same proton number/atomic number) with different numbers of neutrons (different mass numbers). They have identical chemical properties but different physical properties due to different masses.', year: 'May/June 2022 P1' },
          { q: 'State the relative charges and masses of protons, neutrons, and electrons.', a: 'Proton: relative charge +1, relative mass 1. Neutron: relative charge 0, relative mass 1. Electron: relative charge −1, relative mass 1/1840 (negligible). The nucleus contains protons and neutrons; electrons occupy shells around the nucleus.', year: 'Oct/Nov 2022 P1' },
          { q: 'An atom of element X has atomic number 11 and mass number 23. Write its electronic configuration.', a: 'Atomic number 11 means 11 protons and 11 electrons. Electronic configuration: 2, 8, 1 (2 electrons in shell 1, 8 in shell 2, 1 in shell 3). This is sodium — a group 1 metal with one outer electron.', year: 'May/June 2023 P1' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Atom'
      },
      {
        id: 'chemical-bonding',
        name: 'Chemical Bonding',
        syllabusRef: '3.1',
        section: 'States & Structure',
        description: 'Ionic bonding occurs between metals and non-metals — electrons are transferred to form oppositely charged ions held by electrostatic attraction. Covalent bonding shares electrons between non-metals. Metallic bonding involves a lattice of positive ions in a sea of delocalised electrons.',
        svgKey: 'chem-bonding',
        landmarks: ['Ionic bond (electron transfer)', 'Covalent bond (shared electrons)', 'Metallic bond (delocalised electrons)', 'Lewis dot structure', 'Electronegativity', 'Giant ionic lattice', 'Simple molecular', 'Giant covalent (diamond, silica)'],
        examQA: [
          { q: 'Describe ionic bonding between sodium and chlorine.', a: 'Sodium (2,8,1) loses one outer electron to form Na⁺ ion (2,8). Chlorine (2,8,7) gains one electron to form Cl⁻ ion (2,8,8). Both achieve stable noble gas electronic configurations. The oppositely charged ions are held together by strong electrostatic attraction — ionic bond.', year: 'May/June 2022 P2' },
          { q: 'Explain why ionic compounds have high melting points.', a: 'Ionic compounds have a giant lattice structure with strong electrostatic forces of attraction between oppositely charged ions in all directions. Large amounts of energy are needed to overcome these strong forces and separate the ions. Therefore melting points are high.', year: 'Oct/Nov 2022 P4' },
          { q: 'Describe the structure and bonding in diamond.', a: 'Diamond has a giant covalent structure where each carbon atom forms four strong covalent bonds to four other carbon atoms in a tetrahedral arrangement. This creates a rigid 3D network. Very high melting point because many strong covalent bonds must be broken. No delocalised electrons — does not conduct electricity.', year: 'May/June 2023 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Chemical_bond'
      },
      {
        id: 'stoichiometry',
        name: 'Stoichiometry',
        syllabusRef: '4.1',
        section: 'Reactions',
        description: 'Stoichiometry relates quantities of reactants and products in chemical equations. The mole is the unit for amount of substance. Relative atomic mass (Ar) and relative molecular mass (Mr) allow mass calculations. Molar volume (24 dm³ at RTP) applies to any gas.',
        svgKey: 'chem-stoichiometry',
        landmarks: ['Mole (6.02×10²³ particles)', 'Molar mass (g/mol)', 'Relative atomic mass Ar', 'Balanced equation', 'Mole ratio', 'Limiting reagent', 'Yield (%)', 'Empirical formula'],
        examQA: [
          { q: 'Calculate the mass of carbon dioxide produced when 12 g of carbon is completely burned in excess oxygen. (Ar: C=12, O=16)', a: 'C + O₂ → CO₂. Moles of C = 12/12 = 1 mol. Mole ratio C:CO₂ = 1:1, so 1 mol CO₂ produced. Mr(CO₂) = 12+(2×16) = 44. Mass = 1 × 44 = 44 g CO₂.', year: 'May/June 2022 P2' },
          { q: 'Define the term mole.', a: 'A mole is the amount of substance that contains the same number of particles (atoms, molecules, or ions) as there are atoms in exactly 12 g of carbon-12. This number is the Avogadro constant: 6.02 × 10²³ particles per mole.', year: 'Oct/Nov 2022 P1' },
          { q: 'What is meant by the empirical formula of a compound?', a: 'The empirical formula is the simplest whole number ratio of atoms of each element in a compound. For example, if a compound contains 50% C, 44.4% O, 5.6% H by mass, the empirical formula is CH₂O — the simplest ratio is 1:2:1.', year: 'May/June 2021 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Stoichiometry'
      },
      {
        id: 'electrochemistry',
        name: 'Electrochemistry',
        syllabusRef: '5.1',
        section: 'Electrochemistry',
        description: 'Electrolysis uses electrical energy to drive non-spontaneous chemical reactions. Ions move through electrolyte to electrodes: cations (+) to cathode (−), anions (−) to anode (+). Electroplating deposits a thin metal layer. Electrolysis of brine produces chlorine, hydrogen, and sodium hydroxide.',
        svgKey: 'chem-electrochemistry',
        landmarks: ['Electrolyte', 'Anode (+)', 'Cathode (−)', 'Cations → cathode', 'Anions → anode', 'Oxidation at anode', 'Reduction at cathode', 'Electrolysis of water', 'Electrolysis of brine'],
        examQA: [
          { q: 'State what happens at each electrode during electrolysis of brine.', a: 'Cathode (−): H⁺ ions from water are reduced → hydrogen gas produced: 2H⁺ + 2e⁻ → H₂. Anode (+): Cl⁻ ions are oxidised → chlorine gas: 2Cl⁻ → Cl₂ + 2e⁻. The remaining Na⁺ and OH⁻ ions form sodium hydroxide solution.', year: 'May/June 2022 P4' },
          { q: 'Explain why solid copper sulfate does not conduct electricity but copper sulfate solution does.', a: 'In solid copper sulfate, ions are held in fixed positions in the lattice — they cannot move. In solution, Cu²⁺ and SO₄²⁻ ions are free to move through the solution toward the electrodes, carrying charge — so current flows.', year: 'Oct/Nov 2022 P2' },
          { q: 'Describe how electroplating works for chromium-plating steel.', a: 'The steel object is made the cathode. A chromium anode is used. The electrolyte is a chromium salt solution. Current passes — Cr³⁺ ions are reduced at the cathode and chromium deposits on the steel surface. The anode slowly dissolves, replenishing Cr³⁺ ions in solution.', year: 'May/June 2023 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Electrolysis'
      },
      {
        id: 'chemical-energetics',
        name: 'Chemical Energetics',
        syllabusRef: '6.1',
        section: 'Reactions',
        description: 'Exothermic reactions release heat energy to the surroundings (temperature rises); products have lower energy than reactants. Endothermic reactions absorb heat (temperature falls). Activation energy (Ea) is the minimum energy needed for a reaction to occur. Bond breaking requires energy; bond making releases energy.',
        svgKey: 'chem-energetics',
        landmarks: ['Exothermic (ΔH < 0)', 'Endothermic (ΔH > 0)', 'Activation energy (Ea)', 'Energy profile diagram', 'Bond breaking (endothermic)', 'Bond making (exothermic)', 'Enthalpy change ΔH', 'Catalyst (lowers Ea)'],
        examQA: [
          { q: 'Describe how to determine if a reaction is exothermic or endothermic using a thermometer.', a: 'Measure the initial temperature of the reactants. Mix the reactants and stir. Record the temperature change. If temperature rises — exothermic (heat released to surroundings). If temperature falls — endothermic (heat absorbed from surroundings).', year: 'May/June 2022 P3' },
          { q: 'Use bond energies to calculate the energy change for H₂ + Cl₂ → 2HCl. (H-H: 436, Cl-Cl: 243, H-Cl: 432 kJ/mol)', a: 'Energy to break bonds: H-H + Cl-Cl = 436 + 243 = 679 kJ. Energy released making bonds: 2×H-Cl = 2×432 = 864 kJ. ΔH = energy in − energy out = 679 − 864 = −185 kJ/mol. Exothermic.', year: 'Oct/Nov 2022 P4' },
          { q: 'Explain how a catalyst increases the rate of a reaction without being used up.', a: 'A catalyst provides an alternative reaction pathway with a lower activation energy. More reactant particles have sufficient energy to react. The catalyst is not consumed — it is regenerated at the end of the reaction. Rate increases without changing the products.', year: 'May/June 2023 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Enthalpy'
      },
      {
        id: 'reaction-rates',
        name: 'Chemical Reactions (Rates & Reversibility)',
        syllabusRef: '7.1',
        section: 'Reactions',
        description: 'Reaction rate measures how quickly reactants are converted to products. Factors affecting rate: concentration, temperature, surface area, pressure (gases), and catalysts. A reversible reaction reaches dynamic equilibrium when forward and reverse rates are equal. Le Chatelier\'s principle predicts shifts in equilibrium.',
        svgKey: 'chem-reaction-rates',
        landmarks: ['Collision theory', 'Activation energy', 'Concentration effect', 'Temperature effect', 'Surface area', 'Catalyst', 'Reversible reaction (⇌)', 'Dynamic equilibrium', 'Le Chatelier\'s principle'],
        examQA: [
          { q: 'Explain in terms of collision theory why increasing concentration increases reaction rate.', a: 'Increasing concentration means more reactant particles in the same volume. Particles collide more frequently. More collisions per second with energy ≥ activation energy occur. Therefore the rate of successful collisions increases and the reaction is faster.', year: 'May/June 2022 P4' },
          { q: 'State Le Chatelier\'s principle.', a: 'When a system in dynamic equilibrium is subjected to a change (in concentration, temperature, or pressure), the equilibrium shifts in the direction that tends to minimise or oppose the effect of the change.', year: 'Oct/Nov 2022 P1' },
          { q: 'Describe how to measure the rate of reaction between marble chips and hydrochloric acid.', a: 'Method 1: measure volume of CO₂ gas produced (using gas syringe) at regular intervals. Method 2: measure mass loss as CO₂ escapes (using a balance). Plot volume/mass vs time — the steeper the gradient initially, the faster the rate. Experiment can be repeated varying chip size, acid concentration, or temperature.', year: 'May/June 2023 P3' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Reaction_rate'
      },
      {
        id: 'acids-bases',
        name: 'Acids, Bases & Salts',
        syllabusRef: '8.1',
        section: 'Reactions',
        description: 'Acids produce H⁺ ions in solution (pH < 7). Bases accept H⁺ ions (proton acceptors). Alkalis are soluble bases producing OH⁻ ions (pH > 7). Neutralisation: acid + base → salt + water. Salts are prepared by reactions of acids with metals, metal oxides, carbonates, or hydroxides.',
        svgKey: 'chem-acids-bases',
        landmarks: ['pH scale (0-14)', 'Acidic (pH < 7)', 'Neutral (pH 7)', 'Alkaline (pH > 7)', 'Neutralisation', 'Universal indicator', 'Strong/weak acids', 'Salt preparation', 'Titration'],
        examQA: [
          { q: 'Describe how to prepare a pure dry sample of copper sulfate by reacting copper oxide with sulfuric acid.', a: '1. Add excess copper oxide to warm dilute sulfuric acid — stir until no more dissolves. 2. Filter off excess copper oxide. 3. Heat the filtrate gently to evaporate most water — a saturated solution forms. 4. Leave to cool and crystallise. 5. Filter and dry the crystals between filter paper.', year: 'May/June 2022 P3' },
          { q: 'What is the difference between a strong acid and a weak acid?', a: 'A strong acid fully dissociates (ionises) into ions in solution — e.g., HCl → H⁺ + Cl⁻. A weak acid only partially dissociates, establishing an equilibrium — e.g., CH₃COOH ⇌ CH₃COO⁻ + H⁺. At the same concentration, a strong acid has a lower pH and higher [H⁺].', year: 'Oct/Nov 2022 P2' },
          { q: 'Describe how titration is used to find the volume of acid needed to neutralise an alkali.', a: 'Fill burette with acid. Pipette a fixed volume of alkali into a conical flask. Add a few drops of indicator (e.g., phenolphthalein). Slowly add acid from burette, swirling constantly. Stop at the endpoint (indicator colour change). Record the volume of acid used (titre). Repeat for concordant results.', year: 'May/June 2021 P3' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Acid'
      },
      {
        id: 'periodic-table',
        name: 'The Periodic Table',
        syllabusRef: '9.1',
        section: 'States & Structure',
        description: 'The Periodic Table organises elements by increasing atomic number. Elements in the same group have the same number of outer electrons and similar chemical properties. Properties change across periods. Key groups: Group 1 (alkali metals), Group 7 (halogens), Group 0 (noble gases).',
        svgKey: 'chem-periodic-table',
        landmarks: ['Periods (horizontal rows)', 'Groups (vertical columns)', 'Group 1 (alkali metals)', 'Group 7 (halogens)', 'Group 0 (noble gases)', 'Transition metals', 'Metallic character', 'Atomic radius trend', 'Electronegativity'],
        examQA: [
          { q: 'Describe the trend in reactivity down Group 1 (alkali metals).', a: 'Reactivity increases down Group 1. As you go down, each successive element has more electron shells, so the outer electron is further from the nucleus. Shielding by inner electrons increases. Therefore the outer electron is more easily lost (ionisation energy decreases). The element is more reactive.', year: 'May/June 2022 P2' },
          { q: 'Describe the trend in reactivity down Group 7 (halogens).', a: 'Reactivity decreases down Group 7. Each element gains one electron during reactions. As you go down, the outer shell is further from nucleus with more shielding — so the element is less able to attract an extra electron. Less reactive — harder to gain that electron.', year: 'Oct/Nov 2022 P2' },
          { q: 'Explain why noble gases are unreactive.', a: 'Noble gases (Group 0) have a full outer electron shell (2 electrons for He, 8 for others). This is a stable configuration so they have no tendency to lose, gain, or share electrons. Therefore they do not form chemical bonds and exist as monatomic gases.', year: 'May/June 2023 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Periodic_table'
      },
      {
        id: 'metals',
        name: 'Metals',
        syllabusRef: '10.1',
        section: 'States & Structure',
        description: 'Metals have typical properties: high melting/boiling points, good conductors of heat and electricity, malleable, ductile, shiny. The reactivity series ranks metals by reactivity. More reactive metals displace less reactive ones from solutions. Iron rusts by oxidation in the presence of both oxygen and water.',
        svgKey: 'chem-metals',
        landmarks: ['Reactivity series (K Na Ca Mg Al Zn Fe Pb Cu Au)', 'Displacement reaction', 'Corrosion/rusting', 'Sacrificial protection', 'Galvanising', 'Alloys', 'Extraction by reduction (Fe) or electrolysis (Al)', 'Transition metals'],
        examQA: [
          { q: 'Explain why iron is extracted by reduction with coke (carbon) but aluminium is extracted by electrolysis.', a: 'Aluminium is more reactive than carbon — it cannot be displaced from its ore by carbon, so electrolysis is needed. Iron is less reactive than carbon — it can be reduced by carbon monoxide from burning coke in the blast furnace. Electrolysis is more expensive (high electricity cost) so it is only used when carbon reduction cannot work.', year: 'May/June 2022 P4' },
          { q: 'State the conditions needed for iron to rust.', a: 'Both oxygen (from air) and water must be present simultaneously. Neither alone causes rusting. Iron is oxidised to form hydrated iron(III) oxide (rust). Salt water accelerates rusting by increasing electrical conductivity.', year: 'Oct/Nov 2022 P1' },
          { q: 'Why does zinc protect iron from rusting when used as a sacrificial metal?', a: 'Zinc is more reactive than iron. Even if scratched, the zinc corrodes preferentially — zinc is oxidised instead of iron. Zinc acts as a sacrificial anode and protects the iron even if not completely coating it. This is called sacrificial protection.', year: 'May/June 2023 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Metal'
      },
      {
        id: 'air-water',
        name: 'Air & Water (Environmental Chemistry)',
        syllabusRef: '11.1',
        section: 'Environmental Chemistry',
        description: 'The atmosphere is approximately 78% nitrogen, 21% oxygen, 0.04% carbon dioxide, and trace gases. Water is essential for life — it is a good solvent, has a high specific heat capacity, and is abundant. Pollution threatens water quality (heavy metals, fertilisers) and air quality (SO₂, NOₓ, CO).',
        svgKey: 'chem-air-water',
        landmarks: ['N₂ (78%)', 'O₂ (21%)', 'CO₂ (0.04%)', 'Water cycle', 'Greenhouse effect', 'SO₂ (acid rain)', 'NOₓ (photochemical smog)', 'CO (incomplete combustion)', 'Ozone layer (CFCs)'],
        examQA: [
          { q: 'Explain how sulfur dioxide causes acid rain.', a: 'Sulfur dioxide (from burning fossil fuels) dissolves in rain water and reacts with oxygen and water to form sulfuric acid (H₂SO₄). This lowers the pH of rain (acid rain). Acid rain damages buildings (limestone/marble), kills fish in lakes, harms trees and vegetation.', year: 'May/June 2022 P2' },
          { q: 'Describe the test for water purity.', a: 'Test 1: Add anhydrous copper sulfate (white powder) — turns blue if water present (CuSO₄ + 5H₂O → CuSO₄·5H₂O). Test 2: Check that the boiling point is exactly 100°C and freezing point is exactly 0°C — impurities raise boiling point and lower freezing point.', year: 'Oct/Nov 2022 P1' },
          { q: 'State two reasons why water is described as a good solvent.', a: 'Water is polar — the oxygen atom is slightly negative (δ−) and hydrogen atoms are slightly positive (δ+). This polarity allows it to surround and separate ionic compounds (dissolve salts). It can also form hydrogen bonds with polar molecules. It dissolves a wide range of substances.', year: 'May/June 2023 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Atmosphere_of_Earth'
      },
      {
        id: 'sulfur-chemistry',
        name: 'Sulfur Chemistry',
        syllabusRef: '12.1',
        section: 'Environmental Chemistry',
        description: 'Sulfur is a yellow solid non-metal. Sulfur dioxide (SO₂) causes acid rain. The Contact Process manufactures sulfuric acid: sulfur is burned to SO₂, catalytically oxidised to SO₃ (vanadium pentoxide catalyst), then absorbed in concentrated H₂SO₄. Sulfuric acid is a major industrial chemical.',
        svgKey: 'chem-sulfur',
        landmarks: ['Sulfur (S₈)', 'Sulfur dioxide (SO₂)', 'Sulfur trioxide (SO₃)', 'Contact Process', 'Vanadium(V) oxide catalyst', 'Sulfuric acid (H₂SO₄)', 'Industrial uses', 'Acid rain from SO₂'],
        examQA: [
          { q: 'Outline the Contact Process for making sulfuric acid.', a: '1. Burn sulfur in air: S + O₂ → SO₂. 2. Catalytically oxidise SO₂: 2SO₂ + O₂ ⇌ 2SO₃ (V₂O₅ catalyst, 450°C, 1-2 atm). 3. Absorb SO₃ in concentrated H₂SO₄ to form oleum: SO₃ + H₂SO₄ → H₂S₂O₇. 4. Dilute oleum with water: H₂S₂O₇ + H₂O → 2H₂SO₄.', year: 'May/June 2022 P4' },
          { q: 'Why is the temperature kept at around 450°C in the Contact Process?', a: 'The forward reaction is exothermic. Higher temperatures give a faster rate but lower equilibrium yield (equilibrium shifts left). Lower temperatures give a better yield but rate is too slow to be economical. 450°C is a compromise — a good yield (about 98%) at an acceptable rate.', year: 'Oct/Nov 2022 P4' },
          { q: 'State two large-scale uses of sulfuric acid.', a: 'Manufacturing fertilisers (ammonium sulfate, superphosphate). Production of detergents/soaps. Car battery acid. Manufacture of paints, plastics, dyes. Refining petroleum. Any two valid uses accepted.', year: 'May/June 2021 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Sulfur'
      },
      {
        id: 'carbonates',
        name: 'Carbonates',
        syllabusRef: '13.1',
        section: 'Reactions',
        description: 'Carbonates contain the CO₃²⁻ ion. Metal carbonates decompose on heating to form metal oxides and carbon dioxide (thermal decomposition). Carbonates react with acids to produce a salt, water, and carbon dioxide. Limestone (CaCO₃) is industrially important for cement and glass making.',
        svgKey: 'chem-carbonates',
        landmarks: ['Carbonate ion (CO₃²⁻)', 'Thermal decomposition', 'CaCO₃ → CaO + CO₂', 'Limewater test (CO₂)', 'CaO + H₂O → Ca(OH)₂', 'Limestone uses', 'Acid + carbonate → salt + water + CO₂'],
        examQA: [
          { q: 'Describe the test for carbon dioxide gas.', a: 'Bubble the gas through limewater (calcium hydroxide solution). If CO₂ is present, limewater turns milky/cloudy white. Reaction: Ca(OH)₂ + CO₂ → CaCO₃ + H₂O. The white precipitate is calcium carbonate.', year: 'May/June 2022 P1' },
          { q: 'Write a balanced equation for the thermal decomposition of calcium carbonate.', a: 'CaCO₃ → CaO + CO₂. Calcium carbonate (limestone) is heated strongly. It decomposes to form calcium oxide (quicklime) and carbon dioxide gas. This is an endothermic reaction.', year: 'Oct/Nov 2022 P2' },
          { q: 'State two uses of limestone and its products.', a: 'Limestone (CaCO₃): building material, cement production (heated with clay), glass making. Calcium oxide (CaO/quicklime): neutralising acidic soils, making calcium hydroxide. Calcium hydroxide (slaked lime): neutralising acidic soils/water, making mortar. Any two uses accepted.', year: 'May/June 2023 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Carbonate'
      },
      {
        id: 'organic-chemistry',
        name: 'Organic Chemistry',
        syllabusRef: '14.1',
        section: 'Organic Chemistry',
        description: 'Organic chemistry is the chemistry of carbon compounds. Homologous series share general formulas and properties: alkanes (CₙH₂ₙ₊₂, saturated), alkenes (CₙH₂ₙ, unsaturated, double bond), alcohols (–OH group), carboxylic acids (–COOH). Isomerism occurs when molecules have the same molecular formula but different structural arrangements.',
        svgKey: 'chem-organic',
        landmarks: ['Alkanes (saturated)', 'Alkenes (unsaturated)', 'Alcohols (–OH)', 'Carboxylic acids (–COOH)', 'Homologous series', 'Isomers', 'Combustion', 'Substitution (alkanes)', 'Addition (alkenes)', 'Esterification'],
        examQA: [
          { q: 'Describe the test to distinguish an alkane from an alkene.', a: 'Add bromine water (orange/yellow). Alkene decolourises bromine water immediately (orange → colourless) because the C=C double bond undergoes addition reaction with Br₂. Alkane does not decolourise bromine water in the absence of UV light — it is saturated and unreactive.', year: 'May/June 2022 P2' },
          { q: 'Describe what is meant by cracking and state why it is important.', a: 'Cracking breaks down large alkane molecules (from fractional distillation of crude oil) into smaller, more useful molecules. It requires heat (thermal cracking) or a catalyst (catalytic cracking). It produces alkenes (used for making polymers) and smaller alkanes for petrol — matching supply to demand.', year: 'Oct/Nov 2022 P4' },
          { q: 'Name the type of reaction and describe what happens when ethene reacts with steam to form ethanol.', a: 'Addition reaction (also called hydration). The double bond in ethene (C=C) breaks. A water molecule (steam) adds across the double bond. Ethene + water (steam) → ethanol: C₂H₄ + H₂O → C₂H₅OH. Requires a phosphoric acid catalyst at 300°C, 60 atm.', year: 'May/June 2023 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Organic_chemistry'
      },
      {
        id: 'polymers',
        name: 'Polymers',
        syllabusRef: '15.1',
        section: 'Organic Chemistry',
        description: 'Polymers are large molecules made from repeating monomer units. Addition polymerisation joins monomers with C=C bonds (alkenes) without forming by-products. Condensation polymerisation joins monomers with –OH and –COOH groups, releasing water. Nylon and polyesters are condensation polymers.',
        svgKey: 'chem-polymers',
        landmarks: ['Monomer', 'Polymer', 'Addition polymerisation (alkenes)', 'Poly(ethene)', 'Poly(propene)', 'Condensation polymerisation', 'Nylon (polyamide)', 'Polyester', 'Repeat unit', 'Biodegradable vs non-biodegradable'],
        examQA: [
          { q: 'Draw the displayed structure of the repeat unit of poly(ethene).', a: 'Poly(ethene) is made from ethene monomers (CH₂=CH₂). The repeat unit is: –CH₂–CH₂– (two carbon atoms each with two hydrogen atoms, connected by a single bond, with open bonds on either end indicating continuation of the chain).', year: 'May/June 2022 P2' },
          { q: 'State the difference between addition and condensation polymerisation.', a: 'Addition polymerisation: monomers with C=C double bonds join together — the double bond opens and monomers link in a chain. No atoms are lost — single product formed. Condensation polymerisation: monomers with two functional groups join, releasing small molecules (usually water) as a by-product at each link.', year: 'Oct/Nov 2022 P4' },
          { q: 'State one environmental problem caused by non-biodegradable plastics.', a: 'Non-biodegradable plastics (e.g., poly(ethene)) persist in the environment for hundreds of years because microorganisms cannot break them down. They accumulate in oceans and land, harming wildlife (ingestion, entanglement). They are difficult to dispose of — burning releases toxic gases; landfill wastes space.', year: 'May/June 2023 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Polymer'
      },
      {
        id: 'lab-techniques',
        name: 'Experimental Techniques & Analysis',
        syllabusRef: '16.1',
        section: 'Lab Techniques',
        description: 'Key experimental techniques include filtration (separating insoluble solids), evaporation and crystallisation (obtaining salts), distillation (separating miscible liquids by boiling point), chromatography (separating mixtures by Rf values), and identification of ions by flame tests and precipitation reactions.',
        svgKey: 'chem-lab-techniques',
        landmarks: ['Filtration', 'Crystallisation', 'Distillation', 'Fractional distillation', 'Chromatography (Rf value)', 'Flame tests', 'Precipitation reactions', 'Centrifugation', 'pH indicators'],
        examQA: [
          { q: 'Describe how fractional distillation separates crude oil.', a: 'Crude oil is heated and vapourised. Vapour enters the fractionating column (hot at bottom, cool at top). Different fractions condense at different heights where temperature matches their boiling point. Shorter chain hydrocarbons (lower BP) rise higher and are collected at the top; longer chains condense lower down. Fractions are collected via side outlets.', year: 'May/June 2022 P4' },
          { q: 'Calculate the Rf value for a spot in chromatography if it travelled 6 cm and the solvent front travelled 10 cm.', a: 'Rf = distance moved by spot ÷ distance moved by solvent front = 6 ÷ 10 = 0.6. Rf values range from 0 to 1.0 and are used to identify substances by comparing with known Rf values under the same conditions.', year: 'Oct/Nov 2022 P3' },
          { q: 'State the flame test colour for potassium ions.', a: 'Potassium (K⁺): lilac/purple flame. Also: sodium (Na⁺) → yellow/orange; lithium (Li⁺) → red; calcium (Ca²⁺) → orange-red; copper (Cu²⁺) → green/blue-green. Use a clean platinum/nichrome wire dipped in acid then the sample.', year: 'May/June 2023 P1' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Laboratory_techniques'
      }
    ]
  },

  /* ================================================================
     CAMBRIDGE IGCSE PHYSICS  0625
  ================================================================ */
  cambridge_igcse_physics: {
    subjectName: 'Cambridge IGCSE Physics',
    examCode: '0625',
    sections: ['All', 'Forces & Motion', 'Energy', 'Thermal Physics', 'Waves', 'Electricity & Magnetism', 'Nuclear & Space'],
    topics: [
      {
        id: 'measurements',
        name: 'Measurements & Units',
        syllabusRef: '1.1',
        section: 'Forces & Motion',
        description: 'Physics relies on precise measurements using SI units. Scalar quantities have magnitude only (e.g., speed, mass); vector quantities have magnitude and direction (e.g., velocity, force). Significant figures indicate precision. Systematic and random errors affect measurement accuracy and precision.',
        svgKey: 'phys-measurements',
        landmarks: ['SI units (kg, m, s, A, K)', 'Scalar vs vector', 'Accuracy vs precision', 'Systematic error', 'Random error', 'Significant figures', 'Vernier calipers', 'Micrometer'],
        examQA: [
          { q: 'State the difference between a scalar quantity and a vector quantity.', a: 'A scalar quantity has magnitude (size) only — e.g., speed, mass, temperature, time, energy. A vector quantity has both magnitude and direction — e.g., velocity, force, acceleration, momentum, displacement.', year: 'May/June 2022 P1' },
          { q: 'Describe the difference between systematic and random errors.', a: 'Systematic error consistently shifts all measurements in the same direction (e.g., zero error in a balance, calibration error). It affects accuracy. Random error causes unpredictable variation in readings around the true value (e.g., reaction time, reading a scale). It affects precision. Systematic errors cannot be reduced by repeating; random errors can be reduced by averaging repeated readings.', year: 'Oct/Nov 2022 P2' },
          { q: 'A student measures a length as 12.5 cm. State this measurement in SI units.', a: 'SI unit of length is the metre (m). 12.5 cm = 0.125 m. Other conversions: 1 km = 1000 m; 1 mm = 0.001 m; 1 nm = 10⁻⁹ m. Area in m², volume in m³.', year: 'May/June 2021 P1' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/International_System_of_Units'
      },
      {
        id: 'motion',
        name: 'Motion (Speed, Velocity, Acceleration)',
        syllabusRef: '2.1',
        section: 'Forces & Motion',
        description: 'Speed is distance/time; velocity is displacement/time (vector). Acceleration = change in velocity/time. Distance-time graphs: gradient = speed. Velocity-time graphs: gradient = acceleration; area under graph = distance. Uniform acceleration is described by the equations of motion (SUVAT).',
        svgKey: 'phys-motion',
        landmarks: ['Speed (m/s)', 'Velocity (m/s, vector)', 'Acceleration (m/s²)', 'Distance-time graph', 'Velocity-time graph', 'Gradient (slope)', 'Area under v-t graph = distance', 'SUVAT equations', 'Terminal velocity'],
        examQA: [
          { q: 'A car accelerates from rest to 20 m/s in 8 s. Calculate its acceleration.', a: 'Acceleration = change in velocity ÷ time = (20 − 0) ÷ 8 = 2.5 m/s². The car accelerates at 2.5 m/s² (increases in speed by 2.5 m/s every second).', year: 'May/June 2022 P2' },
          { q: 'Describe the motion shown by a horizontal line on a velocity-time graph.', a: 'A horizontal line on a v-t graph means velocity is constant (not changing). The gradient is zero, so acceleration = 0. The object is moving at constant velocity (uniform motion). The distance travelled = velocity × time = area of rectangle under the line.', year: 'Oct/Nov 2022 P1' },
          { q: 'Explain why a skydiver reaches terminal velocity.', a: 'As the skydiver falls, speed increases — air resistance increases (proportional to speed²). Initially weight > air resistance so acceleration exists. As speed increases, air resistance equals weight — net force = 0. Acceleration = 0. Constant (terminal) velocity reached. Opening parachute increases surface area → more air resistance → decelerates to new, lower terminal velocity.', year: 'May/June 2023 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Motion'
      },
      {
        id: 'forces',
        name: 'Forces & Newton\'s Laws',
        syllabusRef: '3.1',
        section: 'Forces & Motion',
        description: 'Newton\'s three laws govern motion: 1st — an object remains at rest or moves at constant velocity unless acted on by a resultant force; 2nd — F = ma; 3rd — every action has an equal and opposite reaction. Friction, weight, normal reaction, and tension are common forces. Moments (torques) cause rotation.',
        svgKey: 'phys-forces',
        landmarks: ['Newton\'s 1st law (inertia)', 'Newton\'s 2nd law (F=ma)', 'Newton\'s 3rd law (action-reaction)', 'Weight = mg', 'Normal reaction', 'Friction', 'Resultant force', 'Free body diagram', 'Moment = F × d'],
        examQA: [
          { q: 'State Newton\'s second law of motion.', a: 'The resultant force on an object is directly proportional to and in the same direction as its acceleration. F = ma, where F = resultant force (N), m = mass (kg), a = acceleration (m/s²).', year: 'May/June 2022 P1' },
          { q: 'Calculate the resultant force needed to accelerate a 1200 kg car at 3 m/s².', a: 'F = ma = 1200 × 3 = 3600 N in the direction of acceleration.', year: 'Oct/Nov 2022 P1' },
          { q: 'Explain using Newton\'s first law why passengers lurch forward when a bus brakes suddenly.', a: 'Before braking, passengers and bus are both moving forward. When the bus brakes, a backward force is applied to the bus only. According to Newton\'s 1st law, the passengers (no horizontal force applied directly to them) tend to continue moving forward at their original velocity — they lurch forward relative to the bus.', year: 'May/June 2023 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion'
      },
      {
        id: 'momentum',
        name: 'Momentum',
        syllabusRef: '4.1',
        section: 'Forces & Motion',
        description: 'Momentum = mass × velocity. The law of conservation of momentum states that the total momentum in a closed system remains constant when no external force acts. Impulse = force × time = change in momentum. Collisions can be elastic (KE conserved) or inelastic (KE not conserved).',
        svgKey: 'phys-momentum',
        landmarks: ['Momentum p = mv', 'Conservation of momentum', 'Impulse = Ft = Δp', 'Elastic collision', 'Inelastic collision', 'Collisions in one dimension', 'Explosions (recoil)'],
        examQA: [
          { q: 'A 2 kg ball moving at 5 m/s collides with a stationary 3 kg ball. They stick together. Calculate their common velocity after collision.', a: 'Conservation of momentum: total p before = total p after. (2×5) + (3×0) = (2+3)×v. 10 = 5v. v = 2 m/s in the direction the 2 kg ball was originally moving.', year: 'May/June 2022 P2' },
          { q: 'State the law of conservation of momentum.', a: 'The total momentum of a system of objects remains constant (is conserved) provided no external resultant force acts on the system. Momentum is conserved in all collisions and explosions.', year: 'Oct/Nov 2022 P1' },
          { q: 'Explain how airbags in cars reduce injury in a crash.', a: 'Airbags increase the time over which momentum changes to zero. Since impulse = F × t = Δp, if time t increases but Δp (change in momentum) remains the same, the force F on the body must decrease. Smaller force → less injury. The airbag spreads the force over a longer time.', year: 'May/June 2023 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Momentum'
      },
      {
        id: 'energy-work-power',
        name: 'Energy, Work & Power',
        syllabusRef: '5.1',
        section: 'Energy',
        description: 'Work done = force × distance (in direction of force). Energy is the capacity to do work. Kinetic energy = ½mv²; gravitational potential energy = mgh. The principle of conservation of energy states that energy cannot be created or destroyed — only transferred or transformed. Power = work done/time.',
        svgKey: 'phys-energy',
        landmarks: ['Work done W = Fd', 'Kinetic energy KE = ½mv²', 'Gravitational PE = mgh', 'Conservation of energy', 'Power P = W/t (watts)', 'Efficiency = useful output/total input', 'Joule (unit)', 'Energy transformations'],
        examQA: [
          { q: 'Calculate the kinetic energy of a 50 kg cyclist moving at 8 m/s.', a: 'KE = ½mv² = ½ × 50 × 8² = ½ × 50 × 64 = 1600 J.', year: 'May/June 2022 P2' },
          { q: 'Calculate the efficiency of a motor that does 450 J of useful work from 600 J of electrical energy input.', a: 'Efficiency = useful energy output / total energy input = 450/600 = 0.75. As a percentage: 75%. The remaining 25% (150 J) is wasted as heat due to friction, electrical resistance, etc.', year: 'Oct/Nov 2022 P2' },
          { q: 'State the principle of conservation of energy.', a: 'Energy cannot be created or destroyed — it can only be transferred from one form to another or converted between types. The total energy in a closed system remains constant. All energy input equals all useful energy output plus energy wasted (usually as heat).', year: 'May/June 2021 P1' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Conservation_of_energy'
      },
      {
        id: 'pressure',
        name: 'Pressure',
        syllabusRef: '6.1',
        section: 'Forces & Motion',
        description: 'Pressure = force/area. In fluids, pressure increases with depth (P = ρgh). Atmospheric pressure decreases with altitude. Gas pressure is caused by molecular collisions with container walls. Pascal\'s principle states that pressure in a fluid is transmitted equally in all directions.',
        svgKey: 'phys-pressure',
        landmarks: ['Pressure P = F/A (Pa)', 'Fluid pressure P = ρgh', 'Atmospheric pressure (≈101 kPa)', 'Manometer', 'Barometer', 'Hydraulic systems', 'Pascal\'s principle', 'Archimedes\' principle'],
        examQA: [
          { q: 'Calculate the pressure exerted by a box of weight 300 N on a surface of area 0.6 m².', a: 'Pressure = Force ÷ Area = 300 ÷ 0.6 = 500 Pa (pascals, N/m²).', year: 'May/June 2022 P1' },
          { q: 'Explain why pressure increases with depth in a liquid.', a: 'Deeper in the liquid, there is a greater column of liquid above that point. The weight of this liquid pushes down. More weight per unit area means more force per unit area at greater depth. P = ρgh: pressure depends on density (ρ), gravitational field strength (g), and depth (h).', year: 'Oct/Nov 2022 P2' },
          { q: 'Explain the principle of a hydraulic brake system.', a: 'A small force is applied to the brake pedal (small area piston). This creates pressure in the brake fluid: P = F/A. By Pascal\'s principle, this pressure is transmitted equally throughout the fluid. The pressure acts on larger area pistons at the brake pads, producing a larger force (F = P × A). Small input force → large output force.', year: 'May/June 2023 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Pressure'
      },
      {
        id: 'thermal-physics',
        name: 'Thermal Physics',
        syllabusRef: '7.1',
        section: 'Thermal Physics',
        description: 'Temperature measures the average kinetic energy of particles. Heat is thermal energy transfer. Specific heat capacity (c) is energy needed to raise 1 kg of substance by 1 K. Specific latent heat is energy for change of state. Heat transfers by conduction, convection, and radiation.',
        svgKey: 'phys-thermal',
        landmarks: ['Temperature (°C / K)', 'Specific heat capacity c', 'Specific latent heat L', 'Conduction', 'Convection (currents)', 'Radiation (IR)', 'Absolute zero (0 K = −273°C)', 'Thermal expansion', 'Kinetic theory'],
        examQA: [
          { q: 'Calculate the energy needed to heat 2 kg of water from 20°C to 70°C. (c = 4200 J/kg·K)', a: 'Q = mcΔT = 2 × 4200 × (70-20) = 2 × 4200 × 50 = 420,000 J = 420 kJ.', year: 'May/June 2022 P2' },
          { q: 'Explain why metals feel colder than wood at the same room temperature.', a: 'Both are at room temperature — they have the same temperature. However metals are good thermal conductors. When you touch metal, heat flows rapidly from your hand to the metal (high rate of conduction). The rapid heat loss from your hand feels cold. Wood is a poor conductor (insulator) — heat transfer to wood is slow — it feels less cold.', year: 'Oct/Nov 2022 P4' },
          { q: 'Describe how thermal energy is transferred by convection in a liquid.', a: 'Fluid near a heat source warms up. It expands, becomes less dense and rises. Cooler, denser fluid sinks to take its place near the heat source. This sets up a convection current — a continuous circular flow that transfers thermal energy throughout the fluid.', year: 'May/June 2023 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Thermal_physics'
      },
      {
        id: 'waves',
        name: 'Properties of Waves',
        syllabusRef: '8.1',
        section: 'Waves',
        description: 'Waves transfer energy without transferring matter. Transverse waves oscillate perpendicular to the direction of travel (e.g., light, water waves); longitudinal waves oscillate parallel (e.g., sound). Key properties: frequency (Hz), wavelength (m), amplitude, and speed. Wave equation: v = fλ.',
        svgKey: 'phys-waves',
        landmarks: ['Transverse vs longitudinal', 'Amplitude', 'Wavelength (λ)', 'Frequency (f, Hz)', 'Period (T = 1/f)', 'Wave speed v = fλ', 'Reflection', 'Refraction', 'Diffraction'],
        examQA: [
          { q: 'A wave has frequency 250 Hz and wavelength 1.4 m. Calculate its speed.', a: 'v = fλ = 250 × 1.4 = 350 m/s (this is approximately the speed of sound in air at room temperature).', year: 'May/June 2022 P2' },
          { q: 'State the difference between transverse and longitudinal waves.', a: 'Transverse waves: oscillations are perpendicular (at right angles) to the direction of wave travel — e.g., light, microwaves, water surface waves. Longitudinal waves: oscillations are parallel to the direction of wave travel (compressions and rarefactions) — e.g., sound, seismic P-waves.', year: 'Oct/Nov 2022 P1' },
          { q: 'Describe what happens when a wave is refracted.', a: 'Refraction occurs when a wave enters a different medium and changes speed. The frequency stays the same but the wavelength changes. If the wave slows down, it bends toward the normal; if it speeds up, it bends away from the normal. The change in direction is refraction.', year: 'May/June 2023 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Wave'
      },
      {
        id: 'light',
        name: 'Light (Reflection, Refraction & Lenses)',
        syllabusRef: '9.1',
        section: 'Waves',
        description: 'Light travels in straight lines and reflects according to the law of reflection (angle of incidence = angle of reflection). Refraction occurs at boundaries between media with different optical densities. Lenses converge (convex) or diverge (concave) light. Total internal reflection occurs when the angle exceeds the critical angle.',
        svgKey: 'phys-light',
        landmarks: ['Law of reflection', 'Snell\'s law (n = sin i / sin r)', 'Refractive index', 'Critical angle', 'Total internal reflection', 'Convex lens (converging)', 'Concave lens (diverging)', 'Optical fibre'],
        examQA: [
          { q: 'State the law of reflection.', a: 'The angle of incidence equals the angle of reflection. Both angles are measured from the normal (a line perpendicular to the surface at the point of incidence). The incident ray, reflected ray, and normal all lie in the same plane.', year: 'May/June 2022 P1' },
          { q: 'Explain total internal reflection and state one application.', a: 'When light in a denser medium hits a boundary with a less dense medium at an angle greater than the critical angle, all light is reflected back — none is refracted through. This is total internal reflection. Application: optical fibres use TIR to transmit light signals in telecommunications and endoscopes for medical imaging.', year: 'Oct/Nov 2022 P4' },
          { q: 'A glass block has refractive index 1.5. Calculate the critical angle.', a: 'sin(c) = 1/n = 1/1.5 = 0.667. c = sin⁻¹(0.667) = 41.8° ≈ 42°. At angles greater than 42°, total internal reflection occurs at the glass-air boundary.', year: 'May/June 2023 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Optics'
      },
      {
        id: 'em-spectrum',
        name: 'Electromagnetic Spectrum',
        syllabusRef: '10.1',
        section: 'Waves',
        description: 'The electromagnetic spectrum is a family of transverse waves that all travel at 3×10⁸ m/s in a vacuum. In order of increasing frequency (decreasing wavelength): radio → microwave → infrared → visible light → UV → X-rays → gamma rays. Each has distinct properties and applications.',
        svgKey: 'phys-em-spectrum',
        landmarks: ['Radio waves (TV, radio)', 'Microwaves (cooking, mobile)', 'Infrared (IR) (heating, remote)', 'Visible light (sight)', 'Ultraviolet (UV) (tanning, sterilisation)', 'X-rays (medical imaging)', 'Gamma rays (cancer treatment)'],
        examQA: [
          { q: 'State one property shared by all electromagnetic waves.', a: 'All electromagnetic waves: travel at the same speed in vacuum (3×10⁸ m/s = speed of light); are transverse waves; can travel through a vacuum; transfer energy; obey the wave equation v = fλ.', year: 'May/June 2022 P1' },
          { q: 'State one use and one harmful effect of ultraviolet radiation.', a: 'Use: sterilisation of water/food, stimulating vitamin D production in skin, detecting forged banknotes (UV ink), fluorescent lighting. Harmful effect: UV damages DNA causing mutations leading to skin cancer; causes sunburn; damages eyes leading to cataracts.', year: 'Oct/Nov 2022 P1' },
          { q: 'Explain why X-rays are used in medical imaging but visible light is not.', a: 'X-rays have much shorter wavelengths and higher frequencies — they can penetrate soft tissue but are absorbed by denser bone. Visible light cannot penetrate the body at all. X-rays produce images showing internal structures (bones, organs). However X-rays are ionising — they can damage cells and DNA, so exposure is minimised.', year: 'May/June 2023 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Electromagnetic_spectrum'
      },
      {
        id: 'sound',
        name: 'Sound',
        syllabusRef: '11.1',
        section: 'Waves',
        description: 'Sound is a longitudinal mechanical wave produced by vibrating objects. It requires a medium to travel — it cannot travel through a vacuum. Speed of sound in air ≈ 340 m/s (much slower than light). Frequency determines pitch; amplitude determines loudness. Ultrasound (>20,000 Hz) is used in medicine and sonar.',
        svgKey: 'phys-sound',
        landmarks: ['Longitudinal wave', 'Compressions and rarefactions', 'Audible range (20 Hz – 20 kHz)', 'Ultrasound (>20 kHz)', 'Pitch (frequency)', 'Loudness (amplitude)', 'Speed in air (~340 m/s)', 'Echo (reflection)', 'Sonar'],
        examQA: [
          { q: 'Explain why sound cannot travel through outer space.', a: 'Sound is a mechanical wave — it requires a medium (solid, liquid, or gas) to propagate. Sound travels by vibrating particles which pass energy to neighbouring particles. In outer space there is a vacuum (no particles) so there is nothing to vibrate and transmit the sound wave.', year: 'May/June 2022 P2' },
          { q: 'Describe how ultrasound is used to measure the depth of the sea.', a: 'A pulse of ultrasound is emitted from a ship downward. The pulse reflects off the seabed. The reflected pulse (echo) is detected. The time between emission and detection (t) is measured. Depth = v×t/2 (divide by 2 because sound travels to seabed AND back). v is the speed of sound in seawater (~1500 m/s).', year: 'Oct/Nov 2022 P4' },
          { q: 'State the frequency range of human hearing.', a: 'Humans can hear sounds with frequencies from approximately 20 Hz to 20,000 Hz (20 kHz). Frequencies below 20 Hz are infrasound; above 20 kHz are ultrasound. The range decreases with age.', year: 'May/June 2021 P1' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Sound'
      },
      {
        id: 'magnetism',
        name: 'Magnetism',
        syllabusRef: '12.1',
        section: 'Electricity & Magnetism',
        description: 'Magnetic materials (iron, steel, nickel, cobalt) are attracted to magnets. Permanent magnets retain magnetism; soft iron cores are temporary. Magnetic field lines run from N to S pole outside the magnet. An electric current produces a magnetic field — this is the basis of electromagnets and electric motors.',
        svgKey: 'phys-magnetism',
        landmarks: ['Magnetic field lines (N→S)', 'North and south poles', 'Like poles repel, unlike attract', 'Induced magnetism', 'Electromagnet', 'Right-hand rule', 'Solenoid field', 'Magnetic materials (Fe, Ni, Co)'],
        examQA: [
          { q: 'Describe the pattern of magnetic field lines around a bar magnet.', a: 'Field lines emerge from the North pole and re-enter at the South pole (outside the magnet). They form closed loops. Lines are closest together (most concentrated) at the poles where field is strongest. Lines never cross. Inside the magnet, field lines go from S to N.', year: 'May/June 2022 P3' },
          { q: 'State two ways to increase the strength of an electromagnet.', a: 'Increase the current through the coil. Increase the number of turns in the coil. Add a soft iron core inside the coil (greatly increases field strength by concentrating field lines). Any two methods.', year: 'Oct/Nov 2022 P1' },
          { q: 'Explain the difference between a permanent magnet and an induced magnet.', a: 'A permanent magnet (e.g., steel) produces its own magnetic field at all times — it retains its magnetism after the magnetising force is removed. An induced magnet (e.g., soft iron) becomes magnetic only when in a magnetic field — it loses magnetism when the field is removed. Soft iron makes better electromagnets; steel makes better permanent magnets.', year: 'May/June 2023 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Magnetism'
      },
      {
        id: 'electricity',
        name: 'Electricity (Charge, Current, Voltage, Resistance)',
        syllabusRef: '13.1',
        section: 'Electricity & Magnetism',
        description: 'Electric current is the rate of flow of charge (I = Q/t). Potential difference (voltage) is the energy transferred per unit charge (V = W/Q). Resistance opposes current flow (R = V/I). Ohm\'s law states that current is directly proportional to voltage at constant temperature. Power P = IV = I²R.',
        svgKey: 'phys-electricity',
        landmarks: ['Current I = Q/t (amperes)', 'Potential difference V (volts)', 'Resistance R = V/I (ohms)', 'Ohm\'s law (V = IR)', 'Power P = IV', 'Charge Q = It (coulombs)', 'Electron flow vs conventional current', 'Conductors vs insulators'],
        examQA: [
          { q: 'A bulb has resistance 10Ω and current 2A flows through it. Calculate the power.', a: 'P = I²R = 2² × 10 = 4 × 10 = 40 W. Alternatively: V = IR = 2×10 = 20 V; P = IV = 2×20 = 40 W.', year: 'May/June 2022 P2' },
          { q: 'State Ohm\'s law.', a: 'The current through a metallic conductor is directly proportional to the potential difference across it, provided the temperature remains constant. I ∝ V, or equivalently V = IR where R is constant. A graph of V against I is a straight line through the origin.', year: 'Oct/Nov 2022 P1' },
          { q: 'Explain why a thin wire has greater resistance than a thick wire of the same material and length.', a: 'Resistance is inversely proportional to the cross-sectional area of the wire. A thicker wire has a larger cross-sectional area — more conducting electrons are available to carry current, and there are more pathways. Current flows more easily, so resistance is lower. R ∝ 1/A.', year: 'May/June 2023 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Electric_current'
      },
      {
        id: 'electric-circuits',
        name: 'Electric Circuits',
        syllabusRef: '14.1',
        section: 'Electricity & Magnetism',
        description: 'In series circuits, current is the same throughout; voltages add up; total resistance = sum of individual resistances. In parallel circuits, voltage is the same across each branch; currents add up; total resistance is less than any individual resistance. Ammeters are connected in series; voltmeters in parallel.',
        svgKey: 'phys-circuits',
        landmarks: ['Series circuit', 'Parallel circuit', 'Ammeter (series)', 'Voltmeter (parallel)', 'Series R: Rtotal = R1+R2', 'Parallel: 1/Rtotal = 1/R1+1/R2', 'Kirchhoff\'s laws', 'Potential divider', 'Fuse', 'Circuit symbols'],
        examQA: [
          { q: 'Two resistors of 6Ω and 3Ω are connected in parallel. Calculate the combined resistance.', a: '1/Rtotal = 1/R1 + 1/R2 = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2. Rtotal = 2Ω. The parallel combination has lower resistance than either individual resistor (2Ω < 3Ω < 6Ω).', year: 'May/June 2022 P2' },
          { q: 'Explain why lamps connected in parallel are brighter than when connected in series (same battery).', a: 'In parallel, each lamp receives the full battery voltage. In series, the voltage is shared between the lamps — each gets a fraction. Higher voltage across each parallel lamp → more current → more power (P=IV) → brighter. Also, in series, total resistance is higher so overall current from battery is lower.', year: 'Oct/Nov 2022 P4' },
          { q: 'Describe the purpose of a fuse and explain how it works.', a: 'A fuse protects a circuit from dangerously high currents (short circuits or overloads). It contains a thin wire that melts (blows) if the current exceeds its rated value (e.g., 3A, 5A, 13A). The circuit is broken — current stops — preventing fire or damage. A fuse is always connected in series in the live wire.', year: 'May/June 2023 P2' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Electrical_network'
      },
      {
        id: 'em-effects',
        name: 'Electromagnetic Effects',
        syllabusRef: '15.1',
        section: 'Electricity & Magnetism',
        description: 'Electromagnetic induction: a changing magnetic flux through a conductor induces an EMF (Faraday\'s law). The magnitude of induced EMF depends on the rate of change of flux. Lenz\'s law gives the direction. Transformers use mutual induction to change AC voltage. Generators and motors are also electromagnetic devices.',
        svgKey: 'phys-em-effects',
        landmarks: ['Electromagnetic induction', 'Faraday\'s law', 'Lenz\'s law', 'Generator (coil rotating)', 'Transformer (step-up/step-down)', 'V_p/V_s = N_p/N_s', 'Mutual induction', 'AC generator', 'DC motor'],
        examQA: [
          { q: 'State the factors that affect the magnitude of an induced EMF in a coil.', a: 'Induced EMF increases if: rate of change of magnetic field increases (move magnet faster); number of turns in coil increases; strength of magnet increases; magnetic field is more concentrated (using an iron core).', year: 'May/June 2022 P2' },
          { q: 'A transformer has 500 turns on the primary coil and 50 turns on the secondary. Input voltage is 230 V. Find the output voltage.', a: 'V_p/V_s = N_p/N_s → 230/V_s = 500/50 = 10. V_s = 230/10 = 23 V. This is a step-down transformer — it reduces voltage by a factor of 10.', year: 'Oct/Nov 2022 P2' },
          { q: 'Explain why electrical energy is transmitted at high voltage across the National Grid.', a: 'P = I²R — higher voltage means lower current for the same power. Lower current means less power wasted as heat in cables (P_wasted = I²R). High voltage step-up transformers increase voltage before transmission; step-down transformers reduce it at the other end for safe domestic use.', year: 'May/June 2023 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Electromagnetic_induction'
      },
      {
        id: 'nuclear-physics',
        name: 'Nuclear Physics & Radioactivity',
        syllabusRef: '16.1',
        section: 'Nuclear & Space',
        description: 'The nucleus contains protons and neutrons. Unstable nuclei emit radiation: alpha (α, helium nucleus, ++, stopped by paper), beta (β, electron, +, stopped by aluminium), gamma (γ, EM wave, stopped by thick lead). Half-life is the time for half the radioactive nuclei to decay. Nuclear fission and fusion release enormous energy.',
        svgKey: 'phys-nuclear',
        landmarks: ['Alpha decay (α = ⁴₂He)', 'Beta decay (β = electron)', 'Gamma radiation (γ = EM)', 'Half-life', 'Ionising radiation', 'Background radiation', 'Nuclear fission', 'Nuclear fusion', 'Geiger-Müller tube'],
        examQA: [
          { q: 'State the nature, charge, and relative penetrating power of alpha, beta, and gamma radiation.', a: 'Alpha (α): helium nucleus (2p + 2n), charge +2, stopped by a few cm of air or thin paper — least penetrating, most ionising. Beta (β): high-speed electron, charge −1, stopped by few mm aluminium. Gamma (γ): electromagnetic wave, no charge, reduced (not stopped) by thick lead or concrete — most penetrating, least ionising.', year: 'May/June 2022 P1' },
          { q: 'A radioactive sample has a half-life of 8 days. Calculate the fraction remaining after 24 days.', a: '24 days ÷ 8 days = 3 half-lives. After each half-life, half remains: ½ → ¼ → ⅛. After 3 half-lives, 1/8 of the original activity/number of nuclei remains.', year: 'Oct/Nov 2022 P2' },
          { q: 'State the difference between nuclear fission and nuclear fusion.', a: 'Fission: a large, heavy nucleus (e.g., ²³⁵U) absorbs a neutron and splits into two smaller nuclei, releasing 2-3 neutrons and large amounts of energy. Chain reaction possible. Used in nuclear reactors. Fusion: two light nuclei (e.g., hydrogen isotopes) combine at extremely high temperatures to form a heavier nucleus, releasing even more energy per unit mass. Powers stars. Not yet commercially viable on Earth.', year: 'May/June 2023 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Radioactive_decay'
      },
      {
        id: 'space-physics',
        name: 'Space Physics',
        syllabusRef: '17.1',
        section: 'Nuclear & Space',
        description: 'Stars form from collapsing clouds of gas and dust (nebulae). The life cycle depends on mass: main sequence → red giant → white dwarf (small stars); or → red supergiant → supernova → neutron star/black hole (massive stars). The universe began with the Big Bang ~13.8 billion years ago and is expanding, evidenced by galactic redshift.',
        svgKey: 'phys-space',
        landmarks: ['Stellar life cycle', 'Main sequence star', 'Red giant/supergiant', 'White dwarf/neutron star/black hole', 'Nebula', 'Nuclear fusion in stars (H → He)', 'Galaxy and universe', 'Big Bang theory', 'Redshift', 'Hubble\'s law'],
        examQA: [
          { q: 'Describe the life cycle of a star with similar mass to our Sun.', a: 'Nebula (gas cloud) → gravitational collapse → protostar → main sequence star (hydrogen fusion, lasts billions of years) → as H runs out, core contracts and outer layers expand → red giant → outer layers shed as planetary nebula → core remains as white dwarf → slowly cools to black dwarf.', year: 'May/June 2022 P4' },
          { q: 'Explain the evidence for the Big Bang theory.', a: 'Galactic redshift: light from distant galaxies is shifted to longer (red) wavelengths — galaxies are moving away from us. The more distant the galaxy, the greater the redshift (Hubble\'s law) — universe is expanding. Microwave Background Radiation (CMB): uniform microwave radiation from all directions — thermal "echo" of the Big Bang. Both suggest the universe began from an extremely hot, dense point ~13.8 billion years ago.', year: 'Oct/Nov 2023 P4' },
          { q: 'State the source of energy in stars during their main sequence phase.', a: 'Energy in main sequence stars comes from nuclear fusion in the core. Hydrogen nuclei (protons) fuse together at extremely high temperature and pressure to form helium nuclei. This process releases enormous amounts of energy as gamma radiation (E = mc²). The outward radiation pressure balances gravity — the star is in equilibrium.', year: 'May/June 2023 P4' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Star'
      }
    ]
  }
};

// Derive the TOPIC_VISUALS key from a subject object (from Supabase subjects table)
export function getTopicVisualsKey(subj) {
  const code = (subj.exam_code || '').trim();
  if (code === '0610') return 'cambridge_igcse_biology';
  if (code === '0620') return 'cambridge_igcse_chemistry';
  if (code === '0625') return 'cambridge_igcse_physics';
  // Name-based fallback
  const name = (subj.name || '').toLowerCase();
  if (name.includes('biology')   && (name.includes('cambridge') || name.includes('igcse'))) return 'cambridge_igcse_biology';
  if (name.includes('chemistry') && (name.includes('cambridge') || name.includes('igcse'))) return 'cambridge_igcse_chemistry';
  if (name.includes('physics')   && (name.includes('cambridge') || name.includes('igcse'))) return 'cambridge_igcse_physics';
  return null;
}
