# Cycle 1 — Post-Build Runtime / Conformance Review

**Role:** Conformance & Validation Auditor  
**Review:** Independent Post-Build Runtime / Conformance Validation  
**Repository:** `maorprl/sql-expert`  
**Branch reviewed:** current default branch (`main`)  
**Implementation commit reviewed:** `e5af473cd68f54268cb68da9ea66699515cf9cd7` (`Implement Cycle 1 fan-out encounter`)

## Formal verdict

# **REVISION REQUIRED — IMPLEMENTATION FIX**

The implementation is not yet conformant to the frozen Cycle 1 authority.

Two material implementation defects affect accepted validation/evidence behavior:

1. the SQL verifier can accept an out-of-scope multi-relation / window-function path as successful Cycle 1 SQL verification, even though the frozen contract requires the proposed direct `news_source → news_article` INNER JOIN and excludes additional relational mechanisms / multi-branch behavior from the accepted encounter;
2. protected structural-prediction assistance provenance can be mutated after that prediction has already been committed, producing conflicting provenance for the same evidence.

Both defects are implementation/state-contract defects. Neither requires a pedagogy redesign, a UX redesign, a capability/case reopening, or a new owner decision to correct. Under the process change-impact rules, the required route is **IMPLEMENTATION FIX** followed by Auditor re-validation. Any specialist re-review is required only to the extent that the fix changes the learner experience observed by that review stream.

There is also **missing independent browser/build runtime evidence**. The current audit independently establishes source/state/data conformance for many requirements and independently exercises the current SQL/data contract, but it cannot certify the production browser bundle as executed end-to-end in the available audit environment. That limitation is recorded separately below and is not inferred away from Implementer self-testing.

This is a Runtime / Conformance verdict only. It is not the Rule-Based Acceptance Gate, and it does not replace the independent post-build Pedagogy or UX verdicts.

---

## 1. Mandatory entry gate

**PASS.**

The required post-build review gate is open.

- `learner-encounter-production-execution.md` explicitly states that Cycle 1 Implementation is complete and that **Independent Post-Build Review** is authorized and next, including Runtime / Conformance Validation by the independent Conformance & Validation Auditor.
- `course-design/production/cycle-1/provenance.md` records `course-design/production/cycle-1/implementation-record.md` as **DURABLE IMPLEMENTATION HANDOFF RECORDED**.
- `course-design/production/cycle-1/auditor-pre-build-control.md` records the required formal verdict: **PASS → FROZEN IMPLEMENTATION AUTHORITY**.
- `course-design/production/cycle-1/implementation-record.md` exists and records the Implementer's durable handoff.

The review therefore proceeded.

---

## 2. Frozen authority applied

Current frozen implementation authority was read in the supersession order already established by the pre-build audit:

1. `course-design/production/cycle-1/reconciled-encounter-design-packet.md`;
2. `course-design/production/cycle-1/authority-clarification-show-solution-assistance.md`;
3. `course-design/production/cycle-1/current-scope-necessity-clarification.md`;
4. `course-design/production/cycle-1/auditor-pre-build-control.md`.

The current schema/data authorities incorporated by that design were also checked:

- `startup-ecosystem/startup-ecosystem-schema.sql`;
- `startup-ecosystem/startup-ecosystem-seed.sql`.

The actual implementation files changed by the Implementer were inspected, including:

- `index.html`;
- `src/main.js`;
- `src/cycle1.js`;
- `src/cycle1.css`;
- the shared `src/interaction-lifecycle.js` used by the active implementation;
- `package.json` / `package-lock.json` and repository workflow/runtime evidence relevant to independent execution.

Implementer self-testing in `implementation-record.md` was treated only as a handoff claim and was not substituted for this audit.

---

## 3. Independent evidence obtained

### 3.1 Repository / implementation evidence

The repository default branch is `main`. The implementation under review is commit:

`e5af473cd68f54268cb68da9ea66699515cf9cd7`

The active entry point imports `createCycle1` from `src/cycle1.js`; the previous Stage 1 module is not the active learner encounter. The learner-facing page no longer assigns a Stage number to the active encounter.

