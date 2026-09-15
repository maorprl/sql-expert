# Stage 1–3 Transition Mapping — Visual Language and Course Controls

**Date:** 2026-09-15  
**Status:** MAPPING COMPLETE — FROZEN FOR REVIEW — RUNTIME HOLD  
**Baseline:** `main@bd9ff8a33e32bd07f8ed5601f14457ac5ea28285`  
**Scope:** Stage 1–3 learner-journey transitions only; documentation / conformance mapping, no runtime change

## 1. Purpose and boundary

This document maps every material Stage 1–3 learner transition against the current cross-course spatial / visual contract in `course-design/course-visual-language.md` and the current control semantics in `course-design/course-controls.md`.

The mapping is deliberately **transition-first**, not screenshot-first. A state can be visually coherent in isolation and still violate the course contract when the learner enters or leaves it.

This document does not redesign the encounters, change learner evidence, alter validators, change assistance semantics, implement Back / Forward, define Retry / Redo reset behavior, or modify runtime code.

No implementation state older than the stated baseline is used as evidence. Current baseline runtime is inspected only to identify conformance status against current authority; runtime does not become authority by being inspected here.

**Runtime remains blocked until this mapping has been reviewed.**

## 2. Current authority used

### Course-wide authority

- `course-design/course-visual-language.md`
- `course-design/course-controls.md`

### Stage 1 authority

- `course-design/stage-1/stage-1-learner-route.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`

### Stage 2 authority

There is no `course-design/stage-2/` learner-route / interaction-decision pair at this baseline. Current Stage 2 authority is distributed across the current Cycle 1 records, with later targeted corrections superseding conflicting earlier entry / evidence decisions:

- `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-and-waiver-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-structural-reuse-2026-09-13.md`
- `course-design/production/cycle-1/implementation-record-owner-directed-2026-09-13.md`, including its 2026-09-15 conformance-restoration addendum as evidence of the currently restored sequence

The implementation record is used to establish which superseding decisions were actually restored on the baseline; it does not replace the design authority above.

### Stage 3 authority

- `course-design/stage-3/stage-3-learner-route.md`
- `course-design/stage-3/stage-3-interaction-decisions.md`

### Read-only baseline implementation inspected for conformance

- `index.html`
- `src/main.js`
- `src/interaction-lifecycle.js`
- `src/styles.css`
- `src/media-coverage.js`
- `src/funding-participation.js`
- `src/inner-join-unmatched.js`

## 3. Spatial role vocabulary

The mapping uses role names rather than hard-coding a future DOM layout.

| Code | Learner-facing role | Contract |
|---|---|---|
| `SHELL` | Chapter navigation; future Back / Forward / Retry-Redo course controls | Stable course-shell layer, visually subordinate to current learning activity; does not become task evidence. |
| `BUSINESS` | Persistent Business Request | Context/reference; prominence may quiet during tool/evidence phases without arbitrary relocation. |
| `LIVE` | Live Schema | Discovery/reference surface. |
| `RESPONSE` | Current learner prompt + response controls + answer checking + response-specific corrective feedback | Stable learner-response anchor across ordinary reasoning. It may move only for a real role change with a legible phase handoff. |
| `WORKING` | Working Schema | Guided relational reasoning / reference surface. It may become primary or secondary, but prominence change is not automatic permission to relocate it. |
| `TOOL` | Prepared measurement or learner-authored SQL workspace | Tool used by the learner; may become primary during measurement or authoring. |
| `RESULT` | Returned query result | Evidence surface; may become primary after execution. |
| `EVIDENCE-ACTION` | Local interpretation / verification surface spatially attached to the relevant evidence | Used only when the learner is interpreting evidence or a compact established-premise artifact; it must not become a generic alternate home for unrelated response content. |
| `HISTORY` | Completed Steps / review history | Visible and reviewable, always quieter than the current task; never primary navigation. |

## 4. Transition classes

