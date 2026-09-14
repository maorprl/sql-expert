import './inner-join-unmatched.css';

const BUSINESS_REQUEST = 'The investment team wants a table of companies that have recorded funding rounds, with each company\'s status alongside the round type and announced date.';
const REQUIRED_RELATIONS = ['funding_round', 'company'];
const COMPANY_EVIDENCE_SQL = `SELECT company_id, name
FROM company;`;
const FUNDING_EVIDENCE_SQL = `SELECT company_id, funding_round_id
FROM funding_round;`;

const INTERACTION_LABELS = {
  relations: 'Identify relevant relations',
  connection: 'Understand the relationship',
  cardinality: 'Reason about possible matches',
  output: 'Determine row meaning',
  matchEvidence: 'Inspect the data',
  prediction: 'Predict INNER JOIN behavior',
  sql: 'Implement the INNER JOIN',
  verification: 'Verify which rows survived',
  transfer: 'Check the changed requirement',
  complete: 'Stage complete',
};

export function createInnerJoinUnmatched({ editor, getDatabase, getSchema, onSelectionChange, interactionLifecycle }) {
  const state = {
    current: 'relations',
    completed: [],
    evidence: new Set(),
    drafts: {},
    localFeedback: '',
    selectedRelations: [],
    selectedColumn: '',
    matchEvidencePhase: 'companies',
    measurementPrepared: '',
    companyEvidenceRows: [],
    fundingEvidenceRows: [],
    unmatchedCompanyId: '',
    unmatchedCompanyName: '',
    implementationPrepared: false,
    pendingAdvance: null,
  };

  const relationEl = document.getElementById('relation-preview');
  const workingStatusEl = document.getElementById('working-schema-status');
  const labEl = document.getElementById('lab-workspace');
  const learningEl = document.querySelector('.learning-panel');
  const solutionButton = document.getElementById('show-solution');

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

  function companyReference(name, companyId) {
    return `${name} (company_id ${companyId})`;
  }

  function showSolution() {
    if (document.title !== 'SQL Lab · INNER JOIN unmatched rows' || state.current !== 'sql' || !learningEl.classList.contains('sql-implementation-active')) return;
    const panel = document.getElementById('solution-panel');
    if (!panel) return;
    panel.innerHTML = `<div class="solution-panel-heading"><span>Solution assistance</span><button id="close-solution" type="button" aria-label="Close solution">Close</button></div><div class="solution-panel-body"><strong>Solution SQL:</strong><pre>SELECT
  company.company_id,
  company.status,
  funding_round.funding_round_id,
  funding_round.round_type,
  funding_round.announced_date
FROM company
JOIN funding_round
  ON company.company_id = funding_round.company_id;</pre><p>This is assistance only. It has not been inserted or run.</p></div>`;
    panel.hidden = false;
    document.getElementById('close-solution').addEventListener('click', () => {
      panel.hidden = true;
      panel.innerHTML = '';
    });
  }

  solutionButton?.addEventListener('click', showSolution);

  function relationshipLevel() {
    if (state.evidence.has('cardinality')) return 2;
    if (state.evidence.has('connection')) return 1;
    return 0;
  }

  function renderColumn(relation, column) {
    const keyLevel = relationshipLevel();
    const isConnectingChoice = state.current === 'connection' && !state.pendingAdvance && relation.name === 'funding_round';
    const isSelected = isConnectingChoice && state.selectedColumn === column.column;
    const isRoundForeignKey = keyLevel > 0 && relation.name === 'funding_round' && column.column === 'company_id';
    const isCompanyPrimaryKey = keyLevel > 0 && relation.name === 'company' && column.column === 'company_id';
    const isOutputField = ['sql', 'verification', 'transfer', 'complete'].includes(state.current)
      && ((relation.name === 'company' && ['company_id', 'status'].includes(column.column))
        || (relation.name === 'funding_round' && ['funding_round_id', 'round_type', 'announced_date'].includes(column.column)));
    const classes = [
      isSelected ? 'selected-column' : '',
      isRoundForeignKey || isCompanyPrimaryKey ? 'relationship-column' : '',
      isOutputField ? 'output-column' : '',
    ].filter(Boolean).join(' ');
    const badge = isRoundForeignKey ? '<span class="key-badge">FK</span>' : isCompanyPrimaryKey ? '<span class="key-badge">PK</span>' : '';
    const content = `<code>${escapeHtml(column.column)}</code>${badge}`;
    return isConnectingChoice
      ? `<li><button type="button" class="working-column ${classes}" data-working-column="${escapeHtml(column.column)}">${content}</button></li>`
      : `<li class="working-column ${classes}">${content}</li>`;
  }

  function orderedSelectedRelations() {
    const selected = state.selectedRelations
      .map((name) => getSchema().find((relation) => relation.name === name))
      .filter(Boolean);
    if (!REQUIRED_RELATIONS.every((name) => state.selectedRelations.includes(name))) return selected;
    return [
      ...REQUIRED_RELATIONS.map((name) => selected.find((relation) => relation.name === name)),
      ...selected.filter((relation) => !REQUIRED_RELATIONS.includes(relation.name)),
    ];
  }

  function renderRelations() {
    const selected = orderedSelectedRelations();
    const showRelationship = relationshipLevel() > 0 && REQUIRED_RELATIONS.every((name) => state.selectedRelations.includes(name));
    relationEl.classList.toggle('relationship-visible', showRelationship);
    relationEl.classList.toggle('cardinality-visible', relationshipLevel() > 1);

    const status = state.current === 'relations' && !state.pendingAdvance ? 'Build it from the live schema' : '';
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
      cards.splice(1, 0, '<div class="schema-connector" aria-label="funding_round.company_id matches company.company_id"><span class="connector-line"></span></div>');
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

  function hasExactRequiredRelations() {
    return state.selectedRelations.length === REQUIRED_RELATIONS.length
      && REQUIRED_RELATIONS.every((name) => state.selectedRelations.includes(name));
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
    state.selectedColumn = '';
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

  function wrong(feedback) {
    state.localFeedback = feedback;
    render();
  }

  function feedbackMarkup() {
    return state.localFeedback
      ? `<div class="local-feedback incorrect" role="alert"><strong>Not quite.</strong> ${state.localFeedback.replace(/^Not quite\.\s*/i, '')}</div>`
      : '';
  }

  function stepShell(prompt, body, intro = '') {
    const label = INTERACTION_LABELS[state.current];
    return state.current !== 'complete'
      ? `<div class="step-kicker">${label}</div>${intro}<h2 class="prompt">${prompt}</h2>${body}`
      : `<h2 class="prompt">${prompt}</h2>${body}`;
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
    const unmatched = companyReference(state.unmatchedCompanyName, state.unmatchedCompanyId);

    if (item.id === 'matchEvidence' && next === 'prediction') {
      interactionLifecycle.renderCurrent(stepShell('Zero-match case established.', teacherVoice(`You found a real zero-match case: ${escapeHtml(unmatched)} exists on the company side, but there is no funding-round row to pair with it. That matters because matched rows alone cannot show what INNER JOIN does when no pair exists. Before writing SQL, predict whether this starting row disappears or survives in some form.`)));
      renderWorkspaceAction(`
        ${item.feedback}
        <button id="continue-to-prediction" class="primary continue-after-feedback">Continue to prediction</button>
      `, 'baseline-followup');
      continueFromPending('continue-to-prediction');
      return;
    }

    if (item.id === 'prediction' && next === 'sql') {
      interactionLifecycle.renderCurrent(stepShell('Prediction established.', teacherVoice('You now have a prediction grounded in the data you inspected. Next, implement the company-to-round INNER JOIN and test that prediction against the actual result.')));
      renderWorkspaceAction(`
        ${item.feedback}
        <button id="continue-to-sql" class="primary continue-after-feedback">Continue to SQL implementation</button>
      `, 'prediction-followup');
      continueFromPending('continue-to-sql');
      return;
    }

    if (item.id === 'sql' && next === 'verification') {
      interactionLifecycle.renderCurrent(stepShell('Inspect the result.', teacherVoice(`Your activity has moved from authoring to evidence. Keep Results visible and check whether ${escapeHtml(unmatched)} appears before deciding whether the earlier prediction held.`)));
      renderWorkspaceAction(`
        ${item.feedback}
        <button id="continue-to-verification" class="primary continue-after-feedback">Continue to verification</button>
      `, 'result-followup');
      continueFromPending('continue-to-verification');
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
      record({
        evidence,
        prompt,
        answer: stripMarkup(options.find(([value]) => value === answer)[1]),
        value: answer,
        options,
        feedback,
        next,
      });
    });
  }

  function normalizeSql(statement) {
    return statement.trim().replace(/;+\s*$/, '').replace(/\s+/g, ' ').toLowerCase();
  }

  function validatePreparedMeasurement(statement, resultSets, expectedSql, expectedColumns) {
    if (normalizeSql(statement) !== normalizeSql(expectedSql) || !resultSets.length) return null;
    const result = resultSets.at(-1);
    const columns = result.columns.map((column) => column.toLowerCase());
    if (columns.length !== expectedColumns.length || !columns.every((column, index) => column === expectedColumns[index])) return null;
    return result;
  }

  function unmatchedCompanyIds() {
    const companyIds = state.companyEvidenceRows.map(([companyId]) => String(companyId));
    const fundingCompanyIds = new Set(state.fundingEvidenceRows.map(([companyId]) => String(companyId)));
    return companyIds.filter((companyId) => !fundingCompanyIds.has(companyId));
  }

  function updateWorkspaceVisibility() {
    const measurementWorkspace = state.current === 'matchEvidence';
    const measurementEvidence = measurementWorkspace && ['companyCaptured', 'compare'].includes(state.matchEvidencePhase);
    const predictionEvidence = state.current === 'prediction';
    const resultEvidence = (state.current === 'sql' && state.pendingAdvance?.next === 'verification')
      || ['verification', 'transfer'].includes(state.current);
    const implementationWorkspace = state.current === 'sql' || resultEvidence;
    const visible = measurementWorkspace || predictionEvidence || implementationWorkspace;
    const sqlImplementation = state.current === 'sql' && !resultEvidence;

    if (state.current === 'matchEvidence') {
      const expectedPhase = state.matchEvidencePhase === 'funding' ? 'funding' : 'companies';
      if (['companies', 'funding'].includes(state.matchEvidencePhase) && state.measurementPrepared !== expectedPhase) {
        editor.setValue(expectedPhase === 'companies' ? COMPANY_EVIDENCE_SQL : FUNDING_EVIDENCE_SQL, -1);
        document.getElementById('clear-results').click();
        state.measurementPrepared = expectedPhase;
      }
    }

    if (state.current === 'sql' && !state.implementationPrepared) {
      editor.setValue('', -1);
      document.getElementById('clear-results').click();
      state.implementationPrepared = true;
    }

    labEl.hidden = !visible;
    learningEl.classList.toggle('sql-active', visible);
    learningEl.classList.toggle('baseline-workspace-active', measurementWorkspace || predictionEvidence);
    learningEl.classList.toggle('baseline-evidence-active', measurementEvidence);
    learningEl.classList.toggle('prediction-evidence-active', predictionEvidence);
    learningEl.classList.remove('join-teaching-active');
    learningEl.classList.toggle('sql-implementation-active', sqlImplementation);
    learningEl.classList.toggle('results-evidence-active', resultEvidence);
    learningEl.dataset.stage3State = resultEvidence ? 'results' : state.current;

    document.querySelector('.editor-header h2').textContent = measurementWorkspace || predictionEvidence ? 'Evidence measurement' : 'INNER JOIN implementation';
    document.querySelectorAll('.lab-action').forEach((element) => {
      element.hidden = !visible || measurementEvidence || predictionEvidence || resultEvidence;
    });
    const runButton = document.getElementById('run-query');
    runButton.disabled = runButton.hidden;
  }

  function renderMatchEvidence() {
    if (state.matchEvidencePhase === 'companies') {
      interactionLifecycle.renderCurrent(stepShell(
        'Establish which companies exist in the current data.',
        `${teacherVoice('You established that one requested result row represents one recorded funding round. Before predicting INNER JOIN behavior, inspect the actual data and establish whether every company has a matching funding-round row.')}<div class="measurement-note">Run the prepared query in the SQL Workspace; you do not need to write SQL yet. This first measurement gives you each company name together with the key you will compare in the next measurement.</div>${feedbackMarkup()}`,
      ));
      return;
    }

    if (state.matchEvidencePhase === 'companyCaptured') {
      interactionLifecycle.renderCurrent(stepShell(
        'Company rows established.',
        teacherVoice('You now have the companies that exist and their company IDs. Next inspect the funding-round rows so you can compare which of those company IDs actually have matches.'),
      ));
      const action = renderWorkspaceAction(`
        <div class="success-feedback">Company evidence captured from the query you ran.</div>
        <button id="continue-to-funding-measurement" class="primary">Continue to funding-round evidence</button>
      `, 'baseline-followup');
      action.querySelector('#continue-to-funding-measurement').addEventListener('click', () => {
        state.matchEvidencePhase = 'funding';
        state.localFeedback = '';
        render();
        onSelectionChange();
      });
      return;
    }

    if (state.matchEvidencePhase === 'funding') {
      const companies = state.companyEvidenceRows.map(([companyId, name]) => ({ companyId: String(companyId), name: String(name) }));
      interactionLifecycle.renderCurrent(stepShell(
        'Which funding-round rows point to those companies?',
        `${teacherVoice('Now inspect the funding-round rows. Compare their company IDs with the named company rows you already established.')}<div class="measurement-note">Run the prepared query in the SQL Workspace; you do not need to write SQL yet. Then use the two measurements together.</div>${feedbackMarkup()}`,
      ));
      renderWorkspaceAction(`
        <div class="evidence-kicker">Established from your first measurement</div>
        <div class="verification-prompt"><strong>Companies in company</strong><span>${companies.map(({ companyId, name }) => `${escapeHtml(name)} <code>${escapeHtml(companyId)}</code>`).join(' · ')}</span></div>
      `, 'baseline-followup');
      return;
    }

    const companies = state.companyEvidenceRows.map(([companyId, name]) => ({ companyId: String(companyId), name: String(name) }));
    const options = companies.map(({ companyId, name }) => [companyId, `${name} (company_id ${companyId})`]);
    const correctIds = unmatchedCompanyIds();
    const draft = state.drafts.matchEvidence || '';
    interactionLifecycle.renderCurrent(stepShell(
      'Compare the measurements.',
      teacherVoice('Keep the funding_round Results in view and compare them with the named companies from your first measurement. Find the company that exists in company but has no matching funding-round row.'),
    ));
    const action = renderWorkspaceAction(`
      <div class="evidence-kicker">First measurement: company rows</div>
      <div class="verification-prompt"><strong>Companies you returned</strong><span>${companies.map(({ companyId, name }) => `${escapeHtml(name)} <code>${escapeHtml(companyId)}</code>`).join(' · ')}</span></div>
      <h3>Which company appears in <code>company</code> but nowhere in the <code>funding_round</code> Results?</h3>
      <form id="match-evidence-form" class="answer-form">
        <fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${escapeHtml(value)}" ${draft === value ? 'checked' : ''}> <span>${escapeHtml(label)}</span></label>`).join('')}</fieldset>
        <button class="primary" type="submit">Check answer</button>
      </form>
      ${feedbackMarkup()}
    `, 'baseline-interpretation');

    action.querySelector('#match-evidence-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = String(new FormData(event.currentTarget).get('answer') || '');
      state.drafts.matchEvidence = answer;
      if (!correctIds.includes(answer)) return wrong('Compare that company_id with the funding_round Results again. Look for whether it appears anywhere in the first column.');
      const company = companies.find(({ companyId }) => companyId === answer);
      state.unmatchedCompanyId = answer;
      state.unmatchedCompanyName = company?.name || `company ${answer}`;
      const unmatched = companyReference(state.unmatchedCompanyName, answer);
      record({
        evidence: 'matchEvidence',
        prompt: 'Which company appears in company but nowhere in the funding_round Results?',
        answer: `${unmatched} has no matching funding_round row`,
        value: answer,
        options,
        feedback: `<div class="success-feedback">Correct. From the two query results, you established that ${escapeHtml(unmatched)} exists in <code>company</code> but has no matching row in <code>funding_round</code>. This gives you a real zero-match case to test.</div><div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>NULL versus no result row</b><span><code>NULL</code> means a value is missing or unknown inside a row that exists. That is different from the row not appearing in the result at all.</span></div>`,
        next: 'prediction',
      });
    });
  }

  function renderPrediction() {
    const companyId = state.unmatchedCompanyId;
    const companyName = state.unmatchedCompanyName;
    const unmatched = companyReference(companyName, companyId);
    const options = [
      ['zero', `${companyName} contributes 0 result rows because there is no matching funding_round row.`],
      ['null-row', `${companyName} appears once: company_id and status remain, while funding_round_id, round_type, and announced_date are NULL.`],
      ['preserved', `${companyName} appears once because every company contributes at least one result row.`],
    ];
    const draft = state.drafts.prediction || '';
    interactionLifecycle.renderCurrent(stepShell(
      'Predict from the evidence.',
      teacherVoice(`You now have a real zero-match case and the distinction between no result row and a row containing NULL. Use the INNER JOIN matching behavior you already know to predict which outcome applies to ${escapeHtml(unmatched)} before writing SQL.`),
    ));
    const action = renderWorkspaceAction(`
      <div class="verification-prompt"><strong>Established evidence</strong><span>${escapeHtml(unmatched)} exists in <code>company</code> and has no matching row in <code>funding_round</code>.</span></div>
      <h3>What will the INNER JOIN do with ${escapeHtml(companyName)}?</h3>
      <form id="prediction-answer-form" class="answer-form">
        <fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${value}" ${draft === value ? 'checked' : ''}> <span>${escapeHtml(label)}</span></label>`).join('')}</fieldset>
        <button class="primary" type="submit">Check answer</button>
      </form>
      ${feedbackMarkup()}
    `, 'prediction-question');
    action.querySelector('#prediction-answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.prediction = answer || '';
      if (answer !== 'zero') return wrong('Use the evidence you established: INNER JOIN can produce a result row only from a matched row pair. How many matched pairs can this company produce?');
      record({
        evidence: 'prediction',
        prompt: `What will the INNER JOIN do with ${companyName}?`,
        answer: stripMarkup(options.find(([value]) => value === answer)[1]),
        value: answer,
        options,
        feedback: `<div class="success-feedback">Correct. With no matching funding-round row, ${escapeHtml(companyName)} contributes no INNER JOIN result row.</div><div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>INNER JOIN row survival</b><span>A starting row with zero matches contributes zero result rows. An unmatched row does not survive an INNER JOIN.</span></div>`,
        next: 'sql',
      });
    });
  }

  function renderVerification() {
    const companyId = state.unmatchedCompanyId;
    const companyName = state.unmatchedCompanyName;
    const options = [
      ['absent', `${companyName} is absent from the result, matching the zero-row prediction.`],
      ['null-row', `${companyName} appears once: company_id and status remain, while funding_round_id, round_type, and announced_date are NULL.`],
      ['one-row', `${companyName} appears once because INNER JOIN preserves every company row.`],
    ];
    const draft = state.drafts.verification || '';
    interactionLifecycle.renderCurrent(stepShell(
      `What does the actual result show about ${escapeHtml(companyName)}?`,
      `<div class="verification-prompt"><strong>Earlier prediction</strong><span>${escapeHtml(companyName)} (company_id ${escapeHtml(companyId)}) contributes 0 INNER JOIN result rows.</span></div>
      <form id="verification-answer-form" class="answer-form">
        <fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${value}" ${draft === value ? 'checked' : ''}> <span>${escapeHtml(label)}</span></label>`).join('')}</fieldset>
        <button class="primary" type="submit">Check answer</button>
      </form>
      ${feedbackMarkup()}`,
      teacherVoice(`Use Results as the evidence surface. Search the company_id column for ${escapeHtml(companyId)} rather than relying on the prediction alone.`),
    ));
    document.getElementById('verification-answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.verification = answer || '';
      if (answer !== 'absent') return wrong(`Inspect the result rows and look specifically for company_id ${companyId}. Decide from the visible result whether that company survived the INNER JOIN.`);
      record({
        evidence: 'verification',
        prompt: `What does the actual result show about ${companyName}?`,
        answer: stripMarkup(options.find(([value]) => value === answer)[1]),
        value: answer,
        options,
        feedback: `<div class="success-feedback">Correct. The result verifies the zero-match case: ${escapeHtml(companyName)} is absent because no funding-round row matched it.</div>`,
        next: 'transfer',
      });
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
      interactionLifecycle.renderCurrent(stepShell(
        'Which relations contain the information we need?',
        `<p class="step-copy">In the Live Schema on the left, find the relevant relations and add them to the Working Schema beside this task.</p><button id="continue-relations" class="primary" disabled>Check selection</button>${feedbackMarkup()}`,
      ));
      const relationButton = document.getElementById('continue-relations');
      relationButton.disabled = !state.selectedRelations.length;
      relationButton.addEventListener('click', () => {
        if (!hasExactRequiredRelations()) return wrong('The request needs company status and the funding-round records themselves. Reinspect which relations store those two things and revise the selection.');
        record({
          evidence: 'relations',
          prompt: 'Which relations contain the information we need?',
          answer: 'company and funding_round',
          feedback: '<div class="success-feedback">Correct. <code>company</code> contains company status, and <code>funding_round</code> contains the recorded round details.</div>',
          next: 'connection',
        });
      });
    } else if (state.current === 'connection') {
      interactionLifecycle.renderCurrent(stepShell(
        'Which column in <code>funding_round</code> identifies the company that the round belongs to?',
        `<p class="step-copy">In the Working Schema, select the column that connects each funding round to its company.</p><button id="check-column" class="primary" ${state.selectedColumn ? '' : 'disabled'}>Check selected column</button>${feedbackMarkup()}`,
        teacherVoice('You found the relations that supply company context and recorded round details. Now trace from a funding round to its company so we can establish how those relations connect.'),
      ));
      document.getElementById('check-column').addEventListener('click', () => {
        if (state.selectedColumn !== 'company_id') return wrong('Look at one funding-round row and ask which column identifies the company that round belongs to.');
        record({
          evidence: 'connection',
          prompt: 'Which column in funding_round identifies the company that the round belongs to?',
          answer: 'funding_round.company_id',
          feedback: '<div class="success-feedback">Correct. <code>funding_round.company_id</code> identifies the company for that round.</div><div class="concept-callout"><strong>REUSED RELATIONSHIP PATTERN</strong><b>Primary Key / Foreign Key</b><span><code>funding_round.company_id</code> is the Foreign Key (FK). It points to <code>company.company_id</code>, the Primary Key (PK).</span></div>',
          next: 'cardinality',
        });
      });
    } else if (state.current === 'cardinality') {
      choiceQuestion({
        intro: teacherVoice('In the Working Schema, the key connection you found is now visible. Use it to read the established relationship in both directions before predicting what the JOIN can do.'),
        prompt: 'Which statement best describes the relationship?',
        options: [
          ['correct', 'A company can have no recorded funding round, one round, or many rounds; each funding round belongs to one company.'],
          ['one-only', 'Every company must have exactly one funding round.'],
          ['round-many', 'A single funding round can belong to many companies.'],
          ['many-many', 'Companies and funding rounds are many-to-many.'],
        ],
        correct: 'correct',
        evidence: 'cardinality',
        next: 'output',
        feedback: '<div class="success-feedback">Correct. From the company side, the relationship can currently produce zero, one, or many matching funding-round rows. Each funding round points to one company.</div><div class="concept-callout"><strong>REUSED CONCEPT</strong><b>Cardinality</b><span><code>company</code> → <code>funding_round</code> is one-to-many, with the company side allowed to have no matching child row.</span></div>',
        wrongFeedback: 'Use the Foreign Key direction: every funding_round row stores one company_id, but a company row does not require a funding_round row to exist.',
      });
    } else if (state.current === 'output') {
      choiceQuestion({
        intro: teacherVoice('You established that a company can have zero, one, or many recorded rounds. Now return to the business request so its organizing subject—not cardinality alone—determines what one result row should represent.'),
        prompt: 'What should one result row represent?',
        options: [
          ['round', 'one recorded funding round, with its company status alongside it'],
          ['company', 'one company, regardless of how many funding rounds it has'],
          ['status', 'one company status value'],
          ['pair', 'one arbitrary company-round pair, even when the IDs do not match'],
        ],
        correct: 'round',
        evidence: 'output',
        next: 'matchEvidence',
        feedback: '<div class="success-feedback">Correct. The result Grain is one recorded funding round per row. Company fields can repeat when a company has several rounds.</div><div class="concept-callout"><strong>REUSED CONCEPT</strong><b>Grain</b><span>The JOIN should preserve each matched funding-round row as one result row.</span></div>',
        wrongFeedback: 'The request needs every recorded funding round to stay individually visible. What must one row represent for that to remain true?',
      });
    } else if (state.current === 'matchEvidence') {
      renderMatchEvidence();
    } else if (state.current === 'prediction') {
      renderPrediction();
    } else if (state.current === 'sql') {
      interactionLifecycle.renderCurrent(stepShell(
        'Implement the INNER JOIN you already know.',
        `<p class="step-copy">Move to the SQL Workspace and return the requested company context and funding-round details using the relationship you established.</p>
        <details class="optional-scaffold desired-output"><summary>Show desired output</summary><div class="optional-scaffold-body"><div class="desired-output-grid"><code>company_id</code><code>status</code><code>funding_round_id</code><code>round_type</code><code>announced_date</code></div><p>Return these five fields in this order.</p></div></details>
        <details class="optional-scaffold sql-structure"><summary>Show SQL structure</summary><div class="optional-scaffold-body"><pre>SELECT ...
FROM company
JOIN funding_round
  ON ...</pre><p>Reuse the same INNER JOIN pattern. No new JOIN syntax is needed in this stage.</p></div></details>
        <p class="implementation-check"><strong>Prediction to verify:</strong> ${escapeHtml(state.unmatchedCompanyName)} (company_id ${escapeHtml(state.unmatchedCompanyId)}) has no matching funding-round row, so you predicted it will contribute zero INNER JOIN rows.</p>${feedbackMarkup()}`,
        teacherVoice('You discovered the unmatched company from the data and predicted what INNER JOIN will do with it. Implement the established company-to-round relationship with the INNER JOIN you already know, then use Results to test that prediction.'),
      ));
    } else if (state.current === 'verification') {
      renderVerification();
    } else if (state.current === 'transfer') {
      choiceQuestion({
        intro: teacherVoice(`You verified from Results that ${escapeHtml(state.unmatchedCompanyName)} (company_id ${escapeHtml(state.unmatchedCompanyId)}) disappears when it has no matching funding round. Keep that evidence in view while you change only the business requirement; do not change the SQL yet.`),
        prompt: 'Suppose the request changes to: “include every company, even when it has no recorded funding round.” Would this INNER JOIN still satisfy the request?',
        options: [
          ['no', 'No. Companies with zero matching funding rounds would still disappear.'],
          ['yes', 'Yes. INNER JOIN always keeps every row from company.'],
          ['null', 'Yes. INNER JOIN would keep the company and return NULL for funding_round_id, round_type, and announced_date.'],
        ],
        correct: 'no',
        evidence: 'transfer',
        next: 'complete',
        feedback: '<div class="success-feedback">Correct. The changed requirement needs unmatched company rows to survive, while this INNER JOIN removes them. That is a different join requirement.</div>',
        wrongFeedback: `Use ${state.unmatchedCompanyName} (company_id ${state.unmatchedCompanyId}) as evidence. It has no matching funding_round row and is absent from the INNER JOIN result.`,
      });
    } else if (state.current === 'complete') {
      const requiredEvidence = ['relations', 'connection', 'cardinality', 'output', 'matchEvidence', 'prediction', 'sql', 'verification', 'transfer'];
      const complete = requiredEvidence.every((item) => state.evidence.has(item));
      interactionLifecycle.renderCurrent(stepShell('Stage complete', `<div class="completion-state"><div class="completion-icon">✓</div><p>${complete ? 'You discovered a company with no matching funding round, predicted that INNER JOIN would omit it, and verified that zero-match behavior in the actual result.' : 'The required learning evidence is incomplete.'}</p></div>`));
    }
  }

  function normalizedRows(values) {
    return values.map((row) => JSON.stringify(row)).sort();
  }

  function validateResult(statement, resultSets) {
    const joinCount = statement.match(/\b(?:inner\s+)?join\b/gi)?.length ?? 0;
    if (joinCount !== 1 || !/\bon\b/i.test(statement) || !resultSets.length) return false;
    if (/\b(?:left\s+join|left\s+outer\s+join|distinct|group\s+by|having|union)\b/i.test(statement)) return false;

    const result = resultSets.at(-1);
    const expectedColumns = ['company_id', 'status', 'funding_round_id', 'round_type', 'announced_date'];
    if (result.columns.length !== expectedColumns.length || result.values.length !== 26) return false;
    const columns = result.columns.map((column) => column.toLowerCase());
    if (!columns.every((column, index) => column === expectedColumns[index])) return false;

    const expected = getDatabase().exec(`SELECT
      company.company_id,
      company.status,
      funding_round.funding_round_id,
      funding_round.round_type,
      funding_round.announced_date
    FROM company
    INNER JOIN funding_round
      ON company.company_id = funding_round.company_id;`)[0]?.values ?? [];

    const actualRows = normalizedRows(result.values);
    const expectedRows = normalizedRows(expected);
    return actualRows.length === expectedRows.length
      && actualRows.every((row, index) => row === expectedRows[index]);
  }

  function handleSqlSuccess(statement, resultSets) {
    if (state.current === 'matchEvidence' && !state.pendingAdvance) {
      if (state.matchEvidencePhase === 'companies') {
        const result = validatePreparedMeasurement(statement, resultSets, COMPANY_EVIDENCE_SQL, ['company_id', 'name']);
        if (!result) return wrong('Run the prepared company measurement as shown. This step is for collecting evidence, not writing new SQL.');
        state.companyEvidenceRows = result.values.map((row) => [...row]);
        state.matchEvidencePhase = 'companyCaptured';
        state.localFeedback = '';
        render();
        return;
      }
      if (state.matchEvidencePhase === 'funding') {
        const result = validatePreparedMeasurement(statement, resultSets, FUNDING_EVIDENCE_SQL, ['company_id', 'funding_round_id']);
        if (!result) return wrong('Run the prepared funding_round measurement as shown. This step is for collecting evidence, not writing new SQL.');
        state.fundingEvidenceRows = result.values.map((row) => [...row]);
        state.matchEvidencePhase = 'compare';
        state.localFeedback = '';
        render();
        return;
      }
      return;
    }

    if (state.current !== 'sql' || state.pendingAdvance) return;
    if (!validateResult(statement, resultSets)) {
      return wrong('The SQL ran, but the result does not yet match the requested five-column INNER JOIN output. Inspect the selected fields and the relationship in ON; the validator checks the result, not an exact query string.');
    }
    record({
      evidence: 'sql',
      prompt: 'Return companies with their recorded funding rounds.',
      answer: 'Query ran successfully',
      answerLabel: 'Result',
      feedback: '<div class="success-feedback">The query ran successfully. Inspect Results before deciding whether the earlier prediction held.</div>',
      next: 'verification',
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
