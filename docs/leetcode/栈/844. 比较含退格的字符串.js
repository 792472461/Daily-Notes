/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const backspaceCompare = function (s, t) {
  /**
   *
   * @param {string} s
   */
  const processed = (str) => {
    const stack = []
    for (const ch of str) {
      if (ch === '#') {
        stack.pop()
      } else {
        stack.push(ch)
      }
    }
    return stack.join('')
  }
  return processed(s) === processed(t)
}

console.log(backspaceCompare('ab#c', 'ad#c')) // S 和 T 都会变成 “ac”。 true
