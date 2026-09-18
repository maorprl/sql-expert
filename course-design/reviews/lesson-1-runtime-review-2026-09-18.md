# Lesson 1 Runtime Review — 2026-09-18

**Status:** REVIEW EVIDENCE — COMPLETE RUNTIME TEST DRIVE — NOT IMPLEMENTATION AUTHORITY  
**Repository:** `maorprl/sql-expert`  
**Learner-facing scope:** Lesson 1  
**Review type:** Runtime-first pedagogical / UX / conformance test drive  
**Date:** 2026-09-18

## Purpose

This document preserves the complete Lesson 1 runtime review produced through an end-to-end learner test drive.

It is review evidence, not implementation authority.

It must not be treated as permission to:
- change current canon;
- silently resolve OPEN decisions;
- promote NOT IN CANON findings into requirements;
- redesign Lesson 1 beyond the accepted findings;
- alter Lesson 2 or Lesson 3 merely because a Lesson 1 finding appears generalizable.

Before implementation, findings should be verified against the current repository and current source-of-truth documents, then classified into accepted change sets.

## Review method

Each learner state was evaluated through six lenses:

1. **Observation** — what the learner actually sees or does.
2. **Purpose** — what the current canon intends the state to accomplish.
3. **Relevant rules** — applicable lesson-local, course-wide, and visual/pedagogical authority.
4. **Canon status**
   - **CANON — WORKS**: current authority requires or permits the behavior and runtime implements it correctly.
   - **CANON — NOT WORKING**: current authority requires a behavior that runtime does not implement correctly or sufficiently.
   - **NOT IN CANON**: a review finding, UX proposal, or improvement not currently established as authority.
   - **CANON REVIEW NEEDED**: runtime may conform to current authority, but the test drive exposed a question about the authority itself.
5. **Actual test**
   - Can the correct answer be produced without the intended reasoning?
   - Has the answer been supplied or leaked?
   - Does the interaction assess the claimed capability?
   - Does it invite a misconception?
   - Is it necessary or duplicated?
   - Does the next state actually use what the learner established?
6. **Verdict** — preserve, change, remove, review, or authority gap.

Where a change is proposed, the review distinguishes:
**what breaks → which rule applies → minimal required delta**.

## Authority used during review

The review was checked against current authority including:

- `pedagogical-foundations.md`
- `course-design/stage-1/stage-1-learner-route.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`
- `course-design/course-visual-language.md`
- current source-of-truth hierarchy and work-management authority as applicable

The current accepted reasoning spine for Lesson 1 remains:

**business need → relevant relations → relationship → PK/FK → Cardinality → requested result Grain → baseline → prediction → semantic action → JOIN → ON → SQL implementation → result evidence → learner verification → completion**

This review does not authorize changing that sequence.

---

# 1. Entry and relation identification

### 1.1 Learner identifies the required relations

The learner must identify `news_article` and `news_source` from the business request rather than receiving them pre-resolved.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 1.2 Wrong-relation feedback

Wrong relation feedback remains local, meaning-first, and does not reveal the answer.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 1.3 Trial-and-error remains possible

With a small schema catalog, the learner could eventually discover the two relations through trial and error.

**Status:** NOT IN CANON  
**Verdict:** PASS WITH NOTE. This is not currently sufficient reason to change the interaction.

### 1.4 Meta-teaching entry copy

Entry copy such as describing the lesson plan ("we will make the request precise, then check the result...") spends teacher voice on process narration rather than the reasoning problem.

**Status:** CANON — NOT WORKING  
**Basis:** Teacher voice should primarily support reasoning purpose, interpretation, and genuinely new ideas rather than interface/process logistics.  
**Minimal delta:** Remove or rewrite meta-teaching language so the learner remains inside the business problem.

### 1.5 "Bench" terminology

Learner-facing labels such as:
- `on bench`
- `relations on the bench`
- `Workbench`

form an internal UI metaphor that the learner must decode.

**Status:** NOT IN CANON  
**Verdict:** GLOBAL REVIEW FINDING. Prefer explicit state language such as `Added` / `In Working Schema`.

Green success treatment would be compatible with current visual authority, but exact replacement wording is not canonical.

---

