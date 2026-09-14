# Startup Ecosystem Schema — Coursewide Learner-Fitness Revision Review

**Status:** REVISED + MECHANICALLY VALIDATED  
**Date:** 2026-09-14  
**Scope:** Every schema area outside the protected Stage 1–3 learner contracts  
**Basis:** `course-exit-criteria.md`, `course-knowledge-map.md`, `pedagogical-foundations.md`, current Stage 1–3 relation contracts, and executable SQLite validation

## 1. Why the previous review was insufficient

The earlier schema audit answered a narrower question: whether the schema could support the knowledge map and advanced SQL.

That was not enough.

The Stage 3 company case exposed a separate requirement: the data model itself must not force the learner through unrelated identity plumbing simply to understand the entity being analyzed.

A schema can be normalized, executable, and capability-rich while still being a poor teaching substrate.

This revision therefore applied a second criterion across the non-protected schema:

> Does each relation or relationship add business/analytical meaning that justifies the cognitive structure it introduces?

## 2. Protected boundary

The following learner-facing contracts were not redesigned:

| Relation | Existing stage dependency preserved |
|---|---|
| `news_source` | Stage 1 source relation |
| `news_article` | Stage 1 base relation and 18-row instance |
| `funding_round` | Stage 2/3 funding-round relation and 26-row instance |
| `round_investment` | Stage 2 participation relation and 72-row instance |
| `company` | Stage 3 company fields, IDs, names, status and 12-row instance |

The only surrounding cleanup affecting a protected relation definition is removal of the old `company.company_id → party.party_id` supertype FK. That relationship was not used by Stage 3. The Stage 3 relationship `funding_round.company_id → company.company_id` is unchanged.

## 3. Relation-by-relation disposition

| Previous relation | Disposition | Reason |
|---|---|---|
| `party` | REMOVE | Identity-only supertype added cognitive indirection without required course value. |
| `organization` | REMOVE | Company identity already belongs directly in `company`; standalone investors now carry their own identity. |
| `person` | KEEP | Concrete, directly understandable entity used by founder relationships. |
| `company` | PROTECTED | Existing Stage 3 contract. |
| `company_founder` | KEEP | Real M:N relationship with meaningful relationship attributes. |
| `investor` | REDESIGN | Changed from key-only role to directly readable entity with name/type. |
| `investor_category` | REMOVE | Lookup/taxonomy overhead not needed for required capabilities. |
| `investor_category_membership` | REMOVE | Removed with category taxonomy; other meaningful M:N bridges already cover the capability. |
| `sector` | KEEP | Directly readable recursive hierarchy; useful for hierarchy/self-join/recursive CTE. |
| `company_sector` | KEEP | Meaningful company–sector bridge and fanout branch. |
| `investor_sector_focus` | KEEP | Meaningful investor–sector bridge. |
| `funding_round` | PROTECTED | Existing Stage 2/3 contract. |
| `round_investment` | PROTECTED | Existing Stage 2 contract. |
| `tag` | REMOVE | Generic tag subsystem duplicated relationship-learning opportunities without distinct required value. |
| `party_tag` | REMOVE | Depended on removed generic party/tag abstractions. |
| `geo_unit` | REMOVE | Second recursive hierarchy was not required; added location indirection. |
| `address` | REMOVE | Address identity was not itself a target analytical entity. |
| `party_address` | REPLACE | Replaced by direct, meaningful `company_office` grain. |
| `news_source` | PROTECTED | Existing Stage 1 contract. |
| `news_article` | PROTECTED | Existing Stage 1 contract. |
| `article_tag` | REMOVE | Generic tags not needed. |
| `article_party` | REPLACE | Replaced by explicit `article_company`. |
| `article_funding_round` | KEEP | Direct and meaningful article–round relationship. |
| `article_sector` | KEEP | Direct and meaningful article–sector relationship. |

New relations:

| New relation | Purpose |
|---|---|
| `company_office` | One row per company office period; direct location and temporal reasoning without address plumbing. |
| `company_acquisition` | Natural 1:0..1 optional relationship for preservation/missing-row reasoning. |
| `article_company` | Explicit article–company bridge replacing generic party indirection. |

Final relation count: **16**.

## 4. Learner-facing fitness checks

### Concrete entity readability

Direct human-readable identity is available in:

- `company.name`
- `investor.name`
- `person.first_name` + `person.last_name`
- `sector.name`
- `news_source.name`
- `news_article.title`

No concrete entity requires a join whose sole purpose is to discover what its ID represents.

### Bridge legitimacy

Every retained bridge has a row meaning that can be stated directly:

- `company_founder`: one company–founder relationship;
- `company_sector`: one company–sector assignment;
- `investor_sector_focus`: one investor–sector focus;
- `article_company`: one article–company relationship;
- `article_funding_round`: one article–funding-round relationship;
- `article_sector`: one article–sector relationship.

### Optional relationship legitimacy

`company_acquisition` gives a natural optional 1:0..1 case. It is not a generic “profile” relation created only to satisfy a cardinality checklist.

### Hierarchy legitimacy

Only `sector` remains recursive. A second geography hierarchy was removed because it was not needed to cover a distinct required capability.

## 5. Executable validation performed

The revised schema and seed were executed together in SQLite with foreign keys enabled.

Observed checks:

| Check | Result |
|---|---:|
| Relations created | 16 |
| `PRAGMA foreign_key_check` | 0 violations |
| `company` rows | 12 |
| `funding_round` rows | 26 |
| `round_investment` rows | 72 |
| `news_article` rows | 18 |
| `news_source` rows | 4 |
| Stage 1 article/source INNER JOIN | 18 rows |
| Stage 2 round/participation INNER JOIN | 72 rows |
| Stage 3 company/round INNER JOIN | 26 rows |
| Stage 3 unmatched company | `Lumina Bio` (`company_id 20`) |
| company 1 founder × sector fanout example | 6 rows |
| recursive sector hierarchy max depth from Technology | 3 |
| companies with no office | `Lumina Bio` |
| companies without acquisition row | 11 of 12 |

A funding-round window-function smoke test also produced the expected ordered sequence for company 1: four rows numbered 1–4 by `announced_date`.

## 6. Knowledge-map coverage after revision

| Knowledge area | Revised schema support |
|---|---|
| Grain | Distinct company, round, participation, founder-relationship, office, article and bridge grains |
| Keys / uniqueness | PKs, composite bridge keys, unique primary-sector rule |
| 1:M | company → funding rounds; company → offices; source → articles |
| 1:0..1 | company → acquisition |
| M:N | company–founder, company–sector, investor–sector, article bridges |
| INNER JOIN | Multiple direct FK relationships |
| LEFT JOIN | acquisition, office, article links, sector parent |
| Row multiplication / fanout | company → founders + sectors + rounds |
| Aggregation / pre-aggregation | round investments → round → company |
| NULL semantics | investor checks, valuations, optional joined rows |
| EXISTS / NOT EXISTS | companies without rounds/offices/acquisition; investors without sector focus |
| Self join / recursive CTE | `sector.parent_sector_id` |
| Window functions | repeated dated funding rounds by company |
| Subqueries / set reasoning | naturally supported by entity and bridge relations |

## 7. What this review does not claim

This is not a runtime acceptance of every future learner encounter.

It establishes only that:

- the non-protected schema received a relation-by-relation structural revision;
- the resulting schema/seed execute successfully;
- the protected Stage 1–3 data contracts still produce their required result counts and zero-match case;
- the revised relations provide identifiable, meaningful grains without the previously identified identity-only detours.

Future encounter designs still require their own case validation and learner-experience review.
