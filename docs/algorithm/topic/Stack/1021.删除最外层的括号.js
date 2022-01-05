/**
 * @param {string} s
 * @return {string}
 */
const removeOuterParentheses = function (s) {
  let res = ''
  let opened = 0
  for (const ch of s) {
    if (ch === '(' && opened++ > 0) res += ch
    if (ch === ')' && opened-- > 1) res += ch
  }
  return res
}

console.log(removeOuterParentheses('(()())(())'))
