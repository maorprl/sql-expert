# Wave 4 — Diagnostic Feedback Decision Gate

**Date:** 2026-09-15  
**Status:** COMPLETE — NARROW WAVE 4 SCOPE JUSTIFIED  
**Initiative:** Existing-course experience improvement  
**Action type:** Mapping / decision gate only — no learner-facing implementation in this action

## 1. Purpose

This gate evaluates the queued **Wave 4 — Diagnostic feedback** candidate scope against the currently implemented Stage 1–3 learner experience.

It does not redesign the encounters, introduce a hint system, add adaptive behavior, change progress semantics, change validators, or authorize implementation by itself.

The question for this gate is:

> Where does current feedback fail to tell the learner enough about what is wrong, using reasoning or evidence the learner has already established?

## 2. Sources inspected

Current management / authority:

- `course-experience-improvement-work-management.md`
- `pedagogical-foundations.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`
- `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`
- `course-design/stage-3/stage-3-interaction-decisions.md`

Current implementation surfaces:

- `src/main.js`
- `src/media-coverage.js`
- `src/funding-participation.js`
- `src/inner-join-unmatched.js`

The decision is based on the current implemented feedback behavior and the already-established instructional requirements. It does not import older course versions or invent a broader feedback policy.

## 3. Gate verdict

**ACTIVATE WAVE 4 NARROWLY.**

The current closed reasoning interactions across Stage 1–3 already provide local corrective guidance that generally points the learner back to the relevant business meaning, relationship, Grain, or visible evidence.

The material diagnostic gap is concentrated in **successful SQL executions that fail the encounter's semantic result contract**.

In all three encounters, several materially different semantic failures currently collapse into one generic message. The validators already distinguish the result dimensions internally, but the learner-facing feedback does not expose those distinctions.

Wave 4 should therefore be limited to **result/evidence-based SQL semantic diagnostics**.

No new encounter-level canon decision is required for this narrow scope, provided implementation stays within the boundaries below.

## 4. What is already sufficient — NO CHANGE

### 4.1 Relation selection and connecting-key feedback

**Decision:** NO CHANGE

The current feedback redirects the learner to the information requested or to the row-level relationship meaning without revealing a later answer.

This is already diagnostic enough for the current constrained interactions.

### 4.2 Cardinality feedback

**Decision:** NO CHANGE

Although multiple wrong options represent different misconceptions, the current corrective feedback restates the structural evidence needed to resolve them: one FK value per child row and possible repetition of that FK across child rows.

Per-option branching is not justified by current evidence.

### 4.3 Grain feedback

**Decision:** NO CHANGE

Current feedback consistently returns the learner to the organizing subject of the business request and the requirement that the requested records remain individually represented.

### 4.4 Baseline / prepared-measurement interpretation

**Decision:** NO CHANGE

The current feedback points directly to what relation is being counted or to the fact that the prepared measurement should be run as provided. The learner is not being asked to debug authored SQL in these states.

### 4.5 Prediction and post-result verification

**Decision:** NO CHANGE

These states already reuse established evidence rather than merely report failure.

Notable examples include:

- Stage 1: 18 starting article rows + one matching source per article;
- Stage 2: one participation per result row + one round matching several participations;
- Stage 2 final verification: concrete comparison around `funding_round_id = 1003`;
- Stage 3: the learner-established unmatched company and its actual absence from INNER JOIN Results.

The feedback is already evidence-local and sufficiently explanatory for the current task.

### 4.6 SQLite execution errors

**Decision:** NO CHANGE IN WAVE 4

`src/main.js` already surfaces the SQLite error text and the executed statement for actual SQL execution failures.

Wave 4 must not add a brittle syntax-error classifier or attempt to infer every possible authoring mistake from SQL text.

A future proposal to pedagogically rewrite raw SQLite diagnostics would require separate evidence that the current errors are materially obstructing learning.

## 5. Approved Wave 4 target — SQL semantic-result diagnostics

