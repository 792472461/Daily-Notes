/**
 * @param {string} text
 * @return {number}
 */
const longestDecomposition = function (text) {
  return solve(text, 0, text.length - 1)
}

/**
 * 递归函数
 * @param {string} s
 * @param {number} left
 * @param {number} right
 */
function solve (s, left, right) {
  if (left > right) return 0

  for (let i = left, j = right; i < j; i++, j--) {
    if (equal(s, left, i, j, right)) {
      return 2 + solve(s, i + 1, j - 1)
    }
  }

  return 1
}

/**
 * 判断两个字符串是否一样
 * @param {string} s
 * @param {number} l1
 * @param {number} r1
 * @param {number} l2
 * @param {number} r2
 * @return {boolean}
 */
function equal (s, l1, r1, l2, r2) {
  for (let i = l1, j = l2; i <= r1 && j <= r2; i++, j++) {
    if (s.charAt(i) !== s.charAt(j)) return false
  }
  return true
}

console.log(longestDecomposition('ghiabcdefhelloadamhelloabcdefghi')) // 7
console.log(longestDecomposition('merchant')) // 1
console.log(longestDecomposition('antaprezatepzapreanta')) // 11
console.log(longestDecomposition('aaa')) // 3
