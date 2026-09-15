# Course Authority Separation Audit

**Date:** 2026-09-15  
**Status:** AUDIT COMPLETE — AUTHORITY EXTRACTION VALIDATED ON BRANCH — NO RUNTIME CHANGE  
**Baseline:** `main` at `1856d9a68c013bdf455f3339a3c641869529bd1d`  
**Scope:** separation between current course/design authority and agent / production-process artifacts

## 1. Audit question

This audit asks:

> Has agent / production-process machinery contaminated the repository's course-design authority, such that a reader must rely on workflow-role artifacts, historical production records, or contradictory process-era status labels in order to determine current pedagogical requirements?

It distinguishes:

1. **clean separation** — current learner-design authority is readable without reconstructing production chronology;
2. **authority entanglement** — valid design exists, but current requirements must be reconstructed from mixed production/process/provenance artifacts;
3. **semantic contamination** — agent/process mechanics themselves have become course-design requirements without independent pedagogical basis.

This audit does not redesign any learner encounter and does not use the learner-encounter agent workflow to determine its verdict.

---

## 2. Main finding

### Core course authority

`PASS — NO MATERIAL AGENT / PROCESS CONTAMINATION FOUND`

The core course-level sources remain recognizably course authority rather than agent authority:

- `pedagogical-foundations.md`;
- `course-design/course-visual-language.md`;
- `course-design/course-controls.md`.

Stage 1 and Stage 3 also have dedicated encounter authority outside the production folder. A reader does not need an Encounter Architect record, reviewer artifact, production execution state, or agent handoff to understand their current learner design.

### Stage 2 / row multiplication

`FAIL ON BASELINE — CURRENT PEDAGOGICAL AUTHORITY IS MATERIALLY ENTANGLED WITH PRODUCTION / AGENT-ERA ARTIFACTS`

There is no dedicated `course-design/stage-2/` authority on the baseline main branch. The current `funding_round → round_investment` design must be reconstructed from multiple `course-design/production/cycle-1/` artifacts plus later course-level control/topology decisions.

This is a localized authority-resolution defect, not evidence that Stage 2 pedagogy itself was invented for the agent system.

---

## 3. Why Stage 2 is materially entangled

Current Stage 2 requirements are distributed across, at minimum:

- `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`;
- `course-design/production/cycle-1/owner-directed-targeted-revision-and-waiver-2026-09-13.md`;
- `course-design/production/cycle-1/owner-directed-targeted-revision-structural-reuse-2026-09-13.md`;
- `course-design/production/cycle-1/test-drive-finding-connection-focus-2026-09-13.md`;
- later conformance-restoration evidence in `implementation-record-owner-directed-2026-09-13.md`;
- current `course-design/course-controls.md`;
- current cross-stage topology authority.

The same production directory also preserves earlier complete Cycle 1 designs for `news_source → news_article`, superseded Show-solution decisions, review artifacts, waivers, provenance records, and process-era status labels.

A reader can therefore choose the wrong case or wrong current rule while still reading documents that look authoritative in isolation.

---

## 4. Current Stage 2 design that needs a clean authority home

The active design includes:

- case: `funding_round → round_investment`;
- learner-performed relation identification;
- learner-performed connecting-field identification before PK/FK reveal;
- target Grain = one recorded participation per result row;
- Grain before Cardinality in the current route;
- qualitative row-multiplication prediction before any supplied numeric child count;
- separate repeated-context / non-duplicate prediction;
- Concept Moment only after those qualitative predictions;
- `3 participations → 3 rows` as supporting application rather than core evidence;
- learner-authored six-field INNER JOIN;
- actual accepted result as post-execution evidence;
- actual-result-derived `funding_round_id = 1003` verification slice;
- final interpretation of repeated round context as legitimate participation-grain rows;
- relation selection and connection as reuse checkpoints, not new first-exposure Concept Moments.

These decisions are pedagogically meaningful without any agent role or production gate. The problem is where they are stored and how current authority is resolved.

---

## 5. Concrete ambiguity in the production layer

### Competing case generations

Earlier Cycle 1 artifacts contain complete, coherent `news_source → news_article` fan-out designs, including `capability-and-case-brief.md`, `reconciled-encounter-design-packet.md`, and `case-validation-operationalized-rerun.md`.

The current implemented row-multiplication encounter is instead `funding_round → round_investment` under later owner-directed design/corrections.

Therefore `production/cycle-1` cannot safely be treated as a flat current-authority set.

### Show-solution supersession

An older production clarification made Show solution available throughout the learner journey and did not populate the SQL editor. A later clarification superseded that behavior, and the current rule now lives in `course-design/course-controls.md`: SQL-workspace only, populate the editable editor, do not execute or bypass verification.

Preserving the older artifact is correct provenance; treating it as current authority is not.

### Implementation record carrying design reconstruction

The 2026-09-15 addendum in `implementation-record-owner-directed-2026-09-13.md` is one of the clearest descriptions of the restored current Stage 2 sequence after drift was detected.

That is evidence of authority entanglement: implementation evidence should demonstrate conformance to design, not be necessary to discover what the design currently is.

---

## 6. Is the Stage 2 pedagogy semantically contaminated by agents?

### Verdict: NO EVIDENCE OF SEMANTIC AGENT CONTAMINATION

The current instructional requirements stand on their own pedagogically:

- previously learned relational reading is reused rather than pre-resolved;
- Grain and Cardinality must be integrated before SQL;
- qualitative reasoning precedes the trivial `3 → 3` numerical application;
- repeated one-side context is distinguished from duplicates;
- SQL implements an already-formed relational plan;
- actual result evidence is used for verification.

