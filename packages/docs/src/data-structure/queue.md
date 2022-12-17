# 队列与双端队列

队列是遵循先进先出（FIFO，也称为先来先服务）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。

## 队列的接口定义 {#interface}

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

## 创建队列 {#code}

创建一个类来表示队列

```javascript
class Queue {
  constructor () {
    this.count = 0; // 队列的总长度
    this.lowestCount = 0; // 队首的指针
    this.items = {}; // 存放数据源
  }
}
```

## 实现入队操作 {#enqueue}

入队操作，该方法负责向队列添加新元素，新元素只能添加到队尾

```javascript
enqueue(element) {
  this.items[this.count] = element;
  this.count++;
}
```

我们这里是基于对象实现的队列，所以我们忘队列里添加元素的时候，我们要把count变量作为item的key，对应的元素作为它的值。将元素加入队列后，count++

### 实现出队操作

出队操作，由于队列遵循先进先出原则，最先添加的项也是最先被移除的。

```javascript
dequeue()
{
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

## 查看队首元素 {#peek}

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

## 实现isEmpty和size {#isEmptyAndSize}

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

## 清空队列 {#clear}

清空队列也比较简单，只需要把队列的属性值重置一下就可以了

```javascript
clear() {
  this.items = {};
  this.count = 0;
  this.lowestCount = 0;
}
```

## 双端队列的数据结构 {#structure}

双端队列（deque，即double-ended queue的缩写）是一种具有队列和栈性质的数据结构，即可（也只能）在线性表的两端进行插入和删除。

双端队列是限定插入和删除操作在表的两端进行的线性表。这两端分别称做端点1和端点2。也可像栈一样，可以用一个铁道转轨网络来比喻双端队列。在实际使用中，还可以有输出受限的双端队列（即一个端点允许插入和删除，另一个端点只允许插入的双端队列）和输入受限的双端队列（即一个端点允许插入和删除，另一个端点只允许删除的双端队列）。而如果限定双端队列从某个端点插入的元素只能从该端点删除，则该双端队列就蜕变为两个栈底相邻的栈了。

但是尽管双端队列看起来似乎比栈和队列更灵活，但实际上在应用程序中远不及栈和队列有用

```javascript
class Deque {
  constructor (capacity = 10) {
    this.data = new Array(capacity + 1) // 由于使用 size，我们的 Deque 实现不浪费空间
    this.front = 0
    this.tail = 0
    this.size = 0
  }

  isEmpty () {
    return this.size === 0
  }

  getSize () {
    return this.size
  }

  addLast (e) {
    if (this.size === this.getCapacity()) {
      this.resize(this.getCapacity() * 2)
    }

    this.data[this.tail] = e
    this.tail = (this.tail + 1) % this.data.length
    this.size++
  }

  addFront (e) {
    if (this.size === this.getCapacity()) {
      this.resize(this.getCapacity() * 2)
    }
    // 我们首先需要确定添加新元素的索引位置
    // 这个位置是 front - 1 的地方
    // 但是要注意，如果 front == 0，新的位置是 data.length - 1 的位置
    this.front = this.front === 0 ? this.data.length - 1 : this.front - 1
    this.data[this.front] = e
    this.size++
  }

  removeFront () {
    if (this.isEmpty()) throw new Error('Cannot dequeue from an empty queue.')

    const ret = this.data[this.front]
    this.data[this.front] = null
    this.front = (this.front + 1) % this.data.length
    this.size--
    if (this.getSize() === this.getCapacity() / 4 && this.getCapacity() / 2 !== 0) {
      this.resize(this.getCapacity() / 2)
    }
    return ret
  }

  removeLast () {
    if (this.isEmpty()) throw new Error('Cannot dequeue from an empty queue.')

    // 计算删除掉队尾元素以后，新的 tail 位置
    this.tail = this.tail === 0 ? this.data.length - 1 : this.tail - 1
    const ret = this.data[this.tail]
    this.data[this.tail] = null
    this.size--
    if (this.getSize() === this.getCapacity() / 4 && this.getCapacity() / 2 !== 0) {
      this.resize(this.getCapacity() / 2)
    }
    return ret
  }

  getFront () {
    if (this.isEmpty()) throw new Error('Queue is empty.')
    return this.data[this.front]
  }

  getLast () {
    if (this.isEmpty()) throw new Error('Queue is empty.')

    // 因为 tail 指向的是队尾元素的下一个位置，我们需要计算一下真正队尾元素的索引
    const index = this.tail === 0 ? this.data.length - 1 : this.tail - 1
    return this.data[index]
  }

  getCapacity () {
    return this.data.length
  }

  resize (newCapacity) {
    const newData = new Array(newCapacity + 1)
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[(i + this.front) % this.data.length]
    }

    this.data = newData
    this.front = 0
    this.tail = this.size
  }
}
```
