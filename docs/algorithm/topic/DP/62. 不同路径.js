/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const uniquePaths = function (m, n) {
  const cur = new Array(n).fill(1)
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      cur[j] += cur[j - 1]
    }
  }
  return cur[n - 1]
}

console.log(uniquePaths(3, 7)) // 28
console.log(uniquePaths(3, 2)) // 3
