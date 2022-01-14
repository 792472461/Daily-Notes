/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isSubsequence = function (s, t) {
  let i = 0
  for (const ch of s) {
    // 找到 t 上第一个匹配的 ch
    while (i < t.length && t.charAt(i) !== ch) i++
    // 如果 t 穷尽，跳出，注意始终对 i 加一
    if (i++ >= t.length) break
  }
  return i <= t.length
}

console.log(isSubsequence('abc', 'ahbgdc')) // true
console.log(isSubsequence('axc', 'ahbgdc')) // false
