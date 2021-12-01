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
 * 插入排序
 * @param {number[]} arr 要排序后的
 */
const insertSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    // 将arr[i]插入到合适的位置
    // 如果arr[j] < arr[j - 1]则需要交换位置
    for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
      swap(arr, j, j - 1)
    }
  }
}

/**
 * 优化后的插入排序
 * @param {number[]} arr
 */
const insertSort2 = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    // 将arr[i]插入到合适的位置
    const t = arr[i]
    let j
    for (j = i; j > 0 && t < arr[j - 1]; j--) {
      arr[j] = arr[j - 1]
    }
    arr[j] = t
  }
}

/**
 * 换一种方式实现
 * @param {number[]} arr
 */
const insertSort3 = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    // 将arr[i]插入到合适的位置
    const t = arr[i]
    let j
    for (j = i; j + 1 < arr.length && t > arr[j + 1]; j++) {
      arr[j] = arr[j + 1]
    }
    arr[j] = t
  }
}

module.exports = {
  insertSort,
  insertSort2,
  insertSort3
}
