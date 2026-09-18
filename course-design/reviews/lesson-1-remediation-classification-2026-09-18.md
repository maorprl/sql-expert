# Lesson 1 Remediation Classification / Decision Preparation — 2026-09-18

**Status:** CLASSIFICATION COMPLETE / HUMAN DECISIONS RECONCILED — NOT IMPLEMENTATION AUTHORITY

**Repository:** `maorprl/sql-expert`

**Classification baseline:** `b8ad64cd57f242ed8d55b613a2d720f5ad74839a`

**Evidence basis:**

- `course-design/reviews/lesson-1-runtime-review-2026-09-18.md`
- `course-design/reviews/lesson-1-runtime-review-verification-2026-09-18.md`

This report prepares decisions. It does not implement fixes, accept or reject review proposals, resolve authority ambiguity, modify canon, or change work-management state.

## 1. Classification summary

All 97 verified numbered findings have exactly one primary disposition:

| Category | Disposition | Count |
|---|---|---:|
| A | `PRESERVE / REGRESSION INVARIANT` | 49 |
| B | `IMPLEMENTATION REMEDIATION CANDIDATE` | 21 |
| C | `REVIEW DECISION REQUIRED` | 26 |
| D | `AUTHORITY DECISION REQUIRED` | 1 |
| E | `TRACEABILITY / TECHNICAL FOLLOW-UP` | 0 numbered findings; 1 separate technical record |
|  | **Total numbered findings** | **97** |

Category B contains only confirmed current-authority failures for which existing authority supplies a sufficient required outcome. Category C contains proposals or open behavior that current authority does not decide. Category D contains the one verified authority ambiguity, Finding 3.4. It is excluded from implementation change sets.

Finding 5.6 is classified A, not D: current authority unambiguously fixes `Grain → baseline → prediction`, and the review makes authority review conditional on continuity proving irreparable. That condition has not been established. The current invariant is therefore to preserve the sequence; any future proof of irreparability would create a new authority-decision trigger.

## 2. Full finding-disposition matrix

Scope labels are supplied for category B only. `COURSE-WIDE AUTHORITY, LOCAL IMPLEMENTATION` means the governing rule is course-wide but the verified defect and proposed remediation surface are Lesson-1-local. No category-B finding is promoted to multi-Lesson implementation scope without verified evidence.

