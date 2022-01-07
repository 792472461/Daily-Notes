/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = function (n, k) {
  const ans = []
  const dfs = (i, chosen) => {
    if (i === n + 1) {
      // 剪枝 如果已经选了超过k个，或者说剩下选择的全部也不够k个，说明肯定不合法了，提前退出
      if (chosen.length > k || chosen.length + (n - i + 1) < k) return
      if (chosen.length === k) ans.push([...chosen])
      return
    }

    dfs(i + 1, chosen)
    chosen.push(i)
    dfs(i + 1, chosen)
    chosen.pop()
  }
  dfs(1, [])
  return ans
}

console.log(combine(4, 2))
