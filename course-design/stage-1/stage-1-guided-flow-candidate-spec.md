# Stage 1 Guided Flow Candidate Specification

## Status

**CANDIDATE — NOT YET DESIGN AUTHORITY**

This document is a control specification for the current Stage 1 redesign discussion.

Its purpose is to prevent implementation drift by making three things explicit:

1. what the current pedagogy and visual language already require;
2. what this candidate proposes to change;
3. what remains open and must not be silently resolved in implementation.

This document does **not** authorize implementation by itself. It becomes implementation authority only after explicit acceptance and any required source-document updates.

---

## 1. Governing sources and source hierarchy

This candidate is derived only from current reconstruction sources and the current Stage 1 implementation state.

Primary current sources:

- `pedagogical-foundations.md`
- `course-design/stage-1/stage-1-learner-route.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`
- `course-design/course-visual-language.md`

Diagnostic reference:

- `course-design/audits/stage-1-instructional-experience-audit-2026-09-08.md`

Current implementation evidence:

- `src/stage1.js`
- shared interaction / styling files used by Stage 1

The audit is **reference evidence, not design authority**.

Previous course versions, previous pedagogy documents, previous stage structures, previous checkpoints, remembered decisions, and legacy implementation are **not authoritative** and must not be used to justify changes unless explicitly reconsidered and re-established.

Mockups and exploratory prototypes are also not authority. They may illustrate a candidate direction, but implementation must follow accepted written decisions rather than infer new rules from a mockup.

---

## 2. Decision labels used in this document

Every substantive item in this specification is classified as one of the following:

### PRESERVED FROM CURRENT SOURCE

Already established by current authoritative documentation. It must not be changed casually or silently.

### NEW CANDIDATE DECISION

A proposed change or refinement established in the current design discussion. It is not yet part of the authoritative source set until explicitly accepted and reflected there.

### OPEN

Not yet resolved. Implementation must not invent an answer.

### NON-GOAL

Explicitly outside this redesign.

---

## 3. Core pedagogical sequence that must remain intact

**PRESERVED FROM CURRENT SOURCE**

The first JOIN encounter keeps the following reasoning order:

1. concrete business problem;
2. identify relevant relations;
3. determine output-row meaning;
4. introduce Grain;
5. identify the relational key connection;
6. introduce PK/FK;
7. reason about Cardinality;
8. use a baseline when needed to reason about row-count / grain preservation;
9. predict behavior before execution;
10. choose the semantic relational action;
11. introduce JOIN terminology;
12. teach `INNER JOIN ... ON ...` before independent SQL implementation;
13. learner-authored SQL;
14. verify the result against expected grain and relational behavior.

The exact number of UI steps is **not** a pedagogical invariant. Packaging may change while the reasoning sequence and evidence remain intact.

The Stage 1 business case remains:

> The research team is reviewing media coverage and wants every article to include the source that published it.

The relational shape remains:

- base relation: `news_article`;
- referenced relation: `news_source`;
- target output grain: one news article per row;
- relationship: `news_article.news_source_id` references `news_source.news_source_id`;
- each article matches one source row;
- one source may publish many articles;
- adding the source name preserves the article grain and the 18-row baseline.

---

## 4. Existing requirements that must not be lost

### 4.1 Relational reasoning before syntax

**PRESERVED FROM CURRENT SOURCE**

The learner must reason about the data and relationships before SQL syntax is allowed to substitute for that reasoning.

JOIN terminology must not appear before the learner chooses the semantic relational action.

`INNER JOIN ... ON ...` instruction must precede learner-authored JOIN SQL.

### 4.2 Concept timing

**PRESERVED FROM CURRENT SOURCE**

Concepts appear only after prerequisite reasoning:

- Grain after output-row meaning;
- PK/FK after the learner identifies the connecting key;
- Cardinality after the learner reasons about the relationship;
- JOIN after the learner chooses the semantic action.

No visual or label may reveal a concept answer before the learner has performed the intended reasoning.

### 4.3 Closed reasoning interactions

**PRESERVED FROM CURRENT SOURCE**

