# Cycle 1 — Architect Reconciliation and Targeted Learner-Journey Revision

**Role:** Encounter Architect  
**Status:** RECONCILED — TARGETED IMPLEMENTATION AUTHORITY DEFINED  
**Date:** 2026-09-13  
**Scope:** Current Funding participation encounter only

This record responds to:

`course-design/production/cycle-1/corrective-step-level-pedagogy-review-2026-09-13.md`

It preserves the accepted target capability and accepted `funding_round → round_investment` case. It does not restart Capability / Case Validation and does not establish a reusable Stage template.

The purpose of this revision is to repair the learner journey around the already-valid row-multiplication evidence chain.

---

## 1. Finding dispositions

| Finding | Disposition | Reconciliation |
|---|---|---|
| F1 — Business request is technical and pre-empts later reasoning | **ACCEPTED** | Replace with natural analytical wording that requests investor participation/lead information without stating the result Grain or exact output contract. |
| F2 — No-Baseline decision lacked learner-journey analysis | **ACCEPTED WITH MODIFICATION** | Add a compact one-side baseline measurement after Grain + Cardinality and before the qualitative prediction. It is orientation/supporting evidence, not core capability evidence. |
| F3 — Reasoning→SQL bridge is too thin | **ACCEPTED** | Add a compact reuse bridge between application and SQL authoring. Do not repeat first-exposure JOIN teaching. |
| F4 — SQL scaffolding reduction exceeds learner-state evidence | **ACCEPTED** | Add optional `Show SQL structure` beside existing Desired Output. It retrieves previously learned structure without supplying the complete query. |
| F5 — Show solution locality is wrong | **ACCEPTED** | Bound solution assistance to the editor authoring pane. It must not overlay Results. |
| F6 — Result state hides learner-authored SQL | **ACCEPTED** | Keep the successful authored SQL visible in result and verification states. Results gain prominence but do not replace the editor. |
| F7 — Prediction→SQL→result continuity is incomplete | **ACCEPTED** | Keep the committed prediction visible/recoverable in the result/verification workspace and preserve the executed SQL beside the actual result evidence. |

No finding requires reopening the accepted capability or relation pair.

---

## 2. Revised persistent business request

Replace the current request with:

> **The investment team wants to review which investors took part in each funding round and see which of them were marked as lead.**

Why this wording is accepted:

- it is a normal analytical need rather than a schema description;
- it identifies the business information needed without naming table structure;
- it does not state that one output row must equal one participation;
- it does not list the six SQL output fields;
- it naturally motivates consulting round and participation information.

The exact output contract remains local to SQL authoring.

---

## 3. Revised learner sequence

The revised learner sequence is:

1. identify relevant relations;
2. trace the participation-to-round connection;
3. establish target result Grain;
4. interpret relationship Cardinality;
5. establish a compact funding-round baseline measurement;
6. make the qualitative multiplication prediction;
7. predict repeated round context across distinct participation rows;
8. name JOIN row multiplication;
9. apply the reasoning to a concrete three-participation case;
10. reconnect established reasoning to previously learned JOIN structure;
11. author the SQL with optional local scaffolds;
12. inspect actual result while authored SQL remains visible;
13. inspect the funding-round 1003 slice with the committed prediction still visible/recoverable;
14. verify the result against the prediction;
15. complete.

The sequence is intentionally not a clone of Media coverage. New-concept teaching for Grain, PK/FK, Cardinality, and JOIN remains absent.

---

## 4. Revised Baseline decision

### 4.1 Purpose

The baseline is added as a compact **measurement/orientation step**, not as core row-multiplication evidence and not as a test of SQL authorship.

Its purpose is to give the learner a concrete one-side starting reference that can later be reconciled with the actual joined result.

### 4.2 Placement

Place the baseline **after** target Grain and Cardinality have been established and **before** the qualitative multiplication prediction.

This prevents a numeric comparison from substituting for the structural reasoning.

### 4.3 Prepared measurement

Use a prepared local measurement:

```sql
SELECT COUNT(*) FROM funding_round;
```

Current expected result:

> **26**

The learner must interpret the value as:

> **26 funding-round rows in the starting one-side relation.**

The baseline does **not** reveal:

- the number of participation rows;
- the final JOIN row count;
- the conclusion that rows will multiply;
- the exact multiplicity of any funding round used in later verification.

### 4.4 Evidence meaning

Baseline interpretation is supporting evidence only.

Core pre-execution evidence remains:

- participation target Grain;
- one-round-to-many-participations Cardinality;
- qualitative prediction that one round can occupy several participation rows;
- prediction that round context can repeat across distinct participation rows.

The learner must still make those predictions without being given the final 72-row result.

---

## 5. Revised prediction context

During qualitative prediction, keep three already-established premises visible in compact form:

- **Target result Grain:** one recorded participation per result row;
- **Relationship:** one funding round can have multiple recorded participations;
- **Starting one-side baseline:** 26 funding-round rows.

The prediction question must remain qualitative. The learner is **not** asked to calculate the final total row count from the baseline.

The baseline is present as orientation; Grain + Cardinality remain the reasoning needed to answer the core prediction.

---

## 6. Revised reasoning→SQL continuity bridge

After the concrete three-participation application and before the clean SQL editor becomes the primary action, show one compact reuse transition.

