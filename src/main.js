import ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/ext-language_tools';
import initSqlJs from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import './styles.css';
import './course-navigation.css';
import { createStage1Prototype } from './stage1-prototype-runtime.js';
import { createStage2Prototype } from './stage2-prototype-runtime.js';
import { createInnerJoinUnmatched } from './inner-join-unmatched.js';
import { createInteractionLifecycle } from './interaction-lifecycle.js';

const SOURCE_FILES = [
  '/startup-ecosystem/startup-ecosystem-schema.sql',
  '/startup-ecosystem/startup-ecosystem-seed.sql',
];
const STORAGE_KEY = 'sql-lab-editor-text-v1';
const KEYWORDS = ['SELECT','FROM','WHERE','JOIN','INNER JOIN','LEFT JOIN','ON','GROUP BY','HAVING','ORDER BY','LIMIT','AS','WITH','RECURSIVE','INSERT','UPDATE','DELETE','CREATE','DROP','ALTER','UNION','ALL','DISTINCT','EXISTS','NOT EXISTS','CASE','WHEN','THEN','ELSE','END','NULL','AND','OR','IN','LIKE','COUNT','SUM','AVG','MIN','MAX','OVER','PARTITION BY','ROWS'];
const ENCOUNTER_SOLUTIONS = {
  'media-coverage': `SELECT
  news_article.title,
  news_source.name AS source_name
FROM news_article
JOIN news_source
  ON news_article.news_source_id = news_source.news_source_id;`,
  'funding-participation': `SELECT
  funding_round.funding_round_id,
  funding_round.round_type,
  funding_round.announced_date,
  round_investment.round_investment_id,
  round_investment.investor_id,
  round_investment.is_lead
FROM funding_round
JOIN round_investment
  ON funding_round.funding_round_id = round_investment.funding_round_id;`,
  'inner-join-unmatched': `SELECT
  company.company_id,
  company.status,
  funding_round.funding_round_id,
  funding_round.round_type,
  funding_round.announced_date
FROM company
JOIN funding_round
  ON company.company_id = funding_round.company_id;`,
};

