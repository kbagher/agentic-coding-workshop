# Demo #2 — Generating a Project Memory File

> **Agentic Coding Workshop · Reference handout**
> Use this when you create a `CLAUDE.md` / `AGENTS.md` for your own project.

---

## The setup

Continuing from Demo #1, we built a small student-management project. We told Claude that student IDs must follow a specific format — 7 digits, year prefix, sequential. Claude built it correctly.

**But that fix only lasted that session.** Tomorrow, in a new chat, Claude wouldn't remember the ID format. We'd have to re-explain it every time.

Unless we write it down once.

---

## The prompt

Either of these works — use whichever fits your tool.

### Claude Code (one command)

```
/init
```

That's it. Claude scans the project and writes a `CLAUDE.md` for you.

### Any other tool (custom prompt)

```
I want a CLAUDE.md for this project so any new Claude session
understands it without me re-explaining.

Scan these files and produce a CLAUDE.md that covers:
- Project overview (1-2 sentences)
- Stack
- Conventions (specific patterns I'd want enforced)
- What NOT to do (deprecated paths, gotchas, format rules)
- How to run it

Keep it under one screen. Don't include anything that's not
actually in the code.

[paste your project files here]
```

### Same idea, different filename per tool

| Tool | Filename |
|---|---|
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursor/rules/*.mdc` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Antigravity (Google) | `GEMINI.md` |
| Cross-tool standard | `AGENTS.md` |

The filename changes. The discipline is the same.

---

## What appears in the generated file

A typical memory file has 5 sections:

| Section | What it captures |
|---|---|
| **Project overview** | What the codebase is, in 1-2 sentences |
| **Stack** | Language, frameworks, storage, key libraries |
| **Conventions** | Naming, structure, patterns specific to this project |
| **What NOT to do** | Deprecated paths, gotchas, format rules — past mistakes encoded |
| **How to run** | Setup commands, test commands |

In Demo #2, the **Conventions** section captured the exact ID format rule we typed into Claude in Demo #1's Round 2 — the 7-digit format. That rule is now permanent. Every future session in this repo loads it before doing anything else.

---

## Always review what was generated

The first generation is a **draft, not a spec.** Read it carefully and edit it:

- [ ] Cut anything that's not actually true in the code (Claude sometimes invents conventions)
- [ ] Add anything Claude missed
- [ ] Keep the root file under one screen — push details into scoped rule files if it grows
- [ ] Commit it to git so the whole team benefits

You ship the second draft, not the first.

---

## The takeaway

> **Chat dies. Commits live.**
> Anything important enough to specify in a prompt is important enough to commit to a file. The memory file is the project's brain — written down once, loaded automatically every session.

---

## Try it on your own project

1. Pick a project of yours. Any size.
2. Ask Claude to scan it and generate a memory file (use the prompt above, or `/init`).
3. Read what Claude produced. Note what it got right. Note what it missed.
4. **Edit it.** Trim, add, sharpen.
5. Commit it.
6. Open a new Claude session in that repo. Ask it to add a small feature. Notice that you didn't have to re-explain anything.

That's the whole feature.
