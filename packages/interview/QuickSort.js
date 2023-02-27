function quickSort(arr, left, right) {
  // 如果左边索引大于等于右边索引，递归结束
  if (left >= right) {
    return;
  }

  // 随机选取 pivot 的索引
  let pivotIndex = Math.floor(Math.random() * (right - left + 1)) + left;
  // 将 pivot 和第一个元素交换位置
  [arr[left], arr[pivotIndex]] = [arr[pivotIndex], arr[left]];

  // 将第一个元素作为 pivot
  let pivot = arr[left];
  // 定义 i 和 j
  let i = left + 1;
  let j = right;
  // 双指针移动
  while (true) {
    // 当 i 小于等于 j 且 arr[i] 小于 pivot 时，i 向右移动
    while (i <= j && arr[i] < pivot) {
      i++;
    }
    // 当 i 小于等于 j 且 arr[j] 大于 pivot 时，j 向左移动
    while (i <= j && arr[j] > pivot) {
      j--;
    }
    // 当 i 大于 j 时，退出循环
    if (i > j) {
      break;
    }
    // 交换 arr[i] 和 arr[j] 的值
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i++;
    j--;
  }

  // 将 pivot 和 j 交换位置
  [arr[left], arr[j]] = [arr[j], arr[left]];

  // 递归排序左边的部分
  quickSort(arr, left, j - 1);
  // 递归排序右边的部分
  quickSort(arr, j + 1, right);
}

let arr = [5, 3, 8, 2, 9, 1];
quickSort(arr, 0, arr.length - 1);
console.log(arr);
