PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

-- ============================================================
-- COMPANIES
-- Course data; company rows also retain compatibility with the
-- preserved Stage 3 candidate without making it current authority.
-- ============================================================

INSERT INTO company
(company_id, name, website_url, founded_date, status, description) VALUES
(1,  'CloudFence Labs',      'https://cloudfence.example',    '2018-03-15', 'active',   'Cloud security platform for enterprise workloads.'),
(2,  'MedOrbit',             'https://medorbit.example',      '2019-07-01', 'active',   'Digital health monitoring and clinical workflow software.'),
(3,  'GreenRoute AI',        'https://greenroute.example',    '2021-02-10', 'active',   'AI routing and optimization for commercial fleets.'),
(4,  'FinEdge Systems',      'https://finedge.example',       '2017-11-20', 'acquired', 'Payments infrastructure and fraud analytics.'),
(5,  'QuantumShelf',         'https://quantumshelf.example',  '2023-05-03', 'stealth',  'Quantum-inspired inventory optimization.'),
(6,  'DeepSignal',           'https://deepsignal.example',    '2021-09-12', 'active',   'AI infrastructure for real-time signal analysis.'),
(7,  'TerraVision Robotics', 'https://terravision.example',   '2020-01-28', 'active',   'Robotics for precision agriculture and field inspection.'),
(8,  'RetailPulse',          'https://retailpulse.example',   '2020-08-14', 'active',   'Retail analytics and demand intelligence.'),
(9,  'CivicGrid',            'https://civicgrid.example',     '2022-04-22', 'active',   'Municipal infrastructure and public-service software.'),
(10, 'NovaMaterials',        'https://novamaterials.example', '2019-10-06', 'active',   'Advanced materials for energy storage applications.'),
(19, 'Orbian Technologies',  'https://orbian.example',        '2012-06-18', 'active',   'Industrial software and embedded systems.'),
(20, 'Lumina Bio',           'https://luminabio.example',     '2025-01-05', 'active',   'Early-stage biotech diagnostics company.');

-- ============================================================
-- PEOPLE / FOUNDERS
-- ============================================================

INSERT INTO person (person_id, first_name, last_name, linkedin_url) VALUES
(201, 'Noa',    'Levy',      NULL),
(202, 'Amit',   'Shalev',    NULL),
(203, 'Maya',   'Cohen',     NULL),
(204, 'Omer',   'Levy',      NULL),
(205, 'Dana',   'Barak',     NULL),
(206, 'Eyal',   'Rosen',     NULL),
(207, 'Yael',   'Nir',       NULL),
(208, 'Gil',    'Peled',     NULL),
(209, 'Lior',   'Tal',       NULL),
(210, 'Tamar',  'Sagi',      NULL),
(211, 'Ron',    'Aviv',      NULL),
(212, 'Neta',   'Gal',       NULL),
(213, 'Adi',    'Mor',       NULL),
(214, 'Yoni',   'Katz',      NULL),
(215, 'Shira',  'Lavi',      NULL),
(216, 'Ilan',   'Ben-Ari',   NULL),
(217, 'Roni',   'Shachar',   NULL),
(218, 'Tal',    'Harel',     NULL),
(219, 'Michal', 'Doron',     NULL),
(220, 'Avi',    'Segal',     NULL);

INSERT INTO company_founder
(company_id, person_id, founder_title, start_date, end_date) VALUES
(1,201,'CEO','2018-03-15',NULL),
(1,202,'CTO','2018-03-15',NULL),
(2,203,'CEO','2019-07-01',NULL),
(2,204,'Chief Medical Officer','2019-07-01',NULL),
(3,207,'CEO','2021-02-10',NULL),
(4,205,'CEO','2017-11-20','2024-02-01'),
(4,206,'CTO','2017-11-20','2024-02-01'),
(5,209,'CEO','2023-05-03',NULL),
(6,210,'CEO','2021-09-12',NULL),
(6,211,'CTO','2021-09-12',NULL),
(7,212,'CEO','2020-01-28',NULL),
(7,213,'CTO','2020-01-28',NULL),
(8,214,'CEO','2020-08-14',NULL),
(9,215,'CEO','2022-04-22',NULL),
(9,216,'COO','2022-04-22',NULL),
(10,217,'CEO','2019-10-06',NULL),
(10,218,'Chief Scientist','2019-10-06',NULL),
(19,219,'CEO','2012-06-18',NULL),
(20,220,'CEO','2025-01-05',NULL);

-- ============================================================
-- INVESTORS
-- Human-readable concrete relation; no identity-only lookup join.
-- ============================================================