Suggested learner-facing heading:

> **Carry the relationship into SQL**

Suggested body:

> You already established the two relations and how they connect. Reuse the JOIN pattern you learned earlier: start from one relation, add the related relation with `JOIN`, and express the established key match in `ON`.

Keep visible/recoverable:

- target Grain;
- the established `round_investment.funding_round_id → funding_round.funding_round_id` relationship;
- the earlier multiplication prediction.

This is retrieval/continuity support. It must not replay the three-beat first-JOIN teaching sequence or fill the editor with the solution.

---

## 7. Revised SQL authoring state

Primary prompt:

> **Write the JOIN for the participation review.**

Supporting copy:

> Use the relationship you already established. The result should let you inspect the round together with each recorded investor participation.

### 7.1 Optional Desired Output

Keep Desired Output on demand with the six-field contract:

- `funding_round_id`
- `round_type`
- `announced_date`
- `round_investment_id`
- `investor_id`
- `is_lead`

The contract belongs here, not in the persistent Business Request.

### 7.2 Optional SQL Structure

Add a second optional scaffold:

```sql
SELECT ...
FROM funding_round
JOIN round_investment
  ON ...
```

Accompany it with a short reminder:

> Use `JOIN` to add the participation relation and `ON` to express the relationship you already established.

This scaffold must not populate the editor and is not equivalent to Show solution.

### 7.3 Show solution

`Show solution` remains available only while the SQL authoring task is active.

The solution surface must:

- be visually and spatially bounded to the editor authoring pane;
- use internal scrolling if required;
- not cover the Results pane;
- not populate the editor;
- not run SQL;
- continue to record solution assistance provenance where current implementation tracks it.

---

## 8. Revised SQL→Result evidence continuity

After a semantically valid query runs:

- preserve the successful learner-authored SQL in the editor pane;
- keep the editor visible in the same SQL workspace;
- show the actual Results pane below or alongside it according to responsive layout;
- Results become the stronger evidence surface, but do not replace the SQL;
- hide authoring-only assistance controls such as Show solution when the authoring task is complete;
- do not clear or overwrite the editor automatically.

The shared result choreography should therefore represent:

> **executed SQL + actual result**

rather than:

> **result instead of SQL**.

This requirement applies to the current Funding participation verification flow and should also govern the equivalent Media coverage result-verification state unless a separate current authority establishes a pedagogical reason to hide SQL there.

---

## 9. Revised result and verification context

After successful execution, learner-facing status may state:

> **Query executed — 72 rows returned.**

At this point, also keep a compact prediction summary visible/recoverable:

> **Earlier prediction:** one funding round can occupy several participation rows when several participations belong to it, and round-level context can repeat across those distinct rows.

The learner then inspects `funding_round_id = 1003` using the existing evidence slice.

The final verification question and accepted interpretation remain unchanged in substance:

> The four rows are distinct participation rows for the same funding round; repeated round context is expected because participation identity differs.

The verification context must allow the learner to compare three linked artifacts without leaving the flow:

1. committed prediction;
2. executed SQL;
3. actual result / 1003 evidence slice.

---

## 10. Implementation invariants

Implementation must preserve all of the following:

- Business Request does not expose result Grain or exact output fields.
- Relations and direct connection remain learner-established before reveal, as required by the structural-reuse revision.
- Baseline occurs only after Grain + Cardinality and does not reveal final JOIN count.
- Qualitative multiplication prediction remains before Concept Moment, concrete multiplicity, and SQL.
- Baseline is not promoted to core capability evidence.
- No row-multiplication conclusion is shown before the learner commits the qualitative prediction.
- SQL bridge is short reuse support, not first-exposure JOIN teaching.
- Desired Output and SQL Structure remain optional.
- Show solution remains editor-local and authoring-only.
- Successful authored SQL remains visible during result inspection and verification.
- Actual result remains the primary post-execution evidence.
- Earlier prediction remains visible/recoverable during verification.
- 1003 slice and final interpretation remain evidence-local.
- No aggregation, DISTINCT repair, LEFT JOIN, EXISTS, pre-aggregation, investor-name traversal, or amount reconciliation is introduced.

---

## 11. Implementation boundary

The required implementation delta is expected to touch only current learner/runtime surfaces needed for this repair, principally:

- `src/main.js` — revised persistent Funding participation Business Request;
- `src/funding-participation.js` — baseline state, SQL reuse bridge, optional SQL Structure, revised SQL/result handoffs, prediction summary;
- `src/funding-participation.css` — encounter-specific baseline/bridge presentation where needed;
- `src/styles.css` — shared editor/result choreography and editor-local solution assistance where the behavior is genuinely shared;
- `src/media-coverage.js` / `src/media-coverage.css` only if required to preserve the shared SQL/result evidence-continuity invariant after the shared CSS change.

Do not create a new shared CSS layer. Reuse the existing shared `styles.css` plus encounter-specific CSS files.

No schema/data change is authorized by this reconciliation.

---

## 12. Final reconciliation status

All seven corrective Pedagogy Review findings are resolved at design level.

The accepted capability and case remain unchanged.

The implementation is now authorized only to the targeted learner-journey delta defined above. Runtime acceptance remains paused until implementation and required downstream review are complete.
