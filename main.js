import { supabase } from './src/lib/supabase.js';
import {
  THEMES, applyTheme, loadSavedTheme, resetTheme,
  getCurrentThemeData, buildCustomVars, readCurrentCustomFields, hexToRgb,
} from './src/lib/theme.js';
import { saveTheme, loadThemeFromDB, updateProfile, getProfile } from './src/data/profiles.js';
import {
  showOnboarding,
  hideOnboarding,
  wizNext, wizBack, wizQualChange, wizBoardChange, wizNoDateToggle,
  wizAddFromTemplate, wizAddManual, wizRemoveSubject, wizComplete,
  wizMigrate, wizSkipMigration, wizSkip,
} from './src/auth/onboarding.js';
import { QUAL_BOARDS, resolveQualBoard, formatQualBoard, isMbbs, NO_DATE_QUALS } from './src/lib/qualboards.js';
import { getSubscription, submitBkashPayment } from './src/data/subscriptions.js';
import { initSubjectsView, setSubjectsViewTier, getActiveSubjectId } from './src/views/subjects-view.js';
import { getSubjects } from './src/data/subjects.js';
import { getAllTopics, markRecallPass, markRecallFail } from './src/data/topics.js';
import { hasLegacyData, migrateFromStudyState } from './src/data/migration.js';
import { createSession, getSessions } from './src/data/sessions.js';
import { createPaper, getPapers, deletePaper } from './src/data/papers.js';
import { createError, getErrors, deleteError } from './src/data/errors.js';
import {
  searchUsers, sendFriendRequest, getPendingRequests,
  acceptFriendRequest, declineFriendRequest, removeFriend,
  getFriendsLeaderboard, getExistingRelationship, getFriendsLastActivity,
} from './src/data/friends.js';
import { BONES, BONE_REGIONS } from './src/data/bones.js';
import { BONE_DIAGRAMS } from './src/data/bone-diagrams.js';
import { MUSCLES, MUSCLE_REGIONS, MUSCLE_MODEL_ID, MUSCLE_MODEL_CREDIT } from './src/data/muscles.js';
import { MUSCLE_DIAGRAMS } from './src/data/muscle-diagrams.js';
import { buildMuscleAttachment } from './src/data/muscle-attachments.js';
import { getMuscleRecall, markMusclePass, markMuscleFail, isMuscleDue, MASTERED_AT } from './src/data/muscle-recall.js';
import { getPastPapersForCode, filterIBPapers } from './src/data/past-papers.js';
import { TOPIC_VISUALS, getTopicVisualsKey } from './src/data/topic-visuals.js';
import { TOPIC_SVGS as CAM_SVGS } from './src/data/topic-svgs-igcse-cambridge.js';
import { EDEXCEL_TOPIC_SVGS } from './src/data/topic-svgs-igcse-edexcel.js';
import { TOPIC_SVGS_ALEVEL_CAMBRIDGE } from './src/data/topic-svgs-alevel-cambridge.js';
import { TOPIC_SVGS_ALEVEL_EDEXCEL } from './src/data/topic-svgs-alevel-edexcel.js';
import { TOPIC_SVGS_IB } from './src/data/topic-svgs-ib.js';
import { TOPIC_SVGS_MBBS } from './src/data/topic-svgs-mbbs.js';
const TOPIC_SVGS = { ...CAM_SVGS, ...EDEXCEL_TOPIC_SVGS, ...TOPIC_SVGS_ALEVEL_CAMBRIDGE, ...TOPIC_SVGS_ALEVEL_EDEXCEL, ...TOPIC_SVGS_IB, ...TOPIC_SVGS_MBBS };

// Apply theme + font scale from localStorage immediately — avoids FOUC before auth resolves
loadSavedTheme();
(function(){
  const s=localStorage.getItem('sq_font_scale');
  if(s&&s!=='default') document.documentElement.style.fontSize={compact:'13px',large:'17px'}[s]||'15px';
})();

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
let userTier = 'free';   // updated after login from subscriptions table — values: 'free' | 'paid_1' | 'paid_2' | 'paid_3'

function isPro() { return userTier === 'paid_1' || userTier === 'paid_2' || userTier === 'paid_3'; }

function requiresPro(featureName) {
  if (!isPro()) { showPaywall(featureName); return true; }
  return false;
}

window.showPaywall = function(featureName, minTier = 'paid_1') {
  const existing = document.getElementById('sq-paywall-modal');
  if (existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.id = 'sq-paywall-modal';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;padding:20px';
  const tierInfo = { paid_1: { label: 'Sequora Basic', price: '149' }, paid_2: { label: 'Sequora Plus', price: '299' }, paid_3: { label: 'Sequora Pro', price: '499' } }[minTier] || { label: 'Sequora Basic', price: '149' };
  const feat = featureName ? `<b style="color:var(--text,#f4ece0)">${escapeHtml(featureName)}</b> requires ${tierInfo.label}. ` : '';
  overlay.innerHTML = `<div style="background:var(--ink2,#1a1815);border:1px solid var(--border,#332d26);border-radius:12px;padding:28px 32px;max-width:360px;width:100%;text-align:center">
    <div style="font-size:26px;margin-bottom:10px">⭐</div>
    <div style="font-family:var(--display,'Fraunces',serif);font-size:20px;color:var(--accent,#e8a33d);margin-bottom:8px">${tierInfo.label}</div>
    <div style="font-size:14px;color:var(--text-dim,#9b9184);margin-bottom:20px">${feat}Upgrade for <b style="color:var(--text,#f4ece0)">BDT ${tierInfo.price}/month</b>.</div>
    <div style="display:flex;gap:10px;justify-content:center">
      <button id="sq-paywall-upgrade" style="background:var(--accent,#e8a33d);color:#12100e;border:none;border-radius:8px;padding:10px 22px;font-family:var(--mono,'JetBrains Mono',monospace);font-size:13px;font-weight:700;cursor:pointer">Upgrade</button>
      <button id="sq-paywall-close" style="background:transparent;border:1px solid var(--border,#332d26);border-radius:8px;padding:10px 22px;font-family:var(--mono,'JetBrains Mono',monospace);font-size:13px;color:var(--text-dim,#9b9184);cursor:pointer">Maybe later</button>
    </div>
  </div>`;
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  overlay.querySelector('#sq-paywall-upgrade').addEventListener('click', () => { overlay.remove(); showUpgradePrompt(); });
  overlay.querySelector('#sq-paywall-close').addEventListener('click', () => overlay.remove());
  document.body.appendChild(overlay);
};
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

// Retired: every real feature now reads/writes the normalized tables
// directly (subjects/topics/sessions/papers/errors) instead of round-
// tripping through the study_state JSONB blob. This used to debounce a
// push of the entire local state to that blob on every localStorage
// write; kept as a no-op (rather than deleted outright) since Store.set/
// Store.del/loadStateFromSupabase still call it and a handful of legacy-
// only code paths (cycleStatus, resetTopics) still exist as dead code.
function triggerSync() {}

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
const subjName=k=>{const dyn=_timerSubjects.find(s=>s.key===k);if(dyn)return dyn.name;return(SUBJECTS.find(s=>s.key===k)||{}).name||k;};

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
let _timerSubjects=[]; // dynamic subjects from Supabase [{key:id,name}]; empty = use hardcoded SUBJECTS fallback
let _sbCache = { subjects: [], allTopics: [], papers: [], errors: [], sessions: [] }; // Supabase-backed cache for coverage map + progress tracker

// IB Core subjects are excluded from % readiness calculations (TOK, EE, CAS)
// Mirrors _isIBCore() in subjects-view.js — uses level=Core or known exam codes
const IB_CORE_CODES = new Set(['IB-TOK', 'IB-EE', 'IB-CAS']);
function isIbCore(subj) {
  if (!subj) return false;
  if (subj.level === 'Core') return true;
  const c = (subj.exam_code || '').toUpperCase();
  return IB_CORE_CODES.has(c);
}
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
 ["Learn a topic","Act as a [my exam board/qualification] [subject] examiner. Teach me [topic] for spec [code]. Structure: (1) core concepts I must know, (2) the 3 most common ways it's tested, (3) exact key terms I lose marks for omitting, (4) a worked top-mark answer. Keep it tight — I'm revising, not reading a textbook."],
 ["⭐ Mark my answer","You are a [my exam board/qualification] [subject] examiner. Here is the official mark scheme: [paste]. Here is my answer: [paste]. Mark it strictly against the scheme. Give my exact mark, where I lost marks and why, then rewrite my weakest paragraph to top-grade standard so I can see the gap."],
 ["Crack evaluation Qs","Give me a [my exam board/qualification]-style 12-mark 'evaluate' question on [topic]. Then show the ideal structure — point, explanation, chain of reasoning, counter-argument, justified conclusion — with the exact phrases that signal evaluation to an examiner."],
 ["Quiz me (active recall)","Quiz me on [topic] with 10 increasingly hard exam-style questions, one at a time. After each, tell me if I'm right and why. At the end, list the sub-areas I'm weakest in and what to revise."],
 ["Generate a topic list","Using the attached [my exam board/qualification] [subject] ([code]) specification, list every topic and sub-topic as an exhaustive checklist, grouped by the spec's sections. One sub-topic per line, no commentary — I'm pasting these into a tracker."],
 ["Order a topic list","Take this topic list and put it in the best LEARNING ORDER for someone starting from scratch. Rules: foundational topics everything depends on first; topics needing a prerequisite after it; self-contained topics anywhere. Output a numbered order with one line each on why it's placed there."],
 ["Feynman — find the holes","You are a curious 12-year-old. I'll explain [topic]. Keep asking 'but why?' and poke at anything vague until I explain it in plain words or admit I don't understand it."],
 ["Flashcard generator","You are helping me revise for [my exam board/qualification]. Create spaced-repetition flashcards (question on front, concise answer on back) for the topic: [ TOPIC ]. Base them on the attached textbook source. Cover every key definition, formula, and fact I'd be tested on. Format as a clean Q/A list I can copy into Anki."],
 ["Five exam questions","Act as a [my exam board/qualification] examiner. Generate 5 exam-style questions on: [ TOPIC ], at genuine exam difficulty and in the style of real past papers. Number them, include mark allocations. Then wait — I'll answer, and you mark me strictly against how an examiner would, showing where I lost marks."],
 ["Explain my mistake","I got this question wrong on the topic [ TOPIC ]. Here's the question and my [ PASTE ]. Explain clearly why it's wrong and what the correct approach is. Then give me 2 similar questions to retry so I can prove I've fixed the gap."],
 ["Mark-scheme decoder","Here is a past exam question and its official mark scheme for [ TOPIC ]: [ PASTE ]. Decode exactly what the examiner rewards — the specific points, keywords, and structure that earn marks. Tell me what most students miss and how to phrase answers to capture full marks."],
 ["Weak-topic diagnostic","Quiz me hard on [ TOPIC ] for [my exam board/qualification] — 10 increasingly difficult questions, one at a time, waiting for my answer each time. At the end, pinpoint my weakest sub-areas and tell me exactly what to drill."],
];
const TACTICS=[
 ["Mark scheme = your textbook","Read it BEFORE answering. It tells you the exact words examiners reward. Write what scores, not what you know."],
 ["Question-spotting is real","Exam boards recycle question types. After 5 yrs of papers, pre-build an answer for each recurring one. Walk in having rehearsed 80% of the paper."],
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
// Real-table equivalents — filterFn receives a real sessions row (study_date/duration_sec)
function hoursForSb(filterFn){let s=0;for(const x of _sbCache.sessions)if(filterFn(x))s+=x.duration_sec;return s/3600;}
function computeStreakSb(){
  const days=new Set(_sbCache.sessions.map(s=>s.study_date));
  const today=todayStr();
  const yesterday=dateOff(-1);
  if(!days.has(today)&&!days.has(yesterday)) return 0;
  let streak=0;
  const d=new Date();d.setHours(0,0,0,0);
  if(!days.has(today)) d.setDate(d.getDate()-1);
  while(true){
    const ds=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
    if(days.has(ds)){streak++;d.setDate(d.getDate()-1);}else break;
  }
  return streak;
}
function isGraceDaySb(){const days=new Set(_sbCache.sessions.map(s=>s.study_date));return !days.has(todayStr())&&days.has(dateOff(-1))&&!days.has(dateOff(-2));}
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

// Compute longest consecutive day streak from a Set of date strings ('YYYY-MM-DD')
function _computeBestStreak(dateSet){
  if(!dateSet.size)return 0;
  const sorted=[...dateSet].sort();
  let best=1,cur=1;
  for(let i=1;i<sorted.length;i++){
    const prev=new Date(sorted[i-1]);const curr=new Date(sorted[i]);
    const diff=Math.round((curr-prev)/86400000);
    if(diff===1){cur++;if(cur>best)best=cur;}else cur=1;
  }
  return best;
}

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
function subjReady(k){const t=topics[k]||[];const tot=t.length;const r=t.filter(x=>x.status==="ready"||x.status==="mastered").length;return{tot,r,pct:tot?Math.round(r/tot*100):0};}
function overallReady(){
  if(_sbCache.subjects.length){
    let tot=0,r=0;
    for(const subj of _sbCache.subjects){
      if(isIbCore(subj))continue;
      const tl=_sbCache.allTopics.filter(t=>t.subject_id===subj.id);
      tot+=tl.length;
      r+=tl.filter(t=>t.status==='ready'||t.status==='mastered').length;
    }
    return tot?Math.round(r/tot*100):0;
  }
  // fallback: legacy localStorage system
  let tot=0,r=0;for(const s of SUBJECTS){const x=subjReady(s.key);tot+=x.tot;r+=x.r;}return tot?Math.round(r/tot*100):0;
}
function nextTopic(k){const t=topics[k]||[];return t.find(x=>x.status!=="ready"&&x.status!=="mastered")||null;}
function weakestSubjects(n){return SUBJECTS.map(s=>({s,pct:subjReady(s.key).pct})).sort((a,b)=>a.pct-b.pct).slice(0,n);}

// Real-table equivalents — subj is a row from _sbCache.subjects, not a legacy key
function nextTopicSb(subj){
  const t=_sbCache.allTopics.filter(x=>x.subject_id===subj.id).sort((a,b)=>(a.position??0)-(b.position??0));
  return t.find(x=>x.status!=="ready"&&x.status!=="mastered")||null;
}
function weakestSubjectsSb(n){
  return _sbCache.subjects.filter(s=>!isIbCore(s)).map(s=>({s,pct:subjReadySb(s).pct})).sort((a,b)=>a.pct-b.pct).slice(0,n);
}

/* ============ today's cross-subject plan ============ */
const TIME_SLOTS=["7:30","10:00","12:15","3:00"];
function buildTodayBlocks(){
  const dow=new Date().getDay();
  const weekend=(dow===0||dow===6);
  const el=document.getElementById("todayBlocks");
  const mode=document.getElementById("dayMode");
  if (!el || !mode) return;
  el.innerHTML="";
  const subs=_sbCache.subjects.filter(s=>!isIbCore(s));
  if(!subs.length){
    mode.textContent="Add subjects to get a personalized daily plan.";
    addBlockEl(el,{time:"—",s:"No subjects yet",t:"Add a subject in the Subjects tab and this plan builds itself around your real syllabus.",hint:""},false);
    return;
  }
  if(weekend){
    mode.textContent="Weekend — past papers + repairing weak topics. New content waits for weekdays.";
    const weak=weakestSubjectsSb(3);
    const b1={time:"Morning",s:"Full past paper (timed)",t:"Sit one timed paper, no notes, phone away. Then mark it against the scheme and log mistakes.",hint:"Pick the subject you've done least practice in"};
    addBlockEl(el,b1,false);
    weak.forEach((w,i)=>{
      const nt=nextTopicSb(w.s);
      addBlockEl(el,{time:i===0?"Repair":"·",s:w.s.name+"  ("+w.pct+"% ready)",t:nt?("Re-drill weak area — next: <b>"+escapeHtml(nt.name)+"</b>"):"All topics ready — do a paper instead",hint:"Weekend = fix what the week exposed",key:w.s.id},false);
    });
    addBlockEl(el,{time:"Eve",s:"Anki review + update trackers",t:"Clear your Anki queue, mark this week's topics honestly, glance at next week.",hint:"Light — rest is part of the plan"},false);
    return;
  }
  mode.textContent="Weekday — deep blocks for new content, assigned by what's weakest first.";
  // Weakest subjects get the sharpest hours. With more subjects than slots,
  // the 4th+ rotate through the last slot by day so everyone gets covered.
  const ranked=weakestSubjectsSb(subs.length);
  const dayNum=daysBetween(parseD(DAY1),new Date());
  const deepCount=Math.min(3,ranked.length);
  const labels=["Deep 1 · sharpest hours","Deep 2","Deep 3 · concept work"];
  const hints=["Weakest subject — gets your best hours every day","Second-weakest — front-loaded while focus is high","Third-weakest — evaluation marks decide A*"];
  for(let i=0;i<deepCount;i++){
    const w=ranked[i];
    const nt=nextTopicSb(w.s);
    addBlockEl(el,{
      time:TIME_SLOTS[i], s:escapeHtml(w.s.name)+" — "+labels[i],
      t:nt?("Study next: <b>"+(nt.section?escapeHtml(nt.section)+" · ":"")+escapeHtml(nt.name)+"</b>"):"All topics Exam-ready — switch to timed past papers",
      hint:hints[i], key:w.s.id
    },false);
  }
  // Lighter last block: 4th-weakest subject if one exists, else past-paper
  // practice, alternating with the remaining subjects (5th+) by day so a
  // user with many subjects still gets rotation instead of the same 4 forever.
  const rest=ranked.slice(3);
  let b4block;
  if(rest.length && dayNum%2===0){
    const w=rest[dayNum%rest.length];
    const nt=nextTopicSb(w.s);
    b4block={time:"3:00",s:escapeHtml(w.s.name)+" — Block 4 (lighter)",t:nt?("Study next: <b>"+escapeHtml(nt.name)+"</b>"):"All topics ready — do a paper",hint:"Rotates through your other subjects",key:w.s.id};
  } else {
    b4block={time:"3:00",s:"Past-paper practice (lighter)",t:"Work a few past-paper questions on a topic you just learned — retrieval under mild pressure.",hint:"Block 4 alternates with your other subjects"};
  }
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
function startFromBlock(key){
  // key is a real subject UUID (blocks now come from _sbCache.subjects directly)
  curTimerSubject=key;go('focus');renderTimerSubjects();setToast("Subject set: "+subjName(key));
}

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
  const todayH=hoursForSb(s=>s.study_date===todayStr());
  const todayHrsEl = document.getElementById("todayHrs");
  if (todayHrsEl){todayHrsEl.textContent=todayH.toFixed(1);const ts=todayHrsEl.closest('.stat');if(ts)ts.style.setProperty('--prog',Math.min(100,todayH/5.5*100).toFixed(0)+'%');}
  const weekH=hoursForSb(s=>parseD(s.study_date).getTime()>=sw);
  const weekHrsEl = document.getElementById("weekHrs");
  if (weekHrsEl){weekHrsEl.textContent=weekH.toFixed(1);const ws=weekHrsEl.closest('.stat');if(ws)ws.style.setProperty('--prog',Math.min(100,weekH/28*100).toFixed(0)+'%');}
  const streak=computeStreakSb();
  const grace=isGraceDaySb();
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
  renderTodos();
  renderFlags();
  renderStudyNow();
  if (typeof renderAnalytics === 'function') renderAnalytics();
}
function renderDashProgress(){
  const el=document.getElementById("dashProgress");
  if(!el)return;
  el.innerHTML="";
  if(_sbCache.subjects.length){
    // Supabase-backed: show user's actual subjects, exclude IB Core
    const nonCore=_sbCache.subjects.filter(s=>!isIbCore(s));
    if(!nonCore.length){el.innerHTML='<div class="empty">Add subjects to get started</div>';return;}
    for(const subj of nonCore){
      const tl=_sbCache.allTopics.filter(t=>t.subject_id===subj.id);
      const tot=tl.length;
      const r=tl.filter(t=>t.status==='ready'||t.status==='mastered').length;
      const pct=tot?Math.round(r/tot*100):0;
      const nt=tl.find(t=>t.status!=='ready'&&t.status!=='mastered');
      const div=document.createElement("div");div.className="subj-prog";
      div.innerHTML=`<div class="top"><span class="nm">${escapeHtml(subj.name)} <span class="cnt">· next: ${nt?escapeHtml(nt.name):"✓ all ready"}</span></span><span class="pc">${pct}%</span></div><div class="bar"><i style="width:${pct}%"></i></div>`;
      el.appendChild(div);
    }
    return;
  }
  // Fallback: legacy localStorage subjects
  for(const s of SUBJECTS){
    const x=subjReady(s.key);const nt=nextTopic(s.key);
    const div=document.createElement("div");div.className="subj-prog";
    div.innerHTML=`<div class="top"><span class="nm">${s.name} <span class="cnt">· next: ${nt?nt.name:"✓ all ready"}</span></span><span class="pc">${x.pct}%</span></div><div class="bar"><i style="width:${x.pct}%"></i></div>`;
    el.appendChild(div);
  }
}

/* ============ analytics ============ */
let _momentumChart = null;
let _masteryChart = null;

function renderAnalytics() {
  const momentumCanvas = document.getElementById('momentumChart');
  const masteryCanvas = document.getElementById('masteryChart');
  if (!momentumCanvas || !masteryCanvas || typeof Chart === 'undefined') return;

  const today = new Date();
  today.setHours(0,0,0,0);
  const labels = [];
  const hoursData = [];
  
  const localDateStr = (d) => {
    return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
  };

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = localDateStr(d);
    labels.push(d.toLocaleDateString('en-GB', { weekday: 'short' }));
    
    let seconds = 0;
    if (typeof sessions !== 'undefined') {
       for(const s of sessions) {
         if (s.date === dateStr) seconds += s.dur;
       }
    }
    hoursData.push((seconds / 3600).toFixed(2));
  }

  let notStarted = 0, learning = 0, ready = 0, mastered = 0;
  if (typeof _sbCache !== 'undefined' && _sbCache.allTopics && _sbCache.allTopics.length) {
    for (const t of _sbCache.allTopics) {
      if (t.status === 'mastered') mastered++;
      else if (t.status === 'ready') ready++;
      else if (t.status === 'learning') learning++;
      else notStarted++;
    }
  } else if (typeof topics !== 'undefined') {
    for (const subj in topics) {
      for (const t of topics[subj]) {
        if (t.status === 'mastered') mastered++;
        else if (t.status === 'ready') ready++;
        else if (t.status === 'learning') learning++;
        else notStarted++;
      }
    }
  }

  const textCol = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#f0ede8';
  const mutedCol = getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#585450';
  const borderCol = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || '#2a2820';
  const accentCol = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#F2DFA8';

  Chart.defaults.color = mutedCol;
  Chart.defaults.font.family = '"Inter", sans-serif';

  if (_momentumChart) _momentumChart.destroy();
  _momentumChart = new Chart(momentumCanvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Hours',
        data: hoursData,
        backgroundColor: accentCol,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: borderCol } },
        x: { grid: { display: false } }
      }
    }
  });

  if (_masteryChart) _masteryChart.destroy();
  _masteryChart = new Chart(masteryCanvas, {
    type: 'doughnut',
    data: {
      labels: ['Not Started', 'Learning', 'Ready', 'Mastered'],
      datasets: [{
        data: [notStarted, learning, ready, mastered],
        backgroundColor: ['#1a1814', '#D4B878', 'rgba(74,222,128,0.4)', 'rgba(250,204,21,0.55)'],
        borderColor: borderCol,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right', labels: { color: textCol, boxWidth: 12 } }
      },
      cutout: '70%'
    }
  });
}

