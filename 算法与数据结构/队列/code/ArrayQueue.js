// 基于数组实现队列
class ArrayQueue {
  data = []

  enqueue(e) {
    this.data.push(e)
  }

  dequeue() {
    return this.data.shift() || null
  }

  getFront() {
    return this.data[0] || null
  }

  getSize() {
    return this.data.length;
  }

  isEmpty() {
    return this.data.length === 0
  }
}