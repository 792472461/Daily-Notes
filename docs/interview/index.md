# 前端面试汇总

## 基础题

### script标签属性

- async：可选。表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载。只对外部脚本文件有效。
- charset：可选。使用 src 属性指定的代码字符集。这个属性很少使用，因为大多数浏览器不在乎它的值。
- crossorigin：可选。配置相关请求的CORS（跨源资源共享）设置。默认不使用CORS。crossorigin="anonymous"配置文件请求不必设置凭据标志。crossorigin="use-credentials"
  设置凭据标志，意味着出站请求会包含凭据。
- defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。在 IE7 及更早的版本中，对行内脚本也可以指定这个属性。
- integrity：可选。允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI，Subresource
  Integrity）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络（CDN，Content Delivery Network）不会提供恶意内容。
- src：可选。表示包含要执行的代码的外部文件。
- type：可选。代替 language，表示代码块中脚本语言的内容类型（也称 MIME 类型）。按照惯例，这个值始终都是"text/javascript"，尽管"text/javascript"和"text/ecmascript"
  都已经废弃了。JavaScript 文件的 MIME 类型通常是"application/x-javascript"，不过给type 属性这个值有可能导致脚本被忽略。在非 IE 的浏览器中有效的其他值还有"
  application/javascript"和"application/ecmascript"。如果这个值是 module，则代码会被当成 ES6 模块，而且只有这时候代码中才能出现 import 和 export 关键字。

:::warning 注意

1. defer 和 async 在网络读取（下载）这块儿是一样的，都是异步的（相较于 HTML 解析）
2. 它俩的差别在于脚本下载完之后何时执行，显然 defer 是最接近我们对于应用脚本加载和执行的要求的
3. 关于 defer，此图未尽之处在于它是按照加载顺序执行脚本的，这一点要善加利用
4. async 的脚本并不保证能按照它们出现的次序执行，async 属性的目的是告诉浏览器，不必等脚本下载和执行完后再加载页面，同样也不必等到该异步脚本下载和执行后再加载其他脚本。正因为如此，异步脚本不应该在加载期间修改
   DOM。异步脚本保证会在页面的 load 事件前执行，但可能会在 DOMContentLoaded（参见第 17 章）之前或之后
5. 仔细想想，async 对于应用脚本的用处不大，因为它完全不考虑依赖（哪怕是最低级的顺序执行），不过它对那些可以不依赖任何脚本或不被任何脚本依赖的脚本来说却是非常合适的，最典型的例子：Google Analytics
   :::

### var,let,const区别

| 区别 | var  | let | const |
|:---: | :---: | :---: |:-----:|
| 是否会产生"块级作用域" | ❎ | ✅ | ✅ |
| 是否会被声明提升 | ✅ | ✅ | ✅ |
| 是否会保存到window中 | ✅ | ✅ | ✅ |
| 相同作用域中能否重复声明 | ✅ | ✅ | ✅ |
| 是否能提前使用 | ✅ | ✅ | ✅ |
| 是否必须设置初始值 | ❎ | ✅ | ✅ |
| 是否修改实际保存在变量中的原始类型值或引用类型地址 | ✅ | ✅ | ❎|

### JS创建对象的方式

1. new Object() 缺点: 步骤多
2. 字面量: var 对象名={} 缺点: 如果反复创建多个对象，代码会很冗余
3. 工厂函数方式

```javascript
function createPerson (name, age) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.say = function () { alert(this.name); }
  return o;
}

var p1 = createPerson("lilei", 11);
```

缺点: 本质还是Object()，将来无法根据对象的原型对象准确判断对象的类型

4. 构造函数方式：

- 先用构造函数定义一类对象的统一属性结构和方法
- 再用new调用构造函数，反复创建相同属性结构，不同属性值的多个对象
- 缺点: 如果构造函数中包含方法，则重复创建，浪费内存

```javascript
function Student (sname, sage) {
  this.sname = sname;
  this.sage = sage;
  this.intr = function () {}
}

var lilei = new Student("lilei", 11)
```

5. 原型对象方式：先创建完全相同的对象，再给子对象添加个性化属性。

```javascript
function Person () {
}

Person.prototype.name = "主人很懒"
Person.prototype.age = 11;
Person.prototype.say = function () {
  console.log(this.name);
};
var p1 = new Person(); //创建一个实例p1
p1.name = "Li Lei" //禁止修改共有属性，而是自动太你家自由属性
var p2 = new Person(); //创建实例p2
p2.name = "Han Meimei"; //同上
console.log(lilei);
console.log(hmm);
```

缺点: 步骤繁琐