# 2. Connecting key and PK/FK

### 2.1 Connecting-key reasoning before PK/FK terminology

Only fields from `news_article` are actionable at the connecting-key step, and the learner must identify `news_article.news_source_id`.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 2.2 Wrong-column behavior

Selecting `news_article_id` or `title` keeps the relationship and PK/FK evidence hidden and allows retry.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 2.3 Correct connecting-key reveal

After the learner identifies `news_source_id`, the PK/FK relationship and connector are revealed.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 2.4 Prompt precision

A prompt framed as "which column answers who published this article?" is slightly imprecise because `news_source_id` identifies the related source rather than directly returning the publisher name.

**Status:** CANON — NOT WORKING  
**Minimal delta:** Frame the question as identifying which source published the article, e.g. "Which column in the article row identifies the source that published it?"

### 2.5 Premature JOIN terminology

In the runtime observed during the test drive, the PK/FK concept copy included language equivalent to:

> "That stored identity is the basis of the join."

JOIN terminology appears before the learner has made the required semantic action choice.

**Status:** CANON — NOT WORKING  
**Verdict:** Remove premature JOIN terminology from this state.

**Important traceability note:** this observed runtime copy did not match some inspected accepted/current repository sources. See the runtime/source mismatch section below.

---

# 3. Cardinality

### 3.1 Meaning before terminology

The learner answers the directional relationship question before Cardinality is named.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 3.2 Cardinality Concept Moment

Cardinality terminology and the `1 → M` representation appear only after correct reasoning.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 3.3 Duplicate teacher/prompt wording

Teacher guidance and the closed question substantially repeat the same proposition.

**Status:** NOT IN CANON  
**Verdict:** Review for compression. The teacher should orient the reasoning rather than echo the question.

### 3.4 Evidence sufficiency for one-to-many inference

The current authority explicitly says Cardinality should be reasoned from PK/FK structure rather than observed seed examples. The runtime shows FK→PK structure, but the test drive raises a question about whether the visible evidence is sufficient for the learner to infer that many article rows may reference the same source row.

**Status:** CANON REVIEW NEEDED  
**Verdict:** Do not change silently. Verify whether current authority intends the displayed PK/FK structure itself to be sufficient evidence or whether additional non-answer-leaking structural evidence is required.

---

# 4. Requested result Grain

### 4.1 Business request → row meaning

The learner is asked what one requested result row should represent.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 4.2 Grain terminology timing

The learner establishes "one news article per row" before the formal term Grain is introduced.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 4.3 Grain definition

The explanation that Grain is what one requested result row represents is correct and appropriately timed.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 4.4 Duplicate framing

Teacher copy and the learner-facing question repeat nearly the same wording.

**Status:** NOT IN CANON  
**Verdict:** Review for compression.

### 4.5 Distractor quality

"A combination of article and source" is a useful misconception-targeting distractor.  
"A country" is comparatively weak.

**Status:** NOT IN CANON  
**Verdict:** Preserve the useful misconception distinction; consider replacing weak distractors.

---

# 5. Grain → Baseline transition

This is one of the central Lesson 1 findings.

### 5.1 Prepared COUNT(*) measurement

A compact prepared `SELECT COUNT(*) FROM news_article` measurement is used rather than asking the learner to author SQL.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 5.2 Missing reason for measuring now

After the learner establishes one article per requested result row, the runtime moves to counting starting rows but does not make the instructional reason for this measurement sufficiently legible.

The learner is told what to do, but not why that measurement now matters to the reasoning argument.

**Status:** CANON — NOT WORKING  
**Basis:** Guided reasoning progression and the explicit requirement that the transition from result Grain → baseline must not feel like an unrelated new task.  
**Verdict:** CHANGE.

The minimal fix must make clear why a starting row count is needed before the later prediction, without supplying the prediction itself.

### 5.3 "Starting point" ambiguity

Language such as "measure the starting point" does not specify the starting point of what.

**Status:** CANON — NOT WORKING  
**Verdict:** Rewrite for reasoning precision.

### 5.4 Meta measurement copy

Language such as "this is measurement, not SQL to learn" explains instructional administration rather than why the learner needs this evidence.

