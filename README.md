# SQL Lab

A browser-only SQLite workspace for the startup ecosystem dataset.

The learner journey starts with the existing validated **Stage 1** `news_article → news_source` encounter. Stage 1 remains implemented by:

- `src/stage1.js`
- `course-design/stage-1/stage-1-learner-route.md`
- `course-design/stage-1/stage-1-interaction-decisions.md`

After Stage 1 reaches its existing completion state, the learner can continue to the current Cycle 1 participation row-multiplication encounter using:

`funding_round → round_investment`

The row-multiplication encounter is implemented in `src/cycle1.js` as a separate encounter module that reuses the same SQL Lab runtime, editor, schema viewer, result renderer, interaction lifecycle, and visual infrastructure. It does not replace or rewrite Stage 1.

Its current implementation authority is recorded in:

- `course-design/production/cycle-1/case-validation-row-multiplication-2026-09-12.md`
- `course-design/production/cycle-1/lightweight-pedagogy-gate-row-multiplication-2026-09-12.md`
- `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-and-waiver-2026-09-13.md`

The owner-directed revision corrects the core evidence sequence so the learner first makes a qualitative row-multiplication prediction from target Grain + Cardinality before receiving a concrete numerical multiplicity. The Course Authority Owner explicitly authorized direct implementation of that targeted correction without rerunning the remaining pre-build review chain; the waiver does not represent the skipped gates as passed.

The implementation record is:

- `course-design/production/cycle-1/implementation-record-owner-directed-2026-09-13.md`

No new Stage number is assigned to the Cycle 1 encounter.

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
