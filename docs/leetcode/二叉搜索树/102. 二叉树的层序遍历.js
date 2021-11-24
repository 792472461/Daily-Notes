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
 * @return {number[][]}
 */
 var levelOrder = function(root) {
  const q = new Array();
  q.push(root);
  while (q.length) {
    const cur = q.shift();
    console.log(cur.e)
    if (cur.left !== null) {
      q.push(cur.left);
    }
    if (cur.right !== null) {
      q.push(cur.right);
    }
  }
};