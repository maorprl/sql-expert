# SQL Lab

A browser-only SQLite workspace for the startup ecosystem dataset.

The learner journey currently contains three implemented encounters in one shared SQL Lab runtime:

1. **Stage 1 — Media coverage / first JOIN** using `news_article → news_source`;
2. **Stage 2 — Funding participation / row multiplication** using `funding_round → round_investment`;
3. **Stage 3 — INNER JOIN unmatched / zero-match coverage** using `company → funding_round`.

The current encounter runtime files are:

- `src/media-coverage.js` — Stage 1;
- `src/funding-participation.js` — Stage 2;
- `src/inner-join-unmatched.js` — Stage 3;
- `src/interaction-lifecycle.js` — shared interaction lifecycle;
- `src/main.js` — shared course/runtime orchestration.

Current encounter authority is stored separately from runtime code:

- Stage 1: `course-design/stage-1/stage-1-learner-route.md` and `course-design/stage-1/stage-1-interaction-decisions.md`;
- Stage 2: `course-design/stage-2/stage-2-authority.md`;
- Stage 3: `course-design/stage-3/stage-3-learner-route.md` and `course-design/stage-3/stage-3-interaction-decisions.md`.

Course-wide learner-experience authority is currently defined by:

- `pedagogical-foundations.md`;
- `course-design/course-visual-language.md`;
- `course-design/course-controls.md`.

There is currently **no separate Stage 1–3 topology authority**. The previous target-topology decision/review/post-build chain was removed from the active tree because it introduced derived UX ownership rules that exceeded the higher-order authority it was meant to translate. Spatial and interaction conformance must be derived directly from the current course-level and Stage authority above.

A course-level chapter selector allows the learner to switch among the three encounters without completing the current encounter first. Chapter selection is navigation rather than learner evidence and is visually separated from task actions such as `Check answer`, `Continue`, and `Run query`.

Within the current browser run, each encounter keeps its own in-memory reasoning state, editor text, and rendered SQL result when the learner switches away and back. This does not establish a broader persistence contract across reloads or browser sessions.

`Show solution` is not a persistent course-shell control. Where available, it is SQL-workspace-local assistance during active SQL authoring and follows `course-design/course-controls.md`.

Stage 2 begins with reuse checkpoints rather than a pre-resolved relationship: the learner selects the relevant relations from Live Schema and identifies the connecting participation field before the PK/FK relationship is revealed. These are reuse actions, not new first-exposure teaching and not the encounter's core row-multiplication evidence.

This README describes the runnable product and current observable runtime structure. It does **not** define pedagogical authority or the project's next authorized work item.

For current work state and authority boundaries, use:

- `routecraft-work-management.md` — project-level current work state;
- `course-work-management.md` — Learning Product work state and current authority boundary;
- `course-experience-improvement-work-management.md` — current learner-experience improvement state;
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

The former `scripts/topology-contract.test.mjs` suite was removed from the active validation path because it encoded parts of the superseded topology decision. A replacement conformance suite must be derived from current authority before automated conformance PASS claims are made.

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
