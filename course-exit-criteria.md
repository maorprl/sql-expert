# Course Exit Criteria

## Goal

By the end of the course, the learner should be able to take a **business question about an unfamiliar database** and solve it through an understanding of the data structure and relationships — not through random trial and error in SQL.

## Exit Criteria

By the end of the course, the learner should be able to:

- Understand what each relevant relation represents and what one row in it represents.
- Identify primary keys, foreign keys, and relationships between relations.
- Explicitly define the required output grain.
- Identify where the information needed to answer the question is stored.
- Predict what relational operations will do to rows: what is preserved, what disappears, and what may be duplicated.
- Identify situations where cardinality or multiple 1 relationships create fan-out.
- Build a **relational solution plan before writing SQL**.
- Choose an appropriate operation based on the need — for example selection, projection, join, existence filtering, or aggregation — and explain why.
- Translate the relational plan into correct SQL.
- Validate the result using sanity checks rather than relying only on the fact that the query runs.
- When a result is surprising or wrong, diagnose the cause through the data structure and relationships rather than by randomly modifying SQL.

## Guiding Principle

**“Can write JOIN / GROUP BY / EXISTS” is not an Exit Criterion by itself.**

These are tools.

The capability being assessed is knowing:

- when to use them;
- why to use them;
- and what they will do to the data.

## Status

First draft.

This document is intended to be the starting point for designing the new course, before the knowledge map, learner flow, and unit structure.
