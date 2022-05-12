/**
 * @param {number[]} nums
 * @return {number}
 */
const lengthOfLIS = function (nums) {
  const n = nums.length
  if (n <= 1) return n
  const dp = [null, nums[0]]
  let max = 1
  for (let i = 1; i < n; i++) {
    if (dp[max] < nums[i]) {
      dp[++max] = nums[i]
      continue
    }
    let pos = 0
    let left = 1
    let right = max
    while (left <= right) {
      const mid = left + right >> 1
      if (nums[i] > dp[mid]) {
        left = mid + 1
        pos = mid
      } else {
        right = mid - 1
      }
    }
    dp[pos + 1] = nums[i]
  }
  return max
}

lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])