INSERT INTO investor
(investor_id, name, investor_type, website_url, country_code) VALUES
(11,  'Horizon Ventures',          'venture capital',           'https://horizonvc.example',   'IL'),
(12,  'Cedar Capital',             'venture capital',           'https://cedarcapital.example','IL'),
(13,  'Atlas Growth Partners',     'private equity',            'https://atlasgrowth.example', 'US'),
(14,  'BluePeak Ventures',         'venture capital',           'https://bluepeak.example',    'IL'),
(15,  'Foundry Accelerator',       'accelerator',               'https://foundryaccel.example','IL'),
(16,  'NorthStar Family Office',   'family office',             'https://northstarfo.example', 'US'),
(17,  'National Innovation Fund',  'government',                'https://innovationfund.example','IL'),
(18,  'Harbor Institutional',      'institutional',             'https://harborinst.example',  'US'),
(19,  'Orbian Ventures',           'corporate venture capital', 'https://orbianventures.example','IL'),
(105, 'Ruth Halevi',               'angel',                     NULL,                            'IL'),
(121, 'Sarah Kaplan',              'angel',                     NULL,                            'US'),
(122, 'Daniel Weiss',              'angel',                     NULL,                            'US');

-- ============================================================
-- SECTORS
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
-- investor 16 intentionally has no sector focus
(17,6),(17,8),(17,15),(17,16),
(18,2),(18,13),(18,16),
(19,2),(19,12),
(105,10),(105,11),
(121,3),(121,4),
(122,6),(122,18);

-- ============================================================
-- FUNDING ROUNDS
-- Lesson 2 data; the zero-match company is also retained for
-- compatibility with the preserved Stage 3 candidate.
-- Lumina Bio (20) intentionally has no funding round.
-- ============================================================

INSERT INTO funding_round
(funding_round_id, company_id, round_type, announced_date,
 reported_total_amount, currency_code, pre_money_valuation, post_money_valuation)
VALUES
(1001,1,'seed','2019-06-10',  4000000,'USD', 12000000,16000000),
(1002,1,'series a','2021-05-18', 12000000,'USD', 36000000,48000000),
(1003,1,'series b','2023-09-04', 30000000,'USD', 90000000,120000000),
(1004,1,'series c','2025-11-12', 60000000,'USD', 240000000,300000000),

(1101,2,'seed','2020-02-14',  5000000,'USD', 15000000,20000000),
(1102,2,'series a','2022-07-20', 15000000,'USD', 45000000,60000000),
(1103,2,'series b','2025-03-03', 30000000,'USD', NULL,130000000),

(1201,3,'seed','2023-01-17',  3000000,'USD', 9000000,12000000),
(1202,3,'series a','2025-08-25', 12000000,'USD', 38000000,50000000),

(1301,4,'seed','2018-04-09',  4000000,'USD', 10000000,14000000),
(1302,4,'series a','2020-09-15', 12000000,'USD', 33000000,45000000),
(1303,4,'series b','2023-12-11', 30000000,'USD', 95000000,125000000),

(1401,5,'seed','2025-06-05',  8000000,'USD', 22000000,30000000),

(1501,6,'pre-seed','2022-01-12',  1500000,'USD', NULL,NULL),
(1502,6,'seed','2023-04-27',  4000000,'USD', 11000000,15000000),
(1503,6,'series a','2026-02-19', 15000000,'USD', 50000000,65000000),

(1601,7,'seed','2021-03-30',  5000000,'USD', 15000000,20000000),
(1602,7,'series a','2024-04-08', 15000000,'USD', 45000000,60000000),

(1701,8,'seed','2022-10-13',  4000000,'USD', 12000000,16000000),

(1801,9,'grant','2022-11-07',   750000,'USD', NULL,NULL),
(1802,9,'seed','2024-06-24',  5000000,'USD', 18000000,23000000),

(1901,10,'pre-seed','2020-03-02', 2000000,'USD', NULL,NULL),
(1902,10,'seed','2021-12-06', 8000000,'USD', 22000000,30000000),
(1903,10,'series a','2024-10-21',25000000,'USD', 75000000,100000000),

(2001,19,'debt','2019-08-01',10000000,'USD', NULL,NULL),
(2002,19,'growth','2022-05-16',30000000,'USD', NULL,NULL);

-- ============================================================
-- ROUND INVESTMENTS
-- Lesson 2 data
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
-- COMPANY OFFICES
-- One row per company office period; company 20 intentionally has none.
-- ============================================================

INSERT INTO company_office
(office_id, company_id, city, country_code, office_role, opened_date, closed_date, is_primary)
VALUES
(1,1,'Tel Aviv-Yafo','IL','headquarters','2018-03-15','2022-06-30',0),
(2,1,'Herzliya','IL','headquarters','2022-07-01',NULL,1),
(3,1,'Redwood City','US','office','2024-01-01',NULL,0),
(4,2,'Petah Tikva','IL','headquarters','2019-07-01',NULL,1),
(5,2,'San Francisco','US','office','2025-01-01',NULL,0),
(6,3,'Rehovot','IL','headquarters','2021-02-10',NULL,1),
(7,4,'Tel Aviv-Yafo','IL','headquarters','2017-11-20','2024-02-01',0),
(8,5,'Herzliya','IL','headquarters','2023-05-03',NULL,1),
(9,6,'Tel Aviv-Yafo','IL','headquarters','2021-09-12',NULL,1),
(10,7,'Haifa','IL','headquarters','2020-01-28',NULL,1),
(11,8,'Tel Aviv-Yafo','IL','headquarters','2020-08-14',NULL,1),
(12,9,'Jerusalem','IL','headquarters','2022-04-22',NULL,1),
(13,10,'Haifa','IL','headquarters','2019-10-06',NULL,1),
(14,19,'Petah Tikva','IL','headquarters','2012-06-18',NULL,1);

