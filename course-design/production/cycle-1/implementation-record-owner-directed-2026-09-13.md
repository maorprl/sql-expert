# Cycle 1 Owner-Directed Implementation Record — Participation Row Multiplication

**Date:** 2026-09-13  
**Status:** IMPLEMENTED UNDER OWNER-DIRECTED TARGETED WAIVER  
**Authority:**
- `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-and-waiver-2026-09-13.md`
- `course-design/production/cycle-1/authority-clarification-show-solution-sql-workspace-2026-09-13.md`
- `course-design/course-controls.md`

## Runtime sequencing and chapter-navigation correction

The Cycle 1 participation encounter is implemented as a **separate subsequent encounter**, not as a replacement for the existing validated Stage 1 runtime.

The SQL Lab starts with the existing Stage 1 `news_article → news_source` encounter implemented by `src/stage1.js`. A course-shell chapter selector exposes both currently available encounters and allows the learner to switch directly between them without completing the current encounter first.

The chapter selector is outside the active reasoning/task card. Selecting a chapter does not itself complete evidence, submit an answer, or satisfy a progression gate.

Within the current browser run, `src/main.js` retains each encounter's editor text and rendered result separately while the encounter modules retain their in-memory reasoning state. `src/stage1.js` received only a public `refresh` hook so its existing state can be re-rendered when the learner returns to Stage 1; the Stage 1 learning sequence itself was not redesigned.

No broader reload/session persistence policy, Back semantics, Retry semantics, or new Stage-number semantics are established by this correction.

## Show solution placement correction

`Show solution` is no longer represented as a persistent topbar/course-shell action.

For the Cycle 1 row-multiplication encounter it is attached to the SQL editor controls and is visible only while the active state is SQL authoring. It is absent during Grain, Cardinality, prediction, concrete application, result-only, verification, and completion states.

Revealing the SQL solution remains assistance only. It does not populate the editor, execute SQL, complete evidence, or bypass later verification.

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

The implementation deliberately does not introduce `fan-out`, aggregation, LEFT JOIN, amount reconciliation, investor-name resolution, or a new global solution-control semantic.

## Runtime files

- `index.html` — remains the existing Stage 1 entry shell.
- `src/stage1.js` — existing Stage 1 implementation plus a narrow `refresh` export used only to re-render preserved Stage 1 state after chapter switching.
- `src/main.js` — encounter orchestrator, chapter selector, per-encounter editor/result surface retention, and shared runtime routing.
- `src/course-navigation.css` — course-shell chapter navigation and SQL-local `Show solution` placement styling.
- `src/cycle1.js` — separate Cycle 1 `funding_round → round_investment` encounter and revised evidence logic.

The same editor, SQLite runtime, schema viewer, autocomplete, results table, interaction lifecycle, visual infrastructure, and database are reused rather than rebuilt for the second encounter.

## SQL/result contract

A valid Cycle 1 learner query must return these logical columns:

`funding_round_id | round_type | announced_date | round_investment_id | investor_id | is_lead`

The current result must contain all 72 participation rows exactly once with correct funding-round context. Equivalent direct INNER JOIN formulations may start from either relation. Aggregation, DISTINCT, LEFT JOIN, EXISTS, and substitute repair mechanisms are rejected for this encounter.

The final 1003 evidence slice is derived from the learner's actual accepted result, not from a separately hard-coded answer table.

## Evidence safeguards

- SQL remains unavailable in the Cycle 1 encounter until the qualitative prediction, repetition interpretation, and supporting concrete application are resolved.
- The numerical `3 → 3` application occurs only after the qualitative core prediction and is not treated as sufficient core evidence by itself.
- `Show solution` is unavailable before SQL authoring; when used during SQL authoring it is recorded as assistance provenance and does not auto-fill SQL, run SQL, or complete evidence.
- Local hints remain governed by the encounter's existing assistance logic.
- Successful SQL execution reports the row count but does not perform the final relational interpretation.

## Validation performed in this implementation pass

- The Stage 1 change was diff-checked against the immediately prior runtime and consists only of exposing the existing internal `render` function as `refresh`; no Stage 1 pedagogical content was changed.
- The runtime still derives the expected six-field Cycle 1 rows from the loaded SQLite database and compares the learner result semantically, independent of row order.
- The new navigation is implemented outside task cards and is not completion-gated.
- The SQL-local solution control is created inside the SQL Workspace controls rather than the topbar and is shown only by the Cycle 1 SQL-authoring state styling.
- A full production build could not be executed in the available container because outbound network/DNS access was unavailable for cloning/installing repository dependencies. This is an environment limitation, not a successful runtime validation claim.
- No formal Pedagogy, UX, reconciliation, or pre-build audit rerun was performed; those steps were explicitly waived by the Course Authority Owner for this targeted correction.
