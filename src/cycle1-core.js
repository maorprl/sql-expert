import './stage1.css';
import './cycle1.css';

const REQUIRED_RELATIONS = ['funding_round', 'round_investment'];

const LABELS = {
  grain: 'Requested output Grain',
  cardinality: 'Relationship Cardinality',
  prediction: 'Pre-execution prediction',
  application: 'Concrete application',
  sql: 'SQL implementation',
  verification: 'Result verification',
  complete: 'Participation audit complete',
};

const ASSISTANCE_STRENGTH = {
  unassisted: 0,
  'hint-1': 1,
  'hint-2': 2,
  'solution-assisted': 3,
};

const PREDICTION_STEPS = [
  {
    id: 'result-shape',
    prompt: 'Using the Grain and relationship you established, what must happen in the result if the same funding round has several recorded participations?',
    options: [
      ['multiple', 'That funding round can occupy several result rows — one for each recorded participation.'],
      ['single', 'That funding round must still occupy exactly one result row.'],
      ['collapse', 'The participation records must be merged into one funding-round row.'],
      ['grain-change', 'The target Grain changes from participation to funding round.'],
    ],
    correct: 'multiple',
    answer: 'One funding round can occupy several result rows when several participation records must each remain represented.',
    wrong: 'Hold the target Grain at one participation per row, then ask whether several participation records for the same round can all fit into one result row.',
  },
  {
    id: 'repetition',
    prompt: 'Across those distinct participation rows, what should happen to funding-round context such as round_type and announced_date?',
    options: [
      ['repeat', 'The round-level values can repeat while participation identifiers differ; those rows are not duplicates merely because the round context repeats.'],
      ['duplicate', 'Repeated round-level values mean the rows are accidental duplicates and should collapse to one.'],
      ['first-only', 'Round-level values should appear only on the first participation row.'],
      ['different-rounds', 'If round-level values repeat, the rows must represent different funding rounds.'],
    ],
    correct: 'repeat',
    answer: 'Round-level context can repeat across distinct participation rows without making those rows duplicates.',
    wrong: 'Keep the row meaning fixed: each row represents a different participation. Ask what happens to shared round context when several such rows belong to the same round.',
  },
];