- **C — continuity:** learner role remains ordinary reasoning; `RESPONSE` stays anchored.
- **O — object-local interaction:** learner acts directly on an object such as a Working Schema field; checking and corrective feedback belong with that object.
- **E — evidence cycle:** an action produces or exposes evidence that is immediately interpreted; action, evidence, and interpretation stay local.
- **P — phase handoff:** primary learner role genuinely changes, for example reasoning → measurement, reasoning → teaching, teaching → authoring, or authoring → result inspection.
- **T — teacher-led instructional progression:** no new assessment; instructional beats progress without becoming co-primary panels.
- **X — completion handoff:** evidence is closed and the encounter moves to completion.

A material visual handoff can be mapped without requiring it to become a separate Back / Forward history node. History-node granularity is treated separately in Section 9.

## 5. Course-wide transition invariants

These apply to every row below.

1. **Stable response ownership.** Ordinary reasoning does not bounce the prompt / answer / check / correction role between columns. If the learner responds directly to an object, the response ownership becomes object-local rather than splitting checking / feedback away from the object.
2. **Feedback locality.** Wrong-answer and correctness feedback stay with the action that caused them. SQL diagnostics stay with SQL; evidence-interpretation correction stays with the evidence interpretation; Working-Schema field correction stays with the Working-Schema interaction.
3. **Local progression.** `Continue`, verification transitions, and equivalent local progression controls remain near the completed action / feedback / evidence from which the next move follows.
4. **Persistent references do not jump merely because their prominence changes.** `BUSINESS`, `WORKING`, `LIVE`, and `HISTORY` can quiet or strengthen without arbitrary relocation.
5. **Completed work never becomes the first scan path by accumulation.** `HISTORY` remains reviewable and secondary through all phases.
6. **Authoring choreography is shared.** During active SQL authoring, task + editor + needed Working Schema reference form one coherent area. `Show solution`, where available, is local secondary SQL-workspace assistance only.
7. **Result choreography is shared.** After accepted execution, the editor no longer owns primary attention. `RESULT` becomes evidence; the immediate interpretation / verification remains adjacent enough to form one cycle.
8. **Shell controls never replace pedagogy.** Chapter navigation and Back / Forward remain in `SHELL`; Forward cannot cross the progression frontier; Back / Forward never mutate recorded evidence.
9. **Retry / Redo remains non-operational in this map.** The need exists, but reset / invalidation semantics are still OPEN in `course-controls.md`; this map does not invent them.
10. **One spatial owner.** Shared course-level layout should own course-wide role placement. Encounter-local CSS / DOM movement is reserved for genuine encounter-specific needs, not for reimplementing general topology.

## 6. Stage 1 transition map — Media coverage / first JOIN

Authoritative reasoning order: relations → connection → Cardinality → result Grain → Baseline measurement / interpretation → prediction → semantic action → JOIN teaching → SQL authoring → result inspection → final verification → completion.

