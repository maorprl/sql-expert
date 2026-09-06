PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

-- ============================================================
-- LOOKUPS
-- ============================================================

INSERT INTO company_status (company_status_id, name) VALUES
(1, 'active'),
(2, 'acquired'),
(3, 'closed'),
(4, 'stealth');

INSERT INTO investor_category (investor_category_id, name) VALUES
(1, 'angel'),
(2, 'venture capital'),
(3, 'corporate venture capital'),
(4, 'private equity'),
(5, 'accelerator'),
(6, 'family office'),
(7, 'government'),
(8, 'institutional');

INSERT INTO currency (currency_code, currency_name) VALUES
('USD', 'US Dollar'),
('EUR', 'Euro'),
('ILS', 'Israeli New Shekel');

INSERT INTO funding_round_type (funding_round_type_id, name) VALUES
(1, 'pre-seed'),
(2, 'seed'),
(3, 'series a'),
(4, 'series b'),
(5, 'series c'),
(6, 'growth'),
(7, 'debt'),
(8, 'grant'),
(9, 'convertible note');

INSERT INTO geo_unit_type (geo_unit_type_id, name) VALUES
(1, 'country'),
(2, 'state'),
(3, 'district'),
(4, 'county'),
(5, 'city');

INSERT INTO address_role (address_role_id, name) VALUES
(1, 'headquarters'),
(2, 'office'),
(3, 'registered'),
(4, 'mailing');

-- ============================================================
-- PARTIES
-- Organizations: 1-20
-- People: 101-122
-- ============================================================

INSERT INTO party (party_id) VALUES
(1),(2),(3),(4),(5),(6),(7),(8),(9),(10),
(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),
(101),(102),(103),(104),(105),(106),(107),(108),(109),(110),
(111),(112),(113),(114),(115),(116),(117),(118),(119),(120),
(121),(122);

INSERT INTO organization (organization_id, name, website_url, founded_date) VALUES
(1,  'CloudFence Labs',          'https://cloudfence.example',       '2018-03-15'),
(2,  'MedOrbit',                 'https://medorbit.example',         '2019-07-01'),
(3,  'GreenRoute AI',            'https://greenroute.example',       '2021-02-10'),
(4,  'FinEdge Systems',          'https://finedge.example',          '2017-11-20'),
(5,  'QuantumShelf',             'https://quantumshelf.example',     '2023-05-03'),
(6,  'DeepSignal',               'https://deepsignal.example',       '2021-09-12'),
(7,  'TerraVision Robotics',     'https://terravision.example',      '2020-01-28'),
(8,  'RetailPulse',              'https://retailpulse.example',      '2020-08-14'),
(9,  'CivicGrid',                'https://civicgrid.example',        '2022-04-22'),
(10, 'NovaMaterials',            'https://novamaterials.example',    '2019-10-06'),
(11, 'Horizon Ventures',         'https://horizonvc.example',        '2011-01-01'),
(12, 'Cedar Capital',            'https://cedarcapital.example',     '2014-01-01'),
(13, 'Atlas Growth Partners',    'https://atlasgrowth.example',      '2009-01-01'),
(14, 'BluePeak Ventures',        'https://bluepeak.example',         '2016-01-01'),
(15, 'Foundry Accelerator',      'https://foundryaccel.example',     '2013-01-01'),
(16, 'NorthStar Family Office',  'https://northstarfo.example',      '2005-01-01'),
(17, 'National Innovation Fund', 'https://innovationfund.example',   '2010-01-01'),
(18, 'Harbor Institutional',     'https://harborinst.example',       '2001-01-01'),
(19, 'Orbian Technologies',      'https://orbian.example',           '2012-06-18'),
(20, 'Lumina Bio',               'https://luminabio.example',        '2025-01-05');

