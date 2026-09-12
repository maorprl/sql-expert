# Learner Encounter Production Process

**Status:** CURRENT  
**Role:** Process and quality-control protocol for producing future learner encounters

This document defines the repeatable process for moving from the current trusted course state to the next justified learner encounter, implementation, validation, and coverage update.

It is **not** a pedagogical, visual, Stage, schema, or data source of truth. Those decisions remain in their dedicated current-source documents.

The process is designed to provide substantial agent autonomy without allowing agent autonomy to become course authority.

It is built around five distinct questions:

1. What capability, if any, should be developed next?
2. Does a justified learner situation and data case exist for developing it now?
3. Is the proposed encounter pedagogically and experientially sound?
4. Did implementation preserve the approved design?
5. What validated capability evidence now exists, and what gap remains?

---

## 1. Functional Roles

### 1.1 Encounter Architect

Owns the reasoning chain from capability need through encounter design.

Responsibilities:

- assess current capability coverage;
- identify the next required capability, if any;
- establish genuine prerequisites;
- establish the **Course-Assumed Learner State**;
- perform Case Validation;
- design the learner encounter;
- define intended learner evidence;
- define implementation invariants and permitted implementation discretion.

Cannot:

- approve its own capability decision;
- approve its own design;
- resolve OPEN course decisions;
- invent new course authority;
- declare its own encounter validated.

### 1.2 Pedagogy Reviewer

Independent from the Encounter Architect.

Operates at three points:

1. lightweight review of the Capability & Case Brief;
2. full review of the encounter design before implementation;
3. review of the actual learner experience after implementation.

Focus includes:

- capability justification;
- genuine prerequisites;
- Course-Assumed Learner State;
- sequencing;
- scaffolding;
- cognitive-load concerns;
- prior exposure versus first exposure;
- whether the learner actually performs the intended reasoning;
- whether the proposed evidence corresponds to the target capability;
- justified reuse versus unnecessary re-teaching;
- appropriateness of the learner situation.

The reviewer distinguishes between:

- authority violation;
- material professional concern;
- advisory professional recommendation;
- OPEN / owner decision.

The reviewer does not rewrite the encounter or establish new course authority through review comments.

### 1.3 Learning Experience / UX Reviewer

Independent from the Encounter Architect.

Reviews:

- the intended learning experience before implementation;
- the actual interactive experience after implementation.

Focus:

- learner orientation;
- visual hierarchy;
- continuity of the reasoning journey;
- attention choreography;
- evidence locality;
- progressive disclosure;
- interaction burden;
- role of teacher guidance;
- transitions between reasoning, tools, SQL workspace, and results;
- whether visual or interaction decisions accidentally perform reasoning for the learner.

UX recommendations cannot silently change pedagogy.

Professional UX recommendations that are not grounded in existing authority must be explicitly identified as **PROCESS / PROFESSIONAL PROPOSALS**, not existing course requirements.

### 1.4 Implementer

Receives frozen implementation authority and builds it.

May decide only implementation details explicitly within delegated discretion.

Must stop and raise a decision request when implementation exposes:

- pedagogical ambiguity;
- UX ambiguity affecting learner behavior;
- missing authority or evidence;
- design infeasibility;
- a likely design defect.

The Implementer cannot resolve these by silently choosing an interpretation.

### 1.5 Conformance & Validation Auditor

Independent from both the Encounter Architect and Implementer.

This is a **control function**, not a pedagogy or UX authority.

Before implementation, the Auditor checks that:

- the capability decision passed independent pedagogy review;
- Case Validation was completed;
- Course-Assumed Learner State was established;
- both expert design reviews were completed;
- findings received explicit disposition;
- OPEN matters were not silently resolved;
- required evidence/data sources were actually available;
- the design contains sufficient implementation authority;
- acceptance evidence is defined.

After implementation, the Auditor checks:

- implementation against frozen design authority;
- runtime behavior and state transitions;
- data / SQL / result contracts where relevant;
- undocumented deviations;
- whether required learner paths were exercised;
- whether required validation evidence was collected;
- whether all findings from the three post-build review streams received disposition.

The Auditor does **not** decide whether pedagogy should override UX or vice versa.

It applies the acceptance rules mechanically.

### 1.6 Course Authority Owner

Human authority is required only where existing sources cannot legitimately settle the issue.

Typical cases:

- resolving an OPEN decision;
- establishing a new course-wide principle;
- resolving a genuine authority conflict;
- accepting a material pedagogy-UX trade-off;
- approving an exception or waiver;
- changing Exit Criteria;
- declaring course-level completion.

