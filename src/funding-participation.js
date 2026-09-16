import './funding-participation.css';

const BUSINESS_REQUEST = 'The investment team wants to review which investors took part in each funding round and see which of them were marked as lead.';

const INTERACTION_LABELS = {
  relations: 'Identify relevant relations',
  connection: 'Understand the relationship',
  output: 'Determine row meaning',
  cardinality: 'Understand the relationship',
  prediction: 'Predict row multiplication',
  repetition: 'Predict repeated context',
  application: 'Apply the prediction',
  sql: 'Implement the JOIN',
  finalGrain: 'Verify the result',
  complete: 'Stage complete',
};

const REQUIRED_RELATIONS = ['round_investment', 'funding_round'];

export function createFundingParticipation({ editor, getDatabase, getSchema, onSelectionChange, interactionLifecycle }) {
  const state = {
    current: 'relations',
    completed: [],
    evidence: new Set(),
    drafts: {},
    localFeedback: '',
    selectedRelations: [],
    selectedColumn: '',
    implementationPrepared: false,
    pendingAdvance: null,
    acceptedResult: null,
    solutionUsed: false,
  };

  const relationEl = document.getElementById('relation-preview');
  const workingStatusEl = document.getElementById('working-schema-status');
  const labEl = document.getElementById('lab-workspace');
  const learningEl = document.querySelector('.learning-panel');
  const solutionButton = document.getElementById('show-solution');

  solutionButton?.addEventListener('click', () => {
    if (document.title === 'SQL Lab · Funding participation' && state.current === 'sql' && learningEl.classList.contains('sql-implementation-active')) state.solutionUsed = true;
  }, { capture: true });

  function escapeHtml(value) {
    return String(value).replace(/[&<>'\"]/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '\"': '&quot;',
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

  function relationshipLevel() {
    if (state.evidence.has('cardinality')) return 2;
    if (state.evidence.has('connection')) return 1;
    return 0;
  }

  function renderColumn(relation, column) {
    const keyLevel = relationshipLevel();
    const isConnectingChoice = state.current === 'connection' && !state.pendingAdvance && relation.name === 'round_investment';
    const isSelected = isConnectingChoice && state.selectedColumn === column.column;
    const isParticipationForeignKey = keyLevel > 0 && relation.name === 'round_investment' && column.column === 'funding_round_id';
    const isRoundPrimaryKey = keyLevel > 0 && relation.name === 'funding_round' && column.column === 'funding_round_id';
    const isOutputField = ['sql', 'finalGrain', 'complete'].includes(state.current)
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
    if (state.current === 'relations' && !state.pendingAdvance) return 'Build it from the live schema';
    if (state.current === 'connection' && !state.pendingAdvance) return 'Select the connecting field in round_investment';
    return '';
  }

  function clearWorkingSchemaAction() {
    document.getElementById('working-schema-action')?.remove();
  }

  function renderRelations() {
    clearWorkingSchemaAction();
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
        <div class="data-card-title"><code>${escapeHtml(relation.name)}</code>${state.current === 'relations' && !state.pendingAdvance ? `<button type="button" class="remove-relation" data-remove-relation="${escapeHtml(relation.name)}">Remove</button>` : ''}</div>
        <ul class="working-columns">${relation.columns.map((column) => renderColumn(relation, column)).join('')}</ul>
      </article>
    `);

    if (showRelationship && cards.length >= 2) {
      cards.splice(1, 0, '<div class="schema-connector" aria-label="round_investment.funding_round_id matches funding_round.funding_round_id"><span class="connector-line"></span></div>');
    }
    relationEl.innerHTML = cards.join('');

    relationEl.querySelectorAll('[data-remove-relation]').forEach((button) => button.addEventListener('click', () => removeRelation(button.dataset.removeRelation)));
    relationEl.querySelectorAll('[data-working-column]').forEach((button) => button.addEventListener('click', () => {
      state.selectedColumn = button.dataset.workingColumn;
      state.localFeedback = '';
      render();
    }));

    if (state.current === 'connection') renderConnectionAction();
  }

  function renderConnectionAction() {
    const success = state.pendingAdvance?.item.id === 'connection';
    const element = document.createElement('section');
    element.id = 'working-schema-action';
    element.className = 'working-schema-action';
    element.innerHTML = success ? `
      <div><span class="eyebrow">Connection established</span><strong><code>round_investment.funding_round_id</code> identifies the funding round.</strong></div>
      ${state.pendingAdvance.item.feedback}
      <button id="continue-after-connection" class="primary connection-continue">Continue to Grain</button>
    ` : `
      <div>
        <span class="eyebrow">Current action</span>
        <strong>Which column in <code>round_investment</code> tells us which funding round a participation belongs to?</strong>
        <span>${state.selectedColumn ? `Selected: ${escapeHtml(state.selectedColumn)}` : 'Select a column in round_investment'}</span>
      </div>
      <button id="check-stage2-column" class="primary" ${state.selectedColumn ? '' : 'disabled'}>Check selected column</button>
      ${feedbackMarkup()}
    `;
    relationEl.append(element);
    if (success) {
      requestAnimationFrame(() => document.getElementById('continue-after-connection')?.scrollIntoView({ block: 'nearest' }));
      return;
    }
    element.querySelector('#check-stage2-column').addEventListener('click', () => {
      if (state.selectedColumn !== 'funding_round_id') return wrong('Look at one participation row and ask which column identifies the funding round that participation belongs to. The relationship stays hidden until you establish that connection.');
      record({
        evidence: 'connection',
        prompt: 'Which column in round_investment tells us which funding round a participation belongs to?',
        answer: 'round_investment.funding_round_id',
        feedback: '<div class="success-feedback">Correct. <code>funding_round_id</code> identifies the funding round for this participation.</div><div class="concept-callout"><strong>REUSED RELATIONSHIP PATTERN</strong><b>Primary Key / Foreign Key</b><span><code>round_investment.funding_round_id</code> is the Foreign Key (FK). It points to <code>funding_round.funding_round_id</code>, the Primary Key (PK), so the participation can be matched with its round context.</span></div>',
        next: 'output',
      });
    });
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
      summaryHtml: `<span class="complete-mark">✓</span><span>${escapeHtml(item.label)}</span><span class="completed-answer" title="${escapeHtml(item.answer)}">${escapeHtml(item.answer)}</span>`,
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

    if (item.id === 'connection') {
      interactionLifecycle.renderCurrent(stepShell('Connection established.', teacherVoice('The relationship is now visible in the Working Schema. Continue there when you are ready to return to ordinary Grain reasoning.')));
      continueFromPending('continue-after-connection');
      return;
    }

    if (item.id === 'sql' && next === 'finalGrain') {
      interactionLifecycle.renderCurrent(stepShell('Inspect the result.', teacherVoice('Your activity has moved from authoring to evidence. The query returned the accepted participation-grain result. Next, inspect the actual rows for funding_round_id 1003 and reconcile them with your earlier prediction.')));
      renderWorkspaceAction(`${item.feedback}<button id="continue-to-verification" class="primary">Continue to verification</button>`, 'result-followup');
      continueFromPending('continue-to-verification');
      return;
    }

    if (item.id === 'finalGrain' && next === 'complete') {
      interactionLifecycle.renderCurrent(stepShell('Verification complete.', teacherVoice('You used the actual participation rows to close the reasoning loop.')));
      renderWorkspaceAction(`<p class="confirmed-answer"><strong>${escapeHtml(item.answerLabel)}:</strong> ${escapeHtml(item.answer)}</p>${item.feedback}<button id="complete-after-verification" class="primary">Complete stage</button>`, 'verification-followup');
      continueFromPending('complete-after-verification');
      return;
    }

    const continueLabel = next === 'complete' ? 'Complete stage' : 'Continue';
    interactionLifecycle.renderCurrent(stepShell(item.prompt, `<p class="confirmed-answer"><strong>${escapeHtml(item.answerLabel)}:</strong> ${escapeHtml(item.answer)}</p>${item.feedback}<button id="continue-after-feedback" class="primary continue-after-feedback">${continueLabel}</button>`));
    continueFromPending('continue-after-feedback');
  }

  function choiceQuestion({ prompt, options, correct, feedback, wrongFeedback, next, evidence, intro = '' }) {
    const draft = state.drafts[state.current] || '';
    interactionLifecycle.renderCurrent(stepShell(prompt, `<form id="answer-form" class="answer-form"><fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${escapeHtml(value)}" ${draft === value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset><button class="primary" type="submit">Check answer</button></form>${feedbackMarkup()}`, intro));
    document.getElementById('answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts[state.current] = answer || '';
      if (answer !== correct) return wrong(typeof wrongFeedback === 'string' ? wrongFeedback : (wrongFeedback[answer] || wrongFeedback.default));
      record({ evidence, prompt, answer: stripMarkup(options.find(([value]) => value === answer)[1]), value: answer, options, feedback, next });
    });
  }

  function renderPrediction() {
    const options = [
      ['multiply', 'That funding round can occupy several result rows — one for each recorded participation.'],
      ['one-row', 'That funding round must still occupy exactly one result row.'],
      ['collapse', 'The participation records should collapse into one result row for the funding round.'],
      ['round-grain', 'The result should switch to one funding round per row.'],
    ];
    choiceQuestion({
      intro: `${teacherVoice('Hold together only what you have already established: one result row represents one participation, and one funding round can relate to multiple participation records.')}<div class="prediction-premises" aria-label="Established facts for the prediction"><div><span>Result Grain</span><strong>one participation per row</strong></div><div><span>Relationship</span><strong>one round can relate to multiple participations</strong></div></div>`,
      prompt: 'If the same funding round has several recorded participations, what must be possible in the result?',
      options,
      correct: 'multiply',
      evidence: 'prediction',
      next: 'repetition',
      feedback: '<div class="success-feedback">Correct. At participation Grain, one funding round can occupy several result rows when several participation records must remain represented.</div>',
      wrongFeedback: {
        default: 'Keep the target Grain fixed at one participation per result row. If several participation records belong to the same funding round, each still has to remain represented.',
        'one-row': 'If the result stayed at one row for this funding round, what would happen to the additional participation records that also need to remain represented?',
        collapse: 'Would collapsing the participation records into one row still preserve each recorded participation as its own result row?',
        'round-grain': 'Did the business request change what one result row should represent, or did it only ask you to add funding-round context to that row?',
      },
    });
  }

  function renderRepetitionPrediction() {
    choiceQuestion({
      intro: teacherVoice('You predicted several participation-level rows for one funding round. Now decide how the round-level context behaves across those distinct rows.'),
      prompt: 'What should happen to funding-round context such as round_type and announced_date across those participation rows?',
      options: [
        ['repeat', 'The round-level values can repeat, while participation identifiers distinguish the different participation records.'],
        ['duplicates', 'Repeated round-level values mean the rows are accidental duplicates and should collapse to one.'],
        ['first-only', 'Round-level values should appear only on the first participation row.'],
        ['different-rounds', 'Repeated round-level values mean the rows must represent different funding rounds.'],
      ],
      correct: 'repeat', evidence: 'repetition', next: 'concept',
      feedback: '<div class="success-feedback">Correct. Round-level context can repeat across distinct participation rows because each row represents a different recorded participation.</div>',
      wrongFeedback: {
        default: 'Keep the row meaning fixed: each row represents a different participation. Repeated round context does not by itself tell you that two participation rows are the same record.',
        duplicates: 'Repeated values do not by themselves establish duplicate rows. Which fields in the result identify whether these are the same participation or different participations?',
        'first-only': 'For a later participation row, does the business request still require the funding-round context to be present?',
        'different-rounds': 'Use `funding_round_id` as identity evidence. Could two different funding rounds legitimately have the same `funding_round_id`?',
      },
    });
  }

  function renderConceptMoment() {
    interactionLifecycle.renderCurrent(stepShell('Name the behavior you just predicted.', `<div class="concept-callout"><strong>CONCEPT MOMENT</strong><b>JOIN row multiplication</b><span>When one row on the one-side matches several rows on the many-side, a JOIN can produce several output rows for that one-side entity. At participation Grain, the round-level values can repeat because each output row represents a different participation.</span></div><button id="continue-to-application" class="primary">Apply the idea</button>`, teacherVoice('The behavior now has a name. The name comes after the prediction; it does not replace the Grain-and-Cardinality reasoning that produced it.')));
    document.getElementById('continue-to-application').addEventListener('click', () => setCurrent('application'));
  }

  function renderApplication() {
    choiceQuestion({
      intro: teacherVoice('Now apply the prediction to one concrete case. The number is supporting practice; the structural prediction came first.'),
      prompt: 'If one funding round has three recorded participations, how many participation-grain result rows are needed to keep all three participations represented?',
      options: [['one', '1 row'], ['three', '3 rows'], ['nine', '9 rows'], ['unknown', 'It is impossible to tell even when three participation records are given.']],
      correct: 'three', evidence: 'application', next: 'sql',
      feedback: '<div class="success-feedback">Correct. Three recorded participations require three participation-grain rows, even though the round-level context can repeat across them.</div>',
      wrongFeedback: 'Hold the Grain fixed at one participation per result row. All three recorded participations must remain individually represented.',
    });
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
    const columns = state.acceptedResult.columns;
    return `<div class="stage2-evidence-slice"><div class="evidence-kicker">Evidence from your accepted result</div><strong>funding_round_id = 1003</strong><div class="stage2-slice-scroll"><table><thead><tr>${columns.map((column) => `<th>${escapeHtml(column)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((value) => `<td>${escapeHtml(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
  }

  function renderFinalVerification() {
    const rows = participationSliceRows();
    const options = [
      ['yes', 'They are distinct participation-grain rows for the same funding round; the round context repeats because each row represents a different recorded participation.'],
      ['duplicates', 'They are accidental duplicate rows and should collapse to one funding-round row.'],
      ['different-rounds', 'They represent different funding rounds that happen to share the same funding_round_id.'],
      ['one-participation', 'They show one participation record repeated several times.'],
    ];
    const draft = state.drafts.finalGrain || '';
    interactionLifecycle.renderCurrent(stepShell('Verify the prediction from the actual result.', teacherVoice('Use the local slice from the query you ran. Compare the repeated round-level values with the participation identifiers before deciding what the rows represent.')));
    const action = renderWorkspaceAction(`${renderParticipationSlice()}<h3>What do these ${rows.length} rows show about funding round 1003?</h3><form id="verification-answer-form" class="answer-form"><fieldset class="choices">${options.map(([value, label]) => `<label><input type="radio" name="answer" value="${value}" ${draft === value ? 'checked' : ''}> <span>${label}</span></label>`).join('')}</fieldset><button class="primary" type="submit">Check answer</button></form>${feedbackMarkup()}`, 'verification-question');
    action.querySelector('#verification-answer-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answer = new FormData(event.currentTarget).get('answer');
      state.drafts.finalGrain = answer || '';
      if (answer !== 'yes') return wrong({
        duplicates: 'Compare the participation identifiers in the visible 1003 rows. Are the rows identical at the result Grain?',
        'different-rounds': 'Check the `funding_round_id` values in these rows. What does that identifier tell you about whether they belong to one round or several?',
        'one-participation': 'Compare `round_investment_id` and `investor_id` across the rows. What evidence would show whether this is one participation repeated or several distinct participations?',
      }[answer] || 'Use the visible 1003 rows as evidence. Compare the repeated round-level fields with round_investment_id and investor_id to decide whether these are duplicate rows or distinct participation records.');
      record({ evidence: 'finalGrain', prompt: `What do these ${rows.length} rows show about funding round 1003?`, answer: stripMarkup(options.find(([value]) => value === answer)[1]), value: answer, options, feedback: '<div class="success-feedback">Correct. Your prediction matches the result: one funding round can contribute several participation-grain rows, and its round-level context repeats because each row represents a different participation.</div>', next: 'complete' });
    });
  }

  function hasExactRequiredRelations() {
    return state.selectedRelations.length === REQUIRED_RELATIONS.length && REQUIRED_RELATIONS.every((relation) => state.selectedRelations.includes(relation));
  }

  function relationSelectionFeedback() {
    const hasParticipations = state.selectedRelations.includes('round_investment');
    const hasRounds = state.selectedRelations.includes('funding_round');

    if (hasParticipations && hasRounds) {
      return 'The funding-round context and recorded investor participations are already covered. Check whether every selected relation is needed for this review.';
    }
    if (hasParticipations) {
      return 'You already have the recorded investor participations, including lead status. Reinspect the Live Schema for the relation that provides the funding-round context requested.';
    }
    if (hasRounds) {
      return 'You already have the funding-round context. Reinspect the Live Schema for the relation that records which investors participated and whether they were leads.';
    }
    return 'Break the review into the two information roles it needs: funding-round context and recorded investor participations. Reinspect the Live Schema and revise the selection.';
  }

  function updateWorkspaceVisibility() {
    const resultsEvidence = (state.current === 'sql' && state.pendingAdvance?.next === 'finalGrain') || state.current === 'finalGrain';
    const implementationWorkspace = state.current === 'sql' || resultsEvidence;
    const sqlImplementation = state.current === 'sql' && !resultsEvidence;

    if (state.current === 'sql' && !state.implementationPrepared) {
      editor.setValue('', -1);
      document.getElementById('clear-results').click();
      state.implementationPrepared = true;
    }

    labEl.hidden = !implementationWorkspace;
    learningEl.classList.toggle('sql-active', implementationWorkspace);
    learningEl.classList.remove('baseline-workspace-active', 'baseline-evidence-active', 'prediction-evidence-active', 'join-teaching-active');
    learningEl.classList.toggle('sql-implementation-active', sqlImplementation);
    learningEl.classList.toggle('results-evidence-active', resultsEvidence);
    learningEl.dataset.stage2State = resultsEvidence ? 'results' : state.current;
    document.querySelector('.editor-header h2').textContent = 'JOIN implementation';
    document.querySelectorAll('.lab-action').forEach((element) => { element.hidden = !implementationWorkspace || resultsEvidence; });
    const runButton = document.getElementById('run-query');
    runButton.disabled = runButton.hidden;
  }

  function render() {
    document.getElementById('business-request-title').textContent = BUSINESS_REQUEST;
    clearWorkspaceAction();
    renderRelations();
    renderCompleted();
    updateWorkspaceVisibility();

    if (state.pendingAdvance) { renderAcknowledgement(); return; }

    if (state.current === 'relations') {
      interactionLifecycle.renderCurrent(stepShell('Which relations contain the information we need?', '<p class="step-copy">In the Live Schema on the left, find the relevant relations and add them to the Working Schema beside this task.</p><button id="continue-relations" class="primary" disabled>Check selection</button>' + feedbackMarkup()));
      const relationButton = document.getElementById('continue-relations');
      relationButton.disabled = !state.selectedRelations.length;
      relationButton.addEventListener('click', () => {
        if (!hasExactRequiredRelations()) return wrong(relationSelectionFeedback());
        record({ evidence: 'relations', prompt: 'Which relations contain the information we need?', answer: 'funding_round and round_investment', feedback: '<div class="success-feedback">Correct. <code>funding_round</code> gives us the round context, and <code>round_investment</code> contains the recorded investor participations.</div>', next: 'connection' });
      });
    } else if (state.current === 'connection') {
      interactionLifecycle.renderCurrent(stepShell('Trace the participation-to-round connection in the Working Schema.', '<p class="step-copy">Select the connecting field directly in the Working Schema.</p>', teacherVoice('You found the two relations. Now trace from one participation record to the funding round it belongs to; the funding_round card remains available as a reference.')));
    } else if (state.current === 'output') {
      choiceQuestion({ intro: teacherVoice('You found how a participation points to its funding round. Now return to the review request and establish what one requested output row should represent.'), prompt: 'If the result should show who took part in each funding round, what should one result row represent?', options: [['participation', 'one recorded round-investor participation'], ['round', 'one funding round'], ['investor', 'one investor across all rounds'], ['company', 'one company']], correct: 'participation', evidence: 'output', next: 'cardinality', feedback: '<div class="success-feedback">Correct. Each row is about one recorded participation. Funding-round information can be carried alongside it without changing that row meaning.</div><div class="concept-callout"><strong>REUSED CONCEPT</strong><b>Grain</b><span>The requested result Grain is one recorded round-investor participation per row.</span></div>', wrongFeedback: 'The review needs each recorded participation to remain individually visible. What must one result row represent to preserve that?' });
    } else if (state.current === 'cardinality') {
      choiceQuestion({ intro: teacherVoice('You found how a participation connects to a funding round. Now consider what that relationship allows in each direction.'), prompt: 'Which statement best describes what can happen across the two relations?', options: [['correct', 'One funding round can have many participation records; each participation belongs to one funding round.'], ['participation-many', 'One participation can belong to many funding rounds.'], ['round-one', 'Each funding round can have only one participation record.'], ['many', 'A participation can belong to many rounds, and a round can belong to many participations.']], correct: 'correct', evidence: 'cardinality', next: 'prediction', feedback: '<div class="success-feedback">Correct. One funding round can have multiple participation records, while each participation belongs to one funding round.</div><div class="concept-callout"><strong>REUSED CONCEPT</strong><b>Cardinality</b><span>This is a one-to-many relationship: one <code>funding_round</code> → many <code>round_investment</code> rows.</span></div>', wrongFeedback: 'Use the relationship you already established: each participation stores one funding_round_id, while the same funding_round_id can appear in multiple participation rows.' });
    } else if (state.current === 'prediction') renderPrediction();
    else if (state.current === 'repetition') renderRepetitionPrediction();
    else if (state.current === 'concept') renderConceptMoment();
    else if (state.current === 'application') renderApplication();
    else if (state.current === 'sql') {
      interactionLifecycle.renderCurrent(stepShell('Implement the JOIN you already know.', '<p class="step-copy">Move to the SQL Workspace and write the participation query from the business request and the relationship you established.</p><p class="implementation-check"><strong>Predictions to preserve:</strong> one funding round can occupy several participation rows, and round-level context can repeat across those distinct rows.</p>', teacherVoice('The relational reasoning is already established. SQL now implements that plan; it does not replace the earlier Grain-and-Cardinality prediction.')));
      renderWorkspaceAction(`<details class="optional-scaffold desired-output"><summary>Show desired output</summary><div class="optional-scaffold-body"><div class="desired-output-grid"><code>funding_round_id</code><code>round_type</code><code>announced_date</code><code>round_investment_id</code><code>investor_id</code><code>is_lead</code></div><p>Return these six fields in this order.</p></div></details><details class="optional-scaffold sql-structure"><summary>Show SQL structure</summary><div class="optional-scaffold-body"><pre>SELECT ...
FROM funding_round
JOIN round_investment
  ON ...</pre><p>Reuse <code>JOIN</code> and express the established relationship in <code>ON</code>.</p></div></details>${feedbackMarkup()}`, 'sql-authoring-assistance');
    } else if (state.current === 'finalGrain') renderFinalVerification();
    else if (state.current === 'complete') {
      const requiredEvidence = ['relations', 'connection', 'output', 'cardinality', 'prediction', 'repetition', 'application', 'sql', 'finalGrain'];
      const complete = requiredEvidence.every((item) => state.evidence.has(item));
      interactionLifecycle.renderCurrent(stepShell('Stage complete', `<div class="completion-state"><div class="completion-icon">✓</div><p>${complete ? 'You predicted JOIN row multiplication from participation Grain and relationship Cardinality, then reconciled that prediction with the actual participation rows for funding round 1003.' : 'The required learning evidence is incomplete.'}</p></div>`));
    }
  }

  function normalizedRows(values) { return values.map((row) => JSON.stringify(row)).sort(); }

  function validateParticipationResult(statement, resultSets) {
    if (!resultSets.length) return { valid: false, reason: 'no_result' };
    if (!/\b(?:inner\s+)?join\b/i.test(statement) || !/\bon\b/i.test(statement)
      || /\b(?:distinct|group\s+by|having|left\s+join|union)\b/i.test(statement)) {
      return { valid: false, reason: 'missing_relationship_implementation' };
    }
    const result = resultSets.at(-1);
    const expectedColumns = ['funding_round_id', 'round_type', 'announced_date', 'round_investment_id', 'investor_id', 'is_lead'];
    const columns = result.columns.map((column) => column.toLowerCase());
    if (result.columns.length !== expectedColumns.length
      || !columns.every((column, index) => column === expectedColumns[index])) {
      return { valid: false, reason: 'output_contract_mismatch' };
    }
    if (result.values.length !== 72) {
      return { valid: false, reason: 'row_count_mismatch', actualRowCount: result.values.length };
    }
    const expected = getDatabase().exec(`SELECT
      funding_round.funding_round_id,
      funding_round.round_type,
      funding_round.announced_date,
      round_investment.round_investment_id,
      round_investment.investor_id,
      round_investment.is_lead
    FROM funding_round
    INNER JOIN round_investment
      ON funding_round.funding_round_id = round_investment.funding_round_id;`)[0]?.values ?? [];
    const actualRows = normalizedRows(result.values);
    const expectedRows = normalizedRows(expected);
    const rowsMatch = actualRows.length === expectedRows.length
      && actualRows.every((row, index) => row === expectedRows[index]);
    if (!rowsMatch) return { valid: false, reason: 'row_association_mismatch' };
    return { valid: true };
  }

  function participationDiagnosticFeedback(validation) {
    if (validation.reason === 'missing_relationship_implementation') {
      return 'This task implements the established funding-round-to-participation relationship with one JOIN and ON. Recheck that the query uses that match without replacing participation rows with grouping, deduplication, or a different join behavior.';
    }
    if (validation.reason === 'output_contract_mismatch') {
      return 'The returned fields do not match the participation review output. Open Desired output and compare all six field names and their order with the result.';
    }
    if (validation.reason === 'row_count_mismatch') {
      return `The query returned ${validation.actualRowCount} rows, but the established participation-grain result contains 72 rows. Recheck whether the JOIN preserves every recorded round-investor participation.`;
    }
    if (validation.reason === 'row_association_mismatch') {
      return 'The six output fields and 72-row count match, but the funding-round context is not paired with the correct participation rows. Recheck ON against the funding_round.funding_round_id → round_investment.funding_round_id relationship.';
    }
    return 'The SQL ran, but it did not produce the participation result this review asks you to inspect. Recheck the requested output and the established JOIN relationship.';
  }

  function handleSqlSuccess(statement, resultSets) {
    if (state.current !== 'sql' || state.pendingAdvance) return;
    const validation = validateParticipationResult(statement, resultSets);
    if (!validation.valid) return wrong(participationDiagnosticFeedback(validation));
    const result = resultSets.at(-1);
    state.acceptedResult = { columns: [...result.columns], values: result.values.map((row) => [...row]) };
    const assistanceNote = state.solutionUsed ? '<p class="evidence-bridge"><strong>Assistance used:</strong> Show solution.</p>' : '';
    record({ evidence: 'sql', prompt: 'Return the participation review with funding-round context.', answer: 'Query ran successfully', answerLabel: 'Result', feedback: `<div class="success-feedback">The query ran successfully. Inspect the actual participation rows before deciding whether the earlier prediction held.</div>${assistanceNote}`, next: 'finalGrain' });
  }

  render();
  return {
    handleSqlSuccess,
    current: () => state.current,
    addRelation,
    isRelationSelected: (name) => state.selectedRelations.includes(name),
    relationshipLevel,
    canAddRelations: () => state.current === 'relations' && !state.pendingAdvance,
    refresh: render,
  };
}
