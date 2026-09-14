# Startup Ecosystem Schema — Knowledge, SQL Readiness & Learner-Facing Fitness Audit

**Status:** PASS AFTER CORRECTION  
**Audited against:** `course-knowledge-map.md`, `pedagogical-foundations.md`, and the current company → funding_round learner case  
**Schema size:** 24 relations

---

## 1. Audit conclusion

The 24-relation schema still supports the full current knowledge map and later advanced SQL, but the earlier audit was incomplete in one important respect: it checked capability coverage and SQL readiness, not whether a central learner-facing entity could be understood without an unrelated identity-only join.

The company-centered case exposed that defect. In the previous model, `company` contained `company_id`, `status`, and `description`, while the company name lived only in `organization`. A learner working directly with `company → funding_round` therefore faced an artificial choice:

- reason from opaque company IDs; or
- introduce `organization` and an additional 1:1 join that was not part of the intended learning objective.

That structure conflicted with the schema's own goal of avoiding cognitive noise and with the pedagogical rule that infrastructure should not dictate or contaminate the reasoning sequence.

The correction makes `company` a concrete party relation with its own `name`, `website_url`, and `founded_date`, while retaining `organization` for non-company organizational parties and retaining `party` as the shared relationship anchor. No duplicate company identity fields are stored across `company` and `organization`.

---

## 2. Learner-facing fitness criterion

For a concrete entity relation that learners are expected to reason about directly, the relation should expose enough descriptive identity to make its rows intelligible without requiring a join whose only purpose is to discover what entity an ID represents.

This does not mean every relation must be self-contained. Role and bridge relations such as `investor`, `company_sector`, or `article_party` may legitimately be key-heavy because the relationship itself is their business meaning.

Applied to the current schema:

- `company` — concrete entity, now directly human-readable: PASS;
- `organization` — concrete entity, directly human-readable: PASS;
- `person` — concrete entity, directly human-readable: PASS;
- `investor` — role relation over `party`, intentionally not a duplicate identity store: PASS;
- bridge relations — relationship records, not expected to carry duplicated entity labels: PASS.

---

## 3. Knowledge-map coverage

| Knowledge area | Schema evidence | Status |
|---|---|---|
| Relation / row / attribute | 24 explicit relations with distinct grains | SUPPORTED |
| Grain | company, funding round, investment participation, bridge-table grains | SUPPORTED |
| Keys / uniqueness | PKs, shared PK/FKs, composite bridge keys, unique constraints | SUPPORTED |
| 1:1 / 1:0..1 | `party → company/organization/person/investor` | SUPPORTED |
| 1:M | company → funding rounds; source → articles; hierarchy parent → child | SUPPORTED |
| M:N | company-sector, round-investor, company-founder, article-party, tags | STRONGLY SUPPORTED |
| Selection / filtering | status, dates, amounts, round types, sectors, geography | SUPPORTED |
| Projection | concrete entity relations expose identifying and descriptive attributes | SUPPORTED |
| Cartesian-product reasoning | independent child branches remain | SUPPORTED |
| INNER JOIN | pervasive explicit FK relationships | SUPPORTED |
| LEFT JOIN | optional rounds, addresses, article links, parent sectors, disclosed amounts | SUPPORTED |
| Join fanout | company → rounds plus sectors/founders/news | STRONGLY SUPPORTED |
| Aggregation | amounts, counts, dates, sectors, investor participation | SUPPORTED |
| GROUP BY / HAVING | company, investor, sector, source, year, round groups | SUPPORTED |
| Pre-aggregation | investments → round → company | STRONGLY SUPPORTED |
| NULL semantics | optional check amounts, valuations, geography, dates | SUPPORTED |
| EXISTS / NOT EXISTS | missing rounds/news/tags/sector focus/lead investments | SUPPORTED |
| Bridge-table reasoning | multiple meaningful bridges remain | STRONGLY SUPPORTED |
| Subqueries | threshold, membership, comparison and aggregate-to-detail questions | SUPPORTED |
| Self join | sector and geographic hierarchies | SUPPORTED |
| Set reasoning | compatible ecosystem result sets can be combined | SUPPORTED |
| Window functions | repeated dated funding rounds and news | STRONGLY SUPPORTED |

---

## 4. Advanced SQL readiness

### Non-recursive CTEs

Still naturally supported:

```text
CTE 1: one row per funding round
CTE 2: one row per company
CTE 3: company-sector analytical relation
```

### Recursive CTEs

Still supported by:

```text
sector.parent_sector_id
geo_unit.parent_geo_unit_id
```

### Window functions

Still supported by repeated dated funding rounds for:

- `ROW_NUMBER`
- `RANK`
- `LAG`
- `LEAD`
- running totals
- partition-level aggregates

The company-identity correction removes an unnecessary subtype join without removing any advanced-SQL opportunity.

---

## 5. Bridge and role review

The remaining small relations are intentional where each row represents a real role or relationship rather than normalization overhead.

Examples:

```text
investor(investor_id)
company_sector(company_id, sector_id, ...)
investor_sector_focus(investor_id, sector_id)
party_tag(party_id, tag_id)
article_tag(news_article_id, tag_id)
article_party(news_article_id, party_id)
article_funding_round(news_article_id, funding_round_id)
article_sector(news_article_id, sector_id)
investor_category_membership(investor_id, investor_category_id)
```

These remain useful for role overlap, cardinality, bridge-table grain, join multiplicity, fanout, existence reasoning, and aggregation.

---

## 6. Dataset requirements

The seed data continues to provide:

- 0 / 1 / M funding-round cases;
- a named company with zero funding rounds (`Lumina Bio`);
- multiple independent fanout branches;
- NULL investor check amounts;
- missing addresses/news/tags;
- investors without sector focus;
- repeated round amounts and ranking ties;
- several companies with 3+ funding rounds;
- sector and geographic hierarchies with depth 4;
- a company that also acts as an investor;
- people who also act as investors.

---

## 7. Final verdict

**PASS AFTER CORRECTION.**

The corrected model is a better fit for the course because it now satisfies both dimensions that matter:

- it preserves the relational structures required by the knowledge map and later SQL work;
- it does not force an unrelated identity-only join merely to understand a central company row.

The earlier PASS should not be interpreted as evidence that learner-facing schema fitness had already been checked; that dimension was missing from the earlier audit and was exposed by the current learner case.