| ID | Transition | Class | `RESPONSE` before → after | `TOOL` / evidence before → after | Feedback / local progression | `WORKING` + `HISTORY` role | Handoff judgment | Baseline conformance at `bd9ff8a3` |
|---|---|---|---|---|---|---|---|---|
| S1-01 | Entry → relation identification | C | Empty/current start → relation question and selection check in `RESPONSE` | No tool | Wrong relation-set correction and `Check selection` owned by current relation task | `WORKING` empty/evolving and visually active; `HISTORY` empty | No phase handoff | **CONFORMS** |
| S1-02 | Relations accepted → connecting-field reasoning | O | Relation success / local Continue → connection orientation | Direct field selection occurs in `WORKING`; no SQL tool | **Required target:** field check + field-specific corrective feedback stay with the selected Working-Schema field interaction; success can bridge to the next reasoning move | `WORKING` is primary interactive object; `HISTORY` gains relation evidence quietly | Real object-local role change, not a column jump for ordinary radio-choice reasoning | **DRIFT:** selection is in `WORKING`, but `Check selected column` and wrong-selection feedback are rendered in the separate `RESPONSE` card. This violates object-local feedback ownership and the Stage 1 local-correction decision. |
| S1-03 | Connection established → Cardinality reasoning | C | Connection feedback → Cardinality question in stable response anchor | No tool | Correct connection feedback may reveal PK/FK; `Continue` remains local to that feedback before Cardinality | `WORKING` now shows established connector/PK-FK and is reference for Cardinality; `HISTORY` remains secondary | No new page-region handoff | **CONFORMS apart from S1-02 ownership defect entering this transition** |
| S1-04 | Cardinality established → result-Grain reasoning | C | Cardinality answer / concept consequence → Grain question | No tool | Feedback consolidates relationship but does not imply Grain; progression stays local | `WORKING` becomes supporting reference; `HISTORY` gains Cardinality | Ordinary reasoning continuity | **CONFORMS** |
| S1-05 | Grain established → prepared Baseline measurement | P | Grain question → measurement orientation in `RESPONSE` | No tool → prepared compact measurement `TOOL`; Results become local measurement evidence | Grain feedback leads locally into measurement; Run belongs to the prepared measurement | `WORKING` quiet reference; `HISTORY` preserves Grain | **Valid phase handoff:** reasoning → measurement; tool can become primary while response role orients the handoff | **CONFORMS** |
| S1-06 | Baseline query run → interpret returned `18` | E | Measurement orientation → evidence-interpretation orientation | `TOOL` run → returned Baseline `RESULT` + interpretation action | Interpretation question/check/correction must remain adjacent to the returned count; no remote feedback | `WORKING` secondary; `HISTORY` unchanged until interpretation completes | Same evidence cycle, not a new unrelated task | **CONFORMS** |
| S1-07 | Baseline interpreted → prediction | E | Baseline interpretation → prediction orientation | Baseline evidence remains established; compact premises + prediction response stay local to the evidence cycle | Baseline success + Continue stay with evidence; prediction correction stays with prediction | `WORKING` reference; `HISTORY` records Baseline interpretation | Evidence interpretation → evidence-grounded prediction is a continuous evidence phase | **CONFORMS** |
| S1-08 | Prediction established → semantic relational action | P | Evidence-local prediction → semantic-action question in stable response anchor | Prediction evidence becomes established reference; no active tool | Prediction success + Continue remain with prediction before returning to ordinary reasoning | `WORKING` still available; `HISTORY` gains prediction | **Valid handback:** evidence-focused prediction → ordinary semantic reasoning | **CONFORMS** |
| S1-09 | Semantic action established → JOIN Concept / teaching beat 1 | P | Semantic-action response → teacher-led JOIN explanation | No SQL tool yet; local explanatory row-match visual appears only now | Semantic-action feedback and local Continue lead into teaching; no new assessment inside teaching | `WORKING` retains established relationship as schema anchor; `HISTORY` gains semantic action | **Valid phase handoff:** assessed reasoning → explicit instruction | **CONFORMS** |
| S1-10 | JOIN teaching beat 1 → beat 2 | T | Teacher explanation stays in same instructional region | Row-match explanation → relationship-to-`ON` explanation | Teaching-next control belongs to the teaching sequence | `WORKING` remains visible reference; `HISTORY` does not masquerade as new evidence | Same instructional phase; no arbitrary region move | **CONFORMS** |
| S1-11 | JOIN teaching beat 2 → beat 3 | T | Same instructional region | `ON` mapping → full business-question-to-query mapping | Teaching-next control stays local | `WORKING` reference; completed evidence secondary | Same instructional phase | **CONFORMS** |
| S1-12 | JOIN teaching beat 3 → learner SQL authoring | P | Teaching → concise implementation task | No authoring tool → clean SQL editor becomes primary `TOOL` | Transition to implementation is local to end of teaching. Run belongs to editor. Desired Output / SQL Structure and `Show solution` are secondary SQL-local assistance | `WORKING` remains immediately available but secondary; `HISTORY` quiet | **Valid phase handoff:** instruction → learner implementation | **CONFORMS** |
| S1-13 | Valid SQL execution → result inspection | P + E | Authoring task → explicit inspection orientation | Editor primary → `RESULT` primary; editor ceases active-authoring role | Execution acknowledgement and `Continue to verification` remain beside result evidence; `Show solution` disappears | `WORKING` quiet reference; `HISTORY` records SQL only after accepted result | **Valid phase handoff:** authoring → evidence inspection | **CONFORMS** |
| S1-14 | Result inspection → final verification | E | Inspection orientation → verification prompt / response adjacent to visible Results | Same `RESULT` remains visible and primary evidence | Verification check/correction stays with verification; must not repeat a conclusion pre-announced by system | `WORKING` reference; `HISTORY` secondary | Same evidence cycle | **CONFORMS** |
| S1-15 | Verification correct → completion | X | Verification response → verification-complete handoff → completion state | Result may remain as established evidence but no longer needs to dominate | Correct verification + `Complete stage` stay local to verified evidence; completion does not retroactively change evidence | `HISTORY` gains final verification and remains reviewable | Evidence closure → completion | **CONFORMS** |

