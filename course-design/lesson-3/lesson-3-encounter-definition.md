# Lesson 3 — Encounter Definition

**Status:** WORKING CANDIDATE — NOT YET CURRENT LESSON AUTHORITY  
**Scope:** Master Plan Step 7 — design only  
**Implementation:** NOT AUTHORIZED

This document applies the current `learner-encounter-production-process.md` to a fresh Lesson 3 design from the accepted Lessons 1–2 baseline.

It does not use preserved `course-design/stage-3/` material or the production-system dry-run Lesson 3 design as design authority.

## 1. Establish Basis

### Accepted product state

Accepted learner journey:

- **Lesson 1:** first JOIN / matching and row-count preservation through `news_article → news_source`;
- **Lesson 2:** one-to-many matching and row multiplication through `funding_round → round_investment`.

Accepted runtime baseline:

`9b8f6ffc1f22ce2d2783f49e52a48c480a0945fa`

Canonical design work begins from the repository state after the completed production-system rebaseline cutover.

### Course-assumed learner state

Lesson 3 may assume prior course exposure to, and supported use of:

- identifying relevant relations from a business question;
- Grain and requested-result Grain;
- primary key / foreign key relationships;
- Cardinality including one-to-many;
- INNER JOIN matching semantics and `ON`;
- predicting relational row behavior before execution;
- distinguishing repeated one-side information from duplicate base rows in a one-to-many result;
- using SQL as implementation/verification after relational reasoning;
- inspecting an actual result against a prior prediction.

Lesson 3 does **not** assume mastery or independent transfer of all of those capabilities.

It must not assume prior knowledge of:

- optional `1:0..1` relationships as an explicit concept;
- LEFT JOIN / outer-join row preservation;
- NULL introduced by the absence of a matching row;
- general SQL NULL logic / three-valued logic;
- aggregation, pre-aggregation, EXISTS / NOT EXISTS, bridge-table reasoning, or window functions.

### Capability-gap comparison

Several substantial course capabilities remain uncovered after Lessons 1–2. The next encounter should be a small justified move rather than an attempt to cover the whole remaining map.

**Optional relationships / LEFT JOIN / unmatched-row preservation**

- directly extends already-established JOIN matching semantics;
- addresses the Exit Criteria requirement to predict what rows are preserved and what disappears;
- uses already-established Grain, keys, Cardinality, and INNER JOIN as prerequisites;
- introduces a new relational consequence without requiring aggregation or a new metric model.

**Aggregation / GROUP BY**

- remains required later;
- introduces aggregate Grain, grouping keys, metric meaning, and new SQL syntax together;
- is a larger conceptual branch than the smallest next extension of current JOIN reasoning.

**Existence / EXISTS**

- remains required later;
- is valuable for “has at least one / has none” questions and avoiding unnecessary detail Grain;
- introduces a new operation family rather than directly extending the current matching/preservation distinction.

**Filtering / projection**

- remain required relational operations;
- can be introduced without the current JOIN sequence and therefore do not depend on being the immediate next encounter.

### Selected capability need

Lesson 3 will develop this new capability:

> Given a requested base Grain and an optional relationship, predict that matching-only INNER JOIN behavior can remove required base rows, choose a row-preserving relational action, implement it with LEFT JOIN, and correctly interpret unmatched-side NULLs as the consequence of no matching related row.

This is a justified next move because it extends the learner's existing JOIN model from:

- every required base row has a match;
- one base context can have multiple matches;

to the third structurally important case:

- a required base row may have **no** related match and still need to remain in the requested result.

## 2. Define the Encounter

### Case comparison

#### Candidate A — `company → company_acquisition`

Relational shape:

- `company`: one row per company;
- `company_acquisition`: zero or one acquisition row per company;
- `company_acquisition.company_id` is both the acquisition table's primary key and a foreign key to `company.company_id`.

Current data gives a strong observable unmatched-row situation: the course dataset contains many companies and only one acquisition record.

Learner consequence:

- isolates optional matching and row preservation;
- no one-to-many multiplication competes with the new concept;
- one-company-per-row requested Grain can remain stable under the correct operation;
- unmatched-side NULLs have a direct business meaning.

#### Candidate B — `company → funding_round`

Relational shape includes companies with zero or multiple funding rounds.

Learner consequence:

- combines the new unmatched-row problem with one-to-many multiplication already central to Lesson 2;
- makes it harder to isolate whether the learner understands preservation of zero-match companies versus multiplication of matched companies.

#### Candidate C — `investor → investor_sector_focus`

Relational shape includes an investor with no focus rows and also introduces a bridge / many-to-many structure.

Learner consequence:

- adds bridge-table and potentially multiple-match reasoning not needed for the target capability;
- creates avoidable conceptual confounds.

