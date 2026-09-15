# Stage 1–3 target interaction topology decision

**Date:** 2026-09-15  
**Status:** REVIEWED + IMPLEMENTED CURRENT TOPOLOGY AUTHORITY  
**Decision baseline:** `main@9ad56b59473cd20bfc75f6f731a6008f9bae955b`  
**Input gate:** `course-design/audits/stage-1-3-transition-mapping-review-2026-09-15.md` — **PASS — SPATIAL-MAPPING GATE CLOSED**  
**Design review:** `course-design/audits/stage-1-3-target-topology-review-2026-09-15.md` — **PASS — TOPOLOGY-DESIGN GATE CLOSED**  
**Post-build review:** `course-design/audits/stage-1-3-topology-post-build-review-2026-09-15.md` — **PASS — IMPLEMENTATION CONFORMS / GATE CLOSED**  
**Scope:** current course-wide spatial topology for the Stage 1–3 interaction roles. This authority does not change pedagogy, learner sequence, evidence requirements, SQL semantics, or runtime content beyond the reviewed topology scope.

## 1. Governing authority

This decision is constrained by current `course-design/course-visual-language.md`, especially:

- §8 — task-dependent attention choreography and action/evidence/interpretation locality;
- §10 — equivalent roles across encounters should use the same visual language unless a real pedagogical difference requires otherwise;
- §14 — course-shell controls are distinct from Stage-local task actions and SQL-local assistance;
- §15.1 — ordinary learner-response roles need a predictable anchor; moving a response role requires a real role change and a legible handoff;
- §15.2 — tools/evidence are local to their action, immediate evidence interpretation remains with the evidence, and direct-object interactions keep check/correction local;
- §15.3 — feedback belongs to the action/response that caused it;
- §15.4 — local progression stays with the completed action/evidence and must not move merely because a different runtime container renders the next substate;
- §15.5 — persistent references may change prominence without arbitrary relocation;
- §15.6 — genuine phase handoffs require a real learner-role change, clear focus signal, understandable prior surface, no hunting, and course-wide consistency;
- §15.7 — shared spatial behavior should have one clear implementation owner;
- §15.8 — post-build validation must re-check every material transition.

`course-design/course-controls.md` additionally fixes these boundaries:

- chapter navigation, Back/Forward, and Retry/Redo remain course-shell controls;
- `Check answer`, `Run query`, and `Continue` remain local progression/actions;
- `Show solution` is SQL-workspace-local and fills the active editor rather than opening a separate solution surface;
- Desired Output and SQL Structure are SQL-authoring scaffolds, not shell controls.

## 2. Core topology rule

The corrected course uses one simple ownership rule:

> **L owns ordinary reasoning. R owns direct object interaction, active tools, produced evidence, and the immediate interpretation of that evidence.**

A learner-response role moves from L to R only when the learner role genuinely changes from ordinary reasoning into one of those R-owned roles. It returns to L only when that role ends. A runtime state boundary, success acknowledgement, or container change is never sufficient reason by itself.

This is a role rule, not a blanket content rule. Guidance may remain visible in L while R owns the active interaction, but the **actual actionable prompt, response/check controls, response-specific corrective feedback, and local Continue** must stay with the owning role.

## 3. Course-wide target patterns

### 3.1 Relation-set identification

**Target owner: L, with S/R manipulation surfaces.**

The learner is answering a set-level reasoning question: which relations are needed. Live Schema (S) is the discovery source and Working Schema (R) shows the selected set, but the set-level prompt, `Check selection`, set-level wrong/correct feedback, and Continue remain in L.

This is not treated as the same role as selecting one specific Working-Schema field. The learner manipulates a relation set across two reference surfaces; correctness is evaluated only when the set is checked as a whole. Add/remove actions should give immediate visible selection state, but not per-object correctness feedback.

**Cross-stage target:** Stage 1 = Stage 2 = Stage 3.

### 3.2 Direct Working-Schema field selection

**Target owner: R.**

When the learner must select a specific field directly in Working Schema:

- L may contain concise orientation/guidance;
- the actionable field-selection prompt is local to the active Working Schema interaction in R;
- field selection, selected-state indication, Check, wrong feedback, correct feedback / attached Concept Moment, and Continue all remain in R;
- the relationship reveal occurs in the same R object context after correctness;
- Continue from this completed object interaction explicitly names the next reasoning role, after which the next ordinary reasoning state returns to L.

This adopts the strongest part of the Stage 2 connection pattern and removes its former success-state jump back to L.

**Cross-stage target:** Stage 1 = Stage 2 = Stage 3.

### 3.3 Ordinary closed reasoning

**Target owner: L.**

Ordinary reasoning states include Grain, Cardinality, semantic relational choices, non-tool conceptual predictions, concrete applications, and business conclusions when they are not immediate interpretation of produced evidence.

For these states:

- prompt, choices/response, Check, wrong feedback, correct feedback / attached Concept Moment, and Continue stay in L;
- Working Schema and other established artifacts may remain visible in R as supporting references;
- a success acknowledgement does not move to R merely because the next phase will use R.

**Cross-stage target:** all equivalent ordinary-reasoning roles use L.

### 3.4 Prepared measurement and immediate evidence interpretation

**Target owner: R after the measurement handoff.**

A prepared measurement is a real reasoning→tool handoff:

- L signals/orients the transition into measurement;
- the prepared editor/query, Run control, measurement validation/corrective feedback, returned result, immediate interpretation question, interpretation Check, interpretation feedback, and local Continue are R-local;
- Working Schema stays in R as a quieter supporting reference; it does not change columns;
- Completed Steps remain in L.

If the next learner move is still a direct deduction from the just-produced evidence, that evidence-grounded reasoning may remain R as the same evidence episode. If the next move returns to ordinary relational/business reasoning, the R-side Continue explicitly signals that role change and the next actionable response returns to L.

This distinction prevents the category label `prediction` from determining layout by itself. The pedagogical role of the prediction determines ownership.

### 3.5 Evidence-grounded prediction versus ordinary prediction

Two different target patterns are intentionally retained because the learner roles differ:

- **Evidence-grounded prediction: R.** It directly interprets evidence the learner just generated and remains part of the evidence cycle.
- **Ordinary conceptual prediction: L.** It reasons from already-established concepts/references without an active produced-evidence surface that must remain local.

Therefore:

- Stage 1 prediction after the Baseline remains R;
- Stage 3 zero-match survival prediction remains R;
- Stage 2 multiplication prediction and repeated-context prediction remain L because they reason from established Grain/Cardinality rather than a just-produced measurement result.

This is a pedagogically justified divergence, not cross-stage drift.

### 3.6 Teacher-led / Concept instruction

**Target owner: L unless the Concept Moment is attached directly to an R-owned response.**

Standalone teaching sequences such as Stage 1 JOIN teaching and Stage 2 row-multiplication concept explanation remain L. Working Schema stays R as reference.

When formal terminology is the direct consequence of an R-owned answer (for example the PK/FK reveal after direct Working-Schema field selection, or INNER JOIN row-survival terminology after an R-owned evidence prediction), the attached correctness/concept consequence remains local to that R interaction rather than jumping to L.

### 3.7 SQL authoring

**Target composition: L task orientation + R authoring workspace. R owns all SQL-local interaction.**

During active SQL authoring:

- L contains the current task/business-oriented authoring instruction and teacher guidance;
- R contains the editor, Run, SQL diagnostics, execution-specific feedback, Desired Output, SQL Structure, `Show solution`, and other SQL-local assistance;
- `Show solution` follows `course-controls.md`: it populates the active editor and does not open a separate solution panel;
- Working Schema remains in **R**, visually secondary to the editor but practically available in the same authoring context;
- Completed Steps stay in L;
- no SQL validation/corrective feedback appears in L.

The authoring phase therefore changes **prominence**, not Working-Schema column ownership.

**Cross-stage target:** Stage 1 = Stage 2 = Stage 3.

