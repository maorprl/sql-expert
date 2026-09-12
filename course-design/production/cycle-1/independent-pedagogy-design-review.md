# Independent Pedagogy Design Review — Cycle 1

## 1. Review basis and independence statement

This review is the full independent pedagogy review of the frozen Cycle 1 Encounter Design Packet before implementation.

The mandatory entry gate passed on the repository’s current default branch (`main`):

- `course-design/production/cycle-1/provenance.md` marks `course-design/production/cycle-1/capability-and-case-brief.md` as **VERBATIM VERIFIED**;
- `course-design/production/cycle-1/provenance.md` marks `course-design/production/cycle-1/lightweight-pedagogy-gate-review.md` as **VERBATIM VERIFIED**;
- `course-design/production/cycle-1/provenance.md` marks `course-design/production/cycle-1/encounter-design-packet.md` as **VERBATIM VERIFIED**;
- `learner-encounter-production-execution.md` states that the **Independent Pedagogy Design Review** and Independent UX Design Review are unblocked and next, and names the frozen Encounter Design Packet as the durable input.

I formed this pedagogy review independently. I did **not** read, search for, or use any Cycle 1 UX Design Review output, and no other reviewer’s judgment was used as evidence.

The review applies the Pedagogy Reviewer role and finding classifications defined in `learner-encounter-production-process.md`. Existing course authority is distinguished from professional/process judgment; this review does not create new course authority.

## 2. What was reviewed

Before forming the review, I read the current sources required for this execution:

1. `learner-encounter-production-process.md`
2. `learner-encounter-production-execution.md`
3. `agent-assisted-work-protocol.md`
4. `course-exit-criteria.md`
5. `course-knowledge-map.md`
6. `pedagogical-foundations.md`
7. `course-design/stage-1/stage-1-learner-route.md`
8. `course-design/stage-1/stage-1-interaction-decisions.md`
9. `course-design/test-drives/stage-1-targeted-test-drive-2026-09-10.md`
10. `startup-ecosystem/startup-ecosystem-schema.sql`
11. `startup-ecosystem/startup-ecosystem-seed.sql`
12. `course-design/production/cycle-1/capability-and-case-brief.md`
13. `course-design/production/cycle-1/lightweight-pedagogy-gate-review.md`
14. `course-design/production/cycle-1/encounter-design-packet.md`

No preserved Stage 3 material was inspected.

The object under review is the frozen `encounter-design-packet.md`. I did not reopen the approved capability or case merely because a different encounter could have been designed. The review asks whether this packet can elicit the already-approved capability with defensible pedagogy and evidence.

The approved capability carried into design is narrowly relational: from a known one-to-many relationship and an established starting Grain, the learner must predict before execution that joining from the one side to many-side detail can create multiple rows per starting entity, repeat one-side information, and change the natural result Grain, and then explain the observed multiplication through relationship structure rather than accidental duplicate data.

## 3. Findings

### BLOCKER

No **BLOCKER** finding was identified.

The packet does not contradict current course authority in a way that invalidates the approved capability or case, and no unresolved owner decision is required in order to reconcile the design issues below.

### Finding P1 — Current-data counts can provide a shortcut around the intended Cardinality-based prediction

**Classification:** REVISION REQUIRED  
**Basis:** SOURCE-DERIVED REQUIREMENT

**Affected packet parts:** §12 Episode B, §15 Prediction required before execution, §23 Evidence of understanding, §29 Validation criteria.

**Concrete problem**

Episode B permits a current-data reference to state, before the structural prediction is completed:

- 4 source rows;
- 18 article rows;
- each article belongs to one source.

The packet then asks the learner to establish that one source can contribute more than one raw JOIN row and that source information will repeat.

Those conclusions can be reached from the exposed counts themselves: 18 article matches distributed across four sources necessarily imply repeated source participation even if the learner does not actually use the already-known `1:M` relationship to predict the JOIN behavior. The fact that the exact `18` prediction is delayed until after the structural judgments does not fully remove the shortcut, because the same 4-versus-18 information can help answer the structural judgments that are supposed to demonstrate the Cardinality-to-multiplicity reasoning.

The risk is heightened by the fact that `18` is already familiar from Stage 1.

**Why it matters**

The Lightweight Pedagogy Gate approved evidence that is specifically relationship-based, not count-recall based. It explicitly warned that the familiar case must not collapse into a shallow “4 becomes 18” response and that the learner evidence must preserve multiplicity, repetition, and Grain reasoning.

The Exit Criteria and Knowledge Map likewise require prediction of relational effects from structure and Cardinality, not merely inference from already-exposed instance counts.

If the learner can reach the required pre-execution answers without applying the known `1:M` relationship, the evidence does not cleanly demonstrate the approved capability.

**Correction condition**

