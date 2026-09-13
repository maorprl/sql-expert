# Cycle 1 — One-Time Owner Ad Hoc Corrective Authorization

**Date:** 2026-09-13  
**Status:** CURRENT ONE-TIME OWNER AUTHORIZATION — IMPLEMENTED, RUNTIME VISUAL CLOSURE PENDING  
**Scope:** Funding participation only  
**Precedent:** NONE

## Purpose

The Course Authority Owner authorizes a one-time corrective action for the current Funding participation learner encounter.

This authorization does **not** amend `learner-encounter-production-process.md`, does not create a new process phase, does not establish a reusable corrective route, and must not be cited as precedent for another encounter or cycle.

The purpose is to correct a fixed set of already-observed learner-journey defects without reopening the accepted capability, accepted case, Case Validation, Lightweight Pedagogy Gate, or unaffected parts of Cycle 1.

## Fixed corrective scope

Only the following seven corrections are authorized:

1. **Business request** — replace schema-like framing with a natural analytical request that does not pre-answer result Grain.
2. **Baseline** — add a compact one-side `funding_round` measurement before the qualitative row-multiplication prediction; it is orientation/supporting evidence, not core evidence and not a SQL authorship test.
3. **Thin JOIN bridge** — add a short normal-path reuse bridge from established relational reasoning to the previously learned `SELECT` / `FROM` / `JOIN` / `ON` roles, without replaying first-exposure JOIN teaching.
4. **SQL Structure assistance** — add optional local SQL-structure retrieval during authoring without supplying the complete query.
5. **Show solution locality** — keep `Show solution` available only during SQL authoring and render its revealed content inside the SQL editor surface, not as an overlay over the whole lab/results workspace.
6. **SQL/result continuity** — keep the learner-authored successful SQL visible when Results and verification evidence are shown; Results must not replace the editor.
7. **Prediction → SQL → result continuity** — keep the committed pre-execution prediction visible or immediately recoverable while the executed SQL and actual result evidence are inspected and verified.

## Hard boundaries

The corrective action must not:

- change the accepted target capability;
- change the accepted `funding_round → round_investment` case;
- change the core row-multiplication evidence semantics;
- reopen Case Validation or the Lightweight Pedagogy Gate;
- create a new course-wide pedagogical rule;
- change `learner-encounter-production-process.md`;
- use the abandoned experimental corrective-review branch as current authority;
- make unrelated visual or architectural refactors.

If implementation requires any change outside those boundaries, the ad hoc authorization ends and the work must stop rather than silently expand scope.

## Control method

Every implementation change must map to one or more of the seven authorized corrections above.

After implementation, perform one targeted 7-point runtime/conformance verification against this same list. A correction is closed only when its learner-visible behavior is present in the actual implementation. The verification must also confirm that the accepted capability, case, and core prediction evidence were not changed.

No full-cycle re-review is authorized by this record.

## Targeted verification status

Implementation is present on branch `funding-participation-ad-hoc-corrective-2026-09-13`.

| # | Correction | Static conformance | Runtime visual closure |
|---|---|---|---|
| 1 | Business request | **PASS** — Funding now uses natural analytical wording asking which investors participated and which were marked lead. | No additional visual-specific check required. |
| 2 | Baseline | **PASS** — prepared `SELECT COUNT(*) FROM funding_round;` measurement occurs after Cardinality and before qualitative prediction, explicitly framed as orientation rather than SQL authorship/core evidence. | Interaction rendering still benefits from runtime confirmation. |
| 3 | Thin JOIN bridge | **PASS** — normal path now reconnects established reasoning to `SELECT` / `FROM` / `JOIN` / `ON` and explicitly says it is reuse rather than a new JOIN lesson. | Interaction rendering still benefits from runtime confirmation. |
| 4 | SQL Structure assistance | **PASS** — optional `SQL structure` control and incomplete skeleton are implemented for authoring. | **PENDING visual confirmation** inside the actual editor surface. |
| 5 | Show solution locality | **PASS in DOM/CSS conformance** — Funding solution content is rendered through the Funding authoring-assistance panel appended inside `#editor`, not the shared lab-level solution panel. | **PENDING visual confirmation** that it is spatially bounded to the editor and does not obscure Results. |
| 6 | SQL/result continuity | **PASS in DOM/CSS conformance** — Funding result/verification states override the shared editor-hiding rule and retain separate editor and Results grid rows. | **PENDING visual confirmation** that authored SQL and Results are simultaneously usable at target viewport sizes. |
| 7 | Prediction → SQL → result continuity | **PASS in implementation conformance** — committed pre-execution prediction is rendered during SQL authoring, result inspection, and final verification while executed SQL remains retained. | **PENDING visual confirmation** of usable co-presence/recoverability. |

### Boundary verification

Static comparison against the pre-corrective `main` baseline confirms the branch changes are limited to:

- this one-time Owner authorization record;
- the execution mapping's bounded override pointer;
- `src/funding-participation.js`;
- `src/funding-participation.css`.

`learner-encounter-production-process.md` is unchanged. The accepted relation pair remains `funding_round → round_investment`, and the existing qualitative row-multiplication prediction semantics remain intact.

### Current control verdict

**IMPLEMENTATION COMPLETE / AD HOC AUTHORIZATION NOT YET CLOSED.**

The code-level and structural 7-point conformance check passes. Closure is intentionally withheld until the editor-local assistance and SQL+Results choreography are observed in the rendered runtime; static CSS/DOM inspection is not substituted for that visual runtime check.

## Closure rule

This authorization expires when either:

- all seven items pass the targeted verification and the corrective branch is ready for owner disposition; or
- an out-of-scope dependency is discovered.
