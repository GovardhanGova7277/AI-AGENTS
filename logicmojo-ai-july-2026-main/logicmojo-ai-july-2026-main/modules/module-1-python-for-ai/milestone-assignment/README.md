# Module 1 milestone: data facts, an LLM summary, saved to JSON

## Goal

Put the whole module together in one small, type-hinted tool. It loads a dataset, computes a few facts from it, asks a language model to summarize them, and saves the result to a JSON file. This exercises every Module 1 skill in one flow: functions, type hints, a class, files and JSON, Pandas, and an LLM call.

## What to build

1. **Load** the provided dataset (a small CSV) into a Pandas DataFrame.
2. **Compute facts** with a type-hinted function that returns a dict, for example the row count, total revenue, the top category by revenue, and the average units.
3. **Build a prompt** string from those facts.
4. **Ask an LLM** to summarize them (a local Ollama call). Wrap the call in `try`/`except` so that if the service is not running, the tool falls back to a clear message instead of crashing.
5. **Save** the facts plus the summary to a JSON file, using a small class.

## Deliverable

The working notebook and the JSON it writes. Keep it as a notebook for this module.

## Running the LLM step

The summary step needs Ollama running locally (`ollama pull llama3.2`). Without it, your `try`/`except` fallback should still let the rest of the tool run and save the facts, with a placeholder summary. That graceful degradation is part of the exercise.

## Skills exercised

Functions and type hints (1.2), a class and files and JSON and `try`/`except` (1.3), Pandas (1.4), and an LLM call (1.5).

## How this is checked

A reference solution is released in the `solution/` folder. Compare your approach and output once it is released.
