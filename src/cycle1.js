import './stage1.css';
import './cycle1.css';

const REQUIRED_RELATIONS = ['funding_round', 'round_investment'];
const LABELS = {
  relations: 'Identify relevant relations',
  connection: 'Trace the participation to its round',
  grain: 'Set the result Grain',
  cardinality: 'Read the relationship',
  prediction: 'Predict the result shape',
  concept: 'Name the behavior',
  application: 'Apply the prediction',
  sql: 'Implement the audit',
  result: 'Inspect the result',
  verification: 'Verify the prediction',
  complete: 'Participation audit complete',
};

const ASSISTANCE_STRENGTH = {
  unassisted: 0,
  'hint-1': 1,
  'hint-2': 2,
  'solution-assisted': 3,
};

const PREDICTION_STEPS = [
  {
    id: 'shape',
    prompt: 'If the same funding round has several recorded participations, what must happen in a result with one participation per row?',
    options: [
      ['multiple', 'That funding round can appear across several result rows — one for each recorded participation.'],
      ['single', 'That funding round must still appear in exactly one result row.'],
      ['collapse', 'The participation records must be merged into one funding-round row.'],
      ['grain-change', 'The result Grain changes from participation to funding round.'],
    ],
    correct: 'multiple',
    answer: 'One funding round can occupy several result rows when several participations must each remain represented.',
    wrong: 'Keep one participation per result row fixed. Can several different participation records all remain represented in one row?',
  },
  {
    id: 'repetition',
    prompt: 'Across those participation rows, what should happen to round-level values such as round_type and announced_date?',
    options: [
      ['repeat', 'They can repeat while participation identifiers differ. The rows are still distinct participation records.'],
      ['duplicate', 'Repeated round-level values mean the rows are accidental duplicates and should collapse to one.'],
      ['first-only', 'Round-level values should appear only on the first participation row.'],
      ['different-rounds', 'If round-level values repeat, the rows must represent different funding rounds.'],
    ],
    correct: 'repeat',
    answer: 'Round-level context can repeat across distinct participation rows without making those rows duplicates.',
    wrong: 'Compare what the rows represent. If each row is a different participation for the same round, which values can stay shared while participation identity changes?',
  },
];

