# RouteCraft Source-of-Truth Hierarchy

**Status:** CURRENT  
**Role:** Cross-project authority ownership and precedence map

This document defines which current source owns which kind of decision in RouteCraft and what to do when two current sources appear to overlap.

It does **not** redesign pedagogy, Lesson flow, visual language, controls, schema, runtime, or the production process. It records the authority boundaries already established across the repository and adds only the minimum missing precedence rules needed to keep them deterministic.

## 1. Governing principle — domain ownership, not one global ranking

RouteCraft does not use one flat list in which every document is ranked above or below every other document.

Authority is determined first by **decision domain**.

A source has authority only within the scope it is responsible for. A source must not acquire authority outside that scope merely because it is newer, more detailed, implemented, reviewed, or referenced by another artifact.

## 2. Current authority ownership map

| Decision domain | Current owner / source | Boundary |
|---|---|---|
| Course exit capabilities | `course-exit-criteria.md` | Defines what the learner should ultimately be able to do; does not define Lesson sequence or UI. |
| Knowledge/capability space and genuine dependency constraints | `course-knowledge-map.md` | Maps concepts, capabilities, and dependencies; does not define syllabus, Lesson order, scaffolding, or implementation. |
| Course-wide pedagogical foundations | `pedagogical-foundations.md` | Defines current pedagogical principles and decision rules; does not replace encounter-local authority or create an undeclared universal Lesson sequence. |
| Lesson 1 learner route and interaction decisions | `course-design/stage-1/stage-1-learner-route.md` and `course-design/stage-1/stage-1-interaction-decisions.md` | Own Lesson 1 encounter-local pedagogy, sequence, reveal/evidence requirements, and learner interaction behavior within course-wide authority. |
| Lesson 2 learner route and interaction decisions | `course-design/stage-2/stage-2-authority.md` | Own Lesson 2 encounter-local pedagogy, sequence, reveal/evidence requirements, and learner interaction behavior within course-wide authority. |
| Course-level controls and SQL-local assistance roles | `course-design/course-controls.md` | Owns controls covered there, including inter-Lesson navigation and the course-level role/boundary of local SQL assistance. |
| Course-wide visual language, spatial roles, and interaction locality | `course-design/course-visual-language.md` | Owns visual/spatial role rules; visual design supports pedagogy and does not redefine Lesson reasoning or control semantics. |
| Executable relational structure | `startup-ecosystem/startup-ecosystem-schema.sql` | Source of truth for tables, columns, PK/FK definitions, constraints, indexes, and other executable structural facts. |
| Current data instance | `startup-ecosystem/startup-ecosystem-seed.sql` | Source of truth for the rows and concrete values loaded into the course database. |
| Human-readable schema intent and relation/grain documentation | `startup-ecosystem/startup-ecosystem-schema.md` | Documents schema purpose, row meanings, grains, and design intent; it must remain consistent with executable schema/data facts. |
| Learner-encounter production workflow and gates | `learner-encounter-production-process.md` | Owns roles, gates, review/independence requirements, durable handoffs, acceptance, and change-impact rules. |
| Agent/tool execution and coordination | `agent-assisted-work-protocol.md` | Owns worker allocation, branch/handoff mechanics, synchronization, and execution efficiency; remains subordinate to mandatory production-process gates. |
| Current project work state and planning | `routecraft-work-management.md` | Single live tracker for the master plan, active subplans, current action, and non-authoritative backlog state; it does not create pedagogy, Lesson, process, validation, or implementation authority. |

`course-work-management.md` and `production-system-work-management.md` are historical / superseded management records and are not current work-state owners.

`course-design/stage-3/` is preserved candidate/history and is not current Lesson authority.

## 3. Overlap and precedence rules

Most apparent conflicts should be resolved by identifying the actual decision domain rather than by ranking whole documents.

### 3.1 Course-wide rule versus Lesson-local rule

When a current course-wide authority explicitly owns a concern, a Lesson-local source must conform to it unless a current authority source records an explicit authorized exception.

Examples:

- `course-design/course-controls.md` governs a control that it explicitly covers;
- `course-design/course-visual-language.md` governs course-wide spatial/visual role behavior that it explicitly covers.

This does not allow those course-wide sources to redefine Lesson-local pedagogy, Grain, evidence, reasoning sequence, or business meaning outside their domains.

### 3.2 Pedagogy versus visual implementation

