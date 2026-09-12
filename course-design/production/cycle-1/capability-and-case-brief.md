# Capability & Case Brief — Phase 1

All ten required files were available on the repository’s current default branch (`main`). No preserved Stage 3 material was inspected.

## 1. Current validated course position after Stage 1

**SOURCE-REQUIRED.** Stage 1 is the only current learner encounter with a learner route, interaction decisions, implementation, and targeted runtime validation. Current work-management state closes its stabilization workstream to the approved scope; this is explicitly **not** course-level progression validation or evidence of learner mastery.

Stage 1 establishes one particular relational situation: start from `news_article`, identify the corresponding `news_source`, predict one matching source per article, and preserve 18 article rows and the one-article result grain through the JOIN.

**SOURCE-REQUIRED.** Stage 1 was deliberately the first JOIN teaching encounter. It introduces Grain, PK/FK, Cardinality and JOIN and explicitly says later encounters must not automatically repeat the complete first-exposure scaffold.

**OPEN / MISSING AUTHORITY OR EVIDENCE.** There is still no evidence of a meaningful multi-encounter progression, cumulative transfer, or course-level independent performance. The broader course progression and Stage structure remain OPEN.

---

## 2. Candidate capability gap

**SOURCE-REQUIRED.** A required capability remains uncovered:

> **Use relationship Cardinality and target Grain to predict that a JOIN can multiply rows, causing information from the one-side entity to repeat — i.e. recognize a one-to-many fan-out situation before relying on query execution.**

The Exit Criteria require the learner both to predict what relational operations do to rows, including what may be duplicated, and to identify situations in which Cardinality creates fan-out.

Stage 1 does **not** exercise that capability. Its prediction is specifically row preservation, and the Stage 1 authority says that the encounter establishes machinery that can later make row multiplication/fan-out understandable but does not introduce fan-out there.

**PROCESS / PROFESSIONAL PROPOSAL.** This is a strong candidate for the *next* capability because it requires very little new prerequisite knowledge beyond capabilities already exercised in Stage 1 and creates a genuine new reasoning demand rather than another first-JOIN exercise.

This is a proposal about sequencing, not course authority. The Knowledge Map cannot establish that it must come next.

---

## 3. Exit-criteria trace

**SOURCE-REQUIRED.** The target directly advances:

- **Predict relational effects on rows:** particularly what may be duplicated.
- **Identify Cardinality/fan-out situations.**
- **Explicit output Grain:** because recognizing the problem requires distinguishing the intended grain from the natural grain produced by a one-to-many JOIN.

It also corresponds to Knowledge Map capabilities around Cardinality → JOIN row multiplication → fanout and predicting whether operations preserve or change grain. That mapping is a dependency/capability constraint, not evidence that this exact encounter position is mandated.

---

## 4. Existing evidence and residual gap

**SOURCE-REQUIRED.** Stage 1 provides actual learner evidence for a **row-preserving** case: the learner identifies the relationship, reasons about its Cardinality, establishes requested-result Grain, predicts 18 → 18 rows, chooses the semantic combination operation, implements JOIN SQL, and verifies the resulting row count and Grain.

The required targeted test-drive independently observed the relationship → Cardinality → Grain → baseline → prediction → semantic-action chain and confirmed the `18 articles × 1 matching source = 18 rows` reasoning behavior in its tested scope. It explicitly remains non-authoritative and does not establish full course validation.

**SOURCE-REQUIRED.** Nothing in that evidence requires the learner to predict **one-to-many expansion from the one side** or interpret repeated one-side entities after such a JOIN.

Therefore the specific residual gap is primarily an **encounter gap**, not an implementation or validation gap.

**OPEN / MISSING AUTHORITY OR EVIDENCE.** Separately, Stage 1 capabilities are **not yet established for cumulative transfer**. That is a cumulative-progression gap, but it should not be confused with the presently absent fan-out encounter.

---

## 5. Genuine prerequisites

Applying the required “could the learner meaningfully engage without it?” test:

| Candidate prerequisiteFinding    |                                                                                                                                                                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requested/result Grain           | **SOURCE-REQUIRED — genuine.** Without a notion of what a row is supposed to represent, the learner can observe extra rows but cannot meaningfully judge Grain change or repeated entities.                       |
| Cardinality                      | **SOURCE-REQUIRED — genuine.** Predicting multiplication *before execution* requires understanding that one row can match multiple rows.                                                                          |
| JOIN matching-row semantics      | **SOURCE-REQUIRED — genuine.** The learner needs to understand how matches create result rows in order to reason from 1\:M to multiplication.                                                                     |
| PK/FK terminology                | **PROCESS / PROFESSIONAL PROPOSAL — not a strict prerequisite.** It can support relationship reasoning, but fan-out can be reasoned about once the relationship and Cardinality are known.                        |
| Relevant-relation identification | **PROCESS / PROFESSIONAL PROPOSAL — not intrinsically prerequisite.** It is an important course capability, but the fan-out reasoning itself remains meaningful even if the relation pair is already established. |
| JOIN SQL syntax                  | **PROCESS / PROFESSIONAL PROPOSAL — not intrinsically prerequisite to the relational capability.** It becomes useful if implementation is part of the eventual encounter.                                         |
| `COUNT(*)` / Baseline technique  | **PROCESS / PROFESSIONAL PROPOSAL — not prerequisite.** Measurement may support evidence but is not necessary to understand the multiplication mechanism.                                                         |

This deliberately does not turn the Knowledge Map into a teaching sequence.

---

## 6. Course-Assumed Learner State

Based only on Stage 1 authority and validation:

| Capability after Stage 1Legitimate course assumption                          |                                                                                                                                                          |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identify relevant relations from the business request                         | **supported / practised; encounter-validated in one constrained case; not established for cumulative transfer**                                          |
| Identify a relationship-bearing column before formal terminology              | **independently exercised in constrained form; encounter-validated; not established for cumulative transfer**                                            |
| PK/FK                                                                         | **introduced and used as established reasoning; independent general identification not established**                                                     |
| Cardinality                                                                   | **introduced; independently exercised in constrained directional reasoning; encounter-validated; not established for cumulative transfer**               |
| Requested-result Grain                                                        | **introduced; independently exercised in constrained form and used again in verification; encounter-validated; not established for cumulative transfer** |
| Predict row preservation through a many-to-one JOIN                           | **supported / practised and encounter-validated for the Stage 1 case only**                                                                              |
| Semantic choice to combine matching rows                                      | **independently exercised in constrained form before JOIN vocabulary; not established for broader transfer**                                             |
| JOIN                                                                          | **introduced; learner-authored SQL independently exercised after explicit teaching; encounter-validated for this case**                                  |
| Result sanity checking against prior prediction/Grain                         | **supported / practised and encounter-validated in this case**                                                                                           |
| One-to-many row multiplication / fan-out                                      | **not yet established**                                                                                                                                  |
| Optional/missing relationships, NULL/LEFT JOIN behavior                       | **not yet established**                                                                                                                                  |
| Aggregation, existence reasoning, pre-aggregation, multiple-branch fan-out    | **not yet established**                                                                                                                                  |
| Independent end-to-end relational solution planning on an unfamiliar database | **not yet established**                                                                                                                                  |
| Diagnosis of surprising results from structure/relationships                  | **not yet established**                                                                                                                                  |

**SOURCE-REQUIRED.** Previously established Stage 1 concepts may therefore be **reused without being presented again as first-exposure concepts**. Stage 1 authority explicitly requires that later work not automatically repeat its entire first-JOIN scaffold.

---

## 7. Intended learner evidence

**PROCESS / PROFESSIONAL PROPOSAL.** The next evidence should expose the new capability, not merely another successful JOIN.

A sufficient evidence target would require the learner, before execution, to use target Grain plus 1\:M Cardinality to predict that:

1. one starting entity can contribute multiple output rows;
2. information from that entity will repeat;
3. the raw JOIN therefore does not preserve one-row-per-starting-entity Grain;
4. the observed larger result is explained by the relationship structure rather than by accidental duplicate data.

After execution, the learner should be able to reconcile actual result behavior with that prediction.

**OPEN / MISSING AUTHORITY OR EVIDENCE.** Phase 1 does not decide whether this evidence is collected through closed choices, SQL authoring, prepared SQL, explanation, or some combination. That belongs to Encounter Design.

---

