# Stage 2 authority — JOIN row multiplication

**Status:** CURRENT EXTRACTED AUTHORITY — NO PEDAGOGY CHANGE  
**Scope:** current `funding_round → round_investment` learner encounter only

This document extracts the already-established current Stage 2 learner design from the historical `course-design/production/cycle-1/` chain into one readable authority surface.

It does **not** introduce a new learner step, answer, evidence requirement, concept, SQL rule, control rule, topology rule, or implementation behavior.

For course-wide behavior, this Stage remains constrained by:

- `pedagogical-foundations.md`;
- `course-design/course-visual-language.md`;
- `course-design/course-controls.md`.

There is no separate current Stage 1–3 topology authority. Spatial placement, locality, handoffs, and visual ownership must be derived directly from the course-level visual/control authority together with the Stage-specific requirements below. If those sources leave a material spatial question unresolved, that question remains unresolved until explicitly decided; it must not be silently filled by a derived topology document or implementation convention.

Historical Cycle 1 production artifacts remain provenance and decision history. They are not a flat set of current Stage 2 authority once a decision has been superseded or promoted into current course-level authority.

---

## 1. Encounter purpose

Stage 2 develops the ability to use **target Grain + relationship Cardinality** to predict JOIN row multiplication before relying on execution.

The learner must understand that when one funding round has several recorded participation rows:

- the funding round can occupy several result rows at participation Grain;
- round-level context can repeat across those rows;
- repeated round context does not make those rows duplicates when each row represents a different recorded participation.

The target is relational reasoning. Correct JOIN syntax or a correct numeric answer alone is not sufficient evidence of the capability.

---

## 2. Business case and relation pair

The learner works from the business need to review which investors participated in each funding round and which participations were marked as lead.

The relevant relations are:

- `funding_round` — funding-round context;
- `round_investment` — recorded investor participation and lead status.

The direct relationship is:

`round_investment.funding_round_id` → `funding_round.funding_round_id`

Each participation belongs to one funding round. One funding round can have multiple participation records.

---

## 3. Course-assumed learner state

Stage 2 reuses, rather than re-teaches as first exposure:

- relation identification;
- direct PK/FK relationship reading;
- Grain;
- Cardinality;
- INNER JOIN and `ON`;
- prediction before execution;
- result inspection and verification.

Previously learned does **not** mean pre-resolved. The learner still performs the relation-selection and connecting-field actions needed for this case.

Those entry actions are reuse checkpoints. They are not new first-exposure Concept Moments and are not, by themselves, the core evidence for row multiplication.

Stage 2 must not assume LEFT JOIN / `NULL`, aggregation, pre-aggregation, bridge-table reasoning, fan-out repair, or broader independent end-to-end transfer.

---

## 4. Current learner route

The current sequence is:

1. **Identify relevant relations.** Start from an empty Working Schema. The learner identifies and selects `funding_round` and `round_investment` from Live Schema.
2. **Identify the direct connection.** The learner selects `round_investment.funding_round_id` as the field that identifies which funding round a participation belongs to. PK/FK is revealed only after that learner action.
3. **Establish target Grain.** One requested result row represents one recorded round-investor participation.
4. **Interpret Cardinality.** One funding round can relate to multiple participation records; each participation belongs to one funding round.
5. **Predict row multiplication qualitatively.** Before any concrete child count is supplied, the learner predicts that the same funding round can occupy several result rows when several participation records must remain represented at participation Grain.
6. **Predict repeated context.** The learner predicts that round-level fields can repeat across those distinct participation rows without making the rows duplicates.
7. **Name the behavior.** Only after both qualitative predictions are resolved, introduce **JOIN row multiplication** as the name for the behavior the learner already reasoned out.
8. **Apply the idea concretely.** After the structural prediction, a supporting application may ask that three recorded participations require three participation-grain rows.
9. **Implement the INNER JOIN.** The learner authors the required six-field JOIN.
10. **Inspect the accepted result.** The actual result becomes evidence.
11. **Verify from an actual-result-derived `funding_round_id = 1003` slice.** The learner interprets the repeated round context against distinct participation identifiers.
12. **Complete the Stage.** Completion closes the reasoning loop after verification.

No Baseline `COUNT(*)` measurement, separate semantic-operation checkpoint, or Stage-1-style three-beat JOIN teaching sequence belongs to the current Stage 2 route.

---

## 5. Evidence and reveal constraints

### 5.1 Protected relation/relationship reasoning

Before the learner establishes the connecting field:

- do not expose the answer through PK/FK badges or a relationship connector;
- the learner selects the candidate field directly in the active Working Schema object;
- corrective feedback for that direct object action should remain local enough to the action to satisfy current `course-design/course-visual-language.md`.

This Stage-specific requirement does **not** independently move the whole learner-facing Current Step, actionable prompt, or learner-response role into another page region. Any broader placement decision must come from current course-level authority, not from this Stage extraction.

After the correct field is established, the relationship may be revealed as reused PK/FK structure.

### 5.2 Core pre-execution evidence

Core evidence requires both:

- **qualitative multiplication prediction:** from participation Grain + one-to-many relationship, one funding round can occupy several result rows when several participation records must remain represented;
- **repeated-context interpretation:** round-level values can repeat while participation identity differs, so repetition alone does not make the rows duplicates.

