PRAGMA foreign_keys = ON;

-- ============================================================
-- Startup Ecosystem SQL Lab
-- Normalized relational schema for SQLite
-- 24 relations
-- ============================================================

CREATE TABLE party (
    party_id INTEGER PRIMARY KEY
);

CREATE TABLE organization (
    organization_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    website_url TEXT,
    founded_date TEXT,
    FOREIGN KEY (organization_id) REFERENCES party(party_id)
);

CREATE TABLE person (
    person_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    linkedin_url TEXT,
    FOREIGN KEY (person_id) REFERENCES party(party_id)
);

CREATE TABLE company (
    company_id INTEGER PRIMARY KEY,
    status TEXT,
    description TEXT,
    FOREIGN KEY (company_id) REFERENCES organization(organization_id)
);

CREATE TABLE company_founder (
    company_id INTEGER NOT NULL,
    person_id INTEGER NOT NULL,
    founder_title TEXT,
    start_date TEXT,
    end_date TEXT,
    PRIMARY KEY (company_id, person_id),
    FOREIGN KEY (company_id) REFERENCES company(company_id),
    FOREIGN KEY (person_id) REFERENCES person(person_id),
    CHECK (end_date IS NULL OR start_date IS NULL OR end_date >= start_date)
);

-- ============================================================
-- Investors
-- ============================================================

CREATE TABLE investor (
    investor_id INTEGER PRIMARY KEY,
    FOREIGN KEY (investor_id) REFERENCES party(party_id)
);

