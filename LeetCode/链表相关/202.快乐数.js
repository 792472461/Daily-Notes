/*
 * @lc app=leetcode.cn id=202 lang=javascript
 *
 * [202] 快乐数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  let pre = n,
    cur = getNext(n)
  // 链表找环
  while (cur !== pre && cur !== 1) {
    pre = getNext(pre)
    cur = getNext(getNext(cur))
  }
  return cur === 1
};
var getNext = function (n) {
  let t = 0
  while (n) {
    t += (n % 10) * (n % 10)
    n = Math.floor(n / 10)
  }
  return t
}
// @lc code=end