| Finding | Verified review status | Primary disposition | Remediation scope / classification basis |
|---|---|---|---|
| 1.1 Learner identifies required relations | `CANON — WORKS` | A | Preserve learner-selected relation identification. |
| 1.2 Wrong-relation feedback | `CANON — WORKS` | A | Preserve local, non-revealing retry. |
| 1.3 Trial-and-error remains possible | `NOT IN CANON` | C | Explicit human decision; exact selection UI is open. |
| 1.4 Meta-teaching entry copy | `CANON — NOT WORKING` | B | `COURSE-WIDE AUTHORITY, LOCAL IMPLEMENTATION` — teacher-voice rule; L1 entry copy only. |
| 1.5 “Bench” terminology | `NOT IN CANON` | C | Cross-Lesson occurrence does not create authority. |
| 2.1 Connecting-key reasoning before PK/FK | `CANON — WORKS` | A | Preserve meaning-before-terminology sequence. |
| 2.2 Wrong-column behavior | `CANON — WORKS` | A | Preserve hidden evidence and retry. |
| 2.3 Correct connecting-key reveal | `CANON — WORKS` | A | Preserve PK/FK and connector reveal. |
| 2.4 Prompt precision | `CANON — NOT WORKING` | B | `LESSON 1 LOCAL` — L1 connecting-key prompt. |
| 2.5 Premature JOIN terminology | `CANON — NOT WORKING` | B | `LESSON 1 LOCAL` — L1 first-JOIN reveal order. |
| 3.1 Cardinality meaning before terminology | `CANON — WORKS` | A | Preserve response-before-name. |
| 3.2 Cardinality Concept Moment | `CANON — WORKS` | A | Preserve concept timing and role. |
| 3.3 Duplicate teacher/prompt wording | `NOT IN CANON` | C | Exact copy compression requires review. |
| 3.4 One-to-many evidence sufficiency | `CANON REVIEW NEEDED` / verified ambiguity | D | Current authority does not settle evidence sufficiency. |
| 4.1 Business request → row meaning | `CANON — WORKS` | A | Preserve business-request grounding. |
| 4.2 Grain terminology timing | `CANON — WORKS` | A | Preserve established meaning before name. |
| 4.3 Grain definition | `CANON — WORKS` | A | Preserve definition. |
| 4.4 Duplicate Grain framing | `NOT IN CANON` | C | Exact compression is undecided. |
| 4.5 Grain distractor quality | `NOT IN CANON` | C | Distractor replacement requires review. |
| 5.1 Prepared COUNT(*) measurement | `CANON — WORKS` | A | Preserve learner-run, non-authored baseline tool. |
| 5.2 Missing reason for measuring now | `CANON — NOT WORKING` | B | `COURSE-WIDE AUTHORITY, LOCAL IMPLEMENTATION` — guided continuity applied to L1. |
| 5.3 “Starting point” ambiguity | `CANON — NOT WORKING` | B | `LESSON 1 LOCAL` — L1 baseline bridge semantics. |
| 5.4 Meta measurement copy | `CANON — NOT WORKING` | B | `COURSE-WIDE AUTHORITY, LOCAL IMPLEMENTATION` — teacher voice applied to L1 bridge. |
| 5.5 Bench language in baseline transition | `NOT IN CANON` | C | Terminology decision remains open. |
| 5.6 Grain → baseline → prediction sequence | Conditional `CANON REVIEW NEEDED` | A | Preserve current fixed order; escalate only if repair within it is proven impossible. |
| 6.1 Baseline as active surface | `CANON — NOT WORKING` | B | `COURSE-WIDE AUTHORITY, LOCAL IMPLEMENTATION` — course visual rule, L1 layout/state. |
| 6.2 Cross-region handoff | `CANON — NOT WORKING` | B | `COURSE-WIDE AUTHORITY, LOCAL IMPLEMENTATION` — locality rule, L1 handoff. |
| 6.3 Coordinated dual focus | `NOT IN CANON` | C | Exact visual solution requires review. |
| 7.1 Run → evidence → interpretation | `CANON — WORKS` | A | Preserve evidence cycle. |
| 7.2 Evidence locality | `CANON — WORKS` | A | Preserve local returned evidence. |
| 7.3 “A number only helps…” | `CANON — WORKS` | A | Preserve reasoning function. |
| 7.4 Baseline interpretation MCQ | `NOT IN CANON` | C | Separate-MCQ necessity requires review. |
| 8.1 Prediction premises available | `CANON — WORKS` | A | Preserve all premises. |
| 8.2 Prediction is learner reasoning | `CANON — WORKS` | A | Preserve protected prediction. |
| 8.3 Prediction distractor structure | `CANON — WORKS` | A | Preserve relational distinctions. |
| 8.4 Prediction teacher/prompt duplication | `NOT IN CANON` | C | Copy compression requires review. |
| 8.5 Prediction mechanism explanation | Canon chain required; exact wording `NOT IN CANON` | B | `LESSON 1 LOCAL` — outcome is canonical; wording remains implementation freedom. |
| 8.6 Post-prediction visual | `NOT IN CANON` | C | New visual requires explicit decision. |
| 9.1 Meaning before JOIN terminology | `CANON — WORKS` | A | Preserve semantic-action gate. |
| 9.2 Semantic-action evidence quality | `NOT IN CANON` | C | Interaction-strength judgment requires review. |
| 9.3 Semantic-action distractor quality | `NOT IN CANON` | C | Distractor redesign requires review. |
| 10.1 JOIN timing | `CANON — WORKS` | A | Preserve JOIN naming after learner choice. |
| 10.2 Row-level visual | `CANON — WORKS` | A | Preserve local matching-row model. |
| 10.3 Active teaching focus | `CANON — WORKS` | A | Preserve teaching-before-editor focus. |
| 10.4 “Predicted grain” | `CANON — NOT WORKING` | B | `LESSON 1 LOCAL` — recurring L1 terminology defect. |
| 11.1 Match → SQL condition progression | `CANON — WORKS` | A | Preserve progression. |
| 11.2 Relationship reuse | `CANON — WORKS` | A | Preserve same established keys in ON. |
| 11.3 “The relationship becomes ON” | `CANON — NOT WORKING` | B | `LESSON 1 LOCAL` — L1 ON teaching semantics. |
| 11.4 “Map the condition” control | `NOT IN CANON` | C | Control wording/action fit requires review. |
| 12.1 Business request reconnection | `CANON — WORKS` | A | Preserve reconnection. |
| 12.2 Grain remains available | `CANON — WORKS` | A | Preserve established Grain in teaching. |
| 12.3 Missing full-query mapping | `CANON — NOT WORKING` | B | `LESSON 1 LOCAL` — explicit L1 mapping requirement. |
| 12.4 SELECT wording | `NOT IN CANON` | C | Exact rewrite is undecided, despite semantic constraint. |
| 12.5 Business request ↔ Grain equivalence | `NOT IN CANON` | C | Exact visual semantics require review. |
| 13.1 Progressive exposure | `CANON — WORKS` | A | Preserve one-layer-at-a-time teaching. |
| 13.2 Previous beat disappears | `NOT IN CANON / OPEN` | C | All three treatments remain allowed. |
| 13.3 Compact prior beats | `NOT IN CANON` | C | Retention proposal requires review. |
| 13.4 Learner-facing “Beat” | `NOT IN CANON` | C | Label change requires decision. |
| 14.1 Clean implementation editor | `CANON — WORKS` | A | Preserve separate empty editor. |
| 14.2 SQL becomes primary after teaching | `CANON — WORKS` | A | Preserve phase handoff. |
| 14.3 “Make the argument executable” | `CANON — WORKS` | A | Preserve function. |
| 14.4 Workbench terminology | `NOT IN CANON` | C | Terminology decision remains open. |
| 14.5 “Preserves the grain you predicted” | `CANON — NOT WORKING` | B | `LESSON 1 LOCAL` — same L1 terminology defect as 10.4. |
| 14.6 Inherited readiness gap | `CANON — NOT WORKING` | B | `LESSON 1 LOCAL` — consequence of missing canonical mapping. |
| 14.7 Placeholder reuse | `CANON — WORKS` | A | Preserve established-only scaffold. |
| 15.1 Assistance controls exist | Exact behavior partially `OPEN` | C | Existence is not a defect; lifecycle/detail requires decision. |
| 15.2 First nudge strength | `NOT IN CANON / OPEN` | C | Assistance escalation policy requires decision. |
| 15.3 Nudge after success | `NOT IN CANON` | C | Exact post-success treatment requires decision. |
| 15.4 Show solution after success | `NOT IN CANON` | C | Exact post-success treatment requires decision. |
| 16.1 SQL and result stay together | `CANON — WORKS` | A | Preserve coherent workspace. |
| 16.2 Row count visible | `CANON — WORKS` | A | Preserve visible count. |
| 16.3 Actual result inspectable | `CANON — WORKS` | A | Preserve all rows. |
| 16.4 Semantic validator status | `CANON — WORKS` | A | Preserve allowed status/interpretation boundary. |
| 16.5 Assistance competes with result | Canon goal; exact collapse `NOT IN CANON` | C | Visual goal exists, but proposed assistance behavior is undecided. |
| 17.1 Execution is not completion | `CANON — WORKS` | A | Preserve separate learner verification. |
| 17.2 Teacher reconnects to prediction | `CANON — WORKS` | A | Preserve reconnection. |
| 17.3 Result is evidence, not conclusion | `CANON — WORKS` | A | Preserve distinction. |
| 17.4 Closed final verification | `CANON — WORKS` | A | Preserve learner interpretation. |
| 17.5 “Visible result supports” | `CANON — NOT WORKING` | B | `LESSON 1 LOCAL` — L1 prompt fails explicit synthesis requirement. |
| 17.6 Verification answer structure | `CANON — WORKS` with framing condition | A | Preserve three-claim synthesis while fixing only framing. |
| 18.1 Completion follows verification | `CANON — WORKS` | A | Preserve gate. |
| 18.2 Green success treatment | `CANON — WORKS` | A | Preserve success role. |
| 18.3 “SQL is not the conclusion…” | `CANON — WORKS` | A | Preserve reasoning-first closure. |
| 18.4 “Predicted the row count and grain” | `CANON — NOT WORKING` | B | `LESSON 1 LOCAL` — recurring L1 terminology defect. |
| 18.5 “CONCEPT — JOIN verified” | `CANON — NOT WORKING` | B | `COURSE-WIDE AUTHORITY, LOCAL IMPLEMENTATION` — visual-role rule, L1 completion. |
| 18.6 Administrative transcript synthesis | `CANON — NOT WORKING` | B | `COURSE-WIDE AUTHORITY, LOCAL IMPLEMENTATION` — reasoning-thread rule, L1 completion. |
| 18.7 Closing result meaning | `CANON — WORKS` | A | Preserve gist. |
| 18.8 Next-lesson navigation | `CANON — WORKS / PASS` | A | Preserve post-completion navigation. |
| 19.1 Enrichment after core lesson | `CANON — WORKS` | A | Preserve optional placement. |
| 19.2 Schema vs instance distinction | `CANON — WORKS` | A | Preserve distinction. |
| 19.3 Row-to-result model purpose | `CANON — WORKS in purpose` | A | Preserve explanatory purpose. |
| 19.4 Result-row visual legibility | `CANON — NOT WORKING` | B | `LESSON 1 LOCAL` — explicit L1 title/source contribution requirement. |
| 19.5 Plus-sign semantics | `NOT IN CANON` | C | Connector redesign requires review. |
| 19.6 “ON names the relationship” | `CANON — NOT WORKING` | B | `LESSON 1 LOCAL` — same ON semantic defect as 11.3. |
| 19.7 “JOIN is the bridge” | `NOT IN CANON` | C | Metaphor decision remains open. |
| 19.8 Unqualified row-preservation claim | `CANON — NOT WORKING / generalization risk` | B | `LESSON 1 LOCAL` — L1 enrichment copy requires query-local scope. |
| 19.9 Venn limitation | `CANON — WORKS` | A | Preserve limitation. |

## 3. Preserve / regression invariants

These 49 category-A findings are protection obligations during remediation, not fixes.

### Entry, relationship, and concepts

