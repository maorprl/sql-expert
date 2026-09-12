# Cycle 1 — Comparative Case Validation Delta Review

**Role:** Encounter Architect  
**Status:** ARCHITECT DELTA COMPLETE — TARGETED LIGHTWEIGHT PEDAGOGY REVIEW REQUIRED  
**Scope:** Case-selection / Case Validation delta only; not a Cycle 1 restart and not a replacement Encounter Design

This artifact supplies the comparative Case Validation that was missing from the original Cycle 1 Capability & Case Brief after `learner-encounter-production-process.md` was amended to require comparison when more than one materially plausible current-schema case can exercise the same capability.

It does not rewrite the original Capability & Case Brief, prior reviews, reconciled design, implementation record, or post-build review artifacts.

## 1. Sources reviewed

The review used the current default branch and read the required current sources:

- `learner-encounter-production-process.md`
- `course-design/production/cycle-1/capability-and-case-brief.md`
- `course-design/production/cycle-1/lightweight-pedagogy-gate-review.md`
- `course-design/production/cycle-1/reconciled-encounter-design-packet.md`
- `course-design/production/cycle-1/implementation-record.md`
- `startup-ecosystem/startup-ecosystem-schema.sql`
- `startup-ecosystem/startup-ecosystem-seed.sql`
- `course-design/stage-1/stage-1-learner-route.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`

`course-design/production/cycle-1/provenance.md` and `learner-encounter-production-execution.md` were also inspected for the minimum durable handoff required by the Change Impact rules.

No remembered prior-chat material or older course version is used as authority.

---

## 2. Delta boundary

The defect is narrow: the original Case Validation established that `news_source → news_article` was sufficient and locally clean, but did not comparatively evaluate the materially plausible `company → funding_round` alternative.

The current process now requires that comparison.

This delta therefore does **not** reopen the capability unless the comparison supplies evidence that the existing capability or evidence design cannot survive.

The frozen target remains:

> Given a known one-to-many relationship and an established starting Grain, predict before execution that joining from the one side to many-side detail can create multiple result rows per starting entity, repeat one-side information, and change the natural result Grain; then interpret the observed multiplication from relationship structure rather than accidental duplication.

The established reasoning architecture is also presumptively retained:

**requested Grain → structural 1:M prediction → numeric consequence → Fan-out terminology → SQL verification → result diagnosis and reconciliation**

The comparison below finds no reason to reopen either.

---

## 3. Current schema / seed facts relevant to the comparison

### 3.1 `news_source → news_article`

**SOURCE-REQUIRED.**

- `news_source.news_source_id` is the PK.
- `news_article.news_source_id` is a `NOT NULL` FK to it.
- The seed contains 4 `news_source` rows and 18 `news_article` rows.
- Seeded article counts per source are 5, 6, 5, and 2.
- Every seeded source has at least one article.
- A direct INNER JOIN therefore yields 18 source–article matches with all 4 source rows represented.
- The many-side relationship introduces no unmatched source, NULL-extension, or row-loss behavior in the current seed.

### 3.2 `company → funding_round`

**SOURCE-REQUIRED.**

- `company.company_id` is the PK.
- `funding_round.company_id` is a `NOT NULL` FK to it.
- The seed contains 12 companies.
- The seed contains 26 funding rounds.
- Funding-round multiplicities by company are:
  - company 1: 4
  - company 2: 3
  - company 3: 2
  - company 4: 3
  - company 5: 1
  - company 6: 3
  - company 7: 2
  - company 8: 1
  - company 9: 2
  - company 10: 3
  - company 19: 2
  - company 20 (`Lumina Bio`): 0
- The seed explicitly identifies Lumina Bio as intentionally having no funding round.
- A direct INNER JOIN over the full `company` relation yields 26 company–round matches, represents 11 companies, and omits company 20.
- A LEFT JOIN over all 12 companies would preserve Lumina Bio but would introduce one NULL-extended unmatched row, yielding 27 result rows total: 26 matched company–round rows plus the unmatched company row.

Therefore the current data does not make the unrestricted all-company case a pure fan-out-only observation. It contains both one-to-many multiplication for participating companies and unmatched-row behavior for Lumina Bio.

No schema or seed change is proposed.

---

## 4. Comparative Case Validation

The two serious candidates are compared proportionately against the amended Case Validation criteria.