INSERT INTO person (person_id, first_name, last_name, linkedin_url) VALUES
(101, 'Noa',    'Levy',      NULL),
(102, 'Amit',   'Shalev',    NULL),
(103, 'Maya',   'Cohen',     NULL),
(104, 'Omer',   'Levy',      NULL),
(105, 'Dana',   'Barak',     NULL),
(106, 'Eyal',   'Rosen',     NULL),
(107, 'Yael',   'Nir',       NULL),
(108, 'Gil',    'Peled',     NULL),
(109, 'Lior',   'Tal',       NULL),
(110, 'Tamar',  'Sagi',      NULL),
(111, 'Ron',    'Aviv',      NULL),
(112, 'Neta',   'Gal',       NULL),
(113, 'Adi',    'Mor',       NULL),
(114, 'Yoni',   'Katz',      NULL),
(115, 'Shira',  'Lavi',      NULL),
(116, 'Ilan',   'Ben-Ari',   NULL),
(117, 'Roni',   'Shachar',   NULL),
(118, 'Tal',    'Harel',     NULL),
(119, 'Michal', 'Doron',     NULL),
(120, 'Avi',    'Segal',     NULL),
(121, 'Sarah',  'Kaplan',    NULL),
(122, 'Daniel', 'Weiss',     NULL);

-- ============================================================
-- COMPANIES
-- ============================================================

INSERT INTO company (company_id, company_status_id, description) VALUES
(1, 1, 'Cloud security platform for enterprise workloads.'),
(2, 1, 'Digital health monitoring and clinical workflow software.'),
(3, 1, 'AI routing and optimization for commercial fleets.'),
(4, 2, 'Payments infrastructure and fraud analytics.'),
(5, 4, 'Quantum-inspired inventory optimization.'),
(6, 1, 'AI infrastructure for real-time signal analysis.'),
(7, 1, 'Robotics for precision agriculture and field inspection.'),
(8, 1, 'Retail analytics and demand intelligence.'),
(9, 1, 'Municipal infrastructure and public-service software.'),
(10,1, 'Advanced materials for energy storage applications.'),
(19,1, 'Industrial software and embedded systems.'),
(20,1, 'Early-stage biotech diagnostics company.');

INSERT INTO company_founder
(company_id, person_id, founder_title, start_date, end_date) VALUES
(1,101,'CEO','2018-03-15',NULL),
(1,102,'CTO','2018-03-15',NULL),
(2,103,'CEO','2019-07-01',NULL),
(2,104,'Chief Medical Officer','2019-07-01',NULL),
(3,107,'CEO','2021-02-10',NULL),
(4,105,'CEO','2017-11-20','2024-02-01'),
(4,106,'CTO','2017-11-20','2024-02-01'),
(5,109,'CEO','2023-05-03',NULL),
(6,110,'CEO','2021-09-12',NULL),
(6,111,'CTO','2021-09-12',NULL),
(7,112,'CEO','2020-01-28',NULL),
(7,113,'CTO','2020-01-28',NULL),
(8,114,'CEO','2020-08-14',NULL),
(9,115,'CEO','2022-04-22',NULL),
(9,116,'COO','2022-04-22',NULL),
(10,117,'CEO','2019-10-06',NULL),
(10,118,'Chief Scientist','2019-10-06',NULL),
(19,119,'CEO','2012-06-18',NULL),
(20,120,'CEO','2025-01-05',NULL);

-- ============================================================
-- INVESTOR ROLES
-- 105 is both founder and angel investor.
-- 19 is both a company and a corporate investor.
-- ============================================================

INSERT INTO investor (investor_id) VALUES
(11),(12),(13),(14),(15),(16),(17),(18),(19),(105),(121),(122);

INSERT INTO investor_category_membership (investor_id, investor_category_id) VALUES
(11,2),
(12,2),
(13,4),
(13,8),
(14,2),
(14,3),
(15,5),
(16,6),
(17,7),
(18,8),
(19,3),
(105,1),
(121,1),
(122,1);

-- ============================================================
-- SECTOR TAXONOMY
-- Four levels exist on the cybersecurity branch.
-- ============================================================

