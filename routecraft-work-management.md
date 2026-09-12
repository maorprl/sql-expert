# RouteCraft Work Management

**Status:** WORKING  
**Role:** Project-level planning index

This document defines the current planning structure for RouteCraft at the project-management level.

It does not replace or override pedagogical, visual, Stage, schema, data, process, execution, review, or validation authority. Those remain in their dedicated current-source documents.

The planning structure below is a management classification of existing and future work. It does not retroactively change the authority, status, provenance, or historical role of existing artifacts.

## 1. Project planning model

RouteCraft is managed as two Programs:

1. **Program A — Learning Product**  
   Builds and validates the course experienced by the learner.
2. **Program B — Production System**  
   Builds and calibrates the repeatable system used to produce, review, implement, and validate learner encounters.

Authority and quality controls apply across both Programs but are not a third Program.

## 2. Program A — Learning Product

Primary management record:

`course-work-management.md`

`course-work-management.md` predates this Program structure and retains its historical `Epic: Course Build` / central-management wording during the current Cycle 1. Under the project-level structure defined here, treat that existing record as the management record for Program A rather than as the management container for Program B.

Do not rewrite or reorganize that large historical management record merely to make its labels match this taxonomy during Cycle 1. Its planning labels can be reconciled after the cycle without changing its historical milestones or course authority.

Where its legacy `Next Planning Gate` / `Immediate Next Action` text describes the pre-Cycle-1 capability-planning state, the current Cycle 1 execution state is determined by `learner-encounter-production-execution.md` and the durable Cycle 1 production records. This is a management-state reconciliation only; it does not alter course authority.

### A1 — Course Foundations

#### Capability & Pedagogy Architecture

Includes:

- exit criteria;
- knowledge and dependency mapping;
- pedagogical foundations;
- capability coverage and remaining-gap reasoning;
- course-level progression logic where established.

Primary current sources include:

- `course-exit-criteria.md`
- `course-knowledge-map.md`
- `pedagogical-foundations.md`

#### Data & SQL Environment

Includes the relational data foundation used by both encounter design and course runtime:

- normalized schema and documented relation Grain;
- executable schema and seed data;
- schema readiness / integrity evidence;
- SQL runtime data source used by the browser application.

Primary current sources include:

- `startup-ecosystem/startup-ecosystem-schema.md`
- `startup-ecosystem/startup-ecosystem-schema.sql`
- `startup-ecosystem/startup-ecosystem-seed.sql`
- `startup-ecosystem/startup-ecosystem-schema-audit.md`

This is a shared product foundation. It is not classified only as UI/runtime infrastructure because the same data model is used for relational reasoning, Case Validation, and learner-encounter design.

### A2 — Learner Encounter Development

Includes:

- learner-encounter design;
- encounter-local interaction authority;
- encounter implementation;
- encounter-local validation and test-drive evidence;
- contribution of validated encounters to capability coverage.

Existing Stage 1 work is mapped here retrospectively. That classification does not imply that Stage 1 was produced through the current learner-encounter production process.

Future encounters are initiatives / cycles within this Epic rather than automatically becoming separate Epics.

### A3 — Learning Experience & Runtime

Includes course-wide learner-experience and shared runtime concerns such as:

- visual language;
- global course controls;
- shared interaction behavior;
- course shell;
- SQL workspace behavior shared across encounters;
- shared UI/runtime infrastructure;
- future accessibility, responsive, browser, persistence, and release-runtime concerns when they become current work.

Primary current sources include:

- `course-design/course-visual-language.md`
- `course-design/course-controls.md`
- `src/interaction-lifecycle.js`

Encounter-specific implementation remains under A2 even when it uses shared A3 infrastructure.

### A4 — Course-Level Validation & Release Readiness

Includes validation that cannot be established from one encounter alone:

- cumulative progression validation;
- prerequisite validation across encounters;
- transfer and independent performance;
- cross-encounter regression;
- exit-criteria coverage review;
- future release-level completion evidence.

