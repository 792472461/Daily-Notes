/*
 * @lc app=leetcode.cn id=859 lang=javascript
 *
 * [859] 亲密字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
const buddyStrings = function (s, goal) {
  if (s.length !== goal.length) return false
  if (s === goal) {
    return s.length > new Set(s).size
  }
  let a = ''
  let b = ''
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== goal[i]) {
      a = s[i] + a
      b += goal[i]
    }
  }
  return a.length === 2 && a === b
}
buddyStrings('ab', 'ba')
// @lc code=end
