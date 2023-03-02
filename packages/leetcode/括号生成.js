// https://leetcode.cn/problems/generate-parentheses/submissions/
/**
 * @param {number} n
 * @return {string[]}
 * @description 生成括号
 */
const generateParenthesis = function (n) {
  if(n === 0) return []
  const result = []

  const recur = (left, right, path = []) => {
    // 递归终止条件
    if(left === n && right === n) {
      result.push(path.join(''))
      return
    }
    if(left < n) {
      path.push('(')
      recur(left + 1, right, path)
      path.pop()
    }
    if(right < left) {
      path.push(')')
      recur(left, right + 1, path)
      path.pop()
    }
  }
  recur(0, 0)
  return result
};


// 示例1:
// 输入：n = 3
// 输出：["((()))","(()())","(())()","()(())","()()()"]
console.log(generateParenthesis(3));

// 示例2:
// 输入：n = 1
// 输出：["()"]
console.log(generateParenthesis(1));

