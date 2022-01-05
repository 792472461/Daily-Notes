/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const numberOfSubarrays = function (nums, k) {
  const n = nums.length
  const s = new Array(n + 1).fill(0)
  s[0] = 0
  for (let i = 1; i <= n; i++) {
    s[i] = s[i - 1] + nums[i - 1] % 2
  }
  const count = new Array(n + 1).fill(0)
  let ans = 0
  count[s[0]]++
  for (let i = 1; i <= n; i++) {
    if (s[i] - k >= 0) {
      ans += count[s[i] - k]
    }
    count[s[i]]++
  }
  return ans
}

console.log(numberOfSubarrays([1, 1, 2, 1, 1], 3))
console.log(numberOfSubarrays([2, 4, 6], 3))
console.log(numberOfSubarrays([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2))
