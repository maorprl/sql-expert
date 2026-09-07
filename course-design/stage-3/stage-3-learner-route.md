# Preserved Calibrated Source — Future Stage 3 Learner Route

## Preservation Status

This document preserves the calibrated `funding_round → company` encounter because this business case is intended to become Stage 3. It is not yet the final Stage 3 learner route. Its current scaffolding reflects a first-exposure JOIN encounter and must not be assumed appropriate for Stage 3; later Stage 3 design must reconsider scaffolding based on the learner state at that point. Preservation does not reinterpret or improve any current Stage 1 decision.

## Preserved Current Stage 1 Content

The business request remains visible as context; it is not a learner step. The route contains nine learner steps, followed by a completion state.

1. Select relevant relations from the live schema into an empty Working Schema. Cards derive from SQLite metadata and show columns, PKs, and FKs only. Selection is ordered, unique, removable, and limited to four relations.
2. Identify output meaning, then introduce **NEW CONCEPT: GRAIN**: the output grain is one funding round per row; Grain = what one row represents.
3. Identify `funding_round.company_id`, then explicitly introduce Primary Key / Foreign Key. The explanation includes the operational meaning: **Its value tells us which company row this funding round belongs to.** That company row contains `status`. There is no separate information-source step.
4. Answer one closed question about the one-to-many relationship, then explicitly introduce Cardinality. After the correct answer, show a local visual aid reinforcing `company.company_id` as PK, `funding_round.company_id` as FK, and `company 1 → M funding_round`. This visual aid is a locked pedagogical requirement and must not be a Venn diagram.
5. Run and interpret the compact persistent `COUNT(*)` baseline in two internal phases of the same learner step. It reports **Baseline result: 26 rows**, then asks what 26 represents: 26 funding rounds.
6. Predict that adding status preserves 26 rows before JOIN vocabulary is introduced. The explanation connects the baseline, funding-round grain, and the one-company PK/FK match; it makes **26 funding rounds × 1 matching company each = 26 result rows** the key reasoning takeaway and confirms that the grain stays one funding round per row. Do not introduce the term `fan-out` here.
7. Choose to combine each funding round with its related company, then introduce **JOIN**.
8. First learn the `INNER JOIN ... ON ...` pattern, its matching-row meaning, and the task-specific connection; only then write the result-checked query in the same expanded editor. Output requirements are hidden by default in a non-hint disclosure. SQL help escalates after attempts and can show a non-overwriting solution. Query checking is result-based.
9. Verify that the final grain is one funding round per row.

Stage completion is a state, not a numbered step. Completed cards retain the question, answer, choices, feedback, and opened hints.
