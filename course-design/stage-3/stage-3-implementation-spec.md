# Lesson 3 implementation specification — INNER JOIN zero matches and entity coverage

**Status:** CURRENT IMPLEMENTATION SPEC — RECONCILED WITH CURRENT VISUAL REFERENCE / NOT YET IMPLEMENTED  
**Source design authority:** `course-design/stage-3/stage-3-authority.md`  
**Scope:** buildable learner-state behavior, interaction gates, evidence behavior, SQL/result validation, control usage, and implementation constraints for Lesson 3

This specification translates the current Lesson 3 design authority into implementation-checkable behavior. It does not replace the Lesson 3 design authority, course-wide visual authority, or course-wide control authority.

Applicable course-wide authority includes:

- `pedagogical-foundations.md`;
- `course-design/course-visual-language.md`;
- `course-design/course-controls.md`;
- `course-exit-criteria.md`;
- `course-knowledge-map.md`;
- the current startup-ecosystem schema and seed data.

If implementation would require a material learner-facing decision not established here or in current higher-order authority, stop and surface the ambiguity rather than inventing it during Build.

---

## 1. Runtime entry and business context

Lesson 3 continues within the established course shell and interaction topology used by the accepted Lessons 1–2 journey.

Implementation must not invent:

- a new inter-Lesson navigation model;
- a new persistence model;
- Retry / Redo reset semantics;
- a separate learner-response location model.

During development and validation, Lesson 3 may be directly reachable for testing. It must not be promoted into the accepted learner journey or treated as the accepted next Lesson until Lesson 3 acceptance is complete.

The persistent business context is:

> The investment team has received a funding-round report. It should show every recorded funding round together with the company's status. QA has flagged one problem: `Lumina Bio` (`company_id = 20`) is in the company list but is missing from the report. The learner must find out why.

This business context remains available as orientation while visual prominence shifts to the current task, tool, or evidence surface.

---

## 2. Required learner-state progression

The runtime must preserve the following ordered reasoning path:

| State | Learner action | Primary role / surface | Gate |
| --- | --- | --- | --- |
| L3-01 Relations | Identify `company` and `funding_round` as the relevant relations behind the report | Live Schema / Working Schema with learner-response prompt | Both correct relations are selected |
| L3-02 Connection | Identify `funding_round.company_id` as the direct connecting field | Working Schema interaction + learner-response prompt | Correct field is identified |
| L3-03 Relationship and Grain | Confirm the reused relationship meaning and establish funding-round result Grain | Learner-response lane with Working Schema as evidence/reference | Relationship meaning and Grain are correct |
| L3-04 Source investigation | Run the visible prepared check for Lumina's matching funding rounds | Prepared SQL in workspace + explicit Run action | Check runs and returns `matching_rounds = 0` |
| L3-05 Protected prediction | Predict how many INNER JOIN result rows a company with zero matching funding rounds can contribute | Learner-response lane with source-check result still visible | Learner supplies numeric answer `0` |
| L3-06 Mechanism explanation | Encounter the teacher-led explanation `zero matches → zero INNER JOIN result rows` | Instructional / teaching treatment | Learner continues |
| L3-07 SQL authoring | Author the required direct INNER JOIN report | SQL Workspace | Semantic validation passes |
| L3-08 Result verification | Verify from the accepted result that `company_id = 20` is absent | Results in workspace/evidence lane + verification in learner-response lane | Verification is correct |
| L3-09 Diagnosis and coverage conclusion | Explain why Lumina is missing and conclude whether 26 result rows prove that all 12 companies are represented | Learner-response lane with result evidence still inspectable | Correct diagnosis and conclusion; Lesson completion |

Completion is a state that closes the argument. There is no required repair task or new JOIN type after L3-09.

---

## 3. Relation selection and Working Schema behavior

The learner must identify the relevant relations from the available schema rather than receive the pair pre-resolved.

The required relations are:

- `company`;
- `funding_round`.

Relation-selection success may be confirmed quietly because this is reused reasoning. Wrong selections receive local corrective feedback without revealing the full required set.

Before the learner identifies the connection, the interface must not expose a relationship connector, PK/FK treatment, or equivalent answer-revealing relationship state that performs the connection reasoning for them.

After the learner correctly identifies `funding_round.company_id`, the reused relationship may become visible:

`funding_round.company_id → company.company_id`

The relationship representation must conform to the course-wide visual-language rules for actual field endpoints and Cardinality annotation.

---

## 4. Relationship meaning and result Grain

The encounter compactly confirms the reused relationship meaning:

- one company can have zero, one, or many funding rounds;
- each funding round belongs to exactly one company.

The structural possibility of zero funding rounds is permitted evidence at this point.

The interaction must not yet state or imply the protected INNER JOIN consequence that an unmatched company contributes zero result rows.

The learner must establish the requested result Grain as:

> one result row = one recorded funding round with company context