| Criterion | `news_source → news_article` | `company → funding_round` |
| --- | --- | --- |
| Direct exercise of target capability | **Very strong.** Starts on the one side, produces multiple source–article matches, repeats source information, and changes natural Grain. | **Very strong structurally** for companies with rounds. Repeats company information across funding-round matches and changes natural Grain. |
| Instructional distinctness from Stage 1 | **Moderate but real.** Same relation pair, opposite direction and opposite row behavior: Stage 1 was many-to-one row preservation; this case is one-to-many multiplication. | **High.** New relation pair and new business domain within the same schema. |
| Meaningful transfer vs. excessive familiarity | Familiarity reduces relation-learning load and isolates the new consequence of Cardinality. It provides limited cross-relation transfer evidence, but cross-relation transfer is not the approved capability target. | Stronger transfer opportunity because the learner must carry prior Grain/Cardinality/JOIN reasoning into unfamiliar relations. That also means a failure can mix transfer difficulty with first fan-out difficulty. |
| Continuity from current course position | **Very strong.** The learner already knows the relationship and matching semantics; only the directional consequence changes. | **Moderate.** Conceptual continuity is good, but relation meaning and fields must first become legible enough for reasoning. |
| Analytical / business credibility | Credible: a source-level coverage review is being considered and article-level detail is proposed. The incompatibility itself creates the diagnostic problem. | Also credible, and arguably more naturally familiar analytically: a company-level funding review attempts to add individual funding-round detail. |
| Actual schema / seed behavior | **Clean 1:M case:** 4 sources, 18 matches, every source participates, multiplicities 2–6. | **Mixed case over the full relation:** 12 companies, 26 matches, one company has zero rounds and disappears under INNER JOIN. |
| Unwanted confounds / additional concepts | **Low.** No unmatched rows, no NULL-extension, no outer-join requirement, no additional relational mechanism. | **Material unless explicitly bounded.** Unmatched-row behavior is present. Preserving all companies would require LEFT JOIN / NULL reasoning; excluding the zero-round company requires a separate population-scoping decision. |
| Cognitive load | **Low.** Known relations and known relationship let the encounter focus on fan-out. | **Medium.** New relations are useful transfer, but the zero-round boundary adds population semantics unless removed explicitly from scope. |
| Data cleanliness for this target | **Excellent.** Every one-side row participates and every many-side row belongs to exactly one source. | **Good for participating companies, not clean for the unrestricted company population.** Funding-round rows themselves are well-formed; the zero-child company is the material complication. |

### Comparative judgment

**DESIGN / PROFESSIONAL JUDGMENT.**

The transfer advantage of `company → funding_round` is real, but it is not enough to make it preferable for this Cycle 1 target.

The approved capability is already a new reasoning demand. Current course evidence explicitly does **not** establish broader cumulative transfer. Requiring both transfer to an unfamiliar relation set and first successful fan-out reasoning in the same encounter would make evidence less diagnostic: a learner difficulty could arise from the new relation context rather than from failure to derive row multiplication from `1:M` structure.

By contrast, reusing `news_source ↔ news_article` does not simply repeat Stage 1. Stage 1 reasoned from article to source and predicted preservation; this encounter reasons from source to articles and predicts multiplication, repetition, and a different natural result Grain. Familiarity therefore serves a specific isolation purpose rather than replacing the new reasoning.

The clean seed behavior is decisive: the selected case lets the learner observe fan-out without a second mechanism changing row participation at the same time.

---

## 5. Explicit finding on companies with zero funding rounds

### Can `company → funding_round` support the target cleanly with the current data?

**Yes, but only under an explicit pre-scoped population; not as an unrestricted all-company case.**

A clean version would have to define the starting business population **before the fan-out task** as companies already known to have at least one recorded funding round, explicitly excluding Lumina Bio from that population because it has none. The learner could then reason over the 11 participating companies and 26 funding-round detail rows, with the numeric consequence based on 26 matches.

However, the encounter must not use the INNER JOIN itself as a silent mechanism for creating that funded-company population. Doing so would still make unmatched-row semantics part of the runtime behavior without acknowledging it.

To keep the target isolated, the qualified population would need to be supplied or pre-established independently of the fan-out reasoning. A dynamically derived funded-company population would otherwise require an additional filtering / existence mechanism that is not part of the current target.

Therefore:

- **unrestricted `company → funding_round` over all current companies:** not clean enough for this target;
- **explicitly pre-scoped funded-company population:** technically viable without altering schema or seed data;
- **pedagogical cost of that workaround:** extra business/population framing and weaker simplicity than the selected case.

No seed edit, fake funding round, or schema alteration is justified merely to clean the alternative.

---

## 6. Delta decision

### 6.1 Capability

**UNCHANGED.**

The original Cycle 1 capability remains valid. Comparative case analysis supplies no evidence that the target should change.

### 6.2 Selected case

**RETAIN `news_source → news_article`.**

It is preferable to `company → funding_round` for the current target because it combines:

- direct 1:M fan-out behavior;
- no unmatched-row or NULL confound in the current seed;
- low extraneous relation-learning load;
- strong continuity from Stage 1 while reversing the directional relational consequence;
- a credible diagnostic business situation;
- cleaner attribution of learner evidence to the intended fan-out capability.