### 5.1 Current problem

After SQL executes successfully, each encounter currently reduces all semantic validator failures to one broad message:

- Stage 1: requested output mismatch;
- Stage 2: requested six-column participation output mismatch;
- Stage 3: requested five-column INNER JOIN output mismatch.

But the existing semantic contracts distinguish several materially different failure classes.

The learner can therefore receive the same guidance when the actual problem is:

- the required JOIN / ON operation was not expressed;
- output columns or aliases are wrong;
- result row count conflicts with the established Grain / prediction;
- row associations do not match the established relationship even when shape looks plausible;
- an additional result-shaping operation conflicts with the requested result semantics.

This is the core Wave 4 gap.

## 6. Approved diagnostic classes

Wave 4 implementation may distinguish only established failure dimensions that can be determined robustly from the existing validator inputs and result evidence.

### A. Required relational implementation is missing

Use only the operation requirement that is already part of the encounter.

Examples:

- required JOIN is absent;
- required `ON` relationship expression is absent;
- Stage 3 does not implement the required INNER JOIN behavior.

Feedback should reconnect the learner to the relationship already established in the Working Schema / prior reasoning.

**Classification:** `CONFORMANCE` + local `IMPLEMENTATION CHOICE`

### B. Output contract mismatch

When returned columns do not match the already-disclosed requested output contract, feedback may identify the mismatch and point the learner to **Desired output**.

It should not provide a full solution query.

**Classification:** `CONFORMANCE` + local `IMPLEMENTATION CHOICE`

### C. Row-count / Grain-behavior mismatch

When returned row count conflicts with established evidence, feedback may state the actual result count and reconnect it to the learner's earlier Grain / prediction.

Stage-specific anchors:

- Stage 1: 18 rows, one article per row;
- Stage 2: 72 current participation rows, one participation per row, with repeated round context allowed;
- Stage 3: 26 current funding-round-grain INNER JOIN rows while the learner-established zero-match company remains absent.

The feedback must describe the observed mismatch, not guess an unproven cause.

**Classification:** `CONFORMANCE` + local `IMPLEMENTATION CHOICE`

### D. Relationship / row-association mismatch

If result shape and count are plausible but returned rows do not match the established relationship, feedback may direct the learner back to the already-established `ON` relationship.

It should not infer a specific coding mistake unless that mistake is directly established by the existing validator state.

**Classification:** `CONFORMANCE` + local `IMPLEMENTATION CHOICE`

### E. Existing validator detects incompatible row-shaping behavior

Where the current validator already rejects result-shaping operations because they violate the encounter contract, Wave 4 may explain the conflict in semantic terms.

Example: collapsing participation-level rows in Stage 2 conflicts with one-participation-per-row Grain.

Do not expand this into a general SQL parser or a new catalog of prohibited syntax.

**Classification:** `IMPLEMENTATION CHOICE` bounded by existing semantic authority

## 7. Stage-by-stage decision

### Stage 1 — Media coverage / first JOIN

**Wave 4 change justified:** YES — SQL semantic failure only.

Current contract already requires:

- `title | source_name`;
- 18 rows;
- one article per result row;
- correct article-to-source association;
- JOIN / ON as the implementation of the established relationship.

Diagnostic feedback may distinguish those existing dimensions.

All non-SQL wrong-answer feedback remains unchanged.

### Stage 2 — Funding participation / row multiplication

**Wave 4 change justified:** YES — highest-value target.

The encounter's core capability is especially vulnerable to generic SQL failure feedback because a wrong query can fail for very different reasons:

- wrong six-column output;
- incorrect relationship;
- wrong row count;
- collapse away from participation Grain;
- failure to preserve all participation records.

The approved diagnostic treatment should reuse the learner's already-established participation Grain and multiplication prediction.

Do not introduce new aggregation teaching, fan-out terminology, hint escalation, or a new branch in the learner path.

### Stage 3 — INNER JOIN unmatched rows

