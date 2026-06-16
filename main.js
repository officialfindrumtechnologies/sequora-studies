import { supabase } from './src/lib/supabase.js';
import {
  THEMES, applyTheme, loadSavedTheme, resetTheme,
  getCurrentThemeData, buildCustomVars, readCurrentCustomFields, hexToRgb,
} from './src/lib/theme.js';
import { saveTheme, loadThemeFromDB, updateProfile } from './src/data/profiles.js';
import {
  showOnboarding,
  hideOnboarding,
  wizNext, wizBack, wizBoardChange, wizNoDateToggle,
  wizAddFromTemplate, wizAddManual, wizRemoveSubject, wizComplete,
  wizMigrate, wizSkipMigration,
} from './src/auth/onboarding.js';
import { getSubscription, submitBkashPayment } from './src/data/subscriptions.js';
import { initSubjectsView, setSubjectsViewTier } from './src/views/subjects-view.js';

// Apply theme from localStorage immediately — avoids FOUC before auth resolves
loadSavedTheme();

// Register service worker for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

/* ============ defensive storage (localStorage + memory fallback) ============ */
const MEM={};
let LS_OK=true;
try{const k="__t";localStorage.setItem(k,"1");localStorage.removeItem(k);}catch(e){LS_OK=false;}

let currentUser = null;
let userTier = 'free';   // updated after login from subscriptions table
let isPulling = false;
let isPushing = false;
let pushPending = false;
let syncTimeout = null;

async function pushStateToSupabase() {
  if (!supabase || !currentUser) return;
  if (!navigator.onLine) {
    localStorage.setItem('sq_sync_pending', '1');
    updateSyncStatus('offline');
    return;
  }
  if (isPulling) {
    pushPending = true;
    console.log("[Sync] Pull in progress, push queued");
    return;
  }
  if (isPushing) return;
  isPushing = true;
  updateSyncStatus('syncing');

  const keys = ["ascent_topics", "ascent_sessions", "ascent_errors", "ascent_papers", "ascent_closeout", "ascent_exam"];
  const payload = {};
  keys.forEach(k => {
    const raw = Store.get(k);
    if (raw !== null) {
      try { payload[k] = JSON.parse(raw); }
      catch(e) { payload[k] = raw; }
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

    if (error) {
      console.error("[Sync] Push error:", error);
      localStorage.setItem('sq_sync_pending', '1');
      updateSyncStatus('error');
    } else {
      localStorage.removeItem('sq_sync_pending');
      updateSyncStatus('synced');
    }
  } catch (err) {
    console.error("[Sync] Failed to push:", err);
    localStorage.setItem('sq_sync_pending', '1');
    updateSyncStatus('error');
  } finally {
    isPushing = false;
  }
}

function triggerSync() {
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(pushStateToSupabase, 1500); // 1.5s debounce
}

function updateSyncStatus(state) {
  const el = document.getElementById('syncStatus');
  if (!el) return;
  el.className = 'sync-' + state;
  if (state === 'offline') {
    el.textContent = '● offline';
    el.style.display = 'inline';
  } else if (state === 'syncing') {
    el.textContent = '↻ syncing';
    el.style.display = 'inline';
  } else if (state === 'synced') {
    el.textContent = '✓ synced';
    el.style.display = 'inline';
    setTimeout(() => { if (el.className === 'sync-synced') el.style.display = 'none'; }, 2200);
  } else if (state === 'error') {
    el.textContent = '⚠ sync failed';
    el.style.display = 'inline';
  }
}

window.addEventListener('offline', () => updateSyncStatus('offline'));
window.addEventListener('online', () => {
  if (localStorage.getItem('sq_sync_pending')) {
    triggerSync();
  } else {
    updateSyncStatus('synced');
  }
});

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
  {key:"maths",  name:"Maths A",   code:"4MA1", short:"Maths"},
  {key:"acc",    name:"Accounting",code:"4AC1", short:"Acct"},
  {key:"eco",    name:"Economics", code:"4EC1", short:"Econ"},
  {key:"bus",    name:"Business",  code:"4BS1", short:"Biz"},
  {key:"eng",    name:"English B", code:"4EB1", short:"Eng"},
  {key:"ban",    name:"Bangla",    code:"4BN1", short:"Bangla"},
];
const subjName=k=>(SUBJECTS.find(s=>s.key===k)||{}).name||k;

/* ============ PREREQUISITES BY SECTION ============
 * Key:   subject key (e.g. "maths")
 * Value: object mapping section name → array of prerequisite section names
 *
 * Sections NOT listed here are foundational (no prerequisites).
 * Skill-based subjects (English, Bangla) build progressively — no hard prereqs.
 *
 * To edit: match section names EXACTLY as they appear in the topic data.
 * Check actual names: open browser console → topics["maths"].map(t=>t.section)
 */
const PREREQS_BY_SECTION = {
  maths: {
    "Algebra 2": ["Algebra 1"],
    "Algebra 3": ["Algebra 1", "Algebra 2"],
    "Algebra 4": ["Algebra 1"],
    "Algebra 5": ["Algebra 1", "Algebra 2", "Algebra 3"],
    "Graphs 1": ["Algebra 1"],
    "Graphs 2": ["Graphs 1", "Algebra 2"],
    "Graphs 3": ["Graphs 1"],
    "Graphs 4": ["Algebra 5", "Graphs 2"],
    "Graphs 5": ["Graphs 2", "Shape & Space 2"],
    "Number 2": ["Number 1"],
    "Number 3": ["Number 1"],
    "Number 4": ["Number 2"],
    "Number 5": ["Number 2"],
    "Shape & Space 2": ["Shape & Space 1"],
    "Shape & Space 3": ["Shape & Space 2"],
    "Shape & Space 4": ["Shape & Space 3"],
    "Shape & Space 5": ["Shape & Space 1"],
    "Handling Data 2": ["Handling Data 1"],
    "Handling Data 3": ["Handling Data 1", "Handling Data 2"],
    "Handling Data 4": ["Handling Data 1"],
  },
  acc: {
    "Unit 2 · Bookkeeping": ["Unit 1 · Accounting Environment"],
    "Unit 3 · Control Processes": ["Unit 2 · Bookkeeping"],
    "Unit 4 · Financial Statements": ["Unit 2 · Bookkeeping", "Unit 3 · Control Processes"],
  },
  eco: {
    "1.2 · Business Economics": ["1.1 · The Market System"],
    "2.1 · Government & Economy": ["1.1 · The Market System"],
    "2.2 · The Global Economy": ["1.1 · The Market System", "2.1 · Government & Economy"],
  },
  bus: {
    "3 · Business Finance": ["1 · Business Activity"],
  },
};

/* Sections that are independent (no prereqs needed, can be studied in any order) */
const INDEPENDENT_SECTIONS = {
  bus: new Set(["2 · People in Business", "4 · Marketing", "5 · Business Operations"]),
};

/* Subjects where topics build skills progressively (no hard prerequisites) */
const SKILL_SUBJECTS = new Set(["eng", "ban"]);

/* ---- Maths A: complete topics from official 4MA1 spec (learning order) ---- */
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
 {n:1,dates:"31 May – 6 Jun",phase:"CONTENT",focus:"Day 1 is here. Content + diagnostics in parallel. Front-load the killers: Maths A (block 1) + Accounting (block 2) daily; Economics in block 3. NotebookLM to learn, Gemini to test. First Anki cards tonight.",practice:"Sit ONE cold diagnostic paper per subject this week to find your real starting line — bombing them is the point.",miles:["Maths A tracker open, first topics at Learning","Accounting first format (income statement) started","6 cold diagnostics done & self-marked","Subjects ranked weakest → strongest"]},
 {n:2,dates:"7 – 13 Jun",phase:"CONTENT",focus:"Full rhythm: 3 deep blocks daily — Maths A + Accounting + (Eco/Business). Re-attack your 2 weakest diagnostic topics. Anki grows daily.",practice:"Daily maths problems; topic-drill weak diagnostic areas via Gemini.",miles:["~8 topics at Learning+","Accounting formats underway","Command-word ladder started for Eco & Business"]},
 {n:3,dates:"14 – 20 Jun",phase:"CONTENT",focus:"Maths A + Accounting + Economics core; start Business. Every keyword/formula → Anki.",practice:"Topic-by-topic drills; 1 maths section timed.",miles:["~12 topics at Learning+","Command words memorised for Eco & Business"]},
 {n:4,dates:"21 – 27 Jun",phase:"CONTENT",focus:"Push Economics + Business analysis/evaluation chains. Maths & Accounting toward Exam-ready. Begin English B format study.",practice:"First TIMED maths paper. Eco/Business 8–12 mark practice, AI-marked vs real scheme.",miles:["~16 topics at Learning+","Maths ~50% Exam-ready"]},
 {n:5,dates:"28 Jun – 4 Jul",phase:"CONTENT",focus:"Bangla begins (likely your fastest A* — start, don't over-invest). Continue all others. Begin the question-type log.",practice:"1 timed paper in your strongest subject. Daily Anki.",miles:["All 6 subjects in motion","Question-type log started"]},
 {n:6,dates:"5 – 11 Jul",phase:"CONTENT",focus:"Mid-content grind. Repair laggards. Accounting near-complete (finite formats).",practice:"2 timed papers (rotate subjects). Self-mark strictly.",miles:["~half of all topics Exam-ready","Accounting ~80% done"]},
 {n:7,dates:"12 – 18 Jul",phase:"CONTENT",focus:"REGISTER FOR THE EXAM (deadline ~end July). Set 3 reminders now. Continue Eco & Business depth.",practice:"2 timed papers. Read your 1st examiner report.",miles:["EXAM REGISTERED (critical)","1st examiner report read"]},
 {n:8,dates:"19 – 25 Jul",phase:"CONTENT",focus:"Close remaining content gaps. Maths A fully covered → pure practice. English B technique solid.",practice:"2–3 timed papers. Maths: full paper under exam timing.",miles:["~40 topics Exam-ready","Maths content 100% covered"]},
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
 ["Flashcard generator","You are helping me revise Edexcel IGCSE. Create spaced-repetition flashcards (question on front, concise answer on back) for the topic: [ TOPIC ]. Base them on the attached textbook source. Cover every key definition, formula, and fact I'd be tested on. Format as a clean Q/A list I can copy into Anki."],
 ["Five exam questions","Act as an Edexcel IGCSE examiner. Generate 5 exam-style questions on: [ TOPIC ], at genuine IGCSE difficulty and in the style of real past papers. Number them, include mark allocations. Then wait — I'll answer, and you mark me strictly against how an examiner would, showing where I lost marks."],
 ["Explain my mistake","I got this question wrong on the topic [ TOPIC ]. Here's the question and my [ PASTE ]. Explain clearly why it's wrong and what the correct approach is. Then give me 2 similar questions to retry so I can prove I've fixed the gap."],
 ["Mark-scheme decoder","Here is a past exam question and its official mark scheme for [ TOPIC ]: [ PASTE ]. Decode exactly what the examiner rewards — the specific points, keywords, and structure that earn marks. Tell me what most students miss and how to phrase answers to capture full marks."],
 ["Weak-topic diagnostic","Quiz me hard on [ TOPIC ] for Edexcel IGCSE — 10 increasingly difficult questions, one at a time, waiting for my answer each time. At the end, pinpoint my weakest sub-areas and tell me exactly what to drill."],
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
  const today=todayStr();
  const yesterday=dateOff(-1);
  const dayBefore=dateOff(-2);

  // Miss 2 consecutive days → streak 0
  if(!days.has(today)&&!days.has(yesterday)) return 0;

  // Walk back from most recent studied day
  let streak=0;
  const d=new Date();d.setHours(0,0,0,0);
  if(!days.has(today)) d.setDate(d.getDate()-1); // grace: start from yesterday
  while(true){
    const ds=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
    if(days.has(ds)){streak++;d.setDate(d.getDate()-1);}else break;
  }
  return streak;
}
function dateOff(n){const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()+n);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
function isGraceDay(){const days=new Set(sessions.map(s=>s.date));return !days.has(todayStr())&&days.has(dateOff(-1))&&!days.has(dateOff(-2));}

