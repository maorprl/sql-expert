# Stage 1 Manual Test-Drive Findings

**Status:** Evidence / findings only — **NOT pedagogical authority**

**Test-drive date:** 2026-09-10  
**Tested branch:** `codex/stage1-current-spec`  
**Tested implementation commit:** `2309804f769368cac9672a0397c99f1ec173520b` (`Freeze completed Stage 1 interactions`)

## Purpose and authority boundary

This document records observations from a manual learner walkthrough of the current Stage 1 implementation.

It is intended to preserve evidence from the test drive so that later design and implementation work does not depend on chat memory or re-interpretation.

**This document is not pedagogical authority.** A finding classified as `DESIGN GAP` does not become a required course behavior merely by appearing here. Any accepted design change must first be incorporated into the relevant Stage 1 authority documents before implementation.

Current Stage 1 authority remains:

1. `course-design/stage-1/stage-1-learner-route.md`
2. `course-design/stage-1/stage-1-interaction-decisions.md`

The current implementation is evidence of what the learner encounters, not authority for what is pedagogically correct.

## Classification legend

- **DRIFT** — the implementation conflicts with an already accepted Stage 1 decision.
- **LOST DECISION** — a previously established behavior was not preserved in the current authority handoff and was lost during reconstruction/implementation.
- **DESIGN GAP** — the accepted design does not specify enough to produce the intended learner experience; design must be completed before Codex is asked to implement a fix.
- **UX / VISUAL / COPY / POLISH** — the sequence may be acceptable, but presentation or wording reduces clarity or instructional quality.
- **WORKS — PRESERVE** — the current implementation successfully supports the intended reasoning and should not be broken by later fixes.
- **REQUIRED, BADLY IMPLEMENTED** — the underlying requirement is correct, but the current implementation defeats its purpose.

## Findings

