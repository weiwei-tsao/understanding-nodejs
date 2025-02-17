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

```javascript
// Allocate a buffer of 10 bytes with default 0 values
const buf1 = Buffer.alloc(10);
console.log(buf1); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// Create a buffer from a string
const buf2 = Buffer.from('Buffers in Node.js');
console.log(buf2); // <Buffer 42 75 66 66 65 72 73 20 69 6e 20 4e 6f 64 65 2e 6a 73>

// Allocate an "unsafe" buffer (uninitialized memory)
const buf3 = Buffer.allocUnsafe(10);
console.log(buf3);

// Write to buffer
buf1.write('Buffers in Node.js');
console.log(buf1);

// Reading from Buffers
console.log(buf1.toString());
console.log(buf1.toString('hex'));
console.log(buf1.toString('ascii'));
console.log(buf1.toString('base64'));
console.log(buf1.toString('utf-8'));

// Modifying Buffers
buf1[0] = 0x62;
console.log(buf1.toString());

// Copying and Concatenating
const bufA = Buffer.from('AAA');
const bufB = Buffer.from('BBB');
const bufC = Buffer.concat([bufA, bufB]);
console.log(bufC.toString());

// Slicing
const bufD = bufC.slice(2, 4);
console.log(bufD.toString());
bufD[0] = 0x42; // Modifying slices affect the original buffers
console.log(bufD.toString());
```

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

```javascript
// Reading files
const fs = require('fs');

fs.readFile('./src/example.txt', (err, data) => {
  if (err) {
    throw err;
  }

  console.log('Buffer: ', data);
  console.log('Content: ', data.toString());
});

// Reading files with chunk
const fs = require('fs');

const readStream = fs.createReadStream('./src/example.txt', 'utf8');
readStream.on('data', (chunk) => {
  console.log('Chunk: ', chunk.toString());
});

// Network data handling with Buffers
const net = require('net');

const server = net.createServer((socket) => {
  socket.write(Buffer.from('Hello from the server.'));
  socket.on('data', (data) => {
    console.log('Received data: ', data.toString());
  });
});

server.listen(3000, () => console.log('Server listening on port 3000'));
```
