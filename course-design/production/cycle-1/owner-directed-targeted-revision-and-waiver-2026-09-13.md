# Cycle 1 Owner-Directed Targeted Design Revision and Waiver — Row Multiplication

**Date:** 2026-09-13  
**Status:** OWNER-APPROVED TARGETED REVISION — DIRECT IMPLEMENTATION AUTHORIZED  
**Base design:** `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`

## 1. Scope of this revision

This record does not reopen the accepted capability, case, Course-Assumed Learner State, or Lightweight Pedagogy Gate.

It corrects one identified learner-evidence defect in the Encounter Design: the original Episode 3 numerical prompt supplied a concrete multiplicity (`three matching participation records`) before asking for the row count, so the claimed core evidence could be produced by direct counting without sufficiently diagnosing the target integration of Cardinality + target Grain.

This revision is governed by the current `Evidence Independence Test` and `Scaffolding-to-Evidence Calibration` in `learner-encounter-production-process.md`.

Where this record conflicts with the base design, this record controls. All unaffected constraints, visual-language requirements, scope exclusions, SQL semantics, and result-evidence requirements in the base design remain in force.

## 2. Revised Episode 2 learner-facing guardrail

After correct Cardinality interpretation, the learner-facing consolidation is limited to:

> Each participation belongs to one funding round, and one funding round can have multiple participation records.

The schema-level parent-side optionality remains a design/validation guardrail, but `zero` is not made an active learner-facing idea in this encounter. The implementation must still avoid claiming that every possible funding round necessarily has a participation.

## 3. Revised Episode 3 — core pre-execution evidence

The learner first sees only premises already established:

- target Grain = one recorded participation per result row;
- one funding round can relate to multiple participation records.

### Core evidence A — qualitative result-shape prediction

Before any concrete child count is supplied, ask:

> Using the Grain and relationship you established, what must happen in the result if the same funding round has several recorded participations?

The correct interpretation is:

> That funding round can occupy several result rows — one for each recorded participation.

Distractors must preserve the diagnostic distinction: exactly one row per round; collapsing participation records; or changing the target Grain to funding round.

This is the primary evidence that the learner combines Cardinality and target Grain to infer row multiplication.

### Core evidence B — repeated one-side context

Then ask what happens to round-level context such as `round_type` and `announced_date` across those distinct participation rows.

The correct interpretation is that the round-level values can repeat while participation identity differs; repeated round context does not make those rows duplicates.

Only after both core predictions are resolved may the course name **JOIN row multiplication** and show a local explanatory visual.

## 4. Concrete multiplicity becomes supporting application, not core evidence

After the qualitative prediction has been committed, a concrete application may ask:

> If one funding round has three recorded participations, how many participation-grain rows are needed?

Correct answer: three distinct participation rows.

This numerical step is supporting application evidence. It must not be cited by itself as proof of the target capability.

## 5. Revised evidence contract

Core evidence is now:

- **E1 — Target Grain:** one recorded participation per result row.
- **E2 — Cardinality use:** one funding round can relate to multiple participation records while each participation belongs to one round.
- **E3 — Qualitative pre-execution multiplication prediction:** without being given a numeric child count, learner predicts that one funding round can occupy several result rows when several participations must remain represented at participation Grain.
- **E4 — Pre-execution repetition interpretation:** learner predicts repeated round-level context across distinct participation rows without diagnosing those rows as duplicates.
- **E5 — Post-execution reconciliation:** learner interprets the actual `funding_round_id = 1003` result slice as distinct participation rows for one round with repeated round context.

Supporting evidence:

- concrete `3 participations → 3 participation rows` application;
- semantically valid direct INNER JOIN producing the six-field, 72-row current result.

Assistance provenance remains required for evidence-bearing actions.

## 6. Revised reveal-order requirements

The required local sequence is:

1. business request and supplied schema relations;
2. target Grain;
3. relationship Cardinality;
4. qualitative multiplication prediction from Grain + Cardinality;
5. repeated round-context / non-duplicate prediction;
6. JOIN row multiplication Concept Moment and optional local visual;
7. concrete numerical application;
8. learner-authored SQL;
9. actual query result and local 1003 evidence slice;
10. final verification and completion.

No numeric example, row-multiplication conclusion, explanatory visual, or actual 1003 slice may precede the qualitative core prediction.

## 7. Owner-directed process exception

The Course Authority Owner explicitly approves this targeted correction and authorizes direct implementation without rerunning the remaining pre-build review chain for this correction.

Specifically waived for this owner-directed revision:

- Independent Pedagogy Design Review rerun;
- Independent UX Design Review rerun;
- Architect Reconciliation for the targeted defect;
- Auditor Pre-Build Control rerun.

This waiver does **not** assert that skipped gates were performed or passed. It is an explicit exception for this current Cycle 1 correction only and does not establish a reusable course-production rule.

Implementation authority for this build is therefore the base Encounter Design Packet as modified by this record.
