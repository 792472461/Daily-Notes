// https://leetcode.cn/problems/validate-binary-search-tree/

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
const isValidBST = function(root) {
  const check = (node, min, max) => {
    if (node === null) return true;
    if (node.val <= min || node.val >= max) return false;
    // 左子树的最大值不能大于当前节点的值，右子树的最小值不能小于当前节点的值
    return check(node.left, min, node.val) && check(node.right, node.val, max);
  }

  return check(root, -Infinity, Infinity);
};