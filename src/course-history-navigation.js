import './course-history-navigation.css';

const histories = new Map();
let observer;
let backButton;
let forwardButton;
let statusText;
let reviewSurface;
let stageScroll;
let learningPanel;

function activeEncounterName() {
  return document.querySelector('[data-chapter][aria-current="step"]')?.dataset.chapter || 'media-coverage';
}

function progressionPhase(currentStep) {
  const acknowledged = Boolean(currentStep?.querySelector('.confirmed-answer'));
  const currentAdvance = currentStep?.querySelector('button[id^="continue-"], button[id^="complete-"]')?.id || '';
  const workspaceAdvance = document.querySelector('#workspace-evidence-action button[id^="continue-"], #workspace-evidence-action button[id^="complete-"]')?.id || '';
  const relationAdvance = document.querySelector('#relation-preview button[id^="continue-"], #relation-preview button[id^="complete-"]')?.id || '';
  const teachingProgress = currentStep?.querySelector('.join-progress span')?.textContent?.trim() || '';
  return [acknowledged ? 'acknowledged' : 'active', currentAdvance, workspaceAdvance, relationAdvance, teachingProgress]
    .filter(Boolean)
    .join('|');
}

function activeStateKey() {
  if (!learningPanel) return '';
  const coarseState = learningPanel.dataset.stage1State
    || learningPanel.dataset.stage2State
    || learningPanel.dataset.stage3State
    || '';
  if (!coarseState) return '';
  const currentStep = document.getElementById('current-step');
  const prompt = currentStep?.querySelector('.prompt')?.textContent?.trim()
    || currentStep?.querySelector('h2')?.textContent?.trim()
    || '';
  return `${coarseState}::${prompt}::${progressionPhase(currentStep)}`;
}

function historyFor(name) {
  if (!histories.has(name)) histories.set(name, { entries: [], cursor: -1 });
  return histories.get(name);
}

function sanitizeClone(element) {
  if (!element) return '';
  const clone = element.cloneNode(true);
  const originalInputs = [...element.querySelectorAll('input')];
  const clonedInputs = [...clone.querySelectorAll('input')];
  clonedInputs.forEach((input, index) => {
    if (originalInputs[index]?.checked) input.setAttribute('checked', '');
    else input.removeAttribute('checked');
  });
  const originalDetails = [...element.querySelectorAll('details')];
  const clonedDetails = [...clone.querySelectorAll('details')];
  clonedDetails.forEach((details, index) => {
    if (originalDetails[index]?.open) details.setAttribute('open', '');
    else details.removeAttribute('open');
  });
  clone.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
  clone.querySelectorAll('[aria-live]').forEach((node) => node.removeAttribute('aria-live'));
  clone.querySelectorAll('button, input, select, textarea').forEach((control) => {
    control.disabled = true;
    control.setAttribute('aria-disabled', 'true');
    control.setAttribute('tabindex', '-1');
  });
  clone.querySelectorAll('[contenteditable]').forEach((node) => node.setAttribute('contenteditable', 'false'));
  clone.querySelectorAll('a[href]').forEach((link) => {
    link.removeAttribute('href');
    link.setAttribute('tabindex', '-1');
  });
  return clone.innerHTML;
}

function renderedEditorText() {
  const lines = [...document.querySelectorAll('#editor .ace_text-layer .ace_line')]
    .map((line) => line.textContent || '');
  return lines.join('\n').trim();
}

