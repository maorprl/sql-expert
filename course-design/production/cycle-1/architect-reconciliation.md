# Cycle 1 — Architect Reconciliation

## 1. Reconciliation basis

This reconciliation is performed under the Encounter Architect role for Cycle 1.

The durable entry gate passed on the current default branch (`main`):

- `course-design/production/cycle-1/provenance.md` records the Capability & Case Brief, Lightweight Pedagogy Gate Review, frozen Encounter Design Packet, Independent Pedagogy Design Review, and Independent UX Design Review as **VERBATIM VERIFIED**.
- `learner-encounter-production-execution.md` identifies **Architect Reconciliation** as the current authorized next phase.
- The frozen design reviewed by both independent reviewers remains `course-design/production/cycle-1/encounter-design-packet.md` and is not modified by this reconciliation.
- This reconciliation uses the full durable review artifacts:
  - `course-design/production/cycle-1/independent-pedagogy-design-review.md`
  - `course-design/production/cycle-1/independent-ux-design-review.md`

Governing process:

- `learner-encounter-production-process.md`
- `agent-assisted-work-protocol.md`

Current authority consulted where findings require it:

- `pedagogical-foundations.md`
- `course-design/course-visual-language.md`
- `course-design/course-controls.md`

The approved capability and case are not reopened. The reconciled design preserves:

- reuse of known Grain, Cardinality, PK/FK, JOIN vocabulary, and JOIN matching semantics;
- `news_source → news_article` as the approved case;
- one-to-many row multiplication / repeated one-side information / changed natural result Grain as the new target;
- required prediction before SQL execution;
- SQL as implementation / verification rather than discovery;
- `fan-out` as terminology attached after the learner has reasoned about the behavior.

No reconciliation disposition below creates a new course-wide rule. Local accepted recommendations remain local Cycle 1 design choices unless separately established as broader authority.

---

## 2. Finding-by-finding disposition — Pedagogy Review

### P1 — Current-data counts can provide a shortcut around the intended Cardinality-based prediction

**Reviewer classification:** REVISION REQUIRED  
**Reviewer basis:** SOURCE-DERIVED REQUIREMENT  
**Disposition:** **ACCEPTED**

**Reasoning**

The finding is correct. In the frozen packet, Episode B permitted exposure of both `4 source rows` and `18 article rows` before the learner completed the structural prediction. That creates an alternate route to the intended answers: repeated source participation can be inferred from the instance counts without actually applying the known `1:M` relationship and JOIN matching semantics.

That weakens the evidentiary link between the approved capability and the learner's pre-execution response. The approved target requires relationship-structure reasoning, not a numerical shortcut.

**Exact design consequence**

The pre-execution prediction is split into two ordered layers inside the same prediction episode:

1. **Structural prediction first, without instance counts.**
   The learner sees the established `news_source 1 → M news_article` relationship and must commit the structural judgments:
   - one source can contribute multiple raw JOIN rows;
   - one-side source information can repeat;
   - one raw result row naturally represents one source–article match.

2. **Current-data numeric consequence second.**
   Only after the structural prediction is committed may the encounter reveal that the current dataset contains 18 article rows and that every article belongs to exactly one source. The learner then predicts 18 source–article matches.

The learner-facing `4 source rows` count is not needed for the structural prediction and is not exposed before it. The exact `18` count remains a secondary prediction/verification detail, not the evidence basis for multiplicity or Grain change.

**Changed design dimensions**

- Learner reasoning: **Yes** — structural reasoning is now explicitly protected from the count shortcut.
- Reveal order: **Yes** — instance count appears only after structural prediction is committed.
- Scaffolding: **Yes** — the numeric prompt becomes a later consequence layer.
- Learner evidence: **Yes** — structural evidence is captured before count information.
- Learning experience / UX requirement: **Yes** — the prediction episode must preserve the structural-first progression.
- Implementation invariant: **Yes**.
- Validation criterion: **Yes**.

**Remaining OPEN / authority matter**

None for this finding.

---

### P2 — The Fan-out Concept Moment supplies part of a diagnostic conclusion later claimed as learner evidence

**Reviewer classification:** REVISION REQUIRED  
**Reviewer basis:** SOURCE-DERIVED REQUIREMENT  
**Disposition:** **ACCEPTED**

