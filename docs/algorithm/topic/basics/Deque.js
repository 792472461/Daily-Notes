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

module.exports = Deque
