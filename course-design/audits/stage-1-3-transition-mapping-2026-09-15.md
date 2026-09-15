# Stage 1–3 spatial transition mapping

**Date:** 2026-09-15  
**Status:** MAPPING COMPLETE — UNREVIEWED — NO RUNTIME CHANGE  
**Current main inspected:** `7fee5387d96c8a56e28693ecc01d53fbb33afc7c`  
**Runtime tree baseline:** current main has no file differences from `bd9ff8a33e32bd07f8ed5601f14457ac5ea28285` after the incorrect prior mapping was reverted.  
**Scope:** actual Stage 1–3 learner-facing spatial topology against the current `course-visual-language.md` and `course-controls.md`. This is not an implementation plan and does not authorize runtime changes.

## 1. What this mapping records

This is a **state-by-state / material-substate spatial map** of the current runtime. It is deliberately not the earlier abstract transition classification.

For each material learner state it records:

- where the current prompt / learner response actually lives;
- where the action, tool, or evidence lives;
- where wrong/correct feedback and local progression controls appear;
- what happens to Working Schema and Completed Steps;
- whether the transition preserves a stable learner topology or causes an unexplained split / jump.

### Desktop lane notation

This map describes the multi-lane desktop composition at the breakpoint where the course renders two learner columns (`@media (min-width: 1280px)` for the shared SQL/result choreography):

- **S** — Live Schema sidebar, outside the lesson L/R pair.
- **L** — learner reasoning lane / `#current-step` and Completed Steps lane.
- **R** — implementation / tool / evidence lane.
- **Split L/R** — the learner-facing response role is divided across the two lanes, for example orientation in L but the actual answer/check interaction in R.

Below narrower breakpoints the layout stacks, so literal left/right movement disappears; the ownership/locality defects recorded here still matter because the same controls and feedback remain owned by different surfaces.

### Judgment symbols

- ✅ **coherent** — stable role or a clear, justified phase handoff.
- ⚠️ **mixed / needs review** — locally understandable, but split ownership or cross-stage inconsistency exists.
- ❌ **contract defect** — action, response, feedback, or transition ownership is split without a sufficient role change, or a direct action's feedback is remote from the action.

The governing current rules are the stable learner-response anchor, tool/evidence locality, feedback ownership, local transition-control placement, persistent-reference behavior, genuine phase handoffs, cross-encounter consistency, and transition-level validation in `course-design/course-visual-language.md`. Course-shell controls remain outside this map except where needed to distinguish them from local progression.

---

## 2. Stage 1 — Media coverage / first JOIN

Current authority sequence: relations → connecting field → Cardinality → result Grain → Baseline measurement and interpretation → prediction → semantic action → JOIN teaching → learner SQL → result inspection → final verification → completion.