**Status:** CANON — NOT WORKING  
**Verdict:** Replace with reasoning-purpose guidance.

### 5.5 Bench language in baseline transition

"Prepared line on the bench" inherits the global learner-facing bench terminology issue.

**Status:** NOT IN CANON  
**Verdict:** Cross-cutting candidate.

### 5.6 Sequence itself

Current Lesson 1 authority explicitly fixes the local order as:

**Grain → baseline → prediction**

The review must not reorder this sequence simply because the transition currently feels weak.

**Status:** CANON REVIEW NEEDED only if continuity cannot be repaired within the accepted order.  
**Verdict:** First attempt to repair continuity without altering sequence.

---

# 6. Visual focus during baseline

### 6.1 Baseline as active surface

When the learner must run the prepared measurement, the measurement tool should become the strongest action surface.

The observed runtime leaves the Working Schema comparatively prominent.

**Status:** CANON — NOT WORKING  
**Basis:** Current learner focus / attention choreography.  
**Verdict:** Strengthen baseline focus and quiet supporting schema reference.

### 6.2 Cross-region handoff

The move from teacher guidance in the learner-response lane to the measurement tool is not always visually explicit enough.

**Status:** CANON — NOT WORKING  
**Verdict:** Improve handoff so the active guidance and active tool read as one current task.

### 6.3 Coordinated dual focus

A coordinated highlight/treatment of active left-side guidance plus active right-side measurement is a candidate solution.

**Status:** NOT IN CANON  
**Verdict:** Candidate implementation only; exact visual treatment remains open.

---

# 7. Baseline execution and interpretation

### 7.1 Run → evidence → interpretation

The learner runs the prepared measurement, sees 18, and immediately interprets what 18 represents.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 7.2 Evidence locality

The returned evidence remains visible during immediate interpretation.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 7.3 "A number only helps if we know what it counts"

This creates a meaningful reason for the interpretation move.

**Status:** CANON — WORKS  
**Verdict:** Preserve the reasoning function.

### 7.4 Baseline interpretation MCQ

The closed question distinguishing 18 articles / sources / companies / dates is highly discriminable from the query itself and may function as near-ceremony rather than strong evidence.

**Status:** NOT IN CANON  
**Verdict:** Review finding. Do not remove the required interpretation itself; consider whether a separate quiz is necessary.

This aligns with prior external review evidence that the baseline interpretation interaction may be near-non-discriminating ceremony.

---

# 8. Prediction

### 8.1 Required premises are available

Before prediction, the learner has:
- 18 starting article rows;
- one requested result row per article;
- one matching source per article.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 8.2 Prediction is learner reasoning

The learner must infer that the row count remains 18 rather than receiving the result in advance.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 8.3 Distractor structure

The alternatives distinguish:
- one result row per article;
- collapsing to one row per source;
- row multiplication.

**Status:** CANON — WORKS  
**Verdict:** Preserve the distinction.

### 8.4 Teacher/prompt duplication

The teacher sentence and the question repeat the same task.

**Status:** NOT IN CANON  
**Verdict:** Review for compression.

### 8.5 Prediction explanation mechanism

The explanation after a correct answer should express the relational mechanism with units, not only arithmetic.

Preferred meaning:

**18 article rows × 1 matching source row per article row = 18 matching pairs → 18 result rows**

or equivalent prose:

**Each of the 18 article rows matches exactly one source row, so each article contributes one result row; therefore the result remains 18 rows.**

**Status:** Current canon requires the continuous reasoning chain; exact wording is NOT IN CANON.  
**Verdict:** Ensure explanation communicates mechanism, not merely `18 × 1 = 18`.

### 8.6 Post-prediction visual

The review strongly favors a compact explanatory visual after the learner answers:

**1 article row → 1 matching source row → 1 result row**, then scale to 18.

This should appear only after learner engagement so it does not leak the answer.

**Status:** NOT IN CANON  
**Verdict:** Strong review proposal. Current canon already requires a row-level visual later in JOIN teaching, but not specifically here.

---

# 9. Semantic relational action

### 9.1 Meaning before JOIN terminology

The learner chooses the semantic operation before JOIN is named.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 9.2 Evidence quality

