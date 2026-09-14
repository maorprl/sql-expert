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

At initiative launch, the current multi-chapter implementation baseline is the branch:

`stage3-inner-join-unmatched-rebuild-2026-09-13`

at commit:

`eb99d3c4e85556ab291eb652ce3d4c81b62b626b`

This baseline contains the current implemented sequence used for experience review:

- media coverage / first JOIN encounter;
- funding participation / row-multiplication encounter;
- INNER JOIN unmatched / zero-match encounter.

The earlier `stage3-fanout-runtime-slice-2026-09-13` branch is a shelved experimental alternative and is not part of this initiative baseline.

The baseline identifies the starting implementation state only. It does not make this work-management record an authority for course progression.

## 3. Why this initiative is active now

Cross-chapter review of the current course found that the walkthrough is present and generally understandable, but the experience still tends to feel more like a guided task wizard with feedback than a continuous teacher-led learning journey.

The current evidence especially points to gaps in:

- continuity between reasoning moves;
- explicit orientation when the primary work area changes;
- active reuse of reasoning the learner has already established;
- consistency of teacher presence across states;
- visual clarity about what is primary, supporting, evidence, feedback, or concept.

This reopens learner-experience work from **new multi-chapter evidence**. It does not invalidate earlier Stage 1 validation or imply that the existing Stage 1 pedagogy was previously wrong.

## 4. Canon-impact classification

Every planned change in this initiative should be classified before implementation when its authority impact is not already obvious.

### `CONFORMANCE`

The current authority already requires the behavior or principle. The work is implementation / content correction toward that authority.

### `IMPLEMENTATION CHOICE`

The current authority permits the change and leaves the exact treatment to implementation. No authority update is required unless the implementation begins to create a new rule.

### `CANON DECISION REQUIRED`

The proposed change would establish behavior, pedagogy, control semantics, or a learner contract that is currently OPEN or not established. Implementation must stop at that decision boundary until the appropriate source of truth is updated.

### `POTENTIAL CONFLICT`

The proposed treatment may contradict current authority, leak a later answer, remove required reasoning, bypass required evidence, or otherwise weaken an established instructional function. It must be reconciled before implementation.

The management classification itself is not authority.

## 5. Current improvement category

### Teacher voice / Walkthrough

**Status:** ACTIVE  
**Current wave:** Wave 4 — DIAGNOSTIC FEEDBACK DECISION GATE COMPLETE; narrow SQL semantic-diagnostic scope selected, implementation not yet performed

This is the first active category in the broader existing-course improvement initiative.

The goal is to make the course feel like a continuous teacher-led walkthrough while preserving the learner's own reasoning and the established interaction sequence.

Wave 1 was calibrated on Stage 1, accepted, propagated to Stage 2 and Stage 3, and merged. Wave 2 was then calibrated on Stage 1, reviewed and merged in PR #4, selectively propagated to Stage 2 and Stage 3, reviewed and merged in PR #5, and validated through full Stage 1–3 runtime journeys and chapter-state isolation. Wave 3 then consolidated genuinely shared visual-role treatments, corrected the Stage 3 post-SQL evidence-role drift, and completed reduced-motion handling for the existing non-essential transitions without changing learner flow or adding new motion.

A pattern is not promoted across the course merely because it was implemented once.

## 6. Delivery rule for the current category

Use this sequence:

1. calibrate Stage 1 as the reference specimen;
2. inspect representative runtime states before substantial visual implementation;
3. review a visual treatment / mockup or annotated runtime proposal for the representative states;
4. implement the smallest treatment that satisfies the accepted intent;
5. run the actual Stage 1 journey through the changed states;
6. only after Stage 1 is accepted, apply the established pattern to Stage 2 and Stage 3 where the learner role is equivalent;
7. perform a full-course runtime walkthrough after propagation.

A static code review is not sufficient acceptance evidence for a visual / walkthrough change.

### Required visual calibration checkpoint

Before substantial CSS or composition changes are treated as approved implementation, inspect at least these representative Stage 1 states:

- relational reasoning / Working Schema;
- SQL authoring;
- Results / verification.

For each state, establish:

- the primary learner surface;
- supporting / reference surfaces;
- the teacher-guidance role;
- the task role;
- the evidence role;
- the feedback role;
- the concept-takeaway role;
- the smallest visual treatment needed to make those roles legible.

