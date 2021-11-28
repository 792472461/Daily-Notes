/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
const partition = function (head, x) {
  // 创建两个个额外的链表，分别用来存储小于x的值和大于x的值
  let small = new ListNode(0)
  const smallHead = small
  let large = new ListNode(0)
  const largeHead = large
  // 遍历原链表
  while (head !== null) {
    if (head.val < x) {
      small.next = head
      small = small.next
    } else {
      large.next = head
      large = large.next
    }
    // 改变头指针
    head = head.next
  }
  // 处理尾边界
  large.next = null
  // 连接两个链表
  small.next = largeHead.next
  // 返回小链表的next，头节点是0
  return smallHead.next
}
