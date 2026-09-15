function escapeAttribute(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  }[character]));
}

function normalizeCurrentHtml(html) {
  return html.replace(
    'Use that mismatch as evidence and recheck the established one-source-per-article relationship.',
    'Compare the result with the requirement to return every article, and inspect what in the query changed which article rows are returned.',
  );
}

export function createInteractionLifecycle({ currentElement, completedElement }) {
  const openCompletedIds = new Set();
  let completedHistoryOpen = false;
  let completedItems = [];
  let reviewIndex = null;

  const learningPanel = currentElement.closest('.learning-panel');
  const implementationColumn = document.querySelector('.implementation-column');
  const schemaPanel = document.querySelector('.schema-panel');
  let reviewPanel = null;

  function ensureJourneyNavigation() {
    const courseNav = document.getElementById('course-chapter-nav');
    if (!courseNav || document.getElementById('journey-history-nav')) return;
    const nav = document.createElement('div');
    nav.id = 'journey-history-nav';
    nav.className = 'journey-history-nav';
    nav.setAttribute('aria-label', 'Journey history');
    nav.innerHTML = `
      <button id="journey-back" class="journey-nav-button" type="button" disabled aria-label="Review previous completed step">← Back</button>
      <button id="journey-forward" class="journey-nav-button" type="button" disabled aria-label="Move forward through reviewed history">Forward →</button>
    `;
    courseNav.append(nav);
    nav.querySelector('#journey-back').addEventListener('click', goBack);
    nav.querySelector('#journey-forward').addEventListener('click', goForward);
  }

  function ensureReviewPanel() {
    if (reviewPanel?.isConnected) return reviewPanel;
    reviewPanel = document.createElement('section');
    reviewPanel.id = 'journey-review-panel';
    reviewPanel.className = 'current-step journey-review-panel';
    reviewPanel.hidden = true;
    currentElement.insertAdjacentElement('afterend', reviewPanel);
    return reviewPanel;
  }

  function setReviewMode(active) {
    const panel = ensureReviewPanel();
    learningPanel?.classList.toggle('journey-review-active', active);
    currentElement.hidden = active;
    panel.hidden = !active;
    if (implementationColumn) implementationColumn.inert = active;
    if (schemaPanel) schemaPanel.inert = active;
  }

  function updateNavigation() {
    const backButton = document.getElementById('journey-back');
    const forwardButton = document.getElementById('journey-forward');
    if (!backButton || !forwardButton) return;

    if (reviewIndex === null) {
      backButton.disabled = completedItems.length === 0;
      forwardButton.disabled = true;
      return;
    }

    backButton.disabled = reviewIndex <= 0;
    forwardButton.disabled = false;
  }

  function renderFrontier() {
    reviewIndex = null;
    setReviewMode(false);
    updateNavigation();
  }

  function renderReview() {
    const item = completedItems[reviewIndex];
    if (!item) return renderFrontier();
    const panel = ensureReviewPanel();
    panel.innerHTML = `
      <div class="journey-review-heading">
        <span class="step-kicker">Review</span>
        <span class="journey-review-position">Completed step ${reviewIndex + 1} of ${completedItems.length}</span>
      </div>
      <div class="journey-review-content">${item.reviewHtml}</div>
    `;
    setReviewMode(true);
    updateNavigation();
  }

  function goBack() {
    if (!completedItems.length) return;
    if (reviewIndex === null) reviewIndex = completedItems.length - 1;
    else if (reviewIndex > 0) reviewIndex -= 1;
    else return;
    renderReview();
  }

  function goForward() {
    if (reviewIndex === null) return;
    if (reviewIndex < completedItems.length - 1) {
      reviewIndex += 1;
      renderReview();
      return;
    }
    renderFrontier();
  }

  function renderCurrent(html) {
    reviewIndex = null;
    setReviewMode(false);
    currentElement.innerHTML = normalizeCurrentHtml(html);
    currentElement.dataset.interactionState = 'current';
    currentElement.setAttribute('aria-current', 'step');
    updateNavigation();
    return currentElement;
  }

  function renderCompleted(items) {
    completedItems = items;
    const currentIds = new Set(items.map((item) => String(item.id)));
    for (const id of openCompletedIds) {
      if (!currentIds.has(id)) openCompletedIds.delete(id);
    }

    if (!items.length) {
      completedElement.innerHTML = '';
      reviewIndex = null;
      setReviewMode(false);
      updateNavigation();
      return;
    }

    completedElement.innerHTML = `
      <details class="completed-history" ${completedHistoryOpen ? 'open' : ''}>
        <summary>
          <span>Completed Steps</span>
          <span class="completed-history-count">${items.length}</span>
        </summary>
        <div class="completed-history-body">
          ${items.map((item) => {
            const id = String(item.id);
            return `
              <details class="completed-step" data-interaction-state="completed" data-interaction-id="${escapeAttribute(id)}" ${openCompletedIds.has(id) ? 'open' : ''}>
                <summary>${item.summaryHtml}</summary>
                <div class="completed-body">${item.reviewHtml}</div>
              </details>
            `;
          }).join('')}
        </div>
      </details>
    `;

    const history = completedElement.querySelector('.completed-history');
    history?.addEventListener('toggle', () => { completedHistoryOpen = history.open; });

    completedElement.querySelectorAll('[data-interaction-id]').forEach((details) => {
      details.addEventListener('toggle', () => {
        const id = details.dataset.interactionId;
        if (details.open) openCompletedIds.add(id);
        else openCompletedIds.delete(id);
      });
    });

    if (reviewIndex !== null && reviewIndex >= completedItems.length) reviewIndex = completedItems.length - 1;
    if (reviewIndex !== null) renderReview();
    else updateNavigation();
  }

  ensureJourneyNavigation();
  ensureReviewPanel();
  updateNavigation();

  return { renderCurrent, renderCompleted, goBack, goForward };
}