| ID | Area | Test-drive finding | Classification | Why it matters / what is missing | Direction for follow-up |
|---|---|---|---|---|---|
| **F1** | Grain | It is not clear enough that the question is about the **grain of the requested query result**. The experience can be read as if the learner is determining the grain of `news_article`. | **DESIGN GAP — MAJOR** | The starting point is a business request that should produce a result combining article and source information. The learner needs to reason about what one row in that result should represent, not which table “is the grain.” | Complete the design around **result/output grain**. Both relations remain part of the problem. |
| **F2** | Grain visual state | After a correct grain answer, `news_article` receives strong emphasis while `news_source` becomes heavily faded. The `1 result row = 1 news article` badge also appears visually attached to the article side. | **UX + DESIGN RISK** | This reinforces the possible misconception `Grain = table`. `news_source` is still required to answer the business request. | Represent grain as **result-level state**. Article may become the row-organizing entity without making source look disabled or irrelevant. |
| **F3** | Grain concept timing | The learner-facing heading uses `OUTPUT GRAIN` before the learner has reached the concept through reasoning. | **DRIFT** | Stage 1 is supposed to introduce the concept after the learner has established the underlying meaning. | Use natural language about the result row before the answer; reveal **Grain** only in the post-answer Concept Moment. |
| **F4** | Relationship / key | Selecting `news_article.news_source_id` directly in the Working Schema works well. PK/FK information appears only after the learner identifies the connecting column correctly. | **WORKS — PRESERVE** | The Working Schema functions as a reasoning surface rather than a passive diagram, and structural metadata does not reveal the answer prematurely. | Preserve this behavior. |
| **F5** | Relationship copy | `CONNECTING KEY` reads like specification/system language rather than natural learner guidance. | **COPY / POLISH** | The action is appropriate, but the label makes the experience feel more like a technical workflow than teacher-led reasoning. | Consider more natural learner-facing wording without changing the underlying task. |
| **F6** | PK/FK visual | PK/FK meaning is shown both on the relevant columns and again around the connector. | **VISUAL POLISH** | The duplication adds visual load without adding instructional meaning. | Keep one clear, consistent PK/FK representation. |
| **F7** | Cardinality concept timing | `CARDINALITY` appears in the learner-facing heading before the learner has reasoned through the relationship. | **DRIFT** | The concept name is revealed before the intended discovery moment. | Reveal **Cardinality** only after the learner answers correctly. |
| **F8** | Cardinality visual | The schema shows `M ← 1` while the explanatory language says one source → many articles. | **UX / VISUAL** | The visual reading direction and explanatory reading direction conflict, making a simple relationship harder to parse. | Use one consistent representation aligned with the explanation, e.g. source `1 → M` articles. |
| **F9** | Working Schema continuity | The same Working Schema persists and accumulates established reasoning across key → PK/FK → relationship → cardinality. | **WORKS — PRESERVE** | This is a core improvement: prior reasoning remains visible and structurally active instead of disappearing between steps. | Preserve this same reasoning surface through later parts of Stage 1. |
| **F10** | Cardinality → Baseline | The move into Baseline feels like a new unrelated task: “now count article rows.” The learner is not shown why this measurement is needed **at this point**. | **DESIGN GAP — MAJOR** | The intended chain should be: we want article + source; one result row should remain one article; before adding source information, establish how many article rows we start with so later row preservation can be checked. | Complete the transition as part of the reasoning journey, not as generic bridge copy. |
| **F11** | Baseline SQL workspace | `SELECT COUNT(*) FROM news_article;` is shown as a prepared code card with a separate `Run measurement` interaction instead of inside the continuing SQL editor. | **LOST DECISION** | The earlier implementation behavior used the SQL editor as the baseline measurement tool with the query prefilled. During the new authority handoff, the exact compact UI was left open and the visual reference allowed this behavior to disappear. | Restore the **same persistent SQL editor** at Baseline with the prepared `COUNT(*)` query already present. The learner runs and interprets it; this is not a SQL-writing test. |
| **F12** | Baseline → JOIN SQL continuity | Because the editor is absent at Baseline, the SQL workspace later appears as a new environment when JOIN implementation begins. | **CONSEQUENCE OF LOST DECISION** | A persistent editor would let SQL enter first as a measurement tool and later become the implementation tool, creating a smoother transition from reasoning to SQL. | Keep one continuous SQL workspace from Baseline through JOIN implementation. |
| **F13** | Baseline interpretation | `What does the number 18 represent here?` and feedback centered on `COUNT(*) counted rows` feel mechanical. | **DESIGN / COPY** | The important learner state is not merely knowing what `COUNT(*)` returns; it is understanding what 18 establishes for the business problem before source information is added. | Frame 18 as the **starting baseline before adding source information** and connect it forward to the prediction. |
| **F14** | Prediction | The 18-row prediction works well. `18 news articles × 1 matching source each = 18 result rows` clearly connects cardinality to expected row preservation. | **WORKS — PRESERVE** | This is one of the strongest continuity points in the current flow. | Preserve with minimal change. |
| **F15** | Semantic relational action | The learner first chooses “combine each news article with its related source,” and only afterward is the term JOIN introduced. | **WORKS — PRESERVE** | The sequence correctly establishes semantic meaning before vocabulary and syntax. | Preserve the ordering. |
| **F16** | JOIN introduction | After the correct semantic action, almost nothing instructionally meaningful happens beyond additional text saying that the operation is called JOIN. | **DESIGN GAP — MAJOR** | JOIN is the conceptual payoff of the stage, but the Working Schema does not become an active teaching surface at the moment JOIN is introduced. | Complete the JOIN instructional design so the learner can **see what JOIN does**, not only read a definition. |
| **F17** | JOIN visual model | There is no concrete representation of an article row matching its referenced source row and contributing information to one combined result row. | **DESIGN GAP — MAJOR** | Without a row-level matching example, “JOIN combines related rows” remains abstract. | Use a local explanatory example: matching article row + source row → one result row. This should not replace the schema with an instance-data browser and should not use a Venn diagram as the primary model. |
| **F18** | JOIN requested attributes | `news_article.title` and `news_source.name` are the exact fields required by the business request, but they do not become instructionally significant during the JOIN explanation. | **DESIGN GAP** | These fields provide the clearest concrete reason for combining the two relations: the final row needs information from each side. | Bring `title` and `name` into focus during the JOIN explanation and show their contribution to the result row. |
| **F19** | Relationship → `ON` | `ON news_article.news_source_id = news_source.news_source_id` appears as syntax to learn rather than as the SQL expression of the relationship the learner has already established visually. | **DESIGN GAP — MAJOR** | This breaks continuity between relational reasoning and SQL implementation. | Explicitly map the already-established connector/relationship to the `ON` condition. The learner should experience `ON` as implementation of prior reasoning, not arbitrary syntax. |
| **F20** | JOIN → SQL transition | The experience moves too quickly from semantic action into `INNER JOIN ... ON ...` syntax instruction. | **DESIGN GAP / UX** | SQL risks feeling like a new lesson layered on top of the reasoning instead of the implementation of reasoning already completed. | Establish the semantic/visual mapping first, then introduce JOIN terminology and syntax, then move into learner-authored SQL. |
| **F21** | SQL Workspace hierarchy | Once the SQL editor appears, it becomes one of the most visually dominant elements on the screen and the Working Schema becomes comparatively passive. | **UX / VISUAL** | This risks reverting to an SQL-workspace-led experience with pedagogy beside it. | During instruction, keep the evolved Working Schema meaningfully active; let the editor take stronger focus when the learner is actually implementing the query. |
| **F22** | Query result grid | After running the JOIN query, the result table correctly shows `title` + `name` and 18 rows. | **EXPECTED / WORKS** | The result grid is necessary evidence of what the query produced, but it does not itself teach what JOIN means. | Preserve it as query output / evidence, not as a substitute for the JOIN instructional visual. |
| **F23** | Validator feedback | The UI shows learner-facing text such as `Your answer: Semantically correct 18-row article-and-source result`. | **DRIFT / COPY** | This exposes validator/system language as though it were the learner's answer. | Replace with natural learner-facing feedback based on observable query results. |
| **F24** | Final verification | Before the learner answers the final verification question, the UI already states that the result is semantically correct and that every article is paired with its referenced source. | **DRIFT — MAJOR** | The assessment gives away the conclusion before asking the learner to demonstrate understanding, making the evidence nearly meaningless. | Before the question, show only observable technical facts needed for reasoning, such as `18 rows`, not the conclusion being assessed. |
| **F25** | Final grain verification | Explicit final-grain verification is required, but the current implementation reduces it to confirmation rather than genuine evidence. | **REQUIRED, BADLY IMPLEMENTED** | The learner should still have to establish what one row in the final result represents. | Ask a genuine final-grain question, e.g. `What does one row in this result represent?`, and only after success close the loop to the 18-row baseline and prediction. |
| **F26** | Completion loop | The stage has all the ingredients for a coherent closing chain — requested result → result grain → relationship/cardinality → 18-row baseline → prediction → JOIN → actual 18-row result — but the final closure is weakened by the current verification behavior. | **DESIGN GAP / COMPLETION** | The learner should finish with the sense that the actual query result confirms the reasoning established earlier, not merely that the validator accepted SQL. | After valid final verification, explicitly reconnect the actual result to one article per row and the predicted 18 rows. |

