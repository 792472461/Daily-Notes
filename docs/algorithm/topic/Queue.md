# 队列经典问题

## 基于链表实现的队列

```javascript
class Node {
  constructor (e, next) {
    this.e = e
    this.next = next
  }
}

class LinkedListQueue {
  constructor () {
    this.head = null
    this.tail = null
    this.size = null
  }

  isEmpty () {
    return this.size === 0
  }

  enqueue (e) {
    if (this.tail === null) {
      this.tail = new Node(e)
      this.head = this.tail
    } else {
      this.tail.next = new Node(e)
      this.tail = this.tail.next
    }
    this.size++
  }

  dequeue () {
    if (this.isEmpty()) return null
    const retNode = this.head
    this.head = this.head.next
    retNode.next = null
    if (this.head === null) {
      this.tail = null
    }
    this.size--
    return retNode
  }

  getFront () {
    if (this.isEmpty()) return null
    return this.head.e
  }

  toString () {
    if (this.isEmpty()) return ''
    let res = 'Queue: front '

    let cur = this.head
    while (cur) {
      res += cur.e + '->'
      cur = cur.next
    }
    res += 'NULL'
    return res
  }
}

const q = new LinkedListQueue()

for (let i = 0; i < 10; i++) {
  q.enqueue(i)
  console.log(q.toString())
}

console.log(q.dequeue().e + '出队')
console.log(q.dequeue().e + '出队')
console.log(q.dequeue().e + '出队')

console.log(q.toString())

```

## 234.滑动窗口的最大值

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindow = function (nums, k) {
    if (nums === null || nums.length === 0 || k < 1) return []
    if (k === 1) return nums
    const ans = new Array(nums.length - k + 1).fill(0)
    // 1. 维护一个双端队列，保证里面元素大小是递减的
    const q = new Deque(nums.length) // 这里需要引入相应的数据结构，也可以用数组代替
    let i = 0
    for (; i < nums.length; i++) {
      // 只要num[队尾] <= nums[i],删除队尾
      while (!q.isEmpty() && nums[i] > nums[q.getLast()]) {
        q.removeLast()
      }
      // 将i加到队尾
      q.addLast(i)

      // 检查w索引是否合法
      const w = i - k + 1
      if (w < 0) continue

      // 检查队头的合法性
      while (q.getFront() < w) {
        // 队头不合法
        q.removeFront()
      }
      ans[w] = nums[q.getFront()]
    }
    return ans
  }

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))
```

## 622.设计双端队列

```javascript
/**
 设计你的循环队列实现。 循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为“环形缓冲器”。

 循环队列的一个好处是我们可以利用这个队列之前用过的空间。在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。

 你的实现应该支持如下操作：

 MyCircularQueue(k): 构造器，设置队列长度为 k 。
 Front: 从队首获取元素。如果队列为空，返回 -1 。
 Rear: 获取队尾元素。如果队列为空，返回 -1 。
 enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
 deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
 isEmpty(): 检查循环队列是否为空。
 isFull(): 检查循环队列是否已满。
 */

/**
 * @param {number} k
 */
const MyCircularQueue = function (k) {
  this.front = 0
  this.rear = 0
  this.max = k
  this.queue = Array(k + 1)
}

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
  if (this.isFull()) return false
  this.queue[this.rear] = value
  this.rear = (this.rear + 1) % (this.max + 1)
  return true
}

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) return false
  this.front = (this.front + 1) % (this.max + 1)
  return true
}

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
  if (this.isEmpty()) return -1
  return this.queue[this.front]
}

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
  if (this.isEmpty()) return -1
  return this.queue[(this.rear + this.max) % (this.max + 1)]
}

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function () {
  return ((this.rear - this.front + this.max + 1) % (this.max + 1)) === 0
}

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function () {
  return ((this.rear - this.front + this.max + 1) % (this.max + 1)) === this.max
}

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
```

## 641.设计循环双端队列

```javascript
/*
 * @lc app=leetcode.cn id=641 lang=javascript
 *
 * [641] 设计循环双端队列
 */

// @lc code=start
/**
 * @param {number} k
 */
