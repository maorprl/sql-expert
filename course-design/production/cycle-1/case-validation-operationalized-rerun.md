# Cycle 1 — Operationalized Case Validation Delta Rerun

**Role:** Encounter Architect  
**Status:** ARCHITECT RERUN COMPLETE — TARGETED INDEPENDENT LIGHTWEIGHT PEDAGOGY GATE REQUIRED  
**Scope:** Authorized Case Validation decision rerun only; not a Cycle 1 restart, not a new encounter-design cycle, and not implementation authority

This artifact is the new durable handoff required by the current execution override in `learner-encounter-production-execution.md`. It performs Cycle 1 Case Validation afresh under the current operationalized `learner-encounter-production-process.md`.

The earlier `course-design/production/cycle-1/case-selection-delta-review.md` was not used to establish the candidate set, weighting, or decision. It was inspected only after the decision below had been formed, for traceability and impact comparison.

---

## 1. Entry gate and current authority

The mandatory entry gate is satisfied.

`learner-encounter-production-execution.md` explicitly authorizes:

> **Encounter Architect — targeted Cycle 1 Case Validation delta rerun under the current operationalized process**

Rule-Based Acceptance remains paused pending this rerun and the independent Lightweight Pedagogy Gate required by Change Impact §12.4.

Current sources read for the decision:

- `learner-encounter-production-process.md`
- `learner-encounter-production-execution.md`
- `course-design/production/cycle-1/capability-and-case-brief.md`
- `course-design/production/cycle-1/lightweight-pedagogy-gate-review.md`
- `course-design/production/cycle-1/reconciled-encounter-design-packet.md`
- `course-design/production/cycle-1/implementation-record.md`
- `course-design/stage-1/stage-1-learner-route.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`
- `startup-ecosystem/startup-ecosystem-schema.sql`
- `startup-ecosystem/startup-ecosystem-seed.sql`
- `pedagogical-foundations.md`

`course-design/production/cycle-1/provenance.md` was read to prepare the durable handoff. The historical prior delta was inspected only after the independent decision was formed.

---

## 2. Target capability

**UNCHANGED.**

No current evidence gives a material reason to reopen the target capability.

The target remains:

> Given a known one-to-many relationship and an established starting Grain, predict before execution that joining from the one side to many-side detail can create multiple result rows per starting entity, repeat one-side information, and change the natural result Grain; then explain observed multiplication through the relationship structure rather than accidental duplicate data.

The residual gap also remains the same. Stage 1 exercised the opposite row behavior: `news_article → news_source`, with one matching source per article and row/Grain preservation. One-to-many multiplication from the one side has not yet been established.

The legitimate Course-Assumed Learner State remains bounded to the prior constrained case. Grain, Cardinality, PK/FK, JOIN matching semantics, prediction before execution, and result verification may be reused; broad cumulative transfer is not established.

---

## 3. Independent current-schema candidate screen

The current schema contains many one-to-many structures. A proportionate screen distinguished technical fan-out availability from cases that are genuinely competitive for this encounter.

### Serious candidates advanced to full comparison

1. `news_source → news_article`
2. `company → funding_round`
3. `funding_round → round_investment`

### Structures screened out before full comparison

Examples include `company → company_sector`, `company → company_founder`, `news_article → article_tag`, `news_article → article_party`, and `party → party_address`.

They can technically multiply one-side rows, but the association/detail row itself generally exposes an identifier or relationship record rather than the human-readable business detail a credible task would normally request. Making the task analytically natural would typically require another relation such as `sector`, `person`, `tag`, `party`, or `address`. That would make the learner reason through an additional join/association structure at the same time as first focused fan-out evidence. Because the current target does not require multi-join or bridge-table reasoning, these cases are not as directly competitive as the three serious candidates above.

This is a proportionate screen, not an exhaustive ranking of every schema edge.

---

## 4. Factual validation of serious candidates

### 4.1 `news_source → news_article`

**Schema / Grain / relationship facts**

- `news_source.news_source_id` is the one-side PK.
- `news_article.news_source_id` is a `NOT NULL` FK to it.
- Starting Grain can coherently be one publishing source per row.
- Raw joined-result Grain is one source–article match per row.
- Structurally, one source can match many articles; every article belongs to one source.

**Seed facts**

- 4 news sources.
- 18 news articles.
- Seeded article multiplicities are 5, 6, 5, and 2.
- Every seeded source has at least one article.
- A direct INNER JOIN yields 18 source–article matches with all 4 starting sources represented.