## 8. Case Validation against actual schema/data

A clean case exists in the **same current** **`news_source ↔ news_article`** **relationship, approached from the opposite side**.

**SOURCE-REQUIRED — schema facts.** `news_source.news_source_id` is the source PK. `news_article.news_source_id` is a `NOT NULL` FK to it. Each article therefore references one source; one source can be referenced by many articles.

**SOURCE-REQUIRED — seed behavior.** The seed contains 4 news sources and 18 articles. Actual article counts are:

- TechLedger: 5
- Venture Daily: 6
- MarketWire: 5
- HealthTech Review: 2

Thus all four current source rows participate, while an INNER JOIN from sources to their articles produces **18 result rows**. Source information repeats 2–6 times according to actual multiplicity.

This case therefore has:

- base/source Grain: one news source;
- many-side Grain: one news article;
- structural Cardinality: source 1 → M articles;
- article-side relationship optionality: none (`news_source_id NOT NULL`);
- source-side optionality structurally possible, but **not present in the current seed**;
- actual row multiplication: 4 source rows → 18 source/article matches;
- no unmatched source in the seed, so row multiplication can be observed without simultaneously introducing row loss or outer-join NULL behavior.

**PROCESS / PROFESSIONAL PROPOSAL.** That makes this particularly clean for isolating **direction-sensitive one-to-many row multiplication**. It also gives reuse of familiar relations a distinct purpose: Stage 1 asked what happens when each article obtains its one source; this case asks what happens when each source fans out across its many articles.

This is not repetition of the Stage 1 capability.

A plausible analytical situation is a **source-coverage view listing each source alongside every article it published**. The exact business wording is not fixed in Phase 1.

---

## 9. Relevant OPEN or missing-evidence issues

**OPEN / MISSING AUTHORITY OR EVIDENCE.**

- The overall course progression remains OPEN.
- The next encounter is not authorized to be called “Stage 2”.
- No established unit taxonomy authorizes calling this Teaching, Reinforcement, Transfer, Assessment, or anything equivalent.
- The amount of scaffolding for this capability has not been established.
- Whether the learner should encounter the word **fan-out** before, during, or after the reasoning is not determined here.
- Whether relation identification should itself be tested again in this case is not settled by the capability decision.
- Cumulative transfer of Stage 1 capabilities to an unfamiliar relation set remains unvalidated.
- This case addresses single-relationship 1\:M multiplication; it does not establish competence with multi-branch multiplicative fan-out.

None of those OPEN issues prevents the narrow case from being reviewed at the lightweight pedagogy gate.

---

## 10. Explicit non-decisions

**SOURCE / PROCESS BOUNDARY.** This brief does **not** decide:

- encounter name or Stage number;
- learner route or step count;
- exact business prompt;
- reveal order or concept timing;
- hint structure;
- whether SQL is learner-authored or supplied;
- whether baseline measurement is used;
- the wording/timing of `fan-out`;
- global schema exposure;
- whether familiar relations should remain the final design choice after pedagogy review;
- any preserved Stage 3 reuse;
- any subsequent capability after this one;
- that any Stage 1 capability is mastered or transferable course-wide.

No Encounter Design Packet has been produced.

---

## 11. Final Phase-1 recommendation

**SOURCE-REQUIRED.** A required fan-out/row-multiplication capability remains absent, and the current validated Stage 1 case was intentionally row-preserving. Adding the missing capability is therefore not merely Stage 1 implementation or validation work.

**PROCESS / PROFESSIONAL PROPOSAL.** Open the lightweight Pedagogy Gate with this narrowly defined target:

> **Target capability:** Given an intended starting Grain and a known 1\:M relationship, predict before execution that joining from the one side to many-side detail can multiply rows, repeat one-side information, and change the natural result Grain; then interpret observed multiplication from the relationship rather than as accidental duplication.

> **Validated case:** `news_source → news_article`, using the existing 4-source / 18-article data. Every seeded source has multiple articles, so an INNER JOIN expands 4 source rows to 18 article-level matches without simultaneously introducing unmatched-row or NULL behavior.

This recommendation does not claim that this ordering is mandated by course authority. It is the Phase-1 proposal that best fits the remaining required capability, currently available prerequisites, and actual supplied data.

PROCEED
