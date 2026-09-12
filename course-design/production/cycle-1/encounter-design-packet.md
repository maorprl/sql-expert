# Cycle 1 — Encounter Design Packet

## Design-status key

**SOURCE-REQUIRED** — constrained by current course authority, verified data, or the approved Cycle 1 handoff.

**DESIGN / PROFESSIONAL JUDGMENT** — local Encounter Design choice. It is not being promoted to course-wide authority.

**OPEN / OWNER DECISION** — remains unresolved and is not silently decided here.

---

## 1. Target capability

**SOURCE-REQUIRED**

Given a **known one-to-many relationship** and an established starting Grain, the learner must predict **before execution** that joining from the one side to many-side detail can:

- create multiple result rows per starting entity;
- repeat information from the one-side entity;
- change the natural relational-result Grain;

and then explain the observed multiplication through the relationship structure rather than as accidental duplicate data. fileciteturn2file0L2-L2

This directly advances the Exit Criteria requiring prediction of relational row effects and recognition of fan-out caused by Cardinality. fileciteturn7file0L2-L2

---

## 2. Approved case

**SOURCE-REQUIRED**

Use the existing relationship:

`news_source → news_article`

from the **one side toward the many side**.

Verified facts:

- `news_source.news_source_id` is the source PK.
- `news_article.news_source_id` is a `NOT NULL` FK to it.
- each article has one source;
- one source can have many articles;
- the current seed contains 4 sources and 18 articles;
- current source article counts are 5, 6, 5, and 2;
- the corresponding INNER JOIN produces 18 matches;
- there are no unmatched seeded sources, so the case does not simultaneously introduce missing-row or NULL reasoning. fileciteturn17file0L2-L2

The schema and seed independently contain that relationship and data. fileciteturn15file0L2-L2 fileciteturn16file0L521-L565

---

## 3. Course-Assumed Learner State

**SOURCE-REQUIRED**

The course may assume, with the limitations below:

- Grain has been introduced and exercised in a constrained case.
- Cardinality has been introduced and directionally reasoned about.
- PK/FK has been introduced and used.
- JOIN matching semantics have been introduced.
- the learner has authored an INNER JOIN in the Stage 1 case.
- prediction before execution and result verification have been practised in that case.
- relation identification has been practised in one constrained case.
- none of those claims establishes broad cumulative transfer or mastery.
- one-to-many row multiplication / fan-out has **not** yet been established.
- aggregation, pre-aggregation, EXISTS, LEFT JOIN/NULL behavior and multiple-branch fan-out have not been established. fileciteturn17file0L2-L2

The encounter therefore reuses earlier concepts without pretending that the learner has demonstrated general transfer.

---

## 4. What is reused without re-teaching

**SOURCE-REQUIRED + DESIGN / PROFESSIONAL JUDGMENT**

The encounter reuses:

- Grain;
- PK/FK;
- Cardinality;
- the known `news_source ↔ news_article` relationship;
- the meaning of matching rows in JOIN;
- INNER JOIN vocabulary and basic syntax;
- result inspection against a prior prediction.

These are not presented again as first-exposure Concept Moments. Stage 1 is explicitly the first-JOIN teaching encounter, and later encounters must not automatically repeat its full scaffold. fileciteturn9file0L2-L2

**DESIGN / PROFESSIONAL JUDGMENT:** relation identification is not reassessed in this encounter. The relation pair is supplied as established context so the new evidence isolates the row-multiplication capability. Phase 1 explicitly found relation identification non-intrinsic to this narrow capability. fileciteturn17file0L2-L2

---

## 5. Concrete learner situation

**DESIGN / PROFESSIONAL JUDGMENT**

The research team has a **source-level coverage review**. Its purpose is to review publishing sources, so each source is supposed to appear **once**.

A teammate proposes:

> Add article titles to the review by directly joining `news_source` to `news_article`.

Before the report is changed, the learner is asked to determine whether that direct JOIN is compatible with the report's source-level structure.

This is intentionally a **relational safety decision before implementation**, not an invitation to repair the report with a later SQL mechanism.

The business tension is concrete:

- the report is source-level;
- article titles are article-level detail;
- a direct one-to-many JOIN is being proposed;
- the analyst must determine what that operation will actually do before accepting it.

---

## 6. Learner goal

**DESIGN / PROFESSIONAL JUDGMENT**

