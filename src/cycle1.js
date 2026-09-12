import './stage1.css';
import './cycle1.css';

const REQUIRED_RELATIONS = ['news_source', 'news_article'];

const LABELS = {
  requestedGrain: 'Requested output Grain',
  structuralPrediction: 'Structural prediction',
  numericPrediction: 'Current-data prediction',
  sql: 'SQL verification',
  verification: 'Result verification',
  complete: 'Coverage review complete',
};

const ASSISTANCE_STRENGTH = {
  unassisted: 0,
  'hint-1': 1,
  'hint-2': 2,
  'solution-assisted': 3,
};

const STRUCTURAL_STEPS = [
  {
    id: 'multiplicity',
    prompt: 'Can one news source contribute more than one raw JOIN row?',
    options: [
      ['yes', 'Yes — if the source matches several articles.'],
      ['no', 'No — a source can appear only once because it is one starting row.'],
    ],
    correct: 'yes',
    answer: 'One source can contribute multiple raw JOIN rows.',
    wrong: 'Use the visible 1 → M relationship. Start from one source and ask how many article rows can match it.',
  },
  {
    id: 'natural-grain',
    prompt: 'What will one raw JOIN row naturally represent?',
    options: [
      ['source', 'One publishing source.'],
      ['article', 'One news article without regard to its source.'],
      ['match', 'One source–article match.'],
    ],
    correct: 'match',
    answer: 'One source–article match.',
    wrong: 'Focus on what creates each raw result row: one matching row pair from the two relations.',
  },
  {
    id: 'repetition',
    prompt: 'What can happen to source-side information in that raw result?',
    options: [
      ['repeat', 'It can repeat across several matching result rows.'],
      ['once', 'It must appear only once because news_source has one row per source.'],
      ['removed', 'It disappears after the JOIN because article rows become primary.'],
    ],
    correct: 'repeat',
    answer: 'Source-side information can repeat across several matching rows.',
    wrong: 'If one source participates in several matching pairs, ask what happens to that source’s fields beside each matching article.',
  },
];

const VERIFICATION_STEPS = [
  {
    id: 'why-repeat',
    prompt: 'Why do source names repeat in the returned rows?',
    options: [
      ['matches', 'One source has several matching articles, so its values appear in several source–article matches.'],
      ['duplicates', 'The news_source table must contain duplicate source rows.'],
      ['engine', 'SQLite copied source names independently of the relationship.'],
    ],
    correct: 'matches',
    answer: 'A source can have several matching articles.',
    wrong: 'Use the visible returned pairs. Compare repeated source names with the different article titles beside them.',
  },
  {
    id: 'duplicate-diagnosis',
    prompt: 'What do the repeated source names indicate here?',
    options: [
      ['structural', 'Several legitimate source–article matches.'],
      ['base-duplicates', 'Accidental duplicate news_source base rows.'],
      ['unknown', 'The result cannot distinguish these possibilities.'],
    ],
    correct: 'structural',
    answer: 'Several legitimate source–article matches, not duplicate source base rows.',
    wrong: 'Inspect whether the repeated source name is paired with the same article or with distinct article titles.',
  },
  {
    id: 'preserve-grain',
    prompt: 'Does the raw result preserve the requested one-source-per-row output?',
    options: [
      ['no', 'No.'],
      ['yes', 'Yes.'],
    ],
    correct: 'no',
    answer: 'No — the raw result does not preserve one source per row.',
    wrong: 'Compare the requested source-level row meaning with the repeated source rows visible in the actual result.',
  },
  {
    id: 'returned-grain',
    prompt: 'What does one returned row naturally represent?',
    options: [
      ['source', 'One publishing source.'],
      ['article', 'One article with no relational pairing.'],
      ['match', 'One source–article match.'],
    ],
    correct: 'match',
    answer: 'One source–article match.',
    wrong: 'Read across one returned row: it combines one source value with one specific article title.',
  },
  {
    id: 'reconcile',
    prompt: 'Does the actual result agree with the prediction committed before SQL?',
    options: [
      ['yes', 'Yes — it shows the predicted source–article matches and repeated source-side values.'],
      ['no', 'No — the JOIN preserved one source per row.'],
    ],
    correct: 'yes',
    answer: 'Yes — the actual result agrees with the committed prediction.',
    wrong: 'Compare the visible result with the committed prediction shown beside it.',
  },
];

