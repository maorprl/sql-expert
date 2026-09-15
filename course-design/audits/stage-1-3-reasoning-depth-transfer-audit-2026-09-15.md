# Stage 1–3 Reasoning Depth & Transfer Audit

**Date:** 2026-09-15  
**Status:** AUDIT COMPLETE — UNREVIEWED — NO RUNTIME CHANGE  
**Baseline:** `main` at `1856d9a68c013bdf455f3339a3c641869529bd1d`  
**Scope:** Current Stage 1–3 reasoning depth, evidence independence, scaffolding strength, and cumulative transfer evidence

## 1. Purpose

This audit asks a narrower question than whether the current encounters are understandable or technically correct:

> Does each evidence-bearing learner action require the reasoning that the encounter claims it evidences, and does the Stage 1–3 progression eventually require the learner to reuse the covered JOIN reasoning with enough independence to support a cumulative transfer claim?

The audit was triggered by a concern that some prediction interactions may have low inference distance: the supplied premises may sit very close to the correct response, allowing recognition or direct application without much independent relational reasoning.

This audit does **not** assume that greater inference distance is always better. The required reasoning distance depends on instructional function and Course-Assumed Learner State. First exposure may legitimately use stronger scaffolding than reinforcement, integration, transfer, or assessment.

## 2. Governing standards

The audit uses existing current standards rather than inventing a new “inference distance score.”

### 2.1 Evidence Independence Test

From `learner-encounter-production-process.md`:

For every evidence-bearing learner action, ask whether a learner could produce the correct response from quantities, wording, conclusions, answer structure, or scaffolds already supplied **without performing the target reasoning**.

If yes, the action may still be useful as guidance, practice, or supporting evidence, but it must not by itself be treated as sufficient core evidence of the claimed capability.

### 2.2 Scaffolding-to-Evidence Calibration

Support must match both:

- the Course-Assumed Learner State; and
- the claimed evidence strength.

Scaffolding appropriate for first exposure must not automatically be treated as transfer or independent-performance evidence.

### 2.3 Course-level cumulative requirement

`course-exit-criteria.md` ultimately requires the learner to solve a business question about an unfamiliar database through relational understanding rather than random SQL trial and error, including predicting row behavior, defining output Grain, building a relational plan before SQL, and validating results.

`course-work-management.md` also states that project completion requires validation both at individual-encounter level and as a cumulative progression across encounters.

This audit does not claim that the three current JOIN encounters must already satisfy the full course exit criteria. It asks what strength of evidence they currently provide for the JOIN-related subset of those capabilities.

## 3. Current sources inspected

Course-level:

- `course-exit-criteria.md`
- `course-knowledge-map.md`
- `pedagogical-foundations.md`
- `learner-encounter-production-process.md`
- `course-work-management.md`

Stage 1:

- `course-design/stage-1/stage-1-learner-route.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`
- `src/media-coverage.js`

Stage 2:

- `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-and-waiver-2026-09-13.md`
- current `src/funding-participation.js`

Stage 3:

- `course-design/stage-3/stage-3-learner-route.md`
- `course-design/stage-3/stage-3-interaction-decisions.md`
- current `src/inner-join-unmatched.js`

No older course implementation is used as authority.

## 4. Audit lens

For each material reasoning interaction, the audit asks:

1. What capability is the interaction intended to evidence?
2. What premises have already been supplied or established?
3. What transformation must the learner actually perform?
4. Could wording, numbers, answer structure, or scaffolding bypass that transformation?
5. Is the interaction Teaching, supported practice, stronger reinforcement/integration, or transfer-strength evidence?
6. Does the next encounter reduce support or require a meaningfully different application?
7. Across the sequence, is there evidence that the learner can independently decide which relational model to apply to a new case?

## 5. Stage 1 — first JOIN teaching encounter

### 5.1 Intended function

Stage 1 is explicitly the first JOIN teaching encounter. Grain, PK/FK, Cardinality, and JOIN are first-exposure concepts in this encounter. The course therefore provides substantial meaning-first guidance and progressive teaching before independent SQL authoring.

