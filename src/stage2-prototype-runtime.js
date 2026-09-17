import './stage2-prototype-runtime.css';

const SOLUTION = `SELECT
  round_investment.funding_round_id,
  funding_round.round_type,
  funding_round.announced_date,
  round_investment.round_investment_id,
  round_investment.investor_id,
  round_investment.is_lead
FROM round_investment
INNER JOIN funding_round
  ON round_investment.funding_round_id = funding_round.funding_round_id;`;
const REQUIRED = ['funding_round_id', 'round_type', 'announced_date', 'round_investment_id', 'investor_id', 'is_lead'];

const template = `
<div class="stage2-routecraft">
  <header class="masthead"><div><div class="mh-course">RouteCraft · SQL Lab</div><div class="mh-title">Funding participation — who invested in which round</div></div><div class="mh-right"><span class="mh-stage">Stage 2 · participation grain</span><button class="ghost" id="s2-restart">Restart</button></div></header>
  <main class="app"><div class="zones">
    <section class="conversation" id="s2-conversation" aria-label="Conversation"><aside class="spine" aria-label="Reasoning thread"><div class="spine-label">Thread</div><ol class="spine-list" id="s2-spine"></ol></aside><div class="stream" id="s2-stream" aria-live="polite"></div></section>
    <section class="workbench" aria-label="Workbench">
      <div class="wb-block" id="s2-entry"><div class="wb-head"><span class="eyebrow">Schema catalog</span><h3>Bring in the relations this request needs</h3></div><div class="catalog" id="s2-catalog">
        <button class="catalog-card" data-rel="funding_round"><span><span class="catalog-name">funding_round</span><span class="catalog-desc">round type and announced date</span></span><span class="catalog-status">add</span></button>
        <button class="catalog-card" data-rel="round_investment"><span><span class="catalog-name">round_investment</span><span class="catalog-desc">recorded investor participations</span></span><span class="catalog-status">add</span></button>
        <button class="catalog-card" data-rel="company"><span><span class="catalog-name">company</span><span class="catalog-desc">company names and sectors</span></span><span class="catalog-status">add</span></button>
        <button class="catalog-card" data-rel="news_article"><span><span class="catalog-name">news_article</span><span class="catalog-desc">articles and their titles</span></span><span class="catalog-status">add</span></button>
      </div><div class="catalog-feedback" id="s2-catalog-feedback" hidden></div><div class="wb-head bench-head"><span class="eyebrow">Working schema</span><h3>Relations on the bench</h3></div><div class="hint" id="s2-bench-hint">Pick the two relations that hold the participation and the round it belongs to.</div></div>
      <div class="wb-block" id="s2-schema" hidden><div class="wb-head"><span class="eyebrow">Working schema</span><h3>Two relations, one link</h3></div><div class="wws" id="s2-wws"><article class="card" data-rel="funding_round"><div class="card-head">funding_round</div><ul class="cols"><li><button class="col" data-rel="funding_round" data-col="funding_round_id"><code>funding_round_id</code><span class="badge" hidden>PK</span></button></li><li><button class="col" data-rel="funding_round" data-col="round_type"><code>round_type</code></button></li><li><button class="col" data-rel="funding_round" data-col="announced_date"><code>announced_date</code></button></li></ul></article><div class="link" id="s2-link"><span class="line"></span><span class="cd m">many</span><span class="cd one">one</span></div><article class="card" data-rel="round_investment"><div class="card-head">round_investment</div><ul class="cols"><li><button class="col" data-rel="round_investment" data-col="round_investment_id"><code>round_investment_id</code><span class="badge" hidden>PK</span></button></li><li><button class="col" data-rel="round_investment" data-col="funding_round_id"><code>funding_round_id</code><span class="badge badge-fk" hidden>FK</span></button></li><li><button class="col" data-rel="round_investment" data-col="investor_id"><code>investor_id</code></button></li><li><button class="col" data-rel="round_investment" data-col="is_lead"><code>is_lead</code></button></li></ul></article></div></div>
      <div class="wb-block" id="s2-measure" hidden><div class="wb-head"><span class="eyebrow">Baseline — reused</span><h3>Measure the participation side</h3></div><div class="editor"><div class="editor-gutter">1</div><pre class="editor-code">SELECT COUNT(*) FROM round_investment;</pre></div><div class="editor-actions"><button class="primary" id="s2-run-measure">Run measurement</button><span class="run-note" id="s2-run-note">Prepared again — you still don’t write this one.</span></div><div id="s2-measure-out"></div></div>
      <div class="wb-block" id="s2-evidence" hidden><div class="wb-head"><span class="eyebrow">Relationship evidence</span><h3>One round and its four participation records</h3></div><div id="s2-source-evidence"></div></div>
      <div class="wb-block" id="s2-multi" hidden><div class="wb-head"><span class="eyebrow">Teaching moment</span><h3>How one round becomes four result rows</h3></div><div class="multi-teach" id="s2-multi-panel"></div></div>
      <div class="wb-block" id="s2-sql" hidden><div class="wb-head"><span class="eyebrow">SQL authoring</span><h3>Author the query yourself</h3></div><div class="editor"><div class="editor-gutter">1<br>2<br>3<br>4<br>5<br>6</div><textarea class="sql-editor" id="s2-editor" spellcheck="false" placeholder="Write a SELECT that joins round_investment to funding_round…"></textarea></div><div class="editor-actions" id="s2-actions"><button class="primary" id="s2-execute">Execute SQL</button><button class="secondary" id="s2-assist-button">Show a nudge</button><button class="secondary" id="s2-solution-button">Show solution</button><span class="run-note">Runs against the course database and checks the returned meaning.</span></div><div id="s2-assist" hidden></div><div id="s2-diagnostic"></div><div id="s2-result"></div><div id="s2-verify-evidence" hidden><div class="wb-head verify-head"><span class="eyebrow">Verification evidence</span><h3>Slice from the accepted result</h3></div><div class="slice" id="s2-verify-slice"></div></div></div>
      <div class="wb-block" id="s2-required" hidden><div class="wb-head"><span class="eyebrow">Required output</span><h3>Six columns</h3></div><ul class="required">${REQUIRED.map((field) => `<li>${field}</li>`).join('')}</ul></div>
      <div class="wb-block" id="s2-completion" hidden><div class="completion"><h3>Stage 2 complete</h3><p>You preserved one participation per row across 72 results and verified that repeated round context comes from one round matching multiple participation records.</p><p class="completion-distinction"><strong>Multiple matches:</strong> one round matched four participation rows, so JOIN carried the same round context into four distinct result rows without changing the Grain.</p></div></div>
    </section>
  </div></main>
</div>`;