/* ============ spaced-recall engine — 2-4-7 method ============ */
const RECALL_STEPS=[2,4,7]; // days after each recall: 2d → 4d → 7d → mastered
const RECALL_STAGE_LABELS=["1st recall","2nd recall","final recall"];
// Real-table equivalent of recallDue() — same 2-4-7 staging logic used by
// getStudyNowCandidates(), against _sbCache instead of the legacy topics blob.
function recallDueSb(){
  const today=new Date(); today.setHours(0,0,0,0);
  const due=[];
  for(const tp of _sbCache.allTopics){
    if(tp.status!=="ready")continue;
    const reps=tp.recall_reps||0;
    if(reps>=RECALL_STEPS.length)continue; // all 3 recalls done — should be mastered
    const base=new Date(tp.last_recall||tp.ready_at);
    if(isNaN(base.getTime()))continue;
    base.setHours(0,0,0,0);
    const elapsed=Math.floor((today-base)/86400000);
    const step=RECALL_STEPS[reps];
    if(elapsed>=step){
      const s=_sbCache.subjects.find(x=>x.id===tp.subject_id)||{id:tp.subject_id,name:tp.subjects?.name||'Unknown'};
      due.push({s,tp,over:elapsed-step,reps});
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
  const due=recallDueSb();
  list.innerHTML="";
  if(!due.length){
    title.textContent="Nothing due yet";
    card.style.borderColor="var(--line)";
    list.innerHTML='<div class="empty">As topics age, they\'ll appear here for a cold recall check. 2-4-7 method: 2d → 4d → 7d → mastered.</div>';
    return;
  }
  title.innerHTML=`<span class="pill-due">${due.length}</span> ${due.length===1?"topic":"topics"} due for recall`;
  card.style.borderColor="var(--amber-deep)";
  due.slice(0,8).forEach(d=>{
    const stageLabel=RECALL_STAGE_LABELS[d.reps]||"recall";
    const overTxt=d.over>0?`<span class="overdue">${d.over}d overdue</span>`:"due today";
    const div=document.createElement("div");div.className="recall-item";
    div.innerHTML=`<div class="rg"><div class="rn">${escapeHtml(d.tp.name)}</div><div class="rs"><b>${escapeHtml(d.s.name)}</b> · ${overTxt} · <span class="recall-stage">${stageLabel}</span> <span class="recall-method">2-4-7</span></div></div>
      <div class="recall-btns">
        <button class="btn sm" onclick="recallPass('${d.tp.id}')">Recalled ✓</button>
        <button class="btn sm ghost danger" onclick="recallFail('${d.tp.id}')">Forgot</button>
      </div>`;
    list.appendChild(div);
  });
  if(due.length>8){const m=document.createElement("div");m.className="empty";m.textContent="+"+(due.length-8)+" more — clear these first";list.appendChild(m);}
}
async function recallPass(id){
  const tp=_sbCache.allTopics.find(x=>x.id===id);if(!tp)return;
  const newReps=(tp.recall_reps||0)+1;
  try{ await markRecallPass(id); }
  catch(e){ setToast("Failed to save — check connection"); console.error('[Recall] markRecallPass failed:', e.message); return; }
  await refreshSbCache();
  if(newReps>=RECALL_STEPS.length){
    setToast("Mastered! 2-4-7 complete ✓ — this topic owns you now");
  } else {
    const nextDays=RECALL_STEPS[newReps];
    setToast("Recall locked — "+RECALL_STAGE_LABELS[newReps]+" in "+nextDays+" days");
  }
}
async function recallFail(id){
  try{ await markRecallFail(id); }
  catch(e){ setToast("Failed to save — check connection"); console.error('[Recall] markRecallFail failed:', e.message); return; }
  await refreshSbCache();
  setToast("Moved back to Learning — re-drill it");
}

/* ============ daily close-out (legacy — kept for export/sync, UI replaced by todo widget) ============ */
function getCloseout(){return loadJSON("ascent_closeout",{});}

/* ============ todo widget ============ */
let _todos = [];
let _pendingPriority = 'medium';

function _todoUUID(){
  try{ return crypto.randomUUID(); }catch(e){ return Date.now().toString(36)+Math.random().toString(36).slice(2); }
}

function _loadTodosLocal(){
  try{ return JSON.parse(localStorage.getItem('sq_todos')||'[]'); }catch(e){ return []; }
}

function _saveTodosLocal(){
  try{ localStorage.setItem('sq_todos', JSON.stringify(_todos)); }catch(e){}
}

const _PRIO_ORDER = {high:0, medium:1, low:2};
function _sortTodos(list){
  return [...list].sort((a,b)=>{
    if(a.completed !== b.completed) return a.completed ? 1 : -1;
    const pa = _PRIO_ORDER[a.priority] ?? 2;
    const pb = _PRIO_ORDER[b.priority] ?? 2;
    if(pa !== pb) return pa - pb;
    return (a.position||0) - (b.position||0);
  });
}

function cyclePendingPriority(){
  const cycle = ['high','medium','low'];
  _pendingPriority = cycle[(cycle.indexOf(_pendingPriority)+1)%3];
  _updatePrioBtn();
}
function _updatePrioBtn(){
  const btn = document.getElementById('todoPrioBtn');
  if(!btn) return;
  btn.className = 'todo-prio-selector ' + _pendingPriority;
}
function openSubtaskInput(parentId){
  const row = document.getElementById('subtask-input-' + parentId);
  if(!row) return;
  row.style.display = 'flex';
  const inp = row.querySelector('.todo-subtask-input');
  if(inp){ inp.focus(); inp.select(); }
}

async function initTodos(){
  _todos = _loadTodosLocal();
  renderTodos();
  if(!currentUser) return;
  try{
    const { data, error } = await supabase.from('todos').select('*').eq('user_id', currentUser.id).order('position');
    if(error){ console.warn('[todos] Supabase load:', error.message); return; }
    if(data && data.length > 0){
      const sbIds = new Set(data.map(t => t.id));
      const localOnly = _todos.filter(t => !sbIds.has(t.id));
      _todos = [...data, ...localOnly];
      _saveTodosLocal();
      renderTodos();
    }
  }catch(e){ console.warn('[todos] Supabase unavailable:', e); }
}

async function addTodo(){
  const inp = document.getElementById('todoInput');
  const text = inp?.value?.trim();
  if(!text) return;
  inp.value = '';
  const priority = _pendingPriority;
  _pendingPriority = 'medium';
  _updatePrioBtn();
  const todo = {
    id: _todoUUID(),
    user_id: currentUser?.id || null,
    text,
    completed: false,
    priority,
    parent_id: null,
    position: _todos.filter(t=>!t.parent_id).length,
    created_at: new Date().toISOString(),
    date: todayStr(),
    completed_at: null
  };
  _todos.push(todo);
  _saveTodosLocal();
  renderTodos();
  if(currentUser){
    try{ await supabase.from('todos').insert(todo); }catch(e){}
  }
}

async function deleteTodo(id){
  const childIds = _todos.filter(t => t.parent_id === id).map(t => t.id);
  _todos = _todos.filter(t => t.id !== id && t.parent_id !== id);
  _saveTodosLocal();
  renderTodos();
  if(currentUser){
    try{
      const allIds = [id, ...childIds];
      await supabase.from('todos').delete().in('id', allIds);
    }catch(e){}
  }
}

async function toggleTodo(id){
  const t = _todos.find(x=>x.id===id);
  if(!t) return;
  t.completed = !t.completed;
  t.completed_at = t.completed ? new Date().toISOString() : null;
  _todos.filter(x=>x.parent_id===id).forEach(c=>{ c.completed=t.completed; c.completed_at=t.completed_at; });
  _saveTodosLocal();
  if(t.completed){
    const el = document.querySelector(`.todo-item[data-id="${id}"]`);
    if(el){ el.classList.add('completing'); setTimeout(()=>renderTodos(), 600); }
    else renderTodos();
  } else {
    renderTodos();
  }
  if(currentUser){
    try{
      const affected = _todos.filter(x=>x.id===id||x.parent_id===id);
      await supabase.from('todos').upsert(affected);
    }catch(e){}
  }
}

async function cyclePriority(id){
  const t = _todos.find(x=>x.id===id);
  if(!t) return;
  const cycle = ['high','medium','low'];
  t.priority = cycle[(cycle.indexOf(t.priority)+1)%3];
  _saveTodosLocal();
  renderTodos();
  if(currentUser){
    try{ await supabase.from('todos').update({priority:t.priority}).eq('id', id); }catch(e){}
  }
}

async function addSubtask(parentId, text){
  if(!text?.trim()) return;
  const parent = _todos.find(x=>x.id===parentId);
  if(!parent) return;
  const sub = {
    id: _todoUUID(),
    user_id: currentUser?.id || null,
    text: text.trim(),
    completed: false,
    priority: parent.priority,
    parent_id: parentId,
    position: _todos.filter(t=>t.parent_id===parentId).length,
    created_at: new Date().toISOString(),
    date: todayStr(),
    completed_at: null
  };
  _todos.push(sub);
  _saveTodosLocal();
  renderTodos();
  if(currentUser){
    try{ await supabase.from('todos').insert(sub); }catch(e){}
  }
}

function renderTodos(){
  const list = document.getElementById('todoList');
  const completedList = document.getElementById('completedList');
  const completedSection = document.getElementById('todoCompletedSection');
  const celebrateEl = document.getElementById('todoCelebrate');
  const emptyEl = document.getElementById('todoEmpty');
  const countBadge = document.getElementById('todoCountBadge');
  const completedLabel = document.getElementById('completedToggleLabel');
  if(!list) return;

  const today = todayStr();
  // Bug fix: use local `date` field when present, fall back to startsWith for legacy todos
  const todayRoots = _todos.filter(t => !t.parent_id && (t.date === today || (!t.date && t.created_at?.startsWith(today))));
  const incomplete = _sortTodos(todayRoots.filter(t => !t.completed));
  const completed = _sortTodos(todayRoots.filter(t => t.completed));
  const doneCount = completed.length;

  if(countBadge){
    const left = incomplete.length;
    if(left > 0) countBadge.textContent = left + ' left';
    else if(doneCount > 0) countBadge.textContent = 'all done';
    else countBadge.textContent = '';
  }

  if(celebrateEl) celebrateEl.style.display = (todayRoots.length > 0 && doneCount === todayRoots.length) ? '' : 'none';

  list.innerHTML = '';
  if(incomplete.length === 0 && doneCount === 0){
    if(emptyEl) emptyEl.style.display = '';
  } else {
    if(emptyEl) emptyEl.style.display = 'none';
    incomplete.forEach(t => _renderTodoItem(t, list));
  }

  if(doneCount > 0){
    if(completedSection) completedSection.style.display = '';
    if(completedLabel) completedLabel.textContent = `✓ ${doneCount} done today`;
    if(completedList){
      completedList.innerHTML = '';
      completed.forEach(t => _renderTodoItem(t, completedList));
    }
  } else {
    if(completedSection) completedSection.style.display = 'none';
  }
}

function _renderTodoItem(t, container){
  const children = _todos.filter(c => c.parent_id === t.id);

  const wrap = document.createElement('div');
  wrap.className = 'todo-item' + (t.parent_id ? ' sub' : '');
  wrap.dataset.id = t.id;

  const dot = document.createElement('button');
  dot.className = `todo-priority ${t.priority||'low'}`;
  dot.title = `Priority: ${t.priority||'low'} — click to cycle`;
  dot.onclick = e => { e.stopPropagation(); cyclePriority(t.id); };

  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.className = 'todo-cb';
  cb.checked = !!t.completed;
  cb.onchange = () => toggleTodo(t.id);

  const txt = document.createElement('span');
  txt.className = 'todo-text' + (t.completed ? ' done' : '');
  txt.textContent = t.text;

  const actions = document.createElement('div');
  actions.className = 'todo-actions';

  if(!t.parent_id){
    const subBtn = document.createElement('button');
    subBtn.className = 'todo-subtask-btn';
    subBtn.textContent = '+';
    subBtn.title = 'Add subtask';
    subBtn.onclick = e => { e.stopPropagation(); openSubtaskInput(t.id); };
    actions.appendChild(subBtn);
  }

  const del = document.createElement('button');
  del.className = 'todo-del';
  del.textContent = '×';
  del.title = 'Delete';
  del.onclick = e => { e.stopPropagation(); deleteTodo(t.id); };
  actions.appendChild(del);

  wrap.appendChild(dot);
  wrap.appendChild(cb);
  wrap.appendChild(txt);
  wrap.appendChild(actions);
  container.appendChild(wrap);

  if(!t.parent_id){
    const subInputRow = document.createElement('div');
    subInputRow.className = 'todo-subtask-input-row';
    subInputRow.id = 'subtask-input-' + t.id;
    subInputRow.style.display = 'none';
    const subInput = document.createElement('input');
    subInput.className = 'todo-subtask-input';
    subInput.placeholder = 'Add a subtask…';
    subInput.onkeydown = e => {
      if(e.key === 'Enter'){ addSubtask(t.id, subInput.value); subInputRow.style.display = 'none'; }
      else if(e.key === 'Escape'){ subInputRow.style.display = 'none'; }
    };
    subInputRow.appendChild(subInput);
    container.appendChild(subInputRow);
  }

  children.forEach(c => _renderTodoItem(c, container));
}

function toggleCompletedSection(){
  const list = document.getElementById('completedList');
  const arrow = document.getElementById('completedToggleArrow');
  if(!list) return;
  list.classList.toggle('open');
  if(arrow) arrow.textContent = list.classList.contains('open') ? '▼' : '▶';
}

/* ============ over-confidence flags ============ */
// Real-table equivalent of subjReady(key) — pct/tot ready topics for a subject row.
function subjReadySb(subj){
  const t=_sbCache.allTopics.filter(x=>x.subject_id===subj.id);
  const tot=t.length;
  const r=t.filter(x=>x.status==="ready"||x.status==="mastered").length;
  return{tot,r,pct:tot?Math.round(r/tot*100):0};
}
function renderFlags(){
  const strip=document.getElementById("flagsStrip");if(!strip)return;
  strip.innerHTML="";
  const flags=[];
  const subs=_sbCache.subjects.filter(s=>!isIbCore(s));
  for(const s of subs){
    const x=subjReadySb(s);
    const ps=_sbCache.papers.filter(p=>p.subject_id===s.id);
    if(x.pct>=40&&ps.length>=2){
      const recent=ps.slice(0,3);
      const avg=recent.reduce((a,b)=>a+b.score/b.max_score,0)/recent.length*100;
      if(avg<75){
        flags.push({type:"red",icon:"!",html:`<b>${escapeHtml(s.name)}:</b> you've marked ${x.pct}% exam-ready, but your recent papers average ${Math.round(avg)}% — below the A* line. Understanding ≠ scoring. Re-test your "ready" topics under timed conditions.`});
      }
    }
  }
  const wi=Math.min(Math.max(weekIndexFor(parseD(todayStr())),1),17);
  if(wi>=6){
    for(const s of subs){
      const x=subjReadySb(s);
      if(x.pct<20&&x.tot>3){
        flags.push({type:"amber",icon:"–",html:`<b>${escapeHtml(s.name)}</b> is still ${x.pct}% ready in week ${wi}. Don't let a whole subject drift late — even your easier A*s need timed practice.`});
      }
    }
  }
  const hr=new Date().getHours();
  const studiedToday=_sbCache.sessions.some(s=>s.study_date===todayStr());
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
  const subs=_timerSubjects.length?_timerSubjects:SUBJECTS.map(s=>({key:s.key,name:s.name}));
  for(const s of subs){
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
async function saveTimerSession(){
  const sec=Math.round(timerAccum+(timerRunning?(Date.now()-timerStart)/1000:0));
  if(sec<30){setToast("Too short to log");return;}
  sessions.push({id:Date.now(),subject:curTimerSubject,dur:sec,date:todayStr(),ts:Date.now()});
  saveJSON("ascent_sessions",sessions);
  await persistSessionToRealTable(sec);
  discardTimer();setToast("Logged "+(sec/60).toFixed(0)+" min on "+subjName(curTimerSubject));
  refreshAll();
}

// Real subject ids are UUIDs from the subjects table (via refreshSbCache →
// _timerSubjects); legacy fallback keys ("maths","acc",...) are not real
// subjects and have nothing to write to.
async function persistSessionToRealTable(durationSec){
  if(!currentUser) return;
  if(!_sbCache.subjects.some(s=>s.id===curTimerSubject)) return;
  try{
    await createSession({ userId: currentUser.id, subjectId: curTimerSubject, durationSec });
    await refreshSbCache();
  }catch(e){
    console.error('[Sessions] Failed to save to sessions table:', e.message);
  }
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
async function logManual(){
  const mins=prompt("How many minutes did you study "+subjName(curTimerSubject)+"?");
  const m=parseInt(mins);if(!m||m<=0)return;
  sessions.push({id:Date.now(),subject:curTimerSubject,dur:m*60,date:todayStr(),ts:Date.now()});
  saveJSON("ascent_sessions",sessions);
  await persistSessionToRealTable(m*60);
  setToast("Logged "+m+" min");refreshAll();
}
function renderFocus(){
  renderTimerSubjects();
  const sw=startOfWeek().getTime();
  const fmTodayEl = document.getElementById("fmToday");
  if (fmTodayEl) fmTodayEl.textContent=hoursForSb(s=>s.study_date===todayStr()).toFixed(1)+"h";
  const fmWeekEl = document.getElementById("fmWeek");
  if (fmWeekEl) fmWeekEl.textContent=hoursForSb(s=>parseD(s.study_date).getTime()>=sw).toFixed(1)+"h";
  const fmTotalEl = document.getElementById("fmTotal");
  if (fmTotalEl) fmTotalEl.textContent=hoursForSb(()=>true).toFixed(1)+"h";
  const fmSessionsEl = document.getElementById("fmSessions");
  if (fmSessionsEl) fmSessionsEl.textContent=_sbCache.sessions.length;

  const log=document.getElementById("sessionLog");
  if (!log) return;
  log.innerHTML="";
  const todays=_sbCache.sessions.filter(s=>s.study_date===todayStr());
  if(!todays.length){log.innerHTML='<div class="empty">No sessions yet today.<br>Press start above and begin block one.</div>';return;}
  for(const s of todays){
    const name=s.subjects?.name || 'Unknown subject';
    const d=document.createElement("div");d.className="score-line";
    d.innerHTML=`<span class="id">${escapeHtml(name)}</span><span class="sc">${(s.duration_sec/60).toFixed(0)} min</span>`;
    log.appendChild(d);
  }
}

/* ============ render: subjects (Phase 4 — DB-backed via subjects-view.js) ============ */
function renderSubjTabs(){ /* no-op: new view renders its own tabs */ }
function renderSubjects(){ initSubjectsView(userTier); }

function cycleStatus(k,id){
  const t=topics[k];const tp=t&&t.find(x=>x.id===id);if(!tp)return;
  const next={notstarted:"learning",learning:"ready",ready:"notstarted",mastered:"notstarted"};
  tp.status=next[tp.status]??"notstarted";
  if(tp.status==="ready"){ tp.readyAt=todayStr(); tp.lastRecall=todayStr(); tp.recallReps=0; }
  else { delete tp.readyAt; delete tp.lastRecall; tp.recallReps=0; }
  saveJSON("ascent_topics",topics);renderDashProgress();renderRecall();
  const readyPctEl = document.getElementById("readyPct");
  if (readyPctEl) readyPctEl.textContent=overallReady()+"%";
}

/* ============ study summary generator (AI-ready) ============ */
function summariseSubjectSb(s){
  const t=_sbCache.allTopics.filter(x=>x.subject_id===s.id);
  const mastered=t.filter(x=>x.status==="mastered");
  const ready=t.filter(x=>x.status==="ready");
  const learning=t.filter(x=>x.status==="learning");
  const notstarted=t.filter(x=>x.status==="notstarted");
  const x=subjReadySb(s);
  const nt=nextTopicSb(s);
  let out=`### ${s.name}${s.exam_code?` (${s.exam_code})`:''} — ${x.pct}% exam-ready (${x.r}/${x.tot} topics)\n`;
  if(mastered.length)out+=`MASTERED 2-4-7 (${mastered.length}): ${mastered.map(r=>r.name).join("; ")}\n`;
  out+=`EXAM-READY (${ready.length}): ${ready.length?ready.map(r=>r.name).join("; "):"none yet"}\n`;
  out+=`IN PROGRESS (${learning.length}): ${learning.length?learning.map(r=>r.name).join("; "):"none"}\n`;
  out+=`NOT STARTED (${notstarted.length}): ${notstarted.length?notstarted.map(r=>r.name).join("; "):"none — all topics touched"}\n`;
  out+=`NEXT UP: ${nt?((nt.section?nt.section+" · ":"")+nt.name):"all topics ready — move to timed past papers"}\n`;
  const ps=_sbCache.papers.filter(p=>p.subject_id===s.id);
  if(ps.length){
    const best=ps.reduce((a,b)=>(b.score/b.max_score>a.score/a.max_score?b:a));
    const avg=Math.round(ps.reduce((a,b)=>a+b.score/b.max_score,0)/ps.length*100);
    out+=`PAST PAPERS: ${ps.length} logged, avg ${avg}%, best ${Math.round(best.score/best.max_score*100)}% (${best.paper_ref})\n`;
  }
  const es=_sbCache.errors.filter(e=>e.subject_id===s.id);
  if(es.length){
    out+=`LOGGED MISTAKES (${es.length}): ${es.slice(0,4).map(e=>e.mistake).join(" | ")}\n`;
  }
  return out;
}
function genSummary(scope){
  const today=new Date();today.setHours(0,0,0,0);
  const ex=parseD(examDate);
  const dleft=Math.max(0,daysBetween(today,ex));
  let wi=Math.min(Math.max(weekIndexFor(today),1),17);
  const wk=WEEKS[wi-1];
  const totalH=hoursForSb(()=>true);
  const streak=computeStreakSb();

  const allSubs=_sbCache.subjects.filter(s=>!isIbCore(s));
  const activeSubj = scope==="subject" ? allSubs.find(s=>s.id===getActiveSubjectId()) : null;
  if(scope==="subject" && !activeSubj){
    setToast("Open a subject in the Subjects tab first");
    return;
  }
  const list = scope==="subject" ? [activeSubj] : allSubs;

  let out=`STUDY PROGRESS SUMMARY\n`;
  out+=`Generated: ${today.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}\n`;
  out+=`Days until first exam: ${dleft}  |  Plan week: ${wi}/17 (${wk.phase} phase)\n`;
  out+=`Total focused study logged: ${totalH.toFixed(1)} h  |  Current day-streak: ${streak}\n`;
  out+=`Overall exam-ready across ${scope==="subject"?"this subject":"all subjects"}: ${scope==="subject"?subjReadySb(activeSubj).pct:overallReady()}%\n`;
  const due=recallDueSb();
  if(due.length){out+=`Topics due for recall (knowledge may be fading): ${due.slice(0,8).map(d=>d.tp.name+" ["+d.s.name+"]").join("; ")}${due.length>8?" …+"+(due.length-8):""}\n`;}
  out+=`\n============================================================\n\n`;

  if(!list.length){
    out+=`No subjects added yet — add subjects in the Subjects tab first.\n`;
  } else {
    for(const s of list){ out+=summariseSubjectSb(s)+"\n"; }
  }

  if(scope!=="subject" && allSubs.length){
    const ranked=allSubs.map(s=>({n:s.name,pct:subjReadySb(s).pct})).sort((a,b)=>a.pct-b.pct);
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
  document.getElementById("summaryTitle").textContent = scope==="subject" ? (activeSubj.name+" — progress") : "Full progress — all subjects";
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
    for(const s of _sbCache.subjects){const o=document.createElement("option");o.value=s.id;o.textContent=s.name;sel.appendChild(o);}
    if(!_sbCache.subjects.length){sel.innerHTML='<option value="">Add a subject first</option>';}
  }
}
async function addPaper(){
  const subj=document.getElementById("pSubj").value;
  const idv=document.getElementById("pId").value.trim();
  const sc=parseFloat(document.getElementById("pScore").value);
  const mx=parseFloat(document.getElementById("pMax").value);
  if(!subj){setToast("Add a subject first");return;}
  if(!idv||isNaN(sc)||isNaN(mx)||mx<=0){setToast("Fill paper, score & max");return;}
  if(!currentUser) return;
  try{
    await createPaper({ userId: currentUser.id, subjectId: subj, paperRef: idv, score: sc, maxScore: mx });
  }catch(e){
    setToast("Failed to save paper — check connection");
    console.error('[Papers] createPaper failed:', e.message);
    return;
  }
  document.getElementById("pId").value="";document.getElementById("pScore").value="";document.getElementById("pMax").value="";
  await renderLogs();setToast("Paper logged");
}
async function addError(){
  const subj=document.getElementById("eSubj").value;
  const mis=document.getElementById("eMistake").value.trim();
  const fix=document.getElementById("eFix").value.trim();
  if(!subj){setToast("Add a subject first");return;}
  if(!mis){setToast("Describe the mistake");return;}
  if(!currentUser) return;
  try{
    await createError({ userId: currentUser.id, subjectId: subj, mistake: mis, fix: fix || null });
  }catch(e){
    setToast("Failed to save — check connection");
    console.error('[Errors] createError failed:', e.message);
    return;
  }
  document.getElementById("eMistake").value="";document.getElementById("eFix").value="";
  await renderLogs();setToast("Added to error log");
}
async function renderLogs(){
  if(!currentUser) return;
  const pl=document.getElementById("paperLog");
  const elx=document.getElementById("errorLog");
  if(!pl && !elx) return;

  const [paperRows, errorRows] = await Promise.all([
    pl ? getPapers().catch(()=>[]) : Promise.resolve([]),
    elx ? getErrors().catch(()=>[]) : Promise.resolve([]),
  ]);

  if (pl) {
    pl.innerHTML="";
    if(!paperRows.length){pl.innerHTML='<div class="empty">No papers logged yet.</div>';}
    paperRows.forEach(p=>{
      const pct=Math.round(p.score/p.max_score*100);
      const cls=pct>=80?"astar":pct>=70?"near":"low";
      const name=p.subjects?.name || 'Unknown subject';
      const d=document.createElement("div");d.className="score-line";
      d.innerHTML=`<span class="id">${escapeHtml(name)} · ${escapeHtml(p.paper_ref)}</span><span class="sc ${cls}">${p.score}/${p.max_score} · ${pct}%</span>`;
      pl.appendChild(d);
    });
  }

  if (elx) {
    elx.innerHTML="";
    if(!errorRows.length){elx.innerHTML='<div class="empty">No mistakes logged — log them as they happen.</div>';}
    errorRows.forEach(e=>{
      const name=e.subjects?.name || 'Unknown subject';
      const dateStr=(e.logged_at||e.created_at||'').slice(0,10);
      const d=document.createElement("div");d.className="logitem";
      d.innerHTML=`<div class="meta"><span class="s">${escapeHtml(name)}</span><span class="d">${dateStr} <span class="mini-link" onclick="delError('${e.id}')">remove</span></span></div><div class="mistake">${escapeHtml(e.mistake)}</div>${e.fix?`<div class="fix">${escapeHtml(e.fix)}</div>`:""}`;
      elx.appendChild(d);
    });
  }
}
async function delError(id){
  try{ await deleteError(id); }
  catch(e){ setToast("Failed to remove — check connection"); console.error('[Errors] deleteError failed:', e.message); return; }
  await renderLogs();
}
function escapeHtml(s){return s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}

/* ============ payment card ============ */
const BKASH_NUMBER = import.meta.env.VITE_BKASH_NUMBER || '01XXXXXXXXXX';

const PLANS = [
  { key: 'basic_monthly', tier: 'Basic', period: 'Monthly',   amount: 149,  save: ''        },
  { key: 'basic_6mo',     tier: 'Basic', period: '6 Months',  amount: 699,  save: 'save 22%' },
  { key: 'plus_monthly',  tier: 'Plus',  period: 'Monthly',   amount: 299,  save: ''        },
  { key: 'plus_6mo',      tier: 'Plus',  period: '6 Months',  amount: 1399, save: 'save 22%' },
  { key: 'pro_monthly',   tier: 'Pro',   period: 'Monthly',   amount: 499,  save: ''        },
  { key: 'pro_6mo',       tier: 'Pro',   period: '6 Months',  amount: 2339, save: 'save 22%' },
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
  const tierLabel = sub.tier === 'paid_1' ? 'Basic' : sub.tier === 'paid_2' ? 'Plus' : sub.tier === 'paid_3' ? 'Pro' : 'Free';
  const expiryFmt = sub.expires_at ? new Date(sub.expires_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null;

  let html = '<div class="lead">Your plan</div>';

  // Status badge
  if (sub.status === 'suspended') {
    html += `<div class="pay-status suspended"><span class="ps-icon">🚫</span><div><div class="ps-label">Account suspended</div><div class="ps-detail">Contact support at officialfindrumtechnologies@gmail.com</div></div></div>`;
  } else if (isPaid && !isExpired) {
    html += `<div class="pay-status"><span class="ps-icon">✓</span><div><div class="ps-label">${tierLabel} — active</div><div class="ps-detail">${expiryFmt ? `Active until ${expiryFmt}` : 'Active'}</div></div></div>`;
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
    </div>
    <div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--line)">
      <span class="fieldlabel">Already have an activation code?</span>
      <div class="split" style="gap:10px;margin-top:6px;flex-wrap:wrap">
        <input type="text" id="redeem-code-input" placeholder="e.g. AB3D-9KLM" style="flex:1;min-width:160px;font-family:var(--mono);letter-spacing:.05em;text-transform:uppercase" maxlength="12">
        <button class="btn sm" id="redeem-code-btn" onclick="redeemCode()">Activate</button>
      </div>
      <span id="redeem-code-msg" style="font-family:var(--mono);font-size:11px;color:var(--muted)"></span>
    </div>`;
}

async function redeemCode() {
  const input = document.getElementById('redeem-code-input');
  const btn   = document.getElementById('redeem-code-btn');
  const msg   = document.getElementById('redeem-code-msg');
  const code  = input?.value?.trim();

  if (!code) { if (msg) { msg.textContent = 'Enter a code'; msg.style.color = 'var(--red)'; } return; }

  if (btn) { btn.disabled = true; btn.textContent = 'Activating…'; }
  if (msg) msg.textContent = '';

  try {
    const { data: { session } } = await supabase.auth.getSession();
    const resp = await fetch('/api/redeem-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
      body: JSON.stringify({ code }),
    });
    const json = await resp.json();
    if (!resp.ok) throw new Error(json.error || 'Redemption failed');

    if (msg) { msg.textContent = '✓ Activated!'; msg.style.color = 'var(--green)'; }
    setTimeout(() => renderPaymentCard(), 1000);
  } catch (e) {
    if (msg) { msg.textContent = e.message; msg.style.color = 'var(--red)'; }
    if (btn) { btn.disabled = false; btn.textContent = 'Activate'; }
  }
}
window.redeemCode = redeemCode;

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
  const allSubs=_sbCache.subjects.filter(s=>!isIbCore(s));
  const subjectList=allSubs.map(s=>s.name+(s.exam_code?" ("+s.exam_code+")":"")).join(", ");
  let out=`My subjects: ${subjectList||"(none added yet)"}.\n\n`;
  out+=`Here is my current study progress by subject and section:\n\n`;

  for(const s of allSubs){
    const t=_sbCache.allTopics.filter(x=>x.subject_id===s.id);
    if(!t.length)continue;
    // Group by section
    const sections={};
    t.forEach(tp=>{
      const sec=tp.section||"(unsectioned)";
      if(!sections[sec])sections[sec]={ready:[],learning:[]};
      if(tp.status==="ready"||tp.status==="mastered")sections[sec].ready.push(tp.name);
      if(tp.status==="learning")sections[sec].learning.push(tp.name);
    });
    // Only include sections with progress
    const activeSections=Object.entries(sections).filter(([,v])=>v.ready.length||v.learning.length);
    if(!activeSections.length)continue;
    out+=`### ${s.name}${s.exam_code?" ("+s.exam_code+")":""}\n`;
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
// profiles.exam_date is the source of truth for the countdown card; this
// pulls it in on login so a date set via Edit Profile actually sticks.
async function syncExamDateFromProfile(){
  if(!currentUser) return;
  try{
    const prof = await getProfile();
    if(prof?.exam_date){ examDate = prof.exam_date; Store.set("ascent_exam", examDate); renderDash(); }
  }catch(e){ console.warn('[ExamDate] sync from profile failed:', e.message); }
}
async function setExamDate(){
  const v=document.getElementById("examDateInput").value;if(!v)return;
  examDate=v;Store.set("ascent_exam",examDate);renderDash();setToast("Exam date set");
  if(currentUser){ try{ await updateProfile({exam_date:v}); }catch(e){ console.warn('[ExamDate] save failed:', e.message); } }
}
async function resetExam(){
  examDate="2026-09-28";Store.set("ascent_exam",examDate);renderDash();setToast("Reset to 28 Sep 2026");
  if(currentUser){ try{ await updateProfile({exam_date:examDate}); }catch(e){ console.warn('[ExamDate] save failed:', e.message); } }
}

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

/* ============ study-now rule engine (Supabase-backed) ============ */
let _studyNowIdx = 0;

function getStudyNowCandidates() {
  const subjects = _sbCache.subjects;
  const allTopics = _sbCache.allTopics;
  if (!subjects.length) return [];

  const today = new Date(); today.setHours(0,0,0,0);
  const candidates = [];

  // Priority 1: overdue 2-4-7 recalls
  const recallItems = allTopics.filter(tp => {
    if (tp.status !== 'ready') return false;
    const reps = tp.recall_reps || 0;
    if (reps >= RECALL_STEPS.length) return false;
    const base = new Date(tp.last_recall || tp.ready_at);
    if (isNaN(base.getTime())) return false;
    base.setHours(0,0,0,0);
    return Math.floor((today - base) / 86400000) >= RECALL_STEPS[reps];
  }).map(tp => {
    const reps = tp.recall_reps || 0;
    const base = new Date(tp.last_recall || tp.ready_at); base.setHours(0,0,0,0);
    const elapsed = Math.floor((today - base) / 86400000);
    const over = elapsed - RECALL_STEPS[reps];
    const subj = subjects.find(s => s.id === tp.subject_id) || { id: tp.subject_id, name: tp.subjects?.name || 'Unknown' };
    return { priority: 1, verb: 'RECALL', subject: subj, topic: tp,
      reason: over > 0 ? `${over} day${over !== 1 ? 's' : ''} overdue for recall` : 'Recall due today',
      action: 'recall', _sort: over };
  }).sort((a, b) => b._sort - a._sort);
  candidates.push(...recallItems.slice(0, 2));

  // Build per-subject topic lists + progress
  const subjTopics = {};
  for (const s of subjects) subjTopics[s.id] = [];
  for (const tp of allTopics) { if (subjTopics[tp.subject_id] !== undefined) subjTopics[tp.subject_id].push(tp); }

  const subjProgress = subjects
    .filter(s => !isIbCore(s))
    .map(s => {
      const tps = (subjTopics[s.id] || []).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
      const tot = tps.length;
      const ready = tps.filter(t => t.status === 'ready' || t.status === 'mastered').length;
      const pct = tot ? Math.round(ready / tot * 100) : 0;
      return { s, tps, tot, ready, pct };
    });
  const ranked = [...subjProgress].sort((a, b) => a.pct - b.pct);

  // Priority 2: first notstarted topic in most-behind subject
  for (const { s, tps, pct } of ranked) {
    const first = tps.find(t => t.status === 'notstarted');
    if (first && !candidates.some(c => c.topic?.id === first.id)) {
      candidates.push({ priority: 2, verb: 'START', subject: s, topic: first,
        reason: `Furthest behind — ${pct}% ready`, action: 'subjects' });
      break;
    }
  }

  // Priority 3: exam proximity (within 30 days)
  const examD = new Date(examDate); examD.setHours(0,0,0,0);
  const daysToExam = Math.ceil((examD.getTime() - today.getTime()) / 86400000);
  if (daysToExam > 0 && daysToExam <= 30) {
    const byRemaining = [...ranked].sort((a, b) => {
      const aRem = a.tps.filter(t => t.status === 'notstarted' || t.status === 'learning').length;
      const bRem = b.tps.filter(t => t.status === 'notstarted' || t.status === 'learning').length;
      return bRem - aRem;
    });
    for (const { s, tps } of byRemaining) {
      const first = tps.find(t => t.status === 'notstarted');
      if (first && !candidates.some(c => c.topic?.id === first.id)) {
        candidates.push({ priority: 3, verb: 'START', subject: s, topic: first,
          reason: `${daysToExam} day${daysToExam !== 1 ? 's' : ''} until your exam`, action: 'subjects' });
        break;
      }
    }
  }

  // Priority 4: next topic in syllabus order (first subject by position with unstudied topics)
  for (const { s, tps } of subjProgress) {
    const first = tps.find(t => t.status === 'notstarted');
    if (first && !candidates.some(c => c.topic?.id === first.id)) {
      candidates.push({ priority: 4, verb: 'START', subject: s, topic: first,
        reason: 'Next in your syllabus', action: 'subjects' });
      break;
    }
  }

  return candidates;
}

function renderStudyNow() {
  const el = document.getElementById('studyNowResult');
  if (!el) return;

  if (!_sbCache.subjects.length) {
    el.innerHTML = `<div class="sn-empty">${currentUser ? 'Add subjects to get personalized recommendations' : 'Sign in to get personalized study recommendations'}</div>`;
    return;
  }

  const candidates = getStudyNowCandidates();
  if (!candidates.length) {
    const s = _sbCache.subjects[0];
    el.innerHTML = `<div class="sn-result"><div class="sn-verb">RECALL</div><div class="sn-body"><div class="sn-subj">${escapeHtml(s.name)}</div><div class="sn-reason">All topics exam-ready · maintain with recall</div><div class="sn-actions"><button class="btn sm" onclick="document.getElementById('recallCard').scrollIntoView({behavior:'smooth'})">Go to recall ↓</button></div></div></div>`;
    return;
  }

  const rec = candidates[_studyNowIdx % candidates.length];
  const topicHTML = rec.topic
    ? `<div class="sn-topic">${escapeHtml(rec.topic.name)}${rec.topic.section ? `<span class="sn-section"> · ${escapeHtml(rec.topic.section)}</span>` : ''}</div>`
    : '';
  const goBtn = rec.action === 'recall'
    ? `<button class="btn sm" onclick="document.getElementById('recallCard').scrollIntoView({behavior:'smooth'})">Go to recall ↓</button>`
    : `<button class="btn sm" onclick="go('subjects')">Open subjects →</button>`;

  el.innerHTML = `<div class="sn-result">
    <div class="sn-verb">${escapeHtml(rec.verb)}</div>
    <div class="sn-body">
      <div class="sn-subj">${escapeHtml(rec.subject.name)}</div>
      ${topicHTML}
      <div class="sn-reason">${escapeHtml(rec.reason)}</div>
      <div class="sn-actions">${goBtn}</div>
    </div>
  </div>`;
}

function cycleStudyNow() {
  _studyNowIdx++;
  renderStudyNow();
}

/* ============ coverage heatmap ============ */
async function renderCoverage(){
  const grid = document.getElementById("cov-grid");
  if(!grid) return;

  // Ensure cache is populated (may already be if showApp ran first)
  if(!_sbCache.subjects.length && currentUser){
    grid.innerHTML = '<div class="cov-empty">Loading…</div>';
    await refreshSbCache();
  }

  const subjects = _sbCache.subjects;
  const allTopics = _sbCache.allTopics;

  if(!subjects.length){
    grid.innerHTML = '<div class="cov-empty">Add subjects to see your coverage map</div>';
    const pctEl = document.getElementById("cov-pct");
    if(pctEl) pctEl.textContent = "0%";
    return;
  }

  const OVERDUE_DAYS = 21;
  const today = new Date(); today.setHours(0,0,0,0);
  let totAll = 0, readyAll = 0;
  const frag = document.createDocumentFragment();

  // Subjects already ordered by position from getSubjects()
  for(const subj of subjects){
    const tlist = allTopics.filter(t => t.subject_id === subj.id);
    if(!tlist.length) continue;

    const sections = {};
    for(const t of tlist){
      const sec = t.section || "(General)";
      if(!sections[sec]) sections[sec] = [];
      sections[sec].push(t);
    }

    let sReady = 0;
    const subjEl = document.createElement("div");
    subjEl.className = "cov-subject";

    const header = document.createElement("div");
    header.className = "cov-subj-header";

    const nameEl = document.createElement("span");
    nameEl.className = "cov-subj-name";
    nameEl.textContent = subj.name;
    if(subj.level){
      const badge = document.createElement("span");
      badge.className = `ib-lv-badge ib-lv-${subj.level.toLowerCase()}`;
      badge.textContent = subj.level;
      nameEl.appendChild(badge);
    }

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

        if(status === "ready" || status === "mastered"){
          readyAll++;
          sReady++;
          if(status === "ready" && t.last_recall){
            const lr = new Date(t.last_recall); lr.setHours(0,0,0,0);
            const diff = Math.floor((today - lr) / 86400000);
            if(diff > OVERDUE_DAYS) status = "overdue";
          }
        }

        const sq = document.createElement("div");
        sq.className = "cov-sq";
        sq.dataset.status = status;
        sq.title = t.name;

        sq.addEventListener("click", () => {
          // If subject has topic visuals, open visual modal — exact name match only
          const tvKey = getTopicVisualsKey(subj);
          if (tvKey && TOPIC_VISUALS[tvKey]) {
            const tvTopic = TOPIC_VISUALS[tvKey].topics.find(tv =>
              tv.name.toLowerCase() === t.name.toLowerCase()
            );
            if (tvTopic) {
              openTopicVisualModal(tvKey, tvTopic.id);
              return;
            }
          }
          // Fallback: navigate to subjects view and highlight topic
          go("subjects");
          setTimeout(() => {
            const tabBtn = document.querySelector(`#sb-tabs button[onclick*="${subj.id}"]`);
            if(tabBtn) tabBtn.click();
            setTimeout(() => {
              const topicEls = document.querySelectorAll(".topic");
              for(const el of topicEls){
                if(el.textContent.includes(t.name)){
                  el.scrollIntoView({behavior:"smooth", block:"center"});
                  el.style.outline = "2px solid var(--amber)";
                  setTimeout(() => { el.style.outline = ""; }, 1500);
                  break;
                }
              }
            }, 80);
          }, 50);
        });

        squares.appendChild(sq);
      }
      subjEl.appendChild(squares);
    }

    pctEl.textContent = (tlist.length ? Math.round(sReady / tlist.length * 100) : 0) + "% ready";
    frag.appendChild(subjEl);
  }

  grid.innerHTML = "";
  grid.appendChild(frag);

  const pctEl = document.getElementById("cov-pct");
  if(pctEl) pctEl.textContent = (totAll ? Math.round(readyAll / totAll * 100) : 0) + "%";
}

/* ============ past papers ============ */
let _ppTab = 'papers';
let _ppActiveCode = null; // exam_code currently viewing papers for
let _ppUserSubjects = []; // cached subjects from Supabase

function ppSwitchTab(tab) {
  _ppTab = tab;
  const papersSection = document.getElementById('pp-papers-section');
  const errorsSection = document.getElementById('pp-errors-section');
  document.querySelectorAll('.pp-subtab').forEach(b => {
    b.classList.toggle('active', b.id === 'pp-tab-' + tab);
  });
  if (papersSection) papersSection.classList.toggle('hidden', tab !== 'papers');
  if (errorsSection) errorsSection.classList.toggle('hidden', tab !== 'errors');
  if (tab === 'errors') { fillSubjSelects(); renderLogs(); }
}
window.ppSwitchTab = ppSwitchTab;

async function initPastPapers() {
  _ppActiveCode = null;
  _ppTab = 'papers';
  // reset tab UI
  document.querySelectorAll('.pp-subtab').forEach(b => b.classList.toggle('active', b.id === 'pp-tab-papers'));
  const papersSection = document.getElementById('pp-papers-section');
  const errorsSection = document.getElementById('pp-errors-section');
  if (papersSection) papersSection.classList.remove('hidden');
  if (errorsSection) errorsSection.classList.add('hidden');

  if (!currentUser) {
    _renderPpEmpty('Sign in to see your subjects and past papers.');
    return;
  }
  _renderPpEmpty('Loading subjects…');
  try {
    _ppUserSubjects = await getSubjects();
  } catch (e) {
    _ppUserSubjects = [];
  }
  _renderPpSubjectList();
}

function _renderPpEmpty(msg) {
  const el = document.getElementById('pp-content');
  if (el) el.innerHTML = `<div class="pp-empty">${msg}</div>`;
}

function _ppEsc(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function _renderPpSubjectList() {
  const el = document.getElementById('pp-content');
  if (!el) return;
  if (!_ppUserSubjects.length) {
    el.innerHTML = '<div class="pp-empty">No subjects added yet.<br>Go to <b>Subjects</b> tab to add your subjects, then come back here.</div>';
    return;
  }
  let html = '<div class="pp-subj-grid">';
  for (const subj of _ppUserSubjects) {
    const data = getPastPapersForCode(subj.exam_code);
    const hasData = !!data;
    const lvlBadge = subj.level
      ? `<span class="ib-lv-badge ib-lv-${_ppEsc(subj.level).toLowerCase()}">${_ppEsc(subj.level)}</span>`
      : '';
    html += `<div class="pp-subj-card" onclick="${hasData ? `ppSelectSubject('${_ppEsc(subj.exam_code)}')` : ''}">
      <div class="pp-subj-name">${_ppEsc(subj.name)}${lvlBadge}</div>
      ${subj.exam_code ? `<div class="pp-subj-code">${_ppEsc(subj.exam_code)}</div>` : ''}
      ${data ? `<div class="pp-subj-meta">${_ppEsc(data.qualification)} · ${_ppEsc(data.examBoard)}</div>` : `<div class="pp-subj-no-data">No paper data available</div>`}
      ${hasData ? '<div class="pp-subj-arrow">→ View papers</div>' : ''}
    </div>`;
  }
  html += '</div>';
  el.innerHTML = html;
}

// IB grade boundaries reference (Part D)
const IB_GRADE_BOUNDARIES = [
  { grade: 7, label: 'Excellent',     pct: '70%+' },
  { grade: 6, label: 'Very Good',     pct: '60–69%' },
  { grade: 5, label: 'Good',          pct: '50–59%' },
  { grade: 4, label: 'Satisfactory',  pct: '40–49%' },
  { grade: 3, label: 'Mediocre',      pct: '30–39%' },
  { grade: 2, label: 'Poor',          pct: '20–29%' },
  { grade: 1, label: 'Very Poor',     pct: 'below 20%' },
];

function _ppBuildYearHtml(papers, labelPrefix) {
  const byYear = {};
  for (const p of papers) {
    if (!byYear[p.year]) byYear[p.year] = {};
    const yr = byYear[p.year];
    if (!yr[p.session]) yr[p.session] = {};
    const sess = yr[p.session];
    if (!sess[p.paper]) sess[p.paper] = {};
    sess[p.paper][p.component] = { url: p.url, pcUrl: p.pcUrl || '' };
  }
  let html = '';
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);
  for (const yr of years) {
    html += `<div class="pp-year-group"><div class="pp-year-hd">${yr}</div>`;
    for (const [sess, paperMap] of Object.entries(byYear[yr])) {
      html += `<div class="pp-session-group"><div class="pp-session-hd">${_ppEsc(sess)}</div><div class="pp-papers-row">`;
      for (const [paperLabel, comps] of Object.entries(paperMap)) {
        const label = `${labelPrefix}${yr} · ${sess} · ${paperLabel}`;
        html += `<div class="pp-paper-group">
          <div class="pp-paper-label">${_ppEsc(paperLabel)}</div>
          <div class="pp-paper-btns">`;
        if (comps.QP) html += `<button class="pp-paper-btn qp" onclick="ppOpenPaper('${_ppEsc(comps.QP.url)}','${_ppEsc(comps.QP.pcUrl)}','${_ppEsc(label + ' QP')}')">QP</button>`;
        if (comps.MS) html += `<button class="pp-paper-btn ms" onclick="ppOpenPaper('${_ppEsc(comps.MS.url)}','${_ppEsc(comps.MS.pcUrl)}','${_ppEsc(label + ' MS')}')">MS</button>`;
        html += `</div></div>`;
      }
      html += `</div></div>`;
    }
    html += `</div>`;
  }
  return html;
}

function ppSelectSubject(examCode) {
  _ppActiveCode = examCode;
  const el = document.getElementById('pp-content');
  if (!el) return;

  const subj = _ppUserSubjects.find(s => (s.exam_code || '').toUpperCase() === examCode.toUpperCase());
  const data = getPastPapersForCode(examCode);
  if (!data) { _renderPpSubjectList(); return; }

  const isIBSubj = data.qualification === 'IB Diploma';
  const userLevel = subj?.level || null;

  const subjName = subj?.name || data.subjectName;
  const lvlBadge = userLevel
    ? `<span class="ib-lv-badge ib-lv-${_ppEsc(userLevel).toLowerCase()}" style="margin-left:6px;vertical-align:middle">${_ppEsc(userLevel)}</span>`
    : '';

  let html = `<div class="pp-back-row">
    <button class="pp-back-btn" onclick="ppBackToSubjects()">← All Subjects</button>
    <div>
      <div class="pp-subject-title">${_ppEsc(subjName)}${lvlBadge}</div>
      <div class="pp-subject-meta">${_ppEsc(data.qualification)} · ${_ppEsc(data.examBoard)} · ${_ppEsc(examCode)}</div>
    </div>
  </div>`;

  // IB grade boundary bar (Part D)
  if (isIBSubj) {
    html += `<div class="pp-ib-grade-bar">
      <span class="pp-ib-grade-label">IB Grade Boundaries (approximate)</span>
      <div class="pp-ib-grade-chips">
        ${IB_GRADE_BOUNDARIES.map(b =>
          `<span class="pp-ib-grade-chip pp-ib-g${b.grade}"><b>${b.grade}</b> ${b.pct}</span>`
        ).join('')}
      </div>
      <span class="pp-ib-grade-note">Boundaries vary by subject and year — these are approximate</span>
    </div>`;
  }

  // IB: filter papers by user level
  if (isIBSubj && userLevel && userLevel !== 'Core') {
    const { hlPapers, slPapers, allPapers } = filterIBPapers(data.papers, userLevel);
    if (allPapers) {
      // SL user: show SL only
      html += _ppBuildYearHtml(allPapers, '');
    } else {
      // HL user: HL papers, then SL as optional
      html += _ppBuildYearHtml(hlPapers, 'HL · ');
      if (slPapers.length) {
        html += `<div class="pp-ib-sl-optional"><div class="pp-ib-sl-hd">SL Papers — Optional Practice</div>`;
        html += _ppBuildYearHtml(slPapers, 'SL · ');
        html += `</div>`;
      }
    }
  } else {
    // Non-IB or Core: show all papers as before
    html += _ppBuildYearHtml(data.papers, '');
  }

  el.innerHTML = html;
}
window.ppSelectSubject = ppSelectSubject;

function ppBackToSubjects() {
  _ppActiveCode = null;
  _renderPpSubjectList();
}
window.ppBackToSubjects = ppBackToSubjects;

let _ppCurrentUrl = '';
let _ppCurrentLabel = '';

function ppOpenPaper(url, pcUrl, label) {
  const panel = document.getElementById('pp-link-panel');
  const labelEl = document.getElementById('pp-link-label');
  const primaryBtn = document.getElementById('pp-link-primary');
  const fallbackBtn = document.getElementById('pp-link-fallback');
  if (!panel) return;
  _ppCurrentUrl = url;
  _ppCurrentLabel = label;
  if (labelEl) labelEl.textContent = label;
  if (primaryBtn) primaryBtn.href = url;
  if (fallbackBtn) fallbackBtn.href = pcUrl || 'https://pastpapers.papacambridge.com/';
  panel.classList.remove('hidden');
}
window.ppOpenPaper = ppOpenPaper;

function ppClosePaperPanel() {
  const panel = document.getElementById('pp-link-panel');
  if (panel) panel.classList.add('hidden');
}
window.ppClosePaperPanel = ppClosePaperPanel;


/* ============ nav ============ */
function go(v){
  if (!v) return;
  if (_homeEditMode && v !== 'dash') exitLayoutEdit();
  document.querySelectorAll("#nav button").forEach(b=>b.classList.toggle("active",b.dataset.v===v));
  ["dash","focus","subjects","week","logs","toolkit","coverage","citation"].forEach(x=>{
    const el = document.getElementById("view-"+x);
    if (el) el.classList.toggle("hidden",x!==v);
  });
  const layoutBtn = document.getElementById('layout-customize-btn');
  if (layoutBtn) layoutBtn.style.display = v === 'dash' ? '' : 'none';
  if(v==="dash")renderDash();
  if(v==="focus")renderFocus();
  if(v==="subjects")renderSubjects();
  if(v==="week")renderWeek();
  if(v==="logs"){initPastPapers();}
  if(v==="toolkit")renderToolkit();
  if(v==="coverage")renderCoverage();
  if(v==="citation")renderCitation();
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
      // examDate is NOT read from the legacy blob — profiles.exam_date is the
      // source of truth (see syncExamDateFromProfile()). Reading it here would
      // silently overwrite a date the user set via Edit Profile on every reload.

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

function friendlyAuthError(msg) {
  const m = (msg || '').toLowerCase();
  if (m.includes('invalid login credentials') || m.includes('invalid credentials'))
    return 'Incorrect email or password';
  if (m.includes('email not confirmed') || m.includes('not confirmed'))
    return 'Please verify your email first — check your inbox';
  if (m.includes('user already registered') || m.includes('already registered'))
    return 'An account with this email already exists — try logging in';
  if (m.includes('password should be at least') || m.includes('password must be at least'))
    return 'Password must be at least 6 characters';
  if (m.includes('rate limit') || m.includes('too many requests'))
    return 'Too many attempts — please wait a moment and try again';
  if (m.includes('invalid email'))
    return 'Enter a valid email address';
  return msg;
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
      status.textContent = friendlyAuthError(error.message);
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
      const friendly = friendlyAuthError(error.message);
      status.textContent = friendly;
      setToast(friendly);
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
  document.getElementById('forgotRow').style.display = isSignup ? 'none' : 'block';
  document.getElementById('resetPanel').style.display = 'none';
  document.getElementById('loginPassword').style.display = '';
  document.getElementById('authToggleRow').style.display = '';
  document.getElementById('loginSubtitle').textContent = isSignup ? 'Create your free account' : 'Sign in to your account';
  document.getElementById('authToggleText').textContent = isSignup ? 'Already have an account?' : 'New here?';
  document.getElementById('authToggleBtn').textContent = isSignup ? 'Sign in' : 'Create account';
  document.getElementById('loginPassword').autocomplete = isSignup ? 'new-password' : 'current-password';
  document.getElementById('loginStatus').textContent = '';
}

async function handleForgotPassword() {
  const email = document.getElementById('loginEmail').value.trim();
  const status = document.getElementById('loginStatus');
  if (!email) { status.textContent = 'Enter your email address above first'; return; }

  const btn = document.getElementById('forgotBtn');
  btn.disabled = true; btn.textContent = 'Sending…';
  status.textContent = '';

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/app',
    });
    if (error) {
      status.textContent = friendlyAuthError(error.message);
    } else {
      status.textContent = 'Password reset link sent — check your inbox';
      setToast('Reset link sent!');
    }
  } catch (err) {
    status.textContent = friendlyAuthError(err.message);
  } finally {
    btn.disabled = false; btn.textContent = 'Forgot password?';
  }
}

function showPasswordResetPanel() {
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('signinButtons').style.display = 'none';
  document.getElementById('signupButtons').style.display = 'none';
  document.getElementById('forgotRow').style.display = 'none';
  document.getElementById('loginPassword').style.display = 'none';
  document.getElementById('authToggleRow').style.display = 'none';
  document.getElementById('resetPanel').style.display = 'flex';
  document.getElementById('loginSubtitle').textContent = 'Choose a new password';
  document.getElementById('loginStatus').textContent = '';
  document.getElementById('resetNewPassword').value = '';
  setTimeout(() => document.getElementById('resetNewPassword').focus(), 100);
}

async function handlePasswordReset() {
  const pwd = document.getElementById('resetNewPassword').value;
  const btn = document.getElementById('resetBtn');
  const status = document.getElementById('loginStatus');

  if (!pwd || pwd.length < 6) {
    status.textContent = 'Password must be at least 6 characters';
    return;
  }

  btn.disabled = true; btn.textContent = 'Saving…';

  try {
    const { error } = await supabase.auth.updateUser({ password: pwd });
    if (error) {
      status.textContent = friendlyAuthError(error.message);
    } else {
      status.textContent = 'Password updated — signing you in…';
      setToast('Password updated!');
      document.getElementById('resetPanel').style.display = 'none';
      // onAuthStateChange will fire SIGNED_IN and handleSession() will take over
    }
  } catch (err) {
    status.textContent = friendlyAuthError(err.message);
  } finally {
    btn.disabled = false; btn.textContent = 'Set new password';
  }
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
      const friendly = friendlyAuthError(error.message);
      status.textContent = friendly;
      setToast('Signup failed');
    } else if (data?.user && data.user.identities?.length === 0) {
      // Supabase returns no error but empty identities when email already registered
      status.textContent = 'An account with this email already exists — try logging in';
    } else if (data?.session) {
      // Email confirmation disabled — logged in immediately
      handleSession(data.session);
    } else {
      status.textContent = 'Check your inbox to verify your email, then sign in here.';
      setToast('Verification email sent!');
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
    _privacyCache = null;
    _pendingReqs = [];
    _lbData = null;
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

// Builds a one-line student context string from the real profile instead of
// hardcoding "Edexcel IGCSE candidate sitting exams in Nov 2026" — that was
// sent to Gemini for every AI Advisor call regardless of the user's actual
// qualification, exam board, or exam date.
async function buildStudentContextLine() {
  try {
    const prof = await getProfile();
    const qual = prof?.qualification || 'their qualification';
    const board = prof?.exam_board ? ` (${prof.exam_board})` : '';
    const dateStr = prof?.exam_date
      ? new Date(prof.exam_date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
      : null;
    const when = dateStr ? ` sitting exams around ${dateStr}` : '';
    return `The student is studying ${qual}${board}${when}. Here is their cockpit progress data:`;
  } catch (e) {
    console.warn('[AI Advisor] Failed to load profile for context:', e.message);
    return `Here is the student's cockpit progress data:`;
  }
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
    
    const contextLine = await buildStudentContextLine();
    const prompt = `You are a senior tutor with years of experience getting students top grades. Be direct, professional, and precise. Never sugarcoat — if the student is behind, say so plainly with specifics. No vague motivational filler, no hedging, no padding. Base everything strictly on the actual progress data provided. If you don't have enough data to judge something, say so rather than inventing it.

${contextLine}

${summary}

Respond ONLY in this exact structure. No preamble, no extra commentary.

STATUS — [one line: where the student stands right now, with the real numbers]

GRADE OUTLOOK — [one line: on current pace, how likely top grades are, and what would have to change — use the actual grading scale for their qualification]

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
    
    const weeklyContextLine = await buildStudentContextLine();
    const prompt = `You are an elite academic strategist. ${weeklyContextLine} Review their complete cockpit dashboard:

${summary}

Provide a brutally honest weekly check-in:
1. VERDICT: One sentence — on track for top grades or not, using the actual grading scale for their qualification? Why?
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
window.addTodo = addTodo;
window.toggleTodo = toggleTodo;
window.deleteTodo = deleteTodo;
window.cyclePriority = cyclePriority;
window.addSubtask = addSubtask;
window.cyclePendingPriority = cyclePendingPriority;
window.openSubtaskInput = openSubtaskInput;
window.toggleCompletedSection = toggleCompletedSection;
window.startFromBlock = startFromBlock;
window.copyPrompt = copyPrompt;
window.copyPrereqCheckPrompt = copyPrereqCheckPrompt;
window.cycleStatus = cycleStatus;
window.handleLogin = handleLogin;
window.handlePasswordLogin = handlePasswordLogin;
window.handleSignup = handleSignup;
window.toggleAuthMode = toggleAuthMode;
window.handleLogout = handleLogout;
window.handleForgotPassword = handleForgotPassword;
window.handlePasswordReset = handlePasswordReset;
window.getAIRecommendation = getAIRecommendation;
window.runWeeklyCheckIn = runWeeklyCheckIn;
window.closeAIModal = closeAIModal;
window.bibExtract = bibExtract;
window.bibCopyOutput = bibCopyOutput;
window.bibClear = bibClear;
window.bibFindCitations = bibFindCitations;
window.bibSetStyle = bibSetStyle;
window.bibCopySelected = bibCopySelected;

// Onboarding wizard
window.wizNext = wizNext;
window.wizBack = wizBack;
window.wizQualChange = wizQualChange;
window.wizBoardChange = wizBoardChange;
window.wizNoDateToggle = wizNoDateToggle;
window.wizAddFromTemplate = wizAddFromTemplate;
window.wizAddManual = wizAddManual;
window.wizRemoveSubject = wizRemoveSubject;
window.wizComplete = wizComplete;
window.wizMigrate = wizMigrate;
window.wizSkipMigration = wizSkipMigration;
window.wizSkip = wizSkip;


/* ============ share card ============ */
import html2canvas from 'html2canvas';

function buildShareCardHTML() {
  const today     = todayStr();
  const todaySessions = _sbCache.sessions.filter(s => s.study_date === today);
  const totalSec  = todaySessions.reduce((a, s) => a + s.duration_sec, 0);
  const totalHrs  = (totalSec / 3600).toFixed(1);
  const streak    = computeStreakSb();
  const readyPct  = overallReady();
  const dateLabel = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  // Subjects studied today with sec
  const subjMap = {};
  for (const s of todaySessions) {
    subjMap[s.subject_id] = (subjMap[s.subject_id] || 0) + s.duration_sec;
  }
  const maxSec = Math.max(...Object.values(subjMap), 1);
  const subjRows = Object.entries(subjMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([subjId, sec]) => {
      const subj = _sbCache.subjects.find(s => s.id === subjId);
      const name  = subj ? subj.name.replace(/\s*\(.*\)/, '').trim() : 'Unknown subject';
      const pct   = Math.round((sec / maxSec) * 100);
      const mins  = Math.round(sec / 60);
      const label = mins >= 60 ? `${Math.floor(mins/60)}h${mins%60?` ${mins%60}m`:''}` : `${mins}m`;
      return `<div class="sc-subj-row">
        <div class="sc-subj-name">${escapeHtml(name)}</div>
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

function _tsLum(hex){const h=(hex||'#000').replace('#','').padEnd(6,'0');const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);return(r*299+g*587+b*114)/1000;}

function _renderTsPresets() {
  const el = document.getElementById('ts-preset-grid');
  if (!el) return;
  const current = getCurrentThemeData();
  el.innerHTML = Object.entries(THEMES).map(([key, th]) => {
    const bg      = th.vars['--ink']  || '#0a0a0a';
    const surface = th.vars['--ink2'] || '#141414';
    const accent  = th.vars['--amber']|| '#e8a33d';
    const textCol = th.vars['--paper']|| '#f0ede8';
    const border  = th.vars['--line'] || '#2a2820';
    const active  = current.preset === key;
    const light   = _tsLum(bg) > 128;
    const dividerCol = light ? 'rgba(0,0,0,.08)' : 'rgba(255,255,255,.06)';
    const textOpacity = light ? '0.65' : '0.55';
    const subtleLines = light ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.1)';
    return `<div class="ts-preset-card${active ? ' ts-active' : ''}" onclick="tsSelectPreset('${key}')" title="${th.label}" style="background:${bg}">
      <div style="width:100%;height:100%;display:flex;flex-direction:column;padding:6px;gap:3px;box-sizing:border-box">
        <div style="background:${surface};border-radius:3px;padding:5px 6px;flex:1;display:flex;flex-direction:column;gap:2px;min-height:0;overflow:hidden;border:1px solid ${dividerCol}">
          <div style="height:1.5px;background:${accent};border-radius:1px;width:55%;opacity:.9"></div>
          <div style="height:1.5px;background:${textCol};border-radius:1px;width:80%;opacity:.12;margin-top:1px"></div>
          <div style="height:1.5px;background:${textCol};border-radius:1px;width:60%;opacity:.08;margin-top:1px"></div>
          <div style="margin-top:auto;font-family:monospace;font-size:9.5px;font-weight:700;color:${accent};line-height:1;letter-spacing:-.01em">42</div>
        </div>
        <div style="height:2px;background:${accent};border-radius:1px;width:40%;opacity:.85"></div>
        <div style="font-family:monospace;font-size:6px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${textCol};opacity:${textOpacity};line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${th.label}</div>
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
  document.documentElement.style.background = '';
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
  let bg = '';
  if (t === 'solid') {
    bg = _tsBgState.solid || '';
  } else if (t === 'linear') {
    const { angle = 135, stops = [] } = _tsBgState.linear;
    bg = `linear-gradient(${angle}deg,${stops.join(',')})`;
  } else if (t === 'radial') {
    const { x = 50, y = 50, stops = [] } = _tsBgState.radial;
    bg = `radial-gradient(circle at ${x}% ${y}%,${stops.join(',')})`;
  } else if (t === 'mesh') {
    const { tl, tr, bl, br } = _tsBgState.mesh;
    bg = [
      `radial-gradient(ellipse at 0% 0%,${tl} 0%,transparent 60%)`,
      `radial-gradient(ellipse at 100% 0%,${tr} 0%,transparent 60%)`,
      `radial-gradient(ellipse at 0% 100%,${bl} 0%,transparent 60%)`,
      `radial-gradient(ellipse at 100% 100%,${br} 0%,transparent 60%)`,
    ].join(',');
  }
  document.body.style.background = bg;
  document.documentElement.style.background = bg;
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
    fontScale: _tsTypoState.scale || 'default',
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
  document.documentElement.style.fontSize = { compact: '13px', default: '15px', large: '17px' }[s] || '15px';
  localStorage.setItem('sq_font_scale', s);
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
    document.documentElement.style.fontSize = { compact: '13px', default: '15px', large: '17px' }[_tsTypoState.scale] || '15px';
    localStorage.setItem('sq_font_scale', _tsTypoState.scale);
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
  document.documentElement.style.background = '';
  document.documentElement.style.fontSize = '15px';
  localStorage.setItem('sq_font_scale', 'default');
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
    else if (_tsBgState.solid) { document.body.style.background = _tsBgState.solid; document.documentElement.style.background = _tsBgState.solid; }
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
    const sz = { compact: '13px', default: '15px', large: '17px' }[_tsTypoState.scale] || '15px';
    document.documentElement.style.fontSize = sz;
    localStorage.setItem('sq_font_scale', _tsTypoState.scale || 'default');
  }
}
_tsRestoreExtra();

/* ============ homepage layout ============ */

const HOME_DEFAULT_LAYOUT = [
  { id: 'hero',         visible: true },
  { id: 'study-now',   visible: true },
  { id: 'recall-todos',visible: true },
  { id: 'today-week',  visible: true },
  { id: 'progress',    visible: true },
  { id: 'analytics',   visible: true },
];

const HOME_ROW_LABELS = {
  'hero':          'Countdown & Momentum',
  'study-now':     'What to Study Right Now',
  'recall-todos':  'Recall Check & Tasks',
  'today-week':    "Today's Blocks & This Week",
  'progress':      'Subject Progress',
  'analytics':     'Advanced Analytics',
};

let _homeLayout = null;
let _homeEditMode = false;
let _homeDragSrc = null;
let _homeTouchDragEl = null;
let _homeTouchStartY = 0;
let _homeTouchLastY = 0;
let _homeResizeObserver = null;

function _homeLayoutKey() { return 'sq_homepage_layout'; }

async function loadHomeLayout() {
  const cached = localStorage.getItem(_homeLayoutKey());
  if (cached) {
    try { _homeLayout = JSON.parse(cached); } catch(e) {}
  }
  applyHomeLayout();

  if (supabase && currentUser) {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('homepage_layout')
        .eq('id', currentUser.id)
        .single();
      if (data?.homepage_layout) {
        _homeLayout = data.homepage_layout;
        localStorage.setItem(_homeLayoutKey(), JSON.stringify(_homeLayout));
        applyHomeLayout();
      }
    } catch(e) {}
  }
}

async function _saveHomeLayout() {
  if (!_homeLayout) return;
  localStorage.setItem(_homeLayoutKey(), JSON.stringify(_homeLayout));
  if (supabase && currentUser) {
    try {
      await supabase
        .from('profiles')
        .update({ homepage_layout: _homeLayout, updated_at: new Date().toISOString() })
        .eq('id', currentUser.id);
    } catch(e) {}
  }
}

function applyHomeLayout() {
  if (!_homeLayout) _homeLayout = HOME_DEFAULT_LAYOUT.map(r => ({ ...r }));

  // Merge in any IDs from default that are missing (future-proof)
  const existingIds = new Set(_homeLayout.map(r => r.id));
  HOME_DEFAULT_LAYOUT.forEach(def => {
    if (!existingIds.has(def.id)) _homeLayout.push({ ...def });
  });

  const container = document.getElementById('home-layout');
  if (!container) return;

  _homeLayout.forEach(item => {
    const row = container.querySelector(`.home-row[data-card-id="${item.id}"]`);
    if (!row) return;
    if (item.visible) {
      row.style.display = '';
      row.classList.remove('home-row-hidden');
      row.style.height = item.height ? item.height + 'px' : '';
    } else {
      row.style.display = 'none';
      row.style.height = '';
      row.classList.add('home-row-hidden');
    }
    container.appendChild(row);
  });
}

function _captureLayoutFromDOM() {
  const layout = [];
  document.querySelectorAll('#home-layout .home-row').forEach(row => {
    const h = row.style.height ? parseInt(row.style.height) : undefined;
    layout.push({
      id: row.dataset.cardId,
      visible: !row.classList.contains('home-row-hidden'),
      ...(h ? { height: h } : {}),
    });
  });
  return layout;
}

function enterLayoutEdit() {
  if (requiresPro('Homepage Layout Customization')) return;
  _homeEditMode = true;
  document.getElementById('nav').style.display = 'none';
  const layoutBtn = document.getElementById('layout-customize-btn');
  if (layoutBtn) layoutBtn.style.display = 'none';
  const editBar = document.getElementById('layout-edit-bar');
  if (editBar) editBar.style.display = 'flex';
  const container = document.getElementById('home-layout');
  if (container) container.classList.add('edit-mode');
  const addPanel = document.getElementById('layout-add-panel');
  if (addPanel) addPanel.classList.remove('hidden');
  _renderLayoutAddPanel();
  _initHomeDrag();
  _startResizeObserving();
}
window.enterLayoutEdit = enterLayoutEdit;

function exitLayoutEdit() {
  _homeEditMode = false;
  document.getElementById('nav').style.display = '';
  const layoutBtn = document.getElementById('layout-customize-btn');
  if (layoutBtn) layoutBtn.style.display = '';
  const editBar = document.getElementById('layout-edit-bar');
  if (editBar) editBar.style.display = 'none';
  const container = document.getElementById('home-layout');
  if (container) container.classList.remove('edit-mode');
  const addPanel = document.getElementById('layout-add-panel');
  if (addPanel) addPanel.classList.add('hidden');
  _stopResizeObserving();
  _homeLayout = _captureLayoutFromDOM();
  _saveHomeLayout();
  setToast('Layout saved');
}
window.exitLayoutEdit = exitLayoutEdit;

function resetLayout() {
  _homeLayout = HOME_DEFAULT_LAYOUT.map(r => ({ ...r }));
  applyHomeLayout();
  _renderLayoutAddPanel();
  if (_homeEditMode) _initHomeDrag();
  _saveHomeLayout();
  setToast('Layout reset to default');
}
window.resetLayout = resetLayout;

function removeHomeRow(id) {
  const row = document.querySelector(`#home-layout .home-row[data-card-id="${id}"]`);
  if (row) { row.style.display = 'none'; row.classList.add('home-row-hidden'); }
  _renderLayoutAddPanel();
}
window.removeHomeRow = removeHomeRow;

function addHomeRow(id) {
  const row = document.querySelector(`#home-layout .home-row[data-card-id="${id}"]`);
  if (row) { row.style.display = ''; row.classList.remove('home-row-hidden'); }
  _renderLayoutAddPanel();
  if (_homeEditMode) _initHomeDrag();
}
window.addHomeRow = addHomeRow;

function _renderLayoutAddPanel() {
  const list = document.getElementById('layout-add-list');
  if (!list) return;
  const hidden = document.querySelectorAll('#home-layout .home-row.home-row-hidden');
  if (!hidden.length) {
    list.innerHTML = '<div style="font-family:var(--mono);font-size:11px;color:var(--text-dim);padding:4px 0">All sections visible</div>';
    return;
  }
  list.innerHTML = '';
  hidden.forEach(row => {
    const id = row.dataset.cardId;
    const el = document.createElement('div');
    el.className = 'layout-add-item';
    el.dataset.cardId = id;
    el.innerHTML = `<span>${HOME_ROW_LABELS[id] || id}</span><button class="btn sm" onclick="addHomeRow('${id}')">+ Add back</button>`;
    list.appendChild(el);
  });
}

function _clearDragIndicators() {
  document.querySelectorAll('#home-layout .home-row').forEach(r => {
    r.classList.remove('drag-insert-above', 'drag-insert-below');
  });
}

function _initHomeDrag() {
  const rows = document.querySelectorAll('#home-layout .home-row:not(.home-row-hidden)');
  rows.forEach(row => {
    // Clone bar to wipe stale listeners
    const oldBar = row.querySelector('.home-row-bar');
    if (!oldBar) return;
    const newBar = oldBar.cloneNode(true);
    oldBar.parentNode.replaceChild(newBar, oldBar);

    const handle = newBar.querySelector('.home-row-handle');
    const removeBtn = newBar.querySelector('.home-row-remove');

    // FIX: only handle enables drag — stop remove button from triggering drag on mousedown
    if (removeBtn) {
      removeBtn.addEventListener('mousedown', e => e.stopPropagation());
    }
    if (handle) {
      handle.style.cursor = 'grab';
      handle.addEventListener('mousedown', () => row.setAttribute('draggable', 'true'));
      handle.addEventListener('touchstart', e => {
        _homeTouchDragEl = row;
        _homeTouchStartY = e.touches[0].clientY;
        _homeTouchLastY = e.touches[0].clientY;
        row.classList.add('dragging');
        e.preventDefault();
      }, { passive: false });
    }

    row.ondragstart = e => {
      _homeDragSrc = row;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', row.dataset.cardId);
      setTimeout(() => row.classList.add('dragging'), 0);
    };
    row.ondragend = () => {
      row.classList.remove('dragging');
      row.removeAttribute('draggable');
      _clearDragIndicators();
      _homeDragSrc = null;
    };
    row.ondragover = e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (row === _homeDragSrc) return;
      _clearDragIndicators();
      const rect = row.getBoundingClientRect();
      row.classList.add(e.clientY < rect.top + rect.height / 2 ? 'drag-insert-above' : 'drag-insert-below');
    };
    row.ondrop = e => {
      e.preventDefault();
      const insertAbove = row.classList.contains('drag-insert-above');
      _clearDragIndicators();
      if (!_homeDragSrc || _homeDragSrc === row) return;
      const cont = document.getElementById('home-layout');
      cont.insertBefore(_homeDragSrc, insertAbove ? row : row.nextSibling);
    };
  });

  // Touch move/end: global document handlers replaced each call to avoid stacking
  document.removeEventListener('touchmove', _homeTouchMove);
  document.removeEventListener('touchend', _homeTouchEnd);
  document.addEventListener('touchmove', _homeTouchMove, { passive: false });
  document.addEventListener('touchend', _homeTouchEnd);
}

function _homeTouchMove(e) {
  if (!_homeTouchDragEl) return;
  e.preventDefault();
  const y = e.touches[0].clientY;
  _homeTouchLastY = y;
  _homeTouchDragEl.style.transform = `translateY(${y - _homeTouchStartY}px)`;
  _homeTouchDragEl.style.zIndex = '100';
  const cont = document.getElementById('home-layout');
  if (!cont) return;
  _clearDragIndicators();
  const visible = [...cont.querySelectorAll('.home-row:not(.home-row-hidden)')];
  const target = visible.find(r => {
    if (r === _homeTouchDragEl) return false;
    const rect = r.getBoundingClientRect();
    return y >= rect.top && y <= rect.bottom;
  });
  if (target) {
    const rect = target.getBoundingClientRect();
    target.classList.add(y < rect.top + rect.height / 2 ? 'drag-insert-above' : 'drag-insert-below');
  }
}

function _homeTouchEnd() {
  if (!_homeTouchDragEl) return;
  _homeTouchDragEl.style.transform = '';
  _homeTouchDragEl.style.zIndex = '';
  _homeTouchDragEl.classList.remove('dragging');
  const cont = document.getElementById('home-layout');
  if (cont) {
    _clearDragIndicators();
    const visible = [...cont.querySelectorAll('.home-row:not(.home-row-hidden)')];
    const target = visible.find(r => {
      if (r === _homeTouchDragEl) return false;
      const rect = r.getBoundingClientRect();
      return _homeTouchLastY >= rect.top && _homeTouchLastY <= rect.bottom;
    });
    if (target) {
      const all = [...cont.querySelectorAll('.home-row')];
      const si = all.indexOf(_homeTouchDragEl);
      const ti = all.indexOf(target);
      const insertAbove = _homeTouchLastY < target.getBoundingClientRect().top + target.getBoundingClientRect().height / 2;
      cont.insertBefore(_homeTouchDragEl, insertAbove ? target : target.nextSibling);
    }
  }
  _homeTouchDragEl = null;
}

function _startResizeObserving() {
  if (!window.ResizeObserver) return;
  _homeResizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      const row = entry.target;
      const id = row.dataset.cardId;
      if (!id || !_homeLayout) return;
      const h = Math.round(entry.contentRect.height);
      const item = _homeLayout.find(x => x.id === id);
      if (item && h > 0) item.height = h;
    });
  });
  document.querySelectorAll('#home-layout .home-row:not(.home-row-hidden)').forEach(row => {
    _homeResizeObserver.observe(row);
  });
}

function _stopResizeObserving() {
  if (_homeResizeObserver) { _homeResizeObserver.disconnect(); _homeResizeObserver = null; }
}

/* ============ burger menu ============ */

let _burgerProfileCache = null;
let _privacyCache = null;
const _privacyDefaults = { show_streak: true, show_hours: true, show_leaderboard: true, friend_requests: 'everyone' };
let _pendingReqs = [];
let _lbData = null;
let _lbActiveTab = 'lb';
let _lbSearchTimer = null;

let _bonesRegion = 'All';
let _bonesQuery = '';
let _musclesRegion = 'All';
let _musclesQuery = '';
let _muscleMode = 'learn';   // learn | recall | quiz
// Quiz state (client-only; questions generated from the MUSCLES dataset).
let _quiz = { questions: [], idx: 0, score: 0, answered: false };
// Spaced-repetition state: muscle_id → { reps, next_due, last_result }
let _muscleRecall = {};
let _muscleDueOnly = false;   // Recall-mode filter: show only muscles due today

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
  const pickerThemes = ['ascent', 'obsidian', 'midnight'];
  
  return `<div class="bm-theme-grid">` + pickerThemes.map(key => {
    const th = THEMES[key];
    const accent = th.vars['--amber'];
    const bg = th.vars['--ink2'];
    const active = current.preset === key;
    const isPremium = key !== 'ascent';
    const locked = isPremium && !isPro();
    
    return `<div class="bm-swatch${active ? ' active' : ''}${locked ? ' locked' : ''}"
      style="background:${bg};border-color:${active ? accent : 'transparent'};box-shadow:inset 0 0 0 4px ${accent}"
      title="${th.label}${locked ? ' (Pro)' : ''}"
      onclick="bmSelectTheme('${key}')">
      ${locked ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;color:rgba(255,255,255,0.8);position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>' : ''}
    </div>`;
  }).join('') + `</div>`;
}

