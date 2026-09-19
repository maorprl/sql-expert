# Lesson 1 interaction decisions

The repository path retains the historical/internal `stage-1` name. The learner-facing product label is **Lesson 1**.

## Business case and schema basis

The learner works from this business need: every news article should include the source that published it. The required relations are `news_article` and `news_source`.

`news_article` has `news_article_id` as its primary key and `news_source_id INTEGER NOT NULL` as a foreign key referencing `news_source.news_source_id`. `news_source.news_source_id` is its primary key, and `news_source.name` is the publishing-source attribute needed in the result. The seed contains 18 `news_article` rows and four `news_source` rows. This is a one-source-to-many-articles relationship; every article has one referenced source.

## Organizing causal argument

Lesson 1 is organized around predicting the row effect of the current JOIN from a chosen baseline by reasoning about how many matching rows each baseline row contributes. PK/FK, Cardinality, Grain, baseline, prediction, JOIN, ON, SELECT, and verification are supporting parts of that single causal argument rather than parallel lesson topics.

For this Lesson 1 INNER JOIN step, before unrelated row-changing operations such as filtering, aggregation, `DISTINCT`, or additional joins:

```text
result rows = matching row pairs

result count
= sum of matches contributed by the chosen baseline rows
```

The comparison is relative to the chosen baseline. This model explains the row-count effect of the current JOIN operation; it is not a universal formula for the final row count of arbitrary SQL.

## Relation identification and Working Schema

The Working Schema begins empty. From the live schema, the learner must identify and select `news_article` and `news_source` as the relations needed to connect the requested article information with the requested publishing-source information. This is assessed relational reasoning, not a pre-resolved setup step.

The task requires two selected relations. The Working Schema can retain up to four selected relations concurrently for inspection and reasoning; that capacity does not imply that four relations are required. The learner-facing selected-state wording for this functional role is `Added`.

Before the learner has identified the connecting key, selected Working Schema cards expose relation names and column names but do **not** expose PK badges, FK badges, `FK → referenced_table.column` text, relationship connectors, or Cardinality markers that would reveal later answers.

The Working Schema remains the same guided reasoning surface as the learner progresses. It is not an open-ended diagramming environment.

## Reasoning, concepts, and progressive relationship reveal

Lesson 1 reasoning remains constrained / closed rather than open-text unless a later explicit decision changes a specific interaction.

Concepts appear only after the learner's prerequisite reasoning:

- Grain after identifying what one requested result row represents, within the result-preservation episode;
- PK/FK after identifying `news_article.news_source_id`;
- Cardinality after the closed relationship question;
- JOIN after choosing the semantic relational action.

Before a technical concept is named for the first time, the learner-facing prompt and immediate feedback should be grounded in the business/data meaning that the learner can already reason about. The learner must not need to know the technical term in order to make the prerequisite reasoning move. After the learner establishes the meaning, the Concept Moment may attach the formal terminology to what was just established. This applies in particular to the first PK/FK, Cardinality, Grain, and JOIN encounters.

After result Grain is established, `news_article` may receive local visual emphasis as the relation supplying the target output-row meaning while `news_source` remains available but quieter. This must not imply the general rule `Grain = table`.

For the connecting-key reasoning, the learner selects the relevant column directly in the `news_article` Working Schema card. The learner-facing framing should ask, in task meaning, which article column can be used to locate related publishing-source information; it should not require the learner to know that they are looking for a Foreign Key or a “connecting key”, and it must not state the first-direction multiplicity. This remains a constrained answer interaction. A wrong selection produces local corrective feedback and must not reveal PK/FK or the relationship. A correct selection confirms `news_article.news_source_id` in meaning-first language and only then permits the PK/FK Concept Moment.

After correct connecting-key reasoning, reveal that `news_article.news_source_id` is the FK referencing `news_source.news_source_id` as PK, and reveal a connector between those columns. The PK/FK explanation first connects this formal terminology to the relationship the learner just found: the article's `news_source_id` is used to locate related `news_source` information, and the referenced relation contains the `name` needed in the result. Before the protected first-direction deduction, this explanation must not translate the relationship into an exact match count or say that an article stores, identifies, has, or matches exactly one source.

