# Course Work Management

**Epic:** Course Build  
**Status:** WORKING  
**Role:** Central work-management document

This document manages the work of designing, implementing, and validating the course.

It is not a pedagogical or course-design source of truth. Pedagogical, visual, Stage, schema, and data decisions remain in their dedicated source documents.

Execution and agent-coordination rules are maintained separately in:

`agent-assisted-work-protocol.md`

## 1. Project Goal

Build a complete Relational Reasoning + SQL course that enables learners to demonstrate the capabilities defined in:

`course-exit-criteria.md`

while respecting the knowledge dependencies established in:

`course-knowledge-map.md`

and the current pedagogical foundations established in:

`pedagogical-foundations.md`

The number, boundaries, labels, and sequence of Stages are not predetermined.

## 2. Project Definition of Done

The project is complete when:

- every required learner capability in `course-exit-criteria.md` is mapped to one or more implemented learner encounters;
- the progression of those encounters addresses the necessary dependencies established in `course-knowledge-map.md`;
- every required learner encounter has an established design basis in the relevant current-source documents;
- every required learner encounter has been implemented;
- every required exit capability has identified validation evidence showing that the intended relational reasoning and SQL capability can be exercised;
- the course has been validated both:
  - at the level of individual learner encounters;
  - as a cumulative progression across encounters;
- relevant course-level pedagogical and visual decisions are reflected in observable implementation behavior where required;
- no unresolved blocking implementation or validation issue prevents a required capability from being demonstrated;
- no unresolved course-level decision remains that prevents the exit criteria from being satisfied;
- capability coverage contains no unexplained required-capability gap.

Completion is not defined by reaching Stage 2, Stage 3, or any fixed Stage number.

## 3. Capability Coverage

Maintain a lightweight management view connecting:

exit criterion → required capability → prerequisites → learner encounter(s) → implementation → validation evidence → remaining gap

Its purpose is traceability: to show whether the course is actually progressing toward its exit criteria.

It must not:

- redefine the exit criteria;
- invent pedagogical requirements;
- override the knowledge map;
- treat implementation presence as evidence of learner capability;
- mark a required capability complete without identified validation evidence.

Coverage should be reassessed after validated learner encounters and before the course is declared complete.

For now, this coverage view should remain inside this management layer.

If it becomes too large or difficult to maintain here, splitting it into a dedicated coverage artifact is a conditional Backlog item.

## 4. Current Position

### Course level

Current source documents exist for:

- exit criteria;
- knowledge and dependency mapping;
- pedagogical foundations;
- visual language;
- global course controls;
- schema and seed data.

Still OPEN at course level:

- broader initial schema exposure;
- Stage structure beyond current Stage 1;
- overall course progression.

### Stage 1

Current Stage 1:

`news_article → news_source`

Stage 1 is currently the only Stage with:

- a current learner route;
- supporting interaction decisions;
- a working implementation;
- targeted runtime validation evidence to its current scope.

The current Stage 1 flow now includes:

- meaning-first relation and relationship reasoning;
- delayed PK/FK and Cardinality reveal;
- requested-result Grain before Baseline/prediction;
- a prepared Baseline measurement as a tool rather than a syntax exercise;
- explicit prediction from the established premises;
- semantic action before JOIN terminology;
- progressive JOIN teaching across three beats;
- a clean learner-authored JOIN workspace;
- `title | source_name` as the output contract;
- result inspection followed by evidence-local final verification.

The latest targeted validation found the corrected Stage 1 experience acceptable to the current scope. No known Stage 1 issue is currently classified as blocking continued course planning.

This does **not** claim a complete cross-browser, accessibility, or full-regression certification. Those remain broader validation concerns rather than an active Stage 1 design blocker.

Global `Back`, `Retry / Redo`, and `Show solution` are course-level controls. Their established roles are authoritative; unresolved semantics and shell details remain in Backlog and are not current Stage 1 blockers.

### Stage 2

Current repository state:

- no Stage 2 design documents;
- no Stage 2 implementation.

This does not establish that the next required course unit must necessarily be called Stage 2.

### Stage 3

Preserved calibrated source material exists for:

`funding_round → company`

Files:

- `course-design/stage-3/stage-3-learner-route.md`
- `course-design/stage-3/stage-3-interaction-decisions.md`

These are explicitly not the final Stage 3 design.

Their existence does not establish:

- final Stage order;
- final Stage 3 scope;
- overall course progression;
- project completion after Stage 3.