The correct option is close to wording already used throughout the lesson, so the interaction risks becoming recognition rather than a strong reasoning check.

**Status:** NOT IN CANON  
**Verdict:** PASS WITH NOTE / review.

### 9.3 Distractor quality

Filter / aggregate / stack are not equally plausible alternatives.

**Status:** NOT IN CANON  
**Verdict:** Review distractors, but do not remove the semantic-action gate merely because it is lightweight.

This aligns with prior external review evidence that the interaction may border on vocabulary recognition while still serving an important meaning-before-terminology transition.

---

# 10. JOIN introduction — matching rows

### 10.1 JOIN timing

JOIN is formally named only after the learner has chosen the semantic action.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 10.2 Row-level visual

A local example shows one article row matching one source row.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 10.3 Active teaching focus

JOIN teaching becomes the dominant instructional surface while prior evidence becomes quieter.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 10.4 "Predicted grain"

The runtime uses language equivalent to "preserves the grain you predicted."

This is conceptually wrong:
- Grain was **established** earlier.
- The **row count** was predicted.

**Status:** CANON — NOT WORKING  
**Verdict:** GLOBAL TERMINOLOGY CORRECTION.

The correct conceptual distinction should remain consistent anywhere this idea appears:
**established result Grain + predicted row count**.

---

# 11. JOIN teaching — ON

### 11.1 Match → SQL condition progression

The teaching sequence moves from a row match to expressing the established relationship in SQL.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 11.2 Relationship reuse

The ON condition reuses the already-established PK/FK relationship.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 11.3 "The relationship becomes ON"

The relationship does not literally become ON.

ON expresses the match condition derived from the relationship.

**Status:** CANON — NOT WORKING  
**Verdict:** Rewrite with meaning consistent with current authority, e.g. "Express the relationship as the ON condition" / "Tell SQL how the rows match."

### 11.4 "Map the condition" control

If the condition is already fully displayed and the button only advances the teaching state, the label suggests an action the learner is not actually performing.

**Status:** NOT IN CANON  
**Verdict:** UX/control-label review.

---

# 12. JOIN teaching — full query mapping

This is the largest implementation gap in the current JOIN teaching sequence.

### 12.1 Business request reconnection

The teaching returns to the business request before learner-authored SQL.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 12.2 Grain remains available

The requested result Grain remains present as established reasoning.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 12.3 Missing full-query mapping

Current authority explicitly requires a pre-authoring mapping covering:

- requested attributes → `SELECT`;
- starting article rows → `FROM news_article`;
- adding matching source information → `JOIN news_source`;
- established relationship → `ON ...`.

The observed "full query" teaching state does not visibly complete that mapping.

**Status:** CANON — NOT WORKING  
**Verdict:** MAJOR CHANGE REQUIRED.

### 12.4 SELECT wording

Language equivalent to "selected columns return every article" is misleading because SELECT determines output columns but does not itself guarantee row coverage.

**Status:** NOT IN CANON  
**Verdict:** Rewrite for semantic precision.

### 12.5 Business request ↔ Grain equivalence

A visual double-arrow between the business request and result Grain can imply equivalence between two different concepts.

**Status:** NOT IN CANON  
**Verdict:** Review visual semantics.

---

# 13. Teaching-beat presentation

### 13.1 Progressive exposure

The three JOIN teaching parts are revealed progressively rather than presented simultaneously as co-primary content.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 13.2 Previous beat disappears

The current authority explicitly leaves the treatment of prior JOIN teaching beats open:
- hidden;
- replaced;
- retained as compact reminders.

Therefore replacing prior beats is not a canon violation.

**Status:** NOT IN CANON / OPEN implementation decision  
**Verdict:** No conformance defect.

### 13.3 Compact prior beats

Because the argument is cumulative:

**row match → ON condition → full query**

the review favors retaining earlier teaching parts as compact completed reminders while the current part remains active.

**Status:** NOT IN CANON  
**Verdict:** Review proposal only.

### 13.4 Learner-facing "Beat"

`BEAT 1`, `BEAT 2`, `BEAT 3` expose instructional-design jargon rather than concepts the learner needs to understand.

