# ChatGPT Git Safety Instructions

**Audience:** ChatGPT / primary assistant  
**Purpose:** Mandatory self-instructions before giving the user Git commands, performing Git coordination, or preparing a repository-changing handoff to Codex / another implementation agent for this repository.

Before any repository-changing Codex / implementation-agent handoff, read and apply the current version of this file. Also read and apply it when the user says **“read `chatgpt-git-safety.md`”**, **“use the Git safety instructions”**, or equivalent wording.

These rules are specifically for ChatGPT. They are not instructions for the user to manage Git on ChatGPT's behalf.

## 1. Establish the actual local checkout before prescribing Git state changes

Do not give the user a Git command that changes local repository state unless the relevant checkout identity and current state have been established from actual evidence, or still-current evidence from the immediately preceding interaction can safely be reused.

Required evidence:

```text
git rev-parse --show-toplevel
git rev-parse HEAD
git status -sb
```

Before selecting a command, determine the intended target state:

- which repository / checkout is being affected;
- which exact commit, branch, or remote ref is the target;
- whether the purpose is implementation, synchronization, validation, or promotion.

## 2. Never infer local Git topology from GitHub state

A branch created or verified on GitHub does **not** imply that the user's checkout has:

- a local branch with that name;
- a tracking branch;
- a remote-tracking ref;
- a refspec that fetches that branch.

Do not infer any of these from remote state.

## 3. The user is not the Git operator for ChatGPT's workflow

If ChatGPT created a remote branch or commit, ChatGPT is responsible for producing the correct command for the user's verified checkout.

Do not ask the user to repair branch tracking, refspecs, divergence, or checkout topology merely because ChatGPT chose a remote workflow that does not match the verified local checkout.

Prefer one copy-pasteable command tailored to the known state when the user only needs to perform a bounded action.

## 4. Validation should disturb the user's checkout as little as possible

When the purpose is only to validate an exact remote implementation commit, prefer a bounded detached-validation flow using the exact fetched ref / `FETCH_HEAD` rather than creating or modifying local branch topology.

Do not update or move the user's local `main` merely to validate another commit or task branch.

After fetching or moving to a validation target, verify:

```text
git rev-parse HEAD
```

against the exact expected SHA before proceeding to build, tests, browser validation, or promotion.

## 5. Dangerous reconciliation commands are exceptional

Do not use any of the following as default recovery mechanisms:

- `rebase`
- `cherry-pick`
- `reset`
- `merge`
- `stash`
- force operations

Use one only when the verified repository state shows a real reconciliation need and that exact operation is justified. Never prescribe one merely because another checkout, branch, or remote moved.

## 6. Distinguish remote state from local state

Always distinguish explicitly between:

- remote branch / commit updated or verified;
- local checkout synchronized;
- local checkout temporarily detached for validation;
- canonical branch promoted.

Do not use vague language such as “synced” unless the relevant states have actually been verified.

## 7. Reuse verified evidence; do not make the user repeat diagnostics unnecessarily

If checkout path, HEAD, and status were already verified and nothing relevant has changed, reuse that evidence.

Do not make the user rerun diagnostic commands just because ChatGPT lost track of the workflow.

## 8. Codex / implementation-agent handoff and review separation

Before drafting any repository-changing handoff to Codex or another implementation agent, ChatGPT must apply this file and preserve an explicit execution/review boundary.

The handoff must require the implementation agent to establish and report, before changing files:

- the repository / checkout being used;
- the current branch;
- the exact starting `HEAD` SHA;
- the current working-tree status;
- any mismatch, divergence, or unrelated pre-existing change that makes the requested baseline unsafe.

The reported starting SHA is the implementation baseline. The implementation agent must not silently switch branches, reset, rebase, merge, pull, discard work, or broaden the task to repair unrelated state.

The implementation agent is the **executor**, not the final reviewer or approver of its own change. It may:

- inspect the repository;
- implement the bounded task;
- run builds, tests, browser checks, or other requested validation;
- report execution results and discovered blockers;
- create the requested focused commit.

It must not be asked to perform or claim the final diff review, conformance approval, acceptance verdict, or promotion decision for its own implementation.

After a committed implementation, the handoff must require reporting at least:

- new commit SHA;
- parent / starting SHA;
- branch;
- working-tree status.

The primary assistant must then retrieve and review the **actual commit / diff against the reported parent**, rather than relying on the implementation agent's summary. The primary assistant owns the final scope/conformance review unless a separate independent reviewer is explicitly required by current process or risk.

If implementation exposes a material issue outside the bounded task, report it without automatically expanding the implementation scope. A separate issue may be opened only when the user or current authority explicitly authorizes that additional work.

## 9. Core rule

> **No user-facing Git state-change command without verified checkout identity, current HEAD, current status, and a defined target state. No repository-changing Codex handoff without an explicit starting SHA and executor/reviewer separation.**

If any prerequisite is missing, first obtain the minimum missing evidence. Do not guess.