### 3.2 Independent schema / seed execution evidence

The current schema and seed facts were independently re-exercised in SQLite from the authoritative `news_source` / `news_article` definitions and current seed values.

Confirmed:

- `news_source` rows: **4**;
- `news_article` rows: **18**;
- direct `news_source INNER JOIN news_article` matches: **18**;
- article rows without a matching source: **0**;
- source article multiplicities, in source-id order: **5 / 6 / 5 / 2**.

The schema authority also confirms:

- `news_source.news_source_id` is the `news_source` primary key;
- `news_article.news_source_id` is `NOT NULL` and references `news_source.news_source_id`.

The accepted case and numeric consequence therefore remain valid against current authority.

### 3.3 Independent SQL-contract adversarial check

The implemented validator in `src/cycle1.js` was exercised against an alternative query that is outside the accepted Cycle 1 SQL path but still returns the same 18 canonical source/article pairs:

```sql
WITH tagged AS (
  SELECT news_article_id,
         ROW_NUMBER() OVER (
           PARTITION BY news_article_id
           ORDER BY tag_id
         ) AS rn
  FROM article_tag
)
SELECT news_source.name AS source_name,
       news_article.title AS article_title
FROM news_source
INNER JOIN news_article
  ON news_source.news_source_id = news_article.news_source_id
INNER JOIN tagged
  ON tagged.news_article_id = news_article.news_article_id
 AND tagged.rn = 1;
```

Against the current seed, every article has at least one `article_tag` row. The query above therefore returns exactly the same 18 `(source_name, article_title)` pairs as the canonical direct JOIN.

The implemented `validateSql()` logic accepts it because:

- it contains `FROM news_source`;
- it contains a JOIN to `news_article` and an `ON` clause;
- it does not contain one of the validator's specifically forbidden tokens (`LEFT JOIN`, `GROUP BY`, `HAVING`, `DISTINCT`, `EXISTS`, `UNION`, or the listed aggregate functions);
- its final result contains the 18 canonical source/article pairs.

It is consequently a concrete accepted-path counterexample, not merely a theoretical concern about parser strictness.

### 3.4 Independent protected-provenance state trace

The relevant `src/cycle1.js` state transitions were independently traced.

A concrete valid path is:

1. complete the three structural subjudgments without assistance;
2. `renderStructuralPrediction()` records the completed structural evidence with assistance = `unassisted` and sets `structuralRecorded = true`;
3. before selecting **Use the current data**, the encounter is still in `state.current === 'structuralPrediction'`;
4. click global **Show solution**;
5. `showSolution()` calls `markSolutionUse()`, and `currentAssistanceKey()` still resolves to `structuralAssistance`, so the live state is raised to `solution-assisted`;
6. the already-stored completed structural record remains `unassisted`;
7. later `committedPredictionMarkup()` reads the mutated live `state.structuralAssistance` and presents `solution-assisted` for that same committed prediction.

The same structural evidence can therefore be displayed with two conflicting assistance classifications. The analogous inconsistency can occur after Hint 1 / Hint 2 assisted commitment as well.

### 3.5 Build / browser runtime evidence

No GitHub Actions workflow run exists for the implementation commit, and no repository workflow directory supplying independent CI build/runtime evidence was found.

The repository declares Vite as a dev dependency and `npm run build` as `vite build && node scripts/copy-sql-sources.mjs`. In the independent audit execution environment, a dependency-installed checkout / runnable Vite environment was not available and package retrieval was not available. No authoritative deployed URL for this implementation was found from the current repository material.

Accordingly, this audit does **not** claim that an end-to-end production build or browser interaction run was independently completed. Browser-specific rendering, focus, responsive behavior, and live click-path execution remain missing runtime evidence rather than being inferred from source inspection or from the Implementer's self-test report.

---

## 4. Confirmed conformance

The following requirements are confirmed from current implementation/state logic and, where applicable, independent schema/SQL execution.

### 4.1 Case and Grain contracts

