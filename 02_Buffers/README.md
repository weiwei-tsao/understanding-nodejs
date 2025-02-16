# Buffers in Node.js

## Introduction

- Buffers enable efficient handling of binary data in Node.js.
- They are widely used in file I/O, network communication, and data streams.
- 1 bit => 0 / 1; 1 byte => 8 bits => 0000 0000

## Character Sets and Character Encodings

- A character set is **a dictionary** that maps characters (letters, symbols, etc.) to their numeric values.
- Character encoding is **a way to store** those numeric values in bytes.

| Character Set | Encoding | Binary Representation                 | Size    |
| ------------- | -------- | ------------------------------------- | ------- |
| ASCII         | ASCII    | `01000001`                            | 1 byte  |
| Unicode       | UTF-8    | `01000001`                            | 1 byte  |
| Unicode       | UTF-16   | `00000000 01000001`                   | 2 bytes |
| Unicode       | UTF-32   | `00000000 00000000 00000000 01000001` | 4 bytes |

## Buffers

### Definition

- A buffer is a **container in memory** that holds binary data.
- Buffers, once created, have **a fixed length**.

### Memory Allocation

- The size of the buffer determines how much memory it occupies as **raw binary data (bytes)**.
- Once allocated, the memory can be used to **store and manipulate data**.

### Behavior

- Buffers behave similarly to arrays in that they hold **a sequence of values** but only stores raw binary data.
- You can access and modify individual bytes in a buffer using an index

### Performance

- Buffers are optimized for handling I/O operations (e.g., file reading, network data processing).

## Handling Large Buffers - Streams

### Memory Constrains

- Node.js operates with **a memory limit** and
- Allocating too large a buffer may result in:
  - Process crash due to **out-of-memory** errors.
  - Performance degradation due to excessive **garbage collection**

### Streams

- Streams allow processing large data efficiently, preventing crashes.
- Streams process data in **chunks**, instead of loading everything into memory at once.

### Clarifying Buffers vs. Streams

- Buffers are still the core of Streaming, but streams use them dynamically.
- Streams process data in chunks instead of loading everything into memory.
- Backpressure prevents memory overflow when reading & writing at different speeds.