function _bmProfileHtml(prof) {
  const n = escapeHtml((prof && prof.display_name) || '—');
  const e = escapeHtml(currentUser?.email || '');
  const { qualification, examBoard } = resolveQualBoard(prof || {});
  const qb = escapeHtml(formatQualBoard(qualification, examBoard));
  const rawDate = (prof && prof.exam_date) || '';
  const dDisplay = rawDate
    ? new Date(rawDate + 'T00:00:00').toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'})
    : '—';
  return `
    <div class="bm-row"><span class="bm-key">Name</span><span class="bm-val" style="cursor:default">${n}</span></div>
    <div class="bm-row"><span class="bm-key">Email</span><span class="bm-val" style="cursor:default;color:var(--muted)">${e}</span></div>
    <div class="bm-row"><span class="bm-key">Qualification</span><span class="bm-val" style="cursor:default">${qb}</span></div>
    <div class="bm-row"><span class="bm-key">Exam date</span><span class="bm-val" style="cursor:default">${dDisplay}</span></div>
    <div style="margin-top:10px"><button class="bm-open-ts" style="font-size:10px;padding:7px 12px" onclick="openEditProfileModal()">Edit profile</button></div>`;
}

function _bmSettingsHtml(profile) {
  const emailReports = profile?.email_reports !== false;
  return `
    <div class="bm-toggle-row">
      <span class="bm-toggle-label">Weekly email report</span>
      <label class="bm-toggle"><input type="checkbox" ${emailReports ? 'checked' : ''} onchange="bmEmailReportToggle(this.checked)"><span class="bm-toggle-slider"></span></label>
    </div>`;
}

