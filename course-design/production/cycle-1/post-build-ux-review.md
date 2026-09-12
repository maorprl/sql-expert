# Cycle 1 — Post-Build Learning Experience / UX Review

**Role:** Independent Learning Experience / UX Reviewer  
**Review:** Post-Build Learning Experience / UX Review  
**Repository:** `maorprl/sql-expert`  
**Branch reviewed:** current default branch (`main`)  
**Implementation baseline reviewed:** `e5af473cd68f54268cb68da9ea66699515cf9cd7` (`Implement Cycle 1 fan-out encounter`)

## Overall UX verdict

# **REVISION REQUIRED**

The implemented learner experience substantially preserves the accepted Cycle 1 learning-experience structure. The current task is kept ahead of completed history, Prediction and Verification are each implemented as progressive coherent workspaces rather than long questionnaire stacks, the Fan-out Concept Moment is visually distinct and appears after protected structural prediction, the SQL result becomes the primary evidence surface during verification, the committed prediction is available in the same verification context as a secondary reference, and no post-result Back / Retry / Redo behavior is introduced.

However, two material assistance/provenance defects remain in the actual implemented interaction logic. Both can cause the interface to represent the learner's protected structural evidence inaccurately. Because protected assistance provenance and temporal provenance are frozen implementation invariants, these are current-authority violations rather than optional UX preferences.

No BLOCKER or new OWNER DECISION REQUIRED finding is identified.

---

## 1. Mandatory entry gate

**PASS.**

The required post-build review gate is open:

- `learner-encounter-production-execution.md` explicitly authorizes **Independent Post-Build Review**, including the Post-Build Learning Experience / UX Review.
- `course-design/production/cycle-1/provenance.md` records the Cycle 1 implementation handoff.
- `course-design/production/cycle-1/implementation-record.md` is present and records the completed implementation handoff.
- `course-design/production/cycle-1/auditor-pre-build-control.md` records **PASS → FROZEN IMPLEMENTATION AUTHORITY**.

The review therefore proceeded against the current frozen authority.

---

## 2. Review basis

Frozen authority reviewed:

- `course-design/production/cycle-1/reconciled-encounter-design-packet.md`
- `course-design/production/cycle-1/authority-clarification-show-solution-assistance.md`
- `course-design/production/cycle-1/current-scope-necessity-clarification.md`
- `course-design/production/cycle-1/auditor-pre-build-control.md`
- `course-design/course-visual-language.md`
- `course-design/course-controls.md`

Implemented learner-experience/runtime files inspected include:

- `index.html`
- `src/main.js`
- `src/cycle1.js`
- `src/cycle1.css`
- `src/stage1.css`
- `src/styles.css`
- `src/interaction-lifecycle.js`

The repository has no configured GitHub Pages deployment or repository homepage for this build. This review therefore inspected the actual implemented DOM/state/rendering logic, CSS composition, interaction lifecycle, SQL-result handling, and learner-state transitions on the current default branch rather than reviewing an abstract design artifact.

---

## 3. Implemented learning-experience assessment

### 3.1 Learner orientation and first-scan path

**CONFORMS.**

The business problem remains persistent and explicit at the top of the learning area. The active reasoning surface is visually stronger than review history.

The imported interaction styling explicitly orders `.current-step` before `.completed-steps` in the reasoning column, so accumulated history does not become the first scan path merely because it was completed earlier. Completed items remain compact `<details>` elements and can still be opened for review.

The Working Schema is presented as a separate structural reference beside the current reasoning surface, and the known relationship is introduced only after the requested-Grain state.

### 3.2 Prediction as one reasoning workspace

**CONFORMS, subject to Findings UX-PB-1 and UX-PB-2.**

The three structural judgments are not rendered as three simultaneous task cards. `renderStructuralPrediction()` maintains one `.prediction-workspace`, one current judgment, a `1 of 3` / `2 of 3` / `3 of 3` progress marker, and compact prior micro-evidence.

This preserves continuity of the reasoning journey and keeps completed subjudgments inspectable but secondary.

The current-data count is not introduced until structural prediction has been committed.

### 3.3 Concept Moment and SQL transition

**CONFORMS.**

The Fan-out Concept Moment appears in the SQL state after structural and numeric prediction. Its visual mechanism is the permitted general form:

`one starting row → multiple matching rows → multiple result rows`

It does not pre-classify the later repeated source names as non-duplicate base data.

During SQL authoring, the editor becomes the dominant implementation tool while the Working Schema remains available as reference.

### 3.4 Verification as one evidence-inspection workspace

**CONFORMS.**

After a successful verification query, the editor is removed from the primary evidence surface and the actual returned result remains visible. During final verification, the result workspace is ordered before the verification action, and the committed prediction is rendered immediately below the result as a visually smaller secondary reference.

The five required result judgments then progress inside one `.verification-workspace`, with prior judgments compacted into verification progress rather than accumulating as co-primary cards.

This implements the required evidence locality: actual rows remain the primary evidence, while the learner can recover the committed prediction without leaving the verification context.

### 3.5 Teacher guidance and completed work

**CONFORMS.**

Teacher guidance has a distinct `teacher-voice` treatment separate from task prompts, correctness feedback, Concept Moments, and system/status text.

Completed reasoning remains reviewable through the shared interaction lifecycle and is visually secondary to the current task.

### 3.6 Show solution availability

**CONFORMS on availability and non-automation, subject to Finding UX-PB-2 on provenance timing.**

`Show solution` is implemented in the course-shell control layer and remains available throughout the active learner journey. Revealing a solution does not populate a radio choice, insert SQL into the editor, run SQL, complete required evidence, or bypass later verification.

### 3.7 Deferred Back / Retry / Redo behavior

**CONFORMS.**

The build does not add Back, Retry, or Redo behavior for reopening protected prediction evidence after result exposure. The database reset control reloads the database but does not establish a new protected-prediction navigation or retry semantic.

No deferred post-result Back / Retry / Redo policy is silently established by this Cycle 1 implementation.

---

## 4. Findings

### UX-PB-1 — REVISION REQUIRED — Automatic wrong-answer guidance bypasses protected assistance provenance

**Classification:** REVISION REQUIRED  
**Type:** Current-authority violation, not a personal preference

#### Implemented behavior

In `src/cycle1.js`, the structural multiplicity step defines the automatic wrong-answer message as:

> `Use the visible 1 → M relationship. Start from one source and ask how many article rows can match it.`

After the first incorrect multiplicity attempt, `renderStructuralPrediction()` increments `state.structuralWrongAttempts` and immediately calls `wrong(step.wrong)`, so this guidance is displayed automatically.

The separately authorized Hint 1 is:

> `Look at the direction of the relationship. For one news_source row, how many news_article rows can match?`

These two prompts perform materially the same scaffold: both direct the learner back to the one-to-many relationship and ask how many article rows may match one source.

However, the assistance state is raised to `hint-1` only when the learner explicitly clicks the `Hint 1` button in `wirePredictionHints()`. Merely receiving the automatic wrong-answer guidance leaves `state.structuralAssistance` as `unassisted`.

A learner can therefore:

1. answer the multiplicity judgment incorrectly;
2. receive Hint-1-equivalent guidance automatically;
3. correct the answer on the next attempt without clicking `Hint 1`;
4. finish the structural prediction;
5. have the protected structural evidence recorded as **Unassisted**.

#### Why this is material

Frozen authority requires the structural prediction's actual assistance path to be preserved and requires scaffolded success not to be represented as unassisted success.

The implemented UI currently makes substantive assistance available outside the provenance mechanism. That is an evidence-integrity defect in the learner experience, not merely a wording preference.

The same risk should be checked for other structural wrong-answer messages: if a message materially performs a scaffolded reasoning move, the learner's success after receiving it must not be represented as unassisted simply because no separate Hint button was clicked.

#### Required revision

Revise the interaction so that substantive structural assistance and its provenance cannot diverge.

A compliant local fix may either:

- make the automatic wrong-answer response non-assisting/status-only and keep the actual scaffold behind the recorded Hint control; or
- treat the automatically displayed scaffold as the corresponding assistance level when it is shown.

The revision must preserve the frozen reasoning order and must not add a new pedagogical step.

---

### UX-PB-2 — REVISION REQUIRED — Show solution can retroactively mutate a committed structural assistance state and create contradictory evidence labels

**Classification:** REVISION REQUIRED  
**Type:** Current-authority violation, not a personal preference

