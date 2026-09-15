import './inner-join-unmatched.css';

const BUSINESS_REQUEST = 'The investment team is validating a funding-round report. It should show every recorded funding round with the company\'s status, and they also need to know whether every company is represented in the report.';
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
  transfer: 'Assess report coverage',
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
    document.getElementById('working-schema-action')?.remove();
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
    if (state.current === 'connection') renderConnectionAction();
  }

  function renderConnectionAction() {
    const success = state.pendingAdvance?.item.id === 'connection';
    const element = document.createElement('section');
    element.id = 'working-schema-action';
    element.className = 'working-schema-action';
    element.innerHTML = success ? `
      <div><span class="eyebrow">Connection established</span><strong><code>funding_round.company_id</code> identifies the company.</strong></div>
      ${state.pendingAdvance.item.feedback}
      <button id="continue-after-connection" class="primary connection-continue">Continue to Cardinality</button>
    ` : `
      <div><span class="eyebrow">Current action</span><strong>Which column in <code>funding_round</code> identifies the company that the round belongs to?</strong></div>
      <button id="check-column" class="primary" ${state.selectedColumn ? '' : 'disabled'}>Check selected column</button>
      ${feedbackMarkup()}
    `;
    relationEl.append(element);
    if (success) return;
    element.querySelector('#check-column').addEventListener('click', () => {
      if (state.selectedColumn !== 'company_id') return wrong('Look at one funding-round row and ask which column identifies the company that round belongs to.');
      record({
        evidence: 'connection',
        prompt: 'Which column in funding_round identifies the company that the round belongs to?',
        answer: 'funding_round.company_id',
        feedback: '<div class="success-feedback">Correct. <code>funding_round.company_id</code> identifies the company for that round.</div><div class="concept-callout"><strong>REUSED RELATIONSHIP PATTERN</strong><b>Primary Key / Foreign Key</b><span><code>funding_round.company_id</code> is the Foreign Key (FK). It points to <code>company.company_id</code>, the Primary Key (PK).</span></div>',
        next: 'cardinality',
      });
    });
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

  function relationSelectionFeedback() {
    const hasRounds = state.selectedRelations.includes('funding_round');
    const hasCompanies = state.selectedRelations.includes('company');

    if (hasRounds && hasCompanies) {
      return 'The recorded funding rounds and company status are already covered. Check whether every selected relation is needed for this report.';
    }
    if (hasRounds) {
      return 'You already have the recorded funding-round details. Reinspect the Live Schema for the relation that provides the company status requested alongside them.';
    }
    if (hasCompanies) {
      return 'You already have the company status information. Reinspect the Live Schema for the relation that contains the recorded funding rounds the report must preserve.';
    }
    return 'Break the report into the two information roles it needs: recorded funding-round details and company status. Reinspect the Live Schema and revise the selection.';
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

    if (item.id === 'connection') {
      interactionLifecycle.renderCurrent(stepShell('Connection established.', teacherVoice('The relationship is now visible in the Working Schema. Continue there when you are ready to return to ordinary Cardinality reasoning.')));
      continueFromPending('continue-after-connection');
      return;
    }

    if (item.id === 'matchEvidence' && next === 'prediction') {
      interactionLifecycle.renderCurrent(stepShell('Zero-match case established.', teacherVoice(`You found a real zero-match case: ${escapeHtml(unmatched)} exists on the company side, but there is no funding-round row to pair with it. The team also needs to know whether every company is represented in the funding-round report, so this company is the case that can test that coverage. Before writing SQL, predict what INNER JOIN will do with this starting row.`)));
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

    if (item.id === 'verification' && next === 'transfer') {
      interactionLifecycle.renderCurrent(stepShell('Verification complete.', teacherVoice('You verified the result against the zero-match prediction. Continue with Results still available when you are ready to return to the separate business coverage conclusion.')));
      renderWorkspaceAction(`<p class="confirmed-answer"><strong>${escapeHtml(item.answerLabel)}:</strong> ${escapeHtml(item.answer)}</p>${item.feedback}<button id="continue-to-coverage" class="primary continue-after-feedback">Continue to coverage conclusion</button>`, 'verification-followup');
      continueFromPending('continue-to-coverage');
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
      if (answer !== correct) return wrong(typeof wrongFeedback === 'string' ? wrongFeedback : wrongFeedback[answer]);
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
        `${teacherVoice('You established that one requested result row represents one recorded funding round. The business question also asks whether every company is represented in that report. Inspect the actual data and establish whether every company has a matching funding-round row.')}<div class="measurement-note">Run the prepared query in the SQL Workspace; you do not need to write SQL yet. This first measurement gives you each company name together with the key you will compare in the next measurement.</div>`,
      ));
      if (state.localFeedback) renderWorkspaceAction(feedbackMarkup(), 'tool-diagnostic');
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
        `${teacherVoice('Now inspect the funding-round rows. Compare their company IDs with the named company rows you already established. This comparison will tell you whether the report has a matching funding-round row available for every company.')}<div class="measurement-note">Run the prepared query in the SQL Workspace; you do not need to write SQL yet. Then use the two measurements together.</div>`,
      ));
      renderWorkspaceAction(`
        <div class="evidence-kicker">Established from your first measurement</div>
        <div class="verification-prompt"><strong>Companies in company</strong><span>${companies.map(({ companyId, name }) => `${escapeHtml(name)} <code>${escapeHtml(companyId)}</code>`).join(' · ')}</span></div>
        ${feedbackMarkup()}
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
        feedback: `<div class="success-feedback">Correct. From the two query results, you established that ${escapeHtml(unmatched)} exists in <code>company</code> but has no matching row in <code>funding_round</code>. This gives you a real zero-match case for the report-coverage question.</div>`,
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
      ['preserved', `${companyName} appears once because it exists in company, even without a matching funding_round row.`],
      ['error', `The INNER JOIN cannot return a result because one company has no matching funding_round row.`],
    ];
    const draft = state.drafts.prediction || '';
    interactionLifecycle.renderCurrent(stepShell(
      'Predict from the evidence.',
      teacherVoice(`You now have a real zero-match case. Use the INNER JOIN matching behavior you already know to predict what happens to ${escapeHtml(unmatched)} before writing SQL.`),
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
      if (answer !== 'zero') return wrong({
        preserved: 'An INNER JOIN result row needs a matched row pair. How many such pairs can this company form from the evidence you found?',
        error: 'Does one unmatched company prevent the matched companies from forming valid row pairs?',
      }[answer]);
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
      ['present', `${companyName} appears once because the company row exists, even though no funding_round row matches it.`],
      ['count-proves-coverage', `All 12 companies are represented because the result contains 26 rows.`],
    ];
    const draft = state.drafts.verification || '';
    interactionLifecycle.renderCurrent(stepShell(
      'Verify the zero-match prediction in Results.',
      '<p class="step-copy">The verification prompt, response, feedback, and Continue remain with the result evidence.</p>',
      teacherVoice(`Use Results as the evidence surface. Search the company_id column for ${escapeHtml(companyId)} rather than using the total row count as a substitute for checking which companies are represented.`),
    ));
    const action = renderWorkspaceAction(`<div class="verification-prompt"><strong>Earlier prediction</strong><span>${escapeHtml(companyName)} (company_id ${escapeHtml(companyId)}) contributes 0 INNER JOIN result rows.</span></div>
      <h3>What does the actual result show about ${escapeHtml(companyName)}?</h3>
      <form id="verification-answer-form" class="answer-form">
        <fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${value}" ${draft === value ? 'checked' : ''}> <span>${escapeHtml(label)}</span></label>`).join('')}</fieldset>
        <button class="primary" type="submit">Check answer</button>
      </form>
      ${feedbackMarkup()}`, 'verification-question');
    action.querySelector('#verification-answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.verification = answer || '';
      if (answer !== 'absent') return wrong({
        present: 'Inspect the returned `company_id` values specifically. Do you actually find this company in Results?',
        'count-proves-coverage': 'What does 26 count here: companies, or funding-round-grain result rows? Can that number alone tell you which company IDs are represented?',
      }[answer]);
      record({
        evidence: 'verification',
        prompt: `What does the actual result show about ${companyName}?`,
        answer: stripMarkup(options.find(([value]) => value === answer)[1]),
        value: answer,
        options,
        feedback: `<div class="success-feedback">Correct. The result contains 26 funding-round rows, but ${escapeHtml(companyName)} is absent because no funding-round row matched it.</div><div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>Row count is not entity coverage</b><span>Other companies can contribute several matched rows while a zero-match company contributes none. A result can therefore contain many rows without representing every company.</span></div>`,
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
        if (!hasExactRequiredRelations()) return wrong(relationSelectionFeedback());
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
        'Trace the funding-round-to-company connection in the Working Schema.',
        '<p class="step-copy">Select the connecting field directly in the Working Schema.</p>',
        teacherVoice('You found the relations that supply company context and recorded round details. Now trace from a funding round to its company so we can establish how those relations connect.'),
      ));
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
        intro: teacherVoice('You established that a company can have zero, one, or many recorded rounds. Now return to the funding-round report itself: its organizing subject—not cardinality alone—determines what one result row should represent.'),
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
        wrongFeedback: 'The report needs every recorded funding round to stay individually visible. What must one row represent for that to remain true?',
      });
    } else if (state.current === 'matchEvidence') {
      renderMatchEvidence();
    } else if (state.current === 'prediction') {
      renderPrediction();
    } else if (state.current === 'sql') {
      interactionLifecycle.renderCurrent(stepShell(
        'Implement the INNER JOIN you already know.',
        `<p class="step-copy">Move to the SQL Workspace and return the requested company context and funding-round details using the relationship you established.</p><p class="implementation-check"><strong>Prediction to verify:</strong> ${escapeHtml(state.unmatchedCompanyName)} (company_id ${escapeHtml(state.unmatchedCompanyId)}) has no matching funding-round row, so you predicted it will contribute zero INNER JOIN rows.</p>`,
        teacherVoice('You discovered the unmatched company from the data and predicted what INNER JOIN will do with it. Implement the established company-to-round relationship with the INNER JOIN you already know, then use Results to test that prediction.'),
      ));
      renderWorkspaceAction(`
        <details class="optional-scaffold desired-output"><summary>Show desired output</summary><div class="optional-scaffold-body"><div class="desired-output-grid"><code>company_id</code><code>status</code><code>funding_round_id</code><code>round_type</code><code>announced_date</code></div><p>Return these five fields in this order.</p></div></details>
        <details class="optional-scaffold sql-structure"><summary>Show SQL structure</summary><div class="optional-scaffold-body"><pre>SELECT ...
FROM company
JOIN funding_round
  ON ...</pre><p>Reuse the same INNER JOIN pattern. No new JOIN syntax is needed in this stage.</p></div></details>
        ${feedbackMarkup()}`, 'sql-authoring-assistance');
    } else if (state.current === 'verification') {
      renderVerification();
    } else if (state.current === 'transfer') {
      choiceQuestion({
        intro: teacherVoice(`You verified that ${escapeHtml(state.unmatchedCompanyName)} (company_id ${escapeHtml(state.unmatchedCompanyId)}) is absent even though Results contain 26 funding-round rows. Now answer the company-coverage question from the original business request.`),
        prompt: 'Can this 26-row INNER JOIN report be used as evidence that every company is represented?',
        options: [
          ['no', `No. ${state.unmatchedCompanyName} is missing even though the report contains 26 rows.`],
          ['yes-count', 'Yes. Because 26 rows is more than 12 companies, every company must be represented.'],
          ['yes-grain', 'Yes. One row per funding round guarantees one row for every company.'],
        ],
        correct: 'no',
        evidence: 'transfer',
        next: 'complete',
        feedback: '<div class="success-feedback">Correct. The report can be correct at funding-round grain and still omit a company with zero matching rounds. Multiple matches for other companies can increase the result-row count without restoring missing company coverage.</div>',
        wrongFeedback: {
          'yes-count': 'The 26 rows are funding-round rows. What would you need to inspect to establish coverage of companies rather than merely the number of result rows?',
          'yes-grain': 'One result row represents a funding round. What guarantee, if any, does that give about companies that have no funding round?',
        },
      });
    } else if (state.current === 'complete') {
      const requiredEvidence = ['relations', 'connection', 'cardinality', 'output', 'matchEvidence', 'prediction', 'sql', 'verification', 'transfer'];
      const complete = requiredEvidence.every((item) => state.evidence.has(item));
      interactionLifecycle.renderCurrent(stepShell('Stage complete', `<div class="completion-state"><div class="completion-icon">✓</div><p>${complete ? 'You used a real zero-match company to show that an INNER JOIN funding-round report can contain many rows while still leaving a company unrepresented.' : 'The required learning evidence is incomplete.'}</p></div>`));
    }
  }

  function normalizedRows(values) {
    return values.map((row) => JSON.stringify(row)).sort();
  }

  function validateResult(statement, resultSets) {
    const joinCount = statement.match(/\b(?:inner\s+)?join\b/gi)?.length ?? 0;
    if (!resultSets.length) return { valid: false, reason: 'no_result' };
    if (joinCount !== 1 || !/\bon\b/i.test(statement)
      || /\b(?:left\s+join|left\s+outer\s+join|distinct|group\s+by|having|union)\b/i.test(statement)) {
      return { valid: false, reason: 'missing_relationship_implementation' };
    }

    const result = resultSets.at(-1);
    const expectedColumns = ['company_id', 'status', 'funding_round_id', 'round_type', 'announced_date'];
    const columns = result.columns.map((column) => column.toLowerCase());
    if (result.columns.length !== expectedColumns.length
      || !columns.every((column, index) => column === expectedColumns[index])) {
      return { valid: false, reason: 'output_contract_mismatch' };
    }
    if (result.values.length !== 26) {
      return { valid: false, reason: 'row_count_mismatch', actualRowCount: result.values.length };
    }

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
    const rowsMatch = actualRows.length === expectedRows.length
      && actualRows.every((row, index) => row === expectedRows[index]);
    if (!rowsMatch) return { valid: false, reason: 'row_association_mismatch' };
    return { valid: true };
  }

  function fundingRoundDiagnosticFeedback(validation) {
    if (validation.reason === 'missing_relationship_implementation') {
      return 'This task implements the established company-to-funding-round relationship with one INNER JOIN and ON. Recheck that the query uses that match without changing the join behavior or collapsing the funding-round rows.';
    }
    if (validation.reason === 'output_contract_mismatch') {
      return 'The returned fields do not match the funding-round report output. Open Desired output and compare all five field names and their order with the result.';
    }
    if (validation.reason === 'row_count_mismatch') {
      return `The query returned ${validation.actualRowCount} rows, but the established funding-round-grain result contains 26 matched rows. Recheck whether the JOIN preserves each recorded funding round that has a company match.`;
    }
    if (validation.reason === 'row_association_mismatch') {
      return 'The five output fields and 26-row count match, but company status is not paired with the correct funding-round rows. Recheck ON against the funding_round.company_id → company.company_id relationship.';
    }
    return 'The SQL ran, but it did not produce the funding-round result this report asks you to inspect. Recheck the requested output and the established INNER JOIN relationship.';
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
    const validation = validateResult(statement, resultSets);
    if (!validation.valid) return wrong(fundingRoundDiagnosticFeedback(validation));
    record({
      evidence: 'sql',
      prompt: 'Build the funding-round report with company context.',
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
