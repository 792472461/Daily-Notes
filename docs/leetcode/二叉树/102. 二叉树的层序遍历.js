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
export const levelOrder = function (root) {
  if (!root) return []
  // 记录当前的层级
  const q = [[root, 0]]
  const res = []
  while (q.length) {
    const [n, level] = q.shift()
    // 判断当前层级有没有存储过
    if (!res[level]) {
      res.push([n.val])
    } else {
      res[level].push(n.val)
    }
    if (n.left) q.push([n.left, level + 1])
    if (n.right) q.push([n.right, level + 1])
  }
  return res
}

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
export const levelOrder2 = function (root) {
  if (!root) return []
  const q = [root]
  const res = []
  while (q.length) {
    let len = q.length
    res.push([])
    // 取出当前层级的数量
    while (len--) {
      const n = q.shift()
      res[res.length - 1].push(n.val)
      if (n.left) q.push(n.left)
      if (n.right) q.push(n.right)
    }
  }
  return res
}
