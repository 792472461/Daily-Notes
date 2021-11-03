class Node {
  constructor(e = null) {
    this.e = e;
  }
  e = null;
  left = null;
  right = null;
}

class BST {
  constructor(e = null) {
    this.root = e;
  }
  root = null;
  size = 0;

  add(e) {
    this.root = this._add(this.root, e);
    return this;
  }

  // 向以node为根的二分搜索树插入元素e，递归算法
  // 返回插入新节点二分搜索树的根
  _add(node, e) {
    if (node === null) {
      this.size++;

      return new Node(e);
    }
    if (node.e > e) {
      node.left = this._add(node.left, e);
    } else if (node.e < e) {
      node.right = this._add(node.right, e);
    }
    return node;
  }

  size() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }
}

module.exports = BST;
