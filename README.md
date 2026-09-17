# SQL Lab

A browser-only SQLite workspace for the startup ecosystem dataset.

The accepted learner journey currently contains two implemented Lessons in one SQL Lab runtime:

1. **Lesson 1 — Media coverage / first JOIN** using `news_article → news_source`;
2. **Lesson 2 — Funding participation / row multiplication** using `funding_round → round_investment`.

`Lesson` is the learner-facing product term. Historical/internal paths and identifiers retain `stage1`, `stage2`, `stage-1`, and `stage-2` where renaming would create unnecessary implementation churn.

The accepted learner journey is rendered by:

- `src/stage1-prototype-runtime.js` and `src/stage1-prototype-runtime.css` — Lesson 1 Conversation/Workbench runtime;
- `src/stage2-prototype-runtime.js` and `src/stage2-prototype-runtime.css` — Lesson 2 Conversation/Workbench runtime;
- `src/main.js` — database initialization and Lesson orchestration;
- `src/course-navigation.css` and `src/styles.css` — surrounding runtime styling.

Older encounter modules remain in the repository but are not the accepted Lessons 1–2 learner journey.

Current encounter authority is stored separately from runtime code:

- Lesson 1: `course-design/stage-1/stage-1-learner-route.md` and `course-design/stage-1/stage-1-interaction-decisions.md`;
- Lesson 2: `course-design/stage-2/stage-2-authority.md`.

The Stage 3 documents are preserved candidate/history and are not current learner-product authority. No Lesson 3 is currently part of the accepted journey.

Course-wide learner-experience authority is currently defined by:

- `pedagogical-foundations.md`;
- `course-design/course-visual-language.md`;
- `course-design/course-controls.md`.

There is currently no separate Lessons 1–2 topology authority. Spatial and interaction conformance is derived directly from the current course-level and Lesson authority above.

A compact Previous / Next control in the masthead provides progression-safe inter-Lesson navigation. Lesson 1 Next becomes usable only after the existing completion progression authorizes Lesson 2. Lesson 2 Previous returns to Lesson 1, and Lesson 2 has no usable Next because no Lesson 3 is currently approved.

Within the current browser run, each available Lesson keeps its own in-memory reasoning state, editor text, result, completion state, and other existing runtime state when the learner navigates away and back. This does not establish a broader persistence contract across reloads or browser sessions.

`Show solution` is not a persistent course-shell control. Where available, it is SQL-workspace-local assistance during active SQL authoring and follows `course-design/course-controls.md`.

Lesson 2 begins with reuse checkpoints rather than a pre-resolved relationship: the learner selects the relevant relations and identifies the connecting participation field before the PK/FK relationship is revealed. These are reuse actions, not new first-exposure teaching and not the encounter's core row-multiplication evidence.

This README describes the runnable product and current observable runtime structure. It does **not** define pedagogical authority or the project's next authorized work item.

For current work state and authority boundaries, use:

- `routecraft-work-management.md` — project-level current work state;
- `course-work-management.md` — Learning Product work state and current authority boundary;
- `course-experience-improvement-work-management.md` — historical/superseded learner-experience initiative record;
- `learner-encounter-production-process.md` — production roles, gates, independence, review, and acceptance rules for learner-encounter production;
- `learner-encounter-production-execution.md` — historical / superseded Cycle 1 execution snapshot unless explicitly reactivated for a future production cycle;
- `course-design/production/cycle-1/` — durable Cycle 1 production artifacts and historical provenance.

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