export function createCycle1({ editor, getDatabase, getSchema, onSelectionChange, interactionLifecycle }) {
  const state = {
    current: 'relations',
    completed: [],
    evidence: new Set(),
    drafts: {},
    localFeedback: '',
    pendingAdvance: null,
    selectedRelations: [],
    selectedColumn: '',
    predictionIndex: 0,
    predictionAnswers: [],
    predictionWrongAttempts: 0,
    predictionHintsOpened: new Set(),
    predictionAssistance: 'unassisted',
    grainAssistance: 'unassisted',
    cardinalityAssistance: 'unassisted',
    applicationAssistance: 'unassisted',
    sqlAssistance: 'unassisted',
    verificationAssistance: 'unassisted',
    sqlPrepared: false,
    lastResultSet: null,
  };

  const relationEl = document.getElementById('relation-preview');
  const workingStatusEl = document.getElementById('working-schema-status');
  const labEl = document.getElementById('lab-workspace');
  const learningEl = document.querySelector('.learning-panel');
  const workingEyebrowEl = document.querySelector('.working-schema-header .eyebrow');
  const runButton = document.getElementById('run-query');
  const clearButton = document.getElementById('clear-results');
  const solutionButton = document.getElementById('show-solution');
  const solutionPanel = document.getElementById('solution-panel');

  function escapeHtml(value) {
    return String(value).replace(/[&<>'\"]/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '\"': '&quot;',
    }[character]));
  }

  function stripMarkup(value) {
    const element = document.createElement('div');
    element.innerHTML = value;
    return element.textContent || '';
  }

  function teacherVoice(content) {
    return `<aside class="teacher-voice"><span class="teacher-voice-label">Guidance</span><p>${content}</p></aside>`;
  }

  function stateMarker(name = state.current) {
    return `<span class="cycle1-state-marker" data-cycle1-state="${escapeHtml(name)}" aria-hidden="true"></span>`;
  }

  function stepShell(prompt, body, intro = '', name = state.current) {
    return `${stateMarker(name)}<div class="step-kicker">${escapeHtml(LABELS[name] || '')}</div>${intro}<h2 class="prompt">${prompt}</h2>${body}`;
  }

  function feedbackMarkup() {
    return state.localFeedback
      ? `<div class="local-feedback incorrect" role="alert"><strong>Not quite.</strong> ${escapeHtml(state.localFeedback)}</div>`
      : '';
  }

  function choiceForm(id, options, draft = '') {
    return `<form id="${id}" class="answer-form"><fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${escapeHtml(value)}" ${draft === value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset><button class="primary" type="submit">Check answer</button></form>`;
  }

  function assistanceLabel(value) {
    return ({
      unassisted: 'Unassisted',
      'hint-1': 'After Hint 1',
      'hint-2': 'After Hint 2',
      'solution-assisted': 'Solution-assisted',
    })[value] || value;
  }

  function raiseAssistance(key, next) {
    if (ASSISTANCE_STRENGTH[next] > ASSISTANCE_STRENGTH[state[key]]) state[key] = next;
  }

  function relationByName(name) {
    return getSchema().find((relation) => relation.name === name);
  }

  function relationshipLevel() {
    if (state.evidence.has('cardinality')) return 2;
    if (state.evidence.has('connection')) return 1;
    return 0;
  }

  function hasExactRequiredRelations() {
    return state.selectedRelations.length === REQUIRED_RELATIONS.length
      && REQUIRED_RELATIONS.every((name) => state.selectedRelations.includes(name));
  }

  function isRelationSelected(name) {
    return state.selectedRelations.includes(name);
  }

  function canAddRelations() {
    return state.current === 'relations' && !state.pendingAdvance;
  }

  function addRelation(name) {
    if (!canAddRelations() || state.selectedRelations.includes(name)) return;
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
    if (!canAddRelations()) return;
    state.selectedRelations = state.selectedRelations.filter((item) => item !== name);
    state.localFeedback = '';
    render();
    onSelectionChange();
  }

  function orderedRelations() {
    if (state.current === 'relations') return state.selectedRelations;
    if (!hasExactRequiredRelations()) return state.selectedRelations;
    return ['round_investment', 'funding_round'];
  }

  function renderColumn(relation, column) {
    const relationship = relationshipLevel();
    const connectionChoice = state.current === 'connection' && !state.pendingAdvance && relation.name === 'round_investment';
    const selected = connectionChoice && state.selectedColumn === column.column;
    const isParticipationFk = relationship > 0 && relation.name === 'round_investment' && column.column === 'funding_round_id';
    const isRoundPk = relationship > 0 && relation.name === 'funding_round' && column.column === 'funding_round_id';
    const outputField = ['sql', 'result', 'verification', 'complete'].includes(state.current)
      && ((relation.name === 'funding_round' && ['funding_round_id', 'round_type', 'announced_date'].includes(column.column))
        || (relation.name === 'round_investment' && ['round_investment_id', 'investor_id', 'is_lead'].includes(column.column)));
    const classes = [selected ? 'selected-column' : '', (isParticipationFk || isRoundPk) ? 'relationship-column' : '', outputField ? 'output-column' : ''].filter(Boolean).join(' ');
    const badge = isParticipationFk ? '<span class="key-badge">FK</span>' : isRoundPk ? '<span class="key-badge">PK</span>' : '';
    const content = `<code>${escapeHtml(column.column)}</code>${badge}`;
    return connectionChoice
      ? `<li><button type="button" class="working-column ${classes}" data-connection-column="${escapeHtml(column.column)}">${content}</button></li>`
      : `<li class="working-column ${classes}">${content}</li>`;
  }

  function renderSchemaCard(name) {
    const relation = relationByName(name);
    if (!relation) return '';
    const connectionTarget = state.current === 'connection' && !state.pendingAdvance && name === 'round_investment';
    const connectionReference = state.current === 'connection' && !state.pendingAdvance && name === 'funding_round';
    const role = name === 'round_investment' ? 'participation records' : 'round context';
    return `
      <article class="data-card ${connectionTarget ? 'cycle1-connection-target' : ''} ${connectionReference ? 'cycle1-connection-reference' : ''}" data-relation="${escapeHtml(name)}">
        <div class="data-card-title">
          <div class="cycle1-card-heading"><code>${escapeHtml(name)}</code>${state.current === 'connection' ? `<span>${escapeHtml(role)}</span>` : ''}</div>
          ${state.current === 'relations' && !state.pendingAdvance ? `<button type="button" class="remove-relation" data-remove-relation="${escapeHtml(name)}">Remove</button>` : ''}
        </div>
        <ul class="working-columns">${relation.columns.map((column) => renderColumn(relation, column)).join('')}</ul>
      </article>`;
  }

  function workingSchemaCopy() {
    if (state.current === 'relations' && !state.pendingAdvance) return ['Reasoning surface', 'Build it from the Live Schema'];
    if (state.current === 'connection' && !state.pendingAdvance) return ['Current action', 'Select the field in round_investment'];
    if (relationshipLevel() === 1) return ['Working reference', 'round_investment.funding_round_id → funding_round.funding_round_id'];
    if (relationshipLevel() === 2) return ['Working reference', 'One funding round can relate to many participations'];
    return ['Working reference', 'Selected relations'];
  }

  function renderRelations() {
    const names = orderedRelations();
    const showRelationship = relationshipLevel() > 0 && hasExactRequiredRelations();
    relationEl.className = `relation-preview${showRelationship ? ' relationship-visible' : ''}${relationshipLevel() > 1 ? ' cardinality-visible' : ''}`;
    const [eyebrow, status] = workingSchemaCopy();
    workingEyebrowEl.textContent = eyebrow;
    workingStatusEl.textContent = status;
    workingStatusEl.hidden = !status;

    if (!names.length) {
      relationEl.innerHTML = '<div class="working-empty">Choose relevant relations from the Live Schema.</div>';
      return;
    }

    const cards = names.map(renderSchemaCard);
    if (showRelationship && cards.length >= 2) {
      cards.splice(1, 0, '<div class="schema-connector" aria-label="round_investment.funding_round_id references funding_round.funding_round_id"><span class="connector-line"></span></div>');
    }
    if (state.current === 'connection' && !state.pendingAdvance) {
      cards.push(`
        <div class="cycle1-connection-action">
          <span>${state.selectedColumn ? `Selected: <code>round_investment.${escapeHtml(state.selectedColumn)}</code>` : 'Select one column in round_investment.'}</span>
          <button id="check-connection" class="primary" type="button" ${state.selectedColumn ? '' : 'disabled'}>Check selected column</button>
        </div>
      `);
    }
    relationEl.innerHTML = cards.join('');

    relationEl.querySelectorAll('[data-remove-relation]').forEach((button) => button.addEventListener('click', () => removeRelation(button.dataset.removeRelation)));
    relationEl.querySelectorAll('[data-connection-column]').forEach((button) => button.addEventListener('click', () => {
      state.selectedColumn = button.dataset.connectionColumn;
      state.localFeedback = '';
      render();
    }));
    document.getElementById('check-connection')?.addEventListener('click', checkConnection);
  }

  function renderCompleted() {
    interactionLifecycle.renderCompleted(state.completed.map((item) => ({
      id: item.id,
      summaryHtml: `<span class="complete-mark">✓</span><span>${escapeHtml(item.label)}</span><span class="completed-answer" title="${escapeHtml(item.answer)}">${escapeHtml(item.answer)}</span>`,
      reviewHtml: `${item.reviewHtml || `<p class="review-question"><strong>${escapeHtml(stripMarkup(item.prompt))}</strong></p><p><strong>${escapeHtml(item.answerLabel || 'Your answer')}:</strong> ${escapeHtml(item.answer)}</p>${item.options ? `<fieldset class="choices review-choices" disabled>${item.options.map(([value, label]) => `<label class="${value === item.value ? 'selected-choice' : ''}"><input type="radio" ${value === item.value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset>` : ''}${item.feedback ? `<div class="review-feedback">${item.feedback}</div>` : ''}`}${item.assistance ? `<p class="assistance-review"><strong>Assistance:</strong> ${escapeHtml(assistanceLabel(item.assistance))}</p>` : ''}`,
    })));
  }

  function record({ evidence, prompt, answer, next, label, value, options, feedback = '', assistance = '' }) {
    if (evidence) state.evidence.add(evidence);
    const item = {
      id: `${state.current}-${state.completed.length + 1}`,
      label: label || LABELS[state.current],
      prompt,
      answer,
      answerLabel: 'Your answer',
      value,
      options,
      feedback,
      assistance,
    };
    state.completed.push(item);
    state.pendingAdvance = { next, item };
    state.localFeedback = '';
    render();
    onSelectionChange();
  }

  function setCurrent(next) {
    state.current = next;
    state.localFeedback = '';
    state.pendingAdvance = null;
    hideSolution();
    render();
    onSelectionChange();
  }

  function wrong(message) {
    state.localFeedback = message;
    render();
  }

  function continueFromPending(buttonId) {
    document.getElementById(buttonId)?.addEventListener('click', () => setCurrent(state.pendingAdvance.next));
  }

  function renderAcknowledgement() {
    const { item, next } = state.pendingAdvance;
    let guidance = '';
    let button = 'Continue';

    if (next === 'connection') {
      guidance = 'You now have the round context and the participation records. Next, trace one participation back to the round it belongs to.';
      button = 'Trace the relationship';
    } else if (next === 'grain') {
      guidance = 'That field links each participation to its funding round. The relationship is now visible; next decide what one audit row should represent.';
      button = 'Continue to row meaning';
    } else if (next === 'cardinality') {
      guidance = 'One audit row represents one recorded participation. Round information can appear on that row as context without changing the row meaning.';
      button = 'Read the relationship';
    } else if (next === 'prediction') {
      guidance = 'The relationship allows one funding round to have multiple participation records. Keep that together with the participation-level Grain for the next prediction.';
      button = 'Predict the result shape';
    } else if (next === 'sql') {
      guidance = 'The concrete case follows the same structure you already predicted. Now implement the participation audit in SQL.';
      button = 'Open the SQL workspace';
    }

    interactionLifecycle.renderCurrent(stepShell(
      item.prompt,
      `<p class="confirmed-answer"><strong>Your answer:</strong> ${escapeHtml(item.answer)}</p>${item.feedback || ''}${teacherVoice(guidance)}<button id="cycle1-continue" class="primary continue-after-feedback">${button}</button>`,
      '',
      state.current,
    ));
    continueFromPending('cycle1-continue');
  }

  function renderRelationsStep() {
    interactionLifecycle.renderCurrent(stepShell(
      'Which relations contain the information needed for this audit?',
      `<p class="step-copy">Add the relevant relations from the Live Schema to the Working Schema.</p><button id="check-relations" class="primary" type="button" ${state.selectedRelations.length ? '' : 'disabled'}>Check selection</button>${feedbackMarkup()}`,
      teacherVoice('The audit needs round-level context and one record for each investor participation. Find where those two pieces live.'),
    ));
    document.getElementById('check-relations').addEventListener('click', () => {
      if (!hasExactRequiredRelations()) return wrong('Look for one relation that describes a funding round and one that stores each investor participation in a round.');
      record({
        evidence: 'relations',
        prompt: 'Which relations contain the information needed for this audit?',
        answer: 'funding_round and round_investment',
        next: 'connection',
        label: LABELS.relations,
        feedback: '<div class="success-feedback">Correct. <code>funding_round</code> carries round-level context, and <code>round_investment</code> stores the recorded investor participations.</div>',
      });
    });
  }

  function checkConnection() {
    if (!state.selectedColumn) return;
    if (state.selectedColumn !== 'funding_round_id') return wrong('Look for the participation field whose value identifies the funding round that participation belongs to.');
    record({
      evidence: 'connection',
      prompt: 'Which column in round_investment tells you which funding round a participation belongs to?',
      answer: 'round_investment.funding_round_id',
      next: 'grain',
      label: LABELS.connection,
      feedback: '<div class="success-feedback">Correct. <code>round_investment.funding_round_id</code> points to <code>funding_round.funding_round_id</code>.</div>',
    });
  }

  function renderConnectionStep() {
    interactionLifecycle.renderCurrent(stepShell(
      'In round_investment, which column tells you which funding round a participation belongs to?',
      `<p class="step-copy">Select the column in the highlighted relation. The check stays with the schema action.</p>${feedbackMarkup()}`,
      teacherVoice('Start from one participation record. Which field identifies the funding round that participation belongs to?'),
    ));
  }

  function renderGrain() {
    const options = [
      ['round', 'One funding round.'],
      ['participation', 'One recorded round-investor participation.'],
      ['investor', 'One investor across all funding rounds.'],
      ['company', 'One company.'],
    ];
    const draft = state.drafts.grain || '';
    interactionLifecycle.renderCurrent(stepShell(
      'What should one row of the participation audit represent?',
      `${choiceForm('grain-form', options, draft)}${feedbackMarkup()}`,
      teacherVoice('The request says “for every recorded round-investor participation.” Use that phrase to decide what one output row should represent.'),
    ));
    document.getElementById('grain-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.grain = answer || '';
      if (answer !== 'participation') return wrong('The audit asks for every recorded round-investor participation, with round information carried alongside it.');
      record({
        evidence: 'grain',
        prompt: 'What should one row of the participation audit represent?',
        answer: 'One recorded round-investor participation.',
        value: answer,
        options,
        next: 'cardinality',
        label: LABELS.grain,
        assistance: state.grainAssistance,
        feedback: '<div class="success-feedback">Correct. The audit is participation-level: one output row represents one recorded participation.</div>',
      });
    });
  }

  function renderCardinality() {
    const options = [
      ['one-many', 'Each participation belongs to one funding round, and one funding round can have multiple participation records.'],
      ['round-one', 'Each funding round belongs to exactly one participation record.'],
      ['participation-many', 'A participation can belong to multiple funding rounds.'],
      ['exact-one', 'Exactly one participation is allowed for every funding round.'],
    ];
    const draft = state.drafts.cardinality || '';
    interactionLifecycle.renderCurrent(stepShell(
      'Which statement matches the relationship?',
      `${choiceForm('cardinality-form', options, draft)}${feedbackMarkup()}`,
      teacherVoice('You found how a participation points to its funding round. Now read that relationship in both directions.'),
    ));
    document.getElementById('cardinality-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.cardinality = answer || '';
      if (answer !== 'one-many') return wrong('Follow the relationship from one participation to its round, then ask whether the same round can be referenced by more than one participation record.');
      record({
        evidence: 'cardinality',
        prompt: 'Which statement matches the relationship?',
        answer: 'Each participation belongs to one round; one round can have multiple participations.',
        value: answer,
        options,
        next: 'prediction',
        label: LABELS.cardinality,
        assistance: state.cardinalityAssistance,
        feedback: '<div class="success-feedback">Correct. One funding round can relate to multiple participation records, while each participation belongs to one funding round.</div>',
      });
    });
  }

  function predictionPremisesMarkup() {
    return `<div class="cycle1-premises" aria-label="Established facts">
      <p><span>Result Grain</span><strong>one recorded participation per row</strong></p>
      <p><span>Relationship</span><strong>one funding round can have multiple participation records</strong></p>
    </div>`;
  }

  function predictionHintsMarkup() {
    const hint1Available = state.predictionWrongAttempts >= 1;
    const hint2Available = state.predictionWrongAttempts >= 2;
    return `<div class="local-assistance" aria-label="Prediction assistance">
      ${hint1Available ? '<button id="hint-1" type="button" class="assistance-button">Hint 1</button>' : ''}
      ${hint2Available ? '<button id="hint-2" type="button" class="assistance-button">Hint 2</button>' : ''}
      ${state.predictionHintsOpened.has('hint-1') ? '<div class="hint-text"><strong>Hint 1:</strong> Keep one participation per result row fixed.</div>' : ''}
      ${state.predictionHintsOpened.has('hint-2') ? '<div class="hint-text"><strong>Hint 2:</strong> If several participation records belong to the same round, each record still needs its own participation-level row.</div>' : ''}
    </div>`;
  }

  function wirePredictionHints() {
    document.getElementById('hint-1')?.addEventListener('click', () => {
      state.predictionHintsOpened.add('hint-1');
      raiseAssistance('predictionAssistance', 'hint-1');
      render();
    });
    document.getElementById('hint-2')?.addEventListener('click', () => {
      state.predictionHintsOpened.add('hint-2');
      raiseAssistance('predictionAssistance', 'hint-2');
      render();
    });
  }

  function renderPrediction() {
    const step = PREDICTION_STEPS[state.predictionIndex];
    const draftKey = `prediction-${step.id}`;
    const draft = state.drafts[draftKey] || '';
    const prior = state.predictionAnswers.length
      ? `<p class="cycle1-established-answer"><span>Already established</span>${escapeHtml(state.predictionAnswers[0].answer)}</p>`
      : '';
    const guidance = state.predictionIndex === 0
      ? 'Keep both established facts in view. The question is what those two facts require the result to look like.'
      : 'Now keep the row meaning fixed and compare what stays shared with what changes from participation to participation.';

    interactionLifecycle.renderCurrent(stepShell(
      step.prompt,
      `${predictionPremisesMarkup()}${prior}${choiceForm('prediction-form', step.options, draft)}${feedbackMarkup()}${predictionHintsMarkup()}`,
      teacherVoice(guidance),
    ));
    wirePredictionHints();
    document.getElementById('prediction-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts[draftKey] = answer || '';
      if (answer !== step.correct) {
        state.predictionWrongAttempts += 1;
        return wrong(step.wrong);
      }
      state.predictionAnswers.push({ id: step.id, value: answer, answer: step.answer, prompt: step.prompt, options: step.options });
      state.localFeedback = '';
      if (state.predictionIndex === 0) {
        state.predictionIndex = 1;
        render();
        return;
      }

      state.evidence.add('prediction');
      state.completed.push({
        id: `prediction-${state.completed.length + 1}`,
        label: LABELS.prediction,
        prompt: 'What did you predict before running SQL?',
        answer: 'One round can occupy several participation rows, and its round-level context can repeat across those distinct rows.',
        reviewHtml: `<div class="cycle1-prediction-review">${state.predictionAnswers.map((item) => `<p><strong>${escapeHtml(item.prompt)}</strong><span>${escapeHtml(item.answer)}</span></p>`).join('')}</div>`,
        assistance: state.predictionAssistance,
      });
      state.current = 'concept';
      render();
      onSelectionChange();
    });
  }

  function renderConcept() {
    interactionLifecycle.renderCurrent(stepShell(
      'You have just predicted JOIN row multiplication.',
      `<section class="concept-callout cycle1-concept"><strong>CONCEPT MOMENT</strong><b>JOIN row multiplication</b><span>When one row on the one-side matches several rows on the many-side, the JOIN can produce several output rows for that one-side entity. At participation Grain, the round values repeat because each row represents a different matched participation.</span><div class="cycle1-multiplication-visual" aria-label="One funding round contributes context to several participation rows"><span>one funding round</span><i>→</i><span>several matching participations</span><i>→</i><span>several result rows</span></div></section><button id="continue-to-application" class="primary continue-after-feedback">Apply it to a concrete case</button>`,
      teacherVoice('You reached this conclusion from the relationship and the result Grain before seeing any query output.'),
    ));
    document.getElementById('continue-to-application').addEventListener('click', () => setCurrent('application'));
  }

  function renderApplication() {
    const options = [
      ['1', '1 row.'],
      ['3', '3 distinct participation rows.'],
      ['9', '9 rows.'],
      ['unknown', 'Impossible to tell even after the number of participations is known.'],
    ];
    const draft = state.drafts.application || '';
    interactionLifecycle.renderCurrent(stepShell(
      'If one funding round has 3 recorded participations, how many participation-level result rows are needed?',
      `<div class="cycle1-case-fact"><span>Concrete case</span><strong>1 funding round · 3 recorded participations</strong></div>${choiceForm('application-form', options, draft)}${feedbackMarkup()}`,
      teacherVoice('Apply the same structure you just predicted. The result Grain is still one recorded participation per row.'),
    ));
    document.getElementById('application-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.application = answer || '';
      if (answer !== '3') return wrong('At participation Grain, each of the three recorded participations needs its own result row.');
      record({
        evidence: 'application',
        prompt: 'If one funding round has 3 recorded participations, how many participation-level result rows are needed?',
        answer: '3 distinct participation rows.',
        value: answer,
        options,
        next: 'sql',
        label: LABELS.application,
        assistance: state.applicationAssistance,
        feedback: '<div class="success-feedback">Correct. Three recorded participations require three participation-level rows.</div>',
      });
    });
  }

  function clearRenderedResults() {
    document.getElementById('result-content').innerHTML = '<p class="empty">Results will appear here.</p>';
    document.getElementById('result-meta').textContent = 'No query run';
    clearButton.disabled = true;
  }

  function renderSql() {
    if (!state.sqlPrepared) {
      editor.setValue('', -1);
      clearRenderedResults();
      state.sqlPrepared = true;
    }
    interactionLifecycle.renderCurrent(stepShell(
      'Write the JOIN that produces the participation audit.',
      `<p class="step-copy">Return <code>funding_round_id</code>, <code>round_type</code>, <code>announced_date</code>, <code>round_investment_id</code>, <code>investor_id</code>, and <code>is_lead</code> by joining the two established relations.</p>${feedbackMarkup()}`,
      teacherVoice('Use the relationship you already established to write the JOIN. Keep the Working Schema nearby for the fields and matching key.'),
    ));
  }

  function canonicalRows() {
    const db = getDatabase();
    if (!db) return [];
    const result = db.exec(`
      SELECT
        funding_round.funding_round_id,
        funding_round.round_type,
        funding_round.announced_date,
        round_investment.round_investment_id,
        round_investment.investor_id,
        round_investment.is_lead
      FROM funding_round
      INNER JOIN round_investment
        ON funding_round.funding_round_id = round_investment.funding_round_id;
    `)[0];
    return (result?.values || []).map((row) => JSON.stringify(row)).sort();
  }

  function resultMatchesCanonical(resultSet) {
    if (!resultSet || resultSet.values.length !== 72) return false;
    const required = ['funding_round_id', 'round_type', 'announced_date', 'round_investment_id', 'investor_id', 'is_lead'];
    const indexes = required.map((name) => resultSet.columns.indexOf(name));
    if (indexes.some((index) => index < 0)) return false;
    const actual = resultSet.values.map((row) => JSON.stringify(indexes.map((index) => row[index]))).sort();
    const expected = canonicalRows();
    return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
  }

  function validateSql(statement, resultSets) {
    const normalized = statement.replace(/["`\[\]]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    const forbidden = [
      /\bleft\s+join\b/,
      /\bgroup\s+by\b/,
      /\bhaving\b/,
      /\bdistinct\b/,
      /\bexists\b/,
      /\bunion\b/,
      /\bcount\s*\(/,
      /\bsum\s*\(/,
      /\bavg\s*\(/,
      /\bmin\s*\(/,
      /\bmax\s*\(/,
    ];
    if (forbidden.some((pattern) => pattern.test(normalized))) {
      return { ok: false, message: 'Keep this audit to the direct participation-level INNER JOIN. Do not add aggregation, DISTINCT, LEFT JOIN, EXISTS, or another repair mechanism.' };
    }
    if (!/\bfrom\s+(?:funding_round|round_investment)\b/.test(normalized)) {
      return { ok: false, message: 'Use funding_round and round_investment as the two relations for this audit.' };
    }
    const hasBothRelations = /\bfunding_round\b/.test(normalized) && /\bround_investment\b/.test(normalized);
    if (!hasBothRelations || !/\b(?:inner\s+)?join\b/.test(normalized) || !/\bon\b/.test(normalized)) {
      return { ok: false, message: 'Use a direct INNER JOIN between funding_round and round_investment and express their funding_round_id relationship in ON.' };
    }
    const resultSet = resultSets.at(-1);
    if (!resultMatchesCanonical(resultSet)) {
      return { ok: false, message: 'The query ran, but the result does not yet match the six-field participation audit with all 72 current participation rows.' };
    }
    return { ok: true };
  }

  function handleSqlSuccess(statement, resultSets) {
    if (state.current !== 'sql') return;
    const validation = validateSql(statement, resultSets);
    if (!validation.ok) {
      state.localFeedback = validation.message;
      render();
      return;
    }
    state.lastResultSet = resultSets.at(-1);
    state.completed.push({
      id: `sql-${state.completed.length + 1}`,
      label: LABELS.sql,
      prompt: 'Write the JOIN that produces the participation audit.',
      answer: 'Participation-level INNER JOIN executed with 72 current rows.',
      assistance: state.sqlAssistance,
    });
    state.current = 'result';
    state.localFeedback = '';
    hideSolution();
    render();
    onSelectionChange();
  }

  function renderResult() {
    interactionLifecycle.renderCurrent(stepShell(
      'The query returned 72 rows. Inspect the actual result before interpreting it.',
      teacherVoice('The 72-row count tells you what the query returned; it does not explain why the rows look that way. Inspect the rows before deciding whether your prediction held.'),
    ));
    const action = renderWorkspaceAction(`
      <div class="cycle1-result-handoff"><span>Query executed</span><strong>72 rows returned</strong><button id="inspect-1003" class="primary" type="button">Inspect funding round 1003</button></div>
    `, 'cycle1-result-action');
    action.querySelector('#inspect-1003').addEventListener('click', () => setCurrent('verification'));
  }

  function actualSliceRows() {
    const resultSet = state.lastResultSet;
    if (!resultSet) return [];
    const indexes = ['funding_round_id', 'round_type', 'announced_date', 'round_investment_id', 'investor_id', 'is_lead'].map((name) => resultSet.columns.indexOf(name));
    if (indexes.some((index) => index < 0)) return [];
    return resultSet.values
      .filter((row) => String(row[indexes[0]]) === '1003')
      .map((row) => indexes.map((index) => row[index]));
  }

  function actualSliceMarkup() {
    const columns = ['funding_round_id', 'round_type', 'announced_date', 'round_investment_id', 'investor_id', 'is_lead'];
    const rows = actualSliceRows();
    return `<div class="cycle1-slice"><div class="cycle1-slice-heading"><span>Actual query evidence</span><strong>funding_round_id = 1003</strong></div><div class="result-content"><table><thead><tr>${columns.map((column) => `<th>${column}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((value) => `<td>${escapeHtml(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
  }

  function renderVerification() {
    const options = [
      ['distinct', 'They are four distinct participation rows for the same funding round. The round context repeats because each row represents a different participation.'],
      ['duplicates', 'They are four accidental duplicate rows that should collapse to one.'],
      ['different-rounds', 'They represent four different funding rounds.'],
      ['same-participation', 'They show one participation repeated four times.'],
    ];
    const draft = state.drafts.verification || '';
    interactionLifecycle.renderCurrent(stepShell(
      'Use the actual rows to check the prediction.',
      teacherVoice('Compare the repeated round fields with the participation and investor identifiers that change from row to row.'),
    ));
    const action = renderWorkspaceAction(`
      ${actualSliceMarkup()}
      <div class="cycle1-verification-question">
        <div class="evidence-kicker">Verify from the evidence</div>
        <h3>What do these four rows show about funding round 1003?</h3>
        ${choiceForm('verification-form', options, draft)}
        ${feedbackMarkup()}
      </div>
    `, 'cycle1-verification-action');
    action.querySelector('#verification-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.verification = answer || '';
      if (answer !== 'distinct') return wrong('Compare the repeated funding-round fields with the changing round_investment_id and investor_id values.');
      state.evidence.add('verification');
      state.completed.push({
        id: `verification-${state.completed.length + 1}`,
        label: LABELS.verification,
        prompt: 'What do these four rows show about funding round 1003?',
        answer: 'Four distinct participation rows for one round; repeated round context is expected.',
        value: answer,
        options,
        assistance: state.verificationAssistance,
      });
      state.current = 'complete';
      state.localFeedback = '';
      render();
      onSelectionChange();
    });
  }

  function renderComplete() {
    interactionLifecycle.renderCurrent(stepShell(
      'Your prediction matches the result.',
      `<div class="cycle1-completion"><p>One funding round can contribute several participation-level result rows when it has several recorded participations.</p><p>The round-level context repeats across those rows because each row represents a different participation.</p><strong>That is JOIN row multiplication.</strong></div>`,
      teacherVoice('You predicted the row shape from Grain and Cardinality before execution, then confirmed it in the actual rows.'),
    ));
  }

  function clearWorkspaceAction() {
    document.getElementById('workspace-evidence-action')?.remove();
  }

  function renderWorkspaceAction(content, extraClass = '') {
    clearWorkspaceAction();
    const element = document.createElement('section');
    element.id = 'workspace-evidence-action';
    element.className = `workspace-evidence-action ${extraClass}`.trim();
    element.innerHTML = content;
    labEl.insertAdjacentElement('afterend', element);
    return element;
  }

  function updateWorkspaceVisibility() {
    const sqlActive = state.current === 'sql';
    const resultActive = state.current === 'result';
    const verificationActive = state.current === 'verification';
    const visible = sqlActive || resultActive || verificationActive;

    learningEl.classList.toggle('cycle1-sql-active', sqlActive);
    learningEl.classList.toggle('cycle1-results-active', resultActive);
    learningEl.classList.toggle('cycle1-verification-active', verificationActive);
    labEl.hidden = !visible;

    runButton.hidden = !sqlActive;
    runButton.disabled = !sqlActive || !getDatabase();
    clearButton.hidden = !sqlActive;
    if (!sqlActive) clearButton.disabled = true;

    document.querySelector('.editor-header h2').textContent = sqlActive ? 'Participation audit SQL' : 'SQL result';
    document.getElementById('editor-note').textContent = sqlActive ? 'SQLite · author the JOIN' : 'Actual returned rows';
  }

  function canRunSql() {
    return state.current === 'sql';
  }

  function solutionForSql() {
    return `<strong>Solution SQL:</strong><pre>SELECT
  funding_round.funding_round_id,
  funding_round.round_type,
  funding_round.announced_date,
  round_investment.round_investment_id,
  round_investment.investor_id,
  round_investment.is_lead
FROM funding_round
JOIN round_investment
  ON funding_round.funding_round_id = round_investment.funding_round_id;</pre><p>This is assistance only. It has not been inserted or run.</p>`;
  }

  function showSolution() {
    if (state.current !== 'sql') return;
    raiseAssistance('sqlAssistance', 'solution-assisted');
    solutionPanel.innerHTML = `<div class="solution-panel-heading"><span>Solution assistance</span><button id="close-solution" type="button" aria-label="Close solution">Close</button></div><div class="solution-panel-body">${solutionForSql()}</div>`;
    solutionPanel.hidden = false;
    document.getElementById('close-solution').addEventListener('click', hideSolution);
  }

  function hideSolution() {
    if (!solutionPanel) return;
    solutionPanel.hidden = true;
    solutionPanel.innerHTML = '';
  }

  function render() {
    clearWorkspaceAction();
    renderRelations();
    renderCompleted();
    updateWorkspaceVisibility();

    if (state.pendingAdvance) {
      renderAcknowledgement();
      return;
    }

    if (state.current === 'relations') renderRelationsStep();
    else if (state.current === 'connection') renderConnectionStep();
    else if (state.current === 'grain') renderGrain();
    else if (state.current === 'cardinality') renderCardinality();
    else if (state.current === 'prediction') renderPrediction();
    else if (state.current === 'concept') renderConcept();
    else if (state.current === 'application') renderApplication();
    else if (state.current === 'sql') renderSql();
    else if (state.current === 'result') renderResult();
    else if (state.current === 'verification') renderVerification();
    else if (state.current === 'complete') renderComplete();
  }

  function refresh() {
    render();
  }

  solutionButton?.addEventListener('click', showSolution);
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
