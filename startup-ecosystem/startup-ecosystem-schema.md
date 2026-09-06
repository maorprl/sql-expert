# Startup Ecosystem — Normalized Relational Schema

**Status:** Initial data-model candidate  
**Target database:** SQLite  
**Domain:** startups, funding rounds, investors, sectors, tags, news, and addresses  
**Design goal:** Keep the model as normalized and relationally explicit as practical while remaining usable for analytical SQL learning.

---

## 1. Design principles

This schema intentionally favors:

- explicit relations over JSON arrays;
- explicit bridge tables for many-to-many relationships;
- lookup tables for reusable controlled vocabularies;
- normalized geographic entities;
- subtype modeling where the domain genuinely has a shared supertype;
- separate relationships when their business meaning differs;
- preserving business meaning even when some values are unknown.

It intentionally avoids:

- generic `entity_type + entity_id` polymorphic foreign keys;
- comma-separated tags, sectors, or investors;
- storing a company with repeated investor/sector/address columns;
- collapsing organizations and people into one wide table full of nullable columns;
- treating the reported total of a funding round as necessarily equal to the sum of disclosed investor checks.

---

## 2. Core supertype model

A **party** is an entity that can participate in ecosystem relationships.

A party can have one of the concrete identity forms:

- `organization`
- `person`

An organization may additionally be a:

- `company`

Any party may additionally have the role:

- `investor`

This allows:

- a VC fund manager or investment firm to be an organization + investor;
- an angel to be a person + investor;
- a startup to be an organization + company;
- a corporate investor to be both company + investor if needed.

```text
party
├── organization
│   └── company
└── person

party
└── investor
```

`investor` is therefore a **role subtype**, not a mutually exclusive entity kind.

---

## 3. High-level relationship map

```text
party 1 ── 0..1 organization
party 1 ── 0..1 person
organization 1 ── 0..1 company
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

funding_round >──< tag
   via funding_round_tag

geo_unit ──< geo_unit
   recursive geographic hierarchy

sector ──< sector
   recursive sector taxonomy
```

---

## 4. Identity and organization tables

### `party`

Pure relational supertype used as the shared key for organizations, people, and investor roles.

| Column | Meaning |
|---|---|
| `party_id` | Stable identifier |

### `organization`

| Column | Meaning |
|---|---|
| `organization_id` | PK and FK to `party` |
| `name` | Organization name |
| `website_url` | Main website |
| `founded_date` | Founding date when known |

### `person`

| Column | Meaning |
|---|---|
| `person_id` | PK and FK to `party` |
| `first_name` | Given name |
| `last_name` | Family name |
| `linkedin_url` | Optional professional profile |

---

## 5. Companies / startups

### `company_status`

Controlled vocabulary such as:

- active
- acquired
- closed
- stealth

### `company`

`company` is a subtype of `organization`.

| Column | Meaning |
|---|---|
| `company_id` | PK and FK to `organization` |
| `company_status_id` | Current company status |
| `description` | Short company description |

The company name, website, and founding date remain in `organization` rather than being repeated here.

---

## 6. Founders

### `company_founder`

Many-to-many relationship between companies and people.

| Column | Meaning |
|---|---|
| `company_id` | Company |
| `person_id` | Founder |
| `founder_title` | Optional title, e.g. CEO / CTO |
| `start_date` | Optional start date |
| `end_date` | Optional end date |

Primary key:

```text
(company_id, person_id)
```

This avoids repeated `founder_1`, `founder_2`, etc. columns.

---

## 7. Investors

### `investor`

An investor is a role that can be attached to either a person or an organization through the shared `party_id`.

| Column | Meaning |
|---|---|
| `investor_id` | PK and FK to `party` |

### `investor_category`

Examples:

- angel
- venture capital
- corporate venture capital
- private equity
- accelerator
- family office
- government
- institutional

### `investor_category_membership`

Many-to-many relation because one investor can legitimately belong to more than one category.

| Column | Meaning |
|---|---|
| `investor_id` | Investor |
| `investor_category_id` | Category |

---

## 8. Sectors

### `sector`

Hierarchical taxonomy.

| Column | Meaning |
|---|---|
| `sector_id` | Sector |
| `name` | Sector name |
| `parent_sector_id` | Optional parent sector |

Example:

```text
Enterprise Software
└── Cybersecurity
    ├── Cloud Security
    └── Identity Security
```

The self-reference supports hierarchical sector analysis without repeating parent names.

