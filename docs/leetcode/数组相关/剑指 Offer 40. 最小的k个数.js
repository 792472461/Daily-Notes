/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function (arr, k) {
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
   * partition函数
   * @param {number[]} arr 数组
   * @param {number} l 左边标定点
   * @param {number} r 右边标定点
   * @returns {number} 标定点
   */
  const partition = (arr, l, r) => {
    swap(arr, l, Math.floor(Math.random() * (r - l + 1) + l))

    // arr[l+1...i-1] <= v; arr[j+1...r] >= v
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && arr[i] < arr[l])
        i++;

      while (j >= i && arr[j] > arr[l])
        j--;

      if (i >= j) break;
      swap(arr, i, j);

      i++;
      j--;
    }
    swap(arr, l, j)
    return j
  }
  /**
   * 获取k大的数
   * @param {number[]} arr 
   * @param {number} l 
   * @param {number} r 
   * @param {*} k 
   * @returns {number}
   */
  const selectK = (arr, l, r, k) => {
    const p = partition(arr, l, r);

    if (k == p) return arr[p];

    if (k < p) return selectK(arr, l, p - 1, k);
    return selectK(arr, p + 1, r, k);
  }

  selectK(arr, 0, arr.length - 1, k - 1)
  return arr.slice(0, k)
};