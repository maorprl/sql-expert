# Cycle 1 — Reconciled Encounter Design Packet

**Status:** RECONCILED — OWNER DECISION PENDING

**Traceability:** This packet is the reconciled successor to the frozen reviewed artifact:

`course-design/production/cycle-1/encounter-design-packet.md`

It incorporates only changes reconciled from:

- `course-design/production/cycle-1/independent-pedagogy-design-review.md`
- `course-design/production/cycle-1/independent-ux-design-review.md`
- `course-design/production/cycle-1/architect-reconciliation.md`

The original frozen Encounter Design Packet remains unchanged as the artifact actually reviewed by the two independent reviewers.

## Design-status key

**SOURCE-REQUIRED** — constrained by current course authority, verified data, or the approved Cycle 1 handoff.

**DESIGN / PROFESSIONAL JUDGMENT** — local Cycle 1 Encounter Design choice. It is not course-wide authority.

**OPEN / OWNER DECISION** — unresolved authority matter that must not be silently implemented.

---

## 1. Target capability

**SOURCE-REQUIRED**

Given a known one-to-many relationship and an established starting Grain, the learner must predict **before execution** that joining from the one side to many-side detail can:

- create multiple result rows per starting entity;
- repeat information from the one-side entity;
- change the natural relational-result Grain;

and then explain the observed multiplication through the relationship structure rather than as accidental duplicate data.

The target remains relational reasoning. Successful JOIN syntax alone is not sufficient evidence.

---

## 2. Approved case

**SOURCE-REQUIRED**

Use:

`news_source → news_article`

from the one side toward the many side.

Verified case facts remain:

- `news_source.news_source_id` is the source PK;
- `news_article.news_source_id` is a `NOT NULL` FK to it;
- each article belongs to one source;
- one source can have many articles;
- the current seed contains 4 sources and 18 articles;
- current source article counts are 5, 6, 5, and 2;
- the direct INNER JOIN yields 18 source–article matches;
- all seeded sources participate, so the encounter does not introduce unmatched-row / NULL behavior.

The case is not reopened by reconciliation.

---

## 3. Course-Assumed Learner State

**SOURCE-REQUIRED**

The course may assume, with the existing limitations:

- Grain has been introduced and exercised in a constrained case.
- Cardinality has been introduced and directionally reasoned about.
- PK/FK has been introduced and used.
- JOIN matching semantics have been introduced.
- the learner has authored an INNER JOIN in the Stage 1 case.
- prediction before execution and result verification have been practised in that case.
- relation identification has been practised in one constrained case.
- none of those claims establishes broad cumulative transfer or mastery.
- one-to-many row multiplication / fan-out has not yet been established.
- aggregation, pre-aggregation, EXISTS, LEFT JOIN/NULL behavior, and multiple-branch fan-out have not been established.

Previously introduced concepts are reused without being re-taught as first exposure.

---

## 4. What is reused without re-teaching

**SOURCE-REQUIRED + DESIGN / PROFESSIONAL JUDGMENT**

Reuse:

- Grain;
- PK/FK;
- Cardinality;
- the known `news_source ↔ news_article` relationship;
- JOIN matching-row semantics;
- INNER JOIN vocabulary and basic syntax;
- result inspection against a prior prediction.

Relation identification is not reassessed. The relation pair is supplied because identifying it is not intrinsic evidence for the approved fan-out capability.

No second first-JOIN teaching sequence is introduced.

---

## 5. Concrete learner situation

**DESIGN / PROFESSIONAL JUDGMENT**

The research team has a **source-level coverage review**. Its purpose is to review publishing sources, so each source should appear once.

A teammate proposes adding article titles by directly joining `news_source` to `news_article`.

The learner must decide, before the report is changed, whether that direct JOIN is compatible with the source-level structure.

The problem remains:

- the report is source-level;
- article titles are article-level detail;
- a direct one-to-many JOIN is proposed;
- the learner must predict what the operation will do before relying on execution.

The encounter does not ask the learner to repair the report with a later relational mechanism.

---

## 6. Learner goal

**DESIGN / PROFESSIONAL JUDGMENT**

