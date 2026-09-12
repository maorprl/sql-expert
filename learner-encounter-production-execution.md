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
11. Cycle 1 Implementation — completed; durable implementation handoff recorded. Implementer self-testing is not independent validation.
12. Independent Post-Build Review — **authorized and next**, consisting of Runtime / Conformance Validation, Post-Build Pedagogy Review, and Post-Build Learning Experience / UX Review under the independent roles required by the canonical process.

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
- `course-design/production/cycle-1/implementation-record.md`

These records preserve the completed handoffs through Cycle 1 Implementation plus the narrow post-reconciliation authority and process/execution clarifications that form part of current frozen implementation authority.

They are process/evidence records. They do not independently create new course authority except where a record explicitly captures a Course Authority Owner clarification or, in the case of the Auditor Pre-Build Control, records the process consequence of a PASS under already-existing authority.

The implementation record documents what the Implementer built, material implementation-discretion choices, Implementer self-checks, deviations, and unresolved matters. It is not an independent validation or acceptance artifact.

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

Cycle 1 proceeds to **Independent Post-Build Review**.

The next authorized review streams are:

- **Runtime / Conformance Validation** by the independent Conformance & Validation Auditor;
- **Post-Build Pedagogy Review** by the independent Pedagogy Reviewer;
- **Post-Build Learning Experience / UX Review** by the independent Learning Experience / UX Reviewer.

Those reviewers must inspect the actual implemented learner experience against the frozen implementation authority and the durable implementation handoff at:

- `course-design/production/cycle-1/implementation-record.md`.

The Implementer's own checks recorded there are implementation self-testing only and must not be substituted for any of the independent post-build verdicts.

The frozen implementation authority remains:

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

The original reviewed Encounter Design Packet, both independent design reviews, and Architect Reconciliation remain preserved durable traceability artifacts. They must not be rewritten. Where their historical blocking conclusions conflict with the later current clarifications, the later current clarifications control current execution consequence.

For the deferred Back / Retry / Redo matter, the boundary remains explicit:

- post-result Back / Retry / Redo semantics for reopening/editing protected prediction evidence are **OPEN / BACKLOG / OUT OF CURRENT IMPLEMENTATION SCOPE**;
- the implementation must not be interpreted as establishing those deferred semantics;
- post-build review should verify that no such semantics were silently introduced.

`Show solution` remains available throughout the learner journey, including the protected prediction state, and is treated pedagogically as a stronger assistance level on the same assistance continuum as hints. Revealing it does not by itself populate the learner response, execute SQL, complete required evidence, or bypass later verification. Where the encounter records assistance provenance, solution use is recorded as stronger / solution-assisted evidence rather than unassisted performance.

After all three post-build verdicts are durable and every material finding has explicit disposition, Cycle 1 proceeds to the Rule-Based Acceptance Gate defined in `learner-encounter-production-process.md`.

---

## 7. Targeted comparative Case Validation delta — current execution override

This section is the **current execution state** and supersedes Section 6's earlier next-action statement.

Since Section 6 was recorded, the repository has received durable post-build review artifacts for all three independent streams:

- `course-design/production/cycle-1/post-build-runtime-conformance-review.md`
- `course-design/production/cycle-1/post-build-pedagogy-review.md`
- `course-design/production/cycle-1/post-build-ux-review.md`

The production process was subsequently amended to require comparative Case Validation when more than one materially plausible current case can exercise the same target capability. The earlier Cycle 1 Case Validation did not contain that comparison.

The Encounter Architect has now completed the narrow corrective artifact:

- `course-design/production/cycle-1/case-selection-delta-review.md`

The delta retains:

- the existing Cycle 1 target capability;
- `news_source → news_article` as the selected case after explicit comparison with `company → funding_round`;
- the reconciled reasoning architecture;
- the existing learner-evidence design;
- the existing implementation unchanged.

Under `learner-encounter-production-process.md` §12.4, a case-justification change returns to the Capability & Case Brief / Lightweight Pedagogy Gate layer. For this narrow correction, the delta artifact functions as the amendment to the existing Brief rather than rewriting it.

### Current next authorized action

**Targeted Independent Lightweight Pedagogy Gate — Comparative Case Validation Delta Review**

The independent Pedagogy Reviewer must review:

- `course-design/production/cycle-1/case-selection-delta-review.md`;
- the current amended Case Validation requirements in `learner-encounter-production-process.md`;
- the existing Capability & Case Brief and lightweight gate as necessary for traceability;
- the current schema/seed and Stage 1 authority needed to test the comparative rationale.

The review is narrow: determine whether the comparative evaluation is adequate and whether retaining `news_source → news_article` is preferable to the serious alternative for the learner's current course position.

Rule-Based Acceptance is paused until that targeted review is durable and its finding is resolved.

If the targeted review accepts the retained case without requiring a pedagogical, learner-evidence, UX, implementation, schema, or seed change, the earlier design, implementation, and post-build review artifacts remain preserved and no broader re-review is triggered by this delta.

If the targeted review requires a case change or another material change, follow the applicable Change Impact rule before resuming acceptance.

---

## 8. Operationalized Case Validation rerun — current execution override

This section is the **current execution state** and supersedes Section 7's next-action statement.

After the first comparative Case Validation delta was completed, the production process was further strengthened to operationalize professional judgment that can affect case selection or review severity. The current process now requires:

- consequence-grounding for material professional judgments;
- an operational business / analytical authenticity test;
- explicit rationale for trade-offs between competing case strengths;
- consequence-based justification for classifying a professional defect as material.

Because the existing `case-selection-delta-review.md` predates those requirements, its retained-case decision has not yet been evaluated under the current Case Validation standard.

### Current next authorized action

**Encounter Architect — targeted Cycle 1 Case Validation delta rerun under the current operationalized process**

The Architect must:

- treat the existing Cycle 1 target capability as unchanged unless current evidence provides a material reason to reopen it;
- perform the comparative Case Validation afresh under the current `learner-encounter-production-process.md`;
- independently identify and assess the materially plausible current-schema alternatives rather than treating the prior delta's candidate set or conclusion as binding;
- ground material professional judgments in concrete learner consequences;
- apply the current analytical-authenticity and explicit trade-off requirements;
- preserve existing Cycle 1 design, implementation, and validation work wherever the resulting case decision does not affect it.

The prior `case-selection-delta-review.md` remains a historical process record. It must not be silently rewritten or treated as current authority for the rerun conclusion.

The rerun must produce a new durable delta artifact under `course-design/production/cycle-1/`, update provenance minimally, and hand the result to the independent Lightweight Pedagogy Gate required by §12.4.

Rule-Based Acceptance remains paused until this rerun and its required independent review are resolved.
