// Muscle reference data — Phase 1: Upper Limb (Shoulder, Arm, Forearm).
// Q&A are original practice questions, not claimed to be real past papers —
// swap in actual archived prof questions once sourced from a real paper.
//
// INTERACTIVE 3D: driven live via the Sketchfab Viewer API against the model
// "Muscular and Skeletal System" by ufulio, whose muscles are SEPARATE named
// meshes (verified by dumping its scene graph). Clicking a muscle isolates it
// on the skeleton in real 3D. The model is embeddable (Sketchfab-sanctioned
// embed, like a video embed) — attribution to ufulio + Sketchfab is shown, and
// the whole 3D block degrades gracefully to the 2D diagrams if it fails to load.
//
// The `mesh3d` field says how each muscle resolves in that model:
//   { kind:'muscle', match:'Deltoideus' } → isolate exactly this muscle
//   { kind:'group',  match:'Flexor_Muscle', label:'…' } → isolate the whole
//        compartment (the model names these generically, so we're honest that
//        it's the group, not the single muscle)
//   absent → no 3D for this one; its accurate 2D plate is the visual instead
//        (coracobrachialis, brachialis, anconeus, supinator aren't in the model)

export const MUSCLE_REGIONS = ['All', 'Shoulder', 'Arm', 'Forearm — Flexors', 'Forearm — Extensors', 'Gluteal', 'Thigh — Anterior', 'Thigh — Medial', 'Thigh — Posterior', 'Leg — Anterior', 'Leg — Lateral', 'Leg — Posterior', 'Back — Superficial', 'Back — Deep', 'Thorax — Pectoral', 'Thorax — Wall', 'Abdomen — Anterolateral', 'Abdomen — Posterior'];

// Interactive, per-mesh-separated model (ufulio) used for isolation.
export const MUSCLE_MODEL_ID = 'a15b72e769934d6fb1ebb258b9306df4';
export const MUSCLE_MODEL_CREDIT = { author: 'ufulio', url: 'https://sketchfab.com/3d-models/muscular-and-skeletal-system-anatomy-a15b72e769934d6fb1ebb258b9306df4' };

// id → how it maps into the 3D model's mesh names.
const MESH_3D = {
  deltoid:              { kind: 'muscle', match: 'Deltoideus' },
  supraspinatus:        { kind: 'muscle', match: 'Supraspinatus' },
  infraspinatus:        { kind: 'muscle', match: 'Infraspinatus' },
  teres_minor:          { kind: 'muscle', match: 'Teres_Minor' },
  teres_major:          { kind: 'muscle', match: 'Teres_Major' },
  subscapularis:        { kind: 'muscle', match: 'Subscapularis' },
  biceps_brachii:       { kind: 'muscle', match: 'Biceps_Muscle' },
  triceps_brachii:      { kind: 'muscle', match: 'ricep' }, // matches Tricep_Muscle + misspelled Tricep_Mucsle
  brachioradialis:      { kind: 'muscle', match: 'Brachioradialis' },
  pronator_teres:       { kind: 'muscle', match: 'Pronator_Teres' },
  pronator_quadratus:   { kind: 'muscle', match: 'Pronator_Quadratus' },
  // Forearm flexors — model names these generically → isolate the compartment.
  flexor_carpi_radialis:          { kind: 'group', match: 'Flexor_Muscle',  label: 'forearm flexor compartment' },
  palmaris_longus:                { kind: 'group', match: 'Flexor_Muscle',  label: 'forearm flexor compartment' },
  flexor_carpi_ulnaris:           { kind: 'group', match: 'Flexor_Muscle',  label: 'forearm flexor compartment' },
  flexor_digitorum_superficialis: { kind: 'group', match: 'Flexor_Muscle',  label: 'forearm flexor compartment' },
  flexor_digitorum_profundus:     { kind: 'group', match: 'Flexor_Muscle',  label: 'forearm flexor compartment' },
  flexor_pollicis_longus:         { kind: 'group', match: 'Flexor_Muscle',  label: 'forearm flexor compartment' },
  // Forearm extensors — likewise generic → isolate the compartment.
  extensor_carpi_radialis_longus: { kind: 'group', match: 'Extensor_Muscle', label: 'forearm extensor compartment' },
  extensor_carpi_radialis_brevis: { kind: 'group', match: 'Extensor_Muscle', label: 'forearm extensor compartment' },
  extensor_digitorum:             { kind: 'group', match: 'Extensor_Muscle', label: 'forearm extensor compartment' },
  extensor_digiti_minimi:         { kind: 'group', match: 'Extensor_Muscle', label: 'forearm extensor compartment' },
  extensor_carpi_ulnaris:         { kind: 'group', match: 'Extensor_Muscle', label: 'forearm extensor compartment' },
  abductor_pollicis_longus:       { kind: 'group', match: 'Extensor_Muscle', label: 'forearm extensor compartment' },
  extensor_pollicis_brevis:       { kind: 'group', match: 'Extensor_Muscle', label: 'forearm extensor compartment' },
  extensor_pollicis_longus:       { kind: 'group', match: 'Extensor_Muscle', label: 'forearm extensor compartment' },
  extensor_indicis:               { kind: 'group', match: 'Extensor_Muscle', label: 'forearm extensor compartment' },
  // coracobrachialis, brachialis, anconeus, supinator: not in the model → 2D only.
};

