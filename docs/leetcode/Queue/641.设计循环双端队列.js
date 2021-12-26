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
