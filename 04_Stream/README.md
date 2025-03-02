# Streams

## Introduction

- Streams are a powerful feature of Node.js that allow you to **process data efficiently** by handling it **while being received** in **small chunks** instead of loading everything into memory at once.
- Useful when handling **big files**, **network requests**, or **real-time** data processing.

## Performance Comparison

Writing data to a file 1 million times, benchmark different `fs` module approaches(`promise`, `callbacks`, `synchronous`) in terms of performance, memory usage, and correctness, setting the stage for `streams` as a more efficient alternative.
