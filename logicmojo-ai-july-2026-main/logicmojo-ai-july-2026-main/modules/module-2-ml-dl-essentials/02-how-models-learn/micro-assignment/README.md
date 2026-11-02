# Micro-assignment 2.2: How models learn

## Goal

Make gradient descent concrete by hand: compute a loss, take a descent step, run a short descent to a minimum, diagnose the learning rate, and score a classification loss.

## Rules

Use only what class 2.2 and earlier cover, in plain Python (no frameworks; `math` is fine). The mean squared error is `mean((yhat - y)**2)`; one descent step is `theta - eta*grad`; binary cross-entropy for a true label of 1 is `-log(p)`. Fix any numbers exactly as given so your output matches. Match each expected output exactly.

## Problems

### Problem 1: Mean squared error by hand

```python
y_hat = [4.0, 1.0, 3.0, 6.0]
y     = [3.5, 2.0, 3.0, 5.0]
```

Compute the MSE and print it to two decimals.

```
MSE: 0.56
```

### Problem 2: One descent step

```python
theta, grad, eta = 0.8, 2.0, 0.1
```

Apply `theta_new = theta - eta*grad` and print the new value.

```
theta_new: 0.6
```

### Problem 3: A five-step descent

Minimize `f(x) = (x - 3)**2`, whose slope is `2*(x - 3)`, starting at `x = 0.0` with learning rate `0.3`. Take five steps and print the list of `x` values, starting value first, each rounded to three decimals.

```
x each step: [0.0, 1.8, 2.52, 2.808, 2.923, 2.969]
```

### Problem 4: Diagnose three learning rates

Minimize `f(x) = x**2` from `x = 1.0` for 15 steps at each learning rate `0.05`, `0.4`, and `1.1`. For each, compare the final loss to the starting loss and label it `"diverges"` (final higher), `"converges"` (final below 0.01), or `"crawls"` (otherwise). Print the list of three labels, in order.

```
['crawls', 'converges', 'diverges']
```

### Problem 5: A loss that keeps rising

During training the loss increases at every step instead of falling. Print which knob is set wrong and which way to change it.

```
knob: the learning rate is too large
fix: decrease the learning rate so the steps stop overshooting
```

### Problem 6: Cross-entropy on a confident-wrong guess

The true label is 1. Compute the binary cross-entropy `-log(p)` for a confident-right prediction `p = 0.9` and a confident-wrong one `p = 0.1`, each to two decimals, then print one line on what the gap shows.

```
cross-entropy at p=0.9: 0.11
cross-entropy at p=0.1: 2.30
note: the confident-wrong guess costs far more, which is why classification uses cross-entropy
```

## Deliverable

The working notebook and its output. Fill in `assignment.ipynb` and run it.

## How this is checked

A reference solution is released in the `solution/` folder. Compare your output to the expected output above.
