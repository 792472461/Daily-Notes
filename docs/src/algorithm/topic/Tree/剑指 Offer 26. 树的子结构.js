/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
export const isSubStructure = function (A, B) {
	if (B === null) return false;
	if (A === null) return false;
	// 如果A的值和B的值一样 && 左右子树的节点都一样
	if (A.val === B.val && isMatch(A, B)) return true;

	return isSubStructure(A.left, B) || isSubStructure(A.right, B);
};

/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
function isMatch(A, B) {
	if (B === null) return true;
	if (A === null) return false;
	if (A.val !== B.val) return false;
	return isMatch(A.left, B.left) && isMatch(A.right, B.right);
}