The relationship visual must correspond spatially to that established relationship. The connector should visibly attach to the highlighted FK and PK fields rather than to generic card centers. If Cardinality markers or directional annotations are added, their position and direction must agree with the displayed relation layout and the one-source-to-many-articles meaning; they must not overlap the relation cards in a way that makes the connection ambiguous. Exact connector geometry remains an implementation decision.

At this point, Cardinality is still hidden. The learner reasons explicitly in two directions without requiring technical Cardinality vocabulary in advance.

For the first direction, `one article → how many matching source rows?`, the supported deduction must preserve both logical premises:

- **At most one matching source row:** `news_source.news_source_id` is a Primary Key, so a particular source-id value can identify at most one `news_source` row.
- **At least one matching source row:** `news_article.news_source_id` is `NOT NULL` and is a satisfied Foreign Key reference to `news_source.news_source_id`, so the article's value must reference an existing source row.
- **Conclusion produced by the learner:** at most one + at least one = exactly one matching source row.

The premises may be expressed in simpler learner-facing language, but both logical functions must remain intact. Neither premise nor its presentation may state the exactly-one conclusion before the learner performs the deduction. A correct response is evidence of a **supported first-exposure relational deduction** in this guided case, not evidence of independent Cardinality mastery. Corrective feedback may direct the learner to the relevant constraint but must not state the conclusion before another attempt; success feedback may record `one article → one source` after commitment.

For the reverse direction, the learner reasons that `one source → potentially many articles`, using the absence of a `UNIQUE` constraint on `news_article.news_source_id` together with domain meaning. The reusable relationship questions remain directional: for one X, how many Y can participate, and for one Y, how many X can participate. The FK-to-PK connection identifies the related fields but does not alone establish full Cardinality; an FK may be unique. Observed seed examples are not the sole evidence for structural Cardinality.

After the reverse-direction reasoning, `Venture Daily → 6 articles` may be used as a bounded concrete illustration. Before the learner commits to the protected article-baseline prediction, do not expose the complete aggregate `4 source rows → 18 matching pairs/result rows`. Any such aggregate comparison may appear only after Grain is established, the learner measures the 18-article baseline, and the learner commits to the 18-row prediction; if learner-facing at all, it should preferably be optional or later enrichment rather than a competing core case.

Only after both directional meanings are correctly established, introduce Cardinality and annotate the already-visible relationship as one news source to many news articles (`1 → M`). The relationship visual therefore grows from learner-established reasoning rather than appearing as a disconnected explanatory diagram. The reverse direction clarifies that match contribution is directional and that a `1:M` label does not by itself predict expansion relative to the article baseline.

Before learner commitment to the first direction, no learner-visible surface may reveal an equivalent of `one article → exactly one source`. This protection applies to mastheads, titles and subtitles, teacher copy, persistent reasoning-thread text, Concept Moments, Working Schema annotations, relationship labels, earlier feedback, surrounding explanatory copy, and any other persistent or transient learner-facing surface. The current runtime masthead `Media coverage — one article, one publisher` is therefore an implementation remediation surface; this authority does not prescribe its replacement copy.

No visual aid or label may reveal the answer to a later reasoning move before the learner has engaged with that move.

## Guided continuity

The learner should remain oriented to the same business problem, what has already been established, and why the next reasoning move is relevant. Across relationship reasoning, Grain, baseline measurement, prediction, JOIN teaching, SQL expression, execution, and verification, guidance should carry one causal thread: determine how many matching rows each chosen-baseline row contributes, use those contributions to predict the current JOIN's row effect, and compare execution evidence with that prediction and the established Grain.

This continuity does not require a fixed bridge-text component or an explanation between every move. It may be carried by the evolving Working Schema, concise instructional framing, persistent business context, visual progression, or another implementation that preserves orientation without performing the next reasoning move for the learner.

