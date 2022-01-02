# 栈经典问题

### 20.有效的括号

```javascript
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
      } else {
        stack.push(ch)
      }
    }
    return !stack.length
  }
// console.log(isValid('()'))
// console.log(isValid('()[]{}'))
// console.log(isValid('(]'))
// console.log(isValid('([)]'))
console.log(isValid('()[]{}'))
```

### 145.二叉树的后续遍历

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const postorderTraversal = function (root) {
  const res = []
  if (!root) return res
  const stack = [root]
  while (stack.length) {
    root = stack.pop()
    res.unshift(root.val)
    if (root.left) stack.push(root.left)
    if (root.right) stack.push(root.right)
  }
  return res
}

console.log(postorderTraversal([1, null, 2, 3]))
```

### 150.逆波兰表达式求值

```javascript
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
```

### 155.最小栈

```javascript
const MinStack = function () {
  this.s = []
  this.preMin = []
}

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.s.push(val)
  if (this.preMin.length === 0) {
    this.preMin.push(val)
  } else {
    // 这里判断最小值和当前值哪个最小，最小栈push进去最小值
    this.preMin.push(Math.min(this.preMin[this.preMin.length - 1], val))
  }
}

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.s.pop()
  this.preMin.pop()
}

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.s[this.s.length - 1]
}

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.preMin[this.preMin.length - 1]
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

const minStack = new MinStack()
minStack.push(-2)
minStack.push(0)
minStack.push(-3)
console.log(minStack.getMin())
minStack.pop()
console.log(minStack.top())
console.log(minStack.getMin())
```

### 331.验证二叉树的前序序列化

```javascript
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

```

### 682.棒球比赛

```javascript
/**
 * @param {string[]} ops
 * @return {number}
 */
const calPoints = function (ops) {
    const result = []
    for (const num of ops) {
      switch (num) {
      case 'C' :
        // "C" - 表示前一次得分无效，将其从记录中移除。题目数据保证记录此操作时前面总是存在一个有效的分数。
        result.pop()
        break
      case 'D':
        // "D" - 表示本回合新获得的得分是前一次得分的两倍。题目数据保证记录此操作时前面总是存在一个有效的分数。
        result.push(result[result.length - 1] * 2)
        break
      case '+' :
        // "+" - 表示本回合新获得的得分是前两次得分的总和。题目数据保证记录此操作时前面总是存在两个有效的分数。
        result.push(result[result.length - 1] + result[result.length - 2])
        break
      default:
        result.push(+num)
        break
      }
    }
    return result.reduce((a, b) => a + b)
  }

console.log(calPoints(['5', '2', 'C', 'D', '+'])) // 30
console.log(calPoints(['5', '-2', '4', 'C', 'D', '9', '+', '+'])) // 27

```

### 772.基本计算器Ⅲ

```javascript
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
```

### 844.比较含退格的字符串

```javascript
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

```

### 946.验证栈序列

```javascript
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
```

### 1021.删除最外层的括号

```javascript
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

```

### 1249.移除无效的括号

```javascript
/**
 * @param {string} s
 * @return {string}
 */
const minRemoveToMakeValid = function (s) {
    const leftDel = [];
    const rightDel = []
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') {
        leftDel.push(i)
      } else if (s[i] === ')') {
        if (leftDel.length) {
          leftDel.pop()
        } else {
          rightDel.push(i)
        }
      }
    }
    const res = [...s];
    const del = leftDel.concat(rightDel)
    for (let i = 0; i < del.length; i++) {
      res[del[i]] = ''
    }
    return res.join('')
  }

console.log(minRemoveToMakeValid('lee(t(c)o)de)'))

```

###         
