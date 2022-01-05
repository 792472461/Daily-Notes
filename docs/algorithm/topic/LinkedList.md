# 链表经典问题

## 链表实现

```javascript
class Node {
  constructor (e, next) {
    this.e = e
    this.next = next
  }

  toString () {
    let res = ''
    let cur = this
    while (cur !== null) {
      res += cur.e + '->'
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
    return cur.e
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
    cur.e = e
  }

  // 查找链表中是否含有元素e
  contains (e) {
    let cur = this.dummyHead.next
    while (cur) {
      if (cur.e === e) return true
      cur = cur.next
    }
    return false
  }

  // 删除链表中第index位置的元素
  delete (index = 0) {
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
    return this.delete(0)
  }

  // 删除最后一个元素
  deleteLast () {
    return this.delete(this.size - 1)
  }

  toString () {
    let res = ''
    let cur = this.dummyHead.next
    while (cur !== null) {
      res += cur.e + '->'
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

## 141.环形链表

```javascript
/**
 * 给定一个链表，判断链表中是否有环。
 * 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。
 * 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。
 * 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。
 * 如果链表中存在环，则返回 true 。 否则，返回 false 。
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
export const hasCycle = function (head) {
  if (!head) return false

  let p = head
  let q = head

  while (q && q.next) {
    p = p.next
    q = q.next.next
    // 如果相遇证明有环
    if (p === q) {
      return true
    }
  }

  return false
}

```

## 142.环形链表Ⅱ

```javascript
/**
 * 给定一个链表，返回链表开始入环的第一个节点。
 * 如果链表无环，则返回null。
 * 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。
 * 如果 pos 是 -1，则在该链表中没有环。注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
export const detectCycle = function (head) {
  if (!head) return null

  let p = head
  let q = head

  if (q.next === null) return null

  do {
    p = p.next
    q = q.next.next
  } while (p !== q && q && q.next)

  if (q === null || q.next === null) return null

  p = head
  while (p !== q) {
    p = p.next
    q = q.next
  }

  return q
}

```

## 19.删除链表中的倒数第n个节点

```javascript
export const removeNthFromEnd = function (head, n) {
  // 判断head是否为空
  if (head === null) return head
  // 创建虚拟头节点
  const ret = new Node(-1, head)
  let pre = ret
  let cur = head
  // 让cur移动k步
  for (let i = 0; i < n; i++) {
    cur = cur.next
  }
  if (!cur) return head.next
  // 然后让两个指针一起移动，知道cur指向空
  while (cur) {
    cur = cur.next
    pre = pre.next
  }
  pre.next = pre.next.next
  // 然后删除
  return ret.next
}

console.log(removeNthFromEnd(linkedList.head, 1).toString())

```

## 21.合并两个有序链表

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
export const mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2
  } else if (l2 === null) {
    return l1
  } else if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  }
};

```

## 24.两两交换链表中的节点

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
export const mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2
  }
  if (l2 === null) {
    return l1
  }
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  }
}

```

## 25.k个一组翻转链表

```javascript
// @lc code=start
function ListNode (val, next) {
  this.val = val === null ? 0 : val
  this.next = next === null ? null : next
}

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
export const reverseKGroup = function (head, k) {
  const protect = new ListNode(0, head)
  let last = protect
  // 分组遍历
  while (head !== null) {
    // 1. 分组(往后找k-1步，找到一组)
    // 一组的开头head结尾end
    const end = getEnd(head, k)
    if (end === null) break

    const nextGroupHead = end.next

    // 2. 一组内部(head到end之间)要反转
    reverseList(head, nextGroupHead)

    // 3. 更新前一组和后一组的边
    last.next = end
    head.next = nextGroupHead

    last = head
    head = nextGroupHead
  }
  return protect.next
}

function getEnd (head, k) {
  while (head !== null) {
    k--
    if (k === 0) return head
    head = head.next
  }
  return null
}

function reverseList (head, stop) {
  let last = head
  head = head.next
  while (head !== stop) {
    const nextHead = head.next
    head.next = last
    last = head
    head = nextHead
  }
  return last
}

// @lc code=end

```

## 61.旋转链表

```javascript
/*
 * @lc app=leetcode.cn id=61 lang=javascript
 *
 * [61] 旋转链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
export const rotateRight = function (head, k) {
  if (head === null) return head
  // 链表串环
  let cur = head
  let size = 1
  while (cur.next) {
    cur = cur.next
    size += 1
  }
  cur.next = head
  for (let i = 0; i < size - k % size - 1; i++) {
    head = head.next
  }
  cur = head.next
  head.next = null
  return cur
}
// @lc code=end

```

## 82.删除排序链表中的重复元素Ⅱ

```javascript
/*
 * @lc app=leetcode.cn id=82 lang=javascript
 *
 * [82] 删除排序链表中的重复元素 II
 */

// @lc code=start