### Stage 1 mapping consequence

The only material spatial-ownership defect found in the baseline Stage 1 transition path is **S1-02**: the learner selects a Working-Schema field in one region but checks it and receives correction in another. The target mapping requires that check / correction move into the Working-Schema interaction when runtime work is later authorized. No Stage 1 runtime change is authorized by this document.

## 7. Stage 2 transition map — Funding participation / JOIN row multiplication

Current controlling sequence after the targeted revisions and 2026-09-15 restoration:

relations → connecting field → target Grain → Cardinality → qualitative multiplication prediction → repeated-context prediction → JOIN row multiplication Concept Moment → concrete `3 → 3` application → SQL → accepted 72-row result → result-derived `funding_round_id = 1003` slice → verification → completion.

| ID | Transition | Class | `RESPONSE` before → after | `TOOL` / evidence before → after | Feedback / local progression | `WORKING` + `HISTORY` role | Handoff judgment | Baseline conformance at `bd9ff8a3` |
|---|---|---|---|---|---|---|---|---|
| S2-01 | Entry → relation identification | C | Start → relation question | No tool | Relation correction + check local to current task | `WORKING` empty/evolving; `HISTORY` empty | No phase handoff | **CONFORMS** |
| S2-02 | Relations accepted → connecting-field reasoning | O | Relation success → connection orientation | Direct field selection in `WORKING` | Check, selected-column status, wrong-selection correction, and success are local to `WORKING` interaction | `WORKING` primary; `HISTORY` gets relation evidence | Legitimate object-local interaction | **CONFORMS — this is the cross-stage reference behavior for direct Working-Schema field selection** |
| S2-03 | Connection established → target Grain | C | Connection consequence → Grain question | No tool | PK/FK reveal follows correct connection only; local Continue then returns to response anchor | `WORKING` established relationship as reference; `HISTORY` quiet | No arbitrary move | **CONFORMS** |
| S2-04 | Grain established → Cardinality | C | Grain question → Cardinality question | No tool | Correct Grain feedback does not reveal multiplication; progression stays local | `WORKING` relationship reference; `HISTORY` gains Grain | Ordinary reasoning continuity | **CONFORMS** |
| S2-05 | Cardinality established → qualitative multiplication prediction | P | Cardinality response → prediction orientation | No SQL tool; compact established-premise surface becomes the prediction support artifact | Cardinality feedback + local Continue lead to prediction. Actual prediction prompt / options / correction stay together with its premise artifact | `WORKING` secondary reference; `HISTORY` gains Cardinality | **Valid reasoning-role handoff:** ordinary relation reading → explicit prediction from two established premises. The learner-response unit itself must remain internally local. | **CONFORMS** |
| S2-06 | Multiplication prediction → repeated-context prediction | C | First prediction → second prediction in response anchor | No tool | First prediction feedback + local Continue; second correction local | `WORKING` reference; `HISTORY` records first prediction | Same assessed prediction episode | **CONFORMS** |
| S2-07 | Repeated-context prediction → row-multiplication Concept Moment | P | Assessed prediction → teacher/concept explanation | No tool; concept explanation becomes learning-accent surface | Feedback / Continue stay local, then Concept Moment names only what learner already inferred | `WORKING` reference; `HISTORY` gains repeated-context evidence | **Valid handoff:** assessment → naming/explanation | **CONFORMS** |
| S2-08 | Concept Moment → concrete `3 participations → 3 rows` application | C | Concept explanation → supporting application question | No tool | `Apply the idea` local to Concept Moment; application check/correction local to application | `WORKING` reference; concept is not falsely recorded as core evidence | Same learning/application phase | **CONFORMS** |
| S2-09 | Concrete application → SQL authoring | P | Application response → implementation orientation | No authoring tool → SQL editor primary | Application feedback + local `Continue to SQL implementation`; Run and `Show solution` local to editor | `WORKING` secondary reference; `HISTORY` gains application | **Valid phase handoff:** reasoning/application → implementation | **CONFORMS** |
| S2-10 | Valid SQL execution → result inspection | P + E | Authoring → inspection orientation | Editor → accepted 72-row `RESULT` | Execution feedback and Continue stay with result; `Show solution` unavailable after authoring | `WORKING` quiet reference; `HISTORY` gains SQL result evidence | **Valid phase handoff:** authoring → evidence | **CONFORMS** |
| S2-11 | Full result → local result-derived `1003` slice + verification | E | Inspection orientation → verification task | Full accepted result remains source evidence; derived `1003` slice is shown immediately with the verification response | Verification correction refers to visible slice, not a hard-coded answer table | `WORKING` secondary; `HISTORY` quiet | Same evidence cycle; local slice is an evidence focus, not a new SQL lesson | **CONFORMS** |
| S2-12 | Verification correct → completion | X | Verification → verification-complete handoff → completion synthesis | Evidence closes | Correct verification + Complete stay local | `HISTORY` adds final interpretation | Evidence closure → completion | **CONFORMS** |

