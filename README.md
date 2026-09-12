# SQL Lab

A browser-only SQLite workspace for the startup ecosystem dataset.

The active learner encounter is the accepted **Cycle 1** source-to-article fan-out encounter. It is implemented from the frozen authority recorded in:

- `course-design/production/cycle-1/reconciled-encounter-design-packet.md`
- `course-design/production/cycle-1/authority-clarification-show-solution-assistance.md`
- `course-design/production/cycle-1/current-scope-necessity-clarification.md`
- `course-design/production/cycle-1/auditor-pre-build-control.md`

The implementation reuses the existing editor, SQLite runtime, schema viewer, autocomplete, results table, reset behavior, interaction lifecycle, and shared visual infrastructure. The prior Stage 1 implementation remains in the repository as existing substrate/history; it is not the authority for the Cycle 1 encounter.

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
