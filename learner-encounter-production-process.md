# Learner Encounter Production Process

**Status:** CURRENT  
**Role:** Current process and quality-control protocol for producing new or materially changed learner encounters

This document defines the shortest reliable path from the current trusted course state to an accepted learner encounter.

It is **not** pedagogical, visual, Lesson, schema, data, or implementation authority. Those decisions remain in their dedicated current-source documents. It also does not require a permanent agent topology, fixed reviewer roles, or a fixed number of artifacts.

The process is outcome-driven. It preserves the controls that matter: current-state grounding, justified learner need, valid learner evidence, material authority before implementation, impact-based validation, accepted-product preservation, and explicit acceptance.

Worker/tool assignment and Git coordination are governed separately by `agent-assisted-work-protocol.md` and `chatgpt-git-safety.md`.

## 1. Establish Basis

Before encounter design begins, establish the actual starting point:

- the accepted runtime/product baseline;
- the canonical repository state;
- the applicable current authority under `source-of-truth-hierarchy.md`;
- the capability gap or learner need that may justify new work;
- when several materially plausible next capability gaps exist, compare them against the current learner state and required capability coverage; prefer the smallest justified next reasoning move unless a documented pedagogical reason supports a larger jump.
- only the prior learner capabilities that the course may legitimately assume.

Prior exposure is not proof of mastery. Historical runtime, preserved Lesson/Stage material, prior production artifacts, and old designs may be evidence or candidate material only; they do not become current authority because they already exist.

A new encounter is not justified merely because the accepted journey currently ends, because a schema feature is available, or because preserved material can be reused.

**Stop when:**

- the accepted baseline cannot be established;
- a required current source is missing or materially contradictory;
- the proposed learner-state assumption is stronger than current evidence supports;
- the apparent need is actually an implementation, validation, or documentation gap rather than an encounter gap.

The basis may be recorded inside the encounter-design work when a separate artifact would add no value.

## 2. Define the Encounter

Define the encounter from the learner need, not from the available implementation.

The design must establish:

- the target capability / learner need and why it matters now;
- genuine prerequisites;
- a schema/data-valid and analytically legitimate case;
- the business or analytical question;
- what relational reasoning the learner must perform;
- what learner action or judgment counts as evidence of that reasoning;
- what support/scaffolding is present and how it preserves that evidence;
- reveal order and concept timing where they affect evidence;
- the coherent journey through reasoning, SQL/tool use where applicable, produced evidence, and interpretation/verification.

### Case validity and comparison

Do not invent schema, data, Grain, Cardinality, row counts, NULL behavior, or SQL-result facts that are not established by current sources.

A case should make analytical sense independently of the teaching objective. The target relational difficulty should arise naturally from the information need rather than from an otherwise unmotivated detail added only to manufacture the concept.

When more than one **materially plausible current case** can exercise the same capability and their differences create meaningful learner trade-offs, compare the relevant alternatives proportionally and record why the selected case is preferable now. Do not create a case-comparison ceremony when no meaningful alternative or trade-off exists.

### Evidence Independence

For every core evidence-bearing action, ask:

> Could the learner produce the correct response from wording, quantities, conclusions, answer structure, visuals, or scaffolds already supplied without performing the target reasoning?

If yes, revise the evidence claim, revise the interaction, or rely on another action that actually requires the reasoning.

Closed or constrained interactions are allowed. Supplying premises the learner genuinely needs is allowed. The problem is supplying the conclusion or a shortcut to it while still claiming the later response as evidence of the reasoning.

### Support-to-evidence calibration

Support must match the strength of the evidence claim. Guidance may help the learner without performing the protected inference for them.

If the experience records labels such as `unassisted`, `hint-assisted`, or `solution-assisted`, those labels must truthfully reflect the guidance delivered **before** the evidence was produced and must not be retroactively changed by assistance viewed afterward. A production system is not required to track assistance provenance when the encounter does not need that claim.

### Continuity

Material learner-facing steps should form one intelligible reasoning thread. The learner should be able to understand what problem is being solved, what has already been established, and why the next material move exists.

Do not remove a useful instructional step merely because it is not core assessment evidence. Likewise, do not preserve repeated ceremony or re-teach prior concepts as first exposure without a current reason.

**Stop when:**

- the case is unsupported or artificial;
- intended evidence can be satisfied through answer leakage or a shortcut;
- a prerequisite assumption is unjustified;
- a material part of the journey has no defensible design;
- a genuine authority conflict or required owner decision remains unresolved.

## 3. Make It Buildable

Before implementation, separate the material decisions the build must obey from implementation discretion.

The build boundary should identify:

- learner-behavior and evidence requirements;
- current authority that constrains the build;
- accepted behavior that must be preserved;
- implementation discretion;
- validation expectations appropriate to the planned impact;
- explicit stop conditions if implementation exposes a new material decision.

### Current-Scope Necessity

An `OPEN` matter blocks only when the present build genuinely depends on it. Do not force future or unrelated OPEN questions into the current task merely because they exist.

At the same time, do not label an implementation-affecting learner-behavior decision “future” merely to keep work moving.

### Scoped pedagogy operationalization

If implementation depends on a current pedagogical principle whose operational meaning is materially insufficient to authorize the build, resolve that scoped question before Build. Do not silently turn interpretation into a new universal requirement or interaction pattern, and do not reopen unrelated pedagogy work merely because it exists.

### Authority before Build

