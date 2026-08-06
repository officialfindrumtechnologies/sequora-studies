// Topic Visualizer content — IB Diploma.
//
// Split out of the single 1.9 MB topic-visuals.js so the loader can fetch one
// board's topic text instead of every board's. Paired with
// topic-svgs-ib.js, which holds this board's diagrams.
//
// 6 subjects, 225 topics. Generated — edit the content here, but keep the
// shape: { <tvKey>: { subjectName, examCode, sections, topics: [...] } }.

export const TV_IB = {
 "ib_hl_biology": {
  "subjectName": "IB Biology HL",
  "examCode": "IB-BIO-HL",
  "sections": [
   "All",
   "Topic 1: Cell biology",
   "Topic 2: Molecular biology",
   "Topic 3: Genetics",
   "Topic 4: Ecology",
   "Topic 5: Evolution and biodiversity",
   "Topic 6: Human physiology",
   "Topic 7: Nucleic acids (HL)",
   "Topic 8: Metabolism (HL)",
   "Topic 9: Plant biology (HL)",
   "Topic 10: Genetics and evolution (HL)",
   "Topic 11: Animal physiology (HL)"
  ],
  "topics": [
   {
    "id": "1-1-intro-cells",
    "name": "1.1 Introduction to cells",
    "syllabusRef": "A2.2",
    "section": "A2. Unity and diversity — Cells",
    "description": "Cell theory: all organisms are composed of cells; the cell is the basic structural and functional unit of life; all cells arise from pre-existing cells (Virchow). Prokaryotic cells lack a nucleus and membrane-bound organelles. Eukaryotic cells have a true nucleus, mitochondria, ER and Golgi.",
    "svgKey": "ib-bio-1-cell-biology",
    "landmarks": [
     "Cell theory (3 tenets)",
     "Prokaryote vs eukaryote",
     "Plasma membrane",
     "Nucleus + nucleolus",
     "Mitochondria",
     "Rough/smooth ER",
     "Golgi apparatus",
     "SA:Vol ratio"
    ],
    "examQA": [
     {
      "q": "State the three tenets of cell theory.",
      "a": "1. All living organisms are composed of one or more cells. 2. The cell is the basic structural and functional unit. 3. All cells arise from pre-existing cells."
     },
     {
      "q": "Why must cells remain small?",
      "a": "As volume increases faster than surface area, the SA:Vol ratio decreases. The plasma membrane cannot supply nutrients/remove wastes for the whole cytoplasm, so cells divide rather than enlarge."
     }
    ],
    "sketchfab3dId": "7fe3ac29756a45c6b678804a8da8a760",
    "wikiUrl": "https://en.wikipedia.org/wiki/Cell_(biology)"
   },
   {
    "id": "1-2-ultrastructure",
    "name": "1.2 Ultrastructure of cells",
    "syllabusRef": "A2.2",
    "section": "A2. Unity and diversity — Cells",
    "description": "Electron microscopy reveals cell ultrastructure. Prokaryotes: nucleoid (no membrane), 70S ribosomes, cell wall (peptidoglycan), pili, flagella, plasmids. Eukaryotes: nucleus with nuclear envelope (pores), 80S ribosomes, mitochondria (cristae), rough/smooth ER, Golgi apparatus, lysosomes, chloroplasts (in plant/algal cells).",
    "svgKey": "ib-bio-1-cell-biology",
    "landmarks": [
     "Nucleoid vs nucleus",
     "70S (prokaryote) vs 80S ribosomes",
     "Mitochondria (cristae, matrix)",
     "Rough ER + ribosomes",
     "Smooth ER (lipid synthesis)",
     "Golgi cisternae",
     "Lysosomes",
     "Chloroplasts (thylakoids, stroma)"
    ],
    "examQA": [
     {
      "q": "Compare prokaryotic and eukaryotic cell structure.",
      "a": "Prokaryotic: nucleoid (no envelope), 70S ribosomes, no membrane-bound organelles, ~1-10 µm, peptidoglycan wall. Eukaryotic: nucleus with double membrane + pores, 80S ribosomes, membrane-bound organelles, ~10-100 µm."
     },
     {
      "q": "State the functions of the Golgi apparatus.",
      "a": "Modifies and packages proteins/lipids received from the ER; sorts them into vesicles for secretion, lysosomes, or other destinations. Site of glycoprotein production."
     }
    ],
    "sketchfab3dId": "7fe3ac29756a45c6b678804a8da8a760",
    "wikiUrl": "https://en.wikipedia.org/wiki/Cell_ultrastructure"
   },
   {
    "id": "1-3-membrane-structure",
    "name": "1.3 Membrane structure",
    "syllabusRef": "B2.1",
    "section": "B2. Form and function — Cells",
    "description": "The fluid mosaic model describes membranes as phospholipid bilayers with embedded proteins. Phospholipids have hydrophilic heads and hydrophobic tails. Cholesterol stabilises membrane fluidity. Integral proteins span the bilayer; peripheral proteins are associated with the surface. Glycoproteins and glycolipids form the glycocalyx.",
    "svgKey": "ib-bio-1-cell-biology",
    "landmarks": [
     "Fluid mosaic model (Singer-Nicolson)",
     "Phospholipid bilayer",
     "Hydrophilic heads / hydrophobic tails",
     "Integral vs peripheral proteins",
     "Channel and carrier proteins",
     "Cholesterol (fluidity buffer)",
     "Glycocalyx (glycoproteins + glycolipids)"
    ],
    "examQA": [
     {
      "q": "Explain the fluid mosaic model of membrane structure.",
      "a": "Phospholipids form a bilayer with hydrophilic heads facing outward and hydrophobic tails inward. Proteins float within (integral) or on the surface of (peripheral) this bilayer. The membrane is fluid: phospholipids and proteins can move laterally. Cholesterol stabilises fluidity at varying temperatures."
     },
     {
      "q": "State the roles of membrane proteins.",
      "a": "Channel proteins: allow passive movement of polar molecules/ions. Carrier proteins: active/facilitated transport. Receptor proteins: cell signalling. Enzymes: catalysis. Glycoproteins: cell recognition and communication."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Cell_membrane"
   },
   {
    "id": "1-4-membrane-transport",
    "name": "1.4 Membrane transport",
    "syllabusRef": "B2.1",
    "section": "B2. Form and function — Cells",
    "description": "Simple diffusion: random movement of molecules from high to low concentration (no energy). Osmosis: movement of water across a semipermeable membrane from high to low water potential. Facilitated diffusion: via channel or carrier proteins (no energy). Active transport: against concentration gradient using ATP and carrier proteins. Endocytosis/exocytosis involve membrane vesicles.",
    "svgKey": "ib-bio-1-cell-biology",
    "landmarks": [
     "Simple diffusion (lipid-soluble molecules)",
     "Osmosis (water potential gradient)",
     "Facilitated diffusion (proteins, no ATP)",
     "Active transport (ATP + carrier)",
     "Endocytosis / exocytosis",
     "Turgor pressure in plant cells"
    ],
    "examQA": [
     {
      "q": "Distinguish between facilitated diffusion and active transport.",
      "a": "Facilitated diffusion: moves molecules down concentration gradient through channel/carrier proteins; no ATP required. Active transport: moves molecules against concentration gradient via carrier proteins; requires ATP hydrolysis."
     },
     {
      "q": "Explain why osmosis is a special case of diffusion.",
      "a": "Osmosis is the net movement of water molecules across a partially permeable membrane from a region of higher water potential to lower water potential. It follows diffusion principles but refers specifically to water molecules; the membrane is impermeable to solute."
     }
    ],
    "threejs3dFn": "createDiffusionAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Membrane_transport"
   },
   {
    "id": "1-5-origin-cells",
    "name": "1.5 The origin of cells",
    "syllabusRef": "A2.1",
    "section": "A2. Unity and diversity — Cells",
    "description": "The first cells arose from non-living matter (abiogenesis). Experimental evidence: Miller-Urey experiment produced amino acids from inorganic gases. RNA world hypothesis: RNA can both store information and catalyse reactions (ribozymes). Cells arose when membranes enclosed self-replicating RNA. All present cells arise from pre-existing cells.",
    "svgKey": "ib-bio-1-cell-biology",
    "landmarks": [
     "Abiogenesis hypothesis",
     "Miller-Urey experiment (amino acids from inorganic gases)",
     "RNA world hypothesis",
     "Ribozymes (catalytic RNA)",
     "Protocells (lipid vesicles)",
     "Endosymbiotic theory (mitochondria/chloroplasts)"
    ],
    "examQA": [
     {
      "q": "Describe evidence supporting the RNA world hypothesis.",
      "a": "RNA can store genetic information (like DNA) and catalyse reactions (ribozymes, e.g. in the spliceosome and ribosome). This dual role suggests RNA was the original self-replicating molecule before DNA evolved as a more stable information store."
     },
     {
      "q": "Outline the Miller-Urey experiment and its significance.",
      "a": "Simulated early Earth atmosphere (CH₄, NH₃, H₂, H₂O) with electrical sparks. After one week, amino acids and organic molecules were produced from inorganic components. Showed organic molecules needed for life can arise spontaneously from simple inorganic precursors."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Abiogenesis"
   },
   {
    "id": "1-6-cell-division",
    "name": "1.6 Cell division",
    "syllabusRef": "D2.1",
    "section": "D2. Continuity and change — Cells",
    "description": "Mitosis produces two genetically identical daughter cells. Stages: PMAT — Prophase (chromosomes condense), Metaphase (align on equator), Anaphase (chromatids separate), Telophase (nuclear envelopes reform). Cytokinesis divides the cytoplasm. The cell cycle includes G1, S (DNA synthesis), G2 and M phases. Cancer results from uncontrolled cell division.",
    "svgKey": "ib-bio-1-cell-biology",
    "landmarks": [
     "Cell cycle (G1, S, G2, M)",
     "Prophase: chromosomes condense",
     "Metaphase: chromosomes align",
     "Anaphase: chromatids separate",
     "Telophase: nuclear envelopes reform",
     "Cytokinesis",
     "Tumour suppressor genes / oncogenes"
    ],
    "examQA": [
     {
      "q": "Outline the stages of mitosis.",
      "a": "Prophase: chromosomes condense, spindle forms, nuclear envelope breaks down. Metaphase: chromosomes align at equator. Anaphase: spindle fibres pull sister chromatids to opposite poles. Telophase: nuclear envelopes reform, chromosomes decondense. Result: two identical nuclei."
     },
     {
      "q": "Distinguish mitosis from meiosis.",
      "a": "Mitosis: 1 division, 2 identical diploid daughter cells, no crossing over, for growth/repair. Meiosis: 2 divisions, 4 haploid daughter cells, crossing over occurs, for sexual reproduction/genetic variation."
     }
    ],
    "threejs3dFn": "createCellDivision",
    "wikiUrl": "https://en.wikipedia.org/wiki/Mitosis"
   },
   {
    "id": "2-1-molecules-metabolism",
    "name": "2.1 Molecules to metabolism",
    "syllabusRef": "B1.1",
    "section": "B1. Form and function — Molecules",
    "description": "Living organisms are composed of carbon-based molecules. Carbon forms 4 covalent bonds, enabling diverse macromolecules. Carbohydrates, lipids, proteins and nucleic acids are assembled from monomers via condensation reactions and broken down by hydrolysis. Metabolism is the total of all chemical reactions in a cell.",
    "svgKey": "ib-bio-2-molecular-biology",
    "landmarks": [
     "Carbon (4 bonds, versatility)",
     "Condensation (–H₂O)",
     "Hydrolysis (+H₂O)",
     "Monomers and polymers",
     "Carbohydrates: glucose → starch/glycogen/cellulose",
     "Proteins: amino acids → polypeptides",
     "Lipids: glycerol + fatty acids",
     "Nucleic acids: nucleotides → DNA/RNA"
    ],
    "examQA": [
     {
      "q": "Distinguish between condensation and hydrolysis.",
      "a": "Condensation: two monomers join with removal of water; forms a new covalent bond (e.g. glycosidic, peptide, ester). Hydrolysis: a polymer is split into monomers by adding water; breaks the covalent bond. These are reverse reactions."
     },
     {
      "q": "State why carbon is the basis of organic chemistry.",
      "a": "Carbon forms 4 stable covalent bonds, enabling chains, branches and rings of carbon atoms. It bonds to H, O, N, S and other carbons. This versatility allows the enormous structural diversity of biological macromolecules."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Metabolism"
   },
   {
    "id": "2-2-water",
    "name": "2.2 Water",
    "syllabusRef": "A1.1",
    "section": "A1. Unity and diversity — Molecules",
    "description": "Water molecules are polar: oxygen is partially negative, hydrogens partially positive. This enables hydrogen bonding between water molecules. Properties: high specific heat capacity, high latent heat of vaporisation, cohesion/adhesion, maximum density at 4°C, solvent properties. These properties make water essential for life.",
    "svgKey": "ib-bio-2-molecular-biology",
    "landmarks": [
     "Polarity (δ+H, δ−O)",
     "Hydrogen bonding",
     "High specific heat capacity",
     "High latent heat of vaporisation",
     "Cohesion / adhesion / surface tension",
     "Maximum density at 4°C (ice floats)",
     "Universal solvent (ionic/polar solutes)"
    ],
    "examQA": [
     {
      "q": "Explain how the hydrogen bonding of water contributes to its role as a coolant.",
      "a": "Water has high latent heat of vaporisation (~2260 J g⁻¹). When water evaporates (sweating, transpiration), many hydrogen bonds must break. This requires large amounts of energy, removing heat from the organism/surface and acting as an effective cooling mechanism."
     },
     {
      "q": "State two properties of water related to hydrogen bonding and explain their significance.",
      "a": "1. High specific heat: resists temperature change → stable aquatic habitats. 2. Cohesion: water molecules stick together → cohesion-tension in xylem transport in plants."
     }
    ],
    "threejs3dFn": "createMolecule('water')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Properties_of_water"
   },
   {
    "id": "2-3-carbs-lipids",
    "name": "2.3 Carbohydrates and lipids",
    "syllabusRef": "B1.1",
    "section": "B1. Form and function — Molecules",
    "description": "Carbohydrates: glucose (α and β), fructose, galactose are monosaccharides. Disaccharides (maltose, sucrose, lactose) form by condensation. Polysaccharides: starch (energy storage in plants), glycogen (energy storage in animals), cellulose (structural, β-1-4 bonds). Lipids: triglycerides (energy storage), phospholipids (membranes), steroids (hormones, cholesterol).",
    "svgKey": "ib-bio-2-molecular-biology",
    "landmarks": [
     "α-glucose vs β-glucose",
     "Glycosidic bonds",
     "Starch (amylose + amylopectin)",
     "Glycogen (more branched than starch)",
     "Cellulose (β-1-4, structural)",
     "Triglycerides (glycerol + 3 FA, ester bonds)",
     "Saturated vs unsaturated fatty acids",
     "Phospholipids (bilayer)"
    ],
    "examQA": [
     {
      "q": "Compare the structures and functions of starch and cellulose.",
      "a": "Both are glucose polysaccharides. Starch: α-glucose, 1-4 (amylose) and 1-6 (amylopectin) glycosidic bonds, coiled/branched, compact → energy storage. Cellulose: β-glucose, 1-4 bonds, straight chains form microfibrils via H-bonds → structural role in cell walls."
     },
     {
      "q": "Explain why lipids are good energy storage molecules.",
      "a": "Lipids store about twice as much energy per gram as carbohydrates (hydrocarbons are highly reduced). They are hydrophobic so do not absorb water, meaning stored fat adds less mass than an equivalent carbohydrate store."
     }
    ],
    "threejs3dFn": "createPolymerChain",
    "wikiUrl": "https://en.wikipedia.org/wiki/Carbohydrate"
   },
   {
    "id": "2-4-proteins",
    "name": "2.4 Proteins",
    "syllabusRef": "B1.2",
    "section": "B1. Form and function — Molecules",
    "description": "Proteins are polymers of amino acids linked by peptide bonds. 20 amino acids, each with an R group. Primary structure: amino acid sequence. Secondary structure: α-helix, β-pleated sheet (H-bonds). Tertiary structure: 3D folding (ionic, disulfide, hydrophobic, H-bonds). Quaternary: multiple polypeptide chains. Denaturation: loss of tertiary structure by heat or pH change.",
    "svgKey": "ib-bio-2-molecular-biology",
    "landmarks": [
     "Amino acid structure (NH₂, COOH, R group)",
     "Peptide bond (condensation)",
     "Primary structure (sequence)",
     "Secondary structure (H-bonds)",
     "Tertiary structure (R group interactions)",
     "Quaternary structure (multiple chains)",
     "Denaturation (H+ or high T)",
     "Fibrous vs globular proteins"
    ],
    "examQA": [
     {
      "q": "Explain the levels of protein structure.",
      "a": "Primary: amino acid sequence (peptide bonds). Secondary: α-helix or β-pleated sheet held by H-bonds between backbone NH and C=O. Tertiary: 3D folding of whole polypeptide by R-group interactions (ionic, disulfide bridges, H-bonds, hydrophobic). Quaternary: association of two or more polypeptide chains."
     },
     {
      "q": "Explain denaturation of an enzyme at high temperature.",
      "a": "High temperature disrupts weak bonds (H-bonds, ionic bonds) maintaining the tertiary structure of the enzyme. The active site changes shape so the substrate can no longer fit. The enzyme loses catalytic activity. Disulfide bridges are covalent and are NOT broken by heat; only the weak interactions are lost, and the change is usually irreversible."
     }
    ],
    "threejs3dFn": "createPolymerChain",
    "wikiUrl": "https://en.wikipedia.org/wiki/Protein"
   },
   {
    "id": "2-5-enzymes",
    "name": "2.5 Enzymes",
    "syllabusRef": "C1.1",
    "section": "C1. Interaction and interdependence — Molecules",
    "description": "Enzymes are biological catalysts (proteins, or RNA — ribozymes) that lower activation energy. Induced-fit model: substrate binds and causes conformational change in active site. Factors affecting rate: temperature, pH, substrate concentration, inhibitors. Competitive inhibitors block the active site; non-competitive inhibitors bind allosteric sites.",
    "svgKey": "ib-bio-2-molecular-biology",
    "landmarks": [
     "Activation energy",
     "Induced-fit model",
     "Enzyme-substrate complex",
     "Effect of temperature (Q10)",
     "Effect of pH",
     "Effect of [substrate]",
     "Competitive inhibition (active site)",
     "Non-competitive inhibition (allosteric site)"
    ],
    "examQA": [
     {
      "q": "Distinguish between competitive and non-competitive inhibition.",
      "a": "Competitive: inhibitor has similar shape to substrate, binds active site, blocks substrate; overcome by increasing [S]. Non-competitive: inhibitor binds allosteric (different) site, causes conformational change in active site; increasing [S] cannot overcome inhibition."
     },
     {
      "q": "Explain the effect of temperature on enzyme activity.",
      "a": "Up to the optimum temperature, rate increases as kinetic energy increases (more collisions between enzyme and substrate, and faster product formation). Above optimum, thermal energy disrupts H-bonds and other weak forces maintaining tertiary structure; active site changes shape; enzyme is denatured and activity falls to zero."
     }
    ],
    "threejs3dFn": "createReactionAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Enzyme"
   },
   {
    "id": "2-6-dna-rna-structure",
    "name": "2.6 Structure of DNA and RNA",
    "syllabusRef": "A1.2",
    "section": "A1. Unity and diversity — Molecules",
    "description": "DNA double helix: two antiparallel polynucleotide strands. Nucleotides: phosphate + deoxyribose + base (A, T, G, C). Base pairing: A-T (2 H-bonds), G-C (3 H-bonds). RNA: single-stranded, ribose sugar, uracil replaces thymine. Types of RNA: mRNA, tRNA, rRNA.",
    "svgKey": "ib-bio-2-molecular-biology",
    "landmarks": [
     "Nucleotide structure (phosphate, sugar, base)",
     "DNA bases: A, T, G, C",
     "RNA bases: A, U, G, C",
     "A-T (2H-bonds), G-C (3H-bonds)",
     "Antiparallel strands (5′→3′)",
     "DNA: deoxyribose; RNA: ribose",
     "Types of RNA: mRNA, tRNA, rRNA"
    ],
    "examQA": [
     {
      "q": "Describe the structure of a DNA nucleotide.",
      "a": "A DNA nucleotide consists of three components joined by covalent bonds: a phosphate group, a deoxyribose sugar (5-carbon), and a nitrogenous base (adenine, thymine, guanine or cytosine). The phosphate attaches to the 5′ carbon; the base attaches to the 1′ carbon."
     },
     {
      "q": "Compare DNA and RNA.",
      "a": "DNA: double-stranded, deoxyribose sugar, bases A/T/G/C, stable, carries genetic code. RNA: single-stranded, ribose sugar, bases A/U/G/C, less stable, various roles in protein synthesis."
     }
    ],
    "threejs3dFn": "createPolymerChain",
    "sketchfab3dId": "224d09f75a674f4a8107e79e3d3d5552",
    "wikiUrl": "https://en.wikipedia.org/wiki/DNA"
   },
   {
    "id": "2-7-dna-replication-transcription-translation",
    "name": "2.7 DNA replication transcription and translation",
    "syllabusRef": "D1.1",
    "section": "D1. Continuity and change — Molecules",
    "description": "DNA replication is semi-conservative: each strand serves as a template. Helicase unwinds; DNA polymerase synthesises 5′→3′. Transcription: RNA polymerase synthesises mRNA complementary to the template strand. Translation: ribosome reads mRNA codons; tRNA anticodons bring amino acids; polypeptide forms. The genetic code is degenerate and universal.",
    "svgKey": "ib-bio-2-molecular-biology",
    "landmarks": [
     "Semi-conservative replication (Meselson-Stahl)",
     "Helicase (unwinds)",
     "DNA polymerase III (synthesises 5′→3′)",
     "Transcription: mRNA from DNA template",
     "RNA polymerase",
     "Codons (triplet code)",
     "tRNA anticodon + amino acid",
     "Ribosome: peptide bond formation"
    ],
    "examQA": [
     {
      "q": "Explain semi-conservative DNA replication.",
      "a": "Double helix unwinds (helicase). Each original strand acts as template. Complementary nucleotides added 5′→3′ by DNA polymerase III. Each daughter molecule contains one original (parental) strand and one new strand. Proved by Meselson-Stahl experiment with ¹⁵N/¹⁴N labelling."
     },
     {
      "q": "State what is meant by the genetic code being degenerate and universal.",
      "a": "Degenerate: multiple codons code for the same amino acid (64 codons, 20 amino acids). Universal: the same codons code for the same amino acids in almost all organisms — evidence for a common ancestor."
     }
    ],
    "threejs3dFn": "createPolymerChain",
    "sketchfab3dId": "224d09f75a674f4a8107e79e3d3d5552",
    "wikiUrl": "https://en.wikipedia.org/wiki/Central_dogma_of_molecular_biology"
   },
   {
    "id": "2-8-cell-respiration",
    "name": "2.8 Cell respiration",
    "syllabusRef": "C1.2",
    "section": "C1. Interaction and interdependence — Molecules",
    "description": "Aerobic respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ~36 ATP. Stages: glycolysis (cytoplasm, 2 ATP net), Krebs cycle (matrix, 2 ATP), oxidative phosphorylation (cristae, ~32 ATP). Anaerobic: glycolysis only → lactate (animals) or ethanol + CO₂ (yeast).",
    "svgKey": "ib-bio-2-molecular-biology",
    "landmarks": [
     "Glycolysis (cytoplasm, 2 ATP net)",
     "Pyruvate → acetyl-CoA",
     "Krebs cycle (matrix, 2 ATP)",
     "Oxidative phosphorylation (cristae)",
     "Electron transport chain + ATP synthase",
     "Chemiosmosis",
     "Anaerobic: lactate / ethanol + CO₂"
    ],
    "examQA": [
     {
      "q": "State the products of glycolysis.",
      "a": "2 pyruvate, 2 ATP (net), 2 NADH. Occurs in cytoplasm. Glucose (6C) → 2 pyruvate (3C each). ATP is made by substrate-level phosphorylation."
     },
     {
      "q": "Explain how ATP is produced by chemiosmosis.",
      "a": "Electrons from NADH/FADH₂ pass along the electron transport chain on the inner mitochondrial membrane, releasing energy. This energy pumps H⁺ ions from the matrix into the intermembrane space, creating a proton gradient. H⁺ ions flow back through ATP synthase (chemiosmosis), driving phosphorylation of ADP to ATP."
     }
    ],
    "threejs3dFn": "createRespirationAnimation",
    "sketchfab3dId": "7445a425050e49daa881070ca6917a91",
    "wikiUrl": "https://en.wikipedia.org/wiki/Cellular_respiration"
   },
   {
    "id": "2-9-photosynthesis",
    "name": "2.9 Photosynthesis",
    "syllabusRef": "C1.3",
    "section": "C1. Interaction and interdependence — Molecules",
    "description": "Photosynthesis: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. Light reactions (thylakoids): light absorbed by chlorophyll, splitting water, producing ATP and NADPH. Calvin cycle (stroma): CO₂ fixed by RuBisCO; uses ATP and NADPH to produce glycerate-3-phosphate → triose phosphate → glucose.",
    "svgKey": "ib-bio-2-molecular-biology",
    "landmarks": [
     "Thylakoid (light reactions)",
     "Stroma (Calvin cycle)",
     "Photosystems I and II",
     "Photolysis of water (O₂ released)",
     "ATP synthesis (light reactions)",
     "NADPH production",
     "CO₂ fixation by RuBisCO",
     "Calvin cycle: GP → TP → glucose"
    ],
    "examQA": [
     {
      "q": "Distinguish between the light-dependent and light-independent reactions.",
      "a": "Light-dependent (thylakoid): require light; photolysis of water produces O₂; ATP and NADPH produced. Light-independent / Calvin cycle (stroma): do not require light directly; use ATP + NADPH to fix CO₂ and reduce GP to TP; produce glucose."
     },
     {
      "q": "State the role of RuBisCO in photosynthesis.",
      "a": "RuBisCO (ribulose bisphosphate carboxylase/oxygenase) catalyses the fixation of CO₂ to ribulose bisphosphate (RuBP, 5C) in the Calvin cycle, producing two molecules of glycerate-3-phosphate (3C). It is the primary entry point of carbon into organic molecules."
     }
    ],
    "threejs3dFn": "createPhotosynthesisAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Photosynthesis"
   },
   {
    "id": "3-1-genes",
    "name": "3.1 Genes",
    "syllabusRef": "D3.2",
    "section": "D3. Continuity and change — Organisms",
    "description": "A gene is a heritable factor consisting of a sequence of DNA that influences a specific characteristic. An allele is a variant form of a gene. The genome is the complete set of genes of an organism. Loci are the positions of genes on chromosomes. Diploid organisms carry two alleles per gene (on homologous chromosomes); gametes are haploid.",
    "svgKey": "ib-bio-3-genetics",
    "landmarks": [
     "Gene (DNA sequence → polypeptide)",
     "Allele (alternative form)",
     "Locus (position on chromosome)",
     "Diploid (2n) vs haploid (n)",
     "Homozygous vs heterozygous",
     "Dominant vs recessive alleles",
     "Genome / proteome"
    ],
    "examQA": [
     {
      "q": "Define gene, allele and locus.",
      "a": "Gene: a heritable factor (DNA sequence) that influences a specific characteristic. Allele: one specific form of a gene, occupying the same locus as other alleles of that gene. Locus: the specific position of a gene on a chromosome."
     },
     {
      "q": "Distinguish between dominant and recessive alleles.",
      "a": "Dominant: expressed in phenotype when one or two copies present (heterozygous or homozygous). Recessive: expressed in phenotype only when two copies present (homozygous recessive); masked by dominant allele in heterozygotes."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Gene"
   },
   {
    "id": "3-2-chromosomes",
    "name": "3.2 Chromosomes",
    "syllabusRef": "D2.1",
    "section": "D2. Continuity and change — Cells",
    "description": "Chromosomes are composed of DNA wrapped around histone proteins (nucleosomes). Karyotype: the number and appearance of chromosomes. Autosomes: non-sex chromosomes. Sex chromosomes: XX (female), XY (male) in humans. Chromosome number: haploid (n) and diploid (2n). Non-disjunction during meiosis causes aneuploidy (e.g., trisomy 21 = Down syndrome).",
    "svgKey": "ib-bio-3-genetics",
    "landmarks": [
     "Chromosome structure (DNA + histones)",
     "Karyotype (46 in humans)",
     "Autosomes vs sex chromosomes",
     "XX (female) / XY (male)",
     "Homologous chromosome pairs",
     "Non-disjunction → aneuploidy",
     "Down syndrome (trisomy 21)"
    ],
    "examQA": [
     {
      "q": "Explain how sex is determined in humans.",
      "a": "Humans have 46 chromosomes: 44 autosomes + 2 sex chromosomes. Females have XX; males have XY. The SRY gene on the Y chromosome triggers male development. Eggs always carry X; sperm carry X or Y. The sperm (50:50) determines sex of offspring."
     },
     {
      "q": "Explain the consequences of non-disjunction during meiosis I.",
      "a": "Homologous chromosomes fail to separate, so both go to one daughter cell and neither to the other. Fertilisation of a gamete with an extra chromosome produces a trisomy (2n+1), e.g. trisomy 21 (Down syndrome). Fertilisation of a gamete lacking a chromosome produces a monosomy (2n-1)."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Chromosome"
   },
   {
    "id": "3-3-meiosis",
    "name": "3.3 Meiosis",
    "syllabusRef": "D2.1",
    "section": "D2. Continuity and change — Cells",
    "description": "Meiosis produces four haploid cells from one diploid cell. Two divisions: Meiosis I separates homologous chromosomes; Meiosis II separates sister chromatids. Crossing over (chiasmata) in prophase I and independent assortment in metaphase I generate genetic variation. Fertilisation of two gametes restores the diploid number.",
    "svgKey": "ib-bio-3-genetics",
    "landmarks": [
     "Meiosis I: homologues separate",
     "Meiosis II: chromatids separate",
     "Prophase I: crossing over (chiasmata)",
     "Independent assortment",
     "Four haploid daughter cells",
     "Genetic variation sources",
     "Gametogenesis (spermatogenesis / oogenesis)"
    ],
    "examQA": [
     {
      "q": "Explain how meiosis generates genetic variation.",
      "a": "1. Crossing over (prophase I): non-sister chromatids of a homologous pair exchange segments at chiasmata, creating recombinant chromosomes with new allele combinations. 2. Independent assortment (metaphase I): bivalents align randomly; each gamete receives a random mix of maternal and paternal chromosomes. Combined with random fertilisation, these mechanisms produce enormous genetic diversity."
     },
     {
      "q": "Compare mitosis and meiosis.",
      "a": "Mitosis: 1 division, 2 diploid daughter cells, no crossing over, for growth/repair, produces genetically identical cells. Meiosis: 2 divisions, 4 haploid daughter cells, crossing over occurs, for sexual reproduction, produces genetically varied gametes."
     }
    ],
    "threejs3dFn": "createCellDivision",
    "wikiUrl": "https://en.wikipedia.org/wiki/Meiosis"
   },
   {
    "id": "3-4-inheritance",
    "name": "3.4 Inheritance",
    "syllabusRef": "D3.2",
    "section": "D3. Continuity and change — Organisms",
    "description": "Mendel's first law (segregation): alleles separate during gamete formation. Punnett squares predict offspring ratios. Codominance: both alleles expressed (e.g. blood type AB). Incomplete dominance: intermediate phenotype. Sex linkage: genes on X chromosome (e.g. haemophilia, colour blindness). Dihybrid crosses: 9:3:3:1 ratio (independent assortment).",
    "svgKey": "ib-bio-3-genetics",
    "landmarks": [
     "Punnett square",
     "Monohybrid cross (3:1 ratio)",
     "Codominance (IA:IB blood type)",
     "Incomplete dominance (pink flowers)",
     "Sex linkage (X chromosome)",
     "Dihybrid cross (9:3:3:1)",
     "Autosomal vs sex-linked traits"
    ],
    "examQA": [
     {
      "q": "Explain the expected ratio from a monohybrid cross (Bb × Bb).",
      "a": "Each parent produces gametes B and b in equal frequency. Punnett square: BB (25%), Bb (50%), bb (25%). Phenotypic ratio 3 dominant : 1 recessive. Genotypic ratio 1 BB : 2 Bb : 1 bb."
     },
     {
      "q": "Explain why haemophilia is more common in males than females.",
      "a": "Haemophilia gene is recessive and X-linked. Males (XY) have only one X chromosome; if they carry the allele (X^h Y) they express the disease. Females (XX) need two copies of the recessive allele to express it; one normal allele (X^H X^h) makes them carriers without the disease."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Heredity"
   },
   {
    "id": "3-5-genetic-modification",
    "name": "3.5 Genetic modification and biotechnology",
    "syllabusRef": "D1.3",
    "section": "D1. Continuity and change — Molecules",
    "description": "Recombinant DNA technology: restriction enzymes cut DNA at specific sequences (creating sticky ends); DNA ligase joins fragments; plasmids act as vectors to introduce foreign DNA into host cells. Applications: insulin production (E. coli), Bt crops, gene therapy. PCR amplifies DNA segments. Gel electrophoresis separates DNA fragments by size.",
    "svgKey": "ib-bio-3-genetics",
    "landmarks": [
     "Restriction enzymes (sticky ends)",
     "DNA ligase (joins fragments)",
     "Plasmid vectors",
     "Transformation of bacteria",
     "PCR (polymerase chain reaction)",
     "Gel electrophoresis",
     "Transgenic organisms",
     "Ethical issues"
    ],
    "examQA": [
     {
      "q": "Describe the steps in producing human insulin using recombinant DNA technology.",
      "a": "1. Restriction enzyme cuts out insulin gene from human DNA (sticky ends). 2. Same enzyme cuts open a bacterial plasmid. 3. DNA ligase joins insulin gene into plasmid (recombinant plasmid). 4. Plasmid inserted into E. coli. 5. E. coli multiplies; insulin gene expressed → insulin produced, extracted and purified."
     },
     {
      "q": "Explain the principles of PCR.",
      "a": "1. 95°C: denature (separate strands). 2. 55°C: anneal primers (complementary to target sequence). 3. 72°C: extend (Taq polymerase copies target). Repeat ~35 cycles → 2ⁿ copies. Each cycle doubles the target sequence."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Recombinant_DNA"
   },
   {
    "id": "4-1-species-communities-ecosystems",
    "name": "4.1 Species communities and ecosystems",
    "syllabusRef": "C4.1",
    "section": "C4. Interaction and interdependence — Ecosystems",
    "description": "Ecology: the study of relationships between organisms, and between organisms and their environment (biotic and abiotic). Ecosystem: all organisms in an area plus their abiotic environment. Community: all species in a habitat. Population: all members of one species. Niche: role of organism in ecosystem. Biotic and abiotic factors affect population size.",
    "svgKey": "ib-bio-4-ecology",
    "landmarks": [
     "Ecosystem / community / population / niche",
     "Biotic vs abiotic factors",
     "Carrying capacity (K)",
     "Predator-prey relationships",
     "Competition (intraspecific / interspecific)",
     "Symbiosis: mutualism, commensalism, parasitism",
     "Species diversity indices"
    ],
    "examQA": [
     {
      "q": "Define niche and explain why two species cannot occupy the same niche.",
      "a": "A niche is the role and position of an organism in its ecosystem, including its use of resources, interactions with other species, and its effect on the environment. Two species with identical niches compete for the same resources; one out-competes the other until only one remains (competitive exclusion principle)."
     },
     {
      "q": "Distinguish between biotic and abiotic factors that affect population size.",
      "a": "Biotic: living factors — food availability, predation, disease, competition. Abiotic: non-living — temperature, light intensity, pH, salinity, water availability. Both types act as limiting factors that prevent indefinite population growth."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Ecology"
   },
   {
    "id": "4-2-energy-flow",
    "name": "4.2 Energy flow",
    "syllabusRef": "C4.2",
    "section": "C4. Interaction and interdependence — Ecosystems",
    "description": "Energy flows in one direction through ecosystems. Producers (autotrophs) fix light energy by photosynthesis. Consumers obtain energy by eating other organisms. Only ~10% of energy is transferred between trophic levels; the rest is lost as heat via respiration. Energy pyramids are always broader at the base.",
    "svgKey": "ib-bio-4-ecology",
    "landmarks": [
     "Autotrophs (producers) / heterotrophs",
     "Trophic levels",
     "~10% energy transfer efficiency",
     "Energy pyramid",
     "Gross primary production (GPP)",
     "Net primary production (NPP = GPP - R)",
     "Food chain / food web",
     "Decomposers"
    ],
    "examQA": [
     {
      "q": "Explain why energy transfer between trophic levels is only about 10%.",
      "a": "Losses between levels: (1) respiration releases energy as heat; (2) undigested material passes in faeces; (3) excretion; (4) not all biomass is consumed. Only energy stored in biomass that is eaten and digested by the next level is transferred. This limits food chain length to ~4-5 levels."
     },
     {
      "q": "Distinguish between gross and net primary production.",
      "a": "GPP: total rate of photosynthesis (total energy fixed). NPP = GPP − R (energy used by producers for respiration). NPP represents the organic matter available to consumers."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Energy_flow_(ecology)"
   },
   {
    "id": "4-3-carbon-cycling",
    "name": "4.3 Carbon cycling",
    "syllabusRef": "C4.2",
    "section": "C4. Interaction and interdependence — Ecosystems",
    "description": "Carbon cycles between the atmosphere and organisms. Photosynthesis removes CO₂ from the atmosphere; respiration and combustion return it. Decomposers break down organic matter, releasing CO₂. Carbon sinks: forests, oceans, soil. Carbon sources: combustion, respiration, deforestation.",
    "svgKey": "ib-bio-4-ecology",
    "landmarks": [
     "CO₂ fixation (photosynthesis)",
     "CO₂ release (respiration, combustion)",
     "Decomposition",
     "Methane (CH₄) from methanogenic archaeans in anaerobic conditions",
     "Carbon sinks vs sources",
     "Fossil fuels (ancient carbon stores)",
     "Global carbon cycle"
    ],
    "examQA": [
     {
      "q": "Describe the role of decomposers in the carbon cycle.",
      "a": "Decomposers (bacteria and fungi) break down dead organic matter (detritus) via saprotrophic nutrition. They release CO₂ through respiration and return carbon to the soil and atmosphere. Without decomposers, carbon would remain locked in organic matter."
     },
     {
      "q": "Explain how burning fossil fuels affects the carbon cycle.",
      "a": "Fossil fuels contain carbon fixed millions of years ago. Combustion rapidly returns this carbon to the atmosphere as CO₂. This is a one-way transfer that increases atmospheric CO₂ beyond natural cycling, enhancing the greenhouse effect."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Carbon_cycle"
   },
   {
    "id": "4-4-climate-change",
    "name": "4.4 Climate change",
    "syllabusRef": "D4.3",
    "section": "D4. Continuity and change — Ecosystems",
    "description": "Greenhouse gases (CO₂, CH₄, N₂O, H₂O vapour) absorb outgoing infrared radiation, warming the atmosphere. Rising atmospheric CO₂ from fossil fuel combustion enhances the greenhouse effect. Consequences: rising sea levels, melting ice, ocean acidification, shifts in species distributions, more frequent extreme weather events.",
    "svgKey": "ib-bio-4-ecology",
    "landmarks": [
     "Greenhouse gases (CO₂, CH₄, N₂O)",
     "Enhanced greenhouse effect",
     "Global average temperature rise",
     "Ocean acidification (CO₂ + H₂O → H₂CO₃)",
     "Coral bleaching",
     "Sea level rise",
     "Phenological shifts",
     "Evidence: ice cores, temperature records"
    ],
    "examQA": [
     {
      "q": "Explain the enhanced greenhouse effect.",
      "a": "Greenhouse gases (CO₂, CH₄, N₂O) in the atmosphere absorb outgoing infrared radiation from Earth's surface and re-radiate some back. Rising concentrations from fossil fuel combustion, deforestation and agriculture increase this absorption, trapping more heat and raising global average temperature beyond natural levels."
     },
     {
      "q": "Explain how rising CO₂ levels cause ocean acidification.",
      "a": "CO₂ dissolves in seawater: CO₂ + H₂O ⇌ H₂CO₃ (carbonic acid) ⇌ H⁺ + HCO₃⁻. Increased H⁺ reduces pH. Lower pH reduces CO₃²⁻ availability, making it harder for marine organisms (corals, molluscs) to build calcium carbonate shells/skeletons."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Climate_change"
   },
   {
    "id": "5-1-evidence-evolution",
    "name": "5.1 Evidence for evolution",
    "syllabusRef": "A4.1",
    "section": "A4. Unity and diversity — Ecosystems",
    "description": "Evidence for evolution comes from: (1) Fossil record — transitional forms and stratigraphic sequence. (2) Comparative anatomy — homologous structures share common ancestry; analogous structures result from convergent evolution. (3) Selective breeding shows organisms can change within species. (4) Molecular biology — DNA/protein sequence similarities reflect evolutionary relationships.",
    "svgKey": "ib-bio-5-evolution",
    "landmarks": [
     "Fossil record (transitional forms)",
     "Stratigraphic sequence (relative dating)",
     "Homologous structures (common ancestry)",
     "Analogous structures (convergent evolution)",
     "Selective breeding (artificial selection)",
     "Comparative embryology",
     "Molecular evidence (DNA/protein sequences)"
    ],
    "examQA": [
     {
      "q": "Outline the evidence from comparative anatomy for evolution.",
      "a": "Homologous structures: same basic skeletal structure modified for different functions (e.g. human arm, whale flipper, bat wing, horse leg — all mammalian forelimbs). They share a common ancestral structure, indicating common ancestry. Vestigial structures (reduced, non-functional homologues) also indicate descent with modification."
     },
     {
      "q": "Explain how molecular biology provides evidence for evolution.",
      "a": "DNA sequences and protein amino acid sequences can be compared between species. More closely related species have more similar sequences. The universal genetic code and highly conserved genes (e.g. rRNA, cytochrome c) indicate all life descended from a common ancestor."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Evidence_of_common_descent"
   },
   {
    "id": "5-2-natural-selection",
    "name": "5.2 Natural selection",
    "syllabusRef": "D4.1",
    "section": "D4. Continuity and change — Ecosystems",
    "description": "Natural selection: (1) Heritable variation exists in populations. (2) More offspring are produced than can survive. (3) Individuals with better-adapted phenotypes survive and reproduce more. (4) Advantageous alleles increase in frequency in subsequent generations. This leads to gradual adaptation. Types: directional, stabilising, disruptive.",
    "svgKey": "ib-bio-5-evolution",
    "landmarks": [
     "Heritable variation (mutation source)",
     "Overproduction of offspring",
     "Differential survival (selection pressure)",
     "Inheritance of favourable alleles",
     "Adaptation",
     "Directional / stabilising / disruptive selection",
     "Antibiotic resistance (worked example)"
    ],
    "examQA": [
     {
      "q": "Explain how antibiotic resistance evolves in bacteria.",
      "a": "Mutations randomly arise in bacteria; a rare mutation may confer resistance to an antibiotic. When the antibiotic is present, susceptible bacteria die; resistant bacteria survive and reproduce (natural selection). Resistance alleles increase in frequency. Over generations, the population becomes resistant. Horizontal gene transfer can spread resistance between species."
     },
     {
      "q": "Outline the four steps of natural selection.",
      "a": "1. Variation: heritable differences exist in the population. 2. Overproduction: more offspring produced than environment can support. 3. Selection: individuals with advantageous traits more likely to survive and reproduce. 4. Inheritance: favourable alleles passed to offspring, increase in frequency over generations."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Natural_selection"
   },
   {
    "id": "5-3-classification",
    "name": "5.3 Classification of biodiversity",
    "syllabusRef": "A3.2",
    "section": "A3. Unity and diversity — Organisms",
    "description": "Classification organises organisms into a hierarchy: Domain > Kingdom > Phylum > Class > Order > Family > Genus > Species. Binomial nomenclature: genus + species (italicised). Three domains: Archaea, Bacteria, Eukaryota. Modern classification aims to reflect evolutionary (phylogenetic) relationships rather than superficial similarities.",
    "svgKey": "ib-bio-5-evolution",
    "landmarks": [
     "Binomial nomenclature (genus species)",
     "Taxonomic hierarchy (DKPCOFGS)",
     "Three domains: Archaea, Bacteria, Eukaryota",
     "Five kingdoms (historical)",
     "Phylogenetic classification",
     "Morphological vs molecular data",
     "Species concept (interbreeding + fertile offspring)"
    ],
    "examQA": [
     {
      "q": "Distinguish between analogous and homologous structures in the context of classification.",
      "a": "Homologous structures share a common ancestral origin and indicate evolutionary relationship (used in phylogenetic classification). Analogous structures evolved independently to perform similar functions (convergent evolution) — they look similar but do not indicate common ancestry (misleading for classification)."
     },
     {
      "q": "State the biological species concept and its limitations.",
      "a": "A species is a group of organisms that can interbreed and produce fertile offspring. Limitations: cannot apply to asexual reproducers (bacteria), fossils, or ring species; some interfertile organisms are classified as different species for ecological reasons."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Taxonomy_(biology)"
   },
   {
    "id": "5-4-cladistics",
    "name": "5.4 Cladistics",
    "syllabusRef": "A3.2",
    "section": "A3. Unity and diversity — Organisms",
    "description": "Cladistics classifies organisms based on shared derived characteristics (synapomorphies). A clade includes an ancestor and ALL its descendants. Cladograms are branching diagrams showing evolutionary relationships. More recent molecular data (DNA sequences) can revise traditional morphological classifications.",
    "svgKey": "ib-bio-5-evolution",
    "landmarks": [
     "Cladistics (shared derived characters)",
     "Synapomorphy",
     "Clade (monophyletic group)",
     "Cladogram construction",
     "Molecular vs morphological characters",
     "Reclassification using molecular data",
     "Outgroup comparison"
    ],
    "examQA": [
     {
      "q": "Define clade and synapomorphy.",
      "a": "Clade: a group consisting of an ancestral species and ALL its descendants (monophyletic group). Synapomorphy: a shared derived characteristic inherited from a common ancestor that defines a clade (e.g. hair in mammals)."
     },
     {
      "q": "Explain why molecular data may reclassify organisms previously placed in the same group.",
      "a": "Traditional classification used morphology, which can be misleading (analogous structures from convergent evolution). DNA/protein sequences directly reflect evolutionary history. Molecular analysis has revealed that some morphologically similar organisms are not closely related, leading to reclassification."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Cladistics"
   },
   {
    "id": "6-1-digestion-absorption",
    "name": "6.1 Digestion and absorption",
    "syllabusRef": "C1.1",
    "section": "C1. Interaction and interdependence — Molecules",
    "description": "Digestion breaks down large food molecules to monomers. Mouth: salivary amylase (starch → maltose). Stomach: pepsin in acid environment (proteins → peptides), HCl kills bacteria. Small intestine: pancreatic enzymes (amylase, lipase, protease); bile emulsifies fats; villi/microvilli maximise absorption. Large intestine: water reabsorption.",
    "svgKey": "ib-bio-6-human-physiology",
    "landmarks": [
     "Salivary amylase (starch → maltose)",
     "Stomach: HCl + pepsin (proteins)",
     "Pancreatic enzymes (amylase, protease, lipase)",
     "Bile (emulsification of fats)",
     "Villi + microvilli (absorption)",
     "Active transport of amino acids/glucose",
     "Fat absorption: lacteals",
     "Large intestine: water reabsorption"
    ],
    "examQA": [
     {
      "q": "Explain the role of the small intestine in digestion and absorption.",
      "a": "Digestion: pancreatic enzymes (amylase, lipase, proteases) complete breakdown of carbohydrates, fats and proteins. Brush border enzymes (maltase, lactase, peptidases) complete digestion. Absorption: villi (1 mm tall) and microvilli increase surface area enormously. Glucose and amino acids absorbed by active transport. Fatty acids and glycerol reform triglycerides, enter lacteals as chylomicrons."
     },
     {
      "q": "State the role of HCl in the stomach.",
      "a": "HCl: (1) activates pepsinogen to active pepsin; (2) provides optimal pH (~2) for pepsin activity; (3) kills most bacteria in food; (4) denatures proteins, opening them for enzymatic digestion."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Digestion"
   },
   {
    "id": "6-2-blood-system",
    "name": "6.2 The blood system",
    "syllabusRef": "B3.2",
    "section": "B3. Form and function — Organisms",
    "description": "The heart is a double pump. Left side: oxygenated blood to body (systemic). Right side: deoxygenated blood to lungs (pulmonary). Cardiac cycle: systole (ventricle contracts) and diastole (relaxes). Sinoatrial node (SAN) is the pacemaker. Arteries carry blood away from heart (high pressure); veins carry blood back (low pressure, valves); capillaries allow exchange.",
    "svgKey": "ib-bio-6-human-physiology",
    "landmarks": [
     "Double circulation (pulmonary + systemic)",
     "Cardiac cycle: systole / diastole",
     "Sinoatrial node (pacemaker)",
     "Atrioventricular node (AVN)",
     "Arteries, veins, capillaries (structure + function)",
     "Haemoglobin (O₂ + CO₂ transport)",
     "Coronary artery disease"
    ],
    "examQA": [
     {
      "q": "Describe the cardiac cycle.",
      "a": "Diastole: heart relaxes; blood fills atria. Atrial systole: atria contract; blood flows into ventricles. Ventricular systole: ventricles contract; blood ejected to aorta (left) and pulmonary artery (right); atrioventricular valves close (preventing backflow). Diastole again. SAN generates electrical impulse → spreads to AV node → bundle of His → Purkinje fibres."
     },
     {
      "q": "Compare the structure of arteries and veins.",
      "a": "Arteries: thick wall with elastic/muscular tissue, withstands high pressure, no valves, narrow lumen. Veins: thinner wall, large lumen, lower pressure, contain valves to prevent backflow. Capillaries: one cell thick (endothelium only), maximise diffusion for exchange."
     }
    ],
    "sketchfab3dId": "a2a731e2d3cf49939612c6ba48daeeb1",
    "wikiUrl": "https://en.wikipedia.org/wiki/Blood"
   },
   {
    "id": "6-3-defence-disease",
    "name": "6.3 Defence against infectious disease",
    "syllabusRef": "C3.2",
    "section": "C3. Interaction and interdependence — Organisms",
    "description": "Non-specific defences: skin (physical barrier), mucus and cilia (trapping pathogens), phagocytosis (neutrophils and macrophages engulf foreign cells), inflammatory response. Specific immunity: B-cells (humoral, antibody production), T-cells (cell-mediated). Memory cells enable rapid secondary immune response — basis of vaccination.",
    "svgKey": "ib-bio-6-human-physiology",
    "landmarks": [
     "Skin and mucus (physical/chemical barriers)",
     "Phagocytosis (neutrophils, macrophages)",
     "Lymphocytes: B-cells and T-cells",
     "Antibody structure (Y-shaped, antigen-binding sites)",
     "Clonal selection and expansion",
     "Memory cells (fast secondary response)",
     "Vaccination (active artificial immunity)",
     "Antigens and antibodies"
    ],
    "examQA": [
     {
      "q": "Describe the process of phagocytosis.",
      "a": "Phagocytes (neutrophils/macrophages) detect pathogens via chemotaxis. Pseudopodia extend and engulf the pathogen, forming a phagosome. Lysosomes fuse with the phagosome; enzymes (e.g. lysozyme) digest the pathogen. Debris is exocytosed. The macrophage displays pathogen antigens on its surface (antigen presentation), activating T-helper cells."
     },
     {
      "q": "Explain how vaccination protects a population.",
      "a": "Vaccine introduces antigen (killed/attenuated pathogen or its antigens). Immune response: B-cells → plasma cells → antibodies; memory B- and T-cells persist. If exposed to pathogen later, memory cells respond rapidly and produce high antibody titre before symptoms develop. Herd immunity: enough vaccinated individuals prevent pathogen spreading to unvaccinated members."
     }
    ],
    "sketchfab3dId": "45fceb1599254642b05888369208a523",
    "wikiUrl": "https://en.wikipedia.org/wiki/Immune_system"
   },
   {
    "id": "6-4-gas-exchange",
    "name": "6.4 Gas exchange",
    "syllabusRef": "B3.1",
    "section": "B3. Form and function — Organisms",
    "description": "Gas exchange in the alveoli: O₂ diffuses from alveolar air into blood; CO₂ diffuses from blood into alveoli. Adaptations: large surface area (~70 m²), thin walls (one cell), moist surface, rich capillary supply. Ventilation maintains concentration gradients. Haemoglobin binds O₂ (oxyhaemoglobin); CO₂ transported as bicarbonate ions.",
    "svgKey": "ib-bio-6-human-physiology",
    "landmarks": [
     "Alveolar structure (large SA, thin walls)",
     "Diffusion gradients (O₂ and CO₂)",
     "Ventilation (maintains gradients)",
     "Oxyhaemoglobin",
     "CO₂ transport as bicarbonate (HCO₃⁻)",
     "Bohr effect",
     "Tobacco smoke and lung disease"
    ],
    "examQA": [
     {
      "q": "Explain how the alveoli are adapted for gas exchange.",
      "a": "Large number of alveoli → large total SA (~70 m²). One-cell-thick walls and capillary wall → short diffusion path. Moist inner surface → O₂ dissolves. Dense capillary network → haemoglobin maintains steep gradient. Ventilation continuously refreshes air; circulation removes O₂ and delivers CO₂."
     },
     {
      "q": "Describe the Bohr effect.",
      "a": "Rising CO₂/falling pH decreases haemoglobin's affinity for O₂ (shifts O₂-dissociation curve right). In actively respiring tissues (high CO₂, low pH), more O₂ is released where demand is greatest. Helps deliver O₂ to tissues during exercise."
     }
    ],
    "threejs3dFn": "createDiffusionAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Gas_exchange"
   },
   {
    "id": "6-5-neurons-synapses",
    "name": "6.5 Neurons and synapses",
    "syllabusRef": "C2.2",
    "section": "C2. Interaction and interdependence — Cells",
    "description": "Neurons transmit electrical signals. Resting potential: −70 mV (Na⁺/K⁺ pump). Action potential: Na⁺ channels open (depolarisation to +40 mV); K⁺ channels open (repolarisation). All-or-nothing response. Saltatory conduction along myelinated axons. Synapse: Ca²⁺ triggers vesicle fusion; neurotransmitters diffuse to postsynaptic receptors.",
    "svgKey": "ib-bio-6-human-physiology",
    "landmarks": [
     "Resting potential (−70 mV)",
     "Na⁺/K⁺ pump (3 Na out, 2 K in)",
     "Depolarisation (Na⁺ in, +40 mV)",
     "Repolarisation (K⁺ out)",
     "All-or-nothing principle",
     "Myelination + saltatory conduction",
     "Synapse: neurotransmitter release",
     "Cholinergic synapses (acetylcholine)"
    ],
    "examQA": [
     {
      "q": "Describe the events of an action potential.",
      "a": "Stimulus → threshold reached → Na⁺ channels open → Na⁺ floods in → depolarisation (+40 mV). Na⁺ channels close; K⁺ channels open → K⁺ exits → repolarisation. Brief hyperpolarisation below −70 mV. Na⁺/K⁺ pump restores resting potential. Refractory period ensures one-way propagation."
     },
     {
      "q": "Outline transmission across a cholinergic synapse.",
      "a": "Action potential reaches presynaptic terminal → Ca²⁺ ions enter → vesicles containing acetylcholine fuse with membrane → ACh released into synaptic cleft → diffuses → binds to receptors on postsynaptic membrane → Na⁺ channels open → postsynaptic depolarisation. ACh broken down by acetylcholinesterase."
     }
    ],
    "threejs3dFn": "createNerveImpulse",
    "sketchfab3dId": "01d20ef702ee41478a8bc1da8082e504",
    "wikiUrl": "https://en.wikipedia.org/wiki/Neuron"
   },
   {
    "id": "6-6-hormones-homeostasis",
    "name": "6.6 Hormones homeostasis and reproduction",
    "syllabusRef": "D3.3",
    "section": "D3. Continuity and change — Organisms",
    "description": "Homeostasis maintains constant internal conditions. Negative feedback: deviation from set point triggers response to correct it. Blood glucose: β-cells secrete insulin (high glucose → glycogenesis); α-cells secrete glucagon (low glucose → glycogenolysis). Temperature: hypothalamus detects changes → sweating/vasodilation (heat) or shivering/vasoconstriction (cold).",
    "svgKey": "ib-bio-6-human-physiology",
    "landmarks": [
     "Homeostasis (negative feedback)",
     "Insulin (β-cells) → glycogenesis",
     "Glucagon (α-cells) → glycogenolysis",
     "Thermoregulation (hypothalamus)",
     "Sweating + vasodilation (cooling)",
     "Shivering + vasoconstriction (warming)",
     "FSH, LH, oestrogen, progesterone",
     "Menstrual cycle"
    ],
    "examQA": [
     {
      "q": "Explain the role of insulin in blood glucose regulation.",
      "a": "After a carbohydrate meal, blood glucose rises. Pancreatic β-cells detect this and secrete insulin. Insulin causes: (1) liver and muscle cells to take up glucose; (2) liver to convert glucose to glycogen (glycogenesis); (3) cells to increase glucose oxidation. Blood glucose falls back to normal set point (negative feedback). Type 1: β-cells destroyed, so little or no insulin. Type 2: target cells become resistant to insulin."
     },
     {
      "q": "Describe the role of the hypothalamus in thermoregulation.",
      "a": "Hypothalamus contains thermoreceptors that monitor blood temperature. If T rises: vasodilation of skin arterioles (heat loss by radiation), sweating (latent heat). If T falls: vasoconstriction, shivering (heat from muscle), piloerection (insulation). Both are negative feedback responses returning temperature to set point."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Homeostasis"
   },
   {
    "id": "7-1-dna-structure-replication",
    "name": "7.1 DNA structure and replication",
    "syllabusRef": "D1.1",
    "section": "D1. Continuity and change — Molecules",
    "description": "DNA double helix: Watson-Crick model confirmed by X-ray crystallography (Franklin/Wilkins). Nucleosome: DNA wrapped around histone octamer. Chromatin condensation into chromosomes during cell division. Replication: leading strand synthesised continuously; lagging strand synthesised in Okazaki fragments. RNA primer removed; DNA ligase seals gaps.",
    "svgKey": "ib-bio-7-nucleic-acids",
    "landmarks": [
     "Nucleosome (DNA + histone octamer)",
     "30 nm fibre / chromatin",
     "X-ray crystallography evidence",
     "Leading strand (continuous)",
     "Lagging strand (Okazaki fragments)",
     "RNA primer (primase)",
     "DNA polymerase I (removes primer)",
     "DNA ligase (seals gaps)"
    ],
    "examQA": [
     {
      "q": "Explain the structure of the nucleosome.",
      "a": "DNA (146 bp) wraps around an octamer of histone proteins (2 each of H2A, H2B, H3, H4). Linker DNA connects nucleosomes; H1 histone stabilises the linker. Nucleosomes compact DNA: 2 m of DNA fits into a 6 µm nucleus."
     },
     {
      "q": "Explain why the lagging strand is synthesised in Okazaki fragments.",
      "a": "DNA polymerase can only synthesise 5′→3′. The lagging strand template runs 3′→5′ away from the replication fork, so it cannot be synthesised continuously toward the fork. Instead, short RNA primers are laid down at intervals; DNA polymerase extends each primer 5′→3′ in the direction away from the fork; gaps are sealed by ligase."
     }
    ],
    "threejs3dFn": "createPolymerChain",
    "sketchfab3dId": "224d09f75a674f4a8107e79e3d3d5552",
    "wikiUrl": "https://en.wikipedia.org/wiki/DNA_replication"
   },
   {
    "id": "7-2-transcription-gene-expression",
    "name": "7.2 Transcription and gene expression",
    "syllabusRef": "D1.2",
    "section": "D1. Continuity and change — Molecules",
    "description": "Transcription in eukaryotes: RNA polymerase II transcribes protein-coding genes. Pre-mRNA undergoes post-transcriptional processing: 5′ cap added, poly-A tail added (stability/export), introns spliced out by spliceosomes (introns removed; exons retained). Alternative splicing produces different proteins from one gene.",
    "svgKey": "ib-bio-7-nucleic-acids",
    "landmarks": [
     "RNA polymerase II",
     "Promoter (TATA box)",
     "Transcription factors",
     "Pre-mRNA → mRNA (processing)",
     "5′ cap + poly-A tail",
     "Introns (removed) vs exons (retained)",
     "Spliceosome",
     "Alternative splicing → multiple proteins"
    ],
    "examQA": [
     {
      "q": "Explain the processing of pre-mRNA before it leaves the nucleus.",
      "a": "1. 5′ cap (modified guanine): protects from degradation, aids ribosome binding. 2. Poly-A tail: protects 3′ end, aids nuclear export and mRNA stability. 3. Splicing: spliceosomes remove introns (non-coding sequences); exons are joined to form the final mRNA."
     },
     {
      "q": "Explain how alternative splicing increases proteome diversity.",
      "a": "Different combinations of exons can be joined from the same pre-mRNA. This produces different mRNAs from a single gene, each translated into a different protein. Humans (~20,000 genes) produce >100,000 different proteins partly through alternative splicing."
     }
    ],
    "threejs3dFn": "createPolymerChain",
    "sketchfab3dId": "224d09f75a674f4a8107e79e3d3d5552",
    "wikiUrl": "https://en.wikipedia.org/wiki/Transcription_(biology)"
   },
   {
    "id": "7-3-translation",
    "name": "7.3 Translation",
    "syllabusRef": "D1.2",
    "section": "D1. Continuity and change — Molecules",
    "description": "Translation: mRNA is read in codons (triplets) by ribosomes. Three sites: A (aminoacyl-tRNA arrives), P (peptidyl-tRNA forms peptide bond), E (exit). Aminoacyl-tRNA synthetases charge tRNA with correct amino acid. Elongation: polypeptide chain forms as tRNA anticodon pairs with mRNA codon. Post-translational modifications: folding, glycosylation, cleavage.",
    "svgKey": "ib-bio-7-nucleic-acids",
    "landmarks": [
     "Ribosome structure (small + large subunits)",
     "A, P, E sites",
     "tRNA charging (aminoacyl-tRNA synthetase)",
     "Anticodon-codon pairing",
     "Initiation (AUG start codon)",
     "Elongation (peptide bond formation)",
     "Termination (stop codon: UAA, UAG, UGA)",
     "Post-translational modification"
    ],
    "examQA": [
     {
      "q": "Describe the process of translation elongation.",
      "a": "1. Aminoacyl-tRNA enters A site; anticodon pairs with mRNA codon. 2. Peptide bond formed between amino acid in A site and growing polypeptide in P site (peptidyl transferase = rRNA). 3. Ribosome translocates one codon along mRNA: tRNA moves P→E→released; A site tRNA moves to P site; new A site available. Cycle repeats."
     },
     {
      "q": "Explain the role of aminoacyl-tRNA synthetases.",
      "a": "These enzymes attach the correct amino acid to the 3′ end of the matching tRNA (using ATP). There is one synthetase per amino acid. This ensures the correct amino acid is delivered to the ribosome when its anticodon pairs with the mRNA codon — basis of the genetic code's accuracy."
     }
    ],
    "threejs3dFn": "createPolymerChain",
    "wikiUrl": "https://en.wikipedia.org/wiki/Translation_(biology)"
   },
   {
    "id": "8-1-metabolism-hl",
    "name": "8.1 Metabolism",
    "syllabusRef": "C1.1",
    "section": "C1. Interaction and interdependence — Molecules",
    "description": "Metabolic pathways are regulated by enzymes. Allosteric enzymes have binding sites separate from the active site; binding of effectors changes enzyme activity. Feedback inhibition: the end product of a pathway inhibits an earlier enzyme, preventing overproduction. Reversible vs irreversible reactions determine pathway direction.",
    "svgKey": "ib-bio-8-metabolism",
    "landmarks": [
     "Metabolic pathways",
     "Allosteric regulation",
     "Allosteric activators and inhibitors",
     "Feedback inhibition (end-product)",
     "Covalent modification of enzymes",
     "Cofactors and coenzymes",
     "NAD+/NADH as electron carriers",
     "FAD/FADH₂"
    ],
    "examQA": [
     {
      "q": "Explain feedback inhibition of metabolic pathways.",
      "a": "The end product of a pathway binds to an allosteric site on an enzyme earlier in the pathway, inhibiting its activity. This slows the pathway and prevents overproduction of the end product. When end-product levels fall, inhibition is relieved and the pathway resumes. Example: ATP inhibits phosphofructokinase in glycolysis."
     },
     {
      "q": "Distinguish between cofactors and coenzymes.",
      "a": "Cofactor: any non-protein molecule required for enzyme activity; may be inorganic ions or organic molecules. Coenzyme: an organic cofactor that transfers chemical groups between enzymes (e.g. NAD⁺/NADH transfers hydrogen; coenzyme A transfers acetyl groups). Most vitamins are coenzyme precursors."
     }
    ],
    "threejs3dFn": "createReactionAnimation('energetic')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Metabolism"
   },
   {
    "id": "8-2-cell-respiration-hl",
    "name": "8.2 Cell respiration",
    "syllabusRef": "C1.2",
    "section": "C1. Interaction and interdependence — Molecules",
    "description": "Glycolysis (cytoplasm): glucose → 2 pyruvate, 2 ATP (net), 2 NADH. Link reaction (matrix): pyruvate → acetyl-CoA + CO₂ + NADH. Krebs cycle (matrix): acetyl-CoA + oxaloacetate → citrate → 2CO₂, 3NADH, 1FADH₂, 1 ATP per turn. Oxidative phosphorylation (inner membrane): ETC pumps H⁺; ATP synthase produces ~32 ATP via chemiosmosis.",
    "svgKey": "ib-bio-8-metabolism",
    "landmarks": [
     "Glycolysis: 2 ATP net, 2 NADH",
     "Pyruvate decarboxylation (link reaction)",
     "Acetyl-CoA (2C)",
     "Krebs cycle (per turn: 3 NADH, 1 FADH₂, 1 ATP, 2 CO₂)",
     "Electron transport chain (complexes I-IV)",
     "Chemiosmosis + ATP synthase",
     "Total yield ~36-38 ATP",
     "Anaerobic: lactate or ethanol + CO₂"
    ],
    "examQA": [
     {
      "q": "Describe the Krebs cycle.",
      "a": "Acetyl-CoA (2C) combines with oxaloacetate (4C) → citrate (6C). Citrate oxidised in steps: 2 CO₂ released; 3 NADH + 1 FADH₂ produced; 1 ATP made by substrate-level phosphorylation; oxaloacetate regenerated. Per glucose (2 turns): 6 NADH, 2 FADH₂, 2 ATP, 4 CO₂."
     },
     {
      "q": "Explain oxidative phosphorylation.",
      "a": "NADH and FADH₂ donate electrons to ETC (Complex I or II). Electrons pass to O₂ (final acceptor → H₂O). Energy released pumps H⁺ from matrix to intermembrane space (Complexes I, III, IV). H⁺ gradient (proton motive force) drives H⁺ back through ATP synthase. Rotation of ATP synthase catalyses ADP + Pᵢ → ATP (chemiosmosis)."
     }
    ],
    "threejs3dFn": "createRespirationAnimation",
    "sketchfab3dId": "7445a425050e49daa881070ca6917a91",
    "wikiUrl": "https://en.wikipedia.org/wiki/Cellular_respiration"
   },
   {
    "id": "8-3-photosynthesis-hl",
    "name": "8.3 Photosynthesis",
    "syllabusRef": "C1.3",
    "section": "C1. Interaction and interdependence — Molecules",
    "description": "Light reactions (thylakoid): PS II absorbs 680 nm light → photolysis of water (O₂ released) → electrons pass through ETC → PS I (700 nm) → NADP⁺ reduced to NADPH. ATP produced by photophosphorylation (chemiosmosis). Calvin cycle (stroma): CO₂ fixed by RuBisCO → glycerate-3-phosphate (GP) → triose phosphate (TP) → glucose; RuBP regenerated.",
    "svgKey": "ib-bio-8-metabolism",
    "landmarks": [
     "Photosystem II (680 nm, water splitting)",
     "Plastoquinone, cytochrome b6f, plastocyanin",
     "Photosystem I (700 nm, NADP⁺ reduction)",
     "Photophosphorylation (ATP synthesis)",
     "Calvin cycle (carbon fixation)",
     "RuBisCO (CO₂ + RuBP → 2 GP)",
     "Glycerate-3-phosphate (GP)",
     "Triose phosphate (TP) → glucose + RuBP"
    ],
    "examQA": [
     {
      "q": "Describe the light reactions of photosynthesis.",
      "a": "PS II absorbs light (680 nm): water photolysed → O₂ + H⁺ + electrons. Electrons pass through ETC (plastoquinone → cytochrome b6f → plastocyanin) → PS I. This pumps H⁺ into thylakoid lumen → ATP synthase → ATP. PS I absorbs 700 nm light → reduces NADP⁺ to NADPH."
     },
     {
      "q": "Explain the Calvin cycle.",
      "a": "CO₂ + RuBP (5C, 3 molecules) → RuBisCO → 6 molecules of glycerate-3-phosphate (GP, 3C). GP reduced by NADPH and phosphorylated by ATP → triose phosphate (TP). Some TP used for glucose synthesis; most regenerates RuBP (using ATP). Per 3 CO₂ fixed: 9 ATP and 6 NADPH consumed; 1 TP net gain."
     }
    ],
    "threejs3dFn": "createPhotosynthesisAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Photosynthesis"
   },
   {
    "id": "9-1-transport-xylem",
    "name": "9.1 Transport in the xylem",
    "syllabusRef": "B3.2",
    "section": "B3. Form and function — Organisms",
    "description": "Water moves from soil to roots (osmosis), up the xylem (cohesion-tension), and evaporates from leaves (transpiration). Cohesion-tension theory: evaporation creates negative pressure (tension); cohesion (H-bonds between water molecules) pulls water up as a continuous column. Adhesion to xylem walls provides support.",
    "svgKey": "ib-bio-9-plant-biology",
    "landmarks": [
     "Cohesion-tension theory",
     "Transpiration pull (negative pressure)",
     "Cohesion of water molecules (H-bonds)",
     "Adhesion to xylem walls",
     "Stomatal opening/closing (guard cells)",
     "Factors affecting transpiration (T, humidity, wind, light)",
     "Casparian strip (endodermis)",
     "Apoplast vs symplast pathways"
    ],
    "examQA": [
     {
      "q": "Explain the cohesion-tension theory of water transport in xylem.",
      "a": "Transpiration from leaves evaporates water, creating low water potential at the leaf. This creates tension (negative pressure) in the xylem. Water molecules cohere (H-bonds) and are pulled up as a continuous column. The tension is transmitted through the continuous water column from leaf to root. Water enters root from soil by osmosis along the water potential gradient."
     },
     {
      "q": "Describe the role of the Casparian strip.",
      "a": "The Casparian strip is a band of suberin (waterproof) in the walls of endodermal cells. It blocks the apoplast pathway (cell walls) at the endodermis, forcing water and minerals to pass through the plasma membrane (symplast). This gives the plant selective control over what enters the xylem."
     }
    ],
    "threejs3dFn": "createTranspirationAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Plant_physiology"
   },
   {
    "id": "9-2-transport-phloem",
    "name": "9.2 Transport in the phloem",
    "syllabusRef": "B3.2",
    "section": "B3. Form and function — Organisms",
    "description": "Phloem transports organic solutes (mainly sucrose) from source (leaves) to sink (roots, fruits). Mass flow / pressure-flow hypothesis: sucrose actively loaded into phloem at source (low water potential → water enters → high pressure); sucrose unloaded at sink (high water potential → water leaves → low pressure); pressure gradient drives mass flow.",
    "svgKey": "ib-bio-9-plant-biology",
    "landmarks": [
     "Phloem: sieve tubes + companion cells",
     "Active loading of sucrose (source)",
     "Symplastic loading via plasmodesmata",
     "High pressure at source, low at sink",
     "Mass flow (pressure-flow hypothesis)",
     "Sucrose unloading at sink",
     "Bidirectional transport in phloem",
     "Aphid stylets as experimental evidence"
    ],
    "examQA": [
     {
      "q": "Describe the pressure-flow hypothesis for phloem transport.",
      "a": "Source (e.g. leaf): sucrose actively loaded into phloem sieve tubes → low water potential → water enters from xylem by osmosis → turgor pressure increases. Sink (e.g. root): sucrose unloaded → high water potential → water leaves → turgor pressure decreases. High-to-low pressure gradient drives mass flow of sucrose solution from source to sink."
     },
     {
      "q": "Explain how companion cells support sieve tube elements.",
      "a": "Sieve tube elements lack a nucleus and most organelles. Companion cells are connected via plasmodesmata and carry out metabolic functions (transcription, translation, protein synthesis) for the adjacent sieve tube. They also actively load sucrose into the sieve tube using proton pumps and sucrose-H⁺ cotransporters."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Phloem"
   },
   {
    "id": "9-3-growth-plants",
    "name": "9.3 Growth in plants",
    "syllabusRef": "C3.1",
    "section": "C3. Interaction and interdependence — Organisms",
    "description": "Plant growth occurs at meristems (apical and lateral). Auxin (IAA) is made at the shoot apex and transported down, promoting cell elongation in the zone of elongation below the tip. Phototropism: auxin migrates to shaded side → cells elongate → bends toward light. Gravitropism: auxin redistributes → root tip grows down. Ethylene promotes fruit ripening and leaf abscission. Gibberellins promote stem elongation and seed germination.",
    "svgKey": "ib-bio-9-plant-biology",
    "landmarks": [
     "Apical meristems (shoot + root tips)",
     "Lateral meristems (cambium)",
     "Auxin (IAA): cell elongation",
     "Phototropism (unilateral light → auxin redistribution)",
     "Gravitropism (gravity → auxin redistribution)",
     "Ethylene (fruit ripening, abscission)",
     "Gibberellins (stem elongation, germination)",
     "Cytokinins (cell division)"
    ],
    "examQA": [
     {
      "q": "Explain the mechanism of phototropism in plants.",
      "a": "Light detected by photoreceptors in shoot tip. Auxin (IAA) redistributes to the shaded side. Auxin promotes elongation of cells on shaded side (binds receptors → H⁺ pump → cell wall loosening → water uptake → elongation). Greater elongation on shaded side causes the shoot to bend toward the light source."
     },
     {
      "q": "Describe the role of ethylene in fruit ripening.",
      "a": "Ethylene is a gaseous plant hormone. It triggers: increased cell wall enzyme activity (cell wall softening), conversion of starch to sugars, breakdown of chlorophyll, development of colour pigments (anthocyanins/carotenoids), increased respiration rate (climacteric). Commercial application: ripening rooms."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Plant_growth"
   },
   {
    "id": "9-4-reproduction-plants",
    "name": "9.4 Reproduction in plants",
    "syllabusRef": "D3.1",
    "section": "D3. Continuity and change — Organisms",
    "description": "Sexual reproduction in angiosperms: pollination, fertilisation, seed and fruit development. Pollen tube grows to ovule; double fertilisation — one sperm fertilises egg (zygote), other fuses with polar nuclei (endosperm). Seed contains embryo + endosperm + seed coat. Germination triggered by water, oxygen, warmth. Vegetative reproduction: stolons, rhizomes, tubers.",
    "svgKey": "ib-bio-9-plant-biology",
    "landmarks": [
     "Angiosperm lifecycle",
     "Pollination (biotic/abiotic)",
     "Pollen tube growth",
     "Double fertilisation (zygote + endosperm)",
     "Seed structure (embryo, endosperm, testa)",
     "Fruit development",
     "Germination conditions",
     "Vegetative propagation"
    ],
    "examQA": [
     {
      "q": "Describe double fertilisation in angiosperms.",
      "a": "Pollen tube grows to ovule. Two sperm nuclei released: (1) one fertilises the egg cell → diploid zygote → embryo. (2) second fuses with two polar nuclei in the central cell → triploid endosperm nucleus → endosperm (food store for embryo). This is double fertilisation."
     },
     {
      "q": "State the conditions required for germination.",
      "a": "Water (activates enzymes, expands embryo, transports nutrients), oxygen (aerobic respiration for growth), appropriate temperature (enzyme activity). Some seeds also require light (phytochrome), scarification (breaking seed coat) or cold stratification."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Plant_reproduction"
   },
   {
    "id": "10-1-meiosis-hl",
    "name": "10.1 Meiosis",
    "syllabusRef": "D2.1",
    "section": "D2. Continuity and change — Cells",
    "description": "Meiosis I: homologous chromosomes pair as bivalents (synapsis); crossing over occurs at chiasmata in prophase I; independent assortment in metaphase I. Meiosis II: sister chromatids separate. Sources of genetic variation: crossing over (recombination), independent assortment of bivalents, and random fertilisation.",
    "svgKey": "ib-bio-10-genetics-evolution",
    "landmarks": [
     "Synapsis (homologues pair)",
     "Bivalent (tetrad)",
     "Chiasmata (crossing over site)",
     "Crossing over generates recombinant chromatids",
     "Independent assortment (metaphase I)",
     "2ⁿ gamete combinations from independent assortment",
     "Non-disjunction in meiosis I vs II",
     "Resulting gamete types"
    ],
    "examQA": [
     {
      "q": "Explain how crossing over in prophase I produces genetic variation.",
      "a": "Homologous chromatids wrap around each other; non-sister chromatids exchange corresponding segments at chiasmata (crossover points). This produces recombinant chromatids with new combinations of alleles not present in either parent chromosome. Each chiasma shuffles alleles, massively increasing gamete diversity."
     },
     {
      "q": "Describe the significance of independent assortment in metaphase I.",
      "a": "Bivalents align at the equator with random orientation: the maternal or paternal homologue may go to either pole. For n pairs, there are 2ⁿ possible combinations. In humans (n=23) this gives 2²³ ≈ 8 million different chromosome combinations in gametes, before even considering crossing over."
     }
    ],
    "threejs3dFn": "createCellDivision",
    "wikiUrl": "https://en.wikipedia.org/wiki/Meiosis"
   },
   {
    "id": "10-2-inheritance-hl",
    "name": "10.2 Inheritance",
    "syllabusRef": "D3.2",
    "section": "D3. Continuity and change — Organisms",
    "description": "Chi-squared test evaluates whether observed ratios differ significantly from expected. Linked genes on the same chromosome do not assort independently; recombination frequencies estimate map distances (1% recombination ≈ 1 cM). Epistasis: one gene masks another (e.g. labrador coat colour). Polygenic inheritance: multiple genes affect one trait (e.g. skin colour).",
    "svgKey": "ib-bio-10-genetics-evolution",
    "landmarks": [
     "Chi-squared (χ²) test",
     "Null hypothesis",
     "Degrees of freedom",
     "Genetic linkage (same chromosome)",
     "Recombination frequency → map distance",
     "Epistasis (one gene masks another)",
     "Polygenic inheritance (continuous variation)",
     "Normal distribution of polygenic traits"
    ],
    "examQA": [
     {
      "q": "Explain how to use a chi-squared test in genetics.",
      "a": "1. State null hypothesis (observed ratios do not differ from expected). 2. Calculate χ² = Σ(O−E)²/E. 3. Degrees of freedom = number of classes − 1. 4. Compare χ² to critical value (p=0.05). 5. If χ² > critical value, reject null hypothesis (significant difference from expected ratio; likely not due to chance)."
     },
     {
      "q": "Explain what is meant by epistasis.",
      "a": "Epistasis occurs when the expression of one gene masks or modifies the expression of a different gene. Example: Labrador coat colour. Gene B (black/chocolate pigment) and gene E (whether pigment is deposited). If homozygous ee, no pigment deposited regardless of B gene → yellow. When E present, B gene expressed (BB or Bb = black; bb = chocolate)."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Genetics"
   },
   {
    "id": "10-3-gene-pools-speciation",
    "name": "10.3 Gene pools and speciation",
    "syllabusRef": "D4.1",
    "section": "D4. Continuity and change — Ecosystems",
    "description": "A gene pool is all the alleles of all genes in a population. Hardy-Weinberg: in equilibrium (large population, no mutation, random mating, no selection, no gene flow), allele frequencies stay constant (p²+2pq+q²=1). Speciation: allopatric (geographic isolation) or sympatric. Polyploidy is common in plants. Gradual vs punctuated equilibrium models of evolutionary rate.",
    "svgKey": "ib-bio-10-genetics-evolution",
    "landmarks": [
     "Gene pool (all alleles in population)",
     "Hardy-Weinberg equilibrium (5 conditions)",
     "p² + 2pq + q² = 1",
     "Drift (small populations)",
     "Gene flow between populations",
     "Allopatric speciation (geographic barrier)",
     "Sympatric speciation (no geographic barrier)",
     "Polyploidy in plants"
    ],
    "examQA": [
     {
      "q": "State the five conditions required for Hardy-Weinberg equilibrium.",
      "a": "1. Large population (no genetic drift). 2. Random mating. 3. No mutations. 4. No natural selection. 5. No gene flow (no migration). If any condition is violated, allele frequencies change and evolution occurs."
     },
     {
      "q": "Calculate carrier frequency using Hardy-Weinberg if 1 in 2500 have CF (autosomal recessive).",
      "a": "q² = 1/2500 = 0.0004. q = 0.02. p = 1 - 0.02 = 0.98. Carrier frequency 2pq = 2 × 0.98 × 0.02 = 0.0392 ≈ 1 in 25.5 (approximately 1 in 25)."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Hardy%E2%80%93Weinberg_principle"
   },
   {
    "id": "11-1-antibody-vaccination",
    "name": "11.1 Antibody production and vaccination",
    "syllabusRef": "C3.2",
    "section": "C3. Interaction and interdependence — Organisms",
    "description": "B-cells differentiate into plasma cells (antibody production) upon antigen stimulation. Clonal selection: antigen binds to B-cell with complementary receptor → clonal expansion → plasma cells + memory cells. Monoclonal antibodies (hybridoma technique): B-cell fused with myeloma cell → hybridoma → single antibody type. Applications: diagnostic tests, cancer treatment (Herceptin).",
    "svgKey": "ib-bio-11-animal-physiology",
    "landmarks": [
     "Clonal selection theory",
     "B-cell activation (antigen + T-helper)",
     "Plasma cells (antibody secretion)",
     "Memory B-cells (long-lived)",
     "Antibody structure: 4 polypeptides, variable + constant regions",
     "Monoclonal antibodies (hybridoma)",
     "ELISA (diagnostic test)",
     "Herceptin (cancer treatment)"
    ],
    "examQA": [
     {
      "q": "Describe the process of clonal selection.",
      "a": "An antigen enters the body → binds to B-cell with specific complementary surface receptor. This B-cell is selected and activated (with T-helper cell co-stimulation). It undergoes repeated mitosis (clonal expansion) → large clone of identical B-cells. Some differentiate into plasma cells (secreting antibodies against that antigen); some become memory B-cells (long-lived, enable fast secondary response)."
     },
     {
      "q": "Outline the production of monoclonal antibodies.",
      "a": "1. Mouse immunised with target antigen → B-cells produced. 2. B-cells fused with myeloma (tumour) cells → hybridoma cells. 3. Hybridomas screened for antibody production against target antigen. 4. Selected hybridoma cloned → indefinite antibody production. Product: single specific antibody type (monoclonal)."
     }
    ],
    "sketchfab3dId": "a2a731e2d3cf49939612c6ba48daeeb1",
    "wikiUrl": "https://en.wikipedia.org/wiki/Antibody"
   },
   {
    "id": "11-2-movement",
    "name": "11.2 Movement",
    "syllabusRef": "B3.3",
    "section": "B3. Form and function — Organisms",
    "description": "Skeletal muscle structure: sarcomere (between Z-lines), actin (thin) and myosin (thick) filaments. Sliding filament theory: myosin heads attach to actin, pivoting (power stroke) → filaments slide, sarcomere shortens. ATP-dependent. Ca²⁺ from sarcoplasmic reticulum exposes binding sites on actin (troponin-tropomyosin system).",
    "svgKey": "ib-bio-11-animal-physiology",
    "landmarks": [
     "Sarcomere (Z line to Z line)",
     "Actin (thin filament)",
     "Myosin (thick filament, heads)",
     "Sliding filament theory",
     "Myosin head: actin binding + ATP hydrolysis",
     "Ca²⁺ role (troponin-tropomyosin)",
     "Motor neuron → neuromuscular junction",
     "Fast vs slow twitch fibres"
    ],
    "examQA": [
     {
      "q": "Explain the sliding filament theory of muscle contraction.",
      "a": "1. Action potential → Ca²⁺ released from SR → binds troponin → tropomyosin moves → actin binding sites exposed. 2. Myosin heads (with ADP+Pᵢ bound) attach to actin → power stroke (head pivots, actin slides). 3. ATP binds → myosin head detaches. 4. ATP hydrolysis → head cocks back. Repeat → sarcomere shortens."
     },
     {
      "q": "Describe the role of calcium ions in muscle contraction.",
      "a": "Ca²⁺ released from SR after action potential. Binds to troponin (part of troponin-tropomyosin complex on actin). Conformational change moves tropomyosin away from myosin-binding sites on actin. Myosin heads can now attach. When Ca²⁺ pumped back (relaxation), tropomyosin blocks binding sites again."
     }
    ],
    "threejs3dFn": "createMotionAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Muscle_contraction"
   },
   {
    "id": "11-3-kidney-osmoregulation",
    "name": "11.3 The kidney and osmoregulation",
    "syllabusRef": "D3.3",
    "section": "D3. Continuity and change — Organisms",
    "description": "Nephron: glomerulus (ultrafiltration of small molecules), proximal convoluted tubule (reabsorbs ~65% of water and Na⁺, and essentially all filtered glucose and amino acids by active cotransport), loop of Henle (creates medullary osmotic gradient), distal convoluted tubule, collecting duct (regulated by ADH for water reabsorption). ADH: high plasma osmolality → posterior pituitary releases ADH → aquaporins inserted → concentrated urine.",
    "svgKey": "ib-bio-11-animal-physiology",
    "landmarks": [
     "Glomerular filtration (pressure-driven)",
     "Filtrate composition",
     "Proximal tubule (65% reabsorption)",
     "Loop of Henle (countercurrent multiplier)",
     "Ascending limb (NaCl pumped out, impermeable to water)",
     "Descending limb (permeable to water)",
     "Collecting duct (ADH-regulated)",
     "Aquaporins (water channels)"
    ],
    "examQA": [
     {
      "q": "Explain the role of ADH in regulating urine concentration.",
      "a": "Low water potential in blood → hypothalamus osmoreceptors detect → posterior pituitary releases more ADH into blood. ADH binds to receptors on collecting duct cells → aquaporins inserted into membrane → duct becomes more permeable to water → more water reabsorbed by osmosis into hypertonic medulla → smaller volume of concentrated urine produced. Blood water potential normalises (negative feedback)."
     },
     {
      "q": "Explain how the loop of Henle creates a medullary osmotic gradient.",
      "a": "Ascending limb: NaCl actively pumped into medulla (tubule wall impermeable to water) → builds osmotic gradient. Descending limb: permeable to water → water leaves by osmosis into hypertonic medulla → fluid in loop becomes more concentrated. Countercurrent arrangement amplifies gradient. Gradient drives water reabsorption from collecting duct."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Kidney"
   },
   {
    "id": "11-4-sexual-reproduction",
    "name": "11.4 Sexual reproduction",
    "syllabusRef": "D3.1",
    "section": "D3. Continuity and change — Organisms",
    "description": "Spermatogenesis: mitosis of spermatogonia → primary spermatocytes → meiosis → 4 spermatids → spermatozoa (acrosome, nucleus, mitochondria, flagellum). Oogenesis: meiosis I arrested in prophase I until puberty; one secondary oocyte + first polar body; meiosis II completed at fertilisation. Placenta: gas/nutrient exchange; produces HCG (maintains corpus luteum); hormone production in pregnancy.",
    "svgKey": "ib-bio-11-animal-physiology",
    "landmarks": [
     "Spermatogenesis (4 sperm from 1 cell)",
     "Oogenesis (1 egg + polar bodies)",
     "Sperm structure (acrosome, flagellum)",
     "Acrosome reaction",
     "Cortical reaction (blocks polyspermy)",
     "Human chorionic gonadotropin (HCG)",
     "Placenta (exchange + hormones)",
     "Chorion, amnion, umbilical cord"
    ],
    "examQA": [
     {
      "q": "Compare spermatogenesis and oogenesis.",
      "a": "Spermatogenesis: continuous from puberty; 4 equal spermatozoa per primary spermatocyte; both meiotic divisions complete; small, mobile cells with acrosome + flagellum. Oogenesis: begins in fetal life, arrested; one secondary oocyte + polar bodies per primary oocyte; unequal cytokinesis preserves cytoplasm; large, non-motile, yolk-rich."
     },
     {
      "q": "Describe the role of the placenta.",
      "a": "Exchange: O₂ and nutrients (glucose, amino acids, antibodies) pass from maternal to fetal blood; CO₂ and urea pass from fetal to maternal. Endocrine: produces HCG (first trimester, maintains corpus luteum → progesterone), then oestrogen and progesterone. Barrier: some pathogens and drugs also cross — not a complete barrier."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Human_reproduction"
   }
  ]
 },
 "ib_sl_biology": {
  "subjectName": "IB Biology SL",
  "examCode": "IB-BIO-SL",
  "sections": [
   "All",
   "Topic 1: Cell biology",
   "Topic 2: Molecular biology",
   "Topic 3: Genetics",
   "Topic 4: Ecology",
   "Topic 5: Evolution and biodiversity",
   "Topic 6: Human physiology"
  ],
  "topics": [
   {
    "id": "1-1-intro-cells",
    "name": "1.1 Introduction to cells",
    "syllabusRef": "A2.2",
    "section": "A2. Unity and diversity — Cells",
    "description": "Cell theory: all organisms are composed of cells; the cell is the basic structural and functional unit of life; all cells arise from pre-existing cells (Virchow). Prokaryotic cells lack a nucleus and membrane-bound organelles. Eukaryotic cells have a true nucleus, mitochondria, ER and Golgi.",
    "svgKey": "ib-bio-1-cell-biology",
    "landmarks": [
     "Cell theory (3 tenets)",
     "Prokaryote vs eukaryote",
     "Plasma membrane",
     "Nucleus + nucleolus",
     "Mitochondria",
     "Rough/smooth ER",
     "Golgi apparatus",
     "SA:Vol ratio"
    ],
    "examQA": [
     {
      "q": "State the three tenets of cell theory.",
      "a": "1. All living organisms are composed of one or more cells. 2. The cell is the basic structural and functional unit. 3. All cells arise from pre-existing cells."
     },
     {
      "q": "Why must cells remain small?",
      "a": "As volume increases faster than surface area, the SA:Vol ratio decreases. The plasma membrane cannot supply nutrients/remove wastes for the whole cytoplasm, so cells divide rather than enlarge."
     }
    ],
    "sketchfab3dId": "7fe3ac29756a45c6b678804a8da8a760",
    "wikiUrl": "https://en.wikipedia.org/wiki/Cell_(biology)"
   },
   {
    "id": "1-2-ultrastructure",
    "name": "1.2 Ultrastructure of cells",
    "syllabusRef": "A2.2",
    "section": "A2. Unity and diversity — Cells",
    "description": "Electron microscopy reveals cell ultrastructure. Prokaryotes: nucleoid (no membrane), 70S ribosomes, cell wall (peptidoglycan), pili, flagella, plasmids. Eukaryotes: nucleus with nuclear envelope (pores), 80S ribosomes, mitochondria (cristae), rough/smooth ER, Golgi apparatus, lysosomes, chloroplasts (in plant/algal cells).",
    "svgKey": "ib-bio-1-cell-biology",
    "landmarks": [
     "Nucleoid vs nucleus",
     "70S (prokaryote) vs 80S ribosomes",
     "Mitochondria (cristae, matrix)",
     "Rough ER + ribosomes",
     "Smooth ER (lipid synthesis)",
     "Golgi cisternae",
     "Lysosomes",
     "Chloroplasts (thylakoids, stroma)"
    ],
    "examQA": [
     {
      "q": "Compare prokaryotic and eukaryotic cell structure.",
      "a": "Prokaryotic: nucleoid (no envelope), 70S ribosomes, no membrane-bound organelles, ~1-10 µm, peptidoglycan wall. Eukaryotic: nucleus with double membrane + pores, 80S ribosomes, membrane-bound organelles, ~10-100 µm."
     },
     {
      "q": "State the functions of the Golgi apparatus.",
      "a": "Modifies and packages proteins/lipids received from the ER; sorts them into vesicles for secretion, lysosomes, or other destinations. Site of glycoprotein production."
     }
    ],
    "sketchfab3dId": "7fe3ac29756a45c6b678804a8da8a760",
    "wikiUrl": "https://en.wikipedia.org/wiki/Cell_ultrastructure"
   },
   {
    "id": "1-3-membrane-structure",
    "name": "1.3 Membrane structure",
    "syllabusRef": "B2.1",
    "section": "B2. Form and function — Cells",
    "description": "The fluid mosaic model describes membranes as phospholipid bilayers with embedded proteins. Phospholipids have hydrophilic heads and hydrophobic tails. Cholesterol stabilises membrane fluidity. Integral proteins span the bilayer; peripheral proteins are associated with the surface. Glycoproteins and glycolipids form the glycocalyx.",
    "svgKey": "ib-bio-1-cell-biology",
    "landmarks": [
     "Fluid mosaic model (Singer-Nicolson)",
     "Phospholipid bilayer",
     "Hydrophilic heads / hydrophobic tails",
     "Integral vs peripheral proteins",
     "Channel and carrier proteins",
     "Cholesterol (fluidity buffer)",
     "Glycocalyx (glycoproteins + glycolipids)"
    ],
    "examQA": [
     {
      "q": "Explain the fluid mosaic model of membrane structure.",
      "a": "Phospholipids form a bilayer with hydrophilic heads facing outward and hydrophobic tails inward. Proteins float within (integral) or on the surface of (peripheral) this bilayer. The membrane is fluid: phospholipids and proteins can move laterally. Cholesterol stabilises fluidity at varying temperatures."
     },
     {
      "q": "State the roles of membrane proteins.",
      "a": "Channel proteins: allow passive movement of polar molecules/ions. Carrier proteins: active/facilitated transport. Receptor proteins: cell signalling. Enzymes: catalysis. Glycoproteins: cell recognition and communication."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Cell_membrane"
   },
   {
    "id": "1-4-membrane-transport",
    "name": "1.4 Membrane transport",
    "syllabusRef": "B2.1",
    "section": "B2. Form and function — Cells",
    "description": "Simple diffusion: random movement of molecules from high to low concentration (no energy). Osmosis: movement of water across a semipermeable membrane from high to low water potential. Facilitated diffusion: via channel or carrier proteins (no energy). Active transport: against concentration gradient using ATP and carrier proteins. Endocytosis/exocytosis involve membrane vesicles.",
    "svgKey": "ib-bio-1-cell-biology",
    "landmarks": [
     "Simple diffusion (lipid-soluble molecules)",
     "Osmosis (water potential gradient)",
     "Facilitated diffusion (proteins, no ATP)",
     "Active transport (ATP + carrier)",
     "Endocytosis / exocytosis",
     "Turgor pressure in plant cells"
    ],
    "examQA": [
     {
      "q": "Distinguish between facilitated diffusion and active transport.",
      "a": "Facilitated diffusion: moves molecules down concentration gradient through channel/carrier proteins; no ATP required. Active transport: moves molecules against concentration gradient via carrier proteins; requires ATP hydrolysis."
     },
     {
      "q": "Explain why osmosis is a special case of diffusion.",
      "a": "Osmosis is the net movement of water molecules across a partially permeable membrane from a region of higher water potential to lower water potential. It follows diffusion principles but refers specifically to water molecules; the membrane is impermeable to solute."
     }
    ],
    "threejs3dFn": "createDiffusionAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Membrane_transport"
   },
   {
    "id": "1-5-origin-cells",
    "name": "1.5 The origin of cells — HL only, not examined at SL",
    "syllabusRef": "A2.1",
    "section": "A2. Unity and diversity — Cells",
    "description": "The first cells arose from non-living matter (abiogenesis). Experimental evidence: Miller-Urey experiment produced amino acids from inorganic gases. RNA world hypothesis: RNA can both store information and catalyse reactions (ribozymes). Cells arose when membranes enclosed self-replicating RNA. All present cells arise from pre-existing cells.",
    "svgKey": "ib-bio-1-cell-biology",
    "landmarks": [
     "Abiogenesis hypothesis",
     "Miller-Urey experiment (amino acids from inorganic gases)",
     "RNA world hypothesis",
     "Ribozymes (catalytic RNA)",
     "Protocells (lipid vesicles)",
     "Endosymbiotic theory (mitochondria/chloroplasts)"
    ],
    "examQA": [
     {
      "q": "Describe evidence supporting the RNA world hypothesis.",
      "a": "RNA can store genetic information (like DNA) and catalyse reactions (ribozymes, e.g. in the spliceosome and ribosome). This dual role suggests RNA was the original self-replicating molecule before DNA evolved as a more stable information store."
     },
     {
      "q": "Outline the Miller-Urey experiment and its significance.",
      "a": "Simulated early Earth atmosphere (CH₄, NH₃, H₂, H₂O) with electrical sparks. After one week, amino acids and organic molecules were produced from inorganic components. Showed organic molecules needed for life can arise spontaneously from simple inorganic precursors."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Abiogenesis"
   },
   {
    "id": "1-6-cell-division",
    "name": "1.6 Cell division",
    "syllabusRef": "D2.1",
    "section": "D2. Continuity and change — Cells",
    "description": "Mitosis produces two genetically identical daughter cells. Stages: PMAT — Prophase (chromosomes condense), Metaphase (align on equator), Anaphase (chromatids separate), Telophase (nuclear envelopes reform). Cytokinesis divides the cytoplasm. The cell cycle includes G1, S (DNA synthesis), G2 and M phases. Cancer results from uncontrolled cell division.",
    "svgKey": "ib-bio-1-cell-biology",
    "landmarks": [
     "Cell cycle (G1, S, G2, M)",
     "Prophase: chromosomes condense",
     "Metaphase: chromosomes align",
     "Anaphase: chromatids separate",
     "Telophase: nuclear envelopes reform",
     "Cytokinesis",
     "Tumour suppressor genes / oncogenes"
    ],
    "examQA": [
     {
      "q": "Outline the stages of mitosis.",
      "a": "Prophase: chromosomes condense, spindle forms, nuclear envelope breaks down. Metaphase: chromosomes align at equator. Anaphase: spindle fibres pull sister chromatids to opposite poles. Telophase: nuclear envelopes reform, chromosomes decondense. Result: two identical nuclei."
     },
     {
      "q": "Distinguish mitosis from meiosis.",
      "a": "Mitosis: 1 division, 2 identical diploid daughter cells, no crossing over, for growth/repair. Meiosis: 2 divisions, 4 haploid daughter cells, crossing over occurs, for sexual reproduction/genetic variation."
     }
    ],
    "threejs3dFn": "createCellDivision",
    "wikiUrl": "https://en.wikipedia.org/wiki/Mitosis"
   },
   {
    "id": "2-1-molecules-metabolism",
    "name": "2.1 Molecules to metabolism",
    "syllabusRef": "B1.1",
    "section": "B1. Form and function — Molecules",
    "description": "Living organisms are composed of carbon-based molecules. Carbon forms 4 covalent bonds, enabling diverse macromolecules. Carbohydrates, lipids, proteins and nucleic acids are assembled from monomers via condensation reactions and broken down by hydrolysis. Metabolism is the total of all chemical reactions in a cell.",
    "svgKey": "ib-bio-2-molecular-biology",
    "landmarks": [
     "Carbon (4 bonds, versatility)",
     "Condensation (–H₂O)",
     "Hydrolysis (+H₂O)",
     "Monomers and polymers",
     "Carbohydrates: glucose → starch/glycogen/cellulose",
     "Proteins: amino acids → polypeptides",
     "Lipids: glycerol + fatty acids",
     "Nucleic acids: nucleotides → DNA/RNA"
    ],
    "examQA": [
     {
      "q": "Distinguish between condensation and hydrolysis.",
      "a": "Condensation: two monomers join with removal of water; forms a new covalent bond (e.g. glycosidic, peptide, ester). Hydrolysis: a polymer is split into monomers by adding water; breaks the covalent bond. These are reverse reactions."
     },
     {
      "q": "State why carbon is the basis of organic chemistry.",
      "a": "Carbon forms 4 stable covalent bonds, enabling chains, branches and rings of carbon atoms. It bonds to H, O, N, S and other carbons. This versatility allows the enormous structural diversity of biological macromolecules."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Metabolism"
   },
   {
    "id": "2-2-water",
    "name": "2.2 Water",
    "syllabusRef": "A1.1",
    "section": "A1. Unity and diversity — Molecules",
    "description": "Water molecules are polar: oxygen is partially negative, hydrogens partially positive. This enables hydrogen bonding between water molecules. Properties: high specific heat capacity, high latent heat of vaporisation, cohesion/adhesion, maximum density at 4°C, solvent properties. These properties make water essential for life.",
    "svgKey": "ib-bio-2-molecular-biology",
    "landmarks": [
     "Polarity (δ+H, δ−O)",
     "Hydrogen bonding",
     "High specific heat capacity",
     "High latent heat of vaporisation",
     "Cohesion / adhesion / surface tension",
     "Maximum density at 4°C (ice floats)",
     "Universal solvent (ionic/polar solutes)"
    ],
    "examQA": [
     {
      "q": "Explain how the hydrogen bonding of water contributes to its role as a coolant.",
      "a": "Water has high latent heat of vaporisation (~2260 J g⁻¹). When water evaporates (sweating, transpiration), many hydrogen bonds must break. This requires large amounts of energy, removing heat from the organism/surface and acting as an effective cooling mechanism."
     },
     {
      "q": "State two properties of water related to hydrogen bonding and explain their significance.",
      "a": "1. High specific heat: resists temperature change → stable aquatic habitats. 2. Cohesion: water molecules stick together → cohesion-tension in xylem transport in plants."
     }
    ],
    "threejs3dFn": "createMolecule('water')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Properties_of_water"
   },
   {
    "id": "2-3-carbs-lipids",
    "name": "2.3 Carbohydrates and lipids",
    "syllabusRef": "B1.1",
    "section": "B1. Form and function — Molecules",
    "description": "Carbohydrates: glucose (α and β), fructose, galactose are monosaccharides. Disaccharides (maltose, sucrose, lactose) form by condensation. Polysaccharides: starch (energy storage in plants), glycogen (energy storage in animals), cellulose (structural, β-1-4 bonds). Lipids: triglycerides (energy storage), phospholipids (membranes), steroids (hormones, cholesterol).",
    "svgKey": "ib-bio-2-molecular-biology",
    "landmarks": [
     "α-glucose vs β-glucose",
     "Glycosidic bonds",
     "Starch (amylose + amylopectin)",
     "Glycogen (more branched than starch)",
     "Cellulose (β-1-4, structural)",
     "Triglycerides (glycerol + 3 FA, ester bonds)",
     "Saturated vs unsaturated fatty acids",
     "Phospholipids (bilayer)"
    ],
    "examQA": [
     {
      "q": "Compare the structures and functions of starch and cellulose.",
      "a": "Both are glucose polysaccharides. Starch: α-glucose, 1-4 (amylose) and 1-6 (amylopectin) glycosidic bonds, coiled/branched, compact → energy storage. Cellulose: β-glucose, 1-4 bonds, straight chains form microfibrils via H-bonds → structural role in cell walls."
     },
     {
      "q": "Explain why lipids are good energy storage molecules.",
      "a": "Lipids store about twice as much energy per gram as carbohydrates (hydrocarbons are highly reduced). They are hydrophobic so do not absorb water, meaning stored fat adds less mass than an equivalent carbohydrate store."
     }
    ],
    "threejs3dFn": "createPolymerChain",
    "wikiUrl": "https://en.wikipedia.org/wiki/Carbohydrate"
   },
   {
    "id": "2-4-proteins",
    "name": "2.4 Proteins",
    "syllabusRef": "B1.2",
    "section": "B1. Form and function — Molecules",
    "description": "Proteins are polymers of amino acids linked by peptide bonds. 20 amino acids, each with an R group. Primary structure: amino acid sequence. Secondary structure: α-helix, β-pleated sheet (H-bonds). Tertiary structure: 3D folding (ionic, disulfide, hydrophobic, H-bonds). Quaternary: multiple polypeptide chains. Denaturation: loss of tertiary structure by heat or pH change.",
    "svgKey": "ib-bio-2-molecular-biology",
    "landmarks": [
     "Amino acid structure (NH₂, COOH, R group)",
     "Peptide bond (condensation)",
     "Primary structure (sequence)",
     "Secondary structure (H-bonds)",
     "Tertiary structure (R group interactions)",
     "Quaternary structure (multiple chains)",
     "Denaturation (H+ or high T)",
     "Fibrous vs globular proteins"
    ],
    "examQA": [
     {
      "q": "Explain the levels of protein structure.",
      "a": "Primary: amino acid sequence (peptide bonds). Secondary: α-helix or β-pleated sheet held by H-bonds between backbone NH and C=O. Tertiary: 3D folding of whole polypeptide by R-group interactions (ionic, disulfide bridges, H-bonds, hydrophobic). Quaternary: association of two or more polypeptide chains."
     },
     {
      "q": "Explain denaturation of an enzyme at high temperature.",
      "a": "High temperature disrupts weak bonds (H-bonds, ionic bonds) maintaining the tertiary structure of the enzyme. The active site changes shape so the substrate can no longer fit. The enzyme loses catalytic activity. Disulfide bridges are covalent and are NOT broken by heat; only the weak interactions are lost, and the change is usually irreversible."
     }
    ],
    "threejs3dFn": "createPolymerChain",
    "wikiUrl": "https://en.wikipedia.org/wiki/Protein"
   },
   {
    "id": "2-5-enzymes",
    "name": "2.5 Enzymes",
    "syllabusRef": "C1.1",
    "section": "C1. Interaction and interdependence — Molecules",
    "description": "Enzymes are biological catalysts (proteins, or RNA — ribozymes) that lower activation energy. Induced-fit model: substrate binds and causes conformational change in active site. Factors affecting rate: temperature, pH, substrate concentration, inhibitors. Competitive inhibitors block the active site; non-competitive inhibitors bind allosteric sites.",
    "svgKey": "ib-bio-2-molecular-biology",
    "landmarks": [
     "Activation energy",
     "Induced-fit model",
     "Enzyme-substrate complex",
     "Effect of temperature (Q10)",
     "Effect of pH",
     "Effect of [substrate]",
     "Competitive inhibition (active site)",
     "Non-competitive inhibition (allosteric site)"
    ],
    "examQA": [
     {
      "q": "Distinguish between competitive and non-competitive inhibition.",
      "a": "Competitive: inhibitor has similar shape to substrate, binds active site, blocks substrate; overcome by increasing [S]. Non-competitive: inhibitor binds allosteric (different) site, causes conformational change in active site; increasing [S] cannot overcome inhibition."
     },
     {
      "q": "Explain the effect of temperature on enzyme activity.",
      "a": "Up to the optimum temperature, rate increases as kinetic energy increases (more collisions between enzyme and substrate, and faster product formation). Above optimum, thermal energy disrupts H-bonds and other weak forces maintaining tertiary structure; active site changes shape; enzyme is denatured and activity falls to zero."
     }
    ],
    "threejs3dFn": "createReactionAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Enzyme"
   },
   {
    "id": "2-6-dna-rna-structure",
    "name": "2.6 Structure of DNA and RNA",
    "syllabusRef": "A1.2",
    "section": "A1. Unity and diversity — Molecules",
    "description": "DNA double helix: two antiparallel polynucleotide strands. Nucleotides: phosphate + deoxyribose + base (A, T, G, C). Base pairing: A-T (2 H-bonds), G-C (3 H-bonds). RNA: single-stranded, ribose sugar, uracil replaces thymine. Types of RNA: mRNA, tRNA, rRNA.",
    "svgKey": "ib-bio-2-molecular-biology",
    "landmarks": [
     "Nucleotide structure (phosphate, sugar, base)",
     "DNA bases: A, T, G, C",
     "RNA bases: A, U, G, C",
     "A-T (2H-bonds), G-C (3H-bonds)",
     "Antiparallel strands (5′→3′)",
     "DNA: deoxyribose; RNA: ribose",
     "Types of RNA: mRNA, tRNA, rRNA"
    ],
    "examQA": [
     {
      "q": "Describe the structure of a DNA nucleotide.",
      "a": "A DNA nucleotide consists of three components joined by covalent bonds: a phosphate group, a deoxyribose sugar (5-carbon), and a nitrogenous base (adenine, thymine, guanine or cytosine). The phosphate attaches to the 5′ carbon; the base attaches to the 1′ carbon."
     },
     {
      "q": "Compare DNA and RNA.",
      "a": "DNA: double-stranded, deoxyribose sugar, bases A/T/G/C, stable, carries genetic code. RNA: single-stranded, ribose sugar, bases A/U/G/C, less stable, various roles in protein synthesis."
     }
    ],
    "threejs3dFn": "createPolymerChain",
    "sketchfab3dId": "224d09f75a674f4a8107e79e3d3d5552",
    "wikiUrl": "https://en.wikipedia.org/wiki/DNA"
   },
   {
    "id": "2-7-dna-replication-transcription-translation",
    "name": "2.7 DNA replication transcription and translation",
    "syllabusRef": "D1.1",
    "section": "D1. Continuity and change — Molecules",
    "description": "DNA replication is semi-conservative: each strand serves as a template. Helicase unwinds; DNA polymerase synthesises 5′→3′. Transcription: RNA polymerase synthesises mRNA complementary to the template strand. Translation: ribosome reads mRNA codons; tRNA anticodons bring amino acids; polypeptide forms. The genetic code is degenerate and universal.",
    "svgKey": "ib-bio-2-molecular-biology",
    "landmarks": [
     "Semi-conservative replication (Meselson-Stahl)",
     "Helicase (unwinds)",
     "DNA polymerase (synthesises 5\u2032\u21923\u2032)",
     "Transcription: mRNA from DNA template",
     "RNA polymerase",
     "Codons (triplet code)",
     "tRNA anticodon + amino acid",
     "Ribosome: peptide bond formation"
    ],
    "examQA": [
     {
      "q": "Explain semi-conservative DNA replication.",
      "a": "Double helix unwinds (helicase). Each original strand acts as template. Complementary nucleotides added 5\u2032\u21923\u2032 by DNA polymerase. Each daughter molecule contains one original (parental) strand and one new strand. Proved by Meselson-Stahl experiment with ¹⁵N/¹⁴N labelling."
     },
     {
      "q": "State what is meant by the genetic code being degenerate and universal.",
      "a": "Degenerate: multiple codons code for the same amino acid (64 codons, 20 amino acids). Universal: the same codons code for the same amino acids in almost all organisms — evidence for a common ancestor."
     }
    ],
    "threejs3dFn": "createPolymerChain",
    "sketchfab3dId": "224d09f75a674f4a8107e79e3d3d5552",
    "wikiUrl": "https://en.wikipedia.org/wiki/Central_dogma_of_molecular_biology"
   },
   {
    "id": "2-8-cell-respiration",
    "name": "2.8 Cell respiration",
    "syllabusRef": "C1.2",
    "section": "C1. Interaction and interdependence — Molecules",
    "description": "Aerobic respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ~36 ATP. Stages: glycolysis (cytoplasm, 2 ATP net), Krebs cycle (matrix, 2 ATP), oxidative phosphorylation (cristae, ~32 ATP). Anaerobic: glycolysis only → lactate (animals) or ethanol + CO₂ (yeast).",
    "svgKey": "ib-bio-2-molecular-biology",
    "landmarks": [
     "Glycolysis (cytoplasm, 2 ATP net)",
     "Pyruvate → acetyl-CoA",
     "Krebs cycle (matrix, 2 ATP)",
     "Oxidative phosphorylation (cristae)",
     "Electron transport chain + ATP synthase",
     "Chemiosmosis",
     "Anaerobic: lactate / ethanol + CO₂"
    ],
    "examQA": [
     {
      "q": "State the products of glycolysis.",
      "a": "2 pyruvate, 2 ATP (net), 2 NADH. Occurs in cytoplasm. Glucose (6C) → 2 pyruvate (3C each). ATP is made by substrate-level phosphorylation."
     },
     {
      "q": "Explain how ATP is produced by chemiosmosis.",
      "a": "Electrons from NADH/FADH₂ pass along the electron transport chain on the inner mitochondrial membrane, releasing energy. This energy pumps H⁺ ions from the matrix into the intermembrane space, creating a proton gradient. H⁺ ions flow back through ATP synthase (chemiosmosis), driving phosphorylation of ADP to ATP."
     }
    ],
    "threejs3dFn": "createRespirationAnimation",
    "sketchfab3dId": "7445a425050e49daa881070ca6917a91",
    "wikiUrl": "https://en.wikipedia.org/wiki/Cellular_respiration"
   },
   {
    "id": "2-9-photosynthesis",
    "name": "2.9 Photosynthesis",
    "syllabusRef": "C1.3",
    "section": "C1. Interaction and interdependence — Molecules",
    "description": "Photosynthesis: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. Light reactions (thylakoids): light absorbed by chlorophyll, splitting water, producing ATP and NADPH. Calvin cycle (stroma): CO₂ fixed by RuBisCO; uses ATP and NADPH to produce glycerate-3-phosphate → triose phosphate → glucose.",
    "svgKey": "ib-bio-2-molecular-biology",
    "landmarks": [
     "Thylakoid (light reactions)",
     "Stroma (Calvin cycle)",
     "Photosystems I and II",
     "Photolysis of water (O₂ released)",
     "ATP synthesis (light reactions)",
     "NADPH production",
     "CO₂ fixation by RuBisCO",
     "Calvin cycle: GP → TP → glucose"
    ],
    "examQA": [
     {
      "q": "Distinguish between the light-dependent and light-independent reactions.",
      "a": "Light-dependent (thylakoid): require light; photolysis of water produces O₂; ATP and NADPH produced. Light-independent / Calvin cycle (stroma): do not require light directly; use ATP + NADPH to fix CO₂ and reduce GP to TP; produce glucose."
     },
     {
      "q": "State the role of RuBisCO in photosynthesis.",
      "a": "RuBisCO (ribulose bisphosphate carboxylase/oxygenase) catalyses the fixation of CO₂ to ribulose bisphosphate (RuBP, 5C) in the Calvin cycle, producing two molecules of glycerate-3-phosphate (3C). It is the primary entry point of carbon into organic molecules."
     }
    ],
    "threejs3dFn": "createPhotosynthesisAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Photosynthesis"
   },
   {
    "id": "3-1-genes",
    "name": "3.1 Genes",
    "syllabusRef": "D3.2",
    "section": "D3. Continuity and change — Organisms",
    "description": "A gene is a heritable factor consisting of a sequence of DNA that influences a specific characteristic. An allele is a variant form of a gene. The genome is the complete set of genes of an organism. Loci are the positions of genes on chromosomes. Diploid organisms carry two alleles per gene (on homologous chromosomes); gametes are haploid.",
    "svgKey": "ib-bio-3-genetics",
    "landmarks": [
     "Gene (DNA sequence → polypeptide)",
     "Allele (alternative form)",
     "Locus (position on chromosome)",
     "Diploid (2n) vs haploid (n)",
     "Homozygous vs heterozygous",
     "Dominant vs recessive alleles",
     "Genome / proteome"
    ],
    "examQA": [
     {
      "q": "Define gene, allele and locus.",
      "a": "Gene: a heritable factor (DNA sequence) that influences a specific characteristic. Allele: one specific form of a gene, occupying the same locus as other alleles of that gene. Locus: the specific position of a gene on a chromosome."
     },
     {
      "q": "Distinguish between dominant and recessive alleles.",
      "a": "Dominant: expressed in phenotype when one or two copies present (heterozygous or homozygous). Recessive: expressed in phenotype only when two copies present (homozygous recessive); masked by dominant allele in heterozygotes."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Gene"
   },
   {
    "id": "3-2-chromosomes",
    "name": "3.2 Chromosomes",
    "syllabusRef": "D2.1",
    "section": "D2. Continuity and change — Cells",
    "description": "Chromosomes are composed of DNA wrapped around histone proteins (nucleosomes). Karyotype: the number and appearance of chromosomes. Autosomes: non-sex chromosomes. Sex chromosomes: XX (female), XY (male) in humans. Chromosome number: haploid (n) and diploid (2n). Non-disjunction during meiosis causes aneuploidy (e.g., trisomy 21 = Down syndrome).",
    "svgKey": "ib-bio-3-genetics",
    "landmarks": [
     "Chromosome structure (DNA + histones)",
     "Karyotype (46 in humans)",
     "Autosomes vs sex chromosomes",
     "XX (female) / XY (male)",
     "Homologous chromosome pairs",
     "Non-disjunction → aneuploidy",
     "Down syndrome (trisomy 21)"
    ],
    "examQA": [
     {
      "q": "Explain how sex is determined in humans.",
      "a": "Humans have 46 chromosomes: 44 autosomes + 2 sex chromosomes. Females have XX; males have XY. The SRY gene on the Y chromosome triggers male development. Eggs always carry X; sperm carry X or Y. The sperm (50:50) determines sex of offspring."
     },
     {
      "q": "Explain the consequences of non-disjunction during meiosis I.",
      "a": "Homologous chromosomes fail to separate, so both go to one daughter cell and neither to the other. Fertilisation of a gamete with an extra chromosome produces a trisomy (2n+1), e.g. trisomy 21 (Down syndrome). Fertilisation of a gamete lacking a chromosome produces a monosomy (2n-1)."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Chromosome"
   },
   {
    "id": "3-3-meiosis",
    "name": "3.3 Meiosis",
    "syllabusRef": "D2.1",
    "section": "D2. Continuity and change — Cells",
    "description": "Meiosis produces four haploid cells from one diploid cell. Two divisions: Meiosis I separates homologous chromosomes; Meiosis II separates sister chromatids. Crossing over (chiasmata) in prophase I and independent assortment in metaphase I generate genetic variation. Fertilisation of two gametes restores the diploid number.",
    "svgKey": "ib-bio-3-genetics",
    "landmarks": [
     "Meiosis I: homologues separate",
     "Meiosis II: chromatids separate",
     "Prophase I: crossing over (chiasmata)",
     "Independent assortment",
     "Four haploid daughter cells",
     "Genetic variation sources",
     "Gametogenesis (spermatogenesis / oogenesis)"
    ],
    "examQA": [
     {
      "q": "Explain how meiosis generates genetic variation.",
      "a": "1. Crossing over (prophase I): non-sister chromatids of a homologous pair exchange segments at chiasmata, creating recombinant chromosomes with new allele combinations. 2. Independent assortment (metaphase I): bivalents align randomly; each gamete receives a random mix of maternal and paternal chromosomes. Combined with random fertilisation, these mechanisms produce enormous genetic diversity."
     },
     {
      "q": "Compare mitosis and meiosis.",
      "a": "Mitosis: 1 division, 2 diploid daughter cells, no crossing over, for growth/repair, produces genetically identical cells. Meiosis: 2 divisions, 4 haploid daughter cells, crossing over occurs, for sexual reproduction, produces genetically varied gametes."
     }
    ],
    "threejs3dFn": "createCellDivision",
    "wikiUrl": "https://en.wikipedia.org/wiki/Meiosis"
   },
   {
    "id": "3-4-inheritance",
    "name": "3.4 Inheritance",
    "syllabusRef": "D3.2",
    "section": "D3. Continuity and change — Organisms",
    "description": "Mendel's first law (segregation): alleles separate during gamete formation. Punnett squares predict offspring ratios. Codominance: both alleles expressed (e.g. blood type AB). Incomplete dominance: intermediate phenotype. Sex linkage: genes on X chromosome (e.g. haemophilia, colour blindness). Pedigree charts are used to deduce genotypes and inheritance patterns in families.",
    "svgKey": "ib-bio-3-genetics",
    "landmarks": [
     "Punnett square",
     "Monohybrid cross (3:1 ratio)",
     "Codominance (IA:IB blood type)",
     "Incomplete dominance (pink flowers)",
     "Sex linkage (X chromosome)",
     "Pedigree charts (deducing genotypes)",
     "Autosomal vs sex-linked traits"
    ],
    "examQA": [
     {
      "q": "Explain the expected ratio from a monohybrid cross (Bb × Bb).",
      "a": "Each parent produces gametes B and b in equal frequency. Punnett square: BB (25%), Bb (50%), bb (25%). Phenotypic ratio 3 dominant : 1 recessive. Genotypic ratio 1 BB : 2 Bb : 1 bb."
     },
     {
      "q": "Explain why haemophilia is more common in males than females.",
      "a": "Haemophilia gene is recessive and X-linked. Males (XY) have only one X chromosome; if they carry the allele (X^h Y) they express the disease. Females (XX) need two copies of the recessive allele to express it; one normal allele (X^H X^h) makes them carriers without the disease."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Heredity"
   },
   {
    "id": "3-5-genetic-modification",
    "name": "3.5 Genetic modification and biotechnology",
    "syllabusRef": "D1.3",
    "section": "D1. Continuity and change — Molecules",
    "description": "Recombinant DNA technology: restriction enzymes cut DNA at specific sequences (creating sticky ends); DNA ligase joins fragments; plasmids act as vectors to introduce foreign DNA into host cells. Applications: insulin production (E. coli), Bt crops, gene therapy. PCR amplifies DNA segments. Gel electrophoresis separates DNA fragments by size.",
    "svgKey": "ib-bio-3-genetics",
    "landmarks": [
     "Restriction enzymes (sticky ends)",
     "DNA ligase (joins fragments)",
     "Plasmid vectors",
     "Transformation of bacteria",
     "PCR (polymerase chain reaction)",
     "Gel electrophoresis",
     "Transgenic organisms",
     "Ethical issues"
    ],
    "examQA": [
     {
      "q": "Describe the steps in producing human insulin using recombinant DNA technology.",
      "a": "1. Restriction enzyme cuts out insulin gene from human DNA (sticky ends). 2. Same enzyme cuts open a bacterial plasmid. 3. DNA ligase joins insulin gene into plasmid (recombinant plasmid). 4. Plasmid inserted into E. coli. 5. E. coli multiplies; insulin gene expressed → insulin produced, extracted and purified."
     },
     {
      "q": "Explain the principles of PCR.",
      "a": "1. 95°C: denature (separate strands). 2. 55°C: anneal primers (complementary to target sequence). 3. 72°C: extend (Taq polymerase copies target). Repeat ~35 cycles → 2ⁿ copies. Each cycle doubles the target sequence."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Recombinant_DNA"
   },
   {
    "id": "4-1-species-communities-ecosystems",
    "name": "4.1 Species communities and ecosystems",
    "syllabusRef": "C4.1",
    "section": "C4. Interaction and interdependence — Ecosystems",
    "description": "Ecology: the study of relationships between organisms, and between organisms and their environment (biotic and abiotic). Ecosystem: all organisms in an area plus their abiotic environment. Community: all species in a habitat. Population: all members of one species. Niche: role of organism in ecosystem. Biotic and abiotic factors affect population size.",
    "svgKey": "ib-bio-4-ecology",
    "landmarks": [
     "Ecosystem / community / population / niche",
     "Biotic vs abiotic factors",
     "Carrying capacity (K)",
     "Predator-prey relationships",
     "Competition (intraspecific / interspecific)",
     "Symbiosis: mutualism, commensalism, parasitism",
     "Species diversity indices"
    ],
    "examQA": [
     {
      "q": "Define niche and explain why two species cannot occupy the same niche.",
      "a": "A niche is the role and position of an organism in its ecosystem, including its use of resources, interactions with other species, and its effect on the environment. Two species with identical niches compete for the same resources; one out-competes the other until only one remains (competitive exclusion principle)."
     },
     {
      "q": "Distinguish between biotic and abiotic factors that affect population size.",
      "a": "Biotic: living factors — food availability, predation, disease, competition. Abiotic: non-living — temperature, light intensity, pH, salinity, water availability. Both types act as limiting factors that prevent indefinite population growth."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Ecology"
   },
   {
    "id": "4-2-energy-flow",
    "name": "4.2 Energy flow",
    "syllabusRef": "C4.2",
    "section": "C4. Interaction and interdependence — Ecosystems",
    "description": "Energy flows in one direction through ecosystems. Producers (autotrophs) fix light energy by photosynthesis. Consumers obtain energy by eating other organisms. Only ~10% of energy is transferred between trophic levels; the rest is lost as heat via respiration. Energy pyramids are always broader at the base.",
    "svgKey": "ib-bio-4-ecology",
    "landmarks": [
     "Autotrophs (producers) / heterotrophs",
     "Trophic levels",
     "~10% energy transfer efficiency",
     "Energy pyramid",
     "Gross primary production (GPP)",
     "Net primary production (NPP = GPP - R)",
     "Food chain / food web",
     "Decomposers"
    ],
    "examQA": [
     {
      "q": "Explain why energy transfer between trophic levels is only about 10%.",
      "a": "Losses between levels: (1) respiration releases energy as heat; (2) undigested material passes in faeces; (3) excretion; (4) not all biomass is consumed. Only energy stored in biomass that is eaten and digested by the next level is transferred. This limits food chain length to ~4-5 levels."
     },
     {
      "q": "Distinguish between gross and net primary production.",
      "a": "GPP: total rate of photosynthesis (total energy fixed). NPP = GPP − R (energy used by producers for respiration). NPP represents the organic matter available to consumers."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Energy_flow_(ecology)"
   },
   {
    "id": "4-3-carbon-cycling",
    "name": "4.3 Carbon cycling",
    "syllabusRef": "C4.2",
    "section": "C4. Interaction and interdependence — Ecosystems",
    "description": "Carbon cycles between the atmosphere and organisms. Photosynthesis removes CO₂ from the atmosphere; respiration and combustion return it. Decomposers break down organic matter, releasing CO₂. Carbon sinks: forests, oceans, soil. Carbon sources: combustion, respiration, deforestation.",
    "svgKey": "ib-bio-4-ecology",
    "landmarks": [
     "CO₂ fixation (photosynthesis)",
     "CO₂ release (respiration, combustion)",
     "Decomposition",
     "Methane (CH₄) from methanogenic archaeans in anaerobic conditions",
     "Carbon sinks vs sources",
     "Fossil fuels (ancient carbon stores)",
     "Global carbon cycle"
    ],
    "examQA": [
     {
      "q": "Describe the role of decomposers in the carbon cycle.",
      "a": "Decomposers (bacteria and fungi) break down dead organic matter (detritus) via saprotrophic nutrition. They release CO₂ through respiration and return carbon to the soil and atmosphere. Without decomposers, carbon would remain locked in organic matter."
     },
     {
      "q": "Explain how burning fossil fuels affects the carbon cycle.",
      "a": "Fossil fuels contain carbon fixed millions of years ago. Combustion rapidly returns this carbon to the atmosphere as CO₂. This is a one-way transfer that increases atmospheric CO₂ beyond natural cycling, enhancing the greenhouse effect."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Carbon_cycle"
   },
   {
    "id": "4-4-climate-change",
    "name": "4.4 Climate change",
    "syllabusRef": "D4.3",
    "section": "D4. Continuity and change — Ecosystems",
    "description": "Greenhouse gases (CO₂, CH₄, N₂O, H₂O vapour) absorb outgoing infrared radiation, warming the atmosphere. Rising atmospheric CO₂ from fossil fuel combustion enhances the greenhouse effect. Consequences: rising sea levels, melting ice, ocean acidification, shifts in species distributions, more frequent extreme weather events.",
    "svgKey": "ib-bio-4-ecology",
    "landmarks": [
     "Greenhouse gases (CO₂, CH₄, N₂O)",
     "Enhanced greenhouse effect",
     "Global average temperature rise",
     "Ocean acidification (CO₂ + H₂O → H₂CO₃)",
     "Coral bleaching",
     "Sea level rise",
     "Phenological shifts",
     "Evidence: ice cores, temperature records"
    ],
    "examQA": [
     {
      "q": "Explain the enhanced greenhouse effect.",
      "a": "Greenhouse gases (CO₂, CH₄, N₂O) in the atmosphere absorb outgoing infrared radiation from Earth's surface and re-radiate some back. Rising concentrations from fossil fuel combustion, deforestation and agriculture increase this absorption, trapping more heat and raising global average temperature beyond natural levels."
     },
     {
      "q": "Explain how rising CO₂ levels cause ocean acidification.",
      "a": "CO₂ dissolves in seawater: CO₂ + H₂O ⇌ H₂CO₃ (carbonic acid) ⇌ H⁺ + HCO₃⁻. Increased H⁺ reduces pH. Lower pH reduces CO₃²⁻ availability, making it harder for marine organisms (corals, molluscs) to build calcium carbonate shells/skeletons."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Climate_change"
   },
   {
    "id": "5-1-evidence-evolution",
    "name": "5.1 Evidence for evolution",
    "syllabusRef": "A4.1",
    "section": "A4. Unity and diversity — Ecosystems",
    "description": "Evidence for evolution comes from: (1) Fossil record — transitional forms and stratigraphic sequence. (2) Comparative anatomy — homologous structures share common ancestry; analogous structures result from convergent evolution. (3) Selective breeding shows organisms can change within species. (4) Molecular biology — DNA/protein sequence similarities reflect evolutionary relationships.",
    "svgKey": "ib-bio-5-evolution",
    "landmarks": [
     "Fossil record (transitional forms)",
     "Stratigraphic sequence (relative dating)",
     "Homologous structures (common ancestry)",
     "Analogous structures (convergent evolution)",
     "Selective breeding (artificial selection)",
     "Comparative embryology",
     "Molecular evidence (DNA/protein sequences)"
    ],
    "examQA": [
     {
      "q": "Outline the evidence from comparative anatomy for evolution.",
      "a": "Homologous structures: same basic skeletal structure modified for different functions (e.g. human arm, whale flipper, bat wing, horse leg — all mammalian forelimbs). They share a common ancestral structure, indicating common ancestry. Vestigial structures (reduced, non-functional homologues) also indicate descent with modification."
     },
     {
      "q": "Explain how molecular biology provides evidence for evolution.",
      "a": "DNA sequences and protein amino acid sequences can be compared between species. More closely related species have more similar sequences. The universal genetic code and highly conserved genes (e.g. rRNA, cytochrome c) indicate all life descended from a common ancestor."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Evidence_of_common_descent"
   },
   {
    "id": "5-2-natural-selection",
    "name": "5.2 Natural selection",
    "syllabusRef": "D4.1",
    "section": "D4. Continuity and change — Ecosystems",
    "description": "Natural selection: (1) Heritable variation exists in populations. (2) More offspring are produced than can survive. (3) Individuals with better-adapted phenotypes survive and reproduce more. (4) Advantageous alleles increase in frequency in subsequent generations. This leads to gradual adaptation. Types: directional, stabilising, disruptive.",
    "svgKey": "ib-bio-5-evolution",
    "landmarks": [
     "Heritable variation (mutation source)",
     "Overproduction of offspring",
     "Differential survival (selection pressure)",
     "Inheritance of favourable alleles",
     "Adaptation",
     "Directional / stabilising / disruptive selection",
     "Antibiotic resistance (worked example)"
    ],
    "examQA": [
     {
      "q": "Explain how antibiotic resistance evolves in bacteria.",
      "a": "Mutations randomly arise in bacteria; a rare mutation may confer resistance to an antibiotic. When the antibiotic is present, susceptible bacteria die; resistant bacteria survive and reproduce (natural selection). Resistance alleles increase in frequency. Over generations, the population becomes resistant. Horizontal gene transfer can spread resistance between species."
     },
     {
      "q": "Outline the four steps of natural selection.",
      "a": "1. Variation: heritable differences exist in the population. 2. Overproduction: more offspring produced than environment can support. 3. Selection: individuals with advantageous traits more likely to survive and reproduce. 4. Inheritance: favourable alleles passed to offspring, increase in frequency over generations."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Natural_selection"
   },
   {
    "id": "5-3-classification",
    "name": "5.3 Classification of biodiversity — HL only, not examined at SL",
    "syllabusRef": "A3.2",
    "section": "A3. Unity and diversity — Organisms",
    "description": "Classification organises organisms into a hierarchy: Domain > Kingdom > Phylum > Class > Order > Family > Genus > Species. Binomial nomenclature: genus + species (italicised). Three domains: Archaea, Bacteria, Eukaryota. Modern classification aims to reflect evolutionary (phylogenetic) relationships rather than superficial similarities.",
    "svgKey": "ib-bio-5-evolution",
    "landmarks": [
     "Binomial nomenclature (genus species)",
     "Taxonomic hierarchy (DKPCOFGS)",
     "Three domains: Archaea, Bacteria, Eukaryota",
     "Five kingdoms (historical)",
     "Phylogenetic classification",
     "Morphological vs molecular data",
     "Species concept (interbreeding + fertile offspring)"
    ],
    "examQA": [
     {
      "q": "Distinguish between analogous and homologous structures in the context of classification.",
      "a": "Homologous structures share a common ancestral origin and indicate evolutionary relationship (used in phylogenetic classification). Analogous structures evolved independently to perform similar functions (convergent evolution) — they look similar but do not indicate common ancestry (misleading for classification)."
     },
     {
      "q": "State the biological species concept and its limitations.",
      "a": "A species is a group of organisms that can interbreed and produce fertile offspring. Limitations: cannot apply to asexual reproducers (bacteria), fossils, or ring species; some interfertile organisms are classified as different species for ecological reasons."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Taxonomy_(biology)"
   },
   {
    "id": "5-4-cladistics",
    "name": "5.4 Cladistics — HL only, not examined at SL",
    "syllabusRef": "A3.2",
    "section": "A3. Unity and diversity — Organisms",
    "description": "Cladistics classifies organisms based on shared derived characteristics (synapomorphies). A clade includes an ancestor and ALL its descendants. Cladograms are branching diagrams showing evolutionary relationships. More recent molecular data (DNA sequences) can revise traditional morphological classifications.",
    "svgKey": "ib-bio-5-evolution",
    "landmarks": [
     "Cladistics (shared derived characters)",
     "Synapomorphy",
     "Clade (monophyletic group)",
     "Cladogram construction",
     "Molecular vs morphological characters",
     "Reclassification using molecular data",
     "Outgroup comparison"
    ],
    "examQA": [
     {
      "q": "Define clade and synapomorphy.",
      "a": "Clade: a group consisting of an ancestral species and ALL its descendants (monophyletic group). Synapomorphy: a shared derived characteristic inherited from a common ancestor that defines a clade (e.g. hair in mammals)."
     },
     {
      "q": "Explain why molecular data may reclassify organisms previously placed in the same group.",
      "a": "Traditional classification used morphology, which can be misleading (analogous structures from convergent evolution). DNA/protein sequences directly reflect evolutionary history. Molecular analysis has revealed that some morphologically similar organisms are not closely related, leading to reclassification."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Cladistics"
   },
   {
    "id": "6-1-digestion-absorption",
    "name": "6.1 Digestion and absorption",
    "syllabusRef": "C1.1",
    "section": "C1. Interaction and interdependence — Molecules",
    "description": "Digestion breaks down large food molecules to monomers. Mouth: salivary amylase (starch → maltose). Stomach: pepsin in acid environment (proteins → peptides), HCl kills bacteria. Small intestine: pancreatic enzymes (amylase, lipase, protease); bile emulsifies fats; villi/microvilli maximise absorption. Large intestine: water reabsorption.",
    "svgKey": "ib-bio-6-human-physiology",
    "landmarks": [
     "Salivary amylase (starch → maltose)",
     "Stomach: HCl + pepsin (proteins)",
     "Pancreatic enzymes (amylase, protease, lipase)",
     "Bile (emulsification of fats)",
     "Villi + microvilli (absorption)",
     "Active transport of amino acids/glucose",
     "Fat absorption: lacteals",
     "Large intestine: water reabsorption"
    ],
    "examQA": [
     {
      "q": "Explain the role of the small intestine in digestion and absorption.",
      "a": "Digestion: pancreatic enzymes (amylase, lipase, proteases) complete breakdown of carbohydrates, fats and proteins. Brush border enzymes (maltase, lactase, peptidases) complete digestion. Absorption: villi (1 mm tall) and microvilli increase surface area enormously. Glucose and amino acids absorbed by active transport. Fatty acids and glycerol reform triglycerides, enter lacteals as chylomicrons."
     },
     {
      "q": "State the role of HCl in the stomach.",
      "a": "HCl: (1) activates pepsinogen to active pepsin; (2) provides optimal pH (~2) for pepsin activity; (3) kills most bacteria in food; (4) denatures proteins, opening them for enzymatic digestion."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Digestion"
   },
   {
    "id": "6-2-blood-system",
    "name": "6.2 The blood system",
    "syllabusRef": "B3.2",
    "section": "B3. Form and function — Organisms",
    "description": "The heart is a double pump. Left side: oxygenated blood to body (systemic). Right side: deoxygenated blood to lungs (pulmonary). Cardiac cycle: systole (ventricle contracts) and diastole (relaxes). Sinoatrial node (SAN) is the pacemaker. Arteries carry blood away from heart (high pressure); veins carry blood back (low pressure, valves); capillaries allow exchange.",
    "svgKey": "ib-bio-6-human-physiology",
    "landmarks": [
     "Double circulation (pulmonary + systemic)",
     "Cardiac cycle: systole / diastole",
     "Sinoatrial node (pacemaker)",
     "Atrioventricular node (AVN)",
     "Arteries, veins, capillaries (structure + function)",
     "Haemoglobin (O₂ + CO₂ transport)",
     "Coronary artery disease"
    ],
    "examQA": [
     {
      "q": "Describe the cardiac cycle.",
      "a": "Diastole: heart relaxes; blood fills atria. Atrial systole: atria contract; blood flows into ventricles. Ventricular systole: ventricles contract; blood ejected to aorta (left) and pulmonary artery (right); atrioventricular valves close (preventing backflow). Diastole again. SAN generates electrical impulse → spreads to AV node → bundle of His → Purkinje fibres."
     },
     {
      "q": "Compare the structure of arteries and veins.",
      "a": "Arteries: thick wall with elastic/muscular tissue, withstands high pressure, no valves, narrow lumen. Veins: thinner wall, large lumen, lower pressure, contain valves to prevent backflow. Capillaries: one cell thick (endothelium only), maximise diffusion for exchange."
     }
    ],
    "sketchfab3dId": "a2a731e2d3cf49939612c6ba48daeeb1",
    "wikiUrl": "https://en.wikipedia.org/wiki/Blood"
   },
   {
    "id": "6-3-defence-disease",
    "name": "6.3 Defence against infectious disease",
    "syllabusRef": "C3.2",
    "section": "C3. Interaction and interdependence — Organisms",
    "description": "Non-specific defences: skin (physical barrier), mucus and cilia (trapping pathogens), phagocytosis (neutrophils and macrophages engulf foreign cells), inflammatory response. Specific immunity: B-cells (humoral, antibody production), T-cells (cell-mediated). Memory cells enable rapid secondary immune response — basis of vaccination.",
    "svgKey": "ib-bio-6-human-physiology",
    "landmarks": [
     "Skin and mucus (physical/chemical barriers)",
     "Phagocytosis (neutrophils, macrophages)",
     "Lymphocytes: B-cells and T-cells",
     "Antibody structure (Y-shaped, antigen-binding sites)",
     "Clonal selection and expansion",
     "Memory cells (fast secondary response)",
     "Vaccination (active artificial immunity)",
     "Antigens and antibodies"
    ],
    "examQA": [
     {
      "q": "Describe the process of phagocytosis.",
      "a": "Phagocytes (neutrophils/macrophages) detect pathogens via chemotaxis. Pseudopodia extend and engulf the pathogen, forming a phagosome. Lysosomes fuse with the phagosome; enzymes (e.g. lysozyme) digest the pathogen. Debris is exocytosed. The macrophage displays pathogen antigens on its surface (antigen presentation), activating T-helper cells."
     },
     {
      "q": "Explain how vaccination protects a population.",
      "a": "Vaccine introduces antigen (killed/attenuated pathogen or its antigens). Immune response: B-cells → plasma cells → antibodies; memory B- and T-cells persist. If exposed to pathogen later, memory cells respond rapidly and produce high antibody titre before symptoms develop. Herd immunity: enough vaccinated individuals prevent pathogen spreading to unvaccinated members."
     }
    ],
    "sketchfab3dId": "45fceb1599254642b05888369208a523",
    "wikiUrl": "https://en.wikipedia.org/wiki/Immune_system"
   },
   {
    "id": "6-4-gas-exchange",
    "name": "6.4 Gas exchange",
    "syllabusRef": "B3.1",
    "section": "B3. Form and function — Organisms",
    "description": "Gas exchange in the alveoli: O₂ diffuses from alveolar air into blood; CO₂ diffuses from blood into alveoli. Adaptations: large surface area (~70 m²), thin walls (one cell), moist surface, rich capillary supply. Ventilation maintains concentration gradients. Haemoglobin binds O₂ (oxyhaemoglobin); CO₂ transported as bicarbonate ions.",
    "svgKey": "ib-bio-6-human-physiology",
    "landmarks": [
     "Alveolar structure (large SA, thin walls)",
     "Diffusion gradients (O₂ and CO₂)",
     "Ventilation (maintains gradients)",
     "Oxyhaemoglobin",
     "CO₂ transport as bicarbonate (HCO₃⁻)",
     "Bohr effect",
     "Tobacco smoke and lung disease"
    ],
    "examQA": [
     {
      "q": "Explain how the alveoli are adapted for gas exchange.",
      "a": "Large number of alveoli → large total SA (~70 m²). One-cell-thick walls and capillary wall → short diffusion path. Moist inner surface → O₂ dissolves. Dense capillary network → haemoglobin maintains steep gradient. Ventilation continuously refreshes air; circulation removes O₂ and delivers CO₂."
     },
     {
      "q": "Describe the Bohr effect.",
      "a": "Rising CO₂/falling pH decreases haemoglobin's affinity for O₂ (shifts O₂-dissociation curve right). In actively respiring tissues (high CO₂, low pH), more O₂ is released where demand is greatest. Helps deliver O₂ to tissues during exercise."
     }
    ],
    "threejs3dFn": "createDiffusionAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Gas_exchange"
   },
   {
    "id": "6-5-neurons-synapses",
    "name": "6.5 Neurons and synapses",
    "syllabusRef": "C2.2",
    "section": "C2. Interaction and interdependence — Cells",
    "description": "Neurons transmit electrical signals. Resting potential: −70 mV (Na⁺/K⁺ pump). Action potential: Na⁺ channels open (depolarisation to +40 mV); K⁺ channels open (repolarisation). All-or-nothing response. Saltatory conduction along myelinated axons. Synapse: Ca²⁺ triggers vesicle fusion; neurotransmitters diffuse to postsynaptic receptors.",
    "svgKey": "ib-bio-6-human-physiology",
    "landmarks": [
     "Resting potential (−70 mV)",
     "Na⁺/K⁺ pump (3 Na out, 2 K in)",
     "Depolarisation (Na⁺ in, +40 mV)",
     "Repolarisation (K⁺ out)",
     "All-or-nothing principle",
     "Myelination + saltatory conduction",
     "Synapse: neurotransmitter release",
     "Cholinergic synapses (acetylcholine)"
    ],
    "examQA": [
     {
      "q": "Describe the events of an action potential.",
      "a": "Stimulus → threshold reached → Na⁺ channels open → Na⁺ floods in → depolarisation (+40 mV). Na⁺ channels close; K⁺ channels open → K⁺ exits → repolarisation. Brief hyperpolarisation below −70 mV. Na⁺/K⁺ pump restores resting potential. Refractory period ensures one-way propagation."
     },
     {
      "q": "Outline transmission across a cholinergic synapse.",
      "a": "Action potential reaches presynaptic terminal → Ca²⁺ ions enter → vesicles containing acetylcholine fuse with membrane → ACh released into synaptic cleft → diffuses → binds to receptors on postsynaptic membrane → Na⁺ channels open → postsynaptic depolarisation. ACh broken down by acetylcholinesterase."
     }
    ],
    "threejs3dFn": "createNerveImpulse",
    "sketchfab3dId": "01d20ef702ee41478a8bc1da8082e504",
    "wikiUrl": "https://en.wikipedia.org/wiki/Neuron"
   },
   {
    "id": "6-6-hormones-homeostasis",
    "name": "6.6 Hormones homeostasis and reproduction",
    "syllabusRef": "D3.3",
    "section": "D3. Continuity and change — Organisms",
    "description": "Homeostasis maintains constant internal conditions. Negative feedback: deviation from set point triggers response to correct it. Blood glucose: β-cells secrete insulin (high glucose → glycogenesis); α-cells secrete glucagon (low glucose → glycogenolysis). Temperature: hypothalamus detects changes → sweating/vasodilation (heat) or shivering/vasoconstriction (cold).",
    "svgKey": "ib-bio-6-human-physiology",
    "landmarks": [
     "Homeostasis (negative feedback)",
     "Insulin (β-cells) → glycogenesis",
     "Glucagon (α-cells) → glycogenolysis",
     "Thermoregulation (hypothalamus)",
     "Sweating + vasodilation (cooling)",
     "Shivering + vasoconstriction (warming)",
     "FSH, LH, oestrogen, progesterone",
     "Menstrual cycle"
    ],
    "examQA": [
     {
      "q": "Explain the role of insulin in blood glucose regulation.",
      "a": "After a carbohydrate meal, blood glucose rises. Pancreatic β-cells detect this and secrete insulin. Insulin causes: (1) liver and muscle cells to take up glucose; (2) liver to convert glucose to glycogen (glycogenesis); (3) cells to increase glucose oxidation. Blood glucose falls back to normal set point (negative feedback). Type 1: β-cells destroyed, so little or no insulin. Type 2: target cells become resistant to insulin."
     },
     {
      "q": "Describe the role of the hypothalamus in thermoregulation.",
      "a": "Hypothalamus contains thermoreceptors that monitor blood temperature. If T rises: vasodilation of skin arterioles (heat loss by radiation), sweating (latent heat). If T falls: vasoconstriction, shivering (heat from muscle), piloerection (insulation). Both are negative feedback responses returning temperature to set point."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Homeostasis"
   }
  ]
 },
 "ib_hl_chemistry": {
  "subjectName": "IB Chemistry HL",
  "examCode": "IB-CHEM-HL",
  "sections": [
   "All",
   "Topic 1: Stoichiometric relationships",
   "Topic 2: Atomic structure",
   "Topic 3: Periodicity",
   "Topic 4: Bonding and structure",
   "Topic 5: Energetics",
   "Topic 6: Chemical kinetics",
   "Topic 7: Equilibrium",
   "Topic 8: Acids and bases",
   "Topic 9: Redox",
   "Topic 10: Organic chemistry",
   "Topic 11: Measurement",
   "Topics 12-21: HL Extension"
  ],
  "topics": [
   {
    "id": "1-1-particulate-nature",
    "name": "1.1 Introduction to the particulate nature of matter",
    "syllabusRef": "Structure 1.1",
    "section": "Structure 1. Models of the particulate nature of matter",
    "description": "Matter consists of atoms, molecules and ions. The three states of matter (solid, liquid, gas) differ in particle arrangement and energy. Chemical reactions rearrange atoms — no atoms created or destroyed. Conservation of mass applies to all chemical reactions.",
    "svgKey": "ib-chem-1-stoichiometric",
    "landmarks": [
     "Atoms, molecules, ions",
     "States of matter (kinetic theory)",
     "Pure substances vs mixtures",
     "Elements and compounds",
     "Conservation of mass",
     "Physical vs chemical changes"
    ],
    "examQA": [
     {
      "q": "Distinguish between atoms, molecules and ions.",
      "a": "Atom: smallest unit of an element that retains chemical properties; has protons, neutrons, electrons. Molecule: two or more atoms bonded covalently (may be same or different elements). Ion: atom or group of atoms with net positive or negative charge from gaining/losing electrons."
     },
     {
      "q": "Explain why mass is conserved in chemical reactions.",
      "a": "In a chemical reaction atoms are rearranged (bonds broken and formed) but not created or destroyed. The total number of each type of atom before equals the total after. Therefore total mass is conserved."
     }
    ],
    "threejs3dFn": "createParticleStates",
    "wikiUrl": "https://en.wikipedia.org/wiki/Matter"
   },
   {
    "id": "1-2-mole-concept",
    "name": "1.2 The mole concept",
    "syllabusRef": "Structure 1.4",
    "section": "Structure 1. Models of the particulate nature of matter",
    "description": "The mole: amount of substance containing 6.02×10²³ particles (Avogadro's constant, NA). Molar mass (M): mass per mole in g mol⁻¹. n = m/M. In solution: c = n/V (mol dm⁻³). Mole fractions and percentage composition from molar masses.",
    "svgKey": "ib-chem-1-stoichiometric",
    "landmarks": [
     "Avogadro's constant (NA = 6.02×10²³ mol⁻¹)",
     "Molar mass (M, g mol⁻¹)",
     "n = m/M",
     "Concentration c = n/V (mol dm⁻³)",
     "Percentage composition by mass",
     "Interconverting moles, mass, particles"
    ],
    "examQA": [
     {
      "q": "Define the mole and state Avogadro's constant.",
      "a": "The mole is the amount of substance containing 6.02×10²³ particles (the same number as atoms in exactly 12 g of ¹²C). Avogadro's constant NA = 6.02×10²³ mol⁻¹."
     },
     {
      "q": "Calculate the molar concentration of 4.0 g NaOH (M = 40 g mol⁻¹) dissolved in 500 cm³.",
      "a": "n(NaOH) = 4.0/40 = 0.10 mol. V = 500 cm³ = 0.500 dm³. c = 0.10/0.500 = 0.20 mol dm⁻³."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Mole_(unit)"
   },
   {
    "id": "1-3-reacting-masses-volumes",
    "name": "1.3 Reacting masses and volumes",
    "syllabusRef": "Reactivity 2.1",
    "section": "Reactivity 2. How much, how fast and how far?",
    "description": "Balanced equations give molar ratios. Limiting reagent determines maximum yield. Theoretical yield calculated from moles; percentage yield = (actual/theoretical)×100. For gases at STP (0°C, 100 kPa): 1 mol = 22.7 dm³. Concentration and volume used to calculate moles in solution reactions.",
    "svgKey": "ib-chem-1-stoichiometric",
    "landmarks": [
     "Molar ratio from balanced equations",
     "Limiting reagent",
     "Theoretical yield",
     "Percentage yield = (actual/theoretical)×100",
     "Gas volume (22.7 dm³ mol⁻¹ at STP)",
     "Titration calculations"
    ],
    "examQA": [
     {
      "q": "Identify the limiting reagent when 3 mol H₂ reacts with 1 mol N₂ to form NH₃.",
      "a": "N₂ + 3H₂ → 2NH₃. 3 mol H₂ requires 1 mol N₂ exactly → neither is in excess; both are used completely. (If 2 mol H₂ and 1 mol N₂: 2 mol H₂ needs only 2/3 mol N₂, so N₂ is in excess; H₂ is limiting.)"
     },
     {
      "q": "Calculate percentage yield if 3.6 g water produced when theoretical yield = 4.5 g.",
      "a": "% yield = (actual/theoretical) × 100 = (3.6/4.5) × 100 = 80%."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Stoichiometry"
   },
   {
    "id": "2-1-nuclear-atom",
    "name": "2.1 The nuclear atom",
    "syllabusRef": "Structure 1.2",
    "section": "Structure 1. Models of the particulate nature of matter",
    "description": "Rutherford model: nucleus contains protons and neutrons; electrons orbit outside. Mass number (A): protons + neutrons. Atomic number (Z): protons. Isotopes: same Z, different A. Relative atomic mass: weighted mean of isotope masses (relative to ¹²C = 12). Mass spectrometry measures isotopic masses and abundances.",
    "svgKey": "ib-chem-2-atomic-structure",
    "landmarks": [
     "Proton (Z), neutron, electron",
     "Mass number A and atomic number Z",
     "Isotopes (same Z, different A)",
     "Relative atomic mass (weighted mean)",
     "Mass spectrometry",
     "Deflection by magnetic field (m/z)"
    ],
    "examQA": [
     {
      "q": "Define isotopes and give an example.",
      "a": "Isotopes: atoms of the same element with the same atomic number (same number of protons/electrons) but different mass numbers (different numbers of neutrons). Example: ¹²C (6 protons, 6 neutrons) and ¹³C (6 protons, 7 neutrons) and ¹⁴C (6 protons, 8 neutrons)."
     },
     {
      "q": "Calculate Ar of chlorine given ³⁵Cl (75%) and ³⁷Cl (25%).",
      "a": "Ar = (35 × 75/100) + (37 × 25/100) = 26.25 + 9.25 = 35.5."
     }
    ],
    "threejs3dFn": "createAtomModel",
    "wikiUrl": "https://en.wikipedia.org/wiki/Atomic_nucleus"
   },
   {
    "id": "2-2-electron-configuration",
    "name": "2.2 Electron configuration",
    "syllabusRef": "Structure 1.3",
    "section": "Structure 1. Models of the particulate nature of matter",
    "description": "Electrons occupy discrete energy levels (shells) and subshells (s, p, d, f). Subshell order: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p. Aufbau principle: fill lowest energy first. Pauli exclusion: max 2 electrons per orbital (opposite spins). Hund's rule: one electron per orbital before pairing. Emission spectra evidence: discrete lines = quantised energy levels.",
    "svgKey": "ib-chem-2-atomic-structure",
    "landmarks": [
     "Principal shells (n=1,2,3,...)",
     "Subshells s,p,d,f",
     "Aufbau principle (fill lowest first)",
     "Pauli exclusion (max 2 per orbital)",
     "Hund's rule (maximise unpaired electrons)",
     "Electron configuration notation",
     "Emission spectra → quantised energy",
     "First ionisation energy trend"
    ],
    "examQA": [
     {
      "q": "Write the electron configuration of iron (Z=26).",
      "a": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s² or [Ar]3d⁶4s². 4s fills before 3d (lower energy); iron has 6 d-electrons making it a transition metal (d-block)."
     },
     {
      "q": "Explain why emission spectra evidence quantised energy levels.",
      "a": "Hydrogen emits only specific wavelengths (discrete lines), not continuous. Electrons can only occupy fixed energy levels; when an electron falls from higher to lower level, it emits a photon with energy E=hf equal to the energy difference. Only discrete ΔE values exist → only specific wavelengths emitted."
     }
    ],
    "threejs3dFn": "createOrbital",
    "wikiUrl": "https://en.wikipedia.org/wiki/Electron_configuration"
   },
   {
    "id": "3-1-periodic-table",
    "name": "3.1 Periodic table",
    "syllabusRef": "Structure 3.1",
    "section": "Structure 3. Classification of matter",
    "description": "Elements arranged in order of increasing atomic number. Periods: same highest principal quantum number. Groups: same number of outer electrons, similar chemical properties. Metals, non-metals, metalloids. Transition metals: d-block. Lanthanides and actinides: f-block. Period 3 as reference for periodic trends.",
    "svgKey": "ib-chem-3-periodicity",
    "landmarks": [
     "Periods and groups",
     "s, p, d, f blocks",
     "Alkali metals (Group 1)",
     "Halogens (Group 17)",
     "Noble gases (Group 18)",
     "Transition metals (d-block)",
     "Metals / non-metals / metalloids",
     "Period 3 elements"
    ],
    "examQA": [
     {
      "q": "Explain why elements in the same group have similar chemical properties.",
      "a": "Elements in the same group have the same number of electrons in their outermost shell (same valence electron configuration). Valence electrons determine chemical reactivity. Elements in the same group form compounds with similar empirical formulas and show similar chemical behaviour."
     },
     {
      "q": "State the block classification of elements.",
      "a": "s-block: Groups 1-2 (valence electrons in s subshell). p-block: Groups 13-18 (valence electrons in p subshell). d-block: transition metals (Groups 3-12, filling 3d subshell). f-block: lanthanides and actinides (filling 4f/5f subshell)."
     }
    ],
    "threejs3dFn": "createAtomModel",
    "wikiUrl": "https://en.wikipedia.org/wiki/Periodic_table"
   },
   {
    "id": "3-2-periodic-trends",
    "name": "3.2 Periodic trends",
    "syllabusRef": "Structure 3.1",
    "section": "Structure 3. Classification of matter",
    "description": "Across a period: atomic radius decreases (nuclear charge increases, same shell); first ionisation energy generally increases (exceptions at Group 13 and 16); electronegativity increases. Down a group: atomic radius increases (more shells); ionisation energy decreases; electronegativity decreases. Metallic character decreases across period, increases down group.",
    "svgKey": "ib-chem-3-periodicity",
    "landmarks": [
     "Atomic radius trend (across: decrease; down: increase)",
     "First ionisation energy trend",
     "Exceptions (Al lower than Mg; S lower than P)",
     "Electronegativity (Pauling scale)",
     "Metallic character",
     "Effective nuclear charge",
     "Electron shielding"
    ],
    "examQA": [
     {
      "q": "Explain the trend in first ionisation energy across Period 3.",
      "a": "Generally increases from Na to Ar. Nuclear charge increases while electrons added to same shell (little extra shielding) → greater nuclear attraction → more energy to remove outer electron. Exceptions: Al (3p¹ easier to remove than Mg 3s² due to 3p being slightly higher energy); S (paired 3p electron repulsion makes one easier to remove than phosphorus 3p³ half-filled)."
     },
     {
      "q": "Explain why atomic radius decreases across Period 3.",
      "a": "Atomic number increases (Na Z=11 to Ar Z=18); electrons added to the same n=3 shell provide little extra shielding. Greater effective nuclear charge attracts electrons closer to nucleus, reducing atomic radius."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Periodic_trends"
   },
   {
    "id": "4-1-ionic-bonding",
    "name": "4.1 Ionic bonding",
    "syllabusRef": "Structure 2.1",
    "section": "Structure 2. Models of bonding and structure",
    "description": "Ionic bonds form by electron transfer from metal to non-metal. Resulting ions held by electrostatic attraction. Ionic compounds form giant lattice structures (e.g. NaCl). Properties: high melting points, brittle, conduct electricity when molten or in solution, soluble in polar solvents.",
    "svgKey": "ib-chem-4-bonding",
    "landmarks": [
     "Electron transfer (metal to non-metal)",
     "Cation (+) and anion (−)",
     "Electrostatic attraction",
     "Giant ionic lattice",
     "High mp/bp",
     "Brittleness (ion layer shift)",
     "Conductivity (molten/dissolved)",
     "Formulae from ionic charges"
    ],
    "examQA": [
     {
      "q": "Explain why ionic compounds have high melting points.",
      "a": "Ionic compounds have a giant lattice structure: millions of positive and negative ions held together by strong electrostatic attraction in all directions. A large amount of energy is required to overcome these forces and separate the ions during melting, resulting in high melting points."
     },
     {
      "q": "Explain why ionic compounds conduct electricity when molten but not when solid.",
      "a": "In solid state, ions are fixed in the lattice (cannot move) → no conductivity. When molten, ions are free to move and carry charge → conducts electricity. In solution, ions dissociate and move freely → conducts electricity."
     }
    ],
    "threejs3dFn": "createMetalLattice",
    "wikiUrl": "https://en.wikipedia.org/wiki/Ionic_bond"
   },
   {
    "id": "4-2-covalent-bonding",
    "name": "4.2 Covalent bonding",
    "syllabusRef": "Structure 2.2",
    "section": "Structure 2. Models of bonding and structure",
    "description": "Covalent bonds: sharing of electron pairs between non-metals. Single (σ), double (σ+π), triple (σ+2π) bonds. Bond length decreases and bond strength increases with bond order. Coordinate/dative bonds: both electrons from one atom. Lewis (dot-and-cross) structures show electron sharing.",
    "svgKey": "ib-chem-4-bonding",
    "landmarks": [
     "Shared electron pairs",
     "Single, double, triple bonds",
     "Lewis structures (dot-and-cross)",
     "Bond order",
     "Bond length (order↑ → length↓)",
     "Bond strength (order↑ → strength↑)",
     "Dative (coordinate) bonds",
     "Octet rule (exceptions: PCl₅, SF₆, BF₃)"
    ],
    "examQA": [
     {
      "q": "Draw the Lewis structure of CO₂ and explain the bonding.",
      "a": "O=C=O. Carbon forms one double bond with each oxygen (two C=O bonds in total). Lewis: [::O::]=C=[::O::] where each O has 2 lone pairs and shares 2 pairs with C. Each C=O bond consists of one σ-bond and one π-bond. Carbon achieves 4 bonds (octet); each oxygen has 2 bonds + 2 lone pairs (octet)."
     },
     {
      "q": "Compare C-C, C=C and C≡C bond lengths and energies.",
      "a": "C-C: longest (154 pm), weakest (347 kJ mol⁻¹). C=C: shorter (134 pm), stronger (614 kJ mol⁻¹). C≡C: shortest (120 pm), strongest (839 kJ mol⁻¹). As bond order increases, more electron density between atoms → shorter, stronger bond."
     }
    ],
    "threejs3dFn": "createMolecule('water')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Covalent_bond"
   },
   {
    "id": "4-3-covalent-structures",
    "name": "4.3 Covalent structures",
    "syllabusRef": "Structure 2.2",
    "section": "Structure 2. Models of bonding and structure",
    "description": "VSEPR theory predicts molecular geometry from electron domains. Shapes: linear (2 domains), trigonal planar (3), tetrahedral (4), trigonal bipyramidal (5), octahedral (6). Lone pairs occupy more space than bonding pairs, reducing bond angles. Molecular polarity: depends on bond polarity and shape.",
    "svgKey": "ib-chem-4-bonding",
    "landmarks": [
     "VSEPR theory (electron domains)",
     "Linear (180°), trigonal planar (120°)",
     "Tetrahedral (109.5°)",
     "Bent/V-shaped (H₂O: 104.5°)",
     "Trigonal pyramidal (NH₃: 107°)",
     "Lone pair repulsion (reduces angle)",
     "Polar vs non-polar molecules",
     "Dipole moment"
    ],
    "examQA": [
     {
      "q": "Predict the shape and bond angle of NH₃.",
      "a": "N has 3 bonding pairs and 1 lone pair = 4 electron domains. Electron geometry: tetrahedral. Molecular shape: trigonal pyramidal. Bond angle: ~107° (less than 109.5° because lone pair repulsion > bonding pair repulsion, compressing the H-N-H angles)."
     },
     {
      "q": "Explain why CCl₄ is non-polar despite having polar C-Cl bonds.",
      "a": "Each C-Cl bond is polar (Cl more electronegative). In CCl₄, four C-Cl bond dipoles point symmetrically to corners of a tetrahedron. The dipoles cancel in all directions → net dipole = 0 → molecule is non-polar. Symmetry cancels individual bond polarities."
     }
    ],
    "threejs3dFn": "createMolecule('benzene')",
    "wikiUrl": "https://en.wikipedia.org/wiki/VSEPR_theory"
   },
   {
    "id": "4-4-intermolecular-forces",
    "name": "4.4 Intermolecular forces",
    "syllabusRef": "Structure 2.2",
    "section": "Structure 2. Models of bonding and structure",
    "description": "Van der Waals (London dispersion): temporary dipole → induced dipole; present in ALL molecules; strength increases with molar mass. Dipole-dipole: between permanent dipoles. Hydrogen bonding: N-H, O-H or F-H with lone pair on N, O or F; strongest intermolecular force. Properties affected: boiling point, solubility, viscosity.",
    "svgKey": "ib-chem-4-bonding",
    "landmarks": [
     "London dispersion (van der Waals)",
     "Temporary dipole–induced dipole",
     "Permanent dipole–dipole",
     "Hydrogen bonding (N, O, F)",
     "Strength: H-bond > dipole-dipole > vdW",
     "Boiling point trends",
     "Anomalous properties of water (H-bonds)"
    ],
    "examQA": [
     {
      "q": "Explain why HF has a higher boiling point than HCl despite smaller molar mass.",
      "a": "HF forms hydrogen bonds: H is bonded to highly electronegative F; lone pairs on F act as acceptors. H-bonds are stronger than the dipole-dipole forces in HCl. More energy needed to break H-bonds during boiling → higher boiling point. HCl: only dipole-dipole + weak vdW."
     },
     {
      "q": "Explain why boiling points increase down Group 17 (F to I).",
      "a": "Going from F₂ to I₂, molar mass increases, so the number of electrons increases. Stronger temporary dipoles can be induced (greater polarisability) → stronger London dispersion forces → more energy needed to overcome them → higher boiling points."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Intermolecular_force"
   },
   {
    "id": "4-5-metallic-bonding",
    "name": "4.5 Metallic bonding",
    "syllabusRef": "Structure 2.3",
    "section": "Structure 2. Models of bonding and structure",
    "description": "Metallic bonding: \"sea\" of delocalised electrons surrounding a lattice of positive metal cations. Electrostatic attraction between electrons and cations. Properties: high melting point (strong attraction), electrical conductivity (delocalised electrons carry charge), thermal conductivity, malleability and ductility (layers can slide without breaking bonds).",
    "svgKey": "ib-chem-4-bonding",
    "landmarks": [
     "Delocalised electrons (electron sea)",
     "Positive metal cations in lattice",
     "Electrostatic attraction",
     "High mp (stronger with more valence e⁻)",
     "Electrical conductivity",
     "Thermal conductivity",
     "Malleability and ductility"
    ],
    "examQA": [
     {
      "q": "Explain why metals are good conductors of electricity.",
      "a": "In metals, valence electrons are delocalised from their parent atoms and can move freely through the metallic lattice. When a potential difference is applied, these mobile electrons move directionally → carry charge → electrical current flows. No such mobile charge carriers exist in ionic solids or covalent molecular compounds."
     },
     {
      "q": "Explain why magnesium has a higher melting point than sodium.",
      "a": "Mg has 2 delocalised electrons per atom (2+); Na has 1 (1+). Stronger electrostatic attraction between Mg²⁺ ions and the denser electron sea → more energy required to separate ions → higher melting point. Mg also has smaller, more charge-dense cations."
     }
    ],
    "threejs3dFn": "createMetalLattice",
    "wikiUrl": "https://en.wikipedia.org/wiki/Metallic_bond"
   },
   {
    "id": "5-1-measuring-energy",
    "name": "5.1 Measuring energy changes",
    "syllabusRef": "Reactivity 1.1",
    "section": "Reactivity 1. What drives chemical reactions?",
    "description": "Enthalpy (H): heat content at constant pressure. Exothermic: ΔH < 0 (products lower energy, heat released). Endothermic: ΔH > 0 (products higher energy, heat absorbed). Standard enthalpy change: ΔH° at 100 kPa, usually 298 K. Calorimetry: q = mcΔT; ΔH = −q/n.",
    "svgKey": "ib-chem-5-energetics",
    "landmarks": [
     "Enthalpy H (heat at constant P)",
     "Exothermic (ΔH < 0)",
     "Endothermic (ΔH > 0)",
     "Standard enthalpy (ΔH°, 298 K, 100 kPa)",
     "Calorimetry: q = mcΔT",
     "ΔH = −q/n (per mole)",
     "Potential energy diagram",
     "Activation energy"
    ],
    "examQA": [
     {
      "q": "A student burns 0.50 g of ethanol (M = 46) and heats 200 g water by 25°C (c = 4.18 J g⁻¹ K⁻¹). Calculate ΔH per mole.",
      "a": "q = mcΔT = 200 × 4.18 × 25 = 20,900 J. n(ethanol) = 0.50/46 = 0.0109 mol. ΔH = −20900/0.0109 = −1.92×10⁶ J mol⁻¹ = −1920 kJ mol⁻¹ (negative: exothermic)."
     },
     {
      "q": "Define standard enthalpy of combustion.",
      "a": "The enthalpy change when 1 mole of a substance is completely burned in excess oxygen under standard conditions (298 K, 100 kPa), with all products in standard states. Always exothermic (negative value)."
     }
    ],
    "threejs3dFn": "createEnergyTransfer",
    "wikiUrl": "https://en.wikipedia.org/wiki/Enthalpy"
   },
   {
    "id": "5-2-hess-law",
    "name": "5.2 Hess's law",
    "syllabusRef": "Reactivity 1.2",
    "section": "Reactivity 1. What drives chemical reactions?",
    "description": "Hess's law: the enthalpy change of a reaction is independent of the pathway; depends only on initial and final states. Allows calculation of ΔH from standard enthalpies of formation or combustion. Born-Haber cycles (HL) use Hess's law for ionic compounds.",
    "svgKey": "ib-chem-5-energetics",
    "landmarks": [
     "Hess's law (path independence)",
     "Enthalpy cycle",
     "Standard enthalpy of formation (ΔHf°)",
     "ΔHrxn = ΣΔHf°(products) − ΣΔHf°(reactants)",
     "Using enthalpy of combustion data",
     "Born-Haber cycles (HL)"
    ],
    "examQA": [
     {
      "q": "Calculate ΔH for C(s)+½O₂(g)→CO(g) using ΔHc°[C(s)]=−394 and ΔHc°[CO(g)]=−283 kJ mol⁻¹.",
      "a": "Route 1 (direct): C + ½O₂ → CO (unknown = x). Route 2: C + O₂ → CO₂ (−394); CO + ½O₂ → CO₂ (−283 → reverse: CO₂ → CO = +283). By Hess's law: x = −394 + 283 = −111 kJ mol⁻¹."
     },
     {
      "q": "State Hess's law.",
      "a": "The total enthalpy change for a chemical reaction is the same regardless of the pathway taken, provided the initial and final conditions are the same. Consequence of energy conservation (first law of thermodynamics)."
     }
    ],
    "threejs3dFn": "createEnergyTransfer",
    "wikiUrl": "https://en.wikipedia.org/wiki/Hess%27s_law"
   },
   {
    "id": "5-3-bond-enthalpies",
    "name": "5.3 Bond enthalpies",
    "syllabusRef": "Reactivity 1.2",
    "section": "Reactivity 1. What drives chemical reactions?",
    "description": "Bond enthalpy (bond dissociation energy): energy to break 1 mol of a bond in gaseous molecules (always endothermic). ΔH ≈ Σ(bonds broken) − Σ(bonds formed). Average bond enthalpies from data booklet. Limitations: values are averages; only accurate for gaseous species.",
    "svgKey": "ib-chem-5-energetics",
    "landmarks": [
     "Bond dissociation energy (endothermic, +ve)",
     "ΔH = Σ(broken) − Σ(formed)",
     "Average bond enthalpy",
     "Values from data booklet",
     "Strengths: double > single bond",
     "Limitations (average, gas only)"
    ],
    "examQA": [
     {
      "q": "Calculate ΔH for H₂(g)+Cl₂(g)→2HCl(g) using bond enthalpies H-H=436, Cl-Cl=243, H-Cl=432 kJ mol⁻¹.",
      "a": "Bonds broken: 436 + 243 = 679 kJ. Bonds formed: 2 × 432 = 864 kJ. ΔH = 679 − 864 = −185 kJ mol⁻¹ (exothermic)."
     },
     {
      "q": "Explain why bond enthalpy calculations give approximate values for ΔH.",
      "a": "Bond enthalpies used are average values from many different compounds; in reality, bond energy depends on molecular environment. Also assumes all species are gaseous (ΔH°f of gaseous substances). Real reactions may involve liquids/solids, requiring additional enthalpy terms."
     }
    ],
    "threejs3dFn": "createEnergyTransfer",
    "wikiUrl": "https://en.wikipedia.org/wiki/Bond-dissociation_energy"
   },
   {
    "id": "6-1-collision-theory",
    "name": "6.1 Collision theory and rates of reaction",
    "syllabusRef": "Reactivity 2.2",
    "section": "Reactivity 2. How much, how fast and how far?",
    "description": "Collision theory: reactions occur when reactant particles collide with sufficient energy (≥ activation energy) and correct orientation. Rate depends on collision frequency and fraction of successful collisions. Factors: temperature, concentration, pressure (gases), surface area, catalyst. Activation energy (Ea): minimum energy for reaction to occur.",
    "svgKey": "ib-chem-6-kinetics",
    "landmarks": [
     "Activation energy (Ea)",
     "Successful collision (correct energy + orientation)",
     "Effect of temperature (Maxwell-Boltzmann)",
     "Effect of concentration/pressure",
     "Effect of surface area",
     "Catalyst (lowers Ea, alternative pathway)",
     "Rate expression (SL: qualitative)",
     "Reaction rate = d[product]/dt"
    ],
    "examQA": [
     {
      "q": "Explain how a catalyst increases reaction rate.",
      "a": "A catalyst provides an alternative reaction pathway with lower activation energy (Ea). The Maxwell-Boltzmann distribution shows that more molecules have energy ≥ Ea (lower) → greater fraction of collisions is successful → rate increases. Catalyst is not consumed; it is regenerated."
     },
     {
      "q": "Explain why increasing temperature increases rate of reaction.",
      "a": "Higher temperature → greater average kinetic energy → molecules move faster → more frequent collisions. More importantly, more molecules have energy ≥ Ea (shape of Maxwell-Boltzmann distribution shifts right, tail extends) → greater fraction of collisions successful → rate increases substantially (typically doubles per 10°C rise)."
     }
    ],
    "threejs3dFn": "createReactionAnimation('collision')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Collision_theory"
   },
   {
    "id": "7-1-equilibrium",
    "name": "7.1 Equilibrium",
    "syllabusRef": "Reactivity 2.3",
    "section": "Reactivity 2. How much, how fast and how far?",
    "description": "Dynamic equilibrium: in a closed system, forward and reverse reaction rates are equal; concentrations remain constant. Le Chatelier's principle: a system at equilibrium subjected to a change responds to minimise the effect. Changes: concentration, pressure (gases), temperature (temperature change is the only factor that changes Kc).",
    "svgKey": "ib-chem-7-equilibrium",
    "landmarks": [
     "Dynamic equilibrium (rates equal, concentrations constant)",
     "Le Chatelier's principle",
     "Concentration change (shifts equilibrium)",
     "Pressure change (gas moles)",
     "Temperature change (endothermic/exothermic)",
     "Catalyst (no effect on position, only rate)"
    ],
    "examQA": [
     {
      "q": "Apply Le Chatelier's principle to N₂(g)+3H₂(g)⇌2NH₃(g) ΔH=−92 kJ mol⁻¹.",
      "a": "Increasing pressure → equilibrium shifts right (fewer moles of gas). Increasing temperature → equilibrium shifts left (reverse reaction is endothermic; absorbs heat to cool). Increasing [N₂] → shifts right. Catalyst → rate increases but position unchanged."
     },
     {
      "q": "Define dynamic equilibrium.",
      "a": "A state in which the forward and reverse reactions occur at equal rates; macroscopic properties (concentration, pressure, colour) remain constant; the system is not static but continues to react in both directions at molecular level."
     }
    ],
    "threejs3dFn": "createReactionAnimation('energetic')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Chemical_equilibrium"
   },
   {
    "id": "7-2-equilibrium-law",
    "name": "7.2 The equilibrium law",
    "syllabusRef": "Reactivity 2.3",
    "section": "Reactivity 2. How much, how fast and how far?",
    "description": "Equilibrium constant Kc: ratio of product to reactant concentrations at equilibrium, each raised to stoichiometric coefficient. Large Kc: products favoured; small Kc: reactants favoured. Kc changes only with temperature. Reaction quotient Q: calculated from non-equilibrium concentrations; if Q < Kc, reaction proceeds forward.",
    "svgKey": "ib-chem-7-equilibrium",
    "landmarks": [
     "Kc expression (from equation)",
     "Kc > 1 (products favoured), Kc < 1 (reactants)",
     "Temperature only changes Kc",
     "Units of Kc (depend on stoichiometry)",
     "Reaction quotient Q",
     "Q vs Kc: predicts direction"
    ],
    "examQA": [
     {
      "q": "Write the Kc expression for 2SO₂(g)+O₂(g)⇌2SO₃(g).",
      "a": "Kc = [SO₃]²/([SO₂]²[O₂]). Products in numerator, reactants in denominator, each raised to stoichiometric coefficient. Units: (mol dm⁻³)²/((mol dm⁻³)²(mol dm⁻³)) = dm³ mol⁻¹."
     },
     {
      "q": "Explain why changing the concentration of a reactant does not change Kc.",
      "a": "Kc depends only on temperature. Adding a reactant increases Q denominator → Q < Kc → reaction shifts forward to re-establish equilibrium. Once equilibrium is re-established, concentrations readjust so the ratio of products to reactants gives the same Kc value."
     }
    ],
    "threejs3dFn": "createReactionAnimation('energetic')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Equilibrium_constant"
   },
   {
    "id": "8-1-acid-base-theories",
    "name": "8.1 Theories of acids and bases",
    "syllabusRef": "Reactivity 3.1",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "Arrhenius: acid produces H⁺(aq); base produces OH⁻(aq). Brønsted-Lowry: acid is a proton donor; base is a proton acceptor. Conjugate pairs: acid ⇌ conjugate base (differs by one H⁺). Amphoteric: can act as acid or base (e.g. water, amino acids). Lewis (HL): acid accepts electron pair; base donates electron pair.",
    "svgKey": "ib-chem-8-acids-bases",
    "landmarks": [
     "Arrhenius definition",
     "Brønsted-Lowry definition",
     "Conjugate acid-base pairs",
     "Amphoteric species (water)",
     "Strong vs weak acids",
     "Monoprotic vs polyprotic acids",
     "Neutralisation: acid + base → salt + water",
     "Lewis acid-base (HL)"
    ],
    "examQA": [
     {
      "q": "Identify the conjugate base of HNO₃ and the conjugate acid of NH₃.",
      "a": "HNO₃ (acid) → H⁺ + NO₃⁻. Conjugate base = NO₃⁻. NH₃ (base) + H⁺ → NH₄⁺. Conjugate acid = NH₄⁺."
     },
     {
      "q": "Explain why water is amphoteric.",
      "a": "Water can act as a Brønsted-Lowry acid (donates H⁺ to a base: H₂O + NH₃ → OH⁻ + NH₄⁺) or as a Brønsted-Lowry base (accepts H⁺ from an acid: H₂O + HCl → H₃O⁺ + Cl⁻). It can both donate and accept protons."
     }
    ],
    "threejs3dFn": "createReactionAnimation('collision')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Acid"
   },
   {
    "id": "8-2-properties-acids-bases",
    "name": "8.2 Properties of acids and bases",
    "syllabusRef": "Reactivity 3.1",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "Acids react with metals (H₂ produced), metal carbonates (CO₂ produced), bases (neutralisation). Common strong acids: HCl, HNO₃, H₂SO₄. Common strong bases: NaOH, KOH. Weak acids and bases partially ionise. Indicators: change colour at specific pH ranges. Titration: standardised solution of acid/base.",
    "svgKey": "ib-chem-8-acids-bases",
    "landmarks": [
     "Reactions of acids with metals, carbonates, bases",
     "Strong acids (fully ionise)",
     "Weak acids (partial ionisation)",
     "Strong bases (NaOH, KOH)",
     "Neutral, basic, acidic solutions",
     "Indicators (methyl orange, phenolphthalein)",
     "Titration procedure"
    ],
    "examQA": [
     {
      "q": "State the products when HCl reacts with Na₂CO₃.",
      "a": "2HCl(aq) + Na₂CO₃(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g). Products: sodium chloride salt, water and carbon dioxide gas (effervescence observed)."
     },
     {
      "q": "Distinguish between strong and weak acids with an example of each.",
      "a": "Strong acid: completely dissociates in aqueous solution → [H⁺] = [acid]. Example: HCl → H⁺ + Cl⁻ (100%). Weak acid: partially dissociates → equilibrium → [H⁺] < [acid]. Example: CH₃COOH ⇌ CH₃COO⁻ + H⁺ (~1% at 0.1 mol dm⁻³)."
     }
    ],
    "threejs3dFn": "createReactionAnimation('collision')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Acid"
   },
   {
    "id": "8-3-ph-scale",
    "name": "8.3 The pH scale",
    "syllabusRef": "Reactivity 3.1",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "pH = −log[H⁺]. pOH = −log[OH⁻]. pH + pOH = 14 (at 25°C). Kw = [H⁺][OH⁻] = 10⁻¹⁴ at 25°C. Neutral: pH = 7 (equal [H⁺] and [OH⁻]). Acidic: pH < 7; Alkaline: pH > 7. For strong acids/bases: calculate [H⁺] directly.",
    "svgKey": "ib-chem-8-acids-bases",
    "landmarks": [
     "pH = −log[H⁺]",
     "pOH = −log[OH⁻]",
     "Kw = [H⁺][OH⁻] = 10⁻¹⁴ (25°C)",
     "pH + pOH = 14",
     "Neutral pH = 7, acid < 7, alkali > 7",
     "pH of strong acid/base calculations",
     "pH meter and indicators"
    ],
    "examQA": [
     {
      "q": "Calculate the pH of 0.050 mol dm⁻³ HNO₃.",
      "a": "HNO₃ is a strong acid, fully dissociates. [H⁺] = 0.050 mol dm⁻³. pH = −log(0.050) = −log(5×10⁻²) = 2 − log 5 ≈ 1.30."
     },
     {
      "q": "Calculate the pH of 0.010 mol dm⁻³ NaOH.",
      "a": "NaOH is a strong base, fully dissociates. [OH⁻] = 0.010 mol dm⁻³. pOH = −log(0.010) = 2. pH = 14 − pOH = 14 − 2 = 12."
     }
    ],
    "threejs3dFn": "createParticleStates",
    "wikiUrl": "https://en.wikipedia.org/wiki/PH"
   },
   {
    "id": "8-4-strong-weak-acids",
    "name": "8.4 Strong and weak acids and bases",
    "syllabusRef": "Reactivity 3.1",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "Weak acid HA ⇌ H⁺ + A⁻. Ka = [H⁺][A⁻]/[HA]. pKa = −log Ka. Buffer solutions resist pH change: contains weak acid and its conjugate base (or weak base + conjugate acid). Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]).",
    "svgKey": "ib-chem-8-acids-bases",
    "landmarks": [
     "Ka (acid dissociation constant)",
     "pKa = −log Ka",
     "Weak acid calculation: [H⁺] = √(Ka × c)",
     "Buffer solution (weak acid + conjugate base)",
     "Buffer action (adding acid or base)",
     "Henderson-Hasselbalch equation (HL)",
     "Blood buffer (H₂CO₃/HCO₃⁻)"
    ],
    "examQA": [
     {
      "q": "Calculate pH of 0.10 mol dm⁻³ ethanoic acid (Ka = 1.8×10⁻⁵ mol dm⁻³).",
      "a": "CH₃COOH ⇌ H⁺ + CH₃COO⁻. Ka = [H⁺]²/0.10 (assuming small dissociation). [H⁺] = √(1.8×10⁻⁵ × 0.10) = √(1.8×10⁻⁶) = 1.34×10⁻³. pH = −log(1.34×10⁻³) ≈ 2.87."
     },
     {
      "q": "Explain how a buffer resists pH change when acid is added.",
      "a": "Buffer (e.g. CH₃COOH / CH₃COO⁻): When H⁺ added → reacts with conjugate base: H⁺ + CH₃COO⁻ → CH₃COOH. [H⁺] consumed → pH changes very little. The weak acid concentration increases and conjugate base decreases, but ratio stays similar."
     }
    ],
    "threejs3dFn": "createReactionAnimation('energetic')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Buffer_solution"
   },
   {
    "id": "8-5-acid-deposition",
    "name": "8.5 Acid deposition",
    "syllabusRef": "not on the current IB guide",
    "section": "Withdrawn from the current IB guide (first assessment 2025)",
    "description": "Acid deposition: SO₂ and NOₓ (from combustion) dissolved in rain to form H₂SO₄ and HNO₃. pH < 5.6. Effects: lakes become acidic (kills fish), leaches soil nutrients, damages buildings (CaCO₃), kills conifer forests. Solutions: catalytic converters, flue gas desulfurisation, low-sulfur fuels.",
    "svgKey": "ib-chem-8-acids-bases",
    "landmarks": [
     "Sources of SO₂ (coal burning, volcanoes)",
     "Sources of NOₓ (lightning, vehicle engines)",
     "SO₂ + H₂O → H₂SO₃; 2SO₂ + O₂ + 2H₂O → 2H₂SO₄",
     "pH of acid rain < 5.6",
     "Effects on lakes, soil, buildings, forests",
     "Catalytic converters (NOₓ → N₂)",
     "Flue gas desulfurisation (CaO + SO₂)"
    ],
    "examQA": [
     {
      "q": "Explain how sulfur dioxide causes acid deposition.",
      "a": "SO₂ (from fossil fuel combustion) dissolves in rainwater: SO₂ + H₂O → H₂SO₃. Oxidation by O₂: 2SO₂ + O₂ + 2H₂O → 2H₂SO₄. Sulfuric acid dissociates fully → lowers pH of precipitation to < 5.6. This acidic rain damages aquatic and terrestrial ecosystems."
     },
     {
      "q": "State two environmental effects of acid deposition.",
      "a": "1. Lake acidification: H⁺ leaches Al³⁺ from soil into lakes; Al³⁺ is toxic to fish; organisms die. 2. Building damage: acid dissolves CaCO₃ in limestone/marble buildings: CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂. Also: soil nutrient depletion; forest damage."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Acid_rain"
   },
   {
    "id": "9-1-oxidation-reduction",
    "name": "9.1 Oxidation and reduction",
    "syllabusRef": "Reactivity 3.2",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "Oxidation: loss of electrons (OIL); increase in oxidation state. Reduction: gain of electrons (RIG); decrease in oxidation state. Oxidising agent: gains electrons (oxidises the other species). Reducing agent: loses electrons. Oxidation states: rules for assigning. Redox reactions: balanced using half-equations.",
    "svgKey": "ib-chem-9-redox",
    "landmarks": [
     "OIL RIG (oxidation is loss, reduction is gain)",
     "Oxidation state rules",
     "Oxidising agent (gains e⁻, reduced)",
     "Reducing agent (loses e⁻, oxidised)",
     "Half-equations (oxidation + reduction)",
     "Balancing redox equations",
     "Disproportionation"
    ],
    "examQA": [
     {
      "q": "Assign oxidation states in H₂SO₄ and identify any rules used.",
      "a": "H = +1 (known). O = −2 (known). H₂SO₄: 2(+1) + S + 4(−2) = 0. 2 + S − 8 = 0. S = +6. Rules: H is +1 in compounds; O is −2 in compounds; sum of oxidation states = charge on species (0 for neutral molecule)."
     },
     {
      "q": "Construct the overall equation for: Zn→Zn²⁺+2e⁻ and Cu²⁺+2e⁻→Cu.",
      "a": "Add the two half-equations: Zn → Zn²⁺ + 2e⁻ (oxidation). Cu²⁺ + 2e⁻ → Cu (reduction). Electrons cancel: Zn + Cu²⁺ → Zn²⁺ + Cu. Zinc is oxidised (reducing agent); copper ion is reduced (oxidising agent)."
     }
    ],
    "threejs3dFn": "createReactionAnimation('collision')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Redox"
   },
   {
    "id": "9-2-electrochemical-cells",
    "name": "9.2 Electrochemical cells",
    "syllabusRef": "Reactivity 3.2",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "Electrolytic cells: non-spontaneous redox reaction driven by external electricity. Electrodes: anode (oxidation), cathode (reduction). Electrolysis of NaCl(aq): Cl₂ at anode, H₂ at cathode, NaOH in solution. Faraday's laws: charge Q = It; moles of product = Q/(nF). Galvanic (voltaic) cells (SL awareness): spontaneous redox produces EMF.",
    "svgKey": "ib-chem-9-redox",
    "landmarks": [
     "Electrolytic cell (external power)",
     "Anode: oxidation; cathode: reduction",
     "Anion → anode; cation → cathode",
     "Electrolysis of water → H₂ + O₂",
     "Electrolysis of brine → Cl₂, H₂, NaOH",
     "Faraday's laws (Q = It)",
     "Moles e⁻ = Q/F; F = 96500 C mol⁻¹"
    ],
    "examQA": [
     {
      "q": "Identify the products at each electrode during electrolysis of dilute sulfuric acid.",
      "a": "Cathode (reduction): 2H⁺ + 2e⁻ → H₂(g). Anode (oxidation): 2H₂O → O₂(g) + 4H⁺ + 4e⁻. Volume ratio H₂:O₂ = 2:1. Net: 2H₂O → 2H₂ + O₂."
     },
     {
      "q": "Calculate mass of copper deposited when 0.50 A passed for 30 min. (M(Cu)=63.5, F=96500).",
      "a": "Q = It = 0.50 × 30 × 60 = 900 C. Moles of e⁻ = 900/96500 = 9.33×10⁻³ mol. Cu²⁺ + 2e⁻ → Cu: mol Cu = 9.33×10⁻³/2 = 4.66×10⁻³ mol. Mass = 4.66×10⁻³ × 63.5 = 0.296 g."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Electrochemistry"
   },
   {
    "id": "10-1-fundamentals-organic",
    "name": "10.1 Fundamentals of organic chemistry",
    "syllabusRef": "Structure 3.2",
    "section": "Structure 3. Classification of matter",
    "description": "Homologous series: compounds differing by CH₂. Functional groups determine chemical properties. Nomenclature (IUPAC): longest carbon chain, prefix for substituents. Structural isomers: same molecular formula, different structural formula. Types: chain, position, functional group isomers. Stereoisomers: cis-trans (geometric), optical.",
    "svgKey": "ib-chem-10-organic",
    "landmarks": [
     "Homologous series",
     "Functional groups (alkene, alcohol, aldehyde, ketone, acid, amine, ester, amide)",
     "IUPAC nomenclature",
     "Structural isomerism (chain, position, functional group)",
     "Cis-trans isomerism (geometric)",
     "Optical isomerism (chiral centre)",
     "Degree of unsaturation"
    ],
    "examQA": [
     {
      "q": "Define structural isomers and give an example.",
      "a": "Structural isomers have the same molecular formula but different structural formulas (connectivity). Example: C₄H₁₀ → butane (n-butane, straight chain) and methylpropane (branched). They have different physical properties (different boiling points) but similar general chemical reactivity."
     },
     {
      "q": "Name the following compound: CH₃CH₂CH(CH₃)CH₂CH₃.",
      "a": "Longest chain = 5 carbons (pentane). Methyl substituent at C3. Name: 3-methylpentane."
     }
    ],
    "threejs3dFn": "createMolecule('benzene')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Organic_chemistry"
   },
   {
    "id": "10-2-functional-group-chemistry",
    "name": "10.2 Functional group chemistry",
    "syllabusRef": "Reactivity 3.4",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "Alkanes: substitution (halogenation by UV). Alkenes: addition reactions (HX, X₂, H₂O, H₂). Test: decolourise bromine water. Alcohols: oxidation, esterification. Condensation polymerisation: nylon-6,6 from a diamine + a dicarboxylic acid, or nylon-6 from a single amino acid/lactam monomer; polyesters from a diol + a dicarboxylic acid. Addition polymerisation: alkenes → polyalkenes.",
    "svgKey": "ib-chem-10-organic",
    "landmarks": [
     "Alkane + Cl₂/UV → chloroalkane + HCl",
     "Alkene + Br₂ → dibromoalkane (addition)",
     "Markovnikov's rule (+ HX)",
     "Alcohol oxidation (primary → aldehyde → acid)",
     "Esterification (acid + alcohol ⇌ ester + H₂O)",
     "Addition polymerisation (alkenes)",
     "Condensation polymerisation (nylon, polyester)"
    ],
    "examQA": [
     {
      "q": "Describe the test for an alkene using bromine water.",
      "a": "Add bromine water (orange/brown) to the unknown compound. If it is an alkene, bromine adds across the C=C double bond (electrophilic addition): CH₂=CH₂ + Br₂ → BrCH₂CH₂Br. Bromine water is decolourised to colourless."
     },
     {
      "q": "Write the equation for esterification of ethanol with ethanoic acid.",
      "a": "CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O. Catalyst: concentrated H₂SO₄. Product: ethyl ethanoate (ester). Reversible reaction; equilibrium establishes. Yield improved by removing water or using excess of one reagent."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Functional_group"
   },
   {
    "id": "11-1-uncertainties-errors",
    "name": "11.1 Uncertainties and errors",
    "syllabusRef": "not on the current IB guide",
    "section": "Withdrawn from the current IB guide (first assessment 2025)",
    "description": "Absolute uncertainty: ± half the smallest division. Percentage uncertainty: (absolute/measured) × 100. Addition/subtraction: add absolute uncertainties. Multiplication/division: add percentage uncertainties. Powers: multiply % uncertainty by power. Random vs systematic errors. Accuracy vs precision.",
    "svgKey": "ib-chem-11-measurement",
    "landmarks": [
     "Absolute uncertainty (± half division)",
     "Percentage uncertainty",
     "Propagation: add absolute (±)",
     "Propagation: add % (× or ÷)",
     "Random error (precision)",
     "Systematic error (accuracy)",
     "Significant figures",
     "Error bars on graphs"
    ],
    "examQA": [
     {
      "q": "A student records T=25.0±0.5°C and V=50.0±0.5 cm³. Calculate % uncertainty in V/T.",
      "a": "%unc(T) = 0.5/25.0×100 = 2.0%. %unc(V) = 0.5/50.0×100 = 1.0%. %unc(V/T) = 2.0 + 1.0 = 3.0%."
     },
     {
      "q": "Distinguish between random and systematic errors.",
      "a": "Random error: unpredictable fluctuations (scatter around true value); reduces precision; minimised by repeating and averaging. Systematic error: consistent offset in one direction; reduces accuracy; cannot be eliminated by repetition — source must be identified and corrected."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Measurement_uncertainty"
   },
   {
    "id": "11-2-graphical-techniques",
    "name": "11.2 Graphical techniques",
    "syllabusRef": "not on the current IB guide",
    "section": "Withdrawn from the current IB guide (first assessment 2025)",
    "description": "Scatter graphs with lines/curves of best fit. Gradient = change in y/change in x (using large triangle). Y-intercept from graph or equation. R² value: correlation strength. Linearising: if y = kxⁿ → log y = log k + n log x. Error bars on graphs; range of best fit line gradients gives uncertainty in gradient.",
    "svgKey": "ib-chem-11-measurement",
    "landmarks": [
     "Line/curve of best fit",
     "Gradient calculation (large triangle)",
     "Y-intercept",
     "Interpreting straight-line graphs",
     "Linearising non-linear data (log-log)",
     "Error bars on axes",
     "Gradient uncertainty"
    ],
    "examQA": [
     {
      "q": "Explain how to determine the gradient of a straight-line graph.",
      "a": "Choose two widely-spaced points ON the line of best fit (not data points). Draw a large right-angle triangle. Gradient = Δy/Δx (vertical change/horizontal change). Include units. If the line does not pass through origin, read y-intercept where x = 0."
     },
     {
      "q": "Explain why plotting log(rate) against log[A] can determine the order of a reaction.",
      "a": "If rate = k[A]ⁿ, then log(rate) = log k + n log[A]. This is a linear equation (y = c + mx). Plotting log(rate) vs log[A] gives a straight line with gradient n (order of reaction with respect to A) and y-intercept log k."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Graphing"
   },
   {
    "id": "11-3-spectroscopic-id",
    "name": "11.3 Spectroscopic identification",
    "syllabusRef": "Structure 3.2",
    "section": "Structure 3. Classification of matter",
    "description": "Mass spectrometry: molecular ion peak (M⁺) = relative molecular mass. Fragment ions identify structure. IR spectroscopy: absorption at characteristic wavenumbers identifies functional groups (O-H, N-H, C=O). ¹H NMR (HL): chemical shift identifies environment; integration = relative H count; splitting pattern (n+1 rule).",
    "svgKey": "ib-chem-11-3-spectroscopic",
    "landmarks": [
     "Mass spectrometry: M⁺ peak = Mr",
     "Fragment ions (m/z values)",
     "IR absorption: O-H (2500-3300 broad)",
     "C=O (1700-1750)",
     "N-H (3300-3500)",
     "¹H NMR: chemical shift (environment)",
     "Integration (ratio of H)",
     "Splitting (n+1 rule): singlet, doublet, triplet"
    ],
    "examQA": [
     {
      "q": "A molecule has an IR absorption at 1720 cm⁻¹ and a broad peak at 2500–3300 cm⁻¹. What functional group is present?",
      "a": "The peak at 1720 cm⁻¹ is characteristic of C=O (carbonyl) stretch. The broad peak at 2500–3300 cm⁻¹ is characteristic of O-H in a carboxylic acid group. Together they indicate a carboxylic acid (COOH) functional group."
     },
     {
      "q": "Describe how mass spectrometry identifies the molecular formula of an organic compound.",
      "a": "The molecular ion peak (M⁺) in the mass spectrum gives the relative molecular mass. High-resolution mass spectrometry gives exact mass → molecular formula can be deduced. Fragment ion patterns (fragmentation) help identify structural features and connectivity of groups."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Spectroscopy"
   },
   {
    "id": "12-1-electrons-atoms",
    "name": "12.1 Electrons in atoms",
    "syllabusRef": "Structure 1.3",
    "section": "Structure 1. Models of the particulate nature of matter",
    "description": "Heisenberg uncertainty principle: cannot know exact position and momentum of electron simultaneously. Atomic orbitals: probability distributions (s, p, d, f). Shapes: s = sphere; p = dumbbell (3 orientations); d = 4-lobed (5 orientations). Quantum numbers n, l, ml, ms. Electron spin states (+½, −½).",
    "svgKey": "ib-chem-12-atomic-advanced",
    "landmarks": [
     "Heisenberg uncertainty principle",
     "Atomic orbitals (probability density)",
     "s orbital (spherical)",
     "p orbitals (3: px, py, pz)",
     "d orbitals (5 orientations)",
     "Quantum numbers n, l, ml, ms",
     "Electron spin (+½, −½)",
     "Photoelectron spectroscopy"
    ],
    "examQA": [
     {
      "q": "Describe the shapes of s and p orbitals.",
      "a": "s orbital: spherical (one per shell); electron probability density highest at nucleus, decreases with distance. p orbitals: dumbbell-shaped, with node at nucleus; three degenerate p orbitals (px, py, pz) oriented at 90° to each other. Node = region of zero electron probability."
     },
     {
      "q": "State the four quantum numbers and what each represents.",
      "a": "n (principal): shell/energy level (1,2,3...). l (angular momentum): subshell shape (0=s, 1=p, 2=d, 3=f; l < n). ml (magnetic): orbital orientation (−l to +l). ms (spin): electron spin (+½ or −½). Pauli: no two electrons have all four quantum numbers identical."
     }
    ],
    "threejs3dFn": "createOrbital",
    "wikiUrl": "https://en.wikipedia.org/wiki/Atomic_orbital"
   },
   {
    "id": "13-1-d-block-elements",
    "name": "13.1 First row d-block elements",
    "syllabusRef": "Structure 3.1",
    "section": "Structure 3. Classification of matter",
    "description": "First-row d-block elements are Sc\u2013Zn, but a transition element is one whose atoms or common ions have a partially filled d subshell \u2014 so Zn (3d\u00b9\u2070 in both Zn and Zn\u00b2\u207a) is a d-block element but not a transition element. Properties: variable oxidation states, coloured ions (d-d transitions), catalytic activity, form complex ions (coordination compounds). Ligands: molecules/ions that donate lone pairs to central metal ion. Coordination number: number of ligand donor atoms.",
    "svgKey": "ib-chem-13-periodicity-advanced",
    "landmarks": [
     "Partially filled d subshell (definition)",
     "Variable oxidation states",
     "Coloured compounds (d-d transitions)",
     "Catalytic activity",
     "Complex ion (central metal + ligands)",
     "Ligands (electron pair donors)",
     "Coordination number",
     "[Fe(H₂O)₆]³⁺, [Cu(NH₃)₄]²⁺ examples"
    ],
    "examQA": [
     {
      "q": "Explain why transition metal ions are coloured.",
      "a": "Ligands split the d orbitals into two energy levels. An electron can absorb a photon of visible light with exactly the right energy to move from lower to upper d level (d-d transition). The complementary colour to the absorbed wavelength is transmitted/reflected → ion appears coloured. Example: [Ti(H₂O)₆]³⁺ absorbs yellow-green → appears purple."
     },
     {
      "q": "State two characteristic properties of transition metals.",
      "a": "1. Variable oxidation states: can form compounds with different oxidation states (e.g. Fe²⁺ and Fe³⁺) because d and s electrons have similar energies. 2. Catalytic activity: variable oxidation states allow electron transfer with reactants; large surface area when solid."
     }
    ],
    "threejs3dFn": "createOrbital",
    "wikiUrl": "https://en.wikipedia.org/wiki/Transition_metal"
   },
   {
    "id": "13-2-coloured-complexes",
    "name": "13.2 Coloured complexes",
    "syllabusRef": "Structure 3.1",
    "section": "Structure 3. Classification of matter",
    "description": "Crystal field theory: ligands are modelled as point charges that repel d electrons differently depending on geometry. Octahedral field: d orbitals split into t₂g (lower, 3) and eg (higher, 2). Crystal field splitting energy Δ depends on ligand strength (spectrochemical series). Colour explained by d-d transitions; high-spin vs low-spin.",
    "svgKey": "ib-chem-13-periodicity-advanced",
    "landmarks": [
     "Crystal field theory",
     "Octahedral splitting (t₂g, eg)",
     "Crystal field splitting energy Δ",
     "Spectrochemical series (CN⁻ > NH₃ > H₂O > Cl⁻)",
     "High-spin vs low-spin",
     "Colour: complementary to absorbed light",
     "Beer-Lambert law: A = εcl"
    ],
    "examQA": [
     {
      "q": "Explain why [Fe(CN)₆]³⁻ has different colour from [Fe(H₂O)₆]³⁺.",
      "a": "CN⁻ is a strong-field ligand (high in spectrochemical series) → large Δ → absorbs higher energy (shorter wavelength) light → appears a different colour. H₂O is a weaker-field ligand → smaller Δ → absorbs lower energy (longer wavelength) light. Different Δ → different wavelengths absorbed → different colours."
     },
     {
      "q": "Define the spectrochemical series.",
      "a": "An ordering of ligands by their ability to split the d orbital energy levels (Δ). Strong-field ligands (CO, CN⁻) cause large splitting; weak-field ligands (I⁻, Cl⁻) cause small splitting. Order: CO > CN⁻ > NO₂⁻ > en > NH₃ > H₂O > OH⁻ > F⁻ > Cl⁻ > Br⁻ > I⁻."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Crystal_field_theory"
   },
   {
    "id": "14-1-covalent-bonding-advanced",
    "name": "14.1 Further aspects of covalent bonding",
    "syllabusRef": "Structure 2.2",
    "section": "Structure 2. Models of bonding and structure",
    "description": "Formal charge: indicates electron distribution within Lewis structure. Resonance structures: delocalised electrons spread over multiple bonds. Molecular orbital theory: bonding (σ, π) and anti-bonding (σ*, π*) MOs. Bond order = (bonding e⁻ − anti-bonding e⁻)/2. Expanded octets: elements in Period 3+ can use d orbitals.",
    "svgKey": "ib-chem-14-bonding-advanced",
    "landmarks": [
     "Formal charge calculation",
     "Resonance structures (benzene, NO₃⁻, O₃)",
     "Delocalisation (pi electrons)",
     "Molecular orbital theory",
     "Bonding (σ, π) vs antibonding (σ*, π*) MOs",
     "Bond order from MO theory",
     "Expanded octet (PCl₅, SF₆)",
     "VSEPR for 5- and 6-coordinate species"
    ],
    "examQA": [
     {
      "q": "Explain resonance using ozone (O₃) as an example.",
      "a": "O₃ cannot be represented by a single Lewis structure. Two equivalent structures can be drawn with the double bond alternating between the two O-O positions. The real molecule has both O-O bonds intermediate in length (128 pm; between O-O=148 pm and O=O=121 pm). Electrons are delocalised over all three atoms → resonance hybrid."
     },
     {
      "q": "Define formal charge and state its significance.",
      "a": "Formal charge = (valence electrons) − (non-bonding electrons) − ½(bonding electrons). Sum of formal charges = overall charge on molecule/ion. The most stable Lewis structure has formal charges closest to zero on all atoms and negative formal charge on the most electronegative atom."
     }
    ],
    "threejs3dFn": "createOrbital",
    "wikiUrl": "https://en.wikipedia.org/wiki/Covalent_bond"
   },
   {
    "id": "14-2-hybridisation",
    "name": "14.2 Hybridisation",
    "syllabusRef": "Structure 2.2",
    "section": "Structure 2. Models of bonding and structure",
    "description": "Hybridisation: mixing of atomic orbitals to form hybrid orbitals for σ-bonds. sp³ (tetrahedral, 109.5°, e.g. CH₄), sp² (trigonal planar, 120°, e.g. C₂H₄, unhybridised p = π-bond), sp (linear, 180°, e.g. C₂H₂, two unhybridised p = two π-bonds). d orbital hybridisation: sp³d (trigonal bipyramidal), sp³d² (octahedral).",
    "svgKey": "ib-chem-14-bonding-advanced",
    "landmarks": [
     "sp³ hybridisation (tetrahedral)",
     "sp² hybridisation (trigonal planar)",
     "sp hybridisation (linear)",
     "Unhybridised p orbitals → π bonds",
     "σ-bond (head-on overlap)",
     "π-bond (sideways p overlap)",
     "sp³d (trigonal bipyramidal)",
     "sp³d² (octahedral)"
    ],
    "examQA": [
     {
      "q": "Explain the hybridisation of carbon in ethene (C₂H₄).",
      "a": "Each C in C₂H₄ is sp² hybridised: 2s + two 2p orbitals combine → three sp² orbitals (120°, trigonal planar). These form σ-bonds with 3 atoms (2 H + 1 C). One unhybridised 2p orbital on each C remains. The two 2p orbitals overlap sideways → one π-bond above and below the C-C axis. Result: C=C (one σ + one π bond)."
     },
     {
      "q": "Compare sp, sp² and sp³ hybridisation.",
      "a": "sp³: mixes s + 3p → 4 equivalent hybrid orbitals → tetrahedral (109.5°) → all σ-bonds (e.g. CH₄). sp²: mixes s + 2p → 3 hybrids → trigonal planar (120°) → 1 unhybridised p → 1 π-bond (e.g. C₂H₄). sp: mixes s + 1p → 2 hybrids → linear (180°) → 2 unhybridised p → 2 π-bonds (e.g. C₂H₂)."
     }
    ],
    "threejs3dFn": "createOrbital",
    "wikiUrl": "https://en.wikipedia.org/wiki/Orbital_hybridisation"
   },
   {
    "id": "15-1-energy-cycles",
    "name": "15.1 Energy cycles",
    "syllabusRef": "Reactivity 1.2",
    "section": "Reactivity 1. What drives chemical reactions?",
    "description": "Born-Haber cycles apply Hess's law to ionic compound formation. Steps: atomisation of metal, atomisation of non-metal, ionisation energy of metal, electron affinity of non-metal, lattice enthalpy. Standard enthalpy of solution: ΔHsol = lattice enthalpy + hydration enthalpies.",
    "svgKey": "ib-chem-15-energetics-advanced",
    "landmarks": [
     "Born-Haber cycle",
     "Lattice enthalpy (ΔHlatt, endothermic definition)",
     "Ionisation energy (ΔHie)",
     "Electron affinity (ΔHea)",
     "Atomisation enthalpy",
     "ΔHsol = ΔHlatt + ΔHhyd",
     "Factors affecting lattice enthalpy (charge, size)"
    ],
    "examQA": [
     {
      "q": "Draw and use a Born-Haber cycle to calculate the lattice enthalpy of NaCl.",
      "a": "Use the examiner's correction, but add the reconciliation a marker expects: \"\u0394Hf\u00b0(NaCl) = \u0394Hatom(Na) + \u0394Hatom(Cl) + \u0394Hie1(Na) + \u0394Hea(Cl) \u2212 \u0394Hlatt(NaCl), so \u0394Hlatt = \u0394Hatom(Na) + \u0394Hatom(Cl) + \u0394Hie1(Na) + \u0394Hea(Cl) \u2212 \u0394Hf\u00b0 = 107 + 121 + 496 + (\u2212349) \u2212 (\u2212411) = +786 kJ mol\u207b\u00b9. Lattice enthalpy in IB is the enthalpy change when 1 mol of ionic solid dissociates into gaseous ions, so it is always endothermic (positive); the small difference from the data booklet value (+790) reflects experimental vs Born\u2013Haber determination.\""
     },
     {
      "q": "Explain why MgO has a larger lattice enthalpy than NaCl.",
      "a": "Lattice enthalpy depends on ionic charges and radii. Mg²⁺ and O²⁻ both have double charges; greater electrostatic attraction between ions. Mg²⁺ is also smaller than Na⁺, and O²⁻ slightly smaller than Cl⁻. Combined charge × charge/sum of radii → much greater lattice enthalpy for MgO vs NaCl."
     }
    ],
    "threejs3dFn": "createEnergyTransfer",
    "wikiUrl": "https://en.wikipedia.org/wiki/Born%E2%80%93Haber_cycle"
   },
   {
    "id": "15-2-entropy-spontaneity",
    "name": "15.2 Entropy and spontaneity",
    "syllabusRef": "Reactivity 1.4",
    "section": "Reactivity 1. What drives chemical reactions?",
    "description": "Entropy S: measure of disorder/dispersal of energy. ΔS positive when: solids → liquids/gases; dissolving; increasing temperature; mixing. Second law: total entropy of universe increases for spontaneous processes. Gibbs free energy ΔG = ΔH − TΔS. Spontaneous: ΔG < 0. At equilibrium: ΔG = 0.",
    "svgKey": "ib-chem-15-energetics-advanced",
    "landmarks": [
     "Entropy S (disorder/energy dispersal)",
     "ΔS > 0: solid → liquid → gas",
     "ΔS > 0: more particles (dissolution)",
     "ΔG = ΔH − TΔS",
     "Spontaneous: ΔG < 0",
     "Non-spontaneous: ΔG > 0",
     "At equilibrium: ΔG = 0",
     "Temperature effects on spontaneity"
    ],
    "examQA": [
     {
      "q": "Predict the sign of ΔS for: CaCO₃(s) → CaO(s) + CO₂(g).",
      "a": "ΔS > 0 (positive). \"A gas (CO\u2082) is released from a solid reactant.\" \u2014 avoids the examiner's \"single solid reactant\" phrasing, which could be misread as implying the products contain no solid. Gases have much higher entropy than solids. The number of particles increases. Entropy increases."
     },
     {
      "q": "Calculate ΔG at 298 K for a reaction with ΔH = −100 kJ and ΔS = +200 J K⁻¹.",
      "a": "ΔG = ΔH − TΔS. Note units: ΔS in kJ K⁻¹ = 0.200 kJ K⁻¹. ΔG = −100 − (298 × 0.200) = −100 − 59.6 = −159.6 kJ mol⁻¹. ΔG < 0 → spontaneous."
     }
    ],
    "threejs3dFn": "createParticleStates",
    "wikiUrl": "https://en.wikipedia.org/wiki/Gibbs_free_energy"
   },
   {
    "id": "16-1-rate-expression",
    "name": "16.1 Rate expression and reaction mechanism",
    "syllabusRef": "Reactivity 2.2",
    "section": "Reactivity 2. How much, how fast and how far?",
    "description": "Rate equation: rate = k[A]ⁿ[B]ᵐ. Determined experimentally (not from equation). Orders: 0 (rate independent of [A]), 1 (linear), 2 (square). Overall order = n+m. Units of k depend on order. Mechanism: elementary steps (molecularity). Rate-determining step (slowest step).",
    "svgKey": "ib-chem-16-kinetics-advanced",
    "landmarks": [
     "Rate = k[A]ⁿ[B]ᵐ (rate equation)",
     "Order from experiment (not equation)",
     "Units of k: depend on order",
     "Overall order = sum of exponents",
     "Rate-determining step (slow step)",
     "Mechanism and elementary steps",
     "Molecularity (unimolecular, bimolecular)",
     "Intermediate vs transition state"
    ],
    "examQA": [
     {
      "q": "Determine the rate equation from initial rate data: doubling [A] doubles rate; doubling [B] quadruples rate.",
      "a": "Rate ∝ [A]¹: order 1 with respect to A. Rate ∝ [B]²: order 2 with respect to B. Rate equation: rate = k[A][B]². Overall order = 1 + 2 = 3 (third order)."
     },
     {
      "q": "Explain how a rate-determining step affects the rate equation.",
      "a": "The rate-determining step (RDS) is the slowest step. Its molecularity determines the rate equation: rate = k × [species in RDS]. Species formed in earlier fast steps that are intermediates may appear if RDS uses them. Species appearing after the RDS don't appear in the rate equation."
     }
    ],
    "threejs3dFn": "createReactionAnimation('collision')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Rate_equation"
   },
   {
    "id": "16-2-activation-energy-hl",
    "name": "16.2 Activation energy",
    "syllabusRef": "Reactivity 2.2",
    "section": "Reactivity 2. How much, how fast and how far?",
    "description": "Arrhenius equation: k = Ae^(−Ea/RT). Taking ln: ln k = ln A − Ea/RT. Plot ln k vs 1/T → straight line: gradient = −Ea/R. A (frequency factor): accounts for collision frequency and orientation. At higher T: more molecules exceed Ea exponentially → rate increases.",
    "svgKey": "ib-chem-16-kinetics-advanced",
    "landmarks": [
     "Arrhenius equation: k = Ae^(−Ea/RT)",
     "ln k = ln A − Ea/RT",
     "Graph: ln k vs 1/T (gradient = −Ea/R)",
     "Frequency factor A",
     "Ea from experimental rate data",
     "Effect of T on k (exponential)",
     "Catalyst: lower Ea → higher k at same T"
    ],
    "examQA": [
     {
      "q": "A graph of ln k against 1/T has gradient −8000 K. Calculate Ea.",
      "a": "Gradient = −Ea/R. Ea = −gradient × R = 8000 × 8.314 = 66,512 J mol⁻¹ ≈ 66.5 kJ mol⁻¹."
     },
     {
      "q": "Explain how the Arrhenius equation shows that a small increase in temperature greatly increases rate.",
      "a": "k = Ae^(−Ea/RT). As T increases, −Ea/RT becomes less negative → e^(−Ea/RT) increases exponentially → k increases exponentially. For typical Ea (~50 kJ mol⁻¹), a 10°C rise (~298→308 K) roughly doubles k because the exponential term changes significantly."
     }
    ],
    "threejs3dFn": "createReactionAnimation('energetic')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Arrhenius_equation"
   },
   {
    "id": "17-1-equilibrium-law-hl",
    "name": "17.1 The equilibrium law",
    "syllabusRef": "Reactivity 2.3",
    "section": "Reactivity 2. How much, how fast and how far?",
    "description": "Kp: equilibrium constant in terms of partial pressures. Kp = Kc(RT)^Δn where Δn = moles of gas products − moles of gas reactants. Relationship between Kc and ΔG°: ΔG° = −RT ln K. If ΔG° < 0, K > 1 (products favoured). Temperature effect on K: if ΔH < 0 (exothermic), increasing T decreases K.",
    "svgKey": "ib-chem-17-equilibrium-advanced",
    "landmarks": [
     "Kp (partial pressure expression)",
     "Partial pressure = mole fraction × P_total",
     "Kp = Kc(RT)^Δn",
     "Relationship ΔG° = −RT ln K",
     "K > 1 → ΔG° < 0 (products favoured)",
     "Temperature increases K if ΔH > 0",
     "van't Hoff equation (ln K vs 1/T)"
    ],
    "examQA": [
     {
      "q": "Write the Kp expression for N₂(g)+3H₂(g)⇌2NH₃(g).",
      "a": "Kp = P(NH₃)²/ [P(N₂) × P(H₂)³]. Units: Pa²/(Pa×Pa³) = Pa⁻². All pressures in Pa or bar (consistent)."
     },
     {
      "q": "Explain why increasing temperature decreases Kc for an exothermic reaction.",
      "a": "For exothermic reaction: ΔG° = ΔH° − TΔS°. As T increases, ΔG° becomes more positive (less negative) if ΔH° < 0 and ΔS° is negative, or the TΔS° term dominates. Using ΔG° = −RT ln K: more positive ΔG° → smaller K. Thermodynamically, increased T favours the endothermic direction (reverse reaction), reducing product concentration."
     }
    ],
    "threejs3dFn": "createReactionAnimation('energetic')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Equilibrium_constant"
   },
   {
    "id": "18-1-lewis-acids-bases",
    "name": "18.1 Lewis acids and bases",
    "syllabusRef": "Reactivity 3.4",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "Lewis acid: electron pair acceptor. Lewis base: electron pair donor. Brønsted-Lowry acids are Lewis acids; all Lewis acids are not necessarily Brønsted-Lowry acids. BF₃ is a Lewis acid (accepts lone pair). Metal ions form coordinate bonds with ligands (Lewis base-acid interaction). Amphoteric oxides.",
    "svgKey": "ib-chem-18-acids-bases-advanced",
    "landmarks": [
     "Lewis acid: e⁻ pair acceptor",
     "Lewis base: e⁻ pair donor",
     "BF₃ + NH₃ → BF₃·NH₃ (Lewis)",
     "Metal ions as Lewis acids",
     "Ligands as Lewis bases",
     "Comparison with Brønsted-Lowry",
     "Amphoteric oxides (Al₂O₃, ZnO)"
    ],
    "examQA": [
     {
      "q": "Identify the Lewis acid and Lewis base in: BF₃ + F⁻ → BF₄⁻.",
      "a": "F⁻ donates a lone pair to BF₃ → F⁻ is the Lewis base. BF₃ accepts the lone pair (B has only 6 electrons, incomplete octet) → BF₃ is the Lewis acid. Product BF₄⁻: B now has 8 electrons (complete octet)."
     },
     {
      "q": "Explain why Al₂O₃ is amphoteric.",
      "a": "Al₂O₃ reacts with acids (acts as a base: Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O) and with strong bases (acts as an acid: Al₂O₃ + 2NaOH + 3H₂O → 2Na[Al(OH)₄]). It can donate or accept electron pairs, hence amphoteric."
     }
    ],
    "threejs3dFn": "createReactionAnimation('collision')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Lewis_acids_and_bases"
   },
   {
    "id": "18-2-acid-base-calculations",
    "name": "18.2 Calculations involving acids and bases",
    "syllabusRef": "Reactivity 3.1",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "Ka and Kb expressions. pKa + pKb = 14 (for conjugate pair at 25°C). Weak acid: [H⁺] = √(Ka × c) if Ka << c. pH of buffer: Henderson-Hasselbalch pH = pKa + log([A⁻]/[HA]). Salt hydrolysis: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻ (alkaline solution).",
    "svgKey": "ib-chem-18-acids-bases-advanced",
    "landmarks": [
     "Ka and Kb definitions",
     "pKa + pKb = 14 (conjugate pair)",
     "Weak acid pH: [H⁺] = √(Ka·c)",
     "Buffer pH: Henderson-Hasselbalch",
     "Buffer capacity",
     "Salt hydrolysis (acidic/alkaline salts)",
     "Amphiprotic species (HSO₄⁻, HCO₃⁻)"
    ],
    "examQA": [
     {
      "q": "Calculate pH of 0.10 mol dm⁻³ ammonia (Kb = 1.8×10⁻⁵).",
      "a": "NH₃ + H₂O ⇌ NH₄⁺ + OH⁻. Kb = [OH⁻]²/0.10 = 1.8×10⁻⁵. [OH⁻] = √(1.8×10⁻⁶) = 1.34×10⁻³. pOH = 2.87. pH = 14 − 2.87 = 11.13."
     },
     {
      "q": "Explain why a solution of sodium ethanoate (CH₃COONa) is alkaline.",
      "a": "CH₃COO⁻ (from complete dissociation of CH₃COONa) undergoes hydrolysis: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻. CH₃COO⁻ is the conjugate base of a weak acid (Ka = 1.8×10⁻⁵) so it accepts protons readily. OH⁻ produced → pH > 7."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Acid%E2%80%93base_reaction"
   },
   {
    "id": "18-3-ph-curves",
    "name": "18.3 pH curves",
    "syllabusRef": "Reactivity 3.1",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "pH curves for: strong acid + strong base (equivalence at pH 7); weak acid + strong base (equivalence pH > 7); strong acid + weak base (equivalence pH < 7). Buffer region: flat section around pKa ± 1. Indicator choice: pKa of indicator should match equivalence point pH. Half-equivalence point: pH = pKa.",
    "svgKey": "ib-chem-18-acids-bases-advanced",
    "landmarks": [
     "Strong acid / strong base (equiv. pt pH 7)",
     "Weak acid / strong base (equiv. pH > 7)",
     "Strong acid / weak base (equiv. pH < 7)",
     "Buffer region (flat, pKa ± 1)",
     "Half-equivalence point: pH = pKa",
     "Equivalence point (stoichiometric amounts)",
     "Indicator selection (pKa ≈ equivalence pH)"
    ],
    "examQA": [
     {
      "q": "Explain why the equivalence point in a weak acid / strong base titration is above pH 7.",
      "a": "At equivalence, all weak acid (HA) has been converted to its conjugate base (A⁻). A⁻ hydrolyses: A⁻ + H₂O ⇌ HA + OH⁻, producing excess OH⁻. The solution is basic at equivalence. pH > 7. Use phenolphthalein (changes at pH 8–10) not methyl orange (too low)."
     },
     {
      "q": "State what the half-equivalence point indicates.",
      "a": "At the half-equivalence point, half the acid has been neutralised: [HA] = [A⁻]. Henderson-Hasselbalch: pH = pKa + log(1) = pKa. So the pH at the half-equivalence point equals the pKa of the weak acid — a method to determine Ka experimentally."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Titration"
   },
   {
    "id": "19-1-electrochemical-cells-hl",
    "name": "19.1 Electrochemical cells",
    "syllabusRef": "Reactivity 3.2",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "Standard electrode potential E°: measured vs SHE (E°=0) under standard conditions. Cell EMF: E°cell = E°cathode − E°anode. Spontaneous: E°cell > 0 (ΔG < 0). Nernst equation: E = E° − (RT/nF)lnQ. Electrolytic vs galvanic cells. Fuel cells: H₂/O₂ → H₂O + electricity.",
    "svgKey": "ib-chem-9-redox",
    "landmarks": [
     "Standard electrode potential E°",
     "Standard hydrogen electrode (SHE, 0 V)",
     "E°cell = E°cathode − E°anode",
     "Spontaneous cell: E°cell > 0",
     "ΔG° = −nFE°cell",
     "Nernst equation (HL)",
     "Concentration effect on E",
     "Fuel cells (H₂/O₂)"
    ],
    "examQA": [
     {
      "q": "Calculate E°cell for Zn²⁺/Zn (−0.76 V) vs Cu²⁺/Cu (+0.34 V). Identify cathode.",
      "a": "Cu²⁺ + 2e⁻ → Cu (higher E°, reduced) = cathode. Zn → Zn²⁺ + 2e⁻ (lower E°, oxidised) = anode. E°cell = E°cathode − E°anode = +0.34 − (−0.76) = +1.10 V. Positive → spontaneous."
     },
     {
      "q": "State the half-equations and overall equation for a hydrogen-oxygen fuel cell (acidic conditions).",
      "a": "Anode (oxidation): H₂ → 2H⁺ + 2e⁻. Cathode (reduction): O₂ + 4H⁺ + 4e⁻ → 2H₂O. Overall: 2H₂ + O₂ → 2H₂O. EMF ≈ 1.23 V. Advantage: water only product; efficient; no combustion."
     }
    ],
    "threejs3dFn": "createReactionAnimation('collision')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Electrochemical_cell"
   },
   {
    "id": "20-1-organic-reactions-hl",
    "name": "20.1 Types of organic reactions",
    "syllabusRef": "Reactivity 3.4",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "Nucleophilic substitution: SN1 (carbocation intermediate, rate = k[RX], racemisation) vs SN2 (concerted, rate = k[RX][Nu⁻], inversion of configuration). Electrophilic addition to alkenes (e.g. HBr, Markovnikov). Electrophilic aromatic substitution: benzene + Br₂/FeBr₃ (halogenation). Free radical reactions: initiation, propagation, termination.",
    "svgKey": "ib-chem-20-organic-advanced",
    "landmarks": [
     "SN1 vs SN2 (mechanism, kinetics, stereochemistry)",
     "SN1: tertiary, racemisation, carbocation",
     "SN2: primary, inversion, bimolecular",
     "Electrophilic addition (HBr, Markovnikov)",
     "Electrophilic aromatic substitution (EAS)",
     "Benzene stability (delocalisation)",
     "Free radical chain mechanism",
     "Nucleophile, electrophile, leaving group"
    ],
    "examQA": [
     {
      "q": "Distinguish between SN1 and SN2 mechanisms.",
      "a": "SN2: one step; backside attack by nucleophile as leaving group departs; rate = k[RX][Nu⁻] (bimolecular); inverts configuration; favoured by primary alkyl halides in polar aprotic solvents. SN1: two steps; leaving group first departs → carbocation; nucleophile attacks; rate = k[RX] (unimolecular); racemisation; favoured by tertiary halides and polar protic solvents."
     },
     {
      "q": "Explain why benzene undergoes substitution rather than addition.",
      "a": "Benzene has a delocalised π system (aromatic ring) that gives extra stability (~150 kJ mol⁻¹ resonance energy). Addition would destroy this aromatic stability. Substitution (EAS) preserves the aromatic system: an electrophile replaces H without breaking the π system. Thermodynamic driving force favours substitution."
     }
    ],
    "threejs3dFn": "createReactionAnimation('collision')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Organic_reaction"
   },
   {
    "id": "20-2-synthetic-routes",
    "name": "20.2 Synthetic routes",
    "syllabusRef": "Reactivity 3.4",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "Multi-step organic synthesis: sequence of reactions to convert a starting material to a target molecule. Consider: functional group interconversion, protection of groups, stereochemistry, yield at each step. Retrosynthesis: work backwards from target. Key transformations: alcohol ↔ alkene, alkane, ester, acid; nitrile → amine.",
    "svgKey": "ib-chem-20-organic-advanced",
    "landmarks": [
     "Retrosynthesis (work backwards)",
     "Functional group interconversion",
     "Protection of functional groups",
     "Controlling stereochemistry in synthesis",
     "Key reagents and conditions",
     "Yield optimisation",
     "Green chemistry principles"
    ],
    "examQA": [
     {
      "q": "Outline the synthetic route from ethene to ethanoic acid (via ethanol).",
      "a": "1. Ethene → ethanol: H₂O added across double bond (acid-catalysed hydration: H₃PO₄ catalyst, 300°C, 70 atm). 2. Ethanol → ethanal: warm with acidified K₂Cr₂O₇ and DISTIL the aldehyde off as it forms (refluxing instead gives ethanoic acid). 3. Ethanal → ethanoic acid: continue oxidation with K₂Cr₂O₇/H₂SO₄ (reflux)."
     },
     {
      "q": "State the reagents and conditions for converting a primary alkyl halide to an amine.",
      "a": "React with excess concentrated ammonia (NH₃) in ethanol, in a sealed vessel. SN2: NH₃ (nucleophile) attacks C attached to halogen (leaving group). Primary amine + HX → ammonium salt initially; excess NH₃ deprotonates it. Higher amines also form with excess halide."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Organic_synthesis"
   },
   {
    "id": "20-3-stereoisomerism",
    "name": "20.3 Stereoisomerism",
    "syllabusRef": "Structure 3.2",
    "section": "Structure 3. Classification of matter",
    "description": "Geometric (cis-trans) isomerism: restricted rotation around C=C; cis (same side), trans (opposite). Optical isomerism: chiral carbon (4 different substituents) → non-superimposable mirror images (enantiomers). Racemic mixture: equal amounts of both enantiomers. Optical activity: rotates plane-polarised light.",
    "svgKey": "ib-chem-20-organic-advanced",
    "landmarks": [
     "Cis-trans (E-Z) isomerism",
     "Conditions for geometric isomerism (C=C, 2 different groups each C)",
     "Chiral carbon (asymmetric carbon)",
     "Enantiomers (non-superimposable mirror images)",
     "Optical activity (+/− rotation)",
     "Racemic mixture (equal enantiomers, no optical activity)",
     "Significance: thalidomide (enantiomers have different effects)"
    ],
    "examQA": [
     {
      "q": "Identify the chiral centre in 2-bromobutane and predict optical activity.",
      "a": "Structure: CH₃CHBrCH₂CH₃. C2 (bonded to: CH₃, Br, H, CH₂CH₃) has four different substituents → chiral centre. 2-Bromobutane exists as two enantiomers (R and S configurations). The pure enantiomers rotate plane-polarised light in opposite directions. Racemic mixture has no net rotation."
     },
     {
      "q": "Explain why cis and trans isomers have different properties.",
      "a": "In cis isomer, bulkier groups on same side → stronger dipole moments → higher polarity → stronger intermolecular forces → higher boiling point in some cases. Trans isomer is more symmetrical → lower polarity. Different 3D shapes → different interactions with biological receptors (enzymes, binding sites)."
     }
    ],
    "threejs3dFn": "createMolecule('methane')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Stereoisomerism"
   },
   {
    "id": "21-1-spectroscopic-organic",
    "name": "21.1 Spectroscopic identification of organic compounds",
    "syllabusRef": "Structure 3.2",
    "section": "Structure 3. Classification of matter",
    "description": "¹H NMR: chemical shift (δ, ppm) indicates electronic environment. TMS reference (δ=0). Splitting (n+1 rule): n adjacent H atoms → n+1 peaks. Integration: relative peak areas = ratio of equivalent H atoms. ¹³C NMR: one peak per unique carbon environment. Combined with mass spectrometry and IR for full structure determination.",
    "svgKey": "ib-chem-11-3-spectroscopic",
    "landmarks": [
     "Chemical shift (δ, ppm from TMS)",
     "Tighten the ranges to the data booklet: \"Typical shifts: COOH ~9-13 (broad), CHO ~9-10, ArH ~7-8, =CH ~5-6, R-OH/R-NH variable ~1-6 (broad, exchangeable), CH\u2082/CH\u2083 0.5-4\"",
     "Splitting pattern (n+1 rule)",
     "Singlet, doublet, triplet, quartet",
     "Integration ratio",
     "¹³C NMR (unique carbon environments)",
     "Combined MS + IR + NMR analysis"
    ],
    "examQA": [
     {
      "q": "Interpret the ¹H NMR spectrum: δ 1.2 (triplet, 3H) and δ 4.1 (quartet, 2H) with no other peaks.",
      "a": "Triplet (3H) at δ 1.2: CH₃ group with 2 adjacent H atoms (CH₂ neighbours). Quartet (2H) at δ 4.1: CH₂ group with 3 adjacent H atoms (CH₃ neighbours). Pattern consistent with ethyl ester/ethyl ether group: -OCH₂CH₃ (δ ~4.1 quartet, 2H and ~1.2 triplet, 3H). If combined with IR C=O peak → diethyl ether (no C=O) or ethyl ester (check IR)."
     },
     {
      "q": "Describe how mass spectrometry contributes to structure determination.",
      "a": "The m/z of the molecular ion (M⁺) gives the relative molecular mass. High-resolution MS gives exact mass → molecular formula. Fragment ion m/z values correspond to portions of the molecule; loss of known groups (e.g. loss of 15 = CH₃, 29 = CHO, 45 = OEt) helps identify structural features step by step."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Nuclear_magnetic_resonance_spectroscopy"
   }
  ]
 },
 "ib_sl_chemistry": {
  "subjectName": "IB Chemistry SL",
  "examCode": "IB-CHEM-SL",
  "sections": [
   "All",
   "Topic 1: Stoichiometric relationships",
   "Topic 2: Atomic structure",
   "Topic 3: Periodicity",
   "Topic 4: Bonding and structure",
   "Topic 5: Energetics",
   "Topic 6: Chemical kinetics",
   "Topic 7: Equilibrium",
   "Topic 8: Acids and bases",
   "Topic 9: Redox",
   "Topic 10: Organic chemistry",
   "Topic 11: Measurement"
  ],
  "topics": [
   {
    "id": "1-1-particulate-nature",
    "name": "1.1 Introduction to the particulate nature of matter",
    "syllabusRef": "Structure 1.1",
    "section": "Structure 1. Models of the particulate nature of matter",
    "description": "Matter consists of atoms, molecules and ions. The three states of matter (solid, liquid, gas) differ in particle arrangement and energy. Chemical reactions rearrange atoms — no atoms created or destroyed. Conservation of mass applies to all chemical reactions.",
    "svgKey": "ib-chem-1-stoichiometric",
    "landmarks": [
     "Atoms, molecules, ions",
     "States of matter (kinetic theory)",
     "Pure substances vs mixtures",
     "Elements and compounds",
     "Conservation of mass",
     "Physical vs chemical changes"
    ],
    "examQA": [
     {
      "q": "Distinguish between atoms, molecules and ions.",
      "a": "Atom: smallest unit of an element that retains chemical properties; has protons, neutrons, electrons. Molecule: two or more atoms bonded covalently (may be same or different elements). Ion: atom or group of atoms with net positive or negative charge from gaining/losing electrons."
     },
     {
      "q": "Explain why mass is conserved in chemical reactions.",
      "a": "In a chemical reaction atoms are rearranged (bonds broken and formed) but not created or destroyed. The total number of each type of atom before equals the total after. Therefore total mass is conserved."
     }
    ],
    "threejs3dFn": "createParticleStates",
    "wikiUrl": "https://en.wikipedia.org/wiki/Matter"
   },
   {
    "id": "1-2-mole-concept",
    "name": "1.2 The mole concept",
    "syllabusRef": "Structure 1.4",
    "section": "Structure 1. Models of the particulate nature of matter",
    "description": "The mole: amount of substance containing 6.02×10²³ particles (Avogadro's constant, NA). Molar mass (M): mass per mole in g mol⁻¹. n = m/M. In solution: c = n/V (mol dm⁻³). Mole fractions and percentage composition from molar masses.",
    "svgKey": "ib-chem-1-stoichiometric",
    "landmarks": [
     "Avogadro's constant (NA = 6.02×10²³ mol⁻¹)",
     "Molar mass (M, g mol⁻¹)",
     "n = m/M",
     "Concentration c = n/V (mol dm⁻³)",
     "Percentage composition by mass",
     "Interconverting moles, mass, particles"
    ],
    "examQA": [
     {
      "q": "Define the mole and state Avogadro's constant.",
      "a": "The mole is the amount of substance containing 6.02×10²³ particles (the same number as atoms in exactly 12 g of ¹²C). Avogadro's constant NA = 6.02×10²³ mol⁻¹."
     },
     {
      "q": "Calculate the molar concentration of 4.0 g NaOH (M = 40 g mol⁻¹) dissolved in 500 cm³.",
      "a": "n(NaOH) = 4.0/40 = 0.10 mol. V = 500 cm³ = 0.500 dm³. c = 0.10/0.500 = 0.20 mol dm⁻³."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Mole_(unit)"
   },
   {
    "id": "1-3-reacting-masses-volumes",
    "name": "1.3 Reacting masses and volumes",
    "syllabusRef": "Reactivity 2.1",
    "section": "Reactivity 2. How much, how fast and how far?",
    "description": "Balanced equations give molar ratios. Limiting reagent determines maximum yield. Theoretical yield calculated from moles; percentage yield = (actual/theoretical)×100. For gases at STP (0°C, 100 kPa): 1 mol = 22.7 dm³. Concentration and volume used to calculate moles in solution reactions.",
    "svgKey": "ib-chem-1-stoichiometric",
    "landmarks": [
     "Molar ratio from balanced equations",
     "Limiting reagent",
     "Theoretical yield",
     "Percentage yield = (actual/theoretical)×100",
     "Gas volume (22.7 dm³ mol⁻¹ at STP)",
     "Titration calculations"
    ],
    "examQA": [
     {
      "q": "Identify the limiting reagent when 3 mol H₂ reacts with 1 mol N₂ to form NH₃.",
      "a": "N₂ + 3H₂ → 2NH₃. 3 mol H₂ requires 1 mol N₂ exactly → neither is in excess; both are used completely. (If 2 mol H₂ and 1 mol N₂: 2 mol H₂ needs only 2/3 mol N₂, so N₂ is in excess; H₂ is limiting.)"
     },
     {
      "q": "Calculate percentage yield if 3.6 g water produced when theoretical yield = 4.5 g.",
      "a": "% yield = (actual/theoretical) × 100 = (3.6/4.5) × 100 = 80%."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Stoichiometry"
   },
   {
    "id": "2-1-nuclear-atom",
    "name": "2.1 The nuclear atom",
    "syllabusRef": "Structure 1.2",
    "section": "Structure 1. Models of the particulate nature of matter",
    "description": "Rutherford model: nucleus contains protons and neutrons; electrons orbit outside. Mass number (A): protons + neutrons. Atomic number (Z): protons. Isotopes: same Z, different A. Relative atomic mass: weighted mean of isotope masses (relative to ¹²C = 12). Mass spectrometry measures isotopic masses and abundances.",
    "svgKey": "ib-chem-2-atomic-structure",
    "landmarks": [
     "Proton (Z), neutron, electron",
     "Mass number A and atomic number Z",
     "Isotopes (same Z, different A)",
     "Relative atomic mass (weighted mean)",
     "Mass spectrometry",
     "Deflection by magnetic field (m/z)"
    ],
    "examQA": [
     {
      "q": "Define isotopes and give an example.",
      "a": "Isotopes: atoms of the same element with the same atomic number (same number of protons/electrons) but different mass numbers (different numbers of neutrons). Example: ¹²C (6 protons, 6 neutrons) and ¹³C (6 protons, 7 neutrons) and ¹⁴C (6 protons, 8 neutrons)."
     },
     {
      "q": "Calculate Ar of chlorine given ³⁵Cl (75%) and ³⁷Cl (25%).",
      "a": "Ar = (35 × 75/100) + (37 × 25/100) = 26.25 + 9.25 = 35.5."
     }
    ],
    "threejs3dFn": "createAtomModel",
    "wikiUrl": "https://en.wikipedia.org/wiki/Atomic_nucleus"
   },
   {
    "id": "2-2-electron-configuration",
    "name": "2.2 Electron configuration",
    "syllabusRef": "Structure 1.3",
    "section": "Structure 1. Models of the particulate nature of matter",
    "description": "Electrons occupy discrete energy levels (shells) and subshells (s, p, d, f). Subshell order: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p. Aufbau principle: fill lowest energy first. Pauli exclusion: max 2 electrons per orbital (opposite spins). Hund's rule: one electron per orbital before pairing. Emission spectra evidence: discrete lines = quantised energy levels.",
    "svgKey": "ib-chem-2-atomic-structure",
    "landmarks": [
     "Principal shells (n=1,2,3,...)",
     "Subshells s,p,d,f",
     "Aufbau principle (fill lowest first)",
     "Pauli exclusion (max 2 per orbital)",
     "Hund's rule (maximise unpaired electrons)",
     "Electron configuration notation",
     "Emission spectra → quantised energy",
     "First ionisation energy trend"
    ],
    "examQA": [
     {
      "q": "Write the electron configuration of iron (Z=26).",
      "a": "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s² or [Ar]3d⁶4s². 4s fills before 3d (lower energy); iron has 6 d-electrons making it a transition metal (d-block)."
     },
     {
      "q": "Explain why emission spectra evidence quantised energy levels.",
      "a": "Hydrogen emits only specific wavelengths (discrete lines), not continuous. Electrons can only occupy fixed energy levels; when an electron falls from higher to lower level, it emits a photon with energy E=hf equal to the energy difference. Only discrete ΔE values exist → only specific wavelengths emitted."
     }
    ],
    "threejs3dFn": "createOrbital",
    "wikiUrl": "https://en.wikipedia.org/wiki/Electron_configuration"
   },
   {
    "id": "3-1-periodic-table",
    "name": "3.1 Periodic table",
    "syllabusRef": "Structure 3.1",
    "section": "Structure 3. Classification of matter",
    "description": "Elements arranged in order of increasing atomic number. Periods: same highest principal quantum number. Groups: same number of outer electrons, similar chemical properties. Metals, non-metals, metalloids. Transition metals: d-block. Lanthanides and actinides: f-block. Period 3 as reference for periodic trends.",
    "svgKey": "ib-chem-3-periodicity",
    "landmarks": [
     "Periods and groups",
     "s, p, d, f blocks",
     "Alkali metals (Group 1)",
     "Halogens (Group 17)",
     "Noble gases (Group 18)",
     "Transition metals (d-block)",
     "Metals / non-metals / metalloids",
     "Period 3 elements"
    ],
    "examQA": [
     {
      "q": "Explain why elements in the same group have similar chemical properties.",
      "a": "Elements in the same group have the same number of electrons in their outermost shell (same valence electron configuration). Valence electrons determine chemical reactivity. Elements in the same group form compounds with similar empirical formulas and show similar chemical behaviour."
     },
     {
      "q": "State the block classification of elements.",
      "a": "s-block: Groups 1-2 (valence electrons in s subshell). p-block: Groups 13-18 (valence electrons in p subshell). d-block: transition metals (Groups 3-12, filling 3d subshell). f-block: lanthanides and actinides (filling 4f/5f subshell)."
     }
    ],
    "threejs3dFn": "createAtomModel",
    "wikiUrl": "https://en.wikipedia.org/wiki/Periodic_table"
   },
   {
    "id": "3-2-periodic-trends",
    "name": "3.2 Periodic trends",
    "syllabusRef": "Structure 3.1",
    "section": "Structure 3. Classification of matter",
    "description": "Across a period: atomic radius decreases (nuclear charge increases, same shell); first ionisation energy generally increases (exceptions at Group 13 and 16); electronegativity increases. Down a group: atomic radius increases (more shells); ionisation energy decreases; electronegativity decreases. Metallic character decreases across period, increases down group.",
    "svgKey": "ib-chem-3-periodicity",
    "landmarks": [
     "Atomic radius trend (across: decrease; down: increase)",
     "First ionisation energy trend",
     "Exceptions (Al lower than Mg; S lower than P)",
     "Electronegativity (Pauling scale)",
     "Metallic character",
     "Effective nuclear charge",
     "Electron shielding"
    ],
    "examQA": [
     {
      "q": "Explain the trend in first ionisation energy across Period 3.",
      "a": "Generally increases from Na to Ar. Nuclear charge increases while electrons added to same shell (little extra shielding) → greater nuclear attraction → more energy to remove outer electron. Exceptions: Al (3p¹ easier to remove than Mg 3s² due to 3p being slightly higher energy); S (paired 3p electron repulsion makes one easier to remove than phosphorus 3p³ half-filled)."
     },
     {
      "q": "Explain why atomic radius decreases across Period 3.",
      "a": "Atomic number increases (Na Z=11 to Ar Z=18); electrons added to the same n=3 shell provide little extra shielding. Greater effective nuclear charge attracts electrons closer to nucleus, reducing atomic radius."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Periodic_trends"
   },
   {
    "id": "4-1-ionic-bonding",
    "name": "4.1 Ionic bonding",
    "syllabusRef": "Structure 2.1",
    "section": "Structure 2. Models of bonding and structure",
    "description": "Ionic bonds form by electron transfer from metal to non-metal. Resulting ions held by electrostatic attraction. Ionic compounds form giant lattice structures (e.g. NaCl). Properties: high melting points, brittle, conduct electricity when molten or in solution, soluble in polar solvents.",
    "svgKey": "ib-chem-4-bonding",
    "landmarks": [
     "Electron transfer (metal to non-metal)",
     "Cation (+) and anion (−)",
     "Electrostatic attraction",
     "Giant ionic lattice",
     "High mp/bp",
     "Brittleness (ion layer shift)",
     "Conductivity (molten/dissolved)",
     "Formulae from ionic charges"
    ],
    "examQA": [
     {
      "q": "Explain why ionic compounds have high melting points.",
      "a": "Ionic compounds have a giant lattice structure: millions of positive and negative ions held together by strong electrostatic attraction in all directions. A large amount of energy is required to overcome these forces and separate the ions during melting, resulting in high melting points."
     },
     {
      "q": "Explain why ionic compounds conduct electricity when molten but not when solid.",
      "a": "In solid state, ions are fixed in the lattice (cannot move) → no conductivity. When molten, ions are free to move and carry charge → conducts electricity. In solution, ions dissociate and move freely → conducts electricity."
     }
    ],
    "threejs3dFn": "createMetalLattice",
    "wikiUrl": "https://en.wikipedia.org/wiki/Ionic_bond"
   },
   {
    "id": "4-2-covalent-bonding",
    "name": "4.2 Covalent bonding",
    "syllabusRef": "Structure 2.2",
    "section": "Structure 2. Models of bonding and structure",
    "description": "Covalent bonds: sharing of electron pairs between non-metals. Single (σ), double (σ+π), triple (σ+2π) bonds. Bond length decreases and bond strength increases with bond order. Coordinate/dative bonds: both electrons from one atom. Lewis (dot-and-cross) structures show electron sharing.",
    "svgKey": "ib-chem-4-bonding",
    "landmarks": [
     "Shared electron pairs",
     "Single, double, triple bonds",
     "Lewis structures (dot-and-cross)",
     "Bond order",
     "Bond length (order↑ → length↓)",
     "Bond strength (order↑ → strength↑)",
     "Dative (coordinate) bonds",
     "Octet rule (exceptions: PCl₅, SF₆, BF₃)"
    ],
    "examQA": [
     {
      "q": "Draw the Lewis structure of CO₂ and explain the bonding.",
      "a": "O=C=O. Carbon forms one double bond with each oxygen (two C=O bonds in total). Lewis: [::O::]=C=[::O::] where each O has 2 lone pairs and shares 2 pairs with C. Each C=O bond consists of one σ-bond and one π-bond. Carbon achieves 4 bonds (octet); each oxygen has 2 bonds + 2 lone pairs (octet)."
     },
     {
      "q": "Compare C-C, C=C and C≡C bond lengths and energies.",
      "a": "C-C: longest (154 pm), weakest (347 kJ mol⁻¹). C=C: shorter (134 pm), stronger (614 kJ mol⁻¹). C≡C: shortest (120 pm), strongest (839 kJ mol⁻¹). As bond order increases, more electron density between atoms → shorter, stronger bond."
     }
    ],
    "threejs3dFn": "createMolecule('water')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Covalent_bond"
   },
   {
    "id": "4-3-covalent-structures",
    "name": "4.3 Covalent structures",
    "syllabusRef": "Structure 2.2",
    "section": "Structure 2. Models of bonding and structure",
    "description": "VSEPR theory predicts molecular geometry from electron domains. The proposed correction is sound. A marginally tighter version keeps the dataset's existing tag style: 'Shapes: linear (2 domains), trigonal planar (3), tetrahedral (4); trigonal bipyramidal (5) and octahedral (6) are HL.' Lone pairs occupy more space than bonding pairs, reducing bond angles. Molecular polarity: depends on bond polarity and shape.",
    "svgKey": "ib-chem-4-bonding",
    "landmarks": [
     "VSEPR theory (electron domains)",
     "Linear (180°), trigonal planar (120°)",
     "Tetrahedral (109.5°)",
     "Bent/V-shaped (H₂O: 104.5°)",
     "Trigonal pyramidal (NH₃: 107°)",
     "Lone pair repulsion (reduces angle)",
     "Polar vs non-polar molecules",
     "Dipole moment"
    ],
    "examQA": [
     {
      "q": "Predict the shape and bond angle of NH₃.",
      "a": "N has 3 bonding pairs and 1 lone pair = 4 electron domains. Electron geometry: tetrahedral. Molecular shape: trigonal pyramidal. Bond angle: ~107° (less than 109.5° because lone pair repulsion > bonding pair repulsion, compressing the H-N-H angles)."
     },
     {
      "q": "Explain why CCl₄ is non-polar despite having polar C-Cl bonds.",
      "a": "Each C-Cl bond is polar (Cl more electronegative). In CCl₄, four C-Cl bond dipoles point symmetrically to corners of a tetrahedron. The dipoles cancel in all directions → net dipole = 0 → molecule is non-polar. Symmetry cancels individual bond polarities."
     }
    ],
    "threejs3dFn": "createMolecule('benzene')",
    "wikiUrl": "https://en.wikipedia.org/wiki/VSEPR_theory"
   },
   {
    "id": "4-4-intermolecular-forces",
    "name": "4.4 Intermolecular forces",
    "syllabusRef": "Structure 2.2",
    "section": "Structure 2. Models of bonding and structure",
    "description": "Van der Waals (London dispersion): temporary dipole → induced dipole; present in ALL molecules; strength increases with molar mass. Dipole-dipole: between permanent dipoles. Hydrogen bonding: N-H, O-H or F-H with lone pair on N, O or F; strongest intermolecular force. Properties affected: boiling point, solubility, viscosity.",
    "svgKey": "ib-chem-4-bonding",
    "landmarks": [
     "London dispersion (van der Waals)",
     "Temporary dipole–induced dipole",
     "Permanent dipole–dipole",
     "Hydrogen bonding (N, O, F)",
     "Strength: H-bond > dipole-dipole > vdW",
     "Boiling point trends",
     "Anomalous properties of water (H-bonds)"
    ],
    "examQA": [
     {
      "q": "Explain why HF has a higher boiling point than HCl despite smaller molar mass.",
      "a": "HF forms hydrogen bonds: H is bonded to highly electronegative F; lone pairs on F act as acceptors. H-bonds are stronger than the dipole-dipole forces in HCl. More energy needed to break H-bonds during boiling → higher boiling point. HCl: only dipole-dipole + weak vdW."
     },
     {
      "q": "Explain why boiling points increase down Group 17 (F to I).",
      "a": "Going from F₂ to I₂, molar mass increases, so the number of electrons increases. Stronger temporary dipoles can be induced (greater polarisability) → stronger London dispersion forces → more energy needed to overcome them → higher boiling points."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Intermolecular_force"
   },
   {
    "id": "4-5-metallic-bonding",
    "name": "4.5 Metallic bonding",
    "syllabusRef": "Structure 2.3",
    "section": "Structure 2. Models of bonding and structure",
    "description": "Metallic bonding: \"sea\" of delocalised electrons surrounding a lattice of positive metal cations. Electrostatic attraction between electrons and cations. Properties: high melting point (strong attraction), electrical conductivity (delocalised electrons carry charge), thermal conductivity, malleability and ductility (layers can slide without breaking bonds).",
    "svgKey": "ib-chem-4-bonding",
    "landmarks": [
     "Delocalised electrons (electron sea)",
     "Positive metal cations in lattice",
     "Electrostatic attraction",
     "High mp (stronger with more valence e⁻)",
     "Electrical conductivity",
     "Thermal conductivity",
     "Malleability and ductility"
    ],
    "examQA": [
     {
      "q": "Explain why metals are good conductors of electricity.",
      "a": "In metals, valence electrons are delocalised from their parent atoms and can move freely through the metallic lattice. When a potential difference is applied, these mobile electrons move directionally → carry charge → electrical current flows. No such mobile charge carriers exist in ionic solids or covalent molecular compounds."
     },
     {
      "q": "Explain why magnesium has a higher melting point than sodium.",
      "a": "Mg has 2 delocalised electrons per atom (2+); Na has 1 (1+). Stronger electrostatic attraction between Mg²⁺ ions and the denser electron sea → more energy required to separate ions → higher melting point. Mg also has smaller, more charge-dense cations."
     }
    ],
    "threejs3dFn": "createMetalLattice",
    "wikiUrl": "https://en.wikipedia.org/wiki/Metallic_bond"
   },
   {
    "id": "5-1-measuring-energy",
    "name": "5.1 Measuring energy changes",
    "syllabusRef": "Reactivity 1.1",
    "section": "Reactivity 1. What drives chemical reactions?",
    "description": "Enthalpy (H): heat content at constant pressure. Exothermic: ΔH < 0 (products lower energy, heat released). Endothermic: ΔH > 0 (products higher energy, heat absorbed). Standard enthalpy change: ΔH° at 100 kPa, usually 298 K. Calorimetry: q = mcΔT; ΔH = −q/n.",
    "svgKey": "ib-chem-5-energetics",
    "landmarks": [
     "Enthalpy H (heat at constant P)",
     "Exothermic (ΔH < 0)",
     "Endothermic (ΔH > 0)",
     "Standard enthalpy (ΔH°, 298 K, 100 kPa)",
     "Calorimetry: q = mcΔT",
     "ΔH = −q/n (per mole)",
     "Potential energy diagram",
     "Activation energy"
    ],
    "examQA": [
     {
      "q": "A student burns 0.50 g of ethanol (M = 46) and heats 200 g water by 25°C (c = 4.18 J g⁻¹ K⁻¹). Calculate ΔH per mole.",
      "a": "q = mcΔT = 200 × 4.18 × 25 = 20,900 J. n(ethanol) = 0.50/46 = 0.0109 mol. ΔH = −20900/0.0109 = −1.92×10⁶ J mol⁻¹ = −1920 kJ mol⁻¹ (negative: exothermic)."
     },
     {
      "q": "Define standard enthalpy of combustion.",
      "a": "The enthalpy change when 1 mole of a substance is completely burned in excess oxygen under standard conditions (298 K, 100 kPa), with all products in standard states. Always exothermic (negative value)."
     }
    ],
    "threejs3dFn": "createEnergyTransfer",
    "wikiUrl": "https://en.wikipedia.org/wiki/Enthalpy"
   },
   {
    "id": "5-2-hess-law",
    "name": "5.2 Hess's law",
    "syllabusRef": "Reactivity 1.2",
    "section": "Reactivity 1. What drives chemical reactions?",
    "description": "Hess's law: the enthalpy change of a reaction is independent of the pathway; depends only on initial and final states. Allows calculation of ΔH from standard enthalpies of formation or combustion. Born-Haber cycles (HL) use Hess's law for ionic compounds.",
    "svgKey": "ib-chem-5-energetics",
    "landmarks": [
     "Hess's law (path independence)",
     "Enthalpy cycle",
     "Standard enthalpy of formation (ΔHf°)",
     "ΔHrxn = ΣΔHf°(products) − ΣΔHf°(reactants)",
     "Using enthalpy of combustion data",
     "Born-Haber cycles (HL)"
    ],
    "examQA": [
     {
      "q": "Calculate ΔH for C(s)+½O₂(g)→CO(g) using ΔHc°[C(s)]=−394 and ΔHc°[CO(g)]=−283 kJ mol⁻¹.",
      "a": "Route 1 (direct): C + ½O₂ → CO (unknown = x). Route 2: C + O₂ → CO₂ (−394); CO + ½O₂ → CO₂ (−283 → reverse: CO₂ → CO = +283). By Hess's law: x = −394 + 283 = −111 kJ mol⁻¹."
     },
     {
      "q": "State Hess's law.",
      "a": "The total enthalpy change for a chemical reaction is the same regardless of the pathway taken, provided the initial and final conditions are the same. Consequence of energy conservation (first law of thermodynamics)."
     }
    ],
    "threejs3dFn": "createEnergyTransfer",
    "wikiUrl": "https://en.wikipedia.org/wiki/Hess%27s_law"
   },
   {
    "id": "5-3-bond-enthalpies",
    "name": "5.3 Bond enthalpies",
    "syllabusRef": "Reactivity 1.2",
    "section": "Reactivity 1. What drives chemical reactions?",
    "description": "Bond enthalpy (bond dissociation energy): energy to break 1 mol of a bond in gaseous molecules (always endothermic). ΔH ≈ Σ(bonds broken) − Σ(bonds formed). Average bond enthalpies from data booklet. Limitations: values are averages; only accurate for gaseous species.",
    "svgKey": "ib-chem-5-energetics",
    "landmarks": [
     "Bond dissociation energy (endothermic, +ve)",
     "ΔH = Σ(broken) − Σ(formed)",
     "Average bond enthalpy",
     "Values from data booklet",
     "Strengths: double > single bond",
     "Limitations (average, gas only)"
    ],
    "examQA": [
     {
      "q": "Calculate ΔH for H₂(g)+Cl₂(g)→2HCl(g) using bond enthalpies H-H=436, Cl-Cl=243, H-Cl=432 kJ mol⁻¹.",
      "a": "Bonds broken: 436 + 243 = 679 kJ. Bonds formed: 2 × 432 = 864 kJ. ΔH = 679 − 864 = −185 kJ mol⁻¹ (exothermic)."
     },
     {
      "q": "Explain why bond enthalpy calculations give approximate values for ΔH.",
      "a": "Bond enthalpies used are average values from many different compounds; in reality, bond energy depends on molecular environment. Also assumes all species are gaseous (ΔH°f of gaseous substances). Real reactions may involve liquids/solids, requiring additional enthalpy terms."
     }
    ],
    "threejs3dFn": "createEnergyTransfer",
    "wikiUrl": "https://en.wikipedia.org/wiki/Bond-dissociation_energy"
   },
   {
    "id": "6-1-collision-theory",
    "name": "6.1 Collision theory and rates of reaction",
    "syllabusRef": "Reactivity 2.2",
    "section": "Reactivity 2. How much, how fast and how far?",
    "description": "Collision theory: reactions occur when reactant particles collide with sufficient energy (≥ activation energy) and correct orientation. Rate depends on collision frequency and fraction of successful collisions. Factors: temperature, concentration, pressure (gases), surface area, catalyst. Activation energy (Ea): minimum energy for reaction to occur.",
    "svgKey": "ib-chem-6-kinetics",
    "landmarks": [
     "Activation energy (Ea)",
     "Successful collision (correct energy + orientation)",
     "Effect of temperature (Maxwell-Boltzmann)",
     "Effect of concentration/pressure",
     "Effect of surface area",
     "Catalyst (lowers Ea, alternative pathway)",
     "Rate expression (SL: qualitative)",
     "Reaction rate = d[product]/dt"
    ],
    "examQA": [
     {
      "q": "Explain how a catalyst increases reaction rate.",
      "a": "A catalyst provides an alternative reaction pathway with lower activation energy (Ea). The Maxwell-Boltzmann distribution shows that more molecules have energy ≥ Ea (lower) → greater fraction of collisions is successful → rate increases. Catalyst is not consumed; it is regenerated."
     },
     {
      "q": "Explain why increasing temperature increases rate of reaction.",
      "a": "Higher temperature → greater average kinetic energy → molecules move faster → more frequent collisions. More importantly, more molecules have energy ≥ Ea (shape of Maxwell-Boltzmann distribution shifts right, tail extends) → greater fraction of collisions successful → rate increases substantially (typically doubles per 10°C rise)."
     }
    ],
    "threejs3dFn": "createReactionAnimation('collision')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Collision_theory"
   },
   {
    "id": "7-1-equilibrium",
    "name": "7.1 Equilibrium",
    "syllabusRef": "Reactivity 2.3",
    "section": "Reactivity 2. How much, how fast and how far?",
    "description": "Dynamic equilibrium: in a closed system, forward and reverse reaction rates are equal; concentrations remain constant. Le Chatelier's principle: a system at equilibrium subjected to a change responds to minimise the effect. Changes: concentration, pressure (gases), temperature (temperature change is the only factor that changes Kc).",
    "svgKey": "ib-chem-7-equilibrium",
    "landmarks": [
     "Dynamic equilibrium (rates equal, concentrations constant)",
     "Le Chatelier's principle",
     "Concentration change (shifts equilibrium)",
     "Pressure change (gas moles)",
     "Temperature change (endothermic/exothermic)",
     "Catalyst (no effect on position, only rate)"
    ],
    "examQA": [
     {
      "q": "Apply Le Chatelier's principle to N₂(g)+3H₂(g)⇌2NH₃(g) ΔH=−92 kJ mol⁻¹.",
      "a": "Increasing pressure → equilibrium shifts right (fewer moles of gas). Increasing temperature → equilibrium shifts left (reverse reaction is endothermic; absorbs heat to cool). Increasing [N₂] → shifts right. Catalyst → rate increases but position unchanged."
     },
     {
      "q": "Define dynamic equilibrium.",
      "a": "A state in which the forward and reverse reactions occur at equal rates; macroscopic properties (concentration, pressure, colour) remain constant; the system is not static but continues to react in both directions at molecular level."
     }
    ],
    "threejs3dFn": "createReactionAnimation('energetic')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Chemical_equilibrium"
   },
   {
    "id": "7-2-equilibrium-law",
    "name": "7.2 The equilibrium law",
    "syllabusRef": "Reactivity 2.3",
    "section": "Reactivity 2. How much, how fast and how far?",
    "description": "Equilibrium constant Kc: ratio of product to reactant concentrations at equilibrium, each raised to stoichiometric coefficient. Large Kc: products favoured; small Kc: reactants favoured. Kc changes only with temperature. Reaction quotient Q: calculated from non-equilibrium concentrations; if Q < Kc, reaction proceeds forward.",
    "svgKey": "ib-chem-7-equilibrium",
    "landmarks": [
     "Kc expression (from equation)",
     "Kc > 1 (products favoured), Kc < 1 (reactants)",
     "Temperature only changes Kc",
     "Units of Kc (depend on stoichiometry)",
     "Reaction quotient Q",
     "Q vs Kc: predicts direction"
    ],
    "examQA": [
     {
      "q": "Write the Kc expression for 2SO₂(g)+O₂(g)⇌2SO₃(g).",
      "a": "Kc = [SO₃]²/([SO₂]²[O₂]). Products in numerator, reactants in denominator, each raised to stoichiometric coefficient. Units: (mol dm⁻³)²/((mol dm⁻³)²(mol dm⁻³)) = dm³ mol⁻¹."
     },
     {
      "q": "Explain why changing the concentration of a reactant does not change Kc.",
      "a": "Kc depends only on temperature. Adding a reactant increases Q denominator → Q < Kc → reaction shifts forward to re-establish equilibrium. Once equilibrium is re-established, concentrations readjust so the ratio of products to reactants gives the same Kc value."
     }
    ],
    "threejs3dFn": "createReactionAnimation('energetic')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Equilibrium_constant"
   },
   {
    "id": "8-1-acid-base-theories",
    "name": "8.1 Theories of acids and bases",
    "syllabusRef": "Reactivity 3.1",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "Arrhenius: acid produces H⁺(aq); base produces OH⁻(aq). Brønsted-Lowry: acid is a proton donor; base is a proton acceptor. Conjugate pairs: acid ⇌ conjugate base (differs by one H⁺). Amphoteric: can act as acid or base (e.g. water, amino acids). Lewis (HL): acid accepts electron pair; base donates electron pair.",
    "svgKey": "ib-chem-8-acids-bases",
    "landmarks": [
     "Arrhenius definition",
     "Brønsted-Lowry definition",
     "Conjugate acid-base pairs",
     "Amphoteric species (water)",
     "Strong vs weak acids",
     "Monoprotic vs polyprotic acids",
     "Neutralisation: acid + base → salt + water",
     "Lewis acid-base (HL)"
    ],
    "examQA": [
     {
      "q": "Identify the conjugate base of HNO₃ and the conjugate acid of NH₃.",
      "a": "HNO₃ (acid) → H⁺ + NO₃⁻. Conjugate base = NO₃⁻. NH₃ (base) + H⁺ → NH₄⁺. Conjugate acid = NH₄⁺."
     },
     {
      "q": "Explain why water is amphoteric.",
      "a": "Water can act as a Brønsted-Lowry acid (donates H⁺ to a base: H₂O + NH₃ → OH⁻ + NH₄⁺) or as a Brønsted-Lowry base (accepts H⁺ from an acid: H₂O + HCl → H₃O⁺ + Cl⁻). It can both donate and accept protons."
     }
    ],
    "threejs3dFn": "createReactionAnimation('collision')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Acid"
   },
   {
    "id": "8-2-properties-acids-bases",
    "name": "8.2 Properties of acids and bases",
    "syllabusRef": "Reactivity 3.1",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "Acids react with metals (H₂ produced), metal carbonates (CO₂ produced), bases (neutralisation). Common strong acids: HCl, HNO₃, H₂SO₄. Common strong bases: NaOH, KOH. Weak acids and bases partially ionise. Indicators: change colour at specific pH ranges. Titration: standardised solution of acid/base.",
    "svgKey": "ib-chem-8-acids-bases",
    "landmarks": [
     "Reactions of acids with metals, carbonates, bases",
     "Strong acids (fully ionise)",
     "Weak acids (partial ionisation)",
     "Strong bases (NaOH, KOH)",
     "Neutral, basic, acidic solutions",
     "Indicators (methyl orange, phenolphthalein)",
     "Titration procedure"
    ],
    "examQA": [
     {
      "q": "State the products when HCl reacts with Na₂CO₃.",
      "a": "2HCl(aq) + Na₂CO₃(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g). Products: sodium chloride salt, water and carbon dioxide gas (effervescence observed)."
     },
     {
      "q": "Distinguish between strong and weak acids with an example of each.",
      "a": "Strong acid: completely dissociates in aqueous solution → [H⁺] = [acid]. Example: HCl → H⁺ + Cl⁻ (100%). Weak acid: partially dissociates → equilibrium → [H⁺] < [acid]. Example: CH₃COOH ⇌ CH₃COO⁻ + H⁺ (~1% at 0.1 mol dm⁻³)."
     }
    ],
    "threejs3dFn": "createReactionAnimation('collision')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Acid"
   },
   {
    "id": "8-3-ph-scale",
    "name": "8.3 The pH scale",
    "syllabusRef": "Reactivity 3.1",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "pH = −log[H⁺]. pOH = −log[OH⁻]. pH + pOH = 14 (at 25°C). Kw = [H⁺][OH⁻] = 10⁻¹⁴ at 25°C. Neutral: pH = 7 (equal [H⁺] and [OH⁻]). Acidic: pH < 7; Alkaline: pH > 7. For strong acids/bases: calculate [H⁺] directly.",
    "svgKey": "ib-chem-8-acids-bases",
    "landmarks": [
     "pH = −log[H⁺]",
     "pOH = −log[OH⁻]",
     "Kw = [H⁺][OH⁻] = 10⁻¹⁴ (25°C)",
     "pH + pOH = 14",
     "Neutral pH = 7, acid < 7, alkali > 7",
     "pH of strong acid/base calculations",
     "pH meter and indicators"
    ],
    "examQA": [
     {
      "q": "Calculate the pH of 0.050 mol dm⁻³ HNO₃.",
      "a": "HNO₃ is a strong acid, fully dissociates. [H⁺] = 0.050 mol dm⁻³. pH = −log(0.050) = −log(5×10⁻²) = 2 − log 5 ≈ 1.30."
     },
     {
      "q": "Calculate the pH of 0.010 mol dm⁻³ NaOH.",
      "a": "NaOH is a strong base, fully dissociates. [OH⁻] = 0.010 mol dm⁻³. pOH = −log(0.010) = 2. pH = 14 − pOH = 14 − 2 = 12."
     }
    ],
    "threejs3dFn": "createParticleStates",
    "wikiUrl": "https://en.wikipedia.org/wiki/PH"
   },
   {
    "id": "8-4-strong-weak-acids",
    "name": "8.4 Strong and weak acids and bases",
    "syllabusRef": "Reactivity 3.1",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "Weak acid HA ⇌ H⁺ + A⁻. Rewrite the description to lead with the SL content the topic is named for and tag the rest, e.g. 'Strong acids/bases ionise essentially completely; weak acids/bases only partially: HA \u21cc H\u207a + A\u207b. At equal concentration the strong acid has lower pH, higher conductivity and faster reaction with metals/carbonates. (HL) Ka = [H\u207a][A\u207b]/[HA]; pKa = \u2212log Ka; buffer solutions resist pH change; Henderson-Hasselbalch: pH = pKa + log([A\u207b]/[HA]).' The proposed one-line fix leaves the untagged landmarks ([H\u207a] = \u221a(Ka \u00d7 c), buffer solution, buffer action) and both HL-only examQA items in place, so it fixes the quoted sentence but not the topic.: contains weak acid and its conjugate base (or weak base + conjugate acid). Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]).",
    "svgKey": "ib-chem-8-acids-bases",
    "landmarks": [
     "Ka (acid dissociation constant)",
     "pKa = −log Ka",
     "Weak acid calculation: [H⁺] = √(Ka × c)",
     "Buffer solution (weak acid + conjugate base)",
     "Buffer action (adding acid or base)",
     "Henderson-Hasselbalch equation (HL)",
     "Blood buffer (H₂CO₃/HCO₃⁻)"
    ],
    "examQA": [
     {
      "q": "Calculate pH of 0.10 mol dm⁻³ ethanoic acid (Ka = 1.8×10⁻⁵ mol dm⁻³).",
      "a": "CH₃COOH ⇌ H⁺ + CH₃COO⁻. Ka = [H⁺]²/0.10 (assuming small dissociation). [H⁺] = √(1.8×10⁻⁵ × 0.10) = √(1.8×10⁻⁶) = 1.34×10⁻³. pH = −log(1.34×10⁻³) ≈ 2.87."
     },
     {
      "q": "Explain how a buffer resists pH change when acid is added.",
      "a": "Buffer (e.g. CH₃COOH / CH₃COO⁻): When H⁺ added → reacts with conjugate base: H⁺ + CH₃COO⁻ → CH₃COOH. [H⁺] consumed → pH changes very little. The weak acid concentration increases and conjugate base decreases, but ratio stays similar."
     }
    ],
    "threejs3dFn": "createReactionAnimation('energetic')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Buffer_solution"
   },
   {
    "id": "8-5-acid-deposition",
    "name": "8.5 Acid deposition",
    "syllabusRef": "not on the current IB guide",
    "section": "Withdrawn from the current IB guide (first assessment 2025)",
    "description": "Acid deposition: SO₂ and NOₓ (from combustion) dissolved in rain to form H₂SO₄ and HNO₃. pH < 5.6. Effects: lakes become acidic (kills fish), leaches soil nutrients, damages buildings (CaCO₃), kills conifer forests. Solutions: catalytic converters, flue gas desulfurisation, low-sulfur fuels.",
    "svgKey": "ib-chem-8-acids-bases",
    "landmarks": [
     "Sources of SO₂ (coal burning, volcanoes)",
     "Sources of NOₓ (lightning, vehicle engines)",
     "SO₂ + H₂O → H₂SO₃; 2SO₂ + O₂ + 2H₂O → 2H₂SO₄",
     "pH of acid rain < 5.6",
     "Effects on lakes, soil, buildings, forests",
     "Catalytic converters (NOₓ → N₂)",
     "Flue gas desulfurisation (CaO + SO₂)"
    ],
    "examQA": [
     {
      "q": "Explain how sulfur dioxide causes acid deposition.",
      "a": "SO₂ (from fossil fuel combustion) dissolves in rainwater: SO₂ + H₂O → H₂SO₃. Oxidation by O₂: 2SO₂ + O₂ + 2H₂O → 2H₂SO₄. Sulfuric acid dissociates fully → lowers pH of precipitation to < 5.6. This acidic rain damages aquatic and terrestrial ecosystems."
     },
     {
      "q": "State two environmental effects of acid deposition.",
      "a": "1. Lake acidification: H⁺ leaches Al³⁺ from soil into lakes; Al³⁺ is toxic to fish; organisms die. 2. Building damage: acid dissolves CaCO₃ in limestone/marble buildings: CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂. Also: soil nutrient depletion; forest damage."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Acid_rain"
   },
   {
    "id": "9-1-oxidation-reduction",
    "name": "9.1 Oxidation and reduction",
    "syllabusRef": "Reactivity 3.2",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "Oxidation: loss of electrons (OIL); increase in oxidation state. Reduction: gain of electrons (RIG); decrease in oxidation state. Oxidising agent: gains electrons (oxidises the other species). Reducing agent: loses electrons. Oxidation states: rules for assigning. Redox reactions: balanced using half-equations.",
    "svgKey": "ib-chem-9-redox",
    "landmarks": [
     "OIL RIG (oxidation is loss, reduction is gain)",
     "Oxidation state rules",
     "Oxidising agent (gains e⁻, reduced)",
     "Reducing agent (loses e⁻, oxidised)",
     "Half-equations (oxidation + reduction)",
     "Balancing redox equations",
     "Disproportionation"
    ],
    "examQA": [
     {
      "q": "Assign oxidation states in H₂SO₄ and identify any rules used.",
      "a": "H = +1 (known). O = −2 (known). H₂SO₄: 2(+1) + S + 4(−2) = 0. 2 + S − 8 = 0. S = +6. Rules: H is +1 in compounds; O is −2 in compounds; sum of oxidation states = charge on species (0 for neutral molecule)."
     },
     {
      "q": "Construct the overall equation for: Zn→Zn²⁺+2e⁻ and Cu²⁺+2e⁻→Cu.",
      "a": "Add the two half-equations: Zn → Zn²⁺ + 2e⁻ (oxidation). Cu²⁺ + 2e⁻ → Cu (reduction). Electrons cancel: Zn + Cu²⁺ → Zn²⁺ + Cu. Zinc is oxidised (reducing agent); copper ion is reduced (oxidising agent)."
     }
    ],
    "threejs3dFn": "createReactionAnimation('collision')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Redox"
   },
   {
    "id": "9-2-electrochemical-cells",
    "name": "9.2 Electrochemical cells",
    "syllabusRef": "Reactivity 3.2",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "Electrolytic cells: non-spontaneous redox reaction driven by external electricity. Electrodes: anode (oxidation), cathode (reduction). Keep the SL core and mark the rest, e.g. 'Electrolytic cells: non-spontaneous redox driven by an external supply. Anode = oxidation, cathode = reduction; cations migrate to the cathode, anions to the anode. SL: electrolysis of molten binary ionic compounds (e.g. molten NaCl \u2192 Na at cathode, Cl\u2082 at anode). (HL) Electrolysis of aqueous solutions such as NaCl(aq) \u2014 Cl\u2082 at anode, H\u2082 at cathode, NaOH in solution \u2014 and Faraday's-law calculations: Q = It, moles of electrons = Q/F, moles of product = Q/(nF).' The two AHL landmarks and both examQA items need the same treatment; the proposed correction alone leaves them off-level. Galvanic (voltaic) cells (SL awareness): spontaneous redox produces EMF.",
    "svgKey": "ib-chem-9-redox",
    "landmarks": [
     "Electrolytic cell (external power)",
     "Anode: oxidation; cathode: reduction",
     "Anion → anode; cation → cathode",
     "Electrolysis of water → H₂ + O₂",
     "Electrolysis of brine → Cl₂, H₂, NaOH",
     "Faraday's laws (Q = It)",
     "Moles e⁻ = Q/F; F = 96500 C mol⁻¹"
    ],
    "examQA": [
     {
      "q": "Identify the products at each electrode during electrolysis of dilute sulfuric acid.",
      "a": "Cathode (reduction): 2H⁺ + 2e⁻ → H₂(g). Anode (oxidation): 2H₂O → O₂(g) + 4H⁺ + 4e⁻. Volume ratio H₂:O₂ = 2:1. Net: 2H₂O → 2H₂ + O₂."
     },
     {
      "q": "Calculate mass of copper deposited when 0.50 A passed for 30 min. (M(Cu)=63.5, F=96500).",
      "a": "Q = It = 0.50 × 30 × 60 = 900 C. Moles of e⁻ = 900/96500 = 9.33×10⁻³ mol. Cu²⁺ + 2e⁻ → Cu: mol Cu = 9.33×10⁻³/2 = 4.66×10⁻³ mol. Mass = 4.66×10⁻³ × 63.5 = 0.296 g."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Electrochemistry"
   },
   {
    "id": "10-1-fundamentals-organic",
    "name": "10.1 Fundamentals of organic chemistry",
    "syllabusRef": "Structure 3.2",
    "section": "Structure 3. Classification of matter",
    "description": "Homologous series: compounds differing by CH₂. Functional groups determine chemical properties. Nomenclature (IUPAC): longest carbon chain, prefix for substituents. Structural isomers: same molecular formula, different structural formula. Types: chain, position, functional group isomers. Apply the tag to the landmarks as well as the description, since 'Cis-trans isomerism (geometric)' and 'Optical isomerism (chiral centre)' are listed untagged: description 'Stereoisomers (HL): cis-trans (geometric), optical.' plus landmarks 'Cis-trans isomerism (geometric) (HL)' and 'Optical isomerism (chiral centre) (HL)'.",
    "svgKey": "ib-chem-10-organic",
    "landmarks": [
     "Homologous series",
     "Functional groups (alkene, alcohol, aldehyde, ketone, acid, amine, ester, amide)",
     "IUPAC nomenclature",
     "Structural isomerism (chain, position, functional group)",
     "Cis-trans isomerism (geometric)",
     "Optical isomerism (chiral centre)",
     "Degree of unsaturation"
    ],
    "examQA": [
     {
      "q": "Define structural isomers and give an example.",
      "a": "Structural isomers have the same molecular formula but different structural formulas (connectivity). Example: C₄H₁₀ → butane (n-butane, straight chain) and methylpropane (branched). They have different physical properties (different boiling points) but similar general chemical reactivity."
     },
     {
      "q": "Name the following compound: CH₃CH₂CH(CH₃)CH₂CH₃.",
      "a": "Longest chain = 5 carbons (pentane). Methyl substituent at C3. Name: 3-methylpentane."
     }
    ],
    "threejs3dFn": "createMolecule('benzene')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Organic_chemistry"
   },
   {
    "id": "10-2-functional-group-chemistry",
    "name": "10.2 Functional group chemistry",
    "syllabusRef": "Reactivity 3.4",
    "section": "Reactivity 3. What are the mechanisms of chemical change?",
    "description": "Alkanes: substitution (halogenation by UV). Alkenes: addition reactions (HX, X₂, H₂O, H₂). Test: decolourise bromine water. Alcohols: oxidation, esterification. Condensation polymerisation: nylon-6,6 from a diamine + a dicarboxylic acid, or nylon-6 from a single amino acid/lactam monomer; polyesters from a diol + a dicarboxylic acid. Addition polymerisation: alkenes → polyalkenes.",
    "svgKey": "ib-chem-10-organic",
    "landmarks": [
     "Alkane + Cl₂/UV → chloroalkane + HCl",
     "Alkene + Br₂ → dibromoalkane (addition)",
     "Markovnikov's rule (+ HX)",
     "Alcohol oxidation (primary → aldehyde → acid)",
     "Esterification (acid + alcohol ⇌ ester + H₂O)",
     "Addition polymerisation (alkenes)",
     "Condensation polymerisation (nylon, polyester)"
    ],
    "examQA": [
     {
      "q": "Describe the test for an alkene using bromine water.",
      "a": "Add bromine water (orange/brown) to the unknown compound. If it is an alkene, bromine adds across the C=C double bond (electrophilic addition): CH₂=CH₂ + Br₂ → BrCH₂CH₂Br. Bromine water is decolourised to colourless."
     },
     {
      "q": "Write the equation for esterification of ethanol with ethanoic acid.",
      "a": "CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O. Catalyst: concentrated H₂SO₄. Product: ethyl ethanoate (ester). Reversible reaction; equilibrium establishes. Yield improved by removing water or using excess of one reagent."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Functional_group"
   },
   {
    "id": "11-1-uncertainties-errors",
    "name": "11.1 Uncertainties and errors",
    "syllabusRef": "not on the current IB guide",
    "section": "Withdrawn from the current IB guide (first assessment 2025)",
    "description": "Absolute uncertainty: ± half the smallest division. Percentage uncertainty: (absolute/measured) × 100. Addition/subtraction: add absolute uncertainties. Multiplication/division: add percentage uncertainties. Powers: multiply % uncertainty by power. Random vs systematic errors. Accuracy vs precision.",
    "svgKey": "ib-chem-11-measurement",
    "landmarks": [
     "Absolute uncertainty (± half division)",
     "Percentage uncertainty",
     "Propagation: add absolute (±)",
     "Propagation: add % (× or ÷)",
     "Random error (precision)",
     "Systematic error (accuracy)",
     "Significant figures",
     "Error bars on graphs"
    ],
    "examQA": [
     {
      "q": "A student records T=25.0±0.5°C and V=50.0±0.5 cm³. Calculate % uncertainty in V/T.",
      "a": "%unc(T) = 0.5/25.0×100 = 2.0%. %unc(V) = 0.5/50.0×100 = 1.0%. %unc(V/T) = 2.0 + 1.0 = 3.0%."
     },
     {
      "q": "Distinguish between random and systematic errors.",
      "a": "Random error: unpredictable fluctuations (scatter around true value); reduces precision; minimised by repeating and averaging. Systematic error: consistent offset in one direction; reduces accuracy; cannot be eliminated by repetition — source must be identified and corrected."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Measurement_uncertainty"
   },
   {
    "id": "11-2-graphical-techniques",
    "name": "11.2 Graphical techniques",
    "syllabusRef": "not on the current IB guide",
    "section": "Withdrawn from the current IB guide (first assessment 2025)",
    "description": "Scatter graphs with lines/curves of best fit. Gradient = change in y/change in x (using large triangle). Y-intercept from graph or equation. R² value: correlation strength. Linearising: if y = kxⁿ → log y = log k + n log x. Error bars on graphs; range of best fit line gradients gives uncertainty in gradient.",
    "svgKey": "ib-chem-11-measurement",
    "landmarks": [
     "Line/curve of best fit",
     "Gradient calculation (large triangle)",
     "Y-intercept",
     "Interpreting straight-line graphs",
     "Linearising non-linear data (log-log)",
     "Error bars on axes",
     "Gradient uncertainty"
    ],
    "examQA": [
     {
      "q": "Explain how to determine the gradient of a straight-line graph.",
      "a": "Choose two widely-spaced points ON the line of best fit (not data points). Draw a large right-angle triangle. Gradient = Δy/Δx (vertical change/horizontal change). Include units. If the line does not pass through origin, read y-intercept where x = 0."
     },
     {
      "q": "Explain why plotting log(rate) against log[A] can determine the order of a reaction.",
      "a": "If rate = k[A]ⁿ, then log(rate) = log k + n log[A]. This is a linear equation (y = c + mx). Plotting log(rate) vs log[A] gives a straight line with gradient n (order of reaction with respect to A) and y-intercept log k."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Graphing"
   },
   {
    "id": "11-3-spectroscopic-id",
    "name": "11.3 Spectroscopic identification",
    "syllabusRef": "Structure 3.2",
    "section": "Structure 3. Classification of matter",
    "description": "Mass spectrometry: molecular ion peak (M⁺) = relative molecular mass. Fragment ions identify structure. IR spectroscopy: absorption at characteristic wavenumbers identifies functional groups (O-H, N-H, C=O). ¹H NMR (HL): chemical shift identifies environment; integration = relative H count; splitting pattern (n+1 rule).",
    "svgKey": "ib-chem-11-3-spectroscopic",
    "landmarks": [
     "Mass spectrometry: M⁺ peak = Mr",
     "Fragment ions (m/z values)",
     "Use the data-booklet ranges: 'IR absorption: O-H alcohol (3200-3600 broad), O-H carboxylic acid (2500-3000 very broad)'. Note that adopting 2500-3000 leaves the topic's examQA stem quoting 'a broad peak at 2500\u20133300 cm\u207b\u00b9', so update that stem to 2500\u20133000 at the same time, otherwise the fix trades one internal mismatch for another.",
     "C=O (1700-1750)",
     "N-H (3300-3500)",
     "¹H NMR: chemical shift (environment)",
     "Integration (ratio of H)",
     "Splitting (n+1 rule): singlet, doublet, triplet"
    ],
    "examQA": [
     {
      "q": "A molecule has an IR absorption at 1720 cm⁻¹ and a broad peak at 2500–3300 cm⁻¹. What functional group is present?",
      "a": "The peak at 1720 cm⁻¹ is characteristic of C=O (carbonyl) stretch. The broad peak at 2500–3300 cm⁻¹ is characteristic of O-H in a carboxylic acid group. Together they indicate a carboxylic acid (COOH) functional group."
     },
     {
      "q": "Describe how mass spectrometry identifies the molecular formula of an organic compound.",
      "a": "The molecular ion peak (M⁺) in the mass spectrum gives the relative molecular mass. High-resolution mass spectrometry gives exact mass → molecular formula can be deduced. Fragment ion patterns (fragmentation) help identify structural features and connectivity of groups."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Spectroscopy"
   }
  ]
 },
 "ib_hl_physics": {
  "subjectName": "IB Physics HL",
  "examCode": "IB-PHYS-HL",
  "sections": [
   "All",
   "Topic 1: Measurements and uncertainties",
   "Topic 2: Mechanics",
   "Topic 3: Thermal physics",
   "Topic 4: Waves",
   "Topic 5: Electricity and magnetism",
   "Topic 6: Circular motion and gravitation",
   "Topic 7: Atomic nuclear and particle physics",
   "Topic 8: Energy production",
   "Topic 9: Wave phenomena (HL)",
   "Topic 10: Fields (HL)",
   "Topic 11: Electromagnetic induction (HL)",
   "Topic 12: Quantum and nuclear physics (HL)"
  ],
  "topics": [
   {
    "id": "1-1-measurements-in-physics",
    "name": "1.1 Measurements in physics",
    "syllabusRef": "not on the current IB guide",
    "section": "Withdrawn from the current IB guide (first assessment 2025)",
    "description": "Physics relies on measurements made in SI units. Seven base SI units: metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol), candela (cd). Derived units built from these. Scientific notation expresses very large/small values. Order of magnitude estimates are within a factor of 10.",
    "svgKey": "ib-phys-1-measurements",
    "landmarks": [
     "Seven SI base units (m, kg, s, A, K, mol, cd)",
     "Derived units",
     "Scientific notation (standard form)",
     "Prefixes (nano-, micro-, milli-, kilo-, mega-, giga-)",
     "Significant figures",
     "Order of magnitude estimates",
     "Dimensional analysis"
    ],
    "examQA": [
     {
      "q": "State the SI units for force, energy and power in terms of base units.",
      "a": "Force (N = kg m s⁻²). Energy (J = kg m² s⁻²). Power (W = kg m² s⁻³)."
     },
     {
      "q": "Express 3.6 × 10⁻⁷ m in nm.",
      "a": "1 nm = 10⁻⁹ m. 3.6 × 10⁻⁷ m ÷ 10⁻⁹ m nm⁻¹ = 360 nm."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/International_System_of_Units"
   },
   {
    "id": "1-2-uncertainties-errors",
    "name": "1.2 Uncertainties and errors",
    "syllabusRef": "not on the current IB guide",
    "section": "Withdrawn from the current IB guide (first assessment 2025)",
    "description": "All measurements have uncertainty. Random errors: unpredictable fluctuations (reduce precision); minimised by repeating. Systematic errors: consistent offset (reduce accuracy); must be corrected. Absolute uncertainty: ± half the smallest scale division. Percentage uncertainty: (absolute/measured)×100. Propagation: add absolute (±) for sums; add % for products/quotients.",
    "svgKey": "ib-phys-1-measurements",
    "landmarks": [
     "Random error (precision, scatter)",
     "Systematic error (accuracy, offset)",
     "Absolute uncertainty",
     "Percentage uncertainty",
     "Addition/subtraction: add absolute uncertainties",
     "Multiplication/division: add % uncertainties",
     "Powers: multiply % uncertainty by power",
     "Error bars on graphs"
    ],
    "examQA": [
     {
      "q": "Distinguish between random error and systematic error.",
      "a": "Random: unpredictable fluctuations in both directions around true value; reduces precision; minimised by repeating and averaging. Systematic: consistent offset in one direction from true value; reduces accuracy; cannot be reduced by repetition — source must be identified and eliminated."
     },
     {
      "q": "t = 5.4 ± 0.2 s, d = 3.2 ± 0.1 m. Calculate % uncertainty in v = d/t.",
      "a": "%unc(d) = 0.1/3.2 × 100 = 3.1%. %unc(t) = 0.2/5.4 × 100 = 3.7%. %unc(v) = 3.1 + 3.7 = 6.8%."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Measurement_uncertainty"
   },
   {
    "id": "1-3-vectors-scalars",
    "name": "1.3 Vectors and scalars",
    "syllabusRef": "A.1",
    "section": "A. Space, time and motion",
    "description": "Scalar: magnitude only (mass, temperature, speed, energy). Vector: magnitude and direction (displacement, velocity, acceleration, force). Vector addition: tip-to-tail or parallelogram. Components: Fx = F cosθ, Fy = F sinθ. Resultant: R = √(Fx²+Fy²). Subtraction: add the negative vector.",
    "svgKey": "ib-phys-1-measurements",
    "landmarks": [
     "Scalar (magnitude only)",
     "Vector (magnitude + direction)",
     "Vector addition (triangle/parallelogram)",
     "Components (Fx = F cosθ)",
     "Resultant magnitude and direction",
     "Vector subtraction",
     "Unit vectors"
    ],
    "examQA": [
     {
      "q": "Resolve a 50 N force at 30° above horizontal into components.",
      "a": "Fx = 50 cos30° = 50 × 0.866 = 43.3 N (horizontal). Fy = 50 sin30° = 50 × 0.5 = 25 N (vertical)."
     },
     {
      "q": "A 3 N force east and 4 N force north: find the resultant.",
      "a": "R = √(3² + 4²) = √25 = 5 N. Direction: θ = arctan(4/3) = 53.1° north of east."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Euclidean_vector"
   },
   {
    "id": "2-1-motion",
    "name": "2.1 Motion",
    "syllabusRef": "A.1",
    "section": "A. Space, time and motion",
    "description": "Kinematics: suvat equations for uniform acceleration: v = u+at, s = ut+½at², v²=u²+2as, s=½(u+v)t. Displacement-time and velocity-time graphs. Projectile motion: horizontal (a=0) and vertical (a=g) are independent. Uniform circular motion: v and a change direction.",
    "svgKey": "ib-phys-2-mechanics",
    "landmarks": [
     "suvat equations (uniform acceleration)",
     "Displacement-time graph (gradient = velocity)",
     "Velocity-time graph (gradient = a, area = s)",
     "Projectile: horizontal uniform, vertical free-fall",
     "Parabolic trajectory",
     "Range, time of flight, maximum height"
    ],
    "examQA": [
     {
      "q": "A ball launched at 20 m s⁻¹ horizontally from 45 m cliff. Time to land and range?",
      "a": "Vertical: 45 = ½×10×t² → t = 3 s. Range = 20 × 3 = 60 m."
     },
     {
      "q": "Derive the suvat equation s = ut + ½at² from a v-t graph.",
      "a": "Area under v-t graph = displacement. Area = rectangle (ut) + triangle (½ × t × at = ½at²). So s = ut + ½at²."
     }
    ],
    "threejs3dFn": "createMotionAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Kinematics"
   },
   {
    "id": "2-2-forces",
    "name": "2.2 Forces",
    "syllabusRef": "A.2",
    "section": "A. Space, time and motion",
    "description": "Newton's three laws: (1) F_net = 0 → constant velocity. (2) F_net = ma. (3) action-reaction pairs are equal and opposite. Free body diagrams. Normal force, friction, tension, weight. Friction: F_f ≤ μN (static: μs; kinetic: μk). Terminal velocity: drag = weight.",
    "svgKey": "ib-phys-2-mechanics",
    "landmarks": [
     "Newton's first law (inertia)",
     "Newton's second law (F = ma)",
     "Newton's third law (action-reaction)",
     "Free body diagram",
     "Weight W = mg",
     "Normal force",
     "Friction Ff = μN",
     "Terminal velocity (drag = weight)"
    ],
    "examQA": [
     {
      "q": "State Newton's second law of motion.",
      "a": "The net force on an object is equal to the rate of change of its momentum: F_net = Δp/Δt = ma (for constant mass). Net force is the vector sum of all forces; direction of net force is the direction of acceleration."
     },
     {
      "q": "An 80 kg skydiver reaches terminal velocity. State the drag force.",
      "a": "At terminal velocity, acceleration = 0. Net force = 0. Drag force = weight = mg = 80 × 10 = 800 N (upward drag equals downward weight)."
     }
    ],
    "threejs3dFn": "createForceVectors",
    "wikiUrl": "https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion"
   },
   {
    "id": "2-3-work-energy-power",
    "name": "2.3 Work energy and power",
    "syllabusRef": "A.3",
    "section": "A. Space, time and motion",
    "description": "Work: W = Fd cosθ. Kinetic energy: Ek = ½mv². Gravitational PE: Ep = mgh. Conservation of mechanical energy (no friction). Work-energy theorem: Wnet = ΔEk. Efficiency: useful output / total input. Power: P = W/t = Fv.",
    "svgKey": "ib-phys-2-mechanics",
    "landmarks": [
     "Work W = Fd cosθ",
     "Kinetic energy Ek = ½mv²",
     "Gravitational PE Ep = mgh",
     "Conservation of energy",
     "Work-energy theorem",
     "Power P = W/t = Fv",
     "Efficiency = Wuseful/Wtotal",
     "Energy transformation (joules)"
    ],
    "examQA": [
     {
      "q": "A 1000 kg car accelerates from rest to 20 m s⁻¹. Calculate the kinetic energy.",
      "a": "Ek = ½mv² = ½ × 1000 × 20² = ½ × 1000 × 400 = 200,000 J = 200 kJ."
     },
     {
      "q": "A 600 W motor lifts a 30 kg mass. Calculate speed of lifting (g=10).",
      "a": "P = Fv. F = mg = 300 N. v = P/F = 600/300 = 2 m s⁻¹."
     }
    ],
    "threejs3dFn": "createEnergyTransfer",
    "wikiUrl": "https://en.wikipedia.org/wiki/Work_(physics)"
   },
   {
    "id": "2-4-momentum-impulse",
    "name": "2.4 Momentum and impulse",
    "syllabusRef": "A.2",
    "section": "A. Space, time and motion",
    "description": "Momentum: p = mv. Impulse: J = FΔt = Δp. Conservation of momentum: in any closed system, total momentum is constant. Elastic collision: KE conserved. Inelastic: KE not conserved. Perfectly inelastic: objects stick together. Law holds in all inertial reference frames.",
    "svgKey": "ib-phys-2-mechanics",
    "landmarks": [
     "Momentum p = mv (vector)",
     "Impulse J = FΔt = Δp",
     "Conservation of momentum",
     "Elastic collision (KE conserved)",
     "Inelastic collision (KE not conserved)",
     "Perfectly inelastic (objects stick)",
     "Explosions (conservation applies)",
     "F-t graph: area = impulse"
    ],
    "examQA": [
     {
      "q": "A 2 kg ball at 5 m s⁻¹ east collides with a 3 kg ball at rest; they stick. Find final velocity.",
      "a": "Total p before = 2×5 + 3×0 = 10 kg m s⁻¹. p conserved: (2+3)v = 10. v = 10/5 = 2 m s⁻¹ east."
     },
     {
      "q": "State Newton's third law in terms of momentum.",
      "a": "Newton's third law: forces in an action-reaction pair are equal and opposite. Hence impulse on each object is equal and opposite: ΔpA = −ΔpB. Total momentum change = 0 → conservation of momentum."
     }
    ],
    "threejs3dFn": "createCollisionAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Momentum"
   },
   {
    "id": "3-1-thermal-concepts",
    "name": "3.1 Thermal concepts",
    "syllabusRef": "B.1",
    "section": "B. The particulate nature of matter",
    "description": "Temperature is proportional to average translational kinetic energy of particles. Internal energy: sum of all kinetic and potential energies of particles. Specific heat capacity: Q = mcΔT. Specific latent heat: Q = mL (at phase change, T constant). Heating curve shows temperature vs energy input.",
    "svgKey": "ib-phys-3-thermal",
    "landmarks": [
     "Temperature ∝ average Ek",
     "Internal energy (kinetic + potential)",
     "Heat transfer mechanisms",
     "Specific heat capacity Q = mcΔT",
     "Specific latent heat Q = mL",
     "Latent heat of fusion / vaporisation",
     "Heating curve (flat regions at phase change)"
    ],
    "examQA": [
     {
      "q": "Distinguish between internal energy and temperature.",
      "a": "Temperature: proportional to average translational kinetic energy per particle; measured in Kelvin. Internal energy: total of all kinetic AND potential energies of ALL particles; proportional to amount of substance. Same temperature, more substance → more internal energy."
     },
     {
      "q": "Calculate energy to heat 2 kg water 20°C→100°C then vaporise it (c=4200, L=2.26×10⁶ J kg⁻¹).",
      "a": "Heating: Q1 = 2 × 4200 × 80 = 672,000 J. Vaporisation: Q2 = 2 × 2.26×10⁶ = 4,520,000 J. Total = 5,192,000 J ≈ 5.19 MJ."
     }
    ],
    "threejs3dFn": "createParticleStates",
    "wikiUrl": "https://en.wikipedia.org/wiki/Thermodynamics"
   },
   {
    "id": "3-2-modelling-gas",
    "name": "3.2 Modelling a gas",
    "syllabusRef": "B.3",
    "section": "B. The particulate nature of matter",
    "description": "Ideal gas assumptions: point particles, elastic collisions, no intermolecular forces, random motion, negligible collision time. Ideal gas law: pV = nRT. Boltzmann: pV = NkT. Pressure from kinetic theory: p = Nmv²/3V. Real gases deviate at high pressure/low temperature.",
    "svgKey": "ib-phys-3-thermal",
    "landmarks": [
     "Ideal gas assumptions (5 points)",
     "pV = nRT (n in moles, R=8.31)",
     "pV = NkT (N in particles, k=1.38×10⁻²³)",
     "Pressure from momentum change",
     "p = Nm<v²>/3V",
     "Average Ek = 3kT/2 = 3RT/2NA",
     "Real gas deviations (high P, low T)"
    ],
    "examQA": [
     {
      "q": "State the five assumptions of the kinetic model of an ideal gas.",
      "a": "1. Gas consists of point-like particles (volume negligible). 2. No intermolecular forces except during collisions. 3. Collisions are perfectly elastic. 4. Particles are in continuous random motion. 5. Duration of collisions is negligible compared to time between collisions."
     },
     {
      "q": "A gas at 27°C and 2 atm in 10 L. Find n using pV=nRT (R=8.31, 1 atm=101325 Pa).",
      "a": "T = 300 K. p = 2×101325 = 202650 Pa. V = 10×10⁻³ = 0.010 m³. n = pV/RT = 202650×0.010/(8.31×300) = 2026.5/2493 = 0.813 mol."
     }
    ],
    "threejs3dFn": "createPressureParticles",
    "wikiUrl": "https://en.wikipedia.org/wiki/Ideal_gas"
   },
   {
    "id": "4-1-oscillations",
    "name": "4.1 Oscillations",
    "syllabusRef": "C.1",
    "section": "C. Wave behaviour",
    "description": "Simple harmonic motion (SHM): restoring force ∝ displacement, F = −kx. Period T = 2π√(m/k) (spring); T = 2π√(L/g) (pendulum). x = A cos(ωt), v = −Aω sin(ωt), a = −Aω² cos(ωt). Energy: Ek + Ep = constant = ½kA². Resonance: driving frequency = natural frequency.",
    "svgKey": "ib-phys-4-waves",
    "landmarks": [
     "SHM: a ∝ −x (restoring force)",
     "Angular frequency ω = 2π/T",
     "x = A cos(ωt)",
     "v max at equilibrium = Aω",
     "a max at amplitude = Aω²",
     "Spring: T = 2π√(m/k)",
     "Pendulum: T = 2π√(L/g)",
     "Energy in SHM (Ek + Ep = const)"
    ],
    "examQA": [
     {
      "q": "State the conditions for SHM.",
      "a": "1. A restoring force acts on the object. 2. The restoring force is directly proportional to the displacement from the equilibrium position. 3. The restoring force is always directed toward the equilibrium position. Result: acceleration a ∝ −displacement (a = −ω²x)."
     },
     {
      "q": "A 0.5 kg mass on a spring stretches it 0.2 m. Calculate T (g=10).",
      "a": "k = F/x = 0.5×10/0.2 = 25 N m⁻¹. T = 2π√(m/k) = 2π√(0.5/25) = 2π√0.02 = 2π × 0.141 = 0.889 s ≈ 0.89 s."
     }
    ],
    "threejs3dFn": "createPendulum",
    "wikiUrl": "https://en.wikipedia.org/wiki/Simple_harmonic_motion"
   },
   {
    "id": "4-2-travelling-waves",
    "name": "4.2 Travelling waves",
    "syllabusRef": "C.2",
    "section": "C. Wave behaviour",
    "description": "Wave: transfer of energy without transfer of matter. Transverse: oscillation ⊥ wave direction (EM waves, surface water). Longitudinal: oscillation ∥ wave direction (sound). Wave equation: v = fλ. Intensity: I = P/A; I ∝ A² (amplitude squared). Electromagnetic spectrum: radio to gamma.",
    "svgKey": "ib-phys-4-waves",
    "landmarks": [
     "Transverse vs longitudinal waves",
     "Displacement, amplitude, wavelength",
     "Wave speed v = fλ",
     "Period T = 1/f",
     "Intensity I = P/A, I ∝ A²",
     "Electromagnetic spectrum",
     "Speed of light c = 3×10⁸ m s⁻¹",
     "Inverse square law for point sources"
    ],
    "examQA": [
     {
      "q": "A wave has frequency 400 Hz and wavelength 0.85 m. Calculate wave speed.",
      "a": "v = fλ = 400 × 0.85 = 340 m s⁻¹ (speed of sound in air at ~20°C)."
     },
     {
      "q": "Distinguish between transverse and longitudinal waves.",
      "a": "Transverse: particles oscillate perpendicular to the direction of wave travel. Examples: EM waves, S-seismic waves, water surface waves. Longitudinal: particles oscillate parallel to wave travel direction (compressions and rarefactions). Examples: sound waves, P-seismic waves."
     }
    ],
    "threejs3dFn": "createWave3D",
    "wikiUrl": "https://en.wikipedia.org/wiki/Wave"
   },
   {
    "id": "4-3-wave-characteristics",
    "name": "4.3 Wave characteristics",
    "syllabusRef": "C.3",
    "section": "C. Wave behaviour",
    "description": "Superposition principle: resultant displacement = sum of individual displacements. Constructive interference: path difference = nλ. Destructive interference: path difference = (n+½)λ. Wavefronts and rays. Huygens' principle. Polarisation: transverse waves only; polariser transmits one plane. Malus's law: I = I₀ cos²θ.",
    "svgKey": "ib-phys-4-waves",
    "landmarks": [
     "Superposition principle",
     "Constructive interference (path diff = nλ)",
     "Destructive interference (path diff = (n+½)λ)",
     "Phase difference",
     "Wavefronts and Huygens' principle",
     "Polarisation (transverse waves only)",
     "Polariser and analyser",
     "Malus's law I = I₀cos²θ"
    ],
    "examQA": [
     {
      "q": "State the condition for constructive and destructive interference.",
      "a": "Constructive: path difference = nλ (n = 0,1,2,...); waves arrive in phase → amplitude adds. Destructive: path difference = (n+½)λ; waves arrive 180° out of phase → amplitude cancels. For sound/light from two coherent sources."
     },
     {
      "q": "Polarised light of intensity I₀ passes through an analyser at 60° to polariser. Find I.",
      "a": "Malus's law: I = I₀ cos²θ = I₀ cos²60° = I₀ × (0.5)² = 0.25 I₀."
     }
    ],
    "threejs3dFn": "createWave3D",
    "wikiUrl": "https://en.wikipedia.org/wiki/Wave"
   },
   {
    "id": "4-4-wave-behaviour",
    "name": "4.4 Wave behaviour",
    "syllabusRef": "C.3",
    "section": "C. Wave behaviour",
    "description": "Reflection: angle of incidence = angle of reflection. Refraction: waves change speed/direction at boundary; Snell's law n₁sinθ₁ = n₂sinθ₂. Total internal reflection: when θ > critical angle (sinθc = n₂/n₁). Diffraction: waves spread through gaps or around obstacles; significant when gap ≈ λ.",
    "svgKey": "ib-phys-4-waves",
    "landmarks": [
     "Law of reflection",
     "Snell's law (n₁sinθ₁ = n₂sinθ₂)",
     "Refractive index n = c/v",
     "Total internal reflection",
     "Critical angle: sinθc = 1/n",
     "Diffraction (gap ≈ λ → significant spreading)",
     "Applications: optical fibres, prisms"
    ],
    "examQA": [
     {
      "q": "A ray passes from glass (n=1.5) to air. Calculate the critical angle.",
      "a": "sinθc = n₂/n₁ = 1.0/1.5 = 0.667. θc = arcsin(0.667) = 41.8°. At angles greater than 41.8°, total internal reflection occurs."
     },
     {
      "q": "Explain why diffraction is more significant when the gap is smaller.",
      "a": "Diffraction is significant when gap width ≈ wavelength. If gap >> λ, the wave passes through with little spreading (like a beam). If gap ≈ λ, spreading is pronounced (full semicircle). If gap < λ, the gap becomes a point source of waves."
     }
    ],
    "threejs3dFn": "createWave3D",
    "wikiUrl": "https://en.wikipedia.org/wiki/Diffraction"
   },
   {
    "id": "4-5-standing-waves",
    "name": "4.5 Standing waves",
    "syllabusRef": "C.4",
    "section": "C. Wave behaviour",
    "description": "Standing waves form from superposition of two identical waves travelling in opposite directions. Nodes: zero displacement. Antinodes: maximum displacement. For string fixed both ends: L = n(λ/2). For pipes: open both (antinodes at ends); closed one end (node at closed end). Harmonics and overtones.",
    "svgKey": "ib-phys-4-waves",
    "landmarks": [
     "Standing wave (superposition of opposites)",
     "Nodes (zero displacement)",
     "Antinodes (maximum displacement)",
     "String: L = nλ/2; f = nv/2L",
     "Pipe open both ends: same as string",
     "Pipe closed one end: L = nλ/4, odd harmonics only",
     "Fundamental (1st harmonic)",
     "Overtones"
    ],
    "examQA": [
     {
      "q": "Determine the fundamental frequency of a 0.8 m string (v = 320 m s⁻¹).",
      "a": "Fundamental: L = λ/2 → λ = 2L = 1.6 m. f = v/λ = 320/1.6 = 200 Hz."
     },
     {
      "q": "Distinguish between nodes and antinodes in a standing wave.",
      "a": "Node: a point of zero displacement at all times; two superposing waves always cancel here; spaced λ/2 apart. Antinode: a point of maximum displacement; waves always reinforce; located midway between nodes. No net energy transfer in a standing wave."
     }
    ],
    "threejs3dFn": "createWave3D",
    "wikiUrl": "https://en.wikipedia.org/wiki/Standing_wave"
   },
   {
    "id": "5-1-electric-fields",
    "name": "5.1 Electric fields",
    "syllabusRef": "D.2",
    "section": "D. Fields",
    "description": "Electric force: F = kq₁q₂/r² (Coulomb). Electric field E = F/q = kQ/r². Field lines show direction and strength. Uniform field between parallel plates: E = V/d. Electric potential V = kQ/r. Potential energy = qV. Work done = qΔV. Electron volt: 1 eV = 1.6×10⁻¹⁹ J.",
    "svgKey": "ib-phys-5-electricity-magnetism",
    "landmarks": [
     "Coulomb's law F = kq₁q₂/r²",
     "Electric field E = F/q (N C⁻¹)",
     "Field lines (direction of force on +q)",
     "Point charge field E = kQ/r²",
     "Uniform field E = V/d",
     "Electric potential V = kQ/r",
     "Potential energy Ep = qV",
     "Electron volt (1 eV = 1.6×10⁻¹⁹ J)"
    ],
    "examQA": [
     {
      "q": "Calculate the electric force between two point charges of +2 µC and −3 µC, 0.5 m apart (k=9×10⁹).",
      "a": "F = kq₁q₂/r² = 9×10⁹ × 2×10⁻⁶ × 3×10⁻⁶ / 0.5² = 9×10⁹ × 6×10⁻¹² / 0.25 = 54×10⁻³ / 0.25 = 0.216 N. Attractive (opposite charges)."
     },
     {
      "q": "What is the electric field between plates 5 mm apart with 200 V potential difference?",
      "a": "E = V/d = 200/(5×10⁻³) = 40,000 V m⁻¹ = 4×10⁴ N C⁻¹. Direction: from + plate to − plate."
     }
    ],
    "threejs3dFn": "createFieldLines('electric')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Electric_field"
   },
   {
    "id": "5-2-heating-electric-currents",
    "name": "5.2 Heating effect of electric currents",
    "syllabusRef": "B.5",
    "section": "B. The particulate nature of matter",
    "description": "Current I = ΔQ/Δt. Resistance R = V/I (Ohm's law). Resistivity ρ: R = ρL/A. Power: P = IV = I²R = V²/R. Energy E = Pt. Series circuit: same current. Parallel circuit: same voltage. Kirchhoff's laws: sum of currents at node = 0; sum of EMFs in loop = sum of potential drops.",
    "svgKey": "ib-phys-5-electricity-magnetism",
    "landmarks": [
     "Current I = ΔQ/Δt (ampere)",
     "Ohm's law V = IR",
     "Resistance R = ρL/A",
     "Power P = IV = I²R = V²/R",
     "Series: R_total = R1+R2; same I",
     "Parallel: 1/R_total = 1/R1 + 1/R2; same V",
     "Kirchhoff's current law (ΣI = 0)",
     "Kirchhoff's voltage law (ΣEMF = ΣIR)"
    ],
    "examQA": [
     {
      "q": "Three resistors (2Ω, 3Ω, 6Ω) are in parallel. Calculate total resistance.",
      "a": "1/R = 1/2 + 1/3 + 1/6 = 3/6 + 2/6 + 1/6 = 6/6 = 1. R = 1 Ω."
     },
     {
      "q": "A 240 V heater draws 5 A. Calculate its resistance and power.",
      "a": "R = V/I = 240/5 = 48 Ω. P = IV = 5 × 240 = 1200 W = 1.2 kW."
     }
    ],
    "threejs3dFn": "createEnergyTransfer",
    "wikiUrl": "https://en.wikipedia.org/wiki/Ohm%27s_law"
   },
   {
    "id": "5-3-electric-cells",
    "name": "5.3 Electric cells",
    "syllabusRef": "B.5",
    "section": "B. The particulate nature of matter",
    "description": "EMF (ε): energy supplied per unit charge by source. Terminal voltage < EMF when current flows due to internal resistance r. V_terminal = ε − Ir. Short circuit: V = 0; I = ε/r. Battery: source of constant EMF. Cells in series: total EMF = sum. Cells in parallel: EMF same, internal resistance reduced.",
    "svgKey": "ib-phys-5-electricity-magnetism",
    "landmarks": [
     "EMF ε (energy per charge)",
     "Internal resistance r",
     "Terminal voltage V = ε − Ir",
     "Short circuit current I = ε/r",
     "Maximum power transfer",
     "Cells in series (EMFs add)",
     "Cells in parallel (same EMF, r reduced)",
     "V-I characteristic of source"
    ],
    "examQA": [
     {
      "q": "A battery with EMF 12 V and internal resistance 2 Ω drives current through 10 Ω. Find terminal voltage.",
      "a": "I = ε/(R+r) = 12/(10+2) = 1 A. V_terminal = ε − Ir = 12 − 1×2 = 10 V. (Or V = IR = 1×10 = 10 V.)"
     },
     {
      "q": "Explain why a battery's terminal voltage is less than its EMF under load.",
      "a": "EMF is the energy per unit charge supplied by the chemical reaction. Some energy is dissipated in the internal resistance of the battery (Ir drop). Terminal voltage = EMF − voltage drop across internal resistance = ε − Ir. Greater current → greater internal voltage drop → terminal voltage decreases."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Electromotive_force"
   },
   {
    "id": "5-4-magnetic-effects",
    "name": "5.4 Magnetic effects of electric currents",
    "syllabusRef": "D.3",
    "section": "D. Fields",
    "description": "Magnetic force on moving charge: F = qvB sinθ (left-hand rule for negative charges; Fleming's left-hand rule for conventional current). Force on current-carrying conductor: F = BIL sinθ. Magnetic fields of solenoid and straight wire. DC motor. Magnetic force between parallel wires (note: since the 2019 SI revision the ampere is defined by fixing e, not by this force).",
    "svgKey": "ib-phys-5-electricity-magnetism",
    "landmarks": [
     "F = qvB sinθ (Lorentz force)",
     "Fleming's left-hand rule",
     "F = BIL sinθ",
     "Magnetic field: solenoid, straight wire",
     "Right-hand corkscrew rule for B",
     "DC motor principle",
     "Force between parallel conductors",
     "Ampere definition"
    ],
    "examQA": [
     {
      "q": "A proton (q=1.6×10⁻¹⁹ C) moves at 3×10⁵ m s⁻¹ perpendicular to B=0.5 T. Calculate F.",
      "a": "F = qvB sinθ = 1.6×10⁻¹⁹ × 3×10⁵ × 0.5 × sin90° = 2.4×10⁻¹⁴ N."
     },
     {
      "q": "Describe the path of a charged particle entering a uniform magnetic field perpendicularly.",
      "a": "F = qvB is always perpendicular to v → centripetal force → circular motion. Radius r = mv/(qB). Speed unchanged (force ⊥ velocity → no work done). Greater speed or mass → larger radius; greater charge or B → smaller radius."
     }
    ],
    "threejs3dFn": "createFieldLines('magnetic')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Magnetism"
   },
   {
    "id": "6-1-circular-motion",
    "name": "6.1 Circular motion",
    "syllabusRef": "A.2",
    "section": "A. Space, time and motion",
    "description": "Uniform circular motion: constant speed but changing velocity direction. Centripetal acceleration: a = v²/r = ω²r (directed toward centre). Centripetal force: F = mv²/r (not a new force; provided by tension, gravity, normal force, friction). Period T = 2πr/v = 2π/ω. Angular velocity ω = 2π/T.",
    "svgKey": "ib-phys-6-circular-gravitation",
    "landmarks": [
     "Angular velocity ω = 2πf = v/r",
     "Period T = 2π/ω",
     "Centripetal acceleration a = v²/r = ω²r",
     "Centripetal force F = mv²/r = mω²r",
     "Direction: toward centre",
     "Not a new force — provided by other forces",
     "Examples: car on curved road, planet in orbit",
     "Banking of road"
    ],
    "examQA": [
     {
      "q": "A 500 g ball on a 0.8 m string makes 2 revolutions per second. Calculate centripetal force.",
      "a": "ω = 2πf = 2π×2 = 4π rad s⁻¹. F = mω²r = 0.5 × (4π)² × 0.8 = 0.5 × 158 × 0.8 = 63.2 N."
     },
     {
      "q": "What provides the centripetal force for a satellite in circular orbit?",
      "a": "The gravitational force from Earth provides the centripetal force. There is no outward \"centrifugal force\" in an inertial reference frame. Gravity pulls satellite toward Earth's centre; this centripetal force keeps satellite in circular path."
     }
    ],
    "threejs3dFn": "createOrbitAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Circular_motion"
   },
   {
    "id": "6-2-newtons-law-gravitation",
    "name": "6.2 Newton's law of gravitation",
    "syllabusRef": "D.1",
    "section": "D. Fields",
    "description": "Newton's universal law: F = Gm₁m₂/r². G = 6.67×10⁻¹¹ N m² kg⁻². Gravitational field strength g = GM/r² (= F/m). Orbital mechanics: for circular orbit, F_grav = F_centripetal. Escape speed: v_esc = √(2GM/R). Kepler's third law: T² ∝ r³.",
    "svgKey": "ib-phys-6-circular-gravitation",
    "landmarks": [
     "Newton's law F = Gm₁m₂/r²",
     "G = 6.67×10⁻¹¹ N m² kg⁻²",
     "Gravitational field g = GM/r²",
     "Orbital speed: v = √(GM/r)",
     "Period from circular orbit T² ∝ r³",
     "Kepler's third law",
     "Escape speed v_esc = √(2GM/R)",
     "Gravitational potential energy Ep = −GMm/r"
    ],
    "examQA": [
     {
      "q": "Calculate the gravitational force between Earth (M=6×10²⁴ kg) and Moon (m=7×10²² kg) at r=3.8×10⁸ m.",
      "a": "F = Gm₁m₂/r² = 6.67×10⁻¹¹ × 6×10²⁴ × 7×10²² / (3.8×10⁸)² = 6.67×10⁻¹¹ × 4.2×10⁴⁷ / 1.44×10¹⁷ = 1.95×10²⁰ N."
     },
     {
      "q": "A satellite orbits at radius r. Derive an expression for its orbital period.",
      "a": "F_grav = F_centripetal: GMm/r² = mv²/r. v² = GM/r. Period T = 2πr/v = 2πr/√(GM/r) = 2π√(r³/GM). Hence T² = 4π²r³/(GM) → T² ∝ r³ (Kepler's third law)."
     }
    ],
    "threejs3dFn": "createOrbitAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation"
   },
   {
    "id": "7-1-discrete-energy-radioactivity",
    "name": "7.1 Discrete energy and radioactivity",
    "syllabusRef": "E.1",
    "section": "E. Nuclear and quantum physics",
    "description": "Discrete atomic energy levels: atoms absorb and emit specific photon energies. E = hf = hc/λ. Photoelectric effect: E_photon = hf = φ + Ek_max. Emission and absorption spectra. Radioactive decay: alpha (α, ⁴₂He), beta− (β⁻, e⁻), gamma (γ). Activity A = λN. Half-life t½ = ln2/λ. N = N₀e^(−λt).",
    "svgKey": "ib-phys-7-atomic-nuclear",
    "landmarks": [
     "Discrete energy levels",
     "E = hf (photon energy)",
     "Photoelectric effect: φ + Ek = hf",
     "Emission vs absorption spectra",
     "Alpha decay (α: ⁴₂He, short range)",
     "Beta decay (β⁻: electron, medium range)",
     "Gamma (γ: photon, long range)",
     "Half-life: N = N₀e^(−λt)"
    ],
    "examQA": [
     {
      "q": "Light of frequency 8×10¹⁴ Hz hits a metal with work function 2.5 eV. Find max Ek of electrons.",
      "a": "E_photon = hf = 6.63×10⁻³⁴ × 8×10¹⁴ = 5.3×10⁻¹⁹ J = 3.31 eV. Ek_max = hf − φ = 3.31 − 2.5 = 0.81 eV."
     },
     {
      "q": "A sample has half-life 6 hours. What fraction remains after 24 hours?",
      "a": "Number of half-lives = 24/6 = 4. Fraction remaining = (½)⁴ = 1/16."
     }
    ],
    "threejs3dFn": "createNucleus",
    "wikiUrl": "https://en.wikipedia.org/wiki/Radioactive_decay"
   },
   {
    "id": "7-2-nuclear-reactions",
    "name": "7.2 Nuclear reactions",
    "syllabusRef": "E.3",
    "section": "E. Nuclear and quantum physics",
    "description": "Mass defect: mass of nucleus < sum of nucleon masses. Binding energy = mass defect × c². ΔE = Δmc². Nuclear fission: heavy nucleus splits into lighter fragments + neutrons + energy (chain reaction). Nuclear fusion: light nuclei combine to form heavier nucleus + energy. BE/nucleon: peak at Fe-56 → most stable.",
    "svgKey": "ib-phys-7-atomic-nuclear",
    "landmarks": [
     "Mass defect Δm",
     "Binding energy = Δmc²",
     "BE per nucleon curve",
     "Iron-56: most stable (max BE/nucleon)",
     "Nuclear fission (chain reaction)",
     "Critical mass",
     "Nuclear fusion",
     "Q-value of nuclear reactions"
    ],
    "examQA": [
     {
      "q": "Explain what is meant by mass defect and binding energy.",
      "a": "Mass defect: the mass of a nucleus is less than the sum of the masses of its separate protons and neutrons. Mass defect Δm = (Z·mp + N·mn) − M_nucleus. Binding energy E = Δm·c²: the energy equivalent of mass defect; energy that must be supplied to completely separate all nucleons. Greater binding energy = more stable nucleus."
     },
     {
      "q": "Explain why both fission and fusion release energy.",
      "a": "Fission: very heavy nuclei (e.g. U-235) have low BE/nucleon. Splitting produces medium-mass nuclei with higher BE/nucleon → energy released = difference in total binding energy. Fusion: very light nuclei (H, He) have low BE/nucleon. Combining → nucleus with higher BE/nucleon → energy released. Both move toward the more stable region of the BE/nucleon curve."
     }
    ],
    "threejs3dFn": "createNucleus",
    "wikiUrl": "https://en.wikipedia.org/wiki/Nuclear_reaction"
   },
   {
    "id": "7-3-structure-matter",
    "name": "7.3 The structure of matter",
    "syllabusRef": "not on the current IB guide",
    "section": "Withdrawn from the current IB guide (first assessment 2025)",
    "description": "Standard model: matter built from quarks and leptons. Quarks: up (u), down (d), strange (s), charm (c), bottom (b), top (t). Proton: uud. Neutron: udd. Baryons (3 quarks), mesons (quark-antiquark). Leptons: electron, muon, tau, and their neutrinos. Four fundamental forces: strong, electromagnetic, weak, gravitational.",
    "svgKey": "ib-phys-7-atomic-nuclear",
    "landmarks": [
     "Quarks: u, d, s, c, b, t (and antiquarks)",
     "Proton = uud, neutron = udd",
     "Baryons (3 quarks), mesons (q+q̄)",
     "Hadrons (feel strong force)",
     "Leptons (e, µ, τ, νe, νµ, ντ)",
     "Four fundamental forces",
     "Exchange particles (gluons, W±, Z⁰, photons)",
     "Conservation laws (charge, baryon, lepton number)"
    ],
    "examQA": [
     {
      "q": "State the quark content of a proton and a neutron.",
      "a": "Proton: uud (two up quarks, one down quark). Charge = +2/3 + 2/3 − 1/3 = +1. Neutron: udd (one up, two down). Charge = +2/3 − 1/3 − 1/3 = 0."
     },
     {
      "q": "State one difference between hadrons and leptons.",
      "a": "Hadrons: composed of quarks; feel the strong nuclear force; include protons, neutrons, pions. Leptons: fundamental particles (not made of quarks); do not feel the strong force; include electrons, muons, neutrinos. Also: hadrons are much more massive than typical leptons."
     }
    ],
    "threejs3dFn": "createNucleus",
    "wikiUrl": "https://en.wikipedia.org/wiki/Standard_Model"
   },
   {
    "id": "8-1-energy-sources",
    "name": "8.1 Energy sources",
    "syllabusRef": "not on the current IB guide",
    "section": "Withdrawn from the current IB guide (first assessment 2025)",
    "description": "Primary energy sources: fossil fuels (coal, oil, gas), nuclear, renewable (solar, wind, hydro, geothermal, tidal). Energy density: nuclear fuel is by far the highest (~10⁶ × fossil fuels); fossil fuels are well above renewables and batteries. Sankey diagrams show energy flows. Electricity generation: rotating turbines in magnetic fields. Efficiency = useful output / total input. Global energy use and trends.",
    "svgKey": "ib-phys-8-energy-production",
    "landmarks": [
     "Primary energy sources",
     "Fossil fuels (coal, oil, natural gas)",
     "Nuclear fission reactors",
     "Renewable: solar, wind, hydro, wave, tidal",
     "Sankey diagrams",
     "Efficiency = P_useful/P_input",
     "Global energy consumption",
     "Carbon capture"
    ],
    "examQA": [
     {
      "q": "Explain why fossil fuels still dominate global energy supply despite climate impacts.",
      "a": "Fossil fuels have high energy density (easily stored and transported), established infrastructure, relatively low extraction costs, and provide reliable baseload energy (unlike intermittent solar/wind). Switching requires large capital investment in new infrastructure and grid storage. Political and economic factors also delay transition."
     },
     {
      "q": "Explain the operation of a nuclear fission reactor.",
      "a": "Fuel: enriched uranium (U-235). Fission: neutron absorbed → U-235 splits → daughter nuclei + 2-3 neutrons + energy (heat). Control rods (boron/cadmium): absorb neutrons to control chain reaction. Moderator (water/graphite): slow neutrons for efficient fission. Heat exchanger: transfers thermal energy to steam → turbine → generator."
     }
    ],
    "threejs3dFn": "createEnergyTransfer",
    "wikiUrl": "https://en.wikipedia.org/wiki/Energy_source"
   },
   {
    "id": "8-2-thermal-energy-transfer",
    "name": "8.2 Thermal energy transfer",
    "syllabusRef": "B.1",
    "section": "B. The particulate nature of matter",
    "description": "Three mechanisms: conduction, convection, radiation. Conduction: vibration of adjacent particles (best in metals). Convection: bulk movement of fluid due to density differences. Radiation: EM waves (infrared); rate ∝ T⁴ (Stefan-Boltzmann law). Greenhouse effect: atmosphere absorbs outgoing IR. Albedo: fraction of radiation reflected.",
    "svgKey": "ib-phys-8-energy-production",
    "landmarks": [
     "Conduction (metals best)",
     "Convection (bulk fluid movement)",
     "Radiation (EM, no medium needed)",
     "Stefan-Boltzmann law: P = σAT⁴",
     "σ = 5.67×10⁻⁸ W m⁻² K⁻⁴",
     "Albedo (reflected fraction)",
     "Greenhouse effect",
     "Emissivity and black body radiation"
    ],
    "examQA": [
     {
      "q": "Distinguish between conduction, convection and radiation.",
      "a": "Conduction: energy transfer by particle vibrations passing to adjacent particles; requires medium; fastest in metals (free electrons). Convection: energy transfer by bulk movement of fluid (density-driven or forced); requires fluid medium. Radiation: energy transfer by EM waves; does not require medium; occurs in vacuum."
     },
     {
      "q": "A star has surface temperature 6000 K and radius 7×10⁸ m. Calculate luminosity (σ=5.67×10⁻⁸).",
      "a": "P = σAT⁴ = σ × 4πR² × T⁴ = 5.67×10⁻⁸ × 4π × (7×10⁸)² × 6000⁴. 4πR² = 6.16×10¹⁸ m². T⁴ = 1.296×10¹⁵. P = 5.67×10⁻⁸ × 6.16×10¹⁸ × 1.296×10¹⁵ ≈ 4.5×10²⁶ W."
     }
    ],
    "threejs3dFn": "createHeatConduction",
    "wikiUrl": "https://en.wikipedia.org/wiki/Heat_transfer"
   },
   {
    "id": "9-1-simple-harmonic-motion",
    "name": "9.1 Simple harmonic motion",
    "syllabusRef": "C.1",
    "section": "C. Wave behaviour",
    "description": "In SHM: x = x₀ sin(ωt + φ). Energy: Ek = ½mω²(x₀²−x²), Ep = ½mω²x². Total energy = ½mω²x₀² = constant. Resonance: driving frequency = natural frequency → maximum amplitude. Q-factor (quality factor) measures sharpness of resonance: Q = f₀/Δf. Forced and free oscillations. Damping types: light, critical, heavy.",
    "svgKey": "ib-phys-9-wave-phenomena",
    "landmarks": [
     "x = x₀ sin(ωt)",
     "Ek = ½mω²(A²−x²)",
     "Ep = ½mω²x²",
     "E_total = ½mω²A²",
     "Resonance (f_drive = f_natural)",
     "Q-factor",
     "Damping (light, critical, heavy)",
     "Driven oscillations + resonance curves"
    ],
    "examQA": [
     {
      "q": "Derive the expression for maximum velocity in SHM.",
      "a": "Ek = E_total − Ep. At equilibrium (x=0): Ek is maximum = E_total = ½mω²A². ½mv²_max = ½mω²A². v_max = ωA."
     },
     {
      "q": "Explain resonance and its practical importance.",
      "a": "Resonance occurs when the driving frequency equals the natural frequency of the system. Energy input each cycle matches energy dissipation; amplitude builds up to maximum (limited only by damping). Important in: tuning circuits (radio), musical instruments, bridge design (Millennium Bridge lateral resonance; note Tacoma Narrows 1940 was aeroelastic flutter, not simple resonance). MRI uses nuclear magnetic resonance."
     }
    ],
    "threejs3dFn": "createPendulum",
    "wikiUrl": "https://en.wikipedia.org/wiki/Resonance"
   },
   {
    "id": "9-2-single-slit-diffraction",
    "name": "9.2 Single-slit diffraction",
    "syllabusRef": "C.3",
    "section": "C. Wave behaviour",
    "description": "Single-slit diffraction pattern: central maximum (width 2λ/b), minima at sinθ = nλ/b. Intensity distribution: central bright maximum flanked by weaker secondary maxima. Width of central maximum: wider for smaller slit width (b) or longer wavelength. Electrons and other particles also diffract (de Broglie).",
    "svgKey": "ib-phys-9-wave-phenomena",
    "landmarks": [
     "Single-slit: minima at sinθ = nλ/b",
     "Central maximum width = 2λ/b (or 2λD/b on screen)",
     "b: slit width",
     "Secondary maxima decrease in intensity",
     "Larger slit → narrower central maximum",
     "Diffraction of electrons (matter waves)",
     "de Broglie wavelength λ = h/p"
    ],
    "examQA": [
     {
      "q": "State the condition for the first minimum in single-slit diffraction.",
      "a": "First minimum (n=1): sinθ = λ/b. Where λ is wavelength and b is slit width. At this angle, waves from the top and middle of the slit are exactly half a wavelength out of phase, cancelling in pairs throughout the slit."
     },
     {
      "q": "Explain why a narrower slit produces a wider diffraction pattern.",
      "a": "Position of first minimum: sinθ = λ/b. As b decreases, sinθ increases → θ increases → central maximum is wider. With very small slit (b ≈ λ), light spreads in all directions (full semicircle). This is a fundamental wave property: tighter confinement → greater angular spread."
     }
    ],
    "threejs3dFn": "createWave3D",
    "wikiUrl": "https://en.wikipedia.org/wiki/Diffraction"
   },
   {
    "id": "9-3-interference",
    "name": "9.3 Interference",
    "syllabusRef": "C.3",
    "section": "C. Wave behaviour",
    "description": "Young's double slit: maxima at dsinθ = nλ; fringe spacing y = λD/d. Conditions for observable interference: coherent sources (same frequency, constant phase difference), same wavelength, similar amplitudes. Thin film interference: path difference = 2nt (× phase shift at denser medium interface). Optical path length.",
    "svgKey": "ib-phys-9-wave-phenomena",
    "landmarks": [
     "Young's double slit: d sinθ = nλ",
     "Fringe spacing y = λD/d",
     "Coherent sources (constant Δφ)",
     "Path difference → phase difference",
     "Constructive (Δx = nλ), destructive (Δx = (n+½)λ)",
     "Thin film interference",
     "Phase change at denser medium (180°)",
     "Optical path length = nt"
    ],
    "examQA": [
     {
      "q": "Young's double slit: d=0.1 mm, D=2 m, λ=600 nm. Find fringe spacing.",
      "a": "y = λD/d = 600×10⁻⁹ × 2 / 0.1×10⁻³ = 1200×10⁻⁹ / 10⁻⁴ = 1.2×10⁻² m = 12 mm."
     },
     {
      "q": "Explain the condition for constructive interference in a thin film of soap.",
      "a": "Light reflects from both surfaces of the thin film. At the top surface (air→soap, denser): phase change of 180° (π). At bottom (soap→air, less dense): no phase change. Optical path difference = 2nt. Constructive: 2nt = (m+½)λ (the extra half-wavelength from reflection compensates). m = 0,1,2... gives different wavelengths enhanced."
     }
    ],
    "threejs3dFn": "createWave3D",
    "wikiUrl": "https://en.wikipedia.org/wiki/Interference_(wave_propagation)"
   },
   {
    "id": "9-4-resolution",
    "name": "9.4 Resolution",
    "syllabusRef": "not on the current IB guide",
    "section": "Withdrawn from the current IB guide (first assessment 2025)",
    "description": "Rayleigh criterion: two point sources are just resolved when the central maximum of one falls on the first minimum of the other. Angular resolution: θ_min = 1.22λ/b (circular aperture). Larger aperture → better resolution (smaller θ_min). Applications: telescope resolving stars; microscope resolving cells; eye.",
    "svgKey": "ib-phys-9-wave-phenomena",
    "landmarks": [
     "Rayleigh criterion (just resolved)",
     "θ_min = 1.22λ/b",
     "b: aperture diameter",
     "Better resolution: larger b or smaller λ",
     "Telescope (radio vs optical)",
     "Microscope resolution",
     "Electron microscope (shorter λ)",
     "Diffraction limit"
    ],
    "examQA": [
     {
      "q": "State the Rayleigh criterion for resolution.",
      "a": "Two point objects are just resolved when the central diffraction maximum of one coincides with the first minimum of the other. Angular minimum separation θ_min = 1.22λ/b where λ is wavelength and b is aperture diameter. Objects closer than this appear as one."
     },
     {
      "q": "Explain why radio telescopes need to be very large.",
      "a": "θ_min = 1.22λ/b. Radio waves have λ ≈ 10 cm to 10 m, much longer than visible light (~500 nm). For the same angular resolution, radio telescope diameter must be much larger: b = 1.22λ/θ_min → b is proportional to λ. Hence radio telescopes span hundreds of metres; arrays of telescopes are linked (very long baseline interferometry, VLBI) to achieve better resolution."
     }
    ],
    "threejs3dFn": "createWave3D",
    "wikiUrl": "https://en.wikipedia.org/wiki/Angular_resolution"
   },
   {
    "id": "9-5-doppler-effect",
    "name": "9.5 Doppler effect",
    "syllabusRef": "C.5",
    "section": "C. Wave behaviour",
    "description": "Doppler effect: observed frequency changes when source or observer moves. Source moving toward observer: higher frequency (blue-shift). Source moving away: lower frequency (red-shift). f_obs = f_s × v/(v∓v_s) (minus: approaching). Applications: speed guns, Doppler radar, medical ultrasound, astronomy (redshift → Hubble's law).",
    "svgKey": "ib-phys-9-wave-phenomena",
    "landmarks": [
     "Doppler formula: f = f_s(v/(v∓v_s))",
     "Source approaching: f_obs > f_s",
     "Source receding: f_obs < f_s",
     "Speed gun (police radar)",
     "Doppler medical ultrasound",
     "Astronomical redshift (recession of galaxies)",
     "Hubble's law v = H₀d",
     "Big Bang evidence"
    ],
    "examQA": [
     {
      "q": "A siren at 500 Hz approaches at 30 m s⁻¹ (v_sound = 340 m s⁻¹). Calculate heard frequency.",
      "a": "f = f_s × v/(v − v_s) = 500 × 340/(340 − 30) = 500 × 340/310 = 548 Hz."
     },
     {
      "q": "Explain how the Doppler effect provides evidence for an expanding universe.",
      "a": "Light from distant galaxies shows redshift: spectral lines are shifted to longer wavelengths (lower frequency) compared to laboratory sources. By Doppler effect, this means galaxies are moving away from Earth. Hubble found recession speed v ∝ distance d (v = H₀d). All galaxies recede → universe is expanding. Consistent with Big Bang model."
     }
    ],
    "threejs3dFn": "createWave3D",
    "wikiUrl": "https://en.wikipedia.org/wiki/Doppler_effect"
   },
   {
    "id": "10-1-describing-fields",
    "name": "10.1 Describing fields",
    "syllabusRef": "D.1",
    "section": "D. Fields",
    "description": "Gravitational field: g = −GM/r² (radial, attractive). Electric field: E = kQ/r² (radial, repulsive for like charges). Field lines show direction and strength (density). Potential: V_grav = −GM/r; V_elec = kQ/r. Equipotential surfaces ⊥ to field lines. Work done by the field moving a charge from A to B = q(V_A \u2212 V_B); work done against the field (by an external agent) = q\u0394V = q(V_B \u2212 V_A).",
    "svgKey": "ib-phys-10-fields",
    "landmarks": [
     "Gravitational field g = GM/r²",
     "Electric field E = kQ/r²",
     "Field line diagrams",
     "Gravitational potential V_g = −GM/r",
     "Electric potential V_e = kQ/r",
     "Equipotential surfaces (⊥ field lines)",
     "Potential energy: Ep = mVg = qVe",
     "Similarities and differences (grav vs electric)"
    ],
    "examQA": [
     {
      "q": "Compare gravitational and electric fields.",
      "a": "Both: obey inverse-square law (F ∝ 1/r²), have field lines, have potentials, use concept of action at a distance. Differences: gravity always attractive (one type of mass); electric force can be attractive or repulsive (two types of charge). Gravitational force far weaker (G vs k). Gravity cannot be shielded; electric fields can be shielded (Faraday cage)."
     },
     {
      "q": "Calculate work done moving +2 µC from point A (V = 1000 V) to B (V = 3000 V).",
      "a": "W = qΔV = 2×10⁻⁶ × (3000−1000) = 2×10⁻⁶ × 2000 = 4×10⁻³ J = 4 mJ (work done on the charge to move it to higher potential)."
     }
    ],
    "threejs3dFn": "createFieldLines('electric')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Field_(physics)"
   },
   {
    "id": "10-2-fields-at-work",
    "name": "10.2 Fields at work",
    "syllabusRef": "D.1",
    "section": "D. Fields",
    "description": "Escape speed v_esc = √(2GM/R). Orbital speed v_orb = √(GM/r). Relationship between E and V for gravitational/electric fields. Orbital energy: E_total = Ek + Ep = −GMm/2r (negative = bound). Potential well diagrams. Equipotential surfaces.",
    "svgKey": "ib-phys-10-fields",
    "landmarks": [
     "Escape speed v = √(2GM/R)",
     "Orbital energy E = −GMm/2r",
     "Potential well diagram",
     "E = −dV/dr (field from potential)",
     "Capacitance C = Q/V",
     "Energy in capacitor W = ½CV²",
     "Combining capacitors (series/parallel)",
     "Electric potential energy"
    ],
    "examQA": [
     {
      "q": "Derive the escape speed from a planet of mass M, radius R.",
      "a": "At escape, KE = gravitational PE: ½mv² = GMm/R. v_esc = √(2GM/R). No dependence on escaping mass m. For Earth: v_esc = √(2×6.67×10⁻¹¹×6×10²⁴/6.37×10⁶) = √(1.26×10⁸) ≈ 11.2 km s⁻¹."
     },
     {
      "q": "Show that the total mechanical energy of an orbiting satellite is E = −GMm/2r.",
      "a": "For circular orbit: GMm/r² = mv²/r → v² = GM/r. Ek = ½mv² = GMm/2r. Ep = −GMm/r. E_total = GMm/2r − GMm/r = −GMm/2r. Negative: satellite is bound to the planet. More distant orbit (larger r) → less negative total energy → higher energy orbit."
     }
    ],
    "threejs3dFn": "createOrbitAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Orbital_mechanics"
   },
   {
    "id": "11-1-em-induction",
    "name": "11.1 Electromagnetic induction",
    "syllabusRef": "D.4",
    "section": "D. Fields",
    "description": "Faraday's law: induced EMF = −dΦ/dt (Φ = BA cosθ = magnetic flux). Lenz's law: induced current opposes the change causing it (energy conservation). EMF in rod: ε = BLv. Induced EMF in coil: ε = −N dΦ/dt. Changing B or changing area or changing angle all change flux.",
    "svgKey": "ib-phys-11-em-induction",
    "landmarks": [
     "Magnetic flux Φ = BA cosθ",
     "Faraday's law: ε = −dΦ/dt",
     "Lenz's law (opposes change)",
     "EMF in moving conductor ε = BLv",
     "EMF in rotating coil ε = NBAω sin(ωt)",
     "Induced current direction (right-hand rule)",
     "Transformer principle"
    ],
    "examQA": [
     {
      "q": "State Faraday's law of electromagnetic induction.",
      "a": "The magnitude of the induced EMF in a circuit is equal to the rate of change of magnetic flux linkage: |ε| = N|dΦ/dt| = N|d(BA cosθ)/dt|. The negative sign (Faraday-Lenz): induced EMF acts to oppose the change in flux that caused it."
     },
     {
      "q": "A 20 cm conductor moves at 5 m s⁻¹ perpendicular to a 0.8 T field. Calculate induced EMF.",
      "a": "ε = BLv = 0.8 × 0.20 × 5 = 0.8 V."
     }
    ],
    "threejs3dFn": "createEMInduction",
    "wikiUrl": "https://en.wikipedia.org/wiki/Electromagnetic_induction"
   },
   {
    "id": "11-2-power-generation",
    "name": "11.2 Power generation and transmission",
    "syllabusRef": "D.4",
    "section": "D. Fields",
    "description": "AC generator: coil rotates in B field → ε = NBAω sin(ωt). RMS values: V_rms = V₀/√2; I_rms = I₀/√2. Power = V_rms I_rms. Transformer: N₁/N₂ = V₁/V₂ = I₂/I₁ (ideal). Step-up for transmission (reduce I → reduce I²R losses). Step-down for consumer use.",
    "svgKey": "ib-phys-11-em-induction",
    "landmarks": [
     "AC generator: ε = NBAω sin(ωt)",
     "Peak and RMS values: V_rms = V₀/√2",
     "Power P = V_rms I_rms = ½I₀²R",
     "Transformer: N₁/N₂ = V₁/V₂",
     "Transformer: I₁N₁ = I₂N₂ (conservation)",
     "Step-up (high V, low I for transmission)",
     "Power loss P = I²R (reduced at high V)",
     "National grid"
    ],
    "examQA": [
     {
      "q": "Explain why electrical energy is transmitted at high voltage.",
      "a": "Power loss in cables P_loss = I²R. For a given power P = IV, higher V means lower I. Lower I → I² is much smaller → I²R loss dramatically reduced. A step-up transformer increases V (decreases I) for transmission; step-down transformer reduces V for safe consumer use. Overall transmission efficiency greatly improved."
     },
     {
      "q": "A transformer has 500 primary turns and 25 secondary turns. V₁=240 V. Find V₂ and current if I₁=0.1 A.",
      "a": "V₂ = V₁ × N₂/N₁ = 240 × 25/500 = 12 V. Ideal: I₁V₁ = I₂V₂ → I₂ = 0.1 × 240/12 = 2 A."
     }
    ],
    "threejs3dFn": "createEMInduction",
    "wikiUrl": "https://en.wikipedia.org/wiki/Electric_power_transmission"
   },
   {
    "id": "11-3-capacitance",
    "name": "11.3 Capacitance",
    "syllabusRef": "not on the current IB guide",
    "section": "Withdrawn from the current IB guide (first assessment 2025)",
    "description": "Capacitance C = Q/V (farads). Parallel plate: C = ε₀A/d. Dielectric increases C (C = εᵣε₀A/d). Energy stored: W = ½CV² = Q²/2C = ½QV. Charge/discharge through resistor: Q = Q₀e^(−t/RC). Time constant τ = RC. Capacitors in series: 1/C_total = Σ1/Cᵢ. Parallel: C_total = ΣCᵢ.",
    "svgKey": "ib-phys-11-em-induction",
    "landmarks": [
     "C = Q/V (farads)",
     "Parallel plate: C = ε₀A/d",
     "Dielectric: C = εᵣε₀A/d",
     "Energy: W = ½CV²",
     "Charge/discharge: Q = Q₀e^(−t/RC)",
     "Time constant τ = RC",
     "Series capacitors: 1/C = Σ1/Cᵢ",
     "Parallel capacitors: C = ΣCᵢ"
    ],
    "examQA": [
     {
      "q": "A 100 µF capacitor is charged to 12 V. Calculate stored energy.",
      "a": "W = ½CV² = ½ × 100×10⁻⁶ × 12² = ½ × 10⁻⁴ × 144 = 7.2×10⁻³ J = 7.2 mJ."
     },
     {
      "q": "A capacitor (C=50 µF) discharges through R=100 kΩ. Find time constant and time to fall to ½Q₀.",
      "a": "τ = RC = 100×10³ × 50×10⁻⁶ = 5 s. Q = Q₀e^(−t/τ). ½ = e^(−t/5). ln(½) = −t/5. t = 5 ln 2 = 5 × 0.693 = 3.47 s."
     }
    ],
    "threejs3dFn": "createFieldLines('electric')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Capacitor"
   },
   {
    "id": "12-1-matter-radiation",
    "name": "12.1 The interaction of matter with radiation",
    "syllabusRef": "E.2",
    "section": "E. Nuclear and quantum physics",
    "description": "Photoelectric effect: photons (E = hf) eject electrons if hf ≥ φ. Wave-particle duality: de Broglie wavelength λ = h/p = h/mv. Electron diffraction confirms wave nature. Heisenberg uncertainty: ΔxΔp ≥ h/4π; ΔEΔt ≥ h/4π. Pair production and annihilation (E = 2m_e c²). Compton scattering.",
    "svgKey": "ib-phys-12-quantum-nuclear",
    "landmarks": [
     "Photons E = hf = hc/λ",
     "Photoelectric effect: Ek_max = hf − φ",
     "Threshold frequency f₀ = φ/h",
     "Wave-particle duality",
     "de Broglie λ = h/p",
     "Electron diffraction",
     "Heisenberg uncertainty: ΔxΔp ≥ h/4π",
     "Pair production: γ → e⁺ + e⁻"
    ],
    "examQA": [
     {
      "q": "Explain why the photoelectric effect cannot be explained by classical wave theory.",
      "a": "Classical wave theory predicts: (1) any frequency of light should eject electrons if intensity is high enough; (2) electrons need time to absorb energy. Observations: (1) below threshold frequency f₀, no electrons even with intense light; (2) electrons emitted instantly. Explanation: light comes in photons (E = hf); one photon transfers all its energy; if hf < φ, no electron ejected regardless of intensity."
     },
     {
      "q": "State the de Broglie hypothesis and give evidence for it.",
      "a": "All matter has a wave associated with it; wavelength λ = h/p = h/(mv). Evidence: electron diffraction — when electrons pass through a crystal lattice, they produce diffraction patterns (concentric rings), identical to X-ray diffraction. Spacing of rings matches λ calculated from de Broglie formula."
     }
    ],
    "threejs3dFn": "createAtomModel",
    "wikiUrl": "https://en.wikipedia.org/wiki/Wave%E2%80%93particle_duality"
   },
   {
    "id": "12-2-nuclear-physics",
    "name": "12.2 Nuclear physics",
    "syllabusRef": "E.3",
    "section": "E. Nuclear and quantum physics",
    "description": "Radioactive decay law: A = λN, from dN/dt = −λN; N = N₀e^(−λt); t½ = ln2/λ. Activity A (Bq): measured by Geiger-Müller tube or scintillation counter. Background radiation must be subtracted. Radioactive dating: ¹⁴C dating (t½ = 5730 y). Nuclear radiation safety: inverse square law for intensity.",
    "svgKey": "ib-phys-12-quantum-nuclear",
    "landmarks": [
     "Activity A = λN (becquerel)",
     "N = N₀e^(−λt)",
     "Half-life t½ = ln2/λ = 0.693/λ",
     "Background radiation correction",
     "Geiger-Müller counter",
     "¹⁴C dating (t½ = 5730 y)",
     "Inverse square law for radiation",
     "Absorbed dose (Gy) and effective dose (Sv)"
    ],
    "examQA": [
     {
      "q": "Calculate the decay constant and half-life if after 10 days activity falls to 1/8 of initial.",
      "a": "N/N₀ = ⅛ = (½)³ → 3 half-lives in 10 days. t½ = 10/3 = 3.33 days. λ = ln2/t½ = 0.693/3.33 = 0.208 day⁻¹."
     },
     {
      "q": "Explain the principle of carbon-14 dating.",
      "a": "Living organisms maintain constant ¹⁴C/¹²C ratio (equal to atmospheric ratio; ¹⁴C produced by cosmic rays + ¹⁴N). On death, ¹⁴C intake stops; it decays (β⁻) with t½ = 5730 y. Measuring remaining ¹⁴C/¹²C ratio and comparing to living organisms gives elapsed time since death. Valid for samples < ~50,000 years."
     }
    ],
    "threejs3dFn": "createNucleus",
    "wikiUrl": "https://en.wikipedia.org/wiki/Nuclear_physics"
   }
  ]
 },
 "ib_sl_physics": {
  "subjectName": "IB Physics SL",
  "examCode": "IB-PHYS-SL",
  "sections": [
   "All",
   "Topic 1: Measurements and uncertainties",
   "Topic 2: Mechanics",
   "Topic 3: Thermal physics",
   "Topic 4: Waves",
   "Topic 5: Electricity and magnetism",
   "Topic 6: Circular motion and gravitation",
   "Topic 7: Atomic nuclear and particle physics",
   "Topic 8: Energy production"
  ],
  "topics": [
   {
    "id": "1-1-measurements-in-physics",
    "name": "1.1 Measurements in physics",
    "syllabusRef": "not on the current IB guide",
    "section": "Withdrawn from the current IB guide (first assessment 2025)",
    "description": "Physics relies on measurements made in SI units. Seven base SI units: metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol), candela (cd). Derived units built from these. Scientific notation expresses very large/small values. Order of magnitude estimates are within a factor of 10.",
    "svgKey": "ib-phys-1-measurements",
    "landmarks": [
     "Seven SI base units (m, kg, s, A, K, mol, cd)",
     "Derived units",
     "Scientific notation (standard form)",
     "Prefixes (nano-, micro-, milli-, kilo-, mega-, giga-)",
     "Significant figures",
     "Order of magnitude estimates",
     "Dimensional analysis"
    ],
    "examQA": [
     {
      "q": "State the SI units for force, energy and power in terms of base units.",
      "a": "Force (N = kg m s⁻²). Energy (J = kg m² s⁻²). Power (W = kg m² s⁻³)."
     },
     {
      "q": "Express 3.6 × 10⁻⁷ m in nm.",
      "a": "1 nm = 10⁻⁹ m. 3.6 × 10⁻⁷ m ÷ 10⁻⁹ m nm⁻¹ = 360 nm."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/International_System_of_Units"
   },
   {
    "id": "1-2-uncertainties-errors",
    "name": "1.2 Uncertainties and errors",
    "syllabusRef": "not on the current IB guide",
    "section": "Withdrawn from the current IB guide (first assessment 2025)",
    "description": "All measurements have uncertainty. Random errors: unpredictable fluctuations (reduce precision); minimised by repeating. Systematic errors: consistent offset (reduce accuracy); must be corrected. Absolute uncertainty: ± half the smallest scale division. Percentage uncertainty: (absolute/measured)×100. Propagation: add absolute (±) for sums; add % for products/quotients.",
    "svgKey": "ib-phys-1-measurements",
    "landmarks": [
     "Random error (precision, scatter)",
     "Systematic error (accuracy, offset)",
     "Absolute uncertainty",
     "Percentage uncertainty",
     "Addition/subtraction: add absolute uncertainties",
     "Multiplication/division: add % uncertainties",
     "Powers: multiply % uncertainty by power",
     "Error bars on graphs"
    ],
    "examQA": [
     {
      "q": "Distinguish between random error and systematic error.",
      "a": "Random: unpredictable fluctuations in both directions around true value; reduces precision; minimised by repeating and averaging. Systematic: consistent offset in one direction from true value; reduces accuracy; cannot be reduced by repetition — source must be identified and eliminated."
     },
     {
      "q": "t = 5.4 ± 0.2 s, d = 3.2 ± 0.1 m. Calculate % uncertainty in v = d/t.",
      "a": "%unc(d) = 0.1/3.2 × 100 = 3.1%. %unc(t) = 0.2/5.4 × 100 = 3.7%. %unc(v) = 3.1 + 3.7 = 6.8%."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Measurement_uncertainty"
   },
   {
    "id": "1-3-vectors-scalars",
    "name": "1.3 Vectors and scalars",
    "syllabusRef": "A.1",
    "section": "A. Space, time and motion",
    "description": "Scalar: magnitude only (mass, temperature, speed, energy). Vector: magnitude and direction (displacement, velocity, acceleration, force). Vector addition: tip-to-tail or parallelogram. Components: Fx = F cosθ, Fy = F sinθ. Resultant: R = √(Fx²+Fy²). Subtraction: add the negative vector.",
    "svgKey": "ib-phys-1-measurements",
    "landmarks": [
     "Scalar (magnitude only)",
     "Vector (magnitude + direction)",
     "Vector addition (triangle/parallelogram)",
     "Components (Fx = F cosθ)",
     "Resultant magnitude and direction",
     "Vector subtraction",
     "Unit vectors"
    ],
    "examQA": [
     {
      "q": "Resolve a 50 N force at 30° above horizontal into components.",
      "a": "Fx = 50 cos30° = 50 × 0.866 = 43.3 N (horizontal). Fy = 50 sin30° = 50 × 0.5 = 25 N (vertical)."
     },
     {
      "q": "A 3 N force east and 4 N force north: find the resultant.",
      "a": "R = √(3² + 4²) = √25 = 5 N. Direction: θ = arctan(4/3) = 53.1° north of east."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Euclidean_vector"
   },
   {
    "id": "2-1-motion",
    "name": "2.1 Motion",
    "syllabusRef": "A.1",
    "section": "A. Space, time and motion",
    "description": "Kinematics: suvat equations for uniform acceleration: v = u+at, s = ut+½at², v²=u²+2as, s=½(u+v)t. Displacement-time and velocity-time graphs. Projectile motion: horizontal (a=0) and vertical (a=g) are independent. Uniform circular motion: v and a change direction.",
    "svgKey": "ib-phys-2-mechanics",
    "landmarks": [
     "suvat equations (uniform acceleration)",
     "Displacement-time graph (gradient = velocity)",
     "Velocity-time graph (gradient = a, area = s)",
     "Projectile: horizontal uniform, vertical free-fall",
     "Parabolic trajectory",
     "Range, time of flight, maximum height"
    ],
    "examQA": [
     {
      "q": "A ball launched at 20 m s⁻¹ horizontally from 45 m cliff. Time to land and range?",
      "a": "Vertical: 45 = ½×10×t² → t = 3 s. Range = 20 × 3 = 60 m."
     },
     {
      "q": "Derive the suvat equation s = ut + ½at² from a v-t graph.",
      "a": "Area under v-t graph = displacement. Area = rectangle (ut) + triangle (½ × t × at = ½at²). So s = ut + ½at²."
     }
    ],
    "threejs3dFn": "createMotionAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Kinematics"
   },
   {
    "id": "2-2-forces",
    "name": "2.2 Forces",
    "syllabusRef": "A.2",
    "section": "A. Space, time and motion",
    "description": "Newton's three laws: (1) F_net = 0 → constant velocity. (2) F_net = ma. (3) action-reaction pairs are equal and opposite. Free body diagrams. Normal force, friction, tension, weight. Friction: F_f ≤ μN (static: μs; kinetic: μk). Terminal velocity: drag = weight.",
    "svgKey": "ib-phys-2-mechanics",
    "landmarks": [
     "Newton's first law (inertia)",
     "Newton's second law (F = ma)",
     "Newton's third law (action-reaction)",
     "Free body diagram",
     "Weight W = mg",
     "Normal force",
     "Friction Ff = μN",
     "Terminal velocity (drag = weight)"
    ],
    "examQA": [
     {
      "q": "State Newton's second law of motion.",
      "a": "The net force on an object is equal to the rate of change of its momentum: F_net = Δp/Δt = ma (for constant mass). Net force is the vector sum of all forces; direction of net force is the direction of acceleration."
     },
     {
      "q": "An 80 kg skydiver reaches terminal velocity. State the drag force.",
      "a": "At terminal velocity, acceleration = 0. Net force = 0. Drag force = weight = mg = 80 × 10 = 800 N (upward drag equals downward weight)."
     }
    ],
    "threejs3dFn": "createForceVectors",
    "wikiUrl": "https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion"
   },
   {
    "id": "2-3-work-energy-power",
    "name": "2.3 Work energy and power",
    "syllabusRef": "A.3",
    "section": "A. Space, time and motion",
    "description": "Work: W = Fd cosθ. Kinetic energy: Ek = ½mv². Gravitational PE: Ep = mgh. Conservation of mechanical energy (no friction). Work-energy theorem: Wnet = ΔEk. Efficiency: useful output / total input. Power: P = W/t = Fv.",
    "svgKey": "ib-phys-2-mechanics",
    "landmarks": [
     "Work W = Fd cosθ",
     "Kinetic energy Ek = ½mv²",
     "Gravitational PE Ep = mgh",
     "Conservation of energy",
     "Work-energy theorem",
     "Power P = W/t = Fv",
     "Efficiency = Wuseful/Wtotal",
     "Energy transformation (joules)"
    ],
    "examQA": [
     {
      "q": "A 1000 kg car accelerates from rest to 20 m s⁻¹. Calculate the kinetic energy.",
      "a": "Ek = ½mv² = ½ × 1000 × 20² = ½ × 1000 × 400 = 200,000 J = 200 kJ."
     },
     {
      "q": "A 600 W motor lifts a 30 kg mass. Calculate speed of lifting (g=10).",
      "a": "P = Fv. F = mg = 300 N. v = P/F = 600/300 = 2 m s⁻¹."
     }
    ],
    "threejs3dFn": "createEnergyTransfer",
    "wikiUrl": "https://en.wikipedia.org/wiki/Work_(physics)"
   },
   {
    "id": "2-4-momentum-impulse",
    "name": "2.4 Momentum and impulse",
    "syllabusRef": "A.2",
    "section": "A. Space, time and motion",
    "description": "Momentum: p = mv. Impulse: J = FΔt = Δp. Conservation of momentum: in any closed system, total momentum is constant. Elastic collision: KE conserved. Inelastic: KE not conserved. Perfectly inelastic: objects stick together. Law holds in all inertial reference frames.",
    "svgKey": "ib-phys-2-mechanics",
    "landmarks": [
     "Momentum p = mv (vector)",
     "Impulse J = FΔt = Δp",
     "Conservation of momentum",
     "Elastic collision (KE conserved)",
     "Inelastic collision (KE not conserved)",
     "Perfectly inelastic (objects stick)",
     "Explosions (conservation applies)",
     "F-t graph: area = impulse"
    ],
    "examQA": [
     {
      "q": "A 2 kg ball at 5 m s⁻¹ east collides with a 3 kg ball at rest; they stick. Find final velocity.",
      "a": "Total p before = 2×5 + 3×0 = 10 kg m s⁻¹. p conserved: (2+3)v = 10. v = 10/5 = 2 m s⁻¹ east."
     },
     {
      "q": "State Newton's third law in terms of momentum.",
      "a": "Newton's third law: forces in an action-reaction pair are equal and opposite. Hence impulse on each object is equal and opposite: ΔpA = −ΔpB. Total momentum change = 0 → conservation of momentum."
     }
    ],
    "threejs3dFn": "createCollisionAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Momentum"
   },
   {
    "id": "3-1-thermal-concepts",
    "name": "3.1 Thermal concepts",
    "syllabusRef": "B.1",
    "section": "B. The particulate nature of matter",
    "description": "Temperature is proportional to average translational kinetic energy of particles. Internal energy: sum of all kinetic and potential energies of particles. Specific heat capacity: Q = mcΔT. Specific latent heat: Q = mL (at phase change, T constant). Heating curve shows temperature vs energy input.",
    "svgKey": "ib-phys-3-thermal",
    "landmarks": [
     "Temperature ∝ average Ek",
     "Internal energy (kinetic + potential)",
     "Heat transfer mechanisms",
     "Specific heat capacity Q = mcΔT",
     "Specific latent heat Q = mL",
     "Latent heat of fusion / vaporisation",
     "Heating curve (flat regions at phase change)"
    ],
    "examQA": [
     {
      "q": "Distinguish between internal energy and temperature.",
      "a": "Temperature: proportional to average translational kinetic energy per particle; measured in Kelvin. Internal energy: total of all kinetic AND potential energies of ALL particles; proportional to amount of substance. Same temperature, more substance → more internal energy."
     },
     {
      "q": "Calculate energy to heat 2 kg water 20°C→100°C then vaporise it (c=4200, L=2.26×10⁶ J kg⁻¹).",
      "a": "Heating: Q1 = 2 × 4200 × 80 = 672,000 J. Vaporisation: Q2 = 2 × 2.26×10⁶ = 4,520,000 J. Total = 5,192,000 J ≈ 5.19 MJ."
     }
    ],
    "threejs3dFn": "createParticleStates",
    "wikiUrl": "https://en.wikipedia.org/wiki/Thermodynamics"
   },
   {
    "id": "3-2-modelling-gas",
    "name": "3.2 Modelling a gas",
    "syllabusRef": "B.3",
    "section": "B. The particulate nature of matter",
    "description": "Ideal gas assumptions: point particles, elastic collisions, no intermolecular forces, random motion, negligible collision time. Ideal gas law: pV = nRT. Boltzmann: pV = NkT. Pressure from kinetic theory: p = Nmv²/3V. Real gases deviate at high pressure/low temperature.",
    "svgKey": "ib-phys-3-thermal",
    "landmarks": [
     "Ideal gas assumptions (5 points)",
     "pV = nRT (n in moles, R=8.31)",
     "pV = NkT (N in particles, k=1.38×10⁻²³)",
     "Pressure from momentum change",
     "p = Nm<v²>/3V",
     "Average Ek = 3kT/2 = 3RT/2NA",
     "Real gas deviations (high P, low T)"
    ],
    "examQA": [
     {
      "q": "State the five assumptions of the kinetic model of an ideal gas.",
      "a": "1. Gas consists of point-like particles (volume negligible). 2. No intermolecular forces except during collisions. 3. Collisions are perfectly elastic. 4. Particles are in continuous random motion. 5. Duration of collisions is negligible compared to time between collisions."
     },
     {
      "q": "A gas at 27°C and 2 atm in 10 L. Find n using pV=nRT (R=8.31, 1 atm=101325 Pa).",
      "a": "T = 300 K. p = 2×101325 = 202650 Pa. V = 10×10⁻³ = 0.010 m³. n = pV/RT = 202650×0.010/(8.31×300) = 2026.5/2493 = 0.813 mol."
     }
    ],
    "threejs3dFn": "createPressureParticles",
    "wikiUrl": "https://en.wikipedia.org/wiki/Ideal_gas"
   },
   {
    "id": "4-1-oscillations",
    "name": "4.1 Oscillations",
    "syllabusRef": "C.1",
    "section": "C. Wave behaviour",
    "description": "Simple harmonic motion (SHM): restoring force ∝ displacement, F = −kx. Period T = 2π√(m/k) (spring); T = 2π√(L/g) (pendulum). x = A cos(ωt), v = −Aω sin(ωt), a = −Aω² cos(ωt). Energy: Ek + Ep = constant = ½kA². Resonance: driving frequency = natural frequency.",
    "svgKey": "ib-phys-4-waves",
    "landmarks": [
     "SHM: a ∝ −x (restoring force)",
     "Angular frequency ω = 2π/T",
     "x = A cos(ωt)",
     "v max at equilibrium = Aω",
     "a max at amplitude = Aω²",
     "Spring: T = 2π√(m/k)",
     "Pendulum: T = 2π√(L/g)",
     "Energy in SHM (Ek + Ep = const)"
    ],
    "examQA": [
     {
      "q": "State the conditions for SHM.",
      "a": "1. A restoring force acts on the object. 2. The restoring force is directly proportional to the displacement from the equilibrium position. 3. The restoring force is always directed toward the equilibrium position. Result: acceleration a ∝ −displacement (a = −ω²x)."
     },
     {
      "q": "A 0.5 kg mass on a spring stretches it 0.2 m. Calculate T (g=10).",
      "a": "k = F/x = 0.5×10/0.2 = 25 N m⁻¹. T = 2π√(m/k) = 2π√(0.5/25) = 2π√0.02 = 2π × 0.141 = 0.889 s ≈ 0.89 s."
     }
    ],
    "threejs3dFn": "createPendulum",
    "wikiUrl": "https://en.wikipedia.org/wiki/Simple_harmonic_motion"
   },
   {
    "id": "4-2-travelling-waves",
    "name": "4.2 Travelling waves",
    "syllabusRef": "C.2",
    "section": "C. Wave behaviour",
    "description": "Wave: transfer of energy without transfer of matter. Transverse: oscillation ⊥ wave direction (EM waves, surface water). Longitudinal: oscillation ∥ wave direction (sound). Wave equation: v = fλ. Intensity: I = P/A; I ∝ A² (amplitude squared). Electromagnetic spectrum: radio to gamma.",
    "svgKey": "ib-phys-4-waves",
    "landmarks": [
     "Transverse vs longitudinal waves",
     "Displacement, amplitude, wavelength",
     "Wave speed v = fλ",
     "Period T = 1/f",
     "Intensity I = P/A, I ∝ A²",
     "Electromagnetic spectrum",
     "Speed of light c = 3×10⁸ m s⁻¹",
     "Inverse square law for point sources"
    ],
    "examQA": [
     {
      "q": "A wave has frequency 400 Hz and wavelength 0.85 m. Calculate wave speed.",
      "a": "v = fλ = 400 × 0.85 = 340 m s⁻¹ (speed of sound in air at ~20°C)."
     },
     {
      "q": "Distinguish between transverse and longitudinal waves.",
      "a": "Transverse: particles oscillate perpendicular to the direction of wave travel. Examples: EM waves, S-seismic waves, water surface waves. Longitudinal: particles oscillate parallel to wave travel direction (compressions and rarefactions). Examples: sound waves, P-seismic waves."
     }
    ],
    "threejs3dFn": "createWave3D",
    "wikiUrl": "https://en.wikipedia.org/wiki/Wave"
   },
   {
    "id": "4-3-wave-characteristics",
    "name": "4.3 Wave characteristics",
    "syllabusRef": "C.3",
    "section": "C. Wave behaviour",
    "description": "Superposition principle: resultant displacement = sum of individual displacements. Constructive interference: path difference = nλ. Destructive interference: path difference = (n+½)λ. Wavefronts and rays. Huygens' principle. Two-source interference requires coherent sources with a constant phase difference; the path difference at each point fixes whether superposition is constructive or destructive.",
    "svgKey": "ib-phys-4-waves",
    "landmarks": [
     "Superposition principle",
     "Constructive interference (path diff = nλ)",
     "Destructive interference (path diff = (n+½)λ)",
     "Phase difference",
     "Wavefronts and Huygens' principle",
     "Polarisation (transverse waves only)",
     "Polariser and analyser",
     "Replace all three withdrawn tags with two current C.3 tags: \"Coherent sources (constant phase difference)\" and \"Path difference \u2192 phase difference\"."
    ],
    "examQA": [
     {
      "q": "State the condition for constructive and destructive interference.",
      "a": "Constructive: path difference = nλ (n = 0,1,2,...); waves arrive in phase → amplitude adds. Destructive: path difference = (n+½)λ; waves arrive 180° out of phase → amplitude cancels. For sound/light from two coherent sources."
     },
     {
      "q": "Two sources emit waves of wavelength 0.60 m. Explain why a stable interference pattern is observed only if the sources are coherent, and determine the type of interference at a point 4.2 m from one source and 5.4 m from the other. (Answer: coherent sources keep a constant phase difference, so the pattern does not shift or average out over time. Path difference = 5.4 \u2212 4.2 = 1.2 m = 2\u03bb; a whole number of wavelengths means the waves arrive in phase, so the interference is constructive.)",
      "a": "Malus's law: I = I₀ cos²θ = I₀ cos²60° = I₀ × (0.5)² = 0.25 I₀."
     }
    ],
    "threejs3dFn": "createWave3D",
    "wikiUrl": "https://en.wikipedia.org/wiki/Wave"
   },
   {
    "id": "4-4-wave-behaviour",
    "name": "4.4 Wave behaviour",
    "syllabusRef": "C.3",
    "section": "C. Wave behaviour",
    "description": "Reflection: angle of incidence = angle of reflection. Refraction: waves change speed/direction at boundary; Snell's law n₁sinθ₁ = n₂sinθ₂. Total internal reflection: when θ > critical angle (sinθc = n₂/n₁). Diffraction: waves spread through gaps or around obstacles; significant when gap ≈ λ.",
    "svgKey": "ib-phys-4-waves",
    "landmarks": [
     "Law of reflection",
     "Snell's law (n₁sinθ₁ = n₂sinθ₂)",
     "Refractive index n = c/v",
     "Total internal reflection",
     "Critical angle: sinθc = 1/n",
     "Diffraction (gap ≈ λ → significant spreading)",
     "Applications: optical fibres, prisms"
    ],
    "examQA": [
     {
      "q": "A ray passes from glass (n=1.5) to air. Calculate the critical angle.",
      "a": "sinθc = n₂/n₁ = 1.0/1.5 = 0.667. θc = arcsin(0.667) = 41.8°. At angles greater than 41.8°, total internal reflection occurs."
     },
     {
      "q": "Explain why diffraction is more significant when the gap is smaller.",
      "a": "Diffraction is significant when gap width ≈ wavelength. If gap >> λ, the wave passes through with little spreading (like a beam). If gap ≈ λ, spreading is pronounced (full semicircle). If gap < λ, the gap becomes a point source of waves."
     }
    ],
    "threejs3dFn": "createWave3D",
    "wikiUrl": "https://en.wikipedia.org/wiki/Diffraction"
   },
   {
    "id": "4-5-standing-waves",
    "name": "4.5 Standing waves",
    "syllabusRef": "C.4",
    "section": "C. Wave behaviour",
    "description": "Standing waves form from superposition of two identical waves travelling in opposite directions. Nodes: zero displacement. Antinodes: maximum displacement. For string fixed both ends: L = n(λ/2). For pipes: open both (antinodes at ends); closed one end (node at closed end). Harmonics and overtones.",
    "svgKey": "ib-phys-4-waves",
    "landmarks": [
     "Standing wave (superposition of opposites)",
     "Nodes (zero displacement)",
     "Antinodes (maximum displacement)",
     "String: L = nλ/2; f = nv/2L",
     "Pipe open both ends: same as string",
     "Pipe closed one end: L = nλ/4, odd harmonics only",
     "Fundamental (1st harmonic)",
     "Overtones"
    ],
    "examQA": [
     {
      "q": "Determine the fundamental frequency of a 0.8 m string (v = 320 m s⁻¹).",
      "a": "Fundamental: L = λ/2 → λ = 2L = 1.6 m. f = v/λ = 320/1.6 = 200 Hz."
     },
     {
      "q": "Distinguish between nodes and antinodes in a standing wave.",
      "a": "Node: a point of zero displacement at all times; two superposing waves always cancel here; spaced λ/2 apart. Antinode: a point of maximum displacement; waves always reinforce; located midway between nodes. No net energy transfer in a standing wave."
     }
    ],
    "threejs3dFn": "createWave3D",
    "wikiUrl": "https://en.wikipedia.org/wiki/Standing_wave"
   },
   {
    "id": "5-1-electric-fields",
    "name": "5.1 Electric fields",
    "syllabusRef": "D.2",
    "section": "D. Fields",
    "description": "Electric force: F = kq₁q₂/r² (Coulomb). Electric field E = F/q = kQ/r². Field lines show direction and strength. Uniform field between parallel plates: E = V/d. Electric potential V = kQ/r. Potential energy = qV. Work done = qΔV. Electron volt: 1 eV = 1.6×10⁻¹⁹ J.",
    "svgKey": "ib-phys-5-electricity-magnetism",
    "landmarks": [
     "Coulomb's law F = kq₁q₂/r²",
     "Electric field E = F/q (N C⁻¹)",
     "Field lines (direction of force on +q)",
     "Point charge field E = kQ/r²",
     "Uniform field E = V/d",
     "Electric potential V = kQ/r",
     "Potential energy Ep = qV",
     "Electron volt (1 eV = 1.6×10⁻¹⁹ J)"
    ],
    "examQA": [
     {
      "q": "Calculate the electric force between two point charges of +2 µC and −3 µC, 0.5 m apart (k=9×10⁹).",
      "a": "F = kq₁q₂/r² = 9×10⁹ × 2×10⁻⁶ × 3×10⁻⁶ / 0.5² = 9×10⁹ × 6×10⁻¹² / 0.25 = 54×10⁻³ / 0.25 = 0.216 N. Attractive (opposite charges)."
     },
     {
      "q": "What is the electric field between plates 5 mm apart with 200 V potential difference?",
      "a": "E = V/d = 200/(5×10⁻³) = 40,000 V m⁻¹ = 4×10⁴ N C⁻¹. Direction: from + plate to − plate."
     }
    ],
    "threejs3dFn": "createFieldLines('electric')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Electric_field"
   },
   {
    "id": "5-2-heating-electric-currents",
    "name": "5.2 Heating effect of electric currents",
    "syllabusRef": "B.5",
    "section": "B. The particulate nature of matter",
    "description": "Current I = ΔQ/Δt. Resistance R = V/I (Ohm's law). Resistivity ρ: R = ρL/A. Power: P = IV = I²R = V²/R. Energy E = Pt. Series circuit: same current. Parallel circuit: same voltage. Kirchhoff's laws: sum of currents at node = 0; sum of EMFs in loop = sum of potential drops.",
    "svgKey": "ib-phys-5-electricity-magnetism",
    "landmarks": [
     "Current I = ΔQ/Δt (ampere)",
     "Ohm's law V = IR",
     "Resistance R = ρL/A",
     "Power P = IV = I²R = V²/R",
     "Series: R_total = R1+R2; same I",
     "Parallel: 1/R_total = 1/R1 + 1/R2; same V",
     "Kirchhoff's current law (ΣI = 0)",
     "Kirchhoff's voltage law (ΣEMF = ΣIR)"
    ],
    "examQA": [
     {
      "q": "Three resistors (2Ω, 3Ω, 6Ω) are in parallel. Calculate total resistance.",
      "a": "1/R = 1/2 + 1/3 + 1/6 = 3/6 + 2/6 + 1/6 = 6/6 = 1. R = 1 Ω."
     },
     {
      "q": "A 240 V heater draws 5 A. Calculate its resistance and power.",
      "a": "R = V/I = 240/5 = 48 Ω. P = IV = 5 × 240 = 1200 W = 1.2 kW."
     }
    ],
    "threejs3dFn": "createEnergyTransfer",
    "wikiUrl": "https://en.wikipedia.org/wiki/Ohm%27s_law"
   },
   {
    "id": "5-3-electric-cells",
    "name": "5.3 Electric cells",
    "syllabusRef": "B.5",
    "section": "B. The particulate nature of matter",
    "description": "EMF (ε): energy supplied per unit charge by source. Terminal voltage < EMF when current flows due to internal resistance r. V_terminal = ε − Ir. Short circuit: V = 0; I = ε/r. Battery: source of constant EMF. Cells in series: total EMF = sum. Cells in parallel: EMF same, internal resistance reduced.",
    "svgKey": "ib-phys-5-electricity-magnetism",
    "landmarks": [
     "EMF ε (energy per charge)",
     "Internal resistance r",
     "Terminal voltage V = ε − Ir",
     "Short circuit current I = ε/r",
     "Maximum power transfer",
     "Cells in series (EMFs add)",
     "Cells in parallel (same EMF, r reduced)",
     "V-I characteristic of source"
    ],
    "examQA": [
     {
      "q": "A battery with EMF 12 V and internal resistance 2 Ω drives current through 10 Ω. Find terminal voltage.",
      "a": "I = ε/(R+r) = 12/(10+2) = 1 A. V_terminal = ε − Ir = 12 − 1×2 = 10 V. (Or V = IR = 1×10 = 10 V.)"
     },
     {
      "q": "Explain why a battery's terminal voltage is less than its EMF under load.",
      "a": "EMF is the energy per unit charge supplied by the chemical reaction. Some energy is dissipated in the internal resistance of the battery (Ir drop). Terminal voltage = EMF − voltage drop across internal resistance = ε − Ir. Greater current → greater internal voltage drop → terminal voltage decreases."
     }
    ],
    "wikiUrl": "https://en.wikipedia.org/wiki/Electromotive_force"
   },
   {
    "id": "5-4-magnetic-effects",
    "name": "5.4 Magnetic effects of electric currents",
    "syllabusRef": "D.3",
    "section": "D. Fields",
    "description": "Magnetic force on moving charge: F = qvB sinθ (left-hand rule for negative charges; Fleming's left-hand rule for conventional current). Force on current-carrying conductor: F = BIL sinθ. Magnetic fields of solenoid and straight wire. DC motor. Magnetic force between parallel wires (note: since the 2019 SI revision the ampere is defined by fixing e, not by this force).",
    "svgKey": "ib-phys-5-electricity-magnetism",
    "landmarks": [
     "F = qvB sinθ (Lorentz force)",
     "Fleming's left-hand rule",
     "F = BIL sinθ",
     "Magnetic field: solenoid, straight wire",
     "Right-hand corkscrew rule for B",
     "DC motor principle",
     "Force between parallel conductors",
     "Ampere definition"
    ],
    "examQA": [
     {
      "q": "A proton (q=1.6×10⁻¹⁹ C) moves at 3×10⁵ m s⁻¹ perpendicular to B=0.5 T. Calculate F.",
      "a": "F = qvB sinθ = 1.6×10⁻¹⁹ × 3×10⁵ × 0.5 × sin90° = 2.4×10⁻¹⁴ N."
     },
     {
      "q": "Describe the path of a charged particle entering a uniform magnetic field perpendicularly.",
      "a": "F = qvB is always perpendicular to v → centripetal force → circular motion. Radius r = mv/(qB). Speed unchanged (force ⊥ velocity → no work done). Greater speed or mass → larger radius; greater charge or B → smaller radius."
     }
    ],
    "threejs3dFn": "createFieldLines('magnetic')",
    "wikiUrl": "https://en.wikipedia.org/wiki/Magnetism"
   },
   {
    "id": "6-1-circular-motion",
    "name": "6.1 Circular motion",
    "syllabusRef": "A.2",
    "section": "A. Space, time and motion",
    "description": "Uniform circular motion: constant speed but changing velocity direction. Centripetal acceleration: a = v²/r = ω²r (directed toward centre). Centripetal force: F = mv²/r (not a new force; provided by tension, gravity, normal force, friction). Period T = 2πr/v = 2π/ω. Angular velocity ω = 2π/T.",
    "svgKey": "ib-phys-6-circular-gravitation",
    "landmarks": [
     "Angular velocity ω = 2πf = v/r",
     "Period T = 2π/ω",
     "Centripetal acceleration a = v²/r = ω²r",
     "Centripetal force F = mv²/r = mω²r",
     "Direction: toward centre",
     "Not a new force — provided by other forces",
     "Examples: car on curved road, planet in orbit",
     "Banking of road"
    ],
    "examQA": [
     {
      "q": "A 500 g ball on a 0.8 m string makes 2 revolutions per second. Calculate centripetal force.",
      "a": "ω = 2πf = 2π×2 = 4π rad s⁻¹. F = mω²r = 0.5 × (4π)² × 0.8 = 0.5 × 158 × 0.8 = 63.2 N."
     },
     {
      "q": "What provides the centripetal force for a satellite in circular orbit?",
      "a": "The gravitational force from Earth provides the centripetal force. There is no outward \"centrifugal force\" in an inertial reference frame. Gravity pulls satellite toward Earth's centre; this centripetal force keeps satellite in circular path."
     }
    ],
    "threejs3dFn": "createOrbitAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Circular_motion"
   },
   {
    "id": "6-2-newtons-law-gravitation",
    "name": "6.2 Newton's law of gravitation",
    "syllabusRef": "D.1",
    "section": "D. Fields",
    "description": "Newton's universal law: F = Gm₁m₂/r². G = 6.67×10⁻¹¹ N m² kg⁻². Gravitational field strength g = GM/r² (= F/m). Orbital mechanics: for circular orbit, F_grav = F_centripetal. Kepler's first law: planets move in ellipses with the Sun at one focus. Kepler's second law: a line from the Sun to a planet sweeps equal areas in equal times. Kepler's third law: T² ∝ r³.",
    "svgKey": "ib-phys-6-circular-gravitation",
    "landmarks": [
     "Newton's law F = Gm₁m₂/r²",
     "G = 6.67×10⁻¹¹ N m² kg⁻²",
     "Gravitational field g = GM/r²",
     "Orbital speed: v = √(GM/r)",
     "Period from circular orbit T² ∝ r³",
     "Kepler's third law",
     "Escape speed v_esc = √(2GM/R)",
     "Field lines: radial and directed towards the mass; line density indicates field strength"
    ],
    "examQA": [
     {
      "q": "Calculate the gravitational force between Earth (M=6×10²⁴ kg) and Moon (m=7×10²² kg) at r=3.8×10⁸ m.",
      "a": "F = Gm₁m₂/r² = 6.67×10⁻¹¹ × 6×10²⁴ × 7×10²² / (3.8×10⁸)² = 6.67×10⁻¹¹ × 4.2×10⁴⁷ / 1.44×10¹⁷ = 1.95×10²⁰ N."
     },
     {
      "q": "A satellite orbits at radius r. Derive an expression for its orbital period.",
      "a": "F_grav = F_centripetal: GMm/r² = mv²/r. v² = GM/r. Period T = 2πr/v = 2πr/√(GM/r) = 2π√(r³/GM). Hence T² = 4π²r³/(GM) → T² ∝ r³ (Kepler's third law)."
     }
    ],
    "threejs3dFn": "createOrbitAnimation",
    "wikiUrl": "https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation"
   },
   {
    "id": "7-1-discrete-energy-radioactivity",
    "name": "7.1 Discrete energy and radioactivity",
    "syllabusRef": "E.1",
    "section": "E. Nuclear and quantum physics",
    "description": "Discrete atomic energy levels: atoms absorb and emit specific photon energies. E = hf = hc/λ. Photon emission or absorption accompanies a transition between two atomic energy levels: hf = E\u2082 \u2212 E\u2081, so E = hf = hc/\u03bb. Emission and absorption spectra. Radioactive decay: alpha (α, ⁴₂He), beta− (β⁻, e⁻), gamma (γ). Activity A = λN. Half-life t½ = ln2/λ. N = N₀e^(−λt).",
    "svgKey": "ib-phys-7-atomic-nuclear",
    "landmarks": [
     "Discrete energy levels",
     "E = hf (photon energy)",
     "Photon energy from level transitions: \u0394E = hf",
     "Emission vs absorption spectra",
     "Alpha decay (α: ⁴₂He, short range)",
     "Beta decay (β⁻: electron, medium range)",
     "Gamma (γ: photon, long range)",
     "Half-life: N = N₀e^(−λt)"
    ],
    "examQA": [
     {
      "q": "An electron in a hydrogen atom drops from the \u22123.40 eV level to the \u221213.6 eV level. Calculate the wavelength of the emitted photon. (Answer: \u0394E = 13.6 \u2212 3.40 = 10.2 eV = 10.2 \u00d7 1.6\u00d710\u207b\u00b9\u2079 = 1.63\u00d710\u207b\u00b9\u2078 J. \u03bb = hc/\u0394E = 6.63\u00d710\u207b\u00b3\u2074 \u00d7 3.00\u00d710\u2078 / 1.63\u00d710\u207b\u00b9\u2078 = 1.22\u00d710\u207b\u2077 m = 122 nm.)",
      "a": "E_photon = hf = 6.63×10⁻³⁴ × 8×10¹⁴ = 5.3×10⁻¹⁹ J = 3.31 eV. Ek_max = hf − φ = 3.31 − 2.5 = 0.81 eV."
     },
     {
      "q": "A sample has half-life 6 hours. What fraction remains after 24 hours?",
      "a": "Number of half-lives = 24/6 = 4. Fraction remaining = (½)⁴ = 1/16."
     }
    ],
    "threejs3dFn": "createNucleus",
    "wikiUrl": "https://en.wikipedia.org/wiki/Radioactive_decay"
   },
   {
    "id": "7-2-nuclear-reactions",
    "name": "7.2 Nuclear reactions",
    "syllabusRef": "E.3",
    "section": "E. Nuclear and quantum physics",
    "description": "Mass defect: mass of nucleus < sum of nucleon masses. Binding energy = mass defect × c². ΔE = Δmc². Nuclear fission: heavy nucleus splits into lighter fragments + neutrons + energy (chain reaction). Nuclear fusion: light nuclei combine to form heavier nucleus + energy. BE/nucleon: peak at Fe-56 → most stable.",
    "svgKey": "ib-phys-7-atomic-nuclear",
    "landmarks": [
     "Mass defect Δm",
     "Binding energy = Δmc²",
     "BE per nucleon curve",
     "Iron-56: most stable (max BE/nucleon)",
     "Nuclear fission (chain reaction)",
     "Critical mass",
     "Nuclear fusion",
     "Q-value of nuclear reactions"
    ],
    "examQA": [
     {
      "q": "Explain what is meant by mass defect and binding energy.",
      "a": "Mass defect: the mass of a nucleus is less than the sum of the masses of its separate protons and neutrons. Mass defect Δm = (Z·mp + N·mn) − M_nucleus. Binding energy E = Δm·c²: the energy equivalent of mass defect; energy that must be supplied to completely separate all nucleons. Greater binding energy = more stable nucleus."
     },
     {
      "q": "Explain why both fission and fusion release energy.",
      "a": "Fission: very heavy nuclei (e.g. U-235) have low BE/nucleon. Splitting produces medium-mass nuclei with higher BE/nucleon → energy released = difference in total binding energy. Fusion: very light nuclei (H, He) have low BE/nucleon. Combining → nucleus with higher BE/nucleon → energy released. Both move toward the more stable region of the BE/nucleon curve."
     }
    ],
    "threejs3dFn": "createNucleus",
    "wikiUrl": "https://en.wikipedia.org/wiki/Nuclear_reaction"
   },
   {
    "id": "7-3-structure-matter",
    "name": "7.3 The structure of matter",
    "syllabusRef": "not on the current IB guide",
    "section": "Withdrawn from the current IB guide (first assessment 2025)",
    "description": "Standard model: matter built from quarks and leptons. Quarks: up (u), down (d), strange (s), charm (c), bottom (b), top (t). Proton: uud. Neutron: udd. Baryons (3 quarks), mesons (quark-antiquark). Leptons: electron, muon, tau, and their neutrinos. Four fundamental forces: strong, electromagnetic, weak, gravitational.",
    "svgKey": "ib-phys-7-atomic-nuclear",
    "landmarks": [
     "Quarks: u, d, s, c, b, t (and antiquarks)",
     "Proton = uud, neutron = udd",
     "Baryons (3 quarks), mesons (q+q̄)",
     "Hadrons (feel strong force)",
     "Leptons (e, µ, τ, νe, νµ, ντ)",
     "Four fundamental forces",
     "Exchange particles (gluons, W±, Z⁰, photons)",
     "Conservation laws (charge, baryon, lepton number)"
    ],
    "examQA": [
     {
      "q": "State the quark content of a proton and a neutron.",
      "a": "Proton: uud (two up quarks, one down quark). Charge = +2/3 + 2/3 − 1/3 = +1. Neutron: udd (one up, two down). Charge = +2/3 − 1/3 − 1/3 = 0."
     },
     {
      "q": "State one difference between hadrons and leptons.",
      "a": "Hadrons: composed of quarks; feel the strong nuclear force; include protons, neutrons, pions. Leptons: fundamental particles (not made of quarks); do not feel the strong force; include electrons, muons, neutrinos. Also: hadrons are much more massive than typical leptons."
     }
    ],
    "threejs3dFn": "createNucleus",
    "wikiUrl": "https://en.wikipedia.org/wiki/Standard_Model"
   },
   {
    "id": "8-1-energy-sources",
    "name": "8.1 Energy sources",
    "syllabusRef": "not on the current IB guide",
    "section": "Withdrawn from the current IB guide (first assessment 2025)",
    "description": "Primary energy sources: fossil fuels (coal, oil, gas), nuclear, renewable (solar, wind, hydro, geothermal, tidal). Energy density: nuclear fuel is by far the highest (~10⁶ × fossil fuels); fossil fuels are well above renewables and batteries. Sankey diagrams show energy flows. Electricity generation: rotating turbines in magnetic fields. Efficiency = useful output / total input. Global energy use and trends.",
    "svgKey": "ib-phys-8-energy-production",
    "landmarks": [
     "Primary energy sources",
     "Fossil fuels (coal, oil, natural gas)",
     "Nuclear fission reactors",
     "Renewable: solar, wind, hydro, wave, tidal",
     "Sankey diagrams",
     "Efficiency = P_useful/P_input",
     "Global energy consumption",
     "Carbon capture"
    ],
    "examQA": [
     {
      "q": "Explain why fossil fuels still dominate global energy supply despite climate impacts.",
      "a": "Fossil fuels have high energy density (easily stored and transported), established infrastructure, relatively low extraction costs, and provide reliable baseload energy (unlike intermittent solar/wind). Switching requires large capital investment in new infrastructure and grid storage. Political and economic factors also delay transition."
     },
     {
      "q": "Explain the operation of a nuclear fission reactor.",
      "a": "Fuel: enriched uranium (U-235). Fission: neutron absorbed → U-235 splits → daughter nuclei + 2-3 neutrons + energy (heat). Control rods (boron/cadmium): absorb neutrons to control chain reaction. Moderator (water/graphite): slow neutrons for efficient fission. Heat exchanger: transfers thermal energy to steam → turbine → generator."
     }
    ],
    "threejs3dFn": "createEnergyTransfer",
    "wikiUrl": "https://en.wikipedia.org/wiki/Energy_source"
   },
   {
    "id": "8-2-thermal-energy-transfer",
    "name": "8.2 Thermal energy transfer",
    "syllabusRef": "B.1",
    "section": "B. The particulate nature of matter",
    "description": "Three mechanisms: conduction, convection, radiation. Conduction: vibration of adjacent particles (best in metals). Convection: bulk movement of fluid due to density differences. Radiation: EM waves (infrared); rate ∝ T⁴ (Stefan-Boltzmann law). Greenhouse effect: atmosphere absorbs outgoing IR. Albedo: fraction of radiation reflected.",
    "svgKey": "ib-phys-8-energy-production",
    "landmarks": [
     "Conduction (metals best)",
     "Convection (bulk fluid movement)",
     "Radiation (EM, no medium needed)",
     "Stefan-Boltzmann law: P = σAT⁴",
     "σ = 5.67×10⁻⁸ W m⁻² K⁻⁴",
     "Albedo (reflected fraction)",
     "Greenhouse effect",
     "Emissivity and black body radiation"
    ],
    "examQA": [
     {
      "q": "Distinguish between conduction, convection and radiation.",
      "a": "Conduction: energy transfer by particle vibrations passing to adjacent particles; requires medium; fastest in metals (free electrons). Convection: energy transfer by bulk movement of fluid (density-driven or forced); requires fluid medium. Radiation: energy transfer by EM waves; does not require medium; occurs in vacuum."
     },
     {
      "q": "A star has surface temperature 6000 K and radius 7×10⁸ m. Calculate luminosity (σ=5.67×10⁻⁸).",
      "a": "P = σAT⁴ = σ × 4πR² × T⁴ = 5.67×10⁻⁸ × 4π × (7×10⁸)² × 6000⁴. 4πR² = 6.16×10¹⁸ m². T⁴ = 1.296×10¹⁵. P = 5.67×10⁻⁸ × 6.16×10¹⁸ × 1.296×10¹⁵ ≈ 4.5×10²⁶ W."
     }
    ],
    "threejs3dFn": "createHeatConduction",
    "wikiUrl": "https://en.wikipedia.org/wiki/Heat_transfer"
   }
  ]
 }
};
