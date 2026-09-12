# Cycle 1 Lightweight Independent Pedagogy Gate — Row Multiplication Case Validation

**Role:** Independent Pedagogy Reviewer  
**Gate:** Lightweight Independent Pedagogy Gate  
**Date:** 2026-09-12  
**Verdict:** **PROCEED**

## Scope and independence

This review evaluates only whether the current Case Validation provides a sound basis for proceeding to Encounter Design under `learner-encounter-production-process.md`.

It does not redesign the case, define a learner route, determine UI or scaffolding, choose wording, define a SQL exercise, or establish new course authority.

The review was formed independently from the permitted current sources below. The Encounter Architect's selected case, rankings, authenticity assessment, and professional judgments were not treated as presumptively correct. No previous pedagogy review, previous Case Validation artifact, provenance conclusion, preserved future-stage material, repository history, or historical production decision was used.

## Sources reviewed

1. `learner-encounter-production-process.md`
2. `course-work-management.md`
3. `course-exit-criteria.md`
4. `course-knowledge-map.md`
5. `pedagogical-foundations.md`
6. `course-design/stage-1/stage-1-learner-route.md`
7. `course-design/stage-1/stage-1-interaction-decisions.md`
8. `course-design/test-drives/stage-1-targeted-test-drive-2026-09-10.md`
9. `startup-ecosystem/startup-ecosystem-schema.sql`
10. `startup-ecosystem/startup-ecosystem-seed.sql`
11. `course-design/production/cycle-1/case-validation-row-multiplication-2026-09-12.md`

All required sources were available on the repository's current default branch, `main`.

## Independent gate assessment

### 1. Claimed capability gap

**Assessment: PASS.**

The target capability is to use relationship Cardinality and target Grain to predict that a JOIN can multiply rows and repeat information from the one-side entity.

That capability is required by current course authority. The Exit Criteria require prediction of what relational operations do to rows, including what may be duplicated, and require identifying situations where Cardinality or multiple one relationships create fan-out. The Knowledge Map separately requires inferring output multiplicity from Cardinality, predicting whether a JOIN may multiply rows, stating output Grain after a JOIN, and identifying repeated information from one side.

Current Stage 1 does not close this gap. Its validated reasoning case is deliberately contrasting: one article matches one source, and adding source information preserves one article per output row and the 18-row baseline. The Stage 1 interaction authority explicitly says that encounter establishes the mechanism that later makes row multiplication / fan-out understandable without introducing fan-out there. The current work-management source identifies Stage 1 as the only validated learner encounter. There is therefore no current learner evidence that the row-multiplication capability has already been exercised.

### 2. Whether a new encounter is required

**Assessment: PASS — a new encounter is required.**

The remaining gap is an encounter/evidence gap, not merely an implementation or validation defect in Stage 1. Stage 1's accepted scope is row/grain preservation through a one-match-per-base-row JOIN. Extending validation of that same encounter cannot establish that the learner can reason about a one-to-many direction that changes row multiplicity. A new learner situation is therefore justified.

### 3. Genuine prerequisites

**Assessment: PASS.**

The genuinely necessary prior reasoning for this target includes result Grain and relationship Cardinality: the target capability explicitly requires using both to predict multiplicity. Some operational understanding of JOIN is also relevant because the prediction concerns JOIN behavior; current Stage 1 has already introduced JOIN and `ON` from an established relationship.

The Case Validation does not claim that every Stage 1 move is a strict prerequisite. It records the broader Course-Assumed Learner State and then limits the new target to Cardinality + Grain → row multiplication. No unnecessary prerequisite is imposed merely because a capability is conceptually related.

### 4. Course-Assumed Learner State

**Assessment: PASS.**

The learner-state statement is appropriately bounded. It treats Stage 1 concepts and actions as previously introduced/exercised with substantial first-exposure support and recognizes the available encounter/runtime evidence. It explicitly does **not** infer cumulative independent transfer or mastery.

