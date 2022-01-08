/**
 * @param {number} n
 * @return {number}
 */
const climbStairs = function (n) {
  const ans = [1, 1, 2]
  if (n === 0) return ans[0]
  if (n === 1) return ans[1]
  if (n === 2) return ans[2]
  for (let i = 3; i <= n; i++) {
    ans[i] = ans[i - 1] + ans[i - 2]
  }
  return ans[n]
}

console.log(climbStairs(4))
