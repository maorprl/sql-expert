# Cumulative INNER JOIN transfer checkpoint

**Date:** 2026-09-15  
**Status:** CURRENT CHECKPOINT DESIGN — NO RUNTIME CHANGE  
**Scope:** cumulative transfer of INNER JOIN reasoning already covered in Stages 1–3

## 1. Purpose

This checkpoint tests whether the learner can coordinate previously covered INNER JOIN reasoning in a materially new two-relation case with reduced cueing.

It is not a new-concept teaching encounter. It must not create difficulty by introducing LEFT JOIN, NULL, aggregation, bridge-table reasoning, fan-out repair, or another relational concept that has not yet been established.

It is not automatically a new numbered Stage.

The checkpoint exists because the current course has separately developed:

- row-preserving INNER JOIN reasoning;
- one-to-many row multiplication and repeated one-side context;
- zero-match row disappearance and the distinction between result-row count and entity coverage;
- learner-authored INNER JOIN SQL;
- result verification against prior relational reasoning.

The unresolved capability is whether the learner can decide which of those ideas matter in a new case and assemble them into one relational plan without the encounter naming the local phenomenon in advance.

---

## 2. Transfer capability to evidence

Given a new but structurally accessible two-relation business request solvable with already-covered INNER JOIN, the learner should be able to:

1. identify the relations that provide the requested information;
2. identify the direct relationship connecting them;
3. establish the requested output Grain;
4. interpret the relevant relationship Cardinality / matching possibilities;
5. predict the material row consequences before execution;
6. distinguish legitimate repeated one-side context from duplicate result rows when the finer-grain rows are distinct;
7. recognize that a one-side row with zero matches contributes no INNER JOIN result row;
8. select the already-known INNER JOIN operation because it fits the request rather than because the encounter announces it;
9. translate the relational plan into correct SQL;
10. choose an appropriate sanity-check target and reconcile the actual result with the prior plan.

The checkpoint should provide evidence of coordinated transfer within the currently covered direct two-relation INNER JOIN domain.

It does **not** establish:

- full course-exit mastery;
- independent performance on an unfamiliar database in general;
- broad operation selection across relational operations not yet taught;
- transfer to multi-join, bridge, aggregation, outer-join, or repair problems.

---

## 3. Case-selection requirements

A suitable case must:

- use a relation pair not already central to Stage 1, Stage 2, or Stage 3;
- be understandable from current schema meaning without new domain instruction;
- use a direct relationship the learner can inspect;
- support a credible business request independent of the teaching objective;
- have a clear requested output Grain;
- naturally expose one or more already-covered INNER JOIN consequences;
- preferably require coordination of more than one previously covered consequence;
- avoid new SQL constructs or new relational mechanisms merely to make the case difficult;
- permit meaningful validation without requiring aggregation, DISTINCT, LEFT JOIN, NULL reasoning, bridge traversal, or an additional relation.

The case must also survive the Evidence Independence test: the business wording, visible counts, scaffolds, and prompts must not state the relational conclusion the learner is supposed to produce.

---

## 4. Current-schema case comparison

### Candidate A — `company → company_office`

**Structure**

- `company.company_id` is the parent PK.
- `company_office.company_id` is a `NOT NULL` FK.
- one office entry belongs to one company;
- a company can have zero, one, or multiple office entries.

**Current data**

- 12 companies;
- 14 `company_office` rows;
- CloudFence Labs has 3 recorded office entries;
- MedOrbit has 2;
- several companies have 1;
- Lumina Bio (`company_id = 20`) intentionally has no office entry.

**Transfer value**

This one relation pair naturally combines two already-covered consequences:

- one company can contribute multiple office-grain result rows, repeating company context across distinct office records;
- a company with zero office matches contributes no row to the matched INNER JOIN result.

The learner therefore has to coordinate the Stage 2 multiplication/repetition reasoning with the Stage 3 zero-match/coverage reasoning in one new case.

No new relational construct is needed.

**Verdict: SELECT.**

### Candidate B — `investor → round_investment`

This is a direct one-to-many relationship and can support multiplication reasoning. However, `round_investment` is already the central detail relation in Stage 2, so the transfer distance is smaller. The current investor data also does not provide the same natural zero-match company-coverage consequence. The case would primarily re-test row multiplication rather than coordinate the current INNER JOIN cluster.

