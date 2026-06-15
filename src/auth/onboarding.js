import { supabase } from '../lib/supabase.js';
import { completeOnboarding } from '../data/profiles.js';
import {
  createSubject,
  deleteSubject,
  getTemplatesByBoard,
  createSubjectFromTemplate,
} from '../data/subjects.js';
import { hasLegacyData, migrateFromStudyState } from '../data/migration.js';

// ── state ──────────────────────────────────────────────────────────────────
let wizData = { displayName: '', examBoard: '', examDate: null };
let wizSubjects = [];    // [{ id, name }] subjects created during this wizard session
let currentStep = 1;
let totalSteps = 3;      // bumped to 4 if legacy data detected

// ── show / hide ────────────────────────────────────────────────────────────
export function showOnboarding() {
  document.getElementById('onboardingScreen').classList.remove('hidden');
  resetWizard();
  goToStep(1);
}

export function hideOnboarding() {
  document.getElementById('onboardingScreen').classList.add('hidden');
}

function resetWizard() {
  wizData = { displayName: '', examBoard: '', examDate: null };
  wizSubjects = [];
  currentStep = 1;
  totalSteps = 3;
  clearWizError();
}

// ── step navigation ────────────────────────────────────────────────────────
function goToStep(n) {
  currentStep = n;
  [1, 2, 3, 4].forEach(i => {
    const el = document.getElementById(`wiz-step-${i}`);
    if (el) el.classList.toggle('hidden', i !== n);
  });
  document.querySelectorAll('.wiz-dot').forEach((dot, i) => {
    dot.classList.toggle('wiz-dot-done', i < n);
    dot.classList.toggle('wiz-dot-active', i === n - 1);
  });
  const label = document.getElementById('wiz-step-label');
  if (label) label.textContent = `Step ${n} of ${totalSteps}`;
}

export async function wizNext() {
  clearWizError();

  if (currentStep === 1) {
    const name = document.getElementById('wiz-name').value.trim();
    if (!name) { showWizError('Enter your name to continue'); return; }
    wizData.displayName = name;
    goToStep(2);

  } else if (currentStep === 2) {
    const board = document.getElementById('wiz-board').value;
    if (!board) { showWizError('Select your exam board'); return; }

    const noDate = document.getElementById('wiz-no-date').checked;
    let examDate = null;
    if (!noDate) {
      examDate = document.getElementById('wiz-date').value;
      if (!examDate) { showWizError('Set your exam date, or check N/A'); return; }
      if (new Date(examDate) <= new Date()) { showWizError('Exam date must be in the future'); return; }
    }

    wizData.examBoard = board;
    wizData.examDate = examDate;
    goToStep(3);
    await loadBoardTemplates(board);
  }
}

export function wizBack() {
  if (currentStep > 1) goToStep(currentStep - 1);
}

// ── board change ──────────────────────────────────────────────────────────
export function wizBoardChange() {
  const board = document.getElementById('wiz-board').value;
  const noDateCb = document.getElementById('wiz-no-date');
  const dateInput = document.getElementById('wiz-date');

  // ACCA and MBBS have no single exam date
  if (board === 'acca' || board === 'mbbs') {
    noDateCb.checked = true;
    dateInput.disabled = true;
    dateInput.value = '';
  } else {
    noDateCb.checked = false;
    dateInput.disabled = false;
  }
}

export function wizNoDateToggle() {
  const checked = document.getElementById('wiz-no-date').checked;
  const dateInput = document.getElementById('wiz-date');
  dateInput.disabled = checked;
  if (checked) dateInput.value = '';
}

// ── step 3: templates ──────────────────────────────────────────────────────
async function loadBoardTemplates(board) {
  const listEl = document.getElementById('wiz-template-list');
  listEl.innerHTML = '<div class="empty">Loading subjects…</div>';

  try {
    const templates = await getTemplatesByBoard(board);
    if (!templates.length) {
      listEl.innerHTML = '<div class="empty" style="text-align:left">No syllabus templates for this board yet — add subjects manually.</div>';
      return;
    }
    listEl.innerHTML = templates.map(t => `
      <div class="wiz-tmpl-row" id="wiz-tmpl-${t.id}">
        <div class="wiz-tmpl-info">
          <span class="wiz-tmpl-name">${escAttr(t.subject_name)}</span>
          ${t.subject_code ? `<span class="wiz-tmpl-code">${t.subject_code}</span>` : ''}
          <span class="wiz-tmpl-count">${Array.isArray(t.topics) ? t.topics.length : 0} topics</span>
        </div>
        <button class="btn sm" onclick="wizAddFromTemplate('${t.id}')">Add</button>
      </div>
    `).join('');
  } catch (err) {
    listEl.innerHTML = `<div class="empty">Could not load templates: ${err.message}</div>`;
  }
}

