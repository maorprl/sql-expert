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

After result Grain is established, `news_article` may receive local visual emphasis as the relation supplying the target output-row meaning while `news_source` remains available but quieter. This must not imply the general rule `Grain = table`.

For the connecting-key reasoning, the learner selects the relevant column directly in the `news_article` Working Schema card. This remains a constrained answer interaction. A wrong selection produces local corrective feedback and must not reveal PK/FK or the relationship. A correct selection confirms `news_article.news_source_id` and only then permits the PK/FK Concept Moment.

After correct connecting-key reasoning, reveal that `news_article.news_source_id` is the FK referencing `news_source.news_source_id` as PK, and reveal a connector between those columns. The PK/FK explanation states that this value identifies the `news_source` row that published the article and that the referenced source row contains the `name` needed in the result.

At this point, Cardinality is still hidden. The learner then answers the existing closed relationship question. Cardinality is reasoned from the PK/FK structure, not from observed seed examples.

Only after correct Cardinality reasoning, introduce Cardinality and annotate the already-visible relationship as one news source to many news articles (`1 → M`). The relationship visual therefore grows from learner-established reasoning rather than appearing as a disconnected explanatory diagram.

No visual aid or label may reveal the answer to a later reasoning move before the learner has engaged with that move.

## Guided continuity

The learner should remain oriented to the same business problem, what has already been established, and why the next reasoning move is relevant.

This continuity does not require a fixed bridge-text component or an explanation between every move. It may be carried by the evolving Working Schema, concise instructional framing, persistent business context, visual progression, or another implementation that preserves orientation without performing the next reasoning move for the learner.

In particular, the transitions from Relations → connecting key, Cardinality → result Grain, result Grain → baseline, Baseline → prediction, Prediction → semantic action, and SQL instruction → implementation must not feel like unrelated new tasks. The business request supplies the article-oriented result; Cardinality does not itself determine the result Grain.

## Learner-experience visual application

The active reasoning task remains the strongest visual focus. Completed work remains visible and reviewable but visually quieter.

Completed Stage 1 work retains the original question or task, learner answer or selection, completion state, relevant feedback or concept consequence, and any opened hints for review. When one top-level episode contains more than one reasoning move, those distinct evidence-bearing moves must remain inspectable rather than collapsing into one opaque success state. The exact internal state representation is not prescribed here.

Grain, PK/FK, Cardinality, and JOIN are the Concept Moments in this Stage. Concept Moments use the learning accent and remain visually distinct from correctness feedback. Green primarily communicates correctness / success rather than concept identity.

Visual aids are explanatory rather than decorative, are local to the reasoning they support, appear only after learner engagement, and do not give away answers prematurely.

## Result Grain, baseline, prediction, and semantic action

Result-Grain reasoning, the baseline, and the prediction are one continuous reasoning episode. After the relationship and Cardinality are established, the learner identifies that one requested result row represents one news article. Only then introduce **Grain**: the grain of the requested result is what one requested result row represents. Grain is never a property of `news_article`, and it is never another name for a table.

The baseline is included because it supports reasoning about row-count and result-Grain preservation in this encounter. A dedicated compact Baseline SQL editor is used here as a measurement tool, prefilled with `SELECT COUNT(*) FROM news_article`. The learner runs and interprets this prepared query; they do not author it, and its role here is measurement rather than SQL syntax instruction. It reports 18 rows, which the learner interprets as 18 starting news-article rows. Because the requested result Grain is one article per row, this provides the baseline against which row and Grain preservation can be predicted.

The Baseline measurement editor is local to this measurement role. It does not persist into JOIN implementation. Once the measurement has been run and interpreted, the 18-row result remains part of the established reasoning evidence rather than remaining as an active SQL task.

Before JOIN terminology appears, the learner predicts that adding one publishing-source name per article preserves the 18 result rows with the same result Grain. The feedback makes the PK/FK and Cardinality basis explicit: each article matches one source row. The prediction uses a closed response; no open rationale is required. The continuous chain is: one article per requested result row → 18 starting article rows → one matching source per article → 18 result rows with the same Grain.

The learner then chooses the semantic action of combining each article with its related source. This learner decision is retained; it is not replaced by an instructional statement. Only after that choice is **JOIN** introduced.

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
- adding the related source is predicted to preserve 18 result rows with the same Grain;
- the learner has already selected the semantic action: combine each article with its related source.