| State / material substate | Question / Current Step | Action / Evidence | Feedback + local transition | Working Schema / history | Spatial judgment |
|---|---|---|---|---|---|
| **Relations** | **L** — relation question and `Check selection` | selection begins in **S** (Live Schema) and changes Working Schema in **R** | wrong/correct feedback + Continue remain **L** | Working Schema **R**, active; Completed Steps **L** | ⚠️ Multi-surface task, but understandable because Live Schema discovery is explicit. Check/feedback is not local to the relation cards being manipulated. |
| **Connection — active** | **L** — asks which `news_article` column identifies the source | direct column selection happens in Working Schema **R** | `Check selected column`, wrong feedback, correct feedback and Continue are **L** | Working Schema **R**, primary interactive object | ❌ Direct-object action is in R while check/correction remain in L. Violates object-local check/feedback rule. |
| **Cardinality** | **L** — complete response form | Working Schema relationship is supporting evidence in **R** | check, wrong/correct feedback and Continue **L** | Working Schema **R** reference; history **L** | ✅ Stable ordinary reasoning anchor. |
| **Grain / Output** | **L** — complete response form | business request + relationship are references; no active tool | check, wrong/correct feedback and Continue **L** | Working Schema **R** quieter reference; history **L** | ✅ Stable ordinary reasoning anchor. |
| **Baseline run — before execution** | **L** — orientation/question plus measurement instruction | prepared SQL editor + `Run query` in **R** | invalid-measurement correction renders back in **L** | Working Schema **R**, below tool; history **L** | ❌ Measurement handoff itself is valid, but Run is R while its corrective feedback is L. The action/evidence cycle is split. |
| **Baseline interpretation — after execution** | **L** contains only the orientation heading/guidance; **actual interpretation question + choices/check are R** | returned count/result **R** | wrong feedback **R** | Working Schema remains **R** under the evidence stack; history **L** | ⚠️ Evidence and interpretation are correctly local in R, but the learner-response role has moved from L to R and is split between an L heading and an R response. |
| **Baseline success / Continue → Prediction** | orientation heading **L** | established result remains **R** | success feedback + `Continue` are **R** | Working Schema **R**; history **L** | ✅ Within the evidence cycle, feedback and progression stay with the result. The next state must account for the response anchor now being in R. |
| **Prediction — active** | **L** contains orientation; **actual prediction question + choices/check are R** | established baseline + premises **R** | wrong feedback **R** | Working Schema **R** reference; history **L** | ⚠️ Internally local and coherent in R, but the ordinary learner-response anchor is no longer L. |
| **Prediction success / Continue → Semantic action** | orientation **L** | prediction evidence **R** | success feedback + Continue **R** | Working Schema **R**; history **L** | ⚠️ Local in R, but next response returns to L. |
| **Semantic action** | **L** — full question/choices/check | no active tool | wrong/correct feedback + Continue **L** | Working Schema **R** reference; history **L** | ❌ The response anchor jumps **R → L** from Prediction without a strong visual handoff surface bridging the move. Pedagogically the phase changes, but the topology makes the learner hunt back to the other lane. |
| **JOIN teaching — beats 1–3** | **L** — teacher-led teaching sequence and Next controls | row-match / ON / query-map teaching is inside Current Step **L** | teaching progression **L** | Working Schema **R**, visible schema-level reference; history **L** | ✅ Genuine instruction phase; no assessment inserted; topology stable across all three beats. |
| **SQL implementation — active authoring** | task/orientation **L** | editor + Run + SQL-local assistance **R** | SQL validation/corrective feedback renders in **L** | shared SQL choreography moves Working Schema from its ordinary **R** location to **L** under the task; history remains **L** | ❌ Authoring handoff is legitimate, but SQL action is R while SQL diagnostic feedback is L. This directly violates SQL/tool feedback ownership. Working Schema also relocates R→L at the handoff and therefore needs explicit review as a persistent-reference move. |
| **SQL success / Result inspection** | inspection orientation **L** | Results **R** | execution feedback + `Continue to verification` **R** | Working Schema **L**; history **L** | ✅ Result/evidence feedback is local to Results. This is a genuine authoring→evidence handoff. |
| **Final verification — active** | **L** contains orientation; **actual verification question + choices/check are R** | Results **R** | wrong feedback **R** | Working Schema **L**; history **L** | ⚠️ Strong evidence locality, but learner-response ownership is again in R. This differs from Stage 3 verification, which keeps the response in L. |
| **Verification success / Complete stage** | verification-complete orientation **L** | Results remain **R** | confirmed answer + success feedback + `Complete stage` **R** | Working Schema **L**; history **L** | ✅ Feedback/progression remains with verified evidence. |
| **Complete** | **L** — completion state | no active tool | none | SQL/result workspace disappears; Working Schema returns to ordinary **R** composition; history **L** | ⚠️ Completion is a real phase end, but the primary message jumps **R → L** and Working Schema simultaneously returns **L → R**. Legible as completion, but it is another material topology shift. |

### Stage 1 response-path summary

Ignoring support references and showing the dominant learner-response/action lane:

`L → Split(L question / R object) → L → L → Split(L orientation / R tool) → R interpretation → R prediction → L semantic action → L teaching → Split(L task / R editor) → R result/verification → L completion`

The most concrete defects are:

1. Connection selection in R but check/correction in L.
2. Baseline Run in R but invalid-run correction in L.
3. Prediction moves the actual response role to R, followed by an immediate return to L for semantic action.
4. SQL Run/editor in R but SQL corrective feedback in L.
5. Verification response ownership is R, unlike Stage 3.

---

## 3. Stage 2 — Funding participation / JOIN row multiplication

Current controlling sequence: relations → connecting field → target Grain → Cardinality → qualitative multiplication prediction → repeated-context prediction → JOIN row multiplication Concept Moment → `3 → 3` application → learner SQL → accepted result → result-derived `funding_round_id = 1003` verification → completion.

