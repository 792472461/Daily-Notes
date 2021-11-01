/**
 * 这道题可以巧妙利用归并排序的思想
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function (nums) {
  /**
   * 排序
   * @param {number[]} arr 
   * @returns {number}
   */
  const mergeSort = (arr) => {
    /**
     * 合并两个有序的数组，arr[l, mid] 和 arr[mid + 1, r]
     * @param {number[]} arr 
     * @param {number} l 
     * @param {number} mid 
     * @param {number} r 
     * @param {number[]} temp
     * @returns {number} 
     */
    const merge = (arr, l, mid, r, temp) => {
      temp = arr.slice(l, r + 1)
      let rest = 0
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
          rest += mid - i + 1
          arr[k] = temp[j - l]
          j++
        }
      }
      return rest
    }
    /**
     * 排序过程
     * @param {number[]} arr 
     * @param {number} l 
     * @param {number} r 
     * @param {number[]} temp
     */
    const sort = (arr, l, r, temp) => {
      if (l >= r) return 0
      let rest = 0
      const mid = l + Math.floor((r - l) / 2)
      rest += sort(arr, l, mid, temp)
      rest += sort(arr, mid + 1, r, temp)
      if (arr[mid] > arr[mid + 1])
        rest += merge(arr, l, mid, r, temp)
      return rest
    }
    const temp = [...arr]
    return sort(arr, 0, arr.length - 1, temp)
  }

  return mergeSort(nums)
};