INSERT INTO sector (sector_id, name, parent_sector_id) VALUES
(1,  'Technology',          NULL),
(2,  'Enterprise Software', 1),
(3,  'Cybersecurity',       2),
(4,  'Cloud Security',      3),
(5,  'Identity Security',   3),
(6,  'HealthTech',          1),
(7,  'Digital Health',      6),
(8,  'ClimateTech',         1),
(9,  'Mobility',            8),
(10, 'FinTech',             1),
(11, 'Payments',            10),
(12, 'AI Infrastructure',   2),
(13, 'Robotics',            1),
(14, 'RetailTech',          2),
(15, 'GovTech',             1),
(16, 'Advanced Materials',  1),
(17, 'Biotech',             1),
(18, 'Diagnostics',         17);

INSERT INTO company_sector (company_id, sector_id, is_primary) VALUES
(1,4,1),(1,3,0),(1,12,0),
(2,7,1),(2,6,0),(2,18,0),
(3,9,1),(3,8,0),(3,12,0),
(4,11,1),(4,10,0),(4,3,0),
(5,14,1),(5,12,0),
(6,12,1),(6,2,0),(6,3,0),
(7,13,1),(7,8,0),
(8,14,1),(8,12,0),
(9,15,1),(9,2,0),
(10,16,1),(10,8,0),
(19,2,1),(19,12,0),
(20,18,1),(20,17,0);

INSERT INTO investor_sector_focus (investor_id, sector_id) VALUES
(11,3),(11,12),(11,10),
(12,6),(12,7),(12,17),
(13,2),(13,10),(13,14),
(14,3),(14,4),(14,12),
(15,2),(15,8),(15,10),
-- 16 intentionally has no sector focus
(17,6),(17,8),(17,15),(17,16),
(18,2),(18,13),(18,16),
(19,2),(19,12),
(105,10),(105,11),
(121,3),(121,4),
(122,6),(122,18);

-- ============================================================
-- FUNDING ROUNDS
-- Includes 0 / 1 / M cases, repeated amounts, ties, and time series.
-- Lumina Bio (20) intentionally has no funding round.
-- ============================================================

INSERT INTO funding_round
(funding_round_id, company_id, funding_round_type_id, announced_date,
 reported_total_amount, currency_code, pre_money_valuation, post_money_valuation)
VALUES
(1001,1,2,'2019-06-10',  4000000,'USD', 12000000,16000000),
(1002,1,3,'2021-05-18', 12000000,'USD', 36000000,48000000),
(1003,1,4,'2023-09-04', 30000000,'USD', 90000000,120000000),
(1004,1,5,'2025-11-12', 60000000,'USD', 240000000,300000000),

(1101,2,2,'2020-02-14',  5000000,'USD', 15000000,20000000),
(1102,2,3,'2022-07-20', 15000000,'USD', 45000000,60000000),
(1103,2,4,'2025-03-03', 30000000,'USD', NULL,130000000),

(1201,3,2,'2023-01-17',  3000000,'USD', 9000000,12000000),
(1202,3,3,'2025-08-25', 12000000,'USD', 38000000,50000000),

(1301,4,2,'2018-04-09',  4000000,'USD', 10000000,14000000),
(1302,4,3,'2020-09-15', 12000000,'USD', 33000000,45000000),
(1303,4,4,'2023-12-11', 30000000,'USD', 95000000,125000000),

(1401,5,2,'2025-06-05',  8000000,'USD', 22000000,30000000),

(1501,6,1,'2022-01-12',  1500000,'USD', NULL,NULL),
(1502,6,2,'2023-04-27',  4000000,'USD', 11000000,15000000),
(1503,6,3,'2026-02-19', 15000000,'USD', 50000000,65000000),

(1601,7,2,'2021-03-30',  5000000,'USD', 15000000,20000000),
(1602,7,3,'2024-04-08', 15000000,'USD', 45000000,60000000),

(1701,8,2,'2022-10-13',  4000000,'USD', 12000000,16000000),

(1801,9,8,'2022-11-07',   750000,'USD', NULL,NULL),
(1802,9,2,'2024-06-24',  5000000,'USD', 18000000,23000000),

