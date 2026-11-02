# Micro-assignment 2.4: PyTorch fundamentals

## Goal

Get hands-on with the PyTorch pieces you will use for the rest of the course: tensors, autograd, an `nn.Module`, and the five-line training loop.

## Rules

Use only what class 2.4 (PyTorch fundamentals) and earlier cover, with PyTorch. The five-line loop is `pred = model(x)`, `loss = loss_fn(pred, y)`, `opt.zero_grad()`, `loss.backward()`, `opt.step()`. Fix the numbers and seeds exactly as given so your output matches. Match each expected output exactly.

## Problems

### Problem 1: Tensors and broadcasting

```python
t    = torch.tensor([[1., 2., 3.], [4., 5., 6.]])
bias = torch.tensor([10., 20., 30.])
```

Print `t`'s shape (as a tuple) and dtype, and the result of `t + bias` as a list.

```
shape: (2, 3)
dtype: torch.float32
broadcast: [[11.0, 22.0, 33.0], [14.0, 25.0, 36.0]]
```

### Problem 2: Autograd matches the by-hand gradient

```python
x = torch.tensor([1., 2., 3.], requires_grad=True)
y = (x ** 2).sum()
```

Call `y.backward()` and print `x.grad`. By hand the gradient of `sum(x^2)` is `2*x`, so confirm it equals `[2, 4, 6]`.

```
x.grad: tensor([2., 4., 6.])
```

### Problem 3: Count the parameters of an nn.Module

Build a network for the digits shape: `Linear(64, 16)`, ReLU, `Linear(16, 10)`. Print its total parameter count.

```
total parameters: 1210
```

### Problem 4: The five-line loop lowers the loss

Fit a single weight `w` (start at 0.0) so that `w * x` matches `y`, using `x = [1, 2, 3, 4]`, `y = [2, 4, 6, 8]`, MSE loss, and `SGD(lr=0.02)` for 80 steps. Print the loss at the first step and after training, and that it decreased.

```
first loss: 30.0
last loss: 0.0
decreased: True
```

### Problem 5: The zero_grad trap

Starting from `w = torch.tensor([1.0], requires_grad=True)`, call `(w ** 2).sum().backward()` three times. Print `w.grad` after each step without resetting (it accumulates), then repeat with `w.grad.zero_()` before each backward (it stays steady). The true gradient is `2*w = 2.0`.

```
without zero_grad: [2.0, 4.0, 6.0]
with zero_grad: [2.0, 2.0, 2.0]
```

### Problem 6: Logits, not probabilities

Print one line explaining why raw logits, not softmax probabilities, are passed to `CrossEntropyLoss`, and what breaks if you softmax first.

```
logits: CrossEntropyLoss applies softmax internally, so pass raw logits; softmaxing first applies it twice, weakening the signal and hurting training
```

## Deliverable

The working notebook and its output. Fill in `assignment.ipynb` and run it.

## How this is checked

A reference solution is released in the `solution/` folder. Compare your output to the expected output above.
