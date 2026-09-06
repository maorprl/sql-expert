# Stage 1 — Learner Route

**Status:** WORKING  
**Scope:** Stage 1 only  
**Role:** Calibration specification for the first learner experience

This document defines the detailed learner route for Stage 1.

It does not define the full course progression or future stages.

---

## 1. Business problem

The learner receives this business request:

> **The research team wants a list of all funding rounds, together with the current status of the company that raised each round.**

This is the current Stage 1 business problem.

---

## 2. Intended reasoning capability

Stage 1 is intended to develop the learner's ability to reason about two relations with different row meanings before using SQL to combine them.

By the end of the stage, the learner should be able to explain:

- what one row in `funding_round` represents;
- what one row in `company` represents;
- what one row in the requested output should represent;
- where the requested `status` comes from;
- how the two relations are related;
- what the relationship implies for the output row count;
- which relational operation fits the problem before translating that choice into SQL;
- why the SQL join is an implementation of that reasoning rather than the reasoning itself.

---

## 3. Relations exposed in Stage 1

Only the two relations required for the problem are foregrounded.

### `funding_round`

Columns shown:

```text
funding_round_id
company_id
round_type
announced_date
reported_total_amount
currency_code
```

Example rows shown:

```text
1001 | 1 | seed     | 2019-06-10 |  4000000 | USD
1002 | 1 | series a | 2021-05-18 | 12000000 | USD
1003 | 1 | series b | 2023-09-04 | 30000000 | USD
1101 | 2 | seed     | 2020-02-14 |  5000000 | USD
```

### `company`

Columns shown:

```text
company_id
status
description
```

Example rows shown:

```text
1 | active | Cloud security platform for enterprise workloads.
2 | active | Digital health monitoring and clinical workflow software.
3 | active | AI routing and optimization for commercial fleets.
4 | acquired | Payments infrastructure and fraud analytics.
```

The full schema remains inspectable in the Lab, but the learner route foregrounds only these two relations.

---

## 4. Learner route

### Step 1 — Read the business request

The learner sees the business request and the two relevant relations.

No SQL task is given yet.

---

### Step 2 — Identify what one output row should represent

Prompt:

> **What should one row in the requested result represent?**

Answer options:

- a company
- a funding round
- an investor
- a sector

Correct answer:

> **a funding round**

Feedback after a correct answer:

> Correct. The request asks for information about every funding round, so each output row should still represent one funding round.

At this point, introduce the term:

> **This is the output grain: one funding round per row.**

The word `grain` is therefore introduced only after the learner has first reasoned about row meaning.

---

### Step 3 — Follow the funding-round tuple

Prompt:

> **Which column in `funding_round` identifies the related company?**

Answer options:

- `funding_round_id`
- `company_id`
- `round_type`
- `announced_date`

Correct answer:

> `company_id`

Follow-up prompt:

> **Which relation stores the current status of that company?**

Correct answer:

> `company`

Feedback:

> `funding_round.company_id` leads to the related `company` row, where `status` is stored.

Reasoning path:

```text
funding_round row → company_id → related company row → company.status
```

---

### Step 4 — Reason about the relationship in both directions

Prompt 1:

> **Each funding round belongs to how many companies?**

Answer options:

- None
- One
- Many

Correct answer:

> **one**

Prompt 2:

> **Can one company be related to more than one funding round?**

Answer options:

- yes
- no

Correct answer:

> **yes**

After both are correct, introduce the term:

> **This is a one-to-many relationship: one company can have many funding rounds, while each funding round belongs to one company.**

The term `cardinality` may now be shown in a short label:

> **Cardinality: company 1 → M funding_round**

This is the first point at which the word `cardinality` appears.

---

### Step 5 — Establish the baseline row count

The learner is asked to run:

```sql
SELECT COUNT(*)
FROM funding_round;
```

Before the editor appears, the transition is:

> **Let’s establish a baseline.**
> Before combining the two relations, first measure how many rows are currently in `funding_round`.
> The query below is already prepared for you. Run it and inspect the result.

The existing Lab editor is shown in a compact baseline mode with a visible **Run Query** button.

Expected result:

```text
26
```

Prompt after execution:

> **What does the number 26 represent here?**

Answer options:

- 26 companies
- 26 funding rounds
- 26 investors
- 26 sectors

Correct answer:

> **26 funding rounds**

Feedback:

> `COUNT(*)` counts rows. Because the grain of `funding_round` is one funding round per row, 26 rows means 26 funding rounds.

`COUNT(*)` is used here as a row-count baseline and not as a separate aggregation lesson.

---

### Step 6 — Predict the effect of combining the relations

Prompt:

> **What do you expect to happen when we add `company.status` to every funding round?**

Answer options:

- The result should have 26 rows, because each funding round matches one company.
- The result should have more than 26 rows, because each company may have many funding rounds.
- The result should have fewer than 26 rows, because several funding rounds may belong to the same company.
- We cannot predict the row count from the relationship.

Correct answer:

> **The result should have 26 rows, because each funding round matches one company.**

Feedback:

> Correct. The expected output grain remains one funding round per row, so the expected row count remains 26.

---

### Step 7 — Choose the relational operation

The learner has already established that:

- the required information is split across `funding_round` and `company`;
- the two relations are connected through `company_id`;
- each funding round should match one company;
- the expected output remains at funding-round grain.

Prompt:

> **Which relational operation should we use to combine related rows from `funding_round` and `company`?**

Answer options:

- `SELECT`
- `JOIN`
- `GROUP BY`
- `UNION`

Correct answer:

> **JOIN**

Feedback:

> `JOIN` combines related rows from different relations. The SQL task implements this operation with an `INNER JOIN`.

