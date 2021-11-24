// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
// 请必须使用时间复杂度为 O(log n) 的算法。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  if (!nums.length) return 0
  const middle = Math.floor(nums.length / 2)
  if (nums[middle] === target) return middle
  let i, j
  if (nums[middle] > target) {
    i = 0
    j = middle
  } else {
    i = middle + 1
    j = nums.length
  }
  if (nums[i] > target) return i
  while (i < j) {
    if (nums[i] === target) return i
    if (nums[i] < target && target < nums[i + 1]) return i + 1
    i++
  }
  return j
}