# Lesson 1 Authority Remediation — Implementation Record — 2026-09-19

**Status:** IMPLEMENTED AND VALIDATED TO THE AUTHORIZED SCOPE — EVIDENCE ONLY — NOT PRODUCT-BASELINE ACCEPTANCE

**Repository:** `maorprl/sql-expert`

**Starting branch / commit:** default branch `main` at `c0e9dfa04a592f76fb21e92a7e11dac6ae04d850`

**Authority-maintenance commit:** `0362074ac3ed679a76745d6602f2ec69ff4c440b`

**Remediated runtime lineage:** `c95ff0aacbfd533d741d486fcb86bc790f7e1437`

This record documents implementation and validation evidence only. It does not accept the resulting runtime as the product baseline.

## Files changed

- `src/stage1-prototype-runtime.js`
- `scripts/validate-stage1-remediation.mjs`
- `course-design/reviews/lesson-1-authority-remediation-implementation-record-2026-09-19.md`

No CSS, authority, reconciliation, remediation-plan, schema, seed, Lesson 2, Lesson 3, work-management, or product-baseline file was changed.

## AR-1 — Evidence-safe directional Cardinality

- Replaced the leaking masthead `Media coverage — one article, one publisher` with the neutral `Media coverage — articles and publishing sources`.
- Reframed connecting-field prompts and local recovery around locating related publishing-source information without stating first-direction multiplicity.
- Replaced the answer-leaking PK/FK explanation with two independent premises:
  - Primary Key uniqueness supplies `at most one` matching `news_source` row.
  - `NOT NULL` plus a satisfied Foreign Key supplies an existing matching `news_source` row.
- Kept the first-direction response closed and required the learner to combine those premises.
- Made the `many` correction point only to Primary Key uniqueness and the `none` correction point only to the required satisfied reference. Neither correction states the combined conclusion.
- Moved the durable conclusion to the post-commitment thread/teacher transition: one article contributes one source match.
- Preserved the separate reverse-direction question and added `Venture Daily → 6 articles` only after reverse-direction success.
- Kept the aggregate `4 source rows → 18 matching pairs/result rows` comparison absent.
- Kept Cardinality terminology and notation after both directional commitments.
- During the browser walkthrough, found that visually transparent `M / 1` markers were still present in the accessibility tree before commitment. Added state-controlled `hidden` handling so the markers are neither visible nor accessibility-exposed until reverse-direction success. This was an AR-1 conformance fix in the authorized runtime file and required no CSS change.

The implemented first-direction behavior is a supported first-exposure deduction. It does not claim independent Cardinality mastery.

## AR-2 — One continuous match-contribution argument

- Rephrased the durable reasoning thread as ordered causal facts rather than a topic ledger:
  - requested article rows plus publishing-source names;
  - needed article and related-source information;
  - relationship field;
  - one source match contributed by one article;
  - directional reverse potential-many contrast;
  - one-article requested-result Grain;
  - 18-row starting baseline;
  - 18 matching-pair / 18 article-grain-row prediction;
  - verified 18-row article-grain result.
- Preserved `Grain → baseline → prediction` and explicitly distinguished requested row meaning from the measured comparison baseline.
- Scoped prediction copy to this INNER JOIN step and applied the established one-match contribution to the 18 starting article rows.
- Kept the post-commitment mechanism hidden until prediction success, then retained `1 article row → 1 matching source row → 1 result row` and the 18-pair scale-up.
- Connected semantic action and JOIN naming to the same matching logic.
- Updated the existing three-layer JOIN teaching copy so the row example, `ON`, and the complete `FROM / JOIN / ON / SELECT` mapping express the already-reasoned mechanism.
- Connected SQL handoff, execution, verification, and completion to the same baseline-relative prediction and article Grain.
- Added no learner states, removed no required reasoning moves, and did not generalize the match-contribution model into a final-query row-count formula.

## AR-3 — Validation contract update

The existing validator now:

- rejects the prohibited masthead and obsolete answer-leaking connecting-field, PK/FK, and wrong-answer copy;
- requires neutral masthead and lookup language;
- requires the independent at-most-one and at-least-one premises;
- checks source ordering from premises through first-direction commitment and post-success conclusion;
- checks reverse commitment before Cardinality content and the bounded Venture Daily illustration;
- requires Cardinality markers to begin with `hidden` state and be revealed only after reverse success;
- rejects the prohibited reverse aggregate disclosure;
- preserves and strengthens Grain/baseline/prediction ordering checks;
- requires scoped INNER JOIN match-contribution wording and causal-thread entries;
- preserves existing assertions for JOIN teaching, SQL workspace, semantic verification, completion, and enrichment; and
- explicitly reports that stateful visibility and interaction behavior remain browser-walkthrough responsibilities.

## Preserved behavior confirmed

The targeted desktop walkthrough confirmed:

- neutral initial screen and no pre-commitment exactly-one conclusion in visible or accessibility-exposed context;
- local wrong-relation recovery and correct relation selection;
- local wrong-column recovery and correct connecting-field selection;
- PK/FK badges hidden before connecting-field success;
- both first-direction premises available before commitment;
- `many` and `none` errors expose only their relevant premise;
- the learner must combine the premises before the one-match conclusion is recorded;
- separate reverse wrong/correct paths;
- `Venture Daily → 6 articles` and `M / 1` only after reverse success;
- no reverse aggregate 18-row disclosure before prediction;
- current Grain question and distractors, including the article/source-pair misconception;
- one-article Grain remains distinct from the baseline and from `FROM`;
- prepared `SELECT COUNT(*) FROM news_article` measurement returns and interprets 18 article rows with no baseline MCQ;
- the prediction mechanism remains hidden before commitment and appears after the correct 18-row prediction;
- current semantic-action choices and JOIN-after-meaning timing;
- all three JOIN teaching layers, direct `ON` semantics, complete clause mapping, and reviewable prior layers;
- a clean SQL implementation editor;
- unchanged nudge and solution behavior, including no execution or advancement from merely revealing the solution;
- valid execution returns `title | source_name`, 18 inspectable rows, and the expected semantic result;
- execution alone does not complete the Lesson;
- wrong/correct final verification behavior, completion gate, enabled next control, and optional post-completion enrichment; and
- the causal reasoning thread remains visible through completion.

No additional mobile/narrow-layout validation is claimed in this record, following the user's instruction that it was not required.

## Deferred boundaries confirmed untouched

The implementation did not resolve or alter findings `3.3`, `4.4`, `8.4`, `15.1`, `15.2`, `15.3`, `15.4`, or `16.5`.

It did not reopen KEEP findings `1.3`, `9.2`, or `9.3`, and it did not redesign the assistance lifecycle.

## Command results

- `npm run validate:lesson1-remediation` — passed.
- `npm run build` — passed. Vite emitted its existing advisory that some generated chunks exceed 500 kB; this is not a build failure and is outside this bounded remediation.
- `git diff --check` — passed.

The fresh clone initially lacked installed dependencies. `npm ci` was run from the existing lockfile; it changed no tracked dependency file. A repository-local temporary npm cache used during installation was removed before final scope review.

## Residual issues or limitations

- Static assertions do not prove stateful visibility. Browser walkthrough evidence remains the validation basis for reveal timing, wrong-answer behavior, accessibility exposure, and completion gating.
- No implementation-scope dependency blocked the authorized remediation.
- Product-baseline acceptance remains a separate human decision.
