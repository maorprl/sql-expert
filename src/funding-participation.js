import './funding-participation.css';

const BASELINE_SQL = 'SELECT COUNT(*) FROM funding_round;';
const BUSINESS_REQUEST = 'The investment team wants to review which investors took part in each funding round and see which of them were marked as lead.';

const INTERACTION_LABELS = {
  relations: 'Identify relevant relations',
  output: 'Determine row meaning',
  connection: 'Understand the relationship',
  cardinality: 'Understand the relationship',
  baselineRun: 'Establish the baseline',
  prediction: 'Predict behavior',
  operation: 'Choose what to do with the rows',
  joinTeaching: 'Reconnect the reasoning to JOIN',
  sql: 'Implement the JOIN',
  finalGrain: 'Verify the result',
  complete: 'Stage complete',
};

const REQUIRED_RELATIONS = ['round_investment', 'funding_round'];

export function createFundingParticipation({ editor, getDatabase, getSchema, onSelectionChange, interactionLifecycle }) {
  const state = {
    current: 'relations', completed: [], evidence: new Set(), drafts: {}, localFeedback: '',
    selectedRelations: [], selectedColumn: '', baselineExecuted: false, baselinePrepared: false,
    implementationPrepared: false, pendingAdvance: null, joinTeachingBeat: 1,
  };

  const relationEl = document.getElementById('relation-preview');
  const workingStatusEl = document.getElementById('working-schema-status');
  const labEl = document.getElementById('lab-workspace');
  const learningEl = document.querySelector('.learning-panel');
  const solutionButton = document.getElementById('show-solution');

  function escapeHtml(value) {
    return String(value).replace(/[&<>'\"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '\"': '&quot;' }[character]));
  }

  function stripMarkup(value) {
    const element = document.createElement('div');
    element.innerHTML = value;
    return element.textContent || '';
  }

  function teacherVoice(content) {
    return `<aside class="teacher-voice"><span class="teacher-voice-label">Guidance</span><p>${content}</p></aside>`;
  }

  function showFundingSolution() {
    if (document.title !== 'SQL Lab · Funding participation' || state.current !== 'sql' || !learningEl.classList.contains('sql-implementation-active')) return;
    const panel = document.getElementById('solution-panel');
    if (!panel) return;
    panel.innerHTML = `<div class="solution-panel-heading"><span>Solution assistance</span><button id="close-solution" type="button" aria-label="Close solution">Close</button></div><div class="solution-panel-body"><strong>Solution SQL:</strong><pre>SELECT
  funding_round.funding_round_id,
  funding_round.round_type,
  funding_round.announced_date,
  round_investment.round_investment_id,
  round_investment.investor_id,
  round_investment.is_lead
FROM funding_round
JOIN round_investment
  ON funding_round.funding_round_id = round_investment.funding_round_id;</pre><p>This is assistance only. It has not been inserted or run.</p></div>`;
    panel.hidden = false;
    document.getElementById('close-solution').addEventListener('click', () => {
      panel.hidden = true;
      panel.innerHTML = '';
    });
  }

  solutionButton?.addEventListener('click', showFundingSolution);

  function relationshipLevel() {
    if (state.evidence.has('cardinality')) return 2;
    if (state.evidence.has('connection')) return 1;
    return 0;
  }

  function renderColumn(relation, column) {
    const keyLevel = relationshipLevel();
    const isConnectingChoice = state.current === 'connection' && !state.pendingAdvance && relation.name === 'round_investment';
    const isSelected = isConnectingChoice && state.selectedColumn === column.column;
    const isParticipationForeignKey = keyLevel > 0 && relation.name === 'round_investment' && column.column === 'funding_round_id';
    const isRoundPrimaryKey = keyLevel > 0 && relation.name === 'funding_round' && column.column === 'funding_round_id';
    const isOutputField = ['joinTeaching', 'sql', 'finalGrain', 'complete'].includes(state.current)
      && ((relation.name === 'funding_round' && ['funding_round_id', 'round_type', 'announced_date'].includes(column.column))
        || (relation.name === 'round_investment' && ['round_investment_id', 'investor_id', 'is_lead'].includes(column.column)));
    const classes = [isSelected ? 'selected-column' : '', isParticipationForeignKey || isRoundPrimaryKey ? 'relationship-column' : '', isOutputField ? 'output-column' : ''].filter(Boolean).join(' ');
    const badge = isParticipationForeignKey ? '<span class="key-badge">FK</span>' : isRoundPrimaryKey ? '<span class="key-badge">PK</span>' : '';
    const content = `<code>${escapeHtml(column.column)}</code>${badge}`;
    return isConnectingChoice
      ? `<li><button type="button" class="working-column ${classes}" data-working-column="${escapeHtml(column.column)}">${content}</button></li>`
      : `<li class="working-column ${classes}">${content}</li>`;
  }

  function orderedSelectedRelations() {
    const selected = state.selectedRelations.map((name) => getSchema().find((relation) => relation.name === name)).filter(Boolean);
    if (!REQUIRED_RELATIONS.every((name) => state.selectedRelations.includes(name))) return selected;
    return [...REQUIRED_RELATIONS.map((name) => selected.find((relation) => relation.name === name)), ...selected.filter((relation) => !REQUIRED_RELATIONS.includes(relation.name))];
  }

  function workingSchemaStatus() {
    if (state.current === 'relations' && !state.pendingAdvance) return 'Build it from the live schema';
    return '';
  }

  function renderRelations() {
    const selected = orderedSelectedRelations();
    const showRelationship = relationshipLevel() > 0 && REQUIRED_RELATIONS.every((name) => state.selectedRelations.includes(name));
    relationEl.classList.toggle('relationship-visible', showRelationship);
    relationEl.classList.toggle('cardinality-visible', relationshipLevel() > 1);
    const status = workingSchemaStatus();
    workingStatusEl.textContent = status;
    workingStatusEl.hidden = !status;

    if (!selected.length) {
      relationEl.innerHTML = '<div class="working-empty">Choose relevant relations from the live schema.</div>';
      return;
    }

    const cards = selected.map((relation) => `
      <article class="data-card" data-relation="${escapeHtml(relation.name)}">
        <div class="data-card-title"><code>${escapeHtml(relation.name)}</code>${state.current === 'relations' && !state.pendingAdvance ? `<button type="button" class="remove-relation" data-remove-relation="${escapeHtml(relation.name)}">Remove</button>` : ''}</div>
        <ul class="working-columns">${relation.columns.map((column) => renderColumn(relation, column)).join('')}</ul>
      </article>
    `);

    if (showRelationship && cards.length >= 2) {
      cards.splice(1, 0, '<div class="schema-connector" aria-label="round_investment.funding_round_id matches funding_round.funding_round_id"><span class="connector-line"></span></div>');
    }
    relationEl.innerHTML = cards.join('');

    relationEl.querySelectorAll('[data-remove-relation]').forEach((button) => button.addEventListener('click', () => removeRelation(button.dataset.removeRelation)));
    relationEl.querySelectorAll('[data-working-column]').forEach((button) => button.addEventListener('click', () => {
      state.selectedColumn = button.dataset.workingColumn;
      state.localFeedback = '';
      render();
    }));
  }

  function addRelation(name) {
    if (state.current !== 'relations' || state.pendingAdvance || state.selectedRelations.includes(name)) return;
    if (state.selectedRelations.length >= 4) {
      state.localFeedback = 'The Working Schema can contain up to four relations. Remove one to add another.';
      render();
      return;
    }
    state.selectedRelations.push(name);
    state.localFeedback = '';
    render();
    onSelectionChange();
  }

  function removeRelation(name) {
    if (state.current !== 'relations' || state.pendingAdvance) return;
    state.selectedRelations = state.selectedRelations.filter((item) => item !== name);
    state.localFeedback = '';
    render();
    onSelectionChange();
  }

  function renderCompleted() {
    interactionLifecycle.renderCompleted(state.completed.filter((item) => item.id !== state.pendingAdvance?.item.id).map((item) => ({
      id: item.id,
      summaryHtml: `<span class="complete-mark">✓</span><span>${escapeHtml(item.label)}</span><span class="completed-answer" title="${escapeHtml(item.answer)}">${escapeHtml(item.answer)}</span>`,
      reviewHtml: `<p class="review-question"><strong>${escapeHtml(stripMarkup(item.prompt))}</strong></p><p><strong>${escapeHtml(item.answerLabel)}:</strong> ${escapeHtml(item.answer)}</p>${item.options ? `<fieldset class="choices review-choices" disabled>${item.options.map(([value, label]) => `<label class="${value === item.value ? 'selected-choice' : ''}"><input type="radio" ${value === item.value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset>` : ''}${item.feedback ? `<div class="review-feedback">${item.feedback}</div>` : ''}`,
    })));
  }

  function setCurrent(next) {
    state.current = next;
    state.localFeedback = '';
    render();
    onSelectionChange();
  }

  function record({ evidence, prompt, answer, answerLabel = 'Your answer', feedback = '', next, label, value, options }) {
    if (evidence) state.evidence.add(evidence);
    const item = { id: state.current, label: label || INTERACTION_LABELS[state.current], prompt, answer, answerLabel, feedback, value, options };
    state.completed.push(item);
    state.pendingAdvance = { next, item };
    state.localFeedback = '';
    render();
    onSelectionChange();
  }

  function wrong(feedback) { state.localFeedback = feedback; render(); }

  function feedbackMarkup() {
    return state.localFeedback ? `<div class="local-feedback incorrect" role="alert"><strong>Not quite.</strong> ${state.localFeedback.replace(/^Not quite\.\s*/i, '')}</div>` : '';
  }

  function stepShell(prompt, body, intro = '') {
    const label = INTERACTION_LABELS[state.current];
    return state.current !== 'complete' ? `<div class="step-kicker">${label}</div>${intro}<h2 class="prompt">${prompt}</h2>${body}` : `<h2 class="prompt">${prompt}</h2>${body}`;
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

  function continueFromPending(buttonId) {
    document.getElementById(buttonId).addEventListener('click', () => {
      const next = state.pendingAdvance.next;
      state.pendingAdvance = null;
      setCurrent(next);
    });
  }

  function renderAcknowledgement() {
    const { next, item } = state.pendingAdvance;

    if (item.id === 'baselineRun' && next === 'prediction') {
      interactionLifecycle.renderCurrent(stepShell('Baseline established.', teacherVoice('The measurement gives us the one-side starting reference for the next prediction.')));
      renderWorkspaceAction(`
        ${item.feedback}
        ${teacherVoice('Keep this baseline together with the one-round-to-many-participations relationship and the participation-level result Grain.')}
        <button id="continue-after-baseline" class="primary">Continue</button>
      `, 'baseline-followup');
      continueFromPending('continue-after-baseline');
      return;
    }

    if (item.id === 'prediction' && next === 'operation') {
      interactionLifecycle.renderCurrent(stepShell('Prediction established.', teacherVoice('You now have an expectation for the result shape. Next, choose the relational action that can produce it.')));
      renderWorkspaceAction(`
        ${item.feedback}
        <button id="continue-after-prediction" class="primary">Continue</button>
      `, 'prediction-followup');
      continueFromPending('continue-after-prediction');
      return;
    }

    if (item.id === 'sql' && next === 'finalGrain') {
      interactionLifecycle.renderCurrent(stepShell('Inspect the result.', teacherVoice('Your activity has moved from authoring to evidence. Inspect Results: use the returned columns, row count, and participation rows before deciding whether the earlier prediction held.')));
      renderWorkspaceAction(`
        ${item.feedback}
        ${teacherVoice('Compare what you see with the earlier prediction: one funding round can appear across several participation rows.')}
        <button id="continue-to-verification" class="primary">Continue to verification</button>
      `, 'result-followup');
      continueFromPending('continue-to-verification');
      return;
    }

    if (item.id === 'finalGrain' && next === 'complete') {
      interactionLifecycle.renderCurrent(stepShell('Verification complete.', teacherVoice('You used the actual result to close the reasoning loop.')));
      renderWorkspaceAction(`
        <p class="confirmed-answer"><strong>${escapeHtml(item.answerLabel)}:</strong> ${escapeHtml(item.answer)}</p>
        ${item.feedback}
        <button id="complete-after-verification" class="primary">Complete stage</button>
      `, 'verification-followup');
      continueFromPending('complete-after-verification');
      return;
    }

    const continueLabel = next === 'complete' ? 'Complete stage' : 'Continue';
    interactionLifecycle.renderCurrent(stepShell(item.prompt, `
      <p class="confirmed-answer"><strong>${escapeHtml(item.answerLabel)}:</strong> ${escapeHtml(item.answer)}</p>
      ${item.feedback}
      <button id="continue-after-feedback" class="primary continue-after-feedback">${continueLabel}</button>
    `));
    continueFromPending('continue-after-feedback');
  }

  function choiceQuestion({ prompt, options, correct, feedback, wrongFeedback, next, evidence, intro = '' }) {
    const draft = state.drafts[state.current] || '';
    interactionLifecycle.renderCurrent(stepShell(prompt, `<form id="answer-form" class="answer-form"><fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${escapeHtml(value)}" ${draft === value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset><button class="primary" type="submit">Check answer</button></form>${feedbackMarkup()}`, intro));
    document.getElementById('answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts[state.current] = answer || '';
      if (answer !== correct) return wrong(wrongFeedback);
      record({ evidence, prompt, answer: stripMarkup(options.find(([value]) => value === answer)[1]), value: answer, options, feedback, next });
    });
  }

  function renderBaselineInterpretation() {
    const options = [
      ['rounds', '26 funding rounds'],
      ['participations', '26 participation records'],
      ['investors', '26 investors'],
      ['companies', '26 companies'],
    ];
    const draft = state.drafts.baselineRun || '';
    interactionLifecycle.renderCurrent(stepShell('Interpret the measurement.', teacherVoice('Keep the returned count in view and identify what it tells us about the one-side starting point.')));
    const action = renderWorkspaceAction(`
      <div class="evidence-kicker">Interpret the evidence</div>
      <h3>What does the number 26 represent here?</h3>
      <form id="baseline-answer-form" class="answer-form">
        <fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${value}" ${draft === value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset>
        <button class="primary" type="submit">Check answer</button>
      </form>
      ${feedbackMarkup()}
    `, 'baseline-interpretation');
    action.querySelector('#baseline-answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.baselineRun = answer || '';
      if (answer !== 'rounds') return wrong('The prepared query counts rows in funding_round. What does one row in that relation represent?');
      record({
        evidence: 'baseline',
        prompt: 'What does the number 26 represent here?',
        answer: '26 funding rounds',
        value: 'rounds',
        options,
        feedback: '<div class="success-feedback">Correct. There are 26 funding-round rows on the one-side before participation rows are matched to them.</div>',
        next: 'prediction',
      });
    });
  }

  function renderPrediction() {
    const options = [
      ['multiply', 'A funding round can appear in several result rows — one for each matching participation.'],
      ['exact', 'The result must stay at exactly 26 rows — one row for each funding round.'],
      ['collapse', 'All participations for a funding round must collapse into one result row.'],
    ];
    const draft = state.drafts.prediction || '';
    interactionLifecycle.renderCurrent(stepShell('Predict from the evidence.', teacherVoice('We have 26 funding-round rows, one funding round can match several participation records, and the requested result keeps one participation per row. Use those established facts before writing SQL.')));
    const action = renderWorkspaceAction(`
      <div class="baseline-result compact"><span>Established baseline</span><strong>26</strong><span>funding rounds</span></div>
      <div class="prediction-premises" aria-label="Established facts for the prediction">
        <div><span>Result Grain</span><strong>one participation per row</strong></div>
        <div><span>Relationship</span><strong>one round can match several participations</strong></div>
      </div>
      <div class="evidence-kicker">Predict behavior</div>
      <h3>What can happen when participation details are added to the funding rounds?</h3>
      <form id="prediction-answer-form" class="answer-form">
        <fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${value}" ${draft === value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset>
        <button class="primary" type="submit">Check answer</button>
      </form>
      ${feedbackMarkup()}
    `, 'prediction-question');
    action.querySelector('#prediction-answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.prediction = answer || '';
      if (answer !== 'multiply') return wrong('Keep one participation per result row fixed. If one funding round matches several participation records, can all of those records remain represented in a single row?');
      record({
        evidence: 'prediction',
        prompt: 'What can happen when participation details are added to the funding rounds?',
        answer: stripMarkup(options.find(([value]) => value === answer)[1]),
        value: answer,
        options,
        feedback: '<div class="success-feedback">Correct. A funding round with several matching participations can contribute several result rows while each row still represents a different participation.</div><div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>JOIN row multiplication</b><span>When one row on the one-side matches several rows on the many-side, the JOIN can produce several result rows for that one-side entity. The round-level values can repeat because the participation rows are distinct.</span></div>',
        next: 'operation',
      });
    });
  }

  function renderFinalVerification() {
    const options = [
      ['yes', '72 participation rows; the same funding round can appear on several rows with different participation details.'],
      ['round-grain', '72 rows, but each row represents one funding round rather than one participation.'],
      ['duplicates', 'Repeated funding-round values mean those rows are accidental duplicates that should collapse.'],
    ];
    const draft = state.drafts.finalGrain || '';
    interactionLifecycle.renderCurrent(stepShell('Verify the result.', teacherVoice('Keep Results in view. Compare its 72 participation rows and repeated funding-round values with the prediction you made before writing SQL.')));
    const action = renderWorkspaceAction(`
      <div class="verification-prompt"><strong>Compare the result with your prediction</strong><span>Earlier prediction: one funding round can appear across several participation rows.</span></div>
      <h3>What does the result show?</h3>
      <form id="verification-answer-form" class="answer-form">
        <fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${value}" ${draft === value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset>
        <button class="primary" type="submit">Check answer</button>
      </form>
      ${feedbackMarkup()}
    `, 'verification-question');
    action.querySelector('#verification-answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.finalGrain = answer || '';
      if (answer !== 'yes') return wrong('Use the visible result as evidence. Look at funding_round_id 1003: its round-level values repeat while round_investment_id and investor_id change.');
      record({
        evidence: 'finalGrain',
        prompt: 'What does the result show?',
        answer: stripMarkup(options.find(([value]) => value === answer)[1]),
        value: answer,
        options,
        feedback: '<div class="success-feedback">Correct. The result has 72 participation rows. Funding round 1003 appears four times because it has four distinct participation records; the repeated round context is expected.</div>',
        next: 'complete',
      });
    });
  }

  function hasExactRequiredRelations() {
    return state.selectedRelations.length === REQUIRED_RELATIONS.length && REQUIRED_RELATIONS.every((relation) => state.selectedRelations.includes(relation));
  }

  function updateWorkspaceVisibility() {
    const predictionEvidence = state.current === 'prediction';
    const baselineWorkspace = state.current === 'baselineRun' || predictionEvidence;
    const implementationWorkspace = ['sql', 'finalGrain'].includes(state.current);
    const visible = baselineWorkspace || implementationWorkspace;
    const baselineEvidence = (state.current === 'baselineRun' && state.baselineExecuted) || predictionEvidence;
    const resultsEvidence = (state.current === 'sql' && state.pendingAdvance?.next === 'finalGrain') || state.current === 'finalGrain';
    const sqlImplementation = state.current === 'sql' && !resultsEvidence;

    if (state.current === 'baselineRun' && !state.baselinePrepared) {
      editor.setValue(BASELINE_SQL, -1);
      state.baselinePrepared = true;
    }
    if (state.current === 'sql' && !state.implementationPrepared) {
      editor.setValue('', -1);
      document.getElementById('clear-results').click();
      state.implementationPrepared = true;
    }

    labEl.hidden = !visible;
    learningEl.classList.toggle('sql-active', visible);
    learningEl.classList.toggle('baseline-workspace-active', baselineWorkspace);
    learningEl.classList.toggle('baseline-evidence-active', baselineEvidence);
    learningEl.classList.toggle('prediction-evidence-active', predictionEvidence);
    learningEl.classList.toggle('join-teaching-active', state.current === 'joinTeaching');
    learningEl.classList.toggle('sql-implementation-active', sqlImplementation);
    learningEl.classList.toggle('results-evidence-active', resultsEvidence);
    learningEl.dataset.stage2State = resultsEvidence ? 'results' : state.current;

    document.querySelector('.editor-header h2').textContent = baselineWorkspace ? 'Baseline measurement' : 'JOIN implementation';
    document.querySelectorAll('.lab-action').forEach((element) => {
      element.hidden = !visible || baselineEvidence || resultsEvidence;
    });
    const runButton = document.getElementById('run-query');
    runButton.disabled = runButton.hidden;
  }

  function renderJoinTeaching() {
    const beat = state.joinTeachingBeat;
    const guidance = beat === 1
      ? 'You chose to combine each funding round with its matching participations. Now see how the familiar JOIN carries out that choice for one matching pair.'
      : beat === 2
        ? 'You have seen how one match produces a participation-level row. Now reuse the key relationship you found to tell SQL which rows match.'
        : 'The relationship now has an SQL form inside ON. Next, connect that match back to the review request and the row-multiplication prediction as you map the whole query.';
    const beatMarkup = beat === 1 ? `
      <section class="teaching-beat active-beat">
        <div class="teaching-beat-heading"><span>1</span><div><strong>Match the rows</strong><p>Reuse the JOIN pattern: a funding-round row matches each participation row with the same <code>funding_round_id</code>.</p></div></div>
        <div class="row-match-visual" aria-label="Funding round 1003 and one matching participation produce one participation-level result row">
          <div class="example-row article-row"><strong>funding_round row</strong><span><code>round_type</code><b>series b</b></span><span class="match-value"><code>funding_round_id</code><b>1003</b></span></div>
          <span class="row-operator">+</span>
          <div class="example-row source-row"><strong>matching round_investment row</strong><span class="match-value"><code>funding_round_id</code><b>1003</b></span><span><code>investor_id</code><b>14</b></span></div>
          <span class="row-operator">→</span>
          <div class="example-row result-row"><strong>result row</strong><span><code>round_type</code><b>series b</b></span><span><code>investor_id</code><b>14</b></span></div>
        </div>
      </section>
    ` : beat === 2 ? `
      <section class="teaching-beat active-beat">
        <div class="teaching-beat-heading"><span>2</span><div><strong>Use the relationship in ON</strong><p>The relationship you already established becomes the match condition.</p></div></div>
        <div class="relationship-on-map"><span>Relationship already established</span><code>round_investment.funding_round_id = funding_round.funding_round_id</code><span class="on-arrow">becomes</span><code>ON funding_round.funding_round_id = round_investment.funding_round_id</code></div>
      </section>
    ` : `
      <section class="teaching-beat active-beat">
        <div class="teaching-beat-heading"><span>3</span><div><strong>Map the review to SQL</strong><p>The query expresses the same business request and relational reasoning.</p></div></div>
        <dl class="query-map">
          <div><dt>requested information</dt><dd><code>SELECT round context + participation fields</code></dd></div>
          <div><dt>starting round rows</dt><dd><code>FROM funding_round</code></dd></div>
          <div><dt>add matching participations</dt><dd><code>JOIN round_investment</code></dd></div>
          <div><dt>how the rows match</dt><dd><code>ON funding_round.funding_round_id = round_investment.funding_round_id</code></dd></div>
        </dl>
        <div class="output-requirements"><strong>Earlier prediction</strong><span>one funding round can appear across several participation rows</span></div>
      </section>
    `;

    interactionLifecycle.renderCurrent(stepShell('Reconnect the relationship to the JOIN you already know.', `
      <div class="join-progress" aria-label="JOIN explanation progress"><span>Teaching step ${beat} of 3</span><div><i class="${beat >= 1 ? 'done' : ''}"></i><i class="${beat >= 2 ? 'done' : ''}"></i><i class="${beat >= 3 ? 'done' : ''}"></i></div></div>
      <div class="join-teaching">${beatMarkup}</div>
      <div class="teaching-navigation">
        <button id="join-teaching-next" class="primary">${beat < 3 ? (beat === 1 ? 'Next: express the match in SQL' : 'Next: map the whole query') : 'Continue to SQL implementation'}</button>
      </div>
    `, teacherVoice(guidance)));

    document.getElementById('join-teaching-next').addEventListener('click', () => {
      if (state.joinTeachingBeat < 3) {
        state.joinTeachingBeat += 1;
        render();
        return;
      }
      setCurrent('sql');
    });
  }

  function render() {
    document.getElementById('business-request-title').textContent = BUSINESS_REQUEST;
    clearWorkspaceAction();
    renderRelations();
    renderCompleted();
    updateWorkspaceVisibility();

    if (state.pendingAdvance) {
      renderAcknowledgement();
      return;
    }

    if (state.current === 'relations') {
      interactionLifecycle.renderCurrent(stepShell('Which relations contain the information we need?', '<p class="step-copy">In the Live Schema on the left, find the relevant relations and add them to the Working Schema beside this task.</p><button id="continue-relations" class="primary" disabled>Check selection</button>' + feedbackMarkup()));
      const relationButton = document.getElementById('continue-relations');
      relationButton.disabled = !state.selectedRelations.length;
      relationButton.addEventListener('click', () => {
        if (!hasExactRequiredRelations()) return wrong('The selection does not yet provide both funding-round context and recorded investor-participation information. Reinspect the Live Schema and revise it.');
        record({
          evidence: 'relations',
          prompt: 'Which relations contain the information we need?',
          answer: 'funding_round and round_investment',
          feedback: '<div class="success-feedback">Correct. <code>funding_round</code> gives us the round context, and <code>round_investment</code> contains the recorded investor participations.</div>',
          next: 'connection',
        });
      });
    } else if (state.current === 'connection') {
      interactionLifecycle.renderCurrent(stepShell('Which column in <code>round_investment</code> tells us which funding round a participation belongs to?', `<p class="step-copy">In the Working Schema, select the column that connects each participation to its funding round.</p><button id="check-column" class="primary" ${state.selectedColumn ? '' : 'disabled'}>Check selected column</button>${feedbackMarkup()}`, teacherVoice('You found the relations that supply the round context and participation records. Now trace from a participation to its funding round so we can establish how those relations connect.')));
      document.getElementById('check-column').addEventListener('click', () => {
        if (state.selectedColumn !== 'funding_round_id') return wrong('Look at one participation row and ask which column identifies the funding round that participation belongs to. The relationship stays hidden until you establish that connection.');
        record({
          evidence: 'connection',
          prompt: 'Which column in round_investment tells us which funding round a participation belongs to?',
          answer: 'round_investment.funding_round_id',
          feedback: '<div class="success-feedback">Correct. <code>funding_round_id</code> identifies the funding round for this participation.</div><div class="concept-callout"><strong>REUSED RELATIONSHIP PATTERN</strong><b>Primary Key / Foreign Key</b><span><code>round_investment.funding_round_id</code> is the Foreign Key (FK). It points to <code>funding_round.funding_round_id</code>, the Primary Key (PK), so the participation can be matched with its round context.</span></div>',
          next: 'cardinality',
        });
      });
    } else if (state.current === 'cardinality') {
      choiceQuestion({
        intro: teacherVoice('In the Working Schema, the key connection you found is now visible. Use it to read the relationship in both directions.'),
        prompt: 'Which statement best describes what can happen across the two relations?',
        options: [
          ['correct', 'One funding round can have many participation records; each participation belongs to one funding round.'],
          ['participation-many', 'One participation can belong to many funding rounds.'],
          ['round-one', 'Each funding round can have only one participation record.'],
          ['many', 'A participation can belong to many rounds, and a round can belong to many participations.'],
        ],
        correct: 'correct', evidence: 'cardinality', next: 'output',
        feedback: '<div class="success-feedback">Correct. One funding round can have many participation records, while each participation belongs to one funding round.</div><div class="concept-callout"><strong>REUSED CONCEPT</strong><b>Cardinality</b><span>This is a one-to-many relationship: one <code>funding_round</code> → many <code>round_investment</code> rows.</span></div>',
        wrongFeedback: 'Use the relationship you just found: each participation stores one funding_round_id, while the same funding_round_id can appear in multiple participation rows.',
      });
    } else if (state.current === 'output') {
      choiceQuestion({
        intro: teacherVoice('You established the one-to-many relationship. Now return to the review request: it—not the relationship alone—will tell us what each requested result row should represent.'),
        prompt: 'If the result should show who took part in each funding round, what should one result row represent?',
        options: [['participation', 'one recorded round-investor participation'], ['round', 'one funding round'], ['investor', 'one investor across all rounds'], ['company', 'one company']],
        correct: 'participation', evidence: 'output', next: 'baselineRun',
        feedback: '<div class="success-feedback">Correct. Each row is about one recorded participation. Funding-round information can be carried alongside it without changing that row meaning.</div><div class="concept-callout"><strong>REUSED CONCEPT</strong><b>Grain</b><span>The requested result Grain is one recorded round-investor participation per row.</span></div>',
        wrongFeedback: 'The review needs each recorded participation to remain individually visible. What must one result row represent to preserve that?',
      });
    } else if (state.current === 'baselineRun') {
      if (!state.baselineExecuted) {
        interactionLifecycle.renderCurrent(stepShell('How many funding-round rows are on the one-side before the JOIN?', `${teacherVoice('You established a participation-level result Grain. Now move to the SQL Workspace beside this task and measure the one-side starting reference before participation rows are matched to it.')}<div class="measurement-note"><code>COUNT(*)</code> counts the rows in <code>funding_round</code>. Run the prepared measurement in the SQL Workspace; you do not need to write SQL yet. Then inspect Results directly below it.</div>${feedbackMarkup()}`));
      } else {
        renderBaselineInterpretation();
      }
    } else if (state.current === 'prediction') {
      renderPrediction();
    } else if (state.current === 'operation') {
      choiceQuestion({
        intro: teacherVoice('We now know the result should keep one participation per row while carrying the matching round context.'),
        prompt: 'What should we do with the funding-round rows and their matching participation rows?',
        options: [['combine', 'Combine each funding round with its matching participation rows.'], ['filter', 'Filter funding rounds down to one participation each.'], ['aggregate', 'Aggregate all participations for a round into one row.']],
        correct: 'combine', evidence: 'operation', next: 'joinTeaching',
        feedback: '<div class="success-feedback">Correct. We need to combine each funding round with its matching participation rows. This reuses the JOIN operation you already learned.</div>',
        wrongFeedback: 'The review must keep every participation row visible while adding the matching round context. Do not filter or collapse the participation records.',
      });
    } else if (state.current === 'joinTeaching') {
      renderJoinTeaching();
    } else if (state.current === 'sql') {
      interactionLifecycle.renderCurrent(stepShell('Now translate the relationship into SQL.', `<p class="step-copy">Move to the SQL Workspace and write the participation query from the business request and the established relationship.</p>
        <details class="optional-scaffold desired-output"><summary>Show desired output</summary><div class="optional-scaffold-body"><div class="desired-output-grid"><code>funding_round_id</code><code>round_type</code><code>announced_date</code><code>round_investment_id</code><code>investor_id</code><code>is_lead</code></div><p>Return these six fields in this order.</p></div></details>
        <details class="optional-scaffold sql-structure"><summary>Show SQL structure</summary><div class="optional-scaffold-body"><pre>SELECT ...
FROM funding_round
JOIN round_investment
  ON ...</pre><p>Use <code>JOIN</code> to add the participation relation and <code>ON</code> to express the relationship you already established.</p></div></details>
        <p class="implementation-check"><strong>Earlier prediction:</strong> one funding round can appear across several participation rows.</p>${feedbackMarkup()}`, teacherVoice('You mapped the round rows, matching participations, and ON relationship while keeping one participation per result row. Implement that same map now; the earlier multiplication prediction gives you a result pattern to check afterward.')));
    } else if (state.current === 'finalGrain') {
      renderFinalVerification();
    } else if (state.current === 'complete') {
      const requiredEvidence = ['relations', 'connection', 'cardinality', 'output', 'baseline', 'prediction', 'operation', 'sql', 'finalGrain'];
      const complete = requiredEvidence.every((item) => state.evidence.has(item));
      interactionLifecycle.renderCurrent(stepShell('Stage complete', `<div class="completion-state"><div class="completion-icon">✓</div><p>${complete ? 'You predicted JOIN row multiplication from the relationship and result Grain, then verified it in the 72-row participation result.' : 'The required learning evidence is incomplete.'}</p></div>`));
    }
  }

  function normalizedRows(values) { return values.map((row) => JSON.stringify(row)).sort(); }

  function validateParticipationResult(statement, resultSets) {
    if (!resultSets.length || !/\b(?:inner\s+)?join\b/i.test(statement) || !/\bon\b/i.test(statement)) return false;
    if (/\b(?:distinct|group\s+by|having|left\s+join|union)\b/i.test(statement)) return false;
    const result = resultSets.at(-1);
    if (result.columns.length !== 6 || result.values.length !== 72) return false;
    const expectedColumns = ['funding_round_id', 'round_type', 'announced_date', 'round_investment_id', 'investor_id', 'is_lead'];
    const columns = result.columns.map((column) => column.toLowerCase());
    if (!columns.every((column, index) => column === expectedColumns[index])) return false;
    const expected = getDatabase().exec(`SELECT
      funding_round.funding_round_id,
      funding_round.round_type,
      funding_round.announced_date,
      round_investment.round_investment_id,
      round_investment.investor_id,
      round_investment.is_lead
    FROM funding_round
    INNER JOIN round_investment
      ON funding_round.funding_round_id = round_investment.funding_round_id;`)[0]?.values ?? [];
    const actualRows = normalizedRows(result.values);
    const expectedRows = normalizedRows(expected);
    return actualRows.every((row, index) => row === expectedRows[index]);
  }

  function handleSqlSuccess(statement, resultSets) {
    if (state.current === 'baselineRun' && !state.baselineExecuted) {
      const result = resultSets.at(-1);
      if (statement.trim() !== BASELINE_SQL || result?.values?.[0]?.[0] !== 26) return wrong('Run the prepared measurement to establish the funding-round starting count. Reset the database and try again if it does not return 26.');
      state.baselineExecuted = true;
      state.localFeedback = '';
      render();
      return;
    }
    if (state.current !== 'sql' || state.pendingAdvance) return;
    if (!validateParticipationResult(statement, resultSets)) return wrong('The SQL ran, but the result does not yet match the requested six-column participation output. Open Desired output if you need the exact column contract, then inspect the selected fields and the relationship in ON.');
    record({
      evidence: 'sql',
      prompt: 'Return the participation review with funding-round context.',
      answer: 'Query ran successfully',
      answerLabel: 'Result',
      feedback: '<div class="success-feedback">The query ran successfully. Inspect the result.</div>',
      next: 'finalGrain',
    });
  }

  render();
  return {
    handleSqlSuccess,
    current: () => state.current,
    addRelation,
    isRelationSelected: (name) => state.selectedRelations.includes(name),
    relationshipLevel,
    canAddRelations: () => state.current === 'relations' && !state.pendingAdvance,
    refresh: render,
  };
}
