# 树

## 二分搜索树实现

```javascript
class Node {
  constructor (e) {
    this.e = e
    this.left = null
    this.right = null
  }

  toString () {
    return this.e
  }
}

class BST {
  constructor () {
    this.root = null
    this.size = 0
  }

  // 是否为空
  isEmpty () {
    return this.size === 0
  }

  // 添加元素
  add (e) {
    this.root = this._add(this.root, e)
  }

  // 向以node为根的二分搜索树中插入元素E，递归算法
  _add (node, e) {
    if (node === null) {
      this.size++
      return new Node(e)
    }
    if (e < node.e) {
      node.left = this._add(node.left, e)
    } else {
      node.right = this._add(node.right, e)
    }
    return node
  }

  // 是否包含某个元素e
  contains (e) {

  }

  /**
   * 以node为根的元素是否包含元素e，递归算法
   * @param {Node} node
   * @param {*} e
   * @returns {boolean}
   */
  _contains (node, e) {
    if (node === null) return false
    if (node.e === e) return true
    if (e < node.e) return this._contains(node.left, e)
    else return this._contains(node.right, e)
  }

  // 非递归实现前序遍历
  preorderTraversal () {
    const res = []
    if (this.root === null) return res
    // 模仿栈结构
    const stack = []
    stack.push(this.root)
    while (stack.length) {
      const cur = stack.pop()
      res.push(cur.e)
      if (cur.right !== null) stack.push(cur.right)
      if (cur.left !== null) stack.push(cur.left)
    }
    return res
  }

  // 层序遍历
  levelOrder () {
    const res = []
    if (this.root === null) return res
    const queue = new []
    queue.add(this.root)

    while (!queue.isEmpty()) {
      const { val: cur } = queue.shift()
      res.push(cur.e)
      if (cur.left !== null) queue.push(cur.left)
      if (cur.right !== null) queue.push(cur.right)
    }
    return res
  }

  // 获取二分搜索树中最大值
  minimum () {
    if (this.isEmpty()) return null
    return this._minimum(this.root)
  }

  /**
   * 返回以node为根的二分搜索树的最小值的节点
   * @param {Node} node
   * @returns {Node}
   */
  _minimum (node) {
    if (node.left === null) return node
    return this._minimum(node.left)
  }

  // 获取二分搜索树中最大值
  maximum () {
    if (this.isEmpty()) return null
    return this._maximum(this.root)
  }

  /**
   * 返回以node为根的二分搜索树的最大值的节点
   * @param {Node} node
   * @returns {Node}
   */
  _maximum (node) {
    if (node.right === null) return node
    return this._maximum(node.right)
  }

  /**
   * 删除最小值
   * @returns {Node}
   */
  removeMin () {
    const ret = this.minimum()
    this.root = this._removeMin(this.root)
    return ret
  }

  /**
   * 删除以node为根的二分搜索树的最小节点
   * @param {Node} node
   * @returns {Node} 新的二分搜索树的根
   */
  _removeMin (node) {
    if (node.left === null) {
      const rightNode = node.right
      node.right = null
      this.size--
      return rightNode
    }
    node.left = this._removeMin(node.left)
    return node
  }

  /**
   * 删除最大值
   * @returns {Node}
   */
  removeMax () {
    const ret = this.maximum()
    this.root = this._removeMax(this.root)
    return ret
  }

  /**
   * 删除以node为根的二分搜索树的最大 节点
   * @param {Node} node
   * @returns {Node} 新的二分搜索树的根
   */
  _removeMax (node) {
    if (node.right === null) {
      const leftNode = node.left
      node.left = null
      this.size--
      return leftNode
    }
    node.left = this._removeMax(node.right)
    return node
  }

  /**
   * 删除任意节点
   * @param {*} e
   */
  remove (e) {
    this.root = this._remove(this.root, e)
  }

  /**
   * 删除以node为根的二分搜索树中值为e的节点
   * @param {Node} node
   * @param {*} e
   * @returns {Node} 删除节点后的新的二分搜索树的根
   */
  _remove (node, e) {
    if (node === null) return null
    if (e < node.e) {
      node.left = this._remove(node.left, e)
      return node
    } else if (e > node.e) {
      node.right = this._remove(node.right, e)
      return node
    } else {
      if (node.left === null) {
        const rightNode = node.right
        node.right = null
        this.size--
        return rightNode
      }
      if (node.right === null) {
        const leftNode = node.left
        node.left = null
        this.size--
        return leftNode
      }
      // 左右子树均不为空
      // 找到比待删除节点大的最小节点，也就是右子树的最小节点
      // 用这个顶替待删除的位置
      const successor = this._minimum(node.right)
      // 这里已经维护过size了，所以不需要再次维护size
      successor.right = this._removeMin(node.right)
      successor.left = node.left
      node.left = node.right = null
      return successor
    }
  }
}

// for (const item of [28, 39, 16, 13, 22, 42, 28]) {
//   bst.add(item)
// }

// console.log(bst.preorderTraversal())
// console.log(bst.levelOrder())

function removeMinTest () {
  const bst = new BST()

  for (let i = 0; i < 100; i++) {
    bst.add(Math.floor(Math.random() * 1000))
  }

  const nums = []

  while (!bst.isEmpty()) {
    nums.push(bst.removeMin())
  }
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1].e > nums[i].e) {
      throw new Error('二分搜索树有问题')
    }
  }
  console.log('success')
}

removeMinTest()

```

