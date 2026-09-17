# Wave 5A — Response-Aware Feedback Decision

**Status:** HISTORICAL / SUPERSEDED INITIATIVE DECISION RECORD — NOT CURRENT AUTHORITY OR WORK AUTHORIZATION
**Date:** 2026-09-15  
**Scope:** current Stage 2 Funding Participation and Stage 3 INNER JOIN unmatched-company encounters only

This document is the durable historical decision record for the Wave 5A direction at that time. It is preserved as initiative evidence and does not override the accepted Lessons 1–2 runtime or current Lesson authority. The historical analysis and implementation boundary below are not rewritten retroactively.

It does not authorize a broader adaptive-assistance system and it does not reopen the established Stage 1–3 learner routes.

---

## 1. Why Wave 5 was paused

The original Wave 5 queue described graduated / adaptive assistance such as escalating hints based on attempts or prior help use.

Before implementing that machinery, a narrower pedagogical concern was examined: some learner questions may have **low inference distance** — the interface may already provide most of the reasoning needed to reach the answer. In such a case, adding graduated hints can create another explanatory layer without addressing the upstream instructional problem.

This concern is distinct from the separate critique that a learner encounter may contain many steps. The current decision does **not** conclude that the course has too many steps and does **not** authorize merging or deleting Grain, Cardinality, prediction, verification, relation-selection, connection, SQL, or other required reasoning moves.

The correct question for Wave 5 became:

> Where does the learner perform meaningful inference, and where does an incorrect response expose a sufficiently distinct misconception that a different corrective response would be pedagogically justified?

---

## 2. Inference-distance findings

The review found that the problem is not uniform across the course.

### Stage 1 — Media Coverage

Stage 1 is intentionally a first JOIN exposure and is highly guided. Several reasoning moves have low inference distance because the business request, relation names, relationship naming, baseline evidence, and first-exposure instruction make the intended conclusion relatively close to the information already visible.

This does not establish that those capabilities are unnecessary. Relation identification, relationship reading, Grain, Cardinality, prediction, operation choice, SQL implementation, and verification remain course capabilities. The finding is that some of them are **weakly elicited / low-distance in this first exposure**, not that they should be removed.

Stage 1 is not part of the current Wave 5A implementation scope.

### Stage 2 — Funding Participation

Stage 2 contains materially stronger reasoning. Its current authority deliberately protects the core inference by requiring a qualitative row-multiplication prediction before a concrete child count is supplied.

The strongest reasoning points are:

- participation Grain rather than funding-round Grain;
- qualitative row-multiplication prediction from Grain + Cardinality;
- interpretation of repeated round-level context across distinct participation rows;
- reconciliation of the earlier prediction against the learner's actual `funding_round_id = 1003` result slice.

### Stage 3 — INNER JOIN unmatched company coverage

Stage 3 also contains meaningful inference. In particular, the learner generates a real zero-match case from data, predicts INNER JOIN row survival, verifies actual absence in Results, and draws the business conclusion that total result-row count is not entity coverage.

The strongest reasoning points are:

- using learner-generated zero-match evidence;
- predicting that zero matched row pairs produce zero INNER JOIN result rows for that starting company;
- distinguishing row count from company coverage;
- distinguishing a valid funding-round-grain report from evidence that every company is represented.

### Cross-stage conclusion

There is no basis here for a blanket conclusion that the whole course has a low-inference problem or that the remedy is step deletion.

The useful distinction is instead:

1. **low inference + low diagnostic value** — ordinary correction is enough;
2. **high inference + low diagnostic observability** — the learner is reasoning, but the response does not reveal why the learner is wrong;
3. **high inference + high diagnostic observability** — the response meaningfully distinguishes misconceptions and can justify response-aware correction.

Wave 5A targets only category 3.

---

## 3. Diagnostic-observability findings

A high-inference question is not automatically a good adaptive-assistance target. The runtime must be able to observe evidence that supports one misconception more than another.

### Strongly observable Stage 2 points

The current distractors already encode distinct mental models at:

- row-multiplication prediction;
- repeated-context prediction;
- final `1003` verification.

The runtime already knows which option the learner selected, but the current implementation routes all incorrect options in each interaction to the same generic corrective feedback. The diagnostic information is therefore present but unused.

### Strongly observable Stage 3 points

The current distractors already distinguish misconceptions at:

- zero-match INNER JOIN prediction;
- post-SQL verification;
- final company-coverage conclusion.

Again, the selected option is observable, but the current implementation collapses distinct wrong responses into the same correction.

### Stage 3 evidence comparison is intentionally excluded

The learner-generated evidence-comparison step is cognitively meaningful but **not diagnostically rich enough** for response-aware misconception feedback. Choosing the wrong company does not reliably reveal whether the learner failed set comparison, missed a row, misread an identifier, or made another inspection error.

