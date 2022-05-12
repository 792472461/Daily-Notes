/**
 * @param {number[]} nums
 * @return {number[]}
 */
export const sortArray = function (nums) {
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
  /**
   * 排序函数
   * @param {number[]}} arr 数组
   * @param {number} l 左边标定点
   * @param {number} r 右边标定点
   */
  const sort = (arr, l, r) => {
    if (l >= r) return
    // 添加随机化
    swap(arr, l, Math.floor(Math.random() * (r - l + 1) + l))

    // arr[l + 1, lt] < v, arr[lt + 1, i - 1] == v, arr[gt, r] > v
    let lt = l
    let i = l + 1
    let gt = r + 1
    while (i < gt) {
      if (arr[i] < arr[l]) {
        lt++
        swap(arr, i, lt)
        i++
      } else if (arr[i] > arr[l]) {
        gt--
        swap(arr, i, gt)
      } else {
        // arr[i] === arr[l]
        i++
      }
    }
    swap(arr, l, lt)
    // arr[l, lt - 1] < v, arr[lt, gt - 1] == v, arr[gt, r] > v
    sort(arr, l, lt - 1)
    sort(arr, gt, r)
  }
  sort(nums, 0, nums.length - 1)
  return nums
}
