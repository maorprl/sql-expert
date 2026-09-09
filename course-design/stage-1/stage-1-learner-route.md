# Stage 1 learner route

The business request remains visible as context; it is not a learner step:

> The research team is reviewing media coverage and wants every article to include the source that published it.

This first JOIN encounter develops the ability to preserve one article per output row while adding its publishing source.

The route contains six top-level learner episodes. These episodes package the established reasoning sequence into a more continuous guided flow; they do not remove required reasoning moves or learner evidence.

1. **Identify relevant relations.** From the live schema, identify and add `news_article`, which contains the articles, and `news_source`, which contains publishing-source information, to the Working Schema. The task requires two relations; the Working Schema capacity of four is not a task target.

2. **Determine output grain.** Identify what one requested result row should represent, then introduce **NEW CONCEPT: GRAIN**: the output grain is one news article per row; Grain = what one row represents. The selected relations remain available as the same Working Schema rather than the experience resetting around a new unrelated task.

3. **Understand the relationship.** First identify `news_article.news_source_id` as the column that points from an article to its publishing source. Only after that reasoning, introduce Primary Key / Foreign Key and reveal that `news_article.news_source_id` (FK) references `news_source.news_source_id` (PK); the referenced source row contains `name`. Then answer the closed Cardinality question. Only after correct Cardinality reasoning, introduce Cardinality and annotate the same relationship as one news source to many news articles. PK/FK must not be exposed in the Working Schema before the connecting-key reasoning, and Cardinality must not be revealed before the Cardinality reasoning.

4. **Establish the baseline and predict behavior.** Run and interpret the prepared baseline measurement of `news_article`. It reports **Baseline result: 18 rows**, and the learner identifies 18 as 18 news articles. Without resetting into a separate disconnected task, predict before JOIN vocabulary is introduced that adding the publishing-source name preserves 18 rows. The explanation connects the baseline, article grain, and the one-source PK/FK match: **18 news articles × 1 matching source each = 18 result rows**. The grain remains one news article per row.

5. **Choose the semantic relational action.** Choose to combine each news article with its related news source, then introduce **NEW CONCEPT: JOIN**. JOIN terminology does not appear before this semantic choice.

6. **Learn JOIN, implement SQL, and verify.** First learn the `INNER JOIN ... ON ...` pattern, its matching-row meaning, and the task-specific connection. Only then write a result-checked query that returns each article's `title` with its publishing source's `name`. After successful execution, verify the result against the earlier prediction: 18 rows, correct article/source association, and one news article per row. The learner still explicitly answers the final-grain verification question.

Stage completion is a state, not a numbered episode. Completed work remains compact, quiet, and reviewable. Required reasoning evidence must remain inspectable even when multiple reasoning moves occur inside one top-level episode; review retains the original question or task, learner answer or selection, completion state, relevant feedback or concept consequence, and any opened hints.
