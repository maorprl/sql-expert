import ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/ext-language_tools';
import initSqlJs from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import './styles.css';
import './course-navigation.css';
import { createStage1 } from './stage1.js';
import { createCycle1 } from './cycle1.js';
import { createInteractionLifecycle } from './interaction-lifecycle.js';

const SOURCE_FILES = [
  '/startup-ecosystem/startup-ecosystem-schema.sql',
  '/startup-ecosystem/startup-ecosystem-seed.sql',
];
const STORAGE_KEY = 'sql-lab-editor-text-v1';
const KEYWORDS = ['SELECT','FROM','WHERE','JOIN','INNER JOIN','LEFT JOIN','ON','GROUP BY','HAVING','ORDER BY','LIMIT','AS','WITH','RECURSIVE','INSERT','UPDATE','DELETE','CREATE','DROP','ALTER','UNION','ALL','DISTINCT','EXISTS','NOT EXISTS','CASE','WHEN','THEN','ELSE','END','NULL','AND','OR','IN','LIKE','COUNT','SUM','AVG','MIN','MAX','OVER','PARTITION BY','ROWS'];

let SQL;
let db;
let schema = [];
let editor;
let activeEncounter;
let activeEncounterName = 'stage1';
let stage1;
let rowMultiplicationEncounter;
const encounterEditorText = { stage1: '', 'row-multiplication': '' };
const encounterResults = { stage1: null, 'row-multiplication': null };

const el = (id) => document.getElementById(id);
const status = el('db-status');
const errorPanel = el('error-panel');
const runButton = el('run-query');
const resetButton = el('reset-db');
const clearButton = el('clear-results');

function setStatus(message, kind = '') { status.textContent = message; status.className = `status ${kind}`; }
function showError(title, error, statement = '') {
  const text = error instanceof Error ? error.message : String(error);
  const near = text.match(/near\s+(["'][^"']+["'])/i)?.[0];
  errorPanel.hidden = false;
  errorPanel.innerHTML = `<strong>${escapeHtml(title)}.</strong> ${escapeHtml(text)}${near ? `<br><small>${escapeHtml(near)}</small>` : ''}${statement ? `<br><small>Statement: ${escapeHtml(compact(statement, 260))}</small>` : ''}`;
}
function clearError() { errorPanel.hidden = true; errorPanel.textContent = ''; }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function compact(value, length) { return value.replace(/\s+/g, ' ').trim().slice(0, length); }

