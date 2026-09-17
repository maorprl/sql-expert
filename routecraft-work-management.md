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

Lesson 3 is not currently accepted or implemented as part of the learner journey. Preserved Stage 3 material and the rebaseline Lesson 3 dry-run design remain candidate/history only.

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
7. **CURRENT** — Fresh Lesson 3 design through the current rebaselined learner-encounter production process.
8. **NOT STARTED** — Build the production system / “machine”.
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
5. **DONE** — Run a fresh Lesson 3 design dry run through the candidate workflow without implementation. The dry run exposed and corrected the authority-before-Build ambiguity.  
   Evidence: `course-design/production/rebaseline/lesson-3-candidate-workflow-dry-run.md`.
6. **DONE** — Compare the candidate against the legacy process by outcomes and protected failure modes. The comparison retained proportional case comparison and risk-triggered independent challenge as conditional protections without restoring permanent roles/review streams.  
   Evidence: `course-design/production/rebaseline/candidate-vs-legacy-outcome-comparison.md`.
7. **DONE** — Atomic documentation cutover: the rebaselined workflow became current process authority and Source-of-Truth, Production Contract, agent/execution guidance, README, rebaseline status, and management state were aligned in one cutover.

The rebaseline artifacts are evidence/history for why the current process looks the way it does. They are not a second process authority.

### Current action

**CURRENT ACTION:** execute Master Plan Step 7 — design Lesson 3 freshly through `learner-encounter-production-process.md`, beginning from the accepted Lessons 1–2 baseline and current canon.

The production-system dry-run Lesson 3 design is **not** current Lesson 3 authority. It may be considered as candidate evidence only after the fresh process establishes the capability need, learner state, and case.

Do not implement Lesson 3 during Step 7. Implementation remains Master Plan Step 10.

## 4. Work areas

The following labels organize work only. They are not separate trackers and do not create authority.

### Learning Product

Current state:

- Lessons 1–2 are the accepted learner journey;
- Lesson 3 is the current design task but has no current Lesson authority yet;
- current pedagogy, visual, control, schema, data, and accepted Lesson authority remains in the sources identified by `source-of-truth-hierarchy.md`.

### Production System

Current state:

- the rebaselined `learner-encounter-production-process.md` is current;
- worker/tool assignment remains in `agent-assisted-work-protocol.md`;
- Cycle 1 and rebaseline directories remain evidence/provenance, not flat current authority;
- permanent role topology, fixed review counts, and universal handoff artifacts are not current process requirements.

## 5. Reconciled future / conditional work

These items are not current blockers unless present work makes them necessary.

### Learning Product — future / conditional

- broader persistence semantics across reloads or sessions;
- Retry / Redo reset and downstream-invalidation semantics;
- broader hint / adaptive-assistance policy — deferred unless new evidence justifies reopening;
- Lesson structure beyond the accepted Lessons 1–2 journey and current Lesson 3 design work;
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

## 6. Historical management disposition

- `course-work-management.md` is a **HISTORICAL / SUPERSEDED management record**;
- `production-system-work-management.md` is a **HISTORICAL / SUPERSEDED management record**;
- `course-experience-improvement-work-management.md` is a **HISTORICAL / SUPERSEDED initiative record**;
- `learner-encounter-production-execution.md` is a **HISTORICAL / SUPERSEDED Cycle 1 execution snapshot**.

Their prior detailed contents remain available through Git history. They must not be used to infer current next action, active backlog, production topology, or management ownership.

Accepted product or process decisions remain authoritative only through their dedicated current authority sources; superseding a management/execution record does not supersede authority documents it once referenced.

## 7. Tracker discipline

To prevent conversational memory or stale files from becoming project state:

1. read this tracker before starting substantial project work;
2. keep exactly one `CURRENT ACTION` here;
3. when work becomes durably complete, update its status here in the same accepted change that establishes or records the result whenever practical;
4. do not duplicate current work state in another management file;
5. classify newly discovered work as current, future/conditional, historical/superseded, or unresolved before treating it as an active task;
6. if a management statement conflicts with a dedicated authority source, the management statement does not win.
