# Stage 1–3 topology post-build review

**Date:** 2026-09-15  
**Implementation branch:** `stage-1-3-topology-implementation`  
**Implementation commit:** `db38e4e44ed0f573c5c6710fcb212ce8202080ff`  
**Implementation parent / reviewed baseline:** `5c4e39cce376989b6253e286f097e3b978e7f4b9`  
**Implementation authority:** `course-design/stage-1-3-target-topology-decision-2026-09-15.md` + `course-design/audits/stage-1-3-target-topology-review-2026-09-15.md`  
**Review type:** independent source/diff conformance review of the exact pushed implementation commit against the approved Stage 1–3 target topology.

## Verdict

**PASS — IMPLEMENTATION CONFORMS — STAGE 1–3 TOPOLOGY POST-BUILD GATE CLOSED**

The exact implementation commit `db38e4e44ed0f573c5c6710fcb212ce8202080ff` conforms to the reviewed target topology and is acceptable to merge, subject to preserving that reviewed commit content. Any implementation change after this commit requires delta review before merge.

This verdict closes only the approved Stage 1–3 spatial-topology correction. It does not authorize unrelated cleanup, pedagogy changes, new controls semantics, schema/seed changes, or other runtime redesign.

## 1. Evidence boundary

This review independently inspected the pushed GitHub commit, its complete diff against `5c4e39c`, the affected source structure, and the relevant target authority.

The implementer separately reported:

- `npm test`: 5/5 passing;
- `npm run build`: passing;
- `git diff --check`: clean;
- a full browser walkthrough across all three encounters;
- computer-use confirmation of actual column placement.

Those runtime/browser results were not independently replayed by this reviewer because this review environment does not expose the implementer's local browser session. They are treated as implementer-supplied validation evidence, while the source/diff conformance findings below were independently checked against the pushed commit.

GitHub shows no remote CI status checks attached to this commit.

## 2. Commit integrity and scope

The reviewed implementation is exactly one commit ahead of the approved baseline.

Changed files are limited to the topology implementation and its focused test coverage:

- `index.html`
- `package.json`
- `scripts/topology-contract.test.mjs`
- `src/funding-participation.css`
- `src/funding-participation.js`
- `src/inner-join-unmatched.css`
- `src/inner-join-unmatched.js`
- `src/main.js`
- `src/media-coverage.js`
- `src/styles.css`

No schema, seed, course-authority, validator-data source, or unrelated documentation file is changed by the implementation commit.

**Scope integrity: PASS.**

## 3. Course-wide ownership model

The approved rule was:

- L owns ordinary reasoning;
- R owns direct-object interaction, active tools, produced evidence, and immediate interpretation of that evidence.

The implementation now preserves the two stable page columns in the DOM:

- `reasoning-column` contains Current Step and Completed Steps;
- `implementation-column` contains Working Schema, SQL Workspace / Results, SQL diagnostics, and R-local evidence/action surfaces.

The previous SQL/result `display: contents` and grid-area choreography that moved Working Schema into L is removed. Working Schema stays inside R and changes only order/prominence within that column.

**Course-wide ownership model: PASS.**

## 4. Direct Working-Schema field selection

All three encounters now use an R-local Working-Schema action for the connecting-field checkpoint.

For Stage 1, Stage 2, and Stage 3:

- the actionable connecting-field question is rendered inside Working Schema;
- the selected field state is visible on the Working-Schema object;
- Check remains with that object;
- wrong feedback remains there;
- correct feedback / attached relationship concept remains there;
- Continue remains there after correctness;
- L is reduced to orientation/guidance during the R-owned interaction.

Stage 2 no longer sends the correct acknowledgement back to L while leaving the object in R.

**Direct-object locality: PASS.**

## 5. Ordinary reasoning and Stage 2 oscillation

Stage 2 now keeps its ordinary reasoning sequence in L:

`Grain → Cardinality → multiplication prediction → repeated-context prediction → Concept → application`

The former R-side success acknowledgement states for Cardinality, Prediction, Repetition, and Application have been removed. Their answer feedback/progression no longer jumps to R merely because a separate runtime container existed there.

The multiplication prediction itself was translated from an R `renderWorkspaceAction` interaction into the same L `choiceQuestion` pattern used by the other ordinary reasoning states. Prompt, options, correct answer, wrong feedback, evidence recording, and next-state sequence are preserved.

### Non-blocking review note — acknowledgement bridge consolidation

The old Stage 2 special acknowledgement branches contained extra `teacherVoice` bridge copy. The implementation consolidates those acknowledgements into the generic L acknowledgement instead of reproducing each special bridge verbatim.

This is accepted as non-blocking because:

- the learner action, answer, feedback, evidence, and sequence are unchanged;
- the destination states retain teacher guidance that re-establishes the same continuity;
- the removed branches existed primarily to place acknowledgement content in the R workspace container that the target topology explicitly removes;
- no concept is moved, added, removed, or pre-revealed.

This does not reopen the learner encounter design.