6. 混合模式：先创建完全相同的对象，再给子对象添加个性化属性。

```javascript
function Person (name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.say = function () {
  console.log(this.name);
};
var p1 = new Person("Li Lei", 11);
var p2 = new Person("Han Meimei", 12);
console.log(lilei);
console.log(hmm);
```

缺点： 不符合面向对象封装思想

7. 动态混合：先创建完全相同的对象，再给子对象添加个性化属性。 缺点: 语义不符，其实if只在创建第一个对象时有意义。

```javascript
function Person (name, age) {
  this.name = name;
  this.age = age;
  if (Person.prototype.say === "undefined") {
    Person.prototype.say = function () {
      console.log(this.name);
    };
  }
}

var p1 = new Person("Li Lei", 11);
var p2 = new Person("Han Meimei", 12);
console.log(lilei);
console.log(hmm);
```

8. 寄生构造函数：构造函数里调用其他的构造函数

```javascript
function Person (name, age) {
  this.name = name;
  this.age = age;
  if (Person.prototype.say === "undefined") {
    Person.prototype.say = function () {
      console.log(this.name);
    };
  }
}

function Student (name, age, className) {
  var p = new Person(name, age); //借鸡生蛋——橘子
  p.className = className
  return p;
}

var p1 = new Student("Li Lei", 11, "初一2班");
var p2 = new Student("Han Meimei", 12, "初二2班");
console.log(lilei);
console.log(hmm);
```

缺点: 可读性差。

9. es5的class

### new Function过程

1. 创建一个新的空对象等待
2. 让子对象继承构造函数的原型对象
3. 调用构造函数，将this替换为新对象，通过强行赋值方式为新对象添加 规定的属性
4. 返回新对象地址

### 继承

1. 原型链式继承: 将父类的实例作为子类的原型

```javascript
// 定义一个父类型
function Animal (name) {
  this.name = name;
  this.say = function () { console.log(`I'm ${this.name}`); }
}

// 原型对象方法
Animal.prototype.eat = function (food) {
  console.log(this.name + '正在吃：' + food);
};

function Cat () { }

Cat.prototype = new Animal();
Cat.prototype.name = 'cat'
var cat = new Cat();
```

缺点: 创建子类实例时，无法向父类构造函数传参

2.构造函数继承:

```javascript
// 定义一个父类型
function Animal (name) {
  this.name = name
  this.say = function () { console.log(`I'm ${this.name}`); }
}

// 原型对象方法
Animal.prototype.eat = function (food) {
  console.log(`${this.name}吃${food}`)
}

function Cat (name, age) {
  Animal.call(this, name)
  this.age = age
}

var cat = new cat()
```

3. 实例继承

```javascript
// 定义一个父类型
function Animal (name) {
  this.name = name
  this.say = function () { console.log(`I'm ${this.name}`); }
}

// 原型对象方法
Animal.prototype.eat = function (food) {
  console.log(`${this.name}吃${food}`)
};

function Cat (name, age) {
  var o = new Animal(name); //先创建子类型实例
  o.age = age;
  return o;
}

var cat = new Cat();
```

4. 拷贝继承: 无法获取父类不可for in遍历的方法

```javascript
// 定义一个父类型
function Animal (name) {
  this.name = name
  this.say = function () { console.log(`I'm ${this.name}`); }
}

// 原型对象方法
Animal.prototype.eat = function (food) {
  console.log(`${this.name}吃${food}`)
};

function Cat (name, age) {
  var animal = new Animal(name)
  for (var p in animal) {
    Cat.prototype[p] = animal[p]
  }
  this.age = age
}

var cat = new Cat();
```

5. 组合继承

```javascript
// 定义一个父类型
function Animal (name) {
  this.name = name
  this.say = function () { console.log(`I'm ${this.name}`); }
}

// 原型对象方法
Animal.prototype.eat = function (food) {
  console.log(`${this.name}吃${food}`)
};

function Cat (name, age) {
  Animal.call(this, name);
  this.age = age
}

Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
var cat = new Cat();
```

6. 寄生组合继承

```javascript
function Animal (name) {
  this.name = name
  this.say = function () { console.log(`I'm ${this.name}`); }
}

// 原型对象方法
Animal.prototype.eat = function (food) {
  console.log(`${this.name}吃${food}`)
};

function Cat (name, age) {
  Animal.call(this, name);
  this.age = age
}

(function () { // 创建一个没有实例方法的类
  var Super = function () {};
  Super.prototype = Animal.prototype; //将实例作为子类的原型
  Cat.prototype = new Super();
})();
var cat = new Cat();
```

7. ES6 class extends继承

```javascript
class Animal {
  constructor (name) {
    this.name = name
  }
}

