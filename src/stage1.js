const BASELINE_SQL = `SELECT COUNT(*)
FROM funding_round;`;

const STEP_META = {
  relations: [1, 'Choose relevant relations'], output: [2, 'Output meaning'], connection: [3, 'Connecting key'],
  cardinality: [4, 'Cardinality'], baselineRun: [5, 'Baseline row count'], baselineMeaning: [5, 'Interpret the baseline'],
  prediction: [6, 'Predict the result'], operation: [7, 'Choose the relational action'], sql: [8, 'INNER JOIN and SQL'], finalGrain: [9, 'Verify the result'], complete: [null, 'Stage complete'],
};

const REQUIRED_RESULT_COLUMNS = [
  'funding_round_id',
  'company_id',
  'round_type',
  'announced_date',
  'reported_total_amount',
  'status',
];

export function createStage1({ editor, getDatabase, getSchema, onSelectionChange }) {
  const state = {
    current: 'relations',
    completed: [],
    evidence: new Set(),
    attempts: {},
    openHints: {},
    drafts: {},
    localFeedback: '',
    editorRevealed: false,
    outputRequirementsOpen: false,
    selectedRelations: [],
    baselineExecuted: false,
  };

  const currentEl = document.getElementById('current-step');
  const completedEl = document.getElementById('completed-steps');
  const relationEl = document.getElementById('relation-preview');
  const labEl = document.getElementById('lab-workspace');

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  }

  function renderRelations() {
    const selected = state.selectedRelations.map((name) => getSchema().find((relation) => relation.name === name)).filter(Boolean);
    relationEl.innerHTML = selected.length ? selected.map((relation) => `
      <article class="data-card">
        <div class="data-card-title"><span>Working relation</span><code>${relation.name}</code><button type="button" class="remove-relation" data-remove-relation="${relation.name}">Remove</button></div>
        <ul class="working-columns">${relation.columns.map((column) => `<li><code>${column.column}</code>${column.pk ? ' <span class="badge">PK</span>' : ''}${relation.foreignKeys.filter((fk) => fk.from === column.column).map((fk) => ` <span class="fk-inline">FK → ${fk.refTable}.${fk.to}</span>`).join('')}</li>`).join('')}</ul>
      </article>
    `).join('') : '<div class="working-empty">Add relevant relations from the schema.</div>';
    relationEl.querySelectorAll('[data-remove-relation]').forEach((button) => button.addEventListener('click', () => removeRelation(button.dataset.removeRelation)));
  }

  function addRelation(name) {
    if (state.selectedRelations.includes(name)) return;
    if (state.selectedRelations.length >= 4) { state.localFeedback = 'The working schema can contain up to four relations. Remove one to add another.'; render(); return; }
    state.selectedRelations.push(name); state.localFeedback = ''; render(); onSelectionChange();
  }

  function removeRelation(name) {
    state.selectedRelations = state.selectedRelations.filter((item) => item !== name); state.localFeedback = ''; render(); onSelectionChange();
  }

  function renderCompleted() {
    completedEl.innerHTML = state.completed.map((item, index) => `
      <details class="completed-step">
        <summary><span class="complete-mark">✓</span> Step ${item.step}: ${escapeHtml(item.label)}</summary>
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
          ${attempts >= 1 ? `<button type="button" data-hint="1" class="hint-button ${opened < 1 ? 'prominent' : ''}">Hint 1</button>` : ''}
          ${secondAvailable ? `<button type="button" data-hint="2" class="hint-button ${opened < 2 ? 'prominent' : ''}">Hint 2</button>` : ''}
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
    return step ? `<div class="step-kicker">Step ${step} of 9 · ${label}</div>${intro}<h2 class="prompt">${prompt}</h2>${body}` : `<h2 class="prompt">${prompt}</h2>${body}`;
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
    renderRelations();
    renderCompleted();
    relationEl.hidden = false;
    if (['baselineRun', 'baselineMeaning', 'prediction', 'operation', 'sql', 'finalGrain', 'complete'].includes(state.current)) revealEditorWithBaseline();
    labEl.classList.toggle('baseline-mode', ['baselineRun', 'baselineMeaning', 'prediction', 'operation'].includes(state.current));

    if (state.current === 'relations') {
      const ready = state.selectedRelations.includes('funding_round') && state.selectedRelations.includes('company');
      currentEl.innerHTML = stepShell('Choose the relations relevant to the business request.', `<p class="step-copy">Use the <strong>+</strong> actions in the live schema viewer to build your focused working schema.</p><button id="continue-relations" class="primary" ${ready ? '' : 'disabled'}>Check selection</button>${feedbackMarkup()}${hintMarkup(['Read the nouns in the request and look for relations that represent them.', 'The request needs information about funding rounds and the companies that raised them.'])}`);
      bindHints();
      document.getElementById('continue-relations').addEventListener('click', () => record({ evidence: 'relations', prompt: 'Choose the relations relevant to the business request.', answer: state.selectedRelations.join(', '), feedback: 'The working schema now contains the relations needed for this task.', next: 'output' }));
    } else if (state.current === 'output') {
      choiceQuestion({
        prompt: 'What should one row in the requested result represent?',
        options: [['company', 'a company'], ['funding_round', 'a funding round'], ['investor', 'an investor'], ['sector', 'a sector']],
        correct: 'funding_round', evidence: 'output', next: 'connection',
        feedback: '<div class="concept-callout"><strong>NEW CONCEPT: GRAIN</strong><span>The output grain is one funding round per row.</span><span>Grain = what one row represents.</span></div>',
        after: '',
        wrongFeedback: 'The request asks for every funding round, with company status added to it. Reconsider what the main row still represents.',
        hints: ['Look at the wording of the business request: what does it ask us to list all of?', 'The company status is extra information being added. The main thing being listed is still the funding round.'],
      });
    } else if (state.current === 'connection') {
      choiceQuestion({
        prompt: 'Which column in <code>funding_round</code> identifies the related company?',
        options: [['funding_round_id', '<code>funding_round_id</code>'], ['company_id', '<code>company_id</code>'], ['round_type', '<code>round_type</code>'], ['announced_date', '<code>announced_date</code>']],
        correct: 'company_id', evidence: 'connection', next: 'cardinality', feedback: '<div class="concept-callout"><strong>NEW CONCEPT: PRIMARY KEY / FOREIGN KEY</strong><span><code>company.company_id</code> is the primary key: it uniquely identifies a company row.</span><span><code>funding_round.company_id</code> is a foreign key that references it.</span><span>Its value tells us which company row this funding round belongs to.</span><span>That company row contains the <code>status</code> we need.</span></div>',
        wrongFeedback: 'Look for the column in the funding-round row that identifies a company.',
        hints: ['Look for a column that appears in both relations.', 'Compare <code>funding_round.company_id</code> with <code>company.company_id</code>.'],
      });
    } else if (state.current === 'cardinality') {
      choiceQuestion({ prompt: 'Which statement correctly describes the relationship between <code>company</code> and <code>funding_round</code>?', options: [['correct', 'One company can have many funding rounds, and each funding round belongs to one company.'], ['one', 'One company can have only one funding round.'], ['many', 'One funding round can belong to many companies.'], ['none', 'Companies and funding rounds are unrelated.']], correct: 'correct', evidence: 'cardinality', next: 'baselineRun', feedback: 'Correct.', after: '<div class="concept-callout"><strong>NEW CONCEPT: CARDINALITY</strong><span>One company can have many funding rounds, while each funding round belongs to one company.</span><span><code>company.company_id</code> (PK) ← <code>funding_round.company_id</code> (FK)</span><span><strong>company 1 → M funding_round</strong></span></div>', wrongFeedback: 'Use the PK/FK relationship and the fact that <code>funding_round.company_id</code> is not unique.', hints: ['Inspect the PK on <code>company.company_id</code> and the FK from <code>funding_round.company_id</code>.', '<code>funding_round.company_id</code> is not unique, so multiple funding-round rows can reference one company.'] });
    } else if (state.current === 'baselineRun') {
      if (state.baselineExecuted) {
        choiceQuestion({ intro: '<div class="verification-callout"><strong>Baseline result: 26 rows</strong></div>', prompt: 'What does the number 26 represent here?', options: [['companies', '26 companies'], ['rounds', '26 funding rounds'], ['investors', '26 investors'], ['sectors', '26 sectors']], correct: 'rounds', evidence: 'baseline', next: 'prediction', feedback: '<code>COUNT(*)</code> counts rows. Because <code>funding_round</code> has one funding round per row, 26 rows means 26 funding rounds.', wrongFeedback: '<code>COUNT(*)</code> counts rows. What does one row in <code>funding_round</code> represent?', hints: ['<code>COUNT(*)</code> counts rows. What does one row in <code>funding_round</code> represent?', "The relation's grain is one funding round per row."] });
      } else {
        currentEl.innerHTML = stepShell('Let’s establish a baseline.', `<p class="step-copy">Before combining the two relations, first measure how many rows are currently in <code>funding_round</code>.</p><p class="step-copy">The query below is already prepared for you. Run it and inspect the result.</p>${feedbackMarkup()}${hintMarkup(['We need a baseline for the number of rows in <code>funding_round</code>.', 'Use <code>COUNT(*)</code> on <code>funding_round</code>.'])}`);
        bindHints();
      }
    } else if (state.current === 'prediction') {
      choiceQuestion({ prompt: 'What do you expect to happen when we add <code>company.status</code> to every funding round?', options: [['exact', 'The result should have 26 rows, because each funding round matches one company.'], ['more', 'The result should have more than 26 rows, because each company may have many funding rounds.'], ['fewer', 'The result should have fewer than 26 rows, because several funding rounds may belong to the same company.'], ['unknown', 'We cannot predict the row count from the relationship.']], correct: 'exact', evidence: 'prediction', next: 'operation', feedback: 'We start with 26 <code>funding_round</code> rows — one funding round per row. For each round, <code>company_id</code> points to one company row because <code>company.company_id</code> uniquely identifies a company. Adding <code>status</code> adds information to that existing funding-round row without creating a copy: 26 funding rounds × 1 matching company each = 26 result rows. One company may have many funding rounds, but those are already separate rows in the 26-row baseline. The result keeps one funding round per row.', wrongFeedback: 'Start from one funding-round row. How many company rows should it match?', hints: ['Start from one funding-round row. How many company rows should it match?', "If each funding round matches one company, adding one company's <code>status</code> should add a value to the row rather than multiply it."] });
    } else if (state.current === 'operation') {
      choiceQuestion({ prompt: 'What do we need to do next to answer the business request?', options: [['combine', 'Combine each funding round with its related company.'], ['filter', 'Filter out some funding rounds.'], ['group', 'Summarize funding rounds into groups.'], ['append', 'Append rows from another result.']], correct: 'combine', evidence: 'operation', next: 'sql', feedback: '<div class="concept-callout"><strong>NEW CONCEPT: JOIN</strong><span>A JOIN combines related rows from different relations.</span><span>Here, we want to combine each <code>funding_round</code> row with its related <code>company</code> row.</span></div>', wrongFeedback: 'The request needs company information added to every funding-round row.', hints: ['The missing information lives on a related company row.', 'We need to combine related rows, not remove, summarize, or append rows.'] });
    } else if (state.current === 'sql') {
      const attempts = state.attempts.sql || 0;
      currentEl.innerHTML = stepShell('Implement the JOIN in SQL', `<div class="sql-pattern"><strong>SQL PATTERN: INNER JOIN</strong><pre>SELECT ...
FROM relation_a
 INNER JOIN relation_b
    ON relation_a.key = relation_b.key;</pre><p><code>INNER JOIN</code> keeps rows with a matching row in the other relation. <code>ON</code> tells SQL how to find matches.</p><p class="step-copy">In this case, every funding round has one related company, so the INNER JOIN adds the company’s <code>status</code> while keeping one row per funding round.</p></div><h3>Now write a query that returns every funding round together with the current status of the company that raised it.</h3><button id="output-requirements" type="button" class="requirements-toggle">${state.outputRequirementsOpen ? 'Hide output requirements' : 'Show output requirements'}</button>${state.outputRequirementsOpen ? `<p class="step-copy output-requirements">Required output fields: <code>${REQUIRED_RESULT_COLUMNS.join('</code>, <code>')}</code>.</p>` : ''}<p class="step-copy">Keep the baseline query and write the new statement beneath it.</p>${feedbackMarkup()}${hintMarkup(['The requested columns come from two relations connected by <code>company_id</code>.', 'Use <code>INNER JOIN</code> with <code>ON fr.company_id = c.company_id</code>.'])}${attempts >= 2 ? '<button id="show-solution" type="button">Show solution</button><pre id="solution" hidden>SELECT\n    fr.funding_round_id,\n    fr.company_id,\n    fr.round_type,\n    fr.announced_date,\n    fr.reported_total_amount,\n    c.status\nFROM funding_round AS fr\nINNER JOIN company AS c\n    ON fr.company_id = c.company_id;</pre>' : ''}`);
      bindHints();
      document.getElementById('output-requirements').addEventListener('click', () => { state.outputRequirementsOpen = !state.outputRequirementsOpen; render(); });
      document.getElementById('show-solution')?.addEventListener('click', () => { document.getElementById('solution').hidden = false; });
    } else if (state.current === 'finalGrain') {
      choiceQuestion({ prompt: 'What is the grain of the result?', intro: '<div class="verification-callout"><strong>You predicted 26 rows before writing the join. Did the result match your prediction?</strong><span>Yes. The result contains 26 rows.</span></div>', options: [['company', 'one company per row'], ['funding_round', 'one funding round per row'], ['investor', 'one investor per row'], ['sector', 'one sector per row']], correct: 'funding_round', evidence: 'finalGrain', next: 'complete', feedback: 'The join added company information without changing what one row represents. The result is still at funding-round grain.', wrongFeedback: 'Reconsider what each result row represents.' });
    } else if (state.current === 'complete') {
      const required = ['relations', 'output', 'connection', 'cardinality', 'baseline', 'prediction', 'operation', 'sql', 'finalGrain'];
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
      if (valid) { state.baselineExecuted = true; state.localFeedback = ''; render(); }
      else wrong('The baseline should count the rows in <code>funding_round</code> and return 26. Run the prepared statement with the cursor inside it.');
    } else if (state.current === 'sql') {
      if (validateStageSql(resultSets)) record({ evidence: 'sql', prompt: 'Return every funding round with its company status.', answer: 'Valid 26-row result', next: 'finalGrain', feedback: 'Your result matches the prediction: 26 rows, one for every funding round, with the related company status.' });
      else wrong('Your query ran, but the result does not match the Stage 1 prediction. You expected one row per funding round and 26 rows total. Inspect how the relations were combined.');
    }
  }

  render();

  return { handleSqlSuccess, current: () => state.current, addRelation, isRelationSelected: (name) => state.selectedRelations.includes(name) };
}