export async function wizAddFromTemplate(templateId) {
  const row = document.getElementById(`wiz-tmpl-${templateId}`);
  const btn = row?.querySelector('button');
  if (btn) { btn.disabled = true; btn.textContent = 'Adding…'; }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not logged in');

    const subject = await createSubjectFromTemplate({ userId: user.id, templateId });
    wizSubjects.push({ id: subject.id, name: subject.name });

    if (btn) { btn.textContent = 'Added ✓'; btn.classList.add('wiz-btn-done'); }
    refreshAddedList();
  } catch (err) {
    if (btn) { btn.disabled = false; btn.textContent = 'Add'; }
    showWizError('Failed to add: ' + err.message);
  }
}

export async function wizAddManual() {
  const nameEl  = document.getElementById('wiz-manual-name');
  const shortEl = document.getElementById('wiz-manual-short');
  const codeEl  = document.getElementById('wiz-manual-code');
  const addBtn  = document.getElementById('wiz-manual-btn');

  const name = nameEl.value.trim();
  if (!name) { showWizError('Subject name is required'); return; }

  addBtn.disabled = true;
  addBtn.textContent = 'Adding…';

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not logged in');

    const subject = await createSubject({
      userId: user.id,
      name,
      shortName: shortEl.value.trim() || null,
      examCode:  codeEl.value.trim()  || null,
    });
    wizSubjects.push({ id: subject.id, name: subject.name });
    nameEl.value = '';
    shortEl.value = '';
    codeEl.value = '';
    refreshAddedList();
  } catch (err) {
    showWizError('Failed: ' + err.message);
  } finally {
    addBtn.disabled = false;
    addBtn.textContent = 'Add';
  }
}

export async function wizRemoveSubject(subjectId) {
  try {
    await deleteSubject(subjectId);
    wizSubjects = wizSubjects.filter(s => s.id !== subjectId);
    refreshAddedList();
    // Re-enable the template button if this was a template subject
    const btn = document.querySelector(`#wiz-tmpl-${subjectId} button`);
    // (templateId ≠ subjectId, so the button won't be found this way — that's fine)
  } catch (err) {
    showWizError('Remove failed: ' + err.message);
  }
}

function refreshAddedList() {
  const el  = document.getElementById('wiz-added-subjects');
  const btn = document.getElementById('wiz-complete-btn');
  const countEl = document.getElementById('wiz-subject-count');

  if (!wizSubjects.length) {
    el.innerHTML = '<div class="empty" style="font-size:12px;padding:12px 0">No subjects yet — add at least one above.</div>';
    btn.disabled = true;
    if (countEl) countEl.textContent = '';
    return;
  }

  el.innerHTML = wizSubjects.map(s => `
    <div class="wiz-added-item">
      <span>${escAttr(s.name)}</span>
      <button class="btn sm ghost danger" onclick="wizRemoveSubject('${s.id}')">×</button>
    </div>
  `).join('');

  btn.disabled = false;
  const n = wizSubjects.length;
  if (countEl) countEl.textContent = n + ' subject' + (n > 1 ? 's' : '');
  btn.textContent = `Complete Setup →`;
}

// ── complete wizard (step 3 → check for legacy data → step 4 or done) ────
export async function wizComplete() {
  if (!wizSubjects.length) { showWizError('Add at least one subject to continue'); return; }

  const btn = document.getElementById('wiz-complete-btn');
  btn.disabled = true;
  btn.textContent = 'Checking…';

  try {
    // Save profile data regardless
    await completeOnboarding({
      displayName: wizData.displayName,
      examBoard:   wizData.examBoard,
      examDate:    wizData.examDate,
    });

    // If legacy study_state exists, show step 4 (migration offer)
    const legacy = await hasLegacyData();
    if (legacy) {
      totalSteps = 4;
      goToStep(4);
      btn.disabled = false;
      btn.textContent = 'Complete Setup →';
      return;
    }

    _finishWizard();
  } catch (err) {
    showWizError('Setup failed: ' + err.message);
    btn.disabled = false;
    btn.textContent = 'Complete Setup →';
  }
}

// ── step 4: migration ──────────────────────────────────────────────────────
export async function wizMigrateAndComplete() {
  const btn    = document.getElementById('wiz-migrate-btn');
  const status = document.getElementById('wiz-migrate-status');
  const skip   = document.getElementById('wiz-skip-migrate');

  if (btn)  { btn.disabled = true; btn.textContent = 'Importing…'; }
  if (skip) skip.style.display = 'none';
  if (status) status.textContent = 'Starting import…';

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
    setTimeout(_finishWizard, 1200);
  } catch (err) {
    if (status) status.textContent = 'Import failed: ' + err.message;
    if (btn)  { btn.disabled = false; btn.textContent = 'Try again'; }
    if (skip) skip.style.display = '';
  }
}
export { wizMigrateAndComplete as wizMigrate };

export function wizSkipMigration() {
  _finishWizard();
}

function _finishWizard() {
  localStorage.setItem('sq_onboarded', '1');
  hideOnboarding();
  if (typeof window.__showApp === 'function') window.__showApp();
}

// ── helpers ────────────────────────────────────────────────────────────────
function showWizError(msg) {
  const el = document.getElementById('wiz-error');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 4000);
}

function clearWizError() {
  const el = document.getElementById('wiz-error');
  if (el) el.classList.add('hidden');
}

function escAttr(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
