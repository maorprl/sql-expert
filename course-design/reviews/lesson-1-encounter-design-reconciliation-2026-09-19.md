# Lesson 1 Encounter-Design Reconciliation — 2026-09-19

**Status:** CANDIDATE DESIGN RECONCILIATION / AUTHORITY PREPARATION — NOT CURRENT AUTHORITY — NOT IMPLEMENTATION AUTHORITY

**Repository:** `maorprl/sql-expert`

**Implementation evidence inspected:** `c95ff0aacbfd533d741d486fcb86bc790f7e1437`

This record responds to independent learner test-drive evidence after the accepted Lesson 1 remediation was implemented but before that implementation was accepted as the product baseline. It prepares a focused design decision. It does not accept the implementation, modify current authority, authorize runtime work, change Lessons 2–3, or supersede the accepted remediation record.

## 1. Reconciliation outcome

Lesson 1 should remain the first guided JOIN encounter, but its argument should be re-centered around one capability:

> Given a chosen starting-row baseline and the relationship, determine how many matching rows each starting row contributes to the result, and use those contributions to predict the row-count effect of the JOIN relative to that baseline before writing SQL.

For the Lesson 1 INNER JOIN step, before unrelated row-changing operations such as filtering, aggregation, `DISTINCT`, or additional joins:

```text
result rows = matching row pairs

result count
= sum of matches contributed by the chosen baseline rows
```

This is the mechanism for reasoning about the current JOIN operation. It is not a universal formula for the final row count of arbitrary SQL containing other row-changing operations.

The supporting concepts do not become separate lesson destinations:

- **PK/FK** explains how a starting row finds a related row.
- **Cardinality** distinguishes the possible match contributions from each directional starting-row perspective.
- **Grain** establishes what each requested result row must continue to represent.
- **Baseline** establishes which rows are the comparison baseline and how many of them exist.
- **Prediction** applies matches contributed per starting row to that baseline.
- **JOIN** names the row-combining operation already chosen in meaning.
- **ON** expresses the condition used to find the matching row.
- **Verification** checks whether the executed result agrees with the prior match-count prediction and established Grain.

The learner should experience one causal argument:

```text
start from article rows
→ use news_source_id to find related source rows
→ one article finds one source
→ one starting article therefore contributes one result row
→ 18 starting articles therefore predict 18 result rows
→ execute the JOIN
→ verify 18 article-grain rows with source information
```

Before the protected article-baseline prediction, the reverse perspective remains only a structural Cardinality contrast:

```text
one article → one source
one source → potentially many articles
```

After the learner has reasoned through the reverse direction, `Venture Daily → 6 articles` may illustrate that one source can relate to multiple articles. The complete reverse-baseline comparison—four starting source rows collectively contributing the same 18 matching article/source pairs—must not be learner-facing until Grain is established, the 18-article baseline is measured, and the learner commits to the 18-row article-baseline prediction. If learner-facing at all, it should preferably remain optional or later enrichment rather than a competing core case.

At the design-analysis level, the reverse perspective is relationally valid: the same 18 matching pairs do not expand relative to 18 starting articles but do expand relative to four starting sources. This explains why row multiplication or expansion is baseline-relative. It is not a claim that reversing SQL relation order inherently changes INNER JOIN pair count, a second JOIN task, a second learner prediction, or a Lesson 2 fan-out lesson.

## 2. Basis and authority boundary

The following current sources were read under `source-of-truth-hierarchy.md`:

- `learner-encounter-production-process.md`
- `agent-assisted-work-protocol.md`
- `pedagogical-foundations.md`
- `course-design/stage-1/stage-1-learner-route.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`
- `course-design/course-visual-language.md`
- `course-design/reviews/lesson-1-remediation-classification-2026-09-18.md`

The implemented Lesson 1 JavaScript and CSS were inspected only as evidence of the tested experience. Runtime does not decide the desired design.

The current authority already supports much of the target model: relationship meaning before terminology, Cardinality in both directions, Grain before baseline and prediction, a post-commitment unit-bearing visual, semantic action before JOIN terminology, direct ON semantics, full-query mapping, and verification against prediction and Grain. It requires PK/FK reveal after connecting-field reasoning and Cardinality reasoning before Cardinality terminology, but it does not define the pre-Cardinality disclosure boundary precisely enough to prevent the PK/FK explanation or another learner-visible surface from supplying the protected first-direction inference. The new evidence therefore requires a focused reconciliation of how the existing parts function as one argument and how that inference remains independent.

## 3. Confirmed defects

