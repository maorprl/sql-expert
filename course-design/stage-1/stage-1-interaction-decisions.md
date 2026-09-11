# Stage 1 interaction decisions

## Business case and schema basis

The learner works from this business need: every news article should include the source that published it. The required relations are `news_article` and `news_source`.

`news_article` has `news_article_id` as its primary key and `news_source_id INTEGER NOT NULL` as a foreign key referencing `news_source.news_source_id`. `news_source.news_source_id` is its primary key, and `news_source.name` is the publishing-source attribute needed in the result. The seed contains 18 `news_article` rows and four `news_source` rows. This is a one-source-to-many-articles relationship; every article has one referenced source.

## Relation identification and Working Schema

The Working Schema begins empty. From the live schema, the learner must identify and select `news_article` and `news_source` as the relations needed to connect the requested article information with the requested publishing-source information. This is assessed relational reasoning, not a pre-resolved setup step.

The task requires two selected relations. The Working Schema can retain up to four selected relations concurrently for inspection and reasoning; that capacity does not imply that four relations are required.

Before the learner has identified the connecting key, selected Working Schema cards expose relation names and column names but do **not** expose PK badges, FK badges, `FK → referenced_table.column` text, relationship connectors, or Cardinality markers that would reveal later answers.

The Working Schema remains the same guided reasoning surface as the learner progresses. It is not an open-ended diagramming environment.

## Reasoning, concepts, and progressive relationship reveal

Stage 1 reasoning remains constrained / closed rather than open-text unless a later explicit decision changes a specific interaction.

Concepts appear only after the learner's prerequisite reasoning:

- Grain after identifying what one requested result row represents, within the result-preservation episode;
- PK/FK after identifying `news_article.news_source_id`;
- Cardinality after the closed relationship question;
- JOIN after choosing the semantic relational action.

Before a technical concept is named for the first time, the learner-facing prompt and immediate feedback should be grounded in the business/data meaning that the learner can already reason about. The learner must not need to know the technical term in order to make the prerequisite reasoning move. After the learner establishes the meaning, the Concept Moment may attach the formal terminology to what was just established. This applies in particular to the first PK/FK, Cardinality, Grain, and JOIN encounters.

After result Grain is established, `news_article` may receive local visual emphasis as the relation supplying the target output-row meaning while `news_source` remains available but quieter. This must not imply the general rule `Grain = table`.

For the connecting-key reasoning, the learner selects the relevant column directly in the `news_article` Working Schema card. The learner-facing framing should ask, in task meaning, which article column tells us which source published the article; it should not require the learner to know that they are looking for a Foreign Key or a “connecting key”. This remains a constrained answer interaction. A wrong selection produces local corrective feedback and must not reveal PK/FK or the relationship. A correct selection confirms `news_article.news_source_id` in meaning-first language and only then permits the PK/FK Concept Moment.

After correct connecting-key reasoning, reveal that `news_article.news_source_id` is the FK referencing `news_source.news_source_id` as PK, and reveal a connector between those columns. The PK/FK explanation first connects this formal terminology to the relationship the learner just found: the article's `news_source_id` identifies the `news_source` row that published it, and that source row contains the `name` needed in the result.

The relationship visual must correspond spatially to that established relationship. The connector should visibly attach to the highlighted FK and PK fields rather than to generic card centers. If Cardinality markers or directional annotations are added, their position and direction must agree with the displayed relation layout and the one-source-to-many-articles meaning; they must not overlap the relation cards in a way that makes the connection ambiguous. Exact connector geometry remains an implementation decision.

At this point, Cardinality is still hidden. The learner then answers the existing closed relationship question. The question should test the directional business meaning of the relationship — one source can publish many articles while each article has one publishing source — rather than require technical Cardinality vocabulary in advance. Cardinality is reasoned from the PK/FK structure, not from observed seed examples.

Only after correct Cardinality reasoning, introduce Cardinality and annotate the already-visible relationship as one news source to many news articles (`1 → M`). The relationship visual therefore grows from learner-established reasoning rather than appearing as a disconnected explanatory diagram.

No visual aid or label may reveal the answer to a later reasoning move before the learner has engaged with that move.

## Guided continuity

