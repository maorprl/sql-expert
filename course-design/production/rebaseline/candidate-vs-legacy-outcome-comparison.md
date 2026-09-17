# Candidate Workflow v0 vs Legacy Process — Outcome / Failure-Protection Comparison

**Status:** CANDIDATE EVALUATION / NON-AUTHORITATIVE  
**Scope:** Production-system rebaseline Substep 6  

This comparison asks one question:

> Does Candidate Workflow v0 preserve the protections that mattered in the legacy learner-encounter production process without requiring the legacy role topology, phase choreography, or artifact count?

It does not score the two processes by structural similarity. The legacy process remains current authority until the atomic cutover in Substep 7.

## 1. Evidence used

The comparison uses:

- `learner-encounter-production-process.md`;
- the cleaned requirements and traceability audit under `course-design/production/rebaseline/`;
- the Lesson 3 candidate-workflow dry run;
- concrete Cycle 1 review evidence, including pre-build pedagogy and UX review and post-build runtime/pedagogy review;
- current Source-of-Truth and Production Contract boundaries.

The Cycle 1 record matters because it shows which controls caught real defects rather than merely appearing in a process diagram.

## 2. Protection comparison

| Protection / failure mode | Legacy mechanism | Candidate protection | Result |
|---|---|---|---|
| Start from actual accepted product and current authority | Capability/Case brief + execution mapping + role gates | Establish Basis | PRESERVED with less choreography |
| Do not pick the next Lesson because historical material exists | Architect capability-gap work + gate | Establish Basis + Define the Encounter | PRESERVED |
| Avoid overstating learner mastery from prior exposure | Course-Assumed Learner State + pedagogy review | bounded learner assumptions in Basis + encounter definition | PRESERVED |
| Ensure case is real, schema/data-valid, and analytically credible | formal Case Validation | Define the Encounter | PRESERVED |
| Compare materially plausible cases rather than accept first sufficient case | explicit comparative Case Validation requirement | dry run performed proportional comparison, but v0 did not state this clearly enough | PRESERVE AS CONDITIONAL TECHNIQUE |
| Prevent counts/wording/scaffolds from shortcutting intended reasoning | Evidence Independence Test + pedagogy review | valid learner evidence + reveal/shortcut constraints + support calibration | PRESERVED |
| Prevent teaching from supplying a conclusion later claimed as evidence | pedagogy/UX review caught Fan-out Concept Moment leakage | evidence validity + coherent journey + support calibration | PRESERVED; independent challenge can strengthen detection |
| Keep assistance strength truthful to learner evidence | scaffolding calibration + provenance rules + post-build review | support/evidence calibration; actual runtime validation | PRESERVED AS OUTCOME; no universal provenance mechanism required |
| Keep learner journey coherent, evidence local, and visually understandable | separate pedagogy + UX review streams | coherent learner journey + current visual/control authority + impact validation | PRESERVED; no need for fixed UX-review phase every time |
| Do not let unresolved global controls silently corrupt protected evidence | UX finding + owner clarification + Current-Scope Necessity | Make It Buildable: material OPEN blocks only when current implementation depends on it | PRESERVED |
| Prevent implementer from creating pedagogy/behavior decisions | Frozen Implementation Authority + Implementer stop rules + Auditor | Make It Buildable + Build stop conditions | PRESERVED |
| Ensure a finished design packet is not automatically authority | frozen-authority choreography | dry run exposed this gap; candidate now requires accepted material decisions to be promoted into current authority before Build | PRESERVED AFTER CANDIDATE CLARIFICATION |
| Detect implementation that matches output but violates intended SQL/operation scope | independent post-build runtime/conformance auditor | actual diff/runtime validation + SQL/result semantic validation against current authority | PRESERVED as validation requirement; fixed Auditor role not required |
| Detect implementation evidence-state bugs | post-build pedagogy/runtime/UX streams | validation by impact includes learner-evidence and state semantics | PRESERVED |
| Preserve accepted Lessons outside the change | frozen baseline + conformance audit | preserve accepted product + impact-based regression | PRESERVED |
| Keep unrelated OPEN matters from blocking | Current-Scope Necessity Test | explicit no-silent-decision rule; unrelated OPENs do not block | PRESERVED |
| Distinguish implementation from validation and acceptance | formal gates/verdicts | explicit state vocabulary and Accept/Reconcile | PRESERVED |
| Keep accepted decisions durable | verbatim handoffs + provenance + reconciliation artifacts | accepted decisions must become current authority/state; evidence kept only where needed | PRESERVED with materially lower artifact burden |

