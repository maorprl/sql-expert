# Cycle 1 — Independent Pedagogy Strengthened Full Design Re-Review

**Role:** Independent Pedagogy Reviewer  
**Date:** 2026-09-13  
**Review type:** Targeted full design re-review under the strengthened instructional-function / continuity / removal-impact standard  
**Overall verdict:** **REVISION REQUIRED**

## 1. Authority / scope boundary

This is a fresh independent review of the current Cycle 1 learner encounter. It does not rely on prior full Pedagogy Review verdicts, prior reviewer judgments, remembered material, previous chats, or historical conclusions.

The mandatory entry gate was checked first:

- `learner-encounter-production-process.md`
- `learner-encounter-production-execution.md`

The execution mapping explicitly authorizes:

> **Independent Pedagogy Reviewer — targeted full design re-review of the current Cycle 1 learner encounter under the strengthened instructional-function / continuity / removal-impact standard.**

Required current sources reviewed:

1. `course-work-management.md`
2. `course-exit-criteria.md`
3. `course-knowledge-map.md`
4. `pedagogical-foundations.md`
5. `course-design/course-visual-language.md`
6. `course-design/course-controls.md`
7. `course-design/stage-1/stage-1-learner-route.md`
8. `course-design/stage-1/stage-1-interaction-decisions.md`
9. `course-design/production/cycle-1/case-validation-row-multiplication-2026-09-12.md`
10. `course-design/production/cycle-1/lightweight-pedagogy-gate-row-multiplication-2026-09-12.md`
11. `course-design/production/cycle-1/encounter-design-row-multiplication-2026-09-13.md`
12. `course-design/production/cycle-1/owner-directed-targeted-revision-and-waiver-2026-09-13.md`
13. `course-design/production/cycle-1/owner-directed-targeted-revision-structural-reuse-2026-09-13.md`
14. `course-design/production/cycle-1/authority-clarification-show-solution-assistance.md`
15. `course-design/production/cycle-1/authority-clarification-show-solution-sql-workspace-2026-09-13.md`

Additional current sources consulted where needed for current-scope/evidence verification:

- `course-design/production/cycle-1/current-scope-necessity-clarification.md`
- `startup-ecosystem/startup-ecosystem-schema.sql`

No required current source was missing.

This review treats the current design authority as the base Encounter Design modified by the two owner-directed targeted revisions and the current Show-solution / SQL-workspace clarification. Where those current records supersede the base packet, the later current authority controls.

This review does **not** reopen the accepted capability or case unless a defect requires it. No such reopening is required by the findings below.

---

## 2. Course-Assumed Learner State assessment

### SOURCE-DERIVED assessment

The current course may assume that Stage 1 has already introduced and exercised, with substantial first-exposure support:

- identifying relevant relations from a business request;
- identifying a direct relationship field;
- PK/FK terminology after meaning-first reasoning;
- relationship Cardinality;
- requested-result Grain;
- prediction before execution;
- semantic relational action before SQL implementation;
- JOIN and `ON` as the SQL implementation of an established relationship;
- one learner-authored INNER JOIN;
- result inspection and final verification against an earlier prediction.

The course may also assume the learner has seen the contrasting preservation case in which each article matched one source and the JOIN preserved one article per output row.

The current sources do **not** establish cumulative independent transfer or mastery. In particular, the learner has not been established as independently able to take a new business request and a new direct relationship and translate the whole relational plan into SQL without the first-exposure translation support that connected:

- requested attributes → `SELECT`;
- starting relation → `FROM`;
- need to combine related information → `JOIN`;
- established relationship → `ON`.

### Review conclusion

The current design is right to **reduce** first-exposure support. It is not justified in assuming that every instructional function from first exposure can be removed merely because JOIN, `ON`, Grain, Cardinality, relation identification, and PK/FK have already appeared once.

The appropriate learner-state description for this encounter is therefore:

- reused concepts and relational-reading actions: reduced support is justified;
- target row-multiplication reasoning: new core evidence is required;
- independent whole-query translation on a new case: not yet established strongly enough to remove all normal-path translation support.

---

## 3. Current sequence after all controlling revisions

For this review, the material learner sequence is:

1. persistent participation-audit business request;
2. empty Working Schema → learner identifies `funding_round` and `round_investment` from Live Schema;
3. learner identifies `round_investment.funding_round_id` as the field connecting a participation to its funding round;
4. PK/FK connection is then revealed/highlighted;
5. learner establishes target Grain: one recorded round-investor participation per result row;
6. learner interprets Cardinality from the established relationship;
7. compact `1 : M` relationship marking is shown only after the Cardinality judgment;
8. learner makes the qualitative row-multiplication prediction from Grain + Cardinality;
9. learner predicts repeated round context across distinct participation-grain rows;
10. JOIN row multiplication is named/consolidated; a local explanatory visual may appear;
11. concrete `3 participations → 3 participation rows` application may be used as supporting practice/evidence;
12. learner transitions into a clean SQL authoring workspace;
13. learner authors and runs the participation-audit JOIN;
14. actual result becomes the evidence surface; `72 rows returned` may be shown without interpretation;
15. actual `funding_round_id = 1003` rows are focused locally;
16. learner performs final result interpretation/verification;
17. completion feedback closes the prediction-result loop.

`Show solution` is absent from pre-SQL reasoning and is available only within the active SQL Workspace. It remains strong assistance, does not auto-fill/run/complete evidence, and may be represented in assistance provenance.

---

## 4. Step-by-step instructional-function review