Before implementation authority is frozen, the design must ensure that the structural pre-execution evidence for multiplicity, repetition, and natural result Grain cannot be satisfied by the exposed 4-versus-18 instance counts as a substitute for Cardinality reasoning.

The exact current row count may still be used later as a prediction/verification detail. The Encounter Architect owns how to reconcile this; this review does not prescribe a replacement interaction.

### Finding P2 — The Fan-out Concept Moment supplies part of a diagnostic conclusion that is later claimed as learner evidence

**Classification:** REVISION REQUIRED  
**Basis:** SOURCE-DERIVED REQUIREMENT

**Affected packet parts:** §12 Episode C and Episode E, §17 Concept / terminology timing, §23 Evidence of understanding, §32 Traceability.

**Concrete problem**

After the learner predicts row multiplication and repetition, Episode C introduces the term `fan-out`. Naming the already-derived behavior at that point is pedagogically coherent.

However, the Concept Moment is also specified to explicitly distinguish:

- repeated source information; and
- duplicate source rows in the base table.

Later, the required post-execution evidence asks the learner to demonstrate that the returned rows are distinct source–article matches rather than duplicate source records and to explain the observed multiplication through relationship structure rather than accidental duplicate data.

That means a material part of the post-execution diagnostic conclusion is supplied by instruction before the learner is asked to produce it as evidence. The final response can therefore become recall or direct application of a just-stated conclusion rather than evidence that the learner made the intended structural diagnosis from the result.

**Why it matters**

The approved capability does not end at “rows multiplied.” It explicitly includes explaining the observed multiplication through the relationship structure rather than as accidental duplicate data.

`pedagogical-foundations.md` also requires guidance to preserve the reasoning journey without performing the reasoning for the learner. A new term may name meaning the learner has already established; it should not silently perform a later evidence-bearing inference that the design still intends to assess.

**Correction condition**

Before implementation authority is frozen, the design must remove the circularity between the Concept Moment and the later diagnostic evidence.

The required structural-versus-duplicate distinction must either already have been elicited from the learner before the Concept Moment, or the Concept Moment must avoid supplying a conclusion that remains part of later required evidence, or the later evidence must require a genuinely new inference rather than restating the taught distinction.

The Encounter Architect owns the reconciliation; this review does not prescribe rewritten learner-facing content.

### Finding P3 — Assistance state should remain distinguishable in the captured reasoning evidence

**Classification:** ADVISORY  
**Basis:** PROFESSIONAL / PROCESS RECOMMENDATION

**Affected packet parts:** §19 Scaffolding and hint logic, §23 Evidence of understanding, §27 Implementation invariants.

**Concrete problem**

The prediction can receive escalating support. In particular, Prediction Hint 2 reactivates the already-taught rule that a JOIN produces a result row for each matching pair. The packet correctly permits that support, and it correctly avoids treating SQL success as the primary evidence.

The packet says required reasoning evidence remains reviewable, but it does not explicitly require the completed evidence record to preserve whether the prediction was reached unassisted, after Hint 1, or after Hint 2.

**Why it matters**

The production process distinguishes supported/practised performance from independently exercised performance and warns against silently upgrading the Course-Assumed Learner State. A final correct closed response after substantial scaffolding is useful evidence, but it is not the same evidence as an unassisted relationship-based prediction.

**Recommendation**

Preserve enough assistance-state information with the completed reasoning evidence that later validation and Cycle Closure can distinguish supported success from unassisted success. This is an evidence-quality recommendation, not a new course-wide hint-policy requirement.

### OWNER DECISION REQUIRED

No **OWNER DECISION REQUIRED** finding was identified.

The broader OPEN matters listed by the packet — including later Stage structure, overall course progression, cumulative-transfer status, and permanent global-control semantics — do not need to be resolved to reconcile this local encounter.

## 4. Cross-cutting pedagogy assessment

### Target reasoning and evidence

The design is substantially aligned with the approved target. It does not organize the encounter around writing a JOIN. The learner is asked first to derive the requested source-level Grain, use a known one-to-many relationship, predict multiple rows and repeated source information, identify a different natural raw-result Grain, and commit to that prediction before execution.

That is the correct kind of relational work for this capability. A syntactically correct JOIN alone cannot complete the encounter, and the final verification is intended to occur with the actual result visible.

The two REVISION REQUIRED findings matter because they concern the validity of that evidence, not the overall capability choice: one shortcut can let instance counts stand in for Cardinality reasoning, and one instructional statement can pre-supply a diagnostic distinction later claimed as evidence.

### Sequencing and prediction before execution

The main sequence is pedagogically sound:

business situation → requested output Grain → known relationship → relational prediction → terminology → SQL verification → result interpretation.

SQL appears after the core prediction, so SQL remains an implementation/verification layer rather than the organizer of the encounter. There is no SQL-first discovery path and no unnecessary Baseline `COUNT(*)` episode.