window.bmImportLegacyData = async function() {
  const btn    = document.getElementById('bm-legacy-btn');
  const status = document.getElementById('bm-legacy-status');
  if (btn)  { btn.disabled = true; btn.textContent = 'Importing…'; }

  try {
    const stats = await migrateFromStudyState((msg) => {
      if (status) status.textContent = msg;
    });
    const summary = [
      stats.subjects  ? `${stats.subjects} new subjects`     : '',
      stats.topics    ? `${stats.topics} topics`             : '',
      stats.sessions  ? `${stats.sessions} study sessions`   : '',
      stats.errors    ? `${stats.errors} error log entries`  : '',
      stats.papers    ? `${stats.papers} past papers`        : '',
      stats.closeout  ? `${stats.closeout} daily close-outs` : '',
    ].filter(Boolean).join(', ');
    if (status) status.textContent = `✓ Done — ${summary || 'history imported'}`;
    if (btn) { btn.textContent = 'Imported'; }
    setToast('Study history imported — reloading…');
    setTimeout(() => window.location.reload(), 1200);
  } catch (err) {
    if (status) status.textContent = 'Import failed: ' + err.message;
    if (btn) { btn.disabled = false; btn.textContent = 'Try again'; }
  }
};

window.bmEmailReportToggle = async function(enabled) {
  if (_burgerProfileCache) _burgerProfileCache.email_reports = enabled;
  try {
    await updateProfile({ email_reports: enabled });
    setToast(enabled ? 'Weekly reports on' : 'Weekly reports off');
  } catch (e) {
    setToast('Save failed — check connection');
  }
};

