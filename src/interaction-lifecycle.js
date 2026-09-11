function escapeAttribute(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  }[character]));
}

export function createInteractionLifecycle({ currentElement, completedElement }) {
  const openCompletedIds = new Set();

  function renderCurrent(content) {
    if (typeof content === 'string') {
      currentElement.innerHTML = content;
    } else {
      const { establishedHtml = '', bridgeHtml = '', contentHtml = '' } = content;
      const guidanceHtml = establishedHtml || bridgeHtml
        ? `<div class="interaction-guidance">
            ${establishedHtml ? `<div class="guidance-established">${establishedHtml}</div>` : ''}
            ${bridgeHtml ? `<div class="guidance-bridge">${bridgeHtml}</div>` : ''}
          </div>`
        : '';
      currentElement.innerHTML = `${guidanceHtml}${contentHtml}`;
    }
    currentElement.dataset.interactionState = 'current';
    currentElement.setAttribute('aria-current', 'step');
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
