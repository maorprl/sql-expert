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
**Current wave:** Wave 4 — DIAGNOSTIC FEEDBACK GATE REOPENED; Stage 1 + Stage 3 calibration complete, Stage 2 blocked by encounter-conformance drift, implementation not yet authorized

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

For non-visual waves such as diagnostic feedback, preserve the same core discipline: Stage 1 is the calibration specimen, and propagation occurs only after equivalent learner roles and evidence have been inspected in later stages.

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

**Status:** GATE REOPENED — STAGE 1 + STAGE 3 CALIBRATION COMPLETE; STAGE 2 BLOCKED BY CONFORMANCE DRIFT

Decision record:

`course-design/audits/wave-4-diagnostic-feedback-decision-gate-2026-09-15.md`

The earlier gate conclusion that Wave 4 should be limited to SQL semantic-result diagnostics across Stage 1–3 has been superseded.

Current Wave 4 framing:

- diagnostic feedback is evaluated across the learner encounter, covering both course-side instructional correction and machine-side ability to use known learner state / response / result evidence;
- design starts from what the learner has already learned and the plausible incorrect action at that point, not from validator branches or implementation guards;
- an implementation guard is not automatically a learner-facing pedagogical category;
- untaught SQL operations must not be introduced through diagnostic feedback merely because the validator can detect them;
- differentiated feedback is justified only where the current generic correction fails to use materially relevant evidence already available to the learner and machine;
- differentiated feedback inside the same interaction does not by itself create adaptive assistance or a new learner path.

Stage 1 calibration result:

- **IMPROVE:** relation selection — state-aware diagnostic feedback can use which business-information role the current relation set already covers without revealing relation names or later relationship reasoning;
- **KEEP:** connecting-column reasoning;
- **KEEP:** Cardinality;
- **KEEP:** Grain;
- **KEEP:** prepared Baseline execution;
- **KEEP:** Baseline interpretation;
- **KEEP:** prediction;
- **KEEP:** semantic relational action;
- **IMPROVE:** learner-authored SQL semantic failure — result-aware diagnostics may distinguish already-established result dimensions without changing semantic acceptance;
- **IMPROVE:** final verification — response-aware correction may distinguish a Grain/row-meaning mistake from a row-count/multiplication mistake while keeping the learner in the same verification interaction.

Stage 3 calibration result:

- **IMPROVE:** relation selection — the same state-aware gap exists for the company-context / funding-round-information roles;
- **IMPROVE:** learner-authored SQL semantic failure — the same result-aware gap exists for the established five-column / 26-row INNER JOIN contract;
- **KEEP:** connecting-column reasoning, Cardinality, Grain, both prepared measurements, zero-match evidence comparison, INNER JOIN survival prediction, result verification, and final coverage conclusion.

Stage 3 therefore confirms that Stage 1 response-aware feedback is **not** a pattern to propagate mechanically: its current verification and coverage corrections already use the relevant evidence well enough without per-option branching.

Machine-side diagnostic shapes currently established:

- state-aware diagnostic;
- response-aware diagnostic where materially justified;
- result-aware diagnostic.

These shapes do not authorize a generalized Diagnostic Engine or automatic propagation across the course.

Stage 2 blocker:

- the current owner-directed authority requires relations → connection → Grain → Cardinality → qualitative multiplication prediction → repeated-context judgment → Concept Moment → concrete 3→3 application → SQL → actual 1003 evidence slice → verification;
- current `src/funding-participation.js` instead changes the order, inserts a 26-row Baseline, omits the separate repeated-context judgment and concrete 3→3 application, introduces additional operation / JOIN-teaching states, and does not render the required local 1003 evidence slice;
- this is an encounter-conformance defect, not a Wave 4 feedback defect;
- Wave 4 must not canonize or improve feedback around superseded Stage 2 states merely because they exist in runtime.

Stable Stage 2 Wave 4 findings that survive the blocker:

- **IMPROVE:** relation selection;
- **KEEP:** connecting-column correction;
- **IMPROVE:** learner-authored SQL semantic feedback against the stable six-field / 72-row result contract.

The remaining Stage 2 feedback calibration must wait until the learner path is restored to current authority.

Current implementation status:

- no Wave 4 learner-facing implementation is authorized yet;
- the earlier SQL-only implementation next step remains withdrawn;
- Wave 4 closes only after the Stage 2 conformance correction and a rerun of Stage 2 diagnostic calibration on the restored path.

Canon impact for the currently justified patterns:

- evidence-based clarification using already-established business meaning, learner response, or result evidence — primarily `CONFORMANCE` plus local `IMPLEMENTATION CHOICE`;
- new assistance escalation, new learner requirements, new paths, or new acceptance semantics — `CANON DECISION REQUIRED`;
- parser-like or untaught-concept diagnosis that risks teaching from implementation internals or narrowing correctness — `POTENTIAL CONFLICT`.

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

Wave 4 is active and its decision gate remains reopened. The durable decision record is:

`course-design/audits/wave-4-diagnostic-feedback-decision-gate-2026-09-15.md`

Stage 1 and Stage 3 diagnostic calibration are complete. Stage 2 is blocked by a separate encounter-conformance defect between the current owner-directed authority and `src/funding-participation.js`.

The next action is **not Wave 4 implementation**. It is:

1. perform a targeted Stage 2 encounter-conformance correction against the current owner-directed authority;
2. preserve the accepted case, target capability, evidence contract, SQL result contract, controls, and existing course authority rather than redesigning the encounter;
3. after the restored Stage 2 learner path is available, rerun Stage 2 Wave 4 diagnostic calibration and classify the required wrong-feedback states as `KEEP` or `IMPROVE`;
4. update / close the Wave 4 gate with the final cross-stage implementation scope;
5. only then begin the smallest authorized learner-facing Wave 4 implementation pass.

Do not treat the current calibration as blanket approval for per-option feedback, a generalized diagnostic framework, SQL parser behavior, untaught SQL explanations, hint escalation, adaptive assistance, progress semantics, encounter redesign, or Wave 5 work.

## 10. Authority boundary

This initiative may expose a need to change current authority, but it must not make that change inside this management record.

Use the appropriate current source when required, for example:

- `pedagogical-foundations.md` for established course-level pedagogical foundations;
- `course-design/course-visual-language.md` for course-level visual-language authority;
- `course-design/course-controls.md` for course-level control roles / semantics;
- the relevant learner-route / interaction-decision source for encounter-local instructional requirements.

If the appropriate authority source is unclear, classify the matter as `CANON DECISION REQUIRED` and stop before implementation rather than inventing a rule here.