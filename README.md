# SQL Lab

A browser-only SQLite workspace for the startup ecosystem dataset.

The learner journey currently contains two available encounters in one shared SQL Lab runtime:

1. the existing validated **Stage 1** `news_article → news_source` encounter;
2. the current **Row multiplication** `funding_round → round_investment` encounter.

Stage 1 remains implemented by:

- `src/stage1.js`
- `course-design/stage-1/stage-1-learner-route.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`

The row-multiplication encounter is implemented as a separate encounter that reuses the same SQL Lab runtime, editor, schema viewer, result renderer, interaction lifecycle, and visual infrastructure. It does not replace or rewrite the Stage 1 learning sequence.

A course-level chapter selector allows the learner to switch directly between the two currently available encounters without completing the current encounter first. Chapter selection is navigation rather than learner evidence and is visually separated from task actions such as `Check answer`, `Continue`, and `Run query`.

Within the current browser run, each encounter keeps its own in-memory reasoning state, editor text, and rendered SQL result when the learner switches away and back. This does not establish a broader persistence contract across reloads or browser sessions.

`Show solution` is not a persistent course-shell control. For the row-multiplication encounter it appears only with the SQL editor while the SQL-authoring state is active, in accordance with `course-design/course-controls.md` and the current Cycle 1 clarification.

The row-multiplication encounter now begins with two **reuse checkpoints** rather than a pre-resolved relationship: the learner selects the relevant relations from Live Schema, then identifies the participation field that connects to the funding round. Only after that learner action is the PK/FK relationship revealed. These are reuse actions, not new first-exposure teaching and not the encounter's core row-multiplication evidence.

The row-multiplication encounter's current implementation authority is recorded in:

- `course-design/production/cycle-1/case-validation-row-multiplication-2026-09-12.md`
- `course-design/production/cycle-1/lightweight-pedagogy-gate-row-multiplication-2026-09-12.md`
- `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-and-waiver-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-structural-reuse-2026-09-13.md`
- `course-design/production/cycle-1/authority-clarification-show-solution-sql-workspace-2026-09-13.md`

The first owner-directed revision corrects the core evidence sequence so the learner first makes a qualitative row-multiplication prediction from target Grain + Cardinality before receiving a concrete numerical multiplicity. The structural-reuse revision supersedes the earlier decision to pre-resolve the relation set and FK/PK connection. The governing rule is: **previously learned does not mean pre-resolved**.

The implementation record is:

- `course-design/production/cycle-1/implementation-record-owner-directed-2026-09-13.md`

No new Stage number is assigned to the row-multiplication encounter.

## Run

```sh
npm install
npm run dev
```

Build a static production bundle with:

```sh
npm run build
```

## Database source and runtime

`startup-ecosystem/startup-ecosystem-schema.sql` and
`startup-ecosystem/startup-ecosystem-seed.sql` are the database source of
truth. The browser fetches and executes those files in a fresh `sql.js`
SQLite database during initialization and reset. The schema viewer, editor
autocomplete, and encounter result-contract verification read from that loaded
database rather than maintaining a second schema or data representation.

The build script copies those exact SQL source files into
`dist/startup-ecosystem/` as static runtime assets.

The editor text is stored only in browser local storage. Database state is
in-memory and reconstructed from the SQL source files when reset or reloaded.
