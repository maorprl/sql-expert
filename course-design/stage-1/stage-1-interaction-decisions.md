# Stage 1 interaction decisions

The Working Schema begins empty. The live schema viewer supplies all relations through `+` actions; no hardcoded second schema exists. It prevents duplicates, preserves insertion order, limits selection to four, and removal never clears SQL, progress, or hints. Working cards show metadata, not instances.

All reasoning uses closed choices. Concepts appear after the learner's prerequisite answer: Grain, then PK/FK, then Cardinality, then JOIN. Cardinality uses PK/FK and the non-unique foreign key, not seed examples.

Hints are unavailable until an incorrect attempt. SQL hints progress after attempts; a later **Show solution** reveals SQL without overwriting learner code. Viewing it does not prevent completion.

The baseline uses the persistent editor in compact mode and a visible Run Query button. Running and interpreting 26 are internal phases of one Step 5 and produce one completed Step 5 card, with no duplicated step number. The SQL task expands that editor, teaches the INNER JOIN pattern, matching semantics, and `ON` before asking for SQL; it hides fields behind a non-hint control and validates result semantics rather than exact SQL text.

Completion requires the selected relations, grain, connecting key, cardinality, baseline interpretation, prediction, semantic action, correct query result, and final grain. It is not a numbered learner step.