Determine whether the proposed direct JOIN preserves the intended source-level output.

The learner must:

1. establish what one requested output row represents;
2. use the known `1:M` relationship and JOIN matching semantics to predict the raw JOIN's structural behavior;
3. distinguish requested Grain from natural joined-result Grain;
4. predict repeated source information;
5. only after that structural commitment, calculate the current-data numeric consequence;
6. execute the proposed JOIN;
7. inspect the actual rows;
8. diagnose why source values repeat;
9. reconcile the result with the committed prediction.

The goal is not merely to write a JOIN.

---

## 7. Requested business output

**DESIGN / PROFESSIONAL JUDGMENT**

The requested business artifact remains:

> a source-level coverage review in which each publishing source appears once.

Article detail is being evaluated for compatibility with that requirement.

The encounter does not require the learner to solve how all article detail should ultimately be represented while preserving one source per row.

Aggregation, pre-aggregation, collection/concatenation, EXISTS, or another repair mechanism remain outside scope.

---

## 8. Starting Grain

**SOURCE-REQUIRED**

Starting/input Grain:

> **one news source per row**

The starting relation is `news_source`.

The actual seed contains four source rows, but that instance count is **not used as learner-facing evidence during the structural prediction**.

---

## 9. Requested output Grain

**DESIGN / PROFESSIONAL JUDGMENT**

Requested business-output Grain:

> **one news source per row**

The learner derives this from the business situation.

A constrained prompt may ask:

> In the requested review, what should one row represent?

with materially distinct options such as:

- one publishing source;
- one news article;
- one source–article match.

Correct answer: one publishing source.

Cardinality does not determine requested Grain.

---

## 10. Natural relational-result Grain

**SOURCE-REQUIRED relational behavior + DESIGN wording**

For the proposed raw JOIN:

> **one matching source–article pair per result row**

In this case that can also be read as one news article together with its source information per row.

That is not the requested one-source-per-row Grain.

The actual raw result contains 18 matches, but the learner must establish the structural Grain change before that current-data count is introduced as a learner-facing premise.

---

## 11. Why the situation genuinely requires the approved reasoning

**SOURCE-REQUIRED + DESIGN / PROFESSIONAL JUDGMENT**

The encounter cannot be completed merely by:

- remembering that the dataset has 18 articles;
- seeing a `4 → 18` contrast;
- recognizing `1:M`;
- writing valid JOIN syntax;
- executing SQL and noticing repetition.

The protected pre-execution reasoning chain is:

**requested one-source Grain**  
→ **known `1:M` relationship**  
→ **JOIN creates a row for each match**  
→ **one source may contribute multiple result rows**  
→ **source-side information may repeat**  
→ **natural raw-result Grain is source–article match**

Only after those structural judgments are committed does the encounter introduce the current `18 article rows` fact for the exact numeric consequence.

This prevents current-data counts from replacing Cardinality-based reasoning.

---

## 12. Learner route

**DESIGN / PROFESSIONAL JUDGMENT**

### Episode A — Establish the requested output

Present the source-level business situation and the proposal to add article detail.

The learner identifies:

> one requested result row should represent one publishing source.

No fan-out terminology, result example, result count, or output-fan visual appears.

### Episode B — Predict the proposed JOIN

Episode B is one coherent **Prediction workspace**, not a stack of unrelated task cards.

#### B1 — Structural prediction

The Working Schema shows the already-known relationship:

`news_source.news_source_id 1 → M news_article.news_source_id`

No learner-facing `4 source rows` / `18 article rows` comparison is present.

Using the relationship and known JOIN matching semantics, the learner progressively commits:

- Can one source contribute more than one raw JOIN row? **Yes.**
- What will one raw JOIN row naturally represent? **One source–article match.**
- What can happen to source-side information? **It can repeat across several matching rows.**

Each subjudgment remains separately inspectable as evidence, but already-completed subjudgments become compact/secondary while the next current judgment takes focus.

The assistance path used during this structural prediction is recorded.

#### B2 — Current-data numeric consequence

Only after B1 is committed, reveal the current-data fact:

> The current dataset contains 18 article rows, and every article belongs to exactly one source.

The learner predicts:

> the direct INNER JOIN will produce 18 source–article matches.

The learner-facing `4 source rows` count is not needed for this step and is not used as the premise for the structural prediction.

### Episode C — Name the behavior

After the structural prediction has been successfully established, introduce:

> **Fan-out**

The Concept Moment may explain:

> When one starting row matches multiple rows on the many side, that starting row can contribute multiple result rows. The one-side information can therefore repeat across those matches.

This names and consolidates meaning the learner already established.

The Concept Moment must **not**:

- compare the forthcoming result with accidental duplicate base rows;
- tell the learner that repeated source names in the forthcoming result are "not duplicates";
- pre-classify the actual SQL result.

### Episode D — Test the prediction in SQL

The learner implements the proposed direct INNER JOIN.

SQL is a verification / implementation layer for the committed relational prediction.

A simple diagnostic result exposes source and article detail, for example:

`source_name | article_title`

Equivalent aliases are permitted if the evidence remains equally interpretable.

### Episode E — Reconcile result with prediction

Episode E is one coherent **Verification workspace**.

The actual SQL result is the primary evidence surface.

The learner's committed pre-execution prediction is visible or immediately recoverable from the same verification context without requiring the learner to leave the result-verification workspace.

The learner progressively answers:

- Why do the observed source names repeat?
- Do the repeated names indicate duplicate `news_source` base rows, or several legitimate source–article matches?
- Does the raw result preserve one source per row?
- What does one returned row naturally represent?
- Does the actual result agree with the committed prediction?

Only after the learner completes the verification does feedback close the loop:

> The observed multiplication follows from the one-to-many match structure. The repeated source values occur across distinct source–article matches, and the raw result does not preserve the requested one-source-per-row Grain.

No method for restoring one-source-per-row output is taught.

---

## 13. Reasoning progression

**DESIGN / PROFESSIONAL JUDGMENT**

The reconciled reasoning chain is:

**business report should contain each source once**  
→ requested Grain = one source  
→ known relationship = one source can match many articles  
→ JOIN produces one result row for each match  
→ one source can contribute several raw result rows  
→ source information can repeat  
→ natural raw-result Grain = source–article match  
→ structural prediction committed  
→ current data reveals 18 articles, each with one source  
→ numeric prediction = 18 source–article matches  
→ Fan-out names the already-established mechanism  
→ SQL executes the proposed operation  
→ learner inspects actual rows  
→ learner diagnoses structural repetition vs accidental duplicate base data  
→ learner reconciles result with the committed prediction.

The progression remains continuous without performing later reasoning for the learner.

---

## 14. Learner actions

**DESIGN / PROFESSIONAL JUDGMENT**

The learner must actively:

- identify the requested output Grain;
- apply the visible `1:M` relationship;
- apply known matching-row semantics;
- predict multiple rows per source before current-data counts are revealed;
- predict repeated source-side information;
- identify source–article-match natural Grain;
- commit those structural judgments;
- use later-revealed current data to predict 18 matches;
- implement/run the direct JOIN;
- inspect actual rows;
- diagnose repeated source names using the returned source/article combinations;
- distinguish structural repetition from accidental duplicate `news_source` data;
- determine whether the raw result satisfies requested Grain;
- compare actual behavior with the committed prediction.

Recognizing `1:M`, remembering `18`, or producing correct SQL is insufficient by itself.

---

## 15. Prediction required before execution

**SOURCE-REQUIRED + RECONCILED EVIDENCE DESIGN**

SQL execution is not available as capability evidence until the learner has committed both layers of prediction.

### Protected structural prediction

Committed before learner-facing current-data counts:

> A source can match several article rows.

> A raw JOIN can therefore create several result rows for one starting source.

> Source-side information can repeat across those rows.

> One raw result row naturally represents a source–article match rather than one source.

### Current-data numeric prediction

After the structural commitment, the learner may be told:

> There are 18 article rows, and every article belongs to exactly one source.

The learner then predicts:

> The direct JOIN will produce 18 source–article matches.

The evidence record preserves the structural prediction separately from the later numeric consequence.

The evidence record also preserves the assistance path used for the structural prediction.

