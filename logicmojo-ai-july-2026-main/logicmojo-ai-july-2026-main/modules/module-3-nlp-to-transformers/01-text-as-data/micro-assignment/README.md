# Micro-assignment 3.1: Text as data

## Goal

Practise turning text into tokens and ids, and see why word order matters.

## Rules

Use only what class 3.1 (Text as data) and earlier cover, in plain Python. A whitespace tokenizer lowercases and splits on spaces. Match each expected output exactly.

## Problems

### Problem 1: Whitespace tokenize and count

```python
s = "Attention is all you need"
```

Lowercase, split on spaces, and print the tokens and the count.

```
tokens: ['attention', 'is', 'all', 'you', 'need']
count: 5
```

### Problem 2: Two tokenizers, one word

```python
word = "playing"
```

Print a whitespace split (the word whole) and a suffix split (the stem plus `"##ing"`, where `##` marks a piece that continues the previous token, as in WordPiece).

```
whitespace: ['playing']
suffix: ['play', '##ing']
```

### Problem 3: Encode to ids and decode back

```python
vocab  = {"i": 0, "love": 1, "nlp": 2}
tokens = ["i", "love", "nlp", "love"]
```

Encode the tokens to ids, then decode the ids back to tokens. Print both.

```
ids: [0, 1, 2, 1]
decoded: ['i', 'love', 'nlp', 'love']
```

### Problem 4: Token count is not word count

```python
text   = "cats running"
tokens = ["cat", "##s", "runn", "##ing"]
```

Print the word count and the token count.

```
words: 2
tokens: 4
```

### Problem 5: A bag of tokens loses order

```python
a = "dog bites man"
b = "man bites dog"
```

Print whether the two have the same bag of tokens, and whether they are the same sentence.

```
same bag: True
same sentence: False
```

### Problem 6: Why order matters

Print one line on why a bag of independent tokens loses word order and context.

```
a bag of independent tokens keeps which words appear but not their order, so it cannot tell 'dog bites man' from 'man bites dog'; attention restores order and context
```

## Deliverable

The working notebook and its output. Fill in `assignment.ipynb` and run it.

## How this is checked

A reference solution is released in the `solution/` folder. Compare your output to the expected output above.
