/*
 * @lc app=leetcode.cn id=203 lang=javascript
 *
 * [203] 移除链表元素
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  // 创建一个虚拟头节点
  const dummyHead = new ListNode(0)
  dummyHead.next = head
  let cur = dummyHead

  while (cur.next !== null) {
    if (cur.next.val === val) {
      let deleteNode = cur.next
      cur.next = deleteNode.next
    } else {
      cur = cur.next
    }

  }
  return dummyHead.next
};
// @lc code=end