A correct numeric answer cannot substitute for missing structural evidence.

---

## 16. Reveal order

**DESIGN / PROFESSIONAL JUDGMENT**

Reveal in this order:

1. business situation and proposed report change;
2. requested-output Grain interaction;
3. established Working Schema and known `1:M` relationship;
4. structural prediction workspace;
5. committed structural prediction;
6. current-data 18-article fact;
7. numeric prediction;
8. Fan-out terminology / Concept Moment;
9. SQL implementation;
10. execution result;
11. result inspection and diagnosis;
12. final reconciliation with committed prediction;
13. closing explanation.

Do not reveal before the structural prediction:

- `4 source rows` / `18 article rows` as a comparison;
- the 18-row JOIN result;
- repeated source examples from the result;
- a fan-out output diagram;
- the term `fan-out` if it cues the answer;
- feedback that states the source-level Grain will be lost.

Do not reveal before result-specific diagnosis:

- that repeated source names in the actual result are not duplicate base records;
- a visual that labels the forthcoming repeated rows as "not duplicates."

---

## 17. Concept / terminology timing

**SOURCE-REQUIRED + DESIGN / PROFESSIONAL JUDGMENT**

Grain, PK/FK, Cardinality, and JOIN remain established terminology.

Fan-out is introduced after successful structural prediction.

The Fan-out Concept Moment:

- names the already-established behavior;
- explains the general one-to-many multiplication mechanism;
- may restate learner-established repetition as a general consequence;
- does not perform the later result-specific duplicate diagnosis.

The term therefore attaches to meaning without becoming an answer supplied in advance.

---

## 18. SQL role and timing

**DESIGN / PROFESSIONAL JUDGMENT**

SQL comes only after:

- requested Grain is established;
- structural multiplicity/repetition/natural-Grain prediction is committed;
- the numeric current-data consequence is predicted;
- Fan-out has named the already-established mechanism.

The learner authors a direct INNER JOIN using the known relationship.

There is:

- no Baseline `COUNT(*)` episode;
- no second full JOIN lesson;
- no SQL-first discovery path.

SQL-specific support may address syntax or the already-known `ON` relationship, but it must not supply the relational diagnosis.

SQL success is not sufficient encounter evidence.

---

## 19. Scaffolding and hint logic

**DESIGN / PROFESSIONAL JUDGMENT**

The initial structural prediction is attempted without a hint.

### Prediction Hint 1

After an incorrect multiplicity judgment:

> Look at the direction of the relationship. For one `news_source` row, how many `news_article` rows can match?

This points back to established Cardinality without stating the result.

### Prediction Hint 2

After another incorrect attempt:

> A JOIN produces a result row for each matching pair. Apply that to one source that matches several articles.

This reactivates known JOIN matching semantics.

### Numeric correction

If the structural prediction is correct but the learner miscalculates the current-data count:

> There are 18 article rows, and each belongs to one source. How many source–article matches does that create?

This correction occurs only after structural commitment.

### Assistance provenance

For the structural prediction, the evidence record must distinguish at minimum:

- unassisted;
- after Hint 1;
- after Hint 2;
- Show-solution-assisted, if that path is later authorized by the Course Authority Owner.

The numeric correction may be recorded separately and does not retroactively change the assistance classification of the earlier structural commitment.

### SQL support

SQL support remains separate from fan-out reasoning.

It may remind the learner of the established `news_source_id` relationship but must not interpret the result.

### Show solution

`Show solution` remains a global course control.

Its availability and evidence effect during the protected prediction state remain **OPEN / OWNER DECISION REQUIRED**. No Stage-local substitute is created.

---

## 20. Feedback and checks

**DESIGN / PROFESSIONAL JUDGMENT**

Feedback distinguishes:

**Requested-Grain error**  
The learner treats the requested business artifact as article-level rather than source-level.

**Multiplicity error**  
The learner sees `1:M` but still predicts one raw row per source.

**Natural-Grain error**  
The learner predicts more rows but cannot identify source–article-match row meaning.

**Numeric error**  
The learner has correct structural reasoning but maps the current 18 article rows to the wrong number of matches.