**Reasoning**

The finding is correct. The frozen packet allowed the pre-execution Fan-out Concept Moment to explicitly distinguish structural repetition from duplicate source rows, while the later post-execution verification required the learner to make that same distinction from the actual result.

That creates circular evidence: instruction performs part of a later evidence-bearing inference.

The term `fan-out` should still be introduced after the learner has predicted multiplication. The defect is not terminology timing; it is the extra diagnostic conclusion supplied with it.

**Exact design consequence**

The Fan-out Concept Moment is narrowed.

It may:

- name the already-predicted behavior as **fan-out**;
- restate the learner-established general mechanism that one starting row can contribute multiple result rows when it matches multiple many-side rows;
- restate learner-established repetition of one-side information as a general consequence.

It must **not**:

- compare the forthcoming result with accidental duplicate base rows;
- state that repeated source names in the forthcoming result are not duplicates;
- pre-classify the actual result before the learner inspects it.

The structural-versus-duplicate diagnosis remains a post-execution learner action based on the actual returned rows.

**Changed design dimensions**

- Learner reasoning: **Yes** — the later diagnosis remains learner-performed.
- Reveal order: **No** — Fan-out is still named after successful structural prediction and before SQL.
- Scaffolding: **Yes** — Concept Moment explanatory content is reduced.
- Learner evidence: **Yes** — duplicate-vs-structural diagnosis is no longer pre-supplied.
- Learning experience / UX requirement: **Yes** — concept treatment has a stricter explanatory boundary.
- Implementation invariant: **Yes**.
- Validation criterion: **Yes**.

**Remaining OPEN / authority matter**

None for this finding.

---

### P3 — Assistance state should remain distinguishable in the captured reasoning evidence

**Reviewer classification:** ADVISORY  
**Reviewer basis:** PROFESSIONAL / PROCESS RECOMMENDATION  
**Disposition:** **ACCEPTED WITH MODIFICATION**

**Reasoning**

The recommendation is useful and consistent with the production process distinction between supported/practised and independently exercised performance. It should not become a new course-wide hint-recording policy.

For this encounter, however, the protected prediction is itself required capability evidence. Later validation must be able to distinguish an unassisted structural prediction from a correct answer reached after escalating support.

**Exact design consequence**

For the protected pre-execution prediction only, the completed evidence record must preserve enough assistance provenance to distinguish at minimum:

- unassisted structural prediction;
- structural prediction after Hint 1;
- structural prediction after Hint 2;
- any stronger solution assistance if the Course Authority Owner later authorizes Show solution during the protected prediction state.

The numeric row-count correction may also be recorded separately, but it must not retroactively change the assistance classification of already-committed structural evidence.

This is a local evidence-quality requirement for this encounter. It does not establish a global hint analytics or assessment policy.

**Changed design dimensions**

- Learner reasoning: **No**.
- Reveal order: **No**.
- Scaffolding: **No** — the hint sequence itself is unchanged.
- Learner evidence: **Yes** — assistance provenance is retained with the prediction evidence.
- Learning experience / UX requirement: **No material learner-facing change required**.
- Implementation invariant: **Yes**.
- Validation criterion: **Yes**.

**Remaining OPEN / authority matter**

If Show solution is authorized during the protected prediction state, its evidence effect requires the owner decision described under UX-1.

---

## 3. Finding-by-finding disposition — UX Review

### UX-1 — Global Back / Retry / Show solution semantics materially affect protected prediction evidence

**Reviewer classification:** OWNER DECISION REQUIRED  
**Reviewer basis:** SOURCE-DERIVED REQUIREMENT  
**Disposition:** **OWNER DECISION REQUIRED**

**Reasoning**

This genuinely requires Course Authority Owner input.

`course-design/course-controls.md` establishes Back, Retry / Redo, and Show solution as global course controls while explicitly leaving material state semantics OPEN and forbidding implementation from silently deciding them. The protected prediction in this encounter makes a subset of those OPEN semantics implementation-affecting.

The Architect cannot legitimately decide:

- whether a learner may reopen and alter a committed prediction after seeing SQL/result evidence;
- how Retry / Redo interacts with that protected evidence;
- whether Show solution is available in the protected prediction state.

