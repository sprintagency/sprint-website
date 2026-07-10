---
name: claude-md
description: >-
  Create or refresh a repository's root CLAUDE.md — the in-repo brief that every
  Claude Code session and account auto-loads. Use when onboarding a repo, when a
  teammate/other account "doesn't know what the app is", when starting a new
  project, or when the user says "create/refresh/update CLAUDE.md", "document
  this project for Claude", "give agents context", or "onboard this repo".
---

# Author a repo's CLAUDE.md

CLAUDE.md at the repo root is the ONLY project context that loads for **every**
session on **every** account/machine that opens the repo. Per-account Claude
memory (`~/.claude/projects/.../memory/`) is NOT shared, so anything load-bearing
must live in CLAUDE.md (committed) instead. This skill produces a tight, factual
CLAUDE.md so a cold session starts productive.

## When to use
- A repo has no CLAUDE.md (check the root and `.claude/CLAUDE.md`).
- Another account/teammate makes basic mistakes because it lacks context.
- Conventions/architecture changed and CLAUDE.md is stale.
- Starting a new project.

## Steps

1. **Harvest existing context (don't reinvent).**
   - If the maintainer has Claude memory for this repo, read the `MEMORY.md`
     index and skim the files — distill the durable facts (what the app is,
     decisions, conventions, gotchas). Do NOT copy private/half-finished notes.
   - Read `README.md`, any existing `CLAUDE.md`/`AGENTS.md`, `HANDOFF.md`, and
     `.cursor`/other agent docs.

2. **Explore the repo for ground truth.**
   - `package.json` (or pyproject/go.mod/Cargo.toml): framework + versions, and
     the real **scripts** (dev, build, test, lint, typecheck, verify).
   - Top-level dir layout; entry points; how the app is run/previewed
     (`.claude/launch.json` if present); how it's tested.
   - Detect org/style conventions actually in use (design tokens, lint rules,
     commit/PR norms, security model like RLS/auth).

3. **Write CLAUDE.md** at the repo root. Keep it **tight and scannable**
   (~100-160 lines, prose + short lists, no walls of text — it loads every
   session, so every line must earn its place). Suggested sections:
   - **One-paragraph "what this is"** (who uses it, what it does).
   - **Stack** (framework + key services/integrations).
   - **Running & verifying** (exact dev/build/test/lint/typecheck commands; the
     "before you call it done" gate).
   - **Hard conventions** (the non-negotiable rules — link to any enforcing
     skills). Be specific; these prevent the "silly mistakes".
   - **Architecture map** (where routes / components / domain logic / migrations
     live — just enough to navigate).
   - **Data & migrations / security model** (how schema changes get applied;
     auth/RLS boundary; how to verify).
   - **Key subsystems** (the 3-6 features worth naming, with their shared
     components).
   - **Gotchas** (drifting generated types, pending migrations, OS quirks).
   - **Deeper context** (note that per-account memory isn't shared → load-bearing
     facts belong here; point at longer docs).

4. **Facts only.** State what you verified from the repo/memory. Do not guess
   commands or invent conventions — if unsure, check or omit.

5. **Commit + keep fresh.** Offer to commit CLAUDE.md (check it isn't gitignored;
   confirm before pushing to a shared/default branch). Remind the user to update
   it when conventions/architecture change.

## Scope note (say this to the user)
- Committing CLAUDE.md shares it with anyone who clones/pulls **that repo** (any
  account) — the fix for "other account doesn't know the app".
- It is **per-repo**, not drive-wide. For several repos, run this skill in each.
- This skill can live at the **user level** (`~/.claude/skills/`, available in
  every project for one account) and/or be **committed into a repo's
  `.claude/skills/`** (available to every account working in that repo). Either
  way, the shared benefit reaches other accounts through the committed CLAUDE.md
  it produces, not the skill itself.