Determine whether the proposed direct JOIN preserves the intended source-level output.

To do that, the learner must:

1. establish what the requested output row represents;
2. use the already-known 1:M relationship to predict the raw JOIN's row behavior;
3. distinguish the intended Grain from the JOIN's natural Grain;
4. predict repeated source information before running SQL;
5. execute the proposed JOIN only after that prediction;
6. reconcile the actual result with the relational prediction.

The goal is **not** merely “write a JOIN.”

---

## 7. Requested business output

**DESIGN / PROFESSIONAL JUDGMENT**

The requested business artifact is the existing **source-level coverage review**:

> each publishing source should appear once.

The proposed addition of article detail is being evaluated for compatibility with that requirement.

The encounter does **not** require the learner to solve how all article detail should ultimately be represented while preserving one source per row. Doing so would pull the encounter toward aggregation, pre-aggregation, collection/concatenation, existence logic, or another mechanism outside the approved scope.

---

## 8. Starting Grain

**SOURCE-REQUIRED**

Starting/input Grain:

> **one news source per row**

The starting relation is `news_source`.

The current seed contains four source rows. fileciteturn17file0L2-L2

---

## 9. Requested output Grain

**DESIGN / PROFESSIONAL JUDGMENT**

Requested business-output Grain:

> **one news source per row**

The learner must derive this from the business situation — “review each publishing source once” — rather than being told that Cardinality determines it.

The learner answers a constrained question such as:

> In the requested review, what should one row represent?

with materially distinct options such as:

- one publishing source;
- one news article;
- one source–article match.

Correct answer: **one publishing source**.

This reuses Grain as an already introduced concept rather than teaching it again.

---

## 10. Natural relational-result Grain

**SOURCE-REQUIRED relational behavior + DESIGN wording**

For the proposed raw JOIN:

> **one matching source–article pair per result row**

Because each `news_article` belongs to one source, this can also be understood in this dataset as:

> **one news article, together with its source information, per result row**

That is not the same Grain as the requested one-source-per-row output.

The natural raw result contains 18 rows in the current seed, while source information repeats according to the number of matching articles. fileciteturn17file0L2-L2

---

## 11. Why the situation genuinely requires the approved reasoning

**SOURCE-REQUIRED + DESIGN / PROFESSIONAL JUDGMENT**

A learner cannot answer the actual decision merely by:

- recalling that there are 18 articles;
- recognizing the relation pair;
- saying the relationship is 1:M;
- producing valid JOIN syntax.

The decisive question is:

> If my requested output must remain one source per row, what happens when each source can match several article rows?

The learner has to connect:

**requested Grain → 1:M match structure → one result row per match → repeated sources → different natural result Grain**

That chain is the uncovered capability approved by the gate. The gate explicitly warned that evidence reducible to “4 becomes 18” would be insufficient. fileciteturn2file0L2-L2

---

## 12. Learner route

**DESIGN / PROFESSIONAL JUDGMENT**

### Episode A — Establish the requested output

Present the source-level business situation and the proposal to add article detail.

The learner identifies that the requested output remains **one source per row**.

No JOIN result or fan-out terminology is shown yet.

### Episode B — Predict the proposed JOIN

The Working Schema shows the already-known `news_source 1 → M news_article` relationship.

A compact current-data reference may state:

- 4 source rows;
- 18 article rows;
- each article belongs to one source.

The learner completes one prediction interaction containing three connected judgments:

- Can one source contribute more than one raw JOIN row? **Yes.**
- What will one raw JOIN row naturally represent? **One source–article match.**
- What happens to source information? **It repeats once for each matching article.**

Only after those structural judgments are correct does the learner predict the current result count of **18**.

### Episode C — Name the behavior

After the learner has derived the behavior, introduce the new term:

> **Fan-out**

Attach the term to the meaning already established:

> A one-side row can fan out into several result rows when it matches several many-side rows.

The Concept Moment also explicitly distinguishes:

- repeated source information;
- duplicate source rows in the base table.

### Episode D — Test the prediction in SQL

The learner implements the **proposed direct INNER JOIN**.

The SQL task is a verification tool for the already-made relational prediction, not the organizer of the encounter.

A simple diagnostic result should expose source and article detail, for example:

`source_name | article_title`

Equivalent column aliases may be accepted as long as the required semantic evidence remains visible.

### Episode E — Reconcile result with prediction

