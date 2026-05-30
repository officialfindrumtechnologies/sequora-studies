import { createClient } from '@supabase/supabase-js';

/* ============ defensive storage (localStorage + memory fallback) ============ */
const MEM={};
let LS_OK=true;
try{const k="__t";localStorage.setItem(k,"1");localStorage.removeItem(k);}catch(e){LS_OK=false;}

/* ============ Supabase Sync Adapter ============ */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!supabase) {
  console.warn("[Supabase] Client NOT initialized. VITE_SUPABASE_URL:", supabaseUrl ? "set" : "MISSING", "VITE_SUPABASE_ANON_KEY:", supabaseAnonKey ? "set" : "MISSING");
} else {
  console.log("[Supabase] Client initialized for:", supabaseUrl);
}

let currentUser = null;
let isPulling = false;
let isPushing = false;
let pushPending = false;
let syncTimeout = null;

async function pushStateToSupabase() {
  if (!supabase || !currentUser) return;
  if (isPulling) {
    // Don't discard — queue push to run after pull completes
    pushPending = true;
    console.log("[Sync] Pull in progress, push queued");
    return;
  }
  if (isPushing) return;
  isPushing = true;

  const keys = ["ascent_topics", "ascent_sessions", "ascent_errors", "ascent_papers", "ascent_closeout", "ascent_exam"];
  const payload = {};
  keys.forEach(k => {
    const raw = Store.get(k);
    if (raw !== null) {
      try {
        payload[k] = JSON.parse(raw);
      } catch(e) {
        payload[k] = raw; // raw string like ascent_exam
      }
    }
  });

  try {
    const { error } = await supabase
      .from('study_state')
      .upsert({
        user_id: currentUser.id,
        data: payload,
        updated_at: new Date().toISOString()
      });

    if (error) console.error("[Sync] Push error:", error);
  } catch (err) {
    console.error("[Sync] Failed to push:", err);
  } finally {
    isPushing = false;
  }
}

function triggerSync() {
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(pushStateToSupabase, 1500); // 1.5s debounce
}

const Store={
  get(k){try{if(LS_OK)return localStorage.getItem(k);}catch(e){}return (k in MEM)?MEM[k]:null;},
  set(k,v){
    try{if(LS_OK){
      localStorage.setItem(k,v);
      if (currentUser) triggerSync();
      return;
    }}catch(e){}
    MEM[k]=v;
  },
  del(k){
    try{if(LS_OK){
      localStorage.removeItem(k);
      if (currentUser) triggerSync();
    }}catch(e){}
    delete MEM[k];
  }
};

function loadJSON(k,def){const r=Store.get(k);if(!r)return def;try{return JSON.parse(r);}catch(e){return def;}}
function saveJSON(k,v){Store.set(k,JSON.stringify(v));}

/* ============ subjects ============ */
const SUBJECTS=[
  {key:"maths",  name:"Maths B",   code:"4MB1", short:"Maths"},
  {key:"acc",    name:"Accounting",code:"4AC1", short:"Acct"},
  {key:"eco",    name:"Economics", code:"4EC1", short:"Econ"},
  {key:"bus",    name:"Business",  code:"4BS1", short:"Biz"},
  {key:"eng",    name:"English B", code:"4EB1", short:"Eng"},
  {key:"ban",    name:"Bangla",    code:"4BN1", short:"Bangla"},
];
const subjName=k=>(SUBJECTS.find(s=>s.key===k)||{}).name||k;