The learner should remain oriented to the same business problem, what has already been established, and why the next reasoning move is relevant.

This continuity does not require a fixed bridge-text component or an explanation between every move. It may be carried by the evolving Working Schema, concise instructional framing, persistent business context, visual progression, or another implementation that preserves orientation without performing the next reasoning move for the learner.

In particular, the transitions from Relations → connecting key, connecting key → Cardinality, Cardinality → result Grain, result Grain → baseline, Baseline → prediction, Prediction → semantic action, semantic action → JOIN instruction, JOIN instruction → implementation, and execution evidence → verification must not feel like unrelated new tasks. The business request supplies the article-oriented result; Cardinality does not itself determine the result Grain.

When feedback follows a correct reasoning move, it should do more than report UI state or repeat the selected answer when the learner needs orientation. It should consolidate the meaning just established and, where relevant, make the need for the next move legible without giving that next answer away.

## Learner-experience visual application

The active reasoning task or action remains the strongest visual focus. Completed work remains visible and reviewable but visually quieter.

Completed Stage 1 work retains the original question or task, learner answer or selection, completion state, relevant feedback or concept consequence, and any opened hints for review. When one top-level episode contains more than one reasoning move, those distinct evidence-bearing moves must remain inspectable rather than collapsing into one opaque success state. The exact internal state representation is not prescribed here.

During active authoring or other tool-led work, completed review must not displace the current task from the working area or separate that task from the tool used to perform it. Completed work may move to a secondary placement or treatment while remaining reviewable.

Grain, PK/FK, Cardinality, and JOIN are the Concept Moments in this Stage. Concept Moments use the learning accent and remain visually distinct from correctness feedback. Green primarily communicates correctness / success rather than concept identity.

Instructional bridges and teacher-led explanation have a distinct visual role from the learner task, system/status text, correctness feedback, and Concept Moments. Guidance that actively orients the learner through the reasoning journey should be visually recognizable as course guidance rather than undifferentiated body copy. This does not require every explanatory sentence to receive special treatment.

Visual aids are explanatory rather than decorative, are local to the reasoning they support, appear only after learner engagement, and do not give away answers prematurely.

Persistent artifacts do not have a fixed visual rank throughout the Stage. Their prominence should follow their current pedagogical role: the Working Schema may be the primary reasoning surface while the learner is establishing the relationship, then become a quieter reference while measurement, teaching, SQL implementation, or result inspection is the active task.

When a learner action produces evidence that must immediately be interpreted, the produced evidence, its relevant control, and the immediate interpretation should remain visually and spatially connected enough to read as one reasoning cycle. Avoid unnecessary attention jumps across unrelated page regions between producing evidence and interpreting it.

When the current learner action legitimately changes page regions, the change of focus should be visually legible. The learner should not experience a reasoning question as simply jumping between columns without a clear handoff.

## Result Grain, baseline, prediction, and semantic action

Result-Grain reasoning, the baseline, and the prediction are one continuous reasoning episode. After the relationship and Cardinality are established, the learner identifies that one requested result row represents one news article. The framing must reconnect this question to the business request rather than imply that Cardinality determines Grain. Only after the learner identifies the row meaning introduce **Grain**: the grain of the requested result is what one requested result row represents. Grain is never a property of `news_article`, and it is never another name for a table.

The feedback after correct Grain reasoning should make the distinction explicit that a result row may contain information contributed by both relations while still representing one news article. This prepares the learner to reason about adding source information without changing what the row represents.

The baseline is included because it supports reasoning about row-count and result-Grain preservation in this encounter. A dedicated compact Baseline SQL editor is used here as a measurement tool, prefilled with `SELECT COUNT(*) FROM news_article`. The learner runs and interprets this prepared query; they do not author it, and its role here is measurement rather than SQL syntax instruction. A short local explanation should state that `COUNT(*)` counts the rows in `news_article` and is being used here to establish the number of starting article rows; this is not the point to introduce broader `COUNT` semantics.

It reports 18 rows, which the learner interprets as 18 starting news-article rows. Because the requested result Grain is one article per row, this provides the baseline against which row and Grain preservation can be predicted. The Baseline control, returned count, and immediate interpretation should function as one local evidence cycle rather than forcing the learner to move between distant primary surfaces.

