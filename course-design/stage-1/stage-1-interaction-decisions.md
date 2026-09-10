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

The baseline is included because it supports reasoning about row-count and result-Grain preservation in this encounter. It measures `news_article` and reports 18 rows. Because one requested result row represents one article, the learner interprets this as 18 starting news-article rows before predicting the JOIN result. The prepared measurement is not SQL syntax instruction and does not require the learner to write `COUNT(*)`.

Baseline measurement and prediction are presented as one continuous reasoning episode. The baseline presentation should be role-sensitive and compact enough that the implementation workspace does not visually dominate this measurement activity. The exact compact UI remains open.

Before JOIN terminology appears, the learner predicts that adding one publishing-source name per article preserves the 18 result rows with the same result Grain. The feedback makes the PK/FK and Cardinality basis explicit: each article matches one source row. The prediction uses a closed response; no open rationale is required. The continuous chain is: one article per requested result row → 18 starting article rows → one matching source per article → 18 result rows with the same Grain.

The learner then chooses the semantic action of combining each article with its related source. This learner decision is retained; it is not replaced by an instructional statement. Only after that choice is **JOIN** introduced.

## SQL instruction, implementation, and verification

Before learner-authored SQL, the `INNER JOIN ... ON ...` pattern, matching-row meaning, and `news_article.news_source_id = news_source.news_source_id` are instructional content. There is no separate assessment of the `ON` condition; its understanding is evidenced by the learner's query result.

For this Stage, SQL instruction and the SQL workspace remain visually distinct. The editor, execution controls, and result grid are learner tools that support the lesson rather than dominate it.

SQL implementation and verification form one continuous top-level episode while preserving the distinct required evidence.

The implementation task requires a result containing each article's `title` and its publishing source's `name`. Completion evaluation must establish that the result has 18 rows, preserves one news article per row, and associates each article with its referenced source. Semantic correctness is required; the technical mechanism used to perform that semantic result checking remains open.

After semantically correct execution, the learner still explicitly answers the final-grain verification question and reconnects the actual result to the earlier 18-row prediction and article grain.

Stage completion is a state, not a numbered learner episode.

## OPEN implementation decisions

- The exact UI mechanism for selecting relations, including card controls and relation-removal behavior, is not determined.
- The exact visual styling of schema focus / dimming after Grain is not determined.
- The exact styling of selectable schema columns and the detailed local wrong-answer treatment are not determined beyond the preserved pedagogical behavior above.
- The exact connector geometry, animation, and annotation treatment are not determined.
- The exact compact presentation of the prepared baseline measurement is not determined, provided it remains a measurement tool rather than premature SQL syntax instruction.
- The exact visual transition from the compact baseline measurement into the full SQL implementation workspace is not determined.
- The exact placement / treatment of persistent business-request context during later episodes is not determined.
- The exact grouping of completed review when one top-level episode contains multiple reasoning moves is not determined, provided required evidence remains inspectable.
- Hint escalation and solution-reveal behavior are not determined by this document.
- The technical mechanism for semantic result checking is not determined; semantic correctness itself is required.
