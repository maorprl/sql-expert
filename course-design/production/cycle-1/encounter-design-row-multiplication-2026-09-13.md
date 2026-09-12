# Cycle 1 Encounter Design Packet — Cardinality + Grain → JOIN Row Multiplication

**Role:** Encounter Architect  
**Status:** ENCOUNTER DESIGN COMPLETE — READY FOR INDEPENDENT DESIGN REVIEW  
**Date:** 2026-09-13  
**Accepted case:** `funding_round → round_investment`  
**Target capability:** Use relationship Cardinality and target Grain to predict that a JOIN can multiply rows, causing information from the one-side entity to repeat.

This packet is the durable Encounter Design required by `learner-encounter-production-process.md`. It does not approve itself, authorize implementation, determine future Stage structure, or reopen the accepted Case Validation.

---

## 1. Authority and input boundary

### SOURCE-REQUIRED

This design is constrained by the following current sources, read in the required order:

1. `learner-encounter-production-process.md`
2. `course-work-management.md`
3. `course-exit-criteria.md`
4. `course-knowledge-map.md`
5. `pedagogical-foundations.md`
6. `course-design/course-visual-language.md`
7. `course-design/course-controls.md`
8. `course-design/stage-1/stage-1-learner-route.md`
9. `course-design/stage-1/stage-1-interaction-decisions.md`
10. `course-design/test-drives/stage-1-targeted-test-drive-2026-09-10.md`
11. `startup-ecosystem/startup-ecosystem-schema.sql`
12. `startup-ecosystem/startup-ecosystem-seed.sql`
13. `course-design/production/cycle-1/case-validation-row-multiplication-2026-09-12.md`
14. `course-design/production/cycle-1/lightweight-pedagogy-gate-row-multiplication-2026-09-12.md`

The Lightweight Independent Pedagogy Gate verdict is **PROCEED**. The accepted case is `funding_round → round_investment`.

The accepted Case Validation and pedagogy-gate artifacts are inputs, not Encounter Design authority beyond the constraints they establish.

### PROCESS / PROFESSIONAL PROPOSAL

The local interaction sequence, closed-response forms, local scaffolds, result-inspection treatment, and the decision not to use a Baseline count are Encounter Design proposals made here. They are not new course-wide rules.

### OPEN / MISSING AUTHORITY OR EVIDENCE

This packet does not resolve:

- Stage numbering or Stage structure beyond current Stage 1;
- broader initial schema exposure;
- global Back semantics;
- global Retry / Redo reset semantics;
- the visual/persistence shell semantics of global Show solution;
- broader hint policy;
- future use or timing of the term `fan-out`;
- later aggregation, pre-aggregation, LEFT JOIN, missing-relationship, metric-reconciliation, NULL-amount, bridge-table, or many-to-many capabilities.

None of these is required to define the current encounter if the implementation preserves the explicit exclusions and uses the existing global course-control layer without redesigning it.

No blocking authority or evidence gap was found for Encounter Design.

---

## 2. Course-Assumed Learner State

### SOURCE-REQUIRED

The course may rely on Stage 1 having already introduced and exercised, with substantial first-exposure support:

- requested-result Grain as what one result row represents;
- direct FK → PK relationship reasoning;
- Primary Key / Foreign Key terminology;
- relationship Cardinality;
- prediction before execution;
- semantic relational action before SQL implementation;
- INNER JOIN and `ON` as implementations of an established relationship;
- one learner-authored JOIN;
- inspection and verification of result evidence against an earlier prediction.

The course may also rely on the current Stage 1 case having established the contrasting behavior in which each article matched one source, so the JOIN preserved one article per row.

The encounter must **not** assume cumulative independent transfer or mastery. Grain, Cardinality, JOIN, and result verification are therefore reused with lighter support, not treated as either completely new or fully mastered.

The encounter must not require prior knowledge of LEFT JOIN, aggregation, pre-aggregation, bridge-table reasoning, NULL metric interpretation, or later fan-out repair strategies.

---

## 3. Learner situation

