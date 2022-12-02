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
 * @param {number} k
 * @return {number}
 */
export const kthSmallest = function (root, k) {
	let rank = 0;
	let res;
	// bst中中序遍历是升序
	function traverse(node) {
		if (node === null) return;
		traverse(node.left);
		rank++;
		if (rank === k) {
			res = node.val;
			return;
		}
		traverse(node.right);
	}
	traverse(root);
	return res;
};
