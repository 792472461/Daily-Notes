function TreeNode (val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
const constructMaximumBinaryTree = function (nums) {
  if (nums === null) return null
  return findRoot(nums, 0, nums.length)
}

/**
 * 寻找最大根节点
 * @param {number[]} nums
 * @param {number} l
 * @param {number} r
 * @returns {TreeNode}
 */
function findRoot (nums, l, r) {
  if (l === r) return null
  let maxIdx = l
  for (let i = l + 1; i < r; i++) {
    if (nums[i] > nums[maxIdx]) maxIdx = i
  }
  const root = new TreeNode(nums[maxIdx])
  root.left = findRoot(nums, l, maxIdx)
  root.right = findRoot(nums, maxIdx + 1, r)
  return root
}

console.log(constructMaximumBinaryTree([3, 2, 1, 6, 0, 5]))
