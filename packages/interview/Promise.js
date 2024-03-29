// promise的三种状态值
const STATUS = {
  PENDING: 'PENDING',
  FUFILLED: 'FUFILLED',
  REJECTED: 'REJECTED'
};

// const isPromise = (obj) => {
//   return (
//     ((typeof obj === 'object' && x !== null) || typeof obj === 'function') &&
//     typeof obj.then === 'function'
//   );
// };

// 处理返回promise情况
function resolvePromise(x, promise2, resolve, reject) {
  // 如果x不是promise
  if (x === promise2) {
    return reject(new TypeError('出错了'));
  }
  // 判断是否promise
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called;
    try {
      const then = x.then;
      // 这个地方如果采用isPromise，测试过不去
      if (typeof then === 'function') {
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
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (x) => x;
    onRejected =
      typeof onRejected === 'function'
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