### PROCESS / PROFESSIONAL PROPOSAL, grounded in accepted Case Validation

The learner is acting as an investment-research / data-quality analyst reviewing the participation records attached to funding rounds before a later lead-investor view is built.

Persistent business request:

> Build a participation audit for the recorded investments attached to funding rounds. For every recorded round-investor participation, show the round context together with the participation record, investor identifier, and whether that participation is marked as lead.

Requested information:

- `funding_round_id`
- `round_type`
- `announced_date`
- `round_investment_id`
- `investor_id`
- `is_lead`

The analytical purpose remains coherent without the teaching objective: the analyst is moving from round-level context to the participation records that actually store investor and lead-status information.

The encounter deliberately excludes `round_investment.amount`, investor-name resolution, reported-total reconciliation, and any aggregate metric.

---

## 4. Learner goal and requested output

### SOURCE-REQUIRED

The accepted case requires a result at the finer participation Grain.

### PROCESS / PROFESSIONAL PROPOSAL

Learner-facing goal:

> Produce the participation audit correctly, and before running the JOIN predict what the one-to-many relationship means for the rows that will represent those participations.

Target output Grain:

> **One recorded round-investor participation per result row.**

A result row may contain round-level context and participation-level information at the same time. Repetition of round-level values does not by itself make rows duplicates when each row represents a different participation.

The output contract is the six logical fields listed above. Their learner-facing names are:

`funding_round_id | round_type | announced_date | round_investment_id | investor_id | is_lead`

No exact row ordering is part of the analytical contract.

---

## 5. Core reasoning the learner must perform

### SOURCE-REQUIRED

Meaningful evidence of the accepted capability requires the learner to use **both** target Grain and relationship Cardinality before relying on execution.

The learner must establish or use these premises:

1. the requested result Grain is one recorded participation;
2. each `round_investment` row belongs to one funding round through `round_investment.funding_round_id → funding_round.funding_round_id`;
3. one funding round can have multiple related participation rows;
4. therefore, at participation Grain, one funding round can contribute multiple result rows;
5. round-level values can repeat across those rows while the rows remain distinct participation records.

The learner must then inspect actual result evidence and reconcile it with that prediction.

The reasoning must not be reduced to noticing that the final result has more rows than the starting relation.

---

## 6. Encounter progression

The encounter contains five top-level episodes. This is a local design, not a reusable stage template.

### Episode 1 — Establish the target Grain

#### Learner-facing state

The business request is the first scan path. The two relevant relations are available as schema-level references:

- `funding_round`
- `round_investment`

The relation set is pre-resolved in this encounter because relation identification is not part of the accepted target evidence. This avoids turning broader schema-exposure decisions into a hidden dependency of the current design.

PK/FK terminology may be visible on the relevant fields because it has already been introduced in Stage 1. Cardinality markers are not yet shown.

#### Learner action

Closed question:

> What should one row of this requested audit represent?

Required distinction among options:

- one funding round;
- **one recorded round-investor participation**;
- one investor across all funding rounds;
- one company.

Correct response establishes the target Grain.

#### Feedback

Correct feedback consolidates only the established meaning:

> The audit is participation-level: one output row represents one recorded participation. Round information can appear on that row as context without changing what the row represents.

Do not introduce row multiplication yet.

A wrong response receives local corrective guidance back to the phrase “for every recorded round-investor participation” rather than the answer being immediately supplied.

#### Reuse, not re-teaching

Grain is not introduced as a NEW CONCEPT. The learner is expected to reuse the previously encountered term. A local reminder may be offered after difficulty:

> Grain = what one output row represents.

This reminder is assistance, not a new Concept Moment.

---

### Episode 2 — Interpret the relationship Cardinality

#### Learner-facing state

The schema-level relationship is visible:

`round_investment.funding_round_id` (FK) → `funding_round.funding_round_id` (PK)

No row instances are needed for this reasoning.

#### Learner action

Closed Cardinality interpretation:

> Which statement matches this relationship?

Required distinctions:

- **Each participation belongs to one funding round, and one funding round can have multiple participation records.**
- Each funding round belongs to exactly one participation record.
- A participation can belong to multiple funding rounds.
- Exactly one participation is allowed for every funding round.

The target evidence here is the many-side possibility needed for the later prediction, not a test of new Cardinality vocabulary.

#### Feedback and guardrail

After the correct response, show the relationship Cardinality compactly and state:

> A funding round can have zero, one, or many recorded participation rows. This encounter will focus on what happens when there are multiple matches.

This preserves the schema-level 0..M boundary without turning unmatched-parent behavior or LEFT JOIN semantics into the current lesson.

Do not state or imply that every possible funding round has a participation merely because the current seed does.

Cardinality is not introduced as a NEW CONCEPT. It is reused.

---

### Episode 3 — Predict row multiplication and repeated one-side information

This is the primary pre-execution evidence episode.

#### Continuity into the task

Before the prediction, a compact established-reasoning summary shows only premises the learner has already established:

- Target Grain: one recorded participation per result row.
- Relationship: one funding round can have multiple participation records.

The summary must not state the conclusion.

#### Learner action A — local multiplicity prediction

Hypothetical supported by the schema:

> Suppose one funding round has three matching participation records. At the target Grain, how many result rows are needed to represent those three participations?

Required options distinguish:

- one row for the funding round;
- **three distinct participation rows**;
- nine rows;
- impossible to tell even when three matching participation rows are given.

#### Learner action B — repetition / duplicate distinction

Before any SQL execution, the learner answers a second closed interpretation:

> What should happen to the round-level context across those participation rows?

Required options distinguish at least:

- **`funding_round_id`, `round_type`, and `announced_date` can repeat across the participation rows, while `round_investment_id` / `investor_id` identify different participation records; the rows are not duplicates merely because the round values repeat.**
- repeated round values mean the rows are accidental duplicates and should collapse to one;
- round-level values must appear only on the first participation row;
- multiple participation rows imply multiple funding rounds.

Both parts must be resolved before SQL execution becomes available as the primary action.

#### Concept timing

Only after the learner has resolved the prediction is the formal idea named:

**Concept Moment — JOIN row multiplication**

Concise meaning:

> When one row on the one-side matches several rows on the many-side, a JOIN can produce several output rows for that one-side entity. At a finer target Grain, the one-side values repeat because each output row represents a different matched detail record.

Do **not** introduce `fan-out` as required terminology in this encounter. The design does not decide its future timing.

A local explanatory visual may now show one generic funding-round row contributing context to several participation-grain rows. No such visual may appear before the learner makes the prediction.

#### Local assistance

After an incorrect attempt, assistance may escalate locally without becoming a course-wide hint policy:

- first reminder: hold the target Grain fixed at one participation;
- stronger reminder: imagine three `round_investment` rows sharing the same `funding_round_id` and ask how all three can remain represented.

Assistance must not silently mark the prediction evidence as unassisted.

---

### Episode 4 — Implement the relational plan in SQL

#### SQL’s role

### SOURCE-REQUIRED

SQL implements the relational plan after the core prediction. It must not perform the reasoning for the learner.

#### Learner-facing transition

The course reconnects the established premises without re-teaching Stage 1:

- target Grain = one participation;
- one funding round can match multiple participations;
- predicted result behavior = multiple participation rows may carry repeated round context;
- direct relationship = `round_investment.funding_round_id → funding_round.funding_round_id`.

JOIN and `ON` are reused terminology, not new Concept Moments.

#### Learner action

A clean learner-authored SQL editor becomes the primary action surface only now.

Task:

> Write the JOIN that produces the requested participation audit.

The editor starts without a prefilled solution.

The Working Schema remains available as a secondary reference. The business request and established reasoning summary remain available in compact form.

No Baseline `COUNT(*)` measurement is used in this encounter. The target capability can be evidenced through local multiplicity reasoning and actual participation rows without turning an exact total row count into the prediction target.

#### Expected SQL semantics

A canonical solution is:

```sql
SELECT
    funding_round.funding_round_id,
    funding_round.round_type,
    funding_round.announced_date,
    round_investment.round_investment_id,
    round_investment.investor_id,
    round_investment.is_lead
FROM funding_round
JOIN round_investment
    ON funding_round.funding_round_id = round_investment.funding_round_id;
```

Equivalent SQL that performs the same direct INNER JOIN and returns the required logical result may be accepted. Validation must not depend on exact text matching.

The semantic output contract is:

- six requested logical fields;
- 72 current participation rows;
- each current `round_investment` represented exactly once with its correct funding-round context;
- no aggregation or collapsing to funding-round Grain;
- row order is irrelevant.

A query may start syntactically from either relation if it performs the same accepted JOIN and returns the required participation-grain result. The learner’s earlier prediction, not SQL clause order, is the evidence of one-side / many-side reasoning.

#### Error and check behavior

- Syntax errors remain local to the editor and preserve learner-authored SQL.
- A running query that does not satisfy the requested result remains incomplete.
- Semantic checking is required; exact technical checking mechanism is implementation discretion.
- A correct execution may be acknowledged as executed, but the system must not yet announce the final row-multiplication interpretation.
- Prior Grain/Cardinality/prediction evidence remains intact across SQL retries.

#### Optional local scaffold

If needed, a local SQL-structure reminder may show only the previously learned shape:

`SELECT requested fields → FROM one relation → JOIN related relation → ON established relationship`

It must remain secondary/on demand and must not replay the full Stage 1 first-JOIN teaching sequence.

---

### Episode 5 — Inspect actual evidence and verify the prediction

This is the primary post-execution evidence episode.

#### Evidence surface

After a semantically valid query runs, the actual result becomes the primary evidence surface.

Learner-facing system/status information may state:

> Query executed — 72 rows returned.

It must not yet say that row multiplication was correctly predicted, that repeated values are legitimate, or that the rows are not duplicates.

#### Evidence-local focus

The interface presents a local inspection slice derived from the learner’s actual query result for `funding_round_id = 1003`. This is a result-view focus, not a new SQL filtering lesson.

The slice should expose the returned values needed for interpretation:

| funding_round_id | round_type | announced_date | round_investment_id | investor_id | is_lead |
|---|---|---|---:|---:|---:|
| 1003 | series b | 2023-09-04 | 7 | 14 | 1 |
| 1003 | series b | 2023-09-04 | 8 | 11 | 0 |
| 1003 | series b | 2023-09-04 | 9 | 13 | 0 |
| 1003 | series b | 2023-09-04 | 10 | 19 | 0 |

The evidence slice must remain adjacent to the verification interaction.

Before the learner responds, the interface must not label these rows as duplicates, non-duplicates, fan-out, or confirmed multiplication.

#### Learner action — final verification

Closed verification question:

> What do these four rows show about funding round 1003?

The correct option must express the full interpretation:

> **They are four distinct participation-grain rows for the same funding round. The round-level values repeat because each row represents a different recorded participation; the repeated round values do not make the rows duplicates.**

Distractors must distinguish materially different interpretations, including:

- four accidental duplicate rows that should collapse to one;
- four different funding rounds;
- one participation repeated four times.

#### Completion feedback

Only after correct verification does the course close the loop:

> Your prediction matches the result: one funding round can contribute several participation-grain rows. The funding-round context repeats across those rows because each row represents a different participation.

The completion feedback may note that the current data contains 72 participation rows, but it must not generalize from the current seed to a schema rule that every funding round always has a participation.

The encounter completes only after this verification is resolved. SQL execution alone does not complete the encounter.

---

## 7. Reveal order and concept timing

### SOURCE-REQUIRED

The learner must predict multiplication/repetition before relying on execution, and visual aids or conclusions must not reveal later reasoning early.

### PROCESS / PROFESSIONAL PROPOSAL

Required reveal sequence:

1. business request + requested fields + two relevant schema relations;
2. target-Grain question;
3. established target Grain;
4. FK → PK relationship and Cardinality interpretation;
5. established many-side possibility, including the 0..M schema boundary;
6. pre-execution multiplicity prediction;
7. pre-execution repeated-one-side / non-duplicate prediction;
8. **JOIN row multiplication** Concept Moment;
9. learner-authored SQL workspace;
10. actual query result;
11. evidence-local `funding_round_id = 1003` result slice;
12. final verification;
13. completion explanation.

