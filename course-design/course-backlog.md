# Course Design Backlog

## Status

BACKLOG

This file tracks unresolved design questions that have been identified but not yet decided.

Items in this file are **not authority**. They must not be silently resolved in implementation. When an item is explicitly decided, the decision belongs in the relevant authority document and the backlog item should be marked resolved or removed.

---

## Course controls

### CTRL-BL-001 — Show solution behavior

Source: `course-design/course-controls.md`

Still undecided:

- the visual surface in which the revealed solution appears;
- whether the solution remains open while the learner continues working;
- how solution availability is represented when a task has no meaningful single solution;
- whether revealing a solution affects later assessment, analytics, or progress metadata.

### CTRL-BL-002 — Back semantics

Source: `course-design/course-controls.md`

Still undecided:

- whether Back restores the exact previous interaction state;
- whether completed evidence is preserved or rolled back;
- whether opened hints or revealed solutions are preserved;
- whether editor contents or produced results are preserved;
- whether Back can cross Concept Moments, execution states, episode boundaries, or Stage boundaries.

### CTRL-BL-003 — Retry / Redo semantics

Source: `course-design/course-controls.md`

Still undecided:

- whether Retry / Redo applies to the current task, a completed task, or both;
- what happens to prior evidence;
- what happens to selected answers;
- what happens to hints;
- what happens to revealed solutions;
- what happens to SQL text;
- what happens to query results;
- what happens to Concept Moment visibility;
- what happens to downstream completed work;
- whether retrying earlier work invalidates later work.

### CTRL-BL-004 — Global control shell details

Source: `course-design/course-controls.md`

Still undecided:

- exact placement of the global control layer;
- responsive treatment;
- exact labels and icons;
- grouping and visual arrangement;
- exact keyboard shortcuts;
- exact mobile behavior.

### CTRL-BL-005 — Future course-level controls and persistence

Source: `course-design/course-controls.md`

Still undecided:

- whether there is a global hint system;
- whether there is a global forward / Next control;
- exact undo / branching semantics;
- how progress is stored across sessions;
- how global controls behave across future Stage types that have not yet been designed.
