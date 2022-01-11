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

console.log(findContentChildren([1, 2, 3], [1, 1])) // 1
console.log(findContentChildren([1, 2], [1, 2, 3])) // 2
