# Startup Ecosystem Schema — Knowledge & Advanced SQL Readiness Audit

**Status:** PASS with dataset requirements  
**Audited against:** `course-knowledge-map.md`  
**Schema:** `startup-ecosystem-schema.md` / `startup-ecosystem-schema.sql`

---

## 1. Audit question

Does the normalized startup-ecosystem schema provide natural relational structures for the knowledge map, including later analytical SQL such as:

- subqueries;
- CTEs;
- recursive CTEs;
- self joins;
- pre-aggregation;
- `EXISTS` / `NOT EXISTS`;
- window functions;
- multi-step analytical queries?

The answer is **yes**.

No additional table is required merely to make CTEs or window functions possible.

The main future requirement is to construct a dataset that actually instantiates the necessary relational situations.

---

## 2. Knowledge-map coverage

| Knowledge area | Schema evidence | Status |
|---|---|---|
| Relation / row / attribute | 32 explicit relations with distinct grains | SUPPORTED |
| Grain | company, funding round, investment participation, bridge-table grains | SUPPORTED |
| Keys / uniqueness | PKs, shared PK/FKs, composite bridge keys, unique constraints | SUPPORTED |
| 1:1 / 1:0..1 | `party → organization/person/investor`, `organization → company` subtype structures | SUPPORTED |
| 1:M | company → funding rounds; source → articles; parent → child geography | SUPPORTED |
| M:N | company-sector, round-investor, company-founder, article-party, tags | SUPPORTED |
| Selection / filtering | statuses, dates, amounts, categories, sectors, flags, geography | SUPPORTED |
| Projection | all relations provide identifying and descriptive attributes | SUPPORTED |
| Cartesian-product reasoning | multiple independent child branches exist naturally | SUPPORTED |
| INNER JOIN | pervasive explicit FK relationships | SUPPORTED |
| LEFT JOIN | optional rounds, addresses, news links, parent sectors, disclosed amounts | SUPPORTED* |
| Join fanout | company → rounds plus company → sectors/founders/news | STRONGLY SUPPORTED |
| Aggregation | amounts, counts, dates, categories and bridge relations | SUPPORTED |
| GROUP BY / HAVING | company, investor, sector, source, year and round-level groups | SUPPORTED |
| Pre-aggregation | round investments → round → company is a natural multi-grain path | STRONGLY SUPPORTED |
| NULL semantics | optional amount, valuations, geography, dates, parent links | SUPPORTED* |
| EXISTS / NOT EXISTS | presence/absence of rounds, news, sectors, lead investments, addresses | SUPPORTED* |
| Bridge-table reasoning | several meaningful bridges with different business semantics | STRONGLY SUPPORTED |
| Subqueries | natural threshold, membership, comparison and aggregate-to-detail questions | SUPPORTED |
| Self join | sector and geographic parent-child hierarchies | SUPPORTED |
| Set reasoning | compatible party/organization/person and ecosystem result sets can be combined | SUPPORTED |
| Window functions | repeated dated funding rounds and dated news by company/investor/sector | STRONGLY SUPPORTED* |

`*` The schema permits the situation, but the seed dataset must contain suitable rows.

---

## 3. Advanced SQL readiness

### 3.1 Non-recursive CTEs

No schema change is needed.

Natural query families include:

```text
round totals
    ↓
company funding totals
    ↓
company ranking within sector
```

and:

```text
investor participation counts
    ↓
investor-level metrics
    ↓
filter or rank investors
```

A CTE can therefore represent an intermediate relation with an explicit grain rather than merely acting as syntax decoration.

---

### 3.2 Multi-CTE analytical pipelines

The schema supports meaningful chains such as:

```text
CTE 1: one row per funding round
CTE 2: one row per company
CTE 3: one row per company-sector
final: compare company metrics inside each sector
```

This is useful because each CTE can have a different, inspectable grain.

---

### 3.3 Recursive CTEs

The schema has two genuine recursive structures:

```text
sector.parent_sector_id
geo_unit.parent_geo_unit_id
```

They support questions such as:

- return all descendant sectors of Cybersecurity;
- build the full ancestor path of a sub-sector;
- return all geographic descendants of a country or region;
- calculate hierarchy depth.

Recursive CTEs therefore arise from the domain model itself rather than from an artificial exercise table.

---

### 3.4 Ranking windows

`funding_round` provides natural partitions and ordering.

Examples:

```sql
ROW_NUMBER() OVER (
  PARTITION BY company_id
  ORDER BY announced_date, funding_round_id
)
```

and:

```sql
RANK() OVER (
  PARTITION BY sector_id
  ORDER BY company_total_funding DESC
)
```

The first preserves one row per funding round.

The second can operate over a company-sector analytical relation produced earlier by aggregation or a CTE.

---

### 3.5 `LAG` / `LEAD`

A company can have several funding rounds over time.

Natural comparisons include:

- current round versus previous round;
- days between successive rounds;
- change in reported round size;
- change in valuation.

Example shape:

```sql
LAG(reported_total_amount) OVER (
  PARTITION BY company_id
  ORDER BY announced_date, funding_round_id
)
```

This requires no new schema object.

---

### 3.6 Running totals

Natural use case:

```sql
SUM(reported_total_amount) OVER (
  PARTITION BY company_id
  ORDER BY announced_date, funding_round_id
  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
)
```

This creates cumulative reported funding while preserving funding-round grain.

That makes the difference between:

- `GROUP BY` collapsing rows; and
- a window aggregate preserving rows

visible in a real business context.

---

### 3.7 Partition-level comparisons

The model supports:

- company versus sector average;
- investor versus investor-category average;
- article frequency by publisher over time;
- round amount versus company average round amount.

These are useful later for:

- `AVG() OVER (...)`;
- `COUNT() OVER (...)`;
- percent-of-total calculations;
- ranking and bucketing.

---

## 4. Fanout and advanced-query composition

The schema is particularly strong here.

Example:

```text
company
├── funding_round
│   └── round_investment
├── company_sector
├── company_founder
├── party_address
└── article_party
```

Each branch can contain multiple rows.

A query that combines several of them can multiply rows dramatically while still being syntactically valid.

That gives the course a natural path from:

```text
join
→ cardinality
→ fanout
→ wrong aggregate
→ controlled grain
→ pre-aggregation
→ CTE composition
→ window calculation
```

The schema therefore remains useful after the learner has moved beyond basic joins.

---

## 5. Dataset requirements

The schema alone is not enough.

The future seed dataset should deliberately include all of the following.

### Cardinality cases

- company with zero funding rounds;
- company with exactly one funding round;
- company with several funding rounds;
- round with one investor;
- round with several investors;
- company with one sector;
- company with several sectors;
- investor active in several sectors.

### Fanout cases

At least one company should have simultaneously:

- 3+ funding rounds;
- 2+ sectors;
- 2+ founders;
- several news articles.

This creates real independent branches whose joins multiply rows.

### NULL / optional relationship cases

Include:

- undisclosed investor check amounts;
- company without known address;
- company without news;
- sector without parent;
- article not linked to a funding round;
- funding round without reported valuation.

### Existence / non-existence cases

Include:

- company with no funding;
- investor that has never led a round;
- investor with no sector focus;
- company with no article coverage;
- company without tags.

### Window-function cases

Include:

- several companies with 3+ rounds each;
- deterministic dates for ordering;
- some equal round amounts to create ranking ties;
- different round sizes within the same company;
- companies in the same sector with different total funding;
- enough observations per partition for `LAG`, running totals and ranking to be meaningful.

### Recursive CTE cases

Create at least 3–4 levels in both:

- sector hierarchy;
- geographic hierarchy.

For example:

```text
Technology
└── Enterprise Software
    └── Cybersecurity
        └── Cloud Security
```

and:

```text
Israel
└── Tel Aviv District
    └── Tel Aviv-Yafo
```

### Repeated values without duplicate entities

Include legitimate repeated descriptive values, for example:

- two people with the same last name;
- organizations with similar or repeated display names where allowed;
- multiple addresses in the same city;
- several rounds with the same round type.

This supports the distinction between duplicate values and duplicate rows/entities.

---

## 6. Schema corrections made during this audit

Two small corrections were made.

### 6.1 Subtype cardinality notation

The high-level map previously rendered:

```text
organization ──< company
party ──< investor
```

which visually suggested one-to-many.

The actual relational structure is shared-primary-key subtype modeling:

```text
organization 1 ── 0..1 company
party 1 ── 0..1 investor
```

The documentation was corrected.

### 6.2 Primary company sector

`company_sector.is_primary` implies that a company should not have multiple simultaneously primary sectors.

The SQLite schema now enforces at most one with a partial unique index:

```sql
CREATE UNIQUE INDEX uq_company_primary_sector
    ON company_sector(company_id)
    WHERE is_primary = 1;
```

---

## 7. What should NOT be added just for advanced SQL

Do not add artificial tables solely to create exercises for:

- CTEs;
- window functions;
- subqueries;
- self joins.

The current business model already provides genuine use cases.

In particular, there is no need for:

- a synthetic `rankings` table;
- a precomputed `company_totals` table;
- a `previous_round_id` column;
- a stored `round_number` merely to support `ROW_NUMBER`;
- a denormalized company-sector-investor table;
- duplicated hierarchy-path columns.

Those would reduce the amount of relational reasoning available to the learner.

---

## 8. Audit conclusion

**Schema verdict: PASS.**

The current normalized model can support the full current knowledge map and remains viable for later advanced SQL.

The schema has especially strong support for:

- grain transitions;
- independent one-to-many branches;
- fanout;
- bridge tables;
- pre-aggregation;
- existence logic;
- hierarchical recursion;
- time-ordered analytical windows.

The next dependency is **dataset design**, not another schema expansion.

The dataset should be engineered to instantiate the edge cases and cardinalities listed in Section 5 while remaining plausible as a startup-investment ecosystem.
