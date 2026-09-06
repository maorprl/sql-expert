# Course Knowledge Map

**Status:** Working knowledge map  
**Scope:** Relational algebra and SQL foundations for Data Analyst work  
**Purpose:** Define the knowledge and capability space the course must cover, without defining the teaching sequence, stage structure, or scaffolding.

## 1. What this document is

This document maps:

- the concepts the learner must understand;
- the capabilities the learner must be able to demonstrate;
- the dependencies between those concepts and capabilities;
- the major conceptual clusters that the course must eventually cover.

This document is not:

- a syllabus;
- a stage plan;
- a lesson sequence;
- a pedagogical flow;
- a list of exercises;
- a definition of Teaching / Reinforcement / Transfer / Assessment;
- an implementation specification for the SQL Lab.

The course flow may later choose a different instructional order than the structural order shown here, as long as the required dependencies are respected.

## 2. Core learner model

The course should build the learner toward reasoning about data before writing SQL.

The central recurring question is:

> What does one row represent?

From that question follow several related capabilities:

- identifying the grain of a relation or result;
- reasoning about keys and uniqueness;
- reasoning about cardinality between relations;
- predicting how relational operations change row count;
- predicting whether an operation changes output grain;
- recognizing when joins can duplicate information;
- deciding whether an aggregate is still valid after a join;
- selecting the relational operation that matches the analytical question.

## 3. Knowledge dependency map

```text
Relation / Row / Attribute
        |
        v
Grain
        |
        +--------------------+
        |                    |
        v                    v
Keys & Uniqueness       Cardinality
        |                    |
        +---------+----------+
                  |
                  v
        Relational Operations
                  |
      +-----------+-----------+
      |           |           |
      v           v           v
 Selection    Projection     Join
                              |
                              v
                    Join row multiplication
                              |
                              v
                           Fanout
                              |
                              v
                Metric / grain corruption risk
                              |
                 +------------+------------+
                 |                         |
                 v                         v
            Aggregation              Pre-aggregation
                 |
                 v
           GROUP BY / HAVING

Parallel branches:

NULL semantics
      |
      +--> LEFT OUTER JOIN
      |
      +--> missing relationships
      |
      +--> EXISTS / NOT EXISTS

Set reasoning
      |
      +--> UNION-style set thinking
      |
      +--> membership / existence reasoning

Relationship structure
      |
      +--> 1:1
      +--> 1:0..1
      +--> 1:M
      +--> M:N
               |
               v
             Bridge

Row-relative analysis
      |
      +--> Self join
      +--> Subqueries
      +--> Window functions
```

This diagram represents knowledge dependencies, not a required teaching order.

## 4. Knowledge domains

### 4.1 Relations and row meaning

The learner must understand:

- relation;
- row / tuple;
- attribute / column;
- schema;
- relation instance;
- the distinction between the structure of a relation and the current rows stored in it.

The learner must be able to:

- state what one row represents;
- identify when two relations have different grains;
- identify when the same real-world entity can appear in multiple rows without those rows being duplicates.

### 4.2 Grain

Grain is a central concept across the course.

The learner must understand:

- input grain;
- output grain;
- grain preservation;
- grain change;
- why row count alone does not define grain.

The learner must be able to:

- state the grain of a base relation;
- state the grain of a query result;
- predict whether an operation preserves or changes grain;
- distinguish between duplicated values and duplicated entities;
- identify when a metric is valid only at a particular grain.

### 4.3 Keys and uniqueness

The learner must understand:

- candidate uniqueness;
- primary key;
- foreign key;
- composite key;
- uniqueness constraints;
- natural versus surrogate identifiers at a conceptual level.

The learner must be able to:

- identify what uniquely identifies a row;
- explain why a descriptive field such as a name may repeat without implying duplicate rows;
- use keys to reason about possible join multiplicity.

### 4.4 Cardinality

The learner must understand relationship cardinalities including:

- one-to-one;
- one-to-zero-or-one;
- one-to-many;
- many-to-many.

The learner must be able to:

- infer likely output multiplicity from relationship cardinality;
- distinguish relationship cardinality from current observed row counts;
- reason about optional relationships;
- use cardinality to predict whether a join may multiply rows.

### 4.5 Relational operations

