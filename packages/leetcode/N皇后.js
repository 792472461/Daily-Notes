// N皇后
const solveNQueens = function (n) {
  const board = new Array(n).fill(0).map(() => new Array(n).fill('.'))
  const res = []

  const isValid = (row, col) => {
    const n = board.length
    // 检查列是否有皇后互相冲突
    for (let i = 0; i < n; i++) {
      if (board[i][col] === 'Q') {
        return false
      }
    }
    // 检查右上方是否有皇后互相冲突
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') {
        return false
      }
    }
    // 检查左上方是否有皇后互相冲突
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') {
        return false
      }
    }
    return true
  }

  const backtrack = (board, row) => {

    // 触发结束条件
    if (row === board.length) {
      const stringsBoard = board.slice()
      for (let i = 0; i < n; i++) {
        stringsBoard[i] = stringsBoard[i].join('')
      }
      res.push(stringsBoard)
      return
    }
    const n1 = board[row].length
    for (let col = 0; col < n1; col++) {
      // 排除不合法选择
      if (!isValid(row, col)) {
        continue
      }
      // 做选择
      board[row][col] = 'Q'
      // 进入下一行决策
      backtrack(board, row + 1)
      // 撤销选择
      board[row][col] = '.'
    }


  }

  backtrack(board, 0)
  return res
}

console.log(solveNQueens(4))
