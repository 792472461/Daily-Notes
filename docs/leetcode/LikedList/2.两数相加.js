function ListNode (val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
export const addTwoNumbers = function (l1, l2) {
  // 两个不为空
  if (l1 === null) return l2
  if (l2 === null) return l1

  const dummyHead = new ListNode(0)
  let last = dummyHead

  // 保存进位值
  let carry = 0
  while (l1 !== null || l2 !== null) {
    let v1 = 0
    // 防止l1或者l2为null
    if (l1 !== null) {
      v1 = l1.val
      l1 = l1.next
    }
    let v2 = 0
    if (l2 !== null) {
      v2 = l2.val
      l2 = l2.next
    }
    const sum = v1 + v2 + carry
    // 设置进位值
    carry = Math.floor(sum / 10)
    // sum的个位数作为新节点的值
    last.next = new ListNode(sum % 10)
    last = last.next
  }

  if (carry > 0) last.next = new ListNode(carry)

  return dummyHead.next
}