| Material step / transition | Instructional function | Learner action | Placement / dependency | Scaffold level | Removal / compression consequence | Review |
|---|---|---|---|---|---|---|
| Business request | Business/analytical orientation; establishes why participation-level information is needed | Notice what the audit is for and what information is requested | First; anchors every later choice | High contextual support, but no row-multiplication conclusion | Without it, relation selection, Grain, SQL fields, and final result lose the analytical reason connecting them | **PASS** |
| Business request → relevant relations | Reuse checkpoint; reconnect business meaning to schema | Identify and add `funding_round` + `round_investment` | Requires business request and Live Schema; enables relationship work | Reduced from first exposure: no re-teaching, but learner still acts | If removed, the system performs relational interpretation that the learner has already learned to do; the encounter begins over-resolved | **PASS after structural-reuse revision** |
| Relations → direct connection | Reuse checkpoint; establishes the concrete relationship before formal reveal | Identify `round_investment.funding_round_id` as the connection field | Requires selected relations; supports PK/FK reveal and later Cardinality | Meaning-first action; formal connection hidden until success | If removed, the relationship that later becomes the JOIN condition is supplied rather than re-used by the learner | **PASS after structural-reuse revision** |
| Connection → PK/FK reveal | Concept/relationship consolidation; establishes formal relationship direction | Notice the learner-found field is FK → PK and use it as an established fact | After connection action; before Grain/Cardinality | Prior terminology is reused, not re-taught | If removed entirely, later Cardinality/SQL work loses a clear formal anchor for the relationship the learner just found | **PASS** |
| Established relationship → target Grain | Reused relational reasoning; sets output-row meaning independently of relationship multiplicity | Identify one recorded participation per result row | Business request already supports it; does not depend on Cardinality | Closed prompt; direct reminder only after difficulty | If removed, later multiplication can degrade into “more rows” without a defined row meaning | **PASS** |
| Grain → Cardinality | Establishes second premise needed for multiplication reasoning | Interpret that each participation belongs to one round and one round can have multiple participations | Requires relationship already established; prediction depends on it | Closed semantic interpretation; no first-exposure Cardinality lesson | If removed, the learner lacks the multiplicity premise needed to infer multiplication | **PASS** |
| Cardinality → compact `1 : M` marking | Consolidates the learner-established relationship | Notice formal compact representation of the conclusion already reached | Only after correct Cardinality judgment | Low; conclusion follows learner action | Can be compressed, but removing all consolidation would weaken the stable premise used immediately afterward | **PASS** |
| Cardinality + Grain → qualitative row-multiplication prediction | **Core evidence** of target capability | Infer that one round can occupy several result rows when several participations remain represented | Requires Grain and Cardinality; must precede concept naming and SQL | Closed response supplies premises, not conclusion | If removed or pre-answered, the target capability is not independently evidenced before execution | **PASS** |
| Prediction → repeated-context judgment | **Core evidence**; distinguishes legitimate repetition from duplicates | Predict that round-level values repeat while participation identity differs | Requires qualitative multiplication conclusion and participation Grain | Closed interpretive options; no concrete result yet | If removed, “row multiplication” can remain a shallow row-count idea without understanding what repeats and why | **PASS** |
| Prediction → JOIN row multiplication Concept Moment | Concept naming/consolidation after learner reasoning | Connect formal concept to reasoning already performed | Must follow both pre-execution judgments | Teacher explanation allowed because target conclusion is already learner-established | If moved earlier it leaks evidence; if removed entirely the encounter loses consolidation of the new capability | **PASS** |
| Concept → concrete 3→3 application | Supporting practice/application, not core evidence | Apply established rule to a concrete count | Only after qualitative core prediction | High support; numeric premise supplied | Can be removed/compressed without invalidating core evidence; its value is practice/clarification, not proof of target reasoning | **PASS; correctly classified as supporting** |
| Established relational reasoning → SQL transition | Continuity / translation scaffold from relational plan to implementation | Learner should connect current request, fields, relations, and relationship to SQL roles | After core prediction/concept consolidation; before independent authoring | Current design only “reconnects premises”; concrete SQL mapping is not required on the normal path | If the translation function is absent, the learner must independently recall how a new case maps to `SELECT` / `FROM` / `JOIN` / `ON` after only one substantially supported first-exposure JOIN | **REVISION REQUIRED — Finding P1** |
| SQL scaffold / guidance → editor action | Procedural support for tool use without doing target row-multiplication reasoning | Author the participation-audit query | Depends on successful transition from relational reasoning into SQL | Generic SQL-structure reminder is optional/on-demand; Show solution is stronger assistance inside workspace | If the optional scaffold is the only mapping support, a learner who needs normal continuity must either make an unsupported translation or request stronger assistance | **REVISION REQUIRED — Finding P1** |
| Learner-authored SQL | Tool/implementation work; supporting evidence | Produce semantically correct direct INNER JOIN with six requested fields | Requires established relationship and output contract | Clean editor; no prefilled answer; optional support available | If removed, encounter cannot generate the actual joined result needed for post-execution evidence; if prefilled, SQL evidence disappears | **PASS as supporting evidence, conditional on P1 revision** |
| SQL execution → result inspection | Evidence production and inspection | Inspect returned columns/rows and 72-row status without being told the interpretation | After semantically valid query; before final verification | System status is deliberately non-interpretive | If execution immediately states the relational conclusion, final verification becomes answer repetition rather than interpretation | **PASS** |
| Full result → 1003 local slice | Evidence locality; makes target mechanism inspectable | Notice same round context across distinct participation IDs/investor IDs | Must derive from actual learner result | Focused evidence slice; not a new SQL filtering task | If removed, final verification may depend on scanning a large table or memory rather than local evidence | **PASS** |
| Result evidence → final verification | Post-execution reconciliation; closes prediction-result loop | Interpret four rows as distinct participations for one round and connect repetition to Grain/multiplicity | Requires actual result and earlier prediction | Closed interpretation with evidence adjacent; system has not pre-announced conclusion | If removed, encounter proves prediction but does not require reconciliation with actual data evidence | **PASS** |
| Final verification → completion feedback | Consolidation and closure | Compare final interpretation with earlier prediction | Only after correct verification | Teacher explanation may now state conclusion | If shown before verification it leaks the answer; after verification it appropriately closes the loop | **PASS** |
| Optional local hints | Assistance with provenance | Use reminders after difficulty, then respond | Only after difficulty; cannot silently count as unassisted | Escalating reminders; provenance required | Without provenance, assisted and unassisted capability evidence become indistinguishable | **PASS, provenance requirement is present** |
| SQL-workspace `Show solution` | Strong optional assistance for SQL implementation | Reveal canonical SQL, then still author/run/verify | Available only after protected pre-SQL evidence is complete | Strong assistance; does not auto-fill/run/complete | If available pre-SQL it could leak protected reasoning; current clarification prevents that. If untracked where evidence strength matters, SQL evidence provenance would be unclear | **PASS under current clarification** |

---

## 5. Required continuity inspection

### Business request → relevant relations

**PASS.**

The current structural-reuse revision correctly restores learner action here. Relation identification is not new core evidence, but its instructional function is still needed: it activates the learner's prior relational-reading capability and keeps the business request connected to the schema rather than beginning from a system-prepared relation pair.

### Relations → direct connection

**PASS.**