**Status:** NOT IN CANON  
**Verdict:** Remove or replace with conceptual action labels such as:
- Match the rows
- Express the match
- Build the query

Exact labels remain open.

---

# 14. SQL authoring

### 14.1 Clean implementation editor

The learner receives a separate clean SQL editor rather than inheriting the baseline COUNT(*) state.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 14.2 SQL becomes primary action surface

The editor becomes primary only after the teaching climax.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 14.3 "Make the argument executable"

This correctly frames SQL as implementation of prior relational reasoning.

**Status:** CANON — WORKS  
**Verdict:** Preserve the function.

### 14.4 Workbench terminology

"The Workbench is yours now" continues the learner-facing bench metaphor.

**Status:** NOT IN CANON  
**Verdict:** Cross-cutting terminology finding.

### 14.5 "Preserves the grain you predicted"

Again confuses established Grain with predicted row count.

**Status:** CANON — NOT WORKING  
**Verdict:** Fix consistently with the global terminology distinction.

### 14.6 Inherited readiness gap

Because the previous full-query teaching state did not complete the required SELECT/FROM/JOIN/ON mapping, the learner reaches authoring without all canonical pre-authoring preparation being visibly completed.

**Status:** CANON — NOT WORKING  
**Verdict:** Fix the prior teaching state rather than compensating by overloading the authoring screen.

### 14.7 Placeholder reuse

A placeholder that refers to already-established relations and JOIN does not leak new answers at this point.

**Status:** CANON — WORKS  
**Verdict:** Acceptable reuse of established reasoning.

---

# 15. Assistance: nudge and solution

### 15.1 Assistance controls exist

Nudge and solution controls are available during authoring.

**Status:** Current exact assistance behavior remains partially open.  
**Verdict:** Not automatically a defect.

### 15.2 First nudge strength

The observed nudge supplies:
- starting relation;
- JOIN relation;
- FK/PK comparison;
- ON.

This is a strong scaffold and leaves little remaining structure for the learner to produce.

**Status:** NOT IN CANON / OPEN assistance design  
**Verdict:** Review finding.

This confirms prior external review evidence that the first nudge is too strong and lacks meaningful escalation.

### 15.3 Nudge after success

Opened assistance remains visually active after successful SQL execution.

**Status:** NOT IN CANON  
**Verdict:** Prefer compact/reviewable treatment after success so result evidence becomes primary.

### 15.4 Show solution after success

The solution control remains available even after successful execution.

**Status:** NOT IN CANON  
**Verdict:** Review whether it should disappear, disable, or otherwise lose active status after success.

---

# 16. Successful execution and result evidence

### 16.1 SQL and result stay together

The executed query and returned result remain within one coherent workspace.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 16.2 Row count is visible

The runtime shows 18 rows returned.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 16.3 Actual result is inspectable

All 18 article/source rows are inspectable rather than reduced to an opaque success state.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 16.4 Semantic validator status

The runtime shows a status equivalent to:

> Verified · result satisfies the task

**Status:** CANON — WORKS  
**Correction recorded during review:** current Lesson 1 authority explicitly permits the system to report that semantic validation established that the SQL result satisfies the required task/result contract.

This status is acceptable **provided it does not also interpret for the learner**:
- why one article per row was preserved;
- how the result relates to the earlier prediction;
- what relational meaning should be concluded.

### 16.5 Assistance competing with result

After successful execution, open assistance continues to occupy attention while the result should become the primary evidence surface.

**Status:** Current visual authority supports result evidence becoming primary; exact assistance-collapse behavior is NOT IN CANON.  
**Verdict:** Review the post-success visual hierarchy.

---

# 17. Final verification

### 17.1 Execution is not completion

Successful SQL execution does not by itself complete the lesson.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 17.2 Teacher reconnects to prior prediction

The teacher explicitly asks the learner to read the result against the earlier prediction.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 17.3 "The result is evidence now, not the conclusion"

This correctly distinguishes machine-validated result evidence from learner interpretation.

**Status:** CANON — WORKS  
**Verdict:** Strong wording/function.

### 17.4 Closed final verification

A closed verification interaction asks the learner to interpret the result.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 17.5 "Visible result supports"

The prompt language equivalent to:

> Select every claim the visible result supports

