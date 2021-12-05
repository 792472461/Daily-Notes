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

  // 看以node为根的元素是否包含元素e，递归算法
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
}

const bst = new BST()

for (const item of [28, 39, 16, 13, 22, 42, 28]) {
  bst.add(item)
}

console.log(bst.preorderTraversal())
console.log(bst.levelOrder())
