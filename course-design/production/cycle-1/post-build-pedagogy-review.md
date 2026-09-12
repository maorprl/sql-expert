# Cycle 1 — Post-Build Pedagogy Review

**Role:** Independent Pedagogy Reviewer  
**Review:** Post-Build Pedagogy Review  
**Repository:** `maorprl/sql-expert`  
**Branch reviewed:** current default branch (`main`)  
**Implementation commit reviewed:** `e5af473cd68f54268cb68da9ea66699515cf9cd7`

## Overall pedagogy verdict

# **REVISION REQUIRED**

The implemented Cycle 1 encounter preserves the intended reasoning sequence and most of the frozen evidence design, but the runtime assistance-provenance logic does not reliably preserve the meaning of the learner evidence it records.

Two material source-derived evidence defects require correction before the encounter can support the intended post-build pedagogy verdict to scope.

There is no pedagogy BLOCKER requiring the capability, case, or frozen design to be reopened, and no new OWNER DECISION REQUIRED is identified.

---

## 1. Mandatory entry gate

**PASS.**

The review entry gate is satisfied.

`learner-encounter-production-execution.md` explicitly authorizes **Independent Post-Build Review**, including the **Post-Build Pedagogy Review** stream.

`course-design/production/cycle-1/provenance.md` records the Cycle 1 implementation handoff as:

**DURABLE IMPLEMENTATION HANDOFF RECORDED**

`course-design/production/cycle-1/implementation-record.md` is present and records the completed implementation handoff awaiting independent post-build review.

The review therefore proceeded.

---

## 2. Frozen authority used

The review treated the following as the frozen Cycle 1 implementation authority:

- `course-design/production/cycle-1/reconciled-encounter-design-packet.md`
- `course-design/production/cycle-1/authority-clarification-show-solution-assistance.md`
- `course-design/production/cycle-1/current-scope-necessity-clarification.md`
- `course-design/production/cycle-1/auditor-pre-build-control.md`

The current production process in `learner-encounter-production-process.md` was used only for reviewer role, finding classification, post-build review purpose, and acceptance consequence.

The actual implementation inspected included the active learner-facing runtime and state composition in:

- `index.html`
- `src/main.js`
- `src/cycle1.js`
- `src/cycle1.css`
- `src/interaction-lifecycle.js`

The prior `src/stage1.js` implementation was not treated as authority for this review.

---

## 3. Pedagogy conformance observed

The implementation preserves the central learning process in the frozen design.

### Structural reasoning occurs before current-data counts

The learner first establishes requested Grain, then works through the protected structural prediction using the visible `1 → M` relationship.

The structural prediction requires separate judgments that:

- one source can contribute multiple raw JOIN rows;
- one raw JOIN row naturally represents a source–article match;
- source-side information can repeat.

Only after those judgments are committed does the runtime reveal the current `18 article rows` fact and ask for the 18-match numeric consequence.

No learner-facing `4 versus 18` shortcut is introduced before structural commitment.

### Prior concepts are reused rather than presented as new first exposure

Grain, PK/FK, Cardinality, JOIN matching semantics, and INNER JOIN are used as already-established tools for the new fan-out reasoning.

The implementation does not introduce a second first-JOIN teaching sequence or a new relation-identification task.

### SQL remains verification rather than discovery

The SQL workspace is unavailable as capability evidence until requested Grain, protected structural prediction, and current-data numeric prediction are committed.

The Fan-out Concept Moment appears after structural prediction and before SQL implementation.

The learner then authors the proposed direct INNER JOIN and must return source/article detail suitable for inspection.

Execution success alone does not complete the encounter.

### Fan-out terminology and Concept Moment timing are preserved

`Fan-out` is named only after the learner has already committed the structural behavior.

The Concept Moment explains the general mechanism:

one starting row → multiple matching rows → multiple result rows.

It does not state that the forthcoming repeated source values are non-duplicate base rows and does not perform the later duplicate-vs-structural diagnosis.

### Result diagnosis remains a learner action

