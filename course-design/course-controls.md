# Course Controls

## Status

WORKING

This document defines course-level learner controls and establishes where course-wide controls end and task-local assistance begins.

It is intentionally narrow. It does not define the broader Lesson sequence, hint policy, or persistence model.

When this document conflicts with a Lesson-local placement decision for a control covered here, the current course-level decision here takes precedence.

---

## 1. Inter-Lesson navigation

The current accepted runnable journey contains Course 4 / Lesson 1 and Course 4 / Lesson 2. Navigation between them uses lightweight **Previous** / **Next** controls in the course masthead, adjacent to Lesson/progress orientation and visually separate from pedagogical actions such as `Check answer`, `Continue`, and `Run query`.

Navigation reads the existing progression state; it does not create a second unlock model, mark evidence complete, fabricate learner evidence, or reset an available Lesson merely because the learner navigates.

For the accepted Course 4 Lessons 1–2 journey:

- Course 4 / Lesson 1 has no usable Previous control;
- Course 4 / Lesson 1 Next is unavailable until the existing Course 4 / Lesson 1 completion progression authorizes Course 4 / Lesson 2;
- after Course 4 / Lesson 1 completion, Next opens Course 4 / Lesson 2;
- Course 4 / Lesson 2 Previous returns to the already available Course 4 / Lesson 1;
- returning between available Lessons preserves their established in-memory learner state;
- Course 4 / Lesson 2 has no usable Next because no Course 4 / Lesson 3 is currently accepted.

This document does not require unrestricted chapter switching, a three-chapter selector, or navigation to an unapproved future Lesson.

### Navigation naming consistency

Learner-facing sequence labels use the canonical **Course / Lesson** identity. Historical artifacts retain the naming they originally used.

A Lesson/order identifier and a descriptive encounter title are different label roles. Navigation should apply those roles consistently across the accepted Lessons.

The exact descriptive titles remain an implementation/content decision, but the naming role must be consistent.

### OPEN — broader persistence

The accepted runtime preserves each available Lesson's state while navigating during the current runtime session. This does not establish a general course-wide persistence contract across reloads, browser sessions, or future Lesson types.

Implementation should avoid inventing broader persistence semantics beyond what the current runtime can safely preserve.

---

## 2. Global control layer

Other controls that manage navigation or learner actions across the course should be presented as a stable course-level layer rather than re-created as local content inside individual tasks.

At the current point in the design, this layer includes the inter-Lesson Previous / Next navigation established above. Retry / Redo remains an unresolved need with unresolved reset semantics.

These controls are distinct from local task actions such as `Check answer`, `Run query`, `Continue`, `Desired Output`, `SQL Structure`, or `Show solution`.

The exact responsive treatment, labels, icons, and grouping remain implementation decisions, but available controls should have a consistent role and predictable location across Lessons.

## 3. Show solution — SQL-workspace assistance

`Show solution` is **not a global course-shell control**.

It is local assistance for a concrete SQL authoring task and belongs inside the active **SQL Workspace / SQL editor surface**.

### Placement and availability

`Show solution` should:

- appear only when the learner has reached an active SQL authoring task for which a concrete SQL solution exists;
- be placed with the SQL editor / SQL Workspace controls rather than in the topbar or another persistent course-shell area;
- remain absent during earlier reasoning, prediction, relationship, Grain, Cardinality, or other pre-SQL states;
- disappear when the SQL Workspace is no longer the active SQL-authoring surface, including result-only and verification states.

Availability follows the task condition above, not the identity of a particular Lesson or encounter. If multiple encounters each contain an active SQL authoring task with a concrete solution, the learner should receive the same control role and a consistent placement/treatment unless an explicit encounter-level authority establishes a real pedagogical exception.

The learner should therefore not see a persistent `Show solution` control while reasoning toward the SQL task.

This decision supersedes the earlier course-level placement and availability rule that treated `Show solution` as a global control available throughout the learner journey.

### Assistance semantics

Pedagogically, revealing the solution is part of the same assistance continuum as hints and represents a stronger level of assistance, not a separate learning category.

`Show solution` remains distinct from:

- Desired Output;
- SQL Structure;
- correctness feedback;
- answer checking.

When the learner activates `Show solution`:

- the complete solution SQL replaces the current contents of the active SQL editor, as if the learner had typed or pasted that SQL there;
- the populated SQL remains editable by the learner;
- no separate revealed-solution panel or overlay is required.

