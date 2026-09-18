# Lesson 1 Runtime Review Verification / Traceability Audit — 2026-09-18

**Status:** AUDIT / TRACEABILITY EVIDENCE — NOT IMPLEMENTATION AUTHORITY

**Repository:** `maorprl/sql-expert`

**Audited branch / HEAD:** `main` / `cb4c8a23a48064562b22e409a18bd6f41fea55cb`

**Accepted Lessons 1–2 runtime baseline:** `9b8f6ffc1f22ce2d2783f49e52a48c480a0945fa`

**Review evidence audited:** `course-design/reviews/lesson-1-runtime-review-2026-09-18.md`

**Audit date:** 2026-09-18

This report verifies traceability only. It does not accept, reject, prioritize, combine, generalize, or resolve findings, and it does not authorize implementation or canon changes.

## 1. Audit scope and authority read

The audit read the complete review evidence first and preserved all 97 numbered findings in Sections 1–19 independently. Section 20 candidates were examined separately for scope discovery only. The corrections in Section 22 were treated as binding constraints on interpretation.

Current authority and work-state sources read:

- `source-of-truth-hierarchy.md` — especially **Current authority ownership map**, **Runtime and implementation rule**, **Status semantics**, and **Evidence, review, and provenance artifacts**.
- `routecraft-work-management.md` — especially **Current project baseline**, which identifies accepted runtime baseline `9b8f6ffc1f22ce2d2783f49e52a48c480a0945fa`, and the current project action.
- `pedagogical-foundations.md` — **Guided reasoning progression**, **Teacher continuity and reasoning thread**, **Conservative reuse and scaffolding reduction**, **Relation Identification from the Business Question**, **Business Question Precision and Non-Preemption**, and **First JOIN Teaching Encounter: Reusable Architecture**.
- `course-design/course-visual-language.md` — **Current learner focus**, **Completed Steps**, **Concept Moments**, **Color Roles**, **SQL Teaching vs SQL Workspace**, **Visual Aids**, **Attention choreography and evidence locality**, **Teacher guidance voice**, **Course controls and local assistance**, and **Interaction topology and locality contract**.
- `course-design/course-controls.md` — **Show solution — SQL-workspace assistance**, including placement/availability, assistance semantics, and remaining OPEN questions.
- `course-design/stage-1/stage-1-learner-route.md` — complete Lesson 1 route and gist.
- `course-design/stage-1/stage-1-interaction-decisions.md` — complete current Lesson 1 authority, especially **Relation identification and Working Schema**, **Reasoning, concepts, and progressive relationship reveal**, **Guided continuity**, **Learner-experience visual application**, **Result Grain, baseline, prediction, and semantic action**, **JOIN teaching climax**, **Business question → SQL**, **Cognitive-load constraint**, **Observable implementation requirements**, **SQL implementation workspace**, **Execution evidence and final verification**, **Optional enrichment**, and **OPEN implementation decisions**.
- For scope discovery only: `course-design/stage-2/stage-2-authority.md`, `course-design/stage-3/stage-3-authority.md`, `course-design/stage-3/stage-3-implementation-spec.md`, and `course-design/stage-3/stage-3-visual-reference.html`.

Superseded/historical documents were not used as current authority.

### Authority keys used in the matrix

| Key | Exact current authority basis |
|---|---|
| `H-RUNTIME` | `source-of-truth-hierarchy.md` → **Runtime and implementation rule**: runtime establishes what implementation does, not what it ought to do. |
| `PF-GUIDED` | `pedagogical-foundations.md` → **WORKING — Guided reasoning progression**. |
| `PF-TEACHER` | `pedagogical-foundations.md` → **WORKING — Teacher continuity and reasoning thread**. |
| `PF-REL` | `pedagogical-foundations.md` → **WORKING — Relation Identification from the Business Question**. |
| `PF-BQ` | `pedagogical-foundations.md` → **WORKING — Business Question Precision and Non-Preemption**. |
| `PF-JOIN` | `pedagogical-foundations.md` → **WORKING — First JOIN Teaching Encounter: Reusable Architecture**. |
| `CV-FOCUS` | `course-design/course-visual-language.md` → **Current learner focus** and **Attention choreography and evidence locality**. |
| `CV-COMPLETE` | `course-design/course-visual-language.md` → **Completed Steps**. |
| `CV-CONCEPT` | `course-design/course-visual-language.md` → **Concept Moments** and **Color Roles**. |
| `CV-SQL` | `course-design/course-visual-language.md` → **SQL Teaching vs SQL Workspace**. |
| `CV-AID` | `course-design/course-visual-language.md` → **Visual Aids**. |
| `CV-TEACHER` | `course-design/course-visual-language.md` → **Teacher guidance voice**. |
| `CV-LOCAL` | `course-design/course-visual-language.md` → **Interaction topology and locality contract**. |
| `CTRL-AID` | `course-design/course-controls.md` → **Show solution — SQL-workspace assistance**; detailed escalation/lifecycle remains OPEN where stated. |
| `L1-REL` | `course-design/stage-1/stage-1-interaction-decisions.md` → **Relation identification and Working Schema** and **Reasoning, concepts, and progressive relationship reveal**. |
| `L1-CONT` | Same file → **Guided continuity**. |
| `L1-VIS` | Same file → **Learner-experience visual application**. |
| `L1-GBP` | Same file → **Result Grain, baseline, prediction, and semantic action**. |
| `L1-JOIN` | Same file → **JOIN teaching climax**. |
| `L1-MAP` | Same file → **Business question → SQL**. |
| `L1-LOAD` | Same file → **Cognitive-load constraint** and **Observable implementation requirements**. |
| `L1-SQL` | Same file → **SQL implementation workspace**. |
| `L1-VERIFY` | Same file → **Execution evidence and final verification**. |
| `L1-ENRICH` | Same file → **Optional enrichment**. |
| `L1-OPEN` | Same file → **OPEN implementation decisions**. |

