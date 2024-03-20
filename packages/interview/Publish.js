class Publish {
  constructor() {
    this.subscribers = [];
  }
  // 订阅
  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
  // 发布
  publish() {
    this.subscribers.forEach((subscriber) => {
      subscriber.update();
    });
  }
}

class Subscribe {
  constructor(name) {
    this.name = name;
  }
  update() {
    console.log(`${this.name} received`);
  }
}

// test
const publish = new Publish();
const subscribe1 = new Subscribe('subscribe1');
const subscribe2 = new Subscribe('subscribe2');
publish.subscribe(subscribe1);
publish.subscribe(subscribe2);

publish.publish();
