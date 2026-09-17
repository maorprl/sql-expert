PRAGMA foreign_keys = ON;

-- ============================================================
-- Startup Ecosystem SQL Lab
-- Course-focused relational schema for SQLite
-- 16 relations
-- ============================================================

-- ============================================================
-- Companies and people
-- ============================================================

CREATE TABLE company (
    company_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    website_url TEXT,
    founded_date TEXT,
    status TEXT,
    description TEXT
);

CREATE TABLE person (
    person_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    linkedin_url TEXT
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
    name TEXT NOT NULL,
    investor_type TEXT NOT NULL,
    website_url TEXT,
    country_code TEXT
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
-- Lesson 2 contract; company/funding-round structure also retains
-- compatibility with the preserved Stage 3 candidate.
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
-- Company state and location
-- ============================================================

CREATE TABLE company_office (
    office_id INTEGER PRIMARY KEY,
    company_id INTEGER NOT NULL,
    city TEXT NOT NULL,
    country_code TEXT NOT NULL,
    office_role TEXT NOT NULL,
    opened_date TEXT,
    closed_date TEXT,
    is_primary INTEGER NOT NULL DEFAULT 0
        CHECK (is_primary IN (0, 1)),
    FOREIGN KEY (company_id) REFERENCES company(company_id),
    CHECK (closed_date IS NULL OR opened_date IS NULL OR closed_date >= opened_date)
);

CREATE TABLE company_acquisition (
    company_id INTEGER PRIMARY KEY,
    acquired_date TEXT NOT NULL,
    acquirer_name TEXT NOT NULL,
    reported_price NUMERIC
        CHECK (reported_price IS NULL OR reported_price >= 0),
    currency_code TEXT,
    notes TEXT,
    FOREIGN KEY (company_id) REFERENCES company(company_id)
);

-- ============================================================
-- News
-- Lesson 1 contract
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

CREATE TABLE article_company (
    news_article_id INTEGER NOT NULL,
    company_id INTEGER NOT NULL,
    PRIMARY KEY (news_article_id, company_id),
    FOREIGN KEY (news_article_id)
        REFERENCES news_article(news_article_id),
    FOREIGN KEY (company_id)
        REFERENCES company(company_id)
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
    FOREIGN KEY (sector_id) REFERENCES sector(sector_id)
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

CREATE INDEX idx_company_office_company
    ON company_office(company_id);

CREATE UNIQUE INDEX uq_company_primary_open_office
    ON company_office(company_id)
    WHERE is_primary = 1 AND closed_date IS NULL;

CREATE INDEX idx_news_article_source
    ON news_article(news_source_id);

CREATE INDEX idx_article_company_company
    ON article_company(company_id);

CREATE INDEX idx_article_funding_round_round
    ON article_funding_round(funding_round_id);

CREATE INDEX idx_article_sector_sector
    ON article_sector(sector_id);

CREATE INDEX idx_sector_parent
    ON sector(parent_sector_id);

CREATE UNIQUE INDEX uq_sector_root_name
    ON sector(name)
    WHERE parent_sector_id IS NULL;