Do not expose before step 6:

- a row-multiplication diagram;
- the conclusion that one round becomes several result rows;
- the conclusion that repeated round values are expected;
- the four-row 1003 slice;
- any system statement that the JOIN causes multiplication.

Grain, Cardinality, PK/FK, JOIN, and `ON` are reused concepts and must not be presented as first-exposure Concept Moments.

---

## 8. Scaffolding and assistance

### SOURCE-REQUIRED

Guidance must preserve continuity without performing the reasoning. Current Stage 1 first-exposure scaffolding must not be mechanically replayed.

### PROCESS / PROFESSIONAL PROPOSAL

Scaffolding is intentionally reduced and adaptive:

- Grain terminology is used directly, with a short reminder only after difficulty.
- PK/FK labels may be visible; the learner is not asked to rediscover the connecting key from scratch.
- Cardinality is interpreted through a closed relationship statement, not re-taught as a new concept.
- No prepared Baseline query is required.
- The pre-execution prediction is constrained/closed so the evidence is diagnostic without imposing open-text explanation burden.
- JOIN syntax is learner-authored after reasoning, with only a secondary/on-demand structure reminder.
- Result interpretation is performed against actual local evidence, not memory of a previous screen.

### Global Show solution

`Show solution` remains available through the course-level control layer as required by `course-design/course-controls.md`, including before the prediction.

Encounter-specific solution payloads may reveal the correct response/explanation for the current reasoning task or the canonical SQL above.

Revealing a solution must not:

- populate the learner answer or SQL editor automatically;
- run SQL;
- mark required evidence complete;
- bypass final verification.

If solution or local assistance is used before an evidence-bearing response, the encounter must preserve assistance provenance so review can distinguish unassisted from assisted evidence. Exact global solution surface/persistence behavior remains outside this packet.

### Retry / Back

This encounter does not define new Retry / Redo or Back semantics. Existing course-level controls remain in their established global roles. No implementation choice for this encounter may silently establish new global reset, rollback, persistence, or cross-state semantics.

---

## 9. Feedback and checks

### Reasoning checks

Each evidence-bearing reasoning action receives local feedback.

Wrong feedback should point back to an established premise without revealing the next conclusion automatically.

Correct feedback may consolidate the meaning just established and indicate why the next move is relevant.

### SQL checks

Semantic correctness is required. The checker must reject results that:

- collapse to one row per funding round;
- omit participation records;
- mismatch participations to funding rounds;
- omit required logical fields;
- add an aggregation as a substitute for the requested participation-grain result.

Equivalent valid INNER JOIN formulations may be accepted.

### Post-execution check

The result itself is evidence. A successful SQL run must not pre-answer the final verification.

The learner must interpret the repeated round context in actual rows before the system states the relational conclusion.

---

## 10. Evidence of understanding

### SOURCE-REQUIRED — core evidence

The encounter must capture, in inspectable form:

**E1 — Target Grain**  
Learner identifies one recorded participation as the requested result Grain.

**E2 — Cardinality use**  
Learner identifies that one funding round can relate to multiple participation records while each participation belongs to one funding round.

**E3 — Pre-execution multiplication prediction**  
Given one round with three matching participations, learner predicts three participation-grain rows before SQL execution.

**E4 — Pre-execution repetition interpretation**  
Learner predicts that round-level values can repeat across those rows and that this does not by itself make the rows duplicates.

**E5 — Post-execution reconciliation**  
Using the actual 1003 result slice, learner identifies four distinct participation rows for one funding round and connects the repeated round fields to the participation Grain and relationship multiplicity.

### Supporting evidence

**E6 — SQL implementation**  
Learner produces a semantically valid direct INNER JOIN returning the requested participation-grain output.

SQL correctness supports the relational plan but does not replace E1–E5.

### Evidence provenance

