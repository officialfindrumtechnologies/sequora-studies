import { supabase } from '../lib/supabase.js';
import {
  getSubjects, createSubject, updateSubject, reorderSubjects, deleteSubject,
  getTemplatesByBoard, createSubjectFromTemplate,
} from '../data/subjects.js';
import {
  getTopics, createTopic, updateTopic, deleteTopic, bulkInsertTopics, reorderTopics,
} from '../data/topics.js';

// ── state ──────────────────────────────────────────────────────────────────
const sv = {
  subjects: [],
  activeId: null,
  topics: [],
  tier: 'free',
  searchQuery: '',
};

let pdfTopics = [];

// ── public API ─────────────────────────────────────────────────────────────
export async function initSubjectsView(tier) {
  sv.tier = tier;
  await loadAll();
}

export function setSubjectsViewTier(tier) {
  sv.tier = tier;
}

async function loadAll() {
  try {
    sv.subjects = await getSubjects();
    if (!sv.activeId || !sv.subjects.find(s => s.id === sv.activeId)) {
      sv.activeId = sv.subjects[0]?.id ?? null;
    }
    sv.topics = sv.activeId ? await getTopics(sv.activeId) : [];
  } catch (err) {
    console.error('[SubjectsView] loadAll:', err);
  }
  renderAll();
}

async function loadTopics() {
  try {
    sv.topics = sv.activeId ? await getTopics(sv.activeId) : [];
  } catch (err) {
    console.error('[SubjectsView] loadTopics:', err);
  }
  renderTopicPanel();
  renderOrderCard();
  renderSubjectControls();
}

// ── render entry ───────────────────────────────────────────────────────────
function renderAll() {
  renderMigrationBanner();
  renderSubjectTabs();
  renderSubjectControls();
  renderTopicPanel();
  renderOrderCard();
}

// ── migration banner ───────────────────────────────────────────────────────
function renderMigrationBanner() {
  const el = document.getElementById('sb-migration-banner');
  if (!el) return;
  if (sv.subjects.length > 0) { el.classList.add('hidden'); return; }
  try {
    const stored = localStorage.getItem('ascent_topics');
    const parsed = stored ? JSON.parse(stored) : null;
    const hasData = parsed && Object.values(parsed).some(a => Array.isArray(a) && a.length);
    el.classList.toggle('hidden', !hasData);
  } catch {
    el.classList.add('hidden');
  }
}

// ── subjects panel ─────────────────────────────────────────────────────────
function renderSubjectTabs() {
  const host = document.getElementById('sb-tabs');
  if (!host) return;
  if (!sv.subjects.length) {
    host.innerHTML = '<span style="font-size:13px;opacity:.5">No subjects yet.</span>';
    return;
  }
  host.innerHTML = sv.subjects.map(s =>
    `<button class="${s.id === sv.activeId ? 'on' : ''}" onclick="sbSelectSubject('${s.id}')">${esc(s.short_name || s.name)}</button>`
  ).join('');
}

function renderSubjectControls() {
  const ctrl = document.getElementById('sb-controls');
  const nameEl = document.getElementById('sb-active-name');
  const metaEl = document.getElementById('sb-active-meta');
  const barEl  = document.getElementById('sb-bar');
  const cntEl  = document.getElementById('sb-count');

  if (!sv.activeId || !sv.subjects.length) {
    if (nameEl) nameEl.textContent = '—';
    if (metaEl) metaEl.textContent = '';
    if (barEl)  barEl.style.width = '0%';
    if (cntEl)  cntEl.textContent = '';
    if (ctrl)   ctrl.innerHTML = '';
    return;
  }

  const subj  = sv.subjects.find(s => s.id === sv.activeId);
  if (!subj) return;

  if (nameEl) nameEl.textContent = subj.name;
  if (metaEl) metaEl.textContent = subj.exam_code || '';

  const ready = sv.topics.filter(t => t.status === 'ready').length;
  const total = sv.topics.length;
  const pct   = total ? Math.round(ready / total * 100) : 0;
  if (barEl) barEl.style.width = pct + '%';
  if (cntEl) cntEl.textContent = `${ready} of ${total} topics exam-ready · ${pct}%`;

  if (!ctrl) return;
  const idx = sv.subjects.findIndex(s => s.id === sv.activeId);
  ctrl.innerHTML = `
    <div class="sb-ctrl-row">
      <button class="btn sm ghost" onclick="sbMoveSubjectUp()" ${idx === 0 ? 'disabled' : ''} title="Move up">↑ Up</button>
      <button class="btn sm ghost" onclick="sbMoveSubjectDown()" ${idx >= sv.subjects.length - 1 ? 'disabled' : ''} title="Move down">↓ Down</button>
      <button class="btn sm ghost" onclick="sbEditSubjectName()">Rename</button>
      <button class="btn sm ghost danger" onclick="sbDeleteSubject()">Delete</button>
    </div>`;
}

