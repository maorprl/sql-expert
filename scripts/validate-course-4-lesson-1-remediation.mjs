import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const runtime = await readFile(new URL('../src/course-4-lesson-1-runtime.js', import.meta.url), 'utf8');
const styles = await readFile(new URL('../src/course-4-lesson-1-runtime.css', import.meta.url), 'utf8');

const contains = (text, message) => assert.ok(runtime.includes(text), message);
const excludes = (text, message) => assert.ok(!runtime.includes(text), message);
const containsStyle = (text, message) => assert.ok(styles.includes(text), message);
const occursOnce = (text, message) => assert.equal(runtime.split(text).length - 1, 1, message);
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
excludes('Media coverage — one article, one publisher', 'The masthead must not disclose first-direction multiplicity.');
contains('Course 4 · Joining Relations', 'The masthead must identify the canonical Course.');
contains('Lesson 1 — One Match', 'The masthead must identify the canonical Lesson.');
contains('Media coverage · request → verified JOIN', 'The masthead must preserve neutral media-coverage context.');
excludes('identifies the source that published it', 'Connecting-field copy must not imply first-direction multiplicity.');
excludes('stores one value that references', 'PK/FK copy must not collapse the two premises into the conclusion.');
excludes('the article row carries the pointer to its publisher', 'Connecting-field recovery must not imply a singular match.');
excludes('look up the outlet that published this article', 'Wrong-column recovery must use non-multiplicity lookup wording.');
contains('locate related publishing-source information', 'Connecting-field prompt must use evidence-safe relationship wording.');
excludes('basis of the join', 'JOIN must not be named in the PK/FK explanation.');
contains('a particular source-id value can match <strong>at most one</strong>', 'PK uniqueness must expose the at-most-one premise.');
contains('is <strong>NOT NULL</strong> and a satisfied <strong>foreign key</strong>', 'The required satisfied reference must expose the at-least-one premise.');
contains('must match <strong>an existing</strong>', 'The at-least-one premise must require an existing source row.');
contains('For one article, how many publishing-source rows match', 'Article-to-source direction must remain learner reasoning.');
contains('Use the primary-key premise', 'The many-path correction must point only to PK uniqueness.');
contains('Use the required-reference premise', 'The none-path correction must point only to the required satisfied reference.');
excludes('The article row stores one required <code>news_source_id</code>, and that value identifies one source primary key.', 'Obsolete answer-leaking many-path feedback must be removed.');
excludes('The article’s <code>news_source_id</code> is required and identifies a source row.', 'Obsolete answer-leaking none-path feedback must be removed.');
contains('For one publishing source, how many article rows', 'Source-to-article direction must be learner reasoning.');
contains('The link tells us which fields connect', 'FK→PK must be distinguished from full Cardinality reasoning.');
contains('<span class="cd m" hidden>M</span><span class="cd one" hidden>1</span>', 'Cardinality markers must be inaccessible before both directional commitments.');
ordered('a particular source-id value can match <strong>at most one</strong>', 'must match <strong>an existing</strong>', 'For one article, how many publishing-source rows match', 'onCorrect: afterArticleDirection', 'function afterArticleDirection()', 'Match contribution: one article → one source match');
ordered("state = 'cardinality-source-direction'", 'For one publishing source, how many article rows', 'onCorrect: afterCardinality', 'function afterCardinality()', "concept('Cardinality'", 'Venture Daily → 6 articles', 'marker.hidden = false');
occursOnce('Venture Daily → 6 articles', 'The bounded reverse-direction illustration must occur exactly once after reverse success.');
excludes('4 source rows → 18 matching pairs', 'A premature aggregate reverse disclosure must not be introduced.');
excludes('four source rows → 18 matching pairs', 'A spelled-out aggregate reverse disclosure must not be introduced.');
excludes('4 source rows</strong> ×', 'A formatted aggregate reverse disclosure must not be introduced.');

excludes("['country', 'a country']", 'Weak country Grain distractor must be removed.');
contains('one publishing source with all of its articles', 'Grain options must include a plausible row-meaning misconception.');
contains('number of starting article rows to use as the comparison baseline', 'Baseline bridge must state the measurement purpose.');
excludes('prepared line on the bench', 'Baseline wording must not use the bench metaphor.');
excludes('What does the number ${count} represent here?', 'Separate baseline interpretation MCQ must be removed.');
contains('${count} article rows measured.', 'Baseline result must be interpreted inline as article rows.');
contains('1 article row', 'Post-prediction mechanism must carry article-row units.');
contains('1 matching source row', 'Post-prediction mechanism must carry matching-source units.');
contains('18 matching pairs', 'Scaled prediction mechanism must explain matching pairs.');
ordered("state = 'grain'", 'function afterGrain()', "state = 'baseline'", 'function runMeasurement()', 'function startPrediction(count)', "state = 'prediction'", 'onCorrect: afterPrediction', "state = 'semantic'", "$('#c4l1-prediction-mechanism').hidden = false", 'onCorrect: afterSemantic', "concept('JOIN'");
contains('For this INNER JOIN step', 'Match-contribution language must remain scoped to the current JOIN step.');
contains('each article contributes one matching article/source pair', 'Prediction must apply one-match contribution to the baseline.');
contains('Starting baseline: <b>${count}</b> article rows', 'The durable thread must distinguish baseline from Grain.');
contains('Predicted JOIN step: <b>18</b> matching pairs', 'The durable thread must record the match-contribution prediction.');

contains('See how it fits together', 'Accepted ON-to-query control label is required.');
contains('FROM news_article', 'Full query mapping must include FROM.');
contains('JOIN news_source', 'Full query mapping must include JOIN.');
contains('defines how the rows match', 'Full query mapping must state ON semantics.');
contains('chooses the article and source fields that appear', 'Full query mapping must state SELECT semantics.');
contains('query as a whole is predicted to return 18 rows at the established Grain', 'Grain and predicted row effect must belong to the full query.');
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
ordered('function afterSemantic()', "concept('JOIN'", "$('#c4l1-teaching').hidden = false", 'function executeSql()');
contains("$('#c4l1-to-sql').addEventListener('click', () => { state = 'sql'", 'SQL workspace must open only from the completed teaching mapping.');
contains("activeTeaching.classList.add('completed')", 'SQL handoff must make all teaching layers reviewable but secondary.');

contains('Compare the actual result with your earlier prediction of 18 rows and the established Grain', 'Verification must integrate result evidence, prediction, and established Grain.');
contains('verification-summary', 'Completion must use a verification/consolidation role.');
excludes("concept('JOIN verified'", 'Completion must not introduce a new JOIN Concept Moment.');
contains('You established one article per requested result row', 'Completion must reconstruct the reasoning argument.');
excludes('relations, link, cardinality, grain, baseline, prediction', 'Completion must not be an administrative state transcript.');
ordered("setExecutionStatus('Verified · result satisfies the task'", 'askVerification()', "state = 'complete'", 'Reasoning verified', 'Course 4 · Lesson 1 complete');

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

console.log('Course 4 / Lesson 1 remediation validation passed.');
console.log('Stateful visibility and interaction behavior remain browser-walkthrough responsibilities.');
