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
**Current wave:** Wave 2 — consistent teacher voice and continuity

This is the first active category in the broader existing-course improvement initiative.

The goal is to make the course feel like a continuous teacher-led walkthrough while preserving the learner's own reasoning and the established interaction sequence.

Wave 1 has been calibrated on Stage 1, accepted, propagated to Stage 2 and Stage 3, and merged. Wave 2 is now being calibrated on Stage 1 before any cross-stage propagation.

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

Any code already produced before this checkpoint for the current Wave 1 should be treated as **provisional prototype work** until the calibration is reviewed.

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

**Status:** ACTIVE — Stage 1 calibration reviewed PASS; Draft PR #4 pending merge

Candidate scope:

- more consistent bridge language across reasoning moves;
- explicit connection between what was established, what matters now, and what follows;
- chapter openings / closings that strengthen continuity without pre-resolving the learner's reasoning;
- clearer transition wording where `Continue` or equivalent actions change the learner's mode of work;
- concise end-of-chapter synthesis using actual evidence from the completed encounter.

Current Stage 1 calibration strengthens continuity at the identified gaps without mechanically adding teacher text to every state. It carries established reasoning into the next meaningful action across relation selection, relationship reasoning, result Grain, JOIN teaching, SQL implementation, and result verification while preserving learner-owned reasoning.

Canon impact:

- continuity and teacher guidance — largely `CONFORMANCE`;
- exact wording / presentation — often `IMPLEMENTATION CHOICE`;
- any opening or bridge that states a conclusion the learner is supposed to derive — `POTENTIAL CONFLICT`;
- any new learner requirement introduced through the guidance structure — `CANON DECISION REQUIRED`.

### Wave 3 — Visual support and motion polish

**Status:** QUEUED WITHIN CURRENT CATEGORY

Candidate scope:

- refine active-focus treatment after Wave 1 calibration;
- consolidate shared visual roles where practical;
- use restrained transitions for meaningful state changes;
- support `prefers-reduced-motion`;
- keep layout movement subordinate to learner orientation.

Canon impact:

- making current focus visually dominant — `CONFORMANCE`;
- exact color / border / shadow / fade treatment — `IMPLEMENTATION CHOICE`;
- visual behavior that changes learner flow or reveals later answers — `POTENTIAL CONFLICT`.

### Wave 4 — Diagnostic feedback

**Status:** QUEUED WITHIN CURRENT CATEGORY

Candidate scope:

- provide misconception-specific feedback for selected wrong answers where pedagogically useful;
- distinguish common SQL failure classes more precisely than one generic semantic-error message;
- use already-established evidence to explain the correction rather than simply report failure.

Canon impact:

- clearer explanatory feedback can be `CONFORMANCE` or `IMPLEMENTATION CHOICE`;
- new branching feedback logic that changes the instructional response to a learner action may require encounter-level `CANON DECISION REQUIRED`;
- SQL diagnosis must not become a brittle syntax parser that rejects semantically correct work merely to produce more detailed messages.

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

Wave 1 is complete across Stage 1, Stage 2, and Stage 3.

For Wave 2:

- merge the accepted Stage 1 calibration in PR #4 into `stage3-inner-join-unmatched-rebuild-2026-09-13`;
- then propagate the accepted continuity pattern to Stage 2 and Stage 3 only where the learner role is equivalent;
- validate the Stage 2 and Stage 3 journeys, run a Stage 1 regression journey, and perform a full-course runtime walkthrough after propagation;
- do not begin Wave 3 until Wave 2 propagation and acceptance are complete.

Do not turn Wave 2 propagation into an encounter redesign or use it to introduce new learner requirements, sequence changes, hints, progress semantics, or adaptive behavior.

## 10. Authority boundary

This initiative may expose a need to change current authority, but it must not make that change inside this management record.

Use the appropriate current source when required, for example:

- `pedagogical-foundations.md` for established course-level pedagogical foundations;
- `course-design/course-visual-language.md` for course-level visual-language authority;
- `course-design/course-controls.md` for course-level control roles / semantics;
- the relevant learner-route / interaction-decision source for encounter-local instructional requirements.

If the appropriate authority source is unclear, classify the matter as `CANON DECISION REQUIRED` and stop before implementation rather than inventing a rule here.