// ── add subject panel ──────────────────────────────────────────────────────
function sbShowAddSubjectPanel() {
  const panel = document.getElementById('sb-add-panel');
  if (!panel) return;
  const hidden = panel.classList.toggle('hidden');
  if (!hidden) document.getElementById('sb-new-subj-name')?.focus();
}
window.sbShowAddSubjectPanel = sbShowAddSubjectPanel;

async function sbLoadTemplatesForBoard() {
  const board = document.getElementById('sb-template-board')?.value;
  const list  = document.getElementById('sb-template-list');
  if (!list) return;
  if (!board) { list.innerHTML = ''; return; }

  list.innerHTML = '<div class="empty" style="padding:8px 0">Loading…</div>';
  try {
    const templates = await getTemplatesByBoard(board);
    if (!templates.length) {
      list.innerHTML = '<div class="empty" style="padding:8px 0">No templates for this board yet.</div>';
      return;
    }
    list.innerHTML = templates.map(t => `
      <div class="sb-tmpl-row">
        <span>${esc(t.subject_name)}${t.subject_code ? ` <span class="tag">${esc(t.subject_code)}</span>` : ''}</span>
        <span style="opacity:.5;font-size:12px">${Array.isArray(t.topics) ? t.topics.length : 0} topics</span>
        <button class="btn sm" onclick="sbAddFromTemplate('${t.id}', this)">Add</button>
      </div>
    `).join('');
  } catch (err) {
    list.innerHTML = `<div class="empty">Error: ${esc(err.message)}</div>`;
  }
}
window.sbLoadTemplatesForBoard = sbLoadTemplatesForBoard;

async function sbAddFromTemplate(templateId, btn) {
  if (btn) { btn.disabled = true; btn.textContent = 'Adding…'; }
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const subject = await createSubjectFromTemplate({ userId: user.id, templateId });
    sv.subjects.push(subject);
    sv.activeId = subject.id;
    sv.topics = await getTopics(subject.id);
    document.getElementById('sb-add-panel')?.classList.add('hidden');
    renderAll();
    sbToast('Subject added from template');
  } catch (err) {
    sbToast('Failed: ' + err.message);
    if (btn) { btn.disabled = false; btn.textContent = 'Add'; }
  }
}
window.sbAddFromTemplate = sbAddFromTemplate;

async function sbAddManualSubject() {
  const nameEl  = document.getElementById('sb-new-subj-name');
  const shortEl = document.getElementById('sb-new-subj-short');
  const codeEl  = document.getElementById('sb-new-subj-code');
  const btn     = document.getElementById('sb-add-subj-btn');

  const name = nameEl?.value.trim();
  if (!name) { sbToast('Subject name required'); return; }

  btn.disabled = true; btn.textContent = 'Adding…';
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const subject = await createSubject({
      userId: user.id,
      name,
      shortName: shortEl?.value.trim() || null,
      examCode:  codeEl?.value.trim()  || null,
    });
    sv.subjects.push(subject);
    sv.activeId = subject.id;
    sv.topics = [];
    if (nameEl)  nameEl.value  = '';
    if (shortEl) shortEl.value = '';
    if (codeEl)  codeEl.value  = '';
    document.getElementById('sb-add-panel')?.classList.add('hidden');
    renderAll();
    sbToast('Subject added');
  } catch (err) {
    sbToast('Failed: ' + err.message);
  } finally {
    btn.disabled = false; btn.textContent = 'Add Subject';
  }
}
window.sbAddManualSubject = sbAddManualSubject;

async function sbSelectSubject(id) {
  sv.activeId = id;
  sv.searchQuery = '';
  const searchEl = document.getElementById('sb-search');
  if (searchEl) searchEl.value = '';
  renderSubjectTabs();
  await loadTopics();
}
window.sbSelectSubject = sbSelectSubject;

