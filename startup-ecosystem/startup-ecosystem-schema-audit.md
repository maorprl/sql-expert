# Startup Ecosystem Schema — Knowledge & Advanced SQL Readiness Audit

**Status:** PASS
**Audited against:** `course-knowledge-map.md`  
**Schema size after simplification:** 24 relations

---

## 1. Audit conclusion

The simplified 24-relation schema still supports the full current knowledge map and later advanced SQL.

No required capability was lost by removing the eight relations:

```text
company_status
currency
funding_round_type
geo_unit_type
address_role
funding_round_tag
news_author
news_article_author
```

The simplification removes lookup-table and peripheral-modeling noise while preserving the meaningful relational structure.

---

## 2. Knowledge-map coverage

| Knowledge area | Schema evidence | Status |
|---|---|---|
| Relation / row / attribute | 24 explicit relations with distinct grains | SUPPORTED |
| Grain | company, funding round, investment participation, bridge-table grains | SUPPORTED |
| Keys / uniqueness | PKs, shared PK/FKs, composite bridge keys, unique constraints | SUPPORTED |
| 1:1 / 1:0..1 | `party → organization/person/investor`, `organization → company` | SUPPORTED |
| 1:M | company → funding rounds; source → articles; hierarchy parent → child | SUPPORTED |
| M:N | company-sector, round-investor, company-founder, article-party, tags | STRONGLY SUPPORTED |
| Selection / filtering | status, dates, amounts, round types, sectors, geography | SUPPORTED |
| Projection | relations expose identifying and descriptive attributes | SUPPORTED |
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

## 3. Advanced SQL readiness

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

No schema object removed in the simplification was needed for any of these.

---

## 4. Bridge-table review

The remaining small two-column relations are intentional.

Examples:

```text
company_sector(company_id, sector_id, ...)
investor_sector_focus(investor_id, sector_id)
party_tag(party_id, tag_id)
article_tag(news_article_id, tag_id)
article_party(news_article_id, party_id)
article_funding_round(news_article_id, funding_round_id)
article_sector(news_article_id, sector_id)
investor_category_membership(investor_id, investor_category_id)
```

These represent real M:N relationships rather than normalization overhead.

Removing them would weaken the relational model and reduce useful cardinality/fanout cases.

---

## 5. Dataset requirements

The existing seed data continues to provide:

- 0 / 1 / M funding-round cases;
- multiple independent fanout branches;
- NULL investor check amounts;
- missing addresses/news/tags;
- investors without sector focus;
- repeated round amounts and ranking ties;
- several companies with 3+ funding rounds;
- sector and geographic hierarchies with depth 4.

The dataset remains suitable for future CTE and window-function work.

---

## 6. Final verdict

**PASS.**

The 24-relation model is a better fit for the course than the original 32-relation version:

- less schema noise;
- fewer lookup-only joins;
- unchanged coverage of the knowledge map;
- unchanged advanced-SQL readiness;
- all meaningful M:N bridges retained.
