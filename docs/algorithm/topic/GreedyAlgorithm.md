# 贪心

## 45. 跳跃游戏

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
const jump = function (nums) {
    let now = 0
    let ans = 0
    while (now < nums.length - 1) {
      const right = now + nums[now]
      // [now+1, right] 是可达范围
      if (right >= nums.length - 1) return ans + 1
      let nextRight = right
      let next = now
      for (let i = now + 1; i <= right; i++) {
        if (i + nums[i] > nextRight) {
          nextRight = i + nums[i]
          next = i
        }
      }
      now = next
      ans++
    }
    return ans
  }
```

## 122. 买卖股票的最佳时间Ⅱ

```javascript
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
```

## 455. 分发饼干

```javascript
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
const findContentChildren = function (g, s) {
    // g[i] <= s[j] 的i都可以满足
    // g[i1] <= g[i2] <= s[j] 满足i2更好

    // 满足i2 答案+1 剩下g[i1] 剩下同样的饼干
    // 满足i1 答案+1 剩下g[i2]
    let ans = 0
    g.sort((a, b) => a - b)
    s.sort((a, b) => a - b)
    let j = 0
    for (const child of g) {
      while (j < s.length && s[j] < child) j++
      if (j < s.length) {
        ans++
        j++
      }
    }
    return ans
  }
```