**Stage 2 stable reasoning anchor: PASS.**

## 6. Prepared measurements and evidence cycles

### Stage 1

The Baseline remains a prepared measurement. Invalid/incorrect measurement feedback is no longer rendered in L; it is rendered in the R workspace/evidence area. Baseline result interpretation and the evidence-grounded prediction remain R-owned.

### Stage 3

Both prepared measurements keep Run, returned evidence, measurement correction, comparison, and the immediate zero-match reasoning inside the R evidence episode. The first measurement evidence remains available while the second measurement is inspected.

Stage 3 survival prediction remains R-owned because it is an immediate deduction from the learner-produced zero-match evidence.

**Prepared measurement/evidence locality: PASS.**

## 7. SQL authoring

Across all three encounters:

- task/business orientation remains in L;
- editor and Run remain in R;
- Desired Output and SQL Structure are rendered as R-local authoring assistance;
- syntax/runtime SQL diagnostics are rendered in the new R-local `sql-diagnostic` surface;
- stage result-validation feedback is rendered through the R workspace action rather than L;
- Working Schema remains in R as a secondary reference;
- Completed Steps remain in L.

The implementation uses shared course CSS/DOM behavior for the cross-stage layout rather than separate Stage-specific column relocation.

**SQL authoring topology: PASS.**

## 8. Show solution

`Show solution` is now handled by the shared SQL workspace control path.

When active:

- it is available only during active SQL authoring state styling;
- it replaces the active editor contents with the encounter solution;
- the editor remains editable;
- it does not run SQL or mark evidence complete;
- Stage 3's separate revealed-solution panel and its special CSS are removed;
- stale shared SQL diagnostics are cleared when the solution is inserted.

Stage 2 retains its assistance-provenance listener while the shared handler owns editor population.

**Course-controls conformance for Show solution: PASS.**

## 9. Results and verification

Successful SQL execution transitions into an R-owned result-evidence phase in all three encounters.

### Stage 1

Result inspection and final result verification both remain in R. Correct verification feedback and the `Complete stage` action remain with the R evidence before completion moves to L.

### Stage 2

The accepted result, the `funding_round_id = 1003` evidence slice, verification response, feedback, and completion transition remain in R.

### Stage 3

The former `R Result → L Verification` reversal is removed. The actual verification question, response controls, Check, wrong/correct feedback, and Continue now render through the R workspace/evidence surface with Results.

After verification, the R-local `Continue to coverage conclusion` explicitly hands off to the separate L-owned business coverage conclusion while Results remain available in R as supporting evidence.

**Result/verification topology: PASS.**

## 10. Completion and persistent references

Completion remains L-owned in all three encounters.

Working Schema no longer performs an R→L move on SQL entry or an L→R restoration on completion. It remains in the implementation column throughout the journey. Completed Steps remain in the reasoning/history column.

**Persistent-reference topology: PASS.**

## 11. Target-path conformance

### Stage 1

Target:

`L Relations → R Connection → L Cardinality → L Grain → R Baseline Run → R Baseline Interpretation → R Baseline Prediction → L Semantic Action → L JOIN Teaching → Split(L task / R SQL workspace) → R Result Inspection → R Verification → L Complete`

Source implementation conforms.

### Stage 2

Target:

`L Relations → R Connection → L Grain → L Cardinality → L Multiplication Prediction → L Repeated-context Prediction → L Concept → L Application → Split(L task / R SQL workspace) → R Result Inspection → R Verification → L Complete`

Source implementation conforms. The previous acknowledgement-driven L↔R oscillation is removed.

### Stage 3

Target:

`L Relations → R Connection → L Cardinality → L Grain → R Company Measurement → R Company Evidence → R Funding Measurement → R Compare → R Survival Prediction → Split(L task / R SQL workspace) → R Result Inspection → R Verification → L Coverage Conclusion → L Complete`

Source implementation conforms.

**Target-path conformance: PASS.**

## 12. Focused topology tests

The new `scripts/topology-contract.test.mjs` protects five important structural contracts:

1. R ownership of persistent schema/workspace/diagnostic surfaces and removal of the old grid-area relocation mechanism;
2. local Working-Schema field selection in all three encounters;
3. Stage 2 prediction/application remaining L-owned;
4. Stage 3 verification remaining with Results until the explicit coverage handoff;
5. Show solution populating the editor and clearing the shared SQL diagnostic.

These tests are useful regression protection but are not, by themselves, a substitute for transition-level visual validation. The post-build decision therefore also relies on the independently inspected state/rendering code and the implementer's reported browser walkthrough.

## 13. Merge decision

No blocking conformance defect was found in the reviewed commit.

Therefore:

**STAGE 1–3 TOPOLOGY POST-BUILD GATE: CLOSED — PASS**

The exact commit:

`db38e4e44ed0f573c5c6710fcb212ce8202080ff`

is approved for merge into the current course line.

Do not add cleanup or unrelated fixes to that implementation commit before merge. If additional implementation changes are made, review the delta first.
