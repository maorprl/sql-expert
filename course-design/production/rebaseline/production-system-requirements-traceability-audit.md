# Production System Requirements — Traceability / Necessity Audit

**Status:** REVALIDATED CANDIDATE EVIDENCE / NON-AUTHORITATIVE  
**Role:** Rebaseline audit record supporting the cleaned Production System Requirements  

This audit records how the preliminary requirement list was reduced to the cleaned candidate requirement set. It is evidence for evaluating the replacement workflow; it is not current production-process authority.

The audit has been rechecked against the corrected management-preservation baseline in `routecraft-work-management.md`, including restored Course Definition of Done, restored capability-coverage discipline, unresolved pedagogy operationalization, preserved production-system calibration criteria, and B3 future/conditional topics.

Until an explicit accepted cutover, `learner-encounter-production-process.md` remains current production-process authority.

## 1. Audit sources

The audit is grounded in current course/repository authority and preserved management evidence, including:

- `course-exit-criteria.md`;
- `course-knowledge-map.md`;
- `pedagogical-foundations.md`;
- current Lesson 1 and Lesson 2 authority;
- `course-design/course-controls.md`;
- `course-design/course-visual-language.md`;
- `production-contract-v1.md`;
- `source-of-truth-hierarchy.md`;
- the current learner-encounter production process;
- Cycle 1 production, pre-build review, post-build conformance, pedagogy, and UX evidence under `course-design/production/cycle-1/`;
- historical `course-work-management.md` evidence for Definition of Done, capability coverage, and pedagogy operationalization;
- historical `production-system-work-management.md` evidence for calibration criteria and B3 context/provenance topics;
- corrected current management state in `routecraft-work-management.md`.

The purpose is not to prove that the current process is correct. It is to separate requirements supported by current authority, course-management obligations, or concrete failure evidence from architecture that merely existed in the legacy workflow.

## 2. Preliminary PSR disposition

| Preliminary item | Disposition | Rebaseline conclusion |
|---|---|---|
| PSR-01 — Current-state grounding | CONFIRMED | Keep. Work must begin from current baseline, current authority, and relevant current management constraints. |
| PSR-02 — Need before solution | CONFIRMED | Keep. A learner need/capability gap must justify the encounter. |
| PSR-03 — Bounded learner assumptions | CONFIRMED | Keep. Do not infer mastery from prior exposure. |
| PSR-04 — Case grounded in real data | KEEP, BUT DERIVED | Keep as part of case validity/credibility rather than as an independent workflow gate. |
| PSR-05 — Analytical/business legitimacy | CONFIRMED, SCOPED | Keep. The case must express a legitimate analytical/business need without forcing artificial framing. |
| PSR-06 — Evidence validity / no shortcut | CONFIRMED | Keep. Prior review evidence showed answer leakage and permissive validation can invalidate intended evidence. |
| PSR-07 — Support matches evidence | NARROW | Keep the support/evidence calibration requirement; do not require a specific assistance-provenance mechanism universally. |
| PSR-08 — Complete learner journey / continuity | CONFIRMED | Keep. Reasoning, SQL, produced evidence, and interpretation must remain coherent. |
| PSR-09 — Design boundary before implementation | CONFIRMED, NARROWED | Keep for material decisions implementation would otherwise have to invent. Scoped under-operationalized pedagogy must not be silently interpreted into implementation authority. |
| PSR-10 — No silent authority creation | DUPLICATE | Absorb into the implementation-boundary / no-invention requirements. |
| PSR-11 — Independent challenge | NOT ESTABLISHED AS UNIVERSAL | Independence may be useful by impact/risk, but evidence does not justify a permanent universal independent-review stage. |
| PSR-12 — Validate actual runtime | CONFIRMED, NARROWED | Keep actual diff/runtime validation where behavior can be affected; no universal independent validation agent is implied. |
| PSR-13 — Validation by impact | CONFIRMED | Keep. Review depth follows actual risk and scope. |
| PSR-14 — Unrelated OPEN does not block | CONFIRMED | Keep. OPEN matters block only when current work genuinely depends on them. |
| PSR-15 — Explicit acceptance states | CONFIRMED | Keep. Implementation, scoped validation, acceptance, and release readiness are distinct. |
| PSR-16 — Preserve accepted behavior | CONFIRMED | Keep. Accepted behavior cannot be silently regressed or replaced. |
| PSR-17 — Durable decision trace | NARROW | Keep only the requirement that accepted decisions needed later become durable in current authority/state; no verbatim artifact-per-handoff requirement. |
| PSR-18 — Actual diff over self-report | CONFIRMED | Keep. Review concrete output rather than summaries alone. |
| PSR-19 — Residual-gap update after every Lesson | CONFIRMED, NARROWED | Historical course management requires capability coverage to be reassessed after validated learner encounters and before completion claims. Keep the reconciliation obligation, but do not require a separate residual-gap artifact after every encounter. |
| PSR-20 — Architecture neutrality | NOT A PRODUCT REQUIREMENT | Retain as a redesign guardrail: do not smuggle legacy topology into requirements. It is not itself a learner-product requirement. |