class Cat extends Animal {
  constructor (name) {
    super.constructor(name);
  }
}
```

### 箭头函数什么时候不能使用

1. 构造函数不能使用
2. 对象的方法不能用
3. 原型对象方法不能用
4. DOM中时间处理函数不能用
5. 箭头函数无法使用call，apply，bind等
6. 箭头函数不支持arguments
7. 箭头函数没有prototype

:::tip 概念

- 父对象中的成员, 子对象无需重复创建，就可直接使用！
- 就像使用自己的成员一样！
- 可以直接this.属性名/方法名()
  :::

### 深拷贝

JavaScript中对象是引用类型，保存的是地址，深、浅拷贝的区别是，当拷贝结束后，在一定程度上改变原对象中的某一个引用类型属性的值，新拷贝出来的对象依然受影响的话，就是浅拷贝，反之就是深拷贝。

1. JSON.stringify()以及JSON.parse()，无法深克隆undefined值和内嵌函数
2. Object.assign(target, source)
3. 递归实现深拷贝

```javascript
function deepClone (obj) {
  function isObject (o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null;
  }

  if (!isObject(obj)) {
    throw new Error('非对象');
  }
  var isArray = Array.isArray(obj);
  var newObj = isArray ? [...obj] : { ...obj };
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(newObj[key]) ? deepClone(newObj[key]) : newObj[key];
  })
  return newObj;
}

var obj = {
  name: 'AAA',
  age: 23,
  job: {
    name: 'FE',
    money: 12000
  }
}
```

### call, apply, bin

call实现

```javascript
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }
  const symbolFn = Symbol()
  const args = [...arguments].slice(1)
  context = context || window
  context[symbolFn] = this
  const result = context[symbolFn](...args)
  delete context[symbolFn]
  return result
}
const obj = {
  name: 'obj'
}

function foo () {
  console.log(this.name)
}

foo.myCall(obj) // obj
```

apply

```javascript
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('error');
  }
  context = context || window;
  context.fn = this;
  var result = arguments[1] ? context.fn(...arguments[1]) : context.fn();
  delete context.fn;
  return result;
}

function foo () {
  console.log(this.age);
}

var obj = {
  age: 101
}
foo.myApply(obj); // 输出101
```

bind

```javascript
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw TypeError('error');
  }
  const self = this;
  const args = [...arguments].slice(1);
  return function F () {
    if (this instanceof F) {
      return new self(...args, ...arguments);
    }
    return self.apply(context, args.concat(...arguments));
  }
}

function foo () {
  console.log(this.age);
}

var obj = {
  age: 121
}
var newFunc = foo.myBind(obj);
newFunc(); // 输出121
```

### 浏览器中的进程

1. 浏览器进程：负责界面显示、用户交互、子进程管理，提供存储等。
2. 渲染进程：每个也卡都有单独的渲染进程，核心用于渲染页面。
3. 网络进程：主要处理网络资源加载(HTML、CSS,、JS等)
4. GPU进程：3d绘制,提高性能
5. 插件进程： chrome中安装的一些插件

### 渲染进程（包含着多个线程）

1. GUI渲染线程 （渲染页面的）
2. js引擎线程 他和页面渲染时互斥
3. 事件触发线程 独立的线程 EventLoop
4. 事件 click、setTimeout、ajax也是一个独立线程 微任务队列每次都会创建一个全新的队列、事件队列仅有一个(微任务队列每次都会创建一个全新的队列、事件队列仅有一个)
5. 事件队列、消息队列：存放定时器到达时间的回调函数、ajax回调成功的函数等
6. 事件循环：不断检测调用栈是否为空，如果为空则从事件对列中取出一个来执行

### 宏任务|微任务

1. 宏任务script ui 渲染、setTimeout、setInterval、postMessage、MessageChannel、SetImmediate
2. 微任务promise mutationObserver、process.nextTick

::: tip 提示

每循环一次会执行一个宏任务，并清空对应的微任务队列，每次事件循环完毕后会判断页面是否需要重新渲染 （大约16.6ms会渲染一次）
:::


### 利用swc或者esbuild提升webpack构建速度

:::tip 什么是 swc 和 esbuild
swc（stands for Speedy Web Compiler）是一个基于 Rust 语言的可扩展平台，目前已经被 Next.js、Parcel、Deno 等使用。它支持编译和打包。
esbuild 是一个基于 Go 语言的构建工具。
:::

各自的特性

swc 的特性：

- 可用于编译
- 可用于打包（swcpack）
- 支持 Minification
- 利用 WebAssembly 进行转换
- 可以用于 webpack 中（swc-loader）
- @swc/jest 提高 Jest 性能
- 支持自定义插件

esbuild 的特性：

- 极快的速度，无需缓存
- 支持 ES6 和 CommonJS 模块
- 支持对 ES6 模块进行 tree shaking
- API 可同时用于 JavaScript 和 Go
- 兼容 TypeScript 和 JSX 语法
- 支持 Source maps
- 支持 Minification
- 支持 plugins
- 可用于 webpack 中，结合 esbuild-loader 使用


#### swc 和 esbuild 为什么快

swc为什么快

babeljs编译流程

js源码 -> 解析成AST树 -> 转译成二进制码 -> 机器码

将源码转变成`AST`树很耗时，而`swc`是基于`Rust`语言的，它直接将源码根据不同平台编译成对应的二进制文件，直接跳过了转`AST`步骤，速度大大提升。

esbuild 为什么快

- 它是用 Go 语言编写的，并可以编译为本地代码；
- 大量使用并行操作；
- 未引用第三方依赖；
- 内存的高效利用，尽量复用 AST 数据。


#### swc 和 esbuild 在 webpack 中使用

在 webpack 中需要用 swc-loader 来使用

```javascript
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {
        // `.swcrc` can be used to configure swc
        loader: "swc-loader"
      }
    }
  ];
}
```

webpack 中需要用 esbuild-loader 来使用

```javascript
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      loader: 'esbuild-loader',
      options: {
        loader: 'jsx',
        target: 'es2015'
      },
    }
  ]
}
```

## 进阶题

### 手写深合并

```javascript
function deepMergeObject (a, b) {
  const rest = {}
  Object.keys(b).forEach(key => {
    if (key in a) {
      rest[key] = deepMerge(a[key], b[key])
    } else {
      rest[key] = b
    }
  })
}