### Implementation ownership keys used in the matrix

| Key | Actual current implementation ownership |
|---|---|
| `S1-HTML` | `src/stage1-prototype-runtime.js`, module-level `html` template (lines 17–41); Lesson-1-local surfaces and copy. |
| `S1-STATE` | `src/stage1-prototype-runtime.js`, `createStage1Prototype`, `reset`, `beginConnection`, `onColumn`, `afterCardinality`, `afterGrain`, `runMeasurement`, `afterInterpret`, `afterPrediction`, `afterSemantic`, `executeSql`, `askVerification`, `complete`, and `showEnrichment` (lines 43–259); Lesson-1-local state machine. |
| `S1-CSS` | `src/stage1-prototype-runtime.css`; Lesson-1-local visual treatment, with course tokens inherited from `src/styles.css`. |
| `S1-NAV` | `src/main.js` → `createStage1Prototype` integration and Lesson 1→2 activation; shared course shell/navigation ownership. |
| `S2` | `src/stage2-prototype-runtime.js` and `.css`; accepted Lesson 2 runtime used only for scope discovery. |
| `SHARED` | `src/styles.css`, `src/main.js`, and repeated/common class contracts across Stage 1/2 runtime modules; shared implementation where specifically noted. |

## 2. Repository/runtime identity findings

1. The audited checkout was clean and on `main` at `cb4c8a23a48064562b22e409a18bd6f41fea55cb` before report creation.
2. `routecraft-work-management.md` identifies `9b8f6ffc1f22ce2d2783f49e52a48c480a0945fa` as the accepted Lessons 1–2 runtime baseline.
3. The Git blob IDs for both `src/stage1-prototype-runtime.js` and `src/stage1-prototype-runtime.css` are identical at the accepted baseline and current `main`:
   - JavaScript: `ab7f00aa0f09b8f941cc62a3b0349b8aaa11f884`
   - CSS: `8ba6ec8c2b23c80ed9e775aa748d3e512ef9e844`
4. The distinctive reviewed strings (`basis of the join`, learner-facing `Beat`, `relationship becomes ON`, `Map the condition`, `Workbench`, and `preserves the grain you predicted`) entered the current lineage in commit `20e8019613f21d02e413e911376076b6106217c5` (`Rewrite Stage 1 from advisor prototype`) and are present unchanged in both the accepted runtime baseline and current `main`.
5. A live local walkthrough of current `main` reproduced the reviewed Lesson 1 sequence and the relevant states. This establishes current implementation identity for the findings. It does not prove the deployment SHA used when the original screenshots were captured.

## 3. Finding-by-finding traceability matrix

Every review status below is preserved verbatim or, where the review used a compound explanatory status, without collapsing its distinctions.

