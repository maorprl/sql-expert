# Wave 4 — Diagnostic Feedback Decision Gate

**Date:** 2026-09-15  
**Status:** HISTORICAL / SUPERSEDED INITIATIVE DECISION RECORD — NOT CURRENT AUTHORITY OR WORK AUTHORIZATION
**Initiative:** Existing-course experience improvement  
**Action type:** Mapping / decision gate

This audit is preserved as evidence of the earlier initiative. It does not override the accepted Lessons 1–2 runtime or current Lesson authority.

## Revision history and supersession

This gate was initially closed with an overly narrow conclusion that Wave 4 should be limited to SQL semantic-result diagnostics across Stage 1–3.

That conclusion was reopened and superseded because it moved from implementation checks to implementation scope before calibrating diagnostic feedback across the full learner encounter and across both the **course** and the **machine**.

The reopened review then:

1. calibrated Stage 1 as the reference specimen;
2. identified a Stage 2 authority/runtime conformance drift that blocked valid feedback calibration for affected states;
3. calibrated Stage 3;
4. restored Stage 2 to its controlling owner-directed learner path;
5. reran Stage 2 diagnostic-feedback calibration on the corrected path;
6. compared the three stages and finalized only genuinely equivalent propagation patterns.

This document now contains the final Wave 4 gate decision. The earlier SQL-only authorization is withdrawn.

## 1. Wave 4 purpose

Wave 4 evaluates **diagnostic feedback across the learner encounter**, not only SQL validation.

The governing question is:

> When the learner makes an incorrect move, does the course and machine use what is actually known about that move, together with reasoning or evidence already established, to direct the learner toward what needs reconsideration — without supplying the answer, introducing untaught concepts, or changing the learner path?

The review therefore covers reasoning interactions, evidence interpretation, learner-authored SQL, and result verification where an incorrect learner action exists.

Diagnostic improvement is not justified merely because the machine can distinguish more states. Existing shared feedback should remain when it already redirects the learner to the useful reasoning basis for all relevant mistakes.

## 2. Governing design direction

Diagnostic design proceeds **forward from the learner encounter**, not backward from validator code.

Use this order:

1. establish what the learner has already learned or established at the current point;
2. identify plausible incorrect learner actions within that state;
3. inspect the current corrective feedback;
4. determine whether it usefully redirects the learner to the relevant established reasoning or visible evidence;
5. only when a material gap exists, use machine state / selected response / result evidence that is robustly available;
6. preserve acceptance rules, learner evidence, sequence, and instructional boundaries unless separately authorized.

Implementation guards are not teaching authority.

A SQL construct does not become appropriate learner-facing feedback merely because the validator can detect it. Untaught operations such as `GROUP BY`, `DISTINCT`, `HAVING`, `UNION`, or `LEFT JOIN` must not be introduced through Wave 4 diagnostics unless a current encounter has actually taught or established them.

## 3. Current sources used

Course / initiative:

- `course-experience-improvement-work-management.md`
- `pedagogical-foundations.md`

Stage 1:

- `course-design/stage-1/stage-1-learner-route.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`
- `src/media-coverage.js`

Stage 2:

- `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-and-waiver-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-structural-reuse-2026-09-13.md`
- `course-design/production/cycle-1/test-drive-finding-connection-focus-2026-09-13.md`
- `course-design/production/cycle-1/authority-clarification-show-solution-sql-workspace-2026-09-13.md`
- `course-design/production/cycle-1/implementation-record-owner-directed-2026-09-13.md`
- corrected `src/funding-participation.js`

Stage 3:

- `course-design/stage-3/stage-3-learner-route.md`
- `course-design/stage-3/stage-3-interaction-decisions.md`
- `src/inner-join-unmatched.js`

Shared runtime where relevant:

- `src/main.js`

No older course version or remembered learner flow is used as authority.

## 4. Machine-side diagnostic shapes established by the calibration

The cross-stage review establishes three useful machine-side shapes, but **not** a generalized Diagnostic Engine requirement.

### A. State-aware diagnostic

Use current interaction state when the exact learner state materially changes useful corrective feedback.

Wave 4 approved use: relation-selection diagnostics.

### B. Response-aware diagnostic

Use the selected wrong response only when materially different interpretations warrant different correction and a shared message loses useful precision.

Wave 4 approved use: Stage 1 final verification only.

### C. Result-aware diagnostic

Use robust query-result / semantic-validator evidence to identify which already-established result requirement is not satisfied.

Wave 4 approved use: learner-authored SQL semantic failure in Stage 1–3.

These shapes are implementation patterns. They do not establish a new course-wide adaptive-feedback system.

## 5. Stage 1 calibration — final verdict

