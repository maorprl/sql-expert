# Lesson 1 Authority Remediation Plan — 2026-09-19

**Status:** IMPLEMENTATION PLAN — NOT IMPLEMENTATION AUTHORITY — NOT PRODUCT-BASELINE ACCEPTANCE

**Repository:** `maorprl/sql-expert`

**Planning baseline:** `0362074ac3ed679a76745d6602f2ec69ff4c440b`

**Runtime lineage inspected:** `c95ff0aacbfd533d741d486fcb86bc790f7e1437`

This record maps current Lesson 1 authority onto the current Lesson 1 runtime. It does not modify runtime, CSS, tests, authority, work-management, Lessons 2–3, schema/data, or accepted product-baseline state.

Current authority is normative. Runtime is implementation evidence only. The runtime files and validator at the planning baseline are byte-unchanged from the named runtime lineage.

## 1. Current-runtime diagnosis

### Required changes

| Runtime behavior | Current surface | Authority conflict | Required disposition |
|---|---|---|---|
| The masthead says `Media coverage — one article, one publisher` from initial load. | Static `.mh-title` in `src/stage1-prototype-runtime.js`. | A persistent learner-visible surface states the protected first-direction conclusion before learner commitment. | **CHANGE.** Replace with concise media-coverage wording that does not encode multiplicity. The exact final phrase is implementation copy within this constraint, not a new design decision. |
| Connecting-field guidance says the field “identifies the source that published it”; wrong-column feedback refers to a singular pointer/outlet. | `beginConnection()` and `onColumn()` error paths. | Current authority requires pre-deduction framing to describe locating related source information without stating first-direction multiplicity. | **CHANGE.** Use the authority’s meaning-safe formulation: the field is used to locate related publishing-source information. Preserve the same field-selection task and local retry. |
| The PK/FK Concept Moment says the FK “stores one value” and references the source PK. | `onColumn()` success path. | It effectively supplies the exactly-one conclusion immediately before asking the learner to infer it. It also fails to separate the two logical premises. | **CHANGE.** Present PK uniqueness as the at-most-one premise and `NOT NULL` plus satisfied FK as the at-least-one premise, without combining them for the learner. |
| First-direction wrong-answer feedback states the conclusion or an equivalent shortcut. | First `ask()` created by `onColumn()`. | Corrective feedback may direct attention to a premise but may not state exactly one before another attempt. | **CHANGE.** Make each error point to the missing premise: PK uniqueness for the many-response path; required satisfied reference/existence for the none-response path. Do not state the combined answer. |
| The first-direction interaction is labeled by the validator as two-direction reasoning, but the validator does not prove both exact premises or the all-surface leakage boundary. | `scripts/validate-stage1-remediation.mjs`. | Current validation would pass the known leaking PK/FK copy and explicitly requires a now-obsolete connecting prompt. | **CHANGE.** Replace the obsolete assertion and add assertions for the two premises, protected sequencing, prohibited pre-commitment wording, bounded reverse example, and post-commitment-only aggregate language. |
| The reasoning thread records correct concepts but often reads as a topic ledger (`Link`, `Cardinality`, `Grain`, `Baseline`, `Prediction`) rather than one baseline-relative match-contribution argument. | Calls to `spine()` across `beginConnection()`, `onColumn()`, `afterArticleDirection()`, `afterCardinality()`, `afterGrain()`, `startPrediction()`, `afterPrediction()`, and `complete()`. | Current authority makes the causal argument the organizer and the concepts supporting parts. | **CHANGE.** Retain the same evidence states but phrase durable thread entries as ordered facts in the argument: requested article rows, relationship field, one match contributed per article, reverse potential-many contrast, article Grain, 18-row baseline, 18-row prediction, and verified result. |
| Several transition sentences still foreground topic progression more than the shared mechanism. | `afterCardinality()`, `startPrediction()`, `afterSemantic()`, teaching-transition handler, SQL handoff, and completion copy. | The learner should experience one problem being solved, not parallel PK/FK, Cardinality, Grain, JOIN, and SQL mini-lessons. | **CHANGE, bounded to continuity/emphasis.** Reconnect existing states to the match-contribution chain without removing states, adding assessment, or compressing TBD copy pairs. |

