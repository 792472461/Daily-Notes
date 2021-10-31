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
 * 希尔排序
 * @param {number[]} arr 数组
 */
const shellSort = (arr) => {
  let h = Math.floor(arr.length / 2)
  while (h >= 1) {
    for (let start = 0; start < h; start++) {
      // 对arr[start, start + h, start + 2h, ... ]进行插入排序
      for (let i = start + h; i < arr.length; i += h) {
        // 将arr[i]插入到合适的位置
        const t = arr[i]
        let j
        for (j = i; j > 0 && t < arr[j - h]; j -= h) {
          arr[j] = arr[j - h]
        }
        arr[j] = t
      }
    }
    h = Math.floor(h / 2)
  }
}

/**
 * 希尔排序的优化版本
 * @param {number[]} arr 数组
 */
const shellSort2 = (arr) => {
  let h = Math.floor(arr.length / 2)
  while (h >= 1) {
    // 对arr[h, n]进行插入排序
    for (let i = h; i < arr.length; i++) {
      // 将arr[i]插入到合适的位置
      const t = arr[i]
      let j
      for (j = i; j - h >= 0 && t < arr[j - h]; j -= h) {
        arr[j] = arr[j - h]
      }
      arr[j] = t
    }
    h = Math.floor(h / 2)
  }
}

/**
 * 步长序列版本的希尔排序
 * @param {number[]} arr 数组
 */
const shellSort3 = (arr) => {
  let h = 1
  while (h < arr.length) h = h * 3 + 1
  while (h >= 1) {
    // 对arr[h, n]进行插入排序
    for (let i = h; i < arr.length; i++) {
      // 将arr[i]插入到合适的位置
      const t = arr[i]
      let j
      
      for (j = i; j - h >= 0 && t < arr[j - h]; j -= h) {
        arr[j] = arr[j - h]
      }
      arr[j] = t
    }
    
    h = Math.floor(h / 3)
  }
}

module.exports = {
  shellSort,
  shellSort2,
  shellSort3
}