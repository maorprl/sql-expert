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
This does not determine:
- the first stage;
- the first exercise;
- the first named concept;
- the exact order of grain, keys, cardinality, joins, or aggregation;
- when SQL first appears.
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
The following have not yet been decided:
- the exact first learner encounter;
- whether the course begins with a business problem, direct inspection of relations, or another concrete situation;
- when the term grain is introduced;
- when keys are introduced;
- when cardinality is introduced;
- when JOIN is introduced;
- when SQL first appears;
- how much of the schema is exposed initially;
- the stage structure;
- the overall progression.
These questions must remain open until they are explicitly resolved.
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