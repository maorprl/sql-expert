import './fanout.css';

const BUSINESS_REQUEST = 'The strategy team wants a working table that pairs each recorded funding round with the founder records for the same company so it can review funding activity alongside founder context.';
const REQUIRED_RELATIONS = ['funding_round', 'company', 'company_founder'];

const LABELS = {
  relations: 'Identify relevant relations',
  fundingConnection: 'Confirm the funding relationship',
  founderConnection: 'Confirm the founder relationship',
  caseEvidence: 'Establish the case evidence',
  prediction: 'Predict the combined result',
  sql: 'Implement the two JOINs',
  resultVerification: 'Verify the fanout',
  metricSafety: 'Check metric safety',
  complete: 'Stage complete',
};

export function createFanout({ editor, getDatabase, getSchema, onSelectionChange, interactionLifecycle }) {
  const state = {
    current: 'relations',
    completed: [],
    evidence: new Set(),
    drafts: {},
    localFeedback: '',
    selectedRelations: [],
    selectedColumn: '',
    pendingAdvance: null,
    implementationPrepared: false,
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

  function fundingEstablished() { return state.evidence.has('fundingConnection'); }
  function founderEstablished() { return state.evidence.has('founderConnection'); }

  // Keep the Live Schema from revealing the second relationship before the learner establishes it.
  function relationshipLevel() {
    return founderEstablished() ? 2 : 0;
  }

  function renderColumn(relation, column) {
    const selectingFunding = state.current === 'fundingConnection' && !state.pendingAdvance && relation.name === 'funding_round';
    const selectingFounder = state.current === 'founderConnection' && !state.pendingAdvance && relation.name === 'company_founder';
    const selectable = selectingFunding || selectingFounder;
    const isSelected = selectable && state.selectedColumn === column.column;

    const fundingKey = fundingEstablished() && (
      (relation.name === 'funding_round' && column.column === 'company_id') ||
      (relation.name === 'company' && column.column === 'company_id')
    );
    const founderKey = founderEstablished() && (
      (relation.name === 'company_founder' && column.column === 'company_id') ||
      (relation.name === 'company' && column.column === 'company_id')
    );
    const isRelationshipColumn = fundingKey || founderKey;

    const isOutputField = ['sql', 'resultVerification', 'metricSafety', 'complete'].includes(state.current) && (
      (relation.name === 'company' && column.column === 'company_id') ||
      (relation.name === 'funding_round' && ['funding_round_id', 'reported_total_amount'].includes(column.column)) ||
      (relation.name === 'company_founder' && ['person_id', 'founder_title'].includes(column.column))
    );

    const classes = [
      isSelected ? 'selected-column' : '',
      isRelationshipColumn ? 'relationship-column' : '',
      isOutputField ? 'output-column' : '',
    ].filter(Boolean).join(' ');

    const badge = isRelationshipColumn && column.column === 'company_id'
      ? `<span class="key-badge">${relation.name === 'company' ? 'PK' : 'FK'}</span>`
      : '';
    const content = `<code>${escapeHtml(column.column)}</code>${badge}`;

    return selectable
      ? `<li><button type="button" class="working-column ${classes}" data-working-column="${escapeHtml(column.column)}">${content}</button></li>`
      : `<li class="working-column ${classes}">${content}</li>`;
  }

  function selectedRelation(name) {
    return getSchema().find((relation) => relation.name === name);
  }

  function relationCard(relation) {
    return `
      <article class="data-card" data-relation="${escapeHtml(relation.name)}">
        <div class="data-card-title"><code>${escapeHtml(relation.name)}</code>${state.current === 'relations' && !state.pendingAdvance ? `<button type="button" class="remove-relation" data-remove-relation="${escapeHtml(relation.name)}">Remove</button>` : ''}</div>
        <ul class="working-columns">${relation.columns.map((column) => renderColumn(relation, column)).join('')}</ul>
      </article>`;
  }

  function renderRelations() {
    const exactSelection = REQUIRED_RELATIONS.every((name) => state.selectedRelations.includes(name));
    const selected = state.selectedRelations.map(selectedRelation).filter(Boolean);

    relationEl.classList.toggle('fanout-layout', exactSelection && (fundingEstablished() || founderEstablished()));
    relationEl.classList.toggle('relationship-visible', exactSelection && (fundingEstablished() || founderEstablished()));
    relationEl.classList.toggle('cardinality-visible', exactSelection && founderEstablished());

    const status = state.current === 'relations' && !state.pendingAdvance ? 'Build it from the Live Schema' : '';
    workingStatusEl.textContent = status;
    workingStatusEl.hidden = !status;

    if (!selected.length) {
      relationEl.innerHTML = '<div class="working-empty">Choose relevant relations from the Live Schema.</div>';
      return;
    }

    if (exactSelection) {
      const funding = selectedRelation('funding_round');
      const company = selectedRelation('company');
      const founder = selectedRelation('company_founder');
      relationEl.innerHTML = [
        relationCard(funding),
        fundingEstablished() ? '<div class="schema-connector funding-connector"><span class="connector-line"></span></div>' : '<div class="fanout-connector-placeholder"></div>',
        relationCard(company),
        founderEstablished() ? '<div class="schema-connector founder-connector"><span class="connector-line"></span></div>' : '<div class="fanout-connector-placeholder"></div>',
        relationCard(founder),
      ].join('');
    } else {
      relationEl.innerHTML = selected.map(relationCard).join('');
    }

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
    return state.selectedRelations.length === REQUIRED_RELATIONS.length && REQUIRED_RELATIONS.every((name) => state.selectedRelations.includes(name));
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
    const item = { id: state.current, label: label || LABELS[state.current], prompt, answer, answerLabel, feedback, value, options };
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
    return state.localFeedback ? `<div class="local-feedback incorrect" role="alert"><strong>Not quite.</strong> ${state.localFeedback.replace(/^Not quite\.\s*/i, '')}</div>` : '';
  }

  function stepShell(prompt, body, intro = '') {
    const label = LABELS[state.current];
    return state.current !== 'complete'
      ? `<div class="step-kicker">${label}</div>${intro}<h2 class="prompt">${prompt}</h2>${body}`
      : `<h2 class="prompt">${prompt}</h2>${body}`;
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

  function continueFromPending(buttonId) {
    document.getElementById(buttonId).addEventListener('click', () => {
      const next = state.pendingAdvance.next;
      state.pendingAdvance = null;
      setCurrent(next);
    });
  }

  function renderAcknowledgement() {
    const { next, item } = state.pendingAdvance;

    if (item.id === 'sql' && next === 'resultVerification') {
      interactionLifecycle.renderCurrent(stepShell('Inspect the result.', teacherVoice('Keep the returned rows visible and compare company_id 10 with the prediction you made before writing SQL.')));
      interactionLifecycle.renderCurrent(stepShell('Inspect the result.', `${item.feedback}${teacherVoice('Look at how the three funding_round_id values pair with the two person_id values for company_id 10.')}<button id="continue-to-result-verification" class="primary continue-after-feedback">Continue to verification</button>`));
      continueFromPending('continue-to-result-verification');
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

  function showFanoutSolution() {
    if (document.title !== 'SQL Lab · Fanout risk' || state.current !== 'sql' || !learningEl.classList.contains('sql-implementation-active')) return;
    const panel = document.getElementById('solution-panel');
    if (!panel) return;
    panel.innerHTML = `<div class="solution-panel-heading"><span>Solution assistance</span><button id="close-solution" type="button" aria-label="Close solution">Close</button></div><div class="solution-panel-body"><strong>Solution SQL:</strong><pre>SELECT
  company.company_id,
  funding_round.funding_round_id,
  funding_round.reported_total_amount,
  company_founder.person_id,
  company_founder.founder_title
FROM company
JOIN funding_round
  ON company.company_id = funding_round.company_id
JOIN company_founder
  ON company.company_id = company_founder.company_id;</pre><p>This is assistance only. It has not been inserted or run.</p></div>`;
    panel.hidden = false;
    document.getElementById('close-solution').addEventListener('click', () => {
      panel.hidden = true;
      panel.innerHTML = '';
    });
  }

  solutionButton?.addEventListener('click', showFanoutSolution);

  function updateWorkspaceVisibility() {
    const resultEvidence = (state.current === 'sql' && state.pendingAdvance?.next === 'resultVerification')
      || ['resultVerification', 'metricSafety'].includes(state.current)
      || (state.current === 'resultVerification' && state.pendingAdvance?.next === 'metricSafety')
      || (state.current === 'metricSafety' && state.pendingAdvance?.next === 'complete');
    const visible = state.current === 'sql' || resultEvidence;
    const sqlImplementation = state.current === 'sql' && !resultEvidence;

    if (state.current === 'sql' && !state.implementationPrepared) {
      editor.setValue('', -1);
      document.getElementById('clear-results').click();
      state.implementationPrepared = true;
    }

    labEl.hidden = !visible;
    learningEl.classList.toggle('sql-active', visible);
    learningEl.classList.remove('baseline-workspace-active', 'baseline-evidence-active', 'prediction-evidence-active', 'join-teaching-active');
    learningEl.classList.toggle('sql-implementation-active', sqlImplementation);
    learningEl.classList.toggle('results-evidence-active', resultEvidence);

    document.querySelector('.editor-header h2').textContent = 'Two-branch JOIN implementation';
    document.querySelectorAll('.lab-action').forEach((element) => {
      element.hidden = !visible || resultEvidence;
    });
  }

  function normalizedRows(values) {
    return values.map((row) => JSON.stringify(row)).sort();
  }

  function validateFanoutResult(statement, resultSets) {
    const joinCount = statement.match(/\b(?:inner\s+)?join\b/gi)?.length ?? 0;
    if (joinCount < 2 || !resultSets.length) return false;
    if (/\b(?:distinct|group\s+by|having|left\s+join|union|sum\s*\(|count\s*\(|avg\s*\()\b/i.test(statement)) return false;

    const result = resultSets.at(-1);
    const expectedColumns = ['company_id', 'funding_round_id', 'reported_total_amount', 'person_id', 'founder_title'];
    if (result.columns.length !== expectedColumns.length || result.values.length !== 46) return false;
    const columns = result.columns.map((column) => column.toLowerCase());
    if (!columns.every((column, index) => column === expectedColumns[index])) return false;

    const expected = getDatabase().exec(`SELECT
      company.company_id,
      funding_round.funding_round_id,
      funding_round.reported_total_amount,
      company_founder.person_id,
      company_founder.founder_title
    FROM company
    JOIN funding_round
      ON company.company_id = funding_round.company_id
    JOIN company_founder
      ON company.company_id = company_founder.company_id;`)[0]?.values ?? [];

    const actualRows = normalizedRows(result.values);
    const expectedRows = normalizedRows(expected);
    return actualRows.length === expectedRows.length && actualRows.every((row, index) => row === expectedRows[index]);
  }

  function handleSqlSuccess(statement, resultSets) {
    if (state.current !== 'sql' || state.pendingAdvance) return;
    if (!validateFanoutResult(statement, resultSets)) {
      return wrong('The SQL ran, but the result does not yet match the requested round-founder combination output. Keep both JOINs at detail level, return the five requested fields, and do not aggregate or deduplicate the result.');
    }

    record({
      evidence: 'sql',
      prompt: 'Return the round-founder working table.',
      answer: 'Query ran successfully',
      answerLabel: 'Result',
      feedback: '<div class="success-feedback">The query ran successfully. Use company_id 10 to test the prediction.</div>',
      next: 'resultVerification',
    });
  }

  function render() {
    document.getElementById('business-request-title').textContent = BUSINESS_REQUEST;
    renderRelations();
    renderCompleted();
    updateWorkspaceVisibility();

    if (state.pendingAdvance) {
      renderAcknowledgement();
      return;
    }

    if (state.current === 'relations') {
      interactionLifecycle.renderCurrent(stepShell('Which relations do we need for this request?', `<p class="step-copy">Add the company relation plus the two detail relations needed for funding rounds and founder records.</p><button id="continue-relations" class="primary" disabled>Check selection</button>${feedbackMarkup()}`));
      const button = document.getElementById('continue-relations');
      button.disabled = !state.selectedRelations.length;
      button.addEventListener('click', () => {
        if (!hasExactRequiredRelations()) return wrong('The request needs the company plus both independent detail branches: funding rounds and founder records. Reinspect the Live Schema and revise the selection.');
        record({
          evidence: 'relations',
          prompt: 'Which relations do we need for this request?',
          answer: 'company, funding_round, and company_founder',
          feedback: '<div class="success-feedback">Correct. Both detail branches connect through company.</div>',
          next: 'fundingConnection',
        });
      });
    } else if (state.current === 'fundingConnection') {
      interactionLifecycle.renderCurrent(stepShell('Which column in <code>funding_round</code> tells us which company a round belongs to?', `<p class="step-copy">Select the column directly in the Working Schema.</p><button id="check-column" class="primary" ${state.selectedColumn ? '' : 'disabled'}>Check selected column</button>${feedbackMarkup()}`));
      document.getElementById('check-column').addEventListener('click', () => {
        if (state.selectedColumn !== 'company_id') return wrong('Look for the foreign key that identifies the company for each funding-round row.');
        record({
          evidence: 'fundingConnection',
          prompt: 'Which column in funding_round tells us which company a round belongs to?',
          answer: 'funding_round.company_id',
          feedback: '<div class="success-feedback">Correct. One company can have many funding-round rows, while each funding round belongs to one company.</div>',
          next: 'founderConnection',
        });
      });
    } else if (state.current === 'founderConnection') {
      interactionLifecycle.renderCurrent(stepShell('Which column in <code>company_founder</code> tells us which company a founder record belongs to?', `<p class="step-copy">Establish the second detail branch without using the first branch as a shortcut.</p><button id="check-column" class="primary" ${state.selectedColumn ? '' : 'disabled'}>Check selected column</button>${feedbackMarkup()}`));
      document.getElementById('check-column').addEventListener('click', () => {
        if (state.selectedColumn !== 'company_id') return wrong('Look for the foreign key that identifies the company for each company-founder record.');
        record({
          evidence: 'founderConnection',
          prompt: 'Which column in company_founder tells us which company a founder record belongs to?',
          answer: 'company_founder.company_id',
          feedback: '<div class="success-feedback">Correct. One company can have many company-founder records, while each of those records belongs to one company.</div>',
          next: 'caseEvidence',
        });
      });
    } else if (state.current === 'caseEvidence') {
      interactionLifecycle.renderCurrent(stepShell('Focus on company_id 10 before combining the branches.', `
        ${teacherVoice('Use this concrete case to predict the combined result before writing SQL.')}
        <div class="fanout-case-evidence">
          <div><span>Funding-round rows</span><strong>3</strong></div>
          <div><span>Founder records</span><strong>2</strong></div>
          <div><span>Funding total at round grain</span><strong>$35M</strong></div>
        </div>
        <p class="step-copy">The three funding amounts are $2M, $8M, and $25M.</p>
        <button id="continue-case-evidence" class="primary">Continue to prediction</button>
      `));
      document.getElementById('continue-case-evidence').addEventListener('click', () => {
        state.evidence.add('caseEvidence');
        setCurrent('prediction');
      });
    } else if (state.current === 'prediction') {
      choiceQuestion({
        intro: teacherVoice('Both relationships are valid 1:M relationships from the same company. Now combine their multiplicities.'),
        prompt: 'For company_id 10, how many round-founder combinations can the two JOINs produce?',
        options: [
          ['six', '6 rows — each of the 3 funding rounds can pair with each of the 2 founder records.'],
          ['three', '3 rows — one per funding round.'],
          ['two', '2 rows — one per founder record.'],
          ['five', '5 rows — 3 funding rounds plus 2 founder records.'],
        ],
        correct: 'six',
        evidence: 'prediction',
        next: 'sql',
        feedback: '<div class="success-feedback">Correct. The two detail branches can produce 3 × 2 = 6 round-founder combinations for the same company.</div><div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>Fanout across detail branches</b><span>Each relationship can be correct on its own. When both 1:M branches are joined at detail level, the rows from one branch can multiply the rows from the other.</span></div>',
        wrongFeedback: 'Do not add the branch counts. Ask how many founder matches can pair with each of the three funding-round rows.',
      });
    } else if (state.current === 'sql') {
      interactionLifecycle.renderCurrent(stepShell('Implement both relationships in SQL.', `<p class="step-copy">Return the detail-level working table across all matching companies. Do not aggregate or deduplicate it.</p>
        <details class="optional-scaffold desired-output"><summary>Show desired output</summary><div class="optional-scaffold-body"><div class="desired-output-grid"><code>company_id</code><code>funding_round_id</code><code>reported_total_amount</code><code>person_id</code><code>founder_title</code></div><p>Return these five fields in this order.</p></div></details>
        <details class="optional-scaffold sql-structure"><summary>Show SQL structure</summary><div class="optional-scaffold-body"><pre>SELECT ...
FROM company
JOIN funding_round
  ON ...
JOIN company_founder
  ON ...</pre><p>Both detail relations connect to <code>company</code> through <code>company_id</code>.</p></div></details>
        <p class="implementation-check"><strong>Prediction to verify:</strong> company_id 10 should produce 6 round-founder combinations.</p>${feedbackMarkup()}`));
    } else if (state.current === 'resultVerification') {
      choiceQuestion({
        intro: teacherVoice('Keep the actual result visible and inspect the rows for company_id 10.'),
        prompt: 'What do the 6 rows for company_id 10 represent?',
        options: [
          ['pairs', 'Six distinct round-founder combinations: 3 funding rounds crossed with 2 founder records.'],
          ['duplicates', 'Six accidental duplicate rows that should be collapsed.'],
          ['rounds', 'Six different funding rounds.'],
          ['founders', 'Six different founders.'],
        ],
        correct: 'pairs',
        evidence: 'resultVerification',
        next: 'metricSafety',
        feedback: '<div class="success-feedback">Correct. The natural grain of the joined result is one round-founder combination per row.</div>',
        wrongFeedback: 'Compare funding_round_id with person_id. The same three round IDs repeat across two different founder IDs, creating six distinct combinations.',
      });
    } else if (state.current === 'metricSafety') {
      choiceQuestion({
        intro: teacherVoice('Before the combined JOIN, the three funding rounds for company_id 10 total $35M. In the fanout result, each round amount appears once for each founder record.'),
        prompt: 'What would SUM(reported_total_amount) over those 6 joined rows produce, and is that analytically safe?',
        options: [
          ['inflated', '$70M — but that is inflated by fanout, so the metric is not safe to aggregate from this result.'],
          ['safe35', '$35M — the JOIN preserves the funding total automatically.'],
          ['real70', '$70M — and that means the company actually raised $70M.'],
        ],
        correct: 'inflated',
        evidence: 'metricSafety',
        next: 'complete',
        feedback: '<div class="success-feedback">Correct. Each funding amount is repeated twice, once for each founder record, so the joined rows would sum to $70M instead of the true $35M round-level total.</div><div class="concept-callout"><strong>ANALYTICAL RISK</strong><b>Metric corruption from fanout</b><span>A syntactically valid JOIN can create a grain at which a previously valid metric is no longer safe to aggregate.</span></div>',
        wrongFeedback: 'Trace one funding-round amount across the two founder records. The same amount appears twice in the joined result.',
      });
    } else if (state.current === 'complete') {
      const required = ['relations', 'fundingConnection', 'founderConnection', 'caseEvidence', 'prediction', 'sql', 'resultVerification', 'metricSafety'];
      const complete = required.every((item) => state.evidence.has(item));
      interactionLifecycle.renderCurrent(stepShell('Stage complete', `<div class="completion-state"><div class="completion-icon">✓</div><p>${complete ? 'You predicted 3 × 2 fanout, verified the 6 round-founder combinations, and identified why the funding metric becomes unsafe to aggregate at that grain.' : 'The required learning evidence is incomplete.'}</p></div>`));
    }
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