**Duplication-diagnosis error**  
After execution, the learner interprets repeated source names as accidental duplicate source base rows rather than repeated one-side values across distinct article matches.

Correct feedback consolidates only what the learner has already established and may orient the next move without supplying a later unanswered inference.

Execution feedback may report technical execution success but may not state the final relational diagnosis.

---

## 21. Schema / Working Schema behavior

**SOURCE-REQUIRED prerequisites + DESIGN / PROFESSIONAL JUDGMENT**

The Working Schema begins with:

- `news_source`
- `news_article`

Relation identification is not an evidence target.

The known relationship may be visible from the start of the relational-prediction phase:

`news_source.news_source_id 1 → M news_article.news_source_id`

The relationship visual must connect the actual related fields.

The Working Schema remains schema-level reference, not instance data.

It may emphasize `news_source` as the starting relation for this task without implying `Grain = table`.

No unrelated relation is introduced.

Instance counts are not embedded into the Working Schema before structural prediction.

---

## 22. Relevant visual / relational representations

**DESIGN / PROFESSIONAL JUDGMENT constrained by current visual authority**

### Before structural prediction

Show:

- two schema cards;
- actual PK/FK relationship;
- clear `1 → M` Cardinality.

Do not show:

- output row multiplication;
- current `4 versus 18` comparison;
- repeated source rows;
- fan-out terminology.

### After structural prediction

A Fan-out Concept Moment / local explanatory visual may show the **general mechanism**:

one starting row  
→ multiple matching rows  
→ multiple result rows

It may visually represent repetition as a general consequence already predicted by the learner.

It must not label the forthcoming actual result as non-duplicate base data.

### After execution

The returned result becomes the primary evidence surface.

Repeated `source_name` values beside different article titles remain visible while the learner performs the duplicate-vs-structural diagnosis and final reconciliation.

The committed prediction is visible or immediately recoverable from the same verification context while remaining visually secondary to the actual result.

No Venn diagram is required.

---

## 23. Evidence of understanding

**SOURCE-REQUIRED target + RECONCILED COLLECTION METHOD**

Required evidence includes protected pre-execution evidence and post-execution evidence.

### Before execution — structural evidence

Before learner-facing current-data counts, the learner demonstrates:

- requested output Grain = one source per row;
- one source can create multiple raw JOIN rows;
- source-side information can repeat;
- natural raw-result Grain = one source–article match.

The captured evidence includes assistance provenance for the structural prediction.

### Before execution — current-data numeric consequence

After structural commitment, the learner is given the current 18-article fact and demonstrates:

- expected raw result = 18 source–article matches.

This numeric evidence is secondary to the structural evidence.

### After execution

With actual rows visible and the committed prediction practically available, the learner demonstrates:

- observed source-name repetition is explained by several article matches for a source;
- the repeated names do not establish duplicate `news_source` base rows;
- one returned row represents a source–article match;
- the raw result does not preserve one-source-per-row requested Grain;
- actual behavior agrees with the pre-execution relational prediction.

A correct SQL query without the protected reasoning evidence is insufficient.

---

## 24. Success criteria

**DESIGN / PROFESSIONAL JUDGMENT**

The encounter is successfully completed only when the learner has:

1. correctly established requested Grain;
2. committed structural one-to-many multiplication before instance counts and SQL execution;
3. correctly predicted repeated source-side information;
4. correctly identified natural raw-result Grain;
5. predicted the 18-match current-data consequence after structural commitment;
6. produced or successfully executed the direct JOIN used for verification;
7. inspected the actual result;
8. correctly diagnosed the observed repetition through relationship structure rather than accidental duplicate source base rows;
9. concluded that the raw JOIN does not satisfy one-source-per-row requested Grain;
10. reconciled the actual result with the committed prediction.

Completion records the assistance path used for the protected structural prediction.

SQL success alone cannot complete the encounter.

---

## 25. Likely failure modes and what they indicate

**DESIGN / PROFESSIONAL JUDGMENT**

**“One source row means one result row.”**  
Failure to translate `1:M` Cardinality into matching-row multiplicity.

**“I know it is 18 because Stage 1 had 18 articles.”**  
Insufficient. The structural prediction must already have been committed before the current count is introduced.