The Baseline measurement editor is local to this measurement role. It does not persist into JOIN implementation. Once the measurement has been run and interpreted, the 18-row result remains part of the established reasoning evidence rather than remaining as an active SQL task.

Before JOIN terminology appears, the learner predicts that adding one publishing-source name per article preserves the 18 result rows with the same result Grain. The prediction is a deduction from two already-established facts: there are 18 starting article rows, and each article matches one source row. The prompt must make those premises available before asking for the prediction rather than presenting row count as a guess.

The prediction uses a closed response; no open rationale is required. The closed options should distinguish the relevant relational interpretations rather than test recall of the number 18 alone — for example, one result row per article versus one result row per distinct source versus row multiplication from multiple matches. The feedback makes the PK/FK and Cardinality basis explicit: each article matches one source row. The continuous chain is: one article per requested result row → 18 starting article rows → one matching source per article → 18 result rows with the same Grain.

This encounter establishes the mechanism that later makes row multiplication / fan-out understandable, but Stage 1 does not need to introduce the term `fan-out` here.

The learner then chooses the semantic action of combining each article with its matching source. This learner decision is retained; it is not replaced by an instructional statement. Only after that choice is **JOIN** introduced. Learner-facing terminology across this transition should stay consistent enough that the learner can follow the same idea from “matching source row” into JOIN rather than encountering unnecessary shifts among unrelated labels.

## JOIN teaching climax

The JOIN introduction is the instructional climax of Stage 1.

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

A local row-level example shows one article row matching one source row through the already-established `news_source_id` relationship and contributing information from both relations to one result row. The example must make the contribution of `news_article.title` and `news_source.name` visible.

The Working Schema remains the schema-level reasoning anchor. It must not be converted into an instance-data browser. The row-level example is a separate local explanatory visual.

The learner is shown explicitly that:

`news_article.news_source_id = news_source.news_source_id`

is not a new arbitrary SQL rule. It is the SQL expression, inside `ON`, of the relationship the learner already established. The explanation should introduce `ON` from its meaning — telling SQL how the rows match — before treating it as syntax to reproduce.

### Business question → SQL

Before learner-authored implementation, the course reconnects the whole SQL query to the business question and the previously established relational reasoning.

The mapping makes clear that:

- requested output attributes become the `SELECT` list;
- the article relation supplies the starting article rows in `FROM`;
- the need to add matching source information motivates the relational `JOIN`;
- the established relationship becomes the `ON` condition;
- the expected result must continue to satisfy the previously established result Grain and 18-row prediction.

The course must not imply that `SELECT` alone determines Grain. Grain describes what one requested result row represents; the query as a whole must produce a result consistent with that Grain.

The completed SQL should therefore be experienced as a translation of the business question and relational reasoning, not as a disconnected syntax exercise.

### Cognitive-load constraint

The teaching moment introduces only one new conceptual layer at a time. Previously established concepts such as Grain, PK/FK, Cardinality, and the 18-row baseline are reused rather than explained again.

The learner should encounter the teaching progression in this order:

1. what JOIN does to matching rows;
2. how the established relationship becomes `ON`;
3. how the full query expresses the business request.

These beats must be progressively exposed as a teaching sequence. The initial JOIN teaching state must not present all three beats simultaneously as co-primary instructional panels. After a beat has been encountered, it may remain available as a compact reminder or be replaced by the next beat; that exact treatment remains an implementation decision.

No new assessment is inserted between these explanatory beats. Only after this mapping is established does learner-authored SQL become the primary activity.

### Observable implementation requirements

The implementation must make the following behavior observable:

- there is an explicit instructional state between the semantic-action success and learner-authored SQL;
- the established Working Schema remains visible and retains its PK/FK and Cardinality state during that instruction;
- a separate local row-level visual shows one article row + its matching source row → one result row;
- the row-level visual uses the same `news_source_id` relationship already established in the Working Schema;
- `title` and the publishing-source name are visibly connected to the resulting row;
- the relationship-to-`ON` mapping is shown explicitly;
- the business-question-to-query mapping covers `SELECT`, `FROM`, `JOIN`, and `ON` before learner-authored implementation;
- the three teaching beats are not introduced simultaneously as equal-priority panels;
- the JOIN implementation editor is not the primary visual focus until the explanatory mapping has been established;
- no additional learner assessment is introduced inside the teaching explanation;
- no previously established concept is re-taught as if it were new;
- if implementation would require a material interaction or visual-design decision not established here or in current visual authority, that ambiguity must be surfaced rather than silently resolved.

