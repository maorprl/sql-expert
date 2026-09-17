# RouteCraft Work Management

**Status:** WORKING  
**Role:** Single current project work-state tracker

This is the only live management tracker for RouteCraft. It records current project position, the master plan, active subplans, current action, and non-authoritative backlog state.

It is **not** pedagogical, visual, Lesson, schema, data, production-process, execution, review, validation, or implementation authority. Those decisions remain in their dedicated current-source documents.

Authority ownership and precedence are defined in:

`source-of-truth-hierarchy.md`

Cross-project preservation, change-routing, state-vocabulary, and promotion invariants are defined in:

`production-contract-v1.md`

Historical management records must not be used as current work-state sources, but their unresolved work-state content must receive an explicit disposition before it is removed from the current management surface.

## 1. Current project baseline

The accepted runnable Learning Product contains two Lessons:

- **Lesson 1 — Media coverage / first JOIN** using `news_article → news_source`;
- **Lesson 2 — Funding participation / row multiplication** using `funding_round → round_investment`.

The accepted runtime baseline remains:

`9b8f6ffc1f22ce2d2783f49e52a48c480a0945fa`

Lesson 3 is not currently accepted or implemented as part of the learner journey. Preserved Stage 3 material remains candidate/history only.

`learner-encounter-production-process.md` remains the formal production-process authority until an explicit accepted cutover changes that status.

The Production System rebaseline has preserved candidate material, but that material is **not accepted process authority** and must be revalidated from the corrected management baseline before any dry-run result can be used to advance the subplan.

## 2. Master plan

1. **DONE** — Preserve the accepted Lessons 1–2 runtime baseline.
2. **DONE** — Full external UI/UX review of Lessons 1–2.
3. **DONE** — Consolidated Lessons 1–2 cleanup.
4. **DONE** — Full repository documentation / canon reconciliation.
5. **DONE** — Source-of-Truth hierarchy / authority precedence.
6. **DONE** — Production Contract v1.
7. **NOT STARTED — PAUSED BY ACTIVE SUBPLAN** — Lesson 3 design.
8. **NOT STARTED** — Build the production system / “machine”.
9. **NOT STARTED** — CI.
10. **NOT STARTED** — Implement Lesson 3 through the production system.
11. **NOT STARTED** — CD.
12. **NOT STARTED** — Lesson 4 through the production system.
13. **NOT STARTED** — Whole-course planning.
14. **NOT STARTED** — Engineering cleanup.

`DONE` records accepted project state. If later repository evidence materially contradicts a DONE claim, reclassify it explicitly rather than silently reconstructing history.

## 3. Active subplan — Production-system rebaseline

This subplan exists because the current learner-encounter production process contains legacy-derived process architecture that must be revalidated before it is used as the basis for future Lesson production.

1. **DONE** — Inventory the current production process and separate product requirements, legacy architecture choices, and unresolved matters.
2. **PRESERVED DRAFT — REVALIDATION REQUIRED** — Production System Requirements candidate exists at `course-design/production/rebaseline/production-system-requirements-candidate.md`, but its prior progression status was recorded before management preservation reconciliation was complete.
3. **PRESERVED DRAFT — REVALIDATION REQUIRED** — Traceability / necessity audit exists at `course-design/production/rebaseline/production-system-requirements-traceability-audit.md`, but must be checked against the restored management obligations below.
4. **PRESERVED DRAFT — REVALIDATION REQUIRED** — `course-design/production/rebaseline/candidate-workflow-v0.md` exists as **CANDIDATE / NON-AUTHORITATIVE** material. Do not create a second competing workflow. Revalidate and, where necessary, amend this same candidate.
5. **NOT AUTHORIZED YET** — A Lesson 3 dry run may occur only after Substeps 2–4 have been revalidated from the corrected baseline. Any earlier dry-run result in Git history is evidence only and cannot advance the current subplan.
6. **NOT STARTED** — Compare the revalidated candidate against the legacy process by outcomes, calibration criteria, and protected failure modes.
7. **NOT STARTED** — If the candidate survives the dry run and comparison, consider an atomic documentation cutover. No cutover is currently authorized.

Until Substep 7 is explicitly accepted, `learner-encounter-production-process.md` remains the formal current production-process authority.

### Current action

**CURRENT ACTION:** revalidate the existing preserved Production System Requirements, traceability audit, and Candidate Workflow v0 against the corrected management-preservation baseline in Section 4.

Do **not** create a second Candidate Workflow. Do **not** run or accept a Lesson 3 dry run until that revalidation is complete. Do **not** implement Lesson 3.

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

No known `MISSED — MUST RESTORE` item remains from the reviewed management material. This result does not make candidate production artifacts authoritative and does not close the unresolved pedagogy-operationalization workstream.

## 5. Reconciled future / conditional work

### Learning Product — future / conditional

- broader persistence semantics across reloads or sessions;
- Retry / Redo reset and downstream-invalidation semantics;
- broader hint / adaptive-assistance policy unless new evidence justifies reopening;
- Lesson structure beyond the accepted Lessons 1–2 journey;
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
- persistent agent-memory architecture.

These become active only when evidence shows they are necessary.

## 6. Historical management disposition

- `course-work-management.md` is a **HISTORICAL / SUPERSEDED management record**;
- `production-system-work-management.md` is a **HISTORICAL / SUPERSEDED management record**;
- `course-experience-improvement-work-management.md` is a **HISTORICAL / SUPERSEDED initiative record**.

Their prior contents remain available through Git history. They must not be used to infer current next action or management ownership, but unresolved work-state content discovered in them must be reconciled here rather than silently discarded.

Accepted product or process decisions remain authoritative only through their dedicated current authority sources.

## 7. Tracker discipline

1. Read this tracker before starting substantial project work.
2. Keep exactly one `CURRENT ACTION` here.
3. Do not advance a substep merely because its artifact exists; distinguish preserved draft, revalidated candidate, validated result, and accepted authority.
4. When work becomes durably complete, update its status here in the same accepted change whenever practical.
5. Do not duplicate current work state in another management file.
6. Classify newly discovered work as current, future/conditional, historical/superseded, or unresolved before treating it as active.
7. If a management statement conflicts with a dedicated authority source, the management statement does not win.