#### Implemented behavior

When all structural subjudgments are complete, `renderStructuralPrediction()` records the completed structural prediction once, including the then-current `state.structuralAssistance`, and sets `state.structuralRecorded = true`.

The learner then remains in `state.current === 'structuralPrediction'` on the interstitial **“Structural prediction committed.”** state until selecting **“Use the current data.”**

During that interstitial state, the global `Show solution` control is still available, as required. But `showSolution()` calls `markSolutionUse()`, and `currentAssistanceKey()` maps every `structuralPrediction` state to `structuralAssistance`.

Therefore, if the learner reveals the solution after the structural prediction has already been committed but before moving to the numeric state:

- the live `state.structuralAssistance` is upgraded to `solution-assisted`;
- the already-recorded completed structural item is not rewritten because `state.structuralRecorded` is already true;
- later `committedPredictionMarkup()` reads the mutated live `state.structuralAssistance`.

This can make the same completed attempt appear with conflicting provenance in the implemented learner experience—for example, the Completed reasoning review can retain **Unassisted** while the committed prediction shown during verification reports **Structural assistance: Solution-assisted**.

#### Why this is material

The protected prediction's temporal provenance must remain intact after commitment. Assistance received after the learner has already committed the evidence cannot retroactively become assistance used to produce that evidence, and the UI must not present two incompatible provenance labels for the same attempt.

This defect directly conflicts with the frozen invariants requiring protected assistance provenance and prohibiting silent overwriting of protected pre-execution evidence in a way that erases temporal provenance.

The same state-timing pattern should also be checked for other completed-but-not-yet-transitioned states, such as successful SQL before the learner presses the local Continue control, even where that later assistance record is not part of the protected structural evidence contract.

#### Required revision

Freeze the protected structural assistance provenance at the moment the structural prediction is committed.

`Show solution` must remain globally available, but revealing it after commitment must not retroactively alter the already-completed structural attempt or cause contradictory labels for that attempt.

This is a local state/provenance correction. It does not require defining deferred Back / Retry / Redo semantics and does not create a new owner decision.

---

### UX-PB-3 — ADVISORY — The always-visible Live Schema rail adds non-target interaction burden beside a supplied Working Schema

**Classification:** ADVISORY  
**Type:** Professional UX recommendation; **not** a current-authority violation

The encounter correctly supplies the two required relations in Working Schema and does not reassess relation identification. At the same time, the persistent left-side **Live Schema** rail remains fully visible with database-wide search, expandable relations, and double-click insertion behavior, while Cycle 1 disables adding relations to Working Schema.

This does not violate frozen authority, and the rail is visually quieter than the active task. However, for this encounter it creates a secondary exploratory affordance that is not needed for the current reasoning goal and can compete with the intended first-scan path, especially before SQL becomes the active task.

A local future refinement could reduce the rail's apparent actionability or make its reference-only role clearer during this encounter, while preserving the current Working Schema and without establishing a new course-wide schema policy.

---

## 5. Classification summary

- **BLOCKER:** 0
- **REVISION REQUIRED:** 2
  - UX-PB-1 — automatic Hint-1-equivalent guidance can still be recorded as unassisted.
  - UX-PB-2 — post-commit Show solution can mutate live structural assistance and create contradictory provenance labels.
- **ADVISORY:** 1
  - UX-PB-3 — Live Schema adds non-target exploratory burden beside the supplied Working Schema.
- **OWNER DECISION REQUIRED:** 0

---

## 6. Final review conclusion

The implemented Cycle 1 experience is structurally close to the frozen UX design and gets the major learning-experience choreography right:

- clear business orientation;
- current task ahead of completed history;
- coherent progressive Prediction workspace;
- delayed current-data count;
- distinct post-prediction Fan-out Concept Moment;
- SQL used as verification;
- result-primary final verification;
- committed prediction locally recoverable as secondary evidence;
- coherent progressive Verification workspace;
- global Show solution availability without answer insertion or execution;
- no silent post-result Back / Retry / Redo semantics.

The build is **not yet UX-ready for rule-based acceptance** because the two assistance/provenance defects can make the interface misrepresent how protected structural evidence was actually obtained.

**Overall UX verdict: REVISION REQUIRED.**
