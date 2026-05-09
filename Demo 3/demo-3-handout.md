# Demo #3 — The Full Loop, Automated

> **Agentic Coding Workshop · Reference handout**
> What Superpowers does — and when it's worth reaching for.

---

## The setup

Continuing from Demo #2: we have the student-manager project, with a `CLAUDE.md` that captures the project's rules. Now we want to add a **search feature** so students can be found by name.

We could just write a careful prompt with all the requirements, like Demo #1 Round 2. **For this demo, we used Superpowers instead** — a Claude Code plugin that automates the full *brainstorm → plan → execute → review* loop.

---

## The prompt

Deliberately vague:

```
I want to add a search feature to find students in this project.
```

That single sentence triggers Superpowers' `brainstorming` skill **before any code is written.**

---

## What Superpowers asked us

| Question | Our answer |
|---|---|
| Which fields should search look at? | Name only |
| Exact match or partial substring? | Partial substring |
| Case-sensitive? | No |
| How should results be sorted? | By student ID, ascending |
| What if there are no matches? | Return an empty list |
| Pagination or all results? | All matches, no pagination |
| Diacritics — should "Lina" match "Liná"? | ASCII only for now |

**Notice what just happened:** we walked in with a vague request, and walked out with a clear specification — without writing any code yet. That's the spec discipline from Part 4, enforced automatically.

---

## What ran after brainstorming

| Phase | Skill | What it did |
|---|---|---|
| Plan | `writing-plans` | Wrote a spec + a list of 2-5 minute tasks |
| Setup | `using-git-worktrees` | Isolated the work in its own worktree |
| Execute | `subagent-driven-development` | Ran each task in a fresh subagent |
| Review | `requesting-code-review` | Ran between tasks; blocks on critical issues |

We stopped the demo at the first task. In a real session, this continues until the feature is done — every task spec'd, executed, and reviewed automatically.

---

## ⚠️ Honest note — Superpowers is overkill for this task

A 10-line search function does not need this much machinery. The brainstorming overhead outweighs the time saved. **We used Superpowers here to showcase the loop, not to recommend it for tasks of this size.**

Reach for Superpowers when:
- The change spans multiple files
- The feature has unclear requirements you'd otherwise want a teammate to spec-review
- The work is big enough to benefit from automatic task breakdown
- You're tackling a refactor where each step needs to be reviewed before the next

For a one-line fix, a small bug, or exploratory poking — **skip it.** Use a careful prompt with explicit requirements (Demo #1 Round 2 style). The discipline is what matters; the tool just enforces it for bigger work.

---

## The takeaway

> **The discipline matters more than the tool.**
> Whether you run the loop manually or let Superpowers run it for you, the steps are the same: spec, generate, review, iterate. If you learn the loop, you can move between Cursor, Claude, Copilot, or whatever comes next without losing your footing.

---

## Try it on your own work

1. Pick a task from a project of yours that's bigger than a one-liner — a small feature, a refactor, anything you've been putting off because the spec isn't clear.
2. **Don't write the spec yourself first.** Just describe what you want, vaguely.
3. If you're using Claude Code: install Superpowers (`/plugin install superpowers@claude-plugins-official`), then describe the task in chat. Watch brainstorming fire.
4. If you're not using Claude Code: do the loop manually. Brainstorm with Claude → write a spec → ask Claude to break it into tasks → execute one task → review the diff before continuing.
5. Either way, **save the spec and plan files**. They're more valuable than the code.

---

## Going further (after the workshop)

- **Read the Superpowers skills directly** — open-source markdown files at `github.com/obra/superpowers/tree/main/skills`. Even if you never install it, the skill files themselves are excellent references for what good spec, plan, and review look like.
- **The advanced reference** — `docs/advanced-subagents.md` in the practice repo covers manual subagent composition (writer / reviewer / tester pipelines) for when you want this discipline without a plugin.