- `1.1`, `1.2`: learner identifies the relations; wrong choices remain local and non-revealing.
- `2.1`, `2.2`, `2.3`: connecting-key reasoning precedes PK/FK naming; wrong choices do not reveal; correct choice reveals established evidence.
- `3.1`, `3.2`: Cardinality meaning precedes terminology; Concept Moment remains distinct.
- `4.1`, `4.2`, `4.3`: Grain remains grounded in the business request, established before naming, and correctly defined.

### Baseline, prediction, and semantic action

- `5.1`: baseline remains a prepared learner-run measurement, not learner-authored SQL.
- `5.6`: preserve `Grain → baseline → prediction`; do not reorder during remediation.
- `7.1`, `7.2`, `7.3`: preserve run → evidence → interpretation, evidence locality, and the meaning-oriented interpretation bridge.
- `8.1`, `8.2`, `8.3`: preserve prediction premises, learner ownership, and relational distractor distinctions.
- `9.1`: preserve semantic action before JOIN terminology.

### JOIN teaching and authoring

- `10.1`, `10.2`, `10.3`: preserve JOIN timing, row-matching visual purpose, and teaching focus.
- `11.1`, `11.2`: preserve match → condition progression and reuse of the established relationship.
- `12.1`, `12.2`: preserve reconnection to the request and availability of established Grain.
- `13.1`: preserve progressive exposure; do not expose all teaching layers at once.
- `14.1`, `14.2`, `14.3`, `14.7`: preserve the clean editor, post-teaching primacy, reasoning-to-SQL framing, and non-leaking placeholder reuse.

### Execution, evidence, verification, and completion

- `16.1`, `16.2`, `16.3`, `16.4`: preserve coherent SQL/result workspace, visible count, inspectable rows, and the permitted semantic-validator boundary.
- `17.1`, `17.2`, `17.3`, `17.4`, `17.6`: preserve the separate learner-verification gate, prediction reconnection, evidence/conclusion distinction, closed interaction, and three-claim synthesis structure.
- `18.1`, `18.2`, `18.3`, `18.7`, `18.8`: preserve completion timing, green success role, reasoning-first close, final result meaning, and Lesson 2 navigation.

### Enrichment

- `19.1`, `19.2`, `19.3`, `19.9`: preserve optional post-core placement, schema/instance distinction, row-to-result explanatory purpose, and the stated Venn limitation.

## 4. Candidate implementation change sets

Only category-B findings appear here.

### CS-B1 — Entry guidance role correction

**Scope:** `COURSE-WIDE AUTHORITY, LOCAL IMPLEMENTATION`

**Included finding IDs:** `1.4`

**Problem being corrected:** Lesson 1 entry teacher copy narrates lesson procedure instead of keeping teacher voice on the business reasoning problem.

**Existing authority:** `pedagogical-foundations.md` → **Teacher continuity and reasoning thread**; `course-design/stage-1/stage-1-interaction-decisions.md` → **Guided continuity**.

**Affected implementation surfaces:** `src/stage1-prototype-runtime.js` → `reset()` entry teacher turn.

**Required outcome:** Entry guidance remains inside the business problem and does not spend teacher voice on process narration; it still elicits learner relation selection without pre-resolving it.

**Must preserve:** `1.1`, `1.2`; business request precision and non-preemption.

**Dependencies:** None.

**Regression surface:** Lesson 1 initial state and relation-selection transition.

**Verification types required later:** static/content; scripted runtime walkthrough; human pedagogical acceptance.

### CS-B2 — Connecting-key / PK-FK semantic boundary

**Scope:** `LESSON 1 LOCAL`

**Included finding IDs:** `2.4`, `2.5`

**Problem being corrected:** The connecting-key prompt overstates what the ID returns, and the resulting PK/FK explanation names JOIN before the learner's semantic-action choice.

**Existing authority:** `stage-1-interaction-decisions.md` → **Reasoning, concepts, and progressive relationship reveal** and **Result Grain, baseline, prediction, and semantic action**; `pedagogical-foundations.md` → **First JOIN Teaching Encounter**.

**Affected implementation surfaces:** `src/stage1-prototype-runtime.js` → `beginConnection()` and `onColumn()` PK/FK Concept copy.

**Required outcome:** Prompt asks for the field that identifies the publishing source; PK/FK explanation consolidates the relationship without JOIN terminology before the protected semantic-action gate.

**Must preserve:** `2.1`, `2.2`, `2.3`, `3.1`, `9.1`, `10.1`.

**Dependencies:** Semantic terminology used here must remain compatible with CS-B7.

**Regression surface:** Connecting-key correct/wrong paths, PK/FK reveal, Cardinality entry.

**Verification types required later:** automated interaction/state; static/content; scripted runtime walkthrough; human pedagogical acceptance.

### CS-B3 — Grain-to-baseline reasoning bridge

**Scope:** `COURSE-WIDE AUTHORITY, LOCAL IMPLEMENTATION`

**Included finding IDs:** `5.2`, `5.3`, `5.4`

**Problem being corrected:** The transition directs a measurement without explaining why starting article-row count matters to the already established result Grain and later prediction.

**Existing authority:** `pedagogical-foundations.md` → **Guided reasoning progression** and **Teacher continuity and reasoning thread**; `stage-1-interaction-decisions.md` → **Guided continuity** and **Result Grain, baseline, prediction, and semantic action**.

**Affected implementation surfaces:** `src/stage1-prototype-runtime.js` → `afterGrain()`; no sequence change.

**Required outcome:** The bridge identifies the baseline as starting article rows and makes its reasoning purpose legible without supplying the prediction or teaching COUNT broadly.

**Must preserve:** `4.1`–`4.3`, `5.1`, `5.6`, `7.1`–`7.3`, `8.2`.

**Dependencies:** Precedes CS-B5 in the learner sequence; it must not absorb or answer the prediction mechanism.

**Regression surface:** Grain completion, baseline activation, prepared measurement focus.

**Verification types required later:** static/content; automated interaction/state; scripted runtime walkthrough; human pedagogical acceptance.

### CS-B4 — Baseline attention and cross-lane handoff

**Scope:** `COURSE-WIDE AUTHORITY, LOCAL IMPLEMENTATION`

**Included finding IDs:** `6.1`, `6.2`

**Problem being corrected:** The active baseline tool and its guidance do not read strongly enough as one current task across the response/tool lanes.

**Existing authority:** `course-visual-language.md` → **Current learner focus**, **Attention choreography and evidence locality**, and **Interaction topology and locality contract**; `stage-1-interaction-decisions.md` → **Learner-experience visual application**.

**Affected implementation surfaces:** `src/stage1-prototype-runtime.js` → `afterGrain()`/current-action state; `src/stage1-prototype-runtime.css` → active tool, schema-reference, and handoff composition.

**Required outcome:** During baseline execution, the measurement is unmistakably primary, the Working Schema is a quiet reference, and guidance/tool ownership is visually continuous without moving response controls out of their authorized lane.

**Must preserve:** `5.1`, `5.6`, `7.1`, `7.2`; stable response-lane ownership.

**Dependencies:** Do not adopt the category-C coordinated-dual-focus proposal (`6.3`) without a separate decision.

**Regression surface:** Desktop and responsive Lesson 1 Grain→baseline and baseline interpretation states.