The prediction occurs before JOIN terminology is introduced.

### 5.2 Prediction evidence

Before prediction the learner has established:

- requested-result Grain = one article per row;
- baseline = 18 article rows;
- each article matches one source row.

The learner then predicts:

- 18 result rows;
- one article per result row;
- source information is added without row multiplication.

### 5.3 Evidence-independence assessment

**Finding: FIT FOR FIRST-EXPOSURE PURPOSE; NOT TRANSFER-STRENGTH EVIDENCE.**

The reasoning distance is intentionally short. Once the learner has 18 starting rows and one source match per article, the correct row-count prediction is strongly constrained.

A learner may be able to reach `18` with only shallow arithmetic or pattern recognition. Therefore this prediction should **not** be interpreted as evidence that the learner can independently diagnose arbitrary JOIN behavior in a new case.

However, that is not the stated instructional function of Stage 1. The encounter is teaching the mechanism for the first time. The prediction is used to bind together Grain, Cardinality, baseline, and row preservation before JOIN vocabulary and SQL mapping are introduced.

The closed options also distinguish different relational interpretations rather than asking for recall of `18` alone:

- preserve one article per row;
- collapse to source Grain;
- multiply article rows.

The later teaching sequence explicitly maps established relationship → matching rows → JOIN → `ON` → whole query, followed by learner-authored SQL and result verification.

### 5.4 Verdict

**LOCAL VERDICT: PASS.**

No Stage 1 redesign is justified by reasoning-distance concerns alone.

**Evidence-strength boundary:** Stage 1 demonstrates supported first-exposure reasoning and implementation. It must not be counted as independent cumulative JOIN transfer evidence.

## 6. Stage 2 — JOIN row multiplication

### 6.1 Intended function

Stage 2 reuses already-introduced Grain, Cardinality, JOIN, and result verification with reduced first-exposure teaching. Its target capability is to integrate target Grain and one-to-many Cardinality to predict JOIN row multiplication and distinguish repeated one-side context from duplicate detail rows.

### 6.2 Previously identified evidence-independence defect

The Stage 2 design already encountered the exact class of problem this audit is checking.

The original numerical core prompt supplied a concrete multiplicity of three participation rows and then asked how many result rows would be needed. The owner-directed revision explicitly classified that as an evidence defect because direct counting could bypass the intended integration of Grain + Cardinality.

The revised design moved the numerical `3 → 3` question to supporting application and made the core evidence qualitative.

### 6.3 Current core evidence

The current runtime first presents only:

- result Grain = one participation per row;
- one funding round can relate to multiple participations.

It then asks what must be possible if the same funding round has several recorded participations.

The learner must infer that the same funding round can occupy several result rows so that all participation records remain represented.

A second prediction asks whether repeated funding-round context across those rows makes the rows duplicates.

Only after those two predictions is the behavior named `JOIN row multiplication`, followed by the concrete `3 participations → 3 rows` application.

### 6.4 Evidence-independence assessment

**Finding: CORE EVIDENCE PASSES THE CURRENT EVIDENCE-INDEPENDENCE STANDARD.**

The core qualitative prediction does not supply a concrete child count that can simply be copied into a row count. The learner must combine:

- target Grain at the participation level; and
- one-to-many relationship possibility.

The repetition question then requires a second distinction: repeated one-side values do not imply duplicate participation rows when row identity remains at the participation Grain.

The actual 1003 result slice later requires reconciliation of repeated round fields with changing participation identifiers.

This is materially stronger evidence than Stage 1 because the learner reuses prior concepts with less first-exposure teaching and must integrate them before the new Concept Moment is named.

### 6.5 Remaining evidence-strength boundary

Stage 2 is still guided:

- the relevant premises are explicitly surfaced;
- the learner is told which relational dimensions to hold together;
- the questions are constrained;
- the encounter is designed around the target phenomenon.

That is appropriate for reinforcement/integration. It is not the same as independently recognizing an unannounced multiplicity risk in an unfamiliar analytical case.