In particular, the transitions from Relations → connecting key, connecting key → Cardinality, Cardinality → result Grain, result Grain → baseline, Baseline → prediction, Prediction → semantic action, semantic action → JOIN instruction, JOIN instruction → implementation, and execution evidence → verification must not feel like unrelated new tasks. The business request supplies the article-oriented result; Cardinality does not itself determine the result Grain.

When feedback follows a correct reasoning move, it should do more than report UI state or repeat the selected answer when the learner needs orientation. It should consolidate the meaning just established and, where relevant, make the need for the next move legible without giving that next answer away.

## Learner-experience visual application

The active reasoning task or action remains the strongest visual focus. Completed work remains visible and reviewable but visually quieter.

Completed Lesson 1 work retains the original question or task, learner answer or selection, completion state, relevant feedback or concept consequence, and any opened hints for review. When one top-level episode contains more than one reasoning move, those distinct evidence-bearing moves must remain inspectable rather than collapsing into one opaque success state. The exact internal state representation is not prescribed here.

During active authoring or other tool-led work, completed review must not displace the current task from the working area or separate that task from the tool used to perform it. Completed work may move to a secondary placement or treatment while remaining reviewable.

Grain, PK/FK, Cardinality, and JOIN are the Concept Moments in this Lesson. Concept Moments use the learning accent and remain visually distinct from correctness feedback. Green primarily communicates correctness / success rather than concept identity.

Instructional bridges and teacher-led explanation have a distinct visual role from the learner task, system/status text, correctness feedback, and Concept Moments. Guidance that actively orients the learner through the reasoning journey should be visually recognizable as course guidance rather than undifferentiated body copy. This does not require every explanatory sentence to receive special treatment.

Visual aids are explanatory rather than decorative, are local to the reasoning they support, appear only after learner engagement, and do not give away answers prematurely.

Persistent artifacts do not have a fixed visual rank throughout the Lesson. Their prominence should follow their current pedagogical role: the Working Schema may be the primary reasoning surface while the learner is establishing the relationship, then become a quieter reference while measurement, teaching, SQL implementation, or result inspection is the active task.

When a learner action produces evidence that must immediately be interpreted, the produced evidence, its relevant control, and the immediate interpretation should remain visually and spatially connected enough to read as one reasoning cycle. Avoid unnecessary attention jumps across unrelated page regions between producing evidence and interpreting it.

When the current learner action legitimately changes page regions, the change of focus should be visually legible. The active guidance and active work surface should read as the same current moment, with the active work surface receiving the strongest relevant visual priority. The learner should not experience a reasoning question as simply jumping between columns without a clear handoff.

## Result Grain, baseline, prediction, and semantic action

Result-Grain reasoning, the baseline, and the prediction are one continuous reasoning episode. After the relationship and Cardinality are established, the learner identifies that one requested result row represents one news article. The framing must reconnect this question to the business request rather than imply that Cardinality determines Grain. Only after the learner identifies the row meaning introduce **Grain**: the grain of the requested result is what one requested result row represents. Grain is never a property of `news_article`, and it is never another name for a table.

The feedback after correct Grain reasoning should make the distinction explicit that a result row may contain information contributed by both relations while still representing one news article. This prepares the learner to reason about adding source information without changing what the row represents. The closed Grain-response options must include a plausible row-meaning misconception rather than a weak country-based distractor, while retaining the useful article/source-pair misconception. Exact distractor wording remains an implementation decision.

The baseline is included because it supports reasoning about row-count and result-Grain preservation in this encounter. A dedicated compact Baseline SQL editor is used here as a measurement tool, prefilled with `SELECT COUNT(*) FROM news_article`. The learner runs this prepared query; they do not author it, and its role here is measurement rather than SQL syntax instruction. A short local explanation should state directly that `COUNT(*)` counts the rows in `news_article` and is being used to establish the number of starting article rows; this is not the point to introduce broader `COUNT` semantics.