**Verification types required later:** visual regression; scripted runtime walkthrough; human pedagogical acceptance; automated state assertion for current-action roles.

### CS-B5 — Prediction mechanism consolidation

**Scope:** `LESSON 1 LOCAL`

**Included finding IDs:** `8.5`

**Problem being corrected:** Correct prediction advances without locally consolidating the canonical unit-bearing relational mechanism.

**Existing authority:** `stage-1-interaction-decisions.md` → **Result Grain, baseline, prediction, and semantic action**, including the explicit continuous chain.

**Affected implementation surfaces:** `src/stage1-prototype-runtime.js` → `afterPrediction()` transition/feedback.

**Required outcome:** After learner commitment, feedback communicates that 18 article rows × one matching source per article yields 18 result rows at the established Grain; exact wording and use of a visual remain outside this set.

**Must preserve:** `8.1`, `8.2`, `8.3`, `9.1`; no answer leakage before engagement.

**Dependencies:** Follows CS-B3 in the learner sequence; must not decide category-C post-prediction visual `8.6`.

**Regression surface:** Prediction success → semantic-action transition.

**Verification types required later:** automated interaction/state; static/content; scripted runtime walkthrough; human pedagogical acceptance.

### CS-B6 — Established / predicted / verified terminology

**Scope:** `LESSON 1 LOCAL`

**Included finding IDs:** `10.4`, `14.5`, `18.4`

**Problem being corrected:** Three Lesson 1 states call Grain predicted or collapse established Grain and predicted row count.

**Existing authority:** `stage-1-interaction-decisions.md` → **Result Grain, baseline, prediction, and semantic action** and **Execution evidence and final verification**.

**Affected implementation surfaces:** `src/stage1-prototype-runtime.js` → `afterPrediction()` spine/teacher copy, `#s1-to-sql` handler, `complete()` Concept copy.

**Required outcome:** Runtime consistently distinguishes established result Grain, predicted row count, and later confirmation/verification against both.

**Must preserve:** `4.2`, `4.3`, `8.2`, `17.2`, `17.3`, `18.3`, `18.7`.

**Dependencies:** Coordinate completion wording with CS-B10; no L2/L3 edits are authorized because verification found the conflation only in L1.

**Regression surface:** prediction success, authoring entry, final verification/completion.

**Verification types required later:** static/content; scripted runtime walkthrough; human pedagogical acceptance.

### CS-B7 — Relationship / ON semantic precision

**Scope:** `LESSON 1 LOCAL`

**Included finding IDs:** `11.3`, `19.6`

**Problem being corrected:** Teaching says the relationship becomes ON and enrichment says ON names the relationship, rather than explaining ON as the SQL match condition derived from it.

**Existing authority:** `stage-1-interaction-decisions.md` → **JOIN teaching climax**, especially relationship-to-ON meaning.

**Affected implementation surfaces:** `src/stage1-prototype-runtime.js` → module `html` Beat 2 and `showEnrichment()`.

**Required outcome:** Both states accurately express that ON tells SQL how rows match using the already established relationship.

**Must preserve:** `11.1`, `11.2`, `19.2`, `19.3`.

**Dependencies:** Terminology should align with CS-B2 and the ON portion of CS-B8.

**Regression surface:** JOIN teaching Beat 2 and optional enrichment.

**Verification types required later:** static/content; scripted runtime walkthrough; human pedagogical acceptance.

### CS-B8 — Complete business-question-to-query mapping

**Scope:** `LESSON 1 LOCAL`

**Included finding IDs:** `12.3`, `14.6`

**Problem being corrected:** The teaching climax omits the required explicit SELECT/FROM/JOIN/ON mapping, causing the learner to enter authoring without canonical preparation.

**Existing authority:** `stage-1-interaction-decisions.md` → **Business question → SQL**, **Cognitive-load constraint**, **Observable implementation requirements**, and **SQL implementation workspace**.

**Affected implementation surfaces:** `src/stage1-prototype-runtime.js` → Beat 3 template and transition to `#s1-sql`; `src/stage1-prototype-runtime.css` → teaching mapping layout as needed.

**Required outcome:** Before authoring, the current beat visibly maps requested attributes→SELECT, starting article rows→FROM, matching source information→JOIN, and established relationship→ON, while reconnecting the whole query to Grain and prediction.

**Must preserve:** `10.2`, `10.3`, `11.1`, `11.2`, `12.1`, `12.2`, `13.1`, `14.1`, `14.2`, `14.3`, `14.7`; no additional assessment.

**Dependencies:** Use corrected ON semantics from CS-B7; do not decide `12.4`, `12.5`, `13.2`, or `13.3` without human decisions.

**Regression surface:** all three JOIN teaching beats, teaching→authoring transition, responsive layout.

**Verification types required later:** automated interaction/state; static/content; visual regression; scripted runtime walkthrough; human pedagogical acceptance.

### CS-B9 — Final verification evidence framing

**Scope:** `LESSON 1 LOCAL`

**Included finding IDs:** `17.5`

**Problem being corrected:** Prompt claims the visible result alone supports conclusions that must integrate result evidence, the earlier prediction, and established Grain.

**Existing authority:** `stage-1-interaction-decisions.md` → **Execution evidence and final verification**.

**Affected implementation surfaces:** `src/stage1-prototype-runtime.js` → `askVerification()` prompt.

**Required outcome:** The prompt explicitly asks the learner to interpret actual result evidence against the earlier prediction and established Grain.

**Must preserve:** `16.2`–`16.4`, `17.1`–`17.4`, `17.6`, `18.1`.

**Dependencies:** None; must not alter the accepted three-claim answer structure.

**Regression surface:** successful execution → verification.

**Verification types required later:** automated interaction/state; static/content; scripted runtime walkthrough; human pedagogical acceptance.

### CS-B10 — Completion semantic role and reasoning synthesis

**Scope:** `COURSE-WIDE AUTHORITY, LOCAL IMPLEMENTATION`

**Included finding IDs:** `18.5`, `18.6`

**Problem being corrected:** Completion reuses first-exposure Concept styling for verification and summarizes implementation-state labels rather than the logic of the learner's argument.

**Existing authority:** `course-visual-language.md` → **Concept Moments** and **Color Roles**; `pedagogical-foundations.md` → **Teacher continuity and reasoning thread**; `stage-1-interaction-decisions.md` → **Learner-experience visual application** and **Execution evidence and final verification**.

**Affected implementation surfaces:** `src/stage1-prototype-runtime.js` → `complete()` Concept/completion content; `src/stage1-prototype-runtime.css` → existing concept/success roles only if state treatment changes within current authority.

**Required outcome:** Completion uses a verification/consolidation role distinct from Concept Moment and closes with a coherent causal reasoning synthesis.

**Must preserve:** `18.1`, `18.2`, `18.3`, `18.7`, `18.8`; JOIN remains a Concept Moment at first introduction (`10.1`).

**Dependencies:** Completion wording must incorporate CS-B6's terminology distinction.

**Regression surface:** final verification success, completion, continuation navigation.

**Verification types required later:** static/content; visual regression; scripted runtime walkthrough; human pedagogical acceptance.

### CS-B11 — Enrichment result-row contribution legibility

**Scope:** `LESSON 1 LOCAL`

**Included finding IDs:** `19.4`

