# Cycle 1 Targeted Test-Drive Finding — Connecting-Field Focus State

**Date:** 2026-09-13  
**Status:** TARGETED RUNTIME CORRECTION REQUIRED  
**Scope:** Cycle 1 relation-reuse → connecting-field transition only

## Observed defect

After the learner correctly selected `funding_round` and `round_investment`, the connecting-field task asked the learner to select a column in `round_investment`, but the Working Schema presented both relation cards with equal visual weight and placed the larger `funding_round` card before the actual action target.

The immediate action surface (`round_investment`) was therefore displaced downward while the current prompt and the confirmation control remained in the separate reasoning column. This forced the learner to search across page regions and made an already-completed/reference relation more visually prominent than the relation on which the learner had to act.

This violates the current visual-language requirements that:

- the current learner activity be the strongest visual focus;
- supporting references become visually secondary when they are no longer the current action surface;
- action, produced/selected evidence, and immediate interpretation remain spatially associated;
- movement between page regions have a clear visual handoff rather than feel like the task simply jumped between columns.

It also conflicts with the Stage 1 calibration for connecting-key reasoning, where the learner selects the relevant column directly in the active Working Schema relation.

## Required correction

The connecting-field state must behave as a focused tool-led reasoning state:

1. `round_investment` is the active Working Schema relation and is shown first, fully visible, and visually primary.
2. `funding_round` remains available as a quieter reference rather than competing as a co-primary schema card.
3. Both relation cards remain schema-level references; no PK/FK badges, connector, or Cardinality marking may appear before the learner identifies the connecting field.
4. The learner selects the candidate column directly inside the active `round_investment` card.
5. The selected-column status and **Check selected column** control belong beside the Working Schema action, not back in a distant reasoning card.
6. The reasoning card keeps the question and teacher orientation, while a concise semantic bridge may clarify the already-selected relation roles:
   - `funding_round`: one funding round and its round-level context;
   - `round_investment`: one recorded investor participation.
   This is domain orientation, not a reveal of the connecting field or Cardinality answer.
7. Completed relation-selection work remains reviewable but visually subordinate to the current connecting-field action.

## Scope boundary

This correction does not change the accepted case, relation set, target capability, correct connecting field, Grain sequence, Cardinality sequence, row-multiplication prediction, SQL contract, or verification evidence. It is a targeted visual/pedagogical conformance correction discovered during runtime test drive.
