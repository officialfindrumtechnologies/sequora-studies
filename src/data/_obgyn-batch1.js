const SVG_BATCH1 = {
  'mbbs-obgyn-antenatal': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <style>
      .lbl { font-family: sans-serif; font-size: 10px; fill: var(--text); }
      .sm { font-size: 8px; fill: var(--text-dim); }
      .title { font-size: 12px; font-weight: bold; fill: var(--accent); }
      @keyframes swell { 0% { opacity: 0.5; } 50% { opacity: 0.8; } 100% { opacity: 0.5; } }
      .anim-swell { animation: swell 4s infinite; }
    </style>
    
    <!-- Torso Anatomy & Fundal Heights -->
    <text x="20" y="20" class="title">Anatomical Changes</text>
    <path d="M40 250 C40 120 70 50 100 40 C130 50 160 120 160 250" fill="none" stroke="var(--text)" stroke-width="2"/>
    
    <!-- Fundal heights -->
    <path class="anim-swell" d="M60 220 C60 120 140 120 140 220" fill="var(--accent)" opacity="0.3"/> <!-- 36w -->
    <path d="M70 220 C70 150 130 150 130 220" fill="var(--accent)" opacity="0.5"/> <!-- 24w -->
    <path d="M85 220 C85 190 115 190 115 220" fill="var(--accent)" opacity="0.7"/> <!-- 12w -->
    
    <!-- Landmarks -->
    <circle cx="100" cy="165" r="3" fill="var(--text-dim)"/>
    <path d="M90 220 L110 220" stroke="var(--text)" stroke-width="2"/>
    <path d="M95 100 L105 100" stroke="var(--text)" stroke-width="2"/>
    
    <text x="170" y="110" class="lbl">36w (Xiphisternum)</text>
    <text x="170" y="170" class="lbl">24w (Umbilicus)</text>
    <text x="170" y="210" class="lbl">12w (Symphysis Pubis)</text>

    <!-- Paths linking labels to anatomy -->
    <path d="M105 100 L165 105" stroke="var(--border)" stroke-width="1" stroke-dasharray="2,2"/>
    <path d="M103 165 L165 165" stroke="var(--border)" stroke-width="1" stroke-dasharray="2,2"/>
    <path d="M110 220 L165 210" stroke="var(--border)" stroke-width="1" stroke-dasharray="2,2"/>

    <!-- Physiological Changes (Blood Vol) -->
    <text x="250" y="20" class="title">Mother\'s Blood Vol</text>
    <rect x="250" y="30" width="130" height="90" fill="var(--surface)" stroke="var(--border)"/>
    <path d="M250 120 L380 120 M250 30 L250 120" stroke="var(--text)" stroke-width="1"/>
    
    <path d="M250 120 Q300 40 380 35" fill="none" stroke="var(--accent)" stroke-width="2"/> <!-- Plasma -->
    <path d="M250 120 Q300 80 380 75" fill="none" stroke="#e74c3c" stroke-width="2"/> <!-- RBC -->
    
    <text x="340" y="55" class="sm" fill="var(--accent)">Plasma (+50%)</text>
    <text x="340" y="90" class="sm" fill="#e74c3c">RBC (+20-30%)</text>
    <text x="280" y="105" class="sm">Physiological Anemia</text>

    <!-- Booking Visit Screening Timeline -->
    <text x="20" y="270" class="title">Booking Visit Timeline</text>
    <rect x="150" y="260" width="70" height="20" rx="3" fill="var(--surface)" stroke="var(--accent)"/>
    <rect x="240" y="260" width="70" height="20" rx="3" fill="var(--surface)" stroke="var(--accent)"/>
    <rect x="330" y="260" width="60" height="20" rx="3" fill="var(--surface)" stroke="var(--accent)"/>
    
    <path d="M220 270 L240 270" stroke="var(--text)" marker-end="url(#arrow)"/>
    <path d="M310 270 L330 270" stroke="var(--text)" marker-end="url(#arrow)"/>
    
    <text x="155" y="274" class="lbl">10-12w: Dating</text>
    <text x="245" y="274" class="lbl">11-14w: Trisomy</text>
    <text x="335" y="274" class="lbl">18-20w: Anomaly</text>
  </svg>`,

  'mbbs-obgyn-labor': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <style>
      .lbl { font-family: sans-serif; font-size: 10px; fill: var(--text); }
      .sm { font-size: 8px; fill: var(--text-dim); }
      .title { font-size: 12px; font-weight: bold; fill: var(--accent); }
      @keyframes dash { to { stroke-dashoffset: -20; } }
      .anim-dash { stroke-dasharray: 4,4; animation: dash 2s linear infinite; }
    </style>

    <!-- WHO\'s Partogram -->
    <text x="20" y="20" class="title">WHO\'s Partogram</text>
    <rect x="20" y="30" width="160" height="120" fill="var(--surface)" stroke="var(--border)"/>
    
    <!-- Grid -->
    <path d="M60 30 L60 150 M100 30 L100 150 M140 30 L140 150 M20 70 L180 70 M20 110 L180 110" stroke="var(--border)" stroke-width="0.5"/>
    
    <!-- Alert & Action Lines -->
    <path d="M100 150 L180 30" stroke="var(--text)" stroke-width="2" class="anim-dash"/> <!-- Alert -->
    <path d="M140 150 L220 30" stroke="#e74c3c" stroke-width="2" class="anim-dash"/> <!-- Action -->
    
    <!-- Dilation Curve -->
    <path d="M20 150 Q70 140 100 100 Q130 50 150 30" fill="none" stroke="var(--accent)" stroke-width="2"/>
    
    <text x="110" y="145" class="sm">Alert</text>
    <text x="150" y="145" class="sm">Action</text>
    
    <!-- Stages of Labor (Latent vs Active Cervical Dilation) -->
    <text x="220" y="20" class="title">Cervical Dilation</text>
    
    <circle cx="250" cy="80" r="15" fill="none" stroke="var(--border)" stroke-width="2"/>
    <circle cx="250" cy="80" r="3" fill="var(--accent)"/>
    <text x="235" y="115" class="lbl">Latent (<4cm)</text>
    
    <circle cx="330" cy="80" r="30" fill="none" stroke="var(--border)" stroke-width="2"/>
    <circle cx="330" cy="80" r="25" fill="var(--accent)" opacity="0.3"/>
    <text x="315" y="130" class="lbl">Active (>4cm)</text>

    <!-- Fetal Skull Mechanism -->
    <text x="20" y="190" class="title">Fetal Skull Mechanism</text>
    
    <!-- 1. Engagement (Horizontal) -->
    <ellipse cx="60" cy="240" rx="25" ry="18" fill="var(--surface)" stroke="var(--text)" stroke-width="1.5"/>
    <path d="M35 240 L85 240 M60 222 L60 258" stroke="var(--accent)" stroke-width="1"/>
    <polygon points="58,238 62,238 62,242 58,242" fill="var(--accent)"/> <!-- Fontanelle -->
    <text x="35" y="280" class="sm">1. Engagement</text>

    <!-- 2. Descent (Lower) -->
    <ellipse cx="140" cy="250" rx="25" ry="18" fill="var(--surface)" stroke="var(--text)" stroke-width="1.5"/>
    <path d="M115 250 L165 250 M140 232 L140 268" stroke="var(--accent)" stroke-width="1"/>
    <text x="120" y="280" class="sm">2. Descent</text>

    <!-- 3. Flexion (Angled) -->
    <g transform="translate(220, 245) rotate(30)">
      <ellipse cx="0" cy="0" rx="25" ry="18" fill="var(--surface)" stroke="var(--text)" stroke-width="1.5"/>
      <path d="M-25 0 L25 0 M0 -18 L0 18" stroke="var(--accent)" stroke-width="1"/>
    </g>
    <text x="200" y="280" class="sm">3. Flexion</text>

    <!-- 4. Internal Rotation (Vertical) -->
    <ellipse cx="300" cy="240" rx="18" ry="25" fill="var(--surface)" stroke="var(--text)" stroke-width="1.5"/>
    <path d="M282 240 L318 240 M300 215 L300 265" stroke="var(--accent)" stroke-width="1"/>
    <polygon points="298,225 302,225 302,229 298,229" fill="var(--accent)"/> <!-- Fontanelle rotated -->
    <text x="270" y="280" class="sm">4. Internal Rotation</text>

    <path d="M90 240 L110 245" stroke="var(--border)" marker-end="url(#arrow)"/>
    <path d="M170 245 L190 245" stroke="var(--border)" marker-end="url(#arrow)"/>
    <path d="M250 245 L275 240" stroke="var(--border)" marker-end="url(#arrow)"/>
  </svg>`,

  'mbbs-obgyn-hypertension': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <style>
      .lbl { font-family: sans-serif; font-size: 10px; fill: var(--text); }
      .sm { font-size: 8px; fill: var(--text-dim); }
      .title { font-size: 12px; font-weight: bold; fill: var(--accent); }
      @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
      .anim-pulse { transform-origin: center; animation: pulse 2s infinite; }
    </style>

    <!-- Pathophysiology: Spiral Artery Remodeling -->
    <text x="20" y="20" class="title">Pathophysiology: Remodeling Failure</text>
    
    <!-- Normal -->
    <text x="20" y="40" class="lbl">Normal (Wide Lumen)</text>
    <rect x="20" y="50" width="120" height="40" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
    <rect x="20" y="55" width="120" height="30" fill="var(--accent)" opacity="0.2"/>
    <path d="M25 70 L130 70" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="2,2"/>
    <circle cx="50" cy="70" r="5" fill="#e74c3c"/>
    <circle cx="80" cy="70" r="5" fill="#e74c3c"/>
    <circle cx="110" cy="70" r="5" fill="#e74c3c"/>
    
    <!-- Preeclampsia -->
    <text x="20" y="110" class="lbl">Preeclampsia (Narrow/Spasm)</text>
    <rect x="20" y="120" width="120" height="40" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
    <rect x="20" y="132" width="120" height="16" fill="var(--accent)" opacity="0.6"/>
    <path d="M25 140 L130 140" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="2,2"/>
    <circle cx="50" cy="140" r="3" fill="#e74c3c"/>
    <circle cx="80" cy="140" r="3" fill="#e74c3c"/>
    <circle cx="110" cy="140" r="3" fill="#e74c3c"/>
    
    <text x="150" y="135" class="sm" fill="#e74c3c">High Resistance &amp; Ischemia</text>
    
    <!-- HELLP Syndrome Flowchart -->
    <text x="220" y="20" class="title">HELLP Syndrome</text>
    
    <rect x="220" y="40" width="160" height="30" rx="4" fill="var(--surface)" stroke="var(--border)"/>
    <text x="280" y="58" class="lbl" font-weight="bold">HELLP</text>
    
    <path d="M300 70 L300 90" stroke="var(--text)" stroke-width="1.5" marker-end="url(#arrow)"/>
    
    <rect x="220" y="90" width="160" height="25" rx="4" fill="var(--surface)" stroke="var(--border)"/>
    <text x="230" y="106" class="lbl"><tspan fill="#e74c3c" font-weight="bold">H</tspan>emolysis (Microangiopathic)</text>

    <rect x="220" y="125" width="160" height="25" rx="4" fill="var(--surface)" stroke="var(--border)"/>
    <text x="230" y="141" class="lbl"><tspan fill="#e74c3c" font-weight="bold">EL</tspan>evated Liver Enzymes</text>

    <rect x="220" y="160" width="160" height="25" rx="4" fill="var(--surface)" stroke="var(--border)"/>
    <text x="230" y="176" class="lbl"><tspan fill="#e74c3c" font-weight="bold">L</tspan>ow <tspan fill="#e74c3c" font-weight="bold">P</tspan>latelets (&lt;100k)</text>

    <!-- MgSO4 Protocol -->
    <text x="20" y="210" class="title">MgSO4 Seizure Prophylaxis Protocol</text>
    
    <rect x="20" y="230" width="130" height="40" rx="5" fill="var(--surface)" stroke="var(--accent)"/>
    <text x="30" y="248" class="lbl" font-weight="bold">Loading Dose</text>
    <text x="30" y="260" class="sm">4g IV over 15-20 mins</text>
    
    <path d="M150 250 L190 250" stroke="var(--accent)" stroke-width="2" marker-end="url(#arrow)"/>
    
    <rect x="190" y="230" width="130" height="40" rx="5" fill="var(--surface)" stroke="var(--accent)"/>
    <text x="200" y="248" class="lbl" font-weight="bold">Maintenance Dose</text>
    <text x="200" y="260" class="sm">1g/hr IV infusion</text>

    <!-- Warning sign -->
    <circle cx="350" cy="250" r="15" fill="#e74c3c" class="anim-pulse"/>
    <text x="348" y="253" class="lbl" fill="#fff" font-weight="bold">!</text>
    <text x="330" y="275" class="sm" fill="#e74c3c">Check Reflexes</text>

  </svg>`,

  'mbbs-obgyn-aph': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <style>
      .lbl { font-family: sans-serif; font-size: 10px; fill: var(--text); }
      .sm { font-size: 8px; fill: var(--text-dim); }
      .title { font-size: 12px; font-weight: bold; fill: var(--accent); }
    </style>

    <text x="20" y="20" class="title">Placenta Previa (4 Grades)</text>
    
    <!-- Function to draw uterus: M 20,20 C 60,-10 80,40 50,70 C 40,80 30,70 30,60 Z -->
    <!-- Type I: Low Lying -->
    <g transform="translate(20, 40)">
      <path d="M20 60 C10 10 70 10 60 60 C60 90 45 100 40 100 C35 100 20 90 20 60 Z" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
      <path d="M60 50 C55 60 45 70 45 80 L60 80 Z" fill="#e74c3c"/>
      <text x="15" y="115" class="lbl">Type I (Low)</text>
    </g>
    
    <!-- Type II: Marginal -->
    <g transform="translate(110, 40)">
      <path d="M20 60 C10 10 70 10 60 60 C60 90 45 100 40 100 C35 100 20 90 20 60 Z" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
      <path d="M60 60 C55 70 45 85 40 95 L60 95 Z" fill="#e74c3c"/>
      <text x="10" y="115" class="lbl">Type II (Marginal)</text>
    </g>

    <!-- Type III: Partial -->
    <g transform="translate(200, 40)">
      <path d="M20 60 C10 10 70 10 60 60 C60 90 45 100 40 100 C35 100 20 90 20 60 Z" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
      <path d="M60 70 C45 80 40 95 30 90 L60 100 Z" fill="#e74c3c"/>
      <text x="10" y="115" class="lbl">Type III (Partial)</text>
    </g>

    <!-- Type IV: Complete -->
    <g transform="translate(290, 40)">
      <path d="M20 60 C10 10 70 10 60 60 C60 90 45 100 40 100 C35 100 20 90 20 60 Z" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
      <path d="M25 80 C40 70 40 100 60 80 L55 100 L25 100 Z" fill="#e74c3c"/>
      <text x="5" y="115" class="lbl">Type IV (Complete)</text>
    </g>

    <path d="M20 170 L380 170" stroke="var(--border)" stroke-width="1" stroke-dasharray="4,4"/>

    <!-- Placental Abruption -->
    <text x="20" y="190" class="title">Placental Abruption</text>

    <!-- Revealed -->
    <g transform="translate(20, 190)">
      <path d="M20 60 C10 10 70 10 60 60 C60 90 45 100 40 100 C35 100 20 90 20 60 Z" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
      <path d="M25 20 C40 15 50 25 50 40 L25 40 Z" fill="#e74c3c"/> <!-- Placenta at fundus -->
      <path d="M25 40 Q30 70 40 100" fill="none" stroke="#c0392b" stroke-width="3" stroke-dasharray="2,2"/> <!-- Bleeding out -->
      <text x="15" y="115" class="lbl">Revealed</text>
    </g>

    <!-- Concealed -->
    <g transform="translate(130, 190)">
      <path d="M20 60 C10 10 70 10 60 60 C60 90 45 100 40 100 C35 100 20 90 20 60 Z" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
      <path d="M30 20 C45 15 50 25 50 40 L30 40 Z" fill="#e74c3c"/>
      <path d="M20 25 Q30 35 30 50 Q20 40 20 25 Z" fill="#8e44ad"/> <!-- Dark concealed blood -->
      <text x="15" y="115" class="lbl">Concealed</text>
    </g>

    <!-- Differentiation Box -->
    <rect x="230" y="200" width="150" height="80" rx="5" fill="var(--surface)" stroke="var(--accent)"/>
    <text x="240" y="215" class="lbl" font-weight="bold">Differentiation</text>
    <text x="240" y="235" class="sm">Previa: Painless, Bright Red</text>
    <text x="240" y="250" class="sm">Abruption: Painful, Dark Red</text>
    <text x="240" y="265" class="sm">Previa: Soft, non-tender uterus</text>
    <text x="240" y="280" class="sm" fill="#e74c3c">NEVER do vaginal exam in Previa!</text>

  </svg>`,

  'mbbs-obgyn-pph': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <style>
      .lbl { font-family: sans-serif; font-size: 10px; fill: var(--text); }
      .sm { font-size: 8px; fill: var(--text-dim); }
      .title { font-size: 12px; font-weight: bold; fill: var(--accent); }
    </style>

    <text x="20" y="20" class="title">Primary PPH: The 4 Ts</text>

    <!-- Tone (70%) -->
    <rect x="20" y="30" width="80" height="90" rx="4" fill="var(--surface)" stroke="var(--border)"/>
    <text x="25" y="45" class="lbl" font-weight="bold">Tone (70%)</text>
    <path d="M40 70 C30 50 70 50 60 70 C60 90 55 100 50 100 C45 100 40 90 40 70 Z" fill="none" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="3,3"/>
    <path d="M45 80 Q50 110 50 110" fill="none" stroke="#e74c3c" stroke-width="2"/>
    <text x="25" y="115" class="sm">Atonic Uterus</text>

    <!-- Tissue (20%) -->
    <rect x="110" y="30" width="80" height="90" rx="4" fill="var(--surface)" stroke="var(--border)"/>
    <text x="115" y="45" class="lbl" font-weight="bold">Tissue (20%)</text>
    <path d="M130 70 C120 50 160 50 150 70 C150 90 145 100 140 100 C135 100 130 90 130 70 Z" fill="none" stroke="var(--text)" stroke-width="1.5"/>
    <polygon points="135,60 145,60 140,70" fill="#e74c3c"/> <!-- Retained placenta -->
    <text x="115" y="115" class="sm">Retained Placenta</text>

    <!-- Trauma (9%) -->
    <rect x="200" y="30" width="80" height="90" rx="4" fill="var(--surface)" stroke="var(--border)"/>
    <text x="205" y="45" class="lbl" font-weight="bold">Trauma (9%)</text>
    <path d="M230 70 C220 50 260 50 250 70 C250 80 245 90 240 90" fill="none" stroke="var(--text)" stroke-width="1.5"/>
    <path d="M235 90 L240 105 M245 90 L240 105" fill="none" stroke="var(--text)" stroke-width="1.5"/> <!-- Cervix -->
    <path d="M242 95 L248 100 L245 105 L250 110" fill="none" stroke="#e74c3c" stroke-width="2"/> <!-- Tear -->
    <text x="205" y="115" class="sm">Lacerations/Tears</text>

    <!-- Thrombin (1%) -->
    <rect x="290" y="30" width="80" height="90" rx="4" fill="var(--surface)" stroke="var(--border)"/>
    <text x="295" y="45" class="lbl" font-weight="bold">Thrombin (1%)</text>
    <path d="M310 80 Q330 60 350 80 Q360 100 330 100 Q300 100 310 80 Z" fill="none" stroke="var(--border)" stroke-width="1.5"/>
    <circle cx="320" cy="85" r="3" fill="#e74c3c"/>
    <circle cx="330" cy="75" r="3" fill="#e74c3c"/>
    <circle cx="340" cy="90" r="3" fill="#e74c3c"/>
    <text x="295" y="115" class="sm">Coagulopathy</text>

    <!-- Active Management Flowchart -->
    <text x="20" y="160" class="title">Active Management of 3rd Stage</text>

    <rect x="20" y="180" width="100" height="40" rx="5" fill="var(--surface)" stroke="var(--accent)"/>
    <text x="30" y="198" class="lbl">1. Uterotonic</text>
    <text x="30" y="210" class="sm">IM Oxytocin (10 IU)</text>

    <path d="M120 200 L140 200" stroke="var(--text)" stroke-width="1.5" marker-end="url(#arrow)"/>

    <rect x="140" y="180" width="100" height="40" rx="5" fill="var(--surface)" stroke="var(--accent)"/>
    <text x="150" y="198" class="lbl">2. CCT</text>
    <text x="150" y="210" class="sm">Controlled Cord Traction</text>

    <path d="M240 200 L260 200" stroke="var(--text)" stroke-width="1.5" marker-end="url(#arrow)"/>

    <rect x="260" y="180" width="100" height="40" rx="5" fill="var(--surface)" stroke="var(--accent)"/>
    <text x="270" y="198" class="lbl">3. Massage</text>
    <text x="270" y="210" class="sm">Uterine Massage</text>
    
    <rect x="80" y="240" width="240" height="40" rx="5" fill="var(--surface)" stroke="#e74c3c" stroke-width="2"/>
    <text x="120" y="258" class="lbl" fill="#e74c3c" font-weight="bold">If PPH occurs: Call for help, Resuscitate (ABC)</text>
    <text x="120" y="270" class="lbl" fill="#e74c3c">Empty Bladder, Bimanual Compression</text>
  </svg>`,

  'mbbs-obgyn-ectopic': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <style>
      .lbl { font-family: sans-serif; font-size: 10px; fill: var(--text); }
      .sm { font-size: 8px; fill: var(--text-dim); }
      .title { font-size: 12px; font-weight: bold; fill: var(--accent); }
      @keyframes throb { 0% { r: 4; fill: #e74c3c; } 50% { r: 6; fill: #c0392b; } 100% { r: 4; fill: #e74c3c; } }
      .anim-throb { animation: throb 1.5s infinite; }
    </style>

    <text x="20" y="20" class="title">Ectopic Pregnancy Sites</text>
    
    <!-- Tubal Anatomy -->
    <!-- Uterus -->
    <path d="M170 120 C170 70 230 70 230 120 C230 160 210 180 200 180 C190 180 170 160 170 120 Z" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
    <!-- Left Tube -->
    <path d="M170 85 Q110 70 80 110" fill="none" stroke="var(--border)" stroke-width="4"/>
    <!-- Right Tube -->
    <path d="M230 85 Q290 70 320 110" fill="none" stroke="var(--border)" stroke-width="4"/>
    
    <!-- Ovaries -->
    <ellipse cx="100" cy="120" rx="10" ry="15" fill="var(--surface)" stroke="var(--border)"/>
    <ellipse cx="300" cy="120" rx="10" ry="15" fill="var(--surface)" stroke="var(--border)"/>

    <!-- Sites -->
    <!-- Ampulla (~70%) -->
    <circle cx="100" cy="85" r="5" class="anim-throb"/>
    <text x="80" y="65" class="lbl">Ampulla (70%)</text>
    
    <!-- Isthmus (~12%) -->
    <circle cx="260" cy="80" r="5" class="anim-throb"/>
    <text x="245" y="65" class="lbl">Isthmus (12%)</text>
    
    <!-- Interstitial/Cornual (~2%) -->
    <circle cx="170" cy="85" r="5" class="anim-throb"/>
    <text x="135" y="75" class="lbl">Interstitial (2%)</text>

    <!-- Ruptured vs Unruptured Tree -->
    <text x="20" y="190" class="title">Management Decision Tree</text>
    
    <rect x="150" y="200" width="100" height="25" rx="4" fill="var(--surface)" stroke="var(--accent)"/>
    <text x="160" y="216" class="lbl" font-weight="bold">Ectopic Confirmed</text>
    
    <path d="M200 225 L120 250" stroke="var(--text)" stroke-width="1.5"/>
    <path d="M200 225 L280 250" stroke="var(--text)" stroke-width="1.5"/>
    
    <rect x="60" y="250" width="120" height="40" rx="4" fill="var(--surface)" stroke="var(--border)"/>
    <text x="70" y="265" class="lbl">Stable, Unruptured</text>
    <text x="70" y="280" class="sm" fill="var(--accent)">Medical: Methotrexate</text>

    <rect x="220" y="250" width="120" height="40" rx="4" fill="var(--surface)" stroke="#e74c3c" stroke-width="2"/>
    <!-- Rupture icon -->
    <polygon points="225,255 230,260 235,250 240,260 245,255" fill="#e74c3c"/>
    <path d="M235 265 Q240 280 230 285" fill="none" stroke="#e74c3c" stroke-width="2"/>
    <text x="250" y="265" class="lbl">Unstable / Ruptured</text>
    <text x="250" y="280" class="sm" fill="#e74c3c">Surgery (Salpingectomy)</text>

  </svg>`
};

export default SVG_BATCH1;
