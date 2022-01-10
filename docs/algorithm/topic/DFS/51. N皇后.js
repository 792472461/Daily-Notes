/**
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = function (n) {
  if (n < 1) return []
  const result = []

  // 判断当前位置是否合法
  const checkValidate = (ware = [], row, col) => {
    const length = ware.length
    for (let h = 0; h < length; h++) {
      const v = ware[h]
      if (v === col) return false
      if (Math.abs(v - col) === Math.abs(h - row)) {
        return false
      }
    }
    return true
  }
  /**
   *
   * @param {number} start
   * @param {number[]} ware
   * @param {number} length
   * @returns {number}
   */
  const dfs = (start = 0, ware = [], length) => {
    if (ware.length === length) return result.push(ware)

    for (let col = 0; col < length; col++) {
      if (checkValidate(ware, start, col)) {
        dfs(start + 1, [...ware, col], n)
      }
    }
  }
  dfs(0, [], n)

  return result.map(item => {
    return item.map(i => {
      const r = new Array(n).fill('.')
      r[i] = 'Q'
      return r.join('')
    })
  })
}

console.log(solveNQueens(4))

// [1, 1] 能攻击范围 [0, 0] [2, 2] ... [n-1, n-1] [0, 2], [2, 0]
