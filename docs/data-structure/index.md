---
sidebar: auto
---

# 手撕数据结构

## 栈
::: tip 概念
栈是一种遵从后进先出(`LIFO`)原则的邮箱有序集合，新添加或待删除的元素都保存在栈的同一端，称之为栈顶，另一端叫栈底。
:::

### 创建一个基于数组的栈结构

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

### 创建一个基于对象的栈结构

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

## 队列与双端队列

### 基础队列的数据结构

队列是遵循先进先出（FIFO，也称为先来先服务）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。
#### 队列的接口定义
```typescript
interface Queue<T> {
  // 向队列尾部添加一个（或多个）新的项。
  enqueue: (e: T) => void
  // 移除队列的第一项（即排在队列最前面的项）并返回被移除的元素
  dequeue: () => T
  // 返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动
  peek: () => T
  // 返回队列包含的元素个数，与数组的 length 属性类似
  getSize: () => number
  // 如果队列中不包含任何元素，返回 true，否则返回 false。
  isEmpty: () => boolean
}
```

#### 创建队列

创建一个类来表示队列
```javascript
class Queue {
  constructor() {
    this.count = 0; // 队列的总长度
    this.lowestCount = 0; // 队首的指针
    this.items = {}; // 存放数据源
  }
}
```

#### 实现入队操作

入队操作，该方法负责向队列添加新元素，新元素只能添加到队尾

```javascript
enqueue(element) { 
 this.items[this.count] = element; 
 this.count++; 
}
```

我们这里是基于对象实现的队列，所以我们忘队列里添加元素的时候，我们要把count变量作为item的key，对应的元素作为它的值。将元素加入队列后，count++
#### 实现出队操作
出队操作，由于队列遵循先进先出原则，最先添加的项也是最先被移除的。
```javascript
dequeue() {
  // 如果为空就直接返回undefined
  if (this.isEmpty()) { 
    return undefined;
  } 
  // 暂存队列头部的值，用来返回
  const result = this.items[this.lowestCount];
  // 删除队首
  delete this.items[this.lowestCount];
  // 队首的指针+1
  this.lowestCount++; 
  // 返回被删除的队首
  return result;
}
```

#### 查看队首元素
额外辅助方法，用来查看队首元素的。
```javascript
peek() {
  // 队首为空返回undefined
  if (this.isEmpty()) {
    return undefined;
  }
  // 返回队首指针所在的元素
  return this.items[this.lowestCount];
}
```

#### 实现isEmpty和size
isEmpty函数比较简单，只需要判断队首指针和队尾指针是否一样就可以了
```javascript
isEmpty() { 
  return this.count - this.lowestCount === 0; 
}
```
同理如果我们要计算队列的长度，队尾指针减去队首指针就是队列的长度

```javascript
size() { 
 return this.count - this.lowestCount; 
}
```
简化isEmpty
```javascript
isEmpty() { 
  return this.size() === 0; 
}
```

#### 清空队列
清空队列也比较简单，只需要把队列的属性值重置一下就可以了

```javascript
clear() { 
  this.items = {}; 
  this.count = 0; 
  this.lowestCount = 0; 
}
```

### 双端队列的数据结构
撰写中...

## 链表

我们已知的线性数据结构

1. 动态数组
2. 栈
3. 队列


以上三种数据结构底层依赖动态数组；靠resize解决固定容量的问题，而链表是真正的动态数据结构

::: tip 链表很重要
1. 链表是真正的动态数据结构
2. 最简单的动态数据结构
3. 更深入理解指针
4. 可以更深入理解递归
5. 辅助可以组成其他数据结构
:::

