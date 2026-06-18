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
  },

  /* ================================================================
     EDEXCEL IGCSE BIOLOGY  4BI1
  ================================================================ */
  edexcel_igcse_biology: {
    subjectName: 'Edexcel IGCSE Biology',
    examCode: '4BI1',
    sections: ['All', 'Variety of Life', 'Cell Biology', 'Nutrition', 'Physiology', 'Coordination', 'Genetics & Evolution', 'Ecology'],
    topics: [
      {
        id: 'living-organisms',
        name: 'Nature & Variety of Living Organisms',
        syllabusRef: 'B1',
        section: 'Variety of Life',
        description: 'All living organisms share seven characteristics (MRS GREN: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition). Organisms are classified into five kingdoms: animal, plant, fungus, prokaryote, and protoctist. Eukaryotic cells have a membrane-bound nucleus; prokaryotic cells do not. Viruses are non-cellular and can only reproduce inside host cells.',
        svgKey: 'ebi-living-organisms',
        landmarks: ['MRS GREN (7 characteristics)', 'Eukaryotes (nucleus present)', 'Prokaryotes (no nucleus)', 'Viruses (non-cellular)', 'Animal kingdom', 'Plant kingdom', 'Fungi kingdom', 'Protoctist kingdom', 'Classification hierarchy'],
        examQA: [
          { q: 'State the seven characteristics of living organisms.', a: 'MRS GREN: Movement — organisms can move their bodies or parts; Respiration — release energy from food; Sensitivity — respond to changes in the environment; Growth — permanent increase in size/mass; Reproduction — produce offspring; Excretion — remove metabolic waste; Nutrition — obtain food/energy.', year: 'May/June 2022 Paper 2B' },
          { q: 'State two differences between a prokaryotic and a eukaryotic cell.', a: 'Prokaryotic cells have no membrane-bound nucleus — DNA is circular and found free in the cytoplasm. Eukaryotic cells have a true nucleus enclosed by a nuclear membrane. Prokaryotic cells are generally smaller and lack membrane-bound organelles (e.g., mitochondria); eukaryotic cells have membrane-bound organelles.', year: 'Oct/Nov 2023 Paper 2B' },
          { q: 'Explain why viruses are not classified as living organisms.', a: 'Viruses do not carry out most of the seven life processes independently. They cannot respire, grow, or reproduce without a host cell — they are entirely dependent on the host\'s cellular machinery for replication. They have no cellular structure (no cytoplasm, no membrane-bound organelles), so they are considered non-living infectious agents.', year: 'May/June 2021 Paper 2B' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Life'
      },
      {
        id: 'cell-organisation',
        name: 'Structures & Functions in Living Organisms',
        syllabusRef: 'B2',
        section: 'Cell Biology',
        description: 'Cells are organised into tissues (groups of similar cells), organs (groups of tissues), and organ systems. Animal cells contain a nucleus, cell membrane, cytoplasm, mitochondria, and ribosomes. Plant cells additionally have a cellulose cell wall, chloroplasts, and a large permanent vacuole. Bacterial cells are prokaryotic — they have a cell wall, cell membrane, circular DNA, ribosomes, and sometimes flagella, but no nucleus.',
        svgKey: 'ebi-cell-organisation',
        landmarks: ['Cell → tissue → organ → system', 'Animal cell organelles', 'Plant cell extras (wall/chloroplast/vacuole)', 'Bacterial cell (circular DNA)', 'Mitochondria (aerobic respiration)', 'Ribosomes (protein synthesis)', 'Osmosis/diffusion/active transport', 'Root hair cells (large SA)'],
        examQA: [
          { q: 'Describe the function of mitochondria in a cell.', a: 'Mitochondria are the site of aerobic respiration. They produce ATP (adenosine triphosphate) — the cell\'s energy currency — by oxidising glucose using oxygen. Cells with high energy demands (e.g., muscle cells, sperm cells) have many mitochondria.', year: 'May/June 2022 Paper 1B' },
          { q: 'State three features of a bacterial cell that differ from a plant cell.', a: 'Bacterial cells: have no membrane-bound nucleus (DNA is a circular loop in the cytoplasm); have no mitochondria or chloroplasts; have a cell wall made of murein (not cellulose); are much smaller; may have a flagellum for movement. Any three differences accepted.', year: 'Oct/Nov 2022 Paper 2B' },
          { q: 'Explain how root hair cells are adapted for the absorption of water and mineral ions.', a: 'Root hair cells have a large surface area (due to the long hair-like extension) to maximise absorption rate. They have a thin cell wall and membrane for short diffusion distance. They are in direct contact with soil water. Active transport proteins in the membrane absorb mineral ions against the concentration gradient using ATP.', year: 'May/June 2023 Paper 2B' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Cell_(biology)'
      },
      {
        id: 'nutrition',
        name: 'Nutrition (Photosynthesis & Human Digestion)',
        syllabusRef: 'B3',
        section: 'Nutrition',
        description: 'Photosynthesis converts light energy into chemical energy stored as glucose: CO₂ + H₂O → C₆H₁₂O₆ + O₂ (using light + chlorophyll). Rate is affected by light intensity, CO₂ concentration, and temperature. Human nutrition involves ingestion, digestion (physical and chemical), absorption, and assimilation. Enzymes break down carbohydrates (amylase), proteins (protease), and lipids (lipase) along the alimentary canal.',
        svgKey: 'ebi-nutrition',
        landmarks: ['Photosynthesis equation', 'Chlorophyll', 'Limiting factors (light/CO₂/temperature)', 'Alimentary canal', 'Amylase (starch → maltose)', 'Protease (proteins → amino acids)', 'Lipase (fats → fatty acids + glycerol)', 'Villi (absorption)', 'Bile (emulsification)'],
        examQA: [
          { q: 'Write the word equation for photosynthesis.', a: 'Carbon dioxide + water → glucose + oxygen. This requires light energy and chlorophyll as a catalyst. The balanced symbol equation is: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.', year: 'May/June 2022 Paper 1B' },
          { q: 'Explain how the small intestine is adapted for absorption.', a: 'The inner wall has millions of villi that greatly increase surface area for absorption. Each villus has a single layer of epithelial cells (short diffusion distance). A rich capillary network removes absorbed glucose and amino acids, maintaining a steep concentration gradient. Lacteals (lymph vessels) absorb fatty acids and glycerol.', year: 'Oct/Nov 2022 Paper 2B' },
          { q: 'Explain why the rate of photosynthesis does not increase indefinitely as light intensity increases.', a: 'At low light intensity, light is the limiting factor — increasing it raises the rate. Beyond a certain light intensity, another factor becomes limiting: either CO₂ concentration (insufficient for the enzymes) or temperature (enzyme activity is limited at low temperatures). The rate levels off and cannot increase until the limiting factor is changed.', year: 'May/June 2023 Paper 2B' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Photosynthesis'
      },
      {
        id: 'respiration',
        name: 'Respiration',
        syllabusRef: 'B4',
        section: 'Physiology',
        description: 'Respiration releases chemical energy from glucose as ATP. Aerobic respiration uses oxygen: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy. It occurs in mitochondria and produces maximum ATP. Anaerobic respiration occurs without oxygen — in animals produces lactic acid (causing oxygen debt and muscle fatigue); in yeast produces ethanol + CO₂ (fermentation). Anaerobic releases much less ATP.',
        svgKey: 'ebi-respiration',
        landmarks: ['Aerobic equation (glucose + O₂ → CO₂ + H₂O)', 'ATP (energy currency)', 'Mitochondria', 'Anaerobic (lactic acid in animals)', 'Anaerobic (ethanol + CO₂ in yeast)', 'Oxygen debt', 'Fermentation', 'Glycolysis (cytoplasm)'],
        examQA: [
          { q: 'Write the word equation for aerobic respiration.', a: 'Glucose + oxygen → carbon dioxide + water (+ energy released as ATP). The balanced symbol equation is: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O. This process occurs in the mitochondria and releases much more ATP than anaerobic respiration.', year: 'May/June 2022 Paper 1B' },
          { q: 'Describe what happens in the muscles during vigorous exercise when oxygen supply is insufficient.', a: 'The muscles respire anaerobically — glucose is broken down without oxygen. Lactic acid is produced as the end product. Less ATP is produced than aerobic respiration. Lactic acid accumulates, causing muscle fatigue and pain. After exercise, extra oxygen is used to oxidise lactic acid — this is the oxygen debt.', year: 'Oct/Nov 2022 Paper 2B' },
          { q: 'Describe how yeast is used in bread-making and explain the role of anaerobic respiration.', a: 'Yeast is added to bread dough with sugar. Yeast respires anaerobically (fermentation): glucose → ethanol + carbon dioxide. The CO₂ gas bubbles cause the dough to rise — creating a light, airy texture. During baking, the ethanol evaporates and the yeast is killed. The reaction is: glucose → ethanol + carbon dioxide.', year: 'May/June 2021 Paper 2B' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Cellular_respiration'
      },
      {
        id: 'gas-exchange',
        name: 'Gas Exchange',
        syllabusRef: 'B5',
        section: 'Physiology',
        description: 'Gas exchange occurs across thin, moist, permeable surfaces with a large surface area and a maintained concentration gradient. In plants, CO₂ and O₂ diffuse through stomata in leaves; spongy mesophyll provides large internal surface area. In humans, the lungs contain alveoli — tiny air sacs with a single-cell-thick wall, rich capillary network, moist surface, and large total surface area for efficient O₂/CO₂ exchange.',
        svgKey: 'ebi-gas-exchange',
        landmarks: ['Stomata (gas entry/exit in plants)', 'Guard cells (open/close stomata)', 'Spongy mesophyll', 'Alveoli', 'Capillary network', 'Thin epithelium (1 cell thick)', 'Moist surface', 'Concentration gradient maintenance', 'Ventilation (breathing in/out)'],
        examQA: [
          { q: 'Describe four features of alveoli that make them efficient for gas exchange.', a: '1. Very large total surface area (millions of alveoli) — maximises diffusion rate. 2. Walls are one cell thick — short diffusion distance for gases. 3. Moist surface — gases dissolve before diffusing. 4. Rich capillary network — constantly removes O₂ and delivers CO₂, maintaining steep concentration gradient.', year: 'May/June 2022 Paper 2B' },
          { q: 'Describe how breathing in (inspiration) is brought about.', a: 'The diaphragm contracts and flattens. The external intercostal muscles contract, pulling the ribcage up and outwards. The volume of the thorax increases. Pressure in the lungs falls below atmospheric pressure. Air rushes in down the pressure gradient, inflating the lungs.', year: 'Oct/Nov 2023 Paper 2B' },
          { q: 'Explain how stomata help regulate water loss while allowing gas exchange in plants.', a: 'Stomata open during the day for gas exchange (CO₂ in for photosynthesis, O₂ out). Guard cells control stomatal opening — they become turgid (gain water by osmosis) when conditions are favourable, causing pores to open. In dry conditions or darkness, guard cells lose water, become flaccid, and stomata close to reduce transpiration and water loss.', year: 'May/June 2023 Paper 2B' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Gas_exchange'
      },
      {
        id: 'transport',
        name: 'Transport (Plants & Humans)',
        syllabusRef: 'B6',
        section: 'Physiology',
        description: 'Plants have xylem (water + mineral ions, root → leaves, transpiration stream, dead cells, lignified walls) and phloem (dissolved sugars, translocation, living sieve tubes). Humans have a double circulatory system: pulmonary (heart → lungs → heart) and systemic (heart → body → heart). Blood contains red blood cells (haemoglobin for O₂), white blood cells (defence), platelets (clotting), and plasma (transport medium).',
        svgKey: 'ebi-transport',
        landmarks: ['Xylem (water + minerals)', 'Phloem (sugars, translocation)', 'Transpiration stream', 'Double circulation', 'Heart chambers (4)', 'Arteries (thick walls)', 'Veins (valves)', 'Capillaries (exchange)', 'Haemoglobin → oxyhaemoglobin'],
        examQA: [
          { q: 'Describe the differences between xylem and phloem vessels.', a: 'Xylem: dead cells with no end walls, lignified walls, transport water and mineral ions upward only, driven by transpiration pull. Phloem: living cells (sieve tubes + companion cells), transport dissolved sugars up AND down, process called translocation, not lignified.', year: 'May/June 2022 Paper 2B' },
          { q: 'Explain why the left ventricle wall is thicker than the right ventricle wall.', a: 'The left ventricle pumps blood to the whole body (systemic circulation) — a much longer, higher-resistance circuit requiring high pressure. The right ventricle only pumps blood to the lungs (pulmonary circulation) — a short, low-resistance circuit. Greater muscle mass in the left ventricle generates the higher pressure needed.', year: 'Oct/Nov 2022 Paper 2B' },
          { q: 'Describe how red blood cells are adapted for carrying oxygen.', a: 'Biconcave disc shape provides large surface area:volume ratio for maximum diffusion of O₂. No nucleus — more space for haemoglobin molecules. Haemoglobin binds reversibly to O₂ to form oxyhaemoglobin at high O₂ concentrations (lungs), releasing it at low concentrations (respiring tissues). Small, flexible cells squeeze through narrow capillaries.', year: 'May/June 2021 Paper 2B' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Circulatory_system'
      },
      {
        id: 'excretion',
        name: 'Excretion',
        syllabusRef: 'B7',
        section: 'Physiology',
        description: 'Excretion is the removal of metabolic waste products from the body. The kidneys filter blood to remove urea (from amino acid breakdown in the liver), excess water, and excess salts as urine. The lungs excrete CO₂ produced in respiration. The skin excretes small amounts of urea in sweat. Kidneys regulate blood composition by ultrafiltration (high pressure forces small molecules out) and selective reabsorption (glucose, most water, and salts are reabsorbed).',
        svgKey: 'ebi-excretion',
        landmarks: ['Urea (from deamination of amino acids)', 'Nephron (functional unit of kidney)', 'Glomerulus (ultrafiltration)', 'Bowman\'s capsule', 'Selective reabsorption (glucose/water)', 'Loop of Henle (concentration)', 'ADH (water reabsorption)', 'Ureter/bladder/urethra', 'CO₂ excreted by lungs'],
        examQA: [
          { q: 'State what is meant by excretion and give two examples of excretory products.', a: 'Excretion is the removal of the waste products of metabolism from the body. Examples: urea — produced in the liver by deamination of excess amino acids, excreted in urine by the kidneys; carbon dioxide — produced in cellular respiration, excreted through the lungs during breathing out.', year: 'May/June 2022 Paper 1B' },
          { q: 'Describe how the kidneys produce urine.', a: 'Blood enters the glomerulus at high pressure — small molecules (water, glucose, urea, salts) are forced through the capillary walls into the Bowman\'s capsule — this is ultrafiltration. As the filtrate passes through the nephron tubules, all glucose and most water and useful salts are selectively reabsorbed back into the blood. The remaining fluid (water, urea, excess salts) collects in the collecting duct and flows to the bladder as urine.', year: 'Oct/Nov 2022 Paper 2B' },
          { q: 'Explain how ADH controls the water content of blood.', a: 'When blood water potential falls (blood too concentrated), the hypothalamus detects this and the pituitary gland releases ADH. ADH makes the collecting duct and distal tubule more permeable to water. More water is reabsorbed back into the blood by osmosis. Less, more concentrated urine is produced. Blood water potential rises — negative feedback reduces ADH secretion.', year: 'May/June 2023 Paper 2B' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Excretion'
      },
      {
        id: 'reproduction',
        name: 'Reproduction',
        syllabusRef: 'B8',
        section: 'Physiology',
        description: 'Sexual reproduction involves the fusion of two gametes (egg + sperm), producing genetic variation. In plants, pollination transfers pollen; fertilisation forms seeds inside fruits. Asexual reproduction uses mitosis to produce genetically identical offspring (clones) from one parent — faster but no variation. Mitosis produces two genetically identical daughter cells for growth and repair; meiosis produces four genetically varied haploid gametes. Hormones (FSH, LH, oestrogen, progesterone) regulate the human menstrual cycle.',
        svgKey: 'ebi-reproduction',
        landmarks: ['Mitosis (2 identical cells, growth/repair)', 'Meiosis (4 gametes, haploid)', 'Fertilisation (zygote)', 'Pollination (wind/insect)', 'Seed dispersal', 'Asexual (clones)', 'FSH/LH/oestrogen/progesterone', 'Menstrual cycle', 'In vitro fertilisation (IVF)'],
        examQA: [
          { q: 'Compare sexual and asexual reproduction in terms of genetic variation and speed.', a: 'Sexual reproduction: involves two parents and fusion of gametes; produces genetically varied offspring (new combinations of alleles through meiosis and fertilisation); slower due to need to find a mate; produces fewer offspring. Asexual reproduction: one parent, mitosis only; all offspring genetically identical (clones); faster; can produce many offspring quickly.', year: 'May/June 2022 Paper 2B' },
          { q: 'Explain why meiosis is important for sexual reproduction.', a: 'Meiosis halves the chromosome number to produce haploid gametes. This is essential because when two gametes fuse at fertilisation, the diploid chromosome number is restored. Without meiosis, chromosome number would double each generation. Meiosis also creates genetic variation through independent assortment and crossing over.', year: 'Oct/Nov 2023 Paper 2B' },
          { q: 'Describe the role of FSH and LH in the menstrual cycle.', a: 'FSH (follicle-stimulating hormone) is secreted by the pituitary gland — it stimulates the development of a follicle in the ovary and causes the follicle to produce oestrogen. LH (luteinising hormone) surges at mid-cycle, triggering ovulation (release of the egg from the follicle). After ovulation, LH maintains the corpus luteum, which produces progesterone to maintain the uterus lining.', year: 'May/June 2021 Paper 2B' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Reproduction'
      },
      {
        id: 'nervous-hormones',
        name: 'Nervous System & Hormones',
        syllabusRef: 'B9',
        section: 'Coordination',
        description: 'The nervous system coordinates rapid responses via electrical impulses. Receptors detect stimuli; sensory neurons carry impulses to the CNS; motor neurons carry impulses to effectors. Synapses transmit signals between neurons using neurotransmitters. Reflex arcs bypass the brain for fast, involuntary protective responses. The endocrine system uses hormones (chemical messengers in blood) for slower, longer-lasting responses. Key hormones: insulin (blood glucose), adrenaline (fight-or-flight), sex hormones.',
        svgKey: 'ebi-nervous-system',
        landmarks: ['Neuron (sensory/relay/motor)', 'Reflex arc', 'Synapse (neurotransmitter)', 'CNS (brain + spinal cord)', 'Receptor → effector', 'Hormone (gland → blood → target)', 'Insulin (β-cells, pancreas)', 'Adrenaline (adrenal glands)', 'Negative feedback'],
        examQA: [
          { q: 'Describe how a nerve impulse passes across a synapse.', a: 'The nerve impulse arrives at the pre-synaptic knob. Vesicles containing neurotransmitter molecules fuse with the pre-synaptic membrane and release neurotransmitters into the synaptic cleft. Neurotransmitters diffuse across the cleft and bind to receptor proteins on the post-synaptic membrane. This generates a new nerve impulse in the post-synaptic neuron. Neurotransmitters are then broken down by enzymes or reabsorbed.', year: 'May/June 2022 Paper 2B' },
          { q: 'Explain the advantage of a reflex arc bypassing the brain.', a: 'In a reflex arc, the signal travels only to the spinal cord (relay neuron) and back — not to the brain. This makes the response extremely fast because the pathway is shorter and fewer synapses are involved. Speed is vital for protective reflexes (e.g., withdrawing from pain, blinking) — any delay could cause serious injury. The brain becomes aware of the reflex after it has occurred.', year: 'Oct/Nov 2022 Paper 2B' },
          { q: 'Compare nervous and hormonal coordination.', a: 'Nervous: electrical impulses, very fast (milliseconds), short-lived response, precise target (specific effector). Hormonal: chemical messengers in blood, slower (seconds to minutes), longer-lasting response, affects all target cells with the receptor (widespread effect). Nervous for immediate responses (e.g., reflex); hormonal for sustained changes (e.g., puberty, blood glucose regulation).', year: 'May/June 2023 Paper 2B' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Nervous_system'
      },
      {
        id: 'homeostasis',
        name: 'Homeostasis',
        syllabusRef: 'B10',
        section: 'Coordination',
        description: 'Homeostasis maintains a constant internal environment despite external changes. Body temperature is regulated at 37°C: if too hot, blood vessels vasodilate and sweating increases to cool down; if too cold, shivering and vasoconstriction warm the body. Blood glucose is regulated by insulin (secreted by β-cells of the pancreas when glucose rises — promotes uptake and glycogen storage) and glucagon (when glucose falls — promotes glycogen breakdown). Both operate via negative feedback.',
        svgKey: 'ebi-homeostasis',
        landmarks: ['Negative feedback', 'Thermoregulation (37°C)', 'Vasodilation (cooling)', 'Vasoconstriction (warming)', 'Sweating', 'Shivering', 'Insulin (lowers blood glucose)', 'Glucagon (raises blood glucose)', 'Glycogen (storage in liver/muscle)'],
        examQA: [
          { q: 'Explain how the body reduces its temperature when it gets too hot.', a: 'The hypothalamus detects a rise in blood temperature. It sends nerve impulses to the skin: sweat glands increase sweat production — evaporation of sweat removes latent heat from the skin. Arterioles in the skin vasodilate (widen) — more blood flows near the surface, increasing heat loss by radiation. Hairs lie flat (no trapped air insulation). This is negative feedback — the response reduces the initial change.', year: 'May/June 2022 Paper 2B' },
          { q: 'Describe how blood glucose concentration is regulated after a meal.', a: 'A meal raises blood glucose. The pancreas (β-cells of the islets of Langerhans) detects this and secretes insulin into the blood. Insulin causes body cells (especially liver and muscle) to take up more glucose. In the liver, excess glucose is converted to glycogen for storage (glycogenesis). As blood glucose returns to normal, insulin secretion decreases — negative feedback. Blood glucose falls back to the set point.', year: 'Oct/Nov 2023 Paper 2B' },
          { q: 'Explain what happens to a person with Type 1 diabetes if they do not receive insulin injections.', a: 'In Type 1 diabetes, the β-cells of the pancreas are destroyed (autoimmune) and no insulin is produced. Without insulin, cells cannot take up glucose efficiently. Blood glucose remains very high after meals. Excess glucose is excreted in urine. Cells are starved of glucose for energy and begin breaking down fats and proteins instead, which can be dangerous. Without insulin injections, blood glucose would reach fatally high levels.', year: 'May/June 2021 Paper 2B' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Homeostasis'
      },
      {
        id: 'genetics-inheritance',
        name: 'Genetics & Inheritance',
        syllabusRef: 'B11',
        section: 'Genetics & Evolution',
        description: 'Chromosomes carry genes; genes are specific sequences of DNA bases that code for proteins. Alleles are alternative versions of a gene. Dominant alleles are expressed even when only one copy is present; recessive alleles are only expressed when homozygous. Punnett squares predict offspring ratios. Sex is determined by X and Y chromosomes: females XX, males XY. Some traits are sex-linked (e.g., colour blindness, haemophilia — carried on X chromosome).',
        svgKey: 'ebi-genetics',
        landmarks: ['Gene (section of DNA)', 'Allele (dominant/recessive)', 'Homozygous/heterozygous', 'Genotype/phenotype', 'Punnett square', 'Monohybrid cross', 'Co-dominance', 'Sex chromosomes (XX/XY)', 'Sex-linked traits (X-linked)'],
        examQA: [
          { q: 'Define the terms genotype, phenotype, and allele.', a: 'Allele: one of two or more alternative forms of a gene occupying the same locus on homologous chromosomes. Genotype: the genetic make-up of an organism — the specific alleles it carries (e.g., Tt). Phenotype: the observable characteristics of an organism resulting from the interaction of its genotype with the environment (e.g., tall).', year: 'May/June 2022 Paper 1B' },
          { q: 'Cystic fibrosis (CF) is caused by a recessive allele (f). A carrier mother (Ff) and a carrier father (Ff) have children. Predict the probability of a child having CF.', a: 'Cross: Ff × Ff. Gametes: F or f from each parent. Punnett square: FF, Ff, Ff, ff. 1 in 4 (25%) chance of ff (having CF). 2 in 4 (50%) chance of Ff (carrier). 1 in 4 (25%) chance of FF (unaffected, non-carrier). Ratio: 3 unaffected : 1 affected.', year: 'Oct/Nov 2022 Paper 2B' },
          { q: 'Explain why colour blindness is more common in males than females.', a: 'Colour blindness is caused by a recessive allele on the X chromosome (X-linked). Males (XY) only have one X chromosome — if it carries the recessive allele (X^b Y), they are colour blind. Females (XX) need two copies of the recessive allele (X^b X^b) to be colour blind, which is much less likely. A female with one recessive allele (X^B X^b) is a carrier but has normal colour vision.', year: 'May/June 2023 Paper 2B' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Genetics'
      },
      {
        id: 'variation-selection',
        name: 'Variation & Natural Selection',
        syllabusRef: 'B12',
        section: 'Genetics & Evolution',
        description: 'Variation can be continuous (measured on a scale, e.g., height — shows normal distribution) or discontinuous (distinct categories, e.g., blood group). Causes include genetic (mutations, sexual reproduction mixing alleles) and environmental factors. Natural selection: organisms produce more offspring than survive; those with beneficial variations are more likely to survive and reproduce, passing on advantageous alleles. Over generations, allele frequencies change — evolution. Mutations are the source of new alleles.',
        svgKey: 'ebi-variation',
        landmarks: ['Continuous variation (bell curve)', 'Discontinuous variation', 'Mutation (new alleles)', 'Natural selection', 'Survival of the fittest', 'Antibiotic resistance (example)', 'Evolution', 'Speciation', 'Artificial selection'],
        examQA: [
          { q: 'Describe the process of natural selection using antibiotic resistance as an example.', a: 'In a bacterial population there is genetic variation. Random mutations cause some bacteria to be resistant to an antibiotic. When the antibiotic is used, non-resistant bacteria die. Resistant bacteria survive and reproduce rapidly (no competition, more resources). They pass resistance alleles to offspring. Over generations, resistant bacteria come to dominate the population — natural selection has increased the frequency of the resistance allele.', year: 'May/June 2022 Paper 2B' },
          { q: 'State two differences between continuous and discontinuous variation. Give one example of each.', a: 'Continuous variation: shows a range of values with no distinct categories; controlled by multiple genes and the environment; forms a normal distribution. Example: height. Discontinuous variation: falls into distinct categories; usually controlled by one gene; not significantly affected by the environment. Example: ABO blood group (A, B, AB, or O only).', year: 'Oct/Nov 2022 Paper 1B' },
          { q: 'Explain how mutations provide the raw material for natural selection.', a: 'Mutations are random changes in the DNA base sequence. They can create new alleles — new versions of genes that may code for different proteins. Most mutations are neutral or harmful, but occasionally a mutation produces an advantage (e.g., better camouflage, enzyme resistance). Natural selection acts on this new heritable variation — beneficial alleles spread through the population over generations. Without mutation, there would be no new alleles for natural selection to act on.', year: 'May/June 2021 Paper 2B' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Natural_selection'
      },
      {
        id: 'ecology',
        name: 'Ecology & Environment',
        syllabusRef: 'B13',
        section: 'Ecology',
        description: 'An ecosystem includes all organisms in an area plus abiotic factors. Producers (plants) convert light energy into biomass; consumers eat other organisms. Energy is lost at each trophic level (respiration, heat, faeces) — only ~10% transfers to the next level. The carbon cycle involves photosynthesis, respiration, decomposition, and combustion. The nitrogen cycle involves nitrogen-fixing bacteria, nitrifying bacteria, and denitrifying bacteria. Human impacts: deforestation, pollution, eutrophication, global warming.',
        svgKey: 'ebi-ecology',
        landmarks: ['Producer → primary consumer → secondary consumer', 'Energy loss (respiration/heat)', '10% energy transfer rule', 'Carbon cycle (photosynthesis/respiration/combustion)', 'Nitrogen cycle (fixing/nitrifying/denitrifying bacteria)', 'Eutrophication (fertiliser runoff)', 'Deforestation effects', 'Greenhouse effect', 'Conservation'],
        examQA: [
          { q: 'Explain why food chains rarely have more than four trophic levels.', a: 'Energy is lost at every trophic level — only about 10% of energy at one level is transferred to biomass at the next. Energy is lost through heat from respiration, movement, maintaining body temperature (in endotherms), and through undigested material in faeces. After four trophic levels so little energy remains that supporting another level of organisms would be unsustainable.', year: 'May/June 2022 Paper 2B' },
          { q: 'Describe how nitrates are made available to plants in the nitrogen cycle.', a: 'Nitrogen-fixing bacteria (e.g., Rhizobium in root nodules) convert atmospheric N₂ into ammonium compounds in the soil. Nitrifying bacteria convert ammonium compounds to nitrites (Nitrosomonas) and then nitrates (Nitrobacter). Plants absorb nitrates through root hair cells by active transport. Decomposers break down dead organisms and excretory products, releasing ammonium compounds back into the soil — completing the cycle.', year: 'Oct/Nov 2023 Paper 2B' },
          { q: 'Describe how eutrophication leads to the death of fish in a lake.', a: 'Fertilisers (nitrates/phosphates) leach from farmland into the lake. Algae grow rapidly — forming a dense algal bloom that blocks sunlight. Aquatic plants below die as they cannot photosynthesise. Bacteria decompose the dead plants and algae, multiplying rapidly. Aerobic bacteria use up all dissolved oxygen in the water (biological oxygen demand increases). Fish and other aerobic organisms die due to lack of oxygen.', year: 'May/June 2021 Paper 2B' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Ecosystem'
      },
      {
        id: 'biological-resources',
        name: 'Use of Biological Resources',
        syllabusRef: 'B14',
        section: 'Ecology',
        description: 'Selective breeding (artificial selection) improves crop yields and animal products by selecting individuals with desirable traits over many generations. Microorganisms are used in food production (bread/yogurt/cheese/beer via fermentation). Industrial fermenters maintain optimal conditions (temperature, pH, nutrient supply) for microorganism growth. Genetic engineering inserts specific genes into organisms to produce useful proteins (e.g., human insulin from bacteria). Gene therapy may one day treat genetic disorders.',
        svgKey: 'ebi-biological-resources',
        landmarks: ['Selective breeding (generations)', 'Crop improvement (yield/disease-resistance)', 'Yeast (fermentation → bread/beer)', 'Lactobacillus (yogurt)', 'Industrial fermenter (conditions)', 'Genetic engineering (restriction enzymes/ligase)', 'Insulin production (E. coli)', 'Gene therapy', 'Cloning (plants/animals)'],
        examQA: [
          { q: 'Describe how selective breeding could be used to increase the milk yield of a dairy herd.', a: 'Identify cows with the highest milk yield and bulls from high-yield cows. Allow only these selected individuals to breed together. From their offspring, again select those with the highest milk yield. Repeat over many generations — each generation the average milk yield increases as the alleles for high milk production become more common in the population. This is artificial selection.', year: 'May/June 2022 Paper 2B' },
          { q: 'Describe the conditions maintained in an industrial fermenter and explain why each is important.', a: 'Temperature: kept at optimum for enzymes (typically 25-37°C) — too high denatures enzymes reducing yield; too low slows enzyme reactions. pH: kept constant — extremes affect enzyme active site shape. Sterile conditions: prevent contaminating microorganism growth. Nutrient supply (glucose, minerals): ensures maximum growth rate. Stirring/agitation: ensures even distribution of nutrients and oxygen. Cooling jacket: removes excess heat from respiration.', year: 'Oct/Nov 2022 Paper 2B' },
          { q: 'Outline how genetic engineering is used to produce human insulin.', a: '1. The human insulin gene is identified and cut out of a chromosome using restriction enzymes. 2. The same restriction enzyme cuts open a bacterial plasmid — both have complementary sticky ends. 3. The insulin gene is inserted into the plasmid using DNA ligase — a recombinant plasmid is formed. 4. The plasmid is inserted into a bacterium (e.g., E. coli). 5. The bacterium is cultured on a large scale in fermenters — it produces human insulin. 6. Insulin is extracted, purified, and used to treat Type 1 diabetes.', year: 'May/June 2023 Paper 2B' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Genetic_engineering'
      }
    ]
  },

  /* ================================================================
     EDEXCEL IGCSE CHEMISTRY  4CH1
  ================================================================ */
  edexcel_igcse_chemistry: {
    subjectName: 'Edexcel IGCSE Chemistry',
    examCode: '4CH1',
    sections: ['All', 'Principles', 'Inorganic', 'Physical', 'Organic', 'Applied'],
    topics: [
      {
        id: 'principles',
        name: 'Principles of Chemistry',
        syllabusRef: 'C1',
        section: 'Principles',
        description: 'Matter exists in three states. Atoms contain protons, neutrons, and electrons. Atomic number = number of protons; mass number = protons + neutrons. Isotopes share atomic number but differ in mass number. Ionic bonding transfers electrons between metals and non-metals; covalent bonding shares electrons between non-metals; metallic bonding involves delocalised electrons. Relative atomic mass and the mole (6.02×10²³) are used for quantitative calculations. Balanced equations must conserve mass.',
        svgKey: 'ech-principles',
        landmarks: ['Atomic number (protons)', 'Mass number (protons + neutrons)', 'Isotopes (same element, different mass)', 'Ionic bond (electron transfer)', 'Covalent bond (shared electrons)', 'Metallic bond (delocalised e⁻)', 'Mole (6.02×10²³)', 'Relative atomic mass Ar', 'Empirical formula'],
        examQA: [
          { q: 'Define the term isotope and give an example.', a: 'Isotopes are atoms of the same element (same number of protons/atomic number) with different numbers of neutrons (different mass numbers). They have identical chemical properties but different physical properties. Example: carbon-12 (⁶¹²C, 6 protons + 6 neutrons) and carbon-14 (⁶¹⁴C, 6 protons + 8 neutrons).', year: 'May/June 2022 Paper 1C' },
          { q: 'Describe ionic bonding between magnesium and oxygen.', a: 'Magnesium (2,8,2) loses 2 outer electrons to form Mg²⁺ (2,8). Oxygen (2,6) gains 2 electrons to form O²⁻ (2,8). Both achieve stable noble gas electronic configurations. Strong electrostatic attraction between the oppositely charged Mg²⁺ and O²⁻ ions in a giant ionic lattice — this is the ionic bond. MgO forms.', year: 'Oct/Nov 2022 Paper 2C' },
          { q: 'Calculate the number of moles in 32 g of sulfur. (Ar: S = 32)', a: 'Moles = mass ÷ molar mass = 32 ÷ 32 = 1 mol of sulfur atoms. The molar mass of sulfur = 32 g/mol (equal to its relative atomic mass in g). 1 mole contains 6.02 × 10²³ sulfur atoms.', year: 'May/June 2023 Paper 2C' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Chemical_bond'
      },
      {
        id: 'inorganic',
        name: 'Inorganic Chemistry',
        syllabusRef: 'C2',
        section: 'Inorganic',
        description: 'The Periodic Table arranges elements by atomic number. Groups contain elements with similar properties (same outer electron configuration). Group 1 (alkali metals) react vigorously with water; reactivity increases down the group. Group 7 (halogens) gain electrons; reactivity decreases down the group. Transition metals are dense, hard, high melting point, form coloured compounds and can act as catalysts. The reactivity series orders metals by reactivity; more reactive metals displace less reactive ones.',
        svgKey: 'ech-inorganic',
        landmarks: ['Periodic table (groups/periods)', 'Group 1 (alkali metals, reactivity↑ down)', 'Group 7 (halogens, reactivity↓ down)', 'Group 0 (noble gases, full outer shell)', 'Transition metals (catalysts/coloured compounds)', 'Reactivity series', 'Displacement reactions', 'Rusting (O₂ + H₂O)', 'Alloys'],
        examQA: [
          { q: 'Explain why reactivity increases down Group 1 (alkali metals).', a: 'Moving down Group 1, each element has more electron shells. The outer electron is further from the nucleus and is more shielded by inner electrons (increased shielding). The attractive force of the nucleus on the outer electron is weaker. The outer electron is more easily lost (lower ionisation energy). Since alkali metals react by losing one electron, they become more reactive going down the group.', year: 'May/June 2022 Paper 2C' },
          { q: 'Describe what happens when chlorine water is added to potassium bromide solution.', a: 'Chlorine is more reactive than bromine (higher in Group 7). Chlorine displaces bromine from the solution: Cl₂ + 2KBr → 2KCl + Br₂. The solution turns orange/brown as bromine is produced. This is a halogen displacement reaction — a more reactive halogen displaces a less reactive one from its salt solution.', year: 'Oct/Nov 2022 Paper 2C' },
          { q: 'State three typical properties of transition metals and give an example of each.', a: 'High melting points — iron melts at 1538°C; used in furnaces. High density — tungsten is very dense. Can act as catalysts — iron catalyst in Haber process; nickel in hydrogenation. Form coloured compounds — copper sulfate is blue; iron(III) chloride is orange/brown. Variable oxidation states — iron forms Fe²⁺ and Fe³⁺. Any three with examples.', year: 'May/June 2021 Paper 2C' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Periodic_table'
      },
      {
        id: 'physical-chemistry',
        name: 'Physical Chemistry',
        syllabusRef: 'C3',
        section: 'Physical',
        description: 'Exothermic reactions release heat (ΔH < 0); endothermic reactions absorb heat (ΔH > 0). Bond breaking requires energy; bond making releases energy. The activation energy (Ea) is the minimum energy needed for a reaction. Reaction rate increases with temperature, concentration, surface area, and catalysts. Catalysts provide an alternative pathway with lower Ea. Reversible reactions reach dynamic equilibrium when forward and reverse rates are equal. Le Chatelier\'s principle predicts equilibrium shifts.',
        svgKey: 'ech-physical',
        landmarks: ['Exothermic (ΔH < 0, temp rises)', 'Endothermic (ΔH > 0, temp falls)', 'Activation energy (Ea)', 'Bond breaking (endothermic)', 'Bond making (exothermic)', 'Collision theory', 'Catalyst (lowers Ea)', 'Reversible reaction (⇌)', 'Le Chatelier\'s principle'],
        examQA: [
          { q: 'Explain in terms of bonds why the reaction H₂ + Cl₂ → 2HCl is exothermic.', a: 'Energy is needed to break the H−H bond and the Cl−Cl bond (endothermic). Energy is released when two H−Cl bonds form (exothermic). The energy released in forming H−Cl bonds is greater than the energy required to break H−H and Cl−Cl bonds. Net result: more energy is released than absorbed → the reaction is exothermic (ΔH < 0).', year: 'May/June 2022 Paper 2C' },
          { q: 'Explain why increasing temperature increases reaction rate using collision theory.', a: 'At higher temperatures, reactant particles have more kinetic energy — they move faster. This increases the frequency of collisions between reactant particles. More importantly, a higher proportion of collisions have energy ≥ the activation energy. Both effects mean more successful collisions per second, so the reaction rate increases.', year: 'Oct/Nov 2022 Paper 2C' },
          { q: 'State Le Chatelier\'s principle and use it to predict the effect of increasing pressure on the equilibrium: N₂ + 3H₂ ⇌ 2NH₃.', a: 'Le Chatelier\'s principle: when a system in equilibrium is subjected to a change, it shifts to oppose that change. Increasing pressure favours the side with fewer moles of gas. Left side: 1 + 3 = 4 moles. Right side: 2 moles. Increasing pressure shifts the equilibrium to the right → more NH₃ produced. This is why the Haber process uses high pressure.', year: 'May/June 2023 Paper 2C' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Chemical_equilibrium'
      },
      {
        id: 'organic',
        name: 'Organic Chemistry',
        syllabusRef: 'C4',
        section: 'Organic',
        description: 'Organic compounds contain carbon. Homologous series share a general formula and have similar chemical properties. Alkanes (CₙH₂ₙ₊₂, saturated) undergo combustion and substitution. Alkenes (CₙH₂ₙ, unsaturated, C=C double bond) undergo addition reactions (with Br₂, H₂, H₂O). Alcohols (–OH) are produced by fermentation or hydration of alkenes. Carboxylic acids (–COOH) react with alcohols to form esters. Addition polymerisation links alkene monomers; condensation polymerisation (e.g., nylon, polyester) releases water.',
        svgKey: 'ech-organic',
        landmarks: ['Alkanes (saturated, C-C single bonds)', 'Alkenes (unsaturated, C=C)', 'Bromine water test (alkene decolourises)', 'Combustion (complete/incomplete)', 'Addition reactions of alkenes', 'Alcohols (fermentation/hydration)', 'Carboxylic acids + alcohols → esters', 'Addition polymerisation', 'Condensation polymerisation (nylon/polyester)'],
        examQA: [
          { q: 'Describe a chemical test to distinguish hexane from hexene. State the result for each.', a: 'Add bromine water (orange) to each substance. Hexane (alkane, saturated): no reaction — bromine water stays orange. Hexene (alkene, unsaturated): immediate decolourisation — bromine adds across the C=C double bond (addition reaction), forming a colourless dibromoalkane. This confirms the presence of a C=C double bond.', year: 'May/June 2022 Paper 2C' },
          { q: 'Describe the conditions for producing ethanol by the fermentation of glucose.', a: 'Glucose solution + yeast enzyme (zymase); temperature around 30-40°C (optimum for enzyme activity); anaerobic conditions (no oxygen — oxygen inhibits fermentation); slightly acidic pH. Reaction: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. The ethanol is then separated by fractional distillation.', year: 'Oct/Nov 2023 Paper 2C' },
          { q: 'Explain what is meant by addition polymerisation and give one example.', a: 'Addition polymerisation joins together many small monomer molecules that contain a C=C double bond. The double bond opens and the monomers link together in a long chain — no atoms are lost (no by-product). Example: ethene monomers (CH₂=CH₂) polymerise to form poly(ethene): n(CH₂=CH₂) → −(CH₂−CH₂)ₙ−. Other examples: poly(propene) from propene, PVC from chloroethene.', year: 'May/June 2021 Paper 2C' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Organic_chemistry'
      },
      {
        id: 'acids-bases-salts',
        name: 'Acids, Bases & Salts',
        syllabusRef: 'C5',
        section: 'Applied',
        description: 'Acids release H⁺ ions in solution (pH < 7); bases accept H⁺ ions. Alkalis are soluble bases (pH > 7). Neutralisation: acid + base → salt + water. Salts are prepared by reacting acids with metals, metal oxides, hydroxides, or carbonates. Strong acids (HCl, H₂SO₄, HNO₃) fully dissociate; weak acids (CH₃COOH) partially dissociate. Titration determines the exact volume of acid/alkali for neutralisation. The pH scale (0–14) measures H⁺ concentration.',
        svgKey: 'ech-acids-bases',
        landmarks: ['pH scale (0-14)', 'Acid (H⁺, pH < 7)', 'Alkali (OH⁻, pH > 7)', 'Neutralisation (salt + water)', 'Strong acid (fully dissociates)', 'Weak acid (partially dissociates)', 'Titration', 'Universal indicator', 'Salt preparation methods'],
        examQA: [
          { q: 'Describe how to prepare a pure dry sample of zinc sulfate crystals.', a: '1. Add excess zinc carbonate (or zinc/zinc oxide) to warm dilute sulfuric acid in a beaker — stir until no more reacts (excess solid ensures all acid reacts). 2. Filter off excess solid. 3. Gently heat the filtrate to evaporate most of the water — concentrate the solution. 4. Leave to cool and allow crystals to form. 5. Filter and pat dry between filter paper. Reaction: ZnCO₃ + H₂SO₄ → ZnSO₄ + H₂O + CO₂.', year: 'May/June 2022 Paper 2C' },
          { q: 'Explain the difference between a strong acid and a weak acid with the same concentration.', a: 'A strong acid (e.g., HCl) is fully (completely) dissociated into ions in solution: HCl → H⁺ + Cl⁻. A weak acid (e.g., ethanoic acid) is only partially dissociated — an equilibrium exists: CH₃COOH ⇌ CH₃COO⁻ + H⁺. At the same concentration, strong acid has a much higher [H⁺] (lower pH), reacts faster with metals, and fully neutralises a base. Weak acid has a higher pH and reacts more slowly.', year: 'Oct/Nov 2022 Paper 2C' },
          { q: 'Describe how to carry out an acid-alkali titration to find the concentration of sodium hydroxide.', a: 'Fill a burette with the acid (known concentration). Using a pipette, transfer a fixed volume of NaOH into a conical flask. Add a few drops of indicator (e.g., phenolphthalein). Slowly add acid from the burette, swirling after each addition. Stop at the endpoint (phenolphthalein: pink → colourless). Record the volume of acid used (titre). Repeat to get concordant results (within 0.1 cm³). Use n = cV to calculate moles, then find NaOH concentration.', year: 'May/June 2021 Paper 3C' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Acid–base_reaction'
      },
      {
        id: 'electrolysis',
        name: 'Electrolysis',
        syllabusRef: 'C6',
        section: 'Applied',
        description: 'Electrolysis uses electrical energy to decompose ionic compounds. Ions in molten or aqueous electrolytes are free to move. Cations (positive) move to the cathode (negative electrode) and are reduced. Anions (negative) move to the anode (positive electrode) and are oxidised. Electrolysis of brine (NaCl solution) produces chlorine at the anode, hydrogen at the cathode, and sodium hydroxide solution. Electroplating coats a metal object with a thin layer of another metal.',
        svgKey: 'ech-electrolysis',
        landmarks: ['Electrolyte (molten/aqueous)', 'Cathode (−): reduction, cations', 'Anode (+): oxidation, anions', 'Electrolysis of brine (Cl₂/H₂/NaOH)', 'Electrolysis of water (H₂/O₂)', 'Electroplating', 'Purification of copper', 'Aluminium extraction (electrolysis of Al₂O₃)'],
        examQA: [
          { q: 'State the products formed at each electrode when brine (sodium chloride solution) is electrolysed.', a: 'Cathode (−): H⁺ ions from water are discharged — hydrogen gas (H₂) is produced: 2H⁺ + 2e⁻ → H₂. (H⁺ preferred over Na⁺). Anode (+): Cl⁻ ions are discharged — chlorine gas (Cl₂) produced: 2Cl⁻ → Cl₂ + 2e⁻. (Cl⁻ preferred over OH⁻ at high NaCl concentrations). Remaining in solution: Na⁺ and OH⁻ ions → sodium hydroxide solution (NaOH).', year: 'May/June 2022 Paper 2C' },
          { q: 'Explain why aluminium is extracted by electrolysis rather than by reduction with carbon.', a: 'Aluminium is more reactive than carbon — it cannot be reduced by carbon from its ore (Al₂O₃/bauxite). Electrolysis must be used: Al₂O₃ is dissolved in molten cryolite (to lower melting point) and electrolysed. Al³⁺ ions are reduced at the cathode: Al³⁺ + 3e⁻ → Al. Electrolysis is more expensive than using carbon (high electrical energy needed) but it is the only feasible method for very reactive metals.', year: 'Oct/Nov 2022 Paper 2C' },
          { q: 'Describe how electroplating is used to coat a steel spoon with silver.', a: 'The steel spoon is the cathode (−). A block of pure silver is the anode (+). The electrolyte is a silver nitrate or silver cyanide solution. When current flows: at the anode, silver dissolves (Ag → Ag⁺ + e⁻); at the cathode, Ag⁺ ions are reduced and deposit as silver metal on the spoon (Ag⁺ + e⁻ → Ag). The anode gradually dissolves, replenishing the electrolyte. A thin, even layer of silver coats the spoon.', year: 'May/June 2023 Paper 2C' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Electrolysis'
      },
      {
        id: 'industrial',
        name: 'Industrial Processes',
        syllabusRef: 'C7',
        section: 'Applied',
        description: 'The Haber Process manufactures ammonia from nitrogen and hydrogen: N₂ + 3H₂ ⇌ 2NH₃ (iron catalyst, 450°C, 200 atm). The Contact Process manufactures sulfuric acid: S → SO₂ → SO₃ (V₂O₅ catalyst, 450°C) → H₂SO₄. The blast furnace extracts iron from iron ore using coke (carbon monoxide reduction). Electrolysis extracts aluminium from purified Al₂O₃. Conditions in industrial processes represent economic compromises between yield, rate, and cost.',
        svgKey: 'ech-industrial',
        landmarks: ['Haber Process (N₂ + 3H₂ ⇌ 2NH₃)', 'Iron catalyst (Haber)', '450°C, 200 atm (Haber compromise)', 'Contact Process (H₂SO₄)', 'V₂O₅ catalyst (Contact)', 'Blast furnace (Fe from Fe₂O₃)', 'Coke (C) → CO reduction', 'Aluminium extraction (electrolysis)', 'Nitrogen fixation'],
        examQA: [
          { q: 'Explain why the Haber process uses a temperature of about 450°C rather than a lower or higher temperature.', a: 'The forward reaction (N₂ + 3H₂ → 2NH₃) is exothermic. Lower temperature would give a higher equilibrium yield of NH₃ (equilibrium shifts right) but the rate would be too slow — economically unviable. Higher temperature gives a faster rate but poor yield (equilibrium shifts left — less NH₃). 450°C is a compromise: reasonable yield (~15%) at an acceptable rate. The iron catalyst also helps achieve a practical rate at this temperature.', year: 'May/June 2022 Paper 2C' },
          { q: 'Describe how iron is extracted from iron ore in the blast furnace.', a: 'Iron ore (Fe₂O₃), coke (C), and limestone (CaCO₃) are fed into the blast furnace. Hot air is blasted in. Coke burns: C + O₂ → CO₂. CO₂ reacts with more coke: CO₂ + C → 2CO. Carbon monoxide reduces iron oxide: Fe₂O₃ + 3CO → 2Fe + 3CO₂. Molten iron (pig iron) sinks to the bottom and is tapped off. Limestone removes acidic impurities (silica) as slag: CaO + SiO₂ → CaSiO₃ (calcium silicate slag).', year: 'Oct/Nov 2023 Paper 2C' },
          { q: 'State the raw materials for the Contact Process and outline the three main stages.', a: 'Raw materials: sulfur (or sulfur dioxide from smelting), oxygen (from air), water. Stage 1: Burn sulfur in air: S + O₂ → SO₂. Stage 2: Catalytic oxidation of SO₂ to SO₃: 2SO₂ + O₂ ⇌ 2SO₃ (vanadium(V) oxide catalyst, 450°C, 1-2 atm). Stage 3: Absorb SO₃ in concentrated H₂SO₄ to form oleum, then dilute with water to form H₂SO₄: SO₃ + H₂O → H₂SO₄.', year: 'May/June 2021 Paper 2C' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Haber_process'
      }
    ]
  },

  /* ================================================================
     EDEXCEL IGCSE PHYSICS  4PH1
  ================================================================ */
  edexcel_igcse_physics: {
    subjectName: 'Edexcel IGCSE Physics',
    examCode: '4PH1',
    sections: ['All', 'Forces & Motion', 'Electricity', 'Waves', 'Energy', 'Matter', 'Magnetism', 'Nuclear & Space'],
    topics: [
      {
        id: 'forces-motion',
        name: 'Forces & Motion',
        syllabusRef: 'P1',
        section: 'Forces & Motion',
        description: 'Speed = distance/time; velocity = displacement/time (vector); acceleration = Δv/t. Distance-time graphs have gradient = speed; velocity-time graphs have gradient = acceleration and area under = distance. Newton\'s three laws: 1st (inertia), 2nd (F = ma), 3rd (equal and opposite forces). Resultant forces cause acceleration; balanced forces mean constant velocity or rest. Stopping distance = thinking distance + braking distance. Momentum = mv; conservation of momentum applies in all collisions.',
        svgKey: 'eph-forces-motion',
        landmarks: ['Speed v = d/t', 'Acceleration a = Δv/t', 'Newton\'s 1st law (inertia)', 'Newton\'s 2nd law (F = ma)', 'Newton\'s 3rd law (action-reaction)', 'v-t graph (area = distance)', 'Stopping distance', 'Momentum p = mv', 'Conservation of momentum'],
        examQA: [
          { q: 'A car of mass 800 kg accelerates from 0 to 24 m/s in 6 s. Calculate (a) the acceleration and (b) the resultant force.', a: '(a) Acceleration = Δv/t = 24/6 = 4 m/s². (b) F = ma = 800 × 4 = 3200 N. This is the net/resultant force in the direction of motion — additional to any resistive forces that must also be overcome by the engine.', year: 'May/June 2022 Paper 2P' },
          { q: 'State Newton\'s third law and give an example.', a: 'Newton\'s third law: when object A exerts a force on object B, object B exerts an equal and opposite force on object A. The forces are always equal in magnitude, opposite in direction, and act on different objects (Newton\'s 3rd law pairs). Example: a rocket engine ejects gas backward with force F — the gas exerts an equal force F forward on the rocket, propelling it forward.', year: 'Oct/Nov 2022 Paper 1P' },
          { q: 'Explain why increasing speed significantly increases braking distance.', a: 'Braking distance depends on kinetic energy (KE = ½mv²). Kinetic energy increases with the square of speed. The brakes must do work equal to the KE to stop the car. At double the speed, KE is four times greater — so the braking distance is approximately four times longer (W = Fd, so d increases proportionally with KE). This is why speed limits are important for safety.', year: 'May/June 2023 Paper 2P' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion'
      },
      {
        id: 'electricity',
        name: 'Electricity',
        syllabusRef: 'P2',
        section: 'Electricity',
        description: 'Current I = Q/t (rate of flow of charge). Potential difference V = W/Q (energy per unit charge). Resistance R = V/I. Ohm\'s law: V = IR (at constant temperature). Power P = IV = I²R = V²/R. In series circuits, current is the same throughout, voltages add, resistances add. In parallel circuits, voltage is the same across each branch, currents add, total resistance decreases. Mains electricity is AC (alternating current) at 230 V / 50 Hz. Fuses and circuit breakers protect against overload.',
        svgKey: 'eph-electricity',
        landmarks: ['Current I = Q/t (amperes)', 'PD V = W/Q (volts)', 'R = V/I (ohms)', 'Ohm\'s law (V = IR)', 'Power P = IV', 'Series circuit (same I)', 'Parallel circuit (same V)', 'AC vs DC', 'Fuse / circuit breaker'],
        examQA: [
          { q: 'A 12 V battery drives a current of 3 A through a resistor. Calculate (a) the resistance and (b) the power dissipated.', a: '(a) R = V/I = 12/3 = 4 Ω. (b) P = IV = 3 × 12 = 36 W. Alternatively, P = I²R = 3² × 4 = 9 × 4 = 36 W or P = V²/R = 144/4 = 36 W. All three forms give the same answer.', year: 'May/June 2022 Paper 2P' },
          { q: 'Two resistors, 4 Ω and 12 Ω, are connected in parallel. A 24 V supply is connected across them. Find the total current from the supply.', a: 'In parallel, voltage across each resistor = 24 V. I₁ = V/R₁ = 24/4 = 6 A. I₂ = V/R₂ = 24/12 = 2 A. Total current = I₁ + I₂ = 6 + 2 = 8 A. (Check: 1/Rtotal = 1/4 + 1/12 = 3/12 + 1/12 = 4/12 → Rtotal = 3 Ω; I = V/R = 24/3 = 8 A ✓)', year: 'Oct/Nov 2022 Paper 2P' },
          { q: 'Explain why a fuse is always placed in the live wire rather than the neutral wire.', a: 'The live wire (brown, 230 V) carries the dangerous high voltage. If the fuse is in the live wire and blows due to excess current, it breaks the circuit — the appliance is isolated from the high voltage supply, making it safe to touch. If the fuse were in the neutral wire, the appliance would still be connected to the live (high voltage) side even when the fuse blew — dangerous shock hazard would remain.', year: 'May/June 2021 Paper 2P' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Electric_circuit'
      },
      {
        id: 'waves',
        name: 'Waves',
        syllabusRef: 'P3',
        section: 'Waves',
        description: 'Waves transfer energy without transferring matter. Transverse waves (oscillations ⊥ to direction of travel): light, EM waves, water waves. Longitudinal waves (oscillations ∥ to travel): sound, seismic P-waves. Wave speed v = fλ. Reflection (angle of incidence = angle of reflection), refraction (bending at boundary due to speed change), diffraction (spreading around edges/through gaps). The electromagnetic spectrum from radio → gamma all travel at 3×10⁸ m/s in vacuum. Ultrasound (>20 kHz) is used in medicine and sonar.',
        svgKey: 'eph-waves',
        landmarks: ['Transverse vs longitudinal', 'Amplitude/wavelength/frequency/period', 'Wave equation v = fλ', 'Reflection (law of reflection)', 'Refraction (Snell\'s law)', 'Diffraction', 'EM spectrum (radio → gamma)', 'Speed of light (3×10⁸ m/s)', 'Ultrasound applications'],
        examQA: [
          { q: 'A sound wave has a frequency of 440 Hz and travels at 330 m/s in air. Calculate its wavelength.', a: 'v = fλ → λ = v/f = 330/440 = 0.75 m. This is the wavelength of the musical note A₄. Sound waves are longitudinal — particles of air vibrate parallel to the direction of wave travel in alternating compressions and rarefactions.', year: 'May/June 2022 Paper 2P' },
          { q: 'Describe what happens when a wave is refracted as it enters a denser medium.', a: 'The wave slows down (lower wave speed in the denser medium). If it hits the boundary at an angle, it bends toward the normal (angle of refraction < angle of incidence). The frequency remains the same (determined by the source), but the wavelength decreases (v = fλ, if v decreases and f is constant, λ must decrease). The wave bends back on exiting to its original direction if entering at a matching angle.', year: 'Oct/Nov 2022 Paper 2P' },
          { q: 'State one use of each type of electromagnetic radiation: radio waves, microwaves, X-rays.', a: 'Radio waves: broadcasting (radio/TV), wireless communication, MRI scanning (radio frequency). Microwaves: cooking food (microwave ovens), satellite communications, mobile phone signals. X-rays: medical imaging (bones/organs), airport security scanning, detecting flaws in metal structures. Note: all EM waves travel at 3×10⁸ m/s in vacuum and are transverse waves.', year: 'May/June 2023 Paper 1P' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Wave'
      },
      {
        id: 'energy',
        name: 'Energy Resources & Energy Transfer',
        syllabusRef: 'P4',
        section: 'Energy',
        description: 'Energy exists in multiple forms (kinetic, gravitational potential, elastic, thermal, chemical, nuclear, electrical, light/sound). Conservation of energy: energy cannot be created or destroyed. Efficiency = useful output ÷ total input. Work done = force × distance (W = Fd). Power = W/t (watts). Renewable energy sources (solar, wind, hydroelectric, tidal, geothermal) do not deplete; non-renewable sources (fossil fuels, nuclear) are finite. Sankey diagrams show energy transfers.',
        svgKey: 'eph-energy',
        landmarks: ['Energy forms (KE/GPE/thermal/electrical)', 'Conservation of energy', 'Efficiency = useful output/total input', 'Work W = Fd (joules)', 'Power P = W/t (watts)', 'KE = ½mv²', 'GPE = mgh', 'Renewable (solar/wind/hydro/tidal)', 'Non-renewable (fossil fuels/nuclear)', 'Sankey diagram'],
        examQA: [
          { q: 'A 60 kg student climbs stairs of height 4 m in 5 s. Calculate (a) the work done against gravity and (b) the power output. (g = 10 N/kg)', a: '(a) Work = mgh = 60 × 10 × 4 = 2400 J. (b) Power = Work/time = 2400/5 = 480 W. This is the minimum power — the student\'s actual power output is higher due to inefficiency and accelerating their own body.', year: 'May/June 2022 Paper 2P' },
          { q: 'A motor uses 500 J of electrical energy and does 350 J of useful mechanical work. Calculate its efficiency.', a: 'Efficiency = useful energy output / total energy input = 350/500 = 0.7 = 70%. The remaining 30% (150 J) is wasted, mainly as heat due to friction and electrical resistance in the motor coils.', year: 'Oct/Nov 2022 Paper 2P' },
          { q: 'State two advantages and two disadvantages of using wind turbines for electricity generation.', a: 'Advantages: renewable source — never runs out; no greenhouse gas emissions during operation; low running costs once installed. Disadvantages: unreliable — wind is variable; output depends on wind speed; visual/noise impact on landscape; kills birds; require large land area; high initial installation cost. Any two advantages and two disadvantages.', year: 'May/June 2021 Paper 1P' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Conservation_of_energy'
      },
      {
        id: 'solids-liquids-gases',
        name: 'Solids, Liquids & Gases',
        syllabusRef: 'P5',
        section: 'Matter',
        description: 'Kinetic theory explains properties of matter: solids (regular lattice, vibrate in fixed positions), liquids (close but mobile particles, no fixed arrangement), gases (far apart, rapid random motion, no significant forces). Pressure in gases results from molecular collisions with container walls. Gas laws: at constant temperature, pV = constant (Boyle\'s law); at constant volume, p/T = constant; at constant pressure, V/T = constant. Absolute zero (0 K = −273°C) is when particle motion ceases. Specific heat capacity Q = mcΔT.',
        svgKey: 'eph-solids-liquids',
        landmarks: ['Solid (lattice, vibrating)', 'Liquid (mobile, close)', 'Gas (random, far apart)', 'Pressure = F/A', 'Boyle\'s law (p ∝ 1/V)', 'Charles\'s law (V ∝ T)', 'Absolute zero (0 K)', 'Specific heat capacity Q = mcΔT', 'Specific latent heat (state changes)'],
        examQA: [
          { q: 'Explain in terms of particles why a gas exerts pressure on the walls of its container.', a: 'Gas particles are in continuous random motion. They constantly collide with the container walls. Each collision exerts a small force on the wall (impulse = change in momentum). The total force from billions of collisions per second per unit area of the wall is the gas pressure. Increasing temperature increases particle speed → harder, more frequent collisions → higher pressure.', year: 'May/June 2022 Paper 2P' },
          { q: 'A gas occupies 2.0 dm³ at a pressure of 100 kPa. Calculate its volume if the pressure is increased to 250 kPa at constant temperature.', a: 'Boyle\'s law: p₁V₁ = p₂V₂ (constant temperature). 100 × 2.0 = 250 × V₂. V₂ = 200/250 = 0.8 dm³. When pressure increases, volume decreases proportionally (inverse relationship at constant temperature).', year: 'Oct/Nov 2022 Paper 2P' },
          { q: 'Calculate the energy needed to raise the temperature of 3 kg of water from 20°C to 100°C. (c = 4200 J/kg°C)', a: 'Q = mcΔT = 3 × 4200 × (100 − 20) = 3 × 4200 × 80 = 1,008,000 J = 1008 kJ ≈ 1.0 MJ. Note: this is only to reach boiling point — additional energy (specific latent heat of vaporisation ≈ 2.26 MJ/kg) would be needed to boil the water away completely.', year: 'May/June 2023 Paper 2P' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Kinetic_theory_of_gases'
      },
      {
        id: 'magnetism-em',
        name: 'Magnetism & Electromagnetism',
        syllabusRef: 'P6',
        section: 'Magnetism',
        description: 'Magnetic fields are regions where magnetic materials experience a force. A current-carrying conductor produces a magnetic field (right-hand rule for solenoids). Electromagnets: field strength increases with current, number of turns, and iron core. The motor effect: a current-carrying conductor in a magnetic field experiences a force (F = BIL). Electromagnetic induction: a conductor moving through a magnetic field (or changing flux) induces an EMF. Transformers use mutual induction: Vp/Vs = Np/Ns. AC transmission uses transformers to reduce power loss.',
        svgKey: 'eph-magnetism',
        landmarks: ['Magnetic field lines (N→S)', 'Right-hand rule (solenoid)', 'Electromagnet strength (I, turns, core)', 'Motor effect F = BIL', 'Fleming\'s left-hand rule (motor)', 'Electromagnetic induction (Faraday)', 'Lenz\'s law (direction)', 'Transformer equation Vp/Vs = Np/Ns', 'National Grid (step-up/step-down)'],
        examQA: [
          { q: 'State three ways to increase the strength of an electromagnet.', a: 'Increase the current in the coil — more ampere-turns per length. Increase the number of turns in the coil — stronger concentrated field. Add a soft iron core inside the coil — iron is easily magnetised and greatly concentrates the magnetic field. (Also: decrease the length of the coil to increase turns per unit length.)', year: 'May/June 2022 Paper 1P' },
          { q: 'A transformer has a primary voltage of 240 V and 800 turns on the primary coil. It produces an output of 12 V. Calculate the number of turns on the secondary coil.', a: 'Vp/Vs = Np/Ns → 240/12 = 800/Ns → Ns = 800 × 12/240 = 40 turns. This is a step-down transformer — reduces voltage from 240 V to 12 V. For an ideal transformer: power in = power out, so Ip × 240 = Is × 12, meaning secondary current is 20× larger than primary current.', year: 'Oct/Nov 2022 Paper 2P' },
          { q: 'Explain why electrical energy is transmitted at very high voltage across the National Grid.', a: 'Power transmitted = I × V. At high voltage (step-up transformer raises to 132 kV – 400 kV), current is much lower for the same power. Power wasted in cables = I²R — lower current dramatically reduces this heating loss (quadratic relationship). At the other end, step-down transformers reduce voltage to safe domestic levels (230 V). Overall: lower cable resistance losses, more efficient distribution.', year: 'May/June 2023 Paper 2P' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Electromagnetism'
      },
      {
        id: 'radioactivity',
        name: 'Radioactivity & Particles',
        syllabusRef: 'P7',
        section: 'Nuclear & Space',
        description: 'The nucleus contains protons (atomic number Z) and neutrons (mass number A − Z). Unstable nuclei decay by emitting: alpha (⁴₂He, +2, paper-stopped, most ionising); beta (electron, −1, aluminium-stopped); or gamma (EM wave, lead-stopped, most penetrating). Half-life is the time for half the radioactive nuclei to decay. Nuclear fission splits heavy nuclei (e.g., ²³⁵U) releasing huge energy and 2-3 neutrons (chain reaction). Nuclear fusion combines light nuclei at extreme temperature, releasing even more energy.',
        svgKey: 'eph-radioactivity',
        landmarks: ['Alpha (⁴₂He, +2, paper)', 'Beta (e⁻, −1, aluminium)', 'Gamma (EM, 0, lead)', 'Half-life', 'Ionising radiation hazards', 'Background radiation', 'Nuclear fission (chain reaction)', 'Nuclear fusion (stellar energy)', 'Geiger-Müller tube'],
        examQA: [
          { q: 'A radioactive source has an initial count rate of 640 counts/s and a half-life of 5 years. What is the count rate after 20 years?', a: '20 years ÷ 5 years = 4 half-lives. After each half-life, count rate halves: 640 → 320 → 160 → 80 → 40 counts/s. After 20 years, the count rate is 40 counts/s (1/16 of the original).', year: 'May/June 2022 Paper 2P' },
          { q: 'Explain the difference between nuclear fission and nuclear fusion.', a: 'Fission: a large, unstable nucleus (e.g., uranium-235) absorbs a neutron and splits into two smaller daughter nuclei + 2-3 neutrons + large energy release. The released neutrons can trigger further fissions — chain reaction. Used in nuclear reactors and bombs. Fusion: two small nuclei (e.g., deuterium + tritium) combine at very high temperature/pressure to form a heavier nucleus + energy. Powers the Sun and stars. More energy per kg of fuel than fission. Not yet commercially viable on Earth.', year: 'Oct/Nov 2023 Paper 2P' },
          { q: 'Describe how to distinguish between alpha, beta, and gamma radiation using absorbers and a Geiger-Müller tube.', a: 'Place GM tube near source; record count rate. Place sheet of paper between source and GM tube: if count rate drops to background → alpha radiation present. Replace paper with thin aluminium (few mm): if count rate drops significantly → beta radiation. Replace aluminium with thick lead block (several cm): if count rate drops significantly → gamma radiation. If count rate remains only just above background with lead — gamma confirmed.', year: 'May/June 2021 Paper 3P' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Radioactive_decay'
      },
      {
        id: 'astrophysics',
        name: 'Astrophysics',
        syllabusRef: 'P8',
        section: 'Nuclear & Space',
        description: 'Our Solar System contains the Sun, 8 planets, dwarf planets, moons, asteroids, and comets. Stars form from nebulae (gas/dust clouds) collapsing under gravity; nuclear fusion begins when temperature is high enough. A star\'s life cycle depends on mass: small stars → main sequence → red giant → white dwarf; massive stars → red supergiant → supernova → neutron star or black hole. The universe began with the Big Bang ~13.8 billion years ago; evidence includes galactic redshift and cosmic microwave background radiation.',
        svgKey: 'eph-astrophysics',
        landmarks: ['Solar System structure', 'Nebula → protostar → main sequence', 'Red giant/supergiant', 'White dwarf (small stars)', 'Neutron star/black hole (massive stars)', 'Supernova', 'Nuclear fusion (H → He) in stars', 'Big Bang theory', 'Redshift (galaxies receding)', 'CMB radiation'],
        examQA: [
          { q: 'Describe the life cycle of a star much more massive than our Sun, from main sequence to its final state.', a: 'Massive star in main sequence: hydrogen fuses to helium in core. As hydrogen runs out, core contracts, outer layers expand → red supergiant. Core continues fusing heavier elements. Core collapses catastrophically → enormous supernova explosion (briefly outshines galaxy). Remnant core: if 1.4-3× solar mass → neutron star (extreme density); if >3× solar mass → black hole (gravity so strong nothing escapes, not even light).', year: 'May/June 2022 Paper 2P' },
          { q: 'Describe two pieces of evidence that support the Big Bang theory.', a: '1. Galactic redshift: light from distant galaxies is redshifted — wavelengths are longer than expected. This means galaxies are moving away from us. More distant galaxies recede faster (Hubble\'s law). This suggests the universe is expanding — consistent with an initial explosive origin. 2. Cosmic Microwave Background (CMB) radiation: uniform microwave radiation coming from all directions in space. This is the "thermal afterglow" of the hot dense early universe, now cooled to about 2.7 K as the universe expanded.', year: 'Oct/Nov 2023 Paper 2P' },
          { q: 'Explain the role of nuclear fusion in maintaining a star\'s stability during its main sequence phase.', a: 'In a main sequence star, nuclear fusion in the core (hydrogen fusing to helium) releases enormous energy as gamma radiation. This creates an outward radiation pressure. Gravity acts inward, tending to collapse the star. When outward radiation pressure exactly balances inward gravitational force, the star is in a stable equilibrium — hydrostatic equilibrium. This balance maintains the star\'s constant size during the main sequence phase, which for our Sun lasts about 10 billion years.', year: 'May/June 2021 Paper 2P' }
        ],
        wikiUrl: 'https://en.wikipedia.org/wiki/Stellar_evolution'
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
  if (code === '4BI1') return 'edexcel_igcse_biology';
  if (code === '4CH1') return 'edexcel_igcse_chemistry';
  if (code === '4PH1') return 'edexcel_igcse_physics';
  // Name-based fallback
  const name = (subj.name || '').toLowerCase();
  if (name.includes('biology')   && (name.includes('cambridge') || name.includes('igcse'))) return 'cambridge_igcse_biology';
  if (name.includes('chemistry') && (name.includes('cambridge') || name.includes('igcse'))) return 'cambridge_igcse_chemistry';
  if (name.includes('physics')   && (name.includes('cambridge') || name.includes('igcse'))) return 'cambridge_igcse_physics';
  if (name.includes('biology')   && name.includes('edexcel')) return 'edexcel_igcse_biology';
  if (name.includes('chemistry') && name.includes('edexcel')) return 'edexcel_igcse_chemistry';
  if (name.includes('physics')   && name.includes('edexcel')) return 'edexcel_igcse_physics';
  return null;
}
