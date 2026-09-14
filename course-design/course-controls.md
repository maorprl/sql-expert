# Course Controls

## Status

WORKING

This document defines course-level learner controls and establishes where course-wide controls end and task-local assistance begins.

It is intentionally narrow. It does not define the broader stage sequence, hint policy, or persistence model.

When this document conflicts with a Stage-local placement decision for a control covered here, the current course-level decision here takes precedence.

---

## 1. Course chapter navigation

The learner must be able to move directly between currently available course chapters / encounters without completing the current chapter first.

Chapter navigation belongs to the **course shell**, not inside a reasoning card, task card, SQL task, feedback block, or completion state.

For the currently implemented course surface, the navigation exposes:

- the existing validated `news_article → news_source` encounter;
- the current `funding_round → round_investment` row-multiplication encounter.

The navigation must:

- remain visually separate from pedagogical actions such as `Check answer`, `Continue`, and `Run query`;
- make the currently active chapter clear;
- allow direct switching in either direction at any time;
- not require completion, correctness, or evidence submission before switching;
- not itself mark evidence complete or alter the learner's answers merely because a chapter was selected.

The chapter selector is navigation, not a forward-progression reward and not part of the current task's evidence.

The exact visual treatment may vary, but it should read as a compact, stable course-level chapter control rather than as another button inside the active exercise.

### Navigation naming consistency

Learner-facing chapter labels should use one naming scheme across the selector.

A stage/order identifier such as `Stage 1` should not be mixed beside a descriptive encounter title such as `Row multiplication` as though they were equivalent kinds of labels. Because the broader Stage structure beyond the established current Stage 1 remains OPEN, navigation must not infer or invent a `Stage 2` label merely to create symmetry.

For the current course surface, descriptive encounter titles should be used consistently for learner-facing chapter selection. If an established Stage number or sequence identifier is also shown, it should appear as separate metadata rather than replace the descriptive title for only some encounters.

The exact descriptive titles remain an implementation/content decision, but the naming role must be consistent.

### OPEN — chapter-state persistence

This decision establishes free chapter navigation, but does not yet establish a general course-wide persistence contract across reloads, browser sessions, or future chapter types.

Implementation should avoid inventing broader persistence semantics beyond what the current runtime can safely preserve.

---

## 2. Global control layer

Other controls that manage navigation or learner actions across the course should be presented as a stable course-level layer rather than re-created as local content inside individual tasks.

At the current point in the design, this layer includes the chapter navigation established above and the previously established needs for:

- **Back**
- **Retry / Redo**

These controls are distinct from local task actions such as `Check answer`, `Run query`, `Continue`, `Desired Output`, `SQL Structure`, or `Show solution`.

The exact shell placement, responsive treatment, labels, icons, and grouping of global controls remain implementation decisions, but those controls should have a consistent role and predictable location across Stages where they are available.

## 3. Show solution — SQL-workspace assistance

`Show solution` is **not a global course-shell control**.

It is local assistance for a concrete SQL authoring task and belongs inside the active **SQL Workspace / SQL editor surface**.

### Placement and availability

`Show solution` should:

- appear only when the learner has reached an active SQL authoring task for which a concrete SQL solution exists;
- be placed with the SQL editor / SQL Workspace controls rather than in the topbar or another persistent course-shell area;
- remain absent during earlier reasoning, prediction, relationship, Grain, Cardinality, or other pre-SQL states;
- disappear when the SQL Workspace is no longer the active SQL-authoring surface, including result-only and verification states.

Availability follows the task condition above, not the identity of a particular Stage or encounter. If multiple encounters each contain an active SQL authoring task with a concrete solution, the learner should receive the same control role and a consistent placement/treatment unless an explicit encounter-level authority establishes a real pedagogical exception.

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
- bypass result inspection or later verification required by the Stage or encounter.

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

## 5. Back — established need, semantics still OPEN

The course requires a clear **Back** control owned by the course experience. The learner should not have to rely on browser history or on opening Completed Steps merely to revisit the previous point in the learning journey.

Back is navigation inside a learner journey. It is distinct from the chapter selector established above.

The exact semantics of returning to an earlier state are not yet established. In particular, implementation must not silently decide whether Back:

- restores the exact previous interaction state;
- preserves or rolls back completed evidence;
- preserves opened hints or revealed solutions;
- preserves editor contents or produced results;
- can cross Concept Moments, execution states, episode boundaries, or Stage boundaries.

Those behaviors remain OPEN until explicitly resolved.

## 6. Retry / Redo — established need, reset semantics still OPEN

The course requires a clear learner action for trying an activity again. Review of a completed step is not a substitute for Retry / Redo.

Retry / Redo is also distinct from:

- browser refresh;
- database reset;
- Back navigation;
- chapter selection;
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

## 7. Relationship to Stage-local interactions

Course-shell controls should support movement through the course without replacing pedagogically meaningful local actions.

A Stage may still define its own local controls where those controls are part of the learner encounter — for example `Check answer`, `Run query`, `Continue`, `Desired Output`, `SQL Structure`, or the SQL-workspace `Show solution` action established above. Those actions remain governed by the Stage interaction authority together with this course-level boundary.

Chapter navigation, Back, and Retry / Redo should not be independently redesigned inside each Stage.

## 8. Visual role

Course-shell navigation should be easy to find without becoming the primary visual focus of the lesson.

Its visual identity should make clear that it is persistent navigation rather than content belonging to the current reasoning card or SQL task.

`Show solution` is deliberately excluded from that global layer. When available, it should read visually as secondary assistance attached to the SQL Workspace rather than as a primary course-level action.

The current learner task, evidence, or authoring surface should remain visually dominant.

## 9. Out of scope / still OPEN

This document does **not** currently establish:

- a global hint system;
- automatic completion-based chapter locking or unlocking;
- exact keyboard shortcuts;
- exact mobile behavior;
- exact undo / branching semantics;
- whether retrying earlier work invalidates later work;
- how progress is stored across sessions;
- how these controls behave across future Stage types that have not yet been designed.

Those decisions remain OPEN until explicitly established.