Its current generic corrective direction should remain generic in Wave 5A.

---

## 4. Approved Wave 5A scope

Wave 5A is approved as:

> **Response-aware corrective feedback at already-existing multiple-choice interactions where distinct wrong options reasonably indicate distinct misconceptions.**

The treatment is intentionally narrow.

For an approved interaction:

- the learner selects an existing wrong option;
- the runtime uses that selected option to choose a misconception-specific redirect;
- the redirect points the learner back to evidence, a previously established premise, row identity, Grain, relationship structure, or the original business request;
- the redirect leaves a real reasoning step for the learner;
- the learner retries the same existing interaction.

Wave 5A is **not** attempt-based adaptation. It does not infer a persistent learner model. It does not choose a different route. It does not add progressive hint levels.

---

## 5. Pedagogy rule for approved feedback

The feedback must follow this rule:

> **Return the learner to relevant evidence or an already-established premise, but leave the connection from that evidence to the correct conclusion for the learner to make.**

Therefore the corrective feedback must not:

- state the correct option in different words;
- introduce a later concept before its authorized reveal point;
- perform the Grain / Cardinality / row-survival reasoning for the learner;
- give the numeric or semantic conclusion that the current question is asking the learner to derive;
- introduce LEFT JOIN / `NULL`, aggregation, or another untaught mechanism;
- convert a wrong-answer correction into a mini-lecture.

The approved wording below already passed this check.

---

## 6. Approved Stage 2 response mapping

Current runtime file: `src/funding-participation.js`

### 6.1 Qualitative row-multiplication prediction

#### Wrong option: `one-row`

Likely misconception: JOIN or the one-side entity is assumed to remain exactly one output row regardless of the required participation Grain.

Approved corrective feedback:

> If the result stayed at one row for this funding round, what would happen to the additional participation records that also need to remain represented?

#### Wrong option: `collapse`

Likely misconception: multiple child / participation records are expected to collapse into one parent-level row.

Approved corrective feedback:

> Would collapsing the participation records into one row still preserve each recorded participation as its own result row?

#### Wrong option: `round-grain`

Likely misconception: adding round context through JOIN is assumed to change the requested result Grain to one funding round per row.

Approved corrective feedback:

> Did the business request change what one result row should represent, or did it only ask you to add funding-round context to that row?

### 6.2 Repeated-context prediction

#### Wrong option: `duplicates`

Likely misconception: repeated field values are treated as sufficient evidence that whole result rows are duplicates.

Approved corrective feedback:

> Repeated values do not by themselves establish duplicate rows. Which fields in the result identify whether these are the same participation or different participations?

#### Wrong option: `first-only`

Likely misconception: one-side context is assumed to belong only on the first many-side row.

Approved corrective feedback:

> For a later participation row, does the business request still require the funding-round context to be present?

#### Wrong option: `different-rounds`

Likely misconception: repeated round-level context is assumed to imply different funding rounds rather than several participations belonging to one identified round.

Approved corrective feedback:

> Use `funding_round_id` as identity evidence. Could two different funding rounds legitimately have the same `funding_round_id`?

### 6.3 Final `funding_round_id = 1003` verification

#### Wrong option: `duplicates`

Likely misconception: the learner sees repeated round context and treats the actual participation-grain rows as duplicates.

Approved corrective feedback:

> Compare the participation identifiers in the visible 1003 rows. Are the rows identical at the result Grain?

#### Wrong option: `different-rounds`

Likely misconception: rows sharing the same round identifier are interpreted as different rounds.

Approved corrective feedback:

> Check the `funding_round_id` values in these rows. What does that identifier tell you about whether they belong to one round or several?

#### Wrong option: `one-participation`

Likely misconception: multiple result rows are interpreted as repetitions of one participation rather than separate participation records.

Approved corrective feedback:

> Compare `round_investment_id` and `investor_id` across the rows. What evidence would show whether this is one participation repeated or several distinct participations?

---

## 7. Approved Stage 3 response mapping

Current runtime file: `src/inner-join-unmatched.js`

### 7.1 Zero-match INNER JOIN prediction

#### Wrong option: `preserved`

Likely misconception: a row that exists in `company` is assumed to survive INNER JOIN even without any matching `funding_round` row.

Approved corrective feedback:

> An INNER JOIN result row needs a matched row pair. How many such pairs can this company form from the evidence you found?

#### Wrong option: `error`

Likely misconception: one unmatched starting row is assumed to make the entire INNER JOIN invalid or unable to return results.

Approved corrective feedback:

> Does one unmatched company prevent the matched companies from forming valid row pairs?

### 7.2 Post-SQL zero-match verification

#### Wrong option: `present`

Likely misconception: prior row-preservation belief is retained despite the actual Results evidence.

