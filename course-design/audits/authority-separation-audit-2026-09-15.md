# Course Authority Separation Audit

**Date:** 2026-09-15  
**Status:** AUDIT COMPLETE — NO RUNTIME CHANGE  
**Baseline:** `main` at `1856d9a68c013bdf455f3339a3c641869529bd1d`  
**Scope:** Separation between current course/design authority and agent / production-process artifacts

## 1. Audit question

This audit asks one structural question:

> Has agent / production-process machinery contaminated the repository's course-design authority, such that a reader must rely on workflow-role artifacts, historical production records, or contradictory process-era status labels in order to determine current pedagogical requirements?

The audit distinguishes three different conditions:

1. **clean separation** — pedagogical/design authority is readable from dedicated course or encounter authority documents; production artifacts may exist but are not required to determine learner behavior;
2. **authority entanglement** — valid pedagogical decisions exist, but a reader must reconstruct them from production/process artifacts mixed with provenance, reviews, waivers, implementation records, or historical superseded decisions;
3. **semantic contamination** — agent/process mechanics themselves have become course-design requirements without an independently established pedagogical basis.

This audit does not redesign any learner encounter and does not use the learner-encounter agent workflow to determine its verdict.

## 2. Main-branch structure observed

At the baseline, `course-design/` contains dedicated authority locations for:

- `course-design/course-visual-language.md`;
- `course-design/course-controls.md`;
- `course-design/stage-1/`;
- `course-design/stage-3/`;
- a cross-stage target-topology decision;
- `course-design/production/cycle-1/`;
- audits and test-drive evidence.

There is **no `course-design/stage-2/` directory** on the current main branch.

That asymmetry is material because the implemented row-multiplication encounter is current learner-facing course behavior, but its substantive design history remains under `course-design/production/cycle-1/`.

## 3. Course-level authority

### Verdict: CLEAN / LOW CONTAMINATION RISK

The primary course-level sources remain recognizably course authority rather than agent authority.

`pedagogical-foundations.md` explicitly states that previous course versions, previous pedagogy documents, previous stage structures, previous checkpoints, and remembered decisions are not authoritative unless reconsidered and established again. It defines the course purpose, evidence direction, learner reasoning principles, and boundaries on generalization.

`course-design/course-visual-language.md` defines learner-facing visual roles, evidence locality, spatial behavior, teacher guidance, and transition rules without assigning those decisions to an agent role.

`course-design/course-controls.md` defines course-control semantics and explicitly limits its own scope.

No finding in these documents requires an agent role, review topology, or production gate as a learner-facing pedagogical principle.

**Conclusion:** no evidence of semantic agent contamination was found in the core course-level pedagogy / visual / control authority.

## 4. Stage 1 authority

### Verdict: CLEAN / LOW CONTAMINATION RISK

Stage 1 has dedicated encounter authority under:

- `course-design/stage-1/stage-1-learner-route.md`;
- `course-design/stage-1/stage-1-interaction-decisions.md`.

The learner route states the business request, reasoning sequence, reveal timing, evidence requirements, SQL role, and final verification directly as learner-design requirements.

A reader does not need an Encounter Architect record, independent-review artifact, production execution state, or agent handoff in order to understand the current Stage 1 learner experience.

Historical audits and test drives may explain how the design evolved, but they are not required to reconstruct the Stage 1 design.

## 5. Stage 3 authority

### Verdict: CLEAN / LOW CONTAMINATION RISK

Stage 3 likewise has dedicated authority under:

- `course-design/stage-3/stage-3-learner-route.md`;
- `course-design/stage-3/stage-3-interaction-decisions.md`.

The current route directly defines the zero-match capability, company/funding-round business request, learner-generated evidence, prediction, INNER JOIN implementation, result verification, and coverage conclusion.

As with Stage 1, production-role artifacts are not required to determine the current Stage 3 instructional sequence.

## 6. Stage 2 / row-multiplication authority

### Verdict: AUTHORITY ENTANGLEMENT CONFIRMED — HIGHER CONTAMINATION RISK

The row-multiplication encounter does **not** have a clean dedicated Stage / encounter authority location parallel to Stage 1 and Stage 3.

Its current pedagogical requirements must instead be assembled from multiple files under `course-design/production/cycle-1/`, including at minimum:

- `encounter-design-row-multiplication-2026-09-13.md`;
- `owner-directed-targeted-revision-and-waiver-2026-09-13.md`;
- `owner-directed-targeted-revision-structural-reuse-2026-09-13.md`;
- `test-drive-finding-connection-focus-2026-09-13.md` for a later accepted locality correction;
- the current course-level `course-controls.md` for Show solution behavior;
- the current cross-stage topology decision for spatial ownership/locality;
- current runtime / implementation evidence to verify that later conformance corrections restored the intended path.