## 5. Active Plan

### Current Focus — Stage 1 stabilization closed to current scope

The Stage 1 stabilization workstream is complete to the current approved and validated scope.

The latest correction/promotion pass consolidated the validated implementation onto current authority rather than carrying forward temporary correction layers.

### 5.1 Completed Stage 1 stabilization

**Workstream:** Stage 1 authority → implementation → targeted runtime validation  
**Status:** COMPLETED TO CURRENT SCOPE

Completed and validated in the current Stage 1 experience:

- current task remains the first scan path while Completed Steps stay reviewable but secondary;
- teacher guidance has a recognizable instructional role distinct from system/status text and Concept Moments;
- the relationship connector represents the actual established FK/PK fields;
- Cardinality notation is integrated into the relationship representation;
- Baseline action, evidence, and interpretation remain locally connected;
- Prediction visibly carries both premises: 18 starting article rows and one matching source per article;
- semantic action remains before JOIN terminology;
- JOIN teaching progresses through row matching → `ON` → whole-query mapping;
- SQL authoring keeps task, editor, and Working Schema in one coherent workspace;
- Desired Output and SQL Structure remain optional local scaffolds;
- `source_name` is enforced as the publishing-source output name;
- successful SQL execution does not pre-announce the final relational conclusion;
- final verification remains adjacent to actual result evidence;
- Stage completion follows explicit verification.

The temporary `stage1-corrections` / `stage1-validation-pass` layering was not promoted as separate runtime layers. The validated behavior is consolidated into the current Stage 1 implementation.

The Stage-local `Show solution` disclosure was also not promoted because current course authority establishes `Show solution` as a global course control.

### 5.2 Validation status

**Workstream:** Validation / Testing  
**Status:** TARGETED MANUAL VALIDATION PASSED FOR CURRENT SCOPE

The latest manual test drive covered the states changed by the correction pass and found the remaining Stage 1 experience acceptable to the current scope.

This is sufficient to close the present Stage 1 stabilization workstream.

It is not equivalent to a future full regression suite. Broader validation should still occur when the course has a meaningful multi-encounter progression or before release-level completion claims.

### 5.3 Course controls deferred to Backlog

**Workstream:** UX / Shared Course Infrastructure  
**Status:** ESTABLISHED ROLES; SEMANTICS / SHELL DETAILS BACKLOGGED

Course-level authority now establishes these persistent controls:

- Back;
- Retry / Redo;
- Show solution.

Do not implement unresolved semantics as Stage-local guesses. Resolve the relevant Backlog item when actual course-shell implementation requires it.

## 6. Next Planning Gate

Do not automatically build a unit called “Stage 2”.

The next course-planning activity is to determine the next required learner capability.

Use:

- `course-exit-criteria.md`
- `course-knowledge-map.md`
- `pedagogical-foundations.md`
- current capability coverage
- capabilities already established through validated learner encounters

Determine:

- what new reasoning capability is required;
- which exit criterion or criteria require it;
- whether it is already sufficiently covered;
- what genuine prerequisites it requires;
- which prerequisites are already available;
- what remains missing;
- what learner evidence would demonstrate the capability;
- whether a new learner encounter is actually required;
- whether preserved source material is relevant;
- which OPEN decisions, if any, genuinely need resolution before design can proceed.

The output should be a short capability decision, sufficient to establish whether the next learner encounter should be designed.

Possible conclusions may include:

- proceed with the next encounter;
- prerequisite work is required first;
- a current-source decision is required first;
- no new encounter is required because the capability is already sufficiently covered.

Only after that decision should the next learner route, encounter boundaries, working identifier, and place in the progression be established.

## 7. Backlog

### 7.1 Pedagogy — Course-level operationalization

**Scope:** Course-wide

Review current pedagogical decisions and identify which lack sufficient:

- operational meaning;
- observable criteria;
- implementation-checkable expectations.

The intended bridge is:

pedagogical decision → operational meaning → observable evidence → implementation

The purpose is to make it possible to evaluate whether an implementation satisfies an established pedagogical decision without turning the principle itself into a rigid UI template.

This work must not:

- invent new pedagogical principles;
- silently resolve OPEN questions;
- convert interpretation into requirement;
- establish universal interaction patterns without evidence.

The broader review is intentionally not automatic implementation work.

### 7.2 Teacher voice / supported reasoning experience

**Status:** RESOLVED FOR CURRENT STAGE 1 CALIBRATION

