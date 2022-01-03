/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = function (nums) {
  let ans = -Infinity // 保证是最小值
  const n = nums.length
  const s = new Array(n + 1).fill(0)
  const preMin = new Array(n + 1).fill(0)
  s[0] = 0
  for (let i = 1; i <= n; i++) {
    s[i] = s[i - 1] + nums[i - 1]
  }
  preMin[0] = s[0]
  for (let i = 1; i <= n; i++) {
    preMin[i] = Math.min(preMin[i - 1], s[i])
  }
  for (let i = 1; i <= n; i++) {
    ans = Math.max(ans, s[i] - preMin[i - 1])
  }
  return ans
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])) // 6
console.log(maxSubArray([5, 4, -1, 7, 8])) // 23