The reason for retaining it is therefore comparative, not merely that it is sufficient.

### 6.3 Serious alternatives

`company → funding_round` remains a strong future transfer case, especially once unmatched-row behavior is itself established or when a funded-company-only population is independently available. It is not preferable for this first focused fan-out encounter.

No third case was promoted to serious-candidate status. Other current-schema one-to-many structures visible in the schema either rely on association/detail relations whose human-readable analytical interpretation would require additional joins or carry enough semantic overhead that they are not genuinely competitive with the two cases above for this narrow target. An exhaustive schema survey is intentionally not performed.

---

## 7. Impact on the existing reconciled design

### 7.1 Remains valid unchanged

The following existing design authority survives this delta unchanged:

- target capability;
- Course-Assumed Learner State and its limits;
- reuse of Grain, PK/FK, Cardinality, JOIN, and matching semantics without re-teaching;
- relation identification not being an evidence target;
- requested Grain before relational prediction;
- protected structural `1:M` prediction before learner-facing current-data counts;
- structural evidence covering multiple rows per starting entity, repeated one-side information, and natural joined-result Grain;
- numeric consequence only after structural commitment;
- Fan-out terminology after the learner establishes the mechanism;
- SQL as verification / implementation rather than discovery;
- actual-result diagnosis of structural repetition versus accidental duplicate base data;
- reconciliation of execution with the committed prediction;
- assistance provenance for protected reasoning;
- exclusion of aggregation, pre-aggregation, LEFT JOIN/NULL reasoning, EXISTS, multi-branch fan-out, and repair mechanisms from current scope;
- the coherent Prediction and Verification workspace requirements;
- the existing success/evidence rule that correct SQL alone is insufficient.

The reasoning architecture therefore remains:

**requested Grain → structural 1:M prediction → numeric consequence → Fan-out terminology → SQL verification → result diagnosis and reconciliation**

### 7.2 Case-dependent portions

The following portions of `reconciled-encounter-design-packet.md` are intrinsically case-dependent:

- the approved relation pair and PK/FK fields;
- source-level business framing;
- starting and requested one-source Grain;
- natural source–article-match Grain;
- the 18-article / 18-match numeric consequence;
- source/article wording in prompts, hints, feedback, Concept Moment examples, and result diagnosis;
- Working Schema contents and relationship connector;
- diagnostic result fields such as source name and article title;
- case-specific implementation invariants and validation checks.

**No amendment to those design sections is required**, because the comparative review re-selects the same case. This delta amends the **case-selection justification**, not the learner encounter itself.

If an independent reviewer rejects this case decision and requires a case switch, those case-dependent sections would then have to be amended explicitly before any implementation change.

---

## 8. Frozen pedagogical / learner-evidence decisions

**NO REOPENING REQUIRED.**

The comparison does not identify a defect in:

- requested-Grain-first reasoning;
- protected prediction;
- numeric-delay logic;
- Fan-out timing;
- SQL timing/role;
- result diagnosis;
- assistance provenance;
- success criteria;
- required learner evidence.

The only newly supplied authority is the missing comparative case rationale.

---

## 9. Change Impact and minimum re-review

`learner-encounter-production-process.md` §12.4 states that a **Case-justification change** returns to:

**Capability & Case Brief → Lightweight Pedagogy Gate**

This artifact is the durable amendment to the existing Capability & Case Brief for that narrow purpose.

Because this delta:

- retains the same capability;
- retains the same case;
- retains prerequisites and Course-Assumed Learner State;
- changes no learner reasoning, evidence, concept timing, flow, UX semantics, implementation, schema, or seed;

…the minimum required re-review is:

> **Targeted Independent Lightweight Pedagogy Gate — Comparative Case Validation Delta Review**

The reviewer should assess only whether the comparative evaluation is adequate under the amended Case Validation rule and whether retaining `news_source → news_article` is pedagogically justified relative to `company → funding_round` for the learner's current course position.

A full Encounter Design review, UX review, implementation change, or runtime revalidation is **not** triggered by this delta unless that Pedagogy review requires a different case or identifies a genuine pedagogical / learner-evidence change.

Existing post-build review artifacts remain preserved and are not rewritten by this delta. Rule-Based Acceptance should not advance until the targeted delta review is durably resolved.

---

## 10. Handoff

**Architect decision:** retain `news_source → news_article` and preserve the existing reconciled design and implementation unchanged.

**Next required review:** independent targeted Lightweight Pedagogy review of this comparative Case Validation delta under the amended process.

This is the complete Cycle 1 case-selection delta. It is not a new Encounter Design Packet and does not authorize implementation changes.