### `company_sector`

Many-to-many relationship between companies and sectors.

| Column | Meaning |
|---|---|
| `company_id` | Company |
| `sector_id` | Sector |
| `is_primary` | Whether this is marked as a primary sector |

At most one sector may be marked as the current primary sector for a company.

### `investor_sector_focus`

Investor investment-thesis relationship.

| Column | Meaning |
|---|---|
| `investor_id` | Investor |
| `sector_id` | Sector |

This is kept separate from `company_sector` because:

- a company **operates in** a sector;
- an investor **focuses on investing in** a sector.

Those are different business relationships.

---

## 9. Funding rounds and investments

### `currency`

| Column | Meaning |
|---|---|
| `currency_code` | ISO-like code such as USD, EUR, ILS |
| `currency_name` | Currency name |

### `funding_round_type`

Examples:

- pre-seed
- seed
- series a
- series b
- series c
- growth
- debt
- grant
- convertible note

### `funding_round`

One company can have many funding rounds.

| Column | Meaning |
|---|---|
| `funding_round_id` | Round |
| `company_id` | Funded company |
| `funding_round_type_id` | Round type |
| `announced_date` | Public announcement date |
| `reported_total_amount` | Reported round total, if known |
| `currency_code` | Currency of reported total |
| `pre_money_valuation` | Optional reported value |
| `post_money_valuation` | Optional reported value |

Important modeling rule:

> `reported_total_amount` is not assumed to equal the sum of disclosed `round_investment.amount` values.

Individual investor checks are often undisclosed even when a total round size is reported.

### `round_investment`

Bridge / fact relation connecting investors to funding rounds.

| Column | Meaning |
|---|---|
| `round_investment_id` | Investment participation |
| `funding_round_id` | Round |
| `investor_id` | Investor |
| `amount` | Investor-specific disclosed amount, if known |
| `currency_code` | Currency of the disclosed check |
| `is_lead` | Lead-investor flag |

The intended grain is **one row per investor per funding round**, enforced by a unique constraint on:

```text
(funding_round_id, investor_id)
```

This relation creates the natural many-to-many structure:

```text
funding_round >──< investor
```

---

## 10. Tags

### `tag`

A reusable free-form or curated classification.

| Column | Meaning |
|---|---|
| `tag_id` | Tag |
| `name` | Unique tag label |

### `party_tag`

Tags attached to a real ecosystem party:

- startup/company
- investor organization
- angel
- other person/organization represented by `party`

### `article_tag`

Tags attached to news articles.

### `funding_round_tag`

Tags attached specifically to funding rounds.

Separate bridges are used instead of a polymorphic:

```text
tag_assignment(entity_type, entity_id, tag_id)
```

because real foreign keys and relationship meaning are preferable.

---

## 11. Geography and addresses

### `geo_unit_type`

Examples:

- country
- state
- province
- district
- city

### `geo_unit`

Recursive geographic hierarchy.

| Column | Meaning |
|---|---|
| `geo_unit_id` | Geographic unit |
| `geo_unit_type_id` | Type |
| `name` | Place name |
| `parent_geo_unit_id` | Parent geography |
| `code` | Optional official code |

Example:

```text
Israel
└── Tel Aviv District
    └── Tel Aviv-Yafo
```

The recursive hierarchy avoids repeating country and region names in every address.

### `address`

| Column | Meaning |
|---|---|
| `address_id` | Address |
| `geo_unit_id` | Most specific known geographic unit |
| `street_line_1` | Street and number |
| `street_line_2` | Optional additional line |
| `postal_code` | Postal code |
| `latitude` | Optional latitude |
| `longitude` | Optional longitude |

An address can be partial: a record may contain a city-level `geo_unit_id` even if no street is known.

### `address_role`

Examples:

- headquarters
- office
- registered
- mailing

### `party_address`

Many-to-many temporal relationship between parties and addresses.

| Column | Meaning |
|---|---|
| `party_address_id` | Relationship row |
| `party_id` | Company / investor / person / organization |
| `address_id` | Address |
| `address_role_id` | Address role |
| `valid_from` | Optional start date |
| `valid_to` | Optional end date |
| `is_primary` | Current primary flag |

This supports:

- companies with multiple offices;
- investors with multiple offices;
- historical headquarters;
- an address shared by multiple related entities.

---

## 12. News

### `news_source`

| Column | Meaning |
|---|---|
| `news_source_id` | Publisher |
| `name` | Publisher name |
| `website_url` | Publisher website |

