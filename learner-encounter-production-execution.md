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

Cycle 1 has accumulated completed and historical artifacts through design, implementation, post-build review, corrective case/design work, and the strengthened full Pedagogy Design re-review under:

`course-design/production/cycle-1/`

Rule-Based Acceptance remains **paused**.

The strengthened Pedagogy Design re-review has now been durably completed at:

`course-design/production/cycle-1/independent-pedagogy-strengthened-full-design-rereview-2026-09-13.md`

Its formal verdict requires targeted design revision before implementation may proceed. The substantive finding and rationale remain in that review artifact and are not restated here.

## 6. Current durable input set

The currently authorized Encounter Architect action must consume the current process/execution authority, current Cycle 1 design authority, and the durable strengthened Pedagogy Review finding it is required to reconcile.

At minimum this includes:

- `learner-encounter-production-process.md`
- `learner-encounter-production-execution.md`
- `course-work-management.md`
- `course-exit-criteria.md`
- `course-knowledge-map.md`
- `pedagogical-foundations.md`
- `course-design/course-visual-language.md`
- `course-design/course-controls.md`
- `course-design/stage-1/stage-1-learner-route.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`
- the current Cycle 1 Case Validation and Lightweight Pedagogy Gate artifacts that authorize the accepted current case/capability
- `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-and-waiver-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-structural-reuse-2026-09-13.md`
- current Show-solution / SQL-workspace authority clarifications that affect the learner path
- `course-design/production/cycle-1/independent-pedagogy-strengthened-full-design-rereview-2026-09-13.md`

Historical reviewer conclusions may be consulted only when needed for traceability. They do not replace the current strengthened review finding or current authority.

## 7. Current next authorized action

**Encounter Architect — targeted design reconciliation/revision of the current Cycle 1 learner encounter to resolve the material finding in the strengthened full Pedagogy Design re-review.**

This action is narrowly scoped to resolving the current review finding.

It does **not** reopen:

- the accepted target capability;
- the accepted case;
- Case Validation;
- the Lightweight Pedagogy Gate;
- unaffected parts of the current learner encounter.

The Architect must:

1. read the durable strengthened Pedagogy Review finding directly;
2. reconcile it under the current `learner-encounter-production-process.md`;
3. preserve unaffected current authority and learner evidence;
4. revise only the material design scope required to resolve the finding;
5. explicitly trace how the revision addresses the review's instructional-function / continuity / removal-impact concern;
6. preserve the distinction between reduced reuse support and first-exposure re-teaching;
7. avoid changing capability, case, or evidence semantics unless the finding cannot be resolved without doing so;
8. produce a durable targeted design-reconciliation/revision artifact under `course-design/production/cycle-1/`;
9. state the exact downstream review/control required by the process change-impact rules.

The Architect must not implement learner-facing code during this action.

### Required result

The revision must either:

- resolve the material Pedagogy finding within current authority and route the resulting design through the applicable downstream reviews/control; or
- report that resolving the finding would require authority, evidence, capability, or case changes outside the authorized scope.

Implementation is not authorized merely because the Architect produces a revision.

## 8. Downstream boundary

Because the current action is a pedagogical / learner-flow design revision, the applicable downstream path must be determined from the current change-impact rules in `learner-encounter-production-process.md`.

At minimum, the resulting design cannot become implementation authority until the required independent Pedagogy review has confirmed resolution. If the revision materially affects learning experience / UX, the required UX review also applies. Auditor control remains required before implementation authority is frozen unless a current explicit owner waiver says otherwise.

No earlier owner-directed waiver should be assumed to cover this new strengthened-review finding unless a current authority artifact explicitly states that it does.

## 9. Acceptance boundary

Rule-Based Acceptance remains paused until:

1. the current targeted design finding is reconciled and revised;
2. every required downstream specialist review/control is completed;
3. the resulting design is frozen as current implementation authority;
4. implementation/runtime is brought into conformance with that authority;
5. required post-build validation is complete.

No existing runtime state should be treated as accepted merely because it predates the strengthened review standard.