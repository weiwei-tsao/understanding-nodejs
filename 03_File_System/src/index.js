const fs = require('fs').promises;

// Promise
fs.readFile('src/example.txt', 'utf-8')
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

//  async/await
(async () => {
  try {
    const data = await fs.readFile('src/example.txt', 'utf-8');
    console.log(data);
  } catch (error) {
    console.log(error);
  }
})();

// const fs = require('fs');

// Callback;
// fs.readFile('src/example.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log('Error: ', err);
//   }

//   console.log(data);
// });

// // Synchronous way
// try {
//   const data = fs.readFileSync('src/example.txt', 'utf-8');
//   console.log(data);
// } catch (error) {
//   console.log('Error: ', error);
// }