function deepMergeArray (a, b) {
  return [...a, ...b]
}

function deepMerge (a, b) {
  if (!a || !b) return a || b
  if (typeof a !== typeof b) return b
  if (Array.isArray(a) && Array.isArray(b)) return deepMergeArray(a, b)

  if (typeof a === 'function') return b
  if (typeof a === 'object') return deepMergeObject(a, b)
  return b
}

```

### Promise.finally原理

```javascript
Promise.prototype.finally = function (callback) {
  return this.then((data) => {
    // 让函数执行 内部会调用方法，如果方法是promise需要等待他完成
    return Promise.resolve(callback()).then(() => data)
  }, err => {
    return Promise.resolve(callback()).then(() => {
      throw err
    })
  })
}
```

### Promise.race原理

```javascript
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      let currentVal = promises[i];
      if (currentVal && typeof currentVal.then == 'function') {
        currentVal.then(resolve, reject);
      } else {
        resolve(currentVal);
      }
    }
  })
}
```

### promisify原理

```javascript
function promisify (fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, function (err, data) {
        if (err) reject();
        resolve(data);
      })
    });
  }
}

let read = promisify(fs.readFile);
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

module.exports = Promise;
```

## 好文

- [面试] [前端面试真题，会80%直接进大厂](https://bitable.feishu.cn/app8Ok6k9qafpMkgyRbfgxeEnet?from=logout&table=tblEnSV2PNAajtWE&view=vewJHSwJVd)

- [算法] [labuladong 的算法小抄](https://labuladong.gitee.io/algo/)
- [LeetCode学习](https://github.com/azl397985856/leetcode)
- [力扣加加](https://leetcode-solution-leetcode-pp.gitbook.io/leetcode-solution/)
- [CodeTop](https://codetop.cc/home)

- [if 我是前端团队 Leader，怎么制定前端协作规范](https://juejin.cn/post/6844903897610321934)
- [前端常用插件、工具类库汇总](https://juejin.cn/post/6844903683411410951)
- [茂茂物语](https://notes.fe-mm.com/)
- [印记中文](https://docschina.org/)
- [深入理解Typescript](https://jkchao.github.io/typescript-book-chinese/)
- [vue-cli源码解析](https://llccing.github.io/vue-learn-share/)
- [vue3源码分析](https://diy4869.github.io/vue-next-analysis/)
- [react技术揭秘](https://react.iamkasong.com/me.html)
- [美团技术团队](https://tech.meituan.com/)
- [babel用户手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md)
- [nodejs源码解析](https://github.com/theanarkh/understand-nodejs)

## Node相关

### 执行一个nodejs文件是一进程还是线程

- 进程是应用程序的执行副本。（OS分配资源的最小单位）
- 线程是轻量级的进程。（OS执行程序的最小单位）
