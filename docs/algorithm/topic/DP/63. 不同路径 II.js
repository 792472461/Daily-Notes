/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
const uniquePathsWithObstacles = function (obstacleGrid) {
  const width = obstacleGrid[0].length
  const dp = new Array(width).fill(0)
  dp[0] = 1
  for (const row of obstacleGrid) {
    for (let j = 0; j < width; j++) {
      if (row[j] === 1) {
        dp[j] = 0
      } else if (j > 0) {
        dp[j] += dp[j - 1]
      }
    }
  }
  return dp[width - 1]
}

console.log(uniquePathsWithObstacles([[0, 0, 0], [0, 1, 0], [0, 0, 0]]))
