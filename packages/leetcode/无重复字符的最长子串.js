// https://leetcode.cn/problems/longest-substring-without-repeating-characters

/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function(s) {
  let left = 0, right = 0, max = 0
  const map = new Map()
  // 滑动窗口
  while(right < s.length) {
    // 当前字符
    const c = s[right]
    if(map.has(c)) {
      left = Math.max(map.get(c) + 1, left)
    }
    map.set(c, right)
    max = Math.max(max, right - left + 1)
    right++
  }
  return max
};