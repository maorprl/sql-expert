# Course Work Management

**Program:** Program A — Learning Product  
**Status:** WORKING  
**Role:** Current Learning Product work-management record

This document manages current course work. It is **not** pedagogical, visual, Stage, schema, data, process, execution, review, or validation authority. Those decisions remain in their dedicated current-source documents.

Historical Stage 1 stabilization plans, early Stage 2 planning statements, and superseded Cycle 1 next-action snapshots previously stored here have been removed from the current management surface. Their history remains available through Git history, durable production artifacts, audits, and test-drive records.

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

The current runnable course contains three implemented encounters:

### Stage 1 — Media coverage / first JOIN

Case:

`news_article → news_source`

Current authority:

- `course-design/stage-1/stage-1-learner-route.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`

Current runtime:

- `src/media-coverage.js`

### Stage 2 — Funding participation / row multiplication

Case:

`funding_round → round_investment`

Current authority:

- `course-design/stage-2/stage-2-authority.md`

Current runtime:

- `src/funding-participation.js`

Stage 2 authority was extracted from the earlier production-history chain so that current learner requirements no longer have to be reconstructed from `course-design/production/cycle-1/`. The later circular dependency on the superseded Stage 1–3 target-topology chain has been removed.

### Stage 3 — INNER JOIN unmatched / zero-match coverage

Case:

`company → funding_round`

Current authority:

- `course-design/stage-3/stage-3-learner-route.md`
- `course-design/stage-3/stage-3-interaction-decisions.md`

Current runtime:

- `src/inner-join-unmatched.js`

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

There is currently **no separate Stage 1–3 topology authority**. The former `stage-1-3-target-topology-decision-2026-09-15.md` and its review/post-build chain were removed from the active tree because they introduced derived UX ownership rules that exceeded the higher-order authority they were meant to translate.

Spatial/interaction conformance must therefore be derived directly from `course-visual-language.md`, `course-controls.md`, and the relevant Stage authority. If those sources do not settle a material spatial question, it remains unresolved until explicitly decided.

Historical production and audit artifacts remain evidence/provenance unless a current authority source explicitly incorporates or points to them.

## 5. Current Learning Experience initiative

The current improvement initiative is managed in:

`course-experience-improvement-work-management.md`

Current status:

- the topology-authority cleanup is complete;
- Teacher voice / Walkthrough work through Wave 5B remains initiative evidence for the changes it actually established;
- Wave 4 diagnostic feedback and Wave 5A narrow response-aware feedback remain implemented work, subject to fresh conformance validation where they interact with current spatial authority;
- Wave 5B graduated / adaptive assistance was evaluated and **implementation is not authorized** because current evidence does not justify that machinery;
- the Orientation & progress Back / Forward scope remains a valid bounded control contract, but it does not certify Stage spatial/topology conformance.

## 6. Current next action

**Execute fresh Stage 1–3 conformance directly against current authority before further learner Test Drive or additional experience implementation.**

The fresh conformance execution must:

1. use only `pedagogical-foundations.md`, `course-design/course-visual-language.md`, `course-design/course-controls.md`, and the relevant Stage authority as substantive authority;
2. treat the current runtime as implementation to be checked, not as authority;
3. inspect every material learner-visible state and transition, including prompt/response location, concept/reveal timing, feedback, Continue labels, Working Schema role, prepared evidence, SQL, Results, verification, Completed Steps, and completion;
4. cover correct, wrong-answer, no-selection, diagnostic, assistance, and relevant review/navigation substates;
5. classify every material requirement as `PASS WITH EVIDENCE`, `DEFECT`, or `UNVERIFIED / CANON DECISION REQUIRED`;
6. correct proven defects before a new pedagogical Test Drive is treated as valid evidence.

No prior PASS from the superseded topology chain can satisfy this requirement.

## 7. Capability coverage and future course development

Course development remains broader than the current experience-improvement initiative.

When a new learner encounter is considered, assess:

exit criterion → capability gap → genuine prerequisites → current learner state → case validation → intended evidence → encounter need → implementation → validation → remaining gap

Do not create a new Stage merely because the current sequence ends at Stage 3.

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

The current **blocking** issue is fresh Stage 1–3 runtime conformance after invalidation of the derived topology authority chain.

Other open matters should enter active work only when evidence or implementation makes them necessary. Current examples include:

- broader persistence semantics across reloads/sessions;
- Retry / Redo reset and downstream invalidation semantics;
- broader hint / adaptive-assistance policy (Wave 5B remains deferred, not authorized);
- future Stage structure beyond the current implemented Stage 1–3 sequence;
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
