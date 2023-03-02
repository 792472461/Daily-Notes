// 前序遍历
// 递归
const preorderTraversal = (root) => {
  const res = []
  const dfs = (root) => {
    if (root === null) return
    res.push(root.val)
    dfs(root.left)
    dfs(root.right)
  }
  dfs(root)
}

// 迭代
const preorderTraversal1 = (root) => {
  const res = []
  const stack = []
  let cur = root
  while (cur || stack.length) {
    while (cur) {
      res.push(cur.val)
      stack.push(cur)
      cur = cur.left
    }
    cur = stack.pop()
    cur = cur.right
  }
  return res
}

// 中序遍历
// 递归
const inorderTraversal = (root) => {
  const res = []
  const dfs = (root) => {
    if (root === null) return
    dfs(root.left)
    res.push(root.val)
    dfs(root.right)
  }
  dfs(root)
}

// 迭代
const inorderTraversal1 = (root) => {
  const res = []
  const stack = []
  let cur = root
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur)
      cur = cur.left
    }
    cur = stack.pop()
    res.push(cur.val)
    cur = cur.right
  }
  return res
}

// 后序遍历
// 递归
const postorderTraversal = (root) => {
  const res = []
  const dfs = (root) => {
    if (root === null) return
    dfs(root.left)
    dfs(root.right)
    res.push(root.val)
  }
  dfs(root)
}

// 迭代
const postorderTraversal1 = (root) => {
  const res = []
  const stack = []
  let cur = root
  let prev = null
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur)
      cur = cur.left
    }
    cur = stack[stack.length - 1]
    if (cur.right === null || cur.right === prev) {
      res.push(cur.val)
      stack.pop()
      prev = cur
      cur = null
    } else {
      cur = cur.right
    }
  }
  return res
}

// 层序遍历
// 迭代
const levelOrder = (root) => {
  if (root === null) return []
  const res = []
  const queue = [root]
  while (queue.length) {
    const level = []
    const len = queue.length
    for (let i = 0; i < len; i++) {
      const cur = queue.shift()
      level.push(cur.val)
      if (cur.left) queue.push(cur.left)
      if (cur.right) queue.push(cur.right)
    }
    res.push(level)
  }
  return res
}

// 二叉树的最大深度
// 递归
const maxDepth = (root) => {
  if (root === null) return 0
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}

// 迭代
const maxDepth1 = (root) => {
  const queue = []
  if (root) queue.push(root)
  let depth = 0
  while (queue.length) {
    const len = queue.length
    for (let i = 0; i < len; i++) {
      const cur = queue.shift()
      if (cur.left) queue.push(cur.left)
      if (cur.right) queue.push(cur.right)
    }
    depth++
  }
  return depth
}