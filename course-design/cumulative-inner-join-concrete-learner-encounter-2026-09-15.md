# Cumulative INNER JOIN — concrete learner encounter

**Date:** 2026-09-15  
**Status:** CONCRETE ENCOUNTER DESIGN — NO RUNTIME CHANGE  
**Scope:** reduced-cueing cumulative coordination using the already-approved `funding_round` + `company` business problem

## 1. Fixed business request

Keep the already-approved request unchanged and persistently visible:

> **The research team wants a list of all funding rounds, together with the current status of the company that raised each round.**

This encounter does not create a new business problem, new relation pair, or new Stage number.

The accepted relations remain:

- `funding_round`
- `company`

The direct relationship remains:

`funding_round.company_id` → `company.company_id`

The purpose of this encounter is not to re-teach Grain, PK/FK, Cardinality, JOIN, or `INNER JOIN`. It tests whether the learner can coordinate those already-covered ideas with materially less decomposition.

---

## 2. Design principle

Do **not** reproduce the earlier pattern as a sequence of separate micro-steps such as:

`Grain → Cardinality → prediction → operation`

where each completed question supplies the premise for the next one.

Instead, after relation and connection establishment, require one **Relational Plan Commitment** that asks the learner to commit the material parts of the plan together.

The plan is checked as a coherent whole. Correctness feedback may identify which dimension still needs attention, but must not reveal the correct answer to the other unresolved dimensions.

A numeric `COUNT(*)` baseline comes only after this qualitative plan commitment. Therefore the value `26` can quantify the learner's already-established prediction but cannot substitute for the relational reasoning that produced it.

---

## 3. Encounter path and spatial ownership

Dominant actionable path:

`L Relations → R Connection → L Relational Plan Commitment → R Baseline Measurement + Interpretation → Split(L task / R SQL Workspace) → R Result Inspection → R Verification → L Complete`

This follows the current course-wide topology:

- ordinary set-level and relational reasoning is L-owned;
- direct Working-Schema field interaction is R-owned;
- prepared measurement, its evidence, and immediate interpretation are R-owned;
- SQL authoring is split: L task orientation, R editor/tools;
- Results and immediate verification are R-owned;
- completion is L-owned.

Feedback and `Continue` remain with the action that produced them. Handoffs occur only after the local continuation action.

---

## 4. Entry state — business request + relation selection

### Learner sees

- persistent Business Request;
- Live Schema;
- empty Working Schema;
- one L-owned prompt:

> **Which relations do you need to answer this request?**

The learner adds relations from Live Schema and uses `Check selection`.

### Correct set

- `funding_round`
- `company`

### Do not expose before correctness

- preselected relations;
- a statement that exactly two relations are required;
- the connecting key;
- PK/FK badges or connector;
- output Grain;
- Cardinality;
- expected row count;
- `JOIN` / `INNER JOIN` as an instruction.

### Feedback role

Wrong relation-set feedback may diagnose the business-information role that is missing or unnecessary under the already-established diagnostic-feedback rules, but must not simply name the required relation.

After the correct set is established, `Continue` remains in L and explicitly hands off to relationship establishment.

---

## 5. Relationship establishment — direct Working-Schema interaction

### Learner sees

The selected relations remain in Working Schema. The active interaction moves to R.

Concise orientation in L may say:

> **Now establish how a funding round connects to its company.**

The actual R-local prompt asks the learner to select the field in `funding_round` that identifies the related company.

### Correct field

`funding_round.company_id`

### After correctness

Reveal the already-known PK/FK structure locally in Working Schema:

`funding_round.company_id` (FK) → `company.company_id` (PK)

This is not a new Concept Moment. The course may name the reused PK/FK pattern, but should not re-teach it as first exposure.

The R-local `Continue` hands off to the Relational Plan Commitment.

---

## 6. Relational Plan Commitment — one coordinated reasoning surface

This is the central reduced-cueing change.

The learner sees one L-owned plan surface with four required decisions visible together. The surface should read as one plan, not four numbered lesson steps.

### A. Requested row meaning

Prompt:

> **What should one row in the requested result represent?**

Correct:

> one funding round

### B. Relationship consequence

Prompt:

> **Which relationship statement is consistent with the connection you established?**

Correct:

> Each funding round belongs to one company; one company can have multiple funding rounds.

### C. Expected row behavior

Prompt:

> **When the matching company status is added, what should happen to the funding-round rows?**

Correct:

> Keep one result row for each funding round; adding the matching company information should not by itself create or remove funding-round rows.

This is intentionally qualitative. No number is supplied yet.

### D. Relational operation

Prompt:

> **Which already-known relational operation implements this matched-row plan?**

Correct:

> `INNER JOIN`

Because JOIN / INNER JOIN are already learned by this point, asking for the operation by name is legitimate here. This is not a first-exposure semantic-action exercise.

### Interaction behavior

The learner commits all four decisions and then uses one `Check plan` action.

The system may identify which plan dimension is inconsistent, for example:

- row meaning / Grain conflict;
- relationship interpretation conflict;
- row-behavior prediction conflict;
- operation mismatch.

It must not reveal unresolved correct answers merely because another dimension is wrong.

After the whole plan is correct, show a compact reviewable plan summary built from the learner's decisions:

- Grain: one funding round per row;
- Relationship: each round → one company; company → potentially many rounds;
- Expected behavior: preserve the funding-round rows while adding company status;
- Operation: INNER JOIN on the established relationship.

This summary is the consequence of the learner's committed reasoning, not pre-task scaffolding.

No new Concept Moment appears here.

---

## 7. Baseline measurement — quantify an already-made prediction

After the qualitative plan is committed, make an explicit L→R measurement handoff.

### Prepared query

```sql
SELECT COUNT(*)
FROM funding_round;
```