The learner must find `round_investment.funding_round_id` before PK/FK is revealed. This preserves the reused meaning-first function from Stage 1 without replaying first-exposure teaching.

### Connection → target Grain

**PASS.**

The connection is established as schema meaning, then the learner states what one requested output row represents. The design does not incorrectly derive Grain from Cardinality.

### Grain → Cardinality

**PASS.**

These are separate premises. The learner establishes output-row meaning and then interprets relationship multiplicity from the relationship already found.

### Cardinality → qualitative row-multiplication prediction

**PASS.**

The current owner-directed evidence revision materially improves Evidence Independence. The learner is no longer handed “three matching participations” before the core qualitative prediction. The premises are available; the row-multiplication conclusion is not.

### Prediction → concept consolidation

**PASS.**

JOIN row multiplication is named only after the learner commits both the multiplicity prediction and repeated-context interpretation. Concept timing is appropriate.

### Established relational reasoning → `JOIN ... ON ...`

**REVISION REQUIRED.**

This is the material continuity defect. The design lists the current premises but does not require a learner-facing translation from the already-established current relationship into the current SQL expression. The first-exposure Stage 1 sequence explicitly taught that an established relationship becomes the `ON` condition and that the business request maps into the whole query. The current learner state supports compression of that teaching, but not its complete removal.

The required function is not “teach JOIN again.” The still-needed function is to make the current plan executable by reconnecting the current relationship and requested output to SQL roles before the learner is expected to author the full query.

### Relational reasoning → learner-authored SQL

**REVISION REQUIRED.**

The current task jumps from a relational summary to “Write the JOIN that produces the requested participation audit.” That requires a stronger independent procedural transfer than the Course-Assumed Learner State establishes.

The learner has had one first-exposure authored JOIN, with explicit mapping and substantial support. Current sources explicitly deny cumulative independent transfer/mastery. Therefore the learner should not be required to reconstruct the full mapping unaided merely because the relational reasoning itself is already established.

### SQL scaffold / guidance → editor action

**REVISION REQUIRED.**

The optional structure reminder:

`SELECT requested fields → FROM one relation → JOIN related relation → ON established relationship`

is useful secondary assistance, but because it is optional it does not guarantee the normal-path continuity function. `Show solution` cannot substitute for that function: it is deliberately stronger assistance and may reveal the full answer.

A normal-path reduced bridge is needed. The exact interaction, wording, visual treatment, and amount of detail remain Encounter Architect design decisions.

### SQL execution → result interpretation

**PASS.**

A valid run may state `72 rows returned` but cannot state the target interpretation. This correctly preserves the learner's final result-reading action.

### Result evidence → final verification

**PASS.**

The actual 1003 slice is local to the verification. The learner must distinguish repeated one-side values from duplicate rows using differing participation identity.

### Optional assistance / Show solution → evidence meaning

**PASS.**

The current SQL-workspace clarification removes `Show solution` from protected pre-SQL reasoning. Its use therefore cannot directly supply E3/E4 before those core predictions are committed. During SQL authoring it is strong assistance and should affect the interpretation of SQL implementation evidence, but it does not auto-complete the editor, run the query, or bypass the required final verification.

The unresolved future Back / Retry / Redo semantics remain correctly **OPEN / BACKLOG / OUT OF CURRENT IMPLEMENTATION SCOPE** under the current-scope clarification and do not require owner escalation for this review.

---

## 6. Evidence Independence findings

### E1 — Target Grain

**PASS as a reused premise/checkpoint; not sufficient by itself as evidence of the target row-multiplication capability.**

The business request strongly cues participation-level Grain, which is appropriate because the analytical request must be precise. The target capability does not require the learner to discover an obscure Grain; it requires the learner to **use** the target Grain with Cardinality. E1 therefore supplies/establishes one premise for later evidence rather than independently proving the target capability.

### E2 — Cardinality use

**PASS as a required premise/checkpoint.**

The learner must interpret the relationship rather than receive the 1:M conclusion before acting. This is adequate reused relational reasoning.

### E3 — Qualitative pre-execution multiplication prediction

**PASS — strong core evidence.**

The learner is given the two legitimate premises — participation Grain and the possibility of multiple participation records per funding round — but is not given a numeric child count or the row-multiplication conclusion. The correct response requires integrating those premises.

### E4 — Repeated one-side context

