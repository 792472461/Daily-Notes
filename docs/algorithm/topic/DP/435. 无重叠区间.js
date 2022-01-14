/**
 * @param {number[][]} intervals
 * @return {number}
 */
const eraseOverlapIntervals = function (intervals) {
  const n = intervals.length
  if (!intervals.length) return 0
  intervals.sort((a, b) => a[0] - b[0])

  const dp = new Array(intervals.length).fill(1)
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (intervals[i][0] >= intervals[j][1]) {
        dp[i] = Math.max(dp[i], 1 + dp[j])
      }
    }
  }
  let res = 0
  for (let i = 0; i < dp.length; i++) {
    res = Math.max(res, dp[i])
  }
  return intervals.length - res
}

console.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])) // 1
console.log(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]])) // 2
console.log(eraseOverlapIntervals([[1, 2], [2, 3]]))// 0
