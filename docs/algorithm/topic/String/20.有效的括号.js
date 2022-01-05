/**
 * @param {string} s
 * @return {boolean}
 */
export const isValid = function (s) {
  const leftBrackets = ['{', '(', '[']
  const rightBrackets = ['}', ')', ']']
  const stack = []
  for (let i = 0; i < s.length; i++) {
    const leftIndex = leftBrackets.indexOf(s[i])
    const rightIndex = rightBrackets.indexOf(s[i])
    console.log(leftIndex, rightIndex)
    if (leftIndex >= 0) {
      stack.push(leftIndex)
    } else if (stack.pop() !== rightIndex) {
      return false
    }
  }
  return stack.length === 0
}