**Correct structural prediction but wrong 18-match calculation.**  
A numeric mapping error, not necessarily failure of fan-out reasoning.

**“The source rows are duplicated.”**  
Failure to distinguish repeated one-side values across distinct matches from accidental duplicate base rows.

**“The output Grain is still one source because `FROM news_source` starts there.”**  
Conflation of starting relation with result Grain.

**Correct prediction but JOIN syntax failure.**  
Relational evidence may still be valid; SQL implementation support may be needed.

**Correct SQL with no protected pre-execution structural prediction.**  
Does not establish the target capability.

**Correct response after hints or Show solution.**  
Useful evidence, but assistance provenance must prevent it from being represented as unassisted performance.

---

## 26. Learning-experience requirements

**SOURCE-REQUIRED visual/pedagogical constraints + DESIGN / PROFESSIONAL JUDGMENT**

Maintain the continuous problem:

> Can this proposed JOIN be used without breaking the source-level report?

Before SQL:

- the Prediction workspace is the dominant learner surface;
- the Working Schema is the relevant structural reference;
- current-data counts do not pre-empt the structural reasoning.

Prediction workspace:

- behaves as one coherent reasoning episode;
- maintains one clear current focus;
- keeps completed subjudgments compact and reviewable;
- avoids both a dense wall of co-primary questions and a long questionnaire-like stack.

During SQL:

- editor may become primary;
- Working Schema remains practically available;
- committed prediction remains established evidence rather than an active question.

During final verification:

- actual result is primary;
- committed prediction is visible or immediately recoverable in the same context;
- learner does not rely on memory or leave the verification context;
- Verification workspace remains one coherent reconciliation episode;
- completed microjudgments remain secondary.

Teacher/course guidance remains visually distinct from task prompts, system status, correctness feedback, and Concept Moments.

---

## 27. Implementation invariants

**SOURCE-REQUIRED + RECONCILED DESIGN**

Implementation must preserve all of the following:

1. No Stage number is assigned.
2. Case remains `news_source → news_article`.
3. Starting Grain = one news source per row.
4. Requested business-output Grain = one news source per row.
5. Natural raw JOIN Grain = one source–article match.
6. PK/FK, Cardinality, Grain, and JOIN are reused, not re-taught as first exposure.
7. Relation identification is not reassessed.
8. The known `1:M` relationship is available for structural reasoning.
9. No learner-facing `4 versus 18` count comparison is available before structural prediction.
10. Multiplicity, repetition, and natural raw-result Grain are committed before current-data numeric count is revealed.
11. The current 18-article fact appears only after structural commitment.
12. Numeric count is not accepted as a substitute for structural evidence.
13. SQL does not execute before the required pre-execution prediction is committed.
14. SQL remains implementation/verification rather than discovery.
15. Fan-out terminology appears only after structural prediction.
16. The Fan-out Concept Moment does not pre-classify the forthcoming actual repetition as non-duplicate base data.
17. Duplicate-vs-structural diagnosis is performed after actual result inspection.
18. Structural prediction evidence preserves assistance provenance.
19. Actual result remains primary during final verification.
20. Committed prediction is visible or immediately recoverable from the verification context.
21. Prediction and verification are each coherent reasoning workspaces with progressive current focus.
22. Required subjudgments remain individually inspectable without accumulating as co-primary task cards.
23. Execution feedback does not announce the final relational diagnosis.
24. No aggregation, pre-aggregation, LEFT JOIN/NULL, EXISTS, multi-branch fan-out, or other new mechanism is introduced.
25. No Stage-local Show solution substitute is created.
26. Required reasoning evidence remains reviewable after completion.
27. A protected pre-execution prediction cannot be silently overwritten after result exposure in a way that erases temporal provenance.
28. Owner-dependent Back / Retry / Show solution behavior remains unresolved until Course Authority Owner action.

---

## 28. Permitted implementation discretion

**DESIGN / PROFESSIONAL JUDGMENT**

Implementation may decide:

- exact learner-facing wording consistent with the required distinctions;
- exact composition of the coherent Prediction workspace;
- exact composition of the coherent Verification workspace;
- exact progressive treatment of completed subjudgments;
- exact card dimensions and responsive composition;
- exact relationship-connector geometry consistent with actual fields;
- exact Fan-out visual form/animation within the explanatory boundary;
- exact placement of teacher guidance;
- exact compact presentation of completed reasoning evidence;
- exact mechanism by which committed prediction is immediately recoverable at verification;
- exact SQL editor dimensions;
- exact syntax-error treatment;
- exact diagnostic output aliases;
- exact closed-option wording preserving conceptual distinctions;
- exact local Hint 1 / Hint 2 controls.

Implementation may not decide:

- whether protected prediction may be overwritten after result exposure;
- owner-dependent Retry / Redo semantics affecting protected evidence;
- Show solution availability/evidence effect in the protected prediction state;
- any behavior that changes the target evidence, reveal order, concept timing, or protected provenance.

Those remain owner-gated.

---

## 29. Validation criteria

**DESIGN / PROFESSIONAL JUDGMENT**

### Entry / requested Grain

Verify:

- business request clearly implies source-level output;
- both known relations and relationship are available;
- learner establishes one source per requested row;
- no fan-out result answer is exposed.

### Structural prediction

Verify:

- no learner-facing `4 versus 18` shortcut is available;
- visible `1:M` relationship and matching semantics are the basis for reasoning;
- learner commits multiple rows per source, repeated source information, and source–article-match natural Grain before counts;
- assistance path is captured.

### Current-data numeric consequence

Verify:

- 18-article fact appears only after structural commitment;
- learner predicts 18 source–article matches;
- numeric success does not replace structural evidence.

### Fan-out Concept Moment

Verify:

- appears after structural prediction;
- names/explains the already-predicted general mechanism;
- does not state that forthcoming repeated source names are not duplicate base records;
- no visual aid pre-classifies the forthcoming result.

### SQL

Verify:

- direct INNER JOIN occurs only after prediction;
- no new relational mechanism is needed;
- execution result exposes source/article detail;
- successful execution does not pre-announce interpretation.

### Final verification

Verify:

- actual result stays visible as primary evidence;
- committed prediction is visible or immediately recoverable from the same verification context;
- learner diagnoses observed repeated source names from the actual rows;
- learner distinguishes structural repeated values across source–article matches from accidental duplicate source base rows;
- learner rejects one-source-per-row as the natural raw-result Grain;
- learner reconciles actual behavior with prediction.

### Interaction grouping

Verify:

- Prediction is one coherent workspace with clear current focus;
- Verification is one coherent workspace with clear current focus;
- evidence distinctions remain inspectable;
- completed subjudgments are visually secondary;
- neither episode becomes a dense form or a long disconnected questionnaire stack.

### Assistance provenance

Verify:

- structural prediction evidence records actual assistance path;
- scaffolded success is not represented as unassisted success.

### Scope

Verify:

- no LEFT JOIN/NULL lesson;
- no aggregation;
- no pre-aggregation;
- no EXISTS;
- no second fan-out branch;
- no cumulative-transfer or mastery claim.

### Owner-dependent controls

Before Auditor Pre-Build Control, owner-approved criteria must additionally establish:

- Back / Retry behavior after result exposure;
- how any changed protected prediction creates or distinguishes a new attempt and invalidates prior downstream result evidence;
- Show solution availability and evidence effect during protected prediction.

These criteria remain incomplete until the owner decision in §30 is resolved.

---

## 30. Relevant OPEN / owner decisions

**OPEN / OWNER DECISION — BLOCKS AUDITOR PRE-BUILD CONTROL**

Broader course matters remain OPEN and are not required here:

- Stage structure beyond current Stage 1;
- overall course progression;
- broader initial schema exposure;
- cumulative-transfer status across multiple encounters;
- unrelated permanent shell semantics.

One scoped owner matter is required for this encounter because current global-control authority leaves its state semantics OPEN.

### Decision A — post-result editing of the protected prediction

The Course Authority Owner must choose one:

**A1 — Freeze prediction for the completed attempt after result exposure**

