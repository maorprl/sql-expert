# Course Work Management

**Program:** Program A — Learning Product  
**Status:** WORKING  
**Role:** Current Learning Product work-management record

This document manages current course work. It is **not** pedagogical, visual, Lesson, schema, data, process, execution, review, or validation authority. Those decisions remain in their dedicated current-source documents.

Historical Stage 1 stabilization plans, early Stage 2 planning statements, and superseded Cycle 1 next-action snapshots previously stored here have been removed from the current management surface. Their history remains available through Git history, durable production artifacts, audits, and test-drive records. Historical/internal `Stage` naming in paths does not change the current learner-facing `Lesson` terminology.

Cross-project authority ownership, precedence, runtime/authority distinction, schema/data precedence, and status semantics are defined in:

`source-of-truth-hierarchy.md`

Cross-project product/repository production and promotion invariants are defined in:

`production-contract-v1.md`

## 1. Project goal

Build a Relational Reasoning + SQL course that enables learners to demonstrate the capabilities defined in:

`course-exit-criteria.md`

while respecting the dependencies established in:

`course-knowledge-map.md`

and the pedagogical foundations established in:

`pedagogical-foundations.md`

The final number of encounters / Lessons is not predetermined by this management record.

## 2. Definition of Done

The Learning Product is complete only when:

- required exit capabilities are mapped to implemented learner encounters;
- prerequisite/dependency relationships are respected;
- each current learner encounter has clear current authority;
- required encounters are implemented;
- learner evidence is identified for each required capability;
- the course has been validated both at encounter level and as a cumulative progression;
- current pedagogical, visual, control, schema, and data authority is reflected in observable behavior where required;
- no unresolved blocking issue prevents required capabilities from being demonstrated;
- no unexplained exit-capability gap remains.

Implementation presence alone is not evidence of learner capability or normative authority.

## 3. Current course state

The current accepted runnable course contains two implemented encounters:

### Lesson 1 — Media coverage / first JOIN

Case:

`news_article → news_source`

Current authority:

- `course-design/stage-1/stage-1-learner-route.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`

Current runtime:

- `src/stage1-prototype-runtime.js`
- `src/stage1-prototype-runtime.css`

### Lesson 2 — Funding participation / row multiplication

Case:

`funding_round → round_investment`

Current authority:

- `course-design/stage-2/stage-2-authority.md`

Current runtime:

- `src/stage2-prototype-runtime.js`
- `src/stage2-prototype-runtime.css`

Lesson 2 authority was extracted from the earlier production-history chain so that current learner requirements no longer have to be reconstructed from `course-design/production/cycle-1/`.

### Lesson 3 — not currently accepted

The preserved files under `course-design/stage-3/` and the older `src/inner-join-unmatched.js` runtime are candidate/history, not current learner-product authority or implementation.

The current learner-encounter production process remains the formal production-process authority until an explicit cutover changes that status. However, Lesson 3 design and implementation are currently paused while the active production-system rebaseline subplan below evaluates a candidate replacement. Preserved Stage 3 material remains candidate/history during that work.

## 4. Current course-wide authority

Primary current course-level sources include:

- `course-exit-criteria.md` — exit capability;
- `course-knowledge-map.md` — capability/dependency map, not sequence authority;
- `pedagogical-foundations.md` — pedagogical foundations;
- `course-design/course-visual-language.md` — visual / interaction-role authority;
- `course-design/course-controls.md` — course-shell controls and SQL-local assistance;
- `startup-ecosystem/startup-ecosystem-schema.md` — human-readable schema/grain/design documentation;
- `startup-ecosystem/startup-ecosystem-schema.sql` — executable structural truth;
- `startup-ecosystem/startup-ecosystem-seed.sql` — executable current data-instance truth.

Domain ownership and precedence between these sources are defined in `source-of-truth-hierarchy.md`.

There is currently no separate Lessons 1–2 topology authority.

Spatial/interaction conformance must therefore be derived directly from `course-visual-language.md`, `course-controls.md`, and the relevant Lesson authority. If those sources do not settle a material spatial question, it remains unresolved until explicitly decided.

Historical production and audit artifacts remain evidence/provenance unless a current authority source explicitly incorporates an accepted decision.

## 5. Historical Learning Experience initiative

`course-experience-improvement-work-management.md` and its Wave/orientation records are historical/superseded initiative evidence. They do not override the accepted Lessons 1–2 runtime or current authority.

## 6. Current planning state

This section records work state only. It does not create or replace product, pedagogy, Lesson, process, validation, or implementation authority.

### 6.1 Master plan

The established project plan remains:

1. **DONE** — Preserve the accepted Lessons 1–2 runtime baseline.
2. **DONE** — Full external UI/UX review of Lessons 1–2.
3. **DONE** — Consolidated Lessons 1–2 cleanup.
4. **DONE** — Full repository documentation / canon reconciliation.
5. **DONE** — Source-of-Truth hierarchy / authority precedence.
6. **DONE** — Production Contract v1.
7. **NOT STARTED — PAUSED BY ACTIVE SUBPLAN** — Lesson 3 design.
8. **NOT STARTED** — Build the production system / “machine”.
9. **NOT STARTED** — CI.
10. **NOT STARTED** — Implement Lesson 3 through the production system.
11. **NOT STARTED** — CD.
12. **NOT STARTED** — Lesson 4 through the production system.
13. **NOT STARTED** — Whole-course planning.
14. **NOT STARTED** — Engineering cleanup.

The active subplan below is corrective work required before proceeding with Master Plan Step 7. It does not renumber or replace the master plan.

### 6.2 Active subplan — Production-system rebaseline

This subplan exists because the current learner-encounter production process was found to contain legacy-derived agent/process architecture that must be revalidated before it is used as the basis for future Lesson production.

1. **DONE** — Inventory the current production process and separate product requirements, legacy architecture choices, and unresolved matters.
2. **DONE** — Draft Production System Requirements without copying the legacy agent topology.
3. **DONE** — Perform traceability / necessity audit of the proposed requirements and derive the cleaned requirement set.
4. **DESIGN COMPLETE — DURABLE RECORD PENDING** — Candidate Workflow v0 has been designed from the audited requirements. It is not current authority and has not yet been preserved as its own repository artifact.
5. **NOT STARTED** — Run a Lesson 3 dry run through the candidate workflow, without implementation, and check it against the rest of the applicable current canon.
6. **NOT STARTED** — Compare the candidate against the legacy process by outcomes and failure protection: what was lost, what was simplified, and what legacy mechanism—if any—was actually necessary.
7. **NOT STARTED** — If the candidate survives the dry run and comparison, perform an atomic documentation cutover so that the production process, Source-of-Truth mapping, Production Contract references, and management state agree on one current process.

Until Step 7 completes, `learner-encounter-production-process.md` remains the formal current production-process authority. Candidate work is evaluative and non-authoritative.

### 6.3 Current action

**CURRENT ACTION:** reconcile this management record before additional Lesson work.

That reconciliation must classify existing management content as `DONE`, `SUPERSEDED / OBSOLETE`, `STILL OPEN`, or `UNRESOLVED DISPOSITION` against repository evidence rather than deleting, reviving, or completing historical work by assumption.

After the management reconciliation establishes a clean current tracker, preserve the already-completed Production System Requirements audit and Candidate Workflow v0 as explicit **CANDIDATE / NON-AUTHORITATIVE** durable material before beginning the Lesson 3 dry run.

Do not begin Lesson 3 design or implementation while this current action remains incomplete.

## 7. Capability coverage and future course development

Course development remains broader than the current experience-improvement initiative.

When a new learner encounter is considered, assess:

exit criterion → capability gap → genuine prerequisites → current learner state → case validation → intended evidence → encounter need → implementation → validation → remaining gap

Do not create a new Lesson merely because the current accepted journey ends at Lesson 2.

Do not treat the existence of preserved schema relations or historical designs as proof that they should be taught next.

## 8. Course-level validation still required

Encounter-level validation is not sufficient to establish full course completion.

Before release-level or exit-capability completion claims, course-level validation should include where relevant:

- cumulative progression validation;
- prerequisite validation across encounters;
- cross-encounter regression;
- exit-criteria coverage review;
- checks for dependence on knowledge not appropriately introduced/developed;
- cumulative transfer / independent-performance evidence appropriate to the exit criteria.

## 9. Current open / blocking areas

There is no current Lessons 1–2 implementation blocker recorded here. Canon reconciliation, Source-of-Truth authority mapping, and Production Contract v1 are complete; unresolved matters remain governed by their current authority/status rather than being inferred from runtime or historical artifacts.

Other open matters should enter active work only when evidence or implementation makes them necessary. Current examples include:

- broader persistence semantics across reloads/sessions;
- Retry / Redo reset and downstream invalidation semantics;
- broader hint / adaptive-assistance policy (Wave 5B remains deferred, not authorized);
- future Lesson structure beyond the accepted Lessons 1–2 journey;
- broader initial schema exposure where later work requires a decision;
- release-level accessibility, responsive, cross-browser, and cumulative-regression validation.

## 10. Relationship to production-system records

Learner-encounter production process authority remains in:

`learner-encounter-production-process.md`

That authority is currently under production-system rebaseline review. It remains current until an explicit atomic cutover changes the authority mapping; the Candidate Workflow does not currently replace it.

Execution / coordination guidance remains in:

`agent-assisted-work-protocol.md`

`learner-encounter-production-execution.md` is a **historical / superseded Cycle 1 execution snapshot**, not the project-wide current-action source and not a place to restate the current next action.

Durable Cycle 1 production history remains under:

`course-design/production/cycle-1/`

Do not treat that directory as a flat set of current course authority.
