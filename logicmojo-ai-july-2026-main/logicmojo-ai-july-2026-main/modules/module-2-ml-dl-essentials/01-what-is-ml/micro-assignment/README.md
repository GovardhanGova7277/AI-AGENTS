# Micro-assignment 2.1: What is machine learning?

## Goal

Practise the machine-learning setup: features and labels, regression versus classification (including multiclass), the three-way split with model selection on validation, honest metrics (precision and recall), and the two traps (leakage and imbalance).

## Rules

Use only what class 2.1 and Module 1 cover: features versus labels, regression versus classification, `train_test_split`, scaling on the training part only, fitting and scoring a scikit-learn model, precision and recall, and the leakage and imbalance pitfalls. Every dataset here is bundled with scikit-learn, so nothing downloads. Fix `random_state` where asked so your numbers match. Match each expected output exactly.

## Problems

### Problem 1: Features, label, and task type

```python
table = {"area": [900, 1500, 2200], "rooms": [2, 3, 4], "price": [240, 355, 512]}
```

The last column is the answer to predict. Print the feature names, the label name, and whether this is regression or classification.

```
features: ['area', 'rooms']
label: price
task: regression
```

### Problem 2: Three-way split and model selection

Load `load_wine` (from `sklearn.datasets`). Split off 20 percent as test with `random_state=0` and `stratify=y`, then split the rest into train and validation with `test_size=0.25`, `random_state=0`, and stratification. Scale the features (fit the scaler on the train part only). Train two candidates, `LogisticRegression(max_iter=5000)` and `DecisionTreeClassifier(max_depth=2, random_state=0)`, pick the one with the higher validation accuracy, and print the sizes, both validation accuracies, and the chosen model's test accuracy (two decimals).

```
sizes train/val/test: 106 36 36
validation logreg: 1.0
validation tree: 0.86
chosen: logreg
test accuracy: 1.0
```

### Problem 3: Name the task type

```python
scenarios = [
    "predict tomorrow's temperature in Celsius",
    "decide if an email is spam or not",
    "identify the handwritten digit 0-9",
    "predict a house's sale price",
    "sort a news article into one of 12 topics",
]
```

For each scenario print `"regression"`, `"binary classification"`, or `"multiclass classification"`, in order.

```
['regression', 'binary classification', 'multiclass classification', 'regression', 'multiclass classification']
```

### Problem 4: Diagnose the gap

```python
train_acc, test_acc = 0.99, 0.63
```

Print whether this is overfitting or underfitting, and which number honestly reflects real-world performance.

```
diagnosis: overfitting
honest score: 0.63
```

### Problem 5: Spot the leakage

A teammate scales the whole dataset and then splits it into train and test. Print one line saying what leaks, and one line with the fix.

```
leak: the scaler is fit on all rows, so test statistics enter training
fix: split first, then fit the scaler on the training rows only
```

### Problem 6: Precision and recall on imbalanced labels

Here `1` marks the rare positive class (say, fraud), and the model always guesses the majority `0`.

```python
labels = [0] * 18 + [1, 1]
preds  = [0] * 20
```

Compute accuracy, precision, and recall by hand (no scikit-learn), treating `1` as positive. If there are no positive predictions, report precision as `0.0`. Print the three numbers, then one line on why accuracy flatters this model.

```
accuracy: 0.9
precision: 0.0
recall: 0.0
note: accuracy is high, but recall 0.0 means it caught none of the rare positives
```

## Deliverable

The working notebook and its output. Fill in `assignment.ipynb` and run it.

## How this is checked

A reference solution is released in the `solution/` folder. Compare your output to the expected output above.