After successful SQL execution, the actual returned rows remain visible while the learner must progressively determine:

- why source names repeat;
- whether the repetition represents legitimate source–article matches or accidental duplicate `news_source` base rows;
- whether the requested one-source-per-row Grain is preserved;
- what one returned row naturally represents;
- whether the actual result agrees with the committed prediction.

The closing relational explanation appears only after those verification judgments are completed.

### Requested Grain and natural result Grain remain distinct

The requested business-output Grain is established as one publishing source per row.

The protected prediction and final verification separately require the natural raw-result Grain to be identified as one source–article match per row.

The implementation does not collapse the business request into the raw JOIN result Grain.

### Show solution remains assistance rather than automatic completion

`Show solution` is available throughout the active learner journey.

Revealing it does not populate a learner response, insert SQL into the editor, execute SQL, complete a required answer, or bypass later verification.

Where it is used before an unresolved answer, the runtime raises the relevant assistance state to `solution-assisted`.

The material defect is not Show solution availability itself. It is the accuracy and timing of the provenance record, described below.

### Final verification genuinely reconciles prediction and result

The actual SQL result is kept as the primary evidence surface in verification, the editor is removed from that primary surface, and the committed pre-SQL prediction is shown in the same verification context.

The final required judgment explicitly asks whether the actual result agrees with the prediction committed before SQL.

### Deferred Back / Retry / Redo semantics were not introduced

No post-result Back / Retry / Redo behavior for reopening or editing protected prediction evidence was introduced by the implementation.

The deferred control semantics therefore remain outside current Cycle 1 scope as required.

---

## 4. Material findings

### PBR-PED-01 — REVISION REQUIRED — corrective scaffolding can be recorded as “Unassisted”

**Requirement basis:** SOURCE-DERIVED.

The frozen design requires the protected structural prediction to preserve its **actual assistance path** and explicitly requires scaffolded success not to be represented as unassisted performance.

The accepted structural assistance design separates:

- an initial attempt without a hint;
- Hint 1 after an incorrect multiplicity judgment;
- Hint 2 after another incorrect attempt;
- stronger Show-solution assistance.

The runtime does not preserve that meaning reliably.

In `src/cycle1.js`, an incorrect structural answer immediately calls `wrong(step.wrong)` and renders targeted corrective guidance. For the first multiplicity judgment, that automatic feedback says:

> Use the visible 1 → M relationship. Start from one source and ask how many article rows can match it.

The separately tracked Hint 1 says:

> Look at the direction of the relationship. For one `news_source` row, how many `news_article` rows can match?

These are functionally the same scaffold: both direct the learner back to the one-to-many relationship and ask them to reason from one source to its possible matching articles.

However, `structuralAssistance` remains `unassisted` unless the learner explicitly clicks the Hint 1 / Hint 2 control or opens Show solution.

Therefore a learner can:

1. answer the multiplicity judgment incorrectly;
2. receive Hint-1-equivalent corrective guidance automatically;
3. answer correctly without clicking the Hint 1 button;
4. complete the protected structural prediction with the recorded provenance still shown as **Unassisted**.

The same evidence-meaning problem extends beyond the first subjudgment. Incorrect natural-Grain and repetition answers also receive targeted conceptual guidance through `step.wrong`, while the structural provenance remains unchanged unless a named hint or Show solution is explicitly opened.

This is material because protected structural provenance is part of the accepted capability evidence. The implementation can therefore claim stronger unassisted evidence than the learner path actually supports.

The same implementation pattern also appears in later states that voluntarily display assistance labels: numeric correction and result-verification corrective feedback can be delivered while those completed records still say `Unassisted`. Those later labels are not the primary frozen structural evidence requirement, but they reinforce the same overclaiming problem.

**Required correction:** the assistance provenance presented for learner evidence must reflect the guidance actually delivered before the successful response. The implementation must not label a scaffolded path `Unassisted` merely because the learner did not click the separately named Hint button. This review does not prescribe whether the correction should change when guidance is delivered, how it is classified, or how the control is implemented; it requires the resulting evidence label to be truthful to the accepted assistance meaning.

