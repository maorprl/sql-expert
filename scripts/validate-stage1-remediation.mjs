import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const runtime = await readFile(new URL('../src/stage1-prototype-runtime.js', import.meta.url), 'utf8');

const contains = (text, message) => assert.ok(runtime.includes(text), message);
const excludes = (text, message) => assert.ok(!runtime.includes(text), message);
const ordered = (...parts) => {
  let cursor = -1;
  for (const part of parts) {
    const next = runtime.indexOf(part, cursor + 1);
    assert.ok(next > cursor, `Expected ordered runtime marker: ${part}`);
    cursor = next;
  }
};

contains("catalog-status').textContent = 'Added'", 'Selected relations must use Added.');
excludes('on bench', 'Learner-facing on bench wording must be removed.');
excludes('Relations on the bench', 'Selected-relation heading must be functional.');
excludes('The two relations on the bench', 'Working Schema heading must be functional.');
contains('identifies the source that published it', 'Connecting-field prompt must describe identification precisely.');
excludes('basis of the join', 'JOIN must not be named in the PK/FK explanation.');
contains('For one article, how many publishing sources', 'Article-to-source direction must be learner reasoning.');
contains('For one publishing source, how many article rows', 'Source-to-article direction must be learner reasoning.');
contains('The link tells us which fields connect', 'FK→PK must be distinguished from full Cardinality reasoning.');
ordered("state = 'cardinality-source-direction'", 'onCorrect: afterCardinality', "concept('Cardinality'");

console.log('Lesson 1 remediation validation passed.');
