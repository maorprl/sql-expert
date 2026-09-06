const BASELINE_SQL = `SELECT COUNT(*)
FROM funding_round;`;

const RELATIONS = [
  {
    name: 'funding_round',
    columns: ['funding_round_id', 'company_id', 'round_type', 'announced_date', 'reported_total_amount', 'currency_code'],
    rows: [
      [1001, 1, 'seed', '2019-06-10', 4000000, 'USD'],
      [1002, 1, 'series a', '2021-05-18', 12000000, 'USD'],
      [1003, 1, 'series b', '2023-09-04', 30000000, 'USD'],
      [1101, 2, 'seed', '2020-02-14', 5000000, 'USD'],
    ],
  },
  {
    name: 'company',
    columns: ['company_id', 'status', 'description'],
    rows: [
      [1, 'active', 'Cloud security platform for enterprise workloads.'],
      [2, 'active', 'Digital health monitoring and clinical workflow software.'],
      [3, 'active', 'AI routing and optimization for commercial fleets.'],
      [4, 'acquired', 'Payments infrastructure and fraud analytics.'],
    ],
  },
];

const STEP_META = {
  intro: [1, 'Read the business request'],
  output: [2, 'Output meaning'],
  source: [3, 'Information source'],
  connection: [3, 'Connecting column'],
  roundCompany: [4, 'Relationship: round to company'],
  companyRounds: [4, 'Relationship: company to rounds'],
  baselineRun: [5, 'Baseline row count'],
  baselineMeaning: [5, 'Interpret the baseline'],
  prediction: [6, 'Predict the row count'],
  predictionWhy: [6, 'Explain the prediction'],
  operation: [7, 'Choose the operation'],
  sql: [8, 'Implement in SQL'],
  finalGrain: [9, 'Verify the result'],
  complete: [9, 'Stage complete'],
};

const REQUIRED_RESULT_COLUMNS = [
  'funding_round_id',
  'company_id',
  'round_type',
  'announced_date',
  'reported_total_amount',
  'status',
];