No unmatched source, NULL-extension, or row-loss behavior appears in the current seed.

### 4.2 `company → funding_round`

**Schema / Grain / relationship facts**

- `company.company_id` is the one-side PK.
- `funding_round.company_id` is a `NOT NULL` FK.
- Starting Grain can coherently be one company per row.
- Raw joined-result Grain is one company–funding-round match per row.
- Structurally, one company can have many funding rounds; every funding round belongs to one company.

**Seed facts**

- 12 companies.
- 26 funding rounds.
- Seeded round multiplicities by company are 4, 3, 2, 3, 1, 3, 2, 1, 2, 3, 2, and 0.
- `Lumina Bio` is intentionally the zero-round company.
- A direct INNER JOIN produces 26 matches but represents only 11 of the 12 companies.
- A LEFT JOIN would preserve the zero-round company only by introducing unmatched-row / NULL behavior outside the current target.

Thus the unrestricted all-company case combines fan-out with row loss under INNER JOIN. A pre-scoped “companies with at least one recorded funding round” population could isolate fan-out, but that population would have to be established independently rather than silently produced by the same INNER JOIN.

### 4.3 `funding_round → round_investment`

**Schema / Grain / relationship facts**

- `funding_round.funding_round_id` is the one-side PK.
- `round_investment.funding_round_id` is a `NOT NULL` FK.
- Starting Grain can coherently be one funding round per row.
- Raw joined-result Grain is one funding-round–investment match per row.
- Structurally, one round can have many disclosed investment rows; every `round_investment` belongs to one round.

**Seed facts**

- 26 funding rounds.
- 72 `round_investment` rows.
- Every seeded funding round has at least one investment row; current multiplicities range from 1 to 4.
- A direct INNER JOIN therefore yields 72 matches without dropping a funding round.
- `round_investment.amount` is intentionally nullable, and the seed explicitly states that disclosed checks are not intended to sum to the reported round total.

This relation is structurally clean for fan-out, but the analytically meaningful many-side entity is “an investor’s participation/check in a round.” Human-readable investor identity lives beyond `round_investment` through the `investor` / party subtype structure, while the most natural monetary detail (`amount`) contains intentional missingness and must not be interpreted as a reconciliation to round total.

---

## 5. Operational analytical-authenticity test

### `news_source → news_article`

A source-level coverage review in which each publishing source appears once is analytically coherent without any teaching objective. A teammate request to add the titles of all articles published by each source is also a plausible report change. The one-source starting Grain and the requested article-level detail are independently meaningful; the relational difficulty arises naturally because the requested detail is more granular than the report.

The task would still make sense if the course were not teaching fan-out. Fan-out is the consequence the analyst needs to predict before making the report change, not the reason the report was invented.

### `company → funding_round`

A company-level funding review with one company per row is coherent, and adding individual funding-round detail is a plausible analytical request. This case also passes the authenticity test. Its problem is not artificiality; it is that the current data additionally asks what happens to a company with no funding round. That consequence is analytically real, but it is a different relational requirement from the target.

### `funding_round → round_investment`

A round-level financing review and a request to inspect individual investor participation are also coherent. The relational difficulty is natural. However, an analyst would ordinarily want investor identity and/or disclosed amount, not merely an opaque `investor_id`. Investor identity requires additional relational traversal, while amount introduces legitimate missingness and a non-additivity warning. The authentic task therefore carries semantic work beyond the intended first focused fan-out evidence.

All three serious candidates are analytically credible. Authenticity therefore does not decide the case by itself.

---

## 6. Consequence-grounded comparative judgment

### 6.1 `news_source → news_article`

**Concrete feature:** the learner already encountered the same relationship in Stage 1 from the many side (`news_article → news_source`), and the current seed has participation on every source row.

**Learner consequence:** the learner does not need to decode a new relation pair, learn a new business entity, or reason about unmatched rows before applying the known `1:M` structure in the opposite direction. The new reasoning demand is sharply exposed: one source may now contribute multiple result rows, source-side values repeat, and the natural result Grain changes.

**Effect on evidence:** success or failure can be attributed more directly to fan-out reasoning rather than to unfamiliar-schema transfer or missing-row semantics. Familiarity does create a possible shortcut—remembering that the dataset contains 18 articles—but the reconciled design already blocks that shortcut by requiring structural prediction before the current-data count is revealed and by treating a correct numeric answer as insufficient evidence.

### 6.2 `company → funding_round`

