// const EventEmitter = require('events');

// // Step 1: Importing and Extending EventEmitter
// class MyEmitter extends EventEmitter {}
// const myEmitter = new MyEmitter();

// // Step 2: Registering an event listener called hello
// myEmitter.on('hello', () => {
//   console.log('Event emitted!');
// });

// // Step 3: Emitting the event hello
// myEmitter.emit('hello');

const CustomizedEventEmitter = require('./CustomizedEventEmitter');

const myEmitter = new CustomizedEventEmitter();

const listener1 = () => {
  console.log('listener 1');
};

const listener2 = () => {
  console.log('listener 2');
};
const listener3 = () => {
  console.log('listener 3');
};

myEmitter.on('event', listener1);
myEmitter.on('event', listener2);
myEmitter.on('event', listener3);

myEmitter.emit('event');