async function sbMoveSubjectUp() {
  const idx = sv.subjects.findIndex(s => s.id === sv.activeId);
  if (idx <= 0) return;
  [sv.subjects[idx - 1], sv.subjects[idx]] = [sv.subjects[idx], sv.subjects[idx - 1]];
  renderSubjectTabs();
  renderSubjectControls();
  await reorderSubjects(sv.subjects.map(s => s.id)).catch(e => sbToast('Reorder failed'));
}
window.sbMoveSubjectUp = sbMoveSubjectUp;

async function sbMoveSubjectDown() {
  const idx = sv.subjects.findIndex(s => s.id === sv.activeId);
  if (idx < 0 || idx >= sv.subjects.length - 1) return;
  [sv.subjects[idx], sv.subjects[idx + 1]] = [sv.subjects[idx + 1], sv.subjects[idx]];
  renderSubjectTabs();
  renderSubjectControls();
  await reorderSubjects(sv.subjects.map(s => s.id)).catch(e => sbToast('Reorder failed'));
}
window.sbMoveSubjectDown = sbMoveSubjectDown;

function sbEditSubjectName() {
  const subj   = sv.subjects.find(s => s.id === sv.activeId);
  const nameEl = document.getElementById('sb-active-name');
  if (!subj || !nameEl) return;

  const input = document.createElement('input');
  input.value = subj.name;
  input.style.cssText = 'font:inherit;font-size:inherit;font-weight:inherit;background:transparent;border:none;border-bottom:2px solid var(--amber);outline:none;color:inherit;width:300px;max-width:100%;';
  nameEl.replaceWith(input);
  input.focus(); input.select();

  let saved = false;
  const restore = () => {
    const h2 = document.createElement('h2');
    h2.id = 'sb-active-name'; h2.textContent = subj.name;
    input.replaceWith(h2);
  };
  const save = async () => {
    if (saved) return; saved = true;
    const newName = input.value.trim();
    if (newName && newName !== subj.name) {
      try {
        await updateSubject(sv.activeId, { name: newName });
        subj.name = newName;
        sbToast('Subject renamed');
      } catch (err) { sbToast('Rename failed: ' + err.message); }
    }
    restore();
    renderSubjectTabs();
  };
  input.onblur = save;
  input.onkeydown = e => {
    if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
    if (e.key === 'Escape') { saved = true; restore(); }
  };
}
window.sbEditSubjectName = sbEditSubjectName;

function sbDeleteSubject() {
  const subj = sv.subjects.find(s => s.id === sv.activeId);
  if (!subj) return;
  const modal  = document.getElementById('sb-delete-modal');
  const nameEl = document.getElementById('sb-delete-subj-name');
  const cntEl  = document.getElementById('sb-delete-topic-count');
  if (!modal) return;
  if (nameEl) nameEl.textContent = subj.name;
  if (cntEl)  cntEl.textContent  = sv.topics.length;
  modal.classList.remove('hidden');
}
window.sbDeleteSubject = sbDeleteSubject;

function sbCancelDeleteSubject() {
  document.getElementById('sb-delete-modal')?.classList.add('hidden');
}
window.sbCancelDeleteSubject = sbCancelDeleteSubject;

async function sbConfirmDeleteSubject() {
  const btn = document.getElementById('sb-confirm-delete-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Deleting…'; }
  try {
    await deleteSubject(sv.activeId);
    sv.subjects = sv.subjects.filter(s => s.id !== sv.activeId);
    sv.activeId = sv.subjects[0]?.id ?? null;
    sv.topics = sv.activeId ? await getTopics(sv.activeId) : [];
    document.getElementById('sb-delete-modal')?.classList.add('hidden');
    renderAll();
    sbToast('Subject deleted');
  } catch (err) {
    sbToast('Delete failed: ' + err.message);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Yes, delete'; }
  }
}
window.sbConfirmDeleteSubject = sbConfirmDeleteSubject;

// ── topic CRUD ─────────────────────────────────────────────────────────────
const FREE_LIMIT = 10;