function renderBurgerMenu() {
  const menu = document.getElementById('burger-menu');
  if (!menu) return;

  // All synchronous — renders immediately so menu has height
  const totalHrs = hoursFor(() => true).toFixed(1);
  const allTopicsList = topics ? Object.values(topics).flat() : [];
  const topicsReady = allTopicsList.filter(t => t.status === 'ready' || t.status === 'mastered').length;
  const bestStreak = getBestStreak();
  const papersCount = (papers || []).length;

  menu.innerHTML = `
    <div class="bm-section">
      <div class="bm-section-label">Profile</div>
      <div id="bm-profile-body">${_bmProfileHtml(_burgerProfileCache)}</div>
    </div>
    <div class="bm-divider"></div>
    <div class="bm-section">
      <div class="bm-section-label">Premium Themes</div>
      ${_bmSwatchesHtml()}
      <button class="bm-open-ts" style="margin-top:10px" onclick="closeBurgerMenu();openThemeStudio()">Open full Theme Studio</button>
    </div>
    <div class="bm-divider"></div>
    <div class="bm-section">
      <div class="bm-section-label">Stats</div>
      <div class="bm-stats-grid">
        <div class="bm-stat"><div class="bm-stat-val" id="bm-stat-hrs">${totalHrs}h</div><div class="bm-stat-key">Total studied</div></div>
        <div class="bm-stat"><div class="bm-stat-val" id="bm-stat-topics">${topicsReady}</div><div class="bm-stat-key">Topics ready</div></div>
        <div class="bm-stat"><div class="bm-stat-val" id="bm-stat-streak">${bestStreak}</div><div class="bm-stat-key">Best streak</div></div>
        <div class="bm-stat"><div class="bm-stat-val" id="bm-stat-papers">${papersCount}</div><div class="bm-stat-key">Papers logged</div></div>
      </div>
    </div>
    <div class="bm-divider"></div>
    <div class="bm-section">
      <div class="bm-section-label">Friends${_pendingReqs.length ? ` <span class="bm-badge">${_pendingReqs.length}</span>` : ''}</div>
      <button class="bm-open-ts" onclick="closeBurgerMenu();openLeaderboard()">Leaderboard &amp; Friends</button>
      ${_pendingReqs.length ? `<div style="margin-top:8px;font-family:var(--mono);font-size:11px;color:var(--amber-soft)">${_pendingReqs.length} friend request${_pendingReqs.length > 1 ? 's' : ''} waiting</div>` : ''}
    </div>
    <div class="bm-divider"></div>
    <div class="bm-section" id="bm-anatomy-body">
      ${_bmAnatomyHtml(_burgerProfileCache)}
    </div>
    <div class="bm-divider"></div>
    <div class="bm-section">
      <div class="bm-section-label">Settings</div>
      <div id="bm-settings-body">${_bmSettingsHtml(_burgerProfileCache)}</div>
    </div>
    <div class="bm-section hidden" id="bm-legacy-section">
      <div class="bm-divider"></div>
      <div class="bm-section-label">Old Study Data Found</div>
      <div id="bm-legacy-body"></div>
    </div>
    <div class="bm-divider"></div>
    <div class="bm-section" id="bm-privacy-body">
      ${_bmPrivacyHtml(_privacyCache)}
    </div>
    <div class="bm-divider"></div>
    <div id="pwa-install-btn" class="bm-section hidden" style="padding-top:10px;padding-bottom:10px">
      <button class="bm-open-ts" onclick="closeBurgerMenu();installPWA()" style="width:100%;background:var(--surface-2);color:var(--accent)">⬇ Install App</button>
    </div>
    <div class="bm-section" style="padding-top:10px;padding-bottom:10px">
      <button class="bm-signout" onclick="handleLogout()">Sign out</button>
    </div>`;

  // Async-fill profile + privacy only if not cached yet
  if ((!_burgerProfileCache || !_privacyCache) && currentUser) {
    supabase
      .from('profiles')
      .select('display_name,qualification,exam_board,exam_date,privacy_settings,email_reports')
      .eq('id', currentUser.id)
      .single()
      .then(({ data }) => {
        _burgerProfileCache = data || {};
        _privacyCache = { ..._privacyDefaults, ...(data?.privacy_settings || {}) };
        const body = document.getElementById('bm-profile-body');
        if (body) body.innerHTML = _bmProfileHtml(_burgerProfileCache);
        const pbody = document.getElementById('bm-privacy-body');
        if (pbody) pbody.innerHTML = _bmPrivacyHtml(_privacyCache);
        const abody = document.getElementById('bm-anatomy-body');
        if (abody) abody.innerHTML = _bmAnatomyHtml(_burgerProfileCache);
        const sbody = document.getElementById('bm-settings-body');
        if (sbody) sbody.innerHTML = _bmSettingsHtml(_burgerProfileCache);
      })
      .catch(() => { _burgerProfileCache = {}; _privacyCache = { ..._privacyDefaults }; });
  }

  // Async-fill stats from Supabase (overrides local cached values with accurate DB counts)
  if (currentUser) fetchBurgerStats().catch(() => {});

  // Check for unmigrated legacy study_state data (independent of onboarding —
  // an already-onboarded account can still have this sitting unused)
  if (currentUser) {
    hasLegacyData().then(found => {
      const section = document.getElementById('bm-legacy-section');
      const body = document.getElementById('bm-legacy-body');
      if (!found || !section || !body) return;
      section.classList.remove('hidden');
      body.innerHTML = `
        <div style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:10px;line-height:1.6">
          We found data from your previous tracker that was never imported.
        </div>
        <div id="bm-legacy-status" style="font-family:var(--mono);font-size:12px;color:var(--muted);min-height:16px;margin-bottom:8px"></div>
        <button class="bm-open-ts" id="bm-legacy-btn" onclick="bmImportLegacyData()">Import my study history →</button>`;
    }).catch(() => {});
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
  if (key !== 'ascent' && !isPro()) {
    setToast('Upgrade to unlock ' + (THEMES[key]?.label || key));
    showPaywall(THEMES[key]?.label || key);
    return;
  }
  const themeData = { preset: key };
  applyTheme(themeData);
  saveTheme(themeData).catch(() => {});
  _refreshBurgerSwatches(key);
  setToast(THEMES[key]?.label || key);
};

function _bmPrivacyHtml(ps) {
  const p = { ..._privacyDefaults, ...(ps || {}) };
  const chk = (key) => p[key] ? 'checked' : '';
  return `
    <div class="bm-section-label">Privacy</div>
    <div class="bm-toggle-row">
      <span class="bm-toggle-label">Show my streak to friends</span>
      <label class="bm-toggle"><input type="checkbox" ${chk('show_streak')} onchange="bmPrivacyToggle('show_streak')"><span class="bm-toggle-slider"></span></label>
    </div>
    <div class="bm-toggle-row">
      <span class="bm-toggle-label">Show my study hours to friends</span>
      <label class="bm-toggle"><input type="checkbox" ${chk('show_hours')} onchange="bmPrivacyToggle('show_hours')"><span class="bm-toggle-slider"></span></label>
    </div>
    <div class="bm-toggle-row">
      <span class="bm-toggle-label">Show me on leaderboard</span>
      <label class="bm-toggle"><input type="checkbox" ${chk('show_leaderboard')} onchange="bmPrivacyToggle('show_leaderboard')"><span class="bm-toggle-slider"></span></label>
    </div>
    <div class="bm-toggle-row">
      <span class="bm-toggle-label">Who can send friend requests</span>
      <select class="bm-privacy-select" onchange="bmPrivacySelect('friend_requests',this.value)">
        <option value="everyone" ${p.friend_requests==='everyone'?'selected':''}>Everyone</option>
        <option value="nobody" ${p.friend_requests==='nobody'?'selected':''}>Nobody</option>
      </select>
    </div>`;
}

window.bmPrivacyToggle = async function(key) {
  if (!_privacyCache) _privacyCache = { ..._privacyDefaults };
  _privacyCache[key] = !_privacyCache[key];
  try {
    await updateProfile({ privacy_settings: _privacyCache });
    setToast('Privacy saved');
  } catch(e) {
    setToast('Save failed — check connection');
  }
};

window.bmPrivacySelect = async function(key, val) {
  if (!_privacyCache) _privacyCache = { ..._privacyDefaults };
  _privacyCache[key] = val;
  try {
    await updateProfile({ privacy_settings: _privacyCache });
    setToast('Privacy saved');
  } catch(e) {
    setToast('Save failed — check connection');
  }
};

/* ============ friends badge ============ */
async function checkFriendsBadge() {
  if (!currentUser) return;
  try {
    _pendingReqs = await getPendingRequests();
  } catch(e) { return; }
  const dot = document.getElementById('burger-dot');
  if (dot) dot.classList.toggle('hidden', _pendingReqs.length === 0);
}

/* ============ leaderboard modal ============ */
window.openLeaderboard = async function() {
  if (requiresPro('Friends & Leaderboard')) return;
  const modal = document.getElementById('lb-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  _lbActiveTab = 'lb';
  ['lb','friends','add','req'].forEach(t => {
    document.getElementById(`lb-tab-${t}`)?.classList.toggle('active', t === 'lb');
    document.getElementById(`lb-panel-${t}`)?.classList.toggle('hidden', t !== 'lb');
  });
  _updateLbReqBadge();
  if (!_lbData) {
    const panel = document.getElementById('lb-panel-lb');
    if (panel) panel.innerHTML = '<div class="lb-loading">Loading leaderboard…</div>';
    try {
      _lbData = await getFriendsLeaderboard(currentUser.id);
    } catch(e) {
      if (panel) panel.innerHTML = '<div class="lb-empty">Failed to load — check connection</div>';
      return;
    }
  }
  _renderLbPanel();
  _renderFriendsPanel();
};

window.closeLeaderboard = function() {
  document.getElementById('lb-modal')?.classList.add('hidden');
};

window.lbSwitchTab = function(tab) {
  _lbActiveTab = tab;
  ['lb','friends','add','req'].forEach(t => {
    document.getElementById(`lb-tab-${t}`)?.classList.toggle('active', t === tab);
    document.getElementById(`lb-panel-${t}`)?.classList.toggle('hidden', t !== tab);
  });
  if (tab === 'add') _renderAddFriendPanel();
  if (tab === 'req') _renderRequestsPanel();
  if (tab === 'lb') _renderLbPanel();
  if (tab === 'friends') _renderFriendsPanel();
};

function _renderLbPanel() {
  const panel = document.getElementById('lb-panel-lb');
  if (!panel) return;
  const rows = (_lbData || []).filter(r => {
    if (r.uid === currentUser?.id) return true;
    const p = r.privacy_settings || {};
    return p.show_leaderboard !== false;
  });
  if (rows.length <= 1) {
    panel.innerHTML = `<div class="lb-empty"><div style="font-size:28px;margin-bottom:10px">🏆</div><div>Add friends to see the leaderboard</div><div class="lb-empty-sub">Switch to "Add Friend" to find people</div></div>`;
    return;
  }
  const sorted = [...rows].sort((a, b) => b.weekly_hours - a.weekly_hours);
  let html = `<table class="lb-table"><thead><tr>
    <th class="lb-th">#</th><th class="lb-th">Name</th>
    <th class="lb-th lb-th-r">This week</th><th class="lb-th lb-th-r">Streak</th><th class="lb-th lb-th-r">Subj</th>
  </tr></thead><tbody>`;
  sorted.forEach((r, i) => {
    const isOwn = r.uid === currentUser?.id;
    const priv = r.privacy_settings || {};
    const hrs = priv.show_hours !== false ? `${r.weekly_hours}h` : '—';
    const streak = priv.show_streak !== false ? `${r.current_streak}d` : '—';
    const click = isOwn ? '' : `onclick="openFriendProfile('${r.uid}')" style="cursor:pointer"`;
    html += `<tr class="lb-tr${isOwn ? ' own' : ''}" ${click}>
      <td class="lb-td lb-rank">${i + 1}</td>
      <td class="lb-td">${escapeHtml(r.display_name || '')}${isOwn ? ' <span class="lb-you">you</span>' : ''}</td>
      <td class="lb-td lb-td-r">${hrs}</td>
      <td class="lb-td lb-td-r">${streak}</td>
      <td class="lb-td lb-td-r">${r.subjects_count}</td>
    </tr>`;
  });
  html += '</tbody></table>';
  panel.innerHTML = html;
}

function _renderAddFriendPanel() {
  const panel = document.getElementById('lb-panel-add');
  if (!panel) return;
  panel.innerHTML = `
    <div class="lb-search-wrap">
      <input type="text" class="lb-search" id="lb-search-input" placeholder="Search by display name…" oninput="lbSearchDebounce()" autocomplete="off">
    </div>
    <div id="lb-search-results" class="lb-results"></div>`;
}

function _renderRequestsPanel() {
  const panel = document.getElementById('lb-panel-req');
  if (!panel) return;
  if (!_pendingReqs.length) {
    panel.innerHTML = '<div class="lb-empty">No pending friend requests</div>';
    return;
  }
  panel.innerHTML = _pendingReqs.map(req => `
    <div class="lb-req-row">
      <div class="lb-req-name">${escapeHtml(req.display_name || 'Someone')}</div>
      <div class="lb-req-btns">
        <button class="btn sm" onclick="lbAcceptRequest('${req.id}')">Accept</button>
        <button class="btn sm ghost danger" onclick="lbDeclineRequest('${req.id}')">Decline</button>
      </div>
    </div>`).join('');
}

async function _renderFriendsPanel() {
  const panel = document.getElementById('lb-panel-friends');
  if (!panel) return;

  if (!_lbData) {
    panel.innerHTML = '<div class="lb-loading">Loading…</div>';
    try {
      _lbData = await getFriendsLeaderboard(currentUser.id);
    } catch(e) {
      panel.innerHTML = '<div class="lb-empty">Failed to load</div>';
      return;
    }
  }

  const friends = (_lbData || []).filter(r => r.uid !== currentUser?.id);
  if (!friends.length) {
    panel.innerHTML = '<div class="lb-empty">No friends yet — add some from the Add Friend tab</div>';
    return;
  }

  let activeSet = new Set();
  try {
    activeSet = await getFriendsLastActivity(friends.map(f => f.uid));
  } catch(e) {}

  panel.innerHTML = friends.map(r => {
    const initials = escapeHtml((r.display_name || '?').charAt(0).toUpperCase());
    const isOnline = activeSet.has(r.uid);
    const qual = (r.qualification || r.exam_board) ? formatQualBoard(r.qualification, r.exam_board) : '';
    const safeName = (r.display_name || '').replace(/'/g, "\\'");
    return `<div class="lb-friend-card">
      <div class="lb-friend-avatar">${initials}${isOnline ? '<span class="lb-friend-online"></span>' : ''}</div>
      <div class="lb-friend-info">
        <div class="lb-friend-name">${escapeHtml(r.display_name || '')}</div>
        ${qual ? `<div class="lb-friend-meta">${escapeHtml(qual)}</div>` : ''}
      </div>
      <div class="lb-friend-actions">
        <button class="btn sm ghost" onclick="openFriendProfile('${r.uid}')">View Profile →</button>
        <button class="btn sm ghost danger" onclick="lbRemoveFriend('${r.uid}')">Remove</button>
      </div>
    </div>`;
  }).join('');
}

function _updateLbReqBadge() {
  const badge = document.getElementById('lb-req-badge');
  if (!badge) return;
  const n = _pendingReqs.length;
  badge.textContent = n;
  badge.classList.toggle('hidden', n === 0);
}

window.lbSearchDebounce = function() {
  clearTimeout(_lbSearchTimer);
  _lbSearchTimer = setTimeout(_lbDoSearch, 380);
};

async function _lbDoSearch() {
  const input = document.getElementById('lb-search-input');
  const results = document.getElementById('lb-search-results');
  if (!input || !results) return;
  const q = input.value.trim();
  if (q.length < 2) { results.innerHTML = ''; return; }
  results.innerHTML = '<div class="lb-empty-small">Searching…</div>';
  try {
    const users = await searchUsers(q);
    if (!users.length) { results.innerHTML = '<div class="lb-empty-small">No users found</div>'; return; }
    results.innerHTML = users.map(u => `
      <div class="lb-result-row">
        <div><div class="lb-result-name">${escapeHtml(u.display_name || '')}</div>${(u.qualification || u.exam_board) ? `<div class="lb-result-sub">${escapeHtml(formatQualBoard(u.qualification, u.exam_board))}</div>` : ''}</div>
        <button class="btn sm" id="lb-add-${u.id}" onclick="lbSendRequest('${u.id}','${(u.display_name||'').replace(/'/g,"\\'").replace(/"/g,'&quot;')}')">Add friend</button>
      </div>`).join('');
  } catch(e) { results.innerHTML = '<div class="lb-empty-small">Search failed</div>'; }
}

window.lbSendRequest = async function(addresseeId, name) {
  const btn = document.getElementById(`lb-add-${addresseeId}`);
  if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
  try {
    await sendFriendRequest(currentUser.id, addresseeId);
    if (btn) { btn.textContent = 'Sent ✓'; btn.classList.add('ghost'); }
    setToast(`Request sent to ${name}`);
  } catch(e) {
    const msg = e?.message || '';
    if (msg.includes('duplicate') || e?.code === '23505') {
      if (btn) { btn.textContent = 'Already sent'; btn.disabled = true; }
    } else {
      if (btn) { btn.disabled = false; btn.textContent = 'Add friend'; }
      setToast('Failed to send request');
    }
  }
};

window.lbAcceptRequest = async function(id) {
  try {
    await acceptFriendRequest(id);
    _pendingReqs = _pendingReqs.filter(r => r.id !== id);
    _lbData = null; // force reload when leaderboard tab opens next
    _renderRequestsPanel();
    _updateLbReqBadge();
    checkFriendsBadge();
    setToast('Friend accepted!');
  } catch(e) { setToast('Failed to accept'); }
};

window.lbDeclineRequest = async function(id) {
  try {
    await declineFriendRequest(id);
    _pendingReqs = _pendingReqs.filter(r => r.id !== id);
    _renderRequestsPanel();
    _updateLbReqBadge();
    checkFriendsBadge();
    setToast('Request declined');
  } catch(e) { setToast('Failed'); }
};

/* ============ friend profile modal ============ */
window.openFriendProfile = function(uid) {
  const row = (_lbData || []).find(r => r.uid === uid);
  if (!row) return;
  const modal = document.getElementById('fp-modal');
  if (!modal) return;
  document.getElementById('fp-name').textContent = row.display_name || 'Friend';
  const priv = row.privacy_settings || {};
  const hrs = priv.show_hours !== false ? `${row.weekly_hours}h` : '—';
  const streak = priv.show_streak !== false ? `${row.current_streak}d` : '—';
  document.getElementById('fp-body').innerHTML = `
    <div class="fp-stats">
      <div class="fp-stat"><div class="fp-val">${hrs}</div><div class="fp-key">This week</div></div>
      <div class="fp-stat"><div class="fp-val">${streak}</div><div class="fp-key">Streak</div></div>
      <div class="fp-stat"><div class="fp-val">${row.subjects_count}</div><div class="fp-key">Subjects</div></div>
    </div>
    <div class="fp-meta">
      ${(row.qualification || row.exam_board) ? `<div class="fp-meta-row"><span class="fp-meta-key">Qualification</span><span>${formatQualBoard(row.qualification, row.exam_board)}</span></div>` : ''}
      ${row.exam_date ? `<div class="fp-meta-row"><span class="fp-meta-key">Exam date</span><span>${row.exam_date}</span></div>` : ''}
    </div>
    <button class="fp-remove" onclick="lbRemoveFriend('${uid}')">Remove friend</button>`;
  modal.classList.remove('hidden');
};

window.closeFriendProfile = function() {
  document.getElementById('fp-modal')?.classList.add('hidden');
};

window.lbRemoveFriend = async function(uid) {
  if (!confirm('Remove this friend?')) return;
  try {
    const rel = await getExistingRelationship(currentUser.id, uid);
    if (rel) await removeFriend(rel.id);
    _lbData = null;
    closeFriendProfile();
    if (_lbActiveTab === 'friends') _renderFriendsPanel();
    setToast('Friend removed');
  } catch(e) { setToast('Failed to remove'); }
};

window.epQualChange = function() {
  const qual     = document.getElementById('ep-qual')?.value || '';
  const boardSel = document.getElementById('ep-board');
  const boardWrap = document.getElementById('ep-board-wrap');
  if (!boardSel) return;

  const boards = QUAL_BOARDS[qual] || [];
  if (boardWrap) boardWrap.classList.toggle('hidden', boards.length === 0);
  boardSel.innerHTML = '<option value="">— select board —</option>' +
    boards.map(b => `<option value="${b}">${b}</option>`).join('');
  if (boards.length === 1) boardSel.value = boards[0];
};

window.openEditProfileModal = function() {
  closeBurgerMenu();
  const modal = document.getElementById('ep-modal');
  if (!modal) return;
  const prof = _burgerProfileCache || {};

  // Resolve legacy flat value → {qualification, examBoard}
  const { qualification, examBoard } = resolveQualBoard(prof);

  // Populate name
  document.getElementById('ep-name').value = prof.display_name || '';

  // Populate qualification select
  const qualSel = document.getElementById('ep-qual');
  if (qualSel) qualSel.value = qualification || '';

  // Populate board select (cascade from qual)
  const boardSel  = document.getElementById('ep-board');
  const boardWrap = document.getElementById('ep-board-wrap');
  if (boardSel && qualSel) {
    const boards = QUAL_BOARDS[qualification] || [];
    if (boardWrap) boardWrap.classList.toggle('hidden', boards.length === 0);
    boardSel.innerHTML = '<option value="">— select board —</option>' +
      boards.map(b => `<option value="${b}">${b}</option>`).join('');
    if (examBoard) boardSel.value = examBoard;
  }

  document.getElementById('ep-date').value = prof.exam_date || '';
  document.getElementById('ep-status').textContent = '';
  modal.classList.remove('hidden');
};

window.closeEditProfileModal = function() {
  document.getElementById('ep-modal')?.classList.add('hidden');
};

window.saveEditProfile = async function() {
  const name  = document.getElementById('ep-name').value.trim();
  const qual  = document.getElementById('ep-qual')?.value  || '';
  const board = document.getElementById('ep-board')?.value || '';
  const date  = document.getElementById('ep-date').value;
  const statusEl = document.getElementById('ep-status');
  statusEl.textContent = 'Saving…';
  try {
    await updateProfile({
      display_name:  name,
      qualification: qual  || null,
      exam_board:    board || null,
      exam_date:     date  || null,
    });
    if (!_burgerProfileCache) _burgerProfileCache = {};
    _burgerProfileCache.display_name = name;
    _burgerProfileCache.qualification = qual;
    _burgerProfileCache.exam_board = board;
    _burgerProfileCache.exam_date = date;
    if (date) { examDate = date; Store.set("ascent_exam", date); renderDash(); }
    window.closeEditProfileModal();
    setToast('Profile updated');
  } catch {
    statusEl.textContent = 'Failed to save. Try again.';
  }
};

/* ============ bones modal ============ */

function _isMbbsUser(prof) {
  if (!prof) return false;
  if (prof.qualification) return isMbbs(prof.qualification);
  // Legacy fallback: old flat exam_board value
  return !!(prof.exam_board && prof.exam_board.toLowerCase().includes('mbbs'));
}

function _bmAnatomyHtml(prof) {
  if (!_isMbbsUser(prof)) return '';
  return `
    <div class="bm-section-label">Anatomy</div>
    <button class="bm-open-ts" onclick="closeBurgerMenu();openBonesModal()">Bones Reference</button>
    <button class="bm-open-ts" onclick="closeBurgerMenu();openMusclesModal()">Muscles Reference</button>
  `;
}

window.openBonesModal = function() {
  _bonesRegion = 'All';
  _bonesQuery = '';
  const modal = document.getElementById('bones-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  _renderBonesRegions();
  _renderBones();
  const search = document.getElementById('bones-search');
  if (search) { search.value = ''; search.focus(); }
};

window.closeBonesModal = function() {
  document.getElementById('bones-modal')?.classList.add('hidden');
};

window.openMusclesModal = function() {
  _musclesRegion = 'All';
  _musclesQuery = '';
  _muscleMode = 'learn';
  _muscleDueOnly = false;
  const modal = document.getElementById('muscles-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  _renderMuscleModeBar();
  _renderMusclesRegions();
  _applyMuscleModeUI();
  _renderMuscles();
  // Load spaced-rep state in the background, then refresh the mode bar (due
  // count) and any recall cards once it arrives.
  if (currentUser) {
    getMuscleRecall()
      .then(map => { _muscleRecall = map; _renderMuscleModeBar(); if (_muscleMode === 'recall') _renderMuscles(); })
      .catch(e => console.warn('[muscle-recall] load failed:', e.message));
  }
  // Don't pre-warm the 3D viewer here — initializing it several async ticks
  // away from an actual click loses the browser's "user gesture" window, so
  // WebGL autoplay gets blocked and Sketchfab shows its own play-button
  // screen instead of just rendering. Init happens on the first real click
  // (the collapse toggle or a muscle's "Show on 3D model" button) instead.
  const search = document.getElementById('muscles-search');
  if (search) { search.value = ''; search.focus(); }
};

const MUSCLE_MODES = [
  { key: 'learn',  label: '📖 Learn' },
  { key: 'recall', label: '🎴 Recall' },
  { key: 'quiz',   label: '❓ Quiz' },
];

function _muscleDueCount() {
  return MUSCLES.reduce((n, m) => n + (isMuscleDue(_muscleRecall[m.id]) ? 1 : 0), 0);
}

function _renderMuscleModeBar() {
  const bar = document.getElementById('muscle-mode-bar');
  if (!bar) return;
  const due = _muscleDueCount();
  bar.innerHTML = MUSCLE_MODES.map(m => {
    const badge = (m.key === 'recall' && due > 0) ? `<span class="muscle-due-badge">${due}</span>` : '';
    return `<button class="muscle-mode-btn${m.key === _muscleMode ? ' active' : ''}" onclick="muscleSetMode('${m.key}')">${m.label}${badge}</button>`;
  }).join('');
}

// Show/hide the search box, region tabs and 3D section depending on mode.
// Recall reuses the same card list (just covers the facts); Quiz replaces the
// list with the quiz panel and hides the reference-only chrome.
function _applyMuscleModeUI() {
  const isQuiz = _muscleMode === 'quiz';
  const searchWrap = document.getElementById('muscles-search')?.closest('.bones-search-wrap');
  const regions = document.getElementById('muscles-regions');
  const sec3d = document.getElementById('muscle-3d-section');
  if (searchWrap) searchWrap.style.display = isQuiz ? 'none' : '';
  if (regions) regions.style.display = isQuiz ? 'none' : '';
  if (sec3d) sec3d.style.display = isQuiz ? 'none' : '';
}

window.muscleSetMode = function(mode) {
  if (!MUSCLE_MODES.some(m => m.key === mode)) return;
  _muscleMode = mode;
  _renderMuscleModeBar();
  _applyMuscleModeUI();
  if (mode === 'quiz') { _buildQuiz(); _renderQuiz(); }
  else { _renderMuscles(); }
};

window.closeMusclesModal = function() {
  document.getElementById('muscles-modal')?.classList.add('hidden');
  _teardown3d();
};

// ── Topic Visual Modal ────────────────────────────────────────────────────
window.openTopicVisualModal = function(tvKey, topicId) {
  if (requiresPro('Topic Visualizer')) return;
  const data = TOPIC_VISUALS[tvKey];
  if (!data) return;
  const topic = data.topics.find(t => t.id === topicId);
  if (!topic) return;

  const modal = document.getElementById('tv-modal');
  if (!modal) return;

  document.getElementById('tv-subj-tag').textContent = data.subjectName + (data.examCode ? ' · ' + data.examCode : '');
  document.getElementById('tv-topic-name').textContent = topic.name;
  document.getElementById('tv-syllabus').textContent = topic.syllabusRef ? 'Syllabus ' + topic.syllabusRef : '';

  // 3D toggle button in modal header — shown for any topic with sketchfab3dId or threejs3dFn
  document.getElementById('tv-3d-btn')?.remove();
  const has3d = !!(topic.sketchfab3dId || topic.threejs3dFn);
  if (has3d) {
    const btn3d = document.createElement('button');
    btn3d.id = 'tv-3d-btn';
    btn3d.className = 'bone-3d-btn';
    btn3d.style.cssText = 'margin-top:6px;display:inline-block';
    btn3d.textContent = 'View 3D →';
    btn3d.onclick = () => _tvShow3D(topic);
    document.getElementById('tv-syllabus').insertAdjacentElement('afterend', btn3d);
  }

  const svg = topic.svgKey && TOPIC_SVGS[topic.svgKey] ? TOPIC_SVGS[topic.svgKey] : '';
  const lmHtml = (topic.landmarks || []).map(l => `<span class="tv-lm-tag">${l}</span>`).join('');
  const qaHtml = (topic.examQA || []).map((qa, i) => `
    <div class="tv-qa-item">
      <button class="tv-qa-q" onclick="tvToggleQa(this)">
        <span>${qa.q}</span><span class="tv-qa-chevron">▾</span>
      </button>
      <div class="tv-qa-a">${qa.a}${qa.year ? `<span class="tv-qa-year">${qa.year}</span>` : ''}</div>
    </div>`).join('');

  let view3dHtml = '';
  if (topic.sketchfab3dId) {
    const embedUrl = `https://sketchfab.com/models/${topic.sketchfab3dId}/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_watermark_link=0&preload=1`;
    view3dHtml = `<div class="tv-3d-ratio"><iframe data-src="${embedUrl}" allow="autoplay; fullscreen; xr-spatial-tracking" allowfullscreen loading="lazy" title="${escapeHtml(topic.name)} 3D model"></iframe></div>`;
  } else if (topic.threejs3dFn) {
    view3dHtml = `<div class="tv-3d-canvas-wrap"><div id="tv-3d-canvas" class="tv-3d-canvas"></div><div id="tv-3d-msg" class="tv-3d-msg">Loading 3D model…</div></div>`;
  }

  document.getElementById('tv-body').innerHTML = `
    <div id="tv-2d-view">
      ${svg ? `<div class="tv-svg-wrap">${svg}</div>` : ''}
      <p class="tv-desc">${topic.description || ''}</p>
      ${lmHtml ? `<div><div class="tv-landmarks-label">Key concepts</div><div class="tv-landmarks">${lmHtml}</div></div>` : ''}
      ${qaHtml ? `<div><div class="tv-qa-label">Exam Q&amp;A</div><div class="tv-qa">${qaHtml}</div></div>` : ''}
      ${topic.wikiUrl ? `<a class="tv-wiki-link" href="${topic.wikiUrl}" target="_blank" rel="noopener">↗ Wikipedia</a>` : ''}
    </div>
    ${has3d ? `<div id="tv-3d-view" class="hidden">${view3dHtml}<div class="tv-3d-back-row"><button class="bone-diag-back" onclick="tvBack2D()">← Back to diagram</button></div></div>` : ''}
  `;

  modal.classList.remove('hidden');
};

function _tvShow3D(topic) {
  const view2d = document.getElementById('tv-2d-view');
  const view3d = document.getElementById('tv-3d-view');
  if (!view3d) return;
  view2d?.classList.add('hidden');
  view3d.classList.remove('hidden');

  // Lazy-load Sketchfab iframe on first click
  if (topic.sketchfab3dId) {
    const iframe = view3d.querySelector('iframe[data-src]');
    if (iframe && !iframe.dataset.loaded) {
      iframe.src = iframe.dataset.src;
      iframe.dataset.loaded = '1';
    }
  }

  // Init Three.js only if this container hasn't been initialised for this exact topic
  if (topic.threejs3dFn && view3d.dataset.topicId !== String(topic.id)) {
    view3d.dataset.topicId = String(topic.id);
    const container = document.getElementById('tv-3d-canvas');
    const msg = document.getElementById('tv-3d-msg');
    try {
      const fnStr = topic.threejs3dFn;
      const fnName = fnStr.split('(')[0];
      const argsMatch = fnStr.match(/\(([^)]*)\)/);
      const extraArgs = argsMatch && argsMatch[1].trim()
        ? argsMatch[1].split(',').map(a => a.trim().replace(/^['"]|['"]$/g, ''))
        : [];
      if (typeof window[fnName] === 'function') {
        if (msg) msg.style.display = 'none';
        window[fnName](container, ...extraArgs);
      } else {
        if (msg) msg.textContent = '3D model not available for this topic yet.';
      }
    } catch(e) {
      console.error('[3D RENDER ERROR]', topic.threejs3dFn, e);
      if (msg) msg.textContent = '3D model not available for this topic yet.';
    }
  }
}

window.closeTopicVisualModal = function() {
  const modal = document.getElementById('tv-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  const canvas3d = document.getElementById('tv-3d-canvas');
  if (canvas3d && canvas3d._3dRafId) {
    cancelAnimationFrame(canvas3d._3dRafId);
  }
  const body = document.getElementById('tv-body');
  if (body) body.innerHTML = '';
};

window.tvToggleQa = function(btn) {
  btn.closest('.tv-qa-item').classList.toggle('open');
};

window.tvBack2D = function() {
  document.getElementById('tv-3d-view')?.classList.add('hidden');
  document.getElementById('tv-2d-view')?.classList.remove('hidden');
};

/* ═══════════════════════════════════════════════════════════════════════════
   PRACTICE QUESTIONS — Step 1a
   Free users: up to FREE_QUESTION_LIMIT questions per topic per session.
   Pro users: all shared questions.
   Structured questions: reveal mark scheme only (AI grading is Step 1b).
   TODO Step 1b: plug in on-demand AI question generation here.
   ═══════════════════════════════════════════════════════════════════════════ */

const FREE_QUESTION_LIMIT = 3;

const _pq = {
  tvKey: null, topicId: null, topicKey: null,
  topicName: null, examCode: null,
  questions: [], gatedTotal: 0,
  currentIdx: 0, score: 0, totalPossible: 0,
  answered: false,
};

window.openPracticeModal = async function(tvKey, topicId) {
  const data = TOPIC_VISUALS[tvKey];
  if (!data) return;
  const topic = data.topics.find(t => t.id === topicId);
  if (!topic) return;

  Object.assign(_pq, {
    tvKey, topicId,
    topicKey: `${tvKey}:${topicId}`,
    topicName: topic.name,
    examCode: data.examCode || '',
    questions: [], gatedTotal: 0,
    currentIdx: 0, score: 0, totalPossible: 0,
    answered: false,
  });

  const modal = document.getElementById('pq-modal');
  if (!modal) return;
  document.getElementById('pq-subj-tag').textContent =
    data.subjectName + (data.examCode ? ' · ' + data.examCode : '');
  document.getElementById('pq-topic-name').textContent = topic.name;
  document.getElementById('pq-progress').textContent = '';
  document.getElementById('pq-body').innerHTML = '<div class="pq-loading">Loading questions…</div>';
  modal.classList.remove('hidden');

  if (!supabase) {
    document.getElementById('pq-body').innerHTML = '<div class="pq-empty">Database not available.</div>';
    return;
  }

  const { data: rows, error } = await supabase
    .from('questions')
    .select('*')
    .eq('topic_key', _pq.topicKey)
    .eq('is_shared', true)
    .order('created_at', { ascending: true });

  if (error || !rows) {
    document.getElementById('pq-body').innerHTML = '<div class="pq-empty">Could not load questions.</div>';
    return;
  }

  // TODO: Free users with no questions see this message — upgrade paywall already built in Step 1a
  if (rows.length === 0 && !isPro()) {
    document.getElementById('pq-body').innerHTML = '<div class="pq-empty">No questions available for this topic yet.</div>';
    return;
  }

  // Pro: auto-generate if bank is thin (< 3 questions)
  if (rows.length === 0 && isPro()) {
    document.getElementById('pq-body').innerHTML = '<div class="pq-loading">Generating questions with AI…</div>';
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      if (token) {
        await fetch('/api/generate-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({
            topic_key: _pq.topicKey,
            exam_code: _pq.examCode,
            topic_name: _pq.topicName,
            count: 5,
            difficulty: 'medium',
          }),
        });
        // Reload freshly generated questions
        const { data: freshRows } = await supabase
          .from('questions').select('*')
          .eq('topic_key', _pq.topicKey).eq('is_shared', true)
          .order('created_at', { ascending: true });
        if (freshRows?.length) {
          _pq.gatedTotal = freshRows.length;
          _pq.questions = freshRows;
          _pqRenderQuestion();
          return;
        }
      }
    } catch (e) {
      console.warn('[PQ] AI generation failed:', e.message);
    }
  }

  if (rows.length === 0) {
    document.getElementById('pq-body').innerHTML = '<div class="pq-empty">No questions available for this topic yet.</div>';
    return;
  }

  _pq.gatedTotal = rows.length;
  const limit = isPro() ? rows.length : Math.min(rows.length, FREE_QUESTION_LIMIT);
  _pq.questions = rows.slice(0, limit);
  _pqRenderQuestion();
};

window.closePracticeModal = function() {
  document.getElementById('pq-modal')?.classList.add('hidden');
  const body = document.getElementById('pq-body');
  if (body) body.innerHTML = '';
  _pq.questions = [];
};

function _pqUpdateProgress() {
  const el = document.getElementById('pq-progress');
  if (el) el.textContent = `Question ${_pq.currentIdx + 1} of ${_pq.questions.length}`;
}

function _pqRenderQuestion() {
  const q = _pq.questions[_pq.currentIdx];
  if (!q) { _pqRenderSummary(); return; }
  _pq.answered = false;
  _pqUpdateProgress();

  const isMcq = q.qtype === 'mcq_single' || q.qtype === 'mcq_multi';
  const marksLabel = `${q.marks} mark${q.marks !== 1 ? 's' : ''}`;
  const negLabel = q.negative_marking > 0
    ? `<span class="pq-neg-badge">−${q.negative_marking} for wrong</span>` : '';
  const cwLabel = q.command_word
    ? `<span class="pq-command-word">${escapeHtml(q.command_word)}</span>` : '';

  let bodyHtml;
  if (isMcq) {
    const opts = (q.options || []).map(o => `
      <button class="pq-option" data-oid="${escapeHtml(String(o.id))}" onclick="pqSelectOption(this)">
        <span class="pq-opt-label">${escapeHtml(String(o.id))}</span>
        <span class="pq-opt-text">${escapeHtml(o.text)}</span>
      </button>`).join('');
    bodyHtml = `<div class="pq-options">${opts}</div>
      <button class="pq-submit-btn" id="pq-submit" onclick="pqSubmitAnswer()" disabled>Submit</button>`;
  } else {
    bodyHtml = `<div class="pq-structured-hint">Write your answer below, then reveal the mark scheme to self-mark.</div>
      <textarea class="pq-textarea" id="pq-textarea" placeholder="Write your answer here…" rows="7"></textarea>
      <button class="pq-submit-btn" id="pq-submit" onclick="pqSubmitAnswer()">Reveal Mark Scheme</button>`;
  }

  document.getElementById('pq-body').innerHTML = `
    <div class="pq-question">
      <div class="pq-meta-row">
        <span class="pq-marks-badge">${marksLabel}</span>
        ${cwLabel}${negLabel}
        <span class="pq-diff-badge pq-diff-${escapeHtml(q.difficulty)}">${escapeHtml(q.difficulty)}</span>
      </div>
      <div class="pq-stem">${escapeHtml(q.stem)}</div>
      ${bodyHtml}
    </div>`;
}

window.pqSelectOption = function(btn) {
  if (_pq.answered) return;
  document.querySelectorAll('#pq-body .pq-option').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const sub = document.getElementById('pq-submit');
  if (sub) sub.removeAttribute('disabled');
};

window.pqSubmitAnswer = async function() {
  const q = _pq.questions[_pq.currentIdx];
  if (!q || _pq.answered) return;
  _pq.answered = true;

  const isMcq = q.qtype === 'mcq_single' || q.qtype === 'mcq_multi';
  const isLast = _pq.currentIdx === _pq.questions.length - 1;
  const nextLabel = isLast ? 'See Results' : 'Next Question →';
  let givenAnswer, isCorrect = null, marksAwarded = null, feedbackHtml = '';

  if (isMcq) {
    const selectedBtn = document.querySelector('#pq-body .pq-option.selected');
    const selectedId = selectedBtn?.dataset.oid;
    givenAnswer = { option: selectedId };
    const correctIds = Array.isArray(q.correct) ? q.correct : [q.correct];
    isCorrect = !!selectedId && correctIds.includes(selectedId);
    marksAwarded = isCorrect ? q.marks : -Number(q.negative_marking || 0);

    _pq.score += marksAwarded;
    _pq.totalPossible += q.marks;

    document.querySelectorAll('#pq-body .pq-option').forEach(btn => {
      const oid = btn.dataset.oid;
      btn.classList.add('disabled');
      if (correctIds.includes(oid)) btn.classList.add('correct');
      else if (oid === selectedId && !isCorrect) btn.classList.add('wrong');
    });
    const sub = document.getElementById('pq-submit');
    if (sub) sub.disabled = true;

    const resultHtml = isCorrect
      ? `<div class="pq-fb pq-fb-correct">✓ Correct · +${q.marks} mark${q.marks !== 1 ? 's' : ''}</div>`
      : `<div class="pq-fb pq-fb-wrong">✗ Incorrect${q.negative_marking > 0 ? ` · −${q.negative_marking} applied` : ''}</div>`;
    const explHtml = q.explanation
      ? `<div class="pq-explanation">${escapeHtml(q.explanation)}</div>` : '';
    feedbackHtml = `${resultHtml}${explHtml}
      <div class="pq-next-row"><button class="pq-next-btn" onclick="pqNextQuestion()">${nextLabel}</button></div>`;

  } else {
    givenAnswer = { text: document.getElementById('pq-textarea')?.value || '' };
    _pq.totalPossible += q.marks;

    const ta = document.getElementById('pq-textarea');
    const sub = document.getElementById('pq-submit');
    if (ta) ta.disabled = true;
    if (sub) sub.disabled = true;

    const msHtml = (q.mark_scheme || []).map((pt, i) =>
      `<div class="pq-ms-point">
        <span class="pq-ms-num">${i + 1}</span>
        <span class="pq-ms-text">${escapeHtml(pt.point || '')}</span>
        <span class="pq-ms-m">(${pt.marks || 1}m)</span>
      </div>`).join('');
    const maHtml = q.model_answer
      ? `<div class="pq-model-answer"><div class="pq-ms-label">Model Answer</div><div class="pq-ma-text">${escapeHtml(q.model_answer)}</div></div>` : '';
    feedbackHtml = `
      <div class="pq-ms-label">Mark Scheme</div>
      ${msHtml}${maHtml}
      <div class="pq-self-mark-note">Self-mark your answer against the points above.</div>
      <div class="pq-next-row"><button class="pq-next-btn" onclick="pqNextQuestion()">${nextLabel}</button></div>`;
  }

  document.getElementById('pq-body').insertAdjacentHTML('beforeend',
    `<div class="pq-feedback-block${isMcq ? '' : ' pq-ms-block'}">${feedbackHtml}</div>`);

  // record attempt (fire and forget)
  if (supabase && currentUser) {
    supabase.from('question_attempts').insert({
      user_id: currentUser.id,
      question_id: q.id,
      topic_key: _pq.topicKey,
      exam_code: q.exam_code,
      given_answer: givenAnswer,
      is_correct: isCorrect,
      marks_awarded: marksAwarded,
      marks_possible: q.marks,
      graded: isMcq,
    }).then(({ error: e }) => { if (e) console.warn('[PQ] attempt insert:', e); });
  }
};

window.pqNextQuestion = function() {
  _pq.currentIdx++;
  if (_pq.currentIdx >= _pq.questions.length) _pqRenderSummary();
  else _pqRenderQuestion();
};

function _pqRenderSummary() {
  document.getElementById('pq-progress').textContent = 'Complete';
  const hasStructured = _pq.questions.some(q => q.qtype === 'structured' || q.qtype === 'written');
  const rawScore = Math.max(0, _pq.score);
  const scoreDisplay = Number.isInteger(rawScore) ? String(rawScore) : rawScore.toFixed(2).replace(/\.?0+$/, '');

  let paywallHtml = '';
  if (!isPro() && _pq.gatedTotal > _pq.questions.length) {
    const more = _pq.gatedTotal - _pq.questions.length;
    paywallHtml = `<div class="pq-paywall-hint">
      ${more} more question${more !== 1 ? 's' : ''} available for this topic.
      Upgrade for unlimited practice + AI-generated questions.
      <button class="pq-upgrade-btn" onclick="closePracticeModal();showPaywall('Practice Questions')">Upgrade</button>
    </div>`;
  }
  const noteHtml = hasStructured
    ? `<div class="pq-sum-note">Structured questions require self-marking — AI grading coming in Step 1b.</div>` : '';

  const getMoreHtml = isPro()
    ? `<button class="pq-upgrade-btn" onclick="pqGetMoreQuestions()">Get 5 more questions</button>` : '';

  document.getElementById('pq-body').innerHTML = `
    <div class="pq-summary">
      <div class="pq-sum-title">Session Complete</div>
      <div class="pq-sum-score">${scoreDisplay} / ${_pq.totalPossible}</div>
      <div class="pq-sum-sub">marks after negative marking</div>
      ${paywallHtml}${noteHtml}
      <div class="pq-sum-actions">
        <button class="pq-retry-btn" onclick="openPracticeModal('${escapeHtml(_pq.tvKey)}','${escapeHtml(_pq.topicId)}')">Try Again</button>
        ${getMoreHtml}
        <button class="pq-close-btn" onclick="closePracticeModal()">Close</button>
      </div>
    </div>`;
}

window.pqGetMoreQuestions = async function() {
  document.getElementById('pq-progress').textContent = '';
  document.getElementById('pq-body').innerHTML = '<div class="pq-loading">Generating 5 more questions with AI…</div>';
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    if (!token) throw new Error('Not signed in');
    const resp = await fetch('/api/generate-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        topic_key: _pq.topicKey,
        exam_code: _pq.examCode,
        topic_name: _pq.topicName,
        count: 5,
        difficulty: 'medium',
      }),
    });
    const result = await resp.json();
    if (result.generated > 0) {
      // Restart session with all available questions
      await openPracticeModal(_pq.tvKey, _pq.topicId);
    } else {
      document.getElementById('pq-body').innerHTML =
        `<div class="pq-empty">Could not generate questions${result.error ? ': ' + result.error : ''}. Please try again.</div>`;
    }
  } catch (e) {
    console.warn('[PQ] Get more failed:', e.message);
    document.getElementById('pq-body').innerHTML = '<div class="pq-empty">Generation failed. Please try again.</div>';
  }
};

