# Independent Learning Experience / UX Design Review — Cycle 1

## 1. Review basis and independence statement

This is the independent pre-implementation Learning Experience / UX review of the frozen Cycle 1 Encounter Design Packet.

The mandatory entry gate was satisfied before review began:

- `course-design/production/cycle-1/provenance.md` marks the Capability & Case Brief **VERBATIM VERIFIED**.
- `course-design/production/cycle-1/provenance.md` marks the Lightweight Pedagogy Gate Review **VERBATIM VERIFIED**.
- `course-design/production/cycle-1/provenance.md` marks the Encounter Design Packet **VERBATIM VERIFIED**.
- `learner-encounter-production-execution.md` identifies the Independent Pedagogy Design Review and Independent UX Design Review as the current next actions and authorizes both to consume the same frozen Encounter Design Packet.

The review was formed independently. I did not read, search for, or use any Independent Pedagogy Design Review output from this Cycle, and no other reviewer’s judgment was used as evidence.

The review applies the Learning Experience / UX Reviewer role defined in `learner-encounter-production-process.md`: learner orientation, visual hierarchy, continuity of the reasoning journey, attention choreography, evidence locality, progressive disclosure, interaction burden, teacher-guidance role, transitions between reasoning/tools/SQL/results, and the risk that UX or visual treatment performs reasoning for the learner.

The governing review rule is preserved throughout:

> translate established pedagogy into an effective learning experience; do not redesign pedagogy through UX review.

Where a recommendation below is not directly required by existing authority, it is explicitly labeled **PROFESSIONAL / PROCESS RECOMMENDATION**.

## 2. What was reviewed

The object under review was:

- `course-design/production/cycle-1/encounter-design-packet.md`

The following current sources were read before forming the review:

- `learner-encounter-production-process.md`
- `learner-encounter-production-execution.md`
- `agent-assisted-work-protocol.md`
- `pedagogical-foundations.md`
- `course-design/course-visual-language.md`
- `course-design/course-controls.md`
- `course-design/stage-1/stage-1-learner-route.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`
- `course-design/test-drives/stage-1-targeted-test-drive-2026-09-10.md`
- `course-design/production/cycle-1/capability-and-case-brief.md`
- `course-design/production/cycle-1/lightweight-pedagogy-gate-review.md`
- `course-design/production/cycle-1/encounter-design-packet.md`

No preserved Stage 3 material was inspected. No additional schema/seed inspection was required for this UX review because the concrete data behavior needed for the experience assessment is already established in the verified Cycle 1 handoffs and the current Stage 1 sources.

The review evaluates the frozen design as written. It does not rewrite the encounter, replace the learner reasoning, choose a new teaching approach, or begin implementation.

## 3. Findings

### Finding UX-1 — Global Back / Retry / Show solution semantics materially affect protected prediction evidence

**Classification:** OWNER DECISION REQUIRED  
**Basis:** SOURCE-DERIVED REQUIREMENT

**Affected parts of the Encounter Design Packet:**

- §15 `Prediction required before execution`
- §16 `Reveal order`
- §19 `Scaffolding and hint logic`
- §23 `Evidence of understanding`
- §27 `Implementation invariants`
- §30 `Relevant OPEN / owner decisions`

**Concrete learner-experience problem**

The encounter makes the learner’s committed pre-execution prediction part of the required evidence. The design also requires that the execution result not become available as evidence until that prediction has been committed.

At the same time, current course authority requires the global controls **Back**, **Retry / Redo**, and **Show solution**, while `course-design/course-controls.md` explicitly leaves their material state semantics OPEN and forbids implementation from silently deciding them.

That OPEN state is no longer purely abstract in this encounter:

- If **Back** or **Retry / Redo** can return to the prediction after the learner has seen the 18-row result and then overwrite the committed prediction, the design can no longer distinguish a genuine pre-execution prediction from a post-result reconstruction.
- If changing an earlier prediction does or does not invalidate downstream SQL execution/results, that choice affects learner evidence and state semantics.
- If **Show solution** is available during the protected prediction state, its behavior can reveal the multiplication, repetition, or natural-Grain conclusion that the learner is required to establish before execution.
- If Show solution is unavailable there, availability itself is a global-control behavior that current authority has not yet settled for tasks of this kind.

