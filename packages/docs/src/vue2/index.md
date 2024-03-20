# Vue2.x源码解析

::: tip 先了解几个概念

- Observer: 观察者，用来观察数据的变化
- Dep: 依赖，用来收集依赖，当数据发生变化时，通知依赖更新
- Watcher: 观察者，用来观察数据的变化，当数据发生变化时，执行回调函数
:::

在Vue2中，目录结构如下:

```bash
|-- src
|   |-- compiler // 编译相关
|   |   |-- codegen 
|   |   |-- directives
|   |   |-- index.js
|   |   |-- parser
|   |   |-- to-function.js
|   |   |-- utils.js
|   |-- core // 核心代码
|   |   |-- components
|   |   |-- config.js
|   |   |-- global-api
|   |   |-- index.js
|   |   |-- instance
|   |   |-- observer
|   |   |-- util
|   |   |-- vdom
|   |-- platforms // 平台相关
|   |   |-- web
|   |   |   |-- compiler
|   |   |   |-- entry-runtime-with-compiler.js
|   |   |   |-- runtime
|   |   |   |-- server
|   |   |   |-- util
|   |   |-- weex
|   |   |   ...
|   |-- server
|   |   |-- ...
|   |-- sfc
|   |   |-- parse.js
|   |   |-- stringify.js
|   |-- shared
|   |   |-- constants.js
|   |   |-- util.js
|   |-- scripts
|   |   |-- build.js
|   |   |-- ...
├── README.md
|-- package.json
|-- ...
```

其中`src/core`目录下的代码是Vue的核心代码，`src/platforms`目录下的代码是平台相关的代码，`src/compiler`目录下的代码是编译相关的代码。

## 从入口来分析Vue的实现

实现Vue构造函数，以及初始化相关的代码，都在`src/core/index.js`中。我们只实现主要的代码，不实现一些辅助的代码。

```js
// 构造函数
function Vue(options) {
  this._init(options);
}

// 初始化
Vue.prototype._init = function(options) {
  const vm = this;
  vm.$options = options;
  initState(vm);
};

// 初始化状态
function initState(vm) {
  const opts = vm.$options;
  
  if (opts.data) {
    initData(vm);
  }
  // TODO: 还有props、methods、computed、watch，这里只实现data
}

// 初始化数据
function initData(vm) {
  let data = vm.$options.data;
  // 如果是函数，就取返回值，否则就取data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
  // 数据代理
  for (let key in data) {
    proxy(vm, '_data', key);
  }
  observe(data);
}

function observe(value) {
  // 判断是否是对象，如果不是对象，就不用观察了
  if (!value || typeof value !== 'object') {
    return;
  }
  // 如果已经有Observer实例了，就直接返回
  if (value.__ob__) {
    return value.__ob__;
  }
  return new Observer(value);
}

// 数据代理，为的是可以直接通过vm.xxx访问data中的数据
function proxy(target, sourceKey, key) {
  Object.defineProperty(target, key, {
    get() {
      return target[sourceKey][key];
    },
    set(newValue) {
      target[sourceKey][key] = newValue;
    },
  });
}
```

## 实现响应式

响应式的实现，主要是通过`Object.defineProperty`来实现的。在`src/core/observer/index.js`中，实现了`Observer`类，用来观察数据的变化。

```js
// Object.defineProperty实现响应式
class Observer {
  constructor(value) {
    // 添加__ob__属性，值为Observer实例
    Object.defineProperty(value, '__ob__', {
      value: this, // 这里的this就是Observer实例
      enumerable: false, // 不可枚举
      writable: true, // 可写
      configurable: true, // 可配置
    });
    if (Array.isArray(value)) {
      // 重写数组的方法
      value.__proto__ = arrayMethods;
      // 如果数组中的元素是对象，就需要对元素进行观察
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
  // 遍历数组，为数组中的每个元素添加响应式
  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
  // 遍历对象的每个key，为每个key添加响应式
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]);
    }
  }
}

// 重写数组的方法
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(
  function fn(method) {
    // 缓存原始方法
    const original = arrayProto[method];
    Object.defineProperty(arrayMethods, method, {
      value: function mutator(...args) {
        // 调用原始方法
        const result = original.apply(this, args);
        // 获取Observer实例
        const ob = this.__ob__;
        // 定义新增的元素
        let inserted;
        switch (method) {
          case 'push':
          case 'unshift':
            inserted = args;
            break;
          case 'splice':
            inserted = args.slice(2);
            break;
        }
        // 如果有新增的元素，就对新增的元素进行观察
        if (inserted) ob.observeArray(inserted);
        // 通知更新
        ob.dep.notify();
        return result;
      },
      enumerable: false,
      writable: true,
      configurable: true,
    });
  }
);

// 定义响应式
function defineReactive(obj, key, val) {
  // 如果val没有传值，就取obj[key]的值
  if (arguments.length === 2) {
    val = obj[key];
  }
  // 如果val是对象，就递归调用，为val中的每个key添加响应式
  let childOb = observe(val);
  // 创建Dep实例
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      // 如果Dep.target存在，就添加watcher
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(val)) {
            dependArray(val);
          }
        }
      }
      return val;
    },
    set(newValue) {
      if (newValue === val) return;
      val = newValue;
      // 如果newValue是对象，就递归调用，为newValue中的每个key添加响应式
      childOb = observe(newValue);
      // 通知更新
      dep.notify();
    },
  });
}

// 为数组中的每个元素添加响应式
function dependArray(value) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

```

