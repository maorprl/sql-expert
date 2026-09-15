# Stage 1–3 spatial transition mapping review

**Date:** 2026-09-15  
**Review target:** `course-design/audits/stage-1-3-transition-mapping-2026-09-15.md` at blob `31c9f1c28c34eee0800b5b47004f8c2772d105e7`  
**Runtime baseline checked:** `bd9ff8a33e32bd07f8ed5601f14457ac5ea28285`  
**Review baseline:** `main@0b1575f6828983696bb8fcdf9a2b5eee28536225`  
**Review type:** conformance review of mapping completeness and authority traceability; not an independent-agent review.  

## Verdict

**PASS — MAPPING COVERAGE AND AUTHORITY TRACEABILITY SATISFIED — SPATIAL-MAPPING GATE CLOSED**

This PASS closes only the mapping/review gate. It does **not** authorize runtime implementation and does not choose the corrected target topology. The mapping’s documented defects remain unresolved implementation/design work.

## 1. Review criteria

The review applies exactly two gates:

1. **Coverage gate** — the map must cover every material learner-facing spatial transition in the current Stage 1–3 runtime, including material substates that change prompt/response ownership, tool/evidence ownership, feedback/progression placement, Working Schema/reference role, or completion topology.
2. **Authority-traceability gate** — each spatial judgment must derive from current `course-design/course-visual-language.md` and, where a control boundary is involved, `course-design/course-controls.md`.

The review does not ask whether the runtime itself passes the visual-language contract. The map intentionally records several runtime failures.

## 2. Authority used

The governing rules are:

- `course-visual-language.md` §8 — attention choreography and evidence locality;
- §10 — equivalent learner roles should use consistent cross-encounter visual language;
- §14 — course controls are a distinct shell role and `Show solution` is SQL-workspace-local assistance;
- §15.1 — stable learner-response anchor and cross-encounter equivalence;
- §15.2 — tool/evidence locality and object-local direct interactions;
- §15.3 — feedback ownership;
- §15.4 — local transition controls remain near the action/evidence they follow, while shell navigation is exempt;
- §15.5 — persistent references may change prominence without arbitrary relocation;
- §15.6 — requirements for genuine phase handoffs;
- §15.8 — every material transition must record prompt/response, tool/evidence, feedback, transition control, Working Schema/reference, Completed Steps, and whether movement is a justified handoff or unexplained jump.

`course-controls.md` supplies the boundary conditions used in the review:

- chapter navigation, Back/Forward, and Retry/Redo are course-shell controls, not local progression;
- local `Check answer`, `Run query`, and `Continue` remain Stage-local actions;
- `Show solution`, Desired Output, and SQL Structure are SQL-workspace-local assistance/scaffolding, not global navigation;
- Back/Forward are history navigation and are not substitutes for local progression.

## 3. Coverage gate

### 3.1 Runtime-change control

A compare from the required runtime baseline `bd9ff8a3` to review baseline `0b1575f6` shows one net changed file only: the mapping Markdown document. There are no net HTML, JS, CSS, schema, seed, validator, or runtime changes. Therefore the runtime inspected by the map is still the required baseline runtime.

### 3.2 Stage 1 coverage

The map records 16 material states/substates and separately audits 8 material lane changes.

Covered material topology:

- Relations;
- direct connecting-field interaction;
- Cardinality;
- Grain;
- Baseline Run;
- Baseline interpretation;
- Baseline success/Continue;
- Prediction;
- Prediction success/Continue;
- Semantic action;
- all three JOIN teaching beats as one stable-topology instructional phase;
- SQL authoring;
- SQL success/result inspection;
- final verification;
- verification success/Complete control;
- completion.

No material spatial transition is omitted. Generic same-lane acknowledgements are represented in the parent state’s feedback/progression column; they do not require separate sequence rows because they do not change spatial ownership. The three JOIN teaching beats are correctly grouped because their topology stays L with Working Schema as R reference throughout.

**Stage 1 coverage: PASS.**

### 3.3 Stage 2 coverage

The map records 18 material states/substates and separately audits 10 material lane changes.

It explicitly captures the substates most likely to disappear in a state-only audit:

- object-local Connection action;
- Connection correct acknowledgement returning to L;
- Cardinality success moving to R;
- multiplication Prediction in R;
- Prediction success in R;
- repeated-context Prediction returning to L;
- Repetition success moving to R;
- Concept returning to L;
- Application in L;
- Application success moving to R;
- SQL authoring/result/verification/completion.

This is sufficient to expose the `L ↔ R` acknowledgement oscillation as a sequence-level defect rather than treating individually coherent screenshots as sufficient.

**Stage 2 coverage: PASS.**

### 3.4 Stage 3 coverage

The map records 17 material states/substates and separately audits 9 material lane changes.

The evidence episode is decomposed correctly into:

- company measurement before run;
- captured company evidence;
- funding-round measurement before run;
- two-result comparison;
- zero-match success;
- prediction;
- prediction success;
- SQL authoring;
- result inspection;
- L-side verification;
- verification success;
- coverage conclusion;
- completion.