Stage 1 reasoning interactions remain constrained / closed rather than open-text unless a later accepted decision explicitly changes a specific interaction.

### 4.4 Baseline purpose

**PRESERVED FROM CURRENT SOURCE**

The prepared `COUNT(*)` baseline exists as a measurement tool for reasoning about row-count and grain preservation.

It is not a SQL syntax lesson and does not require the learner to author `COUNT(*)`.

### 4.5 Prediction before execution

**PRESERVED FROM CURRENT SOURCE**

The learner must predict that the result will preserve 18 rows and one article per row before JOIN execution.

The successful explanation continues to connect:

- 18 article rows;
- one article per row;
- one referenced source per article;
- `18 articles × 1 matching source each = 18 result rows`.

### 4.6 Verification evidence

**PRESERVED FROM CURRENT SOURCE**

Completion must establish that the result:

- contains 18 rows;
- preserves one news article per row;
- associates each article with its referenced source.

The final learner verification of grain remains required evidence even if it is packaged inside the same top-level episode as SQL implementation.

### 4.7 Completed reasoning remains reviewable

**PRESERVED FROM CURRENT SOURCE**

Completed interactions remain visible and reviewable, visually quieter than the active interaction, and retain the learner's original reasoning evidence.

At minimum, review must preserve:

- original question / task;
- learner answer or selection;
- completion state;
- relevant feedback / concept consequence;
- opened hints when applicable.

Merging top-level episodes must not erase prior learner evidence.

---

## 5. Problem this candidate is trying to solve

**PRESERVED DIAGNOSTIC FINDING — NOT A NEW PEDAGOGICAL RULE**

The current Stage 1 is logically ordered but can feel like a sequence of task cards rather than one guided reasoning journey.

The recurring experience gap is that the interface often advances from:

`question → answer → next question`

without sufficiently preserving:

- what problem is still being solved;
- what has just been established;
- what that discovery now enables;
- why the next reasoning move follows.

The redesign must improve continuity **without performing the reasoning for the learner**.

This does **not** require an explanatory paragraph between every move. Continuity may be carried by the state of the working environment, concise instructional framing, visual progression, or other mechanisms that preserve orientation without giving answers away.

---

## 6. Candidate top-level interaction architecture

**NEW CANDIDATE DECISION**

The current nine numbered learner steps are repackaged into **six top-level learner episodes** while preserving all required reasoning moves and evidence.

The six candidate episodes are:

1. Identify relevant relations
2. Determine output grain
3. Understand the relationship
4. Establish baseline and predict behavior
5. Choose the semantic relational action
6. Learn JOIN, implement SQL, and verify the result

This is a packaging change, not permission to remove reasoning moves.

The learner should experience a guided path where the same problem environment evolves as understanding accumulates, rather than a disconnected trail of independent mini-forms.

---

## 7. Working Schema progressive-disclosure contract

### 7.1 Initial Working Schema

**PRESERVED FROM CURRENT SOURCE**

The Working Schema begins empty.

The learner identifies and selects `news_article` and `news_source` from the live schema.

The task requires two relations. The Working Schema capacity remains four relations maximum; four is a capacity ceiling, not a task target.

### 7.2 What is visible before PK/FK is taught

**NEW CANDIDATE DECISION**

Before the learner has identified the connecting key, selected Working Schema cards show:

- relation names;
- column names.

They do **not** show:

- PK badges;
- FK badges;
- `FK → referenced_table.column` text;
- relationship connectors that identify the answer;
- cardinality markers.

Reason: the current implementation exposes PK/FK metadata early enough to make the connecting-key reasoning substantially easier and to visually reveal concepts before their documented teaching moment.

This candidate therefore intentionally changes the current interaction-decision statement that selected cards expose PKs and FKs needed for the route.

If accepted, the authoritative interaction-decision document must be updated explicitly; this must not be implemented as a hidden CSS-only change.

### 7.3 Connecting-key interaction

**NEW CANDIDATE DECISION**

The connecting-key reasoning should operate on the Working Schema itself rather than on a detached generic radio card.

