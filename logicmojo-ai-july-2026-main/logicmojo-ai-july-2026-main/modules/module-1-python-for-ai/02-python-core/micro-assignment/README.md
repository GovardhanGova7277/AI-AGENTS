# Micro-assignment 1.2: Python core

## Goal

Practise writing reusable code: functions, strings, the core data structures, and comprehensions.

## Rules

Use only what class 1.2 and earlier cover: functions and type hints, string methods, tuples, dicts, sets, list and dict comprehensions, plus the 1.1 basics (variables, f-strings, lists, `if`/`for`/`while`). No classes, files, or NumPy yet. Match each expected output exactly.

## Problems

### Problem 1: Two small functions

Write two type-hinted functions: `rectangle_area(width, height)` returns the area, and `greet(name, greeting="Hello")` returns `"<greeting>, <name>"` with a default greeting. Then call them.

```
area of 3 x 4 = 12
Hello, Ada
Hi, Alan
```

### Problem 2: Clean a messy record

```python
raw = "  Ada Lovelace,  ADA@Math.ORG , London  "
```

This is one line from a scruffy export: three comma-separated fields with stray spaces and inconsistent case. Split it on commas and strip each field. Print the name as-is, the email lower-cased, and the city. Then print the email domain (the part after `@`) and the person's initials (first letter of each name part, upper-cased, joined with dots and a trailing dot).

```
name: Ada Lovelace
email: ada@math.org
city: London
domain: math.org
initials: A.L.
```

### Problem 3: Scores dictionary

```python
scores = {"Ada": 91, "Alan": 72, "Grace": 85}
```

Print `name: score` for each entry (iterate with `.items()`), then the average score to two decimals.

```
Ada: 91
Alan: 72
Grace: 85
average: 82.67
```

### Problem 4: Keep the long words

```python
words = ["ai", "python", "ml", "agent", "rag"]
```

With a list comprehension, build a list of the uppercased words longer than two letters. Print the list, then how many were kept.

```
['PYTHON', 'AGENT', 'RAG']
3 words kept
```

### Problem 5: Shared tags

```python
monday = ["python", "git", "venv", "ml"]
tuesday = ["git", "ml", "numpy", "pandas"]
```

Using sets, find the tags in both lists and the tags in either list. Print each as a sorted list, then the counts.

```
in both: ['git', 'ml']
in either: ['git', 'ml', 'numpy', 'pandas', 'python', 'venv']
2 shared, 6 total
```

### Problem 6: Longest name, without `max()`

```python
names = ["Ada", "Alan", "Grace", "Katherine", "Ed"]
```

Build a dict comprehension mapping each name to its length and print it. Then, without using `max()`, find the longest name and print `longest: <name> (<n> letters)`.

```
{'Ada': 3, 'Alan': 4, 'Grace': 5, 'Katherine': 9, 'Ed': 2}
longest: Katherine (9 letters)
```

## Deliverable

The working script and its output. Fill in `assignment.ipynb` and run it. A plain `.py` file plus its output is also fine.

## How this is checked

A reference solution is released in the `solution/` folder. Compare your output to the expected output above.