- Back may review it.
- Retry / Redo begins a new attempt.
- prior attempt remains distinguishable;
- new attempt has no active downstream SQL/result evidence until rerun.

**A2 — Permit reopening/editing, but any change creates a new protected attempt**

- prior attempt remains distinguishable;
- old downstream SQL/result evidence becomes inactive for the new prediction;
- SQL must be rerun before new verification.

Silent overwrite of the old prediction while treating already-seen results as if they followed the new prediction is not permitted.

### Decision B — Show solution during protected prediction

The Course Authority Owner must choose one:

**B1 — unavailable / disabled for this protected prediction task**

or

**B2 — available, with use recorded permanently as `solution-assisted` for that attempt**

Under B2:

- it does not populate the response;
- it does not execute SQL;
- it does not complete required prediction evidence;
- it does not bypass final verification;
- the learner must still commit a prediction before SQL;
- the attempt cannot later be represented as unassisted.

No broader permanent course-wide policy is requested by this packet.

---

## 31. Explicit non-decisions

This packet does not decide:

- that this encounter is Stage 2;
- what capability follows it;
- how the final source-level report should ultimately include article detail;
- whether aggregation comes next;
- whether multi-branch fan-out follows;
- global hint policy;
- course-wide assistance analytics;
- course-wide scaffold reduction rules;
- mastery of Grain, Cardinality, JOIN, or fan-out;
- transfer to unfamiliar relation sets;
- permanent UI architecture;
- global control semantics outside the scoped owner decision in §30;
- reuse of preserved Stage 3 material;
- any course-wide Teaching / Reinforcement / Transfer / Assessment taxonomy.

---

## 32. Traceability: approved capability → learner action → evidence

### Predict multiple rows per starting entity

**Learner action:** before instance counts and SQL, apply the known `1 → M` relationship and matching-row semantics.

**Evidence:** committed structural prediction that one source can contribute several raw result rows.

### Predict repeated one-side information

**Learner action:** before instance counts and SQL, predict what happens to source fields across several article matches.

**Evidence:** committed prediction that source information can repeat across multiple matching rows.

### Distinguish requested Grain from natural result Grain

**Learner action:** establish one-source requested Grain, then predict source–article-match natural Grain.

**Evidence:** committed pre-execution distinction before SQL.

### Predict before execution without a count shortcut

**Learner action:** complete structural prediction before learner-facing current-data count appears.

**Evidence:** timestamp/state ordering plus captured structural response and assistance provenance.

### Predict exact current-data consequence

**Learner action:** after structural commitment, use the revealed 18 article rows and one-source-per-article fact.

**Evidence:** 18 source–article-match prediction recorded before SQL.

### Explain observed multiplication structurally

**Learner action:** inspect actual repeated source names beside article detail.

**Evidence:** learner diagnoses several legitimate source–article matches rather than accidental duplicate `news_source` base rows.

### Reconcile execution with prior reasoning

**Learner action:** compare actual result with the committed prediction while both are practically available in the verification context.

**Evidence:** learner confirms the predicted natural Grain and incompatibility with one-source-per-row requested output.

### Distinguish supported from unassisted evidence

**Learner action:** use or do not use available support.

**Evidence:** completed structural prediction retains assistance provenance; later validation does not silently upgrade scaffolded success.

---

## 33. Reconciliation trace to reviewer findings

- **Pedagogy P1:** resolved by structural-first prediction and delayed instance counts.
- **Pedagogy P2:** resolved by removing duplicate-base-record diagnosis from the Fan-out Concept Moment.
- **Pedagogy P3:** incorporated locally through assistance provenance.
- **UX-1:** remains OWNER DECISION REQUIRED in §30.
- **UX-2:** resolved by practical access to committed prediction during verification.
- **UX-3:** resolved by the narrowed Fan-out Concept Moment boundary.
- **UX-4:** incorporated locally through coherent Prediction and Verification workspaces.

---

## Final status

**RECONCILED DESIGN COMPLETE TO CURRENT AUTHORITY — OWNER DECISION REQUIRED**

The design is **not ready for Auditor Pre-Build Control** until the scoped owner decision in §30 is resolved and incorporated into durable authority.

No implementation is authorized.