Routine work that remains within current authority should not require manual owner approval at every cycle.

---

## 2. Phase 1 — Capability, Case and Course-Assumed Learner-State Brief

The Encounter Architect begins from the current trusted course state.

### 2.1 Capability Need

Determine:

- What required capability remains insufficiently covered?
- Which Exit Criterion requires it?
- What evidence already exists?
- Is the apparent gap:
  - an encounter gap;
  - an implementation gap;
  - a validation gap;
  - or a cumulative-progression gap?
- Is a new learner encounter actually necessary?

### 2.2 Genuine Prerequisites

For every proposed prerequisite ask:

> Could the learner meaningfully engage with the proposed capability without already possessing this earlier capability?

If yes, conceptual relatedness alone is insufficient to classify it as a required prerequisite.

### 2.3 Course-Assumed Learner State

This does **not** claim that an individual learner has mastered earlier material.

Record what the course may legitimately assume based on prior course state.

Useful distinctions include:

- **introduced** — the capability or idea has been presented;
- **supported / practised** — it has been exercised with support;
- **independently exercised** — the learner has been required to use it without that same level of support;
- **encounter-validated** — there is evidence that a prior encounter can elicit or expose the intended capability;
- **not yet established for cumulative transfer** — broader transfer or course-level independent performance has not yet been demonstrated.

The next encounter must not silently assume a stronger learner state than the evidence supports.

### 2.4 Case Validation

Case Validation determines whether the proposed situation can genuinely support the intended reasoning.

#### SOURCE-REQUIRED checks

Where applicable:

- the case must exercise a required capability;
- the relevant data structure must support the claimed relational behavior;
- relevant Grain, keys, relationships, and Cardinality must be correctly understood;
- schema or infrastructure features must not by themselves determine what is taught;
- intended learner evidence must be defined.

#### PROCESS / PROFESSIONAL PROPOSAL checks

These are useful quality judgments but must not be represented as existing course authority:

- whether the business or analytical situation is sufficiently credible;
- whether the framing feels artificially constructed around a concept;
- cognitive-load judgment beyond explicit existing principles;
- whether repetition is pedagogically worthwhile.

Professional judgment used to select or reject a case must be **consequence-grounded**. A label such as “clean,” “credible,” “artificial,” “familiar,” “high load,” or “good transfer” is not by itself a sufficient rationale. The Architect must identify:

1. the concrete feature of the learner situation or data that supports the judgment;
2. what that feature causes the learner to reason about, attend to, assume, or do;
3. how that learner consequence strengthens or weakens the intended capability evidence at the learner's current course position.

Business / analytical credibility must also be tested operationally. Ask:

> Would the task, requested output, and starting Grain still make analytical sense if the course were not trying to teach the target concept?

and:

> Does the relational difficulty arise naturally from that analytical need, or is the need mainly constructed in order to manufacture the target behavior?

A case does not fail merely because the target concept becomes visible in it. The concern is whether the analytical purpose independently justifies the task and output shape.

When more than one materially plausible current case can exercise the same target capability, Case Validation must compare the relevant alternatives rather than validate only the first sufficient case. The comparison should be proportionate, not exhaustive, and should consider where applicable:

- how directly each case exposes the target reasoning and intended evidence;
- instructional distinctness from recent encounters, including whether familiarity helps isolate the new reasoning or merely reduces meaningful transfer;
- continuity from the learner's current course position and usefulness for later transfer, without pre-deciding future Stage structure or encounter order;
- credibility of the business or analytical situation;
- additional concepts or confounds introduced by the actual data, such as unmatched rows, NULL behavior, or mechanisms outside the target capability;
- cognitive load and data cleanliness.

When alternatives have different strengths, the selection rationale must make the **trade-off explicit**. It must state which learner consequence matters more for the current encounter and why. No criterion such as local cleanliness, familiarity, authenticity, novelty, or transfer has automatic priority merely by being present.

The Architect must record why the selected case is preferable to the materially plausible alternatives considered. Technical validity or local cleanliness alone is not sufficient justification when another available case may better serve the learner's current progression.

A previously covered capability may legitimately recur when there is a distinct justified purpose, for example:

- reinforcement;
- reduced scaffolding;
- transfer;
- integration with another capability;
- stronger validation evidence.

These categories are **PROCESS PROPOSALS**, not an already-established RouteCraft unit taxonomy.

The relevant question is:

> Does this case repeat an already covered capability without a distinct and justified purpose?