| State / material substate | Question / Current Step | Action / Evidence | Feedback + local transition | Working Schema / history | Spatial judgment |
|---|---|---|---|---|---|
| **Relations** | **L** — relation question and check | selection from **S**, selected relations appear in **R** | wrong/correct feedback + Continue **L** | Working Schema **R**, active; history **L** | ⚠️ Same discovery split as Stage 1/3; understandable, but not object-local. |
| **Connection — active** | **L** — orientation/question | column selection **R**; `Check selected column` is also **R** in the appended Working-Schema action | wrong feedback **R** | Working Schema **R**, primary interaction | ✅ This is the cleanest current direct-object pattern: action, check, and correction are local to Working Schema. |
| **Connection — correct acknowledgement** | confirmed connection moves back to **L** | relationship reveal remains **R** | **correct feedback + Continue move to L** via generic acknowledgement | Working Schema **R** relationship reference; history **L** | ⚠️ Wrong feedback is local in R, but correct feedback leaves the object and jumps to L. The interaction is only partially object-local. |
| **Grain / Output** | **L** — full response form | no active tool | check, wrong/correct feedback, Continue **L** | Working Schema **R** reference; history **L** | ✅ Stable ordinary reasoning. |
| **Cardinality — active** | **L** — full response form | Working Schema relationship **R** | wrong feedback **L** | Working Schema **R** | ✅ While active, stable L reasoning with R reference. |
| **Cardinality — correct acknowledgement → Prediction** | orientation **L** | no new tool | **success feedback + `Continue to prediction` move to R** in `workspace-evidence-action` | Working Schema **R**; history **L** | ❌ The action/check happened in L, but correct feedback and local progression jump to R solely because this success substate uses a different container. |
| **Multiplication Prediction — active** | **L** contains orientation; **actual prediction question + choices/check are R** | established Grain + relationship premises **R** | wrong feedback **R** | Working Schema **R** reference; history **L** | ❌ This is still constrained reasoning from established premises, not a tool operation that requires moving response ownership. The ordinary response anchor jumps L→R. |
| **Prediction success / Continue → Repetition** | orientation **L** | prediction premises **R** | success feedback + Continue **R** | Working Schema **R**; history **L** | ⚠️ Local to the R prediction, but the next question returns to L. |
| **Repeated-context Prediction — active** | **L** — full question/choices/check | no active tool | wrong feedback **L** | Working Schema **R**; history **L** | ❌ Immediate **R → L** response-anchor jump from the prior prediction even though both are adjacent prediction/reasoning moves. |
| **Repetition success / Continue → Concept** | orientation **L** | no new evidence tool | **success feedback + Continue move to R** | Working Schema **R**; history **L** | ❌ Check happened in L; its correct feedback/progression appears in R, then the next Concept state returns to L. Pure container-driven L→R→L movement. |
| **JOIN row multiplication Concept Moment** | **L** — concept explanation + `Apply the idea` | no active tool | progression **L** | Working Schema **R** reference; history **L** | ✅ Teacher/concept phase is coherent in L. |
| **3→3 Application — active** | **L** — full question/choices/check | no active tool | wrong feedback **L** | Working Schema **R**; history **L** | ✅ Stable ordinary application reasoning. |
| **Application success / Continue → SQL** | orientation **L** | no tool yet | **success feedback + `Continue to SQL implementation` move to R** | Working Schema **R**; history **L** | ⚠️ The handoff is toward an R-side SQL tool, so R emphasis is understandable, but the feedback for the L-side answer itself has moved away from the action that caused it. |
| **SQL implementation — active** | task/orientation **L** | editor + Run + assistance **R** | SQL validation/corrective feedback **L** | Working Schema relocates **R → L** under shared SQL choreography; history **L** | ❌ Same shared SQL-locality defect as Stage 1: editor/action R, diagnostic feedback L. |
| **SQL success / Result inspection** | inspection orientation **L** | Results **R** | execution feedback + `Continue to verification` **R** | Working Schema **L**; history **L** | ✅ Genuine authoring→evidence handoff; evidence and progression local. |
| **1003 final verification — active** | **L** orientation only; **actual result slice + question + choices/check are R** | accepted-result slice and Results **R** | wrong feedback **R** | Working Schema **L**; history **L** | ⚠️ Excellent evidence locality, but learner-response ownership is R and differs from Stage 3's result verification pattern. |
| **Verification success / Complete stage** | orientation **L** | result evidence **R** | success feedback + `Complete stage` **R** | Working Schema **L**; history **L** | ✅ Feedback/progression remains with the evidence. |
| **Complete** | **L** | no active tool | none | SQL workspace disappears; Working Schema returns to **R**; history **L** | ⚠️ Real completion handoff, but another R→L primary-focus and L→R reference-layout shift. |

