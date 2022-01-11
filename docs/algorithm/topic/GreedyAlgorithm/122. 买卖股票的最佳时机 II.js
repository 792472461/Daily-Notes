/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (prices) {
  let ans = 0
  for (let i = 1; i < prices.length; i++) {
    ans += Math.max(prices[i] - prices[i - 1], 0)
  }
  return ans
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])) // 7
console.log(maxProfit([1, 2, 3, 4, 5])) // 4
