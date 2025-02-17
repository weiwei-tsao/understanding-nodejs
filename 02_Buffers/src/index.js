// console.log('Buffers in Node.js');

// // Allocate a buffer of 10 bytes with default 0 values
// const buf1 = Buffer.alloc(10);
// console.log(buf1); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// // Create a buffer from a string
// const buf2 = Buffer.from('Buffers in Node.js');
// console.log(buf2); // <Buffer 42 75 66 66 65 72 73 20 69 6e 20 4e 6f 64 65 2e 6a 73>

// // Allocate an "unsafe" buffer (uninitialized memory)
// const buf3 = Buffer.allocUnsafe(10);
// console.log(buf3);

// // Write to buffer
// buf1.write('Buffers in Node.js');
// console.log(buf1);

// // Reading from Buffers
// console.log(buf1.toString());
// console.log(buf1.toString('hex'));
// console.log(buf1.toString('ascii'));
// console.log(buf1.toString('base64'));
// console.log(buf1.toString('utf-8'));

// // Modifying Buffers
// buf1[0] = 0x62;
// console.log(buf1.toString());

// // Copying and Concatenating
// const bufA = Buffer.from('AAA');
// const bufB = Buffer.from('BBB');
// const bufC = Buffer.concat([bufA, bufB]);
// console.log(bufC.toString());

// // Slicing
// const bufD = bufC.slice(2, 4);
// console.log(bufD.toString());
// bufD[0] = 0x42; // Modifying slices affect the original buffers
// console.log(bufD.toString());

// // Reading files
// const fs = require('fs');

// fs.readFile('./src/example.txt', (err, data) => {
//   if (err) {
//     throw err;
//   }

//   console.log('Buffer: ', data);
//   console.log('Content: ', data.toString());
// });

// // Reading files with chunk
// const fs = require('fs');

// const readStream = fs.createReadStream('./src/example.txt', 'utf8');
// readStream.on('data', (chunk) => {
//   console.log('Chunk: ', chunk.toString());
// });

// // Network data handling with Buffers
// const net = require('net');

// const server = net.createServer((socket) => {
//   socket.write(Buffer.from('Hello from the server.'));
//   socket.on('data', (data) => {
//     console.log('Received data: ', data.toString());
//   });
// });

// server.listen(3000, () => console.log('Server listening on port 3000'));
