// https://leetcode.cn/problems/merge-sorted-array/

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = function(nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let cur = m + n - 1;

  // 从后往前遍历，将较大的值放在 nums1 的末尾
  while(j >= 0) {
    // 如果 nums1 的值大于 nums2 的值，将 nums1 的值放在 nums1 的末尾
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[cur--] = nums1[i--];
    } else {
      // 如果 nums2 的值大于 nums1 的值，将 nums2 的值放在 nums1 的末尾
      nums1[cur--] = nums2[j--];
    }
  }
  return nums1;
};

// 示例 1：
// 输入：
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6],       n = 3
// 输出：[1,2,2,3,5,6]
console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3));

// 示例 2：
// 输入：
// nums1 = [1], m = 1
// nums2 = [],  n = 0
// 输出：[1]
console.log(merge([1], 1, [], 0));

// 示例 3：
// 输入：
// nums1 = [0], m = 0
// nums2 = [1], n = 1
// 输出：[1]
console.log(merge([0], 0, [1], 1));

// 示例 4：
// 输入：
// nums1 = [1,2,4,5,6,0], m = 5
// nums2 = [3],          n = 1
// 输出：[1,2,3,4,5,6]
console.log(merge([1, 2, 4, 5, 6, 0], 5, [3], 1));