async function sbAddTopic() {
  if (!sv.activeId) { sbToast('Select a subject first'); return; }
  const nameEl = document.getElementById('sb-new-topic-name');
  const secEl  = document.getElementById('sb-new-topic-section');
  const btn    = document.getElementById('sb-add-topic-btn');
  const name   = nameEl?.value.trim();
  if (!name) { sbToast('Topic name required'); return; }

  if (btn) { btn.disabled = true; }
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const topic = await createTopic({
      userId: user.id, subjectId: sv.activeId,
      section: secEl?.value.trim() || null, name,
    });
    sv.topics.push(topic);
    if (nameEl) nameEl.value = '';
    renderTopicPanel();
    renderOrderCard();
    renderSubjectControls();
    sbToast('Topic added');
    nameEl?.focus();
  } catch (err) {
    sbToast('Failed: ' + err.message);
  } finally {
    if (btn) btn.disabled = false;
  }
}
window.sbAddTopic = sbAddTopic;

// Allow pressing Enter in topic name input to add
function sbTopicNameKeydown(e) {
  if (e.key === 'Enter') { e.preventDefault(); sbAddTopic(); }
}
window.sbTopicNameKeydown = sbTopicNameKeydown;

async function sbCycleStatus(id) {
  const topic = sv.topics.find(t => t.id === id);
  if (!topic) return;

  const cycle = { notstarted: 'learning', learning: 'ready', ready: 'notstarted' };
  const next  = cycle[topic.status] ?? 'notstarted';
  const prev  = topic.status;

  topic.status = next;
  renderTopicPanel();
  renderOrderCard();
  renderSubjectControls();

  const updates = { status: next };
  if (next === 'ready')         updates.ready_at = new Date().toISOString().slice(0, 10);
  else if (next === 'notstarted') { updates.ready_at = null; updates.recall_reps = 0; }

  try {
    await updateTopic(id, updates);
  } catch (err) {
    topic.status = prev;
    renderTopicPanel();
    sbToast('Status update failed');
  }
}
window.sbCycleStatus = sbCycleStatus;

async function sbDeleteTopic(id) {
  try {
    await deleteTopic(id);
    sv.topics = sv.topics.filter(t => t.id !== id);
    renderTopicPanel();
    renderOrderCard();
    renderSubjectControls();
    sbToast('Topic removed');
  } catch (err) {
    sbToast('Delete failed: ' + err.message);
  }
}
window.sbDeleteTopic = sbDeleteTopic;

async function sbMoveTopicUp(id) {
  const idx = sv.topics.findIndex(t => t.id === id);
  if (idx <= 0) return;
  [sv.topics[idx - 1], sv.topics[idx]] = [sv.topics[idx], sv.topics[idx - 1]];
  renderTopicPanel();
  await reorderTopics(sv.topics.map(t => t.id)).catch(() => sbToast('Reorder failed'));
}
window.sbMoveTopicUp = sbMoveTopicUp;

async function sbMoveTopicDown(id) {
  const idx = sv.topics.findIndex(t => t.id === id);
  if (idx < 0 || idx >= sv.topics.length - 1) return;
  [sv.topics[idx], sv.topics[idx + 1]] = [sv.topics[idx + 1], sv.topics[idx]];
  renderTopicPanel();
  await reorderTopics(sv.topics.map(t => t.id)).catch(() => sbToast('Reorder failed'));
}
window.sbMoveTopicDown = sbMoveTopicDown;

// ── inline editing ─────────────────────────────────────────────────────────
function sbStartEditName(id) {
  const topic = sv.topics.find(t => t.id === id);
  const row   = document.querySelector(`.sb-topic[data-id="${id}"]`);
  const nmEl  = row?.querySelector('.nm');
  if (!topic || !nmEl) return;

  const input = document.createElement('input');
  input.value = topic.name;
  input.className = 'sb-inline-edit';
  input.style.cssText = 'flex:1;min-width:80px;';
  nmEl.replaceWith(input);
  input.focus(); input.select();

  let saved = false;
  const restore = () => {
    const span = document.createElement('span');
    span.className = 'nm'; span.textContent = topic.name;
    span.onclick = () => sbStartEditName(id); span.title = 'Click to rename';
    input.replaceWith(span);
  };
  const save = async () => {
    if (saved) return; saved = true;
    const v = input.value.trim();
    if (v && v !== topic.name) {
      await updateTopic(id, { name: v }).catch(e => sbToast('Save failed'));
      topic.name = v;
    }
    restore();
  };
  input.onblur = save;
  input.onkeydown = e => {
    if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
    if (e.key === 'Escape') { saved = true; restore(); }
  };
}
window.sbStartEditName = sbStartEditName;

