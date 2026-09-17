# RouteCraft Production Contract v1

**Status:** CURRENT  
**Role:** Cross-project product/repository production contract

This contract defines the minimum conditions under which RouteCraft changes may be treated as preserving the accepted product and may be promoted into the canonical repository state.

It does **not** replace:

- `source-of-truth-hierarchy.md` for authority ownership and precedence;
- `learner-encounter-production-process.md` for new/materially changed encounter workflow and quality controls;
- `agent-assisted-work-protocol.md` for worker/tool assignment, branch coordination, synchronization, and execution mechanics;
- `chatgpt-git-safety.md` for ChatGPT-specific Git safety.

The contract connects those systems to the accepted product baseline without duplicating them.

## 1. Two baseline concepts

RouteCraft distinguishes between **canonical repository state** and **accepted runtime baseline**.

### 1.1 Canonical Repository State

The canonical repository state is the current accepted `main` HEAD.

It may advance because of accepted changes to documentation, authority, management, process-supporting records, schema/data documentation, or implementation.

A newer canonical repository state does not by itself mean that observable learner runtime behavior changed.

### 1.2 Accepted Runtime Baseline

The accepted runtime baseline is the latest implementation state whose observable learner behavior has been accepted for the current product scope.

For the current Lessons 1–2 product, the accepted runtime baseline remains:

`9b8f6ffc1f22ce2d2783f49e52a48c480a0945fa`

Later documentation/canon/authority commits do not silently redefine that runtime baseline when they do not alter runtime behavior.

When a future accepted implementation intentionally changes observable learner behavior, the accepted runtime baseline must be updated explicitly in current management state.

## 2. Preservation contract

Accepted product behavior must be preserved unless a current authority decision explicitly authorizes a change.

Therefore a new change must not silently:

- regress already accepted Lesson 1 or Lesson 2 behavior;
- change learner flow, evidence, concept timing, controls, visual-role semantics, or SQL/task behavior outside the authority for that change;
- resolve an `OPEN` matter merely because implementation needs a convenient local choice;
- reactivate historical, superseded, or candidate material as current authority;
- treat existing runtime behavior as authority when current authority says otherwise.

Implementation may change internal structure without changing accepted behavior when that change remains within implementation discretion and passes validation appropriate to its impact.

## 3. Route changes by impact, not by file type

The required workflow is determined by what the change can affect.

### 3.1 Authority/documentation maintenance

Use this route when an already accepted decision is being recorded, reconciled, clarified, or linked without changing learner/runtime behavior.

Required before promotion:

- verify the correct authority owner under `source-of-truth-hierarchy.md`;
- review the actual diff for scope containment;
- verify that no new product behavior, OPEN decision, or implementation requirement was introduced accidentally.

A build or learner-flow runtime test is not automatically required for documentation-only maintenance that cannot affect executable behavior.

### 3.2 Implementation-only correction

Use this route for a technical or conformance fix that does not change accepted design authority.

Required before promotion:

- implementation must remain within current authority;
- actual diff must be reviewed;
- validation must cover the behavior the change could affect;
- relevant existing accepted behavior must remain intact.

Where executable runtime code changes, the current repository build should be run when materially applicable, together with targeted behavioral validation appropriate to the change.

A successful build alone is not acceptance of learner behavior.

### 3.3 Shared runtime, control, or cross-Lesson behavior

A change that can affect more than one accepted Lesson, the course shell, shared controls, shared workspace behavior, navigation, persistence behavior, or shared runtime infrastructure requires regression checking across every accepted Lesson materially exposed to that change.

The scope of regression should follow actual impact; this rule does not require unrelated exhaustive testing.

### 3.4 Pedagogy, learner evidence, Lesson-flow, or learner-experience change

A change that affects pedagogy, learner reasoning, evidence, concept timing, scaffolding, learner flow, or material UX semantics must be routed through the applicable current authority and, for a new or materially changed encounter, through `learner-encounter-production-process.md`.

Implementation must not absorb such a decision as a local coding choice.

### 3.5 New or materially changed encounter