/* ---- Maths B: complete topics from official 4MB1 spec (learning order) ---- */
const MATHS_SEED=[
  ["Number 1","Working with fractions"],
  ["Number 1","Simplifying fractions"],
  ["Number 1","Multiplying fractions"],
  ["Number 1","Dividing fractions"],
  ["Number 1","Adding and subtracting fractions"],
  ["Number 1","Order of operations (BIDMAS)"],
  ["Number 1","Significant figures and decimal places"],
  ["Algebra 1","Simplifying algebraic expressions"],
  ["Algebra 1","Simplifying algebraic expressions with brackets"],
  ["Algebra 1","Expanding brackets"],
  ["Algebra 1","Solving equations"],
  ["Algebra 1","Equations with x on both sides"],
  ["Algebra 1","Negative signs outside brackets"],
  ["Algebra 1","Problems leading to equations"],
  ["Graphs 1","Gradient of a straight line"],
  ["Graphs 1","Plotting straight-line graphs"],
  ["Graphs 1","Real-life straight-line graphs"],
  ["Graphs 1","Graphs of ax+by=c"],
  ["Graphs 1","Straight-line conversion graphs"],
  ["Shape & Space 1","Triangles"],
  ["Shape & Space 1","Interior and exterior angles"],
  ["Shape & Space 1","Quadrilaterals"],
  ["Shape & Space 1","Interior angles"],
  ["Shape & Space 1","Exterior angles"],
  ["Shape & Space 1","Special quadrilaterals"],
  ["Shape & Space 1","Polygons"],
  ["Shape & Space 1","Dividing regular polygons"],
  ["Shape & Space 1","Constructions"],
  ["Shape & Space 1","Bearings and scale drawings"],
  ["Shape & Space 1","Constructing triangles"],
  ["Shape & Space 1","Perpendicular bisector"],
  ["Shape & Space 1","Angle bisector"],
  ["Shape & Space 1","Similar triangles"],
  ["Sets 1","Set notation"],
  ["Sets 1","Venn diagrams"],
  ["Sets 1","Intersection of sets"],
  ["Sets 1","Union of sets"],
  ["Number 2","Standard form"],
  ["Number 2","Standard form with positive indices"],
  ["Number 2","Standard form with negative indices"],
  ["Number 2","Percentages"],
  ["Number 2","x as a percentage of y"],
  ["Number 2","x percent of y"],
  ["Number 2","Percentage change"],
  ["Number 2","Percentage increase and decrease"],
  ["Algebra 2","Simplifying algebraic fractions"],
  ["Algebra 2","Multiplication and division"],
  ["Algebra 2","Addition and subtraction"],
  ["Algebra 2","Solving equations with roots and powers"],
  ["Algebra 2","Positive integer indices"],
  ["Algebra 2","Inequalities"],
  ["Algebra 2","Number lines"],
  ["Algebra 2","Solving linear inequalities"],
  ["Graphs 2","Straight-line graphs"],
  ["Graphs 2","Finding the equation of a straight-line graph"],
  ["Graphs 2","Sketching straight-line graphs"],
  ["Graphs 2","Simultaneous equations"],
  ["Shape & Space 2","Pythagoras' theorem"],
  ["Shape & Space 2","Circle theorems"],
  ["Shape & Space 2","Angles in a semicircle and tangents"],
  ["Shape & Space 2","Angle at centre is twice angle at circumference"],
  ["Handling Data 1","Types of data"],
  ["Handling Data 1","Statistical investigation and collecting data"],
  ["Handling Data 1","Presenting data"],
  ["Handling Data 1","Pictograms"],
  ["Handling Data 1","Pie charts"],
  ["Handling Data 1","Bar charts"],
  ["Handling Data 1","Two-way tables"],
  ["Handling Data 1","Comparative bar charts"],
  ["Handling Data 1","Misleading data presentation"],
  ["Handling Data 1","Averages for discrete data"],
  ["Handling Data 1","Comparing the mean, median and mode"],
  ["Handling Data 1","Shape of distributions"],
  ["Number 3","Prime factors"],
  ["Number 3","HCF and LCM"],
  ["Number 3","Ratio"],
  ["Algebra 3","Simple factorising"],
  ["Algebra 3","Simplifying fractions"],
  ["Algebra 3","Equations with fractions"],
  ["Algebra 3","Equations with numbers in the denominator"],
  ["Algebra 3","Equations with x in the denominator"],
  ["Algebra 3","Simultaneous equations"],
  ["Algebra 3","Substitution method"],
  ["Algebra 3","Elimination method"],
  ["Algebra 3","Solving problems using simultaneous equations"],
  ["Graphs 3","Distance-time graphs"],
  ["Graphs 3","Speed-time graphs"],
  ["Shape & Space 3","Tangent ratio"],
  ["Shape & Space 3","Calculating sides (tan)"],
  ["Shape & Space 3","Calculating angles (tan)"],
  ["Shape & Space 3","Mixed trigonometry questions"],
  ["Handling Data 2","Frequency tables"],
  ["Handling Data 2","Discrete data"],
  ["Handling Data 2","Continuous data"],
  ["Number 4","Compound percentages"],
  ["Number 4","Inverse percentages"],
  ["Algebra 4","Using formulae"],
  ["Algebra 4","Some commonly-used formulae"],
  ["Algebra 4","Change of subject"],
  ["Algebra 4","Subject occurs once"],
  ["Algebra 4","Power of subject or subject occurs twice"],
  ["Algebra 4","Further formulae"],
  ["Graphs 4","Quadratic graphs y = ax² + bx + c"],
  ["Graphs 4","Solution of 0 = ax² + bx + c"],
  ["Shape & Space 4","Sine and cosine ratios"],
  ["Shape & Space 4","Calculating sides (sin/cos)"],
  ["Shape & Space 4","Calculating angles (sin/cos)"],
  ["Handling Data 3","Measures of dispersion"],
  ["Handling Data 3","Quartiles"],
  ["Handling Data 3","Cumulative frequency"],
  ["Number 5","Calculators"],
  ["Number 5","Estimating"],
  ["Number 5","Estimating using standard form"],
  ["Number 5","Rounding, upper and lower bounds"],
  ["Algebra 5","Multiplying brackets"],
  ["Algebra 5","Two linear brackets"],
  ["Algebra 5","FOIL method"],
  ["Algebra 5","Three linear brackets"],
  ["Algebra 5","Factorising quadratic expressions"],
  ["Algebra 5","Factorising quadratics with two terms"],
  ["Algebra 5","Factorising quadratics with three terms"],
  ["Algebra 5","Solving quadratic equations by factorisation"],
  ["Algebra 5","Problems leading to quadratic equations"],
  ["Graphs 5","Representing inequalities graphically"],
  ["Graphs 5","Perpendicular lines"],
  ["Graphs 5","Mid-points"],
  ["Graphs 5","Using Pythagoras' theorem"],
  ["Shape & Space 5","Transformations"],
  ["Shape & Space 5","Translations"],
  ["Shape & Space 5","Reflections and rotations"],
  ["Shape & Space 5","Enlargements"],
  ["Shape & Space 5","Combined transformations"],
  ["Handling Data 4","Probability — single events"],
  ["Handling Data 4","Experimental probability"],
  ["Handling Data 4","Relative frequency"],
  ["Handling Data 4","Theoretical probability"],
  ["Handling Data 4","Expected frequency"],
  ["Handling Data 4","Sample space"],
];
/* ---- All subjects: complete topics from official Edexcel specs ---- */
const SEED={
  maths: MATHS_SEED,
  acc:[
    ["Unit 1 · Accounting Environment","Types of business organisation"],
    ["Unit 1 · Accounting Environment","Sole trader"],
    ["Unit 1 · Accounting Environment","Partnership"],
    ["Unit 1 · Accounting Environment","Private sector organisations"],
    ["Unit 1 · Accounting Environment","Public sector organisations"],
    ["Unit 1 · Accounting Environment","Introduction to technology in accounting"],
    ["Unit 1 · Accounting Environment","Functions of accounting software"],
    ["Unit 1 · Accounting Environment","Advantages and disadvantages of accounting software"],
    ["Unit 1 · Accounting Environment","Data loss"],
    ["Unit 1 · Accounting Environment","Security"],
    ["Unit 1 · Accounting Environment","Principles of professional ethics"],
    ["Unit 1 · Accounting Environment","Accounting roles and functions"],
    ["Unit 1 · Accounting Environment","Public interest"],
    ["Unit 1 · Accounting Environment","Introduction to accounting concepts"],
    ["Unit 2 · Bookkeeping","Introduction to business documentation"],
    ["Unit 2 · Bookkeeping","Purchase order"],
    ["Unit 2 · Bookkeeping","Invoice"],
    ["Unit 2 · Bookkeeping","Credit note"],
    ["Unit 2 · Bookkeeping","Statement of account"],
    ["Unit 2 · Bookkeeping","Remittance advice"],
    ["Unit 2 · Bookkeeping","Receipts"],
    ["Unit 2 · Bookkeeping","Books of original entry"],
    ["Unit 2 · Bookkeeping","The ledgers"],
    ["Unit 2 · Bookkeeping","Classification of accounts"],
    ["Unit 2 · Bookkeeping","Purchase invoices"],
    ["Unit 2 · Bookkeeping","Cash and credit revenue"],
    ["Unit 2 · Bookkeeping","Purchase returns (returns outwards)"],
    ["Unit 2 · Bookkeeping","Sales returns (returns inwards)"],
    ["Unit 2 · Bookkeeping","Sales returns and credit notes"],
    ["Unit 2 · Bookkeeping","Cash discounts"],
    ["Unit 2 · Bookkeeping","Bank overdrafts and the cash book"],
    ["Unit 2 · Bookkeeping","The journal"],
    ["Unit 2 · Bookkeeping","Writing up journal entries"],
    ["Unit 2 · Bookkeeping","Introduction to double entry system"],
    ["Unit 2 · Bookkeeping","The double entry system"],
    ["Unit 2 · Bookkeeping","Rules for double entry"],
    ["Unit 2 · Bookkeeping","The in and out approach"],
    ["Unit 2 · Bookkeeping","T accounts"],
    ["Unit 2 · Bookkeeping","Cash transactions"],
    ["Unit 2 · Bookkeeping","Introduction to credit transactions"],
    ["Unit 2 · Bookkeeping","Purchase of inventory on credit"],
    ["Unit 2 · Bookkeeping","Revenue of inventory on credit"],
    ["Unit 2 · Bookkeeping","Returns"],
    ["Unit 2 · Bookkeeping","Expenses on credit"],
    ["Unit 2 · Bookkeeping","Revenue and purchases"],
    ["Unit 2 · Bookkeeping","Comparison of cash and credit transactions"],
    ["Unit 2 · Bookkeeping","Balancing the accounts"],
    ["Unit 2 · Bookkeeping","Three-column accounts"],
    ["Unit 2 · Bookkeeping","Errors not revealed by double entry"],
    ["Unit 2 · Bookkeeping","Causes of depreciation"],
    ["Unit 2 · Bookkeeping","Methods of calculating depreciation"],
    ["Unit 2 · Bookkeeping","Recording depreciation"],
    ["Unit 2 · Bookkeeping","Disposal of a non-current asset"],
    ["Unit 3 · Control Processes","Balancing off"],
    ["Unit 3 · Control Processes","The trial balance"],
    ["Unit 3 · Control Processes","Steps if trial balance does not balance"],
    ["Unit 3 · Control Processes","Errors not revealed by trial balance"],
    ["Unit 3 · Control Processes","Errors not affecting trial balance agreement"],
    ["Unit 3 · Control Processes","Errors affecting trial balance agreement"],
    ["Unit 3 · Control Processes","The principle of control accounts"],
    ["Unit 3 · Control Processes","Trade receivables ledger control account"],
    ["Unit 3 · Control Processes","Information for control accounts"],
    ["Unit 3 · Control Processes","Other transfers"],
    ["Unit 3 · Control Processes","Control accounts and computerised systems"],
    ["Unit 3 · Control Processes","Advantages of control accounts"],
    ["Unit 3 · Control Processes","Disadvantages of control accounts"],
    ["Unit 3 · Control Processes","Introduction to recording transactions"],
    ["Unit 3 · Control Processes","Reasons for different balances"],
    ["Unit 3 · Control Processes","Updating the cash book before reconciliation"],
    ["Unit 3 · Control Processes","Bank overdrafts"],
    ["Unit 3 · Control Processes","Dishonoured cheques"],
    ["Unit 3 · Control Processes","Other reasons for balance differences"],
    ["Unit 4 · Financial Statements","Capital expenditure"],
    ["Unit 4 · Financial Statements","Revenue expenditure"],
    ["Unit 4 · Financial Statements","Difference between equity and revenue expenditure"],
    ["Unit 4 · Financial Statements","Incorrect treatment of expenditure"],
    ["Unit 4 · Financial Statements","Definition of accounting concepts"],
    ["Unit 4 · Financial Statements","Fundamental accounting concepts"],
    ["Unit 4 · Financial Statements","Introduction to the income statement"],
    ["Unit 4 · Financial Statements","Uses of the income statement"],
    ["Unit 4 · Financial Statements","Preparation of an income statement"],
    ["Unit 4 · Financial Statements","Statement of financial position — definition & content"],
    ["Unit 4 · Financial Statements","Statement of financial position — layout"],
    ["Unit 4 · Financial Statements","Adjustments for expenses owing and prepaid"],
    ["Unit 4 · Financial Statements","Other payables"],
    ["Unit 4 · Financial Statements","Other receivables"],
    ["Unit 4 · Financial Statements","Adjustment for inventory of stationery"],
    ["Unit 4 · Financial Statements","Revenue owing at end of period"],
    ["Unit 4 · Financial Statements","Expenses/revenue and the statement of financial position"],
    ["Unit 4 · Financial Statements","Worked example: sole trader financial statements"],
    ["Unit 4 · Financial Statements","Dealing with further adjustments"],
    ["Unit 4 · Financial Statements","Irrecoverable debts"],
    ["Unit 4 · Financial Statements","Allowance for irrecoverable debts"],
    ["Unit 4 · Financial Statements","Preparing statements from incomplete records"],
    ["Unit 4 · Financial Statements","Incomplete records and missing figures"],
    ["Unit 4 · Financial Statements","Profitability and liquidity"],
    ["Unit 4 · Financial Statements","Profitability ratios"],
    ["Unit 4 · Financial Statements","Liquidity ratios"],
    ["Unit 4 · Financial Statements","Definition of working capital"],
    ["Unit 4 · Financial Statements","Calculating ratios"],
    ["Unit 4 · Financial Statements","Limitations of ratios"],
    ["Unit 4 · Financial Statements","The need for partnerships"],
    ["Unit 4 · Financial Statements","Limited partners"],
    ["Unit 4 · Financial Statements","Nature of a partnership"],
    ["Unit 4 · Financial Statements","Where no partnership agreement exists"],
    ["Unit 4 · Financial Statements","Partnership financial statements"],
    ["Unit 4 · Financial Statements","Appropriation account"],
    ["Unit 4 · Financial Statements","Current accounts"],
    ["Unit 4 · Financial Statements","Direct and indirect costs"],
    ["Unit 4 · Financial Statements","Format of manufacturing financial statements"],
    ["Unit 4 · Financial Statements","Manufacturing account"],
  ],
  eco:[
    ["1.1 · The Market System","The economic problem"],
    ["1.1 · The Market System","Economic assumptions"],
    ["1.1 · The Market System","The demand curve"],
    ["1.1 · The Market System","Factors that may shift the demand curve"],
    ["1.1 · The Market System","The supply curve"],
    ["1.1 · The Market System","Factors that may shift the supply curve"],
    ["1.1 · The Market System","Market equilibrium"],
    ["1.1 · The Market System","Price elasticity of demand"],
    ["1.1 · The Market System","Price elasticity of supply"],
    ["1.1 · The Market System","Income elasticity"],
    ["1.1 · The Market System","The mixed economy"],
    ["1.1 · The Market System","Privatisation"],
    ["1.1 · The Market System","Externalities"],
    ["1.2 · Business Economics","Factors of production and sectors of the economy"],
    ["1.2 · Business Economics","Productivity and division of labour"],
    ["1.2 · Business Economics","Business costs, revenues and profit"],
    ["1.2 · Business Economics","Economies and diseconomies of scale"],
    ["1.2 · Business Economics","Competitive markets"],
    ["1.2 · Business Economics","Advantages and disadvantages of large and small firms"],
    ["1.2 · Business Economics","Monopoly"],
    ["1.2 · Business Economics","Oligopoly"],
    ["1.2 · Business Economics","The labour market"],
    ["1.2 · Business Economics","Supply and demand for labour and trade union activity"],
    ["1.2 · Business Economics","Government intervention"],
    ["2.1 · Government & Economy","Economic growth"],
    ["2.1 · Government & Economy","Inflation"],
    ["2.1 · Government & Economy","Unemployment"],
    ["2.1 · Government & Economy","Balance of payments on the current account"],
    ["2.1 · Government & Economy","Protection of the environment"],
    ["2.1 · Government & Economy","Redistribution of income"],
    ["2.1 · Government & Economy","Fiscal policy"],
    ["2.1 · Government & Economy","Monetary policy"],
    ["2.1 · Government & Economy","Supply side policies and government controls"],
    ["2.1 · Government & Economy","Relationships between objectives and policies"],
    ["2.2 · The Global Economy","Globalisation"],
    ["2.2 · The Global Economy","Multinational companies (MNCs) and foreign direct investment"],
    ["2.2 · The Global Economy","International trade"],
    ["2.2 · The Global Economy","Protectionism"],
    ["2.2 · The Global Economy","Trading blocs"],
    ["2.2 · The Global Economy","The WTO and world trade patterns"],
    ["2.2 · The Global Economy","Exchange rates and their determination"],
    ["2.2 · The Global Economy","Impact of changing exchange rates"],
  ],
  bus:[
    ["1 · Business Activity","What is business activity?"],
    ["1 · Business Activity","Business objectives"],
    ["1 · Business Activity","Sole traders, partnerships, social enterprises and franchises"],
    ["1 · Business Activity","Limited companies and multinationals"],
    ["1 · Business Activity","Public corporations"],
    ["1 · Business Activity","Appropriateness of different forms of ownership"],
    ["1 · Business Activity","Classification of businesses"],
    ["1 · Business Activity","Decisions on location"],
    ["1 · Business Activity","Globalisation"],
    ["1 · Business Activity","The importance and growth of multinational companies"],
    ["1 · Business Activity","International trade and exchange rates"],
    ["1 · Business Activity","Government objectives and policies"],
    ["1 · Business Activity","External factors"],
    ["1 · Business Activity","Measuring success in business"],
    ["1 · Business Activity","Reasons for business failure"],
    ["2 · People in Business","The importance of good communication in business"],
    ["2 · People in Business","Barriers to communication in business"],
    ["2 · People in Business","Recruitment and selection"],
    ["2 · People in Business","Legal controls over employment"],
    ["2 · People in Business","Training"],
    ["2 · People in Business","The importance of motivation in the workplace"],
    ["2 · People in Business","Methods of motivation at work"],
    ["2 · People in Business","Organisation structure and employees"],
    ["2 · People in Business","Departmental functions"],
    ["3 · Business Finance","Sources of finance"],
    ["3 · Business Finance","Cash flow forecasting"],
    ["3 · Business Finance","Costs"],
    ["3 · Business Finance","Break-even analysis"],
    ["3 · Business Finance","Statement of comprehensive income"],
    ["3 · Business Finance","Statement of financial position"],
    ["3 · Business Finance","Ratio analysis"],
    ["3 · Business Finance","The use of financial documents"],
    ["4 · Marketing","Market research"],
    ["4 · Marketing","The importance of marketing"],
    ["4 · Marketing","Market segmentation"],
    ["4 · Marketing","Product"],
    ["4 · Marketing","Price"],
    ["4 · Marketing","Place"],
    ["4 · Marketing","Promotion"],
    ["5 · Business Operations","Economies and diseconomies of scale"],
    ["5 · Business Operations","Production and productivity"],
    ["5 · Business Operations","Lean production"],
    ["5 · Business Operations","Technology in production"],
    ["5 · Business Operations","Factors of production"],
    ["5 · Business Operations","Quality"],
  ],
  eng:[
    ["01 · Reading Skills","Text analysis"],
    ["01 · Reading Skills","Skimming and scanning"],
    ["01 · Reading Skills","Explicit and implicit meaning"],
    ["01 · Reading Skills","Point-Evidence-Explain"],
    ["01 · Reading Skills","Evaluating a text"],
    ["01 · Reading Skills","Use of language"],
    ["01 · Reading Skills","Word classes"],
    ["01 · Reading Skills","Connotations"],
    ["01 · Reading Skills","Different sentence types"],
    ["01 · Reading Skills","Sentences for effect"],
    ["02 · Writing Skills","Vocabulary"],
    ["02 · Writing Skills","Choosing the right vocabulary"],
    ["02 · Writing Skills","Vocabulary for effect"],
    ["02 · Writing Skills","Language for different effects"],
    ["02 · Writing Skills","Why your choices matter"],
    ["02 · Writing Skills","Sentence types"],
    ["02 · Writing Skills","Opening sentences"],
    ["02 · Writing Skills","Sentences for effect"],
    ["02 · Writing Skills","Sentence purpose"],
    ["02 · Writing Skills","Principles of structure"],
    ["02 · Writing Skills","Paragraphing for effect"],
    ["02 · Writing Skills","Linking ideas"],
    ["02 · Writing Skills","Ending a sentence"],
    ["02 · Writing Skills","Commas"],
    ["02 · Writing Skills","Apostrophes"],
    ["02 · Writing Skills","Colons, semi-colons, dashes, brackets, ellipses"],
    ["02 · Writing Skills","Common spelling errors"],
    ["02 · Writing Skills","Improve your writing"],
    ["02 · Writing Skills","Proof-reading, checking and editing"],
    ["03 · Paper 1 Section A","Non-fiction texts"],
    ["03 · Paper 1 Section A","Types of text"],
    ["03 · Paper 1 Section A","Identifying the writer's perspective"],
    ["03 · Paper 1 Section A","Audience and purpose"],
    ["03 · Paper 1 Section A","Language for different effects"],
    ["03 · Paper 1 Section A","Fact, opinion and expert advice"],
    ["03 · Paper 1 Section A","The structure of a text"],
    ["03 · Paper 1 Section A","Unseen texts"],
    ["03 · Paper 1 Section A","Putting it into practice"],
    ["03 · Paper 1 Section A","Comparing texts"],
    ["03 · Paper 1 Section A","Identifying key information"],
    ["03 · Paper 1 Section A","Analysing the texts"],
    ["03 · Paper 1 Section A","Selecting evidence"],
    ["03 · Paper 1 Section A","Comparisons"],
    ["04 · Paper 1 Section B","Transactional writing"],
    ["04 · Paper 1 Section B","Introduction to transactional writing"],
    ["04 · Paper 1 Section B","Writing for a purpose: inform, explain, review"],
    ["04 · Paper 1 Section B","Writing for a purpose: argue, persuade, advise"],
    ["04 · Paper 1 Section B","Writing for an audience"],
    ["04 · Paper 1 Section B","Form"],
    ["04 · Paper 1 Section B","Vocabulary for effect"],
    ["04 · Paper 1 Section B","Sentences for effect"],
    ["04 · Paper 1 Section B","Openings and conclusions"],
    ["04 · Paper 1 Section B","Ideas and planning"],
    ["04 · Paper 1 Section B","Putting it into practice"],
    ["05 · Paper 1 Section C","Imaginative writing"],
    ["05 · Paper 1 Section C","Introduction to imaginative writing"],
    ["05 · Paper 1 Section C","Generating ideas"],
    ["05 · Paper 1 Section C","Plot"],
    ["05 · Paper 1 Section C","Structure"],
    ["05 · Paper 1 Section C","Narration"],
    ["05 · Paper 1 Section C","Characters"],
    ["05 · Paper 1 Section C","Monologues and dialogues"],
    ["05 · Paper 1 Section C","Descriptive writing"],
    ["05 · Paper 1 Section C","Vocabulary for effect"],
    ["05 · Paper 1 Section C","Sentences for effect"],
    ["05 · Paper 1 Section C","Putting it into practice"],
  ],
  ban:[
    ["A · Exam format","Learn exactly what each paper asks  ⟶ generate from 4BN1 spec"],
    ["B · Question types","Drill each type"],
    ["C · Written expression","Polish"],
  ],
};

