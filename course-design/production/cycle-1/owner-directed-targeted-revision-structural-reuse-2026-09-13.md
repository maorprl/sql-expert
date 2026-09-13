# Cycle 1 — Owner-Directed Targeted Revision: Structural Reuse Before Row Multiplication

**Date:** 2026-09-13  
**Status:** CURRENT TARGETED REVISION — SUPERSEDES PRE-RESOLVED ENTRY STATE  
**Scope:** Cycle 1 `funding_round → round_investment` encounter entry sequence only

## Test-drive finding

A targeted runtime test drive showed that the current encounter opens with both relevant relations already placed in the Working Schema and the FK → PK connection already highlighted.

That state over-resolves previously learned relational-reading work before the learner performs it. The defect is in the Encounter Design decision that stated:

> The relation set is pre-resolved in this encounter because relation identification is not part of the accepted target evidence.

The same design also allowed PK/FK relationship markings to be visible before the learner established the connection.

## Owner correction

The following principle now governs this encounter:

> **Previously learned does not mean pre-resolved.**
>
> A reused capability may still be required as a learner action even when it is not part of the encounter's core assessment evidence.

Relation identification and direct FK → PK connection reading remain reused Stage 1 capabilities. They are not retaught and are not promoted to the new row-multiplication capability evidence, but the learner must perform them.

## Superseded entry sequence

The earlier learner-facing state that supplied both relations and their FK → PK connection before learner action is superseded.

The encounter must now begin in this order:

1. **Business request remains visible.**
2. **Working Schema starts empty.** The learner identifies and adds the relevant relations from Live Schema.
3. The correct relation set is `funding_round` and `round_investment`.
4. After the relation set is established, the learner identifies the field in `round_investment` that connects a participation to its funding round.
5. Only after the learner correctly establishes `round_investment.funding_round_id` is the PK/FK connection revealed and visually highlighted.
6. The learner then establishes the requested output Grain.
7. The learner interprets relationship Cardinality from the relationship they already established.
8. Only after the Cardinality judgment is correct may the compact `1 : M` relationship marking be shown.
9. The existing qualitative row-multiplication prediction, repeated-context judgment, supporting concrete application, SQL authoring, and result verification then continue unchanged unless separately corrected.

## Evidence meaning

The two new entry actions are **reuse checkpoints**, not new core evidence for the accepted target capability:

- selecting the relevant relations;
- identifying the direct connection field.

They must not be presented as new Concept Moments or as first-exposure teaching of relations, PK, or FK.

Their purpose is to require the learner to use already introduced relational-reading capability instead of having the system perform that reasoning for them.

The accepted target evidence remains:

- target Grain;
- relationship Cardinality;
- qualitative prediction that one funding round can occupy several participation-grain rows;
- prediction that one-side context can repeat across those distinct rows;
- post-SQL reconciliation with actual result evidence.

## Learner-facing guidance correction

The prior Cardinality guidance:

> Read the FK → PK relationship direction. Reuse Cardinality from Stage 1; do not infer it from the current rows.

is superseded because it reads as internal course-design language rather than teacher voice.

At the Cardinality step, guidance should instead stay inside the learner situation, for example:

> You found how a participation connects to a funding round. Now consider what that relationship allows in each direction.

Guidance must not refer to "reusing Stage 1" or other curriculum-management language.

## Scope boundary

This revision does **not** reopen:

- the selected `funding_round → round_investment` case;
- the target row-multiplication capability;
- the Lightweight Independent Pedagogy Gate verdict;
- the qualitative prediction correction already approved on 2026-09-13;
- the SQL result contract;
- the final `funding_round_id = 1003` verification;
- Stage 1 design or implementation.

This is a targeted correction to the entry/reuse sequence discovered through runtime test drive.