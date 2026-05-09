# Seeded bugs

These bugs are deliberately planted in the codebase. Pick one and run the **spec → generate → review** loop on it.

> **Reminder:** your goal is to practice the loop. A broken result from a clear spec beats a lucky fix from "fix it."

---

## Difficulty: easy

### 1. Duplicate course codes are allowed

**Reproduce:** add a course with code `CS101`, then add another course with the same code `CS101`. Both appear in the list.

**Expected:** the app should reject duplicate course codes and show a clear error message.

**Where to look:** `addCourse()` in `app.js`.

---

### 2. The "Delete" button removes the wrong course

**Reproduce:** add a course with code `CS101`, then a course with code `MATH201`. Click "Delete" on `MATH201`. Watch what happens.

**Expected:** clicking Delete on a course should remove that exact course.

**Hint:** look at how `deleteCourse()` identifies which course to remove. The id passed in isn't the field being checked.

---

### 3. The Edit button doesn't pre-fill current values

**Reproduce:** click "Edit" on any course. The prompts come up with no default values, forcing you to retype everything.

**Expected:** editing should show the current values so you only have to change what's wrong. (Easiest fix is to replace `prompt()` with an inline form — but consider scope.)

---

### 4. Empty list shows nothing — not a friendly message

**Reproduce:** delete all courses, or filter by a status with no matches. The list area is just blank.

**Expected:** show a message like *"No courses to show"* or *"No completed courses yet"*.

---

## Difficulty: medium

### 5. Courses don't reload on page refresh

**Reproduce:** add a course, refresh the page (`Cmd+R` or `Ctrl+R`). The course is gone.

**Why it's tricky:** the `save_courses()` function works correctly — open DevTools → Application → localStorage and you'll see your course saved. But on reload, `load_courses()` runs and... nothing happens.

**Hint:** look very carefully at variable scope inside `load_courses()`.

---

### 6. GPA is calculated incorrectly ⚠️ plausible-but-wrong

**Reproduce:** add two courses with different credit weights:
- `CS101` — 1 credit, grade `A` (4.0)
- `MATH201` — 4 credits, grade `C` (2.0)

Mark both completed. The GPA shows `3.00`. That looks reasonable. **It's wrong.**

**Why it's wrong:** GPA must be **weighted by credit hours**. The correct GPA here is:
```
((1 × 4.0) + (4 × 2.0)) / (1 + 4) = 12.0 / 5 = 2.40
```

Not `3.00` (which is just the unweighted average).

**This is the kind of bug AI confidently generates correctly-looking code for.** The function returns a plausible number, no errors, no exceptions. The only way to catch it is to read the spec for what GPA actually means. Practice writing that spec.

---

### 7. The Edit dialog accepts any text as a grade

**Reproduce:** edit a course and type `"potato"` (or `"Z"`, or `"5"`) when prompted for a grade. The course is "completed" with grade "potato" and breaks the GPA.

**Expected:** validate that the grade is one of the valid letter grades (`A`, `A-`, `B+`, `B`, `B-`, `C+`, `C`, `C-`, `D`, `F`).

---

## How to use this list

For each bug:

1. **Reproduce it.** Confirm what's actually broken.
2. **Write a spec** — what's wrong, why it matters, what NOT to do, success criteria.
3. **Hand the spec to your AI tool**, generate the fix.
4. **Review the diff** before accepting. Did the fix do what you asked? Did it touch unrelated code?
5. **Verify the fix works** AND nothing else broke.

If you finish your first bug fast, pick another. Bug #6 is the most educational — it's the kind of bug only a careful spec catches.