| Learner state | Decision | Rationale |
|---|---|---|
| Relation selection | **IMPROVE** | The machine knows the selected set, but materially different missing / extra information-role states collapse to one broad message. |
| Connecting-column reasoning | **KEEP** | Current feedback returns to article-row meaning and preserves the protected PK/FK reveal. |
| Cardinality | **KEEP** | Shared correction provides the two structural facts needed by all current distractors. |
| Grain | **KEEP** | Correctly redirects to the organizing subject of the business request. |
| Prepared Baseline execution | **KEEP** | Measurement state, not authored SQL debugging. |
| Baseline interpretation | **KEEP** | Correctly redirects to the counted relation and row meaning. |
| Prediction | **KEEP** | Reuses 18 starting article rows + one source match per article. |
| Semantic relational action | **KEEP** | Correctly distinguishes combining from filtering / collapsing. |
| Learner-authored SQL semantic failure | **IMPROVE** | Different failures of the established result contract collapse into one generic message. |
| Final verification | **IMPROVE** | Wrong Grain interpretation and wrong row-count/multiplication interpretation currently receive the same broad correction. |

### Stage 1 approved response-aware exception

Final verification may distinguish:

- **row meaning / Grain error** → direct attention to what one visible result row represents;
- **row count / multiplication error** → direct attention to the visible row count and the earlier one-match-per-article prediction.

The learner remains in the same verification question. This is not adaptive assistance or new branching.

## 6. Stage 2 conformance restoration and calibration — final verdict

### Conformance restoration prerequisite

The reopened Wave 4 review found that the then-current runtime had drifted from the controlling owner-directed path. The drift included a reintroduced 26-row Baseline, altered Grain/Cardinality ordering, collapsed prediction evidence, premature Concept Moment naming, extra semantic-operation / JOIN-teaching states, and missing local 1003 result evidence.

Wave 4 did not canonize or improve feedback around those disputed states.

The Stage 2 runtime was first restored to the controlling path:

`relations → connection → Grain → Cardinality → qualitative multiplication prediction → repeated-context prediction → JOIN row multiplication Concept Moment → concrete 3→3 application → SQL → accepted 72-row result → learner-result-derived 1003 slice → final verification`

The conformance restoration is recorded in the 2026-09-15 addendum to `implementation-record-owner-directed-2026-09-13.md`.

### Stage 2 Wave 4 calibration

| Learner state | Decision | Rationale |
|---|---|---|
| Relation selection | **IMPROVE** | Equivalent state-aware gap to Stage 1: the selected set is known, but missing/extra information roles collapse to one broad message. |
| Connecting-column reasoning | **KEEP** | Current correction returns to participation-row meaning without revealing the relationship prematurely. |
| Grain | **KEEP** | Current correction returns to the requirement that each recorded participation remain individually visible. |
| Cardinality | **KEEP** | Current correction uses the established FK direction and repeated funding-round ID possibility; per-option branching is not needed. |
| Qualitative multiplication prediction | **KEEP** | Current correction holds participation Grain fixed and asks whether all participation records remain represented. |
| Repeated-context / non-duplicate prediction | **KEEP** | Current correction returns to row meaning and distinguishes repeated round context from duplicate participation records. |
| Concrete 3→3 application | **KEEP** | Current correction directly reuses one-participation-per-row Grain after the structural prediction has already been established. |
| Learner-authored SQL semantic failure | **IMPROVE** | Multiple failures of the six-field / 72-row / relationship-preserving result contract collapse into one generic message. |
| 1003 final verification | **KEEP** | The local slice from the learner's accepted result plus the current correction already directs attention to repeated round fields versus changing participation identifiers. |

The prior Stage 2 propagation hold is therefore cleared.

## 7. Stage 3 calibration — final verdict

| Learner state | Decision | Rationale |
|---|---|---|
| Relation selection | **IMPROVE** | Equivalent state-aware gap: the machine knows which information roles the selected set covers but returns one broad message. |
| Connecting-column reasoning | **KEEP** | Current correction returns to funding-round row meaning. |
| Cardinality | **KEEP** | Current feedback correctly uses FK direction and the possibility of zero matches. |
| Grain | **KEEP** | Current feedback preserves funding-round Grain and the required records. |
| Prepared company measurement | **KEEP** | Correctly treated as evidence collection, not SQL authoring. |
| Prepared funding-round measurement | **KEEP** | Same. |
| Zero-match company identification | **KEEP** | Current correction directs the learner to compare the company ID against visible funding-round Results. |
| INNER JOIN prediction | **KEEP** | Current feedback returns to matched row pairs and asks how many pairs the zero-match company can produce. |
| Learner-authored SQL semantic failure | **IMPROVE** | Multiple established semantic-result failures collapse into one generic message. |
| Result verification | **KEEP** | Current correction directs the learner to the specific company ID in visible Results rather than total row count. |
| Coverage conclusion | **KEEP** | Current correction reuses the learner-established zero-match company as evidence. |

Stage 3 does **not** justify response-specific per-option feedback merely because the machine knows which distractor was selected.

## 8. Final cross-stage Wave 4 scope