### Stage 2 mapping consequence

Stage 2 provides the cleanest current example of the object-local contract: field selection, selected-field status, checking, and correction are co-located in the Working Schema. That pattern should be reused for equivalent Stage 1 / Stage 3 direct field-selection interactions rather than independently redesigned.

The absence of a dedicated current Stage 2 learner-route / interaction-decision pair is an authority-maintainability concern, but this mapping can still be completed because the current targeted revision records establish the controlling sequence. This document does not create a new Stage 2 authority layer.

## 8. Stage 3 transition map — INNER JOIN unmatched company coverage

Authoritative order: relations → connection → Cardinality → funding-round result Grain → prepared company evidence → prepared funding-round evidence → identify actual zero-match company → predict INNER JOIN survival → SQL → result verification → original coverage conclusion → completion.

| ID | Transition | Class | `RESPONSE` before → after | `TOOL` / evidence before → after | Feedback / local progression | `WORKING` + `HISTORY` role | Handoff judgment | Baseline conformance at `bd9ff8a3` |
|---|---|---|---|---|---|---|---|---|
| S3-01 | Entry → relation identification | C | Start → relation question | No tool | Relation check/correction local to task | `WORKING` empty/evolving; `HISTORY` empty | No phase handoff | **CONFORMS** |
| S3-02 | Relations accepted → connecting-field reasoning | O | Relation success → connection orientation | Direct `funding_round.company_id` selection in `WORKING` | **Required target:** check + field-specific correction stay with the Working-Schema interaction | `WORKING` primary; `HISTORY` gains relation evidence | Legitimate object-local role | **DRIFT:** field is selected in `WORKING`, but check and correction are rendered in the separate `RESPONSE` card. Same ownership defect as S1-02. |
| S3-03 | Connection established → Cardinality | C | Connection consequence → Cardinality question | No tool | PK/FK relationship reveal only after correct field; feedback / Continue local | `WORKING` reference; `HISTORY` quiet | Ordinary reasoning continuity | **CONFORMS apart from S3-02 ownership defect entering this transition** |
| S3-04 | Cardinality established → funding-round result Grain | C | Cardinality → Grain question | No tool | Feedback preserves distinction between relationship possibility and requested row meaning | `WORKING` supporting reference; `HISTORY` gets Cardinality | Ordinary reasoning continuity | **CONFORMS** |
| S3-05 | Grain established → first prepared company measurement | P | Grain response → measurement orientation | No tool → prepared company measurement `TOOL` | Grain feedback leads to measurement; Run stays with prepared query | `WORKING` quieter; `HISTORY` gains Grain | **Valid phase handoff:** reasoning → evidence generation | **CONFORMS** |
| S3-06 | Company query result → capture / handoff to funding-round measurement | E | Measurement orientation → company-evidence confirmation | First `RESULT` captured; local Continue advances to second prepared measurement | Capture feedback + `Continue to funding-round evidence` stays with captured evidence | `WORKING` reference; `HISTORY` does not falsely mark zero-match conclusion yet | Same evidence-generation episode | **CONFORMS** |
| S3-07 | Company evidence → second prepared funding-round measurement | E | Company-evidence bridge → funding measurement orientation | First measurement remains available as compact named-company evidence while second prepared query becomes active `TOOL` | Run remains local to second measurement; no zero-match conclusion supplied | `WORKING` reference; `HISTORY` quiet | Continuous two-measurement evidence cycle | **CONFORMS** |
| S3-08 | Funding-round result → compare and identify unmatched company | E | Measurement orientation → evidence-comparison response | Funding-round `RESULT` remains visible; first-measurement evidence + comparison response stay adjacent | Comparison check/correction explicitly directs learner back to visible IDs | `WORKING` secondary; `HISTORY` not advanced until comparison resolves | Immediate interpretation of produced evidence | **CONFORMS** |
| S3-09 | Zero-match company established → INNER JOIN survival prediction | E | Evidence-comparison success → prediction orientation | Zero-match case retained as compact established evidence | Success + Continue local; prediction response/correction stays with the established case | `WORKING` reference; `HISTORY` gains zero-match evidence | Evidence → prediction is one reasoning cycle | **CONFORMS** |
| S3-10 | Prediction established → SQL authoring | P | Prediction response / Concept consequence → implementation orientation | No authoring tool → clean SQL editor primary | Prediction feedback + local Continue; Run / local SQL assistance belongs to editor | `WORKING` secondary; `HISTORY` gains prediction | **Valid phase handoff:** prediction → implementation | **CONFORMS spatially**; see control-ownership defect C-03 below for stale Stage 3 `Show solution` handler. |
| S3-11 | Valid SQL execution → result inspection | P + E | Authoring → inspection orientation | Editor → actual `RESULT` primary | Execution feedback + `Continue to verification` beside result; `Show solution` ends with authoring | `WORKING` quiet reference; `HISTORY` gains SQL | **Valid phase handoff:** authoring → evidence | **CONFORMS** |
| S3-12 | Result inspection → verify zero-match company absence | E | Inspection → verification question in response anchor | Same `RESULT` stays visibly adjacent / paired as evidence | Verification correction explicitly points to visible `company_id`; no remote generic feedback | `WORKING` reference; `HISTORY` quiet | Same result-evidence cycle | **CONFORMS** |
| S3-13 | Verification → original company-coverage conclusion | C + E | Zero-match verification → coverage conclusion question | Same accepted result remains available; verified absence becomes established evidence | Verification feedback bridges to original business question; coverage correction local | `WORKING` reference; `HISTORY` gains verification | This is transfer / business interpretation of the same evidence, not a new result-Grain definition | **CONFORMS** |
| S3-14 | Coverage conclusion → completion | X | Business conclusion → completion state | Evidence closes | Correct conclusion + local completion progression | `HISTORY` gains conclusion | Evidence closure → completion | **CONFORMS** |