## 94.二叉树的中序遍历

```javascript
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
 * @return {number[]}
 */
export const inorderTraversal = function (root) {
  const dfs = (node, result) => {
    if (node === null) {
      return
    }
    dfs(node.left, result)
    result.push(node.val)
    dfs(node.right, result)
  }
  const result = []
  dfs(root, result)
  return result
}

```

## 102.二叉树的层序遍历

```javascript
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

```

## 103.二叉树的锯齿形层序遍历

```javascript
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
export const zigzagLevelOrder = function (root) {
  const ans = []
  getResult(root, 0, ans)
  for (let i = 1; i < ans.length; i += 2) {
    reverse(ans[i])
  }
  return ans
}

function reverse (ans) {
  for (let i = 0, j = ans.length - 1; i < ans.length; i++, j--) {
    [ans[i], ans[j]] = [ans[j], ans[i]]
  }
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
  ans.push(root.val)
  getResult(root.left, k + 1, ans)
  getResult(root.right, k + 1, ans)
}

```

## 105.从前序与中序遍历序列构造二叉树

```javascript
function TreeNode (val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
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

```

## 107.二叉树的层序遍历Ⅱ

```javascript
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

```

## 110.平衡二叉树

```javascript
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
export const isBalanced = function (root) {
  return getHeight(root) >= 0
}

function getHeight (root) {
  if (root === null) return 0
  const l = getHeight(root.left)
  const r = getHeight(root.right)
  if (l < 0 || r < 0) return -2
  if (Math.abs(l - r) > 1) return -2
  return Math.max(l, r) + 1
}

```

## 112.路径总和

```javascript
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
  if (root === null) return false
  // 到树的最后一个节点，判断
  if (root.left === null && root.right === null) return root.val === targetSum
  // 每次把targetSum赋值成 原来的targetSum减当前的值
  if (root.left && hasPathSum(root.left, targetSum - root.val)) return true
  if (root.right && hasPathSum(root.right, targetSum - root.val)) return true
  return false
}

```

## 114.二叉树展开为链表

```javascript
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
const flatten = function (root) {
  // 递归终止条件
  if (root == null) return

  flatten(root.left)
  flatten(root.right)

  // 1、左右子树已经被拉平成一条链表
  const left = root.left
  const right = root.right

  // 2、将左子树作为右子树
  root.left = null
  root.right = left

  // 3、将原先的右子树接到当前右子树的末端
  let p = root
  while (p.right != null) {
    p = p.right
  }
  p.right = right
}

```

## 116. 填充每个节点的下一个右侧节点指针

