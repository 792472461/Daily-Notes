// 基于数组实现循环队列
class ArrayQueue {
  // 初始化一个10条的数组
  constructor () {
    this.data = []
    this.front = null
    this.tail = null
    this.size = 0
  }

  init () {

  }

  enqueue (e) {
    if ((this.tail + 1) % this.data.length === this.front) this.resize(this.get)
  }

  // 重新开辟空间或者缩小空间
  resize () {

  }

  dequeue () {
    return this.data.shift() || null
  }

  getFront () {
    return this.data[0] || null
  }

  getSize () {
    return this.size
  }

  // 头尾一样就是空了
  isEmpty () {
    return this.tail = this.front
  }
}
