/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
export const kthLargest = function (root, k) {
  // 1. 先获取右子树的所有个数
  // 2. 如果右子树的个数 + 1 刚好等于k，那也就是说root刚好是第k大的元素
  // 3. 如果k <= 右子树个数，递归遍历右子树
  // 4. 否则递归遍历左子树
  const contR = getCount(root.right)
  if (k <= contR) return kthLargest(root.right, k)
  if (k === contR + 1) return root.val
  return kthLargest(root.left, k - contR - 1)
}

function getCount (root) {
  if (root === null) return 0
  return getCount(root.left) + getCount(root.right) + 1
}