### 3.1 Evidence Independence defect — first Cardinality direction

The current implemented sequence states immediately before the question that `news_article.news_source_id`:

- is required;
- stores one value; and
- references `news_source.news_source_id`.

It then asks how many publishing sources one article can identify. The supplied explanation already contains the operative conclusion. A learner can answer without performing the intended relationship reasoning.

This is not repaired by changing distractors or shortening copy. The protected inference and its premises must be separated.

### 3.2 Lesson-level conceptual-focus defect

The localized components are individually defensible, but the encounter distributes conceptual weight across PK/FK, Cardinality, Grain, baseline, prediction, matching, JOIN, ON, query mapping, and verification. The learner may retain a sequence of named topics without retaining the predictive mechanism that makes them cohere.

The missing foregrounded rule is:

> To predict row-count change relative to a chosen starting-row baseline, ask how many matching rows each starting row contributes to the result.

In this record, that rule is scoped to the row effect of the Lesson 1 INNER JOIN step. Filtering, aggregation, `DISTINCT`, or additional joins could change a larger query's final row count and are outside this mechanism's present teaching claim.

For this encounter’s article baseline:

```text
18 starting article rows
× 1 matching source row per article
= 18 matching pairs
= 18 result rows
```

There is therefore no row-count expansion relative to the 18-row article baseline. The overall `one source → many articles` relationship does not contradict this. At the design-analysis level, four source rows collectively contribute the same 18 matching pairs and 18 result rows; relative to that four-row baseline, the result expands. The full source tally is not needed in the core learner journey. A `1:M` label alone does not mean every JOIN multiplies rows, and changing the written table order of an equivalent INNER JOIN does not by itself change the matching pair set.

## 4. Evidence-safe Cardinality reconciliation

### 4.1 Evidence the learner may receive before the first question

Before asking about `one article → how many source rows?`, the encounter may establish:

- the business meaning: the article row records a source identifier used to locate related publishing-source information;
- the learner-selected connecting field: `news_article.news_source_id`;
- the related field: `news_source.news_source_id`;
- that the fields form the article-to-source relationship; and
- the structural premises needed for the supported deduction, without translating them into the conclusion.

This is enough to identify what connection is being reasoned about without supplying its multiplicity.

### 4.2 Protected disclosure boundary across all learner-visible surfaces

Before the learner answers the first direction, do not state an equivalent of:

- the article stores exactly one source value;
- the foreign key is required and therefore identifies exactly one source;
- each article has one publishing source; or
- one article matches one source row.

Those statements directly resolve the question being used as learner evidence.

This restriction applies to every learner-visible surface, including mastheads, titles, subtitles, persistent reasoning-thread labels, teacher text, Concept Moments, Working Schema annotations, relationship labels, feedback from earlier steps, and surrounding explanatory copy. The current runtime masthead, `Media coverage — one article, one publisher`, is therefore an implementation surface that later remediation must inspect and change. This design record does not prescribe replacement copy.

### 4.3 Exact first-direction inference contract

For one article row, the supported deduction has two logical parts.

**At most one matching source:** `news_source.news_source_id` is a Primary Key. A particular source-id value can therefore identify at most one `news_source` row.

**At least one matching source:** `news_article.news_source_id` is `NOT NULL` and is a satisfied Foreign Key reference to `news_source.news_source_id`. The article's source-id value must therefore reference an existing source row.

The learner combines those premises:

```text
at most one
+ at least one
= exactly one matching source row
```

The equation above specifies the design logic; it must not be shown as a pre-resolved learner answer before commitment. Neither premise may be translated into wording that itself states `exactly one`. Later design may decide how much terminology such as referential integrity is learner-facing, but authority must preserve both logical premises even when instructional wording is simpler.

This interaction is a **supported first-exposure relational deduction**. A correct response is evidence that the learner combined the supplied structural premises in this guided case; it is not evidence of independent Cardinality mastery.

### 4.4 Candidate reveal order

1. The learner selects `news_article.news_source_id` from the article relation.
2. The encounter names the selected article field as the foreign key and `news_source.news_source_id` as the referenced primary key. This establishes how the rows are related, but it does not state the match count, say that the article stores “one source,” or announce the first-direction conclusion.
3. The learner reasons about the first direction by combining the at-most-one premise from Primary Key uniqueness with the at-least-one premise from the non-null, satisfied Foreign Key reference: for one article, how many source rows can match?
4. Corrective feedback may direct attention to the relevant constraint without stating the answer before another attempt. Correct success feedback records `one article → one source`.
5. The learner reasons about the reverse direction using the absence of a `UNIQUE` constraint plus domain meaning: one source may be referenced by many article rows.
6. A small concrete instance, such as `Venture Daily → 6 article rows`, may illustrate the already-reasoned reverse direction. It must not serve as the sole proof of structural Cardinality or reveal the complete 18-row result before the protected prediction.
7. Only after both directions are established does the encounter formally name Cardinality and show `one source → many articles` / `1:M`.

