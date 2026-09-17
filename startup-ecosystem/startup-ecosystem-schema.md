# Startup Ecosystem — Course-Focused Relational Schema

**Status:** COURSEWIDE REVISION — 2026-09-14  
**Target database:** SQLite  
**Domain:** startups, funding rounds, investors, sectors, company locations, acquisitions, and news  
**Current size:** 16 relations

Authority note: executable structural facts are defined by `startup-ecosystem-schema.sql`; current row/value facts are defined by `startup-ecosystem-seed.sql`. This Markdown document records human-readable schema intent, relation grains, and design rationale under `source-of-truth-hierarchy.md`.

## 1. Revision boundary

This revision treats the schema as course infrastructure rather than as a normalization exercise.

The learner-facing contracts used by the accepted Lessons 1–2 are protected. The `company → funding_round` structure used by the preserved Stage 3 candidate is retained for compatibility, but that retention does not make Lesson 3 current authority:

- `news_source` and `news_article` — Lesson 1;
- `funding_round` and `round_investment` — Lesson 2;
- `company` and `funding_round` — preserved Stage 3 candidate compatibility.

For these relations, relation names, learner-used columns, accepted Lesson 1–2 row meanings/data, and preserved Stage 3 candidate compatibility are retained.

The surrounding schema was reconsidered from first principles. An unrelated supertype or supporting structure is not retained merely because it is normalized or realistic.

## 2. Design rules

The revised schema follows these rules:

1. **Concrete entities should be directly intelligible.**  
   A learner should not need an identity-only join merely to discover what a row represents. `company`, `investor`, `person`, and `news_source` therefore expose human-readable identity directly.

2. **Relations should exist because their rows have useful business meaning.**  
   Bridge relations remain when one row represents a real relationship such as company–sector, founder–company, investor–sector, article–company, or article–funding-round.

3. **Do not create lookup joins for simple stable categories.**  
   Values such as company status, investor type, round type, currency code, office role, and country code remain direct attributes.

4. **Do not retain generic identity infrastructure when it contaminates ordinary analytical tasks.**  
   The previous `party → organization/person/company/investor` supertype structure made simple company and investor work depend on identity plumbing. It has been removed from the active course schema.

5. **A learning opportunity is useful only if the surrounding data model stays interpretable.**  
   The schema still contains one-to-many, optional, many-to-many, hierarchy, temporal, NULL, fanout, aggregation, existence, and window-function opportunities without requiring unrelated detours.

## 3. High-level relationship map

```text
company ──< funding_round ──< round_investment >── investor
   │
   ├──< company_founder >── person
   ├──< company_sector >── sector ──< sector
   ├──< company_office
   └── 0..1 company_acquisition

investor >──< sector
   via investor_sector_focus

news_source ──< news_article
                    ├──< article_company >── company
                    ├──< article_funding_round >── funding_round
                    └──< article_sector >── sector
```

## 4. Relations and grains

### `company`

**Retained course-infrastructure contract.**  
One row per company.

Important columns:

- `company_id`
- `name`
- `website_url`
- `founded_date`
- `status`
- `description`

The company name is directly available in the relation. No identity-only join is needed to understand which company a row represents. The relation also preserves compatibility with the Stage 3 candidate without granting that candidate current Lesson authority.

### `person`

One row per person.

### `company_founder`

One row per company–founder relationship.

Primary key:

```text
(company_id, person_id)
```

The relationship may carry role and date attributes because those belong to the founder relationship rather than to either entity alone.

### `investor`

One row per investor.

Important columns:

- `investor_id`
- `name`
- `investor_type`
- `website_url`
- `country_code`

The earlier key-only investor role has been replaced by a directly readable investor entity so future investor analysis does not require polymorphic identity resolution.

### `sector`

One row per sector in a recursive hierarchy.

Example:

```text
Technology
└── Enterprise Software
    └── Cybersecurity
        └── Cloud Security
```