The design can, however, narrow the unresolved authority question substantially. The whole global control policy does **not** need to be settled for this encounter.

**Exact design consequence**

The reconciled design establishes the non-negotiable evidence constraint:

> A prediction recorded as pre-execution evidence must never be silently overwritten or made indistinguishable from a response formed after SQL/result evidence was seen.

If a previously committed prediction is changed after result exposure, the old SQL/result evidence cannot remain active evidence for the changed prediction; a new protected attempt must be distinguishable from the prior attempt.

The remaining owner choice is limited to the control behavior that triggers or permits such a new attempt, plus Show solution availability/evidence effect.

Until the owner decision is made, implementation behavior for these controls in the affected states is **not finalized**.

**Changed design dimensions**

- Learner reasoning: **Potentially**, depending on the owner choice.
- Reveal order: **Potentially**, if Show solution is permitted in the protected prediction state.
- Scaffolding: **Potentially**, because Show solution is stronger assistance than Hint 1/2.
- Learner evidence: **Yes** — evidence integrity depends on the decision.
- Learning experience / UX requirement: **Yes**.
- Implementation invariant: **Partially finalized; owner-dependent control behavior remains unresolved**.
- Validation criterion: **Partially finalized; owner-dependent control behavior remains unresolved**.

**Remaining OPEN / authority matter**

Yes. See §5, **Remaining OWNER DECISION REQUIRED**.

---

### UX-2 — Final verification does not yet guarantee practical access to the learner's committed prediction

**Reviewer classification:** REVISION REQUIRED  
**Reviewer basis:** SOURCE-DERIVED REQUIREMENT  
**Disposition:** **ACCEPTED**

**Reasoning**

The finding is correct. Generic reviewability of Completed Steps is not sufficient because the committed prediction is active reference evidence for the final reconciliation task.

The actual SQL result should remain the primary evidence surface, but the learner should not have to rely on memory or abandon the verification context to recover the prediction being tested.

**Exact design consequence**

During final verification:

- the actual SQL result remains the primary evidence surface;
- the learner's committed pre-execution prediction must be **visible or immediately recoverable from the verification context**;
- recovering the prediction must not require leaving the result-verification context or searching through remote history;
- exact layout/mechanism remains implementation discretion.

The prediction reference includes the learner's committed structural prediction and current-data numeric prediction. It may display assistance-state metadata quietly if useful for validation, but such metadata must not displace the learner task.

**Changed design dimensions**

- Learner reasoning: **No** — the final task remains reconciliation with prior prediction.
- Reveal order: **No**.
- Scaffolding: **No**.
- Learner evidence: **No change in required propositions; access to the evidence is strengthened**.
- Learning experience / UX requirement: **Yes**.
- Implementation invariant: **Yes**.
- Validation criterion: **Yes**.

**Remaining OPEN / authority matter**

None for this finding.

---

### UX-3 — The Fan-out Concept Moment can pre-answer part of the later duplication-diagnosis evidence unless its explanatory boundary is constrained

**Reviewer classification:** REVISION REQUIRED  
**Reviewer basis:** SOURCE-DERIVED REQUIREMENT  
**Disposition:** **ACCEPTED WITH MODIFICATION**

**Reasoning**

The underlying defect is the same material issue identified independently in Pedagogy Finding P2. The UX review permits the Concept Moment to clarify the conceptual distinction between structural repetition and duplicate base records as long as it does not pre-classify the forthcoming observed result.

The reconciliation adopts a narrower treatment to remove ambiguity: the pre-execution Concept Moment will not teach the duplicate-base-record distinction at all. It will only name and explain the already-predicted fan-out mechanism.

This stricter boundary is chosen because the duplicate-vs-structural classification is explicitly required as post-execution learner evidence.

**Exact design consequence**

Same integrated correction as P2:

- Fan-out terminology remains after successful prediction.
- The Concept Moment may explain general one-to-many multiplication and restate already-established repetition.
- It must not discuss accidental duplicate source rows or classify the forthcoming result.
- The learner must use actual result rows after execution to diagnose why repeated source names occurred.

**Changed design dimensions**

