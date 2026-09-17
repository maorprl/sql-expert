import './stage1-prototype-runtime.css';

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
  <div class="stage1-routecraft">
    <header class="masthead"><div><div class="mh-course">RouteCraft · SQL Lab</div><div class="mh-title">Media coverage — one article, one publisher</div></div><div class="mh-right"><span class="mh-stage">Stage 1 · request → verified JOIN</span><nav class="lesson-nav" aria-label="Course lessons"><button class="lesson-nav-button" id="s1-previous" type="button" disabled>Previous</button><button class="lesson-nav-button" id="s1-next" type="button" disabled>Next</button></nav><button class="ghost" id="s1-restart">Restart</button></div></header>
    <main class="app"><div class="zones">
      <section class="conversation" id="s1-conversation" aria-label="Conversation"><aside class="spine" aria-label="Reasoning thread"><div class="spine-head"><div class="spine-label">Thread</div><button class="spine-toggle" id="s1-spine-toggle" type="button" aria-controls="s1-spine" aria-expanded="true" aria-label="Collapse thread" title="Collapse thread">‹</button></div><ol class="spine-list" id="s1-spine"></ol></aside><div class="stream" id="s1-stream" aria-live="polite"></div></section>
      <section class="workbench" aria-label="Workbench">
        <div class="wb-block" id="s1-entry"><div class="wb-head"><span class="eyebrow">Schema catalog</span><h3>Choose the relations that hold the request</h3></div><div class="catalog" id="s1-catalog">
          <div class="catalog-card" data-rel="news_article"><button class="catalog-select" type="button"><span><span class="catalog-name">news_article</span><span class="catalog-desc">articles and their titles</span></span><span class="catalog-status">add</span></button><button class="inspect-relation" type="button">Inspect</button></div>
          <div class="catalog-card" data-rel="news_source"><button class="catalog-select" type="button"><span><span class="catalog-name">news_source</span><span class="catalog-desc">publisher names</span></span><span class="catalog-status">add</span></button><button class="inspect-relation" type="button">Inspect</button></div>
          <div class="catalog-card" data-rel="funding_round"><button class="catalog-select" type="button"><span><span class="catalog-name">funding_round</span><span class="catalog-desc">round dates and amounts</span></span><span class="catalog-status">add</span></button><button class="inspect-relation" type="button">Inspect</button></div>
          <div class="catalog-card" data-rel="company"><button class="catalog-select" type="button"><span><span class="catalog-name">company</span><span class="catalog-desc">company names and sectors</span></span><span class="catalog-status">add</span></button><button class="inspect-relation" type="button">Inspect</button></div>
        </div><div class="catalog-feedback" id="s1-catalog-feedback" role="alert" hidden></div><div class="wb-head bench-head"><span class="eyebrow">Working schema</span><h3>Relations on the bench</h3></div><div class="relations" id="s1-relations"><span class="hint">Select the two relations that contain the requested information.</span></div></div>
        <div class="wb-block" id="s1-schema" hidden><div class="wb-head"><span class="eyebrow">Working schema</span><h3>The two relations on the bench</h3></div><div class="ws locked" id="s1-ws"><article class="card" data-rel="news_article"><div class="card-head"><span>news_article</span><button class="inspect-relation" type="button">Inspect</button></div><ul class="cols"><li><button class="col" data-rel="news_article" data-col="news_article_id"><code>news_article_id</code><span class="badge">PK</span></button></li><li><button class="col" data-rel="news_article" data-col="title"><code>title</code></button></li><li><button class="col relationship-endpoint endpoint-left" data-rel="news_article" data-col="news_source_id"><code>news_source_id</code><span class="badge badge-fk">FK</span></button></li></ul></article><div class="link" id="s1-link"><span class="line"></span><span class="cd m">M</span><span class="cd one">1</span></div><article class="card" data-rel="news_source"><div class="card-head"><span>news_source</span><button class="inspect-relation" type="button">Inspect</button></div><ul class="cols"><li><button class="col relationship-endpoint endpoint-right" data-rel="news_source" data-col="news_source_id"><code>news_source_id</code><span class="badge">PK</span></button></li><li><button class="col" data-rel="news_source" data-col="name"><code>name</code></button></li></ul></article></div></div>
        <div class="wb-block" id="s1-measure" hidden><div class="wb-head"><span class="eyebrow">Measurement</span><h3>Baseline — starting article rows</h3></div><div class="editor"><div class="editor-gutter">1</div><pre class="editor-code">SELECT COUNT(*) FROM news_article;</pre></div><div class="editor-actions"><button class="primary" id="s1-run-measure">Run measurement</button><span class="run-note" id="s1-run-note">Prepared for you — you don’t write this one.</span></div><div id="s1-measure-out" role="status" aria-live="polite"></div></div>
        <div class="wb-block" id="s1-teaching" hidden><div class="wb-head"><span class="eyebrow">JOIN teaching</span><h3>Follow the relationship you established</h3></div><div class="teach-board" id="s1-teach-board">
          <div class="teach-step active" data-step="1"><div class="teach-kicker">Beat 1 · match</div><div class="teach-title">One article finds its source</div><div class="teach-copy">A row from <code>news_article</code> carries <span class="on-line">news_source_id = 2</span>. The row with <span class="on-line">news_source_id = 2</span> in <code>news_source</code> is the source that belongs beside it.</div><div class="sample"><div class="sample-card"><div class="sample-head">news_article</div><div class="sample-row">article 12 · source_id 2</div></div><div class="sample-arrow">→</div><div class="sample-card"><div class="sample-head">news_source</div><div class="sample-row">source 2 · Venture Daily</div></div></div><div class="teach-actions"><button class="primary beat-next" data-next="2">Trace the match</button></div></div>
          <div class="teach-step" data-step="2"><div class="teach-kicker">Beat 2 · condition</div><div class="teach-title">The relationship becomes <code>ON</code></div><div class="teach-copy">The match rule says: compare the article’s foreign key with the source’s primary key. In SQL, that relationship becomes <span class="on-line">ON news_article.news_source_id = news_source.news_source_id</span>.</div><div class="sample"><div class="sample-card"><div class="sample-head">article side</div><div class="sample-row">news_article.news_source_id</div></div><div class="sample-arrow">=</div><div class="sample-card"><div class="sample-head">source side</div><div class="sample-row">news_source.news_source_id</div></div></div><div class="teach-actions"><button class="primary beat-next" data-next="3">Map the condition</button></div></div>
          <div class="teach-step" data-step="3"><div class="teach-kicker">Beat 3 · meaning</div><div class="teach-title">The full query answers the request</div><div class="teach-copy">The <code>JOIN</code> combines the two relations; <code>ON</code> follows the relationship; and the selected columns return every article with its publisher at one article per row.</div><div class="sample"><div class="sample-card"><div class="sample-head">business request</div><div class="sample-row">every article + its publisher</div></div><div class="sample-arrow">↔</div><div class="sample-card"><div class="sample-head">result grain</div><div class="sample-row">one article per row</div></div></div><div class="teach-actions"><button class="primary" id="s1-to-sql">Write the query</button></div></div>
        </div></div>
        <div class="wb-block" id="s1-sql" hidden><div class="wb-head"><span class="eyebrow">SQL authoring</span><h3>Make the argument executable</h3></div><div class="editor"><div class="editor-gutter">1<br>2<br>3<br>4<br>5</div><textarea class="sql-editor" id="s1-sql-editor" spellcheck="false" aria-keyshortcuts="Control+Enter Meta+Enter" placeholder="Write a SELECT that joins news_article to news_source…"></textarea></div><div class="editor-actions" id="s1-sql-actions"><button class="primary" id="s1-execute">Execute SQL</button><button class="secondary" id="s1-assist-button">Show a nudge</button><button class="secondary" id="s1-solution-button">Show solution</button><span class="run-note">Runs against the course database and checks the returned meaning.</span></div><div class="execution-status" id="s1-execution-status" role="status" aria-live="polite" hidden></div><div id="s1-assist" hidden></div><div id="s1-diagnostic" role="status" aria-live="polite"></div><div id="s1-result"></div></div>
        <div class="wb-block" id="s1-enrich" hidden><div class="wb-head"><span class="eyebrow">Optional enrichment</span><h3>Go deeper: How the JOIN produced this result</h3></div><div class="enrichment" id="s1-enrich-panel"></div></div>
        <aside class="relation-inspector" id="s1-inspector" aria-labelledby="s1-inspector-title" hidden><div class="inspector-head"><div><span class="eyebrow">Relation inspector</span><h3 id="s1-inspector-title"></h3></div><button class="inspector-close" type="button" aria-label="Close relation inspector">×</button></div><div id="s1-inspector-body"></div><button class="secondary inspector-insert" id="s1-inspector-insert" type="button" hidden>Insert into SQL</button></aside>
      </section>
    </div></main>
  </div>`;

export function createStage1Prototype({ root, getDatabase, onContinue }) {
  root.innerHTML = html;
  const $ = (selector) => root.querySelector(selector);
  const $$ = (selector) => [...root.querySelectorAll(selector)];
  const node = (markup) => { const template = document.createElement('template'); template.innerHTML = markup.trim(); return template.content.firstElementChild; };
  const conversation = $('#s1-conversation');
  const stream = $('#s1-stream');
  const spineList = $('#s1-spine');
  const selected = new Set();
  let state = 'request';
  let inspectedRelation = null;
  let keyInfoRevealed = false;
  let relationshipInfoRevealed = false;

  const scroll = () => { conversation.scrollTop = conversation.scrollHeight; };
  const add = (element) => { stream.append(element); scroll(); return element; };
  const teacher = (copy) => add(node(`<div class="turn teacher"><span class="speaker">Teacher</span><p class="say">${copy}</p></div>`));
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
    $('#s1-inspector-title').textContent = inspectedRelation;
    const keyLabels = keyInfoRevealed ? { news_article_id: 'PK', news_source_id: inspectedRelation === 'news_article' ? 'FK' : 'PK' } : {};
    $('#s1-inspector-body').innerHTML = `<p class="inspector-description">${info.description}</p><ul class="inspector-fields">${info.columns.map(([name, type, description]) => `<li><div><code>${name}</code><span class="field-type">${type}</span>${keyLabels[name] ? `<span class="badge${keyLabels[name] === 'FK' ? ' badge-fk' : ''}">${keyLabels[name]}</span>` : ''}</div><p>${description}</p></li>`).join('')}</ul>${relationshipInfoRevealed && ['news_article','news_source'].includes(inspectedRelation) ? '<p class="inspector-relationship"><strong>Revealed relationship:</strong> one source can publish many articles; each article names one source.</p>' : ''}`;
    $('#s1-inspector-insert').hidden = state !== 'sql';
  };
  const openInspector = (relation) => { inspectedRelation = relation; renderInspector(); $('#s1-inspector').hidden = false; };
  const closeInspector = () => { $('#s1-inspector').hidden = true; inspectedRelation = null; };
  const insertInspectedRelation = () => {
    if (state !== 'sql' || !inspectedRelation) return;
    const editor = $('#s1-sql-editor'); const start = editor.selectionStart; const end = editor.selectionEnd;
    editor.setRangeText(inspectedRelation, start, end, 'end'); editor.focus();
  };
  const setExecutionStatus = (message = '', status = '') => { const element = $('#s1-execution-status'); element.textContent = message; element.dataset.status = status; element.hidden = !message; };
  const setThreadCollapsed = (collapsed) => { root.firstElementChild.classList.toggle('thread-collapsed', collapsed); const button = $('#s1-spine-toggle'); button.textContent = collapsed ? '›' : '‹'; button.setAttribute('aria-expanded', String(!collapsed)); button.setAttribute('aria-label', collapsed ? 'Expand thread' : 'Collapse thread'); button.title = collapsed ? 'Expand thread' : 'Collapse thread'; };
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
    state = 'request'; selected.clear(); stream.innerHTML = ''; spineList.innerHTML = ''; keyInfoRevealed = false; relationshipInfoRevealed = false; closeInspector(); $('#s1-next').disabled = true;
    $$('.catalog-card').forEach((card) => { card.classList.remove('selected'); card.querySelector('.catalog-status').textContent = 'add'; });
    $('#s1-catalog-feedback').hidden = true; $('#s1-relations').innerHTML = '<span class="hint">Select the two relations that contain the requested information.</span>';
    ['#s1-schema', '#s1-measure', '#s1-teaching', '#s1-sql', '#s1-enrich'].forEach((id) => { $(id).hidden = true; });
    $('#s1-entry').hidden = false; $('#s1-ws').className = 'ws locked'; $('#s1-link').className = 'link';
    $$('.col').forEach((column) => column.classList.remove('picked', 'wrong')); $$('.card').forEach((card) => card.classList.remove('interactive'));
    $('#s1-run-measure').disabled = false; $('#s1-run-note').textContent = 'Prepared for you — you don’t write this one.'; $('#s1-measure-out').innerHTML = '';
    $('#s1-sql-editor').value = ''; $('#s1-sql-editor').disabled = false; $('#s1-execute').disabled = false; $('#s1-sql-actions').hidden = false; setExecutionStatus(); $('#s1-assist').hidden = true; $('#s1-assist').innerHTML = ''; $('#s1-diagnostic').innerHTML = ''; $('#s1-result').innerHTML = ''; $('#s1-enrich-panel').innerHTML = '';
    $$('.teach-step').forEach((step) => step.classList.toggle('active', step.dataset.step === '1'));
    teacher('The research team is reviewing media coverage. They want a list of <strong>every article with the name of the source that published it</strong>. We will make that request precise, then check the result against a prediction — not just run a query and hope it looks right. Which relations should we bring into the working schema?');
    state = 'relations'; spine('Request: every article + its publisher'); markCurrentAction('#s1-entry'); conversation.scrollTop = 0;
  }

  function renderRelations() {
    const holder = $('#s1-relations'); holder.innerHTML = '';
    if (!selected.size) { holder.innerHTML = '<span class="hint">Select the two relations that contain the requested information.</span>'; return; }
    selected.forEach((relation) => holder.append(node(`<span class="relation-pill active">${relation}</span>`)));
  }

  function beginConnection() {
    if (state !== 'relations') return;
    state = 'connection'; $('#s1-entry').hidden = true; $('#s1-schema').hidden = false;
    spine('Relations: <code>news_article</code> + <code>news_source</code>'); learner('<code>news_article</code> + <code>news_source</code>');
    teacher('These are the two places where the requested information lives: the article relation and the publisher relation. Now point to the column in an article row that answers: <strong>who published this article?</strong>');
    markCurrentAction('#s1-schema');
    $('.card[data-rel="news_article"]').classList.add('interactive');
  }

  function onColumn(button) {
    if (state !== 'connection') return;
    let feedback = $('#s1-connection-feedback');
    if (!feedback) { feedback = node('<div class="ask-error" id="s1-connection-feedback" role="alert" hidden></div>'); add(feedback); }
    if (button.dataset.rel !== 'news_article') { feedback.hidden = false; feedback.innerHTML = 'Look inside <code>news_article</code> — the article row carries the pointer to its publisher.'; return; }
    if (button.dataset.col !== 'news_source_id') { button.classList.add('wrong'); setTimeout(() => button.classList.remove('wrong'), 450); feedback.hidden = false; feedback.textContent = 'Which one column would let you look up the outlet that published this article?'; return; }
    feedback.hidden = true; button.classList.add('picked'); $('#s1-ws').classList.remove('locked'); $$('.card').forEach((card) => card.classList.remove('interactive')); $('#s1-link').classList.add('on'); keyInfoRevealed = true; renderInspector();
    learner('<code>news_article.news_source_id</code>'); spine('Link: <code>news_source_id</code>'); state = 'cardinality';
    teacher('That’s the column — <code>news_article.news_source_id</code>.');
    concept('Primary key / foreign key', '<code>news_article.news_source_id</code> is a <strong>foreign key</strong>. It points at <code>news_source.news_source_id</code>, the source relation’s <strong>primary key</strong>. That stored identity is the basis of the join.');
    teacher('Read the relationship off the schema in front of you: which statement best describes what can happen across these two relations?');
    ask({ prompt: 'Which statement best describes what can happen across the two relations?', options: [['correct', 'One source can publish many articles; each article has one publishing source.'], ['article-many', 'One article can have many publishing sources.'], ['source-one', 'Each source can publish only one article.'], ['many', 'An article can have many sources, and a source can have many articles.']], correct: 'correct', wrong: { 'article-many': 'An article holds just one <code>news_source_id</code>. Which direction allows “many”?', 'source-one': 'Can several articles point at the same source?', many: 'Each article holds exactly one source id.' }, onCorrect: afterCardinality });
  }

  function afterCardinality() {
    spine('Cardinality: <code>1 → M</code>'); concept('Cardinality', 'This relationship is <strong>one-to-many</strong>, written 1 → M: one <code>news_source</code> can be pointed at by many <code>news_article</code> rows.'); $('#s1-link').classList.add('cardinality'); relationshipInfoRevealed = true; renderInspector(); state = 'grain';
    teacher('The team wants a list of articles, each with its publisher. What should one returned row represent?');
    markCurrentAction();
    ask({ prompt: 'If the result should show every article with its source, what should one result row represent?', options: [['article', 'a news article'], ['source', 'a news source'], ['country', 'a country'], ['pair', 'a combination of article and source']], correct: 'article', wrong: { source: 'The request is a list of articles. What is the row about?', country: 'There is no country in either relation.', pair: 'The request organises the information around articles. What does one row stand for?' }, onCorrect: afterGrain });
  }

  function afterGrain() {
    spine('Grain: one article per row'); concept('Grain', 'The result’s <strong>grain</strong> is what a single row represents — here, <strong>one news article per row</strong>.'); state = 'baseline';
    teacher('Now measure the starting point. The prepared line on the bench counts rows in <code>news_article</code>. This is measurement, not SQL to learn.'); $('#s1-measure').hidden = false; $('#s1-ws').classList.add('dim'); $('#s1-run-measure').focus();
    markCurrentAction('#s1-measure');
  }

  function runMeasurement() {
    if (state !== 'baseline') return;
    try {
      const count = getDatabase().exec('SELECT COUNT(*) FROM news_article;')[0]?.values?.[0]?.[0];
      if (count !== 18) throw new Error(`Expected 18 article rows, received ${count}.`);
      state = 'baseline-interpret'; $('#s1-run-measure').disabled = true; $('#s1-run-note').textContent = `${count} rows returned.`;
      $('#s1-measure-out').innerHTML = `<div class="results"><div class="results-top"><span>Baseline measurement</span><span class="results-count">${count} rows</span></div><table><thead><tr><th>COUNT(*)</th></tr></thead><tbody><tr><td><b>${count}</b></td></tr></tbody></table></div>`;
      teacher(`There’s the number: <strong>${count}</strong>. But a number only helps if we know what it counts.`);
      markCurrentAction();
      ask({ prompt: `What does the number ${count} represent here?`, options: [['articles', '18 news articles'], ['sources', '18 news sources'], ['companies', '18 companies'], ['dates', '18 publication dates']], correct: 'articles', wrong: { sources: 'The measurement ran on <code>news_article</code>.', companies: 'There is no company relation here.', dates: '<code>COUNT(*)</code> counts rows, not dates.' }, onCorrect: afterInterpret });
    } catch (error) { $('#s1-measure-out').innerHTML = `<div class="diag">The database measurement could not run: ${escapeText(error.message)}</div>`; }
  }

  function afterInterpret() {
    spine('Baseline: <b>18</b> article rows'); state = 'prediction'; teacher('18 articles — our baseline. Each article points at exactly one source. What should happen to the row count when its publisher is added?');
    ask({ prompt: 'What should happen to the row count when we add each article’s source information?', options: [['exact', '18 rows — one result row for each article'], ['sources', '4 rows — one result row for each source'], ['more', 'More than 18 rows — some articles would produce multiple result rows']], correct: 'exact', wrong: { sources: 'Start from the articles: how many result rows does each article contribute?', more: 'Each article matches exactly one source. Would that multiply it?' }, onCorrect: afterPrediction });
  }

  function afterPrediction() {
    spine('Prediction: <b>18</b> rows, same grain'); state = 'semantic'; teacher('Which relational action expresses that intention and leaves the predicted grain untouched?');
    ask({ prompt: 'What relational action expresses that intention?', options: [['join', 'Combine each article with its matching source.'], ['filter', 'Keep only the article rows that pass a condition.'], ['aggregate', 'Collapse rows into counts or summaries.'], ['union', 'Stack the article rows and source rows together.']], correct: 'join', wrong: { filter: 'Filtering does not bring publisher information alongside each article.', aggregate: 'Aggregation changes the grain into a summary.', union: 'A union stacks rows; we need to combine matching rows.' }, onCorrect: afterSemantic });
  }

  function afterSemantic() {
    concept('JOIN', 'A <strong>JOIN</strong> combines rows from related relations according to the relationship between them. You chose the meaning first; now we give the operation its SQL name.'); state = 'join-teaching'; $('#s1-teaching').hidden = false;
    markCurrentAction('#s1-teaching');
    teacher('Follow three connected views on the bench: one row match, the relationship translated into <code>ON</code>, and the full query mapped back to the request.'); $('#s1-teach-board').scrollIntoView({ block: 'nearest' });
  }

  function executeSql() {
    const sql = $('#s1-sql-editor').value.trim(); const diagnostic = $('#s1-diagnostic'); diagnostic.innerHTML = ''; setExecutionStatus();
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
      renderResults(columns, values); setExecutionStatus('Verified · result satisfies the task', 'verified'); state = 'verification'; $('#s1-execute').disabled = true; teacher('The query returned a result. Read it against the prediction you made earlier — the result is evidence now, not the conclusion. What does it establish?'); askVerification();
    } catch (error) { setExecutionStatus(executed ? 'Executed · not verified' : 'Execution failed', executed ? 'executed' : 'failed'); diagnostic.innerHTML = `<div class="diag"><strong>${executed ? 'Not verified yet.' : 'SQL execution failed.'}</strong> ${escapeText(error.message)}</div>`; }
  }

  function renderResults(columns, values) {
    const head = columns.map((column) => `<th>${escapeText(column)}</th>`).join('');
    const rows = values.map((row) => `<tr>${row.map((value) => `<td>${escapeText(value ?? 'NULL')}</td>`).join('')}</tr>`).join('');
    $('#s1-result').innerHTML = `<div class="results"><div class="results-top"><span>Query result</span><span class="results-count">${values.length} rows returned</span></div><div class="results-scroll"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div><div class="results-note">All ${values.length} rows are inspectable.</div></div>`;
  }

  function askVerification() {
    const wrap = node('<div class="ask"><p class="ask-q">Select every claim the visible result supports, then commit your reading.</p><form class="ask-form verify-form"><label class="opt"><input type="checkbox" value="count"><span class="opt-mark"></span><span class="opt-text">There are 18 result rows.</span></label><label class="opt"><input type="checkbox" value="grain"><span class="opt-mark"></span><span class="opt-text">One result row still represents one article.</span></label><label class="opt"><input type="checkbox" value="source"><span class="opt-mark"></span><span class="opt-text">Source information has been added without changing the result grain.</span></label><label class="opt"><input type="checkbox" value="wrong"><span class="opt-mark"></span><span class="opt-text">The JOIN multiplied each article into several result rows.</span></label><div class="ask-actions"><button class="primary" type="submit">Check reading</button></div></form><div class="ask-error" role="alert" hidden></div></div>');
    const form = wrap.querySelector('form'); const error = wrap.querySelector('.ask-error');
    form.addEventListener('submit', (event) => { event.preventDefault(); const values = [...form.querySelectorAll('input:checked')].map((input) => input.value).sort().join(','); if (values !== 'count,grain,source') { error.hidden = false; error.textContent = 'Use the visible evidence and the grain established earlier. Which three claims describe the actual result?'; return; } wrap.replaceWith(node('<div class="learner"><span class="learner-label">You</span><span class="learner-text">18 rows · one article per row · source information added at the same grain</span></div>')); complete(); });
    add(wrap);
  }

  function complete() {
    state = 'complete'; markCurrentAction(); renderInspector(); spine('Verified: 18 rows, same grain'); teacher('Yes. The result contains 18 rows, one for each article, and each row carries the matching source information. The count stayed at 18 because each article matched one source.');
    concept('JOIN verified', 'The relationship reasoning predicted the row count and grain before the query existed; the actual result confirmed both. SQL is not the conclusion by itself — the verified meaning of its result is.');
    $('#s1-sql-editor').disabled = true; $('#s1-sql-actions').hidden = true; $('#s1-next').disabled = false;
    const completion = add(node('<div class="completion"><div class="completion-eyebrow">Success · verified result</div><h3>Stage 1 complete</h3><p>You carried one argument from request to evidence: relations, link, cardinality, grain, baseline, prediction, JOIN, <code>ON</code>, SQL, and a verified 18-row result. Source attributes were added while the result remained one row per article.</p><p class="completion-next">Continue within RouteCraft · SQL Lab to Funding participation.</p><button class="primary continue-stage" type="button">Continue to Funding participation</button></div>'));
    completion.querySelector('.continue-stage').addEventListener('click', () => onContinue?.());
    spine('Stage 1: argument closed'); $('#s1-enrich').hidden = false; $('#s1-enrich-panel').innerHTML = '<button class="enrichment-btn" id="s1-enrich-toggle">Go deeper: How the JOIN produced this result</button>';
    $('#s1-enrich-toggle').addEventListener('click', showEnrichment);
  }

  function showEnrichment() {
    $('#s1-enrich-panel').innerHTML = '<h4>From relationship to result rows</h4><p>The schema tells us which relationships are possible. The instance shows which matches actually occur. JOIN is the bridge between them.</p><div class="sample triple"><div class="sample-card"><div class="sample-head">news_article row</div><div class="sample-row">article + source_id</div></div><div class="sample-arrow">+</div><div class="sample-card"><div class="sample-head">news_source row</div><div class="sample-row">source_id + name</div></div><div class="sample-arrow">→</div><div class="sample-card"><div class="sample-head">result row</div><div class="sample-row">title + source_name</div></div></div><p><strong>What <code>ON</code> expresses:</strong> the relationship already established in the schema. It does not invent that relationship; it names it.</p><p><strong>What the result preserves:</strong> one row per article. A Venn view can help with inclusion and exclusion, but it does not explain grain or row multiplication.</p>';
  }

  $('#s1-catalog').addEventListener('click', (event) => {
    const inspect = event.target.closest('.inspect-relation'); const card = event.target.closest('.catalog-card');
    if (inspect && card) { openInspector(card.dataset.rel); return; }
    if (!event.target.closest('.catalog-select') || !card || state !== 'relations') return; const relation = card.dataset.rel;
    if (!['news_article', 'news_source'].includes(relation)) { $('#s1-catalog-feedback').hidden = false; $('#s1-catalog-feedback').textContent = 'That relation does not carry either part of this request. Look for articles and their publishers.'; return; }
    $('#s1-catalog-feedback').hidden = true;
    if (selected.has(relation)) { selected.delete(relation); card.classList.remove('selected'); card.querySelector('.catalog-status').textContent = 'add'; } else { selected.add(relation); card.classList.add('selected'); card.querySelector('.catalog-status').textContent = 'on bench'; }
    renderRelations(); if (selected.has('news_article') && selected.has('news_source')) setTimeout(beginConnection, 220);
  });
  $$('.card .inspect-relation').forEach((button) => button.addEventListener('click', () => openInspector(button.closest('.card').dataset.rel)));
  $$('.col').forEach((button) => button.addEventListener('click', () => onColumn(button)));
  $('#s1-run-measure').addEventListener('click', runMeasurement);
  $$('.beat-next').forEach((button) => button.addEventListener('click', () => { const next = button.dataset.next; $$('.teach-step').forEach((step) => step.classList.toggle('active', step.dataset.step === next)); teacher(next === '2' ? 'You traced the row match. Now watch the relationship become a condition SQL can execute.' : 'The operation, its match rule, and the business meaning now line up. Write that argument as SQL.'); }));
  $('#s1-to-sql').addEventListener('click', () => { state = 'sql'; $('#s1-sql').hidden = false; $('#s1-teaching').hidden = true; markCurrentAction('#s1-sql'); renderInspector(); teacher('The Workbench is yours now. Write the query that implements the relationship and preserves the grain you predicted.'); $('#s1-sql-editor').focus(); });
  $('#s1-assist-button').addEventListener('click', () => { const assist = $('#s1-assist'); assist.hidden = !assist.hidden; assist.innerHTML = '<div class="assist"><strong>Nudge:</strong> Start from <code>news_article</code>. Bring in <code>news_source</code> with <code>JOIN</code>, then compare the article foreign key with the source primary key in <code>ON</code>.</div>'; });
  $('#s1-solution-button').addEventListener('click', () => { $('#s1-sql-editor').value = SOLUTION; setExecutionStatus('Not executed', 'idle'); $('#s1-sql-editor').focus(); $('#s1-diagnostic').innerHTML = '<div class="assist">The solution is now in the editor. It has not run, and the stage has not advanced.</div>'; });
  $('#s1-inspector').addEventListener('click', (event) => { if (event.target.closest('.inspector-close')) closeInspector(); });
  $('#s1-inspector-insert').addEventListener('click', insertInspectedRelation);
  $('#s1-spine-toggle').addEventListener('click', () => setThreadCollapsed(!root.firstElementChild.classList.contains('thread-collapsed')));
  $('#s1-next').addEventListener('click', () => { if (state === 'complete') onContinue?.(); });
  $('#s1-sql-editor').addEventListener('keydown', (event) => { if (!event.isComposing && event.key === 'Enter' && (event.ctrlKey || event.metaKey)) { event.preventDefault(); executeSql(); } });
  $('#s1-sql-editor').addEventListener('input', () => { if (state === 'sql') setExecutionStatus('Not executed', 'idle'); });
  $('#s1-execute').addEventListener('click', executeSql); $('#s1-restart').addEventListener('click', reset);
  reset();
  return { restart: reset };
}

function escapeText(value) { return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]); }
