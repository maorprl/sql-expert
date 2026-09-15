# Cumulative INNER JOIN checkpoint

**Date:** 2026-09-15  
**Status:** CURRENT CHECKPOINT DESIGN — ALIGNED TO PREVIOUSLY APPROVED BUSINESS CASE — NO RUNTIME CHANGE  
**Scope:** cumulative use of already-covered INNER JOIN reasoning with reduced cueing

## 1. Correction and authority boundary

This document does **not** select a new business case or a new relation pair.

The previously approved business request is retained:

> **The research team wants a list of all funding rounds, together with the current status of the company that raised each round.**

The previously decided relations are retained:

- `funding_round`
- `company`

The direct relationship is:

`funding_round.company_id` → `company.company_id`

The earlier version of this document incorrectly introduced `company → company_office` as a new selected case. That selection and every office-specific requirement derived from it are superseded by this correction.

No Stage 1, Stage 2, Stage 3, schema, seed, control, topology, or runtime change is authorized here.

---

## 2. What this checkpoint can legitimately test

Using the approved business request and approved relation set, the learner should coordinate already-covered reasoning rather than receive a fully decomposed sequence of answers.

The learner should be able to:

1. identify `funding_round` and `company` as the relations needed by the request;
2. identify `funding_round.company_id` as the connecting field and relate it to `company.company_id`;
3. establish the requested output Grain as one funding round per result row;
4. interpret the relevant Cardinality: each funding round belongs to one company, while one company can have multiple funding rounds;
5. predict before execution that adding company status should preserve the funding-round Grain and current funding-round row count;
6. select the already-known INNER JOIN because it implements the matched-row plan;
7. translate the relational plan into semantically correct SQL;
8. validate the actual result against the earlier Grain / relationship / row-count prediction.

The target is cumulative coordination of known reasoning, not new JOIN syntax teaching.

---

## 3. Evidence claim boundary

Because this relation pair and business domain are already part of the course history and the current course also uses `company` + `funding_round` elsewhere, this checkpoint must **not** be described as evidence of transfer to a materially unfamiliar relation pair.

Passing it may support the bounded claim:

> The learner coordinated the approved funding-round/company INNER JOIN problem with reduced cueing: relation selection, relationship interpretation, output Grain, Cardinality-based row preservation, INNER JOIN implementation, and result verification.

It does **not** by itself establish:

- transfer to a new relation pair;
- independent performance on an unfamiliar database;
- mastery of row multiplication;
- mastery of zero-match disappearance / entity coverage;
- LEFT JOIN / NULL competence;
- aggregation / fan-out repair competence;
- bridge / many-to-many competence;
- full course-exit mastery.

Any stronger new-case transfer claim requires separate evidence; this document does not invent a new case to manufacture that evidence.

---

## 4. Fixed business situation

Business request:

> **The research team wants a list of all funding rounds, together with the current status of the company that raised each round.**

The request establishes the business need but should not pre-solve the relational plan for the learner.

At entry, the learner may inspect the current Live Schema and build the Working Schema from an empty state. The design knows the accepted relation set is `funding_round` + `company`; the learner should still perform the relation-selection action rather than receive both relations preloaded.

Do not add a second business question merely to make the checkpoint appear more cumulative.

---

## 5. Intended relational plan

The learner must establish, rather than receive as a completed summary:

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

For this request, reasoning from the funding-round side matters: every recorded funding round has one matching company row through the current non-null foreign key.

### Pre-execution prediction

Before SQL, the learner should predict that adding the matching company status should add information to each funding-round row rather than create or remove funding-round rows.

With the current data, the funding-round baseline is 26 rows, so the expected matched result is also 26 rows at funding-round Grain.

The value `26` must not be treated as the reasoning itself. The evidence is the relationship-based explanation for why the count should be preserved.

### Operation

Use the already-known INNER JOIN to combine each funding round with its matching company row.

This is cumulative application of known JOIN semantics, not a new Concept Moment.

---

## 6. Reduced-cueing requirement

The checkpoint should be less decomposed than the first-exposure teaching encounter.

At entry provide:

- the approved business request;
- the Live Schema;
- an empty Working Schema / current relation-selection surface.

Do not pre-provide:

- the selected relation pair in learner-facing explanatory text;
- the connecting field;
- the completed PK/FK relationship;
- the target Grain as an answer;
- the Cardinality conclusion;
- the row-count conclusion;
- the instruction `use INNER JOIN`;
- a completed relational-plan summary.

Previously learned concepts may be named after the learner establishes the corresponding reasoning. They should not be re-taught as first exposure.

The interaction must not become a sequence of micro-prompts where each prompt states the premise needed for the next answer. The purpose is to see whether the learner can coordinate the known pieces with materially less guidance.

---

## 7. Pre-SQL commitment

Before learner-authored SQL becomes the primary action, the learner must have committed the material plan:

- relevant relations;
- connecting relationship;
- requested output Grain;
- relevant Cardinality interpretation;
- expected row behavior;
- relational action / INNER JOIN choice.

Structured interactions remain acceptable. Open-text explanation is not required merely to make the checkpoint harder.

A prepared `COUNT(*)` measurement may still be used as evidence if retained, but the design must not allow the numeric baseline to replace the relationship reasoning.

---

## 8. SQL and result contract

The required logical output remains:

`funding_round_id | company_id | round_type | announced_date | reported_total_amount | status`

A canonical semantic shape is:

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

Equivalent direct INNER JOIN formulations that produce the same logical result should be accepted.

Current-data result contract:

- 26 rows;
- every current funding round represented exactly once;
- one result row per `funding_round_id`;
- correct company `status` associated with each funding round;
- required output fields present.

Row ordering is not part of correctness.

No aggregation, `DISTINCT`, LEFT JOIN, `EXISTS`, bridge traversal, or repair mechanism is part of this solution.

---

## 9. Post-execution verification

Successful SQL execution is not sufficient evidence.

With the actual result visible, the learner must reconcile it with the pre-execution plan:

- Does each result row still represent one funding round?
- Is every current funding round represented exactly once?
- Does the result contain the predicted 26 funding-round rows?
- Is the `status` attached from the matching company without changing the funding-round Grain?

The verification should test the learner's earlier reasoning rather than introduce a new business requirement after execution.

---

## 10. Assistance boundary

This checkpoint does not define Wave 5.

Current course-control semantics remain unchanged. SQL-local assistance such as Desired Output, SQL Structure, and Show solution may behave only as already established by current course authority.

No new global hint ladder, attempt-count escalation, adaptive assistance, automatic solution reveal, or support-reduction rule is established here.

Strong assistance must not silently be counted as equivalent to unassisted cumulative evidence.

---

## 11. Relationship to the stronger cumulative-transfer question

The current pedagogical priority decision identifies a broader unresolved question: whether the learner can coordinate already-covered INNER JOIN reasoning in a genuinely new case.

This corrected checkpoint intentionally does **not** answer that broader question by changing the approved business request or relation pair.

It first preserves the already-approved cumulative INNER JOIN problem exactly where the course had already made that content decision.

If the course later requires evidence on a materially new relation pair, that must be an explicit later decision. It must not be smuggled into this checkpoint by replacing the approved case.

---

## 12. Implementation boundary

This document does not authorize runtime implementation.

The next design step is to translate this corrected checkpoint into the concrete learner encounter while preserving:

- the approved business request;
- the approved `funding_round` + `company` relation set;
- reduced cueing;
- pre-SQL relational-plan commitment;
- current course-level control and topology semantics;
- semantic SQL acceptance rather than exact query-text matching;
- actual-result-based verification;
- no new relational concept.