The learner runs the prepared measurement in R.

### Result

`26`

### Immediate interpretation

Keep the result and the interpretation interaction local in R.

Ask:

> **What does 26 represent here?**

Correct:

> 26 recorded funding rounds.

Then ask the evidence-grounded numeric prediction:

> **If your relational plan is correct, how many result rows should the INNER JOIN return?**

Correct:

> 26

The explanation must connect the number back to the already-established reasoning:

> There are 26 starting funding-round rows, and the plan established that each one matches one company row. The expected result therefore remains 26 rows at funding-round Grain.

The number is confirmation/quantification of the plan. It is not the evidence from which the plan is inferred.

The R-local `Continue` explicitly hands off to SQL implementation.

---

## 8. SQL authoring

### L task orientation

Keep the business-facing task concise:

> **Implement the relational plan and return every funding round with the current status of its company.**

Do not reteach JOIN syntax before the learner acts.

### R SQL Workspace

R contains:

- active SQL editor;
- `Run query`;
- SQL diagnostics;
- optional `Desired Output`;
- optional `SQL Structure`;
- `Show solution` under current course-control semantics;
- Working Schema as a secondary reference.

### Required logical output

`funding_round_id | company_id | round_type | announced_date | reported_total_amount | status`

### Semantic acceptance

Accept equivalent direct INNER JOIN formulations that produce the required logical result. Do not require exact query text.

A correct result must:

- contain 26 rows;
- contain every current funding round exactly once;
- preserve one row per `funding_round_id`;
- attach the correct company `status`;
- expose the required logical fields.

No `DISTINCT`, aggregation, LEFT JOIN, `EXISTS`, bridge traversal, or repair strategy is part of the intended solution.

### Assistance

`Desired Output`, `SQL Structure`, and `Show solution` remain SQL-local assistance only.

`Show solution` populates the active editable editor, does not run SQL, and does not bypass result inspection or verification.

No new hint ladder or adaptive assistance policy is created by this encounter.

---

## 9. Result inspection

After accepted execution, Results become the primary R evidence surface.

The learner should be able to inspect the returned rows before being asked to verify them.

Do not immediately replace the result with a success summary that announces the final reasoning conclusion.

Execution success means the result passed the SQL semantic contract. It does not complete the encounter.

The R-local `Continue` moves into verification while Results remain visible.

---

## 10. Verification — one evidence-reconciliation check

Avoid splitting verification into multiple tiny questions.

Use one R-owned verification interaction that asks the learner to choose the statement that best reconciles the actual result with the earlier plan.

Correct interpretation must jointly capture:

- 26 result rows;
- one funding round per row;
- every current funding round represented exactly once;
- company status added from the matching company;
- funding-round Grain preserved.

A correct answer should express the integrated conclusion, for example:

> **The result matches the plan: all 26 funding rounds are still represented once each, and the matching company status was added without changing the funding-round Grain.**

Distractors should diagnose meaningful confusions such as:

- interpreting repeated company IDs/status values as duplicate funding rounds;
- treating the result as company Grain;
- claiming that one-to-many in the opposite direction must multiply this result;
- treating successful execution alone as proof without reconciling the rows.

Verification feedback remains local to Results in R.

After correct verification, the R-local `Continue` hands off to completion.

---

## 11. Completion

Completion appears in L as a phase-end state, not another numbered reasoning task.

The completed evidence remains reviewable:

- selected relations;
- established connection;
- Relational Plan Commitment;
- baseline measurement and numeric prediction;
- authored SQL / assistance provenance where already tracked;
- actual Results;
- final verification.

Do not add another business question, Concept Moment, or teaching explanation at completion.

---

## 12. Evidence model

### Core evidence

The strongest evidence in this encounter is:

1. correct relation selection from the business request;
2. correct direct connection-field establishment;
3. coherent Relational Plan Commitment across Grain, relationship interpretation, expected row behavior, and INNER JOIN selection;
4. numeric prediction after the baseline that is consistent with the already-committed qualitative plan;
5. semantically correct INNER JOIN result;
6. integrated result verification against the earlier plan.

### Supporting evidence

- correct interpretation of the baseline value `26`;
- inspection of the returned result;
- use of optional SQL scaffolds.

### Evidence-strength limit

This encounter supports a claim of **reduced-cueing cumulative coordination on the approved funding-round/company problem**.

It does not establish transfer to a materially new relation pair or unfamiliar database.

---

## 13. Protected information / reveal order

Before relation selection, do not reveal the accepted relation set.

Before connection establishment, do not reveal the PK/FK connector.

Before Plan Commitment, do not reveal:

- Grain = funding round;
- Cardinality conclusion;
- row-preservation conclusion;
- INNER JOIN as the required operation.

Before the plan is qualitatively correct, do not use `26` as a prompt toward the row-behavior answer.

Before SQL execution, do not reveal the actual 26-row joined result.

Before verification, do not announce the integrated final conclusion.

---

## 14. What is deliberately removed compared with a first-exposure lesson

This encounter contains no:

- new Grain Concept Moment;
- new PK/FK Concept Moment;
- new Cardinality Concept Moment;
- semantic-action-before-JOIN naming sequence;
- standalone JOIN teaching sequence;
- INNER JOIN syntax lesson;
- separate Grain question followed by separate Cardinality question followed by separate prediction question followed by separate operation question;
- new business requirement at the end.

The learner is expected to reuse those ideas.

---

## 15. Implementation boundary

This document is design only.

It does **not** authorize runtime changes.

Before implementation, the design should be checked for one narrow question:

> Does the concrete interaction genuinely reduce cueing while preserving all required reasoning evidence, or has the Relational Plan Commitment simply compressed four leading micro-prompts into one answer-shaped form?

Only after that design question is resolved should runtime work begin.
