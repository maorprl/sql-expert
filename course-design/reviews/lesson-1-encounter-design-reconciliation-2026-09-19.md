# Lesson 1 Encounter-Design Reconciliation — 2026-09-19

**Status:** CANDIDATE DESIGN RECONCILIATION / AUTHORITY PREPARATION — NOT CURRENT AUTHORITY — NOT IMPLEMENTATION AUTHORITY

**Repository:** `maorprl/sql-expert`

**Implementation evidence inspected:** `c95ff0aacbfd533d741d486fcb86bc790f7e1437`

This record responds to independent learner test-drive evidence after the accepted Lesson 1 remediation was implemented but before that implementation was accepted as the product baseline. It prepares a focused design decision. It does not accept the implementation, modify current authority, authorize runtime work, change Lessons 2–3, or supersede the accepted remediation record.

## 1. Reconciliation outcome

Lesson 1 should remain the first guided JOIN encounter, but its argument should be re-centered around one capability:

> Given a chosen starting-row baseline and the relationship, determine how many matching rows each starting row contributes to the result, and use those contributions to predict row-count change relative to that baseline before writing SQL.

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

The reverse perspective is a deliberately small contrast inside that argument:

```text
source baseline:
4 starting source rows

TechLedger → 5 article matches
Venture Daily → 6 article matches
MarketWire → 5 article matches
HealthTech Review → 2 article matches

= 18 matching pairs
= 18 result rows
```

This is the same set of 18 matching article/source pairs as in the article-baseline view. What changes is the comparison baseline: 18 result rows do not expand relative to 18 starting articles, while they do expand relative to four starting sources. The contrast explains the `1:M` relationship and why row multiplication or expansion is baseline-relative. It is not a claim that reversing SQL relation order inherently changes INNER JOIN pair count, a second JOIN task, a second learner prediction, or a Lesson 2 fan-out lesson.

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

The current authority already supports much of the target model: relationship meaning before terminology, Cardinality in both directions, Grain before baseline and prediction, a post-commitment unit-bearing visual, semantic action before JOIN terminology, direct ON semantics, full-query mapping, and verification against prediction and Grain. It requires PK/FK reveal after connecting-field reasoning and Cardinality reasoning before Cardinality terminology, but it does not define the pre-Cardinality disclosure boundary precisely enough to prevent the PK/FK explanation from supplying the protected first-direction inference. The new evidence therefore requires a focused reconciliation of how the existing parts function as one argument and how that inference remains independent.

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

For this encounter’s article baseline:

```text
18 starting article rows
× 1 matching source row per article
= 18 matching pairs
= 18 result rows
```

There is therefore no row-count expansion relative to the 18-row article baseline. The overall `one source → many articles` relationship does not contradict this. From a four-source baseline, the source rows contribute 5, 6, 5, and 2 article matches respectively, producing the same 18 matching pairs and 18 result rows; relative to that four-row baseline, the result expands. A `1:M` label alone does not mean every JOIN multiplies rows, and changing the written table order of an equivalent INNER JOIN does not by itself change the matching pair set.

## 4. Evidence-safe Cardinality reconciliation

### 4.1 Evidence the learner may receive before the first question

Before asking about `one article → how many source rows?`, the encounter may establish:

- the business meaning: the article row records which source published it;
- the learner-selected connecting field: `news_article.news_source_id`;
- the related field: `news_source.news_source_id`;
- that the fields form the article-to-source relationship; and
- the relevant visible schema/data context needed to inspect that relationship.

This is enough to identify what connection is being reasoned about without supplying its multiplicity.

### 4.2 Evidence that must remain protected until after the first answer

Before the learner answers the first direction, do not state an equivalent of:

- the article stores exactly one source value;
- the foreign key is required and therefore identifies exactly one source;
- each article has one publishing source; or
- one article matches one source row.

Those statements directly resolve the question being used as learner evidence.

### 4.3 Candidate reveal order

1. The learner selects `news_article.news_source_id` from the article relation.
2. The encounter names the selected article field as the foreign key and `news_source.news_source_id` as the referenced primary key. This establishes how the rows are related, but it does not state the match count, say that the article stores “one source,” or announce the first-direction conclusion.
3. The learner reasons about the first direction from the visible FK→PK structure, the primary key’s uniqueness, the required participation constraint, and the publishing meaning: for one article, how many source rows can match?
4. Corrective feedback may direct attention to the relevant constraint without stating the answer before another attempt. Correct success feedback records `one article → one source`.
5. The learner reasons about the reverse direction using the absence of a `UNIQUE` constraint plus domain meaning: one source may be referenced by many article rows.
6. A small concrete instance, such as `Venture Daily → 6 article rows`, may illustrate the already-reasoned reverse direction. It must not serve as the sole proof of structural Cardinality.
7. Only after both directions are established does the encounter formally name Cardinality and show `one source → many articles` / `1:M`.

