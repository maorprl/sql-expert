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
6. Architect Reconciliation — unblocked and next.

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

These records preserve the completed handoffs through both independent pre-implementation design reviews and provide the durable inputs for Architect Reconciliation.

They are process/evidence records. They do not independently create new course authority.

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

Cycle 1 proceeds to **Architect Reconciliation** under the `Encounter Architect` functional role.

The Encounter Architect must consume:

- `course-design/production/cycle-1/encounter-design-packet.md`
- `course-design/production/cycle-1/independent-pedagogy-design-review.md`
- `course-design/production/cycle-1/independent-ux-design-review.md`

Each material review finding must receive one of the dispositions defined in `learner-encounter-production-process.md`:

- **ACCEPTED**;
- **ACCEPTED WITH MODIFICATION**;
- **REJECTED WITH RATIONALE**;
- **OWNER DECISION REQUIRED**.

The independent Pedagogy Design Review contains two REVISION REQUIRED findings and no owner decision.

The independent UX Design Review contains two REVISION REQUIRED findings and one OWNER DECISION REQUIRED finding concerning the subset of global Back / Retry / Show solution semantics that can affect protected pre-execution prediction evidence.

No Auditor Pre-Build Control or implementation work is authorized until Architect Reconciliation is complete and all required owner matters affecting implementation have been resolved through the appropriate authority path.