export function createStage2Prototype({ root, getDatabase }) {
  root.innerHTML = template;
  const $ = (selector) => root.querySelector(selector); const $$ = (selector) => [...root.querySelectorAll(selector)];
  const make = (markup) => { const t = document.createElement('template'); t.innerHTML = markup.trim(); return t.content.firstElementChild; };
  const selected = new Set(); let state = 'request'; let acceptedResult = null;
  const conversation = $('#s2-conversation'); const stream = $('#s2-stream'); const spineList = $('#s2-spine');
  const scroll = () => { conversation.scrollTop = conversation.scrollHeight; };
  const add = (element) => { stream.append(element); scroll(); return element; };
  const teacher = (copy) => add(make(`<div class="turn teacher"><span class="speaker">Teacher</span><p class="say">${copy}</p></div>`));
  const learner = (copy) => add(make(`<div class="learner"><span class="learner-label">You</span><span class="learner-text">${copy}</span></div>`));
  const concept = (term, copy) => add(make(`<div class="concept"><div class="concept-eyebrow">Concept</div><div class="concept-term">${term}</div><div class="concept-body">${copy}</div></div>`));
  const spine = (copy) => spineList.append(make(`<li>${copy}</li>`));

  function query(sql) { const result = getDatabase().exec(sql)[0]; return { columns: result?.columns || [], values: result?.values || [] }; }
  function source1003() {
    return {
      round: query('SELECT funding_round_id, round_type, announced_date FROM funding_round WHERE funding_round_id = 1003;'),
      participations: query('SELECT round_investment_id, funding_round_id, investor_id, is_lead FROM round_investment WHERE funding_round_id = 1003 ORDER BY round_investment_id;'),
      joined: query('SELECT round_investment.funding_round_id, funding_round.round_type, funding_round.announced_date, round_investment.round_investment_id, round_investment.investor_id, round_investment.is_lead FROM round_investment INNER JOIN funding_round ON round_investment.funding_round_id = funding_round.funding_round_id WHERE round_investment.funding_round_id = 1003 ORDER BY round_investment.round_investment_id;'),
    };
  }
  function dataTable(result, highlight = false) {
    return `<div class="results-scroll"><table><thead><tr>${result.columns.map((c) => `<th>${escapeText(c)}</th>`).join('')}</tr></thead><tbody>${result.values.map((row) => `<tr${highlight ? ' class="rep"' : ''}>${row.map((value) => `<td>${escapeText(value ?? 'NULL')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function ask({ prompt, options, correct, wrong, onCorrect }) {
    const wrap = make(`<div class="ask"><p class="ask-q">${prompt}</p><form class="ask-form">${options.map(([value, label]) => `<label class="opt"><input type="radio" name="answer" value="${value}"><span class="opt-mark"></span><span>${label}</span></label>`).join('')}<div class="ask-actions"><button class="primary" type="submit" disabled>Check</button></div></form><div class="ask-error" hidden></div></div>`);
    const form = wrap.querySelector('form'); const button = wrap.querySelector('button'); const error = wrap.querySelector('.ask-error');
    form.addEventListener('change', () => { button.disabled = false; error.hidden = true; });
    form.addEventListener('submit', (event) => { event.preventDefault(); const value = new FormData(form).get('answer'); if (value !== correct) { error.hidden = false; error.innerHTML = wrong[value] || 'Try again.'; scroll(); return; } const label = options.find(([key]) => key === value)[1]; wrap.replaceWith(make(`<div class="learner"><span class="learner-label">You</span><span class="learner-text">${label}</span></div>`)); scroll(); onCorrect(); });
    add(wrap);
  }
  function premises() {
    const wrap = make(`<div class="premises"><div class="premises-head">Reused premises · one confirmation</div><div class="premise"><p class="premise-q">From that link, what does the relationship allow?</p><div class="premise-opts"><label class="opt"><input type="radio" name="relationship" value="many"><span class="opt-mark"></span><span>Many participations can point at the same round; each participation names one round.</span></label><label class="opt"><input type="radio" name="relationship" value="one"><span class="opt-mark"></span><span>Each round can have only one participation.</span></label></div></div><div class="premise"><p class="premise-q">And what is one requested result row?</p><div class="premise-opts"><label class="opt"><input type="radio" name="grain" value="participation"><span class="opt-mark"></span><span>One recorded round–investor participation.</span></label><label class="opt"><input type="radio" name="grain" value="round"><span class="opt-mark"></span><span>One funding round.</span></label></div></div><div class="ask-actions"><button class="primary" type="button" disabled>Check</button></div><div class="ask-error" hidden></div></div>`);
    const button = wrap.querySelector('button'); const error = wrap.querySelector('.ask-error');
    wrap.addEventListener('change', () => { button.disabled = !(wrap.querySelector('input[name="relationship"]:checked') && wrap.querySelector('input[name="grain"]:checked')); error.hidden = true; });
    button.addEventListener('click', () => { const relationship = wrap.querySelector('input[name="relationship"]:checked')?.value; const grain = wrap.querySelector('input[name="grain"]:checked')?.value; if (relationship !== 'many') { error.hidden = false; error.textContent = 'A round id can appear on many participation rows.'; return; } if (grain !== 'participation') { error.hidden = false; error.textContent = 'The request is a list of recorded participations; round context rides alongside each one.'; return; } wrap.replaceWith(make('<div class="learner"><span class="learner-label">You</span><span class="learner-text">many participations → one round · one participation per row</span></div>')); afterPremises(); });
    add(wrap);
  }

  function reset() {
    state = 'request'; acceptedResult = null; selected.clear(); stream.innerHTML = ''; spineList.innerHTML = '';
    ['#s2-schema','#s2-measure','#s2-evidence','#s2-multi','#s2-sql','#s2-required','#s2-completion','#s2-verify-evidence'].forEach((id) => { $(id).hidden = true; }); $('#s2-entry').hidden = false;
    $$('.catalog-card').forEach((card) => { card.classList.remove('selected'); card.querySelector('.catalog-status').textContent = 'add'; }); $('#s2-catalog-feedback').hidden = true;
    $$('.col').forEach((column) => column.classList.remove('picked')); $$('.badge').forEach((badge) => { badge.hidden = true; }); $('#s2-link').className = 'link'; $('#s2-wws').className = 'wws';
    $('#s2-run-measure').disabled = false; $('#s2-run-note').textContent = 'Prepared again — you still don’t write this one.'; $('#s2-measure-out').innerHTML = ''; $('#s2-source-evidence').innerHTML = ''; $('#s2-multi-panel').innerHTML = '';
    $('#s2-editor').value = ''; $('#s2-editor').disabled = false; $('#s2-execute').disabled = false; $('#s2-actions').hidden = false; $('#s2-assist').hidden = true; $('#s2-assist').innerHTML = ''; $('#s2-diagnostic').innerHTML = ''; $('#s2-result').innerHTML = ''; $('#s2-verify-slice').innerHTML = '';
    teacher('Same course, same bench. This one is harder in one specific way, and I’ll leave you to find it. The request: <strong>every recorded participation of an investor in a funding round</strong>, with the round type and announced date alongside it. Which relations do we bring in?');
    spine('Request: every participation + its funding round'); state = 'relations'; conversation.scrollTop = 0;
  }
  function beginConnection() {
    if (state !== 'relations') return; state = 'connection'; $('#s2-entry').hidden = true; $('#s2-schema').hidden = false;
    spine('Relations: <code>funding_round</code> + <code>round_investment</code>'); teacher('Right. Which column in the participation relation carries the identity of the round it belongs to?');
  }
  function onColumn(button) {
    if (state !== 'connection') return; let feedback = $('#s2-connection-feedback'); if (!feedback) { feedback = make('<div class="ask-error" id="s2-connection-feedback" hidden></div>'); add(feedback); }
    if (button.dataset.rel !== 'round_investment' || button.dataset.col !== 'funding_round_id') { feedback.hidden = false; feedback.textContent = button.dataset.rel !== 'round_investment' ? 'The participation row has to point to its round.' : 'Which column lets you look up the round this participation belongs to?'; return; }
    button.classList.add('picked'); feedback.hidden = true; $('#s2-link').classList.add('on'); $$('.badge').forEach((badge) => { badge.hidden = false; }); learner('<code>round_investment.funding_round_id</code>'); spine('Link: <code>round_investment.funding_round_id → funding_round.funding_round_id</code>'); state = 'premises'; teacher('That’s the link. You already know keys and cardinality, so no new lesson — just confirm the premises you are carrying into this stage.'); premises();
  }
  function afterPremises() {
    $('#s2-link').classList.add('cardinality'); spine('Relationship: many participations → one round'); spine('Grain: one recorded participation per row'); state = 'baseline'; $('#s2-wws').classList.add('dim'); $('#s2-measure').hidden = false; teacher('Good. Measure the participation side and keep the number.'); $('#s2-run-measure').focus();
  }
  function runBaseline() {
    if (state !== 'baseline') return;
    try { const count = query('SELECT COUNT(*) FROM round_investment;').values[0][0]; if (count !== 72) throw new Error(`Expected 72, received ${count}.`); state = 'prediction'; $('#s2-run-measure').disabled = true; $('#s2-run-note').textContent = '72 rows returned.'; $('#s2-measure-out').innerHTML = '<div class="results"><div class="results-top"><span>Participation records</span><span class="results-count">72 rows</span></div><table><thead><tr><th>COUNT(*)</th></tr></thead><tbody><tr><td><b>72</b></td></tr></tbody></table></div>'; teacher('72 recorded participations — carry that number forward. When we bring each participation together with its one round, what should the result row count be?'); ask({prompt:'What should the result row count be?',options:[['72','72 rows — one for each recorded participation.'],['fewer','Fewer than 72 rows, because several participations share the same round.'],['more','More than 72 rows, because each round creates extra participation records.']],correct:'72',wrong:{fewer:'Sharing a round does not merge participation records.',more:'Joining round context does not invent new participation records.'},onCorrect:afterPrediction}); } catch (error) { $('#s2-measure-out').innerHTML = `<div class="diag">${escapeText(error.message)}</div>`; }
  }
  function afterPrediction() {
    spine('Prediction: <b>72</b> rows, one per participation'); state = 'repeated'; const evidence = source1003(); if (evidence.round.values.length !== 1 || evidence.participations.values.length !== 4) throw new Error('Seed reconciliation failed for funding_round_id 1003.');
    $('#s2-evidence').hidden = false; $('#s2-source-evidence').innerHTML = `<div class="slice"><div class="slice-head"><span>funding_round · 1003</span><span>1 row</span></div>${dataTable(evidence.round)}</div><div class="slice"><div class="slice-head"><span>round_investment · funding_round_id 1003</span><span>4 rows</span></div>${dataTable(evidence.participations, true)}<div class="results-note">Four distinct participation records held against this one round.</div></div>`;
    teacher('Inspect the source rows on the bench. The round type and date will be carried alongside all four participations. Does that make the resulting rows duplicates?'); ask({prompt:'When the repeated round values sit beside each participation, what are those rows?',options:[['distinct','Four distinct participations in the same round — repeated round values are context, and Grain stays participation.'],['duplicates','Duplicates, because the round-level values repeat.'],['collapse','Rows that should be collapsed into one round row.']],correct:'distinct',wrong:{duplicates:'Compare the participation identifiers, not only the repeated round fields.',collapse:'Collapsing would change the requested Grain from participation to round.'},onCorrect:showMechanism});
  }
  function showMechanism() {
    spine('Row behavior: repeated round context, Grain unchanged'); state = 'mechanism'; const evidence = source1003(); $('#s2-multi').hidden = false;
    const round = evidence.round.values[0]; const resultRows = evidence.joined.values;
    $('#s2-multi-panel').innerHTML = `<h4>One round row matched four participation rows</h4><p>The single <code>funding_round</code> row contributes its context once for each matching participation.</p><div class="multi-step"><div class="multi-pair"><div class="multi-card"><div class="multi-card-head">funding_round · one row</div><div class="multi-card-body">${round.join(' · ')}</div></div><div class="multi-arrow">+</div><div class="multi-card"><div class="multi-card-head">round_investment · four rows</div><div class="multi-card-body">${evidence.participations.values.map((row) => `${row[0]} · investor ${row[2]}`).join('<br>')}</div></div></div>${resultRows.map((row, index) => `<div class="multi-pair joined"><div class="multi-card"><div class="multi-card-head">funding_round</div><div class="multi-card-body">${round.join(' · ')}</div></div><div class="multi-arrow">→</div><div class="multi-card"><div class="multi-card-head">round_investment</div><div class="multi-card-body">${row[3]} · investor ${row[4]}</div></div><div class="multi-arrow">→</div><div class="multi-card"><div class="multi-card-head">result row ${index + 1}</div><div class="multi-card-body">${row.join(' · ')}</div></div></div>`).join('')}</div><div class="multi-result"><div class="multi-result-head">The mechanism</div><div class="multi-result-note">1 funding_round row + 4 matching round_investment rows → 4 joined result rows. The JOIN did not invent records; each row remains one participation. Across the full instance, 72 participation rows still produce 72 result rows.</div></div>`;
    teacher('Here is what actually happens. One round row matched four participation rows, so its values contribute once per match. That behavior has a name.'); concept('JOIN row multiplication','When one row on the “one” side matches many rows on the “many” side, JOIN repeats the one-side values beside every match. It did not invent participation records, accidentally duplicate rows, or change the Grain away from participation.');
    state = 'sql'; $('#s2-sql').hidden = false; $('#s2-required').hidden = false; teacher('Your editor now. Six columns, the INNER JOIN, and the condition you established. I’ll be quiet while you write it.'); $('#s2-editor').focus();
  }
  function executeSql() {
    const sql = $('#s2-editor').value.trim(); const diagnostic = $('#s2-diagnostic'); diagnostic.innerHTML = '';
    if (!sql) { diagnostic.innerHTML = '<div class="diag">The editor is empty. Start with the participation-grain query.</div>'; return; }
    if (!/^\s*(?:with\b[\s\S]+?\bselect\b|select\b)/i.test(sql) || /\b(?:insert|update|delete|drop|alter|create|replace|attach|detach|pragma|vacuum)\b/i.test(sql) || sql.replace(/;\s*$/, '').includes(';')) { diagnostic.innerHTML = '<div class="diag">Run one read-only <code>SELECT</code> statement.</div>'; return; }
    if (!/\bjoin\b/i.test(sql) || !/\bon\b/i.test(sql)) { diagnostic.innerHTML = '<div class="diag">Use <code>JOIN</code> and <code>ON</code> to express the established relationship.</div>'; return; }
    try {
      const execution = getDatabase().exec(sql); if (execution.length !== 1) throw new Error('Return one result set.'); const result = execution[0]; const normalizedColumns = result.columns.map((column) => column.toLowerCase()); const indexes = REQUIRED.map((field) => normalizedColumns.indexOf(field)); if (indexes.some((index) => index < 0)) throw new Error(`Return these logical fields: ${REQUIRED.join(', ')}.`);
      const actual = result.values.map((row) => indexes.map((index) => normalize(row[index]))).sort(compareRows); const expectedResult = query(`${SOLUTION.replace(/;$/, '')} ORDER BY round_investment.round_investment_id;`); const expected = expectedResult.values.map((row) => row.map(normalize)).sort(compareRows);
      if (actual.length !== 72) throw new Error(`The query returned ${actual.length} rows; the accepted participation-grain result has 72.`); if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error('The six fields or row associations do not match the 72 expected participation–round records. Recheck ON.');
      acceptedResult = { columns: [...result.columns], values: result.values.map((row) => [...row]), indexes }; renderAccepted(); state = 'verification'; $('#s2-execute').disabled = true; teacher('That is your accepted result, still on the bench. Compare its derived 1003 slice with your prediction and tell me what you are looking at.'); verify();
    } catch (error) { diagnostic.innerHTML = `<div class="diag"><strong>Not verified yet.</strong> ${escapeText(error.message)}</div>`; }
  }
  function renderAccepted() {
    $('#s2-result').innerHTML = `<div class="results"><div class="results-top"><span>Query result</span><span class="results-count">72 rows returned</span></div>${dataTable(acceptedResult)}<div class="results-note">All 72 accepted rows are inspectable.</div></div>`;
    const roundIndex = acceptedResult.indexes[0]; const sliceValues = acceptedResult.values.filter((row) => String(row[roundIndex]) === '1003'); if (sliceValues.length !== 4) throw new Error(`Accepted-result slice 1003 has ${sliceValues.length} rows, expected 4.`);
    $('#s2-verify-slice').innerHTML = `<div class="slice-head"><span>accepted result · funding_round_id = 1003</span><span>4 rows</span></div>${dataTable({columns: acceptedResult.columns, values: sliceValues}, true)}<div class="results-note">Derived from the accepted 72-row result.</div>`; $('#s2-verify-evidence').hidden = false;
  }
  function verify() {
    ask({prompt:'In the <code>1003</code> slice, round type and announced date repeat across four rows. Why?',options:[['multiple','One round matched four distinct participations, so JOIN repeated its context beside each one while Grain stayed participation.'],['duplicate','The JOIN accidentally duplicated the round record.'],['summary','Those four rows should be summarized into one round row.']],correct:'multiple',wrong:{duplicate:'Compare round_investment_id and investor_id across the four actual-result rows.',summary:'That would change the requested Grain from participation to round.'},onCorrect:complete});
  }
  function complete() {
    state = 'complete'; spine('Verified: <b>72</b> rows · round 1003 → 4 participations'); teacher('Exactly. The count stayed at 72, one per participation. Round 1003 appears in four distinct participation rows because one round matched four recorded participations — multiple matches, not duplicates.'); $('#s2-editor').disabled = true; $('#s2-actions').hidden = true; $('#s2-required').hidden = true; $('#s2-completion').hidden = false; spine('Stage 2: argument closed');
  }

  $('#s2-catalog').addEventListener('click', (event) => { const card = event.target.closest('.catalog-card'); if (!card || state !== 'relations') return; const relation = card.dataset.rel; if (!['funding_round','round_investment'].includes(relation)) { $('#s2-catalog-feedback').hidden = false; $('#s2-catalog-feedback').textContent = 'You need recorded participations and the rounds they belong to.'; return; } $('#s2-catalog-feedback').hidden = true; if (selected.has(relation)) { selected.delete(relation); card.classList.remove('selected'); card.querySelector('.catalog-status').textContent = 'add'; } else { selected.add(relation); card.classList.add('selected'); card.querySelector('.catalog-status').textContent = 'on bench'; } if (selected.size === 2) setTimeout(beginConnection, 180); });
  $$('.col').forEach((button) => button.addEventListener('click', () => onColumn(button))); $('#s2-run-measure').addEventListener('click', runBaseline);
  $('#s2-assist-button').addEventListener('click', () => { const assist = $('#s2-assist'); assist.hidden = !assist.hidden; assist.innerHTML = '<div class="assist"><strong>Nudge:</strong> Start from <code>round_investment</code>, join <code>funding_round</code> on their funding-round ids, and select the six requested fields.</div>'; });
  $('#s2-solution-button').addEventListener('click', () => { $('#s2-editor').value = SOLUTION; $('#s2-editor').focus(); $('#s2-diagnostic').innerHTML = '<div class="assist">The solution is in the editor. It has not run, and the Stage has not advanced.</div>'; });
  $('#s2-execute').addEventListener('click', executeSql); $('#s2-restart').addEventListener('click', reset); reset(); return { restart: reset };
}

function normalize(value) { return value === null ? null : String(value); }
function compareRows(a, b) { return JSON.stringify(a).localeCompare(JSON.stringify(b)); }
function escapeText(value) { return String(value).replace(/[&<>"']/g, (character) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[character]); }
