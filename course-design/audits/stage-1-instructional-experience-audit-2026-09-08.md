# Stage 1 Instructional-Experience Audit — 2026-09-08

**STATUS: REFERENCE / IMPLEMENTATION-EXPERIENCE AUDIT — NOT A DESIGN AUTHORITY**

This audit evaluates the current Stage 1 against the existing `WORKING — Guided reasoning progression` principle. External lenses such as teacher presence, conversational voice, coaching, signaling, and segmentation are diagnostic only. The findings do not themselves create new course-level requirements, and this audit prescribes no implementation change.

The governing course principle states that, during a multi-step reasoning process, the learner should remain oriented to the problem being worked on, what has already been established, and why the next reasoning move is relevant. Guidance should preserve that continuity without performing the reasoning for the learner.

## Transition Audit

### Business request → relation identification

**What the learner has just established**

Nothing yet. The learner receives the business request: “The research team is reviewing media coverage and wants every article to include the source that published it.”

**What the interface presents next**

The learner is asked to “Choose the relations relevant to the business request,” use the `+` actions in the full live schema viewer to build a focused Working Schema, and then “Check selection.”

**Teacher-presence assessment**

Partially guided, leaning toward task-platform behavior. The context is concrete and the selection is constrained, but the experience moves immediately into an operation without orienting the learner to the information the request requires.

**Continuity assessment**

The overall purpose is visible, but the connection from the request to the needed information and relations is not made explicit. The learner must supply that connective reasoning while also learning how to operate the schema interface.

**UX alignment**

The full schema and initially empty Working Schema appropriately support relation identification. The interface is structurally suitable, but its presentation is procedural rather than connective.

**Classification:** `CONFIRMED EXPERIENCE GAP`

The next action arrives without enough orientation to the reasoning process required by the existing guided-reasoning principle.

### Relation identification → output grain

**What the learner has just established**

The learner selected `news_article` and `news_source`. Feedback states: “The working schema now contains the two relations needed for this task.”

**What the interface presents next**

The learner is asked: “What should one row in the requested result represent?” After the response, a Concept Moment establishes: “The output grain is one news article per row” and “Grain = what one row represents.”

**Teacher-presence assessment**

Partially guided. The question is meaningful and the concept is introduced after the learner reasons, but the transition does not explain why deciding what one output row represents follows from identifying the relevant relations.

**Continuity assessment**

The missing connection is between finding the information sources and determining which relation supplies the target output grain.

**UX alignment**

The Concept Moment supports first exposure and the current interaction remains prominent. The weakness is in the instructional bridge, not the interaction mechanics.

**Classification:** `CONFIRMED EXPERIENCE GAP`

### Output grain → connecting relationship / PK-FK

**What the learner has just established**

One requested output row represents one news article, and Grain has been named and defined.

**What the interface presents next**

The learner is asked: “Which column in `news_article` identifies the related publishing source?” Feedback identifies the Foreign Key and Primary Key connection.

**Teacher-presence assessment**

Partially guided. The post-answer explanation is clear, but the column-identification task appears as a new task rather than as the next consequence of the established article grain.

**Continuity assessment**

The experience does not explicitly connect keeping one article per row with finding the article value that points to its source information.

**UX alignment**

PK/FK is introduced after the prerequisite reasoning, as intended. The concept treatment is sound, but the transition remains isolated.

**Classification:** `CONFIRMED EXPERIENCE GAP`

### Connecting relationship → cardinality

**What the learner has just established**

`news_article.news_source_id` references `news_source.news_source_id`.

**What the interface presents next**

The learner reasons about the relationship and establishes: “One news source can publish many news articles, and each news article references one news source.” A local visual then reinforces that cardinality.

**Teacher-presence assessment**

Partially guided. The reasoning move is logically adjacent and the visual reinforces it, but the experience does not fully establish why the number of matches matters for the expected result.

**Continuity assessment**

The relation between cardinality and later row/grain preservation remains underdeveloped.

**UX alignment**

This is one of the strongest-aligned transitions: the visual is local, follows learner reasoning, and does not reveal the answer prematurely.

**Classification:** `PARTIAL ALIGNMENT`

The interaction and visual aid align; continuity into the consequence of cardinality remains a `CONFIRMED EXPERIENCE GAP`.

### Cardinality → baseline

**What the learner has just established**

One source can have many articles, while each article references one source. The relationship has also been visually reinforced.

**What the interface presents next**

