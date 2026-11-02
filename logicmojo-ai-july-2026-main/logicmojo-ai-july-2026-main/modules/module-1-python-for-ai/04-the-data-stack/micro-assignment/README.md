# Micro-assignment 1.4: The data stack

## Goal

Get comfortable with the two libraries every AI dataset passes through: NumPy for arrays and Pandas for tables. Eight problems, four on each.

## Rules

Use only what class 1.4 and earlier cover: NumPy arrays and vectorized operations, and Pandas DataFrames (select, filter, derived columns, `groupby`, `.loc`), plus everything from 1.1 to 1.3. Run the setup cell (`import numpy as np`, `import pandas as pd`) first. Match each expected output exactly.

## NumPy

### Problem 1: Array basics

Create `np.array([2, 4, 6, 8, 10])`; print it with 10 added to every element. Multiply `[1, 2, 3]` by `[4, 5, 6]` elementwise. Print the mean of the first array.

```
plus 10: [12 14 16 18 20]
product: [ 4 10 18]
mean: 6.0
```

### Problem 2: Above the mean

```python
data = np.array([3, 8, 1, 10, 6, 4])
```

Compute the mean (print to two decimals). Use a boolean mask to select the elements greater than the mean; print them and how many there are.

```
mean: 5.33
above mean: [ 8 10  6]
count: 3
```

### Problem 3: Vectorized equals loop

```python
qty = np.array([2, 1, 3])
price = np.array([10, 25, 5])
```

Compute the total spend two ways and show they match: once vectorized (`np.sum(qty * price)`), once with a plain loop. Print both and whether they are equal.

```
vectorized: 60
loop: 60
match: True
```

### Problem 4: Normalize to 0..1

```python
scores = np.array([50, 20, 80, 40])
```

Without a loop, rescale the array so the smallest value becomes 0 and the largest becomes 1, using `(x - min) / (max - min)` on the whole array at once. Print the result rounded to two decimals.

```
normalized: [0.5  0.   1.   0.33]
```

## Pandas

### Problem 5: A DataFrame

```python
df = pd.DataFrame({
    "name": ["Ada", "Alan", "Grace", "Kay"],
    "score": [91, 72, 85, 60],
    "team": ["A", "B", "A", "B"],
})
```

Print the whole DataFrame; print the score column as a list; then print only the rows where `score >= 85`.

```
    name  score team
0    Ada     91    A
1   Alan     72    B
2  Grace     85    A
3    Kay     60    B

scores: [91, 72, 85, 60]

    name  score team
0    Ada     91    A
2  Grace     85    A
```

### Problem 6: Derived column and group

Using the same `df`, add a boolean column `passed` that is `True` when `score >= 70`; print the table. Then print the mean score per team (`groupby("team")`, then the `score` mean).

```
    name  score team  passed
0    Ada     91    A    True
1   Alan     72    B    True
2  Grace     85    A    True
3    Kay     60    B   False

team
A    88.0
B    66.0
Name: score, dtype: float64
```

### Problem 7: Clean a messy table

```python
raw = pd.DataFrame({
    "city": ["A", "B", "C", "D"],
    "sales": [100.0, np.nan, 250.0, 80.0],
    "visits": [10, 5, 25, 8],
})
```

Drop rows that have a missing value, keep only rows where `sales > 90`, then add a `per_visit` column equal to `sales / visits`. Print the cleaned table.

```
  city  sales  visits  per_visit
0    A  100.0      10       10.0
2    C  250.0      25       10.0
```

### Problem 8: Top category

```python
sales = pd.DataFrame({
    "category": ["food", "toys", "food", "books", "toys"],
    "amount": [20, 15, 30, 10, 25],
})
```

Total the amount per category (`groupby("category")`, then sum `amount`); print it. Then print which category has the highest total, and that total.

```
category
books    10
food     50
toys     40
Name: amount, dtype: int64

top category: food with 50
```

## Deliverable

The working notebook and its output. Fill in `assignment.ipynb` and run it. A plain `.py` file plus its output is also fine.

## How this is checked

A reference solution is released in the `solution/` folder. Compare your output to the expected output above.
