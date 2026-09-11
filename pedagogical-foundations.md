Status: WORKING
This document defines only the pedagogical foundations established in the current reconstruction process.
It is not a syllabus, stage plan, lesson sequence, or complete pedagogy specification.
The current course design may rely on:
- course-exit-criteria.md
- course-knowledge-map.md
- the current startup-ecosystem schema and seed data
- the neutral SQL Lab built on that schema
- pedagogical decisions explicitly established in the current reconstruction
Previous course versions, previous pedagogy documents, previous stage structures, previous checkpoints, and remembered decisions are not authoritative.
They must not be imported into the current design unless they are explicitly reconsidered and established again.
The course is not primarily a SQL-syntax course.
Its purpose is to build the learner's ability to reason correctly about relational data and then implement that reasoning in SQL.
The target capability is:
Translate an analytical or business question into a correct relational interpretation, understand what the relevant rows and relationships represent, predict how relational operations affect the data, and write SQL that produces an analytically correct result.
SQL is an implementation language for relational reasoning, not the sole organizer of the course.
Pedagogical decisions in the current reconstruction use three statuses.
A decision that has been explicitly accepted as part of the current course design.
It should not be changed casually or silently.
A current design direction that is strong enough to guide exploration but has not yet been locked.
A WORKING decision may still be revised or rejected.
A question that has not yet been resolved.
An OPEN question must not be silently resolved inside implementation work or treated as if a decision already exists.
The learner should understand what the data represents before SQL syntax is allowed to substitute for that understanding.
This does not determine a universal sequence beyond the locally established current Stage 1, including the exact order of grain, keys, cardinality, joins, or aggregation in later encounters, or the timing of SQL outside the currently designed encounter.
This is currently a working pedagogical direction, not a locked course sequence.
course-knowledge-map.md defines the knowledge and capability space of the course.
It does not automatically define teaching order.
A dependency or connection in the knowledge map must not be converted mechanically into a stage sequence.
A conceptual relationship should constrain teaching order only when the later activity cannot be meaningfully reasoned about without the earlier capability.
Conceptual relatedness alone is not enough.
When a proposed ordering is justified as a prerequisite, ask:
Could the learner meaningfully engage with the later task without first possessing the earlier capability?
If yes, the ordering may be flexible.
If no, the earlier capability may be a genuine prerequisite.
This is a decision rule for evaluating proposed sequences. It does not itself define a sequence.
Pedagogical rules should not be invented only at an abstract level.
When possible, work from a concrete learner situation:
1. define what the learner encounters;
2. define what reasoning the learner must perform;
3. identify what knowledge is genuinely required;
4. inspect what works or fails pedagogically;
5. extract a broader rule only if the concrete case justifies one.
This is intended to avoid both extremes:
- principles so general that they cannot guide decisions;
- course-specific choices disguised as universal pedagogical rules.
The learner can provide evidence about:
- confusion;
- cognitive load;
- relevance;
- pacing;
- whether something is understood;
- whether an activity feels artificial or disconnected.
The learner is not expected to determine the correct teaching sequence or instructional design.
Those decisions belong to the course-design process.
The SQL Lab, schema, and dataset are infrastructure.
Their structure and available features do not determine what should be taught first, what deserves a stage, or how a concept should be taught.
The schema provides opportunities for learning; it does not define the course sequence.
The startup-ecosystem schema deliberately contains relational situations such as:
- 0 / 1 / many relationships;
- many-to-many bridges;
- fanout;
- missing relationships;
- NULL values;
- aggregation at different grains;
- temporal sequences;
- hierarchical sectors and geography;
- structures suitable for CTEs, recursive CTEs, and window functions.
These are available learning opportunities.
They do not imply:
- one lesson per schema feature;
- one stage per relation;
- a teaching order derived from the database structure.
Before a learner encounter is promoted into a stage, the design should be able to answer:
- What new reasoning capability is this intended to develop?
- Why is this learner encounter needed at this point?
- What prior capability does it genuinely depend on?
- What evidence would show that the intended idea was understood?
If these questions cannot yet be answered, the stage design is premature.
This gate does not prescribe what the answers must be.
The course does not need a complete rigid sequence before concrete design begins.
A safer current working method is:
1. propose a small learner move;
2. inspect its prerequisite assumptions;
3. evaluate whether it serves the course purpose;
4. check it against the exit criteria and knowledge map;
5. refine or reject it;
6. only then consider the next move.
A local sequence should not be treated as globally fixed merely because it was designed first.
For the current course design, Stage 1 is the first learner encounter, using the `news_article → news_source` business case. Its learner-route and interaction-decisions documents establish the first introduction of Grain, Primary Key / Foreign Key, Cardinality, and JOIN, including their exact Stage 1 timing.
Those documents also establish locally distinct placements for prepared SQL used as a measurement tool, explicit SQL syntax instruction, and independent learner-authored SQL. They do not define a broader course-level rule for the timing of SQL or new SQL constructs outside the currently designed encounter.
The following remain OPEN at broader course scope:
- how much of the schema is exposed initially;
- the broader course stage structure beyond the concrete current Stage 1;
- the overall progression.
These broader questions must remain open until they are explicitly resolved.
Before treating a pedagogical claim as part of the current course design, verify that it was established in the current reconstruction.
If it comes only from an older course version, older chat, older checkpoint, previous pedagogy file, or remembered decision, it is not current source of truth.
When uncertain, keep the issue OPEN rather than importing an old answer.
This document should remain a foundation, not become the course itself.
The next pedagogical work should evaluate concrete candidate learner experiences against:
- the course purpose;
- the current exit criteria;
- the current knowledge map;
- the explicitly established foundations above.
New pedagogical rules should be added only when they are actually established in the current reconstruction.