The Encounter Design Packet currently lists permanent Back / Retry / Show solution semantics as broader OPEN matters and states that none is required to settle the local learner flow. For this encounter, that statement is too strong: at least the subset of those semantics that can alter, invalidate, or reveal the protected prediction state directly affects the local evidence contract.

**Why it matters**

This is not a cosmetic control decision. It affects whether the learner’s “prediction before execution” evidence is temporally meaningful and whether the reveal order remains real in the interactive experience.

`learner-encounter-production-process.md` requires implementation-affecting OPEN issues not to be silently resolved and routes genuine authority decisions to the Course Authority Owner. `course-design/course-controls.md` also explicitly says these semantics remain OPEN.

**Condition that must be satisfied**

Before pre-build control can pass, the Course Authority Owner must establish or explicitly authorize a scoped treatment for the global-control behavior needed by this encounter. At minimum, the durable authority must settle enough to determine:

- what happens to the committed pre-execution prediction if the learner navigates back or retries after SQL/result evidence has been seen;
- whether downstream execution/result state is preserved, invalidated, or otherwise treated when earlier protected evidence changes;
- whether Show solution is available during the protected prediction state and, if so, how revealing it affects required learner evidence and progression.

The UX reviewer does not select those semantics. They cannot legitimately be invented by implementation.

---

### Finding UX-2 — Final verification does not yet guarantee practical access to the learner’s committed prediction

**Classification:** REVISION REQUIRED  
**Basis:** SOURCE-DERIVED REQUIREMENT

**Affected parts of the Encounter Design Packet:**

- §23 `Evidence of understanding`
- §26 `Learning-experience requirements`
- §27 `Implementation invariants`
- §29 `Validation criteria`
- §32 `Traceability: approved capability → learner action → evidence`

**Concrete learner-experience problem**

The final verification is explicitly a reconciliation of actual result behavior with the learner’s earlier prediction. The packet correctly requires the SQL result to remain visible while the learner verifies it, and it requires completed reasoning evidence to remain reviewable.

However, it does not explicitly require the **committed prediction itself** to remain visible or immediately recoverable at the point where the learner is asked to compare the actual result against it.

“Completed reasoning remains reviewable” is weaker than the evidence-locality requirement needed here. An implementation could satisfy generic reviewability by placing the prediction in a remote Completed Steps area, collapsed history, or another page region while the result and final verification occupy the active workspace. The learner would then have to remember the earlier prediction or leave the result-verification context to recover it.

**Why it matters**

Current visual authority requires the active action/evidence cycle to remain spatially coherent, supporting references needed for the current action to remain practically available, and completed work not to dominate or displace the current task. The course’s guided-reasoning foundation also requires the learner to remain oriented to what has already been established and why the next move is relevant.

In this encounter, the prior prediction is not merely historical review material. It is reference evidence for the final reconciliation task.

**Condition that must be satisfied**

Architect Reconciliation should add an implementation invariant and corresponding validation criterion requiring the learner’s committed pre-execution prediction to be **visible or immediately recoverable from the verification context** while the actual SQL result remains the primary evidence surface.

The exact mechanism remains implementation discretion. The requirement does not prescribe a sidebar, summary card, expansion pattern, or fixed layout. It only requires that the learner not have to rely on memory or abandon the result-verification context to recover the prediction being tested.

---

### Finding UX-3 — The Fan-out Concept Moment can pre-answer part of the later duplication-diagnosis evidence unless its explanatory boundary is constrained

**Classification:** REVISION REQUIRED  
**Basis:** SOURCE-DERIVED REQUIREMENT

**Affected parts of the Encounter Design Packet:**

- §12 Episode C `Name the behavior`
- §20 `Feedback and checks`
- §22 `Relevant visual / relational representations`
- §23 `Evidence of understanding`
- §24 `Success criteria`

**Concrete learner-experience problem**

After the learner correctly predicts multiplication and repetition, Episode C introduces **Fan-out** and says the Concept Moment explicitly distinguishes:

- repeated source information;
- duplicate source rows in the base table.

Later, after execution, required learner evidence includes determining that the repeated source values are structural repetition across distinct source–article matches rather than accidental duplicate source records.

Without a clearer boundary, the pre-execution Concept Moment can state the very result-diagnosis conclusion that the learner is later supposed to establish from the returned rows. That would make the post-execution verification partly a recall task: the interface would have already classified the forthcoming repetition for the learner.

**Why it matters**

