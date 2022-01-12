# 深度优先遍历+回溯

## 46. 全排列

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function (nums) {
    const ans = []
    const used = []
    const dfs = (i, chosen) => {
      if (i === nums.length) {
        ans.push(chosen)
        return
      }
      for (let j = 0; j < nums.length; j++) {
        if (!used[j]) {
          chosen.push(nums[j])
          used[j] = true
          dfs(i + 1, [...chosen])
          used[j] = false
          chosen.pop()
        }
      }
    }
    dfs(0, [])
    return ans
  }

```

## 51. N皇后

```javascript
/**
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = function (n) {
    if (n < 1) return []
    const result = []

    // 判断当前位置是否合法
    const checkValidate = (ware = [], row, col) => {
      const length = ware.length
      for (let h = 0; h < length; h++) {
        const v = ware[h]
        if (v === col) return false
        if (Math.abs(v - col) === Math.abs(h - row)) {
          return false
        }
      }
      return true
    }
    /**
     *
     * @param {number} start
     * @param {number[]} ware
     * @param {number} length
     * @returns {number}
     */
    const dfs = (start = 0, ware = [], length) => {
      if (ware.length === length) return result.push(ware)

      for (let col = 0; col < length; col++) {
        if (checkValidate(ware, start, col)) {
          dfs(start + 1, [...ware, col], n)
        }
      }
    }
    dfs(0, [], n)

    return result.map(item => {
      return item.map(i => {
        const r = new Array(n).fill('.')
        r[i] = 'Q'
        return r.join('')
      })
    })
  }

// [1, 1] 能攻击范围 [0, 0] [2, 2] ... [n-1, n-1] [0, 2], [2, 0]

```

## 77. 组合

```javascript
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = function (n, k) {
    const ans = []
    const dfs = (i, chosen) => {
      if (i === n + 1) {
        // 剪枝 如果已经选了超过k个，或者说剩下选择的全部也不够k个，说明肯定不合法了，提前退出
        if (chosen.length > k || chosen.length + (n - i + 1) < k) return
        if (chosen.length === k) ans.push([...chosen])
        return
      }

      dfs(i + 1, chosen)
      chosen.push(i)
      dfs(i + 1, chosen)
      chosen.pop()
    }
    dfs(1, [])
    return ans
  }


```

## 78.子集

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function (nums) {
    const ans = []
    const dfs = (i, chosen) => {
      // 递归边界
      if (i === nums.length) {
        ans.push([...chosen])
        return
      }
      dfs(i + 1, chosen)
      chosen.push(nums[i])
      dfs(i + 1, chosen)
      chosen.pop()
    }
    dfs(0, [])
    return ans
  }

```
