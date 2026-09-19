import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const runtime = await readFile(new URL('../src/stage1-prototype-runtime.js', import.meta.url), 'utf8');
const styles = await readFile(new URL('../src/stage1-prototype-runtime.css', import.meta.url), 'utf8');

const contains = (text, message) => assert.ok(runtime.includes(text), message);
const excludes = (text, message) => assert.ok(!runtime.includes(text), message);
const containsStyle = (text, message) => assert.ok(styles.includes(text), message);
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

excludes("['country', 'a country']", 'Weak country Grain distractor must be removed.');
contains('one publishing source with all of its articles', 'Grain options must include a plausible row-meaning misconception.');
contains('first measure how many article rows we are starting with', 'Baseline bridge must state the measurement purpose.');
excludes('prepared line on the bench', 'Baseline wording must not use the bench metaphor.');
excludes('What does the number ${count} represent here?', 'Separate baseline interpretation MCQ must be removed.');
contains('${count} article rows measured.', 'Baseline result must be interpreted inline as article rows.');
contains('1 article row', 'Post-prediction mechanism must carry article-row units.');
contains('1 matching source row', 'Post-prediction mechanism must carry matching-source units.');
contains('18 matching pairs', 'Scaled prediction mechanism must explain matching pairs.');
ordered("state = 'prediction'", 'onCorrect: afterPrediction', "state = 'semantic'", "$('#s1-prediction-mechanism').hidden = false", 'onCorrect: afterSemantic', "concept('JOIN'");

contains('See how it fits together', 'Accepted ON-to-query control label is required.');
contains('FROM news_article', 'Full query mapping must include FROM.');
contains('JOIN news_source', 'Full query mapping must include JOIN.');
contains('defines how the rows match', 'Full query mapping must state ON semantics.');
contains('chooses the article and source fields that appear', 'Full query mapping must state SELECT semantics.');
contains('query as a whole keeps the established Grain', 'Grain preservation must belong to the full query.');
contains('SQL workspace', 'Learner-facing SQL workspace terminology is required.');
excludes('Map the condition', 'Obsolete control label must be removed.');
excludes('relationship becomes', 'Relationship must not be described as becoming ON.');
excludes('↔', 'Business request and Grain must not be represented as equivalent.');
excludes('Beat 1', 'Learner-facing Beat labels must be removed.');
excludes('Beat 2', 'Learner-facing Beat labels must be removed.');
excludes('Beat 3', 'Learner-facing Beat labels must be removed.');
excludes('grain you predicted', 'Grain must be established, not predicted.');
contains("current.classList.add('completed')", 'Prior JOIN explanations must remain as completed reviewable layers.');
containsStyle('.teach-step.completed .teach-actions{display:none}', 'Reviewable completed explanations must not replay progression actions.');
ordered('function afterSemantic()', "concept('JOIN'", "$('#s1-teaching').hidden = false", 'function executeSql()');
contains("$('#s1-to-sql').addEventListener('click', () => { state = 'sql'", 'SQL workspace must open only from the completed teaching mapping.');
contains("activeTeaching.classList.add('completed')", 'SQL handoff must make all teaching layers reviewable but secondary.');

contains('Compare the actual result with your earlier prediction of 18 rows and the established Grain', 'Verification must integrate result evidence, prediction, and established Grain.');
contains('verification-summary', 'Completion must use a verification/consolidation role.');
excludes("concept('JOIN verified'", 'Completion must not introduce a new JOIN Concept Moment.');
contains('You established one article per requested result row', 'Completion must reconstruct the reasoning argument.');
excludes('relations, link, cardinality, grain, baseline, prediction', 'Completion must not be an administrative state transcript.');
ordered("setExecutionStatus('Verified · result satisfies the task'", 'askVerification()', "state = 'complete'", 'Reasoning verified', 'Lesson 1 complete');

contains('row-construction', 'Enrichment must use a legible row-construction visual.');
contains('matches the same source id', 'Enrichment must show direct row matching.');
contains('contributes both fields', 'Enrichment must show field contribution to the result row.');
contains('it defines how article rows match source rows', 'Enrichment must state ON semantics directly.');
contains('because each article matches one source, this result keeps one row per article', 'Enrichment preservation claim must be query-local and mechanism-qualified.');
contains('The schema tells us which relationships are possible. The instance shows which row matches actually occur.', 'Schema-versus-instance distinction must remain.');
contains('A Venn view can help with inclusion and exclusion, but it does not explain Grain or row multiplication.', 'Venn limitation must remain.');
excludes('JOIN is the bridge', 'Enrichment must not rely on the bridge metaphor.');
excludes('<div class="sample-arrow">+</div>', 'Enrichment must not use plus as a relational connector.');
excludes('it names it', 'ON must not be said to name the relationship.');

console.log('Lesson 1 remediation validation passed.');