This is enough to distinguish a coherent evidence-phase continuation from the later unsupported `R Result → L Verification` reversal.

**Stage 3 coverage: PASS.**

### 3.5 Cross-stage coverage

After the three per-Stage maps and sequence audits, the map compares equivalent roles across the encounters. It includes the user-required comparison classes:

- field selection;
- ordinary reasoning question;
- prepared evidence/measurement;
- SQL authoring;
- result inspection;
- verification;
- completion.

It additionally compares evidence interpretation, evidence-grounded prediction, and teacher/concept instruction where those roles exist.

**Cross-stage coverage: PASS.**

### 3.6 Explicitly excluded surfaces

The exclusions are valid and do not create a coverage hole:

- **Course-shell chapter navigation** is not an encounter-state transition. `course-controls.md` and visual-language §15.4 explicitly separate shell navigation from local progression and exempt it from the local transition-control placement rule.
- **Back/Forward and Retry/Redo** are authority-defined needs but are not current Stage runtime transitions in the inspected baseline; there is therefore no current transition path to map here.
- **Narrow responsive stacking** removes literal L/R columns but does not change the underlying ownership findings. The map explicitly scopes its lane notation to the two-lane desktop composition and retains the locality/ownership conclusions below that breakpoint.

**Coverage gate overall: PASS.**

## 4. Verdict-to-authority traceability

The tables below check every state/substate spatial judgment in the mapping. Section references are to `course-visual-language.md` unless prefixed `controls`.

### 4.1 Stage 1 verdict trace

| Mapping row | Authority basis | Trace result |
|---|---|---|
| Relations ⚠️ | §15.1 response role; §15.2 object/action locality; §15.3 feedback ownership | Supported |
| Connection active ❌ | §15.2 direct-object locality; §15.3 feedback ownership | Supported |
| Cardinality ✅ | §15.1 stable ordinary reasoning anchor; §15.5 R reference may remain secondary | Supported |
| Grain ✅ | §15.1; §15.5 | Supported |
| Baseline Run ❌ | §8 evidence locality; §15.2 tool locality; §15.3 diagnostic feedback ownership; §15.6 genuine measurement handoff | Supported |
| Baseline interpretation ⚠️ | §15.1 anchor movement; §15.2 evidence/interpretation locality; §15.6 handoff conditions | Supported |
| Baseline success ✅ | §15.2 evidence cycle; §15.3 feedback; §15.4 Continue locality | Supported |
| Prediction active ⚠️ | §15.1 response-anchor movement; §15.2 evidence locality | Supported |
| Prediction success ⚠️ | §15.4 local progression plus §15.6 next-handoff requirement | Supported |
| Semantic action ❌ | §15.1 stable anchor; §15.6 requires a legible role-changing handoff rather than state-driven movement | Supported |
| JOIN teaching ✅ | §9 guidance role; §15.6 reasoning→teaching handoff; §15.5 Working Schema reference | Supported |
| SQL authoring ❌ | §8 coherent authoring area; §15.2 tool locality; §15.3 SQL diagnostics; §15.5 Working Schema relocation; controls §3–4 local SQL assistance | Supported |
| Result inspection ✅ | §8 action→evidence cycle; §15.2 result locality; §15.4 progression; §15.6 authoring→evidence handoff | Supported |
| Final verification ⚠️ | §15.2 evidence/interpretation locality; §15.1/§10 cross-encounter response equivalence | Supported |
| Verification success ✅ | §15.3 feedback ownership; §15.4 progression locality | Supported |
| Complete ⚠️ | §15.6 genuine phase end; §15.5 Working Schema relocation | Supported |

### 4.2 Stage 2 verdict trace

| Mapping row | Authority basis | Trace result |
|---|---|---|
| Relations ⚠️ | §15.1–15.3 | Supported |
| Connection active ✅ | §15.2 direct-object locality; §15.3 feedback ownership | Supported |
| Connection acknowledgement ⚠️ | §15.3 success feedback ownership; §15.4 Continue locality | Supported |
| Grain ✅ | §15.1; §15.5 | Supported |
| Cardinality active ✅ | §15.1; §15.5 | Supported |
| Cardinality success ❌ | §15.3 feedback; §15.4 Continue must not alternate due to containers; §15.6 no real phase change | Supported |
| Multiplication Prediction ❌ | §15.1 stable ordinary reasoning anchor; §15.6 state boundary alone is insufficient | Supported |
| Prediction success ⚠️ | §15.3–15.4 locally coherent in R, but §15.6 next move must be legible | Supported |
| Repetition active ❌ | §15.1 ordinary-reasoning anchor; §15.6 no role change justifying R→L | Supported |
| Repetition success ❌ | §15.3; §15.4; §15.6 | Supported |
| Concept Moment ✅ | §3 Concept Moments; §9 teacher/guidance role; §15.6 concept/teaching phase | Supported |
| Application active ✅ | §15.1 ordinary reasoning | Supported |
| Application success ⚠️ | §15.3 feedback ownership conflicts with anticipatory R move; §15.6 later SQL handoff can be genuine | Supported |
| SQL authoring ❌ | §8; §15.2–15.3; §15.5; controls §3–4 | Supported |
| Result inspection ✅ | §15.2–15.4; §15.6 | Supported |
| 1003 verification ⚠️ | §15.2 strong evidence locality; §10/§15.1 equivalent verification inconsistency | Supported |
| Verification success ✅ | §15.3–15.4 | Supported |
| Complete ⚠️ | §15.6 completion phase; §15.5 reference restoration | Supported |

