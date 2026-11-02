# Micro-assignment 1.5: APIs and the web

## Goal

Read API responses and make your first LLM calls, one local and one hosted.

## Rules

Use only what class 1.5 and earlier cover: reading a JSON response (a dict), checking a status code, `requests`, a local Ollama call, and a hosted Groq call, plus everything from 1.1 to 1.4.

Problems 1 and 2 are pure Python and run anywhere. Problems 3 and 4 call real services, so run them on your own machine: Problem 3 needs Ollama running, and Problem 4 needs a free `GROQ_API_KEY` in your environment. Never paste an API key into code or commit it.

## Problems

### Problem 1: Read a JSON response

```python
response = {"city": "Paris", "temp_c": 18, "conditions": "cloudy"}
```

This dict is what `response.json()` gives you. Print `"<city>: <temp_c>C, <conditions>"`, then print the humidity if the key exists, else `n/a` (use `.get` with a default).

```
Paris: 18C, cloudy
humidity: n/a
```

### Problem 2: Check the status code

```python
responses = [
    {"status_code": 200, "data": {"answer": 42}},
    {"status_code": 404, "data": None},
]
```

For each response, if `status_code` is 200 print `ok: <data>`; otherwise print `request failed with status <code>`.

```
ok: {'answer': 42}
request failed with status 404
```

## Run these locally

### Problem 3: Call a local model with Ollama

Pull a small model first (`ollama pull llama3.2`), then `POST` to `http://localhost:11434/api/generate` with a JSON body (`model`, `prompt`, `stream: False`) and print `resp.json()["response"]`.

Example output (yours will differ):

```
Hello there, it is nice to meet you.
```

### Problem 4: Call a hosted model with Groq

Send the same prompt to Groq. Read the key from `os.environ["GROQ_API_KEY"]` (set it in your shell; never hardcode it), `POST` to `https://api.groq.com/openai/v1/chat/completions` with an `Authorization` header and a `messages` body, and print `resp.json()["choices"][0]["message"]["content"]`.

Example output (yours will differ):

```
groq: Hi there, hope you are having a great day!
```

## Deliverable

The working notebook and its output. Fill in `assignment.ipynb` and run it (Problems 3 and 4 on your own machine).

## How this is checked

A reference solution is released in the `solution/` folder. Problems 1 and 2 have exact expected output above; for 3 and 4, the reply text varies, so match the shape (a printed model reply), not the exact words.
