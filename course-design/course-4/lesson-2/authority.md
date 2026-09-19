# Course 4 / Lesson 2 authority — JOIN row multiplication

**Status:** CURRENT AUTHORITY — RECONCILED TARGET EXPERIENCE  
**Scope:** current `funding_round → round_investment` learner encounter only

This document defines the current Course 4 / Lesson 2 learner design after reconciliation with the approved target experience. Its canonical identity is **Course 4 / Lesson 2 — Multiple Matches**.

It supersedes the earlier extracted Course 4 / Lesson 2 route where that route conflicts with the decisions established here, including the former no-baseline sequence, the separate mandatory numeric application, and the earlier Grain/Cardinality entry sequence.

For course-wide behavior, this Lesson remains constrained by:

- `pedagogical-foundations.md`;
- `course-design/course-visual-language.md`;
- `course-design/course-controls.md`.

There is no separate current Course 4 Lessons 1–2 topology authority. Spatial placement, locality, handoffs, and visual ownership must be derived directly from the course-level visual/control authority together with the Lesson-specific requirements below. If those sources leave a material spatial question unresolved, that question remains unresolved until explicitly decided; it must not be silently filled by a derived topology document or implementation convention.

Historical Cycle 1 production artifacts remain provenance and decision history. They are not a flat set of current Course 4 / Lesson 2 authority once a decision has been superseded or promoted into current course-level authority.

---

## 1. Encounter purpose and gist

Course 4 / Lesson 2 develops the ability to reason about **multiple matches** in a one-to-many JOIN while preserving the requested participation Grain.

The Lesson gist is:

> **Multiple matches:** one funding-round row can match several participation rows. JOIN therefore carries the same round context into several result rows while each result row still represents one recorded participation.

`JOIN row multiplication` is the formal name for this multiple-match mechanism. Repeated round-level values are a consequence of the mechanism; they are not the core mechanism themselves.

The learner must understand that when one funding round has several recorded participation rows:

- the funding round can contribute its values to several result rows;
- those result rows remain distinct because each represents a different recorded participation;
- repeated round context is therefore not accidental duplication;
- the requested result Grain remains one recorded round-investor participation per row.

The target is relational reasoning. Correct JOIN syntax or a correct numeric answer alone is not sufficient evidence of the capability.

---

## 2. Business case and relation pair

The learner works from the business need to review every recorded investor participation in a funding round together with the round type, announced date, investor, and lead status.

The relevant relations are:

- `funding_round` — funding-round context;
- `round_investment` — recorded investor participation and lead status.

The direct relationship is:

`round_investment.funding_round_id` → `funding_round.funding_round_id`

Each participation belongs to one funding round. One funding round can have multiple participation records.

---

## 3. Course-assumed learner state

Course 4 / Lesson 2 reuses, rather than re-teaches as first exposure:

- relation identification;
- direct PK/FK relationship reading;
- Grain;
- Cardinality;
- prepared baseline measurement as a reasoning aid;
- INNER JOIN and `ON`;
- prediction before execution;
- result inspection and verification.

Previously encountered does **not** mean pre-resolved or mastered. The learner still performs the relation-selection, connecting-field, relationship/Grain, prediction, SQL, and verification work required by this encounter.

Reuse should reduce explanatory and ceremonial load before removing reasoning structure. PK/FK, Cardinality, Grain, and JOIN are therefore not re-taught as new Concept Moments, but they remain available as reasoning structure where this Lesson needs them.

Course 4 / Lesson 2 must not assume LEFT JOIN / `NULL`, aggregation, pre-aggregation, bridge-table reasoning, fan-out repair, or broader independent end-to-end transfer.

---

## 4. Current learner route

The current sequence is:

1. **Identify relevant relations.** Start from an empty Working Schema. The learner identifies and selects `funding_round` and `round_investment` from Live Schema. Because relation identification is reused, success should be confirmed quietly; wrong choices still receive local corrective feedback.

2. **Identify the direct connection.** The learner selects `round_investment.funding_round_id` as the field that identifies which funding round a participation belongs to. PK/FK is revealed only after that learner action. The reused relationship is acknowledged without re-teaching PK/FK as a new concept.

3. **Confirm the relationship and establish result Grain.** In one compact reused-premises interaction, the learner carries forward the relationship meaning — many participation rows can point to the same funding round, while each participation names one round — and makes the real row-meaning decision that one requested result row represents one recorded round-investor participation. The relationship confirmation may be lighter than the Grain decision. Cardinality labels or equivalent relationship annotation appear only after this interaction is correct. Grain remains a statement about what one requested result row represents; it is not a property of `round_investment` and is not determined merely by the later `FROM` clause.

4. **Measure the participation baseline.** A prepared compact measurement runs `SELECT COUNT(*) FROM round_investment` and returns **72 rows**. The learner runs the measurement; the course identifies the result as 72 recorded participation rows and carries that number forward. This is reuse of a measurement pattern already established in Course 4 / Lesson 1, not a new `COUNT(*)` lesson and not a separate baseline-interpretation quiz.