export function createCycle1({ editor, getDatabase, getSchema, onSelectionChange, interactionLifecycle }) {
  const state = {
    current: 'requestedGrain',
    completed: [],
    drafts: {},
    localFeedback: '',
    requestedGrainAssistance: 'unassisted',
    structuralIndex: 0,
    structuralRecorded: false,
    structuralAnswers: [],
    structuralWrongAttempts: 0,
    structuralHintsOpened: new Set(),
    structuralAssistance: 'unassisted',
    numericAssistance: 'unassisted',
    sqlAssistance: 'unassisted',
    verificationAssistance: 'unassisted',
    verificationIndex: 0,
    verificationAnswers: [],
    sqlPrepared: false,
    sqlVerified: false,
  };

  const relationEl = document.getElementById('relation-preview');
  const workingStatusEl = document.getElementById('working-schema-status');
  const labEl = document.getElementById('lab-workspace');
  const learningEl = document.querySelector('.learning-panel');
  const runButton = document.getElementById('run-query');
  const clearButton = document.getElementById('clear-results');
  const solutionButton = document.getElementById('show-solution');
  const solutionPanel = document.getElementById('solution-panel');

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
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

  function assistanceLabel(value) {
    return ({
      unassisted: 'Unassisted',
      'hint-1': 'After Hint 1',
      'hint-2': 'After Hint 2',
      'solution-assisted': 'Solution-assisted',
    })[value] || value;
  }

  function raiseAssistance(key, next) {
    if (ASSISTANCE_STRENGTH[next] > ASSISTANCE_STRENGTH[state[key]]) state[key] = next;
  }

  function currentAssistanceKey() {
    if (state.current === 'structuralPrediction') return 'structuralAssistance';
    if (state.current === 'numericPrediction') return 'numericAssistance';
    if (state.current === 'sql') return 'sqlAssistance';
    if (state.current === 'verification') return 'verificationAssistance';
    return null;
  }

  function markSolutionUse() {
    const key = currentAssistanceKey();
    if (key) raiseAssistance(key, 'solution-assisted');
  }

  function relationByName(name) {
    return getSchema().find((relation) => relation.name === name);
  }

  function relationshipLevel() {
    return state.current === 'requestedGrain' ? 0 : 2;
  }

  function isRelationSelected(name) {
    return REQUIRED_RELATIONS.includes(name);
  }

  function canAddRelations() {
    return false;
  }

  function addRelation() {}

  function renderSchemaCard(name, role) {
    const relation = relationByName(name);
    if (!relation) return `<article class="data-card"><div class="data-card-title"><code>${escapeHtml(name)}</code></div><div class="working-empty">Schema loading…</div></article>`;
    const showRelationship = relationshipLevel() > 0;
    return `
      <article class="data-card cycle1-schema-card" data-relation="${escapeHtml(name)}">
        <div class="data-card-title"><code>${escapeHtml(name)}</code><span class="schema-role">${escapeHtml(role)}</span></div>
        <ul class="working-columns">
          ${relation.columns.map((column) => {
            const isKey = column.column === 'news_source_id';
            const badge = showRelationship && isKey
              ? (name === 'news_source' ? '<span class="key-badge">PK</span>' : '<span class="key-badge">FK</span>')
              : '';
            const classes = showRelationship && isKey ? 'relationship-column' : '';
            return `<li><div class="working-column ${classes}"><code>${escapeHtml(column.column)}</code>${badge}</div></li>`;
          }).join('')}
        </ul>
      </article>`;
  }

  function renderRelations() {
    const showRelationship = relationshipLevel() > 0;
    relationEl.className = `relation-preview cycle1-relation-preview${showRelationship ? ' relationship-visible cardinality-visible' : ''}`;
    workingStatusEl.textContent = showRelationship
      ? 'Known relationship used for this reasoning task'
      : 'Known relations supplied for the source-level review';
    workingStatusEl.hidden = false;
    relationEl.innerHTML = `
      ${renderSchemaCard('news_source', 'Starting relation')}
      ${showRelationship ? `
        <div class="cycle1-schema-connector" aria-label="news_source.news_source_id one to many news_article.news_source_id">
          <svg class="cycle1-connector-line" viewBox="0 0 100 120" preserveAspectRatio="none" aria-hidden="true">
            <line x1="1" y1="55" x2="99" y2="87"></line>
            <circle cx="1" cy="55" r="4"></circle>
            <circle cx="99" cy="87" r="4"></circle>
          </svg>
          <span class="cycle1-cardinality one">1</span>
          <span class="cycle1-cardinality many">M</span>
          <span class="cycle1-connector-caption"><code>news_source_id</code></span>
        </div>` : ''}
      ${renderSchemaCard('news_article', 'Many-side detail')}
    `;
  }

  function renderCompleted() {
    interactionLifecycle.renderCompleted(state.completed.map((item) => ({
      id: item.id,
      summaryHtml: `<span class="complete-mark">✓</span><span>${escapeHtml(item.label)}</span><span class="completed-answer" title="${escapeHtml(item.answer)}">${escapeHtml(item.answer)}</span>`,
      reviewHtml: `${item.reviewHtml || `<p class="review-question"><strong>${escapeHtml(stripMarkup(item.prompt || item.label))}</strong></p><p><strong>Your answer:</strong> ${escapeHtml(item.answer)}</p>`}${item.assistance ? `<p class="assistance-review"><strong>Assistance:</strong> ${escapeHtml(assistanceLabel(item.assistance))}</p>` : ''}`,
    })));
  }

  function stepShell(title, body, intro = '') {
    return `<div class="step-kicker">${escapeHtml(LABELS[state.current] || '')}</div>${intro}<h2 class="prompt">${title}</h2>${body}`;
  }

  function feedbackMarkup() {
    return state.localFeedback
      ? `<div class="local-feedback incorrect" role="alert"><strong>Not quite.</strong> ${escapeHtml(state.localFeedback)}</div>`
      : '';
  }

  function choiceForm(id, options, draft = '') {
    return `<form id="${id}" class="answer-form"><fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${escapeHtml(value)}" ${draft === value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset><button class="primary" type="submit">Check answer</button></form>`;
  }

  function setCurrent(next) {
    state.current = next;
    state.localFeedback = '';
    hideSolution();
    render();
    onSelectionChange();
  }

  function recordCompleted(item) {
    state.completed.push(item);
  }

  function wrong(message) {
    state.localFeedback = message;
    render();
  }

  function renderRequestedGrain() {
    const options = [
      ['source', 'One publishing source.'],
      ['article', 'One news article.'],
      ['match', 'One source–article match.'],
    ];
    const draft = state.drafts.requestedGrain || '';
    interactionLifecycle.renderCurrent(stepShell(
      'In the requested coverage review, what should one row represent?',
      `${choiceForm('requested-grain-form', options, draft)}${feedbackMarkup()}`,
      teacherVoice('Keep the business artifact in focus first. The report is meant to review publishing sources, with each source appearing once.'),
    ));
    document.getElementById('requested-grain-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.requestedGrain = answer || '';
      if (answer !== 'source') return wrong('The requested artifact is source-level and says each publishing source should appear once.');
      recordCompleted({
        id: 'requested-grain',
        label: 'Requested output Grain',
        prompt: 'What should one requested row represent?',
        answer: 'One publishing source per row.',
        assistance: state.requestedGrainAssistance || 'unassisted',
      });
      setCurrent('structuralPrediction');
    });
  }

  function predictionSummaryMarkup() {
    if (!state.structuralAnswers.length) return '';
    return `<div class="micro-evidence-list" aria-label="Committed structural judgments so far">${state.structuralAnswers.map((item, index) => `<div class="micro-evidence"><span>${index + 1}</span><p>${escapeHtml(item.answer)}</p></div>`).join('')}</div>`;
  }

  function predictionHintsMarkup(step) {
    if (step.id !== 'multiplicity') return '';
    const hint1Available = state.structuralWrongAttempts >= 1;
    const hint2Available = state.structuralWrongAttempts >= 2;
    return `<div class="local-assistance" aria-label="Prediction assistance">
      ${hint1Available ? `<button id="hint-1" type="button" class="assistance-button">Hint 1</button>` : ''}
      ${hint2Available ? `<button id="hint-2" type="button" class="assistance-button">Hint 2</button>` : ''}
      ${state.structuralHintsOpened.has('hint-1') ? '<div class="hint-text"><strong>Hint 1:</strong> Look at the direction of the relationship. For one <code>news_source</code> row, how many <code>news_article</code> rows can match?</div>' : ''}
      ${state.structuralHintsOpened.has('hint-2') ? '<div class="hint-text"><strong>Hint 2:</strong> A JOIN produces a result row for each matching pair. Apply that to one source that matches several articles.</div>' : ''}
    </div>`;
  }

  function wirePredictionHints() {
    document.getElementById('hint-1')?.addEventListener('click', () => {
      state.structuralHintsOpened.add('hint-1');
      raiseAssistance('structuralAssistance', 'hint-1');
      render();
    });
    document.getElementById('hint-2')?.addEventListener('click', () => {
      state.structuralHintsOpened.add('hint-2');
      raiseAssistance('structuralAssistance', 'hint-2');
      render();
    });
  }

  function renderStructuralPrediction() {
    if (state.structuralIndex >= STRUCTURAL_STEPS.length) {
      const assistance = state.structuralAssistance;
      if (!state.structuralRecorded) {
        const reviewHtml = `<p class="review-question"><strong>Structural prediction committed before current-data counts:</strong></p><ul>${state.structuralAnswers.map((item) => `<li>${escapeHtml(item.answer)}</li>`).join('')}</ul>`;
        recordCompleted({
          id: 'structural-prediction',
          label: 'Structural prediction',
          answer: 'Multiple rows · repeated source information · source–article match Grain',
          assistance,
          reviewHtml,
        });
        state.structuralRecorded = true;
      }
      interactionLifecycle.renderCurrent(stepShell(
        'Structural prediction committed.',
        `${predictionSummaryMarkup()}<div class="success-feedback">You established the JOIN’s structural behavior from the 1 → M relationship before seeing current-data counts.</div><div class="assistance-stamp">Assistance provenance: <strong>${escapeHtml(assistanceLabel(assistance))}</strong></div><button id="continue-to-numeric" class="primary continue-after-feedback">Use the current data</button>`,
      ));
      renderCompleted();
      document.getElementById('continue-to-numeric').addEventListener('click', () => setCurrent('numericPrediction'));
      return;
    }

    const step = STRUCTURAL_STEPS[state.structuralIndex];
    const draftKey = `structural-${step.id}`;
    const draft = state.drafts[draftKey] || '';
    interactionLifecycle.renderCurrent(stepShell(
      'Predict the raw JOIN before using current-data counts.',
      `<div class="prediction-workspace">
        <div class="prediction-header"><span>Structural prediction</span><strong>${state.structuralIndex + 1} of ${STRUCTURAL_STEPS.length}</strong></div>
        ${predictionSummaryMarkup()}
        <div class="prediction-current"><h3>${step.prompt}</h3>${choiceForm('structural-form', step.options, draft)}${feedbackMarkup()}${predictionHintsMarkup(step)}</div>
      </div>`,
      teacherVoice('Use the known relationship and JOIN matching semantics. Current source/article counts stay out of view until these structural judgments are committed.'),
    ));
    wirePredictionHints();
    document.getElementById('structural-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts[draftKey] = answer || '';
      if (answer !== step.correct) {
        if (step.id === 'multiplicity') state.structuralWrongAttempts += 1;
        return wrong(step.wrong);
      }
      state.structuralAnswers.push({ id: step.id, answer: step.answer, value: answer });
      state.structuralIndex += 1;
      state.localFeedback = '';
      hideSolution();
      render();
    });
  }

  function renderNumericPrediction() {
    const options = [
      ['18', '18 source–article matches.'],
      ['source-count', 'One result row per source, regardless of how many articles match.'],
      ['more', 'More than 18 rows.'],
    ];
    const draft = state.drafts.numericPrediction || '';
    interactionLifecycle.renderCurrent(stepShell(
      'What is the current-data consequence?',
      `<div class="current-data-fact"><span>Current data</span><strong>18 article rows</strong><p>Every article belongs to exactly one source.</p></div>${choiceForm('numeric-form', options, draft)}${feedbackMarkup()}`,
      teacherVoice('The structural prediction is already fixed. Now use the current instance data only to calculate the exact number of source–article matches.'),
    ));
    document.getElementById('numeric-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.numericPrediction = answer || '';
      if (answer !== '18') return wrong('There are 18 article rows, and each belongs to one source. How many source–article matches does that create?');
      recordCompleted({
        id: 'numeric-prediction',
        label: 'Current-data prediction',
        prompt: 'How many source–article matches will the direct INNER JOIN produce?',
        answer: '18 source–article matches.',
        assistance: state.numericAssistance,
      });
      setCurrent('sql');
    });
  }

  function fanOutConceptMarkup() {
    return `<section class="concept-callout fanout-concept"><strong>CONCEPT MOMENT</strong><b>Fan-out</b><span>When one starting row matches multiple rows on the many side, that starting row can contribute multiple result rows. The one-side information can therefore repeat across those matches.</span><div class="fanout-mechanism" aria-label="One starting row can produce multiple result rows through multiple matches"><span>one starting row</span><i>→</i><span>multiple matching rows</span><i>→</i><span>multiple result rows</span></div></section>`;
  }

  function clearRenderedResults() {
    document.getElementById('result-content').innerHTML = '<p class="empty">Results will appear here.</p>';
    document.getElementById('result-meta').textContent = 'No query run';
    clearButton.disabled = true;
  }

  function renderSql() {
    if (!state.sqlPrepared) {
      editor.setValue('', -1);
      clearRenderedResults();
      state.sqlPrepared = true;
    }
    interactionLifecycle.renderCurrent(stepShell(
      state.sqlVerified ? 'The verification query returned the required evidence.' : 'Implement the proposed direct INNER JOIN.',
      `${fanOutConceptMarkup()}${teacherVoice('Use SQL now to test the prediction you already committed. Return source and article detail so the resulting row meaning can be inspected.')}${state.sqlVerified ? '<div class="success-feedback">The query returned the source/article evidence needed for inspection. Execution success does not decide the relational diagnosis for you.</div><button id="continue-to-verification" class="primary continue-after-feedback">Inspect and reconcile the result</button>' : '<p class="step-copy">Author the direct JOIN from <code>news_source</code> to <code>news_article</code>, using their established <code>news_source_id</code> relationship. Include source name and article title in the result.</p>'}${feedbackMarkup()}`,
    ));
    if (state.sqlVerified) document.getElementById('continue-to-verification').addEventListener('click', () => {
      recordCompleted({
        id: 'sql-verification',
        label: 'SQL verification',
        answer: 'Direct INNER JOIN executed; source/article detail returned.',
        assistance: state.sqlAssistance,
      });
      setCurrent('verification');
    });
  }

  function canonicalPairs() {
    const db = getDatabase();
    if (!db) return [];
    const result = db.exec(`
      SELECT news_source.name AS source_name, news_article.title AS article_title
      FROM news_source
      INNER JOIN news_article
        ON news_source.news_source_id = news_article.news_source_id;
    `)[0];
    return (result?.values || []).map(([source, article]) => `${String(source)}\u0000${String(article)}`).sort();
  }

  function resultContainsCanonicalPairs(resultSet) {
    if (!resultSet || resultSet.values.length !== 18 || resultSet.columns.length < 2) return false;
    const expected = canonicalPairs();
    const width = resultSet.columns.length;
    for (let sourceIndex = 0; sourceIndex < width; sourceIndex += 1) {
      for (let articleIndex = 0; articleIndex < width; articleIndex += 1) {
        if (sourceIndex === articleIndex) continue;
        const actual = resultSet.values.map((row) => `${String(row[sourceIndex])}\u0000${String(row[articleIndex])}`).sort();
        if (actual.length === expected.length && actual.every((value, index) => value === expected[index])) return true;
      }
    }
    return false;
  }

  function validateSql(statement, resultSets) {
    const normalized = statement.replace(/["`\[\]]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    const forbidden = [
      /\bleft\s+join\b/,
      /\bgroup\s+by\b/,
      /\bhaving\b/,
      /\bdistinct\b/,
      /\bexists\b/,
      /\bunion\b/,
      /\bcount\s*\(/,
      /\bsum\s*\(/,
      /\bavg\s*\(/,
      /\bmin\s*\(/,
      /\bmax\s*\(/,
    ];
    if (forbidden.some((pattern) => pattern.test(normalized))) return { ok: false, message: 'Use the proposed raw direct INNER JOIN only. Do not introduce aggregation, DISTINCT, LEFT JOIN, EXISTS, or another repair mechanism.' };
    if (!/\bfrom\s+news_source\b/.test(normalized)) return { ok: false, message: 'Start from the source-level relation <code>news_source</code> so this query tests the proposed source-to-article JOIN.' };
    if (!/\b(?:inner\s+)?join\s+news_article\b/.test(normalized) || !/\bon\b/.test(normalized)) return { ok: false, message: 'Use a direct INNER JOIN to <code>news_article</code> with an <code>ON</code> match condition.' };
    const resultSet = resultSets.at(-1);
    if (!resultContainsCanonicalPairs(resultSet)) return { ok: false, message: 'The query ran, but the returned rows do not yet expose the 18 source–article matches with both source and article detail required for verification.' };
    return { ok: true };
  }

  function handleSqlSuccess(statement, resultSets) {
    if (state.current !== 'sql' || state.sqlVerified) return;
    const validation = validateSql(statement, resultSets);
    if (!validation.ok) {
      state.localFeedback = stripMarkup(validation.message);
      render();
      return;
    }
    state.sqlVerified = true;
    state.localFeedback = '';
    render();
  }

  function committedPredictionMarkup() {
    return `<aside class="committed-prediction"><div><span>Committed before SQL</span><strong>Prediction</strong></div><ul>${state.structuralAnswers.map((item) => `<li>${escapeHtml(item.answer)}</li>`).join('')}<li>Current-data consequence: 18 source–article matches.</li></ul><small>Structural assistance: ${escapeHtml(assistanceLabel(state.structuralAssistance))}</small></aside>`;
  }

  function verificationProgressMarkup() {
    if (!state.verificationAnswers.length) return '';
    return `<div class="verification-progress">${state.verificationAnswers.map((item, index) => `<div><span>✓ ${index + 1}</span><p>${escapeHtml(item.answer)}</p></div>`).join('')}</div>`;
  }

  function renderVerification() {
    if (state.verificationIndex >= VERIFICATION_STEPS.length) {
      const reviewHtml = `<p class="review-question"><strong>Result-based reconciliation:</strong></p><ul>${state.verificationAnswers.map((item) => `<li>${escapeHtml(item.answer)}</li>`).join('')}</ul>`;
      recordCompleted({
        id: 'result-verification',
        label: 'Result verification',
        answer: 'Structural repetition diagnosed and prediction reconciled.',
        assistance: state.verificationAssistance,
        reviewHtml,
      });
      setCurrent('complete');
      return;
    }
    const step = VERIFICATION_STEPS[state.verificationIndex];
    const draftKey = `verification-${step.id}`;
    const draft = state.drafts[draftKey] || '';
    const action = renderWorkspaceAction(`
      ${committedPredictionMarkup()}
      <div class="verification-workspace">
        <div class="verification-heading"><span>Reconcile the result</span><strong>${state.verificationIndex + 1} of ${VERIFICATION_STEPS.length}</strong></div>
        ${verificationProgressMarkup()}
        <h3>${step.prompt}</h3>
        ${choiceForm('verification-form', step.options, draft)}
        ${feedbackMarkup()}
      </div>
    `, 'cycle1-verification-action');
    interactionLifecycle.renderCurrent(stepShell(
      'Use the actual returned rows as the primary evidence.',
      teacherVoice('Keep the result in view while you diagnose what repeated source values mean and compare the observation with your committed prediction.'),
    ));
    action.querySelector('#verification-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts[draftKey] = answer || '';
      if (answer !== step.correct) return wrong(step.wrong);
      state.verificationAnswers.push({ id: step.id, answer: step.answer, value: answer });
      state.verificationIndex += 1;
      state.localFeedback = '';
      hideSolution();
      render();
    });
  }

  function renderComplete() {
    interactionLifecycle.renderCurrent(stepShell(
      'The raw JOIN does not preserve the requested source-level Grain.',
      `<div class="completion-summary"><div class="success-feedback">The observed multiplication follows from the one-to-many match structure. Repeated source values occur across distinct source–article matches, and the raw result therefore does not preserve one source per row.</div><p>No repair mechanism is introduced in this encounter.</p></div>`,
    ));
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

  function updateWorkspaceVisibility() {
    const sqlActive = state.current === 'sql';
    const verificationActive = state.current === 'verification' || state.current === 'complete';
    const visible = sqlActive || verificationActive;
    labEl.hidden = !visible;
    learningEl.classList.toggle('cycle1-sql-active', sqlActive && !state.sqlVerified);
    learningEl.classList.toggle('cycle1-results-active', (sqlActive && state.sqlVerified) || verificationActive);
    learningEl.classList.toggle('cycle1-verification-active', verificationActive);
    runButton.hidden = !sqlActive || state.sqlVerified;
    runButton.disabled = !sqlActive || state.sqlVerified || !getDatabase();
    clearButton.hidden = !sqlActive || state.sqlVerified;
    if (verificationActive || state.sqlVerified) {
      clearButton.hidden = true;
      clearButton.disabled = true;
    }
    document.querySelector('.editor-header h2').textContent = verificationActive || state.sqlVerified ? 'SQL result' : 'JOIN implementation';
    document.getElementById('editor-note').textContent = verificationActive || state.sqlVerified ? 'Actual returned rows' : 'SQLite · verification only';
  }

  function canRunSql() {
    return state.current === 'sql' && !state.sqlVerified;
  }

  function solutionForCurrentTask() {
    if (state.current === 'requestedGrain') return '<strong>Solution:</strong> one publishing source per requested row.';
    if (state.current === 'structuralPrediction') {
      const step = STRUCTURAL_STEPS[state.structuralIndex];
      if (!step) return '<strong>Solution:</strong> one source can contribute several rows; source information can repeat; one raw row represents one source–article match.';
      return `<strong>Solution:</strong> ${escapeHtml(step.answer)}`;
    }
    if (state.current === 'numericPrediction') return '<strong>Solution:</strong> 18 source–article matches.';
    if (state.current === 'sql') return `<strong>Solution SQL:</strong><pre>SELECT news_source.name AS source_name,
       news_article.title AS article_title
FROM news_source
INNER JOIN news_article
  ON news_source.news_source_id = news_article.news_source_id;</pre><p>This is shown as assistance only. It has not been inserted or run.</p>`;
    if (state.current === 'verification') {
      const step = VERIFICATION_STEPS[state.verificationIndex];
      return step ? `<strong>Solution:</strong> ${escapeHtml(step.answer)}` : '<strong>Solution:</strong> the observed multiplication is structural fan-out across legitimate source–article matches.';
    }
    if (state.current === 'complete') return '<strong>Completed reasoning:</strong> the direct raw JOIN fans out source rows across their matching articles and does not preserve one source per row.';
    return '<strong>Solution:</strong> no current answer is available.';
  }

  function showSolution() {
    markSolutionUse();
    if (state.current === 'requestedGrain') state.requestedGrainAssistance = 'solution-assisted';
    solutionPanel.innerHTML = `<div class="solution-panel-heading"><span>Solution assistance</span><button id="close-solution" type="button" aria-label="Close solution">Close</button></div><div class="solution-panel-body">${solutionForCurrentTask()}</div>`;
    solutionPanel.hidden = false;
    document.getElementById('close-solution').addEventListener('click', hideSolution);
    render();
  }

  function hideSolution() {
    if (!solutionPanel) return;
    solutionPanel.hidden = true;
    solutionPanel.innerHTML = '';
  }

  function wireSolutionControl() {
    solutionButton?.addEventListener('click', showSolution);
  }

  function render() {
    clearWorkspaceAction();
    renderRelations();
    renderCompleted();
    updateWorkspaceVisibility();

    if (state.current === 'requestedGrain') renderRequestedGrain();
    else if (state.current === 'structuralPrediction') renderStructuralPrediction();
    else if (state.current === 'numericPrediction') renderNumericPrediction();
    else if (state.current === 'sql') renderSql();
    else if (state.current === 'verification') renderVerification();
    else if (state.current === 'complete') renderComplete();
  }

  function refresh() {
    render();
  }

  wireSolutionControl();
  render();

  return {
    addRelation,
    canAddRelations,
    canRunSql,
    handleSqlSuccess,
    isRelationSelected,
    relationshipLevel,
    refresh,
  };
}
