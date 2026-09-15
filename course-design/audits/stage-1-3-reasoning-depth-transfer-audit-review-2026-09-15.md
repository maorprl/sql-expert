# Independent Review — Stage 1–3 Reasoning Depth & Transfer Audit

**Date:** 2026-09-15  
**Status:** REVIEW COMPLETE  
**Reviewed artifact:** `course-design/audits/stage-1-3-reasoning-depth-transfer-audit-2026-09-15.md`  
**Reviewed commit:** `2d98afd17346ac19222adc9bd5f799462b8f3370`  
**Baseline:** `main` at `1856d9a68c013bdf455f3339a3c641869529bd1d`  
**Review role:** Independent pedagogy / evidence-strength review

## 1. Review question

This review does not ask whether the audit is persuasive in general. It checks whether its claims are supported by current authority and current Stage 1–3 runtime evidence, and whether its recommended next action stays within the authority of an audit artifact.

The review specifically checks:

1. whether Stage 1 is correctly treated as supported first exposure rather than transfer evidence;
2. whether the current Stage 2 evidence sequence avoids the previously identified direct-counting shortcut;
3. whether Stage 3 genuinely requires learner-generated zero-match evidence plus INNER JOIN reasoning rather than answer copying;
4. whether the current Stage 1–3 progression establishes cumulative independent transfer;
5. whether the audit's work-sequencing recommendation is itself justified by the reviewed evidence.

## 2. Governing sources

The review uses the same current-source boundary as the audit and independently checks its material claims against:

- `course-exit-criteria.md`
- `course-knowledge-map.md`
- `pedagogical-foundations.md`
- `learner-encounter-production-process.md`
- `course-work-management.md`
- current Stage 1 learner route, interaction decisions, and runtime
- current Stage 2 controlling design/revision sources and runtime
- current Stage 3 learner route, interaction decisions, and runtime

No older implementation is used as authority.

## 3. Stage 1 finding

**Review verdict: SUPPORTED.**

Stage 1 is explicitly a first JOIN teaching encounter. Before its row-behavior prediction, the learner has already established:

- one article per requested result row;
- 18 starting article rows;
- one matching source per article.

The prediction is therefore strongly scaffolded and low-distance. The audit is correct that this would be weak evidence for independent transfer if interpreted in isolation.

However, current Stage 1 authority does not claim that prediction as independent transfer evidence. Its instructional function is to connect Grain, relationship structure, baseline, and row preservation before JOIN terminology and SQL implementation are introduced.

The closed response also distinguishes row-preservation, source-grain collapse, and multiplication interpretations rather than testing recall of `18` alone.

**Conclusion:** the audit is correct to retain Stage 1 as locally valid while limiting the strength of the capability claim that can be made from it.

## 4. Stage 2 finding

**Review verdict: SUPPORTED.**

The audit accurately identifies that Stage 2 previously contained the same class of evidence-independence defect that triggered this review concern.

The owner-directed revision explicitly moved the concrete `3 participations → 3 rows` prompt out of the core evidence role because direct counting could bypass the intended Grain + Cardinality integration.

The current runtime now requires, before numerical application:

1. a qualitative prediction that one funding round can occupy several participation-grain result rows when several participation records must remain represented;
2. a separate interpretation that repeated funding-round context does not make the participation rows duplicates.

Only afterward is JOIN row multiplication named and the concrete `3 → 3` application shown.

That sequence materially satisfies the current Evidence Independence Test for its stated reinforcement/integration purpose.

**Conclusion:** no current Stage 2 redesign is justified by the audit concern.

## 5. Stage 3 finding

**Review verdict: SUPPORTED.**

The audit correctly rejects the earlier interpretation that Stage 3 gives the learner `0 matches → 0 rows` as a finished answer.

The learner first runs and compares two prepared measurements and independently identifies a company that exists in `company` but has no matching `funding_round` row.

Only then does the learner predict the INNER JOIN behavior. The response set distinguishes:

- zero result rows because no matched pair exists;
- preserving the company once merely because the company row exists;
- treating the unmatched row as an execution failure.

Thus the premise `no matching row` is generated evidence, while `no INNER JOIN result row` is the relational conclusion the learner must produce.

The reasoning is direct application of an already-known JOIN model, but direct application is not by itself an evidence defect when the encounter's stated purpose is a newly introduced boundary case.