### Preservation areas

The current runtime already conforms in the following areas and should not be redesigned:

- learner relation identification, `Added` state, and local wrong-relation recovery;
- connecting-field selection and delayed PK/FK badge/connector reveal;
- a constrained first-direction question followed by a separate reverse-direction question;
- Cardinality terminology and `1 → M` notation only after both directions;
- the current Grain question and its plausible source-group and article/source-pair distractors;
- `Grain → baseline → prediction`;
- learner-run prepared `SELECT COUNT(*) FROM news_article` measurement;
- inline interpretation as `18 article rows` with no separate baseline MCQ;
- prediction ownership and current relational distractors, including `4 rows — one result row for each source` as a distractor rather than a disclosed reverse calculation;
- post-commitment `1 article row → 1 matching source row → 1 result row` visual and unit-bearing scale-up to 18 matching pairs/result rows;
- semantic-action choice before JOIN naming;
- three-layer JOIN teaching, direct ON meaning, full `FROM / JOIN / ON / SELECT` mapping, and reviewable prior explanations;
- clean SQL workspace, assistance behavior, semantic result validation, 18 inspectable rows, and the validator/learner-interpretation boundary;
- final reasoning verification and reasoning-first completion; and
- optional post-completion enrichment.

### Explicitly deferred areas

Do not resolve or alter findings `3.3`, `4.4`, `8.4`, `15.1`, `15.2`, `15.3`, `15.4`, or `16.5`. In particular, do not use continuity editing to compress the existing teacher/question pairs tracked by `3.3`, `4.4`, or `8.4`, and do not change assistance availability, strength, escalation, or post-success lifecycle.

Do not reopen KEEP findings `1.3`, `9.2`, or `9.3`: do not add relation-selection friction, strengthen the semantic-action gate, or redesign its distractors.

## 2. State-by-state mapping

Only affected or directly exposed states are detailed below.

