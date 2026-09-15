import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

const [html, styles, main, stage1, stage2, stage3] = await Promise.all([
  read('index.html'),
  read('src/styles.css'),
  read('src/main.js'),
  read('src/media-coverage.js'),
  read('src/funding-participation.js'),
  read('src/inner-join-unmatched.js'),
]);

function functionBody(source, name) {
  const start = source.indexOf(`function ${name}`);
  assert.notEqual(start, -1, `Expected function ${name}`);
  const next = source.indexOf('\n  function ', start + 1);
  return source.slice(start, next === -1 ? source.length : next);
}

test('R owns the persistent workspace, schema, and SQL diagnostic surfaces', () => {
  const implementationStart = html.indexOf('<div class="implementation-column">');
  const schema = html.indexOf('id="working-schema-title"');
  const workspace = html.indexOf('id="lab-workspace"');
  const diagnostic = html.indexOf('id="sql-diagnostic"');
  assert.ok(implementationStart !== -1 && implementationStart < schema);
  assert.ok(schema < workspace && workspace < diagnostic);
  assert.doesNotMatch(styles, /display:\s*contents/);
  assert.doesNotMatch(styles, /grid-template-areas/);
});

test('field selection remains local to Working Schema in every stage', () => {
  for (const source of [stage1, stage2, stage3]) {
    const connection = functionBody(source, 'renderConnection');
    assert.match(connection, /renderConnectionAction/);
    assert.match(source, /className = 'working-schema-action'/);
    assert.match(source, /continue-after-connection/);
  }
});

test('Stage 2 ordinary prediction and application reasoning stay in L', () => {
  assert.match(functionBody(stage2, 'renderPrediction'), /choiceQuestion/);
  assert.doesNotMatch(functionBody(stage2, 'renderPrediction'), /renderWorkspaceAction/);
  assert.doesNotMatch(functionBody(stage2, 'renderApplication'), /renderWorkspaceAction/);
});

test('Stage 3 verification stays with Results until the explicit coverage handoff', () => {
  const verification = functionBody(stage3, 'renderVerification');
  assert.match(verification, /renderWorkspaceAction/);
  assert.match(verification, /next: 'transfer'/);
  assert.match(stage3, /continue-to-coverage/);
  assert.doesNotMatch(stage3, /sql-solution-panel|function showSolution/);
});

test('Show solution replaces editor state and clears stale local diagnostics', () => {
  const showSolution = functionBody(main, 'showActiveSolution');
  assert.match(showSolution, /clearSqlDiagnostic\(\)/);
  assert.match(showSolution, /editor\.setValue\(solution, -1\)/);
  assert.doesNotMatch(showSolution, /insertAdjacentHTML|appendChild/);
});