After execution, keep the result visible.

The learner answers a final constrained verification interaction:

- Why do source names repeat?
- Does the raw result still have one source per row?
- What does one returned row naturally represent?

Only after correct verification does feedback close the loop:

> The multiplication was predicted from the one-to-many relationship. The repeated source values are structural repetition across distinct source–article matches, not accidental duplicate source rows.

No method for restoring one-source-per-row output is taught here.

---

## 13. Reasoning progression

**DESIGN / PROFESSIONAL JUDGMENT**

The continuous reasoning chain is:

**business report should contain each source once**  
→ requested Grain = one source  
→ known relationship = one source can match many articles  
→ JOIN produces a row for each match  
→ therefore one source can contribute several result rows  
→ source attributes repeat  
→ natural raw-result Grain becomes source–article match  
→ raw JOIN is incompatible with the requested one-source-per-row structure  
→ execute  
→ inspect  
→ explain observed 18-row result through the relationship.

This preserves the guided-reasoning continuity required by current pedagogical foundations without performing the reasoning for the learner. fileciteturn9file0L2-L2

---

## 14. Learner actions

**DESIGN / PROFESSIONAL JUDGMENT**

The learner must actively:

- identify the requested output Grain from the business situation;
- apply the visible 1:M relationship to the proposed JOIN;
- predict multiple rows per source;
- predict repeated one-side information;
- identify the natural result-row meaning;
- commit to that prediction before execution;
- implement/run the proposed direct JOIN;
- inspect the returned rows;
- distinguish structural repetition from duplicate base data;
- decide whether the raw result satisfies the requested Grain.

Recognizing `1:M` itself does not satisfy the new evidence requirement.

---

## 15. Prediction required before execution

**SOURCE-REQUIRED**

SQL execution remains unavailable as evidence until the learner has committed to the relational prediction.

The required prediction contains all of these propositions:

> A source can match several article rows.

> The raw JOIN can therefore create several result rows for one starting source.

> Source-level fields will repeat across those rows.

> One raw result row will represent a source–article match rather than one source.

> With the current 18 article rows, each attached to one source, the direct JOIN will produce 18 matches rather than preserve the four starting source rows.

The learner need not produce an open-text explanation. What matters is that the interaction captures these distinctions rather than row-count recall alone.

---

## 16. Reveal order

**DESIGN / PROFESSIONAL JUDGMENT**

Reveal in this order:

1. business situation and proposed report change;
2. requested-output Grain question;
3. established Working Schema with the known relationship;
4. prediction interaction;
5. correct-prediction consolidation;
6. **Fan-out** terminology / Concept Moment;
7. SQL implementation;
8. execution result;
9. final verification;
10. closing explanation.

Do **not** reveal before the prediction:

- the 18-row JOIN result;
- repeated source examples from the result;
- a fan-out diagram showing one source producing multiple result rows;
- the term `fan-out` if its wording itself would cue the answer;
- feedback saying that the source-level Grain will be lost.

---

## 17. Concept / terminology timing

**SOURCE-REQUIRED + DESIGN / PROFESSIONAL JUDGMENT**

**Grain, PK/FK, Cardinality and JOIN** are reused as established terminology; they are not given new first-exposure teaching sequences. fileciteturn17file0L2-L2

**Fan-out** is new here.

It is introduced **after the learner has successfully predicted the multiplication and repetition**, so the formal term names a relational behavior the learner has already established.

This follows the current visual/pedagogical principle that terminology should attach to meaning rather than become the prerequisite for the reasoning itself. fileciteturn10file0L2-L2

---

## 18. SQL role and timing

**DESIGN / PROFESSIONAL JUDGMENT**

SQL comes **after the core prediction**.

Its role is:

> implement the proposed relational operation and create evidence against which the prediction can be checked.

The learner authors a direct INNER JOIN using the already-known relationship.

There is no second full JOIN lesson.

There is no Baseline `COUNT(*)` episode.

There is no SQL-first exploration intended to let the learner discover fan-out accidentally.

A syntax problem may receive SQL-specific support, but syntax success is not the primary evidence of the target capability.

This preserves the course principle that SQL is the implementation layer for relational reasoning, not the course organizer. fileciteturn7file0L2-L2

---

## 19. Scaffolding and hint logic

**DESIGN / PROFESSIONAL JUDGMENT**

The initial prediction is attempted without a hint.