async function loadDatabase() {
  clearError(); setStatus('Loading database…');
  runButton.disabled = true; resetButton.disabled = true;
  try {
    const sources = await Promise.all(SOURCE_FILES.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Could not load ${url} (${response.status})`);
      return response.text();
    }));
    const fresh = new db.constructor();
    for (const source of sources) fresh.run(source);
    const check = fresh.exec('SELECT COUNT(*) AS company_count FROM company;');
    if (check[0]?.values?.[0]?.[0] !== 12) throw new Error('Initialization verification failed: company count was not 12.');
    db?.close(); db = fresh;
    schema = readSchema(db);
    renderSchema();
    setStatus('Database ready', 'ready');
    resetButton.disabled = false;
    activeEncounter?.refresh?.();
  } catch (error) {
    setStatus('Database failed to initialize', 'failed');
    showError('Database initialization failed', error);
  }
}

function quoteIdentifier(name) { return `"${name.replaceAll('"', '""')}"`; }
function readSchema(database) {
  const tables = database.exec("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name;")[0]?.values ?? [];
  return tables.map(([name]) => {
    const columns = (database.exec(`PRAGMA table_info(${quoteIdentifier(name)})`)[0]?.values ?? []).map(([cid, column, type, notNull, defaultValue, pk]) => ({ column, type: type || '—', pk: Boolean(pk), notNull: Boolean(notNull), defaultValue }));
    const foreignKeys = (database.exec(`PRAGMA foreign_key_list(${quoteIdentifier(name)})`)[0]?.values ?? []).map(([, , refTable, from, to]) => ({ from, refTable, to }));
    return { name, columns, foreignKeys };
  });
}

function renderSchema() {
  const filter = el('schema-search').value.trim().toLowerCase();
  const viewer = el('schema-viewer'); viewer.textContent = '';
  const relationshipLevel = activeEncounter?.relationshipLevel?.() ?? 0;
  const canAddRelations = activeEncounter?.canAddRelations?.() ?? true;
  for (const table of schema) {
    const matches = !filter || table.name.toLowerCase().includes(filter) || table.columns.some(c => c.column.toLowerCase().includes(filter));
    if (!matches) continue;
    const details = document.createElement('details'); details.className = 'relation'; details.open = Boolean(filter);
    const summary = document.createElement('summary'); summary.title = 'Double-click to insert relation name';
    const selected = activeEncounter?.isRelationSelected?.(table.name) ?? false;
    summary.innerHTML = `<span class="relation-name">${escapeHtml(table.name)}</span><span class="count">${table.columns.length} columns</span><button type="button" class="add-relation" ${selected || !canAddRelations ? 'disabled' : ''} ${canAddRelations ? '' : 'hidden'} aria-label="Add ${escapeHtml(table.name)} to working schema">${selected ? 'Added' : '+'}</button>`;
    summary.addEventListener('dblclick', (event) => { event.preventDefault(); insertAtCursor(table.name); });
    summary.querySelector('.add-relation').addEventListener('click', (event) => { event.preventDefault(); event.stopPropagation(); activeEncounter?.addRelation?.(table.name); });
    details.append(summary);
    const body = document.createElement('div'); body.className = 'relation-body';
    for (const column of table.columns) {
      if (filter && !table.name.toLowerCase().includes(filter) && !column.column.toLowerCase().includes(filter)) continue;
      const item = document.createElement('div'); item.className = 'schema-item'; item.title = 'Double-click to insert column name';
      item.innerHTML = `<span>${escapeHtml(column.column)}</span> <span class="type">${escapeHtml(column.type)}</span>${relationshipLevel > 0 && column.pk ? '<span class="badge">PK</span>' : ''}`;
      item.addEventListener('dblclick', () => insertAtCursor(column.column)); body.append(item);
    }
    if (relationshipLevel > 0) for (const foreignKey of table.foreignKeys) {
      const line = document.createElement('span'); line.className = 'fk'; line.textContent = `FK ${foreignKey.from} → ${foreignKey.refTable}.${foreignKey.to}`; body.append(line);
    }
    details.append(body); viewer.append(details);
  }
}

function insertAtCursor(text) {
  const position = editor.getCursorPosition();
  editor.session.insert(position, text);
  editor.moveCursorTo(position.row, position.column + text.length);
  editor.focus();
}

function getAliases(sql) {
  const aliases = new Map();
  const matcher = /\b(?:from|join)\s+([\w"]+)(?:\s+(?:as\s+)?([\w]+))?/gi;
  for (const match of sql.matchAll(matcher)) {
    const table = match[1].replaceAll('"', ''); const alias = match[2];
    if (schema.some(item => item.name === table)) aliases.set(alias || table, table);
  }
  return aliases;
}

function configureEditor() {
  ace.require('ace/ext/language_tools');
  editor = ace.edit('editor'); editor.setTheme('ace/theme/tomorrow_night'); editor.session.setMode('ace/mode-sql');
  editor.setOptions({ enableBasicAutocompletion: true, enableLiveAutocompletion: true, enableSnippets: false, showPrintMargin: false, fontSize: 14, tabSize: 2, useSoftTabs: true });
  editor.setValue(localStorage.getItem(STORAGE_KEY) || '', -1);
  editor.session.on('change', () => localStorage.setItem(STORAGE_KEY, editor.getValue()));
  editor.commands.addCommand({ name:'runSql', bindKey:{ win:'Ctrl-Enter', mac:'Command-Enter' }, exec: runCurrentQuery });
  const tools = ace.require('ace/ext/language_tools');
  tools.addCompleter({
    identifierRegexps: [/[a-zA-Z_0-9.$]/],
    getCompletions(instance, session, position, prefix, callback) {
      const before = session.getTextRange({ start:{row:0,column:0}, end:position });
      const line = session.getLine(position.row).slice(0, position.column);
      const aliases = getAliases(before);
      const aliasMatch = line.match(/\b([\w]+)\.([\w]*)$/);
      let words;
      if (aliasMatch && aliases.has(aliasMatch[1])) words = schema.find(t => t.name === aliases.get(aliasMatch[1])).columns.map(c => `${aliasMatch[1]}.${c.column}`);
      else if (/\b(from|join)\s+[\w]*$/i.test(line)) words = schema.map(t => t.name);
      else words = [...KEYWORDS, ...schema.map(t => t.name), ...schema.flatMap(t => t.columns.map(c => c.column)), ...[...aliases.entries()].flatMap(([alias, table]) => schema.find(t => t.name === table).columns.map(c => `${alias}.${c.column}`))];
      const unique = [...new Set(words)].map(value => ({ caption:value, value, meta: KEYWORDS.includes(value) ? 'keyword' : 'schema', score: KEYWORDS.includes(value) ? 900 : 700 }));
      callback(null, unique);
    },
  });
}

function statementAtCursor(text, index) {
  const statements = []; let start = 0, quote = null, lineComment = false, blockComment = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i], next = text[i + 1];
    if (lineComment) { if (char === '\n') lineComment = false; continue; }
    if (blockComment) { if (char === '*' && next === '/') { blockComment = false; i++; } continue; }
    if (quote) { if (char === quote) { if (next === quote && quote === "'") i++; else quote = null; } continue; }
    if (char === '-' && next === '-') { lineComment = true; i++; continue; }
    if (char === '/' && next === '*') { blockComment = true; i++; continue; }
    if (char === "'" || char === '"' || char === '`') { quote = char; continue; }
    if (char === ';') { statements.push({ start, end:i + 1, text:text.slice(start, i + 1) }); start = i + 1; }
  }
  if (text.slice(start).trim()) statements.push({ start, end:text.length, text:text.slice(start) });
  return statements.find(s => index >= s.start && index <= s.end && s.text.trim()) || statements.find(s => s.text.trim()) || null;
}

function selectedOrCurrent() {
  const selection = editor.getSelectedText(); if (selection.trim()) return selection;
  const cursor = editor.session.doc.positionToIndex(editor.getCursorPosition());
  return statementAtCursor(editor.getValue(), cursor)?.text || '';
}

function resultTable(resultSets) {
  const container = el('result-content'); container.textContent = '';
  clearButton.disabled = false;
  encounterResults[activeEncounterName] = resultSets;
  if (!resultSets.length) { container.innerHTML = '<p class="empty">Statement executed successfully. No rows returned.</p>'; el('result-meta').textContent = 'No rows returned'; return; }
  const result = resultSets.at(-1), { columns, values } = result;
  el('result-meta').textContent = `${values.length} row${values.length === 1 ? '' : 's'} · ${columns.length} column${columns.length === 1 ? '' : 's'}`;
  const table = document.createElement('table'), head = document.createElement('thead'), row = document.createElement('tr');
  for (const column of columns) { const cell = document.createElement('th'); cell.textContent = column; row.append(cell); } head.append(row); table.append(head);
  const body = document.createElement('tbody');
  for (const valuesRow of values) { const tr = document.createElement('tr'); for (const value of valuesRow) { const td = document.createElement('td'); if (value === null) { td.textContent = 'NULL'; td.className = 'null'; } else td.textContent = String(value); tr.append(td); } body.append(tr); }
  table.append(body); container.append(table);
}

function clearRenderedResults({ forget = false } = {}) {
  el('result-content').innerHTML = '<p class="empty">Results will appear here.</p>';
  el('result-meta').textContent = 'No query run';
  clearButton.disabled = true;
  if (forget) encounterResults[activeEncounterName] = null;
}

function restoreEncounterResults(name) {
  const resultSets = encounterResults[name];
  if (resultSets) resultTable(resultSets);
  else clearRenderedResults();
}

function runCurrentQuery() {
  clearError(); if (!db) return;
  if (activeEncounter?.canRunSql && !activeEncounter.canRunSql()) {
    showError('SQL is not available yet', 'Complete the required reasoning before using SQL for verification.');
    return;
  }
  const statement = selectedOrCurrent();
  if (!statement.trim()) { showError('No SQL to run', 'Select SQL or place the cursor within a statement.'); return; }
  try {
    const resultSets = db.exec(statement);
    resultTable(resultSets);
    activeEncounter?.handleSqlSuccess?.(statement, resultSets);
    const learningPanel = document.querySelector('.learning-panel');
    if (!learningPanel.matches('.sql-implementation-active, .cycle1-sql-active')) hideSqlSolutionSurface();
  } catch (error) { showError('SQL error', error, statement); }
}

function showStage1Solution() {
  const learningPanel = document.querySelector('.learning-panel');
  if (activeEncounterName !== 'stage1' || !learningPanel.classList.contains('sql-implementation-active')) return;
  const panel = el('solution-panel');
  panel.innerHTML = `<div class="solution-panel-heading"><span>Solution assistance</span><button id="close-solution" type="button" aria-label="Close solution">Close</button></div><div class="solution-panel-body"><strong>Solution SQL:</strong><pre>SELECT
  news_article.title,
  news_source.name AS source_name
FROM news_article
JOIN news_source
  ON news_article.news_source_id = news_source.news_source_id;</pre><p>This is assistance only. It has not been inserted or run.</p></div>`;
  panel.hidden = false;
  el('close-solution').addEventListener('click', hideSqlSolutionSurface);
}

function ensureSqlSolutionControls() {
  const editorActions = document.querySelector('.editor-actions');
  if (!el('show-solution')) {
    const button = document.createElement('button');
    button.id = 'show-solution';
    button.type = 'button';
    button.className = 'sql-solution-button';
    button.textContent = 'Show solution';
    button.addEventListener('click', showStage1Solution);
    editorActions.insertBefore(button, runButton);
  }
  if (!el('solution-panel')) {
    const panel = document.createElement('section');
    panel.id = 'solution-panel';
    panel.className = 'solution-panel sql-solution-panel';
    panel.hidden = true;
    panel.setAttribute('aria-live', 'polite');
    el('lab-workspace').append(panel);
  }
}

function hideSqlSolutionSurface() {
  const panel = el('solution-panel');
  if (!panel) return;
  panel.hidden = true;
  panel.innerHTML = '';
}

function ensureChapterNavigation() {
  if (el('course-chapter-nav')) return;
  const nav = document.createElement('nav');
  nav.id = 'course-chapter-nav';
  nav.className = 'course-chapter-nav';
  nav.setAttribute('aria-label', 'Course chapters');
  nav.innerHTML = `
    <span class="course-chapter-nav-label">Chapters</span>
    <div class="course-chapter-list">
      <button type="button" class="course-chapter-button" data-chapter="stage1">Media coverage</button>
      <button type="button" class="course-chapter-button" data-chapter="row-multiplication">Funding participation</button>
    </div>`;
  document.querySelector('.topbar').insertAdjacentElement('afterend', nav);
  nav.querySelectorAll('[data-chapter]').forEach((button) => button.addEventListener('click', () => activateEncounter(button.dataset.chapter)));
}

function updateChapterNavigation() {
  document.querySelectorAll('[data-chapter]').forEach((button) => {
    const active = button.dataset.chapter === activeEncounterName;
    if (active) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  });
}

function saveEncounterSurface() {
  if (!editor || !activeEncounterName) return;
  encounterEditorText[activeEncounterName] = editor.getValue();
}

function resetEncounterDom() {
  document.getElementById('workspace-evidence-action')?.remove();
  el('completed-steps').innerHTML = '';
  el('current-step').innerHTML = '';
  el('relation-preview').innerHTML = '';
  hideSqlSolutionSurface();
}

function applyStage1Shell() {
  document.title = 'SQL Lab · Media coverage';
  const stageLabel = document.querySelector('.stage-label');
  stageLabel.hidden = true;
  el('business-request-title').textContent = 'The research team is reviewing media coverage and needs article details together with information about the sources that published them.';
  document.querySelector('.working-schema-header .eyebrow').textContent = 'Reasoning surface';
  document.querySelector('.learning-panel').classList.remove('cycle1-sql-active', 'cycle1-results-active', 'cycle1-verification-active');
}

function applyRowMultiplicationShell() {
  document.title = 'SQL Lab · Funding participation';
  document.querySelector('.stage-label').hidden = true;
  el('business-request-title').textContent = 'The investment team is reviewing participation in funding rounds and needs funding-round context together with recorded investor-participation details.';
  document.querySelector('.working-schema-header .eyebrow').textContent = 'Reasoning surface';
  el('working-schema-status').textContent = 'Build it from the Live Schema';
  document.querySelector('.learning-panel').classList.remove(
    'sql-active',
    'baseline-workspace-active',
    'baseline-evidence-active',
    'prediction-evidence-active',
    'join-teaching-active',
    'sql-implementation-active',
    'results-evidence-active',
  );
}

function activateStage1() {
  if (activeEncounterName === 'stage1') return;
  saveEncounterSurface();
  activeEncounterName = 'stage1';
  clearError();
  resetEncounterDom();
  applyStage1Shell();
  activeEncounter = stage1;
  editor.setValue(encounterEditorText.stage1 || '', -1);
  restoreEncounterResults('stage1');
  activeEncounter.refresh?.();
  renderSchema();
  updateChapterNavigation();
  el('stage-scroll').scrollTop = 0;
}

function activateRowMultiplicationEncounter() {
  if (activeEncounterName === 'row-multiplication') return;
  saveEncounterSurface();
  activeEncounterName = 'row-multiplication';
  clearError();
  resetEncounterDom();
  applyRowMultiplicationShell();
  editor.setValue(encounterEditorText['row-multiplication'] || '', -1);
  restoreEncounterResults('row-multiplication');

  if (!rowMultiplicationEncounter) {
    rowMultiplicationEncounter = createCycle1({
      editor,
      getDatabase: () => db,
      getSchema: () => schema,
      onSelectionChange: renderSchema,
      interactionLifecycle,
    });
  }
  activeEncounter = rowMultiplicationEncounter;
  activeEncounter.refresh?.();
  renderSchema();
  updateChapterNavigation();
  el('stage-scroll').scrollTop = 0;
}

function activateEncounter(name) {
  if (name === 'stage1') activateStage1();
  else if (name === 'row-multiplication') activateRowMultiplicationEncounter();
}

el('run-query').addEventListener('click', runCurrentQuery);
el('clear-results').addEventListener('click', () => { clearRenderedResults({ forget: true }); clearError(); });
el('reset-db').addEventListener('click', loadDatabase);
el('schema-search').addEventListener('input', renderSchema);

configureEditor();
ensureSqlSolutionControls();
ensureChapterNavigation();
applyStage1Shell();
const interactionLifecycle = createInteractionLifecycle({ currentElement: el('current-step'), completedElement: el('completed-steps') });
stage1 = createStage1({ editor, getDatabase: () => db, getSchema: () => schema, onSelectionChange: renderSchema, interactionLifecycle });
activeEncounter = stage1;
updateChapterNavigation();
SQL = await initSqlJs({ locateFile: () => wasmUrl });
db = new SQL.Database();
await loadDatabase();