export function createStage1({ editor, getDatabase }) {
  const state = {
    current: 'intro',
    completed: [],
    evidence: new Set(),
    attempts: {},
    openHints: {},
    drafts: {},
    localFeedback: '',
    editorRevealed: false,
  };

  const currentEl = document.getElementById('current-step');
  const completedEl = document.getElementById('completed-steps');
  const relationEl = document.getElementById('relation-preview');
  const labEl = document.getElementById('lab-workspace');

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  }

  function renderRelations() {
    relationEl.innerHTML = RELATIONS.map((relation) => `
      <article class="data-card">
        <div class="data-card-title"><span>Relation</span><code>${relation.name}</code></div>
        <div class="preview-table-wrap">
          <table class="preview-table">
            <thead><tr>${relation.columns.map((column) => `<th>${column}</th>`).join('')}</tr></thead>
            <tbody>${relation.rows.map((row) => `<tr>${row.map((value) => `<td>${value}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        </div>
      </article>
    `).join('');
  }

  function renderCompleted() {
    completedEl.innerHTML = state.completed.map((item, index) => `
      <details class="completed-step" ${index === state.completed.length - 1 ? 'open' : ''}>
        <summary><span class="complete-mark">✓</span> Step ${item.step}: ${escapeHtml(item.label)}</summary>
        <div class="completed-body"><p>${escapeHtml(item.prompt.replace(/<[^>]+>/g, ''))}</p><p><strong>Your answer:</strong> ${escapeHtml(item.answer)}</p>${item.feedback ? `<p>${item.feedback}</p>` : ''}</div>
      </details>
    `).join('');
  }

  function setCurrent(next) {
    state.current = next;
    state.localFeedback = '';
    if (next === 'baselineRun') revealEditorWithBaseline();
    render();
  }

  function record({ evidence, prompt, answer, feedback = '', next, label }) {
    if (evidence) state.evidence.add(evidence);
    const [step, defaultLabel] = STEP_META[state.current];
    state.completed.push({ step, label: label || defaultLabel, prompt, answer, feedback });
    setCurrent(next);
  }

  function wrong(feedback) {
    state.attempts[state.current] = (state.attempts[state.current] || 0) + 1;
    state.localFeedback = feedback;
    render();
  }

  function revealEditorWithBaseline() {
    labEl.hidden = false;
    document.querySelectorAll('.lab-action').forEach((element) => { element.hidden = false; });
    if (state.editorRevealed) return;
    const normalized = editor.getValue().replace(/\s+/g, ' ').toLowerCase();
    if (!normalized.includes('select count(*) from funding_round')) {
      const separator = editor.getValue().trim() ? '\n\n' : '';
      editor.setValue(`${editor.getValue()}${separator}${BASELINE_SQL}`, 1);
    } else {
      const baselineStart = editor.getValue().lastIndexOf(BASELINE_SQL);
      if (baselineStart >= 0) {
        const position = editor.session.doc.indexToPosition(baselineStart + BASELINE_SQL.length - 1);
        editor.clearSelection();
        editor.moveCursorToPosition(position);
      }
    }
    state.editorRevealed = true;
  }

  function hintMarkup(hints) {
    if (!hints?.length) return '';
    const attempts = state.attempts[state.current] || 0;
    const opened = state.openHints[state.current] || 0;
    const secondAvailable = attempts >= 2;
    return `
      <div class="hints">
        <div class="hint-actions">
          <button type="button" data-hint="1" class="hint-button ${attempts >= 1 && opened < 1 ? 'prominent' : ''}">${opened >= 1 ? 'Hint 1 shown' : 'Hint 1'}</button>
          ${secondAvailable ? `<button type="button" data-hint="2" class="hint-button ${attempts >= 2 && opened < 2 ? 'prominent' : ''}">${opened >= 2 ? 'Hint 2 shown' : 'Hint 2'}</button>` : ''}
        </div>
        ${opened >= 1 ? `<div class="hint-text"><strong>Hint 1</strong><p>${hints[0]}</p></div>` : ''}
        ${opened >= 2 ? `<div class="hint-text stronger"><strong>Hint 2</strong><p>${hints[1]}</p></div>` : ''}
      </div>`;
  }

  function choiceQuestion({ prompt, options, correct, feedback, wrongFeedback, next, evidence, hints, after = '', intro = '' }) {
    const draft = state.drafts[state.current] || '';
    currentEl.innerHTML = stepShell(prompt, `
      <form id="answer-form" class="answer-form">
        <fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${escapeHtml(value)}" ${draft === value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset>
        <button class="primary" type="submit">Check answer</button>
      </form>
      ${feedbackMarkup()}
      ${hintMarkup(hints)}
    `, intro);
    bindHints();
    document.getElementById('answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts[state.current] = answer || '';
      if (answer === correct) record({ evidence, prompt, answer: options.find(([value]) => value === answer)[1].replaceAll('<code>', '').replaceAll('</code>', ''), feedback: `${feedback}${after}`, next });
      else wrong(wrongFeedback);
    });
  }

  function textQuestion({ prompt, correct, feedback, wrongFeedback, next, evidence, hints, placeholder = '' }) {
    const draft = state.drafts[state.current] || '';
    currentEl.innerHTML = stepShell(prompt, `
      <form id="answer-form" class="answer-form inline-form">
        <input name="answer" autocomplete="off" value="${escapeHtml(draft)}" placeholder="${escapeHtml(placeholder)}" aria-label="Your answer">
        <button class="primary" type="submit">Check answer</button>
      </form>
      ${feedbackMarkup()}
      ${hintMarkup(hints)}
    `);
    bindHints();
    document.getElementById('answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = String(new FormData(event.currentTarget).get('answer') || '').trim();
      state.drafts[state.current] = answer;
      if (answer.toLowerCase().replace(/[`\s]/g, '') === correct) record({ evidence, prompt, answer, feedback, next });
      else wrong(wrongFeedback);
    });
  }

  function explanationQuestion() {
    const prompt = 'Why?';
    const hints = [
      'Start from one funding-round row. How many company rows should it match?',
      "If each funding round matches one company, adding one company's <code>status</code> should add a value to the row rather than multiply it.",
    ];
    currentEl.innerHTML = stepShell(prompt, `
      <form id="answer-form" class="answer-form">
        <textarea name="answer" rows="3" aria-label="Explain your prediction" placeholder="Explain using the relationship you identified.">${escapeHtml(state.drafts[state.current] || '')}</textarea>
        <button class="primary" type="submit">Check reasoning</button>
      </form>
      ${feedbackMarkup()}
      ${hintMarkup(hints)}
    `);
    bindHints();
    document.getElementById('answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = String(new FormData(event.currentTarget).get('answer') || '').trim();
      state.drafts[state.current] = answer;
      const normalized = answer.toLowerCase();
      const identifiesRelationship = /\b(one|1|single)\b/.test(normalized) && /compan/.test(normalized) && /round/.test(normalized);
      const identifiesPreservation = /(add|status|information|value|same|26|not (create|multiply)|doesn't (create|multiply)|does not (create|multiply))/.test(normalized);
      if (identifiesRelationship && identifiesPreservation) record({ prompt, answer, feedback: "Each funding round matches one company, so adding the company's status should add information to the existing funding-round row rather than create additional funding-round rows.", next: 'operation' });
      else wrong('Connect your explanation to both sides of the relationship: one funding round matches how many companies, and what does adding status do to that row?');
    });
  }

  function feedbackMarkup() {
    return state.localFeedback ? `<div class="local-feedback incorrect"><strong>Not quite.</strong> ${state.localFeedback.replace(/^Not quite\.\s*/i, '')}</div>` : '';
  }

  function stepShell(prompt, body, intro = '') {
    const [step, label] = STEP_META[state.current];
    return `<div class="step-kicker">Step ${step} of 9 · ${label}</div>${intro}<h2 class="prompt">${prompt}</h2>${body}`;
  }

  function bindHints() {
    currentEl.querySelectorAll('[data-hint]').forEach((button) => button.addEventListener('click', () => {
      const form = currentEl.querySelector('#answer-form');
      if (form) state.drafts[state.current] = String(new FormData(form).get('answer') || '');
      state.openHints[state.current] = Math.max(state.openHints[state.current] || 0, Number(button.dataset.hint));
      render();
    }));
  }

  function render() {
    renderCompleted();
    const early = ['intro', 'output', 'source', 'connection', 'roundCompany', 'companyRounds'].includes(state.current);
    relationEl.hidden = !early;
    if (['baselineRun', 'baselineMeaning', 'prediction', 'predictionWhy', 'operation', 'sql', 'finalGrain', 'complete'].includes(state.current)) revealEditorWithBaseline();

    if (state.current === 'intro') {
      currentEl.innerHTML = stepShell('Inspect the business request and the two relevant relations.', '<button id="continue-stage" class="primary">Continue</button>', '<p class="step-copy">No SQL task yet. First, compare what the rows in each relation represent.</p>');
      document.getElementById('continue-stage').addEventListener('click', () => record({ prompt: 'Read the business request and inspect the relations.', answer: 'Reviewed', next: 'output' }));
    } else if (state.current === 'output') {
      choiceQuestion({
        prompt: 'What should one row in the requested result represent?',
        options: [['company', 'a company'], ['funding_round', 'a funding round'], ['investor', 'an investor'], ['sector', 'a sector']],
        correct: 'funding_round', evidence: 'output', next: 'source',
        feedback: 'Correct. The request asks for information about every funding round, so each output row should still represent one funding round.',
        after: '<div class="concept-callout"><strong>This is the output grain: one funding round per row.</strong><span>Grain = what one row represents.</span></div>',
        wrongFeedback: 'The request asks for every funding round, with company status added to it. Reconsider what the main row still represents.',
        hints: ['Look at the wording of the business request: what does it ask us to list all of?', 'The company status is extra information being added. The main thing being listed is still the funding round.'],
      });
    } else if (state.current === 'source') {
      choiceQuestion({
        prompt: 'Which relation contains the company status we need to add to each funding round?',
        options: [['funding_round', '<code>funding_round</code>'], ['company', '<code>company</code>']],
        correct: 'company', evidence: 'source', next: 'connection', feedback: 'Correct. The current company status is stored in <code>company</code>.',
        wrongFeedback: 'Inspect the columns of the two relations and locate the attribute that describes the company’s current state.',
        hints: ['Inspect the columns of the two relations.', '<code>funding_round</code> contains information about the round. Look at <code>company</code> for an attribute describing the company\'s current state.'],
      });
    } else if (state.current === 'connection') {
      textQuestion({ prompt: 'Which column connects a funding round to its company?', correct: 'company_id', evidence: 'connection', next: 'roundCompany', placeholder: 'column_name', feedback: '<code>funding_round.company_id</code> identifies the company associated with each funding round.', wrongFeedback: 'Look for a column that appears in both relations.', hints: ['Look for a column that appears in both relations.', 'Compare <code>funding_round.company_id</code> with <code>company.company_id</code>.'] });
    } else if (state.current === 'roundCompany') {
      choiceQuestion({ prompt: 'For one row in <code>funding_round</code>, how many rows in <code>company</code> should its <code>company_id</code> match?', options: [['zero', 'zero'], ['one', 'one'], ['many', 'many']], correct: 'one', evidence: 'roundCompany', next: 'companyRounds', feedback: 'Correct. Each funding round belongs to one company.', wrongFeedback: 'Check the relationship from one funding round to <code>company</code>, not from one company to all of its rounds.', hints: ['Ask what <code>company_id</code> identifies in the <code>company</code> relation.', 'A funding round belongs to a specific company.'] });
    } else if (state.current === 'companyRounds') {
      choiceQuestion({ prompt: 'Can one company be related to more than one funding round?', options: [['yes', 'yes'], ['no', 'no']], correct: 'yes', evidence: 'companyRounds', next: 'baselineRun', feedback: 'Correct. One company can be associated with multiple funding rounds.', after: '<div class="concept-callout"><strong>This is a one-to-many relationship: one company can have many funding rounds, while each funding round belongs to one company.</strong><span>Cardinality: company 1 → M funding_round</span><span>Cardinality describes how many rows on one side of a relationship can be associated with rows on the other side.</span></div>', wrongFeedback: 'Look again at the example rows. The same company can appear in more than one funding round.', hints: ['Look at the example rows in <code>funding_round</code>. Does the same <code>company_id</code> appear more than once?', 'Company <code>1</code> appears in several funding-round rows.'] });
    } else if (state.current === 'baselineRun') {
      currentEl.innerHTML = stepShell('Run the prepared query to establish the number of rows in <code>funding_round</code>.', `<p class="step-copy">The query is already present in the SQL editor below. Run it; you do not need to construct the <code>COUNT(*)</code> syntax.</p>${feedbackMarkup()}${hintMarkup(['We need a baseline for the number of rows in <code>funding_round</code>.', 'Use <code>COUNT(*)</code> on <code>funding_round</code>.'])}`);
      bindHints();
    } else if (state.current === 'baselineMeaning') {
      choiceQuestion({ prompt: 'What does the number 26 represent here?', options: [['companies', '26 companies'], ['rounds', '26 funding rounds'], ['investors', '26 investors'], ['sectors', '26 sectors']], correct: 'rounds', evidence: 'baselineMeaning', next: 'prediction', feedback: '<code>COUNT(*)</code> counts rows. Because the grain of <code>funding_round</code> is one funding round per row, 26 rows means 26 funding rounds.', wrongFeedback: '<code>COUNT(*)</code> counts rows. What does one row in <code>funding_round</code> represent?', hints: ['<code>COUNT(*)</code> counts rows. What does one row in <code>funding_round</code> represent?', "The relation's grain is one funding round per row."] });
    } else if (state.current === 'prediction') {
      choiceQuestion({ prompt: 'If we add <code>company.status</code> to every funding round, what should happen to the number of rows?', options: [['fewer', 'fewer than 26'], ['exact', 'exactly 26'], ['more', 'more than 26'], ['unknown', 'cannot be predicted from the relationship']], correct: 'exact', evidence: 'prediction', next: 'predictionWhy', feedback: 'Correct. The expected output grain remains one funding round per row, so the expected row count remains 26.', wrongFeedback: 'Compare your prediction with the relationship you just identified: how many company rows should one funding round match?', hints: ['Start from one funding-round row. How many company rows should it match?', "If each funding round matches one company, adding one company's <code>status</code> should add a value to the row rather than multiply it."] });
    } else if (state.current === 'predictionWhy') {
      explanationQuestion();
    } else if (state.current === 'operation') {
      textQuestion({ prompt: 'Which relational operation do we need in order to combine each <code>funding_round</code> row with its related <code>company</code> row?', correct: 'join', evidence: 'operation', next: 'sql', placeholder: 'operation', feedback: '<code>JOIN</code> combines related rows from different relations. Here, it lets us add the related company\'s <code>status</code> to each funding-round row.', wrongFeedback: 'We need an operation that combines related rows from two different relations.', hints: ['We need an operation that combines related rows from two different relations.', 'The two relations are connected through <code>company_id</code>. Which relational operation combines matching rows across relations?'] });
    } else if (state.current === 'sql') {
      currentEl.innerHTML = stepShell('Write a query that returns every funding round together with the current <code>status</code> of the company that raised it.', `<p class="step-copy">Required output fields: <code>${REQUIRED_RESULT_COLUMNS.join('</code>, <code>')}</code>.</p><p class="step-copy">Continue in the same editor below. Keep the baseline query and write the new statement beneath it.</p>${feedbackMarkup()}${hintMarkup(['The requested columns come from two relations connected by <code>company_id</code>.', 'Use the <code>JOIN</code> operation you just selected to combine <code>funding_round</code> with <code>company</code> through <code>company_id</code>.'])}`);
      bindHints();
    } else if (state.current === 'finalGrain') {
      choiceQuestion({ prompt: 'What is the grain of the result?', intro: '<div class="verification-callout"><strong>You predicted 26 rows before writing the join. Did the result match your prediction?</strong><span>Yes. The result contains 26 rows.</span></div>', options: [['company', 'one company per row'], ['funding_round', 'one funding round per row'], ['investor', 'one investor per row'], ['pair', 'one company-funding-round pair per row']], correct: 'funding_round', evidence: 'finalGrain', next: 'complete', feedback: 'The join added company information without changing what one row represents. The result is still at funding-round grain.', wrongFeedback: 'Reconsider what each result row represents.' });
    } else if (state.current === 'complete') {
      const required = ['output', 'source', 'connection', 'roundCompany', 'companyRounds', 'baselineRun', 'baselineMeaning', 'prediction', 'operation', 'sql', 'finalGrain'];
      const complete = required.every((item) => state.evidence.has(item));
      currentEl.innerHTML = stepShell('Stage 1 complete', `<div class="completion-state"><div class="completion-icon">✓</div><p>${complete ? 'You reasoned from row meaning and relationships, selected JOIN, implemented it in SQL, and verified that the result remained at funding-round grain.' : 'Required evidence is incomplete.'}</p></div>`);
    }
  }

  function validateStageSql(resultSets) {
    if (!resultSets.length) return false;
    const result = resultSets.at(-1);
    if (!REQUIRED_RESULT_COLUMNS.every((column) => result.columns.includes(column))) return false;
    if (result.values.length !== 26) return false;
    const indices = Object.fromEntries(REQUIRED_RESULT_COLUMNS.map((column) => [column, result.columns.indexOf(column)]));
    const actualIds = result.values.map((row) => row[indices.funding_round_id]);
    if (new Set(actualIds).size !== 26) return false;
    const expectedResult = getDatabase().exec(`
      SELECT fr.funding_round_id, fr.company_id, fr.round_type, fr.announced_date,
             fr.reported_total_amount, c.status
      FROM funding_round AS fr
      JOIN company AS c ON c.company_id = fr.company_id;
    `)[0];
    const expected = new Map(expectedResult.values.map((row) => [String(row[0]), row]));
    if (expected.size !== 26 || actualIds.some((id) => !expected.has(String(id)))) return false;
    return result.values.every((row) => {
      const expectedRow = expected.get(String(row[indices.funding_round_id]));
      return REQUIRED_RESULT_COLUMNS.every((column, expectedIndex) => Object.is(row[indices[column]], expectedRow[expectedIndex]));
    });
  }

  function handleSqlSuccess(statement, resultSets) {
    if (state.current === 'baselineRun') {
      const result = resultSets.at(-1);
      const valid = resultSets.length === 1 && result?.values?.length === 1 && result.values[0].length === 1 && result.values[0][0] === 26;
      if (valid) record({ evidence: 'baselineRun', prompt: 'Run the prepared baseline query.', answer: '26 rows returned', next: 'baselineMeaning' });
      else wrong('The baseline should count the rows in <code>funding_round</code> and return 26. Run the prepared statement with the cursor inside it.');
    } else if (state.current === 'sql') {
      if (validateStageSql(resultSets)) record({ evidence: 'sql', prompt: 'Return every funding round with its company status.', answer: 'Valid 26-row result', next: 'finalGrain', feedback: 'Your result matches the prediction: 26 rows, one for every funding round, with the related company status.' });
      else wrong('Your query ran, but the result does not match the Stage 1 prediction. You expected one row per funding round and 26 rows total. Inspect how the relations were combined.');
    }
  }

  renderRelations();
  render();

  return { handleSqlSuccess, current: () => state.current };
}
