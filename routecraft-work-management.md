# RouteCraft Work Management

**Status:** WORKING  
**Role:** Single current project work-state tracker

This is the only live management tracker for RouteCraft. It records current project position, the master plan, active subplans, current action, and non-authoritative backlog state.

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

Lesson 3 is not currently accepted or implemented as part of the learner journey. Preserved Stage 3 material remains candidate/history only.

The current learner-encounter production process remains the formal production-process authority until an explicit cutover changes that status. The active production-system rebaseline below is evaluating a candidate replacement and does not itself authorize Lesson 3 implementation.

## 2. Master plan

This is the established project plan. The active production-system rebaseline in Section 3 is corrective work required before proceeding with Step 7; it does not renumber or replace this plan.

1. **DONE** — Preserve the accepted Lessons 1–2 runtime baseline.  
   Evidence: accepted runtime baseline `9b8f6ffc1f22ce2d2783f49e52a48c480a0945fa`.
2. **DONE** — Full external UI/UX review of Lessons 1–2.
3. **DONE** — Consolidated Lessons 1–2 cleanup.
4. **DONE** — Full repository documentation / canon reconciliation.
5. **DONE** — Source-of-Truth hierarchy / authority precedence.  
   Evidence: `source-of-truth-hierarchy.md`.
6. **DONE** — Production Contract v1.  
   Evidence: `production-contract-v1.md`.
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

This subplan exists because the current learner-encounter production process was found to contain legacy-derived agent/process architecture that must be revalidated before it is used as the basis for future Lesson production.

1. **DONE** — Inventory the current production process and separate product requirements, legacy architecture choices, and unresolved matters.
2. **DONE** — Draft and preserve Production System Requirements without copying the legacy agent topology.  
   Evidence: `course-design/production/rebaseline/production-system-requirements-candidate.md`.
3. **DONE** — Perform and preserve the traceability / necessity audit of the proposed requirements and derive the cleaned requirement set.  
   Evidence: `course-design/production/rebaseline/production-system-requirements-traceability-audit.md`.
4. **DONE** — Design and preserve Candidate Workflow v0 from the audited requirements as **CANDIDATE / NON-AUTHORITATIVE** material.  
   Evidence: `course-design/production/rebaseline/candidate-workflow-v0.md`.
5. **DONE** — Run a fresh Lesson 3 design dry run through the candidate workflow, without implementation, against current canon and the accepted Lessons 1–2 baseline. The dry run identified and corrected one candidate ambiguity: accepted encounter decisions must become current authority before Build.  
   Evidence: `course-design/production/rebaseline/lesson-3-candidate-workflow-dry-run.md` and the clarified `candidate-workflow-v0.md`.
6. **CURRENT** — Compare the candidate against the legacy process by outcomes and failure protection: what was lost, what was simplified, and what legacy mechanism—if any—was actually necessary.
7. **NOT STARTED** — If the candidate survives the dry run and comparison, perform an atomic documentation cutover so that the production process, Source-of-Truth mapping, Production Contract references, and management state agree on one current process.

Until Substep 7 completes, `learner-encounter-production-process.md` remains the formal current production-process authority. Candidate work is evaluative and non-authoritative.

### Current action

**CURRENT ACTION:** execute Substep 6 — compare Candidate Workflow v0 against the legacy learner-encounter production process by **outcomes and protected failure modes**, not by role/phase similarity.

The comparison must identify which legacy mechanisms protected a requirement that the candidate does not protect, which mechanisms are redundant choreography, and whether any remaining candidate gap must be corrected before an atomic cutover can be considered.

## 4. Work areas

The following labels organize work only. They are not separate trackers and do not create authority.

### Learning Product

Current state:

- Lessons 1–2 are the accepted learner journey;
- Lesson 3 remains unaccepted and paused by the active production-system rebaseline;
- current Lesson, pedagogy, visual, control, schema, and data authority remains in the sources identified by `source-of-truth-hierarchy.md`.

### Production System

Current state:

- the legacy-derived production process remains formally current until explicit cutover;
- the rebaseline subplan is active;
- historical Cycle 1 production artifacts remain evidence/provenance rather than a flat set of current authority;
- the Candidate Workflow cannot authorize implementation while it remains candidate/non-authoritative.

## 5. Reconciled future / conditional work

These items are not current blockers unless present work makes them necessary.

### Learning Product — future / conditional

- broader persistence semantics across reloads or sessions;
- Retry / Redo reset and downstream-invalidation semantics;
- broader hint / adaptive-assistance policy — deferred unless new evidence justifies reopening;
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
- persistent agent-memory architecture;
- broader machine-readable process state beyond demonstrated need.

These become active only when evidence from the rebaseline, dry run, implementation, validation, or later scale shows they are necessary.

## 6. Historical management disposition

As of the single-tracker reconciliation:

- `course-work-management.md` is a **HISTORICAL / SUPERSEDED management record**;
- `production-system-work-management.md` is a **HISTORICAL / SUPERSEDED management record**;
- `course-experience-improvement-work-management.md` remains a **HISTORICAL / SUPERSEDED initiative record**.

Their prior detailed contents remain available through Git history. They must not be used to infer current next action, active backlog, or management ownership.

Accepted product or process decisions remain authoritative only through their dedicated current authority sources; superseding a management record does not supersede authority documents it once referenced.

## 7. Tracker discipline

To prevent conversational memory or stale files from becoming project state:

1. read this tracker before starting substantial project work;
2. keep exactly one `CURRENT ACTION` here;
3. when work becomes durably complete, update its status here in the same accepted change that establishes or records the result whenever practical;
4. do not duplicate current work state in another management file;
5. classify newly discovered work as current, future/conditional, historical/superseded, or unresolved before treating it as an active task;
6. if a management statement conflicts with a dedicated authority source, the management statement does not win.
