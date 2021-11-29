/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = function (x) {
  const temp = x + ''

  let i = 0
  let j = temp.length - 1
  while (i < j) {
    if (temp.substr(i, 1) !== temp.substr(j, 1)) return false
    i++
    j--
  }
  return true
}

console.log(isPalindrome(121))
