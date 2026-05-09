# Course Tracker

A small course-tracking app for the **Agentic Coding Workshop**. Vanilla HTML/JS, no build tools, no dependencies.

## What it does

Track courses across semesters, mark them complete with grades, see your cumulative GPA. Persists to `localStorage`.

## How to run

Open `index.html` in your browser. That's it. No `npm install`, no build step, no dev server.

To clear your data, open the browser console (`F12` or `Cmd+Opt+I`) and run:

```javascript
localStorage.removeItem('courses');
```

## Project structure

```
course-tracker/
├── index.html              The page
├── app.js                  All the logic
├── styles.css              Styling
├── README.md               This file
├── ISSUES.md               Seeded bugs to fix (your assignment)
├── FEATURES.md             Feature ideas to add (your assignment)
├── docs/
│   └── advanced-subagents.md   Optional deeper reference
└── .gitignore
```

## Your assignment

After the workshop:

1. **Generate a project memory file** for whichever AI tool you use:
   - `CLAUDE.md` for Claude Code
   - `AGENTS.md` (universal — Cursor, Copilot, Antigravity, Windsurf, and others read it natively)
   - `GEMINI.md` for Antigravity
   - `.cursor/rules/*.mdc` for Cursor
   - `.github/copilot-instructions.md` for GitHub Copilot

2. **Document one convention** you spot in the codebase, in your memory file's Conventions section. (Hint: look at how the functions are named.)

3. **Pick one bug from `ISSUES.md`** — write a spec, generate a fix, review the diff before accepting.

4. **Pick one feature from `FEATURES.md`** — same loop.

You're being graded on the process, not the fix. **A broken result with a good spec and a visible review beats a working fix from "fix it."**

## A note on commitment

`.claude/`, `.cursor/`, `.github/instructions/`, `.agent/` and similar tool-specific folders **should be committed to git** so your team benefits from the same context. They are deliberately not in `.gitignore`.

## Going further

- See `docs/advanced-subagents.md` for an advanced reference on subagent pipelines (writer / reviewer / tester) — useful once you're comfortable with the basic loop.
- The Superpowers plugin (`github.com/obra/superpowers`) automates the brainstorm → plan → execute → review loop. Worth installing once you've practiced the discipline manually.
