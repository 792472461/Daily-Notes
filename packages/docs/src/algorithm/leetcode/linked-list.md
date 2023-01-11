# 链表相关

## [1.两数之和](https://leetcode-cn.com/problems/two-sum/) {#towSum}

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

示例 1：

```text
输入：nums = [2,7,11,15], target = 9

输出：[0,1]

解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

示例 2：

```text
输入：nums = [3,2,4], target = 6

输出：[1,2]
```

示例 3：

```text
输入：nums = [3,3], target = 6

输出：[0,1]
```

代码：

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

## [2.删除链表的倒数第N个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/) {#removeNthFromEnd}

给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

示例1：

```text
输入：head = [1,2,3,4,5], n = 2

输出：[1,2,3,5]
```

示例2：

```text
输入：head = [1], n = 1

输出：[]
```

示例3：

```text
输入：head = [1,2], n = 1

输出：[1]
```

代码：

```js
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
const removeNthFromEnd = function (head, n) {
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
```

## [3.合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/) {#mergeTwoLists}

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

示例1:
  
```text
输入：l1 = [1,2,4], l2 = [1,3,4]

输出：[1,1,2,3,4,4]
```

示例2:

```text
输入：l1 = [], l2 = []

输出：[]
```

示例3:

```text
输入：l1 = [], l2 = [0]

输出：[0]
```

代码：

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2
  } else if (l2 === null) {
    return l1
  } else if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  }
};
```

## [4.反转链表](https://leetcode-cn.com/problems/reverse-linked-list/) {#reverseList}

反转一个单链表。

示例1:

```text
输入：head = [1,2,3,4,5]

输出：[5,4,3,2,1]
```

示例2:

```text
输入：head = [1,2]

输出：[2,1]
```

示例3:

```text
输入：head = []

输出：[]
```

代码：

```js
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
const reverseList = function (head) {
  let pre = null,
    cur = head
  while (cur) {
    // 保存下一个节点
    let next = cur.next
    // 当前节点的next指向前一个节点
    cur.next = pre
    // 前一个节点指向当前节点
    pre = cur
    // 当前节点指向下一个节点
    cur = next
  }
  return pre
};
```
