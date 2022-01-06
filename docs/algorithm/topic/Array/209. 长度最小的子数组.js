/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
const minSubArrayLen = function (target, nums) {
  // 定义滑动窗口nums[l...r]
  let l = 0
  let r = -1
  let sum = 0
  let res = nums.length + 1
  while (l < nums.length) {
    if (sum < target && r + 1 < nums.length) {
      // 扩大窗口
      sum += nums[++r]
    } else {
      // 缩小窗口
      sum -= nums[l++]
    }

    if (sum >= target) {
      res = Math.min(res, r - l + 1)
    }
  }
  // res没更新
  if (res === nums.length + 1) return 0
  return res
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])) // 2
console.log(minSubArrayLen(4, [1, 4, 4])) // 1
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1])) // 0