### 6.6 Verdict

**LOCAL VERDICT: PASS.**

The earlier evidence-independence defect has already been corrected in current authority and runtime.

**Evidence-strength boundary:** Stage 2 provides meaningful integration/reinforcement evidence for row multiplication, but does not by itself establish cumulative independent transfer.

## 7. Stage 3 — zero-match INNER JOIN survival and coverage

### 7.1 Intended function

Stage 3 develops a new boundary-case capability on top of the already-learned INNER JOIN:

- a starting row with zero matches contributes zero INNER JOIN result rows;
- total result-row count does not prove entity coverage.

The result remains funding-round Grain.

### 7.2 Learner-generated premise

The zero-match case is **not injected as a finished answer**.

The learner runs two prepared measurements:

1. company rows;
2. funding-round rows with company IDs.

The learner compares the two result sets and identifies a company that exists in `company` but has no matching `funding_round` row.

Only after the learner has generated that evidence does the prediction ask what INNER JOIN will do with that unmatched company.

### 7.3 Prediction evidence

The learner chooses among materially different relational interpretations:

- zero result rows because no matched row pair exists;
- preserve the company once merely because it exists on the company side;
- fail to produce a result because one company is unmatched.

The wrong-answer feedback redirects to matched-row-pair semantics rather than merely repeating `zero`.

### 7.4 Evidence-independence assessment

**Finding: PASSES FOR THE STATED NEW BOUNDARY-CASE CAPABILITY.**

The premise `no matching funding_round row` is legitimately required evidence, not the conclusion. Mapping that premise to `zero INNER JOIN result rows` requires applying INNER JOIN matching semantics.

The reasoning distance is still relatively short, but this is not automatically a defect. Stage 3 is the first explicit encounter with zero-match INNER JOIN survival. Stronger independent transfer is not required merely to make first exposure valid.

The learner also had to discover the zero-match case from data before applying the rule.

### 7.5 Verification and coverage conclusion

After SQL execution the learner must inspect actual Results for the unmatched company ID rather than infer company coverage from total row count.

The final coverage interaction then requires the learner to reconcile two facts:

- the result has 26 funding-round rows;
- one of the 12 company rows is absent.

This directly exercises the knowledge-map distinction between row count, result Grain, and entity coverage.

### 7.6 Verdict

**LOCAL VERDICT: PASS.**

No evidence-independence defect was found that justifies reopening the current Stage 3 prediction or verification design.

**Evidence-strength boundary:** Stage 3 demonstrates learner-generated evidence plus direct application of known INNER JOIN matching semantics to a new zero-match boundary case. This is useful reuse / near-transfer evidence, but it still does not require the learner to decide independently which JOIN-behavior model matters in an unannounced new case.

## 8. Cross-stage progression

### 8.1 What the current progression does successfully

The three encounters show a meaningful reduction / change in scaffolding rather than repeating the same task:

| Encounter | Primary role | Reasoning demanded |
|---|---|---|
| Stage 1 | First exposure / teaching | Preserve article Grain and row count under one match per article; learn how established relationship becomes JOIN / ON. |
| Stage 2 | Reinforcement / integration | Combine participation Grain + one-to-many Cardinality to predict multiplication and distinguish repeated context from duplicates. |
| Stage 3 | New boundary-case reuse | Discover a real zero-match case, apply INNER JOIN survival behavior, and separate result-row count from entity coverage. |

This is not three copies of the same `X → X rows` exercise.

Stage 2 in particular contains an explicit historical correction that removed an evidence shortcut and replaced it with qualitative core evidence before numerical practice.

### 8.2 What the progression does not yet establish

Across all three encounters, the course still tells the learner which local reasoning problem is currently under examination.

The learner has not yet been required, in one new case, to independently determine something like:

- which relations matter;
- what one requested result row should represent;
- which relationship/Cardinality facts are relevant;
- whether the JOIN should preserve rows, multiply one-side context, or drop unmatched rows;
- what result behavior should be predicted before execution;
- what evidence should be checked after execution;
- whether a surprising result reflects expected relational behavior or an analytical defect.

