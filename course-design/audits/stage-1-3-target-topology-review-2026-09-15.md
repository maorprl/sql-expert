# Stage 1–3 target interaction topology review

**Date:** 2026-09-15  
**Review target:** `course-design/stage-1-3-target-topology-decision-2026-09-15.md` at blob `de0da8dfdd860670482e6ba4e6c7437633899979`  
**Review baseline:** `main@69119cb95ca1b38208b625f39bdceb40dafc22a2`  
**Input mapping gate:** `course-design/audits/stage-1-3-transition-mapping-review-2026-09-15.md` — **PASS — SPATIAL-MAPPING GATE CLOSED**  
**Review type:** conformance review of target-topology authority, pedagogical preservation, mapped-defect disposition, and cross-stage consistency; not an independent-agent review.

## Verdict

**PASS — TARGET TOPOLOGY CONFORMS — TOPOLOGY-DESIGN GATE CLOSED**

The reviewed decision is sufficient implementation authority for the Stage 1–3 spatial-topology corrections it defines.

This PASS does **not** authorize changes outside that topology scope. It does not reopen learner sequence, question intent, answer logic, concept timing, evidence requirements, SQL contracts, validators, hint policy, Back/Forward semantics, Retry/Redo semantics, or broader course-shell design.

## 1. Review gates

The target decision passes only if all of the following are true:

1. **Visual-authority conformance** — each target ownership and handoff rule follows current `course-design/course-visual-language.md` and `course-design/course-controls.md`.
2. **Mapped-defect closure** — every blocking or mixed topology problem recorded by the reviewed spatial map has an explicit target disposition.
3. **Pedagogical preservation** — the target does not change the locked learning sequence, evidence, concept timing, SQL meaning, or completion requirements of Stage 1, the row-multiplication encounter, or Stage 3.
4. **Cross-stage consistency** — equivalent learner roles now have one course-wide spatial pattern unless a real pedagogical difference explains divergence.
5. **Sequence coherence** — every target L↔R owner change corresponds to a real learner-role change and has an explicit handoff pattern.
6. **Implementation boundary** — course-wide spatial behavior is assigned to shared ownership where practical, while encounter-specific content remains local.

## 2. Current authority checked

### 2.1 Course visual authority

The decision correctly derives from:

- §8: active task hierarchy, coherent authoring area, action/evidence/immediate-interpretation locality, legible region changes, local transition controls;
- §10: equivalent learner roles use consistent cross-encounter visual language unless a real pedagogical difference requires otherwise;
- §12: visual changes must not silently change locked pedagogy;
- §14: shell controls and SQL-local assistance are distinct roles;
- §15.1: stable ordinary learner-response anchor and equivalent response patterns;
- §15.2: tool/evidence locality and object-local direct interactions;
- §15.3: feedback ownership;
- §15.4: local progression controls remain with the completed action/evidence and do not alternate merely because runtime containers change;
- §15.5: persistent references may change prominence without arbitrary relocation;
- §15.6: genuine phase handoffs require a real learner-role change, visible focus transfer, understandable prior surface, no hunting, and course-wide consistency;
- §15.7: shared spatial behavior should have one clear implementation owner;
- §15.8: post-build validation must inspect every material transition.

### 2.2 Course controls

The decision preserves the control boundary established by `course-design/course-controls.md`:

- chapter navigation, Back/Forward, and Retry/Redo remain shell-level controls;
- `Check answer`, `Run query`, and `Continue` remain local actions;
- `Show solution` remains SQL-workspace-local, appears only during active SQL authoring, and populates the active editor rather than creating a competing solution surface;
- Desired Output and SQL Structure remain SQL-authoring scaffolds rather than shell controls.

### 2.3 Encounter authority checked

The review checked the topology decision against current encounter authority, including:

- Stage 1 interaction decisions: direct Working-Schema connecting-key selection; local corrective feedback; Baseline as a compact measurement/evidence cycle; continuous Grain → Baseline → prediction reasoning; Working Schema prominence changing by pedagogical role; explicit JOIN teaching before SQL; coherent authoring workspace; result evidence remaining available for explicit verification.
- Row-multiplication encounter authority plus the current structural-reuse revision: Working Schema starts empty; learner selects relations and directly identifies `round_investment.funding_round_id`; Grain precedes Cardinality; qualitative multiplication prediction and repeated-context judgment remain learner reasoning before SQL; no pre-resolved relationship; no change to the accepted SQL/result/verification contract.
- Stage 3 interaction decisions: learner-generated zero-match evidence from two prepared measurements; survival prediction before SQL; Results remain the evidence surface after execution; explicit absence verification precedes the final company-coverage conclusion.

