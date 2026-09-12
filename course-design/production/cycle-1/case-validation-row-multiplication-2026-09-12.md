# Cycle 1 Case Validation — Cardinality + Grain → JOIN Row Multiplication

**Role:** Encounter Architect  
**Status:** CASE VALIDATED — SELECTED CASE  
**Date:** 2026-09-12  
**Scope:** Case Validation only; this artifact does not reopen the supplied target capability and does not constitute the independent pedagogy gate or Encounter Design.

## Independence record

Independent candidate discovery, factual validation, and initial comparative judgment were completed only from the permitted current sources listed below. No historical production artifact, prior Case Validation, repository history, commit history, provenance record, preserved future-stage material, or previous production decision was inspected before the judgment. None was required afterward for this decision.

Permitted current sources used:

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

---

## 1. Target capability

> Use relationship Cardinality and target Grain to predict that a JOIN can multiply rows, causing information from the one-side entity to repeat.

**SOURCE-REQUIRED**

This capability is consistent with current course authority:

- the Exit Criteria require the learner to predict what relational operations will do to rows, including what may be duplicated, and to identify situations where Cardinality creates fan-out;
- the Knowledge Map requires the learner to infer output multiplicity from relationship Cardinality, predict whether a JOIN may multiply rows, state output Grain, and identify repeated information from the one-side of a JOIN;
- the current Stage 1 encounter established the contrasting first-JOIN case in which one article matched one source and the JOIN preserved one-article-per-row Grain and the 18-row baseline.

The supplied target capability is therefore not reopened in this Case Validation.

---

## 2. Relevant Course-Assumed Learner State

### SOURCE-REQUIRED

From the current Stage 1 authority and current work-management state, the course may assume that the learner has already encountered and been required to use, with substantial first-exposure support:

- relation identification from a business question;
- a direct FK → PK relationship;
- Primary Key / Foreign Key terminology after meaning-first reasoning;
- relationship Cardinality after reasoning about the relationship in business terms;
- requested-result Grain as what one requested result row represents;
- a prepared Baseline row-count measurement used as evidence rather than as a SQL-syntax test;
- an explicit prediction before JOIN terminology/execution;
- a semantic relational action before JOIN vocabulary;
- JOIN and `ON` as implementations of an already-established relationship;
- one learner-authored INNER JOIN;
- result inspection and verification against an earlier row-count / Grain prediction.

The current Stage 1 case specifically established a many-articles-to-one-source direction in which each article matched one source, so adding source information preserved one article per result row.

Current work management states that Stage 1 has a working implementation and targeted runtime validation acceptable to its current scope. The required test-drive record also gives observed evidence of the Grain → Baseline → Cardinality-based prediction → semantic action progression, while explicitly remaining reference-only / non-authoritative.

### SOURCE-REQUIRED — assumption boundary

The course may **not** assume cumulative independent transfer merely because Stage 1 was encounter-validated. Current sources do not establish course-level transfer/mastery across unfamiliar relationships.

The course also may not silently assume prior learning of later Knowledge Map topics merely because they exist in the schema. In particular, this Case Validation does not rely on prior mastery of:

- LEFT OUTER JOIN or missing-relationship semantics;
- aggregation / GROUP BY;
- pre-aggregation;
- bridge-table / many-to-many reasoning;
- NULL-driven metric interpretation;
- composite-key reasoning as a target capability.

---

## 3. Intended learner evidence for this capability

### SOURCE-REQUIRED

The evidence must demonstrate the target reasoning, not merely successful SQL execution. At minimum, the encounter must be capable of eliciting evidence that the learner can:

1. establish or use the target result Grain;
2. use the relevant relationship Cardinality to recognize that one one-side row can match multiple detail-side rows;
3. predict **before execution** that the JOIN can therefore produce multiple result rows for one one-side entity;
4. predict which one-side information will repeat across those result rows;
5. inspect actual result evidence and reconcile the observed repeated one-side information with the earlier Cardinality + Grain prediction.

### PROCESS / PROFESSIONAL PROPOSAL

The evidence should also distinguish legitimate repetition caused by a finer output Grain from accidental duplicate result rows. For the selected case, the most diagnostic evidence is not memorizing an exact total row count; it is explaining/predicting that one funding round may appear on several distinct participation-grain rows and that round-level fields repeat because those rows represent different recorded investments.

The exact interaction type, scaffolding amount, concept-label timing, and whether the term `fan-out` is introduced are Encounter Design decisions, not decided by this Case Validation.

---

## 4. Independently discovered materially plausible cases