function ListNode (val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
export const deleteDuplicates = function (head) {
  if (!head) {
    return head
  }
  // 创建虚拟头结点
  const dummy = new ListNode(0, head)

  let cur = dummy
  // 保证下个和下下个不为null
  while (cur.next && cur.next.next) {
    // 如果下个和下下个两个值相等
    if (cur.next.val === cur.next.next.val) {
      const x = cur.next.val
      // 只要下个和下个相等
      while (cur.next && cur.next.val === x) {
        cur.next = cur.next.next
      }
    } else {
      // 移动指针
      cur = cur.next
    }
  }
  return dummy.next
}
// @lc code=end

```

## 83.删除排序链表中的重复元素

```javascript
/* eslint-disable no-unused-vars */
/*
 * @lc app=leetcode.cn id=83 lang=javascript
 *
 * [83] 删除排序链表中的重复元素
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const deleteDuplicates = function (head) {
  if (head === null) return head
  let pre = head;
  let cur = head.next
  while (cur) {
    // 如果值相等，第二个指针往后移动
    if (pre.val === cur.val) {
      cur = cur.next
      pre.next = cur
    } else {
      // 不相等，两个指针往后都移动
      // pre = pre.next
      // cur = cur.next
      // [pre, cur] = [pre.next, cur.next]
      pre = pre.next
      cur = cur.next
    }
  }
  return head
}
// @lc code=end

```

## 86.分割链表

```javascript
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
export const partition = function (head, x) {
  // 创建两个个额外的链表，分别用来存储小于x的值和大于x的值
  let small = new ListNode(0)
  const smallHead = small
  let large = new ListNode(0)
  const largeHead = large
  // 遍历原链表
  while (head !== null) {
    if (head.val < x) {
      small.next = head
      small = small.next
    } else {
      large.next = head
      large = large.next
    }
    // 改变头指针
    head = head.next
  }
  // 处理尾边界
  large.next = null
  // 连接两个链表
  small.next = largeHead.next
  // 返回小链表的next，头节点是0
  return smallHead.next
}

```

## 92.反转链表Ⅱ

```javascript
const reverse = (head, n) => {
  let pre = null
  let cur = head
  while (n--) {
    const next = cur.next
    cur.next = pre

    pre = cur
    cur = next
  }
  head.next = cur
  return pre
}

const reverseBetween = function (head, left, right) {
  if (!head) return null
  const ret = new Node(0, head)
  let pre = ret
  const cnt = right - left + 1

  while (--left) {
    pre = pre.next
  }
  pre.next = reverse(pre.next, cnt)
  return ret.next
}

console.log(reverseBetween(linkedList.head, 2, 5).toString())

```

## 146.LRU缓存
```javascript
function Node (val, next = null, pre = null) {
  this.val = val
  this.key = null
  this.pre = next
  this.next = pre
}

/**
 * @param {number} capacity
 */
const LRUCache = function (capacity) {
  this.h = new Map()
  this.head = new Node()
  this.tail = new Node()
  this.head.next = this.tail
  this.tail.pre = this.head
  this.capacity = capacity
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  // 没有就返回-1
  if (!this.h.get(key)) return -1
  // 如果存在
  const node = this.h.get(key)
  this.remove(node)
  this.insert(this.head, node)
  return node.val
}

LRUCache.prototype.remove = function (node) {
  node.pre.next = node.next
  node.next.pre = node.pre
}

LRUCache.prototype.insert = function (p, node) {
  p.next.pre = node
  node.next = p.next
  p.next = node
  node.pre = p
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (!this.h.get(key)) {
    const node = new Node(value)
    // 存储一下这个key
    node.key = key
    this.h.set(key, node)
    this.insert(this.head, node)
    if (this.h.size > this.capacity) {
      this.h.delete(this.tail.pre.key)
      // 删除最后一个
      this.remove(this.tail.pre)
    }
  } else {
    const node = this.h.get(key)
    node.val = value
    // 从链表中删除
    this.remove(node)
    // 加到最前面
    this.insert(this.head, node)
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

```

## 202.快乐数

```javascript
/*
 * @lc app=leetcode.cn id=202 lang=javascript
 *
 * [202] 快乐数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
export const isHappy = function (n) {
  let pre = n
  let cur = getNext(n)
  // 链表找环
  while (cur !== pre && cur !== 1) {
    pre = getNext(pre)
    cur = getNext(getNext(cur))
  }
  return cur === 1
}

function getNext (n) {
  let t = 0
  while (n) {
    t += (n % 10) * (n % 10)
    n = Math.floor(n / 10)
  }
  return t
}

// @lc code=end

```

## 203.移除链表元素

```javascript

const removeElements = function (head, val) {
  // 创建一个虚拟头节点
  const dummyHead = new Node(0)
  dummyHead.next = head
  let cur = dummyHead

  while (cur.next !== null) {
    if (cur.next.val === val) {
      const deleteNode = cur.next
      cur.next = deleteNode.next
    } else {
      cur = cur.next
    }
  }
  return dummyHead.next
}

console.log(removeElements(linkedList.head, 2).toString())

```

## 206.反转链表Ⅰ

```javascript
const { LinkedList } = require('./LinkedList')

const linkedList = new LinkedList()

for (let i = 0; i < 10; i++) {
  linkedList.add(i)
}

// 非递归版本实现
const reverseList = function (head) {
  let cur = head
  let pre = null

  while (cur) {
    // 缓存下个节点
    const next = cur.next
    // 颠倒节点
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
}

console.log(reverseList(linkedList.head).toString())

// 递归版本的实现
const reverseList1 = function (head) {
  if (head === null || head.next === null) return head
  const rev = reverseList1(head.next)
  head.next.next = head
  head.next = null
  return rev
}

console.log(reverseList1(linkedList.head).toString())

```

## 剑指 Offer 06. 从尾到头打印链表
```javascript
// 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
export const reversePrint = function (head) {
  const result = []
  while (head) {
    result.unshift(head.val)
    head = head.next
  }
  return result
}
```
