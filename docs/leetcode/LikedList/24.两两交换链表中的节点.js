/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
 */

function ListNode (val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
export const swapPairs = function (head) {
  if (head === null) return head
  // 创建虚拟头节点
  const ret = new ListNode(-1, head)

  let temp = ret
  while (temp.next && temp.next.next) {
    const pre = temp.next
    const cur = temp.next.next
    pre.next = cur.next
    cur.next = pre
    temp.next = cur
    temp = pre
  }
  return ret.next
}
// @lc code=end
