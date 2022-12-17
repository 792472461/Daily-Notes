# 链表

比较常见的线性数据结构

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

## 代码实现 {#code}

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