- Learner reasoning: **Yes**.
- Reveal order: **No**.
- Scaffolding: **Yes**.
- Learner evidence: **Yes**.
- Learning experience / UX requirement: **Yes**.
- Implementation invariant: **Yes**.
- Validation criterion: **Yes**.

**Remaining OPEN / authority matter**

None for this finding.

---

### UX-4 — Composite prediction and verification states need careful grouping to avoid a form-like interaction burden

**Reviewer classification:** ADVISORY  
**Reviewer basis:** PROFESSIONAL / PROCESS RECOMMENDATION  
**Disposition:** **ACCEPTED WITH MODIFICATION**

**Reasoning**

The recommendation is sound as a local learning-experience choice. The encounter contains several evidence-bearing distinctions, but the target is one connected relational inference rather than completion of many unrelated questionnaire cards.

The recommendation must not become a new universal interaction pattern for the course.

**Exact design consequence**

For this encounter only:

- Episode B is one coherent **Prediction workspace**.
- Its structural subjudgments progress within that workspace with one clear current focus.
- Already-completed subjudgments become compact/secondary rather than accumulating as co-primary cards.
- The numeric consequence follows within the same episode after the structural commitment.
- Episode E is one coherent **Verification workspace** combining the result as primary evidence, practical access to the committed prediction, and progressively focused verification judgments.
- Implementation must avoid both:
  - a wall of simultaneous co-primary questions; and
  - an unnecessarily long stack of disconnected independent task cards.

The exact component/layout mechanism remains implementation discretion.

**Changed design dimensions**

- Learner reasoning: **No**.
- Reveal order: **No change to the logical sequence; local progressive presentation is clarified**.
- Scaffolding: **No**.
- Learner evidence: **No** — all required evidence distinctions remain.
- Learning experience / UX requirement: **Yes**.
- Implementation invariant: **Yes, locally**.
- Validation criterion: **Yes, locally**.

**Remaining OPEN / authority matter**

None for this finding.

---

## 4. Integrated design changes

The following changes are incorporated into `reconciled-encounter-design-packet.md`.

### 4.1 Structural prediction is protected from instance-count shortcuts

Before any learner-facing current-data count is revealed, the learner must commit:

- one source can create multiple raw JOIN result rows;
- source-side information can repeat;
- one raw result row naturally represents a source–article match.

Only then may the current dataset's **18 article rows** be introduced for the numeric prediction.

The learner-facing `4 source rows` count is not used as a premise for the structural prediction.

### 4.2 Fan-out terminology is retained; the pre-execution diagnostic leakage is removed

The Fan-out Concept Moment remains after successful structural prediction.

It names and explains only the already-established general mechanism. It does not tell the learner that later repeated source names are "not duplicates" or otherwise pre-classify the forthcoming result.

The duplicate-vs-structural diagnosis remains post-execution evidence.

### 4.3 Assistance provenance is retained for protected prediction evidence

The evidence record must distinguish whether the structural prediction was:

- unassisted;
- reached after Hint 1;
- reached after Hint 2;
- or, if later owner-authorized, reached after Show solution.

This is a local Cycle 1 evidence requirement, not a global assessment policy.

### 4.4 Final verification includes practical access to the committed prediction

At final verification:

- returned SQL rows remain primary;
- the committed prediction is visible or immediately recoverable in the same verification context;
- the learner does not need to rely on memory or leave the active result-verification context.

### 4.5 Prediction and verification are coherent workspaces

Prediction and final verification each remain one continuous reasoning workspace with progressive focus. Required subjudgments remain distinct for evidence, but they do not become a series of unrelated co-primary task cards.

### 4.6 Global control behavior remains owner-gated only where it affects protected evidence

The reconciled packet no longer states that all global-control OPEN matters are irrelevant to this local encounter.

Only the evidence-sensitive subset remains unresolved:

- post-result reopening/editing of the protected prediction through Back or Retry / Redo;
- downstream SQL/result treatment if such prediction evidence changes;
- Show solution availability and evidence effect during the protected prediction state.

All other broader course-control semantics remain outside this reconciliation.

---

## 5. Remaining OWNER DECISION REQUIRED

### Why owner input is genuinely required

Current course authority explicitly leaves the relevant global-control semantics OPEN. Choosing them here would create authority rather than reconcile design.