| Finding | Review status | Current canon basis | Current implementation ownership | Current repository evidence | Verification result |
|---|---|---|---|---|---|
| 1.1 Learner identifies the required relations | `CANON — WORKS` | `PF-REL`; `L1-REL` require learner selection from available schema. | `S1-HTML`; `S1-STATE/reset`, catalog handler. | Four relations are shown; only learner selection of `news_article` + `news_source` advances. | `CONFIRMED` |
| 1.2 Wrong-relation feedback | `CANON — WORKS` | `L1-REL`; `PF-BQ`. | `S1-STATE`, catalog handler lines 235–243. | Wrong relations produce local non-revealing feedback and do not advance. | `CONFIRMED` |
| 1.3 Trial-and-error remains possible | `NOT IN CANON` | `L1-OPEN` leaves exact relation-selection UI open. | `S1-HTML`; `S1-STATE`. | Four-card catalog permits repeated attempts; canon does not prohibit this. | `CONFIRMED` |
| 1.4 Meta-teaching entry copy | `CANON — NOT WORKING` | `PF-TEACHER` says teacher voice should serve reasoning, not process logistics. | `S1-STATE/reset`. | Entry says “We will make that request precise, then check…” before the task. | `CONFIRMED` |
| 1.5 “Bench” terminology | `NOT IN CANON` | No current authority fixes this learner-facing metaphor; `L1-OPEN` leaves wording open. | `S1-HTML`; `S1-STATE`; `S1-CSS`. | `Workbench`, `Relations on the bench`, and `on bench` remain learner-facing. | `CONFIRMED` |
| 2.1 Connecting-key reasoning before PK/FK terminology | `CANON — WORKS` | `L1-REL`; `PF-JOIN`. | `S1-STATE/beginConnection`, `onColumn`. | Only article columns are actionable; PK/FK reveal follows correct `news_source_id`. | `CONFIRMED` |
| 2.2 Wrong-column behavior | `CANON — WORKS` | `L1-REL`; exact styling open in `L1-OPEN`. | `S1-STATE/onColumn`; `S1-CSS`. | Wrong fields flash locally; relationship/key state remains hidden; retry remains possible. | `CONFIRMED` |
| 2.3 Correct connecting-key reveal | `CANON — WORKS` | `L1-REL`. | `S1-STATE/onColumn`, `renderInspector`. | Correct choice reveals PK/FK badges, connector, and relationship state. | `CONFIRMED` |
| 2.4 Prompt precision | `CANON — NOT WORKING` | `PF-BQ`; `L1-REL` requires meaning-first connecting-field reasoning. | `S1-STATE/beginConnection`. | Prompt asks which column “answers: who published this article?” although the ID identifies the source. | `CONFIRMED` |
| 2.5 Premature JOIN terminology | `CANON — NOT WORKING` | `L1-GBP` and `PF-JOIN` require semantic action before JOIN naming. | `S1-STATE/onColumn`. | PK/FK Concept copy says stored identity is “the basis of the join” before semantic-action choice. | `CONFIRMED` |
| 3.1 Meaning before terminology | `CANON — WORKS` | `L1-REL`; `PF-TEACHER`. | `S1-STATE/onColumn`, `afterCardinality`. | Learner answers directional relationship; Cardinality is named afterward. | `CONFIRMED` |
| 3.2 Cardinality Concept Moment | `CANON — WORKS` | `L1-REL`; `L1-VIS`; `CV-CONCEPT`. | `S1-STATE/afterCardinality`; `S1-CSS .concept`. | `Cardinality` and `1 → M` appear after the correct response with concept styling. | `CONFIRMED` |
| 3.3 Duplicate teacher/prompt wording | `NOT IN CANON` | `PF-TEACHER` constrains teacher function but does not set exact copy; `L1-OPEN`. | `S1-STATE/onColumn`. | Teacher sentence and MCQ repeat the same relationship question. | `CONFIRMED` |
| 3.4 Evidence sufficiency for one-to-many inference | `CANON REVIEW NEEDED` | `L1-REL` requires inference from PK/FK structure and prohibits seed-example proof, but does not settle whether the displayed structure is sufficient evidence for novices. | `S1-HTML`; `S1-STATE/onColumn`; `S1-CSS`. | Runtime shows FK→PK and asks for one-to-many; no further structural evidence is supplied. | `AUTHORITY AMBIGUITY` |
| 4.1 Business request → row meaning | `CANON — WORKS` | `L1-GBP`; `PF-BQ`. | `S1-STATE/afterCardinality`. | Grain prompt explicitly returns to “every article with its source.” | `CONFIRMED` |
| 4.2 Grain terminology timing | `CANON — WORKS` | `L1-GBP`; `PF-TEACHER`. | `S1-STATE/afterCardinality`, `afterGrain`. | Learner selects “a news article”; Grain is named afterward. | `CONFIRMED` |
| 4.3 Grain definition | `CANON — WORKS` | `L1-GBP`. | `S1-STATE/afterGrain`. | Concept copy defines result Grain as what one result row represents. | `CONFIRMED` |
| 4.4 Duplicate framing | `NOT IN CANON` | `PF-TEACHER`; exact copy remains open in `L1-OPEN`. | `S1-STATE/afterCardinality`. | Teacher and prompt both ask what one returned/result row represents. | `CONFIRMED` |
| 4.5 Distractor quality | `NOT IN CANON` | Answer wording is open under `L1-OPEN`. | `S1-STATE/afterCardinality`. | `pair` targets a real misconception; `country` is visibly irrelevant. | `CONFIRMED` |
| 5.1 Prepared COUNT(*) measurement | `CANON — WORKS` | `L1-GBP`; `PF-JOIN`. | `S1-HTML #s1-measure`; `S1-STATE/runMeasurement`. | Prefilled `SELECT COUNT(*) FROM news_article`; learner runs rather than authors it. | `CONFIRMED` |
| 5.2 Missing reason for measuring now | `CANON — NOT WORKING` | `PF-GUIDED`; `L1-CONT`; `L1-GBP` require the measurement’s role in later prediction to be intelligible. | `S1-STATE/afterGrain`. | Bridge says to measure but does not connect established Grain to the need for a row-count baseline. | `CONFIRMED` |
| 5.3 “Starting point” ambiguity | `CANON — NOT WORKING` | `PF-GUIDED`; `L1-GBP`. | `S1-STATE/afterGrain`. | Runtime says “measure the starting point” without specifying the starting article-row baseline. | `CONFIRMED` |
| 5.4 Meta measurement copy | `CANON — NOT WORKING` | `PF-TEACHER`; `L1-GBP`. | `S1-STATE/afterGrain`. | “This is measurement, not SQL to learn” explains administration rather than reasoning purpose. | `CONFIRMED` |
| 5.5 Bench language in baseline transition | `NOT IN CANON` | Exact wording open in `L1-OPEN`. | `S1-STATE/afterGrain`. | “prepared line on the bench” remains present. | `CONFIRMED` |
| 5.6 Sequence itself | `CANON REVIEW NEEDED only if continuity cannot be repaired within the accepted order.` | `L1-GBP` explicitly fixes Grain → baseline → prediction; `PF-JOIN` agrees. | `S1-STATE/afterGrain` → `runMeasurement` → `afterInterpret`. | Current runtime implements the required order. Nothing in current authority authorizes reordering. | `CONFIRMED` |
| 6.1 Baseline as active surface | `CANON — NOT WORKING` | `CV-FOCUS`; `L1-VIS`. | `S1-STATE/afterGrain`; `S1-CSS .is-current-action`, `.ws.dim`. | Measurement gains an outline and schema dims, but the large schema remains a prominent adjacent surface in the live state. | `CONFIRMED` |
| 6.2 Cross-region handoff | `CANON — NOT WORKING` | `CV-FOCUS`; `CV-LOCAL`; `L1-VIS`. | `S1-STATE/afterGrain`; two-lane `S1-HTML`/`S1-CSS`. | Guidance appears in the response lane while the Run control appears across the lane boundary; only tool outline/focus carries the handoff. | `CONFIRMED` |
| 6.3 Coordinated dual focus | `NOT IN CANON` | `CV-FOCUS` defines the goal, not this exact treatment; `L1-OPEN`. | No dedicated paired-focus implementation; only current-action tool outline. | Candidate treatment is absent and remains unestablished. | `CONFIRMED` |
| 7.1 Run → evidence → interpretation | `CANON — WORKS` | `L1-GBP`; `PF-GUIDED`. | `S1-STATE/runMeasurement`, `afterInterpret`. | Run produces 18, then immediately asks what 18 represents. | `CONFIRMED` |
| 7.2 Evidence locality | `CANON — WORKS` | `CV-FOCUS`; `L1-GBP`. | `S1-HTML #s1-measure`; `S1-STATE/runMeasurement`. | Returned table remains visible beside the interpretation cycle. | `CONFIRMED` |
| 7.3 “A number only helps if we know what it counts” | `CANON — WORKS` | `PF-GUIDED`; `L1-GBP`. | `S1-STATE/runMeasurement`. | Exact reasoning-purpose bridge is present. | `CONFIRMED` |
| 7.4 Baseline interpretation MCQ | `NOT IN CANON` | `L1-GBP` requires interpretation but does not require a separate MCQ; `L1-OPEN`. | `S1-STATE/runMeasurement`. | Dedicated four-option interpretation question remains present. | `CONFIRMED` |
| 8.1 Required premises are available | `CANON — WORKS` | `L1-GBP`. | `S1-STATE` spine plus `afterInterpret`. | Runtime retains 18-row baseline, article Grain, and one-source-per-article relationship before prediction. | `CONFIRMED` |
| 8.2 Prediction is learner reasoning | `CANON — WORKS` | `L1-GBP`; `PF-JOIN`. | `S1-STATE/afterInterpret`. | Learner must select the predicted row behavior before execution. | `CONFIRMED` |
| 8.3 Distractor structure | `CANON — WORKS` | `L1-GBP`. | `S1-STATE/afterInterpret`. | Options distinguish article Grain, source collapse, and multiplication. | `CONFIRMED` |
| 8.4 Teacher/prompt duplication | `NOT IN CANON` | `PF-TEACHER`; exact wording open in `L1-OPEN`. | `S1-STATE/afterInterpret`. | Teacher sentence and prompt repeat the row-count task. | `CONFIRMED` |
| 8.5 Prediction explanation mechanism | `Current canon requires the continuous reasoning chain; exact wording is NOT IN CANON.` | `L1-GBP` requires one article → 18 starting rows → one match each → 18 result rows. | `S1-STATE/afterPrediction`, wrong feedback, later completion. | Correct-answer path moves directly to semantic action; the full unit-bearing mechanism is not locally explained. | `CONFIRMED` |
| 8.6 Post-prediction visual | `NOT IN CANON` | `CV-AID`; `L1-OPEN`; no authority requires a visual specifically here. | No post-prediction visual in `S1-STATE`. | First row-level visual occurs later in JOIN teaching. | `CONFIRMED` |
| 9.1 Meaning before JOIN terminology | `CANON — WORKS` | `L1-GBP`; `PF-JOIN`. | `S1-STATE/afterPrediction`, `afterSemantic`. | Semantic action is selected before JOIN Concept appears. | `CONFIRMED` |
| 9.2 Evidence quality | `NOT IN CANON` | `L1-GBP` requires the decision but exact option strength is open. | `S1-STATE/afterPrediction`. | Correct wording closely repeats preceding lesson language. | `CONFIRMED` |
| 9.3 Distractor quality | `NOT IN CANON` | Exact distractors open under `L1-OPEN`. | `S1-STATE/afterPrediction`. | Filter, aggregate, and stack are present and unevenly plausible. | `CONFIRMED` |
| 10.1 JOIN timing | `CANON — WORKS` | `L1-GBP`; `L1-JOIN`. | `S1-STATE/afterSemantic`. | JOIN is formally named only after semantic-action success. | `CONFIRMED` |
| 10.2 Row-level visual | `CANON — WORKS` | `L1-JOIN`; `L1-LOAD`. | `S1-HTML` Beat 1. | Article row and matching source row are shown with shared `source_id = 2`. | `CONFIRMED` |
| 10.3 Active teaching focus | `CANON — WORKS` | `CV-SQL`; `L1-VIS`; `L1-JOIN`. | `S1-STATE/afterSemantic`; `S1-CSS .teach-board`. | JOIN teaching is the outlined current tool; implementation editor remains hidden. | `CONFIRMED` |
| 10.4 “Predicted grain” | `CANON — NOT WORKING` | `L1-GBP` distinguishes established Grain from predicted row count. | `S1-STATE/afterPrediction`, `#s1-to-sql`, completion. | Runtime repeatedly calls Grain “predicted.” | `CONFIRMED` |
| 11.1 Match → SQL condition progression | `CANON — WORKS` | `L1-JOIN`; `L1-LOAD`. | `S1-HTML` Beats 1–2; beat-next handler. | Sequence advances row match → condition. | `CONFIRMED` |
| 11.2 Relationship reuse | `CANON — WORKS` | `L1-JOIN`. | `S1-HTML` Beat 2. | ON compares the same previously established FK and PK. | `CONFIRMED` |
| 11.3 “The relationship becomes ON” | `CANON — NOT WORKING` | `L1-JOIN` says ON expresses/tells SQL how rows match. | `S1-HTML` Beat 2; beat-next teacher copy. | Heading and copy say the relationship “becomes ON/a condition.” | `CONFIRMED` |
| 11.4 “Map the condition” control | `NOT IN CANON` | Exact transition-control wording is open under `L1-OPEN`; `CV-LOCAL` constrains role/locality only. | `S1-HTML` Beat 2 button. | Button only advances after the fully displayed condition. | `CONFIRMED` |
| 12.1 Business request reconnection | `CANON — WORKS` | `L1-MAP`. | `S1-HTML` Beat 3. | Final teaching beat explicitly displays the business request. | `CONFIRMED` |
| 12.2 Grain remains available | `CANON — WORKS` | `L1-JOIN`; `L1-MAP`. | `S1-HTML` Beat 3. | “result grain / one article per row” remains visible. | `CONFIRMED` |
| 12.3 Missing full-query mapping | `CANON — NOT WORKING` | `L1-MAP`; `L1-LOAD` require visible SELECT/FROM/JOIN/ON mapping before authoring. | `S1-HTML` Beat 3; `S1-STATE` beat handler. | Live Beat 3 shows only business request ↔ Grain and prose; no explicit SELECT/FROM/JOIN/ON mapping. | `CONFIRMED` |
| 12.4 SELECT wording | `NOT IN CANON` | `L1-MAP` prohibits implying SELECT alone determines Grain; exact wording open. | `S1-HTML` Beat 3. | Copy says selected columns “return every article … at one article per row.” | `CONFIRMED` |
| 12.5 Business request ↔ Grain equivalence | `NOT IN CANON` | `L1-GBP`; `L1-MAP`; exact visual form open. | `S1-HTML` Beat 3; `S1-CSS .sample-arrow`. | Double arrow visibly connects business request and result Grain. | `CONFIRMED` |
| 13.1 Progressive exposure | `CANON — WORKS` | `L1-LOAD`; `CV-AID`. | `S1-HTML` three `.teach-step`s; `S1-STATE` beat handler; `S1-CSS`. | Only one beat is active/visible at a time. | `CONFIRMED` |
| 13.2 Previous beat disappears | `NOT IN CANON / OPEN implementation decision` | `L1-LOAD` and `L1-OPEN` explicitly allow hidden, replaced, or compact retained beats. | `S1-STATE` beat handler; `S1-CSS .teach-step`. | Prior beat is replaced. This is not a conformance defect. | `CONFIRMED` |
| 13.3 Compact prior beats | `NOT IN CANON` | `L1-OPEN` leaves treatment open. | No compact prior-beat implementation. | Candidate retention is absent and remains a proposal only. | `CONFIRMED` |
| 13.4 Learner-facing “Beat” | `NOT IN CANON` | No authority requires the label; exact labels open in `L1-OPEN`. | `S1-HTML` `Beat 1/2/3`. | Design-process term is learner-facing in all three teaching states. | `CONFIRMED` |
| 14.1 Clean implementation editor | `CANON — WORKS` | `L1-SQL`. | `S1-HTML #s1-sql`; `S1-STATE/#s1-to-sql`. | Separate empty editor appears; COUNT query/result are not inherited as editor state. | `CONFIRMED` |
| 14.2 SQL becomes primary action surface | `CANON — WORKS` | `L1-SQL`; `CV-SQL`. | `S1-STATE/#s1-to-sql`; `S1-CSS`. | Editor is revealed and current only after teaching Beat 3. | `CONFIRMED` |
| 14.3 “Make the argument executable” | `CANON — WORKS` | `L1-JOIN`; `L1-MAP`. | `S1-HTML #s1-sql`. | Exact heading frames SQL as implementation of prior reasoning. | `CONFIRMED` |
| 14.4 Workbench terminology | `NOT IN CANON` | Exact wording open in `L1-OPEN`. | `S1-HTML`; `S1-STATE/#s1-to-sql`. | “The Workbench is yours now” remains present. | `CONFIRMED` |
| 14.5 “Preserves the grain you predicted” | `CANON — NOT WORKING` | `L1-GBP`. | `S1-STATE/#s1-to-sql`. | Exact incorrect established/predicted phrasing remains present. | `CONFIRMED` |
| 14.6 Inherited readiness gap | `CANON — NOT WORKING` | `L1-MAP`; `L1-LOAD`; `L1-SQL`. | `S1-HTML` Beat 3 → editor transition. | Editor follows teaching that did not provide the required full-query mapping. | `CONFIRMED` |
| 14.7 Placeholder reuse | `CANON — WORKS` | `L1-SQL`; established concepts may be reused without re-teaching. | `S1-HTML` editor placeholder. | Placeholder references SELECT/JOIN and the already established relations only. | `CONFIRMED` |
| 15.1 Assistance controls exist | `Current exact assistance behavior remains partially open.` | `CTRL-AID`; `L1-SQL`; `L1-OPEN`. | `S1-HTML #s1-sql-actions`; `S1-STATE` assistance handlers. | Nudge and Show solution are available during authoring; exact lifecycle/escalation is not fully fixed. | `CONFIRMED` |
| 15.2 First nudge strength | `NOT IN CANON / OPEN assistance design` | `CTRL-AID` and `L1-OPEN` leave escalation/detail open while preserving assistance boundaries. | `S1-STATE/#s1-assist-button`. | First nudge supplies FROM relation, JOIN relation, key comparison, and ON. | `CONFIRMED` |
| 15.3 Nudge after success | `NOT IN CANON` | `CV-SQL` requires result prominence; exact collapse behavior is open. | `S1-STATE/executeSql`; assistance node outside action container. | Live walkthrough shows opened nudge still visible after successful execution. | `CONFIRMED` |
| 15.4 Show solution after success | `NOT IN CANON` | `CTRL-AID`; post-success treatment remains open. | `S1-HTML #s1-solution-button`; hidden only in `complete`, not `executeSql`. | Show solution remains enabled during verification after semantic success. | `CONFIRMED` |
| 16.1 SQL and result stay together | `CANON — WORKS` | `L1-SQL`; `CV-SQL`. | `S1-HTML #s1-sql`; `S1-STATE/renderResults`. | Executed SQL and returned table occupy the same workspace block. | `CONFIRMED` |
| 16.2 Row count is visible | `CANON — WORKS` | `L1-VERIFY`. | `S1-STATE/renderResults`. | Result header displays `18 rows returned`. | `CONFIRMED` |
| 16.3 Actual result is inspectable | `CANON — WORKS` | `L1-VERIFY`. | `S1-STATE/renderResults`; `S1-CSS .results-scroll`. | All 18 article/source rows are rendered in a scrollable table. | `CONFIRMED` |
| 16.4 Semantic validator status | `CANON — WORKS` | `L1-VERIFY` explicitly permits task-contract validation without learner interpretation. | `S1-STATE/executeSql`. | `Verified · result satisfies the task` appears; interpretation remains a separate learner question. | `CONFIRMED` |
| 16.5 Assistance competing with result | `Current visual authority supports result evidence becoming primary; exact assistance-collapse behavior is NOT IN CANON.` | `CV-SQL`; `CV-FOCUS`; exact collapse behavior open. | `S1-STATE/executeSql`; `S1-CSS .assist`, `.results`. | Live success state retains full nudge immediately above result while result should lead. | `CONFIRMED` |
| 17.1 Execution is not completion | `CANON — WORKS` | `L1-VERIFY`. | `S1-STATE/executeSql`, `askVerification`, `complete`. | Successful execution enters `verification`; completion waits for correct learner interpretation. | `CONFIRMED` |
| 17.2 Teacher reconnects to prior prediction | `CANON — WORKS` | `L1-VERIFY`; `PF-GUIDED`. | `S1-STATE/executeSql`. | Teacher explicitly says to read result against the earlier prediction. | `CONFIRMED` |
| 17.3 “The result is evidence now, not the conclusion” | `CANON — WORKS` | `L1-VERIFY`. | `S1-STATE/executeSql`. | Exact distinction remains present. | `CONFIRMED` |
| 17.4 Closed final verification | `CANON — WORKS` | `L1-VERIFY`. | `S1-STATE/askVerification`. | Checkbox-based closed interpretation occurs after semantic validation. | `CONFIRMED` |
| 17.5 “Visible result supports” | `CANON — NOT WORKING` | `L1-VERIFY` requires integration of result, earlier prediction, and established Grain. | `S1-STATE/askVerification`. | Prompt still narrows the basis to “the visible result,” although feedback later mentions established Grain. | `CONFIRMED` |
| 17.6 Verification answer structure | `CANON — WORKS as a synthesis structure, assuming prompt framing is corrected.` | `L1-VERIFY`. | `S1-STATE/askVerification`. | Correct claims are 18 rows, one article per row, and source information at unchanged Grain. | `CONFIRMED` |
| 18.1 Completion follows learner verification | `CANON — WORKS` | `L1-VERIFY`. | `S1-STATE/askVerification`, `complete`. | Completion is invoked only after all three correct claims and no wrong claim. | `CONFIRMED` |
| 18.2 Green success treatment | `CANON — WORKS` | `CV-CONCEPT`; `L1-VIS`. | `S1-CSS .completion`; `S1-STATE/complete`. | Completion uses green success styling. | `CONFIRMED` |
| 18.3 “SQL is not the conclusion by itself” | `CANON — WORKS` | `L1-VERIFY`; `PF-GUIDED`. | `S1-STATE/complete`. | Exact reasoning-first statement remains present. | `CONFIRMED` |
| 18.4 “Predicted the row count and grain” | `CANON — NOT WORKING` | `L1-GBP`; `L1-VERIFY`. | `S1-STATE/complete`. | Completion Concept says reasoning predicted both row count and Grain. | `CONFIRMED` |
| 18.5 “CONCEPT — JOIN verified” | `CANON — NOT WORKING` | `CV-CONCEPT`; `L1-VIS` limit Concept Moments to first naming and distinguish them from success. | `S1-STATE/complete`; `S1-CSS .concept`. | `JOIN verified` is rendered with Concept Moment treatment immediately before green completion. | `CONFIRMED` |
| 18.6 Administrative transcript-style synthesis | `CANON — NOT WORKING` | `PF-TEACHER` requires logic-of-argument thread rather than administrative transcript. | `S1-STATE/complete`. | Completion enumerates relations, link, cardinality, grain, baseline, prediction, JOIN, ON, SQL, result. | `CONFIRMED` |
| 18.7 Closing result meaning | `CANON — WORKS` | `L1-VERIFY`. | `S1-STATE/complete`. | Closing states source attributes were added while one article per row remained. | `CONFIRMED` |
| 18.8 Next-lesson navigation | `CANON — WORKS / PASS` | `course-design/course-controls.md` → **Inter-Lesson navigation**. | `S1-STATE/complete`; `S1-NAV`. | Continue control activates accepted Lesson 2 after completion. | `CONFIRMED` |
| 19.1 Placement after the core lesson | `CANON — WORKS` | `L1-ENRICH`. | `S1-STATE/complete`, `showEnrichment`. | Enrichment disclosure appears only after completion. | `CONFIRMED` |
| 19.2 Schema vs instance distinction | `CANON — WORKS` | `L1-ENRICH`; schema/data ownership in `source-of-truth-hierarchy.md`. | `S1-STATE/showEnrichment`. | Exact schema-possible / instance-actual distinction is present. | `CONFIRMED` |
| 19.3 Row-to-result explanatory model | `CANON — WORKS in purpose` | `L1-JOIN`; `L1-ENRICH`; `CV-AID`. | `S1-STATE/showEnrichment`; `S1-CSS .sample.triple`. | Two source-row cards lead to a result-row card. | `CONFIRMED` |
| 19.4 Result-row visual is not legible | `CANON — NOT WORKING` | `L1-JOIN`/`L1-LOAD` require visible `title` and source-name contribution. | `S1-STATE/showEnrichment`; `S1-CSS`. | Live visual uses narrow generic `article + source_id`, `source_id + name`, and `title + source_name` cards rather than legible value contribution. | `CONFIRMED` |
| 19.5 Plus-sign semantics | `NOT IN CANON` | `CV-AID` requires semantically clear visuals; exact connector form open. | `S1-STATE/showEnrichment`. | Literal `+` sits between source-row cards. | `CONFIRMED` |
| 19.6 “ON names the relationship” | `CANON — NOT WORKING` | `L1-JOIN` defines ON as expressing the match condition. | `S1-STATE/showEnrichment`. | Copy says ON “names” the relationship. | `CONFIRMED` |
| 19.7 “JOIN is the bridge” | `NOT IN CANON` | No current authority fixes this metaphor; exact enrichment copy open. | `S1-STATE/showEnrichment`. | Exact metaphor remains present. | `CONFIRMED` |
| 19.8 “What the result preserves: one row per article” | `CANON — NOT WORKING / generalization risk` | `PF-BQ`; `L1-GBP`; Lesson 1-specific behavior must not imply a general JOIN property. | `S1-STATE/showEnrichment`. | Statement is unqualified by “in this query.” | `CONFIRMED` |
| 19.9 Venn limitation | `CANON — WORKS` | `L1-ENRICH`. | `S1-STATE/showEnrichment`. | Copy limits Venn to inclusion/exclusion and rejects it as explanation for Grain/multiplication. | `CONFIRMED` |