“Let’s establish a baseline.” The learner receives a prepared measurement query and runs it.

**Teacher-presence assessment**

Partially guided but procedural. The wording signals a shared activity, yet does not fully explain why a measurement is needed at this point.

**Continuity assessment**

The missing connection is that the baseline will provide evidence for checking whether the later result preserves article rows and grain.

**UX alignment**

Prepared SQL is used in its locally established measurement role. The SQL workspace still carries substantial visual weight for this compact task; that is already recorded as a non-blocking SQL-workspace UX backlog item.

**Classification:** `CONFIRMED EXPERIENCE GAP`

### Baseline → prediction

**What the learner has just established**

The baseline is 18 news articles, and the learner has seen what that count represents.

**What the interface presents next**

The learner predicts the row behavior. Successful feedback explains: “18 news articles × 1 matching source each = 18 result rows,” followed by: “The result keeps one news article per row.”

**Teacher-presence assessment**

Partially guided. The post-answer explanation strongly connects cardinality, row count, and grain, but the transition into the prediction question does less to state why the learner can now make that prediction.

**Continuity assessment**

The reasoning is coherent after the answer. The missing portion is the pre-question bridge from known baseline plus known match behavior to prediction.

**UX alignment**

The interaction follows the documented first-JOIN reasoning architecture and collects meaningful evidence before execution.

**Classification:** `CONFIRMED EXPERIENCE GAP`

The post-answer explanation itself is `NOT A GAP`; the incomplete transition into prediction is the gap.

### Prediction → semantic relational action

**What the learner has just established**

The learner expects 18 output rows with one article per row after adding the matching source.

**What the interface presents next**

The learner is asked what needs to happen next and chooses the semantic action of combining matching rows. Only afterward is JOIN introduced by name.

**Teacher-presence assessment**

Partially guided. The ordering is pedagogically coherent, but the prompt does not clearly show that the predicted behavior now informs the choice of relational action.

**Continuity assessment**

The missing bridge is from the desired, predicted result behavior to selection of the operation that produces it.

**UX alignment**

The UI correctly preserves semantic reasoning before terminology and syntax.

**Classification:** `CONFIRMED EXPERIENCE GAP`

The ordering itself is `NOT A GAP`.

### Semantic relational action → SQL instruction

**What the learner has just established**

The learner has selected the need to combine related rows, and JOIN has been introduced as the relational action.

**What the interface presents next**

“Implement the JOIN in SQL” is followed by the `INNER JOIN ... ON` pattern and an explanation of the roles of `INNER JOIN` and `ON`.

**Teacher-presence assessment**

Partially guided to guided. This is the clearest translation from established relational meaning into implementation syntax.

**Continuity assessment**

The semantic-to-syntax chain is present. It could refer more explicitly to the earlier prediction, but the next move is intelligible from what has been established.

**UX alignment**

SQL appears after relational reasoning, and syntax instruction precedes independent implementation. The remaining spatial separation between instruction and workspace is already recorded in the non-blocking SQL-workspace backlog.

**Classification:** `NOT A GAP` for the instructional sequence; the existing workspace continuity issue remains a `CONFIRMED EXPERIENCE GAP` at implementation level.

### SQL instruction → learner-authored implementation

**What the learner has just established**

The learner has the semantic purpose of JOIN, the `INNER JOIN ... ON` pattern, the actual PK/FK connection, and the expected grain and row behavior.

**What the interface presents next**

The learner is told: “Now write a query that returns every article’s `title` together with the `name` of the source that published it,” while retaining the baseline query and writing the JOIN beneath it.

**Teacher-presence assessment**

Partially guided. The task is concrete, but the move from instruction into the editor feels abrupt rather than like the application of the reasoning already assembled.

**Continuity assessment**

The prompt does not explicitly reconnect the implementation task to the established relationship and expected behavior.

**UX alignment**

The editor can remain visually dominant, the actionable instruction can be cut at the workspace boundary, and instruction and implementation can read as separate regions. The committed sizing change is a partial improvement, not a full resolution.

**Classification:** `CONFIRMED EXPERIENCE GAP`

### Implementation → verification / completion

**What the learner has just established**

The learner has executed semantically valid SQL and produced the required 18-row, two-column result.

**What the interface presents next**

The experience returns to the prediction—“You predicted 18 rows”—asks what one row in the result represents, and then provides final feedback and completion evidence.

**Teacher-presence assessment**

Guided in content, though still presented as a task transition. The retrospective connection is strong.