### Selected case

**`company → company_acquisition`**

The case is preferred because the optional `0..1` relationship is the relational difficulty itself rather than a side effect of a more complex many-side structure.

### Business question

> The corporate strategy team needs a review of **all companies**. For each company, show its name and status, and when an acquisition is recorded, include the acquisition date and acquirer.

The question states the business need precisely:

- every company remains in scope;
- acquisition information is conditional.

It does not name LEFT JOIN or tell the learner how to preserve unmatched companies.

### Target output contract

Required result fields:

- `company_id`
- `name`
- `status`
- `acquired_date`
- `acquirer_name`

Required result Grain:

> one company per row.

The output contract should be available when SQL authoring requires it; it should not be used to pre-answer the earlier relational reasoning.

## 3. Protected learner evidence

The encounter should establish these conclusions in this order.

### Evidence A — relation and connection reuse

The learner identifies:

- `company` as the relation supplying the requested company-level rows;
- `company_acquisition` as the relation supplying acquisition details;
- `company_acquisition.company_id → company.company_id` as the direct relationship.

This is reused reasoning and should be relatively light. It is not the main Lesson 3 evidence.

### Evidence B — optional relationship

The learner establishes that, from the company side, the relationship permits:

> one company → zero or one acquisition record.

The reasoning should connect:

- an acquisition row belongs to one company;
- `company_acquisition.company_id` is unique, so a company cannot have multiple acquisition rows in this structure;
- nothing in the relationship requires every company to have an acquisition row.

Only after the learner establishes the meaning should the course name/annotate the `1:0..1` optional relationship.

### Evidence C — requested result Grain

The learner states that one requested result row represents:

> one company.

This is reused Grain reasoning, not a new Grain teaching episode.

### Evidence D — matching-only consequence

Before LEFT JOIN is named, ask about a company that has **no** `company_acquisition` row:

> Under the INNER JOIN matching rule you already know, would that company produce a matching pair and appear in the result?

Required conclusion:

> No. With no matching acquisition row, matching-only INNER JOIN behavior would remove that company from the result.

This is the core new relational consequence.

### Evidence E — semantic operation choice

Given the business requirement that **all companies** remain present, the learner chooses the semantic action:

> Keep every company row; when an acquisition row matches, attach its acquisition values.

Only after this semantic choice is established does the course introduce the name **LEFT JOIN** and connect it to the already-chosen action.

### Evidence F — numeric preservation expectation

Use a prepared measurement to establish the current `company` baseline as **12 company rows**.

The learner predicts:

> because this relationship is at most one acquisition per company and the operation keeps every company, the result should still contain 12 company-grain rows.

The numeric prediction follows the structural decision; the 12-row count must not substitute for the earlier reasoning about why zero-match companies need preservation.

### Evidence G — SQL implementation

The learner authors the LEFT JOIN after the relational plan is established.

Conceptually required structure:

```sql
SELECT
  c.company_id,
  c.name,
  c.status,
  ca.acquired_date,
  ca.acquirer_name
FROM company AS c
LEFT JOIN company_acquisition AS ca
  ON c.company_id = ca.company_id;
```

Equivalent aliases/formatting are acceptable. The validation contract should verify the intended two-relation LEFT JOIN semantics, not merely the final values.

### Evidence H — result interpretation and NULL meaning

With the actual result visible, the learner verifies:

- all 12 companies remain present;
- each company appears once;
- the company with an acquisition record has acquisition values;
- companies with no matching acquisition row show `NULL` in acquisition-side fields.

Then establish the practical distinction:

> In this result, acquisition-side NULLs for an unmatched company mean that no `company_acquisition` row matched that company. They are not evidence that an existing acquisition row was found but happened to contain a blank acquisition date/acquirer.

This Lesson does not expand into general three-valued SQL logic.

## 4. Reveal / evidence boundaries

Before the corresponding learner evidence:

- do not label the relationship `0..1` / optional before the learner reasons about whether every company must have an acquisition row;
- do not name LEFT JOIN before the learner establishes that INNER JOIN would lose a required zero-match company and chooses the semantic keep-all-companies action;
- do not show a completed LEFT JOIN result before the learner makes the structural preservation decision;
- do not explain unmatched-side NULL meaning before the learner has inspected the outer-join result;
- do not treat the 12-row baseline as proof of why LEFT JOIN is needed;
- do not present SQL syntax as the method for discovering the relational requirement.

If corrective guidance is delivered before a protected response and the runtime later makes a claim about assistance level, that claim must reflect the guidance actually delivered.

## 5. Learner journey

The proposed encounter is deliberately tighter than the first JOIN Lesson.

