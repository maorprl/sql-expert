# Cumulative transfer priority decision

**Date:** 2026-09-15  
**Status:** CURRENT PEDAGOGICAL PRIORITY DECISION — NO RUNTIME CHANGE  
**Baseline:** current `main` after Stage 2 authority extraction

## Decision

The next pedagogical design problem is **cumulative transfer of the currently covered INNER JOIN reasoning**, before beginning Wave 5 graduated / adaptive assistance work.

This is a priority decision, not a claim that Wave 5 is blocked by course authority and not a permanent course-sequencing rule.

Wave 5 remains valid queued improvement work. It should be revisited after the transfer situation has been designed and used to clarify what assistance is actually needed when the learner must coordinate previously covered reasoning with materially reduced cueing.

## Why transfer is the next problem

### 1. It is directly tied to the course exit capability

`course-exit-criteria.md` requires the learner eventually to take a business question about an unfamiliar database and solve it from the data structure and relationships rather than trial-and-error SQL.

That includes:

- identifying relevant relations;
- defining output Grain;
- reasoning from keys and Cardinality;
- predicting preservation, disappearance, and duplication;
- building a relational plan before SQL;
- choosing an operation because it fits the analytical need;
- validating the result with sanity checks.

The currently implemented INNER JOIN encounters develop important pieces of that capability, but they do not yet establish the cumulative ability to coordinate those pieces independently in a materially new case.

### 2. Current Stage authority explicitly stops short of cumulative independent transfer

Stage 1 is the first supported JOIN teaching encounter.

Stage 2 develops Grain + Cardinality reasoning for row multiplication, but its current authority explicitly lists **cumulative independent transfer to a materially new relation pair** as non-scope.

Stage 3 reuses INNER JOIN in a new zero-match / coverage case and requires learner-generated evidence, but the encounter still defines the relational problem under examination and guides the learner through a known sequence of relation selection, relationship reasoning, Grain, prepared evidence, prediction, SQL, verification, and business conclusion.

Together the three encounters establish a meaningful progression of covered reasoning. They do not yet establish that the learner can independently determine which of those covered ideas matter in a new INNER JOIN problem and assemble them into a plan.

### 3. Wave 5 is not itself an established pedagogical requirement

`course-experience-improvement-work-management.md` describes Wave 5 as queued candidate work around graduated hints, escalation, verification after strong assistance, and possible support adaptation.

The same record explicitly says the broader hint / adaptive system remains **CANON DECISION REQUIRED** and is not assumed necessary merely because it is queued.

Therefore the existence of Wave 5 does not establish that assistance-system design should precede the unresolved transfer evidence gap.

### 4. Transfer gives Wave 5 a better evidence base

Adaptive or graduated assistance is most useful when the course knows what the learner actually struggles to coordinate without heavy cueing.

Designing Wave 5 only from the existing guided encounters risks optimizing assistance around already-scaffolded local tasks rather than around the independent reasoning the course ultimately wants.

A cumulative transfer checkpoint can expose where support is genuinely needed: relation identification, target Grain, relationship interpretation, row-behavior prediction, operation choice, SQL translation, or validation.

Wave 5 can then respond to observed assistance needs instead of inventing a generic adaptive system first.

## What this decision does not establish

This decision does **not**:

- create a Stage 4;
- choose a transfer case;
- choose a relation pair;
- change Stage 1, Stage 2, or Stage 3;
- change current runtime;
- introduce LEFT JOIN, `NULL`, aggregation, fan-out repair, bridge-table reasoning, or another new relational concept;
- define a global hint system;
- define attempt-count escalation;
- define adaptive-support rules;
- require that every future concept cluster receive a transfer checkpoint at the same point;
- declare Wave 5 invalid or permanently deferred.

## Constraint on the next learner situation

The next design should test **coordination of already-covered INNER JOIN reasoning**, not create difficulty by adding a new relational concept.

A suitable learner situation should therefore require materially reduced cueing around some combination of:

- identifying the relevant relations;
- identifying the relationship;
- establishing target output Grain;
- determining which Cardinality / matching consequence matters;
- predicting row preservation, multiplication, repetition, or disappearance where the selected case naturally requires it;
- selecting INNER JOIN because it fits the business request rather than because the encounter announces the operation;
- translating the plan into SQL;
- choosing or performing a sanity check against the plan.

The design must avoid supplying the key relational conclusions before they are intended as learner evidence.

## Next action

**Design the cumulative INNER JOIN transfer checkpoint directly from current course authority and current schema/data.**

That next design step should:

1. define the exact transfer capability to evidence;
2. compare plausible current-schema cases for transfer value and confounds;
3. select a case only if it can test already-covered reasoning without requiring untaught concepts;
4. specify the minimum necessary scaffolding and protected evidence;
5. leave Wave 5 assistance semantics open until the transfer situation reveals what support is actually justified.

No runtime implementation is authorized by this priority decision.
