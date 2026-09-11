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
- validation evidence to its current scope.

Recent authority and implementation work changed two parts of the learner flow:

- requested-result Grain now occurs after relationship/cardinality reasoning and before Baseline/prediction;
- the learner-facing SQL Workspace first appears at the Baseline and persists into later SQL implementation.

Implementation commit:

`2a4cada663b783621a5831e6c96255d511fff9fb`

A targeted browser test drive on 2026-09-10 confirmed the core behavior of both changes and surfaced additional Stage 1 instructional/UX findings.

Test-drive records are:

REFERENCE ONLY / NON-AUTHORITATIVE

Stage 1 should therefore be treated as:

designed and implemented to its current approved scope, with further stabilization work still open

—not as a claim that every Stage 1 instructional or UX decision is resolved.

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

### Current Focus — Stabilize Stage 1 before extending the course

The prior execution plan named shared guided-reasoning lifecycle capability definition as the immediate next action. Work subsequently diverged from that sequence because unresolved Stage 1 authority/implementation mismatches in Grain placement and Baseline workspace continuity were identified and resolved first.

That divergence is now reconciled here rather than treating the superseded sequence as still current.

The completed targeted implementation and test drive established a stronger baseline for deciding the next Stage 1 stabilization workstream.

### 5.1 Recently completed Stage 1 correction pass

**Workstream:** Stage 1 authority → implementation alignment  
**Status:** COMPLETED TO TARGETED SCOPE

Completed:

- relocated requested-result Grain to the accepted post-cardinality position;
- removed the relation-card Grain presentation that risked implying `Grain = table`;
- restored the persistent learner-facing SQL Workspace beginning at Baseline;
- preserved that same workspace into prediction, semantic action, and JOIN implementation;
- validated the changed flow in a manual browser test drive.

Targeted validation passed:

- relation selection → connecting key without premature Grain;
- delayed PK/FK reveal;
- cardinality before result Grain;
- result Grain before Baseline;
- prepared `COUNT(*)` in the real SQL Workspace;
- Grain → 18 starting articles → one matching source each → 18 result rows reasoning chain;
- semantic relational action before JOIN vocabulary;
- persistence of the same SQL workspace into JOIN implementation.

### 5.2 Stage 1 stabilization findings to triage

**Workstream:** Pedagogy / UX / Instructional Experience  
**Status:** ACTIVE — PRIORITIZATION REQUIRED BEFORE MORE IMPLEMENTATION

The 2026-09-10 targeted test drive surfaced the following confirmed findings:

- Baseline asks the learner to run the prepared query while the `Run query` control may be outside the current viewport;
- Baseline success copy explains relation-row meaning but does not fully express why the 18-row measurement is the baseline for requested-result Grain preservation;
- the persistent SQL workspace still contains the Baseline query/result when JOIN implementation begins, so the role transition from measurement to learner-authored implementation is weak;
- the reasoning/storyboard column is too narrow relative to the SQL workspace, creating a compressed and visually subordinate guided-reasoning experience;
- the teacher voice remains too formal and abstraction-heavy for the intended supported-learning experience; the issue is not reduced rigor but insufficient conversational guidance, contextual bridging, and cognitive-load reduction;
- JOIN instructional experience remains a known major design gap from earlier evidence;
- final Grain verification remains a known unresolved instructional problem from earlier evidence.

Do not treat this list as permission for independent micro-fixes. Select a coherent workstream before implementation.

### 5.3 Stage 1 broader validation

**Workstream:** Validation / Testing  
**Status:** PENDING AFTER NEXT STABILIZATION PASS

A targeted test drive is not equivalent to full Stage 1 regression.

After the next selected stabilization workstream is resolved and implemented:

- run full Stage 1 regression and learner-flow validation;
- verify no regression in Stage progression;
- verify shared CURRENT / COMPLETED lifecycle behavior;
- verify Working Schema;
- verify Concept Moments;
- verify SQL execution and semantic validation;
- verify successful completion behavior;
- record remaining findings as blocking, non-blocking, or Later Review.

## 6. Next Planning Gate

After Stage 1 stabilization, do not automatically build a unit called “Stage 2”.

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

The recently added:

WORKING — Guided reasoning progression

is one example for which operationalization may be useful.

The broader review is intentionally not automatic implementation work.

### 7.2 Teacher voice / supported reasoning experience

**Workstream:** Pedagogy / Instructional Experience  
**Status:** CONFIRMED FINDING — CANDIDATE NEXT WORKSTREAM

