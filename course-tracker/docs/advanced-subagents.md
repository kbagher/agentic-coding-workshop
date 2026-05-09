# Advanced reference — Subagent pipelines

> This is a **take-home reference**. It was not covered in the live workshop. It's here for students who finish the basic assignment and want to go deeper.

---

## What subagents are

Subagents are specialized AI workers that Claude Code can delegate to. Each runs in its **own isolated context window** with its own system prompt and (optionally) restricted tools. The main Claude orchestrates; subagents do focused work and return a final summary.

Why it matters: writer's exploration noise doesn't pollute reviewer's analysis, reviewer's critique doesn't bias tester's run. Each role gets a clean head.

---

## The three-role pipeline

| Role | Job | Tools |
|------|-----|-------|
| `code-writer` | Implements features/fixes from a spec. Produces a diff. | Read, Edit, Write, Bash |
| `code-reviewer` | Reviews the diff for bugs, security, style. Read-only. | Read, Grep, Glob |
| `code-tester` | Runs tests, validates behavior. | Read, Bash |

---

## Where the files live

```
your-project/
├── CLAUDE.md                      # workflow rule for the team
└── .claude/
    ├── agents/                    # one .md per role, committed to git
    │   ├── code-writer.md
    │   ├── code-reviewer.md
    │   └── code-tester.md
    ├── commands/
    │   └── feature.md             # explicit pipeline trigger
    └── settings.json              # hooks for enforcement
```

Each subagent file is markdown with YAML frontmatter:

```markdown
---
name: code-reviewer
description: MUST BE USED to review diffs for bugs, security, and style after any code change.
tools: Read, Grep, Glob
model: sonnet
---
You are a code reviewer. Analyze the diff and report issues by severity...
```

Project-level (`.claude/agents/`) wins over user-level (`~/.claude/agents/`) on name conflicts.

---

## How they get invoked

Three ways, ranked by reliability:

1. **Explicit:** *"Use the code-reviewer subagent on this diff"* — most reliable.
2. **Slash command:** `/feature add a search button` — guaranteed sequencing if defined in `.claude/commands/`.
3. **Auto-delegation:** main Claude scans `description` fields and routes if it matches the user's task. Best-effort, depends heavily on description wording (action-oriented + "MUST BE USED" phrasing routes better).

Subagent files are loaded **only at session startup**. Add a new one mid-session → restart Claude Code.

---

## Critical caveats

- **No automatic inheritance from main session.** Subagents start with a fresh context — no conversation history, no main system prompt. The only channel from parent → subagent is the prompt string passed via the Task tool.
- **CLAUDE.md inheritance is unreliable.** Regression since Claude Code v2.1.84+ strips CLAUDE.md from some subagents. Duplicate critical rules into each subagent's body; don't assume they inherit.
- **Auto-delegation can be skipped.** If the workflow must always run, wrap it in a slash command and/or enforce with a `Stop` hook. CLAUDE.md alone is a nudge, not a guarantee.

---

## Why this beats writing everything in one big prompt

Context isolation, role-specialized prompts, and tighter tool permissions per role. The reviewer can't accidentally edit code (no Write tool). The tester can't write code either. Each agent gets only what its job needs — easier to trust, cheaper to run, easier to debug.

---

## When NOT to use this pattern

- Quick one-off scripts: setup overhead is wasted
- Exploring unfamiliar APIs: just poke around
- Single-file fixes: a code-reviewer subagent for a 3-line change is theatre
- Solo learning: start with the manual loop until the discipline is in your bones

This pattern earns its keep on **repeated work** where you want consistent enforcement: code reviews on every PR, test coverage gates, security scans before merge.