It reports 18 rows, explicitly interpreted as 18 starting news-article rows. No separate baseline-interpretation multiple-choice gate is required. Because the requested result Grain is one article per row, this provides the baseline against which row and Grain preservation can be predicted. The Baseline control, returned count, and immediate interpretation should function as one local evidence cycle rather than forcing the learner to move between distant primary surfaces.

The Baseline measurement editor is local to this measurement role. It does not persist into JOIN implementation. Once the measurement has been run and interpreted, the 18-row result remains part of the established reasoning evidence rather than remaining as an active SQL task.

Before JOIN terminology appears, the learner predicts that adding one publishing-source name per article preserves the 18 result rows with the same result Grain. The prediction applies the scoped match-contribution model to the chosen article baseline: this INNER JOIN produces matching article/source pairs; each starting article contributes one matching pair; therefore 18 starting article rows predict 18 result rows. The prompt must make the already-established premises available before asking for the prediction rather than presenting row count as a guess. Grain establishes what each requested result row represents; it is not the baseline, a relation, or the SQL `FROM` clause.

The prediction uses a closed response; no open rationale is required. The closed options should distinguish the relevant relational interpretations rather than test recall of the number 18 alone — for example, one result row per article versus one result row per distinct source versus row multiplication from multiple matches. The feedback makes the PK/FK and Cardinality basis explicit: each article matches one source row. After the learner commits to the prediction, a compact explanatory visual shows `1 article row → 1 matching source row → 1 result row`, then scales that reasoning to the 18-row case. It must express row matching and contribution rather than arithmetic addition, concatenation, or stacking. The continuous chain is: one article per requested result row → 18 starting article rows → one matching source per article → 18 matching pairs → 18 result rows with the same Grain.

Only after that prediction commitment may an aggregate reverse-baseline comparison show that four starting source rows contribute the same 18 matching pairs/result rows. Such a comparison is not required in the core journey and, if learner-facing, should preferably be optional or later enrichment. It must not become a second prediction, a reverse-order SQL task, or Lesson 2 fan-out teaching.

This encounter establishes the baseline-relative match-contribution mechanism that later makes row multiplication / fan-out understandable, but Lesson 1 does not need to introduce the term `fan-out` here. The mechanism here is limited to the row effect of this INNER JOIN before filtering, aggregation, `DISTINCT`, or additional joins; learner-facing explanation must not imply a universal final-query row-count rule.

The learner then chooses the semantic action of combining each article with its matching source. This learner decision is retained; it is not replaced by an instructional statement. Only after that choice is **JOIN** introduced. Learner-facing terminology across this transition should stay consistent enough that the learner can follow the same idea from “matching source row” into JOIN rather than encountering unnecessary shifts among unrelated labels.

## JOIN teaching climax

The JOIN introduction is the instructional climax of Lesson 1.

Its purpose is not merely to introduce JOIN syntax. It must make explicit that the SQL query is the implementation of the relational reasoning already established from the business request.

The learner must remain oriented to the reasoning already established:

- the business request asks for every article with its publishing-source information;
- one requested result row represents one article;
- `news_article` supplies the article and `news_source` supplies the source information;
- `news_article.news_source_id` references `news_source.news_source_id`;
- each article matches one source;
- the established baseline is 18 articles;
- adding the matching source is predicted to preserve 18 result rows with the same Grain;
- the learner has already selected the semantic action: combine each article with its matching source.

These ideas are not re-taught. They remain visible or otherwise available as established reasoning and are actively used to explain the JOIN.

After the learner selects the semantic relational action and JOIN is introduced, the course provides an explicit teacher-led explanation before learner-authored SQL.

The explanation progresses through this conceptual mapping:

**established relationship → matching rows → relational operation → SQL expression**

A local row-level example shows one article row matching one source row through the already-established `news_source_id` relationship and contributing information from both relations to one result row. The example must make the contribution of `news_article.title` and `news_source.name` visible. It uses direct relational language rather than a metaphor that implies a different operation.

The Working Schema remains the schema-level reasoning anchor. It must not be converted into an instance-data browser. The row-level example is a separate local explanatory visual.

