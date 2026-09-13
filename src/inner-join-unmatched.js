import './inner-join-unmatched.css';

const BUSINESS_REQUEST = 'The investment team wants a table of companies that have recorded funding rounds, with each company\'s status alongside the round type and announced date.';
const REQUIRED_RELATIONS = ['funding_round', 'company'];

const INTERACTION_LABELS = {
  relations: 'Identify relevant relations',
  connection: 'Understand the relationship',
  cardinality: 'Reason about possible matches',
  output: 'Determine row meaning',
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

  function continueFromPending(buttonId) {
    document.getElementById(buttonId).addEventListener('click', () => {
      const next = state.pendingAdvance.next;
      state.pendingAdvance = null;
      setCurrent(next);
    });
  }

  function renderAcknowledgement() {
    const { next, item } = state.pendingAdvance;

    if (item.id === 'sql' && next === 'verification') {
      interactionLifecycle.renderCurrent(stepShell('Inspect the result.', `
        ${item.feedback}
        ${teacherVoice('Your activity has moved from authoring to evidence. Keep Results visible and check company_id 1, company_id 5, and company_id 20 against the prediction you made before writing SQL.')}
        <button id="continue-to-verification" class="primary continue-after-feedback">Continue to verification</button>
      `));
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

  function updateWorkspaceVisibility() {
    const resultEvidence = (state.current === 'sql' && state.pendingAdvance?.next === 'verification')
      || ['verification', 'transfer'].includes(state.current);
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
    learningEl.dataset.stage3State = resultEvidence ? 'results' : state.current;

    document.querySelector('.editor-header h2').textContent = 'INNER JOIN implementation';
    document.querySelectorAll('.lab-action').forEach((element) => {
      element.hidden = !visible || resultEvidence;
    });
    const runButton = document.getElementById('run-query');
    runButton.disabled = runButton.hidden;
  }

  function renderPrediction() {
    const options = [
      ['zero-one-many', 'company 1 → 4 rows; company 5 → 1 row; company 20 → 0 rows.'],
      ['preserve-company', 'company 1 → 4 rows; company 5 → 1 row; company 20 → 1 row.'],
      ['one-each', 'Each company contributes exactly 1 row, so all three contribute 1 row.'],
    ];
    const draft = state.drafts.prediction || '';
    interactionLifecycle.renderCurrent(stepShell(
      'How many result rows will each company contribute to the INNER JOIN?',
      `<div class="verification-prompt"><strong>Observed matches before the JOIN</strong><span>company 1 → 4 funding rounds · company 5 → 1 funding round · company 20 → 0 funding rounds</span></div>
      <form id="prediction-answer-form" class="answer-form">
        <fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${value}" ${draft === value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset>
        <button class="primary" type="submit">Check answer</button>
      </form>
      ${feedbackMarkup()}`,
      teacherVoice('Stages 1 and 2 covered one match and many matches. Use the same matching logic for a company that has no matching funding-round row.'),
    ));
    document.getElementById('prediction-answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.prediction = answer || '';
      if (answer !== 'zero-one-many') return wrong('An INNER JOIN produces rows only from matches. Use the observed match counts for each company and predict how many matched row pairs can be produced.');
      record({
        evidence: 'prediction',
        prompt: 'How many result rows will each company contribute to the INNER JOIN?',
        answer: stripMarkup(options.find(([value]) => value === answer)[1]),
        value: answer,
        options,
        feedback: '<div class="success-feedback">Correct. The number of result rows contributed by each company follows its number of matching funding-round rows.</div><div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>INNER JOIN row survival</b><span>For a company row: 0 matches → 0 result rows; 1 match → 1 result row; M matches → M result rows. A row with no match does not survive an INNER JOIN.</span></div>',
        next: 'sql',
      });
    });
  }

  function renderVerification() {
    const options = [
      ['correct', 'company 1 appears on 4 rows, company 5 appears once, and company 20 is absent because it has no matching funding round.'],
      ['null-row', 'company 20 appears once with NULL funding-round fields because INNER JOIN preserves unmatched companies.'],
      ['one-each', 'Each company appears once because the JOIN keeps the company Grain.'],
    ];
    const draft = state.drafts.verification || '';
    interactionLifecycle.renderCurrent(stepShell(
      'What does the actual result show about the three cases?',
      `<div class="verification-prompt"><strong>Earlier prediction</strong><span>company 1 → 4 rows · company 5 → 1 row · company 20 → 0 rows</span></div>
      <form id="verification-answer-form" class="answer-form">
        <fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${value}" ${draft === value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset>
        <button class="primary" type="submit">Check answer</button>
      </form>
      ${feedbackMarkup()}`,
      teacherVoice('Use Results as the evidence surface. Search the company_id column for 1, 5, and 20 rather than relying on the prediction alone.'),
    ));
    document.getElementById('verification-answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.verification = answer || '';
      if (answer !== 'correct') return wrong('Inspect the result rows for company_id 1 and 5, then look for company_id 20. INNER JOIN can only return matched row pairs.');
      record({
        evidence: 'verification',
        prompt: 'What does the actual result show about the three cases?',
        answer: stripMarkup(options.find(([value]) => value === answer)[1]),
        value: answer,
        options,
        feedback: '<div class="success-feedback">Correct. The result verifies all three match cases: many matches create many rows, one match creates one row, and zero matches creates no result row.</div>',
        next: 'transfer',
      });
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
        intro: teacherVoice('The request is for companies that have recorded funding rounds, with company context attached to each round.'),
        prompt: 'What should one result row represent?',
        options: [
          ['round', 'one recorded funding round, with its company status alongside it'],
          ['company', 'one company, regardless of how many funding rounds it has'],
          ['status', 'one company status value'],
          ['pair', 'one arbitrary company-round pair, even when the IDs do not match'],
        ],
        correct: 'round',
        evidence: 'output',
        next: 'prediction',
        feedback: '<div class="success-feedback">Correct. The result Grain is one recorded funding round per row. Company fields can repeat when a company has several rounds.</div><div class="concept-callout"><strong>REUSED CONCEPT</strong><b>Grain</b><span>The JOIN should preserve each matched funding-round row as one result row.</span></div>',
        wrongFeedback: 'The request needs every recorded funding round to stay individually visible. What must one row represent for that to remain true?',
      });
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
        <p class="implementation-check"><strong>Prediction to verify:</strong> a company with zero matching funding rounds contributes zero rows.</p>${feedbackMarkup()}`,
      ));
    } else if (state.current === 'verification') {
      renderVerification();
    } else if (state.current === 'transfer') {
      choiceQuestion({
        intro: teacherVoice('Now change only the business requirement. Do not change the SQL yet.'),
        prompt: 'Suppose the request changes to: “include every company, even when it has no recorded funding round.” Would this INNER JOIN still satisfy the request?',
        options: [
          ['no', 'No. Companies with zero matching funding rounds would still disappear.'],
          ['yes', 'Yes. INNER JOIN always keeps every row from company.'],
          ['null', 'Yes. INNER JOIN would automatically keep the company and fill the funding-round fields with NULL.'],
        ],
        correct: 'no',
        evidence: 'transfer',
        next: 'complete',
        feedback: '<div class="success-feedback">Correct. The changed requirement needs unmatched company rows to survive, while this INNER JOIN removes them. That is a different join requirement.</div>',
        wrongFeedback: 'Use company_id 20 as evidence. It has no matching funding_round row and is absent from the INNER JOIN result.',
      });
    } else if (state.current === 'complete') {
      const requiredEvidence = ['relations', 'connection', 'cardinality', 'output', 'prediction', 'sql', 'verification', 'transfer'];
      const complete = requiredEvidence.every((item) => state.evidence.has(item));
      interactionLifecycle.renderCurrent(stepShell('Stage complete', `<div class="completion-state"><div class="completion-icon">✓</div><p>${complete ? 'You completed the basic INNER JOIN match model: 0 matches → 0 rows, 1 match → 1 row, and many matches → many rows, then verified the zero-match case in the actual result.' : 'The required learning evidence is incomplete.'}</p></div>`));
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
    if (state.current !== 'sql' || state.pendingAdvance) return;
    if (!validateResult(statement, resultSets)) {
      return wrong('The SQL ran, but the result does not yet match the requested five-column INNER JOIN output. Inspect the selected fields and the relationship in ON; the validator checks the result, not an exact query string.');
    }
    record({
      evidence: 'sql',
      prompt: 'Return companies with their recorded funding rounds.',
      answer: 'Query ran successfully',
      answerLabel: 'Result',
      feedback: '<div class="success-feedback">The query returned the expected 26 matched funding-round rows. Now inspect which company rows did and did not survive.</div>',
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
