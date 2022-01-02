const MinStack = function () {
  this.s = []
  this.preMin = []
}

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.s.push(val)
  if (this.preMin.length === 0) {
    this.preMin.push(val)
  } else {
    // 这里判断最小值和当前值哪个最小，最小栈push进去最小值
    this.preMin.push(Math.min(this.preMin[this.preMin.length - 1], val))
  }
}

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.s.pop()
  this.preMin.pop()
}

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.s[this.s.length - 1]
}

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.preMin[this.preMin.length - 1]
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

const minStack = new MinStack()
minStack.push(-2)
minStack.push(0)
minStack.push(-3)
console.log(minStack.getMin())
minStack.pop()
console.log(minStack.top())
console.log(minStack.getMin())