/* ============ state ============ */
let topics=loadJSON("ascent_topics",null);
if(!topics){
  topics={};
  for(const s of SUBJECTS){
    topics[s.key]=SEED[s.key].map((p,i)=>({id:s.key+"_"+i+"_"+Date.now(),section:p[0],name:p[1],status:"notstarted"}));
  }
  saveJSON("ascent_topics",topics);
}
let sessions=loadJSON("ascent_sessions",[]);
let errors=loadJSON("ascent_errors",[]);
let papers=loadJSON("ascent_papers",[]);
let examDate=Store.get("ascent_exam")||"2026-09-28";
const DAY1="2026-05-31";
let curSubjectTab="maths";
let curTimerSubject="maths";
let viewingWeek=null;

/* ============ 17-week plan data ============ */
const WEEKS=[
 {n:1,dates:"31 May – 6 Jun",phase:"CONTENT",focus:"Day 1 is here. Content + diagnostics in parallel. Front-load the killers: Maths B (block 1) + Accounting (block 2) daily; Economics in block 3. NotebookLM to learn, Gemini to test. First Anki cards tonight.",practice:"Sit ONE cold diagnostic paper per subject this week to find your real starting line — bombing them is the point.",miles:["Maths B tracker open, first topics at Learning","Accounting first format (income statement) started","6 cold diagnostics done & self-marked","Subjects ranked weakest → strongest"]},
 {n:2,dates:"7 – 13 Jun",phase:"CONTENT",focus:"Full rhythm: 3 deep blocks daily — Maths B + Accounting + (Eco/Business). Re-attack your 2 weakest diagnostic topics. Anki grows daily.",practice:"Daily maths problems; topic-drill weak diagnostic areas via Gemini.",miles:["~8 topics at Learning+","Accounting formats underway","Command-word ladder started for Eco & Business"]},
 {n:3,dates:"14 – 20 Jun",phase:"CONTENT",focus:"Maths B + Accounting + Economics core; start Business. Every keyword/formula → Anki.",practice:"Topic-by-topic drills; 1 maths section timed.",miles:["~12 topics at Learning+","Command words memorised for Eco & Business"]},
 {n:4,dates:"21 – 27 Jun",phase:"CONTENT",focus:"Push Economics + Business analysis/evaluation chains. Maths & Accounting toward Exam-ready. Begin English B format study.",practice:"First TIMED maths paper. Eco/Business 8–12 mark practice, AI-marked vs real scheme.",miles:["~16 topics at Learning+","Maths ~50% Exam-ready"]},
 {n:5,dates:"28 Jun – 4 Jul",phase:"CONTENT",focus:"Bangla begins (likely your fastest A* — start, don't over-invest). Continue all others. Begin the question-type log.",practice:"1 timed paper in your strongest subject. Daily Anki.",miles:["All 6 subjects in motion","Question-type log started"]},
 {n:6,dates:"5 – 11 Jul",phase:"CONTENT",focus:"Mid-content grind. Repair laggards. Accounting near-complete (finite formats).",practice:"2 timed papers (rotate subjects). Self-mark strictly.",miles:["~half of all topics Exam-ready","Accounting ~80% done"]},
 {n:7,dates:"12 – 18 Jul",phase:"CONTENT",focus:"REGISTER FOR THE EXAM (deadline ~end July). Set 3 reminders now. Continue Eco & Business depth.",practice:"2 timed papers. Read your 1st examiner report.",miles:["EXAM REGISTERED (critical)","1st examiner report read"]},
 {n:8,dates:"19 – 25 Jul",phase:"CONTENT",focus:"Close remaining content gaps. Maths B fully covered → pure practice. English B technique solid.",practice:"2–3 timed papers. Maths: full paper under exam timing.",miles:["~40 topics Exam-ready","Maths content 100% covered"]},
 {n:9,dates:"26 Jul – 1 Aug",phase:"CONTENT",focus:"Final content sprint. Kill anything still Not-started. Bangla & English B comfortable.",practice:"3 timed papers. Build pre-written answers for recurring question types.",miles:["Zero topics Not-started","Question-type log covers all 6"]},
 {n:10,dates:"2 – 8 Aug",phase:"CONTENT",focus:"Transition. Content essentially done. Last review of weak sub-topics, then pivot to heavy practice.",practice:"3–4 timed papers. Marks visibly climbing.",miles:["~50 topics Exam-ready","Content phase complete"]},
 {n:11,dates:"9 – 15 Aug",phase:"PRACTICE",focus:"Practice phase. Work the last 5+ years of EVERY subject. Each paper → mark → log mistakes → fix.",practice:"1 full timed paper most days. Maths & Accounting daily reps.",miles:["5+ yrs done: Maths, Accounting","Error log running"]},
 {n:12,dates:"16 – 22 Aug",phase:"PRACTICE",focus:"Pattern recognition kicks in. Pre-build model answers for repeating questions. Attack weakest topics.",practice:"Full papers: Economics, Business (5+ yrs each). AI-mark every one.",miles:["5+ yrs done: Eco, Business","Pre-written answers for top recurring Qs"]},
 {n:13,dates:"23 – 29 Aug",phase:"PRACTICE",focus:"English B + Bangla full-paper practice. Tighten timing everywhere. 2nd round of examiner reports.",practice:"Full papers: English B, Bangla. Re-do earlier low-scoring papers.",miles:["5+ yrs done: English B, Bangla","All examiner reports read"]},
 {n:14,dates:"30 Aug – 5 Sep",phase:"PRACTICE",focus:"Polish. Scores should be A/A* on practice papers. Drill ONLY remaining weak spots — stop polishing strengths.",practice:"Mixed full papers daily, same time-of-day as your real slots.",miles:["Practice scores hitting A* threshold","Weak-topic list nearly empty"]},
 {n:15,dates:"6 – 12 Sep",phase:"TAPER",focus:"Final taper. Full mocks under 100% real conditions (timer, no notes, phone away). Confidence + timing.",practice:"1 full timed mock per subject. Light Anki.",miles:["Full mock in each subject","Timing comfortable on all papers"]},
 {n:16,dates:"13 – 19 Sep",phase:"TAPER",focus:"Exam-week conditions. Light targeted review of mistake log + examiner-report traps. No new content. Sleep early.",practice:"Re-skim mistake & question-type logs. Short confidence reps.",miles:["Mistake log reviewed","Rested, calm, logistics confirmed"]},
 {n:17,dates:"20 Sep → exams",phase:"TAPER",focus:"Exam period. Day before each paper: light review, sleep early. No all-nighters — they lower scores. The work is done; perform.",practice:"Per paper: glance marks, match time, attempt EVERY question, never leave a 12-marker blank.",miles:["One paper at a time","Walk in like it's another Tuesday"]},
];