let SQL;
let db;
let schema = [];
let editor;
let activeEncounter;
let activeEncounterName = 'media-coverage';
let stage2Experience;
let innerJoinUnmatchedEncounter;
const encounterEditorText = { 'media-coverage': '', 'funding-participation': '', 'inner-join-unmatched': '' };
const encounterResults = { 'media-coverage': null, 'funding-participation': null, 'inner-join-unmatched': null };

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
function showSqlDiagnostic(title, error, statement = '') {
  const panel = el('sql-diagnostic');
  const text = error instanceof Error ? error.message : String(error);
  panel.hidden = false;
  panel.textContent = '';
  const heading = document.createElement('strong');
  heading.textContent = `${title}.`;
  panel.append(heading, document.createTextNode(` ${text}`));
  if (statement) {
    const detail = document.createElement('small');
    detail.textContent = `Statement: ${compact(statement, 260)}`;
    panel.append(document.createElement('br'), detail);
  }
}
function clearSqlDiagnostic() {
  const panel = el('sql-diagnostic');
  panel.hidden = true;
  panel.textContent = '';
}
function escapeHtml(value) { return String(value).replace(/[&<>'\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c])); }
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
  clearError(); clearSqlDiagnostic(); if (!db) return;
  if (activeEncounter?.canRunSql && !activeEncounter.canRunSql()) {
    showSqlDiagnostic('SQL is not available yet', 'Complete the required reasoning before using SQL for verification.');
    return;
  }
  const statement = selectedOrCurrent();
  if (!statement.trim()) { showSqlDiagnostic('No SQL to run', 'Select SQL or place the cursor within a statement.'); return; }
  try {
    const resultSets = db.exec(statement);
    resultTable(resultSets);
    activeEncounter?.handleSqlSuccess?.(statement, resultSets);
  } catch (error) { showSqlDiagnostic('SQL error', error, statement); }
}

function showActiveSolution(event) {
  event?.stopImmediatePropagation();
  const learningPanel = document.querySelector('.learning-panel');
  if (!learningPanel.matches('.sql-implementation-active, .cycle1-sql-active')) return;
  const solution = ENCOUNTER_SOLUTIONS[activeEncounterName];
  if (!solution) return;
  clearSqlDiagnostic();
  editor.setValue(solution, -1);
  editor.focus();
}

function ensureSqlSolutionControls() {
  const editorActions = document.querySelector('.editor-actions');
  if (!el('show-solution')) {
    const button = document.createElement('button');
    button.id = 'show-solution';
    button.type = 'button';
    button.className = 'sql-solution-button';
    button.textContent = 'Show solution';
    button.addEventListener('click', showActiveSolution);
    editorActions.insertBefore(button, runButton);
  }
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
      <button type="button" class="course-chapter-button" data-chapter="media-coverage">Media coverage</button>
      <button type="button" class="course-chapter-button" data-chapter="funding-participation">Funding participation</button>
      <button type="button" class="course-chapter-button" data-chapter="inner-join-unmatched">INNER JOIN · 0 matches</button>
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
  clearSqlDiagnostic();
}

function resetLearningPanelState() {
  const learningPanel = document.querySelector('.learning-panel');
  delete learningPanel.dataset.stage1State;
  delete learningPanel.dataset.stage2State;
  delete learningPanel.dataset.stage3State;
  learningPanel.classList.remove(
    'sql-active',
    'baseline-workspace-active',
    'baseline-evidence-active',
    'prediction-evidence-active',
    'join-teaching-active',
    'sql-implementation-active',
    'results-evidence-active',
    'cycle1-sql-active',
    'cycle1-results-active',
    'cycle1-verification-active',
  );
}

function applyMediaCoverageShell() {
  document.title = 'SQL Lab · Media coverage';
  const stageLabel = document.querySelector('.stage-label');
  stageLabel.hidden = true;
  el('business-request-title').textContent = 'The research team is reviewing media coverage and wants every article to include the source that published it.';
  document.querySelector('.working-schema-header .eyebrow').textContent = 'Reasoning surface';
  resetLearningPanelState();
}

function applyFundingParticipationShell() {
  document.title = 'SQL Lab · Funding participation';
  document.querySelector('.stage-label').hidden = true;
  el('business-request-title').textContent = 'The investment team wants to review every recorded investor participation with its funding round type, announced date, investor, and lead status.';
  document.querySelector('.working-schema-header .eyebrow').textContent = 'Reasoning surface';
  el('working-schema-status').textContent = 'Build it from the Live Schema';
  resetLearningPanelState();
}

function applyInnerJoinUnmatchedShell() {
  document.title = 'SQL Lab · INNER JOIN unmatched rows';
  document.querySelector('.stage-label').hidden = true;
  el('business-request-title').textContent = 'The investment team wants a table of companies that have recorded funding rounds, with each company\'s status alongside the round type and announced date.';
  document.querySelector('.working-schema-header .eyebrow').textContent = 'Reasoning surface';
  el('working-schema-status').textContent = 'Build it from the Live Schema';
  resetLearningPanelState();
}

function activateMediaCoverageEncounter() {
  if (activeEncounterName !== 'media-coverage') saveEncounterSurface();
  activeEncounterName = 'media-coverage';
  clearError();
  activeEncounter = null;
  el('stage2-root').hidden = true;
  el('app').hidden = true;
  el('stage1-root').hidden = false;
  document.title = 'RouteCraft · Media coverage';
}

function activateFundingParticipationEncounter() {
  if (activeEncounterName === 'funding-participation' && !el('stage2-root').hidden) return;
  if (activeEncounterName !== 'funding-participation') saveEncounterSurface();
  activeEncounterName = 'funding-participation';
  el('stage1-root').hidden = true;
  el('stage2-root').hidden = false;
  el('app').hidden = true;
  clearError();
  activeEncounter = null;
  document.title = 'RouteCraft · Funding participation';
  if (!stage2Experience) stage2Experience = createStage2Prototype({ root: el('stage2-root'), getDatabase: () => db });
}

function activateInnerJoinUnmatchedEncounter() {
  if (activeEncounterName === 'inner-join-unmatched') return;
  saveEncounterSurface();
  activeEncounterName = 'inner-join-unmatched';
  el('stage1-root').hidden = true;
  el('stage2-root').hidden = true;
  el('app').hidden = false;
  clearError();
  resetEncounterDom();
  applyInnerJoinUnmatchedShell();
  editor.setValue(encounterEditorText['inner-join-unmatched'] || '', -1);
  restoreEncounterResults('inner-join-unmatched');

  if (!innerJoinUnmatchedEncounter) {
    innerJoinUnmatchedEncounter = createInnerJoinUnmatched({
      editor,
      getDatabase: () => db,
      getSchema: () => schema,
      onSelectionChange: renderSchema,
      interactionLifecycle,
    });
  }
  activeEncounter = innerJoinUnmatchedEncounter;
  activeEncounter.refresh?.();
  renderSchema();
  updateChapterNavigation();
  el('stage-scroll').scrollTop = 0;
}

function activateEncounter(name) {
  if (name === 'media-coverage') activateMediaCoverageEncounter();
  else if (name === 'funding-participation') activateFundingParticipationEncounter();
  else if (name === 'inner-join-unmatched') activateInnerJoinUnmatchedEncounter();
}

el('run-query').addEventListener('click', runCurrentQuery);
el('clear-results').addEventListener('click', () => { clearRenderedResults({ forget: true }); clearError(); clearSqlDiagnostic(); });
el('reset-db').addEventListener('click', loadDatabase);
el('schema-search').addEventListener('input', renderSchema);

configureEditor();
ensureSqlSolutionControls();
ensureChapterNavigation();
const interactionLifecycle = createInteractionLifecycle({ currentElement: el('current-step'), completedElement: el('completed-steps') });
activeEncounter = null;
SQL = await initSqlJs({ locateFile: () => wasmUrl });
db = new SQL.Database();
await loadDatabase();
createStage1Prototype({ root: el('stage1-root'), getDatabase: () => db, onContinue: activateFundingParticipationEncounter });
activateMediaCoverageEncounter();
