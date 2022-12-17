# 栈

::: tip 概念
栈是一种遵从后进先出(`LIFO`)原则的邮箱有序集合，新添加或待删除的元素都保存在栈的同一端，称之为栈顶，另一端叫栈底。
:::

## 创建一个基于数组的栈结构 {#arrayStack}

因为栈是先进后出的数据结构，可以利用js数组的`push`和`pop`方法，非常容易实现栈结构。

```javascript
class ArrayStack {
  constructor () {
    this.data = []
  }
}
```

然后我们实现栈的接口：

- push()：在栈顶添加一个或者多个元素。
- pop()：移除栈顶的第一个元素，同时返回被移除的元素。
- peek()：返回栈顶的元素。
- isEmpty()：判断栈是否为空，是则返回true，否则返回false
- clear()：移除栈中的所有元素。
- size()：返回栈中元素的个数。

```javascript
class Stack {
  constructor () {
    this.data = []
  }
  push (e) {
    this.data.push(e)
  }
  pop () {
    return this.data.pop()
  }
  peek () {
    return this.data[this.size - 1]
  }
  isEmpty () {
    return this.size === 0
  }
  clear () {
    return this.data = []
  }
  size () {
    return this.data.length
  }
}

```

## 创建一个基于对象的栈结构 {#objectStack}

创建一个`Stack类`最简单的方式就是使用一个数组来存储其元素，但在处理大量数据的时候，我们需要评估如何操作数据是最高效的，在使用数组的时候，大部分方法的时间复杂度为O(n)，另外数组是元素的一个有序集合，为了保证元素排列有序，它会占用更多的内存空间。

因此我们创建一个基于对象的栈结构：

```javascript
class Stack {
  constructor () {
    this.count = 0
    this.items = []
  }
}
```

与基于数组的栈结构拥有相同的方法，唯一区别是多了一个toString()方法：

- push()：在栈顶添加一个或者多个元素。
- pop()：移除栈顶的第一个元素，同时返回被移除的元素。
- peek()：返回栈顶的元素。
- isEmpty()：判断栈是否为空，是则返回true，否则返回false
- clear()：移除栈中的所有元素。
- size()：返回栈中元素的个数。
- toString()：将栈结构转换为字符串。

实现代码如下

```javascript
class Stack {
  constructor () {
    this.count = 0
    this.items = {}
  }
  push (element) {
    this.items[this.count] = element
    this.count++
  }
  size () {
    return this.count
  }
  isEmpty () {
    return this.size() === 0
  }
  pop () {
    if (this.isEmpty()) {
      return undefined
    }
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }
  peek () {
    return this.items[this.count - 1]
  }
  clear () {
    this.count = 0
    this.items = {}
  }
  toString () {
    if (this.isEmpty()) {
      return ''
    }
    let str = this.items['0']
    for(let i = 1; i < this.count; i++) {
      str = `${str},${this.items[i]}`
    }
    return str
  }
}
```

代码分析

其实我们相当于维护了一个类数组对象，有`count`去维护一个`index`，然后在`push`的时候`count++`，保证每次的count都是唯一的，`pop`的时候`count--`，并且delete掉之前的key