(1901,10,1,'2020-03-02', 2000000,'USD', NULL,NULL),
(1902,10,2,'2021-12-06', 8000000,'USD', 22000000,30000000),
(1903,10,3,'2024-10-21',25000000,'USD', 75000000,100000000),

(2001,19,7,'2019-08-01',10000000,'USD', NULL,NULL),
(2002,19,6,'2022-05-16',30000000,'USD', NULL,NULL);

-- ============================================================
-- ROUND INVESTMENTS
-- Amount may be NULL even when round total is known.
-- Reported round total is NOT intended to equal disclosed checks.
-- ============================================================

INSERT INTO round_investment
(round_investment_id, funding_round_id, investor_id, amount, currency_code, is_lead)
VALUES
(1,1001,15, 500000,'USD',0),
(2,1001,121,750000,'USD',1),
(3,1001,11, NULL,'USD',0),

(4,1002,11,4000000,'USD',1),
(5,1002,14,3000000,'USD',0),
(6,1002,121,NULL,'USD',0),

(7,1003,14,8000000,'USD',1),
(8,1003,11,7000000,'USD',0),
(9,1003,13,NULL,'USD',0),
(10,1003,19,3000000,'USD',0),

(11,1004,13,15000000,'USD',1),
(12,1004,14,10000000,'USD',0),
(13,1004,18,NULL,'USD',0),
(14,1004,19,5000000,'USD',0),

(15,1101,12,2000000,'USD',1),
(16,1101,122,500000,'USD',0),
(17,1101,15,NULL,'USD',0),

(18,1102,12,5000000,'USD',1),
(19,1102,18,3000000,'USD',0),
(20,1102,122,NULL,'USD',0),

(21,1103,18,8000000,'USD',1),
(22,1103,12,6000000,'USD',0),
(23,1103,17,NULL,'USD',0),

(24,1201,15,500000,'USD',0),
(25,1201,105,500000,'USD',1),
(26,1201,11,NULL,'USD',0),

(27,1202,11,4000000,'USD',1),
(28,1202,14,2500000,'USD',0),
(29,1202,105,NULL,'USD',0),

(30,1301,105,1000000,'USD',1),
(31,1301,16,NULL,'USD',0),

(32,1302,11,3500000,'USD',1),
(33,1302,13,2500000,'USD',0),
(34,1302,16,NULL,'USD',0),

(35,1303,13,9000000,'USD',1),
(36,1303,18,5000000,'USD',0),
(37,1303,19,NULL,'USD',0),

(38,1401,15,1000000,'USD',0),
(39,1401,16,1500000,'USD',0),
(40,1401,121,NULL,'USD',1),

(41,1501,121,250000,'USD',1),
(42,1501,15,NULL,'USD',0),

(43,1502,11,1000000,'USD',1),
(44,1502,14,750000,'USD',0),
(45,1502,121,NULL,'USD',0),

(46,1503,14,5000000,'USD',1),
(47,1503,18,3000000,'USD',0),
(48,1503,11,NULL,'USD',0),

(49,1601,17,1000000,'USD',1),
(50,1601,15,NULL,'USD',0),

(51,1602,18,4000000,'USD',1),
(52,1602,17,2500000,'USD',0),
(53,1602,12,NULL,'USD',0),

(54,1701,13,1000000,'USD',1),
(55,1701,15,NULL,'USD',0),

(56,1801,17,750000,'USD',1),

(57,1802,17,1000000,'USD',0),
(58,1802,11,1500000,'USD',1),
(59,1802,15,NULL,'USD',0),

(60,1901,17,500000,'USD',1),
(61,1901,18,NULL,'USD',0),

(62,1902,18,2500000,'USD',1),
(63,1902,17,1000000,'USD',0),
(64,1902,16,NULL,'USD',0),

(65,1903,13,7000000,'USD',1),
(66,1903,18,5000000,'USD',0),
(67,1903,17,NULL,'USD',0),

