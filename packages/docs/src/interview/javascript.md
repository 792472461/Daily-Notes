# Javascript篇

## js中类型有哪些 {#javascript-type}

JavaScript共有八种数据类型，分别是 Undefined、Null、Boolean、Number、String、Object、Symbol、BigInt。

其中 Symbol 和 BigInt 是ES6 中新增的数据类型：

- Symbol 是一种基本数据类型，表示独一无二的值，可以作为对象属性的标识符，也可以作为类的成员的标识符。
- BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

这些数据类型可以分为原始数据类型和引用数据类型：

- 原始数据类型：Undefined、Null、Boolean、Number、String、Symbol、BigInt，这些数据类型的值是不可变的，也就是说，一旦创建，它们的值就不能改变。存放在栈中。
- 引用数据类型：Object，这些数据类型的值是可变的，也就是说，可以通过引用来改变它们的值。存放在堆中。

存储位置不同：

- 原始数据类型的值存放在栈中，访问速度较快，但是不能直接访问栈中的值，只能通过引用来访问。
- 引用数据类型的值存放在堆中，访问速度较慢，但是可以直接访问堆中的值。
- 原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
- 引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

## 数据类型检测方法 {#javascript-type-check}

1. typeof

    typeof 是一元运算符，用于检测给定变量的数据类型，返回一个字符串，表示变量的数据类型。但是 typeof 无法检测 null 和 array 类型，对于 null 返回的是 object，对于 array 返回的是 object。

    ```js
    typeof 1 // "number"
    typeof '1' // "string"
    typeof true // "boolean"
    typeof undefined // "undefined"
    typeof Symbol() // "symbol"
    typeof null // "object"
    typeof [] // "object"
    typeof {} // "object"
    typeof function() {} // "function"
    ```

    `typeof` 可以检测出 Undefined、Null、Boolean、Number、String、Symbol、Function、Object 八种数据类型，但是对于 Null 和 Object 会返回错误的结果，因为 Null 是原始数据类型，但是 typeof 返回的是 Object，Object 是引用数据类型，但是 typeof 返回的也是 Object。

2. instanceof

    instanceof 是一个二元运算符，用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

    ```js
    console.log(2 instanceof Number);                    // false
    console.log(true instanceof Boolean);                // false 
    console.log('str' instanceof String);                // false 
    
    console.log([] instanceof Array);                    // true
    console.log(function(){} instanceof Function);       // true
    console.log({} instanceof Object);                   // true
    ```

    `instanceof` 可以检测出 Undefined、Null、Boolean、Number、String、Symbol、Function、Object 八种数据类型，但是对于 Null 和 Object 会返回错误的结果，因为 Null 是原始数据类型，但是 instanceof 返回的是 Object，Object 是引用数据类型，但是 instanceof 返回的也是 Object。

3. constructor

    constructor 是原型对象的属性，指向创建当前对象的构造函数。

    ```js
    console.log((2).constructor === Number);             // true
    console.log((true).constructor === Boolean);         // true
    console.log(('str').constructor === String);         // true
    console.log(([]).constructor === Array); // true
    console.log((function() {}).constructor === Function); // true
    console.log(({}).constructor === Object); // true
    ```

    `constructor` 可以检测出 Undefined、Null、Boolean、Number、String、Symbol、Function、Object 八种数据类型，但是对于 Null 和 Object 会返回错误的结果，因为 Null 是原始数据类型，但是 constructor 返回的是 Object，Object 是引用数据类型，但是 constructor 返回的也是 Object。

4. Object.prototype.toString.call()

    Object.prototype.toString.call() 使用 Object 对象的原型方法 toString 来判断数据类型：

    ```js
    console.log(Object.prototype.toString.call(2)); // "[object Number]"
    console.log(Object.prototype.toString.call(true)); // "[object Boolean]"
    console.log(Object.prototype.toString.call('str')); // "[object String]"
    console.log(Object.prototype.toString.call([])); // "[object Array]"
    console.log(Object.prototype.toString.call(function() {})); // "[object Function]"
    console.log(Object.prototype.toString.call({})); // "[object Object]"
    ```

    `Object.prototype.toString.call()` 可以检测出 Undefined、Null、Boolean、Number、String、Symbol、Function、Object 八种数据类型，但是对于 Null 和 Object 会返回错误的结果，因为 Null 是原始数据类型，但是 Object.prototype.toString.call() 返回的是 Object，Object 是引用数据类型，但是 Object.prototype.toString.call() 返回的也是 Object。

## 检测数组的方法 {#checking-array-methods}