| State / surface | Current behavior | Authority conflict | Required runtime change | Preserve | Expected learner-facing result |
|---|---|---|---|---|---|
| Persistent masthead | Announces `one article, one publisher` throughout the Lesson. | Leaks the protected first-direction conclusion before any learner action. | Replace only `.mh-title` text with neutral media-coverage/request wording. Keep course, Lesson, navigation, and restart controls. | Masthead structure and controls. | The persistent title orients the business context without resolving multiplicity. |
| `request` / `relations` | Business request asks for every article with source name; learner selects two relations; spine records the request. | The business request itself is allowed, but the thread should begin the causal argument rather than an administrative topic list. | Preserve the request and interaction. If thread wording changes, keep it as the requested article-row information need, without multiplicity. | Relation selection, trial-and-error allowance, local feedback, selected-state wording. | The learner starts with article information plus related source information, not with an answer about match count. |
| `connection` | `beginConnection()` asks for the column that identifies “the source”; wrong paths use singular publisher/outlet language. | Wording can imply the protected exact direction before the deduction. | Use “locate related publishing-source information” framing in prompt and wrong feedback. | Direct Working Schema field selection; no PK/FK before success; local retry. | The learner identifies `news_article.news_source_id` as the relationship field without being told how many rows match. |
| `cardinality` entry after correct field | PK/FK badges and connector appear. Concept copy says a required FK stores one value referencing a PK, then asks how many sources one article identifies. | Concept copy supplies the conclusion and does not expose the exact at-most/at-least logic independently. | Keep the same state and Concept Moment, but present two non-conclusive facts: PK uniqueness limits the value to at most one source row; a non-null satisfied FK requires an existing source row. Ask the learner to combine them. Do not show Cardinality notation. | Correct field consequence, key badges, connector, constrained question, meaning before Cardinality terminology. | The learner has sufficient structural evidence and must infer exactly one. |
| First-direction error | Wrong feedback says the article stores one required ID and identifies one source, or that the required ID identifies a source row. | It gives the answer before retry. | Many-path feedback points to PK uniqueness/at-most-one. None-path feedback points to `NOT NULL` plus satisfied reference/at-least-one. Neither states the combined answer. | Retry in the same closed interaction; no open rationale. | Error support directs attention without doing the deduction. |
| First-direction success | `afterArticleDirection()` records `one article → one source` and advances to reverse reasoning. | Timing is valid; thread entry needs to function as a match-contribution premise. | Preserve success timing and conclusion. Phrase the durable entry as one article contributing one source match. | Separate learner commitment before success explanation. | The conclusion becomes available only after commitment and becomes a premise for prediction. |
| `cardinality-source-direction` | Learner reasons from non-`UNIQUE` FK plus domain meaning that one source may have many article rows. | No current conflict. The accepted bounded concrete contrast is absent. | Preserve the interaction. After correct commitment, add `Venture Daily → 6 articles` within the existing success/Concept Moment as the bounded instance illustration; do not add a screen or use it as structural proof. | Existing question, options, error behavior, second-direction ownership, no seed-only proof. | The learner sees why contribution is directional: one source can have multiple article matches, while the protected article direction remains one match. |
| Cardinality reveal / inspector | `1 → M`, Cardinality Concept Moment, and inspector relationship summary appear only after both directions. | No reveal-order conflict. The Concept Moment can more explicitly connect the two directions to contribution without becoming a prediction. | Keep timing and UI. Add at most one concise continuity sentence if needed: direction determines possible matches; `1:M` alone does not predict article-baseline expansion. | Connector geometry, labels, inspector availability, Grain entry. | Cardinality summarizes established directional meanings instead of becoming a separate destination. |
| `grain` → `baseline` | Grain is established, prepared measurement runs, and 18 is interpreted as article rows. | Structurally conforming; continuity can better identify Grain as requested row meaning and baseline as the comparison rows. | Preserve state order and interactions. Adjust only thread/transition wording needed to carry `requested article row → article baseline`. Do not equate Grain with `news_article` or `FROM`. | Grain question/distractors, Concept Moment, active measurement focus, COUNT behavior, no MCQ. | The learner understands why 18 starting article rows are being measured for the later row-effect prediction. |
| `prediction` | Teacher states exactly one after the first-direction commitment; learner predicts 18; post-success mechanism shows one match contribution and scales to 18. | Reveal timing is valid. Pre-answer wording can foreground match contribution rather than restating another concept. | Preserve prompt, options, and post-commitment visual. Rephrase teacher/thread continuity to apply `one matching pair per article × 18 baseline articles`, without moving the result explanation before commitment. | Prediction ownership and distractors; mechanism hidden until success. | The learner applies the causal mechanism rather than recalling a disconnected Cardinality fact. |
| `semantic` / JOIN reveal | Learner selects combine, JOIN is named, and teaching begins. | Largely conforming. JOIN Concept copy is generic relative to the newly central argument. | Preserve the gate and options. Make JOIN naming explicitly attach to the already-chosen matching-pair operation; do not add a gate. | Meaning before terminology; current semantic-action evidence and distractors. | JOIN is the SQL operation for the matching logic the learner already used to predict row effect. |
| `join-teaching` / SQL handoff | Row match, ON, full clause mapping, retained explanations, and clean workspace are already implemented. | No structural conflict. A few teacher transitions can echo the match-contribution thread more clearly. | Preserve HTML/state architecture and clause mapping. Update only continuity copy needed to connect row example, ON, full query, and predicted row effect. | Progressive reveal, reviewability, direct ON semantics, full mapping, authoring timing. | The SQL is experienced as expressing the same argument, not as a new syntax topic. |
| `sql` / `verification` | Semantic validator checks exact 18 associations; results remain inspectable; learner compares them with prediction and Grain. | Already conforms. Thread wording should keep the baseline-relative prediction explicit. | Preserve execution and validation logic. Only adjust teacher/thread language if needed to name matching contributions consistently. | SQL assistance lifecycle, diagnostics, result table, separate learner interpretation. | Execution produces evidence and the learner verifies the same prediction made earlier. |
| `complete` / enrichment | Completion reconstructs the reasoning; enrichment is optional and post-completion. | Already substantially centered. It can use the exact `one article → one match contribution → 18 → verified 18` vocabulary consistently. | Preserve structure and optional placement. Make only bounded synthesis wording changes; do not introduce the reverse aggregate unless intentionally added as optional later material. This plan does not require adding it. | Completion gate, Lesson 2 navigation, enrichment row-construction and ON semantics. | The Lesson closes the single causal argument and does not broaden into fan-out or reverse-order SQL. |