**Problem being corrected:** The enrichment visual does not make the contribution of article title and source name to one result row visibly legible.

**Existing authority:** `stage-1-interaction-decisions.md` → **JOIN teaching climax**, **Observable implementation requirements**, and **Optional enrichment**; `course-visual-language.md` → **Visual Aids**.

**Affected implementation surfaces:** `src/stage1-prototype-runtime.js` → `showEnrichment()` row model; `src/stage1-prototype-runtime.css` → `.sample.triple`/card layout.

**Required outcome:** The visual clearly connects article title and source name contributions to one resulting row without changing the established relational explanation.

**Must preserve:** `19.1`, `19.2`, `19.3`, `19.9`.

**Dependencies:** Must not silently decide plus-sign replacement (`19.5`) or the JOIN metaphor (`19.7`).

**Regression surface:** optional enrichment at desktop/responsive widths.

**Verification types required later:** visual regression; scripted runtime walkthrough; human pedagogical acceptance.

### CS-B12 — Query-local result-preservation qualification

**Scope:** `LESSON 1 LOCAL`

**Included finding IDs:** `19.8`

**Problem being corrected:** Enrichment presents one-row-per-article preservation without qualifying it as behavior of this query and relationship.

**Existing authority:** `pedagogical-foundations.md` → **Business Question Precision and Non-Preemption** and **First JOIN Teaching Encounter**; `stage-1-interaction-decisions.md` → **Result Grain, baseline, prediction, and semantic action**.

**Affected implementation surfaces:** `src/stage1-prototype-runtime.js` → `showEnrichment()` preservation statement.

**Required outcome:** Learner-facing copy scopes preservation explicitly to this query/relationship and does not imply a general JOIN invariant.

**Must preserve:** `18.7`, `19.2`, `19.3`, `19.9`.

**Dependencies:** Coordinate with CS-B11 if both touch the enrichment block; independent of decision items `19.5` and `19.7`.

**Regression surface:** optional enrichment copy.

**Verification types required later:** static/content; scripted runtime walkthrough; human pedagogical acceptance.

## 5. Cross-cutting vs Lesson-1-local scope map

| Scope label | Category-B findings | Change sets | Boundary |
|---|---|---|---|
| `LESSON 1 LOCAL` | `2.4`, `2.5`, `5.3`, `8.5`, `10.4`, `11.3`, `12.3`, `14.5`, `14.6`, `17.5`, `18.4`, `19.4`, `19.6`, `19.8` | CS-B2, part of CS-B3, CS-B5–B9, CS-B11–B12 | Verified defect and implementation ownership are confined to `src/stage1-prototype-runtime.*`. |
| `COURSE-WIDE AUTHORITY, LOCAL IMPLEMENTATION` | `1.4`, `5.2`, `5.4`, `6.1`, `6.2`, `18.5`, `18.6` | CS-B1, part of CS-B3, CS-B4, CS-B10 | Course-wide teacher/visual/thread rules govern, but only L1 implementation is established as defective by these findings. |
| `CROSS-CUTTING — SHARED IMPLEMENTATION` | none | none | The verified report found shared patterns, but no category-B finding establishes that a shared component must be changed. |
| `CROSS-CUTTING — MULTIPLE LESSON OCCURRENCES` | none | none | Multiple-Lesson occurrences found in Section 20 mostly belong to category-C decision items, not already-authorized fixes. |
| `SCOPE REQUIRES DECISION` | none in B | none | Scope uncertainty is retained in category C/D rather than entering implementation. |

This map prevents Lesson 1 findings from authorizing Lesson 2 or Lesson 3 edits. If a later human decision accepts a cross-cutting category-C proposal, its implementation scope must be reclassified before build.

## 6. Review-decision queue (`NOT IN CANON` / OPEN)

No direction is preferred below unless current authority already constrains the boundary. “Accepting” means accepting the review proposal through the proper decision/authority process, not implementing directly from this report.

| ID | Observed problem/opportunity | Verified runtime scope | Existing authority relationship | Review direction | If accepted | If unchanged |
|---|---|---|---|---|---|---|
| 1.3 | Small catalog permits trial-and-error discovery. | L1 only. | Selection mechanism open; relational interpretation required. | Pass with note; no change proposed as necessary. | A design may add friction/evidence but must preserve learner relation identification. | Current low-cost guessing remains possible. |
| 1.5 | `bench`/`Workbench` metaphor must be decoded. | L1+L2; shared vocabulary; L3 visual reference also uses it. | No current authority fixes replacement wording. | Prefer explicit state language such as Added/In Working Schema. | Requires coordinated terminology scope and possible L1/L2/L3-reference edits. | Historical metaphor remains learner-facing. |
| 3.3 | Teacher and Cardinality prompt repeat the proposition. | L1; similar duplication observed beyond L1. | Teacher-purpose authority applies; exact compression not fixed. | Review for compression. | Less repetition, but the bridge must still orient reasoning. | Current redundant pacing remains. |
| 4.4 | Grain teacher copy and question duplicate framing. | L1; duplication pattern broader. | Exact wording open. | Review for compression. | Shorter path while retaining business-request grounding. | Current repetition remains. |
| 4.5 | `country` is a weak Grain distractor. | L1 only. | Answer choices open. | Preserve pair misconception; consider replacing weak distractor. | May improve discrimination; requires new option validation. | One low-plausibility option remains. |
| 5.5 | Baseline bridge inherits `bench` language. | L1 occurrence; metaphor also L2/L3 reference. | Exact terminology open. | Treat as cross-cutting terminology candidate. | Must follow the broader 1.5 decision. | Current phrase remains. |
| 6.3 | Coordinated guidance+tool focus could clarify handoff. | L1 proposal; attention pattern appears across lessons. | Authority defines the goal, not this exact treatment. | Candidate implementation only. | Adds a specific visual convention needing responsive validation. | Authorized outcome must be reached by another treatment in CS-B4. |
| 7.4 | Baseline interpretation MCQ may be ceremonial. | L1 only. | Interpretation is required; separate quiz is not. | Review whether separate MCQ is necessary. | Could reduce ceremony; must retain observable interpretation evidence. | Current low-discrimination MCQ remains. |
| 8.4 | Prediction teacher/prompt duplicate the task. | L1; duplication pattern broader. | Exact copy open. | Review for compression. | Less repetition; premises must remain available. | Current duplication remains. |
| 8.6 | Post-prediction mechanism visual could strengthen explanation. | L1 only; no same required state elsewhere. | Visual aids allowed; not required here. | Strong proposal after engagement. | Adds a new visual state requiring visual/interaction validation. | CS-B5 must explain mechanism without this visual. |
| 9.2 | Semantic-action answer may test recognition. | L1 only. | Semantic-action gate is required; evidence strength not fixed. | Pass with note/review. | Could strengthen capability evidence without removing gate. | Lightweight recognition risk remains. |
| 9.3 | Filter/aggregate/stack distractors are uneven. | L1 only. | Exact distractors open. | Review distractors; retain gate. | Better discrimination but new options require pedagogical review. | Current uneven distractors remain. |
| 11.4 | “Map the condition” suggests an action already completed. | L1 only. | Transition-control wording open. | UX/control-label review. | Control can accurately name advancement or learner action. | Action-label mismatch remains. |
| 12.4 | SELECT wording is semantically imprecise. | L1 only. | Canon prohibits implying SELECT alone determines Grain, but exact rewrite is open. | Rewrite for precision. | Human decision supplies approved expression within CS-B8 context. | Misleading wording remains unless displaced by canonical mapping work. |
| 12.5 | Double arrow may imply request/Grain equivalence. | L1 only. | Exact visual semantics open. | Review visual semantics. | A clearer relationship representation can be chosen. | Equivalence implication remains. |
| 13.2 | Prior teaching beat disappears. | L1 only. | Authority explicitly allows hidden/replaced/compact-retained. | No conformance defect. | A decision may retain replacement or select another allowed treatment. | Current replacement remains valid. |
| 13.3 | Compact prior beats may support cumulative review. | L1 only. | Current treatment explicitly open. | Proposal to retain compact reminders. | Adds persistent teaching history and visual-load implications. | Prior beats continue to disappear. |
| 13.4 | `Beat` exposes instructional-design jargon. | L1 only; no broader occurrence found. | Exact labels open. | Remove or use conceptual action labels. | Requires approved learner-facing labels. | Jargon remains. |
| 14.4 | “Workbench” continues the workspace metaphor. | L1+L2; L3 visual reference. | Exact terminology open. | Cross-cutting terminology finding. | Must align with 1.5/5.5 decision and scope. | Current metaphor remains. |
| 15.1 | Nudge and solution exist but exact behavior is partially open. | L1+L2; L3 includes solution, not nudge. | `course-controls.md` establishes roles/boundaries and leaves policy questions open. | No automatic defect. | A decision can define lifecycle/escalation consistently by scope. | Existing per-Lesson behavior remains. |
| 15.2 | First nudge supplies nearly all query structure. | L1; analogous strong assistance in L2. | Escalation remains open. | Review finding: nudge too strong/lacks escalation. | Requires an explicit assistance model and affected-Lesson scope. | Current high-strength first nudge remains. |
| 15.3 | Open nudge remains active after success. | L1; analogous lifecycle pattern in L2. | Result should become primary; exact collapse behavior open. | Prefer compact/reviewable post-success treatment. | Defines a lifecycle state and potential cross-Lesson convention. | Nudge continues competing with evidence. |
| 15.4 | Show solution remains available after success. | L1; analogous control lifecycle in L2/L3 reference. | Exact post-success behavior open. | Decide disappear/disable/de-emphasize. | Establishes assistance lifecycle and scope. | Control remains available during verification. |
| 16.5 | Assistance competes with result evidence. | L1+L2 pattern; shared visual roles. | Result primacy is authoritative; exact assistance collapse is not. | Review post-success hierarchy. | Decision can authorize a specific assistance treatment. | CS-B work cannot silently choose collapse behavior; competition remains partly unresolved. |
| 19.5 | `+` may imply addition/concatenation/stacking. | L1 enrichment only. | Visual must be explanatory; exact connector open. | Prefer converging match arrows. | New connector semantics/layout require visual validation. | Ambiguous plus remains. |
| 19.7 | “JOIN is the bridge” is metaphorical. | L1 enrichment only. | Exact enrichment copy open. | Copy review. | Could adopt more precise relational language. | Metaphor remains. |

