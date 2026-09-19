# Agent-Assisted Work Protocol

**Status:** WORKING  
**Role:** Execution / coordination protocol

This document describes how work should be assigned, handed off, reviewed, and synchronized when ChatGPT, Codex, other implementation agents, or independent review models are used on this repository.

It is not pedagogical, visual, Lesson, schema, data, or production-process authority. Those decisions remain in their dedicated current sources.

The purpose of this protocol is to reduce unnecessary handoff loops, preserve source-of-truth discipline, reduce coordination cost, and keep multi-tool execution safe.

## Relationship to learner-encounter production

`learner-encounter-production-process.md` defines the **current production workflow and required quality controls**: current-state grounding, encounter definition, authority-before-build, risk-triggered challenge where needed, implementation boundaries, impact-based validation, acceptance, and durable-record discipline.

This document governs **how that work is assigned and executed**: worker/tool selection, handoff mechanics, implementation-agent usage, branch coordination, remote/local synchronization, and execution efficiency.

This protocol must not bypass a production-process control that is triggered by the actual scope/risk of the work. Conversely, it must not add permanent roles, review loops, or handoff artifacts merely because a previous cycle used them.

## 1. Classify the work before choosing the worker

Treat a task first as one of these kinds of work:

- **Decision / design work** — a pedagogical, learner-flow, visual, evidence, or other authority decision is unresolved.
- **Authority maintenance** — an accepted decision needs to be recorded or reconciled in current-source documents.
- **Implementation work** — current authority is sufficiently clear and code must be brought into conformance.
- **Validation / review work** — an implementation or document change must be checked against authority and actual behavior.

Do not send implementation work back into open-ended design merely because an implementation agent is involved. Do not implement a material unresolved design decision merely to keep execution moving.

## 2. Default division of responsibility

### Primary assistant / orchestrator

Prefer the primary assistant for work it can complete directly and reliably, including:

- reading current authority and repository state;
- maintaining narrow documentation / authority changes after decisions are accepted;
- remote GitHub branch, commit, and diff verification;
- small deterministic repository edits where local execution is not required;
- defining task scope and review criteria;
- reviewing the actual resulting commit / diff against authority.

Do not use the user as a courier between agents for work the primary assistant can perform directly through available repository tools.

### Implementation agent / Codex

Prefer an implementation agent for work that materially benefits from its local development environment, including:

- multi-file implementation changes;
- changes that require understanding and adapting the existing local architecture;
- running builds, tests, or development tooling;
- browser / application test drives;
- iterative implementation where execution feedback is needed.

An implementation agent implements current authority. It is not an alternate design authority.

### Independent challenge / review model

Use an independent model or reviewer when the current production process's **risk-triggered challenge** or impact-based validation rule makes independence useful — for example when protected learner evidence, answer leakage, substantial scaffolding, novel interaction semantics, consequential case trade-offs, or a material conformance claim is difficult for the author to self-validate.

The prompt should be neutral and should not leak the preferred diagnosis as an assumed fact. Independent review is evidence for a decision or validation claim; it does not become authority by itself.

Routine implementation, narrow documentation maintenance, synchronization, and low-risk conformance checking do not require an independent model by default.

## 3. Default handoff pattern

When authority is clear, prefer **one bounded implementation pass followed by review/validation**, not repeated assessment → approval → implementation loops.

A separate assessment-only pass is justified when:

- authority is materially ambiguous;
- implementation architecture may make the requested change non-local or risky;
- the task boundary is unclear;
- a previous implementation attempt revealed interpretation drift;
- a risk-triggered challenge is needed before a material design decision is accepted;
- the reviewer cannot safely determine scope without first seeing an implementation plan.

Otherwise, avoid a preflight round that only restates what can already be established from current authority and code.

Before drafting a repository-changing implementation handoff, the primary assistant must read and apply the current `chatgpt-git-safety.md`. That file owns the ChatGPT-specific baseline-check and executor/reviewer-separation rules.

An implementation handoff should normally identify:

- repository / checkout identity;
- branch and exact expected starting HEAD;
- current working-tree status;
- current authority documents;
- the bounded problem being implemented;
- important behavior that must be preserved;
- explicit out-of-scope areas;
- required validation;
- what to do if a material ambiguity or authority conflict is discovered.

For Codex / implementation-agent work, the agent executes the bounded change and reports execution evidence. It is not asked to perform or claim the final review or approval of its own implementation. After a committed change, the primary assistant reviews the actual commit / diff against its reported parent before making the scope/conformance judgment.

The handoff should not duplicate current authority into a second competing specification or dictate technical implementation details that are not locked decisions.

When durable authority/evidence already exists in the repository, the receiving worker should read that source directly rather than relying on conversational reconstruction. A separate verbatim handoff file is required only when the actual task needs such a durable record; it is not a universal transition rule.

## 4. Decision, implementation, review, and validation boundaries

### Decision boundary

