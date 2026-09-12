# Cycle 1 — Authority Clarification: Show solution belongs to the SQL Workspace

**Date:** 2026-09-13  
**Status:** CURRENT CLARIFICATION — SUPERSEDES PRIOR PLACEMENT / AVAILABILITY RULE

## Owner clarification

The Course Authority Owner clarified that `Show solution` should not be presented as a persistent global course-shell control.

For Cycle 1, `Show solution` belongs to the active SQL Workspace / SQL editor surface and is available only when the learner has reached the SQL authoring task.

## Authority meaning

For Cycle 1:

- `Show solution` is absent during pre-SQL reasoning and prediction states.
- It is not shown in the topbar or another persistent course-shell control group.
- It becomes available when the SQL Workspace / SQL editor becomes the active learner surface and a concrete SQL solution exists.
- Its visual placement should be with the SQL editor controls as secondary assistance.
- Revealing it remains a stronger assistance level on the same continuum as hints where assistance provenance is tracked.
- Revealing it does not by itself populate the editor, execute SQL, complete required evidence, or bypass later verification.

## Supersession

This clarification supersedes only the **placement and availability** statements in:

- `course-design/production/cycle-1/authority-clarification-show-solution-assistance.md` that said `Show solution` remains available throughout the learner journey, including protected pre-execution prediction;
- earlier Cycle 1 implementation assumptions that represented `Show solution` as a global course-shell control.

The prior clarification remains preserved as historical evidence of the earlier decision. Its assistance-semantics statements remain valid unless contradicted here.

The current course-level control boundary is defined in `course-design/course-controls.md`.

## Implementation consequence

The current Cycle 1 runtime must remove the persistent topbar/course-shell `Show solution` control and expose `Show solution` only inside the SQL Workspace when SQL authoring is active.

This is a targeted control-placement correction. It does not alter the target capability, case, reasoning sequence, protected evidence, SQL result contract, or verification requirements.