(68,2001,18,4000000,'USD',1),
(69,2001,16,NULL,'USD',0),

(70,2002,13,10000000,'USD',1),
(71,2002,18,5000000,'USD',0),
(72,2002,16,NULL,'USD',0);

-- ============================================================
-- TAGS
-- ============================================================

INSERT INTO tag (tag_id, name) VALUES
(1,'b2b'),
(2,'saas'),
(3,'ai'),
(4,'security'),
(5,'healthcare'),
(6,'climate'),
(7,'hardware'),
(8,'enterprise'),
(9,'deep-tech'),
(10,'public-sector'),
(11,'acquisition'),
(12,'international-expansion'),
(13,'product-launch'),
(14,'funding'),
(15,'partnership');

INSERT INTO party_tag (party_id, tag_id) VALUES
(1,1),(1,2),(1,4),(1,8),
(2,2),(2,5),
(3,1),(3,3),(3,6),
(4,1),(4,2),(4,8),(4,11),
(5,3),(5,9),
(6,1),(6,2),(6,3),
(7,6),(7,7),(7,9),
(9,10),
(10,6),(10,7),(10,9),
(11,1),(11,8),
(14,4),(14,8),
(19,1),(19,7),
(121,4);
-- Company 20 intentionally has no tags.

INSERT INTO funding_round_tag (funding_round_id, tag_id) VALUES
(1003,14),(1004,14),(1004,12),
(1103,14),(1103,12),
(1202,14),
(1303,14),(1303,11),
(1503,14),(1503,13),
(1602,14),
(1903,14),(1903,9);

-- ============================================================
-- GEOGRAPHY
-- ============================================================

INSERT INTO geo_unit (geo_unit_id, geo_unit_type_id, name, parent_geo_unit_id, code) VALUES
(1, 1, 'Israel',                 NULL, 'IL'),
(2, 3, 'Tel Aviv District',      1,    NULL),
(3, 5, 'Tel Aviv-Yafo',          2,    NULL),
(4, 5, 'Herzliya',               2,    NULL),
(5, 3, 'Central District',       1,    NULL),
(6, 5, 'Petah Tikva',            5,    NULL),
(7, 5, 'Rehovot',                5,    NULL),
(8, 3, 'Haifa District',         1,    NULL),
(9, 5, 'Haifa',                  8,    NULL),
(10,3, 'Jerusalem District',     1,    NULL),
(11,5, 'Jerusalem',              10,   NULL),
(20,1, 'United States',          NULL, 'US'),
(21,2, 'California',             20,   'CA'),
(22,4, 'San Mateo County',       21,   NULL),
(23,5, 'Redwood City',           22,   NULL),
(24,5, 'San Francisco',          21,   NULL),
(25,2, 'New York',               20,   'NY'),
(26,5, 'New York City',          25,   NULL);

INSERT INTO address
(address_id, geo_unit_id, street_line_1, street_line_2, postal_code, latitude, longitude)
VALUES
(1,3,'12 Rothschild Blvd',NULL,'6688101',32.0636,34.7731),
(2,4,'7 Maskit St',NULL,'4673307',32.1640,34.8100),
(3,6,'15 HaYarkon Industrial Rd',NULL,NULL,32.0917,34.8875),
(4,9,'88 HaNamal St',NULL,NULL,32.8191,34.9983),
(5,11,'4 Jaffa Rd',NULL,NULL,31.7838,35.2206),
(6,7,'19 Science Park',NULL,NULL,31.8928,34.8113),
(7,3,'45 Menachem Begin Rd','Floor 12',NULL,32.0708,34.7913),
(8,23,'900 Middlefield Rd',NULL,'94063',37.4852,-122.2364),
(9,24,'135 Townsend St',NULL,'94107',37.7786,-122.3959),
(10,26,'120 Broadway',NULL,'10271',40.7085,-74.0113),
(11,4,'21 Abba Eban Blvd',NULL,NULL,32.1633,34.8078),
(12,3,'30 Ibn Gabirol St',NULL,NULL,32.0770,34.7818),
(13,6,'4 Yitzhak Rabin Rd',NULL,NULL,32.0920,34.8860),
(14,9,'17 Matam Park',NULL,NULL,32.7878,34.9561),
(15,3,'99 Yigal Alon St',NULL,NULL,32.0700,34.7940);