**Verdict: REJECT for this checkpoint; technically usable but weaker cumulative transfer.**

### Candidate C — `company → company_founder`

The company-to-founder-assignment relation can multiply company context. However, `company_founder` is an associative relation with a composite key and a second FK to `person`. A business-natural founder report would usually want the person's name, which requires an additional relation and starts to introduce bridge / multi-relation reasoning beyond this checkpoint's target.

**Verdict: REJECT — avoid associative / additional-relation confound.**

### Candidate D — `company → company_acquisition`

The relation supports a one-to-zero-or-one pattern and can expose disappearance under INNER JOIN. The current seed contains only one acquisition row, so the case is extremely sparse and does not exercise row multiplication or repeated context.

**Verdict: REJECT — too narrow and does not coordinate the current capability cluster.**

### Candidate E — company/sector or article association relations

These use associative structures whose natural interpretation leads toward bridge / many-to-many reasoning. That is valuable later but not appropriate for a checkpoint intended to isolate already-covered direct INNER JOIN reasoning.

**Verdict: REJECT — new structural confound.**

### Previously used central pairs

Reusing `news_article ↔ news_source`, `funding_round ↔ round_investment`, or `company ↔ funding_round` would reduce transfer value because the learner has already reasoned directly through those relationship contexts.

**Verdict: REJECT for this checkpoint.**

---

## 5. Selected learner situation

Use:

`company → company_office`

Business situation:

> The operations team wants an inventory of the company offices recorded in the database. For every recorded office, show the company context together with the office information. They also want to know whether this office report can be treated as evidence that every company in the database is represented.

The wording intentionally does **not** state:

- that some companies have multiple offices;
- that any company has zero offices;
- that company information will repeat;
- that a company can disappear from an INNER JOIN result;
- the expected result count;
- the relation pair;
- the target Grain as a supplied conclusion;
- the operation to use.

The second business question asks about coverage; it does not require the learner to produce a company-complete report. Therefore the checkpoint can remain within INNER JOIN and does not need LEFT JOIN.

---

## 6. Intended relational plan

The learner must construct, rather than receive, the following plan.

### Relevant relations

- `company`
- `company_office`

### Direct relationship

`company_office.company_id` → `company.company_id`

### Requested output Grain

> one recorded company-office entry per result row

A row may include company-level context while still representing one office record.

### Relationship consequences

The learner should establish from the relationship structure that:

- each office entry belongs to one company;
- one company can have multiple office entries;
- a company can have zero office entries.

### Pre-execution row prediction

Before SQL, the learner should predict that:

- a company with several office records can occupy several result rows;
- company-level values can repeat across those rows while `office_id` and office attributes identify distinct office records;
- a company with no matching office record contributes no matched INNER JOIN row;
- therefore an office-grain INNER JOIN result can be correct as an office inventory while not necessarily representing every company.

### Operation

Use the already-known INNER JOIN to combine each recorded office with its matching company context.

This is not a new JOIN teaching moment.

---

## 7. Protected evidence and minimum scaffolding

The checkpoint deliberately reduces cueing compared with the teaching encounters.

### At entry

Provide:

- the business request;
- access to the current Live Schema;
- an empty Working Schema / equivalent current relation-selection surface.

Do not provide:

- preselected relations;
- the relation pair in explanatory text;
- a prebuilt relationship diagram;
- Cardinality labels;
- multiple-office counts;
- the no-office company;
- expected result count;
- the phrase `row multiplication` as the local task label;
- the phrase `zero-match company` as a local task label;
- the instruction `use INNER JOIN`.

### Relationship establishment

The learner identifies the relevant relations and the connecting field.

Current course-wide reveal rules remain in force: the connection must not be given away before the learner's connecting-field action. After the relationship is correctly established, reused PK/FK structure may be shown.

### Relational-plan commitment

Before SQL becomes the primary action, the learner must commit to the material plan components:

- requested row meaning / Grain;
- relationship interpretation relevant to the request;
- predicted multiplication/repetition possibility;
- predicted zero-match survival consequence;
- the known relational operation that implements the plan.

