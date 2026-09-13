# Cycle 1 Owner-Directed Implementation Record — Participation Row Multiplication

**Date:** 2026-09-13  
**Status:** IMPLEMENTED UNDER OWNER-DIRECTED TARGETED WAIVER  
**Authority:**
- `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-and-waiver-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-structural-reuse-2026-09-13.md`
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

For the Cycle 1 row-multiplication encounter it is attached to the SQL editor controls and is visible only while the active state is SQL authoring. It is absent during relation reuse, connection reuse, Grain, Cardinality, prediction, concrete application, result-only, verification, and completion states.

Revealing the SQL solution remains assistance only. It does not populate the editor, execute SQL, complete evidence, or bypass later verification.

## Structural reuse correction from runtime test drive

The targeted 2026-09-13 runtime test drive exposed a design defect in the encounter entry state: both relevant relations and the FK → PK connection were supplied before learner action.

The current targeted revision supersedes that pre-resolved entry state. The governing rule is:

> **Previously learned does not mean pre-resolved.**

Relation identification and direct connection reading were already introduced in Stage 1, so they are reused without being retaught. They are nevertheless learner actions in this encounter rather than work performed by the system in advance.

The runtime now starts the row-multiplication encounter with an empty Working Schema. The learner must:

1. select `funding_round` and `round_investment` from Live Schema;
2. identify `round_investment.funding_round_id` as the participation field that connects to the funding round;
3. only then receive the visual PK/FK connection;
4. establish requested participation Grain;
5. interpret Cardinality from the relationship they established;
6. only after the Cardinality judgment receive the compact `1 : M` marking.

The relation-selection and connection actions are **reuse checkpoints**, not new Concept Moments and not the accepted target capability's core evidence.

The previous Cardinality teacher voice that referred to "Reuse Cardinality from Stage 1" is superseded by learner-facing guidance grounded in the current relationship:

> You found how a participation connects to a funding round. Now consider what that relationship allows in each direction.

## Implemented Cycle 1 learner flow

The Cycle 1 encounter now uses the accepted `funding_round → round_investment` case in this sequence:

1. identify and select the relevant relations as a reuse checkpoint;
2. identify the direct participation → funding-round connection field as a reuse checkpoint;
3. establish participation Grain;
4. interpret funding-round → participation Cardinality;
5. qualitatively predict that one funding round can occupy several result rows when several participation records must remain represented;
6. predict that round-level context can repeat across those distinct participation rows;
7. introduce the JOIN row-multiplication Concept Moment only after those predictions;
8. apply the prediction to a three-participation concrete case as supporting evidence;
9. author the six-field direct INNER JOIN;
10. inspect actual result evidence for `funding_round_id = 1003`;
11. verify that the four rows are distinct participation-grain rows with repeated round context.

The implementation deliberately does not introduce `fan-out`, aggregation, LEFT JOIN, amount reconciliation, investor-name resolution, or a new global solution-control semantic.

## Runtime files

- `index.html` — remains the existing Stage 1 entry shell.
- `src/stage1.js` — existing Stage 1 implementation plus a narrow `refresh` export used only to re-render preserved Stage 1 state after chapter switching.
- `src/main.js` — encounter orchestrator, chapter selector, per-encounter editor/result surface retention, and shared runtime routing.
- `src/course-navigation.css` — course-shell chapter navigation and SQL-local `Show solution` placement styling.
- `src/cycle1.js` — thin Cycle 1 entry/reuse layer that requires relation selection and connection identification before delegating to the previously implemented row-multiplication flow.
- `src/cycle1-core.js` — byte-for-byte copy of the previously active `src/cycle1.js` row-multiplication implementation, preserved as the post-reuse core encounter logic.
- `src/cycle1-entry.css` — local entry/reuse styling plus enforcement that `Show solution` is hidden once SQL authoring is no longer active.

The same editor, SQLite runtime, schema viewer, autocomplete, results table, interaction lifecycle, visual infrastructure, and database are reused rather than rebuilt for the second encounter.

## SQL/result contract

A valid Cycle 1 learner query must return these logical columns:

`funding_round_id | round_type | announced_date | round_investment_id | investor_id | is_lead`

The current result must contain all 72 participation rows exactly once with correct funding-round context. Equivalent direct INNER JOIN formulations may start from either relation. Aggregation, DISTINCT, LEFT JOIN, EXISTS, and substitute repair mechanisms are rejected for this encounter.

The final 1003 evidence slice is derived from the learner's actual accepted result, not from a separately hard-coded answer table.

## Evidence safeguards

- Relation identification and direct-connection reading are learner-performed reuse actions but are not promoted to the core target evidence.
- PK/FK is not visually resolved until the learner identifies the connecting participation field.
- `1 : M` is not shown until the learner completes the Cardinality judgment.
- SQL remains unavailable until the qualitative prediction, repetition interpretation, and supporting concrete application are resolved.
- The numerical `3 → 3` application occurs only after the qualitative core prediction and is not treated as sufficient core evidence by itself.
- `Show solution` is unavailable before SQL authoring and hidden again in result-only / verification states; when used during SQL authoring it remains assistance and does not auto-fill SQL, run SQL, or complete evidence.
- Local hints remain governed by the encounter's existing assistance logic.
- Successful SQL execution reports the row count but does not perform the final relational interpretation.

## Validation performed in this implementation pass

- The previously active row-multiplication implementation was preserved exactly as `src/cycle1-core.js`; its blob SHA remains `84993811c8b959089d48d1500a02933f0769d577`.
- The final `src/cycle1.js` entry wrapper was reconstructed locally from the exact repository blob and passed `node --check`; its checked Git blob SHA is `d00a64021718da83e17e0ad252ce70550dbef2f0`.
- The Stage 1 learning sequence was not changed by this structural-reuse correction.
- The runtime still derives the expected six-field Cycle 1 rows from the loaded SQLite database and compares the learner result semantically, independent of row order.
- The chapter navigation remains outside task cards and is not completion-gated.
- A full browser/runtime test is still required; this correction was produced specifically so the targeted test drive can restart from the Row multiplication entry state.
- No formal Pedagogy, UX, reconciliation, or pre-build audit rerun was performed for this targeted owner-directed correction.
