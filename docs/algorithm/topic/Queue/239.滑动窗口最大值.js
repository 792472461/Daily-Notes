const Deque = require('../basics/Deque')
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
  const q = new Deque(nums.length)
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
