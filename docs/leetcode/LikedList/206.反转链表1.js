const { LinkedList } = require('../basics/LinkedList')

const linkedList = new LinkedList()

for (let i = 0; i < 10; i++) {
  linkedList.add(i)
}

// 非递归版本实现
const reverseList = function (head) {
  let cur = head
  let pre = null

  while (cur) {
    // 缓存下个节点
    const next = cur.next
    // 颠倒节点
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
}

console.log(reverseList(linkedList.head).toString())

// 递归版本的实现
const reverseList1 = function (head) {
  if (head === null || head.next === null) return head
  const rev = reverseList1(head.next)
  head.next.next = head
  head.next = null
  return rev
}

console.log(reverseList1(linkedList.head).toString())