**CONFIRMED.**

- Active case is `news_source → news_article`.
- Starting/requested business Grain is one publishing source per row.
- Structural prediction requires the learner to identify one source–article match as the natural raw JOIN row meaning.
- The closing state states that the raw JOIN does not preserve requested source-level Grain.

### 4.2 Reveal order through protected prediction

**CONFIRMED FROM STATE LOGIC.**

The implemented state progression is:

`requestedGrain → structuralPrediction → numericPrediction → sql → verification → complete`

Within structural prediction, the learner progressively commits:

1. one source can contribute multiple raw JOIN rows;
2. one raw row naturally represents a source–article match;
3. source-side information can repeat.

The current-data fact (`18 article rows`, each belonging to one source) is rendered only in `numericPrediction`, after the structural subjudgments have been committed.

No learner-facing `4 versus 18` shortcut is embedded into the protected prediction workspace.

### 4.3 Protected prediction before SQL

**CONFIRMED FROM STATE LOGIC.**

`src/main.js` calls `cycle1.canRunSql()` before database execution. `canRunSql()` returns true only in the SQL state and before SQL has been verified.

The SQL state is reached only after successful requested-Grain, structural-prediction, and 18-match numeric-prediction interactions. SQL therefore cannot execute through the normal Run / Ctrl-Enter path as capability evidence before required prediction is committed.

### 4.4 Fan-out terminology timing and diagnostic boundary

**CONFIRMED FROM STATE LOGIC / CONTENT.**

The `Fan-out` Concept Moment is rendered in the SQL state, after structural and numeric prediction and before verification execution is accepted.

Its text explains the general one-to-many multiplication mechanism and repeated one-side information. It does not tell the learner that the forthcoming repeated source names are non-duplicate base records and does not perform the post-result duplicate-vs-structural diagnosis.

### 4.5 SQL as verification rather than discovery

**CONFIRMED FOR STATE ORDER.**

SQL is unavailable until prediction is complete, and the SQL-state guidance explicitly frames execution as testing the already committed prediction.

Successful SQL execution alone does not complete the encounter; the learner must proceed through result verification.

The accepted-SQL enforcement itself is defective as described in Finding RC-01 below.

### 4.6 Current schema / seed / result contract

**CONFIRMED FOR THE AUTHORIZED DIRECT JOIN.**

Independent SQLite execution confirms the direct authorized join produces 18 source–article matches with multiplicities 5 / 6 / 5 / 2 and no orphan article rows in the current seed.

The implementation derives its canonical expected source/article pairs from the currently loaded runtime database rather than maintaining a second hard-coded pair list.

### 4.7 Hint 1 / Hint 2 sequencing

**CONFIRMED FROM STATE LOGIC.**

- Initial multiplicity prediction is attempted without a hint.
- Hint 1 becomes available after one incorrect multiplicity attempt.
- Hint 2 becomes available after another incorrect multiplicity attempt.
- Opening either hint raises structural assistance provenance to the corresponding assistance level.

The actual wording matches the frozen assistance intent: Hint 1 points back to relationship direction/Cardinality; Hint 2 points back to matching-pair semantics.

Protected-provenance integrity after structural commitment is defective as described in Finding RC-02.

### 4.8 Show solution — availability and non-bypass behavior

**CONFIRMED FROM SOURCE STATE LOGIC, WITH RC-02 EXCEPTION FOR POST-COMMIT PROVENANCE.**

The global `Show solution` button remains present throughout the active learner journey, including protected prediction, numeric prediction, SQL, verification, and completion.

Revealing a solution:

- does not programmatically select a learner answer;
- does not insert SQL into the editor;
- does not execute SQL;
- does not increment structural/verification progress;
- does not bypass required later verification.

During an active protected structural subjudgment, solution use raises assistance to `solution-assisted`, so assisted work is not represented as unassisted at that point.

However, Show solution use after structural commitment can corrupt the previously committed provenance classification; see RC-02.

### 4.9 Final result-primary verification and evidence locality