const MyCircularDeque = function (k) {
  this.front = 0
  this.rear = 0
  this.max = k
  this.deque = Array(k + 1)
}

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function (value) {
  if (this.isFull()) return false
  this.front = (this.front + this.max) % (this.max + 1)
  this.deque[this.front] = value
  return true
}

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function (value) {
  if (this.isFull()) return false
  this.deque[this.rear] = value
  this.rear = (this.rear + 1) % (this.max + 1)
  return true
}

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function () {
  if (this.isEmpty()) return false
  this.front = (this.front + 1) % (this.max + 1)
  return true
}

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function () {
  if (this.isEmpty()) return false
  this.rear = (this.rear + this.max) % (this.max + 1)
  return true
}

/**
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function () {
  if (this.isEmpty()) return -1
  return this.deque[this.front]
}

/**
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function () {
  if (this.isEmpty()) return -1
  return this.deque[(this.rear + this.max) % (this.max + 1)]
}

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function () {
  return ((this.rear - this.front + this.max + 1) % (this.max + 1)) === 0
}

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function () {
  return ((this.rear - this.front + this.max + 1) % (this.max + 1)) === this.max
}

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */
// @lc code=end

```

## 859.亲密字符串

```javascript
/*
 * @lc app=leetcode.cn id=859 lang=javascript
 *
 * [859] 亲密字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
const buddyStrings = function (s, goal) {
  if (s.length !== goal.length) return false
  if (s === goal) {
    return s.length > new Set(s).size
  }
  let a = ''
  let b = ''
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== goal[i]) {
      a = s[i] + a
      b += goal[i]
    }
  }
  return a.length === 2 && a === b
}
buddyStrings('ab', 'ba')
// @lc code=end
```

## 860.柠檬水找零

```javascript
/**
 * @param {number[]} bills
 * @return {boolean}
 */
const lemonadeChange = function (bills) {
    // 面值只可能是 5 美元，10 美元和 20 美元三种。基于此，我们可以进行如下的分类讨论。
    // 5 美元，由于柠檬水的价格也为 5 美元，因此我们直接收下即可。
    // 10 美元，我们需要找回 5 美元，如果没有 5 美元面值的钞票，则无法正确找零。
    // 20美元，我们需要找回 15 美元，此时有两种组合方式，
    // 一种是一张 10 美元和 5 美元的钞票，一种是 3 张 5 美元的钞票，如果两种组合方式都没有，则无法正确找零。
    // 当可以正确找零时，两种找零的方式中我们更倾向于第一种，即如果存在5 美元和 10 美元，我们就按第一种方式找零，否则按第二种方式找零，
    // 因为需要使用5 美元的找零场景会比需要使用 10 美元的找零场景多，我们需要尽可能保留 5 美元的钞票。
    // 基于此，我们维护两个变量five 和ten 表示当前手中拥有的 5 美元和 10 美元钞票的张数，
    // 从前往后遍历数组分类讨论即可。
    let five = 0;
    let ten = 0
    for (const bill of bills) {
      if (bill === 5) five++
      if (bill === 10) {
        five--
        ten++
      }
      if (bill === 20) {
        if (ten && five) {
          ten--
          five--
        } else if (five >= 3) {
          five -= 3
        } else {
          return false
        }
      }
      if (ten < 0 || five < 0) return false
    }
    return true
  }

console.log(lemonadeChange([5, 5, 5, 10, 20]))

```

## 933.最近请求次数

```javascript
/*
 * @lc app=leetcode.cn id=933 lang=javascript
 *
 * [933] 最近的请求次数
 */

// @lc code=start

const RecentCounter = function () {
  this.pingArray = []
}

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
  this.pingArray.push(t)
  while (this.pingArray[0] < t - 3000) {
    this.pingArray.shift()
  }
  return this.pingArray.length
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
// @lc code=end

```

## 969.煎饼排序

```javascript
/* eslint-disable no-unused-vars */
/**
 * @param {number[]} arr
 * @return {number[]}
 */
const getMaxIndex = function (nums) {
  let max = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > nums[max]) {
      max = i
    }
  }
  return max
}

// 反转前K个元素,辅助函数
const reverse = function (arr, k) {
  if (k < 1) {
    return
  }
  let i = 0
  let j = k
  while (i < j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i++;
    j--
  }
}
const pancakeSort = function (arr) {
  const ans = [];
  let max
  while (arr.length > 1) {
    max = getMaxIndex(arr);
    max > 0 && (ans.push(max + 1))
    reverse(arr, max)
    reverse(arr, arr.length - 1)
    ans.push(arr.length)
    arr.pop()
  }
  return ans
}

```