### Prediction Hint 1

After an incorrect multiplicity judgment:

> Look at the direction of the relationship. For one `news_source` row, how many `news_article` rows can match?

This points back to established Cardinality without stating the result.

### Prediction Hint 2

After another incorrect attempt:

> A JOIN produces a result row for each matching pair. Apply that to one source that matches several articles.

This reactivates already introduced JOIN matching semantics.

### Row-count correction

If the learner understands multiplication but chooses the wrong total:

> There are 18 article rows, and each article belongs to one source. How many source–article matches does that create?

### SQL support

SQL support is kept separate from fan-out reasoning.

It may remind the learner to use the already-established `news_source_id` relationship in `ON`, but must not reinterpret the relational result on the learner's behalf.

### Show solution

Any `Show solution` behavior remains the global course control defined by current course authority. Revealing a SQL solution must not mark the required reasoning evidence complete or bypass final verification. fileciteturn11file0L2-L2

---

## 20. Feedback and checks

**DESIGN / PROFESSIONAL JUDGMENT**

Feedback must distinguish four kinds of error:

**Requested-Grain error:**  
Learner treats the stakeholder's requested report as article-level rather than source-level.

**Multiplicity error:**  
Learner knows the relationship is 1:M but still predicts one row per source.

**Natural-Grain error:**  
Learner predicts more rows but cannot identify what those rows represent.

**Duplication-diagnosis error:**  
Learner sees repeated source names and interprets them as accidental duplicates rather than one source appearing in multiple legitimate source–article matches.

Correct feedback should consolidate established reasoning and make the next move legible without giving away a later unanswered move.

Successful SQL execution may report execution success and returned evidence, but it must not state the final interpretation before the learner performs the verification.

---

## 21. Schema / Working Schema behavior

**SOURCE-REQUIRED prerequisites + DESIGN / PROFESSIONAL JUDGMENT**

The Working Schema begins with both required relations already available:

- `news_source`
- `news_article`

Relation identification is not an evidence target in this encounter.

Because PK/FK and Cardinality have already been introduced and the approved target assumes a **known 1:M relationship**, the established relationship may be visible from the start of the relational-prediction phase:

`news_source.news_source_id 1 → M news_article.news_source_id`

The connector must correspond to the actual relationship fields. fileciteturn10file0L2-L2

The Working Schema remains schema-level reference, not an instance-data browser.

It may visually emphasize `news_source` as the starting relation for this particular task, but must not communicate the false generalization `Grain = table`.

No unrelated relation is introduced merely because Working Schema can hold up to four relations.

---

## 22. Relevant visual / relational representations

**DESIGN / PROFESSIONAL JUDGMENT constrained by visual authority**

### Before prediction

Show only what is already established:

- two schema cards;
- their FK/PK relationship;
- clear `1 → M` Cardinality.

Do not show an output-fan diagram.

### After correct prediction

A local explanatory fan-out visual may show:

**one source row**  
→ **several matching article rows**  
→ **several result rows carrying the same source information**

This visual appears only after the learner has already made the prediction.

### After execution

The result itself becomes the primary evidence surface. Repeated `source_name` values beside different article titles should remain visible while the learner answers the verification question.

No Venn diagram is required. The visual model should represent row matching and row multiplication directly.

Visual aids remain explanatory, local, and non-answer-revealing. fileciteturn10file0L2-L2

---

## 23. Evidence of understanding

**SOURCE-REQUIRED target + DESIGN / PROFESSIONAL JUDGMENT collection method**

Required evidence consists of **both pre-execution and post-execution evidence**.

### Before execution

The learner demonstrates that:

- requested output Grain is one source per row;
- one source can create multiple raw JOIN rows;
- one-side information will repeat;
- natural raw-result Grain is a source–article match;
- the current raw result is expected to contain 18 matches.

### After execution

With the result visible, the learner demonstrates that:

- the returned repetition is expected;
- rows are distinct article matches rather than duplicate source records;
- the raw JOIN did not preserve the requested one-source-per-row Grain;
- the observed result agrees with the earlier relationship-based prediction.

A correct SQL query without this reasoning evidence is insufficient.

---

## 24. Success criteria

**DESIGN / PROFESSIONAL JUDGMENT**

The encounter is successfully completed only when the learner has:

