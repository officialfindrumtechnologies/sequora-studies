const SVG_BATCH3 = {
  'mbbs-obgyn-pcos': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <style>
      .bg { fill: var(--surface); }
      .lbl { fill: var(--text); font-size: 14px; font-family: sans-serif; font-weight: bold; }
      .sm { fill: var(--text-dim); font-size: 10px; font-family: sans-serif; }
      .stroke { stroke: var(--border); stroke-width: 2; fill: none; }
      .stroke-thick { stroke: var(--border); stroke-width: 3; fill: none; }
      .accent-stroke { stroke: var(--accent); stroke-width: 2; fill: none; }
      .fill { fill: var(--border); opacity: 0.1; }
      .accent-fill { fill: var(--accent); opacity: 0.2; }
      .dot { fill: var(--accent); }
      @keyframes pulse { 0% { transform: scale(0.98); opacity: 0.8; } 100% { transform: scale(1.02); opacity: 1; } }
      .anim-pulse { animation: pulse 2s infinite alternate; transform-origin: center; }
    </style>
    <rect width="400" height="300" class="bg"/>
    
    <!-- Normal Ovary -->
    <g transform="translate(60, 60)">
      <ellipse cx="0" cy="0" rx="40" ry="25" class="stroke fill"/>
      <circle cx="-15" cy="-5" r="4" class="stroke"/>
      <circle cx="5" cy="-8" r="6" class="stroke"/>
      <circle cx="15" cy="5" r="5" class="stroke"/>
      <circle cx="-5" cy="10" r="3" class="stroke"/>
      <circle cx="-25" cy="0" r="7" class="accent-stroke anim-pulse"/>
      <text x="0" y="45" class="sm" text-anchor="middle">Normal Ovary</text>
    </g>

    <!-- Polycystic Ovary -->
    <g transform="translate(200, 60)">
      <ellipse cx="0" cy="0" rx="50" ry="35" class="stroke fill"/>
      <circle cx="-35" cy="0" r="4" class="accent-stroke"/>
      <circle cx="-28" cy="-15" r="4" class="accent-stroke"/>
      <circle cx="-15" cy="-25" r="4" class="accent-stroke"/>
      <circle cx="0" cy="-28" r="4" class="accent-stroke"/>
      <circle cx="15" cy="-25" r="4" class="accent-stroke"/>
      <circle cx="28" cy="-15" r="4" class="accent-stroke"/>
      <circle cx="35" cy="0" r="4" class="accent-stroke"/>
      <circle cx="28" cy="15" r="4" class="accent-stroke"/>
      <circle cx="15" cy="25" r="4" class="accent-stroke"/>
      <circle cx="0" cy="28" r="4" class="accent-stroke"/>
      <circle cx="-15" cy="25" r="4" class="accent-stroke"/>
      <circle cx="-28" cy="15" r="4" class="accent-stroke"/>
      <text x="0" y="55" class="sm" text-anchor="middle">PCOS (String of Pearls)</text>
    </g>

    <!-- Endometriosis Sites -->
    <g transform="translate(100, 180)">
      <!-- Uterus & Tubes -->
      <path d="M-20,-10 C-30,-40 30,-40 20,-10 C40,-15 60,-5 70,10 C60,20 40,5 20,5 C15,20 10,40 10,50 L-10,50 C-10,40 -15,20 -20,5 C-40,5 -60,20 -70,10 C-60,-5 -40,-15 -20,-10 Z" class="stroke fill"/>
      <!-- Ovaries -->
      <ellipse cx="-50" cy="15" rx="15" ry="10" class="stroke"/>
      <ellipse cx="50" cy="15" rx="15" ry="10" class="stroke"/>
      <!-- Endometriotic spots -->
      <circle cx="-45" cy="15" r="3" class="dot"/>
      <circle cx="52" cy="12" r="4" class="dot anim-pulse"/>
      <circle cx="0" cy="40" r="2.5" class="dot"/>
      <circle cx="8" cy="35" r="2" class="dot"/>
      <circle cx="-30" cy="-5" r="2" class="dot"/>
      <circle cx="30" cy="-5" r="2.5" class="dot"/>
      
      <text x="0" y="70" class="sm" text-anchor="middle">Endometriosis Sites</text>
    </g>

    <!-- Rotterdam Criteria -->
    <g transform="translate(300, 160)">
      <rect x="-40" y="0" width="80" height="100" rx="5" class="stroke fill"/>
      <text x="0" y="20" class="sm" text-anchor="middle">Rotterdam</text>
      <text x="0" y="32" class="sm" text-anchor="middle">(need 2 of 3)</text>
      <path d="M-30,45 L-20,45" class="accent-stroke"/>
      <text x="-10" y="48" class="sm">Oligo/Anov</text>
      <path d="M-30,65 L-20,65" class="accent-stroke"/>
      <text x="-10" y="68" class="sm">HyperAndro</text>
      <path d="M-30,85 L-20,85" class="accent-stroke"/>
      <text x="-10" y="88" class="sm">PCO on US</text>
    </g>
  </svg>`,

  'mbbs-obgyn-prolapse': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <style>
      .bg { fill: var(--surface); }
      .lbl { fill: var(--text); font-size: 14px; font-family: sans-serif; font-weight: bold; }
      .sm { fill: var(--text-dim); font-size: 10px; font-family: sans-serif; }
      .stroke { stroke: var(--border); stroke-width: 2; fill: none; }
      .accent-stroke { stroke: var(--accent); stroke-width: 2; fill: none; }
      .fill { fill: var(--border); opacity: 0.1; }
      .accent-fill { fill: var(--accent); opacity: 0.2; }
      .muscle { stroke: #d9534f; stroke-width: 4; fill: none; opacity: 0.6; }
      .arrow { fill: var(--accent); }
    </style>
    <rect width="400" height="300" class="bg"/>

    <!-- Normal Anatomy -->
    <g transform="translate(80, 100)">
      <text x="0" y="-60" class="lbl" text-anchor="middle">Normal</text>
      <!-- Bladder -->
      <path d="M-30,0 C-10,0 -10,-30 -30,-30 C-50,-30 -50,0 -30,0 Z" class="stroke fill"/>
      <path d="M-30,0 L-20,30" class="stroke"/>
      <!-- Uterus & Vagina -->
      <path d="M10,-10 C20,-40 0,-50 -10,-30 C-20,-10 -5,0 10,-10 Z" class="stroke fill"/>
      <path d="M5,0 L-10,40 M15,0 L0,40" class="stroke"/>
      <!-- Rectum -->
      <path d="M30,-20 C40,-10 30,20 10,45" class="stroke"/>
      <path d="M40,-20 C50,-10 40,20 20,45" class="stroke"/>
      <!-- Pelvic Floor Muscle -->
      <path d="M-40,25 Q-10,50 30,25" class="muscle"/>
      <text x="-30" y="-40" class="sm">Bladder</text>
      <text x="0" y="-55" class="sm">Uterus</text>
      <text x="40" y="-25" class="sm">Rectum</text>
    </g>

    <!-- Cystocele -->
    <g transform="translate(200, 100)">
      <text x="0" y="-60" class="lbl" text-anchor="middle">Cystocele</text>
      <!-- Bladder Prolapsing -->
      <path d="M-20,10 C0,10 0,-20 -20,-20 C-40,-20 -40,10 -20,10 Z" class="accent-stroke accent-fill"/>
      <path d="M-20,10 L-10,35" class="stroke"/>
      <!-- Arrow -->
      <path d="M-25,-10 L-15,5" class="accent-stroke"/>
      <polygon points="-15,5 -20,0 -10,-5" class="arrow" transform="rotate(45 -15 5)"/>
      <!-- Uterus & Vagina -->
      <path d="M10,-10 C20,-40 0,-50 -10,-30 C-20,-10 -5,0 10,-10 Z" class="stroke fill"/>
      <path d="M-10,15 L-10,40 M15,0 L0,40" class="stroke"/>
      <!-- Rectum -->
      <path d="M30,-20 C40,-10 30,20 10,45" class="stroke"/>
      <path d="M40,-20 C50,-10 40,20 20,45" class="stroke"/>
      <!-- Pelvic Floor Muscle -->
      <path d="M-40,35 Q-10,60 30,25" class="muscle"/>
    </g>

    <!-- Rectocele -->
    <g transform="translate(320, 100)">
      <text x="0" y="-60" class="lbl" text-anchor="middle">Rectocele</text>
      <!-- Bladder -->
      <path d="M-30,0 C-10,0 -10,-30 -30,-30 C-50,-30 -50,0 -30,0 Z" class="stroke fill"/>
      <path d="M-30,0 L-20,30" class="stroke"/>
      <!-- Uterus & Vagina -->
      <path d="M10,-10 C20,-40 0,-50 -10,-30 C-20,-10 -5,0 10,-10 Z" class="stroke fill"/>
      <path d="M5,0 L-10,40 M20,15 L0,40" class="stroke"/>
      <!-- Rectum Prolapsing -->
      <path d="M30,-20 C40,-10 30,10 5,20 L10,45" class="accent-stroke accent-fill"/>
      <path d="M40,-20 C50,-10 50,20 20,45" class="stroke"/>
      <!-- Arrow -->
      <path d="M35,0 L20,10" class="accent-stroke"/>
      <!-- Pelvic Floor Muscle -->
      <path d="M-40,25 Q-10,60 30,35" class="muscle"/>
    </g>

    <!-- Incontinence Types -->
    <g transform="translate(60, 240)">
      <rect x="0" y="0" width="120" height="40" rx="5" class="stroke"/>
      <text x="60" y="15" class="sm" text-anchor="middle">Stress Incontinence</text>
      <text x="60" y="30" class="sm" text-anchor="middle">Weak sphincter / cough</text>
    </g>
    <g transform="translate(220, 240)">
      <rect x="0" y="0" width="120" height="40" rx="5" class="stroke"/>
      <text x="60" y="15" class="sm" text-anchor="middle">Urge Incontinence</text>
      <text x="60" y="30" class="sm" text-anchor="middle">Detrusor overactivity</text>
    </g>
  </svg>`,

  'mbbs-obgyn-cervical': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <style>
      .bg { fill: var(--surface); }
      .lbl { fill: var(--text); font-size: 14px; font-family: sans-serif; font-weight: bold; }
      .sm { fill: var(--text-dim); font-size: 10px; font-family: sans-serif; }
      .stroke { stroke: var(--border); stroke-width: 2; fill: none; }
      .accent-stroke { stroke: var(--accent); stroke-width: 2; fill: none; }
      .fill { fill: var(--border); opacity: 0.1; }
      .accent-fill { fill: var(--accent); opacity: 0.4; }
      .cell { fill: var(--surface); stroke: var(--border); stroke-width: 1; }
      .dysplasia { fill: var(--accent); opacity: 0.7; }
    </style>
    <rect width="400" height="300" class="bg"/>

    <!-- Transformation Zone -->
    <g transform="translate(80, 80)">
      <text x="0" y="-50" class="lbl" text-anchor="middle">Cervix</text>
      <!-- Cervix Outline -->
      <path d="M-40,40 C-30,-20 30,-20 40,40" class="stroke fill"/>
      <path d="M-10,40 L-10,0 M10,40 L10,0" class="stroke"/>
      <!-- Squamocolumnar Junction -->
      <ellipse cx="0" cy="40" rx="25" ry="10" class="accent-stroke stroke-dasharray=4"/>
      <text x="0" y="65" class="sm" text-anchor="middle">Transformation Zone</text>
      <path d="M-20,45 L-40,60 M20,45 L40,60" class="stroke"/>
    </g>

    <!-- CIN Progression Diagram -->
    <g transform="translate(20, 160)">
      <!-- Basement membrane -->
      <path d="M0,80 L360,80" class="stroke"/>
      
      <!-- Normal -->
      <text x="40" y="-10" class="sm" text-anchor="middle">Normal</text>
      <rect x="20" y="0" width="40" height="80" class="fill"/>
      <!-- Basal cells -->
      <circle cx="30" cy="75" r="4" class="cell"/> <circle cx="40" cy="75" r="4" class="cell"/> <circle cx="50" cy="75" r="4" class="cell"/>
      <!-- Squamous cells -->
      <ellipse cx="40" cy="50" rx="15" ry="5" class="cell"/>
      <ellipse cx="40" cy="30" rx="18" ry="4" class="cell"/>
      <ellipse cx="40" cy="10" rx="20" ry="3" class="cell"/>

      <!-- CIN 1 -->
      <text x="120" y="-10" class="sm" text-anchor="middle">CIN 1</text>
      <rect x="100" y="0" width="40" height="80" class="fill"/>
      <circle cx="110" cy="75" r="4" class="dysplasia"/> <circle cx="120" cy="75" r="4" class="dysplasia"/> <circle cx="130" cy="75" r="4" class="dysplasia"/>
      <circle cx="115" cy="65" r="4" class="dysplasia"/> <circle cx="125" cy="65" r="4" class="dysplasia"/>
      <ellipse cx="120" cy="40" rx="15" ry="5" class="cell"/>
      <ellipse cx="120" cy="20" rx="18" ry="4" class="cell"/>

      <!-- CIN 2 -->
      <text x="200" y="-10" class="sm" text-anchor="middle">CIN 2</text>
      <rect x="180" y="0" width="40" height="80" class="fill"/>
      <circle cx="190" cy="75" r="4" class="dysplasia"/> <circle cx="200" cy="75" r="4" class="dysplasia"/> <circle cx="210" cy="75" r="4" class="dysplasia"/>
      <circle cx="195" cy="65" r="4" class="dysplasia"/> <circle cx="205" cy="65" r="4" class="dysplasia"/>
      <circle cx="190" cy="55" r="4" class="dysplasia"/> <circle cx="200" cy="55" r="4" class="dysplasia"/> <circle cx="210" cy="55" r="4" class="dysplasia"/>
      <circle cx="195" cy="45" r="4" class="dysplasia"/> <circle cx="205" cy="45" r="4" class="dysplasia"/>
      <ellipse cx="200" cy="20" rx="18" ry="4" class="cell"/>

      <!-- CIN 3 -->
      <text x="280" y="-10" class="sm" text-anchor="middle">CIN 3 / CIS</text>
      <rect x="260" y="0" width="40" height="80" class="fill"/>
      <circle cx="270" cy="75" r="4" class="dysplasia"/> <circle cx="280" cy="75" r="4" class="dysplasia"/> <circle cx="290" cy="75" r="4" class="dysplasia"/>
      <circle cx="275" cy="65" r="4" class="dysplasia"/> <circle cx="285" cy="65" r="4" class="dysplasia"/>
      <circle cx="270" cy="55" r="4" class="dysplasia"/> <circle cx="280" cy="55" r="4" class="dysplasia"/> <circle cx="290" cy="55" r="4" class="dysplasia"/>
      <circle cx="275" cy="45" r="4" class="dysplasia"/> <circle cx="285" cy="45" r="4" class="dysplasia"/>
      <circle cx="270" cy="35" r="4" class="dysplasia"/> <circle cx="280" cy="35" r="4" class="dysplasia"/> <circle cx="290" cy="35" r="4" class="dysplasia"/>
      <circle cx="275" cy="25" r="4" class="dysplasia"/> <circle cx="285" cy="25" r="4" class="dysplasia"/>
      <circle cx="280" cy="15" r="4" class="dysplasia"/>

      <!-- Cancer -->
      <text x="350" y="-10" class="sm" text-anchor="middle">Invasive</text>
      <circle cx="340" cy="75" r="4" class="dysplasia"/> <circle cx="350" cy="75" r="4" class="dysplasia"/> <circle cx="360" cy="75" r="4" class="dysplasia"/>
      <circle cx="345" cy="65" r="4" class="dysplasia"/> <circle cx="355" cy="65" r="4" class="dysplasia"/>
      <!-- Invasion -->
      <circle cx="345" cy="90" r="4" class="dysplasia anim-pulse"/>
      <circle cx="355" cy="95" r="4" class="dysplasia anim-pulse"/>
      <circle cx="350" cy="105" r="4" class="dysplasia anim-pulse"/>
      <path d="M330,80 L340,95 L360,85" class="accent-stroke"/>
    </g>
    
    <!-- Flowchart box -->
    <g transform="translate(240, 20)">
      <rect x="0" y="0" width="140" height="90" rx="5" class="stroke"/>
      <text x="70" y="15" class="sm" text-anchor="middle" font-weight="bold">Screening</text>
      <rect x="10" y="25" width="120" height="20" class="fill"/>
      <text x="70" y="38" class="sm" text-anchor="middle">Pap Smear / VIA</text>
      <rect x="10" y="55" width="120" height="20" class="fill"/>
      <text x="70" y="68" class="sm" text-anchor="middle">HPV DNA Testing</text>
    </g>
  </svg>`,

  'mbbs-obgyn-ovarian': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <style>
      .bg { fill: var(--surface); }
      .lbl { fill: var(--text); font-size: 14px; font-family: sans-serif; font-weight: bold; }
      .sm { fill: var(--text-dim); font-size: 10px; font-family: sans-serif; }
      .stroke { stroke: var(--border); stroke-width: 2; fill: none; }
      .stroke-thick { stroke: var(--border); stroke-width: 4; fill: none; }
      .accent-stroke { stroke: var(--accent); stroke-width: 2; fill: none; }
      .fill { fill: var(--border); opacity: 0.1; }
      .accent-fill { fill: var(--accent); opacity: 0.3; }
      .solid { fill: var(--accent); }
    </style>
    <rect width="400" height="300" class="bg"/>

    <!-- Benign Cyst -->
    <g transform="translate(100, 100)">
      <text x="0" y="-60" class="lbl" text-anchor="middle">Benign Cyst</text>
      <circle cx="0" cy="0" r="45" class="stroke fill"/>
      <path d="M-30,-20 Q0,-40 30,-20" class="stroke" opacity="0.5"/>
      <text x="0" y="60" class="sm" text-anchor="middle">Unilocular, thin-walled</text>
      <text x="0" y="75" class="sm" text-anchor="middle">Anechoic</text>
    </g>

    <!-- Malignant Tumor -->
    <g transform="translate(300, 100)">
      <text x="0" y="-60" class="lbl" text-anchor="middle">Malignant Tumor</text>
      <!-- Thick irregular wall -->
      <path d="M0,-50 C30,-50 50,-20 45,10 C40,40 10,55 -20,45 C-50,35 -60,0 -30,-30 C-15,-45 -10,-50 0,-50 Z" class="stroke-thick fill"/>
      <!-- Septations -->
      <path d="M-30,-30 L20,30 M-20,45 L10,-10 M45,10 L-10,10" class="stroke"/>
      <!-- Solid papillary parts -->
      <polygon points="-10,10 -5,20 5,15 10,25 0,30 -15,20" class="solid"/>
      <polygon points="20,30 30,25 35,35 25,40" class="solid"/>
      <polygon points="-30,-30 -20,-25 -15,-35" class="solid"/>
      <text x="0" y="60" class="sm" text-anchor="middle">Multilocular, thick septa</text>
      <text x="0" y="75" class="sm" text-anchor="middle">Solid areas, Excrescences</text>
    </g>

    <!-- RMI Formula Visual -->
    <g transform="translate(200, 240)">
      <text x="0" y="-20" class="lbl" text-anchor="middle">Risk of Malignancy Index (RMI)</text>
      <rect x="-140" y="-5" width="60" height="40" rx="5" class="stroke"/>
      <text x="-110" y="15" class="lbl" text-anchor="middle">U</text>
      <text x="-110" y="28" class="sm" text-anchor="middle">Ultrasound</text>
      
      <text x="-65" y="20" class="lbl" text-anchor="middle">×</text>

      <rect x="-40" y="-5" width="60" height="40" rx="5" class="stroke"/>
      <text x="-10" y="15" class="lbl" text-anchor="middle">M</text>
      <text x="-10" y="28" class="sm" text-anchor="middle">Menopausal</text>
      
      <text x="35" y="20" class="lbl" text-anchor="middle">×</text>

      <rect x="60" y="-5" width="60" height="40" rx="5" class="stroke"/>
      <text x="90" y="15" class="lbl" text-anchor="middle">CA125</text>
      <text x="90" y="28" class="sm" text-anchor="middle">Serum lvl</text>
    </g>
  </svg>`,

  'mbbs-obgyn-endometrial': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <style>
      .bg { fill: var(--surface); }
      .lbl { fill: var(--text); font-size: 14px; font-family: sans-serif; font-weight: bold; }
      .sm { fill: var(--text-dim); font-size: 10px; font-family: sans-serif; }
      .stroke { stroke: var(--border); stroke-width: 2; fill: none; }
      .accent-stroke { stroke: var(--accent); stroke-width: 2; fill: none; }
      .fill { fill: var(--border); opacity: 0.1; }
      .accent-fill { fill: var(--accent); opacity: 0.3; }
      .thick { stroke-width: 4; }
      .arrow { fill: var(--border); }
    </style>
    <rect width="400" height="300" class="bg"/>

    <!-- Endometrial Hyperplasia to Cancer -->
    <g transform="translate(100, 100)">
      <text x="0" y="-60" class="lbl" text-anchor="middle">Endometrial Cancer</text>
      <!-- Uterus -->
      <path d="M-40,-30 C-60,-10 -60,20 -30,40 C-10,55 10,55 30,40 C60,20 60,-10 40,-30 C20,-40 -20,-40 -40,-30 Z" class="stroke fill"/>
      <path d="M-10,48 L-10,70 M10,48 L10,70" class="stroke"/>
      <!-- Endometrium (Thickened & Irregular) -->
      <path d="M-20,-10 C-30,10 -20,30 0,35 C20,30 30,10 20,-10 C10,-20 -10,-20 -20,-10 Z" class="accent-stroke thick accent-fill"/>
      <path d="M-10,0 Q0,-10 10,0 T-5,15 T10,25 T-10,15 Z" class="accent-stroke fill"/>
      <text x="0" y="85" class="sm" text-anchor="middle">Thickened Endometrium</text>
      <text x="0" y="100" class="sm" text-anchor="middle">Atypical Hyperplasia -> Carcinoma</text>
    </g>

    <!-- Flowchart for PMB -->
    <g transform="translate(280, 50)">
      <text x="0" y="-20" class="lbl" text-anchor="middle">PMB Assessment</text>
      
      <!-- Box 1 -->
      <rect x="-50" y="0" width="100" height="30" rx="5" class="stroke"/>
      <text x="0" y="18" class="sm" text-anchor="middle">Postmenop. Bleeding</text>
      
      <!-- Arrow -->
      <path d="M0,30 L0,50" class="stroke"/>
      <polygon points="-4,45 4,45 0,50" class="arrow"/>

      <!-- Box 2 -->
      <rect x="-50" y="50" width="100" height="30" rx="5" class="stroke"/>
      <text x="0" y="68" class="sm" text-anchor="middle">Transvaginal US</text>

      <!-- Branches -->
      <path d="M-20,80 L-40,100" class="stroke"/>
      <path d="M20,80 L40,100" class="stroke"/>

      <!-- Box 3a -->
      <rect x="-80" y="100" width="60" height="30" rx="5" class="stroke"/>
      <text x="-50" y="118" class="sm" text-anchor="middle">&lt; 4mm</text>
      <text x="-50" y="145" class="sm" text-anchor="middle">Atrophy</text>

      <!-- Box 3b -->
      <rect x="20" y="100" width="60" height="30" rx="5" class="accent-stroke"/>
      <text x="50" y="118" class="sm" text-anchor="middle">&gt; 4mm</text>

      <!-- Arrow -->
      <path d="M50,130 L50,150" class="accent-stroke"/>

      <!-- Box 4 -->
      <rect x="20" y="150" width="60" height="30" rx="5" class="accent-stroke accent-fill"/>
      <text x="50" y="168" class="sm" text-anchor="middle">Biopsy</text>
    </g>

    <!-- Vulvar Cancer -->
    <g transform="translate(280, 240)">
      <text x="0" y="-20" class="lbl" text-anchor="middle">Vulvar Cancer</text>
      <ellipse cx="-15" cy="10" rx="10" ry="25" class="stroke fill" transform="rotate(-15 -15 10)"/>
      <ellipse cx="15" cy="10" rx="10" ry="25" class="stroke fill" transform="rotate(15 15 10)"/>
      <!-- Ulcer/Tumor -->
      <circle cx="-18" cy="5" r="6" class="accent-stroke thick accent-fill"/>
      <text x="0" y="45" class="sm" text-anchor="middle">Labia majora ulcer</text>
    </g>
  </svg>`,

  'mbbs-obgyn-contraception': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <style>
      .bg { fill: var(--surface); }
      .lbl { fill: var(--text); font-size: 14px; font-family: sans-serif; font-weight: bold; }
      .sm { fill: var(--text-dim); font-size: 10px; font-family: sans-serif; }
      .stroke { stroke: var(--border); stroke-width: 2; fill: none; }
      .accent-stroke { stroke: var(--accent); stroke-width: 2; fill: none; }
      .fill { fill: var(--border); opacity: 0.1; }
      .pill { fill: var(--accent); opacity: 0.8; }
      .placebo { fill: var(--border); opacity: 0.4; }
      .copper { stroke: #d35400; stroke-width: 3; fill: none; }
    </style>
    <rect width="400" height="300" class="bg"/>

    <!-- COCP Blister Pack -->
    <g transform="translate(80, 70)">
      <text x="0" y="-40" class="lbl" text-anchor="middle">COCP / POP</text>
      <rect x="-60" y="-25" width="120" height="70" rx="8" class="stroke fill"/>
      <!-- Row 1 (7 active) -->
      <circle cx="-45" cy="-10" r="4" class="pill"/> <circle cx="-30" cy="-10" r="4" class="pill"/> <circle cx="-15" cy="-10" r="4" class="pill"/> <circle cx="0" cy="-10" r="4" class="pill"/> <circle cx="15" cy="-10" r="4" class="pill"/> <circle cx="30" cy="-10" r="4" class="pill"/> <circle cx="45" cy="-10" r="4" class="pill"/>
      <!-- Row 2 (7 active) -->
      <circle cx="-45" cy="5" r="4" class="pill"/> <circle cx="-30" cy="5" r="4" class="pill"/> <circle cx="-15" cy="5" r="4" class="pill"/> <circle cx="0" cy="5" r="4" class="pill"/> <circle cx="15" cy="5" r="4" class="pill"/> <circle cx="30" cy="5" r="4" class="pill"/> <circle cx="45" cy="5" r="4" class="pill"/>
      <!-- Row 3 (7 active) -->
      <circle cx="-45" cy="20" r="4" class="pill"/> <circle cx="-30" cy="20" r="4" class="pill"/> <circle cx="-15" cy="20" r="4" class="pill"/> <circle cx="0" cy="20" r="4" class="pill"/> <circle cx="15" cy="20" r="4" class="pill"/> <circle cx="30" cy="20" r="4" class="pill"/> <circle cx="45" cy="20" r="4" class="pill"/>
      <!-- Row 4 (7 placebo) -->
      <circle cx="-45" cy="35" r="4" class="placebo"/> <circle cx="-30" cy="35" r="4" class="placebo"/> <circle cx="-15" cy="35" r="4" class="placebo"/> <circle cx="0" cy="35" r="4" class="placebo"/> <circle cx="15" cy="35" r="4" class="placebo"/> <circle cx="30" cy="35" r="4" class="placebo"/> <circle cx="45" cy="35" r="4" class="placebo"/>
      <text x="0" y="60" class="sm" text-anchor="middle">Inhibits ovulation</text>
    </g>

    <!-- Subdermal Implant -->
    <g transform="translate(280, 70)">
      <text x="0" y="-40" class="lbl" text-anchor="middle">Implant</text>
      <!-- Arm -->
      <path d="M-20,-20 Q10,-20 20,-10 L30,40 Q0,40 -10,30 Z" class="stroke fill"/>
      <!-- Implant -->
      <rect x="-5" y="0" width="4" height="25" rx="2" class="accent-stroke" transform="rotate(-15 -5 0)"/>
      <text x="0" y="60" class="sm" text-anchor="middle">Progestogen slowly released</text>
    </g>

    <!-- IUCD -->
    <g transform="translate(100, 220)">
      <text x="0" y="-40" class="lbl" text-anchor="middle">IUCD (Copper)</text>
      <!-- Uterus -->
      <path d="M-20,-10 C-30,-30 30,-30 20,-10 C25,0 15,10 10,20 L-10,20 C-15,10 -25,0 -20,-10 Z" class="stroke fill"/>
      <!-- T-shaped IUD -->
      <path d="M-10,-5 L10,-5 M0,-5 L0,15" class="copper"/>
      <!-- Strings -->
      <path d="M0,15 Q5,25 0,35 Q-5,45 0,50" class="accent-stroke" stroke-width="1"/>
      <text x="0" y="60" class="sm" text-anchor="middle">Spermicidal / Inflammatory</text>
    </g>

    <!-- Tubal Ligation -->
    <g transform="translate(280, 220)">
      <text x="0" y="-40" class="lbl" text-anchor="middle">Tubal Ligation</text>
      <!-- Uterus half & Tube -->
      <path d="M-40,10 C-30,0 -20,-10 -20,-20 C0,-30 20,-20 30,-20" class="stroke"/>
      <path d="M35,-20 C45,-20 50,-10 40,0" class="stroke"/> <!-- Fimbriae end disconnected -->
      
      <!-- Clip -->
      <rect x="25" y="-28" width="10" height="16" class="accent-stroke accent-fill" transform="rotate(30 30 -20)"/>
      <path d="M22,-35 L28,-25 M32,-15 L38,-5" class="stroke" stroke-width="1"/> <!-- Scissor/Tie marks -->

      <text x="0" y="60" class="sm" text-anchor="middle">Permanent Sterilization</text>
    </g>
  </svg>`
};

export default SVG_BATCH3;
