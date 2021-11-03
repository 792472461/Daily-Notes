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
var reverseList = function (head) {
  let cur = head;
  let pre = null

  while (cur) {
    // 缓存下个节点
    const temp = cur.next;
    // 颠倒节点
    cur.next = pre
    pre = cur
    cur = temp
  }
  return pre
};