### 4.3 Stage 3 verdict trace

| Mapping row | Authority basis | Trace result |
|---|---|---|
| Relations ⚠️ | §15.1–15.3 | Supported |
| Connection active ❌ | §15.2 direct-object locality; §15.3 feedback ownership | Supported |
| Cardinality ✅ | §15.1; §15.5 | Supported |
| Grain ✅ | §15.1; §15.5 | Supported |
| Company measurement ❌ | §8; §15.2 tool locality; §15.3 diagnostic feedback; §15.6 measurement handoff | Supported |
| Company evidence captured ✅ | §15.2 evidence locality; §15.4 progression | Supported |
| Funding measurement ❌ | §15.2–15.3; §15.6 | Supported |
| Compare measurements ✅/⚠️ | §15.2 evidence + immediate interpretation locality; §15.1/§15.6 explicit movement of response role must be a legible evidence-phase handoff | Supported |
| Zero-match success ✅ | §15.3–15.4 evidence-local feedback/progression | Supported |
| Prediction active ⚠️ | §15.2 evidence-grounded interpretation; §10/§15.1 cross-stage consistency | Supported |
| Prediction success ✅ | §15.4 local progression; §15.6 evidence→authoring handoff | Supported |
| SQL authoring ❌ | §8; §15.2–15.3; §15.5; controls §3–4 | Supported |
| Result inspection ✅ | §15.2–15.4; §15.6 | Supported |
| Result verification ⚠️ | §15.2 evidence/interpretation association; §10/§15.1 equivalent-role consistency | Supported |
| Verification success ✅ | §15.3–15.4 | Supported |
| Coverage conclusion ✅ | §15.1 ordinary business reasoning with evidence as reference; §15.5 persistent result/reference role | Supported |
| Complete ✅/⚠️ | §15.6 completion phase; §15.5 Working Schema/reference restoration | Supported |

## 5. Sequence-audit traceability

The sequence-first judgments also trace cleanly to authority:

- **Justified measurement / authoring / evidence handoffs** derive from §15.6 plus §8’s task-dependent attention choreography.
- **Unsupported `L ↔ R` jumps with no role change** derive from §15.1 and §15.6’s explicit rule that a state change alone is not enough.
- **Stage 2 acknowledgement oscillation** additionally violates §15.4, which says local progression controls must not alternate page regions merely because different runtime states use different containers.
- **Stage 1 `R Prediction → L Semantic Action`** fails §15.6 because a role change exists but the handoff is not made legible enough to prevent hunting.
- **Stage 3 `R Result → L Verification`** fails the combination of §15.2 evidence-interpretation locality, §10 cross-encounter consistency, §15.1 equivalent response patterns, and §15.6(5) consistent equivalent handoffs.

**Sequence-verdict traceability: PASS.**

## 6. Cross-stage verdict traceability

The cross-stage comparison is directly required by §10 and §15.1, not an optional analytical extension. The map correctly distinguishes:

- **same role, inconsistent topology** — connecting-field selection and final verification;
- **same role, consistently defective topology** — SQL authoring diagnostics in all three encounters;
- **same role, consistent and coherent topology** — post-SQL result inspection;
- **role differs materially** — teacher/concept-only phases, where identical placement is not required.

`course-controls.md` additionally supports the map’s treatment of SQL-local assistance as part of the authoring tool role rather than shell navigation.

**Cross-stage traceability: PASS.**

## 7. Review findings about the mapping itself

No blocking defect was found in the mapping.

Two non-blocking clarifications are recorded:

1. The mapping intentionally groups same-lane substates when they do not materially change spatial ownership. This does not violate §15.8 because the parent row still records feedback/progression/reference placement, while every actual lane-changing substate is separate.
2. The map is a desktop two-lane topology audit. Responsive stacking should receive its own responsive validation during implementation/post-build validation, but it is not necessary to answer the current L/R mapping gate because the ownership relationships remain represented.

## 8. Gate decision

Both required conditions pass:

- **Every material current Stage 1–3 spatial transition is covered.**
- **Every mapping verdict is traceable to current `course-visual-language.md` / `course-controls.md`.**

Therefore:

**SPATIAL-MAPPING GATE: CLOSED — PASS**

The next step, if authorized separately, is a topology decision/correction design pass using the reviewed findings. No runtime implementation is authorized by this review.