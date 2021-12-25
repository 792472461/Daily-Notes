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
export const levelOrderBottom = function (root) {
  const ans = []
  getResult(root, 0, ans)
  for (let i = 0, j = ans.length - 1; i < j; i++, j--) {
    const temp = ans[i]
    ans[i] = ans[j]
    ans[j] = temp
  }
  return ans
}

/**
 *
 * @param {TreeNode}root
 * @param {number} k
 * @param {number[]} ans
 */
function getResult (root, k, ans = []) {
  // 递归终止条件
  if (root === null) return
  if (k === ans.length) ans.push([])
  ans[k].push(root.val)
  getResult(root.left, k + 1, ans)
  getResult(root.right, k + 1, ans)
}
