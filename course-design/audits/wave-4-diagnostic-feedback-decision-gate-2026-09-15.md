# Wave 4 — Diagnostic Feedback Decision Gate

**Date:** 2026-09-15  
**Status:** REOPENED — STAGE 1 + STAGE 3 CALIBRATION COMPLETE; STAGE 2 BLOCKED BY CONFORMANCE DRIFT  
**Initiative:** Existing-course experience improvement  
**Action type:** Mapping / decision gate only — no learner-facing implementation authorized by this artifact

## Revision note

This gate was previously marked complete with a narrow conclusion that Wave 4 should be limited to SQL semantic-result diagnostics across Stage 1–3.

That conclusion is **superseded**.

A follow-up review found that the earlier gate moved too quickly from current implementation checks to an implementation scope. It treated most non-SQL feedback as already sufficient without first calibrating the full learner encounter as a course + machine diagnostic-feedback problem.

Wave 4 is therefore reopened. Stage 1 has been calibrated as the reference specimen. Stage 3 has now also been calibrated against its current route, interaction authority, and runtime. Stage 2 was inspected far enough to establish that a material encounter-conformance drift prevents a complete Wave 4 calibration of that stage until the drift is resolved.

No new document is created for this correction; this artifact remains the durable Wave 4 decision record.

## 1. Purpose

Wave 4 evaluates **diagnostic feedback across the learner encounter**, not only SQL validation.

The governing question is:

> When the learner makes an incorrect move, does the course and machine use what is actually known about that move, together with reasoning or evidence already established, to direct the learner toward what needs reconsideration — without supplying the answer, introducing untaught concepts, or changing the learner path?

This applies to reasoning interactions, evidence interpretation, SQL implementation, and result verification where diagnostic improvement is justified.

Wave 4 does not automatically require different feedback for every wrong answer. A current generic correction should remain when it already identifies the useful reasoning basis for all relevant mistakes.

## 2. Governing design direction

Diagnostic design proceeds **forward from the learner encounter**, not backward from validator code.

Use this order:

1. identify what the learner has already learned or established at the current point;
2. identify plausible incorrect learner actions within that state;
3. determine whether the current feedback usefully redirects the learner to the relevant established reasoning or evidence;
4. only where a material diagnostic gap exists, determine what information the machine already has or can robustly derive to support better feedback;
5. preserve current acceptance rules, learner evidence, sequence, and instructional boundaries unless a separate authority decision explicitly changes them.

Implementation guards are not teaching authority. The presence of a check in code does not make the checked SQL construct or implementation detail appropriate learner-facing feedback.

Untaught SQL operations must not be introduced through diagnostic messages merely because a validator can detect them. Such guards may remain internal regression or acceptance protections.

## 3. Sources used for the reopened calibration

Current management / foundations:

- `course-experience-improvement-work-management.md`
- `pedagogical-foundations.md`

Stage 1 authority and route:

- `course-design/stage-1/stage-1-learner-route.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`

Stage 1 implementation:

- `src/media-coverage.js`
- shared runtime behavior in `src/main.js` where relevant

Stage 2 current authority / implementation records inspected for the propagation decision:

- `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-and-waiver-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-structural-reuse-2026-09-13.md`
- `course-design/production/cycle-1/test-drive-finding-connection-focus-2026-09-13.md`
- `course-design/production/cycle-1/implementation-record-owner-directed-2026-09-13.md`
- `src/funding-participation.js`

Stage 3 authority and route:

- `course-design/stage-3/stage-3-learner-route.md`
- `course-design/stage-3/stage-3-interaction-decisions.md`

Stage 3 implementation:

- `src/inner-join-unmatched.js`
- shared runtime behavior in `src/main.js` where relevant

Stage 2 material is not treated as a completed Wave 4 calibration because required learner states and reveal order do not currently conform to the governing owner-directed records. That drift is recorded below as a blocker rather than silently absorbed into Wave 4.

## 4. Stage 1 calibration verdict

Stage 1 is the Wave 4 reference specimen.

The calibration result is:

| Learner state | Wave 4 decision | Reason |
|---|---|---|
| Relation selection | **IMPROVE** | The machine knows the current selected relation set, but all incorrect sets collapse to one broad message even when different parts of the business-information need are already covered. |
| Connecting-column reasoning | **KEEP** | Current feedback redirects to the business/data meaning of the article row without revealing PK/FK or the relationship prematurely. |
| Cardinality reasoning | **KEEP** | The existing correction supplies the two structural facts needed to resolve the current distractors; per-option branching is not justified. |
| Result Grain reasoning | **KEEP** | Current feedback returns to the organizing subject of the business request rather than deriving Grain from Cardinality. |
| Prepared Baseline execution | **KEEP** | This is a prepared measurement, not learner-authored SQL debugging. |
| Baseline interpretation | **KEEP** | Current feedback points to the counted relation and asks what one row represents. |
| Prediction | **KEEP** | Current feedback reuses the two established premises: 18 starting article rows and one matching source per article. |
| Semantic relational action | **KEEP** | Current feedback preserves every article row and distinguishes adding source information from filtering or collapsing records. |
| Learner-authored SQL semantic failure | **IMPROVE** | Multiple materially different failures of already-established result requirements collapse into one generic message. |
| Final result verification | **IMPROVE** | Distinct wrong interpretations of the visible result receive the same broad correction even though the machine knows which interpretation was selected. |

This replaces the earlier blanket conclusion that all non-SQL Stage 1 wrong-answer feedback should remain unchanged.

## 5. Stage 1 improvement target A — state-aware relation-selection feedback

### Current problem

Stage 1 relation identification is assessed relational reasoning. The learner must determine which relations supply the two kinds of information requested by the business problem.

The implementation already knows the full current selection through the selected-relation state, but any non-exact selection receives the same broad instruction to reinspect the Live Schema.

### Approved diagnostic direction

Feedback may use the **information role already covered by the current selection** to indicate what still needs reconsideration.

Examples of acceptable diagnostic direction include:

- the learner has already selected a relation supplying article records, but the selected set still does not supply publishing-source information;
- the learner has both required information roles covered but has also selected an unnecessary relation;
- the selected set does not yet cover one or both information roles in the business request.

Feedback should describe the missing or unnecessary **information role**, not reveal the name of the required relation.

It must not expose PK/FK, connecting-key, or relationship information before those reasoning moves.

### Machine behavior

This is a **state-aware diagnostic**. The machine may use the current selected relation set and current business-information requirements already established for the interaction.

No general inference engine is required. No course-wide rule is established merely because this Stage 1 treatment is justified.

**Classification:** `CONFORMANCE` + local `IMPLEMENTATION CHOICE`

## 6. Stage 1 improvement target B — result-aware SQL semantic feedback

### Current problem

A successfully executed query currently receives one broad semantic-failure message even when different already-established result requirements fail.

The Stage 1 result contract already establishes:

- requested output `title | source_name`;
- 18 result rows in the current data;
- one news article per result row;
- correct article-to-source association;
- JOIN / `ON` as the taught implementation of the established relationship.

### Approved diagnostic dimensions

A later Stage 1 implementation may distinguish only robust failure dimensions that are already meaningful to the learner at this point, such as:

1. **required relational implementation not present** — only where this can be identified robustly from the existing execution/validator state and expressed using the already-taught JOIN / `ON` relationship;
2. **output-contract mismatch** — returned fields / aliases do not satisfy the disclosed requested output;
3. **row-count mismatch** — the actual returned count differs from the established 18-row prediction;
4. **row-association mismatch** — result shape/count are plausible but the returned article/source associations do not match the already-established relationship.

Feedback must describe the observed mismatch and redirect to established reasoning or visible evidence. It must not claim a specific learner misconception or coding cause that the system cannot prove.

### Internal guards are not learner-facing diagnostic classes

Checks for SQL operations or patterns that have not been taught are implementation guards only unless and until the course explicitly establishes them.

Wave 4 must not teach or name `GROUP BY`, `DISTINCT`, `HAVING`, `UNION`, `LEFT JOIN`, or other untaught operations through error feedback merely because code can detect them.

A guard may continue to determine acceptance while remaining invisible as a pedagogical category.

### Machine behavior

This is a **result-aware diagnostic**. The machine may preserve the existing semantic acceptance boundary while retaining which established result dimension failed instead of collapsing all failures to one boolean learner-facing outcome.

