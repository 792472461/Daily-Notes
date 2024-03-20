// 解数独
const solveSudoku = (board) => {
  const isValid = (row, col, val) => {
    // 检查行是否有重复
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === val) {
        return false
      }
    }
    // 检查列是否有重复
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === val) {
        return false
      }
    }
    // 检查9宫格是否有重复
    const startRow = Math.floor(row / 3) * 3
    const startCol = Math.floor(col / 3) * 3
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] === val) {
          return false
        }
      }
    }

    return true
  }

  const backtrack = (board, row, col) => {
    // 触发结束条件
    if (col === board[row].length) {
      // 穷举到最后一列的话就换到下一行重新开始
      col = 0
      row++
      if (row === board.length) {
        // 找到一个可行解，触发base case
        return true
      }
    }
    // 如果该位置是预设的数字，直接跳过

    if (board[row][col] !== '.') {
      return backtrack(board, row, col + 1)
    }
    // 遍历选择
    for (let i = 1; i <= 9; i++) {
      const char = i.toString()
      if (!isValid(row, col, char)) {
        continue
      }
      board[row][col] = char
      if (backtrack(board, row, col + 1)) {
        return true
      }
      board[row][col] = '.'
    }
    return false
  }
  // 开始时间
  const start = Date.now()

  backtrack(board, 0, 0)

  // 结束时间
  const end = Date.now()
  // 给出的时间是毫秒，转换成秒
  const time = (end - start) / 1000
  console.log(`运行耗时：${time}s`)
  return board
}

const board = [["5", "3", ".", ".", "7", ".", ".", ".", "."], ["6", ".", ".", "1", "9", "5", ".", ".", "."], [".", "9", "8", ".", ".", ".", ".", "6", "."], ["8", ".", ".", ".", "6", ".", ".", ".", "3"], ["4", ".", ".", "8", ".", "3", ".", ".", "1"], ["7", ".", ".", ".", "2", ".", ".", ".", "6"], [".", "6", ".", ".", ".", ".", "2", "8", "."], [".", ".", ".", "4", "1", "9", ".", ".", "5"], [".", ".", ".", ".", "8", ".", ".", "7", "9"]]

// 打印格式化后的数独，加上边框
console.log(
  solveSudoku(board).map((item) => {
    return item.map((item1) => {
      return item1.split('').join(' ')
    }).join(' | ')
  }).join('\n')
)