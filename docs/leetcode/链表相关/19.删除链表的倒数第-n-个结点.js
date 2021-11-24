/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  // 判断head是否为空
  if (head === null) return head
  // 创建虚拟头节点
  let ret = new ListNode(-1, head),
    pre = ret,
    cur = head
  // 让cur移动k步
  for (let i = 0; i < n; i++) {
    cur = cur.next
  }
  if (!cur) return head.next
  // 然后让两个指针一起移动，知道cur指向空
  while (cur) {
    cur = cur.next
    pre = pre.next
  }
  pre.next = pre.next.next
  // 然后删除
  return ret.next
};
// @lc code=end