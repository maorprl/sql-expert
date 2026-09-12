# Agent-Assisted Work Protocol

**Status:** WORKING  
**Role:** Execution / coordination protocol  

This document describes how work should be divided, handed off, reviewed, and synchronized when ChatGPT, Codex, other implementation agents, or independent review models are used on this repository.

It is not a pedagogical, visual, Stage, schema, or data source of truth. Those decisions remain in their dedicated authority documents.

The purpose of this protocol is to reduce unnecessary handoff loops, preserve source-of-truth discipline, reduce token and coordination cost, and make the workflow safer as more work or more agents are introduced.

## Relationship to learner-encounter production

For learner-encounter production, `learner-encounter-production-process.md` defines the **workflow, functional roles, required gates, independence requirements, durable artifacts, and acceptance logic**.

This document governs **how those required functions are assigned and executed**: worker/tool selection, handoff mechanics, implementation-agent usage, branch coordination, remote/local synchronization, and general execution efficiency.

Where `learner-encounter-production-process.md` requires a specific independent review, gate, or role separation, that requirement remains mandatory. General efficiency guidance in this document does not remove a required learner-encounter production control; it governs how that control is executed.

The functional roles in the learner-encounter production process do not, by themselves, require a permanent one-role-per-agent topology. Concrete agent/run mapping may be decided separately as long as the mandatory independence boundaries are preserved.

## 1. Classify the work before choosing the worker

A task should first be treated as one of these kinds of work:

- **Decision / design work** — a pedagogical, learner-flow, visual, or other authority decision is unresolved.
- **Authority maintenance** — an accepted decision needs to be recorded or minimally reconciled in current-source documents.
- **Implementation work** — current authority is sufficiently clear and code must be brought into conformance.
- **Validation / review work** — an implementation or document change must be checked against authority and actual behavior.

Do not send implementation work back into open-ended design merely because an implementation agent is involved. Do not implement a material unresolved design decision merely to keep execution moving.

## 2. Default division of responsibility

### Orchestrator / primary assistant

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

The implementation agent implements current authority. It is not an alternate design authority.

### Independent review model

Use an independent model only when there is a genuine unresolved decision for which an independent second opinion is useful.

The prompt should be neutral and should not leak the preferred diagnosis as an assumed fact. An independent review is evidence for a decision; it does not become authority by itself.

Routine implementation, documentation, synchronization, and conformance checking do not require an independent model.

## 3. Default handoff pattern

When authority is clear, the default should be **one bounded implementation pass followed by review**, not repeated assessment → approval → implementation loops.

A separate assessment-only pass is justified when:

- the authority is materially ambiguous;
- the implementation architecture may make the requested change non-local or risky;
- the task boundary is unclear;
- a previous implementation attempt revealed interpretation drift;
- the reviewer cannot safely determine scope without first seeing the agent's implementation plan.

Otherwise, avoid a preflight round that only restates what can already be inferred from current authority and code.

An implementation handoff should normally identify:

- branch and expected starting HEAD;
- current authority documents;
- the bounded problem being implemented;
- important behavior that must be preserved;
- explicit out-of-scope areas;
- required validation;
- what to do if a material ambiguity or authority conflict is discovered.

The handoff should not duplicate the authority into a second competing specification or dictate technical implementation details that are not themselves locked decisions.

## 4. Decision and implementation gates

### Decision gate

If a material learner-experience or pedagogical decision is unresolved, resolve it before implementation. If useful, obtain an independent review before accepting the decision.

Once accepted, record the decision in current authority before asking an implementation agent to rely on it.

### Implementation gate

The implementation agent should use the smallest approach consistent with current authority and the existing architecture.

Behavior that already conforms should be preserved. A materially ambiguous authority statement or a conflict that affects learner behavior should be reported rather than silently resolved in code.

A genuinely OPEN implementation detail may be chosen locally when the choice is non-pedagogical, does not silently close a broader design question, and follows the smallest existing implementation pattern.

### Review gate

Review the **actual commit / diff**, not only the implementation agent's summary of what changed.

The review should check:

- conformance with the named authority;
- scope containment;
- preservation of already-working behavior;
- accidental resolution of OPEN decisions;
- regressions or implementation claims that are not supported by the diff or validation evidence.

### Validation gate

Use the level of validation appropriate to the change: static diff review, build/tests, targeted browser test, learner-flow test drive, or broader regression.

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

## 6. Branch ownership and active-work lock

When an implementation agent begins work from an agreed starting HEAD, the branch relationship for that task must be treated as an active ownership boundary until the implementation is either abandoned or reviewed.

Default rule:

- create or use a dedicated task / review branch for implementation work;
- one implementation writer owns that task branch while the handoff is active;
- do not make unrelated direct writes to the branch the implementation agent is expected to rejoin while it is working locally;
- if documentation or authority maintenance must happen concurrently, use a separate branch or wait until the active implementation handoff reaches a synchronization point;
- do not silently move the expected base underneath an active local implementation commit.

The preferred scalable flow is:

`canonical working branch → task branch → implementation → validation/report → review of actual commit/diff → promotion to canonical working branch`

Promotion means advancing the canonical working branch only after the implementation has been reviewed and accepted.

The canonical working branch should therefore be treated as **write-frozen for the affected workstream during an active implementation handoff**, unless the handoff is explicitly paused and the implementation agent is instructed to resynchronize before continuing.

If an unavoidable concurrent write changes the canonical branch while local implementation is active:

1. do not push the local implementation commit directly onto the moved canonical branch;
2. publish or preserve the implementation on a separate task/review branch;
3. rebase or otherwise reconcile only under explicit instruction and with conflict reporting;
4. review the reconciled commit against the new base;
5. promote only after review.

This rule exists to prevent coordination work from creating avoidable divergence and to make multi-agent execution scalable.

## 7. Multi-agent / scale rule

As the workflow scales, avoid multiple active writers on the same branch.

Preferred scalable pattern:

- one active writer per task branch;
- other agents review read-only or work on separate task branches;
- each handoff names the exact starting commit;
- accepted work advances the canonical working branch only after review;
- durable repository state, not conversational memory, carries work between agents.

Agents should rely on current authority documents, branch / commit identity, and recorded evidence rather than on another agent's conversational memory.

## 8. Token and coordination efficiency

Prefer the shortest reliable path from decision to validated change.

In particular:

- do not route narrow documentation edits through Codex when the primary assistant can safely perform them directly;
- do not ask an implementation agent to re-explain repository state that can be inspected directly;
- do not request an independent model review for routine execution work;
- do not repeat an assessment-only gate when authority and scope are already clear;
- do not make the user manually relay repository facts that connected tools can verify directly;
- after implementation, review the concrete diff once rather than creating multiple summary-only verification loops.

Efficiency must not remove the authority, implementation, or validation boundaries. The goal is fewer redundant handoffs, not fewer safeguards.

## 9. Current practical allocation

For the current course workflow, the default allocation is:

- **Primary assistant:** authority maintenance, narrow documentation edits, GitHub remote operations, task scoping, and diff / authority review.
- **Codex:** local implementation, builds/tests, and browser-level implementation validation.
- **Independent model (for example Claude):** only genuine unresolved design questions where an independent second opinion is intentionally requested.

This allocation may change as tool access changes. The underlying rule remains: assign each task to the worker that can complete it directly with the fewest handoffs while preserving authority and review boundaries.