The course must not supply a concrete child count, a row-multiplication conclusion, an explanatory multiplication visual, or the actual `1003` result slice before the qualitative core prediction.

The concrete `3 participations → 3 participation-grain rows` step is supporting application, not sufficient core evidence by itself.

### 5.3 Concept timing

`JOIN row multiplication` is named only after the learner has completed the qualitative multiplication prediction and the repeated-context / non-duplicate prediction.

The concept name explains the behavior already established; it must not replace the reasoning that produces it.

### 5.4 SQL role

SQL implements the relational plan after the core prediction. It must not perform the row-multiplication reasoning for the learner.

JOIN and `ON` are reused terminology, not new Concept Moments in this Stage.

### 5.5 Post-execution evidence

Successful SQL execution does not by itself complete the Stage or announce the final relational interpretation.

The learner must inspect actual result evidence and explicitly verify the earlier prediction. The `funding_round_id = 1003` slice used for final verification must be derived from the learner's accepted result rather than presented as a separate hard-coded answer table.

---

## 6. SQL and result contract

The required logical output fields are:

`funding_round_id | round_type | announced_date | round_investment_id | investor_id | is_lead`

The current accepted result contains 72 participation rows, with each current `round_investment` represented exactly once together with the correct funding-round context.

Equivalent direct INNER JOIN formulations may be accepted when they produce the same required logical result. Acceptance must not depend on exact query-text matching.

The encounter does not use aggregation, `DISTINCT`, LEFT JOIN, `EXISTS`, or another repair mechanism to collapse or preserve a different Grain.

The final `1003` evidence must show distinct participation rows for one funding round, with round-level context repeating while participation identifiers differ.

---

## 7. Assistance and controls

Stage 2 uses current `course-design/course-controls.md` for assistance/control semantics.

In particular:

- `Show solution` is available only during active SQL authoring;
- it belongs inside the SQL Workspace;
- it populates the active editable SQL editor with the complete solution;
- it does not run SQL, complete required evidence, or bypass result inspection / final verification;
- Desired Output and SQL Structure remain optional SQL-authoring scaffolds rather than pre-SQL answer reveals.

A broader global hint/adaptive system is not established by this Stage authority.

---

## 8. Interaction / spatial-authority boundary

Stage 2 does not define a course-wide L/R ownership path.

The learner route in Section 4 is the pedagogical sequence. It must not be converted into a spatial ownership sequence by inference.

Spatial conformance for Stage 2 must be checked directly against:

- `course-design/course-visual-language.md`, including the stable learner-response anchor, tool/evidence locality, feedback ownership, transition-control locality, persistent-reference behavior, and genuine phase-handoff requirements;
- `course-design/course-controls.md` for shell controls and SQL-local assistance;
- the Stage-specific interaction requirements in this document.

The superseded 2026-09-15 Stage 1–3 target-topology decision/review/post-build chain is not Stage 2 authority and is no longer present in the active tree.

---

## 9. Completion evidence

Completion requires evidence that the learner has:

- selected the relevant relations;
- identified the direct participation-to-round connection field;
- established participation Grain;
- interpreted the one-to-many relationship;
- made the qualitative row-multiplication prediction before concrete numeric application;
- predicted repeated round context across distinct participation rows;
- completed the supporting concrete application;
- produced a semantically valid required INNER JOIN result;
- verified the actual `1003` evidence slice as distinct participation-grain rows with repeated round context.

Stage completion is a state, not an additional teaching episode.

---

## 10. Explicit non-scope

This Stage does not establish:

- LEFT JOIN or `NULL` behavior;
- aggregation or pre-aggregation;
- fan-out repair strategies;
- bridge-table or many-to-many reasoning;
- a global hint system;
- adaptive assistance;
- new Retry / Redo semantics;
- a reusable Stage template;
- cumulative independent transfer to a materially new relation pair.

---

## 11. Extraction trace

This authority is an extraction, not a redesign. Its Stage-specific content is traceable to the current accepted row-multiplication decision chain:

- `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md` — accepted case, capability, output contract, SQL/result role and broad encounter design;
- `course-design/production/cycle-1/owner-directed-targeted-revision-and-waiver-2026-09-13.md` — qualitative multiplication prediction before numeric application; repeated-context evidence; revised reveal order;
- `course-design/production/cycle-1/owner-directed-targeted-revision-structural-reuse-2026-09-13.md` — learner-performed relation selection and connecting-field reuse before relationship reveal; current Grain/Cardinality entry sequence;
- `course-design/production/cycle-1/test-drive-finding-connection-focus-2026-09-13.md` — Stage-specific direct Working-Schema connection interaction/locality finding;
- `course-design/production/cycle-1/implementation-record-owner-directed-2026-09-13.md`, especially the 2026-09-15 conformance-restoration addendum — evidence that the runtime was restored to the controlling learner sequence; this record is conformance evidence, not permission to invent missing pedagogy or topology;
- `course-design/course-controls.md` — current Show solution and SQL-assistance semantics, superseding older production-era control statements;
- `course-design/course-visual-language.md` — current course-level visual/locality constraints.

If a future change alters Stage 2 pedagogy, evidence, SQL semantics, course-wide controls, or course-wide visual/spatial authority, this file should be updated through that substantive decision. Historical production artifacts should remain preserved as provenance rather than rewritten retroactively.