The learner is shown explicitly that:

`news_article.news_source_id = news_source.news_source_id`

is not a new arbitrary SQL rule. It is the SQL expression, inside `ON`, of the relationship the learner already established. The explanation should introduce `ON` from its meaning — telling SQL how the rows match — before treating it as syntax to reproduce.

### Business question → SQL

Before learner-authored implementation, the course reconnects the whole SQL query to the business question and the previously established relational reasoning.

The mapping makes clear that `FROM` starts from the article rows, `JOIN` brings in the matching source row, `ON` defines how the rows match, and `SELECT` chooses which article and source fields appear in each result row. Because each article matches one source, the result remains one article per row. The expected result must continue to satisfy the previously established result Grain and 18-row prediction.

The course must not imply that `SELECT` alone determines Grain. Grain describes what one requested result row represents; the query as a whole must produce a result consistent with that Grain.

The completed SQL should therefore be experienced as a translation of the business question and relational reasoning, not as a disconnected syntax exercise. The learner-facing control that advances from the established `ON` condition to the next explanatory layer is `See how it fits together`.

### Cognitive-load constraint

The teaching moment introduces only one new conceptual layer at a time. Previously established concepts such as Grain, PK/FK, Cardinality, and the 18-row baseline are reused rather than explained again.

The learner should encounter the teaching progression in this order:

1. what JOIN does to matching rows;
2. how the established relationship becomes `ON`;
3. how the full query expresses the business request.

These layers must be progressively exposed as a teaching sequence. The initial JOIN teaching state must not present all three layers simultaneously as co-primary instructional panels. After an explanation has been encountered, it remains available and reviewable while the active explanation has stronger visual focus. Its compression, visual quieting, or other local presentation remains an implementation decision. Learner-facing labels use functional or conceptual language rather than the instructional-design term `Beat`.

No new assessment is inserted between these explanatory beats. Only after this mapping is established does learner-authored SQL become the primary activity.

### Observable implementation requirements

The implementation must make the following behavior observable:

- there is an explicit instructional state between the semantic-action success and learner-authored SQL;
- the established Working Schema remains visible and retains its PK/FK and Cardinality state during that instruction;
- a separate local row-level visual shows one article row and its matching source row contributing to one result row;
- the row-level visual uses the same `news_source_id` relationship already established in the Working Schema;
- `title` and the publishing-source name are visibly connected to the resulting row;
- the relationship-to-`ON` mapping is shown explicitly;
- the business-question-to-query mapping covers `SELECT`, `FROM`, `JOIN`, and `ON` before learner-authored implementation;
- the three teaching layers are not introduced simultaneously as equal-priority panels;
- earlier explanations remain available and reviewable as later layers take focus;
- the JOIN implementation editor is not the primary visual focus until the explanatory mapping has been established;
- no additional learner assessment is introduced inside the teaching explanation;
- no previously established concept is re-taught as if it were new;
- if implementation would require a material interaction or visual-design decision not established here or in current visual authority, that ambiguity must be surfaced rather than silently resolved.

### SQL implementation workspace

After the JOIN teaching climax, a separate clean SQL workspace becomes the learner's primary action surface.

This implementation editor is distinct from the compact Baseline measurement editor. It must not inherit the Baseline `COUNT(*)` query or its result as active editor state.

The primary task asks for the business result without permanently exposing every output detail. The required result contains each article's `title` and its publishing source under the output name `source_name`. A learner may reveal **Desired Output** on demand as optional scaffolding showing the output contract `title | source_name`; revealing Desired Output is not Hint 1 / Hint 2. The exact control treatment remains open.

Instructional content at this point should be reduced to the scaffold necessary to perform the task; the implementation state should not behave like a second full teaching explanation. Any SQL-structure reminder should remain secondary or on demand rather than compete with the editor.

The current task, JOIN implementation editor, and Working Schema reference should read as one coherent authoring workspace. The Working Schema remains available as a reference to output fields and the established relationship but should not compete with the editor as a co-primary action surface. Completed review remains available but must not push the current task away from the editor or occupy the primary authoring lane.

