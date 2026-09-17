import './media-coverage.css';

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
const BUSINESS_QUESTION = 'The research team is reviewing media coverage and wants every article to include the source that published it.';

export function createMediaCoverage({ editor, getDatabase, getSchema, onSelectionChange, interactionLifecycle }) {
  const reasoningThread = interactionLifecycle.createReasoningThread({ businessQuestion: BUSINESS_QUESTION });
  const state = interactionLifecycle.createInteractionState({
    initial: 'relations',
    thread: reasoningThread,
    data: {
      evidence: new Set(), drafts: {}, localFeedback: '',
      selectedRelations: [], selectedColumn: '', baselineExecuted: false, baselinePrepared: false,
      implementationPrepared: false, joinTeachingBeat: 1,
    },
  });

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

  function teacherVoice(content) {
    return `<aside class="teacher-voice"><span class="teacher-voice-label">Guidance</span><p>${content}</p></aside>`;
  }

  function relationshipLevel() {
    if (state.evidence.has('cardinality')) return 2;
    if (state.evidence.has('connection')) return 1;
    return 0;
  }

  function renderColumn(relation, column) {
    const keyLevel = relationshipLevel();
    const isConnectingChoice = state.current === 'connection' && relation.name === 'news_article';
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
    if (state.current === 'relations') return 'Build it from the live schema';
    if (state.current === 'connection') return 'Select the article field that identifies its source';
    return '';
  }

  function renderRelations() {
    const selected = orderedSelectedRelations();
    const showRelationship = relationshipLevel() > 0 && REQUIRED_RELATIONS.every((name) => state.selectedRelations.includes(name));
    relationEl.classList.toggle('relationship-visible', showRelationship);
    relationEl.classList.toggle('cardinality-visible', relationshipLevel() > 1);
    const status = workingSchemaStatus();
    workingStatusEl.textContent = status;
    workingStatusEl.hidden = !status;

    if (!selected.length) {
      relationEl.innerHTML = '<div class="working-empty">Choose relevant relations from the live schema.</div>';
      return;
    }

    const cards = selected.map((relation) => `
      <article class="data-card" data-relation="${escapeHtml(relation.name)}">
        <div class="data-card-title"><code>${escapeHtml(relation.name)}</code>${state.current === 'relations' ? `<button type="button" class="remove-relation" data-remove-relation="${escapeHtml(relation.name)}">Remove</button>` : ''}</div>
        <ul class="working-columns">${relation.columns.map((column) => renderColumn(relation, column)).join('')}</ul>
      </article>
    `);

    if (showRelationship && cards.length >= 2) {
      cards.splice(1, 0, '<div class="schema-connector" aria-label="news_article.news_source_id matches news_source.news_source_id"><span class="connector-line"></span></div>');
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
    if (state.current !== 'relations' || state.selectedRelations.includes(name)) return;
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
    if (state.current !== 'relations') return;
    state.selectedRelations = state.selectedRelations.filter((item) => item !== name);
    state.localFeedback = '';
    render();
    onSelectionChange();
  }

  function renderCompleted() {
    interactionLifecycle.renderCompleted(state.completed.map((item) => ({
      id: item.id,
      summaryHtml: `<span class="complete-mark">✓</span><span>${escapeHtml(item.label)}</span><span class="completed-answer" title="${escapeHtml(item.answer)}">${escapeHtml(item.answer)}</span>`,
      reviewHtml: `<p class="review-question"><strong>${escapeHtml(stripMarkup(item.prompt))}</strong></p><p><strong>${escapeHtml(item.answerLabel)}:</strong> ${escapeHtml(item.answer)}</p>${item.options ? `<fieldset class="choices review-choices" disabled>${item.options.map(([value, label]) => `<label class="${value === item.value ? 'selected-choice' : ''}"><input type="radio" ${value === item.value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset>` : ''}${item.feedback ? `<div class="review-feedback">${item.feedback}</div>` : ''}`,
    })));
  }

  function setCurrent(next, options) {
    state.moveTo(next, options);
    state.localFeedback = '';
    render();
    onSelectionChange();
  }

  function record({ evidence, prompt, answer, answerLabel = 'Your answer', feedback = '', next, label, value, options, threadEntries = [] }) {
    if (evidence) state.evidence.add(evidence);
    const item = { id: state.current, label: label || INTERACTION_LABELS[state.current], prompt, answer, answerLabel, feedback, value, options };
    state.complete({ item, next, threadEntries });
    state.localFeedback = '';
    render();
    onSelectionChange();
  }

  function wrong(feedback) { state.localFeedback = feedback; render(); }

  function feedbackMarkup() {
    return state.localFeedback ? `<div class="local-feedback incorrect" role="alert"><strong>Not quite.</strong> ${state.localFeedback.replace(/^Not quite\.\s*/i, '')}</div>` : '';
  }

  function evidenceInPlay() {
    const byState = {
      connection: ['relevant-relations'],
      cardinality: ['article-source-connection'],
      output: ['relevant-relations', 'cardinality'],
      baselineRun: ['result-grain'],
      prediction: ['result-grain', 'baseline-measurement', 'cardinality'],
      operation: ['result-grain', 'baseline-measurement', 'article-source-result'],
      joinTeaching: ['article-source-connection', 'result-grain', 'baseline-measurement', 'article-source-result', 'semantic-operation'],
      sql: ['article-source-connection', 'article-source-result', 'semantic-operation'],
      finalGrain: ['join-result', 'article-source-result'],
    };
    return byState[state.current] || [];
  }

  function stepShell(prompt, body, intro = '') {
    const label = INTERACTION_LABELS[state.current];
    reasoningThread.setCurrentQuestion(state.current === 'complete' ? null : {
      id: state.current,
      prompt: stripMarkup(prompt),
      evidenceIds: evidenceInPlay(),
    });
    const transition = state.transition?.feedback
      ? `<section class="reasoning-transition" aria-label="Previous reasoning feedback">${state.transition.feedback}</section>`
      : '';
    return state.current !== 'complete'
      ? `${transition}<div class="step-kicker">${label}</div>${intro}<h2 class="prompt">${prompt}</h2>${body}`
      : `${transition}<h2 class="prompt">${prompt}</h2>${body}`;
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

  function choiceQuestion({ prompt, options, correct, feedback, wrongFeedback, next, evidence, intro = '', threadEntries = [] }) {
    const draft = state.drafts[state.current] || '';
    interactionLifecycle.renderCurrent(stepShell(prompt, `<form id="answer-form" class="answer-form"><fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${escapeHtml(value)}" ${draft === value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset><button class="primary" type="submit">Check answer</button></form>${feedbackMarkup()}`, intro));
    document.getElementById('answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts[state.current] = answer || '';
      if (answer !== correct) return wrong(wrongFeedback);
      record({ evidence, prompt, answer: stripMarkup(options.find(([value]) => value === answer)[1]), value: answer, options, feedback, next, threadEntries });
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
    interactionLifecycle.renderCurrent(stepShell('What does the number 18 represent here?', `
      <p class="step-copy">Use the prepared query and its visible result as the evidence for your answer.</p>
      <form id="baseline-answer-form" class="answer-form">
        <fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${value}" ${draft === value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset>
        <button class="primary" type="submit">Check answer</button>
      </form>
      ${feedbackMarkup()}
    `));
    document.getElementById('baseline-answer-form').addEventListener('submit', (event) => {
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
        threadEntries: [
          { kind: 'fact', id: 'baseline', label: 'Starting article rows', value: 18 },
          { kind: 'evidence', id: 'baseline-measurement', label: 'COUNT(*) result for news_article', value: { rowCount: 18, sql: BASELINE_SQL } },
        ],
      });
    });
  }

  function renderPrediction() {
    const options = [
      ['exact', '18 rows — one result row for each article'],
      ['sources', '4 rows — one result row for each source'],
      ['more', 'More than 18 rows — some articles would produce multiple result rows'],
    ];
    const draft = state.drafts.prediction || '';
    interactionLifecycle.renderCurrent(stepShell('What should happen when we add each article’s source information?', `
      <div class="baseline-result compact"><span>Established baseline</span><strong>18</strong><span>news articles</span></div>
      <div class="prediction-premises" aria-label="Established facts for the prediction">
        <div><span>Starting rows</span><strong>18 article rows</strong></div>
        <div><span>Matches per article</span><strong>1 source row</strong></div>
      </div>
      <form id="prediction-answer-form" class="answer-form">
        <fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${value}" ${draft === value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset>
        <button class="primary" type="submit">Check answer</button>
      </form>
      ${feedbackMarkup()}
    `, teacherVoice('We start with 18 article rows, and each article matches one source. Use those two established facts before we combine the rows.')));
    document.getElementById('prediction-answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.prediction = answer || '';
      if (answer !== 'exact') return wrong('Start with the 18 article rows. For each one, how many source rows can its established relationship match?');
      record({
        evidence: 'prediction',
        prompt: 'What should happen when we add each article’s source information?',
        answer: stripMarkup(options.find(([value]) => value === answer)[1]),
        value: answer,
        options,
        feedback: '<div class="success-feedback">Correct. We start with 18 article rows, and each article matches exactly one source. Adding the source name does not create extra article rows.</div><div class="prediction-equation">18 news articles × 1 matching source each = 18 result rows</div><p class="grain-takeaway">The Grain remains one news article per row.</p>',
        next: 'operation',
        threadEntries: [{
          kind: 'prediction',
          id: 'article-source-result',
          label: 'Expected JOIN result',
          value: { rowCount: 18, grain: 'one news article per row', matchCountPerArticle: 1 },
        }],
      });
    });
  }

  function renderFinalVerification() {
    const prediction = reasoningThread.getPrediction();
    const expectedRows = prediction?.value?.rowCount;
    const expectedGrain = prediction?.value?.grain;
    const options = [
      ['yes', `${expectedRows} rows, with ${expectedGrain} and its matching source_name`],
      ['source-grain', `${expectedRows} rows, but each row now represents a source rather than an article`],
      ['multiplied', `More than ${expectedRows} rows because some articles were duplicated by the JOIN`],
    ];
    const draft = state.drafts.finalGrain || '';
    interactionLifecycle.renderCurrent(stepShell('What does the result show?', `
      <div class="verification-prompt"><strong>Compare the result with your prediction</strong><span>Earlier prediction: 18 rows, one news article per row.</span></div>
      <form id="verification-answer-form" class="answer-form">
        <fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${value}" ${draft === value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset>
        <button class="primary" type="submit">Check answer</button>
      </form>
      ${feedbackMarkup()}
    `, '<p class="step-copy">Inspect the returned columns, row count, and article/source rows in Results before answering.</p>'));
    document.getElementById('verification-answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.finalGrain = answer || '';
      if (answer !== 'yes') {
        if (answer === 'source-grain') {
          return wrong(`The visible result has ${expectedRows} rows. Focus on what one returned row represents: is the article still the organizing record, with source_name added alongside it?`);
        }
        if (answer === 'multiplied') {
          return wrong(`Check the visible row count against the earlier prediction. The result shows ${expectedRows} rows, and each article was predicted to match one source row.`);
        }
        return wrong('Use the visible result as evidence: compare its row count with the 18-row prediction, then inspect what each returned row represents.');
      }
      record({
        evidence: 'finalGrain',
        prompt: 'What does the result show?',
        answer: stripMarkup(options.find(([value]) => value === answer)[1]),
        value: answer,
        options,
        feedback: `<div class="success-feedback">Correct. The result has ${expectedRows} rows, just as predicted. Each row still represents one article, and the JOIN added the matching source information without changing the Grain.</div>`,
        next: 'complete',
        threadEntries: [{ kind: 'fact', id: 'verified-result', label: 'Verified result', value: { rowCount: expectedRows, grain: expectedGrain } }],
      });
    });
  }

  function hasExactRequiredRelations() {
    return state.selectedRelations.length === REQUIRED_RELATIONS.length && REQUIRED_RELATIONS.every((relation) => state.selectedRelations.includes(relation));
  }

  function relationSelectionFeedback() {
    const hasArticles = state.selectedRelations.includes('news_article');
    const hasSources = state.selectedRelations.includes('news_source');

    if (hasArticles && hasSources) {
      return 'The article and publishing-source information are already covered. Check whether every selected relation is actually needed for this request.';
    }
    if (hasArticles) {
      return 'You already have the article records. Reinspect the Live Schema for the relation that provides the publishing-source information requested.';
    }
    if (hasSources) {
      return 'You already have the publishing-source information. Reinspect the Live Schema for the relation that contains the article records requested.';
    }
    return 'Break the request into the two information roles it needs: article records and publishing-source information. Reinspect the Live Schema and revise the selection.';
  }

  function updateWorkspaceVisibility() {
    const predictionEvidence = state.current === 'prediction';
    const baselineWorkspace = state.current === 'baselineRun' || predictionEvidence;
    const implementationWorkspace = ['sql', 'finalGrain'].includes(state.current);
    const visible = baselineWorkspace || implementationWorkspace;
    const baselineEvidence = (state.current === 'baselineRun' && state.baselineExecuted) || predictionEvidence;
    const resultsEvidence = state.current === 'finalGrain';
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
    learningEl.classList.toggle('prediction-evidence-active', predictionEvidence);
    learningEl.classList.toggle('join-teaching-active', state.current === 'joinTeaching');
    learningEl.classList.toggle('sql-implementation-active', sqlImplementation);
    learningEl.classList.toggle('results-evidence-active', resultsEvidence);
    learningEl.dataset.stage1State = resultsEvidence ? 'results' : state.current;

    document.querySelector('.editor-header h2').textContent = baselineWorkspace ? 'Baseline measurement' : 'JOIN implementation';
    document.querySelectorAll('.lab-action').forEach((element) => {
      element.hidden = !visible || baselineEvidence || resultsEvidence;
    });
    const runButton = document.getElementById('run-query');
    runButton.disabled = runButton.hidden;
  }

  function renderJoinTeaching() {
    const beat = state.joinTeachingBeat;
    const guidance = beat === 1
      ? 'You chose to combine each article with its matching source. Now see how JOIN carries out that choice for one pair of rows.'
      : beat === 2
        ? 'You have seen what that combination produces. Now reuse the key relationship you found to tell SQL which rows match.'
        : 'The relationship now has an SQL form inside ON. Next, connect that match back to the business request and map the whole query.';
    const beatMarkup = beat === 1 ? `
      <section class="teaching-beat active-beat">
        <div class="teaching-beat-heading"><span>1</span><div><strong>First, match the rows</strong><p>JOIN combines an article row with the source row that has the same <code>news_source_id</code>.</p></div></div>
        <div class="row-match-visual" aria-label="One article row and its matching source row produce one result row">
          <div class="example-row article-row"><strong>news_article row</strong><span><code>title</code><b>CloudFence raises Series B</b></span><span class="match-value"><code>news_source_id</code><b>1</b></span></div>
          <span class="row-operator">+</span>
          <div class="example-row source-row"><strong>matching news_source row</strong><span class="match-value"><code>news_source_id</code><b>1</b></span><span><code>name</code><b>TechLedger</b></span></div>
          <span class="row-operator">→</span>
          <div class="example-row result-row"><strong>result row</strong><span><code>title</code><b>CloudFence raises Series B</b></span><span><code>source_name</code><b>TechLedger</b></span></div>
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
          <div><dt>requested information</dt><dd><code>SELECT news_article.title, news_source.name AS source_name</code></dd></div>
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
        <button id="join-teaching-next" class="primary">${beat < 3 ? (beat === 1 ? 'Next: express the match in SQL' : 'Next: map the whole query') : 'Continue to SQL implementation'}</button>
      </div>
    `, teacherVoice(guidance)));

    document.getElementById('join-teaching-next').addEventListener('click', () => {
      if (state.joinTeachingBeat < 3) {
        state.joinTeachingBeat += 1;
        state.clearTransition();
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

    if (state.current === 'relations') {
      interactionLifecycle.renderCurrent(stepShell('Which relations contain the information we need?', '<p class="step-copy">In the Live Schema on the left, find the relevant relations and add them to the Working Schema beside this task.</p><button id="continue-relations" class="primary" disabled>Check selection</button>' + feedbackMarkup()));
      const relationButton = document.getElementById('continue-relations');
      relationButton.disabled = !state.selectedRelations.length;
      relationButton.addEventListener('click', () => {
        if (!hasExactRequiredRelations()) return wrong(relationSelectionFeedback());
        record({
          evidence: 'relations',
          prompt: 'Which relations contain the information we need?',
          answer: 'news_article and news_source',
          feedback: '<div class="success-feedback">Correct. <code>news_article</code> gives us the articles, and <code>news_source</code> contains the source information we need. Now we need to work out how an article is connected to its source.</div>',
          next: 'connection',
          threadEntries: [{ kind: 'fact', id: 'relevant-relations', label: 'Relevant relations', value: ['news_article', 'news_source'] }],
        });
      });
    } else if (state.current === 'connection') {
      interactionLifecycle.renderCurrent(stepShell(
        'Which column in news_article tells us which source published the article?',
        `<p class="step-copy">Select the field directly in the Working Schema, then check your selection here.</p><button id="check-column" class="primary" ${state.selectedColumn ? '' : 'disabled'}>Check selected column</button>${feedbackMarkup()}`,
        teacherVoice('You established the two relations that supply the requested information. Now trace from an article row to its source so we can establish how those relations connect.'),
      ));
      document.getElementById('check-column').addEventListener('click', () => {
        if (state.selectedColumn !== 'news_source_id') return wrong('Look at the article row and ask which column could tell us which source published it. The relationship stays hidden until you establish that connection.');
        record({
          evidence: 'connection',
          prompt: 'Which column in news_article tells us which source published the article?',
          answer: 'news_article.news_source_id',
          feedback: '<div class="success-feedback">Correct. <code>news_source_id</code> tells us which source belongs to this article.</div><div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>Primary Key / Foreign Key</b><span>You just found the link between the two relations. <code>news_article.news_source_id</code> is a Foreign Key (FK). It points to <code>news_source.news_source_id</code>, the Primary Key (PK). That lets us find the source row, including its <code>name</code>.</span></div>',
          next: 'cardinality',
          threadEntries: [{
            kind: 'fact',
            id: 'article-source-connection',
            label: 'Article-to-source relationship',
            value: { from: 'news_article.news_source_id', to: 'news_source.news_source_id' },
          }],
        });
      });
    } else if (state.current === 'cardinality') {
      choiceQuestion({
        intro: teacherVoice('The key connection you found is now visible in the Working Schema. Use that same connection to reason about how many rows can relate in each direction.'),
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
        threadEntries: [{ kind: 'fact', id: 'cardinality', label: 'Relationship cardinality', value: 'one source to many articles; each article has one source' }],
      });
    } else if (state.current === 'output') {
      choiceQuestion({
        intro: teacherVoice('You established how articles and sources can relate. Now return to the business request: its organizing subject—not the relationship alone—will tell us what each requested result row should represent.'),
        prompt: 'If the result should show every article with its source, what should one result row represent?',
        options: [['article', 'a news article'], ['source', 'a news source'], ['country', 'a country'], ['pair', 'a combination of article and source']],
        correct: 'article', evidence: 'output', next: 'baselineRun',
        feedback: '<div class="success-feedback">Correct. Each row is still about one news article. We will add the source information to that article row.</div><div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>Grain</b><span>Grain tells us what one row represents. Here: one news article per row.</span></div>',
        wrongFeedback: 'The row will contain source information, but the request is still organized around every article. What is each row mainly about?',
        threadEntries: [{ kind: 'fact', id: 'result-grain', label: 'Requested result Grain', value: 'one news article per row' }],
      });
    } else if (state.current === 'baselineRun') {
      if (!state.baselineExecuted) {
        interactionLifecycle.renderCurrent(stepShell('How many article rows do we start with?', '<p class="step-copy">Run the prepared measurement in the SQL Workspace and inspect Results.</p><div class="measurement-note"><code>COUNT(*)</code> counts the rows in <code>news_article</code>. Here it measures the starting article rows; you do not need to write SQL yet.</div>'));
        if (state.localFeedback) renderWorkspaceAction(feedbackMarkup(), 'tool-diagnostic');
      } else {
        renderBaselineInterpretation();
      }
    } else if (state.current === 'prediction') {
      renderPrediction();
    } else if (state.current === 'operation') {
      choiceQuestion({
        intro: teacherVoice('We now know what the result should preserve: 18 article rows, with source information added to each one.'),
        prompt: 'What should we do with each article row to add that information?',
        options: [['combine', 'Combine each article with its matching source.'], ['filter', 'Filter articles by source.'], ['aggregate', 'Aggregate all sources into one row.']],
        correct: 'combine', evidence: 'operation', next: 'joinTeaching',
        feedback: '<div class="success-feedback">Correct. We need to combine each article with its matching source row.</div><div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>JOIN</b><span>A JOIN combines rows from different relations when they match. Here, each article row will be combined with its matching source row.</span></div>',
        wrongFeedback: 'The request needs source information added to every existing article row without filtering articles away or collapsing them together.',
        threadEntries: [{ kind: 'fact', id: 'semantic-operation', label: 'Relational action', value: 'combine each article with its matching source' }],
      });
    } else if (state.current === 'joinTeaching') {
      renderJoinTeaching();
    } else if (state.current === 'sql') {
      interactionLifecycle.renderCurrent(stepShell('Now translate the relationship into SQL.', '<p class="step-copy">Write the query you just mapped in the SQL Workspace. The Working Schema remains available as a reference.</p><p class="implementation-check"><strong>Earlier prediction:</strong> 18 rows · one article per row.</p>'));
      renderWorkspaceAction(`
        <details class="optional-scaffold desired-output"><summary>Show desired output</summary><div class="optional-scaffold-body"><div class="desired-output-grid"><code>title</code><code>source_name</code></div><p>Use <code>news_source.name AS source_name</code> for the publishing-source column.</p></div></details>
        <details class="optional-scaffold sql-structure"><summary>Show SQL structure</summary><div class="optional-scaffold-body"><pre>SELECT ...
FROM news_article
JOIN news_source
  ON ...</pre><p>Use <code>JOIN</code> to add the source relation and <code>ON</code> to express the relationship you already established.</p></div></details>${feedbackMarkup()}
      `, 'sql-authoring-assistance');
    } else if (state.current === 'finalGrain') {
      renderFinalVerification();
    } else if (state.current === 'complete') {
      const requiredEvidence = ['relations', 'connection', 'cardinality', 'output', 'baseline', 'prediction', 'operation', 'sql', 'finalGrain'];
      const complete = requiredEvidence.every((item) => state.evidence.has(item));
      interactionLifecycle.renderCurrent(stepShell('Stage complete', `<div class="completion-state"><div class="completion-icon">✓</div><p>${complete ? 'You preserved one article per row while adding its publishing source, and verified the 18-row result.' : 'The required learning evidence is incomplete.'}</p></div>`));
    }
  }

  function normalizedRows(values) { return values.map((row) => JSON.stringify(row)).sort(); }

  function validateArticleSourceResult(statement, resultSets) {
    if (!resultSets.length) return { valid: false, reason: 'no_result' };
    if (!/\b(?:inner\s+)?join\b/i.test(statement) || !/\bon\b/i.test(statement)) {
      return { valid: false, reason: 'missing_relationship_implementation' };
    }

    const result = resultSets.at(-1);
    const columns = result.columns.map((column) => column.toLowerCase());
    if (result.columns.length !== 2 || columns[0] !== 'title' || columns[1] !== 'source_name') {
      return { valid: false, reason: 'output_contract_mismatch' };
    }
    if (result.values.length !== 18) {
      return { valid: false, reason: 'row_count_mismatch', actualRowCount: result.values.length };
    }

    const expected = getDatabase().exec('SELECT news_article.title, news_source.name FROM news_article INNER JOIN news_source ON news_article.news_source_id = news_source.news_source_id;')[0]?.values ?? [];
    const actualRows = normalizedRows(result.values);
    const expectedRows = normalizedRows(expected);
    const rowsMatch = actualRows.every((row, index) => row === expectedRows[index]);
    if (!rowsMatch) return { valid: false, reason: 'row_association_mismatch' };
    return { valid: true };
  }

  function articleSourceDiagnosticFeedback(validation) {
    if (validation.reason === 'missing_relationship_implementation') {
      return 'This task implements the relationship you established with JOIN and ON. Recheck that the query includes that taught match between article and source rows.';
    }
    if (validation.reason === 'output_contract_mismatch') {
      return 'The returned fields do not yet match the requested output. Open Desired output and compare the two field names and their order with the result.';
    }
    if (validation.reason === 'row_count_mismatch') {
      return `The query returned ${validation.actualRowCount} rows, while your established prediction was 18 rows at one article per row. Use that mismatch as evidence and recheck the established one-source-per-article relationship.`;
    }
    if (validation.reason === 'row_association_mismatch') {
      return 'The output fields and 18-row count match, but the article/source pairings do not match the relationship you established. Recheck ON against the news_article.news_source_id → news_source.news_source_id relationship.';
    }
    return 'The SQL ran, but it did not produce the article/source result this task asks you to inspect. Recheck the requested output and the JOIN relationship you already established.';
  }

  function handleSqlSuccess(statement, resultSets) {
    if (state.current === 'baselineRun' && !state.baselineExecuted) {
      const result = resultSets.at(-1);
      if (statement.trim() !== BASELINE_SQL || result?.values?.[0]?.[0] !== 18) return wrong('Run the prepared measurement to establish the Stage 1 starting count. Reset the database and try again if it does not return 18.');
      state.baselineExecuted = true;
      state.clearTransition();
      state.localFeedback = '';
      render();
      return;
    }
    if (state.current !== 'sql') return;
    const validation = validateArticleSourceResult(statement, resultSets);
    if (!validation.valid) return wrong(articleSourceDiagnosticFeedback(validation));
    record({
      evidence: 'sql',
      prompt: 'Return every article title with its publishing source as source_name.',
      answer: 'Query ran successfully',
      answerLabel: 'Result',
      feedback: '<div class="success-feedback">The query ran successfully. Inspect the result, then compare it with your earlier prediction.</div>',
      next: 'finalGrain',
      threadEntries: [{
        kind: 'evidence',
        id: 'join-result',
        label: 'Executed JOIN result',
        value: { rowCount: resultSets.at(-1)?.values?.length ?? 0, columns: resultSets.at(-1)?.columns ?? [] },
      }],
    });
  }

  render();
  return {
    handleSqlSuccess,
    current: () => state.current,
    addRelation,
    isRelationSelected: (name) => state.selectedRelations.includes(name),
    relationshipLevel,
    canAddRelations: () => state.current === 'relations',
    reasoningThread: () => reasoningThread.snapshot(),
    refresh: render,
  };
}