1. correctly established the requested Grain;
2. correctly predicted one-to-many multiplication before SQL execution;
3. correctly predicted repetition of source-side information;
4. correctly identified the natural raw-result Grain;
5. produced or successfully executed the direct JOIN used for verification;
6. correctly interpreted the observed multiplication as a consequence of relationship Cardinality;
7. correctly rejected accidental duplicate data as the explanation;
8. correctly concluded that the raw JOIN does not satisfy the requested one-source-per-row structure.

SQL success alone cannot complete the encounter.

---

## 25. Likely failure modes and what they indicate

**DESIGN / PROFESSIONAL JUDGMENT**

**“There are four sources, so there will be four rows.”**  
Indicates failure to translate 1:M Cardinality into matching-row multiplicity.

**“There will be 18 rows because I remember there were 18 articles.”**  
Insufficient by itself. The learner must also identify source repetition and the natural result Grain.

**“The source rows are duplicated.”**  
Indicates confusion between repeated one-side attributes across legitimate matches and duplicate base-relation rows.

**“The output Grain is still one source because the query starts from `news_source`.”**  
Indicates conflation of `FROM`/starting relation with result Grain.

**“One result row represents one source.” after seeing several rows for each source**  
Indicates failure to infer natural joined-result Grain.

**Correct prediction but JOIN syntax failure.**  
Does not by itself invalidate the relational evidence. It indicates SQL implementation support may be needed.

**Correct SQL with no correct pre-execution prediction.**  
Does not establish the target capability; the learner may have discovered the behavior by execution.

---

## 26. Learning-experience requirements

**SOURCE-REQUIRED visual/pedagogical constraints + DESIGN / PROFESSIONAL JUDGMENT**

The experience must maintain a clear continuous problem:

> Can this proposed JOIN be used without breaking the source-level report?

The current reasoning task is the primary visual focus before SQL.

Completed reasoning remains reviewable but quieter.

Teacher/course guidance is visually distinct from:

- the learner task;
- status text;
- correctness feedback;
- Concept Moments.

When SQL becomes the learner's action, the editor may become primary, with Working Schema remaining practically available as reference.

After execution, the result becomes the primary evidence surface.

The result and final verification must remain spatially associated so the learner does not answer from memory.

This follows the established requirements for current-task focus, guided continuity, evidence locality and contextual tool prominence. fileciteturn10file0L2-L2

---

## 27. Implementation invariants

These are the learner-experience properties implementation must preserve.

**SOURCE-REQUIRED + DESIGN / PROFESSIONAL JUDGMENT**

- No Stage number is assigned by this packet.
- The case remains `news_source → news_article`.
- The requested business Grain is one source per row.
- The starting Grain is one source per row.
- The raw JOIN's natural Grain is source–article match.
- Prediction of multiplicity occurs before JOIN execution.
- Prediction includes repetition and Grain change, not count alone.
- `fan-out` terminology appears only after the learner has established its meaning.
- PK/FK, Cardinality, Grain and JOIN are not re-taught as first-exposure concepts.
- Relation identification is not reassessed.
- SQL does not become the learner's primary action before relational prediction.
- Actual result interpretation is not pre-announced by execution feedback.
- Final verification occurs with result evidence visible.
- No aggregation, pre-aggregation, LEFT JOIN/NULL reasoning, EXISTS, multi-branch fan-out or other new relational mechanism is introduced.
- No stage-local `Show solution` mechanism replaces the global course control.
- Repeated source information must be visibly distinguishable from identical duplicate result rows.
- Required reasoning evidence remains reviewable after completion.

---

## 28. Permitted implementation discretion

**DESIGN / PROFESSIONAL JUDGMENT**

Implementation may decide, without changing the design:

- exact learner-facing wording consistent with the specified distinctions;
- exact card dimensions and page composition;
- exact relationship-connector geometry consistent with actual FK/PK endpoints;
- exact fan-out visual animation;
- exact placement of teacher guidance;
- exact compact presentation of completed reasoning evidence;
- exact SQL editor dimensions;
- exact syntax-error presentation;
- exact aliases used for diagnostic output;
- exact closed-answer wording, provided the options preserve the required conceptual distinctions;
- exact transition-control styling and placement, provided evidence locality and continuity are preserved;
- exact local hint-control presentation;
- whether post-prediction explanatory elements persist as compact reminders or are replaced during SQL work.

Implementation may not use this discretion to alter evidence, concept timing, learner route, or the semantic meaning of the task.

