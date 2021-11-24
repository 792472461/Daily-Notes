class MaxHeap {
  constructor () {
    // 初始化数据
    this.data = []
  }

  size () {
    return this.data.length
  }

  isEmpty () {
    return !this.data.length
  }

  parent (index) {
    if (index === 0) throw Error('根节点没有父节点')
    return Math.floor((index - 1) / 2)
  }

  leftChild (index) {
    return index * 2 + 1
  }

  rightChild () {
    return this.index * 2 + 2
  }

  add (e) {
    this.data.push(e)
    this.shiftUp(this.size() - 1)
  }

  shiftUp (k) {
    while (k > 0 && this.data[this.parent(k)] < this.data[k]) {
      this.swap(k, this.parent(k))
      k = this.parent(k)
    }
  }

  findMax () {
    if (this.isEmpty()) throw Error('不能在堆是空得时候获取最大值')
    return this.data[0]
  }

  // 删除最大堆
  extractMax () {
    const ret = this.findMax()
    this.swap(0, this.size() - 1)
    this.data.pop()
    this.shiftDown(0)
    return ret
  }

  shiftDown (k) {
    while (this.leftChild(k) < this.size()) {
      let j = this.leftChild(k)
      if (j + 1 < this.size() && this.data[j + 1] > this.data[j]) {
        j++
      }
      if (this.data[k] >= this.data[j]) break
      this.swap(j, k)
      k = j
    }
  }

  swap (i, j) {
    const temp = this.data[i]
    this.data[i] = this.data[j]
    this.data[j] = temp
  }
}

module.exports = MaxHeap
