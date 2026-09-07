# Stage 1 interaction decisions

## Business case and schema basis

The learner works from this business need: every news article should include the source that published it. The required relations are `news_article` and `news_source`.

`news_article` has `news_article_id` as its primary key and `news_source_id INTEGER NOT NULL` as a foreign key referencing `news_source.news_source_id`. `news_source.news_source_id` is its primary key, and `news_source.name` is the publishing-source attribute needed in the result. The seed contains 18 `news_article` rows and four `news_source` rows. This is a one-source-to-many-articles relationship; every article has one referenced source.

## Relation identification and Working Schema

The Working Schema begins empty. From the live schema, the learner must identify and select `news_article` and `news_source` as the relations needed to connect the requested article information with the requested publishing-source information. This is assessed relational reasoning, not a pre-resolved setup step.

The task requires two selected relations. The Working Schema can retain up to four selected relations concurrently for inspection and reasoning; that capacity does not imply that four relations are required. Selected cards must expose the columns, PKs, and FKs needed for the route.

## Reasoning, concepts, and visual aid

All reasoning questions use closed choices. Concepts appear only after the learner's prerequisite reasoning: Grain after identifying the output-row meaning; PK/FK after identifying `news_article.news_source_id`; Cardinality after a closed relationship question; and JOIN after choosing the semantic action.

The PK/FK explanation states that `news_article.news_source_id` identifies the `news_source` row that published the article, and that `news_source.name` is the attribute to add. Cardinality is reasoned from the PK/FK structure, not from observed seed examples.

After correct cardinality reasoning, show a local explanatory diagram of `news_source.news_source_id` (PK), `news_article.news_source_id` (FK), and the one-source-to-many-articles relationship. It reinforces the learner's answer without appearing beforehand. Concept moments use the learning accent and remain visually distinct from correctness feedback.

## Learner-experience visual application

Completed Stage 1 interactions retain the original question, learner answer, and completion state for review.

Grain, PK/FK, Cardinality, and JOIN are the Concept Moments in this Stage. The local cardinality visual uses the course learning accent.

## Baseline, prediction, and semantic action

The baseline is included because it supports reasoning about row-count and grain preservation in this encounter. It measures `news_article` and reports 18 rows. The learner interprets this as 18 news articles before predicting the JOIN result. The prepared measurement is not SQL syntax instruction and does not require the learner to write `COUNT(*)`.

Before JOIN terminology appears, the learner predicts that adding one publishing-source name per article preserves the 18 article rows and the one-article-per-row grain. The feedback makes the PK/FK and cardinality basis explicit: each article matches one source row. The prediction uses a closed response; no open rationale is required.

The learner then chooses the semantic action of combining each article with its related source. Only after that choice is **JOIN** introduced.

## SQL instruction, implementation, and verification

Before learner-authored SQL, the `INNER JOIN ... ON` pattern, matching-row meaning, and `news_article.news_source_id = news_source.news_source_id` are instructional content. There is no separate assessment of the `ON` condition; its understanding is evidenced by the learner's query result.

For this Stage, the editor, execution controls, and result grid are the SQL workspace used for the learner's implementation and verification.

The implementation task requires a result containing each article's `title` and its publishing source's `name`. Completion evaluation must establish that the result has 18 rows, preserves one news article per row, and associates each article with its referenced source. The final learner interaction asks the learner to verify the result against the expected grain and baseline.

## OPEN implementation decisions

- The exact UI mechanism for selecting relations, including card controls and removal behavior, is not determined by the current course-level documentation.
- The exact presentation of the prepared baseline measurement is not determined, provided it does not become premature SQL syntax instruction.
- Hint escalation, solution-reveal behavior, and the technical mechanism for semantic result checking are not determined by the current course-level documentation.
