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
  connection: [3, 'Follow the funding-round tuple'],
  source: [3, 'Information source'],
  roundCompany: [4, 'Relationship: round to company'],
  companyRounds: [4, 'Relationship: company to rounds'],
  baselineRun: [5, 'Baseline row count'],
  baselineMeaning: [5, 'Interpret the baseline'],
  prediction: [6, 'Predict the joined result'],
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
    outputRequirementsOpen: false,
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
      <details class="completed-step">
        <summary><span class="complete-mark">✓</span> Step ${item.step}: ${escapeHtml(item.label)} <span class="completed-answer">${escapeHtml(item.answer)}</span></summary>
        <div class="completed-body"><p><strong>${escapeHtml(item.prompt.replace(/<[^>]+>/g, ''))}</strong></p><p><strong>Your answer:</strong> ${escapeHtml(item.answer)}</p>${item.options ? `<fieldset class="choices review-choices" disabled>${item.options.map(([value, label]) => `<label class="${value === item.value ? 'selected-choice' : ''}"><input type="radio" ${value === item.value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset>` : ''}${item.feedback ? `<div class="review-feedback">${item.feedback}</div>` : ''}${item.hints?.map((hint, hintIndex) => `<div class="hint-text ${hintIndex ? 'stronger' : ''}"><strong>Hint ${hintIndex + 1}</strong><p>${hint}</p></div>`).join('') || ''}</div>
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
      if (answer === correct) {
        const [step, defaultLabel] = STEP_META[state.current];
        if (evidence) state.evidence.add(evidence);
        state.completed.push({ step, label: defaultLabel, prompt, answer: options.find(([value]) => value === answer)[1].replaceAll('<code>', '').replaceAll('</code>', ''), value: answer, options, feedback: `${feedback}${after}`, hints: hints?.slice(0, state.openHints[state.current] || 0) });
        setCurrent(next);
      }
      else wrong(wrongFeedback);
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
    if (['baselineRun', 'baselineMeaning', 'prediction', 'operation', 'sql', 'finalGrain', 'complete'].includes(state.current)) revealEditorWithBaseline();
    labEl.classList.toggle('baseline-mode', ['baselineRun', 'baselineMeaning', 'prediction', 'operation'].includes(state.current));

    if (state.current === 'intro') {
      currentEl.innerHTML = stepShell('Inspect the business request and the two relevant relations.', '<button id="continue-stage" class="primary">Continue</button>', '<p class="step-copy">No SQL task yet. First, compare what the rows in each relation represent.</p>');
      document.getElementById('continue-stage').addEventListener('click', () => record({ prompt: 'Read the business request and inspect the relations.', answer: 'Reviewed', next: 'output' }));
    } else if (state.current === 'output') {
      choiceQuestion({
        prompt: 'What should one row in the requested result represent?',
        options: [['company', 'a company'], ['funding_round', 'a funding round'], ['investor', 'an investor'], ['sector', 'a sector']],
        correct: 'funding_round', evidence: 'output', next: 'connection',
        feedback: 'Correct. The request asks for information about every funding round, so each output row should still represent one funding round.',
        after: '<div class="concept-callout"><strong>This is the output grain: one funding round per row.</strong><span>Grain = what one row represents.</span></div>',
        wrongFeedback: 'The request asks for every funding round, with company status added to it. Reconsider what the main row still represents.',
        hints: ['Look at the wording of the business request: what does it ask us to list all of?', 'The company status is extra information being added. The main thing being listed is still the funding round.'],
      });
    } else if (state.current === 'connection') {
      choiceQuestion({
        prompt: 'Which column in <code>funding_round</code> identifies the related company?',
        options: [['funding_round_id', '<code>funding_round_id</code>'], ['company_id', '<code>company_id</code>'], ['round_type', '<code>round_type</code>'], ['announced_date', '<code>announced_date</code>']],
        correct: 'company_id', evidence: 'connection', next: 'source', feedback: '<code>funding_round.company_id</code> identifies the related company row.',
        wrongFeedback: 'Look for the column in the funding-round row that identifies a company.',
        hints: ['Look for a column that appears in both relations.', 'Compare <code>funding_round.company_id</code> with <code>company.company_id</code>.'],
      });
    } else if (state.current === 'source') {
      choiceQuestion({ prompt: 'Which relation stores the current status of that company?', options: [['funding_round', '<code>funding_round</code>'], ['company', '<code>company</code>']], correct: 'company', evidence: 'source', next: 'roundCompany', feedback: 'Correct. Follow the tuple: <code>funding_round.company_id</code> leads to the related <code>company</code> row, where <code>status</code> is stored.', wrongFeedback: 'Follow <code>company_id</code> to the related company row and inspect its columns.', hints: ['Inspect the columns of the related <code>company</code> row.', '<code>company.status</code> stores the company\'s current state.'] });
    } else if (state.current === 'roundCompany') {
      choiceQuestion({ prompt: 'Each funding round belongs to how many companies?', options: [['zero', 'None'], ['one', 'One'], ['many', 'Many']], correct: 'one', evidence: 'roundCompany', next: 'companyRounds', feedback: 'Correct. Each funding round belongs to one company.', wrongFeedback: 'Follow one funding round through its <code>company_id</code>.', hints: ['Ask what <code>company_id</code> identifies in the <code>company</code> relation.', 'A funding round belongs to a specific company.'] });
    } else if (state.current === 'companyRounds') {
      choiceQuestion({ prompt: 'Can one company be related to more than one funding round?', options: [['yes', 'yes'], ['no', 'no']], correct: 'yes', evidence: 'companyRounds', next: 'baselineRun', feedback: 'Correct. One company can be associated with multiple funding rounds.', after: '<div class="concept-callout"><strong>This is a one-to-many relationship: one company can have many funding rounds, while each funding round belongs to one company.</strong><span>Cardinality: company 1 → M funding_round</span><span>Cardinality describes how many rows on one side of a relationship can be associated with rows on the other side.</span></div>', wrongFeedback: 'Look again at the example rows. The same company can appear in more than one funding round.', hints: ['Look at the example rows in <code>funding_round</code>. Does the same <code>company_id</code> appear more than once?', 'Company <code>1</code> appears in several funding-round rows.'] });
    } else if (state.current === 'baselineRun') {
      currentEl.innerHTML = stepShell('Let’s establish a baseline.', `<p class="step-copy">Before combining the two relations, first measure how many rows are currently in <code>funding_round</code>.</p><p class="step-copy">The query below is already prepared for you. Run it and inspect the result.</p>${feedbackMarkup()}${hintMarkup(['We need a baseline for the number of rows in <code>funding_round</code>.', 'Use <code>COUNT(*)</code> on <code>funding_round</code>.'])}`);
      bindHints();
    } else if (state.current === 'baselineMeaning') {
      choiceQuestion({ prompt: 'What does the number 26 represent here?', options: [['companies', '26 companies'], ['rounds', '26 funding rounds'], ['investors', '26 investors'], ['sectors', '26 sectors']], correct: 'rounds', evidence: 'baselineMeaning', next: 'prediction', feedback: '<code>COUNT(*)</code> counts rows. Because the grain of <code>funding_round</code> is one funding round per row, 26 rows means 26 funding rounds.', wrongFeedback: '<code>COUNT(*)</code> counts rows. What does one row in <code>funding_round</code> represent?', hints: ['<code>COUNT(*)</code> counts rows. What does one row in <code>funding_round</code> represent?', "The relation's grain is one funding round per row."] });
    } else if (state.current === 'prediction') {
      choiceQuestion({ prompt: 'What do you expect to happen when we add <code>company.status</code> to every funding round?', options: [['exact', 'The result should have 26 rows, because each funding round matches one company.'], ['more', 'The result should have more than 26 rows, because each company may have many funding rounds.'], ['fewer', 'The result should have fewer than 26 rows, because several funding rounds may belong to the same company.'], ['unknown', 'We cannot predict the row count from the relationship.']], correct: 'exact', evidence: 'prediction', next: 'operation', feedback: 'Correct. Each funding round matches one company, so adding status adds information to the existing funding-round row and preserves the 26-row result.', wrongFeedback: 'Start from one funding-round row. How many company rows should it match?', hints: ['Start from one funding-round row. How many company rows should it match?', "If each funding round matches one company, adding one company's <code>status</code> should add a value to the row rather than multiply it."] });
    } else if (state.current === 'operation') {
      choiceQuestion({ prompt: 'Which relational operation should we use to combine related rows from <code>funding_round</code> and <code>company</code>?', options: [['select', '<code>SELECT</code>'], ['join', '<code>JOIN</code>'], ['group', '<code>GROUP BY</code>'], ['union', '<code>UNION</code>']], correct: 'join', evidence: 'operation', next: 'sql', feedback: '<code>JOIN</code> is the relational operation that combines related rows. In the SQL task, you will implement it with an <code>INNER JOIN</code>.', wrongFeedback: 'We need an operation that combines related rows from two different relations.', hints: ['We need an operation that combines related rows from two different relations.', 'The two relations are connected through <code>company_id</code>. Which relational operation combines matching rows across relations?'] });
    } else if (state.current === 'sql') {
      currentEl.innerHTML = stepShell('Write a query that returns every funding round together with the current <code>status</code> of the company that raised it.', `<button id="output-requirements" type="button" class="requirements-toggle">${state.outputRequirementsOpen ? 'Hide output requirements' : 'Show output requirements'}</button>${state.outputRequirementsOpen ? `<p class="step-copy output-requirements">Required output fields: <code>${REQUIRED_RESULT_COLUMNS.join('</code>, <code>')}</code>.</p>` : ''}<p class="step-copy">Continue in the same editor below. Keep the baseline query and write the new statement beneath it.</p>${feedbackMarkup()}${hintMarkup(['The requested columns come from two relations connected by <code>company_id</code>.', 'Use the <code>JOIN</code> operation you just selected to combine <code>funding_round</code> with <code>company</code> through <code>company_id</code.'])}`);
      bindHints();
      document.getElementById('output-requirements').addEventListener('click', () => { state.outputRequirementsOpen = !state.outputRequirementsOpen; render(); });
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