### Stage 3 mapping consequence

The Stage 3 field-selection transition must converge on the same object-local pattern already used in Stage 2. Stage 3 also has a separate control-ownership issue around `Show solution`, recorded below; that issue does not change Stage 3 pedagogy.

## 9. Back / Forward mapping across the transition model

`course-controls.md` establishes Back / Forward semantics but does not define the exact technical history-node representation. This mapping therefore separates **visual transition coverage** from **journey-history storage granularity**.

### 9.1 Required semantics at every mapped state

- Back / Forward live in `SHELL` and do not move with Stage state.
- Back is disabled when there is no previously visited history state.
- Forward is disabled at the progression frontier.
- Back enters review, not a new attempt.
- Forward traverses only already visited history.
- Neither control changes recorded answers, evidence, hint / solution provenance, SQL text, produced results, completion state, or downstream evidence merely through navigation.
- Historical review cannot expose a control that mutates historical evidence as though it were the current attempt.
- New progress still requires the Stage-local action at the progression frontier.
- Back / Forward remain encounter-local; chapter selection is separate.

### 9.2 Material transition versus stored history node

The tables intentionally include transient acknowledgement / phase-handoff states because they matter visually. They do **not** assert that every such state must become an independent Back / Forward stop.

A safe implementation must preserve enough state to reconstruct the learner-visible point being reviewed. This is especially important for:

- Stage 1 JOIN teaching beat 1 / 2 / 3;
- Stage 1 Baseline run versus Baseline interpretation;
- Stage 3 company-measurement / funding-measurement / comparison subphases;
- post-SQL result-inspection handoffs before verification.

Whether each of those is an individually addressable history node or is reconstructed as part of a larger reviewable state is an implementation decision **only if** the resulting Back / Forward behavior still matches “nearest previously visited learner state” and does not skip learner-significant visited material unpredictably.

This mapping does not authorize a lossy implementation that stores only `state.current` where additional substates / beat indices are required to reproduce what the learner actually visited.

### 9.3 Retry / Redo boundary

No mapped historical review state becomes editable merely because the learner navigates Back. Retry / Redo remains a separate course need with unresolved reset semantics. No runtime work in this transition-mapping task may infer a reset contract.

## 10. Chapter-navigation mapping and current authority mismatch

The general control rule is clear: available chapters / encounters use stable `SHELL` navigation, can be switched directly without completing the current encounter, and chapter selection does not itself mutate evidence.

However, the current authority and baseline are not fully aligned:

- `course-controls.md` explicitly describes the “currently implemented course surface” as exposing two encounters in chapter navigation: the existing media-coverage encounter and the funding-participation row-multiplication encounter.
- `main@bd9ff8a3` already exposes a third descriptive chapter, the INNER JOIN zero-match encounter.
- This mapping is explicitly Stage 1–3 and therefore cannot pretend Stage 3 is absent; equally, it cannot silently amend `course-controls.md` by inference.

**Classification: CANON CLARIFICATION REQUIRED before any new shell-navigation implementation / refactor.**

The current descriptive-title naming pattern itself is consistent with the control rule against mixing `Stage N` and descriptive encounter labels.

## 11. Show-solution mapping and current ownership issue

The course-level rule is unambiguous:

- Show solution is SQL-workspace-local, not a shell control;
- it appears only during active SQL authoring with a concrete solution;
- it populates the active editor with the complete solution;
- it does not execute SQL, complete evidence, or bypass verification;
- it disappears outside active authoring.

The shared baseline `src/main.js` implements editor-population behavior. Stage 2 records assistance provenance without redefining the action.

Stage 3 still contains an encounter-local legacy solution-panel handler describing a separate panel / non-insertion behavior. The shared main handler currently stops immediate propagation, so the stale handler does not define the observed shared click path, but its continued presence creates competing ownership contrary to the single-ownership rule in the updated visual language.

**Classification: CONFORMANCE DEFECT TO REMOVE / RECONCILE when runtime work is later authorized.**

No Stage 3 Show-solution runtime change is made by this mapping.

## 12. Cross-stage equivalence matrix