Approved corrective feedback:

> Inspect the returned `company_id` values specifically. Do you actually find this company in Results?

#### Wrong option: `count-proves-coverage`

Likely misconception: total result-row count is treated as evidence that all companies are represented.

Approved corrective feedback:

> What does 26 count here: companies, or funding-round-grain result rows? Can that number alone tell you which company IDs are represented?

### 7.3 Final company-coverage conclusion

#### Wrong option: `yes-count`

Likely misconception: because the result has more rows than there are companies, every company is assumed to be represented.

Approved corrective feedback:

> The 26 rows are funding-round rows. What would you need to inspect to establish coverage of companies rather than merely the number of result rows?

#### Wrong option: `yes-grain`

Likely misconception: preserving every funding round at the correct result Grain is assumed to guarantee representation of every company.

Approved corrective feedback:

> One result row represents a funding round. What guarantee, if any, does that give about companies that have no funding round?

---

## 8. Explicit non-scope

Wave 5A does **not** authorize any of the following:

- deleting, merging, or reordering learner steps;
- changing Stage 1, Stage 2, or Stage 3 learner-route structure;
- changing existing questions or answer-option wording;
- adding or removing answer options;
- changing correct answers;
- changing evidence requirements or completion requirements;
- changing Concept Moment timing;
- changing Working Schema behavior or topology;
- changing SQL prompts, output contracts, validators, semantic acceptance, or equivalent-query acceptance;
- changing result evidence or the Stage 2 `1003` slice;
- changing Stage 3 prepared evidence measurements or zero-match identification flow;
- adding a global hint engine;
- adding `Hint 1` / `Hint 2` ladders to these interactions;
- attempt counting or attempt-based escalation;
- assistance escalation based on prior help use;
- persistent learner modelling;
- support reduction / expansion based on learner performance;
- automatic solution reveal;
- changing `Show solution` semantics;
- changing Retry / Redo / Continue semantics;
- changing progress or navigation behavior;
- introducing LEFT JOIN / `NULL`, aggregation, `DISTINCT`, bridge-table reasoning, or another later concept;
- CSS / visual redesign unrelated to rendering the existing local feedback surface;
- a generalized Diagnostic Engine;
- Wave 5B.

The separate question of whether any encounter has too many steps remains unresolved by this decision and cannot be inferred from Wave 5A.

---

## 9. Wave 5B remains unapproved

The following broader ideas remain outside current authorization:

- graduated assistance across repeated attempts;
- different hint levels after successive failures;
- attempt history;
- assistance-history tracking;
- learner-state accumulation across questions or stages;
- adaptive routing;
- performance-based support reduction or expansion.

The current audit did not establish that this machinery is necessary.

Wave 5B requires a separate decision if later evidence shows that response-aware first-line correction is insufficient.

---

## 10. Implementation authorization boundary

Implementation may now proceed **only** for the mappings in Sections 6 and 7.

The implementer must first read:

1. this document;
2. `course-design/stage-2/stage-2-authority.md`;
3. `course-design/stage-3/stage-3-learner-route.md`;
4. `course-design/stage-3/stage-3-interaction-decisions.md`;
5. `course-design/course-controls.md`;
6. `src/funding-participation.js`;
7. `src/inner-join-unmatched.js`.

The expected implementation shape is narrow:

- preserve every existing question, option value, option label, answer, route transition, evidence requirement, validator, result contract, control, and completion condition;
- branch existing incorrect-answer feedback by the already-observed wrong option value only at the approved interactions;
- use the exact approved feedback wording in this document unless a purely mechanical escaping / interpolation adjustment is required;
- preserve the existing generic treatment for interactions not listed here, including Stage 3 evidence comparison;
- do not add attempt counters, hint-state machinery, learner modelling, new UI controls, new learner paths, or new pedagogy.

A local code refactor is permissible only when required to express the approved option-specific feedback cleanly and when it does not create a new generalized diagnostic architecture or change behavior outside the approved interactions.

If implementation would require any behavior outside this boundary, stop rather than infer authorization.

---

## 11. Required post-build review

After implementation, review must verify at minimum:

- each approved wrong option produces its corresponding approved corrective feedback;
- the correct-answer path is unchanged;
- unlisted wrong-answer behavior is unchanged;
- learner route and interaction order are unchanged;
- evidence and completion requirements are unchanged;
- SQL acceptance and result contracts are unchanged;
- Stage 2 core qualitative prediction remains protected from premature answer reveal;
- Stage 3 zero-match evidence remains learner-generated;
- feedback redirects reasoning without stating the correct answer;
- no Wave 5B / attempt-based / global hint machinery was introduced;
- the existing course test/build checks still pass.

The post-build verdict should be based on conformance to this document and the controlling Stage / course authorities, not on whether additional assistance ideas could also be useful.
