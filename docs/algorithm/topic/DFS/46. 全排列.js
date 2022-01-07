/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function (nums) {
  const ans = []
  const used = []
  const dfs = (i, chosen) => {
    if (i === nums.length) {
      ans.push(chosen)
      return
    }
    for (let j = 0; j < nums.length; j++) {
      if (!used[j]) {
        chosen.push(nums[j])
        used[j] = true
        dfs(i + 1, [...chosen])
        used[j] = false
        chosen.pop()
      }
    }
  }
  dfs(0, [])
  return ans
}

console.log(permute([1, 2, 3]))
