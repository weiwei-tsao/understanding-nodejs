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

module.exports = CustomizedEventEmitter;
