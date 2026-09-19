# Course 1 / Lesson 1 authority — What Does One Row Represent?

**Status:** CURRENT AUTHORITY — BUILDABLE / NOT YET IMPLEMENTED  
**Scope:** Course 1 / Lesson 1 encounter-local capability, learner route, evidence, concept timing, transfer, and non-scope

This document records the human-approved design for **Course 1 / Lesson 1 — What Does One Row Represent?** as current encounter-local authority.

It does not create additional Course 1 Lessons, does not define Course 2 or Course 3 Lessons, and does not authorize implementation by itself. Build still follows the current learner-encounter production process.

For course-wide constraints, this Lesson remains subject to the applicable current sources identified by `source-of-truth-hierarchy.md`, including `pedagogical-foundations.md`, `course-knowledge-map.md`, `course-exit-criteria.md`, the current startup-ecosystem schema/data, and applicable course-wide visual/control authority.

---

## 1. Target capability

The learner can inspect a relation and state what one row represents.

The first concrete target is:

> **Each row in `company` represents one company.**

Only after that meaning has been established does the Lesson attach the formal term:

> **Grain answers: What does one row represent?**

The Lesson then requires transfer to a second relation so that Grain is not learned as a synonym for `company` or for a particular table.

---

## 2. Prerequisite learner state

The Lesson assumes only basic tabular / spreadsheet literacy:

- the learner can visually recognize rows and columns;
- the learner can inspect values in a row.

The Lesson does **not** assume prior database concepts, relational terminology, SQL syntax, keys, Cardinality, or JOIN reasoning.

---

## 3. Core learner route

The approved reasoning spine is:

`see several company rows → inspect one company row as a whole → infer what all visible values describe together → establish one row = one company → name relation / attribute / Grain → apply the same question to news_article → synthesis`

The route must preserve that order of meaning before terminology.

### 3.1 See several company rows

The learner first encounters multiple rows from `company` as data to be read, not as a pre-labeled Grain exercise.

The presentation must not use key badges, relationship markings, or other database annotations that require concepts not yet introduced.

### 3.2 Inspect one company row as a whole

The learner focuses on one company row as a coherent unit and considers what its visible values describe together.

A concrete one-row visual may use fields from the existing `company_id = 1` record, for example:

- `company_id: 1`
- `name: CloudFence Labs`
- `founded_date: 2018-03-15`
- `status: active`

These fields are shown as peers for this reasoning purpose.

In particular, `company_id` must receive **no visual or semantic privilege** at this point. Do not identify it as a Primary Key, row identifier, unique field, or special answer clue.

### 3.3 Establish the row meaning

Before introducing the formal term Grain, the learner determines that the values in the row describe **one company**.

Where a closed-choice interaction is used, distractors should represent plausible competing interpretations rather than arbitrary wrong answers. Approved examples include:

- one company;
- one company status observation;
- one company founding event;
- one field / property of a company.

Correctness must depend on interpreting the whole row, not on recognizing a technical term.

Wrong-answer feedback should direct attention back to the visible row evidence and the relationship among its fields. Before formal terminology is introduced, feedback should use ordinary language such as **field** or **property** rather than requiring the learner to understand **attribute**.

### 3.4 Name the concepts after the meaning

After the learner has established that one `company` row represents one company, the Lesson may attach the formal vocabulary:

- **relation** — the tabular relation being inspected;
- **attribute** — a field / column describing something about the row's subject;
- **Grain** — what one row represents.

The Concept Moment is:

> **Grain answers: What does one row represent?**

The term explains the meaning the learner has already established; it must not be required in order to reach that meaning.

### 3.5 Transfer to `news_article`

The learner then applies the same question to `news_article`:

> What does one row represent?

The required conclusion is:

> **Each row in `news_article` represents one article.**

This transfer is required evidence that the learner can apply the Grain question to another relation rather than merely repeat “one company per row.”

### 3.6 Synthesis

The Lesson closes the reasoning with the shared pattern:

- `company`: 1 row → 1 company;
- `news_article`: 1 row → 1 article;
- same question: **What does one row represent?**

The synthesis should reinforce the question as reusable relational reasoning, not introduce a new concept.

---

## 4. Evidence and reveal constraints

The Lesson must preserve learner evidence for row-meaning interpretation.

Before the learner establishes the meaning of the `company` row:

- do not define Grain as the answer in advance;
- do not label `company_id` as a Primary Key or unique identifier;
- do not use PK/FK, Cardinality, JOIN, or schema-relationship annotations;
- do not word the task so that “one company” is already stated as the conclusion.

The learner may be guided to inspect the row. Guidance must not perform the inference that all of the row's values describe one company.

Formal terminology follows established meaning:

1. learner interprets the row;
2. course confirms the meaning;
3. course names the relevant concepts.

Transfer to `news_article` must require the learner to perform the same row-meaning judgment again. The transfer must not simply state “one article per row” before the learner responds.

---

## 5. Interaction and feedback boundary

The Lesson design requires the learner to make the row-meaning judgment; it does not require open-text explanation.

A constrained or closed response is acceptable when it preserves the intended evidence and uses plausible interpretations.

Feedback should be diagnostic:

- wrong responses point back to what the visible fields describe together;
- correct feedback consolidates the established row meaning;
- technical vocabulary is attached only after the prerequisite meaning is available.

The exact UI control, card geometry, animation, and implementation-state representation remain implementation discretion unless constrained by applicable course-wide authority.