is too narrow.

The final verification is supposed to integrate:
- actual result evidence;
- the earlier prediction;
- the established requested-result Grain.

The visible table alone does not independently establish all required interpretations.

**Status:** CANON — NOT WORKING  
**Verdict:** Rewrite so the learner explicitly compares the actual result with the earlier prediction and established Grain.

### 17.6 Verification answer structure

The three intended correct claims form a useful progression:
1. 18 result rows;
2. one article per row;
3. source information was added without changing the result Grain.

**Status:** CANON — WORKS as a synthesis structure, assuming prompt framing is corrected.  
**Verdict:** Preserve.

---

# 18. Completion

### 18.1 Completion follows learner verification

The lesson closes only after the learner correctly interprets the result.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 18.2 Green success treatment

Green is used for successful verification/completion.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 18.3 "SQL is not the conclusion by itself"

The completion message reinforces the course's reasoning-first purpose.

**Status:** CANON — WORKS  
**Verdict:** Preserve the idea.

### 18.4 "Predicted the row count and grain"

The completion copy again says or implies that both row count and Grain were predicted.

**Status:** CANON — NOT WORKING  
**Verdict:** Global terminology fix:
- Grain was established;
- row count was predicted;
- result later confirmed consistency with both.

### 18.5 "CONCEPT — JOIN verified"

JOIN is not a newly introduced concept at completion. Using Concept Moment treatment for "JOIN verified" conflates concept introduction with verification/success.

**Status:** CANON — NOT WORKING  
**Basis:** Grain, PK/FK, Cardinality, and JOIN are Concept Moments when concepts are named; concept styling must remain distinct from correctness/success.  
**Verdict:** Use a verification/consolidation role rather than a new Concept Moment.

### 18.6 Administrative transcript-style synthesis

Completion copy listing:
relations, link, cardinality, grain, baseline, prediction, JOIN, ON, SQL, etc.
reads like an implementation-state transcript rather than the logic of the learner's argument.

**Status:** CANON — NOT WORKING  
**Basis:** The reasoning thread should be ordered by the logic of the argument, not quiz identifiers or implementation-state names.  
**Verdict:** Rewrite completion as a coherent reasoning synthesis.

### 18.7 Closing result meaning

The statement that source attributes were added while the result remained one row per article correctly captures the Lesson 1 gist.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 18.8 Next-lesson navigation

The continuation control is ordinary post-completion navigation.

**Status:** CANON — WORKS / PASS  
**Verdict:** No issue identified.

---

# 19. Optional enrichment

### 19.1 Placement after the core lesson

Enrichment appears after core completion and is not required learner evidence.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 19.2 Schema vs instance distinction

The statement:

> The schema tells us which relationships are possible. The instance shows which matches actually occur.

is a strong distinction between schema-level relationship structure and actual row matching.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

### 19.3 Row-to-result explanatory model

Using one article row + one matching source row → one result row is appropriate for the lesson.

**Status:** CANON — WORKS in purpose  
**Verdict:** Preserve concept.

### 19.4 Result-row visual is not legible

The observed result-row representation is too narrow/broken to make the contribution of `title` and source name visibly understandable.

**Status:** CANON — NOT WORKING  
**Basis:** Current Lesson 1 authority requires the contribution of article title and source-name information to be visibly connected to one resulting row.  
**Verdict:** Fix the visual.

### 19.5 Plus-sign semantics

Using `+` between the two source rows may suggest arithmetic addition, concatenation, or stacking rather than relational matching.

**Status:** NOT IN CANON  
**Verdict:** Review visual semantics; converging match arrows would be clearer.

### 19.6 "ON names the relationship"

ON does not name the relationship.

It expresses the match condition used by SQL.

**Status:** CANON — NOT WORKING  
**Verdict:** Rewrite for semantic accuracy.

### 19.7 "JOIN is the bridge"

"JOIN is the bridge between schema relationship and instance matches" is metaphorical and less precise than the rest of the explanation.

**Status:** NOT IN CANON  
**Verdict:** Copy review.

### 19.8 "What the result preserves: one row per article"

Without local qualification, this can sound like a general property of JOIN rather than a property of this query and relationship.

