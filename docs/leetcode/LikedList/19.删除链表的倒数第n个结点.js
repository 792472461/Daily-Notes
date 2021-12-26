const { LinkedList, Node } = require('../basics/LinkedList')

const linkedList = new LinkedList()

for (let i = 0; i < 10; i++) {
  linkedList.add(i)
}

const removeNthFromEnd = function (head, n) {
  // 判断head是否为空
  if (head === null) return head
  // 创建虚拟头节点
  const ret = new Node(-1, head)
  let pre = ret
  let cur = head
  // 让cur移动k步
  for (let i = 0; i < n; i++) {
    cur = cur.next
  }
  if (!cur) return head.next
  // 然后让两个指针一起移动，知道cur指向空
  while (cur) {
    cur = cur.next
    pre = pre.next
  }
  pre.next = pre.next.next
  // 然后删除
  return ret.next
}

console.log(removeNthFromEnd(linkedList.head, 1).toString())