### `news_article`

| Column | Meaning |
|---|---|
| `news_article_id` | Article |
| `news_source_id` | Publisher |
| `url` | Unique article URL |
| `title` | Headline |
| `published_at` | Publication timestamp |
| `language_code` | Optional language code |
| `summary` | Optional internal summary |

### `news_author`

| Column | Meaning |
|---|---|
| `news_author_id` | Author |
| `name` | Author name |

### `news_article_author`

Many-to-many relation because:

- an article may have multiple authors;
- an author may write many articles.

### `article_party`

Links news to companies, investors, people, or organizations through `party`.

### `article_funding_round`

Links an article directly to a funding round.

### `article_sector`

Links an article to sectors.

These are distinct from one another because “this article mentions company X” is not the same assertion as “this article is about funding round Y”.

---

## 13. Why this schema is useful for analytical SQL

The model naturally supports the relational problems the course needs.

### Grain

Examples of distinct grains:

- `company`: one row per company
- `funding_round`: one row per round
- `round_investment`: one row per investor participation in a round
- `company_sector`: one row per company-sector assignment
- `article_party`: one row per article-party link

### One-to-many

Examples:

```text
company 1 ── M funding_round
news_source 1 ── M news_article
geo_unit 1 ── M child geo_unit
```

### Many-to-many

Examples:

```text
company M ── N sector
funding_round M ── N investor
company M ── N person (founders)
news_article M ── N party
party M ── N tag
```

### Fanout opportunities

A company can simultaneously have:

- multiple funding rounds;
- multiple sectors;
- multiple founders;
- multiple addresses;
- multiple news articles.

Joining several branches without controlling grain creates realistic fanout.

For example:

```text
company
  ├── funding_round
  └── company_sector
```

A company with 4 rounds and 3 sectors can produce 12 rows when both branches are joined.

### Pre-aggregation

The schema supports cases such as:

1. aggregate investments to one row per funding round;
2. aggregate rounds to one row per company;
3. only then join to company-level attributes.

### LEFT JOIN / missing relationships

Natural missing relationships exist:

- company with no funding round;
- investor with no disclosed check amount;
- company with no known street address;
- article with no funding-round link;
- sector without a parent sector.

### EXISTS / NOT EXISTS

Natural questions include:

- companies that have at least one funding round;
- investors that have invested in cybersecurity;
- companies with no news coverage;
- investors that have never led a round.

### Self joins / hierarchy

Natural recursive or self-referential structures:

- `sector.parent_sector_id`
- `geo_unit.parent_geo_unit_id`

### Window functions

Natural analytical tasks include:

- rank funding rounds within each company;
- cumulative funding by company over time;
- rank investors by number of investments within sector;
- compare each round with the previous round for the same company.

---

## 14. Main integrity rules

The database should enforce where practical:

- organization IDs must exist in `party`;
- person IDs must exist in `party`;
- company IDs must exist in `organization`;
- investor IDs must exist in `party`;
- all bridge endpoints must exist;
- tag names are unique;
- sector names are unique within the same parent;
- article URLs are unique;
- currency amounts cannot be negative;
- latitude must be between -90 and 90;
- longitude must be between -180 and 180;
- `valid_to` cannot precede `valid_from`;
- a sector cannot be its own direct parent;
- a geographic unit cannot be its own direct parent.

Some subtype rules require application logic or triggers, for example:

> every `investor` should correspond to either a `person` or an `organization`.

That requirement cannot be expressed with an ordinary SQLite foreign key alone.

---

## 15. Tables

Core tables:

```text
party
organization
person
company
company_status
company_founder

investor
investor_category
investor_category_membership

sector
company_sector
investor_sector_focus

currency
funding_round_type
funding_round
round_investment

tag
party_tag
article_tag
funding_round_tag

geo_unit_type
geo_unit
address
address_role
party_address

news_source
news_article
news_author
news_article_author
article_party
article_funding_round
article_sector
```

Total: **32 relations**

---

## 16. Deliberate omissions from v1

Not included yet:

- acquisitions / exits;
- employee-count history;
- valuation history outside funding rounds;
- funds managed by investment firms;
- LP / GP structures;
- patents;
- products;
- technology taxonomy separate from sectors;
- data provenance / source evidence for every fact;
- confidence scoring;
- duplicate-resolution / entity-resolution tables.

These can be added later if the course or analytical requirements require them.

They should not be added merely to make the schema larger.
