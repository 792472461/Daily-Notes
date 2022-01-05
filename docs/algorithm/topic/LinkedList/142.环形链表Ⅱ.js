/**
 * 给定一个链表，返回链表开始入环的第一个节点。
 * 如果链表无环，则返回null。
 * 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。
 * 如果 pos 是 -1，则在该链表中没有环。注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
export const detectCycle = function (head) {
  if (!head) return null

  let p = head
  let q = head

  if (q.next === null) return null

  do {
    p = p.next
    q = q.next.next
  } while (p !== q && q && q.next)

  if (q === null || q.next === null) return null

  p = head
  while (p !== q) {
    p = p.next
    q = q.next
  }

  return q
}
