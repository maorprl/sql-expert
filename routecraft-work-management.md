# RouteCraft Work Management

**Status:** WORKING  
**Role:** Single current project work-state tracker

This is the only live management tracker for RouteCraft. It records current project position, the master plan, active/closed subplans, current action, and non-authoritative backlog state.

It is **not** pedagogical, visual, Lesson, schema, data, production-process, execution, review, validation, or implementation authority. Those decisions remain in their dedicated current-source documents.

Authority ownership and precedence are defined in:

`source-of-truth-hierarchy.md`

Cross-project preservation, change-routing, state-vocabulary, and promotion invariants are defined in:

`production-contract-v1.md`

Historical management records must not be used as current work-state sources.

## 1. Current project baseline

The accepted runnable Learning Product contains two Lessons:

- **Lesson 1 — Media coverage / first JOIN** using `news_article → news_source`;
- **Lesson 2 — Funding participation / row multiplication** using `funding_round → round_investment`.

The accepted runtime baseline remains:

`9b8f6ffc1f22ce2d2783f49e52a48c480a0945fa`

The canonical repository state is the current accepted `main` HEAD and may advance without changing the accepted runtime baseline.

Lesson 3 now has current design authority in `course-design/stage-3/stage-3-authority.md`, but it is not yet implemented or accepted as part of the runnable learner journey. The older Stage 3 route/interaction files and the rebaseline Lesson 3 dry-run design remain candidate/history only.

`learner-encounter-production-process.md` is the current rebaselined production-process authority. It no longer requires the legacy permanent-role / fixed-review / verbatim-handoff choreography.

## 2. Master plan

This is the established project plan. The production-system rebaseline in Section 3 is complete; it did not renumber or replace this plan.

1. **DONE** — Preserve the accepted Lessons 1–2 runtime baseline.  
   Evidence: accepted runtime baseline `9b8f6ffc1f22ce2d2783f49e52a48c480a0945fa`.
2. **DONE** — Full external UI/UX review of Lessons 1–2.
3. **DONE** — Consolidated Lessons 1–2 cleanup.
4. **DONE** — Full repository documentation / canon reconciliation.
5. **DONE** — Source-of-Truth hierarchy / authority precedence.  
   Evidence: `source-of-truth-hierarchy.md`.
6. **DONE** — Production Contract v1.  
   Evidence: `production-contract-v1.md`.
7. **DONE** — Fresh Lesson 3 design through the current rebaselined learner-encounter production process.  
   Evidence: `course-design/stage-3/stage-3-authority.md`.
8. **CURRENT** — Build the production system / “machine”.
9. **NOT STARTED** — CI.
10. **NOT STARTED** — Implement Lesson 3 through the production system.
11. **NOT STARTED** — CD.
12. **NOT STARTED** — Lesson 4 through the production system.
13. **NOT STARTED** — Whole-course planning.
14. **NOT STARTED** — Engineering cleanup.

`DONE` records accepted project state. If later repository evidence materially contradicts a DONE claim, reclassify it explicitly rather than silently reconstructing history.

## 3. Closed subplan — Production-system rebaseline

**Status:** DONE

1. **DONE** — Inventory the prior production process and separate product requirements, legacy architecture choices, and unresolved matters.
2. **DONE** — Draft and preserve Production System Requirements without copying the legacy agent topology.  
   Evidence: `course-design/production/rebaseline/production-system-requirements-candidate.md`.
3. **DONE** — Perform and preserve the traceability / necessity audit and derive the cleaned requirement set.  
   Evidence: `course-design/production/rebaseline/production-system-requirements-traceability-audit.md`.
4. **DONE** — Design and preserve Candidate Workflow v0 from the audited requirements.  
   Evidence: `course-design/production/rebaseline/candidate-workflow-v0.md`.
5. **DONE** — Run Lesson 3 design dry-run evaluation without implementation. The preserved dry-run evidence exposed the authority-before-Build ambiguity; the recovery dry run additionally exposed capability-selection drift toward a larger LEFT JOIN / NULL jump. The current process now preserves risk-triggered pre-build challenge and comparison of materially plausible next capability gaps against the current learner state.  
   Evidence: `course-design/production/rebaseline/lesson-3-candidate-workflow-dry-run.md`.
6. **DONE** — Compare the candidate against the legacy process by outcomes and protected failure modes. The comparison retained proportional case comparison and risk-triggered independent challenge as conditional protections without restoring permanent roles/review streams.  
   Evidence: `course-design/production/rebaseline/candidate-vs-legacy-outcome-comparison.md`.
