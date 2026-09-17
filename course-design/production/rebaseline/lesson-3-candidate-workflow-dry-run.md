# Lesson 3 Candidate Workflow Dry Run

**Status:** CANDIDATE EVALUATION / NON-AUTHORITATIVE  
**Scope:** Production-system rebaseline Substep 5  
**Implementation:** NONE — design dry run only  

This record evaluates `candidate-workflow-v0.md` by using it to produce a fresh candidate Lesson 3 design from the accepted Lessons 1–2 state.

It does not establish Lesson 3 authority and does not authorize implementation. `learner-encounter-production-process.md` remains the formal current production-process authority until an explicit cutover.

The preserved `course-design/stage-3/` material was not used as design authority or as the starting design for this dry run.

## 1. Establish Basis

### Canonical and accepted baselines

Dry-run starting canonical repository state:

`3f05dfee90490ad54fb979e5cc010effa9641eb3`

Accepted runtime baseline:

`9b8f6ffc1f22ce2d2783f49e52a48c480a0945fa`

Accepted learner journey:

- Lesson 1 — media coverage / first JOIN;
- Lesson 2 — funding participation / JOIN row multiplication.

Applicable current sources reviewed for the dry run:

- `course-exit-criteria.md`;
- `course-knowledge-map.md`;
- `pedagogical-foundations.md`;
- `course-design/stage-1/stage-1-learner-route.md`;
- `course-design/stage-1/stage-1-interaction-decisions.md`;
- `course-design/stage-2/stage-2-authority.md`;
- `course-design/course-controls.md`;
- `course-design/course-visual-language.md`;
- `startup-ecosystem/startup-ecosystem-schema.sql`;
- `startup-ecosystem/startup-ecosystem-seed.sql`;
- `startup-ecosystem/startup-ecosystem-schema.md`;
- `source-of-truth-hierarchy.md`;
- `production-contract-v1.md`.

### Bounded course-assumed learner state

From accepted Lessons 1–2, this dry run may assume prior encounter with:

- relation identification from a business question;
- PK/FK relationship reasoning;
- Grain;
- Cardinality including one-to-many;
- prepared baseline measurement as a reasoning aid;
- INNER JOIN and `ON`;
- prediction before execution;
- result inspection and final relational verification;
- the fact that one-to-many matching may repeat one-side context across several valid detail-grain rows.

The dry run must **not** assume prior mastery of:

- optional `1:0..1` relationship reasoning;
- LEFT JOIN;
- NULL introduced by an unmatched outer-join side;
- the distinction between “no matching related row” and “a matching row whose attribute value is missing”;
- aggregation, EXISTS / NOT EXISTS, pre-aggregation, bridge-table reasoning, or independent end-to-end transfer.

### Capability gap

Lessons 1–2 establish two important JOIN outcomes:

- matching can preserve a base/result grain when every base row has one match;
- multiple matches can multiply rows while preserving a detail-grain result.

A still-uncovered exit capability is reasoning about **what disappears or must be preserved when a related row may be absent**. The knowledge map also requires optional-relationship reasoning, LEFT JOIN, NULL interpretation, and the ability to predict which rows survive.

That creates a justified candidate need for a small encounter focused on optional relationships and preserving requested base rows when no related row exists.

**Basis result:** PASS for dry-run purposes. No missing baseline or authority conflict blocks defining a candidate encounter.

## 2. Define the Encounter

### Case comparison

The candidate workflow does not require a permanent comparative-case phase, but the dry run checked several current-schema possibilities because case quality matters.

**`company → company_acquisition`**

- `company` grain: one row per company;
- `company_acquisition` grain: zero or one acquisition row per company;
- `company_acquisition.company_id` is both its primary key and a foreign key to `company.company_id`;
- the current seed contains 12 company rows and one acquisition row;
- this isolates optional matching without one-to-many row multiplication.

**`company → funding_round`**

- includes a company with no funding round;
- also includes one-to-many matching and therefore mixes row loss/preservation with row multiplication already central to Lesson 2.

**`investor → investor_sector_focus`**

- includes an investor with no sector-focus rows;
- also introduces a bridge/many-to-many structure and possible multiple matches.

For a focused next learner move, `company → company_acquisition` is the cleaner candidate because it isolates the new optional-match problem while reusing prior JOIN reasoning.

This comparison is evidence that proportional case comparison can live inside **Define the Encounter** when useful; it does not justify a mandatory separate case-validation phase for every Lesson.

### Candidate business question

