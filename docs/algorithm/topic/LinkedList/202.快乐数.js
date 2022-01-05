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
export const isHappy = function (n) {
  let pre = n
  let cur = getNext(n)
  // 链表找环
  while (cur !== pre && cur !== 1) {
    pre = getNext(pre)
    cur = getNext(getNext(cur))
  }
  return cur === 1
}

function getNext (n) {
  let t = 0
  while (n) {
    t += (n % 10) * (n % 10)
    n = Math.floor(n / 10)
  }
  return t
}

// @lc code=end