/* ============ prompts & tactics ============ */
const PROMPTS=[
 ["Learn a topic","Act as an Edexcel IGCSE [subject] examiner. Teach me [topic] for spec [code]. Structure: (1) core concepts I must know, (2) the 3 most common ways it's tested, (3) exact key terms I lose marks for omitting, (4) a worked top-mark answer. Keep it tight — I'm revising, not reading a textbook."],
 ["⭐ Mark my answer","You are an Edexcel IGCSE [subject] examiner. Here is the official mark scheme: [paste]. Here is my answer: [paste]. Mark it strictly against the scheme. Give my exact mark, where I lost marks and why, then rewrite my weakest paragraph to A* standard so I can see the gap."],
 ["Crack evaluation Qs","Give me an Edexcel-style 12-mark 'evaluate' question on [topic]. Then show the ideal structure — point, explanation, chain of reasoning, counter-argument, justified conclusion — with the exact phrases that signal evaluation to an examiner."],
 ["Quiz me (active recall)","Quiz me on [topic] with 10 increasingly hard exam-style questions, one at a time. After each, tell me if I'm right and why. At the end, list the sub-areas I'm weakest in and what to revise."],
 ["Generate a topic list","Using the attached Edexcel IGCSE [subject] ([code]) specification, list every topic and sub-topic as an exhaustive checklist, grouped by the spec's sections. One sub-topic per line, no commentary — I'm pasting these into a tracker."],
 ["Order a topic list","Take this topic list and put it in the best LEARNING ORDER for someone starting from scratch. Rules: foundational topics everything depends on first; topics needing a prerequisite after it; self-contained topics anywhere. Output a numbered order with one line each on why it's placed there."],
 ["Feynman — find the holes","You are a curious 12-year-old. I'll explain [topic]. Keep asking 'but why?' and poke at anything vague until I explain it in plain words or admit I don't understand it."],
];
const TACTICS=[
 ["Mark scheme = your textbook","Read it BEFORE answering. It tells you the exact words examiners reward. Write what scores, not what you know."],
 ["Question-spotting is real","Edexcel recycles question types. After 5 yrs of papers, pre-build an answer for each recurring one. Walk in having rehearsed 80% of the paper."],
 ["Command words are a code","State=1 mark. Explain=point+reason. Analyse=chain A→B→C. Evaluate=both sides+justified judgement. Answering the wrong verb is how bright students drop to a B."],
 ["Marks per minute","~1 mark/1–1.5 min. Never perfect a 2-marker for 10 min. NEVER leave a 12-marker blank — rushed scores 6–7, blank scores 0."],
 ["Active recall, not re-reading","Close the book, write what you remember, then check. The retrieval struggle builds memory. Highlighting barely works."],
 ["Spaced repetition (Anki)","Every definition, formula, keyword → Anki. 15 min daily locks in hundreds of facts over the term."],
 ["Past papers = timed exams","Timer on, no notes, phone away, one sitting. Simulate the adrenaline now so exam day is routine."],
 ["Examiner reports = cheat code","Pearson publishes WHY students lose marks each session. A list of traps from your markers. Almost no self-candidate reads them."],
 ["Two-pass exam method","Pass 1: answer everything you're sure of, fast, skip hesitations. Pass 2: return with nerves settled. Stops freezing on Q4."],
 ["Hunt the weak","Marks come from dragging worst topics 50→80%, not best 90→95%. Comfort topics waste time. The tracker forces honesty."],
 ["Compression sheets","Final fortnight: each subject → one page (formulas, keywords, answer skeletons). Building it IS revision; read only it the night before."],
 ["Protect the hardware","Sleep, movement, real food beat grinding. The 4–10pm block should include real activity, not 6 hours of screens."],
];

/* ============ date helpers ============ */
function daysBetween(a,b){return Math.round((b-a)/86400000);}
function todayStr(){const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
function parseD(s){const[y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d);}
function weekIndexFor(date){const diff=daysBetween(parseD(DAY1),date);return Math.floor(diff/7)+1;}

/* ============ stats ============ */
function hoursFor(filterFn){let s=0;for(const x of sessions)if(filterFn(x))s+=x.dur;return s/3600;}
function startOfWeek(){const d=new Date();const day=(d.getDay()+6)%7;d.setHours(0,0,0,0);d.setDate(d.getDate()-day);return d;}
function computeStreak(){
  const days=new Set(sessions.map(s=>s.date));
  let streak=0;const d=new Date();d.setHours(0,0,0,0);
  if(!days.has(todayStr())){d.setDate(d.getDate()-1);}
  while(true){
    const ds=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
    if(days.has(ds)){streak++;d.setDate(d.getDate()-1);}else break;
  }
  return streak;
}
function subjReady(k){const t=topics[k]||[];const tot=t.length;const r=t.filter(x=>x.status==="ready").length;return{tot,r,pct:tot?Math.round(r/tot*100):0};}
function overallReady(){let tot=0,r=0;for(const s of SUBJECTS){const x=subjReady(s.key);tot+=x.tot;r+=x.r;}return tot?Math.round(r/tot*100):0;}
function nextTopic(k){const t=topics[k]||[];return t.find(x=>x.status!=="ready")||null;}
function weakestSubjects(n){return SUBJECTS.map(s=>({s,pct:subjReady(s.key).pct})).sort((a,b)=>a.pct-b.pct).slice(0,n);}

/* ============ today's cross-subject plan ============ */
function buildTodayBlocks(){
  const dow=new Date().getDay(); 
  const weekend=(dow===0||dow===6);
  const el=document.getElementById("todayBlocks");
  const mode=document.getElementById("dayMode");
  if (!el || !mode) return;
  el.innerHTML="";
  if(weekend){
    mode.textContent="Weekend — past papers + repairing weak topics. New content waits for weekdays.";
    const weak=weakestSubjects(3);
    const b1={time:"Morning",s:"Full past paper (timed)",t:"Sit one timed paper, no notes, phone away. Then mark it against the scheme and log mistakes.",hint:"Pick the subject you've done least practice in"};
    addBlockEl(el,b1,false);
    weak.forEach((w,i)=>{
      const nt=nextTopic(w.s.key);
      addBlockEl(el,{time:i===0?"Repair":"·",s:w.s.name+"  ("+w.pct+"% ready)",t:nt?("Re-drill weak area — next: <b>"+nt.name+"</b>"):"All topics ready — do a paper instead",hint:"Weekend = fix what the week exposed"},false);
    });
    addBlockEl(el,{time:"Eve",s:"Anki review + update trackers",t:"Clear your Anki queue, mark this week's topics honestly, glance at next week.",hint:"Light — rest is part of the plan"},false);
    return;
  }
  mode.textContent="Weekday — three deep blocks for new content, assigned by what you can't cram later.";
  const dayNum=daysBetween(parseD(DAY1),new Date());
  const b3key=(dayNum%2===0)?"eco":"bus";
  const b4opts=["eng","ban","papers"];
  const b4=b4opts[dayNum%3];
  const blocks=[
    {time:"7:30",key:"maths",label:"Deep 1 · sharpest hours",hint:"Least crammable — gets your best hours every day"},
    {time:"10:00",key:"acc",label:"Deep 2",hint:"Near-pure dependency chain — front-loaded"},
    {time:"12:15",key:b3key,label:"Deep 3 · concept work",hint:"Eco/Business alternate — evaluation marks decide A*"},
  ];
  blocks.forEach(b=>{
    const nt=nextTopic(b.key);
    addBlockEl(el,{
      time:b.time, s:subjName(b.key)+" — "+b.label,
      t:nt?("Study next: <b>"+(nt.section?nt.section+" · ":"")+nt.name+"</b>"):"All topics Exam-ready — switch to timed past papers",
      hint:b.hint, key:b.key, topicId:nt?nt.id:null
    },false);
  });
  let b4block;
  if(b4==="papers"){b4block={time:"3:00",s:"Past-paper practice (lighter)",t:"Work a few past-paper questions on a topic you just learned — retrieval under mild pressure.",hint:"Block 4 rotates: English / Bangla / papers"};}
  else{const nt=nextTopic(b4);b4block={time:"3:00",s:subjName(b4)+" — Block 4 (lighter)",t:nt?("Study next: <b>"+nt.name+"</b>"):"All topics ready — do a paper",hint:"Skill/exposure subjects live here & on weekends",key:b4,topicId:nt?nt.id:null};}
  addBlockEl(el,b4block,false);
  addBlockEl(el,{time:"4–10pm",s:"OFF — earned reward",t:"Locked leisure. Guilt-free, because you did the mornings. Put real movement here.",hint:"Work-then-reward is the engine",locked:true},false);
  addBlockEl(el,{time:"10:00",s:"Anki + skim today's notes (~45m)",t:"15 min of spaced repetition before sleep locks the day in. Then sleep ~11.",hint:"Memory consolidates in sleep",locked:true},false);
}
function addBlockEl(parent,b,done){
  const div=document.createElement("div");
  div.className="block"+(b.locked?" locked":"")+(done?" done":"");
  let go="";
  if(b.key&&!b.locked){go=`<div class="go"><button class="btn sm" onclick="startFromBlock('${b.key}')">Focus →</button></div>`;}
  div.innerHTML=`<div class="time">${b.time}</div><div class="body"><div class="s">${b.s}</div><div class="t">${b.t}</div><div class="hint">${b.hint||""}</div></div>${go}`;
  parent.appendChild(div);
}
function startFromBlock(key){curTimerSubject=key;go('focus');renderTimerSubjects();setToast("Subject set: "+subjName(key));}

/* ============ render: dashboard ============ */
function renderDash(){
  const today=new Date();today.setHours(0,0,0,0);
  const ex=parseD(examDate);
  const dleft=Math.max(0,daysBetween(today,ex));
  
  const daysEl = document.getElementById("cd-days");
  if (daysEl) daysEl.textContent=dleft;
  const weeksEl = document.getElementById("cd-weeks");
  if (weeksEl) weeksEl.textContent=Math.ceil(dleft/7);
  const d1El = document.getElementById("cd-day1");
  if (d1El) d1El.textContent=Math.max(0,daysBetween(parseD(DAY1),today));
  const examdateEl = document.getElementById("cd-examdate");
  if (examdateEl) examdateEl.textContent=ex.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});
  const examDateInputEl = document.getElementById("examDateInput");
  if (examDateInputEl) examDateInputEl.value=examDate;

  const sw=startOfWeek().getTime();
  const todayHrsEl = document.getElementById("todayHrs");
  if (todayHrsEl) todayHrsEl.textContent=hoursFor(s=>s.date===todayStr()).toFixed(1);
  const weekHrsEl = document.getElementById("weekHrs");
  if (weekHrsEl) weekHrsEl.textContent=hoursFor(s=>parseD(s.date).getTime()>=sw).toFixed(1);
  const streak=computeStreak();
  const streakValEl = document.getElementById("streakVal");
  if (streakValEl) streakValEl.textContent=streak;
  const streakXEl = document.getElementById("streakX");
  if (streakXEl) streakXEl.textContent=streak>0?"keep it alive":"study today to start";
  const flameEl = document.getElementById("flameIcon");
  if (flameEl) flameEl.style.opacity=streak>0?"1":".3";
  const readyPctEl = document.getElementById("readyPct");
  if (readyPctEl) readyPctEl.textContent=overallReady()+"%";

  let wi=weekIndexFor(today);wi=Math.min(Math.max(wi,1),17);
  const wk=WEEKS[wi-1];
  const wkMiniEl = document.getElementById("wkMini");
  if (wkMiniEl) wkMiniEl.textContent="W"+wi+"/17";
  const wkMiniChipEl = document.getElementById("wkMiniChip");
  if (wkMiniChipEl) {
    wkMiniChipEl.textContent=wk.phase;
    wkMiniChipEl.className="phase-chip phase-"+wk.phase;
  }
  const wkMiniFocusEl = document.getElementById("wkMiniFocus");
  if (wkMiniFocusEl) wkMiniFocusEl.textContent=wk.focus;
  const wkMiniPhaseTitleEl = document.getElementById("wkMiniPhaseTitle");
  if (wkMiniPhaseTitleEl) wkMiniPhaseTitleEl.textContent=wk.phase==="CONTENT"?"Build the foundation":wk.phase==="PRACTICE"?"Drill the patterns":"Taper & perform";

  buildTodayBlocks();
  renderDashProgress();
  renderRecall();
  renderCloseout();
  renderFlags();
}
function renderDashProgress(){
  const el=document.getElementById("dashProgress");
  if (!el) return;
  el.innerHTML="";
  for(const s of SUBJECTS){
    const x=subjReady(s.key);
    const nt=nextTopic(s.key);
    const div=document.createElement("div");div.className="subj-prog";
    div.innerHTML=`<div class="top"><span class="nm">${s.name} <span class="cnt">· next: ${nt?nt.name:"✓ all ready"}</span></span><span class="pc">${x.pct}%</span></div><div class="bar"><i style="width:${x.pct}%"></i></div>`;
    el.appendChild(div);
  }
}

