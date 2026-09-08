# Stage 1 Visual-Language Implementation Audit — 2026-09-08

**REFERENCE / IMPLEMENTATION AUDIT — NOT A DESIGN AUTHORITY**

This document preserves the completed read-only audit of the current Stage 1 implementation against `course-design/course-visual-language.md`. It records implementation evidence and audit classifications only. It does not change the course design, establish pedagogical rules, or authorize implementation changes.

## General learner flow

### Overall surface hierarchy and atmosphere

**Visual-language requirement or direction**

The experience should feel inviting and guided rather than like an internal or developer console. The interface should avoid accumulating many visually similar bordered rectangular regions that weaken hierarchy.

**Current implementation evidence**

The interface uses a dark developer-workbench palette throughout. The business request, Working Schema cards, current interaction, answer choices, Concept Moments, SQL teaching, editor, and result areas repeatedly use dark bordered rectangular surfaces with closely related visual treatments.

**Classification:** `CONFIRMED IMPLEMENTATION GAP`

**Affected file / component**

- `src/styles.css`
- General learner flow surfaces
- Working Schema relation cards
- Current interaction and answer choices
- Concept Moments
- SQL teaching, editor, and results surfaces

**Why this matters to the learner experience**

The repeated dark card-and-panel vocabulary weakens the intended hierarchy and makes the experience feel cold, technical, and tool-oriented rather than inviting and guided.

### Current versus completed interaction focus

**Visual-language requirement or direction**

The current interaction should have the strongest visual focus. Completed interactions should be more compact and visually quieter while remaining reviewable.

**Current implementation evidence**

The current interaction receives the strongest border, shadow, spacing, and accent treatment. Completed interactions are quieter and compact by default, remain available for deliberate review, and preserve deliberately opened review state.

**Classification:** `PARTIAL ALIGNMENT`

**Affected file / component**

- `src/styles.css`
- Shared interaction lifecycle rendering

**Why this matters to the learner experience**

The active task is visually distinct while prior work remains accessible without continuously competing with it. The implementation aligns sufficiently with this direction.

## Working Schema

### Capacity versus task size

**Visual-language requirement or direction**

The Working Schema supports up to four concurrently selected relations. Four is a workspace capacity ceiling, not a pedagogical target or expected task size.

**Current implementation evidence**

The Working Schema starts empty, allows the learner to identify relations from the full schema, and enforces a maximum of four selected relations. Stage 1 itself requires only the relations relevant to the business question.

**Classification:** `PARTIAL ALIGNMENT`

**Affected file / component**

- `src/stage1.js`
- Working Schema relation-selection behavior

**Why this matters to the learner experience**

The implementation keeps workspace capacity separate from the number of relations required by the task. It aligns sufficiently with this direction.

### Supporting-tool hierarchy

**Visual-language requirement or direction**

The current learner interaction should dominate the learning surface, while supporting tools such as the Working Schema remain available without becoming the main visual focus.

**Current implementation evidence**

Working Schema cards appear above the active interaction and show their columns in bordered dark surfaces. The current interaction nevertheless receives stronger shadow, border, spacing, and accent treatment.

**Classification:** `PARTIAL ALIGNMENT`

**Affected file / component**

- `index.html`
- `src/styles.css`
- Working Schema and current-interaction surfaces

**Why this matters to the learner experience**

The current interaction is stronger, but the Working Schema cards still add to the overall panel weight. The evidence does not establish a separate Working Schema gap beyond the confirmed overall surface-hierarchy and atmosphere gap.

## Concept Moments

### Concept distinction and color roles

**Visual-language requirement or direction**

Concept Moments should be visually distinct from normal feedback, and the learning accent should remain distinct from success green.

**Current implementation evidence**

Concept Moments use the shared purple learning-accent treatment, while successful feedback uses green. Grain, PK/FK, Cardinality, and JOIN use the same Concept Moment treatment.

**Classification:** `PARTIAL ALIGNMENT`

**Affected file / component**

- `src/styles.css`
- Concept Moment markup in `src/stage1.js`

**Why this matters to the learner experience**

The learner can distinguish conceptual instruction from correctness feedback. The implementation aligns sufficiently with this direction.

### Concept Moment surface treatment

**Visual-language requirement or direction**

Concept Moments should receive dedicated emphasis while the overall interface avoids accumulating too many bordered rectangular regions.

**Current implementation evidence**

Concept Moments are semantically and visually distinct, but each is also presented as another large bordered panel within the broader panel-heavy interface.

**Classification:** `PARTIAL ALIGNMENT`

**Affected file / component**

- `src/styles.css`
- Concept Moment surfaces

**Why this matters to the learner experience**

The conceptual distinction is clear, but the surface treatment contributes to the confirmed overall hierarchy and atmosphere gap rather than establishing an additional independent gap.

### Local Cardinality visual

**Visual-language requirement or direction**

Visual aids should be explanatory rather than decorative, remain local to the concept they support, appear after learner engagement when appropriate, and avoid prematurely revealing the answer.

**Current implementation evidence**

The Cardinality visual appears locally after the learner successfully reasons about the relationship and uses the learning accent to reinforce that relationship.

**Classification:** `PARTIAL ALIGNMENT`

**Affected file / component**

- Cardinality interaction in `src/stage1.js`
- Cardinality visual styling in `src/styles.css`

**Why this matters to the learner experience**

The visual reinforces the relationship after reasoning without revealing the answer in advance. The implementation aligns sufficiently with this direction.