### 3.8 Successful execution and result inspection

**Target owner: R.**

After accepted SQL execution:

- Results become the primary R evidence surface;
- execution-success feedback and the next local Continue remain with Results in R;
- L may orient the learner to inspect the result, but does not take ownership of the evidence response;
- Working Schema remains in R but quieter than Results;
- Completed Steps remain L.

**Cross-stage target:** Stage 1 = Stage 2 = Stage 3.

### 3.9 Result verification

**Target owner: R in all three stages.**

Verification is immediate interpretation of visible result evidence. Therefore the actual verification prompt, response controls, Check, wrong feedback, correct feedback / verification Concept Moment, and Continue remain with Results in R.

Stage 3 uses the same evidence-local verification pattern as Stage 1 and Stage 2. There is no Stage 3 pedagogical authority requiring the verification response to return to L while the evidence stays R.

**Cross-stage target:** Stage 1 = Stage 2 = Stage 3.

### 3.10 Post-verification business reasoning

**Target owner: L when the learner role changes back to ordinary business reasoning.**

Stage 3 contains an additional company-coverage conclusion after result verification. This is no longer the immediate verification interaction; it is the business conclusion from the now-established evidence.

Therefore:

- verification finishes in R;
- its R-local Continue explicitly signals the move to the business conclusion;
- Coverage/Transfer is then fully L-owned;
- Results remain available in R as supporting evidence.

This is a genuine, explicit R→L phase handoff.

### 3.11 Completion

**Target owner: L.**

Completion is a genuine phase end. The final `Complete stage` control remains with the completed action/evidence that leads to it; after activation, the completion state appears in L.

Working Schema does not perform a column restoration because it no longer moves columns during SQL/result work. If it remains visible at completion, it stays in its established R location with reduced prominence.

**Cross-stage target:** Stage 1 = Stage 2 = Stage 3.

## 4. Persistent surfaces

### Working Schema

Target course-wide behavior:

- R in ordinary reasoning;
- R and active during direct-object interaction;
- R and quieter during prepared measurement/evidence work;
- R as schema reference during teaching;
- R as secondary authoring reference during SQL;
- R and quieter than Results during result inspection/verification;
- no R→L relocation at SQL authoring;
- no L→R restoration on completion.

Only prominence/order within R may change by role. General placement must not be implemented through competing Stage-specific transforms or DOM relocation.

### Completed Steps

Completed Steps stay in L/history throughout the encounter, including authoring, evidence, verification, and completion. They remain reviewable and visually subordinate. They do not become a navigation substitute for Back/Forward.

### Business Request / Live Schema

Their persistent roles are unchanged. This decision does not introduce new movement rules for them.

## 5. Target paths by stage

These paths show the **dominant actionable owner**, not every supporting reference.

### Stage 1

`L Relations → R Connection → L Cardinality → L Grain → R Baseline Run → R Baseline Interpretation → R Baseline Prediction → L Semantic Action → L JOIN Teaching → Split(L task / R SQL workspace) → R Result Inspection → R Verification → L Complete`

Required explicit handoffs:

1. L→R into direct Working-Schema interaction;
2. R→L from completed connection into Cardinality;
3. L→R from Grain into Baseline measurement;
4. R→L from evidence-grounded prediction into semantic relational action;
5. L→Split from teaching into SQL authoring;
6. Split→R from authoring into Results;
7. R→L from completed verification into completion.

### Stage 2

`L Relations → R Connection → L Grain → L Cardinality → L Multiplication Prediction → L Repeated-context Prediction → L Concept → L Application → Split(L task / R SQL workspace) → R Result Inspection → R Verification → L Complete`

The acknowledgement-driven `L→R→L→R` oscillation is eliminated. Success feedback remains where the learner answered. SQL is the first post-connection reason for R to become an active tool owner.

### Stage 3

`L Relations → R Connection → L Cardinality → L Grain → R Company Measurement → R Company Evidence → R Funding Measurement → R Compare → R Survival Prediction → Split(L task / R SQL workspace) → R Result Inspection → R Verification → L Coverage Conclusion → L Complete`