**PASS — strong core evidence.**

The learner must distinguish expected repeated round-level values across distinct participation-grain rows from accidental duplicates before seeing actual result rows.

### Concrete `3 → 3` application

**PASS as supporting evidence only.**

Because the child count is supplied, direct counting can produce the answer. The owner-directed revision correctly removes this action from the core evidence claim.

### E5 — Post-execution reconciliation

**PASS as result-reconciliation evidence.**

The learner has already learned the conceptual interpretation before SQL, so this is not a second independent discovery of row multiplication. Its proper function is to verify that the learner can recognize the predicted mechanism in actual result evidence. The visible differing participation identities make the interpretation grounded in the returned rows rather than in row count alone.

### E6 — SQL implementation

**PASS as supporting evidence, with a continuity defect in the normal-path preparation.**

A semantically correct query demonstrates implementation of the relational plan, but SQL correctness is explicitly not allowed to replace E1–E5. Use of `Show solution` or other strong SQL assistance must remain distinguishable where implementation-evidence strength is interpreted.

### Overall Evidence Independence conclusion

The revised E3/E4 design successfully protects the core target reasoning. The current material defect is not that the row-multiplication answer is leaked; it is that the learner is later required to translate the already-established reasoning into SQL with insufficient normal-path continuity support.

---

## 7. Scaffolding-to-Evidence Calibration

### Relational-reading reuse

**PASS.**

The structural-reuse revision achieves an appropriate reduction:

- the learner performs relation selection and connection finding;
- these are not re-taught as new concepts;
- formal PK/FK appears after meaning is established;
- the actions are reuse checkpoints, not falsely promoted to new row-multiplication evidence.

### Grain and Cardinality

**PASS.**

Closed responses are appropriate for reused concepts at the current learner state. The design does not need to replay the first-exposure Concept Moments.

### Row-multiplication prediction

**PASS.**

The owner-directed qualitative revision correctly calibrates scaffolding to the stronger evidence purpose: it supplies premises but not the conclusion. Local hints can support difficulty while provenance distinguishes assisted from unassisted evidence.

### Baseline removal

**PASS — removal is justified.**

Stage 1's Baseline performed a specific instructional function: it established the starting 18 article rows needed for an exact row-preservation prediction. The current target is qualitative row multiplication at participation Grain, not preservation of an exact starting-row count. The target mechanism can be evidenced from Grain + Cardinality and later actual rows. Removing the prepared `COUNT(*)` Baseline therefore does not leave a missing inference that the learner needs for this encounter.

### SQL translation / authoring

**FAIL — material calibration defect.**

The design moves from substantial first-exposure translation support in Stage 1 to no mandatory current-case translation bridge. That reduction is too large for the stated Course-Assumed Learner State. The learner is treated as if one supported authored JOIN has already established independent procedural translation on a new case, while the authority explicitly says cumulative independent transfer/mastery is not established.

This is not an argument for replaying the Stage 1 three-beat teaching sequence. It is a requirement to preserve the still-needed translation function in reduced form.

### Result interpretation

**PASS.**

Actual evidence remains visible; system/status copy does not pre-answer the interpretation; final verification is required for completion.

---

## 8. Concept timing, assistance provenance, and unsupported learner-state assumptions

### Concept timing

**PASS.**

- Grain / PK/FK / Cardinality / JOIN / `ON` are reused, not falsely presented as new concepts.
- JOIN row multiplication is named only after the core qualitative prediction and repeated-context judgment.
- No row-multiplication visual or 1003 evidence slice is allowed before prediction.

### Assistance provenance

**PASS.**

The design requires inspectable assistance provenance for evidence-bearing actions. Local hints do not silently become unassisted evidence. Current `Show solution` authority restricts it to the SQL Workspace and preserves its role as strong assistance rather than auto-completion.

### Unsupported learner-state assumptions

**One material unsupported assumption found.**

The current SQL transition assumes the learner can independently reconstruct the full current-case SQL mapping after one supported first-exposure JOIN. Current sources do not support that strength of assumption. This is Finding P1 below.

No other material unsupported learner-state assumption was found in the current sequence.

---

## 9. Classified findings

### P1 — Missing reduced translation bridge from established relational reasoning into learner-authored SQL

**Classification:** **REVISION REQUIRED**  
**Basis:** **PROFESSIONAL / PROCESS**  
**Current-scope materiality:** **YES**

