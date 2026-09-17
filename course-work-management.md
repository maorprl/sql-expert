# Course Work Management

**Program:** Program A — Learning Product  
**Status:** WORKING  
**Role:** Current Learning Product work-management record

This document manages current course work. It is **not** pedagogical, visual, Lesson, schema, data, process, execution, review, or validation authority. Those decisions remain in their dedicated current-source documents.

Historical Stage 1 stabilization plans, early Stage 2 planning statements, and superseded Cycle 1 next-action snapshots previously stored here have been removed from the current management surface. Their history remains available through Git history, durable production artifacts, audits, and test-drive records. Historical/internal `Stage` naming in paths does not change the current learner-facing `Lesson` terminology.

## 1. Project goal

Build a Relational Reasoning + SQL course that enables learners to demonstrate the capabilities defined in:

`course-exit-criteria.md`

while respecting the dependencies established in:

`course-knowledge-map.md`

and the pedagogical foundations established in:

`pedagogical-foundations.md`

The final number of encounters / Stages is not predetermined by this management record.

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

Implementation presence alone is not evidence of learner capability.

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

The preserved files under `course-design/stage-3/` and the older `src/inner-join-unmatched.js` runtime are candidate/history, not current learner-product authority or implementation. Future Lesson 3 work requires fresh authorization from the accepted Lessons 1–2 baseline through the current production process.

## 4. Current course-wide authority

Primary current course-level sources include:

- `course-exit-criteria.md` — exit capability;
- `course-knowledge-map.md` — capability/dependency map, not sequence authority;
- `pedagogical-foundations.md` — pedagogical foundations;
- `course-design/course-visual-language.md` — visual / interaction-role authority;
- `course-design/course-controls.md` — course-shell controls and SQL-local assistance;
- `startup-ecosystem/startup-ecosystem-schema.md`;
- `startup-ecosystem/startup-ecosystem-schema.sql`;
- `startup-ecosystem/startup-ecosystem-seed.sql`.

There is currently no separate Lessons 1–2 topology authority.

Spatial/interaction conformance must therefore be derived directly from `course-visual-language.md`, `course-controls.md`, and the relevant Lesson authority. If those sources do not settle a material spatial question, it remains unresolved until explicitly decided.

Historical production and audit artifacts remain evidence/provenance unless a current authority source explicitly incorporates or points to them.

## 5. Historical Learning Experience initiative

`course-experience-improvement-work-management.md` and its Wave/orientation records are historical/superseded initiative evidence. They do not override the accepted Lessons 1–2 runtime or current authority.

## 6. Current next action

After this documentation reconciliation, the next planned project layer is explicit **Source-of-Truth hierarchy / authority precedence** work.

This management record does not define that hierarchy. No runtime implementation, Lesson 3 design, or new navigation model is authorized by this next-action statement.

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

There is no current Lessons 1–2 implementation blocker recorded here. The documentation/canon reconciliation establishes the accepted product baseline before the planned Source-of-Truth hierarchy / authority-precedence work.

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

Execution / coordination guidance remains in:

`agent-assisted-work-protocol.md`

`learner-encounter-production-execution.md` is a **historical / superseded Cycle 1 execution snapshot**, not the project-wide current-action source and not a place to restate the current next action.

Durable Cycle 1 production history remains under:

`course-design/production/cycle-1/`

Do not treat that directory as a flat set of current course authority.
