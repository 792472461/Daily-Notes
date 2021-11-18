/*
 * @lc app=leetcode.cn id=82 lang=javascript
 *
 * [82] 删除排序链表中的重复元素 II
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
  if (!head) {
    return head;
  }
  // 创建虚拟头结点
  const dummy = new ListNode(0, head);

  let cur = dummy;
  // 保证下个和下下个不为null
  while (cur.next && cur.next.next) {
    // 如果下个和下下个两个值相等
    if (cur.next.val === cur.next.next.val) {
      const x = cur.next.val;
      // 只要下个和下个相等
      while (cur.next && cur.next.val === x) {
        cur.next = cur.next.next;
      }
    } else {
      // 移动指针
      cur = cur.next;
    }
  }
  return dummy.next;
};
// @lc code=end

