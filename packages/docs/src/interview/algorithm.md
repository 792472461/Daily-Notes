# 算法篇

## [1.两数之和](https://leetcode-cn.com/problems/two-sum/)

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

示例 1：

输入：nums = [2,7,11,15], target = 9

输出：[0,1]

解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

示例 2：

输入：nums = [3,2,4], target = 6

输出：[1,2]

示例 3：

输入：nums = [3,3], target = 6

输出：[0,1]

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) {
  // 定义一个map存储出现过的数字
  const map = new Map()
  // 遍历数组
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    const diff = target - num
    // 如果map中存在差值，说明找到了
    if (map.has(diff)) {
      return [map.get(diff), i]
    }
    map.set(num, i)
  }
}
```

## [2.反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

示例 1：

输入：head = [1,2,3,4,5]

输出：[5,4,3,2,1]

示例 2：

输入：head = [1,2]

输出：[2,1]

示例 3：

输入：head = []

输出：[]

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function(head) {
  let prev = null
  let curr = head
  while (curr) {
    // 保存下一个节点
    const next = curr.next
    // 当前节点的next指向前一个节点
    curr.next = prev
    // 前一个节点指向当前节点
    prev = curr
    // 当前节点指向下一个节点
    curr = next
  }
  // 返回反转后的头节点
  return prev
}
```
