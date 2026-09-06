import ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/ext-language_tools';
import initSqlJs from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import './styles.css';
import { createStage1 } from './stage1.js';

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
let stage1;
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
    runButton.disabled = false; resetButton.disabled = false;
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
  for (const table of schema) {
    const matches = !filter || table.name.toLowerCase().includes(filter) || table.columns.some(c => c.column.toLowerCase().includes(filter));
    if (!matches) continue;
    const details = document.createElement('details'); details.className = 'relation'; details.open = Boolean(filter);
    const summary = document.createElement('summary'); summary.title = 'Double-click to insert relation name';
    summary.innerHTML = `<span class="relation-name">${escapeHtml(table.name)}</span><span class="count">${table.columns.length} columns</span>`;
    summary.addEventListener('dblclick', (event) => { event.preventDefault(); insertAtCursor(table.name); });
    details.append(summary);
    const body = document.createElement('div'); body.className = 'relation-body';
    for (const column of table.columns) {
      if (filter && !table.name.toLowerCase().includes(filter) && !column.column.toLowerCase().includes(filter)) continue;
      const item = document.createElement('div'); item.className = 'schema-item'; item.title = 'Double-click to insert column name';
      item.innerHTML = `<span>${escapeHtml(column.column)}</span> <span class="type">${escapeHtml(column.type)}</span>${column.pk ? '<span class="badge">PK</span>' : ''}`;
      item.addEventListener('dblclick', () => insertAtCursor(column.column)); body.append(item);
    }
    for (const foreignKey of table.foreignKeys) {
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
  editor = ace.edit('editor'); editor.setTheme('ace/theme/tomorrow_night'); editor.session.setMode('ace/mode/sql');
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
  if (!resultSets.length) { container.innerHTML = '<p class="empty">Statement executed successfully. No rows returned.</p>'; el('result-meta').textContent = 'No rows returned'; return; }
  const result = resultSets.at(-1), { columns, values } = result;
  el('result-meta').textContent = `${values.length} row${values.length === 1 ? '' : 's'} · ${columns.length} column${columns.length === 1 ? '' : 's'}`;
  const table = document.createElement('table'), head = document.createElement('thead'), row = document.createElement('tr');
  for (const column of columns) { const cell = document.createElement('th'); cell.textContent = column; row.append(cell); } head.append(row); table.append(head);
  const body = document.createElement('tbody');
  for (const valuesRow of values) { const tr = document.createElement('tr'); for (const value of valuesRow) { const td = document.createElement('td'); if (value === null) { td.textContent = 'NULL'; td.className = 'null'; } else td.textContent = String(value); tr.append(td); } body.append(tr); }
  table.append(body); container.append(table);
}

function runCurrentQuery() {
  clearError(); if (!db) return;
  const statement = selectedOrCurrent();
  if (!statement.trim()) { showError('No SQL to run', 'Select SQL or place the cursor within a statement.'); return; }
  try {
    const resultSets = db.exec(statement);
    resultTable(resultSets);
    stage1?.handleSqlSuccess(statement, resultSets);
  } catch (error) { showError('SQL error', error, statement); }
}

el('run-query').addEventListener('click', runCurrentQuery);
el('clear-results').addEventListener('click', () => { el('result-content').innerHTML = '<p class="empty">Results cleared.</p>'; el('result-meta').textContent = 'No query run'; clearError(); });
el('reset-db').addEventListener('click', loadDatabase);
el('schema-search').addEventListener('input', renderSchema);
configureEditor();
stage1 = createStage1({ editor, getDatabase: () => db });
SQL = await initSqlJs({ locateFile: () => wasmUrl });
db = new SQL.Database();
await loadDatabase();
