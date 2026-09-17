# Candidate Workflow v0 — Production-System Rebaseline

**Status:** REVALIDATED CANDIDATE / NON-AUTHORITATIVE  
**Role:** Proposed replacement workflow for evaluation by dry run  

This is the same Candidate Workflow v0 previously preserved in the repository. It has been revalidated and amended against the corrected management-preservation baseline; no second competing workflow has been created.

It remains architecture-neutral: it does not prescribe permanent roles, agent count, mandatory independent-review topology, or artifact count.

It does **not** replace current production-process authority. Until an explicit accepted cutover, `learner-encounter-production-process.md` remains the current production-process authority.

This candidate may be used for evaluation and dry-run analysis only. It does not authorize Lesson 3 implementation.

## 1. Establish Basis

Establish the actual starting point before encounter work begins.

Required basis:

- accepted runtime baseline;
- canonical repository state;
- applicable current authority;
- relevant current project-management constraints and preserved work-state obligations;
- only the learner assumptions genuinely needed for the proposed encounter.

Historical runtime, preserved Lesson/Stage material, previous process artifacts, old designs, and superseded management records may be considered as evidence or candidate material only. They must not silently become current authority or current work state.

**Block when:**

- a required source is missing or materially contradictory;
- the proposed learner-state assumption is not justified;
- the actual accepted baseline cannot be established;
- current management says prerequisite reconciliation is incomplete for the work being attempted.

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

If implementation depends on a current pedagogical principle whose operational meaning is materially insufficient, resolve that scoped authority question before Build. Do not silently turn interpretation into a new universal requirement or UI pattern.

Before Build begins, material accepted encounter decisions must be durable in the appropriate current authority source. A candidate, evaluation record, or complete design draft is not implementation authority merely because it is detailed.

**Block when:** the implementer would have to invent a pedagogical, learner-evidence, governed-control, or other material product decision in order to proceed.

**Output:** an Implementation Boundary, preferably inside the Encounter Definition or the appropriate existing authority rather than as a mandatory additional handoff artifact.

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
- reconcile the current course capability-coverage management trace when the accepted learner change affects exit-criteria coverage, prerequisites, validation evidence, or remaining gaps;
- update `routecraft-work-management.md` so project state and next action match reality;
- keep provisional review material as evidence rather than allowing it to promote itself into authority.

This capability-coverage reconciliation does not require a separate residual-gap artifact after every encounter. It preserves the course-management obligation to reassess coverage after validated learner encounters and before completion claims.

**Block when:**

- required validation is incomplete;
- a material deviation remains unresolved;
- durable authority and accepted runtime would disagree after acceptance;
- an accepted learner change would leave known capability-coverage management materially stale.

**Output:** aligned code/runtime, authority where needed, capability-management state where affected, and current project work state.

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
2. **Candidate vs current management constraint:** current management state governs whether the project may advance; candidate completeness cannot override an incomplete prerequisite reconciliation.
3. **Candidate vs legacy process mechanics:** divergence is not automatically a failure. Record the divergence and verify whether the underlying requirement/control is still preserved.
4. **Conflict between two genuine current authority sources:** treat as a real authority conflict. Do not silently choose one.
5. **Candidate vs current formal production-process authority:** because the current process remains formally current until cutover, the candidate may be dry-run evaluated but cannot authorize implementation.

## 9. Intentionally unresolved implementation of the workflow

Candidate Workflow v0 does not yet decide:

- who or which tool performs each stage;
- where independent challenge is required by impact/risk, if anywhere;
- which checks should become deterministic automation versus LLM/human review;
- whether the Encounter Definition should be a standalone artifact or an update to an existing authority source;
- how CI should map to validation categories;
- exact validation depth for each future impact class.

The following B3 topics also remain **FUTURE / CONDITIONAL — NEEDS EVIDENCE**, not current workflow requirements:

- artifact identity/version/authority metadata beyond current needs;
- deterministic role-specific source loading;
- explicit missing-source/exclusion handling beyond current manual/source-of-truth practice;
- retrieval provenance and authority-aware filtering if automated retrieval is introduced;
- broader machine-readable process/gate state.

These are not omissions to be silently filled during the dry run.

## 10. Dry-run evaluation target

The next evaluation step, after an explicit project checkpoint, is a Lesson 3 **design dry run without implementation**.

The dry run must check this same candidate against all applicable current canon and corrected management state, including:

- `routecraft-work-management.md`;
- course exit criteria;
- knowledge/dependency authority;
- pedagogical foundations;
- relevant accepted Lesson authority;
- course controls;
- visual language;
- schema/data;
- Source-of-Truth rules;
- Production Contract preservation/change-routing rules.

The dry run should record:

- whether every required decision can be made without reviving legacy choreography;
- where the candidate is insufficient or ambiguous;
- whether any omitted legacy mechanism protected a failure mode that the candidate fails to protect;
- whether any scoped pedagogy operationalization gap actually blocks the encounter;
- what remains unnecessarily procedural in the legacy process;
- whether the candidate can proceed to outcome/calibration comparison without authorizing implementation.