**Status:** CANON — NOT WORKING / generalization risk  
**Verdict:** Qualify explicitly, e.g. "In this query, the result preserves one row per article."

### 19.9 Venn limitation

The enrichment correctly limits Venn-style explanations to inclusion/exclusion and states that they do not explain Grain or row multiplication.

**Status:** CANON — WORKS  
**Verdict:** Preserve.

---

# 20. Cross-cutting candidates surfaced by Lesson 1

The following findings may be relevant beyond Lesson 1, but **must not be promoted to course-wide rules without a scope audit** across accepted Lesson 1–2 runtime, shared components, and current Lesson 3 authority/specification.

## 20.1 Established vs predicted vs verified terminology

Observed recurring confusion:
- Grain described as "predicted";
- row count and Grain collapsed into one prediction.

Candidate course-wide distinction:
- **established** = learner has reasoned/defined a meaning or relationship;
- **predicted** = learner anticipates behavior/result before execution;
- **verified/confirmed** = later evidence is interpreted against the earlier expectation.

**Lesson 1 status:** CANON — NOT WORKING where Grain is called predicted.  
**Course-wide status:** Scope audit required.

## 20.2 Learner-facing workspace metaphors

`bench`, `on bench`, `Workbench` may be historical/internal UI vocabulary leaking into learner-facing copy.

**Lesson 1 status:** NOT IN CANON review finding.  
**Course-wide status:** Scope audit required.

## 20.3 Teacher vs prompt duplication

Several states present teacher guidance and a learner-facing question that substantially repeat one another.

**Lesson 1 status:** NOT IN CANON review finding, with course-wide teacher-voice principles potentially relevant.  
**Course-wide status:** Scope audit required.

## 20.4 Attention choreography

When the active task moves between learner-response lane and tool/evidence surfaces, the handoff should be visually obvious and persistent references should become quieter.

**Lesson 1 status:** existing course visual authority applies; runtime is inconsistent in some states.  
**Course-wide status:** likely shared authority, but implementation scope must be audited.

## 20.5 Concept vs correctness/success roles

Concept Moments, correctness, result validation, and completion should remain visually and semantically distinct.

**Lesson 1 status:** `CONCEPT — JOIN verified` conflicts with current authority.  
**Course-wide status:** existing visual-language authority likely applies; runtime scope must be audited.

## 20.6 Assistance lifecycle

Open questions include:
- escalation strength;
- nudge vs solution distinction;
- behavior after successful execution;
- cross-lesson consistency.

**Lesson 1 status:** largely NOT IN CANON / open assistance design, with review evidence that the first nudge is too strong.  
**Course-wide status:** Scope audit required.

## 20.7 Completed/reviewable reasoning

Completed evidence-bearing reasoning should remain inspectable but visually quieter than the current task.

**Lesson 1 status:** existing canon.  
**Course-wide status:** existing course-level principle; implementation consistency should be audited.

## 20.8 Learner-facing instructional-design jargon

Terms such as `Beat` may describe implementation/design structure rather than learner concepts.

**Lesson 1 status:** NOT IN CANON review finding.  
**Course-wide status:** Scope audit required.

---

# 21. Runtime / source mismatch

A material traceability issue was identified during the test drive.

Several learner-facing strings observed in screenshots did not match either:
- the previously accepted Lesson 1 runtime baseline inspected during review, or
- current `main` source inspected during review.

Examples included wording around:
- PK/FK explanation;
- JOIN teaching;
- ON teaching;
- learner-facing "Beat" labels.

This means the exact runtime build under test cannot be assumed to correspond to the expected repository revision.

**Status:** TECHNICAL / TRACEABILITY FINDING  
**Priority:** Resolve before implementation work.

Required next step:
1. identify the exact deployed/runtime revision used in the test drive;
2. map it to repository source;
3. determine whether the mismatch is deployment drift, uncommitted/local code, stale deployment, branch divergence, or another source;
4. only then use code locations as implementation targets.

Do not "fix" source that may not actually be producing the reviewed runtime.

---

# 22. Corrections recorded during the review

The review process itself corrected several earlier interpretations. These corrections are part of the durable evidence and should not be lost.

## 22.1 Semantic validator status is allowed

