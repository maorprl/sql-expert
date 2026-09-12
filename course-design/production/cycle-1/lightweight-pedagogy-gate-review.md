# Lightweight Pedagogy Gate Review — Cycle 1

All ten required repository files were available on the current default branch (`main`). I did not inspect preserved Stage 3 material. The supplied Capability & Case Brief was reviewed as the Encounter Architect’s Phase-1 artifact.

## 1. Capability-gap verdict

**SOURCE-REQUIRED — CONFIRMED.**

The gap exists.

The Exit Criteria explicitly require the learner to predict what relational operations do to rows, including what may be duplicated, and to identify situations in which Cardinality creates fan-out.

Stage 1 deliberately exercises the opposite relational behavior: `news_article → news_source`, where every article matches one source and the learner predicts preservation of 18 rows at one-article-per-row Grain. Its authority explicitly says that this establishes machinery for later row multiplication/fan-out reasoning but does not introduce fan-out in Stage 1.

**Verdict:** the Brief identifies a real uncovered capability.

## 2. Gap-classification verdict

**SOURCE-REQUIRED — CONFIRMED AS AN ENCOUNTER GAP.**

This is not merely an implementation or validation defect in Stage 1. Current management state identifies Stage 1 as the only implemented and validated learner encounter and explicitly directs the next planning activity toward determining the next required capability rather than automatically extending Stage 1.

There is also a separate **cumulative-progression gap** because broader transfer across encounters has not been validated. The Brief correctly keeps that distinct rather than using it to reclassify the missing fan-out encounter.

**Verdict:** primarily **encounter gap**, with a separate non-blocking cumulative-progression gap.

## 3. New-encounter necessity verdict

**SOURCE-REQUIRED — CONFIRMED.**

Some new learner encounter is required if this Exit-Criteria capability is to be covered. Expanding Stage 1 to teach one-to-many expansion would change the established scope of the calibrated first-JOIN encounter rather than merely fix its implementation.

This does **not** establish that the encounter must be called Stage 2. Current authority explicitly leaves subsequent Stage structure and overall progression OPEN.

## 4. Prerequisite verdict

**PEDAGOGICAL / PROCESS JUDGMENT — ACCEPTED.**

The Brief applies the genuine-prerequisite test correctly.

Requested/result Grain, Cardinality, and the semantic fact that matching rows generate JOIN result rows are genuine prerequisites to predicting 1\:M multiplication before execution. The Knowledge Map supports the underlying dependency relationships, while explicitly warning that those dependencies are not automatically a teaching sequence.

The Brief is also correct not to elevate PK/FK terminology, relation identification, JOIN syntax, or `COUNT(*)` into intrinsic prerequisites for the narrow relational capability.

No prerequisite appears to have been added merely because of Knowledge Map adjacency.

## 5. Course-Assumed Learner-State verdict

**SOURCE-REQUIRED — ACCEPTED WITH THE STATED LIMITS.**

The Brief is appropriately conservative.

Stage 1 actually requires constrained learner reasoning about relation selection, relationship-bearing columns, Cardinality, requested-result Grain, semantic combination, learner-authored JOIN SQL, and final verification.

The Brief repeatedly limits those claims to the Stage 1 case and states that cumulative transfer is not established. That is important: encounter completion is not being converted into a mastery claim.

The September 10 test drive supplies useful observed evidence about the reasoning chain, but it is explicitly **REFERENCE ONLY / NON-AUTHORITATIVE** and cannot itself establish course authority. The Brief does not improperly promote it to authority.

**Verdict:** no materially overstated learner-state assumption blocks proceeding.

## 6. Case-validity verdict

**SOURCE-REQUIRED + PEDAGOGICAL / PROCESS JUDGMENT — ACCEPTED.**

The proposed `news_source → news_article` case genuinely contains the required relational behavior.

Schema facts support:

- `news_source.news_source_id` as PK;
- `news_article.news_source_id` as `NOT NULL` FK;
- each article referencing one source;
- a source structurally permitting zero-to-many articles.

The supplied seed has four sources and 18 articles. Counts are TechLedger 5, Venture Daily 6, MarketWire 5, and HealthTech Review 2. Thus every seeded source participates and the INNER JOIN produces 18 matches, repeating each source 2–6 times.

Reuse of the same relationship has a distinct purpose. Stage 1 reasons from many-side article → one source and predicts preservation. This proposal reasons from one source → many articles and exposes multiplication. That is not merely repetition.

Familiarity is not itself a material defect. It may actually isolate the new relational consequence. However, the eventual evidence must not be reducible to remembering that “18” appeared previously.

**Important boundary:** the case establishes change from the **starting source Grain** to the natural joined-result Grain. The exact **desired output Grain** remains dependent on the business situation selected during Encounter Design and must not be silently pre-decided here.

## 7. Evidence-target verdict

**PEDAGOGICAL / PROCESS JUDGMENT — APPROPRIATE.**

The proposed evidence targets the intended capability rather than successful JOIN execution alone.

Requiring the learner to predict multiple output rows per source, recognize repeated one-side information, connect that behavior to 1\:M Cardinality, and reconcile execution with the prior prediction is appropriate evidence for this capability.

One constraint should carry forward: **“raw JOIN does not preserve one-row-per-starting-entity Grain” is currently a statement about the starting/input Grain, not automatically the desired business-output Grain.** Encounter Design must establish the latter from its business question.

That distinction does not require the Brief to be revised before design.

## 8. Material risks or unsupported assumptions

The main risks are **PEDAGOGICAL / PROCESS JUDGMENT**, not blockers:

- Same-relation familiarity could permit a shallow “4 becomes 18” answer if the future interaction assesses only row count. The approved capability requires multiplicity, repetition, and Grain reasoning, so the design evidence must preserve those elements.
- The starting Grain and desired output Grain must not be conflated.
- The familiar `1 → M` relationship was already exposed in Stage 1. Therefore merely recognizing that the relationship is 1\:M would not constitute the new learner evidence; the new evidence is deriving its row-behavior consequence.
- The September 10 test drive may support factual observations about the tested experience but remains non-authoritative.

I found no professional sequencing judgment in the Brief improperly represented as existing course authority. The recommendation that fan-out is a strong next capability is explicitly labeled as a proposal rather than a mandated sequence.

## 9. OPEN / owner decisions

**OPEN / MISSING AUTHORITY OR EVIDENCE — NON-BLOCKING AT THIS GATE.**

Overall course progression, subsequent Stage structure, exact business wording, exact desired output Grain, scaffolding amount, timing of the term `fan-out`, whether relation identification is exercised again, and the form in which evidence is collected remain legitimately undecided.

None must be resolved by the Course Authority Owner before Encounter Design begins. Current process explicitly allows the lightweight gate to approve capability and case before those design decisions are made.

## 10. Final gate decision

The approved capability decision for Encounter Design is:

> Given a known one-to-many relationship and an established starting Grain, the learner should be required to predict before execution that joining from the one side to many-side detail can create multiple result rows per starting entity, repeat one-side information, and change the natural result Grain, and then explain observed multiplication through relationship structure rather than accidental duplication.

The case accepted as sufficiently justified for design exploration is **`news_source → news_article`** **using the current 4-source / 18-article seed data**.

Encounter Design may carry forward the actual PK/FK structure, 1\:M Cardinality, lack of unmatched seeded sources, actual 4 → 18 result behavior, prior Stage 1 introduction of Grain/Cardinality/JOIN, and the explicit absence of cumulative-transfer evidence.

It may **not** carry forward as settled: a Stage number, exact business prompt, desired output Grain, scaffolding level, relation-identification requirement, evidence interaction format, or timing/wording of `fan-out`.

PROCEED