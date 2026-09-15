# Cumulative transfer priority decision

**Date:** 2026-09-15  
**Status:** HISTORICAL / SUPERSEDED PRIORITY DECISION — NO CURRENT WORK AUTHORIZATION  
**Baseline:** current `main` after Stage 2 authority extraction

This document preserves a pedagogical priority decision made at an earlier point on 2026-09-15.

The `next` / `next action` language below records the decision sequence at that time. It no longer defines the repository's current work state. Subsequent work proceeded through the corrected cumulative-checkpoint discussion, Stage 1–3 topology work, Wave 4, Wave 5A, and the Wave 5B decision gate.

Current work state and next action are maintained in:

`course-experience-improvement-work-management.md`

where the current next action is an evidence-based category-selection / mapping decision and no runtime change is authorized before that mapping is complete.

## Historical decision

The next pedagogical design problem at the time of this decision was **cumulative transfer of the currently covered INNER JOIN reasoning**, before beginning Wave 5 graduated / adaptive assistance work.

This was a priority decision, not a claim that Wave 5 was blocked by course authority and not a permanent course-sequencing rule.

Wave 5 remained valid queued improvement work and was to be revisited after the transfer situation was considered.

## Why transfer was selected as the next problem at that time

### 1. It was directly tied to the course exit capability

`course-exit-criteria.md` requires the learner eventually to take a business question about an unfamiliar database and solve it from the data structure and relationships rather than trial-and-error SQL.

That includes:

- identifying relevant relations;
- defining output Grain;
- reasoning from keys and Cardinality;
- predicting preservation, disappearance, and duplication;
- building a relational plan before SQL;
- choosing an operation because it fits the analytical need;
- validating the result with sanity checks.

The implemented INNER JOIN encounters developed important pieces of that capability, but did not by themselves establish cumulative ability to coordinate those pieces independently in a materially new case.

### 2. Stage authority stopped short of cumulative independent transfer

Stage 1 was the first supported JOIN teaching encounter.

Stage 2 developed Grain + Cardinality reasoning for row multiplication, while its authority explicitly listed **cumulative independent transfer to a materially new relation pair** as non-scope.

Stage 3 reused INNER JOIN in a zero-match / coverage case and required learner-generated evidence, but still defined the relational problem under examination and guided the learner through relation selection, relationship reasoning, Grain, prepared evidence, prediction, SQL, verification, and business conclusion.

Together the three encounters established a meaningful progression of covered reasoning. They did not by themselves establish that the learner could independently determine which covered ideas mattered in a new INNER JOIN problem and assemble them into a plan.

### 3. Wave 5 was not itself an established pedagogical requirement

At that point `course-experience-improvement-work-management.md` described Wave 5 as queued candidate work around graduated hints, escalation, verification after strong assistance, and possible support adaptation.

The broader hint / adaptive system was not established course authority merely because it was queued.

### 4. Transfer was expected to provide a better evidence base for assistance design

Adaptive or graduated assistance is most useful when the course knows what the learner actually struggles to coordinate without heavy cueing.

The decision therefore treated cumulative work as a possible way to expose support needs such as relation identification, target Grain, relationship interpretation, row-behavior prediction, operation choice, SQL translation, or validation.

## What this historical decision did not establish

It did **not**:

- create a Stage 4;
- choose a transfer case;
- choose a relation pair;
- change Stage 1, Stage 2, or Stage 3;
- change runtime;
- introduce LEFT JOIN, `NULL`, aggregation, fan-out repair, bridge-table reasoning, or another new relational concept;
- define a global hint system;
- define attempt-count escalation;
- define adaptive-support rules;
- require that every future concept cluster receive a transfer checkpoint at the same point;
- permanently determine the ordering of later improvement work.

## Historical constraint on the proposed learner situation

The proposed next design was intended to test **coordination of already-covered INNER JOIN reasoning**, not create difficulty by adding a new relational concept.

A suitable learner situation was expected to require materially reduced cueing around some combination of:

- identifying the relevant relations;
- identifying the relationship;
- establishing target output Grain;
- determining which Cardinality / matching consequence matters;
- predicting row preservation, multiplication, repetition, or disappearance where the selected case naturally requires it;
- selecting INNER JOIN because it fits the business request rather than because the encounter announces the operation;
- translating the plan into SQL;
- choosing or performing a sanity check against the plan.

## Historical next action

At the time, the intended next action was to design a cumulative INNER JOIN transfer checkpoint from current course authority and current schema/data.

That historical action no longer authorizes current work. Current work must follow the present management state in `course-experience-improvement-work-management.md`.
