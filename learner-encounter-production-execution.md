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

1. Capability & Case Brief — completed.
2. Lightweight Independent Pedagogy Gate — completed with `PROCEED`.
3. Encounter Design — next.

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

These records preserve the handoff between the Capability & Case decision and Encounter Design.

They are process/evidence records. They do not independently create new course authority.

## 5. Agent-topology decision deferred until after Cycle 1

Do **not** finalize the permanent mapping of the five functional roles to concrete agents before Cycle 1 has completed.

After one full production cycle, review the actual handoffs, independence needs, context requirements, coordination cost, and failure modes, then decide whether the five functional roles should map operationally to:

- five separate agents;
- a smaller number of agents with isolated role executions;
- another execution topology that preserves the mandatory separations.

Until that review occurs, the current separate-chat approach is temporary execution scaffolding, not architecture authority.

## 6. Current next action

Cycle 1 proceeds to **Encounter Design** under the `Encounter Architect` functional role.

No implementation work is authorized yet.
