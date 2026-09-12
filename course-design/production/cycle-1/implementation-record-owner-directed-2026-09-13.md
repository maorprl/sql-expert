# Cycle 1 Owner-Directed Implementation Record — Participation Row Multiplication

**Date:** 2026-09-13  
**Status:** IMPLEMENTED UNDER OWNER-DIRECTED TARGETED WAIVER  
**Authority:**
- `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-and-waiver-2026-09-13.md`

## Implemented learner flow

The current Cycle 1 runtime now uses the accepted `funding_round → round_investment` case and the revised evidence sequence:

1. establish participation Grain;
2. interpret funding-round → participation Cardinality;
3. qualitatively predict that one funding round can occupy several result rows when several participation records must remain represented;
4. predict that round-level context can repeat across those distinct participation rows;
5. introduce the JOIN row-multiplication Concept Moment only after those predictions;
6. apply the prediction to a three-participation concrete case as supporting evidence;
7. author the six-field direct INNER JOIN;
8. inspect actual result evidence for `funding_round_id = 1003`;
9. verify that the four rows are distinct participation-grain rows with repeated round context.

The implementation deliberately does not introduce `fan-out`, aggregation, LEFT JOIN, amount reconciliation, investor-name resolution, or a new global control semantic.

## Changed runtime files

- `index.html` — replaces the obsolete source-level coverage business request with the participation-audit request.
- `src/cycle1.js` — replaces the obsolete `news_source → news_article` Cycle 1 implementation with the accepted `funding_round → round_investment` encounter and revised evidence logic.

Existing course shell, visual-language styling, SQL editor, schema explorer, interaction lifecycle, and global Show solution control are reused.

## SQL/result contract

A valid learner query must return these logical columns:

`funding_round_id | round_type | announced_date | round_investment_id | investor_id | is_lead`

The current result must contain all 72 participation rows exactly once with correct funding-round context. Equivalent direct INNER JOIN formulations may start from either relation. Aggregation, DISTINCT, LEFT JOIN, EXISTS, and substitute repair mechanisms are rejected for this encounter.

The final 1003 evidence slice is derived from the learner's actual accepted result, not from a separately hard-coded answer table.

## Evidence safeguards

- SQL remains unavailable until the qualitative prediction, repetition interpretation, and supporting concrete application are resolved.
- The numerical `3 → 3` application occurs only after the qualitative core prediction and is not treated as sufficient core evidence by itself.
- Show solution and local hints are recorded as assistance provenance and do not auto-answer, auto-fill SQL, run SQL, or complete evidence.
- Successful SQL execution reports the row count but does not perform the final relational interpretation.

## Validation performed in this implementation pass

- JavaScript syntax check completed successfully with `node --check` on the replacement `src/cycle1.js` before repository write.
- The runtime validator derives the expected six-field rows from the loaded SQLite database and compares the learner result semantically, independent of row order.
- No formal Pedagogy, UX, reconciliation, or pre-build audit rerun was performed; those steps were explicitly waived by the Course Authority Owner for this targeted correction.
