// 给定一个整数数组nums，将数组中的元素向右轮转k个位置，其中k是非负数
const rotate = (nums, k) => {
  const reverse = (nums, start, end) => {
    while (start < end) {
      const temp = nums[start]
      nums[start] = nums[end]
      nums[end] = temp
      start++
      end--
    }
  }
  const n = nums.length
  // 处理k大于数组长度的情况 例如数组长度为7，k为9，那么相当于右移2位
  k %= n
  // 先反转整个数组
  reverse(nums, 0, n - 1)

  // 再反转前k个元素
  reverse(nums, 0, k - 1)
  // 最后反转后面的元素
  reverse(nums, k, n - 1)
  // 时间复杂度是O(n)，空间复杂度是O(1)
}
const arr = [1, 2, 3, 4, 5, 6, 7]
rotate(arr, 3)
console.log(arr)