/* ============ spaced-recall engine ============ */
const RECALL_STEPS=[1,3,7,21,42];
function recallDue(){
  const today=parseD(todayStr());
  const due=[];
  for(const s of SUBJECTS){
    for(const tp of (topics[s.key]||[])){
      if(tp.status!=="ready"||!tp.readyAt)continue;
      const base=parseD(tp.lastRecall||tp.readyAt);
      const elapsed=daysBetween(base,today);
      const reps=tp.recallReps||0;
      const step=RECALL_STEPS[Math.min(reps,RECALL_STEPS.length-1)];
      if(elapsed>=step){due.push({s,tp,over:elapsed-step});}
    }
  }
  due.sort((a,b)=>b.over-a.over);
  return due;
}
function renderRecall(){
  const list=document.getElementById("recallList");
  const title=document.getElementById("recallTitle");
  const card=document.getElementById("recallCard");
  if(!list)return;
  const due=recallDue();
  list.innerHTML="";
  if(!due.length){
    title.textContent="Nothing due yet";
    card.style.borderColor="var(--line)";
    list.innerHTML='<div class="empty">As topics age, they\'ll appear here for a cold recall check. Keeps June\'s knowledge alive in September.</div>';
    return;
  }
  title.innerHTML=`<span class="pill-due">${due.length}</span> ${due.length===1?"topic":"topics"} due for recall`;
  card.style.borderColor="var(--amber-deep)";
  due.slice(0,8).forEach(d=>{
    const div=document.createElement("div");div.className="recall-item";
    const overTxt=d.over>0?`<span class="overdue">${d.over}d overdue</span>`:"due today";
    div.innerHTML=`<div class="rg"><div class="rn">${d.tp.name}</div><div class="rs"><b>${d.s.name}</b> · ${overTxt}</div></div>
      <div class="recall-btns">
        <button class="btn sm" onclick="recallPass('${d.s.key}','${d.tp.id}')">Recalled ✓</button>
        <button class="btn sm ghost danger" onclick="recallFail('${d.s.key}','${d.tp.id}')">Forgot</button>
      </div>`;
    list.appendChild(div);
  });
  if(due.length>8){const m=document.createElement("div");m.className="empty";m.textContent="+"+(due.length-8)+" more — clear these first";list.appendChild(m);}
}
function recallPass(k,id){
  const tp=(topics[k]||[]).find(x=>x.id===id);if(!tp)return;
  tp.lastRecall=todayStr();tp.recallReps=(tp.recallReps||0)+1;
  saveJSON("ascent_topics",topics);renderRecall();setToast("Recall locked — interval extended");
}
function recallFail(k,id){
  const tp=(topics[k]||[]).find(x=>x.id===id);if(!tp)return;
  tp.status="learning";delete tp.readyAt;delete tp.lastRecall;tp.recallReps=0;
  saveJSON("ascent_topics",topics);renderRecall();renderDashProgress();
  const readyPctEl = document.getElementById("readyPct");
  if (readyPctEl) readyPctEl.textContent=overallReady()+"%";
  setToast("Moved back to Learning — re-drill it");
}

/* ============ daily close-out ============ */
function getCloseout(){return loadJSON("ascent_closeout",{});}
function renderCloseout(){
  const body=document.getElementById("closeoutBody");
  const title=document.getElementById("closeoutTitle");
  if(!body)return;
  const dow=new Date().getDay();const weekend=(dow===0||dow===6);
  const co=getCloseout();const today=todayStr();
  const rec=co[today]||{};
  const blockDefs=weekend
    ? [["paper","Past paper (timed)"],["repair","Repaired weak topics"],["anki","Anki + review"]]
    : [["b1","Block 1 · Maths B"],["b2","Block 2 · Accounting"],["b3","Block 3 · concept subject"],["anki","Evening Anki"]];
  body.innerHTML="";
  const wrap=document.createElement("div");wrap.className="closeout-grid";
  blockDefs.forEach(([key,label])=>{
    const v=rec[key];
    const row=document.createElement("div");row.className="co-block";
    row.innerHTML=`<div class="col">${label}</div>
      <button class="co-toggle ${v==="yes"?"yes":v==="no"?"no":""}" onclick="toggleCloseout('${key}')">${v==="yes"?"Done":v==="no"?"Missed":"—"}</button>`;
    wrap.appendChild(row);
  });
  body.appendChild(wrap);
  const done=blockDefs.filter(([k])=>rec[k]==="yes").length;
  const answered=blockDefs.filter(([k])=>rec[k]).length;
  if(answered===blockDefs.length){
    const b=document.createElement("div");b.className="co-done-banner";b.style.marginTop="10px";
    b.textContent=done===blockDefs.length?"Full day logged — streak protected":`${done}/${blockDefs.length} blocks done. Tomorrow's a fresh start.`;
    body.appendChild(b);
    title.textContent="Day logged";
  }else{
    title.textContent="Did the day happen?";
  }
}
function toggleCloseout(key){
  const co=getCloseout();const today=todayStr();
  if(!co[today])co[today]={};
  const cur=co[today][key];
  co[today][key]=cur==="yes"?"no":cur==="no"?null:"yes";
  if(co[today][key]===null)delete co[today][key];
  saveJSON("ascent_closeout",co);renderCloseout();
}

/* ============ over-confidence flags ============ */
function renderFlags(){
  const strip=document.getElementById("flagsStrip");if(!strip)return;
  strip.innerHTML="";
  const flags=[];
  for(const s of SUBJECTS){
    const x=subjReady(s.key);
    const ps=papers.filter(p=>p.subject===s.key);
    if(x.pct>=40&&ps.length>=2){
      const recent=ps.slice(-3);
      const avg=recent.reduce((a,b)=>a+b.score/b.max,0)/recent.length*100;
      if(avg<75){
        flags.push({type:"red",icon:"!",html:`<b>${s.name}:</b> you've marked ${x.pct}% exam-ready, but your recent papers average ${Math.round(avg)}% — below the A* line. Understanding ≠ scoring. Re-test your "ready" topics under timed conditions.`});
      }
    }
  }
  const wi=Math.min(Math.max(weekIndexFor(parseD(todayStr())),1),17);
  if(wi>=6){
    for(const s of SUBJECTS){
      const x=subjReady(s.key);
      if(x.pct<20&&x.tot>3){
        flags.push({type:"amber",icon:"–",html:`<b>${s.name}</b> is still ${x.pct}% ready in week ${wi}. Don't let a whole subject drift late — even your easier A*s need timed practice.`});
      }
    }
  }
  const hr=new Date().getHours();
  const studiedToday=sessions.some(s=>s.date===todayStr());
  if(!studiedToday && hr>=14 && new Date().getDay()!==0 && new Date().getDay()!==6){
    flags.push({type:"amber",icon:"–",html:`It's past 2pm and no study logged today. Your deep-work hours are slipping — even 30 focused minutes keeps the streak and the momentum alive.`});
  }
  if(!flags.length)return;
  flags.slice(0,3).forEach(f=>{
    const div=document.createElement("div");div.className="flag"+(f.type==="amber"?" amber":"");
    div.innerHTML=`<div class="fi">${f.icon}</div><div class="ft">${f.html}</div>`;
    strip.appendChild(div);
  });
}