The implementation must continue to accept semantically equivalent SQL currently permitted by the encounter authority.

**Classification:** `CONFORMANCE` + local `IMPLEMENTATION CHOICE`

## 7. Stage 1 improvement target C — response-aware final verification feedback

### Current problem

The Stage 1 final verification presents materially different wrong interpretations, including:

- the visible 18-row result is interpreted as source Grain rather than article Grain;
- the learner claims the JOIN produced more than 18 rows through article duplication.

The implementation knows which option the learner selected, but both currently receive the same instruction to check both row count and row meaning.

### Approved diagnostic direction

The correction may respond to the specific interpretation selected:

- for a **row-meaning / Grain** error, direct attention to what one visible result row represents;
- for a **row-count / multiplication** error, direct attention to the visible returned count and the earlier one-match-per-article prediction.

The learner remains in the same verification question and must still make the required inference.

This is not adaptive assistance, attempt-based escalation, or a new learner branch.

### Machine behavior

This is a **response-aware diagnostic**. The existing selected answer can be used to choose the appropriate corrective feedback where the distractors represent materially different reasoning errors and a differentiated response adds instructional value.

This does **not** create a course-wide requirement for per-option feedback. Stage 1 Cardinality is an explicit counterexample: the shared correction remains sufficient there.

**Classification:** `CONFORMANCE` + local `IMPLEMENTATION CHOICE`

## 8. Stage 1 areas explicitly retained as-is

Wave 4 does not justify changes to the following Stage 1 wrong-answer treatments at this gate:

- connecting-column reasoning;
- Cardinality;
- Grain;
- prepared Baseline execution;
- Baseline interpretation;
- prediction;
- semantic relational action.

The reason is not that the machine lacks more information. The reason is that the existing feedback already directs the learner to the useful reasoning basis without answer leakage or unnecessary branching.

Raw SQLite execution errors also remain unchanged in Wave 4 at this point. The current runtime surfaces the execution error locally; Wave 4 must not add a brittle general SQL syntax classifier without separate evidence and authority.

## 9. Machine capability shapes established by calibration

The calibration exposes three useful machine-side shapes:

- **state-aware diagnostic** — use the learner's current interaction state where it materially changes useful feedback;
- **response-aware diagnostic** — use the selected response when materially different wrong interpretations warrant different correction;
- **result-aware diagnostic** — use robust result/validator evidence to identify which already-established result requirement is not satisfied.

These are **diagnostic shapes**, not approval to build a generalized Diagnostic Engine or introduce a new abstraction across the course.

The cross-stage findings below determine where each shape is actually justified. They must not be propagated merely because they exist in Stage 1.

## 10. Stage 2 calibration status — blocked by encounter-conformance drift

### 10.1 Governing Stage 2 sequence

The current owner-directed authority supersedes the earlier pre-resolved entry state and establishes the following required learner progression:

1. identify `funding_round` and `round_investment` from the Live Schema;
2. identify `round_investment.funding_round_id` as the participation-to-round connection field;
3. establish target Grain = one recorded participation per result row;
4. interpret the one-round-to-many-participations Cardinality;
5. make a qualitative multiplication prediction from Grain + Cardinality **without a concrete child count**;
6. make a separate repeated-round-context / non-duplicate prediction;
7. only then introduce the **JOIN row multiplication** Concept Moment;
8. apply the established reasoning to the concrete `3 participations → 3 participation rows` case;
9. author the six-field direct INNER JOIN;
10. inspect the actual 72-row result and the actual `funding_round_id = 1003` evidence slice;
11. verify the prediction from that evidence.

The authority explicitly says that the two qualitative predictions are core pre-execution evidence and that the concrete 3→3 case is supporting application evidence.

### 10.2 Current runtime drift

The current `src/funding-participation.js` does not implement that progression.

Material differences include:

- current order is connection → Cardinality → Grain, while the owner-directed sequence requires connection → Grain → Cardinality;
- a prepared `COUNT(*) FROM funding_round` 26-row Baseline is inserted even though the governing design does not use that Baseline as part of the required prediction sequence;
- the current runtime has one multiplication prediction and immediately introduces the JOIN row multiplication Concept Moment;
- the required separate repeated-context / non-duplicate prediction is absent;
- the required concrete `3 participations → 3 participation rows` supporting application is absent;
- the current runtime inserts a separate semantic-operation choice and a three-beat JOIN-teaching sequence not present in the governing owner-directed progression;
- the final verification refers to `funding_round_id = 1003`, but the required actual 1003 evidence slice is not rendered as the local adjacent verification evidence described by the governing record.

This is not a Wave 4 feedback defect. It is an encounter-conformance defect that predates any Wave 4 implementation.

### 10.3 Stage 2 feedback findings that are stable despite the blocker

Some Stage 2 states are sufficiently established by both authority and runtime to support limited Wave 4 findings:

| Learner state | Wave 4 finding | Status |
|---|---|---|
| Relation selection | **IMPROVE** | Same state-aware gap as Stage 1: the runtime knows the selected relation set but gives one broad correction rather than using which business-information role is already covered. |
| Connecting-column reasoning | **KEEP** | Current correction returns to the participation-row meaning and asks which field identifies the funding round; it does not need per-column branching. |
| Learner-authored SQL semantic failure | **IMPROVE** | The six-field / 72-row / correct-association result contract is stable, but all semantic failures collapse into one broad message. Result-aware diagnostics are justified once implementation work is authorized. |

The following cannot be treated as finalized Wave 4 calibration targets until the encounter sequence is restored to authority:

- Grain / Cardinality as currently ordered in runtime;
- the current Baseline interaction;
- the current combined prediction / Concept Moment state;
- the current semantic-operation state;
- the current JOIN-teaching state;
- the final verification state without the required local 1003 evidence slice.

The missing repeated-context judgment and concrete 3→3 application have no current runtime wrong-feedback treatment to calibrate.

### 10.4 Stage 2 blocker decision

**Stage 2 Wave 4 calibration remains BLOCKED.**

Before Wave 4 can close for Stage 2, the encounter runtime must first be reconciled to the current owner-directed authority through a separate conformance correction. Wave 4 must not redesign that correction, invent replacement evidence, or improve feedback around superseded runtime states.

After the conformance correction, rerun Stage 2 diagnostic calibration on the restored learner path and classify each required wrong-feedback state as `KEEP` or `IMPROVE`.

## 11. Stage 3 calibration verdict

Stage 3 current route, interaction decisions, and runtime are sufficiently aligned for Wave 4 calibration.

The result is:

| Learner state | Wave 4 decision | Reason |
|---|---|---|
| Relation selection | **IMPROVE** | The machine knows the current selected relation set; the broad correction names both information roles but does not use which role is already covered or whether an unnecessary relation was added. |
| Connecting-column reasoning | **KEEP** | Current feedback returns to one funding-round row and asks which field identifies its company. |
| Cardinality reasoning | **KEEP** | The shared correction uses the FK direction and the company-side zero-match possibility; it resolves all current distractors without unnecessary per-option branching. |
| Result Grain reasoning | **KEEP** | Current correction returns to the requirement that every recorded funding round remain individually visible. |
| Prepared company measurement | **KEEP** | This is a prepared evidence query; current correction correctly keeps it as evidence collection rather than learner-authored SQL debugging. |
| Prepared funding-round measurement | **KEEP** | Same reason; exact prepared-query behavior is appropriate to the evidence-collection state. |
| Zero-match evidence comparison | **KEEP** | Current feedback tells the learner exactly what evidence operation to repeat: compare the selected `company_id` against the visible funding-round IDs. |
| INNER JOIN survival prediction | **KEEP** | The shared correction reuses the established zero-match evidence and INNER JOIN matched-pair behavior; it resolves both current distractors. |
| Learner-authored SQL semantic failure | **IMPROVE** | Multiple failures of the established five-column / 26-row / correct-association INNER JOIN result collapse into one broad message. |
| Result verification | **KEEP** | The shared correction sends the learner to the specific zero-match `company_id` in Results; that evidence resolves both current wrong interpretations. |
| Coverage conclusion | **KEEP** | The correction reuses the already-verified missing company as direct counterevidence to both wrong coverage claims. |

### Stage 3 machine implications

