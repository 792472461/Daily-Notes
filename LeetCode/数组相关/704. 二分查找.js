/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  const _search = (nums, l, r, target) => {
    if (l > r) return -1
    const mid = Math.floor(l + (r - l) / 2)
    if (nums[mid] === target) return mid
    if (nums[mid] < target) return _search(nums, mid + 1, r, target)
    return _search(nums, 0, mid - 1, target)
  }
  return _search(nums, 0, nums.length - 1, target)
};

// 非递归实现
var search2 = function (nums, target) {
  let l = 0,
    r = nums.length - 1
  // 要搜索的范围
  while (l <= r) {
    let mid = Math.floor(l + (r - l) / 2)
    if (nums[mid] === target) return mid
    if (nums[mid] < target) l = mid + 1
    else r = mid - 1
  }
  return -1
}

console.log(search2([-1,0,3,5,9,12], 9))