This is not merely verbose documentation. It creates a real authority-resolution problem because several files in the same production folder preserve earlier, conflicting designs and status labels.

### 6.1 Current Stage 2 instructional content that remains entangled

The following active learner-design requirements are currently represented through the production chain rather than a dedicated Stage 2 authority document:

- case: `funding_round → round_investment`;
- business task centered on recorded investor participation with funding-round context;
- learner-performed relation identification rather than a pre-resolved relation set;
- learner-performed connecting-field identification before PK/FK reveal;
- requested Grain = one recorded participation per result row;
- Grain before Cardinality in the current route;
- qualitative row-multiplication prediction before any concrete child count;
- separate repeated-context / non-duplicate prediction;
- Concept Moment only after those qualitative predictions;
- concrete `3 participations → 3 rows` as supporting application rather than core evidence;
- learner-authored six-field INNER JOIN;
- actual accepted result used as post-execution evidence;
- actual-result-derived `funding_round_id = 1003` verification slice;
- final interpretation of repeated round context as legitimate participation-grain rows;
- relation selection and connecting-field work as reuse checkpoints, not new first-exposure Concept Moments.

These are substantive course-design decisions. They should not require a future reader to reconstruct a production chronology in order to know the current learner route.

## 7. Concrete evidence of historical/current ambiguity inside `production/cycle-1`

### 7.1 Competing case generations

Earlier Cycle 1 artifacts selected / retained `news_source → news_article` as the fan-out case.

Examples include:

- `capability-and-case-brief.md`;
- `reconciled-encounter-design-packet.md`;
- `case-validation-operationalized-rerun.md`.

Those artifacts contain extensive, internally coherent pedagogical reasoning and in some cases describe themselves with strong current-process status language.

The currently implemented row-multiplication encounter, however, is `funding_round → round_investment`, governed by the later row-multiplication design and owner-directed revisions.

Therefore the folder contains more than historical background: it contains multiple complete pedagogical designs for the same broad Cycle 1 capability.

A reader who treats file status labels or production chronology incompletely can select the wrong case and the wrong learner route while still believing they are following repository authority.

### 7.2 Show solution supersession chain

`authority-clarification-show-solution-assistance.md` states that Show solution remains available throughout the learner journey, including protected prediction, and that revealing it does not populate the SQL editor.

A later clarification, `authority-clarification-show-solution-sql-workspace-2026-09-13.md`, explicitly supersedes those rules: Show solution belongs only to the active SQL Workspace and populates the editable SQL editor.

That later behavior has also been promoted into `course-design/course-controls.md`, which is the appropriate clean course-level authority.

The older production clarification remains preserved in the same directory.

This is acceptable as provenance, but unsafe if production artifacts are treated as a flat set of current authority.

### 7.3 Provenance record drift

`course-design/production/cycle-1/provenance.md` declares itself current as a provenance record but not current execution state. Inside it, however, historical entries still label the older Show solution clarification as `CURRENT AUTHORITY CLARIFICATION` and describe an earlier `news_source → news_article` Cycle 1 line.

Later owner-directed row-multiplication reconstruction and 2026-09-15 conformance-restoration work live elsewhere.

The file is therefore useful as historical provenance, but it is not a safe single index of current learner-design authority.

### 7.4 Implementation record contains current design corrections

`implementation-record-owner-directed-2026-09-13.md` is nominally an implementation record, yet its 2026-09-15 addendum is currently one of the clearest records of the restored Stage 2 learner sequence after drift was found.

That makes implementation evidence carry information a future designer may incorrectly need in order to reconstruct current pedagogy.

An implementation record should be able to demonstrate conformance to authority; it should not be necessary to discover what the authority now is.

## 8. Is the Stage 2 pedagogy itself contaminated?

### Verdict: NO EVIDENCE OF SEMANTIC AGENT CONTAMINATION

The active Stage 2 instructional requirements are pedagogically meaningful independently of the agent workflow:

- learners identify relations and connection rather than receiving them pre-resolved;
- Grain and Cardinality are integrated to predict row multiplication;
- evidence-independence was strengthened by moving the `3 → 3` numerical prompt after the qualitative prediction;
- repeated one-side context is distinguished from duplicates;
- SQL implements an already-formed relational plan;
- actual result evidence is used for verification.

Those requirements can be stated without Encounter Architect roles, reviewer gates, waivers, provenance status, or agent topology.