Two Stage 1 patterns genuinely propagate to equivalent Stage 3 roles:

- **state-aware relation-selection feedback** is justified;
- **result-aware SQL semantic feedback** is justified.

The Stage 1 **response-aware final-verification** treatment does **not** automatically propagate. Stage 3 verification and coverage already use one shared evidence-based correction that is sufficient for their current distractors.

This is the required counterexample to mechanical pattern propagation: the machine may support response-aware feedback, but the course should use it only where differentiated correction adds instructional value.

## 12. Cross-stage findings now established

Even with Stage 2 blocked, the current calibration supports several cross-stage conclusions:

### 12.1 Relation selection

State-aware relation-selection feedback is justified in Stage 1 and Stage 3, and the same gap is already visible in the stable Stage 2 entry interaction.

The likely course-level implementation pattern is:

- use the selected relation set to identify which **business-information role** is already covered, still missing, or unnecessarily added;
- do not reveal the required relation name;
- do not leak later key / relationship reasoning.

This is a repeated learner role across all three encounters, but Stage 2 implementation must still respect its separate conformance correction.

### 12.2 SQL semantic feedback

Result-aware SQL semantic feedback is justified in Stage 1 and Stage 3 and is also justified for the stable Stage 2 SQL result contract.

The cross-stage rule is not a parser taxonomy. Diagnostic messages may distinguish only robust failures of result requirements already established in that encounter, such as:

- required taught relational implementation where robustly observable;
- disclosed output-contract mismatch;
- observable row-count mismatch when row count is established learner evidence;
- row-association / relationship mismatch.

Untaught SQL operations remain internal guards, not learner-facing diagnostic categories.

### 12.3 Response-aware feedback

Response-aware feedback is **locally justified**, not globally required.

It is currently justified for Stage 1 final verification because the two wrong interpretations require attention to different evidence dimensions.

It is not justified merely because a closed question has multiple distractors. Stage 1 Cardinality and the calibrated Stage 3 reasoning / verification states show that one shared correction can already be sufficiently diagnostic.

## 13. Explicit Wave 4 boundaries

Wave 4 must not silently introduce:

- attempt-count-based escalation;
- graduated hints;
- adaptive assistance;
- automatic solution reveal;
- changes to Show solution;
- progress or completion semantic changes;
- new learner evidence requirements;
- new encounter sequence;
- new Concept Moments;
- new acceptance semantics or stricter SQL correctness merely to simplify diagnosis;
- exact-query matching;
- a general SQL syntax parser;
- learner-facing explanations of untaught SQL constructs derived from implementation guards;
- LEFT JOIN / `NULL` teaching where the current encounter does not teach them;
- a generalized diagnostic framework merely because more than one diagnostic shape is used.

A differentiated corrective message inside the same existing interaction is not by itself adaptive assistance or a new learner path.

If a proposal changes what the learner must know, do, demonstrate, or complete, or introduces materially different assistance behavior beyond local diagnostic correction, classify it as `CANON DECISION REQUIRED` or `POTENTIAL CONFLICT` before implementation.

## 14. Cross-stage decision status

Wave 4 is **not yet closed**.

Current status:

- Stage 1 diagnostic calibration — **COMPLETE**;
- Stage 2 diagnostic calibration — **BLOCKED BY ENCOUNTER-CONFORMANCE DRIFT**;
- Stage 3 diagnostic calibration — **COMPLETE**;
- cross-stage diagnostic patterns — **PARTIALLY ESTABLISHED** as described above;
- learner-facing Wave 4 implementation — **NOT AUTHORIZED YET**.

The earlier SQL-only Stage 1–3 implementation authorization remains withdrawn.

## 15. Next action

The next action is **not Wave 4 implementation**.

1. perform a targeted Stage 2 encounter-conformance correction against the current owner-directed authority;
2. do not use that correction to redesign Stage 2 or add new evidence beyond the authority already established;
3. after the corrected learner path is available, rerun Stage 2 Wave 4 diagnostic calibration across the restored states;
4. update this gate with the final Stage 2 `KEEP / IMPROVE` findings;
5. only then close the cross-stage Wave 4 scope and authorize the smallest justified implementation pass.

No learner-facing implementation is performed by this revision.