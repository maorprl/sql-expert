# Stage 1 Learner Test-Drive Findings — 2026-09-08

STATUS: REFERENCE ONLY — NON-AUTHORITATIVE TEST-DRIVE FINDINGS

## Purpose

This record preserves observations from the learner test-drive, provides evidence for later review, and prevents findings from being lost between iterations.

This document is not:

- a source of truth;
- a design specification;
- an approved-fixes list;
- a pedagogical rule set;
- authority for implementation.

## Tested version

- Stage 1 implementation commit: `86f51b98087df7e2e2e0931c6e9361a96cbb607d`
- Business case: `news_article → news_source`
- Test-drive date: `2026-09-08`

## RESOLVED / VERIFIED AFTER FIX

### Completed-interaction presentation

- Fixed by commit `4c779cd` — Extract shared interaction lifecycle.
- Manual learner test confirmed completed interactions are compact by default.
- Completed content remains reviewable.
- Deliberately opened reviews retain their state.
- No regression was observed in progression, Working Schema, Concept Moments, the Cardinality visual, baseline, SQL, validation, or completion.

## ACTIVE observed findings

### 1. Guidedness / hand-holding

Stage 1 is structured and constrained but does not consistently feel like it walks the learner through the reasoning journey. The learner experience often feels like:

question → answer → next question

rather than:

what we established → why the next reasoning step is needed.

The initial business request also feels somewhat abrupt/sharp.

### 3. Visual atmosphere

The interface remains cold, technical, and tool-oriented across:

- the general learner flow;
- the Working Schema;
- Concept Moments;
- SQL implementation.

This appears to be an implementation gap against the existing course visual-language intention, not a new principle.

### 4. SQL workspace usability

The SQL editor is visually dominant and the learner cannot control its height. This can separate instruction from the workspace and require unnecessary scrolling.

## Positive observations

- The relational-to-SQL progression felt coherent.
- The transition from semantic JOIN reasoning to `INNER JOIN ... ON` instruction worked well.
- The local Cardinality visual was understandable and reinforced the relationship after the reasoning step.

## ITEMS TO REVIEW LATER — NOT CONFIRMED PROBLEMS

- **Step 6 successful prediction feedback may be over-explained.** This is a review note, not learner-reported evidence. The successful feedback repeats row-preservation reasoning after the learner has already answered correctly. The clearest parts were the equation `18 news articles × 1 matching source each = 18 result rows.` and the conclusion `The result keeps one news article per row.`
- Step 8 output requirements are visible by default.
- The required output uses `news_article.title` and `news_source.name`, so later review should consider whether article grain is sufficiently inspectable.
- The learner is instructed to keep the baseline query and write the JOIN statement beneath it in the same editor.

No corrective action is authorized by this document. It preserves learner test-drive evidence for later review only.