The learner is asked the same conceptual question:

> Which column in `news_article` identifies the related publishing source?

The learner selects a column from the `news_article` relation card.

This remains a constrained answer interaction; it does not become open exploration.

Wrong selection:

- produces local corrective feedback;
- does not reveal PK/FK;
- does not reveal the relationship connector;
- keeps the learner in the same reasoning state.

Correct selection:

- locks / confirms `news_article.news_source_id` as the learner's established choice;
- only then permits PK/FK instruction and relationship reveal.

### 7.4 Relationship reveal after connecting-key reasoning

**NEW CANDIDATE DECISION**

After the learner correctly identifies `news_article.news_source_id`:

- reveal the relationship between `news_article.news_source_id` and `news_source.news_source_id`;
- reveal `FK` on the article-side column;
- reveal `PK` on the source-side column;
- present the PK/FK Concept Moment;
- explain that the referenced source row contains the `name` needed for the business request.

At this point, do **not** reveal `1 → M` or any cardinality label.

This is a deliberate change from the current design, where the local relationship visual is specified only after correct Cardinality reasoning.

### 7.5 Cardinality reveal

**NEW CANDIDATE DECISION**

Cardinality remains a separate learner reasoning move inside the same relationship episode.

The learner answers the existing closed proposition about the relationship.

Only after a correct answer:

- reveal / annotate `1 → M` on the already visible relationship;
- present the Cardinality Concept Moment;
- preserve the same relationship object as the accumulated visual state rather than replacing it with a disconnected explanatory diagram.

The visual therefore grows in two learner-earned stages:

1. key relationship + PK/FK;
2. cardinality annotation.

No stage may reveal the answer to the next reasoning move prematurely.

---

## 8. Detailed candidate storyboard

## Episode 0 — Persistent business context

**PRESERVED FROM CURRENT SOURCE**

The business request remains visible as context and is not itself a numbered learner step.

The learner should be able to remain oriented to the same request throughout Stage 1.

**NEW CANDIDATE APPLICATION**

The business request should remain visually available enough to reconnect later reasoning to the original need, without competing with the active reasoning task.

Exact placement and copy treatment remain OPEN.

---

## Episode 1 — Identify relevant relations

### Learner purpose

**PRESERVED FROM CURRENT SOURCE**

Connect the business request to the information required and identify the relations that provide it.

### Learner action

**PRESERVED FROM CURRENT SOURCE**

Select:

- `news_article`
- `news_source`

from the live schema and add them to the Working Schema.

### Evidence

**PRESERVED FROM CURRENT SOURCE**

The learner has correctly interpreted which relations are needed for the business request.

### Visual state after success

**NEW CANDIDATE APPLICATION**

The two selected relations remain as the persistent Working Schema for the next reasoning move.

Before PK/FK is taught, they display relation names and columns only.

### Continuity requirement into Grain

**PRESERVED PRINCIPLE + NEW CANDIDATE APPLICATION**

The move into output grain must feel like the next question about the same result being built, not a reset into an unrelated task.

The learner should understand that after identifying where the required information lives, the next need is to determine what one result row is supposed to represent.

This continuity must not state the answer (`news article`) before the learner chooses it.

---

## Episode 2 — Determine output grain

### Learner purpose

**PRESERVED FROM CURRENT SOURCE**

Determine what one requested output row should represent.

### Learner action

**PRESERVED FROM CURRENT SOURCE**

Closed choice with the current correct answer:

- `a news article`

### Concept timing

**PRESERVED FROM CURRENT SOURCE**

Only after the correct answer, introduce:

**NEW CONCEPT: GRAIN**

- output grain = one news article per row;
- Grain = what one row represents.

### Working Schema response

**NEW CANDIDATE DECISION**

After Grain is established, the Working Schema may visually emphasize `news_article` as the relation supplying the target row meaning while keeping `news_source` available but quieter.

This emphasis must not teach or imply a false general rule that "Grain = a table".

It is a local visualization of the already-established result meaning.

### Continuity requirement into connecting key

