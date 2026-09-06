# Stage 1 — Interaction Decisions

**Status:** WORKING  
**Scope:** Stage 1 only  
**Role:** Detailed interaction contract for the Stage 1 learner route

This document defines how the system supports, checks, and responds to the learner during Stage 1.

It is separate from `stage-1-learner-route.md`.

---

## 1. General interaction rule

Stage 1 uses explicit scaffolding because it is the first learner encounter.

The learner should be required to perform the reasoning, while the interface makes the reasoning steps visible and checkable.

The system must not reveal future steps merely because the learner makes an error in the current step.

---

## 2. Hints

### Hint model

Each reasoning step has up to **two hint levels**.

#### Hint 1 — directional

Points the learner toward the relevant evidence without giving the answer.

#### Hint 2 — stronger

Narrows the reasoning substantially but still does not reveal the complete SQL solution.

There is no automatic solution reveal.

---

### Step 2 — output grain hints

Prompt:

> What should one row in the requested result represent?

Hint 1:

> Look at the wording of the business request: what does it ask us to list all of?

Hint 2:

> The company status is extra information being added. The main thing being listed is still the funding round.

---

### Step 3 — information-location hints

Prompt:

> Which relation contains the company status we need to add?

Hint 1:

> Inspect the columns of the two relations.

Hint 2:

> `funding_round` contains information about the round. Look at `company` for an attribute describing the company's current state.

For the connecting column:

Hint 1:

> Look for a column that appears in both relations.

Hint 2:

> Compare `funding_round.company_id` with `company.company_id`.

---

### Step 4 — relationship hints

For:

> For one row in `funding_round`, how many rows in `company` should its `company_id` match?

Hint 1:

> Ask what `company_id` identifies in the `company` relation.

Hint 2:

> A funding round belongs to a specific company.

For:

> Can one company be related to more than one funding round?

Hint 1:

> Look at the example rows in `funding_round`. Does the same `company_id` appear more than once?

Hint 2:

> Company `1` appears in several funding-round rows.

---

### Step 5 — `COUNT(*)` hints

If the learner does not know what to run:

Hint 1:

> We need a baseline for the number of rows in `funding_round`.

Hint 2:

> Use `COUNT(*)` on `funding_round`.

If the learner misinterprets 26:

Hint 1:

> `COUNT(*)` counts rows. What does one row in `funding_round` represent?

Hint 2:

> The relation's grain is one funding round per row.

---

### Step 6 — prediction hints

Hint 1:

> Start from one funding-round row. How many company rows should it match?

Hint 2:

> If each funding round matches one company, adding one company's `status` should add a value to the row rather than multiply it.

---

### Step 7 — SQL hints

Hint 1:

> The requested columns come from two relations connected by `company_id`.

Hint 2:

> Join `funding_round` to `company` using their `company_id` columns.

The hint must not provide the full query text.

---

## 3. Wrong-answer behavior

### Closed reasoning questions

On the first wrong answer:

- mark the answer as incorrect;
- give short local feedback;
- keep the learner on the same reasoning step;
- expose the Hint 1 option prominently.

On another wrong attempt:

- keep the learner on the same step;
- make Hint 2 available.

The system does not automatically advance after an incorrect answer.

### Example local feedback

Wrong output grain:

> Not quite. The request asks for every funding round, with company status added to it. Reconsider what the main row still represents.

Wrong relationship direction:

> Check the relationship from one funding round to `company`, not from one company to all of its rounds.

Wrong row-count prediction:

> Compare your prediction with the relationship you just identified: how many company rows should one funding round match?

---

## 4. SQL error behavior

If SQL is syntactically invalid:

- show the normal readable SQLite error from the neutral Lab;
- do not mark the relational reasoning steps as wrong;
- keep the learner's SQL intact;
- allow immediate correction and rerun.

If SQL executes but returns the wrong result:

- do not reveal the correct query;
- report that the result does not satisfy the Stage 1 task;
- point the learner back to the current expected grain and row-count prediction.

Example:

> Your query ran, but the result does not match the Stage 1 prediction. You expected one row per funding round and 26 rows total. Inspect how the relations were combined.

---

## 5. Automatic checks

### Closed reasoning checks

The following are checked directly:

- output grain = funding round;
- status source = `company`;
- connecting column = `company_id`;
- one funding round → one company;
- one company → potentially many funding rounds;
- baseline meaning = 26 funding rounds;
- predicted row count after combination = 26;
- final grain = funding round.

### SQL result check

The SQL check is result-based, not exact-text-based.

A correct result must satisfy all of the following:

- 26 rows;
- one row per `funding_round_id`;
- every funding round in the seed data is present;
- returned `status` matches the related `company.status`;
- the required output fields are present.

The checker must accept equivalent SQL formulations that produce the correct result.

It must not require a specific alias style, formatting style, or exact query string.

---

## 6. Stage 1 scaffolding behavior

The route is sequential.

The learner should not receive the SQL task before completing the reasoning steps that establish:

- output grain;
- source of the missing information;
- relationship;
- baseline;
- prediction.

This sequencing is a Stage 1 decision.

It is not yet a course-wide rule.

The full future learner route should not be displayed as a checklist of answers in advance.

---

## 7. UI behavior

### Required

The business request remains visible or immediately accessible throughout the stage.

The learner can inspect the relevant schema.

The neutral SQL editor and result table are used directly when the learner reaches the SQL portion.

The learner's editor contents must not be reset by:

- checking a reasoning answer;
- opening a hint;
- moving between Stage 1 steps;
- receiving SQL feedback.

### Still implementation-dependent

The exact visual layout is not prescribed here.

Codex may choose an appropriate implementation for:

- panel placement;
- accordion versus step cards;
- spacing;
- responsive behavior;
- visual emphasis;
- transitions.

These choices must not alter the learner route or reveal future answers.

---

## 8. Completion

Stage 1 is complete only when all required route checks have passed.

Required evidence:

- correct output grain;
- correct information source;
- correct relationship reasoning;
- correct baseline interpretation;
- correct prediction;
- correct SQL result;
- correct final-grain verification.

A query merely executing without error is insufficient.

### Hint usage

Using a hint does **not** prevent Stage 1 completion.

Hint usage may be recorded internally if useful later, but Stage 1 does not define mastery tiers or penalize the learner for using hints.

---

## 9. Retry behavior

The learner may retry reasoning questions and SQL without a fixed attempt limit.

Wrong attempts do not erase previous work.

The system should prefer local corrective feedback and optional hints over forced solution reveal.

---

## 10. Remaining OPEN items

The following remain implementation-facing rather than pedagogical:

- exact visual layout;
- exact component styling;
- whether hints open inline, in a popover, or in a side panel;
- visual completion indicator;
- animation or transition behavior.

The Stage 1 interaction behavior itself is specified above.
