# Production System Requirements — Traceability / Necessity Audit

**Status:** CANDIDATE / NON-AUTHORITATIVE  
**Role:** Rebaseline audit record supporting the cleaned Production System Requirements  

This audit records how the preliminary requirement list was reduced to the cleaned candidate requirement set. It is evidence for evaluating the replacement workflow; it is not current production-process authority.

Until an explicit atomic cutover is accepted, `learner-encounter-production-process.md` remains current production-process authority.

## 1. Audit sources

The audit was grounded in the current course and repository authority/evidence, including:

- `course-exit-criteria.md`;
- `course-knowledge-map.md`;
- `pedagogical-foundations.md`;
- current Lesson 1 and Lesson 2 authority;
- `production-contract-v1.md`;
- `source-of-truth-hierarchy.md`;
- the current learner-encounter production process;
- Cycle 1 production, pre-build review, post-build conformance, pedagogy, and UX evidence under `course-design/production/cycle-1/`.

The purpose was not to prove that the current process is correct. It was to separate requirements supported by current authority or concrete failure evidence from architecture that merely existed in the legacy workflow.

## 2. Preliminary PSR disposition

| Preliminary item | Disposition | Rebaseline conclusion |
|---|---|---|
| PSR-01 — Current-state grounding | CONFIRMED | Keep. Work must begin from current baseline and current authority. |
| PSR-02 — Need before solution | CONFIRMED | Keep. A learner need/capability gap must justify the encounter. |
| PSR-03 — Bounded learner assumptions | CONFIRMED | Keep. Do not infer mastery from prior exposure. |
| PSR-04 — Case grounded in real data | KEEP, BUT DERIVED | Keep as part of case validity/credibility rather than as an independent workflow gate. |
| PSR-05 — Analytical/business legitimacy | CONFIRMED, SCOPED | Keep. The case must express a legitimate analytical/business need without forcing artificial framing. |
| PSR-06 — Evidence validity / no shortcut | CONFIRMED | Keep. Prior review evidence showed answer leakage and permissive validation can invalidate intended evidence. |
| PSR-07 — Support matches evidence | NARROW | Keep the support/evidence calibration requirement; do not require a specific assistance-provenance mechanism universally. |
| PSR-08 — Complete learner journey / continuity | CONFIRMED | Keep. Reasoning, SQL, produced evidence, and interpretation must remain coherent. |
| PSR-09 — Design boundary before implementation | CONFIRMED, NARROWED | Keep only for material decisions implementation would otherwise have to invent. |
| PSR-10 — No silent authority creation | DUPLICATE | Absorb into the implementation-boundary / no-invention requirements. |
| PSR-11 — Independent challenge | NOT ESTABLISHED AS UNIVERSAL | Independence may be useful by impact/risk, but current evidence does not justify a permanent universal independent-review stage. |
| PSR-12 — Validate actual runtime | CONFIRMED, NARROWED | Keep actual diff/runtime validation where behavior can be affected; no universal independent validation agent is implied. |
| PSR-13 — Validation by impact | CONFIRMED | Keep. Review depth follows actual risk and scope. |
| PSR-14 — Unrelated OPEN does not block | CONFIRMED | Keep. OPEN matters block only when current work genuinely depends on them. |
| PSR-15 — Explicit acceptance states | CONFIRMED | Keep. Implementation, scoped validation, acceptance, and release readiness are distinct. |
| PSR-16 — Preserve accepted behavior | CONFIRMED | Keep. Accepted behavior cannot be silently regressed or replaced. |
| PSR-17 — Durable decision trace | NARROW | Keep only the requirement that accepted decisions needed later become durable in current authority/state; no verbatim artifact-per-handoff requirement. |
| PSR-18 — Actual diff over self-report | CONFIRMED | Keep. Review concrete output rather than summaries alone. |
| PSR-19 — Residual-gap update after every Lesson | NOT ESTABLISHED | Capability coverage remains important, but a mandatory separate residual-gap update after every encounter was not established as a universal production requirement. |
| PSR-20 — Architecture neutrality | NOT A PRODUCT REQUIREMENT | Retain as a redesign guardrail: do not smuggle legacy topology into requirements. It is not itself a learner-product requirement. |

## 3. Concrete failure evidence that the cleaned requirements must protect against

The Cycle 1 record showed that useful controls existed underneath the legacy choreography. Examples include:

- a design could leak the intended structural conclusion through counts or explanatory material before the learner produced the protected reasoning;
- a Concept Moment could supply the conclusion that a later step purported to assess;
- control semantics could affect whether earlier prediction evidence remained valid or reviewable;
- SQL/result validation could be too permissive and accept an out-of-scope query merely because the final pair set matched;
- automatic wrong-answer guidance could materially scaffold the learner while the runtime still recorded the work as unassisted;
- a successful implementation or build did not by itself establish pedagogical or product acceptance.

These failures support requirements around evidence independence, support calibration, material design boundaries, actual runtime/diff validation, and explicit acceptance state. They do not by themselves prove that the exact legacy roles, handoffs, or number of review streams are necessary.

## 4. Clean requirement mapping

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
- PSR-C13 — Distinguish implementation, validation, and acceptance.

## 5. Architectural conclusion

The audit supports preserving the **checks and invariants**, not automatically preserving the **roles, agent choreography, phase count, or artifact count** through which the legacy process happened to implement those checks.

The next evaluation artifact therefore starts from the cleaned requirement set rather than from the old process diagram:

`course-design/production/rebaseline/candidate-workflow-v0.md`