## WORKING — Guided reasoning progression

When the course guides a learner through a multi-step reasoning process, the learner should remain oriented within that process: what problem is being worked on, what has already been established, and why the next reasoning move is relevant.

Guidance should preserve this continuity without performing the reasoning for the learner.

This does not prescribe a fixed interaction pattern, require an explanation between every step, or determine a universal amount of scaffolding.

## WORKING — Relation Identification from the Business Question

The learner must be able to connect the business question, the information required to answer it, and the relations that provide that information. When identifying relevant relations is part of the intended relational reasoning, the learner should determine them from the available schema rather than receive the required relation set pre-resolved.

This principle is not JOIN-specific. The business question and the relational reasoning needed to answer it determine how many relations are relevant. Relation identification may be its own learner interaction or be embedded in another interaction, depending on the reasoning capability and evidence required by the stage. The requirement is to preserve relational interpretation when that interpretation is itself part of the intended learner capability; this principle does not prescribe a UI mechanism.

## WORKING — First JOIN Teaching Encounter: Reusable Architecture

The first JOIN teaching encounter is a calibrated sequence validated through the current Stage 1 business case, not a universal template for later stages. Its validated progression is: concrete business problem → identify the required relations → relational key connection → PK/FK → Cardinality → requested output-row meaning → Grain → baseline when needed to reason about row-count preservation → prediction before execution → semantic relational action → JOIN terminology → INNER JOIN / ON syntax before independent SQL implementation → SQL implementation → verification against expected grain and relational behavior.

The business case for this first JOIN teaching encounter should retain the same relational shape: a base relation supplies the target output grain; each base row matches one referenced row through FK → PK; attributes are added from that referenced relation; and the JOIN preserves the base-row grain and row count. Grain, PK/FK, Cardinality, and JOIN remain first-exposure concepts here, so this scaffolding remains appropriate.

Baseline measurement and prediction belong here only when they support reasoning about grain or row-count preservation; `COUNT(*)` is not required in every stage. The exact number of learner steps, exactly four Working Schema relations, answer choices, baseline value, and relation names are not pedagogical invariants. Later stages must not automatically repeat this full scaffolding: it should decrease or change as concepts are reinforced or transferred. The current Stage 1 business case is evidence of this teaching architecture, not reusable content itself.
