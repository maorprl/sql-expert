# Learner Encounter Pedagogy Step Review Protocol

**Status:** CURRENT PROCESS AMENDMENT  
**Role:** Mandatory step-level pedagogy control for learner-encounter design and post-build review

This protocol supplements `learner-encounter-production-process.md` wherever the Pedagogy Reviewer performs a full pre-build design review or a post-build review of an implemented learner encounter.

Its purpose is to prevent a review from validating only the target capability and core evidence while missing defects in the learner journey that connects those evidence points.

It does **not** establish course content, Stage structure, learner-facing wording, schema choices, or a reusable scaffold template. Those remain decisions of the applicable course and encounter authority.

---

## 1. Mandatory Step Ledger

The Pedagogy Reviewer must inspect the encounter **step by step, in learner order**.

Every learner-visible step, transition, teaching beat, scaffold, evidence surface, SQL handoff, result handoff, and verification action must receive an explicit pedagogical disposition.

For each item, record:

1. **Learner state entering the step** — what the course may legitimately assume the learner currently knows, has established locally, or still needs to infer.
2. **Pedagogical role** — for example orientation, retrieval/reuse, reasoning, measurement, prediction, concept naming, guided practice, implementation bridge, independent implementation, result interpretation, verification, or closure.
3. **Learner action** — what the learner actually has to notice, decide, infer, execute, or explain.
4. **Support present** — teacher guidance, visible premises, optional scaffold, prepared query, solution assistance, visual aid, prior completed evidence, or none.
5. **Why the support is appropriate here** — including why it does not perform reasoning that the learner still needs to do.
6. **Transition function** — what this step makes possible in the next step and whether the handoff is sufficiently supported.
7. **Removal consequence** — what would be lost, weakened, made abrupt, or made unnecessarily repetitive if the step or support were removed.
8. **Finding** — PASS, ADVISORY, REVISION REQUIRED, BLOCKER, or OWNER DECISION REQUIRED under the existing process rules.

A review that discusses only episodes, capability evidence, or selected key steps without accounting for the full learner sequence is incomplete.

---

## 2. Continuity Scaffold Test

When a later encounter reuses a capability that was introduced earlier, the reviewer must distinguish between:

- **first-exposure teaching** — explanation or decomposition needed primarily because the idea is new;
- **continuity scaffold** — support that helps the learner reconnect established reasoning to the current task without performing the new target reasoning for them;
- **evidence scaffold** — support that may affect the strength of a capability claim and therefore must be calibrated to the intended evidence;
- **redundant re-teaching** — repetition that does not serve a justified current purpose.

The rule **“do not automatically repeat first-exposure teaching” must not be interpreted as “remove all scaffolding previously used around that capability.”**

If a later encounter removes or materially thins a scaffold, teaching beat, measurement step, bridge, or verification pattern that existed in a recent prerequisite encounter, the reviewer must require a consequence-grounded rationale:

1. What function did that element serve previously?
2. Is that function still needed at the learner's current course position?
3. If the function is still needed, what now performs it?
4. If nothing performs it, why is the resulting gap pedagogically acceptable?
5. Does the removal increase independence in a way that matches the intended evidence, or does it merely create an unsupported jump?

Absence of this rationale is a review defect.

---

## 3. Measurement / Baseline Test

A baseline, prepared measurement, or other empirical starting point is **not automatically required** merely because a previous encounter used one.

Likewise, determining that a baseline is **not a prerequisite** for the target concept does not establish that it is pedagogically useless.

Where a baseline or measurement could materially support the reasoning journey, the reviewer must separately ask:

- Does it orient the learner to the starting data state?
- Does it create a meaningful before/after comparison?
- Does it support prediction without revealing the conclusion?
- Would it reduce or increase the diagnostic value of the later evidence?
- If omitted, is the learner still given a coherent empirical or structural point of departure?

The disposition must be based on the learner consequence, not on whether the technique is formally prerequisite to the target capability.

---

## 4. Reasoning-to-SQL Bridge Test

Whenever an encounter moves from relational/business reasoning into learner-authored SQL, the reviewer must inspect the handoff explicitly.

The learner should not be required to rediscover first-exposure syntax teaching that the course may legitimately assume. But the encounter must still make clear how the reasoning already established maps into the implementation task.

The reviewer must ask:

- What established relation choice, relationship, Grain, prediction, or operation is being carried into SQL?
- Is the implementation request a natural continuation of that reasoning?
- Is there enough local support to reconnect known SQL vocabulary/structure to the current case?
- Is optional assistance available where appropriate without solving the task by default?
- Does the learner remain responsible for the SQL evidence the encounter intends to collect?

A jump from relational reasoning directly to a thin instruction such as “write the JOIN” is not acceptable merely because JOIN syntax was introduced previously. The reviewer must determine whether the bridge is appropriately reduced or simply missing.

---

## 5. SQL-to-Result Evidence Continuity Test

When SQL execution produces evidence that the learner must interpret, the reviewer must verify that the evidence context preserves the reasoning needed for comparison.

In particular:

- learner-authored SQL should remain visible or immediately recoverable when interpreting its result unless there is a specific pedagogical reason to hide it;
- the prior prediction or reasoning claim should remain visible or immediately recoverable during verification;
- result prominence may increase after execution, but prominence must not erase evidence needed to understand what produced the result;
- assistance surfaces such as `Show solution` must remain local to the authoring tool and must not obscure unrelated evidence surfaces.

The reviewer must treat unnecessary replacement of the SQL surface by the result surface as a possible evidence-continuity defect, not merely a visual-layout choice.

---

## 6. Business Situation / Prompt Test

The full Pedagogy Review must inspect the opening business situation as part of the learner sequence, not only as case-validation background.

The opening request must:

- express a coherent analytical need in natural work language;
- be precise enough to orient the learner;
- avoid sounding like a description of schema structure or a hidden solution specification;
- avoid pre-resolving Grain, Cardinality, relation selection, row behavior, or another judgment the learner is expected to make later;
- provide enough purpose for subsequent information requests and relational operations to make sense.

If exact output fields are necessary only at implementation time, the reviewer should prefer a local output-contract scaffold over loading those fields into the opening business request unless current authority requires otherwise.

---

## 7. Cross-Encounter Progression Check

For a later encounter that explicitly relies on a recent prerequisite encounter, the reviewer must compare the two journeys by **function**, not by visual or step-count symmetry.

The reviewer must identify:

- which earlier functions should disappear because first exposure is complete;
- which should become shorter or optional;
- which should remain because they provide continuity, retrieval, measurement, implementation mapping, or verification support;
- what genuinely new reasoning receives the increased cognitive budget.

The target is not to clone the earlier encounter. The target is to produce a learner journey that is recognizably continuous while transferring responsibility to the learner in justified places.

A later encounter may be shorter. It must not become pedagogically thin merely because previously learned material is not being re-taught.

---

## 8. Pre-Build Review Deliverable

The full Independent Pedagogy Design Review must contain, in addition to its normal findings:

1. a **Step Ledger** covering the entire proposed learner sequence;
2. a **continuity assessment** against the relevant prerequisite encounter when one exists;
3. explicit disposition of any removed or materially reduced scaffold from that prerequisite encounter;
4. explicit review of the reasoning→SQL and SQL→result handoffs where SQL is in scope;
5. a final statement answering:

> Does the encounter form a complete and supportable learner journey, not merely a valid set of capability-evidence checkpoints?

A `PASS` or equivalent approval is invalid if these elements are absent.

---

## 9. Post-Build Review Deliverable

The post-build Pedagogy Review must repeat the Step Ledger against the **actual implemented learner experience** and note any material difference from the approved design.

It must additionally verify:

- that intended continuity scaffolds are actually reachable and legible;
- that optional assistance appears at the intended moment and locality;
- that SQL authoring, execution, results, and verification preserve evidence continuity in runtime;
- that no CSS/state choreography has effectively removed a pedagogically required surface even when the underlying content still exists in the DOM;
- that chapter/encounter switching does not carry stale pedagogical state into another encounter.

Static conformance to design text does not substitute for this runtime pedagogy check.

---

## 10. Scope and Authority Boundary

This protocol strengthens **how pedagogy is reviewed**. It does not decide the correct answer to any particular encounter-design question.

For example, it does not establish that every encounter needs a baseline, the same SQL scaffold, the same number of steps, or the same visual composition. It requires the reviewer to make those differences explicit, consequence-grounded, and consistent with the learner's current course position and the intended evidence.