## 3. What independent review actually contributed

Cycle 1 independent review was not valueless. It caught real problems:

- pre-build pedagogy review identified an instance-count shortcut that could replace Cardinality reasoning;
- both pedagogy and UX review identified a Concept Moment that could supply a later learner-evidence conclusion;
- UX review identified that unresolved Back/Retry/Show-solution semantics could corrupt a protected prediction and that the committed prediction needed practical access during verification;
- post-build runtime review found a concrete SQL verifier counterexample that accepted an out-of-scope multi-relation/window-function query because the final result still matched;
- post-build pedagogy review found that automatic corrective guidance could leave materially scaffolded work labeled `Unassisted`, and that post-completion Show-solution use could mutate evidence provenance.

The lesson is **not** that every future encounter requires permanent Pedagogy Reviewer, UX Reviewer, and Auditor roles.

The supported conclusion is narrower:

> A material design or implementation with meaningful evidence, pedagogy, UX, or conformance risk may benefit from a challenge perspective that did not author the decision being challenged.

Therefore Candidate Workflow should preserve **risk-triggered independent challenge as an available control**, without making it a mandatory permanent role or phase for every change.

## 4. Legacy mechanisms that are not independently justified as universal requirements

The comparison found no outcome-level need to preserve these as mandatory universal mechanics:

- permanent Encounter Architect role;
- permanent Pedagogy Reviewer role;
- permanent UX Reviewer role;
- permanent Auditor role;
- one-role-per-agent topology;
- separate Lightweight Pedagogy Gate for every encounter;
- mandatory parallel pedagogy + UX reviews for every design;
- mandatory Architect Reconciliation phase and artifact;
- role-permitted-next execution mapping;
- a separate frozen-authority handoff document when current encounter authority already carries the accepted decisions;
- verbatim file handoff for every transition;
- `provenance.md` tracking every artifact as a universal requirement;
- mandatory Implementation Record form for every build;
- three separate post-build verdict streams regardless of impact;
- full-cycle restart for every defect.

These mechanisms may still be selected when a particular risk, coordination topology, or audit need justifies them. They are not requirements merely because Cycle 1 used them.

## 5. Candidate refinements required by the comparison

Two conditional protections should be explicit in Candidate Workflow v0 before cutover.

### 5.1 Proportional case comparison

When more than one materially plausible current case could exercise the same capability and the alternatives create meaningful learner trade-offs, **Define the Encounter** should compare the relevant alternatives proportionally and record why the selected case is preferable for the current learner need.

This is not a requirement to produce a case matrix for every Lesson.

### 5.2 Risk-triggered independent challenge

Before candidate encounter decisions are promoted into current authority, obtain an independent challenge when the consequence of a design error is material and the decision is meaningfully uncertain or difficult to self-validate — especially around protected learner evidence, answer leakage, substantial scaffolding, novel interaction semantics, competing case trade-offs, or genuine cross-domain tension.

The challenger supplies evidence; it does not become authority. The need is triggered by risk, not by a permanent role name or fixed review count.

Likewise, post-build independent validation may be warranted where the impact or evidentiary claim makes author-only validation insufficient. This is compatible with Candidate Workflow's impact-based validation rather than a fixed Auditor role.

## 6. Comparison verdict

**PASS AFTER TWO NARROW CANDIDATE REFINEMENTS.**

Candidate Workflow v0 preserves the substantive protections supported by current authority and concrete Cycle 1 failure evidence while removing choreography that is not independently justified as universal.

The Lesson 3 dry run already corrected the first material candidate gap: candidate design does not become implementation authority merely by being complete.

This comparison adds two conditional protections:

1. proportional comparison of materially plausible case alternatives when the trade-off matters;
2. risk-triggered independent challenge where a material design/validation claim is meaningfully uncertain.

With those refinements incorporated, no legacy role, phase, handoff, or fixed review stream was found to be necessary as a universal requirement for the replacement workflow.

Substep 6 may therefore close and the rebaseline may proceed to Substep 7: atomic documentation cutover. That cutover must still preserve one current process authority and must not authorize or implement Lesson 3 itself.
