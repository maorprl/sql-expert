# Wave 1–5A runtime reconciliation audit

**Date:** 2026-09-16  
**Status:** COMPLETE — SOURCE/RUNTIME RECONCILIATION  
**Audit baseline:** current Stage 1–3 runtime as present on `main`, plus the validated Back/Forward test commit `46d3b1edfd7fa76e232e8f534e32ce0e1161084c`.  
**Important baseline fact:** comparing current `main` with `46d3b1e...` shows that the only runtime delta on the Back/Forward validation line is the history-navigation implementation (`index.html`, `package.json`, `scripts/history-navigation-contract.test.mjs`, `src/course-history-navigation.css`, `src/course-history-navigation.js`). The Stage 1–3 encounter files and shared course runtime are otherwise the same. Therefore this audit can assess Wave 1–5A against the current Stage runtime without attributing Stage changes to Back/Forward.

## 1. Question audited

The audit answers one narrow question:

> Did the Teacher voice / Walkthrough work from Wave 1 through Wave 5A disappear, get accidentally reverted, or remain represented in the current runtime?

This audit distinguishes four outcomes:

- **PRESERVED** — the approved runtime outcome is still present.
- **PRESERVED WITH AUTHORIZED CONSOLIDATION** — wording/implementation shape changed later, but the approved learner-facing function remains and later review explicitly accepted the change.
- **SUPERSEDED BY LATER AUTHORITY** — an earlier visual/spatial treatment was intentionally replaced by the reviewed Stage 1–3 topology. It must not be restored merely because an older Wave commit contained it.
- **MISSING / REGRESSION** — an approved outcome is absent without later authority replacing it.

## 2. Controlling later topology

A key source of confusion is that Wave 1–3 happened before the later Stage 1–3 spatial-topology correction.

The current controlling topology is:

`course-design/stage-1-3-target-topology-decision-2026-09-15.md`

with the reviewed implementation:

`db38e4e44ed0f573c5c6710fcb212ce8202080ff` — `Implement Stage 1-3 spatial topology`

and the post-build verdict:

**PASS — IMPLEMENTATION CONFORMS — STAGE 1–3 TOPOLOGY POST-BUILD GATE CLOSED**.

Its governing rule is:

> **L owns ordinary reasoning. R owns direct object interaction, active tools, produced evidence, and the immediate interpretation of that evidence.**

That later authority intentionally changed some earlier Wave 1–3 spatial/focus treatments. Those changes are not regressions if they match the reviewed topology.

### Important correction to the recent discussion

The earlier commit:

`9b8681e39c1d8ecf9893bf2bedf150d343516c40` — `Apply shared interaction locality reconciliation`

was explicitly reverted by:

`739bb73f7384cf95bf8c15656beb596df35ee126` — `Revert premature interaction locality relocation`.

It is therefore **not** current implementation authority and must not be restored wholesale.

After that revert, the course established and reviewed the more specific L/R topology above and implemented it in `db38e4e...`.

For example, Stage 1 prepared measurement / immediate interpretation is intentionally R-owned after the measurement handoff. L may show concise orientation while the actionable interpretation question, Check, feedback and Continue remain beside the evidence in R. The current screenshot pattern where L says `Interpret the measurement` while the actual evidence question is beside Results is therefore consistent with the later topology decision; it is not, by itself, evidence that Wave work was lost.

## 3. Wave-by-Wave reconciliation

### Wave 1 — Existing-authority conformance calibration

**Current management summary:** spatial guidance, meaningful handoffs, active reuse of established reasoning, active-area focus, and visual-role consistency across Stage 1–3.

**Original implementation evidence:** Stage 1 introduced state markers, explicit handoff/guidance copy, stronger SQL/Results focus, and state-based visual emphasis; the accepted pattern was propagated to Stages 2 and 3.

**Current runtime evidence:**

