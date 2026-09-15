# ChatGPT Git Safety Instructions

**Audience:** ChatGPT / primary assistant  
**Purpose:** Mandatory self-instructions before giving the user Git commands or performing Git coordination for this repository.

When the user says **“read `chatgpt-git-safety.md`”**, **“use the Git safety instructions”**, or equivalent wording, read and apply this file before giving any Git command.

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

## 8. Core rule

> **No user-facing Git state-change command without verified checkout identity, current HEAD, current status, and a defined target state. Prefer exact detached validation over modifying the user's local branch topology when validation is the only goal.**

If any of those prerequisites is missing, first obtain the minimum missing evidence. Do not guess.