```javascript
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
const connect = function (root) {
  if (root == null) return null
  connectTwoNode(root.left, root.right)
  return root
}

function connectTwoNode (node1, node2) {
  if (node1 === null || node2 === null) return
  /** ** 前序遍历位置 ****/
  // 将传入的两个节点连接
  node1.next = node2
  connectTwoNode(node1.left, node1.right)
  connectTwoNode(node2.left, node2.right)
  // 连接跨越父节点的两个子节点
  connectTwoNode(node1.right, node2.left)
}

```

## 144.二叉树的前序遍历

```javascript
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
 * @return {number[]}
 */
export const preorderTraversal = function (root) {
  const dfs = (node, result) => {
    if (node === null) {
      return
    }
    result.push(node.val)
    dfs(node.left, result)
    dfs(node.right, result)
  }
  const result = []
  dfs(root, result)
  return result
}

```

## 145.二叉树的后序遍历

```javascript
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
 * @return {number[]}
 */
export const postorderTraversal = function (root) {
  const dfs = (node, result) => {
    if (node === null) {
      return
    }
    dfs(node.left, result)
    dfs(node.right, result)
    result.push(node.val)
  }
  const result = []
  dfs(root, result)
  return result
}

```

## 222.完全二叉树的节点个数

```javascript
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
export const countNodes = function (root) {
  if (root === null) return 0
  return countNodes(root.left) + countNodes(root.right) + 1
}

```

## 226.翻转二叉树

```javascript
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
 * @return {TreeNode}
 */
export const invertTree = function (root) {
  if (root === null) return null
  const right = invertTree(root.right)
  const left = invertTree(root.left)
  root.left = right
  root.right = left
  return root
}

```

## 230. 二叉搜索树中第k小的元素

```javascript
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
const kthSmallest = function (root, k) {
  let rank = 0
  let res

  // bst中中序遍历是升序
  function traverse (node) {
    if (node === null) return
    traverse(node.left)
    rank++
    if (rank === k) {
      res = node.val
      return
    }
    traverse(node.right)
  }

  traverse(root)
  return res
}

```

## 662.二叉树的最大宽度

```javascript
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
  let ans = 0
  const q = [[root, 0]]

  while (q.length) {
    const cnt = q.length
    const data = q.shift()
    const l = data[1]
    let r = data[1]
    for (let i = 0; i < cnt; i++) {
      const ind = data[1]
      const n = data[0]
      r = ind
      if (n.left) q.push([n.left, (ind - l) * 2])
      if (n.right) q.push([n.right, (ind - l) * 2 + 1])
    }
    ans = Math.max(ans, r - l + 1)
  }
  return ans
}

```

## 剑指 Offer 26.树的子结构

```javascript
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
  if (B === null) return false
  if (A === null) return false
  // 如果A的值和B的值一样 && 左右子树的节点都一样
  if (A.val === B.val && isMatch(A, B)) return true

  return isSubStructure(A.left, B) || isSubStructure(A.right, B)
}

/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
function isMatch (A, B) {
  if (B === null) return true
  if (A === null) return false
  if (A.val !== B.val) return false
  return isMatch(A.left, B.left) && isMatch(A.right, B.right)
}

```

## 剑指 Offer 32Ⅱ.从上到下打印二叉树

```javascript
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
  const ans = []
  getResult(root, 0, ans)
  return ans
}

/**
 * @param {TreeNode} root
 * @param {number} k
 * @param {number[]} ans
 * @return {number[]}
 */
function getResult (root, k, ans = []) {
  if (root == null) return
  if (k === ans.length) ans.push([])
  ans[k].push(root.val)
  getResult(root.left, k + 1, ans)
  getResult(root.right, k + 1, ans)
}

```

## 剑指 Offer 54.二叉搜索树的第k大节点

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
export const kthLargest = function (root, k) {
  // 1. 先获取右子树的所有个数
  // 2. 如果右子树的个数 + 1 刚好等于k，那也就是说root刚好是第k大的元素
  // 3. 如果k <= 右子树个数，递归遍历右子树
  // 4. 否则递归遍历左子树
  const contR = getCount(root.right)
  if (k <= contR) return kthLargest(root.right, k)
  if (k === contR + 1) return root.val
  return kthLargest(root.left, k - contR - 1)
}

function getCount (root) {
  if (root === null) return 0
  return getCount(root.left) + getCount(root.right) + 1
}

```
