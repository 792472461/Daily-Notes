/**
 * mplement an engine that processes asynchronous callbacks using JavaScript. Your task is to provide the implementation of the QueueProcessingCallback class to meet all the requirements described below.
 * 1. You should provide the implementation of the constructor and process methods. Do not change the names of these methods or the number of arguments they receive.
 * 2. The constructor method should receive an optional string. The value of the string will be responsible for the order in which callbacks stored in the queue are processed. The only non-empty value it can receive is the string "LIFO" (Last In First Out). The default order of processing callbacks in the queue will be "FIFO" (First In First Out).
 * 3. The process method receives a single asynchronous function that should be executed by following the algorithm described below.
 * 4. If there is currently no asynchronous function being executed by the class, the received callback method should be executed immediately.
 * 5. If there is currently only one asynchronous function being executed, the received callback method should be executed immediately as well.
 * 6. If there are two asynchronous functions currently being executed (see MAX_CONCURRENTLY_EXECUTING in the initial code), the callback method should be put in the queue.
 * 7. After one of the currently executed asynchronous functions is finished: where there was no argument passed to the constructor: the first callback method that was pushed into the queue should be executed (First In First Out). when the argument passed to constructor was LIFO: the last callback method that was pushed into the queue should be executed (Last In First Out).
 * 8. The queue can only accept up to five callbacks (see MAX_QUEUE_SIZE in the initial code): if the queue already has five callbacks, any incoming callbacks should be discarded and they should not be executed. This limit shouldn't take the currently executing callbacks into account.
 */
class QueueProcessingCallback {
  constructor(order = 'FIFO') {
    this.order = order;
    this.queue = [];
    this.executing = 0;
    this.MAX_CONCURRENTLY_EXECUTING = 2;
    this.MAX_QUEUE_SIZE = 5;
  }

  process(callback) {
    if (this.executing < this.MAX_CONCURRENTLY_EXECUTING) {
      this.executing++;
      callback().finally(() => {
        this.executing--;
        if (this.queue.length > 0) {
          this.process(this.queue.shift());
        }
      });
    } else if (this.queue.length < this.MAX_QUEUE_SIZE) {
      if (this.order === 'LIFO') {
        this.queue.push(callback);
      } else {
        this.queue.unshift(callback);
      }
    }
  }
}

// test cases
const queue = new QueueProcessingCallback();

queue.process(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('1');
      resolve();
    }, 1000);
  });
});

queue.process(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('2');
      resolve();
    }, 1000);
  });
});

queue.process(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('3');
      resolve();
    }, 1000);
  });
});

queue.process(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('4');
      resolve();
    }, 1000);
  });
});

queue.process(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('5');
      resolve();
    }, 1000);
  });
});

queue.process(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('6');
      resolve();
    }, 1000);
  });
});

queue.process(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('7');
      resolve();
    }, 1000);
  });
});

queue.process(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('8');
      resolve();
    }, 1000);
  });
});

queue.process(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('9');
      resolve();
    }, 1000);
  });
});
