# Micro-assignment 2.5: Training in practice

## Goal

Exercise the real training workflow: a DataLoader, a full train and evaluate, reading a curve, saving and reloading weights, the same-device trap, and reproducibility.

## Rules

Use only what class 2.5 (Training in practice) and earlier cover, with PyTorch. Fix the seeds and numbers exactly as given. A few answers are booleans or thresholds on purpose, so they match regardless of your PyTorch version or hardware. Match each expected output exactly.

## Problems

### Problem 1: A DataLoader batch

```python
X = torch.randn(100, 8)
y = torch.randint(0, 3, (100,))
```

Wrap these in a `TensorDataset` and a `DataLoader` with `batch_size=16`, take the first batch, and print the shapes of its `X` and `y` (as tuples).

```
batch X shape: (16, 8)
batch y shape: (16,)
```

### Problem 2: Train and evaluate

Load `load_digits`, split off 25 percent as test with `random_state=0` and `stratify=y`, scale on the train rows, set `torch.manual_seed(0)`, train a small network (`Linear(64,32)`, ReLU, `Linear(32,10)`) with `CrossEntropyLoss` and `Adam(lr=0.01)` for 150 steps, then print whether the test accuracy exceeds 0.90.

```
test accuracy above 0.90: True
```

### Problem 3: Save and reload give identical predictions

Create a model, save its `state_dict`, load it into a fresh model of the same shape, and print whether the two produce identical predictions on a batch.

```
identical: True
```

### Problem 4: Read the overfitting onset

```python
val_losses = [0.90, 0.61, 0.48, 0.52, 0.70]
```

Print the epoch index where validation loss is lowest (the epoch to keep with early stopping).

```
best epoch: 2
```

### Problem 5: A mismatch is a RuntimeError

PyTorch raises a `RuntimeError` when tensors do not line up, whether it is a device mismatch (model on GPU, batch on CPU) or a shape mismatch. Since not everyone has a GPU, trigger a shape mismatch with an incompatible matmul, catch it and print the error type, then fix the shapes and print the working result shape.

```
error type: RuntimeError
after fix, shape: (2, 2)
note: a device mismatch (model on GPU, batch on CPU) raises the same RuntimeError; the fix is to move both to the same device
```

### Problem 6: Reproducibility

Write a helper that sets `torch.manual_seed(seed)` and returns `float(torch.rand(1))`. Call it twice with the same seed and print whether the two values match.

```
runs match: True
```

## Deliverable

The working notebook and its output. Fill in `assignment.ipynb` and run it.

## How this is checked

A reference solution is released in the `solution/` folder. Compare your output to the expected output above.
