const SVG_BATCH2 = {
  'mbbs-obgyn-multiple': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <style>
    .lbl { font-family: sans-serif; font-size: 10px; fill: var(--text); }
    .sm { font-size: 8px; fill: var(--text-dim); }
    .pl { fill: var(--surface); stroke: var(--accent); stroke-width: 1.5; }
    .ch { fill: none; stroke: var(--border); stroke-dasharray: 2,2; }
    .am { fill: none; stroke: var(--accent); stroke-opacity: 0.5; }
    .bb { fill: var(--text-dim); stroke: none; }
    @keyframes pulse { 0% { r: 1.5; } 50% { r: 2.5; } 100% { r: 1.5; } }
    .pulsing { animation: pulse 2s infinite; fill: red; }
  </style>
  <rect width="100%" height="100%" fill="var(--surface)"/>
  
  <text x="10" y="20" class="lbl" font-weight="bold">Chorionicity &amp; Amnionicity</text>
  
  <!-- DCDA -->
  <circle cx="40" cy="50" r="20" class="ch" />
  <circle cx="40" cy="50" r="16" class="am" />
  <circle cx="36" cy="48" r="4" class="bb" />
  <ellipse cx="40" cy="54" rx="4" ry="6" class="bb" />
  
  <circle cx="85" cy="50" r="20" class="ch" />
  <circle cx="85" cy="50" r="16" class="am" />
  <circle cx="81" cy="48" r="4" class="bb" />
  <ellipse cx="85" cy="54" rx="4" ry="6" class="bb" />
  <text x="62" y="80" class="sm" text-anchor="middle">DCDA</text>
  
  <!-- MCDA -->
  <circle cx="160" cy="50" r="30" class="ch" />
  <circle cx="145" cy="50" r="14" class="am" />
  <circle cx="175" cy="50" r="14" class="am" />
  <circle cx="141" cy="48" r="4" class="bb" />
  <ellipse cx="145" cy="54" rx="4" ry="6" class="bb" />
  <circle cx="171" cy="48" r="4" class="bb" />
  <ellipse cx="175" cy="54" rx="4" ry="6" class="bb" />
  <text x="160" y="90" class="sm" text-anchor="middle">MCDA</text>
  
  <!-- MCMA -->
  <circle cx="240" cy="50" r="30" class="ch" />
  <circle cx="240" cy="50" r="26" class="am" />
  <circle cx="225" cy="48" r="4" class="bb" />
  <ellipse cx="229" cy="54" rx="4" ry="6" class="bb" />
  <circle cx="255" cy="48" r="4" class="bb" />
  <ellipse cx="251" cy="54" rx="4" ry="6" class="bb" />
  <text x="240" y="90" class="sm" text-anchor="middle">MCMA</text>
  
  <!-- TTTS -->
  <text x="10" y="120" class="lbl" font-weight="bold">Twin-to-Twin Transfusion (TTTS)</text>
  <ellipse cx="100" cy="160" rx="60" ry="30" class="pl" />
  <path d="M 70,160 Q 50,130 50,140" stroke="var(--accent)" stroke-width="2" fill="none" />
  <path d="M 130,160 Q 150,130 150,140" stroke="var(--border)" stroke-width="2" fill="none" />
  <path d="M 75,155 Q 100,140 125,155" stroke="red" stroke-width="1.5" fill="none" stroke-dasharray="2,2" />
  <path d="M 80,165 Q 100,170 120,165" stroke="blue" stroke-width="1.5" fill="none" stroke-dasharray="2,2" />
  <circle cx="100" cy="148" r="1.5" class="pulsing" />
  <text x="100" y="185" class="sm" text-anchor="middle">Vascular Anastomoses</text>
  <text x="50" y="125" class="sm" text-anchor="middle">Donor</text>
  <text x="150" y="125" class="sm" text-anchor="middle">Recipient</text>
  
  <!-- Breech -->
  <text x="220" y="120" class="lbl" font-weight="bold">Breech Presentations</text>
  <rect x="230" y="130" width="160" height="90" rx="4" stroke="var(--border)" fill="none" />
  
  <!-- Frank -->
  <circle cx="260" cy="150" r="8" class="bb" />
  <ellipse cx="260" cy="170" rx="8" ry="12" class="bb" />
  <path d="M 255,180 L 250,140" stroke="var(--text-dim)" stroke-width="3" />
  <path d="M 265,180 L 270,140" stroke="var(--text-dim)" stroke-width="3" />
  <text x="260" y="210" class="sm" text-anchor="middle">Frank</text>
  
  <!-- Complete -->
  <circle cx="310" cy="150" r="8" class="bb" />
  <ellipse cx="310" cy="170" rx="8" ry="12" class="bb" />
  <path d="M 305,180 L 295,180 L 305,170" stroke="var(--text-dim)" stroke-width="3" fill="none"/>
  <path d="M 315,180 L 325,180 L 315,170" stroke="var(--text-dim)" stroke-width="3" fill="none"/>
  <text x="310" y="210" class="sm" text-anchor="middle">Complete</text>
  
  <!-- Footling -->
  <circle cx="360" cy="150" r="8" class="bb" />
  <ellipse cx="360" cy="170" rx="8" ry="12" class="bb" />
  <path d="M 355,180 L 345,180 L 355,170" stroke="var(--text-dim)" stroke-width="3" fill="none"/>
  <path d="M 365,180 L 365,195" stroke="var(--text-dim)" stroke-width="3" fill="none"/>
  <text x="360" y="210" class="sm" text-anchor="middle">Footling</text>
</svg>`,

  'mbbs-obgyn-medical': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <style>
    .lbl { font-family: sans-serif; font-size: 10px; fill: var(--text); }
    .sm { font-size: 8px; fill: var(--text-dim); }
    .ax { stroke: var(--border); stroke-width: 1; }
    .bar { fill: var(--accent); opacity: 0.7; }
    .tr { stroke: red; stroke-dasharray: 2,2; }
    .rbc { fill: #d9534f; }
  </style>
  <rect width="100%" height="100%" fill="var(--surface)"/>
  
  <text x="10" y="20" class="lbl" font-weight="bold">GDM Screening (75g OGTT)</text>
  <path d="M 20,40 L 20,110 L 150,110" class="ax" fill="none" />
  <rect x="30" y="70" width="20" height="40" class="bar" />
  <rect x="70" y="45" width="20" height="65" class="bar" />
  <rect x="110" y="60" width="20" height="50" class="bar" />
  <text x="40" y="120" class="sm" text-anchor="middle">Fasting</text>
  <text x="80" y="120" class="sm" text-anchor="middle">1-Hour</text>
  <text x="120" y="120" class="sm" text-anchor="middle">2-Hour</text>
  
  <path d="M 15,70 L 55,70" class="tr" fill="none" />
  <text x="40" y="65" class="sm" fill="red" text-anchor="middle">&gt;92</text>
  <path d="M 55,45 L 95,45" class="tr" fill="none" />
  <text x="80" y="40" class="sm" fill="red" text-anchor="middle">&gt;180</text>
  <path d="M 95,60 L 135,60" class="tr" fill="none" />
  <text x="120" y="55" class="sm" fill="red" text-anchor="middle">&gt;153</text>
  
  <text x="180" y="20" class="lbl" font-weight="bold">Fetal Effects of Maternal Hyperglycemia</text>
  <rect x="180" y="30" width="200" height="90" rx="4" stroke="var(--border)" fill="none" />
  <circle cx="230" cy="70" r="15" fill="#f0e6d2" stroke="var(--border)" />
  <ellipse cx="230" cy="100" rx="25" ry="20" fill="#f0e6d2" stroke="var(--border)" />
  <text x="230" y="65" class="sm" text-anchor="middle">Macrosomia</text>
  
  <path d="M 300,70 A 8 8 0 0 1 316,70 A 8 8 0 0 1 332,70 Q 332,85 316,95 Q 300,85 300,70" fill="red" />
  <text x="316" y="105" class="sm" text-anchor="middle">Hypertrophy (Septal)</text>
  
  <path d="M 190,40 Q 200,30 210,40 T 230,40 T 250,40" stroke="blue" fill="none" stroke-width="2" opacity="0.4" />
  <path d="M 190,50 Q 200,40 210,50 T 230,50 T 250,50" stroke="blue" fill="none" stroke-width="2" opacity="0.4" />
  
  <text x="10" y="150" class="lbl" font-weight="bold">Anemia in Pregnancy</text>
  <path d="M 20,180 L 380,180" class="ax" fill="none" />
  <circle cx="80" cy="180" r="4" fill="var(--accent)" />
  <circle cx="200" cy="180" r="4" fill="var(--accent)" />
  <circle cx="320" cy="180" r="4" fill="var(--accent)" />
  
  <text x="80" y="195" class="sm" text-anchor="middle">Trimester 1</text>
  <text x="200" y="195" class="sm" text-anchor="middle">Trimester 2</text>
  <text x="320" y="195" class="sm" text-anchor="middle">Trimester 3</text>
  
  <rect x="40" y="210" width="100" height="60" rx="4" stroke="var(--border)" fill="none" />
  <text x="90" y="225" class="sm" text-anchor="middle" font-weight="bold">Iron Deficiency</text>
  <circle cx="60" cy="245" r="8" class="rbc" />
  <circle cx="60" cy="245" r="4" fill="var(--surface)" />
  <text x="90" y="248" class="sm">Microcytic</text>
  <text x="90" y="260" class="sm">Hypochromic</text>
  
  <rect x="180" y="210" width="180" height="60" rx="4" stroke="var(--border)" fill="none" />
  <text x="270" y="225" class="sm" text-anchor="middle" font-weight="bold">Folate / B12 Deficiency</text>
  <circle cx="210" cy="245" r="14" class="rbc" />
  <circle cx="210" cy="245" r="3" fill="var(--surface)" />
  <text x="240" y="248" class="sm">Macrocytic (Megaloblastic)</text>
  <text x="240" y="260" class="sm">Hypersegmented Neutrophils</text>
  
  <circle cx="330" cy="245" r="10" fill="#e0e0f8" stroke="#888" />
  <circle cx="325" cy="242" r="3" fill="purple" />
  <circle cx="332" cy="240" r="3" fill="purple" />
  <circle cx="335" cy="246" r="3" fill="purple" />
  <circle cx="328" cy="250" r="3" fill="purple" />
  <circle cx="322" cy="248" r="3" fill="purple" />
</svg>`,

  'mbbs-obgyn-operative': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <style>
    .lbl { font-family: sans-serif; font-size: 10px; fill: var(--text); }
    .sm { font-size: 8px; fill: var(--text-dim); }
    .inc { stroke: red; stroke-width: 2; fill: none; stroke-dasharray: 3,3; }
    .body { fill: none; stroke: var(--border); stroke-width: 1.5; }
    .box { fill: var(--surface); stroke: var(--accent); rx: 4; ry: 4; }
    .arr { stroke: var(--text-dim); stroke-width: 1; fill: none; }
  </style>
  <rect width="100%" height="100%" fill="var(--surface)"/>
  
  <text x="10" y="20" class="lbl" font-weight="bold">C-Section Incisions</text>
  <path d="M 40,40 Q 60,80 40,120 Q 80,140 120,120 Q 100,80 120,40" class="body" />
  <circle cx="80" cy="80" r="3" class="body" />
  
  <path d="M 80,90 L 80,120" class="inc" />
  <text x="90" y="105" class="sm" fill="red">Classical</text>
  
  <path d="M 60,130 Q 80,140 100,130" class="inc" />
  <text x="80" y="145" class="sm" fill="red" text-anchor="middle">Pfannenstiel</text>
  
  <text x="220" y="20" class="lbl" font-weight="bold">Instrumental Delivery</text>
  <rect x="220" y="30" width="160" height="120" rx="4" stroke="var(--border)" fill="none" />
  
  <path d="M 240,60 Q 250,80 240,100 L 235,130 L 245,130 L 250,100" stroke="var(--text)" fill="#ddd" />
  <path d="M 280,60 Q 270,80 280,100 L 285,130 L 275,130 L 270,100" stroke="var(--text)" fill="#ddd" />
  <circle cx="260" cy="80" r="18" fill="var(--accent)" opacity="0.3" />
  <text x="260" y="145" class="sm" text-anchor="middle">Forceps</text>
  
  <path d="M 330,60 Q 320,60 320,70 L 340,70 Q 340,60 330,60 Z" stroke="var(--text)" fill="#ddd" />
  <path d="M 330,50 L 330,60" stroke="var(--text)" stroke-width="2" fill="none" />
  <path d="M 330,40 L 330,50" stroke="var(--text)" stroke-width="1" stroke-dasharray="2,2" fill="none" />
  <circle cx="330" cy="85" r="15" fill="var(--accent)" opacity="0.3" />
  <text x="330" y="145" class="sm" text-anchor="middle">Ventouse</text>
  
  <text x="10" y="170" class="lbl" font-weight="bold">Indications for C-Section</text>
  
  <rect x="140" y="180" width="120" height="20" class="box" />
  <text x="200" y="193" class="sm" text-anchor="middle">Indications</text>
  
  <path d="M 200,200 L 200,210" class="arr" />
  <path d="M 80,210 L 320,210" class="arr" />
  <path d="M 80,210 L 80,220" class="arr" />
  <path d="M 200,210 L 200,220" class="arr" />
  <path d="M 320,210 L 320,220" class="arr" />
  
  <rect x="30" y="220" width="100" height="25" class="box" />
  <text x="80" y="232" class="sm" text-anchor="middle">Maternal</text>
  <text x="80" y="241" class="sm" text-anchor="middle">Eclampsia, Prior CS</text>
  
  <rect x="150" y="220" width="100" height="25" class="box" />
  <text x="200" y="232" class="sm" text-anchor="middle">Fetal</text>
  <text x="200" y="241" class="sm" text-anchor="middle">Distress, Breech</text>
  
  <rect x="270" y="220" width="100" height="25" class="box" />
  <text x="320" y="232" class="sm" text-anchor="middle">Placental</text>
  <text x="320" y="241" class="sm" text-anchor="middle">Previa, Abruption</text>
</svg>`,

  'mbbs-obgyn-menstrual': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <style>
    .lbl { font-family: sans-serif; font-size: 10px; fill: var(--text); }
    .sm { font-size: 8px; fill: var(--text-dim); }
    .ax { stroke: var(--border); stroke-width: 1; }
    .fsh { stroke: #3498db; fill: none; stroke-width: 1.5; }
    .lh { stroke: #e74c3c; fill: none; stroke-width: 1.5; }
    .est { stroke: #2ecc71; fill: none; stroke-width: 1.5; }
    .pro { stroke: #9b59b6; fill: none; stroke-width: 1.5; }
    .box { fill: var(--surface); stroke: var(--accent); rx: 2; ry: 2; }
  </style>
  <rect width="100%" height="100%" fill="var(--surface)"/>
  
  <text x="10" y="20" class="lbl" font-weight="bold">Menstrual Cycle Hormones</text>
  <path d="M 20,30 L 20,110 L 200,110" class="ax" fill="none" />
  <path d="M 110,30 L 110,110" class="ax" stroke-dasharray="2,2" fill="none" />
  <text x="110" y="120" class="sm" text-anchor="middle">Ovulation (Day 14)</text>
  
  <path d="M 20,90 Q 60,90 90,80 Q 110,50 120,80 Q 160,95 200,95" class="fsh" />
  <text x="25" y="85" class="sm" fill="#3498db">FSH</text>
  
  <path d="M 20,95 Q 60,95 100,90 Q 110,20 120,90 Q 160,95 200,95" class="lh" />
  <text x="115" y="30" class="sm" fill="#e74c3c">LH Surge</text>
  
  <path d="M 20,105 Q 80,100 100,50 Q 120,100 160,70 Q 190,100 200,100" class="est" />
  <text x="60" y="65" class="sm" fill="#2ecc71">Estrogen</text>
  
  <path d="M 20,108 L 110,108 Q 150,40 180,80 Q 190,100 200,105" class="pro" />
  <text x="160" y="55" class="sm" fill="#9b59b6">Progesterone</text>
  
  <text x="220" y="20" class="lbl" font-weight="bold">AUB: PALM-COEIN</text>
  <rect x="220" y="30" width="160" height="90" class="box" fill="none" />
  <line x1="300" y1="30" x2="300" y2="120" stroke="var(--border)" />
  <text x="260" y="45" class="sm" text-anchor="middle" font-weight="bold">Structural</text>
  <text x="340" y="45" class="sm" text-anchor="middle" font-weight="bold">Non-Structural</text>
  
  <text x="230" y="60" class="sm"><tspan font-weight="bold">P</tspan>olyp</text>
  <text x="230" y="75" class="sm"><tspan font-weight="bold">A</tspan>denomyosis</text>
  <text x="230" y="90" class="sm"><tspan font-weight="bold">L</tspan>eiomyoma</text>
  <text x="230" y="105" class="sm"><tspan font-weight="bold">M</tspan>alignancy</text>
  
  <text x="310" y="60" class="sm"><tspan font-weight="bold">C</tspan>oagulopathy</text>
  <text x="310" y="75" class="sm"><tspan font-weight="bold">O</tspan>vulatory dyn.</text>
  <text x="310" y="90" class="sm"><tspan font-weight="bold">E</tspan>ndometrial</text>
  <text x="310" y="105" class="sm"><tspan font-weight="bold">I</tspan>atrogenic, <tspan font-weight="bold">N</tspan>ot-class</text>
  
  <text x="10" y="150" class="lbl" font-weight="bold">Secondary Amenorrhea Evaluation</text>
  <rect x="150" y="160" width="100" height="20" class="box" />
  <text x="200" y="173" class="sm" text-anchor="middle">Pregnancy Test</text>
  
  <path d="M 200,180 L 200,200" class="ax" fill="none" />
  <rect x="150" y="200" width="100" height="20" class="box" />
  <text x="200" y="213" class="sm" text-anchor="middle">TSH, Prolactin, FSH</text>
  
  <path d="M 200,220 L 200,230" class="ax" fill="none" />
  <path d="M 80,230 L 320,230" class="ax" fill="none" />
  <path d="M 80,230 L 80,240" class="ax" fill="none" />
  <path d="M 200,230 L 200,240" class="ax" fill="none" />
  <path d="M 320,230 L 320,240" class="ax" fill="none" />
  
  <rect x="30" y="240" width="100" height="30" class="box" />
  <text x="80" y="252" class="sm" text-anchor="middle">High FSH</text>
  <text x="80" y="262" class="sm" text-anchor="middle">(Ovarian Failure)</text>
  
  <rect x="150" y="240" width="100" height="30" class="box" />
  <text x="200" y="252" class="sm" text-anchor="middle">High Prolactin</text>
  <text x="200" y="262" class="sm" text-anchor="middle">(Prolactinoma)</text>
  
  <rect x="270" y="240" width="100" height="30" class="box" />
  <text x="320" y="252" class="sm" text-anchor="middle">Normal/Low FSH</text>
  <text x="320" y="262" class="sm" text-anchor="middle">(Hypothal/PCOS)</text>
</svg>`,

  'mbbs-obgyn-pid': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <style>
    .lbl { font-family: sans-serif; font-size: 10px; fill: var(--text); }
    .sm { font-size: 8px; fill: var(--text-dim); }
    .body { fill: var(--surface); stroke: var(--text); stroke-width: 1.5; }
    .inf { fill: none; stroke: red; stroke-width: 2; stroke-dasharray: 4,4; }
    .liv { fill: #d9534f; opacity: 0.8; stroke: #c9302c; }
    .adh { stroke: #f39c12; stroke-width: 1.5; fill: none; }
    .bact { fill: purple; }
    @keyframes crawl { 100% { stroke-dashoffset: -8; } }
    .crawling { animation: crawl 1s linear infinite; }
  </style>
  <rect width="100%" height="100%" fill="var(--surface)"/>
  
  <text x="10" y="20" class="lbl" font-weight="bold">PID Ascending Pathway</text>
  <path d="M 60,140 L 60,100 Q 40,80 60,60 Q 80,40 100,60 Q 120,80 100,100 L 100,140 Z" class="body" />
  <path d="M 60,60 Q 30,50 20,70 Q 30,80 40,70 L 60,65" class="body" />
  <path d="M 100,60 Q 130,50 140,70 Q 130,80 120,70 L 100,65" class="body" />
  <ellipse cx="25" cy="75" rx="8" ry="12" class="body" />
  <ellipse cx="135" cy="75" rx="8" ry="12" class="body" />
  
  <path d="M 80,130 L 80,90 Q 70,70 40,65" class="inf crawling" />
  <path d="M 80,90 Q 90,70 120,65" class="inf crawling" />
  
  <text x="80" y="150" class="sm" text-anchor="middle">Vagina/Cervix</text>
  <text x="80" y="55" class="sm" text-anchor="middle">Uterus (Endometritis)</text>
  <text x="35" y="45" class="sm" text-anchor="middle">Tubes (Salpingitis)</text>
  
  <text x="220" y="20" class="lbl" font-weight="bold">Fitz-Hugh-Curtis Syndrome</text>
  <rect x="220" y="30" width="160" height="120" rx="4" stroke="var(--border)" fill="none" />
  <path d="M 240,60 Q 300,50 350,90 Q 300,110 240,100 Z" class="liv" />
  <path d="M 240,40 L 350,40" stroke="var(--text)" stroke-width="2" />
  <text x="360" y="45" class="sm">Diaphragm /</text>
  <text x="360" y="55" class="sm">Abd. Wall</text>
  
  <line x1="260" y1="40" x2="260" y2="65" class="adh" />
  <line x1="280" y1="40" x2="280" y2="60" class="adh" />
  <line x1="300" y1="40" x2="300" y2="62" class="adh" />
  <line x1="320" y1="40" x2="320" y2="70" class="adh" />
  
  <text x="290" y="140" class="sm" text-anchor="middle">Violin String Adhesions (Perihepatitis)</text>
  
  <text x="10" y="180" class="lbl" font-weight="bold">Common Pathogens</text>
  
  <rect x="30" y="200" width="150" height="60" rx="4" stroke="var(--border)" fill="none" />
  <text x="105" y="215" class="sm" text-anchor="middle" font-weight="bold">Chlamydia trachomatis</text>
  <text x="105" y="230" class="sm" text-anchor="middle">Intracellular, inclusion bodies</text>
  <polygon points="50,220 70,210 90,230 70,250" fill="#e0e0f8" stroke="#888" />
  <circle cx="70" cy="230" r="5" fill="#aaa" />
  <circle cx="60" cy="225" r="1.5" class="bact" />
  <circle cx="63" cy="222" r="1.5" class="bact" />
  <circle cx="58" cy="220" r="1.5" class="bact" />
  
  <rect x="210" y="200" width="150" height="60" rx="4" stroke="var(--border)" fill="none" />
  <text x="285" y="215" class="sm" text-anchor="middle" font-weight="bold">Neisseria gonorrhoeae</text>
  <text x="285" y="230" class="sm" text-anchor="middle">Gram-neg diplococci</text>
  <circle cx="260" cy="240" r="3" fill="red" />
  <circle cx="266" cy="240" r="3" fill="red" />
  <circle cx="280" cy="245" r="3" fill="red" />
  <circle cx="286" cy="245" r="3" fill="red" />
  <circle cx="250" cy="250" r="3" fill="red" />
  <circle cx="256" cy="250" r="3" fill="red" />
</svg>`,

  'mbbs-obgyn-fibroids': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <style>
    .lbl { font-family: sans-serif; font-size: 10px; fill: var(--text); }
    .sm { font-size: 8px; fill: var(--text-dim); }
    .ut { fill: #f9eaee; stroke: var(--text); stroke-width: 2; }
    .en { fill: #e5a5a5; stroke: none; }
    .fib { fill: #d1b2b2; stroke: var(--text); stroke-width: 1; }
    .aden { fill: #e5a5a5; opacity: 0.7; }
    .box { fill: var(--surface); stroke: var(--accent); rx: 4; ry: 4; }
    .arr { stroke: var(--text-dim); stroke-width: 1; fill: none; }
  </style>
  <rect width="100%" height="100%" fill="var(--surface)"/>
  
  <text x="10" y="20" class="lbl" font-weight="bold">Uterine Leiomyoma (Fibroids)</text>
  <path d="M 60,120 L 60,80 Q 40,40 100,40 Q 160,40 140,80 L 140,120 Z" class="ut" />
  <path d="M 90,110 L 95,60 L 105,60 L 110,110 Z" class="en" />
  
  <circle cx="100" cy="70" r="10" class="fib" />
  <text x="100" y="90" class="sm" text-anchor="middle">Submucosal</text>
  
  <circle cx="70" cy="65" r="12" class="fib" />
  <text x="60" y="50" class="sm" text-anchor="middle">Intramural</text>
  
  <circle cx="140" cy="55" r="10" class="fib" />
  <text x="155" y="45" class="sm">Subserosal</text>
  
  <path d="M 120,40 L 130,20 L 140,40" class="fib" />
  <circle cx="130" cy="15" r="8" class="fib" />
  <text x="145" y="15" class="sm">Pedunculated</text>
  
  <text x="220" y="20" class="lbl" font-weight="bold">Adenomyosis</text>
  <rect x="220" y="30" width="160" height="90" rx="4" stroke="var(--border)" fill="none" />
  <path d="M 230,110 L 230,40 L 270,40 L 270,110 Z" class="en" />
  <path d="M 270,110 L 270,40 L 370,40 L 370,110 Z" class="ut" />
  
  <circle cx="280" cy="60" r="6" class="aden" />
  <circle cx="290" cy="80" r="8" class="aden" />
  <circle cx="310" cy="50" r="5" class="aden" />
  <path d="M 270,70 Q 290,70 290,60" stroke="#e5a5a5" stroke-width="4" fill="none" />
  
  <text x="250" y="105" class="sm" text-anchor="middle" font-weight="bold">Endometrium</text>
  <text x="320" y="105" class="sm" text-anchor="middle" font-weight="bold">Myometrium</text>
  <text x="320" y="70" class="sm" text-anchor="middle">Glands/Stroma</text>
  <text x="320" y="80" class="sm" text-anchor="middle">invading muscle</text>
  
  <text x="10" y="160" class="lbl" font-weight="bold">Management of Symptomatic Fibroids</text>
  
  <rect x="150" y="170" width="100" height="20" class="box" />
  <text x="200" y="183" class="sm" text-anchor="middle">Desires Fertility?</text>
  
  <path d="M 200,190 L 200,200" class="arr" />
  <path d="M 100,200 L 300,200" class="arr" />
  <path d="M 100,200 L 100,210" class="arr" />
  <path d="M 300,200 L 300,210" class="arr" />
  
  <text x="110" y="198" class="sm">Yes</text>
  <text x="280" y="198" class="sm">No</text>
  
  <rect x="50" y="210" width="100" height="30" class="box" />
  <text x="100" y="222" class="sm" text-anchor="middle">Myomectomy</text>
  <text x="100" y="232" class="sm" text-anchor="middle">(Hysteroscopic/Abd)</text>
  
  <rect x="250" y="210" width="100" height="30" class="box" />
  <text x="300" y="222" class="sm" text-anchor="middle">Definitive / Intervent.</text>
  
  <path d="M 300,240 L 300,250" class="arr" />
  <rect x="220" y="250" width="160" height="30" class="box" />
  <text x="300" y="262" class="sm" text-anchor="middle">Hysterectomy, Uterine</text>
  <text x="300" y="272" class="sm" text-anchor="middle">Artery Embolization (UAE)</text>
</svg>`
};

export default SVG_BATCH2;