The term `fan-out` is also correctly delayed until after multiplication has been predicted. The issue in Finding P2 is not the placement of the term itself; it is the additional diagnostic conclusion attached to that Concept Moment.

### Starting Grain, requested business-output Grain, and natural result Grain

The packet keeps the three roles conceptually distinct:

- starting/input Grain: one news source per row;
- requested business-output Grain: one news source per row, derived from the stakeholder requirement;
- natural raw-result Grain: one source–article match per row.

The starting Grain and requested output Grain happen to be the same in this case, but they arise from different sources of meaning. The reveal order appropriately establishes the requested Grain from the business situation rather than deriving it from Cardinality or from the `FROM` relation.

The natural result Grain is then treated as a consequence of the matching structure, not as the requested business Grain. This distinction is central to the encounter and is preserved in the packet.

### Prior exposure, reuse, and Course-Assumed Learner State

The packet is appropriately conservative about prior Stage 1 evidence. Grain, PK/FK, Cardinality, JOIN vocabulary, matching semantics, and the same relationship are reused without being presented again as first-exposure concepts. The encounter does not claim that those capabilities are mastered or broadly transferable.

Supplying the relation pair and the known `1:M` relationship is justified for this narrow target. Relation identification was already identified during Phase 1 as non-intrinsic to the fan-out capability, and re-assessing it here would add an unrelated evidence demand.

Using the same relation pair also has a distinct purpose: Stage 1 reasoned in the many-to-one direction and predicted preservation; this encounter reasons from the one side toward many-side detail and asks for multiplication. That is justified reuse rather than unnecessary re-teaching.

The learner-authored INNER JOIN introduces some transfer demand, but the packet correctly states that a syntax failure does not by itself invalidate the relational evidence and that SQL-specific support may be provided. No upstream assumption of broad SQL mastery is required.

### Scaffolding and cognitive load

The design avoids repeating the calibrated first-JOIN teaching sequence. It does not re-teach PK/FK, Cardinality, Grain, or JOIN as new concepts, and it excludes unrelated mechanisms such as aggregation, pre-aggregation, LEFT JOIN/NULL reasoning, EXISTS, and multi-branch fan-out.

The prediction is decomposed into materially different judgments rather than a single row-count guess, and hint escalation points back to previously introduced prerequisites. That is appropriate scaffolding for a new consequence built from previously introduced concepts.

The main scaffolding concern is evidentiary rather than load-related: once substantial hints are used, later records should not silently treat the final correct response as independent prediction evidence. That concern is captured as Advisory Finding P3.

### Learner situation

The source-level coverage review creates a genuine reason to care about Grain. The encounter is not asking for fan-out because fan-out exists in the schema; it asks whether a proposed detail JOIN is compatible with a stakeholder requirement that each source appear once.

The design also correctly stops before introducing a repair mechanism. Requiring the learner to solve how to preserve one source per row while representing all article detail would introduce aggregation, pre-aggregation, collection/concatenation, or another mechanism outside the approved target.

### Shortcut resistance

The packet explicitly protects against several shortcuts:

- recognizing `1:M` by itself is not sufficient;
- SQL syntax success is not sufficient;
- exact row count alone is not sufficient;
- final verification requires interpreting visible result evidence;
- repeated source values must be distinguished from duplicate base data.

Those protections are directionally correct. Finding P1 identifies the remaining shortcut: exposing 4 and 18 before structural prediction can itself become an alternative route to the multiplicity/repetition answers that are supposed to show relationship-based reasoning.

## 5. OPEN / owner matters

No local pedagogical issue found in this review requires a Course Authority Owner decision.

The following broader matters remain OPEN as recorded in current sources and should remain OPEN here:

- Stage structure beyond current Stage 1;
- overall course progression;
- broader schema-exposure policy;
- cumulative-transfer status across multiple encounters;
- permanent global Back / Retry / Redo / Show solution semantics;
- any course-wide Teaching / Reinforcement / Transfer / Assessment taxonomy.

The review does not resolve or alter those matters.

## 6. Review conclusion

- **BLOCKER exists:** **No.**
- **REVISION REQUIRED finding exists:** **Yes.** Two material design revisions are required before implementation authority can be frozen: remove the instance-count shortcut around Cardinality-based prediction, and remove the circularity in which the Fan-out Concept Moment supplies a diagnostic distinction later claimed as learner evidence.
- **OWNER DECISION REQUIRED finding exists:** **No.**
- **ADVISORY finding exists:** **Yes.** Preserve assistance state strongly enough that later evidence interpretation can distinguish scaffolded from unassisted prediction.

The design can proceed to **Architect Reconciliation without reopening the upstream capability or case**. The approved capability and `news_source → news_article` case remain viable; the identified defects are local to evidence design, reveal/scaffolding choices, and can be reconciled within the Encounter Design Packet.

This review is an input to Architect Reconciliation. It does not describe the design as approved or validated.