The learner must understand relational operations conceptually before relying on SQL syntax.

Core operations include:

- selection;
- projection;
- Cartesian product;
- join;
- grouping / aggregation;
- set-oriented reasoning;
- existence / non-existence reasoning.

The learner must be able to:

- describe what an operation does to rows and columns;
- predict its effect on grain;
- predict its effect on row count where possible;
- connect the relational operation to the analytical request.

### 4.6 Filtering and selection

The learner must understand:

- row filtering;
- predicates;
- conjunction and disjunction;
- comparison logic;
- filtering before versus after aggregation.

The learner must be able to:

- translate a business condition into row-selection logic;
- distinguish row-level filters from group-level filters;
- identify when filtering affects which entities survive without changing the grain of surviving rows.

### 4.7 Projection

The learner must understand:

- selecting attributes;
- reducing visible columns;
- the difference between projection and filtering;
- the possibility that removing identifying attributes can make distinct rows appear identical.

The learner must be able to:

- distinguish visible duplication from actual row identity;
- reason about whether a projected result still exposes the attributes needed to understand its grain.

### 4.8 Cartesian product

The learner must understand:

- pairwise combination of rows;
- why row counts multiply;
- why joins can be understood as constrained combinations rather than as a purely syntactic SQL feature.

The learner must be able to:

- predict the row count of simple Cartesian products;
- use Cartesian-product reasoning to understand join fanout.

### 4.9 Joins

The learner must understand:

- join condition;
- matching rows;
- INNER JOIN;
- LEFT OUTER JOIN;
- joins across different relationship cardinalities;
- joining multiple one-to-many branches.

The learner must be able to:

- predict which rows survive;
- predict likely row multiplication;
- state the output grain after a join;
- identify whether a join introduces repeated information from one side;
- distinguish a valid repeated value from an accidental analytical duplication.

### 4.10 Join fanout

The learner must understand:

- fanout caused by one-to-many relationships;
- multiplication caused by joining multiple detail branches;
- why the same business metric may be repeated after a join;
- why a syntactically valid query can be analytically wrong.

The learner must be able to:

- detect fanout risk before writing or running SQL;
- predict multiplicative effects such as 3 × 3 branch combinations;
- determine whether a metric can safely be aggregated after the join;
- identify when the desired output grain differs from the natural grain of the joined result.

A recurring reasoning check should be possible:

> Can this join change the output grain or the meaning of the metric?

### 4.11 Aggregation

The learner must understand:

- COUNT;
- SUM;
- AVG;
- MIN / MAX;
- grouping;
- aggregate grain;
- grouping keys;
- HAVING.

The learner must be able to:

- identify the grain produced by a GROUP BY;
- distinguish row count from entity count;
- determine whether an aggregate is valid at the current grain;
- understand why aggregation does not automatically repair fanout.

### 4.12 Pre-aggregation

The learner must understand:

- aggregating a detail relation before joining;
- controlling grain before combining relations;
- preserving metric meaning.

The learner must be able to:

- determine when pre-aggregation is needed;
- choose the appropriate grouping grain before a join;
- explain why pre-aggregation prevents some forms of fanout corruption.

### 4.13 NULL and missing relationships

The learner must understand:

- NULL as missing / unknown rather than an ordinary value;
- three-valued comparison implications at a practical level;
- NULLs introduced by outer joins;
- the difference between “no matching row” and “a row with a missing attribute”.

The learner must be able to:

- interpret NULLs in joined outputs;
- avoid treating NULL = NULL as ordinary equality;
- reason about missing relationships.

### 4.14 Existence and non-existence

The learner must understand:

- existence questions as relational questions;
- EXISTS;
- NOT EXISTS;
- semi-join / anti-join reasoning conceptually;
- why existence checks can avoid unnecessary row multiplication.

The learner must be able to:

- answer “has at least one…” questions without introducing irrelevant detail grain;
- answer “has none…” questions correctly;
- distinguish existence logic from joining merely to retrieve attributes.

### 4.15 Many-to-many relationships and bridge tables

The learner must understand:

- why many-to-many relationships require an associative structure;
- bridge / junction tables;
- bridge-table grain;
- the effect of bridges on joins and aggregation.

The learner must be able to:

- identify the grain of a bridge table;
- reason about multiplicity across the bridge;
- avoid double-counting when metrics cross many-to-many relationships.

### 4.16 Subqueries

The learner must understand subqueries as a way to compose relational results.

The learner must be able to:

- use one result as the input to another operation;
- distinguish scalar, set, and relation-producing roles at a practical level;
- recognize when a subquery expresses the reasoning more directly than a multi-join query.

### 4.17 Self joins

The learner must understand:

- a relation joined to itself under different roles;
- aliases as role names;
- hierarchical or comparative relationships within one relation.

The learner must be able to:

- distinguish the roles played by each instance of the same relation;
- reason about the resulting grain and multiplicity.

### 4.18 Window functions

The learner must understand:

- partition;
- ordering within a partition;
- row-relative calculations;
- the distinction between window calculations and GROUP BY aggregation;
- preservation of row-level detail.

The learner must be able to:

- compute metrics over related rows without collapsing them;
- explain the output grain after a window calculation;
- distinguish “collapse to one row per group” from “retain rows and add group-aware information”.

## 5. Cross-cutting analytical capabilities

These capabilities span multiple topics and should not be treated as isolated SQL syntax skills.

### 5.1 Predict before execution

The learner should be able to make explicit predictions about:

- output grain;
- row count or row-count direction;
- duplicated entities;
- preserved or missing entities;
- metric validity.

### 5.2 Diagnose unexpected results

The learner should be able to investigate:

- too many rows;
- too few rows;
- repeated entities;
- unexpected NULLs;
- inflated counts or sums;
- differences between entity count and row count.

### 5.3 Separate relational correctness from business correctness

The learner must understand that:

- a query can execute successfully and still answer the wrong question;
- correct syntax does not guarantee correct grain;
- correct joins do not guarantee correct aggregation;
- analytical correctness depends on the relationship between business meaning and data structure.

### 5.4 Translate business questions into relational questions

The learner should be able to move between:

- business request;
- target output grain;
- required relations;
- relevant relationship cardinalities;
- relational operations;
- SQL implementation;
- sanity check of the result.

This is a capability map, not a required UI flow.

## 6. SQL as implementation layer

SQL belongs in this knowledge map as the implementation language for relational reasoning.

The learner must eventually be able to implement the relevant concepts using SQL constructs including:

- SELECT;
- FROM;
- WHERE;
- JOIN;
- LEFT JOIN;
- GROUP BY;
- HAVING;
- aggregate functions;
- subqueries;
- EXISTS;
- NOT EXISTS;
- self joins;
- common table expressions where useful;
- window functions.

The SQL syntax itself should not replace the underlying relational model.

## 7. Required conceptual connections

The course must eventually make the following connections explicit:

- grain ↔ keys;
- keys ↔ cardinality;
- cardinality ↔ join multiplicity;
- Cartesian product ↔ join behavior;
- join multiplicity ↔ fanout;
- fanout ↔ metric validity;
- grain ↔ aggregation;
- aggregation ↔ pre-aggregation;
- optional relationships ↔ LEFT JOIN;
- NULL ↔ outer-join interpretation;
- existence questions ↔ EXISTS / NOT EXISTS;
- many-to-many ↔ bridge tables;
- GROUP BY ↔ row collapse;
- window functions ↔ row preservation.

## 8. Boundary of this map

This map intentionally does not decide:

- which concept is taught first;
- how many stages exist;
- which concepts belong in the same stage;
- when SQL syntax is introduced;
- what examples are used;
- how much scaffolding each unit receives;
- when hints, schema maps, predictions, or sanity checks appear;
- which concepts are Teaching, Reinforcement, Transfer, or Assessment;
- what counts as mastery;
- what the learner has already demonstrated in a previous implementation.

Those decisions belong to later course-design and pedagogy work.

## 9. Use of this document

Future course work should use this map as a constraint:

- proposed course coverage can be checked against it;
- proposed schemas can be checked for whether they support the required relationships and failure modes;
- proposed stages can be checked for missing prerequisites;
- proposed exercises can be checked for which knowledge nodes they actually exercise;
- course-exit criteria can be traced back to the relevant knowledge and capabilities.

This document should remain independent from any single implementation of the SQL Lab.