## 7. Authority-decision queue

### D-1 — Finding 3.4: evidence sufficiency for one-to-many inference

**Exact ambiguity:** Lesson 1 authority requires Cardinality to be reasoned from PK/FK structure rather than observed seed examples, but does not establish whether the currently displayed FK→PK structure alone is sufficient evidence for a learner to infer that many article rows may reference the same source row.

**Conflicting or insufficient authority:** There is no direct conflict. `stage-1-interaction-decisions.md` establishes the inference source and reveal order but does not define the minimum visible structural evidence needed for this inference.

**Decision required:** Decide whether the displayed PK/FK relationship is intentionally sufficient, or whether additional non-answer-leaking structural evidence is required. If additional evidence is required, authority must define its pedagogical role/boundary before implementation design.

**Blocked implementation/change sets:** No current category-B change set depends on resolving this ambiguity. Any change to Cardinality evidence, prompt structure, schema visual, or reveal sequence is blocked. Findings `3.1` and `3.2` remain invariants meanwhile.

### Conditional authority trigger retained from Finding 5.6

No authority decision is currently queued for `5.6`. Existing authority fixes `Grain → baseline → prediction`, and CS-B3/CS-B4 must first repair continuity within that order. Only evidence that continuity cannot be repaired without reordering would trigger a later authority decision. This classification does not presume that condition.

## 8. Technical follow-ups

### E-1 — Exact historical runtime/deployment identity

**Classification:** `TRACEABILITY / TECHNICAL FOLLOW-UP` (non-numbered verification record)

**Current evidence:** Accepted baseline and current-main Lesson 1 runtime blobs are byte-identical, reviewed strings trace to commit `20e8019613f21d02e413e911376076b6106217c5`, and current `main` reproduces the reviewed states.

**Remaining limitation:** No screenshot-linked build identifier or deployment manifest proves the exact SHA used during the original runtime test drive.

**Follow-up boundary:** If exact historical attribution is operationally required, locate deployment logs/build metadata or record the limitation as permanently unprovable. Do not modify pedagogy or runtime to address it.

**Effect on remediation classification:** None. Verification concluded traceability is sufficient for current change-set classification.

## 9. Dependency / order map

This map records semantic and surface dependencies, not implementation priority.

```text
CS-B1 Entry guidance                         (independent)

CS-B2 Connecting-key / PK-FK boundary ─────┐
                                            ├──> CS-B7 Relationship / ON semantics ──> CS-B8 Full-query mapping
CS-B3 Grain→baseline bridge ──> CS-B5 Prediction mechanism

CS-B4 Baseline attention handoff            (must follow C decisions only if a specific C visual is adopted)

CS-B6 Established/predicted/verified ──────> CS-B10 Completion role/synthesis

CS-B9 Final verification framing            (preserves existing answer structure)

CS-B11 Enrichment visual ───────────────────┐
                                            ├──> coordinate edits to the same enrichment block
CS-B12 Query-local qualification ───────────┘
```

Decision gates around implementation sets:

- D-1 (`3.4`) remains outside all change sets; no Cardinality-evidence remediation may begin without authority resolution.
- C items `6.3`, `8.6`, `12.4`, `12.5`, `13.2`, and `13.3` must not be silently absorbed into CS-B4, CS-B5, or CS-B8.
- C assistance items `15.1`–`15.4` and `16.5` require human decisions before any assistance-lifecycle change set can exist.
- C enrichment items `19.5` and `19.7` must not be silently absorbed into CS-B11/B12.
- C terminology items `1.5`, `5.5`, and `14.4` require a scope decision before any cross-Lesson terminology change set can exist.

## 10. Count reconciliation

### Primary-disposition proof