/* ============ render: focus timer ============ */
let timerRunning=false,timerStart=0,timerAccum=0,timerInterval=null;
function renderTimerSubjects(){
  const host=document.getElementById("timerSubjects");
  if (!host) return;
  host.innerHTML="";
  for(const s of SUBJECTS){
    const b=document.createElement("button");b.textContent=s.name;
    b.className=(s.key===curTimerSubject)?"on":"";
    b.onclick=()=>{if(timerRunning){setToast("Stop the timer before switching");return;}curTimerSubject=s.key;renderTimerSubjects();};
    host.appendChild(b);
  }
}
function fmtHMS(sec){const h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=Math.floor(sec%60);return String(h).padStart(2,"0")+":"+String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");}
function tick(){const el=document.getElementById("timerFace");const sec=timerAccum+(timerRunning?(Date.now()-timerStart)/1000:0);if (el) el.textContent=fmtHMS(sec);}
function toggleTimer(){
  const btn=document.getElementById("startBtn");const face=document.getElementById("timerFace");const st=document.getElementById("timerStatus");
  if(!timerRunning){
    timerRunning=true;timerStart=Date.now();if (btn) btn.textContent="Pause";if (face) face.classList.add("running");
    if (st) st.textContent="● focusing on "+subjName(curTimerSubject)+" — stay in it";
    timerInterval=setInterval(tick,250);
  }else{
    timerRunning=false;timerAccum+=(Date.now()-timerStart)/1000;clearInterval(timerInterval);
    if (btn) btn.textContent="Resume";if (face) face.classList.remove("running");
    if (st) st.textContent="paused · "+fmtHMS(timerAccum)+" banked — press Resume, or Reset to save";
  }
  ensureSaveBtn();
}
function ensureSaveBtn(){
  let sb=document.getElementById("saveSessBtn");
  if(timerAccum>0&&!timerRunning){
    if(!sb){
      sb=document.createElement("button");sb.id="saveSessBtn";sb.className="btn primary";sb.textContent="Save session";
      sb.onclick=saveTimerSession;
      const host = document.querySelector("#view-focus .btn-row");
      if (host) host.prepend(sb);
    }
  }else if(sb){sb.remove();}
}
function saveTimerSession(){
  const sec=Math.round(timerAccum+(timerRunning?(Date.now()-timerStart)/1000:0));
  if(sec<30){setToast("Too short to log");return;}
  sessions.push({id:Date.now(),subject:curTimerSubject,dur:sec,date:todayStr(),ts:Date.now()});
  saveJSON("ascent_sessions",sessions);
  discardTimer();setToast("Logged "+(sec/60).toFixed(0)+" min on "+subjName(curTimerSubject));
  refreshAll();
}
function discardTimer(){
  timerRunning=false;timerAccum=0;clearInterval(timerInterval);
  const face = document.getElementById("timerFace");
  if (face) {
    face.textContent="00:00:00";
    face.classList.remove("running");
  }
  const btn = document.getElementById("startBtn");
  if (btn) btn.textContent="Start";
  const st = document.getElementById("timerStatus");
  if (st) st.textContent="pick a subject & press start";
  ensureSaveBtn();
}
function logManual(){
  const mins=prompt("How many minutes did you study "+subjName(curTimerSubject)+"?");
  const m=parseInt(mins);if(!m||m<=0)return;
  sessions.push({id:Date.now(),subject:curTimerSubject,dur:m*60,date:todayStr(),ts:Date.now()});
  saveJSON("ascent_sessions",sessions);setToast("Logged "+m+" min");refreshAll();
}
function renderFocus(){
  renderTimerSubjects();
  const sw=startOfWeek().getTime();
  const fmTodayEl = document.getElementById("fmToday");
  if (fmTodayEl) fmTodayEl.textContent=hoursFor(s=>s.date===todayStr()).toFixed(1)+"h";
  const fmWeekEl = document.getElementById("fmWeek");
  if (fmWeekEl) fmWeekEl.textContent=hoursFor(s=>parseD(s.date).getTime()>=sw).toFixed(1)+"h";
  const fmTotalEl = document.getElementById("fmTotal");
  if (fmTotalEl) fmTotalEl.textContent=hoursFor(()=>true).toFixed(1)+"h";
  const fmSessionsEl = document.getElementById("fmSessions");
  if (fmSessionsEl) fmSessionsEl.textContent=sessions.length;
  
  const log=document.getElementById("sessionLog");
  if (!log) return;
  log.innerHTML="";
  const todays=sessions.filter(s=>s.date===todayStr()).slice().reverse();
  if(!todays.length){log.innerHTML='<div class="empty">No sessions yet today.<br>Press start above and begin block one.</div>';return;}
  for(const s of todays){
    const d=document.createElement("div");d.className="score-line";
    d.innerHTML=`<span class="id">${subjName(s.subject)}</span><span class="sc">${(s.dur/60).toFixed(0)} min</span>`;
    log.appendChild(d);
  }
}

/* ============ render: subjects ============ */
function renderSubjTabs(){
  const host=document.getElementById("subjTabs");
  if (!host) return;
  host.innerHTML="";
  for(const s of SUBJECTS){
    const b=document.createElement("button");
    const x=subjReady(s.key);
    b.innerHTML=s.name+' <span style="opacity:.6">'+x.pct+'%</span>';
    b.className=(s.key===curSubjectTab)?"on":"";
    b.onclick=()=>{curSubjectTab=s.key;renderSubjects();};
    host.appendChild(b);
  }
}
function renderSubjects(){
  renderSubjTabs();
  const s=SUBJECTS.find(x=>x.key===curSubjectTab);
  const x=subjReady(s.key);
  const subjNameEl = document.getElementById("subjName");
  if (subjNameEl) subjNameEl.textContent=s.name;
  const subjMetaEl = document.getElementById("subjMeta");
  if (subjMetaEl) subjMetaEl.textContent=s.code;
  const subjBarEl = document.getElementById("subjBar");
  if (subjBarEl) subjBarEl.style.width=x.pct+"%";
  const subjCountEl = document.getElementById("subjCount");
  if (subjCountEl) subjCountEl.textContent=x.r+" of "+x.tot+" topics Exam-ready · "+x.pct+"%";
  
  const list=document.getElementById("topicList");
  if (!list) return;
  list.innerHTML="";
  const t=topics[s.key]||[];
  if(!t.length){list.innerHTML='<div class="empty">No topics yet. Add them above, or generate from the spec (Toolkit).</div>';return;}
  let lastSec=null;let nextMarked=false;
  t.forEach((tp)=>{
    if(tp.section&&tp.section!==lastSec){const h=document.createElement("div");h.className="section-h";h.textContent=tp.section;list.appendChild(h);lastSec=tp.section;}
    const row=document.createElement("div");
    row.className="topic"+(tp.status==="ready"?" is-ready":"");
    const cyc=tp.status==="ready"?"ready":(tp.status==="learning"?"learning":"");
    const mark=tp.status==="ready"?"✓":(tp.status==="learning"?"~":"");
    const isNext=!nextMarked&&tp.status!=="ready";if(isNext)nextMarked=true;
    row.innerHTML=`<div class="cyc ${cyc}" onclick="cycleStatus('${s.key}','${tp.id}')">${mark}</div>
      <div class="nm">${tp.name}</div>
      ${isNext?'<span class="nextpill">next</span>':''}
      <span class="tag">${tp.status==="notstarted"?"not started":tp.status}</span>
      <button class="btn sm ghost danger" style="padding:3px 8px" onclick="delTopic('${s.key}','${tp.id}')">×</button>`;
    list.appendChild(row);
  });
}
function cycleStatus(k,id){
  const t=topics[k];const tp=t.find(x=>x.id===id);if(!tp)return;
  tp.status=tp.status==="notstarted"?"learning":tp.status==="learning"?"ready":"notstarted";
  if(tp.status==="ready"){ tp.readyAt=todayStr(); tp.lastRecall=todayStr(); }
  else { delete tp.readyAt; delete tp.lastRecall; }
  saveJSON("ascent_topics",topics);renderSubjects();renderDashProgress();renderRecall();
  const readyPctEl = document.getElementById("readyPct");
  if (readyPctEl) readyPctEl.textContent=overallReady()+"%";
}

/* ============ study summary generator (AI-ready) ============ */
function summariseSubject(s){
  const t=topics[s.key]||[];
  const ready=t.filter(x=>x.status==="ready");
  const learning=t.filter(x=>x.status==="learning");
  const notstarted=t.filter(x=>x.status==="notstarted");
  const x=subjReady(s.key);
  const nt=nextTopic(s.key);
  let out=`### ${s.name} (${s.code}) — ${x.pct}% exam-ready (${x.r}/${x.tot} topics)\n`;
  out+=`EXAM-READY (${ready.length}): ${ready.length?ready.map(r=>r.name).join("; "):"none yet"}\n`;
  out+=`IN PROGRESS (${learning.length}): ${learning.length?learning.map(r=>r.name).join("; "):"none"}\n`;
  out+=`NOT STARTED (${notstarted.length}): ${notstarted.length?notstarted.map(r=>r.name).join("; "):"none — all topics touched"}\n`;
  out+=`NEXT UP: ${nt?((nt.section?nt.section+" · ":"")+nt.name):"all topics ready — move to timed past papers"}\n`;
  const ps=papers.filter(p=>p.subject===s.key);
  if(ps.length){
    const best=ps.reduce((a,b)=>(b.score/b.max>a.score/a.max?b:a));
    const avg=Math.round(ps.reduce((a,b)=>a+b.score/b.max,0)/ps.length*100);
    out+=`PAST PAPERS: ${ps.length} logged, avg ${avg}%, best ${Math.round(best.score/best.max*100)}% (${best.paper})\n`;
  }
  const es=errors.filter(e=>e.subject===s.key);
  if(es.length){
    out+=`LOGGED MISTAKES (${es.length}): ${es.slice(-4).map(e=>e.mistake).join(" | ")}\n`;
  }
  return out;
}
function genSummary(scope){
  const today=new Date();today.setHours(0,0,0,0);
  const ex=parseD(examDate);
  const dleft=Math.max(0,daysBetween(today,ex));
  let wi=Math.min(Math.max(weekIndexFor(today),1),17);
  const wk=WEEKS[wi-1];
  const totalH=hoursFor(()=>true);
  const streak=computeStreak();

  let body="";
  const list = scope==="subject" ? [SUBJECTS.find(s=>s.key===curSubjectTab)] : SUBJECTS;

  let out=`STUDY PROGRESS SUMMARY — Edexcel IGCSE candidate (private, Nov 2026 sitting)\n`;
  out+=`Generated: ${today.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}\n`;
  out+=`Days until first exam: ${dleft}  |  Plan week: ${wi}/17 (${wk.phase} phase)\n`;
  out+=`Total focused study logged: ${totalH.toFixed(1)} h  |  Current day-streak: ${streak}\n`;
  out+=`Overall exam-ready across ${scope==="subject"?"this subject":"all subjects"}: ${scope==="subject"?subjReady(curSubjectTab).pct:overallReady()}%\n`;
  const due=recallDue();
  if(due.length){out+=`Topics due for recall (knowledge may be fading): ${due.slice(0,8).map(d=>d.tp.name+" ["+d.s.name+"]").join("; ")}${due.length>8?" …+"+(due.length-8):""}\n`;}
  out+=`\n============================================================\n\n`;

  for(const s of list){ out+=summariseSubject(s)+"\n"; }

  if(scope!=="subject"){
    const ranked=SUBJECTS.map(s=>({n:s.name,pct:subjReady(s.key).pct})).sort((a,b)=>a.pct-b.pct);
    out+=`============================================================\n`;
    out+=`SNAPSHOT: weakest → ${ranked.slice(0,2).map(r=>r.n+" ("+r.pct+"%)").join(", ")}  |  strongest → ${ranked.slice(-2).map(r=>r.n+" ("+r.pct+"%)").join(", ")}\n\n`;
  }

  out+=`------------------------------------------------------------\n`;
  out+=`WHAT I NEED FROM YOU (the AI reading this):\n`;
  out+=`1. Given where I am with ${dleft} days left and in the ${wk.phase.toLowerCase()} phase, tell me if my pace is on track for all-A*, and where I'm at risk.\n`;
  out+=`2. Suggest exactly what I should prioritise NEXT this week — be specific to my weak/in-progress topics above, not generic.\n`;
  out+=`3. Flag any topic I've marked 'exam-ready' that you think I should re-test, and any 'not started' topic that's high-mark and shouldn't be left late.\n`;
  out+=`4. Give me 2–3 concrete tactics to raise my probability of A* from this exact position.\n`;
  out+=`(Note: a topic is only 'exam-ready' here if I scored well on past-paper questions unaided against the mark scheme.)\n`;

  document.getElementById("summaryText").value=out;
  document.getElementById("summaryTitle").textContent = scope==="subject" ? (SUBJECTS.find(s=>s.key===curSubjectTab).name+" — progress") : "Full progress — all 6 subjects";
  document.getElementById("summaryStamp").textContent = scope==="subject"?"single subject":"all subjects · "+totalH.toFixed(1)+"h logged";
  document.getElementById("summaryModal").classList.remove("hidden");
}
function closeSummary(){document.getElementById("summaryModal").classList.add("hidden");}
function copySummary(){
  const txt=document.getElementById("summaryText").value;
  navigator.clipboard?.writeText(txt).then(()=>setToast("Summary copied — paste into your AI")).catch(()=>{
    const ta=document.getElementById("summaryText");ta.select();try{document.execCommand("copy");setToast("Copied");}catch(e){setToast("Select & copy manually");}
  });
}
function downloadSummary(){
  const txt=document.getElementById("summaryText").value;
  const a=document.createElement("a");a.href="data:text/plain;charset=utf-8,"+encodeURIComponent(txt);
  a.download="study-summary-"+todayStr()+".txt";a.click();setToast("Summary downloaded");
}
function addTopic(){
  const nm=document.getElementById("newTopicName").value.trim();
  const sec=document.getElementById("newTopicSection").value.trim();
  if(!nm)return;
  topics[curSubjectTab].push({id:curSubjectTab+"_"+Date.now(),section:sec,name:nm,status:"notstarted"});
  saveJSON("ascent_topics",topics);
  document.getElementById("newTopicName").value="";document.getElementById("newTopicSection").value="";
  renderSubjects();setToast("Topic added");
}
function delTopic(k,id){topics[k]=topics[k].filter(x=>x.id!==id);saveJSON("ascent_topics",topics);renderSubjects();renderDashProgress();}
function genReminder(){
  const s=SUBJECTS.find(x=>x.key===curSubjectTab);
  setToast("See Toolkit → 'Generate a topic list' — load your "+s.code+" spec into NotebookLM");
  go('toolkit');
}

/* ============ render: week ============ */
function renderWeek(){
  let wi=viewingWeek||Math.min(Math.max(weekIndexFor(new Date()),1),17);
  viewingWeek=wi;
  const wk=WEEKS[wi-1];
  
  const wkNumEl = document.getElementById("wkNum");
  if (wkNumEl) wkNumEl.textContent=wi;
  const wkDatesEl = document.getElementById("wkDates");
  if (wkDatesEl) wkDatesEl.textContent=wk.dates;
  const wkBigEl = document.getElementById("wkBig");
  if (wkBigEl) wkBigEl.textContent="W"+wi;
  
  const wkPhaseEl = document.getElementById("wkPhase");
  if (wkPhaseEl) {
    wkPhaseEl.textContent=wk.phase;
    wkPhaseEl.className="phase-chip phase-"+wk.phase;
  }
  const wkFocusEl = document.getElementById("wkFocus");
  if (wkFocusEl) wkFocusEl.textContent=wk.focus;
  const wkPracticeEl = document.getElementById("wkPractice");
  if (wkPracticeEl) wkPracticeEl.textContent=wk.practice;
  
  const m=document.getElementById("wkMiles");
  if (!m) return;
  m.innerHTML="";
  wk.miles.forEach(x=>{const li=document.createElement("li");li.textContent=x;m.appendChild(li);});
}
function weekNav(d){
  if(d===0){viewingWeek=Math.min(Math.max(weekIndexFor(new Date()),1),17);}
  else{viewingWeek=Math.min(Math.max((viewingWeek||1)+d,1),17);}
  renderWeek();
}

/* ============ render: logs ============ */
function fillSubjSelects(){
  for(const id of ["pSubj","eSubj"]){
    const sel=document.getElementById(id);
    if (!sel) continue;
    sel.innerHTML="";
    for(const s of SUBJECTS){const o=document.createElement("option");o.value=s.key;o.textContent=s.name;sel.appendChild(o);}
  }
}
function addPaper(){
  const subj=document.getElementById("pSubj").value;
  const idv=document.getElementById("pId").value.trim();
  const sc=parseFloat(document.getElementById("pScore").value);
  const mx=parseFloat(document.getElementById("pMax").value);
  if(!idv||isNaN(sc)||isNaN(mx)||mx<=0){setToast("Fill paper, score & max");return;}
  papers.push({id:Date.now(),subject:subj,paper:idv,score:sc,max:mx,date:todayStr()});
  saveJSON("ascent_papers",papers);
  document.getElementById("pId").value="";document.getElementById("pScore").value="";document.getElementById("pMax").value="";
  renderLogs();setToast("Paper logged");
}
function addError(){
  const subj=document.getElementById("eSubj").value;
  const mis=document.getElementById("eMistake").value.trim();
  const fix=document.getElementById("eFix").value.trim();
  if(!mis){setToast("Describe the mistake");return;}
  errors.push({id:Date.now(),subject:subj,mistake:mis,fix:fix,date:todayStr()});
  saveJSON("ascent_errors",errors);
  document.getElementById("eMistake").value="";document.getElementById("eFix").value="";
  renderLogs();setToast("Added to error log");
}
function renderLogs(){
  const pl=document.getElementById("paperLog");
  if (pl) {
    pl.innerHTML="";
    if(!papers.length){pl.innerHTML='<div class="empty">No papers logged yet.</div>';}
    papers.slice().reverse().forEach(p=>{
      const pct=Math.round(p.score/p.max*100);
      const cls=pct>=80?"astar":pct>=70?"near":"low";
      const d=document.createElement("div");d.className="score-line";
      d.innerHTML=`<span class="id">${subjName(p.subject)} · ${p.paper}</span><span class="sc ${cls}">${p.score}/${p.max} · ${pct}%</span>`;
      pl.appendChild(d);
    });
  }
  
  const elx=document.getElementById("errorLog");
  if (elx) {
    elx.innerHTML="";
    if(!errors.length){elx.innerHTML='<div class="empty">No mistakes logged — log them as they happen.</div>';}
    errors.slice().reverse().forEach(e=>{
      const d=document.createElement("div");d.className="logitem";
      d.innerHTML=`<div class="meta"><span class="s">${subjName(e.subject)}</span><span class="d">${e.date} <span class="mini-link" onclick="delError(${e.id})">remove</span></span></div><div class="mistake">${escapeHtml(e.mistake)}</div>${e.fix?`<div class="fix">${escapeHtml(e.fix)}</div>`:""}`;
      elx.appendChild(d);
    });
  }
}
function delError(id){errors=errors.filter(e=>e.id!==id);saveJSON("ascent_errors",errors);renderLogs();}
function escapeHtml(s){return s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}

/* ============ render: toolkit ============ */
function renderToolkit(){
  const p=document.getElementById("prompts");
  if (p) {
    p.innerHTML="";
    PROMPTS.forEach((pr,i)=>{
      const d=document.createElement("div");d.className="prompt";
      d.innerHTML=`<div class="pt">${pr[0]}</div><div class="pc" id="pc${i}">${escapeHtml(pr[1])}</div><button class="btn sm copy" onclick="copyPrompt(${i})">copy</button>`;
      p.appendChild(d);
    });
  }
  
  const t=document.getElementById("tactics");
  if (t) {
    t.innerHTML="";
    TACTICS.forEach((tc,i)=>{
      const d=document.createElement("div");d.className="tactic";
      d.innerHTML=`<div class="n">${String(i+1).padStart(2,"0")}</div><div class="tx"><b>${tc[0]}</b><p>${tc[1]}</p></div>`;
      t.appendChild(d);
    });
  }
  
  const storageNoteEl = document.getElementById("storageNote");
  if (storageNoteEl) storageNoteEl.textContent=LS_OK?"saved in this browser & synced to cloud":"Warning: browser storage blocked — data won't persist";
}
function copyPrompt(i){
  const txt=PROMPTS[i][1];
  navigator.clipboard?.writeText(txt).then(()=>setToast("Prompt copied")).catch(()=>setToast("Select & copy manually"));
}

/* ============ data export/import ============ */
function exportData(){
  const blob={topics,sessions,errors,papers,examDate,closeout:getCloseout(),exported:new Date().toISOString()};
  const s=JSON.stringify(blob,null,2);
  const a=document.createElement("a");a.href="data:application/json;charset=utf-8,"+encodeURIComponent(s);
  a.download="ascent-backup-"+todayStr()+".json";a.click();setToast("Backup downloaded");
}
function importData(){
  const inp=document.createElement("input");inp.type="file";inp.accept="application/json";
  inp.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();
    r.onload=()=>{try{const b=JSON.parse(r.result);
      if(b.topics)topics=b.topics;if(b.sessions)sessions=b.sessions;if(b.errors)errors=b.errors;if(b.papers)papers=b.papers;if(b.examDate)examDate=b.examDate;
      saveJSON("ascent_topics",topics);saveJSON("ascent_sessions",sessions);saveJSON("ascent_errors",errors);saveJSON("ascent_papers",papers);Store.set("ascent_exam",examDate);
      if(b.closeout)saveJSON("ascent_closeout",b.closeout);
      refreshAll();setToast("Data imported");}catch(err){setToast("Bad file");}};
    r.readAsText(f);};
  inp.click();
}
async function wipeData(){
  if(!confirm("Erase ALL progress, sessions, logs? This cannot be undone."))return;
  // Clear localStorage
  ["ascent_topics","ascent_sessions","ascent_errors","ascent_papers","ascent_exam","ascent_closeout"].forEach(k=>Store.del(k));
  // Clear cloud data so it doesn't restore on reload
  if (supabase && currentUser) {
    try {
      const { error } = await supabase
        .from('study_state')
        .delete()
        .eq('user_id', currentUser.id);
      if (error) console.error("[Sync] Failed to wipe cloud data:", error);
    } catch (err) {
      console.error("[Sync] Wipe cloud error:", err);
    }
  }
  location.reload();
}

