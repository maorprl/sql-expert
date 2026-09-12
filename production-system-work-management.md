# Production System Work Management

**Program:** RouteCraft Production System  
**Status:** WORKING  
**Role:** Program B work-management record

This document manages work on the system used to produce, review, implement, validate, and coordinate learner encounters.

It is not pedagogical, visual, Stage, schema, data, process, or execution authority. Those decisions remain in their dedicated current-source documents.

Project-level planning structure is defined in:

`routecraft-work-management.md`

The Learning Product is managed separately in:

`course-work-management.md`

## 1. Program Goal

Develop a repeatable, traceable production system that can move from the current trusted course state to justified learner encounters, implementation, validation, and coverage evidence while preserving authority boundaries and required independent review.

The Production System supports the Learning Product. Infrastructure is justified by production reliability, traceability, coordination, and quality needs rather than by infrastructure volume itself.

## 2. Program Structure

### B1 — Encounter Production Lifecycle

Primary source:

`learner-encounter-production-process.md`

Scope includes:

- functional roles;
- capability / case entry gate;
- Course-Assumed Learner State within a production cycle;
- encounter design;
- independent pedagogy and UX review;
- reconciliation;
- pre-build control;
- frozen implementation authority;
- implementation;
- runtime / conformance validation;
- post-build review;
- acceptance;
- change impact and cycle closure;
- durable inter-phase records required by the process.

The process document remains the authority for these requirements. This management record must not restate them in a way that creates a competing specification.

### B2 — Agent Execution & Orchestration

Primary sources:

- `learner-encounter-production-execution.md`
- `agent-assisted-work-protocol.md`

Scope includes:

- temporary and permanent agent / run mapping;
- worker / tool selection;
- isolation needed for independent review;
- implementation-agent usage;
- branch ownership and write coordination;
- remote / local synchronization;
- handoff mechanics;
- future orchestration, checkpoints, retries, resumability, and mechanical gate enforcement where justified.

Functional role, permanent agent, and individual run are distinct concepts.

Permanent agent topology remains OPEN until the required post-Cycle-1 review is completed.

### B3 — Process State, Context & Provenance

Scope includes:

- durable production artifacts and provenance;
- artifact locations, versions, and authority metadata;
- future machine-readable process / gate state;
- future artifact manifest or registry if needed;
- deterministic role-specific source loading;
- explicit missing-source and exclusion handling;
- retrieval provenance and authority-aware retrieval if automated retrieval is introduced.

Potential later mechanisms such as embeddings, vector retrieval, RAG, or persistent / episodic agent memory remain conditional research items. They are not current requirements and must not become an alternate source of process state or authority.

## 3. Current Position — Cycle 1

Cycle 1 is the first full execution of the current learner-encounter production process and is also evidence for later production-system architecture decisions.

Current authoritative execution status is maintained in:

`learner-encounter-production-execution.md`

At the current recorded state:

1. Capability & Case Brief — completed; verbatim durable handoff verified.
2. Lightweight Independent Pedagogy Gate — completed with `PROCEED`; verbatim durable handoff verified.
3. Encounter Design — unblocked / current next production phase.

Durable Cycle 1 records are stored under:

`course-design/production/cycle-1/`

This management document does not replace their provenance or phase-specific content.

## 4. Active Work

### 4.1 Complete Cycle 1 through the canonical process

**Epic:** B1 — Encounter Production Lifecycle  
**Status:** ACTIVE

Continue the current cycle through the remaining canonical phases without changing the functional-role architecture or required independence boundaries mid-cycle.

Do not introduce a new orchestration platform, permanent agent topology, retrieval architecture, or generalized state model merely to complete Cycle 1.

### 4.2 Preserve durable handoffs

**Epic:** B1 / B3  
**Status:** ACTIVE CONTROL

Where a completed production-phase output becomes an input to a later phase, preserve the actual completed output in the repository according to the current verbatim durable-handoff rule before dependent work proceeds.

The governing rule remains in the current execution and work-protocol sources; this item only tracks its operational importance during Cycle 1.

## 5. Post-Cycle-1 Architecture Gate

After Cycle 1 completes, perform a production-system retrospective before selecting the long-term architecture.

### 5.1 B1 — Process calibration

Review:

- unnecessary or missing phases / handoffs;
- where review independence materially mattered;
- where context was missing, duplicated, or polluted;
- where process state was difficult to determine;
- where durable-artifact requirements prevented or exposed drift;
- coordination cost and observed failure modes.

Any change to the canonical production process must be made through its authority path rather than silently through this management record.

### 5.2 B2 — Agent / run topology decision

Using Cycle 1 evidence, decide whether the functional roles should map operationally to:

- separate agents;
- a smaller number of agents with isolated role executions;
- another topology that preserves the mandatory independence boundaries.

Also determine which execution steps are suitable for orchestration or mechanical enforcement and which still require professional judgment.

### 5.3 B3 — Minimal process-state and context model

Define only the machine-readable state actually justified by observed Cycle 1 needs.

Candidate information to evaluate includes:

- cycle identifier;
- current phase;
- gate status / decision;
- durable artifact path and version;
- authority / provenance metadata;
- unresolved owner decisions;
- acceptance / closure state.

Do not assume that all candidate fields require a universal schema.

### 5.4 B3 — Artifact manifest / registry decision

Determine whether the repository tree plus lightweight manifests are sufficient or whether a more formal artifact registry is justified.

A registry should exist only if it reduces real ambiguity around current artifacts, versions, authority status, supersession, cycle association, or source loading.

### 5.5 B3 — Deterministic context loading

Evaluate whether role-specific deterministic source manifests / loaders are needed based on observed omissions, inconsistent loading, context pollution, repeatability, or auditability problems.

Mandatory authority inputs should remain explicitly loadable by identity rather than being discovered only through semantic similarity.

## 6. Conditional Later Research — Retrieval and Memory

This section is deliberately conditional.

Do not implement RAG, embeddings, vector storage, or persistent agent memory merely because the project uses multiple agents or contains many documents.

First establish a baseline based on:

repository source of truth → structured metadata where justified → role-specific deterministic source selection → explicit provenance

Only evaluate additional retrieval mechanisms if evidence shows that this baseline is insufficient.

Potential later research may include:

- lexical retrieval for discovery;
- embeddings / vector-assisted discovery;
- RAG over a controlled repository snapshot;
- retrieval provenance;
- authority-aware filtering / ranking;
- persistent / episodic memory as a non-authoritative convenience layer.

If automated retrieval is introduced, it must preserve source path / version traceability and must not select authority by semantic similarity alone.

Conversational or persistent model memory may help locate relevant durable material; it must not supply process state, gate outcomes, handoff content, or course authority when the repository is the canonical source.

## 7. Explicitly Deferred / Not Yet Selected

Do not currently select or establish:

- permanent one-role-per-agent topology;
- a fixed number of permanent agents;
- orchestration platform;
- automated gate engine;
- universal artifact schema;
- vector database;
- embedding model;
- RAG architecture;
- persistent agent memory architecture.

These remain deferred until evidence and dependencies justify the decision.

## 8. Relationship to Program A

Production System work may produce learner-product deliverables, but management state should not be duplicated.

For current Cycle 1:

- primary cycle state belongs here under B1;
- the resulting encounter belongs to Program A / A2 — Learner Encounter Development;
- course capability coverage remains managed in Program A;
- production-system findings remain managed in Program B.

The Production System does not decide what the course should teach merely because it manages the mechanism through which course work is produced.