The individual ingredients have been exercised, but the learner has not yet had to select and coordinate the relevant model with substantially reduced cueing.

## 9. Cumulative transfer finding

**Finding: CUMULATIVE-PROGRESSION GAP IDENTIFIED.**

This is **not** a local Stage 1, Stage 2, or Stage 3 defect.

It is an evidence-strength gap between:

- supported first exposure;
- guided reinforcement/integration;
- guided boundary-case reuse;

and a stronger claim that the learner can independently transfer the covered JOIN reasoning to a new analytical situation.

The current evidence therefore supports claims such as:

- learner can reason through the validated Stage-local JOIN cases under the current scaffolding;
- learner can integrate Grain and Cardinality to predict row multiplication in Stage 2;
- learner can apply known INNER JOIN matching behavior to learner-generated zero-match evidence in Stage 3.

The current evidence does **not yet** support a stronger claim such as:

> Given a new analytical request and unfamiliar relation pair, the learner can independently decide which covered JOIN behavior matters, build the relational plan, predict row consequences, implement it, and validate the result with materially reduced cueing.

## 10. Relationship to the Exit Criteria

The gap is relevant to the following current exit-criteria directions:

- solve a business question about an unfamiliar database through relational understanding;
- explicitly define output Grain;
- identify where required information is stored;
- predict what relational operations preserve, remove, or duplicate;
- build a relational plan before SQL;
- validate results with sanity checks;
- diagnose relational causes rather than randomly modifying SQL.

This audit does not claim those full-course exit criteria should already be satisfied after three JOIN encounters. Much of the knowledge map remains untaught.

The narrower conclusion is that **the currently covered JOIN subset has not yet been validated at cumulative independent-transfer strength**.

## 11. What not to do

This finding does **not** justify increasing difficulty arbitrarily.

Do not add questions involving concepts merely to create more inference distance when those concepts have not been taught or established, including examples such as:

- `DISTINCT` as a learner-facing repair decision if it has not been taught;
- LEFT JOIN / `NULL` behavior before the course has introduced them;
- aggregation or fan-out repair merely to make an INNER JOIN question harder.

Do not weaken Stage 1 first-exposure scaffolding simply to manufacture transfer evidence inside the teaching encounter.

Do not reopen Stage 2's already-corrected evidence sequence without new evidence of a defect.

Do not redesign Stage 3 merely because its first zero-match prediction is a direct application of a newly introduced boundary case.

## 12. Recommended next action

**Pause Wave 5 assistance design until this cumulative-progression question receives an explicit capability decision.**

The next action should be a **Capability / Case planning gate for cumulative transfer of the already-covered INNER JOIN reasoning**, not implementation.

That gate should determine:

1. whether stronger transfer evidence is required now or can legitimately wait for later course progression;
2. whether a new learner encounter is necessary or whether another validation form can supply the missing evidence;
3. what Course-Assumed Learner State the first three encounters actually justify;
4. what reasoning must be performed with materially reduced cueing;
5. what case can test that reasoning without introducing untaught concepts or manufacturing difficulty;
6. what evidence would distinguish genuine transfer from recognition of a familiar Stage pattern.

Case selection must remain open during that gate. This audit does not authorize a particular schema pair, business scenario, Stage number, or runtime change.

## 13. Final verdict

**LOCAL ENCOUNTER VERDICT:**

`PASS — NO REASONING-DEPTH DEFECT REQUIRES REOPENING STAGE 1, STAGE 2, OR STAGE 3`

**CUMULATIVE PROGRESSION VERDICT:**

`GAP IDENTIFIED — INDEPENDENT TRANSFER OF THE CURRENTLY COVERED INNER JOIN REASONING IS NOT YET ESTABLISHED`

**NEXT ACTION:**

`CAPABILITY / CASE PLANNING GATE FOR CUMULATIVE INNER JOIN TRANSFER — NO RUNTIME CHANGE`
