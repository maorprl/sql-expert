# Stage 1 learner route

The business request remains visible as context; it is not a learner step:

> The research team is reviewing media coverage and wants every article to include the source that published it.

This first JOIN encounter develops the ability to preserve one article per output row while adding its publishing source. The route contains nine learner steps, followed by a completion state.

1. Identify the required relations from the live schema and add them to the Working Schema: `news_article`, which contains the articles, and `news_source`, which contains publishing-source information. The task requires two relations; the Working Schema capacity of four is not a task target.
2. Identify output meaning, then introduce **NEW CONCEPT: GRAIN**: the output grain is one news article per row; Grain = what one row represents.
3. Identify `news_article.news_source_id`, then explicitly introduce Primary Key / Foreign Key. Its value tells us which `news_source` row published that article. That source row contains `name`.
4. Answer one closed question about the one-to-many relationship, then explicitly introduce Cardinality. After the correct answer, show a local visual aid reinforcing `news_source.news_source_id` as PK, `news_article.news_source_id` as FK, and one news source to many news articles.
5. Run and interpret a prepared baseline measurement of `news_article`. It reports **Baseline result: 18 rows**, then asks what 18 represents: 18 news articles.
6. Predict that adding the publishing-source name preserves 18 rows before JOIN vocabulary is introduced. The explanation connects the baseline, article grain, and the one-source PK/FK match: **18 news articles × 1 matching source each = 18 result rows**. The grain remains one news article per row.
7. Choose to combine each news article with its related news source, then introduce **JOIN**.
8. First learn the `INNER JOIN ... ON ...` pattern, its matching-row meaning, and the task-specific connection; only then write a result-checked query that returns each article's `title` with its publishing source's `name`.
9. Verify that the final grain is one news article per row and that the result preserves the 18-row article baseline.

Stage completion is a state, not a numbered step. Completed cards retain the original question, learner answer, feedback, completion state, and any opened hints for review.
