# Stage 3 learner route — INNER JOIN unmatched company coverage

The business request remains visible as context; it is not a learner step:

> The investment team is validating a funding-round report. It should show every recorded funding round with the company's status, and they also need to know whether every company is represented in the report.

Stage 3 develops one new relational reasoning capability on top of the already-learned INNER JOIN: a starting row with zero matches contributes zero result rows. The encounter also makes explicit that total result-row count is not the same thing as entity coverage.

The result itself remains funding-round grain. The company-coverage question is a validation question about what that result represents; it does not change the result grain to one company per row.

The route contains eight learner episodes followed by a completion state.

1. **Identify relevant relations.** From the live schema, identify `company` and `funding_round` as the relations needed for the funding-round report and its company context.

2. **Re-establish the relationship.** Identify `funding_round.company_id` as the column that identifies the company a round belongs to. Reuse the already-learned PK/FK pattern: `funding_round.company_id` references `company.company_id`. Then reason about the relationship in both directions: one company can have zero, one, or many recorded funding rounds; each funding round belongs to one company. This is reused relational knowledge, not a new JOIN lesson.

3. **Establish result grain.** From the business request, identify one requested result row as one recorded funding round with company context alongside it. The result Grain remains one funding round per row even when company attributes repeat across several rounds.

4. **Generate evidence about company coverage.** The learner runs two prepared measurement queries rather than receiving the zero-match premise from the system. First run `SELECT company_id, name FROM company;` to establish the companies that exist. Then run `SELECT company_id, funding_round_id FROM funding_round;` and compare the two result sets. The learner identifies the company that exists in `company` but has no matching `funding_round` row. With the current seed this is Lumina Bio (`company_id 20`). The purpose of this evidence is explicit: the business question asks whether every company is represented in the funding-round report, so a real zero-match company is the case needed to test that coverage.

5. **Predict INNER JOIN row survival.** Before writing SQL, use the learner-generated zero-match evidence to predict what the already-known INNER JOIN will do with that company row. The intended reasoning is: zero matching row pairs means that starting company row contributes zero result rows. Do not introduce `NULL` here; the learner has not generated an outer-join row containing `NULL`, and `NULL` is not needed to establish INNER JOIN survival behavior.

6. **Implement the INNER JOIN.** Write the company-to-funding-round INNER JOIN using the established key relationship and return the existing five-column output contract: `company_id`, `status`, `funding_round_id`, `round_type`, `announced_date`. No new JOIN syntax is introduced. Result validation remains semantic rather than exact-string based.

7. **Verify the prediction from Results.** With the actual result visible, inspect the `company_id` column and verify that the zero-match company is absent. Close the reasoning loop explicitly: the result can contain 26 funding-round rows while still leaving one of the 12 companies unrepresented, because other companies can contribute multiple matched rows while a zero-match company contributes none. Total result-row count therefore does not establish entity coverage.

8. **Answer the original coverage question.** Use the verified result to decide whether the INNER JOIN funding-round report can be used as evidence that every company is represented. The correct conclusion is no: the report is valid at funding-round grain, but a company with zero matching funding rounds is absent from it. This is the business conclusion of the original request, not a new requirement introduced at the end of the stage.

Stage completion is a state, not a numbered episode. Completion requires evidence for relation selection, connecting key, cardinality, result grain, learner-generated zero-match evidence, prediction, successful INNER JOIN result, result verification, and the company-coverage conclusion. Completed work remains compact and reviewable.
