function TreeNode (val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
export const buildTree = function (preorder, inorder) {
  if (preorder.length === 0) return null
  let pos = 0
  // 前序遍历[0]肯定是根节点，寻找中序遍历的
  // 1.找根节点位置
  while (inorder[pos] !== preorder[0]) ++pos

  const lp = []
  const lin = []
  const rp = []
  const rin = []
  // 处理左子树
  for (let i = 0; i < pos; i++) {
    lp.push(preorder[i + 1])
    lin.push(inorder[i])
  }
  // 处理右子树
  for (let i = pos + 1; i < preorder.length; i++) {
    rp.push(preorder[i])
    rin.push(inorder[i])
  }
  // 2.递归建立左子树
  // 3. 递归建立右子树
  return new TreeNode(preorder[0], buildTree(lp, lin), buildTree(rp, rin))
}