## 3. Bounded change sets

### AR-1 — Evidence-safe directional Cardinality

**Authority requirement**

- No learner-visible surface may disclose `one article → exactly one source` before first-direction commitment.
- PK uniqueness supplies at most one matching source row.
- `NOT NULL` plus a satisfied FK supplies at least one matching source row.
- The learner combines the premises in a constrained first-exposure deduction.
- Reverse reasoning remains learner-owned; `Venture Daily → 6 articles` may illustrate it after success.

**Affected runtime surfaces**

- static `.mh-title` in `html`;
- `beginConnection()`;
- `onColumn()` success and wrong-selection feedback;
- first-direction `ask()` prompt/error copy;
- `afterArticleDirection()`;
- `afterCardinality()`;
- `renderInspector()` only to confirm its relationship summary remains post-both-directions;
- `#s1-ws`, `#s1-link`, `.badge`, `.concept`, `.ask`, and `#s1-spine` as existing presentation/state surfaces;
- first-direction and ordering assertions in `scripts/validate-stage1-remediation.mjs`.

**Before**

The masthead and PK/FK explanation state or effectively state the answer, and wrong-answer feedback completes the inference for the learner.

**After**

The learner sees two premises without their combination, selects exactly one in the existing closed interaction, receives premise-directed corrective feedback on error, and sees the conclusion only after success. The reverse question follows unchanged in structure, and its success may include the bounded `Venture Daily → 6 articles` illustration.

**Preservation constraints**

- no new open-text response;
- no new screen or interaction architecture;
- no Cardinality term/notation before both directions;
- no seed example as the sole structural proof;
- no complete `4 source rows → 18 matching pairs/result rows` before prediction;
- no change to relation selection, connecting-field selection, Working Schema geometry, or inspector mechanics.

**Validation**

- static audit of every leakage surface in Section 4;
- scripted wrong and correct first-direction paths;
- ordering assertion: correct field → premise reveal → first-direction commitment → reverse-direction commitment → Cardinality term/notation;
- DOM/visibility check that hidden later text is not exposed accessibly before its state;
- reverse-success check for the bounded illustration and absence of an aggregate reverse total.

### AR-2 — One continuous match-contribution argument

**Authority requirement**

The learner journey must continuously express:

```text
one requested article row
→ one source match contributed per article
→ 18 starting article rows
→ predict 18 matching pairs/result rows
→ JOIN expresses and executes the matching logic
→ verify 18 article-grain rows
```

PK/FK, Cardinality, Grain, baseline, prediction, JOIN, ON, SELECT, and verification support this argument rather than appearing as parallel topics. The match-contribution model remains scoped to the current INNER JOIN step.

**Affected runtime surfaces**

- `spine()` calls from `reset()` through `complete()`;
- teacher transitions in `afterCardinality()`, `afterGrain()`, `startPrediction()`, `afterPrediction()`, and `afterSemantic()`;
- static content in `#s1-prediction-mechanism` only if terminology alignment is needed;
- teaching transition handler for `.teach-next`;
- `#s1-to-sql` handoff;
- execution-to-verification teacher copy and completion synthesis;
- existing `.spine`, `.turn.teacher`, `.teach-step`, `.match-mechanism`, `.verification-summary`, and `.completion` styles only for regression inspection; no CSS change is planned.