### Stage 2 response-path summary

`L → object-local R (then correct feedback back to L) → L Grain → L Cardinality → R success handoff → R prediction → L repetition → R success handoff → L Concept → L application → R success handoff → Split(L task / R editor) → R result/verification → L completion`

Stage 2 exposes the strongest **container-driven oscillation** in the current runtime. The special success acknowledgement states repeatedly move feedback and Continue to R even when the learner answered in L.

The most concrete defects are:

1. Connection is mostly correct locally, but correct feedback/Continue still jump back to L.
2. Cardinality answer L → correct feedback/Continue R.
3. Prediction response R → immediately related repetition response L.
4. Repetition answer L → correct feedback/Continue R → Concept L.
5. Application answer L → correct feedback/Continue R.
6. SQL editor R → SQL diagnostic feedback L.

---

## 4. Stage 3 — INNER JOIN unmatched company coverage

Current authority sequence: relations → connection → Cardinality → funding-round Grain → company measurement → funding-round measurement → compare and identify real zero-match company → predict INNER JOIN survival → implement INNER JOIN → verify zero-match absence → answer company-coverage question → completion.

| State / material substate | Question / Current Step | Action / Evidence | Feedback + local transition | Working Schema / history | Spatial judgment |
|---|---|---|---|---|---|
| **Relations** | **L** — relation question/check | selection from **S**, selected relations appear **R** | wrong/correct feedback + Continue **L** | Working Schema **R**, active; history **L** | ⚠️ Same discovery split as other stages. |
| **Connection — active** | **L** — question + `Check selected column` | direct funding_round column selection **R** | wrong/correct feedback + Continue **L** | Working Schema **R**, primary object | ❌ Same object-locality defect as Stage 1. Stage 2 demonstrates a more local current pattern. |
| **Cardinality** | **L** — complete response form | Working Schema relationship **R** | check, wrong/correct feedback + Continue **L** | Working Schema **R** reference; history **L** | ✅ Stable ordinary reasoning. |
| **Grain / Output** | **L** — complete response form | no active tool | check, wrong/correct feedback + Continue **L** | Working Schema **R** reference; history **L** | ✅ Stable ordinary reasoning. |
| **Company measurement — before run** | **L** — measurement orientation | prepared SQL + Run **R** | invalid prepared-query correction **L** | Working Schema **R** below tool; history **L** | ❌ Valid measurement handoff, but Run/action is R while its corrective feedback is L. |
| **Company measurement captured** | orientation **L** | captured company result/evidence **R** | success feedback + `Continue to funding-round evidence` **R** | Working Schema **R**; history **L** | ✅ Evidence and progression remain local in R. |
| **Funding-round measurement — before run** | **L** — second measurement orientation | prepared SQL + Run **R**; first company evidence is also shown **R** | invalid prepared-query correction **L** | Working Schema **R**; history **L** | ❌ Same action/diagnostic split: Run R, correction L. |
| **Compare measurements — active** | **L** contains orientation; **actual comparison question + choices/check are R** | funding_round Results + first-measurement company evidence **R** | wrong feedback **R** | Working Schema **R**; history **L** | ✅/⚠️ Strong evidence locality makes R response defensible; however the learner-response role has moved from L to R and should be treated as an explicit evidence-phase handoff, not ordinary state drift. |
| **Zero-match success / Continue → Prediction** | orientation **L** | established zero-match evidence **R** | success feedback + `Continue to prediction` **R** | Working Schema **R**; history **L** | ✅ Evidence-local transition. |
| **INNER JOIN survival Prediction — active** | **L** orientation; **actual prediction question + choices/check are R** | established zero-match premise **R** | wrong feedback **R** | Working Schema **R** reference; history **L** | ⚠️ Coherent continuation of the evidence phase in R, but cross-stage prediction placement is inconsistent: Stage 2 repeated-context/application return to L. |
| **Prediction success / Continue → SQL** | orientation **L** | established prediction **R** | success feedback + `Continue to SQL implementation` **R** | Working Schema **R**; history **L** | ✅ Clear evidence→authoring handoff direction. |
| **SQL implementation — active** | task/orientation **L** | editor + Run + assistance **R** | SQL validation/corrective feedback **L** | Working Schema relocates **R → L**; history **L** | ❌ Shared SQL-locality defect: diagnostic feedback is remote from editor/Run. |
| **SQL success / Result inspection** | inspection orientation **L** | Results **R** | execution feedback + `Continue to verification` **R** | Working Schema **L**; history **L** | ✅ Genuine authoring→evidence handoff; feedback/progression local to Results. |
| **Result verification — active** | **L** — the **actual verification question, choices, check, and feedback remain in L** | Results **R** are the evidence being inspected | wrong/correct feedback **L** | Working Schema **L**; history **L** | ⚠️ The response anchor is stable in L, but evidence and interpretation are split across adjacent lanes. More importantly, this differs from Stage 1/2, where verification response moves into R with the result. |
| **Verification success / Continue → Coverage** | **L** — confirmed answer, concept consequence, Continue | Results **R** remain visible | feedback/progression **L** | Working Schema **L**; history **L** | ✅ Coherent continuation of the L-side verification pattern. |
| **Coverage / Transfer conclusion** | **L** — full business-conclusion question/choices/check | Results **R** remain supporting evidence | wrong/correct feedback + Continue **L** | Working Schema **L**; history **L** | ✅ This is a business-reasoning conclusion with Results as reference; stable L response ownership is appropriate. |
| **Complete** | **L** | no active tool | none | result workspace disappears; Working Schema returns to ordinary **R**; history **L** | ✅/⚠️ Completion is a real phase end; the response remains L, but the persistent-reference layout still shifts back. |

