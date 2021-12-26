const { LinkedList, Node } = require('../basics/LinkedList')

const linkedList = new LinkedList()

for (let i = 0; i < 10; i++) {
  linkedList.add(i)
}

const reverse = (head, n) => {
  let pre = null
  let cur = head
  while (n--) {
    const next = cur.next
    cur.next = pre

    pre = cur
    cur = next
  }
  head.next = cur
  return pre
}

const reverseBetween = function (head, left, right) {
  if (!head) return null
  const ret = new Node(0, head)
  let pre = ret
  const cnt = right - left + 1

  while (--left) {
    pre = pre.next
  }
  pre.next = reverse(pre.next, cnt)
  return ret.next
}

console.log(reverseBetween(linkedList.head, 2, 5).toString())