Completion evaluation must establish that the output contract is `title | source_name`, the result has 18 rows, preserves one news article per row, and associates each article with its referenced source. Semantic correctness is required; the technical mechanism used to perform that semantic result checking remains open.

### Execution evidence and final verification

A semantically correct execution is not itself the learner's interpretive verification conclusion. After execution, the system may report that semantic validation established that the produced SQL result satisfies the required task/result contract: required fields, 18 expected article/source associations, and the accepted row set.

That system status must not supply the answer to the later reasoning question. It must not explain for the learner why the evidence preserves one article per row, how the JOIN relates to the earlier prediction, or what relational meaning should be concluded from the result.

The result evidence includes the returned row count, output columns, and actual article/source rows. The transition from result inspection to verification should remain visibly associated with that evidence rather than requiring an unrelated navigation jump.

The learner then explicitly answers a closed final verification question that requires interpreting the result against the earlier prediction and requested-result Grain. The actual result evidence should remain visible or immediately adjacent while this verification question is answered; the learner should not have to rely on memory of a previous screen. The options should distinguish materially different interpretations, such as 18 rows with one article per row, 18 rows organized around sources, or row multiplication / duplication. Semantic acceptance of the result does not complete this learner interpretation.

Only after the learner verifies correctly should the course close the reasoning loop explicitly: the actual result has 18 rows as predicted, each row still represents one article, and the JOIN added the matching source information without changing the requested Grain.

Lesson completion is a state, not a numbered learner episode.

### Optional enrichment

Relational algebra and Venn-style representations may be offered as optional enrichment after the core JOIN explanation.

Relational algebra may show the JOIN as a formal representation of the same relational operation already understood by the learner. It is not required learner evidence and its notation is not assessed in Lesson 1.

Venn-style representations may support enrichment about row participation across JOIN types. They are not the primary explanatory model for how the task-specific JOIN matches rows and they are not required learner evidence in Lesson 1.

Neither optional representation may replace the row-matching explanation or become a prerequisite for learner-authored SQL.

## OPEN implementation decisions

- The exact UI mechanism for selecting relations, including card controls and relation-removal behavior, is not determined.
- The exact visual styling of schema focus / dimming after Grain is not determined.
- The exact styling of selectable schema columns and the detailed local wrong-answer treatment are not determined beyond the preserved pedagogical behavior above.
- The exact connector geometry, animation, and detailed annotation treatment are not determined, subject to the requirement that the visual actually connects the FK and PK fields and does not contradict the displayed Cardinality.
- The exact wording of meaning-first prompts, feedback, transition copy, and closed answer options is not fixed by this document beyond the pedagogical constraints above.
- The exact visual sizing and placement of the compact Baseline measurement editor are not determined, provided it remains local to the measurement task and the Baseline control, evidence, and immediate interpretation read as one local cycle.
- The exact visual sizing and placement of the separate JOIN implementation editor are not determined, provided it becomes the primary action surface only after the JOIN teaching climax and the task, editor, and Working Schema reference read as a coherent authoring workspace.
- The exact visual form and animation of the local row-matching example are not determined beyond the observable requirements above.
- The exact compression, visual quieting, or other presentation of previously encountered JOIN explanations during progressive exposure is not determined, provided they remain available and reviewable.
- The exact placement and styling of the Desired Output disclosure are not determined, provided it is optional scaffolding rather than permanently exposed output detail and is distinct from Hint 1 / Hint 2.
- The exact placement and styling of the result-to-verification control are not determined, provided the progression and verification question remain visibly associated with the actual result evidence rather than requiring an unrelated cross-page attention jump.
- The exact placement / treatment of persistent business-request context during later episodes is not determined.
- The exact grouping and placement of completed review when one top-level episode contains multiple reasoning moves is not determined, provided required evidence remains inspectable and completed work does not displace the active authoring workspace.
- Hint escalation remains not determined by this document.
- The technical mechanism for semantic result checking is not determined; semantic correctness itself is required.