The current Stage 1 treatment is acceptable to the validated scope and is no longer an active workstream.

Future encounters should reuse the established visual role without assuming that Stage 1 wording or exact component styling is automatically universal.

### 7.3 JOIN instructional experience

**Status:** RESOLVED FOR CURRENT FIRST-JOIN ENCOUNTER

The current Stage 1 first-JOIN encounter now contains the accepted progressive teaching sequence:

1. row matching;
2. established relationship → `ON`;
3. business request / reasoning → whole query.

Future JOIN encounters should not automatically repeat the full first-exposure scaffolding.

### 7.4 Stage 1 final verification

**Status:** RESOLVED FOR CURRENT STAGE 1

The learner verifies the returned result against the earlier row-count prediction and requested-result Grain while actual result evidence remains available.

No active redesign is currently required.

### 7.5 SQL workspace role adaptation / instructional continuity

**Status:** RESOLVED FOR CURRENT STAGE 1 SCOPE

The current implementation separates the compact Baseline measurement role from learner-authored JOIN implementation and clears Baseline editor/result state before independent implementation.

Task, editor, relevant Working Schema reference, and result evidence change prominence according to the learner's current action.

No current Stage 1 workstream is open here.

### 7.6 Reasoning/storyboard visual hierarchy

**Status:** RESOLVED FOR CURRENT STAGE 1 CALIBRATION

The current task remains the first scan path, Completed Steps move to a secondary review role, and tool/reference surfaces change prominence according to the active learner task.

Future stages may expose new composition problems; this item should be reopened only from new evidence rather than carried forward as an assumed defect.

### 7.7 Stage 1 unresolved implementation decisions

Current non-blocking OPEN implementation decisions include:

- exact future refinement of relation-selection UI and relation-removal behavior;
- hint escalation;
- technical semantic-checking mechanism beyond the current Stage 1 implementation.

These should be resolved only when they become necessary to current work.

They should not be forced into the Active Plan merely because they remain OPEN.

### 7.8 Course-level controls — unresolved semantics and shell details

**Workstream:** UX / Shared Course Infrastructure  
**Status:** BACKLOG — DECISIONS NOT YET MADE

Authority for the established global control roles is in:

`course-design/course-controls.md`

The following remain undecided and should be resolved only when implementation requires them.

**Show solution:**

- the visual surface in which the revealed solution appears;
- whether the solution remains open while the learner continues working;
- how solution availability is represented when a task has no meaningful single solution;
- whether revealing a solution affects later assessment, analytics, or progress metadata.

**Back:**

- whether Back restores the exact previous interaction state;
- whether completed evidence is preserved or rolled back;
- whether opened hints or revealed solutions are preserved;
- whether editor contents or produced results are preserved;
- whether Back can cross Concept Moments, execution states, episode boundaries, or Stage boundaries.

**Retry / Redo:**

- whether Retry / Redo applies to the current task, a completed task, or both;
- what happens to prior evidence, selected answers, hints, revealed solutions, SQL text, query results, Concept Moment visibility, and downstream completed work;
- whether retrying earlier work invalidates later work.

**Global control shell and future course-level behavior:**

- exact placement, responsive treatment, labels, icons, grouping, keyboard shortcuts, and mobile behavior;
- whether there is a global hint system;
- whether there is a global forward / Next control;
- exact undo / branching semantics;
- how progress is stored across sessions;
- how global controls behave across future Stage types that have not yet been designed.

These backlog items are management state, not design authority. Implementation must not silently resolve them.

### 7.9 Implementation cleanup

**Classification:** Non-pedagogical hygiene

The temporary Stage 1 correction/validation layers have been consolidated into the current implementation.

Any future cleanup item should be recorded from concrete evidence rather than retained merely because an older implementation once contained it.

### 7.10 Future Course Development

After the next capability-planning gate:

- design the required learner encounter;
- implement it;
- validate it;
- update capability coverage;
- reassess remaining exit-criteria gaps;
- repeat as needed.

The final number of Stages remains OPEN.

### 7.11 Preserved Stage 3 material

Evaluate the preserved `funding_round → company` material only when it becomes relevant to the capability currently being designed.

Do not adopt it merely because it already exists or because it is stored under `stage-3`.

### 7.12 Conditional management split

If the capability-coverage view becomes too large or difficult to maintain inside this document:

- split it into a dedicated coverage artifact;
- keep this document as the central work-management entry point;
- preserve references rather than duplicate coverage state.

This is conditional work, not a current requirement.

