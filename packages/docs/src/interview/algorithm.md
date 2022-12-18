# 算法篇

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

## [2.反转链表](https://leetcode-cn.com/problems/reverse-linked-list/) {#reverseLinkedList}

给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

示例 1：

```text
输入：head = [1,2,3,4,5]

输出：[5,4,3,2,1]
```

示例 2：

```text
输入：head = [1,2]

输出：[2,1]
```

示例 3：

```text
输入：head = []

输出：[]
```

代码：

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

## [3.电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/) {#letterCombinations}

给定一个仅包含数字 2-9 的字符串 digits，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

数字到字母的映射与电话按键相同。注意 1 不对应任何字母。

示例 1：

```text
输入：digits = "23"

输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

示例 2：

```text
输入：digits = ""

输出：[]
```

示例 3：

```text

输入：digits = "2"

输出：["a","b","c"]
```

代码：

```js
/**
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = (digits) => {
  const letterMap = [
    " ", // 0
    "", // 1
    "abc", // 2
    "def", // 3
    "ghi", // 4
    "jkl", // 5
    "mno", // 6
    "pqrs", // 7
    "tuv", // 8
    "wxyz", // 9
  ]

  const res = []

  const findCombination = (digits, index, s) => {

    if (index === digits.length) {
      // 保存s
      s && res.push(s)
      return
    }
    const c = digits[index]
    if (c >= 0 && c <= 9 && c !== 1) {
      const leeters = letterMap[c]
      for (let i = 0; i < leeters.length; i++) {
        findCombination(digits, index + 1, s + leeters[i])
      }
    }
  }
  findCombination(digits, 0, '')

  return res
}
```

## [4.删除排序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/) {#removeDuplicates}

给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。

不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

示例 1：

```text
输入：nums = [1,1,2]

输出：2, nums = [1,2]
```

示例 2：

```text
输入：nums = [0,0,1,1,1,2,2,3,3,4]

输出：5, nums = [0,1,2,3,4]
```

代码：

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function(nums) {
  let n = 0
  for (let i = 0; i < nums.length; i++) {
    if (i === 0 || nums[i] !== nums[i - 1]) {
      nums[n] = nums[i]
      n++
    }
  }
  return n
}
```

## [5.删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/) {#removeNthFromEnd}

给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

示例 1：

```text
输入：head = [1,2,3,4,5], n = 2

输出：[1,2,3,5]
```

示例 2：

```text
输入：head = [1], n = 1

输出：[]
```

示例 3：

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

```

## [6.合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/) {#mergeTwoLists}

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

示例 1：

```text
输入：l1 = [1,2,4], l2 = [1,3,4]

输出：[1,1,2,3,4,4]
```

示例 2：

```text
输入：l1 = [], l2 = []

输出：[]
```

示例 3：

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
const mergeTwoLists = function(l1, l2) {
  // 创建虚拟头节点,并创建一个指针指向它
  let ret = new ListNode(-1),
    cur = ret
  // 当l1和l2都不为空时，比较l1和l2的值，将小的值赋给cur.next
  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = l1
      l1 = l1.next
    } else {
      cur.next = l2
      l2 = l2.next
    }
    cur = cur.next
  }
  cur.next = l1 ? l1 : l2
  return ret.next
}
```
