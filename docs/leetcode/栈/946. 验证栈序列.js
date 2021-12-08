/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
const validateStackSequences = function (pushed, popped) {
  let cur = 0
  const stack = []
  for (const item of pushed) {
    stack.push(item)
    while (stack.length && stack[stack.length - 1] === popped[cur]) {
      stack.pop()
      cur++
    }
  }
  return !stack.length
}

console.log(validateStackSequences([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]))
console.log(validateStackSequences([1, 2, 3, 4, 5], [4, 3, 5, 1, 2]))
