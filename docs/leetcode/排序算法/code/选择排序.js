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
 * 选择排序
 * @param {number[]} arr 数组
 */
const selectSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    // 定义最小值
    let minIndex = i

    for (let j = i; j < arr.length; j++) {
      // 找出最小值
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    // 交换位置，最小的放到最左边
    swap(arr, i, minIndex)
  }
}

/**
 * 另一种方式实现的选择排序
 * @param {number[]} arr 数组
 */
const selectSort2 = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    // 定义最大值
    let maxIndex = i

    for (let j = i; j >= 0; j--) {
      // 找出最大值
      if (arr[maxIndex] < arr[j]) {
        maxIndex = j
      }
    }
    // 交换位置，最小的放到最右边
    swap(arr, i, maxIndex)
  }
}

module.exports = {
  selectSort,
  selectSort2
}