7. **DONE** — Atomic documentation cutover: the rebaselined workflow became current process authority and Source-of-Truth, Production Contract, agent/execution guidance, README, rebaseline status, and management state were aligned in one cutover.

The rebaseline artifacts are evidence/history for why the current process looks the way it does. They are not a second process authority.

### Current action

**CURRENT ACTION:** execute Master Plan Step 8 — design and build the production system / “machine” from the current rebaselined process and current authority, before Lesson 3 implementation.

Lesson 3 design authority is now `course-design/stage-3/stage-3-authority.md`. The older Stage 3 candidate files and the rebaseline Lesson 3 dry-run remain evidence/history only.

Step 8 must operationalize the current process without restoring legacy permanent roles or fixed review choreography. It must also resolve how the machine turns current Lesson authority into a buildable implementation specification and whether/how a visual mockup / visual implementation reference is required before Build. Lesson 3 implementation remains Master Plan Step 10.

## 4. Management-preservation reconciliation

This section restores work-state obligations that were present in historical management and did not receive a sufficient disposition during the single-tracker consolidation.

### 4.1 Course Definition of Done — RESTORED / PRESERVED

The Learning Product is complete only when:

- every required exit capability is mapped to one or more implemented learner encounters;
- prerequisite / dependency relationships are respected;
- every required learner encounter has a clear current design / authority basis;
- every required learner encounter is implemented;
- every required exit capability has identified validation evidence showing that the intended reasoning and SQL capability can be exercised;
- validation exists both at encounter level and as a cumulative progression;
- applicable pedagogical, visual, control, schema, and data authority is reflected in observable behavior where required;
- no unresolved blocking implementation or validation issue prevents a required capability from being demonstrated;
- no unresolved course-level decision prevents the exit criteria from being satisfied;
- capability coverage contains no unexplained required-capability gap.

Completion is not defined by reaching a fixed Lesson / Stage number. Implementation presence alone is not evidence of learner capability or normative authority.

### 4.2 Capability Coverage discipline — RESTORED / PRESERVED

Maintain a lightweight management trace connecting:

`exit criterion → required capability → prerequisites → learner encounter(s) → implementation → validation evidence → remaining gap`

This trace exists to show whether the course is actually progressing toward its exit criteria.

It must not:

- redefine the exit criteria;
- invent pedagogical requirements;
- override the knowledge map;
- treat implementation presence as evidence of learner capability;
- mark a required capability complete without identified validation evidence.

Coverage should be reassessed after validated learner encounters and before the course is declared complete. This is a course-management discipline; it does **not** by itself establish a universal production-process requirement for a separate residual-gap artifact after every encounter.

### 4.3 Pedagogy operationalization backlog — UNRESOLVED DISPOSITION

Historical management required a course-wide review of established pedagogical decisions to identify which still lack sufficient:

- operational meaning;
- observable criteria;
- implementation-checkable expectations.

The intended bridge remains:

`pedagogical decision → operational meaning → observable evidence → implementation`

Later work operationalized some pedagogical areas, but current evidence does not justify declaring the entire workstream complete. Keep this as **UNRESOLVED DISPOSITION** until a bounded review establishes what remains.

This work must not invent new pedagogical principles, silently resolve OPEN questions, convert interpretation into requirement, or establish universal interaction patterns without evidence.

### 4.4 Production-system calibration criteria — PRESERVED FOR REBASELINE EVALUATION

The rebaseline must still account for the historical calibration questions, including:

- whether any process phases or handoffs were unnecessary or missing;
- where independent review materially changed outcomes;
- where context was duplicated, polluted, or difficult to resolve;
- where process state became ambiguous or stale;
- where durable artifacts prevented or exposed drift;
- coordination cost and failure modes;
- whether a lighter machine-readable execution-state format would prevent stale `CURRENT` claims.

These are evaluation criteria for the rebaseline. They are not automatically requirements for the final production architecture.

### 4.5 B3 process-state / context / provenance topics — FUTURE / CONDITIONAL — NEEDS EVIDENCE

Preserve, without promoting to current requirements:

- artifact identity / version / authority metadata;
- deterministic role-specific source loading;
- explicit missing-source / exclusion handling;
- retrieval provenance and authority-aware filtering if automated retrieval is introduced;
- broader machine-readable process / gate state where justified.