A finished design packet, candidate, review, or conversational decision is **not** implementation authority merely because it is detailed or complete.

Before Build begins, all material accepted encounter decisions that implementation must obey must be durable in the appropriate **current authority source** for that encounter/domain.

### Risk-triggered challenge

Before promoting material encounter decisions into current authority, obtain an independent challenge when the consequence of a design error is material and the decision is meaningfully uncertain or difficult to self-validate.

Typical triggers include:

- protected learner evidence or answer-leak risk;
- substantial scaffolding whose effect on evidence is uncertain;
- novel interaction semantics that can mutate evidence or reveal order;
- materially plausible case alternatives with consequential trade-offs;
- genuine cross-domain tension between pedagogy, controls, visual behavior, or data constraints.

The challenger supplies evidence and findings. The challenge does not create authority by itself, and this rule does not require a permanent reviewer role or a fixed review count.

**Stop when:** the implementer would still need to invent a pedagogical, learner-evidence, governed-control, visual-authority, or other material product decision.

## 4. Build

Implement from the known baseline and within current authority.

During Build:

- preserve accepted behavior outside the authorized change;
- use the smallest implementation consistent with authority and existing architecture;
- do not silently expand scope;
- do not resolve a material new product decision in code;
- if a material ambiguity, authority conflict, likely design defect, or infeasible requirement appears, return to the point that owns it rather than hiding it in implementation.

Implementation may choose non-pedagogical details that are genuinely within delegated discretion and do not silently close a broader OPEN matter.

The implementation handoff must make the actual resulting change inspectable. The actual diff is evidence; an implementer summary is not a substitute for it.

## 5. Validate by Impact

Validate what the actual change could break. Do not run a fixed review ceremony merely because a file or Lesson changed.

Depending on impact, validation may include:

- authority/conformance review of the actual diff;
- build or executable checks;
- schema/data checks;
- SQL/result semantic validation, including adversarial checks where a permissive validator could accept an out-of-scope path;
- learner-evidence and scaffolding validation;
- learner-flow / UX and transition validation;
- browser-level interaction validation;
- regression across accepted Lessons or shared behavior materially exposed to the change.

A successful build is not evidence that pedagogy or learner evidence is correct. Matching the expected final rows is not sufficient when the encounter also constrains the relational operation or evidence path.

Validation depth must be proportional to impact. Where the evidentiary or conformance claim is material and author-only validation would not provide sufficient challenge, use an independent validation perspective. Independence is selected by risk/impact, not by a permanent Auditor role or three fixed post-build streams.

### Failure routing

Return a defect to its point of origin rather than restarting the whole process automatically:

- technical implementation defect → **Build**;
- invalid case, learner evidence, scaffolding, reveal order, or journey → **Define the Encounter**;
- missing material authority / build-boundary problem → **Make It Buildable**;
- genuine conflict between current authority sources → resolve the authority conflict before proceeding.

## 6. Accept and Reconcile

These states are distinct:

- `IMPLEMENTED` — behavior exists;
- `VALIDATED TO SCOPE` — required validation for the declared impact/scope has passed;
- `ACCEPTED PRODUCT BASELINE` — the validated behavior is accepted as product state future work must preserve;
- `COURSE-LEVEL VALIDATED / RELEASE READY` — a broader claim requiring the applicable cumulative evidence.

Only after the required validation should a change be accepted.

When accepted:

- update the accepted runtime/product baseline if observable accepted behavior changed;
- ensure material accepted decisions needed by future work are durable in their proper current authority source;
- update `routecraft-work-management.md` so project state and next action match reality;
- when an accepted learner change affects course capability coverage, reconcile the lightweight management trace `exit criterion → required capability → prerequisites → learner encounter(s) → implementation → validation evidence → remaining gap`; this does not require a separate residual-gap artifact after every encounter.
- keep review, test-drive, audit, and rebaseline material as evidence/provenance unless a current authority source explicitly incorporates the accepted decision.

Do not let a review artifact, runtime implementation, or newest document promote itself into authority merely because it is detailed or later-dated.

## 7. Durable-record discipline

Create durable records because later work needs the decision or evidence, not because every transition must generate a file.

Required principles:

- current authority carries accepted normative decisions;
- `routecraft-work-management.md` carries current project work state;
- implementation is represented by the actual repository change;
- validation evidence should be durable enough to support the acceptance claim being made;
- historical/review artifacts remain evidence rather than shadow authority.

There is no universal requirement for a Capability Brief file, Step Ledger, Architect Reconciliation file, frozen-authority handoff file, Implementation Record form, `provenance.md`, or verbatim role-to-role artifact chain.

## 8. Worker / topology neutrality

This process defines required work and controls, not permanent workers.

One person or agent may perform several non-conflicting activities. Separate workers or an independent model may be used when the risk-triggered challenge or validation rule calls for meaningful independence.

Worker/tool choice, branch ownership, synchronization, and local/remote execution are governed by `agent-assisted-work-protocol.md`.

## 9. Maintenance and change impact

Use `production-contract-v1.md` to route changes by impact and to preserve the accepted product baseline.

Change this process only when the production workflow or its required quality controls change. Do not copy Lesson-specific pedagogy, visual rules, Git commands, or implementation details into this file.

The rebaseline evidence that led to this current process is preserved under:

`course-design/production/rebaseline/`

Cycle 1 remains historical production evidence under:

`course-design/production/cycle-1/`

Neither directory is a flat set of current authority.