**PRESERVED PRINCIPLE + NEW CANDIDATE APPLICATION**

The next move must arise from the established article grain:

- we are keeping one article per row;
- the request also needs source information;
- therefore the learner must find how each article points to the source row containing that information.

The experience should make that need clear without identifying `news_source_id` for the learner.

---

## Episode 3 — Understand the relationship

This episode contains two distinct learner reasoning moves that operate on the same relationship surface.

### Move A — identify the connecting key

**PRESERVED REASONING TARGET**

Identify `news_article.news_source_id`.

**NEW CANDIDATE INTERACTION MECHANISM**

Select the column directly in the `news_article` Working Schema card rather than answer through a detached generic multiple-choice card.

### After correct key selection

**PRESERVED CONCEPT TIMING**

Introduce Primary Key / Foreign Key only now.

**NEW CANDIDATE VISUAL STATE**

Reveal:

- `news_article.news_source_id` as FK;
- `news_source.news_source_id` as PK;
- a connector between the two columns.

Do not reveal cardinality yet.

### Move B — reason about Cardinality

**PRESERVED FROM CURRENT SOURCE**

Ask the existing closed relationship question:

- one news source can publish many news articles;
- each news article references one news source.

Cardinality must be reasoned from the PK/FK structure, not by counting seed examples.

### After correct Cardinality reasoning

**PRESERVED CONCEPT TIMING**

Introduce Cardinality only now.

**NEW CANDIDATE VISUAL STATE**

Annotate the existing relationship with `1 → M` rather than replacing it with an unrelated new diagram.

### Continuity requirement into baseline

**PRESERVED PRINCIPLE + NEW CANDIDATE APPLICATION**

The learner should now understand why match count matters for the result.

The next measurement must be framed as evidence needed to test whether the later result preserves the article rows and grain.

Do not turn this into a lecture on JOIN behavior before the learner predicts it.

---

## Episode 4 — Establish baseline and predict behavior

This episode intentionally combines the current baseline and prediction steps into one continuous reasoning unit.

### Move A — baseline measurement

**PRESERVED FROM CURRENT SOURCE**

Use the prepared query:

```sql
SELECT COUNT(*)
FROM news_article;
```

The learner runs it and receives 18.

The learner must still interpret that 18 means 18 news articles.

### Presentation of baseline SQL

**NEW CANDIDATE DECISION**

The baseline should be presented as a compact measurement activity appropriate to its role.

It should not visually promote the full implementation workspace more than necessary for this measurement.

This does not remove the editor / execution capability. It changes presentation hierarchy so the measurement tool supports the reasoning rather than taking over the lesson.

The exact compact UI remains OPEN.

### Move B — prediction

**PRESERVED FROM CURRENT SOURCE**

Without resetting the experience into a new disconnected task, the learner uses:

- article grain;
- PK/FK match;
- one referenced source per article;
- baseline = 18 article rows;

to predict:

- 18 result rows;
- one news article per row.

### Successful reasoning consequence

**PRESERVED FROM CURRENT SOURCE**

Retain the explanatory logic:

`18 news articles × 1 matching source each = 18 result rows`

One source may publish many articles, but those articles are already separate article rows in the baseline.

### Continuity requirement into semantic action

**PRESERVED PRINCIPLE + NEW CANDIDATE APPLICATION**

The expected result behavior remains visible / cognitively active when the learner chooses what relational action is needed to produce it.

The next move should not feel like a fresh unrelated quiz.

---

## Episode 5 — Choose the semantic relational action

### Learner reasoning

**PRESERVED FROM CURRENT SOURCE**

The learner chooses:

> Combine each news article with its related news source.

This learner decision is retained.

It is **not** replaced by an instructional statement.

### Concept timing

**PRESERVED FROM CURRENT SOURCE**

Only after the correct semantic choice, introduce:

**NEW CONCEPT: JOIN**

A JOIN combines related rows from different relations.

### Continuity requirement into SQL

**PRESERVED FROM CURRENT SOURCE + CURRENT AUDIT ALIGNMENT**

