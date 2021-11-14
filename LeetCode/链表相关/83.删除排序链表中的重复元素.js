/*
 * @lc app=leetcode.cn id=83 lang=javascript
 *
 * [83] 删除排序链表中的重复元素
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
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (head === null) return head
  let pre = head, cur = head.next
  while (cur) {
    // 如果值相等，第二个指针往后移动
    if (pre.val === cur.val) {
      cur = cur.next
      pre.next = cur
    } else {
      // 不相等，两个指针往后都移动
      // pre = pre.next
      // cur = cur.next
      // [pre, cur] = [pre.next, cur.next]
      pre = pre.next
      cur = cur.next
    }
  }
  return head
};
// @lc code=end