Current foundations require guidance to preserve continuity **without performing the reasoning for the learner**. Current visual authority also requires explanatory aids not to give away answers prematurely. The packet itself correctly protects result interpretation from premature execution feedback; the same principle needs to cover the Concept Moment immediately before execution.

This finding does not object to naming Fan-out after successful prediction. That timing is coherent. The issue is the boundary between teaching the general term/mechanism and announcing the learner’s later result-specific diagnosis.

**Condition that must be satisfied**

Architect Reconciliation should constrain the Fan-out Concept Moment so it may:

- name the behavior the learner has already predicted;
- explain the general one-to-many multiplication mechanism;
- clarify the conceptual distinction between structural repetition and duplicate base records;

but it must not pre-classify the **forthcoming observed result** in a way that makes the later diagnosis answerable by repeating a conclusion already supplied by the course.

The post-execution task must still require the learner to use the actual returned rows to decide why the observed source-name repetition occurred.

---

### Finding UX-4 — Composite prediction and verification states need careful grouping to avoid a form-like interaction burden

**Classification:** ADVISORY  
**Basis:** PROFESSIONAL / PROCESS RECOMMENDATION

**Affected parts of the Encounter Design Packet:**

- §12 Episode B `Predict the proposed JOIN`
- §12 Episode E `Reconcile result with prediction`
- §28 `Permitted implementation discretion`

**Concrete learner-experience problem**

Episode B contains three connected structural judgments plus a later row-count judgment. Episode E contains three further verification judgments. All are legitimate evidence distinctions, and this review does not recommend removing them.

The risk is compositional: if implementation renders each judgment as another equally prominent card/check/continue state, the encounter can become a questionnaire sequence rather than one continuous reasoning problem. Conversely, if all judgments appear simultaneously as a dense form, first-scan clarity and the sense of one current reasoning move can weaken.

This is especially relevant because the current visual language requires one dominant current focus and warns against accumulated completed history becoming the first scan path.

**Why it matters**

The target capability is a connected relational inference, not success at navigating many separate UI states. Interaction mechanics should expose the necessary distinctions without making the learner repeatedly relocate attention or mentally reconstruct the common problem frame.

**Recommended condition**

During reconciliation and implementation, treat each prediction/verification episode as one coherent reasoning workspace with a clear current focus, and keep already-completed subjudgments compact as the learner progresses. Avoid both a wall of simultaneous co-primary questions and an unnecessarily long stack of independent task cards.

This is a professional UX recommendation, not a new course-wide interaction rule.

## 4. Cross-cutting learning-experience assessment

### Learner orientation and first-scan path

The design has a strong orienting question:

> Can this proposed JOIN be used without breaking the source-level report?

That gives the encounter a coherent decision frame rather than presenting fan-out as an abstract definition. The proposed role changes are also intelligible at design level: reasoning leads before SQL, SQL becomes primary only after prediction, and the result becomes the primary evidence surface after execution.

The design is therefore compatible with the current visual-language requirement that visual hierarchy follow the learner’s current action rather than assign fixed prominence to the Working Schema, editor, or completed history.

The primary remaining orientation risk is not the overall route but the local state composition described in Finding UX-4.

### Continuity of the reasoning journey

The central chain is coherent and easy to trace:

business source-level requirement → requested Grain → known 1:M relationship → multiple matches → repeated source information → different natural result Grain → prediction → SQL test → result reconciliation.

The encounter reuses familiar PK/FK, Cardinality, Grain, JOIN semantics, and the known relation pair without re-running the first-JOIN teaching sequence. This reduces unnecessary context switching and allows the new learner problem to remain row multiplication.

The design also avoids turning SQL into discovery. That is important for continuity: execution arrives as a test of an already-formed relational prediction rather than as a separate exploratory activity.

### Attention choreography and progressive disclosure

The reveal order is largely strong:

- requested Grain precedes the relational consequence;
- the known relationship is available for reasoning;
- multiplication is predicted before the result is shown;
- `fan-out` is named after the learner derives the behavior;
- no output-fan visual appears before the prediction;
- SQL follows the reasoning;
- the result precedes the final interpretation.

This is a plausible progressive-disclosure sequence within the current visual language.

Finding UX-3 identifies the one material leakage risk: the Fan-out Concept Moment must not turn the later result-specific duplication diagnosis into a supplied conclusion.

### Evidence locality

The packet correctly requires the result and final verification to remain spatially associated. It also states that completed reasoning remains reviewable.