## 4. Runtime/source mismatch investigation

### Current `main`

All specifically flagged reviewed strings exist in current `main` in `src/stage1-prototype-runtime.js`:

| Reviewed wording/pattern | Current source location |
|---|---|
| PK/FK: “That stored identity is the basis of the join.” | `onColumn`, line 139 |
| Learner-facing `Beat 1/2/3` labels | module `html`, lines 32–34 |
| “The relationship becomes ON” | module `html`, line 33 |
| “Map the condition” | module `html`, line 33 |
| `bench` / `Workbench` | module `html`, lines 22, 28–29; state copy lines 153, 183, 248; status line 241 |
| “preserves the grain you predicted” | `#s1-to-sql` handler, line 248 |
| “predicted the row count and grain” | `complete`, line 223 |
| “ON … names it” | `showEnrichment`, line 232 |

### Accepted runtime baseline

The accepted runtime baseline `9b8f6ffc1f22ce2d2783f49e52a48c480a0945fa` has the same Stage 1 JavaScript and CSS blob IDs as current `main`. Therefore all strings and behaviors above also exist in that accepted baseline.

### Repository history and branches

Git pickaxe history traces the flagged strings to `20e8019613f21d02e413e911376076b6106217c5` (`Rewrite Stage 1 from advisor prototype`, 2026-09-17). That commit is an ancestor of both the accepted runtime baseline and current `main`. The available local and remote refs do not provide a competing later Stage 1 implementation containing a different version of these strings.

