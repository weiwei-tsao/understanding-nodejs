# EventEmitter in Node.js

## What is EventEmitter?

- `EventEmitter` is a class in Node.js that facilitates event-driving programming.
- It allows you to **defining** and **triggering** custom events, making asynchronous actions efficiently.
- It is a `JavaScript` pattern instead of event loop, which provides a cleaner and modular way to handle events.

## How to use EventEmitter?

- To use EventEmitter, you need to import the `EventEmitter` class from the `events` module.
- Then, you can create an instance of `EventEmitter` and use it to define and trigger events.

```javascript
const { EventEmitter } = require('events');

const myEmitter = new EventEmitter();

myEmitter.on('event', () => {
  console.log('an event occurred!');
});

myEmitter.emit('event');
```

- `on` is used to register an event listener.
- `emit` triggers the event, executing all listeners assigned to it.

## EventEmitter and Asynchronous Execution

- Event-driven programming in Node.js allows code to execute non-blocking operations.
- When an event is triggered, the event listeners are executed in the order they are registered.
- The event listeners are executed **asynchronously** and **simultaneously**.

```javascript
const HTTP = require('http');

const server = HTTP.createServer((req, res) => {
  res.end('Hello World');
});

server.on('request', (req, res) => {
  console.log('Request received');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

- Whenever an HTTP request is received, an event is emitted, triggering the registered callback.
- The server can handle multiple requests concurrently, thanks to the event-driven architecture.

### How EventEmitter Internally Works

- `on(event, listener)` stores the listener function inside an internal event registry (an object).
- `emit(event, ...args)` retrieves the listener function from the registry and executes it sequentially.

```javascript
{
  event1: [listenerFunction1, listenerFunction2],
  event2: [listenerFunction3]
}
```

- When you call `.on(event, listener)`, it pushes the listener to the end of the array
- When `.emit(event)` is called, the listeners are executed in the order they were registered.

### Additional Methods

- `once(event, listener)` is similar to `on`, but it ensures the listener is executed only once.
- `removeListener(event, listener)` removes a listener from the event registry.
- `removeAllListeners(event)` removes all listeners from the event registry.
- `countListeners(event)` returns the number of listeners for a specific event.

### A Customized EventEmitter

```javascript
class CustomizedEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(listener);

    return this;
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(...args));
    }

    return this;
  }

  removeListener(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((l) => l !== listener);

      if (this.events[event].length === 0) {
        delete this.events[event];
      }
    }

    return this;
  }

  removeAllListeners(event) {
    if (this.events[event]) {
      delete this.events[event];
    }

    return this;
  }

  listenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
  }

  eventNames() {
    return Object.keys(this.events);
  }
}
```
