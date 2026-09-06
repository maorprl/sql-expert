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

### Step 3 — Identify where the requested information lives

Prompt:

> **Which relation contains the company status we need to add to each funding round?**

Answer options:

- `funding_round`
- `company`

Correct answer:

> `company`

Follow-up prompt:

> **Which column connects a funding round to its company?**

Correct answer:

> `company_id`

Feedback:

> `funding_round.company_id` identifies the company associated with each funding round.

---

### Step 4 — Reason about the relationship in both directions

Prompt 1:

> **For one row in `funding_round`, how many rows in `company` should its `company_id` match?**

Answer options:

- zero
- one
- many

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

> **If we add `company.status` to every funding round, what should happen to the number of rows?**

Answer options:

- fewer than 26
- exactly 26
- more than 26
- cannot be predicted from the relationship

Correct answer:

> **exactly 26**

Follow-up prompt:

> **Why?**

Accepted reasoning:

> Each funding round matches one company, so adding the company's status should add information to the existing funding-round row rather than create additional funding-round rows.

Feedback:

> Correct. The expected output grain remains one funding round per row, so the expected row count remains 26.

---

### Step 7 — SQL implementation

Task wording:

> **Write a query that returns every funding round together with the current `status` of the company that raised it.**

Minimum required output columns:

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

### Step 8 — Verify the result

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
→ implement the join
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
- produced a SQL result that correctly adds `status`;
- verified that the result still has 26 rows;
- correctly identified the final result grain as one funding round per row.

Interaction rules for hints, wrong answers, automatic checking, and completion behavior are defined separately in `stage-1-interaction-decisions.md`.

---

## 9. Remaining OPEN items

Only implementation-facing presentation details remain open here:

- exact visual arrangement of the two relations;
- whether example rows appear inline or in an expandable data preview;
- exact typography and visual treatment of the introduced terms `grain` and `cardinality`;
- exact visual transition between reasoning steps and the SQL editor.

The learner-route content itself is specified above.
