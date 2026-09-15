# Cumulative INNER JOIN checkpoint

**Date:** 2026-09-15  
**Status:** HISTORICAL / SUPERSEDED CHECKPOINT DESIGN — NO CURRENT WORK AUTHORIZATION  
**Scope:** cumulative use of already-covered INNER JOIN reasoning with reduced cueing

This document preserves a corrected cumulative-checkpoint design considered earlier on 2026-09-15.

It is no longer the current next-design instruction. Subsequent repository work progressed beyond this checkpoint through the Stage 1–3 topology work, Wave 4, Wave 5A, and the Wave 5B decision gate.

Current work state is maintained in:

`course-experience-improvement-work-management.md`

The current next action is a separate evidence-based category-selection / mapping decision; this checkpoint does not authorize runtime work.

## 1. Correction and authority boundary

This document does **not** select a new business case or a new relation pair.

The previously approved business request retained in this historical checkpoint was:

> **The research team wants a list of all funding rounds, together with the current status of the company that raised each round.**

The retained relations were:

- `funding_round`
- `company`

The direct relationship was:

`funding_round.company_id` → `company.company_id`

An earlier version of this document incorrectly introduced `company → company_office` as a new selected case. That selection and every office-specific requirement derived from it were superseded by this correction.

No Stage 1, Stage 2, Stage 3, schema, seed, control, topology, or runtime change was authorized here.

---

## 2. What this checkpoint was intended to test

Using the approved business request and approved relation set, the learner would coordinate already-covered reasoning rather than receive a fully decomposed sequence of answers.

The learner would need to:

1. identify `funding_round` and `company` as the relations needed by the request;
2. identify `funding_round.company_id` as the connecting field and relate it to `company.company_id`;
3. establish the requested output Grain as one funding round per result row;
4. interpret the relevant Cardinality: each funding round belongs to one company, while one company can have multiple funding rounds;
5. predict before execution that adding company status should preserve the funding-round Grain and current funding-round row count;
6. select the already-known INNER JOIN because it implements the matched-row plan;
7. translate the relational plan into semantically correct SQL;
8. validate the actual result against the earlier Grain / relationship / row-count prediction.

The target was cumulative coordination of known reasoning, not new JOIN syntax teaching.

---

## 3. Evidence claim boundary

Because this relation pair and business domain were already part of the course history and the current course also uses `company` + `funding_round` elsewhere, this checkpoint must **not** be described as evidence of transfer to a materially unfamiliar relation pair.

Passing it could support only the bounded claim:

> The learner coordinated the approved funding-round/company INNER JOIN problem with reduced cueing: relation selection, relationship interpretation, output Grain, Cardinality-based row preservation, INNER JOIN implementation, and result verification.

It would not by itself establish:

- transfer to a new relation pair;
- independent performance on an unfamiliar database;
- mastery of row multiplication;
- mastery of zero-match disappearance / entity coverage;
- LEFT JOIN / NULL competence;
- aggregation / fan-out repair competence;
- bridge / many-to-many competence;
- full course-exit mastery.

---

## 4. Fixed business situation

Historical business request:

> **The research team wants a list of all funding rounds, together with the current status of the company that raised each round.**

The request was intended to establish the business need without pre-solving the relational plan for the learner.

At entry, the learner could inspect the current Live Schema and build the Working Schema from an empty state. The accepted relation set was `funding_round` + `company`; the learner was still expected to perform the relation-selection action rather than receive both relations preloaded.

---

## 5. Intended relational plan

The learner was expected to establish, rather than receive as a completed summary:

### Relevant relations

- `funding_round` supplies each recorded funding round and round-level fields;
- `company` supplies the requested current `status`.

### Direct relationship

`funding_round.company_id` references `company.company_id`.

### Requested output Grain

> one funding round per result row

Adding company context does not change what one requested row represents.

### Cardinality consequence relevant to this request

- each funding round belongs to one company;
- one company can be related to multiple funding rounds.

