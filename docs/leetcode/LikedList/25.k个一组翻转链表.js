/*
 * @lc app=leetcode.cn id=25 lang=javascript
 *
 * [25] K 个一组翻转链表
 */

// @lc code=start
function ListNode (val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
export const reverseKGroup = function (head, k) {
  const protect = new ListNode(0, head)
  let last = protect
  // 分组遍历
  while (head !== null) {
    // 1. 分组(往后找k-1步，找到一组)
    // 一组的开头head结尾end
    const end = getEnd(head, k)
    if (end === null) break

    const nextGroupHead = end.next

    // 2. 一组内部(head到end之间)要反转
    reverseList(head, nextGroupHead)

    // 3. 更新前一组和后一组的边
    last.next = end
    head.next = nextGroupHead

    last = head
    head = nextGroupHead
  }
  return protect.next
}

function getEnd (head, k) {
  while (head !== null) {
    k--
    if (k === 0) return head
    head = head.next
  }
  return null
}

function reverseList (head, stop) {
  let last = head
  head = head.next
  while (head !== stop) {
    const nextHead = head.next
    head.next = last
    last = head
    head = nextHead
  }
  return last
}

// @lc code=end