The current schema contains several technically valid one-to-many directions. The following were materially plausible enough to warrant comparison rather than stopping at the first valid case:

1. `funding_round → round_investment`
2. `news_source → news_article`
3. `company → funding_round`
4. `company → company_founder`

Other available schema paths were not promoted to full comparison because they add a more obvious second mechanism at the learner's current position — for example bridge/many-to-many structure, self-join/hierarchy, subtype resolution, or extra relations merely to obtain human-readable attributes.

---

## 5. Factual schema/data validation

### Case A — `funding_round → round_investment`

#### SOURCE-REQUIRED — schema facts

- `funding_round` Grain: one funding round, uniquely identified by `funding_round_id`.
- `round_investment` Grain: one recorded investment participation, uniquely identified by `round_investment_id`.
- `round_investment.funding_round_id` is `NOT NULL` and references `funding_round.funding_round_id`.
- Each `round_investment` row therefore belongs to exactly one funding round.
- A funding round can be referenced by multiple `round_investment` rows. The schema does not require a funding round to have at least one child participation, so parent-side optionality is 0..M even though the current seed happens to contain at least one child for every current round.
- `(funding_round_id, investor_id)` is unique, so the same investor cannot appear twice in the same funding round.

#### SOURCE-REQUIRED — current seed facts

- 26 `funding_round` rows are present.
- 72 `round_investment` rows are present.
- Every current funding round ID appears in `round_investment` at least once.
- Current rounds have between 1 and 4 recorded investment rows.
- Example: funding round `1003` has four `round_investment` rows (`7`, `8`, `9`, `10`) for four investor IDs. A JOIN from that round to its investment records therefore yields four distinct participation-grain rows; round-level information such as `round_type` and `announced_date` repeats across those four rows.
- Because every current funding round has at least one participation in the seed, the current INNER JOIN result contains 72 rows and does not additionally demonstrate an unmatched funding round disappearing.

#### OPEN / MISSING AUTHORITY OR EVIDENCE

There is no schema constraint guaranteeing that future data will always contain at least one `round_investment` for every funding round. Any later design claim that *all* funding rounds are universally preserved by an INNER JOIN would be unsupported. The encounter must either keep its prediction focused on multiplication/repetition, establish the relevant current-data fact when needed, or explicitly surface optionality rather than silently simplifying it.

---

### Case B — `news_source → news_article`

#### SOURCE-REQUIRED — schema facts

- `news_source` Grain: one publishing source, PK `news_source_id`.
- `news_article` Grain: one news article, PK `news_article_id`.
- `news_article.news_source_id` is `NOT NULL` and references `news_source.news_source_id`.
- Each article has exactly one referenced source; one source can have many articles.
- The schema does not require every source to have an article.

#### SOURCE-REQUIRED — current seed facts

- 4 news sources and 18 news articles are present.
- In the current seed all four sources have articles, with article counts 5, 6, 5, and 2.
- A source-to-article INNER JOIN therefore yields 18 rows, and source information repeats across article-grain rows.

#### PROCESS / PROFESSIONAL PROPOSAL — learner consequence

This is the cleanest continuity case because the learner already knows the relation meanings and their Cardinality. However, Stage 1 already produced the article/source joined result at one-article-per-row Grain, including repeated source information. Reversing the explanatory starting point would reduce new schema load, but it would also allow the learner to rely on a previously seen result shape instead of demonstrating that Cardinality + Grain reasoning transfers to a genuinely new relational situation. That weakens the diagnostic value of the new capability evidence.

---

### Case C — `company → funding_round`

#### SOURCE-REQUIRED — schema facts

- `company` Grain: one company, PK `company_id`.
- `funding_round` Grain: one funding round, PK `funding_round_id`.
- `funding_round.company_id` is `NOT NULL` and references `company.company_id`.
- Each funding round belongs to exactly one company; a company can have 0..M funding rounds.

#### SOURCE-REQUIRED — current seed facts

- 12 companies are present.
- 26 funding rounds are present.
- Company `20` (`Lumina Bio`) intentionally has no funding round.
- The remaining funded companies have between 1 and 4 rounds.
- A company-to-funding-round INNER JOIN therefore both multiplies some company rows and removes the unmatched company, yielding 26 funding-round-grain rows.

#### PROCESS / PROFESSIONAL PROPOSAL — learner consequence

The analytical task of reviewing company funding history is highly credible and the additional round information is independently useful. The weakness at the learner's current position is evidentiary cleanliness: actual result behavior contains two distinct mechanisms at once — one-to-many multiplication and unmatched-parent disappearance. Optionality/missing-relationship reasoning is not established as part of the current Course-Assumed Learner State. The learner could therefore produce an unexpected row-count observation for the wrong reason, weakening evidence that the target multiplication reasoning itself caused the conclusion.

