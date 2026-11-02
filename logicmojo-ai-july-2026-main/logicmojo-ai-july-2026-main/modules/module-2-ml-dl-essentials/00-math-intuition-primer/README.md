# Math intuition primer

A short, self-paced warm-up before Module 2. It is strongly recommended and it is not graded or gated: watch it once, run the tiny checks at the end, and move on. Budget about 30 to 45 minutes.

Module 2 opens the black box of "the model learns." Three small ideas make that click, and if you meet them once here, class 2.2 will feel obvious instead of scary. That is the whole job of this page: build the pictures, skip the proofs. No calculus drills, no linear-algebra course, just enough to read the formulas we decode in class.

You have already seen the first idea. The dot product on the 1.4 data-stack slide is exactly the one below. We are only adding a picture for slope and gradient on top of it.

---

## 1. Vectors, matrices, and the dot product

A **vector** is an ordered list of numbers. A **matrix** is a grid of numbers (rows and columns). You built both in 1.4 as NumPy arrays.

The one operation to feel in your bones is the **dot product**. Line up two vectors of the same length, multiply the matching entries, and add the products into a single number.

```
a = [1, 2, 3]
b = [4, 5, 6]
dot(a, b) = 1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32
```

Read it as a **weighted vote**: each entry of `b` says how much the matching entry of `a` counts, and the dot product is the total score. When two vectors point the same way their dot product is large; when they pull in opposite directions it is small or negative.

Where this shows up in the course: it is the neuron's weighted sum in 2.3 (`w1*x1 + w2*x2 + ...`), the core of attention in Module 3, and how we measure similarity between embeddings in Module 4.

---

## 2. Slope and the derivative

Picture the graph of a function as a hill. The **slope** at a point is how steep the hill is right there: how much the output moves when you nudge the input a little.

- A positive slope means the output goes up as you move right (nudge the input up and the value rises).
- A negative slope means it goes down.
- A slope near zero means the ground is flat right there, a top or a bottom.

The **derivative** is just the exact slope at a point. You do not need to compute one by hand in this course; you need the picture: the derivative tells you which way the function is heading and how fast.

```
f(x) = x^2       a simple bowl-shaped curve
at x = 3, the curve is rising steeply     -> slope is positive
at x = 0, the curve is flat at the bottom -> slope is zero
```

Where this shows up in the course: in 2.2 the "function" is the loss (how wrong the model is), and its slope tells the training loop which way to nudge a weight to make the loss smaller.

---

## 3. The gradient

The slope idea handles one input at a time. A model has many knobs (weights) at once, so we need the slope in every direction together. That bundle is the **gradient**: a vector holding the slope with respect to each input.

The key fact, and the only one you need: the gradient points in the direction of **steepest increase**. So to make a value go *down*, you step in the **opposite** direction.

Analogy: you are on a foggy hillside and cannot see the bottom. You cannot take in the whole landscape, but you can feel which way the ground tilts under your feet. Step downhill, a little at a time, and you reach a valley. The gradient is that felt tilt; "downhill" is its opposite.

Where this shows up in the course: this is exactly what gradient descent does in 2.2. It computes the gradient of the loss, then steps the weights the opposite way to lower the loss. In 2.4, PyTorch computes that gradient for you automatically with one call.

---

## That is the whole toolkit

Three pictures carry the next few classes:

- A dot product is a weighted vote that turns two vectors into one number.
- A derivative is the slope: which way and how steeply a function moves.
- A gradient is the slope in every direction at once, pointing uphill, so its opposite is downhill.

Everything in 2.2 (loss, gradient, the update step) is built from these. Do not worry about deriving anything; recognizing the pictures is enough.

---

## Watch these (curated)

Free, and each is short. Watch for the idea, not the proofs. Two or three per topic; pick whichever voice suits you.

**Vectors, matrices, and the dot product**

- [Vectors, what even are they? (3Blue1Brown, Essence of linear algebra, chapter 1)](https://www.youtube.com/watch?v=fNk_zzaMoSs)
- [Dot products and duality (3Blue1Brown, Essence of linear algebra, chapter 9)](https://www.youtube.com/watch?v=LyGKycYT2v0)
- [The full Essence of linear algebra series, if you want more](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab)

**Slope and the derivative**

- [The Essence of Calculus, chapter 1 (3Blue1Brown)](https://www.youtube.com/watch?v=WUvTyaaNkzM)
- [The paradox of the derivative, chapter 2 (3Blue1Brown, the derivative as a slope)](https://www.youtube.com/watch?v=9vKqVkMQHKk)

**The gradient and gradient descent**

- [Gradient descent, how neural networks learn (3Blue1Brown, Deep learning, chapter 2)](https://www.youtube.com/watch?v=IHZwWFHWa-w)
- [Gradient Descent, Step-by-Step (StatQuest with Josh Starmer)](https://www.youtube.com/watch?v=sDv4f4s2SB8)
- [The Essential Main Ideas of Neural Networks (StatQuest, a gentle preview of class 2.3)](https://www.youtube.com/watch?v=CqOfi41LfDw)

These are the recommended picks; swap in your own before publishing if you prefer a different explainer.

---

## Optional self-check

No stakes. If these three feel comfortable, you are ready for 2.2.

1. What is the dot product of `[2, 0, 1]` and `[3, 4, 5]`?
2. For the bowl `f(x) = x^2`, is the slope at `x = -2` positive or negative, and would nudging `x` upward raise or lower `f`?
3. The gradient of the loss points in the direction that increases the loss the most. To reduce the loss, do you step in the same direction or the opposite one?

<details>
<summary>Answers</summary>

1. `2*3 + 0*4 + 1*5 = 6 + 0 + 5 = 11`.
2. Negative slope (the left side of the bowl slopes down to the right). Nudging `x` upward moves toward the bottom, so `f` gets smaller.
3. The opposite direction. That opposite-of-the-gradient step is exactly what gradient descent takes in 2.2.

</details>