window.bonesSearchInput = function(q) {
  _bonesQuery = q.toLowerCase().trim();
  _renderBones();
};

window.bonesSetRegion = function(region) {
  _bonesRegion = region;
  _renderBonesRegions();
  _renderBones();
};

window.bonesToggleQa = function(el) {
  el.closest('.bone-qa-item').classList.toggle('open');
};

window.bonesToggle3D = function(boneId) {
  const panel = document.getElementById('bone-3d-' + boneId);
  if (!panel) return;
  const opening = !panel.classList.contains('open');
  panel.classList.toggle('open');
  if (opening) {
    const iframe = panel.querySelector('iframe');
    if (iframe && !iframe.dataset.loaded) {
      iframe.src = iframe.dataset.src;
      iframe.dataset.loaded = '1';
    }
    // Reset diagram view back to iframe if diagram was showing
    bonesShowIframe(boneId);
  }
};

window.bonesHighlightBone = function(boneId) {
  const panel = document.getElementById('bone-3d-' + boneId);
  if (!panel || !panel.classList.contains('open')) {
    bonesToggle3D(boneId);
    setTimeout(() => _showBoneDiagram(boneId), 350);
    return;
  }
  _showBoneDiagram(boneId);
};

window.bonesShowIframe = function(boneId) {
  const diagramEl = document.getElementById('bone-diag-' + boneId);
  const ratioEl   = document.getElementById('bone-ratio-' + boneId);
  const hlBtn     = document.getElementById('bone-hlbtn-' + boneId);
  const v3dBtn    = document.querySelector(`[data-v3dbtn="${boneId}"]`);
  if (diagramEl)  diagramEl.classList.add('hidden');
  if (ratioEl)    ratioEl.classList.remove('hidden');
  if (hlBtn)      hlBtn.classList.remove('hidden');
  if (v3dBtn)     v3dBtn.classList.remove('hidden');
};

