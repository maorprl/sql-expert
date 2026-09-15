# Orientation & Progress — category selection and first-scope mapping

**Date:** 2026-09-16  
**Status:** CATEGORY SELECTED — FIRST CONFORMANCE SCOPE MAPPED — RUNTIME CHANGE NOT PART OF THIS DECISION  
**Baseline:** current `main` after repository truth repair and Wave 5B closure

## 1. Decision

The next evidence-backed learner-experience category is:

**Orientation & progress**

The first bounded scope inside that category is:

**course-shell Back / Forward journey-history navigation conformance**

This decision does not authorize a generic progress system, progress bar, Retry / Redo semantics, cross-session persistence, adaptive support, chapter locking, or encounter redesign.

## 2. Why this category is selected

The selection is evidence-based rather than queue-order based.

Current authority already establishes a concrete learner need that is not implemented:

- `course-design/course-controls.md` requires clear **Back** and **Forward** controls inside the currently active encounter;
- Back must move to previously visited learner states for review without erasing evidence, changing answers, clearing assistance provenance, clearing editor/result state, or changing completion/progress state;
- Forward must traverse only already visited history toward the current progression frontier and must never create new progress or bypass required learner actions;
- Back / Forward are explicitly distinct from chapter navigation, local `Continue`, Completed Steps, and Retry / Redo;
- `course-design/course-visual-language.md` requires global course controls to live in a stable course-shell layer and explicitly states that Completed Steps are review history, not the primary navigation mechanism.

The current runtime implements chapter navigation for the three encounters in `src/main.js` and styles it in `src/course-navigation.css`, but it does not implement course-shell Back / Forward controls or a journey-history navigation layer.

`src/interaction-lifecycle.js` currently manages only the current interaction and Completed Steps presentation. It does not provide a separate visited-state history cursor or review-navigation contract.

Therefore the gap is a direct **CONFORMANCE** gap between established course-control authority and observable runtime structure.

## 3. Comparison with the remaining category queue

### Cross-chapter consistency

Not selected first.

Recent Stage 1–3 topology work, teacher-voice propagation, visual-role consolidation, diagnostic-feedback propagation, and post-build topology review already addressed multiple cross-chapter consistency defects. No comparably clear new cross-chapter inconsistency is currently established as a stronger unresolved defect than the missing Back / Forward control contract.

### Spatial guidance beyond current narrow needs

Not selected first.

The Stage 1–3 topology mapping, target decision, review, implementation, and post-build review already closed the known spatial-ownership defects. Reopening spatial work without new evidence would duplicate recently completed work.

### Visual language & focus beyond current narrow needs

Not selected first.

Visual focus, teacher-guidance role, persistent references, SQL/result prominence, and cross-stage topology have already received recent calibration and review. No current source establishes a stronger unresolved visual-focus defect than the missing required journey navigation.

### Motion & transitions beyond current narrow needs

Not selected first.

Wave 3 already addressed existing transition polish and `prefers-reduced-motion` behavior. No new motion-specific failure is currently established.

### Pedagogical structure / interaction depth

Not selected first.

This category may contain future work, but selecting it now would require a new pedagogical diagnosis. The Back / Forward gap is already established by current authority and does not require inventing new pedagogy.

### Localization / Hebrew + RTL

Not selected first.

It remains explicitly deferred as a separate later category.

## 4. Canon-impact classification

### Back / Forward existence and role

**CONFORMANCE**

The controls and their core semantics already exist in `course-design/course-controls.md`.

### Exact shell placement, labels, icons, spacing, and responsive treatment

**IMPLEMENTATION CHOICE**

These details remain open within the stable course-shell role established by `course-controls.md` and `course-visual-language.md`.

### Retry / Redo behavior

**CANON DECISION REQUIRED before implementation**

The need for Retry / Redo is established, but reset scope and downstream invalidation semantics remain explicitly OPEN. Retry / Redo must not be bundled into the Back / Forward conformance implementation.

### Progress bar, percentage, step counter, completion meter, or chapter-locking system

**NOT ESTABLISHED / OUT OF CURRENT SCOPE**

No current authority requires such a system. The category name `Orientation & progress` is not permission to invent progress semantics.

### Cross-session journey-history persistence

**OPEN / OUT OF CURRENT SCOPE**

Current authority establishes within-session history navigation but leaves persistence across reloads or browser sessions open.

## 5. First-scope behavioral contract

The first implementation scope must satisfy the following existing authority without expanding it.

### 5.1 Stable course-shell controls

Back and Forward belong to the persistent course shell, visually separate from Stage-local actions such as `Check answer`, `Continue`, and `Run query`.

They must remain subordinate to the active learner task and should not move between page regions as the encounter state changes.

### 5.2 Per-encounter history

Back / Forward operate only inside the active encounter.

Each encounter therefore needs its own visited-state history position. Switching chapters must not cause Back / Forward to traverse into another encounter.

### 5.3 Progression frontier versus review cursor

The implementation must distinguish:

- the learner's **progression frontier** — the furthest state legitimately reached through normal pedagogical actions;
- the **review cursor** — which already visited state is currently being inspected through Back / Forward.

Moving the review cursor must not alter the progression frontier.

This separation is an implementation invariant required by the established non-mutating review semantics; it does not prescribe a particular data structure.

### 5.4 Back behavior

Back moves to the nearest previously visited state in the active encounter.

Review through Back must not by itself:

- change recorded answers;
- remove completed evidence;
- clear assistance provenance;
- clear SQL editor contents;
- clear produced results;
- reset selected relations or other established learner state;
- change stage completion;
- create a new attempt.

The reviewed state must be visibly understandable as review rather than the active progression frontier.

### 5.5 Forward behavior

Forward is available only after moving backward through already visited history.

It advances only through visited states toward the existing progression frontier.

It must never:

- enter an unvisited state;
- perform `Continue` automatically;
- bypass an unanswered question or evidence gate;
- run SQL;
- mark evidence complete;
- reveal assistance that was not already part of that visited state.

At the progression frontier, Forward is unavailable.

### 5.6 Review-state interaction boundary

Back / Forward are review navigation, not editing or retry controls.

Historical learner-response controls that could mutate evidence must not become active merely because the learner navigated to an earlier state.

Where a visited state contains tools or evidence such as a prepared measurement, SQL authoring, Results, or verification, the review rendering must preserve enough of the established state to understand what happened without turning the historical surface into a new attempt.

The exact review-rendering mechanism remains an implementation choice so long as the semantics above are preserved.

### 5.7 Completed Steps remain separate

Completed Steps remain review history and may continue to provide compact review of completed reasoning.

They do not replace Back / Forward and Back / Forward must not be implemented merely as automatic opening/closing of Completed Steps.

## 6. Current runtime implications

The current runtime does not already contain a generic history-navigation layer:

- `src/main.js` creates chapter navigation and preserves encounter objects/editor/results across chapter switching;
- encounter modules maintain their own current state, completed evidence, pending transitions, drafts, selected relations, and tool/result state;
- `src/interaction-lifecycle.js` renders current and completed interactions but does not own encounter progression or visited-state history.

Therefore implementation should be mapped as shared course-shell/history behavior with encounter adapters or snapshots only where needed, rather than three unrelated Stage-local Back / Forward implementations.

This follows the current visual-language rule that course-wide behavior should have one clear shared implementation owner where practical.

The mapping does **not** require a universal serialization framework, persistence layer, route engine, or generalized state-management rewrite.

## 7. Protected behavior

A future implementation must preserve:

- all Stage 1–3 learner sequences;
- question intent and accepted answers;
- evidence timing and evidence provenance;
- relation-selection and Working Schema behavior;
- prepared measurements;
- SQL acceptance and diagnostics;
- result inspection and verification;
- Wave 4 diagnostics;
- Wave 5A response-aware feedback;
- Show solution semantics;
- chapter-navigation freedom;
- current per-encounter editor/result preservation;
- completion behavior.

Back / Forward must not become a mechanism for reopening pedagogy, reordering steps, editing historical evidence, or bypassing current local progression controls.

## 8. Required implementation validation

Before this scope can be considered complete, validation must cover all three encounters and at least the following state classes:

1. ordinary reasoning state;
2. direct Working-Schema interaction;
3. prepared measurement / evidence state where present;
4. SQL authoring;
5. result inspection / verification;
6. completed encounter;
7. chapter switch away and back with independent per-encounter history position.

For each case, verify:

- Back availability at the correct boundary;
- Forward availability only after Back;
- no traversal beyond visited history;
- no evidence or answer mutation from review navigation;
- editor/results preserved;
- chapter histories remain isolated;
- local `Continue`, `Check`, `Run query`, and `Show solution` semantics remain unchanged;
- current task remains visually primary while shell navigation remains findable and stable.

Build/tests are necessary but not sufficient; the learner journey must be exercised because the core contract is behavioral and stateful.

## 9. Out of scope

This decision does not authorize:

- Retry / Redo implementation;
- historical-answer editing;
- undo/branching semantics;
- new attempt tracking;
- progress percentages or progress bars;
- chapter completion gating;
- cross-chapter Back / Forward;
- cross-session history persistence;
- browser-history integration;
- keyboard shortcuts;
- mobile-specific redesign;
- new pedagogy, questions, evidence, hints, adaptive assistance, or Stage sequence changes.

## 10. Gate result and next action

**CATEGORY-SELECTION GATE: CLOSED**

**Selected category:** Orientation & progress  
**First scope:** Back / Forward journey-history conformance  
**Classification:** CONFORMANCE  
**Additional canon decision required for this first scope:** NO

The mapping is sufficient to hand off a bounded implementation task, provided implementation stays inside the behavioral contract and protected scope above.

A future implementation must be reviewed against this mapping plus current `course-design/course-controls.md` and `course-design/course-visual-language.md` before promotion.

No runtime file is changed by this decision record.