The problem is therefore primarily **authority entanglement**, not evidence that the learning design was invented for the sake of the agents.

## 9. Other repository layers

### `course-experience-improvement-work-management.md`

**Classification: cleanly bounded management record.**

It explicitly says it is not pedagogical, visual, Stage, control, schema, data, process, execution, review, or validation authority. It may identify a canon dependency but must not resolve it.

Its current Wave status can be stale without contaminating pedagogy, provided it is not treated as design authority.

### `course-work-management.md`

**Classification: mixed/stale management state, but self-declared non-authority.**

It contains old course-position material and references the production execution / agent protocol for current execution state. It should not be used to infer current Stage 2/3 learner design.

This is a management-maintenance problem, not direct pedagogical contamination.

### `README.md`

**Classification: runtime description with stale production-state references.**

It explicitly says it does not define complete design authority. Its references to production execution state should not control pedagogy.

## 10. Overall contamination verdict

### CORE COURSE AUTHORITY

`PASS — NO MATERIAL AGENT/PROCESS CONTAMINATION FOUND`

The main course-level pedagogy, controls, visual language, Stage 1 authority, and Stage 3 authority remain separable from the agent system.

### STAGE 2 AUTHORITY

`FAIL — CURRENT PEDAGOGICAL AUTHORITY IS MATERIALLY ENTANGLED WITH PRODUCTION / AGENT-ERA ARTIFACTS`

This does **not** mean Stage 2 should be redesigned or discarded.

It means its accepted learner-design decisions do not currently have a clean canonical home equivalent to Stage 1 and Stage 3.

### PRODUCTION ARTIFACTS

`KEEP AS PROVENANCE / EVIDENCE — DO NOT TREAT AS A FLAT CURRENT-AUTHORITY SET`

The production folder preserves valuable historical decisions, reviews, corrections, implementation records, and provenance. Deleting it would destroy useful evidence and is not warranted by this audit.

The defect is that current Stage 2 authority still depends on navigating that history.

## 11. Required cleanup boundary

The safest correction is **authority extraction, not redesign**.

Create a dedicated current Stage 2 authority surface, parallel to Stage 1 and Stage 3, containing only the already-accepted current learner design.

Recommended target structure:

- `course-design/stage-2/stage-2-learner-route.md`;
- `course-design/stage-2/stage-2-interaction-decisions.md`.

The extraction must obey these constraints:

1. **Translate, do not redesign.** Do not change learner sequence, answers, evidence requirements, concept timing, SQL semantics, assistance semantics, or topology merely while cleaning authority.
2. Use the current accepted row-multiplication design plus later owner-directed corrections as the content basis.
3. Use `course-design/course-controls.md` for current Show solution semantics; do not re-import the superseded production clarification.
4. Use the current cross-stage topology decision / visual-language authority for spatial-role requirements rather than historical local CSS descriptions.
5. Treat implementation records and current runtime as conformance evidence, not as permission to invent missing pedagogy.
6. Preserve production artifacts unchanged as provenance unless a separate documentation-cleanup decision later chooses to annotate/archive/index them.
7. Do not update agent/process documents as part of the extraction.
8. Do not change runtime as part of the extraction.

## 12. What should not be done

Do not:

- delete `course-design/production/cycle-1/`;
- rewrite historical reviewer / architect outputs to make them look current;
- collapse provenance and current authority into one mega-document;
- re-run the agent production pipeline merely to perform documentation separation;
- redesign Stage 2 while extracting it;
- infer new Stage ordering or new curriculum structure from this cleanup;
- treat historical `CURRENT` labels inside preserved production artifacts as sufficient evidence of present authority;
- modify Stage 1 or Stage 3 merely for symmetry.

## 13. Recommended next action

**Stage 2 authority extraction only — no runtime change, no pedagogy redesign, no agent/process changes.**

The extraction should produce a clean current learner route and interaction-decisions pair from the already accepted current Stage 2 behavior.

After extraction, a narrow source-to-source check should confirm:

- every extracted requirement is traceable to current accepted Stage 2 design / correction authority;
- no historical superseded case or control rule leaked into the extracted files;
- no learner behavior changed;
- current runtime remains unchanged;
- future pedagogical reading of Stage 2 no longer requires reconstructing the production chronology.

## 14. Final verdict

`LOCALIZED AUTHORITY ENTANGLEMENT CONFIRMED — STAGE 2 REQUIRES AUTHORITY EXTRACTION; CORE COURSE AUTHORITY IS NOT MATERIALLY CONTAMINATED`
