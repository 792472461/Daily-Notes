# 排序算法

## 冒泡排序

- 冒泡排序思路拆解
- 冒泡排序只会操作相邻的两个数据。
- 每次冒泡操作都会对相邻的两个元素进行比较，看是否满足大小关系要求。
- 如果不满足就让它俩互换。
- 一次冒泡会让至少一个元素移动到它应该在的位置，重复 n 次，就完成了 n 个数据的排序工作。
- 第i轮开始：arr[n-1] - arr[n]已经排好序了
- 第i轮：通过冒泡在arr[n-i-1]位置放上合适元素
- 第i轮结束：arr[n-1-i] - arr[n]已经排好序了

## 总结

1. 冒泡的过程只涉及相邻数据的交换操作，只需要常量级的临时空间，所以它的空间复杂度为 O(1)，是一个原地排序算法。
2. 在冒泡排序中，只有交换才可以改变两个元素的前后顺序。为了保证冒泡排序算法的稳定性，当有相邻的两个元素大小相等的时候，我们不做交换，相同大小的数据在排序前后不会改变顺序，所以冒泡排序是稳定的排序算法。
3. 最好情况下，要排序的数据已经是有序的了，我们只需要进行一次冒泡操作，就可以结束了，所以最好情况时间复杂度是 O(n)。而最坏的情况是，要排序的数据刚好是倒序排列的，我们需要进行 n 次冒泡操作，所以最坏情况时间复杂度为 O(n²)。
4. 所以平均情况下的时间复杂度就是 O(n²)。

## 代码

```javascript
/**
 * 数组辅助函数，调换位置
 * @param {number[]} arr 原数组
 * @param {number} i 下标i
 * @param {number} j 下标j
 */
const swap = (arr, i, j) => {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }

/**
 * 冒泡排序基础版
 * @param {number[]} arr
 */
const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    // arr[n-i] - arr[n]已经排好序了
    // 通过冒泡在arr[n-i-1]位置放上合适元素
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
  }
}

/**
 * 冒泡排序优化版
 * @param {number[]} arr
 */
const bubbleSort2 = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    // 是否发生了交换
    let isSwapped = false
    // arr[n-i] - arr[n]已经排好序了
    // 通过冒泡在arr[n-i-1]位置放上合适元素
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
        isSwapped = true
      }
    }
    // 如果结束循环以后，没有交换过位置，就证明这个时候元素已经是有序的了
    // 这里主要优化的是有序的情况下
    if (!isSwapped) break
  }
}

/**
 * 冒泡排序再优化版
 * @param {number[]} arr
 */
const bubbleSort3 = (arr) => {
  for (let i = 0; i < arr.length - 1;) {
    // 最后一次交换的位置
    let lastSwappedIndex = 0
    // arr[n-i] - arr[n]已经排好序了
    // 通过冒泡在arr[n-i-1]位置放上合适元素
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
        lastSwappedIndex = j + 1
      }
    }
    // 这样有可能一下子跳过好几轮
    i = arr.length - lastSwappedIndex
  }
}

module.exports = {
  bubbleSort,
  bubbleSort2,
  bubbleSort3
}
```

## 希尔排序

> 希尔排序是插入排序的一种又称“缩小增量排序”，是直接插入排序算法的一种更高效的改进版本。希尔排序是非稳定排序算法

- 基本思想：让数组越来越有序
- 不只处理相邻的逆序对
- 对间距为n/2的所有数组做插入排序
- 对间距为n/4的所有数组做插入排序
- 对间距为n/8的所有数组做插入排序
- ...
- 对元素间距为1的所有数组做插入排序

## 总结

1. 希尔排序是在插入排序的基础上进行了分段排序
2. 希尔排序可以通过不同的步长，来展示出不同的性能

## 代码