INSERT INTO party_address
(party_address_id, party_id, address_id, address_role_id, valid_from, valid_to, is_primary)
VALUES
(1,1,1,1,'2018-03-15','2022-06-30',0),
(2,1,2,1,'2022-07-01',NULL,1),
(3,1,8,2,'2024-01-01',NULL,0),

(4,2,3,1,'2019-07-01',NULL,1),
(5,2,9,2,'2025-01-01',NULL,0),

(6,3,6,1,'2021-02-10',NULL,1),
(7,4,7,1,'2017-11-20','2024-02-01',0),
(8,5,11,1,'2023-05-03',NULL,1),
(9,6,12,1,'2021-09-12',NULL,1),
(10,7,14,1,'2020-01-28',NULL,1),
(11,8,15,1,'2020-08-14',NULL,1),
(12,9,5,1,'2022-04-22',NULL,1),
(13,10,4,1,'2019-10-06',NULL,1),
(14,19,13,1,'2012-06-18',NULL,1),

(15,11,7,1,'2011-01-01',NULL,1),
(16,11,9,2,'2018-01-01',NULL,0),
(17,12,3,1,'2014-01-01',NULL,1),
(18,13,10,1,'2009-01-01',NULL,1),
(19,14,2,1,'2016-01-01',NULL,1),
(20,15,1,1,'2013-01-01',NULL,1),
(21,16,10,1,'2005-01-01',NULL,1),
(22,17,11,1,'2010-01-01',NULL,1),
(23,18,8,1,'2001-01-01',NULL,1),
(24,121,3,3,'2020-01-01',NULL,1);
-- Company 20 intentionally has no address.

-- ============================================================
-- NEWS
-- ============================================================

INSERT INTO news_source (news_source_id, name, website_url) VALUES
(1,'TechLedger','https://techledger.example'),
(2,'Venture Daily','https://venturedaily.example'),
(3,'MarketWire','https://marketwire.example'),
(4,'HealthTech Review','https://healthtechreview.example');

INSERT INTO news_author (news_author_id, name) VALUES
(1,'Maya Stern'),
(2,'Ben Adler'),
(3,'Ruth Klein'),
(4,'Daniel Moss'),
(5,'Leah Grant'),
(6,'Noam Green');