**Wave 4 change justified:** YES — SQL semantic failure only.

Current contract already requires:

- five requested fields;
- semantically correct company-to-funding-round INNER JOIN;
- 26 funding-round-grain result rows in the current data;
- the learner-established zero-match company to remain absent from the INNER JOIN result.

Diagnostic feedback may reconnect a semantic failure to those already-established facts.

Do not teach LEFT JOIN, `NULL`, or unmatched-row preservation as part of the correction.

All current evidence-comparison, prediction, verification, and transfer feedback remains unchanged.

## 8. Explicitly out of scope

Wave 4 must not include:

- per-option feedback branches merely because distractors differ;
- attempt-count-based escalation;
- graduated hints;
- adaptive assistance;
- automatic solution reveal;
- changes to Show solution;
- changes to progress / completion semantics;
- new validators or stricter acceptance rules unless separately justified;
- exact-query matching;
- a general SQL syntax parser;
- LEFT JOIN teaching;
- new Concept Moments;
- changes to encounter sequence;
- changes to business questions, Grain, Cardinality, learner evidence, or required SQL result semantics.

Those either belong to Wave 5, require separate evidence, or cross a canon boundary.

## 9. Canon / authority boundary

The approved Wave 4 slice does **not** create a new instructional path. It makes an existing unsuccessful SQL state explain **which already-established semantic requirement is not yet satisfied**.

That remains within current authority when all of the following are true:

1. the learner stays in the same SQL task;
2. prior reasoning evidence is preserved;
3. the feedback refers only to requirements already established or disclosed;
4. no new concept is introduced;
5. no answer or complete SQL solution is supplied;
6. acceptance criteria are unchanged;
7. diagnosis is based on robust existing validator/result evidence rather than speculative parsing.

If implementation proposes materially different instructional responses, new assistance escalation, new branching paths, or new acceptance semantics, classify that proposal as **`CANON DECISION REQUIRED`** and stop before implementing it.

## 10. Implementation shape permitted by this gate

A later implementation pass may refactor each encounter's semantic validator from a single boolean result into a small structured diagnostic result, for example:

- `valid`
- `missing_required_join`
- `output_contract_mismatch`
- `row_count_mismatch`
- `row_association_mismatch`
- `incompatible_result_shaping`

These labels are implementation-level examples, not learner-facing wording requirements.

The learner-facing message should remain concise and evidence-oriented.

The validator must continue to accept semantically equivalent SQL permitted by the current encounter authority. Wave 4 must not narrow correctness merely to make diagnosis easier.

## 11. Decision summary

| Area | Decision | Authority classification |
|---|---|---|
| Closed reasoning wrong answers | NO CHANGE | Existing treatment sufficient |
| Prepared measurements | NO CHANGE | Existing treatment sufficient |
| Prediction / verification feedback | NO CHANGE | Already evidence-based |
| Raw SQLite execution errors | NO CHANGE | Avoid brittle parser expansion |
| Successful SQL with semantic mismatch — Stage 1 | IN WAVE 4 | CONFORMANCE + IMPLEMENTATION CHOICE |
| Successful SQL with semantic mismatch — Stage 2 | IN WAVE 4 | CONFORMANCE + IMPLEMENTATION CHOICE |
| Successful SQL with semantic mismatch — Stage 3 | IN WAVE 4 | CONFORMANCE + IMPLEMENTATION CHOICE |
| Attempt-based / adaptive assistance | OUT OF SCOPE | Wave 5 / CANON DECISION REQUIRED |
| New instructional branching | BLOCKED unless separately authorized | CANON DECISION REQUIRED |

## 12. Gate closure and next action

**Wave 4 mapping / decision gate is complete.**

The justified Wave 4 scope is a narrow implementation pass for **SQL semantic-result diagnostic feedback across Stage 1–3**.

No learner-facing implementation is performed by this artifact.

Before implementation begins, the work-management record should reflect this gate outcome and the implementation task should be constrained to the approved scope above.