## SQL implementation / workspace

### SQL teaching versus SQL workspace

**Visual-language requirement or direction**

SQL syntax instruction is instructional content, while the editor, execution controls, and results are the working environment. Their visual roles should remain distinct.

**Current implementation evidence**

The `INNER JOIN ... ON` pattern is presented separately as instructional content before learner-authored SQL. The editor, execution controls, and result grid occupy the SQL workspace and use a different surface treatment.

**Classification:** `PARTIAL ALIGNMENT`

**Affected file / component**

- SQL instruction rendering in `src/stage1.js`
- SQL workspace in `index.html`
- SQL instruction and workspace styling in `src/styles.css`

**Why this matters to the learner experience**

The learner can distinguish syntax teaching from the place where SQL is written and executed. The implementation aligns sufficiently with this direction.

### SQL workspace dominance and instructional separation

**Visual-language requirement or direction**

The SQL workspace should support the learner's work without becoming the dominant visual focus or separating the learner from the instructional context.

**Current implementation evidence**

The SQL workspace can occupy up to 57% of the viewport with a minimum height of 390 pixels. The editor and results areas have substantial minimum heights, while the instructional content remains in a separately scrolling area above the workspace.

**Classification:** `CONFIRMED IMPLEMENTATION GAP`

**Affected file / component**

- SQL workspace structure in `index.html`
- SQL workspace sizing and scrolling in `src/styles.css`

**Why this matters to the learner experience**

The workspace consumes substantial vertical space and can separate the current instruction from the place where the learner is working, making the tool surface visually dominant.

### Learner-controlled SQL workspace height

**Visual-language requirement or direction**

The course visual-language document does not explicitly require learner-controlled workspace resizing.

**Current implementation evidence**

The SQL workspace uses fixed layout constraints and does not provide a learner-controlled resize mechanism.

**Classification:** `NOT ENOUGH EVIDENCE`

**Affected file / component**

- SQL workspace sizing in `src/styles.css`

**Why this matters to the learner experience**

The fixed height contributes to the observed workspace dominance, but the absence of resizing is not independently established as a violation of the current visual-language source.

## IMPLEMENTATION GAPS TO FIX

- The overall surface hierarchy and atmosphere rely on repeated dark bordered panels, producing a cold, technical, tool-oriented experience instead of the intended inviting and guided learning environment.
- The SQL editor and results workspace dominates the viewport and can separate the learner from the instructional context.

## NO CHANGE REQUIRED

- Current interaction emphasis.
- Compact, quieter, and reviewable completed interactions.
- Working Schema capacity ceiling of four selected relations.
- Distinct learning-accent and success-green roles.
- Distinct treatment of Concept Moments.
- Cardinality visual timing, locality, and explanatory role.
- Visual distinction between SQL teaching and the SQL workspace.
- Stage progression, content, and pedagogical logic.

## Post-Implementation Verification

A focused visual review was performed after the Gap #1 implementation:

- Initial business request — `PASS`
- Populated Working Schema — `PASS`
- CURRENT interaction with COMPLETED interactions — `PASS`
- Concept Moment visible — `PASS`
- SQL instruction + SQL workspace visual-role separation — `PASS`

No new readability, contrast, density, or hierarchy problem was observed.

The surface hierarchy / atmosphere gap is `RESOLVED TO CURRENT SCOPE`.

Full Stage 1 validation has not yet been completed. SQL workspace dominance / instructional separation remains `OPEN` and was not evaluated as resolved by this review.

### Gap #2 — SQL workspace dominance / instructional separation

- Original classification: `CONFIRMED IMPLEMENTATION GAP`
- Implementation status: `RESOLVED TO CURRENT SCOPE`
- Implementation file: `src/styles.css`

Implementation summary:

- full SQL workspace allocation reduced and rebalanced;
- editor/results minimum heights reduced proportionally;
- baseline mode preserved;
- existing scrolling model preserved;
- no new resize control or interaction behavior introduced.

Verification results:

- Step 8 — 1280×720: `PASS`
- Step 8 — 1280×600: `PASS`
- Step 8 — 390×844: `PASS`
- Editor usability: `PASS`
- Result visibility and scrolling: `PASS`
- Instruction + workspace co-visibility: `PASS`
- Baseline mode unchanged: `PASS`

Build, syntax, and `git diff --check` passed. No markup, JavaScript, pedagogy, SQL behavior, Stage flow, editor behavior, or result-rendering behavior changed.

The focused verification closes this implementation gap to the current scope. This does not constitute full Stage 1 validation.

#### Subsequent manual visual-review evidence

A later manual review of Step 8 showed that:

- the active instruction is cut off at the boundary where the SQL workspace begins;
- the “Now write a query…” instruction is not fully visible;
- the editor still occupies a large portion of the viewport;
- results are not visible in the same viewport;
- instruction and implementation still read as physically separated regions.

This evidence preserves the previous implementation and focused-verification record: the sizing change improved the problem, but it did not close it. The current implementation status for Gap #2 is `PARTIALLY IMPROVED — OPEN`.

Full Stage 1 validation has not yet been completed.

#### Rejected implementation attempt

A Step-8-only continuous-scroll implementation was tested. It improved continuity between the actionable instruction and the SQL workspace, but it was rejected because changing scroll ownership on the Step 7 → Step 8 transition reset the learner's visible position. This regression is not present in the committed implementation because the experiment was reverted.
