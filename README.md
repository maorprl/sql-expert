# SQL Lab

A browser-only SQLite workspace for the startup ecosystem dataset.

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
SQLite database during initialization and reset. The schema viewer and editor
autocomplete are then read from that loaded database via SQLite metadata.

The build script copies those exact SQL source files into
`dist/startup-ecosystem/` as static runtime assets. It does not generate or
maintain a second schema representation.

The editor text is stored only in browser local storage. Database state is
in-memory and reconstructed from the SQL source files when reset or reloaded.