> The corporate strategy team is reviewing all companies. For each company, include its status and, when an acquisition is recorded, the acquisition date and acquirer.

The wording states the real business requirement — all companies remain in scope and acquisition information is conditional — without naming the relational operation.

### Candidate capability

The learner should be able to reason that:

- each company may have zero or one acquisition record;
- the requested result remains one company per row;
- matching-only INNER JOIN behavior would remove companies with no acquisition row;
- that row loss conflicts with a request covering all companies;
- the required semantic action is therefore to keep every company and attach acquisition information only when a matching row exists;
- LEFT JOIN expresses that action;
- when no acquisition row matches, acquisition-side output fields are NULL because there is no related row contributing values.

The Lesson would introduce **optional relationship / 1:0..1**, **LEFT JOIN**, and practical **NULL-from-no-match interpretation** as one connected reasoning problem.

### Intended learner evidence

Before LEFT JOIN is named, the learner should establish evidence that:

1. `company` and `company_acquisition` are the relevant relations;
2. `company_acquisition.company_id` connects an acquisition record to its company;
3. one company may have no acquisition record or one acquisition record;
4. one requested result row represents one company;
5. there are 12 starting company rows;
6. a matching-only INNER JOIN would fail to preserve companies with no acquisition record;
7. the business need requires keeping all company rows and adding acquisition details only where a match exists.

After the semantic choice, LEFT JOIN may be named and taught as the SQL expression of that already-established requirement.

Post-execution evidence should establish that:

- the accepted result has 12 rows;
- each company appears exactly once;
- the one company with a current acquisition record has acquisition values;
- companies with no matching acquisition row remain present with NULL acquisition-side fields;
- those NULLs are interpreted as the consequence of no matching acquisition row, not automatically as a missing value inside an existing acquisition row.

### Reveal / shortcut constraints

Before the relevant learner reasoning:

- do not label the relationship as optional / `0..1` before the learner reasons about whether a company must have an acquisition row;
- do not name LEFT JOIN before the learner chooses the semantic action of preserving every company while adding optional acquisition information;
- do not show a finished LEFT JOIN result before the learner predicts the consequence of matching-only behavior;
- do not explain the final meaning of NULL before the learner has encountered the no-match case;
- do not use the exact current seed result as a worked answer before the learner has produced the protected reasoning.

### Candidate learner journey

1. **Identify relevant relations.** From Live Schema, select `company` and `company_acquisition` into an initially empty Working Schema.
2. **Identify the direct connection.** Select `company_acquisition.company_id` as the field that identifies which company an acquisition record belongs to; then reveal the PK/FK relationship as reused structure.
3. **Reason about optionality.** Use a closed meaning-first interaction to establish that each company can have zero or one acquisition record, while each acquisition record belongs to one company. Only then name/annotate the `1:0..1` optional relationship.
4. **Establish requested result Grain.** One requested result row represents one company. This is reused Grain reasoning, not a new Grain Concept Moment.
5. **Measure the company baseline.** Run a prepared `SELECT COUNT(*) FROM company` measurement and carry forward the 12 starting company rows. This reuses the established baseline pattern rather than teaching COUNT.
6. **Predict matching-only behavior.** Using familiar INNER JOIN semantics, reason that a company with no acquisition match would disappear from a matching-only result. This is the new row-loss evidence; the course does not yet supply LEFT JOIN as the answer.
7. **Choose the semantic action.** Choose the action that matches the business need: keep every company row and attach acquisition information only when a matching acquisition row exists. Then introduce LEFT JOIN and connect it to that semantic choice.
8. **Explain unmatched right-side values.** After LEFT JOIN is connected to preservation, explain that when no acquisition row exists, acquisition-side result fields are NULL. Keep the explanation practical and tied to “no matching acquisition row”; do not expand into a general SQL NULL curriculum beyond what the encounter needs.
9. **Implement SQL.** Author a LEFT JOIN returning a company-level result such as `company_id | name | status | acquired_date | acquirer_name`. INNER JOIN / `ON` are reused; only the new outer-preservation behavior receives fuller teaching.
10. **Inspect and verify actual result evidence.** Keep all 12 rows inspectable. The learner verifies one-company-per-row Grain, 12-row preservation, and the difference between a matched acquisition row and unmatched acquisition-side NULLs.
11. **Complete the Lesson.** Close the reasoning thread: optional relationship → matching-only row loss risk → requirement to preserve all companies → LEFT JOIN → unmatched acquisition-side NULLs → verified 12-row company-grain result.

### Controls and visual conformance