- encounter runtimes still set state/role classes and dataset markers used by shared focus behavior;
- Stage 1 still contains explicit guidance such as moving to the SQL Workspace for the prepared measurement, inspecting Results after execution, and comparing results with the earlier prediction;
- equivalent Stage 2/3 guidance and handoff structure remains present;
- shared course CSS still emphasizes active SQL authoring, Results/evidence, direct Working-Schema connection work, and JOIN-teaching roles.

**Later-authority change:** the broad Wave 1 treatment that visually emphasized Working Schema across `relations`, `connection`, and `cardinality` was narrowed by the reviewed topology. Relation-set identification and ordinary reasoning are L-owned; direct field selection is R-owned. Therefore the current shared focus rules emphasize the direct `connection` interaction rather than treating all ordinary reasoning states as R-primary.

**Verdict:** **PRESERVED + PARTLY SUPERSEDED BY LATER AUTHORITY**.  
No unexplained Wave 1 loss identified.

### Wave 2 — Consistent teacher voice and continuity

**Current management summary:** teacher-guidance continuity was calibrated and selectively propagated across Stage 1–3.

**Current runtime evidence:**

- Stage 1 still uses progressive JOIN-teaching guidance that changes by teaching beat and explicitly reconnects the relationship to SQL;
- Stage 2 guidance still reconnects relation selection, connection, Grain/Cardinality, multiplication prediction, repeated context and SQL/result verification;
- Stage 3 guidance still carries the learner from relationship reasoning into learner-generated zero-match evidence, prediction, SQL, result verification and coverage conclusion.

**Later-authority change:** topology work removed several Stage 2 special acknowledgement branches that existed primarily to place success/Continue content in R. The topology post-build review explicitly accepted this as a **non-blocking acknowledgement bridge consolidation**, because the learner action, evidence and sequence were preserved and destination states retained guidance continuity.

**Verdict:** **PRESERVED WITH AUTHORIZED CONSOLIDATION**.  
No unexplained Wave 2 loss identified.

### Wave 3 — Visual support and motion polish

**Current management summary:** shared visual-role treatments consolidated; Stage 3 post-SQL evidence-role drift corrected; reduced-motion support added.

**Current runtime evidence:**

- `src/styles.css` contains shared cross-stage focus rules for direct Working-Schema connection work, SQL implementation, Results/evidence and JOIN teaching;
- SQL authoring remains visually primary in R while Working Schema is secondary;
- Results/evidence receives dedicated shared emphasis;
- Stage 3 verification remains R-local with Results rather than jumping to L;
- `@media (prefers-reduced-motion: reduce)` remains present.

**Later-authority change:** some earlier Wave 3 focus rules for ordinary reasoning were intentionally removed/reframed by the later topology so that visual ownership follows L/R role rather than encounter/state name alone.

**Verdict:** **PRESERVED + PARTLY SUPERSEDED BY LATER AUTHORITY**.  
No unexplained Wave 3 loss identified.

### Wave 4 — Diagnostic feedback

**Approved/current management outcome:** state-aware relation-selection diagnostics; semantic-result SQL diagnostics across all three stages; Stage 1 final-verification response-aware diagnostic.

**Current runtime evidence:**

- Stage 1 still contains `relationSelectionFeedback()` and the Stage 1 semantic result validator/diagnostic path;
- Stage 2 still contains `relationSelectionFeedback()` and `participationDiagnosticFeedback()` with distinct missing-relationship, output-contract, row-count and row-association diagnostics;
- Stage 3 still contains `relationSelectionFeedback()` and the equivalent funding-round result diagnostic path;
- Stage 1 final verification still gives distinct correction for `source-grain` versus `multiplied` wrong responses.

**Verdict:** **PRESERVED**.  
No Wave 4 loss identified.

### Wave 5A — Narrow response-aware corrective feedback

**Approved scope:** exactly six existing high-diagnostic-value interactions — three in Stage 2 and three in Stage 3 — with misconception-specific feedback selected by the already-existing wrong option value.

**Current runtime evidence:**

Stage 2:

1. multiplication prediction still branches `one-row`, `collapse`, `round-grain` to the approved distinct corrections;
2. repeated-context prediction still branches `duplicates`, `first-only`, `different-rounds`;
3. final `funding_round_id = 1003` verification still branches `duplicates`, `different-rounds`, `one-participation`.

Stage 3:

4. zero-match prediction still branches `preserved` and `error`;
5. post-SQL verification still branches `present` and `count-proves-coverage`;
6. final coverage conclusion still branches `yes-count` and `yes-grain`.

The no-selection/default-feedback regression fix also remains in the current Stage 2/3 incorrect-answer dispatch through the generic fallback path.

**Verdict:** **PRESERVED**.  
No Wave 5A loss identified.

## 4. Revert / rollback review

Repository history contains a small number of explicit revert commits relevant to this period.

The one most likely to be confused with lost Wave work is:

- `739bb73...` — `Revert premature interaction locality relocation`.

That revert intentionally removed an implementation that had been applied before the spatial authority was settled. It was followed by a new topology authority, review, implementation and post-build PASS. It is therefore not evidence that all Wave work was accidentally discarded.

The other reviewed revert commits in this period concern:

- removal of an unapproved earlier unified visual layer/import;
- reversal of an incorrect Stage 1–3 transition-mapping draft and its review.

No evidence was found that Wave 4 or Wave 5A runtime behavior was reverted after its accepted implementation.

## 5. Why the site can look "almost unchanged"

The current visual impression is compatible with the source history for three reasons:

1. **Wave 4 and Wave 5A are conditional.** Their changes appear mainly after wrong selections, semantically wrong SQL/results, or specific misconceptions. A successful happy-path walkthrough will not display most of them.
2. **Wave 2 is mostly continuity/guidance.** It changes teacher voice and handoffs more than page structure.
3. **Wave 1/3 visual emphasis was later normalized by topology.** The later reviewed L/R model intentionally removed some earlier broad state-based emphasis and replaced it with role-based ownership. This makes the final course less visually different from the pre-Wave layout than some intermediate Wave screenshots were.

Therefore visual similarity alone is not evidence that the Wave work vanished.

## 6. Finding on the current `Current Step` / evidence split

The current Stage 1 Baseline Interpretation pattern is:

- L: orientation / guidance (`Interpret the measurement` context);
- R: produced result + actionable interpretation question + Check/feedback/Continue.

That matches the current topology authority and its post-build PASS.

However, the learner-facing label `Current Step` on the L orientation card can still create a **UX ambiguity** when the actual actionable question is in R. This is a separate issue from Wave preservation.

Classification:

**NEW UX OBSERVATION — NOT A WAVE REGRESSION; NOT AUTHORIZED FOR SILENT RUNTIME CHANGE BY THIS AUDIT.**

If addressed later, it should be evaluated against the current topology rather than by restoring the reverted `interaction-locality.css` implementation.

## 7. Overall verdict

### Wave preservation

- Wave 1: **PRESERVED / PARTLY SUPERSEDED BY LATER AUTHORITY**
- Wave 2: **PRESERVED WITH AUTHORIZED CONSOLIDATION**
- Wave 3: **PRESERVED / PARTLY SUPERSEDED BY LATER AUTHORITY**
- Wave 4: **PRESERVED**
- Wave 5A: **PRESERVED**

### Missing approved Wave outcomes

**NONE IDENTIFIED in the source/runtime reconciliation.**

This is not a claim that the current UX has no problems. It means the evidence does **not** support the fear that the Teacher voice / Walkthrough Waves 1–5A were broadly erased.

## 8. Next action

Do **not** restore old Wave CSS or the reverted `interaction-locality.css` wholesale.

The safe next step is:

1. treat the current reviewed Stage 1–3 topology as controlling;
2. keep Wave 4/5A behavior intact;
3. keep the already-validated Back/Forward implementation separate until reconciliation/promotion;
4. if the `Current Step` / R-action labeling still feels confusing in browser review, map that as a narrow current-topology UX issue rather than as Wave restoration work.

No runtime change is authorized by this audit itself.