| Category | Finding IDs | Count |
|---|---|---:|
| A | `1.1`, `1.2`, `2.1`, `2.2`, `2.3`, `3.1`, `3.2`, `4.1`, `4.2`, `4.3`, `5.1`, `5.6`, `7.1`, `7.2`, `7.3`, `8.1`, `8.2`, `8.3`, `9.1`, `10.1`, `10.2`, `10.3`, `11.1`, `11.2`, `12.1`, `12.2`, `13.1`, `14.1`, `14.2`, `14.3`, `14.7`, `16.1`, `16.2`, `16.3`, `16.4`, `17.1`, `17.2`, `17.3`, `17.4`, `17.6`, `18.1`, `18.2`, `18.3`, `18.7`, `18.8`, `19.1`, `19.2`, `19.3`, `19.9` | 49 |
| B | `1.4`, `2.4`, `2.5`, `5.2`, `5.3`, `5.4`, `6.1`, `6.2`, `8.5`, `10.4`, `11.3`, `12.3`, `14.5`, `14.6`, `17.5`, `18.4`, `18.5`, `18.6`, `19.4`, `19.6`, `19.8` | 21 |
| C | `1.3`, `1.5`, `3.3`, `4.4`, `4.5`, `5.5`, `6.3`, `7.4`, `8.4`, `8.6`, `9.2`, `9.3`, `11.4`, `12.4`, `12.5`, `13.2`, `13.3`, `13.4`, `14.4`, `15.1`, `15.2`, `15.3`, `15.4`, `16.5`, `19.5`, `19.7` | 26 |
| D | `3.4` | 1 |
|  | **Total** | **97** |

### Reconciliation checks

- Matrix rows: 97.
- Unique numbered IDs: 97.
- Duplicate primary assignments: 0.
- Missing verified numbered findings: 0.
- Category-B IDs included in candidate change sets: 21 of 21, exactly once.
- Category-C IDs included in review-decision queue: 26 of 26, exactly once.
- Category-D IDs included in authority-decision queue: 1 of 1.
- Separate non-numbered technical follow-ups: 1 (`E-1`), excluded from the 97-finding sum.

### READY FOR HUMAN DECISIONS?

**YES — CLASSIFICATION COMPLETE**

Implementation remains unauthorized. Human decisions are required for category C, authority resolution is required before any work on D-1, and accepted category-B change sets still require an authorized implementation phase.

# Human Decision Reconciliation — 2026-09-18

This appended section records the human decisions made after the classification above. The preceding classification, evidence, candidate change sets, counts, and historical conclusions remain the durable pre-decision baseline. This reconciliation is not course, Lesson, visual, control, implementation, or other current authority.

## Reconciliation boundary

- Category-A remains 49 preservation/regression invariants.
- Category-B remains 21 implementation-remediation candidates; none is implemented or converted into an authorized change set here.
- The 26 original Category-C items reconcile to 18 decided and 8 `TBD / DO NOT TOUCH` items.
- Category-D Finding `3.4` is decided at the decision level, but requires later authority maintenance before dependent implementation.
- The non-numbered technical follow-up `E-1` concerning exact historical deployment identity remains preserved and non-blocking.

## Category C — decided human reconciliation

### 1.3 — Trial-and-error remains possible

**Decision:** `DECIDED — KEEP` / no remediation.

Do not add artificial friction merely because the small relation catalog makes guessing possible. Preserve the learner’s responsibility to identify the relevant relations and preserve wrong selections as locally corrective and non-revealing.

### 1.5 — `bench` terminology

**Decision:** `DECIDED — CHANGE`.

Remove learner-facing `bench` terminology in favor of functional state language. The accepted learner-facing selected-state wording is `Added`.

This applies wherever the same learner-facing `bench` metaphor is used for the same functional role, but this reconciliation does not broaden implementation scope. Future authority maintenance is required before cross-course implementation relies on the broader terminology decision.

### 4.5 — Grain distractor quality

**Decision:** `DECIDED — CHANGE`.

Replace the weak `country` distractor with a more plausible distractor representing a genuine row-meaning misconception. Preserve the useful article/source-pair misconception. Exact replacement wording remains an implementation detail.

### 5.5 — `bench` language in baseline transition

**Decision:** `DECIDED — CHANGE`.

Use direct language about the measurement. Do not use a `bench` metaphor for the prepared measurement. Exact final copy may be determined during implementation within the accepted semantic requirement.

### 6.3 — Coordinated guidance/tool focus

**Decision:** `DECIDED — CHANGE` — accepted as an important course-wide visual principle.

At every moment it should be visually clear where the learner is currently working. When action moves between the instructional/guidance area and the active work surface:

- visual focus moves with the active task;
- the active instruction and active work surface read as the same current moment;
- the active work surface receives the strongest relevant visual priority; and
- previous/reference areas remain available but visually secondary.

This does not mandate dimming, borders, motion, animation, or any other specific technical treatment. Implementation treatment remains local to each encounter. Future maintenance in the appropriate current visual authority is required before cross-course implementation relies on this principle.

### 7.4 — Baseline interpretation MCQ

**Decision:** `DECIDED — CHANGE`.

Remove the separate MCQ. After the prepared measurement returns `18`, keep the interpretation explicit inline: the baseline is **18 article rows**. Then proceed directly into prediction. Do not leave `18` uninterpreted and do not require a separate multiple-choice gate merely to identify what was counted.

### 8.6 — Post-prediction visual

**Decision:** `DECIDED — CHANGE`.

After the learner has committed to the prediction, show a compact explanatory visual with this required conceptual meaning:

`1 article row → 1 matching source row → 1 result row`

Then scale that reasoning to the 18-row case. The visual must appear after learner engagement, not before the prediction, so it does not leak the answer. Coordinate it later with Category-B Finding `8.5`, which already requires the unit-bearing relational mechanism to be explained.

### 9.2 — Semantic-action evidence quality

**Decision:** `DECIDED — KEEP` / no remediation.

The current semantic-action gate provides sufficient evidence for its role in this guided first-JOIN encounter. Preserve meaning-before-JOIN-terminology. Do not add an additional gate merely to make the interaction harder.

### 9.3 — Semantic-action distractor quality

**Decision:** `DECIDED — KEEP` / no current remediation.

The current distractors do not require remediation in the present Lesson 1 scope. They may be polished in future work, but that is not an authorized change in the present remediation.

### 11.4 — `Map the condition` control

**Decision:** `DECIDED — CHANGE`.

Accepted replacement: `Map the condition` → `See how it fits together`.

The ON condition has already been shown; this control advances to the next explanatory layer rather than asking the learner to map a condition that is already present.

### 12.4 — SELECT wording

**Decision:** `DECIDED — CHANGE`.

Use this accepted semantic explanation:

> `FROM` starts from the article rows. `JOIN` brings in the matching source row. `ON` defines how the rows match. `SELECT` chooses which article and source fields appear in each result row. Because each article matches one source, the result remains one article per row.

Preserve the distinction that `SELECT` chooses visible attributes; it does not itself determine result Grain.

### 12.5 — Business request ↔ Grain equivalence

**Decision:** `DECIDED — CHANGE` under a course-wide semantic-precision principle.

Do not use a visual symbol that implies equivalence when the concepts are not equivalent. The business request informs/derives the requested row meaning; it is not identical to Grain. For the current Lesson 1 visual, do not retain the misleading `↔` equivalence treatment. The exact local visual remains an implementation detail, provided it expresses correct directional/derivational meaning.

Together with `19.5` and `19.7`, this records the broader accepted principle: learner-facing visual symbols and metaphors must not imply a relational operation, identity, or equivalence that is not actually true. Future maintenance in the appropriate current authority is required before broader implementation relies on that principle.

### 13.2 — Previous teaching beat disappears

**Decision:** `DECIDED — CHANGE`.

