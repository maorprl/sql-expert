# RouteCraft Work Management

**Status:** WORKING  
**Role:** Project-level planning index

This document defines RouteCraft's current project-management structure.

It does not replace or override pedagogical, visual, Lesson, schema, data, process, execution, review, or validation authority. Those remain in their dedicated current-source documents.

## 1. Project planning model

RouteCraft is managed as two Programs:

1. **Program A — Learning Product**  
   Builds and validates the course experienced by the learner.
2. **Program B — Production System**  
   Builds and calibrates the repeatable system used to produce, review, implement, and validate learner encounters.

Authority and quality controls apply across both Programs but are not a third Program.

## 2. Current project state

The current accepted runnable Learning Product contains two encounters: Lesson 1 and Lesson 2. The accepted **runtime baseline** is `9b8f6ffc1f22ce2d2783f49e52a48c480a0945fa`; the canonical repository state is the current accepted `main` HEAD and may advance without changing runtime behavior.

Lesson 3 is not currently accepted or implemented as part of the learner journey. Preserved Stage 3 files are candidate/history only.

The Lessons 1–2 canon reconciliation is complete. Cross-project authority ownership and precedence are defined in:

`source-of-truth-hierarchy.md`

Cross-project product/repository production invariants are defined in:

`production-contract-v1.md`

The next planned Learning Product step is **Lesson 3 design through the current learner-encounter production process**. This management record does not define Lesson 3 content, case, sequence, or implementation.

The old `learner-encounter-production-execution.md` Cycle 1 action sequence remains historical / superseded and must not be used as the project-wide current-action source.

## 3. Program A — Learning Product

Primary management record:

`course-work-management.md`

### A1 — Course Foundations

Includes:

- exit criteria;
- knowledge and dependency mapping;
- pedagogical foundations;
- capability coverage and remaining-gap reasoning;
- data/schema foundation used by learner encounters and SQL runtime.

Primary current sources include:

- `course-exit-criteria.md`
- `course-knowledge-map.md`
- `pedagogical-foundations.md`
- `startup-ecosystem/startup-ecosystem-schema.md`
- `startup-ecosystem/startup-ecosystem-schema.sql`
- `startup-ecosystem/startup-ecosystem-seed.sql`

### A2 — Learner Encounter Development

Includes:

- encounter-local design authority;
- learner-route / interaction authority;
- encounter implementation;
- encounter-local validation;
- contribution to capability coverage.

Current encounter authority is located under:

- `course-design/stage-1/` — Lesson 1 authority;
- `course-design/stage-2/` — Lesson 2 authority.

`course-design/stage-3/` is preserved candidate/history and is not current authority.

Historical Cycle 1 production artifacts remain under `course-design/production/cycle-1/` as provenance/history and should not be used as a flat current-authority set.

### A3 — Learning Experience & Runtime

Includes course-wide learner-experience and shared runtime concerns such as:

- visual language;
- course controls;
- shared interaction behavior;
- course shell;
- SQL workspace behavior shared across encounters;
- shared UI/runtime infrastructure;
- accessibility, responsive, browser, persistence, and release-runtime concerns when they become current work.

Primary current authority sources include:

- `course-design/course-visual-language.md`
- `course-design/course-controls.md`

There is currently no separate Lessons 1–2 topology authority. Spatial conformance is derived from these course-level sources together with encounter-local authority.

The accepted Lessons 1–2 runtime is the current product baseline for observable implementation behavior. Runtime does not become normative course authority by implementation presence alone; the cross-project rule is defined in `source-of-truth-hierarchy.md` and the preservation/promotion contract is defined in `production-contract-v1.md`.

`course-experience-improvement-work-management.md` is a historical/superseded initiative record, not the current project-state pointer.

### A4 — Course-Level Validation & Release Readiness

Includes validation that cannot be established from one encounter alone:

- cumulative progression validation;
- prerequisite validation across encounters;
- transfer and independent performance;
- cross-encounter regression;
- exit-criteria coverage review;
- release-level completion evidence.

This remains a distinct future/current-as-needed workstream; encounter-level PASS results do not by themselves complete it.

## 4. Program B — Production System

Primary management record:

`production-system-work-management.md`

### B1 — Encounter Production Lifecycle

Primary authority:

`learner-encounter-production-process.md`

Includes process roles, gates, handoffs, review, implementation-control, validation, acceptance, and change-impact rules.

### B2 — Execution & orchestration

Primary guidance:

`agent-assisted-work-protocol.md`

`learner-encounter-production-execution.md` is currently historical / superseded. If a future production cycle begins, an explicit current execution mapping must be established against its actual baseline.

### B3 — Process state, context & provenance

Includes:

- durable production records;
- provenance;
- artifact identity/version/authority metadata;
- deterministic source loading;
- future machine-readable state or retrieval support only where evidence justifies it.

Potential RAG, embedding, vector, orchestration, or persistent-memory architecture remains conditional rather than selected.

## 5. Cross-cutting authority and quality controls

Cross-project authority ownership and precedence are defined in:

`source-of-truth-hierarchy.md`

Cross-project production/promotion invariants are defined in:

`production-contract-v1.md`

Across both Programs, preserve:

- source-of-truth discipline;
- explicit authority/status boundaries;
- independent review where required;
- provenance and durable-handoff requirements;
- conformance/validation controls;
- change-impact and re-review rules.

Planning classification does not determine authority. Each artifact's authority is determined by its role and the governing current sources.

A derived audit, target-design document, implementation record, or test must not promote itself above the authority it is supposed to check.

When a derived decision chain is invalidated, its downstream implementation and tests must be reclassified against the higher-order authority rather than silently preserved as truth.

## 6. Repository-organization rule

Do not move or merge files merely to make the tree look symmetrical.

Prefer:

1. one clear current authority surface per concern;
2. historical review/production evidence retained in clearly historical locations or Git history;
3. management files that describe only current work state rather than preserving obsolete `Current Position` sections;
4. Git history for superseded management snapshots instead of leaving contradictory snapshots live in current management files;
5. when an authority chain is invalidated, update the existing current authority/management surfaces directly and rely on Git history for the superseded chain rather than creating a permanent extra repair-document layer unless one is strictly necessary.

## 7. Management hierarchy

```text
RouteCraft
│
├── Program A — Learning Product
│   ├── A1 — Course Foundations
│   ├── A2 — Learner Encounter Development
│   ├── A3 — Learning Experience & Runtime
│   │   └── Accepted current runtime: Lessons 1–2
│   └── A4 — Course-Level Validation & Release Readiness
│
└── Program B — Production System
    ├── B1 — Encounter Production Lifecycle
    ├── B2 — Execution & Orchestration
    └── B3 — Process State, Context & Provenance
```
