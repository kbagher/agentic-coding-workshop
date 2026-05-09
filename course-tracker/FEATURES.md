# Feature ideas

Same loop. Pick one (or more), write a spec, generate, review.

---

## Difficulty: easy

### 1. Filter courses by semester

The current filter is by status (planned, in-progress, completed). Add a filter that lets the user select a specific semester (e.g., *"Fall 2026"*) and show only courses from that semester.

**Where to look:** the existing `.filters` section in `index.html` and the filter logic in `app.js`.

**Worth thinking about in your spec:** how should this interact with the existing status filter? Both at once, or only one at a time?

---

### 2. Sort courses by code

Add a "Sort by code" toggle so courses display alphabetically by their code (`CS101` before `MATH201` before `PHYS150`) instead of insertion order.

**Worth thinking about in your spec:** ascending only, or both directions? Default behavior on page load?

---

## Difficulty: medium

### 3. Export completed courses to CSV

Add an "Export CSV" button that downloads all completed courses as a CSV file. Columns: code, name, credits, semester, grade.

**Hints:**
- Use `Blob` and `URL.createObjectURL()` — no library needed.
- Be careful with values containing commas or quotes (course names like `"Data Structures, Part II"`).

**Worth thinking about in your spec:** what's the filename? Include the date? What if there are no completed courses?

---

### 4. Tag courses by category

Add a "category" field to courses (e.g., `Core`, `Elective`, `Lab`, `General Education`). The user picks one when adding a course. Show the tag as a small colored badge in the course list.

**Worth thinking about in your spec:**
- Fixed list of categories or user-defined?
- Can a course have multiple tags or just one?
- How does this interact with existing data (courses added before the feature existed)?

---

## Difficulty: hard (ambitious — bonus territory)

### 5. GPA trend chart

Show a simple bar chart of GPA per semester so the user can see their trend over time. **No charting libraries** — render with raw HTML/SVG. Group completed courses by semester, calculate weighted GPA per semester, render bars.

**Worth thinking about in your spec:**
- What if a semester has zero completed courses?
- Sort semesters chronologically — but how do you parse `"Fall 2026"` vs `"Spring 2027"`?
- Show numeric GPA next to each bar?

---

## How to use this list

- Pick a feature that fits the time you have. Easy ones take ~30 minutes. Medium ones take an hour or two. The hard one is a weekend project.
- **Write the spec BEFORE handing it to your AI.** The point isn't to ship the feature — it's to practice the loop.
- The hardest features (GPA trend) are bonus territory. Don't feel obligated.

---

## A note on combining bugs and features

Some bugs and features touch the same code. For example, fixing bug #6 (weighted GPA) is a prerequisite for feature #5 (GPA trend chart). Pick a fix-then-feature combo if you want a more cohesive practice session.