It also correctly avoids assuming later Knowledge Map capabilities such as LEFT JOIN / missing-relationship semantics, aggregation, pre-aggregation, bridge-table reasoning, NULL-driven metric interpretation, or composite-key reasoning as already learned.

No unsupported strengthening of the current learner state was found.

### 5. Can the selected case exercise the intended capability?

**Assessment: PASS.**

The selected `funding_round → round_investment` case has the required relational shape:

- one `funding_round` row represents one funding round;
- one `round_investment` row represents one recorded investment participation;
- `round_investment.funding_round_id` is a non-null FK to `funding_round.funding_round_id`;
- one funding round can therefore be referenced by multiple participation rows;
- the requested result Grain is one recorded round-investor participation.

The current seed materially exercises this shape. It contains 26 funding rounds and 72 round-investment rows, every current round has at least one participation, and current rounds have between one and four participation rows. Round `1003`, for example, has four distinct participation records, so round-level information repeats across four participation-grain rows.

This is direct evidence that the case can support a pre-execution Cardinality + Grain prediction and a post-execution inspection of legitimate one-side repetition.

### 6. Comparative Case Validation

**Assessment: PASS.**

The comparison is proportionate and materially comparative rather than a single-case sufficiency check. It evaluates four plausible one-to-many cases:

- `funding_round → round_investment`;
- `news_source → news_article`;
- `company → funding_round`;
- `company → company_founder`.

The review independently verified the material comparison facts:

- `news_source → news_article` reproduces the same 18 article-grain joined rows already encountered in Stage 1;
- `company → funding_round` includes a current unmatched parent (`company_id = 20`), so an INNER JOIN combines multiplication with disappearance;
- `company → company_founder` gives clean current multiplication but naturally raises founder-identity and temporal-role semantics if made business-readable;
- the selected funding-round case gives current-data multiplication without an actual unmatched funding-round disappearance.

The process requires a relevant, proportionate comparison, not exhaustive ranking of every one-to-many edge in the schema. No omitted alternative in the permitted sources was found to invalidate the stated comparison or make the selected case merely arbitrary.

### 7. Consequence-grounding of professional judgments

**Assessment: PASS.**

The material professional judgments identify concrete features and learner/evidence consequences rather than relying on labels alone.

Examples include:

- the familiar news case lowers schema load but risks allowing recognition of a previously seen result shape rather than new transfer evidence;
- the company/funding-round case introduces actual unmatched-parent disappearance, which could confound evidence about multiplication at the learner's current position;
- the founder case tends to require another relation for founder identity and introduces temporal-role semantics, increasing non-target reasoning load;
- the selected funding case changes domain and relation pair while keeping the current observed result focused on multiplication and repeated one-side information.

These judgments are sufficiently consequence-grounded for this gate.

### 8. Material trade-off

**Assessment: PASS.**

The principal trade-off is explicit: maximum continuity/minimum load in `news_source → news_article` versus stronger transfer evidence in `funding_round → round_investment`.

The rationale states which learner consequence matters more now and why: after a supported first JOIN encounter, demonstrating the same reasoning machinery on a new direct relationship provides stronger evidence that the learner is reasoning from Cardinality + target Grain rather than recalling the already-seen article/source output shape. The selected case also avoids the actual unmatched-parent disappearance present in the company/funding-round alternative.

This is a local selection rationale, not a new rule that novelty or transfer always outranks familiarity.

### 9. Business / analytical task, requested output, and Grain

**Assessment: PASS.**

The selected analytical situation is independently coherent. A participation/lead audit needs to inspect the participation records attached to funding rounds, including which investor record is attached and whether that participation is marked as lead. The requested output Grain of one recorded round-investor participation follows from that task.

The output remains meaningful without the teaching objective: a round-level view expanded into participation-level audit rows is a normal analytical/data-quality transformation. The case does not require a contrived output Grain merely to expose row multiplication.

### 10. Independent motivation for the additional information / relation / operation

**Assessment: PASS.**

The participation-level information required by the task is not present at funding-round Grain. `round_investment` stores the requested `investor_id`, `is_lead`, and participation identity and is directly related to `funding_round` through the FK.

