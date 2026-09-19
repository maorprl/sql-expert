# SQL Lab

A browser-only SQLite workspace for the startup ecosystem dataset.

The canonical curriculum structure is:

- **Course 1 — Reading Relational Data**, with the design-approved but not implemented **Lesson 1 — What Does One Row Represent?**;
- **Course 2 — Working With Rows**, with no canonical Lessons yet;
- **Course 3 — Aggregating Data**, with no canonical Lessons yet;
- **Course 4 — Joining Relations**, containing **Lesson 1 — One Match**, **Lesson 2 — Multiple Matches**, and **Lesson 3 — Zero Matches**.

The accepted runnable journey currently contains Course 4 / Lesson 1 and Course 4 / Lesson 2. Course 4 / Lesson 3 has current design authority and a visual reference but is not yet accepted into the production runtime. Course 4 / Lesson 1 is not the curriculum's first Lesson, first learner encounter, or first exposure to Grain.

The accepted learner journey is rendered by:

- `src/course-4-lesson-1-runtime.js` and `src/course-4-lesson-1-runtime.css` — Course 4 / Lesson 1 Conversation/Workbench runtime;
- `src/course-4-lesson-2-runtime.js` and `src/course-4-lesson-2-runtime.css` — Course 4 / Lesson 2 Conversation/Workbench runtime;
- `src/course-4-lesson-3-runtime.js` and `src/course-4-lesson-3-runtime.css` — the in-progress Course 4 / Lesson 3 runtime module;
- `src/main.js` — database initialization and Lesson orchestration;
- `src/course-navigation.css` and `src/styles.css` — surrounding runtime styling.

Older encounter modules remain in the repository but are not the accepted Course 4 Lessons 1–2 learner journey.

Current encounter authority is stored separately from runtime code:

- canonical curriculum identity: `course-design/curriculum-structure.md`;
- Course 4 / Lesson 1: `course-design/course-4/lesson-1/learner-route.md` and `course-design/course-4/lesson-1/interaction-decisions.md`;
- Course 4 / Lesson 2: `course-design/course-4/lesson-2/authority.md`;
- Course 4 / Lesson 3: `course-design/course-4/lesson-3/authority.md`;
- Course 4 / Lesson 3 implementation specification: `course-design/course-4/lesson-3/implementation-spec.md`;
- Course 4 / Lesson 3 visual reference: `course-design/course-4/lesson-3/visual-reference.html`.

Course 4 / Lesson 3 is **not** yet part of the accepted runnable learner journey. The older `stage-3-learner-route.md` / `stage-3-interaction-decisions.md` files and the production-system Lesson 3 dry-run design remain candidate/history only and retain their historical names.

Course-wide learner-experience authority is currently defined by:

- `pedagogical-foundations.md`;
- `course-design/course-visual-language.md`;
- `course-design/course-controls.md`.

There is currently no separate Course 4 Lessons 1–2 topology authority. Spatial and interaction conformance is derived directly from current course-level and Lesson authority.

A compact Previous / Next control in the masthead provides progression-safe inter-Lesson navigation. Course 4 / Lesson 1 Next becomes usable only after the existing completion progression authorizes Course 4 / Lesson 2. Course 4 / Lesson 2 Previous returns to Course 4 / Lesson 1, and Course 4 / Lesson 2 has no usable Next because Course 4 / Lesson 3 is not yet implemented or accepted into the runnable journey.

Within the current browser run, each available Lesson keeps its own in-memory reasoning state, editor text, result, completion state, and other existing runtime state when the learner navigates away and back. This does not establish a broader persistence contract across reloads or browser sessions.

`Show solution` is not a persistent course-shell control. Where available, it is SQL-workspace-local assistance during active SQL authoring and follows `course-design/course-controls.md`.

Course 4 / Lesson 2 begins with reuse checkpoints rather than a pre-resolved relationship: the learner selects the relevant relations and identifies the connecting participation field before the PK/FK relationship is revealed. These are reuse actions, not new first-exposure teaching and not the encounter's core row-multiplication evidence.

This README describes the runnable product and current observable runtime structure. It does **not** define pedagogical authority or the project's next authorized work item.

For current work state and authority boundaries, use:

- `routecraft-work-management.md` — the single current project work-state tracker;
- `source-of-truth-hierarchy.md` — current authority ownership and precedence;
- `production-contract-v1.md` — cross-project preservation, change-routing, state, and promotion invariants;
- `learner-encounter-production-process.md` — current learner-encounter production-process authority;
- `agent-assisted-work-protocol.md` — execution / coordination guidance;
- `course-design/production/rebaseline/` — historical/evaluative evidence for the production-process rebaseline, not current process authority;
- `learner-encounter-production-execution.md` — historical / superseded Cycle 1 execution snapshot;
- `course-design/production/cycle-1/` — durable Cycle 1 production artifacts and historical provenance.

Historical management records include `course-work-management.md`, `production-system-work-management.md`, and `course-experience-improvement-work-management.md`; they are not current work-state sources.

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