At this point, `JOIN` is selected as the relational operation before its SQL syntax is implemented.

---

### Step 8 — SQL implementation

Task wording:

> **Write a query that returns every funding round together with the current `status` of the company that raised it.**

The output requirements are collapsed by default behind **Show output requirements**. Opening this control is not a hint. When opened, it shows the minimum required output columns:

```text
funding_round_id
company_id
round_type
announced_date
reported_total_amount
status
```

The learner writes and runs the SQL in the Lab editor.

No exact query text is prescribed.

A valid solution must correctly combine `funding_round` and `company` through `company_id`.

---

### Step 9 — Verify the result

After a valid result is produced, the learner sees:

> **You predicted 26 rows before writing the join. Did the result match your prediction?**

The system checks the actual result row count.

Expected:

```text
26
```

Final verification prompt:

> **What is the grain of the result?**

Answer options:

- one company per row
- one funding round per row
- one investor per row
- one company-funding-round pair per row

Correct answer:

> **one funding round per row**

Stage-level feedback:

> The join added company information without changing what one row represents. The result is still at funding-round grain.

---

## 5. Role of `COUNT(*)`

`COUNT(*)` serves two purposes in Stage 1:

1. establish a baseline before the join;
2. verify the predicted effect after the join.

The intended sequence is:

```text
understand row meaning
→ name the output grain
→ understand the relationship
→ measure rows
→ predict join effect
→ choose JOIN as the relational operation
→ implement the join in SQL
→ verify the prediction
```

---

## 6. Concepts named in Stage 1

The following terms are explicitly introduced:

### Grain

Introduced after the learner correctly identifies what one output row represents.

Definition used in Stage 1:

> **Grain = what one row represents.**

### Cardinality

Introduced after the learner reasons about the relationship in both directions.

Definition used in Stage 1:

> **Cardinality describes how many rows on one side of a relationship can be associated with rows on the other side.**

Stage 1 uses only the concrete case:

```text
company 1 → M funding_round
```

No broader taxonomy of relationship types is required in this stage.

---

## 7. What Stage 1 does not introduce

Stage 1 does not introduce:

- many-to-many relationships;
- fanout across multiple detail branches;
- `DISTINCT`;
- grouped aggregation as a topic;
- `HAVING`;
- pre-aggregation;
- CTEs;
- window functions;
- recursive CTEs.

---

## 8. Completion evidence

The learner has completed the Stage 1 route when they have demonstrated all of the following:

- identified the requested output grain;
- identified where `status` is stored;
- identified `company_id` as the connection;
- reasoned correctly about the one-to-many relationship;
- established and interpreted the `COUNT(*)` baseline;
- predicted that the row count should remain 26;
- selected `JOIN` as the relational operation that fits the problem;
- produced a SQL result that correctly adds `status`;
- verified that the result still has 26 rows;
- correctly identified the final result grain as one funding round per row.

Interaction rules for hints, wrong answers, automatic checking, and completion behavior are defined separately in `stage-1-interaction-decisions.md`.

---

## 9. Presentation decisions for the learner route

The following presentation behavior is part of the Stage 1 learner route and should not be left to implementation interpretation.

### Relation visibility

During the early reasoning steps, `funding_round` and `company` must both be directly visible to the learner.

The implementation may place them side by side on wide screens or stack them responsively on narrow screens, but they should not be hidden behind separate tabs or require the learner to remember one relation while inspecting the other.

### Example rows

The Stage 1 example rows defined in Section 3 should be visible inline during the relevant reasoning steps.

They should not be hidden behind an expandable preview by default.

This is important because the learner is expected to inspect the actual rows when reasoning about row meaning and the relationship between the two relations.

The full relation data remains available through the neutral Lab if the learner chooses to inspect it.

### SQL editor reveal

The SQL editor should not be the primary workspace during Steps 1–4.

It is introduced into the learner route at Step 5, when `COUNT(*)` is used as a row-count baseline.

At that point, the existing Lab editor is shown with the baseline query already present:

```sql
SELECT COUNT(*)
FROM funding_round;
```

The learner runs this query; they are not required to construct the `COUNT(*)` syntax from memory.

Before the editor is shown, the learner sees:

> **Let’s establish a baseline.**
> Before combining the two relations, first measure how many rows are currently in `funding_round`.
> The query below is already prepared for you. Run it and inspect the result.

The editor is compact at this point and retains the visible Lab **Run Query** button. It expands to its normal working size only when the learner reaches the Step 8 JOIN task.

### One persistent editor

Stage 1 uses the existing Lab SQL editor as a single persistent workspace.

Do not create separate editors for:

- the `COUNT(*)` baseline;
- the JOIN implementation;
- verification.

The baseline query remains in the editor after Step 5.

When the learner reaches the JOIN implementation, they continue working in the same editor and may write the new statement beneath the existing baseline query.

Moving between Stage 1 steps, opening hints, or checking reasoning answers must not erase or replace the SQL already in the editor.

### Completed reasoning review

Completed steps remain as compact cards. Their collapsed state shows the original question, selected answer, and a completion indicator. The learner can expand a card to review all choices, their selected choice, feedback, and any hints they opened. Reopening a completed card does not change its answer or completion state.

### Transition from reasoning to SQL

The learner route should therefore feel like:

```text
reason about the data
→ use SQL as a measurement tool
→ make a prediction
→ choose the relational operation
→ use the same SQL workspace to implement it
→ verify the result
```

The SQL editor is introduced as a tool inside the reasoning process rather than as the starting point of the stage.

### Still implementation-facing

Only cosmetic presentation details remain open, including:

- typography;
- spacing;
- colors;
- exact component styling;
- animation or transition effects.

These implementation choices must not change the visibility, sequencing, or persistence behavior specified above.
