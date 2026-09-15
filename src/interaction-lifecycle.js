import './interaction-locality.css';

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
  /*
   * Wave 4 row-count diagnostics may report observed mismatch evidence, but they
   * must not infer that the established relationship caused the mismatch. Keep
   * this correction centralized until the diagnostic source is next edited.
   */
  return html.replace(
    'Use that mismatch as evidence and recheck the established one-source-per-article relationship.',
    'Compare the result with the requirement to return every article, and inspect what in the query changed which article rows are returned.',
  );
}

function reconcileCurrentLocality(currentElement) {
  const learningPanel = currentElement.closest('.learning-panel');
  if (!learningPanel) return;

  /*
   * Stage 2 selects the connecting field in the Working Schema, but the learner
   * question/check/feedback role is equivalent to Stages 1 and 3. Keep the
   * selected schema field visible as evidence while placing the check and its
   * correction beside the Current Step instead of inside a distant panel.
   */
  if (learningPanel.dataset.stage2State === 'connection') {
    const action = document.getElementById('stage2-working-schema-action');
    if (action && !currentElement.contains(action)) currentElement.append(action);
  }
}

export function createInteractionLifecycle({ currentElement, completedElement }) {
  const openCompletedIds = new Set();

  function renderCurrent(html) {
    currentElement.innerHTML = normalizeCurrentHtml(html);
    currentElement.dataset.interactionState = 'current';
    currentElement.setAttribute('aria-current', 'step');
    reconcileCurrentLocality(currentElement);
    return currentElement;
  }

  function renderCompleted(items) {
    const currentIds = new Set(items.map((item) => String(item.id)));
    for (const id of openCompletedIds) {
      if (!currentIds.has(id)) openCompletedIds.delete(id);
    }

    completedElement.innerHTML = items.map((item) => {
      const id = String(item.id);
      return `
        <details class="completed-step" data-interaction-state="completed" data-interaction-id="${escapeAttribute(id)}" ${openCompletedIds.has(id) ? 'open' : ''}>
          <summary>${item.summaryHtml}</summary>
          <div class="completed-body">${item.reviewHtml}</div>
        </details>
      `;
    }).join('');

    completedElement.querySelectorAll('[data-interaction-id]').forEach((details) => {
      details.addEventListener('toggle', () => {
        const id = details.dataset.interactionId;
        if (details.open) openCompletedIds.add(id);
        else openCompletedIds.delete(id);
      });
    });
  }

  return { renderCurrent, renderCompleted };
}