### Stage 3 response-path summary

`L → Split(L check / R object) → L → L → Split(L orientation / R measurement) → R evidence comparison → R prediction → Split(L task / R editor) → R result → L verification → L coverage → L completion`

The most concrete defects are:

1. Connecting-column action R but check/correction L.
2. Both prepared measurement Runs are R while invalid-run feedback is L.
3. SQL editor/Run R while SQL diagnostic feedback is L.
4. Result verification uses a different cross-stage topology from Stage 1/2: Stage 3 response stays L while Stage 1/2 put the actual verification response in R.

---

## 5. Cross-stage equivalence map

This section compares equivalent learner roles directly. It is not a design recommendation yet; it identifies where the current runtime does or does not behave like one course.

| Equivalent role | Stage 1 | Stage 2 | Stage 3 | Cross-stage finding |
|---|---|---|---|---|
| **Relation selection** | S/R action, L check/feedback | S/R action, L check/feedback | S/R action, L check/feedback | Consistent, though distributed across discovery/reference surfaces. |
| **Direct connecting-field selection** | select R; check/feedback L | select + check + wrong feedback R; correct acknowledgement L | select R; check/feedback L | ❌ No single pattern. Stage 2 is closest to the locality contract but still moves correct feedback away. |
| **Ordinary closed reasoning** | L | mostly L | L | ✅ Stable shared pattern when not overridden by encounter-specific evidence containers. |
| **Prepared measurement Run** | R Run; invalid feedback L | n/a | R Run; invalid feedback L | ❌ Shared defect in measurement tool feedback locality. |
| **Evidence interpretation immediately after measurement** | response R | n/a | compare response R | ✅ Similar evidence-local pattern. |
| **Prediction from established evidence/premises** | response R | first multiplication prediction R; repetition returns L | response R | ⚠️ Stage 2 breaks the emerging evidence-prediction pattern halfway through its prediction sequence. |
| **Teacher/concept-only instruction** | JOIN teaching L | row-multiplication Concept L | concept consequence attached to prediction/verification states | No direct contradiction; roles differ pedagogically. |
| **SQL authoring** | task L / editor R / diagnostics L | task L / editor R / diagnostics L | task L / editor R / diagnostics L | ❌ Consistently wrong in one important way: SQL corrective feedback is not owned by the SQL tool. |
| **Post-SQL result inspection** | result + feedback/Continue R | result + feedback/Continue R | result + feedback/Continue R | ✅ Strong shared pattern. |
| **Final result verification response** | R | R | **L** | ❌ Direct cross-stage topology inconsistency for an equivalent evidence-verification role. |
| **Completion** | L after R verification | L after R verification | L after L verification | Stage 1/2 visibly jump R→L; Stage 3 does not. |

