Status: WORKING
This document defines only the pedagogical foundations established in the current reconstruction process.
It is not a syllabus, stage plan, lesson sequence, or complete pedagogy specification.
The current course design may rely on:
- course-exit-criteria.md
- course-knowledge-map.md
- the current startup-ecosystem schema and seed data
- the neutral SQL Lab built on that schema
- pedagogical decisions explicitly established in the current reconstruction
- the dedicated current Lesson 1–3 authority documents for encounter-local decisions; their repository paths retain historical `stage-*` naming where applicable
Previous course versions, previous pedagogy documents, superseded stage structures, previous checkpoints, and remembered decisions are not authoritative.
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
This does not determine a universal sequence beyond the encounter-local sequences explicitly established for the current Lessons 1–3 design. It does not prescribe the order of grain, keys, cardinality, joins, aggregation, or SQL timing in future encounters that have not yet been designed.
This is currently a working pedagogical direction, not a locked universal course sequence.
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
For the current course design, Lesson 1 is the first learner encounter, using the `news_article → news_source` business case. Its learner-route and interaction-decisions documents establish the first introduction of Grain, Primary Key / Foreign Key, Cardinality, and JOIN, including their exact Lesson 1 timing. The repository retains `stage-1` in internal paths and identifiers; that historical naming does not change the learner-facing `Lesson 1` label.
Those documents also establish locally distinct placements for prepared SQL used as a measurement tool, explicit SQL syntax instruction, and independent learner-authored SQL. They do not define a broader course-level rule for the timing of SQL or new SQL constructs outside that encounter.
Current Lesson 2 authority establishes encounter-local reuse and extension of already introduced relational reasoning. Its exact local sequence is not a universal template for future encounters. Current Lesson 3 authority in `course-design/stage-3/stage-3-authority.md` establishes the zero-match INNER JOIN / entity-coverage encounter from the accepted Lessons 1–2 baseline. The older Stage 3 route and interaction files remain candidate/history only.
The following remain OPEN at broader course scope:
- how much of the schema is exposed initially in future contexts where that question matters;
- the course structure beyond the current Lesson 3 design authority;
- the overall progression beyond the current implemented encounters toward full exit-capability coverage.
These broader questions must remain open until they are explicitly resolved.
Before treating a pedagogical claim as part of the current course design, verify that it was established in the current reconstruction.
If it comes only from an older course version, older chat, older checkpoint, superseded pedagogy file, or remembered decision, it is not current source of truth.
When uncertain, keep the issue OPEN rather than importing an old answer.
This document should remain a foundation, not become the course itself.
Future pedagogical work should evaluate concrete candidate learner experiences against:
- the course purpose;
- the current exit criteria;
- the current knowledge map;
- the explicitly established foundations above.
New pedagogical rules should be added only when they are actually established in the current reconstruction.

## WORKING — Guided reasoning progression

When the course guides a learner through a multi-step reasoning process, the learner should remain oriented within that process: what problem is being worked on, what has already been established, and why the next reasoning move is relevant.

When a learner action produces evidence or a conclusion that will be used later, the experience should make the instructional purpose of that result intelligible: connect what was established to why it matters for the current problem and what question, decision, or reasoning move it enables next. Evidence should not be left as an isolated fact when its significance is necessary for the learner to understand why the next move exists.

Guidance should preserve this continuity without performing the reasoning for the learner. Explaining why established evidence matters must not supply the learner's next inference or answer.

This does not prescribe a fixed interaction pattern, require an explanation between every step, or determine a universal amount of scaffolding.

## WORKING — Teacher continuity and reasoning thread

Across the current course, the learner should experience one continuous teacher relationship rather than a series of disconnected narrators. Within an encounter, that teacher carries one argument forward; across encounters, the same teacher recognizes established prior work and changes how much it explains as the learner gains experience.

Teacher guidance begins from what the learner has just established when that contribution matters to the next move, and connects it to why the next reasoning question now matters.

Teacher voice should be spent on reasoning purpose, interpretation, and the naming or explanation of genuinely new ideas rather than on interface logistics that the tool or layout can communicate directly. When the learner is actively working — for example authoring SQL, running a prepared measurement, or inspecting produced evidence — the teacher should normally become quieter and let the work surface lead. The teacher returns when the produced evidence needs interpretation or the reasoning argument needs to move forward.

When a concept is named for the first time, the explanation should attach the formal term to meaning the learner has already established. Later reuse of the same concept should normally use, confirm, or correct it rather than automatically re-teach it as a first exposure. Prior encounter alone does not prove mastery, so later encounters may still retain reasoning or support where their evidence requires it.

The course should maintain a functional reasoning thread sufficient to reconstruct the argument so far. Where relevant to the encounter, that thread includes:

- the persistent business question;
- the ordered facts the learner has established;
- the current reasoning question;
- the evidence currently in play;
- the learner's active prediction or expectation when later verification depends on it.

The thread should preserve learner-attributed contributions rather than replace them with an administrative transcript or a fresh canonical restatement at every step. It is ordered by the logic of the argument, not by quiz identifiers or implementation-state names. This is a functional continuity requirement; it does not require a particular panel, transcript layout, or state-storage representation.