The candidate encounter can conform to current course-wide control and visual authority without new global decisions:

- Working Schema capacity remains four; this task needs two relations only;
- learner-facing reasoning, checking, feedback, Concept Moment/reused-concept consequence, and local progression remain in the stable learner-response lane;
- Working Schema, prepared measurement, SQL editor, Run control, Results, and tool diagnostics remain in the workspace/evidence lane;
- result evidence remains practically inspectable while the final verification question stays in the learner-response lane;
- `Show solution` appears only during active SQL authoring and populates the editable SQL editor without running the query or completing evidence;
- Retry / Redo reset semantics, cross-session persistence, mobile specifics, and broader global hint policy remain OPEN and are not needed to define this encounter.

**Define-the-Encounter result:** PASS for dry-run purposes. The current canon supports a coherent candidate encounter without reviving preserved Stage 3 design authority.

## 3. Make It Buildable — dry-run assessment

### Material encounter decisions that would need to be locked before implementation

For this candidate design, implementation would need authoritative decisions for at least:

- the business question;
- the new capability and Lesson scope;
- the `company → company_acquisition` case;
- course-assumed learner state;
- protected evidence and reveal timing;
- optional-relationship / LEFT JOIN / NULL concept timing;
- the learner route;
- SQL/result contract and final verification evidence;
- any Lesson-specific interaction behavior not already settled by course-level controls/visual authority.

### Implementation discretion that does not need new pedagogy authority

Examples include:

- exact component composition within the established lane/locality rules;
- exact wording polish that preserves question intent and non-preemption;
- exact connector geometry that correctly attaches to the established fields;
- exact SQL semantic-validation implementation;
- local visual styling consistent with current course visual roles;
- technical state representation that preserves required learner evidence and reviewability.

### OPEN matters that do not block this candidate

The following current OPEN matters need not be resolved to make this Lesson design buildable:

- general Retry / Redo reset/downstream-invalidation semantics;
- persistence across browser sessions;
- global hint architecture;
- exact mobile behavior;
- future Lesson structure beyond this encounter;
- later aggregation, EXISTS, bridge, or fan-out-repair progression.

### Material Candidate Workflow v0 ambiguity discovered

The dry run exposed one important ambiguity in Candidate Workflow v0:

> The workflow says the Encounter Definition / Implementation Boundary can make work buildable, but it does not state clearly enough that **candidate design text is not itself implementation authority**.

Under the current Source-of-Truth and Production Contract, a new Lesson's material design decisions must become durable **current Lesson/encounter authority before Build begins**. An unaccepted Encounter Definition, review note, or candidate packet cannot authorize implementation merely because it is complete.

This is a workflow clarification, not a need to restore the legacy Architect → reviewer → auditor choreography.

**Required candidate correction:** in **Make It Buildable**, state explicitly that before Build, material accepted encounter decisions must be promoted into the appropriate current authority source; candidate/evaluation material alone cannot authorize Build.

After that clarification, no additional material build-boundary defect was found in the dry run.

## 4. Dry-run evaluation of Candidate Workflow v0

### What worked without legacy choreography

The candidate workflow was sufficient to:

- establish the real accepted baseline and current authority;
- define bounded prior learner assumptions from Lessons 1–2;
- identify a concrete capability gap rather than start from preserved Lesson 3 material;
- compare plausible schema cases proportionally and choose a focused case;
- define protected learner evidence and answer-leak boundaries;
- create a coherent reasoning → SQL → result-verification journey;
- apply current visual/control authority without creating a separate UX-review phase;
- identify which OPEN matters are genuinely irrelevant to the present scope;
- separate material design decisions from implementation discretion.

### What the dry run did not establish

This dry run did not establish that:

- Lesson 3 should actually be this candidate encounter;
- the proposed learner route is accepted Lesson 3 authority;
- independent challenge is never useful;
- no later implementation-specific issue will require stronger validation;
- Candidate Workflow v0 is ready to replace current process authority without outcome comparison against legacy protections.

### Dry-run verdict

**PASS WITH ONE REQUIRED CANDIDATE CLARIFICATION.**

The candidate workflow can carry a fresh Lesson 3 design from current course state to a coherent pre-build boundary without relying on the legacy role topology. The dry run found one material wording/authority-boundary gap: accepted encounter decisions must explicitly become current authority before Build.

Once that clarification is incorporated into the candidate workflow, Substep 5 is complete and the rebaseline may proceed to Substep 6: compare the candidate and legacy process by outcomes and protected failure modes.
