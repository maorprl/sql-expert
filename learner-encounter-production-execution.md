# Learner Encounter Production — Execution Mapping

**Status:** CURRENT — Cycle 1 execution policy  
**Role:** Execution companion to `learner-encounter-production-process.md`

This document records only how the current learner-encounter production process is being executed during Cycle 1.

It does **not** define or summarize pedagogical, visual, Stage, schema, data, case-selection, business-situation, learner-evidence, or implementation-content decisions. Those decisions remain in their dedicated authority and durable production artifacts.

## 1. Execution-state boundary

This file may record:

- which process phase or corrective delta is currently authorized;
- which required handoffs exist;
- which role may act next;
- which durable artifacts must exist before that action;
- whether acceptance is open, paused, or blocked;
- execution topology and independence requirements.

This file must **not** record or restate:

- selected or rejected course cases;
- candidate relation sets;
- business-question content;
- schema-specific rationale;
- row counts or data-instance facts used in a course decision;
- pedagogical trade-off conclusions;
- learner-facing design decisions;
- the substantive outcome of a role's professional judgment.

Those belong in the role's durable artifact and, where useful, in provenance. This separation prevents execution-state files from leaking prior content decisions into later independent discovery or review.

## 2. Relationship between execution/process documents

For learner-encounter production:

- `learner-encounter-production-process.md` defines the **workflow, functional roles, required gates, independence requirements, durable artifacts, change-impact rules, and acceptance logic**.
- `agent-assisted-work-protocol.md` defines **worker/tool selection, handoff mechanics, implementation-agent usage, branch coordination, remote/local synchronization, and general execution efficiency**.
- this file records the **current execution state and authorization only**.

The documents are complementary, not competing sources.

Where `learner-encounter-production-process.md` requires a specific independent review, gate, or role separation, that requirement remains mandatory regardless of the temporary execution mechanism.

## 3. Temporary Cycle 1 execution topology

Cycle 1 continues manually through the canonical learner-encounter production process.

Separate chats or isolated model executions may be used to instantiate functional roles and preserve required independence. This is execution scaffolding only; it does not establish a permanent one-role-per-agent architecture.

Mandatory independence boundaries in `learner-encounter-production-process.md` remain controlling.

The permanent agent topology remains deferred until after Cycle 1.

## 4. Durable handoff rule

When the output of one production phase becomes an input to a later phase, the durable repository record must preserve the actual completed output verbatim before the dependent phase begins.

A summary, reconstruction, paraphrase, conversational restatement, or execution-file synopsis is not a valid substitute for the durable handoff.

The receiving role must consume the required durable artifact directly when that artifact is part of its authorized input set.

If the verbatim handoff cannot be established, dependent work remains blocked unless the Course Authority Owner explicitly authorizes another provenance treatment.

## 5. Cycle 1 coarse execution status

The following canonical work has been completed and durably recorded:

1. Capability & Case Brief.
2. Lightweight Independent Pedagogy Gate.
3. Encounter Design.
4. Independent Pedagogy Design Review.
5. Independent UX Design Review.
6. Architect Reconciliation and required clarifications.
7. Auditor Pre-Build Control.
8. Frozen Implementation Authority.
9. Cycle 1 Implementation.
10. Independent Post-Build Runtime / Conformance Review.
11. Independent Post-Build Pedagogy Review.
12. Independent Post-Build Learning Experience / UX Review.

Rule-Based Acceptance is currently paused because Case Validation was reopened after the production process was strengthened.

Corrective Case Validation work has already produced historical durable delta artifacts. Those artifacts remain preserved as process history, but their substantive candidate sets, weighting, and conclusions are **not execution state** and must not be copied into this file.

## 6. Durable Cycle 1 record locations

Completed and historical Cycle 1 handoffs are stored under:

`course-design/production/cycle-1/`

Current records include:

- `capability-and-case-brief.md`
- `lightweight-pedagogy-gate-review.md`
- `encounter-design-packet.md`
- `independent-pedagogy-design-review.md`
- `independent-ux-design-review.md`
- `architect-reconciliation.md`
- `reconciled-encounter-design-packet.md`
- `authority-clarification-show-solution-assistance.md`
- `current-scope-necessity-clarification.md`
- `auditor-pre-build-control.md`
- `implementation-record.md`
- `post-build-runtime-conformance-review.md`
- `post-build-pedagogy-review.md`
- `post-build-ux-review.md`
- `case-selection-delta-review.md`
- `case-validation-operationalized-rerun.md`
- `provenance.md`

The existence of a record in this list does not make its substantive decision current authority for a newly reopened decision. Current authority and authorized inputs are determined by the canonical process and the current action below.

## 7. Current execution override

After the most recent Case Validation rerun, `learner-encounter-production-process.md` was strengthened again to require that analytical authenticity extend to the **additional information need and relational move themselves**, not only to a plausible starting task or report.

Because the most recent Case Validation rerun predates that strengthened requirement, its Case Validation conclusion has not been evaluated under the current standard.

### Current next authorized action

**Encounter Architect — targeted Cycle 1 Case Validation delta rerun under the current strengthened analytical-authenticity standard**

The Architect must:

- read the current `learner-encounter-production-process.md` and this execution file first;
- verify that this targeted rerun is authorized;
- treat the existing target capability as presumptively unchanged unless current permitted evidence gives a material reason to reopen it;
- perform Case Validation afresh under the current process requirements;
- independently identify materially plausible current-schema candidates from the current schema/data and permitted current course authority;
- apply the current comparative, consequence-grounding, analytical-authenticity, and trade-off requirements;
- preserve existing Cycle 1 work wherever the resulting Case Validation decision does not materially affect it;
- produce a new durable delta artifact and minimal provenance/execution updates.

### Independence / contamination rule for this rerun

Before independent candidate discovery and initial comparative judgment are complete, the Architect must **not** read historical case-selection delta artifacts or provenance entries that disclose their candidate sets, selected cases, or comparative conclusions.

Historical case-selection artifacts may be inspected only afterward for traceability and change-impact comparison.

The mandatory pre-discovery input set must therefore remain limited to current process/execution authority plus the current course/schema/data sources needed to discover and evaluate candidates independently.

Rule-Based Acceptance remains paused until this rerun and the downstream review required by `learner-encounter-production-process.md` are resolved.