Wave 1 satisfied this checkpoint before cross-stage propagation. Future substantial visual work should use the same evidence rule where applicable rather than treating earlier visual acceptance as blanket approval for later changes.

## 7. Teacher voice / Walkthrough waves

### Wave 1 — Existing-authority conformance calibration

**Status:** COMPLETE

Completion record:

- Stage 1 calibration was reviewed, accepted, and merged in PR #2;
- the accepted pattern was propagated to Stage 2 and Stage 3 and merged in PR #3;
- runtime validation covered all three stages and chapter-state isolation.

Scope:

- make spatial guidance explicit when the action location is not already obvious;
- narrate meaningful handoffs when the learner's primary work region changes;
- actively reuse conclusions the learner has already established where continuity matters;
- make the current work / evidence area visually legible as the primary focus;
- strengthen role consistency between teacher guidance, learner task, evidence, feedback, and concept takeaway.

Canon impact:

- spatial guidance — primarily `CONFORMANCE`;
- meaningful screen handoffs — primarily `CONFORMANCE`;
- active reuse of prior reasoning — primarily `CONFORMANCE`;
- active-area focus — `CONFORMANCE` plus local `IMPLEMENTATION CHOICE`;
- exact styling used to express role distinction — generally `IMPLEMENTATION CHOICE` within existing visual authority.

Do not use this wave to introduce new progress semantics, new hint systems, new validators, new answer logic, new completion behavior, or new Stage sequencing.

### Wave 2 — Consistent teacher voice and continuity

**Status:** COMPLETE

Completion record:

- Stage 1 continuity calibration was reviewed PASS and merged in PR #4;
- the accepted continuity pattern was selectively translated to Stage 2 and Stage 3 and merged in PR #5;
- Stage 2, Stage 3, and unchanged Stage 1 full runtime journeys passed;
- chapter-state isolation was verified;
- propagation remained limited to teacher-guidance continuity and did not change learner questions, validators, SQL behavior, sequence, completion behavior, hints, progress semantics, adaptive behavior, or visual-focus behavior.

Scope:

- more consistent bridge language across reasoning moves;
- explicit connection between what was established, what matters now, and what follows;
- chapter openings / closings that strengthen continuity without pre-resolving the learner's reasoning;
- clearer transition wording where `Continue` or equivalent actions change the learner's mode of work;
- concise end-of-chapter synthesis using actual evidence from the completed encounter.

The completed implementation strengthens continuity only where the actual learner journey needed it. Established reasoning is carried into the next meaningful action without mechanically adding teacher text to every state or pre-solving the learner's next reasoning move.

Canon impact:

- continuity and teacher guidance — largely `CONFORMANCE`;
- exact wording / presentation — often `IMPLEMENTATION CHOICE`;
- any opening or bridge that states a conclusion the learner is supposed to derive — `POTENTIAL CONFLICT`;
- any new learner requirement introduced through the guidance structure — `CANON DECISION REQUIRED`.

### Wave 3 — Visual support and motion polish

**Status:** COMPLETE

Completion record:

- genuinely shared learner-facing visual-role treatments were consolidated into the shared stylesheet while encounter-specific geometry and local overrides were retained;
- Stage 3 post-SQL Results/evidence received the established evidence-action treatment for the equivalent learner role without changing flow, copy, evidence generation, or attention choreography;
- `prefers-reduced-motion` handling was added for the existing Business Request and Working Schema data-card transitions, with no new motion introduced;
- targeted Stage 1–3 runtime validation, production build, and `git diff --check` were reported PASS for the implementation branch before closure;
- final code review found no merge-blocking scope or authority violation.

Implemented scope:

- consolidate shared visual roles where the learner-facing role and phase are genuinely equivalent;
- retain encounter-specific layout and geometry locally where equivalence is not established;
- correct the Stage 3 post-SQL evidence-role visual drift;
- support `prefers-reduced-motion` for existing non-essential transitions;
- keep layout movement subordinate to learner orientation and introduce no new motion without a separate justified decision.

Canon impact:

- making current focus visually dominant — `CONFORMANCE`;
- exact color / border / shadow / fade treatment — `IMPLEMENTATION CHOICE`;
- visual behavior that changes learner flow or reveals later answers — `POTENTIAL CONFLICT`.

### Wave 4 — Diagnostic feedback

**Status:** DECISION GATE COMPLETE — NARROW IMPLEMENTATION SCOPE SELECTED

Decision record:

`course-design/audits/wave-4-diagnostic-feedback-decision-gate-2026-09-15.md`