If a material learner-experience, evidence, or pedagogical decision is unresolved, resolve it before implementation depends on it.

If the decision meets the current process's risk-triggered challenge conditions, obtain that challenge before promoting the decision into current authority.

Once accepted, record the material decision in current authority before asking an implementation agent to rely on it.

### Implementation boundary

The implementation agent should use the smallest approach consistent with current authority and existing architecture.

Behavior that already conforms should be preserved. A materially ambiguous authority statement or conflict affecting learner behavior should be reported rather than silently resolved in code.

A genuinely OPEN implementation detail may be chosen locally when the choice is non-pedagogical, does not silently close a broader design question, and follows the smallest existing implementation pattern.

### Review boundary

Review the **actual commit / diff**, not only the implementation agent's summary.

Check as applicable:

- conformance with named authority;
- scope containment;
- preservation of accepted behavior;
- accidental resolution of OPEN decisions;
- regressions or implementation claims unsupported by diff/validation evidence.

### Validation boundary

Use the level of validation appropriate to impact: static diff review, schema/data checks, build/tests, SQL semantic/adversarial validation, targeted browser test, learner-flow test drive, independent challenge, or broader regression.

Do not treat a successful build as evidence that the learner experience is pedagogically correct.

## 5. Remote and local Git state are separate

A remote branch being current does **not** mean an implementation agent's local checkout is current.

Whenever another tool or agent writes directly to the remote branch, the local implementation environment must synchronize before continuing.

Before local implementation resumes:

1. verify the local working tree is clean;
2. fetch the remote state;
3. fast-forward only to the expected remote HEAD;
4. if fast-forward is not possible, stop and report the divergence rather than rebasing, merging, resetting, stashing, or discarding work without instruction.

Status reporting must distinguish explicitly between:

- **remote branch updated / verified**; and
- **local implementation checkout synchronized**.

Do not use the unqualified word “synced” unless both states have actually been established.

### ChatGPT Git safety instructions

ChatGPT-specific Git command safety rules live only in `chatgpt-git-safety.md`. That file is the single source of truth for how the primary assistant must verify checkout identity, HEAD, status, target state, and validation flow before giving the user Git commands.

## 6. Branch ownership and active-work lock

When an implementation agent begins work from an agreed starting HEAD, treat the branch relationship for that task as an active ownership boundary until the implementation is abandoned or reviewed.

Default rule:

- create or use a dedicated task / review branch for implementation work;
- one implementation writer owns that task branch while the handoff is active;
- do not make unrelated direct writes to the branch the implementation agent is expected to rejoin while it is working locally;
- if documentation or authority maintenance must happen concurrently, use a separate branch or wait for a synchronization point;
- do not silently move the expected base underneath active local implementation.

Preferred scalable flow:

`canonical working branch → task branch → implementation → validation/report → actual diff review → promotion to canonical working branch`

Promotion means advancing the canonical working branch only after the change has been reviewed and accepted to its required scope.

If an unavoidable concurrent write changes the canonical branch while local implementation is active:

1. do not push the local implementation commit directly onto the moved canonical branch;
2. preserve implementation on a separate task/review branch;
3. reconcile only under explicit instruction and with conflict reporting;
4. review the reconciled commit against the new base;
5. promote only after review.

## 7. Multi-agent / scale rule

As the workflow scales, avoid multiple active writers on the same branch.

Preferred pattern:

- one active writer per task branch;
- other agents review read-only or work on separate task branches;
- each implementation handoff names the exact starting commit;
- accepted work advances the canonical branch only after review;
- durable repository state, not conversational memory, carries accepted decisions and work state between agents.

Agents should rely on current authority documents, branch / commit identity, and recorded evidence rather than another agent's conversational memory.

## 8. Token and coordination efficiency

Prefer the shortest reliable path from decision to validated change.

In particular:

- do not route narrow documentation edits through Codex when the primary assistant can safely perform them directly;
- do not ask an implementation agent to re-explain repository state that can be inspected directly;
- do not request independent review for routine low-risk execution work;
- do not repeat an assessment-only gate when authority and scope are already clear;
- do not make the user manually relay repository facts that connected tools can verify directly;
- after implementation, review concrete diff/evidence rather than creating multiple summary-only verification loops.

Efficiency must not remove authority, evidence, implementation, or validation boundaries. The goal is fewer redundant handoffs, not fewer safeguards.

## 9. Current practical allocation

Current default allocation:

- **Primary assistant:** authority maintenance, narrow documentation edits, GitHub remote operations, task scoping, and diff / authority review.
- **Codex / implementation agent:** local implementation, builds/tests, and browser-level implementation validation where local execution materially helps.
- **Independent model/reviewer:** risk-triggered design challenge or validation where a genuinely independent perspective materially strengthens the claim.

This allocation may change as tool access changes. The underlying rule remains: assign each task to the worker that can complete it directly with the fewest handoffs while preserving current authority and required controls.