```javascript
class Node {
  constructor (e, next) {
    this.val = e
    this.next = next
  }

  toString () {
    let res = ''
    let cur = this
    while (cur !== null) {
      res += cur.val + '->'
      cur = cur.next
    }
    res += 'NULL'
    return res
  }
}

/**
 * 链表
 */
class LinkedList {
  constructor () {
    // 这里借助了虚拟头节点
    this.dummyHead = new Node(null, null)
    this.size = 0
  }

  // 返回head头节点
  get head () {
    return this.dummyHead.next
  }

  // 获取链表长度
  getSize () {
    return this.size
  }

  // 判断链表是否为空
  isEmpty () {
    return this.getSize() === 0
  }

  // 新增元素
  add (e, index) {
    if (index < 0 || index > this.size) throw new Error('索引' + index + '出错')
    // 这里借助了虚拟头节点
    let prev = this.dummyHead
    for (let i = 0; i < index; i++) {
      prev = prev.next
    }
    prev.next = new Node(e, prev.next)
    this.size++
  }

  // 在链表头添加一个元素
  addFirst (e) {
    this.add(e, 0)
  }

  // 在链表结尾添加元素
  addLast (e) {
    this.add(e, this.size)
  }

  // 获取链表第index个元素
  get (index) {
    if (index < 0 || index > this.size) throw new Error('索引' + index + '出错')
    let cur = this.dummyHead.next
    for (let i = 0; i < index; i++) {
      cur = cur.next
    }
    return cur.val
  }

  // 获取第一个元素
  getFirst () {
    this.get(0)
  }

  // 获取最后一个元素
  getLast () {
    this.get(this.size - 1)
  }

  // 修改链表中第index个元素为e
  set (e, index) {
    if (index < 0 || index > this.size) throw new Error('索引' + index + '出错')
    let cur = this.dummyHead.next
    for (let i = 0; i < index && cur !== null; i++) {
      cur = cur.next
    }
    cur.val = e
  }

  // 查找链表中是否含有元素e
  contains (e) {
    let cur = this.dummyHead.next
    while (cur) {
      if (cur.val === e) return true
      cur = cur.next
    }
    return false
  }

  // 删除链表中第index位置的元素
  delete (index) {
    if (index < 0 || index > this.size) throw new Error('索引' + index + '出错')
    let prev = this.dummyHead
    for (let i = 0; i < index; i++) {
      prev = prev.next
    }
    const ret = prev.next
    prev.next = ret.next
    this.size--
    return ret
  }

  // 删除第一个元素
  deleteFirst () {
    this.delete(0)
  }

  // 删除最后一个元素
  deleteLast () {
    this.delete(this.size - 1)
  }

  toString () {
    let res = ''
    let cur = this.dummyHead.next
    while (cur !== null) {
      res += cur.val + '->'
      cur = cur.next
    }
    res += 'NULL'
    return res
  }
}

// // 测试链表程序
// const linkedList = new LinkedList()

// for (let i = 0; i < 10; i++) {
//   // 添加元素
//   linkedList.addFirst(i)
// }

// // 删除元素
// linkedList.delete(5)
// console.log(linkedList.getSize(), linkedList.toString())

// linkedList.deleteLast()
// console.log(linkedList.getSize(), linkedList.toString())

module.exports = {
  LinkedList,
  Node
}
```

::: tip 链表时间复杂度分析
- 添加元素
  1. addLast(e) O(n)
  2. addFist(e) O(1)
  3. add(e, index) O(n/2) = O(n)
- 删除
  1. deleteLast(e) O(n)
  2. deleteFist(e) O(1)
  3. delete(e, index) O(n/2) = O(n)
- 查找
  1. get(index) O(n)
  2. contains(e) O(n)
  3. add(e, index) O(n/2) = O(n)
- 修改
  1. set(e, index) O(n)

增：O(n) 如果只对链表头进行操作O(1)
删: O(n) 如果只对链表头进行操作O(1)
改: O(n)
查: O(n) 如果只对链表头进行操作O(1)
:::

## 集合
撰写中...

## 字典和散列表
撰写中...

## 树
撰写中...

### 二分搜索树

### AVL树

### 红黑树

### 线段树

### 并查集

### 字典树

## 堆
撰写中...

## 哈希表

撰写中...

## 排序汇总