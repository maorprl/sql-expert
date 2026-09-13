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

Cycle 1 has accumulated completed and historical artifacts through design, implementation, post-build review, and corrective case/design work under:

`course-design/production/cycle-1/`

Rule-Based Acceptance remains **paused**.

A learner-experience defect exposed a process weakness: the Pedagogy Review could evaluate evidence independence and scaffold strength without being forced to test the instructional function and removal cost of every material step. `learner-encounter-production-process.md` has now been strengthened so that full Pedagogy Review must examine the whole material sequence, including teaching and continuity steps that are not themselves core evidence.

Existing runtime and prior Pedagogy Review verdicts remain historical evidence. They do **not** waive the newly required re-review of the current design under the strengthened process.

## 6. Current durable input set

The current targeted re-review must consume the current authority needed to understand the learner state, first-exposure JOIN teaching, and the current Cycle 1 design. At minimum this includes:

- `learner-encounter-production-process.md`
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

Historical Pedagogy Review conclusions must not be used as substitutes for the new review judgment.

## 7. Current next authorized action

**Independent Pedagogy Reviewer — targeted full design re-review of the current Cycle 1 learner encounter under the strengthened instructional-function / continuity / removal-impact standard.**

This is not a new Capability Gate and not a new Case Validation unless the review discovers a defect that genuinely requires reopening those phases.

The reviewer must examine the current encounter **step by step**, including material steps that are guidance, teaching, continuity, measurement, tool transition, or assistance rather than core evidence.

For each material learner-facing step or transition, the reviewer must establish:

1. its instructional function;
2. the learner action it requires;
3. its placement and dependency in the reasoning sequence;
4. the scaffold/support supplied;
5. the concrete consequence of removing or materially compressing it.

The review must explicitly test continuity from the persistent business request through the reused relational-reading work, target Grain and Cardinality, qualitative prediction, concept consolidation, the transition from established relational reasoning into `JOIN ... ON ...` and learner-authored SQL, SQL scaffolding, editor/result interpretation, and optional assistance / Show solution behavior where those are present in the current design.

The reviewer must compare the current reuse treatment with the relevant first-exposure JOIN teaching and the Course-Assumed Learner State. “Already introduced,” “reused,” “reduced scaffolding,” and “not core evidence” are not sufficient reasons by themselves to remove a teaching or translation function.

### Required outcome

The reviewer must produce a durable targeted review artifact with one of the normal Pedagogy Design Review outcomes/findings under the current process.

If the review finds a material continuity or teaching defect, the next action is **Encounter Architect targeted design reconciliation/revision**. Runtime implementation is not authorized until the resulting pedagogical finding is resolved through the applicable downstream review/control path.

If the review finds no material defect, the next action is the applicable downstream control needed to establish implementation authority under the current process.

## 8. Independence requirement for this re-review

The formal re-review must be formed from the current source set and the strengthened process, not from prior reviewer conclusions or a previously accepted narrative.

Use a fresh independent review context where practical. The reviewer may read prior artifacts that are part of current design authority, but must not treat earlier Pedagogy Review verdicts as evidence that the current design passes the strengthened standard.

## 9. Acceptance boundary

Rule-Based Acceptance remains paused until:

1. the strengthened Pedagogy Design re-review is durably completed;
2. every material finding receives the required disposition;
3. any resulting design change is reviewed and controlled according to `learner-encounter-production-process.md`;
4. implementation/runtime is brought into conformance with the resulting current authority;
5. required post-build validation is complete.

No existing runtime state should be treated as accepted merely because it predates the strengthened review standard.