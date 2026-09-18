# Lesson 3 authority — INNER JOIN zero matches and entity coverage

**Status:** CURRENT AUTHORITY — RECONCILED REVIEW BASELINE / NOT YET IMPLEMENTED  
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

The investment team has received a funding-round report. The report is intended to show every recorded funding round together with the company's status. QA has flagged one concrete symptom: `Lumina Bio` (`company_id = 20`) is in the company list but is missing from the report. The learner's task is to investigate why.

The relevant relations are:

- `company` — one row per company;
- `funding_round` — one row per recorded funding round.

The direct relationship is:

`funding_round.company_id` → `company.company_id`

Each funding round belongs to one company. A company can have zero, one, or multiple recorded funding rounds.

The current seed grounds the investigation:

- 12 company rows;
- 26 funding-round rows;
- `Lumina Bio` (`company_id = 20`) exists in `company`;
- `Lumina Bio` has no row in `funding_round`.

The missing-company symptom may be supplied at the start. The fact that Lumina has zero matching funding rounds must **not** be supplied as an unexplained premise. The learner establishes that fact by running the visible prepared source check defined in the learner journey below.

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
   From the missing-company investigation and Live Schema, the learner identifies `company` and `funding_round`. This is reused relation-selection reasoning.

2. **Identify the direct connection and confirm relationship meaning.**  
   The learner identifies `funding_round.company_id` as the field that links a funding round to its company. After that action, the reused PK/FK relationship may be shown. The encounter confirms compactly that a company can have zero, one, or many funding rounds and each funding round belongs to one company. The structural possibility of zero matches may be established here; Lumina's actual match count and the INNER JOIN consequence must not be supplied here.

3. **Establish requested result Grain.**  
   One requested report row represents one recorded funding round with company context. Company coverage is a separate diagnostic consequence and must not redefine the report as one company per row.

4. **Investigate the reported symptom with an explicit source check.**  
   The course shows a prepared SQL check and the learner explicitly runs it:

   ```sql
   SELECT COUNT(*) AS matching_rounds
   FROM funding_round
   WHERE company_id = 20;
   ```

   Only after the learner runs the visible check does the result establish that Lumina has `0` matching funding-round rows. The result must be visibly attributable to this query; no hidden comparison table or unexplained data surface substitutes for it.

5. **Protected prediction: reason about zero matches under INNER JOIN.**  
   With the source fact now established, and before report SQL authoring or any joined-result reveal, the learner predicts how many INNER JOIN result rows a company row with zero matching funding-round rows can contribute. The required reasoning is: zero matching row pairs → zero result rows.

6. **Explain and name the mechanism.**  
   Only after the learner has produced the prediction, the course explains the mechanism explicitly: **zero matches → zero INNER JOIN result rows**. The explanation connects the just-run source check to INNER JOIN row survival without introducing LEFT JOIN or NULL.

7. **Implement the familiar INNER JOIN.**  
   The learner authors the direct company-to-funding-round INNER JOIN for the report. INNER JOIN and `ON` are reused syntax; no new join syntax is taught.

8. **Inspect and verify actual Results.**  
   A semantically correct result contains all 26 funding-round rows at funding-round Grain. The learner verifies from the actual result that `company_id = 20` is absent, reproducing the reported symptom.

9. **Close the investigation and generalize the coverage consequence.**  
   The learner explains why Lumina is missing: it has zero matching funding-round rows, so INNER JOIN forms zero matched row pairs for it. The encounter then closes the analytical consequence: a 26-row funding-round report can be correct at funding-round Grain while representing only 11 of the 12 companies. Total result-row count therefore does not prove entity coverage.

Completion visibly closes this reasoning thread rather than adding a new repair task.

---

## 5. Protected evidence and reveal constraints

The encounter has two sequential protected discoveries:

1. **Source fact:** does Lumina actually have any matching `funding_round` rows?
2. **Relational consequence:** given zero matches, what does INNER JOIN contribute for that company?

At the opening, the course may state only the reported symptom:

> `Lumina Bio` exists in the company list but is missing from the funding-round report.

Before the learner runs the prepared source check:

- do not state that Lumina has zero funding rounds;
- do not show a source-data table, deduplicated coverage list, or hidden-query output that reveals that fact;
- do not state or show the INNER JOIN consequence.

After the learner runs the prepared source check, the course may explicitly confirm:

> `matching_rounds = 0`

That confirmation is source evidence, not yet the INNER JOIN conclusion.

Before the learner produces the protected numeric prediction:

- do not state that Lumina contributes zero INNER JOIN rows;
- do not show a finished joined result that demonstrates the disappearance;
- do not introduce LEFT JOIN as a repair;
- do not introduce NULL as an unmatched-row representation;
- do not provide selectable answer wording that gives away the numeric consequence.

Only after the learner predicts `0` may the course explicitly teach:

> zero matching row pairs → zero INNER JOIN result rows

The evidence provenance must stay legible: the zero-match fact comes from the visible prepared SQL the learner ran, and the later missing-company verification comes from the learner-authored report query.

---

## 6. SQL and result contract

The required logical output fields are:

`company_id | status | funding_round_id | round_type | announced_date`

The accepted logical result is the direct INNER JOIN of `company` and `funding_round` on the established company-id relationship. The learner-facing authoring prompt starts from `company` so the missing-company diagnosis remains conceptually legible:

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
- run the visible prepared source check for `company_id = 20`;
- established from that check that Lumina has zero matching funding-round rows;
- predicted that a zero-match company contributes zero INNER JOIN result rows;
- produced a semantically correct direct INNER JOIN result;
- verified from actual Results that `company_id = 20` is absent;
- explained the reported missing-company symptom from the zero-match mechanism;
- concluded that 26 result rows do not establish coverage of all 12 companies.

Correct SQL alone is not sufficient completion evidence.

---

## 8. Implementation boundary

Implementation must preserve:

- the one-match → multiple-matches → zero-matches conceptual progression;
- compact reuse of already introduced concepts rather than first-exposure re-teaching;
- a concrete missing-company symptom that motivates the investigation without revealing its cause;
- explicit learner-run source evidence for Lumina's actual zero-match state;
- learner ownership of the pre-execution INNER JOIN survival prediction;
- the reveal boundary separating structural optionality from INNER JOIN consequence;
- funding-round result Grain;
- actual-result-based verification;
- the final distinction between result-row count and entity coverage;
- all applicable current course-wide visual, control, and assistance authority.

Implementation may choose, within current visual/control authority:

- exact component composition;
- exact wording polish that preserves reasoning ownership and non-preemption;
- the concise presentation of the reported missing-company symptom and the visible prepared source check;
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
