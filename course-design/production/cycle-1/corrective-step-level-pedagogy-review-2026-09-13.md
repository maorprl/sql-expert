# Cycle 1 — Corrective Step-Level Pedagogy Review

**Role:** Independent Pedagogy Reviewer  
**Status:** CORRECTIVE REVIEW COMPLETE — REVISION REQUIRED  
**Date:** 2026-09-13  
**Reviewed encounter:** current `Funding participation` implementation (`funding_round → round_investment`)

This review is performed under:

- `learner-encounter-production-process.md`
- `learner-encounter-production-execution.md`
- `learner-encounter-pedagogy-step-review-protocol.md`

The review does not treat any prior Pedagogy, UX, Auditor, or implementation verdict as evidence that the current learner sequence is sound. Prior artifacts are used only to establish current authority and traceability.

## 1. Current sources inspected

Current learner/course authority and implementation inspected for this review:

- `pedagogical-foundations.md`
- `course-design/course-visual-language.md`
- `course-design/course-controls.md`
- `course-design/stage-1/stage-1-learner-route.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`
- `course-design/test-drives/stage-1-targeted-test-drive-2026-09-10.md`
- `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-and-waiver-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-structural-reuse-2026-09-13.md`
- current `src/media-coverage.js` and `src/media-coverage.css`
- current `src/funding-participation.js` and `src/funding-participation.css`
- current `src/main.js` and shared `src/styles.css`

The relevant prerequisite comparator is the current Media coverage encounter. It is used by function, not as a template to clone.

---

## 2. Review question

The corrective question is broader than whether the target row-multiplication evidence is technically valid:

> Does the current Funding participation encounter form a complete, supportable learner journey from business situation through relational reasoning, SQL implementation, result evidence, and verification — at the learner state established by the prior encounter?

**Verdict: no.**

The core reasoning chain is substantially sound after the targeted revisions, but the journey around it is pedagogically incomplete in several material places. The defects are not cosmetic. They affect orientation, continuity, the transition from reasoning to implementation, and the evidence context after SQL execution.

---

## 3. Mandatory Step Ledger

| Step | Entering learner state | Pedagogical role | Learner action / support | Transition function | Finding |
|---|---|---|---|---|---|
| Persistent Business request | Learner has completed one first-JOIN encounter; current case is new | Orientation and analytical purpose | Current copy describes funding-round context plus recorded investor-participation detail | Should create a natural reason to inspect the two relations without giving away later reasoning | **REVISION REQUIRED** — wording remains schema-like and substantially prefigures participation Grain |
| Identify relations | Relation identification introduced previously but not established for broad transfer | Reuse checkpoint | Learner selects `funding_round` and `round_investment`; local guidance points to round context vs participation detail | Re-establishes learner ownership of the relevant relation set | **PASS** after structural-reuse revision |
| Trace connection | Direct relationship reading introduced previously | Reuse checkpoint | Learner selects `round_investment.funding_round_id`; PK/FK reveal follows success | Makes later Cardinality judgment grounded in learner-established structure | **PASS** after structural-reuse revision |
| Set result Grain | Grain introduced and practised once | Core reasoning | Closed choice; guidance asks what must remain individually represented | Establishes row meaning used by later multiplication prediction | **PASS WITH REVISION DEPENDENCY** — interaction is sound, but opening request currently leaks too much of the answer |
| Read Cardinality | Cardinality introduced and practised once | Core reasoning / reuse | Learner identifies one round → many participations | Provides structural premise for multiplication | **PASS** |
| Prediction A: same round with several participations | Grain + Cardinality locally established | Primary core evidence | Learner predicts that one round can occupy several participation rows; hints remain local | Establishes qualitative multiplication before numeric example or SQL | **PASS** after owner-directed qualitative-prediction revision |
| Prediction B: repeated round context | Prior qualitative multiplication established | Primary core evidence | Learner distinguishes repeated one-side values from accidental duplicate rows | Establishes interpretation required after SQL | **PASS** |
| Concept Moment | Learner has already derived the behavior | Concept naming / consolidation | `JOIN row multiplication` is named and visualized only after prediction | Gives terminology to reasoning already performed | **PASS** |
| Concrete 3-participation application | Structural behavior already established | Supporting application | Learner maps 3 participations to 3 participation rows | Provides a small concrete transfer before SQL | **PASS**, correctly supporting rather than core evidence |
| Transition into SQL | Learner has authored one JOIN previously, but broad independent transfer is not established | Continuity bridge from relational reasoning to implementation | Current runtime largely jumps to “Write the JOIN”; Working Schema and earlier prediction remain, Desired Output is optional | Should reconnect current relationship and previously learned `JOIN ... ON ...` structure without replaying first-exposure teaching | **REVISION REQUIRED** — current bridge is too thin |
| SQL authoring | One learner-authored JOIN exists in prior encounter | Independent implementation with calibrated assistance | Blank editor; Desired Output; Show solution; no current SQL-structure scaffold | Should let learner implement established reasoning while retaining optional retrieval support | **REVISION REQUIRED** — support reduction is not adequately calibrated to the learner state |
| Show solution | SQL task active | Local assistance | Solution appears in an overlay positioned relative to the whole lab workspace | Should assist authoring without obscuring unrelated evidence | **REVISION REQUIRED** — assistance locality is wrong in runtime |
| Execute SQL / inspect result | Learner has committed prediction and authored SQL | Empirical evidence | Semantically valid query returns 72 rows | Should allow learner to compare authored operation and result before interpretation | **REVISION REQUIRED** — result state replaces/hides the editor, breaking evidence continuity |
| Inspect 1003 slice | Actual result available | Focused evidence inspection | Four rows for one funding round are isolated from learner result | Supplies concrete evidence for repetition/distinct-participation interpretation | **PASS WITH CONTINUITY DEFECT** — slice is strong, but prior SQL/prediction are not kept sufficiently co-present |
| Final verification | Prior prediction + result evidence should be jointly available | Core post-execution reconciliation | Learner identifies four distinct participation rows with repeated round context | Closes prediction → execution → evidence loop | **PASS IN CONTENT; REVISION REQUIRED IN CONTEXT** |
| Completion | Core evidence collected | Closure | Restates row multiplication meaning | Consolidates conclusion | **PASS** |

