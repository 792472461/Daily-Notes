/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function (nums) {
  const ans = []
  const dfs = (i, chosen) => {
    // 递归边界
    if (i === nums.length) {
      ans.push([...chosen])
      return
    }
    dfs(i + 1, chosen)
    chosen.push(nums[i])
    dfs(i + 1, chosen)
    chosen.pop()
  }
  dfs(0, [])
  return ans
}
console.log(subsets([1, 2, 3]))