---

## 29. Validation criteria

**DESIGN / PROFESSIONAL JUDGMENT**

Independent reviewers and later runtime validation should be able to verify that:

### Entry state

- business request clearly implies a source-level output;
- both known relations and their relationship are available;
- no fan-out answer is exposed.

### Requested-Grain state

- learner must identify one source per requested row;
- Cardinality is not treated as the determinant of requested Grain.

### Prediction state

- SQL has not yet been executed;
- learner must reason from 1:M to several matches per source;
- learner must identify repeated source information;
- learner must identify source–article-match natural Grain;
- exact count is not the only assessed distinction.

### Fan-out Concept Moment

- occurs after successful reasoning;
- names the already-established behavior;
- distinguishes structural repetition from duplicate source rows.

### SQL state

- direct INNER JOIN is used only after prediction;
- no new relational mechanism is needed;
- current seed returns 18 source/article matches;
- actual multiplicity is consistent with 5 / 6 / 5 / 2 article matches across the four sources. fileciteturn17file0L2-L2

### Verification state

- actual result stays visible;
- system has not already stated the answer;
- learner explains the multiplication through relationship structure;
- learner rejects the raw result as preserving one-source-per-row Grain.

### Scope validation

- no hidden LEFT JOIN/NULL lesson;
- no aggregation solution;
- no pre-aggregation;
- no EXISTS;
- no second fan-out branch;
- no claim of cumulative transfer or mastery.

---

## 30. Relevant OPEN / owner decisions

**OPEN / OWNER DECISION — none blocks this Encounter Design**

The following remain OPEN at broader course scope and are not resolved here:

- Stage structure beyond current Stage 1;
- overall course progression;
- broader initial schema exposure;
- cumulative-transfer status across multiple encounters;
- permanent behavior of global Back;
- permanent Retry / Redo reset semantics;
- remaining global Show solution presentation/metadata semantics. fileciteturn11file0L2-L2

None is required to settle the local learner flow above.

No Course Authority Owner decision is required before independent design review.

---

## 31. Explicit non-decisions

This packet deliberately does **not** decide:

- that this encounter is “Stage 2”;
- what capability follows it;
- how the final source-level report should eventually include or summarize article detail;
- whether aggregation should be taught next;
- whether fan-out across multiple branches should follow;
- course-wide hint policy;
- course-wide scaffold reduction rules;
- mastery of Grain, Cardinality, JOIN or fan-out;
- transfer to unfamiliar relation sets;
- permanent UI architecture;
- permanent global-control semantics;
- preservation/reuse of Stage 3 material;
- any course-wide taxonomy of Teaching / Reinforcement / Transfer / Assessment.

---

## 32. Traceability: approved capability → learner action → evidence

### Approved capability: predict multiple rows per starting entity

**Learner action:** before execution, apply the known `1 → M` relationship to one starting source.

**Evidence:** learner predicts that one source can contribute several result rows.

### Approved capability: predict repeated one-side information

**Learner action:** predict what happens to source fields when one source matches several articles.

**Evidence:** learner states/selects that source information repeats across distinct article matches.

### Approved capability: distinguish requested Grain from natural result Grain

**Learner action:** first establish requested one-source-per-row output, then identify the raw JOIN result row as one source–article match.

**Evidence:** learner explicitly rejects the claim that the raw JOIN preserves the requested Grain.

### Approved capability: predict before execution

**Learner action:** commit the multiplicity, repetition, Grain and row-count prediction while SQL has not yet run.

**Evidence:** prediction state is captured before the execution transition.

### Approved capability: explain observed multiplication structurally

**Learner action:** inspect the 18 returned matches and answer why source values repeat.

**Evidence:** learner attributes repetition to one source matching multiple article rows, not to accidental duplicate source data.

### Approved capability: reconcile execution with prior reasoning

**Learner action:** compare the actual result to the prior prediction while the result remains visible.

**Evidence:** learner confirms that the observed result has the predicted source–article Grain and therefore does not satisfy the requested one-source-per-row structure.

This traceability preserves the gate's central requirement: the evidence is not merely “4 became 18”; it captures **multiplicity, repeated one-side information, Grain change, prediction before execution, and structural interpretation afterward**. fileciteturn2file0L2-L2

**READY FOR INDEPENDENT PEDAGOGY + UX DESIGN REVIEW**