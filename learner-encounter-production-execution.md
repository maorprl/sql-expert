# Learner Encounter Production — Execution Mapping

**Status:** CURRENT — Cycle 1 execution policy  
**Role:** Execution companion to `learner-encounter-production-process.md`

This document records how the current learner-encounter production process is being executed during Cycle 1.

It does **not** change the functional roles, gates, authority boundaries, or review requirements defined in `learner-encounter-production-process.md`. It also does **not** establish the final long-term agent topology.

## 1. Relationship between the two execution/process documents

For learner-encounter production:

- `learner-encounter-production-process.md` defines the **workflow, functional roles, required gates, independence requirements, durable artifacts, and acceptance logic**.
- `agent-assisted-work-protocol.md` defines **worker/tool selection, handoff mechanics, implementation-agent usage, branch coordination, remote/local synchronization, and general execution efficiency**.

The two documents are complementary, not competing sources.

Where `learner-encounter-production-process.md` requires a specific independent review, gate, or role separation for learner-encounter production, that requirement remains mandatory. General efficiency guidance in `agent-assisted-work-protocol.md` does not remove such a required control; it governs how the required control is executed.

Neither document is pedagogical, visual, Stage, schema, or data authority.

## 2. Cycle 1 temporary execution decision

Cycle 1 will continue **manually through the canonical learner-encounter production process**.

Current sequence status:

1. Capability & Case Brief — completed; verbatim durable handoff verified.
2. Lightweight Independent Pedagogy Gate — completed with `PROCEED`; verbatim durable handoff verified.
3. Encounter Design — completed; verbatim durable handoff verified.
4. Independent Pedagogy Design Review — completed; verbatim durable handoff verified.
5. Independent UX Design Review — completed; verbatim durable handoff verified.
6. Architect Reconciliation — completed to the authority available at the time; verbatim durable handoff verified.
7. Show solution authority clarification — completed: always available; treated pedagogically as a stronger assistance level rather than a separate owner gate.
8. Current-scope necessity clarification — completed: unresolved post-result Back / Retry / Redo semantics remain Backlog and are outside the current Cycle 1 implementation scope.
9. Auditor Pre-Build Control — completed with **PASS → FROZEN IMPLEMENTATION AUTHORITY**; verbatim durable handoff verified.
10. Frozen Implementation Authority — established for the accepted Cycle 1 scope.
11. Cycle 1 Implementation — authorized and next.

The remaining canonical process continues from there as defined in `learner-encounter-production-process.md`.

## 3. Temporary use of separate chats / executions

During Cycle 1, separate chats or isolated model executions may be used to instantiate functional roles and preserve review independence.

This is an **execution mechanism only**.

It does not establish that:

- every functional role must permanently map to a separate agent;
- the final system will contain five agent instances;
- every process phase requires a new chat;
- the current manual chat topology is the desired automation architecture.

The functional-role architecture remains canonical. The final mapping from roles to agents/runs remains deliberately undecided during Cycle 1.

Mandatory independence boundaries from `learner-encounter-production-process.md` still apply regardless of the temporary execution mechanism.

## 4. Durable Cycle 1 records

The following completed Cycle 1 outputs are stored as durable process records:

- `course-design/production/cycle-1/capability-and-case-brief.md`
- `course-design/production/cycle-1/lightweight-pedagogy-gate-review.md`
- `course-design/production/cycle-1/encounter-design-packet.md`
- `course-design/production/cycle-1/independent-pedagogy-design-review.md`
- `course-design/production/cycle-1/independent-ux-design-review.md`
- `course-design/production/cycle-1/architect-reconciliation.md`
- `course-design/production/cycle-1/reconciled-encounter-design-packet.md`
- `course-design/production/cycle-1/authority-clarification-show-solution-assistance.md`
- `course-design/production/cycle-1/current-scope-necessity-clarification.md`
- `course-design/production/cycle-1/auditor-pre-build-control.md`

These records preserve the completed handoffs through Auditor Pre-Build Control plus the narrow post-reconciliation authority and process/execution clarifications that form part of current frozen implementation authority.

