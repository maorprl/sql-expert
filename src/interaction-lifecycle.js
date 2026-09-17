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

function createReasoningThread({ businessQuestion = '' } = {}) {
  const facts = new Map();
  const evidence = new Map();
  let currentQuestion = null;
  let prediction = null;

  function normalizeEntry(entry) {
    return {
      id: String(entry.id),
      label: entry.label || '',
      value: entry.value,
      source: entry.source || 'learner',
    };
  }

  function record(entry) {
    const normalized = normalizeEntry(entry);
    if (entry.kind === 'prediction') prediction = normalized;
    else if (entry.kind === 'evidence') evidence.set(normalized.id, normalized);
    else facts.set(normalized.id, normalized);
    return normalized;
  }

  return {
    setBusinessQuestion(value) { businessQuestion = value; },
    setCurrentQuestion(question) { currentQuestion = question ? { ...question } : null; },
    record,
    getFact(id) { return facts.get(String(id)) || null; },
    getEvidence(id) { return evidence.get(String(id)) || null; },
    getPrediction() { return prediction; },
    snapshot() {
      return {
        businessQuestion,
        facts: [...facts.values()],
        currentQuestion: currentQuestion ? { ...currentQuestion } : null,
        evidence: [...evidence.values()],
        prediction,
      };
    },
  };
}

function createInteractionState({ initial, thread, data = {} }) {
  const state = {
    ...data,
    current: initial,
    completed: [],
    transition: null,
  };

  state.complete = ({ item, next, threadEntries = [] }) => {
    state.completed.push(item);
    threadEntries.forEach((entry) => thread?.record(entry));
    state.transition = item;
    state.current = next;
  };

  state.moveTo = (next, { keepTransition = false } = {}) => {
    state.current = next;
    if (!keepTransition) state.transition = null;
  };

  state.clearTransition = () => { state.transition = null; };
  return state;
}

export function createInteractionLifecycle({ currentElement, completedElement, historyElement = null }) {
  const openCompletedIds = new Set();

  function renderCurrent(html) {
    currentElement.innerHTML = normalizeCurrentHtml(html);
    currentElement.dataset.interactionState = 'current';
    currentElement.setAttribute('aria-current', 'step');
    requestAnimationFrame(() => currentElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
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

    if (historyElement) {
      historyElement.innerHTML = items.map((item) => item.historyHtml || '').join('');
      historyElement.toggleAttribute('hidden', items.every((item) => !item.historyHtml));
    }

    completedElement.querySelectorAll('[data-interaction-id]').forEach((details) => {
      details.addEventListener('toggle', () => {
        const id = details.dataset.interactionId;
        if (details.open) openCompletedIds.add(id);
        else openCompletedIds.delete(id);
      });
    });
  }

  return {
    renderCurrent,
    renderCompleted,
    createReasoningThread,
    createInteractionState,
  };
}
