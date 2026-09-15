# Cycle 1 Owner-Directed Implementation Record — Participation Row Multiplication

**Date:** 2026-09-13  
**Status:** IMPLEMENTED UNDER OWNER-DIRECTED TARGETED WAIVER — RUNTIME RECONSTRUCTION APPLIED  
**Authority:**
- `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-and-waiver-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-structural-reuse-2026-09-13.md`
- `course-design/production/cycle-1/test-drive-finding-connection-focus-2026-09-13.md`
- `course-design/production/cycle-1/authority-clarification-show-solution-sql-workspace-2026-09-13.md`
- `course-design/course-visual-language.md`
- `course-design/course-controls.md`

## Runtime boundary

The participation-row-multiplication encounter remains a separate encounter in the same SQL Lab runtime. It does not replace or redesign the validated Stage 1 learner sequence.

Stage 1 remains the visual/interaction calibration specimen. This reconstruction does not modify `src/stage1.js` or `src/stage1.css`.

The shared runtime continues to provide the SQLite database, Live Schema, editor, result renderer, interaction lifecycle, chapter navigation, and per-encounter editor/result retention.

## Why the reconstruction was required

Runtime test driving exposed that the Cycle 1 learner logic had evolved while its visual representation still relied on a separate Cycle 1 component grammar. The result mixed current pedagogy with stale composition patterns: co-primary bordered surfaces, completed work competing with the current task, fixed Working Schema prominence, distant action controls, and learner-facing guidance that sometimes described curriculum/evidence mechanics rather than the current problem.

The corrective boundary is therefore not a cosmetic CSS patch. The Row multiplication encounter is now rendered as one coherent state machine whose visual rank changes with the learner's current activity, using Stage 1 as the calibration specimen and `course-visual-language.md` as authority.

The former wrapper/core split and its entry-only styling layer are no longer part of the active implementation. `src/cycle1-core.js` and `src/cycle1-entry.css` were removed because the reconstructed `src/cycle1.js` now owns the complete encounter flow directly.

## Structural reuse correction

The governing rule remains:

> **Previously learned does not mean pre-resolved.**

The encounter therefore begins with learner-performed reuse actions:

1. Working Schema starts empty.
2. Learner selects `funding_round` and `round_investment` from Live Schema.
3. Learner identifies `round_investment.funding_round_id` as the participation field that identifies its funding round.
4. Only then are the PK/FK badges and connector revealed.
5. Learner establishes requested participation Grain.
6. Learner interprets Cardinality from the established relationship.
7. Only after the correct Cardinality judgment is the `M : 1` visual annotation shown for the displayed `round_investment → funding_round` orientation.

Relation selection and direct-connection reading remain reuse checkpoints rather than new Concept Moments.

## Current learner flow

The implemented path is:

1. identify the two relevant relations;
2. identify the participation → funding-round connection field;
3. establish target Grain = one recorded participation per result row;
4. interpret the relationship as many participations belonging to one funding round;
5. qualitatively predict, without a supplied child count, that one funding round can occupy several participation-level result rows;
6. predict that round-level context may repeat across those distinct participation rows without making them duplicates;
7. only then name **JOIN row multiplication** and show a local explanatory mechanism;
8. apply the established prediction to the concrete `3 participations → 3 result rows` case;
9. author the six-field direct INNER JOIN;
10. inspect the actual 72-row result;
11. inspect the actual `funding_round_id = 1003` slice adjacent to the final verification question;
12. verify that the four rows are distinct participation rows for one funding round and that the repeated round context matches the earlier prediction;
13. close with a concise relational synthesis.

## Visual / interaction choreography

The reconstruction applies the current course visual-language rules state by state:

