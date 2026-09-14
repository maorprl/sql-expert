# Cycle 1 — Authority Clarification: Show solution belongs to the SQL Workspace

**Date:** 2026-09-13  
**Status:** CURRENT CLARIFICATION — SUPERSEDES PRIOR PLACEMENT / AVAILABILITY AND EDITOR-POPULATION RULES

## Owner clarification

The Course Authority Owner clarified that `Show solution` should not be presented as a persistent global course-shell control.

For Cycle 1, `Show solution` belongs to the active SQL Workspace / SQL editor surface and is available only when the learner has reached the SQL authoring task.

The Course Authority Owner further clarified that activating `Show solution` should place the complete solution directly into the active SQL editor, as if the learner had typed or pasted it there.

## Authority meaning

For Cycle 1:

- `Show solution` is absent during pre-SQL reasoning and prediction states.
- It is not shown in the topbar or another persistent course-shell control group.
- It becomes available when the SQL Workspace / SQL editor becomes the active learner surface and a concrete SQL solution exists.
- Its visual placement should be with the SQL editor controls as secondary assistance.
- Revealing it remains a stronger assistance level on the same continuum as hints where assistance provenance is tracked.
- Activating it replaces the current SQL editor contents with the complete solution SQL.
- The populated SQL remains editable by the learner.
- No separate revealed-solution panel or overlay is required.
- Activating it does not by itself execute SQL, complete required evidence, or bypass result inspection or later verification.

## Supersession

This clarification supersedes:

- the **placement and availability** statements in `course-design/production/cycle-1/authority-clarification-show-solution-assistance.md` that said `Show solution` remains available throughout the learner journey, including protected pre-execution prediction;
- the earlier assistance-semantics statement that revealing a solution does not populate the learner response / SQL editor;
- earlier Cycle 1 implementation assumptions that represented `Show solution` as a global course-shell control or as a separate revealed-solution panel.

The prior clarification remains preserved as historical evidence of the earlier decision.

The current course-level control boundary and behavior are defined in `course-design/course-controls.md`.

## Implementation consequence

The current Cycle 1 runtime must expose `Show solution` only inside the SQL Workspace when SQL authoring is active. Activating it must populate the existing editor with the encounter's complete solution SQL without automatically running that SQL or recording completion evidence.

This is a targeted assistance-behavior correction. It does not alter the target capability, case, reasoning sequence, protected evidence, SQL result contract, or verification requirements.