---

## 6. Data and schema boundary

The Lesson uses current schema/data facts; it must not invent row meanings or values.

The primary relation is `company`. The transfer relation is `news_article`.

For this Lesson:

- `company_id` is an ordinary visible field during the initial row-meaning reasoning;
- existing key constraints in the schema are not teaching content yet;
- the row examples are evidence for what a row describes, not evidence for uniqueness, identity, or relationships.

---

## 7. Completion evidence

Lesson completion requires evidence that the learner has:

- interpreted one `company` row as a coherent unit representing one company before Grain terminology is supplied;
- connected that established meaning to the formal Grain question;
- transferred the same question to `news_article`;
- concluded that one `news_article` row represents one article.

A learner merely repeating the word **Grain** without demonstrating the row-meaning judgments is not sufficient completion evidence.

---

## 8. Explicit non-scope

Course 1 / Lesson 1 does **not** teach or assess:

- `DISTINCT`;
- `COUNT`;
- `GROUP BY`;
- `WHERE`;
- Primary Key / Foreign Key;
- Cardinality;
- JOIN.

It also does not establish the design, sequence, capability, or content of Course 1 / Lesson 2 or any later Lesson.

---

## 9. Build boundary

**Buildability result:** PASS. The current authority is sufficient to implement Course 1 / Lesson 1 without inventing a material pedagogical or learner-evidence decision, provided the boundaries below are preserved.

### 9.1 Required observable behavior

The implementation must preserve the approved reasoning sequence and evidence timing:

1. show several real `company` rows as readable data;
2. focus the learner on one company row as a coherent unit;
3. require a learner commitment about what that row represents before supplying Grain terminology;
4. after the correct company-row judgment, attach the formal terms relation, attribute, and Grain to the meaning already established;
5. require a second row-meaning judgment using `news_article`;
6. reveal the article-row conclusion only after learner commitment;
7. close with the approved company/article synthesis.

The learner-facing framing may use the Lesson's analytical question, **What does one row represent?** The build must not invent an unrelated business scenario merely because an existing shell contains a Business Request role. If a shared shell element would force such a scenario, it may be adapted or suppressed for this Lesson without changing the accepted Course 4 experience.

No learner-facing surface in this Lesson may expose PK/FK badges, relationship connectors, uniqueness cues, or other database metadata whose interpretation depends on concepts the Lesson has not introduced. SQL authoring, SQL execution, and SQL-workspace assistance are not part of this Lesson.

Reasoning prompts, response controls, reasoning feedback, Concept Moment content, and local progression follow the stable learner-response-lane contract in `course-design/course-visual-language.md`. Produced row evidence may occupy the workspace/evidence role. Completed reasoning remains reviewable and visually quieter than the current task.

### 9.2 Course-navigation boundary

Course 1 / Lesson 1 must **not** invent a learner-facing progression from its completion directly into Course 4 / Lesson 1. Courses 2 and 3 do not yet contain canonical Lessons, so such a link would silently define missing curriculum.

The current accepted Course 4 learner-facing navigation and unlock behavior remain unchanged during this build.

For implementation and validation, Course 1 / Lesson 1 may be made directly activatable through a non-learner-facing development/test mechanism. The exact technical activation mechanism is implementation discretion and is not a course-navigation decision.

Learner-facing integration of Course 1 / Lesson 1 into a broader course navigation model remains outside this build.

### 9.3 Implementation discretion

Provided the requirements above remain true, implementation may choose:

- the exact number and selection of real `company` rows shown in the initial multi-row view;
- the exact real `news_article` row and visible fields used for transfer;
- the exact constrained/closed-response control;
- exact copy variants for approved distractor meanings and diagnostic feedback;
- internal state representation, DOM/component structure, CSS, and animation;
- whether existing generic schema/workspace surfaces are hidden, simplified, or not used when they would add irrelevant technical metadata;
- the non-learner-facing mechanism used to activate this unaccepted Lesson for development and validation.

These choices must not change the target capability, reveal order, evidence claim, Concept Moment timing, or explicit non-scope.

### 9.4 Validation expectations

Before the implementation can be treated as validated to scope, validation must cover at least:

- repository build/executable success where applicable;
- actual schema/data fidelity for every displayed row/value;
- the full company → meaning → terminology → article transfer → synthesis sequence;
- protection against Grain, PK/FK, relationship, or answer leakage before the required learner commitment;
- diagnostic wrong-answer behavior without premature answer reveal;
- Concept Moment timing after the company-row meaning is established;
- transfer evidence before the article-row conclusion is supplied;
- stable learner-response-lane and workspace/evidence-role conformance across material transitions;
- absence of SQL authoring/workspace behavior from this Lesson;
- regression of accepted Course 4 Lessons 1–2 for any shared entry, shell, styles, or runtime infrastructure materially touched by the implementation.

### 9.5 Stop conditions

Stop and return to authority/design rather than deciding locally if implementation would require:

- a new learner-facing cross-Course navigation or unlock model;
- a new Retry / Redo or persistence semantic;
- changing the approved learner-evidence sequence or making a response optional that completion currently requires;
- exposing unintroduced database concepts in order to reuse an existing shared surface;
- adding a business scenario, new concept, new assessment claim, or new Lesson content not established here;
- changing accepted Course 4 behavior rather than merely preserving it.

This build boundary does not create another Lesson, reusable Lesson template, state-machine requirement, automation manifest, or fixed artifact package.