Company coverage is a separate validation question. The interface must not reframe the requested result as one row per company or imply that result Grain is determined by the `FROM` clause.

PK/FK, Cardinality, Grain, and INNER JOIN are reused concepts here. They should not be presented as first-exposure Concept Moments.

---

## 5. Source investigation — explicit prepared SQL

The missing-company symptom is known at entry; the cause is not.

The learner must establish Lumina's actual source-side match count through an explicit visible action. The required prepared check is:

```sql
SELECT COUNT(*) AS matching_rounds
FROM funding_round
WHERE company_id = 20;
```

The query is prepared for the learner because this is a focused diagnostic measurement, not the Lesson's SQL-authoring task. This reuses the accepted Lessons 1–2 pattern in which prepared SQL is shown, the learner presses Run, and only then does a result appear.

Before Run:

- the query text is visible;
- the interface may state that it checks how many recorded funding rounds match company 20;
- the result area is empty;
- the interface must not state that the answer is zero.

After Run, and only after Run, the result may show:

`matching_rounds = 0`

The result must be visibly attributable to the prepared query immediately above it. No hidden query, auto-generated comparison table, deduplicated coverage list, or unexplained data surface may establish this fact.

The source-check result remains available while the protected prediction becomes active.

---

## 6. Protected prediction interaction

The protected inference is:

> The learner has just established that Lumina has zero matching funding-round rows. How many result rows can a company row with zero matches contribute under the familiar INNER JOIN?

This interaction must occur before SQL authoring and before any joined-result reveal.

To preserve learner ownership and avoid answer wording leakage, the required response control is a constrained numeric response rather than multiple choice or open prose.

The learner enters the number of contributed result rows.

Accepted answer:

`0`

The interface may label the unit, for example:

`[   ] result rows`

but must not provide selectable answer wording that states the relational conclusion in advance.

Incorrect responses receive local corrective feedback without introducing LEFT JOIN, NULL, or a worked answer path that bypasses the reasoning.

Only after the learner supplies the correct prediction may the course explicitly explain:

> zero matching row pairs → zero INNER JOIN result rows

This is a teacher-led mechanism explanation attaching explicit meaning to reasoning the learner has just performed. It is not required to introduce a new formal Concept Moment label.

---

## 7. SQL authoring state

After the mechanism explanation, the learner authors the familiar INNER JOIN that reproduces the report. The learner-facing instruction starts from `company`, joins matching `funding_round` rows, and returns the required report fields.

No Lesson-1-style first-exposure JOIN teaching sequence is repeated. INNER JOIN and `ON` are reused syntax.

During active SQL authoring:

- the SQL Workspace becomes the primary action surface;
- the Working Schema remains available as a quieter reference;
- completed reasoning remains reviewable without displacing the editor or separating the task from the tool;
- SQL diagnostics remain local to the SQL Workspace.

The required logical output fields are:

`company_id | status | funding_round_id | round_type | announced_date`

### Desired Output

`Desired Output` may be available on demand as optional local SQL-authoring assistance showing the five-field output contract above.

It must not expose the complete query or relational implementation.

### Show solution

`Show solution` follows `course-design/course-controls.md`:

- it appears only in the active SQL authoring state;
- it belongs inside the SQL Workspace;
- activating it replaces the active editor contents with a complete editable solution;
- activating it does not run the query;
- activating it does not mark required evidence complete;
- activating it does not bypass result inspection or final verification.

No global hint/adaptive system is created by this Lesson.

---

## 8. Semantic SQL validation

Acceptance must be semantic rather than exact-query-text matching.

A passing result must establish all of the following:

- the logical output contract is `company_id | status | funding_round_id | round_type | announced_date`;
- there are 26 result rows;
- every current `funding_round` is represented exactly once;
- each result row carries the correct `company.status` for its funding round;
- `company_id = 20` is absent from the result;
- the relational path is the direct INNER JOIN between `funding_round` and `company` on the established company-id relationship.

Equivalent direct INNER JOIN formulations may be accepted when they satisfy the same semantics.

The required solution must not use a different relational mechanism that changes the intended reasoning path, including:

- LEFT JOIN;
- aggregation;
- DISTINCT;
- EXISTS / NOT EXISTS;
- another workaround that produces a superficially similar result while bypassing the required direct INNER JOIN reasoning.

Successful SQL execution alone is not Lesson completion.

---

## 9. Results and actual-result verification

After semantic validation passes, the actual accepted result becomes the primary evidence surface.

All 26 result rows must remain practically inspectable.

The system may report that the query satisfies the required result contract. That system status must not perform the learner's interpretive verification.

The learner must explicitly verify from the actual result that:

`company_id = 20`

is absent.

Results remain in the workspace/evidence lane while the verification prompt, response control, reasoning feedback, and progression control remain in the stable learner-response lane.

The evidence must remain visible or immediately inspectable while the learner answers; the learner must not be required to rely on memory of a previous screen.