No encounter authority requires the current runtime’s inconsistent L/R placements.

## 3. Core topology rule review

Target rule:

> **L owns ordinary reasoning. R owns direct object interaction, active tools, produced evidence, and the immediate interpretation of that evidence.**

**Verdict: PASS.**

This rule is a valid translation of §15.1–15.6 rather than a new pedagogical rule. It keeps the ordinary learner-response role predictable while allowing R to take ownership only when the learner role genuinely changes to object interaction, tool use, evidence production, or immediate evidence interpretation.

The decision also correctly avoids classifying states solely by labels such as `prediction`. Ownership follows the actual learner role. This is necessary to preserve the difference between Stage 1/3 evidence-grounded prediction and Stage 2 conceptual prediction.

## 4. Mapped-defect disposition

Every finding from the reviewed mapping has an explicit target disposition.

| Mapping finding | Target disposition | Review |
|---|---|---|
| **T-01 — Stage 1/3 connecting-field locality defect** | Direct field interaction becomes fully R-owned: actionable prompt, selection, Check, feedback, Concept consequence, Continue, and relationship reveal stay local. | **PASS** — directly satisfies §15.2–15.4 and current Stage 1 direct-field authority. |
| **T-02 — Stage 2 connection only partially local** | Correct acknowledgement/Continue remains R instead of returning to L; only the next ordinary reasoning state returns to L. | **PASS** — removes success-state ownership drift without changing evidence meaning. |
| **T-03 — prepared measurement diagnostics remote from tool** | Stage 1 Baseline and Stage 3 prepared-measurement validation/correction become R-local with Run/result/interpretation. | **PASS** — matches §8 and §15.2–15.4; Stage 1 explicitly requires a local Baseline evidence cycle. |
| **T-04 — SQL diagnostics remote in all encounters** | Editor, Run, diagnostics, execution-specific feedback, Desired Output, SQL Structure, Show solution, and SQL-local assistance are R-owned. | **PASS** — matches §15.2–15.3 and `course-controls.md`. |
| **T-05 — Stage 2 acknowledgement-driven L↔R oscillation** | Correct feedback/Continue stays where the learner answered; Cardinality, repeated-context, and application success remain L. | **PASS** — directly applies §15.4. |
| **T-06 — Stage 2 prediction topology inconsistent** | Both multiplication and repeated-context conceptual predictions are L-owned. | **PASS** — both are ordinary reasoning from established premises, not immediate interpretation of a produced evidence surface. |
| **T-07 — competing result-verification patterns** | Result verification is R-owned in all three encounters. | **PASS** — equivalent role now has one course pattern; Stage 3 authority explicitly says Results remain the evidence surface. |
| **T-08 — Working Schema relocates R→L→R** | Working Schema remains R throughout; only prominence/order within R changes. | **PASS** — strongest direct application of §15.5 and consistent with encounter authority that Working Schema becomes a quieter reference during tools/results. |
| **T-09 — sequence-level defects cannot be fixed state-by-state** | Decision defines complete target paths, allowed handoffs, local progression ownership, and handoff-signaling requirements. | **PASS** — addresses §15.6 and makes §15.8 testable post-build. |

**Mapped-defect closure: PASS.**

## 5. Cross-stage role review

### 5.1 Relation-set identification

Target: L-owned set reasoning with Live Schema discovery in S and Working Schema selection state in R.

**PASS.** This is deliberately distinct from direct field selection. The answer is the relation set, not correctness of one clicked object. Immediate add/remove state remains visible on the manipulated surfaces, while set-level Check/feedback remains with the L reasoning question. The same pattern applies to all three encounters.

### 5.2 Direct Working-Schema field selection

Target: R-owned in all three encounters.

**PASS.** The interaction is directly with a Working Schema object, exactly the case named by §15.2. Stage 1 authority also explicitly requires local corrective feedback after field selection.