Pedagogical and Lesson authority determines what the learner must reason about, do, establish, and verify.

Visual authority determines how those established roles are composed, localized, emphasized, and kept coherent.

Visual implementation must not change pedagogy in order to satisfy a visual pattern. If a visual rule and pedagogical requirement cannot both be satisfied, the conflict must be surfaced rather than silently resolved in implementation.

### 3.3 Process versus course authority

The production process governs **how** new or changed learner encounters are designed, reviewed, implemented, validated, and accepted.

It does not decide **what** the course should teach merely because it controls the production workflow.

Likewise, an agent/execution protocol cannot remove a mandatory production-process gate or invent course authority for efficiency.

## 4. Runtime and implementation rule

Runtime/code is the source of truth for **what the current implementation actually does**.

Runtime/code is **not**, by implementation presence alone, normative authority for what the course should do.

Therefore:

- a runtime/authority mismatch is a conformance issue, an implementation defect, or an owner-decision case; it is not automatically resolved in favor of the runtime;
- an intentionally accepted owner decision may approve current runtime behavior and then require authority maintenance so the durable current authority reflects that accepted decision;
- once that authority maintenance is complete, the reconciled authority — not the historical fact that the runtime happened to behave that way first — governs future work.

The accepted Lessons 1–2 runtime is the current product baseline for observable implementation behavior. That acceptance does not convert runtime files into pedagogical or control authority outside the decisions explicitly reconciled into current authority.

## 5. Schema and data precedence

The three startup-ecosystem sources have distinct ownership:

1. `startup-ecosystem-schema.sql` — executable structural truth;
2. `startup-ecosystem-seed.sql` — executable current-instance truth;
3. `startup-ecosystem-schema.md` — human-readable schema/grain/design documentation.

If these disagree about an executable fact:

- structural facts are determined by `startup-ecosystem-schema.sql`;
- current row/value facts are determined by `startup-ecosystem-seed.sql`;
- the Markdown documentation must be corrected to match the executable sources unless the project explicitly decides to change the executable schema/data themselves.

This precedence applies to factual consistency only. Schema/data still do not determine pedagogy, Lesson order, or whether an available relational feature should be taught.

## 6. Status semantics

Status indicates whether an artifact or decision may currently carry authority; it does not replace domain ownership.

### `CURRENT`

Current authority in the source's declared domain. It may be changed only through an authorized decision/change process.

### `WORKING`

A current source that may guide current work within its declared scope, but whose decisions remain revisable. `WORKING` does **not** mean optional, historical, or safe to ignore. Explicit `OPEN` items inside a WORKING source remain unresolved.

### `OPEN`

No current decision has been established for that matter. Implementation must not silently close it when the choice would affect pedagogy, learner behavior, controls, visual authority, process, or another governed domain.

### `HISTORICAL` / `SUPERSEDED`

Preserved evidence or prior state only. It cannot authorize current work or override a current source.

### `PRESERVED CANDIDATE` / `NOT CURRENT AUTHORITY`

Potentially reusable material retained for future reconsideration, but it has no current authority until explicitly re-established through the applicable process.

## 7. Evidence, review, and provenance artifacts

Audits, test drives, reviews, implementation records, production artifacts, screenshots, tests, and Git history are evidence/provenance unless a current authority source explicitly promotes an accepted decision into current authority.

They may:

- reveal a defect;
- demonstrate conformance or non-conformance;
- justify reopening a decision;
- preserve why a decision was made.

They may not promote themselves into current authority merely because they are detailed, later-dated, or associated with an implementation.

## 8. Genuine conflict or missing authority

If two current sources both legitimately claim the same decision domain and their requirements cannot be satisfied together, do not invent precedence from file age, implementation state, role seniority, or document detail.

Classify the issue as a **genuine authority conflict** and escalate it to the Course Authority Owner for an explicit decision and durable authority update.

If no current source owns a material decision, classify it as **MISSING AUTHORITY** or `OPEN` rather than silently assigning ownership to the nearest document or runtime convention.

## 9. Maintenance rule

When an accepted decision changes an authority boundary or resolves an OPEN/conflict:

1. update the appropriate current authority source;
2. update this map only if domain ownership or precedence itself changed;
3. update `routecraft-work-management.md` if the project phase, plan status, active subplan, or current action changed;
4. leave historical evidence historical rather than rewriting it to look current.

This map should remain small. It is not a second copy of the course specification, production process, or Lesson designs.
