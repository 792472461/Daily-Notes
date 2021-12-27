/**
 * @param {number[]} nums
 * @return {number}
 */
export const removeDuplicates = function (nums) {
  let n = 0
  for (let i = 0; i < nums.length; i++) {
    // 只要循环过程中,nums[i]和前面一位不一样，就存下来,n++
    if (i === 0 || nums[i] !== nums[i - 1]) {
      nums[n] = nums[i]
      n++
    }
  }
  return n
}
