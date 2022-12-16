# 手写题篇

## 深合并

```js
/**
 * @param {object} target
 * @param {object} source
 * @return {object}
 */
const deepMerge = (target, source) => {
  // 遍历source
  for (const key in source) {
    // 如果source的key在target中存在
    if (key in target) {
      // 如果source的key对应的值是对象
      if (typeof source[key] === 'object') {
        // 递归调用deepMerge
        deepMerge(target[key], source[key])
      } else {
        // 否则直接赋值
        target[key] = source[key]
      }
    } else {
      // 如果source的key在target中不存在，直接赋值
      target[key] = source[key]
    }
  }
  return target
}
```

## 深拷贝

简易深拷贝，不考虑循环引用

```js
/**
 * @param {any} obj
 * @return {any}
 */
const deepClone = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  const result = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result
}
```

## 节流函数

```js
/**
 * @param {function} fn
 * @param {number} delay
 * @return {function}
 */
const throttle = (fn, delay) => {
  let timer = null
  return function () {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}
```

## 防抖函数

```js
/**
 * @param {function} fn
 * @param {number} delay
 * @return {function}
 */
const debounce = (fn, delay) => {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}
```

## 数组扁平化

```js
/**
 * @param {any[]} arr
 * @return {any[]}
 */
const flatten = (arr) => {
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? flatten(cur) : cur)
  }, [])
}
```

## 数组去重

```js
/**
 * @param {any[]} arr
 * @return {any[]}
 */
const unique = (arr) => {
  return arr.reduce((prev, cur) => {
    return prev.includes(cur) ? prev : [...prev, cur]
  }, [])
  // return [...new Set(arr)]
}
```

## 数组乱序

```js
/**
 * @param {any[]} arr
 * @return {any[]}
 */
const shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5)
}
```

## 函数柯里化

```js
/**
 * @param {function} fn
 * @return {function}
 */
const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}
```

## LRU 缓存

```js
function Node (val, next = null, pre = null) {
  this.val = val
  this.key = null
  this.pre = next
  this.next = pre
}

/**
 * @param {number} capacity
 */
const LRUCache = function (capacity) {
  this.h = new Map()
  this.head = new Node()
  this.tail = new Node()
  this.head.next = this.tail
  this.tail.pre = this.head
  this.capacity = capacity
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  // 没有就返回-1
  if (!this.h.get(key)) return -1
  // 如果存在
  const node = this.h.get(key)
  this.remove(node)
  this.insert(this.head, node)
  return node.val
}

LRUCache.prototype.remove = function (node) {
  node.pre.next = node.next
  node.next.pre = node.pre
}

LRUCache.prototype.insert = function (p, node) {
  p.next.pre = node
  node.next = p.next
  p.next = node
  node.pre = p
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (!this.h.get(key)) {
    const node = new Node(value)
    // 存储一下这个key
    node.key = key
    this.h.set(key, node)
    this.insert(this.head, node)
    if (this.h.size > this.capacity) {
      this.h.delete(this.tail.pre.key)
      // 删除最后一个
      this.remove(this.tail.pre)
    }
  } else {
    const node = this.h.get(key)
    node.val = value
    // 从链表中删除
    this.remove(node)
    // 加到最前面
    this.insert(this.head, node)
  }
}
```

## 实现call、apply、bind

```js
/**
 * @param {any} context
 * @param  {...any} args
 * @return {any}
 */
Function.prototype.myCall = function (context, ...args) {
  context = context || window
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}

/**
 * @param {any} context
 * @param {any[]} args
 * @return {any}
 */
Function.prototype.myApply = function (context, args) {
  context = context || window
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}
/**
 * @param {any} context
 * @return {any}
 */
Function.prototype.myBind = function (context) {
  context = context || window
  const _this = this
  const args = [...arguments].slice(1)
  return function F() {
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
```

### 实现new

```js
/**
 * @param {function} fn
 * @param  {...any} args
 * @return {any}
 */
function myNew (fn, ...args) {
  const obj = Object.create(fn.prototype)
  const result = fn.apply(obj, args)
  return result instanceof Object ? result : obj
}
```

