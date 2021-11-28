/* eslint-disable no-unused-vars */
/**
 * @param {number[]} arr
 * @return {number[]}
 */
const getMaxIndex = function (nums) {
  let max = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > nums[max]) {
      max = i
    }
  }
  return max
}

// 反转前K个元素
const reverse = function (arr, k) {
  if (k < 1) {
    return
  }
  let i = 0
  let j = k
  while (i < j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]; i++; j--
  }
}
const pancakeSort = function (arr) {
  const ans = []; let max
  while (arr.length > 1) {
    max = getMaxIndex(arr); max > 0 && (ans.push(max + 1))
    reverse(arr, max)
    reverse(arr, arr.length - 1)
    ans.push(arr.length)
    arr.pop()
  }
  return ans
}