No Encounter Architect role, reviewer gate, waiver, provenance rule, or agent topology is necessary to justify those learner requirements.

---

## 7. Document-architecture check: are two files per Stage actually justified?

After the initial audit recommendation, the existing Stage 1 and Stage 3 authority structure was checked directly rather than assumed to be a template.

### Stage 1

`stage-1-learner-route.md` is about 5.3 KB while `stage-1-interaction-decisions.md` is about 25.9 KB.

The interaction-decisions file contains legitimate Stage-specific constraints, but it also repeats large portions of the route, carries visual behavior that is now partly governed at course level, and includes implementation-open material. The route / interaction split has therefore become a catch-all structure rather than a cleanly separated two-document contract.

### Stage 3

The two files are closer in size, but still overlap substantially in relations, relationship, Grain, measurements, prediction, SQL, verification, and completion. The interaction file adds useful constraints, but the existence of the pair does not establish that every Stage requires the same split.

### Document-architecture verdict

`NO CANONICAL TWO-FILE STAGE TEMPLATE IS ESTABLISHED`

The repository provides no sufficient basis for creating two Stage 2 files merely for symmetry.

The correct cleanup objective is **one unambiguous current Stage 2 authority surface**, not reproduction of a document shape whose separation is itself imperfect.

This correction supersedes the initial recommendation in the first audit draft to create a `learner-route` + `interaction-decisions` pair.

---

## 8. Other repository layers

### `course-experience-improvement-work-management.md`

Cleanly bounded management record. It explicitly says it is not pedagogical/design/process authority. Stale Wave state is a maintenance problem, not pedagogical contamination, provided the file is not treated as design authority.

### `course-work-management.md`

Mixed/stale management state but self-declared non-authority. It should not be used to infer current Stage 2/3 learner design.

### `README.md`

Runtime description with stale production-state references. It explicitly does not define complete current design authority.

---

## 9. Correct cleanup boundary

The safest correction is **authority extraction, not redesign**.

Create one compact dedicated current Stage 2 authority file:

`course-design/stage-2/stage-2-authority.md`

It should contain only the already-established current Stage 2 design needed to understand and validate the encounter:

- encounter purpose / capability;
- business case and relation pair;
- course-assumed learner state specific to the encounter;
- learner route;
- Stage-specific evidence and reveal constraints;
- SQL/result contract;
- Stage-specific completion evidence;
- references to course-level controls/visual/topology authority rather than copies of those rules;
- source trace showing which historical/current decisions were extracted.

The extraction must obey:

1. **Translate, do not redesign.**
2. Do not change sequence, answers, evidence requirements, concept timing, SQL semantics, assistance semantics, topology, or runtime.
3. Use `course-design/course-controls.md` for current Show-solution semantics rather than superseded production statements.
4. Use current course-wide visual/topology authority instead of importing historical local layout/CSS rules.
5. Treat implementation records/runtime as conformance evidence, not as permission to invent missing pedagogy.
6. Preserve `production/cycle-1` unchanged as provenance/history.
7. Do not update agent/process documents.
8. Do not refactor Stage 1 or Stage 3 merely for symmetry.

---

## 10. What should not be done

Do not:

- delete `course-design/production/cycle-1/`;
- rewrite historical reviewer / architect outputs to make them look current;
- re-run the agent production pipeline for documentation separation;
- redesign Stage 2 during extraction;
- infer a universal Stage-document template from Stage 1/3;
- merge Stage 1 or Stage 3 files as part of this localized cleanup;
- treat historical `CURRENT` labels inside preserved production artifacts as sufficient present authority;
- change runtime.

---

## 11. Extraction validation performed

The branch extraction at `course-design/stage-2/stage-2-authority.md` was checked source-to-source against the current accepted Stage 2 decision chain and current course-level control/topology authority.

Validation result:

- **PASS — case integrity:** the extracted case is `funding_round → round_investment`; no superseded `news_source → news_article` learner case leaked into the Stage 2 authority.
- **PASS — learner-route integrity:** relation selection → connecting field → Grain → Cardinality → qualitative multiplication prediction → repeated-context prediction → Concept Moment → concrete application → SQL → actual-result inspection → `1003` verification → completion matches the later owner-directed corrections and conformance-restored current path.
- **PASS — evidence independence:** the concrete `3 → 3` application remains supporting evidence after the qualitative prediction rather than replacing it.
- **PASS — SQL/result contract:** the six logical fields and 72-row participation-grain semantic contract match the accepted design/current implementation contract.
- **PASS — Show solution:** the extraction follows current `course-design/course-controls.md`: SQL-workspace only, populates the editable editor, does not execute or bypass result inspection/verification. The superseded pre-SQL production-era rule was not imported.
- **PASS — topology:** the Stage 2 path matches the current reviewed Stage 1–3 topology; no Stage-local alternative topology was introduced.
- **PASS — no redesign:** no new learner question, concept, answer requirement, SQL operation, or assistance policy was introduced by extraction.
- **PASS — repository scope:** branch comparison against baseline `main@1856d9a68c013bdf455f3339a3c641869529bd1d` contains documentation only; no runtime file is changed.

The extraction therefore resolves the localized Stage 2 authority-location defect **on this branch** without changing the learner experience. Main remains unchanged until an explicit integration decision is made.

---

## 12. Final verdict

`BASELINE FINDING: LOCALIZED AUTHORITY ENTANGLEMENT CONFIRMED`

`BRANCH REMEDIATION: PASS — ONE CLEAN CURRENT STAGE 2 AUTHORITY SURFACE EXTRACTED AND SOURCE-TO-SOURCE VALIDATED; NO RUNTIME OR PEDAGOGY CHANGE`
