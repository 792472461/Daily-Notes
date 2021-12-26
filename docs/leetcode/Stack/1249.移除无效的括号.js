/**
 * @param {string} s
 * @return {string}
 */
const minRemoveToMakeValid = function (s) {
  const leftDel = []; const rightDel = []
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      leftDel.push(i)
    } else if (s[i] === ')') {
      if (leftDel.length) {
        leftDel.pop()
      } else {
        rightDel.push(i)
      }
    }
  }
  const res = [...s]; const del = leftDel.concat(rightDel)
  for (let i = 0; i < del.length; i++) {
    res[del[i]] = ''
  }
  return res.join('')
}

console.log(minRemoveToMakeValid('lee(t(c)o)de)'))
