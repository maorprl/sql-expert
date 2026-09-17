# Candidate Workflow v0 — Production-System Rebaseline

**Status:** CANDIDATE / NON-AUTHORITATIVE  
**Role:** Proposed replacement workflow for evaluation by dry run  

This workflow is derived from the audited Production System Requirements. It is intentionally architecture-neutral: it does not prescribe permanent roles, agent count, mandatory independent-review topology, or artifact count.

It does **not** replace current production-process authority. Until an explicit atomic cutover is accepted, `learner-encounter-production-process.md` remains the current production-process authority.

This candidate may be used for evaluation and dry-run analysis only. It does not authorize Lesson 3 implementation.

## 1. Establish Basis

Establish the actual starting point before encounter work begins.

Required basis:

- accepted runtime baseline;
- canonical repository state;
- applicable current authority;
- only the learner assumptions genuinely needed for the proposed encounter.

Historical runtime, preserved Lesson/Stage material, previous process artifacts, and old designs may be considered as evidence or candidate material only.

**Block when:**

- a required source is missing or materially contradictory;
- the proposed learner-state assumption is not justified;
- the actual accepted baseline cannot be established.

**Output:** a concise Production Basis snapshot. It does not require a new standalone file when the basis can be established directly from current durable sources.

## 2. Define the Encounter

Define the encounter from the learner need rather than from available implementation or preserved content.

Establish:

- the capability gap / learner need;
- a schema/data-valid and analytically legitimate case;
- the reasoning the learner must perform;
- the intended learner evidence;
- the support boundary needed to preserve that evidence;
- the coherent learner journey through relational reasoning, SQL/result work where applicable, and verification/interpretation.

**Block when:**

- the case is artificial or unsupported by current schema/data;
- the intended evidence can be obtained through a shortcut or answer leakage;
- a prerequisite assumption is unjustified;
- a material part of the learner journey has no defensible design;
- a material authority question remains genuinely unresolved.

**Output:** one Encounter Definition sufficient to evaluate the intended learner experience.

## 3. Make It Buildable

Separate the decisions implementation must obey from the choices implementation may safely make.

Close only OPEN matters that the current implementation actually depends on. Leave unrelated future matters OPEN.

The build boundary should identify:

- locked learner-behavior / evidence requirements;
- current authority that constrains the build;
- accepted behavior that must be preserved;
- implementation discretion;
- explicit stop conditions if a new material decision appears.

**Block when:** the implementer would have to invent a pedagogical, learner-evidence, governed-control, or other material product decision in order to proceed.

**Authority boundary before Build:** a complete Encounter Definition or review packet is not implementation authority merely because it is detailed or finished. Before Build begins, all material accepted encounter decisions that implementation must obey must be durable in the appropriate **current authority source** for that encounter/domain. Candidate, evaluation, review, or provisional material cannot authorize Build by itself.

**Output:** an Implementation Boundary, preferably inside the current accepted encounter authority or linked directly from it rather than as a mandatory additional handoff artifact. Candidate/evaluation material may be used to prepare that boundary but does not become authority automatically.

## 4. Build

Implement within the established boundary from the known starting baseline.

Rules:

- preserve accepted behavior outside the authorized change;
- do not silently expand scope;
- do not resolve a material new product decision in code;
- if a material design/authority issue appears, return to the point that owns that issue rather than hiding it in implementation.

**Block when:**

- a material unresolved decision is encountered;
- implementation requires unauthorized scope expansion;
- accepted behavior would need to change without authority.

**Output:** implementation plus the actual resulting diff. Additional durable documentation is required only when a durable decision, deviation, or evidence record actually needs to be preserved.

## 5. Validate by Impact

Validate what the actual change could break rather than running a fixed review ceremony.

Depending on impact, validation may include:

- authority/conformance review of the actual diff;
- build or executable checks;
- SQL/result semantic validation;
- learner-evidence and scaffolding validation;
- learner-flow / UX validation;
- regression across materially exposed accepted Lessons or shared behavior.

Validation depth must be proportional to the change.

There is no candidate requirement for three fixed post-build verdict streams or a fixed set of reviewers.

**Failure routing:**

- technical implementation defect → return to **Build**;
- invalid learner evidence, case, support, or journey → return to **Define the Encounter**;
- material unresolved authority/build boundary → return to **Make It Buildable** or the applicable current authority source.

**Output:** sufficient concrete validation evidence to support or reject acceptance.

## 6. Accept and Reconcile

Only after validation, decide whether the result becomes accepted product state.

If accepted:

- update the accepted runtime/product baseline where observable accepted behavior changed;
- update the appropriate authority if an accepted durable decision needs to govern future work;
- update `routecraft-work-management.md` so project state and next action match reality;
- keep provisional review material as evidence rather than allowing it to promote itself into authority.

**Block when:**

- required validation is incomplete;
- a material deviation remains unresolved;
- durable authority and accepted runtime would disagree after acceptance.

**Output:** aligned code/runtime, authority where needed, and current project work state.

## 7. Two conceptual loops

The workflow can be understood as two loops rather than a long role chain:

**Design loop:**  
`Establish Basis → Define the Encounter → Make It Buildable`

**Delivery loop:**  
`Build → Validate by Impact → Accept and Reconcile`

A defect should return to the point where the defect originated rather than restarting every stage by default.

## 8. Conflict rules during candidate evaluation

The candidate workflow is not a second source of truth.

When evaluating it:

1. **Candidate vs genuine current product/course authority:** current product/course authority wins; change the candidate or encounter design.
2. **Candidate vs legacy process mechanics:** divergence is not automatically a failure. Record the divergence and verify whether the underlying requirement/control is still preserved.
3. **Conflict between two genuine current authority sources:** treat as a real authority conflict. Do not silently choose one.
4. **Candidate vs current formal production-process authority:** because the current process remains formally current until cutover, the candidate may be dry-run evaluated but cannot authorize implementation.

## 9. Intentionally unresolved implementation of the workflow

Candidate Workflow v0 does not yet decide:

- who or which tool performs each stage;
- where independent challenge is required by impact/risk, if anywhere;
- which checks should become deterministic automation versus LLM/human review;
- the exact document form used to carry a candidate Encounter Definition before accepted decisions are promoted into current authority;
- how CI should map to validation categories;
- exact validation depth for each future impact class.

These are not omissions to be silently filled during the dry run. The Lesson 3 dry run should expose which of them genuinely need decisions.

## 10. Dry-run evaluation target

The next evaluation step is a Lesson 3 **design dry run without implementation**.

The dry run must check this candidate against all applicable current canon, including course exit criteria, knowledge/dependency authority, pedagogical foundations, relevant accepted Lesson authority, course controls, visual language, schema/data, Source-of-Truth rules, and the valid preservation/change-routing parts of Production Contract v1.

The dry run should record:

- whether every required decision can be made without reviving legacy choreography;
- where the candidate is insufficient or ambiguous;
- whether any omitted legacy mechanism protected a failure mode that the candidate fails to protect;
- what remains unnecessarily procedural in the legacy process;
- whether the candidate can proceed to outcome comparison without authorizing implementation.