The smallest required decision is **not** a complete global Back / Retry / Show solution policy. It is a scoped Cycle 1 authority choice for the protected pre-execution prediction state.

### Decision A — May a committed prediction be edited after SQL/result evidence has been seen?

Choose one:

**A1 — Freeze the committed prediction for that attempt after result exposure**

- Back may expose it for review but does not make it editable within the same attempt.
- Retry / Redo of the prediction starts a new attempt.
- The previous attempt remains distinguishable as historical evidence.
- A new attempt has no active downstream SQL/result evidence until SQL is rerun.
- Consequence: simplest temporal evidence provenance; less freedom to directly edit an old attempt.

**A2 — Permit reopening/editing, but editing creates a new protected attempt**

- Back or Retry / Redo may reopen the prediction for editing.
- The moment the committed prediction changes after result exposure, the prior attempt is preserved as prior evidence.
- Existing downstream SQL/result evidence is invalid for the new prediction and is cleared or otherwise made inactive until SQL is rerun.
- Consequence: more flexible learner correction; more state complexity, but pre-execution provenance remains defensible.

A behavior that simply overwrites the old prediction while retaining the already-seen result as if it belonged to the new prediction is **not an admissible alternative**, because it destroys the required prediction-before-execution evidence distinction.

### Decision B — Is Show solution available during the protected prediction state?

Choose one:

**B1 — Show solution is unavailable / disabled for this protected prediction task**

- Owner explicitly authorizes this scoped availability treatment for the encounter.
- Hint 1 / Hint 2 remain the local support path.
- Consequence: cleanest protection against the course supplying the required prediction; requires a scoped exception/treatment for this state.

**B2 — Show solution is available, but its use is recorded as solution-assisted evidence**

- Revealing it does not populate the learner response, execute SQL, mark prediction evidence complete, or bypass final verification.
- The learner must still commit a prediction before SQL execution.
- The protected prediction is permanently marked `solution-assisted` for that attempt and cannot later be represented as unassisted evidence.
- Consequence: preserves the global support action while allowing later validation to distinguish solution-assisted success; introduces a stronger assistance state than Hint 1 / Hint 2.

No decision is requested here about the complete future course-wide behavior of these controls.

### Behavior that cannot be finalized until the owner decides

Until Decisions A and B are resolved:

- exact Back / Retry behavior at and after result exposure is not implementation authority;
- exact Show solution availability/evidence effect in the protected prediction state is not implementation authority;
- the corresponding owner-dependent validation cases cannot be frozen.

Therefore the reconciled design remains blocked from Auditor Pre-Build Control.

---

## 6. Reconciled implementation invariants

The following invariants supersede the affected portions of the frozen packet for any future implementation authority. They are also incorporated into the reconciled design packet.

1. No Stage number is assigned.
2. The case remains `news_source → news_article`.
3. Starting/input Grain remains one news source per row.
4. Requested business-output Grain remains one news source per row.
5. Natural raw JOIN Grain remains one source–article match per row.
6. PK/FK, Cardinality, Grain, and JOIN remain reused concepts, not first-exposure teaching.
7. Relation identification is not reassessed.
8. Before learner-facing current-data counts are revealed, the learner commits the structural prediction that:
   - one source can contribute multiple raw JOIN rows;
   - source information can repeat;
   - one raw row represents a source–article match.
9. The current `18 article rows` fact may be introduced only after that structural commitment, for the numeric consequence.
10. The learner-facing `4 source rows` count is not used as a premise for structural prediction.
11. SQL execution does not occur before the protected prediction is committed.
12. SQL remains implementation/verification, not discovery.
13. Fan-out terminology appears after the structural prediction.
14. The Fan-out Concept Moment may name/explain the already-predicted general mechanism but may not pre-classify the forthcoming result as structural repetition rather than duplicate base data.
15. The learner performs the duplicate-vs-structural diagnosis after inspecting actual result rows.
16. The completed protected prediction evidence preserves assistance provenance sufficient to distinguish unassisted, Hint 1, Hint 2, and any owner-authorized Show-solution-assisted path.
17. The SQL result remains the primary evidence surface during final verification.
18. The learner's committed pre-execution prediction is visible or immediately recoverable from the verification context without leaving that context.
19. Prediction is presented as one coherent reasoning workspace with progressive current focus; verification is presented as one coherent result-reconciliation workspace.
20. Required subjudgments remain individually inspectable as evidence while completed subjudgments become visually secondary.
21. Successful SQL execution does not announce the final relational diagnosis.
22. No aggregation, pre-aggregation, LEFT JOIN/NULL reasoning, EXISTS, multi-branch fan-out, or other additional relational mechanism is introduced.
23. No Stage-local replacement for the global Show solution control is created.
24. A pre-execution prediction may not be silently overwritten after result exposure in a way that erases its temporal provenance.
25. Final Back / Retry / Show solution behavior in the protected evidence states remains owner-dependent as specified in §5.
26. Required reasoning evidence remains reviewable after completion.

