const { LinkedList } = require('./LinkedList')
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
    const queue = new LinkedList()
    queue.add(this.root)

    while (!queue.isEmpty()) {
      const { val: cur } = queue.deleteLast()
      res.push(cur.e)
      if (cur.left !== null) queue.add(cur.left)
      if (cur.right !== null) queue.add(cur.right)
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
