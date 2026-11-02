# Micro-assignment 1.3: Python for real work

## Goal

Practise the tools that make bigger programs manageable: classes, error handling, and JSON.

## Rules

Use only what class 1.3 and earlier cover: classes and inheritance (`__init__`, methods, `self`, `super()`, overriding), `try`/`except`, files and JSON, plus everything from 1.1 and 1.2. Match each expected output exactly.

## Problems

### Problem 1: An Account class

Define a class `Account` with `__init__(self, balance=0)` and a `deposit(self, amount)` method. Create two accounts (starting at 100 and 0), deposit into each, and print both balances to show they hold independent state.

```
Account A balance: 150
Account B balance: 20
```

### Problem 2: Sum the valid numbers

```python
raw = ["10", "7", "x", "3"]
```

Add up the items that are valid integers. Use `try`/`except` to catch the `ValueError` from `int()` on a bad item and skip it. Print the total and how many were skipped.

```
total: 20
skipped: 1
```

### Problem 3: JSON is a dict in text form

```python
data = {"course": "GenAI", "classes": 45}
```

Turn the dict into JSON text with `json.dumps`, read it back with `json.loads`, add 1 to `"classes"`, then print the JSON text and the new value.

```
as text: {"course": "GenAI", "classes": 45}
updated classes: 46
```

### Problem 4: A savings subclass

Define `Account` with `__init__(self, balance)` and a `summary()` method returning `"Account: <balance>"`. Then define `SavingsAccount(Account)` that also takes a `rate` (call `super().__init__` for the balance) and overrides `summary()` to return `"SavingsAccount: <balance> at <rate>"`. Put one of each in a list and print each `summary()`.

```
Account: 100
SavingsAccount: 200 at 0.05
```

### Problem 5: Missing file, handled

```python
filename = "missing_data.json"
```

Try to open and `json.load` this file. If it is missing, catch `FileNotFoundError`, print `could not find <filename>; starting empty`, and use an empty list instead. Then print how many records you ended up with.

```
could not find missing_data.json; starting empty
records: 0
```

## Deliverable

The working script and its output. Fill in `assignment.ipynb` and run it. A plain `.py` file plus its output is also fine.

## How this is checked

A reference solution is released in the `solution/` folder. Compare your output to the expected output above.