---

## 4. Material findings

### F1 — REVISION REQUIRED — Opening business request is still technically framed and pre-empts later reasoning

The current learner-facing request is closer to a schema/output description than a natural business need. Phrases such as “funding-round context” and “recorded investor-participation details” are data-model language rather than ordinary analytical language.

More importantly, framing the request around every recorded participation makes the later Grain question partially answerable by paraphrasing the opening text rather than by interpreting the analytical task.

This conflicts with the current Business Question Precision and Non-Preemption foundation.

**Required correction:** rewrite the opening request as a concise, natural analytical need. Keep exact output fields and implementation contract local to SQL authoring. The revised request must orient the learner without stating the target Grain in equivalent form.

---

### F2 — REVISION REQUIRED — The no-Baseline decision was justified only against prerequisite/evidence leakage, not against learner-journey function

The design explicitly chose not to use a Baseline `COUNT(*)` because the target capability can be evidenced qualitatively and because an exact numeric target should not replace Cardinality + Grain reasoning.

That is a valid evidence-protection concern, but it does not answer the separate pedagogical question: whether the learner benefits from an empirical starting reference before later interpreting a 72-row result.

The prior encounter used a baseline not merely as SQL practice but as an orientation/evidence anchor: establish the starting rows, make a prediction, then compare the result. In the current encounter, removing that function leaves the actual 72-row result with no comparable dataset-level starting measurement in the learner journey.

**Required correction:** the Architect must reconsider the Baseline decision explicitly under the Measurement / Baseline Test. A compact starting measurement may be added if it supports a meaningful before/after comparison **without becoming the core prediction or revealing the qualitative conclusion**. If the revised design still omits a baseline, it must identify what other step performs the lost orientation/comparison function.

This finding does **not** establish a course-wide requirement that every encounter use `COUNT(*)`.

---

### F3 — REVISION REQUIRED — “Do not re-teach JOIN” became an unsupported reasoning→SQL jump

The course may legitimately assume that JOIN and `ON` have been introduced. It may not assume broad independent transfer after one constrained authored JOIN.

The current runtime moves from the row-multiplication application to a thin authoring instruction: write the JOIN for the participation audit. The learner has the Working Schema and an optional Desired Output contract, but the runtime does not provide the compact reconnective bridge described in the design: current relationship → known `JOIN ... ON ...` implementation structure.

The prior first-JOIN encounter used three teaching beats because JOIN was new. Those three beats should **not** be replayed. Their first-exposure teaching function can disappear. The continuity function cannot simply disappear with them.

**Required correction:** add a short reuse bridge before or inside the SQL authoring state that reconnects the relationship already established to the previously learned JOIN structure. A reduced optional `SQL Structure` scaffold is appropriate because it retrieves known syntax shape without filling the current solution.

---

### F4 — REVISION REQUIRED — SQL scaffolding reduction is not calibrated to the learner state

Stage 1 provides both Desired Output and SQL Structure on demand. Funding participation now provides Desired Output, but not the structure reminder.

The issue is not visual symmetry. The learner has authored only one prior JOIN in a highly scaffolded first-exposure encounter; broad transfer is explicitly not established. Removing all structure retrieval support therefore shifts more responsibility than the current learner-state evidence justifies, while adding no diagnostic value to the row-multiplication target.

**Required correction:** retain independent SQL authorship, but provide a secondary/on-demand SQL-structure reminder that does not populate the editor, identify the exact selected fields automatically, or run the query.

---

### F5 — REVISION REQUIRED — `Show solution` is not local to the editor surface

Current runtime positions the solution panel relative to the whole lab workspace. It can visually cover result space and behaves like a workspace overlay rather than editor-local assistance.

`Show solution` is assistance for the concrete SQL authoring task. Its visual and interaction boundary should therefore be the editor/authoring pane.