function captureSnapshot(key) {
  const lab = document.getElementById('lab-workspace');
  const currentStep = document.getElementById('current-step');
  const relationPreview = document.getElementById('relation-preview');
  const completedSteps = document.getElementById('completed-steps');
  const workspaceAction = document.getElementById('workspace-evidence-action');
  const diagnostic = document.getElementById('sql-diagnostic');
  const resultContent = document.getElementById('result-content');
  const prompt = currentStep?.querySelector('.prompt')?.textContent?.trim()
    || currentStep?.querySelector('h2')?.textContent?.trim()
    || 'Visited step';

  return {
    key,
    prompt,
    businessRequest: document.getElementById('business-request-title')?.textContent?.trim() || '',
    currentHtml: sanitizeClone(currentStep),
    completedHtml: sanitizeClone(completedSteps),
    relationHtml: sanitizeClone(relationPreview),
    workspaceActionHtml: sanitizeClone(workspaceAction),
    diagnosticHtml: diagnostic && !diagnostic.hidden ? sanitizeClone(diagnostic) : '',
    labVisible: Boolean(lab && !lab.hidden),
    workspaceTitle: document.querySelector('.editor-header h2')?.textContent?.trim() || 'SQL Workspace',
    editorText: renderedEditorText(),
    resultMeta: document.getElementById('result-meta')?.textContent?.trim() || '',
    resultHtml: sanitizeClone(resultContent),
  };
}

function isReviewing(history) {
  return history.cursor >= 0 && history.cursor < history.entries.length - 1;
}

function captureFrontier() {
  if (!learningPanel || !stageScroll || stageScroll.hidden) return;
  const name = activeEncounterName();
  const key = activeStateKey();
  if (!key) return;
  const history = historyFor(name);
  if (isReviewing(history)) return;

  const snapshot = captureSnapshot(key);
  const lastIndex = history.entries.length - 1;
  if (lastIndex >= 0 && history.entries[lastIndex].key === key) {
    history.entries[lastIndex] = snapshot;
  } else {
    history.entries.push(snapshot);
  }
  history.cursor = history.entries.length - 1;
  showFrontier();
  updateControls();
}

