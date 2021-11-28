/**
 * @param {number[]} bills
 * @return {boolean}
 */
const lemonadeChange = function (bills) {
  // 面值只可能是 5 美元，10 美元和 20 美元三种。基于此，我们可以进行如下的分类讨论。
  // 5 美元，由于柠檬水的价格也为 5 美元，因此我们直接收下即可。
  // 10 美元，我们需要找回 5 美元，如果没有 5 美元面值的钞票，则无法正确找零。
  // 20美元，我们需要找回 15 美元，此时有两种组合方式，
  // 一种是一张 10 美元和 5 美元的钞票，一种是 3 张 5 美元的钞票，如果两种组合方式都没有，则无法正确找零。
  // 当可以正确找零时，两种找零的方式中我们更倾向于第一种，即如果存在5 美元和 10 美元，我们就按第一种方式找零，否则按第二种方式找零，
  // 因为需要使用5 美元的找零场景会比需要使用 10 美元的找零场景多，我们需要尽可能保留 5 美元的钞票。
  // 基于此，我们维护两个变量five 和ten 表示当前手中拥有的 5 美元和 10 美元钞票的张数，
  // 从前往后遍历数组分类讨论即可。
  let five = 0; let ten = 0
  for (const bill of bills) {
    if (bill === 5) five++
    if (bill === 10) {
      five--
      ten++
    }
    if (bill === 20) {
      if (ten && five) {
        ten--
        five--
      } else if (five >= 3) {
        five -= 3
      } else {
        return false
      }
    } if (ten < 0 || five < 0) return false
  }
  return true
}

console.log(lemonadeChange([5, 5, 5, 10, 20]))
