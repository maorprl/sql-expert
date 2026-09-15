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

## 1. Program goal

Develop a repeatable, traceable production system that can move from the current trusted course state to justified learner encounters, implementation, validation, and coverage evidence while preserving authority boundaries and required independent review.

The Production System supports the Learning Product. Infrastructure is justified by production reliability, traceability, coordination, and quality needs rather than by infrastructure volume itself.

## 2. Program structure

### B1 — Encounter Production Lifecycle

Primary authority:

`learner-encounter-production-process.md`

Scope includes capability/case entry, learner-state assumptions, encounter design, independent review, reconciliation, pre-build control, implementation authority, implementation, validation, post-build review, acceptance, change impact, closure, and durable handoffs.

### B2 — Execution & orchestration

Primary execution guidance:

`agent-assisted-work-protocol.md`

`learner-encounter-production-execution.md` is currently a **historical / superseded Cycle 1 execution snapshot**. It must not be treated as the repository's current work-state source unless explicitly reactivated for a future production cycle.

Scope includes worker/tool allocation, isolation where required, branch ownership, synchronization, handoff mechanics, and future orchestration only where justified.

### B3 — Process state, context & provenance

Scope includes:

- durable production artifacts and provenance;
- artifact identity/version/authority metadata;
- future machine-readable process/gate state where justified;
- deterministic role-specific source loading;
- explicit missing-source/exclusion handling;
- retrieval provenance and authority-aware filtering if automated retrieval is later introduced.

## 3. Current production-system state

Cycle 1 produced a substantial durable history under:

`course-design/production/cycle-1/`

That directory is retained as production history/provenance. It must not be read as a flat set of current course authority.

The previous live Cycle 1 execution mapping became stale while later course work continued through the current Stage 1–3 runtime, Stage 2 authority extraction, Stage 1–3 topology work, Wave 4, Wave 5A, and the Wave 5B decision gate.

Accordingly:

- there is **no active Cycle 1 next-action claim in this management record**;
- the current Learning Product work state is managed in `course-experience-improvement-work-management.md` and `course-work-management.md`;
- any future learner-encounter production cycle must establish an explicit current execution mapping tied to its actual baseline before process-gated implementation begins.

## 4. Current active control

Preserve durable handoffs and authority boundaries whenever the production process is used.

Where a completed phase output becomes an input to another role, preserve the actual completed artifact according to the process's durable-handoff rule. Do not substitute conversational memory or summary text for required repository evidence.

## 5. Production-system calibration backlog

The existing Cycle 1 history is useful evidence for later production-system calibration, including:

- whether any process phases/handoffs were unnecessary or missing;
- where independent review materially changed outcomes;
- where context was duplicated, polluted, or difficult to resolve;
- where process state became ambiguous or stale;
- where durable artifacts prevented or exposed drift;
- coordination cost and failure modes;
- whether a lighter machine-readable execution-state format would prevent stale `CURRENT` claims.

This cleanup does **not** perform that retrospective or change the canonical process.

## 6. Deferred architecture decisions

Do not select merely because the repository contains many documents or previous multi-agent work:

- permanent one-role-per-agent topology;
- fixed permanent agent count;
- orchestration platform;
- automated gate engine;
- universal artifact schema;
- vector database / embeddings / RAG;
- persistent agent-memory architecture.

First prefer:

repository source of truth → explicit current authority → lightweight metadata where justified → deterministic source selection → explicit provenance

Only add more infrastructure when evidence shows that baseline is insufficient.

## 7. Relationship to Program A

Production System work may produce learner-product deliverables, but management state should not be duplicated.

- Program A owns current learner-product work and capability coverage.
- Program B owns the production mechanism and its calibration.
- The Production System does not decide what the course should teach merely because it manages the mechanism used to produce course work.
