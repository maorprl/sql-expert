import './course-4-lesson-1-runtime.css';

const SOLUTION = `SELECT
  news_article.title,
  news_source.name AS source_name
FROM news_article
INNER JOIN news_source
  ON news_article.news_source_id = news_source.news_source_id;`;

const RELATION_INFO = {
  news_article: { description: 'Articles published by news sources.', columns: [['news_article_id', 'INTEGER', 'The article record identifier.'], ['title', 'TEXT', 'The published article title.'], ['news_source_id', 'INTEGER', 'The recorded news_source_id value.']] },
  news_source: { description: 'Organizations that publish news articles.', columns: [['news_source_id', 'INTEGER', 'The source record identifier.'], ['name', 'TEXT', 'The publishing source name.']] },
  funding_round: { description: 'Recorded company funding rounds.', columns: [['funding_round_id', 'INTEGER', 'The funding-round record identifier.'], ['round_type', 'TEXT', 'The category of funding round.']] },
  company: { description: 'Companies and their business attributes.', columns: [['company_id', 'INTEGER', 'The company record identifier.'], ['name', 'TEXT', 'The company name.']] },
};

const html = `
  <div class="course4-lesson1-routecraft">
    <header class="masthead"><div><div class="mh-course">Course 4 · Joining Relations</div><div class="mh-title">Lesson 1 — One Match</div></div><div class="mh-right"><span class="mh-stage">Media coverage · request → verified JOIN</span><nav class="lesson-nav" aria-label="Course lessons"><button class="lesson-nav-button" id="c4l1-previous" type="button" disabled>Previous</button><button class="lesson-nav-button" id="c4l1-next" type="button" disabled>Next</button></nav><button class="ghost" id="c4l1-restart">Restart</button></div></header>
    <main class="app"><div class="zones">
      <section class="conversation" id="c4l1-conversation" aria-label="Conversation"><aside class="spine" aria-label="Reasoning thread"><div class="spine-head"><div class="spine-label">Thread</div><button class="spine-toggle" id="c4l1-spine-toggle" type="button" aria-controls="c4l1-spine" aria-expanded="true" aria-label="Collapse thread" title="Collapse thread">‹</button></div><ol class="spine-list" id="c4l1-spine"></ol></aside><div class="stream" id="c4l1-stream" aria-live="polite"></div></section>
      <section class="workbench" aria-label="Lesson workspace">
        <div class="wb-block" id="c4l1-entry"><div class="wb-head"><span class="eyebrow">Schema catalog</span><h3>Choose the relations that hold the request</h3></div><div class="catalog" id="c4l1-catalog">
          <div class="catalog-card" data-rel="news_article"><button class="catalog-select" type="button"><span><span class="catalog-name">news_article</span><span class="catalog-desc">articles and their titles</span></span><span class="catalog-status">add</span></button><button class="inspect-relation" type="button">Inspect</button></div>
          <div class="catalog-card" data-rel="news_source"><button class="catalog-select" type="button"><span><span class="catalog-name">news_source</span><span class="catalog-desc">publisher names</span></span><span class="catalog-status">add</span></button><button class="inspect-relation" type="button">Inspect</button></div>
          <div class="catalog-card" data-rel="funding_round"><button class="catalog-select" type="button"><span><span class="catalog-name">funding_round</span><span class="catalog-desc">round dates and amounts</span></span><span class="catalog-status">add</span></button><button class="inspect-relation" type="button">Inspect</button></div>
          <div class="catalog-card" data-rel="company"><button class="catalog-select" type="button"><span><span class="catalog-name">company</span><span class="catalog-desc">company names and sectors</span></span><span class="catalog-status">add</span></button><button class="inspect-relation" type="button">Inspect</button></div>
        </div><div class="catalog-feedback" id="c4l1-catalog-feedback" role="alert" hidden></div><div class="wb-head bench-head"><span class="eyebrow">Working schema</span><h3>Selected relations</h3></div><div class="relations" id="c4l1-relations"><span class="hint">Select the two relations that contain the requested information.</span></div></div>
        <div class="wb-block" id="c4l1-schema" hidden><div class="wb-head"><span class="eyebrow">Working schema</span><h3>The two selected relations</h3></div><div class="ws locked" id="c4l1-ws"><article class="card" data-rel="news_article"><div class="card-head"><span>news_article</span><button class="inspect-relation" type="button">Inspect</button></div><ul class="cols"><li><button class="col" data-rel="news_article" data-col="news_article_id"><code>news_article_id</code><span class="badge">PK</span></button></li><li><button class="col" data-rel="news_article" data-col="title"><code>title</code></button></li><li><button class="col relationship-endpoint endpoint-left" data-rel="news_article" data-col="news_source_id"><code>news_source_id</code><span class="badge badge-fk">FK</span></button></li></ul></article><div class="link" id="c4l1-link"><span class="line"></span><span class="cd m" hidden>M</span><span class="cd one" hidden>1</span></div><article class="card" data-rel="news_source"><div class="card-head"><span>news_source</span><button class="inspect-relation" type="button">Inspect</button></div><ul class="cols"><li><button class="col relationship-endpoint endpoint-right" data-rel="news_source" data-col="news_source_id"><code>news_source_id</code><span class="badge">PK</span></button></li><li><button class="col" data-rel="news_source" data-col="name"><code>name</code></button></li></ul></article></div></div>
        <div class="wb-block" id="c4l1-measure" hidden><div class="wb-head"><span class="eyebrow">Measurement</span><h3>Baseline — starting article rows</h3></div><div class="editor"><div class="editor-gutter">1</div><pre class="editor-code">SELECT COUNT(*) FROM news_article;</pre></div><div class="editor-actions"><button class="primary" id="c4l1-run-measure">Run measurement</button><span class="run-note" id="c4l1-run-note">Prepared for you — you don’t write this one.</span></div><div id="c4l1-measure-out" role="status" aria-live="polite"></div></div>
        <div class="wb-block" id="c4l1-prediction-mechanism" hidden><div class="wb-head"><span class="eyebrow">Prediction explained</span><h3>One match keeps one article row</h3></div><div class="match-mechanism" aria-label="One article row matches one source row and contributes one result row"><div class="mechanism-unit"><strong>1 article row</strong><span>starting row</span></div><div class="mechanism-arrow" aria-hidden="true">→</div><div class="mechanism-unit"><strong>1 matching source row</strong><span>for that article</span></div><div class="mechanism-arrow" aria-hidden="true">→</div><div class="mechanism-unit"><strong>1 result row</strong><span>same article Grain</span></div></div><p class="mechanism-scale"><strong>18 article rows</strong> × <strong>1 matching source row per article</strong> = <strong>18 matching pairs</strong> → <strong>18 result rows</strong>.</p></div>
        <div class="wb-block" id="c4l1-teaching" hidden><div class="wb-head"><span class="eyebrow">JOIN teaching</span><h3>Follow the relationship you established</h3></div><div class="teach-board" id="c4l1-teach-board">
          <details class="teach-step active" data-step="1" open><summary><span class="teach-kicker">Match rows</span><span class="teach-title">One article finds its source</span></summary><div class="teach-content"><div class="teach-copy">A row from <code>news_article</code> carries <span class="on-line">news_source_id = 2</span>. The row with <span class="on-line">news_source_id = 2</span> in <code>news_source</code> is the matching source row. Together, that matching pair contributes one result row.</div><div class="sample"><div class="sample-card"><div class="sample-head">news_article</div><div class="sample-row">article 12 · source_id 2</div></div><div class="sample-arrow">→</div><div class="sample-card"><div class="sample-head">news_source</div><div class="sample-row">source 2 · Venture Daily</div></div></div><div class="teach-actions"><button class="primary teach-next" data-next="2">Trace the match</button></div></div></details>
          <details class="teach-step" data-step="2" hidden><summary><span class="teach-kicker">Express the match</span><span class="teach-title">Tell SQL how the rows match</span></summary><div class="teach-content"><div class="teach-copy">Use the relationship already established between the fields to define the match condition. <span class="on-line">ON news_article.news_source_id = news_source.news_source_id</span> tells SQL to combine rows whose key values match.</div><div class="sample"><div class="sample-card"><div class="sample-head">article foreign key</div><div class="sample-row">news_article.news_source_id</div></div><div class="sample-arrow">=</div><div class="sample-card"><div class="sample-head">source primary key</div><div class="sample-row">news_source.news_source_id</div></div></div><div class="teach-actions"><button class="primary teach-next" data-next="3">See how it fits together</button></div></div></details>
          <details class="teach-step" data-step="3" hidden><summary><span class="teach-kicker">Connect the full query</span><span class="teach-title">The query expresses the request</span></summary><div class="teach-content"><div class="teach-copy">The request asks for every article with the name of its publishing source. One requested result row represents one article. The complete query carries the established matching logic through every clause:</div><div class="query-map"><div><code>FROM news_article</code><span>starts from the 18 article rows being compared</span></div><div><code>JOIN news_source</code><span>brings in the matching source row</span></div><div><code>ON news_article.news_source_id = news_source.news_source_id</code><span>defines how the rows match</span></div><div><code>SELECT news_article.title, news_source.name</code><span>chooses the article and source fields that appear</span></div></div><p class="teach-conclusion">Because each article contributes one matching pair, the query as a whole is predicted to return 18 rows at the established Grain: one article per result row.</p><div class="teach-actions"><button class="primary" id="c4l1-to-sql">Open the SQL workspace</button></div></div></details>
        </div></div>
        <div class="wb-block" id="c4l1-sql" aria-label="SQL workspace" hidden><div class="wb-head"><span class="eyebrow">SQL workspace</span><h3>Make the argument executable</h3></div><div class="editor"><div class="editor-gutter">1<br>2<br>3<br>4<br>5</div><textarea class="sql-editor" id="c4l1-sql-editor" spellcheck="false" aria-keyshortcuts="Control+Enter Meta+Enter" placeholder="Write a SELECT that joins news_article to news_source…"></textarea></div><div class="editor-actions" id="c4l1-sql-actions"><button class="primary" id="c4l1-execute">Execute SQL</button><button class="secondary" id="c4l1-assist-button">Show a nudge</button><button class="secondary" id="c4l1-solution-button">Show solution</button><span class="run-note">Runs against the course database and checks the returned meaning.</span></div><div class="execution-status" id="c4l1-execution-status" role="status" aria-live="polite" hidden></div><div id="c4l1-assist" hidden></div><div id="c4l1-diagnostic" role="status" aria-live="polite"></div><div id="c4l1-result"></div></div>
        <div class="wb-block" id="c4l1-enrich" hidden><div class="wb-head"><span class="eyebrow">Optional enrichment</span><h3>Go deeper: How the JOIN produced this result</h3></div><div class="enrichment" id="c4l1-enrich-panel"></div></div>
        <aside class="relation-inspector" id="c4l1-inspector" aria-labelledby="c4l1-inspector-title" hidden><div class="inspector-head"><div><span class="eyebrow">Relation inspector</span><h3 id="c4l1-inspector-title"></h3></div><button class="inspector-close" type="button" aria-label="Close relation inspector">×</button></div><div id="c4l1-inspector-body"></div><button class="secondary inspector-insert" id="c4l1-inspector-insert" type="button" hidden>Insert into SQL</button></aside>
      </section>
    </div></main>
  </div>`;

