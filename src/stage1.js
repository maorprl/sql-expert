const BASELINE_SQL = 'SELECT COUNT(*) FROM news_article;';

const INTERACTION_LABELS = {
  relations: 'Identify relevant relations',
  output: 'Determine output grain',
  connection: 'Understand the relationship · Connecting key',
  cardinality: 'Understand the relationship · Cardinality',
  baselineRun: 'Establish the baseline',
  prediction: 'Predict behavior',
  operation: 'Choose the relational action',
  sql: 'Learn and implement JOIN',
  finalGrain: 'Verify the result',
  complete: 'Stage complete',
};

const REQUIRED_RELATIONS = ['news_article', 'news_source'];

export function createStage1({ editor, getDatabase, getSchema, onSelectionChange, interactionLifecycle }) {
  const state = {
    current: 'relations', completed: [], evidence: new Set(), drafts: {}, localFeedback: '',
    selectedRelations: [], selectedColumn: '', baselineExecuted: false, pendingAdvance: null,
  };

  const relationEl = document.getElementById('relation-preview');
  const workingStatusEl = document.getElementById('working-schema-status');
  const labEl = document.getElementById('lab-workspace');
  const learningEl = document.querySelector('.learning-panel');

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  }

  function stripMarkup(value) {
    const element = document.createElement('div');
    element.innerHTML = value;
    return element.textContent || '';
  }

  function relationshipLevel() {
    if (state.evidence.has('cardinality')) return 2;
    if (state.evidence.has('connection')) return 1;
    return 0;
  }

  function relationClass(name) {
    if (!state.evidence.has('output') || relationshipLevel() > 0) return '';
    return name === 'news_article' ? ' grain-focus' : name === 'news_source' ? ' grain-quiet' : '';
  }

  function renderColumn(relation, column) {
    const keyLevel = relationshipLevel();
    const isConnectingChoice = state.current === 'connection' && !state.pendingAdvance && relation.name === 'news_article';
    const isSelected = isConnectingChoice && state.selectedColumn === column.column;
    const isArticleForeignKey = keyLevel > 0 && relation.name === 'news_article' && column.column === 'news_source_id';
    const isSourcePrimaryKey = keyLevel > 0 && relation.name === 'news_source' && column.column === 'news_source_id';
    const isOutputField = ['sql', 'finalGrain', 'complete'].includes(state.current)
      && ((relation.name === 'news_article' && column.column === 'title') || (relation.name === 'news_source' && column.column === 'name'));
    const classes = [isSelected ? 'selected-column' : '', isArticleForeignKey || isSourcePrimaryKey ? 'relationship-column' : '', isOutputField ? 'output-column' : ''].filter(Boolean).join(' ');
    const badge = isArticleForeignKey ? '<span class="key-badge">FK</span>' : isSourcePrimaryKey ? '<span class="key-badge">PK</span>' : '';
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
    if (state.current === 'relations') return state.pendingAdvance ? 'The selected relations are established' : 'Build it from the live schema';
    if (state.current === 'output') return 'The selected relations stay with the problem';
    if (state.current === 'connection') return state.pendingAdvance ? 'The established PK/FK relationship is now visible' : 'Select a column directly in news_article';
    if (state.current === 'cardinality') return 'The established PK/FK relationship is now visible';
    if (relationshipLevel() > 1) return 'One source → many articles';
    return 'Selected relations persist as you reason';
  }

  function renderRelations() {
    const selected = orderedSelectedRelations();
    const showRelationship = relationshipLevel() > 0 && REQUIRED_RELATIONS.every((name) => state.selectedRelations.includes(name));
    relationEl.classList.toggle('relationship-visible', showRelationship);
    relationEl.classList.toggle('cardinality-visible', relationshipLevel() > 1);
    workingStatusEl.textContent = workingSchemaStatus();

    if (!selected.length) {
      relationEl.innerHTML = '<div class="working-empty">Choose relevant relations from the live schema.</div>';
      return;
    }

    const cards = selected.map((relation) => `
      <article class="data-card${relationClass(relation.name)}" data-relation="${escapeHtml(relation.name)}">
        ${state.evidence.has('output') && relation.name === 'news_article' ? '<div class="grain-marker">1 result row = 1 news article</div>' : ''}
        <div class="data-card-title"><code>${escapeHtml(relation.name)}</code>${state.current === 'relations' && !state.pendingAdvance ? `<button type="button" class="remove-relation" data-remove-relation="${escapeHtml(relation.name)}">Remove</button>` : ''}</div>
        <ul class="working-columns">${relation.columns.map((column) => renderColumn(relation, column)).join('')}</ul>
      </article>
    `);

    if (showRelationship && cards.length >= 2) {
      cards.splice(1, 0, `<div class="schema-connector" aria-label="news_article.news_source_id references news_source.news_source_id"><span class="connector-cardinality">${relationshipLevel() > 1 ? 'M ← 1' : ''}</span><span class="connector-line"></span><span class="connector-labels"><b>FK</b><b>PK</b></span></div>`);
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
      summaryHtml: `<span class="complete-mark">✓</span><span>${escapeHtml(item.label)}</span><span class="completed-answer">${escapeHtml(item.answer)}</span>`,
      reviewHtml: `<p class="review-question"><strong>${escapeHtml(stripMarkup(item.prompt))}</strong></p><p><strong>Your answer:</strong> ${escapeHtml(item.answer)}</p>${item.options ? `<fieldset class="choices review-choices" disabled>${item.options.map(([value, label]) => `<label class="${value === item.value ? 'selected-choice' : ''}"><input type="radio" ${value === item.value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset>` : ''}${item.feedback ? `<div class="review-feedback">${item.feedback}</div>` : ''}`,
    })));
  }

  function setCurrent(next) {
    state.current = next;
    state.localFeedback = '';
    render();
    onSelectionChange();
  }

  function record({ evidence, prompt, answer, feedback = '', next, label, value, options }) {
    if (evidence) state.evidence.add(evidence);
    const item = { id: state.current, label: label || INTERACTION_LABELS[state.current], prompt, answer, feedback, value, options };
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

  function renderAcknowledgement() {
    const { next, item } = state.pendingAdvance;
    const continueLabel = next === 'complete' ? 'Complete stage' : next === 'finalGrain' ? 'Continue to verification' : 'Continue';
    interactionLifecycle.renderCurrent(stepShell(item.prompt, `
      <p class="confirmed-answer"><strong>Your answer:</strong> ${escapeHtml(item.answer)}</p>
      ${item.feedback}
      <button id="continue-after-feedback" class="primary continue-after-feedback">${continueLabel}</button>
    `));
    document.getElementById('continue-after-feedback').addEventListener('click', () => {
      state.pendingAdvance = null;
      setCurrent(next);
    });
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

  function hasExactRequiredRelations() {
    return state.selectedRelations.length === REQUIRED_RELATIONS.length && REQUIRED_RELATIONS.every((relation) => state.selectedRelations.includes(relation));
  }

  function updateWorkspaceVisibility() {
    const visible = ['sql', 'finalGrain', 'complete'].includes(state.current);
    labEl.hidden = !visible;
    learningEl.classList.toggle('sql-active', visible);
    document.querySelectorAll('.lab-action').forEach((element) => { element.hidden = !visible; });
  }

  function render() {
    renderRelations();
    renderCompleted();
    updateWorkspaceVisibility();

    if (state.pendingAdvance) {
      renderAcknowledgement();
      return;
    }

    if (state.current === 'relations') {
      interactionLifecycle.renderCurrent(stepShell('Which relations contain the information we need?', `<p class="step-copy">Add the relevant relations from the Live Schema to the Working Schema.</p><button id="continue-relations" class="primary" ${state.selectedRelations.length ? '' : 'disabled'}>Check selection</button>${feedbackMarkup()}`));
      document.getElementById('continue-relations').addEventListener('click', () => {
        if (!hasExactRequiredRelations()) return wrong('The selection does not yet provide exactly the article and publishing-source information requested. Reinspect the Live Schema and revise it.');
        record({ evidence: 'relations', prompt: 'Which relations contain the information we need?', answer: 'news_article and news_source', feedback: '<div class="success-feedback">Working Schema now contains <code>news_article</code> and <code>news_source</code>.</div>', next: 'output' });
      });
    } else if (state.current === 'output') {
      choiceQuestion({ prompt: 'What should one row in the requested result represent?', options: [['article', 'a news article'], ['source', 'a news source'], ['country', 'a country'], ['pair', 'a combination of article and source']], correct: 'article', evidence: 'output', next: 'connection', feedback: '<div class="success-feedback">Correct. Each result row represents one news article.</div><div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>Grain</b><span>Grain = what one row represents.</span></div>', wrongFeedback: 'The request asks for every article, with source information added. Reconsider what the main row still represents.' });
    } else if (state.current === 'connection') {
      interactionLifecycle.renderCurrent(stepShell('Which column in <code>news_article</code> identifies the related publishing source?', `<p class="step-copy">Select the column directly in the Working Schema.</p><button id="check-column" class="primary" ${state.selectedColumn ? '' : 'disabled'}>Check selected column</button>${feedbackMarkup()}`));
      document.getElementById('check-column').addEventListener('click', () => {
        if (state.selectedColumn !== 'news_source_id') return wrong('Look for the column in the article row whose value identifies a news source. The relationship remains hidden until the correct key is established.');
        record({ evidence: 'connection', prompt: 'Which column in news_article identifies the related publishing source?', answer: 'news_article.news_source_id', feedback: '<div class="success-feedback">Correct. Its value tells us which <code>news_source</code> row published that article.</div><div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>Primary Key / Foreign Key</b><span><code>news_article.news_source_id</code> is the FK referencing <code>news_source.news_source_id</code>, the PK. The referenced source row contains the <code>name</code> needed in the result.</span></div>', next: 'cardinality' });
      });
    } else if (state.current === 'cardinality') {
      choiceQuestion({ prompt: 'Which statement correctly describes this relationship?', options: [['correct', 'One source can publish many articles; each article references one source.'], ['article-many', 'One article has many sources.'], ['source-one', 'Many sources publish one article.'], ['many', 'Many-to-many.']], correct: 'correct', evidence: 'cardinality', next: 'baselineRun', feedback: '<div class="success-feedback">Correct. Each article has one referenced source; one source may be referenced by many articles.</div><div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>Cardinality</b><span>The relationship is one news source → many news articles.</span></div>', wrongFeedback: 'Use the PK/FK structure: each article stores one source ID, while the same source ID can appear in multiple article rows.' });
    } else if (state.current === 'baselineRun') {
      if (!state.baselineExecuted) {
        interactionLifecycle.renderCurrent(stepShell('First measure the article rows.', `<p class="step-copy">Run this prepared measurement and inspect the result. You do not need to write SQL for this measurement.</p><div class="baseline-measure"><code>${BASELINE_SQL}</code><button id="run-baseline" class="primary">Run measurement</button></div>${feedbackMarkup()}`));
        document.getElementById('run-baseline').addEventListener('click', () => {
          const result = getDatabase()?.exec(BASELINE_SQL)[0];
          if (result?.values?.[0]?.[0] !== 18) return wrong('The prepared measurement did not return the expected Stage 1 baseline. Reset the database and try again.');
          state.baselineExecuted = true; state.localFeedback = ''; render();
        });
      } else {
        choiceQuestion({ intro: '<div class="baseline-result"><span>Baseline result</span><strong>18</strong><span>rows</span></div>', prompt: 'What does the number 18 represent here?', options: [['articles', '18 news articles'], ['sources', '18 news sources'], ['companies', '18 companies'], ['dates', '18 publication dates']], correct: 'articles', evidence: 'baseline', next: 'prediction', feedback: '<div class="success-feedback"><code>COUNT(*)</code> counted rows. Because <code>news_article</code> has one article per row, 18 rows means 18 news articles.</div>', wrongFeedback: 'The measurement counts rows in news_article. What does one row in that relation represent?' });
      }
    } else if (state.current === 'prediction') {
      choiceQuestion({ intro: '<div class="baseline-result compact"><span>Established baseline</span><strong>18</strong><span>news articles</span></div>', prompt: 'If we add each article’s publishing-source name, how many result rows should we expect?', options: [['exact', '18 rows'], ['sources', '4 rows'], ['more', 'more than 18 rows']], correct: 'exact', evidence: 'prediction', next: 'operation', feedback: '<div class="success-feedback">Correct. The result preserves the article rows.</div><div class="prediction-equation">18 news articles × 1 matching source each = 18 result rows</div><p class="grain-takeaway">The grain remains one news article per row.</p>', wrongFeedback: 'Start from one article row. How many source rows does its foreign key reference?' });
    } else if (state.current === 'operation') {
      choiceQuestion({ prompt: 'What should we do to add the related source information to each article?', options: [['combine', 'Combine each article with its related source.'], ['filter', 'Filter articles by source.'], ['aggregate', 'Aggregate all sources into one row.']], correct: 'combine', evidence: 'operation', next: 'sql', feedback: '<div class="success-feedback">Correct. We need to combine each article with its matching source row.</div><div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>JOIN</b><span>A JOIN combines related rows from different relations.</span></div>', wrongFeedback: 'The request needs publishing-source information added to every existing article row.' });
    } else if (state.current === 'sql') {
      interactionLifecycle.renderCurrent(stepShell('Implement the relationship with <code>INNER JOIN ... ON ...</code>', `<div class="sql-pattern"><strong>PATTERN</strong><pre>FROM news_article
INNER JOIN news_source
  ON news_article.news_source_id
   = news_source.news_source_id</pre><p><code>INNER JOIN</code> combines rows that match. <code>ON</code> states how SQL finds that match.</p></div><p class="step-copy">Write SQL that returns each article’s <code>title</code> with its publishing source’s <code>name</code>.</p><div class="output-requirements"><strong>What to preserve</strong><span>Expected result: 18 rows, one news article per row, with the correct source name added.</span></div>${feedbackMarkup()}`));
    } else if (state.current === 'finalGrain') {
      choiceQuestion({ intro: '<div class="verification-callout"><strong>Semantically correct result</strong><span>18 rows with every article paired to its referenced source.</span></div>', prompt: 'Does the result preserve one news article per row and the predicted 18-row baseline?', options: [['yes', 'Yes — one news article per row, 18 rows'], ['no', 'No — the grain changed to one source per row']], correct: 'yes', evidence: 'finalGrain', next: 'complete', feedback: '<div class="success-feedback">Yes. The JOIN added the source name without changing what one row represents.</div>', wrongFeedback: 'Compare the 18 result rows with the earlier baseline and inspect what each row represents.' });
    } else if (state.current === 'complete') {
      const requiredEvidence = ['relations', 'output', 'connection', 'cardinality', 'baseline', 'prediction', 'operation', 'sql', 'finalGrain'];
      const complete = requiredEvidence.every((item) => state.evidence.has(item));
      interactionLifecycle.renderCurrent(stepShell('Stage complete', `<div class="completion-state"><div class="completion-icon">✓</div><p>${complete ? 'You preserved one article per row while adding its publishing source, and verified the 18-row result.' : 'The required learning evidence is incomplete.'}</p></div>`));
    }
  }

  function normalizedRows(values) { return values.map((row) => JSON.stringify(row)).sort(); }

  function validateArticleSourceResult(statement, resultSets) {
    if (!resultSets.length || !/\b(?:inner\s+)?join\b/i.test(statement) || !/\bon\b/i.test(statement)) return false;
    const result = resultSets.at(-1);
    if (result.columns.length !== 2 || result.values.length !== 18) return false;
    const expected = getDatabase().exec('SELECT news_article.title, news_source.name FROM news_article INNER JOIN news_source ON news_article.news_source_id = news_source.news_source_id;')[0]?.values ?? [];
    const actualRows = normalizedRows(result.values);
    const expectedRows = normalizedRows(expected);
    const reversedRows = normalizedRows(expected.map(([title, name]) => [name, title]));
    return actualRows.every((row, index) => row === expectedRows[index]) || actualRows.every((row, index) => row === reversedRows[index]);
  }

  function handleSqlSuccess(statement, resultSets) {
    if (state.current !== 'sql') return;
    if (!validateArticleSourceResult(statement, resultSets)) return wrong('The SQL ran, but the result does not yet contain exactly the 18 article titles paired with their publishing-source names. Inspect the selected fields and the relationship in <code>ON</code>, then retry.');
    record({ evidence: 'sql', prompt: 'Return every article title with the name of its publishing source.', answer: 'Semantically correct 18-row article-and-source result', feedback: '<div class="success-feedback">The query produced one row for every article, with the name of its related publishing source.</div>', next: 'finalGrain' });
  }

  render();
  return { handleSqlSuccess, current: () => state.current, addRelation, isRelationSelected: (name) => state.selectedRelations.includes(name), relationshipLevel, canAddRelations: () => state.current === 'relations' && !state.pendingAdvance };
}
