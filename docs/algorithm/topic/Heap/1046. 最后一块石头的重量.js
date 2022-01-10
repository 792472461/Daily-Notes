/**
 * @param {number[]} stones
 * @return {number}
 */
const lastStoneWeight = function (stones) {
  const maxHeap = new MaxHeap()
  // 循环调用取最大的两块石头的逻辑，如果堆中的元素个数等于0或者等于1返回结果，否则调用两次popTop获取最大的两块石头，如果两块石头的质量不一样，则将差值入堆
  for (let i = 0; i < stones.length; i++) {
    maxHeap.buildHeap(stones[i])
  }
  while (true) {
    if (maxHeap.heapEmpty()) {
      return 0
    }
    if (maxHeap.onlyOne()) {
      return maxHeap.getTop()
    }
    const y = maxHeap.popTop()
    const x = maxHeap.popTop()
    if (x !== y) {
      maxHeap.buildHeap(y - x)
    }
  }
}

class MaxHeap {
  constructor () {
    this.data = [0]
    this.count = 0
  }

  buildHeap (stone) {
    this.count++
    this.data[this.count] = stone
    let i = this.count
    while (Math.floor(i / 2) > 0 && this.data[i] > this.data[Math.floor(i / 2)]) {
      this.swap(i, Math.floor(i / 2))
      i = Math.floor(i / 2)
    }
  }

  swap (i, j) {
    const temp = this.data[i]
    this.data[i] = this.data[j]
    this.data[j] = temp
  }

  popTop () {
    const top = this.data[1]
    this.data[1] = this.data[this.count]
    this.data.splice(this.count, 1)
    this.count--
    let i = 1
    while (true) {
      let maxPos = i
      if (i * 2 <= this.count && this.data[i] < this.data[i * 2]) {
        maxPos = i * 2
      }
      if (i * 2 + 1 <= this.count && this.data[maxPos] < this.data[i * 2 + 1]) {
        maxPos = i * 2 + 1
      }
      if (i === maxPos) {
        break
      }
      this.swap(i, maxPos)
      i = maxPos
    }
    return top
  }

  heapEmpty () {
    return this.count === 0
  }

  onlyOne () {
    return this.count === 1
  }

  getTop () {
    return this.data[1]
  }
}

console.log(lastStoneWeight([2, 7, 4, 1, 8, 1])) // 1