## Major findings requiring design work before implementation

The test drive identifies four central areas that should be resolved before another broad implementation pass:

### 1. Result-centric Grain

The current learner experience does not sufficiently establish that Grain refers to the **requested result**, and the visual treatment risks teaching `Grain = table`. This is a design problem, not merely copy cleanup.

### 2. Baseline continuity and the lost persistent editor

The Baseline activity itself is useful, but its purpose in the reasoning journey is under-explained. In addition, the persistent SQL editor behavior was lost during the current reconstruction/handoff. That editor should be restored deliberately rather than treated as a new design invention.

### 3. JOIN instructional experience

The semantic ordering is correct, but the core JOIN teaching moment is missing. The learner chooses the correct relational action, then mostly receives text and syntax. The Working Schema should carry the explanation of row matching, requested fields, and the mapping from the established relationship to the SQL `ON` condition.

### 4. Final verification

Final-grain verification is required, but the current implementation reveals the conclusion before the learner is asked to establish it. The assessment must be redesigned so that the learner's answer provides actual evidence.

## WORKS — PRESERVE

Any redesign or implementation patch should explicitly preserve these successful parts of the current learner experience:

- direct connecting-column selection inside the Working Schema;
- delayed PK/FK reveal after the learner identifies the connection;
- accumulation of established relationship/cardinality state in the same Working Schema;
- semantic relational action before introducing JOIN vocabulary;
- the 18-row prediction and its cardinality-based explanation;
- query result display after learner-authored SQL;
- visible post-answer feedback / Concept Moments before the learner advances;
- completed interactions remaining frozen while waiting for Continue.

## Follow-up rule

Do **not** send all findings directly to implementation as an unconstrained “fix the test drive” task.

Before implementation:

1. resolve each `DESIGN GAP` in the relevant Stage 1 authority document;
2. restore confirmed `LOST DECISION` items explicitly in authority so they cannot disappear again;
3. treat `DRIFT` items as direct conformance fixes once the authority is clear;
4. preserve the items listed under `WORKS — PRESERVE`;
5. then implement the resulting accepted changes as one coherent Stage 1 correction pass rather than a series of isolated screenshot fixes.

## Resolution note: Grain sequencing

The original F1 evidence remains historical. The accepted Stage 1 design response removes the standalone pre-relationship Grain episode and relocates result-Grain reasoning into the result-preservation sequence: relationship/cardinality → one article per requested result row → 18 starting article rows → one matching source per article → predict 18 result rows with the same Grain. The learner route and interaction decisions are the authority for this disposition.
