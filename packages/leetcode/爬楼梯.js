// https://leetcode.cn/problems/climbing-stairs/

/**
 * @param {number} n
 * @return {number}
 */
const climbStairs = function(n) {
  if(n === 1) return 1
  if(n === 2) return 2
  const climbStairs = [0, 1, 2]
  for(let i = 3; i <= n; i++) {
    const temp = climbStairs[i - 1] + climbStairs[i - 2]
    climbStairs[i] = temp
  }
  return climbStairs[n]
};

// 示例1:
// 输入：n = 2
// 输出：2
// 解释：有两种方法可以爬到楼顶。
// 1. 1 阶 + 1 阶
// 2. 2 阶
console.log(climbStairs(2));

// 示例2:
// 输入：n = 3
// 输出：3
// 解释：有三种方法可以爬到楼顶。
// 1. 1 阶 + 1 阶 + 1 阶
// 2. 1 阶 + 2 阶
// 3. 2 阶 + 1 阶
console.log(climbStairs(3));

// 示例3:
// 输入：n = 45
// 输出：1836311903
console.log(climbStairs(45));
