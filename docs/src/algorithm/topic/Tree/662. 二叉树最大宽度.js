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
 * @return {number}
 */
export const widthOfBinaryTree = function (root) {
	let ans = 0;
	const q = [[root, 0]];

	while (q.length) {
		const cnt = q.length;
		const data = q.shift();
		const l = data[1];
		let r = data[1];
		for (let i = 0; i < cnt; i++) {
			const ind = data[1];
			const n = data[0];
			r = ind;
			if (n.left) q.push([n.left, (ind - l) * 2]);
			if (n.right) q.push([n.right, (ind - l) * 2 + 1]);
		}
		ans = Math.max(ans, r - l + 1);
	}
	return ans;
};
