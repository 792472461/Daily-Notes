// https://leetcode.cn/problems/move-zeroes/description/

const moveZeroes = function(nums) {
  let nonZeroIndex = 0;

  // 将所有非零元素移到数组前部
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[nonZeroIndex++] = nums[i];
    }
  }

  // 将剩余元素填充为零
  for (let i = nonZeroIndex; i < nums.length; i++) {
    nums[i] = 0;
  }

  return nums;
}