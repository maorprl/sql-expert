# Cumulative INNER JOIN Transfer — Capability & Case Brief

**Date:** 2026-09-15  
**Status:** CAPABILITY / CASE BRIEF COMPLETE — READY FOR LIGHTWEIGHT INDEPENDENT PEDAGOGY GATE  
**Baseline implementation:** `main` at `1856d9a68c013bdf455f3339a3c641869529bd1d`  
**Decision branch:** `cumulative-inner-join-transfer-capability-gate`  
**Action type:** Capability / Case planning gate — no runtime change

## 1. Decision being made

This brief answers one planning question:

> After the current three INNER JOIN encounters, should the course now require stronger cumulative transfer evidence for the already-covered INNER JOIN reasoning, and if so, what learner situation can test that transfer without introducing a new relational concept merely to create difficulty?

This is not a Stage-design artifact and does not authorize implementation.

It does not assume that a new unit must be called Stage 4, that the current Stage sequence is globally fixed, or that Wave 5 is blocked by course authority.

The Course Authority Owner has chosen to investigate the cumulative-transfer gap before returning to Wave 5. That work-sequencing choice is separate from the earlier audit finding; the audit itself did not establish Wave 5 as blocked.

## 2. Current evidence basis

The current Stage 1–3 reasoning-depth audit and its independent review establish the following bounded findings:

- no local reasoning-depth defect currently requires reopening Stage 1;
- no local reasoning-depth defect currently requires reopening Stage 2;
- no local reasoning-depth defect currently requires reopening Stage 3;
- the three encounters do not yet establish cumulative independent transfer of the covered INNER JOIN reasoning;
- a cumulative-transfer capability decision is a valid next investigation;
- the audit alone did not make that investigation the exclusive mandatory next workstream.

This brief accepts those reviewed findings as inputs. It does not reinterpret them as proof that a new encounter is automatically necessary.

## 3. Current authority and constraints

### Course exit direction

The current exit criteria ultimately require the learner to solve a business question about an unfamiliar database through relational understanding rather than random SQL trial and error, including the ability to:

- understand relation and row meaning;
- identify keys and relationships;
- define required output Grain;
- locate required information;
- predict what relational operations preserve, remove, or duplicate;
- build a relational solution plan before SQL;
- choose an appropriate relational operation and explain why;
- translate the plan into SQL;
- validate the result through sanity checks;
- diagnose surprising results from structure and relationships.

The current three encounters are not expected to satisfy the entire course exit criteria. The present decision concerns only the INNER JOIN-related subset already taught.

### Knowledge-map boundary

The current knowledge map includes, among other later capabilities:

- LEFT JOIN / NULL;
- fanout and metric corruption;
- aggregation / pre-aggregation;
- EXISTS / NOT EXISTS;
- many-to-many bridges;
- subqueries;
- self joins;
- window functions.

Those later concepts must not be pulled into this transfer check merely to raise difficulty.

### Production-process evidence standard

The `Evidence Independence Test` requires that core evidence not be producible from wording, supplied quantities, conclusion-shaped scaffolds, or answer structure without performing the claimed target reasoning.

The `Scaffolding-to-Evidence Calibration` requires support to match the claimed evidence strength. Scaffolding appropriate for first exposure must not be treated as independent-transfer evidence merely because the learner answered correctly.

## 4. Course-Assumed Learner State after the current three encounters

The course may now legitimately assume that the learner has been introduced to and has exercised the following with varying levels of support:

### Introduced and supported

- result Grain as what one requested result row represents;
- direct PK/FK relationship reasoning;
- relationship Cardinality;
- matching-row semantics;
- INNER JOIN and `ON` as implementation of an established relationship;
- learner-authored INNER JOIN SQL;
- result inspection against an earlier relational prediction.

### Reused / integrated beyond first exposure

- using target Grain together with one-to-many Cardinality to predict row multiplication;
- recognizing that repeated one-side context does not make finer-grain rows duplicates;
- reconciling actual repeated one-side values with changing detail identifiers.

### Reused in a boundary case

- discovering a real zero-match parent from data;
- applying INNER JOIN matching semantics to predict that the unmatched entity contributes no result row;
- distinguishing total result-row count from entity coverage.

### Not yet established

The course may **not** yet assume that the learner can independently, in an unfamiliar case and with materially reduced cueing:

- decide which of the covered JOIN behaviors is relevant;
- coordinate relation selection, target Grain, relationship/Cardinality, and row-survival/multiplication reasoning into one relational plan;
- predict both row-shape and coverage consequences without the encounter naming the local phenomenon first;
- choose and implement the already-known INNER JOIN from that plan;
- choose appropriate result evidence to validate the plan.

The course also may not assume mastery of LEFT JOIN, NULL, aggregation, fanout repair, bridge-table reasoning, or other later capabilities.

## 5. Capability decision

### Target capability

The proposed cumulative-transfer capability is:

> Given a new but structurally accessible two-relation analytical request that can be solved with the already-taught INNER JOIN, independently construct the relational plan before SQL: identify the relevant relations and relationship, state the requested output Grain, determine which already-covered Cardinality / matching consequences matter, predict the result behavior, implement the INNER JOIN, and validate the actual result against the plan with materially reduced cueing.

This is not a new SQL-syntax capability.

It is a stronger evidence claim about coordinating already-covered relational reasoning.

### Why stronger transfer evidence is justified now

**Decision: YES — a cumulative transfer checkpoint is justified now.**

Rationale:

1. The current three encounters form a coherent INNER JOIN learning cluster with distinct supported roles: first exposure, multiplication integration, and zero-match boundary-case reuse.
2. The remaining gap is no longer lack of exposure to those mechanisms; it is lack of evidence that the learner can select and coordinate them in a new case.
3. Testing this before introducing later relational operations isolates the transfer claim. If transfer is deferred until after LEFT JOIN, aggregation, fanout repair, or other new concepts, failure becomes harder to interpret because new-content load and old-content transfer are confounded.
4. The exit criteria ultimately require relational planning and prediction on unfamiliar data, so some cumulative transfer evidence will be required before course completion.
5. The course now has enough distinct INNER JOIN experience to make a reduced-cueing checkpoint meaningful without pretending that the learner has mastered the entire knowledge map.

This is a planning judgment about the current progression, not a universal rule that every three teaching encounters require an immediate transfer checkpoint.

## 6. Is a new learner-facing evidence situation required?

**Decision: YES — technical/runtime re-validation of the existing three encounters cannot supply the missing evidence.**

The current gap concerns what reasoning the learner performs when the local phenomenon is not already framed for them.

Re-running Stage 1–3 or adding another post-build technical test would validate implementation behavior, not create new learner evidence.

A new learner-facing evidence situation is therefore required.

However, the required artifact is best understood as a **compact cumulative transfer checkpoint / encounter**, not automatically as a new teaching Stage.

Its primary function is stronger validation and transfer, not introduction of a new relational concept.

No Stage number is established by this decision.

## 7. Required evidence strength

The transfer checkpoint must require materially more independent coordination than the current encounters while staying inside taught concepts.

Core evidence should establish that the learner can, with reduced cueing:

1. identify the relations needed from the business request;
2. identify the relevant direct relationship and connecting key;
3. state the requested output Grain;
4. determine the relevant relationship/Cardinality implications rather than being told which phenomenon to inspect;
5. predict expected row behavior before execution;
6. distinguish legitimate repeated one-side context from duplicate finer-grain records where applicable;
7. recognize whether unmatched one-side entities can be absent from an INNER JOIN result where applicable;
8. select / justify INNER JOIN as the relational operation for the requested matched-row result;
9. implement semantically correct SQL using the established relationship;
10. choose or perform a result sanity check that tests the earlier relational plan.

The checkpoint does not need to turn all of these into open-text questions. Closed or structured interactions remain permissible if they do not supply the reasoning conclusion being claimed as evidence.

## 8. Scaffolding boundary for the transfer checkpoint

To count as stronger cumulative transfer evidence, the encounter must not simply reproduce the Stage 1–3 cueing sequence with different table names.

In particular, before the learner has made the relevant reasoning commitment, do not automatically surface a summary such as:

- `Target Grain = ...`;
- `one parent can have many children`;
- `there is a zero-match entity`;
- `this is a multiplication case`;
- `this is a coverage case`;
- `use INNER JOIN`;
- `expect N rows`.

Those may become feedback, reviewable established reasoning, or assistance after learner engagement.

Assistance may still exist, but assistance provenance must remain distinguishable from unassisted transfer evidence.

This brief does not define a general hint policy.

## 9. Case requirements

A suitable case must:

- use only already-covered INNER JOIN reasoning as the relational operation under assessment;
- use a relation pair not already used as the central pair in Stage 1–3;
- support a credible analytical/business request independently of the teaching objective;
- have a clear target Grain;
- expose at least one non-trivial already-covered JOIN consequence through the actual relationship/data;
- preferably allow more than one covered consequence to matter without turning the task into a contrived checklist;
- avoid introducing a new required operation or untaught semantic repair;
- avoid bridge-table / many-to-many reasoning unless that capability has already been established;
- avoid requiring LEFT JOIN / NULL reasoning;
- avoid aggregation or metric-validity reasoning;
- avoid a case whose answer is reducible to a supplied numeric example.

## 10. Candidate case comparison

### Candidate A — `company → company_office`

Structure:

- `company.company_id` is the parent PK;
- `company_office.company_id` is a non-null FK to `company.company_id`;
- one company can have multiple recorded office rows;
- an office row belongs to one company;
- the current data includes multiple office rows for some companies;
- the current data also includes a company with no `company_office` row.

Current data characteristics:

- 12 company rows;
- 14 company-office rows;
- company 1 has three recorded office rows;
- company 2 has two recorded office rows;
- most represented companies have one office row;
- company 20 has no office row.

Plausible analytical request:

> Build a recorded-office inventory showing every recorded company-office entry with company context, and determine whether that office-level report can also be treated as evidence that every company is represented.

Possible output Grain:

> one recorded company-office entry per result row.

Why it is strong for transfer:

- relation pair is new;
- direct FK→PK shape is already within taught reasoning;
- finer office Grain naturally permits repeated company context;
- actual data contains both one-to-many multiplication and a zero-match company;
- the learner can be required to decide which covered implications matter instead of being told that the case is specifically about multiplication or zero matches;
- the requested INNER JOIN itself needs no new syntax or relational concept;
- the coverage question is analytically coherent because an office inventory is not automatically a complete company roster.

Risk:

- if the encounter explicitly announces both `multiple offices` and `company with no office` before prediction, it would recreate the cueing problem rather than test transfer;
- design must preserve discovery / reasoning rather than pre-summarize those facts.

**Assessment: STRONGEST CURRENT CANDIDATE.**

### Candidate B — `investor → round_investment`

Structure:

- `round_investment.investor_id` references `investor.investor_id`;
- one investor can appear in multiple investment-participation rows.

Strengths:

- direct FK→PK INNER JOIN;
- credible investor participation-history request;
- multiplication / repeated investor context can be exercised.

Weaknesses:

- `round_investment` was already the central detail relation in Stage 2;
- the learner has substantial familiarity with its Grain and identifiers;
- this reduces case distinctness and makes pattern recognition more plausible;
- current seeded investors are represented in round investments, so the case is less useful for integrating the zero-match / coverage behavior already covered in Stage 3.

**Assessment: PLAUSIBLE BUT WEAKER TRANSFER TEST.**

### Candidate C — `company → company_founder`

Structure:

- `company_founder.company_id` references `company.company_id`;
- companies may have multiple founder association rows;
- `company_founder` has a composite primary key `(company_id, person_id)` and also references `person`.

Strengths:

- new relation pair;
- supports one-to-many repeated company context.

Weaknesses:

- the relation is an associative structure between company and person;
- a business-meaningful founder report naturally wants founder identity/name from `person`, creating a three-relation case;
- using only `company` + `company_founder` risks an artificial request centered on IDs/titles;
- using `person` introduces multi-relation chaining / associative-relation reasoning beyond the narrow transfer target.

**Assessment: REJECT FOR THIS CHECKPOINT — TOO MUCH CONFOUND.**

### Candidate D — `company → company_acquisition`

Structure:

- `company_acquisition.company_id` is both PK and FK to `company.company_id`;
- the current instance contains one acquisition row and many companies with no acquisition row.

Strengths:

- new pair;
- clean unmatched-row behavior.

Weaknesses:

- relationship shape is effectively one-to-zero-or-one rather than the already-practised one-to-many shape;
- current data is highly sparse;
- it tests zero-match survival strongly but contributes little evidence about integrating multiplication / repeated-context reasoning;
- it risks making a new Cardinality shape part of what should be a transfer-only checkpoint.

**Assessment: REJECT FOR THIS CHECKPOINT — TOO NARROW / NEW STRUCTURAL EMPHASIS.**

### Familiar-pair alternatives

Reusing `news_article → news_source`, `funding_round → round_investment`, or `company → funding_round` could reduce implementation novelty but would be a weaker cumulative transfer test because the relation pair and local phenomenon are already heavily associated with a previous encounter.

