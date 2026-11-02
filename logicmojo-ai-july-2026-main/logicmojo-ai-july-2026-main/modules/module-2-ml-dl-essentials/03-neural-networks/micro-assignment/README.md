# Micro-assignment 2.3: Neural networks

## Goal

Build the pieces of a network by hand in NumPy: a neuron, activations, a layer, softmax, and cross-entropy. No PyTorch yet.

## Rules

Use only what class 2.3 (Neural networks) and earlier cover, with NumPy. A neuron is `z = w . x + b` then `a = f(z)`; ReLU is `max(0, z)`; sigmoid is `1 / (1 + e^(-z))`; tanh is `np.tanh(z)`; softmax normalizes exponentials; cross-entropy against a one-hot target is `-sum(y * log(p))`. Fix the numbers exactly as given. Match each expected output exactly.

## Problems

### Problem 1: A neuron forward pass

```python
w = [0.5, -0.2, 0.1]
x = [2, 1, 4]
b = 0.3
```

Compute `z`, then `ReLU(z)`, and print both to two decimals.

```
z: 1.5
ReLU(z): 1.5
```

### Problem 2: Apply ReLU, sigmoid, and tanh

```python
v = [-2.0, 0.0, 3.0]
```

Apply ReLU, sigmoid, and tanh to the vector and print each result, rounded to two decimals.

```
ReLU: [0. 0. 3.]
sigmoid: [0.12 0.5  0.95]
tanh: [-0.96  0.    1.  ]
```

### Problem 3: A layer of two neurons

```python
W = [[0.5, -1.0],
     [1.0,  0.5]]   # 2 neurons, 2 inputs each
b = [0.0, 1.0]
x = [2.0, 3.0]
```

Compute each neuron's `z = W . x + b`, apply ReLU, and print the two outputs.

```
outputs: [0.  4.5]
```

### Problem 4: Two linear layers collapse to one

```python
W1 = [[1.0, 2.0], [0.0, 1.0]];  b1 = [0.0, 0.0]
W2 = [[2.0, -1.0]];             b2 = [0.0]
x  = [1.0, 1.0]
```

With no activation between them, compute the output through both layers, then through one combined weight (`W2 @ W1`), and print both plus whether they match.

```
two layers: [5.]
one layer: [5.]
identical: True
```

### Problem 5: Softmax

```python
logits = [1.0, 2.0, 3.0]
```

Print the softmax probabilities (rounded to three decimals) and their sum.

```
probs: [0.09  0.245 0.665]
sum: 1.0
```

### Problem 6: Cross-entropy against a one-hot target

```python
y     = [0, 0, 1]      # one-hot target: the true class is index 2
probs = [0.1, 0.2, 0.7]
```

Compute the cross-entropy `-sum(y * log(p))` to two decimals, confirm it equals `-log(p_true)`, and print both, then one line on why a confident wrong prediction costs the most.

```
cross-entropy: 0.36
same as -log(p_true): 0.36
note: cross-entropy grows toward infinity as the probability on the true class nears 0, so a confident wrong answer is punished hardest
```

## Deliverable

The working notebook and its output. Fill in `assignment.ipynb` and run it.

## How this is checked

A reference solution is released in the `solution/` folder. Compare your output to the expected output above.
