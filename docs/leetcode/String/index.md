# 字符串经典问题

### 9.回文数

```javascript
/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = function (x) {
    const temp = x + ''

    let i = 0
    let j = temp.length - 1
    while (i < j) {
      if (temp.substr(i, 1) !== temp.substr(j, 1)) return false
      i++
      j--
    }
    return true
  }

console.log(isPalindrome(121))

```

### 20.有效的括号

```javascript
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
```

### 剑指Offer 05. 替换空格

```javascript
/**
 * 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
 * @param {string} s
 * @return {string}
 */
export const replaceSpace = function (s) {
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

```
