/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
  const stack = []
  const map = new Map([[')', '('], [']', '['], ['}', '{']])
  for (const ch of s) {
    if (map.has(ch)) {
      if (!stack.length || map.get(ch) !== stack[stack.length - 1]) {
        console.log(stack[stack.length - 1], map.get(ch))
        // return false
      }
      stack.pop()
    } else { stack.push(ch) }
  }
  return !stack.length
}
// console.log(isValid('()'))
// console.log(isValid('()[]{}'))
// console.log(isValid('(]'))
// console.log(isValid('([)]'))
console.log(isValid('()[]{}'))