Earlier concern: `Verified · result satisfies the task` might preempt learner verification.

Correction:
Current Lesson 1 authority explicitly permits the system to report that semantic validation established that the result satisfies the task/result contract.

It becomes a violation only if system status performs the later learner interpretation:
- why Grain was preserved;
- how result evidence relates to prediction;
- what relational conclusion should be drawn.

Final status: **CANON — WORKS** for the observed semantic-validation status.

## 22.2 Previous JOIN teaching beats may be replaced

Earlier concern: replacing a prior JOIN teaching beat might violate reviewability.

Correction:
Current Lesson 1 authority explicitly leaves prior-beat treatment open:
- hidden;
- replaced;
- retained compact.

Final status:
- replacement itself is **not a canon violation**;
- retaining compact prior beats remains a **NOT IN CANON review proposal**.

## 22.3 Grain → baseline order is canonical

Earlier alternative considered: moving qualitative prediction ahead of baseline.

Correction:
Current Lesson 1 authority explicitly fixes local order as Grain → baseline → prediction.

Final status:
- do not reorder during implementation without authority change;
- first repair continuity inside the accepted order;
- raise CANON REVIEW NEEDED only if the accepted sequence itself proves irreparable.

## 22.4 Screenshot crop is not runtime duplication evidence

Some screenshots included prior content because of viewport/crop context.

Correction:
Do not classify visual overlap caused only by screenshot framing as runtime duplication.

---

# 23. Review synthesis

Lesson 1 does **not** require wholesale reconstruction.

Its reasoning spine is substantially sound:

**business need → relations → relationship → PK/FK → Cardinality → requested Grain → baseline → prediction → semantic action → JOIN → ON → SQL → evidence → verification**

The strongest issues cluster into a small number of underlying themes rather than dozens of independent bugs:

1. **Guided continuity**
   - especially Grain → Baseline;
   - some cross-region handoffs.

2. **Incomplete JOIN teaching climax**
   - specifically the missing full SELECT/FROM/JOIN/ON mapping before authoring.

3. **Semantic terminology precision**
   - established Grain vs predicted row count;
   - relationship does not "become ON";
   - ON does not "name" the relationship.

4. **Teacher/UI language noise**
   - bench/workbench metaphor;
   - learner-facing Beat terminology;
   - teacher/prompt duplication.

5. **Assistance quality/lifecycle**
   - first nudge is too strong;
   - post-success assistance remains active.

6. **Visual explanatory quality**
   - active tool/evidence focus;
   - optional enrichment result-row visual;
   - possible post-prediction mechanism visual.

The appropriate next step is **not implementation**.

The next step is to verify this review artifact against the current repository and current canon, map each finding to actual code/state/component ownership, and only then classify accepted findings into:
- course-wide change sets;
- Lesson 1 local change sets;
- canon-review items;
- rejected/deferred review proposals.

---

# 24. Recommended verification task for the next agent

The next repository task should be **audit/traceability only**.

The agent should:

1. Read this review first.
2. Treat it as review evidence, not implementation authority.
3. Read the current source-of-truth hierarchy and current Lesson 1/course-wide authority.
4. Verify every finding against the current repository.
5. Map each finding to:
   - current canon basis;
   - runtime state;
   - code/component/file ownership;
   - current validity.
6. Identify any finding that no longer matches current repository state.
7. Identify the source of the runtime/repository mismatch.
8. Preserve each finding independently; do not silently merge, drop, reinterpret, or generalize findings.
9. Do not modify code.
10. Do not modify canon.
11. Do not resolve OPEN / NOT IN CANON matters.
12. Do not infer course-wide scope merely from a Lesson 1 occurrence.

Only after that verification should change-set planning begin.

---

# 25. Future regression-protection note

No regression suite is authorized by this review alone.

When a finding is later accepted as an implementation requirement, its change set should define the appropriate verification mechanism:

- automated state/interaction test;
- semantic validator test;
- static/content assertion;
- visual regression;
- scripted runtime walkthrough;
- human pedagogical acceptance check.

Not every pedagogical requirement is machine-testable. The goal is not "one unit test per finding"; the goal is a defined method of proof for every accepted requirement.
