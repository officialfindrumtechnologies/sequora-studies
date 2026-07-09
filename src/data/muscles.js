// Muscle reference data — Phase 1: Upper Limb (Shoulder, Arm, Forearm).
// Q&A are original practice questions, not claimed to be real past papers —
// swap in actual archived prof questions once sourced from a real paper.
//
// sketchfabId points to a real, verified, CC-BY-SA licensed, embeddable model:
// "Myology" by Z-Anatomy (open-source Human Anatomy Atlas, TA2-2019 standard).
// https://sketchfab.com/3d-models/myology-31b40fd809b14665b93773936d67c52c

export const MUSCLE_REGIONS = ['All', 'Shoulder', 'Arm', 'Forearm — Flexors', 'Forearm — Extensors'];

const MYOLOGY_ID = '31b40fd809b14665b93773936d67c52c';

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
].map(m => ({ ...m, sketchfabId: MYOLOGY_ID }));
