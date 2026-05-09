# Agentic Coding Workshop

A hands-on workshop on working effectively with AI coding assistants — writing better prompts, building project memory, and running structured development loops.

## What's covered

**Demo 1 — Prompting in Practice**
The difference between a vague prompt and a specific one. Same task, two prompts, very different results. Covers what to include: exact formats, constraints, examples, and what *not* to do.

**Demo 2 — Project Memory Files**
How to capture project knowledge in a `CLAUDE.md` / `AGENTS.md` so every new session starts informed. Includes generating one with `/init` and editing it into something trustworthy.

**Demo 3 — The Full Loop**
Brainstorm → Plan → Execute → Review, automated with the Superpowers plugin. When to use the full loop and when a careful prompt is enough.

## Materials

| File | Description |
|---|---|
| `Agentic Coding.pdf` | Slide deck (PDF) |
| `Agentic Coding.pptx` | Slide deck (editable) |
| `Demo 1/demo-1-handout.md` | Prompting handout |
| `Demo 2/demo-2-handout.md` | Memory files handout |
| `Demo 3/demo-3-handout.md` | Full loop handout |

## Practice project — Course Tracker

`course-tracker/` is a small vanilla HTML/JS app used as the hands-on exercise. After the workshop, use it to practice the full loop:

1. Generate a project memory file for your AI tool of choice
2. Pick a bug from `ISSUES.md` — spec it, fix it, review the diff
3. Pick a feature from `FEATURES.md` — same loop

See `course-tracker/README.md` for full instructions.

## Key takeaway

> The model has no memory between sessions. Context is the product. Anything important enough to specify in a prompt is important enough to commit to a file.
