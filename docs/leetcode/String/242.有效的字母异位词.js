/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = function (s, t) {
  if (s.length !== t.length) return false
  const hashMap = new Map()
  for (let i = 0; i < s.length; i++) {
    hashMap.set(s[i], (hashMap.get(s[i]) || 0) + 1)
    hashMap.set(t[i], (hashMap.get(t[i]) || 0) - 1)
  }
  for (const item of hashMap) {
    const [, value] = item
    if (value !== 0) return false
  }
  return true
}

console.log(isAnagram('rat', 'car'))
