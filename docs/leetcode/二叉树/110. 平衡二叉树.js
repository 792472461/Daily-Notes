/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
export const isBalanced = function (root) {
  return getHeight(root) >= 0
}

function getHeight (root) {
  if (root === null) return 0
  const l = getHeight(root.left)
  const r = getHeight(root.right)
  if (l < 0 || r < 0) return -2
  if (Math.abs(l - r) > 1) return -2
  return Math.max(l, r) + 1
}
