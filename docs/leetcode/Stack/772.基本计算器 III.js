/**
 * @param {string} s
 * @return {number}
 */
const calculate = function (s) {
  s = s + ' '
  let number = ''
  const tokens = []
  const ops = []
  let needsZero = true
  for (let i = 0; i < s.length; i++) {
    const ch = s.charAt(i)

    if (ch >= '0' && ch <= '9') {
      number = number + ch
      // 有数字就不用补零
      needsZero = false
      continue
    } else {
      if (number.length) {
        tokens.push(number)
        number = ''
      }
    }
    if (ch === ' ') continue
    if (ch === '(') {
      ops.push('(')
      needsZero = true
      continue
    }
    // 右括号情况处理
    if (ch === ')') {
      while (ops[ops.length - 1] !== '(') {
        tokens.push(ops[ops.length - 1])
        ops.pop()
      }
      ops.pop()
      needsZero = false
      continue
    }
    if ((ch === '+' || ch === '-') && needsZero) tokens.push('0')
    const curRank = getRank(ch)
    // 判断之前存储过的符号是否优先级比当前优先级大
    while (ops.length && getRank(ops[ops.length - 1]) >= curRank) {
      tokens.push(ops[ops.length - 1])
      ops.pop()
    }
    ops.push(ch)
    needsZero = true
  }
  while (ops.length) {
    tokens.push(ops[ops.length - 1])
    ops.pop()
  }

  function getRank (ch) {
    if (ch === '*' || ch === '/') return 2
    if (ch === '+' || ch === '-') return 1
    return 0
  }

  return evalRPN(tokens)
}

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

console.log(calculate('3+2*2')) // 7
console.log(calculate('2*(5+5*2)/3+(6/2+8)')) // 21
console.log(calculate('(2+6*3+5-(3*14/7+2)*5)+3')) // -12
console.log(calculate('-2+1')) // -1