The semantic-to-syntax chain remains explicit:

- learner has chosen the relational action;
- JOIN is named;
- now SQL syntax expresses that already-understood action.

No additional conceptual hurdle is inserted between semantic action and SQL instruction unless explicitly approved later.

---

## Episode 6 — Learn JOIN, implement SQL, and verify

This episode combines the current SQL implementation and final verification into one continuous work episode while preserving all evidence.

### Move A — SQL instruction

**PRESERVED FROM CURRENT SOURCE**

Before learner-authored SQL, teach:

```sql
SELECT ...
FROM relation_a
INNER JOIN relation_b
  ON relation_a.key = relation_b.key;
```

Teach:

- matching-row meaning of `INNER JOIN`;
- role of `ON`;
- task-specific connection:
  `news_article.news_source_id = news_source.news_source_id`.

There is no separate assessment of the `ON` condition.

### Move B — learner-authored SQL

**PRESERVED FROM CURRENT SOURCE**

The learner writes a query returning:

- each article's `title`;
- the publishing source's `name`.

The implementation must be checked semantically, not only by exact query text.

### SQL workspace hierarchy

**PRESERVED FROM VISUAL LANGUAGE + NEW CANDIDATE APPLICATION**

SQL teaching must read as instructional content.

The editor, Run control, and result grid must read as learner tools.

The workspace supports the lesson rather than visually dominating it.

Instructional context should remain spatially / perceptually connected to the learner's implementation task.

### Move C — verification

**PRESERVED FROM CURRENT SOURCE**

After semantically correct execution, the experience verifies:

- result row count = 18;
- expected article/source association;
- final grain = one news article per row.

The learner still answers the explicit final-grain verification question.

### Completion

**PRESERVED FROM CURRENT SOURCE**

Stage completion is a state, not a numbered step.

Completion evidence must show that the learner:

- identified the relevant relations;
- established article grain;
- identified and understood the relationship;
- reasoned about cardinality;
- interpreted the baseline;
- predicted preservation;
- chose the semantic relational action;
- implemented JOIN SQL;
- verified the final result.

---

## 9. Transition continuity contract

**NEW CANDIDATE SPECIFICATION OF AN EXISTING PEDAGOGICAL PRINCIPLE**

Every transition in Stage 1 must preserve enough continuity that the learner can answer, implicitly or explicitly:

1. What problem are we still solving?
2. What did we just establish?
3. Why does that make the next reasoning move relevant?

This is a quality contract, not a requirement for a fixed text block.

The implementation must not solve the next reasoning move for the learner.

The following transitions must each be tested explicitly:

| Transition | What must remain live | What the next move needs |
|---|---|---|
| Business request → Relations | requested article + source information | identify where that information lives |
| Relations → Grain | `news_article` + `news_source` selected | determine what one requested result row represents |
| Grain → Connecting key | one article per output row | find how that article points to the needed source information |
| Connecting key → Cardinality | FK→PK relationship established | reason about how many rows can match on each side |
| Cardinality → Baseline | one source may have many articles; each article has one source | establish a row-count anchor for preservation reasoning |
| Baseline → Prediction | 18 article rows + known match shape | predict output row behavior before JOIN |
| Prediction → Semantic action | expected 18 rows, article grain preserved | choose the relational action that can produce that result |
| Semantic action → JOIN SQL | combine related rows = JOIN | learn SQL syntax for the already-understood action |
| SQL instruction → Implementation | JOIN purpose, key connection, expected behavior known | express the reasoning in SQL |
| Implementation → Verification | actual 18-row result produced | check it against the earlier prediction and grain |

A transition fails this contract if the learner experiences the next prompt as an unrelated new task even though the logical sequence is technically correct.

---

## 10. Visual contract

### 10.1 Active focus

**PRESERVED FROM CURRENT SOURCE**

The current reasoning task is the strongest visual focus.

Supporting tools and completed work must not compete with it.

### 10.2 Completed work

**PRESERVED FROM CURRENT SOURCE**

Completed reasoning remains compact, quiet, and reviewable.

Completion should feel like progress, not another active form.

