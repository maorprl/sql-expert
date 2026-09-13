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
- `learner-encounter-pedagogy-step-review-protocol.md` is the **current mandatory process amendment for full pre-build and post-build Pedagogy Review**, adding step-level learner-journey, continuity, and handoff checks without establishing course content.
- `agent-assisted-work-protocol.md` defines **worker/tool selection, handoff mechanics, implementation-agent usage, branch coordination, remote/local synchronization, and general execution efficiency**.
- this file records the **current execution state and authorization only**.

The documents are complementary, not competing sources.

Where `learner-encounter-production-process.md` or the current pedagogy step-review amendment requires a specific independent review, gate, or role separation, that requirement remains mandatory regardless of the temporary execution mechanism.

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

Subsequent runtime test driving and course reconstruction exposed a process-level pedagogy-review defect: prior review could validate the target capability/evidence while failing to account explicitly for every learner step, continuity scaffold, and reasoning/tool handoff in the complete learner journey.

A corrective step-level Pedagogy Review has now been completed under `learner-encounter-pedagogy-step-review-protocol.md` and returned **REVISION REQUIRED**.

Rule-Based Acceptance remains paused for the affected encounter until the required design reconciliation, implementation changes, and downstream validation are resolved.

Historical corrective Case Validation artifacts remain preserved as process history. Their substantive candidate sets, weighting, and conclusions are **not execution state** and must not be copied into this file.

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
- `corrective-step-level-pedagogy-review-2026-09-13.md`
- `provenance.md`

The existence of a record in this list does not make its substantive decision current authority for a newly reopened decision. Current authority and authorized inputs are determined by the canonical process, the current pedagogy step-review amendment, and the current action below.

## 7. Current execution override

A targeted process defect was identified in the full Pedagogy Review mechanism: the existing process strongly validated core capability evidence and scaffolding-to-evidence calibration, but did not require an explicit disposition for every learner step and transition or an explicit functional comparison with the relevant prerequisite encounter.

The current process amendment `learner-encounter-pedagogy-step-review-protocol.md` closes that control gap for the present corrective work and for subsequent full Pedagogy Reviews while the amendment remains current.

The corrective review completed under that amendment found material learner-journey defects and issued **REVISION REQUIRED**.

### Current next authorized action

**Encounter Architect — targeted reconciliation and learner-journey design revision for the current Funding participation encounter.**

The Architect must:

- read `learner-encounter-production-process.md`, this execution file, `learner-encounter-pedagogy-step-review-protocol.md`, and `course-design/production/cycle-1/corrective-step-level-pedagogy-review-2026-09-13.md` first;
- disposition every corrective-review finding explicitly;
- preserve the accepted capability and case unless a finding cannot be resolved without reopening them;
- revise only the learner-journey surfaces needed to resolve accepted findings;
- distinguish first-exposure teaching from continuity scaffolding and avoid simply cloning the prerequisite encounter;
- define the revised opening business situation, measurement/baseline decision, reasoning→SQL bridge, optional SQL assistance, SQL→result evidence continuity, and final verification context with sufficient implementation authority;
- preserve the existing valid row-multiplication evidence sequence unless a documented accepted finding requires a change;
- produce a durable reconciliation / targeted design-revision artifact under `course-design/production/cycle-1/`;
- stop before implementation until the revised design has a clear implementation boundary.

Rule-Based Acceptance remains paused until the design revision, implementation changes, and downstream validation required by `learner-encounter-production-process.md` are resolved.