### 2.5 Missing Data / Evidence Rule

Case Validation may not invent facts about unavailable schema, data, or runtime behavior.

If the justification depends on unavailable evidence such as:

- Grain;
- PK/FK structure;
- Cardinality;
- fan-out;
- NULL behavior;
- row counts;
- SQL result behavior;

the Architect must not assume it.

Possible result:

**MISSING AUTHORITY / EVIDENCE**

or:

**CONDITIONAL CASE VALIDATION**

A conditional result may allow conceptual exploration, but cannot promote the encounter to implementation-ready status until the required evidence is available.

### 2.6 Durable artifact — Capability & Case Brief

Contains only what is needed to make the decision:

- target capability;
- Exit Criteria trace;
- residual gap;
- prerequisite reasoning;
- Course-Assumed Learner State;
- Case Validation;
- comparative case rationale when materially relevant;
- intended evidence;
- source-required vs. process-proposal distinctions;
- missing evidence;
- OPEN exclusions;
- recommendation.

---

## 3. Lightweight Independent Pedagogy Gate

Before a full Encounter Design is produced, the Pedagogy Reviewer performs a narrow review of the Capability & Case Brief.

The reviewer checks only:

- does the claimed capability gap actually exist?
- is a new encounter required?
- are claimed prerequisites genuinely necessary?
- does the Course-Assumed Learner State avoid unsupported assumptions?
- can the proposed case exercise the intended capability?
- when multiple materially plausible cases exist, did the Brief compare the relevant alternatives and justify why the selected case is preferable for the learner's current course position rather than merely sufficient?
- are material professional judgments consequence-grounded rather than asserted only as labels?
- where alternatives involve real trade-offs, does the rationale explain which learner consequence should dominate now and why?
- where business / analytical credibility materially affects selection, is it supported by an independently coherent analytical task, requested output, and Grain rather than by concept-driven framing alone?
- is the proposed learner evidence relevant to that capability?
- does proceeding require an unresolved authority decision?

This is intentionally a lightweight gate.

It is not a full encounter review.

### Outcomes

- **PROCEED**
- **NO NEW ENCOUNTER REQUIRED**
- **VALIDATION / IMPLEMENTATION WORK ONLY**
- **REVISE**
- **MISSING AUTHORITY / EVIDENCE**
- **OWNER DECISION REQUIRED**

Only **PROCEED** opens Encounter Design.

---

## 4. Encounter Design

The Encounter Architect now produces the full encounter design.

It establishes:

- learner situation;
- learner goal;
- required reasoning;
- reasoning progression;
- learner actions;
- reveal order;
- concept timing;
- scaffolding;
- feedback and checks;
- SQL's role;
- evidence of understanding;
- learning-experience requirements;
- implementation invariants;
- permitted implementation discretion;
- validation criteria.

It must answer:

> What must the learner actually do that would constitute meaningful evidence of the capability approved at the Capability Gate?

### Durable artifact — Encounter Design Packet

This may map onto existing learner-route / interaction-decision documents rather than requiring a new repository file type.

---

## 5. Independent Pedagogy and UX Design Review

The same frozen Design Packet is reviewed independently by:

- Pedagogy Reviewer;
- UX Reviewer.

Neither reviewer should depend on the other's judgment when forming the initial review.

Each finding is classified as:

### BLOCKER

Contradicts current authority, invalidates the intended capability/evidence, or depends on an unresolved required decision.

### REVISION REQUIRED

A material professional defect that should be corrected before implementation.

A professional defect is **material** only when the reviewer identifies a concrete consequence for the target capability or evidence, learner reasoning, unsupported learner-state assumptions, or the current-scope learning experience, and explains why that consequence warrants rework before implementation. A concern that cannot establish such a consequence is **ADVISORY**, not REVISION REQUIRED merely because the reviewer prefers another design choice.

### ADVISORY

A professional improvement that is not required by current authority.

### OWNER DECISION REQUIRED

Cannot legitimately be settled from current sources.

Reviewers must clearly distinguish:

- **SOURCE-DERIVED requirement**;
- **PROFESSIONAL / PROCESS recommendation**.

### 5.1 Current-Scope Necessity Test

Before an existing **OPEN**, **BACKLOG**, deferred, or otherwise unresolved matter may be classified as **BLOCKER** or **OWNER DECISION REQUIRED**, the reviewer must establish that it is necessary to the **current implementation scope**.

The reviewer must ask:

1. Is this behavior or decision actually required in the current build?
2. If it remains unresolved, would the Implementer have to choose its semantics in order to implement or validate the accepted current scope?
3. Can the behavior instead remain explicitly excluded or deferred without undermining the target capability, required learner evidence, or current authority?

If the matter is not required in the current build and can remain explicitly outside the accepted scope, it must not be escalated merely because it could theoretically interact with the encounter. Record it as **OPEN / BACKLOG / OUT OF CURRENT SCOPE** or as an advisory scope note, as appropriate.

A theoretical dependency is not by itself an implementation dependency.

They do not directly rewrite the encounter.

---

## 6. Architect Reconciliation

The Encounter Architect responds to all findings.

Each receives one disposition:

- **ACCEPTED**;
- **ACCEPTED WITH MODIFICATION**;
- **REJECTED WITH RATIONALE**;
- **OWNER DECISION REQUIRED**.

A reviewer recommendation does not become authority merely because it is accepted as a useful local design choice.

If a recommendation creates a new course-wide rule, it must go through the appropriate authority process.

For any finding classified as BLOCKER or OWNER DECISION REQUIRED because of an unresolved OPEN / BACKLOG matter, the Architect must re-run the **Current-Scope Necessity Test** before carrying the escalation forward. If the matter can remain explicitly outside the current build without weakening capability, evidence, or authority, the reconciliation must return it to nonblocking OPEN / BACKLOG status and record the implementation boundary rather than requesting an unnecessary owner decision.

---

## 7. Auditor Pre-Build Control

The Conformance & Validation Auditor performs a formal process/conformance check.

It verifies:

- Capability Gate passed;
- required evidence sources are available;
- all design reviews are complete;
- all blockers are closed;
- all REVISION REQUIRED findings are resolved;
- every finding has disposition;
- no implementation-affecting OPEN issue has been silently resolved;
- validation criteria exist;
- implementation invariants are clear;
- permitted implementation discretion is clear.

An unresolved matter is **implementation-affecting** only if the accepted current build must implement that behavior, or if the accepted validation scope depends on it. An OPEN / BACKLOG matter that is explicitly excluded from the current build and can remain deferred without weakening the target capability, required evidence, or current authority is nonblocking. The Auditor must verify the exclusion boundary rather than route such a matter to the Course Authority Owner solely because the unresolved matter exists.

### Outcomes

- **PASS → Frozen Implementation Authority**
- **REVISE**
- **MISSING AUTHORITY / EVIDENCE**
- **OWNER DECISION REQUIRED**

The Auditor does not perform a new pedagogy or UX judgment at this point.

---

## 8. Frozen Implementation Authority

Once the pre-build gate passes, the approved design becomes the implementation authority for that build.

Any later design change must be explicit and routed according to the change rules below.

---

## 9. Implementation

The Implementer builds only within the frozen authority.

A lightweight implementation record captures:

- material discretionary decisions;
- deviations;
- unresolved ambiguities;
- change requests.

If a proposed implementation choice affects:

- pedagogy;
- learner reasoning;
- evidence;
- concept timing;
- UX semantics;
- learner flow;

it is outside implementation discretion.

---

## 10. Independent Post-Build Review

Validation occurs on the actual learner experience.

Three separate verdicts are produced.

### 10.1 Runtime / Conformance Verdict

Produced by the Auditor.

Checks:

- conformance with frozen design;
- required states and transitions;
- SQL/data/output contracts;
- deviations;
- required paths;
- required validation evidence.

### 10.2 Pedagogy Verdict

Produced by the Pedagogy Reviewer.

Checks:

- whether the learner actually performs the intended reasoning;
- whether implementation leaks or performs reasoning;
- whether scaffolding behaves appropriately in practice;
- whether concept timing is preserved;
- whether the collected evidence can support the intended capability claim;
- whether runtime exposed a design defect invisible during static review.

### 10.3 UX / Learning Experience Verdict

Produced by the UX Reviewer.

Checks:

- learner orientation;
- first-scan path;
- hierarchy;
- continuity;
- evidence locality;
- tool prominence;
- guidance salience;
- interaction burden;
- state transitions and accumulation;
- whether implementation altered the intended learning experience.

---

## 11. Rule-Based Acceptance Gate

Acceptance is not a new expert judgment.

The Auditor verifies whether the declared conditions are satisfied.

### VALIDATED TO SCOPE is possible only when:

- no open BLOCKER exists in Runtime/Conformance, Pedagogy, or UX;
- no unresolved REVISION REQUIRED finding exists;
- every deviation from frozen design is documented and resolved;
- all required acceptance evidence has been collected;
- no unresolved OPEN issue affects the behavior being accepted;
- all three review streams have published their verdicts;
- every material finding has explicit disposition.