/* ============ exam date ============ */
function setExamDate(){const v=document.getElementById("examDateInput").value;if(!v)return;examDate=v;Store.set("ascent_exam",examDate);renderDash();setToast("Exam date set");}
function resetExam(){examDate="2026-09-28";Store.set("ascent_exam",examDate);renderDash();setToast("Reset to 28 Sep 2026");}

/* Reset topic lists to current SEED (preserves sessions, papers, errors, closeout) */
function resetTopics(){
  if(!confirm("Reset ALL topic lists to the latest syllabus? Your sessions, papers, errors, and close-out data will be kept. Topic progress (learning/ready status) will be lost."))return;
  topics={};
  for(const s of SUBJECTS){
    topics[s.key]=SEED[s.key].map((p,i)=>({id:s.key+"_"+i+"_"+Date.now(),section:p[0],name:p[1],status:"notstarted"}));
  }
  saveJSON("ascent_topics",topics);
  refreshAll();
  setToast("Topics reset to latest syllabus");
}

/* ============ nav ============ */
function go(v){
  document.querySelectorAll("#nav button").forEach(b=>b.classList.toggle("active",b.dataset.v===v));
  ["dash","focus","subjects","week","logs","toolkit"].forEach(x=>{
    const el = document.getElementById("view-"+x);
    if (el) el.classList.toggle("hidden",x!==v);
  });
  if(v==="dash")renderDash();
  if(v==="focus")renderFocus();
  if(v==="subjects")renderSubjects();
  if(v==="week")renderWeek();
  if(v==="logs"){fillSubjSelects();renderLogs();}
  if(v==="toolkit")renderToolkit();
  window.scrollTo({top:0,behavior:"smooth"});
}

/* ============ misc ============ */
let toastT=null;
function setToast(msg){const t=document.getElementById("toast");if (!t) return;t.textContent=msg;t.classList.add("show");clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove("show"),2200);}
function refreshAll(){renderDash();if(!document.getElementById("view-focus").classList.contains("hidden"))renderFocus();if(!document.getElementById("view-logs").classList.contains("hidden"))renderLogs();renderSubjTabs();}
function updateClock(){
  const d=new Date();
  const t=d.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"});
  const ds=d.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"});
  const dow=d.getDay();const weekend=(dow===0||dow===6);
  const hr=d.getHours();
  let phase="";
  if(weekend)phase="weekend mode";
  else if(hr<7)phase="before the day starts";
  else if(hr<16)phase="<b>deep-work hours</b>";
  else if(hr<22)phase="off-block (earned)";
  else phase="wind-down · Anki";
  const clockEl = document.getElementById("headclock");
  if (clockEl) clockEl.innerHTML=`${ds}<br><b>${t}</b> · ${phase}`;
}