5. **Predict result row behavior.** With participation Grain, the one-to-many relationship, and the 72-row baseline established, the learner predicts **72 result rows — one for each recorded participation** when each participation is joined to the round it belongs to. The course must not yet name row multiplication as the answer.

6. **Reason about repeated round context.** The learner reasons that round-level values may repeat across several participation-grain result rows without those rows being duplicates. A local source-instance example may make the concrete case inspectable — especially `funding_round_id = 1003`, where one funding-round row relates to four participation rows — but must not show the joined-result construction before the learner has made the repeated-context judgment.

7. **Show the multiple-match mechanism, then name it.** After the learner has made the row-count prediction and the repeated-context judgment, a focused Workbench teaching visual shows the concrete mechanism for `funding_round_id = 1003`: one `funding_round` row, four matching `round_investment` rows, and the four result rows formed by those matches. The explanation makes explicit that one round row matched four participation rows, so its values contribute once per match. Only after this mechanism is visible does the course name **JOIN row multiplication**. The teaching must also state what the concept does not mean: the JOIN did not invent participation records, did not accidentally duplicate rows, and did not change the result Grain away from participation.

8. **Implement the INNER JOIN.** The learner authors the required six-field JOIN. JOIN and `ON` are reused terminology; there is no Lesson-1-style three-beat JOIN teaching sequence and no separate semantic-operation choice. During active authoring the teacher becomes quiet and the SQL Workspace owns execution diagnostics and local assistance.

9. **Inspect the accepted result.** A semantically valid result returns all **72 participation rows**. The complete result remains inspectable in the Results surface rather than being reduced to a small illustrative subset.

10. **Verify from an actual-result-derived `funding_round_id = 1003` slice.** The learner interprets the slice derived from their accepted result: round type and announced date repeat because one round matched several distinct participation rows, while the result Grain remains participation. The slice is evidence for verification, not a second hard-coded answer table.

11. **Complete the Lesson.** Completion visibly closes the argument: participation Grain, 72 starting participation rows, one round matching several participations, repeated round context without accidental duplicates, 72 result rows, and the verified multiple-match mechanism.

The former separate mandatory `3 participations → 3 rows` application is not required completion evidence. A small numeric application may still be used as optional support after the structural reasoning, but it must not become another mandatory gate between the learner's core prediction and SQL authoring.

---

## 5. Evidence and reveal constraints

### 5.1 Protected relation/relationship reasoning

Before the learner establishes the connecting field:

- do not expose the answer through PK/FK badges or a relationship connector;
- the learner selects the candidate field directly in the active Working Schema object;
- learner-facing reasoning prompts, answer ownership, reasoning feedback, and progression remain governed by the stable learner-response lane in `course-design/course-visual-language.md`.

After the correct field is established, the relationship may be revealed as reused PK/FK structure.

### 5.2 Reused premises and baseline

The relationship/Cardinality meaning and result Grain remain required premises, but they do not receive first-exposure teaching treatment. The interaction should preserve the learner's reasoning while reducing repeated explanation and ceremony.

The prepared baseline measurement is part of the current Course 4 / Lesson 2 route. It may disclose the concrete count of 72 recorded participation rows before the learner predicts the JOIN result row count. The baseline supplies evidence; it does not supply the relational conclusion. The learner must still use the established Grain and relationship to predict what happens after the JOIN.

### 5.3 Core pre-execution evidence

Core evidence before SQL requires both:

- **row-behavior prediction:** the accepted JOIN should still return 72 rows, one per recorded participation;
- **repeated-context interpretation:** round-level values can repeat across distinct participation rows without making those rows duplicates.

The course must not name `JOIN row multiplication` or show the joined-result construction that demonstrates the mechanism before those judgments are made.

### 5.4 Instance teaching and concept timing

Schema and instance play different roles in this Lesson:

- the schema establishes what relationship is possible;
- the local relation instance makes the actual multiple matches concrete.

The multiple-match teaching visual appears only after the learner has engaged with the row-behavior and repeated-context reasoning. It is explanatory evidence for the mechanism, not a pre-reasoning answer reveal.

`JOIN row multiplication` is named after that reasoning and concrete mechanism are connected. The concept name explains the behavior already established; it must not replace the reasoning that produces it.

### 5.5 SQL role and post-execution evidence

SQL implements the relational plan after the core reasoning. It must not perform the row-multiplication reasoning for the learner.

The course must not teach that `FROM round_investment` is what determines the result Grain. `FROM` establishes a starting row source in the SQL implementation; the requested result Grain was established earlier from the business meaning of one result row.

Semantic validation may report that an executed SQL result satisfies the required six-field, 72-row participation result contract. That accepted/verified system status does not itself complete the Lesson and must not supply the final relational interpretation. The learner must inspect actual result evidence and explicitly interpret it against the earlier prediction and participation Grain. The `funding_round_id = 1003` slice used for final verification must be derived from the learner's accepted result rather than presented as a separate hard-coded answer table.