---

## 7. Reconciled validation criteria

### Structural prediction

Validation must establish that:

- no learner-facing `4 versus 18` count comparison is available before structural prediction;
- the visible `1 → M` relationship is the available basis for the structural inference;
- the learner commits multiplicity, repetition, and source–article-match natural Grain before current-data numeric count is revealed;
- assistance level for that structural commitment is captured.

### Numeric consequence

Validation must establish that:

- the 18-article current-data fact appears only after structural commitment;
- the learner predicts 18 source–article matches from that later current-data premise;
- numeric success is not treated as a substitute for the earlier structural evidence.

### Fan-out Concept Moment

Validation must establish that:

- it occurs after structural prediction;
- it names/explains the already-predicted one-to-many multiplication mechanism;
- it does not state or visually imply the result-specific conclusion that forthcoming repeated source names are not accidental duplicate source rows.

### SQL

Validation must establish that:

- SQL execution is unavailable as evidence before the protected prediction is committed;
- direct INNER JOIN remains the verification operation;
- successful execution does not pre-announce the final relational diagnosis.

### Final verification and evidence locality

Validation must establish that:

- actual returned rows remain visible as the primary evidence surface;
- the committed prediction is visible or immediately recoverable without leaving the verification context;
- the learner uses the actual rows to diagnose repeated source names as multiple legitimate source–article matches rather than accidental duplicate source data;
- the learner verifies that the raw JOIN does not preserve the requested one-source-per-row Grain.

### Interaction grouping

Validation must establish that:

- prediction subjudgments occur in one coherent prediction workspace with a clear current focus;
- verification subjudgments occur in one coherent verification workspace;
- required evidence remains inspectable;
- neither episode becomes a wall of simultaneous co-primary questions nor a long stack of disconnected task cards.

### Assistance provenance

Validation must establish that the captured prediction evidence distinguishes the assistance path actually used and does not silently label scaffolded success as unassisted success.

### Owner-dependent control validation

After the Course Authority Owner resolves §5, validation criteria must be completed for:

- Back / Retry behavior after result exposure;
- downstream SQL/result invalidation or new-attempt behavior when protected prediction changes;
- Show solution availability and evidence effect during the protected prediction state.

No Auditor Pre-Build PASS is possible while these owner-dependent criteria remain unresolved.

---

## 8. Reconciliation conclusion

All seven independent-review findings received a disposition.

Disposition counts:

- **ACCEPTED:** 3
- **ACCEPTED WITH MODIFICATION:** 3
- **REJECTED WITH RATIONALE:** 0
- **OWNER DECISION REQUIRED:** 1

The two Pedagogy REVISION REQUIRED findings are resolved by design changes.

The two UX REVISION REQUIRED findings are resolved by design changes.

Both advisory findings are incorporated as scoped local improvements without converting them into course-wide authority.

The UX OWNER DECISION REQUIRED finding is confirmed as a genuine authority issue and narrowed to the smallest Cycle 1 choices necessary to preserve protected prediction evidence.

A revised design artifact is produced at:

`course-design/production/cycle-1/reconciled-encounter-design-packet.md`

The original reviewed artifact remains unchanged at:

`course-design/production/cycle-1/encounter-design-packet.md`

**RECONCILIATION STATUS: COMPLETE TO CURRENT AUTHORITY — OWNER DECISION REQUIRED BEFORE AUDITOR PRE-BUILD CONTROL**

No Auditor Pre-Build Control, Frozen Implementation Authority, implementation, or post-build review is authorized by this reconciliation.