function getBestStreak(){return parseInt(localStorage.getItem('sq_best_streak')||'0',10);}
function updateBestStreak(cur){const best=getBestStreak();if(cur>best){localStorage.setItem('sq_best_streak',String(cur));return cur;}return best;}

function renderFlame(streak,grace){
  const wrap=document.getElementById('flameWrap');
  if(!wrap)return;
  wrap.className='flame-wrap';
  if(streak===0){wrap.classList.add('flame-out');return;}
  if(grace){wrap.classList.add(streak<8?'flame-small':streak<31?'flame-medium':'flame-large');wrap.classList.add('flame-cracked');return;}
  if(streak<8)wrap.classList.add('flame-small');
  else if(streak<31)wrap.classList.add('flame-medium');
  else wrap.classList.add('flame-large');
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
  const examDateStr=ex.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});
  if (examdateEl) examdateEl.textContent=examDateStr;
  const examHeroEl = document.getElementById("cd-exam-hero");
  if (examHeroEl) examHeroEl.textContent=examDateStr;
  const day1=Math.max(0,daysBetween(parseD(DAY1),today));
  const totalDays=Math.max(1,daysBetween(parseD(DAY1),ex));
  const journeyPct=Math.min(100,(day1/totalDays*100)).toFixed(1);
  const journeyFillEl=document.getElementById("cd-journey-fill");
  if (journeyFillEl) journeyFillEl.style.width=journeyPct+"%";
  const journeyMetaEl=document.getElementById("cd-journey-meta");
  if (journeyMetaEl) journeyMetaEl.textContent=day1+" days in · "+totalDays+" total";
  const examDateInputEl = document.getElementById("examDateInput");
  if (examDateInputEl) examDateInputEl.value=examDate;

  const sw=startOfWeek().getTime();
  const todayH=hoursFor(s=>s.date===todayStr());
  const todayHrsEl = document.getElementById("todayHrs");
  if (todayHrsEl){todayHrsEl.textContent=todayH.toFixed(1);const ts=todayHrsEl.closest('.stat');if(ts)ts.style.setProperty('--prog',Math.min(100,todayH/5.5*100).toFixed(0)+'%');}
  const weekH=hoursFor(s=>parseD(s.date).getTime()>=sw);
  const weekHrsEl = document.getElementById("weekHrs");
  if (weekHrsEl){weekHrsEl.textContent=weekH.toFixed(1);const ws=weekHrsEl.closest('.stat');if(ws)ws.style.setProperty('--prog',Math.min(100,weekH/28*100).toFixed(0)+'%');}
  const streak=computeStreak();
  const grace=isGraceDay();
  const best=updateBestStreak(streak);
  renderFlame(streak,grace);
  const streakValEl = document.getElementById("streakVal");
  if (streakValEl){streakValEl.textContent=streak;const ss=streakValEl.closest('.stat');if(ss)ss.style.setProperty('--prog',Math.min(100,streak/30*100).toFixed(0)+'%');}
  const streakXEl = document.getElementById("streakX");
  if (streakXEl) streakXEl.textContent=grace?"⚠ grace day — study today!":streak>0?"keep it alive":"study today to start";
  const bestStreakXEl = document.getElementById("bestStreakX");
  if (bestStreakXEl&&best>0) bestStreakXEl.textContent="best: "+best+" days";
  const rp=overallReady();
  const readyPctEl = document.getElementById("readyPct");
  if (readyPctEl){readyPctEl.textContent=rp+"%";const rs=readyPctEl.closest('.stat');if(rs)rs.style.setProperty('--prog',rp+'%');}

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
  renderStudyNow();
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
    : [["b1","Block 1 · Maths A"],["b2","Block 2 · Accounting"],["b3","Block 3 · concept subject"],["anki","Evening Anki"]];
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

/* ============ render: subjects (Phase 4 — DB-backed via subjects-view.js) ============ */
function renderSubjTabs(){ /* no-op: new view renders its own tabs */ }
function renderSubjects(){ initSubjectsView(userTier); }

