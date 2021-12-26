/**
 * 977. 有序数组的平方
 * @param {number[]} nums
 * @return {number[]}
 */
export const sortedSquares = function (nums) {
  const res = []
  let i = 0
  let j = nums.length - 1

  while (i <= j) {
    const l = Math.abs(nums[i])
    const r = Math.abs(nums[j])
    if (l > r) {
      res.unshift(l * l)
      i++
    } else {
      res.unshift(r * r)
      j--
    }
  }
  return res
}
