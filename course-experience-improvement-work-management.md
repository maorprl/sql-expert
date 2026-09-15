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
**Current wave:** Wave 5A — COMPLETE; Wave 5B not authorized

Wave 1, Wave 2, Wave 3, Wave 4, and the narrow Wave 5A response-aware feedback treatment are complete.

A broader graduated / adaptive assistance system is not authorized merely because it was previously queued as a candidate direction.

A pattern is not promoted across the course merely because it was implemented once.

## 6. Delivery rule for the current category

Use the same calibration discipline across waves:

1. calibrate Stage 1 as the reference specimen when the wave is cross-stage and the learner role is equivalent;
2. inspect the actual learner role and evidence before making a change;
3. implement the smallest treatment that satisfies the accepted intent;
4. run the actual learner journey through the changed states;
5. only after the calibration is accepted, apply the established pattern elsewhere where the learner role is genuinely equivalent;
6. perform full-course runtime validation after propagation where the wave changes multiple stages.

For visual waves, representative runtime states must still establish primary, supporting, evidence, feedback, concept, and teacher-guidance roles before substantial styling work.

For diagnostic-feedback work, calibration starts from learner reasoning and evidence, not validator branches.

For response-aware feedback, implementation must use already-observable learner responses and must not silently expand into attempt tracking, adaptive routing, learner modelling, or a generalized hint system.

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

**Status:** COMPLETE

Decision record:

`course-design/audits/wave-4-diagnostic-feedback-decision-gate-2026-09-15.md`

The earlier SQL-only gate conclusion was superseded. Wave 4 evaluated diagnostic feedback across the learner encounter and across both course-side correction and machine-side use of known learner state / response / result evidence.

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

This Stage 1 final-verification response branch was not automatically propagated to Stage 2 or Stage 3.

#### Completion record

- Stage 1 calibration was implemented in commit `3351d79dbeb90e6df99d7e4b23b1cb42475bd873`;
- the Stage 1 row-count diagnostic correction was subsequently preserved in commit `cc8a90b7c892c1d70fd47bb08013036b4026f69e`;
- the equivalent relation-selection and successful-SQL semantic-result diagnostics were propagated to Stage 2 and Stage 3 in commit `1856d9a68c013bdf455f3339a3c641869529bd1d`;
- later work proceeded on top of those diagnostics, so the Wave 4 implementation is part of the current runtime baseline rather than an outstanding calibration task.

#### Wave 4 boundaries

Wave 4 did not authorize:

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

Raw SQLite execution errors remained unchanged in Wave 4.

### Wave 5A — Narrow response-aware corrective feedback

**Status:** COMPLETE

Decision record:

`course-design/wave-5a-response-aware-feedback-decision-2026-09-15.md`

Wave 5 was paused before broader graduated / adaptive assistance was implemented. The review found a narrower justified treatment: use the already-observed wrong option only where distinct distractors reasonably indicate distinct misconceptions and where the feedback can redirect the learner to evidence without performing the reasoning for them.

Approved scope was limited to six existing interactions:

- Stage 2 qualitative row-multiplication prediction;
- Stage 2 repeated-context prediction;
- Stage 2 final `funding_round_id = 1003` verification;
- Stage 3 zero-match INNER JOIN prediction;
- Stage 3 post-SQL zero-match verification;
- Stage 3 final company-coverage conclusion.

Completion record:

- decision authority recorded in commit `17a2971bc0a3ad88c551f5279da069e034964af6`;
- the 15 approved response-aware wrong-option mappings were implemented in commit `59d0a3d10cb4d131de755862cbb3fd7b7624805d`;
- the no-selection regression was corrected in commit `26c778829c60013023c9e04013371375486199fb`, restoring the six pre-Wave-5A generic fallbacks without changing the approved mappings;
- post-build review against current `main` returned **PASS**: approved mappings preserved, no-selection fallbacks restored, correct-answer paths unchanged, unlisted generic treatment preserved, no Wave 5B machinery introduced, and the change remained limited to the two authorized runtime files;
- local validation reported `npm test` PASS (5/5), `npm run build` PASS, and `git diff --check` PASS before publication of the correction.

Wave 5A did not reopen Stage 1–3 topology, learner evidence, SQL acceptance, completion behavior, controls, or later-concept timing.

### Wave 5B — Graduated / adaptive assistance

**Status:** NOT AUTHORIZED — SEPARATE DECISION REQUIRED

Previously queued candidate ideas included:

- graduated hints rather than immediate full-solution exposure;
- assistance escalation based on attempts or prior help use;
- verification after strong assistance;
- possible support reduction / expansion based on learner performance.

The Wave 5A review did **not** establish that this machinery is necessary.

A broader hint or adaptive system therefore remains `CANON DECISION REQUIRED`. No attempt tracking, assistance-history tracking, learner-state accumulation, adaptive routing, graduated hint ladder, or performance-based support change may be implemented without a separate decision gate and explicit authority.

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

Wave 5A is complete.

There is no currently authorized Wave 5B implementation.

The next management decision is whether current learner evidence justifies opening a **separate Wave 5B decision gate** for graduated / adaptive assistance. That decision must not assume that broader assistance is necessary merely because it was previously queued.

If no sufficient evidence supports Wave 5B, leave it unapproved and select the next improvement category from the later queue instead.

Any Wave 5B gate must first determine whether the remaining learner problem is actually an assistance-escalation problem rather than an upstream issue in wording, inference distance, evidence visibility, interaction design, or instructional sequencing.

No runtime change is authorized by this section.

## 10. Authority boundary

This initiative may expose a need to change current authority, but it must not make that authority decision inside this management record.

Use the appropriate current source when required, including:

- `pedagogical-foundations.md` for course-level pedagogical foundations;
- `course-design/course-visual-language.md` for visual-language authority;
- `course-design/course-controls.md` for control roles / semantics;
- the relevant learner-route / interaction-decision or current owner-directed source for encounter-local instructional requirements.

If the appropriate authority source is unclear, classify the matter as `CANON DECISION REQUIRED` and stop before implementation rather than inventing a rule here.