**Concrete feature:** the relation pair is unfamiliar in the learner journey and one seeded company has zero funding rounds.

**Learner consequence:** the unfamiliar pair creates genuine transfer: the learner must carry Grain/Cardinality/JOIN reasoning into a new domain. But an unrestricted INNER JOIN simultaneously removes `Lumina Bio`, so the learner must either attend to row loss, accept a source population that changes, or be given an externally pre-scoped funded-company population. LEFT JOIN would instead introduce unmatched-row / NULL behavior.

**Effect on evidence:** stronger transfer value comes with weaker diagnosticity for this first fan-out encounter. A wrong answer or surprising result may reflect difficulty interpreting the new relation pair or the zero-child case rather than failure to understand one-to-many multiplication. Pre-scoping funded companies can remove the runtime confound, but it adds population-framing machinery whose only purpose in this encounter is to neutralize the seed complication.

### 6.3 `funding_round → round_investment`

**Concrete feature:** every seeded round participates and the join cleanly expands 26 rounds to 72 investment rows, but the many-side business detail is partly encoded as investor IDs and nullable disclosed amounts.

**Learner consequence:** the structural fan-out itself is easy to observe, yet a business-credible result either asks the learner to accept opaque investor identifiers or introduces additional traversal for investor identity; using amount brings intentional NULLs and the explicit rule that disclosed checks are not a reconciliation to reported round total.

**Effect on evidence:** the case is technically clean but semantically less isolated. Attention can move from “what does 1:M do to rows and Grain?” toward identity modeling, missing disclosure, or monetary interpretation. Suppressing those details would make the learner task less analytically natural.

---

## 7. Explicit trade-off decision

The principal trade-off is not “clean versus realistic” or “familiar versus novel.” All three cases are real schema situations and all can support fan-out.

For **this encounter**, the learner consequence that should matter most is:

> **Can the encounter make first focused fan-out evidence attributable to the learner’s use of known Cardinality and Grain, rather than to a simultaneous new transfer or unmatched/missing-data requirement?**

That consequence matters more now because current course evidence explicitly does **not** establish cumulative transfer, while one-to-many row multiplication itself is the uncovered capability. Combining first fan-out reasoning with a materially unfamiliar relation context would provide broader evidence, but it would also make failure harder to interpret. Transfer remains important; it is simply not the evidence target of this encounter.

This does not give automatic priority to familiarity or cleanliness. Their value here comes from what they do to the evidence:

- familiarity removes relation-decoding variance while the direction and row consequence are genuinely new;
- full seeded participation removes a second row-participation mechanism;
- the protected structural-prediction design prevents familiarity with the number 18 from replacing the target reasoning.

`company → funding_round` has the stronger transfer advantage and equally strong analytical credibility. That advantage is outweighed here by the zero-round company, because its consequence is a different relational question the current learner state has not established.

`funding_round → round_investment` has equally clean participation and stronger novelty, but its authentic detail surface brings extra identity/missing-disclosure semantics that make the evidence less narrowly diagnostic than the source/article case.

---

## 8. Decision

### 8.1 Target capability

**UNCHANGED.**

### 8.2 Selected case

**SELECT / RETAIN `news_source → news_article`.**

### 8.3 Decisive rationale

The selected case is preferable because it produces the most interpretable evidence of the target capability at the learner’s current course position: the relationship is already meaningful to the learner, the direction and row consequence are new, all seeded one-side rows participate, and the current protected prediction design prevents memorized instance counts from substituting for structural reasoning.

The decision is not based on technical sufficiency, local cleanliness, or familiarity alone. It is based on the consequence that those features isolate the intended reasoning better than the serious alternatives while preserving an independently coherent analytical task.

### 8.4 Material complication in the selected case

The selected case’s material complication is **familiarity with the Stage 1 relation pair and the prior appearance of the number 18**.

This does **not** introduce a different reasoning requirement. It creates a risk of shallow recall. The existing reconciled design already controls that risk by:

- establishing requested Grain first;
- hiding learner-facing current-data counts during structural prediction;
- requiring separate structural judgments about multiplicity, repeated one-side information, and natural joined-result Grain;
- revealing 18 only after structural commitment;
- requiring result diagnosis and reconciliation rather than accepting the numeric answer or correct SQL as sufficient evidence.

No additional concept is needed to manage this complication.

---

## 9. Existing Cycle 1 work preserved unchanged

Because the current case, capability, prerequisites, learner-state assumptions, and evidence target remain unchanged, the following remain valid without amendment:

- the original Capability & Case Brief except for its now-superseded sufficiency-only case justification;
- the original Lightweight Pedagogy Gate capability/prerequisite/learner-state findings;
- the reconciled target capability;
- the source-level business situation;
- requested Grain = one publishing source per row;
- natural raw-result Grain = one source–article match per row;
- the protected structural prediction before current-data counts;
- the delayed 18-match numeric prediction;
- Fan-out terminology timing;
- SQL as verification/implementation rather than discovery;
- result-based diagnosis of structural repetition versus accidental duplicate base rows;
- final reconciliation with the committed prediction;
- assistance-provenance decisions;
- exclusions of LEFT JOIN/NULL reasoning, aggregation, pre-aggregation, EXISTS, repair mechanisms, and multi-branch fan-out;
- coherent Prediction and Verification workspace requirements;
- implementation code and runtime case contract;
- the durable implementation record;
- existing independent post-build Runtime/Conformance, Pedagogy, and UX review artifacts, subject only to the current case-justification pause before acceptance.

No implementation code is modified by this rerun.

The historical `case-selection-delta-review.md` remains unchanged as a process record. Its retained-case conclusion happens to match this rerun, but it is not the authority for this decision.

---

## 10. Case-dependent surfaces if a different case had been selected

A case switch would require explicit amendment before implementation to at least:

- approved relation pair, PK/FK fields, and Working Schema contents;
- business situation and requested output;
- starting/requested Grain wording;
- natural joined-result Grain;
- structural prediction wording and answer options;
- numeric premises and expected match count;
- field names in prompts, hints, feedback, Concept Moment examples, and verification questions;
- diagnostic SQL output columns;
- SQL relationship / `ON` contract;
- runtime canonical-result checks and case-specific validation invariants;
- any UX copy/layout whose meaning depends on source/article entities.

If the selected alternative introduced unmatched rows, NULLs, an additional join, or a new population-scoping mechanism, the reasoning/evidence design itself would also need re-review rather than simple noun/count substitution.

Because the selected case does **not** change, none of these surfaces is amended now.

---

## 11. Change Impact and minimum downstream re-review

`learner-encounter-production-process.md` §12.4 states that a capability, prerequisite, Course-Assumed Learner State, or **Case-justification change** returns to:

> **Capability & Case Brief → Lightweight Pedagogy Gate**

This new artifact functions as the narrow current amendment to the existing Capability & Case Brief for the operationalized Case Validation decision. It does not rewrite the original Brief or historical delta.

Because the rerun retains:

- the same target capability;
- the same prerequisites;
- the same Course-Assumed Learner State;
- the same selected case;
- the same reasoning architecture;
- the same learner evidence;
- the same UX semantics;
- the same implementation and data;

…the minimum required downstream review is exactly:

> **Targeted Independent Lightweight Pedagogy Gate — Operationalized Cycle 1 Case Validation Rerun Review**

That reviewer must determine whether this rerun satisfies the current consequence-grounding, analytical-authenticity, comparative-alternative, and explicit-trade-off requirements, and whether the retained case is preferable for the learner’s current course position.

No broader design, UX, implementation, Runtime/Conformance, or post-build specialist re-review is triggered unless that independent gate requires a different case or identifies another material change. Rule-Based Acceptance remains paused until the targeted gate is durable and resolved.

---

## 12. Traceability comparison to the historical delta

Only after forming the decision above, the historical `case-selection-delta-review.md` was inspected.

Traceability finding:

- both artifacts retain the same target capability and select `news_source → news_article`;
- the historical delta compared only `news_source → news_article` and `company → funding_round` as serious candidates;
- this rerun independently screened the current schema, advanced `funding_round → round_investment` as an additional serious candidate, and applied the current operationalized requirements to all three;
- the current decisive rationale is consequence-grounded and explicitly states why diagnostic attribution to first fan-out reasoning should dominate broader transfer in this encounter;
- the current rationale also applies the operational analytical-authenticity test rather than treating “credible” as a label.

The historical artifact is therefore preserved for process history and does not need correction or overwrite.

---

## 13. Handoff

**Architect decision:** retain `news_source → news_article`; target capability unchanged; no Cycle 1 design or implementation amendment required.

**Exact next authorized review:**

> **Targeted Independent Lightweight Pedagogy Gate — Operationalized Cycle 1 Case Validation Rerun Review**

The next reviewer should consume this artifact as the current narrow Case Validation amendment under §12.4 while preserving all unaffected Cycle 1 work.