| Learner role | Stage 1 | Stage 2 | Stage 3 | Course-wide target pattern |
|---|---|---|---|---|
| Relation identification | Required | Required reuse checkpoint | Required reuse | `RESPONSE` + `LIVE` + evolving `WORKING`; correction local to relation task |
| Direct Working-Schema field selection | First-exposure connection reasoning | Reused connection reasoning | Reused connection reasoning | Prompt can orient from `RESPONSE`, but field selection + check + object-specific correction are owned locally by `WORKING` |
| Grain | First concept introduction | Reused | Reused | Ordinary response anchor; established schema is reference, not answer source |
| Cardinality | First concept introduction | Reused | Reused including `0..M` possibility | Ordinary response anchor using established relationship; annotation after reasoning |
| Prepared SQL measurement | Baseline count | None | Two evidence-generation queries | `TOOL` becomes primary only for the measurement phase; immediate interpretation stays evidence-local |
| Prediction | Baseline + one-match preservation | Grain + Cardinality → multiplication | Learner-generated zero-match evidence → survival | Response unit stays local to the premises / evidence it interprets; no answer revealed before prediction |
| Concept / teacher instruction | JOIN first teaching, three progressive beats | Row-multiplication Concept Moment after learner prediction | Row-survival Concept consequence after prediction | Teacher / concept role visually distinct from task and success; no co-primary overload |
| SQL authoring | First JOIN | Reused JOIN | Reused INNER JOIN | Shared authoring choreography; editor primary, Working Schema secondary, local assistance consistent |
| Accepted result | 18 rows | 72 rows + derived 1003 slice | 26 rows + zero-match absence | Result becomes evidence; editor relinquishes authoring prominence |
| Verification | Result Grain / prediction | Repeated context and distinct participation rows | Absence / entity coverage | Keep result evidence adjacent; correction owned by verification |
| Completion | After final verification | After final verification | After coverage conclusion | Completion is state, not substitute for evidence |

## 13. Mapping findings / gates before runtime

### M-01 — Stage 1 Working-Schema interaction locality

**Finding:** direct field selection is in `WORKING`, while check / correction currently live in `RESPONSE`.  
**Target:** use the Stage 2 object-local pattern or an equivalent shared pattern; do not redesign the pedagogy.  
**Classification:** CONFORMANCE.

### M-02 — Stage 3 Working-Schema interaction locality

**Finding:** same split ownership as Stage 1.  
**Target:** same shared object-local role as Stage 2.  
**Classification:** CONFORMANCE.

### M-03 — Stage 3 chapter-selector authority coverage

**Finding:** baseline has a third chapter; `course-controls.md` still enumerates only two for the current surface.  
**Target:** authority clarification before new shell-navigation work.  
**Classification:** CANON CLARIFICATION REQUIRED.

### M-04 — Stage 3 stale Show-solution ownership

**Finding:** shared editor-population behavior coexists with encounter-local legacy panel code.  
**Target:** one shared owner consistent with `course-controls.md`; preserve encounter-local provenance only where needed.  
**Classification:** CONFORMANCE.

### M-05 — Back / Forward history representation

**Finding:** semantics are established; technical history representation is not. Several learner-visible states contain internal substate (teaching beat, measurement phase, pending result handoff).  
**Target:** implementation must preserve enough visited-state information to review / traverse actual visited learner states without mutation. It must not assume `state.current` alone is always sufficient.  
**Classification:** IMPLEMENTATION DESIGN REQUIRED, bounded by current control semantics.

### M-06 — Retry / Redo

**Finding:** need is established but reset / invalidation semantics remain OPEN.  
**Target:** no Retry / Redo behavior implemented as part of transition work until authority resolves the reset contract.  
**Classification:** OPEN / BLOCKED FOR IMPLEMENTATION.

## 14. Review checklist for this mapping

The review must verify, independently from the mapping tables where possible, that:

1. every authority-required Stage 1, Stage 2, and Stage 3 reasoning / teaching / tool / evidence transition is present;
2. internal material substates that change learner focus are not hidden merely because runtime reuses one high-level state id;
3. each transition records response location, tool/evidence locality, feedback ownership, local progression, Working Schema role, Completed Steps role, and handoff justification;
4. no mapping row silently changes learner evidence, pedagogy, validators, hints, solution semantics, or completion;
5. course-shell controls remain separate from local progression;
6. the mapping does not invent Retry / Redo reset semantics;
7. the Stage 3 chapter-navigation mismatch is surfaced rather than inferred away;
8. the Stage 1 / Stage 3 object-locality defects are correctly distinguished from Stage 2’s conforming pattern;
9. the Stage 3 Show-solution ownership issue is treated as runtime conformance, not a pedagogical redesign;
10. the mapping uses only current baseline implementation at or after `bd9ff8a3`, with no historical runtime used as authority.

Until that review is recorded, **runtime changes remain prohibited by this task boundary**.