**Assessment: REJECT AS PRIMARY TRANSFER CASE.**

## 11. Case decision

**SELECTED CASE FOR THE NEXT DESIGN GATE:** `company → company_office`.

Selection rationale:

The case is preferred because it combines the strongest current transfer properties with the fewest untaught confounds:

- new relation pair;
- same already-covered direct FK→PK reasoning;
- a clear finer result Grain;
- legitimate repeated one-side company context;
- a real zero-match company in the current data;
- no need for LEFT JOIN, NULL, aggregation, bridge-table reasoning, or new JOIN syntax;
- a credible analytical distinction between an office-level inventory and complete company coverage.

The case is not selected because it happens to contain more phenomena. It is selected because those phenomena are already-covered INNER JOIN consequences that the learner must now coordinate rather than learn for the first time.

## 12. Intended learner evidence for the selected case

A future Encounter Design must define the exact interaction sequence, but the case should be capable of producing evidence that the learner can independently establish a relational plan similar to:

- business request requires company context plus recorded office entries;
- relevant relations are `company` and `company_office`;
- `company_office.company_id` links an office entry to its company;
- requested output Grain is one recorded office entry;
- one company may contribute multiple office-grain result rows;
- repeated company fields across different office rows are not automatically duplicates;
- a company with no office row cannot contribute a matched INNER JOIN pair and therefore is absent from the matched office result;
- the office-level result can therefore be analytically correct for recorded offices while not representing every company;
- INNER JOIN / `ON` implements the established matched-row plan;
- actual Results are inspected to validate both row meaning and company coverage.

The future design must avoid simply presenting this list to the learner before asking them to reproduce it.

## 13. Evidence Independence requirements for the future design

The future design will fail this capability purpose if it does any of the following before the corresponding learner reasoning:

- announces that `company` has one-to-many office rows and then asks whether a company can repeat;
- announces the identity of the zero-office company and then treats recognition of its absence as core transfer evidence;
- supplies an exact result-row count and then treats copying that count as the main prediction;
- labels the task `row multiplication` or `zero-match coverage` before the learner identifies those implications;
- tells the learner to use INNER JOIN before operation selection is part of the intended evidence;
- presents a completed relational-plan summary before the learner has committed the plan.

The design may still provide assistance after engagement and may use structured answer forms, but the core capability claim must survive the Evidence Independence Test.

## 14. Relationship to Wave 5

This decision does not cancel Wave 5.

The current sequencing choice is:

1. resolve whether the cumulative transfer gap is real and actionable;
2. if the transfer checkpoint passes its design / validation gates, reassess what assistance evidence remains;
3. return to Wave 5 with clearer knowledge of where learners need support during genuinely independent reasoning.

This sequence is chosen because assistance design can be better calibrated after the course has at least one reduced-cueing transfer situation. It is not represented as a permanent course rule.

## 15. Explicit non-scope

This brief does not authorize:

- runtime implementation;
- a Stage 4 label;
- a global Stage sequence;
- LEFT JOIN or NULL teaching;
- aggregation;
- fanout repair;
- bridge-table teaching;
- a new hint system;
- attempt-based adaptive assistance;
- changes to Stage 1–3;
- changes to current acceptance semantics;
- changes to course controls;
- changes to Wave 5 authority.

## 16. Decision and next process action

### Capability verdict

`PROCEED — STRONGER CUMULATIVE TRANSFER EVIDENCE IS JUSTIFIED NOW`

### Evidence-form verdict

`NEW LEARNER-FACING TRANSFER CHECKPOINT REQUIRED — NOT AUTOMATICALLY A NEW TEACHING STAGE`

### Case verdict

`SELECT company → company_office FOR INDEPENDENT PEDAGOGY GATE REVIEW`

### Next action

Per the current learner-encounter production process, the next action is a **Lightweight Independent Pedagogy Gate** on this Capability & Case Brief.

That review must independently check:

- whether the cumulative capability gap is real;
- whether it should be addressed now;
- whether a new learner-facing checkpoint is actually required;
- whether the Course-Assumed Learner State is calibrated correctly;
- whether `company → company_office` genuinely tests transfer rather than merely reproducing Stage 2 / Stage 3 with renamed tables;
- whether the business / analytical request remains coherent without the teaching objective;
- whether alternative cases were compared fairly;
- whether the intended evidence can remain independent under reduced cueing;
- whether any unresolved authority decision blocks proceeding.

No Encounter Design should begin unless that gate returns `PROCEED`.
