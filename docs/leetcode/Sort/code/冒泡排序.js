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
 * 冒泡排序基础版
 * @param {number[]} arr
 */
const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    // arr[n-i] - arr[n]已经排好序了
    // 通过冒泡在arr[n-i-1]位置放上合适元素
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
  }
}

/**
 * 冒泡排序优化版
 * @param {number[]} arr
 */
const bubbleSort2 = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    // 是否发生了交换
    let isSwapped = false
    // arr[n-i] - arr[n]已经排好序了
    // 通过冒泡在arr[n-i-1]位置放上合适元素
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
        isSwapped = true
      }
    }
    // 如果结束循环以后，没有交换过位置，就证明这个时候元素已经是有序的了
    // 这里主要优化的是有序的情况下
    if (!isSwapped) break
  }
}

/**
 * 冒泡排序再优化版
 * @param {number[]} arr
 */
const bubbleSort3 = (arr) => {
  for (let i = 0; i < arr.length - 1;) {
    // 最后一次交换的位置
    let lastSwappedIndex = 0
    // arr[n-i] - arr[n]已经排好序了
    // 通过冒泡在arr[n-i-1]位置放上合适元素
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
        lastSwappedIndex = j + 1
      }
    }
    // 这样有可能一下子跳过好几轮
    i = arr.length - lastSwappedIndex
  }
}

module.exports = {
  bubbleSort,
  bubbleSort2,
  bubbleSort3
}