### SQL implementation workspace

After the JOIN teaching climax, a separate clean SQL implementation editor becomes the learner's primary action surface.

This implementation editor is distinct from the compact Baseline measurement editor. It must not inherit the Baseline `COUNT(*)` query or its result as active editor state.

The primary task asks for the business result without permanently exposing every output detail. The required result contains each article's `title` and its publishing source under the output name `source_name`. A learner may reveal **Desired Output** on demand as optional scaffolding showing the output contract `title | source_name`; revealing Desired Output is not Hint 1 / Hint 2. The exact control treatment remains open.

Instructional content at this point should be reduced to the scaffold necessary to perform the task; the implementation state should not behave like a second full teaching explanation. Any SQL-structure reminder should remain secondary or on demand rather than compete with the editor.

The current task, JOIN implementation editor, and Working Schema reference should read as one coherent authoring workspace. The Working Schema remains available as a reference to output fields and the established relationship but should not compete with the editor as a co-primary action surface. Completed review remains available but must not push the current task away from the editor or occupy the primary authoring lane.

Completion evaluation must establish that the output contract is `title | source_name`, the result has 18 rows, preserves one news article per row, and associates each article with its referenced source. Semantic correctness is required; the technical mechanism used to perform that semantic result checking remains open.

### Execution evidence and final verification

A semantically correct execution is not itself the learner-facing verification conclusion. After the query executes successfully, the learner should inspect the actual result as evidence before being told that the earlier prediction and Grain have been preserved.

The interface may confirm that the query executed, but before the learner's verification response it must not state the conclusion that the result is semantically correct, that it has one article per row, or that the 18-row prediction has been confirmed. Those are the claims the learner is about to verify from the result evidence.

The result evidence includes the returned row count, output columns, and actual article/source rows. The transition from result inspection to verification should remain visibly associated with that evidence rather than requiring an unrelated navigation jump.

The learner then explicitly answers a closed final verification question that requires interpreting the result against the earlier prediction and requested-result Grain. The actual result evidence should remain visible or immediately adjacent while this verification question is answered; the learner should not have to rely on memory of a previous screen. The options should distinguish materially different interpretations, such as 18 rows with one article per row, 18 rows organized around sources, or row multiplication / duplication. This verification must not be answerable merely by repeating a conclusion already displayed by the system.

Only after the learner verifies correctly should the course close the reasoning loop explicitly: the actual result has 18 rows as predicted, each row still represents one article, and the JOIN added the matching source information without changing the requested Grain.

Stage completion is a state, not a numbered learner episode.

### Optional enrichment

Relational algebra and Venn-style representations may be offered as optional enrichment after the core JOIN explanation.

Relational algebra may show the JOIN as a formal representation of the same relational operation already understood by the learner. It is not required learner evidence and its notation is not assessed in Stage 1.

Venn-style representations may support enrichment about row participation across JOIN types. They are not the primary explanatory model for how the task-specific JOIN matches rows and they are not required learner evidence in Stage 1.

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
- The exact treatment of previously encountered JOIN teaching beats during progressive exposure — hidden, replaced, or retained as compact reminders — is not determined.
- The exact placement and styling of the Desired Output disclosure are not determined, provided it is optional scaffolding rather than permanently exposed output detail and is distinct from Hint 1 / Hint 2.
- The exact placement and styling of the result-to-verification control are not determined, provided the progression and verification question remain visibly associated with the actual result evidence rather than requiring an unrelated cross-page attention jump.
- The exact placement / treatment of persistent business-request context during later episodes is not determined.
- The exact grouping and placement of completed review when one top-level episode contains multiple reasoning moves is not determined, provided required evidence remains inspectable and completed work does not displace the active authoring workspace.
- Hint escalation remains not determined by this document.
- The technical mechanism for semantic result checking is not determined; semantic correctness itself is required.
