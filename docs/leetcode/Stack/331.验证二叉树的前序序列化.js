/**
 * @param {string} preorder
 * @return {boolean}
 */
const isValidSerialization = function (preorder) {
  const n = preorder.length
  const stack = [1]
  let i = 0
  while (i < n) {
    if (!stack.length) return false
    if (preorder[i] === ',') i++
    else if (preorder[i] === '#') {
      stack[stack.length - 1]--
      if (stack[stack.length - 1] === 0) {
        stack.pop()
      }
      i++
    } else {
      while (i < n && preorder[i] !== ',') {
        i++
      }
      stack[stack.length - 1]--
      if (stack[stack.length - 1] === 0) {
        stack.pop()
      }
      stack.push(2)
    }
  }
  return !stack.length
}

console.log(isValidSerialization('9,3,4,#,#,1,#,#,2,#,6,#,#'))
