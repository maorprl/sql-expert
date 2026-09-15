# RouteCraft Work Management

**Status:** WORKING  
**Role:** Project-level planning index

This document defines RouteCraft's current project-management structure.

It does not replace or override pedagogical, visual, Stage, schema, data, process, execution, review, or validation authority. Those remain in their dedicated current-source documents.

## 1. Project planning model

RouteCraft is managed as two Programs:

1. **Program A — Learning Product**  
   Builds and validates the course experienced by the learner.
2. **Program B — Production System**  
   Builds and calibrates the repeatable system used to produce, review, implement, and validate learner encounters.

Authority and quality controls apply across both Programs but are not a third Program.

## 2. Current project state

The current runnable Learning Product contains three implemented encounters (Stage 1–3).

The currently active learner-experience initiative is:

`course-experience-improvement-work-management.md`

Its Teacher voice / Walkthrough category is complete through the Wave 5B decision gate. Wave 5B implementation is not authorized. The next project action is an evidence-based category-selection / mapping decision across the remaining improvement queue, with no runtime change before that mapping is complete.

The old `learner-encounter-production-execution.md` Cycle 1 action sequence is historical / superseded and must not be used as the project-wide current-action source.

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

- `course-design/stage-1/`
- `course-design/stage-2/`
- `course-design/stage-3/`

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

Primary current sources include:

- `course-design/course-visual-language.md`
- `course-design/course-controls.md`
- `src/interaction-lifecycle.js`

Current initiative:

`course-experience-improvement-work-management.md`

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
- artifact/version/authority metadata;
- deterministic source loading;
- future machine-readable state or retrieval support only where evidence justifies it.

Potential RAG, embedding, vector, orchestration, or persistent-memory architecture remains conditional rather than selected.

## 5. Cross-cutting authority and quality controls

Across both Programs, preserve:

- source-of-truth discipline;
- explicit authority/status boundaries;
- independent review where required;
- provenance and durable-handoff requirements;
- conformance/validation controls;
- change-impact and re-review rules.

Planning classification does not determine authority. Each artifact's authority is determined by its role and the governing current sources.

## 6. Repository-organization rule

Do not move or merge files merely to make the tree look symmetrical.

Prefer:

1. one clear current authority surface per concern;
2. historical review/production evidence retained in clearly historical locations;
3. management files that describe only current work state rather than preserving obsolete `Current Position` sections;
4. Git history for superseded management snapshots instead of leaving contradictory snapshots live in current management files.

## 7. Management hierarchy

```text
RouteCraft
│
├── Program A — Learning Product
│   ├── A1 — Course Foundations
│   ├── A2 — Learner Encounter Development
│   ├── A3 — Learning Experience & Runtime
│   │   └── Current initiative: Existing Course Experience Improvement
│   └── A4 — Course-Level Validation & Release Readiness
│
└── Program B — Production System
    ├── B1 — Encounter Production Lifecycle
    ├── B2 — Execution & Orchestration
    └── B3 — Process State, Context & Provenance
```