## 实现依赖收集

依赖收集的实现，主要是通过`Dep`类来实现的。在`src/core/observer/dep.js`中，实现了`Dep`类，用来收集依赖。

```js

// Dep实现
let uid = 0;
class Dep {
  constructor() {
    this.id = uid++;
    // 存储watcher的数组
    this.subs = [];
  }
  // 添加依赖
  depend() {
    // Dep.target  dep里要存放这个watcher，watcher要存放dep  多对多的关系
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
  // 添加watcher
  addSub(sub) {
    this.subs.push(sub);
  }
  // 通知更新
  notify() {
    // 浅克隆一份
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
  // 添加依赖
  depend() {
    if (Dep.target) {
      this.addSub(Dep.target);
    }
  }
}
// 用来存储watcher
Dep.target = null;
// 用来存储watcher
function pushTarget(target) {
  Dep.target = target;
}
// 将Dep.target置空
function popTarget() {
  Dep.target = null;
}

```

## 实现Watcher

- watcher是更新视图的核心，在渲染页面的时候，会创建一个watcher，用来收集依赖。当数据发生变化的时候，会通知watcher，从而更新视图。
- 取值时，给每个属性都加了个dep属性，用于存储这个渲染watcher （同一个watcher会对应多个dep）
- 每个属性可能对应多个视图（多个视图肯定是多个watcher） 一个属性要对应多个watcher
- 流程是dep.depend() => 通知dep存放watcher => Dep.target.addDep() => 通知watcher存放dep

```js
let uid = 0;
class Watcher {
  /**
   * @param {*} vm 当前组件的实例
   * @param {*} exprOrFn 用户传入的表达式或者函数
   * @param {*} cb 用户传入的回调函数
   * @param {*} options 一些其他的参数
   */
  constructor(vm,exprOrFn,cb,options) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.cb = cb;
    this.options = options;
    this.id = id++;

    this.getter = exprOrFn; 
    this.deps = []; 
    this.depsId = new Set();

    this.get(); // 默认初始化 要取值
  }
  get() { 
    // defineProperty.get, 每个属性都可以收集自己的watcher
    pushTarget(this); // Dep.target = watcher
    // render() 方法会去vm上取值 vm._update(vm._render)
    this.getter(); 
    // Dep.target = null; 如果Dep.target有值说明这个变量在模板中使用了
    popTarget(); 
  }
  update() { 
    // vue中的更新操作是异步的
    queueWatcher(this); // 多次调用update 我希望先将watcher缓存下来，等一会一起更新
  }
  run() { 
    this.get();
  }
  addDep(dep) {
    // watcher中存放dep，dep中也要存放watcher
    let id = dep.id;
    // 防止重复添加
    if(!this.depsId.has(id)){
      // 将dep添加到watcher中
      this.depsId.add(id);
      // 将watcher添加到dep中
      this.deps.push(dep);
      dep.addSub(this)
    }
  }
}

let queue = [];
let has = {}; // 做列表的 列表维护存放了哪些watcher
const nextTick = Promise.resolve().then

// 动画  滚动的频率高，节流 requestFrameAnimation
function flushSchedulerQueue() {
  for (let i = 0; i < queue.length; i++) {
    queue[i].run(); // vm.name = 123?
  }
  queue = [];
  has = {};
  pending = false;
}

let pending = false;

// 要等待同步代码执行完毕后 才执行异步逻辑
export function queueWatcher(watcher) {
  // 当前执行栈中代码执行完毕后，会先清空微任务，在清空宏任务， 我希望尽早更新页面
  const id = watcher.id; // name 和 age的id 是同一个
  if (has[id] == null) {
    queue.push(watcher);
    has[id] = true;
    // 开启一次更新操作  批处理 （防抖）
    if (!pending) {
      nextTick(flushSchedulerQueue, 0);
      pending = true;
    }
  }
}
```
