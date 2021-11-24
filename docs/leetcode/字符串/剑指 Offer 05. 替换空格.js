/**
 * 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function (s) {
  let result = ''
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') {
      result += '%20'
    } else {
      result += s[i]
    }
  }
  return result
};