Previous explanations must not disappear as the learner progresses through the JOIN teaching sequence. They remain available and reviewable. The active explanation may have stronger visual focus than previous explanations.

### 13.3 — Compact prior beats

**Decision:** `DECIDED — CHANGE`.

Retain previous explanations as available/reviewable. This decision does not mandate a compact-card treatment: compression, visual quieting, or another local presentation remains an implementation detail, provided earlier explanations do not disappear.

### 13.4 — Learner-facing `Beat`

**Decision:** `DECIDED — CHANGE`.

Do not expose the instructional-design term `Beat` to the learner. Use functional/conceptual action labels instead. This reconciliation does not invent the final learner-facing labels; they may be settled during implementation within this boundary.

### 14.4 — `Workbench` terminology

**Decision:** `DECIDED — CHANGE`.

Accepted replacement: `Workbench` → `SQL workspace`.

Apply it consistently to the same learner-facing functional role. Do not perform cross-Lesson edits in this task.

### 19.5 — `+` connector semantics

**Decision:** `DECIDED — CHANGE` under the accepted semantic-precision principle.

Do not use `+` when it may imply arithmetic addition, concatenation, or stacking instead of row matching. The later local visual should express that matching rows contribute to a result row without implying the wrong relational operation. Exact connector and layout remain implementation details.

### 19.7 — `JOIN is the bridge`

**Decision:** `DECIDED — CHANGE` under the accepted semantic-precision principle.

Do not rely on `JOIN is the bridge` as the learner-facing explanation when direct relational language can state the mechanism. Prefer direct meaning such as JOIN combining rows that match the `ON` condition. Preserve the accepted schema-versus-instance distinction from Finding `19.2`.

## Category C — TBD / DO NOT TOUCH

These findings remain intentionally unresolved for the current remediation. Do not resolve, redesign, or include their proposed changes in later remediation scope unless a new explicit human decision is made.

| Finding | Status | Boundary |
|---|---|---|
| `3.3` | `TBD / DO NOT TOUCH` | Teacher/Cardinality-prompt duplication is non-blocking polish. |
| `4.4` | `TBD / DO NOT TOUCH` | Teacher/Grain-prompt duplication is non-blocking polish. |
| `8.4` | `TBD / DO NOT TOUCH` | Teacher/prediction-prompt duplication is non-blocking polish. |
| `15.1` | `TBD / DO NOT TOUCH` | Exact assistance-control behavior. |
| `15.2` | `TBD / DO NOT TOUCH` | First-nudge strength and escalation. |
| `15.3` | `TBD / DO NOT TOUCH` | Nudge behavior after successful SQL. |
| `15.4` | `TBD / DO NOT TOUCH` | Show-solution behavior after successful SQL. |
| `16.5` | `TBD / DO NOT TOUCH` | Post-success assistance/result competition where resolution depends on assistance lifecycle behavior. |

Do not derive an assistance-lifecycle policy from `15.1`–`15.4` or `16.5`.

## Category D — human authority decision

### 3.4 — One-to-many evidence sufficiency

**Decision:** `DECIDED — AUTHORITY MAINTENANCE REQUIRED`.

An FK→PK link alone does not establish full relationship Cardinality. Relationship fields establish what is connected. Cardinality is reasoned by considering possible multiplicity in both directions of the relationship, using the structural constraints and domain meaning available in the encounter.

The reusable reasoning questions are conceptually:

- for one X, how many Y can participate?
- for one Y, how many X can participate?

In Lesson 1, because Cardinality is a first exposure, both directions should be reasoned explicitly before formal Cardinality label/notation is introduced. In later Lessons, the same reasoning model may be reused more compactly rather than re-taught as first exposure.

Do not reduce this decision to `FKs can repeat`; a foreign key may itself be constrained unique. Do not rely on observed seed examples as the sole evidence for structural Cardinality.

### Authority consequence

This accepted decision resolves and changes current pedagogical authority. This review/planning artifact is not replacement authority. A later authorized authority-maintenance task must reconcile the appropriate current authority source(s) before implementation changes Cardinality evidence, prompt, or reveal behavior. No authority file is changed by this reconciliation.

## Category-C decision reconciliation table

Each original Category-C ID appears once in this table.

| Category-C ID | Reconciled status |
|---|---|
| `1.3` | `DECIDED — KEEP` |
| `1.5` | `DECIDED — CHANGE` |
| `3.3` | `TBD / DO NOT TOUCH` |
| `4.4` | `TBD / DO NOT TOUCH` |
| `4.5` | `DECIDED — CHANGE` |
| `5.5` | `DECIDED — CHANGE` |
| `6.3` | `DECIDED — CHANGE` |
| `7.4` | `DECIDED — CHANGE` |
| `8.4` | `TBD / DO NOT TOUCH` |
| `8.6` | `DECIDED — CHANGE` |
| `9.2` | `DECIDED — KEEP` |
| `9.3` | `DECIDED — KEEP` |
| `11.4` | `DECIDED — CHANGE` |
| `12.4` | `DECIDED — CHANGE` |
| `12.5` | `DECIDED — CHANGE` |
| `13.2` | `DECIDED — CHANGE` |
| `13.3` | `DECIDED — CHANGE` |
| `13.4` | `DECIDED — CHANGE` |
| `14.4` | `DECIDED — CHANGE` |
| `15.1` | `TBD / DO NOT TOUCH` |
| `15.2` | `TBD / DO NOT TOUCH` |
| `15.3` | `TBD / DO NOT TOUCH` |
| `15.4` | `TBD / DO NOT TOUCH` |
| `16.5` | `TBD / DO NOT TOUCH` |
| `19.5` | `DECIDED — CHANGE` |
| `19.7` | `DECIDED — CHANGE` |

| Reconciliation result | Count |
|---|---:|
| `DECIDED — KEEP` | 3 |
| `DECIDED — CHANGE` | 15 |
| **DECIDED total** | **18** |
| `TBD / DO NOT TOUCH` | 8 |
| `UNRESOLVED` | 0 |
| **Category-C total** | **26** |

## Relationship to Category B

A later remediation-planning step must:

1. retain all 49 Category-A preservation/regression invariants;
2. carry forward all 21 Category-B required remediation findings;
3. incorporate the accepted Category-C `CHANGE` decisions;
4. preserve Category-C `KEEP` decisions as non-remediation constraints;
5. exclude the 8 `TBD / DO NOT TOUCH` findings from current remediation scope;
6. perform required authority maintenance for `3.4` before dependent Cardinality implementation; and
7. re-evaluate change-set boundaries after those inputs are combined.

This is a record of future planning inputs, not a remediation plan. No change set is authorized or modified here.

## Final reconciliation checks

- Original verified-finding count remains 97.
- Original Category-A count remains 49.
- Original Category-B count remains 21.
- All 26 Category-C findings are reconciled once: 18 decided, 8 `TBD / DO NOT TOUCH`, and 0 unresolved.
- Finding `3.4` is decided, with authority maintenance pending.
- No `TBD / DO NOT TOUCH` item is resolved by implication.
- The existing technical follow-up on exact historical deployment identity remains non-blocking.

**YES — HUMAN DECISION RECONCILIATION COMPLETE**

**Implementation remains unauthorized. Authority maintenance for Finding 3.4 and a separate accepted remediation-planning step are still required before implementation.**
