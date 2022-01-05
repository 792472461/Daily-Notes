/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
export const merge = (nums1, m, nums2, n) => {
  // 定义三个指针，将cur指针指向num1最后的元素，指针i为数组1的长度-1，指针j为数组2的长度-1
  let i = m - 1; let j = n - 1; let cur = m + n - 1
  // 只要数组2中还有元素，就继续执行
  while (j >= 0) {
    // 如果nums[i]大于nums[j]，把nums1[cur]=nums1[i]，之后i--，cur--
    if (i >= 0 && nums2[j] < nums1[i]) {
      nums1[cur--] = nums1[i--]
    } else {
      // 反之把nums1[cur]=nums2[j]，之后j--，cur--
      nums1[cur--] = nums2[j--]
    }
  }
}