For this request, reasoning from the funding-round side mattered: every recorded funding round had one matching company row through the current non-null foreign key.

### Pre-execution prediction

Before SQL, the learner would predict that adding the matching company status should add information to each funding-round row rather than create or remove funding-round rows.

With the data at the time, the funding-round baseline was 26 rows, so the expected matched result was also 26 rows at funding-round Grain.

The value `26` was not intended to substitute for the relationship reasoning.

### Operation

Use the already-known INNER JOIN to combine each funding round with its matching company row.

This was cumulative application of known JOIN semantics, not a new Concept Moment.

---

## 6. Reduced-cueing requirement

The checkpoint was intended to be less decomposed than the first-exposure teaching encounter.

At entry it would provide:

- the approved business request;
- the Live Schema;
- an empty Working Schema / current relation-selection surface.

It would not pre-provide:

- the selected relation pair in learner-facing explanatory text;
- the connecting field;
- the completed PK/FK relationship;
- the target Grain as an answer;
- the Cardinality conclusion;
- the row-count conclusion;
- the instruction `use INNER JOIN`;
- a completed relational-plan summary.

Previously learned concepts could be named after the learner established the corresponding reasoning. They were not to be re-taught as first exposure.

---

## 7. Pre-SQL commitment

Before learner-authored SQL became the primary action, the learner was expected to commit the material plan:

- relevant relations;
- connecting relationship;
- requested output Grain;
- relevant Cardinality interpretation;
- expected row behavior;
- relational action / INNER JOIN choice.

Structured interactions remained acceptable. Open-text explanation was not required merely to make the checkpoint harder.

A prepared `COUNT(*)` measurement could be used as evidence if retained, but the numeric baseline could not replace the relationship reasoning.

---

## 8. SQL and result contract

The required logical output was:

`funding_round_id | company_id | round_type | announced_date | reported_total_amount | status`

A canonical semantic shape was:

```sql
SELECT
    fr.funding_round_id,
    fr.company_id,
    fr.round_type,
    fr.announced_date,
    fr.reported_total_amount,
    c.status
FROM funding_round AS fr
INNER JOIN company AS c
    ON fr.company_id = c.company_id;
```

Equivalent direct INNER JOIN formulations producing the same logical result would be accepted.

Historical current-data result contract:

- 26 rows;
- every current funding round represented exactly once;
- one result row per `funding_round_id`;
- correct company `status` associated with each funding round;
- required output fields present.

Row ordering was not part of correctness.

No aggregation, `DISTINCT`, LEFT JOIN, `EXISTS`, bridge traversal, or repair mechanism was part of this solution.

---

## 9. Post-execution verification

Successful SQL execution alone was not intended to be sufficient evidence.

With the actual result visible, the learner would reconcile it with the pre-execution plan:

- Does each result row still represent one funding round?
- Is every current funding round represented exactly once?
- Does the result contain the predicted 26 funding-round rows?
- Is the `status` attached from the matching company without changing the funding-round Grain?

---

## 10. Assistance boundary

This checkpoint did not define Wave 5.

No new global hint ladder, attempt-count escalation, adaptive assistance, automatic solution reveal, or support-reduction rule was established here.

Strong assistance was not to be counted silently as equivalent to unassisted cumulative evidence.

---

## 11. Historical relationship to the stronger cumulative-transfer question

The priority decision at that time identified a broader unresolved question: whether the learner could coordinate already-covered INNER JOIN reasoning in a genuinely new case.

This checkpoint intentionally did **not** answer that broader question by changing the approved business request or relation pair.

Any stronger new-case transfer claim would have required separate evidence and a separate explicit decision.

---

## 12. Current status / implementation boundary

This document does **not** authorize runtime implementation and no longer defines the next design step.

Its design content is retained as historical reasoning/provenance only.

Current work must follow `course-experience-improvement-work-management.md`, where the next action is category-selection / mapping and runtime remains held until that decision is complete.
