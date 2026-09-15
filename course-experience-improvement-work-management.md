# Course Experience Improvement Work Management

**Status:** WORKING  
**Role:** Program A / A3 — Learning Experience & Runtime initiative work-management record

This document manages the current improvement project for the **existing implemented course experience**.

It is a work-management record, not pedagogical, visual, Stage, control, schema, data, process, execution, review, or validation authority.

When this initiative encounters a decision that requires authority, the decision must be made in the appropriate current source of truth. This record may identify that dependency, but it must not silently resolve it.

## 1. Initiative purpose

Improve the learner experience of the course that is already implemented, without treating the work as a new curriculum build or as automatic redesign of the learner encounters.

The initiative may improve wording, orientation, walkthrough continuity, visual focus, interaction support, feedback, and other learner-experience concerns where justified by evidence from the current course.

It must not use implementation work to silently change established pedagogy, Stage-local reasoning requirements, control semantics, or unresolved course-level decisions.

## 2. Launch baseline

At initiative launch, the current multi-chapter implementation baseline was the branch:

`stage3-inner-join-unmatched-rebuild-2026-09-13`

at commit:

`eb99d3c4e85556ab291eb652ce3d4c81b62b626b`

That baseline contained the implemented sequence used for experience review:

- media coverage / first JOIN encounter;
- funding participation / row-multiplication encounter;
- INNER JOIN unmatched / zero-match encounter.

The baseline identifies the starting implementation state only. Current default-branch authority and current corrected runtime remain controlling for later work.

## 3. Why this initiative is active

Cross-chapter review found that the course is generally understandable but can still behave more like a guided task wizard with feedback than a continuous teacher-led learning journey.

The initiative therefore addresses evidence-backed gaps in areas such as:

- continuity between reasoning moves;
- explicit orientation when the primary work area changes;
- active reuse of reasoning already established;
- consistency of teacher presence;
- visual clarity about task, evidence, feedback, reference, and concept roles;
- diagnostic quality of corrective feedback.

This does not invalidate earlier Stage 1 validation or imply that previously accepted pedagogy was wrong.

## 4. Canon-impact classification

### `CONFORMANCE`

Current authority already requires the behavior or principle. Work corrects implementation / content toward that authority.

### `IMPLEMENTATION CHOICE`

Current authority permits the treatment and leaves the exact implementation open. No authority update is required unless implementation begins to create a new rule.

### `CANON DECISION REQUIRED`

The proposed change would establish behavior, pedagogy, control semantics, or learner contract that is currently OPEN or not established. Stop implementation until the appropriate authority is updated.

### `POTENTIAL CONFLICT`

The proposed treatment may contradict authority, leak a later answer, remove required reasoning or evidence, narrow accepted correctness, or otherwise weaken an instructional function. Reconcile before implementation.

The management classification itself is not authority.

## 5. Current improvement category

### Teacher voice / Walkthrough

**Status:** ACTIVE  
**Current wave:** Wave 4 — DECISION GATE COMPLETE; Stage 1 implementation calibration authorized, cross-stage propagation not yet authorized

Wave 1, Wave 2, and Wave 3 are complete.

A pattern is not promoted across the course merely because it was implemented once.

## 6. Delivery rule for the current category

Use the same calibration discipline across waves:

1. calibrate Stage 1 as the reference specimen;
2. inspect the actual learner role and evidence before making a change;
3. implement the smallest treatment that satisfies the accepted intent;
4. run the actual Stage 1 journey through the changed states;
5. only after Stage 1 is accepted, apply the established pattern to Stage 2 / Stage 3 where the learner role is genuinely equivalent;
6. perform full-course runtime validation after propagation.

For visual waves, representative runtime states must still establish primary, supporting, evidence, feedback, concept, and teacher-guidance roles before substantial styling work.

For diagnostic-feedback work, calibration starts from learner reasoning and evidence, not validator branches.

## 7. Teacher voice / Walkthrough waves

### Wave 1 — Existing-authority conformance calibration

**Status:** COMPLETE

Completion record:

- Stage 1 calibration accepted and merged in PR #2;
- accepted pattern propagated to Stage 2 / Stage 3 and merged in PR #3;
- runtime validation covered all three stages and chapter-state isolation.

Scope included spatial guidance, meaningful handoffs, active reuse of prior reasoning, active-area focus, and visual role consistency without changing learner evidence, validators, hints, progress semantics, or stage sequence.

### Wave 2 — Consistent teacher voice and continuity

**Status:** COMPLETE

Completion record:

- Stage 1 continuity calibration reviewed PASS and merged in PR #4;
- selective Stage 2 / Stage 3 propagation merged in PR #5;
- Stage 1–3 runtime journeys and chapter-state isolation were validated.

Scope remained teacher-guidance continuity only; it did not change learner questions, validators, SQL behavior, sequence, completion behavior, hints, progress semantics, adaptive behavior, or visual-focus semantics.

### Wave 3 — Visual support and motion polish

**Status:** COMPLETE

Completion record:

- shared learner-facing visual-role treatments were consolidated where roles were genuinely equivalent;
- Stage 3 post-SQL evidence-role drift was corrected;
- `prefers-reduced-motion` handling was added for existing non-essential transitions;
- targeted runtime / build checks were reported PASS before closure.

Wave 3 did not change learner flow or introduce new motion.

### Wave 4 — Diagnostic feedback

**Status:** DECISION GATE COMPLETE — STAGE 1 IMPLEMENTATION CALIBRATION NEXT

Decision record:

`course-design/audits/wave-4-diagnostic-feedback-decision-gate-2026-09-15.md`

