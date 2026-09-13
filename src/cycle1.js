import { createCycle1 as createCycle1Core } from './cycle1-core.js';
import './cycle1-entry.css';

const REQUIRED_RELATIONS = ['funding_round', 'round_investment'];
const SETUP_LABELS = {
  relations: 'Identify relevant relations',
  connection: 'Identify the relationship',
};

export function createCycle1({ editor, getDatabase, getSchema, onSelectionChange, interactionLifecycle }) {
  const state = {
    phase: 'relations',
    selectedRelations: [],
    selectedColumn: '',
    localFeedback: '',
    setupCompleted: [],
  };

  let core = null;
  let copyObserver = null;

  const relationEl = document.getElementById('relation-preview');
  const workingStatusEl = document.getElementById('working-schema-status');
  const labEl = document.getElementById('lab-workspace');
  const learningEl = document.querySelector('.learning-panel');

  function escapeHtml(value) {
    return String(value).replace(/[&<>'\"]/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '\"': '&quot;',
    }[character]));
  }

  function relationByName(name) {
    return getSchema().find((relation) => relation.name === name);
  }

  function setupLifecycle() {
    return {
      renderCurrent: interactionLifecycle.renderCurrent,
      renderCompleted(items) {
        interactionLifecycle.renderCompleted([
          ...state.setupCompleted.map((item) => ({
            id: `setup-${item.id}`,
            summaryHtml: `<span class="complete-mark">✓</span><span>${escapeHtml(item.label)}</span><span class="completed-answer">${escapeHtml(item.answer)}</span>`,
            reviewHtml: `<p class="review-question"><strong>${escapeHtml(item.prompt)}</strong></p><p><strong>Your answer:</strong> ${escapeHtml(item.answer)}</p>`,
          })),
          ...items,
        ]);
      },
    };
  }

  function renderSetupCompleted() {
    setupLifecycle().renderCompleted([]);
  }

  function teacherVoice(content) {
    return `<aside class="teacher-voice"><span class="teacher-voice-label">Guidance</span><p>${content}</p></aside>`;
  }

  function feedbackMarkup() {
    return state.localFeedback
      ? `<div class="local-feedback incorrect" role="alert"><strong>Not quite.</strong> ${escapeHtml(state.localFeedback)}</div>`
      : '';
  }

  function renderSelectedRelation(name) {
    const relation = relationByName(name);
    if (!relation) return '';
    const selectingConnection = state.phase === 'connection' && name === 'round_investment';

    return `
      <article class="data-card cycle1-setup-card" data-relation="${escapeHtml(name)}">
        <div class="data-card-title">
          <code>${escapeHtml(name)}</code>
          ${state.phase === 'relations' ? `<button type="button" class="remove-relation" data-remove-relation="${escapeHtml(name)}">Remove</button>` : ''}
        </div>
        <ul class="working-columns">
          ${relation.columns.map((column) => {
            const selected = selectingConnection && state.selectedColumn === column.column;
            const content = `<code>${escapeHtml(column.column)}</code>`;
            if (selectingConnection) {
              return `<li><button type="button" class="working-column ${selected ? 'selected-column' : ''}" data-connection-column="${escapeHtml(column.column)}">${content}</button></li>`;
            }
            return `<li class="working-column">${content}</li>`;
          }).join('')}
        </ul>
      </article>`;
  }

  function renderWorkingSchema() {
    relationEl.className = 'relation-preview cycle1-setup-relation-preview';
    workingStatusEl.hidden = false;
    workingStatusEl.textContent = state.phase === 'relations'
      ? 'Build it from the live schema'
      : 'Use the selected relations to identify the connecting field';

    if (!state.selectedRelations.length) {
      relationEl.innerHTML = '<div class="working-empty">Choose relevant relations from the live schema.</div>';
      return;
    }

    relationEl.innerHTML = state.selectedRelations.map(renderSelectedRelation).join('');
    relationEl.querySelectorAll('[data-remove-relation]').forEach((button) => {
      button.addEventListener('click', () => removeRelation(button.dataset.removeRelation));
    });
    relationEl.querySelectorAll('[data-connection-column]').forEach((button) => {
      button.addEventListener('click', () => {
        state.selectedColumn = button.dataset.connectionColumn;
        state.localFeedback = '';
        render();
      });
    });
  }

  function exactRequiredRelationsSelected() {
    return state.selectedRelations.length === REQUIRED_RELATIONS.length
      && REQUIRED_RELATIONS.every((name) => state.selectedRelations.includes(name));
  }

  function addRelation(name) {
    if (state.phase !== 'relations' || state.selectedRelations.includes(name)) return;
    if (state.selectedRelations.length >= 4) {
      state.localFeedback = 'The Working Schema can contain up to four relations. Remove one before adding another.';
      render();
      return;
    }
    state.selectedRelations.push(name);
    state.localFeedback = '';
    render();
    onSelectionChange();
  }

  function removeRelation(name) {
    if (state.phase !== 'relations') return;
    state.selectedRelations = state.selectedRelations.filter((item) => item !== name);
    state.localFeedback = '';
    render();
    onSelectionChange();
  }

  function recordSetup(id, prompt, answer) {
    state.setupCompleted.push({ id, label: SETUP_LABELS[id], prompt, answer });
  }

  function renderRelationsStep() {
    interactionLifecycle.renderCurrent(`
      <div class="step-kicker">${SETUP_LABELS.relations}</div>
      ${teacherVoice('Start from the information the audit needs. Add the relations that contain the round context and the recorded participation details.')}
      <h2 class="prompt">Which relations contain the information needed for this audit?</h2>
      <p class="step-copy">Add the relevant relations from the Live Schema to the Working Schema.</p>
      <button id="cycle1-check-relations" class="primary" type="button" ${state.selectedRelations.length ? '' : 'disabled'}>Check selection</button>
      ${feedbackMarkup()}
    `);

    document.getElementById('cycle1-check-relations').addEventListener('click', () => {
      if (!exactRequiredRelationsSelected()) {
        state.localFeedback = 'Look for one relation that carries funding-round context and one that stores each recorded investor participation.';
        render();
        return;
      }
      recordSetup(
        'relations',
        'Which relations contain the information needed for this audit?',
        'funding_round and round_investment',
      );
      state.phase = 'connection';
      state.localFeedback = '';
      render();
      onSelectionChange();
    });
  }

  function renderConnectionStep() {
    interactionLifecycle.renderCurrent(`
      <div class="step-kicker">${SETUP_LABELS.connection}</div>
      ${teacherVoice('Use the participation relation to find the field that tells you which funding round each participation belongs to.')}
      <h2 class="prompt">Which column in <code>round_investment</code> connects each participation to its funding round?</h2>
      <p class="step-copy">Select the column directly in the Working Schema.</p>
      <button id="cycle1-check-connection" class="primary" type="button" ${state.selectedColumn ? '' : 'disabled'}>Check selected column</button>
      ${feedbackMarkup()}
    `);

    document.getElementById('cycle1-check-connection').addEventListener('click', () => {
      if (state.selectedColumn !== 'funding_round_id') {
        state.localFeedback = 'Look for the participation field whose value identifies the funding round that participation belongs to.';
        render();
        return;
      }
      recordSetup(
        'connection',
        'Which column in round_investment connects each participation to its funding round?',
        'round_investment.funding_round_id',
      );
      state.phase = 'core';
      state.localFeedback = '';
      startCoreEncounter();
      onSelectionChange();
    });
  }

  function improveCoreLearnerCopy() {
    if (state.phase !== 'core') return;
    const currentStep = document.getElementById('current-step');
    const prompt = currentStep?.querySelector('.prompt')?.textContent?.trim();
    if (prompt === 'Which statement matches the relationship?') {
      const guidance = currentStep.querySelector('.teacher-voice p');
      const desired = 'You found how a participation connects to a funding round. Now consider what that relationship allows in each direction.';
      if (guidance && guidance.textContent !== desired) guidance.textContent = desired;
    }
  }

  function observeCoreCopy() {
    copyObserver?.disconnect();
    const currentStep = document.getElementById('current-step');
    if (!currentStep) return;
    copyObserver = new MutationObserver(() => improveCoreLearnerCopy());
    copyObserver.observe(currentStep, { childList: true, subtree: true });
    improveCoreLearnerCopy();
  }

  function startCoreEncounter() {
    if (!core) {
      core = createCycle1Core({
        editor,
        getDatabase,
        getSchema,
        onSelectionChange,
        interactionLifecycle: setupLifecycle(),
      });
    }
    observeCoreCopy();
    core.refresh?.();
  }

  function render() {
    if (state.phase === 'core') {
      startCoreEncounter();
      return;
    }

    labEl.hidden = true;
    learningEl.classList.remove('cycle1-sql-active', 'cycle1-results-active', 'cycle1-verification-active');
    document.getElementById('workspace-evidence-action')?.remove();
    renderWorkingSchema();
    renderSetupCompleted();

    if (state.phase === 'relations') renderRelationsStep();
    else renderConnectionStep();
  }

  function relationshipLevel() {
    if (state.phase === 'core') return core?.relationshipLevel?.() ?? 1;
    return 0;
  }

  function isRelationSelected(name) {
    if (state.phase === 'core') return core?.isRelationSelected?.(name) ?? REQUIRED_RELATIONS.includes(name);
    return state.selectedRelations.includes(name);
  }

  function canAddRelations() {
    if (state.phase === 'core') return core?.canAddRelations?.() ?? false;
    return state.phase === 'relations';
  }

  function canRunSql() {
    if (state.phase !== 'core') return false;
    return core?.canRunSql?.() ?? false;
  }

  function handleSqlSuccess(statement, resultSets) {
    if (state.phase !== 'core') return;
    core?.handleSqlSuccess?.(statement, resultSets);
  }

  function refresh() {
    if (state.phase === 'core') {
      startCoreEncounter();
      improveCoreLearnerCopy();
    } else {
      render();
    }
  }

  render();

  return {
    addRelation,
    canAddRelations,
    canRunSql,
    handleSqlSuccess,
    isRelationSelected,
    relationshipLevel,
    refresh,
  };
}
