# Wave 4 — Diagnostic Feedback Decision Gate

**Date:** 2026-09-15  
**Status:** REOPENED — STAGE 1 CALIBRATION COMPLETE; CROSS-STAGE DECISION PENDING  
**Initiative:** Existing-course experience improvement  
**Action type:** Mapping / decision gate only — no learner-facing implementation authorized by this artifact

## Revision note

This gate was previously marked complete with a narrow conclusion that Wave 4 should be limited to SQL semantic-result diagnostics across Stage 1–3.

That conclusion is **superseded**.

A follow-up review found that the earlier gate moved too quickly from current implementation checks to an implementation scope. It treated most non-SQL feedback as already sufficient without first calibrating the full learner encounter as a course + machine diagnostic-feedback problem.

Wave 4 is therefore reopened. Stage 1 has now been calibrated as the reference specimen. Stage 2 and Stage 3 still require equivalent mapping before Wave 4 can close or authorize implementation.

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

Cross-stage sources inspected while identifying the need to reopen the gate:

- `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`
- `course-design/production/cycle-1/implementation-record-owner-directed-2026-09-13.md`
- `course-design/stage-3/stage-3-interaction-decisions.md`
- `src/funding-participation.js`
- `src/inner-join-unmatched.js`

The Stage 2 / Stage 3 material is not treated here as a completed Wave 4 calibration. It establishes only that cross-stage mapping remains necessary and that a Stage 2 authority/runtime drift must not be silently absorbed into Wave 4.

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

## 9. Machine capability shapes established only as Stage 1 calibration patterns

The Stage 1 calibration reveals three useful machine-side shapes:

- **state-aware diagnostic** — use the learner's current interaction state where it materially changes useful feedback;
- **response-aware diagnostic** — use the selected response when materially different wrong interpretations warrant different correction;
- **result-aware diagnostic** — use robust result/validator evidence to identify which already-established result requirement is not satisfied.

These are **calibration patterns**, not approval to build a generalized Diagnostic Engine or introduce a new abstraction across the course.

Propagation must wait until Stage 2 and Stage 3 are inspected for genuinely equivalent learner roles and needs.

## 10. Stage 2 authority/runtime drift — propagation hold

During the reopened review, a material Stage 2 mismatch was identified between current design records and the current `src/funding-participation.js` runtime.

The current design / owner-directed records describe, among other things, a row-multiplication path without the current 26-row Baseline measurement and with a protected prediction sequence that differs from the current runtime. The current runtime includes a 26-row funding-round Baseline and a different prediction progression.

Wave 4 does **not** resolve that mismatch.

However, Wave 4 must also not improve or canonize feedback around a disputed Stage 2 state until the relevant authority/runtime relationship is clarified.

Therefore:

- do not propagate the Stage 1 diagnostic patterns mechanically into Stage 2;
- do not use Wave 4 to silently redesign Stage 2;
- do not treat the current Stage 2 runtime merely as authority because it exists;
- identify which Stage 2 states are valid current calibration targets before making feedback decisions for them.

This is a propagation hold, not a finding that all Stage 2 work is blocked.

## 11. Explicit Wave 4 boundaries

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
- a generalized diagnostic framework merely because Stage 1 uses more than one diagnostic shape.

A differentiated corrective message inside the same existing interaction is not by itself adaptive assistance or a new learner path.

If a proposal changes what the learner must know, do, demonstrate, or complete, or introduces materially different assistance behavior beyond local diagnostic correction, classify it as `CANON DECISION REQUIRED` or `POTENTIAL CONFLICT` before implementation.

## 12. Cross-stage decision status

Wave 4 is **not yet closed**.

Current status:

- Stage 1 diagnostic calibration — **COMPLETE**;
- Stage 2 diagnostic calibration — **PENDING**, with the authority/runtime drift above requiring explicit handling before affected states are treated as stable targets;
- Stage 3 diagnostic calibration — **PENDING**;
- cross-stage propagation decision — **PENDING**;
- learner-facing implementation — **NOT AUTHORIZED YET**.

The earlier SQL-only Stage 1–3 implementation authorization is withdrawn by this revision.

## 13. Next action

Continue the Wave 4 mapping forward from the learner encounter:

1. establish which current Stage 2 states are legitimate calibration targets in light of the authority/runtime drift;
2. calibrate Stage 2 diagnostic feedback across the valid learner path, separating `KEEP` from justified `IMPROVE` findings and identifying course-side vs machine-side needs;
3. calibrate Stage 3 in the same way;
4. compare the findings with the Stage 1 reference specimen and propagate only genuinely equivalent diagnostic patterns;
5. update this gate with the final cross-stage Wave 4 scope;
6. only then authorize implementation.

No learner-facing implementation is performed by this revision.