### 10.3 Concept Moments

**PRESERVED FROM CURRENT SOURCE**

Grain, PK/FK, Cardinality, and JOIN retain distinct Concept Moment treatment.

Concept styling is separate from correctness styling.

Green primarily communicates correctness / success.

A learning accent communicates concepts, instructional emphasis, transitions, and explanatory visuals.

### 10.4 Working Schema as a reasoning surface

**NEW CANDIDATE DECISION**

The Working Schema is not only a static reference panel in this candidate.

It becomes the domain-native working object that reflects accumulated learner reasoning:

- selected relations persist;
- the base row-meaning relation can receive focus after Grain;
- the learner selects the connecting column directly in the schema;
- PK/FK appears only after the learner earns that concept;
- the relationship appears after key reasoning;
- `1 → M` appears only after Cardinality reasoning.

The Working Schema must remain guided and constrained. It must not become an open-ended diagramming environment.

### 10.5 Visual aids

**PRESERVED FROM CURRENT SOURCE**

Visual aids:

- clarify relational ideas;
- are local to the reasoning they support;
- appear only after learner engagement;
- do not give away answers prematurely.

The candidate's progressive relationship visualization must satisfy this rule at every reveal state.

### 10.6 Avoid dashboard drift

**NEW CANDIDATE GUARDRAIL**

Do not solve continuity by adding a persistent generic evidence dashboard, progress cockpit, or administrative-looking state panel.

The course should continue to feel like a guided learning environment rather than an internal tool.

---

## 11. Evidence contract

**PRESERVED FROM CURRENT SOURCE**

Changing top-level packaging does not reduce required learner evidence.

The implementation must still preserve evidence for:

- relevant relation identification;
- output grain;
- connecting key;
- cardinality;
- baseline interpretation;
- prediction;
- semantic relational action;
- valid JOIN SQL result;
- final grain verification.

**NEW CANDIDATE DECISION**

When one top-level episode contains multiple reasoning moves, the distinct required evidence should remain inspectable rather than being collapsed into one opaque episode-success flag.

This candidate does **not** prescribe a specific internal state model, independent-testability mechanism, or technical representation for that evidence.

---

## 12. Explicit changes from the current Stage 1 design

The following are the candidate's intentional changes and must be treated as changes, not as visual cleanup:

### Change 1 — nine numbered steps → six top-level episodes

**NEW CANDIDATE DECISION**

Reasoning order and evidence remain, but adjacent moves that operate on the same reasoning object are packaged continuously.

### Change 2 — PK/FK metadata hidden before connecting-key reasoning

**NEW CANDIDATE DECISION**

Current selected Working Schema cards expose PK/FK metadata. The candidate withholds those labels until after the learner identifies the key.

### Change 3 — connecting-key response moves into the Working Schema

**NEW CANDIDATE DECISION**

The learner selects the relevant article column directly in the schema rather than answering a detached generic choice card.

### Change 4 — relationship visualization begins after correct key identification

**NEW CANDIDATE DECISION**

Current documentation specifies the relationship visual after correct Cardinality reasoning. The candidate introduces the PK/FK connector after key reasoning and adds cardinality only later.

### Change 5 — baseline + prediction become one continuous episode

**NEW CANDIDATE DECISION**

Both reasoning moves and evidence remain.

### Change 6 — SQL implementation + verification become one continuous episode

**NEW CANDIDATE DECISION**

Final verification remains explicit and evidence-bearing.

### Change 7 — baseline workspace presentation is role-sensitive

**NEW CANDIDATE DECISION**

The compact baseline measurement should not visually invoke the full weight of the implementation workspace unless needed.

Exact UI remains OPEN.

---

## 13. Things this candidate does not change

**PRESERVED / NON-GOAL**

The candidate does not change:

- the Stage 1 business case;
- the required relations;
- the target output grain;
- concept order;
- concept definitions unless separately approved;
- the one-source-to-many-articles relational fact;
- the 18-row baseline;
- prediction-before-JOIN requirement;
- semantic-action-before-JOIN requirement;
- `INNER JOIN ... ON ...` instruction before authored SQL;
- required output fields `news_article.title` and `news_source.name`;
- semantic result checking requirement;
- final grain verification requirement;
- Working Schema capacity of four;
- completed-work reviewability;
- Stage completion as a state rather than a numbered step.

Question wording and answer options should be preserved by default unless a future explicit copy decision changes them. This candidate does not authorize opportunistic rewriting during implementation.

---

## 14. Explicit non-goals

The following are out of scope for this redesign:

- Stage 2 or Stage 3 design;
- deriving future stage structure from this Stage 1 candidate;
- using legacy course structure as authority;
- converting the course into open exploration;
- adding free-form learner explanations where they are not already required;
- building a generic lesson engine before Stage 1 behavior proves a reusable need;
- creating a persistent generic evidence panel / dashboard;
- **NEW CANDIDATE NON-GOAL:** reintroducing the failed bridge-text-only prototype as the architecture;
- redesigning the entire SQL Lab;
- treating external research labels such as teacher presence or coaching as independent course requirements;
- changing hint escalation or solution-reveal rules without a separate accepted decision.

---

## 15. OPEN decisions that implementation must not silently resolve

The following remain OPEN:

1. Exact copy used to maintain continuity between reasoning moves.
2. Exact visual styling of schema focus / dimming after Grain.
3. Exact interaction styling for selectable schema columns.
4. Exact local wrong-answer feedback behavior for schema-column selection beyond preserving the current pedagogical target.
5. Exact connector geometry / animation / annotation treatment.
6. Exact compact presentation of the baseline measurement.
7. Exact visual transition from compact baseline measurement to full SQL implementation workspace.
8. Exact placement of business-request context during later episodes.
9. Exact completed-review grouping when a top-level episode contains multiple reasoning moves.
10. Hint escalation, solution reveal, and unresolved SQL-workspace backlog items not explicitly decided here.
11. Exact Working Schema relation-removal behavior.
12. Technical mechanism used for semantic result checking; the semantic correctness requirement itself remains preserved.

If implementation requires one of these to be resolved, it must be surfaced as a design decision rather than inferred silently.

---

## 16. Implementation acceptance checklist

The implementation is not accepted merely because it renders, executes SQL, or passes technical checks.

It must be evaluated against this checklist.

### Source protection

- [ ] No legacy / previous-course rule was imported.
- [ ] No current pedagogical sequence was changed without an explicit candidate decision.
- [ ] No OPEN item was silently converted into a rule.
- [ ] No concept appears earlier than its established reasoning prerequisite.

### Relations and Grain

- [ ] Working Schema starts empty.
- [ ] Learner identifies `news_article` and `news_source` from the live schema.
- [ ] Relations remain present into the Grain move.
- [ ] Grain is still reasoned before it is named.
- [ ] Schema emphasis after Grain does not imply the false rule `Grain = table`.

### Connecting key and PK/FK

- [ ] Before key reasoning, the Working Schema does not expose PK/FK labels that reveal the answer.
- [ ] Learner can select a column directly in `news_article`.
- [ ] Wrong selection does not reveal the answer.
- [ ] Correct `news_source_id` selection is required before PK/FK appears.
- [ ] PK/FK explanation still states how the article points to the publishing source and its `name`.

### Cardinality

- [ ] `1 → M` is not visible before Cardinality reasoning.
- [ ] Cardinality remains a learner reasoning check.
- [ ] Cardinality is reasoned from PK/FK structure rather than seed counting.
- [ ] After correct reasoning, the same relationship object receives the cardinality annotation.

### Baseline and prediction

- [ ] Prepared baseline still runs and produces 18.
- [ ] Learner still interprets 18 as 18 articles.
- [ ] Baseline presentation reads as measurement, not a syntax lesson.
- [ ] Prediction occurs before JOIN terminology.
- [ ] Prediction still requires 18 rows / article-grain preservation.
- [ ] Successful reasoning still connects baseline + one-match-per-article + grain.

### Semantic action and JOIN