These ideas are not re-taught. They remain visible or otherwise available as established reasoning and are actively used to explain the JOIN.

After the learner selects the semantic relational action and JOIN is introduced, the course provides an explicit teacher-led explanation before learner-authored SQL.

The explanation progresses through this conceptual mapping:

**established relationship → matching rows → relational operation → SQL expression**

A local row-level example shows one article row matching one source row through the already-established `news_source_id` relationship and contributing information from both relations to one result row. The example must make the contribution of `news_article.title` and `news_source.name` visible.

The Working Schema remains the schema-level reasoning anchor. It must not be converted into an instance-data browser. The row-level example is a separate local explanatory visual.

The learner is shown explicitly that:

`news_article.news_source_id = news_source.news_source_id`

is not a new arbitrary SQL rule. It is the SQL expression, inside `ON`, of the relationship the learner already established.

### Business question → SQL

Before learner-authored implementation, the course reconnects the whole SQL query to the business question and the previously established relational reasoning.

The mapping makes clear that:

- requested output attributes become the `SELECT` list;
- the article relation supplies the starting article rows in `FROM`;
- the need to add related source information motivates the relational `JOIN`;
- the established relationship becomes the `ON` condition;
- the expected result must continue to satisfy the previously established result Grain and 18-row prediction.

The course must not imply that `SELECT` alone determines Grain. Grain describes what one requested result row represents; the query as a whole must produce a result consistent with that Grain.

The completed SQL should therefore be experienced as a translation of the business question and relational reasoning, not as a disconnected syntax exercise.

### Cognitive-load constraint

The teaching moment introduces only one new conceptual layer at a time. Previously established concepts such as Grain, PK/FK, Cardinality, and the 18-row baseline are reused rather than explained again.

The learner should encounter the teaching progression in this order:

1. what JOIN does to related rows;
2. how the established relationship becomes `ON`;
3. how the full query expresses the business request.

No new assessment is inserted between these explanatory beats. Only after this mapping is established does learner-authored SQL become the primary activity.

### Observable implementation requirements

The implementation must make the following behavior observable:

- there is an explicit instructional state between the semantic-action success and learner-authored SQL;
- the established Working Schema remains visible and retains its PK/FK and Cardinality state during that instruction;
- a separate local row-level visual shows one article row + its matching source row → one result row;
- the row-level visual uses the same `news_source_id` relationship already established in the Working Schema;
- `title` and `name` are visibly connected to the resulting row;
- the relationship-to-`ON` mapping is shown explicitly;
- the business-question-to-query mapping covers `SELECT`, `FROM`, `JOIN`, and `ON` before learner-authored implementation;
- the JOIN implementation editor is not the primary visual focus until the explanatory mapping has been established;
- no additional learner assessment is introduced inside the teaching explanation;
- no previously established concept is re-taught as if it were new;
- if implementation would require a material interaction or visual-design decision not established here or in current visual authority, that ambiguity must be surfaced rather than silently resolved.

### SQL implementation workspace

After the JOIN teaching climax, a separate clean SQL implementation editor becomes the learner's primary action surface.

This implementation editor is distinct from the compact Baseline measurement editor. It must not inherit the Baseline `COUNT(*)` query or its result as active editor state.

The implementation task requires a result containing each article's `title` and its publishing source's `name`. Completion evaluation must establish that the result has 18 rows, preserves one news article per row, and associates each article with its referenced source. Semantic correctness is required; the technical mechanism used to perform that semantic result checking remains open.

After semantically correct execution, the learner still explicitly answers the final-grain verification question and reconnects the actual result to the earlier 18-row prediction and article grain.

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
- The exact connector geometry, animation, and annotation treatment are not determined.
- The exact visual sizing and placement of the compact Baseline measurement editor are not determined, provided it remains local to the measurement task and does not visually dominate the reasoning activity.
- The exact visual sizing and placement of the separate JOIN implementation editor are not determined, provided it becomes the primary action surface only after the JOIN teaching climax.
- The exact visual form and animation of the local row-matching example are not determined beyond the observable requirements above.
- The exact placement / treatment of persistent business-request context during later episodes is not determined.
- The exact grouping of completed review when one top-level episode contains multiple reasoning moves is not determined, provided required evidence remains inspectable.
- Hint escalation and solution-reveal behavior are not determined by this document.
- The technical mechanism for semantic result checking is not determined; semantic correctness itself is required.