Activate any of these only when evidence from implementation, validation, retrieval, or scale demonstrates a concrete need.

### 4.6 Items already safely accounted for

The following historical work does not need to be revived as active management merely because older records mention it:

- course-shell controls such as Show Solution, navigation, Retry / Redo, persistence, and related OPEN semantics remain governed by `course-design/course-controls.md` and current authority/status;
- completed Stage 1 stabilization remains historical completed work with repository evidence; it is not an active workstream;
- the prior Learning Experience / Wave initiative is historical/superseded management evidence and does not override the accepted Lessons 1–2 baseline or current authority.

### 4.7 Reconciliation result

Against the historical management sources reviewed for this consolidation, the known preservation gaps are now explicitly accounted for as:

- `RESTORED / PRESERVED`;
- `UNRESOLVED DISPOSITION`;
- `PRESERVED FOR REBASELINE EVALUATION`; or
- `FUTURE / CONDITIONAL — NEEDS EVIDENCE`.

No known `MISSED — MUST RESTORE` item remains from the reviewed management material. This result does not close the unresolved pedagogy-operationalization workstream. Rebaseline candidate artifacts remain historical/evaluation evidence; current production-process authority is `learner-encounter-production-process.md`.

## 5. Work areas

The following labels organize work only. They are not separate trackers and do not create authority.

### Learning Product

Current state:

- Lessons 1–2 are the accepted learner journey;
- Lesson 3 has current design authority in `course-design/stage-3/stage-3-authority.md` but is not yet implemented or accepted into the runnable learner journey;
- current pedagogy, visual, control, schema, data, and accepted Lesson authority remains in the sources identified by `source-of-truth-hierarchy.md`.

### Production System

Current state:

- the rebaselined `learner-encounter-production-process.md` is current;
- worker/tool assignment remains in `agent-assisted-work-protocol.md`;
- Cycle 1 and rebaseline directories remain evidence/provenance, not flat current authority;
- permanent role topology, fixed review counts, and universal handoff artifacts are not current process requirements.

## 6. Reconciled future / conditional work

These items are not current blockers unless present work makes them necessary.

### Learning Product — future / conditional

- broader persistence semantics across reloads or sessions;
- Retry / Redo reset and downstream-invalidation semantics;
- broader hint / adaptive-assistance policy — deferred unless new evidence justifies reopening;
- Lesson structure beyond the current Lesson 3 design authority;
- broader initial schema exposure where future Lesson work actually requires a decision;
- release-level accessibility, responsive, cross-browser, and cumulative-regression validation.

Before any course-level or release-readiness claim, validation still needs, where relevant:

- cumulative progression validation;
- prerequisite validation across encounters;
- cross-encounter regression;
- exit-criteria coverage review;
- checks for dependence on knowledge not appropriately introduced or developed;
- transfer / independent-performance evidence appropriate to the exit criteria.

### Production System — deferred architecture choices

Do not select merely because the repository contains many documents or previous multi-agent work:

- permanent one-role-per-agent topology;
- fixed permanent agent count;
- orchestration platform;
- automated gate engine;
- universal artifact schema;
- vector database / embeddings / RAG;
- persistent agent-memory architecture;
- broader machine-readable process state beyond demonstrated need.

These become active only when evidence from implementation, validation, or later scale shows they are necessary.

## 7. Historical management disposition

- `course-work-management.md` is a **HISTORICAL / SUPERSEDED management record**;
- `production-system-work-management.md` is a **HISTORICAL / SUPERSEDED management record**;
- `course-experience-improvement-work-management.md` is a **HISTORICAL / SUPERSEDED initiative record**;
- `learner-encounter-production-execution.md` is a **HISTORICAL / SUPERSEDED Cycle 1 execution snapshot**.

Their prior detailed contents remain available through Git history. They must not be used to infer current next action, active backlog, production topology, or management ownership.

Accepted product or process decisions remain authoritative only through their dedicated current authority sources; superseding a management/execution record does not supersede authority documents it once referenced.

## 8. Tracker discipline

To prevent conversational memory or stale files from becoming project state:

1. read this tracker before starting substantial project work;
2. keep exactly one `CURRENT ACTION` here;
3. when work becomes durably complete, update its status here in the same accepted change that establishes or records the result whenever practical;
4. do not duplicate current work state in another management file;
5. classify newly discovered work as current, future/conditional, historical/superseded, or unresolved before treating it as an active task;
6. if a management statement conflicts with a dedicated authority source, the management statement does not win.