### 5.3 Ordinary reasoning

Target: L-owned across Grain, Cardinality, semantic choices, non-tool conceptual predictions/applications, and business conclusions.

**PASS.** This establishes the stable learner-response anchor required by §15.1 without forcing tool/evidence roles back into L.

### 5.4 Prepared measurement / immediate evidence interpretation

Target: R-owned after a legible L→R measurement handoff.

**PASS.** This keeps Run, validation, result, interpretation, feedback, and Continue in one evidence cycle as required by §8 and §15.2–15.4.

### 5.5 Prediction

Target intentionally differs by role:

- Stage 1 Baseline-grounded prediction: R;
- Stage 3 zero-match-evidence survival prediction: R;
- Stage 2 multiplication/repeated-context conceptual predictions: L.

**PASS.** This is not inconsistent treatment of an equivalent role. The first two are immediate deductions from learner-produced evidence; Stage 2 has no corresponding produced measurement surface and is ordinary conceptual reasoning from established Grain/Cardinality. The decision documents the pedagogical reason for divergence, satisfying §10 and §15.1.

### 5.6 SQL authoring

Target: L task orientation + R authoring workspace; all SQL-local action/feedback/assistance R-owned.

**PASS.** Equivalent SQL roles now use one course-wide composition. This also brings Stage 3 solution behavior back under `course-controls.md` instead of preserving its stale separate-panel pattern.

### 5.7 Result inspection and verification

Target: R for result inspection and immediate verification in all three encounters.

**PASS.** Results, verification question, Check, feedback, and Continue remain one evidence cycle. This resolves the Stage 3 competing pattern without changing what Stage 3 verifies.

### 5.8 Post-verification business reasoning

Stage 3 alone returns to L for the company-coverage conclusion after R verification.

**PASS.** This is a genuine learner-role change: the immediate evidence verification is complete, and the learner now answers the original business-coverage question. Results remain visible as supporting evidence. The decision requires an explicit R→L handoff, satisfying §15.6.

### 5.9 Completion

Target: L in all three encounters after the preceding local action/evidence completes.

**PASS.** Completion is a genuine phase end. The decision correctly keeps the `Complete stage` control with the role that just completed, then moves to L only after activation. Working Schema no longer performs a simultaneous column restoration.

**Cross-stage consistency: PASS.**

## 6. Stage-by-stage pedagogical preservation

### 6.1 Stage 1

Target path:

`L Relations → R Connection → L Cardinality → L Grain → R Baseline Run/Interpretation/Prediction → L Semantic Action → L JOIN Teaching → Split(L task / R SQL) → R Results/Verification → L Complete`

**PASS.** The required reasoning order is unchanged. Grain still precedes Baseline; Baseline remains measurement rather than authored SQL; prediction still precedes JOIN terminology; semantic action still precedes the JOIN Concept; the three teaching beats remain before learner SQL; actual Results remain evidence before final verification. The changes are spatial ownership and handoff signaling only.

The R→L return from Baseline prediction to semantic action is acceptable because the learner role changes from evidence interpretation to ordinary semantic reasoning and the target explicitly requires a legible handoff rather than an unexplained jump.

### 6.2 Row-multiplication encounter

Target path:

`L Relations → R Connection → L Grain → L Cardinality → L Multiplication Prediction → L Repeated-context Prediction → L Concept → L Application → Split(L task / R SQL) → R Results/Verification → L Complete`

**PASS.** Current structural-reuse order is preserved: relation selection → connection field → Grain → Cardinality. The accepted target evidence remains Grain, Cardinality, qualitative multiplication prediction, repeated-context judgment, application, SQL result, and final verification. Removing L↔R acknowledgement oscillation does not change learner evidence or concept timing.

### 6.3 Stage 3

Target path:

`L Relations → R Connection → L Cardinality → L Grain → R Company Measurement → R Company Evidence → R Funding Measurement → R Compare → R Survival Prediction → Split(L task / R SQL) → R Results/Verification → L Coverage → L Complete`

**PASS.** The learner still generates the zero-match premise by running both prepared queries and comparing them; the survival prediction remains before SQL; the same five-column INNER JOIN remains; verification of the missing company still precedes the final coverage conclusion. The topology change keeps the entire evidence episode coherent and moves only the later business conclusion back to L.

