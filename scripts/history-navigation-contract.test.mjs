import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

const [html, historyModule, historyStyles] = await Promise.all([
  read('index.html'),
  read('src/course-history-navigation.js'),
  read('src/course-history-navigation.css'),
]);

test('course shell loads the shared history navigation module', () => {
  assert.match(html, /course-history-navigation\.js/);
  assert.match(historyModule, /course-journey-nav/);
  assert.match(historyModule, /Journey history/);
});

test('Back and Forward use per-encounter visited history with an independent review cursor', () => {
  assert.match(historyModule, /const histories = new Map\(\)/);
  assert.match(historyModule, /entries: \[\], cursor: -1/);
  assert.match(historyModule, /activeEncounterName\(\)/);
  assert.match(historyModule, /history\.cursor -= 1/);
  assert.match(historyModule, /history\.cursor \+= 1/);
});

test('review navigation never invokes progression controls or encounter mutation APIs', () => {
  const goBackStart = historyModule.indexOf('function goBack');
  const goForwardStart = historyModule.indexOf('function goForward');
  const ensureShellStart = historyModule.indexOf('function ensureShell');
  const navigationBody = historyModule.slice(goBackStart, ensureShellStart);
  assert.doesNotMatch(navigationBody, /click\(\)|submit\(|handleSqlSuccess|setCurrent|record\(|addRelation|removeRelation/);
  assert.match(historyModule, /stageScroll\.hidden = true/);
  assert.match(historyModule, /stageScroll\.hidden = false/);
});

test('historical controls are rendered read-only', () => {
  assert.match(historyModule, /control\.disabled = true/);
  assert.match(historyModule, /contenteditable', 'false'/);
  assert.match(historyStyles, /pointer-events:\s*none/);
});

test('Forward cannot traverse beyond the captured frontier', () => {
  assert.match(historyModule, /history\.cursor >= history\.entries\.length - 1/);
  assert.match(historyModule, /history\.cursor === history\.entries\.length - 1/);
  assert.match(historyModule, /Current position/);
});

test('history rendering does not feed its own mutations back into frontier capture', () => {
  assert.match(historyModule, /if \(!reviewSurface\.hidden\) reviewSurface\.hidden = true/);
  assert.match(historyModule, /if \(reviewSurface\.childNodes\.length\) reviewSurface\.replaceChildren\(\)/);
  assert.match(historyModule, /mutation\.target !== reviewSurface/);
  assert.match(historyModule, /!reviewSurface\?\.contains\(mutation\.target\)/);
});
