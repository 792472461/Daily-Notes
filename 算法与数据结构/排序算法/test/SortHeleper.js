class SortHeleper {
  /**
   * 判断一个数组是否是排序后的
   * @param {number[]} arr 数组
   * @returns {boolean}
   */
  static isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) {
        console.log(arr)
        return false
      }
    }
    return true
  }
  /**
   * 随机生产长度为length的不规则数组
   * @param {number} length 长度
   * @returns {number[]}
   */
  static generateRandomArray(length = 10) {
    const arr = []
    for (let i = 0; i < length; i++) {
      arr.push(Math.floor(Math.random() * length * 10))
    }
    return arr
  }
  /**
   * 拷贝一个一模一样的数组
   * @param {number[]} arr 
   * @returns {number[]}
   */
  static arrayCopyOf(arr) {
    return [...arr]
  }
}

module.exports = SortHeleper