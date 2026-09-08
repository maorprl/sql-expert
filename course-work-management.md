# Course Work Management

**Epic:** Course Build  
**Status:** WORKING  
**Role:** Central work-management document

This document manages the work of designing, implementing, and validating the course.

It is not a pedagogical or course-design source of truth. Pedagogical, visual, Stage, schema, and data decisions remain in their dedicated source documents.

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
- validation to its current scope.

It has also undergone a learner test-drive.

The learner test-drive is:

REFERENCE ONLY / NON-AUTHORITATIVE

Stage 1 should therefore be treated as:

designed and implemented to its current approved scope

—not as a claim that every possible Stage 1 implementation decision is permanently resolved.

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

### Current Focus — Stabilize Stage 1

Before extending the course, close the currently established implementation / UX gaps in the existing Stage 1 experience.

The Stage 1 visual-language implementation audit is complete. It confirmed two implementation gaps:

- overall surface hierarchy / atmosphere;
- SQL workspace dominance / instructional separation.

### 5.1 Visual implementation gap

**Workstream:** Visual Implementation  
**Classification:** Implementation gap  
**Source:** Stage 1 test-drive evidence + `course-design/course-visual-language.md`

Implement the confirmed surface hierarchy / atmosphere gap using the established course visual language.

Current observed scope:

- general learner flow;
- Working Schema;
- Concept Moments;
- SQL implementation.

This work should implement the existing visual direction, not redefine it.

#### Complete when

- confirmed implementation deviations from `course-visual-language.md` have been addressed, or a deliberate exception has been explicitly preserved;
- no new visual-language principle has been introduced implicitly through implementation;
- the affected learner flow, Working Schema, Concept Moments, and SQL workspace have been checked after the changes.

### 5.2 SQL workspace usability

**Workstream:** UX / Shared Infrastructure  
**Classification:** UX / shared-infrastructure work  
**Source:** Stage 1 test-drive evidence

Current evidence indicates that:

- the SQL editor can become visually dominant;
- learner control over workspace height is limited;
- scrolling can separate current instruction from active SQL work and results.

No specific implementation solution is established.

Resize behavior, layout changes, or another solution should not be assumed in advance.

#### Complete when

- the issue has been examined in a representative learner flow;
- the learner can move practically between instruction, query editing, execution, and results;
- the SQL workspace does not dominate the task in a way that materially interferes with that flow;
- the solution does not depend on a predetermined layout mechanism;
- shared SQL / interaction behavior remains intact.

### 5.3 Stage 1 validation

**Workstream:** Validation / Testing

After the affected Stage 1 changes:

- re-test the relevant learner flow;
- verify that the targeted visual and workspace problems were actually improved;
- verify no regression in Stage progression;
- verify shared CURRENT / COMPLETED lifecycle behavior;
- verify Working Schema;
- verify Concept Moments;
- verify SQL execution and semantic validation;
- verify successful completion behavior.

#### Complete when

- a new validation record exists;
- the affected behaviors have been checked;
- remaining findings are clearly distinguished as blocking, non-blocking, or Later Review;
- regressions are recorded;
- no unresolved blocking Stage 1 stabilization issue remains;
- it is explicit whether the project can proceed to the next capability-planning gate.

## 6. Next Planning Gate

After Stage 1 stabilization, do not automatically build a unit called “Stage 2”.

The next planning activity is to determine the next required learner capability.

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

The recently added:

WORKING — Guided reasoning progression

is one example for which operationalization may be useful.

The broader review is intentionally not part of the current Stage 1 execution sequence.

### 7.2 Future Course Development

After the next capability-planning gate:

- design the required learner encounter;
- implement it;
- validate it;
- update capability coverage;
- reassess remaining exit-criteria gaps;
- repeat as needed.

The final number of Stages remains OPEN.

### 7.3 Preserved Stage 3 material

Evaluate the preserved `funding_round → company` material only when it becomes relevant to the capability currently being designed.

Do not adopt it merely because it already exists or because it is stored under `stage-3`.

### 7.4 Stage 1 unresolved implementation decisions

Current OPEN implementation decisions include:

- exact relation-selection UI;
- controls and relation-removal behavior;
- exact prepared-baseline presentation;
- hint escalation;
- solution reveal;
- technical semantic-checking mechanism.

These should be resolved when they become necessary to current work.

They should not all be forced into the Active Plan merely because they remain OPEN.

### 7.5 Conditional management split

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

The following are preserved for later inspection and are not confirmed problems:

- Step 6 success feedback may be over-explained;
- Step 8 output requirements are visible by default;
- whether `news_article.title` and `news_source.name` make article grain sufficiently inspectable;
- whether baseline and JOIN statements should remain in the same editor.

A Later Review item moves into actual work only when relevant evidence, required capability coverage, related implementation work, or validation makes its resolution necessary.

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
- executable schema and seed data.

### Stage 1

Current `news_article → news_source` Stage 1:

- designed to its current approved scope;
- implemented to its current approved scope;
- learner test-driven.

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

No regression was observed in the affected Stage 1 flow.

### Stage 1 test-drive classification

`d97de92`

Stage 1 learner test-drive findings documented and classifications corrected.

The record remains:

REFERENCE ONLY / NON-AUTHORITATIVE

### Stage 1 visual-language implementation audit

Completed. The audit is recorded in:

`course-design/audits/stage-1-visual-language-audit-2026-09-08.md`

It confirmed the overall surface hierarchy / atmosphere gap and the SQL workspace dominance / instructional separation gap.

### Guided reasoning progression

`08ddd13`

Added:

WORKING — Guided reasoning progression

to:

`pedagogical-foundations.md`

Its broader operationalization remains future work.

### Database readiness

Startup-ecosystem schema readiness audit:

PASS

## 12. Current Sources

### Course-level

- `course-exit-criteria.md`
- `course-knowledge-map.md`
- `pedagogical-foundations.md`
- `course-design/course-visual-language.md`

### Stage 1

- `course-design/stage-1/stage-1-learner-route.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`

### Preserved source material

- `course-design/stage-3/stage-3-learner-route.md`
- `course-design/stage-3/stage-3-interaction-decisions.md`

### Evidence

- `course-design/test-drives/stage-1-test-drive-2026-09-08.md`
  - REFERENCE ONLY
  - NON-AUTHORITATIVE

### Data

- `startup-ecosystem/startup-ecosystem-schema.sql`
- `startup-ecosystem/startup-ecosystem-seed.sql`

## 13. Immediate Next Action

### Current execution sequence

1. **Implement the confirmed surface hierarchy / atmosphere gap.**
2. Address the confirmed SQL workspace dominance / instructional separation gap.
3. Run Stage 1 regression and learner-flow validation.
4. Record the validation evidence and classify remaining findings appropriately.
5. If no blocking Stage 1 stabilization issue remains, run the next-capability planning gate.

The next course unit is selected because it develops the next required learner capability — not because a Stage number is available.