### Determination

The reviewed runtime content corresponds to source represented by both:

- the accepted Lessons 1–2 runtime baseline; and
- current `main`.

The earlier review note that these strings did not match inspected accepted/current source is not reproduced by the repository now available. The likely repository-evidence explanation is that the comparison during review used another checkout, pre-`20e8019` source state, or otherwise non-current source material. This is an inference; Git does not record which checkout was inspected during the review.

The exact deployed SHA used to capture the screenshots cannot be proven from repository contents or screenshots alone. No deployment manifest, build identifier, or screenshot-linked SHA is present. However, because the accepted-baseline and current-main Stage 1 blobs are byte-identical and a live current-main walkthrough reproduces the reviewed strings and states, this identity limitation does not block tracing the findings to current implementation ownership.

## 5. Cross-cutting scope observations

These are occurrence observations only, not course-wide decisions.

| Candidate | Observed scope labels | Repository observation |
|---|---|---|
| 20.1 Established vs predicted vs verified terminology | `L1 ONLY OBSERVED`; `NO BROADER OCCURRENCE FOUND` | L1 conflates predicted Grain at `src/stage1-prototype-runtime.js` lines 176, 223, 248. Accepted L2 and current L3 authority/spec use Grain and prediction without the same conflation. |
| 20.2 Learner-facing workspace metaphors | `L1 + L2 OBSERVED`; `SHARED IMPLEMENTATION`; `L3 AUTHORITY/SPEC ALSO AFFECTED` | L1 and L2 use learner-facing `bench`/`Workbench`; both use parallel workbench class/structure. The L3 visual reference also uses `Workbench`, `Relations on the bench`, `on bench`, and “onto the bench,” although current L3 prose authority/spec does not establish that wording as a pedagogical rule. |
| 20.3 Teacher vs prompt duplication | `L1 + L2 OBSERVED`; `L3 AUTHORITY/SPEC ALSO AFFECTED` | Repetition appears repeatedly in L1 and in some accepted L2 teacher/prompt pairs. The L3 visual reference contains teacher bridges followed by closely related prompts; current L3 spec separately defines teacher-led and learner-response roles. Degree and defect status remain encounter-specific. |
| 20.4 Attention choreography | `L1 + L2 OBSERVED`; `SHARED IMPLEMENTATION`; `L3 AUTHORITY/SPEC ALSO AFFECTED` | L1/L2 share two-lane layouts, `.is-current-action`, dimmed schema references, and tool/evidence handoffs. Current L3 spec explicitly requires completed reasoning to remain reviewable but quieter and its visual reference reuses the same current-action pattern. |
| 20.5 Concept vs correctness/success roles | `L1 ONLY OBSERVED`; `SHARED IMPLEMENTATION`; `L3 AUTHORITY/SPEC ALSO AFFECTED` | The specific `JOIN verified` Concept misuse occurs in L1. L1/L2 share concept and green-success styling contracts. L3 spec explicitly says reused PK/FK, Cardinality, Grain, and INNER JOIN should not be first-exposure Concept Moments, so the distinction is relevant to L3 authority/spec even though the same misuse is not present there. |
| 20.6 Assistance lifecycle | `L1 + L2 OBSERVED`; `SHARED IMPLEMENTATION`; `L3 AUTHORITY/SPEC ALSO AFFECTED`; `SCOPE UNRESOLVED` | L1 and L2 expose nudge/solution controls and retain their action regions through semantic-success verification. The L3 spec and visual reference include Show solution under `course-controls.md` but not a nudge. Escalation and post-success behavior remain partly OPEN. |
| 20.7 Completed/reviewable reasoning | `L1 + L2 OBSERVED`; `SHARED IMPLEMENTATION`; `L3 AUTHORITY/SPEC ALSO AFFECTED` | L1/L2 use persistent reasoning threads and current-action styling. L3 implementation spec explicitly requires completed reasoning to remain visible/reviewable but quieter without displacing the current tool. |
| 20.8 Learner-facing instructional-design jargon | `L1 ONLY OBSERVED`; `NO BROADER OCCURRENCE FOUND` | Learner-facing `Beat 1/2/3` occurs in L1. No equivalent learner-facing Beat label was found in accepted L2 or current L3 authority/spec/visual reference. |

