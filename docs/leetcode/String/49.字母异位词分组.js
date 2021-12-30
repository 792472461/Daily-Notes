/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = function (strs) {
  const map = new Map()
  for (const str of strs) {
    // 1. 把字符串分割成数组
    const array = Array.from(str)
    // 2. 进行排序，这样异位词的key一定一样的
    array.sort()
    const key = array.toString()
    // 判断是否有，创建数组
    const list = map.get(key) ? map.get(key) : []
    // 往对应的数组里面push
    list.push(str)
    // 存储数据
    map.set(key, list)
  }
  // map转数组
  return Array.from(map.values())
}

console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']))