**Before**

The necessary states and most mechanism copy already exist, but the persistent thread and some transitions enumerate concepts more strongly than they reconstruct the causal argument.

**After**

The same states remain. Durable thread entries become ordered learner-established facts, and each transition names why the next existing action advances the row-effect prediction or its verification. No new teaching card, screen, question, or clause-mapping layer is introduced.

**Preservation constraints**

- keep `Grain → baseline → prediction` exactly;
- do not compress the teacher/question pairs governed by TBD findings `3.3`, `4.4`, or `8.4`;
- do not move the prediction visual before commitment;
- do not alter semantic-action choices or evidence strength;
- do not alter JOIN teaching structure, SQL semantics, validator behavior, assistance, result inspection, or completion gate;
- do not imply that Grain equals the baseline, `news_article`, or `FROM`;
- do not generalize the formula beyond this JOIN step.

**Validation**

- full correct-path transcript review of teacher, learner, Concept Moment, and spine content;
- state-order assertion from Grain through verification;
- terminology check distinguishing established Grain, measured baseline, predicted row count, and verified result;
- browser review at desktop and narrow layouts to ensure longer premise/continuity copy fits existing surfaces without creating competing focus;
- regression of the existing remediation validator and preserved runtime behavior.

### AR-3 — Validation contract update

**Authority requirement**

Validation must detect the new evidence boundary and causal center rather than preserve obsolete leaking copy.

**Affected validation surface**

- `scripts/validate-stage1-remediation.mjs`;
- existing `validate:lesson1-remediation` package script, preserved under the same name;
- browser walkthrough/checklist for stateful and visibility claims that static string assertions cannot prove.

**Before**

The validator passes at the planning baseline but requires `identifies the source that published it` and does not assert the at-most-one/at-least-one contract or the masthead prohibition.

**After**

The validator rejects the known masthead and obsolete pre-deduction conclusion wording, requires both logical premises, asserts reveal ordering, preserves all existing remediation assertions that remain valid, and checks that `Venture Daily → 6 articles`—if included—is downstream of reverse commitment and that no aggregate reverse `4 → 18` disclosure exists before prediction. Stateful visibility and wrong-path behavior remain browser-validation responsibilities rather than being overstated as static coverage.

**Preservation constraints**

- do not weaken existing assertions for Grain, measurement, prediction visual, semantic action, JOIN teaching, SQL workspace, verification, completion, or enrichment;
- do not introduce a new package/test framework solely for this bounded change;
- do not claim static string checks prove runtime visibility or learner evidence.

**Validation**

- `npm run validate:lesson1-remediation`;
- `npm run build`;
- targeted browser walkthrough described in Section 7.

## 4. Leakage audit

Every surface below must be inspected in the implementation diff and in a fresh runtime walkthrough.

