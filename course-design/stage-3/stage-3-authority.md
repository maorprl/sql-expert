# Lesson 3 authority — INNER JOIN zero matches and entity coverage

**Status:** CURRENT AUTHORITY — DESIGN COMPLETE / NOT YET IMPLEMENTED  
**Scope:** Lesson 3 encounter-local pedagogy, sequence, evidence, reveal timing, SQL/result contract, and implementation boundary

This document is the current Lesson 3 design authority. It was established freshly from the accepted Lessons 1–2 baseline through the current learner-encounter production process.

The older files `course-design/stage-3/stage-3-learner-route.md` and `course-design/stage-3/stage-3-interaction-decisions.md` remain preserved candidate/history. Where they overlap, this document is the current authority.

For course-wide behavior, this Lesson remains constrained by:

- `pedagogical-foundations.md`;
- `course-design/course-visual-language.md`;
- `course-design/course-controls.md`;
- `course-exit-criteria.md`;
- `course-knowledge-map.md`;
- the current startup-ecosystem schema and seed data.

---

## 1. Encounter purpose and gist

Lesson 3 extends the learner's existing INNER JOIN reasoning to the missing case in the current progression:

- Lesson 1: one match;
- Lesson 2: multiple matches;
- Lesson 3: **zero matches**.

The new relational reasoning capability is:

> In an INNER JOIN, a starting row with zero matching rows contributes zero result rows.

The analytical consequence developed from that mechanism is:

> Total result-row count does not establish entity coverage.

The learner must be able to distinguish a result that is correct at funding-round Grain from a result that represents every company.

No new SQL join syntax is introduced in this Lesson. The novelty is the row-survival reasoning.

---

## 2. Business case and relation pair

The investment team is validating a funding-round report. The report should show every recorded funding round together with the company's status. The team already knows one concrete edge case in the current data: `Lumina Bio` (`company_id = 20`) exists as a company but has no recorded funding round. They need to understand what the familiar INNER JOIN report does with that zero-match company, and what that means for company coverage.

The relevant relations are:

- `company` — one row per company;
- `funding_round` — one row per recorded funding round.

The direct relationship is:

`funding_round.company_id` → `company.company_id`

Each funding round belongs to one company. A company can have zero, one, or multiple recorded funding rounds.

The current seed grounds that known zero-match case:

- 12 company rows;
- 26 funding-round rows;
- `Lumina Bio` (`company_id = 20`) exists in `company` and has no row in `funding_round`.

This source-data fact is supplied as the concrete case premise. The learner is not required to rediscover it through a separate pre-SQL comparison task. Supplying the fact does not supply the protected INNER JOIN conclusion.

---

## 3. Course-assumed learner state

Lesson 3 reuses, rather than re-teaches as first exposure:

- relation identification from a business question;
- direct PK/FK relationship reading;
- Grain;
- Cardinality;
- prepared data inspection / measurement as a reasoning aid;
- prediction before execution;
- INNER JOIN and `ON`;
- learner-authored SQL;
- result inspection and verification.

Prior exposure is not treated as proof of mastery. The learner still performs the reasoning moves needed by this encounter.

Lesson 3 must not assume or teach as part of its required path:

- LEFT JOIN;
- NULL semantics from unmatched outer-join rows;
- aggregation;
- EXISTS / NOT EXISTS;
- DISTINCT as a repair mechanism;
- fan-out repair;
- broader independent end-to-end transfer.

---

## 4. Learner journey

1. **Identify the relevant relations.**  
   From the business question and Live Schema, the learner identifies `company` and `funding_round`. This is reused relation-selection reasoning.

2. **Identify the direct connection and confirm relationship meaning.**  
   The learner identifies `funding_round.company_id` as the field that links a funding round to its company. After that action, the reused PK/FK relationship may be shown. The encounter confirms compactly that a company can have zero, one, or many funding rounds and each funding round belongs to one company. The structural possibility of zero matches may be established here; the INNER JOIN consequence must not be supplied here.

3. **Establish requested result Grain.**  
   One requested result row represents one recorded funding round with company context. Company coverage is a separate validation question and must not redefine the result as one company per row.

4. **Protected prediction: reason about the concrete zero-match case under INNER JOIN.**  
   The encounter supplies the source-grounded case premise: `Lumina Bio` (`company_id = 20`) exists in `company` and has zero recorded funding rounds. Before SQL authoring or any joined-result reveal, the learner predicts what INNER JOIN will do with that zero-match company. The required reasoning is: zero matching row pairs → zero result rows contributed by that company.

