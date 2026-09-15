# Course Experience Improvement Work Management

**Status:** WORKING  
**Role:** Program A / A3 — Learning Experience & Runtime initiative work-management record

This document manages improvement work for the **existing implemented course experience**.

It is management state, not pedagogical, visual, Stage, control, schema, data, process, execution, review, or validation authority. Authority remains in the appropriate current-source documents.

## 1. Initiative purpose

Improve the learner experience of the existing Stage 1–3 course without treating experience work as an automatic curriculum redesign.

Potential work includes orientation, walkthrough continuity, visual focus, interaction support, feedback, course-shell navigation, and related learner-experience concerns where current evidence justifies them.

Implementation must not silently change established pedagogy, learner evidence, Stage sequence, SQL semantics, or OPEN course-level decisions.

## 2. Current runtime baseline

The current default branch contains three implemented encounters in one shared SQL Lab runtime:

- Media coverage / first JOIN — `news_article → news_source`;
- Funding participation / row multiplication — `funding_round → round_investment`;
- INNER JOIN unmatched / zero-match coverage — `company → funding_round`.

Current default-branch authority and runtime are controlling. Earlier initiative-launch branches are historical baselines only.

## 3. Canon-impact classification

### `CONFORMANCE`
Current authority already requires the behavior or principle. Work corrects implementation/content toward that authority.

### `IMPLEMENTATION CHOICE`
Current authority permits the treatment and leaves the exact implementation open.

### `CANON DECISION REQUIRED`
The proposed change would establish behavior, pedagogy, control semantics, or learner contract that is currently OPEN or not established. Stop implementation until authority is updated.

### `POTENTIAL CONFLICT`
The proposed treatment may contradict authority, leak an answer, weaken evidence, narrow accepted correctness, or otherwise alter an established instructional function. Reconcile before implementation.

## 4. Completed category — Teacher voice / Walkthrough

**Status:** COMPLETE

The category is closed through Wave 5B decision gating.

### Wave 1 — Existing-authority conformance calibration
**Status:** COMPLETE

Stage 1 was calibrated and the accepted pattern propagated to Stage 2/3. Scope included spatial guidance, meaningful handoffs, active reuse of established reasoning, active-area focus, and visual-role consistency without changing learner evidence or Stage sequence.

### Wave 2 — Consistent teacher voice and continuity
**Status:** COMPLETE

Teacher-guidance continuity was calibrated and selectively propagated across Stage 1–3 without changing questions, validators, SQL behavior, sequence, progress semantics, or adaptive behavior.

### Wave 3 — Visual support and motion polish
**Status:** COMPLETE

Shared learner-facing visual-role treatments were consolidated where roles were equivalent, Stage 3 post-SQL evidence-role drift was corrected, and `prefers-reduced-motion` support was added for existing non-essential transitions.

### Wave 4 — Diagnostic feedback
**Status:** COMPLETE

Decision record:

`course-design/audits/wave-4-diagnostic-feedback-decision-gate-2026-09-15.md`

Current runtime includes the approved state-aware relation-selection diagnostics, successful-SQL semantic-result diagnostics across Stage 1–3, and the approved Stage 1 final-verification response-aware diagnostic.

Wave 4 did not authorize a generalized diagnostic engine, attempt-count escalation, adaptive assistance, new progress semantics, or new learner evidence.

### Wave 5A — Narrow response-aware corrective feedback
**Status:** COMPLETE

Decision record:

`course-design/wave-5a-response-aware-feedback-decision-2026-09-15.md`

The approved narrow response-aware mappings were implemented for six existing Stage 2/3 interactions. The no-selection fallback regression was corrected, and post-build review returned PASS.

### Wave 5B — Graduated / adaptive assistance
**Status:** DECISION GATE COMPLETE — IMPLEMENTATION NOT AUTHORIZED

Decision record:

`course-design/wave-5b-adaptive-assistance-decision-gate-2026-09-15.md`

The gate found insufficient evidence for attempt-based or adaptive escalation after current first-line support. Reopening requires new evidence of a repeatable failure mode that persists after current correction/assistance.

## 5. Current category — Orientation & progress

**Status:** ACTIVE — FIRST SCOPE MAPPED; IMPLEMENTATION NEXT

Category-selection and mapping record:

`course-design/orientation-progress-category-selection-2026-09-16.md`

### Why this category is active

Current `course-design/course-controls.md` already requires Back / Forward journey-history navigation inside the active encounter, while the current runtime implements chapter navigation but no Back / Forward history controls or visited-state review cursor.

This is therefore a direct **CONFORMANCE** gap, not a request to invent a generic progress system.

### First bounded scope

**Back / Forward journey-history conformance**

Required boundary:

- stable course-shell Back / Forward controls;
- within the active encounter only;
- Back reviews already visited states without mutating answers/evidence/progress;
- Forward traverses only visited history back toward the existing progression frontier;
- no new progress through Back / Forward;
- per-encounter history remains isolated across chapter switches;
- Completed Steps remain review history and do not substitute for Back / Forward;
- exact shell styling/placement remains an implementation choice within current visual/control authority.

The mapping explicitly separates the progression frontier from the review cursor as an implementation invariant while leaving the technical data structure open.

### Explicitly not part of the first scope

- Retry / Redo implementation or reset semantics;
- historical-answer editing;
- undo/branching;
- progress percentage / progress bar / step counter;
- chapter completion locking;
- cross-chapter Back / Forward;
- cross-session journey-history persistence;
- browser-history integration;
- new attempt tracking;
- new pedagogy or learner evidence.

## 6. Current next action

**Implement the bounded Back / Forward journey-history conformance scope from `course-design/orientation-progress-category-selection-2026-09-16.md`.**

Implementation must use current:

- `course-design/course-controls.md`;
- `course-design/course-visual-language.md`;
- Stage 1–3 encounter authority;
- current runtime as the baseline to preserve.

The implementation should prefer one shared course-shell/history owner with encounter-specific adaptation only where the existing state models require it. It must not become a generalized state-management rewrite.

After implementation, review the actual commit/diff and exercise Back / Forward across ordinary reasoning, Working-Schema interaction, measurement/evidence, SQL, Results/verification, completion, and chapter switching.

## 7. Later improvement-category queue

Remain unselected after the current first scope:

- cross-chapter consistency;
- further orientation & progress work beyond Back / Forward;
- spatial guidance beyond current narrow needs;
- visual language & focus beyond current narrow needs;
- motion & transitions beyond current narrow needs;
- pedagogical structure / interaction depth;
- localization / Hebrew + RTL.

Hebrew / RTL localization remains **DEFERRED** as a separate later category.

Queue order does not determine priority. Each later selection requires current evidence.

## 8. Authority boundary

Use the appropriate current source when a change requires authority, including:

- `pedagogical-foundations.md` for course-level pedagogical foundations;
- `course-design/course-visual-language.md` for visual-language authority;
- `course-design/course-controls.md` for course-shell/control semantics;
- the relevant Stage authority for encounter-local instructional requirements.

If implementation exposes a material issue not settled by those sources, classify it rather than resolving it silently in code.