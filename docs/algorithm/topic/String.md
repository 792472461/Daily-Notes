# 字符串经典问题

## 3.无重复字符的最长子串

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

## 8.字符串转换整数

```javascript
/**
 * @param {string} s
 * @return {number}
 */
export const myAtoi = function (s) {
    // Infinity不能参与运算，只能先这样定义好
    const max = 2147483647
    const min = -2147483648
    // 创建index指针
    let index = 0
    // 创建符号
    let sign = 1
    // 创建结果
    let total = 0

    // 边界处理
    if (s.length === 0) return 0

    // 删除多余的空格,指针往前走
    while (s.charAt(index) === ' ' && index < s.length) index++

    // 处理正负号
    if (s.charAt(index) === '+' || s.charAt(index) === '-') {
      sign = s.charAt(index) === '+' ? 1 : -1
      index++
    }
    while (index < s.length) {
      // 空字符串会被当做0
      if (s.charAt === ' ') break
      const digit = Number(s.charAt(index))
      // 不是数字到下个字符
      if (digit < 0 || digit > 9 || isNaN(digit)) break
      // 边界处理
      if (max / 10 < total || (Math.floor(max / 10) === total && max % 10 < digit)) {
        return sign === 1 ? max : min
      }

      total = 10 * total + digit
      index++
    }
    return total * sign
  }
```

## 9.回文数

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

## 20.有效的括号

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

## 30.串联所有单词的子串

```javascript
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
const findSubstring = function (s, words) {
    const wordsMap = new Map()
    let tot = 0
    words.forEach(word => {
      tot += word.length
      let num = wordsMap.get(word) || 0
      wordsMap.set(word, ++num)
    })
    const ans = []
    for (let i = 0; i + tot <= s.length; i++) {
      if (valid(s.substr(i, tot), words, wordsMap)) {
        ans.push(i)
      }
    }
    return ans
  }

/**
 *
 * @param {string} str
 * @param {string[]} words
 * @param {Map<string, number>} wordsMap
 */
function valid (str, words, wordsMap) {
  const k = words[0].length
  const splitWordsMap = new Map()
  for (let i = 0; i < str.length; i += k) {
    let num = splitWordsMap.get(str.substr(i, k)) || 0
    splitWordsMap.set(str.substr(i, k), ++num)
  }
  return equalsMap(splitWordsMap, wordsMap)
}

/**
 * 判断两个map是否一样
 * @param {Map<string, number>} a
 * @param {Map<string, number>} b
 * @returns {undefined}
 */
function equalsMap (a, b) {
  for (const [key, value] of a.entries()) {
    if (!b.get(key) || b.get(key) !== value) return false
  }
  for (const [key, value] of b.entries()) {
    if (!a.get(key) || a.get(key) !== value) return false
  }
  return true
}

console.log(findSubstring('barfoothefoobarman', ['foo', 'bar']))
console.log(findSubstring('wordgoodgoodgoodbestword', ['word', 'good', 'best', 'word']))

```

## 49. 字母的异位词

```javascript
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = function (strs) {
    const map = new Map()
    for (const str of strs) {
      // 1. 把字符串分割成数组
      const array = Array.from(str)
      // 2. 进行排序，这样异位词的key一定一样的
      array.sort()
      const key = array.toString()
      // 判断是否有，创建数组
      const list = map.get(key) ? map.get(key) : []
      // 往对应的数组里面push
      list.push(str)
      // 存储数据
      map.set(key, list)
    }
    // map转数组
    return Array.from(map.values())
  }

console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']))
```

## 242. 有效的字母异位词

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = function (s, t) {
    if (s.length !== t.length) return false
    const hashMap = new Map()
    for (let i = 0; i < s.length; i++) {
      hashMap.set(s[i], (hashMap.get(s[i]) || 0) + 1)
      hashMap.set(t[i], (hashMap.get(t[i]) || 0) - 1)
    }
    for (const item of hashMap) {
      const [, value] = item
      if (value !== 0) return false
    }
    return true
  }

console.log(isAnagram('rat', 'car'))

```

## 剑指Offer 05. 替换空格

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

## 387.字符串中第一个唯一字符

```javascript
/**
 * @param {string} s
 * @return {number}
 */
export const firstUniqChar = function (s) {
    const hm = new Map()
    for (let i = 0; i < s.length; i++) {
      const cur = hm.get(s.charAt(i)) || 0
      hm.set(s.charAt(i), cur + 1)
    }
    for (let i = 0; i < s.length; i++) {
      if (hm.get(s.charAt(i)) === 1) {
        return i
      }
    }
    return -1
  }

```