1. **Business need** — all companies + acquisition details when available.
2. **Relevant relations** — select `company` and `company_acquisition`.
3. **Relationship reuse** — identify `company_acquisition.company_id → company.company_id`.
4. **New relationship consequence** — establish zero-or-one acquisition per company; then name optional `1:0..1`.
5. **Requested Grain** — one company per row.
6. **INNER JOIN prediction** — a company with no acquisition match disappears under matching-only behavior.
7. **Semantic operation choice** — keep every company, attach acquisition values when present.
8. **Concept naming / SQL bridge** — introduce LEFT JOIN as the SQL expression of that action.
9. **Baseline / numeric expectation** — prepared count establishes 12 companies; predict 12 output rows because the relationship cannot multiply a company and LEFT JOIN preserves each company.
10. **SQL authoring** — learner writes the LEFT JOIN.
11. **Result inspection** — actual 12-row result remains primary evidence.
12. **NULL interpretation** — distinguish no related row from a missing attribute inside an existing related row.
13. **Final verification** — reconcile the result with the earlier one-company Grain and row-preservation prediction.

## 6. Scaffolding and continuity

### Reused concepts

Do not re-teach as first exposure:

- Grain;
- PK / FK;
- Cardinality generally;
- INNER JOIN matching;
- `ON` syntax;
- prediction-before-execution routine;
- result inspection routine.

Provide brief correction or reminder only where the learner demonstrates a need.

### New concepts

Fuller instructional attention is justified for:

- optional `1:0..1` relationship from the required/base side;
- semantic row preservation when no match exists;
- LEFT JOIN;
- practical unmatched-side NULL interpretation.

### Teacher thread

The teacher should carry one argument:

> The business needs every company → some companies can have no acquisition row → matching-only behavior would lose those companies → therefore the relational action must preserve every company → LEFT JOIN implements that action → the result keeps company Grain and uses NULL where no acquisition row exists.

Avoid interposing acknowledgement-only states between these moves.

## 7. Controls and visual constraints

Current course-wide authority is sufficient; no new global-control decision is required for this design.

- Working Schema starts from the current course behavior and needs only the two selected relations; the four-relation ceiling is not a target.
- learner reasoning and feedback remain in the learner-response lane;
- Working Schema, prepared measurement, SQL editor, Run control, and Results remain in the workspace/evidence lane;
- SQL becomes primary only after the relational action is established;
- Results remain practically inspectable during final verification;
- `Show solution` is available only in active SQL authoring according to `course-design/course-controls.md`, fills the editable editor, does not run SQL, and does not complete evidence;
- Retry / Redo reset semantics, cross-session persistence, exact mobile treatment, and a global hint system remain OPEN and are not needed to define this encounter.

## 8. Out of scope

Lesson 3 does not teach or assess:

- FULL OUTER JOIN or RIGHT JOIN;
- general NULL comparison logic / three-valued logic;
- filtering NULLs with `IS NULL` as a separate SQL skill;
- EXISTS / NOT EXISTS;
- aggregation / GROUP BY;
- pre-aggregation;
- many-to-many bridges;
- multi-branch fan-out;
- window functions;
- cumulative mastery of all prior JOIN reasoning.

## 9. Make-It-Buildable assessment

Material decisions that must become current Lesson 3 authority before Build:

- target capability and bounded assumed learner state;
- selected `company → company_acquisition` case;
- business question and result Grain;
- protected evidence sequence and reveal boundaries;
- optional-relationship / LEFT JOIN / NULL concept timing;
- learner journey;
- SQL/result contract and verification evidence;
- Lesson-local interaction requirements not already governed by course-wide authority.

Implementation discretion may include:

- exact component composition within current visual roles;
- exact wording polish that preserves question meaning/non-preemption;
- technical state representation;
- semantic SQL-validation implementation;
- exact local styling consistent with current visual authority.

No implementation-affecting OPEN issue has been identified that requires Retry/Redo, cross-session persistence, mobile policy, future Lesson sequence, or a global hint architecture to be resolved now.

## 10. Risk-triggered challenge assessment

The design contains protected learner evidence, but the core evidence boundary is narrow and directly checkable against current pedagogy:

- optionality is established before naming;
- INNER JOIN row loss is predicted before LEFT JOIN is named;
- semantic action precedes SQL terminology;
- numeric baseline follows rather than substitutes for structural reasoning;
- NULL meaning is interpreted from the actual result rather than supplied before execution;
- no unresolved global-control behavior is needed for the protected evidence path.

At this working-candidate stage, no unresolved cross-domain conflict or case trade-off remains that is difficult to self-validate enough to require an independent challenge before further design reconciliation.

This assessment should be revisited before promotion to current Lesson authority if subsequent review exposes ambiguity in the evidence sequence, SQL validation contract, or control behavior.
