# SQL Lab

A browser-only SQLite workspace for the startup ecosystem dataset.

The active learner encounter is the accepted **Cycle 1** participation row-multiplication encounter using:

`funding_round → round_investment`

Its current implementation authority is recorded in:

- `course-design/production/cycle-1/case-validation-row-multiplication-2026-09-12.md`
- `course-design/production/cycle-1/lightweight-pedagogy-gate-row-multiplication-2026-09-12.md`
- `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`
- `course-design/production/cycle-1/owner-directed-targeted-revision-and-waiver-2026-09-13.md`

The owner-directed revision corrects the core evidence sequence so the learner first makes a qualitative row-multiplication prediction from target Grain + Cardinality before receiving a concrete numerical multiplicity. The Course Authority Owner explicitly authorized direct implementation of that targeted correction without rerunning the remaining pre-build review chain; the waiver does not represent the skipped gates as passed.

The implementation record is:

- `course-design/production/cycle-1/implementation-record-owner-directed-2026-09-13.md`

The implementation reuses the existing editor, SQLite runtime, schema viewer, autocomplete, results table, reset behavior, interaction lifecycle, course controls, and shared visual infrastructure. The prior source-to-article Cycle 1 implementation and Stage 1 implementation remain in repository history/artifacts but are not the active runtime authority.

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
autocomplete, and Cycle 1 result-contract verification read from that loaded
database rather than maintaining a second schema or data representation.

The build script copies those exact SQL source files into
`dist/startup-ecosystem/` as static runtime assets.

The editor text is stored only in browser local storage. Database state is
in-memory and reconstructed from the SQL source files when reset or reloaded.