export const MUSCLES = [
  // ==================== SHOULDER ====================
  {
    id: 'deltoid',
    name: 'Deltoid',
    region: 'Shoulder',
    description: 'Thick triangular muscle capping the shoulder, made of three functionally distinct parts (clavicular, acromial, spinal) that can act together or independently.',
    origin: 'Clavicular head: lateral 1/3 of clavicle. Acromial head: acromion. Spinal head: spine of scapula.',
    insertion: 'Deltoid tuberosity of the humerus',
    action: 'Middle fibres: abduction of the arm (15°–90°). Anterior fibres: flexion + medial rotation. Posterior fibres: extension + lateral rotation.',
    nerve: 'Axillary nerve (C5, C6)',
    artery: 'Posterior circumflex humeral artery',
    clinicalCorrelation: 'Axillary nerve runs through the quadrangular space with the posterior circumflex humeral artery — vulnerable in surgical neck of humerus fractures and anterior shoulder dislocation. Injury causes deltoid wasting, weak abduction, and sensory loss over the "regimental badge" area (lower lateral shoulder).',
    questions: [
      { q: 'Why does a surgical neck of humerus fracture risk axillary nerve injury, and what does that injury look like clinically?', a: 'The axillary nerve wraps directly around the surgical neck of the humerus as it exits the quadrangular space. A fracture here can stretch or lacerate it, causing: weak/absent shoulder abduction (deltoid paralysis), deltoid wasting over time, and a patch of sensory loss over the lower lateral shoulder ("regimental badge" area).' },
      { q: 'Which movements does each part of the deltoid produce, and why does that matter clinically?', a: 'Anterior fibres flex + medially rotate; middle fibres abduct (15–90°); posterior fibres extend + laterally rotate. Because the parts act somewhat independently, a partial axillary nerve lesion or selective deltoid weakness can present as a deficit in one movement (e.g. weak abduction) while others are relatively preserved.' }
    ]
  },
  {
    id: 'supraspinatus',
    name: 'Supraspinatus',
    region: 'Shoulder',
    description: 'One of the four rotator cuff muscles ("SITS"), sitting in the supraspinous fossa above the scapular spine. Initiates abduction before deltoid takes over.',
    origin: 'Supraspinous fossa of the scapula',
    insertion: 'Superior facet of the greater tubercle of the humerus',
    action: 'Initiates the first 15° of arm abduction; stabilises the humeral head in the glenoid fossa (rotator cuff function)',
    nerve: 'Suprascapular nerve (C5, C6)',
    artery: 'Suprascapular artery',
    clinicalCorrelation: 'Most commonly torn/impinged rotator cuff muscle — its tendon passes under the coraco-acromial arch, a tight space prone to subacromial impingement. Produces a painful arc of abduction (60°–120°) and a positive "empty can" (Jobe) test.',
    questions: [
      { q: 'Why is supraspinatus the rotator cuff muscle most often injured, and what test detects this?', a: 'Its tendon passes through the narrow subacromial space beneath the coraco-acromial arch, making it prone to compression/impingement, degeneration, and tearing — especially with repetitive overhead activity or age-related wear. The empty can (Jobe) test — resisted abduction with the arm at 90°, thumb pointing down — reproduces pain/weakness when supraspinatus is torn or impinged.' },
      { q: 'What is the "painful arc" and why does it occur specifically between 60° and 120° of abduction?', a: 'The painful arc is pain during a specific range of active shoulder abduction. Between roughly 60°–120°, the supraspinatus tendon and subacromial bursa are compressed against the acromion and coraco-acromial ligament — below or above this arc there is more clearance, so pain is present only in that middle range.' }
    ]
  },
  {
    id: 'infraspinatus',
    name: 'Infraspinatus',
    region: 'Shoulder',
    description: 'Rotator cuff muscle filling the infraspinous fossa below the scapular spine — the main lateral (external) rotator of the shoulder.',
    origin: 'Infraspinous fossa of the scapula',
    insertion: 'Middle facet of the greater tubercle of the humerus',
    action: 'Lateral (external) rotation of the arm; stabilises the glenohumeral joint',
    nerve: 'Suprascapular nerve (C5, C6)',
    artery: 'Suprascapular artery, circumflex scapular artery',
    clinicalCorrelation: 'Tested with the arms held at the sides, elbows flexed to 90°, resisting external rotation. Weakness here (with an intact deltoid) points to a rotator cuff tear or suprascapular nerve lesion rather than an axillary nerve problem.',
    questions: [
      { q: 'How do you clinically isolate infraspinatus weakness from deltoid weakness?', a: 'Keep the arms adducted at the sides with elbows flexed to 90°, then ask the patient to externally rotate against resistance. This isolates infraspinatus (and teres minor) without deltoid contributing much, since deltoid mainly abducts/flexes rather than externally rotates from this position.' },
      { q: 'Both infraspinatus and supraspinatus are supplied by the suprascapular nerve — what does that mean for a suprascapular nerve lesion?', a: 'A suprascapular nerve lesion (e.g. at the suprascapular notch) can weaken both muscles together: weak initiation of abduction (supraspinatus) plus weak external rotation (infraspinatus), without affecting deltoid-driven abduction past the first 15° or teres minor (axillary nerve).' }
    ]
  },
  {
    id: 'teres_minor',
    name: 'Teres Minor',
    region: 'Shoulder',
    description: 'Small rotator cuff muscle along the upper 2/3 of the lateral scapular border, forming part of the boundary of the quadrangular space.',
    origin: 'Upper two-thirds of the lateral border of the scapula',
    insertion: 'Inferior facet of the greater tubercle of the humerus',
    action: 'Lateral rotation of the arm; weak adduction',
    nerve: 'Axillary nerve (C5, C6)',
    artery: 'Circumflex scapular artery',
    clinicalCorrelation: 'Forms the superior border of the quadrangular space (with teres major inferiorly, long head of triceps medially, humeral shaft laterally) — the axillary nerve and posterior circumflex humeral vessels pass through this space and can be compressed (quadrangular space syndrome).',
    questions: [
      { q: 'Name the four borders of the quadrangular space and what passes through it.', a: 'Superior: teres minor. Inferior: teres major. Medial: long head of triceps brachii. Lateral: surgical neck of the humerus. The axillary nerve and posterior circumflex humeral artery pass through it — compression here (quadrangular space syndrome) causes shoulder pain and deltoid/teres minor weakness.' },
      { q: 'Why do teres minor and deltoid weaken together in some axillary nerve lesions, despite deltoid being much larger?', a: 'Both are supplied by the axillary nerve (C5, C6). A lesion proximal to where the nerve branches to both muscles (e.g. in the quadrangular space) affects both together — weak abduction (deltoid) plus weak external rotation (teres minor) — pointing to an axillary nerve problem rather than an isolated rotator cuff tear.' }
    ]
  },
  {
    id: 'teres_major',
    name: 'Teres Major',
    region: 'Shoulder',
    description: 'Thick muscle along the lower third of the scapula\'s lateral border and inferior angle — not part of the rotator cuff despite the similar name to teres minor.',
    origin: 'Lower third of the lateral border and inferior angle of the scapula',
    insertion: 'Medial lip of the intertubercular (bicipital) groove of the humerus',
    action: 'Medial rotation, adduction, and extension of the arm',
    nerve: 'Lower subscapular nerve (C5, C6, C7)',
    artery: 'Subscapular artery',
    clinicalCorrelation: 'Sits alongside latissimus dorsi (sometimes nicknamed "lat\'s little helper") and shares a similar action — both insert close together on the humerus and work together in movements like the pull-up or swimming stroke.',
    questions: [
      { q: 'How do you distinguish teres major from the rotator cuff muscles on an exam, given the similar name to teres minor?', a: 'Teres major is NOT part of the rotator cuff ("SITS" = Supraspinatus, Infraspinatus, Teres minor, Subscapularis — teres major is excluded). It is supplied by the lower subscapular nerve (not suprascapular or axillary), and its action (medial rotation, adduction, extension) is opposite in rotation direction to teres minor (lateral rotation).' },
      { q: 'Why are teres major and latissimus dorsi often described together functionally?', a: 'Both muscles insert close together on the proximal humerus (intertubercular groove) and produce very similar actions — adduction, medial rotation, and extension of the arm — so they act synergistically in movements like pulling the arm down and back (e.g. a pull-up or freestyle swimming stroke).' }
    ]
  },
  {
    id: 'subscapularis',
    name: 'Subscapularis',
    region: 'Shoulder',
    description: 'The largest and most powerful rotator cuff muscle, lying on the costal (anterior) surface of the scapula against the ribcage — the only rotator cuff muscle that internally rotates.',
    origin: 'Subscapular fossa (costal surface of the scapula)',
    insertion: 'Lesser tubercle of the humerus',
    action: 'Medial (internal) rotation of the arm; stabilises the glenohumeral joint',
    nerve: 'Upper and lower subscapular nerves (C5, C6, C7)',
    artery: 'Subscapular artery',
    clinicalCorrelation: 'Assessed with the lift-off test (Gerber\'s test) — hand placed on the lower back, patient asked to lift it off against resistance. Inability to do so suggests a subscapularis tear.',
    questions: [
      { q: 'What makes subscapularis unique among the four rotator cuff muscles, and how is it clinically tested?', a: 'It is the only rotator cuff muscle producing internal (medial) rotation — the other three (supraspinatus, infraspinatus, teres minor) abduct or externally rotate. It is tested with the lift-off (Gerber) test: the patient\'s hand is placed on the lower back, and they attempt to lift it away from the back against resistance; inability or weakness suggests a subscapularis tear.' },
      { q: 'Why does subscapularis sit on the costal surface of the scapula rather than a posterior fossa like the other cuff muscles?', a: 'Subscapularis originates from the subscapular fossa on the anterior (costal) surface of the scapula, facing the ribcage, which is why it is not visible from behind — the other three rotator cuff muscles occupy posterior scapular fossae (supraspinous and infraspinous fossae) and are visible on the back of the scapula.' }
    ]
  },
  {
    id: 'coracobrachialis',
    name: 'Coracobrachialis',
    region: 'Shoulder',
    description: 'Short muscle in the upper medial arm, notable mainly as the landmark pierced by the musculocutaneous nerve.',
    origin: 'Coracoid process of the scapula',
    insertion: 'Middle third of the medial surface of the humeral shaft',
    action: 'Flexion and adduction of the arm at the shoulder',
    nerve: 'Musculocutaneous nerve (C5, C6, C7)',
    artery: 'Muscular branches of the brachial artery',
    clinicalCorrelation: 'The musculocutaneous nerve pierces coracobrachialis before running between biceps and brachialis — a key anatomical landmark for locating the nerve in the arm and during surgical approaches to the shoulder/proximal humerus.',
    questions: [
      { q: 'Why is coracobrachialis an important surgical landmark even though it\'s a small, functionally minor muscle?', a: 'The musculocutaneous nerve pierces directly through coracobrachialis before continuing distally between biceps brachii and brachialis. Surgeons use this piercing point to reliably locate and protect the musculocutaneous nerve during anterior shoulder and proximal arm approaches.' },
      { q: 'What are the three muscles supplied by the musculocutaneous nerve, and coracobrachialis\'s role among them?', a: 'The musculocutaneous nerve supplies coracobrachialis, biceps brachii, and brachialis — the entire anterior (flexor) compartment of the arm. Coracobrachialis is pierced by the nerve first (proximally), then the nerve continues to supply the other two before terminating as the lateral cutaneous nerve of the forearm.' }
    ]
  },

  // ==================== ARM ====================
  {
    id: 'biceps_brachii',
    name: 'Biceps Brachii',
    region: 'Arm',
    description: 'Two-headed muscle of the anterior arm compartment — despite the name, it is a more powerful supinator than elbow flexor.',
    origin: 'Long head: supraglenoid tubercle of the scapula (tendon runs through the intertubercular groove). Short head: coracoid process of the scapula.',
    insertion: 'Radial tuberosity, with the bicipital aponeurosis fanning into the deep fascia of the forearm',
    action: 'Powerful supination of the forearm (strongest when the elbow is flexed); flexion of the elbow; weak flexion of the shoulder',
    nerve: 'Musculocutaneous nerve (C5, C6)',
    artery: 'Brachial artery',
    clinicalCorrelation: 'The long head tendon runs through the intertubercular (bicipital) groove — a common site of tendinitis, and of rupture producing the "Popeye deformity" (proximal muscle belly balls up after the tendon tears). The biceps reflex tests the C5/C6 myotome.',
    questions: [
      { q: 'Why is biceps brachii described as a supinator first and a flexor second?', a: 'Biceps brachii generates its greatest torque as a supinator of the forearm, especially when the elbow is already flexed (e.g. turning a screwdriver clockwise with the right hand). It does contribute to elbow flexion, but brachialis is the true prime mover for flexion regardless of forearm position — biceps assists flexion mainly when supination is also needed.' },
      { q: 'What causes the "Popeye deformity" and why does the bulge appear specifically in the distal arm?', a: 'It results from rupture of the long head tendon of biceps brachii, usually at or near the intertubercular groove. Once the proximal attachment is lost, the unopposed muscle belly retracts distally and bunches up, creating a visible, often painless bulge lower in the arm — the "Popeye" sign.' }
    ]
  },
  {
    id: 'brachialis',
    name: 'Brachialis',
    region: 'Arm',
    description: 'Lies deep to biceps brachii and is the true prime mover of elbow flexion, working regardless of forearm position.',
    origin: 'Distal half of the anterior surface of the humerus',
    insertion: 'Coronoid process and tuberosity of the ulna',
    action: 'Main flexor of the elbow joint (unlike biceps, its power does not depend on forearm pronation/supination)',
    nerve: 'Musculocutaneous nerve (C5, C6); a small lateral part may also receive radial nerve fibres (C7)',
    artery: 'Brachial artery',
    clinicalCorrelation: 'Because brachialis flexes the elbow in any forearm position while biceps is strongest in supination, clinicians can differentiate the two by testing elbow flexion with the forearm pronated (isolates brachialis more) versus supinated (biceps contributes maximally).',
    questions: [
      { q: 'Why is brachialis called the "workhorse" of elbow flexion rather than biceps brachii?', a: 'Brachialis flexes the elbow with consistent strength regardless of whether the forearm is pronated, supinated, or neutral, because it inserts on the ulna (which doesn\'t rotate) rather than the radius. Biceps brachii, by contrast, is a much stronger flexor only when the forearm is supinated — so brachialis is the true prime mover across all positions.' },
      { q: 'How can you clinically test brachialis strength somewhat separately from biceps?', a: 'Ask the patient to flex the elbow with the forearm fully pronated (palm down). This position reduces the mechanical advantage of biceps brachii (a supinator), shifting more of the work onto brachialis, which is unaffected by forearm rotation.' }
    ]
  },
  {
    id: 'triceps_brachii',
    name: 'Triceps Brachii',
    region: 'Arm',
    description: 'Three-headed muscle occupying the entire posterior compartment of the arm — the sole major extensor of the elbow.',
    origin: 'Long head: infraglenoid tubercle of the scapula. Lateral head: posterior humerus, above the radial (spiral) groove. Medial head: posterior humerus, below the radial groove.',
    insertion: 'Olecranon process of the ulna',
    action: 'Extension of the elbow joint; the long head also assists extension and adduction of the shoulder',
    nerve: 'Radial nerve (C6, C7, C8)',
    artery: 'Deep artery of the arm (profunda brachii)',
    clinicalCorrelation: 'The radial nerve and profunda brachii artery run together in the radial (spiral) groove between the medial and lateral heads — a mid-shaft humeral fracture here classically causes radial nerve palsy (wrist drop) with sparing of triceps if the injury is distal enough to the branches supplying it.',
    questions: [
      { q: 'Why does a mid-shaft humeral fracture risk radial nerve injury, and what would you expect to find?', a: 'The radial nerve runs directly in the radial (spiral) groove on the posterior humeral shaft, between the lateral and medial heads of triceps. A fracture here can stretch, compress, or lacerate the nerve, classically producing wrist drop (loss of wrist and finger extension) — triceps itself is often spared because its nerve branches usually arise proximal to the fracture site.' },
      { q: 'Which head of triceps also acts at the shoulder, and why?', a: 'The long head, because it originates from the infraglenoid tubercle of the scapula (crossing the shoulder joint) rather than the humerus alone. This gives it a secondary action of assisting shoulder extension and adduction, in addition to its main role in elbow extension.' }
    ]
  },
  {
    id: 'anconeus',
    name: 'Anconeus',
    region: 'Arm',
    description: 'Small triangular muscle just distal to the elbow on the posterior forearm, working alongside triceps.',
    origin: 'Lateral epicondyle of the humerus',
    insertion: 'Olecranon and posterior surface of the proximal ulna',
    action: 'Assists triceps in extending the elbow; stabilises the elbow joint during movement',
    nerve: 'Radial nerve (C7, C8, T1)',
    artery: 'Middle collateral artery',
    clinicalCorrelation: 'Some anatomists consider it functionally a distal extension of the triceps\' medial head. It is a useful landmark in the posterior surgical approach to the elbow.',
    questions: [
      { q: 'What is the functional relationship between anconeus and triceps brachii?', a: 'Anconeus acts as a small accessory extensor of the elbow, working alongside triceps and helping stabilise the elbow joint during extension — some anatomists describe it as functionally continuous with the medial head of triceps, though it is a distinct muscle with its own origin (lateral epicondyle) and nerve supply pattern.' },
      { q: 'Why is anconeus a useful surgical landmark at the elbow?', a: 'Its small, triangular, superficial position just distal to the lateral epicondyle makes it a reliable landmark in the posterior (posterolateral) surgical approach to the elbow joint, helping surgeons orient themselves relative to the radial head and lateral epicondyle.' }
    ]
  },

  // ==================== FOREARM — FLEXORS ====================
  {
    id: 'pronator_teres',
    name: 'Pronator Teres',
    region: 'Forearm — Flexors',
    description: 'Two-headed muscle crossing obliquely across the proximal forearm — the median nerve passes between its two heads.',
    origin: 'Humeral head: medial epicondyle of the humerus (common flexor origin). Ulnar head: coronoid process of the ulna.',
    insertion: 'Middle of the lateral surface of the radius',
    action: 'Pronation of the forearm; weak assistance in elbow flexion',
    nerve: 'Median nerve (C6, C7)',
    artery: 'Ulnar and radial recurrent arteries',
    clinicalCorrelation: 'The median nerve can become entrapped between the humeral and ulnar heads — "pronator teres syndrome" — which mimics carpal tunnel syndrome but additionally causes forearm pain and, unlike carpal tunnel, does not typically worsen at night.',
    questions: [
      { q: 'How does pronator teres syndrome differ clinically from carpal tunnel syndrome, given both involve median nerve compression?', a: 'Both cause median nerve sensory symptoms in the hand, but pronator teres syndrome compresses the nerve higher up (between the two heads of pronator teres in the forearm), causing additional proximal forearm pain/tenderness and typically no nocturnal symptom worsening — unlike carpal tunnel syndrome, which classically worsens at night and is tender only at the wrist.' },
      { q: 'Which two bones does pronator teres take origin from, and why does that matter for its entrapment risk?', a: 'It has a humeral head (medial epicondyle) and an ulnar head (coronoid process of ulna). The median nerve passes through the gap between these two heads as it enters the forearm, which is exactly why hypertrophy, fibrous bands, or muscle spasm here can compress the nerve.' }
    ]
  },
  {
    id: 'flexor_carpi_radialis',
    name: 'Flexor Carpi Radialis',
    region: 'Forearm — Flexors',
    description: 'Superficial flexor muscle whose tendon is a key landmark for the radial artery at the wrist.',
    origin: 'Medial epicondyle of the humerus (common flexor origin)',
    insertion: 'Base of the 2nd metacarpal (and often 3rd)',
    action: 'Flexion and abduction (radial deviation) of the wrist',
    nerve: 'Median nerve (C6, C7)',
    artery: 'Ulnar artery',
    clinicalCorrelation: 'Its tendon is easily palpable at the wrist and lies just medial to the radial artery — used as a landmark when palpating the radial pulse or inserting an arterial line.',
    questions: [
      { q: 'Why is the flexor carpi radialis tendon clinically useful as a landmark, beyond its own function?', a: 'It is easily palpated at the wrist as a prominent cord, and the radial artery runs immediately lateral to it. Clinicians use the FCR tendon as a reference point to reliably locate the radial artery for pulse-taking, arterial blood gas sampling, or arterial line placement.' },
      { q: 'What two wrist movements does flexor carpi radialis produce together, and why?', a: 'It produces both flexion and radial deviation (abduction) of the wrist, because its tendon crosses the wrist joint on the palmar and radial side before inserting on the base of the 2nd metacarpal — its line of pull is angled toward the radial side, not straight down the midline.' }
    ]
  },
  {
    id: 'palmaris_longus',
    name: 'Palmaris Longus',
    region: 'Forearm — Flexors',
    description: 'Small, thin, highly variable muscle — absent in a significant minority of people with no functional consequence.',
    origin: 'Medial epicondyle of the humerus (common flexor origin)',
    insertion: 'Palmar aponeurosis',
    action: 'Weak flexion of the wrist; tenses the palmar aponeurosis',
    nerve: 'Median nerve (C7, C8)',
    artery: 'Ulnar artery',
    clinicalCorrelation: 'Absent unilaterally or bilaterally in a meaningful proportion of the population (commonly cited as roughly 10–15%, varying by population) — a harmless anatomical variant. Because it is functionally dispensable, its tendon is a favoured graft source (e.g. for tendon reconstruction elsewhere in the body).',
    questions: [
      { q: 'How do you clinically test for the presence of palmaris longus, and why does its frequent absence matter surgically?', a: 'Ask the patient to oppose the thumb and little finger and flex the wrist — if present, its tendon stands out prominently in the middle of the wrist. Because it is absent in a meaningful proportion of people with no functional deficit, surgeons often use it (when present) as a convenient, "expendable" tendon graft donor for reconstructive procedures elsewhere.' },
      { q: 'Why does losing palmaris longus (surgically or congenitally absent) cause essentially no functional deficit?', a: 'Its contribution to wrist flexion is weak and largely redundant — flexor carpi radialis and flexor carpi ulnaris are the primary wrist flexors. Palmaris longus mainly tenses the palmar aponeurosis, a role that isn\'t essential for hand function, which is why its absence or removal is well tolerated.' }
    ]
  },
  {
    id: 'flexor_carpi_ulnaris',
    name: 'Flexor Carpi Ulnaris',
    region: 'Forearm — Flexors',
    description: 'Most medial (ulnar-side) superficial flexor — the ulnar nerve runs between its two heads at the elbow.',
    origin: 'Humeral head: medial epicondyle of the humerus. Ulnar head: olecranon and posterior border of the ulna.',
    insertion: 'Pisiform, hook of hamate, and base of the 5th metacarpal (via the pisohamate and pisometacarpal ligaments)',
    action: 'Flexion and adduction (ulnar deviation) of the wrist',
    nerve: 'Ulnar nerve (C8, T1)',
    artery: 'Ulnar artery',
    clinicalCorrelation: 'The ulnar nerve passes between its humeral and ulnar heads at the elbow (the cubital tunnel region) — the same nerve responsible for the "funny bone" sensation when the medial epicondyle is struck.',
    questions: [
      { q: 'Why does hitting the "funny bone" cause tingling specifically in the ring and little fingers?', a: 'The ulnar nerve runs superficially behind the medial epicondyle and then passes between the two heads of flexor carpi ulnaris (the cubital tunnel). A direct blow here compresses the nerve, which supplies sensation to the little finger and the ulnar half of the ring finger — producing the characteristic tingling in that distribution.' },
      { q: 'Which muscle is the only wrist flexor supplied by the ulnar nerve rather than the median nerve?', a: 'Flexor carpi ulnaris. Nearly all other forearm flexors (FCR, palmaris longus, most of FDS, the lateral half of FDP) are supplied by the median nerve — FCU and the medial (ulnar) half of flexor digitorum profundus are the exceptions, both supplied by the ulnar nerve.' }
    ]
  },
  {
    id: 'flexor_digitorum_superficialis',
    name: 'Flexor Digitorum Superficialis',
    region: 'Forearm — Flexors',
    description: 'Intermediate-layer muscle spanning most of the forearm\'s width — flexes the middle joint of the fingers.',
    origin: 'Humero-ulnar head: medial epicondyle and coronoid process of the ulna. Radial head: oblique line of the radius.',
    insertion: 'Sides of the middle phalanges of the medial four fingers (splitting to allow FDP tendon to pass through)',
    action: 'Flexes the proximal interphalangeal (PIP) joints of the fingers (and secondarily the MCP and wrist joints)',
    nerve: 'Median nerve (C7, C8, T1)',
    artery: 'Ulnar artery',
    clinicalCorrelation: 'Because each FDS tendon can be flexed somewhat independently at the PIP joint (unlike FDP, whose tendons act together), it is tested in isolation by holding the other fingers passively extended and asking the patient to flex only one finger at the PIP joint.',
    questions: [
      { q: 'How do you clinically test flexor digitorum superficialis in isolation from flexor digitorum profundus?', a: 'Hold all the patient\'s fingers except the one being tested in full passive extension (this locks out FDP\'s shared muscle belly action on those fingers), then ask the patient to flex the test finger at the PIP joint. If PIP flexion still occurs, FDS to that finger is intact.' },
      { q: 'Why does FDS split at its insertion, and what passes through the split?', a: 'Each FDS tendon splits into two slips at the middle phalanx to insert on either side of it. The corresponding flexor digitorum profundus tendon passes through this split (Camper\'s chiasm) to continue on to the distal phalanx — allowing both muscles to act on the same finger without one tendon blocking the other.' }
    ]
  },
  {
    id: 'flexor_digitorum_profundus',
    name: 'Flexor Digitorum Profundus',
    region: 'Forearm — Flexors',
    description: 'Deepest flexor of the forearm and the only muscle that can flex the distal interphalangeal joints.',
    origin: 'Proximal three-quarters of the anterior and medial surfaces of the ulna, and the interosseous membrane',
    insertion: 'Base of the distal phalanges of the medial four fingers',
    action: 'Flexes the distal interphalangeal (DIP) joints of the fingers (also assists PIP, MCP, and wrist flexion)',
    nerve: 'Medial half (ring, little finger): ulnar nerve (C8, T1). Lateral half (index, middle finger): anterior interosseous branch of the median nerve.',
    artery: 'Ulnar and anterior interosseous arteries',
    clinicalCorrelation: '"Jersey finger" is a traumatic avulsion of the FDP tendon insertion, classically from grabbing an opponent\'s jersey with a flexed finger while it\'s forcibly extended — most common in the ring finger. Tested by holding the PIP joint extended and asking for DIP flexion.',
    questions: [
      { q: 'Why is FDP the muscle responsible for "jersey finger" injuries?', a: 'FDP is the only muscle inserting on the distal phalanx and therefore the only one capable of flexing the DIP joint. In "jersey finger," a flexed finger (commonly the ring finger, gripping a jersey) is forcibly extended, avulsing the FDP tendon from its distal phalanx insertion — since no other muscle can substitute for DIP flexion, this causes an isolated inability to flex that fingertip.' },
      { q: 'Why does FDP have a split nerve supply between the ulnar and median nerves, unlike most other flexors?', a: 'FDP is a single muscle belly, but it is functionally divided: the medial half (supplying the ring and little fingers) is innervated by the ulnar nerve, while the lateral half (supplying the index and middle fingers) is innervated by the anterior interosseous branch of the median nerve. This split explains why isolated ulnar or median (anterior interosseous) nerve lesions can each cause a partial DIP flexion deficit affecting only some fingers.' }
    ]
  },
  {
    id: 'flexor_pollicis_longus',
    name: 'Flexor Pollicis Longus',
    region: 'Forearm — Flexors',
    description: 'Deep radial-side muscle and the only one able to flex the interphalangeal joint of the thumb.',
    origin: 'Anterior surface of the radius and adjacent interosseous membrane',
    insertion: 'Base of the distal phalanx of the thumb',
    action: 'Flexes the interphalangeal joint of the thumb (the only muscle that can)',
    nerve: 'Anterior interosseous nerve (branch of the median nerve, C8, T1)',
    artery: 'Anterior interosseous artery',
    clinicalCorrelation: 'Anterior interosseous nerve syndrome is a pure motor lesion affecting FPL, the lateral half of FDP, and pronator quadratus — classically presenting as an inability to make a normal "OK sign" (the pinch becomes flattened/triangular because the thumb and index fingertip can\'t flex properly).',
    questions: [
      { q: 'What is the classic clinical sign of anterior interosseous nerve syndrome, and why does it occur?', a: 'The patient cannot form a proper "OK sign" — instead of a rounded pinch between thumb and index finger, the tips stay straight, producing a triangular/flattened pinch. This happens because AIN supplies FPL (thumb IP flexion) and the lateral half of FDP (index DIP flexion), and it is a pure motor nerve, so there\'s no accompanying sensory loss.' },
      { q: 'Why is flexor pollicis longus grouped with the "deep" flexor layer rather than the superficial layer?', a: 'It originates from the anterior radius and interosseous membrane (deep structures) rather than the common flexor origin at the medial epicondyle, and lies deep to the superficial wrist flexors — placing it functionally and anatomically alongside flexor digitorum profundus and pronator quadratus in the deep flexor compartment.' }
    ]
  },
  {
    id: 'pronator_quadratus',
    name: 'Pronator Quadratus',
    region: 'Forearm — Flexors',
    description: 'Deepest muscle of the distal forearm, and the true prime mover of pronation regardless of elbow position.',
    origin: 'Distal quarter of the anterior surface of the ulna',
    insertion: 'Distal quarter of the anterior surface of the radius',
    action: 'Prime mover of forearm pronation (active in every pronation movement, unlike pronator teres which assists mainly against resistance); helps hold the radius and ulna together at the distal radioulnar joint',
    nerve: 'Anterior interosseous nerve (branch of the median nerve, C8, T1)',
    artery: 'Anterior interosseous artery',
    clinicalCorrelation: 'Being the deepest muscle at the wrist, it is the first structure encountered (and often incised/reflected) in the standard volar (Henry) surgical approach to distal radius fractures.',
    questions: [
      { q: 'Why is pronator quadratus considered the prime mover of pronation rather than pronator teres, despite the similar names?', a: 'Pronator quadratus is active during every pronation movement, regardless of elbow position or resistance, making it the true prime mover. Pronator teres assists mainly when pronation is rapid or against resistance, and its effectiveness varies more with elbow position — so it is considered an accessory rather than the primary pronator.' },
      { q: 'Why is pronator quadratus surgically significant in distal radius fracture repair?', a: 'It is the deepest muscle overlying the distal radius anteriorly, so the standard volar (Henry) surgical approach to distal radius fractures must pass through or reflect pronator quadratus to reach the bone — surgeons try to repair it afterward to preserve some pronation strength and protect the underlying tendons.' }
    ]
  },

  // ==================== FOREARM — EXTENSORS ====================
  {
    id: 'brachioradialis',
    name: 'Brachioradialis',
    region: 'Forearm — Extensors',
    description: 'Prominent muscle of the lateral forearm — unusually, an "extensor compartment" muscle that actually flexes the elbow, supplied by the radial nerve.',
    origin: 'Upper two-thirds of the lateral supracondylar ridge of the humerus',
    insertion: 'Base of the styloid process of the radius',
    action: 'Flexes the elbow (most effectively when the forearm is mid-pronated); assists pronation and supination toward the neutral (mid-prone) position',
    nerve: 'Radial nerve (C5, C6)',
    artery: 'Radial recurrent artery',
    clinicalCorrelation: 'The brachioradialis (supinator) reflex tests the C5/C6 nerve roots. An "inverted supinator jerk" — where tapping the tendon produces finger flexion instead of the normal brachioradialis contraction — is a classic sign of a spinal cord lesion at C5/C6 (e.g. cervical spondylotic myelopathy).',
    questions: [
      { q: 'Why is brachioradialis anatomically unusual compared to the other extensor compartment muscles?', a: 'It lies in the posterior (extensor) compartment of the forearm and is supplied by the radial nerve like the true extensors, but functionally it flexes the elbow rather than extending the wrist or fingers — making it an exception to the general rule that radial-nerve/extensor-compartment muscles extend joints.' },
      { q: 'What does an "inverted supinator jerk" indicate, and at what spinal level?', a: 'It indicates a lesion (often cord compression) at the C5/C6 level. Tapping the brachioradialis tendon normally produces elbow flexion via the C5/C6 reflex arc; if that arc is disrupted at the cord itself while lower reflex pathways remain hyperactive, the tap instead triggers finger flexion — a sign classically associated with cervical myelopathy at C5/6.' }
    ]
  },
  {
    id: 'extensor_carpi_radialis_longus',
    name: 'Extensor Carpi Radialis Longus',
    region: 'Forearm — Extensors',
    description: 'Superficial radial-side wrist extensor, lying deep to brachioradialis.',
    origin: 'Lateral supracondylar ridge of the humerus',
    insertion: 'Base of the 2nd metacarpal',
    action: 'Extension and abduction (radial deviation) of the wrist',
    nerve: 'Radial nerve (C6, C7)',
    artery: 'Radial recurrent artery',
    clinicalCorrelation: 'Along with extensor carpi radialis brevis, involved in repetitive strain injury at the common extensor/supracondylar origin, contributing to lateral elbow pain syndromes.',
    questions: [
      { q: 'What wrist movements does ECRL produce, and why both together?', a: 'It produces both extension and radial deviation (abduction) of the wrist, because its tendon runs along the radial side of the wrist before inserting on the base of the 2nd metacarpal — its line of pull is angled toward the radial side rather than straight up the midline of the wrist.' },
      { q: 'How does ECRL\'s origin differ from ECRB\'s, and why does that distinction matter clinically?', a: 'ECRL originates from the lateral supracondylar ridge (above the lateral epicondyle), while ECRB originates from the lateral epicondyle itself (common extensor origin) — the same origin as several other extensors implicated in lateral epicondylitis. This is why ECRB, not ECRL, is the muscle most classically blamed for "tennis elbow."' }
    ]
  },
  {
    id: 'extensor_carpi_radialis_brevis',
    name: 'Extensor Carpi Radialis Brevis',
    region: 'Forearm — Extensors',
    description: 'Radial-side wrist extensor arising from the common extensor origin — the muscle most classically implicated in tennis elbow.',
    origin: 'Lateral epicondyle of the humerus (common extensor origin)',
    insertion: 'Base of the 3rd metacarpal',
    action: 'Extension and abduction (radial deviation) of the wrist',
    nerve: 'Posterior interosseous branch of the radial nerve (C7, C8)',
    artery: 'Radial recurrent artery',
    clinicalCorrelation: 'The most commonly implicated muscle in lateral epicondylitis ("tennis elbow") — repetitive wrist extension causes microtears at its origin on the lateral epicondyle, producing pain reproduced by resisted wrist extension.',
    questions: [
      { q: 'Why is ECRB specifically (rather than the other wrist extensors) the classic culprit in tennis elbow?', a: 'ECRB originates directly from the lateral epicondyle (the common extensor origin) and its tendon experiences the highest mechanical strain during repetitive gripping and wrist extension. Microtears and degenerative changes (angiofibroblastic tendinosis) accumulate there faster than in the other extensors, making it the primary site of pathology in lateral epicondylitis.' },
      { q: 'What bedside test reproduces the pain of lateral epicondylitis, and why?', a: 'Resisted wrist extension with the elbow extended (Cozen\'s test) reproduces pain at the lateral epicondyle, because it loads the ECRB tendon at its damaged origin — the same tendon responsible for most cases of tennis elbow.' }
    ]
  },
  {
    id: 'extensor_digitorum',
    name: 'Extensor Digitorum',
    region: 'Forearm — Extensors',
    description: 'Main finger extensor, occupying the middle of the posterior forearm and fanning out into extensor expansions on the medial four fingers.',
    origin: 'Lateral epicondyle of the humerus (common extensor origin)',
    insertion: 'Dorsal digital (extensor) expansions of the medial four fingers',
    action: 'Extends the metacarpophalangeal joints (and, via the extensor expansion, contributes to interphalangeal extension) of the medial four fingers',
    nerve: 'Posterior interosseous nerve (branch of the radial nerve, C7, C8)',
    artery: 'Posterior interosseous artery',
    clinicalCorrelation: 'A posterior interosseous nerve palsy (e.g. from a Monteggia fracture-dislocation or radial head dislocation) causes finger drop at the MCP joints, but wrist extension is often relatively preserved since extensor carpi radialis longus is supplied above the lesion.',
    questions: [
      { q: 'Why can a posterior interosseous nerve lesion cause finger drop while wrist extension is relatively preserved?', a: 'The posterior interosseous nerve (the deep motor branch of the radial nerve, after it passes through supinator) supplies extensor digitorum and the other digital/thumb extensors, but extensor carpi radialis longus is supplied by the radial nerve proper, proximal to where the PIN branches off. A PIN lesion therefore spares ECRL, preserving some wrist extension while the fingers droop at the MCP joints.' },
      { q: 'How does the extensor expansion allow extensor digitorum to affect the interphalangeal joints, given it inserts proximally?', a: 'The tendon of extensor digitorum blends into a fibrous hood (the extensor expansion/dorsal digital expansion) over the dorsum of each finger, which also receives contributions from the lumbricals and interossei. This shared expansion transmits extending force to the middle and distal phalanges as well as the MCP joint, even though extensor digitorum itself only directly attaches near the MCP level.' }
    ]
  },
  {
    id: 'extensor_digiti_minimi',
    name: 'Extensor Digiti Minimi',
    region: 'Forearm — Extensors',
    description: 'Thin accessory extensor running alongside extensor digitorum, dedicated to the little finger.',
    origin: 'Lateral epicondyle of the humerus (common extensor origin)',
    insertion: 'Extensor expansion of the little finger',
    action: 'Extends the little finger; assists wrist extension',
    nerve: 'Posterior interosseous nerve (C7, C8)',
    artery: 'Posterior interosseous artery',
    clinicalCorrelation: 'Because it acts alongside extensor digitorum\'s slip to the little finger, it allows the little finger to be extended somewhat independently of the other fingers — useful in clinical exams testing individual finger movement and fine motor coordination.',
    questions: [
      { q: 'What functional advantage does having a dedicated extensor for the little finger provide?', a: 'Extensor digiti minimi acts in addition to the little-finger slip of extensor digitorum, giving the little finger extra independent extensor capacity. This allows more independent movement of the little finger relative to the other fingers, which are more mechanically linked through the shared extensor digitorum tendon.' },
      { q: 'Which nerve supplies extensor digiti minimi, and what else does that nerve supply in the same compartment?', a: 'The posterior interosseous nerve, the deep terminal branch of the radial nerve — the same nerve that supplies extensor digitorum, extensor carpi ulnaris, supinator, and the thumb extensors/abductor. A PIN lesion therefore affects little finger extension along with the rest of the extensor compartment (except ECRL, supplied more proximally).' }
    ]
  },
  {
    id: 'extensor_carpi_ulnaris',
    name: 'Extensor Carpi Ulnaris',
    region: 'Forearm — Extensors',
    description: 'Ulnar-side wrist extensor running in a groove on the ulnar head — prone to subluxation with forceful forearm rotation.',
    origin: 'Humeral head: lateral epicondyle (common extensor origin). Ulnar head: posterior border of the ulna.',
    insertion: 'Base of the 5th metacarpal',
    action: 'Extension and adduction (ulnar deviation) of the wrist',
    nerve: 'Posterior interosseous nerve (C7, C8)',
    artery: 'Posterior interosseous artery',
    clinicalCorrelation: 'Its tendon runs in a groove on the ulnar head, held in place by a fibro-osseous sheath — repetitive forceful wrist rotation (common in racquet sports, golf, cricket) can tear this sheath, letting the tendon subluxate/snap out of the groove, producing painful snapping at the wrist.',
    questions: [
      { q: 'Why do racquet-sport and cricket players commonly develop ECU tendon subluxation?', a: 'The ECU tendon runs through a groove on the ulnar head, stabilised by a fibro-osseous (subsheath) retinaculum. Repetitive, forceful combined wrist flexion/ulnar deviation with forearm rotation — typical of racquet swings or a cricket bowling/batting action — can stretch or tear this retinaculum, allowing the tendon to snap out of its groove (subluxate) with certain wrist movements, causing pain and an audible/palpable snap.' },
      { q: 'What wrist movements does ECU produce, and how does that differ from ECRL/ECRB?', a: 'ECU extends and adducts (ulnar-deviates) the wrist, whereas ECRL/ECRB extend and abduct (radially deviate) it — the two groups pull the wrist in extension but toward opposite sides, which is why pure wrist extension (without deviation) requires balanced co-contraction of both the radial and ulnar extensor groups.' }
    ]
  },
  {
    id: 'supinator',
    name: 'Supinator',
    region: 'Forearm — Extensors',
    description: 'Deep muscle wrapping around the proximal radius — the deep branch of the radial nerve passes directly through it.',
    origin: 'Lateral epicondyle of the humerus, supinator crest of the ulna, and the radial collateral and annular ligaments',
    insertion: 'Proximal third of the lateral surface of the radius',
    action: 'Supinates the forearm (works alone for unresisted supination; biceps brachii adds power when supination is resisted)',
    nerve: 'Deep branch of the radial nerve / posterior interosseous nerve (C7, C8)',
    artery: 'Radial recurrent artery',
    clinicalCorrelation: 'The deep branch of the radial nerve passes through supinator via a tight fibrous edge called the arcade of Frohse — entrapment here (posterior interosseous nerve / supinator syndrome) causes finger and thumb drop with wrist extension partly preserved, and no sensory loss since the nerve is purely motor at this point.',
    questions: [
      { q: 'What is the arcade of Frohse, and why is it clinically important?', a: 'It is a fibrous arch at the proximal edge of the superficial head of supinator, through which the deep branch of the radial nerve (posterior interosseous nerve) passes. It is a recognised site of nerve entrapment — "supinator syndrome" — causing weakness of finger and thumb extension with no sensory loss, since by this point the nerve is purely motor.' },
      { q: 'Why does posterior interosseous nerve entrapment at supinator spare sensation, unlike a radial nerve injury higher up (e.g. at the spiral groove)?', a: 'The radial nerve gives off its sensory branch (superficial radial nerve) before entering supinator. By the time the nerve passes through the arcade of Frohse, it has already become the purely motor posterior interosseous nerve — so entrapment here causes motor deficits (finger/thumb extension weakness) without any sensory loss, unlike a more proximal radial nerve lesion which affects both.' }
    ]
  },
  {
    id: 'abductor_pollicis_longus',
    name: 'Abductor Pollicis Longus',
    region: 'Forearm — Extensors',
    description: 'Deep muscle crossing obliquely to the thumb — forms the lateral border of the anatomical snuffbox.',
    origin: 'Posterior surfaces of the radius, ulna, and interosseous membrane',
    insertion: 'Base of the 1st metacarpal',
    action: 'Abducts and extends the thumb at the carpometacarpal joint',
    nerve: 'Posterior interosseous nerve (C7, C8)',
    artery: 'Posterior interosseous artery',
    clinicalCorrelation: 'Together with extensor pollicis brevis, forms the first dorsal compartment of the wrist — inflammation of these two tendons within their shared sheath is De Quervain\'s tenosynovitis, producing pain over the radial wrist worsened by thumb movement and ulnar deviation (positive Finkelstein test).',
    questions: [
      { q: 'What is De Quervain\'s tenosynovitis, and which two muscles does it involve?', a: 'It is inflammation/thickening of the tendon sheath of the first dorsal compartment of the wrist, which contains abductor pollicis longus and extensor pollicis brevis. Repetitive thumb/wrist movements (e.g. texting, lifting a baby with thumbs extended) cause pain over the radial styloid, reproduced by the Finkelstein test (making a fist over the thumb and ulnar-deviating the wrist).' },
      { q: 'Which border of the anatomical snuffbox does abductor pollicis longus form, and what else contributes to the snuffbox?', a: 'APL (with EPB) forms the lateral/anterior border of the anatomical snuffbox. Extensor pollicis longus forms the medial/posterior border, and the floor is formed by the scaphoid and trapezium — clinically significant because scaphoid fractures produce tenderness in this space.' }
    ]
  },
  {
    id: 'extensor_pollicis_brevis',
    name: 'Extensor Pollicis Brevis',
    region: 'Forearm — Extensors',
    description: 'Deep muscle running alongside abductor pollicis longus — together they form the first dorsal compartment.',
    origin: 'Posterior surface of the radius and adjacent interosseous membrane',
    insertion: 'Base of the proximal phalanx of the thumb',
    action: 'Extends the metacarpophalangeal joint of the thumb',
    nerve: 'Posterior interosseous nerve (C7, C8)',
    artery: 'Posterior interosseous artery',
    clinicalCorrelation: 'Shares the first dorsal compartment (and its pathology, De Quervain\'s tenosynovitis) with abductor pollicis longus — the two tendons are inseparable clinically in this condition.',
    questions: [
      { q: 'How does EPB\'s insertion differ from EPL\'s, and what does that mean functionally?', a: 'EPB inserts on the proximal phalanx of the thumb, so it only extends the metacarpophalangeal (MCP) joint. Extensor pollicis longus inserts further distally on the distal phalanx, giving it the additional ability to extend the interphalangeal (IP) joint — a distinction used to test each tendon\'s integrity separately.' },
      { q: 'Why are APL and EPB almost always discussed together clinically?', a: 'Both tendons run through the same fibro-osseous first dorsal compartment at the wrist, sharing a common synovial sheath. This shared tunnel means they are affected together in De Quervain\'s tenosynovitis, and both form the lateral border of the anatomical snuffbox.' }
    ]
  },
  {
    id: 'extensor_pollicis_longus',
    name: 'Extensor Pollicis Longus',
    region: 'Forearm — Extensors',
    description: 'Deep muscle whose tendon hooks around a bony pulley (Lister\'s tubercle) before reaching the thumb — vulnerable to rupture after wrist fractures.',
    origin: 'Posterior surface of the ulna and adjacent interosseous membrane',
    insertion: 'Base of the distal phalanx of the thumb',
    action: 'Extends the interphalangeal joint of the thumb',
    nerve: 'Posterior interosseous nerve (C7, C8)',
    artery: 'Posterior interosseous artery',
    clinicalCorrelation: 'The tendon changes direction around Lister\'s tubercle of the radius, a site of mechanical wear — attritional rupture can occur weeks after a distal radius (Colles\') fracture, even a well-healed one, causing sudden inability to extend the thumb tip.',
    questions: [
      { q: 'Why can a patient lose thumb extension weeks after a distal radius fracture has already healed?', a: 'The EPL tendon changes direction sharply around Lister\'s tubercle on the radius. Healing bone callus, altered bone contour, or reduced blood supply after a distal radius (Colles\') fracture can cause the tendon to fray and rupture weeks later at this friction point — a delayed, "attritional" rupture rather than an acute traumatic tear.' },
      { q: 'What forms the medial/posterior border of the anatomical snuffbox, and why does that matter?', a: 'Extensor pollicis longus forms the medial (posterior) border of the anatomical snuffbox, with APL/EPB forming the lateral border. The radial artery crosses the floor of the snuffbox — a landmark relevant both for palpating the pulse and for assessing scaphoid tenderness after a fall on an outstretched hand.' }
    ]
  },
  {
    id: 'extensor_indicis',
    name: 'Extensor Indicis',
    region: 'Forearm — Extensors',
    description: 'The deepest, most distal extensor — gives the index finger the ability to extend independently of the others.',
    origin: 'Posterior surface of the ulna and adjacent interosseous membrane',
    insertion: 'Extensor expansion of the index finger',
    action: 'Extends the index finger independently of the other fingers (e.g. pointing while the hand is otherwise relaxed/flexed)',
    nerve: 'Posterior interosseous nerve (C7, C8)',
    artery: 'Posterior interosseous artery',
    clinicalCorrelation: 'Because it is functionally dispensable (extensor digitorum still extends the index finger with the others) but produces independent index extension, it is a favoured tendon transfer donor — e.g. transferred to restore thumb extension after an irreparable extensor pollicis longus rupture.',
    questions: [
      { q: 'Why is extensor indicis a popular donor tendon in reconstructive hand surgery?', a: 'Its own function (independent index finger extension) is largely redundant, since extensor digitorum already extends the index finger together with the other fingers. This makes it "expendable" enough to sacrifice and transfer — classically to restore thumb extension in a patient with an irreparable EPL tendon rupture.' },
      { q: 'How can a clinician demonstrate that extensor indicis exists as a distinct muscle from extensor digitorum?', a: 'Ask the patient to make a fist (flexing the other fingers) and then extend only the index finger. Because extensor indicis acts independently of extensor digitorum\'s shared tendon, the index finger can extend on its own while the others stay flexed — a movement that would be far weaker or impossible if extensor digitorum were the only extensor available to that finger.' }
    ]
  },

  // ==================== GLUTEAL ====================
  {
    id: 'gluteus_maximus',
    name: 'Gluteus Maximus',
    region: 'Gluteal',
    description: 'The largest, most superficial gluteal muscle — the main extensor of the hip, powerful in climbing, standing from sitting, and running (but not in level walking).',
    origin: 'Posterior gluteal line of the ilium, posterior surfaces of the sacrum and coccyx, and the sacrotuberous ligament',
    insertion: 'Iliotibial tract (majority) and the gluteal tuberosity of the femur',
    action: 'Powerful extension and lateral rotation of the hip; upper fibres assist abduction. Recruited chiefly for forceful extension — rising from sitting, climbing stairs, running — not for ordinary walking on the flat.',
    nerve: 'Inferior gluteal nerve (L5, S1, S2)',
    artery: 'Inferior gluteal artery',
    clinicalCorrelation: 'The safe site for an intramuscular injection is the upper outer quadrant of the buttock, chosen to avoid the sciatic nerve and the gluteal vessels/nerves that emerge below piriformis. Weakness makes rising from a chair or climbing stairs difficult, though level walking is preserved.',
    questions: [
      { q: 'Why is gluteus maximus not essential for walking on level ground, yet vital for climbing stairs?', a: 'On level ground the hamstrings and gravity manage hip extension, so gluteus maximus stays relatively quiet. It is recruited for powerful/forced extension against resistance — climbing stairs, rising from sitting, running, jumping — where large extension torque is needed. Hence its weakness spares flat walking but impairs stair-climbing and standing up.' },
      { q: 'Why is the upper outer quadrant chosen for a gluteal intramuscular injection?', a: 'It keeps the needle away from the sciatic nerve and the superior/inferior gluteal vessels and nerves, which lie in the lower and medial parts of the buttock (emerging around piriformis). Injecting into the upper outer quadrant reaches thick muscle while avoiding these structures, preventing sciatic nerve injury (which would cause foot drop and sensory loss).' }
    ]
  },
  {
    id: 'gluteus_medius',
    name: 'Gluteus Medius',
    region: 'Gluteal',
    description: 'Fan-shaped abductor deep to gluteus maximus — a key pelvic stabiliser during walking. Its integrity is tested by the Trendelenburg sign.',
    origin: 'External surface of the ilium between the anterior and posterior gluteal lines',
    insertion: 'Lateral surface of the greater trochanter of the femur',
    action: 'Abduction of the hip; crucially, steadies the pelvis over the planted limb during the stance phase of gait so the opposite (swinging) side does not drop. Anterior fibres also medially rotate.',
    nerve: 'Superior gluteal nerve (L4, L5, S1)',
    artery: 'Superior gluteal artery',
    clinicalCorrelation: 'Weakness (or superior gluteal nerve injury) causes a positive Trendelenburg sign: when standing on the affected leg, the opposite unsupported hip drops. Bilateral or gait-phase weakness produces a waddling (Trendelenburg) gait. The superior gluteal nerve is at risk in badly placed gluteal injections and hip surgery.',
    questions: [
      { q: 'What is the Trendelenburg sign and what does a positive test indicate?', a: 'With the patient standing on one leg, the gluteus medius/minimus of the *stance* limb should hold the pelvis level. If they are weak (or the superior gluteal nerve is damaged) on the stance side, the pelvis drops on the *opposite* (unsupported) side — a positive Trendelenburg sign. It localises the lesion to the weight-bearing limb, not the side that drops.' },
      { q: 'Why does superior gluteal nerve injury cause a characteristic gait?', a: 'The superior gluteal nerve supplies gluteus medius and minimus, the pelvic stabilisers in stance phase. Without them the pelvis tilts down toward the swing side each step, so the patient compensates by leaning the trunk toward the stance side — producing a lurching/waddling (Trendelenburg) gait, worse when bilateral.' }
    ]
  },
  {
    id: 'gluteus_minimus',
    name: 'Gluteus Minimus',
    region: 'Gluteal',
    description: 'The smallest, deepest gluteal fan — works with gluteus medius as a hip abductor and pelvic stabiliser.',
    origin: 'External surface of the ilium between the anterior and inferior gluteal lines',
    insertion: 'Anterior surface of the greater trochanter of the femur',
    action: 'Abduction and medial rotation of the hip; stabilises the pelvis in stance phase with gluteus medius',
    nerve: 'Superior gluteal nerve (L4, L5, S1)',
    artery: 'Superior gluteal artery',
    clinicalCorrelation: 'Shares nerve, action and clinical significance (Trendelenburg) with gluteus medius — both are abductor-stabilisers supplied by the superior gluteal nerve, so a single nerve lesion knocks out both.',
    questions: [
      { q: 'Which two muscles does the superior gluteal nerve supply that act together, and what do they share?', a: 'Gluteus medius and gluteus minimus. Both abduct and medially rotate the hip and, most importantly, stabilise the pelvis over the stance limb during walking. Because one nerve (superior gluteal) supplies both, its injury weakens the whole abductor mechanism and produces a Trendelenburg sign/gait.' },
      { q: 'How does gluteus minimus differ in insertion from gluteus medius?', a: 'Gluteus minimus inserts on the *anterior* surface of the greater trochanter, whereas gluteus medius inserts on the *lateral* surface. This slightly anterior line of pull gives minimus a stronger medial-rotation component, but functionally the two act as a unit in abduction and pelvic stabilisation.' }
    ]
  },
  {
    id: 'tensor_fasciae_latae',
    name: 'Tensor Fasciae Latae',
    region: 'Gluteal',
    description: 'Small muscle enclosed in the fascia lata that tenses the iliotibial tract, helping stabilise the knee and hip in the extended, weight-bearing limb.',
    origin: 'Anterior superior iliac spine (ASIS) and the anterior part of the iliac crest',
    insertion: 'Iliotibial tract, which attaches to the lateral condyle of the tibia (Gerdy\'s tubercle)',
    action: 'Tenses the iliotibial tract; assists flexion, abduction and medial rotation of the hip; helps steady the extended knee',
    nerve: 'Superior gluteal nerve (L4, L5, S1)',
    artery: 'Superior gluteal artery / lateral circumflex femoral artery',
    clinicalCorrelation: 'A tight iliotibial tract (with TFL and gluteus maximus feeding into it) is implicated in iliotibial band syndrome, a common cause of lateral knee pain in runners as the band rubs over the lateral femoral condyle during repeated flexion/extension.',
    questions: [
      { q: 'How do tensor fasciae latae and gluteus maximus both relate to the iliotibial tract?', a: 'Both insert into the iliotibial tract — TFL anteriorly and the major part of gluteus maximus posteriorly. Through this shared tendon they tense the tract, which stabilises the hip and the extended knee laterally. It also explains why tightness/overuse of the tract (ITB syndrome) links to both muscles.' },
      { q: 'Why is TFL grouped with the superior gluteal nerve muscles?', a: 'Like gluteus medius and minimus, TFL is supplied by the superior gluteal nerve and shares an abductor/medial-rotator role at the hip. It also helps stabilise the pelvis and the knee via the iliotibial tract — consistent with the superior gluteal nerve\'s theme of pelvic/limb stabilisation.' }
    ]
  },
  {
    id: 'piriformis',
    name: 'Piriformis',
    region: 'Gluteal',
    description: 'Pear-shaped muscle that is the key landmark of the gluteal region — the sciatic nerve emerges just below it, and the gluteal vessels/nerves are named by their relation to it.',
    origin: 'Anterior surface of the sacrum (between the anterior sacral foramina)',
    insertion: 'Superior border of the greater trochanter of the femur',
    action: 'Lateral rotation of the extended hip; abduction of the flexed hip; stabilises the femoral head in the acetabulum',
    nerve: 'Nerve to piriformis (S1, S2)',
    artery: 'Superior and inferior gluteal arteries',
    clinicalCorrelation: 'The sciatic nerve usually exits the pelvis just inferior to piriformis; in a minority the nerve (or its common fibular division) pierces the muscle, predisposing to piriformis syndrome — buttock pain with sciatica-like radiation reproduced by resisted external rotation.',
    questions: [
      { q: 'Why is piriformis the key landmark of the gluteal region?', a: 'The gluteal neurovascular structures are named by their relation to piriformis: the superior gluteal nerve and vessels emerge *above* it, while the inferior gluteal nerve/vessels, the sciatic nerve, the pudendal nerve and the nerve to obturator internus emerge *below* it. Identifying piriformis therefore orients you to everything else in the buttock.' },
      { q: 'What is piriformis syndrome and its anatomical basis?', a: 'Compression or irritation of the sciatic nerve by piriformis, causing buttock pain and sciatica-like radiation down the leg without a disc lesion. It is favoured by anatomical variants where the sciatic nerve (or its common fibular division) passes through rather than below the muscle. Pain is classically reproduced by resisted external rotation/abduction of the hip.' }
    ]
  },

  // ==================== THIGH — ANTERIOR ====================
  {
    id: 'iliopsoas',
    name: 'Iliopsoas',
    region: 'Thigh — Anterior',
    description: 'The chief flexor of the hip, formed by psoas major and iliacus sharing a common tendon. Psoas major is also a key posterior abdominal wall landmark.',
    origin: 'Psoas major: transverse processes, bodies and discs of T12–L5. Iliacus: iliac fossa of the pelvis.',
    insertion: 'Lesser trochanter of the femur (common tendon)',
    action: 'Powerful flexion of the hip (and flexes the trunk on the hip when sitting up); weak lateral rotation. Psoas major also flexes the lumbar spine laterally.',
    nerve: 'Psoas major: anterior rami of L1–L3. Iliacus: femoral nerve (L2, L3).',
    artery: 'Medial femoral circumflex and iliolumbar arteries',
    clinicalCorrelation: 'A psoas abscess (e.g. from TB, or spread from the spine/appendix) tracks down the psoas sheath into the groin, producing a positive psoas sign — pain on resisted hip flexion or passive hip extension — classically seen in retrocaecal appendicitis.',
    questions: [
      { q: 'What is the psoas sign and why does it appear in appendicitis?', a: 'The psoas sign is pain on passive extension (or resisted flexion) of the right hip, caused by irritation of the iliopsoas. In appendicitis — especially a retrocaecal appendix lying against the psoas — inflammation irritates the muscle, so stretching it reproduces pain. It also appears with a psoas abscess.' },
      { q: 'Why is iliopsoas described as two muscles with one tendon, and does that matter for innervation?', a: 'Psoas major (from the lumbar vertebrae) and iliacus (from the iliac fossa) converge on a common tendon inserting on the lesser trochanter, acting together as the main hip flexor. Their nerve supply differs, though: psoas major from anterior rami of L1–L3 directly, iliacus from the femoral nerve — so they are functionally one unit but innervated separately.' }
    ]
  },
  {
    id: 'sartorius',
    name: 'Sartorius',
    region: 'Thigh — Anterior',
    description: 'The longest muscle in the body — a strap running obliquely across the thigh, producing the "tailor\'s cross-legged sitting" position. Forms the lateral border of the femoral triangle.',
    origin: 'Anterior superior iliac spine (ASIS)',
    insertion: 'Superomedial surface of the tibia (as part of the pes anserinus)',
    action: 'Flexes, abducts and laterally rotates the hip, and flexes the knee — combined, the movements that cross one leg over the opposite thigh',
    nerve: 'Femoral nerve (L2, L3)',
    artery: 'Femoral artery (muscular branches)',
    clinicalCorrelation: 'Sartorius is the lateral border of the femoral triangle (inguinal ligament superiorly, adductor longus medially), within which lie the femoral nerve, artery and vein — the site for palpating the femoral pulse and for femoral vascular access.',
    questions: [
      { q: 'What are the boundaries of the femoral triangle and its contents?', a: 'Superiorly the inguinal ligament, laterally the medial border of sartorius, medially the medial border of adductor longus. Its floor is iliopsoas and pectineus. Contents (lateral→medial): femoral Nerve, Artery, Vein, and the femoral canal/lymphatics (mnemonic NAVEL). It is the site for the femoral pulse and vascular access.' },
      { q: 'How do all of sartorius\'s actions combine into one functional movement?', a: 'Sartorius simultaneously flexes, abducts and laterally rotates the hip and flexes the knee. Put together, these place the ankle on the opposite knee — the cross-legged "tailor\'s position," which is the origin of its name (sartor = tailor).' }
    ]
  },
  {
    id: 'rectus_femoris',
    name: 'Rectus Femoris',
    region: 'Thigh — Anterior',
    description: 'The only quadriceps head to cross the hip as well as the knee, so it both flexes the hip and extends the knee. The central, most superficial quadriceps component.',
    origin: 'Straight head: anterior inferior iliac spine (AIIS). Reflected head: ilium above the acetabulum.',
    insertion: 'Base of the patella, then via the patellar ligament to the tibial tuberosity',
    action: 'Extends the knee and flexes the hip. Because it crosses two joints, it is a weaker knee extensor when the hip is already flexed.',
    nerve: 'Femoral nerve (L2, L3, L4)',
    artery: 'Lateral circumflex femoral artery',
    clinicalCorrelation: 'All four quadriceps components converge on the patella; the knee-jerk (patellar reflex) tests this quadriceps/femoral nerve pathway at L3–L4. The patella is a sesamoid bone within the quadriceps tendon that improves the leverage of knee extension.',
    questions: [
      { q: 'Why is rectus femoris a weaker knee extensor when the hip is flexed?', a: 'Rectus femoris crosses both the hip and the knee. When the hip is already flexed the muscle is shortened (actively insufficient), so it can generate less force for knee extension. Conversely it extends the knee most effectively when the hip is extended — a two-joint muscle limitation the other three (single-joint) vasti do not share.' },
      { q: 'What does the patellar (knee-jerk) reflex test, and at what level?', a: 'Tapping the patellar ligament stretches the quadriceps, triggering reflex contraction and knee extension via the femoral nerve — testing the L3–L4 spinal segments. A diminished reflex suggests an L3/L4 or femoral nerve lesion; a brisk one suggests an upper motor neuron problem above that level.' }
    ]
  },
  {
    id: 'vastus_lateralis',
    name: 'Vastus Lateralis',
    region: 'Thigh — Anterior',
    description: 'The largest quadriceps component, forming the lateral bulk of the thigh — a common intramuscular injection site, especially in infants.',
    origin: 'Greater trochanter and lateral lip of the linea aspera of the femur',
    insertion: 'Base and lateral border of the patella, then via the patellar ligament to the tibial tuberosity',
    action: 'Extends the knee; its lateral pull is balanced by vastus medialis to keep the patella tracking centrally',
    nerve: 'Femoral nerve (L2, L3, L4)',
    artery: 'Lateral circumflex femoral artery',
    clinicalCorrelation: 'The vastus lateralis (mid-lateral thigh) is the recommended intramuscular injection site in infants, as it is a large muscle mass free of major nerves and vessels. An imbalance where vastus lateralis overpowers a weak vastus medialis can cause lateral patellar maltracking and anterior knee pain.',
    questions: [
      { q: 'Why is vastus lateralis the preferred IM injection site in infants?', a: 'It is a large, well-developed muscle on the mid-lateral thigh with no major nerves or vessels crossing it, unlike the gluteal region (sciatic nerve) which is also poorly developed in infants. This makes it a safe, high-volume site for infant vaccinations and injections.' },
      { q: 'How do vastus lateralis and vastus medialis together affect patellar tracking?', a: 'Vastus lateralis pulls the patella laterally; vastus medialis (especially its oblique fibres, VMO) pulls it medially. Balanced tension keeps the patella tracking centrally in the trochlear groove. If vastus medialis is weak/inhibited, the unopposed lateral pull causes patellar maltracking and anterior knee pain.' }
    ]
  },
  {
    id: 'vastus_medialis',
    name: 'Vastus Medialis',
    region: 'Thigh — Anterior',
    description: 'Forms the medial bulge just above the knee; its lowest oblique fibres (VMO) are crucial for the final degrees of knee extension and for patellar tracking.',
    origin: 'Intertrochanteric line and medial lip of the linea aspera of the femur',
    insertion: 'Base and medial border of the patella, then via the patellar ligament to the tibial tuberosity',
    action: 'Extends the knee; the oblique (VMO) fibres pull the patella medially to keep it centred and lock the knee in terminal extension',
    nerve: 'Femoral nerve (L2, L3, L4)',
    artery: 'Femoral artery / descending genicular artery',
    clinicalCorrelation: 'Vastus medialis (especially VMO) wastes early and visibly after knee injury or surgery, and its weakness is a classic contributor to patellofemoral pain from lateral patellar maltracking — hence it is a rehab target after knee problems.',
    questions: [
      { q: 'Why is vastus medialis a key rehabilitation target after knee injury?', a: 'It atrophies quickly and visibly after knee pathology, and its oblique fibres (VMO) are essential for keeping the patella tracking medially and completing terminal knee extension. Weakness leads to patellar maltracking and anterior knee pain, so strengthening it is central to knee rehab.' },
      { q: 'What role does vastus medialis play in "locking" the knee?', a: 'Its oblique fibres contribute to the final ~15° of knee extension and help stabilise the patella, working with the overall quadriceps to fully straighten and stabilise the knee. Weakness produces an "extension lag" — inability to complete the last few degrees of active extension.' }
    ]
  },
  {
    id: 'vastus_intermedius',
    name: 'Vastus Intermedius',
    region: 'Thigh — Anterior',
    description: 'The deepest quadriceps head, lying directly on the femur beneath rectus femoris. Its deepest fibres form the articularis genus, which retracts the knee-joint capsule.',
    origin: 'Anterior and lateral surfaces of the shaft of the femur',
    insertion: 'Base of the patella (deep to rectus femoris), then via the patellar ligament to the tibial tuberosity',
    action: 'Extends the knee (a pure single-joint knee extensor with the two vasti)',
    nerve: 'Femoral nerve (L2, L3, L4)',
    artery: 'Femoral artery (muscular branches)',
    clinicalCorrelation: 'Its deep fibres form articularis genus, which pulls the suprapatellar bursa/joint capsule proximally during extension to prevent it being pinched in the joint — a small but exam-worthy detail.',
    questions: [
      { q: 'What is articularis genus and what does it do?', a: 'Articularis genus is a small slip of the deepest fibres of vastus intermedius that inserts into the suprapatellar bursa and knee-joint capsule. During knee extension it pulls the capsule/bursa proximally, preventing it from being nipped between the patella and femur — protecting the joint capsule.' },
      { q: 'Why is vastus intermedius considered a "pure" knee extensor unlike rectus femoris?', a: 'It arises solely from the femoral shaft and crosses only the knee, so it extends the knee regardless of hip position. Rectus femoris, by contrast, also crosses the hip (arising from the ilium), so its knee-extension power varies with hip position — vastus intermedius has no such limitation.' }
    ]
  },

  // ==================== THIGH — MEDIAL (ADDUCTORS) ====================
  {
    id: 'adductor_longus',
    name: 'Adductor Longus',
    region: 'Thigh — Medial',
    description: 'The most anterior adductor and a key landmark — its medial border forms the medial boundary of the femoral triangle. Its palpable tendon is a common site of groin strain.',
    origin: 'Body of the pubis, just below the pubic crest',
    insertion: 'Middle third of the linea aspera of the femur',
    action: 'Adduction of the thigh at the hip; assists flexion',
    nerve: 'Obturator nerve (L2, L3, L4)',
    artery: 'Profunda femoris artery / obturator artery',
    clinicalCorrelation: 'Its tendinous origin is a frequent site of adductor (groin) strain in footballers and sprinters. Its medial border is the medial boundary of the femoral triangle, aiding orientation to the femoral vessels.',
    questions: [
      { q: 'Which nerve supplies most of the adductor group, and what would its injury cause?', a: 'The obturator nerve (L2–L4) supplies the adductor compartment (adductor longus, brevis, gracilis, and the adductor part of adductor magnus). Its injury weakens thigh adduction, so the leg tends to swing outward, and can cause sensory loss over the medial thigh — sometimes seen after pelvic surgery or difficult childbirth.' },
      { q: 'What is the role of adductor longus in the femoral triangle?', a: 'The medial border of adductor longus forms the medial boundary of the femoral triangle (with the inguinal ligament superiorly and sartorius laterally). This helps locate the femoral vessels and nerve within the triangle for pulse-taking or vascular access.' }
    ]
  },
  {
    id: 'adductor_magnus',
    name: 'Adductor Magnus',
    region: 'Thigh — Medial',
    description: 'The largest adductor, with a dual nature: an adductor part (obturator nerve) and a hamstring part (sciatic nerve). Its tendon forms the boundary of the adductor hiatus.',
    origin: 'Adductor part: ischiopubic ramus. Hamstring part: ischial tuberosity.',
    insertion: 'Adductor part: linea aspera and medial supracondylar line. Hamstring part: adductor tubercle of the femur.',
    action: 'Powerful adduction of the thigh; the adductor part also flexes, the hamstring part extends the hip',
    nerve: 'Adductor part: obturator nerve (L2–L4). Hamstring part: tibial division of the sciatic nerve (L4).',
    artery: 'Profunda femoris and obturator arteries',
    clinicalCorrelation: 'The gap between its aponeurotic insertion and the femur is the adductor hiatus, through which the femoral vessels pass from the adductor canal into the popliteal fossa (becoming the popliteal artery and vein).',
    questions: [
      { q: 'Why does adductor magnus have a dual nerve supply?', a: 'It is developmentally and functionally two muscles fused together: the *adductor* part (obturator nerve) adducts and flexes the hip like the other adductors, and the *hamstring* part (tibial division of the sciatic nerve) extends the hip like the hamstrings. This split explains its dual innervation and dual action.' },
      { q: 'What is the adductor hiatus and what passes through it?', a: 'The adductor hiatus is the gap between the aponeurotic (hamstring-part) insertion of adductor magnus and the femur. The femoral artery and vein pass through it from the adductor (subsartorial) canal in the thigh into the popliteal fossa, where they are renamed the popliteal artery and vein.' }
    ]
  },
  {
    id: 'gracilis',
    name: 'Gracilis',
    region: 'Thigh — Medial',
    description: 'The most superficial and medial adductor, and the only one crossing the knee — a thin strap often harvested as a tendon/muscle graft because it can be spared.',
    origin: 'Body and inferior ramus of the pubis',
    insertion: 'Superomedial surface of the tibia (as part of the pes anserinus)',
    action: 'Adduction of the hip and flexion of the knee; assists medial rotation of the flexed knee',
    nerve: 'Obturator nerve (L2, L3)',
    artery: 'Profunda femoris / obturator artery',
    clinicalCorrelation: 'Because it is functionally dispensable, gracilis is frequently harvested as a muscle or tendon graft — for tendon reconstruction (e.g. ACL), facial reanimation, or as a free/flap muscle transfer — with little functional loss.',
    questions: [
      { q: 'Which three muscles form the pes anserinus, and what do they share functionally?', a: 'Sartorius, gracilis and semitendinosus form the pes anserinus on the superomedial tibia. Despite different origins and nerves (femoral, obturator, and tibial respectively), all three cross the knee medially — they flex the knee and contribute to medial rotation/valgus stability of the knee.' },
      { q: 'Why is gracilis a favoured graft muscle?', a: 'It is a thin, long, superficial adductor whose loss barely affects hip adduction (the other, larger adductors compensate) or knee flexion. This "expendability," plus a reliable neurovascular pedicle, makes it ideal for tendon grafts (e.g. ACL reconstruction) and free muscle transfers such as facial reanimation.' }
    ]
  },
  {
    id: 'pectineus',
    name: 'Pectineus',
    region: 'Thigh — Medial',
    description: 'A flat quadrangular muscle bridging the anterior and medial compartments — it forms part of the floor of the femoral triangle and can be supplied by two nerves.',
    origin: 'Pecten pubis (pectineal line of the superior pubic ramus)',
    insertion: 'Pectineal line of the femur (below the lesser trochanter)',
    action: 'Adduction and flexion of the hip',
    nerve: 'Femoral nerve (L2, L3); sometimes also a branch of the obturator nerve',
    artery: 'Medial circumflex femoral / obturator artery',
    clinicalCorrelation: 'Sitting at the junction of the flexor and adductor compartments, pectineus (with iliopsoas) forms the floor of the femoral triangle, over which the femoral vessels lie — relevant when accessing the femoral artery/vein.',
    questions: [
      { q: 'Why can pectineus have a dual nerve supply?', a: 'It straddles the boundary between the anterior (flexor, femoral nerve) and medial (adductor, obturator nerve) compartments. Reflecting this transitional position, it is usually supplied by the femoral nerve but may also receive a branch from the obturator nerve — a classic example of a muscle at a compartment border.' },
      { q: 'What forms the floor of the femoral triangle?', a: 'The floor is formed by iliopsoas laterally and pectineus medially (with a small contribution from adductor longus). The femoral nerve, artery and vein lie on this muscular floor, which is why identifying pectineus and iliopsoas helps orient to the femoral neurovascular bundle.' }
    ]
  },

  // ==================== THIGH — POSTERIOR (HAMSTRINGS) ====================
  {
    id: 'biceps_femoris',
    name: 'Biceps Femoris',
    region: 'Thigh — Posterior',
    description: 'The lateral hamstring, with two heads — the only hamstring inserting laterally (on the fibular head) and the one forming the lateral border of the popliteal fossa.',
    origin: 'Long head: ischial tuberosity. Short head: linea aspera and lateral supracondylar line of the femur.',
    insertion: 'Head of the fibula',
    action: 'Flexion of the knee and, via the long head, extension of the hip; laterally rotates the flexed knee',
    nerve: 'Long head: tibial division of the sciatic nerve. Short head: common fibular division of the sciatic nerve (L5, S1, S2).',
    artery: 'Perforating branches of the profunda femoris artery',
    clinicalCorrelation: 'Its tendon forms the superolateral border of the popliteal fossa and is a landmark for the common fibular (peroneal) nerve, which runs along it around the fibular neck — a superficial site where the nerve is easily injured, causing foot drop.',
    questions: [
      { q: 'Why does biceps femoris have a split (dual) nerve supply?', a: 'Its long head is supplied by the tibial division of the sciatic nerve and its short head by the common fibular division. This is a classic exam point: the short head is the only hamstring supplied by the common fibular division, so isolated common fibular lesions can affect it while sparing the other hamstrings.' },
      { q: 'How does biceps femoris relate to the common fibular nerve clinically?', a: 'The biceps femoris tendon forms the superolateral boundary of the popliteal fossa, and the common fibular nerve runs along its medial side toward the fibular neck. There the nerve is superficial and easily damaged (fractures, tight casts, crossing legs), producing foot drop and loss of eversion.' }
    ]
  },
  {
    id: 'semitendinosus',
    name: 'Semitendinosus',
    region: 'Thigh — Posterior',
    description: 'A medial hamstring with a long, cord-like distal tendon (hence the name) that contributes to the pes anserinus — commonly harvested for ACL reconstruction.',
    origin: 'Ischial tuberosity',
    insertion: 'Superomedial surface of the tibia (as part of the pes anserinus)',
    action: 'Flexion of the knee and extension of the hip; medially rotates the flexed knee',
    nerve: 'Tibial division of the sciatic nerve (L5, S1, S2)',
    artery: 'Perforating branches of the profunda femoris artery',
    clinicalCorrelation: 'Its long tendon (with gracilis) is a favoured autograft for anterior cruciate ligament reconstruction, chosen because it is strong, accessible, and its loss is well tolerated.',
    questions: [
      { q: 'Which hamstring tendons are commonly used for ACL reconstruction and why?', a: 'The semitendinosus tendon, often together with gracilis, is a standard hamstring autograft for ACL reconstruction. Both have long, strong tendons that are easily harvested and whose loss is well tolerated because other knee flexors compensate — an alternative to a patellar-tendon graft.' },
      { q: 'How do the medial hamstrings differ from biceps femoris in their rotation of the flexed knee?', a: 'Semitendinosus and semimembranosus (medial hamstrings) *medially* rotate the flexed knee, whereas biceps femoris (lateral hamstring) *laterally* rotates it. This opposing rotation lets the hamstrings fine-tune knee rotation, and is a common comparison point in exams.' }
    ]
  },
  {
    id: 'semimembranosus',
    name: 'Semimembranosus',
    region: 'Thigh — Posterior',
    description: 'The deep medial hamstring, named for its broad membranous proximal tendon — it forms part of the superomedial border of the popliteal fossa and reinforces the knee.',
    origin: 'Ischial tuberosity',
    insertion: 'Medial condyle of the tibia (posterior surface)',
    action: 'Flexion of the knee and extension of the hip; medially rotates the flexed knee; expansions reinforce the posteromedial knee capsule',
    nerve: 'Tibial division of the sciatic nerve (L5, S1, S2)',
    artery: 'Perforating branches of the profunda femoris artery',
    clinicalCorrelation: 'Expansions from its tendon form the oblique popliteal ligament, reinforcing the posterior knee capsule; a Baker\'s (popliteal) cyst characteristically arises from the semimembranosus/gastrocnemius bursa in the popliteal fossa.',
    questions: [
      { q: 'What are the three "true" hamstrings and what defining features do they share?', a: 'Biceps femoris (long head), semitendinosus and semimembranosus. They share three features: origin from the ischial tuberosity, supply by the tibial division of the sciatic nerve, and a dual action — extending the hip and flexing the knee (crossing both joints). The short head of biceps femoris and the hamstring part of adductor magnus are "incomplete" hamstrings.' },
      { q: 'How does semimembranosus contribute to knee stability?', a: 'Beyond flexing the knee, expansions from its tendon form the oblique popliteal ligament, which reinforces the posteromedial joint capsule and resists hyperextension. This structural role is why posteromedial knee stability and popliteal-fossa pathology (e.g. Baker\'s cyst) involve semimembranosus.' }
    ]
  },

  // ==================== LEG — ANTERIOR (deep fibular nerve) ====================
  {
    id: 'tibialis_anterior',
    name: 'Tibialis Anterior',
    region: 'Leg — Anterior',
    description: 'The main dorsiflexor of the ankle and the muscle whose failure produces foot drop — its tendon is the most prominent on the front of the ankle.',
    origin: 'Lateral surface of the tibia and the interosseous membrane',
    insertion: 'Medial cuneiform and base of the 1st metatarsal',
    action: 'Dorsiflexion of the ankle and inversion of the foot; supports the medial longitudinal arch and clears the foot during the swing phase of gait',
    nerve: 'Deep fibular (peroneal) nerve (L4, L5)',
    artery: 'Anterior tibial artery',
    clinicalCorrelation: 'Weakness (deep fibular nerve or L4/L5 lesion) causes foot drop — the foot cannot be dorsiflexed, so the patient develops a high-stepping (steppage) gait to avoid dragging the toes. The common fibular nerve at the fibular neck is the classic injury site.',
    questions: [
      { q: 'What is foot drop and which muscle/nerve failure causes it?', a: 'Foot drop is the inability to dorsiflex the ankle, so the foot hangs and the toes drag. It results from weakness of tibialis anterior (with the other anterior-compartment muscles), usually from a common or deep fibular nerve lesion — classically at the fibular neck. The patient compensates with a high-stepping (steppage) gait.' },
      { q: 'Why does tibialis anterior both dorsiflex and invert the foot?', a: 'Its tendon crosses the front of the ankle and continues to the medial side of the foot (medial cuneiform/1st metatarsal). Pulling from that medial insertion lifts the foot up (dorsiflexion) and tilts the sole inward (inversion) at the same time.' }
    ]
  },
  {
    id: 'extensor_hallucis_longus',
    name: 'Extensor Hallucis Longus',
    region: 'Leg — Anterior',
    description: 'Deep anterior-compartment muscle that extends the big toe — its function is a key clinical test of the L5 nerve root.',
    origin: 'Middle of the anterior surface of the fibula and the interosseous membrane',
    insertion: 'Base of the distal phalanx of the great toe (hallux)',
    action: 'Extends the great toe; assists dorsiflexion of the ankle and inversion',
    nerve: 'Deep fibular (peroneal) nerve (L5, S1)',
    artery: 'Anterior tibial artery',
    clinicalCorrelation: 'Strength of great-toe extension is the classic bedside test of the L5 myotome — weakness suggests an L5 radiculopathy (e.g. from an L4/L5 disc prolapse) or a deep fibular nerve lesion.',
    questions: [
      { q: 'Why is testing great-toe extension useful in a patient with back pain and sciatica?', a: 'Extension of the great toe is powered by extensor hallucis longus, whose main root value is L5. Weakness of great-toe extension is a sensitive sign of an L5 radiculopathy — commonly from an L4/L5 disc prolapse compressing the L5 root — helping localise the level of a nerve-root lesion.' },
      { q: 'Where does the deep fibular nerve run, and what does it supply?', a: 'The deep fibular nerve runs in the anterior compartment of the leg with the anterior tibial vessels, supplying tibialis anterior, extensor hallucis longus, extensor digitorum longus and fibularis tertius (the dorsiflexors/toe extensors), then a small area of skin in the first web space. Its injury contributes to foot drop.' }
    ]
  },
  {
    id: 'extensor_digitorum_longus',
    name: 'Extensor Digitorum Longus',
    region: 'Leg — Anterior',
    description: 'Anterior-compartment muscle that extends the lateral four toes and helps dorsiflex the ankle.',
    origin: 'Lateral condyle of the tibia and the anterior surface of the fibula',
    insertion: 'Middle and distal phalanges of the lateral four toes (via dorsal digital expansions)',
    action: 'Extends the lateral four toes; assists dorsiflexion of the ankle',
    nerve: 'Deep fibular (peroneal) nerve (L5, S1)',
    artery: 'Anterior tibial artery',
    clinicalCorrelation: 'One of the dorsiflexors lost in a common fibular nerve lesion (foot drop). Its tendons are visible fanning across the dorsum of the foot when the toes are extended.',
    questions: [
      { q: 'Which muscles make up the anterior compartment of the leg, and what do they share?', a: 'Tibialis anterior, extensor hallucis longus, extensor digitorum longus and fibularis tertius. All are supplied by the deep fibular nerve and are dorsiflexors of the ankle (plus toe extension), so a deep/common fibular nerve lesion knocks them all out — producing foot drop.' },
      { q: 'How does extensor digitorum longus act on the toes despite inserting via expansions?', a: 'Its four tendons blend into the dorsal digital (extensor) expansions of the lateral four toes, transmitting force to the middle and distal phalanges. This lets it extend the toes at the interphalangeal and metatarsophalangeal joints, working with the lumbricals and interossei of the foot.' }
    ]
  },
  {
    id: 'fibularis_tertius',
    name: 'Fibularis Tertius',
    region: 'Leg — Anterior',
    description: 'A small, often-present partial slip of extensor digitorum longus — an anterior-compartment muscle (despite the "fibularis" name) that aids dorsiflexion and eversion.',
    origin: 'Distal anterior surface of the fibula',
    insertion: 'Base of the 5th metatarsal',
    action: 'Dorsiflexion of the ankle and eversion of the foot',
    nerve: 'Deep fibular (peroneal) nerve (L5, S1)',
    artery: 'Anterior tibial artery',
    clinicalCorrelation: 'Unlike the other "fibularis" muscles (which are lateral compartment, evertors, superficial fibular nerve), fibularis tertius is an anterior-compartment dorsiflexor supplied by the deep fibular nerve — a common exam trap.',
    questions: [
      { q: 'Why is fibularis tertius a classic exam trap among the "fibularis" muscles?', a: 'Despite its name, fibularis tertius is in the *anterior* compartment, supplied by the *deep* fibular nerve, and it dorsiflexes (as well as everts). Fibularis longus and brevis are *lateral* compartment, supplied by the *superficial* fibular nerve, and they plantarflex-evert. Same name root, different compartment/nerve/action.' },
      { q: 'What is the functional significance of fibularis tertius being variable/absent?', a: 'It is essentially a detached distal part of extensor digitorum longus and is absent in a minority of people with no deficit, because the other anterior-compartment muscles and the lateral evertors cover its actions. Its presence/absence is a normal anatomical variant.' }
    ]
  },

  // ==================== LEG — LATERAL (superficial fibular nerve) ====================
  {
    id: 'fibularis_longus',
    name: 'Fibularis Longus',
    region: 'Leg — Lateral',
    description: 'The superficial lateral-compartment evertor whose long tendon crosses the sole of the foot — key to eversion and to supporting both foot arches.',
    origin: 'Head and upper lateral surface of the fibula',
    insertion: 'Medial cuneiform and base of the 1st metatarsal (after crossing the sole of the foot)',
    action: 'Eversion and plantarflexion of the foot; supports the lateral and transverse arches of the foot',
    nerve: 'Superficial fibular (peroneal) nerve (L5, S1, S2)',
    artery: 'Fibular (peroneal) artery',
    clinicalCorrelation: 'Its tendon hooks behind the lateral malleolus then crosses the sole to the medial side, so it supports the arches; the superficial fibular nerve winds around the fibular neck and can be injured there, weakening eversion and predisposing to ankle inversion sprains.',
    questions: [
      { q: 'Why does the fibularis longus tendon travel all the way across the sole of the foot?', a: 'It passes behind the lateral malleolus, crosses the sole obliquely, and inserts on the medial cuneiform and 1st metatarsal on the *medial* side. This unusual course lets it evert and plantarflex the foot and act like a sling supporting the transverse and lateral longitudinal arches.' },
      { q: 'What is the effect of a superficial fibular nerve lesion?', a: 'It weakens eversion (fibularis longus and brevis), so the foot tends to be held inverted, predisposing to inversion ankle sprains. There is also sensory loss over most of the dorsum of the foot. Unlike a deep fibular lesion, dorsiflexion is largely preserved.' }
    ]
  },
  {
    id: 'fibularis_brevis',
    name: 'Fibularis Brevis',
    region: 'Leg — Lateral',
    description: 'The deeper, shorter lateral-compartment evertor — its insertion on the 5th metatarsal base is a common site of avulsion fracture in inversion injuries.',
    origin: 'Lower lateral surface of the fibula',
    insertion: 'Tuberosity at the base of the 5th metatarsal',
    action: 'Eversion and plantarflexion of the foot',
    nerve: 'Superficial fibular (peroneal) nerve (L5, S1, S2)',
    artery: 'Fibular (peroneal) artery',
    clinicalCorrelation: 'A forceful inversion injury can avulse the fibularis brevis insertion, producing a 5th metatarsal base avulsion fracture — a common finding on ankle X-rays taken for a "sprain," and distinct from the shaft (Jones) fracture.',
    questions: [
      { q: 'Why can an ankle inversion injury cause a 5th metatarsal base fracture?', a: 'Fibularis brevis inserts on the tuberosity at the base of the 5th metatarsal. During a sudden forceful inversion, the muscle contracts to resist it and can avulse a fragment of bone from its insertion — an avulsion fracture of the 5th metatarsal base, commonly mistaken for a simple sprain.' },
      { q: 'How do the two lateral-compartment muscles differ in their tendon path and insertion?', a: 'Both pass behind the lateral malleolus, but fibularis brevis is shorter and inserts nearby on the 5th metatarsal base, while fibularis longus continues across the sole to the medial cuneiform/1st metatarsal. Both evert and plantarflex, but only longus significantly supports the arches.' }
    ]
  },

  // ==================== LEG — POSTERIOR (tibial nerve) ====================
  {
    id: 'gastrocnemius',
    name: 'Gastrocnemius',
    region: 'Leg — Posterior',
    description: 'The two-headed superficial calf muscle that gives the calf its shape — a powerful plantarflexor that also crosses the knee, so it works best with the knee extended.',
    origin: 'Medial and lateral heads from the corresponding condyles of the femur',
    insertion: 'Posterior surface of the calcaneus via the calcaneal (Achilles) tendon',
    action: 'Plantarflexion of the ankle (strongest with the knee straight) and flexion of the knee; the main propulsive muscle in walking, running and jumping',
    nerve: 'Tibial nerve (S1, S2)',
    artery: 'Sural arteries (from the popliteal artery)',
    clinicalCorrelation: 'With soleus it forms the calf and the Achilles tendon; rupture of the Achilles causes sudden calf pain and a positive Thompson test (squeezing the calf fails to plantarflex the foot). Because gastrocnemius crosses the knee, its power drops when the knee is flexed.',
    questions: [
      { q: 'Why is gastrocnemius a weaker plantarflexor when the knee is bent?', a: 'It crosses both the knee and the ankle, arising from the femoral condyles. When the knee is flexed the muscle is shortened (actively insufficient) and generates less plantarflexion force — which is why calf-raise strength is tested with the knee straight, and why soleus (which does not cross the knee) dominates plantarflexion in the seated position.' },
      { q: 'What is the Thompson test and what does it detect?', a: 'With the patient prone and knee flexed, the examiner squeezes the calf. Normally this plantarflexes the foot via the intact gastrocnemius–soleus–Achilles unit. If the Achilles tendon is ruptured, squeezing produces no plantarflexion — a positive Thompson test — confirming the rupture.' }
    ]
  },
  {
    id: 'soleus',
    name: 'Soleus',
    region: 'Leg — Posterior',
    description: 'The broad, flat muscle deep to gastrocnemius — a postural plantarflexor and the main venous "peripheral heart" pumping blood back up the leg.',
    origin: 'Soleal line of the tibia and the posterior surface of the fibular head/upper fibula',
    insertion: 'Posterior surface of the calcaneus via the calcaneal (Achilles) tendon',
    action: 'Plantarflexion of the ankle (works at any knee position); a key postural muscle steadying the leg over the foot during standing',
    nerve: 'Tibial nerve (S1, S2)',
    artery: 'Posterior tibial and fibular arteries',
    clinicalCorrelation: 'Its rhythmic contraction (the "soleal/calf pump") drives venous return; immobility removes this pump and predisposes to deep vein thrombosis. Because it does not cross the knee, it plantarflexes even when the knee is flexed.',
    questions: [
      { q: 'Why is soleus called the "peripheral heart," and what happens when it stops working?', a: 'Its rhythmic contractions compress the deep leg veins, pumping blood upward against gravity (the calf/soleal pump) and aiding venous return. With immobility (long flights, bed rest) this pump fails, blood stagnates in the deep veins, and the risk of deep vein thrombosis rises.' },
      { q: 'How can you clinically distinguish soleus from gastrocnemius function?', a: 'Test plantarflexion with the knee *flexed* (e.g. seated calf raise). This slackens the two-joint gastrocnemius, so soleus — which does not cross the knee — is isolated. Strong plantarflexion with the knee bent indicates intact soleus even if gastrocnemius is compromised.' }
    ]
  },
  {
    id: 'plantaris',
    name: 'Plantaris',
    region: 'Leg — Posterior',
    description: 'A small vestigial muscle with a tiny belly and a very long thin tendon — often mistaken for a nerve during surgery and a favourite tendon graft.',
    origin: 'Lateral supracondylar line of the femur (above the lateral head of gastrocnemius)',
    insertion: 'Posterior surface of the calcaneus (medial to the Achilles tendon)',
    action: 'Weakly assists plantarflexion of the ankle and flexion of the knee',
    nerve: 'Tibial nerve (S1, S2)',
    artery: 'Sural arteries',
    clinicalCorrelation: 'Its long thin tendon is commonly harvested as a graft, and its rupture (or that of the medial gastrocnemius) causes "tennis leg" — sudden sharp calf pain during push-off. Absent in a notable minority with no deficit.',
    questions: [
      { q: 'Why is plantaris clinically useful despite being functionally trivial?', a: 'Its long, thin, mostly tendinous form makes it an ideal expendable graft for tendon reconstruction (e.g. hand tendons). Surgeons also note it can be mistaken for a nerve. Functionally it contributes almost nothing to plantarflexion, so harvesting or losing it causes no deficit.' },
      { q: 'What is "tennis leg"?', a: 'A sudden painful tear during forceful push-off (ankle dorsiflexed, knee extended), classically attributed to plantaris rupture but more often involving the medial head of gastrocnemius. It presents as an acute sharp pain in the calf, sometimes with a pop, bruising and difficulty weight-bearing.' }
    ]
  },
  {
    id: 'popliteus',
    name: 'Popliteus',
    region: 'Leg — Posterior',
    description: 'A small deep muscle forming the floor of the popliteal fossa that "unlocks" the fully extended knee to allow flexion to begin.',
    origin: 'Lateral condyle of the femur and the lateral meniscus',
    insertion: 'Posterior surface of the tibia, above the soleal line',
    action: 'Unlocks the extended knee by laterally rotating the femur on the fixed tibia (or medially rotating the tibia on the femur); weak knee flexion',
    nerve: 'Tibial nerve (L4, L5, S1)',
    artery: 'Popliteal artery (muscular branches)',
    clinicalCorrelation: 'When the knee is fully extended it is "screwed home" (locked) for stability; popliteus rotates the joint to release this lock so flexion can start. It also retracts the lateral meniscus during flexion, protecting it from being crushed.',
    questions: [
      { q: 'What does it mean that popliteus "unlocks" the knee?', a: 'In full extension the knee rotates slightly into a close-packed, locked position ("screw-home mechanism") for stable standing. To begin flexion, popliteus laterally rotates the femur on the fixed tibia (or medially rotates the tibia), releasing the lock so the other flexors can bend the knee.' },
      { q: 'How does popliteus protect the lateral meniscus?', a: 'It has an attachment to the lateral meniscus, and during knee flexion it pulls the meniscus posteriorly out of the way of the advancing femoral condyle — preventing the meniscus from being trapped and crushed within the joint.' }
    ]
  },
  {
    id: 'tibialis_posterior',
    name: 'Tibialis Posterior',
    region: 'Leg — Posterior',
    description: 'The deepest, most central posterior-compartment muscle — the main invertor of the foot and the chief dynamic support of the medial longitudinal arch.',
    origin: 'Interosseous membrane and adjacent posterior surfaces of the tibia and fibula',
    insertion: 'Navicular tuberosity and spreading to several tarsals and metatarsal bases',
    action: 'Inversion and plantarflexion of the foot; the principal dynamic support of the medial longitudinal arch',
    nerve: 'Tibial nerve (L4, L5)',
    artery: 'Posterior tibial and fibular arteries',
    clinicalCorrelation: 'Tibialis posterior dysfunction (tendon degeneration/rupture) is the commonest cause of acquired adult flatfoot — the medial arch collapses, the heel drifts into valgus, and the patient cannot perform a single-leg heel raise.',
    questions: [
      { q: 'Why does tibialis posterior dysfunction cause acquired flatfoot?', a: 'Tibialis posterior is the main dynamic supporter of the medial longitudinal arch and the chief invertor. When its tendon degenerates or ruptures, the arch is no longer actively supported, so it collapses — producing acquired adult flatfoot with heel valgus, an inability to do a single-leg heel raise, and the "too many toes" sign.' },
      { q: 'How do tibialis anterior and tibialis posterior together control foot inversion?', a: 'Both invert the foot: tibialis anterior inverts while dorsiflexing (its tendon crosses the front-medial ankle), whereas tibialis posterior inverts while plantarflexing (behind the medial malleolus). Together they form an "inversion stirrup," and both help support the medial arch.' }
    ]
  },
  {
    id: 'flexor_digitorum_longus',
    name: 'Flexor Digitorum Longus',
    region: 'Leg — Posterior',
    description: 'Deep posterior-compartment muscle that flexes the lateral four toes and grips the ground during walking; its tendon passes behind the medial malleolus.',
    origin: 'Posterior surface of the tibia (below the soleal line)',
    insertion: 'Bases of the distal phalanges of the lateral four toes',
    action: 'Flexes the lateral four toes; assists plantarflexion and inversion; helps grip the ground and push off in gait',
    nerve: 'Tibial nerve (S2, S3)',
    artery: 'Posterior tibial artery',
    clinicalCorrelation: 'Its tendon passes behind the medial malleolus within the tarsal tunnel with tibialis posterior, flexor hallucis longus, the posterior tibial vessels and the tibial nerve — structures compressed in tarsal tunnel syndrome (mnemonic "Tom, Dick and a Very Nervous Harry").',
    questions: [
      { q: 'What structures pass through the tarsal tunnel, and in what order?', a: 'Behind the medial malleolus, from anterior to posterior: Tibialis posterior, flexor Digitorum longus, posterior tibial Artery, tibial Nerve, flexor Hallucis longus — mnemonic "Tom, Dick, And Very Nervous Harry." Compression here (tarsal tunnel syndrome) causes burning sole pain and tingling in the tibial nerve distribution.' },
      { q: 'How do the long toe flexors contribute to walking?', a: 'Flexor digitorum longus (lateral four toes) and flexor hallucis longus (great toe) flex the toes against the ground during the stance and push-off phases, giving grip and helping propel the body forward — especially important on uneven ground and during the toe-off phase of gait.' }
    ]
  },
  {
    id: 'flexor_hallucis_longus',
    name: 'Flexor Hallucis Longus',
    region: 'Leg — Posterior',
    description: 'The powerful deep flexor of the great toe — the "push-off" muscle of the foot, especially in walking, running and standing on tiptoe.',
    origin: 'Posterior surface of the fibula and the interosseous membrane',
    insertion: 'Base of the distal phalanx of the great toe (hallux)',
    action: 'Flexes the great toe; assists plantarflexion and supports the medial arch; provides the final push-off in gait',
    nerve: 'Tibial nerve (S2, S3)',
    artery: 'Fibular (peroneal) artery',
    clinicalCorrelation: 'It provides the propulsive "toe-off" in walking and running; its tendon runs behind the medial malleolus (the last structure in the tarsal tunnel) and can be a source of posterior ankle pain in dancers ("dancer\'s tendinitis") from repeated pointe work.',
    questions: [
      { q: 'Why is flexor hallucis longus especially important in push-off and in dancers?', a: 'It flexes the great toe, which bears much of the propulsive load during toe-off in walking, running and rising onto the toes. In ballet dancers, repeated forceful plantarflexion (pointe work) stresses its tendon behind the medial malleolus, causing FHL tendinitis ("dancer\'s tendinitis") and posteromedial ankle pain.' },
      { q: 'Which nerve supplies the deep posterior compartment of the leg, and what does its damage cause?', a: 'The tibial nerve supplies the deep (and superficial) posterior compartment — tibialis posterior, flexor digitorum longus, flexor hallucis longus (and gastrocnemius/soleus). Its damage weakens plantarflexion, inversion and toe flexion, and causes sensory loss over the sole (via its plantar branches).' }
    ]
  },

  // ==================== BACK — SUPERFICIAL (extrinsic; move the upper limb) ====================
  {
    id: 'trapezius',
    name: 'Trapezius',
    region: 'Back — Superficial',
    description: 'The large diamond-shaped muscle of the upper back — the odd one out among back muscles because it is supplied by a cranial nerve (the accessory nerve), not spinal nerves.',
    origin: 'External occipital protuberance, ligamentum nuchae, and the spinous processes of C7–T12',
    insertion: 'Lateral third of the clavicle, the acromion, and the spine of the scapula',
    action: 'Upper fibres elevate the scapula, middle fibres retract it, lower fibres depress it; together they rotate the scapula upward to raise the arm above the head',
    nerve: 'Accessory nerve (CN XI); proprioception via C3, C4',
    artery: 'Transverse cervical artery',
    clinicalCorrelation: 'The accessory nerve crosses the posterior triangle of the neck superficially and is easily injured during lymph node biopsy or surgery there, causing trapezius palsy: shoulder droop, difficulty raising the arm above the horizontal, and mild scapular winging.',
    questions: [
      { q: 'Why is trapezius unusual among the back muscles regarding its nerve supply?', a: 'It is supplied by the accessory nerve (cranial nerve XI), a cranial nerve, whereas the other intrinsic back muscles are supplied by posterior rami of spinal nerves and the other superficial ones by anterior rami. This reflects its developmental origin from the branchial (pharyngeal) arches rather than the trunk musculature.' },
      { q: 'How does accessory nerve injury in the posterior triangle present?', a: 'The accessory nerve runs superficially across the posterior triangle of the neck and is vulnerable during lymph-node biopsy or neck surgery. Its injury paralyses trapezius, causing a drooping shoulder, weakness and pain on abducting the arm above horizontal (loss of scapular upward rotation), and mild winging of the scapula.' }
    ]
  },
  {
    id: 'latissimus_dorsi',
    name: 'Latissimus Dorsi',
    region: 'Back — Superficial',
    description: 'The broad muscle of the lower back that sweeps up to the arm — the great adductor/extensor of the shoulder, active in pulling the body up or the arm down and back.',
    origin: 'Spinous processes of T7–L5, thoracolumbar fascia, iliac crest, and the lower 3–4 ribs',
    insertion: 'Floor of the intertubercular (bicipital) groove of the humerus',
    action: 'Extension, adduction and medial rotation of the arm at the shoulder; pulls the body up toward the arms (climbing) or the trunk forward in a pull-up',
    nerve: 'Thoracodorsal nerve (C6, C7, C8)',
    artery: 'Thoracodorsal artery',
    clinicalCorrelation: 'Nicknamed the "handcuff muscle" (it medially rotates and adducts the arm behind the back). With its reliable thoracodorsal neurovascular pedicle it is a workhorse flap for breast reconstruction and covering large soft-tissue defects.',
    questions: [
      { q: 'Why is latissimus dorsi a workhorse muscle for reconstructive surgery?', a: 'It is large, flat and expendable, with a single reliable neurovascular pedicle (the thoracodorsal nerve and vessels). This lets surgeons transfer it as a pedicled or free flap — classically for breast reconstruction after mastectomy or to cover large soft-tissue defects — without major functional loss.' },
      { q: 'What movements define latissimus dorsi, and why is it called the "handcuff muscle"?', a: 'It extends, adducts and medially rotates the arm at the shoulder. Combined, these movements place the hand behind the back in the small-of-the-back position — as when putting on handcuffs — hence the nickname. It is also key in pulling movements like climbing and swimming.' }
    ]
  },
  {
    id: 'levator_scapulae',
    name: 'Levator Scapulae',
    region: 'Back — Superficial',
    description: 'A strap running from the upper cervical vertebrae to the scapula — elevates the scapula and is a common source of neck/shoulder tension.',
    origin: 'Transverse processes of C1–C4',
    insertion: 'Medial (vertebral) border of the scapula, above the spine (superior angle)',
    action: 'Elevates the scapula and helps rotate it downward (tilting the glenoid inferiorly); with the scapula fixed, laterally flexes the neck',
    nerve: 'Dorsal scapular nerve (C5) and cervical nerves C3, C4',
    artery: 'Dorsal scapular / transverse cervical artery',
    clinicalCorrelation: 'A frequent site of myofascial neck-shoulder pain and stiffness (from posture/stress). Shares the dorsal scapular nerve with the rhomboids, so a dorsal scapular nerve lesion affects scapular elevation and retraction together.',
    questions: [
      { q: 'Which muscles share the dorsal scapular nerve, and what is their combined role?', a: 'Levator scapulae and the rhomboids (major and minor) are supplied by the dorsal scapular nerve (C5). Together they elevate and retract the scapula and rotate it downward — so a dorsal scapular nerve lesion weakens scapular elevation/retraction and can cause mild scapular winging.' },
      { q: 'How does levator scapulae act differently depending on what is fixed?', a: 'With the neck fixed it elevates the scapula (shrugging). With the scapula fixed (e.g. the shoulder braced) it laterally flexes the cervical spine to the same side. This "reversible origin/insertion" is a common theme for muscles spanning the neck and shoulder girdle.' }
    ]
  },
  {
    id: 'rhomboid_major',
    name: 'Rhomboid Major',
    region: 'Back — Superficial',
    description: 'The larger of the two rhomboids — retracts the scapula and, with rhomboid minor, holds it against the thoracic wall.',
    origin: 'Spinous processes of T2–T5',
    insertion: 'Medial (vertebral) border of the scapula, below the spine',
    action: 'Retracts (adducts) the scapula and rotates it downward; helps fix the scapula to the thoracic wall',
    nerve: 'Dorsal scapular nerve (C4, C5)',
    artery: 'Dorsal scapular artery',
    clinicalCorrelation: 'Rhomboid weakness (dorsal scapular nerve injury) lets the scapula drift laterally and produces a subtle medial winging — distinct from the more marked winging of serratus anterior (long thoracic nerve) palsy, which pushes the medial border out when pushing against a wall.',
    questions: [
      { q: 'How does rhomboid (dorsal scapular nerve) winging differ from serratus anterior (long thoracic nerve) winging?', a: 'Serratus anterior palsy (long thoracic nerve) causes prominent medial-border winging that worsens when pushing against a wall, because the muscle can no longer hold the scapula to the thorax during protraction. Rhomboid palsy (dorsal scapular nerve) causes milder winging with the scapula sitting slightly laterally, most evident with resisted retraction — the two are distinguished by which movement provokes the winging.' },
      { q: 'What is the combined function of the rhomboids?', a: 'Rhomboid major and minor retract (adduct) the scapula, pulling it toward the midline, and rotate it downward (tilting the glenoid inferiorly). They also brace the scapula against the thoracic wall so other muscles have a stable base — important in movements like rowing.' }
    ]
  },
  {
    id: 'rhomboid_minor',
    name: 'Rhomboid Minor',
    region: 'Back — Superficial',
    description: 'The smaller, more superior rhomboid, lying just above rhomboid major — same action, same nerve.',
    origin: 'Ligamentum nuchae and spinous processes of C7–T1',
    insertion: 'Medial (vertebral) border of the scapula, at the root of the spine of the scapula',
    action: 'Retracts (adducts) the scapula and rotates it downward; fixes the scapula to the thoracic wall',
    nerve: 'Dorsal scapular nerve (C4, C5)',
    artery: 'Dorsal scapular artery',
    clinicalCorrelation: 'Acts as a functional unit with rhomboid major; both are supplied by the dorsal scapular nerve, so they are affected together and produce the same subtle scapular winging when that nerve is injured.',
    questions: [
      { q: 'How is rhomboid minor distinguished anatomically from rhomboid major?', a: 'Rhomboid minor is smaller and lies just superior to rhomboid major. It arises higher (ligamentum nuchae and C7–T1 spinous processes) and inserts at the root of the scapular spine, whereas rhomboid major arises from T2–T5 and inserts along the medial border below the spine. Both have identical actions and nerve supply.' },
      { q: 'Why are the rhomboids and trapezius both important in "squaring the shoulders"?', a: 'The rhomboids and the middle fibres of trapezius both retract the scapula, pulling the shoulder blades toward the midline ("squaring the shoulders"). They work together, though the rhomboids also rotate the scapula downward while the trapezius rotates it upward — so posture and movement depend on their balance.' }
    ]
  },

  // ==================== BACK — DEEP (intrinsic; posterior rami) ====================
  {
    id: 'splenius_capitis',
    name: 'Splenius Capitis',
    region: 'Back — Deep',
    description: 'A spinotransversalis (superficial deep) muscle wrapping the back of the neck like a bandage — extends and rotates the head to the same side.',
    origin: 'Ligamentum nuchae and spinous processes of C7–T3/T4',
    insertion: 'Mastoid process of the temporal bone and the lateral part of the superior nuchal line of the occipital bone',
    action: 'Bilaterally extends the head and neck; unilaterally rotates and laterally flexes the head to the same (ipsilateral) side',
    nerve: 'Posterior rami of middle cervical spinal nerves',
    artery: 'Occipital / deep cervical artery',
    clinicalCorrelation: 'As an intrinsic back muscle it is supplied by posterior rami — the defining feature separating the true (deep) back muscles from the superficial migrated limb muscles. Involved in whiplash and cervical strain.',
    questions: [
      { q: 'What single feature defines the "true" (intrinsic) back muscles, and how does splenius capitis fit?', a: 'The intrinsic (deep) back muscles are all supplied by the posterior rami of spinal nerves — unlike the superficial back muscles (trapezius via CN XI; latissimus, rhomboids, levator scapulae via anterior rami) which are migrated limb muscles. Splenius capitis, supplied by posterior cervical rami, is a true intrinsic back muscle.' },
      { q: 'What is the action of splenius capitis acting on one side versus both?', a: 'Acting bilaterally, the two splenius capitis muscles extend the head and neck. Acting unilaterally, one rotates and laterally flexes the head toward the *same* side — a useful contrast with sternocleidomastoid, which rotates the head to the *opposite* side.' }
    ]
  },
  {
    id: 'erector_spinae',
    name: 'Erector Spinae',
    region: 'Back — Deep',
    description: 'The great extensor column of the back — three vertical muscle columns (iliocostalis, longissimus, spinalis, lateral→medial) running the length of the spine.',
    origin: 'Common tendon from the sacrum, iliac crest, and lumbar/sacral spinous processes',
    insertion: 'Ribs and the transverse and spinous processes of vertebrae, up to the skull (via its three columns spanning the whole vertebral column)',
    action: 'Bilaterally extends the vertebral column and head, and controls flexion eccentrically (bending forward); unilaterally laterally flexes the spine to the same side',
    nerve: 'Posterior rami of spinal nerves (segmentally)',
    artery: 'Posterior intercostal, lumbar and sacral arteries',
    clinicalCorrelation: 'It is the main antigravity extensor maintaining posture; sudden overload (lifting with a flexed spine) causes mechanical back strain. Remember the three columns lateral→medial as "I Love Spine" — Iliocostalis, Longissimus, Spinalis.',
    questions: [
      { q: 'Name the three columns of erector spinae from lateral to medial, and a memory aid.', a: 'From lateral to medial: Iliocostalis, Longissimus, Spinalis — mnemonic "I Love Spine." Iliocostalis attaches to the ribs (costal), longissimus is the long central column reaching the mastoid, and spinalis lies most medially near the spinous processes.' },
      { q: 'How does erector spinae act during bending forward and straightening up?', a: 'When you bend forward, erector spinae contracts eccentrically to control (pay out) the descent against gravity, then contracts concentrically to straighten the trunk back up. Lifting a heavy load with the spine flexed overloads it and is a common cause of acute mechanical low-back strain.' }
    ]
  },
  {
    id: 'semispinalis_capitis',
    name: 'Semispinalis Capitis',
    region: 'Back — Deep',
    description: 'A transversospinalis muscle forming much of the fleshy bulk at the back of the neck — a powerful head extensor.',
    origin: 'Transverse processes of C7–T6/T7',
    insertion: 'Between the superior and inferior nuchal lines of the occipital bone',
    action: 'Bilaterally extends the head and upper vertebral column (holding the head upright); helps rotate the head',
    nerve: 'Posterior rami of cervical spinal nerves',
    artery: 'Occipital / deep cervical artery',
    clinicalCorrelation: 'It forms much of the muscle mass felt at the back of the neck and is a strong head extensor important in maintaining the upright posture of the head; the greater occipital nerve pierces it, so its tension is implicated in some occipital (tension-type) headaches.',
    questions: [
      { q: 'Which nerve pierces semispinalis capitis, and why is that clinically relevant?', a: 'The greater occipital nerve (posterior ramus of C2) pierces semispinalis capitis on its way to the scalp. Tension or spasm of the muscle can compress/irritate the nerve, contributing to occipital neuralgia and some tension-type headaches felt at the back of the head.' },
      { q: 'What class of deep back muscle is semispinalis, and what is its general fibre direction?', a: 'It belongs to the transversospinales group, whose fibres run from transverse processes upward and medially to spinous processes (or the occiput). Semispinalis spans several segments (about 4–6), giving it a long lever for extending the head and neck, unlike the shorter multifidus and rotatores.' }
    ]
  },
  {
    id: 'multifidus',
    name: 'Multifidus',
    region: 'Back — Deep',
    description: 'The deep segmental stabiliser of the spine — short transversospinalis fibres spanning a few vertebrae, best developed in the lumbar region.',
    origin: 'Sacrum, ilium, and transverse processes of the vertebrae',
    insertion: 'Spinous processes of vertebrae 2–4 segments above the origin',
    action: 'Stabilises adjacent vertebrae during movement (segmental control); bilaterally extends and unilaterally rotates/side-bends the spine',
    nerve: 'Posterior rami of spinal nerves (segmentally)',
    artery: 'Segmental (lumbar, intercostal) arteries',
    clinicalCorrelation: 'Multifidus is a key dynamic stabiliser of the lumbar spine; it atrophies rapidly and selectively in chronic low back pain, which is why its retraining (core/segmental stabilisation exercise) is central to back rehabilitation.',
    questions: [
      { q: 'Why is multifidus a focus of low back pain rehabilitation?', a: 'Multifidus provides segmental stability to the lumbar vertebrae. In low back pain it undergoes rapid, selective atrophy and delayed activation, reducing spinal stability. Targeted retraining of multifidus (core/segmental stabilisation exercises) helps restore control and is a cornerstone of evidence-based back rehab.' },
      { q: 'How does multifidus differ from semispinalis within the transversospinales group?', a: 'Both run from transverse processes up to spinous processes, but multifidus spans only about 2–4 segments (short, deep, segmental control) and is thickest in the lumbar region, whereas semispinalis spans about 4–6 segments and is best developed in the thoracic/cervical region and head. Rotatores (the deepest) span just 1–2 segments.' }
    ]
  },

  // ==================== THORAX — PECTORAL ====================
  {
    id: 'pectoralis_major',
    name: 'Pectoralis Major',
    region: 'Thorax — Pectoral',
    description: 'Large fan-shaped muscle forming the anterior axillary fold — the powerful adductor and medial rotator of the arm, built from two heads with opposing roles in flexion.',
    origin: 'Clavicular head: medial half of the clavicle. Sternocostal head: sternum, costal cartilages 1–6, and the aponeurosis of external oblique.',
    insertion: 'Lateral lip of the intertubercular (bicipital) groove of the humerus',
    action: 'Adduction and medial rotation of the arm. The clavicular head flexes the already-flexed shoulder further; the sternocostal head extends the flexed shoulder back down (e.g. a climbing or rowing pull). With the arm fixed, both heads assist forced inspiration.',
    nerve: 'Lateral and medial pectoral nerves (C5–T1)',
    artery: 'Pectoral branch of the thoracoacromial artery',
    clinicalCorrelation: 'Poland syndrome is congenital absence/hypoplasia of the sternocostal head (sometimes the whole muscle), often with ipsilateral syndactyly — a classic embryology-anatomy exam link. Because the two heads oppose each other across the range of shoulder flexion, isolated testing (resisted horizontal adduction vs. a downward pulling motion) can distinguish weakness of one head from the other.',
    questions: [
      { q: 'Why does pectoralis major have two heads with seemingly opposite actions on shoulder flexion?', a: 'The clavicular head continues to flex an already-flexed shoulder (raising the arm further forward), while the sternocostal head extends the flexed shoulder back down toward the trunk (a pulling/climbing motion). Their different lines of pull relative to the joint axis at different degrees of flexion let the whole muscle contribute across the full range — flexing early, then extending later in the arc.' },
      { q: 'What is Poland syndrome?', a: 'A congenital unilateral absence or hypoplasia of pectoralis major (classically the sternocostal head), often with pectoralis minor involvement and ipsilateral syndactyly (webbed fingers) — a well-known anatomy-embryology exam link, presenting as chest wall asymmetry with a flattened/sunken appearance on the affected side.' }
    ]
  },
  {
    id: 'pectoralis_minor',
    name: 'Pectoralis Minor',
    region: 'Thorax — Pectoral',
    description: 'Small triangular muscle deep to pectoralis major — the key landmark dividing the axillary artery into three surgically-numbered parts.',
    origin: 'Ribs 3–5 (anterior surfaces, near the costal cartilages)',
    insertion: 'Coracoid process of the scapula',
    action: 'Depresses and protracts the scapula (draws it forward/downward); stabilises the scapula against the thoracic wall; assists forced inspiration when the scapula is fixed',
    nerve: 'Medial pectoral nerve (C8, T1)',
    artery: 'Pectoral branch of the thoracoacromial artery',
    clinicalCorrelation: 'Passes anterior to the axillary artery and divides it into three parts — 1st part proximal to the muscle, 2nd part directly posterior to it, 3rd part distal to it — a key landmark for describing the artery\'s branches and its relation to the brachial plexus cords, which surround the 2nd part.',
    questions: [
      { q: 'How does pectoralis minor define the three parts of the axillary artery?', a: 'The axillary artery is divided by its relation to pectoralis minor: the 1st part lies proximal (medial) to the muscle, the 2nd part lies directly posterior to it, and the 3rd part lies distal (lateral) to it. This numbering is used to describe branches and relations — notably, the cords of the brachial plexus surround the 2nd part, named for their relation to this same part of the artery.' },
      { q: 'What are pectoralis minor\'s actions on the scapula?', a: 'It depresses and protracts the scapula, and stabilises it against the thoracic wall — important in movements that push the scapula forward and down, such as reaching forward or a braced forward push, and it assists forced inspiration by helping fix/elevate the ribs when the scapula is stabilised.' }
    ]
  },
  {
    id: 'serratus_anterior',
    name: 'Serratus Anterior',
    region: 'Thorax — Pectoral',
    description: 'The "boxer\'s muscle," fanning out along the lateral chest wall — protracts the scapula and rotates it upward, essential for raising the arm overhead. Its paralysis produces the classic winged scapula.',
    origin: 'Outer surfaces of ribs 1–8/9, forming a serrated fan along the lateral chest wall',
    insertion: 'Anterior (costal) surface of the medial border of the scapula, along its whole length with the strongest pull at the inferior angle',
    action: 'Protracts the scapula, holding it flush against the thoracic wall during pushing movements, and rotates it upward — allowing full abduction of the arm above the head',
    nerve: 'Long thoracic nerve (C5, C6, C7)',
    artery: 'Lateral thoracic artery',
    clinicalCorrelation: 'The long thoracic nerve runs superficially on the lateral chest wall (on the muscle itself) and is vulnerable during axillary surgery (mastectomy, axillary node dissection) or blunt trauma. Its injury causes classic winged scapula — the medial border and inferior angle protrude posteriorly, worsened by pushing against a wall, with inability to fully raise the arm overhead.',
    questions: [
      { q: 'What is winged scapula and what test reveals it?', a: 'Winged scapula is posterior prominence of the medial border and inferior angle of the scapula, caused by serratus anterior weakness from long thoracic nerve injury. It is revealed or worsened by the wall push-up test — pushing outstretched arms against a wall — because a weak serratus can no longer hold the scapula flush against the thorax during protraction.' },
      { q: 'Why is the long thoracic nerve especially vulnerable in axillary surgery?', a: 'It runs superficially along the lateral chest wall directly on serratus anterior, within the surgical field of axillary lymph node dissection (e.g. for breast cancer staging/treatment). Its superficial course makes it easy to stretch or transect, a well-recognised complication that results in a winged scapula and weak overhead arm raise.' }
    ]
  },
  {
    id: 'subclavius',
    name: 'Subclavius',
    region: 'Thorax — Pectoral',
    description: 'A small muscle tucked beneath the clavicle — cushions the underlying subclavian vessels and steadies the sternoclavicular joint.',
    origin: 'Junction of the 1st rib and its costal cartilage',
    insertion: 'Inferior surface of the middle third of the clavicle',
    action: 'Depresses and stabilises the clavicle, anchoring it during upper limb movement, and steadies the sternoclavicular joint',
    nerve: 'Nerve to subclavius (C5, C6)',
    artery: 'Clavicular branch of the thoracoacromial artery',
    clinicalCorrelation: 'Its cushioning position between the clavicle and the subclavian vein is part of why direct vascular injury from a clavicle fracture is relatively uncommon, though not impossible in severe trauma. Its deep-to-clavicle location also makes it a soft-tissue landmark in central line placement (subclavian vein catheterisation).',
    questions: [
      { q: 'Why does subclavius matter clinically in clavicle fractures?', a: 'It sits directly between the clavicle and the underlying subclavian vessels, providing a cushioning layer that helps protect the subclavian vein from a fractured or displaced clavicle — part of why direct vascular injury is relatively uncommon in clavicle fractures despite the vein\'s close proximity, though it can still occur in severe trauma.' },
      { q: 'What is subclavius\'s main mechanical role?', a: 'It depresses and stabilises the clavicle at the sternoclavicular joint, acting like a small anchor/shock absorber that steadies the clavicle\'s lateral movement during arm and shoulder activity, helping resist dislocating forces at the SC joint.' }
    ]
  },

  // ==================== THORAX — WALL ====================
  {
    id: 'external_intercostals',
    name: 'External Intercostals',
    region: 'Thorax — Wall',
    description: 'The outermost of the three intercostal layers, fibres running obliquely down and medially ("hands in pockets") — the main muscle elevating the ribs in inspiration.',
    origin: 'Inferior border of the rib above (one muscle per intercostal space, 11 pairs total)',
    insertion: 'Superior border of the rib below',
    action: 'Elevates the ribs during inspiration, increasing the thoracic cavity\'s anteroposterior and transverse diameters',
    nerve: 'Intercostal nerves (anterior rami of T1–T11)',
    artery: 'Posterior and anterior intercostal arteries',
    clinicalCorrelation: 'Fibre direction — obliquely down and medial, "hands in pockets," opposite to the internal intercostals — is a classic anatomy exam differentiator. The intercostal neurovascular bundle runs just deep to the internal intercostals along the inferior rib margin, relevant to safe needle/chest-tube placement.',
    questions: [
      { q: 'How do you distinguish external from internal intercostal fibre direction?', a: 'External intercostal fibres run obliquely downward and medially from the rib above to the rib below — like hands in a front trouser pocket. Internal intercostal fibres run obliquely downward and laterally, roughly perpendicular to the external layer. This crossing pattern is a classic identification question.' },
      { q: 'What is the order of the intercostal neurovascular bundle, and where does it run?', a: 'From superior to inferior in the costal groove: Vein, Artery, Nerve (mnemonic "VAN," top to bottom), lying in the plane between the internal and innermost intercostal muscles, just below the inferior margin of the rib above. This is why chest drains/needles are inserted just above the lower rib of a space, avoiding the bundle running along the rib above.' }
    ]
  },
  {
    id: 'internal_intercostals',
    name: 'Internal Intercostals',
    region: 'Thorax — Wall',
    description: 'The middle intercostal layer, fibres running opposite to the external layer — assists forced expiration by depressing the ribs.',
    origin: 'Inferior border of the rib above, deep to the external intercostals',
    insertion: 'Superior border of the rib below',
    action: 'Depresses the ribs, assisting forced expiration (coughing, singing, blowing); the interchondral part between the costal cartilages may assist elevation instead',
    nerve: 'Intercostal nerves (anterior rami of T1–T11)',
    artery: 'Posterior and anterior intercostal arteries',
    clinicalCorrelation: 'Together with the innermost intercostals, forms the deeper plane containing the intercostal neurovascular bundle — relevant to safe needle or chest-tube placement, aimed just above the lower rib of a space to avoid the vessels/nerve running along the rib above.',
    questions: [
      { q: 'What is the main functional difference between external and internal intercostals?', a: 'External intercostals are primarily inspiratory, elevating the ribs and most active in quiet and forced inspiration. Internal intercostals are primarily expiratory, depressing the ribs and most active in forced expiration (coughing, blowing) — quiet expiration is largely passive elastic recoil, so the internal intercostals matter mainly when expiration is active/forceful.' },
      { q: 'Why is a chest tube or needle aimed just above the rib rather than below?', a: 'The intercostal neurovascular bundle runs in the costal groove along the inferior border of the rib above each space, protected there by the internal intercostal muscle. Aiming just above the lower rib of the space (i.e. the upper part of the intercostal space) avoids this bundle, reducing the risk of bleeding or nerve injury.' }
    ]
  },
  {
    id: 'diaphragm',
    name: 'Diaphragm',
    region: 'Thorax — Wall',
    description: 'The prime mover of respiration — a dome-shaped musculotendinous sheet separating the thoracic and abdominal cavities, pierced by three major structures at three different vertebral levels.',
    origin: 'Sternal part: xiphoid process. Costal part: costal cartilages/ribs 7–12. Lumbar part: right and left crura from the lumbar vertebrae (right crus L1–L3, left crus L1–L2), plus the medial and lateral arcuate ligaments.',
    insertion: 'Central tendon — a trefoil-shaped aponeurosis at the centre of the dome (the diaphragm is unusual in effectively inserting into itself)',
    action: 'Prime mover of quiet inspiration — contraction flattens the dome and draws the central tendon down, increasing thoracic volume and drawing air in; relaxation allows passive elastic recoil for expiration',
    nerve: 'Phrenic nerve (C3, C4, C5 — "C3, 4, 5 keeps the diaphragm alive")',
    artery: 'Musculophrenic and pericardiacophrenic arteries (from the internal thoracic artery), plus the inferior phrenic arteries (from the aorta)',
    clinicalCorrelation: 'Diaphragmatic paralysis (phrenic nerve injury, e.g. from a mediastinal tumour or cardiac surgery) causes paradoxical upward movement of the affected hemidiaphragm on inspiration, seen on a fluoroscopic "sniff test." Diaphragmatic irritation (subphrenic abscess, splenic injury) classically refers pain to the shoulder tip, because the central diaphragm and the C4 shoulder dermatome share the same spinal segments.',
    questions: [
      { q: 'Why does diaphragmatic irritation cause referred shoulder-tip pain?', a: 'The central diaphragm is supplied by the phrenic nerve (C3–C5), the same root values as the C4 dermatome over the shoulder tip. Irritation of the diaphragm — e.g. blood or pus collecting beneath it, as in a subphrenic abscess or splenic rupture — is referred to the shoulder because the sensory afferents converge on the same spinal cord segments as shoulder skin.' },
      { q: 'What three major structures pierce the diaphragm, and at what vertebral levels?', a: 'The inferior vena cava at T8 (through the central tendon), the oesophagus with the vagal trunks at T10 (through the muscular right crus), and the aorta with the thoracic duct and azygos vein at T12 (posterior to the diaphragm, between the crura, so technically passing behind rather than through it). Mnemonic: "I ate ten eggs at twelve" — IVC-T8, (o)Esophagus-T10, Aorta-T12.' }
    ]
  },

  // ==================== ABDOMEN — ANTEROLATERAL ====================
  {
    id: 'rectus_abdominis',
    name: 'Rectus Abdominis',
    region: 'Abdomen — Anterolateral',
    description: 'The paired vertical "six-pack" muscle running the length of the anterior abdominal wall, segmented by tendinous intersections and enclosed in the rectus sheath.',
    origin: 'Pubic crest and pubic symphysis',
    insertion: 'Xiphoid process and costal cartilages of ribs 5–7',
    action: 'Flexes the trunk (lumbar spine) and compresses the abdominal contents; helps stabilise the pelvis',
    nerve: 'Anterior rami of the thoracoabdominal nerves (T7–T11) and the subcostal nerve (T12)',
    artery: 'Superior epigastric artery (from the internal thoracic) and inferior epigastric artery (from the external iliac), anastomosing within the rectus sheath',
    clinicalCorrelation: 'The rectus sheath\'s composition changes at the arcuate line — below it, all three flat-muscle aponeuroses pass anterior to rectus abdominis, leaving only transversalis fascia posteriorly — a classic landmark for lower abdominal incisions, hernia repair, and laparoscopic port placement near the inferior epigastric vessels. Tendinous intersections firmly bind the muscle to the anterior sheath, so a rectus sheath haematoma (trauma or anticoagulation) stays well localised and can mimic an acute abdomen.',
    questions: [
      { q: 'What changes at the arcuate line, and why does it matter surgically?', a: 'Above the arcuate line, the rectus sheath has both anterior and posterior layers (from the split aponeuroses of external oblique, internal oblique and transversus abdominis). Below it, all three aponeuroses pass anterior to rectus abdominis, leaving only thin transversalis fascia posteriorly — relevant to the strength of lower abdominal incisions, hernia risk, and identifying the inferior epigastric vessels during laparoscopic port placement.' },
      { q: 'Why does a rectus sheath haematoma stay well localised rather than spreading freely?', a: 'The tendinous intersections firmly bind rectus abdominis to the anterior wall of its sheath at several points, compartmentalising any bleeding within the muscle/sheath. This is why a rectus sheath haematoma (from a tear or anticoagulant use) tends to present as a discrete, tender abdominal wall mass that can mimic appendicitis or other acute abdominal pathology depending on its location.' }
    ]
  },
  {
    id: 'external_oblique',
    name: 'External Oblique',
    region: 'Abdomen — Anterolateral',
    description: 'The largest and most superficial of the three flat abdominal muscles, fibres running "hands in pockets" — its aponeurosis folds to form the inguinal ligament.',
    origin: 'External surfaces of ribs 5–12',
    insertion: 'Linea alba, pubic tubercle, and the anterior half of the iliac crest; its inferior free edge folds back on itself to form the inguinal ligament',
    action: 'Bilaterally flexes the trunk and compresses the abdominal contents; unilaterally rotates the trunk to the opposite side and laterally flexes to the same side',
    nerve: 'Thoracoabdominal nerves (T7–T11) and the subcostal nerve (T12)',
    artery: 'Lower posterior intercostal and subcostal arteries',
    clinicalCorrelation: 'Its aponeurosis forms the anterior wall of the inguinal canal, and its folded inferior border forms the inguinal ligament — central to understanding inguinal hernias. The superficial inguinal ring, an opening in this aponeurosis just superior and medial to the pubic tubercle, is where an indirect inguinal hernia exits.',
    questions: [
      { q: 'How does external oblique contribute to the inguinal canal?', a: 'Its aponeurosis forms the anterior wall of the inguinal canal (reinforced laterally by muscle fibres), and its inferior free border rolls under to form the inguinal ligament (running from the ASIS to the pubic tubercle), which forms the floor of the canal. The superficial inguinal ring — an opening in this aponeurosis, superior and medial to the pubic tubercle — is where the canal\'s contents emerge.' },
      { q: 'Which side does external oblique rotate the trunk to when acting alone, and why is this often confused?', a: 'Unilateral contraction rotates the trunk to the OPPOSITE side — e.g. the right external oblique contracting rotates the trunk to the left. This is often confused with internal oblique, which rotates to the SAME side as the contracting muscle; the ipsilateral internal oblique and contralateral external oblique work together as a pair to rotate the trunk toward one side.' }
    ]
  },
  {
    id: 'internal_oblique',
    name: 'Internal Oblique',
    region: 'Abdomen — Anterolateral',
    description: 'The middle flat abdominal muscle, deep to external oblique with fibres running perpendicular to it — contributes to the conjoint tendon and the cremaster muscle.',
    origin: 'Thoracolumbar fascia, iliac crest, and the lateral two-thirds of the inguinal ligament',
    insertion: 'Ribs 10–12 and their costal cartilages, and the linea alba via the rectus sheath; its lowest fibres join transversus abdominis to form the conjoint tendon',
    action: 'Bilaterally flexes the trunk and compresses the abdominal contents; unilaterally rotates the trunk to the same side and laterally flexes to the same side',
    nerve: 'Thoracoabdominal nerves (T7–T11), subcostal nerve (T12), and the iliohypogastric and ilioinguinal nerves (L1)',
    artery: 'Lower posterior intercostal, subcostal, and deep circumflex iliac arteries',
    clinicalCorrelation: 'Its lowest fibres, fused with transversus abdominis, form the conjoint tendon, which reinforces the posterior wall of the inguinal canal medially and helps resist a direct inguinal hernia. Some fibres also form the cremaster muscle, which elevates the testis (the cremasteric reflex, L1/L2).',
    questions: [
      { q: 'What is the conjoint tendon, and what does it protect against?', a: 'The conjoint tendon is the fused inferior aponeurotic fibres of internal oblique and transversus abdominis, inserting on the pubic crest/pectineal line. It reinforces the posterior wall of the inguinal canal medially, helping resist a direct inguinal hernia, which pushes through the weakened area medial to the inferior epigastric vessels (Hesselbach\'s triangle).' },
      { q: 'What is the cremasteric reflex and its anatomical basis?', a: 'Stroking the medial thigh skin causes reflex elevation of the ipsilateral testis via the cremaster muscle, which derives from internal oblique fibres that followed the spermatic cord during testicular descent. The reflex arc uses the ilioinguinal nerve as the afferent limb and the genital branch of the genitofemoral nerve as the efferent limb, both L1/L2 — so an absent reflex can suggest a lesion at that level.' }
    ]
  },
  {
    id: 'transversus_abdominis',
    name: 'Transversus Abdominis',
    region: 'Abdomen — Anterolateral',
    description: 'The deepest flat abdominal muscle, with horizontally running fibres — the main muscular "corset" raising intra-abdominal pressure and providing core stability.',
    origin: 'Thoracolumbar fascia, iliac crest, lateral third of the inguinal ligament, and costal cartilages of ribs 7–12 (interdigitating with the diaphragm)',
    insertion: 'Linea alba (via the rectus sheath) and the pubic crest; its lowest fibres join internal oblique to form the conjoint tendon',
    action: 'Compresses the abdominal contents, raising intra-abdominal pressure, without significant trunk flexion or rotation; contributes to core/spinal stabilisation',
    nerve: 'Thoracoabdominal nerves (T7–T11), subcostal nerve (T12), and the iliohypogastric and ilioinguinal nerves (L1)',
    artery: 'Lower posterior intercostal, subcostal, and deep circumflex iliac arteries',
    clinicalCorrelation: 'Because its fibres run horizontally rather than obliquely, it contributes mainly to raising intra-abdominal pressure (Valsalva manoeuvre, forced expiration, defecation, childbirth) rather than trunk movement — making it a key target in "core" stability and low-back rehabilitation (transversus abdominis activation/"drawing-in" exercises).',
    questions: [
      { q: 'How does transversus abdominis differ functionally from the two obliques?', a: 'Its fibres run horizontally, so contraction produces almost no trunk flexion or rotation — unlike the obliques, whose oblique fibres do both. Its main role is raising intra-abdominal pressure (compression), important in forced expiration, coughing, defecation, childbirth, and spinal stabilisation, which is why it is specifically targeted in core-stability rehab.' },
      { q: 'What is the significance of transversus abdominis interdigitating with the diaphragm?', a: 'Both muscles share fibre attachment at the costal cartilages of ribs 7–12, reflecting their combined role in generating intra-abdominal and intrathoracic pressure changes together during forced respiratory manoeuvres like coughing, and in bracing the trunk during heavy lifting.' }
    ]
  },

  // ==================== ABDOMEN — POSTERIOR ====================
  {
    id: 'quadratus_lumborum',
    name: 'Quadratus Lumborum',
    region: 'Abdomen — Posterior',
    description: 'A quadrilateral posterior abdominal wall muscle — a key "hip-hiker" and lateral trunk stabiliser, and an important landmark of the posterior abdominal wall.',
    origin: 'Iliac crest and the iliolumbar ligament',
    insertion: '12th rib and the transverse processes of L1–L4',
    action: 'Laterally flexes the trunk to the same side ("hip-hiking" — elevating the ipsilateral hip during walking, or fixing the 12th rib during forced expiration); bilaterally extends the lumbar spine and fixes the 12th rib during deep inspiration',
    nerve: 'Anterior rami of T12 and L1–L4 (subcostal nerve and lumbar plexus branches)',
    artery: 'Subcostal and lumbar arteries',
    clinicalCorrelation: 'Forms part of the floor of the posterior abdominal wall, lying directly posterior to the kidney — relevant to the surgical loin/flank approach to the kidney, which passes near or through it. It is frequently tender or in spasm in mechanical low back pain, and its weakness can produce a pelvic drop on the swing leg reminiscent of (but distinct from) a Trendelenburg gait.',
    questions: [
      { q: 'What is quadratus lumborum\'s role in walking, and how does its weakness present?', a: 'It "hip-hikes" — elevating the ipsilateral hip/pelvis to help clear the swinging leg off the ground — and stabilises the lumbar spine laterally. Weakness can cause a pelvic drop on the swing side reminiscent of a Trendelenburg gait, though the underlying cause differs from gluteus medius weakness and is distinguished by testing each muscle directly.' },
      { q: 'Why is quadratus lumborum relevant to renal/flank surgery?', a: 'It lies in the posterior abdominal wall directly posterior to the kidney, forming part of the "bed" the kidney rests on. Flank/loin surgical approaches to the kidney (e.g. nephrectomy, pyeloplasty) pass near or through quadratus lumborum, making its anatomy relevant to surgical exposure and to interpreting flank pain from renal pathology.' }
    ]
  },
].map(m => ({ ...m, mesh3d: MESH_3D[m.id] || null }));