### 5.6 Completion and optional enrichment

Lesson completion must be unmistakable and must occur before any optional deeper explanation is presented as a next activity.

Optional post-completion enrichment may explain source instances, row-to-row matching, and how `FROM`, `INNER JOIN`, and `ON` map to the relationship already reasoned about. If a Venn-style view is used, it must be framed narrowly as an inclusion/exclusion aid: it does **not** explain result Grain or row multiplication. Optional enrichment is not a completion gate and must not alter required learner evidence.

---

## 6. SQL and result contract

The required logical output fields are:

`funding_round_id | round_type | announced_date | round_investment_id | investor_id | is_lead`

The current accepted result contains 72 participation rows, with each current `round_investment` represented exactly once together with the correct funding-round context.

Equivalent direct INNER JOIN formulations may be accepted when they produce the same required logical result. Acceptance must not depend on exact query-text matching.

The encounter does not use aggregation, `DISTINCT`, LEFT JOIN, `EXISTS`, or another repair mechanism to collapse or preserve a different Grain.

The final `1003` evidence must show distinct participation rows for one funding round, with round-level context repeating while participation identifiers differ.

The primary result surface should keep all 72 accepted rows inspectable in a scrollable result view. The `1003` verification slice remains a separate derived evidence view for the final interpretation.

---

## 7. Assistance and controls

Course 4 / Lesson 2 uses current `course-design/course-controls.md` for assistance/control semantics.

In particular:

- `Show solution` is available only during active SQL authoring;
- it belongs inside the SQL Workspace;
- it populates the active editable SQL editor with the complete solution;
- it does not run SQL, complete required evidence, or bypass result inspection / final verification;
- Desired Output and SQL Structure remain optional SQL-authoring scaffolds rather than pre-SQL answer reveals.

A broader global hint/adaptive system is not established by this Lesson authority.

---

## 8. Interaction / spatial-authority boundary

Course 4 / Lesson 2 does not define a course-wide left/right ownership path of its own.

The learner route in Section 4 is the pedagogical sequence. Spatial conformance must be checked directly against:

- `course-design/course-visual-language.md`, including the stable learner-response anchor, tool/evidence locality, feedback ownership, transition-control locality, persistent-reference behavior, and genuine phase-handoff requirements;
- `course-design/course-controls.md` for shell controls and SQL-local assistance;
- the Lesson-specific interaction requirements in this document.

Direct manipulation stays on the manipulated object in the Workbench. The reasoning question, learner response, reasoning feedback, Concept Moment / reused-concept consequence, and local progression remain in the learner-response lane. Results and the `1003` evidence slice remain in the Workbench while the verification interaction stays in the learner-response lane.

The superseded 2026-09-15 Stage 1–3 target-topology decision/review/post-build chain is not Course 4 / Lesson 2 authority and is no longer present in the active tree.

---

## 9. Completion evidence

Completion requires evidence that the learner has:

- selected the relevant relations;
- identified the direct participation-to-round connection field;
- carried forward the one-to-many relationship meaning;
- established participation Grain;
- run the prepared 72-row participation baseline;
- predicted a 72-row participation-grain JOIN result;
- reasoned that repeated round context across distinct participation rows is not accidental duplication;
- encountered the concrete multiple-match mechanism before the concept was named;
- produced a semantically valid required INNER JOIN result;
- verified the actual `1003` evidence slice as distinct participation-grain rows with repeated round context.

The former standalone numeric `3 → 3` application is not required completion evidence.

Lesson completion is a state, not an additional teaching episode.

---

## 10. Explicit non-scope

This Lesson does not establish:

- LEFT JOIN or `NULL` behavior;
- aggregation or pre-aggregation;
- fan-out repair strategies;
- bridge-table or many-to-many reasoning;
- a global hint system;
- adaptive assistance;
- new Retry / Redo semantics;
- a reusable Lesson template;
- cumulative independent transfer to a materially new relation pair.

---

## 11. Reconciliation note

This authority now reflects the later approved Course 4 / Lesson 2 target experience rather than merely extracting the earlier Cycle 1 route.

The substantive reconciled decisions are:

- Course 4 / Lesson 2's conceptual identity is **Multiple matches**;
- the prepared 72-row participation baseline is part of the route;
- reused relationship/Cardinality and result Grain are handled compactly without first-exposure re-teaching;
- the learner predicts row behavior and reasons about repeated context before the mechanism is named;
- a concrete `1003` relation-instance visual demonstrates one round row matching four participation rows and producing four result rows;
- `JOIN row multiplication` names that multiple-match mechanism after the learner reasoning;
- the former mandatory standalone `3 participations → 3 rows` application is no longer completion evidence;
- the accepted result keeps all 72 rows inspectable and final verification uses a `1003` slice derived from that result.

Historical production artifacts remain preserved as provenance and should not be rewritten retroactively to match this reconciled authority.