The earlier SQL-only gate conclusion was superseded. Wave 4 now evaluates diagnostic feedback across the learner encounter and across both course-side correction and machine-side use of known learner state / response / result evidence.

#### Final cross-stage scope

**Target A — relation-selection diagnostics, Stage 1–3**

Use selected-relation state to indicate which business-information role remains missing or which selected relation is unnecessary, without naming the required relation or revealing later relationship reasoning.

Machine shape: **state-aware diagnostic**.

**Target B — successful-SQL semantic-result diagnostics, Stage 1–3**

Retain semantic acceptance boundaries while distinguishing robust already-established result dimensions such as:

- required taught JOIN / `ON` implementation absent where robustly determinable;
- disclosed output-contract mismatch;
- returned row-count mismatch against established evidence;
- relationship / row-association mismatch after shape/count are otherwise plausible.

Untaught SQL constructs detected by internal guards remain internal and must not become learner-facing teaching categories.

Machine shape: **result-aware diagnostic**.

**Target C — Stage 1 final verification only**

Differentiate the existing wrong Grain / row-meaning interpretation from the wrong row-count / multiplication interpretation, using the selected response and visible result evidence.

Machine shape: **response-aware diagnostic**.

Do not propagate this response-aware final-verification treatment automatically to Stage 2 or Stage 3; their current verification corrections remain `KEEP`.

#### Stage calibration summary

**Stage 1**

- `IMPROVE`: relation selection;
- `IMPROVE`: learner-authored SQL semantic failure;
- `IMPROVE`: final verification;
- other reviewed wrong-answer treatments: `KEEP`.

**Stage 2**

A conformance drift was discovered during Wave 4 and corrected before feedback calibration. The restored path is:

`relations → connection → Grain → Cardinality → qualitative multiplication prediction → repeated-context prediction → Concept Moment → 3→3 application → SQL → accepted result → learner-result-derived 1003 slice → verification`

The correction is recorded in the 2026-09-15 addendum to:

`course-design/production/cycle-1/implementation-record-owner-directed-2026-09-13.md`

After restoration:

- `IMPROVE`: relation selection;
- `IMPROVE`: learner-authored SQL semantic failure;
- connection, Grain, Cardinality, qualitative prediction, repeated-context prediction, 3→3 application, and 1003 verification: `KEEP`.

The prior Stage 2 propagation hold is cleared.

**Stage 3**

- `IMPROVE`: relation selection;
- `IMPROVE`: learner-authored SQL semantic failure;
- connection, Cardinality, Grain, prepared evidence measurements, zero-match identification, prediction, verification, and coverage conclusion: `KEEP`.

#### Wave 4 boundaries

Wave 4 does not authorize:

- per-option feedback everywhere;
- a generalized Diagnostic Engine;
- attempt-count escalation;
- graduated hints or adaptive assistance;
- automatic solution reveal;
- Show solution semantic changes;
- progress / completion changes;
- new learner evidence requirements;
- new encounter sequence or Concept Moments;
- exact-query matching;
- stricter SQL acceptance merely to simplify diagnosis;
- a general SQL parser;
- learner-facing explanations of untaught SQL constructs from validator guards;
- LEFT JOIN / `NULL` teaching where not already taught.

Raw SQLite execution errors remain unchanged in Wave 4.

### Wave 5 — Graduated / adaptive assistance

**Status:** QUEUED WITHIN CURRENT CATEGORY

Candidate scope remains:

- graduated hints rather than immediate full-solution exposure;
- assistance escalation based on attempts or prior help use;
- verification after strong assistance;
- possible support reduction / expansion based on learner performance.

A broader hint or adaptive system remains `CANON DECISION REQUIRED` and is not assumed necessary merely because it is queued.

## 8. Later improvement-category queue

Later categories remain intentionally unplanned in detail:

- cross-chapter consistency;
- orientation & progress;
- spatial guidance beyond current narrow needs;
- visual language & focus beyond current narrow needs;
- motion & transitions beyond current narrow needs;
- pedagogical structure / interaction depth;
- localization / Hebrew + RTL.

Hebrew / RTL localization remains **DEFERRED** as a separate later category.

## 9. Current next action

Wave 4 mapping / decision work is complete.

The next action is **Stage 1 Wave 4 implementation calibration only**:

1. implement state-aware relation-selection feedback in Stage 1;
2. implement result-aware semantic SQL feedback in Stage 1 without changing accepted semantic correctness;
3. implement response-aware Stage 1 final-verification correction;
4. run the actual Stage 1 learner journey through those changed states;
5. verify unchanged sequence, evidence requirements, validator acceptance boundary, SQL equivalence, progress, and completion behavior;
6. only after Stage 1 acceptance, propagate the two equivalent patterns — relation selection and SQL semantic feedback — to Stage 2 / Stage 3;
7. do not propagate the Stage 1 final-verification response branch;
8. perform full Stage 1–3 runtime validation after propagation.

If Stage 1 implementation requires new learner paths, new assistance escalation, new acceptance semantics, parser-like diagnosis, or untaught-concept feedback, stop and classify that portion as `CANON DECISION REQUIRED` or `POTENTIAL CONFLICT`.

## 10. Authority boundary

This initiative may expose a need to change current authority, but it must not make that authority decision inside this management record.

Use the appropriate current source when required, including:

- `pedagogical-foundations.md` for course-level pedagogical foundations;
- `course-design/course-visual-language.md` for visual-language authority;
- `course-design/course-controls.md` for control roles / semantics;
- the relevant learner-route / interaction-decision or current owner-directed source for encounter-local instructional requirements.

If the appropriate authority source is unclear, classify the matter as `CANON DECISION REQUIRED` and stop before implementation rather than inventing a rule here.
