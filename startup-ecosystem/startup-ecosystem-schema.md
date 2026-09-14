# Startup Ecosystem — Course Relational Schema

**Status:** Simplified relational model  
**Target database:** SQLite  
**Domain:** startups, funding rounds, investors, sectors, tags, news, and addresses  
**Design goal:** Keep the model relationally explicit where the relationships matter, while avoiding normalization choices that add learner-facing joins or opaque identifiers without adding analytical value.

---

## 1. Design principles

This schema favors:

- explicit relations over JSON arrays;
- explicit bridge tables for many-to-many relationships;
- shared supertypes when they create meaningful reusable relationships;
- concrete entity relations that expose a human-readable identity when learners are expected to reason about those entities directly;
- recursive relations for real hierarchies;
- separate relations when their business meaning differs;
- preserving business meaning even when values are unknown.

It intentionally avoids:

- generic `entity_type + entity_id` polymorphic foreign keys;
- comma-separated tags, sectors, or investors;
- normalization that forces an identity-only join before a central entity can be understood;
- wide denormalized company records unrelated to the course's analytical needs;
- lookup tables for simple stable textual attributes such as company status, round type, currency code, geographic unit type, and address role;
- treating reported funding-round totals as necessarily equal to the sum of disclosed investor checks.

A relation used only as a role or bridge may legitimately contain mostly keys. A concrete entity relation such as `company`, `organization`, or `person` should not require an unrelated join merely to tell the learner which real-world entity a row represents.

---

## 2. Core party model

A **party** is an entity that can participate in ecosystem relationships.

For this course dataset, a party can have one concrete identity form:

- `company`
- `organization`
- `person`

Any party may additionally have the role:

- `investor`

```text
party
├── company
├── organization
└── person

party
└── investor
```

`company` is modeled as a concrete party relation rather than as a child of `organization`. This is a deliberate course-schema simplification: company-centered analysis is central to the course, so company rows carry their own human-readable identity and basic company attributes. `organization` remains available for non-company organizational parties such as venture funds and other institutional investors.

This still supports organizational investors, angel investors, startup companies, and companies that also invest. For example, a company party can also have an `investor` row, while a person party can also have an `investor` row.

---

## 3. High-level relationship map

```text
party 1 ── 0..1 company
party 1 ── 0..1 organization
party 1 ── 0..1 person
party 1 ── 0..1 investor

company >──< person
   via company_founder

company >──< sector
   via company_sector

investor >──< sector
   via investor_sector_focus

company ──< funding_round ──< round_investment >── investor

party >──< address
   via party_address

party >──< tag
   via party_tag

news_source ──< news_article

news_article >──< party
   via article_party

news_article >──< funding_round
   via article_funding_round

news_article >──< sector
   via article_sector

news_article >──< tag
   via article_tag

geo_unit ──< geo_unit
sector ──< sector
```

---

## 4. Relations and grains

### `party`

One row per ecosystem party identity.

### `company`

One row per company.

Important columns include:

- `company_id`
- `name`
- `website_url`
- `founded_date`
- `status`
- `description`

`company` is intentionally self-describing enough for company-centered learner encounters. Retrieving a company name does not require an extra identity-only join.

`status` is stored directly as text rather than through a separate two-column lookup table.

### `organization`

One row per non-company organizational party represented in the course dataset.

Columns include:

- `organization_id`
- `name`
- `website_url`
- `founded_date`

### `person`

One row per person.

### `company_founder`

One row per company-founder relationship.

Primary key:

```text
(company_id, person_id)
```

### `investor`

One row per party that has the investor role.

`investor` is intentionally a role relation rather than a duplicate identity table. The same party may be a company, organization, or person and also act as an investor.

### `investor_category`

One row per meaningful investor category.

Examples:

- angel
- venture capital
- corporate venture capital
- private equity
- accelerator

### `investor_category_membership`

One row per investor-category relationship.

This remains a bridge because one investor can belong to multiple categories.

### `sector`

One row per sector in a recursive hierarchy.

```text
Technology
└── Enterprise Software
    └── Cybersecurity
        └── Cloud Security
```

### `company_sector`

One row per company-sector assignment.