---

## 6. Working Schema and Completed Steps movement

### Working Schema

The default ordinary-state layout keeps Working Schema in **R**. During Stage 1/3 measurement and evidence-prediction phases it remains in R under the active tool/evidence stack.

Shared SQL/result choreography changes the DOM presentation with `display: contents` and grid areas. At desktop width it places:

- Current Step in **L**;
- SQL/Results in **R**;
- Working Schema in **L** under the Current Step;
- Completed Steps in **L**.

Therefore all three stages currently perform a material Working-Schema relocation **R → L** at SQL authoring and keep it L during result evidence. On completion, when the SQL/result choreography is removed, Working Schema returns **L → R**.

This is shared rather than encounter-specific, so it is at least predictable across stages. It still requires explicit review against the persistent-reference rule: the move should be retained only if the authoring/evidence handoff materially benefits from the schema becoming an L-side reference next to the task. The mapping does not decide that question.

### Completed Steps

Completed Steps remain owned by the L/history lane throughout ordinary, SQL, and result states. The shared SQL/result grid keeps them in the `completed` area on L. No cross-column Completed-Steps jump was found in the current topology.

---

## 7. Findings exposed by the spatial map

These are mapping findings, not an implementation plan.

### T-01 — Stage 1 and Stage 3 connecting-field locality defect

Direct column selection occurs in Working Schema R, while check and corrective feedback are in L. This conflicts directly with the current object-local interaction rule.

### T-02 — Stage 2 connecting-field pattern is only partially local

Stage 2 correctly keeps selection, check, and wrong feedback in R, but after the correct selection the success feedback and Continue are rendered in L. The learner interaction changes owner at the moment of success.

### T-03 — Prepared measurement diagnostics are remote from the tool

Stage 1 Baseline and both Stage 3 prepared measurements put Run in R but invalid-query / wrong-measurement correction in L.

### T-04 — SQL diagnostics are remote from the SQL Workspace in all three stages

All three stages use the shared L-task/R-editor authoring composition, but runtime validation calls the stage-local `wrong()` path, which renders `feedbackMarkup()` inside Current Step L. The action that failed is in R; its correction is in L.

### T-05 — Stage 2 contains repeated container-driven L↔R oscillation

Several correct-answer acknowledgement substates place feedback and Continue in R even though the learner answered in L:

- Cardinality success;
- repeated-context success;
- application success.

These moves are not caused by a new tool or evidence surface; they arise from using `workspace-evidence-action` for selected success substates.

### T-06 — Evidence-prediction response topology is inconsistent inside Stage 2

The first multiplication prediction lives in R with its premises, then the immediately related repeated-context prediction returns to L. This is the clearest within-stage response-anchor reversal in ordinary reasoning.

### T-07 — Final result verification has two competing course patterns

- Stage 1: result **R**, verification response **R**.
- Stage 2: result/slice **R**, verification response **R**.
- Stage 3: result **R**, verification response **L**.

Both arrangements can be made locally understandable, but they cannot simultaneously be the single cross-encounter pattern for an equivalent learner role without an explicit Stage 3 pedagogical reason.

### T-08 — Working Schema changes columns at SQL/result handoff

All stages move Working Schema R→L for shared SQL/result choreography and L→R afterward. Because this is shared and phase-linked it is not classified here as an automatic defect, but the move is material and must be explicitly reviewed rather than treated as invisible layout plumbing.

---

## 8. Mapping boundary

This document intentionally does **not**:

- choose the corrected target topology;
- edit `course-visual-language.md` or `course-controls.md`;
- alter learner sequence, wording, evidence, validators, SQL behavior, or assistance semantics;
- implement Back / Forward or Retry / Redo;
- change HTML, JS, CSS, schema, or seed data;
- declare a review PASS.

The next legitimate action is a review/decision pass over this spatial map, deciding which currently split transitions are justified phase handoffs and which require topology correction. Runtime remains unchanged until that is explicitly authorized.