```javascript
/**
 * 希尔排序
 * @param {number[]} arr 数组
 */
const shellSort = (arr) => {
    let h = Math.floor(arr.length / 2)
    while (h >= 1) {
      for (let start = 0; start < h; start++) {
        // 对arr[start, start + h, start + 2h, ... ]进行插入排序
        for (let i = start + h; i < arr.length; i += h) {
          // 将arr[i]插入到合适的位置
          const t = arr[i]
          let j
          for (j = i; j > 0 && t < arr[j - h]; j -= h) {
            arr[j] = arr[j - h]
          }
          arr[j] = t
        }
      }
      h = Math.floor(h / 2)
    }
  }

/**
 * 希尔排序的优化版本
 * @param {number[]} arr 数组
 */
const shellSort2 = (arr) => {
  let h = Math.floor(arr.length / 2)
  while (h >= 1) {
    // 对arr[h, n]进行插入排序
    for (let i = h; i < arr.length; i++) {
      // 将arr[i]插入到合适的位置
      const t = arr[i]
      let j
      for (j = i; j - h >= 0 && t < arr[j - h]; j -= h) {
        arr[j] = arr[j - h]
      }
      arr[j] = t
    }
    h = Math.floor(h / 2)
  }
}

/**
 * 步长序列版本的希尔排序
 * @param {number[]} arr 数组
 */
const shellSort3 = (arr) => {
  let h = 1
  while (h < arr.length) h = h * 3 + 1
  while (h >= 1) {
    // 对arr[h, n]进行插入排序
    for (let i = h; i < arr.length; i++) {
      // 将arr[i]插入到合适的位置
      const t = arr[i]
      let j

      for (j = i; j - h >= 0 && t < arr[j - h]; j -= h) {
        arr[j] = arr[j - h]
      }
      arr[j] = t
    }

    h = Math.floor(h / 3)
  }
}

module.exports = {
  shellSort,
  shellSort2,
  shellSort3
}
```

## 归并排序

## 归并排序整体思路

```javascript
// 伪代码
function mergeSort (arr, l, r) {
  if (l >= r) return
  const mid = (l + r) / 2
  // 对mid[l, mid]排序
  mergeSort(arr, l, mid)
  // 对mid(mid + 1, r)排序
  mergeSort(arr, mid + 1, r)
  // 合并数组,主要代码就是在这里
  merge(arr, l, mid, r)
}
```

## 总结

1. 时间复杂度：归并排序法最好情况是O(n)级别的时间复杂度，完全随机的是O(n log n)
2. 空间复杂度：因为归并排序法需要额外空间，所以空间复杂度是O(n)
3. 稳定性：稳定
4. 优化：1. 判断是否需要merge 2. 对小规模数据使用插入排序 3. 只创建一个临时空间

## 代码

```javascript
/**
 * 归并排序基础版
 * @param {number[]} data
 */
const mergeSort = (data) => {
    /**
     * 合并两个有序的数组，arr[l, mid] 和 arr[mid + 1, r]
     * @param {number[]} arr
     * @param {number} l
     * @param {number} mid
     * @param {number} r
     * @param {number[]} temp
     */
    const merge = (arr, l, mid, r, temp) => {
      temp = arr.slice(l, r + 1)
      let i = l
      let j = mid + 1
      // 每轮为arr[k]赋值，从l走到r
      for (let k = l; k <= r; k++) {
        if (i > mid) {
          // 索引i大于 中间值的时候  就越界了直接赋值
          arr[k] = temp[j - l]
          j++
        } else if (j > r) {
          // 索引i 大于右边边界的时候 直接赋值
          arr[k] = temp[i - l]
          i++
        } else if (temp[i - l] <= temp[j - l]) {
          // 左边元素比右边元素小的时候
          arr[k] = temp[i - l]
          i++
        } else {
          arr[k] = temp[j - l]
          j++
        }
      }
    }
    /**
     * 排序过程
     * @param {number[]} arr
     * @param {number} l
     * @param {number} r
     * @param {number[]} temp
     */
    const sort = (arr, l, r, temp) => {
      if (l >= r) return
      const mid = l + Math.floor((r - l) / 2)
      sort(arr, l, mid, temp)
      sort(arr, mid + 1, r, temp)
      if (arr[mid] > arr[mid + 1]) {
        merge(arr, l, mid, r, temp)
      }
    }
    const temp = [...data]
    sort(data, 0, data.length - 1, temp)
  }

module.exports = {
  mergeSort
}
```

## 快速排序

## 思路

- 快排的核心思想
- 找一个标定点，把小于标定点的放到标定点左边，大于标定点的放到标定点右边
- 递推公式：quick_sort(l…r) = quick_sort(l…p-1) + quick_sort(p+1… r)
- 终止条件：l >= r