---

### PBR-PED-02 — REVISION REQUIRED — Show-solution attribution is not tied to when the evidence was produced

**Requirement basis:** SOURCE-DERIVED.

The frozen authority requires protected structural evidence to preserve assistance provenance and temporal meaning. The later Show-solution clarification authorizes Show solution as stronger assistance, but revealing it does not itself create, replace, or complete learner evidence.

The runtime currently attributes Show solution according to the broad current state rather than whether the relevant learner evidence is still unresolved.

After the learner completes all three structural subjudgments, `renderStructuralPrediction()` records the completed structural evidence with its assistance value and leaves the runtime in the `structuralPrediction` state on the intermediate **Structural prediction committed** screen.

If the learner opens Show solution on that already-committed screen:

- `currentAssistanceKey()` still maps the state to `structuralAssistance`;
- `markSolutionUse()` changes `state.structuralAssistance` to `solution-assisted`;
- the already-recorded completed structural item retains the assistance value captured before Show solution was opened;
- later `committedPredictionMarkup()` reads the mutated live `state.structuralAssistance` value.

The same already-produced structural evidence can therefore be represented with two different provenance states: the completed evidence may still say `Unassisted`, while the later committed-prediction reference says `Solution-assisted`.

This is not merely cosmetic. Assistance provenance is part of the meaning of the protected evidence. Opening a solution after the structural prediction has already been committed did not assist the learner in producing that prediction and should not retroactively change what that evidence means.

A related timing issue exists after successful SQL execution but before the learner presses the continue button: Show solution can mark the SQL assistance state as `solution-assisted` even though the successful query already exists. That SQL label is secondary to the target capability evidence, but it confirms that assistance attribution is state-based rather than evidence-event-based.

**Required correction:** assistance attribution must preserve the temporal relationship between assistance and the evidence it could have influenced. Viewing Show solution after a required judgment or successful task has already been completed must not mutate the provenance of that already-produced evidence, and the same evidence must not appear with conflicting assistance states in different review surfaces.

---

## 5. Findings by classification

**BLOCKER:** none.

**REVISION REQUIRED:**

- `PBR-PED-01` — delivered corrective scaffolding can still be recorded as `Unassisted`, overstating the independence of the protected structural evidence.
- `PBR-PED-02` — Show-solution attribution is not temporally bound to unresolved evidence and can retroactively mutate or internally contradict assistance provenance.

**ADVISORY:** none required for this verdict.

**OWNER DECISION REQUIRED:** none.

Both material findings are source-derived implementation/evidence defects. They do not depend on a new pedagogical principle or an unresolved owner choice.

---

## 6. Evidence-strength conclusion

Apart from the assistance-provenance defects, the encounter requires the intended fan-out reasoning and does not substitute SQL syntax, current-data counts, or post-result observation for the protected structural prediction.

The implementation also avoids a stronger mastery or cumulative-transfer claim: completion is encounter-local, and the learner must still perform the required prediction, SQL verification, diagnosis, Grain distinction, and reconciliation.

However, because the runtime can label materially scaffolded structural work as `Unassisted`, the current evidence record can claim stronger independence than the encounter actually elicited. That defect is sufficient to require revision even though the underlying reasoning route is otherwise preserved.

---

## 7. Post-build pedagogy consequence

The Cycle 1 implementation should **not** proceed to a clean pedagogy acceptance state with the current evidence-provenance behavior.

The required correction is narrow: preserve truthful assistance provenance for the evidence that the existing frozen design already requires. The target capability, approved case, reveal sequence, Fan-out timing, SQL role, duplicate-vs-structural diagnosis, Grain contracts, and final reconciliation do not need to be reopened on the basis of this review.

Because the correction affects learner-evidence semantics, the changed experience requires the post-build specialist re-review required by the current change-impact rules for an evidence-affecting change, together with the applicable Auditor re-validation.