Progression should not create a standalone learner state whose only purpose is to acknowledge an already-completed move before the next reasoning move can begin. Corrective or consolidating feedback and the next move may remain distinct content, but they should be connected to the reasoning that produced them. Learner-paced teaching progression that reveals a genuinely new explanatory layer is not an acknowledgement-only state.

## WORKING — Conservative reuse and scaffolding reduction

Reuse should reduce explanatory and ceremonial load before removing reasoning structure. A concept or relational pattern having appeared earlier does not, by itself, establish mastery, retention, independent transfer, or permission to remove an encounter's required reasoning evidence.

When competence is being reused, first ask whether the same reasoning move still matters to the current encounter. If it does, preserve the move while reducing unnecessary re-teaching, repeated terminology, duplicate checks, acknowledgement cycles, or explanatory weight. Structural removal should follow only when the current encounter no longer needs that reasoning move or when evidence justifies a different interaction.

The amount of instructional attention may therefore reflect novelty: genuinely new reasoning can receive fuller explanation, assessment, and pacing, while reused reasoning may receive lighter confirmation or correction-on-error where the encounter permits it. This principle does not create a universal rule that every reused concept becomes implicit or unassessed.

The governing preference is: **reduce explanation before reducing structure**.

## WORKING — Relation Identification from the Business Question

The learner must be able to connect the business question, the information required to answer it, and the relations that provide that information. When identifying relevant relations is part of the intended relational reasoning, the learner should determine them from the available schema rather than receive the required relation set pre-resolved.

This principle is not JOIN-specific. The business question and the relational reasoning needed to answer it determine how many relations are relevant. Relation identification may be its own learner interaction or be embedded in another interaction, depending on the reasoning capability and evidence required by the stage. The requirement is to preserve relational interpretation when that interpretation is itself part of the intended learner capability; this principle does not prescribe a UI mechanism.

## WORKING — Business Question Precision and Non-Preemption

A learner-facing business question should define a concrete analytical or business need precisely enough that the learner can determine what information is required and why the task matters.

Precision does not mean pre-resolving the relational reasoning the learner is expected to perform. When a later interaction is intended to elicit a conclusion such as relevant relations, result Grain, relationship Cardinality, row behavior, or the relational operation to use, the business question should not state that conclusion in equivalent form before the learner reasons it out.

The business question should therefore distinguish between:

- information the business genuinely requests and the learner needs in order to interpret the task;
- relational conclusions the learner is expected to derive as evidence of capability;
- implementation details or exact output-contract details that can be disclosed later when they become necessary for SQL authoring.

The question should remain concise enough that incidental field lists, implementation wording, or explanatory detail do not obscure the core business need. This is not a rule to make business questions vague: omitted information must not turn the task into a guessing exercise. The design goal is a precise problem statement without answer leakage.

## WORKING — First JOIN Teaching Encounter: Reusable Architecture

The first JOIN teaching encounter is a calibrated sequence validated through the current Lesson 1 business case, not a universal template for later Lessons. Its validated progression is: concrete business problem → identify the required relations → relational key connection → PK/FK → Cardinality → requested output-row meaning → Grain → baseline when needed to reason about row-count preservation → prediction before execution → semantic relational action → JOIN terminology → INNER JOIN / ON syntax before independent SQL implementation → SQL implementation → verification against expected grain and relational behavior.

The business case for this first JOIN teaching encounter should retain the same relational shape: a base relation supplies the target output grain; each base row matches one referenced row through FK → PK; attributes are added from that referenced relation; and the JOIN preserves the base-row grain and row count. Grain, PK/FK, Cardinality, and JOIN remain first-exposure concepts here, so this scaffolding remains appropriate.

Baseline measurement and prediction belong here only when they support reasoning about grain or row-count preservation; `COUNT(*)` is not required in every Lesson. The exact number of learner steps, exactly four Working Schema relations, answer choices, baseline value, and relation names are not pedagogical invariants. Later Lessons must not automatically repeat this full scaffolding: it should decrease or change as concepts are reinforced or transferred. The current Lesson 1 business case is evidence of this teaching architecture, not reusable content itself.

## WORKING — Cardinality reasoning from relationship structure

An FK-to-PK connection establishes which fields and relations are connected; it does not, by itself, establish the full Cardinality of that relationship. Cardinality is reasoned by considering possible participation and multiplicity in both directions, using the structural constraints and domain meaning available in the encounter.

The reusable questions are: for one X, how many Y can participate; and for one Y, how many X can participate? An FK may itself be constrained `UNIQUE`, so this reasoning must not be reduced to the claim that foreign keys can repeat. Observed seed rows may illustrate a relationship, but they are not sufficient as the sole evidence for structural Cardinality.

When Cardinality is a first exposure, the encounter should explicitly reason through both directions before introducing the formal Cardinality term or notation. Later encounters may reuse the same reasoning model more compactly when their learner evidence does not require first-exposure treatment. This establishes a decision rule, not a universal interaction pattern or Lesson sequence.
