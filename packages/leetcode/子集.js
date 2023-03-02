// https://leetcode.cn/problems/subsets/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function (nums) {
  const result = []

  const recur = (i, path = []) => {
    if(i === nums.length) {
      result.push([...path])
      return
    }
    recur(i + 1, path)
    path.push(nums[i])
    recur(i + 1, path)
    path.pop()
  }
  recur(0)
  return result
};

// 示例1:
// 输入：nums = [1,2,3]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
console.log(subsets([1, 2, 3]));

// 示例2:
// 输入：nums = [0]
// 输出：[[],[0]]
console.log(subsets([0]));

// 示例3:
// 输入：nums = [1,2,3,4]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3],[4],[1,4],[2,4],[1,2,4],[3,4],[1,3,4],[2,3,4],[1,2,3,4]]
console.log(subsets([1, 2, 3, 4]));

// 示例4:
// 输入：nums = [1,2,3,4,5]
// 输出：
console.log(subsets([1, 2, 3, 4, 5]));