function reviewSection(title, html, className = '') {
  if (!html) return '';
  return `<section class="journey-review-card ${className}"><span class="journey-review-label">${title}</span>${html}</section>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  }[character]));
}

function renderReview(snapshot) {
  if (!snapshot || !reviewSurface || !stageScroll) return;
  stageScroll.hidden = true;
  reviewSurface.hidden = false;

  const sqlBlock = snapshot.labVisible ? `
    <section class="journey-review-card journey-review-workspace">
      <span class="journey-review-label">${escapeHtml(snapshot.workspaceTitle)}</span>
      ${snapshot.editorText ? `<pre class="journey-review-sql"><code>${escapeHtml(snapshot.editorText)}</code></pre>` : ''}
      ${snapshot.resultHtml ? `<div class="journey-review-results"><div class="journey-review-result-meta">${escapeHtml(snapshot.resultMeta)}</div>${snapshot.resultHtml}</div>` : ''}
      ${snapshot.diagnosticHtml ? `<div class="journey-review-diagnostic">${snapshot.diagnosticHtml}</div>` : ''}
    </section>` : '';

  reviewSurface.innerHTML = `
    <header class="journey-review-header">
      <div><span class="eyebrow">Review mode</span><h2>${escapeHtml(snapshot.prompt)}</h2></div>
      <p>This is a previously visited state. Back / Forward review does not change your answers, evidence, or current progression.</p>
    </header>
    ${snapshot.businessRequest ? `<section class="journey-review-business"><span class="journey-review-label">Business request</span><p>${escapeHtml(snapshot.businessRequest)}</p></section>` : ''}
    <div class="journey-review-grid">
      <div class="journey-review-reasoning">
        ${reviewSection('Visited learner state', snapshot.currentHtml, 'journey-review-current')}
        ${reviewSection('Completed reasoning at that point', snapshot.completedHtml, 'journey-review-completed')}
      </div>
      <div class="journey-review-evidence">
        ${reviewSection('Working Schema at that point', snapshot.relationHtml, 'journey-review-schema')}
        ${reviewSection('Evidence / local follow-up', snapshot.workspaceActionHtml, 'journey-review-action')}
        ${sqlBlock}
      </div>
    </div>`;
}

function showFrontier() {
  if (!reviewSurface || !stageScroll) return;
  if (!reviewSurface.hidden) reviewSurface.hidden = true;
  if (reviewSurface.childNodes.length) reviewSurface.replaceChildren();
  if (stageScroll.hidden) stageScroll.hidden = false;
}

function updateControls() {
  const history = historyFor(activeEncounterName());
  const hasCurrent = history.cursor >= 0;
  backButton.disabled = !hasCurrent || history.cursor <= 0;
  forwardButton.disabled = !hasCurrent || history.cursor >= history.entries.length - 1;
  statusText.textContent = isReviewing(history) ? 'Reviewing an earlier visited state' : 'Current position';
}

function syncActiveView() {
  const history = historyFor(activeEncounterName());
  if (!history.entries.length) {
    captureFrontier();
    return;
  }
  if (isReviewing(history)) renderReview(history.entries[history.cursor]);
  else showFrontier();
  updateControls();
}

function goBack() {
  const history = historyFor(activeEncounterName());
  if (history.cursor <= 0) return;
  history.cursor -= 1;
  renderReview(history.entries[history.cursor]);
  updateControls();
}

function goForward() {
  const history = historyFor(activeEncounterName());
  if (history.cursor < 0 || history.cursor >= history.entries.length - 1) return;
  history.cursor += 1;
  if (history.cursor === history.entries.length - 1) showFrontier();
  else renderReview(history.entries[history.cursor]);
  updateControls();
}

function ensureShell() {
  const nav = document.createElement('nav');
  nav.id = 'course-journey-nav';
  nav.className = 'course-journey-nav';
  nav.setAttribute('aria-label', 'Journey history');
  nav.innerHTML = `
    <span class="course-journey-nav-label">Journey</span>
    <div class="course-journey-controls">
      <button id="journey-back" type="button" disabled>Back</button>
      <button id="journey-forward" type="button" disabled>Forward</button>
    </div>
    <span id="journey-history-status" class="course-journey-status" aria-live="polite">Current position</span>`;

  const chapterNav = document.getElementById('course-chapter-nav');
  if (chapterNav) chapterNav.insertAdjacentElement('afterend', nav);
  else document.querySelector('.topbar')?.insertAdjacentElement('afterend', nav);

  backButton = nav.querySelector('#journey-back');
  forwardButton = nav.querySelector('#journey-forward');
  statusText = nav.querySelector('#journey-history-status');
  backButton.addEventListener('click', goBack);
  forwardButton.addEventListener('click', goForward);
}

function ensureReviewSurface() {
  reviewSurface = document.createElement('section');
  reviewSurface.id = 'journey-review-surface';
  reviewSurface.className = 'journey-review-surface';
  reviewSurface.hidden = true;
  learningPanel.insertBefore(reviewSurface, stageScroll);
}

function observeLearnerJourney() {
  observer = new MutationObserver((mutations) => {
    const history = historyFor(activeEncounterName());
    if (isReviewing(history)) return;
    const hasLearnerMutation = mutations.some((mutation) => (
      mutation.target !== reviewSurface && !reviewSurface?.contains(mutation.target)
    ));
    if (!hasLearnerMutation) return;
    queueMicrotask(captureFrontier);
  });
  observer.observe(learningPanel, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['class', 'hidden', 'data-stage1-state', 'data-stage2-state', 'data-stage3-state'],
  });
}

function initHistoryNavigation() {
  learningPanel = document.querySelector('.learning-panel');
  stageScroll = document.getElementById('stage-scroll');
  if (!learningPanel || !stageScroll || document.getElementById('course-journey-nav')) return;

  ensureShell();
  ensureReviewSurface();
  captureFrontier();
  observeLearnerJourney();

  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-chapter]')) return;
    queueMicrotask(syncActiveView);
  });
}

if (document.readyState === 'complete') initHistoryNavigation();
else window.addEventListener('load', initHistoryNavigation, { once: true });