/* ============ Supabase Auth & Sync Integration ============ */
async function loadStateFromSupabase() {
  if (!supabase || !currentUser) return;
  if (isPulling) {
    console.log("[Sync] Already pulling, skipping duplicate load");
    return;
  }
  isPulling = true;
  try {
    console.log("[Sync] Loading cloud state for user:", currentUser.id);

    const { data, error } = await Promise.race([
      supabase
        .from('study_state')
        .select('data')
        .eq('user_id', currentUser.id)
        .single(),
      new Promise((_, reject) => setTimeout(() => reject(new Error("study_state query timed out after 10s")), 10000))
    ]);

    if (error && error.code !== 'PGRST116') {
      console.error("[Sync] Supabase pull error:", error);
      return;
    }

    if (error && error.code === 'PGRST116') {
      // No row exists — first-time user. Create initial row so future syncs work.
      console.log("[Sync] No study_state row found — first-time user, creating initial row");
      const { error: insertErr } = await supabase
        .from('study_state')
        .upsert({
          user_id: currentUser.id,
          data: {},
          updated_at: new Date().toISOString()
        });
      if (insertErr) console.error("[Sync] Failed to create initial row:", insertErr);
      return;
    }

    if (data && data.data) {
      console.log("[Sync] Cloud state loaded, applying to localStorage");
      const keys = ["ascent_topics", "ascent_sessions", "ascent_errors", "ascent_papers", "ascent_closeout", "ascent_exam"];
      keys.forEach(k => {
        if (data.data[k] !== undefined) {
          const val = typeof data.data[k] === 'object' ? JSON.stringify(data.data[k]) : data.data[k];
          localStorage.setItem(k, val);
        }
      });

      topics = loadJSON("ascent_topics", topics);
      sessions = loadJSON("ascent_sessions", []);
      errors = loadJSON("ascent_errors", []);
      papers = loadJSON("ascent_papers", []);
      examDate = Store.get("ascent_exam") || "2026-09-28";

      refreshAll();
      console.log("[Sync] Cloud state applied successfully");
    }
  } catch (err) {
    console.error("[Sync] Failed to load cloud state:", err.message);
  } finally {
    isPulling = false;
    // Flush any push that was queued during pull
    if (pushPending) {
      pushPending = false;
      console.log("[Sync] Flushing queued push after pull completed");
      pushStateToSupabase();
    }
  }
}

async function handleLogin() {
  const emailInput = document.getElementById("loginEmail");
  const email = emailInput.value.trim();
  const loginBtn = document.getElementById("loginBtn");
  const status = document.getElementById("loginStatus");

  if (!email) {
    setToast("Enter an email");
    return;
  }

  if (!supabase) {
    status.textContent = "Error: Supabase not configured — check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY env vars.";
    console.error("[Auth] Supabase client is null. Env vars missing at build time.");
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = "Sending...";
  status.textContent = "Requesting magic link from Supabase...";

  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin
      }
    });

    if (error) {
      console.error("[Auth] Magic link error:", error.message);
      status.textContent = "Error: " + error.message;
      setToast("Failed to send link");
    } else {
      status.textContent = "Magic link sent! Check your inbox.";
      setToast("Check your email!");
    }
  } catch (err) {
    console.error("[Auth] Magic link exception:", err);
    status.textContent = "Error: " + err.message;
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = "Send Magic Link";
  }
}

async function handlePasswordLogin() {
  const emailInput = document.getElementById("loginEmail");
  const email = emailInput.value.trim();
  const passwordInput = document.getElementById("loginPassword");
  const password = passwordInput.value;
  const pwdBtn = document.getElementById("pwdBtn");
  const status = document.getElementById("loginStatus");

  if (!email || !password) {
    setToast("Enter both email & password");
    return;
  }

  if (!supabase) {
    status.textContent = "Error: Supabase not configured — check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY env vars.";
    console.error("[Auth] Supabase client is null. Env vars missing at build time.");
    return;
  }

  pwdBtn.disabled = true;
  pwdBtn.textContent = "Verifying...";
  status.textContent = "Authenticating with Supabase...";

  try {
    console.log("[Auth] Attempting signInWithPassword for:", email);
    console.log("[Auth] Supabase URL:", import.meta.env.VITE_SUPABASE_URL ? "set" : "MISSING");

    const { data, error } = await Promise.race([
      supabase.auth.signInWithPassword({ email, password }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Supabase auth timed out after 12s. Check network or Supabase project status.")), 12000))
    ]);

    if (error) {
      console.error("[Auth] Supabase returned error:", error.message, error);
      status.textContent = "Error: " + error.message;
      setToast("Login failed: " + error.message);
      pwdBtn.disabled = false;
      pwdBtn.textContent = "Password Sign In";
    } else {
      console.log("[Auth] Login successful, session:", !!data?.session);
      status.textContent = "Authenticated successfully!";
      pwdBtn.disabled = false;
      pwdBtn.textContent = "Password Sign In";
      if (data && data.session) {
        // handleSession updates UI immediately, loads data in background
        handleSession(data.session);
      }
    }
  } catch (err) {
    console.error("[Auth] Login exception:", err);
    status.textContent = "Error: " + err.message;
    setToast("Login error: " + err.message);
    pwdBtn.disabled = false;
    pwdBtn.textContent = "Password Sign In";
  }
}

async function handleLogout() {
  if (confirm("Log out? Local changes will remain, but syncing will stop.")) {
    await supabase.auth.signOut();
    localStorage.clear();
    location.reload();
  }
}

/* ============ Secure AI Advisor Proxy Integration ============ */
async function callGeminiProxy(prompt) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }
  const sessionData = await supabase.auth.getSession();
  const session = sessionData?.data?.session;
  if (!session) {
    throw new Error("You must be logged in to access AI advisor.");
  }
  
  const token = session.access_token;
  
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ prompt })
  });

  // Read body as text first — prevents crash on empty/non-JSON responses
  const rawText = await response.text();

  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch (e) {
    console.error("[AI] Non-JSON response from proxy:", response.status, rawText.slice(0, 200));
    throw new Error(`AI service error (${response.status}): server returned invalid response`);
  }

  if (!response.ok) {
    throw new Error(parsed.error || `AI request failed (${response.status})`);
  }

  if (!parsed.response) {
    throw new Error("AI returned empty response");
  }

  return parsed.response;
}

async function getAIRecommendation() {
  const btn = document.getElementById("aiRecommendBtn");
  btn.disabled = true;
  btn.textContent = "Reading Cockpit...";
  
  try {
    genSummary('full');
    const summary = document.getElementById("summaryText").value;
    closeSummary(); // Close normal modal, we will show AI modal instead
    
    btn.textContent = "Advisor Thinking...";
    
    const prompt = `You are a strict, highly focused academic cockpit AI advisor for a private Edexcel IGCSE candidate sitting exams in Nov 2026.
Review this progress summary:

${summary}

Based on Plan Week, exam countdown, and their weakest areas, suggest exactly ONE concrete action the candidate should take RIGHT NOW to maximize score efficiency (e.g., target a specific weak topic, do a past paper, or log mistakes).
Keep the guidance highly direct, extremely contextual, and under 100 words. Absolutely no generic advice or pleasantries.`;

    const recommendation = await callGeminiProxy(prompt);
    
    document.getElementById("aiModalTitle").textContent = "AI Immediate Action Recommendation";
    document.getElementById("aiModalContent").textContent = recommendation;
    document.getElementById("aiModal").classList.remove("hidden");
  } catch (err) {
    setToast("AI Recommendation failed: " + err.message);
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.textContent = "Ask AI Advisor";
  }
}

async function runWeeklyCheckIn() {
  const btn = document.getElementById("aiWeeklyBtn");
  btn.disabled = true;
  btn.textContent = "Building Evaluation...";
  
  try {
    genSummary('full');
    const summary = document.getElementById("summaryText").value;
    closeSummary();
    
    btn.textContent = "Evaluator Thinking...";
    
    const prompt = `You are an elite Edexcel IGCSE academic strategist. Review the candidate's complete cockpit dashboard:

${summary}

Provide a brutally honest weekly check-in evaluation:
1. STATUS: Are they truly on track for all A* grades from this position? Evaluate pace.
2. RISKS: Identify the top 2 risks based on their weak subjects, readiness percentages, or logs.
3. PRIORITIES: Recommend the top 3 highest-impact topics or concrete tasks to conquer next week.

Ensure response is structured with bullet points, extremely practical, and under 150 words. Do not use generic filler.`;

    const review = await callGeminiProxy(prompt);
    
    document.getElementById("aiModalTitle").textContent = "AI Weekly Readiness Evaluation";
    document.getElementById("aiModalContent").textContent = review;
    document.getElementById("aiModal").classList.remove("hidden");
  } catch (err) {
    setToast("AI Check-In failed: " + err.message);
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.textContent = "Run Weekly Check-In";
  }
}

function closeAIModal() {
  document.getElementById("aiModal").classList.add("hidden");
}

/* ============ Expose functions globally for inline HTML event handlers ============ */
window.setExamDate = setExamDate;
window.resetExam = resetExam;
window.toggleTimer = toggleTimer;
window.discardTimer = discardTimer;
window.logManual = logManual;
window.addTopic = addTopic;
window.delTopic = delTopic;
window.genReminder = genReminder;
window.genSummary = genSummary;
window.closeSummary = closeSummary;
window.copySummary = copySummary;
window.downloadSummary = downloadSummary;
window.weekNav = weekNav;
window.addPaper = addPaper;
window.addError = addError;
window.delError = delError;
window.exportData = exportData;
window.importData = importData;
window.wipeData = wipeData;
window.resetTopics = resetTopics;
window.go = go;
window.recallPass = recallPass;
window.recallFail = recallFail;
window.toggleCloseout = toggleCloseout;
window.startFromBlock = startFromBlock;
window.copyPrompt = copyPrompt;
window.cycleStatus = cycleStatus;
window.handleLogin = handleLogin;
window.handlePasswordLogin = handlePasswordLogin;
window.handleLogout = handleLogout;
window.getAIRecommendation = getAIRecommendation;
window.runWeeklyCheckIn = runWeeklyCheckIn;
window.closeAIModal = closeAIModal;

/* ============ boot ============ */
updateClock();
setInterval(updateClock,30000);
renderDash();

async function handleSession(session) {
  if (session && session.user) {
    currentUser = session.user;
    // UI transition — immediate, never blocked by data load
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("authHeader").style.display = "block";
    document.getElementById("userEmail").textContent = currentUser.email;
    // Load cloud data in background — never block the session transition
    loadStateFromSupabase().catch(err => {
      console.error("[Auth] Background data load failed (app still usable):", err);
    });
  } else {
    currentUser = null;
    document.getElementById("loginScreen").classList.remove("hidden");
    document.getElementById("authHeader").style.display = "none";
  }
}

if (supabase) {
  // Check active session immediately on startup
  supabase.auth.getSession().then(({ data: { session } }) => {
    handleSession(session);
  });

  // Listen for changes
  supabase.auth.onAuthStateChange((event, session) => {
    console.log("[Auth] onAuthStateChange:", event);
    handleSession(session);
  });
}

document.querySelectorAll("#nav button").forEach(b=>b.onclick=()=>go(b.dataset.v));
document.getElementById("summaryModal").addEventListener("click",e=>{if(e.target.id==="summaryModal")closeSummary();});
document.getElementById("aiModal").addEventListener("click",e=>{if(e.target.id==="aiModal")closeAIModal();});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape") {
    closeSummary();
    closeAIModal();
  }
});
window.addEventListener("beforeunload",e=>{if(timerRunning){e.preventDefault();e.returnValue="";}});