**CONFIRMED FROM IMPLEMENTATION STRUCTURE / CSS.**

After SQL is accepted, the editor is hidden from the result/verification surface while the actual result remains in the SQL workspace. The committed prediction is rendered in the same verification context as a secondary reference.

The five progressive verification interactions require:

- explanation of repeated source names through multiple article matches;
- explicit structural-versus-base-duplicate diagnosis;
- judgment that the raw result does not preserve one-source-per-row requested Grain;
- returned-row natural Grain = source–article match;
- reconciliation of actual result with committed prediction.

The closing relational explanation appears only after those verification interactions are completed.

### 4.10 Required evidence remains inspectable

**CONFIRMED FROM IMPLEMENTATION STRUCTURE.**

Completed interactions are retained through `interaction-lifecycle.js` as compact expandable completed evidence rather than disappearing. Structural prediction is stored separately from numeric prediction, SQL verification, and result verification.

### 4.11 No newly invented post-result Back / Retry / Redo semantics

**CONFIRMED.**

No Back / Retry / Redo control or state transition for reopening protected prediction evidence was introduced by the active Cycle 1 implementation.

The existing database reset / clear-result substrate does not establish the deferred post-result protected-prediction editing semantics.

### 4.12 No new Stage assignment

**CONFIRMED.**

The active encounter does not display or assign a new Stage number.

---

## 5. Material implementation defects

## RC-01 — Accepted SQL path does not enforce the frozen direct-JOIN / scope contract

**Classification:** **REVISION REQUIRED — IMPLEMENTATION FIX**  
**Type:** SQL / accepted-path conformance defect; undocumented deviation from frozen authority.

### Frozen requirement

The reconciled design requires the learner to implement the proposed **direct INNER JOIN** from `news_source` to `news_article` as the verification operation.

Relevant frozen constraints include:

- SQL is the implementation/verification layer for the already-predicted proposed operation;
- the learner authors a direct INNER JOIN using the known relationship;
- no new relational mechanism is needed or introduced;
- aggregation / pre-aggregation, LEFT JOIN/NULL reasoning, EXISTS, multi-branch fan-out, and other excluded mechanisms remain outside the accepted encounter;
- successful SQL execution alone is not evidence, but the SQL-verification state must still represent the authorized operation.

The pre-build audit froze that boundary and explicitly lists multi-branch fan-out and the other excluded relational mechanisms outside current Cycle 1 implementation scope.

### Actual implemented behavior

`validateSql()` rejects a finite list of tokens and checks for:

- `FROM news_source`;
- a JOIN to `news_article` with an `ON` clause;
- a final 18-row result exposing the canonical source/article pair multiset.

It does **not** enforce that the accepted statement is limited to the direct two-relation `news_source → news_article` operation.

The independently exercised CTE / `ROW_NUMBER()` / second-join query in §3.3 is outside the accepted Cycle 1 mechanism scope, yet returns the same canonical 18 pairs and satisfies the implemented validator. The implementation would therefore set `sqlVerified = true` and allow the learner to advance.

### Conformance impact

This is material because the implementation can certify SQL verification for a path that the frozen encounter explicitly did not authorize as its SQL operation. The result-pair check protects output values but does not protect the operation/evidence contract.

This is an implementation defect, not a reason to reopen the approved case or pedagogy.

### Required correction boundary

The implementation must enforce the already-frozen SQL contract so that Cycle 1 SQL verification succeeds only for the authorized direct `news_source → news_article` INNER JOIN behavior, with equivalent aliases / harmless formatting permitted, and does not accept additional relational branches or repair mechanisms outside the frozen scope.

The Auditor does not prescribe a parser architecture. The correction must preserve the frozen learner/evidence semantics and then be independently revalidated.

---

## RC-02 — Protected structural assistance provenance can be changed after commitment

**Classification:** **REVISION REQUIRED — IMPLEMENTATION FIX**  
**Type:** evidence / state provenance defect; undocumented deviation from frozen authority.

### Frozen requirement

The frozen design requires:

- structural prediction evidence to preserve the **actual assistance path**;
- scaffolded/solution-assisted success not to be represented as unassisted;
- later numeric / SQL / verification assistance not to retroactively rewrite the earlier protected structural classification;
- protected pre-execution prediction evidence not to be silently overwritten after later exposure in a way that erases temporal provenance.

The Show solution clarification establishes that Show solution is stronger assistance on the same continuum when it is used for the task, but merely revealing a solution does not itself complete or replace evidence.

### Actual implemented behavior

After all structural subjudgments are committed, the implementation records a completed structural evidence item using the then-current `state.structuralAssistance`.

However, before the learner clicks **Use the current data**, the encounter remains in `state.current === 'structuralPrediction'`.

If the learner clicks global **Show solution** during this already-committed structural screen:

- `currentAssistanceKey()` still returns `structuralAssistance`;
- `markSolutionUse()` raises the live `state.structuralAssistance` to `solution-assisted`;
- the previously stored completed structural record is not changed;
- later `committedPredictionMarkup()` reads the now-mutated live value.

A structural prediction completed unassisted can therefore be recorded in Completed Reasoning as **Unassisted** while the same committed prediction is later presented during verification as **Solution-assisted**. The same inconsistency can arise from an earlier Hint 1 / Hint 2 classification.

### Conformance impact

The implementation no longer has one stable provenance value for the protected structural evidence. The later Show solution action is not assistance that produced the already-committed structural prediction, yet it can alter the live provenance subsequently shown for that prediction.

That violates the frozen temporal/evidence-provenance contract and makes the evidence internally inconsistent.

### Required correction boundary

Structural assistance provenance must become immutable for that committed structural evidence once structural prediction is committed. Later Show solution use may be recorded for the later task/state where relevant, but it must not rewrite or conflict with the already-committed structural assistance classification.

Later displays of the committed prediction must read the committed provenance rather than a mutable post-commit assistance value.

No broader Back / Retry / Redo semantics need to be invented to make this correction.

---

## 6. Missing runtime evidence

The following remains **MISSING INDEPENDENT RUNTIME EVIDENCE** rather than confirmed failure or confirmed success:

- successful `npm run build` of the reviewed implementation in a dependency-complete independent environment;
- live browser execution of the complete unassisted path;
- live browser execution of Hint 1 and Hint 2 paths;
- live browser execution of Show solution at each material state;
- browser confirmation of actual result-primary hierarchy, prediction locality, focus/scroll behavior, and responsive composition;
- live browser confirmation that no unexpected shell interaction bypasses the source-level state gates.

The absence of this evidence is not converted into a source-code defect by assumption. Conversely, source inspection is not represented as full runtime validation.

After the implementation fixes, Auditor re-validation should include an actual dependency-complete build/browser run and exercise the relevant supported/unsupported paths.

---

## 7. Deviations from frozen authority

Two undocumented implementation deviations are confirmed:

1. **SQL accepted-path deviation:** the verifier accepts an operation outside the frozen direct two-relation JOIN scope when its final pair output matches the canonical result.
2. **Protected-provenance deviation:** post-commit Show solution use can mutate the live structural-assistance classification and make it conflict with the assistance stored when the structural evidence was actually committed.

`implementation-record.md` states that no deviations were identified by the Implementer. That statement was appropriately framed as Implementer self-report; this independent audit supersedes it only as the post-build conformance finding, without modifying the implementation record.

No other frozen-authority deviation was established by the available evidence in this audit.

---

## 8. Nonblocking observation

### RC-O1 — Rejected SQL is rendered before encounter-contract validation

**Classification:** **NONBLOCKING OBSERVATION / ADVISORY IMPLEMENTATION NOTE**

In `src/main.js`, successful SQLite execution is rendered by `resultTable(resultSets)` before `cycle1.handleSqlSuccess()` applies the Cycle 1 SQL contract.

Therefore a syntactically valid but encounter-invalid query (for example a query rejected for a forbidden mechanism) can put its returned rows into the result surface before the encounter displays the rejection feedback. The learner cannot advance unless `validateSql()` passes, so this observation is not independently classified as a second accepted-path defect.