The evidence-gathering episode is one coherent R-side cycle. The unsupported Result→L Verification reversal is removed. The later R→L move occurs only when the learner role genuinely changes from result verification to the business coverage conclusion.

## 6. Transition-control rule

Each local progression control belongs to the role that just completed:

- L reasoning answer → feedback + Continue in L;
- R direct-object answer → feedback + Continue in R;
- R measurement/evidence interpretation → feedback + Continue in R;
- R SQL/result/verification → feedback + Continue in R.

The destination of the next state does not move the current state's feedback or Continue. The handoff happens **after** activation of the local Continue, when the next role becomes visually primary.

## 7. Handoff signaling requirement

Every legitimate L↔R owner change must be visually legible without inserting new pedagogy or a new assessment.

At minimum, the handoff must provide:

- a transition control whose label makes the next role understandable where useful (`Continue to measurement`, `Continue to SQL implementation`, `Continue to verification`, etc.);
- clear new-state emphasis on the destination owner;
- de-emphasis of the completed owner/reference rather than simultaneous co-primary surfaces;
- no need to hunt for the next action.

This may be achieved by hierarchy, focus treatment, concise teacher guidance, or equivalent implementation. No new instructional step is authorized solely to explain layout movement.

## 8. Shared implementation ownership constraint

The target topology is course-wide behavior and should have one shared implementation owner where practical.

Implementation must therefore prefer shared layout/state rules for:

- L ordinary-reasoning ownership;
- R object/tool/evidence ownership;
- SQL authoring composition;
- result/verification composition;
- Working Schema persistence;
- Completed Steps persistence;
- local feedback/Continue ownership.

Encounter-specific JS/CSS may supply content and real encounter-specific visuals, but should not independently redefine these shared spatial roles.

This decision does not prescribe the exact refactor, DOM structure, CSS selectors, or state API. Those are implementation decisions, subject to the shared-ownership requirement and post-build transition validation.

## 9. Corrections established by this decision

The reviewed corrections are:

1. Stage 1/3 connecting-field Check/feedback/Continue are R-local; Stage 2 correct acknowledgement also stays R.
2. Stage 1/3 prepared-measurement validation is R-local.
3. Stage 2 Cardinality, Repetition, and Application success feedback/Continue stay in L instead of jumping to R.
4. Stage 2 multiplication prediction and repeated-context prediction use one stable L reasoning anchor.
5. SQL diagnostics are R-local in all three stages.
6. SQL-local assistance/scaffolding is R-owned consistently; Stage 3 does not use a separate revealed-solution panel.
7. Working Schema does not relocate R→L for SQL/result states.
8. Stage 3 result verification remains in R with Results, matching Stage 1/2.
9. Legitimate evidence→ordinary-reasoning returns (Stage 1 prediction→semantic action; Stage 3 verification→coverage) use explicit phase-handoff signaling rather than unexplained column jumps.
10. Completion remains L without a Working-Schema column restoration.

No learner question, answer option, concept timing, evidence requirement, SQL contract, result validator, or completion requirement is changed by these topology decisions.

## 10. Review and implementation status

The earlier draft status in this document said the decision was unreviewed and runtime remained held. That status is superseded.

The decision was subsequently reviewed in:

`course-design/audits/stage-1-3-target-topology-review-2026-09-15.md`

with verdict:

**PASS — TARGET TOPOLOGY CONFORMS — TOPOLOGY-DESIGN GATE CLOSED**

It was then implemented and independently reviewed in:

`course-design/audits/stage-1-3-topology-post-build-review-2026-09-15.md`

with verdict:

**PASS — IMPLEMENTATION CONFORMS — STAGE 1–3 TOPOLOGY POST-BUILD GATE CLOSED**

Therefore this document now serves as the current reviewed topology authority for Stage 1–3. Later unrelated experience-improvement work does not reopen this topology unless a new decision explicitly does so.