## 总结

1. 快速排序的平均时间复杂度是O(nlogn)，但是如果数据完全有序的情况下，会退化城O(n²)，可以用随机化规避掉这个问题，但是对于数据完全一样的还是会出现这个问题
2. 解决数据完全一样的数据，可以采用双路快排或者三路快排的方式规避掉
3. 利用快排思想可以解决select K问题

## 代码

```javascript
/**
 * 数组辅助函数，调换位置
 * @param {number[]} arr 原数组
 * @param {number} i 下标i
 * @param {number} j 下标j
 */
const swap = (arr, i, j) => {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }

/**
 * 基础版快排
 * @param {number[]} arr 数组
 */
const quickSort = (data) => {
  /**
   * partition函数
   * @param {number[]} arr 数组
   * @param {number} l 左边标定点
   * @param {number} r 右边标定点
   * @returns {number} 标定点
   */
  const partition = (arr, l, r) => {
    // 添加随机化
    const p = Math.floor(Math.random() * (r - l + 1) + l)
    swap(arr, l, p)
    // 循环不变量
    // arr[l + 1, ..., j] < v
    // arr[j + 1, ..., i] >= v
    let j = l
    for (let i = l + 1; i <= r; i++) {
      if (arr[i] < arr[l]) {
        j++
        swap(arr, i, j)
      }
    }
    swap(arr, l, j)
    return j
  }
  /**
   * 排序函数
   * @param {number[]}} arr 数组
   * @param {number} l 左边标定点
   * @param {number} r 右边标定点
   */
  const sort = (arr, l, r) => {
    if (l >= r) return
    const p = partition(arr, l, r)
    sort(arr, l, p - 1)
    sort(arr, p + 1, r)
  }
  sort(data, 0, data.length - 1)
}

/**
 * 双路快排
 * @param {number[]} arr 数组
 */
const sort2ways = (data) => {
  /**
   * partition函数
   * @param {number[]} arr 数组
   * @param {number} l 左边标定点
   * @param {number} r 右边标定点
   * @returns {number} 标定点
   */
  const partition = (arr, l, r) => {
    // 添加随机化
    swap(arr, l, Math.floor(Math.random() * (r - l + 1) + l))

    // arr[l+1...i-1] <= v; arr[j+1...r] >= v
    let i = l + 1
    let j = r
    while (true) {
      while (i <= j && arr[i] < arr[l]) {
        i++
      }

      while (j >= i && arr[j] > arr[l]) {
        j--
      }

      if (i >= j) break
      swap(arr, i, j)
      i++
      j--
    }
    swap(arr, l, j)
    return j
  }
  /**
   * 排序函数
   * @param {number[]}} arr 数组
   * @param {number} l 左边标定点
   * @param {number} r 右边标定点
   */
  const sort = (arr, l, r) => {
    if (l >= r) return
    const p = partition(arr, l, r)
    sort(arr, l, p - 1)
    sort(arr, p + 1, r)
  }
  sort(data, 0, data.length - 1)
}

/**
 * 三路快排
 * @param {number[]} arr 数组
 */
const sort3ways = (data) => {
  /**
   * 排序函数
   * @param {number[]}} arr 数组
   * @param {number} l 左边标定点
   * @param {number} r 右边标定点
   */
  const sort = (arr, l, r) => {
    if (l >= r) return
    // 添加随机化
    swap(arr, l, Math.floor(Math.random() * (r - l + 1) + l))

    // arr[l + 1, lt] < v, arr[lt + 1, i - 1] == v, arr[gt, r] > v
    let lt = l
    let i = l + 1
    let gt = r + 1
    while (i < gt) {
      if (arr[i] < arr[l]) {
        lt++
        swap(arr, i, lt)
        i++
      } else if (arr[i] > arr[l]) {
        gt--
        swap(arr, i, gt)
      } else {
        // arr[i] === arr[l]
        i++
      }
    }
    swap(arr, l, lt)
    // arr[l, lt - 1] < v, arr[lt, gt - 1] == v, arr[gt, r] > v
    sort(arr, l, lt - 1)
    sort(arr, gt, r)
  }
  sort(data, 0, data.length - 1)
}

module.exports = {
  quickSort,
  sort2ways,
  sort3ways
}
```