The unresolved locality issue is the earlier committed prediction. Because the final task is a comparison against that prediction, practical access to it should be frozen as part of the verification experience rather than left to generic completed-step review behavior. Finding UX-2 addresses this.

### Working Schema and reference surfaces

The Working Schema behavior is appropriate for this encounter. The relation pair is supplied because relation identification is not an evidence target, and the known PK/FK plus `1 → M` relationship may be visible because the approved capability assumes a known one-to-many relationship.

This does not prematurely reveal the new target behavior by itself. The design also correctly keeps the Working Schema schema-level rather than turning it into an instance-data browser.

The Working Schema can therefore function as a reference surface during prediction and SQL work without needing to become the primary action surface throughout the encounter.

### SQL workspace and transition into execution

The SQL role is well bounded. There is no Baseline `COUNT(*)` episode and no second JOIN lesson. Learner-authored SQL is used to implement the proposed operation and create evidence for checking the prior prediction.

That supports a clean transition from reasoning to tool use: the editor can legitimately become primary only after the relational decision has been made, with the Working Schema remaining secondary but practically available.

The design also correctly prevents successful execution from announcing the final interpretation.

### Completed Steps and state accumulation

The packet preserves the course requirement that required reasoning evidence remains reviewable and allows compact presentation of completed evidence. That is sufficient authority for an implementation that keeps history quieter than the active task.

Because this encounter contains several evidence-bearing subjudgments inside two main reasoning episodes, implementation should avoid allowing completed micro-states to accumulate into a competing primary lane. This is the advisory concern in Finding UX-4, not a request to remove evidence.

### Teacher-guidance role

The packet preserves the distinct teacher/course-guidance role and requires correct feedback to consolidate what has been established and make the next move legible without giving away the next answer. That is compatible with current visual authority and the guided-reasoning foundation.

The September 10 Stage 1 test-drive remains useful non-authoritative evidence that overly formal, abstraction-heavy teacher voice can weaken orientation even when the logical sequence is correct. The current packet gives implementation discretion over exact wording, so this review does not convert that observation into a new wording rule. Post-build UX review should explicitly inspect whether the implemented bridges feel like recognizable guidance rather than status text or a chain of assessment prompts.

### Compatibility with current visual language and course controls

The encounter can plausibly be represented within the existing visual language without inventing a new permanent UI architecture. The current language already supports:

- changing primary surfaces as the learner’s task changes;
- quiet, reviewable completed work;
- Working Schema as a reference surface;
- Concept Moments;
- teacher guidance;
- SQL authoring and result evidence;
- local explanatory relational visuals.

The exception is the still-OPEN global-control semantics identified in Finding UX-1. Those are not safe implementation details in this encounter because they can change the integrity of the protected prediction evidence.

## 5. OPEN / owner matters

One owner matter affects this encounter materially:

- **Global Back / Retry / Show solution semantics where they intersect the protected pre-execution prediction and downstream SQL/result evidence.** This is Finding UX-1 and requires Course Authority Owner treatment before pre-build control can legitimately pass.

The other broader OPEN matters listed in the Encounter Design Packet — Stage structure beyond current Stage 1, overall course progression, broader initial schema exposure, cumulative-transfer status, and permanent course-wide architecture questions unrelated to this encounter’s protected evidence — do not need to be resolved by this UX review.

No additional Course Authority Owner matter was identified.

## 6. Review conclusion

**BLOCKER:** none.

**REVISION REQUIRED:** yes. Two findings require reconciliation before implementation:

1. guarantee practical access to the committed pre-execution prediction during final result verification;
2. constrain the Fan-out Concept Moment so it does not pre-answer the later result-specific duplication diagnosis.

**OWNER DECISION REQUIRED:** yes. The global Back / Retry / Show solution semantics materially intersect the protected prediction/evidence contract and cannot be silently selected by implementation.

**ADVISORY:** one professional interaction-composition recommendation concerns avoiding a form-like accumulation of prediction and verification subjudgments while preserving all required evidence.

From the Learning Experience / UX review perspective, the design **can proceed to Architect Reconciliation**.

It should **not** proceed from reconciliation to frozen implementation authority until the two REVISION REQUIRED findings have received satisfactory disposition and the OWNER DECISION REQUIRED control-semantics issue has been resolved or explicitly authorized through the proper authority route.

This review does not describe the Encounter Design as approved or validated. It is an independent design-review input to Architect Reconciliation.