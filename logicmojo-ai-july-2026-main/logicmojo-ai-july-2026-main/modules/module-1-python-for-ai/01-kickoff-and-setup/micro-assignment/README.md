# Micro-assignment 1.1: Five problems

## Goal

Confirm your setup works, then work through five short problems using what you saw in class.

## Rules

Use only what class 1.1 covered: variables and types, f-strings, lists, and `if` / `for` / `while`. No functions, dictionaries, or other structures yet; they arrive in 1.2. Match each expected output exactly.

## Problems

### Problem 1: Names report

```python
names = ["Ada", "Alan", "Grace", "Kay", "Katherine", "Ed"]
```

Print a numbered line per name; add ` (long)` for any name longer than four letters; then print how many were long, out of the total.

```
1. Ada
2. Alan
3. Grace (long)
4. Kay
5. Katherine (long)
6. Ed

2 of 6 names are longer than four letters.
```

### Problem 2: Reading signs

```python
readings = [12, -5, 0, 8, -3, 7]
```

For each value print `value: sign` (`positive`, `negative`, or `zero`). Then print how many were positive and the total of all readings.

```
12: positive
-5: negative
0: zero
8: positive
-3: negative
7: positive

positives: 3
total: 19
```

### Problem 3: Countdown list

```python
n = 5
```

Use a `while` loop to build a countdown list from `n` down to 1. Then print the list, its length, and its first and last items.

```
[5, 4, 3, 2, 1]
length: 5
first: 5, last: 1
```

### Problem 4: Highest reading, without `max()`

```python
scores = [12, 47, 47, 8, 5, 47, 19]
```

Without using `max()`, find the highest value, the index where it first appears, and how many times it appears in the list.

```
highest: 47
first seen at index: 1
appears 3 times
```

### Problem 5: Is it sorted?

```python
values = [3, 8, 8, 12, 5, 20]
```

Decide whether the list is in non-decreasing order (each item is less than or equal to the next). If it is not, also report the index where the order first breaks.

```
sorted: False
first drop at index 3 (12 then 5)
```

## Deliverable

The working script and its output. Fill in `assignment.ipynb` and run it so the output is saved with the notebook. A plain `.py` file plus a copy of its terminal output is also fine.

## How this is checked

A reference solution is released in the `solution/` folder. Compare your output to the expected output above, then check your approach against the solution once it is released.

## Hints

- Problem 1: `enumerate(names, start=1)` gives the counter and the name together; `len(name) > 4` is the long test.
- Problem 2: keep two running totals, one for the count of positives and one for the sum; print them after the loop.
- Problem 3: append inside the loop and subtract 1 each time; `list[0]` is the first item and `list[-1]` is the last.
- Problem 4: start your "highest so far" at the first element, then compare the rest against it; count in a separate loop.
- Problem 5: loop `i` over `range(len(values) - 1)` and compare `values[i]` with `values[i + 1]`; keep a flag and remember the first break index.