The learner experience is more coherent than earlier versions, but the teacher voice still assumes a relatively high level of abstraction and self-orientation.

The target is not to lower rigor or simplify the relational ideas. The unresolved problem is how to provide stronger conversational guidance, contextual bridging, and cognitive-load reduction while preserving learner reasoning.

This should be handled as an instructional-experience problem rather than as a batch of isolated copy edits.

### 7.3 JOIN instructional experience

**Workstream:** Pedagogy / Instructional Design  
**Status:** CONFIRMED MAJOR GAP — CANDIDATE NEXT WORKSTREAM

Known unresolved areas include:

- making the established Working Schema relationship active in JOIN teaching;
- showing how the already-understood relationship becomes `INNER JOIN ... ON ...`;
- providing a concrete row-level combination explanation without turning the result grid into the JOIN visual;
- using the persistent SQL workspace as implementation of prior reasoning rather than as a separate syntax event.

No final design is selected here.

### 7.4 Stage 1 final verification

**Workstream:** Pedagogy / Assessment-transition design  
**Status:** OPEN / KNOWN PROBLEM

Final Grain verification remains required but the current implementation is leading and weak as an independent verification experience.

Do not redesign it as a side effect of unrelated work.

### 7.5 SQL workspace role adaptation / instructional continuity

**Workstream:** UX / Shared Infrastructure  
**Classification:** UX / shared-infrastructure work  
**Status:** PARTIALLY IMPROVED — CONFIRMED FINDINGS REMAIN

The SQL workspace now correctly begins at the Baseline and persists into later SQL implementation.

Remaining observed issues:

- Baseline execution control may not be locally visible in the learner viewport;
- the workspace can still feel too dominant for the compact measurement task;
- Baseline query/result state remains visible when JOIN implementation begins;
- the transition between measurement role and learner-authored implementation role is not yet sufficiently clear.

No specific future solution is selected.

### 7.6 Reasoning/storyboard visual hierarchy

**Workstream:** UX / Visual Experience  
**Status:** CONFIRMED FINDING

The reasoning/storyboard column is too narrow relative to the SQL workspace in the tested JOIN state. This creates excessive text wrapping, tall cards, and the impression that guided reasoning is a subordinate side panel.

Treat this as a hierarchy/cognitive-load issue, not merely a heading-wrap bug.

### 7.7 Stage 1 unresolved implementation decisions

Current OPEN implementation decisions include:

- exact relation-selection UI;
- controls and relation-removal behavior;
- exact prepared-baseline sizing/placement;
- exact persistent-workspace role transition behavior;
- hint escalation;
- technical semantic-checking mechanism.

These should be resolved when they become necessary to current work.

They should not all be forced into the Active Plan merely because they remain OPEN.

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

Known cleanup items include:

- unused legacy Grain CSS selectors left after removal of the relation-card Grain marker;
- stale Working Schema status copy associated with the relocated result-Grain interaction.

These are not current pedagogical blockers and should not determine workstream priority.

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

The following are preserved for later inspection and are not independently prioritized problems:

- Step 6 success feedback may be over-explained;
- JOIN output requirements are visible by default;
- whether `news_article.title` and `news_source.name` make article grain sufficiently inspectable.

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

### Stage 1 result-Grain + persistent Baseline workspace

`2a4cada663b783621a5831e6c96255d511fff9fb`

Implemented the accepted sequencing and persistent SQL workspace behavior.

Targeted manual browser validation recorded in:

`course-design/test-drives/stage-1-targeted-test-drive-2026-09-10.md`

Core scoped behavior passed; additional UX and instructional findings remain open.

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

### Stage 1 stabilization prioritization gate

Do not begin another implementation pass yet.

Choose the next coherent Stage 1 stabilization workstream using current authority and accumulated validation evidence.

The two leading candidates are:

1. **teacher voice / supported guided-reasoning experience**, including the narrow storyboard / cognitive-load interaction where relevant;
2. **JOIN instructional experience**, including how established relational reasoning becomes JOIN/ON implementation.

Determine which is the more upstream constraint on the learner experience and whether resolving it first would materially change the other workstream.

Do not reduce this decision to a list of isolated copy or CSS fixes.

Once the next workstream is selected:

1. resolve any necessary design/authority decisions;
2. record accepted decisions in current authority;
3. perform one bounded implementation pass;
4. review the actual diff;
5. validate the learner experience;
6. update this management state.

Only after Stage 1 stabilization has no unresolved blocking issue should the project run the next-capability planning gate for course expansion.
