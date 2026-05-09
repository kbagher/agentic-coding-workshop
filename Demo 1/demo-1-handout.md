# Demo #1 — Prompting in Practice

> **Agentic Coding Workshop · Reference handout**
> Keep this. Try the experiment on your own code later.

---

## The task

Build a small Python project for managing university student records.

---

## Round 1 — vague prompt

```
create a small project that allows me to manage university students,
add new, edit, update, etc.. All in memory and using a file storage.
Simple example in python.
```

**What Claude does:** generates a working project — Student class, CRUD functions, file storage. Looks fine at first glance.

**The catch:** the student IDs Claude assigns are random. UUIDs, random integers, or simple counters from 1. **None of them match how a real university issues student IDs** — because we never told Claude what our format is.

---

## Round 2 — specific prompt

Same task, with the missing context filled in:

```
create a small project that allows me to manage university students,
add new, edit, update, etc.. All in memory and using a file storage.
Simple example in python.

Student IDs must follow this format:
- Exactly 7 digits long, stored as a string
- First 2 digits: last 2 digits of the year (2026 → "26")
- Remaining 5 digits: a sequential number, zero-padded
  (00001, 00002, ...)
- Sequence resets each year
- Don't use UUIDs or random numbers — track the next sequence
  internally and persist it with the data
```

**What Claude does:** the same project — but the IDs now look like `"2600001"`, `"2600002"`, `"2600003"`. The format matches what a real registrar would issue.

**Sample of what changes** in the generated code:

```python
def _generate_id(self, year: int) -> str:
    seq = self._next_seq.get(year, 1)
    self._next_seq[year] = seq + 1
    year_part = str(year)[-2:]
    seq_part = str(seq).zfill(5)
    return year_part + seq_part
```

---

## What changed between the two prompts

Round 2 gave Claude three things Round 1 didn't:

| | Habit | What appeared in Round 2 |
|---|---|---|
| 1 | **Specific WHAT and WHY** | Exact ID format spelled out |
| 2 | **One concrete example** | `2026 → "26"` is worth a paragraph |
| 3 | **Constraints and exclusions** | *"Don't use UUIDs or random numbers"* |

Round 1 had none of this. So Claude guessed. Guessing produces *something*. Specifying produces *what you wanted*.

---

## The takeaway

> **The model has no memory between sessions. Context is the product.**
> Anything Claude doesn't know, it invents. The prompt is where you tell it what it doesn't know.

---

## Try it on your own code

Pick a small project of yours — or imagine one. Write the worst prompt you can to describe it. Then rewrite the same prompt with:

- **What** you want (be specific about formats, structures, names)
- **Why** it matters (the business rule, the constraint)
- **One example** of expected input and output
- **One thing not to do**

Run both prompts in fresh chats. Compare what you get back.

You will see the same gap.
