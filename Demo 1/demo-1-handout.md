# Demo #1 — Prompting in Practice

> **Agentic Coding Workshop · Reference handout**
> Keep this. Try the experiment on your own code later.

---

## The task

Write a Python function that generates a student university ID.

---

## Round 1 — vague prompt

```
I need a Python function that generates a student university ID.
```

**What Claude does:** invents a format. Often something generic like `STU001`, a UUID, a counter, or a timestamp-based string. Whatever it picks, **it almost certainly doesn't match what your university actually uses** — because we never told it.

---

## Round 2 — specific prompt

```
I need a Python function that generates a student university ID.

Requirements:
- The ID must be exactly 7 digits long, returned as a string
- The first 2 digits are the last 2 digits of the year
  (e.g., 2026 → "26")
- The remaining 5 digits are a sequential number, zero-padded
- Function signature: generate_student_id(year, sequence)
- Don't add input validation — the caller handles that
```

**What Claude does:** produces exactly what we asked for.

```python
def generate_student_id(year: int, sequence: int) -> str:
    """Generate a 7-digit student university ID."""
    year_part = str(year)[-2:]
    sequence_part = str(sequence).zfill(5)
    return year_part + sequence_part


# generate_student_id(2026, 1)      → "2600001"
# generate_student_id(2026, 12345)  → "2612345"
# generate_student_id(2027, 99999)  → "2799999"
```

---

## What changed between the two prompts

Round 2 gave Claude three things Round 1 didn't:

| | Habit | What appeared in Round 2 |
|---|---|---|
| 1 | **Specific WHAT and WHY** | Exact format spelled out |
| 2 | **One concrete example** | `2026 → "26"` is worth a paragraph |
| 3 | **Constraints and exclusions** | *"Don't add input validation"* |

Round 1 had none of this. So Claude guessed. Guessing produces *something*. Specifying produces *what you wanted*.

---

## The takeaway

> **The model has no memory between sessions. Context is the product.**
> Anything Claude doesn't know, it invents. The prompt is where you tell it what it doesn't know.

---

## Try it on your own code

Pick a small function from a project of yours. Write the worst prompt you can — just the task, nothing else. Then rewrite it with:

- **What** you want (be specific)
- **Why** it matters (the business rule, the constraint)
- **One example** of expected input and output
- **One thing not to do**

Run both prompts. Compare the outputs.

You will see the same gap.