Required reviewable state for each evidence-bearing action:

- original prompt/task;
- learner selection/response;
- correct/incorrect resolution;
- any opened local assistance;
- whether global Show solution was used before resolution;
- relevant established feedback/concept consequence.

Completed work may compact visually, but it must remain inspectable.

---

## 11. Learning-experience requirements

### SOURCE-REQUIRED

The current activity must remain the strongest visual focus. Completed work remains reviewable but secondary. Guidance, task prompts, system/status text, Concept Moments, workspace, and evidence/results must remain distinguishable in role.

### Required learning-experience behavior

- The business request remains available as stable context without competing with the current action.
- A compact “reasoning so far” summary may accumulate only facts already established by the learner.
- The active reasoning question remains visually primary before SQL authoring.
- The SQL editor does not become the primary action surface until the pre-execution prediction is resolved.
- During SQL authoring, task + editor + Working Schema reference read as one coherent workspace.
- After execution, the result becomes the primary evidence surface.
- The 1003 evidence slice and final verification remain spatially local enough to read as one evidence cycle.
- System/status text such as “72 rows returned” must look different from pedagogical interpretation.
- The JOIN row-multiplication Concept Moment uses the course learning-accent role and is visually distinct from correctness feedback.
- Any row-multiplication visual appears only after the learner has made the prediction.
- Relation references remain schema-level; the post-execution 1003 slice is explicitly result evidence, not a conversion of the Working Schema into an instance-data browser.
- Completed evidence remains quiet and reviewable without displacing the current task or SQL/result surface.

The exact composition, responsive layout, spacing, connector geometry, and visual styling remain implementation discretion within the current visual-language authority.

---

## 12. Implementation invariants

The following are mandatory for implementation of this design.

1. The business task is the participation/lead audit described here; it is not replaced by a concept-first “learn fan-out” exercise.
2. Core relations are `funding_round` and `round_investment` only.
3. Core requested fields exclude `amount` and investor-name resolution.
4. Target Grain is one recorded round-investor participation.
5. The learner resolves target Grain before the multiplication prediction.
6. The learner uses the one-to-many relationship as a premise before the multiplication prediction.
7. The learner makes the multiplication/repetition prediction before SQL execution becomes the primary action.
8. SQL execution must not perform or reveal the prediction first.
9. The prediction must include repeated one-side information, not only “more rows.”
10. Repeated funding-round values must not be described as duplicate rows when participation identity differs.
11. The schema-level 0..M parent-side boundary is preserved; the experience must not claim every funding round universally has a participation.
12. LEFT JOIN / missing-parent-preservation reasoning is explicitly outside the encounter.
13. Aggregation, pre-aggregation, metric reconciliation, and NULL-amount interpretation are explicitly outside the encounter.
14. Grain, PK/FK, Cardinality, JOIN, and `ON` are reused and are not presented as first-exposure concepts.
15. The full Stage 1 first-JOIN teaching sequence is not replayed.
16. The JOIN row-multiplication Concept Moment appears only after the learner’s pre-execution prediction is resolved.
17. Learner-authored SQL starts in a clean editor without a prefilled solution.
18. The semantic SQL result is the requested six-field participation-grain result; row order is not material.
19. Current correct result evidence contains 72 participation rows.
20. A valid execution does not pre-answer the final verification.
21. The final verification is performed while actual 1003 result evidence is visible/adjacent.
22. Encounter completion requires final verification, not SQL execution alone.
23. Assistance provenance remains inspectable for evidence-bearing actions.
24. Global Show solution remains available and does not auto-complete evidence, auto-fill the editor, run SQL, or bypass verification.
25. The encounter does not establish new global Back, Retry / Redo, Show-solution shell, schema-exposure, or Stage-structure semantics.

---

## 13. Permitted implementation discretion

Implementation may decide, without changing learner-facing pedagogy:

- exact wording within the meaning/evidence constraints in this packet;
- exact closed-option phrasing and ordering, provided the required distinctions remain;
- exact visual composition and responsive treatment;
- exact relation-card size and schema-field emphasis;
- exact connector geometry consistent with the real FK/PK relationship;
- exact form of the post-prediction row-multiplication visual, including choosing no additional visual if the concept treatment remains clear;
- exact editor component and SQL error presentation;
- exact technical mechanism for semantic SQL checking;
- exact technical mechanism for deriving/displaying the 1003 evidence slice from the learner result;
- exact compact-review treatment for completed evidence;
- exact local button labels such as `Check answer`, `Run query`, or `Continue`, subject to course-control distinctions;
- whether previously established premises remain visible continuously or collapse into a compact summary, provided continuity is preserved.

Implementation may **not** use this discretion to change Grain, relation set, requested information, reveal order, evidence requirements, concept timing, excluded concepts, or the distinction between actual result evidence and system conclusion.

If implementation exposes a material ambiguity affecting learner reasoning, evidence, concept timing, UX semantics, or learner flow, it must be raised rather than silently resolved.

---

## 14. Validation criteria

Independent reviewers and the later Auditor should be able to validate the following observable behaviors.

### Pre-execution path

- Start state presents the business request and schema references without a row-multiplication conclusion.
- Grain evidence is captured before prediction.
- Cardinality evidence is captured/reused before prediction.
- Parent-side optionality is not misrepresented as mandatory participation.
- The multiplication/repetition prediction is completed before the SQL workspace becomes the primary action.
- No early visual, hint, system text, or result gives away the multiplication conclusion before the learner engages with it.
- Assistance use is distinguishable from unassisted response evidence.

### Concept transition

- JOIN row multiplication is named only after the learner’s prediction is resolved.
- The Concept Moment explains why one-side values repeat at finer Grain without calling distinct participation rows duplicates.
- Grain/Cardinality/JOIN are not reintroduced as first-exposure concepts.

### SQL path

- Learner starts from a clean editor.
- Syntax failures preserve the learner’s work and earlier reasoning evidence.
- A semantically valid query can be accepted even if its SQL text differs from the canonical solution.
- Correct current output contains the six requested logical fields and 72 participation rows with correct relationships.
- Incorrect funding-round-grain or aggregated results do not pass.
- Successful execution does not announce the final relational interpretation before the learner verifies it.

### Evidence inspection and closure

- The 1003 inspection slice is derived from actual query evidence and shows four distinct participation rows.
- Repeated `funding_round_id`, `round_type`, and `announced_date` are visible alongside differing `round_investment_id` / `investor_id` values.
- Final verification remains adjacent to this evidence.
- The learner must identify those rows as distinct participations for one round and connect the repetition to the target Grain / relationship multiplicity.
- Completion occurs only after verification.

### Scope guardrails

- No `round_investment.amount` reasoning is required.
- No investor-name resolution relation is added.
- No LEFT JOIN or missing-relationship survival question is introduced.
- No aggregation, pre-aggregation, metric reconciliation, bridge-table, or many-to-many task is introduced.
- No global control semantics or future Stage structure is silently decided.

---

## 15. What constitutes meaningful evidence of the accepted capability?

The learner has produced meaningful encounter evidence when, before execution, they combine the **participation target Grain** with the **one-to-many funding-round → participation relationship** to predict that one funding round can occupy several output rows and that round-level information will repeat across distinct participation rows; then, after implementing the JOIN, they correctly interpret the actual repeated round context in the 1003 result slice as the expected consequence of that Grain and Cardinality rather than as accidental duplicate rows.

A larger final row count by itself is not sufficient evidence.

SQL execution by itself is not sufficient evidence.

---

## 16. Design status and next process step

**Encounter Design status:** COMPLETE FOR INDEPENDENT DESIGN REVIEW.

No blocking OPEN / missing-authority issue was identified for the current design scope.

Per `learner-encounter-production-process.md`, the exact next process step is:

**Independent Pedagogy Review + Independent Learning Experience / UX Review of this same frozen Encounter Design Packet.**

Neither review authorizes implementation by itself. After both reviews, the Encounter Architect must perform **Architect Reconciliation** before Auditor Pre-Build Control can occur.