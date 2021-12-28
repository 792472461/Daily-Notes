/**
 * @param {string} s
 * @return {number}
 */
export const lengthOfLongestSubstring = function (s) {
  // 定义一个字典
  const window = {}

  let left = 0
  let right = 0
  let res = 0 // 记录结果
  while (right < s.length) {
    const c = s[right]
    right++
    // 进行窗口内数据的一系列更新
    if (!window[c]) window[c] = 0
    window[c]++
    // 判断左侧窗口是否要收缩
    while (window[c] > 1) {
      const d = s[left]
      left++
      // 进行窗口内数据的一系列更新
      if (!window[d]) window[d] = 0
      window[d]--
    }
    // 在这里更新答案
    res = Math.max(res, right - left)
  }
  return res
}
