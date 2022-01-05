const { LinkedList, Node } = require('../basics/LinkedList')

const linkedList = new LinkedList()

for (let i = 0; i < 10; i++) {
  linkedList.add(i)
}

const removeElements = function (head, val) {
  // 创建一个虚拟头节点
  const dummyHead = new Node(0)
  dummyHead.next = head
  let cur = dummyHead

  while (cur.next !== null) {
    if (cur.next.val === val) {
      const deleteNode = cur.next
      cur.next = deleteNode.next
    } else {
      cur = cur.next
    }
  }
  return dummyHead.next
}

console.log(removeElements(linkedList.head, 2).toString())