`is_primary` marks at most one primary sector per company.

### `investor_sector_focus`

One row per investor-sector focus relationship.

This remains distinct from `company_sector` because “operates in” and “invests in” are different business relationships.

### `funding_round`

One row per funding round.

Important columns include:

- `company_id`
- `round_type`
- `announced_date`
- `reported_total_amount`
- `currency_code`
- valuations

`round_type` and `currency_code` are stored directly rather than through separate lookup tables.

### `round_investment`

One row per investor participation in a funding round.

The intended grain is:

```text
one investor × one funding round
```

A disclosed investor check may be `NULL` even when the round total is known.

### `tag`

One row per reusable tag.

### `party_tag`

One row per party-tag relationship.

### `article_tag`

One row per article-tag relationship.

### `geo_unit`

One row per geographic unit in a recursive hierarchy.

Important columns:

- `unit_type`
- `name`
- `parent_geo_unit_id`
- `code`

`unit_type` is stored directly as text.

### `address`

One row per address.

### `party_address`

One row per party-address relationship over time.

Important columns:

- `party_id`
- `address_id`
- `address_role`
- `valid_from`
- `valid_to`
- `is_primary`

`address_role` is stored directly as text.

### `news_source`

One row per news publisher.

### `news_article`

One row per article.

Includes a simple `byline` text field instead of separate author relations because article-author modeling is not needed for the current course capabilities.

### `article_party`

One row per article-party relationship.

### `article_funding_round`

One row per article-funding-round relationship.

### `article_sector`

One row per article-sector relationship.

---

## 5. Why the two-column bridges remain

Relations such as:

```text
company_sector
investor_sector_focus
party_tag
article_tag
article_party
article_funding_round
article_sector
investor_category_membership
```

are intentionally retained.

They are not lookup-table overhead.

Each row represents a real business relationship between two entities, and these relations provide natural material for:

- many-to-many cardinality;
- bridge-table grain;
- join multiplicity;
- fanout;
- `EXISTS` / `NOT EXISTS`;
- aggregation across relationships.

---

## 6. Advanced SQL readiness

No special tables are required for advanced SQL.

### CTEs

Natural intermediate grains include:

```text
round investments
→ one row per funding round
→ one row per company
→ company-sector analytical result
```

### Recursive CTEs

Two genuine recursive structures exist:

```text
sector.parent_sector_id
geo_unit.parent_geo_unit_id
```

### Window functions

Funding rounds provide natural ordered partitions for:

- `ROW_NUMBER`
- `RANK`
- `LAG`
- `LEAD`
- running totals
- partition-level averages

The schema therefore supports advanced SQL without artificial exercise tables.

---

## 7. Fanout opportunities

A company can simultaneously have:

- several funding rounds;
- several sectors;
- several founders;
- several addresses;
- several news articles.

For example:

```text
company
├── funding_round
├── company_sector
├── company_founder
└── article_party
```

Joining several independent branches can multiply rows while remaining syntactically valid.

---

## 8. Relations

```text
party
company
organization
person
company_founder

investor
investor_category
investor_category_membership

sector
company_sector
investor_sector_focus

funding_round
round_investment

tag
party_tag
article_tag

geo_unit
address
party_address

news_source
news_article
article_party
article_funding_round
article_sector
```

Total: **24 relations**

---

## 9. Simplification decisions

The following relations were intentionally removed during the earlier simplification:

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

Reasons:

- the first five were lookup-table over-normalization for simple stable text values;
- `funding_round_tag` added little analytical capability beyond the other tag bridges;
- separate article-author modeling added schema noise without serving the current knowledge map.

A later learner-facing review exposed a different kind of normalization cost: company identity lived only in `organization`, so even a basic company-centered encounter either showed opaque IDs or required an unrelated `company → organization` join. The current model corrects that by making `company` a concrete self-describing party relation while preserving the shared `party` role model.

---

## 10. Boundary

This schema does not define:

- stages;
- lesson order;
- pedagogical scaffolding;
- hints;
- expected answers;
- learner progress.

It is infrastructure for course design, but it is not pedagogically indifferent: its structure should support the intended reasoning without introducing unrelated complexity solely to retrieve basic entity identity.
