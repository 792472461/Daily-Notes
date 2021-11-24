/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
 */

// @lc code=start
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
var detectCycle = function (head) {
  if (!head) return null;

  let p = head,
    q = head;

  if (q.next === null) return null;

  do {
    p = p.next;
    q = q.next.next;
  } while (p !== q && q && q.next);

  if (q === null || q.next === null) return null;

  p = head;
  while (p != q) {
    p = p.next;
    q = q.next;
  }

  return q;
};
// @lc code=end

