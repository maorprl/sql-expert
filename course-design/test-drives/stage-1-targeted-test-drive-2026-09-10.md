# Stage 1 Targeted Test Drive — 2026-09-10

**Status:** REFERENCE ONLY / NON-AUTHORITATIVE  
**Scope:** Targeted validation after result-Grain sequencing and persistent Baseline SQL workspace changes  
**Implementation tested:** `2a4cada663b783621a5831e6c96255d511fff9fb`

This record captures observed learner-experience evidence from a manual browser test drive. It does not create or override pedagogical, visual, Stage, schema, or data authority.

## Scope of this test drive

The test drive focused on the two recently implemented Stage 1 changes:

1. revised placement of requested-result Grain;
2. the persistent learner-facing SQL workspace beginning at the Baseline.

JOIN instructional design and final verification were not reopened as design tasks during this test drive. They were observed only far enough to detect regressions or continuity problems caused by the scoped changes.

## Observed flow

The tested learner flow was:

`relations → connecting key → PK/FK reveal → cardinality → requested-result Grain → baseline measurement → baseline interpretation → prediction → semantic relational action → JOIN implementation`

### PASS — relation selection to relationship

After selecting `news_article` and `news_source`, the learner moved directly to identifying the connecting key. Requested-result Grain was not inserted before relationship reasoning.

Before the correct connecting key was established, PK/FK labels and the relationship connector were not revealed. After selecting `news_article.news_source_id` correctly, the PK/FK relationship and connector became visible together with the PK/FK Concept Moment.

### PASS — cardinality before Grain

The cardinality interaction followed the established PK/FK relationship. The one-source-to-many-articles annotation appeared only after the learner answered the cardinality question correctly.

### PASS — requested-result Grain placement

Only after cardinality did the learner encounter:

> What should one row in the requested result represent?

The correct answer was one news article. Grain was introduced through the post-answer Concept Moment.

The previous Grain marker attached to the `news_article` schema card was absent, and `news_source` was not visually faded. The tested state therefore did not present Grain as an apparent property of a relation card.

### PASS — persistent Baseline SQL workspace

At the Baseline, the real learner-facing SQL Workspace was visible with the prepared statement:

```sql
SELECT COUNT(*) FROM news_article;
```

The Baseline was no longer presented as a separate static code card. The learner ran the prepared query in the same SQL editor used later for implementation.

The query returned `18`, after which the learner interpreted the measurement as 18 news articles.

### PASS — Grain / baseline / prediction reasoning chain

The prediction interaction used the established evidence explicitly:

`18 news articles × 1 matching source each = 18 result rows`

and then stated:

`The grain remains one news article per row.`

This successfully reconnected requested-result Grain, the measured starting article rows, and relationship cardinality into the row-preservation prediction.

### PASS — semantic action before JOIN vocabulary

The learner first chose the semantic action:

> Combine each article with its related source.

Only after the correct choice was the term JOIN introduced.

### PASS — same SQL workspace continues into JOIN

The SQL Workspace remained present through prediction and the semantic-action interaction and continued into JOIN implementation. The learner did not encounter a replacement editor.

## Findings

### F1 — Baseline execution control is not locally visible

**Classification:** UX / interaction continuity finding  
**Severity:** meaningful, not yet classified as blocking

At the Baseline viewport, the instruction says to run the prepared measurement in the SQL Workspace, but the `Run query` control is located in the top bar and may be outside the learner's current viewport. The workspace itself presents no local execution control.

This creates a direct action-discovery problem at the point where the learner is asked to run the measurement.

No solution is selected in this record.

### F2 — Baseline interpretation copy partially reverts toward source-relation row meaning

**Classification:** Minor authority/copy mismatch

Observed success feedback:

> Because `news_article` has one article per row, 18 rows means 18 news articles.

This correctly explains the measurement, but it does not fully express the accepted distinction between:

- the measurement establishing 18 starting `news_article` rows; and
- requested-result Grain making that baseline relevant for later row/Grain-preservation reasoning.

The following prediction interaction does reconnect the chain correctly, so the overall reasoning sequence was not broken.

### F3 — Baseline query and result remain active when JOIN implementation begins

**Classification:** UX / instructional-continuity finding

When the learner reaches JOIN implementation, the persistent workspace still contains the Baseline query and the Baseline result (`18`).

Technical persistence is correct, but the workspace has not clearly transitioned from its measurement role to its learner-authored implementation role. The prior task state may compete with the new instruction to write JOIN SQL.

No specific transition behavior is selected in this record.

### F4 — reasoning / storyboard column is too narrow

**Classification:** UX / visual hierarchy finding

The reasoning column is visually narrow relative to the SQL workspace. Prompts and explanations wrap aggressively, cards become tall, and the guided-reasoning experience feels compressed and subordinate to the implementation surface.

This is broader than a single heading-wrap issue. It affects perceived cognitive load and the role hierarchy between guided reasoning and SQL implementation.

### F5 — teacher voice remains too formal and abstraction-heavy

**Classification:** Pedagogy / instructional-experience finding

The learner reported that the experience is improved, but the instructional voice still feels closer to a strong advanced-class teacher than to a supportive teacher for a learner who needs more guided orientation.

The issue is not reduced rigor. The observed problem is insufficient conversational guidance, contextual bridging, and cognitive-load reduction. Current wording often uses formal assessment or taxonomy language where a more natural teacher-led transition could connect the learner's previous observation to the next reasoning move.

This should not be treated as a request for isolated copy softening. It is a broader teacher-voice / guided-instruction concern.

### F6 — JOIN heading wrapping

**Classification:** Minor visual polish

The JOIN implementation heading wraps awkwardly in the current narrow reasoning column. This is likely a symptom of F4 rather than an independent structural issue.

## Validation conclusion

The two scoped implementation changes passed their core behavioral validation:

- requested-result Grain now occurs after relationship/cardinality reasoning and before Baseline/prediction;
- the real SQL workspace begins at the Baseline and persists into later SQL implementation;
- the Grain → baseline → one matching source → 18 result rows reasoning chain is observable and coherent.

The test drive also surfaced additional UX and instructional-experience findings that should be triaged before further Stage 1 stabilization work is selected.

This record does not by itself establish full Stage 1 completion or course-level validation.