- [ ] Learner still chooses the semantic action.
- [ ] JOIN is not named before that choice.
- [ ] JOIN Concept Moment remains distinct.

### SQL and verification

- [ ] `INNER JOIN ... ON ...` is taught before learner-authored SQL.
- [ ] SQL teaching and SQL workspace remain visually distinct.
- [ ] The implementation task still requires `title` + source `name`.
- [ ] Correctness is checked semantically, not by exact text alone.
- [ ] Valid result contains 18 rows and correct article/source pairs.
- [ ] Learner still explicitly verifies final grain.
- [ ] Verification reconnects to the earlier prediction and baseline.

### Continuity and visual experience

- [ ] The learner can remain oriented to the same business problem throughout.
- [ ] Each next reasoning move visibly or instructionally follows from established evidence.
- [ ] Continuity does not perform the reasoning for the learner.
- [ ] Current work is visually dominant.
- [ ] Completed work is quiet and reviewable.
- [ ] Concepts use the learning accent rather than correctness green as their identity.
- [ ] The Working Schema feels like a reasoning surface, not a dashboard.
- [ ] The SQL workspace supports the lesson rather than dominating it.

### Evidence preservation

- [ ] All required reasoning evidence remains available for review even though top-level packaging changes.
- [ ] Merged episodes do not hide or collapse distinct reasoning evidence into one opaque success state.
- [ ] Exact internal state representation remains an implementation choice unless separately decided.
- [ ] Stage completion remains a state after all required evidence is present.

---

## 17. Post-implementation three-way audit

After implementation and before declaring the redesign complete, perform an explicit three-way comparison:

1. **Implementation ↔ this candidate specification**
2. **Implementation ↔ original current pedagogy / Stage 1 sources**
3. **Implementation ↔ course visual language**

For each material behavior, classify it as:

### PASS

Matches the accepted candidate and does not violate preserved source requirements.

### REGRESSION

Breaks behavior or pedagogy that was supposed to remain intact.

### UNAUTHORIZED CHANGE

Introduces a new behavior / rule not present in the candidate and not required by current sources.

### OPEN / NEEDS DECISION

Implementation exposed an unresolved design choice that should not be guessed.

Technical tests are necessary but not sufficient.

**NEW CANDIDATE PROCESS RULE:** for experiential claims such as continuity, visual hierarchy, perceived guidance, or whether a visual reveals an answer prematurely, manual learner test-drive evidence is the proposed acceptance method for this candidate. This is not asserted as an existing course-level rule.

---

## 18. Required source-document reconciliation if this candidate is accepted

If this candidate is approved as the new Stage 1 design, the current authoritative documents must be reconciled before or alongside implementation.

At minimum:

### `course-design/stage-1/stage-1-learner-route.md`

Must be updated from nine top-level learner steps to the accepted packaging while preserving all reasoning moves and completion evidence.

### `course-design/stage-1/stage-1-interaction-decisions.md`

Must be updated to reflect:

- progressive disclosure of PK/FK metadata;
- connecting-key selection inside Working Schema;
- relationship connector after key reasoning;
- Cardinality annotation only after Cardinality reasoning;
- baseline + prediction continuity;
- SQL + verification continuity;
- any accepted role-sensitive baseline presentation.

### `course-design/course-visual-language.md`

Should be changed only if the accepted candidate establishes a reusable visual rule beyond Stage 1.

Do not automatically promote Stage 1-specific interaction behavior into a course-wide visual-system rule.

### `pedagogical-foundations.md`

Should be changed only if this work establishes a genuine broader pedagogical principle not already covered by `WORKING — Guided reasoning progression`.

Do not turn local Stage 1 choices into global pedagogy merely because they worked here.

---

## 19. Final candidate invariant

The intended learner experience is neither:

- an unguided "forest without a map";
- nor a trail of disconnected multiple-choice cards.

The candidate target is:

**a constrained, guided reasoning path in which the same problem environment changes in response to what the learner has correctly established.**

The environment should carry accumulated reasoning forward without exposing future answers, while the learner remains responsible for the next reasoning move.