# 动态规划

## 62. 不同路径

```javascript
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


```

## 63. 不同路径Ⅱ

```javascript
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

```

## 70. 爬楼梯

```javascript
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


```