### Target 1 — State-aware relation-selection diagnostics across Stage 1–3

**IN WAVE 4**

All three encounters ask the learner to identify relations from a business-information need. The current machine knows the selected relation set but reduces all non-exact selections to one broad correction.

Approved diagnostic direction:

- identify which **business-information role** is still missing;
- identify when required information roles are covered but an unnecessary relation remains;
- do not reveal the required relation name;
- do not expose connecting keys, PK/FK, Cardinality, or later answers.

This is the same learner role across Stage 1–3 and is approved for selective propagation after Stage 1 implementation calibration.

**Classification:** `CONFORMANCE` + local `IMPLEMENTATION CHOICE`

### Target 2 — Result-aware SQL semantic diagnostics across Stage 1–3

**IN WAVE 4**

After successful SQL execution, the current validators collapse materially different failures of already-established result requirements into a generic message.

A later implementation may retain the existing acceptance boundary while distinguishing only robust learner-meaningful dimensions such as:

1. required taught JOIN / `ON` implementation is absent where robustly determinable;
2. disclosed output fields / aliases do not match the requested output contract;
3. returned row count conflicts with established result evidence;
4. shape/count are plausible but returned row associations do not satisfy the already-established relationship / result semantics.

Stage anchors:

- **Stage 1:** `title | source_name`, 18 rows, one article per row, correct article-source association;
- **Stage 2:** six requested fields, 72 participation rows, one participation per row, correct funding-round context for every participation;
- **Stage 3:** five requested fields, 26 funding-round-grain INNER JOIN rows, correct company-round associations and zero-match company absent from the INNER JOIN result.

Feedback may state observed result evidence such as actual returned row count. It must not guess an unproven learner misconception or coding cause.

Internal validator guards for untaught SQL constructs remain internal. If only an internal guard fails and no approved learner-facing semantic dimension can be established, retain a generic semantic correction rather than teaching from the guard.

**Classification:** `CONFORMANCE` + local `IMPLEMENTATION CHOICE`

### Target 3 — Stage 1 response-aware final-verification correction

**IN WAVE 4 — STAGE 1 ONLY**

The two Stage 1 wrong interpretations are materially different and the current shared feedback unnecessarily tells the learner to recheck both dimensions.

Approved differentiation is limited to the existing selected response and the already-visible result evidence.

Do not propagate this pattern to Stage 2 / Stage 3 final verification unless later evidence independently justifies it.

**Classification:** `CONFORMANCE` + local `IMPLEMENTATION CHOICE`

## 9. Explicit KEEP / out-of-scope boundaries

Wave 4 does not authorize:

- per-option feedback everywhere;
- a generalized Diagnostic Engine;
- attempt-count-based escalation;
- graduated hints;
- adaptive assistance;
- automatic solution reveal;
- changes to Show solution semantics;
- progress / completion semantic changes;
- new learner evidence requirements;
- new encounter sequence or Concept Moments;
- stricter SQL acceptance rules merely to simplify diagnosis;
- exact-query matching;
- a general SQL parser;
- learner-facing explanations of untaught SQL constructs derived from guards;
- LEFT JOIN / `NULL` teaching where the encounter does not teach them;
- changes to business questions, Grain, Cardinality, or established result semantics.

Raw SQLite execution errors remain outside Wave 4. `src/main.js` already displays the execution error locally. A pedagogical rewrite of SQLite syntax errors would require separate evidence.

## 10. Implementation and propagation rule

Wave 4 implementation is now authorized **only through the existing Stage 1-first delivery discipline**.

The next implementation action is:

1. implement the three approved Stage 1 targets only:
   - relation-selection state-aware diagnostic;
   - SQL semantic result-aware diagnostic;
   - final-verification response-aware correction;
2. run the actual Stage 1 journey through the changed states and verify unchanged acceptance / evidence / completion behavior;
3. only after Stage 1 implementation is accepted, propagate the two genuinely equivalent patterns to Stage 2 and Stage 3:
   - relation-selection state-aware diagnostic;
   - SQL semantic result-aware diagnostic;
4. do **not** propagate the Stage 1 final-verification response branch to Stage 2 / 3;
5. run full Stage 1–3 runtime validation after propagation.

If implementation requires new instructional branching, new assistance escalation, new acceptance semantics, or learner-facing diagnosis of untaught implementation guards, stop and classify that portion as `CANON DECISION REQUIRED` or `POTENTIAL CONFLICT`.

## 11. Gate closure

Wave 4 mapping / decision work is **COMPLETE**.

Final approved scope:

- Stage 1–3 relation-selection diagnostic improvement;
- Stage 1–3 successful-SQL semantic-result diagnostic improvement;
- Stage 1-only response-aware final-verification correction.

Everything else reviewed remains `KEEP` for Wave 4 unless later evidence reopens a specific state.

No Wave 4 learner-facing implementation is performed by this gate artifact itself.