A second minor cost is that `company` does not itself contain the human-readable company name; obtaining it naturally would add the `organization` relation, while staying with `company_id`/`status` makes the report less business-readable.

---

### Case D — `company → company_founder`

#### SOURCE-REQUIRED — schema facts

- `company` Grain: one company.
- `company_founder` Grain: one company-person founder association, with composite PK `(company_id, person_id)`.
- `company_founder.company_id` is `NOT NULL` and references `company.company_id`.
- A company can therefore have multiple founder-association rows.

#### SOURCE-REQUIRED — current seed facts

- 12 companies are present.
- 19 `company_founder` rows are present.
- Every current company has at least one founder-association row; current companies have 1 or 2 such rows.
- A company-to-founder INNER JOIN therefore yields 19 association-grain rows without an actual unmatched company in the current seed.

#### PROCESS / PROFESSIONAL PROPOSAL — learner consequence

This gives clean multiplication in current data, but a credible founder-oriented report normally needs founder identity from `person`, adding another relation. The association also contains start/end dates, including ended founder roles, so a seemingly simple "founders by company" task quickly raises temporal-scope questions or requires filtering. Keeping only `person_id` and `founder_title` avoids those complications but makes the analytical output materially less natural. The extra semantic burden is not needed to expose the target capability.

---

## 6. Analytical-authenticity evaluation

### Selected-case operational framing

**PROCESS / PROFESSIONAL PROPOSAL**

A credible current-scope framing is:

> An investment-research / data-quality analyst is reviewing the participation records attached to each funding round before building a lead-investor view. For every recorded round-investor participation, the analyst needs the round context together with the investor identifier and whether that participation is marked as lead.

A minimal useful output can use fields such as:

- `funding_round.funding_round_id`
- `funding_round.round_type`
- `funding_round.announced_date`
- `round_investment.round_investment_id`
- `round_investment.investor_id`
- `round_investment.is_lead`

The requested output Grain is one recorded round-investor participation.

### Operational authenticity test

**PROCESS / PROFESSIONAL PROPOSAL — PASS**

1. **What required information is absent at the starting funding-round Grain?**  
   The funding-round row does not contain the individual participation records, participating investor identifier, or the per-participation `is_lead` flag.

2. **Why is that information useful independently of the teaching objective?**  
   A participation/lead audit genuinely needs to inspect which investor records are attached to each round and which one is flagged as lead. This remains a coherent data-analysis/data-quality task even if row multiplication were not being taught.

3. **Why is the relational operation natural rather than concept-driven?**  
   `round_investment` is the relation that stores exactly the requested participation-level information, and its FK directly connects each participation to its funding round. Consulting it is a natural consequence of the information need; no otherwise unnecessary field or relation has to be introduced merely to manufacture multiplication.

4. **Would the task, output, and starting Grain still make sense without the lesson objective?**  
   Yes. A round-level dataset being expanded into a participation-level audit is a normal analytical transformation. Multiple output rows for one round are a consequence of the requested participation Grain, not a pedagogical contrivance.

### Scope control for analytical authenticity

**PROCESS / PROFESSIONAL PROPOSAL**

Do not make `round_investment.amount` part of the core Case Validation evidence. The current seed intentionally contains NULL investment amounts and explicitly states that reported round totals are not intended to equal the sum of disclosed checks. Those facts are useful for later analytical work but would introduce an unnecessary metric/NULL interpretation branch into this capability.

Likewise, do not add investor-name resolution merely for realism unless Encounter Design can justify the extra party/person/organization structure without obscuring the target reasoning. The stored `investor_id` plus `is_lead` is sufficient for the proposed internal participation audit.

---

## 7. Comparative evaluation and explicit trade-offs

| Case | Direct target evidence | Analytical authenticity | Distinctness / transfer | Confounds at current course position | Current-data cleanliness |
|---|---|---|---|---|---|
| `funding_round → round_investment` | Strong: one round can become 1–4 participation rows; round fields repeat | Strong: participation / lead audit independently requires child records | Strong: new domain and relation pair | Schema-level parent optionality; investor names would add complexity if demanded | Strong for target behavior: all 26 current rounds matched, 72 child rows |
| `news_source → news_article` | Strong technically | Strong | Weak-to-moderate: same joined rows were already exposed in Stage 1 | Very low | Very strong |
| `company → funding_round` | Strong | Very strong | Strong | Actual unmatched company adds disappearance/optionality; company name lives in another relation | Mixed for a first multiplication case |
| `company → company_founder` | Strong | Moderate unless `person` is added | Strong | Founder identity and temporal-role semantics add load; composite association structure | Strong for multiplication |

