# Course Controls

## Status

WORKING

This document defines course-level learner controls that belong to the course shell rather than to any one Stage or task card.

It is intentionally narrow. It does not define the broader stage sequence, hint policy, or persistence model.

When this document conflicts with a Stage-local placement decision for one of these controls, the course-level control decision here takes precedence.

---

## 1. Global control layer

Controls that manage navigation or learner support across the course should be presented as a stable course-level layer rather than re-created as local content inside individual tasks.

At the current point in the design, this layer includes:

- **Back**
- **Retry / Redo**
- **Show solution**

These controls are distinct from local task actions such as `Check answer`, `Run query`, `Continue`, `Desired Output`, or `SQL Structure`.

The exact shell placement, responsive treatment, labels, icons, and grouping remain implementation decisions, but the controls should have a consistent role and predictable location across Stages where they are available.

## 2. Show solution — established course-level behavior

`Show solution` is a **global course control**, not a Stage-specific disclosure embedded inside the current task card.

The control should be presented as an explicit button/action in the course-level control layer. When activated, it reveals the solution relevant to the learner's current solvable task.

**Availability is established:** `Show solution` remains available throughout the learner journey, including protected pre-execution prediction states. A Stage or evidence state must not silently disable or remove the control in order to protect assessment evidence.

The solution content itself is context-specific, but the mechanism belongs to the course shell and should remain recognizable across later Stages.

`Show solution` is distinct from:

- Desired Output;
- SQL Structure;
- hints;
- correctness feedback;
- answer checking.

Revealing a solution must not by itself:

- populate the learner's answer or SQL editor;
- run SQL;
- mark required learner evidence complete;
- bypass later verification required by the Stage.

The current Stage 1-local decision that placed Solution as another optional scaffold inside the SQL task is superseded by this course-level decision.

### OPEN — solution behavior

The following are not yet determined:

- the visual surface in which the revealed solution appears;
- whether the solution remains open while the learner continues working;
- how solution availability is represented when a task has no meaningful single solution;
- whether revealing a solution affects later assessment, analytics, or progress metadata beyond any encounter-local evidence provenance required to distinguish assisted from unassisted work.

These questions must not be silently resolved in implementation.

## 3. Back — established need, semantics still OPEN

The course requires a clear **Back** control owned by the course experience. The learner should not have to rely on browser history or on opening Completed Steps merely to revisit the previous point in the learning journey.

Back is navigation, not review-only display.

The exact semantics of returning to an earlier state are not yet established. In particular, implementation must not silently decide whether Back:

- restores the exact previous interaction state;
- preserves or rolls back completed evidence;
- preserves opened hints or revealed solutions;
- preserves editor contents or produced results;
- can cross Concept Moments, execution states, episode boundaries, or Stage boundaries.

Those behaviors remain OPEN until explicitly resolved.

## 4. Retry / Redo — established need, reset semantics still OPEN

The course requires a clear learner action for trying an activity again. Review of a completed step is not a substitute for Retry / Redo.

Retry / Redo is also distinct from:

- browser refresh;
- database reset;
- Back navigation;
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

## 5. Relationship to Stage-local interactions

Global controls should support the learner's movement through the course without replacing pedagogically meaningful local actions.

A Stage may still define its own local controls where those controls are part of the learner encounter — for example `Check answer`, `Run query`, `Continue`, or a local optional scaffold. Those actions remain governed by the Stage interaction authority.

Back, Retry / Redo, and Show solution should not be independently redesigned inside each Stage.

## 6. Visual role

The global control layer should be easy to find without becoming the primary visual focus of the lesson.

Its visual identity should make clear that these are persistent course actions rather than content belonging to the current reasoning card or SQL task.

The current learner task, evidence, or authoring surface should remain visually dominant.

## 7. Out of scope / still OPEN

This document does **not** currently establish:

- a global hint system;
- a global forward / Next control;
- exact keyboard shortcuts;
- exact mobile behavior;
- exact undo / branching semantics;
- whether retrying earlier work invalidates later work;
- how progress is stored across sessions;
- how these controls behave across future Stage types that have not yet been designed.

Those decisions remain OPEN until explicitly established.