Activating `Show solution` must not by itself:

- run SQL;
- mark required learner evidence complete;
- bypass result inspection or later verification required by the Lesson or encounter.

Where an encounter tracks assistance provenance, use of `Show solution` may be recorded as a stronger assistance level in the same way that hint use can distinguish supported from unassisted work. This does not create a separate owner gate for solution use.

### Remaining implementation / policy questions

The exact visual treatment of the `Show solution` control inside the SQL Workspace remains an implementation decision.

The following remain OPEN:

- how solution availability is represented when a SQL task has no meaningful single solution;
- broader course-level analytics or progress semantics beyond encounter-local assistance provenance.

These open questions must not override the established editor-population behavior above.

## 4. Desired Output — local SQL-authoring scaffold

`Desired Output` is optional local assistance for a SQL authoring task. Its role is to make the required output contract inspectable without revealing the complete SQL solution.

Where used, `Desired Output` may expose information such as:

- required output columns;
- required aliases or learner-facing column names;
- the concrete result fields the authored SQL must return.

It should not silently become a full worked query, specify the entire relational implementation, or duplicate `Show solution`.

`Desired Output` is not mandatory in every SQL task. Its availability should be determined by whether the task benefits from separating the output contract from the learner's relational/SQL reasoning. When equivalent SQL authoring tasks across encounters use this scaffold for the same role, its placement and treatment should remain consistent.

`SQL Structure`, where used, remains a separate scaffold: it can support query shape or syntax structure without supplying the complete answer.

## 5. Within-Lesson review

The current Course 4 Lessons 1–2 product does not require course-shell Back / Forward journey-history navigation inside an active Lesson. Important completed reasoning and evidence remain reviewable through the accepted Conversation/Thread and Workbench presentation.

Reviewability does not authorize editing historical answers, rerunning earlier evidence-bearing activity as a new attempt, or mutating later evidence. Those behaviors belong to Retry / Redo, whose reset and downstream-invalidation semantics remain OPEN.

## 6. Retry / Redo — established need, reset semantics still OPEN

The course requires a clear learner action for trying an activity again. Review of completed work and inter-Lesson navigation are not substitutes for Retry / Redo.

Retry / Redo is also distinct from:

- browser refresh;
- database reset;
- inter-Lesson Previous / Next navigation;
- ordinary wrong-answer correction inside an active attempt.

The exact scope and reset behavior remain OPEN. The design has not yet determined whether Retry / Redo applies to the current task, a completed task, or both, nor which parts of learner state are preserved or reset.

Implementation must not silently decide the fate of:

- prior evidence;
- selected answers;
- hints;
- revealed solutions;
- SQL text;
- query results;
- Concept Moment visibility;
- downstream completed work.

## 7. Relationship to Lesson-local interactions

Course-shell controls should support movement through the course without replacing pedagogically meaningful local actions.

A Lesson may still define its own local controls where those controls are part of the learner encounter — for example `Check answer`, `Run query`, `Continue`, `Desired Output`, `SQL Structure`, or the SQL-workspace `Show solution` action established above. Those actions remain governed by the Lesson interaction authority together with this course-level boundary.

Inter-Lesson navigation and Retry / Redo should not be independently redefined inside each Lesson.

## 8. Visual role

Course-shell navigation should be easy to find without becoming the primary visual focus of the lesson.

Its visual identity should make clear that it is persistent navigation rather than content belonging to the current reasoning card or SQL task.

Previous and Next should read as a stable inter-Lesson navigation pair. Disabled/unavailable states should clearly communicate when there is no authorized earlier or later Lesson to open.

`Show solution` is deliberately excluded from that global layer. When available, it should read visually as secondary assistance attached to the SQL Workspace rather than as a primary course-level action.

The current learner task, evidence, or authoring surface should remain visually dominant.

## 9. Out of scope / still OPEN

This document does **not** currently establish:

- a global hint system;
- a generalized Lesson locking/unlocking system beyond the accepted Course 4 Lessons 1–2 progression;
- exact keyboard shortcuts;
- exact mobile behavior;
- Retry / Redo reset and downstream invalidation semantics;
- persistence across sessions;
- how these controls behave across future Lesson types that have not yet been designed.

Those decisions remain OPEN until explicitly established.