This candidate preserves the current timing of the PK/FK Concept Moment while narrowing what it may disclose before the protected first-direction inference. Current authority requires PK/FK reveal after connecting-field reasoning and Cardinality reasoning before Cardinality terminology, but it leaves the intervening disclosure boundary insufficiently constrained. The runtime used that gap to state the one-value conclusion before the question; authority did not explicitly mandate that leakage. Authority maintenance is still required before implementation may rely on the revised boundary.

### 4.4 Why the reverse direction matters

The reverse-direction question should have an explicit instructional purpose, not merely complete a definition:

- `one article → one source` predicts one result contribution per row relative to the 18-article baseline;
- `one source → many articles` explains why rows contribute multiple matches relative to the four-source baseline;
- both perspectives produce the same 18 matching article/source pairs in this INNER JOIN case; and
- the contrast prevents the misconception that a `1:M` relationship automatically multiplies rows without identifying the baseline against which expansion is being measured.

The concrete `Venture Daily → 6 article rows` example is useful only as a compact confirmation after the structural inference and as one contribution within the four-source baseline contrast. It should not initiate a second SQL task, ask for a second learner prediction, teach INNER JOIN commutativity or optimizer behavior, or introduce the later Lesson 2 encounter.

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

Then name the relationship concepts. The formal labels summarize the reasoning; they do not become a parallel mini-lesson.

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

The article baseline is appropriate because the requested result Grain is one article per row; Grain remains the meaning of a requested result row, not the identity of the SQL `FROM` relation. The reverse-perspective contrast may remain available as a quiet reminder, but it must not compete with the article-baseline prediction.

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
- Do not use seed frequency as the sole proof of structural Cardinality.
- Do not remove working steps merely to reduce text.
- Do not change assistance lifecycle or strength.
- Do not accept `c95ff0a` as the product baseline through this record.

## 8. Authority-preparation consequences

If this candidate reconciliation is accepted, current Lesson 1 authority must be updated before implementation. At minimum:

1. `course-design/stage-1/stage-1-learner-route.md`
   - make matches contributed per row relative to a chosen baseline the organizing capability of Episodes 2–5;
   - preserve the reverse perspective as a bounded, baseline-relative contrast that does not imply different INNER JOIN pair counts from SQL table order;
   - preserve PK/FK naming after connecting-field reasoning while making its role subordinate to the baseline-relative match-contribution argument.
2. `course-design/stage-1/stage-1-interaction-decisions.md`
   - define what PK/FK relationship evidence may appear before the first Cardinality question;
   - prohibit revealing the first-direction multiplicity before learner commitment;
   - define the reverse-perspective contrast’s purpose and boundary;
   - require baseline, prediction, JOIN teaching, ON, and verification to carry the matches-contributed-per-baseline-row causal thread.
3. `pedagogical-foundations.md`
   - update only if the accepted result is intended to refine the reusable first-JOIN architecture or the general Cardinality evidence rule; do not generalize an encounter-local solution automatically.

`course-design/course-visual-language.md` does not require change unless acceptance adds a new cross-course visual rule. Existing focus, evidence-locality, and visual-aid rules are sufficient for this candidate.

Because the candidate changes protected evidence and narrows the pre-question PK/FK disclosure boundary, the production process’s risk-triggered challenge applies before any authority promotion. The challenge should specifically test:

- whether the learner has enough non-leaking evidence to reason about the first direction;
- whether the preserved PK/FK concept timing remains intelligible without leaking the Cardinality conclusion;
- whether the reverse-perspective example clarifies baseline-relative expansion without becoming Lesson 2; and
- whether the whole encounter now reads as one causal argument rather than a sequence of concept cards.

## 9. Acceptance and implementation gates

The next authorized task should be an independent design challenge of this candidate reconciliation. It should not edit runtime or authority.

After challenge findings are reconciled, a human decision is required to accept, revise, or reject the candidate. Only an accepted decision may authorize the authority-maintenance pass described above. Implementation planning and runtime work remain later, separate tasks.

**DESIGN RECONCILIATION PREPARED — INDEPENDENT CHALLENGE AND HUMAN ACCEPTANCE REQUIRED**