A new Lesson or a change that reopens capability, prerequisite, learner-state, case, evidence, or material journey justification begins from the current accepted course state through `learner-encounter-production-process.md`.

Existing historical designs or runtime code may be evidence or candidate material only; their existence does not authorize the encounter.

## 4. Promotion-to-main contract

A task branch may be promoted into `main` only when all conditions relevant to that change are satisfied:

1. the exact starting baseline is known;
2. the change has a bounded declared scope;
3. the applicable current authority has been identified;
4. material accepted decisions needed by implementation are durable in current authority before Build relies on them;
5. the actual resulting diff has been reviewed, not only an agent summary;
6. required validation for the change impact has been completed;
7. accepted behavior outside the authorized change has been preserved where materially exposed;
8. no unresolved material deviation, authority conflict, or implementation-affecting OPEN matter is being hidden by the promotion;
9. validation evidence and durable decisions needed to support the acceptance claim have been recorded at the level required by the current production process;
10. the branch can be promoted without inventing an unauthorized reconciliation strategy.

The mechanics of branch ownership, synchronization, fast-forwarding, review branches, and Git safety remain governed by `agent-assisted-work-protocol.md` and `chatgpt-git-safety.md`.

This contract does not require every change to run the same validation suite. Validation must be proportionate to actual impact.

## 5. Product-state vocabulary

These states must not be treated as interchangeable.

### `IMPLEMENTED`

The behavior exists in code/runtime.

This says nothing by itself about authority conformance, pedagogy, UX quality, validation, or acceptance.

### `VALIDATED TO SCOPE`

Validation appropriate to the declared scope and impact has established that the implementation satisfies its current authority and acceptance evidence to that scope.

This does not mean learner mastery, cumulative course validation, or release readiness.

### `ACCEPTED PRODUCT BASELINE`

The implementation has been accepted as the current product behavior that future work must preserve unless a later authorized change modifies it.

An accepted product baseline may contain only part of the eventual course.

### `COURSE-LEVEL VALIDATED / RELEASE READY`

A separate broader claim requiring the applicable cumulative progression, prerequisite, transfer, regression, exit-criteria coverage, accessibility/responsive/browser, and other release-level evidence required by current management and authority.

Encounter-level acceptance alone cannot establish this state.

## 6. Lesson 3 entry gate

Lesson 3 work must begin from:

- the accepted Lessons 1–2 product baseline;
- the current canonical repository state;
- current authority defined by `source-of-truth-hierarchy.md`;
- a freshly established capability gap / learner need and bounded course-assumed learner state under `learner-encounter-production-process.md`.

The preserved files under `course-design/stage-3/`, older Lesson/Stage 3 runtime material, and the Lesson 3 rebaseline dry-run design are candidate/history only.

They may be reconsidered, compared, or reused only after fresh evaluation through the current process. They must not be treated as the default design, sequence, case, or implementation authority merely because they already exist.

Before Lesson 3 implementation begins, its material accepted design decisions must exist in the appropriate current Lesson/domain authority and its implementation boundary must be sufficiently clear that Build does not need to invent pedagogy, evidence, controls, or other governed behavior.

No separate role-permitted-next execution mapping is required unless later coordination evidence establishes a need for one.

## 7. What v1 deliberately does not require

Production Contract v1 does not introduce:

- a mandatory CI platform;
- a new automated test suite;
- one universal validation command for every change;
- a mandatory permanent role/agent topology;
- a fixed number of design or post-build reviewers;
- a universal artifact-per-handoff scheme;
- a new Lesson template;
- a duplicate acceptance process.

The current repository exposes `dev`, `build`, and `preview` scripts but no general automated test suite. Validation requirements therefore remain impact-based unless future accepted infrastructure expands them.

## 8. Maintenance rule

Change this contract only when a cross-project product/repository invariant changes.

Do not copy Lesson-specific pedagogy, process steps, Git commands, or implementation details into this file.

When this contract, authority sources, and implementation appear to disagree:

1. identify the decision domain under `source-of-truth-hierarchy.md`;
2. determine whether the issue is authority, implementation, validation, or management state;
3. use the governing process/change-impact route;
4. do not silently make the runtime or the newest document win.
