# Cycle 1 Owner-Directed Implementation Record — Participation Row Multiplication

**Date:** 2026-09-13  
**Status:** IMPLEMENTED UNDER OWNER-DIRECTED TARGETED WAIVER  
**Authority:**
- `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-and-waiver-2026-09-13.md`

## Runtime sequencing correction

The Cycle 1 participation encounter is implemented as a **subsequent encounter**, not as a replacement for the existing validated Stage 1 runtime.

The SQL Lab now starts with the existing Stage 1 `news_article → news_source` encounter implemented by `src/stage1.js`. When Stage 1 reaches its existing completion state, the learner receives a transition action that activates the Cycle 1 `funding_round → round_investment` encounter in the same shared SQL Lab shell.

`src/stage1.js` is unchanged by this correction. `src/main.js` now acts as the encounter orchestrator and routes shared schema/editor/result behavior to the currently active encounter.

No new Back, Retry, persistence, or Stage-number semantics are established by this transition.

## Implemented Cycle 1 learner flow

The Cycle 1 encounter uses the accepted `funding_round → round_investment` case and the revised evidence sequence:

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

## Runtime files

- `index.html` — restored to the existing Stage 1 entry state and business request.
- `src/stage1.js` — existing Stage 1 implementation; unchanged.
- `src/main.js` — reuses the existing Stage 1 runtime first, then activates the Cycle 1 encounter after Stage 1 completion.
- `src/cycle1.js` — contains the separate Cycle 1 `funding_round → round_investment` encounter and revised evidence logic.

The same editor, SQLite runtime, schema viewer, autocomplete, results table, interaction lifecycle, visual infrastructure, and database are reused rather than rebuilt for the second encounter.

## SQL/result contract

A valid Cycle 1 learner query must return these logical columns:

`funding_round_id | round_type | announced_date | round_investment_id | investor_id | is_lead`

The current result must contain all 72 participation rows exactly once with correct funding-round context. Equivalent direct INNER JOIN formulations may start from either relation. Aggregation, DISTINCT, LEFT JOIN, EXISTS, and substitute repair mechanisms are rejected for this encounter.

The final 1003 evidence slice is derived from the learner's actual accepted result, not from a separately hard-coded answer table.

## Evidence safeguards

- SQL remains unavailable in the Cycle 1 encounter until the qualitative prediction, repetition interpretation, and supporting concrete application are resolved.
- The numerical `3 → 3` application occurs only after the qualitative core prediction and is not treated as sufficient core evidence by itself.
- Show solution and local hints are recorded as assistance provenance and do not auto-answer, auto-fill SQL, run SQL, or complete evidence.
- Successful SQL execution reports the row count but does not perform the final relational interpretation.

## Validation performed in this implementation pass

- `src/main.js` passed `node --check` before repository write.
- `src/cycle1.js` had already passed `node --check` before repository write.
- The runtime validator derives the expected six-field rows from the loaded SQLite database and compares the learner result semantically, independent of row order.
- A full production build could not be executed in the available container because outbound network/DNS access was unavailable for cloning/installing repository dependencies. This is an environment limitation, not a successful runtime validation claim.
- No formal Pedagogy, UX, reconciliation, or pre-build audit rerun was performed; those steps were explicitly waived by the Course Authority Owner for this targeted correction.