- **Relation selection:** the current reasoning question and empty/evolving Working Schema are the active surfaces.
- **Connecting field:** `round_investment` is visually primary; `funding_round` stays available as a quieter reference; the selected-column status and confirmation control live with the Working Schema action.
- **Grain / Cardinality:** the current question leads; the established schema becomes a secondary working reference rather than a co-primary task.
- **Prediction:** only the already-established Grain and relationship are shown as a compact premise strip; old nested micro-evidence cards are removed.
- **Concept Moment:** JOIN row multiplication is presented only after the learner's two qualitative predictions and as the single learning-accent surface for that transition.
- **SQL authoring:** task + compact Working Schema form the reference side while the editor becomes the primary action surface, following the Stage 1 authoring composition.
- **Post-execution:** the actual SQL result becomes the primary evidence surface and the inactive editor disappears.
- **Verification:** the actual 1003 result slice and the verification interaction stay together in one evidence-local action surface.
- **Completion:** the SQL workspace is no longer active; the encounter closes with the relational conclusion rather than curriculum-management or scope-exclusion language.

Completed work remains collapsed, reviewable, and secondary to the current learner activity.

## Teacher voice correction

Learner-facing guidance is now grounded in the current data/business problem. Internal curriculum language such as "reuse Stage 1", "core evidence", "supporting evidence", and explanations of why a step counts as evidence are not used as learner guidance.

Examples of the current voice include:

> The request says “for every recorded round-investor participation.” Use that phrase to decide what one output row should represent.

and:

> You found how a participation points to its funding round. Now read that relationship in both directions.

## Show solution

`Show solution` remains SQL-authoring assistance only. It is attached to the SQL editor controls, absent in pre-SQL reasoning and post-SQL verification states, and does not insert SQL, execute SQL, complete evidence, or bypass verification.

## SQL / result contract

A valid learner query must return these logical columns:

`funding_round_id | round_type | announced_date | round_investment_id | investor_id | is_lead`

The current result must contain all 72 participation rows exactly once with correct funding-round context. Equivalent direct INNER JOIN formulations may start from either relation. Aggregation, DISTINCT, LEFT JOIN, EXISTS, and substitute repair mechanisms are rejected for this encounter.

The final `funding_round_id = 1003` slice is derived from the learner's accepted result rather than from a separately hard-coded answer table.

## Evidence safeguards

- PK/FK is not exposed before the learner identifies the connecting participation field.
- Cardinality notation is not shown before the Cardinality judgment.
- No numerical multiplicity, multiplication conclusion, row-multiplication visual, SQL output, or 1003 slice is shown before the qualitative prediction.
- The repeated-context / non-duplicate judgment is resolved before the Concept Moment.
- SQL remains unavailable until the prediction and concrete application are complete.
- A valid SQL run reports/retains actual result evidence but does not answer the final interpretation for the learner.
- Final verification remains dependent on the actual 1003 rows.
- Assistance provenance remains represented in completed evidence where assistance applies.

## Runtime files after reconstruction

- `index.html` — unchanged shared shell.
- `src/stage1.js` — unchanged by this reconstruction.
- `src/stage1.css` — unchanged by this reconstruction and used as the calibration visual language.
- `src/main.js` — unchanged by this reconstruction; continues to orchestrate encounters and shared runtime surfaces.
- `src/course-navigation.css` — unchanged; retains chapter navigation and SQL-local `Show solution` visibility.
- `src/cycle1.js` — complete Row multiplication learner-state implementation; no wrapper/core delegation or MutationObserver copy patching.
- `src/cycle1.css` — Cycle 1-local state choreography aligned to the Stage 1 calibration language.

Obsolete runtime layers removed by the reconstruction:

- `src/cycle1-core.js`
- `src/cycle1-entry.css`

## Validation performed for the reconstruction

The reconstruction was developed on a separate branch before integration.

Available self-validation included:

- `node --check` on the reconstructed `src/cycle1.js` source used for the rebuild;
- CSS parsing of the reconstructed local stylesheet with no parser errors;
- static state/reveal-order assertions covering relation selection, connection gating, PK/FK reveal, Cardinality gating, qualitative prediction before Concept Moment, concrete application before SQL, SQL-only solution availability, result state after valid SQL, 1003 verification locality, and absence of the superseded wrapper/core imports and old micro-evidence component grammar;
- repository comparison confirming that the reconstruction does not modify `src/stage1.js` or `src/stage1.css`;
- retention of the runtime-derived semantic SQL comparison and actual-result-derived 1003 slice.