| Learner-visible surface | Current finding | Planned treatment |
|---|---|---|
| Masthead `.mh-title` | **Leak:** `one article, one publisher`. | Replace under AR-1. |
| Masthead `.mh-stage` | `request → verified JOIN`; no multiplicity. | Preserve. |
| Initial business request in `reset()` | Requests every article with its publishing-source name; it does not state match-row multiplicity. | Preserve as authorized business context. |
| Initial spine entry | `every article + its publisher`; not an exact match-count claim, but topic-like. | Rephrase only as part of AR-2 continuity, without multiplicity. |
| Catalog descriptions and relation inspector descriptions before key reveal | Name article/source information but not exact matches. | Preserve. |
| `beginConnection()` teacher prompt | **Risk/leak:** singular “identifies the source”. | Replace with “used to locate related publishing-source information.” |
| Wrong relation/column feedback | Singular pointer/outlet language can prefigure the answer. | Keep local retry; use non-multiplicity lookup wording. |
| Correct field success feedback | Names only the chosen field. | Preserve. |
| PK/FK Concept Moment | **Leak:** required FK “stores one value” referencing a PK. | Replace with separate at-most-one and at-least-one premises, without conclusion. |
| PK/FK badges and connector | Structural evidence, not an answer by themselves. | Preserve timing; verify Cardinality markers remain hidden. |
| First-direction teacher prompt | Refers to required FK and business meaning without spelling out the combination. | Align with explicit premise presentation; preserve closed deduction. |
| First-direction answer options | Include `Exactly one` as one candidate response. | Preserve; presenting alternatives does not mark the answer. |
| First-direction wrong feedback | **Leak:** states one required value identifies one source. | Replace with premise-directed feedback. |
| Persistent thread before first commitment | Currently contains request, relations, and link only; masthead remains the main leak. | Verify revised thread contains no exactly-one equivalent. |
| Working Schema relationship labels | PK/FK badges appear after field reasoning; `M/1` markers remain hidden until both directions. | Preserve and verify state classes. |
| Relation inspector | Key labels may appear after field reasoning; relationship sentence appears only after both directions. | Preserve timing; verify no earlier relationship summary is rendered. |
| Cardinality Concept Moment and inspector relationship summary | Appear after both directional commitments. | May state the established conclusion; preserve timing. |
| Baseline/prediction teacher copy | States exactly one only after the protected first-direction commitment. | Allowed; re-center on match contribution under AR-2. |
| Hidden prediction mechanism and later JOIN teaching | Contain one-match text but are `hidden` until after prediction/semantic action. | Preserve; verify actual and accessible visibility at each transition. |
| SQL nudge, results, completion, enrichment | Occur well after commitment. | Preserve behavior; audit only for consistency and scope. |

The current runtime contains no `4 source rows → 18 matching pairs/result rows` comparison. Nothing needs to be moved or removed on that point. The current prediction distractor mentioning four result rows is not the prohibited reverse aggregate and remains preserved. This plan does not add the aggregate comparison.

## 5. Causal-thread plan

No new learner state is required. The existing states can carry the accepted argument by changing their connective function:

| Existing moment | Causal contribution after remediation |
|---|---|
| Relation selection | Establish article rows as requested information and source name as related information. |
| Connecting-field selection | Establish the field used to locate related source information. |
| First-direction deduction | Establish one source match contributed by one article row. |
| Reverse-direction deduction | Show that contribution is directional: a source can have multiple article matches. The bounded Venture Daily instance confirms the already-reasoned direction without revealing 18. |
| Grain | Establish that each requested result row still represents one article. |
| Baseline measurement | Establish 18 starting article rows as the chosen comparison baseline. |
| Prediction | Apply one matching pair per article to 18 baseline articles and commit to 18 result rows. |
| Post-prediction visual | Explain the committed mechanism with units: one article → one matching source row → one result row; scale to 18 matching pairs/result rows. |
| Semantic action and JOIN | Attach JOIN to the already-chosen action of combining the matching row pairs. |
| ON and full query mapping | Express the same relationship and matching logic in SQL while keeping Grain and predicted row effect available. |
| Execution and result inspection | Produce the 18 article/source associations as evidence. |
| Verification and completion | Compare actual 18 rows with the prediction and established article Grain, closing the same argument. |

Prominence changes are textual and continuity-oriented, not architectural. The active existing task remains visually primary; the reasoning thread becomes a compact record of causal facts; Concept Moments retain their role but no longer read as independent lesson destinations. Existing CSS is sufficient unless implementation reveals a concrete overflow or focus regression from the revised premise copy.

## 6. Preserve matrix

### Accepted behavior accounting