The later verification also requires inspecting the actual result for the unmatched company rather than substituting total row count for entity coverage.

**Conclusion:** no current Stage 3 redesign is justified by the audit concern.

## 6. Cross-stage cumulative-transfer finding

**Review verdict: SUPPORTED, WITH SCOPE BOUNDARY.**

The current three encounters provide different evidence strengths:

- Stage 1: supported first exposure / teaching;
- Stage 2: guided reinforcement and integration of Grain + Cardinality + multiplication;
- Stage 3: learner-generated evidence plus guided application to a zero-match boundary case.

The review found no current encounter in which the learner receives a materially new analytical situation and must, with substantially reduced cueing, independently determine which already-covered JOIN behavior is relevant, construct the relational plan, predict row consequences, implement it, and choose appropriate validation evidence.

Therefore the audit is justified in stating:

> cumulative independent transfer of the currently covered INNER JOIN reasoning is not yet established.

This is an **evidence-strength / cumulative-progression gap**. It is not evidence that the current three encounters are defective, and it is not yet evidence that a new learner encounter is required.

That distinction is consistent with the current production process, which explicitly requires capability planning to classify an apparent gap as an encounter gap, implementation gap, validation gap, or cumulative-progression gap and to ask whether a new encounter is actually necessary.

## 7. Required correction — Wave 5 sequencing claim

**Review finding: NOT ESTABLISHED BY THIS AUDIT.**

The audit currently states:

> `Pause Wave 5 assistance design until this cumulative-progression question receives an explicit capability decision.`

The reviewed evidence supports opening an explicit capability decision about cumulative JOIN transfer. It does **not** establish that Wave 5 assistance work is logically or authoritatively blocked by that decision.

No reviewed source establishes a dependency rule of the form:

> cumulative INNER JOIN transfer must be resolved before assistance-progression work may continue.

The concern that Wave 5 could address the wrong problem is a legitimate planning consideration, but converting that concern into a mandatory pause is a **work-sequencing decision**, not a conclusion supplied by the Evidence Independence Test or by the Stage 1–3 evidence itself.

Accordingly:

- the audit may recommend that the cumulative-transfer decision be considered before investing further in Wave 5;
- it may state that the transfer gap should not be mistaken for an assistance gap;
- it may not, by itself, establish Wave 5 as blocked.

Whether to pause, parallelize, or continue Wave 5 belongs to the relevant work-management / owner decision unless a current source establishes a dependency.

## 8. Review of the proposed Capability / Case gate

**Review verdict: SUPPORTED AS A VALID NEXT INVESTIGATION, NOT AS AN EXCLUSIVE MANDATORY NEXT WORKSTREAM.**

A Capability / Case planning gate is the correct mechanism for resolving the cumulative-transfer finding because it can determine:

- whether stronger transfer evidence is needed now;
- whether it can wait until later course progression;
- whether the gap is primarily validation or encounter coverage;
- whether a new encounter is actually necessary;
- what Course-Assumed Learner State the first three encounters justify;
- what evidence would count as materially more independent transfer.

Case selection must remain open until that gate establishes that a new case is necessary.

The gate should not begin by assuming a Stage 4, a new schema pair, or a particular business scenario.

## 9. Final review verdict

**LOCAL STAGE FINDINGS:**

`PASS — SUPPORTED`

The audit is correct that no reasoning-depth defect currently requires reopening Stage 1, Stage 2, or Stage 3.

**CUMULATIVE TRANSFER FINDING:**

`PASS — SUPPORTED WITH SCOPE BOUNDARY`

The audit is correct that cumulative independent transfer of the currently covered INNER JOIN reasoning is not yet established.

**WORK-SEQUENCING CLAIM:**

`REVISE — AUDIT DOES NOT HAVE SUFFICIENT BASIS TO DECLARE WAVE 5 BLOCKED`

**OVERALL VERDICT:**

`PASS WITH REQUIRED SCOPE CORRECTION`

The substantive pedagogy/evidence findings are accepted. Before the audit is treated as fully controlling for next-work sequencing, its mandatory `Pause Wave 5` language must be treated as a recommendation rather than an established dependency, or the dependency must be established separately by the appropriate work-management / owner authority.

## 10. Authorized conclusion from this review

The current evidence supports opening a cumulative INNER JOIN transfer capability decision with no runtime change.

It does not, by itself, decide whether Wave 5 should pause, continue, or run in parallel.
