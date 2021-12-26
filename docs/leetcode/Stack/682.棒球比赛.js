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