function sbStartEditSection(id) {
  const topic = sv.topics.find(t => t.id === id);
  const row   = document.querySelector(`.sb-topic[data-id="${id}"]`);
  const tagEl = row?.querySelector('.sec-tag');
  if (!topic || !tagEl) return;

  const input = document.createElement('input');
  input.value = topic.section || '';
  input.placeholder = 'Section…';
  input.className = 'sb-inline-edit sec-edit';
  tagEl.replaceWith(input);
  input.focus(); input.select();

  let saved = false;
  const restore = () => {
    const span = document.createElement('span');
    span.className = 'tag sec-tag';
    span.innerHTML = topic.section ? esc(topic.section) : '<em style="opacity:.4">section</em>';
    span.onclick = () => sbStartEditSection(id); span.title = 'Click to change section';
    input.replaceWith(span);
  };
  const save = async () => {
    if (saved) return; saved = true;
    const v = input.value.trim() || null;
    if (v !== topic.section) {
      await updateTopic(id, { section: v }).catch(e => sbToast('Save failed'));
      topic.section = v;
    }
    restore();
    renderOrderCard();
  };
  input.onblur = save;
  input.onkeydown = e => {
    if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
    if (e.key === 'Escape') { saved = true; restore(); }
  };
}
window.sbStartEditSection = sbStartEditSection;

function sbRenameSection(sectionName) {
  const newName = prompt(`Rename section "${sectionName}" to:`, sectionName);
  if (!newName || newName.trim() === sectionName) return;
  const trimmed = newName.trim();
  const affected = sv.topics.filter(t => t.section === sectionName);
  Promise.all(affected.map(t => updateTopic(t.id, { section: trimmed })))
    .then(() => {
      sv.topics.forEach(t => { if (t.section === sectionName) t.section = trimmed; });
      renderTopicPanel();
      renderOrderCard();
      sbToast('Section renamed');
    })
    .catch(e => sbToast('Rename failed: ' + e.message));
}
window.sbRenameSection = sbRenameSection;

// ── topic panel render ─────────────────────────────────────────────────────
function renderTopicPanel() {
  const list = document.getElementById('sb-topic-list');
  if (!list) return;

  if (!sv.activeId) {
    list.innerHTML = '<div class="empty">Select a subject above.</div>';
    return;
  }

  const q = sv.searchQuery.toLowerCase();
  const t = sv.topics;

  if (!t.length) {
    list.innerHTML = '<div class="empty">No topics yet — add one below, or extract from a PDF syllabus.</div>';
    return;
  }

  list.innerHTML = '';
  let lastSec = null;
  let nextMarked = false;
  let visibleCount = 0;
  let gateBannerInserted = false;

  t.forEach((tp, idx) => {
    const inSearch = !q || tp.name.toLowerCase().includes(q) || (tp.section || '').toLowerCase().includes(q);
    if (!inSearch) return;

    if (sv.tier === 'free' && visibleCount === FREE_LIMIT && !gateBannerInserted) {
      const remaining = t.length - FREE_LIMIT;
      const banner = document.createElement('div');
      banner.className = 'topic-gate-banner';
      banner.innerHTML = `<span class="tgb-msg">🔒 <b>${remaining} more topic${remaining > 1 ? 's' : ''} locked.</b> Upgrade to Basic to track your full curriculum.</span>
        <button class="btn sm primary" onclick="showUpgradePrompt()">Upgrade</button>`;
      list.appendChild(banner);
      gateBannerInserted = true;
    }

    if (tp.section && tp.section !== lastSec) {
      const h = document.createElement('div');
      h.className = 'section-h';
      h.innerHTML = `<span class="sh-text" onclick="sbRenameSection('${esc(tp.section)}')" title="Click to rename section">${esc(tp.section)}</span>`;
      list.appendChild(h);
      lastSec = tp.section;
    }

    const isLocked = sv.tier === 'free' && visibleCount >= FREE_LIMIT;
    const isNext   = !nextMarked && tp.status !== 'ready' && !isLocked;
    if (isNext) nextMarked = true;

    const row = document.createElement('div');
    row.className = `topic sb-topic${tp.status === 'ready' ? ' is-ready' : ''}${isLocked ? ' topic-locked' : ''}`;
    row.dataset.id = tp.id;

    const cyc  = tp.status === 'ready' ? 'ready' : tp.status === 'learning' ? 'learning' : '';
    const mark = tp.status === 'ready' ? '✓' : tp.status === 'learning' ? '~' : '';

    row.innerHTML = `
      <div class="cyc ${cyc}" onclick="sbCycleStatus('${tp.id}')">${mark}</div>
      <span class="nm" onclick="sbStartEditName('${tp.id}')" title="Click to rename">${esc(tp.name)}</span>
      ${isNext ? '<span class="nextpill">next</span>' : ''}
      <span class="tag sec-tag" onclick="sbStartEditSection('${tp.id}')" title="Click to change section">${tp.section ? esc(tp.section) : '<em style="opacity:.4">section</em>'}</span>
      <div class="sb-row-actions">
        <button class="btn sm ghost" onclick="sbMoveTopicUp('${tp.id}')" ${idx === 0 ? 'disabled' : ''} title="Move up">↑</button>
        <button class="btn sm ghost" onclick="sbMoveTopicDown('${tp.id}')" ${idx === t.length - 1 ? 'disabled' : ''} title="Move down">↓</button>
        <button class="btn sm ghost danger" onclick="sbDeleteTopic('${tp.id}')" title="Remove">×</button>
      </div>`;
    list.appendChild(row);
    visibleCount++;
  });

  if (!list.children.length) {
    list.innerHTML = '<div class="empty">No topics match your search.</div>';
  }
}

