// eslint-disable-next-line no-unused-vars
function ListNode (val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}

/**
 * @param {ListNode} head
 * @return {boolean}
 */
export function isPalindrome (head) {
  // 最简单的情况
  if (head === null || head.next === null) return true
  if (head.next.next === null) return head.val === head.next.val

  // 找到中间节点
  const mid = middleNode(head)
  // 翻转右半部分
  let rHead = reverseList(mid.next)
  let lHead = head

  while (rHead) {
    if (lHead.val !== rHead.val) return false
    rHead = rHead.next
    lHead = lHead.next
  }

  return true
}

/**
 * 翻转链表
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList (head) {
  let newHead = null

  while (head) {
    const temp = head.next
    head.next = newHead
    newHead = head
    head = temp
  }

  return newHead
}

/**
 * 查找链表的中间节点
 * @param {ListNode} head
 * @return {ListNode}
 */
function middleNode (head) {
  // 快慢指针
  let fast = head
  let slow = head

  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next
    fast = fast.next.next
  }
  // 返回慢指针，就是中间位置
  return slow
}
