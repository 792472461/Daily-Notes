/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
export const moveZeroes = function (nums) {
  let r = nums.length
  for (let i = 0; i < r;) {
    if (nums[i] === 0) {
      nums.splice(i, 1)
      nums.push(0)
      r--
      continue
    }
    i++
  }
}
