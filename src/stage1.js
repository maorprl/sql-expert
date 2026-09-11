import './stage1-corrections.css';

const BASELINE_SQL = 'SELECT COUNT(*) FROM news_article;';

const INTERACTION_LABELS = {
  relations: 'Identify relevant relations',
  output: 'Determine row meaning',
  connection: 'Understand the relationship',
  cardinality: 'Understand the relationship',
  baselineRun: 'Establish the baseline',
  prediction: 'Predict behavior',
  operation: 'Choose what to do with the rows',
  joinTeaching: 'Learn how JOIN expresses the match',
  sql: 'Implement the JOIN',
  finalGrain: 'Verify the result',
  complete: 'Stage complete',
};

const REQUIRED_RELATIONS = ['news_article', 'news_source'];

export function createStage1({ editor, getDatabase, getSchema, onSelectionChange, interactionLifecycle }) {
  const state = {
    current: 'relations', completed: [], evidence: new Set(), drafts: {}, localFeedback: '',
    selectedRelations: [], selectedColumn: '', baselineExecuted: false, baselinePrepared: false,
    implementationPrepared: false, pendingAdvance: null, joinTeachingBeat: 1,
  };

  const relationEl = document.getElementById('relation-preview');
  const workingStatusEl = document.getElementById('working-schema-status');
  const labEl = document.getElementById('lab-workspace');
  const learningEl = document.querySelector('.learning-panel');

  function escapeHtml(value) {
    return String(value).replace(/[&<>'\"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '\"': '&quot;' }[character]));
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

  function renderColumn(relation, column) {
    const keyLevel = relationshipLevel();
    const isConnectingChoice = state.current === 'connection' && !state.pendingAdvance && relation.name === 'news_article';
    const isSelected = isConnectingChoice && state.selectedColumn === column.column;
    const isArticleForeignKey = keyLevel > 0 && relation.name === 'news_article' && column.column === 'news_source_id';
    const isSourcePrimaryKey = keyLevel > 0 && relation.name === 'news_source' && column.column === 'news_source_id';
    const isOutputField = ['joinTeaching', 'sql', 'finalGrain', 'complete'].includes(state.current)
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
    if (state.current === 'relations') return state.pendingAdvance ? 'Articles + source information selected' : 'Build it from the live schema';
    if (state.current === 'connection') return state.pendingAdvance
      ? 'news_article.news_source_id → news_source.news_source_id'
      : 'Which article column tells us the source?';
    if (state.current === 'cardinality') return 'news_article.news_source_id → news_source.news_source_id';
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
      <article class="data-card" data-relation="${escapeHtml(relation.name)}">
        <div class="data-card-title"><code>${escapeHtml(relation.name)}</code>${state.current === 'relations' && !state.pendingAdvance ? `<button type="button" class="remove-relation" data-remove-relation="${escapeHtml(relation.name)}">Remove</button>` : ''}</div>
        <ul class="working-columns">${relation.columns.map((column) => renderColumn(relation, column)).join('')}</ul>
      </article>
    `);

    if (showRelationship && cards.length >= 2) {
      cards.splice(1, 0, `<div class="schema-connector" aria-label="One news source can publish many news articles"><span class="connector-cardinality">${relationshipLevel() > 1 ? '1 news_source → M news_article rows' : ''}</span><span class="connector-line"></span></div>`);
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
      interactionLifecycle.renderCurrent(stepShell('Baseline established.', '<p class="step-copy">The measurement now gives us a concrete starting point for the next prediction.</p>'));
      renderWorkspaceAction(`
        ${item.feedback}
        <p class="evidence-bridge">Next, use this baseline together with the one-source-per-article relationship to predict what should happen when source information is added.</p>
        <button id="continue-after-baseline" class="primary">Continue</button>
      `, 'baseline-followup');
      continueFromPending('continue-after-baseline');
      return;
    }

    if (item.id === 'sql' && next === 'finalGrain') {
      interactionLifecycle.renderCurrent(stepShell('Inspect the result.', '<p class="step-copy">Your query ran. Use the returned rows and columns as evidence before deciding whether the earlier prediction held.</p>'));
      renderWorkspaceAction(`
        ${item.feedback}
        <p class="evidence-bridge">Compare what you see with the earlier prediction: 18 rows, one article per row.</p>
        <button id="continue-to-verification" class="primary">Continue to verification</button>
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
      record({ evidence, prompt, answer: stripMarkup(options.find(([value]) => value === answer)[1]), value: answer, options, feedback, next });
    });
  }

  function renderBaselineInterpretation() {
    const options = [
      ['articles', '18 news articles'],
      ['sources', '18 news sources'],
      ['companies', '18 companies'],
      ['dates', '18 publication dates'],
    ];
    const draft = state.drafts.baselineRun || '';
    interactionLifecycle.renderCurrent(stepShell('Interpret the measurement.', '<p class="step-copy">The prepared query has run. Keep the result in view and identify what it tells us about our starting point.</p>'));
    const action = renderWorkspaceAction(`
      <div class="evidence-kicker">Interpret the evidence</div>
      <h3>What does the number 18 represent here?</h3>
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
      if (answer !== 'articles') return wrong('The prepared query counts rows in news_article. What does one row in that relation represent?');
      record({
        evidence: 'baseline',
        prompt: 'What does the number 18 represent here?',
        answer: '18 news articles',
        value: 'articles',
        options,
        feedback: '<div class="success-feedback">Correct. We have 18 starting article rows. This is our baseline.</div>',
        next: 'prediction',
      });
    });
  }

  function hasExactRequiredRelations() {
    return state.selectedRelations.length === REQUIRED_RELATIONS.length && REQUIRED_RELATIONS.every((relation) => state.selectedRelations.includes(relation));
  }

  function updateWorkspaceVisibility() {
    const baselineWorkspace = state.current === 'baselineRun';
    const implementationWorkspace = ['sql', 'finalGrain', 'complete'].includes(state.current);
    const visible = baselineWorkspace || implementationWorkspace;
    const baselineEvidence = baselineWorkspace && state.baselineExecuted;
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
    learningEl.classList.toggle('join-teaching-active', state.current === 'joinTeaching');
    learningEl.classList.toggle('sql-implementation-active', sqlImplementation);
    learningEl.classList.toggle('results-evidence-active', resultsEvidence);

    document.querySelector('.editor-header h2').textContent = baselineWorkspace ? 'Baseline measurement' : 'JOIN implementation';
    document.querySelectorAll('.lab-action').forEach((element) => {
      element.hidden = !visible || baselineEvidence || resultsEvidence;
    });
  }

  function renderJoinTeaching() {
    const beat = state.joinTeachingBeat;
    const beatMarkup = beat === 1 ? `
      <section class="teaching-beat active-beat">
        <div class="teaching-beat-heading"><span>1</span><div><strong>First, match the rows</strong><p>JOIN combines an article row with the source row that has the same <code>news_source_id</code>.</p></div></div>
        <div class="row-match-visual" aria-label="One article row and its matching source row produce one result row">
          <div class="example-row article-row"><strong>news_article row</strong><span><code>title</code><b>CloudFence raises Series B</b></span><span class="match-value"><code>news_source_id</code><b>1</b></span></div>
          <span class="row-operator">+</span>
          <div class="example-row source-row"><strong>matching news_source row</strong><span class="match-value"><code>news_source_id</code><b>1</b></span><span><code>name</code><b>TechLedger</b></span></div>
          <span class="row-operator">→</span>
          <div class="example-row result-row"><strong>result row</strong><span><code>title</code><b>CloudFence raises Series B</b></span><span><code>name</code><b>TechLedger</b></span></div>
        </div>
      </section>
    ` : beat === 2 ? `
      <section class="teaching-beat active-beat">
        <div class="teaching-beat-heading"><span>2</span><div><strong>Tell SQL how the rows match</strong><p>The relationship you already found becomes the match condition inside <code>ON</code>.</p></div></div>
        <div class="relationship-on-map"><span>Relationship already established</span><code>news_article.news_source_id = news_source.news_source_id</code><span class="on-arrow">becomes</span><code>ON news_article.news_source_id = news_source.news_source_id</code></div>
      </section>
    ` : `
      <section class="teaching-beat active-beat">
        <div class="teaching-beat-heading"><span>3</span><div><strong>Now translate what we already know into SQL</strong><p>Each clause carries one part of the business request and the relational reasoning.</p></div></div>
        <dl class="query-map">
          <div><dt>requested information</dt><dd><code>SELECT news_article.title, news_source.name</code></dd></div>
          <div><dt>starting article rows</dt><dd><code>FROM news_article</code></dd></div>
          <div><dt>add the matching source</dt><dd><code>JOIN news_source</code></dd></div>
          <div><dt>how the rows match</dt><dd><code>ON news_article.news_source_id = news_source.news_source_id</code></dd></div>
        </dl>
        <div class="output-requirements"><strong>Earlier prediction</strong><span>18 result rows · one news article per row</span></div>
      </section>
    `;

    interactionLifecycle.renderCurrent(stepShell('See how the relationship becomes a JOIN.', `
      <div class="join-progress" aria-label="JOIN explanation progress"><span>Teaching step ${beat} of 3</span><div><i class="${beat >= 1 ? 'done' : ''}"></i><i class="${beat >= 2 ? 'done' : ''}"></i><i class="${beat >= 3 ? 'done' : ''}"></i></div></div>
      <div class="join-teaching">${beatMarkup}</div>
      <div class="teaching-navigation">
        <button id="join-teaching-next" class="primary">${beat < 3 ? (beat === 1 ? 'Next: express the match in SQL' : 'Next: build the whole query') : 'Continue to SQL implementation'}</button>
      </div>
    `));

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
    clearWorkspaceAction();
    renderRelations();
    renderCompleted();
    updateWorkspaceVisibility();

    if (state.pendingAdvance) {
      renderAcknowledgement();
      return;
    }

    if (state.current === 'relations') {
      interactionLifecycle.renderCurrent(stepShell('Which relations contain the information we need?', '<p class="step-copy">Add the relevant relations from the Live Schema to the Working Schema.</p><button id="continue-relations" class="primary" disabled>Check selection</button>' + feedbackMarkup()));
      const relationButton = document.getElementById('continue-relations');
      relationButton.disabled = !state.selectedRelations.length;
      relationButton.addEventListener('click', () => {
        if (!hasExactRequiredRelations()) return wrong('The selection does not yet provide exactly the article and publishing-source information requested. Reinspect the Live Schema and revise it.');
        record({
          evidence: 'relations',
          prompt: 'Which relations contain the information we need?',
          answer: 'news_article and news_source',
          feedback: '<div class="success-feedback">Correct. <code>news_article</code> gives us the articles, and <code>news_source</code> contains the source information we need. Now we need to work out how an article is connected to its source.</div>',
          next: 'connection',
        });
      });
    } else if (state.current === 'connection') {
      interactionLifecycle.renderCurrent(stepShell('Which column in <code>news_article</code> tells us which source published the article?', `<p class="step-copy">Select the column directly in the Working Schema.</p><button id="check-column" class="primary" ${state.selectedColumn ? '' : 'disabled'}>Check selected column</button>${feedbackMarkup()}`));
      document.getElementById('check-column').addEventListener('click', () => {
        if (state.selectedColumn !== 'news_source_id') return wrong('Look at the article row and ask which column could tell us which source published it. The relationship stays hidden until you establish that connection.');
        record({
          evidence: 'connection',
          prompt: 'Which column in news_article tells us which source published the article?',
          answer: 'news_article.news_source_id',
          feedback: '<div class="success-feedback">Correct. <code>news_source_id</code> tells us which source belongs to this article.</div><div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>Primary Key / Foreign Key</b><span>You just found the link between the two relations. <code>news_article.news_source_id</code> is a Foreign Key (FK). It points to <code>news_source.news_source_id</code>, the Primary Key (PK). That lets us find the source row, including its <code>name</code>.</span></div>',
          next: 'cardinality',
        });
      });
    } else if (state.current === 'cardinality') {
      choiceQuestion({
        intro: '<p class="step-copy">We know how an article points to its source. Now look at that relationship from both directions.</p>',
        prompt: 'Which statement best describes what can happen across the two relations?',
        options: [
          ['correct', 'One source can publish many articles; each article has one publishing source.'],
          ['article-many', 'One article can have many publishing sources.'],
          ['source-one', 'Each source can publish only one article.'],
          ['many', 'An article can have many sources, and a source can have many articles.'],
        ],
        correct: 'correct', evidence: 'cardinality', next: 'output',
        feedback: '<div class="success-feedback">Correct. One source can publish many articles, while each article has one publishing source.</div><div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>Cardinality</b><span>This is a one-to-many relationship: one <code>news_source</code> → many <code>news_article</code> rows.</span></div>',
        wrongFeedback: 'Use the relationship you just found: each article stores one source ID, while the same source ID can appear in multiple article rows.',
      });
    } else if (state.current === 'output') {
      choiceQuestion({
        intro: '<p class="step-copy">We now know how articles and sources are related. Before we combine them, we need to be clear about the result we want.</p>',
        prompt: 'If the result should show every article with its source, what should one result row represent?',
        options: [['article', 'a news article'], ['source', 'a news source'], ['country', 'a country'], ['pair', 'a combination of article and source']],
        correct: 'article', evidence: 'output', next: 'baselineRun',
        feedback: '<div class="success-feedback">Correct. Each row is still about one news article. We will add the source information to that article row.</div><div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>Grain</b><span>Grain tells us what one row represents. Here: one news article per row.</span></div>',
        wrongFeedback: 'The row will contain source information, but the request is still organized around every article. What is each row mainly about?',
      });
    } else if (state.current === 'baselineRun') {
      if (!state.baselineExecuted) {
        interactionLifecycle.renderCurrent(stepShell('How many article rows do we start with?', `<p class="step-copy">We established that one result row should represent one article. Before we add source information, establish the starting point.</p><div class="measurement-note"><code>COUNT(*)</code> counts the rows in <code>news_article</code>. Run the prepared measurement beside this step; you do not need to write SQL yet.</div>${feedbackMarkup()}`));
      } else {
        renderBaselineInterpretation();
      }
    } else if (state.current === 'prediction') {
      choiceQuestion({
        intro: '<div class="baseline-result compact"><span>Established baseline</span><strong>18</strong><span>news articles</span></div><p class="step-copy">We know two things already: we start with 18 article rows, and each article matches one source. Before combining them, predict what should happen to the row count.</p>',
        prompt: 'What should happen when we add each article’s source information?',
        options: [
          ['exact', '18 rows — one result row for each article'],
          ['sources', '4 rows — one result row for each source'],
          ['more', 'More than 18 rows — some articles would produce multiple result rows'],
        ],
        correct: 'exact', evidence: 'prediction', next: 'operation',
        feedback: '<div class="success-feedback">Correct. We start with 18 article rows, and each article matches exactly one source. Adding the source name does not create extra article rows.</div><div class="prediction-equation">18 news articles × 1 matching source each = 18 result rows</div><p class="grain-takeaway">The Grain remains one news article per row.</p>',
        wrongFeedback: 'Start with the 18 article rows. For each one, how many source rows can its established relationship match?',
      });
    } else if (state.current === 'operation') {
      choiceQuestion({
        intro: '<p class="step-copy">We now know what the result should preserve: 18 article rows, with source information added to each one.</p>',
        prompt: 'What should we do with each article row to add that information?',
        options: [['combine', 'Combine each article with its matching source.'], ['filter', 'Filter articles by source.'], ['aggregate', 'Aggregate all sources into one row.']],
        correct: 'combine', evidence: 'operation', next: 'joinTeaching',
        feedback: '<div class="success-feedback">Correct. We need to combine each article with its matching source row.</div><div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>JOIN</b><span>A JOIN combines rows from different relations when they match. Here, each article row will be combined with its matching source row.</span></div>',
        wrongFeedback: 'The request needs source information added to every existing article row without filtering articles away or collapsing them together.',
      });
    } else if (state.current === 'joinTeaching') {
      renderJoinTeaching();
    } else if (state.current === 'sql') {
      interactionLifecycle.renderCurrent(stepShell('Now translate the relationship into SQL.', `<p class="step-copy">Write a query that returns each article’s <code>title</code> with its publishing source’s <code>name</code>.</p><div class="sql-pattern compact"><strong>STRUCTURE</strong><pre>SELECT ...
FROM news_article
JOIN news_source
  ON ...</pre><p>Use <code>JOIN</code> to add the source relation and <code>ON</code> to express the relationship you already established.</p></div><p class="implementation-check"><strong>Earlier prediction:</strong> 18 rows · one article per row.</p>${feedbackMarkup()}`));
    } else if (state.current === 'finalGrain') {
      choiceQuestion({
        intro: '<div class="verification-prompt"><strong>Compare the result with your prediction</strong><span>Earlier prediction: 18 rows, one news article per row.</span></div>',
        prompt: 'What does the result show?',
        options: [
          ['yes', '18 rows, with one article per row and its matching source name'],
          ['source-grain', '18 rows, but each row now represents a source rather than an article'],
          ['multiplied', 'More than 18 rows because some articles were duplicated by the JOIN'],
        ],
        correct: 'yes', evidence: 'finalGrain', next: 'complete',
        feedback: '<div class="success-feedback">Correct. The result has 18 rows, just as predicted. Each row still represents one article, and the JOIN added the matching source name without changing the Grain.</div>',
        wrongFeedback: 'Use the result as evidence: compare its row count with the 18-row prediction, then inspect what each returned row represents.',
      });
    } else if (state.current === 'complete') {
      const requiredEvidence = ['relations', 'connection', 'cardinality', 'output', 'baseline', 'prediction', 'operation', 'sql', 'finalGrain'];
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
    if (state.current === 'baselineRun' && !state.baselineExecuted) {
      const result = resultSets.at(-1);
      if (statement.trim() !== BASELINE_SQL || result?.values?.[0]?.[0] !== 18) return wrong('Run the prepared measurement to establish the Stage 1 starting count. Reset the database and try again if it does not return 18.');
      state.baselineExecuted = true;
      state.localFeedback = '';
      render();
      return;
    }
    if (state.current !== 'sql' || state.pendingAdvance) return;
    if (!validateArticleSourceResult(statement, resultSets)) return wrong('The SQL ran, but the result does not yet match the requested article/source result. Inspect the selected fields and the relationship in <code>ON</code>, then retry.');
    record({
      evidence: 'sql',
      prompt: 'Return every article title with the name of its publishing source.',
      answer: 'Query ran successfully',
      answerLabel: 'Result',
      feedback: '<div class="success-feedback">The query ran successfully. Inspect the result.</div>',
      next: 'finalGrain',
    });
  }

  render();
  return { handleSqlSuccess, current: () => state.current, addRelation, isRelationSelected: (name) => state.selectedRelations.includes(name), relationshipLevel, canAddRelations: () => state.current === 'relations' && !state.pendingAdvance };
}
