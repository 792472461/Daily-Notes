# 字符串经典问题

### 3.无重复字符的最长子串

```javascript
/**
 * @param {string} s
 * @return {number}
 */
export const lengthOfLongestSubstring = function (s) {
    // 定义一个字典
    const window = {}

    let left = 0
    let right = 0
    let res = 0 // 记录结果
    while (right < s.length) {
      const c = s[right]
      right++
      // 进行窗口内数据的一系列更新
      if (!window[c]) window[c] = 0
      window[c]++
      // 判断左侧窗口是否要收缩
      while (window[c] > 1) {
        const d = s[left]
        left++
        // 进行窗口内数据的一系列更新
        if (!window[d]) window[d] = 0
        window[d]--
      }
      // 在这里更新答案
      res = Math.max(res, right - left)
    }
    return res
  }
```

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