## 3. Management-preservation findings and effect on the requirement set

### Course Definition of Done

Restored management evidence requires capability coverage, prerequisite respect, current encounter authority/design basis, implementation, learner evidence, encounter-level and cumulative validation, observable conformance to applicable authority, no blocking unresolved issue, and no unexplained capability gap before course completion.

**Effect on candidate requirements:** no fixed process phase is implied, but acceptance/reconciliation must not erase the management trace needed to support those later completion claims.

### Capability Coverage discipline

Historical management explicitly maintained:

`exit criterion → required capability → prerequisites → learner encounter(s) → implementation → validation evidence → remaining gap`

and required reassessment after validated learner encounters.

**Effect on candidate requirements:** add a narrow requirement to reconcile current capability coverage after an accepted validated learner encounter changes it. This becomes PSR-C14. It does not revive a universal separate residual-gap artifact.

### Pedagogy operationalization backlog

The broader workstream was not proven complete.

**Effect on candidate requirements:** no universal new pedagogy phase is added. Instead, if an encounter depends on a pedagogical principle whose operational meaning is materially insufficient to authorize implementation, that scoped question must be settled before Build.

### Production-system calibration criteria

Historical management preserved questions about unnecessary/missing phases, independent-review value, context duplication/pollution, stale/ambiguous process state, durable-artifact value, coordination cost/failure modes, and lighter execution-state machinery.

**Effect on candidate requirements:** these remain evaluation criteria for Substep 6. They do not automatically become workflow stages or architecture requirements.

### B3 source/context/provenance topics

Artifact metadata, deterministic role-specific source loading, explicit missing-source/exclusion handling, retrieval provenance/authority-aware filtering, and broader machine-readable process state remain future/conditional unless evidence activates them.

**Effect on candidate requirements:** no current mandatory architecture is added.

## 4. Concrete failure evidence that the cleaned requirements must protect against

The Cycle 1 record showed that useful controls existed underneath the legacy choreography. Examples include:

- a design could leak the intended structural conclusion through counts or explanatory material before the learner produced the protected reasoning;
- a Concept Moment could supply the conclusion that a later step purported to assess;
- control semantics could affect whether earlier prediction evidence remained valid or reviewable;
- SQL/result validation could be too permissive and accept an out-of-scope query merely because the final pair set matched;
- automatic wrong-answer guidance could materially scaffold the learner while the runtime still recorded the work as unassisted;
- a successful implementation or build did not by itself establish pedagogical or product acceptance.

These failures support requirements around evidence independence, support calibration, material design boundaries, actual runtime/diff validation, and explicit acceptance state. They do not by themselves prove that the exact legacy roles, handoffs, or number of review streams are necessary.

## 5. Clean requirement mapping

The audited items are consolidated in `production-system-requirements-candidate.md` as:

- PSR-C01 — Ground work in current state;
- PSR-C02 — Establish a justified learner need;
- PSR-C03 — Bound learner-state assumptions;
- PSR-C04 — Use a valid and credible case;
- PSR-C05 — Define valid learner evidence;
- PSR-C06 — Calibrate support to the evidence;
- PSR-C07 — Preserve a coherent learner journey;
- PSR-C08 — Settle material design authority before implementation;
- PSR-C09 — Do not invent product decisions in implementation;
- PSR-C10 — Validate the actual change;
- PSR-C11 — Match validation depth to impact;
- PSR-C12 — Preserve accepted product behavior;
- PSR-C13 — Distinguish implementation, validation, and acceptance;
- PSR-C14 — Reconcile course capability coverage after accepted learner change.

## 6. Architectural conclusion

The revalidated audit supports preserving the **checks, invariants, and course-management reconciliation obligations**, not automatically preserving the **roles, agent choreography, phase count, artifact count, or deferred B3 architecture** through which prior work happened to implement them.

The same Candidate Workflow v0 should therefore be amended/revalidated against this cleaned set rather than replaced by a competing workflow.