---

## 10. Final company-coverage conclusion

After actual-result verification, the learner answers the original business coverage question.

A closed single-choice response is permitted here because the protected zero-match inference has already been produced, explained, implemented, and verified from actual result evidence.

The question must distinguish materially different interpretations of the accepted result, including the correct conclusion:

> 26 funding-round rows do not prove that all 12 companies are represented.

The interaction must preserve the difference between:

- correctness at funding-round Grain; and
- company coverage.

After a correct response, the Lesson closes the reasoning thread explicitly:

- the result contains 26 funding-round-grain rows;
- only 11 of the 12 companies are represented;
- total result-row count does not establish entity coverage.

The completion state must not introduce LEFT JOIN, NULL, or a preservation/repair task.

---

## 11. Reviewability, spatial ownership, and visual behavior

All Lesson 3 states must conform to `course-design/course-visual-language.md`.

### Stable learner-response lane

Learner-facing reasoning and verification interactions remain in the stable learner-response lane, including:

- actionable prompt/question;
- response control;
- `Check` or equivalent submission;
- response-specific corrective/success feedback;
- teacher-led consequence that follows the reasoning move where applicable;
- `Continue`, `Complete lesson`, or equivalent local progression control.

### Workspace / evidence lane

The workspace/evidence lane owns, as applicable:

- Working Schema and direct schema manipulation;
- the visible prepared source-check SQL and its run result;
- SQL editor;
- `Run query`;
- SQL-local assistance;
- SQL execution diagnostics;
- Results.

Direct manipulation stays with the manipulated object. Reasoning feedback does not move into the workspace merely because the answer depends on workspace evidence.

### Completed work

Completed reasoning remains visible and reviewable but visually quieter than the current task.

Completed work must not become the dominant scan path or separate the learner from the active schema object, source evidence, SQL editor, or Results.

### Phase handoffs

Visual prominence may legitimately move from learner reasoning to:

- Working Schema interaction;
- the explicit prepared source check;
- SQL authoring;
- Results inspection.

Those handoffs change attention, not learner-response ownership.

The visual reference must make each material handoff legible without relocating the learner-response role.

---

## 12. Visual-reference requirements

The current visual implementation reference is:

`course-design/stage-3/stage-3-visual-reference.html`

It is a runnable visual/reference artifact, not accepted production runtime.

The reference must preserve at minimum:

1. **Missing-company entry state**  
   Lumina is named as the reported symptom, while the cause remains unknown.

2. **Source-investigation state**  
   The prepared SQL is visibly shown, the learner explicitly runs it, and the `0` result appears only as the output of that action.

3. **Protected-prediction and mechanism states**  
   The zero-match source result remains available, the learner supplies the numeric INNER JOIN consequence, and only then does the teaching treatment state `zero matches → zero INNER JOIN result rows`.

4. **SQL-authoring state**  
   The editor becomes visually primary while Working Schema and completed reasoning remain practically available but secondary.

5. **Results-verification and completion states**  
   All 26 accepted rows remain inspectable, the learner verifies that company 20 is absent, and the Lesson closes the missing-company diagnosis plus the entity-coverage consequence without introducing a repair lesson.

The visual reference may resolve exact composition, spacing, local component arrangement, and role-consistent styling. It must not alter the learner sequence, evidence provenance, reveal timing, answer logic, SQL contract, control semantics, or completion requirements established here and in higher-order authority.

---

## 13. Explicit implementation discretion

Implementation may choose, within current authority:

- exact component composition;
- exact copy polish that preserves learner ownership and reveal boundaries;
- internal state representation;
- semantic-validator technical implementation;
- exact presentation of the missing-company symptom and prepared source-check treatment consistent with Section 5;
- local styling consistent with course-wide visual roles.

Implementation must not silently decide:

- a broader hint system;
- Retry / Redo reset semantics;
- cross-session persistence;
- a new response-lane topology;
- a different result Grain;
- a different relational path;
- LEFT JOIN / NULL teaching;
- any material learner-facing decision that changes the established reasoning or evidence path.

---

## 14. Spec conformance result

This specification has been checked against the current Lesson 3 authority, course controls, course visual language, pedagogical foundations, and the relevant accepted Lessons 1–2 interaction patterns.

The missing company is supplied as the reported symptom, but its zero-match cause is not supplied. The learner establishes the cause by running a visible prepared SQL check. This preserves clear evidence provenance while avoiding the earlier unexplained comparison-table pattern.

The protected prediction uses constrained numeric input rather than multiple choice because pre-answer selectable wording would violate the Lesson 3 protected-evidence constraint.

The final company-coverage conclusion may use closed single-choice interaction because it occurs after the protected inference has already been produced and verified.

The implementation specification and current visual implementation reference are reconciled. Production runtime implementation remains intentionally unstarted while the complete INNER JOIN chapter is taken through external review.
