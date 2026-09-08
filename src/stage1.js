const BASELINE_SQL = `SELECT COUNT(*)
FROM news_article;`;

const STEP_META = {
  relations: [1, 'Choose relevant relations'],
  output: [2, 'Output meaning'],
  connection: [3, 'Connecting key'],
  cardinality: [4, 'Cardinality'],
  baselineRun: [5, 'Baseline row count'],
  prediction: [6, 'Predict the result'],
  operation: [7, 'Choose the relational action'],
  sql: [8, 'INNER JOIN and SQL'],
  finalGrain: [9, 'Verify the result'],
  complete: [null, 'Stage complete'],
};

const REQUIRED_RELATIONS = ['news_article', 'news_source'];

export function createStage1({ editor, getDatabase, getSchema, onSelectionChange }) {
  const state = {
    current: 'relations',
    completed: [],
    evidence: new Set(),
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

  function stripMarkup(value) {
    return String(value).replace(/<[^>]+>/g, '');
  }

  function renderRelations() {
    const selected = state.selectedRelations
      .map((name) => getSchema().find((relation) => relation.name === name))
      .filter(Boolean);

    relationEl.innerHTML = selected.length ? selected.map((relation) => `
      <article class="data-card">
        <div class="data-card-title">
          <div class="relation-heading"><span>Working relation</span><code>${escapeHtml(relation.name)}</code></div>
          <button type="button" class="remove-relation" data-remove-relation="${escapeHtml(relation.name)}">Remove</button>
        </div>
        <ul class="working-columns">${relation.columns.map((column) => `<li><code>${escapeHtml(column.column)}</code>${column.pk ? ' <span class="badge">PK</span>' : ''}${relation.foreignKeys.filter((foreignKey) => foreignKey.from === column.column).map((foreignKey) => ` <span class="fk-inline">FK → ${escapeHtml(foreignKey.refTable)}.${escapeHtml(foreignKey.to)}</span>`).join('')}</li>`).join('')}</ul>
      </article>
    `).join('') : '<div class="working-empty">Add relevant relations from the schema.</div>';

    relationEl.querySelectorAll('[data-remove-relation]').forEach((button) => {
      button.addEventListener('click', () => removeRelation(button.dataset.removeRelation));
    });
  }

  function addRelation(name) {
    if (state.selectedRelations.includes(name)) return;
    if (state.selectedRelations.length >= 4) {
      state.localFeedback = 'The working schema can contain up to four relations. Remove one to add another.';
      render();
      return;
    }
    state.selectedRelations.push(name);
    state.localFeedback = '';
    render();
    onSelectionChange();
  }

  function removeRelation(name) {
    state.selectedRelations = state.selectedRelations.filter((item) => item !== name);
    state.localFeedback = '';
    render();
    onSelectionChange();
  }

  function renderCompleted() {
    completedEl.innerHTML = state.completed.map((item, index) => `
      <details class="completed-step" ${index === state.completed.length - 1 ? 'open' : ''}>
        <summary><span class="complete-mark">✓</span> Step ${item.step}: ${escapeHtml(item.label)}</summary>
        <div class="completed-body">
          <p><strong>${escapeHtml(stripMarkup(item.prompt))}</strong></p>
          <p><strong>Your answer:</strong> ${escapeHtml(item.answer)}</p>
          ${item.options ? `<fieldset class="choices review-choices" disabled>${item.options.map(([value, label]) => `<label class="${value === item.value ? 'selected-choice' : ''}"><input type="radio" ${value === item.value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset>` : ''}
          ${item.feedback ? `<div class="review-feedback">${item.feedback}</div>` : ''}
        </div>
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
    state.localFeedback = feedback;
    render();
  }

  function revealEditorWithBaseline() {
    labEl.hidden = false;
    document.querySelectorAll('.lab-action').forEach((element) => { element.hidden = false; });
    if (state.editorRevealed) return;

    const normalized = editor.getValue().replace(/\s+/g, ' ').toLowerCase();
    if (!normalized.includes('select count(*) from news_article')) {
      const separator = editor.getValue().trim() ? '\n\n' : '';
      editor.setValue(`${editor.getValue()}${separator}${BASELINE_SQL}`, 1);
    }

    const baselineStart = editor.getValue().lastIndexOf(BASELINE_SQL);
    if (baselineStart >= 0) {
      const position = editor.session.doc.indexToPosition(baselineStart + BASELINE_SQL.length - 1);
      editor.clearSelection();
      editor.moveCursorToPosition(position);
    }
    state.editorRevealed = true;
  }

  function feedbackMarkup() {
    return state.localFeedback
      ? `<div class="local-feedback incorrect"><strong>Not quite.</strong> ${state.localFeedback.replace(/^Not quite\.\s*/i, '')}</div>`
      : '';
  }

  function stepShell(prompt, body, intro = '') {
    const [step, label] = STEP_META[state.current];
    return step
      ? `<div class="step-kicker">Step ${step} of 9 · ${label}</div>${intro}<h2 class="prompt">${prompt}</h2>${body}`
      : `<h2 class="prompt">${prompt}</h2>${body}`;
  }

  function choiceQuestion({ prompt, options, correct, feedback, wrongFeedback, next, evidence, after = '', intro = '' }) {
    const draft = state.drafts[state.current] || '';
    currentEl.innerHTML = stepShell(prompt, `
      <form id="answer-form" class="answer-form">
        <fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${escapeHtml(value)}" ${draft === value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset>
        <button class="primary" type="submit">Check answer</button>
      </form>
      ${feedbackMarkup()}
    `, intro);

    document.getElementById('answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts[state.current] = answer || '';
      if (answer !== correct) {
        wrong(wrongFeedback);
        return;
      }

      const [step, label] = STEP_META[state.current];
      if (evidence) state.evidence.add(evidence);
      state.completed.push({
        step,
        label,
        prompt,
        answer: stripMarkup(options.find(([value]) => value === answer)[1]),
        value: answer,
        options,
        feedback: `${feedback}${after}`,
      });
      setCurrent(next);
    });
  }

  function hasExactRequiredRelations() {
    return state.selectedRelations.length === REQUIRED_RELATIONS.length
      && REQUIRED_RELATIONS.every((relation) => state.selectedRelations.includes(relation));
  }

  function render() {
    renderRelations();
    renderCompleted();
    relationEl.hidden = false;

    if (['baselineRun', 'prediction', 'operation', 'sql', 'finalGrain', 'complete'].includes(state.current)) {
      revealEditorWithBaseline();
    }
    labEl.classList.toggle('baseline-mode', ['baselineRun', 'prediction', 'operation'].includes(state.current));

    if (state.current === 'relations') {
      const canCheck = state.selectedRelations.length > 0;
      currentEl.innerHTML = stepShell(
        'Choose the relations relevant to the business request.',
        `<p class="step-copy">Use the <strong>+</strong> actions in the full live schema viewer to build your focused working schema.</p><button id="continue-relations" class="primary" ${canCheck ? '' : 'disabled'}>Check selection</button>${feedbackMarkup()}`,
      );
      document.getElementById('continue-relations').addEventListener('click', () => {
        if (!hasExactRequiredRelations()) {
          wrong('The selected relations do not yet provide exactly the article information and publishing-source information requested. Reinspect the schema and revise the Working Schema.');
          return;
        }
        record({
          evidence: 'relations',
          prompt: 'Choose the relations relevant to the business request.',
          answer: state.selectedRelations.join(', '),
          feedback: 'The working schema now contains the two relations needed for this task.',
          next: 'output',
        });
      });
    } else if (state.current === 'output') {
      choiceQuestion({
        prompt: 'What should one row in the requested result represent?',
        options: [['source', 'a news source'], ['article', 'a news article'], ['company', 'a company'], ['publication_date', 'a publication date']],
        correct: 'article',
        evidence: 'output',
        next: 'connection',
        feedback: '<div class="concept-callout"><strong>NEW CONCEPT: GRAIN</strong><span>The output grain is one news article per row.</span><span>Grain = what one row represents.</span></div>',
        wrongFeedback: 'The request asks for every article, with its publishing source added. Reconsider what the main row still represents.',
      });
    } else if (state.current === 'connection') {
      choiceQuestion({
        prompt: 'Which column in <code>news_article</code> identifies the related publishing source?',
        options: [['news_article_id', '<code>news_article_id</code>'], ['news_source_id', '<code>news_source_id</code>'], ['url', '<code>url</code>'], ['title', '<code>title</code>']],
        correct: 'news_source_id',
        evidence: 'connection',
        next: 'cardinality',
        feedback: '<div class="concept-callout"><strong>NEW CONCEPT: PRIMARY KEY / FOREIGN KEY</strong><span><code>news_source.news_source_id</code> is the primary key: it uniquely identifies a news-source row.</span><span><code>news_article.news_source_id</code> is a foreign key that references it.</span><span>Its value tells us which source row published the article.</span><span>That source row contains the <code>name</code> we need.</span></div>',
        wrongFeedback: 'Look for the column in the article row whose value identifies a news source.',
      });
    } else if (state.current === 'cardinality') {
      choiceQuestion({
        prompt: 'Which statement correctly describes the relationship between <code>news_source</code> and <code>news_article</code>?',
        options: [
          ['correct', 'One news source can publish many news articles, and each news article references one news source.'],
          ['one', 'One news source can publish only one news article.'],
          ['many', 'One news article can reference many news sources.'],
          ['none', 'News sources and news articles are unrelated.'],
        ],
        correct: 'correct',
        evidence: 'cardinality',
        next: 'baselineRun',
        feedback: '',
        after: '<div class="concept-callout"><strong>NEW CONCEPT: CARDINALITY</strong><span>One news source can publish many news articles, while each news article references one news source.</span><div class="relationship-diagram"><div class="relationship-node"><strong>news_source</strong><code>news_source_id</code><span>PK</span></div><div class="relationship-link"><span>1 → M</span><i></i></div><div class="relationship-node"><strong>news_article</strong><code>news_source_id</code><span>FK</span></div></div><span><code>news_article.news_source_id</code> (FK) <strong>references</strong> <code>news_source.news_source_id</code> (PK)</span></div>',
        wrongFeedback: 'Use the PK/FK relationship: each article stores one source ID, while the same source ID may appear in multiple article rows.',
      });
    } else if (state.current === 'baselineRun') {
      if (state.baselineExecuted) {
        choiceQuestion({
          intro: '<div class="verification-callout"><strong>Baseline result: 18 rows</strong></div>',
          prompt: 'What does the number 18 represent here?',
          options: [['sources', '18 news sources'], ['articles', '18 news articles'], ['companies', '18 companies'], ['dates', '18 publication dates']],
          correct: 'articles',
          evidence: 'baseline',
          next: 'prediction',
          feedback: '<code>COUNT(*)</code> counts rows. Because <code>news_article</code> has one article per row, 18 rows means 18 news articles.',
          wrongFeedback: '<code>COUNT(*)</code> counts rows. What does one row in <code>news_article</code> represent?',
        });
      } else {
        currentEl.innerHTML = stepShell(
          'Let’s establish a baseline.',
          `<p class="step-copy">Before combining the two relations, first measure how many rows are currently in <code>news_article</code>.</p><p class="step-copy">The query below is already prepared for you. Run it and inspect the result.</p>${feedbackMarkup()}`,
        );
      }
    } else if (state.current === 'prediction') {
      choiceQuestion({
        prompt: 'What do you expect to happen when we add the publishing source’s <code>name</code> to every news article?',
        options: [
          ['exact', 'The result should have 18 rows, because each article matches one news source.'],
          ['more', 'The result should have more than 18 rows, because one source may publish many articles.'],
          ['fewer', 'The result should have fewer than 18 rows, because several articles may share one source.'],
          ['unknown', 'We cannot predict the row count from the relationship.'],
        ],
        correct: 'exact',
        evidence: 'prediction',
        next: 'operation',
        feedback: '<div class="prediction-explanation"><p>We start with 18 <code>news_article</code> rows — one article per row.</p><p>For each article, <code>news_source_id</code> points to one source row because <code>news_source.news_source_id</code> uniquely identifies a source.</p><p>Adding <code>name</code> adds information to that existing article row without creating a copy:</p><p class="prediction-equation">18 news articles × 1 matching source each = 18 result rows.</p><p>One source may publish many articles, but those articles are already separate rows in the baseline.</p><p class="grain-takeaway">The result keeps one news article per row.</p></div>',
        wrongFeedback: 'Start from one article row. How many source rows does its foreign key reference?',
      });
    } else if (state.current === 'operation') {
      choiceQuestion({
        prompt: 'What do we need to do next to answer the business request?',
        options: [
          ['combine', 'Combine each news article with its related news source.'],
          ['filter', 'Filter out some news articles.'],
          ['group', 'Summarize news articles into groups.'],
          ['append', 'Append rows from another result.'],
        ],
        correct: 'combine',
        evidence: 'operation',
        next: 'sql',
        feedback: '<div class="concept-callout"><strong>NEW CONCEPT: JOIN</strong><span>A JOIN combines related rows from different relations.</span><span>Here, we want to combine each <code>news_article</code> row with its related <code>news_source</code> row.</span></div>',
        wrongFeedback: 'The request needs publishing-source information added to every article row.',
      });
    } else if (state.current === 'sql') {
      currentEl.innerHTML = stepShell('Implement the JOIN in SQL', `
        <div class="sql-pattern">
          <strong>SQL PATTERN: INNER JOIN</strong>
          <pre>SELECT ...
FROM relation_a
INNER JOIN relation_b
  ON relation_a.key = relation_b.key;</pre>
          <p><code>INNER JOIN</code> keeps rows with a matching row in the other relation. <code>ON</code> tells SQL how to find matches.</p>
          <p class="step-copy">In this case, every news article references one news source, so the INNER JOIN adds the source’s <code>name</code> while keeping one row per article.</p>
        </div>
        <h3>Now write a query that returns every article’s <code>title</code> together with the <code>name</code> of the source that published it.</h3>
        <button id="output-requirements" type="button" class="requirements-toggle">${state.outputRequirementsOpen ? 'Hide output requirements' : 'Show output requirements'}</button>
        ${state.outputRequirementsOpen ? '<p class="step-copy output-requirements">Required output fields: <code>news_article.title</code> and <code>news_source.name</code>.</p>' : ''}
        <p class="step-copy">Keep the baseline query and write the new statement beneath it.</p>
        ${feedbackMarkup()}
      `);
      document.getElementById('output-requirements').addEventListener('click', () => {
        state.outputRequirementsOpen = !state.outputRequirementsOpen;
        render();
      });
    } else if (state.current === 'finalGrain') {
      choiceQuestion({
        prompt: 'What is the grain of the result?',
        intro: '<div class="verification-callout"><strong>You predicted 18 rows before writing SQL.</strong><span>The result contains 18 rows, matching the prediction.</span></div>',
        options: [['source', 'one news source per row'], ['article', 'one news article per row'], ['company', 'one company per row'], ['date', 'one publication date per row']],
        correct: 'article',
        evidence: 'finalGrain',
        next: 'complete',
        feedback: 'The JOIN added the source name without changing what one row represents. The result keeps one news article per row and preserves the 18-row baseline.',
        wrongFeedback: 'Reconsider what each row still represents after the source name is added.',
      });
    } else if (state.current === 'complete') {
      const requiredEvidence = ['relations', 'output', 'connection', 'cardinality', 'baseline', 'prediction', 'operation', 'sql', 'finalGrain'];
      const complete = requiredEvidence.every((item) => state.evidence.has(item));
      currentEl.innerHTML = stepShell('Stage complete', `
        <div class="completion-state"><div class="completion-icon">✓</div><p>${complete ? 'You identified the relevant relations, reasoned about the article grain and relationship, predicted the JOIN behavior, implemented it in SQL, and verified the result.' : 'The required learning evidence is incomplete.'}</p></div>
      `);
    }
  }

  function normalizedRows(values) {
    return values.map((row) => JSON.stringify(row)).sort();
  }

  function validateArticleSourceResult(statement, resultSets) {
    if (!resultSets.length) return false;
    if (!/\b(?:inner\s+)?join\b/i.test(statement) || !/\bon\b/i.test(statement)) return false;
    const result = resultSets.at(-1);
    if (result.columns.length !== 2 || result.values.length !== 18) return false;

    const expected = getDatabase().exec(`
      SELECT news_article.title, news_source.name
      FROM news_article
      INNER JOIN news_source
        ON news_article.news_source_id = news_source.news_source_id;
    `)[0]?.values ?? [];

    const resultRows = normalizedRows(result.values);
    const expectedRows = normalizedRows(expected);
    const reversedExpectedRows = normalizedRows(expected.map(([title, name]) => [name, title]));
    return resultRows.every((row, index) => row === expectedRows[index])
      || resultRows.every((row, index) => row === reversedExpectedRows[index]);
  }

  function handleSqlSuccess(statement, resultSets) {
    if (state.current === 'baselineRun') {
      const result = resultSets.at(-1);
      const isBaseline = resultSets.length === 1
        && result?.values?.length === 1
        && result.values[0]?.length === 1
        && result.values[0][0] === 18;

      if (isBaseline) {
        state.baselineExecuted = true;
        state.localFeedback = '';
        render();
      } else {
        wrong('The prepared measurement should return the 18 rows in <code>news_article</code>. Run that statement and inspect its result.');
      }
    } else if (state.current === 'sql') {
      if (validateArticleSourceResult(statement, resultSets)) {
        record({
          evidence: 'sql',
          prompt: 'Return every article title with the name of its publishing source.',
          answer: 'A semantically correct 18-row article-and-source result',
          feedback: 'The query produced one row for every article, with the name of its related publishing source.',
          next: 'finalGrain',
        });
      } else {
        wrong('The SQL ran, but the result does not yet contain exactly the 18 article titles paired with their publishing-source names. Inspect the selected fields and the relationship used in <code>ON</code>, then retry.');
      }
    }
  }

  render();

  return {
    handleSqlSuccess,
    current: () => state.current,
    addRelation,
    isRelationSelected: (name) => state.selectedRelations.includes(name),
  };
}