This candidate preserves the current timing of the PK/FK Concept Moment while narrowing what it may disclose before the protected first-direction inference. Current authority requires PK/FK reveal after connecting-field reasoning and Cardinality reasoning before Cardinality terminology, but it leaves the intervening disclosure boundary insufficiently constrained. The runtime used that gap to state the one-value conclusion before the question; authority did not explicitly mandate that leakage. Authority maintenance is still required before implementation may rely on the revised boundary.

### 4.5 Why the reverse direction matters

The reverse-direction question should have an explicit instructional purpose, not merely complete a definition:

- `one article → one source` predicts one result contribution per row relative to the 18-article baseline;
- `one source → many articles` establishes that a source may contribute multiple article matches from a source-baseline perspective;
- after the protected prediction, optional explanation may show that both perspectives produce the same 18 matching article/source pairs in this INNER JOIN case; and
- the contrast prevents the misconception that a `1:M` relationship automatically multiplies rows without identifying the baseline against which expansion is being measured.

The concrete `Venture Daily → 6 article rows` example is sufficient for the core encounter after the structural inference. The complete four-source tally is unnecessary there. Any aggregate `4 source rows → 18 matching pairs` comparison belongs only after the protected article prediction and should preferably be optional/later enrichment. Neither form should initiate a second SQL task, ask for a second learner prediction, teach INNER JOIN commutativity or optimizer behavior, or introduce the later Lesson 2 encounter.

## 5. Re-centered learner journey

The existing five episodes can remain. The change is their argumentative hierarchy, not an automatic increase in screens or questions.

### Episode 1 — Identify the rows and information needed

Preserve relation identification and connecting-field selection. Keep the business request central: every article needs its publishing-source name.

The learner establishes:

```text
starting information: article rows
related information: source name
relationship field: news_article.news_source_id → news_source.news_source_id
```

### Episode 2 — Reason about matches in both directions

Ask the two directional questions without leaking the first answer. Use the contrast to make the chosen baseline consequential without suggesting that equivalent INNER JOIN table order changes the matching pair set:

```text
article baseline → one source match contributed per article
source baseline → potentially many article matches contributed per source
```

After the reverse-direction answer, `Venture Daily → 6 articles` may provide the bounded concrete illustration. Do not show the complete four-source/18-result comparison here. Then name the relationship concepts. The formal labels summarize the reasoning; they do not become a parallel mini-lesson.

### Episode 3 — Turn the match count into a row prediction

Preserve the established result Grain, prepared baseline measurement, explicit `18 article rows`, direct prediction, and post-commitment visual.

The teacher’s continuity should foreground the causal chain:

```text
one requested row represents one article
18 article rows are the starting rows
each starting article finds one source
therefore each starting article contributes one result row
therefore predict 18 result rows at the same Grain
```

The article baseline is appropriate because the requested result Grain is one article per row; Grain remains the meaning of a requested result row, not the identity of the baseline or SQL `FROM` relation. Only after the learner commits to this prediction may an aggregate four-source/18-match comparison appear. It should preferably remain optional or later enrichment and must not compete with the article-baseline argument.

### Episode 4 — Name the operation

Preserve the semantic action gate. JOIN terminology attaches to the already-understood act of combining each starting article with its one matching source.

### Episode 5 — Express and verify the same mechanism

Preserve the current progressive teaching layers, SQL workspace, result inspection, and reasoning-based verification. Each layer should explicitly serve the same argument:

- the row example shows one starting article finding one source;
- `ON` expresses how that match is found;
- `FROM` identifies the starting rows;
- `JOIN` brings the matching source row;
- `SELECT` chooses the article/source fields shown;
- execution tests the predicted row count relative to the article baseline; and
- verification compares actual evidence with the prior match-count prediction and established Grain.

The optional enrichment remains after completion and should reinforce, not broaden, this case-specific mechanism.

## 6. Preservation boundary

The following tested behaviors remain strong preservation candidates and are not reopened by this reconciliation except where the first-direction evidence dependency is explicit:

- learner relation identification and local wrong-choice recovery;
- connecting-field selection;
- the second Cardinality direction;
- Grain reasoning and improved distractors;
- `Grain → baseline → prediction`;
- prepared learner-run baseline measurement;
- explicit `18 article rows` and removal of the baseline MCQ;
- post-commitment prediction visual and unit-bearing scale-up;
- semantic relational action before JOIN terminology;
- progressive JOIN teaching and reviewable prior explanations;
- direct ON semantics and full clause mapping;
- `SQL workspace`, SQL execution, inspectable results, and validator/interpretation boundary;
- reasoning-based verification and completion; and
- optional post-completion enrichment.

This reconciliation does not reopen Category-C KEEP findings `1.3`, `9.2`, or `9.3`, and it does not resolve TBD findings `3.3`, `4.4`, `8.4`, `15.1`–`15.4`, or `16.5`.

## 7. Explicit non-goals

- No runtime, CSS, test, schema, seed, Lesson 2, or Lesson 3 change is authorized.
- Do not turn Lesson 1 into a generic lecture on JOIN direction.
- Do not add a reverse-direction JOIN exercise or teach full fan-out behavior.
- Do not treat `1:M` notation as a row-count prediction by itself.
- Do not present the complete reverse-baseline 18-row result before the learner commits to the article-baseline prediction.
- Do not use seed frequency as the sole proof of structural Cardinality.
- Do not claim independent Cardinality mastery from the supported first-direction deduction.
- Do not present the match-contribution equation as a final-row-count formula for arbitrary SQL.
- Do not remove working steps merely to reduce text.
- Do not change assistance lifecycle or strength.
- Do not accept `c95ff0a` as the product baseline through this record.

## 8. Authority-preparation consequences

If this candidate reconciliation is accepted, current Lesson 1 authority must be updated before implementation. At minimum:

1. `course-design/stage-1/stage-1-learner-route.md`
   - make matches contributed per row relative to a chosen baseline the organizing capability of Episodes 2–5;
   - preserve the reverse perspective as a bounded structural contrast before prediction, with `Venture Daily → 6 articles` sufficient for the core illustration;
   - prohibit the aggregate four-source/18-result comparison before the protected article prediction and prefer optional/later treatment if it is learner-facing;
   - preserve PK/FK naming after connecting-field reasoning while making its role subordinate to the baseline-relative match-contribution argument.
2. `course-design/stage-1/stage-1-interaction-decisions.md`
   - define the exact at-most-one and at-least-one premises supporting the first-direction deduction;
   - characterize the interaction as supported first-exposure deduction rather than independent Cardinality mastery;
   - prohibit every learner-visible surface from revealing first-direction multiplicity before learner commitment, including mastheads, titles, thread labels, teacher text, Concept Moments, Working Schema annotations, relationship labels, earlier feedback, and surrounding copy;
   - identify the current `Media coverage — one article, one publisher` masthead as an implementation remediation surface without prescribing replacement copy;
   - define the reverse-perspective contrast’s purpose and boundary;
   - require baseline, prediction, JOIN teaching, ON, and verification to carry the matches-contributed-per-baseline-row causal thread;
   - scope the match-contribution equation to the row effect of the current INNER JOIN before unrelated filtering, aggregation, `DISTINCT`, or additional joins.
3. `pedagogical-foundations.md`
   - update only if the accepted result is intended to refine the reusable first-JOIN architecture or the general Cardinality evidence rule; do not generalize an encounter-local solution automatically.

`course-design/course-visual-language.md` does not require change unless acceptance adds a new cross-course visual rule. Existing focus, evidence-locality, and visual-aid rules are sufficient for this candidate.

Because the candidate changes protected evidence and narrows the pre-question disclosure boundary, the production process’s risk-triggered challenge applies before any authority promotion. The completed challenge required this reconciliation to ensure:

- the learner has both non-leaking logical premises needed to reason about the first direction;
- the preserved PK/FK concept timing remains intelligible without leaking the Cardinality conclusion from any learner-visible surface;
- the reverse-perspective illustration remains bounded and cannot reveal the protected prediction; and
- the central equation remains scoped to the current JOIN operation.

## 9. Acceptance and implementation gates

The independent design challenge has been completed and its findings are reconciled in this candidate. The next gate is a human decision to accept, revise, or reject it. Only an accepted decision may authorize the authority-maintenance pass described above. Implementation planning and runtime work remain later, separate tasks.

**INDEPENDENT CHALLENGE FINDINGS RECONCILED — HUMAN ACCEPTANCE REQUIRED — NOT AUTHORITY**