A full browser/runtime test could not be completed in the available execution environment. Headless browser execution was not usable there, and repository package/network installation was unavailable. Browser learner test drive therefore remains the next empirical runtime check after integration.

No formal Pedagogy, UX, Architect Reconciliation, or Auditor Pre-Build rerun was performed for this owner-directed runtime reconstruction, and none is claimed here.

---

## 2026-09-15 conformance-restoration addendum

During the reopened Wave 4 diagnostic-feedback mapping, the current default-branch `src/funding-participation.js` was found to have drifted from the owner-directed learner path documented above. The drift was treated as an encounter-conformance defect, not as a Wave 4 feedback-design decision.

### Drift found

The runtime had reintroduced or substituted states that were not part of the controlling owner-directed path, including:

- a prepared `COUNT(*) FROM funding_round` Baseline;
- Cardinality before the required target-Grain checkpoint;
- one combined multiplication prediction that named the Concept Moment immediately;
- a separate semantic-operation question;
- a three-beat JOIN teaching sequence;
- no distinct repeated-context / non-duplicate prediction before the Concept Moment;
- no supporting concrete `3 participations → 3 rows` application after the Concept Moment;
- final verification that referred to `funding_round_id = 1003` without rendering a local slice derived from the learner's accepted result.

### Runtime correction applied

The current `src/funding-participation.js` / `src/funding-participation.css` path now restores the controlling sequence:

1. relation identification;
2. connecting-field identification with `round_investment` as the active Working Schema relation and the confirmation action kept with that surface;
3. target Grain;
4. Cardinality;
5. qualitative row-multiplication prediction with no supplied numeric child count;
6. repeated round-context / non-duplicate prediction;
7. **JOIN row multiplication** Concept Moment;
8. supporting `3 participations → 3 participation-grain rows` application;
9. learner-authored six-field JOIN;
10. accepted 72-row result;
11. a `funding_round_id = 1003` slice derived from the learner's accepted result;
12. final verification against those actual rows;
13. completion synthesis.

The previously reintroduced Baseline, semantic-operation checkpoint, and separate JOIN-teaching sequence are no longer part of the Stage 2 runtime.

The SQL semantic acceptance contract is unchanged. Existing internal guards remain acceptance guards and are not promoted into learner-facing teaching categories by this correction.

### Show solution clarification in the current runtime

The historical paragraph above stating that `Show solution` "does not insert SQL" is superseded by `authority-clarification-show-solution-sql-workspace-2026-09-13.md`.

The shared runtime already populates the active editor with the complete solution while SQL authoring is active. The Stage 2-local obsolete solution-panel handler is no longer used. Stage 2 now records that `Show solution` assistance was used and preserves that provenance in the completed SQL evidence after a successful run. Activating the control still does not execute SQL, complete the SQL evidence by itself, or bypass final verification.

### Current runtime file names

The current default-branch encounter module is `src/funding-participation.js` with local styling in `src/funding-participation.css`. References earlier in this historical record to `src/cycle1.js` / `src/cycle1.css` describe the earlier reconstruction state and are superseded for the current runtime by this addendum.

### Validation for this conformance restoration

Validation available in the current execution environment:

- `node --check` passed for the rewritten Stage 2 module before commit;
- static assertions confirmed that `baselineRun`, `operation`, `joinTeaching`, `BASELINE_SQL`, and the obsolete local solution-panel handler are absent from the corrected module;
- static assertions confirmed the required Grain → Cardinality → qualitative prediction → repeated-context prediction → Concept Moment → concrete application → SQL → 1003 verification states are present;
- the 1003 verification slice is derived from the accepted learner result stored after semantic validation;
- the committed GitHub source was fetched again after update to verify the rewritten module is present on the current default branch.

A full production build / browser learner journey is **not claimed** for this correction. The available container could not resolve `github.com`, so repository cloning / package-backed runtime validation could not be performed there.
