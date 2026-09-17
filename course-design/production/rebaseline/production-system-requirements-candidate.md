# Production System Requirements — Rebaseline Candidate

**Status:** CANDIDATE / NON-AUTHORITATIVE  
**Role:** Audited requirement set for evaluating a replacement production workflow  

This document records the cleaned requirement set produced by the production-system rebaseline. It is an evaluation artifact, not current production-process authority.

Until an explicit atomic cutover is accepted, `learner-encounter-production-process.md` remains the current production-process authority. Nothing in this document authorizes Lesson 3 implementation.

## 1. Purpose

The goal of the rebaseline is to preserve the controls that are genuinely required for reliable learner-encounter production without automatically preserving the legacy role topology, agent choreography, handoff count, artifact count, or review sequence.

The requirements below describe outcomes and constraints that a candidate workflow must satisfy. They deliberately do not prescribe who performs the work, how many agents are used, or how many files are created.

## 2. Clean requirement set

### PSR-C01 — Ground work in current state

Before designing or changing a learner encounter, establish the accepted runtime baseline, canonical repository state, and the applicable current authority.

Historical or preserved material may be evidence or candidate material, but must not silently become current authority.

### PSR-C02 — Establish a justified learner need

A new or materially changed encounter must be justified by a capability gap or other explicit learner need. The existence of an unused schema feature, preserved design, or implementation is not sufficient justification.

### PSR-C03 — Bound learner-state assumptions

State only the prior learner capabilities that are genuinely needed for the proposed encounter. Prior exposure alone must not be treated as proof of mastery.

### PSR-C04 — Use a valid and credible case

The proposed case must be supported by the current schema and data and must express a legitimate analytical or business need. The data case must not be manufactured merely to force a teaching move.

### PSR-C05 — Define valid learner evidence

The design must identify what learner reasoning or action would count as evidence for the intended capability.

The experience must not reveal, pre-resolve, or otherwise shortcut the conclusion that the learner is expected to establish as evidence.

### PSR-C06 — Calibrate support to the evidence

Hints, explanations, feedback, assistance, and other scaffolding must preserve the validity of the intended evidence. Assistance may support the learner without silently doing the protected reasoning for them.

This requirement does not mandate a particular assistance-provenance mechanism.

### PSR-C07 — Preserve a coherent learner journey

The encounter must form a coherent path from the business/analytical need through relational reasoning, SQL implementation where applicable, produced evidence, and interpretation or verification.

Instructional continuity must be sufficient for the learner to understand why each material move follows from what has already been established.

### PSR-C08 — Settle material design authority before implementation

Material decisions that affect pedagogy, learner evidence, learner behavior, or governed UX semantics must be settled before implementation depends on them.

Implementation freedom should remain available for non-material details that do not create or override product authority.

### PSR-C09 — Do not invent product decisions in implementation

If implementation exposes a material unresolved decision or genuine authority conflict, return the issue to the appropriate design/authority point. Do not resolve it silently in code.

Unrelated OPEN matters do not block work merely because they exist.

### PSR-C10 — Validate the actual change

Validation must inspect the actual resulting diff and, where behavior can be affected, the actual runtime behavior. Agent or implementer summaries are not sufficient evidence by themselves.

### PSR-C11 — Match validation depth to impact

Validation must be proportional to what the change can break. The workflow must support targeted validation for narrow changes and broader regression or learner-flow validation where the impact requires it.

No fixed universal review count or fixed set of verdict artifacts is required by this requirement.

### PSR-C12 — Preserve accepted product behavior

Accepted behavior outside the authorized change must be preserved where materially exposed. A new change must not silently regress accepted Lessons or reactivate historical/candidate behavior.

### PSR-C13 — Distinguish implementation, validation, and acceptance

`IMPLEMENTED`, `VALIDATED TO SCOPE`, and `ACCEPTED PRODUCT BASELINE` are distinct states. Implementation alone does not establish acceptance.

When a decision is accepted and is needed for future work, it must become durable in the appropriate current authority or work-state source rather than remaining only in conversational memory.

## 3. Explicit non-requirements

The rebaseline has not established the following as universal product requirements:

- a permanent Encounter Architect role;
- a permanent Pedagogy Reviewer role;
- a permanent UX Reviewer role;
- a permanent Auditor role;
- one-role-per-agent execution;
- mandatory parallel independent reviews for every encounter;
- a fixed Step Ledger artifact;
- a mandatory Architect Reconciliation phase;
- a mandatory frozen-authority document separate from the design itself;
- verbatim repository artifact handoffs for every transition;
- three fixed post-build review streams;
- a fixed number of production artifacts;
- a universal requirement to update a residual capability-gap artifact after every encounter;
- any particular orchestration platform, agent count, RAG system, or machine-readable process engine.

These mechanisms may still be useful in a specific case if evidence shows that they are needed. Their existence in the legacy process does not make them requirements by default.

## 4. Evaluation rule

A candidate production workflow should be judged by whether it satisfies the cleaned requirements above and protects against the concrete failure modes observed in prior work, not by how closely it resembles the legacy process.

The associated traceability audit is recorded in:

`course-design/production/rebaseline/production-system-requirements-traceability-audit.md`

The current workflow candidate is recorded in:

`course-design/production/rebaseline/candidate-workflow-v0.md`