// ── study order card ───────────────────────────────────────────────────────
function renderOrderCard() {
  const card = document.getElementById('sb-order-card');
  if (!card) return;

  if (!sv.activeId || !sv.topics.length) { card.innerHTML = ''; return; }

  const sections = [];
  const seen = new Set();
  sv.topics.forEach(t => {
    const s = t.section || 'General';
    if (!seen.has(s)) { seen.add(s); sections.push(s); }
  });

  let html = '<div class="lead">Study order</div><h2>Section sequence</h2>';
  sections.forEach((sec, i) => {
    const bucket = sv.topics.filter(t => (t.section || 'General') === sec);
    const ready    = bucket.filter(t => t.status === 'ready').length;
    const learning = bucket.filter(t => t.status === 'learning').length;
    let ind, cls;
    if (bucket.length && ready === bucket.length) { ind = '✓'; cls = 'done'; }
    else if (ready > 0 || learning > 0)           { ind = '◐'; cls = 'partial'; }
    else                                           { ind = '○'; cls = 'empty'; }
    const doneClass = bucket.length && ready === bucket.length ? ' is-done' : '';
    html += `<div class="so-item${doneClass}">
      <span class="so-num">${i + 1}.</span>
      <span class="so-ind ${cls}">${ind}</span>
      <span class="so-name">${esc(sec)}</span>
      <span class="so-count">${ready}/${bucket.length}</span>
    </div>`;
  });
  card.innerHTML = html;
}

// ── PDF extraction ─────────────────────────────────────────────────────────
function sbShowPdfModal() {
  if (!sv.activeId) { sbToast('Select a subject first'); return; }
  pdfTopics = [];
  const modal = document.getElementById('sb-pdf-modal');
  if (!modal) return;
  setPdfPhase('idle');
  const fileInput = document.getElementById('sb-pdf-file');
  if (fileInput) fileInput.value = '';
  modal.classList.remove('hidden');
}
window.sbShowPdfModal = sbShowPdfModal;

function sbClosePdfModal() {
  document.getElementById('sb-pdf-modal')?.classList.add('hidden');
  pdfTopics = [];
}
window.sbClosePdfModal = sbClosePdfModal;

function setPdfPhase(phase) {
  ['idle', 'extracting', 'preview', 'inserting'].forEach(p => {
    document.getElementById(`sb-pdf-${p}`)?.classList.toggle('hidden', p !== phase);
  });
}

