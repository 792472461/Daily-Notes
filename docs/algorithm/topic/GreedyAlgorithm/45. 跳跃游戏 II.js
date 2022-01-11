/**
 * @param {number[]} nums
 * @return {number}
 */
const jump = function (nums) {
  let now = 0
  let ans = 0
  while (now < nums.length - 1) {
    const right = now + nums[now]
    // [now+1, right] 是可达范围
    if (right >= nums.length - 1) return ans + 1
    let nextRight = right
    let next = now
    for (let i = now + 1; i <= right; i++) {
      if (i + nums[i] > nextRight) {
        nextRight = i + nums[i]
        next = i
      }
    }
    now = next
    ans++
  }
  return ans
}

console.log(jump([2, 3, 1, 1, 4]))
console.log(jump([2, 3, 0, 1, 4]))
