# Wave 5B — Graduated / Adaptive Assistance Decision Gate

**Status:** DECISION GATE COMPLETE — IMPLEMENTATION NOT AUTHORIZED  
**Date:** 2026-09-15  
**Scope:** current implemented Stage 1–3 course only

This document records the decision on whether the current course provides sufficient evidence to open implementation of a broader graduated / adaptive assistance system after completion of Wave 5A.

It does not authorize runtime changes.

---

## 1. Decision question

The gate asks:

> Does the current learner evidence establish a remaining problem that is specifically an assistance-escalation problem and therefore justifies attempt-based, history-based, graduated, or adaptive assistance?

The gate must distinguish that problem from upstream alternatives such as:

- wording or task framing;
- low inference distance;
- evidence visibility;
- interaction design;
- instructional sequencing;
- ordinary misconception-specific correction;
- SQL-authoring scaffold availability.

Wave 5B must not be justified merely because graduated hints or adaptive behavior are technically possible.

---

## 2. Current authority boundary

`course-design/course-controls.md` establishes `Show solution` as strong local SQL-authoring assistance, with Desired Output and SQL Structure as weaker local scaffolds where appropriate. It explicitly does not establish a global hint system, and Retry / Redo reset semantics remain OPEN.

`pedagogical-foundations.md` requires guided reasoning continuity while preserving a real inference for the learner. Guidance must not perform the learner's next reasoning step.

Stage 2 authority explicitly states that a broader global hint/adaptive system is not established by the Stage and that adaptive assistance remains outside Stage 2 scope.

Stage 3 continues to require learner-generated zero-match evidence, prediction before SQL, result verification, and the coverage conclusion. Assistance must not replace those evidence-bearing moves.

Therefore a Wave 5B implementation would require a new explicit decision; it cannot be inferred from existing controls or Stage authority.

---

## 3. Evidence examined

The gate examined the current default-branch implementation and current authority after Wave 5A, including:

- `pedagogical-foundations.md`;
- `course-design/course-controls.md`;
- `course-design/stage-2/stage-2-authority.md`;
- `course-design/stage-3/stage-3-interaction-decisions.md`;
- `course-design/wave-5a-response-aware-feedback-decision-2026-09-15.md`;
- current Stage 1 runtime (`src/media-coverage.js`);
- current Stage 2 runtime (`src/funding-participation.js`);
- current Stage 3 runtime (`src/inner-join-unmatched.js`);
- the accepted Wave 5A implementation and no-selection correction on current `main`.

The current runtime now provides several distinct support layers without a generalized adaptive system:

1. ordinary wrong-answer correction;
2. state-aware relation-selection diagnostics from Wave 4;
3. result-aware SQL semantic diagnostics from Wave 4;
4. response-aware misconception-specific correction at the six approved Wave 5A interactions;
5. optional SQL-authoring scaffolds such as Desired Output and SQL Structure;
6. `Show solution` as strong SQL-authoring assistance, without automatically running SQL or bypassing verification.

---

## 4. What evidence would be needed to justify Wave 5B

A broader graduated / adaptive system would require evidence that the current support layers are insufficient in a repeatable way.

Examples of sufficient evidence could include:

- repeated failure at the same high-inference interaction after the current misconception-specific correction;
- repeated SQL-authoring failure after the existing semantic diagnostic and weaker scaffolds;
- evidence that learners reach `Show solution` because intermediate support is systematically missing;
- a stable pattern showing that assistance should become stronger after prior help use or repeated attempts;
- evidence that the same escalation policy is pedagogically appropriate across more than one isolated interaction.

The evidence would also need to identify what state the system can observe reliably enough to justify the escalation decision.

---

## 5. Current evidence does not meet that threshold

The current repository does not contain evidence of repeated learner failure after Wave 5A correction.

Wave 5A itself was deliberately chosen because the runtime already observed diagnostically meaningful wrong-option state at six interactions. That first-line response-aware treatment has only just been completed and reviewed. No subsequent evidence establishes that learners continue to fail those interactions after receiving the new correction.

The runtime does not currently maintain a course-level attempt history, assistance-history model, or learner-performance model from which a reliable escalation policy could be derived. Introducing those mechanisms in order to create the evidence for their own necessity would reverse the required decision order.

Stage 2 records whether `Show solution` was used for its SQL task, but that local provenance flag does not establish a broader adaptive-assistance need. Stage 1 and Stage 3 do not establish an equivalent course-wide assistance-history contract.

There is therefore no current basis for deciding:

- how many attempts should trigger stronger help;
- which kinds of wrong response should count as the same persistent difficulty;
- whether hint use should alter later assistance;
- whether assistance should expand or reduce based on learner performance;
- whether one escalation policy should apply across reasoning questions and SQL authoring;
- how Retry / Redo should interact with attempt or assistance history.

Those are not implementation details. They are unresolved learner-contract and pedagogical decisions.

---

## 6. Alternative explanations remain live

If a learner still struggles after the current course changes, the cause cannot currently be attributed specifically to insufficient assistance escalation.

Plausible alternatives remain interaction-local and must be checked before adaptive machinery is considered, including:

- a prompt may still make the intended inference too close or too obscure;
- evidence may not be visible enough at the moment of reasoning;
- the corrective wording may need adjustment;
- a SQL task may need a better distinction between output-contract support and relational implementation support;
- an encounter may need a local continuity or orientation correction;
- a later transfer task may be needed to test whether the learner can perform the capability with reduced cueing.

A generalized adaptive layer would not automatically solve any of those problems and could hide them by adding more explanation.

---

## 7. Verdict

**WAVE 5B IMPLEMENTATION IS NOT AUTHORIZED.**

The decision gate finds **insufficient evidence that the remaining learner problem is specifically an assistance-escalation problem**.

This is not a permanent rejection of graduated / adaptive assistance. It is a rejection of implementing it now without evidence.

Wave 5B remains deferred until new learner evidence demonstrates a repeatable failure mode that persists after the existing diagnostic and response-aware support and that can be addressed by a clearly specified escalation rule.

---

## 8. What remains prohibited

This verdict does not authorize:

- attempt counters for assistance escalation;
- hint ladders triggered by attempt number;
- assistance-history tracking as a learner model;
- adaptive routing;
- automatic solution reveal;
- performance-based support reduction or expansion;
- global hint controls;
- changes to Retry / Redo semantics;
- new progress or completion semantics;
- new Stage routes or evidence requirements;
- changes to current SQL acceptance boundaries.

No runtime change is authorized by this decision.

---

## 9. Reopening condition

Wave 5B may be reconsidered only when new evidence can answer all of the following:

1. What repeated learner failure remains after the current first-line correction?
2. Why is that failure best classified as insufficient assistance escalation rather than an upstream design problem?
3. What observable learner state justifies stronger or weaker assistance?
4. What exact escalation behavior is proposed?
5. What evidence would show that escalation improves learning without performing the target reasoning for the learner?
6. How does the proposal interact with `Show solution`, Retry / Redo, evidence, verification, and completion semantics?

Until those questions can be answered from evidence, Wave 5B remains unapproved.

---

## 10. Next management action

Do not implement Wave 5B.

Return to the later improvement-category queue and perform a separate evidence-based category-selection / mapping decision before authorizing another runtime change.

The next category must not be chosen merely by queue order. It should be selected from current learner-experience evidence and current authority, with mapping before implementation.
