const MinHeap = require('../basics/MinHeap')
/**
 * @param {number} k
 * @param {number[]} nums
 */
const KthLargest = function (k, nums) {
  // 堆大小
  this.size = k
  this.minHeap = new MinHeap()
  // 把数据都添加到堆中
  for (const x of nums) {
    this.add(x)
  }
}

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  if (this.minHeap.size() < this.size) {
    this.minHeap.add(val)
  } else if (val > this.minHeap.findMin()) {
    this.minHeap.extractMin()
    this.minHeap.add(val)
  }
  return this.minHeap.findMin()
}

const kthLargest = new KthLargest(3, [4, 5, 8, 2])
console.log(kthLargest.add(3)) // return 4
console.log(kthLargest.add(5)) // return 5
console.log(kthLargest.add(10)) // return 5
console.log(kthLargest.add(9)) // return 8
console.log(kthLargest.add(4)) // return 8