| Behavior / decision | Classification | Implementation-plan treatment |
|---|---|---|
| Relation identification | `PRESERVE` | Keep learner selection and live-schema basis. |
| Wrong relation recovery | `PRESERVE` | Keep local, non-revealing retry. |
| Trial-and-error possibility (`1.3`) | `PRESERVE — KEEP` | Add no artificial friction. |
| Connecting-field selection | `PRESERVE` | Keep direct Working Schema column action; change only non-leaking wording. |
| Delayed PK/FK reveal | `PRESERVE` | Keep after correct connecting-field selection. |
| Protected first-direction inference | `CHANGE` | Remove leakage and implement exact supported deduction. |
| Second Cardinality direction | `PRESERVE` | Keep explicit learner reasoning; add only bounded post-success illustration. |
| Cardinality term/notation timing | `PRESERVE` | Keep after both directions. |
| Grain question and plausible distractors | `PRESERVE` | No choice redesign. |
| `Grain → baseline → prediction` | `PRESERVE` | No reorder. |
| Prepared baseline measurement | `PRESERVE` | Keep learner-run, non-authored COUNT. |
| Explicit `18 article rows` | `PRESERVE` | Keep inline interpretation and evidence display. |
| No baseline-interpretation MCQ | `PRESERVE` | Do not restore it. |
| Prediction interaction and distractors | `PRESERVE` | Re-center premises; do not change evidence structure. |
| Post-commitment one-match visual | `PRESERVE` | Keep hidden until success and retain units. |
| Scale-up to 18 matching pairs/result rows | `PRESERVE` | Keep post-commitment. |
| Reverse aggregate `4 → 18` | `DEFER / OPTIONAL LATER` | Do not add in this implementation. |
| Semantic action before JOIN | `PRESERVE — KEEP 9.2/9.3` | Keep current gate and distractors unchanged. |
| JOIN teaching progression | `PRESERVE` | Keep three layers, current order, and no inserted assessment. |
| Direct ON semantics | `PRESERVE` | Keep ON as the row-match condition. |
| `FROM / JOIN / ON / SELECT` mapping | `PRESERVE` | Keep complete mapping before authoring. |
| Previous explanations reviewable | `PRESERVE` | Keep completed details behavior. |
| SQL workspace and execution | `PRESERVE` | Keep editor, semantic checks, and current SQL contract. |
| Assistance lifecycle | `DEFER / DO NOT TOUCH` | Preserve nudge/solution availability and behavior exactly. |
| Inspectable results and validator boundary | `PRESERVE` | Keep visible row count, all rows, and separate learner interpretation. |
| Reasoning-based verification | `PRESERVE` | Keep three-claim verification and completion gate. |
| Optional enrichment | `PRESERVE` | Keep post-completion and non-required. |
| Central causal thread | `CHANGE` | Rephrase persistent thread and transitions; add no screens. |
| Match-contribution scope | `CHANGE` | Ensure wording remains specific to this INNER JOIN step. |

### Deferred finding accounting

| Finding | Classification | Boundary in this plan |
|---|---|---|
| `3.3` | `DEFER / DO NOT TOUCH` | Do not separately compress Cardinality teacher/prompt duplication. |
| `4.4` | `DEFER / DO NOT TOUCH` | Do not separately compress Grain teacher/prompt duplication. |
| `8.4` | `DEFER / DO NOT TOUCH` | Do not separately compress prediction teacher/prompt duplication. |
| `15.1` | `DEFER / DO NOT TOUCH` | Do not alter assistance-control existence or exact behavior. |
| `15.2` | `DEFER / DO NOT TOUCH` | Do not alter first-nudge strength or create escalation. |
| `15.3` | `DEFER / DO NOT TOUCH` | Do not alter nudge behavior after SQL success. |
| `15.4` | `DEFER / DO NOT TOUCH` | Do not alter solution behavior after SQL success. |
| `16.5` | `DEFER / DO NOT TOUCH` | Do not invent assistance collapse/hide/disable behavior to improve result focus. |

## 7. Validation plan

### Evidence that may remain standing

At the planning baseline, `npm run validate:lesson1-remediation` passes, and the runtime/CSS/validator are unchanged from `c95ff0a`. Existing evidence may remain standing for untouched behavior: relation selection, Grain choices, prepared measurement, no baseline MCQ, post-prediction mechanism structure, semantic-action choices, JOIN teaching layers, clause mapping, SQL semantic-result contract, result rendering, completion gate, and enrichment semantics.