function cycleStatus(k,id){
  const t=topics[k];const tp=t&&t.find(x=>x.id===id);if(!tp)return;
  tp.status=tp.status==="notstarted"?"learning":tp.status==="learning"?"ready":"notstarted";
  if(tp.status==="ready"){ tp.readyAt=todayStr(); tp.lastRecall=todayStr(); }
  else { delete tp.readyAt; delete tp.lastRecall; }
  saveJSON("ascent_topics",topics);renderDashProgress();renderRecall();
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

/* ============ payment card ============ */
const BKASH_NUMBER = import.meta.env.VITE_BKASH_NUMBER || '01XXXXXXXXXX';

const PLANS = [
  { key: 'basic_monthly', tier: 'Basic', period: 'Monthly',   amount: 149,  save: ''        },
  { key: 'basic_6mo',     tier: 'Basic', period: '6 Months',  amount: 699,  save: 'save 22%' },
  { key: 'pro_monthly',   tier: 'Pro',   period: 'Monthly',   amount: 299,  save: ''        },
  { key: 'pro_6mo',       tier: 'Pro',   period: '6 Months',  amount: 1399, save: 'save 22%' },
];

let _payCard = null;   // cached sub data for submit handler

async function renderPaymentCard() {
  const card = document.getElementById('payment-card');
  if (!card) return;

  card.innerHTML = '<div class="lead">Your plan</div><div class="kicker" style="margin-top:6px;opacity:.5">Loading…</div>';

  let sub;
  try { sub = await getSubscription(); }
  catch { card.innerHTML = ''; return; }   // silently skip if not authed yet

  _payCard = sub;

  const isPaid    = sub.status === 'active' && sub.tier !== 'free';
  const isPending = sub.bkash_trx_id && (!sub.activated_at || sub.bkash_submitted_at > sub.activated_at);
  const isExpired = sub.expires_at && new Date(sub.expires_at) < new Date();
  const tierLabel = sub.tier === 'paid_1' ? 'Basic' : sub.tier === 'paid_2' ? 'Pro' : 'Free';
  const expiryFmt = sub.expires_at ? new Date(sub.expires_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null;

  let html = '<div class="lead">Your plan</div>';

  // Status badge
  if (sub.status === 'suspended') {
    html += `<div class="pay-status suspended"><span class="ps-icon">🚫</span><div><div class="ps-label">Account suspended</div><div class="ps-detail">Contact support at officialfindrumtechnologies@gmail.com</div></div></div>`;
  } else if (isPaid && !isExpired) {
    html += `<div class="pay-status"><span class="ps-icon">✓</span><div><div class="ps-label">${tierLabel} — active</div><div class="ps-detail">Active until ${expiryFmt}</div></div></div>`;
  } else if (isExpired) {
    html += `<div class="pay-status pending"><span class="ps-icon">⚠</span><div><div class="ps-label">Plan expired</div><div class="ps-detail">Expired on ${expiryFmt}. Renew below to restore full access.</div></div></div>`;
  }

  if (isPending) {
    html += `<div class="pay-status pending" style="margin-bottom:10px">
      <span class="ps-icon">🕐</span>
      <div>
        <div class="ps-label">Payment pending verification</div>
        <div class="ps-detail">TrxID: <span style="font-family:var(--mono);color:var(--amber-soft)">${sub.bkash_trx_id}</span> · ৳${sub.bkash_amount} · submitted ${new Date(sub.bkash_submitted_at).toLocaleDateString('en-GB')}</div>
        <div class="ps-detail" style="margin-top:3px">Typically activated within 24 hours. Questions? <a href="mailto:officialfindrumtechnologies@gmail.com" style="color:var(--amber)">Email us</a></div>
      </div>
    </div>`;
    // Don't show form if already pending — show resubmit option below
    html += `<div style="display:flex;gap:8px;align-items:center;margin-top:6px">
      <span style="font-family:var(--mono);font-size:11px;color:var(--muted)">Wrong TrxID? Submit a correction:</span>
      <button class="btn sm ghost" onclick="showPaymentForm()">Resubmit</button>
    </div>`;
  } else if (!isPaid || isExpired) {
    html += renderPaymentForm();
  } else {
    // Active + not expiring soon: just show renew option collapsed
    html += `<div style="margin-top:10px"><button class="btn sm ghost" onclick="showPaymentForm()">Renew / upgrade</button></div>`;
  }

  // Hidden form for resubmit/renew
  html += `<div id="payment-form-area" class="hidden" style="margin-top:14px">${renderPaymentForm()}</div>`;
  card.innerHTML = html;
}

function renderPaymentForm() {
  return `
    <div class="plan-grid">
      ${PLANS.map(p => `
        <label class="plan-opt ${p.key === 'basic_monthly' ? 'selected' : ''}" onclick="selectPlan('${p.key}', this)">
          <input type="radio" name="sq-plan" value="${p.key}" ${p.key === 'basic_monthly' ? 'checked' : ''}>
          <span class="pname">${p.tier}</span>
          <span class="pprice">৳${p.amount.toLocaleString()}</span>
          <span style="font-family:var(--mono);font-size:10px;color:var(--muted)">${p.period}${p.save ? ' · ' : ''}<span class="psave">${p.save}</span></span>
        </label>
      `).join('')}
    </div>
    <div class="bkash-instruction">
      <b>How to pay:</b><br>
      1. Send the amount above to this bKash number:<br>
      <span class="bkash-number">${BKASH_NUMBER}</span><br>
      2. Copy the Transaction ID (TrxID) from your bKash confirmation<br>
      3. Paste it below — we verify and activate within 24 hours
    </div>
    <div class="split" style="gap:10px;margin-bottom:10px;flex-wrap:wrap">
      <div style="flex:2;min-width:160px">
        <span class="fieldlabel">bKash Transaction ID</span>
        <input type="text" id="pay-trxid" placeholder="e.g. ABC1234567" style="width:100%;font-family:var(--mono);font-size:14px;letter-spacing:.05em" maxlength="20">
      </div>
      <div style="flex:1;min-width:120px">
        <span class="fieldlabel">Your bKash number (optional)</span>
        <input type="tel" id="pay-phone" placeholder="017XXXXXXXX" style="width:100%" maxlength="15">
      </div>
    </div>
    <div style="display:flex;gap:10px;align-items:center">
      <button class="btn primary" id="pay-submit-btn" onclick="submitPayment()">Submit Payment →</button>
      <span id="pay-status-msg" style="font-family:var(--mono);font-size:11px;color:var(--muted)"></span>
    </div>`;
}

function showPaymentForm() {
  const area = document.getElementById('payment-form-area');
  if (area) { area.classList.remove('hidden'); area.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
}
window.showPaymentForm = showPaymentForm;

function selectPlan(key, el) {
  document.querySelectorAll('.plan-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  const radio = el.querySelector('input[type=radio]');
  if (radio) radio.checked = true;
}
window.selectPlan = selectPlan;

async function submitPayment() {
  const plan   = document.querySelector('input[name="sq-plan"]:checked')?.value;
  const trxId  = document.getElementById('pay-trxid')?.value.trim();
  const phone  = document.getElementById('pay-phone')?.value.trim();
  const btn    = document.getElementById('pay-submit-btn');
  const msg    = document.getElementById('pay-status-msg');

  if (!plan)  { if (msg) msg.textContent = 'Select a plan'; return; }
  if (!trxId) { if (msg) msg.textContent = 'Enter your bKash TrxID'; return; }

  if (btn) { btn.disabled = true; btn.textContent = 'Submitting…'; }
  if (msg) msg.textContent = '';

  try {
    await submitBkashPayment({ plan, trxId, phone });
    if (msg) { msg.textContent = '✓ Submitted — activating within 24 hours'; msg.style.color = 'var(--green)'; }
    setTimeout(() => renderPaymentCard(), 1200);
  } catch (err) {
    if (msg) { msg.textContent = err.message; msg.style.color = 'var(--red)'; }
    if (btn) { btn.disabled = false; btn.textContent = 'Submit Payment →'; }
  }
}
window.submitPayment = submitPayment;

// Called from free-tier gate banner and AI quota exceeded messages
window.showUpgradePrompt = function() {
  go('toolkit');
  setTimeout(() => {
    const card = document.getElementById('payment-card');
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
};

/* ============ render: toolkit ============ */
function renderToolkit(){
  renderPaymentCard();
  const p=document.getElementById("prompts");
  if (p) {
    p.innerHTML="";
    PROMPTS.forEach((pr,i)=>{
      const d=document.createElement("div");d.className="prompt";
      d.innerHTML=`<div class="pt">${pr[0]}</div><div class="pc" id="pc${i}">${escapeHtml(pr[1])}</div><button class="btn sm copy" onclick="copyPrompt(${i})">copy</button>`;
      p.appendChild(d);
    });
    // Dynamic prereq-check prompt (assembled at copy-time with live progress)
    const dyn=document.createElement("div");dyn.className="prompt";dyn.style.borderColor="var(--amber-deep)";
    dyn.innerHTML=`<div class="pt">⭐ Should I study this next?</div><div class="pc" style="color:var(--amber-soft)">Generates a prompt pre-filled with your live study progress across all subjects. Paste into Gemini, fill in the chapter you want to study, and it tells you whether you're ready or what to cover first.</div><button class="btn sm primary copy" onclick="copyPrereqCheckPrompt()">copy with my progress</button>`;
    p.appendChild(dyn);
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

/* ============ dynamic "Should I study this next?" prompt ============ */
function buildPrereqCheckPrompt(){
  const subjectList=SUBJECTS.map(s=>s.name+" ("+s.code+")").join(", ");
  let out=`I am a private Edexcel IGCSE candidate sitting exams in Nov 2026. My subjects: ${subjectList}.\n\n`;
  out+=`Here is my current study progress by subject and section:\n\n`;

  for(const s of SUBJECTS){
    const t=topics[s.key]||[];
    if(!t.length)continue;
    // Group by section
    const sections={};
    t.forEach(tp=>{
      const sec=tp.section||"(unsectioned)";
      if(!sections[sec])sections[sec]={ready:[],learning:[]};
      if(tp.status==="ready")sections[sec].ready.push(tp.name);
      if(tp.status==="learning")sections[sec].learning.push(tp.name);
    });
    // Only include sections with progress
    const activeSections=Object.entries(sections).filter(([,v])=>v.ready.length||v.learning.length);
    if(!activeSections.length)continue;
    out+=`### ${s.name} (${s.code})\n`;
    activeSections.forEach(([sec,v])=>{
      out+=`${sec}:\n`;
      if(v.ready.length)out+=`  Exam-ready: ${v.ready.join("; ")}\n`;
      if(v.learning.length)out+=`  In progress: ${v.learning.join("; ")}\n`;
    });
    out+=`\n`;
  }

  out+=`------------------------------------------------------------\n`;
  out+=`CHAPTER I WANT TO STUDY NEXT: [                    ]\n`;
  out+=`(Fill in the subject and chapter/section name above)\n`;
  out+=`------------------------------------------------------------\n\n`;
  out+=`Based on what I've studied above, should I study this chapter now, or are there prerequisite chapters I should cover first? If I'm not ready, tell me exactly which chapters to study before this one and why. If I'm ready, confirm it. Answer based on how the topic genuinely builds on earlier concepts — not just the order topics appear in a textbook.`;
  return out;
}
function copyPrereqCheckPrompt(){
  const txt=buildPrereqCheckPrompt();
  navigator.clipboard?.writeText(txt).then(()=>setToast("Prompt copied with your live progress")).catch(()=>setToast("Select & copy manually"));
}

/* ============ data export/import ============ */
async function exportData() {
  if (!currentUser) { setToast("Not logged in"); return; }
  setToast("Exporting…");

  try {
    const uid = currentUser.id;
    const [
      { data: profile },
      { data: subjectsData },
      { data: topicsData },
      { data: sessionsData },
      { data: errorsData },
      { data: papersData },
      { data: closeoutData },
      { data: aiUsageData },
      { data: subscriptionData },
    ] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', uid).single(),
      supabase.from('subjects').select('*').eq('user_id', uid),
      supabase.from('topics').select('*').eq('user_id', uid),
      supabase.from('sessions').select('*').eq('user_id', uid),
      supabase.from('errors').select('*').eq('user_id', uid),
      supabase.from('papers').select('*').eq('user_id', uid),
      supabase.from('closeout').select('*').eq('user_id', uid),
      supabase.from('ai_usage').select('*').eq('user_id', uid),
      supabase.from('subscriptions').select('tier,status,expires_at,activated_at').eq('user_id', uid).single(),
    ]);

    const blob = {
      exported_at:  new Date().toISOString(),
      export_version: 1,
      profile,
      subscription: subscriptionData,
      subjects:     subjectsData   || [],
      topics:       topicsData     || [],
      sessions:     sessionsData   || [],
      errors:       errorsData     || [],
      papers:       papersData     || [],
      closeout:     closeoutData   || [],
      ai_usage:     aiUsageData    || [],
    };

    const json = JSON.stringify(blob, null, 2);
    const a = document.createElement('a');
    a.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(json);
    a.download = `sequora-export-${todayStr()}.json`;
    a.click();
    setToast("Export downloaded");
  } catch (err) {
    console.error('[Export]', err);
    setToast("Export failed: " + err.message);
  }
}
async function deleteAccount() {
  const modal = document.getElementById('delete-account-modal');
  if (modal) { modal.classList.remove('hidden'); return; }
  // Fallback if modal not in DOM
  await _doDeleteAccount();
}

async function _doDeleteAccount() {
  const input = document.getElementById('delete-confirm-input');
  const btn   = document.getElementById('delete-confirm-btn');
  const err   = document.getElementById('delete-confirm-error');

  const typed = input?.value?.trim();
  if (typed !== 'DELETE MY ACCOUNT') {
    if (err) err.textContent = 'Type exactly: DELETE MY ACCOUNT';
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = 'Deleting…'; }
  if (err) err.textContent = '';

  try {
    const { data: { session } } = await supabase.auth.getSession();
    const resp = await fetch('/api/gdpr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
      body: JSON.stringify({ confirm: 'DELETE MY ACCOUNT' }),
    });
    const json = await resp.json();
    if (!resp.ok) throw new Error(json.error || 'Deletion failed');

    await supabase.auth.signOut();
    window.location.href = '/';
  } catch (e) {
    if (err) err.textContent = e.message;
    if (btn) { btn.disabled = false; btn.textContent = 'Permanently delete my account'; }
  }
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

/* ============ study-now rule engine ============ */
function whatStudyNow() {
  // Priority 1: spaced recall overdue
  const due = recallDue();
  if (due.length) {
    const d = due[0];
    const overTxt = d.over > 0 ? `${d.over} day${d.over > 1 ? 's' : ''} overdue` : 'due today';
    return {
      verb: 'RECALL',
      subject: d.s,
      topic: d.tp,
      reason: `${overTxt} for spaced recall${due.length > 1 ? ` — ${due.length} topics total due` : ''}`,
      action: 'recall',
    };
  }

  // ranked by % ready ascending
  const ranked = SUBJECTS.map(s => ({ s, ...subjReady(s.key) })).sort((a, b) => a.pct - b.pct);

  // Priority 2: learning topic in weakest subject
  for (const { s, pct } of ranked) {
    const learning = (topics[s.key] || []).filter(t => t.status === 'learning');
    if (learning.length) {
      return {
        verb: 'CONTINUE',
        subject: s,
        topic: learning[0],
        reason: `${learning.length} topic${learning.length > 1 ? 's' : ''} in progress · ${pct}% ready`,
        action: 'subjects',
      };
    }
  }

  // Priority 3: first not-started topic in most-behind subject
  for (const { s, pct } of ranked) {
    const notStarted = (topics[s.key] || []).filter(t => t.status === 'notstarted');
    if (notStarted.length) {
      return {
        verb: 'START',
        subject: s,
        topic: notStarted[0],
        reason: `${pct}% ready — furthest behind`,
        action: 'subjects',
      };
    }
  }

  // Priority 4: all topics ready — find subject with oldest recall
  let oldestSubj = SUBJECTS[0];
  let oldestMs = Infinity;
  for (const s of SUBJECTS) {
    for (const t of (topics[s.key] || [])) {
      const ms = new Date(t.lastRecall || t.readyAt || 0).getTime();
      if (ms < oldestMs) { oldestMs = ms; oldestSubj = s; }
    }
  }
  return {
    verb: 'RECALL',
    subject: oldestSubj,
    topic: null,
    reason: 'All topics exam-ready · maintain with recall',
    action: 'recall',
  };
}

function renderStudyNow() {
  const el = document.getElementById('studyNowResult');
  if (!el) return;

  const rec = whatStudyNow();

  const topicHTML = rec.topic
    ? `<div class="sn-topic">${rec.topic.name}${rec.topic.section ? `<span class="sn-section"> · ${rec.topic.section}</span>` : ''}</div>`
    : '';

  const goBtn = rec.action === 'recall'
    ? `<button class="btn sm" onclick="document.getElementById('recallCard').scrollIntoView({behavior:'smooth'})">Go to recall ↓</button>`
    : `<button class="btn sm" onclick="go('subjects')">Open subjects →</button>`;

  el.innerHTML = `<div class="sn-result">
    <div class="sn-verb">${rec.verb}</div>
    <div class="sn-body">
      <div class="sn-subj">${rec.subject.name}</div>
      ${topicHTML}
      <div class="sn-reason">${rec.reason}</div>
      <div class="sn-actions">${goBtn}</div>
    </div>
  </div>`;
}

/* ============ coverage heatmap ============ */
function renderCoverage(){
  const OVERDUE_DAYS = 21;
  const today = new Date(); today.setHours(0,0,0,0);

  let totAll=0, readyAll=0;
  const grid = document.getElementById("cov-grid");
  if(!grid) return;

  const frag = document.createDocumentFragment();

  for(const s of SUBJECTS){
    const tlist = topics[s.key] || [];
    if(!tlist.length) continue;

    // group by section
    const sections = {};
    for(const t of tlist){
      const sec = t.section || "(General)";
      if(!sections[sec]) sections[sec]=[];
      sections[sec].push(t);
    }

    let subjReady=0;
    const subjEl = document.createElement("div");
    subjEl.className = "cov-subject";

    const header = document.createElement("div");
    header.className = "cov-subj-header";
    const nameEl = document.createElement("span");
    nameEl.className = "cov-subj-name";
    nameEl.textContent = s.name;
    const pctEl = document.createElement("span");
    pctEl.className = "cov-subj-pct";
    header.appendChild(nameEl);
    header.appendChild(pctEl);
    subjEl.appendChild(header);

    for(const [sec, secTopics] of Object.entries(sections)){
      const secLabel = document.createElement("div");
      secLabel.className = "cov-section-label";
      secLabel.textContent = sec;
      subjEl.appendChild(secLabel);

      const squares = document.createElement("div");
      squares.className = "cov-squares";

      for(const t of secTopics){
        totAll++;
        let status = t.status || "notstarted";

        if(status === "ready"){
          readyAll++;
          subjReady++;
          // check overdue: last_recall > OVERDUE_DAYS ago
          if(t.last_recall){
            const lr = new Date(t.last_recall); lr.setHours(0,0,0,0);
            const diff = Math.floor((today - lr) / 86400000);
            if(diff > OVERDUE_DAYS) status = "overdue";
          }
        }

        const sq = document.createElement("div");
        sq.className = "cov-sq";
        sq.dataset.status = status;
        sq.dataset.tip = t.name + (t.section ? " · " + t.section : "");
        sq.title = t.name;

        // click → jump to subjects view, switch to this subject tab
        const subjectKey = s.key;
        sq.addEventListener("click", ()=>{
          go("subjects");
          // activate subject tab
          const tabBtn = document.querySelector(`#subj-tabs button[data-k="${subjectKey}"]`);
          if(tabBtn){ tabBtn.click(); }
          // try scroll to topic
          setTimeout(()=>{
            const allTopicEls = document.querySelectorAll(".topic");
            for(const el of allTopicEls){
              if(el.textContent.includes(t.name)){
                el.scrollIntoView({behavior:"smooth", block:"center"});
                el.style.outline = "2px solid var(--amber)";
                setTimeout(()=>{ el.style.outline=""; }, 1500);
                break;
              }
            }
          }, 80);
        });

        squares.appendChild(sq);
      }
      subjEl.appendChild(squares);
    }

    // update subject % label
    const subjPct = tlist.length ? Math.round(subjReady/tlist.length*100) : 0;
    pctEl.textContent = subjPct + "% ready";

    frag.appendChild(subjEl);
  }

  grid.innerHTML = "";
  grid.appendChild(frag);

  // overall %
  const pctEl = document.getElementById("cov-pct");
  if(pctEl) pctEl.textContent = (totAll ? Math.round(readyAll/totAll*100) : 0) + "%";
}

/* ============ nav ============ */
function go(v){
  document.querySelectorAll("#nav button").forEach(b=>b.classList.toggle("active",b.dataset.v===v));
  ["dash","focus","subjects","week","logs","toolkit","coverage"].forEach(x=>{
    const el = document.getElementById("view-"+x);
    if (el) el.classList.toggle("hidden",x!==v);
  });
  if(v==="dash")renderDash();
  if(v==="focus")renderFocus();
  if(v==="subjects")renderSubjects();
  if(v==="week")renderWeek();
  if(v==="logs"){fillSubjSelects();renderLogs();}
  if(v==="toolkit")renderToolkit();
  if(v==="coverage")renderCoverage();
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
        emailRedirectTo: window.location.origin + '/app'
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

let _authMode = 'signin';
function toggleAuthMode() {
  _authMode = _authMode === 'signin' ? 'signup' : 'signin';
  const isSignup = _authMode === 'signup';
  document.getElementById('signinButtons').style.display = isSignup ? 'none' : 'flex';
  document.getElementById('signupButtons').style.display = isSignup ? 'block' : 'none';
  document.getElementById('loginSubtitle').textContent = isSignup ? 'Create your free account' : 'Sign in to your account';
  document.getElementById('authToggleText').textContent = isSignup ? 'Already have an account?' : 'New here?';
  document.getElementById('authToggleBtn').textContent = isSignup ? 'Sign in' : 'Create account';
  document.getElementById('loginPassword').autocomplete = isSignup ? 'new-password' : 'current-password';
  document.getElementById('loginStatus').textContent = '';
}

async function handleSignup() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const btn = document.getElementById('signupBtn');
  const status = document.getElementById('loginStatus');

  if (!email || !password) { setToast('Enter email and password'); return; }
  if (password.length < 6) { status.textContent = 'Password must be at least 6 characters'; return; }
  if (!supabase) { status.textContent = 'Error: Supabase not configured'; return; }

  btn.disabled = true;
  btn.textContent = 'Creating account...';
  status.textContent = '';

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin + '/app' },
    });
    if (error) {
      status.textContent = 'Error: ' + error.message;
      setToast('Signup failed');
    } else if (data?.session) {
      // Email confirmation disabled — logged in immediately
      handleSession(data.session);
    } else {
      status.textContent = 'Check your email to confirm your account, then sign in.';
      setToast('Check your email!');
    }
  } catch (err) {
    status.textContent = 'Error: ' + err.message;
  } finally {
    btn.disabled = false;
    btn.textContent = 'Create account';
  }
}

async function handleLogout() {
  if (confirm("Log out?")) {
    _burgerProfileCache = null;
    closeBurgerMenu();
    await supabase.auth.signOut();
    ['sq_onboarded'].forEach(k => localStorage.removeItem(k));
    window.location.href = '/';
  }
}

/* ============ AI Advisor Proxy Integration ============ */
async function callGeminiProxy(prompt, callType = 'advisor') {
  const sessionData = await supabase?.auth?.getSession();
  const session = sessionData?.data?.session;
  if (!session) {
    throw new Error("You must be logged in to access AI advisor.");
  }

  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`
    },
    body: JSON.stringify({ prompt, call_type: callType })
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
    const err = new Error(parsed.error || `AI request failed (${response.status})`);
    err.code = parsed.code || null;
    err.limit = parsed.limit || null;
    throw err;
  }

  if (!parsed.response) {
    throw new Error("AI returned empty response");
  }

  return parsed.response;
}

function handleAiError(err) {
  if (err.code === 'UPGRADE_REQUIRED') {
    setToast("AI Advisor requires a paid plan — tap to upgrade");
    window.showUpgradePrompt();
    return;
  }
  if (err.code === 'QUOTA_EXCEEDED') {
    setToast(`Monthly AI limit reached (${err.limit} calls). Resets 1st of next month.`);
    return;
  }
  setToast("AI failed: " + err.message);
  console.error(err);
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
    
    const prompt = `You are a senior Edexcel IGCSE tutor with years of experience getting students to A*. Be direct, professional, and precise. Never sugarcoat — if the student is behind, say so plainly with specifics. No vague motivational filler, no hedging, no padding. Base everything strictly on the actual progress data provided. If you don't have enough data to judge something, say so rather than inventing it.

The student is a private Edexcel IGCSE candidate sitting exams in Nov 2026. Here is their cockpit progress data:

${summary}

Respond ONLY in this exact structure. No preamble, no extra commentary.

STATUS — [one line: where the student stands right now, with the real numbers]

A* OUTLOOK — [one line: on current pace, how likely all-A* is, and what would have to change]

FOCUS NOW — [the 1-2 subjects most at risk, and why]

STUDY TODAY — [the exact chapter(s) to study today, named, by subject — pull from their "next up" topics]

RE-TEST — [any exam-ready topic flagged for recall that they should re-verify, or "none"]

THIS WEEK — [3-4 concrete targets, bulleted, specific to their weak areas]

STRICT RULES:
- Keep each section to 1-2 lines, not paragraphs.
- Total response under 250 words.
- Must be scannable in 15 seconds. Not an essay.
- No introductions, no sign-offs, no filler.`;

    const recommendation = await callGeminiProxy(prompt, 'advisor');

    document.getElementById("aiModalTitle").textContent = "AI Immediate Action Recommendation";
    document.getElementById("aiModalContent").textContent = recommendation;
    document.getElementById("aiModal").classList.remove("hidden");
  } catch (err) {
    handleAiError(err);
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

Provide a brutally honest weekly check-in:
1. VERDICT: One sentence — on track for A* or not? Why?
2. TOP 3 ACTIONS: The 3 highest-impact things to do this week, each one line.

STRICT FORMAT RULES:
- Maximum 120 words total. No exceptions.
- Bullet points only. No paragraphs, no introductions, no filler.
- Skip risks unless they change the actions.`;

    const review = await callGeminiProxy(prompt, 'weekly_checkin');

    document.getElementById("aiModalTitle").textContent = "AI Weekly Readiness Evaluation";
    document.getElementById("aiModalContent").textContent = review;
    document.getElementById("aiModal").classList.remove("hidden");
  } catch (err) {
    handleAiError(err);
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
window.genSummary = genSummary;
window.closeSummary = closeSummary;
window.copySummary = copySummary;
window.downloadSummary = downloadSummary;
window.weekNav = weekNav;
window.addPaper = addPaper;
window.addError = addError;
window.delError = delError;
window.exportData = exportData;
window.deleteAccount = deleteAccount;
window._doDeleteAccount = _doDeleteAccount;
window.resetTopics = resetTopics;
window.go = go;
window.recallPass = recallPass;
window.recallFail = recallFail;
window.toggleCloseout = toggleCloseout;
window.startFromBlock = startFromBlock;
window.copyPrompt = copyPrompt;
window.copyPrereqCheckPrompt = copyPrereqCheckPrompt;
window.cycleStatus = cycleStatus;
window.handleLogin = handleLogin;
window.handlePasswordLogin = handlePasswordLogin;
window.handleSignup = handleSignup;
window.toggleAuthMode = toggleAuthMode;
window.handleLogout = handleLogout;
window.getAIRecommendation = getAIRecommendation;
window.runWeeklyCheckIn = runWeeklyCheckIn;
window.closeAIModal = closeAIModal;

// Onboarding wizard
window.wizNext = wizNext;
window.wizBack = wizBack;
window.wizBoardChange = wizBoardChange;
window.wizNoDateToggle = wizNoDateToggle;
window.wizAddFromTemplate = wizAddFromTemplate;
window.wizAddManual = wizAddManual;
window.wizRemoveSubject = wizRemoveSubject;
window.wizComplete = wizComplete;
window.wizMigrate = wizMigrate;
window.wizSkipMigration = wizSkipMigration;


/* ============ share card ============ */
import html2canvas from 'html2canvas';

function buildShareCardHTML() {
  const today     = todayStr();
  const totalSec  = sessions.filter(s => s.date === today).reduce((a, s) => a + s.dur, 0);
  const totalHrs  = (totalSec / 3600).toFixed(1);
  const streak    = computeStreak();
  const readyPct  = overallReady();
  const dateLabel = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  // Subjects studied today with sec
  const subjMap = {};
  for (const s of sessions.filter(s => s.date === today)) {
    subjMap[s.subject] = (subjMap[s.subject] || 0) + s.dur;
  }
  const maxSec = Math.max(...Object.values(subjMap), 1);
  const subjRows = Object.entries(subjMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key, sec]) => {
      const subj = SUBJECTS.find(s => s.key === key);
      const name  = subj ? subj.name.replace(/\s*\(.*\)/, '').trim() : key;
      const pct   = Math.round((sec / maxSec) * 100);
      const mins  = Math.round(sec / 60);
      const label = mins >= 60 ? `${Math.floor(mins/60)}h${mins%60?` ${mins%60}m`:''}` : `${mins}m`;
      return `<div class="sc-subj-row">
        <div class="sc-subj-name">${name}</div>
        <div class="sc-bar-wrap"><div class="sc-bar-fill" style="width:${pct}%"></div></div>
        <div class="sc-subj-time">${label}</div>
      </div>`;
    }).join('');

  const hasStudied = Object.keys(subjMap).length > 0;

  return `<div class="share-card" id="share-card">
    <div class="sc-glow"></div>
    <div class="sc-top">
      <div class="sc-brand">Sequora Studies</div>
      <div class="sc-date">${dateLabel}</div>
    </div>
    <div class="sc-hero">
      <div class="sc-hero-label">Study time today</div>
      <div>
        <span class="sc-hero-hours">${totalHrs}</span>
        <span class="sc-hero-unit">hrs</span>
      </div>
    </div>
    ${hasStudied ? `<div class="sc-divider"></div><div class="sc-subjects">${subjRows}</div>` : ''}
    <div class="sc-stats">
      <div class="sc-stat">
        <div class="sc-stat-val">${streak}</div>
        <div class="sc-stat-label">🔥 Day streak</div>
      </div>
      <div class="sc-stat">
        <div class="sc-stat-val">${readyPct}%</div>
        <div class="sc-stat-label">📊 Exam ready</div>
      </div>
    </div>
    <div class="sc-footer">Track your exam prep at <span>sequorastudies.com</span></div>
  </div>`;
}

function openShareModal() {
  const modal = document.getElementById('share-modal');
  const wrap  = document.getElementById('share-card-wrap');
  if (!modal || !wrap) return;
  wrap.innerHTML = buildShareCardHTML();
  modal.classList.remove('hidden');
}
window.openShareModal = openShareModal;

function closeShareModal() {
  document.getElementById('share-modal')?.classList.add('hidden');
}
window.closeShareModal = closeShareModal;

async function downloadShareCard() {
  const card = document.getElementById('share-card');
  if (!card) return;
  const btn = document.querySelector('#share-actions .btn.primary');
  if (btn) { btn.disabled = true; btn.textContent = 'Generating…'; }

  try {
    const canvas = await html2canvas(card, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });
    const link = document.createElement('a');
    link.download = `sequora-${todayStr()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (e) {
    setToast('Image export failed: ' + e.message);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '↓ Download PNG'; }
  }
}
window.downloadShareCard = downloadShareCard;

/* ============ theme picker ============ */

function openThemeModal() {
  const modal = document.getElementById('theme-modal');
  if (!modal) return;
  renderThemeGrid();
  syncCustomPickers();
  modal.classList.remove('hidden');
}
window.openThemeModal = openThemeModal;

function closeThemeModal() {
  document.getElementById('theme-modal')?.classList.add('hidden');
}
window.closeThemeModal = closeThemeModal;

function renderThemeGrid() {
  const grid = document.getElementById('theme-preset-grid');
  if (!grid) return;
  const current = getCurrentThemeData();
  grid.innerHTML = Object.entries(THEMES).map(([key, th]) => {
    const v = th.vars;
    const swatches = [
      v['--ink'], v['--ink2'], v['--amber'], v['--paper'], v['--line'],
    ].map(c => `<span class="th-swatch" style="background:${c}"></span>`).join('');
    const active = current.preset === key;
    return `<div class="th-card${active ? ' active' : ''}" onclick="selectPresetTheme('${key}')">
      <div class="th-swatches">${swatches}</div>
      <div class="th-name">${th.label}</div>
      ${active ? '<div class="th-active">Active ✓</div>' : ''}
    </div>`;
  }).join('');
}

window.selectPresetTheme = function(key) {
  const themeData = { preset: key };
  applyTheme(themeData);
  renderThemeGrid();
  saveTheme(themeData).catch(() => {});
  _refreshBurgerSwatches(key);
};

function syncCustomPickers() {
  const fields = readCurrentCustomFields();
  const map = { 'cp-bg': 'bg', 'cp-surface': 'surface', 'cp-accent': 'accent', 'cp-text': 'text', 'cp-border': 'border' };
  for (const [id, key] of Object.entries(map)) {
    const el = document.getElementById(id);
    if (el) el.value = fields[key];
  }
}

let _customSaveTimer = null;
window.onCustomPickerChange = function() {
  const get = id => document.getElementById(id)?.value || '';
  const custom = {
    bg:      get('cp-bg'),
    surface: get('cp-surface'),
    accent:  get('cp-accent'),
    text:    get('cp-text'),
    border:  get('cp-border'),
  };
  const themeData = { preset: 'custom', custom };
  applyTheme(themeData);  // applies to :root + localStorage immediately
  renderThemeGrid();
  clearTimeout(_customSaveTimer);
  _customSaveTimer = setTimeout(() => saveTheme(themeData).catch(() => {}), 800);
};

window.applyCustomTheme = function() {
  const get = id => document.getElementById(id)?.value || '';
  const custom = {
    bg:      get('cp-bg'),
    surface: get('cp-surface'),
    accent:  get('cp-accent'),
    text:    get('cp-text'),
    border:  get('cp-border'),
  };
  const themeData = { preset: 'custom', custom };
  applyTheme(themeData);
  saveTheme(themeData).catch(() => {});
  renderThemeGrid();
  setToast('Custom theme saved');
};

window.resetToDefault = function() {
  const themeData = { preset: 'ascent' };
  applyTheme(themeData);
  saveTheme(themeData).catch(() => {});
  renderThemeGrid();
  syncCustomPickers();
  setToast('Reset to Ascent');
};

/* ============ theme studio ============ */

function _defaultBgState() {
  const cs = getComputedStyle(document.documentElement);
  const bg = cs.getPropertyValue('--bg').trim() || '#12100e';
  const surface = cs.getPropertyValue('--surface').trim() || '#1a1815';
  return {
    type: 'solid', solid: bg,
    linear: { angle: 135, stops: [bg, surface] },
    radial: { x: 50, y: 50, stops: [bg, surface] },
    mesh: { tl: bg, tr: bg, bl: bg, br: bg },
  };
}

let _tsBgState = _defaultBgState();
let _tsTypoState = { display: 'DM Serif Display', body: 'Inter', scale: 'default' };
let _tsImgState = { url: null, x: 50, y: 50, size: 'cover', opacity: 1.0, overlay: true };

function openThemeStudio() {
  closeBurgerMenu();
  const saved = getCurrentThemeData();
  if (saved.bgBuilder) Object.assign(_tsBgState, saved.bgBuilder);
  if (saved.typography) Object.assign(_tsTypoState, saved.typography);
  if (saved.imageBg) Object.assign(_tsImgState, saved.imageBg);
  const drawer = document.getElementById('ts-drawer');
  const overlay = document.getElementById('ts-overlay');
  if (!drawer) return;
  drawer.style.display = 'flex';
  void drawer.offsetWidth;
  overlay.classList.add('ts-vis');
  drawer.classList.add('ts-open');
  renderThemeStudio();
  // restore tab state
  const hasImg = !!_tsImgState.url;
  tsBgTabSwitch(hasImg ? 'image' : 'color');
  setTimeout(() => overlay.addEventListener('click', closeThemeStudio, { once: true }), 0);
}
window.openThemeStudio = openThemeStudio;

function closeThemeStudio() {
  const drawer = document.getElementById('ts-drawer');
  const overlay = document.getElementById('ts-overlay');
  if (!drawer) return;
  drawer.classList.remove('ts-open');
  overlay.classList.remove('ts-vis');
  setTimeout(() => { drawer.style.display = 'none'; }, 320);
}
window.closeThemeStudio = closeThemeStudio;

function renderThemeStudio() {
  _renderTsPresets();
  _renderTsBgBuilder();
  _renderTsImgBuilder();
  _renderTsColorControls();
  _renderTsTypography();
  _renderTsSaveManage();
}

function _renderTsPresets() {
  const el = document.getElementById('ts-preset-grid');
  if (!el) return;
  const current = getCurrentThemeData();
  el.innerHTML = Object.entries(THEMES).map(([key, th]) => {
    const bg = th.vars['--ink2'];
    const accent = th.vars['--amber'];
    const textCol = th.vars['--paper'];
    const active = current.preset === key;
    return `<div class="ts-preset-card${active ? ' ts-active' : ''}" onclick="tsSelectPreset('${key}')" title="${th.label}">
      <div class="ts-preset-bg" style="background:${bg}">
        <div class="ts-preset-dot" style="background:${accent}"></div>
        <div class="ts-preset-name" style="color:${textCol}99">${th.label}</div>
      </div>
      ${active ? '<div class="ts-preset-check">✓</div>' : ''}
    </div>`;
  }).join('');
}

window.tsSelectPreset = function(key) {
  const existing = getCurrentThemeData();
  const td = { preset: key, imagePresets: existing.imagePresets || [], imageBg: existing.imageBg };
  applyTheme(td);
  document.body.style.background = '';
  _tsBgState.type = 'solid';
  _tsBgState.solid = THEMES[key]?.vars['--ink'] || getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#12100e';
  saveTheme(td).catch(() => {});
  setToast(THEMES[key]?.label || key);
  _renderTsPresets();
  _renderTsColorControls();
  _renderTsBgBuilder();
};

function _renderTsBgBuilder() {
  const el = document.getElementById('ts-bg-builder');
  if (!el) return;
  const type = _tsBgState.type;
  const labels = { solid: 'Solid', linear: 'Linear', radial: 'Radial', mesh: 'Mesh' };
  el.innerHTML = `
    <div class="ts-type-tabs">${Object.keys(labels).map(t =>
      `<button class="ts-type-tab${t === type ? ' ts-active' : ''}" onclick="tsBgSetType('${t}')">${labels[t]}</button>`
    ).join('')}</div>
    <div id="ts-bg-inner">${_renderBgInner(type)}</div>`;
}

function _renderBgInner(type) {
  if (type === 'solid') {
    const c = _tsBgState.solid;
    return `<div class="ts-cprow">
      <input type="color" value="${c}" oninput="tsBgSolid(this.value)">
      <input class="ts-hex" value="${c}" maxlength="7" oninput="tsBgSolidHex(this.value)">
    </div>`;
  }
  if (type === 'linear') {
    const def = _defaultBgState(); const { angle = 135, stops = def.linear.stops } = _tsBgState.linear;
    return `<div class="ts-stops">${stops.map((c, i) => `<div class="ts-stoprow">
      <span class="ts-stoplbl">${i + 1}</span>
      <div class="ts-cprow" style="flex:1">
        <input type="color" value="${c}" oninput="tsBgLinStop(${i},this.value)">
        <input class="ts-hex" value="${c}" maxlength="7" oninput="tsBgLinStopHex(${i},this.value)">
      </div>
      ${stops.length > 2 ? `<button class="ts-rm" onclick="tsBgLinRm(${i})">×</button>` : ''}
    </div>`).join('')}</div>
    ${stops.length < 4 ? `<button class="ts-type-tab" onclick="tsBgLinAdd()" style="margin-bottom:10px">+ Stop</button>` : ''}
    <div class="ts-slider-row">
      <span class="ts-slbl">Angle</span>
      <input type="range" min="0" max="360" value="${angle}" oninput="tsBgLinAngle(+this.value);this.nextElementSibling.textContent=this.value+'°'">
      <span class="ts-slval">${angle}°</span>
    </div>`;
  }
  if (type === 'radial') {
    const defR = _defaultBgState(); const { x = 50, y = 50, stops = defR.radial.stops } = _tsBgState.radial;
    return `<div class="ts-stops">${stops.map((c, i) => `<div class="ts-stoprow">
      <span class="ts-stoplbl">${i + 1}</span>
      <div class="ts-cprow" style="flex:1">
        <input type="color" value="${c}" oninput="tsBgRadStop(${i},this.value)">
        <input class="ts-hex" value="${c}" maxlength="7" oninput="tsBgRadStopHex(${i},this.value)">
      </div>
      ${stops.length > 2 ? `<button class="ts-rm" onclick="tsBgRadRm(${i})">×</button>` : ''}
    </div>`).join('')}</div>
    ${stops.length < 4 ? `<button class="ts-type-tab" onclick="tsBgRadAdd()" style="margin-bottom:10px">+ Stop</button>` : ''}
    <div class="ts-slider-row">
      <span class="ts-slbl">X</span>
      <input type="range" min="0" max="100" value="${x}" oninput="tsBgRadX(+this.value);this.nextElementSibling.textContent=this.value+'%'">
      <span class="ts-slval">${x}%</span>
    </div>
    <div class="ts-slider-row">
      <span class="ts-slbl">Y</span>
      <input type="range" min="0" max="100" value="${y}" oninput="tsBgRadY(+this.value);this.nextElementSibling.textContent=this.value+'%'">
      <span class="ts-slval">${y}%</span>
    </div>`;
  }
  if (type === 'mesh') {
    const defM = _defaultBgState(); const { tl = defM.mesh.tl, tr = defM.mesh.tr, bl = defM.mesh.bl, br = defM.mesh.br } = _tsBgState.mesh;
    return `<div class="ts-mesh-grid">${[['tl','Top Left',tl],['tr','Top Right',tr],['bl','Bot Left',bl],['br','Bot Right',br]].map(([k, label, c]) =>
      `<div><div class="ts-mlbl">${label}</div><div class="ts-cprow">
        <input type="color" value="${c}" oninput="tsBgMesh('${k}',this.value)">
        <input class="ts-hex" value="${c}" maxlength="7" oninput="tsBgMeshHex('${k}',this.value)">
      </div></div>`
    ).join('')}</div>`;
  }
  return '';
}

function _applyBg() {
  const t = _tsBgState.type;
  if (t === 'solid') {
    document.body.style.background = _tsBgState.solid || '';
  } else if (t === 'linear') {
    const { angle = 135, stops = [] } = _tsBgState.linear;
    document.body.style.background = `linear-gradient(${angle}deg,${stops.join(',')})`;
  } else if (t === 'radial') {
    const { x = 50, y = 50, stops = [] } = _tsBgState.radial;
    document.body.style.background = `radial-gradient(circle at ${x}% ${y}%,${stops.join(',')})`;
  } else if (t === 'mesh') {
    const { tl, tr, bl, br } = _tsBgState.mesh;
    document.body.style.background = [
      `radial-gradient(ellipse at 0% 0%,${tl} 0%,transparent 60%)`,
      `radial-gradient(ellipse at 100% 0%,${tr} 0%,transparent 60%)`,
      `radial-gradient(ellipse at 0% 100%,${bl} 0%,transparent 60%)`,
      `radial-gradient(ellipse at 100% 100%,${br} 0%,transparent 60%)`,
    ].join(',');
  }
}

window.tsBgSetType = function(t) { _tsBgState.type = t; _renderTsBgBuilder(); _applyBg(); };
window.tsBgSolid = function(v) { _tsBgState.solid = v; const h = document.querySelector('#ts-bg-inner .ts-hex'); if (h) h.value = v; _applyBg(); };
window.tsBgSolidHex = function(v) { if (/^#[0-9a-fA-F]{6}$/.test(v)) { _tsBgState.solid = v; const c = document.querySelector('#ts-bg-inner input[type=color]'); if (c) c.value = v; _applyBg(); } };
window.tsBgLinStop = function(i, v) { _tsBgState.linear.stops[i] = v; _applyBg(); };
window.tsBgLinStopHex = function(i, v) { if (/^#[0-9a-fA-F]{6}$/.test(v)) { _tsBgState.linear.stops[i] = v; _applyBg(); } };
window.tsBgLinAngle = function(v) { _tsBgState.linear.angle = v; _applyBg(); };
window.tsBgLinAdd = function() { _tsBgState.linear.stops.push(getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || '#2a2520'); _renderTsBgBuilder(); _applyBg(); };
window.tsBgLinRm = function(i) { _tsBgState.linear.stops.splice(i, 1); _renderTsBgBuilder(); _applyBg(); };
window.tsBgRadStop = function(i, v) { _tsBgState.radial.stops[i] = v; _applyBg(); };
window.tsBgRadStopHex = function(i, v) { if (/^#[0-9a-fA-F]{6}$/.test(v)) { _tsBgState.radial.stops[i] = v; _applyBg(); } };
window.tsBgRadX = function(v) { _tsBgState.radial.x = v; _applyBg(); };
window.tsBgRadY = function(v) { _tsBgState.radial.y = v; _applyBg(); };
window.tsBgRadAdd = function() { _tsBgState.radial.stops.push(getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || '#2a2520'); _renderTsBgBuilder(); _applyBg(); };
window.tsBgRadRm = function(i) { _tsBgState.radial.stops.splice(i, 1); _renderTsBgBuilder(); _applyBg(); };
window.tsBgMesh = function(k, v) { _tsBgState.mesh[k] = v; const idx = { tl: 0, tr: 1, bl: 2, br: 3 }[k]; const hexEls = document.querySelectorAll('#ts-bg-inner .ts-hex'); if (hexEls[idx]) hexEls[idx].value = v; _applyBg(); };
window.tsBgMeshHex = function(k, v) { if (/^#[0-9a-fA-F]{6}$/.test(v)) { _tsBgState.mesh[k] = v; const idx = { tl: 0, tr: 1, bl: 2, br: 3 }[k]; const cs = document.querySelectorAll('#ts-bg-inner input[type=color]'); if (cs[idx]) cs[idx].value = v; _applyBg(); } };

/* — bg tab switching — */
function tsBgTabSwitch(tab) {
  const colEl = document.getElementById('ts-bg-builder');
  const imgEl = document.getElementById('ts-img-builder');
  const colBtn = document.getElementById('ts-bgtab-color');
  const imgBtn = document.getElementById('ts-bgtab-image');
  if (!colEl || !imgEl) return;
  colEl.classList.toggle('hidden', tab !== 'color');
  imgEl.classList.toggle('hidden', tab !== 'image');
  if (colBtn) colBtn.classList.toggle('ts-active', tab === 'color');
  if (imgBtn) imgBtn.classList.toggle('ts-active', tab === 'image');
}
window.tsBgTabSwitch = tsBgTabSwitch;

/* — image background — */
function _applyImageBg() {
  const el = document.getElementById('bg-image');
  if (!el) return;
  const { url, x, y, size, opacity, overlay } = _tsImgState;
  if (!url) { el.classList.remove('active'); return; }
  const sizeMap = { cover: 'cover', contain: 'contain', fill: '100% 100%', tile: 'auto' };
  const repeatMap = { cover: 'no-repeat', contain: 'no-repeat', fill: 'no-repeat', tile: 'repeat' };
  el.style.backgroundImage = `url(${url})`;
  el.style.backgroundSize = sizeMap[size] || 'cover';
  el.style.backgroundPosition = `${x}% ${y}%`;
  el.style.backgroundRepeat = repeatMap[size] || 'no-repeat';
  el.style.opacity = opacity;
  el.style.setProperty('--img-overlay', overlay ? 'rgba(0,0,0,0.4)' : 'transparent');
  el.classList.add('active');
}

function _persistImageBg() {
  const td = getCurrentThemeData();
  const newTd = { ...td, imageBg: { ..._tsImgState } };
  localStorage.setItem('sq_theme', JSON.stringify(newTd));
  saveTheme(newTd).catch(() => {});
}

async function _uploadAndSetImage(file) {
  if (!currentUser) { setToast('Sign in to save background'); return; }
  if (file.size > 5 * 1024 * 1024) { setToast('Max 5 MB'); return; }
  const statusEl = document.getElementById('ts-img-status');
  if (statusEl) statusEl.textContent = 'Uploading…';
  try {
    const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
    const path = `${currentUser.id}/bg.${ext}`;
    const { error: upErr } = await supabase.storage.from('theme-backgrounds').upload(path, file, { upsert: true, contentType: file.type });
    if (upErr) throw upErr;
    const { data: urlData } = supabase.storage.from('theme-backgrounds').getPublicUrl(path);
    _tsImgState.url = urlData.publicUrl;
    _applyImageBg();
    _persistImageBg();
    _renderTsImgBuilder();
    setToast('Background applied');
  } catch (e) {
    if (statusEl) statusEl.textContent = 'Upload failed: ' + (e.message || e);
  }
}

function _renderTsImgBuilder() {
  const el = document.getElementById('ts-img-builder');
  if (!el) return;
  const { url, x, y, size, opacity, overlay } = _tsImgState;
  const saved = getCurrentThemeData();
  const presets = (saved.imagePresets || []).slice(0, 4);
  el.innerHTML = `
    <div class="ts-img-upload">
      <label class="ts-img-btn" style="cursor:pointer">
        ${url ? '⟳ Replace image' : '↑ Upload image'}
        <input type="file" accept="image/jpeg,image/png,image/webp" style="display:none" onchange="tsImgFileChange(event)">
      </label>
      <div id="ts-img-status" style="font-family:var(--mono);font-size:10px;color:var(--muted);min-height:14px"></div>
      ${url ? `<img class="ts-img-preview" src="${url}" alt="bg preview">` : ''}
      ${presets.length ? `<div class="ts-slabel" style="margin-top:10px;margin-bottom:6px">Saved Image Presets</div>
      <div class="ts-img-preset-grid">${presets.map((p, i) => `
        <div class="ts-img-preset-wrap">
          <img class="ts-img-preset-thumb${p.url === url ? ' ts-active' : ''}" src="${p.url}" title="${escapeHtml(p.name || '')}" onclick="tsImgLoadPreset(${i})">
          <button class="ts-img-preset-del" onclick="tsImgDelPreset(${i})" title="Remove">×</button>
        </div>`).join('')}
      </div>` : ''}
      ${url ? `
      <div class="ts-slabel" style="margin-top:14px;margin-bottom:8px">Position</div>
      <div class="ts-slider-row">
        <span class="ts-slbl">X</span>
        <input type="range" min="0" max="100" value="${x}" oninput="tsImgX(+this.value);this.nextElementSibling.textContent=this.value+'%'">
        <span class="ts-slval">${x}%</span>
      </div>
      <div class="ts-slider-row">
        <span class="ts-slbl">Y</span>
        <input type="range" min="0" max="100" value="${y}" oninput="tsImgY(+this.value);this.nextElementSibling.textContent=this.value+'%'">
        <span class="ts-slval">${y}%</span>
      </div>
      <div class="ts-slabel" style="margin-top:8px;margin-bottom:6px">Size</div>
      <div class="ts-img-size-grid">
        ${['cover','contain','fill','tile'].map(s => `<button class="ts-img-size-btn${size===s?' ts-active':''}" onclick="tsImgSize('${s}')">${s}</button>`).join('')}
      </div>
      <div class="ts-slabel" style="margin-top:10px;margin-bottom:6px">Opacity</div>
      <div class="ts-slider-row">
        <span class="ts-slbl">Opacity</span>
        <input type="range" min="10" max="100" value="${Math.round(opacity*100)}" oninput="tsImgOpacity(+this.value/100);this.nextElementSibling.textContent=this.value+'%'">
        <span class="ts-slval">${Math.round(opacity*100)}%</span>
      </div>
      <label class="ts-img-toggle">
        <input type="checkbox" ${overlay ? 'checked' : ''} onchange="tsImgOverlay(this.checked)">
        Dark overlay (improves readability)
      </label>
      <div style="display:flex;gap:6px;margin-top:8px">
        <button class="ts-save-btn" style="flex:1" onclick="tsImgSavePreset()">Save as preset</button>
        <button class="ts-img-remove" style="flex:1" onclick="tsImgRemove()">Remove</button>
      </div>` : ''}
    </div>`;
}

window.tsImgFileChange = async function(e) {
  const file = e.target.files?.[0];
  if (file) await _uploadAndSetImage(file);
};
window.tsImgX = function(v) { _tsImgState.x = v; _applyImageBg(); _persistImageBg(); };
window.tsImgY = function(v) { _tsImgState.y = v; _applyImageBg(); _persistImageBg(); };
window.tsImgSize = function(v) { _tsImgState.size = v; _applyImageBg(); _persistImageBg(); _renderTsImgBuilder(); };
window.tsImgOpacity = function(v) { _tsImgState.opacity = v; _applyImageBg(); _persistImageBg(); };
window.tsImgOverlay = function(v) { _tsImgState.overlay = v; _applyImageBg(); _persistImageBg(); };
window.tsImgRemove = function() {
  _tsImgState = { url: null, x: 50, y: 50, size: 'cover', opacity: 1.0, overlay: true };
  _applyImageBg();
  _persistImageBg();
  _renderTsImgBuilder();
};
window.tsImgSavePreset = function() {
  if (!_tsImgState.url) return;
  const name = prompt('Name this preset:');
  if (!name) return;
  const td = getCurrentThemeData();
  const presets = (td.imagePresets || []).slice(0, 3);
  presets.push({ name, ..._tsImgState });
  const newTd = { ...td, imagePresets: presets };
  localStorage.setItem('sq_theme', JSON.stringify(newTd));
  saveTheme(newTd).catch(() => {});
  _renderTsImgBuilder();
  setToast(`"${name}" saved`);
};
window.tsImgLoadPreset = function(i) {
  const td = getCurrentThemeData();
  const p = (td.imagePresets || [])[i];
  if (!p) return;
  Object.assign(_tsImgState, p);
  _applyImageBg();
  _persistImageBg();
  _renderTsImgBuilder();
  setToast(`Applied "${p.name}"`);
};
window.tsImgDelPreset = function(i) {
  const td = getCurrentThemeData();
  const newTd = { ...td, imagePresets: (td.imagePresets || []).filter((_, j) => j !== i) };
  localStorage.setItem('sq_theme', JSON.stringify(newTd));
  saveTheme(newTd).catch(() => {});
  _renderTsImgBuilder();
};

/* — color controls — */
const TS_TOKENS = [
  { label: 'Background',   v: '--ink',        m: '--bg' },
  { label: 'Surface',      v: '--ink2',       m: '--surface' },
  { label: 'Surface 2',    v: '--ink3',       m: '--surface-2' },
  { label: 'Primary Text', v: '--paper',      m: '--text' },
  { label: 'Muted Text',   v: '--paper-dim',  m: '--text-dim' },
  { label: 'Accent',       v: '--amber',      m: '--accent' },
  { label: 'Accent Soft',  v: '--amber-soft', m: '--accent-soft' },
  { label: 'Accent Deep',  v: '--amber-deep', m: '--accent-deep' },
  { label: 'Border',       v: '--line',       m: '--border' },
  { label: 'Success',      v: '--green',      m: null },
];

function _toHex6(raw) {
  const v = (raw || '').trim();
  if (/^#[0-9a-fA-F]{6}$/.test(v)) return v;
  if (/^#[0-9a-fA-F]{3}$/.test(v)) return '#' + [v[1]+v[1], v[2]+v[2], v[3]+v[3]].join('');
  const m = v.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (m) return '#' + [m[1], m[2], m[3]].map(n => parseInt(n).toString(16).padStart(2, '0')).join('');
  return '#000000';
}

function _renderTsColorControls() {
  const el = document.getElementById('ts-color-controls');
  if (!el) return;
  const cs = getComputedStyle(document.documentElement);
  el.innerHTML = `<div class="ts-color-grid">${TS_TOKENS.map(({ label, v }) => {
    const hex = _toHex6(cs.getPropertyValue(v));
    return `<div class="ts-crow">
      <div class="ts-clbl">${label}</div>
      <div class="ts-cprow">
        <input type="color" value="${hex}" data-v="${v}" oninput="tsColor('${v}',this.value)">
        <input class="ts-hex" value="${hex}" data-v="${v}" maxlength="7" oninput="tsColorHex('${v}',this.value)">
      </div>
    </div>`;
  }).join('')}</div>`;
}

window.tsColor = function(cssVar, val) {
  const root = document.documentElement;
  root.style.setProperty(cssVar, val);
  const t = TS_TOKENS.find(x => x.v === cssVar);
  if (t?.m) root.style.setProperty(t.m, val);
  const h = document.querySelector(`.ts-hex[data-v="${cssVar}"]`);
  if (h) h.value = val;
  _tsPersistCustom();
};

window.tsColorHex = function(cssVar, val) {
  if (!/^#[0-9a-fA-F]{6}$/.test(val)) return;
  const root = document.documentElement;
  root.style.setProperty(cssVar, val);
  const t = TS_TOKENS.find(x => x.v === cssVar);
  if (t?.m) root.style.setProperty(t.m, val);
  const c = document.querySelector(`input[type=color][data-v="${cssVar}"]`);
  if (c) c.value = val;
  _tsPersistCustom();
};

function _tsPersistCustom() {
  const cs = getComputedStyle(document.documentElement);
  const custom = {};
  TS_TOKENS.forEach(({ v }) => { custom[v] = cs.getPropertyValue(v).trim(); });
  const existing = getCurrentThemeData();
  const td = {
    preset: 'custom',
    custom,
    bgBuilder: { ..._tsBgState },
    typography: { ..._tsTypoState },
    userPresets: (existing.userPresets || []),
    imageBg: { ..._tsImgState },
    imagePresets: existing.imagePresets || [],
  };
  localStorage.setItem('sq_theme', JSON.stringify(td));
  saveTheme(td).catch(() => {});
}

/* — typography — */
const TS_DISPLAY_FONTS = ['DM Serif Display', 'Playfair Display', 'Fraunces', 'Cormorant Garamond', 'Baskervville', 'Georgia'];
const TS_BODY_FONTS = ['Inter', 'Plus Jakarta Sans', 'DM Sans', 'Nunito', 'Source Sans 3'];

function _renderTsTypography() {
  const el = document.getElementById('ts-typo');
  if (!el) return;
  const { display, body, scale } = _tsTypoState;
  el.innerHTML = `
    <div class="ts-font-row">
      <div class="ts-clbl">Display Font</div>
      <select class="ts-font-select" onchange="tsTypoDisplay(this.value)">
        ${TS_DISPLAY_FONTS.map(f => `<option value="${f}"${f === display ? ' selected' : ''}>${f}</option>`).join('')}
      </select>
    </div>
    <div class="ts-font-row">
      <div class="ts-clbl">Body Font</div>
      <select class="ts-font-select" onchange="tsTypoBody(this.value)">
        ${TS_BODY_FONTS.map(f => `<option value="${f}"${f === body ? ' selected' : ''}>${f}</option>`).join('')}
      </select>
    </div>
    <div class="ts-font-row">
      <div class="ts-clbl">Size Scale</div>
      <div class="ts-type-tabs">
        ${['compact', 'default', 'large'].map(s =>
          `<button class="ts-type-tab${s === scale ? ' ts-active' : ''}" onclick="tsTypoScale('${s}')">${s}</button>`
        ).join('')}
      </div>
    </div>
    <div style="margin-top:12px;padding:14px;background:var(--surface);border-radius:6px;border:1px solid var(--border)">
      <div style="font-family:'${display}',serif;font-size:20px;color:var(--text);margin-bottom:5px;line-height:1.2">Sequora Studies</div>
      <div style="font-family:'${body}',sans-serif;font-size:12px;color:var(--text-dim);line-height:1.5">Study tracker · focused project runner.</div>
    </div>`;
}

function _loadFont(name) {
  if (!name || document.querySelector(`link[data-font="${name}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${name.replace(/ /g, '+')}:ital,wght@0,400;0,700;1,400&display=swap`;
  link.dataset.font = name;
  document.head.appendChild(link);
}

window.tsTypoDisplay = function(v) {
  _tsTypoState.display = v; _loadFont(v);
  document.documentElement.style.setProperty('--display', `"${v}",serif`);
  _renderTsTypography(); _tsPersistCustom();
};
window.tsTypoBody = function(v) {
  _tsTypoState.body = v; _loadFont(v);
  document.documentElement.style.setProperty('--body', `"${v}",sans-serif`);
  _renderTsTypography(); _tsPersistCustom();
};
window.tsTypoScale = function(s) {
  _tsTypoState.scale = s;
  document.body.style.fontSize = { compact: '13px', default: '15px', large: '17px' }[s] || '15px';
  _renderTsTypography(); _tsPersistCustom();
};

/* — save & manage — */
function _renderTsSaveManage() {
  const el = document.getElementById('ts-save');
  if (!el) return;
  const ups = getCurrentThemeData().userPresets || [];
  el.innerHTML = `
    <div class="ts-save-row">
      <input id="ts-pname" class="ts-save-input" placeholder="Name this theme…">
      <button class="ts-save-btn" onclick="tsSavePreset()">Save</button>
    </div>
    ${ups.length ? `<div class="ts-clbl" style="margin-bottom:8px">My Presets</div>
    <div>${ups.map((p, i) => `<div class="ts-up-row" onclick="tsLoadPreset(${i})">
      <span class="ts-up-name">${escapeHtml(p.name)}</span>
      <button class="ts-up-del" onclick="event.stopPropagation();tsDelPreset(${i})">×</button>
    </div>`).join('')}</div>` : ''}
    <button class="ts-reset-btn" onclick="tsResetDefault()">↺ Reset to Default</button>`;
}

window.tsSavePreset = function() {
  const inp = document.getElementById('ts-pname');
  const name = inp?.value.trim();
  if (!name) { setToast('Enter a name first'); return; }
  const cs = getComputedStyle(document.documentElement);
  const custom = {};
  TS_TOKENS.forEach(({ v }) => { custom[v] = cs.getPropertyValue(v).trim(); });
  const snapshot = { preset: getCurrentThemeData().preset, custom, bgBuilder: { ..._tsBgState }, typography: { ..._tsTypoState } };
  const td = getCurrentThemeData();
  const newTd = { ...td, userPresets: [...(td.userPresets || []), { name, snapshot }] };
  localStorage.setItem('sq_theme', JSON.stringify(newTd));
  saveTheme(newTd).catch(() => {});
  if (inp) inp.value = '';
  setToast(`"${name}" saved`);
  _renderTsSaveManage();
};

window.tsLoadPreset = function(i) {
  const td = getCurrentThemeData();
  const p = (td.userPresets || [])[i];
  if (!p) return;
  const { snapshot } = p;
  if (snapshot.preset && snapshot.preset !== 'custom') applyTheme({ preset: snapshot.preset });
  if (snapshot.custom) {
    const root = document.documentElement;
    Object.entries(snapshot.custom).forEach(([k, v]) => {
      root.style.setProperty(k, v);
      const t = TS_TOKENS.find(x => x.v === k);
      if (t?.m) root.style.setProperty(t.m, v);
    });
  }
  if (snapshot.bgBuilder) { Object.assign(_tsBgState, snapshot.bgBuilder); _applyBg(); }
  if (snapshot.typography) {
    Object.assign(_tsTypoState, snapshot.typography);
    _loadFont(_tsTypoState.display); _loadFont(_tsTypoState.body);
    document.documentElement.style.setProperty('--display', `"${_tsTypoState.display}",serif`);
    document.documentElement.style.setProperty('--body', `"${_tsTypoState.body}",sans-serif`);
    document.body.style.fontSize = { compact: '13px', default: '15px', large: '17px' }[_tsTypoState.scale] || '15px';
  }
  renderThemeStudio();
  setToast(`Applied "${p.name}"`);
};

window.tsDelPreset = function(i) {
  const td = getCurrentThemeData();
  const newTd = { ...td, userPresets: (td.userPresets || []).filter((_, j) => j !== i) };
  localStorage.setItem('sq_theme', JSON.stringify(newTd));
  saveTheme(newTd).catch(() => {});
  _renderTsSaveManage();
};

window.tsResetDefault = function() {
  applyTheme({ preset: 'ascent' });
  document.body.style.background = '';
  document.body.style.fontSize = '';
  document.documentElement.style.setProperty('--display', '"DM Serif Display",serif');
  document.documentElement.style.setProperty('--body', '"Inter",sans-serif');
  _tsBgState = _defaultBgState();
  _tsTypoState = { display: 'DM Serif Display', body: 'Inter', scale: 'default' };
  _tsImgState = { url: null, x: 50, y: 50, size: 'cover', opacity: 1.0, overlay: true };
  _applyImageBg();
  tsBgTabSwitch('color');
  renderThemeStudio();
  setToast('Reset to Ascent');
};

function _tsRestoreExtra() {
  const td = getCurrentThemeData();
  if (td.bgBuilder) {
    Object.assign(_tsBgState, td.bgBuilder);
    if (_tsBgState.type !== 'solid') _applyBg();
    else if (_tsBgState.solid) document.body.style.background = _tsBgState.solid;
  }
  if (td.imageBg && td.imageBg.url) {
    Object.assign(_tsImgState, td.imageBg);
    _applyImageBg();
  }
  if (td.typography) {
    Object.assign(_tsTypoState, td.typography);
    if (_tsTypoState.display !== 'DM Serif Display') {
      _loadFont(_tsTypoState.display);
      document.documentElement.style.setProperty('--display', `"${_tsTypoState.display}",serif`);
    }
    if (_tsTypoState.body !== 'Inter') {
      _loadFont(_tsTypoState.body);
      document.documentElement.style.setProperty('--body', `"${_tsTypoState.body}",sans-serif`);
    }
    if (_tsTypoState.scale !== 'default') {
      document.body.style.fontSize = { compact: '13px', large: '17px' }[_tsTypoState.scale] || '15px';
    }
  }
}
_tsRestoreExtra();

/* ============ burger menu ============ */

let _burgerProfileCache = null;

function toggleBurgerMenu() {
  const menu = document.getElementById('burger-menu');
  if (!menu) return;
  menu.classList.contains('hidden') ? openBurgerMenu() : closeBurgerMenu();
}
window.toggleBurgerMenu = toggleBurgerMenu;

// Wire burger button via addEventListener (more reliable than onclick in modules)
document.getElementById('burgerBtn')?.addEventListener('click', toggleBurgerMenu);

function openBurgerMenu() {
  const menu = document.getElementById('burger-menu');
  if (!menu) return;
  renderBurgerMenu();
  menu.classList.remove('hidden');
  setTimeout(() => document.addEventListener('click', _burgerOutsideClick), 0);
}

function closeBurgerMenu() {
  const menu = document.getElementById('burger-menu');
  menu?.classList.add('hidden');
  document.removeEventListener('click', _burgerOutsideClick);
}
window.closeBurgerMenu = closeBurgerMenu;

function _burgerOutsideClick(e) {
  const wrap = document.getElementById('burger-wrap');
  if (wrap && !wrap.contains(e.target)) closeBurgerMenu();
}

function _bmSwatchesHtml() {
  const current = getCurrentThemeData();
  return Object.entries(THEMES).map(([key, th]) => {
    const accent = th.vars['--amber'];
    const bg = th.vars['--ink2'];
    const active = current.preset === key;
    return `<div class="bm-swatch${active ? ' active' : ''}"
      style="background:${bg};border-color:${active ? accent : 'transparent'};box-shadow:inset 0 0 0 4px ${accent}"
      title="${th.label}"
      onclick="bmSelectTheme('${key}')"></div>`;
  }).join('');
}

function _bmProfileHtml(prof) {
  const n = escapeHtml((prof && prof.display_name) || '—');
  const e = escapeHtml(currentUser?.email || '');
  const b = escapeHtml((prof && prof.exam_board) || '—');
  const rawDate = (prof && prof.exam_date) || '';
  const dDisplay = rawDate
    ? new Date(rawDate + 'T00:00:00').toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'})
    : '—';
  return `
    <div class="bm-row"><span class="bm-key">Name</span><span class="bm-val" style="cursor:default">${n}</span></div>
    <div class="bm-row"><span class="bm-key">Email</span><span class="bm-val" style="cursor:default;color:var(--muted)">${e}</span></div>
    <div class="bm-row"><span class="bm-key">Board</span><span class="bm-val" style="cursor:default">${b}</span></div>
    <div class="bm-row"><span class="bm-key">Exam date</span><span class="bm-val" style="cursor:default">${dDisplay}</span></div>
    <div style="margin-top:10px"><button class="bm-open-ts" style="font-size:10px;padding:7px 12px" onclick="openEditProfileModal()">Edit profile</button></div>`;
}

function renderBurgerMenu() {
  const menu = document.getElementById('burger-menu');
  if (!menu) return;

  // All synchronous — renders immediately so menu has height
  const totalHrs = hoursFor(() => true).toFixed(1);
  const allTopicsList = topics ? Object.values(topics).flat() : [];
  const topicsReady = allTopicsList.filter(t => t.status === 'ready').length;
  const bestStreak = getBestStreak();
  const papersCount = (papers || []).length;

  menu.innerHTML = `
    <div class="bm-section">
      <div class="bm-section-label">Profile</div>
      <div id="bm-profile-body">${_bmProfileHtml(_burgerProfileCache)}</div>
    </div>
    <div class="bm-divider"></div>
    <div class="bm-section">
      <div class="bm-section-label">Themes</div>
      <button class="bm-open-ts" onclick="closeBurgerMenu();openThemeStudio()">Themes</button>
    </div>
    <div class="bm-divider"></div>
    <div class="bm-section">
      <div class="bm-section-label">Stats</div>
      <div class="bm-stats-grid">
        <div class="bm-stat"><div class="bm-stat-val">${totalHrs}h</div><div class="bm-stat-key">Total studied</div></div>
        <div class="bm-stat"><div class="bm-stat-val">${topicsReady}</div><div class="bm-stat-key">Topics ready</div></div>
        <div class="bm-stat"><div class="bm-stat-val">${bestStreak}</div><div class="bm-stat-key">Best streak</div></div>
        <div class="bm-stat"><div class="bm-stat-val">${papersCount}</div><div class="bm-stat-key">Papers logged</div></div>
      </div>
    </div>
    <div class="bm-divider"></div>
    <div class="bm-section">
      <div class="bm-section-label">Settings</div>
      <div class="bm-settings-placeholder">Notification preferences — coming soon</div>
    </div>
    <div class="bm-divider"></div>
    <div class="bm-section" style="padding-top:10px;padding-bottom:10px">
      <button class="bm-signout" onclick="handleLogout()">Sign out</button>
    </div>`;

  // Async-fill profile only if not cached yet
  if (!_burgerProfileCache && currentUser) {
    supabase
      .from('profiles')
      .select('display_name,exam_board,exam_date')
      .eq('id', currentUser.id)
      .single()
      .then(({ data }) => {
        _burgerProfileCache = data || {};
        const body = document.getElementById('bm-profile-body');
        if (body) body.innerHTML = _bmProfileHtml(_burgerProfileCache);
      })
      .catch(() => { _burgerProfileCache = {}; });
  }
}

function _refreshBurgerSwatches(activeKey) {
  document.querySelectorAll('.bm-swatch').forEach(el => {
    const isActive = el.title === (THEMES[activeKey]?.label || activeKey);
    el.classList.toggle('active', isActive);
    el.style.borderColor = isActive ? (THEMES[activeKey]?.vars['--amber'] || 'var(--accent)') : 'transparent';
  });
}

window.bmSelectTheme = function(key) {
  const themeData = { preset: key };
  applyTheme(themeData);
  saveTheme(themeData).catch(() => {});
  _refreshBurgerSwatches(key);
  setToast(THEMES[key]?.label || key);
};

window.openEditProfileModal = function() {
  closeBurgerMenu();
  const modal = document.getElementById('ep-modal');
  if (!modal) return;
  const prof = _burgerProfileCache || {};
  document.getElementById('ep-name').value = prof.display_name || '';
  document.getElementById('ep-board').value = prof.exam_board || '';
  document.getElementById('ep-date').value = prof.exam_date || '';
  document.getElementById('ep-status').textContent = '';
  modal.classList.remove('hidden');
};

window.closeEditProfileModal = function() {
  document.getElementById('ep-modal')?.classList.add('hidden');
};

window.saveEditProfile = async function() {
  const name = document.getElementById('ep-name').value.trim();
  const board = document.getElementById('ep-board').value.trim();
  const date = document.getElementById('ep-date').value;
  const statusEl = document.getElementById('ep-status');
  statusEl.textContent = 'Saving…';
  try {
    await updateProfile({ display_name: name, exam_board: board, exam_date: date || null });
    if (!_burgerProfileCache) _burgerProfileCache = {};
    _burgerProfileCache.display_name = name;
    _burgerProfileCache.exam_board = board;
    _burgerProfileCache.exam_date = date;
    if (date) { examDate = date; renderDash(); }
    window.closeEditProfileModal();
    setToast('Profile updated');
  } catch {
    statusEl.textContent = 'Failed to save. Try again.';
  }
};

/* ============ boot ============ */
updateClock();
setInterval(updateClock,30000);
renderDash();

function showApp() {
  document.getElementById("loginScreen").classList.add("hidden");
  hideOnboarding();
  document.getElementById("authHeader").style.display = "flex";
  document.getElementById("userEmail").textContent = currentUser?.email || "";
  // Resume any pending sync from previous offline session
  if (localStorage.getItem('sq_sync_pending')) {
    if (navigator.onLine) triggerSync();
    else updateSyncStatus('offline');
  }
  loadStateFromSupabase().catch(err => {
    console.error("[Auth] Background data load failed (app still usable):", err);
  });
}

// Exposed so onboarding.js can call it after wizard completes
window.__showApp = showApp;

async function handleSession(session) {
  if (session && session.user) {
    currentUser = session.user;
    _burgerProfileCache = null; // force fresh fetch on next open

    // Always hide login screen first — user IS authenticated
    document.getElementById("loginScreen").classList.add("hidden");

    // Fetch subscription tier (non-blocking)
    getSubscription().then(sub => {
      userTier = sub?.tier ?? 'free';
      setSubjectsViewTier(userTier);
    }).catch(() => { userTier = 'free'; });

    // Sync theme from DB (non-blocking) — localStorage already applied above
    loadThemeFromDB().then(dbTheme => {
      if (dbTheme) {
        applyTheme(dbTheme);
      } else {
        // No theme in DB → reset to Ascent and clear stale localStorage
        localStorage.removeItem('sq_theme');
        applyTheme({ preset: 'ascent' });
      }
    }).catch(() => {});

    // Check onboarded_at — use localStorage cache to avoid DB round-trip on reload
    const cached = localStorage.getItem('sq_onboarded');
    if (cached === '1') {
      showApp();
      return;
    }

    // Not cached — check DB
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarded_at')
        .single();

      if (profile?.onboarded_at) {
        localStorage.setItem('sq_onboarded', '1');
        showApp();
      } else {
        showOnboarding();
      }
    } catch (err) {
      console.error("[Auth] Profile check failed:", err);
      // Fallback: show onboarding to be safe
      showOnboarding();
    }

  } else {
    currentUser = null;
    userTier = 'free';
    localStorage.removeItem('sq_onboarded');
    hideOnboarding();
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