5. **Explain and name the mechanism.**  
   Only after the learner has produced the prediction, the course explains the mechanism explicitly: **zero matches → zero INNER JOIN result rows**. The explanation connects the supplied zero-match case to INNER JOIN row survival without introducing LEFT JOIN or NULL.

6. **Implement the familiar INNER JOIN.**  
   The learner authors the company-to-funding-round INNER JOIN. INNER JOIN and `ON` are reused syntax; no new join syntax is taught.

7. **Inspect and verify actual Results.**  
   A semantically correct result contains all 26 funding-round rows at funding-round Grain. The learner verifies from the actual result that `company_id = 20` is absent.

8. **Answer the original coverage question.**  
   The learner concludes that a 26-row funding-round report can be correct at funding-round Grain while representing only 11 of the 12 companies. Total result-row count therefore does not prove entity coverage.

Completion visibly closes this reasoning thread rather than adding a new repair task.

---

## 5. Protected evidence and reveal constraints

The core protected inference is:

> What does INNER JOIN do when the supplied case company has zero matching funding-round rows?

Before the learner produces that prediction:

- do not state that the zero-match company will disappear from the result;
- do not show a finished joined result that demonstrates the disappearance;
- do not frame the zero-cardinality possibility as equivalent to the INNER JOIN consequence;
- do not introduce LEFT JOIN as a solution;
- do not introduce NULL as the expected unmatched-row representation;
- do not provide answer wording, visuals, or scaffolding from which the learner can select the correct consequence without performing the relational reasoning.

The structural statement that a company **can** have zero funding rounds is a permitted premise. The concrete source-data fact that `Lumina Bio` currently has zero recorded funding rounds is also a permitted supplied premise. The protected inference is the effect of that realized zero-match case under INNER JOIN.

No pre-SQL source-data comparison, hidden query result, or separate discovery task is required to establish the case. The learner's ownership begins with the INNER JOIN consequence: they must still predict the result-row contribution before that consequence is explained or shown.

---

## 6. SQL and result contract

The required logical output fields are:

`company_id | status | funding_round_id | round_type | announced_date`

The accepted logical result is the direct INNER JOIN of `company` and `funding_round` on the established company-id relationship:

- 26 funding-round-grain rows;
- every current funding round represented exactly once;
- correct company status attached to each funding round;
- `company_id = 20` absent because it has zero matching funding-round rows.

Equivalent direct INNER JOIN formulations may be accepted when they satisfy the same logical result and relationship semantics.

The required solution must not use LEFT JOIN, aggregation, DISTINCT, EXISTS, or another mechanism that changes the intended relational path.

---

## 7. Completion evidence

Lesson 3 completion requires evidence that the learner has:

- selected the relevant relations;
- identified the connecting company-id relationship;
- confirmed the relevant company-to-funding-round cardinality;
- established funding-round result Grain;
- used the supplied source-grounded case of a company with zero funding-round matches;
- predicted that the company contributes zero INNER JOIN result rows;
- produced a semantically correct INNER JOIN result;
- verified from actual Results that the zero-match company is absent;
- concluded that 26 result rows do not establish coverage of all 12 companies.

Correct SQL alone is not sufficient completion evidence.

---

## 8. Implementation boundary

Implementation must preserve:

- the one-match → multiple-matches → zero-matches conceptual progression;
- compact reuse of already introduced concepts rather than first-exposure re-teaching;
- a clear, source-grounded zero-match case premise without a separate discovery task;
- learner ownership of the pre-execution INNER JOIN survival prediction;
- the reveal boundary separating structural optionality from INNER JOIN consequence;
- funding-round result Grain;
- actual-result-based verification;
- the final distinction between result-row count and entity coverage;
- all applicable current course-wide visual, control, and assistance authority.

Implementation may choose, within current visual/control authority:

- exact component composition;
- exact wording polish that preserves reasoning ownership and non-preemption;
- the concise presentation of the supplied zero-match case premise;
- technical state representation;
- semantic-validator implementation details;
- local styling consistent with current visual roles.

Implementation must stop rather than invent a material learner-facing decision if these requirements prove ambiguous or infeasible.

---

## 9. Explicitly out of scope

Lesson 3 does not teach how to preserve unmatched companies.

The following remain outside this Lesson:

- LEFT JOIN;
- outer-join row preservation;
- NULL interpretation for unmatched joined attributes;
- aggregation;
- EXISTS / NOT EXISTS;
- DISTINCT;
- repair strategies.

A later encounter may use the need to preserve unmatched companies as the reason to introduce LEFT JOIN. This document does not authorize that later encounter or fix its full design.