This single hierarchy is sufficient for self-join and recursive-CTE work; a second geography hierarchy is not required merely for feature coverage.

### `company_sector`

One row per company–sector assignment.

`is_primary` marks at most one primary sector per company.

### `investor_sector_focus`

One row per investor–sector focus relationship.

### `funding_round`

**Lesson 2 contract with preserved Stage 3 candidate compatibility.**  
One row per funding round.

### `round_investment`

**Lesson 2 contract.**  
One row per investor participation in a funding round.

Intended grain:

```text
one investor × one funding round
```

### `company_office`

One row per company office period.

Important columns:

- `company_id`
- `city`
- `country_code`
- `office_role`
- `opened_date`
- `closed_date`
- `is_primary`

This replaces the earlier `geo_unit → address → party_address` chain for ordinary company-location analysis. The learner can reason about a company office directly without traversing identity and address plumbing.

### `company_acquisition`

Zero or one row per company acquisition in the simplified course model.

This provides a natural optional relationship for 1:0..1 reasoning, LEFT JOIN behavior, existence checks, and NULL interpretation without adding an artificial profile table.

### `news_source`

**Lesson 1 contract.**  
One row per news publisher.

### `news_article`

**Lesson 1 contract.**  
One row per news article.

### `article_company`

One row per article–company relationship.

This replaces the generic `article_party` bridge. The relation now states the business relationship directly.

### `article_funding_round`

One row per article–funding-round relationship.

### `article_sector`

One row per article–sector relationship.

## 5. What was removed or replaced

The following previous structures are no longer part of the active course schema:

```text
party
organization
investor_category
investor_category_membership
tag
party_tag
article_tag
geo_unit
address
party_address
article_party
```

Reasons:

- `party` / `organization`: identity infrastructure made ordinary entity work depend on unrelated joins;
- investor-category bridge: unnecessary M:N taxonomy for the current capability space; `investor_type` is sufficient;
- generic tag subsystem: redundant with more meaningful company/sector/news relationships;
- `geo_unit` / `address` / `party_address`: too much indirection for the analytical value supplied; replaced by `company_office`;
- `article_party`: generic polymorphic relationship obscured what kind of entity an article was linked to; replaced by `article_company`.

New relations introduced by the revision:

```text
company_office
company_acquisition
article_company
```

## 6. Capability coverage retained

The 16-relation model still provides natural material for:

- relation / row / attribute reasoning;
- Grain;
- keys and uniqueness;
- 1:M relationships;
- 1:0..1 optional relationships;
- M:N bridges;
- selection and projection;
- INNER JOIN and LEFT JOIN;
- row preservation and row loss;
- one-to-many multiplication and multi-branch fanout;
- aggregation and pre-aggregation;
- NULL interpretation;
- EXISTS / NOT EXISTS;
- self joins and recursive CTEs through `sector`;
- subqueries;
- window functions over repeated dated funding rounds;
- set-oriented reasoning using compatible analytical result sets.

The schema does not add relations merely to create one exercise per feature.

## 7. Lesson contracts and candidate compatibility

The schema revision must not silently change the accepted Lesson 1–2 learner/data contracts.

Validated protected runtime facts in the revised seed are:

- Lesson 1 `news_article → news_source`: 18 joined article rows;
- Lesson 2 `funding_round → round_investment`: 72 participation rows.

The current data also preserves compatibility with the Stage 3 candidate:

- `company → funding_round`: 26 matched funding-round rows;
- `Lumina Bio` remains present in `company` and absent from `funding_round`, preserving the candidate zero-match case.

Those preserved facts do not make Lesson 3 current authority.

The removal of the old `company → party` supertype foreign key does not alter the preserved candidate relationship `funding_round.company_id → company.company_id`.

## 8. Boundary

This schema defines data infrastructure, not:

- Lesson order;
- learner prompts;
- instructional scaffolding;
- hints;
- answer choices;
- teacher voice;
- mastery criteria.

Future encounter design should use the schema only when the selected business case and capability justify the relevant relations.
