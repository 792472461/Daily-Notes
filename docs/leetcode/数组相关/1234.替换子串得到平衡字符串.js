/**
 * @param {string} s
 * @return {number}
 */
const balancedString = function (s) {
  const n = s.length
  const num = new Array(n + 1).fill().map(() => { return new Array(4).fill() })
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < 4; j++) {
      num[i][j] = num[i - 1][j]
    }
    console.log(num)
    ++num[i]['QWER'.indexOf(s.charAt(i - 1))]
  }
  let r = n
  for (let i = 0, j = 0, m = n / 4; j <= n; ++i) {
    for (j = Math.max(i, j); j <= n && (
      num[n][0] + num[i][0] - num[j][0] > m ||
      num[n][1] + num[i][1] - num[j][1] > m ||
      num[n][2] + num[i][2] - num[j][2] > m ||
      num[n][3] + num[i][3] - num[j][3] > m
    ); ++j) {
      if (j <= n) {
        r = Math.min(r, j - i)
      }
    }
  }
  return r
}

console.log(balancedString('QWER'))
