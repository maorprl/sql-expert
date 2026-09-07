# Stage 1 learner route

The business request remains visible as context; it is not a learner step.

1. Select relevant relations from the live schema into an empty Working Schema. Cards derive from SQLite metadata and show columns, PKs, and FKs only. Selection is ordered, unique, removable, and limited to four relations.
2. Identify output meaning, then introduce **Grain**: one funding round per row.
3. Identify `funding_round.company_id`, then introduce its relationship to the `company.company_id` primary key and the related `status`.
4. Identify the one-to-many cardinality statement, then show the PK/FK and `company 1 → M funding_round` aid.
5. Run and interpret the compact persistent `COUNT(*)` baseline: 26 funding rounds.
6. Predict that adding status preserves 26 rows.
7. Choose to combine each funding round with its related company, then introduce **JOIN**.
8. Learn the `INNER JOIN ... ON ...` pattern and write the result-checked query in the same expanded editor. Requirements are a non-hint disclosure; SQL help escalates after attempts and can show a non-overwriting solution.
9. Verify that the final grain is one funding round per row.

Stage completion is a state, not a numbered step. Completed cards retain the question, answer, choices, feedback, and opened hints.