Consulting `round_investment` is therefore a natural consequence of the analytical information need. The target relational behavior arises because the requested information lives at a finer, one-to-many participation Grain, not because an otherwise unnecessary field or relation was added to manufacture multiplication.

The Case Validation also appropriately excludes `round_investment.amount` from the core evidence because its NULLs and intentional non-reconciliation with reported round totals would create a separate metric-semantics problem. Avoiding that branch strengthens rather than manufactures the target case.

### 11. Does the relational difficulty arise naturally?

**Assessment: PASS.**

Yes. Multiple participation rows per funding round are inherent in the relation and current data, and the requested participation-grain output naturally carries repeated round context. The learner difficulty is therefore a real consequence of the analytical request crossing from round Grain to participation Grain.

The case is not centered on an otherwise unmotivated flawed proposal, so the process's special test for deliberately flawed proposals is not triggered.

### 12. Proposed learner evidence

**Assessment: PASS.**

The proposed evidence corresponds directly to the target capability. It requires the encounter to be capable of eliciting evidence that the learner can:

1. establish or use the target result Grain;
2. use relationship Cardinality to recognize multiple detail-side matches for one one-side row;
3. predict row multiplication before execution;
4. predict which one-side information repeats;
5. inspect actual results and reconcile the observed repetition with the earlier prediction.

This is materially stronger evidence than successful SQL execution alone and directly traces to the current Exit Criteria and Knowledge Map.

### 13. Missing authority / evidence and unresolved decisions

**Assessment: PASS — no owner decision is required to proceed.**

The factual evidence needed for this gate is available. One important schema/data distinction is correctly surfaced: the schema does not guarantee that every possible funding round has a participation row, even though every current seeded round does. This is not missing evidence; it is a known boundary that Encounter Design must preserve rather than silently generalize away.

The Case Validation leaves several matters undecided, including exact encounter boundary, interaction pattern, terminology timing, baseline use, scaffolding level, investor-name resolution, and broader Stage structure. None of those requires resolution in order to decide whether this case is a sound basis for Encounter Design. They can remain within their proper later design/authority scope without weakening the target capability or case validation.

No current OPEN matter requires Course Authority Owner resolution before Encounter Design can begin.

## Factual corrections

None.

The material schema/data claims that affect case selection were checked against the permitted current schema and seed and were supported.

## Material professional concerns

None requiring revision before Encounter Design.

The selected case carries a known design guardrail, not a gate defect: future design must distinguish schema-level parent optionality from the current seed fact that all 26 funding rounds presently have at least one participation. Treating current preservation as a universal schema guarantee would create a factual/evidence defect, but the Case Validation already identifies this boundary explicitly.

## Advisory recommendations

These do not change the gate verdict and do not create new course authority:

- keep the core learner evidence focused on multiplication/repeated one-side information rather than turning exact total row-count recall into the capability;
- preserve the current Case Validation's exclusion of amount/metric interpretation unless a later design independently justifies that extra reasoning;
- do not add investor-name resolution merely for realism if doing so introduces subtype/identity complexity that is unnecessary for the accepted capability.

## OPEN / authority issues

No OPEN matter requires owner authority for this gate.

Broader Stage structure remains OPEN at course level, but it is not necessary to establish before producing this encounter's design. The gate therefore does not escalate it.

## Final gate verdict

# **PROCEED**

The current Case Validation provides a sound basis for Encounter Design. The capability gap is real, a new encounter is justified, the learner-state assumptions are bounded, the selected case naturally exercises the target reasoning, materially plausible alternatives were compared, the selection trade-off is consequence-grounded, the analytical task is independently coherent, the additional relation is independently motivated, and the proposed learner evidence matches the target capability.

## Exact consequence for the next process step

Only `PROCEED` opens Encounter Design. The next process step is therefore:

**Encounter Architect — produce the Encounter Design for the accepted `funding_round → round_investment` row-multiplication case, using the validated target capability and Case Validation as design input without treating this pedagogy review as new course authority.**

This review does not authorize implementation and does not modify execution-state machinery.