### Explicit trade-off

**PROCESS / PROFESSIONAL PROPOSAL**

The main trade-off is between the **maximum continuity / minimum load** of `news_source → news_article` and the **stronger new evidence / transfer value** of `funding_round → round_investment`.

For the learner's current course position, the second consequence matters more **provided the new relation meanings are adequately supported without re-teaching Stage 1**:

- Grain, Cardinality, JOIN, prediction-before-execution, and result verification have already had a first supported/validated encounter.
- Reusing the exact Stage 1 relation pair would isolate the target mechanism, but it would also recreate a result shape the learner has already seen: article-grain rows with repeated source information.
- The selected funding case asks the learner to use the same underlying reasoning machinery on a new direct relationship. Success is therefore better evidence that the learner is reasoning from Cardinality + target Grain rather than recalling the earlier article/source result.
- Unlike `company → funding_round`, the current seed does not add actual unmatched-parent disappearance to the observed JOIN result, so the new evidence can remain focused on multiplication and repeated one-side information.

This does **not** claim that novelty or transfer automatically outranks familiarity. The selection is specific to the present evidence problem: the familiar case's main weakness is that the prior encounter already exposed substantially the same result behavior, while the selected new case can remain locally clean in current data.

---

## 8. Case Validation decision

### Verdict

**CASE VALIDATED — SELECT `funding_round → round_investment`.**

### Selected case

Use a funding-round participation / lead-audit situation whose requested result Grain is **one recorded round-investor participation**.

The case can genuinely elicit the target capability because:

- the one-side entity is a funding round;
- the child relation can contain multiple investment-participation rows per round;
- current seed behavior materially demonstrates that multiplicity (1–4 participation rows per current round; 72 participation rows across 26 rounds);
- the requested child-level information is independently useful to a credible analytical task;
- the JOIN therefore naturally creates multiple participation-grain rows for some funding rounds and repeats round-level information;
- the learner can be asked to predict that behavior from Cardinality + target Grain before execution;
- the current data avoids an actual unmatched-round disappearance, keeping observed evidence focused on the target mechanism.

This decision selects the **case**, not a frozen encounter flow, wording, UI, scaffolding pattern, or SQL exercise.

---

## 9. Material downstream implications

### SOURCE-REQUIRED

- Encounter Design must preserve the distinction between schema Cardinality and current observed row counts.
- It must not claim that every possible funding round necessarily has a `round_investment`; the schema permits zero child rows even though the current seed has at least one for every current round.
- Intended evidence must include a pre-execution prediction and a post-execution evidence check, not execution success alone.
- The design must not silently assume cumulative mastery/transfer beyond the Course-Assumed Learner State.

### PROCESS / PROFESSIONAL PROPOSAL

- Keep the core case focused on `funding_round` + `round_investment`; add investor-name resolution only if it has an independently justified role and does not introduce unnecessary subtype complexity.
- Avoid `round_investment.amount` in the core evidence because its NULLs and non-reconciliation with `reported_total_amount` create a separate metric-semantics problem.
- A useful concrete result-inspection example is funding round `1003`, which produces four participation rows; round-level context repeats while `round_investment_id` / `investor_id` differ. This makes the distinction between repeated values and duplicate rows inspectable.
- Later Encounter Design should reduce or adapt first-JOIN scaffolding rather than mechanically replaying the complete Stage 1 sequence, while still giving enough support for the new relation meanings and preserving guided reasoning continuity.

### OPEN / MISSING AUTHORITY OR EVIDENCE

The following are not decided by this Case Validation and must not be silently treated as settled:

- exact encounter boundary / stage identifier;
- exact interaction pattern and answer format;
- whether or when the term `fan-out` is introduced;
- whether a row-count baseline is needed in this encounter;
- exact scaffolding level;
- whether investor names should be resolved through additional relations;
- any broader Stage structure or course progression beyond the accepted target capability.

---

## 10. Required next process step

Per `learner-encounter-production-process.md`, the next gate after completion of the Capability / Case / Course-Assumed Learner-State brief work is the **Lightweight Independent Pedagogy Gate**.

That reviewer must independently check, among other things, that the claimed gap/case is justified, the learner-state assumptions are not overstated, the comparative Case Validation is adequate, the professional judgments are consequence-grounded, and the selected analytical situation is independently coherent.

This artifact does not self-approve that gate.