If these conditions are satisfied, acceptance is mechanical.

If they are not, the corresponding route is triggered.

The Auditor cannot resolve a pedagogy-UX disagreement.

A genuine unresolved professional conflict not settled by current authority goes to the Course Authority Owner.

### Outcomes

- **VALIDATED TO SCOPE**
- **IMPLEMENTATION FIX**
- **UX REVISION**
- **PEDAGOGY / DESIGN REVISION**
- **EVIDENCE DESIGN REVISION**
- **CAPABILITY / CASE REOPENED**
- **MISSING AUTHORITY / EVIDENCE**
- **OWNER DECISION REQUIRED**
- **ACCEPTED WITH NONBLOCKING BACKLOG**

Acceptance does not mean learner mastery.

It means:

> The implemented encounter has been independently verified, to its stated scope, as conforming to approved authority and as capable of eliciting the identified learner evidence.

---

## 12. Change Impact and Re-Review Rules

Not every correction restarts the full cycle.

### 12.1 Implementation-only change

Examples:

- technical bug;
- state logic defect;
- incorrect SQL result rendering;
- implementation divergence with no design change.

Requires:

- Auditor re-validation;
- only those post-build specialist reviews whose observed experience could have changed.

### 12.2 UX-only change with no pedagogical effect

Requires:

- UX Reviewer;
- Auditor.

Pedagogy review is not repeated unless the UX change affects learner reasoning, concept timing, scaffolding, or evidence.

### 12.3 Pedagogical or learner-evidence change

Requires:

- Pedagogy Reviewer;
- UX Reviewer if the learning experience is affected;
- Auditor.

### 12.4 Capability, prerequisite, Course-Assumed Learner State, or Case-justification change

Returns to:

**Capability & Case Brief → Lightweight Pedagogy Gate**

### 12.5 OPEN / authority-triggering change

Stops affected work and routes to Course Authority Owner only when the unresolved matter is required inside the affected current scope. If the matter can remain explicitly deferred and outside the accepted scope, preserve it as OPEN / BACKLOG and continue the unaffected work.

---

## 13. Cycle Closure

After acceptance, update the existing management state:

**Exit Criterion → required capability → prerequisites → encounter contribution → validation evidence → residual gap**

Also record:

- Course-Assumed Learner State that future work may safely rely upon;
- remaining validation limits;
- OPEN matters;
- nonblocking backlog.

The next cycle does not automatically produce another Stage.

It begins again with:

> What capability, if any, is now genuinely required?

---

## 14. Minimum Durable Record Set

Avoid creating a new file for every conceptual distinction.

The minimum useful durable records are:

1. **Capability & Case Brief**
2. **Encounter Design Packet**
3. **Expert Review + Reconciliation Record**
4. **Implementation / Deviation Record**
5. **Validation / Acceptance Record**
6. existing **Capability Coverage / Work Management state**

OPEN decisions remain in the appropriate authority/management location rather than requiring a duplicate universal register.

---

## 15. Required Independence

Mandatory:

- Encounter Architect ≠ formal Pedagogy Reviewer;
- Encounter Architect ≠ formal UX Reviewer;
- Implementer ≠ Conformance & Validation Auditor;
- OPEN authority decisions ≠ autonomous agent decisions.

Permitted combinations:

- capability planning + encounter design;
- design + initial traceability;
- pre-build and post-build review by the same independent discipline reviewer;
- conformance checking + runtime validation;
- orchestration + mechanical gate enforcement.

“Independent” means independent judgment and context, not necessarily a different model vendor.

---

## 16. Core Process

```text
Current trusted course state
        ↓
Capability + Case + Course-Assumed Learner-State Brief
        ↓
Lightweight Independent Pedagogy Gate
        ↓
Encounter Design
        ↓
Independent Pedagogy Review + Independent UX Review
        ↓
Architect Reconciliation
        ↓
Auditor Pre-Build Control
        ↓
Frozen Implementation Authority
        ↓
Implementation
        ↓
Runtime/Conformance Validation
+ Post-Build Pedagogy Review
+ Post-Build UX Review
        ↓
Rule-Based Acceptance Gate
        ↓
Capability Coverage + Evidence + Residual Gap Update
        ↓
Next cycle
```

The process is autonomous wherever current authority and evidence are sufficient.

It stops where continuing would require an agent to invent authority, assume unavailable evidence, or certify its own material judgment.