**Pedagogical-preservation gate: PASS.**

## 7. Persistent-surface review

### Working Schema

Target: remain R throughout, changing prominence rather than page region.

**PASS.** This is permitted by Stage 1’s explicit statement that persistent artifacts change visual rank by pedagogical role and by course visual §15.5. It also removes the current R→L→R movement that has no encounter-specific pedagogical requirement.

The implementation must keep Working Schema practically available during SQL authoring without letting it compete with the editor, and quieter than Results during evidence inspection/verification.

### Completed Steps

Target: remain L/history throughout.

**PASS.** This preserves the current stable history role and visual §15.5. It does not turn Completed Steps into navigation and does not alter Back/Forward semantics.

### Business Request / Live Schema

Target: no new movement rules.

**PASS.** Scope remains limited to the mapped topology defects.

## 8. Control-boundary review

The decision does not absorb shell navigation into encounter topology and does not invent unresolved Retry/Redo behavior.

`Show solution` treatment is correctly fixed by current `course-controls.md`: active-SQL-only, editor-local, editor-populating, non-executing, non-evidence-completing.

Desired Output and SQL Structure remain optional SQL-local scaffolds rather than persistent/global controls.

**Control-boundary gate: PASS.**

## 9. Sequence and handoff review

The target paths contain only role-changing owner transitions:

- ordinary reasoning ↔ direct Working-Schema interaction;
- ordinary reasoning → prepared measurement/evidence;
- evidence-grounded reasoning → ordinary semantic/business reasoning where the evidence episode ends;
- teaching/reasoning → SQL authoring;
- SQL authoring → result evidence;
- result verification → business conclusion or completion.

The decision also fixes the ownership timing rule: feedback and Continue stay with the role that just completed; the owner change occurs only after Continue activates the next state.

**PASS.** This is the key correction that prevents runtime-container changes from masquerading as phase handoffs.

## 10. Shared implementation ownership

The decision correctly classifies the target topology as course-wide behavior and requires shared ownership for:

- ordinary L response anchoring;
- R object/tool/evidence anchoring;
- SQL composition;
- result/verification composition;
- Working Schema persistence;
- Completed Steps persistence;
- feedback and local Continue ownership.

Encounter-local code may provide content and genuinely encounter-specific visuals but must not redefine those shared roles.

**PASS.** This follows §15.7 and is necessary to avoid recreating cross-encounter drift through separate stage CSS/DOM rules.

## 11. Non-blocking implementation cautions

These do not block the decision, but implementation/post-build validation must check them explicitly:

1. **Relation selection remains a distributed task.** Add/remove state must be immediately visible on S/R surfaces, while set-level correctness stays in L. Do not accidentally turn every relation click into correctness feedback.
2. **R can contain several supporting surfaces.** During SQL/result work, keeping Working Schema in R must not make editor/Results and Working Schema co-primary. The target requires role-based prominence.
3. **Responsive layouts still require validation.** Literal L/R becomes stacked at narrower widths, but ownership ordering, locality, and handoff clarity must remain intact.
4. **Stage 1 evidence→semantic return and Stage 3 verification→coverage return must be visibly signaled.** Moving to L is valid only because the learner role changes; implementation must not reduce these to unexplained focus jumps.
5. **No implementation shortcut may change pedagogy.** Moving DOM ownership must not alter answer recording, evidence timing, concept reveal, validator behavior, assistance provenance, or completion gates.

## 12. Runtime-change check

The review target commit added only the target-topology decision document. No runtime change is part of the decision pass.

This review likewise changes documentation only.

## 13. Gate decision

All required conditions pass:

- visual-authority conformance: **PASS**;
- mapped-defect disposition: **PASS**;
- Stage 1–3 pedagogical preservation: **PASS**;
- cross-stage role consistency: **PASS**;
- target journey/handoff coherence: **PASS**;
- control boundary: **PASS**;
- shared implementation ownership: **PASS**.

Therefore:

**TARGET-TOPOLOGY DESIGN GATE: CLOSED — PASS**

The reviewed target topology is now sufficient authority for a scoped implementation pass that changes only the Stage 1–3 spatial behavior required by `course-design/stage-1-3-target-topology-decision-2026-09-15.md`, followed by transition-by-transition post-build validation against §15.8.