## 实现instanceof

```js
/**
 * @param {any} left
 * @param {any} right
 * @return {boolean}
 */
function myInstanceof (left, right) {
  let proto = Object.getPrototypeOf(left)
  while (true) {
    if (proto === null) return false
    if (proto === right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}
```

## 实现eventBus

```js
class EventBus {
  constructor () {
    this.h = {}
  }
  on (name, fn) {
    if (!this.h[name]) {
      this.h[name] = []
    }
    this.h[name].push(fn)
  }
  emit (name, ...args) {
    if (this.h[name]) {
      this.h[name].forEach((fn) => {
        fn(...args)
      })
    }
  }
  off (name, fn) {
    if (this.h[name]) {
      this.h[name] = this.h[name].filter((item) => item !== fn)
    }
  }
}
```

## 实现简易时间切片

```js
const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

const works = [
  () => {
    console.log('第1个任务开始')
    return sleep(20)
    console.log('第1个任务结束')
  },
  () => {
    console.log('第2个任务开始')
    return sleep(20)
    console.log('第2个任务结束')
  },
  () => {
    console.log('第3个任务开始')
    return sleep(20)
    console.log('第2个任务结束')
  },
  () => {
    console.log('第4个任务开始')
    return sleep(20)
    console.log('第2个任务结束')
  }
]
const workLoop = async (deadline) => {
  console.log(`本帧空闲时间为${deadline.timeRemaining()}ms`)
  // 如果还有任务并且本帧还有空闲时间
  while (deadline.timeRemaining() > 1 && works.length > 0) {
    const work = works.shift()
    await work()
  }
  // 如果还有任务，就继续执行
  if (works.length > 0) {
    // 等待下一帧
    requestIdleCallback(workLoop)
  }
}
requestIdleCallback(workLoop)
```

## 实现Promise

符合Promise/A+规范的Promise

```js
// promise的三种状态值
const STATUS = {
  PENDING: "PENDING",
  FUFILLED: "FUFILLED",
  REJECTED: "REJECTED",
};

const isPromise = (obj) => {
  return (
    ((typeof obj === "object" && x !== null) || typeof obj === "function") &&
    typeof obj.then === "function"
  );
};

// 处理返回promise情况
function resolvePromise (x, promise2, resolve, reject) {
  // If promise and x refer to the same object, reject promise with a TypeError as the reason.
  if (x === promise2) {
    return reject(new TypeError("出错了"));
  }
  // 判断是否promise
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let called;
    try {
      const then = x.then;
      // 这个地方如果采用isPromise，测试过不去
      if (typeof then === "function") {
        then.call(
          x,
          function (y) {
            if (called) return;
            called = true;
            // 递归解析
            resolvePromise(y, promise2, resolve, reject);
          },
          function (r) {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // 普通值
    resolve(x);
  }
}

class Promise {
  constructor (executor) {
    this.status = STATUS.PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = []; // 成功回调
    this.onRejectedCallbacks = []; // 失败回调
    this.status = STATUS.PENDING;

    const resolve = (val) => {
      if (val instanceof Promise) {
        // 是promise 就继续递归解析
        return val.then(resolve, reject);
      }

      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FUFILLED;
        this.value = val;
        // 发布订阅模式，异步
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED;
        this.reason = reason;
        // 发布订阅模式，异步
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then (onFulfilled, onRejected) {
    // 给定一个默认方法
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (x) => x;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
          throw err;
        };
    // 链式调用，需要返回一个promise
    let promise2 = new Promise((resolve, reject) => {
      // 成功状态
      if (this.status === STATUS.FUFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(x, promise2, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      // 失败状态
      if (this.status === STATUS.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(x, promise2, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      // 等待状态
      if (this.status === STATUS.PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(x, promise2, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(x, promise2, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }

  catch (err) {
    // 默认没有成功 只有失败
    return this.then(null, err);
  }

  static resolve (val) {
    return new Promise((resolve, reject) => {
      resolve(val);
    });
  }

  static reject (reason) {
    // 失败的promise
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
}

// promise的测试方法
Promise.defer = Promise.deferred = () => {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

```