**Continuity assessment**

The implementation is connected back to prediction and expected grain. The purpose of the final verification question is not fully framed, but the evidentiary role can be inferred from the flow.

**UX alignment**

Completion and review behavior align with the intended lifecycle, and no regression is evident in final evidence handling.

**Classification:** `PARTIAL ALIGNMENT`

Whether the final “why verify” framing constitutes an additional gap is `AMBIGUOUS`.

## Cross-Flow Findings

### Questions frequently arrive without a reasoning bridge

Across the flow, the recurring rhythm is question → answer → next question. Several transitions do not explicitly preserve what was established and why the next reasoning move now matters.

**Classification:** `CONFIRMED EXPERIENCE GAP`

### Feedback often defines the concept without showing what it enables next

Grain, PK/FK, Cardinality, and JOIN are introduced at appropriate points. The explanations often stop after naming or defining the concept rather than carrying its consequence into the next reasoning move.

**Classification:** `CONFIRMED EXPERIENCE GAP`

### Prediction is the strongest-developed reasoning connection

The successful prediction feedback connects cardinality, count, and expected grain concretely. Its weakness is the setup before the prediction rather than the reasoning explanation after it.

**Classification:** `NOT A GAP` for the post-answer reasoning; incomplete setup remains part of the confirmed continuity gap.

### System and task labels carry more of the transitions than instructional voice

Labels and prompts orient the learner procedurally, but often substitute for an explicit connection between established evidence and the next reasoning need. The labels themselves are not a gap; the missing connective reasoning is.

**Classification:** `CONFIRMED EXPERIENCE GAP`

### Completed reasoning remains reviewable and visually quiet

The shared CURRENT / COMPLETED lifecycle preserves completed evidence for deliberate review without allowing it to compete with the active interaction.

**Classification:** `NOT A GAP`

### SQL workspace presentation can interrupt continuity

The committed sizing reduction improved the workspace balance, but the workspace does not yet adapt fully to its measurement and implementation roles, and instructional context can remain physically separated from learner work.

**Classification:** `CONFIRMED EXPERIENCE GAP`, already tracked as `PARTIALLY IMPROVED — NON-BLOCKING UX BACKLOG`.

### External diagnostic lenses

The experience can be described as having limited teacher presence, conversational voice, coaching, signaling, or segmentation. Those descriptions do not independently establish course requirements. They support a confirmed finding only where the same evidence conflicts with the existing guided-reasoning principle or another current documented intention.

**Classification:** `EXTERNAL-RESEARCH CONCERN` where no current-source requirement applies.

## Final Synthesis

### 1. Why Stage 1 can feel like a platform rather than a teacher

Stage 1 has a coherent relational progression, constrained interactions, meaningful evidence, and appropriately timed concept introductions. Its weaker layer is the narration between those interactions. The interface usually tells the learner what task comes next, but less consistently carries forward what was just established, why it matters, and why the next reasoning move is necessary. The learner therefore experiences a sequence of well-ordered tasks more readily than one continuous guided reasoning conversation.

### 2. Strongest recurring causes

1. Missing “why next” connections between adjacent reasoning moves.
2. Concept feedback that defines a concept without consistently showing what that discovery enables next.
3. Limited reconnection to the business problem and the accumulated chain of evidence.
4. Procedural labels and prompts doing more transitional work than an instructional voice.
5. SQL workspace presentation physically separating instructional context from implementation.

### 3. Gaps already established by current course principles

- Incomplete orientation to what has been established and why the next move is relevant conflicts with `WORKING — Guided reasoning progression`.
- SQL instructional/workspace separation remains an implementation-experience gap already tracked as non-blocking backlog work.

The strong current-interaction emphasis, quiet and reviewable completed state, distinct Concept Moments, semantic reasoning before SQL syntax, and local post-reasoning Cardinality visual remain aligned and are not gaps.

### 4. Concerns that depend only on external diagnostic lenses

Teacher presence, conversational voice, coaching, signaling, and segmentation do not become independent requirements through this audit. They remain diagnostic descriptions unless their evidence also conflicts with an existing course principle. A separate course decision would be required before treating them as new requirements.

### 5. Strongest transition examples

- Relation identification → output grain.
- Output grain → connecting relationship / PK-FK.
- Cardinality → baseline.
- Baseline → prediction.
- SQL instruction → learner-authored implementation.

No implementation change is authorized or prescribed by this audit.
