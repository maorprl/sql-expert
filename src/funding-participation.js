import './funding-participation.css';

const BUSINESS_REQUEST = 'The investment team wants to review every recorded investor participation with its funding round type, announced date, investor, and lead status.';
const BASELINE_SQL = 'SELECT COUNT(*) FROM round_investment;';
const REQUIRED_RELATIONS = ['round_investment', 'funding_round'];

const INTERACTION_LABELS = {
  relations: 'Identify relevant relations',
  connection: 'Understand the relationship',
  premises: 'Confirm the working premises',
  baselineRun: 'Establish the baseline',
  prediction: 'Predict result rows',
  repetition: 'Reason about repeated context',
  mechanism: 'Trace multiple matches',
  sql: 'Implement the INNER JOIN',
  finalGrain: 'Verify the result',
  complete: 'Stage complete',
};

export function createFundingParticipation({ editor, getDatabase, getSchema, onSelectionChange, interactionLifecycle }) {
  const reasoningThread = interactionLifecycle.createReasoningThread({ businessQuestion: BUSINESS_REQUEST });
  const state = interactionLifecycle.createInteractionState({
    initial: 'relations',
    thread: reasoningThread,
    data: {
      evidence: new Set(), drafts: {}, localFeedback: '', selectedRelations: [], selectedColumn: '',
      baselinePrepared: false, implementationPrepared: false, mechanismBeat: 1,
      acceptedResult: null, solutionUsed: false,
    },
  });

  const relationEl = document.getElementById('relation-preview');
  const workingStatusEl = document.getElementById('working-schema-status');
  const labEl = document.getElementById('lab-workspace');
  const learningEl = document.querySelector('.learning-panel');
  const solutionButton = document.getElementById('show-solution');

  solutionButton?.addEventListener('click', () => {
    if (document.title === 'SQL Lab · Funding participation' && state.current === 'sql' && learningEl.classList.contains('sql-implementation-active')) state.solutionUsed = true;
  }, { capture: true });

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
    if (state.evidence.has('premises')) return 2;
    if (state.evidence.has('connection')) return 1;
    return 0;
  }

  function renderColumn(relation, column) {
    const keyLevel = relationshipLevel();
    const isConnectingChoice = state.current === 'connection' && relation.name === 'round_investment';
    const isSelected = isConnectingChoice && state.selectedColumn === column.column;
    const isParticipationForeignKey = keyLevel > 0 && relation.name === 'round_investment' && column.column === 'funding_round_id';
    const isRoundPrimaryKey = keyLevel > 0 && relation.name === 'funding_round' && column.column === 'funding_round_id';
    const isOutputField = ['mechanism', 'sql', 'finalGrain', 'complete'].includes(state.current)
      && ((relation.name === 'funding_round' && ['funding_round_id', 'round_type', 'announced_date'].includes(column.column))
        || (relation.name === 'round_investment' && ['round_investment_id', 'investor_id', 'is_lead'].includes(column.column)));
    const classes = [isSelected ? 'selected-column' : '', isParticipationForeignKey || isRoundPrimaryKey ? 'relationship-column' : '', isOutputField ? 'output-column' : ''].filter(Boolean).join(' ');
    const badge = isParticipationForeignKey ? '<span class="key-badge">FK</span>' : isRoundPrimaryKey ? '<span class="key-badge">PK</span>' : '';
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
    if (state.current === 'connection') return 'Select the participation field that identifies its round';
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

    if (showRelationship && cards.length >= 2) cards.splice(1, 0, '<div class="schema-connector" aria-label="round_investment.funding_round_id matches funding_round.funding_round_id"><span class="connector-line"></span></div>');
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
      premises: ['participation-round-connection'],
      baselineRun: ['relationship-premises', 'result-grain'],
      prediction: ['relationship-premises', 'result-grain', 'participation-baseline-measurement'],
      repetition: ['relationship-premises', 'result-grain', 'participation-result-prediction', 'round-1003-source-instance'],
      mechanism: ['repeated-context', 'round-1003-source-instance'],
      sql: ['participation-round-connection', 'participation-result-prediction', 'multiple-match-mechanism'],
      finalGrain: ['accepted-participation-result', 'participation-result-prediction', 'round-1003-result-slice'],
    };
    return byState[state.current] || [];
  }

  function stepShell(prompt, body, intro = '') {
    const label = INTERACTION_LABELS[state.current];
    reasoningThread.setCurrentQuestion(state.current === 'complete' ? null : { id: state.current, prompt: stripMarkup(prompt), evidenceIds: evidenceInPlay() });
    const transition = state.transition?.feedback ? `<section class="reasoning-transition" aria-label="Previous reasoning feedback">${state.transition.feedback}</section>` : '';
    return state.current !== 'complete'
      ? `${transition}<div class="step-kicker">${label}</div>${intro}<h2 class="prompt">${prompt}</h2>${body}`
      : `${transition}<h2 class="prompt">${prompt}</h2>${body}`;
  }

  function clearWorkspaceAction() { document.getElementById('workspace-evidence-action')?.remove(); }

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
      if (answer !== correct) return wrong(typeof wrongFeedback === 'string' ? wrongFeedback : (wrongFeedback[answer] || wrongFeedback.default));
      record({ evidence, prompt, answer: stripMarkup(options.find(([value]) => value === answer)[1]), value: answer, options, feedback, next, threadEntries });
    });
  }

  function queryResult(sql) {
    const result = getDatabase().exec(sql)[0];
    return result ? { columns: result.columns, values: result.values } : { columns: [], values: [] };
  }

  function dataTable(result, className = '') {
    return `<div class="stage2-table-scroll ${className}"><table><thead><tr>${result.columns.map((column) => `<th>${escapeHtml(column)}</th>`).join('')}</tr></thead><tbody>${result.values.map((row) => `<tr>${row.map((value) => `<td>${escapeHtml(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }

  function round1003SourceEvidence() {
    const round = queryResult('SELECT funding_round_id, round_type, announced_date FROM funding_round WHERE funding_round_id = 1003;');
    const participations = queryResult('SELECT round_investment_id, funding_round_id, investor_id, is_lead FROM round_investment WHERE funding_round_id = 1003 ORDER BY round_investment_id;');
    return { round, participations };
  }

  function round1003JoinedEvidence() {
    return queryResult(`SELECT
      funding_round.funding_round_id,
      funding_round.round_type,
      funding_round.announced_date,
      round_investment.round_investment_id,
      round_investment.investor_id,
      round_investment.is_lead
    FROM funding_round
    INNER JOIN round_investment ON funding_round.funding_round_id = round_investment.funding_round_id
    WHERE funding_round.funding_round_id = 1003
    ORDER BY round_investment.round_investment_id;`);
  }

  function renderConnection() {
    interactionLifecycle.renderCurrent(stepShell(
      'Which column in round_investment tells us which funding round a participation belongs to?',
      `<p class="step-copy">Select the field directly in the Working Schema, then check your selection here.</p><button id="check-stage2-column" class="primary" ${state.selectedColumn ? '' : 'disabled'}>Check selected column</button>${feedbackMarkup()}`,
      teacherVoice('You established the two relations. Now trace from one participation record to the funding round it belongs to.'),
    ));
    document.getElementById('check-stage2-column').addEventListener('click', () => {
      if (state.selectedColumn !== 'funding_round_id') return wrong('Look at one participation row and ask which column identifies the funding round that participation belongs to. The relationship stays hidden until you establish that connection.');
      record({
        evidence: 'connection',
        prompt: 'Which column in round_investment tells us which funding round a participation belongs to?',
        answer: 'round_investment.funding_round_id',
        feedback: '<div class="success-feedback">Correct. <code>funding_round_id</code> identifies the funding round for this participation.</div><div class="concept-callout"><strong>REUSED RELATIONSHIP PATTERN</strong><b>Primary Key / Foreign Key</b><span><code>round_investment.funding_round_id</code> points to <code>funding_round.funding_round_id</code>, so each participation can be matched with its round context.</span></div>',
        next: 'premises',
        threadEntries: [{ kind: 'fact', id: 'participation-round-connection', label: 'Participation-to-round relationship', value: { from: 'round_investment.funding_round_id', to: 'funding_round.funding_round_id' } }],
      });
    });
  }

  function renderPremises() {
    choiceQuestion({
      intro: teacherVoice('Use the relationship you found and the review request to confirm the premises needed for the prediction.'),
      prompt: 'Which set of premises matches both the relationship and the requested result rows?',
      options: [
        ['correct', 'One funding round can have many participation records; each participation belongs to one round; one result row represents one recorded participation.'],
        ['round-grain', 'One funding round can have many participation records, but one result row should represent one funding round.'],
        ['participation-many', 'Each participation can belong to many funding rounds, and one result row represents one participation.'],
        ['one-to-one', 'Each funding round has one participation, and each result row represents that funding round.'],
      ],
      correct: 'correct', evidence: 'premises', next: 'baselineRun',
      feedback: '<div class="success-feedback">Correct. One round can match several participation records, each participation belongs to one round, and the requested Grain is one recorded participation per row.</div><div class="concept-callout"><strong>REUSED PREMISES</strong><b>Cardinality and Grain</b><span>Keep these as working facts; they are not new concepts in this encounter.</span></div>',
      wrongFeedback: 'Keep the relationship direction and the business row meaning separate: how many participation rows may point to one round, and what must each requested result row preserve?',
      threadEntries: [
        { kind: 'fact', id: 'relationship-premises', label: 'Relationship meaning', value: 'one round can have many participations; each participation belongs to one round' },
        { kind: 'fact', id: 'result-grain', label: 'Requested result Grain', value: 'one recorded round-investor participation per row' },
      ],
    });
  }

  function renderPrediction() {
    choiceQuestion({
      intro: `${teacherVoice('Use the participation baseline, the requested Grain, and the fact that each participation belongs to one round.')}<div class="prediction-premises" aria-label="Established facts for the prediction"><div><span>Starting evidence</span><strong>72 participation rows</strong></div><div><span>Requested Grain</span><strong>one participation per row</strong></div><div><span>Match for each participation</span><strong>one funding round</strong></div></div>`,
      prompt: 'How many rows should the joined result contain?',
      options: [
        ['seventy-two', '72 rows — one result row for each recorded participation'],
        ['rounds', '12 rows — one result row for each funding round'],
        ['more', 'More than 72 rows — each participation should appear once for every investor in the database'],
        ['collapse', 'Fewer than 72 rows — participations for the same round should collapse together'],
      ],
      correct: 'seventy-two', evidence: 'prediction', next: 'repetition',
      feedback: '<div class="success-feedback">Correct. The result should contain 72 rows, one for each recorded participation. Adding its one matching round does not remove or create participation records.</div>',
      wrongFeedback: 'Start with 72 participation rows. Each participation belongs to one round, and the requested Grain remains one participation per result row.',
      threadEntries: [{ kind: 'prediction', id: 'participation-result-prediction', label: 'Expected INNER JOIN result', value: { rowCount: 72, grain: 'one recorded round-investor participation per row' } }],
    });
  }

  function renderRepeatedContext() {
    const source = round1003SourceEvidence();
    const matchCount = source.participations.values.length;
    reasoningThread.record({ kind: 'evidence', id: 'round-1003-source-instance', label: 'Source rows for funding_round_id 1003', value: { roundRowCount: source.round.values.length, participationRowCount: source.participations.values.length } });
    renderWorkspaceAction(`<div class="stage2-source-instance"><div class="evidence-kicker">Source rows · funding_round_id = 1003</div><section><strong>One funding_round row</strong>${dataTable(source.round)}</section><section><strong>${matchCount} related round_investment rows</strong>${dataTable(source.participations)}</section></div>`, 'stage2-source-evidence');
    choiceQuestion({
      intro: teacherVoice('Your 72-row prediction preserves every participation. Now inspect a concrete source instance and decide what should happen to its round-level context.'),
      prompt: `When round 1003 contributes context to its ${matchCount} participation rows, how should repeated round_type and announced_date values be interpreted?`,
      options: [
        ['repeat', `They can repeat across ${matchCount} distinct participation rows; the participation identifiers keep those rows distinct.`],
        ['duplicates', 'They prove the rows are accidental duplicates and should collapse to one row.'],
        ['first-only', 'They should appear only on the first participation row.'],
        ['different-rounds', `They mean the ${matchCount} rows must represent different funding rounds.`],
      ],
      correct: 'repeat', evidence: 'repetition', next: 'mechanism',
      feedback: '<div class="success-feedback">Correct. The round context can repeat while each row remains a distinct recorded participation.</div>',
      wrongFeedback: {
        default: 'Compare the participation identifiers in the visible source rows. Repeated round context does not make distinct participation records identical.',
        duplicates: `The participation identifiers differ. Would collapsing these rows still preserve all ${matchCount} recorded participations?`,
        'first-only': 'Does each participation row still need the funding-round context requested by the business?',
        'different-rounds': `All ${matchCount} participation rows carry funding_round_id 1003. What does that identifier say about the round they belong to?`,
      },
      threadEntries: [{ kind: 'fact', id: 'repeated-context', label: 'Repeated round context', value: 'round values may repeat across distinct participation-grain rows' }],
    });
  }

  function renderMechanism() {
    const source = round1003SourceEvidence();
    const joined = round1003JoinedEvidence();
    const matchCount = source.participations.values.length;
    const joinedCount = joined.values.length;
    renderWorkspaceAction(`<div class="stage2-match-mechanism"><div class="evidence-kicker">How the matches form result rows</div><div class="stage2-match-equation"><strong>1 funding_round row</strong><span>+</span><strong>${matchCount} matching round_investment rows</strong><span>→</span><strong>${joinedCount} joined result rows</strong></div><section><strong>Round row</strong>${dataTable(source.round)}</section><section><strong>Matching participation rows</strong>${dataTable(source.participations)}</section><section><strong>Result rows formed by those matches</strong>${dataTable(joined, 'joined-evidence')}</section><p class="stage2-mechanism-note">The JOIN did not invent participation records or change the Grain. It formed one result row for each matching participation.</p></div>`, 'stage2-mechanism-evidence');

    if (state.mechanismBeat === 1) {
      interactionLifecycle.renderCurrent(stepShell(`Follow how the ${matchCount} matches become ${joinedCount} result rows.`, `<p class="step-copy">The Workbench connects the one round row to its ${matchCount} matching participation rows and shows the result row formed for each match.</p><button id="name-stage2-mechanism" class="primary">Name this behavior</button>`, teacherVoice('You established that repeated round context can belong to distinct participation rows. Now connect that judgment to the row-matching mechanism.')));
      document.getElementById('name-stage2-mechanism').addEventListener('click', () => {
        state.evidence.add('mechanism');
        reasoningThread.record({ kind: 'evidence', id: 'multiple-match-mechanism', label: 'Concrete multiple-match mechanism', value: { fundingRoundId: 1003, roundRows: 1, matchingParticipationRows: matchCount, joinedResultRows: joinedCount } });
        state.mechanismBeat = 2;
        state.clearTransition();
        render();
      });
      return;
    }

    interactionLifecycle.renderCurrent(stepShell('Name the multiple-match mechanism.', `<div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>JOIN row multiplication</b><span>One funding-round row matched ${matchCount} participation rows, so its context contributed to ${joinedCount} joined result rows. The repeated round values are a consequence of those multiple matches; they are not the mechanism itself.</span></div><p class="grain-takeaway">The result Grain remains one recorded participation per row.</p><button id="continue-stage2-sql" class="primary">Continue to SQL</button>`, teacherVoice('The behavior now has a name because you have already reasoned through the repeated context and inspected the matches that cause it.')));
    document.getElementById('continue-stage2-sql').addEventListener('click', () => setCurrent('sql'));
  }

  function participationSliceRows() {
    if (!state.acceptedResult) return [];
    const columns = state.acceptedResult.columns.map((column) => column.toLowerCase());
    const roundIndex = columns.indexOf('funding_round_id');
    if (roundIndex < 0) return [];
    return state.acceptedResult.values.filter((row) => String(row[roundIndex]) === '1003');
  }

  function renderParticipationSlice() {
    const rows = participationSliceRows();
    if (!state.acceptedResult || !rows.length) return '<p class="empty">The accepted result does not contain the expected 1003 evidence slice.</p>';
    return `<div class="stage2-evidence-slice"><div class="evidence-kicker">Derived from your accepted result</div><strong>funding_round_id = 1003</strong>${dataTable({ columns: state.acceptedResult.columns, values: rows }, 'stage2-slice-scroll')}</div>`;
  }

  function renderFinalVerification() {
    const rows = participationSliceRows();
    const matchCount = rows.length;
    const prediction = reasoningThread.getPrediction();
    const expectedRows = prediction?.value?.rowCount ?? 72;
    const expectedGrain = prediction?.value?.grain ?? 'one recorded round-investor participation per row';
    reasoningThread.record({ kind: 'evidence', id: 'round-1003-result-slice', label: 'Accepted-result slice for funding_round_id 1003', value: { rowCount: rows.length, rows: rows.map((row) => [...row]) } });
    const options = [
      ['yes', `Round 1003 appears in ${matchCount} distinct participation rows; its context repeats because one round matched ${matchCount} participations, consistent with the ${expectedRows}-row participation-Grain result.`],
      ['duplicates', 'They are accidental duplicate rows and should collapse to one funding-round row.'],
      ['different-rounds', 'They represent different funding rounds that happen to share funding_round_id 1003.'],
      ['one-participation', 'They show one participation record repeated several times.'],
    ];
    const draft = state.drafts.finalGrain || '';
    renderWorkspaceAction(renderParticipationSlice(), 'stage2-verification-evidence');
    interactionLifecycle.renderCurrent(stepShell(`What do these ${rows.length} accepted-result rows show about funding round 1003?`, `<div class="verification-prompt"><strong>Compare with your prediction</strong><span>${expectedRows} rows · ${escapeHtml(expectedGrain)}</span></div><form id="verification-answer-form" class="answer-form"><fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${value}" ${draft === value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset><button class="primary" type="submit">Check answer</button></form>${feedbackMarkup()}`, '<p class="step-copy">Use the derived 1003 slice in the Workbench and the complete 72-row Results table as evidence.</p>'));
    document.getElementById('verification-answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.finalGrain = answer || '';
      if (answer !== 'yes') return wrong({ duplicates: 'Compare round_investment_id and investor_id in the derived slice. Are these rows identical at participation Grain?', 'different-rounds': `All ${matchCount} rows contain funding_round_id 1003. What does that identifier establish about their round?`, 'one-participation': `Compare the participation identifiers. Do they show one participation repeated or ${matchCount} distinct participation records?` }[answer] || `Use the derived slice: compare the repeated round fields with the participation identifiers, then reconcile its ${matchCount} rows with the stored 72-row prediction.`);
      record({ evidence: 'finalGrain', prompt: `What do these ${rows.length} accepted-result rows show about funding round 1003?`, answer: stripMarkup(options.find(([value]) => value === answer)[1]), value: answer, options, feedback: `<div class="success-feedback">Correct. Round 1003 matched ${matchCount} distinct participation records, so its context appears in ${matchCount} participation-grain rows. That local evidence is consistent with your ${expectedRows}-row prediction.</div>`, next: 'complete', threadEntries: [{ kind: 'fact', id: 'verified-multiple-matches', label: 'Verified multiple matches', value: { fundingRoundId: 1003, participationRows: matchCount, totalRows: expectedRows } }] });
    });
  }

  function hasExactRequiredRelations() {
    return state.selectedRelations.length === REQUIRED_RELATIONS.length && REQUIRED_RELATIONS.every((relation) => state.selectedRelations.includes(relation));
  }

  function relationSelectionFeedback() {
    const hasParticipations = state.selectedRelations.includes('round_investment');
    const hasRounds = state.selectedRelations.includes('funding_round');
    if (hasParticipations && hasRounds) return 'The funding-round context and recorded investor participations are already covered. Check whether every selected relation is needed for this review.';
    if (hasParticipations) return 'You already have the recorded investor participations, including lead status. Reinspect the Live Schema for the relation that provides the funding-round context requested.';
    if (hasRounds) return 'You already have the funding-round context. Reinspect the Live Schema for the relation that records which investors participated and whether they were leads.';
    return 'Break the review into the two information roles it needs: funding-round context and recorded investor participations. Reinspect the Live Schema and revise the selection.';
  }

  function updateWorkspaceVisibility() {
    const baselineWorkspace = ['baselineRun', 'prediction'].includes(state.current);
    const baselineEvidence = state.current === 'prediction';
    const resultsEvidence = state.current === 'finalGrain';
    const implementationWorkspace = state.current === 'sql';
    const visible = baselineWorkspace || implementationWorkspace || resultsEvidence;

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
    learningEl.classList.toggle('sql-implementation-active', implementationWorkspace);
    learningEl.classList.toggle('results-evidence-active', resultsEvidence);
    learningEl.classList.toggle('stage2-baseline-active', baselineWorkspace);
    learningEl.classList.toggle('stage2-baseline-evidence-active', baselineEvidence);
    learningEl.classList.toggle('stage2-instance-active', ['repetition', 'mechanism'].includes(state.current));
    learningEl.classList.toggle('stage2-mechanism-active', state.current === 'mechanism');
    learningEl.dataset.stage2State = resultsEvidence ? 'results' : state.current;
    document.querySelector('.editor-header h2').textContent = baselineWorkspace ? 'Participation baseline' : 'INNER JOIN implementation';
    document.querySelectorAll('.lab-action').forEach((element) => { element.hidden = !visible || baselineEvidence || resultsEvidence; });
    const runButton = document.getElementById('run-query');
    runButton.disabled = runButton.hidden;
  }

  function render() {
    document.getElementById('business-request-title').textContent = BUSINESS_REQUEST;
    clearWorkspaceAction();
    renderRelations();
    renderCompleted();
    updateWorkspaceVisibility();

    if (state.current === 'relations') {
      interactionLifecycle.renderCurrent(stepShell('Which relations contain the information we need?', '<p class="step-copy">Find the two relevant relations in Live Schema and add them to the Working Schema.</p><button id="continue-relations" class="primary" disabled>Check selection</button>' + feedbackMarkup()));
      const relationButton = document.getElementById('continue-relations');
      relationButton.disabled = !state.selectedRelations.length;
      relationButton.addEventListener('click', () => {
        if (!hasExactRequiredRelations()) return wrong(relationSelectionFeedback());
        record({ evidence: 'relations', prompt: 'Which relations contain the information we need?', answer: 'funding_round and round_investment', feedback: '<div class="success-feedback">Correct. <code>funding_round</code> provides round context, and <code>round_investment</code> contains the recorded investor participations.</div>', next: 'connection', threadEntries: [{ kind: 'fact', id: 'relevant-relations', label: 'Relevant relations', value: ['funding_round', 'round_investment'] }] });
      });
    } else if (state.current === 'connection') renderConnection();
    else if (state.current === 'premises') renderPremises();
    else if (state.current === 'baselineRun') {
      interactionLifecycle.renderCurrent(stepShell('Measure the starting participation rows.', '<p class="step-copy">Run the prepared measurement in the SQL Workspace. The returned count will become the baseline for your prediction.</p><div class="measurement-note"><code>COUNT(*)</code> is reused here only as a measurement of <code>round_investment</code> rows.</div>'));
      if (state.localFeedback) renderWorkspaceAction(feedbackMarkup(), 'tool-diagnostic');
    } else if (state.current === 'prediction') renderPrediction();
    else if (state.current === 'repetition') renderRepeatedContext();
    else if (state.current === 'mechanism') renderMechanism();
    else if (state.current === 'sql') {
      interactionLifecycle.renderCurrent(stepShell('Implement the direct INNER JOIN.', '<p class="step-copy">Write the six-field participation query in the SQL Workspace. The Working Schema remains available as a reference.</p><p class="implementation-check"><strong>Prediction to check:</strong> 72 rows · one recorded participation per row.</p>'));
      renderWorkspaceAction(`<details class="optional-scaffold desired-output"><summary>Show desired output</summary><div class="optional-scaffold-body"><div class="desired-output-grid"><code>funding_round_id</code><code>round_type</code><code>announced_date</code><code>round_investment_id</code><code>investor_id</code><code>is_lead</code></div><p>Return these six fields in this order.</p></div></details><details class="optional-scaffold sql-structure"><summary>Show SQL structure</summary><div class="optional-scaffold-body"><pre>SELECT ...
FROM funding_round
INNER JOIN round_investment
  ON ...</pre><p>Reuse the direct relationship already established in the Working Schema.</p></div></details>${feedbackMarkup()}`, 'sql-authoring-assistance');
    } else if (state.current === 'finalGrain') renderFinalVerification();
    else if (state.current === 'complete') {
      const requiredEvidence = ['relations', 'connection', 'premises', 'baseline', 'prediction', 'repetition', 'mechanism', 'sql', 'finalGrain'];
      const complete = requiredEvidence.every((item) => state.evidence.has(item));
      interactionLifecycle.renderCurrent(stepShell('Stage complete', `<div class="completion-state"><div class="completion-icon">✓</div><p>${complete ? 'You preserved one participation per row across 72 results and verified that repeated round context comes from one round matching multiple participation records.' : 'The required learning evidence is incomplete.'}</p></div>`));
    }
  }

  function normalizedRows(values) { return values.map((row) => JSON.stringify(row)).sort(); }

  function validateParticipationResult(statement, resultSets) {
    if (!resultSets.length) return { valid: false, reason: 'no_result' };
    const joinMatches = statement.match(/\b(?:inner\s+)?join\b/gi) || [];
    const forbidden = /\b(?:distinct|group\s+by|having|left\s+(?:outer\s+)?join|right\s+(?:outer\s+)?join|full\s+(?:outer\s+)?join|cross\s+join|natural\s+join|union|intersect|except|exists)\b|\b(?:count|sum|avg|min|max)\s*\(/i;
    if (joinMatches.length !== 1 || !/\bon\b/i.test(statement) || forbidden.test(statement)) return { valid: false, reason: 'missing_relationship_implementation' };
    const result = resultSets.at(-1);
    const expectedColumns = ['funding_round_id', 'round_type', 'announced_date', 'round_investment_id', 'investor_id', 'is_lead'];
    const columns = result.columns.map((column) => column.toLowerCase());
    if (result.columns.length !== expectedColumns.length || !columns.every((column, index) => column === expectedColumns[index])) return { valid: false, reason: 'output_contract_mismatch' };
    if (result.values.length !== 72) return { valid: false, reason: 'row_count_mismatch', actualRowCount: result.values.length };
    const expected = getDatabase().exec(`SELECT
      funding_round.funding_round_id, funding_round.round_type, funding_round.announced_date,
      round_investment.round_investment_id, round_investment.investor_id, round_investment.is_lead
    FROM funding_round
    INNER JOIN round_investment ON funding_round.funding_round_id = round_investment.funding_round_id;`)[0]?.values ?? [];
    const actualRows = normalizedRows(result.values);
    const expectedRows = normalizedRows(expected);
    if (actualRows.length !== expectedRows.length || !actualRows.every((row, index) => row === expectedRows[index])) return { valid: false, reason: 'row_association_mismatch' };
    return { valid: true };
  }

  function participationDiagnosticFeedback(validation) {
    if (validation.reason === 'missing_relationship_implementation') return 'Use one direct INNER JOIN with ON for the established relationship. Do not reshape the participation result with DISTINCT, aggregation, outer joins, set operations, or another mechanism.';
    if (validation.reason === 'output_contract_mismatch') return 'The returned fields do not match the participation review output. Open Desired output and compare all six field names and their order with the result.';
    if (validation.reason === 'row_count_mismatch') return `The query returned ${validation.actualRowCount} rows, while your stored prediction is 72 participation-grain rows. Recheck whether the direct INNER JOIN preserves every recorded participation.`;
    if (validation.reason === 'row_association_mismatch') return 'The six output fields and 72-row count match, but the funding-round context is not paired with the correct participation rows. Recheck ON against round_investment.funding_round_id → funding_round.funding_round_id.';
    return 'The SQL ran, but it did not produce the direct participation result this review asks you to inspect.';
  }

  function handleSqlSuccess(statement, resultSets) {
    if (state.current === 'baselineRun') {
      const result = resultSets.at(-1);
      if (statement.trim() !== BASELINE_SQL || result?.values?.[0]?.[0] !== 72) return wrong('Run the prepared participation measurement. Reset the database and try again if it does not return 72.');
      record({ evidence: 'baseline', prompt: 'Measure the starting participation rows.', answer: '72 recorded participation rows', answerLabel: 'Measurement', feedback: '<div class="success-feedback">The measurement returned 72. That is the number of starting participation rows to preserve in the prediction.</div>', next: 'prediction', threadEntries: [
        { kind: 'fact', id: 'participation-baseline', label: 'Starting participation rows', value: 72 },
        { kind: 'evidence', id: 'participation-baseline-measurement', label: 'COUNT(*) result for round_investment', value: { rowCount: 72, sql: BASELINE_SQL } },
      ] });
      return;
    }
    if (state.current !== 'sql') return;
    const validation = validateParticipationResult(statement, resultSets);
    if (!validation.valid) return wrong(participationDiagnosticFeedback(validation));
    const result = resultSets.at(-1);
    state.acceptedResult = { columns: [...result.columns], values: result.values.map((row) => [...row]) };
    const assistanceNote = state.solutionUsed ? '<p class="evidence-bridge"><strong>Assistance used:</strong> Show solution.</p>' : '';
    record({ evidence: 'sql', prompt: 'Return every recorded participation with its funding-round context.', answer: '72-row query result accepted', answerLabel: 'Result', feedback: `<div class="success-feedback">The direct INNER JOIN returned the accepted 72-row result. Inspect the complete Results table and the derived 1003 slice.</div>${assistanceNote}`, next: 'finalGrain', threadEntries: [{ kind: 'evidence', id: 'accepted-participation-result', label: 'Accepted direct INNER JOIN result', value: { rowCount: result.values.length, columns: [...result.columns] } }] });
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
