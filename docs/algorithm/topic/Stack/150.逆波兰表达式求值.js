/**
 * @param {string[]} tokens
 * @return {number}
 */
const evalRPN = function (tokens) {
  const s = []

  /**
   * 计算器
   * @param {number} x
   * @param {number} y
   * @param {'+'|'-'|'*'|'/'} op
   */
  function calc (x, y, op) {
    if (op === '+') return Math.trunc(x + y)
    if (op === '-') return Math.trunc(x - y)
    if (op === '*') return Math.trunc(x * y)
    if (op === '/') return Math.trunc(x / y)
    return 0
  }

  for (const token of tokens) {
    if (token === '+' || token === '-' || token === '*' || token === '/') {
      // 运算符情况
      const y = s[s.length - 1]
      s.pop()
      const x = s[s.length - 1]
      s.pop()
      const z = calc(x, y, token)
      s.push(z)
    } else {
      // 数字情况,直接push即可，但是是字符串的数字
      s.push(Number(token))
    }
  }
  return s[s.length - 1]
}

console.log(evalRPN(['2', '1', '+', '3', '*'])) // ((2 + 1) * 3) = 9
console.log(evalRPN(['4', '13', '5', '/', '+'])) // (4 + (13 / 5)) = 6
console.log(evalRPN(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'])) // ((10 * (6 / ((9 + 3) * -11))) + 17) + 5 = 22
