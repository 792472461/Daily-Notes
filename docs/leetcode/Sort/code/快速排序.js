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
 * 基础版快排
 * @param {number[]} arr 数组
 */
const quickSort = (data) => {
  /**
   * partition函数
   * @param {number[]} arr 数组
   * @param {number} l 左边标定点
   * @param {number} r 右边标定点
   * @returns {number} 标定点
   */
  const partition = (arr, l, r) => {
    // 添加随机化
    const p = Math.floor(Math.random() * (r - l + 1) + l)
    swap(arr, l, p)
    // 循环不变量
    // arr[l + 1, ..., j] < v
    // arr[j + 1, ..., i] >= v
    let j = l
    for (let i = l + 1; i <= r; i++) {
      if (arr[i] < arr[l]) {
        j++
        swap(arr, i, j)
      }
    }
    swap(arr, l, j)
    return j
  }
  /**
   * 排序函数
   * @param {number[]}} arr 数组
   * @param {number} l 左边标定点
   * @param {number} r 右边标定点
   */
  const sort = (arr, l, r) => {
    if (l >= r) return
    const p = partition(arr, l, r)
    sort(arr, l, p - 1)
    sort(arr, p + 1, r)
  }
  sort(data, 0, data.length - 1)
}

/**
 * 双路快排
 * @param {number[]} arr 数组
 */
const sort2ways = (data) => {
  /**
   * partition函数
   * @param {number[]} arr 数组
   * @param {number} l 左边标定点
   * @param {number} r 右边标定点
   * @returns {number} 标定点
   */
  const partition = (arr, l, r) => {
    // 添加随机化
    swap(arr, l, Math.floor(Math.random() * (r - l + 1) + l))

    // arr[l+1...i-1] <= v; arr[j+1...r] >= v
    let i = l + 1
    let j = r
    while (true) {
      while (i <= j && arr[i] < arr[l]) { i++ }

      while (j >= i && arr[j] > arr[l]) { j-- }

      if (i >= j) break
      swap(arr, i, j)
      i++
      j--
    }
    swap(arr, l, j)
    return j
  }
  /**
   * 排序函数
   * @param {number[]}} arr 数组
   * @param {number} l 左边标定点
   * @param {number} r 右边标定点
   */
  const sort = (arr, l, r) => {
    if (l >= r) return
    const p = partition(arr, l, r)
    sort(arr, l, p - 1)
    sort(arr, p + 1, r)
  }
  sort(data, 0, data.length - 1)
}

/**
 * 三路快排
 * @param {number[]} arr 数组
 */
const sort3ways = (data) => {
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
  sort(data, 0, data.length - 1)
}

module.exports = {
  quickSort,
  sort2ways,
  sort3ways
}
