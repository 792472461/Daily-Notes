/**
 * 归并排序基础版
 * @param {number[]} arr 
 */
const mergeSort = (arr) => {
  /**
   * 合并两个有序的数组，arr[l, mid] 和 arr[mid + 1, r]
   * @param {number[]} arr 
   * @param {number} l 
   * @param {number} mid 
   * @param {number} r 
   * @param {number[]} temp 
   */
  const merge = (arr, l, mid, r, temp) => {
    temp = arr.slice(l, r + 1)
    let i = l,
      j = mid + 1
    // 每轮为arr[k]赋值，从l走到r
    for (let k = l; k <= r; k++) {
      if (i > mid) {
        // 索引i大于 中间值的时候  就越界了直接赋值
        arr[k] = temp[j - l]
        j++
      } else if (j > r) {
        // 索引i 大于右边边界的时候 直接赋值
        arr[k] = temp[i - l]
        i++
      } else if (temp[i - l] <= temp[j - l]) {
        // 左边元素比右边元素小的时候
        arr[k] = temp[i - l]
        i++
      } else {
        arr[k] = temp[j - l]
        j++
      }
    }
  }
  /**
   * 排序过程
   * @param {number[]} arr 
   * @param {number} l 
   * @param {number} r 
   * @param {number[]} temp
   */
  const sort = (arr, l, r, temp) => {
    if (l >= r) return
    const mid = l + Math.floor((r - l) / 2)
    sort(arr, l, mid, temp)
    sort(arr, mid + 1, r, temp)
    if (arr[mid] > arr[mid + 1])
      merge(arr, l, mid, r, temp)
  }
  const temp = [...arr]
  sort(arr, 0, arr.length - 1, temp)
}

module.exports = {
  mergeSort
}