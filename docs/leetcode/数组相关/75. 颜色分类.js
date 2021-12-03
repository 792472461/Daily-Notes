/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const sortColors = function (nums) {
  /**
   * 数组辅助函数，调换位置
   * @param {number[]} arr 原数组
   * @param {number} i 下标i
   * @param {number} j 下标j
   */
  const swap = (arr, i, j) => {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  // nums[0...zero] == 0, nums[zero + 1, i] == 1, nums[two, n - 1] == 2
  let zero = -1
  let i = 0
  let two = nums.length
  while (i < two) {
    if (nums[i] === 0) {
      zero++
      swap(nums, i, zero)
      i++
    } else if (nums[i] === 2) {
      two--
      swap(nums, i, two)
    } else {
      i++
    }
  }
}

sortColors([2, 0, 2, 1, 1, 0]) // [0,0,1,1,2,2]