Gate conclusion:

- current closed reasoning feedback, prepared-measurement feedback, prediction feedback, and result-verification feedback are sufficiently diagnostic for the current Stage 1–3 interactions and remain unchanged;
- raw SQLite execution errors remain outside Wave 4 rather than being wrapped in a brittle syntax classifier;
- the justified Wave 4 target is successful SQL execution that fails an encounter's semantic result contract;
- Stage 1, Stage 2, and Stage 3 may distinguish already-established failure dimensions such as required relational implementation, output-contract mismatch, row-count / Grain-behavior mismatch, and relationship / row-association mismatch;
- diagnosis must reuse existing validator/result evidence, must not narrow semantic correctness, and must not create a new instructional path;
- new assistance escalation, adaptive behavior, new learner-path branching, or new acceptance semantics remain outside this gate and require their own authority treatment.

Canon impact for the selected scope:

- evidence-based clarification of an already-established semantic requirement — `CONFORMANCE` plus local `IMPLEMENTATION CHOICE`;
- materially different instructional branching or assistance escalation — `CANON DECISION REQUIRED`;
- parser-like diagnosis that risks rejecting semantically correct SQL — `POTENTIAL CONFLICT`.

### Wave 5 — Graduated / adaptive assistance

**Status:** QUEUED WITHIN CURRENT CATEGORY

Candidate scope:

- graduated hints rather than immediate full-solution exposure;
- assistance escalation based on attempts or prior help use;
- verification after strong assistance such as a revealed solution;
- possible reduction or expansion of support based on learner performance.

Canon impact:

- a broader graduated-hint system — `CANON DECISION REQUIRED`;
- adaptive behavior based on attempts / performance — `CANON DECISION REQUIRED`;
- any adaptation that skips a required instructional function or required learner evidence — `POTENTIAL CONFLICT`.

Wave 5 is not assumed to be necessary merely because it is listed. It should be evaluated after the earlier waves are stable.

## 8. Later improvement-category queue

The following additional course-experience categories have been identified but are intentionally **not yet planned in detail** and are **not yet sequenced relative to one another**:

- cross-chapter consistency;
- orientation & progress;
- spatial guidance beyond the narrow needs of the active Teacher voice / Walkthrough work;
- visual language & focus beyond the narrow needs of the active category;
- motion & transitions beyond the narrow needs of the active category;
- pedagogical structure / interaction depth;
- localization / Hebrew + RTL.

Some narrow concerns from these categories may be touched when they are necessary to complete the active Teacher voice / Walkthrough work. That does not mean the broader category has been designed or resolved.

### Localization status

Hebrew / RTL localization is currently **DEFERRED**. It should be planned as its own later category rather than mixed into the current walkthrough calibration.

## 9. Current next action

Wave 1, Wave 2, and Wave 3 are complete across Stage 1, Stage 2, and Stage 3.

The Wave 4 mapping / decision gate is also complete. Its durable decision record is:

`course-design/audits/wave-4-diagnostic-feedback-decision-gate-2026-09-15.md`

The next action is a **narrow Wave 4 implementation pass for SQL semantic-result diagnostic feedback across Stage 1–3**, constrained to the failure dimensions selected by that gate.

Before changing learner-facing code, the implementer must consume the gate record and the relevant current encounter authority. The implementation must preserve existing learner paths, evidence, validators' semantic acceptance boundaries, SQL equivalence, hints, progress semantics, and completion behavior.

If the proposed implementation requires new instructional branching, new assistance escalation, new acceptance semantics, or parser-like SQL diagnosis, stop and classify that portion as `CANON DECISION REQUIRED` or `POTENTIAL CONFLICT` rather than implementing it.

Do not treat completion of Waves 1–3 or the Wave 4 decision gate as blanket approval for progress semantics, hints, adaptive behavior, visual behavior, motion, encounter redesign, or Wave 5 work.

## 10. Authority boundary

This initiative may expose a need to change current authority, but it must not make that change inside this management record.

Use the appropriate current source when required, for example:

- `pedagogical-foundations.md` for established course-level pedagogical foundations;
- `course-design/course-visual-language.md` for course-level visual-language authority;
- `course-design/course-controls.md` for course-level control roles / semantics;
- the relevant learner-route / interaction-decision source for encounter-local instructional requirements.

If the appropriate authority source is unclear, classify the matter as `CANON DECISION REQUIRED` and stop before implementation rather than inventing a rule here.