They are process/evidence records. They do not independently create new course authority except where a record explicitly captures a Course Authority Owner clarification or, in the case of the Auditor Pre-Build Control, records the process consequence of a PASS under already-existing authority.

### 4.1 Verbatim durable-handoff rule

When the output of one learner-encounter production phase is an input to a later phase, the durable repository record must preserve the **actual completed output verbatim** before the dependent phase begins.

For this purpose, verbatim means:

- no summary;
- no reconstruction from memory or notes;
- no paraphrase;
- no silent cleanup that changes wording or structure;
- no replacement by a later assistant's interpretation of what the prior role decided.

Formatting changes are permitted only when they are mechanically required to store the text and do not alter its substantive wording or structure.

The dependent role must consume the durable repository artifact, not a conversational restatement of it.

If the verbatim source cannot be established, the record must not be represented as a completed durable handoff. The dependent phase remains blocked until the actual output is recovered and stored or the Course Authority Owner explicitly authorizes another provenance treatment.

This rule applies to all inter-phase production artifacts, including review outputs, reconciliation records, implementation/deviation records, validation verdicts, and acceptance records.

## 5. Agent-topology decision deferred until after Cycle 1

Do **not** finalize the permanent mapping of the five functional roles to concrete agents before Cycle 1 has completed.

After one full production cycle, review the actual handoffs, independence needs, context requirements, coordination cost, and failure modes, then decide whether the five functional roles should map operationally to:

- five separate agents;
- a smaller number of agents with isolated role executions;
- another execution topology that preserves the mandatory separations.

Until that review occurs, the current separate-chat approach is temporary execution scaffolding, not architecture authority.

## 6. Current next action

Cycle 1 proceeds to **Implementation** under the `Implementer` functional role.

The Implementer must consume the frozen implementation authority directly from the repository. The primary current implementation authority is:

- `course-design/production/cycle-1/reconciled-encounter-design-packet.md`
- `course-design/production/cycle-1/authority-clarification-show-solution-assistance.md`
- `course-design/production/cycle-1/current-scope-necessity-clarification.md`
- `course-design/production/cycle-1/auditor-pre-build-control.md`

The current source authorities explicitly incorporated by the reconciled design remain applicable where referenced, including:

- `pedagogical-foundations.md`
- `course-design/course-visual-language.md`
- `course-design/course-controls.md`
- `startup-ecosystem/startup-ecosystem-schema.sql`
- `startup-ecosystem/startup-ecosystem-seed.sql`

The original reviewed Encounter Design Packet, both independent reviews, and Architect Reconciliation remain preserved durable traceability artifacts. They must not be rewritten. Where their historical blocking conclusions conflict with the later current clarifications, the later current clarifications control current execution consequence.

For the deferred Back / Retry / Redo matter, the frozen implementation boundary is explicit:

- post-result Back / Retry / Redo semantics for reopening/editing protected prediction evidence are **OPEN / BACKLOG / OUT OF CURRENT IMPLEMENTATION SCOPE**;
- the current build must not silently establish those deferred semantics;
- implementation does not need to implement or validate that future behavior in order to satisfy the accepted Cycle 1 scope.

`Show solution` remains available throughout the learner journey, including the protected prediction state, and is treated pedagogically as a stronger assistance level on the same assistance continuum as hints. Revealing it does not by itself populate the learner response, execute SQL, complete required evidence, or bypass later verification. Where the encounter records assistance provenance, solution use is recorded as stronger / solution-assisted evidence rather than unassisted performance.

The Implementer may decide only details explicitly within delegated implementation discretion. If implementation exposes a pedagogy or UX ambiguity, missing authority/evidence, design infeasibility, likely design defect, or a need for behavior explicitly outside the accepted scope, the Implementer must stop and raise the corresponding decision/change request rather than silently choosing semantics.

After implementation, Cycle 1 proceeds through the independent post-build review and acceptance sequence defined in `learner-encounter-production-process.md`.
