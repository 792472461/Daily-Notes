/**
 * @param {number[][]} intervals
 * @return {number}
 */
const eraseOverlapIntervals = function (intervals) {
  const n = intervals.length
  if (!intervals.length) return 0
  intervals.sort((a, b) => a[1] - b[1])

  let res = 1
  let pre = 0
  for (let i = 1; i < n; i++) {
    if (intervals[i][0] >= intervals[pre][1]) {
      res++
      pre = i
    }
  }
  return intervals.length - res
}

console.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])) // 1
console.log(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]])) // 2
console.log(eraseOverlapIntervals([[1, 2], [2, 3]]))// 0