INSERT INTO news_article
(news_article_id, news_source_id, url, title, published_at, language_code, summary)
VALUES
(1,1,'https://techledger.example/a1','CloudFence raises Series B for cloud security expansion','2023-09-04 09:00:00','en','CloudFence announced a new Series B round.'),
(2,2,'https://venturedaily.example/a2','CloudFence opens US office','2024-02-10 12:00:00','en','The company expanded its US presence.'),
(3,3,'https://marketwire.example/a3','CloudFence closes $60M Series C','2025-11-12 08:30:00','en','The company reported a $60M Series C.'),
(4,4,'https://healthtechreview.example/a4','MedOrbit expands remote monitoring platform','2023-03-11 10:00:00','en','MedOrbit released new clinical monitoring features.'),
(5,2,'https://venturedaily.example/a5','MedOrbit raises Series B','2025-03-03 09:15:00','en','MedOrbit announced a Series B round.'),
(6,1,'https://techledger.example/a6','GreenRoute applies AI to fleet emissions','2024-01-18 14:00:00','en','GreenRoute discussed fleet optimization and emissions.'),
(7,2,'https://venturedaily.example/a7','GreenRoute raises Series A','2025-08-25 08:00:00','en','GreenRoute announced its Series A.'),
(8,3,'https://marketwire.example/a8','FinEdge acquired after years of payments growth','2024-02-01 07:30:00','en','FinEdge was acquired.'),
(9,1,'https://techledger.example/a9','DeepSignal launches real-time AI platform','2024-07-14 11:00:00','en','DeepSignal launched a new product.'),
(10,2,'https://venturedaily.example/a10','DeepSignal raises Series A','2026-02-19 09:00:00','en','DeepSignal announced a Series A.'),
(11,3,'https://marketwire.example/a11','TerraVision deploys agriculture robots','2024-05-02 13:00:00','en','TerraVision expanded commercial deployments.'),
(12,2,'https://venturedaily.example/a12','CivicGrid wins municipal infrastructure contract','2025-01-16 10:30:00','en','CivicGrid signed a public-sector contract.'),
(13,3,'https://marketwire.example/a13','NovaMaterials raises $25M Series A','2024-10-21 08:15:00','en','NovaMaterials raised a Series A.'),
(14,1,'https://techledger.example/a14','QuantumShelf emerges from stealth','2025-06-05 07:45:00','en','QuantumShelf announced its seed round and product vision.'),
(15,2,'https://venturedaily.example/a15','Orbian expands embedded AI portfolio','2023-02-08 09:20:00','en','Orbian expanded its industrial AI offering.'),
(16,1,'https://techledger.example/a16','Cybersecurity funding remains resilient','2025-12-01 06:30:00','en','Sector overview of cybersecurity funding.'),
(17,4,'https://healthtechreview.example/a17','Digital health investment rebounds','2025-04-12 08:40:00','en','Sector overview of digital-health investment.'),
(18,3,'https://marketwire.example/a18','Climate technology rounds grow larger','2025-09-30 12:10:00','en','Climate-tech funding analysis.');

INSERT INTO news_article_author (news_article_id, news_author_id, author_order) VALUES
(1,1,1),(1,2,2),
(2,2,1),
(3,3,1),
(4,4,1),
(5,4,1),(5,5,2),
(6,1,1),
(7,2,1),
(8,3,1),
(9,6,1),
(10,6,1),(10,2,2),
(11,5,1),
(12,3,1),
(13,1,1),
(14,2,1),
(15,5,1),
(16,1,1),(16,3,2),
(17,4,1),
(18,5,1);

INSERT INTO article_party (news_article_id, party_id) VALUES
(1,1),(1,14),(1,11),
(2,1),
(3,1),(3,13),(3,14),(3,18),(3,19),
(4,2),
(5,2),(5,18),(5,12),
(6,3),
(7,3),(7,11),(7,14),
(8,4),(8,13),
(9,6),
(10,6),(10,14),(10,18),
(11,7),
(12,9),(12,17),
(13,10),(13,13),(13,18),
(14,5),(14,121),
(15,19),
(16,1),(16,6),(16,14),
(17,2),(17,12),
(18,3),(18,7),(18,10);

INSERT INTO article_funding_round (news_article_id, funding_round_id) VALUES
(1,1003),
(3,1004),
(5,1103),
(7,1202),
(10,1503),
(13,1903),
(14,1401);

INSERT INTO article_sector (news_article_id, sector_id) VALUES
(1,3),(1,4),
(3,3),(3,4),
(4,7),
(5,7),
(6,9),(6,8),
(7,9),
(8,10),(8,11),
(9,12),
(10,12),
(11,13),(11,8),
(12,15),
(13,16),
(14,14),(14,12),
(15,2),(15,12),
(16,3),
(17,7),
(18,8);

INSERT INTO article_tag (news_article_id, tag_id) VALUES
(1,14),(1,4),
(2,12),
(3,14),(3,12),
(4,5),(4,13),
(5,14),(5,5),
(6,3),(6,6),
(7,14),(7,3),
(8,11),
(9,3),(9,13),
(10,14),(10,3),
(11,7),(11,6),
(12,10),(12,15),
(13,14),(13,9),
(14,14),(14,9),
(15,3),(15,8),
(16,4),(16,14),
(17,5),(17,14),
(18,6),(18,14);

COMMIT;