**Required correction:** bound the solution surface to the editor pane, with internal scrolling if needed. It must not cover result evidence or behave as a global workspace modal.

---

### F6 — REVISION REQUIRED — Result presentation removes the learner-authored SQL from the evidence context

After successful execution, the shared result choreography hides `#editor` and collapses the workspace to a result-only state.

That is a pedagogical defect in this encounter. The learner is being asked to interpret **what their authored JOIN produced** and reconcile it with an earlier prediction. Hiding the authored operation removes one of the relevant evidence surfaces at exactly the point of comparison.

The result may become more prominent after execution, but the editor should remain visible or immediately recoverable in the same evidence context.

**Required correction:** preserve the learner-authored SQL alongside/above the result during result inspection and verification. Do not reset or replace it. The same rule should apply to equivalent SQL-result verification states in the prerequisite encounter unless a specific encounter authority establishes a reason to hide it.

---

### F7 — REVISION REQUIRED — Prediction → SQL → result evidence continuity is incomplete

The final 1003 slice is a strong local evidence choice. However, the learner should be able to see or immediately recover both:

- the committed pre-execution prediction;
- the SQL that produced the actual result.

Current runtime emphasizes the result but does not preserve those comparison anchors strongly enough.

**Required correction:** keep a compact earlier-prediction summary adjacent to the result/verification context, and preserve the authored SQL in the same workspace. The verification should feel like reconciliation of three linked artifacts — prediction, operation, result — rather than a new isolated question about four rows.

---

## 5. What should **not** be restored from Stage 1

The corrective review does not recommend cloning Media coverage.

The following first-exposure teaching can remain absent or substantially reduced:

- re-introducing Grain as a new concept;
- re-introducing PK/FK terminology as a new concept;
- re-introducing Cardinality vocabulary as a new concept;
- the full three-beat first explanation of JOIN semantics;
- a prepared JOIN solution before learner authors SQL;
- any explanation that would disclose row multiplication before the learner predicts it.

The required repair is continuity, not repetition.

---

## 6. Current strengths to preserve

The following parts of the current encounter are pedagogically strong and should be preserved unless a later reconciliation identifies a direct conflict:

- learner-selected relations and learner-established connection before PK/FK reveal;
- Grain before the multiplication prediction;
- Cardinality before the multiplication prediction;
- qualitative prediction before numeric example and before SQL;
- separate prediction that repeated one-side context does not imply duplicate rows;
- Concept Moment only after learner commitment;
- concrete 3-participation application as supporting evidence rather than core evidence;
- learner-authored SQL rather than prefilled solution;
- semantically checked result rather than exact SQL-text matching;
- focused post-query evidence slice for one funding round;
- final interpretation requiring distinct participation identity plus repeated round context.

---

## 7. Continuity assessment against Media coverage

| Pedagogical function | Media coverage | Funding participation current | Required progression decision |
|---|---|---|---|
| Natural business orientation | Present but historically imperfect | Still technical / model-like | Improve; later encounter should be more natural, not less |
| Learner relation selection | Required | Required after targeted revision | Preserve |
| Learner connection reading | Required | Required after targeted revision | Preserve with less first-exposure explanation |
| Grain | First exposure | Reuse | Preserve, no NEW CONCEPT treatment |
| Cardinality | First exposure | Reuse | Preserve, no NEW CONCEPT treatment |
| Baseline / empirical starting point | Prepared measurement | Omitted | Reconsider by function, not by symmetry |
| Prediction before execution | Row preservation | Row multiplication | Preserve; this is the core progression contrast |
| Semantic operation / implementation bridge | Explicit choice + JOIN teaching | Very thin runtime bridge | Reduce first-exposure teaching, but restore continuity bridge |
| Desired Output | Optional | Optional | Preserve |
| SQL Structure | Optional | Absent | Restore as reduced optional retrieval scaffold |
| Learner-authored SQL | Yes | Yes | Preserve |
| Authored SQL visible during result interpretation | Should remain evidentially connected | Hidden by current shared result state | Repair shared choreography |
| Result verification against prediction | Yes | Yes | Strengthen co-presence of prediction + SQL + result |

The later encounter should be shorter and more independent than the first JOIN encounter. It should not be thinner in the connective tissue that lets the learner use what was previously learned.

---

## 8. Final verdict

**REVISION REQUIRED.**

The current encounter contains valid and useful core row-multiplication reasoning, but it is not yet a complete supportable learner journey at the current course position.

The required revision is not a restart of the capability or case by default. It is a targeted Encounter Design / learning-journey repair covering:

1. natural, non-preemptive Business Request;
2. explicit reconsideration of the Baseline/measurement function;
3. calibrated continuity bridge into JOIN SQL;
4. optional SQL-structure retrieval scaffold;
5. editor-local solution assistance;
6. preservation of learner-authored SQL during result/verification;
7. co-present prediction + SQL + result evidence during final reconciliation.

Under the existing change-impact rules, these findings require Architect reconciliation and a pedagogical/UX design revision before runtime implementation changes are accepted.