1. Array.isArray()

    Array.isArray() 是 ES5 中新增的方法，用于检测给定变量是否是一个数组，返回一个布尔值。

    ```js
    Array.isArray([]); // true
    Array.isArray({}); // false
    ```

2. instanceof

    instanceof 是一个二元运算符，用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

    ```js
    console.log([] instanceof Array); // true
    console.log({} instanceof Array); // false
    ```

3. constructor

    constructor 是原型对象的属性，指向创建当前对象的构造函数。

    ```js
    console.log([].constructor === Array); // true
    console.log({}.constructor === Array); // false
    ```

4. Object.prototype.toString.call()

    Object.prototype.toString.call() 使用 Object 对象的原型方法 toString 来判断数据类型：

    ```js
    console.log(Object.prototype.toString.call([])); // "[object Array]"
    console.log(Object.prototype.toString.call({})); // "[object Object]"
    ```

## 变量声明提升 {#variable-declaration-hoisting}

变量声明提升是指在代码执行前，变量和函数声明会被提升到当前作用域的顶部。

```js
console.log(a); // undefined
var a = 1;
```

上面代码中，变量 a 的声明提升到了代码的顶部，所以在声明之前使用变量 a，不会报错，而是返回 undefined。

```js
console.log(a); // ReferenceError: a is not defined
a = 1;
```

上面代码中，变量 a 没有使用 var 声明，所以不会发生变量声明提升，直接使用变量 a，就会报错。

::: tip 为什么会导致变量声明提升

在 JavaScript 引擎执行代码之前，会先进行一次预编译，预编译的过程中，会将变量和函数声明提升到当前作用域的顶部。

:::

函数中也是一样的，函数声明也会被提升到当前作用域的顶部。

```js
console.log(a); // undefined
function a() {}
```

上面代码中，函数 a 的声明提升到了代码的顶部，所以在声明之前使用函数 a，不会报错，而是返回 undefined。

```js
console.log(a); // ReferenceError: a is not defined
a();
function a() {}
```

上面代码中，函数 a 没有使用 function 关键字声明，所以不会发生函数声明提升，直接使用函数 a，就会报错。

## 为什么es6引入了let和const {#why-did-es6-introduce-let-and-const}

因为在 JavaScript 中，变量的作用域是函数作用域，而不是块作用域，所以在循环中使用 var 声明变量，会导致变量污染。

比如说这行代码

```js
for (var i = 0; i < 10; i++) {
  console.log(i);
}
console.log(i); // 10
```

上面代码中，变量 i 的作用域是整个函数，所以在循环结束后，变量 i 依然存在，所以在循环结束后，打印变量 i，会输出 10。

如果使用 let 声明变量，就不会出现这个问题。

```js
for (let i = 0; i < 10; i++) {
  console.log(i);
}

console.log(i); // ReferenceError: i is not defined
```

上面代码中，变量 i 的作用域是块作用域，所以在循环结束后，变量 i 就不存在了，所以在循环结束后，打印变量 i，会报错。

## 判断是数组的方法 {#determine-if-array-method}

1. instanceof

    instanceof 是一个二元运算符，用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

    ```js
    console.log([] instanceof Array); // true
    console.log({} instanceof Array); // false
    ```

2. constructor
  
      constructor 是原型对象的属性，指向创建当前对象的构造函数。
  
      ```js
      console.log([].constructor === Array); // true
      console.log({}.constructor === Array); // false
      ```

3. Object.prototype.toString.call()

    Object.prototype.toString.call() 使用 Object 对象的原型方法 toString 来判断数据类型：

    ```js
    console.log(Object.prototype.toString.call([])); // "[object Array]"
    console.log(Object.prototype.toString.call({})); // "[object Object]"
    ```

4. Array.isArray()

    Array.isArray() 是 ES5 中新增的方法，用于检测给定变量是否是一个数组，返回一个布尔值。

    ```js
    Array.isArray([]); // true
    Array.isArray({}); // false
    ```

## 如果new了一个构造函数会怎样

箭头函数是 ES6 中提出来的，它没有 prototype，也没有自己的 this 指向，更不可以使用 argument 参数，所以不能 new 一个箭头函数

new 操作符的实现步骤如下：

1. 创建一个空的简单 JS 对象 即{}
2. 为步骤 1 新创建的对象添加属性`___proto__`，将该属性连接到构造函数的原型对象
3. 将步骤 1 新创建的对象作为 this 的上下文
4. 如果该函数没有返回对象则返回 this

所以上面的第 2、3 步，箭头函数都是没有办法执行的