#### Concrete design feature

After the learner establishes:

- the business request;
- the relevant relations;
- the direct relationship;
- target Grain;
- Cardinality;
- qualitative multiplication;
- repeated round context;

Episode 4 only reconnects those premises and then asks:

> Write the JOIN that produces the requested participation audit.

The only explicit query-shape support is an optional/on-demand generic structure reminder. A full canonical solution is available only through stronger `Show solution` assistance.

#### Learner consequence

On the normal path, the learner must independently perform several procedural translations that were explicitly scaffolded during first exposure:

- turn the requested six output fields into the `SELECT` list;
- express the already-established `funding_round` ↔ `round_investment` relationship as the `ON` condition;
- place the two relations into a valid `FROM` + `JOIN` structure;
- recognize the completed SQL as the implementation of the relational plan just established.

If the learner cannot make that jump, the available alternatives are trial-and-error syntax recall or requesting stronger assistance. Neither is equivalent to preserving a reduced instructional bridge.

#### Why this warrants revision before implementation

This is not a stylistic preference. SQL execution is required to create the actual result evidence used by the final verification. An unsupported transition can therefore prevent a learner who successfully performed the target relational reasoning from meaningfully reaching the evidence-inspection phase, or can make their progress depend on assistance that supplies substantially more than the missing translation.

The defect also rests on an unsupported learner-state assumption: current authority permits assuming one substantially supported learner-authored JOIN, not cumulative independent transfer/mastery of whole-query translation on a new case.

#### Required correction boundary

The design must preserve a **reduced normal-path translation/continuity function** between established relational reasoning and SQL authoring.

That function must make the current reasoning usable as SQL, including the material connections between the current requested output, selected relations, established relationship, and the SQL roles needed to implement them. It must not re-teach Grain/Cardinality/JOIN as new concepts and must not perform the new row-multiplication reasoning for the learner.

The exact learner-facing wording, visual treatment, number of beats, disclosure pattern, and editor integration are **not** established by this review and remain for Encounter Architect revision. This finding does not create a new course-wide rule.

---

## 10. Non-findings / matters that do not require escalation

No **BLOCKER** was found.

No **OWNER DECISION REQUIRED** matter was found.

The accepted `funding_round → round_investment` case remains valid for this review; no capability/case reopening is required.

The absence of a Baseline is not a defect because its Stage 1 instructional function is not needed for the current qualitative evidence target.

The restoration of relation identification and connection-finding is pedagogically appropriate and directly addresses the earlier over-resolution of reused relational-reading work.

The future Back / Retry / Redo evidence-editing issue remains nonblocking and out of current implementation scope under the current-scope necessity clarification.

No separate ADVISORY finding is necessary. The one material concern above should be resolved rather than diluted into optional advice.

---

## 11. Overall verdict

# **REVISION REQUIRED**

The current Cycle 1 design is pedagogically sound through the relational-reasoning sequence and through post-execution verification. Its core row-multiplication evidence is now substantially stronger after the qualitative-prediction revision, and the structural-reuse revision correctly restores learner action for relation identification and direct-connection reading.

However, the strengthened full-sequence review identifies one material continuity defect: the design compresses the first-exposure JOIN-to-SQL teaching past the point supported by the current Course-Assumed Learner State. It preserves the relational premises but not the still-needed translation function that makes those premises usable in learner-authored SQL.

This is a **targeted design defect**, not a capability, case, or whole-encounter failure.

---

## 12. Exact next process action

Per the current `learner-encounter-production-execution.md`:

**Encounter Architect — targeted design reconciliation/revision to resolve Finding P1 by restoring an appropriately reduced relational-reasoning → SQL translation bridge in the current Cycle 1 encounter.**

Runtime implementation is not authorized from this review result until the finding is resolved through the applicable downstream review/control path required by `learner-encounter-production-process.md`.

Because the required correction affects pedagogy / learner flow and may affect the learning experience, subsequent review/control must follow the process's change-impact rules; this review does not waive or pre-pass those downstream gates.

## 13. Execution / provenance update

No execution or provenance file was modified by this reviewer. The current process/execution authority requires this role to produce the durable review artifact and state the exact next action; it does not assign this reviewer responsibility to rewrite execution-state or provenance records as part of the review itself.
