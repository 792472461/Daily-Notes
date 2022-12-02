// promise的三种状态值
// const enum STATUS {
//   PENDING = 'PENDING',
//   FUFILLED = 'FUFILLED',
//   REJECTED = 'REJECTED',
// }

export const isPromise = (obj: any) => {
  return (
    ((typeof obj === 'object' && obj !== null) || typeof obj === 'function') &&
    typeof obj.then === 'function'
  )
}

type Resolve = (params: any) => void;
type Reject = (params: any) => void;

// 处理返回promise情况
function resolvePromise (
  x: Promise,
  promise2: Promise,
  resolve: Resolve,
  reject: Reject
) {
  // If promise and x refer to the same object, reject promise with a TypeError as the reason.
  if (x === promise2) {
    return reject(new TypeError('出错了'))
  }
  // 判断是否promise
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called: boolean = false
    try {
      const then = x.then
      // 这个地方如果采用isPromise，测试过不去
      if (typeof then === 'function') {
        then.call(
          x,
          function (y: Promise) {
            if (called) return
            called = true
            // 递归解析
            resolvePromise(y, promise2, resolve, reject)
          },
          function (r: Promise) {
            if (called) return
            called = true
            reject(r)
          }
        )
      } else {
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(error)
    }
  } else {
    // 普通值
    resolve(x)
  }
}

class Promise {
  defer = () => {}
  status: STATUS = STATUS.PENDING
  value: any = undefined
  reason: any = undefined
  onResolvedCallbacks: Function[] = [] // 成功回调
  onRejectedCallbacks: Function[] = [] // 失败回调

  constructor (executor: (resolve: any, reject: any) => void) {
    const resolve = (val: any) => {
      if (val instanceof Promise) {
        // 是promise 就继续递归解析
        return val.then(resolve, reject)
      }

      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FUFILLED
        this.value = val
        // 发布订阅模式，异步
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    }
    const reject = (reason: Function) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED
        this.reason = reason
        // 发布订阅模式，异步
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (error: any) {
      reject(error)
    }
  }

  then (onFulfilled: any, onRejected: any) {
    // 给定一个默认方法
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (x: any) => x
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err: any) => {
          throw err
        }
    // 链式调用，需要返回一个promise
    const promise2 = new Promise((resolve, reject) => {
      // 成功状态
      if (this.status === STATUS.FUFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(x, promise2, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      // 失败状态
      if (this.status === STATUS.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(x, promise2, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      // 等待状态
      if (this.status === STATUS.PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              resolvePromise(x, promise2, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              resolvePromise(x, promise2, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })

    return promise2
  }

  catch (err: any) {
    // 默认没有成功 只有失败
    return this.then(null, err)
  }

  static resolve (val: any) {
    return new Promise((resolve, reject) => {
      resolve(val)
    })
  }

  static reject (reason: any) {
    // 失败的promise
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
}

// promise的测试方法
// Promise.defer = Promise.deferred = () => {
//   const dfd = {};
//   dfd.promise = new Promise((resolve, reject) => {
//     dfd.resolve = resolve;
//     dfd.reject = reject;
//   });
//   return dfd;
// };

module.exports = Promise