Standing evidence is not sufficient for any surface whose copy, ordering assertion, visibility, thread entry, or transition is changed. Those exposed paths must be re-tested.

### Static and build checks

1. Update and run `npm run validate:lesson1-remediation`.
2. Run `npm run build`.
3. Assert absence of the current masthead and prohibited pre-commitment exactly-one equivalents.
4. Assert presence of both independent premises and their order before first-direction commitment.
5. Assert first-direction success precedes any conclusion text in thread/feedback, and both directional successes precede Cardinality terminology/notation.
6. Assert no learner-facing aggregate `4 source rows → 18 matching pairs/result rows` is introduced before prediction; this plan expects it to remain absent entirely.
7. Retain every still-valid assertion in the existing remediation validator.

### Targeted runtime walkthrough

Exercise from a fresh restart:

- initial load, expanded/collapsed thread, catalog, and relation inspector: no first-direction answer leakage;
- wrong and correct relation choices: local recovery and no leakage;
- wrong and correct connecting-field choices: no PK/FK or multiplicity reveal before success;
- first-direction `many` error: feedback exposes only the at-most-one premise;
- first-direction `none` error: feedback exposes only the at-least-one premise;
- first-direction success: conclusion appears only now;
- reverse-direction wrong and correct paths: learner owns the inference; the Venture Daily illustration appears only after success; no 18-row reverse total appears;
- Cardinality reveal: terminology/notation appears after both directions;
- Grain: remains requested row meaning, not baseline, relation, or `FROM`;
- baseline: prepared query returns and interprets 18 article rows; no MCQ;
- prediction wrong and correct paths: the unit-bearing visual remains hidden until correct commitment;
- semantic action: unchanged choices and JOIN remains unnamed until correct selection;
- JOIN teaching: existing three layers remain continuous with the match-contribution argument and reviewable;
- SQL authoring: nudge and solution behavior unchanged;
- valid and representative invalid queries: semantic checking and inspectable results unchanged;
- verification: execution alone does not complete; correct reasoning closes the same baseline/match/prediction chain;
- completion and enrichment: remain post-verification and do not broaden into Lesson 2/3 concepts.

### Visual and accessibility checks

- Inspect desktop and narrow layouts for the longer two-premise Concept Moment and corrective feedback.
- Confirm the active learner-response lane and workspace/evidence lane do not relocate.
- Confirm hidden later surfaces are both visually hidden and unavailable to accessibility traversal until their authorized reveal.
- Confirm thread changes remain compact and reviewable without competing with the active task.
- Confirm no CSS change is needed; if a concrete overflow defect is found, any CSS fix must remain Lesson-1-local and must not change role ownership or interaction behavior.

### Acceptance boundary

Passing build, validator, and walkthrough checks establishes implementation conformance evidence only. It does not accept a new product baseline. Human acceptance remains a separate later decision.

## 8. Scope statement

The planned implementation requires changes only to:

- `src/stage1-prototype-runtime.js`; and
- `scripts/validate-stage1-remediation.mjs`.

No CSS change is currently planned. `src/stage1-prototype-runtime.css` is a regression/fit-check surface only.

The plan does not require:

- Lesson 2 changes;
- Lesson 3 changes;
- schema or seed changes;
- work-management changes;
- course-wide pedagogical or visual-authority changes;
- accepted product-baseline changes; or
- a new test framework or runtime architecture.

No blocking dependency was found. If implementation cannot present both first-direction premises clearly within the existing Concept Moment + teacher + closed `ask()` structure, or if correct presentation requires a new governed interaction pattern, implementation must stop and return that concrete issue to authority/design rather than silently expanding scope.

**READY FOR BOUNDED IMPLEMENTATION HANDOFF — IMPLEMENTATION NOT PERFORMED**
