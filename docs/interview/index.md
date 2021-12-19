# 前端面试汇总
## 基础题

### script标签属性
- async：可选。表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载。只对外部脚本文件有效。
- charset：可选。使用 src 属性指定的代码字符集。这个属性很少使用，因为大多数浏览器不在乎它的值。
- crossorigin：可选。配置相关请求的CORS（跨源资源共享）设置。默认不使用CORS。crossorigin="anonymous"配置文件请求不必设置凭据标志。crossorigin="use-credentials"设置凭据标志，意味着出站请求会包含凭据。
- defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。在 IE7 及更早的版本中，对行内脚本也可以指定这个属性。
- integrity：可选。允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI，Subresource Integrity）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络（CDN，Content Delivery Network）不会提供恶意内容。
- src：可选。表示包含要执行的代码的外部文件。
- type：可选。代替 language，表示代码块中脚本语言的内容类型（也称 MIME 类型）。按照惯例，这个值始终都是"text/javascript"，尽管"text/javascript"和"text/ecmascript"都已经废弃了。JavaScript 文件的 MIME 类型通常是"application/x-javascript"，不过给type 属性这个值有可能导致脚本被忽略。在非 IE 的浏览器中有效的其他值还有"application/javascript"和"application/ecmascript"。如果这个值是 module，则代码会被当成 ES6 模块，而且只有这时候代码中才能出现 import 和 export 关键字。

:::warning 注意
1. defer 和 async 在网络读取（下载）这块儿是一样的，都是异步的（相较于 HTML 解析）
2. 它俩的差别在于脚本下载完之后何时执行，显然 defer 是最接近我们对于应用脚本加载和执行的要求的
3. 关于 defer，此图未尽之处在于它是按照加载顺序执行脚本的，这一点要善加利用
4. async 的脚本并不保证能按照它们出现的次序执行，async 属性的目的是告诉浏览器，不必等脚本下载和执行完后再加载页面，同样也不必等到该异步脚本下载和执行后再加载其他脚本。正因为如此，异步脚本不应该在加载期间修改 DOM。异步脚本保证会在页面的 load 事件前执行，但可能会在 DOMContentLoaded（参见第 17 章）之前或之后
5. 仔细想想，async 对于应用脚本的用处不大，因为它完全不考虑依赖（哪怕是最低级的顺序执行），不过它对于那些可以不依赖任何脚本或不被任何脚本依赖的脚本来说却是非常合适的，最典型的例子：Google Analytics
:::

### 预加载资源

## 进阶题

### 手写深合并
```javascript
function deepMergeObject(a, b) {
  const rest = {}
  Object.keys(b).forEach(key => {
    if (key in a) {
      rest[key] = deepMerge(a[key], b[key])
    } else {
      rest[key] = b
    }
  })
}

function deepMergeArray(a, b) {
  return [...a, ...b]
}

function deepMerge(a, b) {
  if (!a || !b) return a || b
  if (typeof a !== typeof b) return b
  if (Array.isArray(a) && Array.isArray(b)) return deepMergeArray(a, b)

  if (typeof a === 'function') return b
  if (typeof a === 'object') return deepMergeObject(a, b)
  return b
}

```

### 手写Promise函数
```javascript
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
function resolvePromise(x, promise2, resolve, reject) {
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
  constructor(executor) {
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
  then(onFulfilled, onRejected) {
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
  catch(err) {
    // 默认没有成功 只有失败
    return this.then(null, err);
  }
  static resolve(val) {
    return new Promise((resolve, reject) => {
      resolve(val);
    });
  }
  static reject(reason) {
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

module.exports = Promise;
```