**Current state:** PLANNED / DORMANT.

This Epic becomes active when a meaningful multi-encounter progression exists or release-level validation is otherwise justified.

## 3. Program B — Production System

Primary management record:

`production-system-work-management.md`

### B1 — Encounter Production Lifecycle

Includes:

- the canonical learner-encounter production process;
- functional roles and required independence;
- production phases and gates;
- durable role-to-role handoffs;
- reconciliation;
- frozen implementation authority;
- acceptance and cycle closure;
- process calibration from actual production cycles.

Primary current source:

`learner-encounter-production-process.md`

### B2 — Agent Execution & Orchestration

Includes:

- mapping functional roles to concrete agents / isolated runs;
- worker and tool allocation;
- branch and write coordination;
- synchronization and handoff mechanics;
- future orchestration and mechanical gate enforcement;
- run boundaries, retries, checkpoints, and failure recovery where later justified.

Primary current sources:

- `learner-encounter-production-execution.md`
- `agent-assisted-work-protocol.md`

Permanent agent topology remains intentionally deferred until after Cycle 1.

### B3 — Process State, Context & Provenance

Includes current and future production-system work around:

- durable production records;
- provenance;
- machine-readable cycle / gate state;
- artifact manifests or registries;
- deterministic role-specific source loading;
- source / version / authority metadata;
- retrieval provenance;
- authority-aware retrieval.

Potential later retrieval mechanisms such as lexical search, embeddings, vector retrieval, RAG, or persistent / episodic agent memory are **conditional work**, not selected architecture.

Repository state and approved durable artifacts remain the source of truth. Conversational or agent memory must not become process authority.

## 4. Cross-cutting authority and quality controls

The following operate across Programs rather than forming a third Program:

- source-of-truth discipline;
- LOCKED / WORKING / OPEN status where defined by source documents;
- Course Authority Owner decisions;
- independent review requirements;
- provenance and durable-handoff requirements;
- conformance and validation controls;
- change-impact and re-review requirements.

Planning classification does not determine authority. An artifact's authority continues to be defined by its own role and the current governing source documents.

## 5. Cycle 1 placement

Current learner-encounter production Cycle 1 has one primary management home:

`Program B → B1 — Encounter Production Lifecycle`

It also produces a learner-product deliverable for:

`Program A → A2 — Learner Encounter Development`

Do not duplicate cycle status or evidence in two independent management records. Program A should link to the learner-product result; Program B owns the production-cycle state.

Cycle 1 is also being used to gather evidence before deciding the permanent agent / run topology. That calibration purpose is specific to the current production-system maturation and must not be assumed to define the management home of every future encounter cycle.

## 6. Migration rule

This planning model is adopted as a management layer without reorganizing the repository mid-cycle.

For the current Cycle 1:

- do not move existing files merely to fit this hierarchy;
- do not rewrite authority documents to match management labels;
- do not rewrite large historical management records solely for taxonomy consistency;
- do not change active role contracts, gates, or handoffs;
- do not finalize permanent agent topology;
- do not select RAG, embeddings, vector storage, or persistent memory as implementation decisions.

After Cycle 1, use the completed cycle as evidence for the next production-system architecture decisions and reconcile legacy management labels where useful.

## 7. Management hierarchy

```text
RouteCraft
│
├── Program A — Learning Product
│   ├── A1 — Course Foundations
│   │   ├── Capability & Pedagogy Architecture
│   │   └── Data & SQL Environment
│   ├── A2 — Learner Encounter Development
│   ├── A3 — Learning Experience & Runtime
│   └── A4 — Course-Level Validation & Release Readiness
│       └── PLANNED / DORMANT for now
│
└── Program B — Production System
    ├── B1 — Encounter Production Lifecycle
    ├── B2 — Agent Execution & Orchestration
    └── B3 — Process State, Context & Provenance
        └── conditional later retrieval / memory research
```