export function createCycle1({ editor, getDatabase, getSchema, onSelectionChange, interactionLifecycle }) {
  const state = {
    current: 'grain',
    completed: [],
    drafts: {},
    localFeedback: '',
    grainAssistance: 'unassisted',
    cardinalityAssistance: 'unassisted',
    predictionAssistance: 'unassisted',
    applicationAssistance: 'unassisted',
    sqlAssistance: 'unassisted',
    verificationAssistance: 'unassisted',
    predictionIndex: 0,
    predictionAnswers: [],
    predictionRecorded: false,
    predictionWrongAttempts: 0,
    predictionHintsOpened: new Set(),
    cardinalityEstablished: false,
    sqlPrepared: false,
    sqlVerified: false,
    lastResultSet: null,
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
    if (state.current === 'grain') return 'grainAssistance';
    if (state.current === 'cardinality') return 'cardinalityAssistance';
    if (state.current === 'prediction') return 'predictionAssistance';
    if (state.current === 'application') return 'applicationAssistance';
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
    return 2;
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
    return `
      <article class="data-card cycle1-schema-card" data-relation="${escapeHtml(name)}">
        <div class="data-card-title"><code>${escapeHtml(name)}</code><span class="schema-role">${escapeHtml(role)}</span></div>
        <ul class="working-columns">
          ${relation.columns.map((column) => {
            const isRelationshipKey = column.column === 'funding_round_id';
            let badge = '';
            if (isRelationshipKey) badge = name === 'funding_round' ? '<span class="key-badge">PK</span>' : '<span class="key-badge">FK</span>';
            const classes = isRelationshipKey ? 'relationship-column' : '';
            return `<li><div class="working-column ${classes}"><code>${escapeHtml(column.column)}</code>${badge}</div></li>`;
          }).join('')}
        </ul>
      </article>`;
  }

  function renderRelations() {
    const showCardinality = state.cardinalityEstablished || ['prediction', 'application', 'sql', 'verification', 'complete'].includes(state.current);
    relationEl.className = `relation-preview cycle1-relation-preview relationship-visible${showCardinality ? ' cardinality-visible' : ''}`;
    workingStatusEl.textContent = showCardinality
      ? 'Known relationship · one funding round can relate to many participation records'
      : 'Known FK → PK relationship for the participation audit';
    workingStatusEl.hidden = false;
    relationEl.innerHTML = `
      ${renderSchemaCard('funding_round', 'Round context')}
      <div class="cycle1-schema-connector" aria-label="funding_round.funding_round_id one to many round_investment.funding_round_id">
        <svg class="cycle1-connector-line" viewBox="0 0 100 120" preserveAspectRatio="none" aria-hidden="true">
          <line x1="1" y1="55" x2="99" y2="87"></line>
          <circle cx="1" cy="55" r="4"></circle>
          <circle cx="99" cy="87" r="4"></circle>
        </svg>
        ${showCardinality ? '<span class="cycle1-cardinality one">1</span><span class="cycle1-cardinality many">M</span>' : ''}
        <span class="cycle1-connector-caption"><code>funding_round_id</code></span>
      </div>
      ${renderSchemaCard('round_investment', 'Participation detail')}
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

  function renderGrain() {
    const options = [
      ['round', 'One funding round.'],
      ['participation', 'One recorded round-investor participation.'],
      ['investor', 'One investor across all funding rounds.'],
      ['company', 'One company.'],
    ];
    const draft = state.drafts.grain || '';
    interactionLifecycle.renderCurrent(stepShell(
      'What should one row of this requested audit represent?',
      `${choiceForm('grain-form', options, draft)}${feedbackMarkup()}`,
      teacherVoice('Use the business request to set the result Grain before reasoning about what the relationship can do to the rows.'),
    ));
    document.getElementById('grain-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.grain = answer || '';
      if (answer !== 'participation') return wrong('The request asks for every recorded round-investor participation, with round information carried as context.');
      recordCompleted({
        id: 'grain',
        label: 'Requested output Grain',
        prompt: 'What should one requested row represent?',
        answer: 'One recorded round-investor participation per row.',
        assistance: state.grainAssistance,
      });
      setCurrent('cardinality');
    });
  }

  function renderCardinality() {
    const options = [
      ['one-many', 'Each participation belongs to one funding round, and one funding round can have multiple participation records.'],
      ['round-one', 'Each funding round belongs to exactly one participation record.'],
      ['participation-many', 'A participation can belong to multiple funding rounds.'],
      ['exact-one', 'Exactly one participation is allowed for every funding round.'],
    ];
    const draft = state.drafts.cardinality || '';
    interactionLifecycle.renderCurrent(stepShell(
      'Which statement matches the relationship?',
      `${choiceForm('cardinality-form', options, draft)}${feedbackMarkup()}`,
      teacherVoice('Read the FK → PK relationship direction. Reuse Cardinality from Stage 1; do not infer it from the current rows.'),
    ));
    document.getElementById('cardinality-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.cardinality = answer || '';
      if (answer !== 'one-many') return wrong('Follow round_investment.funding_round_id to the funding_round primary key, then reason in both directions.');
      state.cardinalityEstablished = true;
      recordCompleted({
        id: 'cardinality',
        label: 'Relationship Cardinality',
        prompt: 'Which statement matches the relationship?',
        answer: 'Each participation belongs to one round; one round can have multiple participations.',
        assistance: state.cardinalityAssistance,
      });
      setCurrent('prediction');
    });
  }

  function reasoningSummaryMarkup() {
    return `<div class="micro-evidence-list" aria-label="Established reasoning">
      <div class="micro-evidence"><span>✓</span><p>Target Grain: one recorded participation per result row.</p></div>
      <div class="micro-evidence"><span>✓</span><p>Relationship: one funding round can relate to multiple participation records.</p></div>
    </div>`;
  }

  function predictionProgressMarkup() {
    if (!state.predictionAnswers.length) return reasoningSummaryMarkup();
    return `${reasoningSummaryMarkup()}<div class="micro-evidence-list" aria-label="Prediction judgments">${state.predictionAnswers.map((item) => `<div class="micro-evidence"><span>✓</span><p>${escapeHtml(item.answer)}</p></div>`).join('')}</div>`;
  }

  function predictionHintsMarkup() {
    const hint1Available = state.predictionWrongAttempts >= 1;
    const hint2Available = state.predictionWrongAttempts >= 2;
    return `<div class="local-assistance" aria-label="Prediction assistance">
      ${hint1Available ? '<button id="hint-1" type="button" class="assistance-button">Hint 1</button>' : ''}
      ${hint2Available ? '<button id="hint-2" type="button" class="assistance-button">Hint 2</button>' : ''}
      ${state.predictionHintsOpened.has('hint-1') ? '<div class="hint-text"><strong>Hint 1:</strong> Keep the requested Grain fixed at one participation per row.</div>' : ''}
      ${state.predictionHintsOpened.has('hint-2') ? '<div class="hint-text"><strong>Hint 2:</strong> If several participation records belong to the same funding round, each of those records still has to remain represented at the requested Grain.</div>' : ''}
    </div>`;
  }

  function wirePredictionHints() {
    document.getElementById('hint-1')?.addEventListener('click', () => {
      state.predictionHintsOpened.add('hint-1');
      raiseAssistance('predictionAssistance', 'hint-1');
      render();
    });
    document.getElementById('hint-2')?.addEventListener('click', () => {
      state.predictionHintsOpened.add('hint-2');
      raiseAssistance('predictionAssistance', 'hint-2');
      render();
    });
  }

  function renderPrediction() {
    if (state.predictionIndex >= PREDICTION_STEPS.length) {
      if (!state.predictionRecorded) {
        recordCompleted({
          id: 'prediction',
          label: 'Pre-execution prediction',
          answer: 'One round can occupy several participation rows; shared round context can repeat across distinct rows.',
          assistance: state.predictionAssistance,
          reviewHtml: `<p class="review-question"><strong>Prediction committed before SQL:</strong></p><ul>${state.predictionAnswers.map((item) => `<li>${escapeHtml(item.answer)}</li>`).join('')}</ul>`,
        });
        state.predictionRecorded = true;
      }
      interactionLifecycle.renderCurrent(stepShell(
        'Prediction committed before execution.',
        `${rowMultiplicationConceptMarkup()}<div class="success-feedback">You used the target Grain and the one-to-many relationship to predict the result shape before seeing query output.</div><div class="assistance-stamp">Assistance provenance: <strong>${escapeHtml(assistanceLabel(state.predictionAssistance))}</strong></div><button id="continue-to-application" class="primary continue-after-feedback">Apply the prediction to a concrete case</button>`,
      ));
      document.getElementById('continue-to-application').addEventListener('click', () => setCurrent('application'));
      return;
    }

    const step = PREDICTION_STEPS[state.predictionIndex];
    const draftKey = `prediction-${step.id}`;
    const draft = state.drafts[draftKey] || '';
    interactionLifecycle.renderCurrent(stepShell(
      'Predict the result shape before SQL.',
      `<div class="prediction-workspace">
        <div class="prediction-header"><span>Core evidence</span><strong>${state.predictionIndex + 1} of ${PREDICTION_STEPS.length}</strong></div>
        ${predictionProgressMarkup()}
        <div class="prediction-current"><h3>${step.prompt}</h3>${choiceForm('prediction-form', step.options, draft)}${feedbackMarkup()}${predictionHintsMarkup()}</div>
      </div>`,
      teacherVoice('Use only the Grain and Cardinality you already established. No current-data row count is needed for this prediction.'),
    ));
    wirePredictionHints();
    document.getElementById('prediction-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts[draftKey] = answer || '';
      if (answer !== step.correct) {
        state.predictionWrongAttempts += 1;
        return wrong(step.wrong);
      }
      state.predictionAnswers.push({ id: step.id, answer: step.answer, value: answer });
      state.predictionIndex += 1;
      state.localFeedback = '';
      hideSolution();
      render();
    });
  }

  function rowMultiplicationConceptMarkup() {
    return `<section class="concept-callout fanout-concept"><strong>CONCEPT MOMENT</strong><b>JOIN row multiplication</b><span>When one row on the one-side matches several rows on the many-side, the JOIN can produce several output rows for that one-side entity. At a finer Grain, one-side values repeat because each result row represents a different matched detail record.</span><div class="fanout-mechanism" aria-label="One funding round can contribute context to several participation rows"><span>one funding round</span><i>→</i><span>several matching participations</span><i>→</i><span>several participation rows</span></div></section>`;
  }

  function renderApplication() {
    const options = [
      ['1', '1 row.'],
      ['3', '3 distinct participation rows.'],
      ['9', '9 rows.'],
      ['unknown', 'Impossible to tell after the number of matching participations is known.'],
    ];
    const draft = state.drafts.application || '';
    interactionLifecycle.renderCurrent(stepShell(
      'Apply the structural prediction.',
      `<div class="current-data-fact"><span>Concrete application · supporting evidence</span><strong>One funding round has 3 recorded participations</strong><p>The target Grain remains one participation per result row.</p></div>${choiceForm('application-form', options, draft)}${feedbackMarkup()}`,
      teacherVoice('The qualitative result shape is already committed. This step applies it to a concrete multiplicity; it is not the core evidence by itself.'),
    ));
    document.getElementById('application-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.application = answer || '';
      if (answer !== '3') return wrong('At participation Grain, each of the three recorded participations must remain represented by its own row.');
      recordCompleted({
        id: 'application',
        label: 'Concrete application',
        prompt: 'If one round has three recorded participations, how many participation-grain rows represent them?',
        answer: 'Three distinct participation rows.',
        assistance: state.applicationAssistance,
      });
      setCurrent('sql');
    });
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
      state.sqlVerified ? 'The participation audit query returned the required evidence.' : 'Implement the participation audit in SQL.',
      `${teacherVoice('Translate the relational plan you already established. SQL verifies the prediction; it does not replace it.')}${state.sqlVerified ? '<div class="success-feedback">Query executed — 72 rows returned. The result is ready for inspection; the system has not interpreted the repeated round context for you.</div><button id="continue-to-verification" class="primary continue-after-feedback">Inspect the actual result</button>' : '<p class="step-copy">Return <code>funding_round_id</code>, <code>round_type</code>, <code>announced_date</code>, <code>round_investment_id</code>, <code>investor_id</code>, and <code>is_lead</code> by directly joining <code>funding_round</code> and <code>round_investment</code> on their established relationship.</p>'}${feedbackMarkup()}`,
    ));
    if (state.sqlVerified) document.getElementById('continue-to-verification').addEventListener('click', () => {
      recordCompleted({
        id: 'sql',
        label: 'SQL implementation',
        answer: 'Participation-grain INNER JOIN executed with 72 current rows.',
        assistance: state.sqlAssistance,
      });
      setCurrent('verification');
    });
  }

  function canonicalRows() {
    const db = getDatabase();
    if (!db) return [];
    const result = db.exec(`
      SELECT
        funding_round.funding_round_id,
        funding_round.round_type,
        funding_round.announced_date,
        round_investment.round_investment_id,
        round_investment.investor_id,
        round_investment.is_lead
      FROM funding_round
      INNER JOIN round_investment
        ON funding_round.funding_round_id = round_investment.funding_round_id;
    `)[0];
    return (result?.values || []).map((row) => JSON.stringify(row)).sort();
  }

  function resultMatchesCanonical(resultSet) {
    if (!resultSet || resultSet.values.length !== 72) return false;
    const required = ['funding_round_id', 'round_type', 'announced_date', 'round_investment_id', 'investor_id', 'is_lead'];
    const indexes = required.map((name) => resultSet.columns.indexOf(name));
    if (indexes.some((index) => index < 0)) return false;
    const actual = resultSet.values.map((row) => JSON.stringify(indexes.map((index) => row[index]))).sort();
    const expected = canonicalRows();
    return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
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
    if (forbidden.some((pattern) => pattern.test(normalized))) return { ok: false, message: 'Keep this encounter to the direct participation-grain INNER JOIN. Do not add aggregation, DISTINCT, LEFT JOIN, EXISTS, or another repair mechanism.' };
    if (!/\bfrom\s+(?:funding_round|round_investment)\b/.test(normalized)) return { ok: false, message: 'Use funding_round and round_investment as the two relations for this audit.' };
    const hasBothRelations = /\bfunding_round\b/.test(normalized) && /\bround_investment\b/.test(normalized);
    if (!hasBothRelations || !/\b(?:inner\s+)?join\b/.test(normalized) || !/\bon\b/.test(normalized)) return { ok: false, message: 'Use a direct INNER JOIN between funding_round and round_investment with the established funding_round_id relationship in ON.' };
    const resultSet = resultSets.at(-1);
    if (!resultMatchesCanonical(resultSet)) return { ok: false, message: 'The query ran, but the result does not yet match the required six-field participation audit with all 72 current participation rows.' };
    return { ok: true };
  }

  function handleSqlSuccess(statement, resultSets) {
    if (state.current !== 'sql' || state.sqlVerified) return;
    const validation = validateSql(statement, resultSets);
    if (!validation.ok) {
      state.localFeedback = validation.message;
      render();
      return;
    }
    state.lastResultSet = resultSets.at(-1);
    state.sqlVerified = true;
    state.localFeedback = '';
    render();
  }

  function committedPredictionMarkup() {
    return `<aside class="committed-prediction"><div><span>Committed before SQL</span><strong>Prediction</strong></div><ul>${state.predictionAnswers.map((item) => `<li>${escapeHtml(item.answer)}</li>`).join('')}<li>Concrete application: three participations require three participation-grain rows.</li></ul><small>Core prediction assistance: ${escapeHtml(assistanceLabel(state.predictionAssistance))}</small></aside>`;
  }

  function actualSliceRows() {
    const resultSet = state.lastResultSet;
    if (!resultSet) return [];
    const indexes = ['funding_round_id', 'round_type', 'announced_date', 'round_investment_id', 'investor_id', 'is_lead'].map((name) => resultSet.columns.indexOf(name));
    if (indexes.some((index) => index < 0)) return [];
    return resultSet.values
      .filter((row) => String(row[indexes[0]]) === '1003')
      .map((row) => indexes.map((index) => row[index]));
  }

  function actualSliceMarkup() {
    const rows = actualSliceRows();
    return `<div class="actual-evidence-slice"><div class="verification-heading"><span>Actual query evidence</span><strong>funding_round_id = 1003</strong></div><div class="result-content"><table><thead><tr>${['funding_round_id', 'round_type', 'announced_date', 'round_investment_id', 'investor_id', 'is_lead'].map((column) => `<th>${column}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((value) => `<td>${escapeHtml(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
  }

  function renderVerification() {
    const options = [
      ['distinct', 'They are four distinct participation-grain rows for the same funding round. The round context repeats because each row represents a different participation.'],
      ['duplicates', 'They are four accidental duplicate rows that should collapse to one.'],
      ['different-rounds', 'They represent four different funding rounds.'],
      ['same-participation', 'They show one participation repeated four times.'],
    ];
    const draft = state.drafts.verification || '';
    const action = renderWorkspaceAction(`
      ${committedPredictionMarkup()}
      ${actualSliceMarkup()}
      <div class="verification-workspace">
        <div class="verification-heading"><span>Final verification</span><strong>Use the rows above</strong></div>
        <h3>What do these rows show about funding round 1003?</h3>
        ${choiceForm('verification-form', options, draft)}
        ${feedbackMarkup()}
      </div>
    `, 'cycle1-verification-action');
    interactionLifecycle.renderCurrent(stepShell(
      'Interpret the actual result without treating repeated round values as the conclusion by themselves.',
      teacherVoice('Keep the 1003 result slice in view. Compare the repeated round context with the different participation and investor identifiers.'),
    ));
    action.querySelector('#verification-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.verification = answer || '';
      if (answer !== 'distinct') return wrong('Compare the repeated funding-round fields with the changing round_investment_id and investor_id values.');
      recordCompleted({
        id: 'verification',
        label: 'Result verification',
        prompt: 'What do the 1003 rows show?',
        answer: 'Four distinct participation rows for one round; repeated round context is expected.',
        assistance: state.verificationAssistance,
      });
      setCurrent('complete');
    });
  }

  function renderComplete() {
    interactionLifecycle.renderCurrent(stepShell(
      'Prediction and actual result agree.',
      `<div class="completion-summary"><div class="success-feedback">One funding round can contribute several participation-grain rows. The funding-round context repeats because each result row represents a different recorded participation.</div><p>The current audit contains 72 participation rows. This encounter does not introduce aggregation, LEFT JOIN, metric reconciliation, or the term fan-out.</p></div>`,
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
    document.querySelector('.editor-header h2').textContent = verificationActive || state.sqlVerified ? 'SQL result' : 'Participation audit SQL';
    document.getElementById('editor-note').textContent = verificationActive || state.sqlVerified ? 'Actual returned rows' : 'SQLite · implementation only';
  }

  function canRunSql() {
    return state.current === 'sql' && !state.sqlVerified;
  }

  function solutionForCurrentTask() {
    if (state.current === 'grain') return '<strong>Solution:</strong> one recorded round-investor participation per result row.';
    if (state.current === 'cardinality') return '<strong>Solution:</strong> each participation belongs to one funding round, and one funding round can have multiple participation records.';
    if (state.current === 'prediction') {
      const step = PREDICTION_STEPS[state.predictionIndex];
      if (!step) return '<strong>Solution:</strong> one round can occupy several participation rows, and shared round context can repeat across those distinct rows.';
      return `<strong>Solution:</strong> ${escapeHtml(step.answer)}`;
    }
    if (state.current === 'application') return '<strong>Solution:</strong> three recorded participations require three participation-grain rows.';
    if (state.current === 'sql') return `<strong>Solution SQL:</strong><pre>SELECT
  funding_round.funding_round_id,
  funding_round.round_type,
  funding_round.announced_date,
  round_investment.round_investment_id,
  round_investment.investor_id,
  round_investment.is_lead
FROM funding_round
JOIN round_investment
  ON funding_round.funding_round_id = round_investment.funding_round_id;</pre><p>This is assistance only. It has not been inserted or run.</p>`;
    if (state.current === 'verification') return '<strong>Solution:</strong> the four rows are distinct participation-grain rows for the same funding round; repeated round context is expected because the participation records differ.';
    if (state.current === 'complete') return '<strong>Completed reasoning:</strong> Cardinality plus participation Grain predicts row multiplication and repeated one-side context across distinct participation rows.';
    return '<strong>Solution:</strong> no current answer is available.';
  }

  function showSolution() {
    markSolutionUse();
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

    if (state.current === 'grain') renderGrain();
    else if (state.current === 'cardinality') renderCardinality();
    else if (state.current === 'prediction') renderPrediction();
    else if (state.current === 'application') renderApplication();
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
