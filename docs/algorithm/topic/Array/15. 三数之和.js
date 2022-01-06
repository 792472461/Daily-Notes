/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  const ans = []
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue
    const jks = twoSum(nums, i + 1, -nums[i])
    for (const jk of jks) {
      ans.push([nums[i], jk[0], jk[1]])
    }
  }
  return ans
}

function twoSum (nums, start, target) {
  const ans = []
  let j = nums.length - 1
  for (let i = start; i < nums.length; i++) {
    if (i > start && nums[i] === nums[i - 1]) continue
    while (i < j && nums[i] + nums[j] > target) j--
    if (i < j && nums[i] + nums[j] === target) {
      ans.push([nums[i], nums[j]])
    }
  }
  return ans
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]))