-- ============================================================
-- OPTIONAL ONE-TO-ZERO-OR-ONE COMPANY EVENT
-- ============================================================

INSERT INTO company_acquisition
(company_id, acquired_date, acquirer_name, reported_price, currency_code, notes)
VALUES
(4, '2024-02-01', 'NorthBridge Payments', 180000000, 'USD', 'FinEdge Systems was acquired after several years of payments-infrastructure growth.');

-- ============================================================
-- NEWS
-- Lesson 1 data
-- ============================================================

INSERT INTO news_source (news_source_id, name, website_url) VALUES
(1,'TechLedger','https://techledger.example'),
(2,'Venture Daily','https://venturedaily.example'),
(3,'MarketWire','https://marketwire.example'),
(4,'HealthTech Review','https://healthtechreview.example');

INSERT INTO news_article
(news_article_id, news_source_id, url, title, published_at, language_code, byline, summary)
VALUES
(1,1,'https://techledger.example/a1','CloudFence raises Series B for cloud security expansion','2023-09-04 09:00:00','en','Maya Stern, Ben Adler','CloudFence announced a new Series B round.'),
(2,2,'https://venturedaily.example/a2','CloudFence opens US office','2024-02-10 12:00:00','en','Ben Adler','The company expanded its US presence.'),
(3,3,'https://marketwire.example/a3','CloudFence closes $60M Series C','2025-11-12 08:30:00','en','Ruth Klein','The company reported a $60M Series C.'),
(4,4,'https://healthtechreview.example/a4','MedOrbit expands remote monitoring platform','2023-03-11 10:00:00','en','Daniel Moss','MedOrbit released new clinical monitoring features.'),
(5,2,'https://venturedaily.example/a5','MedOrbit raises Series B','2025-03-03 09:15:00','en','Daniel Moss, Leah Grant','MedOrbit announced a Series B round.'),
(6,1,'https://techledger.example/a6','GreenRoute applies AI to fleet emissions','2024-01-18 14:00:00','en','Maya Stern','GreenRoute discussed fleet optimization and emissions.'),
(7,2,'https://venturedaily.example/a7','GreenRoute raises Series A','2025-08-25 08:00:00','en','Ben Adler','GreenRoute announced its Series A.'),
(8,3,'https://marketwire.example/a8','FinEdge acquired after years of payments growth','2024-02-01 07:30:00','en','Ruth Klein','FinEdge was acquired.'),
(9,1,'https://techledger.example/a9','DeepSignal launches real-time AI platform','2024-07-14 11:00:00','en','Noam Green','DeepSignal launched a new product.'),
(10,2,'https://venturedaily.example/a10','DeepSignal raises Series A','2026-02-19 09:00:00','en','Noam Green, Ben Adler','DeepSignal announced a Series A.'),
(11,3,'https://marketwire.example/a11','TerraVision deploys agriculture robots','2024-05-02 13:00:00','en','Leah Grant','TerraVision expanded commercial deployments.'),
(12,2,'https://venturedaily.example/a12','CivicGrid wins municipal infrastructure contract','2025-01-16 10:30:00','en','Ruth Klein','CivicGrid signed a public-sector contract.'),
(13,3,'https://marketwire.example/a13','NovaMaterials raises $25M Series A','2024-10-21 08:15:00','en','Maya Stern','NovaMaterials raised a Series A.'),
(14,1,'https://techledger.example/a14','QuantumShelf emerges from stealth','2025-06-05 07:45:00','en','Ben Adler','QuantumShelf announced its seed round and product vision.'),
(15,2,'https://venturedaily.example/a15','Orbian expands embedded AI portfolio','2023-02-08 09:20:00','en','Leah Grant','Orbian expanded its industrial AI offering.'),
(16,1,'https://techledger.example/a16','Cybersecurity funding remains resilient','2025-12-01 06:30:00','en','Maya Stern, Ruth Klein','Sector overview of cybersecurity funding.'),
(17,4,'https://healthtechreview.example/a17','Digital health investment rebounds','2025-04-12 08:40:00','en','Daniel Moss','Sector overview of digital-health investment.'),
(18,3,'https://marketwire.example/a18','Climate technology rounds grow larger','2025-09-30 12:10:00','en','Leah Grant','Climate-tech funding analysis.');

INSERT INTO article_company (news_article_id, company_id) VALUES
(1,1),
(2,1),
(3,1),(3,19),
(4,2),
(5,2),
(6,3),
(7,3),
(8,4),
(9,6),
(10,6),
(11,7),
(12,9),
(13,10),
(14,5),
(15,19),
(16,1),(16,6),
(17,2),
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

COMMIT;