These may use constrained interactions; open-text explanation is not required merely to make the task harder.

The interactions must not be decomposed so finely that each prompt supplies the premise needed for the next answer. The design should require the learner to coordinate previously learned ideas, not merely answer a sequence of locally obvious micro-questions.

### No pre-execution instance shortcut

Do not expose before plan commitment:

- CloudFence's three office rows;
- MedOrbit's two office rows;
- Lumina Bio's absence from `company_office`;
- 14 as the expected INNER JOIN row count;
- 11 as the represented-company count.

Those are post-commitment result / validation evidence, not premises for the transfer claim.

---

## 8. SQL/result contract

A suitable logical output contract is:

`company_id | company_name | status | office_id | city | country_code | office_role`

Canonical semantic shape:

```sql
SELECT
    company.company_id,
    company.name AS company_name,
    company.status,
    company_office.office_id,
    company_office.city,
    company_office.country_code,
    company_office.office_role
FROM company
INNER JOIN company_office
    ON company.company_id = company_office.company_id;
```

Equivalent direct INNER JOIN formulations that produce the same logical result should be accepted.

Current-data result contract:

- 14 office-grain rows;
- every current `company_office` row represented exactly once;
- correct matching company context on each row;
- company 1 represented in three distinct office rows;
- company 2 represented in two distinct office rows;
- company 20 absent because it has no matching office row;
- 11 of the 12 companies represented in the office-grain result.

Row ordering is not part of correctness.

No aggregation, `DISTINCT`, LEFT JOIN, `EXISTS`, or repair mechanism is part of the checkpoint solution.

---

## 9. Post-execution validation evidence

A successful query run is not sufficient evidence of transfer.

The learner must reconcile the actual result with the earlier plan.

The checkpoint should require the learner to identify an appropriate sanity-check target rather than automatically announcing the conclusion.

The useful validation questions are:

1. **Row meaning / repetition:** when one `company_id` appears on multiple result rows, do the `office_id` / office attributes show distinct office records or accidental duplicates?
2. **Coverage:** are all base-relation companies represented among the result's company IDs?

The course may provide simple evidence surfaces after the learner chooses the relevant check. A prepared base listing such as:

```sql
SELECT company_id, name
FROM company;
```

is acceptable as a measurement aid because it introduces no new relational operation and merely exposes the base company set for comparison.

The learner should then be able to conclude from actual data that:

- repeated company context for companies with multiple offices is legitimate at office Grain;
- Lumina Bio (`company_id = 20`) exists in `company` but not in the INNER JOIN office result;
- the 14-row report is a correct recorded-office inventory but is not evidence that every company is represented.

Do not supply those conclusions before the learner performs the validation reasoning.

---

## 10. Assistance boundary

This checkpoint does not define Wave 5.

Current course controls remain available where already established, including SQL-local Desired Output, SQL Structure, and Show solution behavior.

No new global hint ladder, attempt-count escalation, adaptive assistance, automatic solution reveal, or support-reduction rule is established here.

Because this is a transfer checkpoint, any later implementation should preserve enough provenance to distinguish materially assisted performance from unassisted evidence where the current course already records such assistance. The exact future assistance policy remains open for Wave 5.

---

## 11. Evidence claim if the checkpoint is passed

A successful unassisted or appropriately qualified performance may support the bounded claim:

> The learner coordinated the currently covered direct INNER JOIN reasoning in a materially new two-relation case: relation selection, relationship interpretation, output Grain, one-to-many repetition, zero-match disappearance, INNER JOIN implementation, and result validation.

It must **not** be generalized to:

- mastery of all JOIN cases;
- mastery of an unfamiliar database;
- LEFT JOIN / NULL competence;
- aggregation / fan-out repair competence;
- bridge / many-to-many competence;
- independent multi-step analytical planning across the full course domain.

---

## 12. Implementation boundary

This document does not authorize runtime implementation.

Before implementation, the concrete learner interaction should be translated from this design while preserving:

- reduced cueing;
- the protected pre-SQL plan commitment;
- no early instance-data leakage;
- no new relational concept;
- current course-level control and topology semantics;
- semantic SQL acceptance rather than exact query-text matching;
- actual-result-based validation.

The runtime should not be used to silently decide unresolved assistance behavior.