function _showBoneDiagram(boneId) {
  const diagramEl = document.getElementById('bone-diag-' + boneId);
  const ratioEl   = document.getElementById('bone-ratio-' + boneId);
  const hlBtn     = document.getElementById('bone-hlbtn-' + boneId);
  const v3dBtn    = document.querySelector(`[data-v3dbtn="${boneId}"]`);
  const bone      = BONES.find(b => b.id === boneId);
  if (!diagramEl || !ratioEl || !bone) return;

  const svg = BONE_DIAGRAMS[boneId];
  if (!svg) return;

  diagramEl.innerHTML = `
    <div class="bone-diag-svg">${svg}</div>
    <div class="bone-diag-caption">
      <span class="bone-diag-name">${escapeHtml(bone.name)}</span>
      ${bone.position_hint ? `<span class="bone-diag-hint">${escapeHtml(bone.position_hint)}</span>` : ''}
    </div>
    <div class="bone-diag-back-row">
      <button class="bone-diag-back" onclick="bonesShowIframe('${boneId}')">⬡ View Full 3D Model →</button>
    </div>`;

  ratioEl.classList.add('hidden');
  diagramEl.classList.remove('hidden');
  if (hlBtn)  hlBtn.classList.add('hidden');
  if (v3dBtn) v3dBtn.classList.add('hidden');
}

function _renderBonesRegions() {
  const container = document.getElementById('bones-regions');
  if (!container) return;
  container.innerHTML = BONE_REGIONS.map(r =>
    `<button class="bones-rtab${r === _bonesRegion ? ' active' : ''}" onclick="bonesSetRegion('${escapeHtml(r)}')">${escapeHtml(r)}</button>`
  ).join('');
}

function _renderBones() {
  const list = document.getElementById('bones-list');
  if (!list) return;

  let filtered = BONES;
  if (_bonesRegion !== 'All') {
    filtered = filtered.filter(b => b.region === _bonesRegion);
  }
  if (_bonesQuery) {
    filtered = filtered.filter(b =>
      b.name.toLowerCase().includes(_bonesQuery) ||
      b.description.toLowerCase().includes(_bonesQuery) ||
      b.questions.some(qa => qa.q.toLowerCase().includes(_bonesQuery) || qa.a.toLowerCase().includes(_bonesQuery))
    );
  }

  if (!filtered.length) {
    list.innerHTML = `<div class="bones-empty">No bones found</div>`;
    return;
  }

  list.innerHTML = filtered.map(bone => {
    const has3d = !!bone.sketchfabId;
    const hasHighlight = has3d && !!BONE_DIAGRAMS[bone.id];
    const embedUrl = has3d
      ? `https://sketchfab.com/models/${bone.sketchfabId}/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_watermark_link=0&preload=1`
      : '';
    const landmarksHtml = (bone.landmarks || []).map(l => `<span class="bone-lm">${escapeHtml(l)}</span>`).join('');

    const viewer3d = has3d ? `
      <div class="bone-3d-panel" id="bone-3d-${bone.id}">
        <div class="bone-diag-panel hidden" id="bone-diag-${bone.id}"></div>
        <div class="bone-3d-ratio" id="bone-ratio-${bone.id}">
          <iframe data-src="${embedUrl}" allow="autoplay; fullscreen; xr-spatial-tracking" allowfullscreen loading="lazy" title="${escapeHtml(bone.name)} 3D model"></iframe>
        </div>
        ${bone.landmarks && bone.landmarks.length ? `
        <div class="bone-3d-info">
          <div class="bone-3d-lm-label">KEY ANATOMICAL LANDMARKS</div>
          <div class="bone-3d-lm-list">${landmarksHtml}</div>
        </div>` : ''}
        <div class="bone-3d-close-row">
          <button class="bone-3d-close" onclick="bonesToggle3D('${bone.id}')">✕ Close</button>
        </div>
      </div>` : '';

    // Group Q&As by professional year prefix
    const GROUP_ORDER = ['1st Prof', '2nd Prof', '3rd Prof', 'Final Prof'];
    const groups = {};
    (bone.questions || []).forEach(qa => {
      const yr = qa.year || '1st Prof (common)';
      const grp = GROUP_ORDER.find(g => yr.startsWith(g)) || yr;
      if (!groups[grp]) groups[grp] = [];
      groups[grp].push(qa);
    });
    const allGroups = [...GROUP_ORDER.filter(g => groups[g]), ...Object.keys(groups).filter(g => !GROUP_ORDER.includes(g))];

    const qaGroupsHtml = allGroups.map(grp => {
      const items = groups[grp];
      const itemsHtml = items.map(qa => `
        <div class="bone-qa-item">
          <button class="bone-qa-q" onclick="bonesToggleQa(this)">
            <span class="bone-qa-q-inner">
              ${qa.year ? `<span class="bone-qa-year">${escapeHtml(qa.year)}</span>` : ''}
              <span class="bone-qa-q-text">${escapeHtml(qa.q)}</span>
            </span>
            <span class="bone-qa-chevron">▼</span>
          </button>
          <div class="bone-qa-a">${escapeHtml(qa.a)}</div>
        </div>`).join('');
      return `
        <div class="bone-qa-group">
          <div class="bone-qa-group-hd">${escapeHtml(grp)} <span class="bone-qa-group-ct">${items.length}</span></div>
          ${itemsHtml}
        </div>`;
    }).join('');

    return `
      <div class="bone-card">
        <div class="bone-card-head">
          <h3 class="bone-name">${escapeHtml(bone.name)}</h3>
          ${_bonesRegion === 'All' ? `<span class="bone-region-tag">${escapeHtml(bone.region)}</span>` : ''}
        </div>
        <p class="bone-desc">${escapeHtml(bone.description)}</p>
        ${viewer3d}
        <div class="bone-links-row">
          <a class="bone-wiki-link" href="${bone.wiki}" target="_blank" rel="noopener noreferrer">↗ Wikipedia</a>
          ${has3d ? `<button class="bone-3d-btn" data-v3dbtn="${bone.id}" onclick="bonesToggle3D('${bone.id}')">⬡ View 3D</button>` : ''}
          ${hasHighlight ? `<button class="bone-hl-btn" id="bone-hlbtn-${bone.id}" onclick="bonesHighlightBone('${bone.id}')">◎ Highlight Bone →</button>` : ''}
        </div>
        <div class="bone-qa">
          <div class="bone-qa-label">EXAM QUESTIONS</div>
          ${qaGroupsHtml}
        </div>
      </div>`;
  }).join('');
}

/* ============ muscles modal ============ */

window.musclesSearchInput = function(q) {
  _musclesQuery = q.toLowerCase().trim();
  _renderMuscles();
};

window.musclesSetRegion = function(region) {
  _musclesRegion = region;
  _renderMusclesRegions();
  _renderMuscles();
};

window.musclesToggleQa = function(el) {
  el.closest('.bone-qa-item').classList.toggle('open');
};

// ── Interactive 3D muscle viewer (Sketchfab Viewer API) ────────────────────
// One model, but its muscles are SEPARATE named meshes — so we can isolate any
// muscle live: hide the other muscles, keep the skeleton for orientation, and
// the picked muscle stands out in its real anatomical place. Falls back to the
// 2D diagrams (which stay in every card) if the model/script fails to load.
let _muscleApi = null;          // Sketchfab API handle once viewer is ready
let _muscleNodes = [];          // [{ id, name, underMuscles }] geometry leaves
let _muscle3dState = 'idle';    // idle | loading | ready | failed
let _muscle3dPending = null;    // isolation requested before viewer was ready

function _loadSketchfabScript() {
  return new Promise((resolve, reject) => {
    if (window.Sketchfab) return resolve();
    const s = document.createElement('script');
    s.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('sketchfab script failed'));
    document.head.appendChild(s);
  });
}

function _init3dViewer() {
  if (_muscle3dState !== 'idle') return;
  _muscle3dState = 'loading';
  const wrap = document.getElementById('muscle-3d-viewer');
  const statusEl = document.getElementById('muscle-3d-status');
  if (!wrap) { _muscle3dState = 'idle'; return; }
  if (statusEl) statusEl.textContent = 'Loading anatomical model — a full-body model, can take up to 20s…';

  const fail = (msg) => {
    _muscle3dState = 'failed';
    if (statusEl) statusEl.textContent = '3D model unavailable — use the diagrams below.';
    console.warn('[muscle3d]', msg);
  };

  _loadSketchfabScript().then(() => {
    const iframe = document.createElement('iframe');
    iframe.id = 'muscle-3d-iframe';
    iframe.allow = 'autoplay; fullscreen; xr-spatial-tracking';
    iframe.style.cssText = 'width:100%;height:100%;border:none';
    wrap.appendChild(iframe);
    const client = new window.Sketchfab(iframe);
    const failTimer = setTimeout(() => fail('viewer timeout'), 30000);
    client.init(MUSCLE_MODEL_ID, {
      autostart: 1,
      autospin: 0,   // the built-in idle rotation is what made it look like it "moves closer and away" — kill it
      ui_controls: 0,
      ui_infos: 0,
      ui_watermark: 0,
      ui_watermark_link: 0,
      ui_loading: 0,
      success: (api) => {
        api.start();
        api.addEventListener('viewerready', () => {
          // The model has a baked-in "C4D Animation Take" clip (confirmed via
          // api.getAnimations()) — that's the real source of the swinging
          // motion (autospin:0 only affects Sketchfab's own idle-orbit, not
          // an authored animation clip). pause() halts it with no play-button
          // regression (unlike stop(), which does show one).
          try { api.pause(); } catch (e) {}
          api.getSceneGraph((err, graph) => {
            clearTimeout(failTimer);
            if (err) return fail('scenegraph error');
            const nodes = [];
            const walk = (n, underMuscles) => {
              const um = underMuscles || n.name === 'muscles_folder';
              if (n.type === 'Geometry') nodes.push({ id: n.instanceID, name: n.name || '', underMuscles: um });
              (n.children || []).forEach(k => walk(k, um));
            };
            walk(graph, false);
            _muscleApi = api;
            _muscleNodes = nodes;
            _muscle3dState = 'ready';
            // Keep the opaque "Loading…" cover up if a specific muscle is
            // queued — reveal only once _isolate3d actually applies it, so
            // students never see the raw, unrelated full body first. If
            // nothing's queued (viewer opened without picking a muscle yet),
            // reveal now.
            if (_muscle3dPending) {
              const p = _muscle3dPending; _muscle3dPending = null; _isolate3d(p.match, p.label);
            } else if (statusEl) {
              statusEl.textContent = '';
            }
          });
        });
      },
      error: () => { clearTimeout(failTimer); fail('init error'); },
    });
  }).catch(fail);
}

// Show only the muscle mesh(es) whose name matches `match`, hide every other
// muscle. `match` is a substring. (This model has no separate skeleton — every
// mesh in it is a muscle — so isolating just means hiding the rest.)
function _isolate3d(match, label) {
  if (_muscle3dState === 'idle') { _muscle3dPending = { match, label }; _init3dViewer(); return; }
  if (_muscle3dState === 'loading') { _muscle3dPending = { match, label }; return; }
  if (_muscle3dState !== 'ready' || !_muscleApi) return;
  const m = match.toLowerCase();
  let shown = 0;
  _muscleNodes.forEach(node => {
    const isTarget = node.name.toLowerCase().includes(m);
    try { isTarget ? (_muscleApi.show(node.id), shown++) : _muscleApi.hide(node.id); } catch (e) {}
  });
  // Reveal now that the isolated pose is applied — the very first thing a
  // student sees is the target muscle, not the raw full-body model.
  const statusEl = document.getElementById('muscle-3d-status');
  if (statusEl) statusEl.textContent = '';
  // Frame the camera on what's now visible (the isolated muscle) so it fills the
  // viewer instead of sitting tiny in the full-body frame. Small delay lets the
  // hide/show calls apply before the bounding box is recomputed.
  setTimeout(() => { try { _muscleApi.focusOnVisibleGeometries(); } catch (e) {} }, 350);
  const cap = document.getElementById('muscle-3d-caption');
  if (cap) cap.textContent = shown ? (label || '') : 'Not separated in this model — see the diagram below.';
}

function _reset3d() {
  if (_muscle3dState !== 'ready' || !_muscleApi) return;
  _muscleNodes.forEach(node => { try { _muscleApi.show(node.id); } catch (e) {} });
  setTimeout(() => { try { _muscleApi.focusOnVisibleGeometries(); } catch (e) {} }, 350);
  const cap = document.getElementById('muscle-3d-caption');
  if (cap) cap.textContent = '';
}

function _expand3dBody() {
  const body = document.getElementById('muscle-3d-body');
  const chev = document.getElementById('muscle-3d-chevron');
  if (body && body.classList.contains('hidden')) {
    body.classList.remove('hidden');
    if (chev) chev.textContent = '▴';
  }
}

// Collapsed by default so the (large) 3D block doesn't permanently eat modal
// space above the scrollable muscle list. Opens on: the toggle bar itself, or
// tapping any muscle's "Show on 3D model" button.
window.muscleToggle3DSection = function() {
  const body = document.getElementById('muscle-3d-body');
  const chev = document.getElementById('muscle-3d-chevron');
  if (!body) return;
  const willOpen = body.classList.contains('hidden');
  body.classList.toggle('hidden');
  if (chev) chev.textContent = willOpen ? '▴' : '▾';
  if (willOpen) _init3dViewer();
};

window.muscleShow3D = function(match, label) {
  _expand3dBody();
  const sec = document.getElementById('muscle-3d-section');
  if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  _isolate3d(match, label);
};

window.muscleReset3D = function() { _reset3d(); };

// Reset viewer state when the modal closes so a fresh open re-inits cleanly.
function _teardown3d() {
  const iframe = document.getElementById('muscle-3d-iframe');
  if (iframe) iframe.remove();
  _muscleApi = null; _muscleNodes = []; _muscle3dState = 'idle'; _muscle3dPending = null;
  const statusEl = document.getElementById('muscle-3d-status');
  if (statusEl) statusEl.textContent = '';
  document.getElementById('muscle-3d-body')?.classList.add('hidden');
  const chev = document.getElementById('muscle-3d-chevron');
  if (chev) chev.textContent = '▾';
}

function _renderMusclesRegions() {
  const container = document.getElementById('muscles-regions');
  if (!container) return;
  container.innerHTML = MUSCLE_REGIONS.map(r =>
    `<button class="bones-rtab${r === _musclesRegion ? ' active' : ''}" onclick="musclesSetRegion('${escapeHtml(r)}')">${escapeHtml(r)}</button>`
  ).join('');
}

function _renderMuscles() {
  const list = document.getElementById('muscles-list');
  if (!list) return;

  const recallMode = _muscleMode === 'recall';

  let filtered = MUSCLES;
  if (_musclesRegion !== 'All') {
    filtered = filtered.filter(m => m.region === _musclesRegion);
  }
  if (_musclesQuery) {
    filtered = filtered.filter(m =>
      m.name.toLowerCase().includes(_musclesQuery) ||
      m.description.toLowerCase().includes(_musclesQuery) ||
      (m.questions || []).some(qa => qa.q.toLowerCase().includes(_musclesQuery) || qa.a.toLowerCase().includes(_musclesQuery))
    );
  }
  if (recallMode && _muscleDueOnly) {
    filtered = filtered.filter(m => isMuscleDue(_muscleRecall[m.id]));
  }

  // Recall-mode toolbar: a "Due only" toggle + count.
  const dueBar = recallMode ? (() => {
    const due = _muscleDueCount();
    return `<div class="muscle-recall-bar">
      <span class="muscle-recall-hint">Reveal facts, then rate yourself — missed ones resurface on the 2-4-7 schedule.</span>
      <button class="muscle-due-toggle${_muscleDueOnly ? ' active' : ''}" onclick="muscleToggleDueOnly()">${_muscleDueOnly ? '✓ Due only' : `Due only (${due})`}</button>
    </div>`;
  })() : '';

  if (!filtered.length) {
    list.innerHTML = dueBar + `<div class="bones-empty">${recallMode && _muscleDueOnly ? 'Nothing due right now — great, come back later.' : 'No muscles found'}</div>`;
    return;
  }

  list.innerHTML = filtered.map(muscle => {
    // Attachment plate (origin/insertion on the bone schematic) is the primary
    // visual; fall back to the old silhouette only if no attachment spec.
    const svg = buildMuscleAttachment(muscle.id) || MUSCLE_DIAGRAMS[muscle.id];

    const recall = _muscleMode === 'recall';
    const factRows = [
      ['Origin', muscle.origin],
      ['Insertion', muscle.insertion],
      ['Action', muscle.action],
      ['Nerve', muscle.nerve],
      ['Artery', muscle.artery],
    ].filter(([, v]) => v);
    // In recall mode the values are hidden behind a blur until tapped — active
    // recall: try to answer from the label before revealing.
    const factsHtml = factRows.map(([label, val]) => `
      <div class="muscle-fact-row"><span class="muscle-fact-label">${escapeHtml(label)}</span>${
        recall
          ? `<span class="muscle-fact-val muscle-reveal" onclick="this.classList.add('shown')" title="Tap to reveal">${escapeHtml(val)}</span>`
          : `<span class="muscle-fact-val">${escapeHtml(val)}</span>`
      }</div>
    `).join('');

    const diagramHtml = svg ? `
      <div class="muscle-diagram-wrap">
        <div class="bone-diag-svg">${svg}</div>
      </div>` : '';

    // Real 3D: precise muscles isolate exactly; forearm compartments isolate the
    // group (honestly labelled); the 4 muscles absent from the model get no button.
    let show3dBtn = '';
    if (muscle.mesh3d) {
      const label = muscle.mesh3d.kind === 'group'
        ? `Showing the ${muscle.mesh3d.label} (this model doesn't separate them)`
        : `${muscle.name} — isolated in 3D (rotate to view)`;
      const btnText = muscle.mesh3d.kind === 'group' ? '◎ Show compartment in 3D' : '◎ Show on 3D model';
      show3dBtn = `<button class="muscle-3d-btn" onclick="muscleShow3D('${escapeHtml(muscle.mesh3d.match)}', ${JSON.stringify(label).replace(/"/g, '&quot;')})">${btnText}</button>`;
    }

    const qaHtml = (muscle.questions || []).map(qa => `
      <div class="bone-qa-item">
        <button class="bone-qa-q" onclick="musclesToggleQa(this)">
          <span class="bone-qa-q-inner"><span class="bone-qa-q-text">${escapeHtml(qa.q)}</span></span>
          <span class="bone-qa-chevron">▼</span>
        </button>
        <div class="bone-qa-a">${escapeHtml(qa.a)}</div>
      </div>`).join('');

    // Recall-mode: status badge (in the head) + a rate row (Got it / Missed it)
    // that writes spaced-rep state. Only shown when logged in.
    const row = _muscleRecall[muscle.id];
    let statusBadge = '';
    let rateRow = '';
    if (recall) {
      if (row?.reps >= MASTERED_AT) statusBadge = `<span class="muscle-status mastered">✓ Mastered</span>`;
      else if (isMuscleDue(row)) statusBadge = `<span class="muscle-status due">Due</span>`;
      else if (row) statusBadge = `<span class="muscle-status seen">${row.reps}/${MASTERED_AT}</span>`;
      if (currentUser && (!row || row.reps < MASTERED_AT)) {
        rateRow = `<div class="muscle-rate-row">
          <button class="muscle-rate miss" onclick="muscleRate('${muscle.id}', false)">✗ Missed it</button>
          <button class="muscle-rate got" onclick="muscleRate('${muscle.id}', true)">✓ Got it</button>
        </div>`;
      }
    }

    return `
      <div class="bone-card" data-muscle-card="${muscle.id}">
        <div class="bone-card-head">
          <h3 class="bone-name">${escapeHtml(muscle.name)}</h3>
          <span style="display:flex;gap:6px;align-items:center">
            ${statusBadge}
            ${_musclesRegion === 'All' ? `<span class="bone-region-tag">${escapeHtml(muscle.region)}</span>` : ''}
          </span>
        </div>
        <p class="bone-desc">${escapeHtml(muscle.description)}</p>
        ${diagramHtml}
        ${show3dBtn}
        <div class="muscle-facts">${factsHtml}</div>
        ${muscle.clinicalCorrelation ? `<div class="muscle-clinical"><span class="muscle-clinical-label">CLINICAL CORRELATION</span><p${recall ? ' class="muscle-reveal" onclick="this.classList.add(\'shown\')" title="Tap to reveal"' : ''}>${escapeHtml(muscle.clinicalCorrelation)}</p></div>` : ''}
        ${rateRow}
        <div class="bone-qa">
          <div class="bone-qa-label">PRACTICE QUESTIONS</div>
          ${qaHtml}
        </div>
      </div>`;
  }).join('');

  list.innerHTML = dueBar + list.innerHTML;
}

window.muscleToggleDueOnly = function() {
  _muscleDueOnly = !_muscleDueOnly;
  _renderMuscles();
};

// Write a spaced-rep result, update local cache, refresh badges/count.
window.muscleRate = async function(muscleId, gotIt) {
  if (!currentUser) return;
  const prev = _muscleRecall[muscleId];
  try {
    const updated = gotIt
      ? await markMusclePass(currentUser.id, muscleId, prev?.reps ?? 0)
      : await markMuscleFail(currentUser.id, muscleId);
    _muscleRecall[muscleId] = updated;
    _renderMuscleModeBar();
    _renderMuscles();
  } catch (e) {
    console.warn('[muscle-recall] rate failed:', e.message);
  }
};

/* ============ muscle quiz (client-only MCQs from the dataset) ============ */

function _shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build one MCQ: ask `field` of a muscle, pull 3 distractors from other muscles'
// same field (deduped, never equal to the correct answer). Returns null if not
// enough distinct distractors exist.
function _quizQ(muscle, field, prompt) {
  const correct = muscle[field];
  if (!correct) return null;
  const pool = [...new Set(
    MUSCLES.filter(m => m.id !== muscle.id && m[field] && m[field] !== correct).map(m => m[field])
  )];
  if (pool.length < 3) return null;
  const distractors = _shuffle(pool).slice(0, 3);
  const options = _shuffle([correct, ...distractors]);
  return {
    prompt: prompt.replace('{name}', muscle.name),
    options,
    correct: options.indexOf(correct),
  };
}

