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
 * @param {number} targetSum
 * @return {boolean}
 */
export const hasPathSum = function (root, targetSum) {
	if (root === null) return false;
	// 到树的最后一个节点，判断
	if (root.left === null && root.right === null) return root.val === targetSum;
	// 每次把targetSum赋值成 原来的targetSum减当前的值
	if (root.left && hasPathSum(root.left, targetSum - root.val)) return true;
	if (root.right && hasPathSum(root.right, targetSum - root.val)) return true;
	return false;
};