async function sbHandlePdfUpload() {
  const input = document.getElementById('sb-pdf-file');
  const file  = input?.files?.[0];
  if (!file)                          { sbToast('Select a PDF first'); return; }
  if (file.type !== 'application/pdf') { sbToast('Only PDF files supported'); return; }
  if (file.size > 15 * 1024 * 1024)  { sbToast('PDF too large (max 15 MB)'); return; }

  setPdfPhase('extracting');

  try {
    const base64 = await fileToBase64(file);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not logged in');

    const resp = await fetch('/api/extract-syllabus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
      body: JSON.stringify({ pdfBase64: base64 }),
    });

    const json = await resp.json();
    if (!resp.ok) throw new Error(json.error || 'Extraction failed');

    pdfTopics = json.topics;
    renderPdfPreview();
    setPdfPhase('preview');
  } catch (err) {
    setPdfPhase('idle');
    sbToast('Extraction failed: ' + err.message);
  }
}
window.sbHandlePdfUpload = sbHandlePdfUpload;

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = e => resolve(e.target.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function renderPdfPreview() {
  const list   = document.getElementById('sb-pdf-preview-list');
  const cntEl  = document.getElementById('sb-pdf-topic-count');
  if (!list) return;
  if (cntEl) cntEl.textContent = pdfTopics.length;

  const sections = [];
  const seen = new Set();
  pdfTopics.forEach(t => { if (!seen.has(t.section)) { seen.add(t.section); sections.push(t.section); } });

  list.innerHTML = sections.map(sec => {
    const items = pdfTopics.filter(t => t.section === sec);
    return `<div class="pdf-sec-group">
      <div class="pdf-sec-header">${esc(sec)} <span style="opacity:.5;font-size:11px">(${items.length})</span></div>
      ${items.map(t => {
        const idx = pdfTopics.indexOf(t);
        return `<div class="pdf-topic-row">
          <span>${esc(t.name)}</span>
          <button class="btn sm ghost danger" onclick="sbRemovePdfTopic(${idx})" style="padding:2px 7px;flex-shrink:0">×</button>
        </div>`;
      }).join('')}
    </div>`;
  }).join('') || '<div class="empty">No topics extracted.</div>';
}

function sbRemovePdfTopic(idx) {
  pdfTopics.splice(idx, 1);
  renderPdfPreview();
}
window.sbRemovePdfTopic = sbRemovePdfTopic;

async function sbConfirmPdfImport() {
  if (!pdfTopics.length) { sbToast('No topics to import'); return; }
  setPdfPhase('inserting');
  try {
    const { data: { user } } = await supabase.auth.getUser();
    await bulkInsertTopics({
      userId: user.id, subjectId: sv.activeId,
      topics: pdfTopics,
      startPosition: sv.topics.length,
    });
    const count = pdfTopics.length;
    pdfTopics = [];
    sbClosePdfModal();
    await loadTopics();
    sbToast(`${count} topics imported from PDF`);
  } catch (err) {
    setPdfPhase('preview');
    sbToast('Import failed: ' + err.message);
  }
}
window.sbConfirmPdfImport = sbConfirmPdfImport;

// ── legacy migration ───────────────────────────────────────────────────────
const LEGACY_NAMES = {
  maths: 'Maths A (4MA1)',
  acc:   'Accounting (4AC1)',
  eco:   'Economics (4EC1)',
  bus:   'Business (4BS1)',
  eng:   'English B (4EB1)',
  ban:   'Bangla (4BN1)',
};

async function sbMigrateFromLocalStorage() {
  const btn = document.getElementById('sb-migrate-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Migrating…'; }
  try {
    const stored = localStorage.getItem('ascent_topics');
    if (!stored) { sbToast('No legacy topics found'); return; }
    const legacy = JSON.parse(stored);
    const { data: { user } } = await supabase.auth.getUser();
    let total = 0;

    for (const [key, topicArr] of Object.entries(legacy)) {
      if (!Array.isArray(topicArr) || !topicArr.length) continue;
      const subj = await createSubject({
        userId: user.id,
        name: LEGACY_NAMES[key] || key,
        shortName: key.toUpperCase(),
      });
      const mapped = topicArr.map((t, i) => ({
        section: t.section || null,
        name: t.name || String(t),
        status: t.status || 'notstarted',
        position: i,
      }));
      await bulkInsertTopics({ userId: user.id, subjectId: subj.id, topics: mapped });
      total += mapped.length;
    }

    await loadAll();
    sbToast(`${total} topics migrated from legacy tracker`);
  } catch (err) {
    sbToast('Migration failed: ' + err.message);
    if (btn) { btn.disabled = false; btn.textContent = 'Import Legacy Topics'; }
  }
}
window.sbMigrateFromLocalStorage = sbMigrateFromLocalStorage;

function sbFilterTopics() {
  sv.searchQuery = (document.getElementById('sb-search')?.value || '').toLowerCase().trim();
  renderTopicPanel();
}
window.sbFilterTopics = sbFilterTopics;

// ── helpers ────────────────────────────────────────────────────────────────
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function sbToast(msg) {
  if (typeof window.setToast === 'function') window.setToast(msg);
}