## 插入排序

## 思路

- 插入算法的核心思想
- 区分已排序区间和未排序区间
- 取未排序区间中的元素，在已排序区间中找到合适的插入位置将其插入，并保证已排序区间数据一直有序。
- 重复这个过程，直到未排序区间中元素为空，算法结束。

## 总结

1. 插入排序算法的运行并不需要额外的存储空间，所以空间复杂度是 O(1)，也就是说，这是一个原地排序算法。
2. 对于值相同的元素，我们可以选择将后面出现的元素，插入到前面出现元素的后面，这样就可以保持原有的前后顺序不变，所以插入排序是稳定的排序算法。
3. 如果我们从尾到头在有序数据组里面查找插入位置，每次只需要比较一个数据就能确定插入的位置。所以这种情况下，最好是时间复杂度为 O(n)
4. 如果数组是倒序的，每次插入都相当于在数组的第一个位置插入新的数据，所以需要移动大量的数据，所以最坏情况时间复杂度为 O(n2)。
5. 每次插入操作都相当于在数组中插入一个数据，循环执行 n 次插入操作，所以平均时间复杂度为 O(n2)。

## 代码

```javascript
/**
 * 数组辅助函数，调换位置
 * @param {number[]} arr 原数组
 * @param {number} i 下标i
 * @param {number} j 下标j
 */
const swap = (arr, i, j) => {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
/**
 * 插入排序
 * @param {number[]} arr 要排序后的
 */
const insertSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    // 将arr[i]插入到合适的位置
    // 如果arr[j] < arr[j - 1]则需要交换位置
    for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
      swap(arr, j, j - 1)
    }
  }
}

/**
 * 优化后的插入排序
 * @param {number[]} arr
 */
const insertSort2 = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    // 将arr[i]插入到合适的位置
    const t = arr[i]
    let j
    for (j = i; j > 0 && t < arr[j - 1]; j--) {
      arr[j] = arr[j - 1]
    }
    arr[j] = t
  }
}

/**
 * 换一种方式实现
 * @param {number[]} arr
 */
const insertSort3 = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    // 将arr[i]插入到合适的位置
    const t = arr[i]
    let j
    for (j = i; j + 1 < arr.length && t > arr[j + 1]; j++) {
      arr[j] = arr[j + 1]
    }
    arr[j] = t
  }
}

module.exports = {
  insertSort,
  insertSort2,
  insertSort3
}

```

## 选择排序

## 思路

> 选择排序法，排序思路
>
> 先把最小的拿出来
>
> 剩下的，再把最小的拿出来
>
> 剩下的，再把最小的拿出来
>
> ...
>
> 每次选择还没处理元素里最小的元素

## 总结

1. 选择排序空间复杂度为 O(1)，是一种原地排序算法。选择排序的最好情况时间复杂度、最坏情况和平均情况时间复杂度都为 O(n²)。
2. 选择排序是一种不稳定的排序算法，选择排序每次都要找剩余未排序元素中的最小值，并和前面的元素交换位置，这样破坏了稳定性。

## 代码

```javascript
/**
 * 数组辅助函数，调换位置
 * @param {number[]} arr 原数组
 * @param {number} i 下标i
 * @param {number} j 下标j
 */
const swap = (arr, i, j) => {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }

/**
 * 选择排序
 * @param {number[]} arr 数组
 */
const selectSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    // 定义最小值
    let minIndex = i

    for (let j = i; j < arr.length; j++) {
      // 找出最小值
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    // 交换位置，最小的放到最左边
    swap(arr, i, minIndex)
  }
}

/**
 * 另一种方式实现的选择排序
 * @param {number[]} arr 数组
 */
const selectSort2 = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    // 定义最大值
    let maxIndex = i

    for (let j = i; j >= 0; j--) {
      // 找出最大值
      if (arr[maxIndex] < arr[j]) {
        maxIndex = j
      }
    }
    // 交换位置，最小的放到最右边
    swap(arr, i, maxIndex)
  }
}

module.exports = {
  selectSort,
  selectSort2
}

```
