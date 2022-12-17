# 手写题篇

## 深合并 {#deepMerge}

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

## 深拷贝 {#deepClone}

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

## 深比较 {#isEquals}

```js
/**
 * 深度比较两个对象
 * @param {*} a
 * @param {*} b
 */
 */
const isEquals = (a, b) => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== "object" && typeof b !== "object")) return a === b;
  if (a.prototype !== b.prototype) return false;
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every((key) => isEquals(a[key], b[key]));
};
```

## 节流函数 {#throttle}

节流函数，用于限制函数的执行频率，比如在滚动事件中，如果不使用节流函数，那么在滚动过程中，函数会被频繁调用，这样会造成性能问题，因此我们可以使用节流函数，限制函数的执行频率，比如每隔100ms执行一次

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

## 防抖函数 {#debounce}

防抖函数，用于限制函数的执行频率，比如在滚动事件中，如果不使用防抖函数，那么在滚动过程中，函数会被频繁调用，这样会造成性能问题，因此我们可以使用防抖函数，限制函数的执行频率，比如在滚动结束后，再执行函数

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

## 数组扁平化 {#flatten}

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

## 数组去重 {#unique}

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

## 数组乱序 {#shuffle}

```js
/**
 * @param {any[]} arr
 * @return {any[]}
 */
const shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5)
}
```

## 函数柯里化 {#curry}

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

## 重试请求 {#retry}
  
```js
/**
 * @description: 重试请求
 * @param {Function} fn
 * @param {Number} count
 * @return {Promise}
 */
function retry (fn, count = 3) {
  return new Promise((resolve, reject) => {
    function attempt () {
      fn()
        .then(resolve)
        .catch((err) => {
          console.log(`还有${count}次机会`);
          if (count === 1) {
            reject(err);
            return;
          }
          count--;
          attempt();
        });
    }
    attempt();
  });
}
```

## 请求并发控制 {#requestAndMax}

```js
/**
 * @description: 请求并发控制
 * @param {Array} urls
 * @param {Number} max
 * @return {Promise}
 */
function request (urls, max) {
  const len = urls.length;
  const result = new Array(len).fill(false);
  let i = 0;
  return new Promise((resolve, reject) => {
    function send () {
      while (i < max) {
        const current = i++;
        fetch(urls[current])
          .then((res) => {
            result[current] = res;
            if (result.filter(Boolean).length === len) {
              resolve(result);
            } else if (i < len) {
              send();
            }
          })
          .catch((err) => {
            result[current] = err;
            if (result.filter(Boolean).length === len) {
              resolve(result);
            } else if (i < len) {
              send();
            }
          });
      }
    }
    send();
  });
}
```

## 实现LRU 缓存 {#LRU}

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

## 实现call、apply、bind {#callAndApplyAndBind}

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

## 实现new {#new}

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

## 实现instanceof {#instanceof}

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

## 实现eventBus {#eventBus}

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

## 实现发布订阅 {#eventEmitter}

```js
class EventEmitter {
  constructor() {
    // 事件对象，存放订阅的名字和事件
    this.events = {};
  }
  // 订阅事件的方法
  on(eventName,callback) {
    if (!this.events[eventName]) {
      // 注意数据，一个名字可以订阅多个事件函数
      this.events[eventName] = [callback];
    } else  {
      // 存在则push到指定数组的尾部保存
      this.events[eventName].push(callback)
    }
  }
  // 触发事件的方法
  emit(eventName) {
    // 遍历执行所有订阅的事件
    this.events[eventName] && this.events[eventName].forEach(cb => cb());
  }
}
```

## 实现简易时间切片 {#timeSlice}

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

## 实现jsonp {#jsonp}

原理：动态创建script标签，src指向一个带有callback参数的url，服务端返回一个函数调用，函数的参数就是我们需要的数据

```js
const jsonp = (url, params, callback) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    window[callback] = function (data) {
      resolve(data)
      document.body.removeChild(script)
    }
    params = { ...params, callback }
    let arrs = []
    for (let key in params) {
      arrs.push(`${key}=${params[key]}`)
    }
    script.src = `${
      url.indexOf('?') > -1 ? url : url + '?'
    }${arrs.join('&')}`
    document.body.appendChild(script)
  })
}
```

## 实现简易reactive {#reactive}

reactive的原理就是通过Object.defineProperty来监听对象的变化，当对象发生变化时，执行对应的回调函数

```js
const isObject = (target) => {
  return typeof target === 'object' && target !== null
}
const hasOwn = (target, key) => {
  return target.hasOwnProperty(key)
}
const reactive = (target) => {
  if (!isObject(target)) {
    return target
  }
  const handler = {
    get (target, key, receiver) {
      const res = Reflect.get(target, key, receiver)
      console.log('get', key, res)
      return isObject(res) ? reactive(res) : res
    },
    set (target, key, value, receiver) {
      const hadKey = hasOwn(target, key)
      const oldValue = target[key]
      const res = Reflect.set(target, key, value, receiver)
      if (!hadKey) {
        console.log('add', key, value)
      } else if (oldValue !== value) {
        console.log('update', key, value)
      }
      return res
    },
    deleteProperty (target, key) {
      const res = Reflect.deleteProperty(target, key)
      if (res) {
        console.log('delete', key)
      }
      return res
    }
  }
  return new Proxy(target, handler)
}
```

## 实现图片懒加载 {#lazyLoad}

```js
const imgs = document.querySelectorAll('img')
const len = imgs.length
let count = 0
const load = () => {
  let seeHeight = document.documentElement.clientHeight
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  for (let i = count; i < len; i++) {
    if (imgs[i].offsetTop < seeHeight + scrollTop) {
      if (imgs[i].getAttribute('src') === 'default.jpg') {
        imgs[i].src = imgs[i].getAttribute('data-src')
      }
      count++
    }
  }
}
load()
window.addEventListener('scroll', load)
```

## 实现 getValue/setValue 函数来获取 path 对应的值 {#getValueAndsetValue}

```js
const obj = {
  a: {
    b: {
      c: 1
    }
  },
  d: [2, 3]
}
const getValue = (obj, path) => {
  return path.split('.').reduce((prev, next) => {
    if(next.indexOf('[') > -1) {
      const index = next.match(/\[(\d+)\]/)[1]
      next = next.replace(/\[(\d+)\]/, '')
      return prev[next][index]
    }
    return prev[next]
  }, obj)
}
const setValue = (obj, path, value) => {
  let paths = path.split('.')
  let key = paths.pop()
  let target = paths.reduce((prev, next) => {
    return prev[next]
  }, obj)
  target[key] = value
}
console.log(getValue(obj, 'a.b.c')) // 1
console.log(getValue(obj, 'd[0]')) // 2
setValue(obj, 'a.b.c', 2)
setValue(obj, 'd[1]', 4)
console.log(obj) // { a: { b: { c: 2 } }, d: [ 2, 4 ] }
```

## 实现Promise {#Promise}

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

## 实现Promise.all {PromiseAll}

```js
/**
 * @description: Promise.all
 * @param {Array} promises
 * @return {Promise}
 */
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let arr = [];
    let i = 0;
    function processData (index, data) {
      arr[index] = data;
      if (++i === promises.length) {
        resolve(arr);
      }
    }
    for (let i = 0; i < promises.length; i++) {
      promises[i].then((data) => {
        processData(i, data);
      }, reject);
    }
  });
};
```