Because the frozen design treats SQL as verification of a particular proposed operation, the implementation fix for RC-01 should consider whether contract validation must occur before rejected results become learner-facing evidence. This note does not create a new requirement beyond preserving the already-frozen reveal/evidence contract.

---

## 9. Requirement-by-requirement audit summary

| Frozen requirement | Audit result |
|---|---|
| Independent Post-Build Review authorized | **CONFIRMED** |
| Durable implementation handoff present | **CONFIRMED** |
| Pre-build verdict = PASS → FROZEN IMPLEMENTATION AUTHORITY | **CONFIRMED** |
| `news_source → news_article` case | **CONFIRMED** |
| Requested/start Grain = one source per row | **CONFIRMED** |
| Natural raw Grain = source–article match | **CONFIRMED** |
| Structural prediction before current-data count | **CONFIRMED** |
| 18-article fact only after structural commitment | **CONFIRMED** |
| Protected prediction before SQL execution | **CONFIRMED** |
| Fan-out terminology after prediction | **CONFIRMED** |
| Fan-out Concept Moment does not pre-diagnose duplicates | **CONFIRMED** |
| SQL used as verification rather than discovery | **CONFIRMED for state order** |
| Authorized direct INNER JOIN returns correct current-data result | **CONFIRMED independently** |
| Accepted SQL path excludes out-of-scope mechanisms | **NONCONFORMING — RC-01** |
| Hint 1 / Hint 2 availability/order | **CONFIRMED from state logic** |
| Structural assistance provenance reflects actual path | **NONCONFORMING after commitment — RC-02** |
| Show solution remains available | **CONFIRMED** |
| Show solution does not auto-populate/execute/complete/bypass | **CONFIRMED from source state logic** |
| Actual result primary at final verification | **CONFIRMED from implementation structure; browser rendering not independently executed** |
| Committed prediction locally accessible at verification | **CONFIRMED from implementation structure** |
| Post-execution duplicate-vs-structural diagnosis | **CONFIRMED** |
| No aggregation / LEFT JOIN / EXISTS / multi-branch mechanism in accepted path | **NONCONFORMING enforcement — RC-01** |
| No new post-result Back / Retry / Redo semantics | **CONFIRMED** |
| Required reasoning evidence remains reviewable | **CONFIRMED from implementation structure** |
| Production build/browser path independently exercised | **MISSING RUNTIME EVIDENCE** |

---

## 10. Process consequence

The current Runtime / Conformance stream cannot issue a conformant/pass verdict.

Required route:

# **IMPLEMENTATION FIX**

The fixes are bounded to implementation conformance:

- correct accepted-SQL contract enforcement (RC-01);
- freeze/use the committed structural assistance provenance correctly (RC-02).

After those changes, the Conformance & Validation Auditor must revalidate the affected runtime/state/SQL paths. The revalidation should obtain an actual independent production build/browser run if a dependency-complete environment is available.

The two other independent post-build review streams remain separate. This audit does not decide Pedagogy or UX findings and does not perform Rule-Based Acceptance.

The deferred post-result Back / Retry / Redo question remains **OPEN / BACKLOG / OUT OF CURRENT IMPLEMENTATION SCOPE** and is not reopened by either defect.

---

## Final Runtime / Conformance verdict

# **REVISION REQUIRED — IMPLEMENTATION FIX**

Material findings:

- **RC-01:** the current SQL verifier can accept an out-of-scope multi-relation/window-function query as successful verification of the frozen direct-JOIN task.
- **RC-02:** protected structural assistance provenance can be mutated after structural commitment, creating conflicting classifications for the same evidence.

Independent evidence confirms the current case data and authorized direct-JOIN result contract, the required major state/reveal ordering in source, Show solution non-bypass behavior in source state logic, result-verification questioning, and absence of newly invented Back / Retry / Redo semantics.

Independent production build/browser execution remains missing evidence and must not be inferred from Implementer self-testing.