CREATE TABLE investor_category (
    investor_category_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE investor_category_membership (
    investor_id INTEGER NOT NULL,
    investor_category_id INTEGER NOT NULL,
    PRIMARY KEY (investor_id, investor_category_id),
    FOREIGN KEY (investor_id) REFERENCES investor(investor_id),
    FOREIGN KEY (investor_category_id)
        REFERENCES investor_category(investor_category_id)
);

-- ============================================================
-- Sectors
-- ============================================================

CREATE TABLE sector (
    sector_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    parent_sector_id INTEGER,
    FOREIGN KEY (parent_sector_id) REFERENCES sector(sector_id),
    UNIQUE (parent_sector_id, name),
    CHECK (parent_sector_id IS NULL OR parent_sector_id <> sector_id)
);

CREATE TABLE company_sector (
    company_id INTEGER NOT NULL,
    sector_id INTEGER NOT NULL,
    is_primary INTEGER NOT NULL DEFAULT 0
        CHECK (is_primary IN (0, 1)),
    PRIMARY KEY (company_id, sector_id),
    FOREIGN KEY (company_id) REFERENCES company(company_id),
    FOREIGN KEY (sector_id) REFERENCES sector(sector_id)
);

CREATE TABLE investor_sector_focus (
    investor_id INTEGER NOT NULL,
    sector_id INTEGER NOT NULL,
    PRIMARY KEY (investor_id, sector_id),
    FOREIGN KEY (investor_id) REFERENCES investor(investor_id),
    FOREIGN KEY (sector_id) REFERENCES sector(sector_id)
);

-- ============================================================
-- Funding
-- ============================================================

CREATE TABLE funding_round (
    funding_round_id INTEGER PRIMARY KEY,
    company_id INTEGER NOT NULL,
    round_type TEXT,
    announced_date TEXT,
    reported_total_amount NUMERIC
        CHECK (reported_total_amount IS NULL OR reported_total_amount >= 0),
    currency_code TEXT,
    pre_money_valuation NUMERIC
        CHECK (pre_money_valuation IS NULL OR pre_money_valuation >= 0),
    post_money_valuation NUMERIC
        CHECK (post_money_valuation IS NULL OR post_money_valuation >= 0),
    FOREIGN KEY (company_id) REFERENCES company(company_id)
);

CREATE TABLE round_investment (
    round_investment_id INTEGER PRIMARY KEY,
    funding_round_id INTEGER NOT NULL,
    investor_id INTEGER NOT NULL,
    amount NUMERIC CHECK (amount IS NULL OR amount >= 0),
    currency_code TEXT,
    is_lead INTEGER NOT NULL DEFAULT 0
        CHECK (is_lead IN (0, 1)),
    FOREIGN KEY (funding_round_id)
        REFERENCES funding_round(funding_round_id),
    FOREIGN KEY (investor_id)
        REFERENCES investor(investor_id),
    UNIQUE (funding_round_id, investor_id)
);

-- ============================================================
-- Tags
-- ============================================================

CREATE TABLE tag (
    tag_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE party_tag (
    party_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (party_id, tag_id),
    FOREIGN KEY (party_id) REFERENCES party(party_id),
    FOREIGN KEY (tag_id) REFERENCES tag(tag_id)
);

-- ============================================================
-- Geography / addresses
-- ============================================================

CREATE TABLE geo_unit (
    geo_unit_id INTEGER PRIMARY KEY,
    unit_type TEXT NOT NULL,
    name TEXT NOT NULL,
    parent_geo_unit_id INTEGER,
    code TEXT,
    FOREIGN KEY (parent_geo_unit_id)
        REFERENCES geo_unit(geo_unit_id),
    UNIQUE (parent_geo_unit_id, name),
    CHECK (parent_geo_unit_id IS NULL OR parent_geo_unit_id <> geo_unit_id)
);

CREATE TABLE address (
    address_id INTEGER PRIMARY KEY,
    geo_unit_id INTEGER,
    street_line_1 TEXT,
    street_line_2 TEXT,
    postal_code TEXT,
    latitude REAL CHECK (
        latitude IS NULL OR (latitude >= -90 AND latitude <= 90)
    ),
    longitude REAL CHECK (
        longitude IS NULL OR (longitude >= -180 AND longitude <= 180)
    ),
    FOREIGN KEY (geo_unit_id) REFERENCES geo_unit(geo_unit_id)
);

CREATE TABLE party_address (
    party_address_id INTEGER PRIMARY KEY,
    party_id INTEGER NOT NULL,
    address_id INTEGER NOT NULL,
    address_role TEXT NOT NULL,
    valid_from TEXT,
    valid_to TEXT,
    is_primary INTEGER NOT NULL DEFAULT 0
        CHECK (is_primary IN (0, 1)),
    FOREIGN KEY (party_id) REFERENCES party(party_id),
    FOREIGN KEY (address_id) REFERENCES address(address_id),
    CHECK (valid_to IS NULL OR valid_from IS NULL OR valid_to >= valid_from)
);

-- ============================================================
-- News
-- ============================================================

CREATE TABLE news_source (
    news_source_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    website_url TEXT
);

CREATE TABLE news_article (
    news_article_id INTEGER PRIMARY KEY,
    news_source_id INTEGER NOT NULL,
    url TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    published_at TEXT,
    language_code TEXT,
    byline TEXT,
    summary TEXT,
    FOREIGN KEY (news_source_id)
        REFERENCES news_source(news_source_id)
);


CREATE TABLE article_tag (
    news_article_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (news_article_id, tag_id),
    FOREIGN KEY (news_article_id)
        REFERENCES news_article(news_article_id),
    FOREIGN KEY (tag_id) REFERENCES tag(tag_id)
);

CREATE TABLE article_party (
    news_article_id INTEGER NOT NULL,
    party_id INTEGER NOT NULL,
    PRIMARY KEY (news_article_id, party_id),
    FOREIGN KEY (news_article_id)
        REFERENCES news_article(news_article_id),
    FOREIGN KEY (party_id)
        REFERENCES party(party_id)
);

CREATE TABLE article_funding_round (
    news_article_id INTEGER NOT NULL,
    funding_round_id INTEGER NOT NULL,
    PRIMARY KEY (news_article_id, funding_round_id),
    FOREIGN KEY (news_article_id)
        REFERENCES news_article(news_article_id),
    FOREIGN KEY (funding_round_id)
        REFERENCES funding_round(funding_round_id)
);

CREATE TABLE article_sector (
    news_article_id INTEGER NOT NULL,
    sector_id INTEGER NOT NULL,
    PRIMARY KEY (news_article_id, sector_id),
    FOREIGN KEY (news_article_id)
        REFERENCES news_article(news_article_id),
    FOREIGN KEY (sector_id)
        REFERENCES sector(sector_id)
);

-- ============================================================
-- Helpful indexes
-- ============================================================

CREATE INDEX idx_funding_round_company
    ON funding_round(company_id);

CREATE INDEX idx_round_investment_round
    ON round_investment(funding_round_id);

CREATE INDEX idx_round_investment_investor
    ON round_investment(investor_id);

CREATE INDEX idx_company_sector_sector
    ON company_sector(sector_id);

CREATE UNIQUE INDEX uq_company_primary_sector
    ON company_sector(company_id)
    WHERE is_primary = 1;

CREATE INDEX idx_investor_sector_focus_sector
    ON investor_sector_focus(sector_id);

CREATE INDEX idx_party_address_party
    ON party_address(party_id);

CREATE INDEX idx_party_address_address
    ON party_address(address_id);

CREATE INDEX idx_news_article_source
    ON news_article(news_source_id);

CREATE INDEX idx_article_party_party
    ON article_party(party_id);

CREATE INDEX idx_article_funding_round_round
    ON article_funding_round(funding_round_id);

CREATE INDEX idx_article_sector_sector
    ON article_sector(sector_id);

CREATE INDEX idx_sector_parent
    ON sector(parent_sector_id);

CREATE UNIQUE INDEX uq_sector_root_name
    ON sector(name)
    WHERE parent_sector_id IS NULL;

CREATE INDEX idx_geo_unit_parent
    ON geo_unit(parent_geo_unit_id);

CREATE UNIQUE INDEX uq_geo_unit_root_name
    ON geo_unit(name)
    WHERE parent_geo_unit_id IS NULL;

CREATE UNIQUE INDEX uq_party_primary_current_address
    ON party_address(party_id, address_role)
    WHERE is_primary = 1 AND valid_to IS NULL;