## 6. Items blocked or not verifiable

### Exact screenshot/deployment SHA

The exact deployed revision used for the original test-drive screenshots is **not verifiable from current repository evidence** because no deployed-build identifier accompanies the screenshots or review. The strongest available evidence is content identity: the reviewed strings and states match byte-identical Stage 1 sources in the accepted baseline and current `main`.

This does not block current-code ownership tracing or finding verification. It would block a stronger historical claim that the screenshot build was definitely produced from one exact commit.

### Cardinality evidence sufficiency (Finding 3.4)

Current authority requires reasoning from PK/FK structure and disallows substituting observed seed examples, but it does not settle whether the currently displayed evidence is pedagogically sufficient for the intended inference. This remains `AUTHORITY AMBIGUITY`; the audit does not resolve it.

### Preserved review corrections

- The semantic-validator status remains allowed and is not treated as a defect by itself.
- Replacement of earlier JOIN teaching beats is not treated as a conformance failure.
- Grain → baseline → prediction remains the required sequence; the audit does not authorize reordering.
- Screenshot crop/viewport overlap was not used as evidence of runtime duplication.

## 7. Count summary

The count covers all 97 numbered findings in review Sections 1–19.

| Verification result | Count |
|---|---:|
| Total findings checked | 97 |
| `CONFIRMED` | 96 |
| `CONFIRMED — IMPLEMENTATION DIFFERS FROM REVIEWED RUNTIME` | 0 |
| `STALE — CURRENT REPOSITORY HAS ALREADY CHANGED` | 0 |
| `AUTHORITY AMBIGUITY` | 1 |
| `NOT VERIFIABLE FROM CURRENT REPOSITORY` | 0 |
| `RUNTIME TRACEABILITY BLOCKED` | 0 |

The exact historical deployment SHA limitation is recorded separately because it is a repository/runtime identity limitation, not one of the 97 numbered review findings.

## 8. Audit conclusion

**YES — TRACEABILITY SUFFICIENT**

The Lesson 1 review is sufficiently traced and verified to proceed to change-set classification. Every numbered finding is mapped to current authority and current implementation ownership; the reviewed runtime behavior is reproduced by current `main`; the accepted runtime baseline and current `main` use identical Stage 1 runtime blobs; the one unresolved authority question remains explicitly classified rather than silently resolved; and cross-cutting occurrences are reported without promotion to course-wide rules.

This conclusion authorizes no implementation. Change-set classification, acceptance/rejection of `NOT IN CANON` proposals, priority, copy/UI design, tests, and canon modification remain later tasks.