function _buildQuiz() {
  const specs = [
    ['nerve',     'Nerve supply of the {name}?'],
    ['action',    'Main action of the {name}?'],
    ['origin',    'Origin of the {name}?'],
    ['insertion', 'Insertion of the {name}?'],
  ];
  const pool = [];
  MUSCLES.forEach(m => {
    specs.forEach(([field, prompt]) => {
      const q = _quizQ(m, field, prompt);
      if (q) pool.push(q);
    });
  });
  _quiz = { questions: _shuffle(pool).slice(0, 12), idx: 0, score: 0, answered: false };
}

function _renderQuiz() {
  const list = document.getElementById('muscles-list');
  if (!list) return;
  const q = _quiz.questions[_quiz.idx];

  if (!q) {
    const total = _quiz.questions.length;
    const pct = total ? Math.round((_quiz.score / total) * 100) : 0;
    list.innerHTML = `
      <div class="mq-done">
        <div class="mq-done-score">${_quiz.score} / ${total}</div>
        <div class="mq-done-pct">${pct}%</div>
        <p class="mq-done-msg">${pct >= 80 ? 'Strong — you know these cold.' : pct >= 50 ? 'Getting there — review the ones you missed.' : 'Worth another pass in Learn mode, then retry.'}</p>
        <button class="mq-btn primary" onclick="muscleQuizRestart()">↻ New quiz</button>
        <button class="mq-btn" onclick="muscleSetMode('learn')">Back to Learn</button>
      </div>`;
    return;
  }

  list.innerHTML = `
    <div class="mq-wrap">
      <div class="mq-progress">Question ${_quiz.idx + 1} of ${_quiz.questions.length} · Score ${_quiz.score}</div>
      <div class="mq-prompt">${escapeHtml(q.prompt)}</div>
      <div class="mq-options">
        ${q.options.map((opt, i) => `<button class="mq-opt" data-i="${i}" onclick="muscleQuizAnswer(${i})">${escapeHtml(opt)}</button>`).join('')}
      </div>
      <div class="mq-feedback" id="mq-feedback"></div>
      <button class="mq-btn primary hidden" id="mq-next" onclick="muscleQuizNext()">Next →</button>
    </div>`;
}

window.muscleQuizAnswer = function(i) {
  if (_quiz.answered) return;
  _quiz.answered = true;
  const q = _quiz.questions[_quiz.idx];
  const correct = i === q.correct;
  if (correct) _quiz.score++;
  document.querySelectorAll('.mq-opt').forEach(btn => {
    const bi = parseInt(btn.dataset.i, 10);
    btn.disabled = true;
    if (bi === q.correct) btn.classList.add('correct');
    else if (bi === i) btn.classList.add('wrong');
  });
  const fb = document.getElementById('mq-feedback');
  if (fb) {
    fb.textContent = correct ? '✓ Correct' : `✗ Correct answer: ${q.options[q.correct]}`;
    fb.className = 'mq-feedback ' + (correct ? 'ok' : 'no');
  }
  document.getElementById('mq-next')?.classList.remove('hidden');
};

window.muscleQuizNext = function() {
  _quiz.idx++;
  _quiz.answered = false;
  _renderQuiz();
};

window.muscleQuizRestart = function() {
  _buildQuiz();
  _renderQuiz();
};

/* ============ Supabase cache helpers ============ */

// Fetches user's subjects + all topics from Supabase, stores in _sbCache.
// Also updates _timerSubjects so the focus timer tab stays in sync.
// Called on login and whenever subjects-view mutates data.
async function refreshSbCache() {
  if(!currentUser) return;
  try {
    const [subs, tps, pprs, errs, sess] = await Promise.all([getSubjects(), getAllTopics(), getPapers().catch(()=>[]), getErrors().catch(()=>[]), getSessions().catch(()=>[])]);
    _sbCache.subjects = subs || [];
    _sbCache.allTopics = tps || [];
    _sbCache.papers = pprs || [];
    _sbCache.errors = errs || [];
    _sbCache.sessions = sess || [];

    // Keep focus-timer subject list in sync
    if(subs && subs.length){
      _timerSubjects = subs.map(s => ({ key: s.id, name: s.name }));
      if(!_timerSubjects.find(s => s.key === curTimerSubject)){
        curTimerSubject = _timerSubjects[0].key;
      }
      renderTimerSubjects();
    }

    // renderDash() covers dashProgress, studyNow, flags, recall, todayBlocks,
    // analytics, and readyPct — all in one call, all now backed by _sbCache.
    renderDash();

    // Re-render coverage map if currently visible
    const covEl = document.getElementById("view-coverage");
    if(covEl && !covEl.classList.contains("hidden")) renderCoverage();

    // Re-fill Papers & Errors subject dropdowns if currently visible
    const logsEl = document.getElementById("view-logs");
    if(logsEl && !logsEl.classList.contains("hidden")) fillSubjSelects();

    // Re-render Focus Timer stats if currently visible
    const focusEl = document.getElementById("view-focus");
    if(focusEl && !focusEl.classList.contains("hidden")) renderFocus();
  } catch(e) {
    console.warn('[sbCache] refresh failed:', e);
  }
}
window.__refreshSbCache = refreshSbCache;

// Async-fills the burger menu stat values from Supabase (runs after initial sync render)
async function fetchBurgerStats() {
  if(!currentUser) return;
  try {
    const [{ data: sessData, error: e1 }, { data: topicsData, error: e2 }, { data: papersData, error: e3 }, { data: coData, error: e4 }] = await Promise.all([
      supabase.from('sessions').select('duration_sec'),
      supabase.from('topics').select('status'),
      supabase.from('papers').select('id'),
      supabase.from('closeout').select('day, value'),
    ]);

    if(!e1 && sessData){
      const totalSec = sessData.reduce((a, s) => a + (s.duration_sec || 0), 0);
      const el = document.getElementById('bm-stat-hrs');
      if(el) el.textContent = (totalSec / 3600).toFixed(1) + 'h';
    }

    if(!e2 && topicsData){
      const ready = topicsData.filter(t => t.status === 'ready' || t.status === 'mastered').length;
      const el = document.getElementById('bm-stat-topics');
      if(el) el.textContent = ready;
    }

    if(!e4 && coData){
      const yesDays = new Set(coData.filter(r => r.value === 'yes').map(r => r.day));
      const best = _computeBestStreak(yesDays);
      const el = document.getElementById('bm-stat-streak');
      if(el) el.textContent = best;
      updateBestStreak(best);
    }

    if(!e3 && papersData){
      const el = document.getElementById('bm-stat-papers');
      if(el) el.textContent = papersData.length;
    }
  } catch(e) {
    console.warn('[BurgerStats]', e);
  }
}

/* ============ boot ============ */
updateClock();
setInterval(updateClock,30000);
renderDash();
// Apply any cached layout instantly (no auth required)
(function(){
  const cached = localStorage.getItem(_homeLayoutKey());
  if (cached) { try { _homeLayout = JSON.parse(cached); applyHomeLayout(); } catch(e) {} }
})();

function showApp() {
  document.getElementById("loginScreen").classList.add("hidden");
  hideOnboarding();
  document.getElementById("authHeader").style.display = "flex";
  if (sessionStorage.getItem('sq_just_verified') === '1') {
    sessionStorage.removeItem('sq_just_verified');
    setTimeout(() => setToast('Email verified — welcome to Sequora!'), 600);
  }
  document.getElementById("userEmail").textContent = currentUser?.email || "";
  // Legacy study_state blob sync retired — real tables are the source of
  // truth for every feature now. localStorage keys some old code paths
  // still touch (topics/sessions/papers/errors) are no longer read by
  // anything real, so there's nothing left to pull from or push to.
  syncExamDateFromProfile().catch(() => {});
  // Load subjects + topics into _sbCache (also updates timer subjects, dash progress, overall %)
  refreshSbCache().catch(() => {});
  // Check friend requests for notification badge
  checkFriendsBadge();
  // Load todos from Supabase (instant render from localStorage already done at renderDash boot)
  initTodos().catch(() => {});
  // Load per-user homepage layout from Supabase (localStorage already applied at boot)
  loadHomeLayout().catch(() => {});

  // Update last active status on load
  updateLastActive();
  // Update last active every 3 minutes if page is focused
  if (!window._lastActiveInterval) {
    window._lastActiveInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        updateLastActive();
      }
    }, 3 * 60 * 1000);
  }
}

function updateLastActive() {
  if (!currentUser) return;
  supabase.from('profiles')
    .update({ last_active_at: new Date().toISOString() })
    .eq('id', currentUser.id)
    .then(() => {})
    .catch(() => {});
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

    // Fetch active announcements (non-blocking)
    _fetchAnnouncements();

    // Sync theme from DB (non-blocking) — localStorage already applied above
    loadThemeFromDB().then(dbTheme => {
      if (dbTheme) {
        applyTheme(dbTheme);
        // Restore font scale from DB
        const scale = dbTheme.fontScale || dbTheme.typography?.scale || 'default';
        document.documentElement.style.fontSize = { compact: '13px', default: '15px', large: '17px' }[scale] || '15px';
        localStorage.setItem('sq_font_scale', scale);
        if (dbTheme.typography) Object.assign(_tsTypoState, dbTheme.typography);
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

    // Not cached — check DB: fetch profile + subject count together
    try {
      const [profileRes, subjectsRes] = await Promise.all([
        supabase.from('profiles').select('onboarded_at').single(),
        supabase.from('subjects').select('id', { count: 'exact', head: true }).eq('user_id', session.user.id),
      ]);

      const profile = profileRes.data;
      const subjectCount = subjectsRes.count ?? 0;

      // Already onboarded, or existing user who already has subjects → skip wizard
      if (profile?.onboarded_at || subjectCount > 0) {
        if (subjectCount > 0 && !profile?.onboarded_at) {
          // Backfill: existing user slipped through — mark them as onboarded silently
          supabase.from('profiles')
            .update({ onboarded_at: new Date().toISOString() })
            .eq('id', session.user.id)
            .then(() => {}).catch(() => {});
        }
        localStorage.setItem('sq_onboarded', '1');
        showApp();
      } else {
        showOnboarding();
      }
    } catch (err) {
      console.error("[Auth] Profile check failed:", err);
      // Fallback: show onboarding to be safe for truly new users
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
  // Detect post-verification redirect before Supabase exchanges the token
  const _hashStr = window.location.hash;
  if (_hashStr.includes('type=signup') || _hashStr.includes('type=email_change')) {
    sessionStorage.setItem('sq_just_verified', '1');
  }

  // onAuthStateChange fires INITIAL_SESSION immediately on subscribe with the
  // current session — no need for a separate getSession() call, which was
  // firing handleSession() (2 DB queries) twice on every page load.
  supabase.auth.onAuthStateChange((event, session) => {
    console.log("[Auth] onAuthStateChange:", event);
    if (event === 'PASSWORD_RECOVERY') {
      showPasswordResetPanel();
      return;
    }
    handleSession(session);
  });
}

/* ============ Sequora Citation — Stage 1: file upload + text extraction ============ */
let _bibFile = null;
let _bibInited = false;
let _bibCitStyle = 'apa';

function renderCitation() {
  if (_bibInited) return;
  _bibInited = true;

  const dropzone  = document.getElementById('bib-dropzone');
  const fileInput = document.getElementById('bib-file-input');
  const pasteArea = document.getElementById('bib-paste-area');
  if (!dropzone || !fileInput || !pasteArea) return;

  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) bibSetFile(fileInput.files[0]);
  });

  dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('bib-hover'); });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('bib-hover'));
  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.classList.remove('bib-hover');
    if (e.dataTransfer.files[0]) bibSetFile(e.dataTransfer.files[0]);
  });

  pasteArea.addEventListener('input', () => {
    const has = pasteArea.value.trim().length > 0;
    if (has && !_bibFile) {
      document.getElementById('bib-extract-row').style.display = 'block';
    } else if (!has && !_bibFile) {
      document.getElementById('bib-extract-row').style.display = 'none';
    }
    _bibHideOutput();
  });
}

function bibSetFile(f) {
  _bibFile = f;
  document.getElementById('bib-paste-area').value = '';
  document.getElementById('bib-file-name').textContent = f.name;
  document.getElementById('bib-file-chosen').style.display = 'flex';
  document.getElementById('bib-extract-row').style.display = 'block';
  _bibHideOutput();
}

function _bibHideOutput() {
  document.getElementById('bib-loading').style.display = 'none';
  document.getElementById('bib-error').style.display = 'none';
  document.getElementById('bib-stub').style.display = 'none';
  document.getElementById('bib-output-wrap').style.display = 'none';
}

function _bibLoadScript(src) {
  return new Promise((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
    const s = document.createElement('script');
    s.src = src; s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });
}

async function bibExtract() {
  console.log('[CITATION] Extract clicked, mode:', _bibFile ? 'file' : 'paste');
  const pasteArea = document.getElementById('bib-paste-area');

  if (!_bibFile) {
    const txt = pasteArea.value.trim();
    console.log('[CITATION] Paste extraction, chars:', txt.length);
    if (txt) {
      _bibShowOutput(txt);
      console.log('[CITATION] Paste output shown');
    } else {
      console.warn('[CITATION] Paste area empty — nothing to extract');
    }
    return;
  }

  const ext = _bibFile.name.split('.').pop().toLowerCase();
  console.log('[CITATION] File extraction, ext:', ext, 'size:', _bibFile.size);
  document.getElementById('bib-loading').style.display = 'block';
  document.getElementById('bib-error').style.display = 'none';
  document.getElementById('bib-stub').style.display = 'none';
  document.getElementById('bib-output-wrap').style.display = 'none';

  try {
    let text = '';
    if (ext === 'txt') {
      console.log('[CITATION] Reading TXT file');
      text = await _bibFile.text();
      console.log('[CITATION] TXT read, chars:', text.length);
    } else if (ext === 'pdf') {
      console.log('[CITATION] Starting PDF.js extraction');
      text = await _bibExtractPDF(_bibFile);
      console.log('[CITATION] PDF extraction done, chars:', text.length);
    } else if (ext === 'docx') {
      console.log('[CITATION] Starting mammoth DOCX extraction');
      text = await _bibExtractDOCX(_bibFile);
      console.log('[CITATION] DOCX extraction done, chars:', text.length);
    } else if (ext === 'pptx') {
      _bibShowStub('PowerPoint files can\'t be read client-side yet — paste the text directly, or export the PPTX as a PDF and upload that.');
      return;
    } else if (['png','jpg','jpeg'].includes(ext)) {
      _bibShowStub('Image text extraction (OCR) is coming in Stage 2 — paste the text directly for now, or use a PDF/DOCX version of the source.');
      return;
    } else {
      throw new Error('unsupported format: ' + ext);
    }
    if (!text || !text.trim()) throw new Error('extraction produced empty text');
    _bibShowOutput(text.trim());
  } catch(err) {
    console.error('[CITATION] Extraction failed:', err);
    document.getElementById('bib-loading').style.display = 'none';
    document.getElementById('bib-error').style.display = 'block';
  }
}

async function _bibExtractPDF(file) {
  console.log('[CITATION] Loading PDF.js from unpkg…');
  try {
    await _bibLoadScript('https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.min.js');
  } catch(e) {
    console.error('[CITATION] PDF.js script load failed:', e);
    throw e;
  }
  console.log('[CITATION] PDF.js loaded, window.pdfjsLib:', typeof window.pdfjsLib);
  const pdfjsLib = window.pdfjsLib;
  if (!pdfjsLib) throw new Error('pdfjsLib not on window after script load');
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js';
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({data: buf}).promise;
  console.log('[CITATION] PDF loaded, pages:', pdf.numPages);
  let out = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const pg = await pdf.getPage(i);
    const ct = await pg.getTextContent();
    out += ct.items.map(it => it.str).join(' ') + '\n\n';
  }
  return out;
}

async function _bibExtractDOCX(file) {
  console.log('[CITATION] Loading mammoth from unpkg…');
  try {
    await _bibLoadScript('https://unpkg.com/mammoth@1.7.1/mammoth.browser.min.js');
  } catch(e) {
    console.error('[CITATION] mammoth script load failed:', e);
    throw e;
  }
  console.log('[CITATION] mammoth loaded, window.mammoth:', typeof window.mammoth);
  if (!window.mammoth) throw new Error('mammoth not on window after script load');
  const buf = await file.arrayBuffer();
  const result = await window.mammoth.extractRawText({arrayBuffer: buf});
  return result.value;
}

function _bibShowOutput(text) {
  document.getElementById('bib-loading').style.display = 'none';
  document.getElementById('bib-output').value = text;
  document.getElementById('bib-output-wrap').style.display = 'block';
  _citReset();
}

function _bibShowStub(msg) {
  document.getElementById('bib-loading').style.display = 'none';
  const el = document.getElementById('bib-stub');
  el.textContent = msg;
  el.style.display = 'block';
}

function bibCopyOutput() {
  const text = document.getElementById('bib-output').value;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => setToast('Text copied!'));
}

function bibClear() {
  _bibFile = null;
  const fi = document.getElementById('bib-file-input');
  if (fi) fi.value = '';
  document.getElementById('bib-paste-area').value = '';
  document.getElementById('bib-file-chosen').style.display = 'none';
  document.getElementById('bib-file-name').textContent = '';
  document.getElementById('bib-extract-row').style.display = 'none';
  _bibHideOutput();
  _citReset();
}

function _citReset() {
  const ldEl = document.getElementById('cit-loading');
  const errEl = document.getElementById('cit-error');
  const resEl = document.getElementById('cit-results');
  if (ldEl) ldEl.style.display = 'none';
  if (errEl) errEl.style.display = 'none';
  if (resEl) resEl.style.display = 'none';
  _bibCitStyle = 'apa';
  document.querySelectorAll('.cit-style-pill').forEach(p => {
    p.classList.toggle('active', (p.getAttribute('onclick') || '').includes("'apa'"));
  });
}

function bibSetStyle(style) {
  _bibCitStyle = style;
  document.querySelectorAll('.cit-style-pill').forEach(p => {
    p.classList.toggle('active', (p.getAttribute('onclick') || '').includes(`'${style}'`));
  });
}

function _bibScanCitations(text) {
  const sources = [];
  const secRe = /(?:^|\n)[ \t]*(references?|bibliography|works?\s+cited|sources?)\s*:?\s*\n/im;
  const secMatch = secRe.exec(text);
  const block = secMatch ? text.slice(secMatch.index + secMatch[0].length) : text;

  // Numbered entries: [1] ..., 1. ..., 1) ...
  const numRe = /^\s*(?:\[\d+\]|\d+[.)]\s)\s*(.{20,})/gm;
  let m;
  while ((m = numRe.exec(block)) !== null && sources.length < 20) {
    sources.push({ formatted_citation: m[1].trim().replace(/\s+/g, ' '), url: null });
  }

  // Paragraph-style entries from a detected bibliography section
  if (sources.length === 0 && secMatch) {
    const paras = block.split(/\n{2,}/);
    for (const p of paras) {
      const entry = p.trim().replace(/\s+/g, ' ');
      if (entry.length > 30) {
        sources.push({ formatted_citation: entry, url: null });
        if (sources.length >= 20) break;
      }
    }
  }

  return sources;
}

async function bibFindCitations() {
  const text = document.getElementById('bib-output')?.value;
  if (!text) return;

  document.getElementById('cit-error').style.display = 'none';
  document.getElementById('cit-results').style.display = 'none';

  // Mode A: client-side scan
  const found = _bibScanCitations(text);
  if (found.length > 0) {
    _bibRenderSources(found, 'scan', `${found.length} citation${found.length !== 1 ? 's' : ''} detected in text`);
    return;
  }

  // Mode B: API fallback — Pro-only, matches server-side gate in api/find-sources.js
  if (userTier !== 'paid_3') {
    const errEl = document.getElementById('cit-error');
    errEl.innerHTML = 'Upgrade to Pro to use AI Web Grounding <a href="#" onclick="showPaywall(\'Sequora Citation AI\', \'paid_3\'); return false;" style="color:var(--accent);text-decoration:underline;">Upgrade</a>';
    errEl.style.display = 'block';
    return;
  }

  document.getElementById('cit-loading').style.display = 'block';
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    if (!token) throw new Error('Not signed in');

    const resp = await fetch('/api/find-sources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ text: text.slice(0, 4000), style: _bibCitStyle }),
    });
    const data = await resp.json();
    document.getElementById('cit-loading').style.display = 'none';

    if (!resp.ok || data.error) {
      const errEl = document.getElementById('cit-error');
      if (data.error === 'busy') {
        errEl.textContent = data.message || 'Source search is temporarily busy — please try again tomorrow.';
      } else if (data.code === 'INACTIVE' || data.code === 'UPGRADE_REQUIRED') {
        errEl.textContent = data.error;
      } else {
        errEl.textContent = 'Source search is temporarily unavailable';
      }
      errEl.style.display = 'block';
      return;
    }

    _bibRenderSources(data.sources || [], 'api', 'Sources found via web search');
  } catch (err) {
    document.getElementById('cit-loading').style.display = 'none';
    const errEl = document.getElementById('cit-error');
    errEl.textContent = 'Source search is temporarily unavailable';
    errEl.style.display = 'block';
  }
}

function _bibRenderSources(sources, mode, label) {
  document.getElementById('cit-results-label').textContent = label;
  const listEl = document.getElementById('cit-sources-list');
  const copyRow = document.getElementById('cit-copy-row');

  if (!sources || sources.length === 0) {
    listEl.innerHTML = '<div class="cit-no-found">No citations found. Try a document with a References or Bibliography section, or use the API search.</div>';
    copyRow.style.display = 'none';
  } else {
    listEl.innerHTML = sources.map((s, i) => {
      const citation = escapeHtml(s.formatted_citation || [s.author, s.year ? `(${s.year})` : '', s.title].filter(Boolean).join(' '));
      const urlHtml = s.url
        ? `<div class="cit-source-url"><a href="${escapeHtml(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.url)}</a></div>`
        : '';
      return `<div class="cit-source-item"><input type="checkbox" class="cit-source-cb" id="cit-cb-${i}" checked><div class="cit-source-body"><div class="cit-source-formatted">${citation}</div>${urlHtml}</div></div>`;
    }).join('');
    copyRow.style.display = 'block';
  }
  document.getElementById('cit-results').style.display = 'block';
}

function bibCopySelected() {
  const items = document.querySelectorAll('.cit-source-item');
  const selected = [];
  items.forEach(item => {
    const cb = item.querySelector('.cit-source-cb');
    if (cb && cb.checked) {
      const text = item.querySelector('.cit-source-formatted')?.textContent || '';
      if (text) selected.push(text);
    }
  });
  if (!selected.length) { setToast('No citations selected'); return; }
  navigator.clipboard.writeText(selected.join('\n\n')).then(() =>
    setToast(`${selected.length} citation${selected.length !== 1 ? 's' : ''} copied!`)
  );
}

// ── announcements ──────────────────────────────────────────────────────────

async function _fetchAnnouncements() {
  try {
    const { data } = await supabase
      .from('announcements')
      .select('id, message')
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(1);
    if (!data?.length) return;
    const ann = data[0];
    const dismissed = JSON.parse(localStorage.getItem('sq_dismissed_ann') || '[]');
    if (dismissed.includes(ann.id)) return;
    _showAnnouncementBanner(ann);
  } catch (_) { /* announcements table may not exist yet */ }
}

function _showAnnouncementBanner(ann) {
  const existing = document.getElementById('sq-ann-banner');
  if (existing) existing.remove();
  const banner = document.createElement('div');
  banner.id = 'sq-ann-banner';
  banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:8000;background:#e8a33d;color:#12100e;padding:9px 16px;display:flex;align-items:center;gap:12px;font-family:var(--mono,"JetBrains Mono",monospace);font-size:12px;box-shadow:0 2px 8px rgba(0,0,0,.3)';
  const msg = document.createElement('span');
  msg.style.flex = '1';
  msg.textContent = ann.message;
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  closeBtn.style.cssText = 'background:rgba(0,0,0,.15);border:none;border-radius:4px;padding:3px 9px;cursor:pointer;font-size:14px;font-weight:700;color:#12100e;line-height:1';
  closeBtn.addEventListener('click', () => {
    const d = JSON.parse(localStorage.getItem('sq_dismissed_ann') || '[]');
    d.push(ann.id);
    localStorage.setItem('sq_dismissed_ann', JSON.stringify(d));
    banner.remove();
  });
  banner.appendChild(msg);
  banner.appendChild(closeBtn);
  document.body.prepend(banner);
}

document.querySelectorAll("#nav button").forEach(b=>{
  if (b.dataset.v) b.onclick = () => go(b.dataset.v);
});
document.getElementById("summaryModal").addEventListener("click",e=>{if(e.target.id==="summaryModal")closeSummary();});
document.getElementById("aiModal").addEventListener("click",e=>{if(e.target.id==="aiModal")closeAIModal();});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape") {
    closeSummary();
    closeAIModal();
  }
});

/* ============ PWA install prompt ============ */
let _pwaInstallPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  _pwaInstallPrompt = e;
  document.getElementById('pwa-install-btn')?.classList.remove('hidden');
});

window.addEventListener('appinstalled', () => {
  _pwaInstallPrompt = null;
  document.getElementById('pwa-install-btn')?.classList.add('hidden');
});

window.installPWA = async function() {
  if (!_pwaInstallPrompt) return;
  _pwaInstallPrompt.prompt();
  const { outcome } = await _pwaInstallPrompt.userChoice;
  console.log('[PWA] Install outcome:', outcome);
  _pwaInstallPrompt = null;
  document.getElementById('pwa-install-btn')?.classList.add('hidden');
};
window.addEventListener("beforeunload",e=>{if(timerRunning){e.preventDefault();e.returnValue="";}});