## 8. Course-Level Open Decisions

The following remain explicitly OPEN:

- broader initial schema exposure;
- Stage structure beyond current Stage 1;
- overall course progression.

These decisions should be resolved only when the course-design process genuinely requires resolution.

Implementation must not silently decide them.

## 9. Later Review

A Later Review item should move into actual work only when relevant evidence, required capability coverage, related implementation work, or validation makes its resolution necessary.

No current Later Review item is treated as a Stage 1 blocker.

## 10. Course-Level Validation

Individual learner-encounter validation is not sufficient to establish that the full course works as a progression.

Once a meaningful sequence of learner encounters exists, course-level validation should include:

- progression validation;
- prerequisite validation;
- cross-Stage regression;
- exit-criteria coverage review;
- checking for dependence on knowledge that has not been appropriately introduced or developed;
- checking whether cumulative learning supports the required independent performance.

This is not current execution work, but it is required before the project can satisfy its Definition of Done.

## 11. Done / Verified Milestones

### Course foundations

Current course-level sources established for:

- exit criteria;
- knowledge map;
- pedagogical foundations;
- visual language;
- global course controls;
- executable schema and seed data.

### Shared interaction lifecycle

`4c779cd`

Shared CURRENT / COMPLETED interaction lifecycle extracted into:

`src/interaction-lifecycle.js`

and manually verified.

### Completed-interaction behavior

Resolved and verified:

- completed interactions compact by default;
- still reviewable;
- deliberately opened review state preserved.

### Stage 1 test-drive classification

`d97de92`

Earlier Stage 1 learner test-drive findings documented and classifications corrected.

The record remains:

REFERENCE ONLY / NON-AUTHORITATIVE

### Stage 1 visual-language implementation audit

Completed. The audit is recorded in:

`course-design/audits/stage-1-visual-language-audit-2026-09-08.md`

### Guided reasoning progression

`08ddd13`

Added:

WORKING — Guided reasoning progression

to:

`pedagogical-foundations.md`

Its broader operationalization remains future work.

### Stage 1 stabilization and validated promotion

The Stage 1 learner flow, JOIN teaching climax, authoring workspace, prediction premises, teacher-guidance treatment, relationship/Cardinality visual, and final verification were stabilized through iterative manual test drives.

The validated behavior has been consolidated into the current implementation rather than retained as temporary correction layers.

### Agent-assisted work protocol

`agent-assisted-work-protocol.md`

Documents task allocation, handoff/review gates, remote/local synchronization, branch ownership, active-work write locks, and promotion after review.

### Database readiness

Startup-ecosystem schema readiness audit:

PASS

## 12. Current Sources

### Course-level

- `course-exit-criteria.md`
- `course-knowledge-map.md`
- `pedagogical-foundations.md`
- `course-design/course-visual-language.md`
- `course-design/course-controls.md`

### Stage 1 authority

- `course-design/stage-1/stage-1-learner-route.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`

### Execution / coordination

- `agent-assisted-work-protocol.md`

### Preserved source material

- `course-design/stage-3/stage-3-learner-route.md`
- `course-design/stage-3/stage-3-interaction-decisions.md`

### Evidence

- `course-design/test-drives/stage-1-test-drive-2026-09-08.md`
  - REFERENCE ONLY
  - NON-AUTHORITATIVE
- `course-design/test-drives/stage-1-manual-test-drive-findings-2026-09-10.md`
  - REFERENCE ONLY
  - NON-AUTHORITATIVE
- `course-design/test-drives/stage-1-targeted-test-drive-2026-09-10.md`
  - REFERENCE ONLY
  - NON-AUTHORITATIVE
- `course-design/audits/stage-1-instructional-experience-audit-2026-09-08.md`
  - REFERENCE / IMPLEMENTATION-EXPERIENCE AUDIT
  - NOT A DESIGN AUTHORITY

### Data

- `startup-ecosystem/startup-ecosystem-schema.sql`
- `startup-ecosystem/startup-ecosystem-seed.sql`

## 13. Immediate Next Action

### Next-capability planning gate

Stage 1 has no known blocking stabilization issue at the current scope.

Do not begin another Stage 1 implementation pass by default, and do not automatically build a unit called “Stage 2”.

Determine the next required learner capability using the current exit criteria, knowledge map, pedagogical foundations, capability coverage, and capabilities already established by Stage 1.

Only after that capability decision should a new learner encounter be designed or preserved material be considered for reuse.
