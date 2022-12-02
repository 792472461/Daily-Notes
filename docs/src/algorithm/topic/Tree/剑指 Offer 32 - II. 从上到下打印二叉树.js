/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
export const levelOrder = function (root) {
	const ans = [];
	getResult(root, 0, ans);
	return ans;
};

/**
 * @param {TreeNode} root
 * @param {number} k
 * @param {number[]} ans
 * @return {number[]}
 */
function getResult(root, k, ans = []) {
	if (root == null) return;
	if (k === ans.length) ans.push([]);
	ans[k].push(root.val);
	getResult(root.left, k + 1, ans);
	getResult(root.right, k + 1, ans);
}