export function createCourse4Lesson1Runtime({ root, getDatabase, onContinue }) {
  root.innerHTML = html;
  const $ = (selector) => root.querySelector(selector);
  const $$ = (selector) => [...root.querySelectorAll(selector)];
  const node = (markup) => { const template = document.createElement('template'); template.innerHTML = markup.trim(); return template.content.firstElementChild; };
  const conversation = $('#c4l1-conversation');
  const stream = $('#c4l1-stream');
  const spineList = $('#c4l1-spine');
  const selected = new Set();
  let state = 'request';
  let inspectedRelation = null;
  let keyInfoRevealed = false;
  let relationshipInfoRevealed = false;

  const scroll = () => { conversation.scrollTop = conversation.scrollHeight; };
  const add = (element) => { stream.append(element); scroll(); return element; };
  const teacher = (copy) => {
    $$('.turn.teacher').forEach((turn) => turn.classList.remove('active-guidance'));
    return add(node(`<div class="turn teacher active-guidance"><span class="speaker">Teacher</span><p class="say">${copy}</p></div>`));
  };
  const learner = (copy) => add(node(`<div class="learner"><span class="learner-label">You</span><span class="learner-text">${copy}</span></div>`));
  const concept = (term, copy) => add(node(`<div class="concept"><div class="concept-eyebrow">Concept</div><div class="concept-term">${term}</div><div class="concept-body">${copy}</div></div>`));
  const spine = (copy) => spineList.append(node(`<li>${copy}</li>`));
  const markCurrentAction = (selector = null) => {
    $$('.wb-block').forEach((block) => { block.classList.remove('is-current-action'); block.removeAttribute('aria-current'); });
    if (selector) { const block = $(selector); block.classList.add('is-current-action'); block.setAttribute('aria-current', 'step'); }
  };
  const renderInspector = () => {
    if (!inspectedRelation) return;
    const info = RELATION_INFO[inspectedRelation];
    $('#c4l1-inspector-title').textContent = inspectedRelation;
    const keyLabels = keyInfoRevealed ? { news_article_id: 'PK', news_source_id: inspectedRelation === 'news_article' ? 'FK' : 'PK' } : {};
    $('#c4l1-inspector-body').innerHTML = `<p class="inspector-description">${info.description}</p><ul class="inspector-fields">${info.columns.map(([name, type, description]) => `<li><div><code>${name}</code><span class="field-type">${type}</span>${keyLabels[name] ? `<span class="badge${keyLabels[name] === 'FK' ? ' badge-fk' : ''}">${keyLabels[name]}</span>` : ''}</div><p>${description}</p></li>`).join('')}</ul>${relationshipInfoRevealed && ['news_article','news_source'].includes(inspectedRelation) ? '<p class="inspector-relationship"><strong>Revealed relationship:</strong> one source can publish many articles; each article names one source.</p>' : ''}`;
    $('#c4l1-inspector-insert').hidden = state !== 'sql';
  };
  const openInspector = (relation) => { inspectedRelation = relation; renderInspector(); $('#c4l1-inspector').hidden = false; };
  const closeInspector = () => { $('#c4l1-inspector').hidden = true; inspectedRelation = null; };
  const insertInspectedRelation = () => {
    if (state !== 'sql' || !inspectedRelation) return;
    const editor = $('#c4l1-sql-editor'); const start = editor.selectionStart; const end = editor.selectionEnd;
    editor.setRangeText(inspectedRelation, start, end, 'end'); editor.focus();
  };
  const setExecutionStatus = (message = '', status = '') => { const element = $('#c4l1-execution-status'); element.textContent = message; element.dataset.status = status; element.hidden = !message; };
  const setThreadCollapsed = (collapsed) => { root.firstElementChild.classList.toggle('thread-collapsed', collapsed); const button = $('#c4l1-spine-toggle'); button.textContent = collapsed ? '›' : '‹'; button.setAttribute('aria-expanded', String(!collapsed)); button.setAttribute('aria-label', collapsed ? 'Expand thread' : 'Collapse thread'); button.title = collapsed ? 'Expand thread' : 'Collapse thread'; };
  const ask = ({ prompt, options, correct, wrong, onCorrect }) => {
    const wrap = node(`<div class="ask"><p class="ask-q">${prompt}</p><form class="ask-form">${options.map(([value, label]) => `<label class="opt"><input type="radio" name="answer" value="${value}"><span class="opt-mark"></span><span class="opt-text">${label}</span></label>`).join('')}<div class="ask-actions"><button class="primary" type="submit" disabled>Check</button></div></form><div class="ask-error" role="alert" hidden></div></div>`);
    const form = wrap.querySelector('form');
    const submit = wrap.querySelector('button');
    const error = wrap.querySelector('.ask-error');
    form.addEventListener('change', () => { submit.disabled = false; error.hidden = true; });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = new FormData(form).get('answer');
      if (value !== correct) { error.hidden = false; error.innerHTML = wrong[value] || 'Try again.'; wrap.classList.add('shake'); setTimeout(() => wrap.classList.remove('shake'), 400); scroll(); return; }
      const label = options.find(([key]) => key === value)[1];
      wrap.replaceWith(node(`<div class="learner"><span class="learner-label">You</span><span class="learner-text">${label}</span></div>`));
      scroll(); onCorrect();
    });
    return add(wrap);
  };

  function reset() {
    state = 'request'; selected.clear(); stream.innerHTML = ''; spineList.innerHTML = ''; keyInfoRevealed = false; relationshipInfoRevealed = false; closeInspector(); $('#c4l1-next').disabled = true;
    $$('.catalog-card').forEach((card) => { card.classList.remove('selected'); card.querySelector('.catalog-status').textContent = 'add'; });
    $('#c4l1-catalog-feedback').hidden = true; $('#c4l1-relations').innerHTML = '<span class="hint">Select the two relations that contain the requested information.</span>';
    ['#c4l1-schema', '#c4l1-measure', '#c4l1-prediction-mechanism', '#c4l1-teaching', '#c4l1-sql', '#c4l1-enrich'].forEach((id) => { $(id).hidden = true; });
    $('#c4l1-entry').hidden = false; $('#c4l1-ws').className = 'ws locked'; $('#c4l1-link').className = 'link'; $$('#c4l1-link .cd').forEach((marker) => { marker.hidden = true; });
    $$('.col').forEach((column) => column.classList.remove('picked', 'wrong')); $$('.card').forEach((card) => card.classList.remove('interactive'));
    $('#c4l1-run-measure').disabled = false; $('#c4l1-run-note').textContent = 'Prepared for you — you don’t write this one.'; $('#c4l1-measure-out').innerHTML = '';
    $('#c4l1-sql-editor').value = ''; $('#c4l1-sql-editor').disabled = false; $('#c4l1-execute').disabled = false; $('#c4l1-sql-actions').hidden = false; setExecutionStatus(); $('#c4l1-assist').hidden = true; $('#c4l1-assist').innerHTML = ''; $('#c4l1-diagnostic').innerHTML = ''; $('#c4l1-result').innerHTML = ''; $('#c4l1-enrich-panel').innerHTML = '';
    $$('.teach-step').forEach((step) => { const first = step.dataset.step === '1'; step.hidden = !first; step.open = first; step.classList.toggle('active', first); step.classList.remove('completed'); });
    teacher('The research team is reviewing media coverage. They need a list of <strong>every article with the name of the source that published it</strong>. Which relations contain the information needed for that request?');
    state = 'relations'; spine('Requested rows: articles + publishing-source names'); markCurrentAction('#c4l1-entry'); conversation.scrollTop = 0;
  }

  function renderRelations() {
    const holder = $('#c4l1-relations'); holder.innerHTML = '';
    if (!selected.size) { holder.innerHTML = '<span class="hint">Select the two relations that contain the requested information.</span>'; return; }
    selected.forEach((relation) => holder.append(node(`<span class="relation-pill active">${relation}</span>`)));
  }

  function beginConnection() {
    if (state !== 'relations') return;
    state = 'connection'; $('#c4l1-entry').hidden = true; $('#c4l1-schema').hidden = false;
    spine('Needed information: article rows + related source information'); learner('<code>news_article</code> + <code>news_source</code>');
    teacher('These are the two places where the requested information lives: the article relation and the publisher relation. Now point to the article column that can be used to <strong>locate related publishing-source information</strong>.');
    markCurrentAction('#c4l1-schema');
    $('.card[data-rel="news_article"]').classList.add('interactive');
  }

  function onColumn(button) {
    if (state !== 'connection') return;
    let feedback = $('#c4l1-connection-feedback');
    if (!feedback) { feedback = node('<div class="ask-error" id="c4l1-connection-feedback" role="alert" hidden></div>'); add(feedback); }
    if (button.dataset.rel !== 'news_article') { feedback.hidden = false; feedback.innerHTML = 'Look inside <code>news_article</code> for the field used to locate related publishing-source information.'; return; }
    if (button.dataset.col !== 'news_source_id') { button.classList.add('wrong'); setTimeout(() => button.classList.remove('wrong'), 450); feedback.hidden = false; feedback.textContent = 'Which article column can be used to look up related publishing-source information?'; return; }
    feedback.hidden = true; button.classList.add('picked'); $('#c4l1-ws').classList.remove('locked'); $$('.card').forEach((card) => card.classList.remove('interactive')); $('#c4l1-link').classList.add('on'); keyInfoRevealed = true; renderInspector();
    learner('<code>news_article.news_source_id</code>'); spine('Relationship field: <code>news_article.news_source_id</code> → <code>news_source.news_source_id</code>'); state = 'cardinality';
    teacher('That’s the column — <code>news_article.news_source_id</code>.');
    concept('Primary key / foreign key', '<code>news_source.news_source_id</code> is a <strong>primary key</strong>, so a particular source-id value can match <strong>at most one</strong> <code>news_source</code> row. <code>news_article.news_source_id</code> is <strong>NOT NULL</strong> and a satisfied <strong>foreign key</strong>, so its value must match <strong>an existing</strong> <code>news_source</code> row. The link tells us which fields connect; combine these two facts to reason about the article direction.');
    teacher('Start from one article row. Combine the primary-key limit with the required, satisfied foreign-key reference.');
    ask({ prompt: 'For one article, how many publishing-source rows match through this relationship?', options: [['one', 'Exactly one publishing-source row.'], ['many', 'Many publishing-source rows.'], ['none', 'No publishing-source row.']], correct: 'one', wrong: { many: 'Use the primary-key premise: one source-id value can match <strong>at most one</strong> <code>news_source</code> row.', none: 'Use the required-reference premise: <code>news_article.news_source_id</code> is <code>NOT NULL</code> and its foreign-key reference is satisfied, so it must match <strong>an existing</strong> source row.' }, onCorrect: afterArticleDirection });
  }

  function afterArticleDirection() {
    spine('Match contribution: one article → one source match');
    state = 'cardinality-source-direction';
    teacher('You combined the two premises: one article contributes one matching source row. Now reason in the other direction. <code>news_article.news_source_id</code> is not constrained <code>UNIQUE</code>. Consider what that structure allows in the publishing domain.');
    ask({ prompt: 'For one publishing source, how many article rows can participate in this relationship?', options: [['many', 'Many article rows can identify that source.'], ['one', 'Only one article row can identify that source.'], ['none', 'No article row can identify that source.']], correct: 'many', wrong: { one: 'Nothing in this relationship makes <code>news_article.news_source_id</code> unique; separate articles can identify the same publisher.', none: 'A publishing source can be identified by article rows through <code>news_source_id</code>.' }, onCorrect: afterCardinality });
  }

  function afterCardinality() {
    spine('Reverse direction: one source → potentially many article matches (<code>1 → M</code>)'); concept('Cardinality', 'This relationship is <strong>one-to-many</strong>, written 1 → M: one <code>news_source</code> can be pointed at by many <code>news_article</code> rows. In the current data, <strong>Venture Daily → 6 articles</strong>. Direction matters: this does not change the one-match contribution already established from an article row.'); $$('#c4l1-link .cd').forEach((marker) => { marker.hidden = false; }); $('#c4l1-link').classList.add('cardinality'); relationshipInfoRevealed = true; renderInspector(); state = 'grain';
    teacher('Both match directions are now established. Return to the article-oriented request: what should one requested result row represent?');
    markCurrentAction();
    ask({ prompt: 'If the result should show every article with its source, what should one result row represent?', options: [['article', 'a news article'], ['source', 'a news source'], ['source-group', 'one publishing source with all of its articles'], ['pair', 'a combination of article and source']], correct: 'article', wrong: { source: 'The request is a list of articles. What is the row about?', 'source-group': 'Grouping all articles under one source would organize rows around sources, not around every article.', pair: 'The request organises the information around articles. What does one row stand for?' }, onCorrect: afterGrain });
  }

  function afterGrain() {
    spine('Requested result row: one article'); concept('Grain', 'The result’s <strong>grain</strong> is what a single row represents — here, <strong>one news article per row</strong>. A row may contain information from both relations while still representing one article.'); state = 'baseline';
    teacher('The requested Grain is one article per result row. Now establish a separate fact: the number of starting article rows to use as the comparison baseline. Run the prepared measurement below.'); $('#c4l1-measure').hidden = false; $('#c4l1-ws').classList.add('dim'); $('#c4l1-run-measure').focus();
    markCurrentAction('#c4l1-measure');
  }

  function runMeasurement() {
    if (state !== 'baseline') return;
    try {
      const count = getDatabase().exec('SELECT COUNT(*) FROM news_article;')[0]?.values?.[0]?.[0];
      if (count !== 18) throw new Error(`Expected 18 article rows, received ${count}.`);
      $('#c4l1-run-measure').disabled = true; $('#c4l1-run-note').textContent = `${count} article rows measured.`;
      $('#c4l1-measure-out').innerHTML = `<div class="results"><div class="results-top"><span>Baseline measurement</span><span class="results-count">${count} article rows</span></div><table><thead><tr><th>COUNT(*)</th></tr></thead><tbody><tr><td><b>${count}</b></td></tr></tbody></table></div>`;
      startPrediction(count);
    } catch (error) { $('#c4l1-measure-out').innerHTML = `<div class="diag">The database measurement could not run: ${escapeText(error.message)}</div>`; }
  }

  function startPrediction(count) {
    spine(`Starting baseline: <b>${count}</b> article rows`); state = 'prediction'; markCurrentAction(); teacher(`<strong>${count} article rows</strong> is the comparison baseline. For this INNER JOIN step, you established that each article contributes one matching article/source pair. What should happen to the row count when source information is added?`);
    ask({ prompt: 'What should happen to the row count when we add each article’s source information?', options: [['exact', '18 rows — one result row for each article'], ['sources', '4 rows — one result row for each source'], ['more', 'More than 18 rows — some articles would produce multiple result rows']], correct: 'exact', wrong: { sources: 'Use the chosen baseline: how many matching pairs does each of the 18 starting article rows contribute?', more: 'For this JOIN step, each baseline article contributes one matching pair. Would that produce several result rows for one article?' }, onCorrect: afterPrediction });
  }

  function afterPrediction() {
    spine('Predicted JOIN step: <b>18</b> matching pairs → <b>18</b> article-grain rows'); state = 'semantic'; $('#c4l1-prediction-mechanism').hidden = false; markCurrentAction('#c4l1-prediction-mechanism'); teacher('Each starting article row matches one source row, so it contributes one result row. Across 18 article rows, that makes 18 matching pairs and therefore 18 result rows at the established article Grain. Which relational action implements that matching logic?');
    ask({ prompt: 'What relational action expresses that intention?', options: [['join', 'Combine each article with its matching source.'], ['filter', 'Keep only the article rows that pass a condition.'], ['aggregate', 'Collapse rows into counts or summaries.'], ['union', 'Stack the article rows and source rows together.']], correct: 'join', wrong: { filter: 'Filtering does not bring publisher information alongside each article.', aggregate: 'Aggregation changes the grain into a summary.', union: 'A union stacks rows; we need to combine matching rows.' }, onCorrect: afterSemantic });
  }

  function afterSemantic() {
    concept('JOIN', 'A <strong>JOIN</strong> combines matching rows from related relations. It is the SQL operation for the matching logic you already used to predict this step’s row effect.'); state = 'join-teaching'; $('#c4l1-teaching').hidden = false;
    markCurrentAction('#c4l1-teaching');
    teacher('Follow the same argument into SQL: first one matching pair, then the <code>ON</code> condition that finds it, then the full query that applies that logic to the 18 starting article rows.'); $('#c4l1-teach-board').scrollIntoView({ block: 'nearest' });
  }

  function executeSql() {
    const sql = $('#c4l1-sql-editor').value.trim(); const diagnostic = $('#c4l1-diagnostic'); diagnostic.innerHTML = ''; setExecutionStatus();
    if (!sql) { diagnostic.innerHTML = '<div class="diag">The editor is empty. Begin with <code>news_article</code>, the relation carrying the result grain.</div>'; return; }
    if (!/^\s*(?:with\b[\s\S]+?\bselect\b|select\b)/i.test(sql)) { diagnostic.innerHTML = '<div class="diag">Use a <code>SELECT</code> query to return the requested article rows.</div>'; return; }
    if (/\b(?:insert|update|delete|drop|alter|create|replace|attach|detach|pragma|vacuum)\b/i.test(sql) || sql.replace(/;\s*$/, '').includes(';')) { diagnostic.innerHTML = '<div class="diag">Run one read-only <code>SELECT</code> statement for this request.</div>'; return; }
    if (!/\bjoin\b/i.test(sql) || !/\bon\b/i.test(sql)) { diagnostic.innerHTML = '<div class="diag">Express both the combination and its match rule with <code>JOIN</code> and <code>ON</code>.</div>'; return; }
    let executed = false;
    try {
      const db = getDatabase(); const execution = db.exec(sql);
      executed = true; setExecutionStatus('Executed · checking task meaning', 'executed');
      if (execution.length !== 1) throw new Error('Return one result set for this request.');
      const { columns, values } = execution[0];
      const titleIndex = columns.findIndex((column) => column.toLowerCase() === 'title');
      const sourceIndex = columns.findIndex((column) => ['source_name', 'name'].includes(column.toLowerCase()));
      if (titleIndex < 0 || sourceIndex < 0) throw new Error('Return the article title and source name. Alias the source column as source_name if helpful.');
      const expected = db.exec('SELECT news_article.title, news_source.name AS source_name FROM news_article INNER JOIN news_source ON news_article.news_source_id = news_source.news_source_id ORDER BY news_article.news_article_id;')[0].values.map((row) => `${row[0]}\u0000${row[1]}`).sort();
      const actual = values.map((row) => `${row[titleIndex]}\u0000${row[sourceIndex]}`).sort();
      if (actual.length !== 18 || JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error('The result does not yet contain the 18 expected article–publisher matches. Check the ON relationship and selected columns.');
      renderResults(columns, values); setExecutionStatus('Verified · result satisfies the task', 'verified'); state = 'verification'; $('#c4l1-execute').disabled = true; teacher('The query executed the matching logic and returned evidence. Compare those rows with the 18-row prediction and the established article Grain. What does the evidence establish?'); askVerification();
    } catch (error) { setExecutionStatus(executed ? 'Executed · not verified' : 'Execution failed', executed ? 'executed' : 'failed'); diagnostic.innerHTML = `<div class="diag"><strong>${executed ? 'Not verified yet.' : 'SQL execution failed.'}</strong> ${escapeText(error.message)}</div>`; }
  }

  function renderResults(columns, values) {
    const head = columns.map((column) => `<th>${escapeText(column)}</th>`).join('');
    const rows = values.map((row) => `<tr>${row.map((value) => `<td>${escapeText(value ?? 'NULL')}</td>`).join('')}</tr>`).join('');
    $('#c4l1-result').innerHTML = `<div class="results"><div class="results-top"><span>Query result</span><span class="results-count">${values.length} rows returned</span></div><div class="results-scroll"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div><div class="results-note">All ${values.length} rows are inspectable.</div></div>`;
  }

  function askVerification() {
    const wrap = node('<div class="ask"><p class="ask-q">Compare the actual result with your earlier prediction of 18 rows and the established Grain of one article per row. Which claims does that comparison verify?</p><form class="ask-form verify-form"><label class="opt"><input type="checkbox" value="count"><span class="opt-mark"></span><span class="opt-text">There are 18 result rows.</span></label><label class="opt"><input type="checkbox" value="grain"><span class="opt-mark"></span><span class="opt-text">One result row still represents one article.</span></label><label class="opt"><input type="checkbox" value="source"><span class="opt-mark"></span><span class="opt-text">Source information has been added without changing the result grain.</span></label><label class="opt"><input type="checkbox" value="wrong"><span class="opt-mark"></span><span class="opt-text">The JOIN multiplied each article into several result rows.</span></label><div class="ask-actions"><button class="primary" type="submit">Check reading</button></div></form><div class="ask-error" role="alert" hidden></div></div>');
    const form = wrap.querySelector('form'); const error = wrap.querySelector('.ask-error');
    form.addEventListener('submit', (event) => { event.preventDefault(); const values = [...form.querySelectorAll('input:checked')].map((input) => input.value).sort().join(','); if (values !== 'count,grain,source') { error.hidden = false; error.textContent = 'Use the visible evidence and the grain established earlier. Which three claims describe the actual result?'; return; } wrap.replaceWith(node('<div class="learner"><span class="learner-label">You</span><span class="learner-text">18 rows · one article per row · source information added at the same grain</span></div>')); complete(); });
    add(wrap);
  }

  function complete() {
    state = 'complete'; markCurrentAction(); renderInspector(); spine('Verified result: 18 rows at one-article Grain'); teacher('Yes. The result contains 18 rows, one for each starting article, and each row carries the matching source information. The actual evidence matches the earlier prediction: one source match contributed per article produced one article-grain result row.');
    add(node('<div class="verification-summary"><div class="verification-eyebrow">Reasoning verified</div><p>You established one article per requested result row, measured 18 starting article rows, and predicted 18 result rows because each article matches one source. The executed result contains those 18 article/source matches, so the evidence confirms the prediction and remains consistent with the established Grain. SQL is not the conclusion by itself — the verified meaning of its result is.</p></div>'));
    $('#c4l1-sql-editor').disabled = true; $('#c4l1-sql-actions').hidden = true; $('#c4l1-next').disabled = false;
    const completion = add(node('<div class="completion"><div class="completion-eyebrow">Success · verified result</div><h3>Course 4 · Lesson 1 complete</h3><p>The research team can now read every article with its publishing source. Each article matched one source, so adding source information kept the result at 18 rows and one article per row.</p><p class="completion-next">Continue within RouteCraft · SQL Lab to Funding participation.</p><button class="primary continue-stage" type="button">Continue to Funding participation</button></div>'));
    completion.querySelector('.continue-stage').addEventListener('click', () => onContinue?.());
    spine('Argument closed: one match per article → predicted 18 → verified 18'); $('#c4l1-enrich').hidden = false; $('#c4l1-enrich-panel').innerHTML = '<button class="enrichment-btn" id="c4l1-enrich-toggle">Go deeper: How the JOIN produced this result</button>';
    $('#c4l1-enrich-toggle').addEventListener('click', showEnrichment);
  }

  function showEnrichment() {
    $('#c4l1-enrich-panel').innerHTML = '<h4>From relationship to result rows</h4><p>The schema tells us which relationships are possible. The instance shows which row matches actually occur. This query uses <code>JOIN</code> to combine rows whose key values satisfy the <code>ON</code> condition.</p><div class="row-construction"><div class="sample-card"><div class="sample-head">news_article row</div><div class="sample-row"><strong>title</strong><span>news_source_id = 2</span></div></div><div class="construction-arrow"><span>matches the same source id</span><b aria-hidden="true">→</b></div><div class="sample-card"><div class="sample-head">news_source row</div><div class="sample-row"><strong>name</strong><span>news_source_id = 2</span></div></div><div class="construction-arrow"><span>contributes both fields</span><b aria-hidden="true">→</b></div><div class="sample-card result-card"><div class="sample-head">result row</div><div class="sample-row"><strong>title</strong><strong>source_name</strong></div></div></div><p><strong>What <code>ON</code> expresses:</strong> it defines how article rows match source rows using the relationship already established in the schema.</p><p><strong>What this query preserves:</strong> because each article matches one source, this result keeps one row per article. A Venn view can help with inclusion and exclusion, but it does not explain Grain or row multiplication.</p>';
  }

  $('#c4l1-catalog').addEventListener('click', (event) => {
    const inspect = event.target.closest('.inspect-relation'); const card = event.target.closest('.catalog-card');
    if (inspect && card) { openInspector(card.dataset.rel); return; }
    if (!event.target.closest('.catalog-select') || !card || state !== 'relations') return; const relation = card.dataset.rel;
    if (!['news_article', 'news_source'].includes(relation)) { $('#c4l1-catalog-feedback').hidden = false; $('#c4l1-catalog-feedback').textContent = 'That relation does not carry either part of this request. Look for articles and their publishers.'; return; }
    $('#c4l1-catalog-feedback').hidden = true;
    if (selected.has(relation)) { selected.delete(relation); card.classList.remove('selected'); card.querySelector('.catalog-status').textContent = 'add'; } else { selected.add(relation); card.classList.add('selected'); card.querySelector('.catalog-status').textContent = 'Added'; }
    renderRelations(); if (selected.has('news_article') && selected.has('news_source')) setTimeout(beginConnection, 220);
  });
  $$('.card .inspect-relation').forEach((button) => button.addEventListener('click', () => openInspector(button.closest('.card').dataset.rel)));
  $$('.col').forEach((button) => button.addEventListener('click', () => onColumn(button)));
  $('#c4l1-run-measure').addEventListener('click', runMeasurement);
  $$('.teach-next').forEach((button) => button.addEventListener('click', () => { const current = button.closest('.teach-step'); const next = $(`.teach-step[data-step="${button.dataset.next}"]`); current.open = false; current.classList.remove('active'); current.classList.add('completed'); next.hidden = false; next.open = true; next.classList.add('active'); teacher(button.dataset.next === '2' ? 'You traced the row match. Now express that same established relationship as the condition SQL uses to match rows.' : 'Now connect the operation and match condition to every clause needed for the business request.'); }));
  $('#c4l1-to-sql').addEventListener('click', () => { state = 'sql'; const activeTeaching = $('.teach-step.active'); activeTeaching.open = false; activeTeaching.classList.remove('active'); activeTeaching.classList.add('completed'); $('#c4l1-sql').hidden = false; markCurrentAction('#c4l1-sql'); renderInspector(); teacher('The SQL workspace is ready. Write the query that applies the established matching logic to the 18 starting article rows, returns the requested fields, and tests the predicted 18-row article-grain result.'); $('#c4l1-sql-editor').focus(); });
  $('#c4l1-assist-button').addEventListener('click', () => { const assist = $('#c4l1-assist'); assist.hidden = !assist.hidden; assist.innerHTML = '<div class="assist"><strong>Nudge:</strong> Start from <code>news_article</code>. Bring in <code>news_source</code> with <code>JOIN</code>, then compare the article foreign key with the source primary key in <code>ON</code>.</div>'; });
  $('#c4l1-solution-button').addEventListener('click', () => { $('#c4l1-sql-editor').value = SOLUTION; setExecutionStatus('Not executed', 'idle'); $('#c4l1-sql-editor').focus(); $('#c4l1-diagnostic').innerHTML = '<div class="assist">The solution is now in the editor. It has not run, and the lesson has not advanced.</div>'; });
  $('#c4l1-inspector').addEventListener('click', (event) => { if (event.target.closest('.inspector-close')) closeInspector(); });
  $('#c4l1-inspector-insert').addEventListener('click', insertInspectedRelation);
  $('#c4l1-spine-toggle').addEventListener('click', () => setThreadCollapsed(!root.firstElementChild.classList.contains('thread-collapsed')));
  $('#c4l1-next').addEventListener('click', () => { if (state === 'complete') onContinue?.(); });
  $('#c4l1-sql-editor').addEventListener('keydown', (event) => { if (!event.isComposing && event.key === 'Enter' && (event.ctrlKey || event.metaKey)) { event.preventDefault(); executeSql(); } });
  $('#c4l1-sql-editor').addEventListener('input', () => { if (state === 'sql') setExecutionStatus('Not executed', 'idle'); });
  $('#c4l1-execute').addEventListener('click', executeSql); $('#c4l1-restart').addEventListener('click', reset);
  reset();
  return { restart: reset };
}

function escapeText(value) { return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]); }
